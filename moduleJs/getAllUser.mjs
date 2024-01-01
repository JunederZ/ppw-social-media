export async function getAll() {
    console.log("sad")
    return new Promise((resolve, reject) => {
        fetch('https://ppwsosmed.risalahqz.repl.co/api/getAllUser', {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
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
