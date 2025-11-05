console.log("Canvas extension loaded!");

function getCourses() {
  const cards = document.querySelectorAll('.ic-DashboardCard');
  const courses = [];
  
  cards.forEach((card, i) => {
    const titleElement = card.querySelector('.ic-DashboardCard__header-title');
    const name = titleElement.getAttribute('title');
    
    card.dataset.courseId = i;
    courses.push({ id: i, name });
  });
  
  return courses;
}

async function updateVisibility() {
  const { hidden = {} } = await chrome.storage.sync.get('hidden');
  const cards = document.querySelectorAll('.ic-DashboardCard');
  
  cards.forEach(card => {
    const id = card.dataset.courseId;
    card.style.display = hidden[id] ? 'none' : '';
  });
}

chrome.runtime.onMessage.addListener((msg, sender, respond) => {
  if (msg.action === 'getCourses') {
    respond({ courses: getCourses() });
  }
  if (msg.action === 'update') {
    updateVisibility();
  }
  return true;
});