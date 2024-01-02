import * as cookieUtils from './moduleJs/cookie.mjs';


// Get the logout button element
const logoutButton = document.getElementById('logoutbtn');

// Add click event listener to the logout button
logoutButton.addEventListener('click', () => {
    // Remove cookies
    cookieUtils.removeCookie('id');
    cookieUtils.removeCookie('username');

    // Redirect to login.html
    window.location.href = 'login.html';
});
