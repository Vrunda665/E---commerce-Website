function displayOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderTable = document.querySelector('.site-block-order-table tbody');
    let subtotal = 0;

    // Clear existing content
    orderTable.innerHTML = '';

    // Add cart items
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        orderTable.innerHTML += `
            <tr>
                <td>${item.name} <strong class="mx-2">x</strong> ${item.quantity}</td>
                <td>$${itemTotal.toFixed(2)}</td>
            </tr>
        `;
    });

    // Add subtotal and total rows
    orderTable.innerHTML += `
        <tr>
            <td class="text-black font-weight-bold"><strong>Cart Subtotal</strong></td>
            <td class="text-black">$${subtotal.toFixed(2)}</td>
        </tr>
        <tr>
            <td class="text-black font-weight-bold"><strong>Order Total</strong></td>
            <td class="text-black font-weight-bold"><strong>$${subtotal.toFixed(2)}</strong></td>
        </tr>
    `;
}

// Call this when page loads
document.addEventListener('DOMContentLoaded', displayOrderSummary);
