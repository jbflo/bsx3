/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  MdEdit, MdDeleteSweep,
  // MdCancel, MdSave
} from 'react-icons/md';
import {
  Button, Nav
} from 'react-bootstrap';
import * as initialData from './queue-api';
import styles, { getDraggableStyle, getDroppableStyle } from './styles';
// import QueueProgress from './QueueProgress';
// import queueData from './queue-api';
import './queue.css';

class Queue extends React.PureComponent {
    state = initialData;

    reorderRows = (startIndex, endIndex) => {
      this.setState((state) => {
        const rows = Array.from(state.queueData);
        const [removed] = rows.splice(startIndex, 1);
        rows.splice(endIndex, 0, removed);
        return { rows };
      });
    }

    onDragEnd = (result) => {
      const { source, destination } = result;
      if (!destination) return;
      this.reorderRows(source.index, destination.index);
    };

  deleteQueue = queue => () => {
    if (queue.state === 'running') {
      alert('Cant not delete this Queue: it is Running !)'); // eslint-disable-line no-alert
      return;
    }

    this.setState((state) => {
      const queueDataState = [...state.queueData];
      const queueuToDelete = queueDataState.indexOf(queue);
      if (queueuToDelete !== -1) {
        queueDataState.splice(queueuToDelete, 1);
      }
      return { queueDataState };
    });
  };

  startQueue() {
    if (this.props.onSave !== undefined) {
      this.props.onSave(this.props.pkey, 'in');
    }
  }


  stopQueue() {
    if (this.props.onSave !== undefined) {
      this.props.onSave(this.props.pkey, 'out');
    }
  }

  render() {
    // const { queueDataState } = this.state;

    // let colorS = '#e4980c';
    // // eslint-disable-next-line array-callback-return
    // queueDataState.map((_queu) => {
    //   if (_queu.queuetype === 'HPLC') {
    //     colorS = '#00695c';
    //   } else if (_queu.queuetype === 'SC') {
    //     colorS = '#e4980c';
    //   }
    // });

    let btn = <Button className="btnqs btn-success" disabled>No State yet---</Button>;
    if (this.props.data.state === 'stop') {
      btn = <Button title="Start Queue" className="btnqs" onClick={this.sartQueue}>{this.props.startText}</Button>;
    } else if (this.props.data.state === 'start') {
      btn = <Button className="btnqd" onClick={this.stopQueue}>{this.props.stopText}</Button>;
    }

    return (
      <div style={styles.wrap}>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppabe-list">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getDroppableStyle(snapshot.isDraggingOver)}
              >
                {this.state.queueData.map((row, index) => (
                  <Draggable
                    draggableId={`draggable-${row.key}`}
                    key={row.key}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        className="flexclass"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getDraggableStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <div className="flexclass">
                          <div className="flexclass">
                            <MdEdit
                              className="edit-icon md-icon"
                              // onClick={onExecute}
                            />
                          </div>
                          <div className="flexclass">
                            <MdDeleteSweep
                              className="md-icon del-icon"
                              color="dander"
                              onClick={() => {
                                // eslint-disable-next-line
                                if (window.confirm('Are you sure you want to delete this row?')) {
                                  this.deleteQueue();
                                }
                              }}
                              title="Delete row"
                            />
                          </div>
                          <div className="flexclass">
                            <span>
                              {' '}
                              {row.queuetype}
                              {' '}
                            </span>
                          </div>
                          <div className="flexclass">
                            <span>
                              {' '}
                              {row.sample}
                              {' '}
                            </span>
                          </div>

                        </div>
                        <hr style={{ padding: '0px' }} />
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <Nav className="cardbtnqueue justify-content-center">
          <Nav.Item>
            {btn}
          </Nav.Item>
        </Nav>
      </div>
    );
  }
}

Queue.defaultProps = {
  classes: PropTypes.object.isRequired,
  startText: 'Start Queue',
  stopText: 'Stop Queue',
  labelText: '',
  pkey: undefined,
  onSave: undefined,
  data: { value: 'undefined', state: 'START', msg: 'UNKNOWN' }
};


function mapStateToProps(state) {
  return {
    queue: state.queue,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Queue);
