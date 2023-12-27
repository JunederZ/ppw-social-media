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
                setCookie('id', data.userId, 1);
                setCookie('username', data.username, 1);
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

function setCookie(cname,cvalue,exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + "; SameSite=None;" + "path=/";
  }
  
  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function removeCookie(cname) {
    document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}