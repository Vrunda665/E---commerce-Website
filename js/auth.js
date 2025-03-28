// Signup functionality
document.getElementById('signupForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const userData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };
    
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (userData.password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    // Store user data
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (users.find(user => user.email === userData.email)) {
        alert('Email already registered!');
        return;
    }
    
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('Registration successful!');
    window.location.href = 'login.html';
});

// Login functionality
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Store login status
        localStorage.setItem('currentUser', JSON.stringify({
            fullName: user.fullName,
            email: user.email
        }));
        
        alert('Login successful!');
        window.location.href = 'index.html';
    } else {
        alert('Invalid email or password!');
    }
});

// Check login status
function checkLoginStatus() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userIcon = document.querySelector('.user-icon');
    
    if (currentUser) {
        userIcon.innerHTML = `
            <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown">
                    ${currentUser.fullName}
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#" onclick="logout()">Logout</a></li>
                </ul>
            </div>
        `;
    }
}

// Logout functionality
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}
