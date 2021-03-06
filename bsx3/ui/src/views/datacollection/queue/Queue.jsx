/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  Button, Nav
} from 'react-bootstrap';
import * as initialData from '../../../actions/queue.actions';
import { getDraggableStyle, getDroppableStyle } from './styles';
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
      if (result.destination) {
        this.reorderRows(source.index, destination.index);
      }
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
      <div className="queue container-fluid">
        <div className="wrapqueue">
          <div className="flexclass divConfig">
            <div className="flexclass scConfig">
              <span style={{ marginTop: '7px', marginRight: '10px', marginLeft: '10px' }}> Initial Cleaning: </span>
              <input className="checkCleanning" type="checkbox" name="cleaning" checked />
            </div>
          </div>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppabe-list">
              {(provided, snapshot) => (
                <div
                  className=""
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                  style={getDroppableStyle(snapshot.isDraggingOver)}
                >
                  {this.state.queueData.map((row, index) => (
                    <Draggable
                      draggableId={`drag-${row.key}`}
                      key={row.key}
                      index={index}
                    >
                      {(provided, snapshot) => [
                        <div
                          className=" ctext-center"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getDraggableStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <div className="list-group list-group-horizontal">
                            <span href="#" className="list-group-item ">{row.queuetype}</span>
                            <span href="#" className="list-group-item">{row.sample}</span>
                            <span href="#" className="list-group-item">next</span>
                            <span href="#" className="list-group-item"> ..</span>
                          </div>
                          {provided.placeholder}
                        </div>
                      ]}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <Nav className="cardbtnqueue justify-content-center">
            <Nav.Item className="navbtn justify-content-center">
              {btn}
            </Nav.Item>
          </Nav>
        </div>
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
