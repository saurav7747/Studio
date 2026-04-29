/* =============================================
   SAURAV STUDIO — Premium Portfolio JS
   ============================================= */

'use strict';

// ——— CONSOLE EASTER EGG ———
console.log(
  '%c You found the builder. %c\n\n' +
  '%c Saurav Roy · 15 · Bihar, India\n' +
  'Built on a phone. Powered by vision.\n\n' +
  '"Humans have no limits." ',
  'background: #2563eb; color: #fff; font-size: 18px; font-weight: bold; padding: 8px 16px; border-radius: 4px;',
  '',
  'color: #6b7280; font-size: 13px; line-height: 1.6;'
);

// ——— LOADER ———
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');
    setTimeout(() => loader.style.display = 'none', 600);

    // Trigger initial reveals after loader
    checkReveals();
  }, 2000);
});

// ——— SCROLL PROGRESS ———
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  scrollProgress.style.width = scrolled + '%';
}, { passive: true });

// ——— NAVBAR ———
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.querySelectorAll('.nav-link');
const mobLinks = document.querySelectorAll('.mob-link');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  updateActiveLink();
}, { passive: true });

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

mobLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

function updateActiveLink() {
  const sections = ['home', 'about', 'skills', 'projects', 'contact'];
  let current = 'home';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 150) current = id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

// ——— LOGO EASTER EGG: CLICK CYCLES ACCENT COLOR ———
const navLogo = document.getElementById('navLogo');
const accentColors = [
  { accent: '#2563eb', light: '#3b82f6', glow: 'rgba(37,99,235,0.2)', glowStrong: 'rgba(37,99,235,0.35)' },
  { accent: '#7c3aed', light: '#8b5cf6', glow: 'rgba(124,58,237,0.2)', glowStrong: 'rgba(124,58,237,0.35)' },
  { accent: '#059669', light: '#10b981', glow: 'rgba(5,150,105,0.2)', glowStrong: 'rgba(5,150,105,0.35)' },
  { accent: '#dc2626', light: '#ef4444', glow: 'rgba(220,38,38,0.2)', glowStrong: 'rgba(220,38,38,0.35)' },
  { accent: '#d97706', light: '#f59e0b', glow: 'rgba(217,119,6,0.2)', glowStrong: 'rgba(217,119,6,0.35)' },
];
let colorIndex = 0;

navLogo.addEventListener('click', (e) => {
  e.preventDefault();
  colorIndex = (colorIndex + 1) % accentColors.length;
  const c = accentColors[colorIndex];
  const root = document.documentElement;
  root.style.setProperty('--accent', c.accent);
  root.style.setProperty('--accent-light', c.light);
  root.style.setProperty('--accent-glow', c.glow);
  root.style.setProperty('--accent-glow-strong', c.glowStrong);

  // Mini flash
  navLogo.style.transform = 'scale(1.3)';
  setTimeout(() => navLogo.style.transform = '', 200);

  showToast('✦ Theme changed!');
});

