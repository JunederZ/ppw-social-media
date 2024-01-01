import * as loadAllFriends from './moduleJs/loadAllFriend.js';
import * as cookieUtils from './moduleJs/cookie.mjs';

async function loadFriends() {
    var id = cookieUtils.getCookie('id');
    var friends = await loadAllFriends.loadAllFriends(id);
    console.log(friends);
    const friendContainer = document.getElementById('friendlist-container');
    friends.forEach(friend => {
        const friendElement = document.createElement('div');
        friendElement.innerHTML = `
        <button class="friendlist-item">    
            <div class="friendlist-profile">
                <img src="images/friend3.jpg" alt="Friend 3">
            </div>
            <div class="friendlist-details">
                <h3>${friend.username}</h3>
            </div>
        </button>
        `;
        friendContainer.appendChild(friendElement);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    
    loadFriends();
    
});
