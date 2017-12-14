import axios from 'axios';

var instance = axios.create({
  headers: {'Content-Type': 'application/json'},
});

function serviceGetComments(postId) {
  let url = `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  return instance.get(url).then(response => response.data);
}

const serviceGetCommentsMultiplePosts = (postsIds) => {
  let promissesList = [];
  for (let postId of postsIds){
    promissesList.push(serviceGetComments(postId));
  }
  return axios.all(promissesList).then(data => {
    return data;
  });
}

export { serviceGetComments, serviceGetCommentsMultiplePosts };
