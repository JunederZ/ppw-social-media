import * as cookieUtils from './moduleJs/cookie.mjs';
import * as loadAllFriend from './moduleJs/loadAllFriend.mjs';
import * as goToProfile from './moduleJs/goToProfile.mjs';
import * as loadNotif from './moduleJs/loadAllNotif.mjs';


var modal = document.getElementById("profilePictureModal");

var btn = document.getElementById("change-profile");

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

async function checkImageExists(imageUrl) {
    try {
      const response = await fetch(imageUrl, {
         method: 'HEAD' ,
         headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        });
      return response.status === 200; 
    } catch {
      return false;
    }
  }

async function getProfileImage(id) {

    var imageUrl = `https://ppwsosmed.risalahqz.repl.co/userProfileImage/${id}.jpg`;
    var image = await checkImageExists(imageUrl);

    if (image) {
        return imageUrl;
    }
    else {
        return "./images/profile.jpg";
    }

}

const imgSrc = getProfileImage();
const imgSrcMain = getProfileImage(cookieUtils.getCookie('id'));


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
    
        var profileImage = document.getElementById('profileImage').files[0];
        var id = cookieUtils.getCookie('id');
        var form = new FormData();
        form.append('file', profileImage);
        form.append('userId', JSON.stringify({ userId: id }));
        var res = await fetch('https://ppwsosmed.risalahqz.repl.co/api/uploadProfile', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: form,
        }).then(response => response.text())
        .then(data => {
            console.log(data);
            window.location.reload();
        })
    
    });

    
});

