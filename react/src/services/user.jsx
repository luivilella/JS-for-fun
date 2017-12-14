import axios from 'axios';

var instance = axios.create({
  headers: {'Content-Type': 'application/json'},
});

function serviceGetUserByName(name) {
  let url = `https://jsonplaceholder.typicode.com/users?name=${name}`;
  return instance.get(url).then(response => {
    let user = response.data;
      if(user){
        return user[0];
      }
      return null;
  });
}

export {serviceGetUserByName}
