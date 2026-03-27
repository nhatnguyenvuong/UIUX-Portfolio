/* ============================================================
   NGUYEN VUONG — PORTFOLIO SCRIPT
   ============================================================ */

gsap.registerPlugin(ScrollTrigger);

/* ── Utilities ───────────────────────────────────────────────── */
const qs  = (s, root = document) => root.querySelector(s);
const qsa = (s, root = document) => [...root.querySelectorAll(s)];

/* ── Loader ─────────────────────────────────────────────────── */
(function initLoader() {
    const loader = qs('#loader');
    document.body.style.overflow = 'hidden';

    // Give browser a moment then animate out
    setTimeout(() => {
        const tl = gsap.timeline({
            onComplete() {
                loader.style.display = 'none';
                document.body.style.overflow = '';
                initHero();
                initScrollAnimations();
            }
        });

        tl.to('.loader-mark', {
            y: -20, opacity: 0,
            duration: 0.55, ease: 'power2.in'
        })
        .to(loader, {
            opacity: 0,
            duration: 0.45, ease: 'power2.out'
        });
    }, 1400); // wait for progress bar animation
})();

/* ── Cursor ─────────────────────────────────────────────────── */
(function initCursor() {
    const ring = qs('#cursor');
    const dot  = qs('#cursor-dot');

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx, ry = my;

    document.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;
        gsap.set(dot, { x: mx, y: my });
    });

    // Ring follows with smooth lag
    gsap.ticker.add(() => {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        gsap.set(ring, { x: rx, y: ry });
    });

    // Expand on interactive elements
    qsa('a, button, .other-item, .process-step, .skill-list li').forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('hover'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });
})();

/* ── Navigation ─────────────────────────────────────────────── */
(function initNav() {
    const nav = qs('#nav');
    let lastY = 0;

    // Fade in after loader completes (delayed so it doesn't flash)
    setTimeout(() => nav.classList.add('visible'), 1600);

    window.addEventListener('scroll', () => {
        const y = window.scrollY;

        // Scrolled style
        nav.classList.toggle('scrolled', y > 60);

        // Auto-hide on scroll down
        if (y > lastY && y > 200) {
            nav.classList.add('hidden');
        } else {
            nav.classList.remove('hidden');
        }

        lastY = y;
    }, { passive: true });

    // Active link highlighting
    const sections = qsa('section[id]');
    const links    = qsa('.nav-link');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                links.forEach(l => l.classList.remove('active'));
                const active = qs(`.nav-link[href="#${e.target.id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(s => observer.observe(s));
})();

/* ── Smooth Scroll ───────────────────────────────────────────── */
qsa('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = qs(a.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 60, behavior: 'smooth' });
    });
});

/* ── Hero Entrance ───────────────────────────────────────────── */
function initHero() {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl
        // Name parts slide up from behind
        .to('.hn-part', {
            y: '0%', opacity: 1,
            duration: 1.2, stagger: 0.2
        })
        // Ornament spins in
        .to('.hn-ornament', {
            opacity: 1, scale: 1, rotate: 0,
            duration: 1.1, ease: 'back.out(1.4)'
        }, '-=0.8')
        // Bio fades up
        .to('.hero-bio', {
            opacity: 1, y: 0, duration: 0.9
        }, '-=0.5')
        // Buttons
        .to('.hero-ctas', {
            opacity: 1, y: 0, duration: 0.8
        }, '-=0.6')
        // Scroll cue
        .to('.hero-scroll-cue', {
            opacity: 1, duration: 0.7
        }, '-=0.4');
}

/* ── Scroll Animations ───────────────────────────────────────── */
function initScrollAnimations() {
    // Section labels
    qsa('.section-label').forEach(el => {
        gsap.to(el, {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' }
        });
    });

    // About
    gsap.to('.about-bio', {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-bio', start: 'top 82%' }
    });
    gsap.to('.about-quote', {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1,
        scrollTrigger: { trigger: '.about-quote', start: 'top 84%' }
    });
    gsap.to('.about-philosophy', {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2,
        scrollTrigger: { trigger: '.about-philosophy', start: 'top 86%' }
    });
    gsap.to('.about-right', {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-right', start: 'top 82%' }
    });
    gsap.to('.about-stats', {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-stats', start: 'top 88%' }
    });

    // Works list – stagger each row
    gsap.to('.reveal-item', {
        opacity: 1, y: 0,
        duration: 0.65,
        stagger: 0.09,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.works-list', start: 'top 80%' }
    });

    // Other works
    gsap.to('.other-works', {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.other-works', start: 'top 88%' }
    });

    // Process
    gsap.to('.process-step', {
        opacity: 1, y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.process-grid', start: 'top 82%' }
    });

    // Contact
    gsap.to('.contact-heading', {
        opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-heading', start: 'top 82%' }
    });
    gsap.to('.contact-links', {
        opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-links', start: 'top 86%' }
    });
    gsap.to('.site-footer', {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.site-footer', start: 'top 92%' }
    });

    // Stat counter
    initCounters();
}

/* ── Stats Counter ───────────────────────────────────────────── */
function initCounters() {
    qsa('.stat-num[data-target]').forEach(el => {
        const target = parseInt(el.getAttribute('data-target'), 10);
        const obj = { val: 0 };

        ScrollTrigger.create({
            trigger: el,
            start: 'top 88%',
            once: true,
            onEnter() {
                gsap.to(obj, {
                    val: target,
                    duration: 1.4,
                    ease: 'power2.out',
                    onUpdate() {
                        el.textContent = Math.round(obj.val);
                    }
                });
            }
        });
    });
}

/* ── Work Preview Card ───────────────────────────────────────── */
(function initWorkPreview() {
    const card    = qs('#workPreview');
    const inner   = qs('.wpc-inner');
    const label   = qs('.wpc-label');
    const items   = qsa('.work-item');

    let px = -999, py = -999;  // card position (raw)
    let tx = -999, ty = -999;  // target (mouse)
    let visible = false;

    // Smooth card follow
    gsap.ticker.add(() => {
        if (!visible) return;
        px += (tx - px) * 0.09;
        py += (ty - py) * 0.09;
        gsap.set(card, { x: px, y: py });
    });

    document.addEventListener('mousemove', e => {
        tx = e.clientX;
        ty = e.clientY;
        // Seed position on first enter so card doesn't "fly in"
        if (!visible) { px = tx; py = ty; }
    });

    items.forEach(item => {
        item.addEventListener('mouseenter', () => {
            inner.style.background = item.getAttribute('data-bg');
            label.textContent      = item.getAttribute('data-label');
            card.classList.add('active');
            visible = true;
        });

        item.addEventListener('mouseleave', () => {
            card.classList.remove('active');
            visible = false;
        });
    });
})();

/* ── Marquee pause on hover ──────────────────────────────────── */
const marquee = qs('.marquee-content');
if (marquee) {
    marquee.addEventListener('mouseenter', () => {
        marquee.style.animationPlayState = 'paused';
    });
    marquee.addEventListener('mouseleave', () => {
        marquee.style.animationPlayState = 'running';
    });
}

/* ── Hero background parallax ────────────────────────────────── */
window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const bg = qs('.hero-bg img');
    if (bg) bg.style.transform = `translateY(${y * 0.3}px)`;
}, { passive: true });
