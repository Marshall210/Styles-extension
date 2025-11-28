// background.js
chrome.runtime.onInstalled.addListener(() => {
  console.log('Custom Styles Manager установлен');
});

// Применение стилей при загрузке страницы
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'loading' && tab.url) {
    applyStylesToTab(tabId, tab.url);
  }
});

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
        // Выполняем JavaScript
        try {
          await chrome.scripting.executeScript({
            target: { tabId },
            func: (code) => {
              try {
                eval(code);
              } catch (e) {
                console.error('Ошибка выполнения скрипта:', e);
              }
            },
            args: [style.javascript]
          });
        } catch (error) {
          console.error('Ошибка при внедрении скрипта:', error);
        }
      } else if (style.css) {
        // Применяем CSS
        await chrome.scripting.insertCSS({
          target: { tabId },
          css: style.css
        });
      }
    }
  } catch (error) {
    console.error('Ошибка применения стилей:', error);
  }
}

function matchesDomain(pattern, domain) {
  if (pattern === '*' || pattern === '') return true;
  
  const regex = new RegExp(
    '^' + pattern.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$'
  );
  return regex.test(domain);
}

// Слушаем сообщения от DevTools и popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'reloadStyles') {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.reload(tabs[0].id);
      }
    });
  }
  return true;
});