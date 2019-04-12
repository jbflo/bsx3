/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import GridListTileBar from '@material-ui/core/GridListTileBar';
import {
  Card, Button, Nav
} from 'react-bootstrap';
// import {
//   MdDeleteSweep
// } from 'react-icons/md';

// import QueueProgress from './QueueProgress';
// import queueData from './queue-api';
import './queue.css';


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    height: 660,
    marginTop: 20,
    // backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 550,
    height: 500,
    padding: 0,
    margin: 0,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  gridListAuto: {
    width: 550,
    padding: 0,
    margin: 0,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  // Apply different Background color to Queue Types and Samples
  hplc: {
    background: '#e4980c',
  },
  sc: {
    background: '#00bfa5',
  },
  gridListItem: {
    height: 60,
    padding: 0,
    margin: 0,
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, '
      + 'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  },
};

/**
 * The example data is structured as follows:
 *
 * [etc...]
 *
 * const queueData = [
 *   {
 *    queuetype: 'HPLC',
 *    sample: 'sample',
 *    state: 'running',
 *    control: 'hidden',
 *    cols: 2,
 *    featured: true,
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
// using some little inline style helpers to make the app look okay
const getItems = count => Array.from({ length: count }, (v, k) => k).map(k => ({
  id: `item-${k}`,
  content: `item ${k}`
}));

const grid = 8;
const getItemStyle = (draggableStyle, isDragging) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  marginBottom: grid,

  // change background colour if dragging(드래깅시 배경색 변경)
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables(드래그에 필요한 스타일 적용)
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250
});

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

class Queue extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      queueDataState: getItems(10),
    };

    this.startQueue = this.startQueue.bind(this);
    this.stopQueue = this.stopQueue.bind(this);
    this.deleteQueue = this.deleteQueue.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
  // dropped outside the list
    if (!result.destination) {
      return;
    }
    const queueDataState = reorder(
      this.state.queueDataState,
      result.source.index,
      result.destination.index
    );

    this.setState({
      queueDataState
    });
  }

  deleteQueue = queue => () => {
    if (queue.state === 'running') {
      alert('Cant not delete this Queue: it is Running !)'); // eslint-disable-line no-alert
      return;
    }

    this.setState((state) => {
      const queueDataState = [...state.queueDataState];
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
    const { queueDataState } = this.state;

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
    // const { classes } = this.props;
    return (
      <div style={styles.root}>
        <Card className="cardqueue">
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {queueDataState.map((queue, index) => (
                    <Draggable
                      key={queue.id}
                      draggableId={queue.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div>
                          <div
                            ref={provided.innerRef}
                            style={getItemStyle(
                              provided.draggableStyle,
                              snapshot.isDragging
                            )}
                            {...provided.dragHandleProps}
                          >
                            {queue.content}
                            {provided.placeholder}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          {/* <Row
            cellHeight={60}
            spacing={1}
            style={{ ...queueDataState.length > 6 ? styles.gridList : styles.gridListAuto }}
          >
            {queueDataState.map(queue => (
              <Col
                xs={12}
                key={queue.key}
                cols={2}
                rows={1}
                style={styles.gridListItem}
              >
                <MdDeleteSweep
                  draggable
                  className="md-icon del-icon"
                  color="dander"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this Queue?')) {
                      this.deleteQueue(queue);
                    }
                  }}
                  title="Delete row"
                />
                <span draggable className="btn queuetype" style={{ ...queue.queuetype ===
                  'SC' ? styles.hplc : styles.sc }}>
                  {queue.queuetype}
                </span>
                <span className="btn sample">
                  {queue.sample}
                </span>
                <QueueProgress />
                <hr style={{ marginBottom: '0px', with: '100%' }} />
              </Col>
            ))}
          </Row> */}
          <Nav className="cardbtnqueue justify-content-center">
            <Nav.Item>
              {btn}
            </Nav.Item>
          </Nav>
        </Card>
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
