(() => {
  document.getElementById("download").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.executeScript(tabs[0].id, {
        file: "popup.js",
        allFrames: true,
      });
    });
    window.close();
  });
})();
