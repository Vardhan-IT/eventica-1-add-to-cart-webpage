document.addEventListener('DOMContentLoaded', function() {
    // Load cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Update cart display
    updateCartDisplay();
    
    // Continue Shopping button
    document.getElementById('continue-shopping-btn').addEventListener('click', function() {
        window.location.href = '../index.html';
    });
    
    // Checkout button
    document.getElementById('checkout-btn').addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        // In a real application, this would redirect to a checkout page
        alert('Proceeding to checkout...');
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    });
    
    function updateCartDisplay() {
        const cartItems = document.getElementById('cart-items');
        const cartTotalAmount = document.getElementById('cart-total-amount');
        const navCartCount = document.querySelector('.nav-cart-count');
        
        // Clear current cart items
        cartItems.innerHTML = '';
        
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty.</p>
                </div>
            `;
            cartTotalAmount.textContent = '$0';
            navCartCount.textContent = '0';
            return;
        }
        
        // Calculate total
        let total = 0;
        
        // Add each item to the cart
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</div>
                </div>
                <div class="cart-item-total">$${itemTotal.toFixed(2)}</div>
                <div class="cart-item-remove" data-index="${index}">
                    <i class="fas fa-times"></i>
                </div>
            `;
            
            cartItems.appendChild(cartItemElement);
        });
        
        // Update total amount
        cartTotalAmount.textContent = `$${total.toFixed(2)}`;
        navCartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        
        // Add event listeners to remove buttons
        const removeButtons = document.querySelectorAll('.cart-item-remove');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartDisplay();
            });
        });
    }
}); 