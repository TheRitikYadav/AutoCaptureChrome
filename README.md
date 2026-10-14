# AutoCaptureChrome

**JavaScript · Chrome Extension · Browser APIs · Telegram Bot API**

A Chrome extension experiment for capturing screenshots on a configurable interval and forwarding them through a Telegram bot.

> **Privacy:** Use only on browsers and pages you own or have permission to monitor. Screenshots can contain passwords, private conversations, and other sensitive information. Review where captured images go before enabling the extension.

## Features represented in source

- Chrome extension manifest and popup UI
- Configurable screenshot capture scheduling
- Telegram bot integration
- Controls to start or stop capture
- JavaScript background and popup logic

## Code layout

| File | Role |
| --- | --- |
| `manifest.json` | Chrome extension configuration |
| `background.js` | Background behavior |
| `popup.html`, `popup.js` | Extension controls |
| `index.html` | Supporting interface |
| `html2canvas.min.js` | Bundled screenshot helper |

## Inspect and load locally

1. Clone [this repository](https://github.com/TheRitikYadav/AutoCaptureChrome).
2. Open `chrome://extensions` in Chrome.
3. Enable **Developer mode** and choose **Load unpacked**.
4. Select the cloned directory containing `manifest.json`.
5. Review the extension permissions and code before configuring a Telegram bot.

This is a learning/automation project. Compatibility with current Chrome releases, capture permissions, and successful Telegram delivery should be tested before production use.

## Portfolio scope

This project demonstrates browser extension architecture and event-driven automation. No claim is made that the extension has undergone security review or Chrome Web Store publication.
