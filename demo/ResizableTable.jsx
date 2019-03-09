import React from 'react';
import Table from './Table'
import createColResizable from '../lib';
import '../assets/index.css';

export default class ResizableTable extends React.PureComponent {
  componentDidMount() {
    const domElemTableList = document.querySelectorAll('.table');
    createColResizable(domElemTableList[0], {
      liveDrag: true
    });
    createColResizable(domElemTableList[1], {
      liveDrag: false,
      headerOnly: false
    });
    createColResizable(domElemTableList[2], {
      liveDrag: false,
      headerOnly: false
    });
  }

  render() {
    return(
      <div>
        <h4>liveDrag: true</h4>
        <Table />
        <h4>liveDrag: false</h4>
        <Table />
        <h4>other</h4>
        <div style={{ width: 500, overflow: 'auto' }}>
          <Table />
        </div>
      </div>
    )
  }
}