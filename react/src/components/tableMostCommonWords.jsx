import React from 'react';
import { connect } from 'react-redux';

const TableMostCommonWordsInterface = ({ wordsStatistics }) => (
  <table className="table words">
    <tbody>
    {wordsStatistics.map(row =>
      <tr key={row.word}>
      <td className="td-words">{row.word}</td>
      <td className="td-numbers">
        <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={Object.assign({}, {width: (row.counter * 5)})}
        >{row.counter}</div>
        </div>
      </td>
      </tr>
    )}
    </tbody>
  </table>
)
const TableMostCommonWords = connect(
  store => ({ wordsStatistics: store.user.wordsStatistics })
)(TableMostCommonWordsInterface);

export default TableMostCommonWords;
