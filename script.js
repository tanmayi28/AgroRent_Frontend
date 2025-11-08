// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initSmoothScrolling();
    initScrollAnimations();
    initVideoHandling();
    initNavbar();
    initProfileDropdown();
    initSettingsDropdown();
    initFlashMessages();
    initFloatingActions();
    initHeroOptions();
    checkLoginState();
});

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Profile Dropdown functionality
function initProfileDropdown() {
    const profileBtn = document.getElementById('profile-btn');
    const dropdownMenu = document.getElementById('profile-menu');
    
    if (!profileBtn || !dropdownMenu) return;

    // Toggle dropdown on button click
    profileBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdownMenu.classList.toggle('active');
        profileBtn.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!profileBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.classList.remove('active');
            profileBtn.classList.remove('active');
        }
    });

    // Prevent dropdown from closing when clicking inside
    dropdownMenu.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Handle View Profile click
    const viewProfileBtn = document.getElementById('view-profile-btn');
    if (viewProfileBtn) {
        viewProfileBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Close dropdown
            dropdownMenu.classList.remove('active');
            profileBtn.classList.remove('active');
            // Navigate to profile page (you can create this page later)
            // window.location.href = 'profile.html';
            alert('Profile page coming soon!');
        });
    }
}

// Settings Dropdown functionality
function initSettingsDropdown() {
    const settingsBtn = document.getElementById('settings-btn');
    const settingsMenu = document.getElementById('settings-menu');
    
    if (!settingsBtn || !settingsMenu) return;

    // Toggle dropdown on button click
    settingsBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        settingsMenu.classList.toggle('active');
        settingsBtn.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!settingsBtn.contains(e.target) && !settingsMenu.contains(e.target)) {
            settingsMenu.classList.remove('active');
            settingsBtn.classList.remove('active');
        }
    });

    // Prevent dropdown from closing when clicking inside
    settingsMenu.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}

// Enhanced Navbar functionality
function initNavbar() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    // Enhanced navbar scroll effect
    if (navbar) {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', debounce(() => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Hide/show navbar on scroll (optional - disable if you don't want this)
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        }, 10));
    }

    // Enhanced active link highlighting
    function updateActiveLink() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id') || 'home';

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    const href = link.getAttribute('href');
                    if (href === `#${sectionId}` || (sectionId === 'home' && href === '#home')) {
                        link.classList.add('active');
                    }
                });
            }
        });

        // Handle hero section
        if (scrollPos < 100) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#home') {
                    link.classList.add('active');
                }
            });
        }
    }

    window.addEventListener('scroll', debounce(updateActiveLink, 50));
    updateActiveLink(); // Initialize on load
}

// Fade in animation on scroll
function initScrollAnimations() {
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

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Video handling and optimization
function initVideoHandling() {
    const video = document.querySelector('video');
    const heroSection = document.querySelector('.hero');
    
    if (!video || !heroSection) return;

    // Handle video loading error
    video.addEventListener('error', function() {
        console.warn('Video failed to load, using fallback background');
        // Fallback: Create a gradient background if video fails
        const videoBackground = document.querySelector('.video-background');
        if (videoBackground) {
            videoBackground.style.background = 'linear-gradient(45deg, #2E8B57, #228B22)';
            this.style.display = 'none';
        }
    });

    // Performance optimization: pause video when not in view
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                video.play().catch(e => {
                    console.warn('Video play failed:', e);
                });
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.5 });

    heroObserver.observe(heroSection);

    // Ensure video is muted for autoplay compliance
    video.muted = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
}

// Flash messages auto-dismiss
function initFlashMessages() {
    const alerts = document.querySelectorAll('.alert');
    
    alerts.forEach(alert => {
        // Auto dismiss after 5 seconds
        setTimeout(() => {
            alert.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => {
                alert.remove();
            }, 300);
        }, 5000);
    });
}

// Add slide out animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Utility functions
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

// Form validation for auth pages
function initFormValidation() {
    const forms = document.querySelectorAll('.auth-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const password = form.querySelector('input[name="password"]');
            const confirmPassword = form.querySelector('input[name="confirm_password"]');
            
            if (confirmPassword && password.value !== confirmPassword.value) {
                e.preventDefault();
                alert('Passwords do not match!');
                confirmPassword.focus();
                return false;
            }
            
            if (password && password.value.length < 6) {
                e.preventDefault();
                alert('Password must be at least 6 characters long!');
                password.focus();
                return false;
            }
        });
    });
}

// Initialize form validation
document.addEventListener('DOMContentLoaded', initFormValidation);

// Error handling for missing elements
function handleMissingElements() {
    const requiredElements = ['.hero', '.categories-grid'];
    
    requiredElements.forEach(selector => {
        const element = document.querySelector(selector);
        if (!element) {
            console.warn(`Optional element not found: ${selector}`);
        }
    });
}

