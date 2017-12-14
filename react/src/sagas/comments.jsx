import { call, put } from 'redux-saga/effects';
import { serviceGetPosts, serviceGetCommentsMultiplePosts } from '../services';

function* getComments(action) {
  let posts = action.posts;
  if (!posts.length){
    return;
  }
  let postsIds = [];
  for (let post of posts){
    postsIds.push(post.id);
  }
  
  try {
    const comments = yield call(serviceGetCommentsMultiplePosts, postsIds);
    yield put({type: 'SET_COMMENTS', comments});
  } catch (e) {
    yield put({type: 'REQUEST_ERROR'});
  }
}

export { getComments }
