import axios from 'axios';

var instance = axios.create({
  headers: {'Content-Type': 'application/json'},
});

function serviceGetPosts(userId) {
  let url = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
  return instance.get(url).then(response => response.data);
}

export { serviceGetPosts }
