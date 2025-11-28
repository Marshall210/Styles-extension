// popup.js
let styles = [];
let currentStyle = null;
let currentDomain = '';
let currentFilter = 'all';
let searchQuery = '';
let visualEditorActive = false;

// Template library
const TEMPLATES = [
  {
    category: 'themes',
    name: 'Dark Theme',
    description: 'Universal dark theme for any website',
    type: 'css',
    code: `/* Dark Theme */
body {
  background-color: #1a1a1a !important;
  color: #e0e0e0 !important;
}

a {
  color: #4da6ff !important;
}

input, textarea, select {
  background-color: #2a2a2a !important;
  color: #e0e0e0 !important;
  border-color: #444 !important;
}

div, section, article, main {
  background-color: #1a1a1a !important;
  color: #e0e0e0 !important;
}`
  },
  {
    category: 'themes',
    name: 'Sepia Theme',
    description: 'Warm tones for comfortable reading',
    type: 'css',
    code: `/* Sepia Theme */
body {
  background-color: #f4ecd8 !important;
  color: #5c4b37 !important;
}

* {
  color: #5c4b37 !important;
}

a {
  color: #8b4513 !important;
}`
  },
  {
    category: 'fixes',
    name: 'Remove Ads',
    description: 'Hide common advertising blocks',
    type: 'css',
    code: `/* Remove Ads */
.ad, .ads, .advertisement,
[class*="banner"],
[id*="banner"],
[class*="sponsor"],
[id*="ads"],
iframe[src*="doubleclick"],
iframe[src*="googlesyndication"] {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
}`
  },
  {
    category: 'fixes',
    name: 'Better Readability',
    description: 'Optimal font size and line spacing',
    type: 'css',
    code: `/* Better Readability */
body {
  font-size: 18px !important;
  line-height: 1.6 !important;
  max-width: 800px !important;
  margin: 0 auto !important;
  padding: 20px !important;
}

p {
  margin-bottom: 1em !important;
}

h1, h2, h3, h4, h5, h6 {
  margin-top: 1.5em !important;
  margin-bottom: 0.5em !important;
  line-height: 1.3 !important;
}`
  },
  {
    category: 'themes',
    name: 'Custom Scrollbars',
    description: 'Beautiful modern scrollbars',
    type: 'css',
    code: `/* Custom Scrollbars */
::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}

::-webkit-scrollbar-track {
  background: #1e1e1e;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  border: 2px solid #1e1e1e;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #764ba2 0%, #667eea 100%);
}`
  },
  {
    category: 'experiments',
    name: 'Smooth Animations',
    description: 'Add smooth transitions to all elements',
    type: 'css',
    code: `/* Smooth Animations */
* {
  transition: all 0.3s ease !important;
}

a:hover, button:hover {
  transform: scale(1.05) !important;
}

img {
  transition: transform 0.3s ease, filter 0.3s ease !important;
}

img:hover {
  transform: scale(1.02) !important;
  filter: brightness(1.1) !important;
}`
  },
  {
    category: 'experiments',
    name: 'Neon Accents',
    description: 'Bright neon colors for links and buttons',
    type: 'css',
    code: `/* Neon Accents */
a {
  color: #00ffff !important;
  text-shadow: 0 0 5px #00ffff !important;
}

a:hover {
  color: #ff00ff !important;
  text-shadow: 0 0 10px #ff00ff !important;
}

button, input[type="submit"] {
  background: linear-gradient(45deg, #00ffff, #ff00ff) !important;
  border: none !important;
  color: #000 !important;
  font-weight: bold !important;
}`
  },
  {
    category: 'fixes',
    name: 'Remove Popups',
    description: 'Hide modal windows and overlays',
    type: 'css',
    code: `/* Remove Popups */
[class*="modal"],
[class*="popup"],
[class*="overlay"],
[id*="modal"],
[id*="popup"] {
  display: none !important;
}

body {
  overflow: auto !important;
}`
  },
  {
    category: 'scripts',
    name: 'Auto Scroll',
    description: 'Automatic page scrolling (Ctrl+S)',
    type: 'javascript',
    code: `// Auto Scroll
let scrolling = false;
let scrollSpeed = 1;

document.addEventListener('keydown', (e) => {
  if (e.key === 's' && e.ctrlKey) {
    e.preventDefault();
    scrolling = !scrolling;
    if (scrolling) autoScroll();
  }
});

function autoScroll() {
  if (!scrolling) return;
  window.scrollBy(0, scrollSpeed);
  requestAnimationFrame(autoScroll);
}

console.log('Auto-scroll: Ctrl+S to toggle');`
  },
  {
    category: 'scripts',
    name: 'Copy Protection Remover',
    description: 'Allow copying on protected sites',
    type: 'javascript',
    code: `// Remove Copy Protection
document.addEventListener('copy', function(e) {
  e.stopImmediatePropagation();
}, true);

document.addEventListener('contextmenu', function(e) {
  e.stopImmediatePropagation();
  return true;
}, true);

document.body.style.userSelect = 'text';
document.body.style.webkitUserSelect = 'text';

console.log('Copy protection removed!');`
  },
  {
    category: 'scripts',
    name: 'Remove All Images',
    description: 'Remove images for faster loading',
    type: 'javascript',
    code: `// Remove All Images
document.querySelectorAll('img').forEach(img => img.remove());

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.tagName === 'IMG') node.remove();
    });
  });
});

observer.observe(document.body, { childList: true, subtree: true });
console.log('All images removed');`
  },
  {
    category: 'scripts',
    name: 'Auto Fullscreen Video',
    description: 'Automatically fullscreen videos',
    type: 'javascript',
    code: `// Auto Fullscreen Video
document.addEventListener('click', (e) => {
  if (e.target.tagName === 'VIDEO') {
    if (e.target.requestFullscreen) {
      e.target.requestFullscreen();
    }
  }
});

console.log('Videos will open in fullscreen');`
  }
];

