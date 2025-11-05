const list = document.getElementById('list');

async function load() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  chrome.tabs.sendMessage(tab.id, { action: 'getCourses' }, async (res) => {
    if (!res?.courses) return;
    
    const { hidden = {} } = await chrome.storage.sync.get('hidden');
    
    list.innerHTML = '';
    res.courses.forEach(course => {
      const check = document.createElement('input');
      check.type = 'checkbox';
      check.checked = !hidden[course.id];
      
      check.onchange = async () => {
        hidden[course.id] = !check.checked;
        await chrome.storage.sync.set({ hidden });
        chrome.tabs.sendMessage(tab.id, { action: 'update' });
      };
      
      const label = document.createElement('label');
      label.textContent = course.name;
      
      const p = document.createElement('p');
      p.append(check, label);
      list.appendChild(p);
    });
  });
}

load();
