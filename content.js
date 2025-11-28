(async function() {
  try {
    const domain = window.location.hostname;
    const result = await chrome.storage.local.get('styles');
    const styles = result.styles || [];
    
    const activeStyles = styles.filter(style => 
      style.enabled && matchesDomain(style.domain, domain)
    );
    
    activeStyles.forEach(style => {
      if (style.type === 'javascript' && style.javascript) {
        // Send message to background to execute JS (bypasses CSP restrictions)
        try {
          chrome.runtime.sendMessage({
            action: 'injectScript',
            code: style.javascript,
            name: style.name
          });
        } catch (err) {
          console.error(`Error sending script "${style.name}" to background:`, err);
        }
      } else if (style.css) {
        // Apply CSS styles locally
        const styleElement = document.createElement('style');
        styleElement.id = `custom-style-${style.id}`;
        styleElement.textContent = style.css;
        document.documentElement.appendChild(styleElement);
      }
    });
    
    if (activeStyles.length > 0) {
      console.log(`Custom Styles Manager: applied ${activeStyles.length} styles/scripts`);
    }
  } catch (error) {
    console.error('Error loading custom styles:', error);
  }
  
  function matchesDomain(pattern, domain) {
    if (pattern === '*' || pattern === '') return true;
    
    const regex = new RegExp(
      '^' + pattern.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$'
    );
    return regex.test(domain);
  }
})();