// Get current tab info
chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
  if (tabs[0]) {
    try {
      const url = new URL(tabs[0].url);
      currentDomain = url.hostname;
      document.getElementById('currentDomain').textContent = currentDomain;
    } catch (e) {
      document.getElementById('currentDomain').textContent = 'Invalid URL';
    }
    loadStyles();
  }
});

// Load styles from storage
async function loadStyles() {
  const result = await chrome.storage.local.get('styles');
  styles = result.styles || [];
  renderStylesList();
}

// Render styles list
function renderStylesList() {
  const list = document.getElementById('stylesList');
  list.innerHTML = '';
  
  let filtered = styles.filter(style => {
    // Filter by category
    if (currentFilter !== 'all' && style.category !== currentFilter) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !style.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !style.domain.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  if (filtered.length === 0) {
    list.innerHTML = '<div class="no-styles-msg">No styles found</div>';
    return;
  }
  
  filtered.forEach(style => {
    const categoryBadge = getCategoryBadge(style.category || 'experiments');
    const typeBadge = style.type === 'javascript' ? '<span class="category-badge category-scripts">JS</span>' : '';
    
    const item = document.createElement('div');
    item.className = 'style-item' + (currentStyle?.id === style.id ? ' active' : '');
    item.innerHTML = `
      <div class="style-name">
        <div class="toggle-switch ${style.enabled ? 'active' : ''}" data-id="${style.id}"></div>
        <span>${style.name}</span>
        ${categoryBadge}
        ${typeBadge}
      </div>
      <div class="style-domain">${style.domain || 'All sites'}</div>
    `;
    
    item.addEventListener('click', (e) => {
      if (!e.target.classList.contains('toggle-switch')) {
        editStyle(style);
      }
    });
    
    const toggle = item.querySelector('.toggle-switch');
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleStyle(style.id);
    });
    
    list.appendChild(item);
  });
}

function getCategoryBadge(category) {
  const badges = {
    themes: '<span class="category-badge category-themes">Theme</span>',
    fixes: '<span class="category-badge category-fixes">Fix</span>',
    experiments: '<span class="category-badge category-experiments">Exp</span>',
    scripts: '<span class="category-badge category-scripts">Script</span>'
  };
  return badges[category] || badges.experiments;
}

// Toggle style enabled/disabled
async function toggleStyle(id) {
  const style = styles.find(s => s.id === id);
  if (style) {
    style.enabled = !style.enabled;
    await saveStyles();
    renderStylesList();
    reloadCurrentTab();
  }
}

// Create new style
function createNewStyle() {
  const newStyle = {
    id: Date.now().toString(),
    name: 'New Style',
    domain: currentDomain,
    type: 'css',
    category: 'experiments',
    css: `/* New style for ${currentDomain} */\n\nbody {\n  \n}`,
    javascript: '',
    enabled: true,
    createdAt: new Date().toISOString()
  };
  
  styles.push(newStyle);
  saveStyles();
  editStyle(newStyle);
  renderStylesList();
}