// ——— TYPING ANIMATION ———
const typingWords = ['Creator', 'Developer', 'Editor', 'Dream Builder'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typingText');

function typeLoop() {
  if (!typingEl) return;
  const word = typingWords[wordIndex];

  if (!isDeleting) {
    typingEl.textContent = word.slice(0, ++charIndex);
    if (charIndex === word.length) {
      isDeleting = true;
      setTimeout(typeLoop, 2000);
      return;
    }
  } else {
    typingEl.textContent = word.slice(0, --charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % typingWords.length;
    }
  }

  setTimeout(typeLoop, isDeleting ? 60 : 90);
}

setTimeout(typeLoop, 2400);

// ——— HERO DOUBLE-CLICK CONFETTI EASTER EGG ———
const heroName = document.getElementById('heroName');

heroName.addEventListener('dblclick', (e) => {
  createGlowBurst(e.clientX, e.clientY);
  createConfetti(e.clientX, e.clientY);
});

heroName.addEventListener('touchend', (() => {
  let lastTap = 0;
  return (e) => {
    const now = Date.now();
    if (now - lastTap < 350) {
      const t = e.changedTouches[0];
      createGlowBurst(t.clientX, t.clientY);
      createConfetti(t.clientX, t.clientY);
    }
    lastTap = now;
  };
})());

function createConfetti(x, y) {
  const colors = ['#2563eb', '#60a5fa', '#93c5fd', '#fbbf24', '#f472b6', '#34d399'];
  for (let i = 0; i < 40; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-particle';
    el.style.cssText = `
      left: ${x + (Math.random() - 0.5) * 200}px;
      top: ${y + (Math.random() - 0.5) * 80}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-delay: ${Math.random() * 0.4}s;
      animation-duration: ${0.8 + Math.random() * 0.8}s;
      transform: rotate(${Math.random() * 360}deg);
      width: ${4 + Math.random() * 8}px;
      height: ${4 + Math.random() * 8}px;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1400);
  }
}

function createGlowBurst(x, y) {
  const el = document.createElement('div');
  el.className = 'glow-burst';
  const size = 200;
  el.style.cssText = `
    left: ${x - size/2}px;
    top: ${y - size/2}px;
    width: ${size}px;
    height: ${size}px;
  `;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 700);
}

// ——— REVEAL ON SCROLL ———
const reveals = document.querySelectorAll('.reveal');

function checkReveals() {
  reveals.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.classList.add('visible');
      // Trigger skill bars when skills become visible
      if (el.classList.contains('skill-card')) {
        const fill = el.querySelector('.skill-fill');
        if (fill) fill.style.width = fill.style.getPropertyValue('--w') || getComputedStyle(fill).getPropertyValue('--w');
      }
    }
  });
}

window.addEventListener('scroll', checkReveals, { passive: true });

// ——— ANIMATED COUNTERS ———
const counters = document.querySelectorAll('.stat-number[data-target]');
let countersStarted = false;

function startCounters() {
  if (countersStarted) return;
  const statsSection = document.querySelector('.stats');
  if (!statsSection) return;
  const rect = statsSection.getBoundingClientRect();
  if (rect.top > window.innerHeight) return;

  countersStarted = true;
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target);
    const suffix = counter.dataset.suffix || '';
    const duration = 1600;
    const startTime = performance.now();

    function animate(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      counter.textContent = current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(animate);
      else counter.textContent = target.toLocaleString() + suffix;
    }

    requestAnimationFrame(animate);
  });
}

window.addEventListener('scroll', startCounters, { passive: true });

// ——— CANVAS GRID ANIMATION ———
const canvas = document.getElementById('heroCanvas');
let ctx, dots = [];

function setupCanvas() {
  if (!canvas) return;
  ctx = canvas.getContext('2d');
  resizeCanvas();
  createDots();
  animateCanvas();
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createDots() {
  dots = [];
  const spacing = 48;
  const cols = Math.ceil(canvas.width / spacing) + 1;
  const rows = Math.ceil(canvas.height / spacing) + 1;
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      dots.push({
        x: x * spacing,
        y: y * spacing,
        baseX: x * spacing,
        baseY: y * spacing,
        phase: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.4
      });
    }
  }
}

let animFrame;
function animateCanvas() {
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const time = Date.now() * 0.001;
  const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#2563eb';

  dots.forEach(dot => {
    dot.x = dot.baseX + Math.sin(time * dot.speed + dot.phase) * 3;
    dot.y = dot.baseY + Math.cos(time * dot.speed * 0.7 + dot.phase) * 3;

    ctx.beginPath();
    ctx.arc(dot.x, dot.y, 1.5, 0, Math.PI * 2);
    ctx.fillStyle = accentColor;
    ctx.globalAlpha = 0.25;
    ctx.fill();
  });

  ctx.globalAlpha = 1;
  animFrame = requestAnimationFrame(animateCanvas);
}

window.addEventListener('resize', () => {
  resizeCanvas();
  createDots();
});

setupCanvas();

// ——— MOUSE PARALLAX (desktop only) ———
const heroContent = document.querySelector('.hero-content');
const heroBlobs = document.querySelector('.hero-blobs');

if (window.innerWidth > 768) {
  document.addEventListener('mousemove', (e) => {
    const xPct = (e.clientX / window.innerWidth - 0.5);
    const yPct = (e.clientY / window.innerHeight - 0.5);

    if (heroContent) {
      heroContent.style.transform = `translate(${xPct * 8}px, ${yPct * 5}px)`;
    }

    if (heroBlobs) {
      heroBlobs.style.transform = `translate(${xPct * 20}px, ${yPct * 12}px)`;
    }
  });
}

// ——— PROJECT CARD TILT ———
const tiltCards = document.querySelectorAll('[data-tilt]');

tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 5}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    setTimeout(() => card.style.transition = '', 500);
  });
});

// ——— COPY EMAIL ———
const copyBtn = document.getElementById('copyEmail');
const copyText = document.getElementById('copyText');

if (copyBtn) {
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('sauravsimariya4321@gmail.com').then(() => {
      copyText.textContent = 'Copied! ✓';
      copyBtn.style.background = '#059669';
      showToast('✓ Email copied to clipboard!');
      setTimeout(() => {
        copyText.textContent = 'Copy Email';
        copyBtn.style.background = '';
      }, 2500);
    }).catch(() => {
      // Fallback
      const el = document.createElement('textarea');
      el.value = 'sauravsimariya4321@gmail.com';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      el.remove();
      showToast('✓ Email copied!');
    });
  });
}

// ——— TOAST ———
let toastEl = null;

function showToast(message) {
  if (!toastEl) {
    toastEl = document.createElement('div');
    toastEl.className = 'toast';
    document.body.appendChild(toastEl);
  }
  toastEl.textContent = message;
  toastEl.classList.add('show');
  clearTimeout(toastEl._timeout);
  toastEl._timeout = setTimeout(() => toastEl.classList.remove('show'), 2500);
}

// ——— BACK TO TOP ———
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ——— SMOOTH ANCHOR SCROLLING ———
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ——— INITIAL SETUP ———
window.addEventListener('scroll', () => {
  checkReveals();
  startCounters();
}, { passive: true });

// Run after a short delay to allow DOM painting
setTimeout(() => {
  checkReveals();
  startCounters();
}, 100);
