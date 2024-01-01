export async function loadAllNotif(id) {
    console.log("notif  ")
    return new Promise((resolve, reject) => {
        fetch('https://ppwsosmed.risalahqz.repl.co/api/readNotification', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userId: id})
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
