// DOM Elements
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const contactForm = document.querySelector('.contact-form');
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('nav');

// Tab Switching Logic
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.dataset.tab;
        
        // Update active states
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));
        
        btn.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// Form Validation
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        const formGroup = input.closest('.form-group');
        const errorMessage = formGroup.querySelector('.error-message');
        
        // Reset previous errors
        formGroup.classList.remove('error');
        if (errorMessage) errorMessage.style.display = 'none';
        
        // Required field validation
        if (input.hasAttribute('required') && !input.value.trim()) {
            formGroup.classList.add('error');
            if (errorMessage) errorMessage.style.display = 'block';
            isValid = false;
        }
        
        // Email validation
        if (input.type === 'email' && input.value) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(input.value)) {
                formGroup.classList.add('error');
                if (errorMessage) errorMessage.style.display = 'block';
                isValid = false;
            }
        }
    });
    
    return isValid;
}

// Form Submissions
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm(loginForm)) {
            // Handle login logic here
            console.log('Login form submitted');
        }
    });
}

if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm(signupForm)) {
            // Handle signup logic here
            console.log('Signup form submitted');
        }
    });
}

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm(contactForm)) {
            // Show success message
            const successMessage = document.querySelector('.success-message');
            if (successMessage) {
                successMessage.style.display = 'block';
                contactForm.reset();
                
                // Hide success message after 3 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 3000);
            }
        }
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Testimonial Slider
const testimonialSlider = document.querySelector('.testimonial-slider');
if (testimonialSlider) {
    let currentSlide = 0;
    const testimonials = testimonialSlider.querySelectorAll('.testimonial');
    const totalSlides = testimonials.length;
    
    function showSlide(index) {
        testimonials.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }
    
    // Initialize slider
    showSlide(0);
    
    // Auto-advance slides every 5 seconds
    setInterval(nextSlide, 5000);
}

// Intersection Observer for Animations
// Mobile Navigation Toggle
if (navToggle) {
    navToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        document.body.classList.toggle('menu-active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !navToggle.contains(e.target)) {
            nav.classList.remove('active');
            document.body.classList.remove('menu-active');
        }
    });
    
    // Close mobile menu when pressing escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            nav.classList.remove('active');
            document.body.classList.remove('menu-active');
        }
    });
}

const animatedElements = document.querySelectorAll(
    '.service-content, .team-member, .value-card, .pricing-card, .feature-card'
);

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    },
    { threshold: 0.1 }
);

animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(element);
});