// Edit style
function editStyle(style) {
  currentStyle = style;
  const editor = document.getElementById('editor');
  
  const isJS = style.type === 'javascript';
  
  editor.innerHTML = `
    <div class="editor-header">
      <div class="input-group">
        <label>Name</label>
        <input type="text" id="styleName" value="${style.name}">
      </div>
      <div class="input-group">
        <label>Domain (use * for wildcards)</label>
        <input type="text" id="styleDomain" value="${style.domain || ''}" placeholder="example.com or *.example.com">
      </div>
      <div class="input-group">
        <label>Category</label>
        <select id="styleCategory">
          <option value="themes" ${style.category === 'themes' ? 'selected' : ''}>Themes</option>
          <option value="fixes" ${style.category === 'fixes' ? 'selected' : ''}>Fixes</option>
          <option value="experiments" ${style.category === 'experiments' ? 'selected' : ''}>Experiments</option>
          <option value="scripts" ${style.category === 'scripts' ? 'selected' : ''}>Scripts</option>
        </select>
      </div>
      <div class="input-group">
        <label>Type</label>
        <select id="styleType">
          <option value="css" ${!isJS ? 'selected' : ''}>CSS</option>
          <option value="javascript" ${isJS ? 'selected' : ''}>JavaScript</option>
        </select>
      </div>
    </div>
    
    <div class="code-editor" id="cssEditor" style="display: ${isJS ? 'none' : 'flex'}">
      <textarea id="styleCSS" placeholder="Enter CSS code...">${style.css || ''}</textarea>
    </div>
    
    <div class="code-editor" id="jsEditor" style="display: ${isJS ? 'flex' : 'none'}">
      <textarea id="styleJS" placeholder="Enter JavaScript code...">${style.javascript || ''}</textarea>
    </div>
    
    <div class="editor-actions">
      <button class="btn" id="saveBtn">Save</button>
      <button class="btn" id="applyBtn">Apply</button>
      <button class="btn btn-success" id="exportSingleBtn">💾 Export</button>
      <button class="btn btn-danger" id="deleteBtn">Delete</button>
    </div>
  `;
  
  document.getElementById('saveBtn').addEventListener('click', saveCurrentStyle);
  document.getElementById('applyBtn').addEventListener('click', applyCurrentStyle);
  document.getElementById('exportSingleBtn').addEventListener('click', exportSingleStyle);
  document.getElementById('deleteBtn').addEventListener('click', deleteCurrentStyle);
  
  document.getElementById('styleType').addEventListener('change', (e) => {
    const isJavaScript = e.target.value === 'javascript';
    document.getElementById('cssEditor').style.display = isJavaScript ? 'none' : 'flex';
    document.getElementById('jsEditor').style.display = isJavaScript ? 'flex' : 'none';
  });
  
  renderStylesList();
}

// Save current style
async function saveCurrentStyle() {
  if (!currentStyle) return;
  
  currentStyle.name = document.getElementById('styleName').value;
  currentStyle.domain = document.getElementById('styleDomain').value;
  currentStyle.category = document.getElementById('styleCategory').value;
  currentStyle.type = document.getElementById('styleType').value;
  
  if (currentStyle.type === 'javascript') {
    currentStyle.javascript = document.getElementById('styleJS').value;
    currentStyle.css = '';
  } else {
    currentStyle.css = document.getElementById('styleCSS').value;
    currentStyle.javascript = '';
  }
  
  const index = styles.findIndex(s => s.id === currentStyle.id);
  if (index !== -1) {
    styles[index] = currentStyle;
  }
  
  await saveStyles();
  renderStylesList();
  showNotification('Style saved!');
}

// Apply current style
function applyCurrentStyle() {
  saveCurrentStyle();
  reloadCurrentTab();
}

// Delete current style
async function deleteCurrentStyle() {
  if (!currentStyle) return;
  
  if (confirm(`Delete style "${currentStyle.name}"?`)) {
    styles = styles.filter(s => s.id !== currentStyle.id);
    await saveStyles();
    currentStyle = null;
    
    document.getElementById('editor').innerHTML = `
      <div class="empty-state">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
        </svg>
        <p>Select a style to edit</p>
        <p style="font-size: 11px; margin-top: 8px; opacity: 0.7;">or create a new one</p>
      </div>
    `;
    
    renderStylesList();
    reloadCurrentTab();
  }
}

// Save all styles
async function saveStyles() {
  await chrome.storage.local.set({ styles });
  await createAutoBackup();
}

// Auto backup
async function createAutoBackup() {
  const backup = {
    timestamp: new Date().toISOString(),
    styles: styles
  };
  
  const result = await chrome.storage.local.get('backups');
  let backups = result.backups || [];
  
  backups.unshift(backup);
  backups = backups.slice(0, 5);
  
  await chrome.storage.local.set({ backups });
}

