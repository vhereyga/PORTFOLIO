/* ============================================
   PORTFOLIO — JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // --- Navbar scroll effect ---
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function handleScroll() {
        const scrollY = window.scrollY;

        // Navbar background
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top visibility
        if (scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Active nav link based on scroll position
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // --- Back to top ---
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- Mobile nav toggle ---
    const navToggle = document.getElementById('navToggle');
    const navLinksContainer = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
        document.body.style.overflow = navLinksContainer.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile nav on link click
    navLinksContainer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinksContainer.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // --- Smooth scroll for all anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Intersection Observer for reveal animations ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe journey cards, project cards
    document.querySelectorAll('.journey-card, .project-card').forEach(el => {
        revealObserver.observe(el);
    });

    // --- Skill bar animation ---
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.skill-progress');
                bars.forEach((bar, index) => {
                    setTimeout(() => {
                        const width = bar.getAttribute('data-width');
                        bar.style.width = width + '%';
                    }, index * 100);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.skills-category').forEach(cat => {
        skillObserver.observe(cat);
    });

    // --- Counter animation ---
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    let current = 0;
                    const increment = target / 60;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        counter.textContent = Math.floor(current);
                    }, 25);
                });
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        counterObserver.observe(heroStats);
    }

    // --- Contact form handler ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = document.getElementById('submitBtn');
            const originalText = btn.innerHTML;

            btn.innerHTML = '<span>Terkirim! ✓</span>';
            btn.style.background = '#4a7c10';
            btn.style.color = '#fff';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.style.color = '';
                btn.disabled = false;
                contactForm.reset();
            }, 3000);
        });
    }

    // --- Staggered animation delays for cards ---
    document.querySelectorAll('.journey-card').forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.15}s`;
    });

    document.querySelectorAll('.project-card').forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.12}s`;
    });

    // --- Parallax-like effect on hero ---
    const heroContent = document.querySelector('.hero-content');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY < window.innerHeight && heroContent) {
            heroContent.style.transform = `translateY(${scrollY * 0.15}px)`;
            heroContent.style.opacity = 1 - scrollY / (window.innerHeight * 0.8);
        }
    }, { passive: true });
});
