// Professional Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MOBILE MENU =====
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    function toggleMobileMenu() {
        if (!mobileMenu || !mobileMenuBtn) return;
        
        const isActive = mobileMenu.classList.contains('active');
        
        if (isActive) {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = 'auto';
        } else {
            mobileMenu.classList.add('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }
    }
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (mobileMenu.classList.contains('active') && 
                !mobileMenu.contains(event.target) && 
                event.target !== mobileMenuBtn && 
                !mobileMenuBtn.contains(event.target)) {
                toggleMobileMenu();
            }
        });
        
        // Close menu when clicking a link
        const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', toggleMobileMenu);
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    }
    
    // ===== SET ACTIVE NAV LINK =====
    function setActiveNav() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const desktopLinks = document.querySelectorAll('.nav-links a');
        const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
        
        const setActive = (links) => {
            links.forEach(link => {
                link.classList.remove('active');
                const linkPage = link.getAttribute('href');
                
                if (linkPage === currentPage) {
                    link.classList.add('active');
                }
            });
        };
        
        setActive(desktopLinks);
        setActive(mobileLinks);
    }
    
    setActiveNav();
    
    // ===== FORM HANDLING =====
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validate
            let isValid = true;
            const required = ['name', 'email', 'message'];
            
            required.forEach(field => {
                const input = this.querySelector(`[name="${field}"]`);
                if (!data[field] || data[field].trim() === '') {
                    isValid = false;
                    input.style.borderColor = '#ff3b30';
                } else {
                    input.style.borderColor = '';
                }
            });
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const emailInput = this.querySelector('[name="email"]');
            if (data.email && !emailRegex.test(data.email)) {
                isValid = false;
                emailInput.style.borderColor = '#ff3b30';
            }
            
            if (isValid) {
                const submitBtn = this.querySelector('.btn');
                const originalText = submitBtn.textContent;
                
                // Show loading
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    // Show success
                    const successMsg = document.createElement('div');
                    successMsg.style.cssText = `
                        background-color: #d1f7c4;
                        color: #0f5132;
                        padding: 12px 16px;
                        border-radius: 6px;
                        margin-top: 16px;
                        font-size: 13px;
                        text-align: center;
                    `;
                    successMsg.textContent = 'Message sent successfully!';
                    
                    this.parentNode.insertBefore(successMsg, this.nextSibling);
                    
                    // Reset form
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    
                    // Remove success message
                    setTimeout(() => {
                        successMsg.remove();
                    }, 4000);
                }, 1000);
            }
        });
    }
    
    // ===== CURRENT YEAR =====
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // ===== PROJECT FILTER =====
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter projects
                const projects = document.querySelectorAll('.project-card');
                
                projects.forEach(project => {
                    const category = project.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        project.style.display = 'block';
                    } else {
                        project.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const target = document.getElementById(targetId);
                
                if (target) {
                    const headerHeight = 60;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});