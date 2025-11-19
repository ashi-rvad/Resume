// ===== CUSTOM CURSOR =====
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Cursor effects on hover
document.addEventListener('mouseover', (e) => {
    if (e.target.matches('a, button, .btn, .social-link, .portfolio-link, .filter-btn')) {
        cursor.style.transform = 'scale(1.5)';
        cursorFollower.style.transform = 'scale(1.5)';
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.matches('a, button, .btn, .social-link, .portfolio-link, .filter-btn')) {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
    }
});

document.addEventListener("click", () => {
  const music = document.getElementById("bg-music");
  
  if (music.muted) {
    music.muted = false;
    music.play();
  }
});


// ===== NAVIGATION =====
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active navigation link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ===== TYPING ANIMATION =====
const typedTextElement = document.querySelector('.typed-text');
const textArray = ['FullStack Developer', 'Tech Enthusiast', 'Problem Solver', 'AI-ML Enthusiast', 'Frontend Developer'];
let textArrayIndex = 0;
let charIndex = 0;

function typeText() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextElement.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 100);
    } else {
        setTimeout(eraseText, 2000);
    }
}

function eraseText() {
    if (charIndex > 0) {
        typedTextElement.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseText, 50);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) {
            textArrayIndex = 0;
        }
        setTimeout(typeText, 500);
    }
}

// Start typing animation
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeText, 1000);
});

// ===== SCROLL ANIMATIONS =====
const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add animation classes to elements
document.addEventListener('DOMContentLoaded', () => {
    // About section animations
    // const aboutInfo = document.querySelector('.about-info');
    // const aboutStats = document.querySelector('.about-stats');
    // const aboutSkills = document.querySelector('.about-skills');
    
    if (aboutInfo) aboutInfo.classList.add('fade-in');
    if (aboutStats) aboutStats.classList.add('slide-in-left');
    if (aboutSkills) aboutSkills.classList.add('slide-in-right');

    // Services animations
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.animationDelay = `${index * 0.2}s`;
    });

    // Portfolio animations
    document.querySelectorAll('.portfolio-item').forEach((item, index) => {
        item.classList.add('scale-in');
        item.style.animationDelay = `${index * 0.1}s`;
    });

    // Contact animations
    // const contactInfo = document.querySelector('.contact-info');
    // const contactForm = document.querySelector('.contact-form');
    
    // if (contactInfo) contactInfo.classList.add('slide-in-left');
    // if (contactForm) contactForm.classList.add('slide-in-right');
if (contactInfo) contactInfo.classList.add('slide-in-left');
if (contactForm) contactForm.classList.add('slide-in-right');




    // Observe all animated elements
    animatedElements.forEach(el => observer.observe(el));
});

// ===== SKILLS PROGRESS BARS =====
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
}

// Trigger progress bar animation when about section is visible
const aboutSection = document.querySelector('#about');
if (aboutSection) {
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
                aboutObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    aboutObserver.observe(aboutSection);
}

// ===== PORTFOLIO FILTERING =====
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filterValue === 'all') {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                if (item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});













document.addEventListener("DOMContentLoaded", () => {
    const progressBars = document.querySelectorAll(".progress-bar");

    progressBars.forEach(bar => {
        const targetWidth = bar.getAttribute("data-width");
        setTimeout(() => {
            bar.style.width = targetWidth;
        }, 300); // slight delay for animation
    });
});



















// ===== CONTACT FORM =====
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Reset form labels
            document.querySelectorAll('.form-group label').forEach(label => {
                label.style.top = '15px';
                label.style.fontSize = '16px';
                label.style.color = '#cccccc';
                label.style.background = 'transparent';
            });
        }, 2000);
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#6f00ff' : '#ff4757'};
        color: ${type === 'success' ? '#000000' : '#ffffff'};
        padding: 15px 20px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// ===== BACK TO TOP BUTTON =====
const backToTopBtn = document.querySelector('.back-to-top');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== FLOATING ICONS ANIMATION =====
const floatingIcons = document.querySelectorAll('.floating-icon');

