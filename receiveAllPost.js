fetch('https://ppwsosmed.risalahqz.repl.co/api/getBasicPost')
    .then(response => response.json())
    .then(data => {
        // Display the data on the website
        const postsContainer = document.getElementById('post-container');
        data.forEach(post => {
            const postElement = document.createElement('div');
            postElement.innerHTML = `
            <div class="post">
                <p class="post-content">${post.content}</p>
                <p class="post-author">${post.username}</p>
                <p class="post-time">${post.date}</p>
            </div>
            `;
            postsContainer.appendChild(postElement);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
