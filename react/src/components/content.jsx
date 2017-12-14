import React from 'react';
import { connect } from 'react-redux';
import { If } from './utils';
import Posts from './posts';
import TablePercentageOfComments from './tablePercentageOfComments';
import TableMostCommonWords from './tableMostCommonWords';

const ContentInterface = ({ showWordsStatistics }) => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-6 left-fixed-height">
        <Posts />
      </div>
      <div className="col-md-6" >
        <If condition={showWordsStatistics}>
          <TablePercentageOfComments />
          <h2>Count of Top 10 Words</h2>
          <TableMostCommonWords />
        </If>
      </div>
    </div>
  </div>
)
const Content = connect(
  store => ({
    showWordsStatistics: store.user.wordsStatistics.length > 0
  })
)(ContentInterface);

export default Content;
