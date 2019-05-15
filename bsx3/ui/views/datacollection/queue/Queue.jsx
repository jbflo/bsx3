/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  Button, Nav
} from 'react-bootstrap';
import * as initialData from './queue-api';
import { getDraggableStyle, getDroppableStyle } from './styles';
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
      <>
        <h3>Queue</h3>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppabe-list">
            {(provided, snapshot) => (
              <div
                className="row"
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
                        className=" text-center"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getDraggableStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <div className="list-group list-group-horizontal">
                          <span href="#" className="list-group-item active">{row.queuetype}</span>
                          <span href="#" className="list-group-item">{row.sample}</span>
                          <span href="#" className="list-group-item">next</span>
                          <span href="#" className="list-group-item"> ..</span>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <Nav className="cardbtnqueue justify-content-center">
          <Nav.Item className="navbtn justify-content-center">
            {btn}
          </Nav.Item>
        </Nav>
      </>
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
