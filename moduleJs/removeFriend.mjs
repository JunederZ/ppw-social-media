import * as cookieUtils from './cookie.mjs';

export async function removeFriend(id) {
    return new Promise((resolve, reject) => {
        fetch('https://ppwsosmed.risalahqz.repl.co/api/removeFriendship', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({userId1: cookieUtils.getCookie('id'), userId2: id})
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
