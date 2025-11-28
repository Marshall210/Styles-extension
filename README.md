# Custom Styles Manager v0.3.0

> Professional CSS & JavaScript style manager for Chrome/Edge/Brave browsers

## Features

- 🎨 **Visual Editor** - Point-and-click element selection
- 📚 **Template Library** - 12 ready-to-use templates
- ⚡ **JavaScript Support** - Run custom scripts on any website
- 📁 **Categories** - Organize by Themes, Fixes, Experiments, Scripts
- 💾 **Smart Export/Import** - One file per domain
- 🔄 **Auto Backup** - Last 5 versions saved automatically
- 🔍 **Search & Filter** - Find styles quickly
- 🌙 **Dark Theme** - Easy on the eyes
- 💾 **Local Storage** - All data stored locally

## Installation

### Required Files

Create a folder `custom-styles-manager` with these files:

1. **manifest.json** - Extension manifest
2. **background.js** - Background worker
3. **popup.html** - Main interface
4. **popup.js** - Logic
5. **content.js** - Content script
6. **icon16.png, icon48.png, icon128.png** - Icons


### Install Steps

1. **Download** all files from artifacts above
2. **Create folder** named `custom-styles-manager`
3. **Save each file** in the folder
4. **Add icons** (3 PNG files)
5. **Open browser:**
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
   - Brave: `brave://extensions/`
6. **Enable** "Developer mode" (toggle in top right)
7. **Click** "Load unpacked"
8. **Select** the `custom-styles-manager` folder
9. **Done!** 🎉

## Quick Start

### Basic Usage

1. **Click extension icon** in toolbar
2. **Click "+ New Style"**
3. **Enter name and domain**
4. **Write CSS or JavaScript**
5. **Click "Save"** and **"Apply"**
6. **Page reloads** with your style!

### Using Templates

1. **Click "📚 Templates"**
2. **Choose category** or browse all
3. **Click on template**
4. **Auto-added** to your styles!

### Visual Editor

1. **Click "🎨 Visual Editor"**
2. **Hover** over page elements
3. **See** CSS properties in real-time
4. **Click** to copy selector
5. **Paste** into editor
6. **Create** your style!

## Template Library

### Themes (3 templates)
- **Dark Theme** - Universal dark mode
- **Sepia Theme** - Warm, comfortable colors
- **Custom Scrollbars** - Beautiful gradient scrollbars

### Fixes (4 templates)
- **Remove Ads** - Hide advertising blocks
- **Better Readability** - Optimal text size
- **Remove Popups** - Hide modal windows
- **Smooth Animations** - Add transitions

### Experiments (2 templates)
- **Neon Accents** - Bright neon colors
- **Smooth Animations** - Advanced effects

### Scripts (4 templates)
- **Auto Scroll** - Automatic scrolling (Ctrl+S)
- **Copy Protection Remover** - Enable copying
- **Remove All Images** - Fast loading mode
- **Auto Fullscreen Video** - Videos open fullscreen

## Examples

### Example 1: Dark Theme
```css
/* CSS */
body {
  background-color: #1a1a1a !important;
  color: #e0e0e0 !important;
}

a {
  color: #4da6ff !important;
}
```

### Example 2: Hide Sidebar
```css
/* CSS */
.sidebar {
  display: none !important;
}

.main-content {
  width: 100% !important;
}
```

### Example 3: Auto-Accept Cookies
```javascript
// JavaScript
setTimeout(() => {
  const btn = document.querySelector('[data-cookie="accept"]');
  if (btn) btn.click();
}, 1000);
```

### Example 4: Keyboard Shortcuts
```javascript
// JavaScript
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'k') {
    e.preventDefault();
    document.querySelector('.search')?.focus();
  }
});
```

## Wildcards

Use wildcards in the domain field:

- `google.com` - Only google.com
- `*.google.com` - All Google subdomains
- `*` or empty - All websites

## Categories

Organize your styles:

- **Themes** 🟦 - Visual changes
- **Fixes** 🟩 - Problem solutions
- **Experiments** 🟨 - Creative effects
- **Scripts** 🟥 - JavaScript functionality

## Export/Import

### Export All
- Click "💾 Export"
- Creates one file per domain
- Files: `custom-styles-domain.json`

### Export Single
- Open style in editor
- Click "💾 Export"
- Saves current style only

### Import
- Click "📁 Import"
- Select multiple JSON files
- Auto-updates existing styles
- Shows import report

## JavaScript Safety

**Safe to do:**
✅ Modify page elements  
✅ Remove ads/popups  
✅ Add new features  
✅ Read page data  
✅ Change styles dynamically  

**Avoid:**
❌ Sending data to external servers  
❌ Modifying payment forms  
❌ Running untrusted code  
❌ Stealing cookies/tokens  

**Tip:** Use templates from the library - they're tested and safe!

## Search & Filter

### Search Box
- Type in the search box
- Searches name and domain
- Real-time filtering

### Category Filters
- Click category tabs
- Filter by: All, Themes, Fixes, Experiments, Scripts
- Combine with search

## Visual Editor Details

When activated:
- **Purple border** highlights hovered element
- **Info panel** shows:
  - Element selector
  - Background color
  - Text color
  - Font size
- **Click** to copy selector
- **Paste** in editor to create style

## Troubleshooting

**Extension not appearing?**
- Check if installed in `chrome://extensions/`
- Make sure "Enabled" is checked
- Refresh the page

**Styles not applying?**
- Check style is enabled (toggle on)
- Verify domain matches
- Use `!important` in CSS
- Check browser console for errors

**Visual editor not working?**
- Make sure you're on a regular web page (not chrome:// URLs)
- Refresh the page
- Try clicking the button again

**JavaScript not running?**
- Check browser console (F12)
- Verify syntax errors
- Make sure type is set to "JavaScript"

## Tips & Tricks

1. **Use `!important`** to override existing styles
2. **Test on safe sites** before using on important ones
3. **Use console.log()** to debug JavaScript
4. **Backup regularly** using export function
5. **Organize with categories** for easy management
6. **Use wildcards** for multiple subdomains
7. **Combine CSS + JS** for powerful customizations

## File Structure

```
custom-styles-manager/
├── manifest.json       (Extension config)
├── background.js       (Background worker)
├── popup.html          (Main UI)
├── popup.js            (Logic & templates)
├── content.js          (Style injection)
├── icon16.png          (16x16 icon)
├── icon48.png          (48x48 icon)
└── icon128.png         (128x128 icon)
```

## What's New in v0.3.0

- ✅ Completely rewritten interface
- ✅ Visual editor with point-and-click
- ✅ 12 ready-to-use templates
- ✅ JavaScript support (userscripts)
- ✅ Category system
- ✅ Search and filtering
- ✅ Better UI/UX
- ✅ English interface
- ✅ No DevTools dependency

## License

Free to use and modify for personal use.

## Contributing

Feel free to:
- Report bugs
- Suggest features
- Share your templates
- Improve documentation

---

**Enjoy styling the web!**