import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
// import GridListTileBar from '@material-ui/core/GridListTileBar';
import {
  Card, Button, Grid
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
// import CancelIcon from '@material-ui/icons/Cancel';
import QueueProgress from './QueueProgress';
import queueData from './queue-api';
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
class Queue extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      queueDataState: queueData,
    };

    this.startQueue = this.startQueue.bind(this);
    this.stopQueue = this.stopQueue.bind(this);
    this.deleteQueue = this.deleteQueue.bind(this);
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

    let btn = <Button className="btnqs" disabled>No State yet---</Button>;
    if (this.props.data.state === 'stop') {
      btn = <Button title="Start Queue" className="btnqs" onClick={this.sartQueue}>{this.props.startText}</Button>;
    } else if (this.props.data.state === 'start') {
      btn = <Button className="btnqd" onClick={this.stopQueue}>{this.props.stopText}</Button>;
    }
    // const { classes } = this.props;
    return (
      <div style={styles.root}>
        <Card className="cardqueue">
          <GridList
            cellHeight={60}
            spacing={1}
            style={{ ...queueDataState.length > 6 ? styles.gridList : styles.gridListAuto }}
          >
            {queueDataState.map(queue => (
              <GridListTile
                key={queue.key}
                cols={2}
                rows={1}
                style={styles.gridListItem}
              >
                <hr style={{ marginBottom: '0px', with: '100%' }} />
                <IconButton
                  style={{ marginLeft: '0px', outline: 'none', }}
                  color="secondary"
                  onClick={this.deleteQueue(queue)}
                  title={queue.control}
                >
                  <DeleteIcon />
                </IconButton>
                <span className="btn queuetype" style={{ ...queue.queuetype === 'SC' ? styles.hplc : styles.sc }}>
                  {queue.queuetype}
                </span>
                <span className="btn sample">
                  {queue.sample}
                </span>
                <QueueProgress />
                {/* <IconButton color="secondary" title="Cancel Queue"
                style={{ visibility: queue.control, outline: 'none', }}>
                  <CancelIcon />
                </IconButton> */}
              </GridListTile>
            ))}
          </GridList>
        </Card>
        <Card className="cardbtnqueue">
          <Grid
            container
            spacing={0}
            direction="row"
            justify="center"
            alignItems="center"
          >
            {btn}
          </Grid>
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
)(Queue); withStyles(styles);
