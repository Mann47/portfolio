
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    const toggle = document.getElementById('themeToggle');
    if (toggle) toggle.textContent = theme === 'dark' ? '☀️' : '🌙'; 
}

function setupThemeToggle() {
    const saved = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(saved || (systemDark ? 'dark' : 'light'));

    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;
    toggle.addEventListener('click', function () {
        const current = document.documentElement.getAttribute('data-theme');
        applyTheme(current === 'dark' ? 'light' : 'dark');
    });
}


// Progress bar, navbar shadow, back-to-top visibility, and active nav link.
function setupScrollEffects() {
    const navbar = document.getElementById('navbar');
    const progress = document.getElementById('scrollProgress');
    const backToTop = document.getElementById('backToTop');
    const sections = document.querySelectorAll('section[id]');

    const navLinkFor = {};   
    document.querySelectorAll('.nav-links a').forEach(function (link) {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) navLinkFor[href.slice(1)] = link;
    });

    function onScroll() {
        const scrolled = window.scrollY;
        const pageHeight = document.documentElement.scrollHeight - window.innerHeight;

        if (progress) progress.style.width = (pageHeight > 0 ? (scrolled / pageHeight) * 100 : 0) + '%';
        if (navbar) navbar.classList.toggle('scrolled', scrolled > 20);
        if (backToTop) backToTop.classList.toggle('show', scrolled > 400);

        const position = scrolled + 120;
        sections.forEach(function (section) {
            const link = navLinkFor[section.id];
            if (!link) return;
            const inView = position >= section.offsetTop &&
                           position < section.offsetTop + section.offsetHeight;
            if (inView) {
                Object.values(navLinkFor).forEach(function (l) { l.classList.remove('active'); });
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (backToTop) {
        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}


function setupMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navLinks');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', function () {
        menu.classList.toggle('open');
    });
    menu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            menu.classList.remove('open');
        });
    });
}


// Reveals elements on scroll, then fills any skill bars and runs any counters inside them.
function setupScrollReveal() {
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            entry.target.querySelectorAll('.skill-bar span').forEach(function (bar) {
                bar.style.width = bar.dataset.level + '%';
            });
            entry.target.querySelectorAll('[data-count]').forEach(countUp);
            observer.unobserve(entry.target);   // run once
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(function (el) {
        observer.observe(el);
    });
}

// Counts up from 0 to the element's data-count value.
function countUp(element) {
    const target = parseInt(element.dataset.count, 10) || 0;
    const duration = 1400;
    const startTime = performance.now();

    function step(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);   // ease-out
        element.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(step);
        else element.textContent = target;
    }
    requestAnimationFrame(step);
}


// Auto-types the job titles from the #typed element's data-roles attribute.
function setupTypedText() {
    const el = document.getElementById('typed');
    if (!el) return;
    const roles = JSON.parse(el.dataset.roles || '[]');
    if (!roles.length) return;

    let roleIndex = 0, charCount = 0, deleting = false;

    function tick() {
        const word = roles[roleIndex];
        el.textContent = word.substring(0, charCount);

        if (!deleting && charCount < word.length) {
            charCount++;
            setTimeout(tick, 80);
        } else if (!deleting && charCount === word.length) {
            deleting = true;
            setTimeout(tick, 1600);     // hold on the full word
        } else if (deleting && charCount > 0) {
            charCount--;
            setTimeout(tick, 40);
        } else {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(tick, 300);
        }
    }
    tick();
}


// If assets/developer.png exists, use it in the hero + about; otherwise the
// initials / emoji placeholders stay.
function setupProfilePhoto() {
    const PHOTO = 'assets/developer.png';

    function makeImage() {
        const img = document.createElement('img');
        img.src = PHOTO;
        img.alt = 'Manandeep Singh';
        return img;
    }

    const probe = new Image();
    probe.onload = function () {
        const avatar = document.getElementById('heroAvatar');
        if (avatar && !avatar.querySelector('img')) {
            const initials = avatar.querySelector('.avatar-initials');
            if (initials) initials.style.display = 'none';
            avatar.insertBefore(makeImage(), avatar.firstChild);
        }
        const aboutPhoto = document.getElementById('aboutPhoto');
        if (aboutPhoto) {
            aboutPhoto.innerHTML = '';
            aboutPhoto.appendChild(makeImage());
        }
    };
    probe.src = PHOTO;
}


function setupFooterYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
}


function init() {
    setupThemeToggle();
    setupScrollEffects();
    setupMobileMenu();
    setupScrollReveal();
    setupTypedText();
    setupProfilePhoto();
    setupFooterYear();
}

document.addEventListener('DOMContentLoaded', init);
