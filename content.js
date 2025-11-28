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
        try {
          const script = document.createElement('script');
          script.textContent = `
            (function() {
              try {
                ${style.javascript}
              } catch (error) {
                console.error('Error in user script "${style.name}":', error);
              }
            })();
          `;
          document.documentElement.appendChild(script);
          console.log(`✓ Script "${style.name}" done`);
        } catch (error) {
          console.error(`Eror compiling script "${style.name}":`, error);
        }
      } else if (style.css) {
        const styleElement = document.createElement('style');
        styleElement.id = `custom-style-${style.id}`;
        styleElement.textContent = style.css;
        document.documentElement.appendChild(styleElement);
      }
    });
    
    if (activeStyles.length > 0) {
      console.log(`Custom Styles Manager: ${activeStyles.length} working styles applied.`);
    }
  } catch (error) {
    console.error('Error loading user script:', error);
  }
  
  function matchesDomain(pattern, domain) {
    if (pattern === '*' || pattern === '') return true;
    
    const regex = new RegExp(
      '^' + pattern.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$'
    );
    return regex.test(domain);
  }
})();