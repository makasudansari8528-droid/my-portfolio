/* ============================================
   ULTIMATE PORTFOLIO JAV

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    Loader.init();
    Cursor.init();
    Theme.init();
    Navigation.init();
    Animations.init();
    Forms.init();
    Testimonials.init();
    Filters.init();
    BackToTop.init();
});

/* ===== Loader Module ===== */
const Loader = {
    init() {
        const loader = document.querySelector('.loader');
        const progress = document.querySelector('.loader-progress');
        const percent = document.querySelector('.loader-percent');
        
        let loaded = 0;
        const interval = setInterval(() => {
            loaded += Math.random() * 20;
            if (loaded >= 100) {
                loaded = 100;
                clearInterval(interval);
                setTimeout(() => {
                    loader.classList.add('loaded');
                    document.body.classList.remove('no-scroll');
                    // Trigger hero animations after loader
                    setTimeout(() => Animations.animateHero(), 300);
                }, 500);
            }
            progress.style.width = `${loaded}%`;
            percent.textContent = `${Math.floor(loaded)}%`;
        }, 100);
        
        document.body.classList.add('no-scroll');
    }
};

/* ===== Custom Cursor Module ===== */
const Cursor = {
    init() {
        if (window.matchMedia('(hover: hover)').matches && window.innerWidth >= 1024) {
            const cursor = document.querySelector('.cursor');
            const follower = document.querySelector('.cursor-follower');
            
            let mouseX = 0, mouseY = 0;
            let followerX = 0, followerY = 0;
            
            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
                cursor.style.left = `${mouseX}px`;
                cursor.style.top = `${mouseY}px`;
            });
            
            // Smooth follower animation
            const animateFollower = () => {
                followerX += (mouseX - followerX) * 0.1;
                followerY += (mouseY - followerY) * 0.1;
                follower.style.left = `${followerX}px`;
                follower.style.top = `${followerY}px`;
                requestAnimationFrame(animateFollower);
            };
            animateFollower();
            
            // Hover effects
            const hoverElements = document.querySelectorAll('a, button, .magnetic');
            hoverElements.forEach(el => {
                el.addEventListener('mouseenter', () => follower.classList.add('hovering'));
                el.addEventListener('mouseleave', () => follower.classList.remove('hovering'));
            });
        }
    }
};

/* ===== Theme Module ===== */
const Theme = {
    init() {
        const toggle = document.querySelector('.theme-toggle');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Check saved theme or system preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else if (prefersDark.matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        
        toggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
};

/* ===== Navigation Module ===== */
const Navigation = {
    init() {
        const nav = document.querySelector('.nav');
        const toggle = document.querySelector('.nav-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileLinks = document.querySelectorAll('.mobile-link');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Scroll effects
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
            
            // Active link update
            this.updateActiveLink();
        });
        
        // Mobile menu toggle
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
        
        // Close mobile menu on link click
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
        
        // Smooth scroll for all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offset = nav.offsetHeight;
                    const position = target.offsetTop - offset;
                    window.scrollTo({
                        top: position,
                        behavior: 'smooth'
                    });
                }
            });
        });
    },
    
    updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
};

