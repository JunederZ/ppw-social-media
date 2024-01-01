import * as cookieUtils from './cookie.mjs';

export async function getUser(id) {
    console.log("notif  ")
    return new Promise((resolve, reject) => {
        fetch('https://ppwsosmed.risalahqz.repl.co/api/getAnotherUserBasicData', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userIdSource: cookieUtils.getCookie('id'), userIdTarget: id})
        })
            .then(response => response.json())
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                console.error('Error:', error);
                reject(error);
            });
    });
}
