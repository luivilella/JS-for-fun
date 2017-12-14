import { takeLatest } from 'redux-saga/effects';
import { searchUser } from './user';
import { getPosts } from './post';
import { getComments } from './comments';

function* sagas() {
  yield takeLatest('SEARCH_USER', searchUser);
  yield takeLatest('SET_USER', getPosts);
  yield takeLatest('SET_POSTS', getComments);
}

export default sagas;
