import * as cookieUtils from './moduleJs/cookie.mjs';
import * as loadAllFriend from './moduleJs/loadAllFriend.mjs';
import * as goToProfile from './moduleJs/goToProfile.mjs';
import * as loadNotif from './moduleJs/loadAllNotif.mjs';
import * as loadProfile from './moduleJs/loadProfileImage.mjs';
import * as getUser from './moduleJs/getUserData.mjs';
import * as sendRequest from './moduleJs/sendRequest.mjs';


var modal = document.getElementById("exampleModalCenter");
var changeprofile = document.getElementById("ModalProfile");

var btn = document.getElementById("profile-btn");

var span = document.getElementById("close-modal");
var span2 = document.getElementById("close-button");
var span3 = document.getElementById("tutup-button");
var span4 = document.getElementById("tutup-modal");

span.onclick = function() {
  modal.style.display = "none";
}
span2.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

window.onclick = function(event) {
    if (event.target == changeprofile) {
      changeprofile.style.display = "none";
    }
}
span3.onclick = function() {
    changeprofile.style.display = "none";
}  
span4.onclick = function() {
    changeprofile.style.display = "none";
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
        console.log(imgSrc);
        postElement.innerHTML = `
        <div class="friend-details" id="friend-details-${post.userId}" style="cursor:pointer">
            <div class="friend-profile">
                <img src="${imgSrc}" alt="Friend 1">
            </div>
            <p class="friend-name">${post.username}</p>
            <div class="friend-data">
                <p>Email: ${post.email}</p>
                <p>Location: ${post.alamat}</p>
                <p>Bio: ${post.bio}</p>
            </div>
        </div>
        `;
        postsContainer.appendChild(postElement);
    });
}

async function loadAllNotif(id) {
    var posts = await loadNotif.loadAllNotif(id); // Await the receiveAllPost function to get the posts
    const postsContainer = document.getElementById('dropdown-notif');
    if (posts.length === 1) {
        return;
    }
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.innerHTML = `
        <li class="notification-item">
            <div class="notification-profile">
                <img src="images/profile.jpg" alt="Profile Picture">
            </div>
            <div class="notification-content">
                <p><strong>${post}</strong> liked your post.</p>
                <span class="notification-time">2 hours ago</span>
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

}


document.addEventListener('DOMContentLoaded', async function() {
    
    await loadFriends(cookieUtils.getCookie('id'));
    await loadAllNotif(cookieUtils.getCookie('id'));

    document.getElementById('profile-picture-main').src = await loadProfile.getProfileImage(cookieUtils.getCookie('id'));

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

    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');
    const id = urlParams.get('id');
    if (type != null && id != null) {
        console.log(type);
        console.log(id);
        await otherProfile(id, type);
    }
    else {
        function displayModal() {
            modal.style.display = "block";
        }
        
        btn.onclick = displayModal;
    }

    const searchForm = document.getElementById('search');
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const searchInput = document.getElementById('search-input').value;
        const searchUrl = `searchPage.html?username=${searchInput}`;
        window.location.href = searchUrl; 
    });

    document.getElementById("Updbtn").addEventListener("click", () => {

        var sendObject = {
          userId: cookieUtils.getCookie('id'),
          email: document.getElementById("email").value,
          username: document.getElementById("username").value,
          bio: document.getElementById("bio").value,
          ttl: document.getElementById("ttl").value,
          alamat: document.getElementById("address").value,
        };
        var sendJson = JSON.stringify(sendObject);
        const toptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: sendJson,
        };
        var temp = fetch(
          "https://ppwsosmed.risalahqz.repl.co/api/updateUserAllData",
          toptions
        )
          .then((response) => response)
          .catch((err) => console.error(err));
        window.location.reload();
      });
});

