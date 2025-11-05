// chrome.tabs reference: https://developer.chrome.com/docs/extensions/reference/api/tabs

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.tabs.sendMessage(tabs[0].id, {}, (res) => {
    document.body.textContent = JSON.stringify(res.courses);
  });
});
