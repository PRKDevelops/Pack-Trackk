// login.js

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Basic validation
    if (!username || !password) {
        document.getElementById('error-message').textContent = "Both fields are required!";
        return;
    }

    // Create form data
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    // Make POST request to Spring Boot Backend
    fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${username}&password=${password}`,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Login failed');
        }
        return response.json();
    })
    .then(data => {
        // Handle successful login
        console.log('Login successful:', data);
        // Redirect or perform other actions here
        window.location.href = "/dashboard"; // Example of redirect after successful login
    })
    .catch(error => {
        console.error('Error during login:', error);
        document.getElementById('error-message').textContent = "Invalid credentials. Please try again.";
    });
});
