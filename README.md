# Custom Styles Manager v0.3.3

> A professional browser extension for managing and injecting custom CSS and JavaScript styles on any website. Supports Chrome, Edge, and Brave browsers.

## Table of Contents

  * [Key Features](https://www.google.com/search?q=%23key-features)
  * [Installation](https://www.google.com/search?q=%23installation)
  * [Quick Start](https://www.google.com/search?q=%23quick-start)
  * [Advanced Usage](https://www.google.com/search?q=%23advanced-usage)
  * [Troubleshooting](https://www.google.com/search?q=%23troubleshooting)
  * [File Structure](https://www.google.com/search?q=%23file-structure)

-----

## Key Features

### Core Functionality

  * **Enhanced Visual Editor:** Point-and-click functionality to inspect elements and copy complete CSS selectors with parent context.
  * **Full Scripting Support:** Run custom JavaScript scripts with full access to the page context.
  * **Domain Grouping:** Styles are automatically organized and displayed by the specific domain they target.
  * **Template Library:** Includes over 20 ready-to-use CSS and JavaScript templates for common tasks (Themes, Fixes, Experiments, Scripts).
  * **Organization:** Group styles into Categories (Themes, Fixes, Experiments, Scripts) and use the Favorites system to quickly access important items.
  * **Data Management:** Smart Export/Import functionality with confirmation dialogs, and an Auto Backup feature that saves the last 5 versions locally.

### New in v0.3.3

  * Improved stability for JavaScript execution.
  * Dedicated button for quick JavaScript creation.
  * Improved search and filter capabilities.

-----

## Installation

This extension is installed by loading the source code as an unpacked extension in your browser.

### Required Files

Ensure you have the following files inside a single folder named `custom-styles-manager`:

  * `manifest.json` (Extension configuration)
  * `background.js` (Background worker)
  * `popup.html` (Main user interface)
  * `popup.js` (UI logic)
  * `content.js` (Script for style injection)
  * `icon16.png`, `icon48.png`, `icon128.png` (Extension icons)

### Installation Steps

1.  **Download** all required files from the source repository.
2.  **Create** a folder named `custom-styles-manager` and place all files and icons inside it.
3.  **Open** your browser's extensions page:
4.  **Enable** "Developer mode" using the toggle switch in the top right corner.
5.  **Click** the "Load unpacked" button.
6.  **Select** the `custom-styles-manager` folder.
7.  The extension is now installed and ready for use.

-----

### Basic Usage

1.  Click the extension icon in the browser toolbar.
2.  Click **"+ New Style"** or **"+ New Script"**.
3.  Enter a name and specify the target domain (e.g., `example.com`).
4.  Write your CSS or JavaScript code in the editor.
5.  Click **"Save"**. The page will reload and apply the changes.
6.  Use the star icon to designate frequently used styles as **Favorites**.

### Using the Visual Editor

The Visual Editor assists in quickly identifying CSS selectors.

1.  Click **"Visual Editor"** from the extension popup (the popup will close).
2.  Hover over elements on the web page to see their selector and properties highlighted.
3.  Click an element to **copy its complete CSS code** (including parent context) to your clipboard.
4.  Paste the code into the editor to easily create a new style based on the existing element.

-----

## Advanced Usage

### JavaScript Safety & Context

Scripts are injected into the **page context**, allowing full access to the page's variables, functions, and the DOM.

  * **Allowed Actions:** Modifying page elements, adding features, reading page data, and changing styles dynamically.
  * **Actions to Avoid:** Sending data to external servers, running untrusted code, or modifying payment forms.

### Domain Wildcards

Use wildcards (`*`) in the domain field for broader application.

  * `example.com`: Applies only to the main domain.
  * `*.example.com`: Applies to all subdomains (e.g., `mail.example.com`).
  * `*` (or empty): Applies the style or script to all websites.

-----

## Troubleshooting

| Problem | Recommended Action |
| :--- | :--- |
| **Styles not applying?** | 1. Ensure the style is enabled and the domain matches. 2. Use the `!important` rule in your CSS to override site styles. 3. Check the browser console for injection errors. |
| **JavaScript not running?** | 1. Check the browser console (F12) for syntax errors. 2. Ensure the style type is correctly set to "JavaScript". 3. Look for `[Custom Styles]` messages in the console. |
| **Extension not visible?** | 1. Verify that "Developer mode" is enabled. 2. Confirm the extension is checked as "Enabled" on the extension management page. |

-----

## File Structure

The project directory requires the following structure:

```
custom-styles-manager/
├── manifest.json
├── background.js
├── popup.html
├── popup.js
├── content.js
├── icon16.png
├── icon48.png
└── icon128.png
```