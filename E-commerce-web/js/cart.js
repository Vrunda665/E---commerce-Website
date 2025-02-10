let cart = [];

document.addEventListener('DOMContentLoaded', function() {
    const crossIcons = document.querySelectorAll('.icon-cross');
    
    crossIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent the parent <a> tag from redirecting
            
            const product = {
                id: this.dataset.id,
                name: this.dataset.name,
                price: parseFloat(this.dataset.price),
                image: this.dataset.image,
                quantity: 1
            };
            
            addToCart(product);
            window.location.href = 'cart.html';
        });
    });
});

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const existingProduct = cart.find(item => item.id === product.id);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.productId !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.productId === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    
    if (!cartContainer) return;
    
    cartContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        
        cartContainer.innerHTML += `
            <tr>
                <td class="product-thumbnail">
                    <img src="${item.image}" alt="${item.name}" class="img-fluid">
                </td>
                <td class="product-name">${item.name}</td>
                <td>$${item.price}</td>
                <td>
                    <button onclick="updateQuantity(${item.productId}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.productId}, 1)">+</button>
                </td>
                <td>$${subtotal}</td>
                <td><button onclick="removeFromCart(${item.productId})">×</button></td>
            </tr>
        `;
    });

    totalElement.textContent = `$${total.toFixed(2)}`;
}

// Initialize cart from localStorage
window.onload = function() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}
