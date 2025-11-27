// Слушатель для применения стилей при загрузке или обновлении страницы
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Убедимся, что страница полностью загрузилась и имеет URL
  if (changeInfo.status === 'complete' && tab.url && tab.url.startsWith("http")) {
    const url = new URL(tab.url);
    const hostname = url.hostname;

    // Ищем в хранилище данные для этого хоста
    chrome.storage.local.get(hostname, (data) => {
      const styleData = data[hostname];
      
      // Если данные есть, и они включены (enabled)
      if (styleData && styleData.enabled) {
        // Внедряем CSS на страницу
        chrome.scripting.insertCSS({
          target: { tabId: tabId },
          css: styleData.css
        });
      }
    });
  }
});