import React from 'react';

const If = ({ condition, children }) => (
  <div>
    {(condition ? <div>{children}</div> : <div></div>)}
  </div>
);

export { If }
