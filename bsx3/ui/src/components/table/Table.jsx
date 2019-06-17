/* eslint-disable no-shadow */
import React from 'react';
import { Table } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import WithSelections from '../withSelections/WithSelections';
import TableAddRow from './TableAddRow';
import TableEditRow from './TableEditRow';
import TableRow from './TableRow';

import style, { getDraggableStyle, getDroppableStyle } from './styles';

import './style.css';

class SampleChanger extends React.Component {
  constructor(props) {
    super(props);
    // provided.innerRef = React.createRef();
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentWillMount() {
    // this.props.handleSelectAll(this.props.rows);
  }

  componentDidMount() {
    this.checkall.indeterminate = this.props.areAllIndeterminate(this.props.rows);
    // this.tbody.style.background = '#0097a7';
    if (this.thead.offsetHeight < this.thead.scrollHeight) {
      this.props.handleSelectAll(this.props.rows);
      // this.props.areAllSelected(true);
    }
  }

  componentDidUpdate() {
    this.checkall.indeterminate = this.props.areAllIndeterminate(this.props.rows);
  }

  onDragEnd(result) {
    const { source, destination } = result;
    if (result.destination) {
      this.props.handleReorderRow(source.index, destination.index);
    }
  }

  render() {
    const {
      handleSelect, isItemSelected, areAllSelected, handleSelectAll, selectedCount, areAnySelected
    } = this.props;

    return (
      <div style={style.wrap}>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Table className="sctable" responsive bordered>
            <caption className="flexclass">
              <div className="mr-auto" style={{ visibility: areAnySelected ? 'visible' : 'hidden' }}>
                <span style={{ marginRight: '8px' }}>
                  {selectedCount}
                  {' '}
                  {this.props.name}
                  {' '}
                  selected
                </span>
                {/* <Button basic onClick={handleClearAll}>Clear</Button> */}
              </div>
              <div>
                <span>
                  Number of
                  {' '}
                  {this.props.name}
                  {'s : '}
                  {this.props.rows.length}
                </span>
              </div>
            </caption>
            <thead className="" ref={(ref) => { this.thead = ref; }}>
              <tr>
                <th style={{ width: '70px' }}>
                  <input
                    type="checkbox"
                    id="checkall"
                    checked={areAllSelected(this.props.rows)}
                    onChange={() => handleSelectAll(this.props.rows)}
                    className="checkall"
                    ref={(ref) => { this.checkall = ref; }}
                  />
                </th>
                {/*  Conditional rendering of the Column  */}
                {Object.entries(this.props.columns).map(([key, column]) => (
                  column.display
                    ? <th style={{ width: column.size }} key={key}><input className="form-control input_th" readOnly value={column.columnName} /></th>
                    : null
                ))
               }
              </tr>
            </thead>
            <Droppable droppableId="droppabe-list" ref={(ref) => { this.Droppable = ref; }}>
              {(provided, snapshot) => (
                <tbody
                  // ref={`${(ref) => { this.tbody = ref; }} ${provided.innerRef}`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                  style={getDroppableStyle(snapshot.isDraggingOver)}
                >
                  {this.props.isAddingNewRow ? (
                    <TableAddRow
                      {...this.props}
                    />
                  ) : (
                    null
                  )}
                  {this.props.rows.map((row, index) => (
                    <Draggable
                      draggableId={`draggable-${row.id}`}
                      key={row.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <tr
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getDraggableStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          {this.props.editingRow.id === row.id ? (
                            <TableEditRow
                              key={row.id}
                              row={this.props.editingRow}
                              index={index}
                              {...this.props}
                            />
                          ) : [
                            <TableRow
                              key={row.id}
                              index={index}
                              row={row}
                              onSelectChange={() => handleSelect(row.id)}
                              checked={isItemSelected(row.id)}
                              {...this.props}
                            />
                          ]}
                          {provided.placeholder}
                        </tr>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </tbody>
              )}
            </Droppable>
          </Table>
        </DragDropContext>
      </div>
    );
  }
}
export default(WithSelections(SampleChanger));
