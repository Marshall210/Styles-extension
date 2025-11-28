let styles = [];
let currentStyle = null;
let currentDomain = '';
let currentFilter = 'all';
let searchQuery = '';
let visualEditorActive = false;

// Expanded template library
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
  },
  {
    category: 'themes',
    name: 'High Contrast',
    description: 'Maximum contrast for accessibility',
    type: 'css',
    code: `/* High Contrast */
* {
  background-color: #000 !important;
  color: #fff !important;
}

a {
  color: #ffff00 !important;
  text-decoration: underline !important;
}

button, input[type="submit"] {
  background: #fff !important;
  color: #000 !important;
  border: 2px solid #fff !important;
}`
  },
  {
    category: 'themes',
    name: 'Minimalist White',
    description: 'Clean white theme',
    type: 'css',
    code: `/* Minimalist White */
body {
  background: #ffffff !important;
  color: #333333 !important;
  font-family: 'Helvetica Neue', Arial, sans-serif !important;
}

* {
  border-color: #e0e0e0 !important;
}

a {
  color: #0066cc !important;
}`
  },
  {
    category: 'fixes',
    name: 'Disable Animations',
    description: 'Stop all animations and transitions',
    type: 'css',
    code: `/* Disable Animations */
*, *::before, *::after {
  animation-duration: 0s !important;
  animation-delay: 0s !important;
  transition-duration: 0s !important;
  transition-delay: 0s !important;
}`
  },
  {
    category: 'fixes',
    name: 'Force Cursor Pointer',
    description: 'Make all clickable elements obvious',
    type: 'css',
    code: `/* Force Cursor Pointer */
a, button, [onclick], [role="button"],
input[type="button"], input[type="submit"],
select, label {
  cursor: pointer !important;
}

a:hover, button:hover {
  opacity: 0.8 !important;
}`
  },
  {
    category: 'experiments',
    name: 'Glassmorphism',
    description: 'Modern glass effect',
    type: 'css',
    code: `/* Glassmorphism */
div, section, article, aside {
  background: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(10px) !important;
  -webkit-backdrop-filter: blur(10px) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  border-radius: 10px !important;
}`
  },
  {
    category: 'experiments',
    name: 'Matrix Effect',
    description: 'Green matrix-style text',
    type: 'css',
    code: `/* Matrix Effect */
body {
  background: #000 !important;
  color: #00ff00 !important;
  font-family: 'Courier New', monospace !important;
  text-shadow: 0 0 5px #00ff00 !important;
}

a {
  color: #00ff00 !important;
  text-shadow: 0 0 10px #00ff00 !important;
}`
  },
  {
    category: 'experiments',
    name: 'Blur Background',
    description: 'Blur everything except main content',
    type: 'css',
    code: `/* Blur Background */
body > *:not(main):not(article) {
  filter: blur(3px) !important;
}

main, article {
  filter: none !important;
  position: relative !important;
  z-index: 100 !important;
}`
  },
  {
    category: 'scripts',
    name: 'Auto-Accept Cookies',
    description: 'Click cookie consent automatically',
    type: 'javascript',
    code: `// Auto-Accept Cookies
function acceptCookies() {
  const selectors = [
    '[data-cookie="accept"]',
    '[id*="accept"]',
    '[class*="accept"]',
    'button[class*="cookie"]',
    'button[id*="cookie"]',
    '.cookie-accept',
    '#cookie-accept',
    'button:contains("Accept")',
    'button:contains("Agree")',
    'button:contains("OK")'
  ];
  
  for (const selector of selectors) {
    const button = document.querySelector(selector);
    if (button && button.offsetParent !== null) {
      button.click();
      console.log('✓ Cookie consent accepted');
      return true;
    }
  }
  return false;
}

// Try immediately
setTimeout(acceptCookies, 1000);

// Try again after 3 seconds
setTimeout(acceptCookies, 3000);

// Watch for new dialogs
const observer = new MutationObserver(acceptCookies);
observer.observe(document.body, { childList: true, subtree: true });`
  },
  {
    category: 'scripts',
    name: 'Download All Images',
    description: 'Download all images from page',
    type: 'javascript',
    code: `// Download All Images
const images = document.querySelectorAll('img');
let downloaded = 0;

images.forEach((img, index) => {
  if (img.src && img.src.startsWith('http')) {
    setTimeout(() => {
      const a = document.createElement('a');
      a.href = img.src;
      a.download = \`image-\${index + 1}.jpg\`;
      a.click();
      downloaded++;
    }, index * 500);
  }
});

setTimeout(() => {
  alert(\`Downloaded \${downloaded} images!\`);
}, images.length * 500 + 1000);`
  },
  {
    category: 'scripts',
    name: 'Page Timer',
    description: 'Show time spent on page',
    type: 'javascript',
    code: `// Page Timer
const startTime = Date.now();

const timerDiv = document.createElement('div');
timerDiv.style.cssText = \`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 12px 20px;
  border-radius: 25px;
  font-family: 'Courier New', monospace;
  font-size: 16px;
  font-weight: bold;
  z-index: 999999;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
\`;

document.body.appendChild(timerDiv);

function updateTimer() {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  const hours = Math.floor(elapsed / 3600);
  const minutes = Math.floor((elapsed % 3600) / 60);
  const seconds = elapsed % 60;
  
  const parts = [];
  if (hours > 0) parts.push(\`\${hours}h\`);
  if (minutes > 0) parts.push(\`\${minutes}m\`);
  parts.push(\`\${seconds}s\`);
  
  timerDiv.textContent = '⏱️ ' + parts.join(' ');
}

setInterval(updateTimer, 1000);
updateTimer();`
  },
  {
    category: 'scripts',
    name: 'Reading Progress Bar',
    description: 'Show scroll progress',
    type: 'javascript',
    code: `// Reading Progress Bar
const progressBar = document.createElement('div');
progressBar.style.cssText = \`
  position: fixed;
  top: 0;
  left: 0;
  width: 0%;
  height: 4px;
  background: linear-gradient(90deg, #00dbde 0%, #fc00ff 100%);
  z-index: 999999;
  transition: width 0.1s ease;
\`;

document.body.appendChild(progressBar);

function updateProgress() {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
  progressBar.style.width = Math.min(scrollPercent, 100) + '%';
}

window.addEventListener('scroll', updateProgress);
updateProgress();`
  },
  {
    category: 'scripts',
    name: 'Dark Mode Toggle',
    description: 'Ctrl+D to toggle dark mode',
    type: 'javascript',
    code: `// Dark Mode Toggle
let darkMode = false;

const style = document.createElement('style');
style.id = 'dark-mode-toggle-style';
document.head.appendChild(style);

function toggleDarkMode() {
  darkMode = !darkMode;
  
  if (darkMode) {
    style.textContent = \`
      html {
        filter: invert(1) hue-rotate(180deg) !important;
      }
      
      img, video, [style*="background-image"] {
        filter: invert(1) hue-rotate(180deg) !important;
      }
    \`;
    console.log('🌙 Dark mode ON');
  } else {
    style.textContent = '';
    console.log('☀️ Dark mode OFF');
  }
}

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'd') {
    e.preventDefault();
    toggleDarkMode();
  }
});

console.log('Press Ctrl+D to toggle dark mode');`
  },
  {
    category: 'scripts',
    name: 'Focus Mode',
    description: 'Dim everything except clicked element',
    type: 'javascript',
    code: `// Focus Mode
let focusMode = false;
let focusedElement = null;

const overlay = document.createElement('div');
overlay.style.cssText = \`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 999998;
  display: none;
  pointer-events: none;
\`;
document.body.appendChild(overlay);

function toggleFocus(e) {
  if (e.altKey && e.key === 'f') {
    e.preventDefault();
    focusMode = !focusMode;
    
    if (focusMode) {
      overlay.style.display = 'block';
      document.addEventListener('click', handleFocus);
      console.log('🎯 Focus mode ON - Click element to focus');
    } else {
      overlay.style.display = 'none';
      if (focusedElement) {
        focusedElement.style.position = '';
        focusedElement.style.zIndex = '';
        focusedElement = null;
      }
      document.removeEventListener('click', handleFocus);
      console.log('🎯 Focus mode OFF');
    }
  }
}

function handleFocus(e) {
  e.preventDefault();
  e.stopPropagation();
  
  if (focusedElement) {
    focusedElement.style.position = '';
    focusedElement.style.zIndex = '';
  }
  
  focusedElement = e.target;
  focusedElement.style.position = 'relative';
  focusedElement.style.zIndex = '999999';
}

document.addEventListener('keydown', toggleFocus);
console.log('Press Alt+F to toggle focus mode');`
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
    if (currentFilter === 'favorites') {
      if (!style.favorite) return false;
    } else if (currentFilter !== 'all' && style.category !== currentFilter) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !style.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !style.domain.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // Sort: favorites first, then by creation date
  filtered.sort((a, b) => {
    if (a.favorite && !b.favorite) return -1;
    if (!a.favorite && b.favorite) return 1;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  
  if (filtered.length === 0) {
    list.innerHTML = '<div class="no-styles-msg">No styles found</div>';
    return;
  }
  
  // Group by domain if not filtering
  if (currentFilter === 'all' && !searchQuery) {
    const grouped = {};
    filtered.forEach(style => {
      const domain = style.domain || 'All sites';
      if (!grouped[domain]) grouped[domain] = [];
      grouped[domain].push(style);
    });
    
    Object.keys(grouped).sort().forEach(domain => {
      const groupHeader = document.createElement('div');
      groupHeader.style.cssText = 'padding: 8px 12px; background: #2d2d30; font-size: 11px; font-weight: bold; color: #858585; border-bottom: 1px solid #3e3e42;';
      groupHeader.textContent = `📌 ${domain}`;
      list.appendChild(groupHeader);
      
      grouped[domain].forEach(style => {
        list.appendChild(createStyleItem(style));
      });
    });
  } else {
    filtered.forEach(style => {
      list.appendChild(createStyleItem(style));
    });
  }
}

function createStyleItem(style) {
  const categoryBadge = getCategoryBadge(style.category || 'experiments');
  const typeBadge = style.type === 'javascript' ? '<span class="category-badge category-scripts">JS</span>' : '';
  const favStar = style.favorite ? '⭐' : '☆';
  
  const item = document.createElement('div');
  item.className = 'style-item' + (currentStyle?.id === style.id ? ' active' : '');
  item.innerHTML = `
    <div class="style-name">
      <div class="toggle-switch ${style.enabled ? 'active' : ''}" data-id="${style.id}"></div>
      <span class="fav-star" data-id="${style.id}" style="cursor: pointer; margin-right: 4px; user-select: none;">${favStar}</span>
      <span>${style.name}</span>
      ${categoryBadge}
      ${typeBadge}
    </div>
    <div class="style-domain">${style.domain || 'All sites'}</div>
  `;
  
  item.addEventListener('click', (e) => {
    if (!e.target.classList.contains('toggle-switch') && !e.target.classList.contains('fav-star')) {
      editStyle(style);
    }
  });
  
  const toggle = item.querySelector('.toggle-switch');
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleStyle(style.id);
  });
  
  const favStarElement = item.querySelector('.fav-star');
  favStarElement.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleFavorite(style.id);
  });
  
  return item;
}

