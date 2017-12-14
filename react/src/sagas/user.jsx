import { call, put } from 'redux-saga/effects';
import { serviceGetUserByName } from '../services';
  
function* searchUser(action) {
  try {
    yield put({type: 'SEARCHING_NEW_USER'});
    yield put({type: 'START_SEARCH'});
    const user = yield call(serviceGetUserByName, action.name);
    yield put({type: 'STOP_SEARCH'});
    if (user){
      yield put({type: 'SET_USER', user});  
    }else{
      yield put({type: 'USER_NOT_FOUND'});
    }
  } catch (e) {
    yield put({type: 'STOP_SEARCH'});
    yield put({type: 'REQUEST_ERROR'});
  }
}

export { searchUser }
