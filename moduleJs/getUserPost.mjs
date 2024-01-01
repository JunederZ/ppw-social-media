

export function getBasicPost(userId) {
    // let userId = 1;
    var date = new Date(1600000000 * 1000);
    console.log(date);
    fetch('https://ppwsosmed.risalahqz.repl.co/api/getBasicUserPost',  {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })    
    })
        .then(response => response.text())
        .then(data => {
            data = JSON.parse(data);
            console.log(data);
            const postsContainer = document.getElementById('post-container');
            while (postsContainer.lastChild) {
                postsContainer.removeChild(postsContainer.lastChild);
            }
            if (data.length === 0) {
                const postElement = document.createElement('div');
                postsContainer.style.display = "grid";
                postsContainer.style.placeItems = "center";
                postElement.innerHTML = `<p class="no-post"> No post yet! </p>`;
                postsContainer.appendChild(postElement);
                console.log("no post")
                return;
            }
            postsContainer.style.removeProperty('display');
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
}
