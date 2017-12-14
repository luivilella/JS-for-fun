import React from 'react';
import { connect } from 'react-redux';

const PostsInterface = ({ posts }) => (
  <ul className="list-group" >
    {posts.map(post =>
      <li key={post.id} className="list-group-item">
        <h4>{post.title}</h4>
        <p>{post.body}</p>
      </li>
    )}
  </ul>
);
const Posts = connect(
  store => ({ posts: store.user.posts })
)(PostsInterface);

export default Posts;
