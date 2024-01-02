export async function checkImageExists(imageUrl) {
    return new Promise((resolve) => {
      const image = new Image();
      image.onerror = () => resolve(false);
      image.onload = () => resolve(true);
      image.src = imageUrl;
    });
  }

export async function getProfileImage(id) {
    var imageUrl = `https://ppwsosmed.risalahqz.repl.co/userProfileImage/${id}.jpg`;
    var check = await checkImageExists(imageUrl);
    if (check == false) {
        imageUrl = `https://ppwsosmed.risalahqz.repl.co/userProfileImage/${id}.png`;
        check = await checkImageExists(imageUrl);
    }  
    if (check == false) {
        imageUrl = `https://ppwsosmed.risalahqz.repl.co/userProfileImage/${id}.jpeg`;
        check = await checkImageExists(imageUrl);
    }
    if (check == false) {
        imageUrl = `images/profile.jpg`;
    }
    return imageUrl;
}