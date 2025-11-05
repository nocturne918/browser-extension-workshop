// chrome.tabs reference: https://developer.chrome.com/docs/extensions/reference/api/tabs

async function load() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  chrome.tabs.sendMessage(tab.id, {}, (res) => {
    document.body.textContent = JSON.stringify(res.courses);
  });
}


