document.getElementById('news').onclick = function() {
  alert('Coming soon! In this tab, the latest news in astronomy and space exploration will be published for our users.');
};
document.getElementById('login').onclick = function() {
  alert("In the near future, you will be able to create an account linked to your social media to track the progress you make on the website. This will allow you to save all the exoplanets you discover and have a status bar to level up and reach all the stars!");
};
document.getElementById('search').onclick = function() {
  alert("Under Construction");
};
document.getElementById('faq').onclick = function() {
  alert("Under Construction");
};
document.getElementById('contact').onclick = function() {
  alert("Cooming Soon! Reach us on our email for any queries: forgeconstellation@gmail.com ");
};
// JavaScript
function detectMobileDevice() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Check for mobile device indicators
  if (/android/i.test(userAgent) || 
      /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      alert("You are viewing this webpage on a mobile device.");
  }
}

// Call the function on page load
window.onload = detectMobileDevice;