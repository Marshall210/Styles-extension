// background.js

chrome.runtime.onInstalled.addListener(() => {
  console.log('Custom Styles Manager installed');
});

// Apply styles when page loads
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'loading' && tab.url) {
    applyStylesToTab(tabId, tab.url);
  }
});

// Listen for messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'reloadStyles') {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.reload(tabs[0].id);
      }
    });
  }
  
  // Handle request to inject script
  if (request.action === 'injectScript' && sender.tab) {
    executeUserScript(sender.tab.id, request.code, request.name);
  }
  
  return true;
});

// Function to execute user script safely (Bypassing CSP via Nonce stealing)
async function executeUserScript(tabId, code, name) {
  try {
    await chrome.scripting.executeScript({
      target: { tabId },
      world: 'MAIN', // Execute in the page context
      args: [code, name],
      func: (userCode, scriptName) => {
        try {
          // 1. Create a script element
          const script = document.createElement('script');
          
          // 2. BYPASS CSP: Try to find a valid 'nonce' on the page
          // Many sites (Google, GitHub) require a nonce for inline scripts.
          // We 'borrow' it from an existing script tag.
          const existingScript = document.querySelector('script[nonce]');
          if (existingScript) {
            // Using .nonce property instead of getAttribute is safer and more reliable
            script.setAttribute('nonce', existingScript.nonce);
          }
          
          // 3. Set the code
          script.textContent = userCode;
          
          // 4. Inject into document
          (document.head || document.documentElement).appendChild(script);
          
          // 5. Cleanup (remove the tag, the code has already run)
          script.remove();
          
          console.log(`[Custom Styles] Executed script: ${scriptName}`);
        } catch (e) {
          console.error(`[Custom Styles] Error executing ${scriptName}:`, e);
        }
      }
    });
  } catch (error) {
    console.error(`Failed to inject script "${name}":`, error);
  }
}

async function applyStylesToTab(tabId, url) {
  try {
    const domain = new URL(url).hostname;
    const result = await chrome.storage.local.get('styles');
    const styles = result.styles || [];
    
    const activeStyles = styles.filter(style => 
      style.enabled && matchesDomain(style.domain, domain)
    );
    
    for (const style of activeStyles) {
      if (style.type === 'javascript' && style.javascript) {
        // Execute JS
        await executeUserScript(tabId, style.javascript, style.name);
      } else if (style.css) {
        // Apply CSS
        await chrome.scripting.insertCSS({
          target: { tabId },
          css: style.css
        });
      }
    }
  } catch (error) {
    console.error('Error applying styles:', error);
  }
}

function matchesDomain(pattern, domain) {
  if (pattern === '*' || pattern === '') return true;
  
  const regex = new RegExp(
    '^' + pattern.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$'
  );
  return regex.test(domain);
}