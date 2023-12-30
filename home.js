import * as loadAllFriend from './loadAllFriend.mjs';
import * as cookieUtils from './cookie.mjs';
import * as receiveAllPost from './receiveAllPost.mjs';

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
    var posts = await receiveAllPost.receiveAllPost(); // Await the receiveAllPost function to get the posts
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

async function loadFriends() {
    var posts = await loadAllFriend.loadAllFriends(); // Await the receiveAllPost function to get the posts
    const postsContainer = document.getElementById('friend-container');
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.innerHTML = `
        <div class="friend-details">
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

async function loadAllNotif() {
    var posts = await loadAllFriend.loadAllFriends(); // Await the receiveAllPost function to get the posts
    const postsContainer = document.getElementById('dropdown-notif');
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
    
    await loadPost();
    await loadFriends()
    
});

