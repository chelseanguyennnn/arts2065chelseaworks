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
  // === Horizontal scroller UX enhancements ===
  const scroller = document.querySelector('.horizontal-scroll');
  const leftBtn = document.querySelector('.scroller-left');
  const rightBtn = document.querySelector('.scroller-right');
  const indicatorsContainer = document.querySelector('.scroller-indicators');
  if (scroller) {
    const cards = Array.from(scroller.querySelectorAll('.week-card'));
    // create indicators
    cards.forEach((c, i) => {
      const btn = document.createElement('button');
      btn.setAttribute('aria-label', 'Go to week ' + (i + 1));
      btn.setAttribute('role', 'tab');
      btn.dataset.index = i;
      if (i === 0) btn.setAttribute('aria-selected', 'true');
      indicatorsContainer.appendChild(btn);
      btn.addEventListener('click', () => {
        cards[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      });
    });

    // button scrolling
    function scrollByCard(dir) {
      const cardWidth = cards[0].getBoundingClientRect().width + parseFloat(getComputedStyle(scroller).gap || 16);
      scroller.scrollBy({ left: dir * cardWidth, behavior: 'smooth' });
    }
    if (leftBtn) leftBtn.addEventListener('click', () => scrollByCard(-1));
    if (rightBtn) rightBtn.addEventListener('click', () => scrollByCard(1));

    // keyboard navigation when scroller focused
    scroller.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); scrollByCard(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); scrollByCard(-1); }
    });

    // IntersectionObserver to set active indicator
    const options = { root: scroller, threshold: 0.6 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = cards.indexOf(entry.target);
          const dots = Array.from(indicatorsContainer.children);
          dots.forEach(d => d.removeAttribute('aria-selected'));
          if (dots[idx]) dots[idx].setAttribute('aria-selected', 'true');
        }
      });
    }, options);
    cards.forEach(c => observer.observe(c));
  }
});
