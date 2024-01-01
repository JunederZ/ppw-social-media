import * as cookieUtils from './moduleJs/cookie.mjs';

function handleLoginFormSubmit(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('https://ppwsosmed.risalahqz.repl.co/api/login', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            if (data === 'username or password is wrong') {
                alert('Username or password is wrong');
                return;
            }
            data = JSON.parse(data);
            if (data.userId !== null) { 
                console.log('Login successful');
                window.location.replace("home.html");
                cookieUtils.setCookie('id', data.userId, 1);
                cookieUtils.setCookie('username', data.username, 1);
            } else {
                console.log('Login failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', handleLoginFormSubmit);
