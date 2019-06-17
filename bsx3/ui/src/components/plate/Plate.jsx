/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
import React from 'react';
// import style from './style';

import './style.css';

class SampleChanger extends React.Component {
  constructor(props) {
    super(props);
    const grid = [];
    const rowTitle = this.props.grid.RowHeader;
    for (let col = 1; col <= this.props.grid.col; col += 1) {
      const cols = [];
      for (let row = 1; row <= this.props.grid.row; row += 1) {
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
    const cols = grid.map(col => col);
    const rows = grid[1].map(row => row);
    return (
      <div className="plate">
        <div className="colHeader" style={{ gridTemplateColumns: `repeat(${cols.length}, 1fr)` }}>
          {
            grid.map((col, i) => (
              <div
                key={`${col}`}
                className={`colList
                ${
                  this.props.grid.type === 'Block' && i > 7
                    ? 'cellRounded' : ''
                }
                `}
              >
                {i + 1}
              </div>
            ))
        }
        </div>
        <div className="flexclass">
          <div className="rowHeader" style={{ gridTemplateRows: `repeat(${rows.length}, 100)` }}>
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
          <div className="grid" style={{ gridTemplateColumns: `repeat(${cols.length}, 1fr)`, gridTemplateRows: `repeat(${rows.length}, 1fr)` }}>
            {
              grid.map(col => [
                col.map(cell => [
                  <div
                    style={{ width: this.props.grid.width, height: this.props.grid.heigh }}
                    key={`${cell.row} ${cell.col}`}
                    className={`cell
                    ${
                      this.props.grid.type === 'square'
                        ? 'cellSquare' : ''
                    }
                    ${
                      this.props.grid.type === 'Round'
                        ? ' cellSquare cellRounded ' : ''
                    }
                    ${
                      this.props.grid.type === 'Block'
                        ? ' cellSquare ' : ''
                    }
                    `}
                  />
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