// Toggle favorite
async function toggleFavorite(id) {
  const style = styles.find(s => s.id === id);
  if (style) {
    style.favorite = !style.favorite;
    await saveStyles();
    renderStylesList();
  }
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
    favorite: false,
    createdAt: new Date().toISOString()
  };
  
  styles.push(newStyle);
  saveStyles();
  editStyle(newStyle);
  renderStylesList();
}

// Create new script
function createNewScript() {
  const newStyle = {
    id: Date.now().toString(),
    name: 'New Script',
    domain: currentDomain,
    type: 'javascript',
    category: 'scripts',
    css: '',
    javascript: `// New script for ${currentDomain}\n\nconsole.log('Script loaded');`,
    enabled: true,
    favorite: false,
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

// Export all styles (one file per domain)
async function exportAllStyles() {
  if (styles.length === 0) {
    alert('No styles to export');
    return;
  }
  
  const confirmExport = confirm(`Export all styles?\nThis will download one file per domain (${new Set(styles.map(s => s.domain || 'all-sites')).size} files total).`);
  
  if (!confirmExport) return;
  
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
    
    await new Promise(resolve => setTimeout(resolve, 200));
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
  const btn = document.getElementById('visualEditorBtn');
  
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs[0]) return;

    // check if visual editor is already active
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: () => !!window.customStylesVisualEditor
    }, (results) => {
      const isAlreadyActive = results && results[0] && results[0].result;

      if (isAlreadyActive) {
        deactivateVisualEditor();
        if (btn) btn.classList.remove('active');
        visualEditorActive = false;
      } else {
        activateVisualEditor();
        if (btn) btn.classList.add('active');
        visualEditorActive = true;
        window.close();
      }
    });
  });
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
            z-index: 2147483647; /* Максимальный z-index */
            transition: all 0.1s ease;
            box-sizing: border-box;
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
            z-index: 2147483647;
            box-shadow: 0 4px 12px rgba(0,0,0,0.5);
            max-width: 350px;
            max-height: 400px;
            overflow-y: auto;
            pointer-events: none;
          `;
          document.body.appendChild(infoDiv);
          
          let selectedElement = null;
          let selectedCssCode = '';
          
          function getSelector(el) {
            let selector = el.tagName.toLowerCase();
            if (el.id) {
              selector += '#' + el.id;
            } else if (el.className && typeof el.className === 'string') {
              const classes = el.className.trim().split(/\s+/).filter(c => c);
              if (classes.length > 0) {
                selector += '.' + classes.join('.');
              }
            }
            return selector;
          }
          
          function getParentSelector(el) {
            const parent = el.parentElement;
            if (!parent || parent === document.body) return '';
            return getSelector(parent) + ' ' + getSelector(el);
          }
          
          function getCssCode(el) {
            const styles = window.getComputedStyle(el);
            const selector = getSelector(el);
            const parentSelector = getParentSelector(el);
            
            const properties = [
              'display', 'position', 'width', 'height', 'background-color',
              'color', 'font-size', 'font-weight', 'font-family',
              'padding', 'margin', 'border', 'border-radius',
              'text-align', 'line-height', 'opacity', 'z-index'
            ];
            
            let css = `${selector} {\n`;
            properties.forEach(prop => {
              const value = styles.getPropertyValue(prop);
              if (value && value !== 'none' && value !== 'auto' && !value.startsWith('0px') && value !== 'normal') {
                css += `  ${prop}: ${value};\n`;
              }
            });
            css += '}';
            
            if (parentSelector && parentSelector !== selector) {
              css = `/* Parent context: ${parentSelector} */\n\n` + css;
            }
            return css;
          }
          

          function updateHighlight(e) {
            if (e.target.id === 'custom-styles-highlight' || e.target.id === 'custom-styles-info') return;
            
            const el = e.target;
            const rect = el.getBoundingClientRect();
            
            highlightDiv.style.top = (rect.top + window.scrollY) + 'px';
            highlightDiv.style.left = (rect.left + window.scrollX) + 'px';
            highlightDiv.style.width = rect.width + 'px';
            highlightDiv.style.height = rect.height + 'px';
            
            selectedElement = el;
            selectedCssCode = getCssCode(el);
            const selector = getSelector(el);
            
            infoDiv.innerHTML = `
              <div style="margin-bottom: 8px; font-weight: bold; color: #c77dff;">${selector}</div>
              <div style="color: #aaa; margin-bottom: 8px;">Click Esc to exit</div>
              <div style="border-top: 1px solid #444; padding-top: 8px; color: #4da6ff;">
                Touch to copy CSS
              </div>
            `;
          }
          
          function handleClick(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (selectedCssCode) {
              navigator.clipboard.writeText(selectedCssCode);
              
              const notification = document.createElement('div');
              notification.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: #2d7d2d;
                color: white;
                padding: 15px 30px;
                border-radius: 8px;
                font-size: 16px;
                z-index: 2147483647;
                box-shadow: 0 4px 20px rgba(0,0,0,0.5);
              `;
              notification.textContent = '✓ CSS copied!';
              document.body.appendChild(notification);
              setTimeout(() => notification.remove(), 1500);
            }
          }

          function handleKeyDown(e) {
            if (e.key === 'Escape') {
              window.customStylesCleanup();
            }
          }
          
          // Add event listeners
          document.addEventListener('mousemove', updateHighlight);
          document.addEventListener('click', handleClick, true);
          document.addEventListener('keydown', handleKeyDown); 
          
          // Greeting message
          const welcomeMsg = document.createElement('div');
          welcomeMsg.style.cssText = `
            position: fixed;
            top: 20%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #7b2cbf;
            color: white;
            padding: 20px 40px;
            border-radius: 12px;
            font-size: 16px;
            z-index: 2147483647;
            box-shadow: 0 8px 30px rgba(0,0,0,0.7);
            text-align: center;
            transition: opacity 0.5s;
          `;
          welcomeMsg.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 5px;">Visual Editor</div>
            <div style="font-size: 13px;">Hover and click to select</div>
            <div style="font-size: 11px; margin-top: 5px; opacity: 0.8;">ESC - закрыть</div>
          `;
          document.body.appendChild(welcomeMsg);
          setTimeout(() => {
            welcomeMsg.style.opacity = '0';
            setTimeout(() => welcomeMsg.remove(), 500);
          }, 3000);
          
          // Cleanup function
          window.customStylesCleanup = () => {
            document.removeEventListener('mousemove', updateHighlight);
            document.removeEventListener('click', handleClick, true);
            document.removeEventListener('keydown', handleKeyDown);
            
            if (highlightDiv) highlightDiv.remove();
            if (infoDiv) infoDiv.remove();
            if (welcomeMsg) welcomeMsg.remove();
            
            window.customStylesVisualEditor = false;
            // delete whole cleanup function to avoid multiple calls
            delete window.customStylesCleanup;
          };
        }
      });
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
document.getElementById('newScriptBtn').addEventListener('click', createNewScript);
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