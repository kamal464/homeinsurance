document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const showSignupButton = document.getElementById('show-signup');
    const showLoginFormButton = document.getElementById('show-login');

    showSignupButton.addEventListener('click', () => {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
    });

    showLoginFormButton.addEventListener('click', () => {
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
    });

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = loginForm.querySelector('#login-email').value;
        const password = loginForm.querySelector('#login-password').value;
        
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: email, password: password })
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log(data); // Handle response from backend
               const set = localStorage.setItem('loggedInUser', JSON.stringify(data)); 
               console.log(set)
               // Set loggedInUser in localStorage
                window.location.href = "/homepage.html";
            } else {
                console.error("Login failed.");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
    

    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = signupForm.querySelector('#signup-email').value;
        const password = signupForm.querySelector('#signup-password').value;
        const name = signupForm.querySelector('#signup-name').value;
        
        try {
            const response = await fetch('/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: email, password: password , name:name })
            });

            const data = await response.json();
            console.log(data); // Handle response from backend
            if (response.ok) {
                localStorage.setItem('loggedInUser', JSON.stringify(data));
                window.location.href = "/homepage.html";
            } else {
                console.error("Login failed.");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Show only the login form initially
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
});