// Export all styles
async function exportAllStyles() {
  if (styles.length === 0) {
    alert('No styles to export');
    return;
  }
  
  const stylesByDomain = {};
  
  styles.forEach(style => {
    const domain = style.domain || 'all-sites';
    if (!stylesByDomain[domain]) {
      stylesByDomain[domain] = [];
    }
    stylesByDomain[domain].push(style);
  });
  
  let exportCount = 0;
  for (const [domain, domainStyles] of Object.entries(stylesByDomain)) {
    const fileName = `custom-styles-${domain.replace(/[^a-z0-9]/gi, '-')}.json`;
    const dataStr = JSON.stringify(domainStyles, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    
    URL.revokeObjectURL(url);
    exportCount++;
    
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  showNotification(`Exported ${exportCount} files`);
}

// Export single style
function exportSingleStyle() {
  if (!currentStyle) return;
  
  const fileName = `style-${currentStyle.domain || 'all'}-${currentStyle.name.replace(/[^a-z0-9]/gi, '-')}.json`;
  const dataStr = JSON.stringify([currentStyle], null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  
  URL.revokeObjectURL(url);
  showNotification('Style exported!');
}

// Import styles
async function importStyles(event) {
  const files = event.target.files;
  if (!files.length) return;
  
  let importedCount = 0;
  let updatedCount = 0;
  
  for (const file of files) {
    try {
      const text = await file.text();
      const importedStyles = JSON.parse(text);
      
      if (!Array.isArray(importedStyles)) {
        alert(`Error in file ${file.name}: invalid format`);
        continue;
      }
      
      importedStyles.forEach(importedStyle => {
        const existingIndex = styles.findIndex(s => s.id === importedStyle.id);
        
        if (existingIndex !== -1) {
          styles[existingIndex] = importedStyle;
          updatedCount++;
        } else {
          styles.push(importedStyle);
          importedCount++;
        }
      });
      
    } catch (error) {
      alert(`Error importing file ${file.name}: ${error.message}`);
    }
  }
  
  await saveStyles();
  renderStylesList();
  
  showNotification(`Imported ${importedCount} new, updated ${updatedCount}`);
  
  event.target.value = '';
}

// Templates modal
function openTemplatesModal() {
  document.getElementById('templatesModal').classList.add('show');
  renderTemplates();
}

function closeTemplatesModal() {
  document.getElementById('templatesModal').classList.remove('show');
}

function renderTemplates(filterCategory = 'all') {
  const grid = document.getElementById('templateGrid');
  const filters = document.getElementById('templateFilters');
  
  filters.innerHTML = `
    <button class="filter-tab ${filterCategory === 'all' ? 'active' : ''}" data-category="all">All</button>
    <button class="filter-tab ${filterCategory === 'themes' ? 'active' : ''}" data-category="themes">Themes</button>
    <button class="filter-tab ${filterCategory === 'fixes' ? 'active' : ''}" data-category="fixes">Fixes</button>
    <button class="filter-tab ${filterCategory === 'experiments' ? 'active' : ''}" data-category="experiments">Experiments</button>
    <button class="filter-tab ${filterCategory === 'scripts' ? 'active' : ''}" data-category="scripts">Scripts</button>
  `;
  
  filters.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      renderTemplates(tab.dataset.category);
    });
  });
  
  const filtered = filterCategory === 'all' 
    ? TEMPLATES 
    : TEMPLATES.filter(t => t.category === filterCategory);
  
  grid.innerHTML = '';
  
  filtered.forEach(template => {
    const card = document.createElement('div');
    card.className = 'template-card';
    card.innerHTML = `
      <div class="template-name">${template.name}</div>
      <div class="template-desc">${template.description}</div>
      <div class="template-preview">${template.code.split('\n')[0]}</div>
    `;
    
    card.addEventListener('click', () => {
      applyTemplate(template);
      closeTemplatesModal();
    });
    
    grid.appendChild(card);
  });
}

function applyTemplate(template) {
  const newStyle = {
    id: Date.now().toString(),
    name: template.name,
    domain: currentDomain,
    type: template.type,
    category: template.category,
    css: template.type === 'css' ? template.code : '',
    javascript: template.type === 'javascript' ? template.code : '',
    enabled: true,
    createdAt: new Date().toISOString()
  };
  
  styles.push(newStyle);
  saveStyles();
  editStyle(newStyle);
  renderStylesList();
  showNotification(`Template "${template.name}" added!`);
}

