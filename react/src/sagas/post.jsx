import { call, put } from 'redux-saga/effects';
import { serviceGetPosts } from '../services';
  

function* getPosts(action) {
  try {
    const posts = yield call(serviceGetPosts, action.user.id);
      yield put({type: 'SET_POSTS', posts});
  } catch (e) {
    yield put({type: 'REQUEST_ERROR'});
  }
}

export { getPosts }
