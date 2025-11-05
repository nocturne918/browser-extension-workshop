console.log("Canvas extension loaded!");

function getCourses() {
  const cards = document.querySelectorAll('.ic-DashboardCard');
  const courses = [];
  
  cards.forEach((card) => {
    const titleElement = card.querySelector('.ic-DashboardCard__header-title');
    const name = titleElement.getAttribute('title');
    courses.push({ name });
  });
  
  return courses;
}

chrome.runtime.onMessage.addListener((msg, sender, respond) => {
  respond({ courses: getCourses() });
  return true;
});
