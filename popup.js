// Элементы UI
const hostEl = document.getElementById('hostname');
const editor = document.getElementById('css-editor');
const saveBtn = document.getElementById('save-btn');
const deleteBtn = document.getElementById('delete-btn');
const enabledToggle = document.getElementById('enabled-toggle');

let currentHostname = '';
let currentTabId = null;
let originalCss = ''; // Сохраняем CSS, который был загружен

// --- 1. Инициализация: Загрузка данных при открытии popup ---

document.addEventListener('DOMContentLoaded', async () => {
  // Получаем активную вкладку
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (tab && tab.url && tab.url.startsWith("http")) {
    const url = new URL(tab.url);
    currentHostname = url.hostname;
    currentTabId = tab.id;
    hostEl.textContent = currentHostname;

    // Загружаем данные из storage
    const data = await chrome.storage.local.get(currentHostname);
    if (data[currentHostname]) {
      const styleData = data[currentHostname];
      editor.value = styleData.css;
      originalCss = styleData.css; // Запоминаем для удаления
      enabledToggle.checked = styleData.enabled;
    }
  } else {
    // Если это внутренняя страница (chrome://)
    hostEl.textContent = '(unable)';
    editor.disabled = true;
    saveBtn.disabled = true;
    deleteBtn.disabled = true;
    enabledToggle.disabled = true;
  }
});

// --- 2. Логика кнопок ---

// Функция для "Сохранить" или при переключении "Включить"
async function handleSave() {
  const newCss = editor.value;
  const enabled = enabledToggle.checked;

  // 1. Сначала удаляем старые стили (если они были)
  if (originalCss) {
    await chrome.scripting.removeCSS({
      target: { tabId: currentTabId },
      css: originalCss
    });
  }

  // 2. Внедряем новые стили (если включено и есть текст)
  if (enabled && newCss) {
    await chrome.scripting.insertCSS({
      target: { tabId: currentTabId },
      css: newCss
    });
  }

  // 3. Сохраняем в storage
  const styleData = { css: newCss, enabled: enabled };
  await chrome.storage.local.set({ [currentHostname]: styleData });

  // 4. Обновляем "оригинальный" CSS
  originalCss = newCss;

  // Даем обратную связь
  saveBtn.textContent = 'Saved!';
  setTimeout(() => { saveBtn.textContent = 'Save'; }, 1000);
}

// "Удалить"
async function handleDelete() {
  // 1. Удаляем стили со страницы
  if (originalCss) {
    await chrome.scripting.removeCSS({
      target: { tabId: currentTabId },
      css: originalCss
    });
  }

  // 2. Удаляем из storage
  await chrome.storage.local.remove(currentHostname);

  // 3. Очищаем UI
  editor.value = '';
  originalCss = '';
  enabledToggle.checked = false;
  window.close(); // Закрываем popup
}

// Навешиваем слушатели
saveBtn.addEventListener('click', handleSave);
enabledToggle.addEventListener('change', handleSave); // Переключение тоже сохраняет
deleteBtn.addEventListener('click', handleDelete);