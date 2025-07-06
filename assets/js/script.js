// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initGallery();
    initContactForm();
    initScrollEffects();
    initModal();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Gallery functionality
function initGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    
    // Image data with descriptions
    const images = [
        {
            src: 'assets/images/38530ac6-9a8a-44a1-9c65-d1fd4198c7c8.JPG',
            title: 'Indian American Fusion',
            description: 'Perfect blend of traditional and contemporary styles'
        },
        {
            src: 'assets/images/39d5d4b8-f3eb-4f72-87f6-d4e37425385d.JPG',
            title: 'Bridal Party Coordination',
            description: 'Complete bridal party styling and coordination'
        },
        {
            src: 'assets/images/3b88ca2a-eb00-4996-8c52-699f02a033e9.JPG',
            title: 'Custom Embellishments',
            description: 'Hand-crafted details and embellishments'
        },
        {
            src: 'assets/images/46b05796-fa8f-4529-a8d4-745f10efb751.JPG',
            title: 'Luxury Bridal Wear',
            description: 'Premium fabrics and exquisite craftsmanship'
        },
        {
            src: 'assets/images/5e363ea6-8936-4f22-8966-d6c827cf2c04.JPG',
            title: 'Modern Elegance',
            description: 'Contemporary designs with timeless appeal'
        },
        {
            src: 'assets/images/8faa0f07-00d5-4f50-ae8c-955bd169cfaf.JPG',
            title: 'Ceremonial Attire',
            description: 'Special occasion and ceremonial wear'
        },
        {
            src: 'assets/images/b060bd07-457a-40a1-b993-1421169cac60.JPG',
            title: 'Bridal Accessories',
            description: 'Complementary accessories and styling'
        },
        {
            src: 'assets/images/b9f9496f-13a8-4803-92ba-3bae3f8f539e.JPG',
            title: 'Wedding Day Perfection',
            description: 'Complete wedding day look and styling'
        },
        {
            src: 'assets/images/cdf7e426-e0f2-41e8-abf1-ed30d51f6d90.JPG',
            title: 'Detailed Craftsmanship',
            description: 'Intricate work and attention to detail'
        },
        {
            src: 'assets/images/cfa6ba1f-ce50-4823-85dd-6ebfcafd9bf1.JPG',
            title: 'Signature Collection',
            description: 'Exclusive designs from our signature collection'
        },
        {
            src: 'assets/images/23075e31-ebd0-4350-a8c1-117fa855066d.JPG',
            title: 'Elegant Bridal Ensemble',
            description: 'Custom bridal wear with intricate detailing'
        },
        {
            src: 'assets/images/2ef91b04-6292-45ea-ada2-ee318b89be11.JPG',
            title: 'Groomsmen Coordination',
            description: 'Stylish groomsmen outfits in coordinated designs'
        }
    ];

    // Create gallery items
    images.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${image.src}" alt="${image.title}" loading="lazy">
            <div class="gallery-overlay">
                <div class="gallery-info">
                    <h3>${image.title}</h3>
                    <p>${image.description}</p>
                </div>
            </div>
        `;
        
        // Add click event for modal
        galleryItem.addEventListener('click', function() {
            openModal(image.src, image.title);
        });
        
        galleryGrid.appendChild(galleryItem);
    });
}

// Modal functionality
function initModal() {
    // Create modal HTML
    const modalHTML = `
        <div id="imageModal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <img class="modal-image" id="modalImage" alt="">
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.getElementById('imageModal');
    const closeBtn = document.querySelector('.close');
    
    // Close modal events
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function openModal(imageSrc, imageTitle) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    
    modalImage.src = imageSrc;
    modalImage.alt = imageTitle;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Validate required fields
        if (!data.name || !data.email || !data.message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        // Validate email
        if (!isValidEmail(data.email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Create mailto link with form data
        const subject = encodeURIComponent('Inquiry from ' + data.name + ' - Ombré by Anima');
        const body = encodeURIComponent(
            `Name: ${data.name}\n` +
            `Email: ${data.email}\n` +
            `Phone: ${data.phone || 'Not provided'}\n` +
            `Wedding Date: ${data['wedding-date'] || 'Not specified'}\n` +
            `Service: ${data.service || 'Not specified'}\n\n` +
            `Message:\n${data.message}`
        );
        
        const mailtoLink = `mailto:hello@ombrebyanima.com?subject=${subject}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        showNotification('Thank you for your inquiry! Your email client should open shortly.', 'success');
        
        // Reset form
        contactForm.reset();
    });
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function() {
        removeNotification(notification);
    });
    
    // Auto remove after 5 seconds
    setTimeout(function() {
        removeNotification(notification);
    }, 5000);
}

function removeNotification(notification) {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(function() {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Scroll effects
function initScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .gallery-item, .about-text, .about-image');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style);

// Performance optimization: Lazy loading for images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);
