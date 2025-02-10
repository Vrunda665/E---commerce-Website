document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if user exists and password matches
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Store logged in user info
        localStorage.setItem('currentUser', JSON.stringify(user));
        // Redirect to home page
        window.location.href = 'index.html';
    } else {
        alert('Invalid email or password');
    }
});
