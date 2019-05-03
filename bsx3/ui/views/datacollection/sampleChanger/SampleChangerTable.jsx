/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Menu, Item, contextMenu } from 'react-contexify';
import { Button, Table } from 'react-bootstrap';
import EditRowForm from './EditRowForm';
import RowList from './RowList';
import AddRowForm from './AddRowForm';
import styles, { getDraggableStyle, getDroppableStyle } from './styles';


class SampleChanger extends React.Component {
  constructor(props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onDuplicate = this.onDuplicate.bind(this);
    this.MyMenu = this.MyMenu.bind(this);
  }

  onDragEnd(result) {
    const { source, destination } = result;
    if (result.destination) {
      this.props.handleReorderRow(source.index, destination.index);
    }
  }

  onDuplicate(result) {
    const { source, destination } = result;
    if (result.destination) {
      this.props.handleReorderRow(source.index, destination.index);
    }
  }

  MyMenu() {
    return (
      <Menu id="menu_id">
        <Item onClick={this.onDuplicate}>Duplicate Me</Item>
      </Menu>
    );
  }

  handlContextMenu(e, rowid) {
    e.preventDefault();
    alert(`Filter wull be there${e}`);
    contextMenu.show({
      id: 'menu_id',
      event: e,
      props: {
        msg: 'hello',
        id: rowid
      }
    });
  }

  render() {
    return (
      <div className="table-wrap" style={styles.wrap}>
        <div className="panel-heading">
          <input className="form-control input_queue-name mr-auto" placeholder="Queue Name " name="samplename" type="text" />
          <div className="">
            <Button variant="contained" className="btnaddqueue" align="right">
                      Add to Queue
              <i className="fa fa-share-square" style={{ marginLeft: '10px' }} />
            </Button>
          </div>
        </div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Table className="sctable table" size="sm" style={styles.table}>
            <thead className="">
              <tr>
                <th style={{}}>
                  {/* <Button
                    className=" btn-success btnadd"
                    style={{ fontWeight: 'bold' }}
                    onClick={() => {
                      this.props.handleIsAddingNewRow(true);
                    }}
                    title="Create new row"
                  >
                    New
                  </Button> */}
                  <div className="flexclass">
                    <input
                      type="checkbox"
                      className="check-icon"
                    />
                  </div>
                  { <this.MyMenu /> }
                </th>
                <th data-sortable="true">Sample Name</th>
                <th>Buffer</th>
                <th>Plate</th>
                <th>Row</th>
                <th>Column</th>
                <th>Flow</th>
                <th>Energy</th>
                <th>volume (ul)</th>
                <th>SEU Temp.</th>
                <th>Storage Temp.</th>
                <th style={{ display: '' }} onClick={this.handlContextMenu}>Concentration</th>
                <th>No. Frames</th>
                <th>Exp. Time (ms)</th>
                <th>Attenuation %</th>
                <th />
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
                  {this.props.isAddingNewRow ? (
                    <AddRowForm
                      row={this.props.addingRow}
                      handleAddRow={this.props.handleAddRow}
                      handleIsAddingNewRow={this.props.handleIsAddingNewRow}
                    />
                  ) : (
                    null
                  )}
                  {this.props.rows.map((row, index) => [
                    <Draggable
                      draggableId={`draggable-${row.id}`}
                      key={row.id}
                      index={index}
                    >
                      {(provided, snapshot) => [
                        <tr
                          onContextMenu={this.handlContextMenu}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getDraggableStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          {this.props.editingRow.id === row.id ? (
                            <EditRowForm
                              key={row.id}
                              row={this.props.editingRow}
                              handleEditRow={this.props.handleEditRow}
                              handleCancelEditRow={this.props.handleCancelEditRow}
                            />
                          ) : [
                            <RowList
                              key={row.id}
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
    flow: PropTypes.bool,
    temp: PropTypes.string,
    is_select: PropTypes.bool,
  }),
  addingRow: PropTypes.shape({
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
    flow: PropTypes.bool,
    temp: PropTypes.string,
    is_select: PropTypes.bool,
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
