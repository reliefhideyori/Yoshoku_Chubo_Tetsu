// ===================================
// 洋食厨房 てつ - JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Header scroll effect
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Scroll reveal animation
    const revealElements = document.querySelectorAll('.section-container, .menu-item, .info-item');
    
    const revealOnScroll = function() {
        const windowHeight = window.innerHeight;
        
        revealElements.forEach(function(el) {
            const elementTop = el.getBoundingClientRect().top;
            const revealPoint = 150;
            
            if (elementTop < windowHeight - revealPoint) {
                el.classList.add('reveal', 'active');
            }
        });
    };
    
    // Initial check
    revealOnScroll();
    
    // Add scroll listener with throttle
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                revealOnScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Menu item hover parallax effect
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(function(item) {
        item.addEventListener('mousemove', function(e) {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        item.addEventListener('mouseleave', function() {
            item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.reveal').forEach(function(el) {
        observer.observe(el);
    });
    
    // Add reveal class to elements
    document.querySelectorAll('#philosophy .philosophy-content, #menu .menu-item, #info .info-details, #info .info-map').forEach(function(el) {
        el.classList.add('reveal');
        observer.observe(el);
    });
    
    // Preload images for smooth experience
    const imagesToPreload = [
        '洋食てつ_ハンバーグ.jpg',
        '洋食てつ_カキフライ.jpg',
        '洋食てつ_内装.jpg'
    ];
    
    imagesToPreload.forEach(function(src) {
        const img = new Image();
        img.src = src;
    });
    
    console.log('洋食厨房てつ - Website Loaded Successfully');
});
