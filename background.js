chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, { toggle: true }, (response) => {
    if (chrome.runtime.lastError) {
      console.log("Error:", chrome.runtime.lastError.message);
    }
  });
});