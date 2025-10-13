// Portfolio site minimal JS (add interactivity if needed)
// Example: Smooth scroll for anchor links

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Navigation for single-page sections

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    // Remove active from all
    document.querySelectorAll('.nav a').forEach(l => l.classList.remove('active'));
    this.classList.add('active');
    // Hide all sections
    document.querySelectorAll('.page-section').forEach(sec => sec.style.display = 'none');
    // Show selected section
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.style.display = 'block';
  });
});

// Show correct section by hash on load
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.page-section').forEach(sec => sec.style.display = 'none');
  let hash = window.location.hash || '#arts2065';
  const section = document.querySelector(hash);
  if (section) section.style.display = 'block';
  // Set active nav
  document.querySelectorAll('.nav a').forEach(l => l.classList.remove('active'));
  const nav = document.querySelector('.nav a[href="' + hash + '"]');
  if (nav) nav.classList.add('active');

  // Project popups
  document.querySelectorAll('.project-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const num = this.getAttribute('data-project');
      const popup = document.getElementById('project-popup-' + num);
      if (popup) popup.style.display = 'flex';
    });
  });
  document.querySelectorAll('.close-popup').forEach(close => {
    close.addEventListener('click', function() {
      const num = this.getAttribute('data-close');
      const popup = document.getElementById('project-popup-' + num);
      if (popup) popup.style.display = 'none';
    });
  });
  // Close popup on background click
  document.querySelectorAll('.project-popup').forEach(popup => {
    popup.addEventListener('click', function(e) {
      if (e.target === this) this.style.display = 'none';
    });
  });
});
