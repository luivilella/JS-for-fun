import template from './template.html';
import getTopNWords from '../../utils/top-words';

let conf = ($stateProvider) => {
  $stateProvider.state('search', {
    url: '/',
    controller: PageController,
    controllerAs: '$ctrl',
    template: template,
    resolve: toResolve
  });
};

let toResolve = {
};

class PageController {

    constructor(SearchService) {
      this.SearchService = SearchService;
      this.userSearch = 'Leanne Graham';
      this.cleanState();
    }

    cleanState(){
      this.user = {
        info: undefined,
        posts: [],
        comments: [],
      };
      this.userNotFound = false;
      this.userSearching = false;
      this.wordsStatistics = [];
    }

    searchUser(){
      this.cleanState();
      this.getUser(this.userSearch);
    }

    getUser(name){
      this.userSearching = true;
      this.SearchService.getUser(name)
        .then(user => {
          this.userSearching = false;
          if (!user){
            this.userNotFound = true;
          }else{
            this.userNotFound = false;
          }
          this.user.info = user;
          this.getPosts(user);
        });
    }

    getPosts(user){
      if (!user){
        return;
      }
      this.SearchService.getPosts(user.id)
        .then(posts => {
          this.user.posts = posts;
          this.getComments(posts);
        });
    }

    getComments(posts){
      if (!posts.length){
        return;
      }

      let postsIds = [];
      for (let post of posts){
        postsIds.push(post.id);
      }
      this.SearchService.getCommentsMultiplePosts(postsIds)
        .then(comments => {
          this.user.comments = comments;
          this.generateWordsStatistics(comments);
        });
    }

    generateWordsStatistics(comments){
      let commentsFrases = '';
      for (let postComments of comments){
        for(let comment of postComments){
          commentsFrases += ` ${comment.body}`;
        }
      }
      let commentsTopWords = getTopNWords(commentsFrases, 10);

      this.wordsStatistics = [];

      for (let row of commentsTopWords.topWords){
        this.wordsStatistics.push({
          word: row[0],
          counter: row[1],
          pergentageOfTotal: (row[1] / commentsTopWords.totalWords) * 100
        });
      }
    }

}

export default (app) => {
  app.config(conf);
};
