// Function to handle form submission
function registerFormSubmit(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!username || !email || !password) {
        alert('Please fill in all fields');
        return;
    }

    console.log(JSON.stringify({ username, email, password }));

    fetch('https://ppwsosmed.risalahqz.repl.co/api/register', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert('Registration successful!');
        })
        .catch(error => {
            console.error(error);
            alert('Registration failed. Please try again later.');
        });
}

const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', registerFormSubmit);
