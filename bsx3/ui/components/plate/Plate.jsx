/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
import React from 'react';
// import style from './style';

import './style.css';

class SampleChanger extends React.Component {
  constructor(props) {
    super(props);
    const grid = [];
    const rowTitle = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    for (let col = 0; col < this.props.plateColumns; col += 1) {
      const cols = [];
      for (let row = 0; row < this.props.plateRows; row += 1) {
        cols.push({
          col,
          row
        });
      }
      grid.push(cols);
    }
    this.state = {
      grid,
      rowTitle,
    };
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentDidUpdate() {

  }

  render() {
    const { grid, rowTitle } = this.state;
    const col = grid.map(col => col);
    const row = grid[1].map(row => row);
    return (
      <div className="plate">
        <div className="colHeader" style={{ gridTemplateColumns: `repeat(${col.length}, 1fr)` }}>
          {
            grid.map((col, i) => (
              <div
                key={`${col}`}
                className="colList"
              >
                {i + 1}
              </div>
            ))
        }
        </div>
        <div className="flexclass">
          <div className="rowHeader" style={{ gridTemplateRows: `repeat(${row.length}, 100)` }}>
            {
              grid[1].map((row, i) => (
                <span
                  key={`${row}`}
                  className="rowlist"
                >
                  {rowTitle[i]}
                </span>
              ))
          }
          </div>
          <div className="grid" style={{ gridTemplateColumns: `repeat(${col.length}, 1fr)`, gridTemplateRows: `repeat(${row.length}, 1fr)` }}>
            {
              grid.map(col => [
                col.map(cell => [
                  <div
                    key={`${cell.row} ${cell.col}`}
                    className="cell"
                  />,
                ])
              ])
          }
          </div>
        </div>
      </div>
    );
  }
}
export default SampleChanger;
