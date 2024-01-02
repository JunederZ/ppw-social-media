import * as cookieUtils from './moduleJs/cookie.mjs';
import * as loadAllFriend from './moduleJs/loadAllFriend.mjs';
import * as goToProfile from './moduleJs/goToProfile.mjs';
import * as loadNotif from './moduleJs/loadAllNotif.mjs';
import * as loadProfile from './moduleJs/loadProfileImage.mjs';
import * as getUser from './moduleJs/getUserData.mjs';
import * as sendRequest from './moduleJs/sendRequest.mjs';
import * as getUserPost from './moduleJs/getUserPost.mjs';
import * as acceptFriend from './moduleJs/acceptFriend.mjs';
import * as removeFriend from './moduleJs/removeFriend.mjs';


var modal = document.getElementById("exampleModalCenter");
var changeprofile = document.getElementById("ModalProfile");
var changeprofileBtn = document.getElementById("change-profile");

var btn = document.getElementById("profile-btn");
var btn = document.getElementById("profile-btn");

var span = document.getElementById("tutup-modal");
var span2 = document.getElementById("tutup-button");
var span3 = document.getElementById("close-button");
var span4 = document.getElementById("close-modal");

span.onclick = function() {
  modal.style.display = "none";
}
span2.onclick = function() {
  modal.style.display = "none";
}
span3.onclick = function() {
    changeprofile.style.display = "none";
  }
span4.onclick = function() {
    changeprofile.style.display = "none";
  }
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

changeprofileBtn.onclick = function() {
    changeprofile.style.display = "block";
}


window.onclick = function(event) {
    if (event.target == changeprofile) {
      changeprofile.style.display = "none";
    }
}

async function loadFriends(id) {
    var posts = await loadAllFriend.loadAllFriends(id); // Await the receiveAllPost function to get the posts
    const postsContainer = document.getElementById('friend-container');
    while (postsContainer.lastChild) {
        postsContainer.removeChild(postsContainer.lastChild);
    }
    posts.forEach(async (post) => {
        const postElement = document.createElement('div');
        const imgSrc = await loadProfile.getProfileImage(post.userId);
        var dataUser = await getUser.getUser(post.userId);
        postElement.innerHTML = `
        <div class="friend-details" id="friend-details-${post.userId}" style="cursor:pointer">
            <div class="friend-profile">
                <img src="${imgSrc}" alt="Friend 1">
            </div>
            <p class="friend-name">${dataUser.username}</p>
            <div class="friend-data">
                <p>Email: ${dataUser.email}</p>
                <p>Location: ${dataUser.alamat}</p>
                <p>Bio: ${dataUser.bio}</p>
            </div>
        </div>
        `;
        postsContainer.appendChild(postElement);
    });
}

async function loadAllNotif(id) {
    var dict = {
        1: "Mengirim anda pertemanan",
        2: "Telah mentowewew anda",
      };

    var posts = await loadNotif.loadAllNotif(id); // Await the receiveAllPost function to get the posts
    const postsContainer = document.getElementById('dropdown-notif');
    if (posts.length === 0) {
        return;
    }
    posts.forEach(post => {
        const postElement = document.createElement('div');
        var time = new Date(Number(post.dateUnix * 1000));
        try {
            var username = JSON.parse(post.content).username;
            var idRequest = JSON.parse(post.content).userIdSource;
        }catch(err) {
            return;
        }
        var acc = "";
        if (post.type == 1) {
            acc = "Accept";
        }
        postElement.innerHTML = `
        <li class="notification-item">
            <div class="notification-profile">
                <img src="images/profile.jpg" alt="Profile Picture">
            </div>
            <div class="notification-content">
                <p><strong>${username}</strong> ${dict[post.type]}</p>
                <span class="notification-time">${time.toDateString()} | ${time.toTimeString()}</span>
            </div>
            <div class="accept-button">
                <button class="accept" id="accept accept-${idRequest}">${acc}</button>
            </div>
        </li>
        `;
        postsContainer.appendChild(postElement);
    });
}

async function otherProfile(id, type) {

    // not friend
    if (type == 1) {
        var data = await getUser.getUser(id);
        const imgSrc = await loadProfile.getProfileImage(id);
        document.querySelector("#profile-picture-main").src = imgSrc;
        document.querySelector(".profile-btn a").textContent = "Add Friend";
        document.querySelector(".profile-btn").id = "add-friend";
        document.querySelector(".profile-btn").addEventListener('click', async () => {
            await sendRequest.sendRequest(id);
            await goToProfile.goToProfile(id)
        });
        document.querySelector("#username").textContent = data.username;
    }
    else if (type == 2) {
        var data = await getUser.getUser(id);
        const imgSrc = await loadProfile.getProfileImage(id);
        document.querySelector("#profile-picture-main").src = imgSrc;
        document.querySelector("#profile-btn a").textContent = "Already Friend";
        document.querySelector("#profile-btn").id = "";
        document.querySelector("#username").textContent = data.username;
    }
    else if (type == 4) {
        var data = await getUser.getUser(id);
        const imgSrc = await loadProfile.getProfileImage(id);
        document.querySelector("#profile-picture-main").src = imgSrc;
        document.querySelector("#profile-btn a").textContent = "Friend request sended";
        document.querySelector("#profile-btn").id = "";
        document.querySelector("#username").textContent = data.username;
    }
    else if (type == 5) {
        var data = await getUser.getUser(id);
        var btnContainer = document.querySelector("#user-btn");
        var newBtn = document.createElement('button');
        // newBtn.classList.add('profile-btn');
        newBtn.classList = `decline decline-${id}`;
        newBtn.id = `decline-${id}`;
        newBtn.textContent = "Decline";
        btnContainer.appendChild(newBtn);
        const imgSrc = await loadProfile.getProfileImage(id);
        document.querySelector("#profile-picture-main").src = imgSrc;
        document.querySelector("#profile-btn").classList = `accept accept-${id}`;
        document.querySelector("#profile-btn").textContent = "Accept";
        document.querySelector("#profile-btn").id = `accept-${id}`;
        document.querySelector("#username").textContent = data.username;
    }

}

