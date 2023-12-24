document.getElementById("loginButton").addEventListener("click", login);

function login(event) {
    event.preventDefault(); // Prevents the form from submitting

    var form = document.getElementById("loginForm");
    var username = form.elements["username"].value;
    var password = form.elements["password"].value;

    if (username === "" || password === "") {
        alert("Please enter both username and password.");
        return;
    }

    window.location.replace("home.html");
}
