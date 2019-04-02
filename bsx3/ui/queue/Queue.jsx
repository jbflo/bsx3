import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
// import GridListTileBar from '@material-ui/core/GridListTileBar';
import {
  Card, Button, CardContent, Grid
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';
import QueueProgress from '../components/progress/QueueProgress';
import queueData from './queue-api';
import './queue.css';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    height: 640,
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 500,
    padding: 0,
    margin: 0,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  gridListItem: {
    height: 10,
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
});

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
      queueDataState.splice(queueuToDelete, 1);
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
    let iconVisibility = 'visible';

    queueDataState.map(((_queu => () => {
      if (_queu.state === 'running') {
        iconVisibility = 'hidden';
      }
      if (_queu.state === 'stop') {
        iconVisibility = 'visible';
      }
    })));

    let btn = <Button style={{ backgroundColor: '#4caf50', color: '#fff' }} disabled>No State yet---</Button>;
    if (this.props.data.state === 'stop') {
      btn = <Button title="Start Queue" style={{ backgroundColor: '#4caf50', color: '#fff' }} onClick={this.sartQueue}>{this.props.startText}</Button>;
    } else if (this.props.data.state === 'start') {
      btn = <Button style={{ backgroundColor: '#f44336', color: '#fff' }} onClick={this.stopQueue}>{this.props.stopText}</Button>;
    }
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <GridList cellHeight={40} spacing={1} className={classes.gridList}>
          {queueDataState.map(queue => (
            <GridListTile
              key={queue.queuetype}
              cols={queue.featured ? 2 : 1}
              rows={queue.featured ? 2 : 1}
              className={classes.gridListItem}
            >
              <Card>
                <IconButton
                  style={{ marginLeft: '10px', outline: 'none', }}
                  color="secondary"
                  onClick={this.deleteQueue(queue)}
                  title={queue.control}
                >
                  <DeleteIcon />
                </IconButton>
                <span className="btn queuetype">
                  {queue.queuetype}
                </span>
                <span className="btn sample">
                  {queue.sample}
                </span>
                <QueueProgress />

                <IconButton color="secondary" title={iconVisibility} style={{ visibility: iconVisibility, outline: 'none', }}>
                  <CancelIcon />
                </IconButton>
              </Card>
              {/* <GridListTileBar
                title={queue.title}
                titlePosition="top"
                actionIcon={(
                    <IconButton className={classes.icon}>
                    <StarBorderIcon />
                    </IconButton>
                )}
                actionPosition="left"
                className={classes.titleBar}
                /> */}
            </GridListTile>
          ))}
        </GridList>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '' }}
        >
          <Card className="cardbtnqueue">
            <CardContent>{btn}</CardContent>
          </Card>
        </Grid>
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