// Call error handling on load
window.addEventListener('load', handleMissingElements);

// Check login state and show/hide profile icon
function checkLoginState() {
    // Check if user is logged in (in production, check with backend/session)
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('username') || 'User';
    
    const profileDropdown = document.getElementById('profile-dropdown');
    const settingsDropdown = document.getElementById('settings-dropdown');
    
    if (profileDropdown && settingsDropdown) {
        if (isLoggedIn) {
            profileDropdown.style.display = 'block';
            settingsDropdown.style.display = 'none';
            const usernameEl = document.getElementById('username');
            if (usernameEl) {
                usernameEl.textContent = username;
            }
        } else {
            profileDropdown.style.display = 'none';
            settingsDropdown.style.display = 'block';
        }
    }
    
    // Update hero options visibility
    const heroOptions = document.getElementById('hero-options');
    const getStartedBtn = document.getElementById('get-started-btn');
    if (heroOptions) {
        if (isLoggedIn) {
            heroOptions.classList.add('visible');
            if (getStartedBtn) {
                getStartedBtn.style.opacity = '0';
                getStartedBtn.style.pointerEvents = 'none';
            }
        } else {
            heroOptions.classList.remove('visible');
            if (getStartedBtn) {
                getStartedBtn.style.opacity = '1';
                getStartedBtn.style.pointerEvents = 'all';
            }
        }
    }
}

// Set login state (call this after successful login/signup)
function setLoginState(username) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', username);
    checkLoginState();
}

// Logout functionality
function initLogout() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Clear login state
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('username');
            
            // Close dropdown
            const dropdownMenu = document.getElementById('profile-menu');
            const profileBtn = document.getElementById('profile-btn');
            if (dropdownMenu) dropdownMenu.classList.remove('active');
            if (profileBtn) profileBtn.classList.remove('active');
            
            // Update UI to show logged out state
            checkLoginState();
            
            // If already on index page, just refresh the state
            // Otherwise redirect to index
            if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
                // Scroll to top to show the Get Started button
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                window.location.href = 'index.html';
            }
        });
    }
}

// Initialize logout on page load
document.addEventListener('DOMContentLoaded', initLogout);

// Floating Action Buttons
function initFloatingActions() {
    const floatingActions = document.getElementById('floating-actions');
    if (!floatingActions) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateFloatingActions() {
        const scrollY = window.scrollY;
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        
        // Only show if user is logged in
        if (isLoggedIn && scrollY > 300) {
            floatingActions.classList.add('visible');
        } else {
            floatingActions.classList.remove('visible');
        }
        
        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(updateFloatingActions);
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll);
    
    // Check initial state
    updateFloatingActions();

    // Handle button clicks
    const fabRent = document.getElementById('fab-rent');
    const fabList = document.getElementById('fab-list');

    if (fabRent) {
        fabRent.addEventListener('click', function() {
            // Redirect to rent equipment page
            window.location.href = 'browse-equipment.html'; // You can create this page
        });
    }

    if (fabList) {
        fabList.addEventListener('click', function() {
            // Redirect to list equipment page
            window.location.href = 'list-equipment.html'; // You can create this page
        });
    }
}

// Hero Options (shown on scroll when logged in)
function initHeroOptions() {
    const heroOptions = document.getElementById('hero-options');
    const getStartedBtn = document.getElementById('get-started-btn');
    if (!heroOptions) return;

    let ticking = false;

    function updateHeroOptions() {
        const scrollY = window.scrollY;
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        
        // Show options when logged in (immediately, no scroll required)
        if (isLoggedIn) {
            heroOptions.classList.add('visible');
            // Hide "Get Started" button when options are visible
            if (getStartedBtn) {
                getStartedBtn.style.opacity = '0';
                getStartedBtn.style.pointerEvents = 'none';
            }
        } else {
            heroOptions.classList.remove('visible');
            // Show "Get Started" button when options are hidden
            if (getStartedBtn) {
                getStartedBtn.style.opacity = '1';
                getStartedBtn.style.pointerEvents = 'all';
            }
        }
        
        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(updateHeroOptions);
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll);
    
    // Check initial state immediately
    updateHeroOptions();
    
    // Also check on login state changes
    window.addEventListener('storage', function() {
        updateHeroOptions();
    });
    
    // Re-check when page becomes visible
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            updateHeroOptions();
        }
    });

    // Handle button clicks
    const heroRentBtn = document.getElementById('hero-rent-btn');
    const heroListBtn = document.getElementById('hero-list-btn');

    if (heroRentBtn) {
        heroRentBtn.addEventListener('click', function() {
            window.location.href = 'browse-equipment.html';
        });
    }

    if (heroListBtn) {
        heroListBtn.addEventListener('click', function() {
            window.location.href = 'list-equipment.html';
        });
    }
}