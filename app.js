/* ===========================
   APP.JS — Helena Portfolio
   =========================== */

// ---- HAMBURGER MENU ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
});

// Close nav when a link is clicked (mobile)
navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
    });
});

// ---- ACTIVE NAV LINK ON SCROLL ----
const sections = document.querySelectorAll('[id]');
const allNavLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
        const top = section.getBoundingClientRect().top;
        if (top <= 80) current = section.id;
    });
    allNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}
window.addEventListener('scroll', updateActiveLink);

// ---- TYPEWRITER ----
const phrases = [
    'End-to-End Testing',
    'Payment Validation',
    'OTA Price Monitoring',
    'SQL & BigQuery',
    'Booking System QA',
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWrite() {
    const el = document.getElementById('typewriter');
    if (!el) return;
    const current = phrases[phraseIndex];

    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    el.textContent = current.substring(0, charIndex);

    let speed = isDeleting ? 50 : 80;

    if (!isDeleting && charIndex === current.length) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 400;
    }

    setTimeout(typeWrite, speed);
}
typeWrite();

// ---- SCROLL REVEAL ----
const revealEls = document.querySelectorAll(
    '.gallery-card, .exp-row, .exp-block, .skill-block, .contact-card, .about-card, .hero-icon-item'
);
revealEls.forEach(el => el.classList.add('reveal'));

function revealOnScroll() {
    revealEls.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 60) {
            setTimeout(() => el.classList.add('visible'), i * 30);
        }
    });
}
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// ---- CONTACT FORM ----
function handleSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const msg = document.getElementById('formMsg');
    btn.disabled = true;
    btn.textContent = 'Sending…';
    setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.disabled = false;
        msg.textContent = '✅ Message sent! I will get back to you soon.';
        e.target.reset();
        setTimeout(() => { msg.textContent = ''; }, 5000);
    }, 1200);
}
