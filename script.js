// script.js — theme toggle, snow/confetti generation, smooth scroll, set year
(function () {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme toggle: basic cycle for visuals
  const themeBtn = document.getElementById('theme-toggle');
  const themes = ['default','dark','pink'];
  let idx = 0;
  themeBtn && themeBtn.addEventListener('click', () => {
    idx = (idx + 1) % themes.length;
    themeBtn.animate([{ transform: 'scale(1)' }, { transform: 'scale(0.96)' }, { transform: 'scale(1)' }], { duration: 220 });
    if (themes[idx] === 'default') {
      document.documentElement.style.setProperty('--maroon', '#2e0f12');
      document.documentElement.style.setProperty('--pink', '#ff7f93');
      document.documentElement.style.setProperty('--pink-deep', '#ff6b81');
      document.documentElement.style.setProperty('--accent', '#ff2d45');
    } else if (themes[idx] === 'dark') {
      document.documentElement.style.setProperty('--maroon', '#0b0b0d');
      document.documentElement.style.setProperty('--pink', '#2b2b2b');
      document.documentElement.style.setProperty('--pink-deep', '#1a1a1a');
      document.documentElement.style.setProperty('--accent', '#6ee7b7');
    } else if (themes[idx] === 'pink') {
      document.documentElement.style.setProperty('--maroon', '#4b0b15');
      document.documentElement.style.setProperty('--pink', '#ff9fb0');
      document.documentElement.style.setProperty('--pink-deep', '#ff7f93');
      document.documentElement.style.setProperty('--accent', '#ff355e');
    }
  });

  // smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Snow/confetti generator (creates small SVG elements and animates them)
  const decor = document.getElementById('hero-decor');
  const S_COUNT = 16;
  const svgns = "http://www.w3.org/2000/svg";

  function createFlake(x, size, delay, dur, color) {
    const wrapper = document.createElement('div');
    wrapper.className = 'snowflake';
    wrapper.style.left = `${x}%`;
    wrapper.style.width = `${size}px`;
    wrapper.style.height = `${size}px`;
    wrapper.style.top = `${-10 - Math.random() * 30}px`;
    wrapper.style.setProperty('--d', `${dur}s`);
    wrapper.style.animationDelay = `${delay}s`;
    const svg = document.createElementNS(svgns, 'svg');
    svg.setAttribute('viewBox','0 0 24 24');
    svg.setAttribute('width','100%');
    svg.setAttribute('height','100%');
    const g = document.createElementNS(svgns,'g');
    g.setAttribute('fill', color);
    g.setAttribute('opacity', '0.95');
    const path = document.createElementNS(svgns,'path');
    path.setAttribute('d','M12 2a1 1 0 0 1 .9.55l1.8 3.6 3.98.58a1 1 0 0 1 .56 1.7l-2.88 2.8.68 3.98a1 1 0 0 1-1.45 1.05L12 16.9l-3.59 1.89a1 1 0 0 1-1.45-1.05l.68-3.98L4.76 8.43a1 1 0 0 1 .56-1.7l3.98-.58L11.1 2.55A1 1 0 0 1 12 2z');
    g.appendChild(path);
    svg.appendChild(g);
    wrapper.appendChild(svg);
    wrapper.style.animationName = 'fall';
    decor.appendChild(wrapper);
    setTimeout(() => {
      if (decor.contains(wrapper)) decor.removeChild(wrapper);
    }, (dur + delay + 2) * 1000);
  }

  function spawnFlakes() {
    if (!decor) return;
    for (let i = 0; i < S_COUNT; i++) {
      const x = Math.random() * 100;
      const size = 10 + Math.random() * 28;
      const delay = Math.random() * 5;
      const dur = 5 + Math.random() * 9;
      const colors = ['#cbe7ff','#ffd9ea','#e8f9f8','#c7e4ff'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      createFlake(x, size, delay, dur, color);
    }
    setTimeout(spawnFlakes, 4800);
  }
  spawnFlakes();

})();