import { getTopNWords } from '../utils';

function reducer_set_comments(state, action) {
    let comments = action.comments;

    let commentsFrases = '';
    for (let postComments of comments){
      for(let comment of postComments){
        commentsFrases += ` ${comment.body}`
      }
    }
    let commentsTopWords = getTopNWords(commentsFrases, 10);
  
    let wordsStatistics = [];
    for (let row of commentsTopWords.topWords){
      wordsStatistics.push({
        word: row[0],
        counter: row[1],
        pergentageOfTotal: (row[1] / commentsTopWords.totalWords) * 100
      });
    }

    return {
      ...state,
      comments,
      wordsStatistics,
    };
}

export { reducer_set_comments };
