// Falaq Intelligence - Advanced Animations
// Uses GSAP + ScrollTrigger for professional animations

(function() {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Check if GSAP is available
  const gsapAvailable = typeof gsap !== 'undefined';

  function siteBase() {
    const parts = location.pathname.replace(/\/index\.html$/, '/').split('/').filter(Boolean);
    return location.hostname.endsWith('github.io') && parts[0] === 'falaq-intelligence' ? '/falaq-intelligence' : '';
  }
  
  if (prefersReducedMotion || !gsapAvailable) {
    // Fallback: reveal all elements immediately
    document.querySelectorAll('.reveal, .text-reveal, .line-reveal, .stagger-item, .section-reveal').forEach(el => {
      el.classList.add('revealed');
    });
    return;
  }

  // Register ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // ============================================
  // 1. LOADING SCREEN
  // ============================================
  function initLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = `
      <img src="${siteBase()}/assets/agent-logo-gold.png"
           alt="Falaq Intelligence"
           class="loading-logo">
    `;
    document.body.appendChild(loadingScreen);

    window.addEventListener('load', () => {
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => loadingScreen.remove(), 600);
        initAllAnimations();
      }, 800);
    });
  }

  // ============================================
  // 2. SCROLL PROGRESS BAR
  // ============================================
  function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.width = `${scrollPercent}%`;
    }, { passive: true });
  }

  // ============================================
  // 3. CUSTOM CURSOR
  // ============================================
  function initCustomCursor() {
    if (window.innerWidth <= 900) return;

    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    const follower = document.createElement('div');
    follower.className = 'cursor-follower';
    document.body.appendChild(cursor);
    document.body.appendChild(follower);

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    });

    function animateFollower() {
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      follower.style.left = `${followerX}px`;
      follower.style.top = `${followerY}px`;
      requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .card, .flow-card, .signal, .workflow li, .integration-strip span, .hero-badges span');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        follower.classList.add('active');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        follower.classList.remove('active');
      });
    });

    // Click effect
    document.addEventListener('mousedown', () => cursor.classList.add('active'));
    document.addEventListener('mouseup', () => cursor.classList.remove('active'));
  }

  // ============================================
  // 4. MAGNETIC BUTTONS
  // ============================================
  function initMagneticButtons() {
    if (window.innerWidth <= 900) return;

    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)'
        });
      });
    });
  }

  // ============================================
  // 5. TEXT REVEAL ANIMATION
  // ============================================
  function initTextReveal() {
    const textElements = document.querySelectorAll('h1, h2, .eyebrow');
    textElements.forEach(el => {
      // Check if already has text-reveal class
      if (!el.classList.contains('text-reveal')) {
        const text = el.innerHTML;
        el.innerHTML = text;
        el.classList.add('text-reveal');
        
        // Split into words
        const words = el.textContent.split(' ');
        el.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');
      }
    });

    // Animate on scroll
    gsap.utils.toArray('.text-reveal').forEach(el => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => el.classList.add('revealed')
      });
    });
  }

  // ============================================
  // 6. LINE REVEAL ANIMATION
  // ============================================
  function initLineReveal() {
    const lineElements = document.querySelectorAll('.lead, p');
    lineElements.forEach(el => {
      if (!el.classList.contains('line-reveal') && el.textContent.length > 20) {
        el.classList.add('line-reveal');
        el.innerHTML = `<span class="line-inner">${el.innerHTML}</span>`;
      }
    });

    gsap.utils.toArray('.line-reveal').forEach(el => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => el.classList.add('revealed')
      });
    });
  }

  // ============================================
  // 7. PARALLAX EFFECTS
  // ============================================
  function initParallax() {
    // Hero panel parallax
    const heroPanel = document.querySelector('.hero-panel');
    if (heroPanel) {
      gsap.to(heroPanel, {
        y: 60,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });
    }

    // Service visual parallax
    const serviceVisual = document.querySelector('.service-visual');
    if (serviceVisual) {
      gsap.to(serviceVisual, {
        y: 40,
        ease: 'none',
        scrollTrigger: {
          trigger: '.premium-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });
    }

    // Background gradients parallax
    gsap.utils.toArray('section').forEach((section, i) => {
      gsap.to(section, {
        backgroundPositionY: `${i * 10}%`,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    });
  }

  // ============================================
  // 8. ANIMATED COUNTERS
  // ============================================
  function initCounters() {
    const counters = document.querySelectorAll('.metric strong');
    counters.forEach(counter => {
      const text = counter.textContent;
      const num = parseInt(text);
      if (!isNaN(num)) {
        counter.setAttribute('data-target', num);
        counter.textContent = '0';
        
        ScrollTrigger.create({
          trigger: counter,
          start: 'top 85%',
          onEnter: () => {
            gsap.to(counter, {
              duration: 2,
              ease: 'power2.out',
              onUpdate: function() {
                const progress = this.progress();
                counter.textContent = Math.round(num * progress).toString().padStart(2, '0');
              }
            });
          }
        });
      }
    });
  }

  // ============================================
  // 9. STAGGER ANIMATIONS FOR GRID ITEMS
  // ============================================
  function initStaggerAnimations() {
    // Cards grid
    gsap.utils.toArray('.grid.three .card, .grid.two .card').forEach((card, i) => {
      card.classList.add('stagger-item');
      ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          setTimeout(() => card.classList.add('revealed'), i * 100);
        }
      });
    });

    // Flow cards
    gsap.utils.toArray('.feature-row .flow-card').forEach((card, i) => {
      card.classList.add('stagger-item');
      ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          setTimeout(() => card.classList.add('revealed'), i * 120);
        }
      });
    });

    // Pain grid cards
    gsap.utils.toArray('.pain-grid .card').forEach((card, i) => {
      card.classList.add('stagger-item');
      ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          setTimeout(() => card.classList.add('revealed'), i * 100);
        }
      });
    });

    // Workflow steps
    gsap.utils.toArray('.workflow li').forEach((step, i) => {
      step.classList.add('stagger-item');
      ScrollTrigger.create({
        trigger: step,
        start: 'top 85%',
        onEnter: () => {
          setTimeout(() => step.classList.add('revealed'), i * 150);
        }
      });
    });

    // Integration badges
    gsap.utils.toArray('.integration-strip span').forEach((badge, i) => {
      badge.classList.add('stagger-item');
      ScrollTrigger.create({
        trigger: badge,
        start: 'top 90%',
        onEnter: () => {
          setTimeout(() => badge.classList.add('revealed'), i * 80);
        }
      });
    });

    // Hero badges
    gsap.utils.toArray('.hero-badges span').forEach((badge, i) => {
      badge.classList.add('stagger-item');
      ScrollTrigger.create({
        trigger: badge,
        start: 'top 90%',
        onEnter: () => {
          setTimeout(() => badge.classList.add('revealed'), i * 100);
        }
      });
    });
  }

  // ============================================
  // 10. SECTION REVEAL ANIMATIONS
  // ============================================
  function initSectionReveals() {
    gsap.utils.toArray('section').forEach(section => {
      section.classList.add('section-reveal');
      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        onEnter: () => section.classList.add('revealed')
      });
    });
  }

  // ============================================
  // 11. HERO ANIMATIONS
  // ============================================
  function initHeroAnimations() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const tl = gsap.timeline({ delay: 1 });

    // Animate eyebrow
    const eyebrow = hero.querySelector('.eyebrow');
    if (eyebrow) {
      tl.from(eyebrow, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    }

    // Animate h1
    const h1 = hero.querySelector('h1');
    if (h1) {
      tl.from(h1, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.4');
    }

    // Animate lead text
    const lead = hero.querySelector('.lead');
    if (lead) {
      tl.from(lead, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.5');
    }

    // Animate buttons
    const buttons = hero.querySelectorAll('.btn');
    buttons.forEach((btn, i) => {
      tl.from(btn, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
      }, `-=${0.3 - i * 0.1}`);
    });

    // Animate hero panel
    const panel = hero.querySelector('.hero-panel');
    if (panel) {
      tl.from(panel, {
        x: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
      }, '-=1');
    }

    // Animate signals
    const signals = hero.querySelectorAll('.signal');
    signals.forEach((signal, i) => {
      tl.from(signal, {
        x: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
      }, `-=${0.4 - i * 0.1}`);
    });
  }

  // ============================================
  // 12. PAGE TRANSITION EFFECT
  // ============================================
  function initPageTransitions() {
    const links = document.querySelectorAll('a[href]');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('/') && !href.includes('#')) {
          e.preventDefault();
          
          const transition = document.createElement('div');
          transition.className = 'page-transition';
          document.body.appendChild(transition);
          
          gsap.to(transition, {
            scaleY: 1,
            duration: 0.5,
            ease: 'power2.inOut',
            onComplete: () => {
              window.location.href = href;
            }
          });
        }
      });
    });
  }

  // ============================================
  // 13. SMOOTH SCROLL ENHANCEMENT
  // ============================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          gsap.to(window, {
            duration: 1,
            scrollTo: { y: target, offsetY: 80 },
            ease: 'power3.inOut'
          });
        }
      });
    });
  }

  // ============================================
  // 14. NAVBAR SCROLL EFFECT
  // ============================================
  function initNavbarScroll() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      
      if (currentScroll > 100) {
        nav.style.background = 'rgba(10, 15, 30, 0.95)';
        nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
      } else {
        nav.style.background = 'rgba(10, 15, 30, 0.82)';
        nav.style.boxShadow = 'none';
      }
      
      lastScroll = currentScroll;
    }, { passive: true });
  }

  // ============================================
  // INITIALIZE ALL ANIMATIONS
  // ============================================
  function initAllAnimations() {
    initCustomCursor();
    initMagneticButtons();
    initTextReveal();
    initLineReveal();
    initParallax();
    initCounters();
    initStaggerAnimations();
    initSectionReveals();
    initHeroAnimations();
    initPageTransitions();
    initSmoothScroll();
    initNavbarScroll();
  }

  // ============================================
  // INITIALIZATION
  // ============================================
  // Initialize loading screen and scroll progress immediately
  initLoadingScreen();
  initScrollProgress();

  // If DOM is already loaded, initialize animations
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(initAllAnimations, 100);
  }

})();
