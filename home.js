import * as loadAllFriend from './moduleJs/loadAllFriend.mjs';
import * as cookieUtils from './moduleJs/cookie.mjs';
import * as receiveAllPost from './moduleJs/receiveAllPost.mjs';
import * as loadNotif from './moduleJs/loadAllNotif.mjs';
import * as acceptFriend from './moduleJs/acceptFriend.mjs';
import * as goToProfile from './moduleJs/goToProfile.mjs';
import * as getUser from './moduleJs/getUserData.mjs';
import * as loadProfile from './moduleJs/loadProfileImage.mjs';


// Get the form element
const post = document.getElementById('post-input');

// Add event listener for form submission
post.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    const content = document.getElementById('content').value;
    const userId = cookieUtils.getCookie('id');
    const likes = 0;

    fetch('https://ppwsosmed.risalahqz.repl.co/api/insertNewBasicPost', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content, userId, likes})
    })
    .then(response => response.status)
    .then(data => {
        
        if (data === 200) {
            alert('Post successful!');
            location.reload();
        }
        else {
            alert('Post failed. Please try again later.');

        }
    })
    
    .catch(error => {
        console.error('Error:', error);
    });

});

async function loadPost() {
    var posts = await receiveAllPost.receiveAllPost();
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

async function loadFriends(id) {
    var posts = await loadAllFriend.loadAllFriends(id); // Await the receiveAllPost function to get the posts
    const postsContainer = document.getElementById('friend-container');
    while (postsContainer.lastChild) {
        postsContainer.removeChild(postsContainer.lastChild);
    }
    posts.forEach(async (post) => {
        console.log(post);
        const postElement = document.createElement('div');
        const imgSrc = await loadProfile.getProfileImage(post.userId);
        var dataUser = await getUser.getUser(post.userId);
        console.log(imgSrc);
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

    document.getElementById('profile-picture-main').src = await loadProfile.getProfileImage(cookieUtils.getCookie('id'));


    var posts = await loadNotif.loadAllNotif(id); // Await the receiveAllPost function to get the posts
    const postsContainer = document.getElementById('dropdown-notif');
    console.log(posts);
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
                <button class="accept" id="accept accept-${idRequest}">Accept</button>
            </div>
        </li>
        `;
        postsContainer.appendChild(postElement);
    });
}

document.addEventListener('DOMContentLoaded', async function() {
    await loadPost();        
    await loadFriends(cookieUtils.getCookie('id'));
    await loadAllNotif(cookieUtils.getCookie('id'));

    // Add event listener to accept-request buttons
    document.addEventListener('click', async function(event) {
        if (event.target.classList.contains('accept')) {
            const buttonId = event.target.id;
            const idNumber = buttonId.split('-')[1];
            // Use the idNumber as needed
            var res = await acceptFriend.acceptFriend(idNumber);
            console.log(res)
            if (res == "ok") {
                alert("you accept the request");
                location.reload();
            }
            else {
                alert("error");
                location.reload();
            }
        }
    });

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

    var mainData = await getUser.getUser(cookieUtils.getCookie('id'));
    const detailElement = document.createElement('div');
    detailElement.innerHTML = `
        <h3>${mainData.username}</h3>
        <div class="detail-box">
            <p>Email: ${mainData.email}</p>
            <p>Location: ${mainData.alamat}</p>
            <p>Bio: ${mainData.bio}</p>
        </div>
    `
    document.getElementById("profile-details").append(detailElement);
    

    const searchForm = document.getElementById('search');
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const searchInput = document.getElementById('search-input').value;
        const searchUrl = `searchPage.html?username=${searchInput}`;
        window.location.href = searchUrl; 
    });

});