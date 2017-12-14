import { combineReducers } from 'redux';
import { reducer_set_comments } from './comments';

const userInitialState = {
  user: undefined,
  posts: [],
  comments: [],
  wordsStatistics: [],
};

const user = (state = userInitialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...userInitialState,
        user: action.user
      };
    case 'SET_POSTS':
      return {
        ...state,
        posts: action.posts
      };
    case 'SET_COMMENTS':
      return reducer_set_comments(state, action);
    default:
      return state;
  }
};

const searchUserInitialState = {
  userNotFound: false,
  searchingUser: false,
};

const searchUser = (state = searchUserInitialState, action) => {
  switch (action.type) {
    case 'USER_NOT_FOUND':
      return {
        ...state,
        userNotFound: true
      };
    case 'START_SEARCH':
      return {
        ...state,
        searchingUser: true
      };
    case 'STOP_SEARCH':
      return {
        ...state,
        searchingUser: false
      };
    case 'SEARCHING_NEW_USER':
      return {
        ...searchUserInitialState,
      };
    default:
      return state;
  }
};

const AppReducer = combineReducers({
  user,
  searchUser,
});

export { AppReducer };
