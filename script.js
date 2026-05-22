// ============================================
// KINGFETSON PORTFOLIO — Main Script
// Animated Logo, Navigation, Scroll Effects & Interactions
// ============================================

(function() {
    'use strict';

    // ---------- DOM Elements ----------
    const nav = document.getElementById('navbar');
    const logo = document.querySelector('.logo');
    const revealElements = document.querySelectorAll('.reveal');
    const cards = document.querySelectorAll('.card');
    const pills = document.querySelectorAll('.tech-pill');
    const orb1 = document.querySelector('.gradient-orb');
    const orb2 = document.querySelector('.gradient-orb-2');
    const allAnchorLinks = document.querySelectorAll('a[href^="#"]');
    
    // ---------- 1. Navbar Scroll Effect (Dynamic Background) ----------
    function handleNavbarScroll() {
        if (!nav) return;
        
        if (window.scrollY > 35) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
    
    // Initial call
    handleNavbarScroll();
    
    // Add scroll listener with throttling for performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(function() {
            handleNavbarScroll();
        });
    });
    
    // ---------- 2. Intersection Observer for Reveal Animations ----------
    const observerOptions = {
        threshold: 0.12,
        rootMargin: "0px 0px -20px 0px"
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, idx) => {
            if (entry.isIntersecting) {
                // Staggered animation delay for visual elegance
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, idx * 50);
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    revealElements.forEach(el => revealObserver.observe(el));
    
    // ---------- 3. Parallax Mouse Movement for Gradient Orbs ----------
    if (orb1 && orb2) {
        let mouseX = 0, mouseY = 0;
        let orb1X = 0, orb1Y = 0;
        let orb2X = 0, orb2Y = 0;
        
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX / window.innerWidth;
            mouseY = e.clientY / window.innerHeight;
            
            // Calculate target positions
            const targetOrb1X = (mouseX - 0.5) * 25;
            const targetOrb1Y = (mouseY - 0.5) * 25;
            const targetOrb2X = (mouseX - 0.5) * -20;
            const targetOrb2Y = (mouseY - 0.5) * -20;
            
            // Smooth interpolation for fluid movement
            orb1X += (targetOrb1X - orb1X) * 0.08;
            orb1Y += (targetOrb1Y - orb1Y) * 0.08;
            orb2X += (targetOrb2X - orb2X) * 0.08;
            orb2Y += (targetOrb2Y - orb2Y) * 0.08;
            
            orb1.style.transform = `translate(${orb1X}px, ${orb1Y}px) scale(1.05)`;
            orb2.style.transform = `translate(${orb2X}px, ${orb2Y}px) scale(1.03)`;
        });
    }
    
    // ---------- 4. Smooth Scroll for Anchor Links ----------
    function smoothScroll(targetElement, offset = 85) {
        if (!targetElement) return;
        
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
    
    allAnchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#" or empty
            if (!targetId || targetId === '#') return;
            
            // Handle work and expertise sections
            if (targetId === '#work' || targetId === '#expertise') {
                e.preventDefault();
                const target = document.querySelector(targetId);
                if (target) {
                    smoothScroll(target, 85);
                    // Update URL without causing jump
                    history.pushState(null, null, targetId);
                }
            }
        });
    });
    
    // ---------- 5. Card Hover Micro-Interactions ----------
    cards.forEach(card => {
        const icon = card.querySelector('.card-icon i');
        
        card.addEventListener('mouseenter', () => {
            if (icon) {
                icon.style.transform = 'scale(1.1)';
                icon.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.2, 0.64, 1)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
    
    // ---------- 6. Tech Pill Hover Effects ----------
    pills.forEach(pill => {
        const icon = pill.querySelector('i');
        
        pill.addEventListener('mouseenter', () => {
            if (icon) {
                icon.style.transform = 'scale(1.15)';
                icon.style.transition = 'transform 0.2s ease';
            }
        });
        
        pill.addEventListener('mouseleave', () => {
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
    
    // ---------- 7. Animated Logo Interactive Enhancement ----------
    if (logo) {
        // Reset animation after click for seamless experience
        logo.addEventListener('click', function(e) {
            // Prevent interference with any parent click events
            e.stopPropagation();
            
            // Force reflow to restart animation
            this.style.animation = 'none';
            this.offsetHeight; // Trigger reflow
            this.style.animation = 'shimmerFlow 5s linear infinite, subtleGlow 3s ease-in-out infinite';
            
            // Optional: Add a subtle console feedback (removed for production, but keeping brand touch)
            console.log('⚡ KINGFETSON — Brand identity animated');
        });
        
        // Enhanced hover that doesn't conflict with CSS
        logo.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    }
    
    // ---------- 8. Dynamic Gradient Text Effect on Scroll (Subtle) ----------
    const heroTitle = document.querySelector('.hero h1 .accent-word');
    if (heroTitle) {
        let gradientPos = 0;
        let gradientDirection = 1;
        
        // Subtle gradient shift on scroll (optional micro-interaction)
        window.addEventListener('scroll', function() {
            const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
            gradientPos += gradientDirection * 0.005;
            
            if (gradientPos >= 1) gradientDirection = -1;
            if (gradientPos <= 0) gradientDirection = 1;
            
            // Only apply if not animating heavily to save performance
            if (Math.abs(scrollPercent - 0.5) < 0.3) {
                const dynamicGradient = `linear-gradient(135deg, #6366f1 ${gradientPos * 50}%, #a855f7 ${50 + gradientPos * 20}%, #ec4899 ${100 - gradientPos * 30}%)`;
                heroTitle.style.background = dynamicGradient;
                heroTitle.style.webkitBackgroundClip = 'text';
                heroTitle.style.backgroundClip = 'text';
            }
        });
    }
    
    // ---------- 9. Preloader / Initial Animation Setup ----------
    function initialHeroAnimation() {
        const heroElements = document.querySelectorAll('.hero .badge, .hero h1, .hero p, .hero-actions');
        heroElements.forEach((el, idx) => {
            el.style.animation = `fadeInUp 0.6s cubic-bezier(0.23, 1, 0.32, 1) ${idx * 0.1}s forwards`;
            el.style.opacity = '0';
        });
    }
    
    // Ensure fadeInUp keyframe exists in CSS (already defined, but this is backup)
    // Add style if missing (dynamic safety)
    if (!document.querySelector('#dynamic-animation-style')) {
        const style = document.createElement('style');
        style.id = 'dynamic-animation-style';
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Call initial animation after a micro delay (ensures DOM is ready)
    setTimeout(() => {
        const heroBadge = document.querySelector('.hero .badge');
        const heroH1 = document.querySelector('.hero h1');
        const heroP = document.querySelector('.hero p');
        const heroActions = document.querySelector('.hero-actions');
        
        if (heroBadge) heroBadge.style.opacity = '1';
        if (heroH1) heroH1.style.opacity = '1';
        if (heroP) heroP.style.opacity = '1';
        if (heroActions) heroActions.style.opacity = '1';
    }, 50);
    
    // ---------- 10. Window Resize Handler (Prevent Transform Glitches) ----------
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Reset any inline transforms that might cause layout shifts
            if (orb1 && orb2) {
                orb1.style.transform = '';
                orb2.style.transform = '';
            }
            
            // Re-observe any reveal elements that might have shifted
            const allReveal = document.querySelectorAll('.reveal:not(.active)');
            allReveal.forEach(el => {
                if (el.getBoundingClientRect().top < window.innerHeight - 100) {
                    el.classList.add('active');
                }
            });
        }, 150);
    });
    
    // ---------- 11. Console Signature (Brand Identity) ----------
    console.log('%c⚡ KINGFETSON • Digital Architecture & Purity', 'color: #a855f7; font-size: 14px; font-weight: bold; font-family: monospace');
    console.log('%cAnimated Logo | Interactive Navigation | Smooth UX', 'color: #6366f1; font-size: 12px');
    console.log('%cInterfaces that breathe, infrastructure that scales.', 'color: #94a3b8; font-size: 11px; font-style: italic');
    
    // ---------- 12. Optional: Lazy Load / Performance (Future-proof) ----------
    // Add any cards or dynamic content if needed (extensible)
    
    // ---------- 13. Prevent FOUC (Flash of Unstyled Content) ----------
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
        // Additional check: ensure all reveal elements visible on load
        const hiddenReveal = document.querySelectorAll('.reveal:not(.active)');
        hiddenReveal.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50) {
                el.classList.add('active');
            }
        });
    });
    
    // ---------- 14. Touch Device Optimization ----------
    if ('ontouchstart' in window) {
        // Disable parallax on touch devices for better performance
        if (orb1 && orb2) {
            window.removeEventListener('mousemove', () => {});
            orb1.style.transform = 'translate(0, 0)';
            orb2.style.transform = 'translate(0, 0)';
        }
        
        // Simplify hover effects for touch
        document.body.classList.add('touch-device');
    }
    
    // ---------- 15. Add touch-friendly class for CSS adjustments ----------
    if (window.matchMedia('(hover: none)').matches) {
        document.body.classList.add('no-hover');
    }
    
    // ---------- 16. Prefetch / Preconnect for external fonts (Optimization) ----------
    const preconnectLinks = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://cdnjs.cloudflare.com'
    ];
    
    preconnectLinks.forEach(link => {
        const linkTag = document.createElement('link');
        linkTag.rel = 'preconnect';
        linkTag.href = link;
        linkTag.crossOrigin = 'anonymous';
        document.head.appendChild(linkTag);
    });
    
    // ---------- 17. Exit Intent / Smooth Outro (Optional Enhancement) ----------
    let exitIntentTriggered = false;
    document.addEventListener('mouseleave', function(e) {
        if (e.clientY <= 0 && !exitIntentTriggered && window.scrollY < 100) {
            exitIntentTriggered = true;
            // Optional: Could show a modal, but we'll just log for now
            console.log('✨ Thanks for visiting KINGFETSON portfolio');
            setTimeout(() => { exitIntentTriggered = false; }, 5000);
        }
    });
    
    // ---------- 18. Dynamic Year Update in Footer (if needed) ----------
    const footerYear = document.querySelector('footer p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        if (footerYear.innerHTML.includes('2026')) {
            footerYear.innerHTML = footerYear.innerHTML.replace('2026', currentYear);
        }
    }
    
})();
