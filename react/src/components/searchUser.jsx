import React from 'react';
import { connect } from 'react-redux';
import { If, getTopNWords } from './utils';

const SearchUserInterface = ({
  onSearchUser,
  userNotFound,
  searchingUser
}) => {
  let input = 'Leanne Graham';
  return (
    <div>
        <form
        onSubmit={e => {
            e.preventDefault();
            if (!input.value.trim()) {
            return;
            }
            onSearchUser(input.value)
        }}
        >
        <input ref={node => { input = node; }} defaultValue={input}/>
        <button type="submit">
            Search
        </button>
        <If condition={userNotFound}>
            User not found
        </If>
        <If condition={searchingUser}>
            Searching user
        </If>
        </form>
    </div>
  )
};

const SearchUser = connect(
  store => ({
    userNotFound: store.searchUser.userNotFound,
    searchingUser: store.searchUser.searchingUser
  }),
  dispatch => ({
    onSearchUser: name => {
      dispatch({type: 'SEARCH_USER', name});
    },
  })
)(SearchUserInterface);

export default SearchUser;
