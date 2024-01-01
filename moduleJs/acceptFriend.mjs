import * as cookieUtils from './moduleJs/cookie.mjs';

export async function acceptFriend(id) {
    console.log("notif  ")
    return new Promise((resolve, reject) => {
        fetch('https://ppwsosmed.risalahqz.repl.co/api/acceptFriendRequest', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userIdSource: cookieUtils.getCookie('id'), userIdTarget: id})
        })
            .then(response => response.status)
            .then(data => {
                if (data == 200) {
                    resolve("ok")
                }
                resolve("error");
            })
            .catch(error => {
                console.error('Error:', error);
                reject(error);
            });
    });
}
