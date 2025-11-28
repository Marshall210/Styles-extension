// content.js
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
        // Выполняем JavaScript код
        try {
          const script = document.createElement('script');
          script.textContent = `
            (function() {
              try {
                ${style.javascript}
              } catch (error) {
                console.error('Ошибка в пользовательском скрипте "${style.name}":', error);
              }
            })();
          `;
          document.documentElement.appendChild(script);
          console.log(`✓ Скрипт "${style.name}" выполнен`);
        } catch (error) {
          console.error(`Ошибка при выполнении скрипта "${style.name}":`, error);
        }
      } else if (style.css) {
        // Применяем CSS стили
        const styleElement = document.createElement('style');
        styleElement.id = `custom-style-${style.id}`;
        styleElement.textContent = style.css;
        document.documentElement.appendChild(styleElement);
      }
    });
    
    if (activeStyles.length > 0) {
      console.log(`Custom Styles Manager: применено ${activeStyles.length} стилей/скриптов`);
    }
  } catch (error) {
    console.error('Ошибка загрузки пользовательских стилей:', error);
  }
  
  function matchesDomain(pattern, domain) {
    if (pattern === '*' || pattern === '') return true;
    
    const regex = new RegExp(
      '^' + pattern.replace(/\./g, '\\.').replace(/\*/g, '.*') + '
    );
    return regex.test(domain);
  }
})();