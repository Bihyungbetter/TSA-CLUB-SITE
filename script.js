// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile navigation
    initMobileNav();
    
    // Initialize sticky header
    initStickyHeader();
    
    // Initialize smooth scrolling
    initSmoothScroll();
    
    // Initialize form submission
    initFormSubmission();
    
    // Initialize animations
    initAnimations();
    
    // Initialize tech particles if on homepage
    if (document.querySelector('.hero')) {
        initTechParticles();
    }
    
    // Initialize typing effect if on homepage
    if (document.querySelector('.hero-content h1')) {
        initTypingEffect();
    }
    
    // Initialize gallery hover effects
    initGalleryEffects();
});

// Mobile Navigation
function initMobileNav() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    if (burger) {
        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');
            
            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
            
            // Burger Animation
            burger.classList.toggle('toggle');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (nav && nav.classList.contains('nav-active') && !nav.contains(e.target) && !burger.contains(e.target)) {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            
            navLinks.forEach(link => {
                link.style.animation = '';
            });
        }
    });
}

// Sticky Header
function initStickyHeader() {
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
            } else {
                header.style.backgroundColor = 'var(--darker-color)';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
            }
        });
    }
}

// Smooth Scrolling for anchor links
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    const nav = document.querySelector('.nav-links');
    const burger = document.querySelector('.burger');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (nav && nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                    
                    document.querySelectorAll('.nav-links li').forEach(link => {
                        link.style.animation = '';
                    });
                }
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form Submission
function initFormSubmission() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formDataObj = {};
            
            formData.forEach((value, key) => {
                if (formDataObj[key]) {
                    if (!Array.isArray(formDataObj[key])) {
                        formDataObj[key] = [formDataObj[key]];
                    }
                    formDataObj[key].push(value);
                } else {
                    formDataObj[key] = value;
                }
            });
            
            console.log('Form submitted:', formDataObj);
            
            // Show success message
            const formContainer = this.parentElement;
            this.style.display = 'none';
            
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <h3>Thank You!</h3>
                <p>Your form has been submitted successfully. We'll get back to you soon.</p>
                <div class="center-button">
                    <button class="secondary-button" id="resetForm">Submit Another</button>
                </div>
            `;
            
            formContainer.appendChild(successMessage);
            
            // Reset form button
            document.getElementById('resetForm').addEventListener('click', () => {
                form.reset();
                successMessage.remove();
                form.style.display = 'block';
            });
        });
    });
}


function initAnimations() {

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Elements to animate
    const animateElements = document.querySelectorAll('.section-title, .about-content, .stat-box, .event-card, .category, .gallery-item, .join-content, .contact-item, .social-media');
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    

    const techElements = document.querySelectorAll('.tech-dots, .tech-line');
    
    techElements.forEach(element => {
        setInterval(() => {
            element.classList.toggle('glow');
        }, 3000);
    });
}

function initTechParticles() {
    const hero = document.querySelector('.hero');
    
    if (hero) {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        particlesContainer.style.position = 'absolute';
        particlesContainer.style.top = '0';
        particlesContainer.style.left = '0';
        particlesContainer.style.width = '100%';
        particlesContainer.style.height = '100%';
        particlesContainer.style.overflow = 'hidden';
        particlesContainer.style.zIndex = '1';
        
        hero.appendChild(particlesContainer);
        
        // Create particles
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            createParticle(particlesContainer);
        }
        
        // Add CSS for particles
        const style = document.createElement('style');
        style.textContent = `
            .particle {
                position: absolute;
                background-color: rgba(0, 200, 83, 0.5);
                border-radius: 50%;
                pointer-events: none;
            }
            
            @keyframes float {
                0% {
                    transform: translateY(0) translateX(0);
                }
                25% {
                    transform: translateY(-20px) translateX(10px);
                }
                50% {
                    transform: translateY(0) translateX(20px);
                }
                75% {
                    transform: translateY(20px) translateX(10px);
                }
                100% {
                    transform: translateY(0) translateX(0);
                }
            }
        `;
        
        document.head.appendChild(style);
    }
}

// Create a single particle
function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size between 3 and 8px
    const size = Math.random() * 5 + 3;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    
    // Random opacity
    particle.style.opacity = Math.random() * 0.5 + 0.2;
    
    // Random animation duration between 15 and 30 seconds
    const duration = Math.random() * 15 + 15;
    particle.style.animation = `float ${duration}s ease-in-out infinite`;
    
    // Random animation delay
    particle.style.animationDelay = `${Math.random() * 10}s`;
    
    container.appendChild(particle);
}

// Typing Effect
function initTypingEffect() {
    const titleElement = document.querySelector('.hero-content h1');
    
    if (titleElement) {
        const title = titleElement.textContent;
        titleElement.textContent = '';
        titleElement.style.borderRight = '0.1em solid var(--primary-color)';
        
        let i = 0;
        const typingSpeed = 100; // milliseconds per character
        
        function typeWriter() {
            if (i < title.length) {
                titleElement.textContent += title.charAt(i);
                i++;
                setTimeout(typeWriter, typingSpeed);
            } else {
                titleElement.style.borderRight = 'none';
            }
        }
        
        setTimeout(typeWriter, 1000);
    }
}

// Gallery Hover Effects
function initGalleryEffects() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        const caption = item.querySelector('.gallery-caption');
        
        if (caption) {
            // Add CSS for gallery captions
            const style = document.createElement('style');
            style.textContent = `
                .gallery-caption {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    padding: 1rem;
                    background-color: rgba(0, 0, 0, 0.7);
                    color: white;
                    font-weight: 500;
                    transition: var(--transition);
                    transform: translateY(100%);
                }
                
                .gallery-item:hover .gallery-caption {
                    transform: translateY(0);
                    background-color: rgba(0, 200, 83, 0.9);
                }
            `;
            
            document.head.appendChild(style);
        }
    });
} 