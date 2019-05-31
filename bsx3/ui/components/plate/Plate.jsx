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
    for (let col = 0; col < 12; col += 1) {
      const cols = [];
      for (let row = 0; row < 8; row += 1) {
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
    return (
      <div className="plate">
        <section className="colHeader" style={{ marginBottom: '20PX' }}>
          {
            grid.map((col, i) => [
              <span
                key={`${col}`}
                className="colheader"
              >
                {i + 1}
              </span>
            ])
        }
        </section>
        <div className="flexclass">
          <ul className="list-group list-group-flush rowul">
            {
              grid[1].map((row, i) => [
                <li className="rowlist" key={row}>
                  <span
                    key={`${row}`}
                    className="rowheader"
                  >
                    {rowTitle[i]}
                  </span>
                </li>
              ])
          }
          </ul>
          <section className="grid flexclass" style={{ gridTemplateColumns: `${grid.length} '1fr'`, gridTemplateRows: `${grid.length} '1fr'` }}>
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
          </section>
        </div>
      </div>
    );
  }
}
export default SampleChanger;
