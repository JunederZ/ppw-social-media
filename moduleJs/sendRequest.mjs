import * as cookieUtils from './cookie.mjs';

export async function sendRequest(id) {
    console.log("notif  ")
    return new Promise((resolve, reject) => {
        fetch('https://ppwsosmed.risalahqz.repl.co/api/insertFriendRequest', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userIdSource: cookieUtils.getCookie('id'), userIdTarget: id})
        })
            .then(response => response.text())
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                console.error('Error:', error);
                reject(error);
            });
    });
}
