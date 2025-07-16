// Industry Professional Portfolio JavaScript
// All animations and interactions in a single optimized file

class PortfolioApp {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'dark';
        this.isMenuOpen = false;
        this.init();
    }

    init() {
        this.setupTheme();
        this.setupNavigation();
        this.setupAnimations();
        this.setupScrollEffects();
        this.setupProgressBars();
        this.setupContactForm();
        this.setupPerformanceOptimizations();
    }

    // Enhanced Theme Management
    setupTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = document.querySelector('.theme-icon');
        
        if (!themeToggle) return;

        this.setTheme(this.theme);
        
        themeToggle.addEventListener('click', () => {
            const newTheme = this.theme === 'dark' ? 'light' : 'dark';
            this.setTheme(newTheme);
            
            // Enhanced animation
            themeToggle.style.transform = 'scale(0.8) rotate(180deg)';
            setTimeout(() => {
                themeToggle.style.transform = 'scale(1) rotate(0deg)';
            }, 200);
        });

        // System theme detection
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!localStorage.getItem('theme')) {
                    this.setTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }

    setTheme(theme) {
        this.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.style.transform = 'scale(0)';
            setTimeout(() => {
                themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
                themeIcon.style.transform = 'scale(1)';
            }, 150);
        }
    }

    // Enhanced Mobile Navigation
    setupNavigation() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (!hamburger || !navMenu) return;

        hamburger.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Close menu when clicking on links
        navLinks.forEach((link, index) => {
            link.addEventListener('click', () => {
                if (this.isMenuOpen) {
                    setTimeout(() => this.closeMobileMenu(), index * 50);
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && !hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMobileMenu();
            }
        });

        // Set active navigation
        this.setActiveNavigation();
    }

    toggleMobileMenu() {
        this.isMenuOpen ? this.closeMobileMenu() : this.openMobileMenu();
    }

    openMobileMenu() {
        this.isMenuOpen = true;
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        hamburger.classList.add('active');
        navMenu.classList.add('active');

        // Animate menu items
        navLinks.forEach((link, index) => {
            link.style.opacity = '0';
            link.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                link.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                link.style.opacity = '1';
                link.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    closeMobileMenu() {
        this.isMenuOpen = false;
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        hamburger.classList.remove('active');
        navMenu.classList.remove('active');

        // Reset link styles
        navLinks.forEach(link => {
            link.style.transition = '';
            link.style.opacity = '';
            link.style.transform = '';
        });
    }

    setActiveNavigation() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    }

    // Enhanced Scroll Effects
    setupScrollEffects() {
        let ticking = false;
        let scrollPosition = 0;

        const handleScroll = () => {
            scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            
            // Enhanced navbar effects
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (scrollPosition > 50) {
                    navbar.style.background = 'rgba(26, 26, 26, 0.98)';
                    navbar.style.backdropFilter = 'blur(20px)';
                    navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
                } else {
                    navbar.style.background = 'rgba(26, 26, 26, 0.95)';
                    navbar.style.backdropFilter = 'blur(20px)';
                    navbar.style.boxShadow = 'none';
                }
            }

            // Parallax effect for hero section
            const hero = document.querySelector('.hero');
            if (hero && scrollPosition < window.innerHeight) {
                const heroPattern = document.querySelector('.hero-pattern');
                if (heroPattern) {
                    heroPattern.style.transform = `translateY(${scrollPosition * 0.3}px)`;
                }
            }

            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(handleScroll);
                ticking = true;
            }
        });
    }

    // Enhanced Animations with Intersection Observer
    setupAnimations() {
        if (!('IntersectionObserver' in window)) return;

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Trigger progress bar animations
                    if (entry.target.classList.contains('skill-card')) {
                        entry.target.classList.add('animate');
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Animate elements on scroll
        const animatedElements = document.querySelectorAll(
            '.skill-card, .project-card-featured, .hero-content, .section-header'
        );

        animatedElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            el.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(el);
        });
    }

    // Progress Bar Animations
    setupProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        progressBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            if (width) {
                bar.style.setProperty('--progress-width', width + '%');
            }
        });

        // Animate progress bars when skill cards become visible
        const skillCards = document.querySelectorAll('.skill-card');
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target.querySelector('.progress-bar');
                    if (progressBar) {
                        const width = progressBar.getAttribute('data-width');
                        setTimeout(() => {
                            progressBar.style.width = width + '%';
                        }, 500);
                    }
                    progressObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        skillCards.forEach(card => {
            progressObserver.observe(card);
        });
    }

    // Enhanced Contact Form
    setupContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        const inputs = form.querySelectorAll('input, textarea');
        
        // Enhanced form validation
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
            input.addEventListener('focus', () => this.handleFieldFocus(input));
        });

        form.addEventListener('submit', (e) => this.handleFormSubmit(e));
    }

    handleFieldFocus(field) {
        field.parentNode.style.transform = 'scale(1.02)';
        field.parentNode.style.transition = 'transform 0.2s ease';
        
        setTimeout(() => {
            field.parentNode.style.transform = 'scale(1)';
        }, 200);
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        this.clearFieldError(field);

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        // Name validation
        if (field.name === 'name' && value && value.length < 2) {
            isValid = false;
            errorMessage = 'Name must be at least 2 characters long';
        }

        // Message validation
        if (field.name === 'message' && value && value.length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters long';
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        } else {
            this.showFieldSuccess(field);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.style.borderColor = 'var(--error-color)';
        
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: var(--error-color);
            font-size: 0.875rem;
            margin-top: 0.25rem;
            display: block;
            opacity: 0;
            transform: translateY(-10px);
            transition: opacity 0.3s ease, transform 0.3s ease;
        `;
        
        field.parentNode.appendChild(errorElement);
        
        setTimeout(() => {
            errorElement.style.opacity = '1';
            errorElement.style.transform = 'translateY(0)';
        }, 10);
    }

    showFieldSuccess(field) {
        field.style.borderColor = 'var(--success-color)';
        field.style.transition = 'border-color 0.3s ease';
    }

    clearFieldError(field) {
        field.style.borderColor = '';
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.style.opacity = '0';
            errorMessage.style.transform = 'translateY(-10px)';
            setTimeout(() => errorMessage.remove(), 300);
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const inputs = form.querySelectorAll('input, textarea');
        let isFormValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            this.submitForm(form);
        } else {
            // Shake form on error
            form.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                form.style.animation = '';
            }, 500);
        }
    }

    submitForm(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Loading animation
        submitBtn.innerHTML = `
            <span style="display: inline-block; animation: spin 1s linear infinite;">⟳</span>
            Sending...
        `;
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        // Simulate form submission
        setTimeout(() => {
            this.showSuccessMessage(form);
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        }, 2000);
    }

    showSuccessMessage(form) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                <span style="color: var(--success-color); font-size: 1.2rem;">✓</span>
                <p style="color: var(--success-color); font-weight: 600; margin: 0;">
                    Message sent successfully!
                </p>
            </div>
            <p style="color: var(--text-secondary); font-size: 0.9rem; margin: 0;">
                Thank you for your message. I'll get back to you soon.
            </p>
        `;
        successDiv.style.cssText = `
            background-color: var(--bg-tertiary);
            padding: 1.5rem;
            border-radius: 8px;
            border: 1px solid var(--success-color);
            margin-bottom: 1rem;
            opacity: 0;
            transform: translateY(-20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        `;

        form.insertBefore(successDiv, form.firstChild);

        setTimeout(() => {
            successDiv.style.opacity = '1';
            successDiv.style.transform = 'translateY(0)';
        }, 10);

        // Remove success message after 5 seconds
        setTimeout(() => {
            successDiv.style.opacity = '0';
            successDiv.style.transform = 'translateY(-20px)';
            setTimeout(() => successDiv.remove(), 500);
        }, 5000);
    }

    // Performance Optimizations
    setupPerformanceOptimizations() {
        // Optimized resize handling
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (window.innerWidth > 768 && this.isMenuOpen) {
                    this.closeMobileMenu();
                }
            }, 250);
        });

        // Enhanced button hover effects
        this.setupButtonEffects();
        
        // Enhanced card hover effects
        this.setupCardEffects();

        // Page loading animation
        this.setupPageLoading();
    }

    setupButtonEffects() {
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-2px) scale(1.02)';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    setupCardEffects() {
        const cards = document.querySelectorAll('.skill-card, .project-card-featured');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    setupPageLoading() {
        // Enhanced loading animation
        document.body.style.opacity = '0';
        document.body.style.transform = 'translateY(20px)';
        document.body.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.body.style.opacity = '1';
                document.body.style.transform = 'translateY(0)';
            }, 100);
        });
    }
}

// Add custom CSS animations
function addCustomAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
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
        
        .theme-icon {
            transition: transform 0.3s ease;
        }
        
        .social-link {
            position: relative;
            overflow: hidden;
        }
        
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s;
        }
        
        .btn:hover::before {
            left: 100%;
        }
    `;
    document.head.appendChild(style);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Add custom animations
    addCustomAnimations();
    
    // Initialize the main application
    new PortfolioApp();
    
    // Enhanced error handling
    window.addEventListener('error', (e) => {
        console.error('JavaScript error:', e.error);
    });

    // Network status handling
    window.addEventListener('online', () => {
        const notification = document.createElement('div');
        notification.textContent = 'Connection restored';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--success-color);
            color: white;
            padding: 1rem;
            border-radius: 8px;
            z-index: 10000;
            animation: fadeInUp 0.5s ease;
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    });

    window.addEventListener('offline', () => {
        const notification = document.createElement('div');
        notification.textContent = 'Connection lost';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--error-color);
            color: white;
            padding: 1rem;
            border-radius: 8px;
            z-index: 10000;
            animation: fadeInUp 0.5s ease;
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    });
});