async function loadPost(id) {
    var posts = await getUserPost.getUserPost(id);
    const postsContainer = document.getElementById('post-container');
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.innerHTML = `
        <div class="post">
            <div class="top-post">
                <div class="postlistimg">
                    <img src="images/profile.jpg" alt="Profile Picture">
                </div>
                <div class="postlistname">
                    <p class="post-author">${post.username}</p>
                </div>
            </div>
            <p class="post-content"> ${post.content}</p>
            <p class="post-time">${post.date}</p>
        </div>
        `;
        postsContainer.appendChild(postElement);
    });
}


document.addEventListener('DOMContentLoaded', async function() {

    var mainUserData = await getUser.getUser(cookieUtils.getCookie('id'));
    document.getElementById('profile-picture-main').src = await loadProfile.getProfileImage(cookieUtils.getCookie('id'));
    document.querySelector('.user-name > a:nth-child(1)').textContent = mainUserData.username;
    
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');
    const id = urlParams.get('id');
    if (type != null && id != null) {
        console.log(type);
        console.log(id);
        await otherProfile(id, type);
        await loadPost(id);
    }
    else {
        await loadPost(cookieUtils.getCookie('id'));
        function displayModal() {
            modal.style.display = "block";
        }
        
        btn.onclick = displayModal;
        var data = await getUser.getUser(cookieUtils.getCookie('id'));
        document.querySelector("#exampleModalCenter > div:nth-child(1) > div:nth-child(1) > form:nth-child(2) > div:nth-child(1) > input:nth-child(2)").value = data.username;
        document.querySelector("#email").value = data.email;
        document.querySelector("#location").value = data.alamat;
        document.querySelector("#interest").value = data.ttl;
        document.querySelector("#bio").value = data.bio;
    }
    
    await loadFriends(cookieUtils.getCookie('id'));
    await loadAllNotif(cookieUtils.getCookie('id'));
    
    
        // friend list click
        document.addEventListener('click', async function(event) {
            const target = event.target.closest('[id^="friend-details-"]');
            if (target) {
                const buttonId = target.id;
                const idNumber = buttonId.split('-')[2];
                // Use the idNumber as needed
                console.log(idNumber, "ok waitss");
                var res = await goToProfile.goToProfile(idNumber);
            }
        });
    
        document.getElementById('UpdStd').addEventListener('click', async function(e) {
            console.log("sad");
    
            var profileImage = document.getElementById('profileImage').files[0];
            var id = cookieUtils.getCookie('id');
            var form = new FormData();
            form.append('file', profileImage);
            form.append('userId', JSON.stringify({ userId: id }));
            var res = await fetch('https://ppwsosmed.risalahqz.repl.co/api/uploadProfile', {
                method: 'POST',
                body: form,
            }).then(response => response.text())
            .then(data => {
                console.log(data);
                window.location.reload();
            })
        
        });
        document.getElementById("Updbtn").addEventListener("click", async () => {

            var sendObject = {
              userId: cookieUtils.getCookie('id'),
              email: document.getElementById("email").value,
              username: document.querySelector("#exampleModalCenter > div:nth-child(1) > div:nth-child(1) > form:nth-child(2) > div:nth-child(1) > input:nth-child(2)").value,
              bio: document.getElementById("bio").value,
              ttl: document.getElementById("interest").value,
              alamat: document.getElementById("location").value,
            };
            var sendJson = JSON.stringify(sendObject);
            const toptions = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: sendJson,
            };
            var temp = await fetch(
              "https://ppwsosmed.risalahqz.repl.co/api/updateUserAllData",
              toptions
            )
              .then((response) => response)
              .catch((err) => console.error(err));
            window.location.reload();
          });

    // Add event listener to accept-request buttons
    document.addEventListener('click', async (event) => {
        if (event.target.classList.contains('accept')) {
            const buttonId = event.target.id;
            const idNumber = buttonId.split('-')[1];
            console.log(idNumber);
            // Use the idNumber as needed
            var res = await acceptFriend.acceptFriend(idNumber);
            console.log(res)
            if (res == "ok") {
                alert("you accept the request");
                window.location.replace("home.html");
            }
            else {
                alert("error");
                window.location.replace("home.html");
            }
        }
    });

    // Add event listener to decline-request buttons
    document.addEventListener('click', async (event) => {
        if (event.target.classList.contains('decline')) {
            const buttonId = event.target.id;
            const idNumber = buttonId.split('-')[1];
            // Use the idNumber as needed
            console.log(idNumber);
            var res = await removeFriend.removeFriend(idNumber);
            console.log(res)
            if (res == "ok") {
                alert("you decline the request");
                window.location.replace("home.html");
            }
            else {
                alert("error");
                window.location.replace("home.html");
            }
        }
    });



    const searchForm = document.getElementById('search');
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const searchInput = document.getElementById('search-input').value;
        const searchUrl = `searchPage.html?username=${searchInput}`;
        window.location.href = searchUrl; 
    });
    
});

