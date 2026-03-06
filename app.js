/* =============================
   NAVBAR SCROLL EFFECT
   ============================= */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* =============================
   HAMBURGER MENU
   ============================= */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* =============================
   TYPEWRITER EFFECT
   ============================= */
const phrases = [
    'Quality Assurance Specialist 🎯',
    'Data-Driven Tester 📊',
    'Flight Booking Expert ✈️',
    'Automation Enthusiast 🤖',
    'SQL Validation Pro 💻',
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterEl = document.getElementById('typewriter');

function typeWriter() {
    const current = phrases[phraseIndex];
    if (isDeleting) {
        typewriterEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }
    let delay = isDeleting ? 55 : 95;
    if (!isDeleting && charIndex === current.length) { delay = 2500; isDeleting = true; }
    else if (isDeleting && charIndex === 0) { isDeleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; delay = 350; }
    setTimeout(typeWriter, delay);
}
typeWriter();

/* =============================
   SKILL BARS ANIMATION
   ============================= */
const skillFills = document.querySelectorAll('.skill-fill');
let skillsAnimated = false;
function animateSkills() {
    if (skillsAnimated) return;
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;
    if (skillsSection.getBoundingClientRect().top < window.innerHeight - 80) {
        skillFills.forEach(fill => {
            const w = fill.style.width;
            fill.style.width = '0';
            requestAnimationFrame(() => setTimeout(() => fill.style.width = w, 80));
        });
        skillsAnimated = true;
    }
}

/* =============================
   REVEAL ON SCROLL
   ============================= */
const revealEls = document.querySelectorAll(
    '.skill-category, .project-card, .timeline-item, .info-card, .profile-card, .contact-link, .badge-item, .org-card, .soft-skill-card, .edu-card'
);
revealEls.forEach(el => el.classList.add('reveal'));

function revealOnScroll() {
    revealEls.forEach((el, i) => {
        if (el.getBoundingClientRect().top < window.innerHeight - 70) {
            setTimeout(() => el.classList.add('visible'), i * 50);
        }
    });
    animateSkills();
}
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

/* =============================
   ACTIVE NAV LINK
   ============================= */
const sections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-link');
function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 120) current = section.getAttribute('id');
    });
    allNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
}
window.addEventListener('scroll', updateActiveNav);

/* =============================
   CONTACT FORM HANDLER
   ============================= */
function handleSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const formSuccess = document.getElementById('formSuccess');
    btn.disabled = true;
    btnText.textContent = 'Sending...';
    setTimeout(() => {
        btn.disabled = false;
        btnText.textContent = 'Send Message';
        formSuccess.style.display = 'block';
        document.getElementById('contactForm').reset();
        setTimeout(() => formSuccess.style.display = 'none', 5000);
    }, 1400);
}

/* =============================
   SUBTLE CURSOR GLOW
   ============================= */
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
  position: fixed; pointer-events: none; z-index: 9999;
  width: 350px; height: 350px; border-radius: 50%;
  background: radial-gradient(circle, rgba(138,43,226,0.065) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  transition: opacity 0.3s;
`;
document.body.appendChild(cursorGlow);
let mx = 0, my = 0, cx = 0, cy = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function animGlow() {
    cx += (mx - cx) * 0.07;
    cy += (my - cy) * 0.07;
    cursorGlow.style.left = cx + 'px';
    cursorGlow.style.top = cy + 'px';
    requestAnimationFrame(animGlow);
})();

/* =============================
   FLOATING PARTICLES (Hero)
   ============================= */
(function particles() {
    const bg = document.querySelector('.hero-bg');
    if (!bg) return;
    for (let i = 0; i < 18; i++) {
        const p = document.createElement('div');
        const size = Math.random() * 2.5 + 1;
        const left = Math.random() * 100;
        const delay = Math.random() * 12;
        const dur = 12 + Math.random() * 18;
        const color = Math.random() > 0.6 ? '#6366f1' : Math.random() > 0.5 ? '#06b6d4' : '#ec4899';
        p.style.cssText = `
      position:absolute; border-radius:50%;
      width:${size}px; height:${size}px; background:${color};
      left:${left}%; bottom:-10px; opacity:0;
      animation:particleRise ${dur}s ${delay}s linear infinite;
    `;
        bg.appendChild(p);
    }
    const s = document.createElement('style');
    s.textContent = `
    @keyframes particleRise {
      0%{bottom:-10px;opacity:0}
      8%{opacity:0.5}
      85%{opacity:0.08}
      100%{bottom:105%;opacity:0}
    }
  `;
    document.head.appendChild(s);
})();

/* =============================
   COUNTER ANIMATION (stats)
   ============================= */
function animateCounter(el, target, isFloat, suffix) {
    const dur = 1800;
    const start = performance.now();
    const from = 0;
    function update(now) {
        const progress = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const val = from + (target - from) * ease;
        el.textContent = isFloat ? val.toFixed(2) : (suffix === '+' ? Math.floor(val) + suffix : Math.floor(val));
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

const statNums = document.querySelectorAll('.stat-number');
let countersRan = false;
function tryCounters() {
    if (countersRan) return;
    const hero = document.querySelector('.hero-stats');
    if (!hero) return;
    if (hero.getBoundingClientRect().top < window.innerHeight) {
        countersRan = true;
        statNums.forEach(el => {
            const raw = el.textContent.trim();
            if (raw === '∞') return;
            const isFloat = raw.includes('.');
            const suffix = raw.includes('+') ? '+' : '';
            const val = parseFloat(raw.replace('+', ''));
            if (!isNaN(val)) animateCounter(el, val, isFloat, suffix);
        });
    }
}
window.addEventListener('scroll', tryCounters);
tryCounters();
