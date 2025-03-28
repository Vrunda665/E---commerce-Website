document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const userData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    // Store user data in localStorage (as a simple DB simulation)
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));

    // Redirect to login page
    window.location.href = 'login.html';
});
