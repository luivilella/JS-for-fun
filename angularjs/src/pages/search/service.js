class Service {
  constructor($http, $httpParamSerializer, $q) {
    this.$http = $http;
    this.$httpParamSerializer = $httpParamSerializer;
    this.$q = $q;
  }
  
  URL(url, params=null){
    let _params = this.$httpParamSerializer(params);
    if (_params){
        return `${url}?${_params}`;
    }
    return url;
  }
  
  getUser(name){
    return this.$http.get(this.URL(
      'https://jsonplaceholder.typicode.com/users', {name: name}
    ))
      .then(response => {
        if(response.data){
          return response.data[0];
        }
        return null;
      });
  }
  
  getPosts(userId){
    return this.$http.get(this.URL(
      'https://jsonplaceholder.typicode.com/posts', {userId: userId}
    ))
      .then(response => {
        return response.data;
      });
  }
  
  getPostComments(postId){
    return this.$http.get(this.URL(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    ))
      .then(response => {
        return response.data;
      });
  }
  
  getCommentsMultiplePosts(postsIds){
    let promissesList = [];
    for (let postId of postsIds){
      promissesList.push(this.getPostComments(postId));
    }
    return this.$q.all(promissesList)
      .then(data => data);
  }
  
}

export default (app) => {
  app.service('SearchService', Service);
};
