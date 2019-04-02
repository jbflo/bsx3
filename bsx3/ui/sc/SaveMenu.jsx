import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DraftsIcon from '@material-ui/icons/Drafts';
import SaveIcon from '@material-ui/icons/Save';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& $primary, & $icon': {
        color: theme.palette.common.white,
      },
    },
  },
  button: {
    margin: theme.spacing.unit,
  },
  primary: {},
  icon: {},
});

class SaveMenu extends React.Component {
  state = {
    anchorEl: null,
    open: false,
  };

  openMenu = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <Button
          style={{ backgroundColor: '#00695c', color: '#fff', width: '100px' }}
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
          variant="contained"
          className={classes.button}
        >
          File
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem className={classes.menuItem}>
            <ListItemIcon className={classes.icon}>
              <SaveIcon />
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.primary }} inset primary="Save" />
          </MenuItem>
          <MenuItem className={classes.menuItem} onClick={this.openMenu}>
            <ListItemIcon className={classes.icon}>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.primary }} inset primary="Save as" />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </MenuItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText inset primary="CSV" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText inset primary="XLS" />
              </ListItem>
            </List>
          </Collapse>
          <MenuItem className={classes.menuItem}>
            <ListItemIcon className={classes.icon}>
              <CloudUploadIcon className={classes.rightIcon} />
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.primary }} inset primary="Import" />
          </MenuItem>
        </Menu>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    Sc: state.Sc,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}
SaveMenu.defaultProps = {
  classes: PropTypes.object.isRequired,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveMenu); withStyles(styles);
