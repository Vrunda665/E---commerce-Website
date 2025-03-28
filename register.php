<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $password = trim($_POST['pass']);
    $confirm_password = trim($_POST['c_pass']);

    // Check if passwords match
    if ($password !== $confirm_password) {
        echo "<script>
            alert('Passwords do not match');
            window.location.href = 'register.html';
        </script>";
        exit();
    }


    // Hash the password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Email already exists
        echo "This email is already registered. <a href='login.html'>Login</a><br>";
        echo "OR register with different Email <a href='register.html'>Register</a><br>";
    }
    // Insert into the database
    else{
    $sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $name, $email, $hashed_password);

    if ($stmt->execute()) {
        header("Location: login.html");
    } else {
        echo "Error: " . $stmt->error;
    }
    if ($result->num_rows > 0) {
        // Email already exists
        echo "This email is already registered. <a href='register.html'>Try again</a>";
    }
  }
}
?>
