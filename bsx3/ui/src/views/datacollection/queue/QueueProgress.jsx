import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import DoneIcon from '@material-ui/icons/Done';
import SvgIcon from '@material-ui/core/SvgIcon';
import Fab from '@material-ui/core/Fab';
import Chip from '@material-ui/core/Chip';

import './queue.css';
import initCone from '../img/cached.svg';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    outline: 'none',
    // top: -6,
    // left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    outline: 'none',
    // top: '50%',
    // left: '50%',
    // marginTop: -12,
    // marginLeft: -12,
  },
});

class QueueProgress extends React.Component {
  state = {
    loading: false,
    success: false,
    running: false,
  };

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleCheckChange = name => (event) => {
    this.setState({ [name]: event.target.checked });
  };

  handleButtonClick = () => {
    if (!this.state.loading) {
      this.setState(
        {
          success: false,
          running: false,
          loading: true,
        },
        () => {
          this.timer = setTimeout(() => {
            this.setState({
              loading: false,
              success: true,
              running: false,
            });
          }, 2000);
        },
      );
    }
  };

  handleDelete = () => {
    alert('Cancel Running Queue'); // eslint-disable-line no-alert
  }

  handleClick = () => {
    alert('This queuee is Done'); // eslint-disable-line no-alert
  }

  render() {
    const { loading, success, running } = this.state;
    const { classes } = this.props;
    // const buttonClassname = classNames({
    //   [classes.buttonSuccess]: success,
    // });
    let chip = (
      <Chip
        label="Initialize"
        className="initchip"
        deleteIcon={(
          <SvgIcon>
            <img src={initCone} alt="" width="300" height="200" />
          </SvgIcon>
          )}
        onDelete={this.handleDelete}
        color="secondary"
      />
    );
    if (success) {
      chip = <Chip label="Finished" clickable icon={<DoneIcon />} className="chipsuccess" />;
    }
    if (running) {
      chip = <Chip label="Next " color="secondary" />;
    }

    return (
      // <div>
      <Fab className="fabprogress" onClick={this.handleButtonClick}>
        {chip}
        {loading && <CircularProgress size={50} className={classes.fabProgress} style={{ marginLeft: '0px', outline: 'none', }} />}
        <Checkbox
          className="checkprogress"
          checked={this.state.checkedG}
          onChange={this.handleCheckChange('checkedG')}
          value="checkedG"
        />
        <SvgIcon>
          <img src={initCone} alt="ll" width="30" height="30" />
        </SvgIcon>
      </Fab>

    );
  }
}

QueueProgress.defaultProps = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QueueProgress);
