import React from 'react';
import { connect } from 'react-redux';

const TablePercentageOfCommentsInterface = ({ wordsStatistics }) => {
  let formatDecimal = (value) => {
    return parseFloat(Math.round(value * 100) / 100).toFixed(1);
  }
  return(
  <table className="table table-striped">
    <thead>
      <tr>
        <th>Word</th>
        <th>% of all comments</th>
      </tr>
    </thead>
    <tbody>
      {wordsStatistics.map(row =>
        <tr key={row.word}>
          <td>{row.word}</td>
          <td >{formatDecimal(row.pergentageOfTotal)}</td>
        </tr>
      )}
    </tbody>
  </table>
  )
}
const TablePercentageOfComments = connect(
  store => ({ wordsStatistics: store.user.wordsStatistics })
)(TablePercentageOfCommentsInterface);

export default TablePercentageOfComments;
