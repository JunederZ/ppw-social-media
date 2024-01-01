import * as cookieUtils from './moduleJs/cookie.mjs';
import * as loadAllFriend from './moduleJs/loadAllFriend.mjs';
import * as goToProfile from './moduleJs/goToProfile.mjs';
import * as loadNotif from './moduleJs/loadAllNotif.mjs';


var modal = document.getElementById("exampleModalCenter");

var btn = document.getElementById("profile-btn");

var span = document.getElementById("close-modal");

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
} 


async function loadFriends(id) {
    var posts = await loadAllFriend.loadAllFriends(id); // Await the receiveAllPost function to get the posts
    const postsContainer = document.getElementById('friend-container');
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.innerHTML = `
        <div class="friend-details" id="friend-details-${post.userId}" style="cursor:pointer">
            <div class="friend-profile">
                <img src="images/profile.jpg" alt="Friend 1">
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
    console.log(posts);
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

document.addEventListener('DOMContentLoaded', async function() {
    
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
    
    document.getElementById('update-modal').addEventListener('click', async function(e) {
    
        var profileImage = document.getElementById('profileImage').value;
        var id = cookieUtils.getCookie('id');
        var res = await fetch('http://localhost:3000/api/user/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: new FormData(e.currentTarget)
        });
        var data = await res.json();
        if (data.status === 'success') {
            window.location.href = 'home.html';
        } else {
            alert(data.message);
        }
    
    });

    
});

