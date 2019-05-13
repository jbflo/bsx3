/* eslint-disable no-shadow */
import React from 'react';
import withSelections from 'react-item-select';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Menu, Item, contextMenu } from 'react-contexify';
import { Button, Table } from 'react-bootstrap';
// import { Label } from 'react-bootstrap/Form';
import ColumnChooser from './tableColumnChooser/ColumnChooser';
import EditRowForm from './tableEditRow/EditRowForm';
import RowList from './tableRows/RowList';
import AddRowForm from './tableAddRow/AddRowForm';
import { getDraggableStyle, getDroppableStyle } from './styles';


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
      <>
        <div className="panel-heading">
          <input className="form-control input_queue-name mr-auto" placeholder="Queue Name " name="samplename" type="text" />
          <div className="flexclass">
            <div className="" title="Choose Column to display">
              <ColumnChooser {...this.props} />
            </div>
            <div>
              <Button variant="contained" title="Add Table data to Queue" className="btnaddqueue">
                  Add to Queue
                <i className="fa fa-share-square" style={{ marginLeft: '5px' }} />
              </Button>
            </div>
          </div>
        </div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Table className="sctable" responsive>
            <thead className="">
              <tr>
                <th>
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
                  <div style={{ width: '100px' }}>
                    <input
                      type="checkbox"
                      id="checkall"
                      checked={areAllSelected(this.props.rows)}
                      onChange={() => handleSelectAll(this.props.rows)}
                      className="checkall"
                      ref={(ref) => { this.checkall = ref; }}
                    />
                  </div>
                  { <this.MyMenu /> }
                </th>
                {/*  Conditional rendering of the Column  */}
                {this.props.columns.samplename.display
                  ? <th><input className="form-control input_form" readOnly value={this.props.columns.samplename.name} /></th>
                  : null
                }
                {this.props.columns.buffer.display
                  ? <th><input className="form-control input_form" readOnly value={this.props.columns.buffer.name} /></th>
                  : null
                }
                {this.props.columns.plate.display
                  ? <th><input className="form-control input_form" readOnly value={this.props.columns.plate.name} /></th>
                  : null
                }
                {this.props.columns.row.display
                  ? <th><input className="form-control input_form" readOnly value={this.props.columns.row.name} /></th>
                  : null
                }
                {this.props.columns.column.display
                  ? <th><input className="form-control input_form" readOnly value={this.props.columns.column.name} /></th>
                  : null
                }
                {this.props.columns.flow.display
                  ? <th><input className="form-control input_form" readOnly value={this.props.columns.flow.name} /></th>
                  : null
                }
                {this.props.columns.energy.display
                  ? <th><input className="form-control input_form" readOnly value={this.props.columns.energy.name} /></th>
                  : null
                }
                {this.props.columns.volume.display
                  ? <th><input className="form-control input_form" readOnly value={this.props.columns.volume.name} /></th>
                  : null
                }
                {this.props.columns.seutemp.display
                  ? <th><input className="form-control input_form" readOnly value={this.props.columns.seutemp.name} /></th>
                  : null
                }
                {this.props.columns.stemp.display
                  ? <th><input className="form-control input_form" readOnly value={this.props.columns.stemp.name} /></th>
                  : null
                }
                {this.props.columns.concentration.display
                  ? <th><input className="form-control input_form" readOnly value={this.props.columns.concentration.name} /></th>
                  : null
                }
                {this.props.columns.frame.display
                  ? <th><input className="form-control input_form" readOnly value={this.props.columns.frame.name} /></th>
                  : null
                }
                {this.props.columns.exposuretime.display
                  ? <th><input className="form-control input_form" readOnly value={this.props.columns.exposuretime.name} /></th>
                  : null
                }
                {this.props.columns.attenuation.display
                  ? <th><input className="form-control input_form" readOnly value={this.props.columns.attenuation.name} /></th>
                  : null
                }
                {this.props.columns.tools.display
                  ? (
                    <th>
                      <div style={{ width: '50px' }}>
                        <i className="fa fa-cog" />
                      </div>
                    </th>
                  )
                  : null
                }
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
                      {...this.props}
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
                              {...this.props}
                            />
                          ) : [
                            <RowList
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
                      ]}
                    </Draggable>
                  ])}
                  {provided.placeholder}
                </tbody>
              )}
            </Droppable>
          </Table>
        </DragDropContext>
      </>
    );
  }
}
export default(withSelections(SampleChanger));
