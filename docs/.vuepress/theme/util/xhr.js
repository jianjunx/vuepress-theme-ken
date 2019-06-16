export const getGithubUser = (url = 'jaykenxie') => {
  return new Promise((resolve, reject) => {
    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function() {
      if (this.readyState === 4) {
        resolve(this.responseText);
      }
      reject({});
    });

    xhr.open('GET', `https://api.github.com/users/${url}`);

    xhr.send(data);
  });
};
