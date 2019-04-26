/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import ListFormEditable from './EditRowForm';
import ListForm from './RowList';
import ListFormAdding from './AddRowForm';
import styles, { getDraggableStyle, getDroppableStyle } from './styles';

class SampleChanger extends React.Component {
  constructor(props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    const { source, destination } = result;
    if (result.destination) {
      this.props.handleReorderRow(source.index, destination.index);
    }
  }

  render() {
    return (
      <div style={styles.wrap}>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Table className="gridtable" responsive hover style={styles.table}>
            <thead className="thead">
              <tr>
                <th>
                  <Button
                    className=" btn-success btnadd"
                    style={{ fontWeight: 'bold' }}
                    onClick={() => {
                      this.props.handleIsAddingNewRow(true);
                    }}
                    title="Create new row"
                  >
                    New
                  </Button>
                </th>
                <th>samplename</th>
                <th>concentration</th>
                <th>plate</th>
                <th>row</th>
                <th>column</th>
                <th>frame</th>
                <th>exposuretime</th>
                <th>attenuation</th>
                <th>buffer</th>
                <th>flow</th>
                <th>Temp</th>
              </tr>
            </thead>
            <Droppable droppableId="droppabe-list">
              {(provided, snapshot) => (
                <tbody
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                  style={getDroppableStyle(snapshot.isDraggingOver)}
                >
                  {this.props.rows.map((row, index) => [
                    <Draggable
                      draggableId={`draggable-${row.id}`}
                      key={row.id}
                      index={index}
                    >
                      {(provided, snapshot) => [
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
                            <ListFormEditable
                              row={this.props.editingRow}
                              handleEditRow={this.props.handleEditRow}
                              handleCancelEditRow={this.props.handleCancelEditRow}
                            />
                          ) : [
                            <ListForm
                              index={index}
                              row={row}
                              handleDeleteRow={this.props.handleDeleteRow}
                              handleSelectEditRow={this.props.handleSelectEditRow}
                              handleRowCompletion={this.props.handleRowCompletion}
                            />
                          ]}
                          {provided.placeholder}
                        </tr>
                      ]}
                    </Draggable>
                  ])}
                  {this.props.isAddingNewRow ? (
                    <ListFormAdding
                      row={this.props.addingRow}
                      handleAddRow={this.props.handleAddRow}
                      handleIsAddingNewRow={this.props.handleIsAddingNewRow}
                    />
                  ) : (
                    null
                  )}
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

SampleChanger.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.string).isRequired,
  isAddingNewRow: PropTypes.bool.isRequired,
  editingRow: PropTypes.shape({
    id: PropTypes.number,
    samplename: PropTypes.string,
    concentration: PropTypes.string,
    plate: PropTypes.string,
    row: PropTypes.string,
    column: PropTypes.string,
    frame: PropTypes.string,
    exposuretime: PropTypes.string,
    attenuation: PropTypes.string,
    buffer: PropTypes.string,
    flow: PropTypes.string,
    temp: PropTypes.string,
  }),
  addingRow: PropTypes.shape({
    // id: PropTypes.number,
    samplename: PropTypes.string,
    concentration: PropTypes.string,
    plate: PropTypes.string,
    row: PropTypes.string,
    column: PropTypes.string,
    frame: PropTypes.string,
    exposuretime: PropTypes.string,
    attenuation: PropTypes.string,
    buffer: PropTypes.string,
    flow: PropTypes.string,
    temp: PropTypes.string,
  }),
  className: PropTypes.string.isRequired,
  handleAddRow: PropTypes.func.isRequired,
  handleCancelEditRow: PropTypes.func.isRequired,
  handleDeleteRow: PropTypes.func.isRequired,
  handleEditRow: PropTypes.func.isRequired,
  handleRowCompletion: PropTypes.func.isRequired,
  handleSelectEditRow: PropTypes.func.isRequired,
  handleReorderRow: PropTypes.func.isRequired,
  handleIsAddingNewRow: PropTypes.func.isRequired,
};

SampleChanger.defaultProps = {
  editingRow: {},
  addingRow: {},
};

export default(SampleChanger);