/* ===== Animations Module ===== */
const Animations = {
    init() {
        gsap.registerPlugin(ScrollTrigger);
        this.initScrollAnimations();
        this.initSkillBars();
        this.initCounters();
        this.initMagnetic();
    },
    
    animateHero() {
        const tl = gsap.timeline();
        
        tl.to('.hero-badge', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out'
        })
        .to('.word', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out'
        }, '-=0.3')
        .to('.hero-description', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out'
        }, '-=0.4')
        .to('.hero-actions', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out'
        }, '-=0.3')
        .to('.hero-stats', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out'
        }, '-=0.3')
        .to('.hero-visual', {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.5');
    },
    
    initScrollAnimations() {
        // Section headers
        gsap.utils.toArray('.section-header').forEach(header => {
            gsap.from(header.children, {
                scrollTrigger: {
                    trigger: header,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                y: 50,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out'
            });
        });
        
        // About content
        gsap.from('.about-content', {
            scrollTrigger: {
                trigger: '.about-content',
                start: 'top 80%'
            },
            opacity: 0,
            x: -50,
            duration: 0.8,
            ease: 'power3.out'
        });
        
        // Experience cards
        gsap.from('.exp-card', {
            scrollTrigger: {
                trigger: '.experience-cards',
                start: 'top 80%'
            },
            opacity: 0,
            y: 50,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out'
        });
        
        // Project cards
        gsap.from('.project-card', {
            scrollTrigger: {
                trigger: '.work-grid',
                start: 'top 80%'
            },
            opacity: 0,
            y: 50,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out'
        });
        
        // Skill items
        gsap.from('.skill-item', {
            scrollTrigger: {
                trigger: '.skills-wrapper',
                start: 'top 80%'
            },
            opacity: 0,
            scale: 0.8,
            duration: 0.5,
            stagger: 0.05,
            ease: 'back.out(1.7)'
        });
        
        // Contact
        gsap.from('.contact-info', {
            scrollTrigger: {
                trigger: '.contact-wrapper',
                start: 'top 80%'
            },
            opacity: 0,
            x: -50,
            duration: 0.8,
            ease: 'power3.out'
        });
        
        gsap.from('.contact-form', {
            scrollTrigger: {
                trigger: '.contact-wrapper',
                start: 'top 80%'
            },
            opacity: 0,
            x: 50,
            duration: 0.8,
            ease: 'power3.out'
        });
    },
    
    initSkillBars() {
        document.querySelectorAll('.skill-level').forEach(bar => {
            const level = bar.dataset.level;
            bar.style.setProperty('--skill-level', `${level}%`);
        });
    },
    
    initCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.count);
            
            ScrollTrigger.create({
                trigger: counter,
                start: 'top 80%',
                onEnter: () => {
                    gsap.to(counter, {
                        innerText: target,
                        duration: 2,
                        snap: { innerText: 1 },
                        ease: 'power1.out'
                    });
                },
                once: true
            });
        });
    },
    
    initMagnetic() {
        if (window.innerWidth < 1024) return;
        
        document.querySelectorAll('.magnetic').forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                gsap.to(el, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            el.addEventListener('mouseleave', () => {
                gsap.to(el, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.5)'
                });
            });
        });
    }
};

/* ===== Forms Module ===== */
const Forms = {
    init() {
        const form = document.getElementById('contactForm');
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<span>Sending...</span>';
            btn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                btn.innerHTML = '<span>Message Sent!</span><i class="ri-check-line"></i>';
                btn.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
                
                form.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }, 2000);
        });
    }
};

/* ===== Testimonials Module ===== */
const Testimonials = {
    init() {
        const track = document.querySelector('.testimonial-track');
        const cards = document.querySelectorAll('.testimonial-card');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.nav-btn.prev');
        const nextBtn = document.querySelector('.nav-btn.next');
        
        if (!track || cards.length === 0) return;
        
        let currentIndex = 0;
        const totalSlides = Math.ceil(cards.length / this.getVisibleCards());
        
        const updateSlider = () => {
            const cardWidth = cards[0].offsetWidth + 32; // Including gap
            const offset = currentIndex * cardWidth * this.getVisibleCards();
            track.style.transform = `translateX(-${offset}px)`;
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        };
        
        prevBtn.addEventListener('click', () => {
            currentIndex = Math.max(0, currentIndex - 1);
            updateSlider();
        });
        
        nextBtn.addEventListener('click', () => {
            currentIndex = Math.min(totalSlides - 1, currentIndex + 1);
            updateSlider();
        });
        
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateSlider();
            });
        });
        
        window.addEventListener('resize', updateSlider);
    },
    
    getVisibleCards() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }
};

/* ===== Filters Module ===== */
const Filters = {
    init() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projects = document.querySelectorAll('.project-card');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                projects.forEach(project => {
                    const category = project.dataset.category;
                    
                    if (filter === 'all' || category === filter) {
                        gsap.to(project, {
                            opacity: 1,
                            scale: 1,
                            duration: 0.4,
                            ease: 'power2.out'
                        });
                        project.style.display = 'block';
                    } else {
                        gsap.to(project, {
                            opacity: 0,
                            scale: 0.8,
                            duration: 0.4,
                            ease: 'power2.out',
                            onComplete: () => {
                                project.style.display = 'none';
                            }
                        });
                    }
                });
            });
        });
    }
};

/* ===== Back to Top Module ===== */
const BackToTop = {
    init() {
        const btn = document.querySelector('.back-to-top');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        });
        
        btn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
};
