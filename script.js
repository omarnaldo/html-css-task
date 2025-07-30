// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Form elements
    const form = document.querySelector('.login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const signInBtn = document.querySelector('.sign-in-btn');
    const googleBtn = document.querySelector('.google-btn');
    const signupLink = document.querySelector('.signup-link');

    // Background elements for animation
    const circles = document.querySelectorAll('.circle');
    const grassPlumes = document.querySelectorAll('.grass-plume');

    // Form validation
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Basic validation
        if (!email || !password) {
            showMessage('Please fill in all required fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }

        if (password.length < 6) {
            showMessage('Password must be at least 6 characters long', 'error');
            return;
        }

        // Simulate login process
        signInBtn.textContent = 'Signing in...';
        signInBtn.disabled = true;

        setTimeout(() => {
            showMessage('Login successful! Redirecting...', 'success');
            setTimeout(() => {
                // In a real app, you would redirect to dashboard
                console.log('Redirecting to dashboard...');
            }, 1500);
        }, 2000);
    });

    // Google sign in
    googleBtn.addEventListener('click', function () {
        showMessage('Google Sign-In would be implemented here', 'info');
    });

    // Sign up link
    signupLink.addEventListener('click', function (e) {
        e.preventDefault();
        showMessage('Sign-up page would open here', 'info');
    });

    // Input focus effects
    [emailInput, passwordInput].forEach(input => {
        input.addEventListener('focus', function () {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        });

        input.addEventListener('blur', function () {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Button hover effects
    signInBtn.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 6px 20px rgba(30, 58, 138, 0.4)';
    });

    signInBtn.addEventListener('mouseleave', function () {
        if (!this.disabled) {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        }
    });

    // Floating animation for background elements
    function animateFloatingElements() {
        const time = Date.now() * 0.001;

        circles.forEach((circle, index) => {
            const speed = 0.5 + index * 0.2;
            const amplitude = 10 + index * 5;
            const yOffset = Math.sin(time * speed) * amplitude;
            const xOffset = Math.cos(time * speed * 0.5) * (amplitude * 0.5);

            circle.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });

        grassPlumes.forEach((plume, index) => {
            const speed = 0.3 + index * 0.1;
            const amplitude = 2 + index;
            const rotation = Math.sin(time * speed) * amplitude;

            plume.style.transform += ` rotate(${rotation}deg)`;
        });

        requestAnimationFrame(animateFloatingElements);
    }

    // Start animations
    animateFloatingElements();

    // Progress bar animation
    function animateProgressBar() {
        const progressBar = document.querySelector('.progress-bar');
        let width = 0;
        const maxWidth = 100;
        const speed = 0.5;

        function updateProgress() {
            width = (width + speed) % maxWidth;
            progressBar.style.background = `linear-gradient(90deg, #1e3a8a ${width}%, #374151 ${width}%)`;
            requestAnimationFrame(updateProgress);
        }

        updateProgress();
    }

    animateProgressBar();

    // Subtle chair animation
    function animateChair() {
        const chair = document.querySelector('.chair');
        const time = Date.now() * 0.0005;
        const sway = Math.sin(time) * 1;

        chair.style.transform = `rotate(${sway}deg)`;
        requestAnimationFrame(animateChair);
    }

    animateChair();

    // Parallax effect for background circles
    document.addEventListener('mousemove', function (e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        circles.forEach((circle, index) => {
            const speed = (index + 1) * 10;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;

            circle.style.transform += ` translate(${x}px, ${y}px)`;
        });
    });

    // Utility functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `message message-${type}`;
        messageEl.textContent = message;

        // Style the message
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;

        // Set color based on type
        switch (type) {
            case 'success':
                messageEl.style.background = '#10b981';
                break;
            case 'error':
                messageEl.style.background = '#ef4444';
                break;
            case 'info':
                messageEl.style.background = '#3b82f6';
                break;
        }

        // Add CSS animation
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
        `;
        document.head.appendChild(style);

        // Add to DOM
        document.body.appendChild(messageEl);

        // Remove after 3 seconds
        setTimeout(() => {
            messageEl.style.animation = 'slideIn 0.3s ease-out reverse';
            setTimeout(() => {
                messageEl.remove();
                style.remove();
            }, 300);
        }, 3000);
    }

    // Reset sign in button after failed attempt
    function resetSignInButton() {
        signInBtn.textContent = 'Sign in';
        signInBtn.disabled = false;
        signInBtn.style.transform = 'translateY(0)';
        signInBtn.style.boxShadow = 'none';
    }

    // Reset button on any input change
    [emailInput, passwordInput].forEach(input => {
        input.addEventListener('input', resetSignInButton);
    });

    // Add subtle loading animation to inputs
    function addLoadingEffect(element) {
        element.style.background = 'linear-gradient(90deg, #f9fafb 25%, #f3f4f6 50%, #f9fafb 75%)';
        element.style.backgroundSize = '200% 100%';
        element.style.animation = 'loading 1.5s infinite';

        const loadingStyle = document.createElement('style');
        loadingStyle.textContent = `
            @keyframes loading {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
            }
        `;
        document.head.appendChild(loadingStyle);

        setTimeout(() => {
            element.style.animation = 'none';
            element.style.background = '#f9fafb';
            loadingStyle.remove();
        }, 2000);
    }

    // Add keyboard shortcuts
    document.addEventListener('keydown', function (e) {
        // Enter key to submit form
        if (e.key === 'Enter' && (emailInput === document.activeElement || passwordInput === document.activeElement)) {
            form.dispatchEvent(new Event('submit'));
        }

        // Escape key to clear form
        if (e.key === 'Escape') {
            emailInput.value = '';
            passwordInput.value = '';
            emailInput.focus();
        }
    });
});

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
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

    // Category Slider Navigation
    const categorySlider = document.getElementById('categorySlider');
    const categoryPrev = document.getElementById('categoryPrev');
    const categoryNext = document.getElementById('categoryNext');

    if (categorySlider && categoryPrev && categoryNext) {
        const itemWidth = 180; // Width + gap

        categoryPrev.addEventListener('click', () => {
            categorySlider.scrollBy({
                left: -itemWidth * 2,
                behavior: 'smooth'
            });
        });

        categoryNext.addEventListener('click', () => {
            categorySlider.scrollBy({
                left: itemWidth * 2,
                behavior: 'smooth'
            });
        });
    }

    // Product Card Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe all product cards and sections
    document.querySelectorAll('.product-card, .category-item, .offer-card').forEach(card => {
        observer.observe(card);
    });

    // Wishlist functionality
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');
    const wishlistItems = new Set();

    wishlistButtons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;

            if (wishlistItems.has(productName)) {
                wishlistItems.delete(productName);
                this.style.background = 'rgba(255, 123, 84, 0.9)';
                showNotification(`${productName} removed from wishlist`, 'info');
            } else {
                wishlistItems.add(productName);
                this.style.background = '#ff7b54';
                showNotification(`${productName} added to wishlist`, 'success');
            }

            updateWishlistCount();
        });
    });

    // Update wishlist count in navigation
    function updateWishlistCount() {
        const heartIcon = document.querySelector('.top-icons .fa-heart');
        if (heartIcon) {
            // Remove existing badge
            const existingBadge = heartIcon.parentElement.querySelector('.wishlist-badge');
            if (existingBadge) {
                existingBadge.remove();
            }

            // Add new badge if items exist
            if (wishlistItems.size > 0) {
                const badge = document.createElement('span');
                badge.className = 'wishlist-badge notification-badge';
                badge.textContent = wishlistItems.size;
                badge.style.cssText = `
                    position: absolute;
                    top: -8px;
                    right: -8px;
                    background: #ff7b54;
                    color: white;
                    border-radius: 50%;
                    width: 16px;
                    height: 16px;
                    font-size: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                `;

                // Wrap heart icon in relative container if not already
                if (heartIcon.parentElement.style.position !== 'relative') {
                    heartIcon.parentElement.style.position = 'relative';
                }

                heartIcon.parentElement.appendChild(badge);
            }
        }
    }

    // Shopping cart functionality
    const cartItems = [];
    const cartIcon = document.querySelector('.fa-shopping-cart');

    // Add to cart buttons for special offers
    document.querySelectorAll('.buy-now-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const offerCard = this.closest('.offer-card');
            const productName = offerCard.querySelector('h3').textContent;
            const price = offerCard.querySelector('.price').textContent;

            cartItems.push({
                name: productName,
                price: price,
                quantity: 1
            });

            this.textContent = 'Added to Cart';
            this.style.background = '#4caf50';

            setTimeout(() => {
                this.textContent = 'Buy Now';
                this.style.background = '#2c5aa0';
            }, 2000);

            showNotification(`${productName} added to cart`, 'success');
            updateCartCount();
        });
    });

    // Update cart count
    function updateCartCount() {
        if (cartIcon) {
            // Remove existing badge
            const existingBadge = cartIcon.parentElement.querySelector('.cart-badge');
            if (existingBadge) {
                existingBadge.remove();
            }

            // Add new badge
            if (cartItems.length > 0) {
                const badge = document.createElement('span');
                badge.className = 'cart-badge notification-badge';
                badge.textContent = cartItems.length;
                badge.style.cssText = `
                    position: absolute;
                    top: -8px;
                    right: -8px;
                    background: #4caf50;
                    color: white;
                    border-radius: 50%;
                    width: 16px;
                    height: 16px;
                    font-size: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                `;

                // Wrap cart icon in relative container
                if (cartIcon.parentElement.style.position !== 'relative') {
                    cartIcon.parentElement.style.position = 'relative';
                }

                cartIcon.parentElement.appendChild(badge);
            }
        }
    }

    // Product card click functionality
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function (e) {
            if (e.target.closest('.wishlist-btn')) return;

            const productName = this.querySelector('h3').textContent;
            const price = this.querySelector('.current-price').textContent;

            // Create modal or redirect to product page
            showProductModal(productName, price);
        });
    });

    // Show product modal (simplified version)
    function showProductModal(name, price) {
        const modal = document.createElement('div');
        modal.className = 'product-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease-out;
        `;

        modal.innerHTML = `
            <div style="
                background: white;
                padding: 40px;
                border-radius: 20px;
                text-align: center;
                max-width: 400px;
                width: 90%;
                animation: slideUp 0.3s ease-out;
            ">
                <h2 style="margin-bottom: 20px; color: #333;">${name}</h2>
                <p style="font-size: 24px; color: #2c5aa0; font-weight: 700; margin-bottom: 30px;">${price}</p>
                <div style="display: flex; gap: 15px; justify-content: center;">
                    <button onclick="this.closest('.product-modal').remove()" style="
                        background: #6c757d;
                        color: white;
                        border: none;
                        padding: 12px 25px;
                        border-radius: 25px;
                        cursor: pointer;
                        font-weight: 600;
                    ">Close</button>
                    <button onclick="addToCartFromModal('${name}', '${price}'); this.closest('.product-modal').remove();" style="
                        background: #2c5aa0;
                        color: white;
                        border: none;
                        padding: 12px 25px;
                        border-radius: 25px;
                        cursor: pointer;
                        font-weight: 600;
                    ">Add to Cart</button>
                </div>
            </div>
        `;

        // Add CSS animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideUp {
                from { transform: translateY(50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(modal);

        // Close modal when clicking outside
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                modal.remove();
                style.remove();
            }
        });
    }

    // Add to cart from modal
    window.addToCartFromModal = function (name, price) {
        cartItems.push({
            name: name,
            price: price,
            quantity: 1
        });
        showNotification(`${name} added to cart`, 'success');
        updateCartCount();
    };

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        const notification = document.createElement('div');
        notification.className = 'notification';

        const colors = {
            success: '#4caf50',
            error: '#f44336',
            info: '#2196f3',
            warning: '#ff9800'
        };

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type] || colors.info};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            z-index: 10001;
            font-weight: 600;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            animation: slideInRight 0.3s ease-out;
        `;

        notification.textContent = message;

        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(notification);

        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideInRight 0.3s ease-out reverse';
            setTimeout(() => {
                notification.remove();
                style.remove();
            }, 300);
        }, 3000);
    }

    // Search functionality
    const searchIcon = document.querySelector('.fa-search');
    if (searchIcon) {
        searchIcon.addEventListener('click', function () {
            const searchQuery = prompt('Search for furniture:');
            if (searchQuery && searchQuery.trim()) {
                showNotification(`Searching for "${searchQuery}"...`, 'info');
                // Here you would implement actual search functionality
                setTimeout(() => {
                    showNotification('Search functionality would be implemented here', 'info');
                }, 1000);
            }
        });
    }

    // Newsletter signup (for footer if added)
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                showNotification('Thank you for subscribing to our newsletter!', 'success');
                this.reset();
            }
        });
    }

    // Lazy loading for images (if real images were used)
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });

    // Scroll to top functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #ff7b54;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(255, 123, 84, 0.3);
        transition: all 0.3s ease;
    `;

    document.body.appendChild(scrollToTopBtn);

    // Show/hide scroll to top button
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'flex';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Header scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'white';
            navbar.style.backdropFilter = 'none';
        }

        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;
    });

    // Add transition to navbar
    navbar.style.transition = 'all 0.3s ease';

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function () {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Product sorting functionality
    const sortProducts = (criteria) => {
        const productGrids = document.querySelectorAll('.products-grid, .offers-grid');

        productGrids.forEach(grid => {
            const products = Array.from(grid.querySelectorAll('.product-card'));

            products.sort((a, b) => {
                if (criteria === 'price-low') {
                    const priceA = parseFloat(a.querySelector('.current-price').textContent.replace(', ', ''));
                    const priceB = parseFloat(b.querySelector('.current-price').textContent.replace(',', ''));
                    return priceA - priceB;
                } else if (criteria === 'price-high') {
                    const priceA = parseFloat(a.querySelector('.current-price').textContent.replace(',', ''));
                    const priceB = parseFloat(b.querySelector('.current-price').textContent.replace(',', ''));
                    return priceB - priceA;
                } else if (criteria === 'rating') {
                    const ratingA = parseFloat(a.querySelector('.stars').textContent);
                    const ratingB = parseFloat(b.querySelector('.stars').textContent);
                    return ratingB - ratingA;
                } else if (criteria === 'name') {
                    const nameA = a.querySelector('h3').textContent.toLowerCase();
                    const nameB = b.querySelector('h3').textContent.toLowerCase();
                    return nameA.localeCompare(nameB);
                }
                return 0;
            });

            // Clear grid and re-append sorted products
            grid.innerHTML = '';
            products.forEach(product => {
                grid.appendChild(product);
            });
        });
    };

    // Add sort buttons (you can add these to your HTML if needed)
    window.sortProducts = sortProducts;

    // Category filtering
    const filterProducts = (category) => {
        const productCards = document.querySelectorAll('.product-card');

        productCards.forEach(card => {
            const productName = card.querySelector('h3').textContent.toLowerCase();

            if (category === 'all' || productName.includes(category.toLowerCase())) {
                card.style.display = 'block';
                card.classList.add('fade-in-up');
            } else {
                card.style.display = 'none';
            }
        });
    };

    window.filterProducts = filterProducts;

    // Product comparison functionality
    const compareList = new Set();

    const addToCompare = (productName) => {
        if (compareList.size >= 3) {
            showNotification('You can compare maximum 3 products', 'warning');
            return;
        }

        compareList.add(productName);
        showNotification(`${productName} added to comparison`, 'success');

        if (compareList.size >= 2) {
            showCompareButton();
        }
    };

    const showCompareButton = () => {
        const existingBtn = document.querySelector('.compare-floating-btn');
        if (existingBtn) return;

        const compareBtn = document.createElement('button');
        compareBtn.className = 'compare-floating-btn';
        compareBtn.innerHTML = `Compare (${compareList.size})`;
        compareBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 30px;
            background: #2c5aa0;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
            z-index: 1000;
            box-shadow: 0 5px 15px rgba(44, 90, 160, 0.3);
            transition: all 0.3s ease;
        `;

        compareBtn.addEventListener('click', () => {
            showNotification(`Comparing: ${Array.from(compareList).join(', ')}`, 'info');
            // Here you would implement actual comparison functionality
        });

        document.body.appendChild(compareBtn);
    };

    window.addToCompare = addToCompare;

    // Price filter functionality
    const createPriceFilter = () => {
        const priceFilter = document.createElement('div');
        priceFilter.className = 'price-filter';
        priceFilter.style.cssText = `
            position: fixed;
            top: 120px;
            right: 20px;
            background: white;
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            z-index: 1000;
            display: none;
        `;

        priceFilter.innerHTML = `
            <h4 style="margin-bottom: 15px; color: #2c5aa0;">Filter by Price</h4>
            <div style="margin-bottom: 10px;">
                <input type="range" id="priceRange" min="0" max="1000" value="1000" style="width: 100%;">
                <div style="display: flex; justify-content: space-between; font-size: 12px; color: #666;">
                    <span>$0</span>
                    <span id="priceValue">$1000</span>
                </div>
            </div>
            <button onclick="applyPriceFilter()" style="
                background: #2c5aa0;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 15px;
                cursor: pointer;
                font-size: 12px;
                width: 100%;
            ">Apply Filter</button>
        `;

        document.body.appendChild(priceFilter);

        // Update price display
        const priceRange = priceFilter.querySelector('#priceRange');
        const priceValue = priceFilter.querySelector('#priceValue');

        priceRange.addEventListener('input', function () {
            priceValue.textContent = `${this.value}`;
        });
    };

    const applyPriceFilter = () => {
        const maxPrice = parseFloat(document.getElementById('priceRange').value);
        const productCards = document.querySelectorAll('.product-card');

        productCards.forEach(card => {
            const price = parseFloat(card.querySelector('.current-price').textContent.replace(',', ''));

            if (price <= maxPrice) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        showNotification(`Showing products under ${maxPrice}`, 'info');
    };

    window.applyPriceFilter = applyPriceFilter;

    // Initialize price filter
    createPriceFilter();

    // Toggle price filter visibility
    window.togglePriceFilter = function () {
        const priceFilter = document.querySelector('.price-filter');
        priceFilter.style.display = priceFilter.style.display === 'none' ? 'block' : 'none';
    };

    // Keyboard shortcuts
    document.addEventListener('keydown', function (e) {
        // Ctrl/Cmd + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            document.querySelector('.fa-search').click();
        }

        // Escape to close modals
        if (e.key === 'Escape') {
            const modal = document.querySelector('.product-modal');
            if (modal) {
                modal.remove();
            }

            const priceFilter = document.querySelector('.price-filter');
            if (priceFilter && priceFilter.style.display === 'block') {
                priceFilter.style.display = 'none';
            }
        }
    });

    // Performance optimization: Debounce scroll events
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    // Apply debouncing to scroll-heavy functions
    const debouncedScrollHandler = debounce(() => {
        // Any heavy scroll operations would go here
    }, 16); // ~60fps

    window.addEventListener('scroll', debouncedScrollHandler);

    // Initialize tooltips for better UX
    const initializeTooltips = () => {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');

        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', function () {
                const tooltipText = this.getAttribute('data-tooltip');
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = tooltipText;
                tooltip.style.cssText = `
                    position: absolute;
                    background: #333;
                    color: white;
                    padding: 8px 12px;
                    border-radius: 6px;
                    font-size: 12px;
                    z-index: 10002;
                    pointer-events: none;
                    white-space: nowrap;
                `;

                document.body.appendChild(tooltip);

                const rect = this.getBoundingClientRect();
                tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
                tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';

                this.tooltipElement = tooltip;
            });

            element.addEventListener('mouseleave', function () {
                if (this.tooltipElement) {
                    this.tooltipElement.remove();
                    this.tooltipElement = null;
                }
            });
        });
    };

    // Initialize tooltips
    initializeTooltips();

    // Add loading states for better UX
    const addLoadingState = (button) => {
        const originalText = button.textContent;
        button.textContent = 'Loading...';
        button.disabled = true;
        button.style.opacity = '0.7';

        return () => {
            button.textContent = originalText;
            button.disabled = false;
            button.style.opacity = '1';
        };
    };

    // Add loading states to important buttons
    document.querySelectorAll('.shop-now-btn, .buy-now-btn, .see-all-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const removeLoading = addLoadingState(this);

            // Simulate loading time
            setTimeout(() => {
                removeLoading();
            }, 1000);
        });
    });

    // Final initialization message
    console.log('🪑 Furniture Store website loaded successfully!');
    console.log('🛠️ Debug commands available:');
    console.log('- sortProducts("price-low") - Sort by price ascending');
    console.log('- filterProducts("chair") - Filter products by category');
    console.log('- togglePriceFilter() - Toggle price filter');

    // Show welcome message
    setTimeout(() => {
        showNotification('Welcome to our Modern Furniture Store! 🪑', 'success');
    }, 1000);
});

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('.login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent default form submission

            // Get form values
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Here you would typically validate credentials with your backend
            // For demo purposes, we'll just redirect

            // Redirect to home page
            window.location.href = 'index.html'; // Change this to your home page URL
        });
    }
});