function displayCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;

    cartItems.innerHTML = '';

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartItems.innerHTML += `
            <tr>
                <td class="product-thumbnail">
                    <img src="${item.image}" alt="${item.name}" class="img-fluid">
                </td>
                <td class="product-name">
                    <h2 class="h5 text-black">${item.name}</h2>
                </td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                    <div class="input-group mb-3" style="max-width: 120px;">
                        <div class="input-group-prepend">
                            <button class="btn btn-outline-primary" onclick="updateQuantity('${item.id}', -1)">−</button>
                        </div>
                        <span class="form-control text-center">${item.quantity}</span>
                        <div class="input-group-append">
                            <button class="btn btn-outline-primary" onclick="updateQuantity('${item.id}', 1)">+</button>
                        </div>
                    </div>
                </td>
                <td>${itemTotal.toFixed(2)}</td>
                <td><button onclick="removeItem('${item.id}')" class="btn btn-primary btn-sm">X</button></td>
            </tr>
        `;
    });

    cartTotal.textContent = `${total.toFixed(2)}`;
}

function updateQuantity(productId, change) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity += change;
        if (item.quantity < 1) {
            cart = cart.filter(item => item.id !== productId);
        }
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function removeItem(productId) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// Initialize cart display when page loads
document.addEventListener('DOMContentLoaded', displayCart);