floatingIcons.forEach((icon, index) => {
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'scale(1.2) translateY(-10px)';
        icon.style.background = 'rgba(0, 255, 136, 0.3)';
        
        // Show tooltip
        const tooltip = document.createElement('div');
        tooltip.textContent = icon.getAttribute('data-tech');
        tooltip.className = 'tech-tooltip';
        tooltip.style.cssText = `
            position: absolute;
            bottom: -35px;
            left: 50%;
            transform: translateX(-50%);
            background: #6f00ff;
            color: #000000;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 12px;
            font-weight: 600;
            white-space: nowrap;
            z-index: 100;
        `;
        icon.appendChild(tooltip);
    });
    
    icon.addEventListener('mouseleave', () => {
        icon.style.transform = '';
        icon.style.background = 'rgba(0, 255, 136, 0.1)';
        
        // Remove tooltip
        const tooltip = icon.querySelector('.tech-tooltip');
        if (tooltip) {
            icon.removeChild(tooltip);
        }
    });
});

// ===== STATS COUNTER ANIMATION =====
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : element.textContent.includes('%') ? '%' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : element.textContent.includes('%') ? '%' : '');
        }
    }, 16);
}

// Trigger counter animation when stats are visible
const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    const number = parseInt(text);
                    stat.textContent = '0';
                    animateCounter(stat, number, 2000);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
}

// ===== PORTFOLIO ITEM HOVER EFFECTS =====
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const overlay = item.querySelector('.portfolio-overlay');
        const image = item.querySelector('.portfolio-image img');
        
        if (overlay) overlay.style.opacity = '1';
        if (image) image.style.transform = 'scale(1.1)';
    });
    
    item.addEventListener('mouseleave', () => {
        const overlay = item.querySelector('.portfolio-overlay');
        const image = item.querySelector('.portfolio-image img');
        
        if (overlay) overlay.style.opacity = '0';
        if (image) image.style.transform = 'scale(1)';
    });
});

// ===== SERVICE CARDS TILT EFFECT =====
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
});

// ===== FORM INPUT ANIMATIONS =====
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', () => {
        const label = input.nextElementSibling;
        if (label && label.tagName === 'LABEL') {
            label.style.top = '-10px';
            label.style.left = '15px';
            label.style.fontSize = '12px';
            label.style.color = '#6f00ff';
            label.style.background = '#0a0a0a';
            label.style.padding = '0 8px';
        }
    });
    
    input.addEventListener('blur', () => {
        if (input.value === '') {
            const label = input.nextElementSibling;
            if (label && label.tagName === 'LABEL') {
                label.style.top = '15px';
                label.style.left = '20px';
                label.style.fontSize = '16px';
                label.style.color = '#cccccc';
                label.style.background = 'transparent';
                label.style.padding = '0';
            }
        }
    });
});

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-shapes .shape');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-circle"></div>
            <div class="loader-text">Loading...</div>
        </div>
    `;
    
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #0a0a0a;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 1;
        transition: opacity 0.5s ease;
    `;
    
    const loaderContent = loader.querySelector('.loader-content');
    loaderContent.style.cssText = `
        text-align: center;
        color: #6f00ff;
    `;
    
    const loaderCircle = loader.querySelector('.loader-circle');
    loaderCircle.style.cssText = `
        width: 50px;
        height: 50px;
        border: 3px solid rgba(0, 255, 136, 0.3);
        border-top: 3px solid #6f00ff;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 20px;
    `;
    
    const loaderText = loader.querySelector('.loader-text');
    loaderText.style.cssText = `
        font-size: 18px;
        font-weight: 600;
    `;
    
    // Add spin animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(loader);
    
    // Remove loader after a short delay
    setTimeout(() => {
        if (document.body.contains(loader)) {
            loader.style.opacity = '0';
            setTimeout(() => {
                if (document.body.contains(loader)) {
                    document.body.removeChild(loader);
                }
            }, 500);
        }
    }, 1500);
});

// ===== INTERSECTION OBSERVER FOR FADE IN EFFECTS =====
const fadeElements = document.querySelectorAll('section, .service-card, .portfolio-item, .skill-item, .contact-item');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Apply initial styles and observe elements
document.addEventListener('DOMContentLoaded', () => {
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(element);
    });
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        if (navToggle) navToggle.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
    }
    
    // Enter key on focusable elements
    if (e.key === 'Enter') {
        if (document.activeElement.classList.contains('filter-btn')) {
            document.activeElement.click();
        }
    }
});

// ===== SOCIAL LINKS HOVER EFFECTS =====
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-5px) scale(1.1)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(() => {
    updateActiveNavLink();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// ===== CONSOLE EASTER EGG =====
console.log(`
🚀 Welcome to Ashirvad's Portfolio!

Thanks for checking out the code! 
If you're interested in collaborating or have any questions,
feel free to reach out through the contact form.

Built with ❤️ using HTML, CSS, and JavaScript
`);

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active nav link
    updateActiveNavLink();
    
    // Add initial load animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});