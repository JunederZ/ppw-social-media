import * as getAllUser from './moduleJs/getAllUser.mjs';
import * as relation from './moduleJs/relation.mjs';
import * as loadProfile from './moduleJs/loadProfileImage.mjs';
import * as goToProfile from './moduleJs/goToProfile.mjs';



const searchUser = (users, query) => {
    const regex = new RegExp(query, 'i');
    return users.filter(user => regex.test(user.username));
};

document.addEventListener('DOMContentLoaded', async () => {
    var users = await getAllUser.getAll();

    console.log(users);

    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);
    const username = urlParams.get('username');
    console.log(username);
    const searchResults = searchUser(users, username);

    var friendContainer = document.getElementById('friend-container');

    console.log(searchResults);

    searchResults.forEach(async (user) => {
        const friend = document.createElement('div');

        var relationWith = await relation.relationWith(user.userId);
        var type = relationWith.type;
        var imgSrc = await loadProfile.getProfileImage(user.userId);
        var friendStatus = (type == 2) ? "Friend" : "Not Friend";
        
        friend.innerHTML = `
        <div class="friends" id="friend-details-${user.userId}">
            <div class="friends-pict-dash">
                <img class="image-friend" id="friends-picture-main" src="${imgSrc}" alt="Profile Picture">
            </div>
            <a class="username-hyper">${user.username}</a>
            <div id="followed" class="followed">${friendStatus}</div>
        </div>
        `
        friendContainer.appendChild(friend);
    });

    document.addEventListener('click', async function(event) {
        console.log("sa");
        const target = event.target.closest('[id^="friend-details-"]');
        if (target) {
            const buttonId = target.id;
            const idNumber = buttonId.split('-')[2];
            // Use the idNumber as needed
            console.log(idNumber, "ok waitss");
            var res = await goToProfile.goToProfile(idNumber);
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