// Visual editor
function toggleVisualEditor() {
  visualEditorActive = !visualEditorActive;
  const btn = document.getElementById('visualEditorBtn');
  
  if (visualEditorActive) {
    btn.classList.add('active');
    activateVisualEditor();
  } else {
    btn.classList.remove('active');
    deactivateVisualEditor();
  }
}

function activateVisualEditor() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: () => {
          if (window.customStylesVisualEditor) return;
          
          window.customStylesVisualEditor = true;
          
          const highlightDiv = document.createElement('div');
          highlightDiv.id = 'custom-styles-highlight';
          highlightDiv.style.cssText = `
            position: absolute;
            pointer-events: none;
            border: 2px solid #7b2cbf;
            background: rgba(123, 44, 191, 0.1);
            z-index: 999999;
            transition: all 0.1s ease;
          `;
          document.body.appendChild(highlightDiv);
          
          const infoDiv = document.createElement('div');
          infoDiv.id = 'custom-styles-info';
          infoDiv.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: #1e1e1e;
            color: #fff;
            padding: 12px 16px;
            border-radius: 8px;
            font-family: monospace;
            font-size: 12px;
            z-index: 1000000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.5);
            max-width: 300px;
          `;
          document.body.appendChild(infoDiv);
          
          function updateHighlight(e) {
            const el = e.target;
            if (el === highlightDiv || el === infoDiv) return;
            
            const rect = el.getBoundingClientRect();
            highlightDiv.style.top = (rect.top + window.scrollY) + 'px';
            highlightDiv.style.left = (rect.left + window.scrollX) + 'px';
            highlightDiv.style.width = rect.width + 'px';
            highlightDiv.style.height = rect.height + 'px';
            
            let selector = el.tagName.toLowerCase();
            if (el.id) selector += '#' + el.id;
            if (el.className) selector += '.' + el.className.split(' ').join('.');
            
            const styles = window.getComputedStyle(el);
            infoDiv.innerHTML = `
              <div style="margin-bottom: 8px; font-weight: bold; color: #7b2cbf;">${selector}</div>
              <div>background: ${styles.backgroundColor}</div>
              <div>color: ${styles.color}</div>
              <div>font-size: ${styles.fontSize}</div>
              <div style="margin-top: 8px; color: #858585;">Click to copy selector</div>
            `;
            
            window.customStylesSelectedSelector = selector;
          }
          
          function handleClick(e) {
            if (e.target === infoDiv) return;
            e.preventDefault();
            e.stopPropagation();
            
            if (window.customStylesSelectedSelector) {
              navigator.clipboard.writeText(window.customStylesSelectedSelector);
              alert('Selector copied: ' + window.customStylesSelectedSelector);
            }
          }
          
          document.addEventListener('mousemove', updateHighlight);
          document.addEventListener('click', handleClick, true);
          
          window.customStylesCleanup = () => {
            document.removeEventListener('mousemove', updateHighlight);
            document.removeEventListener('click', handleClick, true);
            if (highlightDiv) highlightDiv.remove();
            if (infoDiv) infoDiv.remove();
            window.customStylesVisualEditor = false;
          };
        }
      });
      
      showNotification('Visual editor activated! Hover over elements');
    }
  });
}

function deactivateVisualEditor() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: () => {
          if (window.customStylesCleanup) {
            window.customStylesCleanup();
          }
        }
      });
    }
  });
}

// Reload current tab
function reloadCurrentTab() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.reload(tabs[0].id);
    }
  });
}

// Show notification
function showNotification(message) {
  // Simple alert for now, can be enhanced with custom notification
  const originalTitle = document.title;
  document.title = `✓ ${message}`;
  setTimeout(() => {
    document.title = originalTitle;
  }, 2000);
}

// Event listeners
document.getElementById('newStyleBtn').addEventListener('click', createNewStyle);
document.getElementById('templatesBtn').addEventListener('click', openTemplatesModal);
document.getElementById('closeTemplates').addEventListener('click', closeTemplatesModal);
document.getElementById('visualEditorBtn').addEventListener('click', toggleVisualEditor);
document.getElementById('exportBtn').addEventListener('click', exportAllStyles);
document.getElementById('importBtn').addEventListener('click', () => {
  document.getElementById('importFile').click();
});
document.getElementById('importFile').addEventListener('change', importStyles);

// Search
document.getElementById('searchBox').addEventListener('input', (e) => {
  searchQuery = e.target.value;
  renderStylesList();
});

// Filter tabs
document.querySelectorAll('.filter-tabs .filter-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.filter-tabs .filter-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentFilter = tab.dataset.filter;
    renderStylesList();
  });
});

// Initialize
loadStyles();