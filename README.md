# AutoCaptureChrome — Historical Browser Automation Prototype

A JavaScript Chrome extension experiment that captures page screenshots and sends them to a configured Telegram bot.

> **Status: legacy/incomplete.** This repository uses Chrome Extension **Manifest V2** and older `chrome.tabs.executeScript` APIs. These are not supported by current mainstream Chrome releases. The settings popup is also unfinished. This is not a plug-and-play current Chrome extension.

## Architecture
- `manifest.json` — legacy extension manifest
- `background.js` — capture scheduling and Telegram delivery
- `popup.html`, `popup.js` — unfinished extension configuration interface
- `html2canvas.min.js` — browser DOM screenshot helper
- `index.html` — supplementary page

## Security advisory
A Telegram credential was previously embedded in `background.js`. It has been removed from the **current source**, but **old commits still contain it**. The credential **must be revoked and replaced in Telegram BotFather**; removing a credential from the latest commit does not invalidate it.

The current code retrieves `telegramBotToken` and `telegramChatId` from `chrome.storage.local`; however, the UI to enter them is unfinished. Browser extension storage is not a server-side secret vault, so do not treat it as secure for a public deployment.

## Testing
This version is kept as a historical study of browser automation. For modern Chrome, migrate the project to Manifest V3, review all extension permissions, implement user-controlled credential configuration, and test the scheduling and delivery flows.

## Privacy
Only capture browser content with the knowledge and permission of its owner. Screenshots may reveal private information. This project does not claim a completed security review.

## Engineering focus
Extension architecture, event-driven browser scripting and external API integration.
