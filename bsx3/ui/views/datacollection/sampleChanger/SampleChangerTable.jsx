/* eslint-disable no-shadow */
import React from 'react';
import withSelections from 'react-item-select';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Menu, Item, contextMenu } from 'react-contexify';
import { Button, Table } from 'react-bootstrap';
import { Label } from 'react-bootstrap/Form';
import ColumnChooser from './tableColumnChooser/ColumnChooser';
import EditRowForm from './tableEditRow/EditRowForm';
import RowList from './tableRows/RowList';
import AddRowForm from './tableAddRow/AddRowForm';
import styles, { getDraggableStyle, getDroppableStyle } from './styles';


class SampleChanger extends React.Component {
  constructor(props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onDuplicate = this.onDuplicate.bind(this);
    this.MyMenu = this.MyMenu.bind(this);
  }

  componentDidMount() {
    this.checkall.indeterminate = this.props.areAllIndeterminate(this.props.rows);
    this.props.areAllSelected(true);
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
    const {
      handleSelect, isItemSelected, areAllSelected, handleSelectAll
    } = this.props;
    return (
      <div className="table-wrap" style={styles.wrap}>
        <div className="panel-heading">
          <input className="form-control input_queue-name mr-auto" placeholder="Queue Name " name="samplename" type="text" />
          <div className="">
            <Label className="btn columnCh" title="Choose Column to display">
              <ColumnChooser />
            </Label>
            <Button variant="contained" title="Add Table data to Queue" className="btnaddqueue">
                Add to Queue
              <i className="fa fa-share-square" style={{ marginLeft: '5px' }} />
            </Button>
          </div>
        </div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Table className="sctable " bordered size="sm" style={styles.table}>
            <thead className="">
              <tr>
                {this.props.columns.map(comlumn => (
                  comlumn.columnNames.map(name => [
                    <>
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
                        <input
                          type="checkbox"
                          id="checkall"
                          checked={areAllSelected(this.props.rows)}
                          onChange={() => handleSelectAll(this.props.rows)}
                          className="checkall"
                          ref={(ref) => { this.checkall = ref; }}
                        />
                        { <this.MyMenu /> }
                      </th>
                      <th data-sortable="true">{name.id}</th>
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
                      <th style={{ display: '' }}>Attenuation %</th>
                      <th>
                        <i className="fa fa-cog" />
                      </th>
                    </>
                  ])
                ))}
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
                      rows={this.props.defaultRow}
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
                              handleShowNotification={this.props.handleShowNotification}
                            />
                          ) : [
                            <RowList
                              key={row.id}
                              index={index}
                              row={row}
                              handleDeleteRow={this.props.handleDeleteRow}
                              handleSelectEditRow={this.props.handleSelectEditRow}
                              checked={isItemSelected(row.id)}
                              onSelectChange={() => handleSelect(row.id)}
                              handleShowNotification={this.props.handleShowNotification}
                              showNotification={this.props.showNotification}
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


export default(withSelections(SampleChanger));
