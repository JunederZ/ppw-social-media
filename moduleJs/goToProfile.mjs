import * as cookieUtils from './cookie.mjs';

export async function goToProfile(id) {
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
                if (data != null) {
                    if (data.userId == cookieUtils.getCookie('id')) {
                        window.location.pathname = 'home-profile.html';
                        return;
                    }
                    else if (data.type != null) {
                        console.log(data.userId);
                        var params = new URLSearchParams();
                        params.append("type", data.type);
                        params.append("id", data.userId);
                        var path = "home-profile.html?" + window.location.search + "&" + params.toString();
                        console.log(path);
                        window.location.href = path;
                        return;
                    }
                }
                resolve("error");
            })
            .catch(error => {
                console.error('Error:', error);
                reject(error);
            });
    });
}
