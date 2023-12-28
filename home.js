import * as getUserPost from './getUserPost.mjs';
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
            <h3 class="post-author">${post.username}</h3>
            <p class="post-content"> ${post.content}</p>
            <p class="post-time">${post.date}</p>
        </div>
        `;
        postsContainer.appendChild(postElement);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    
    loadPost();


    
});

    