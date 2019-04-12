/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
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

class FolderUploader extends React.Component {
  componentDidMount() {
    if (this.folder) {
      // this.folder.directory = true;
      // this.folder.webkitdirectory = true;
    }
  }

  componentDidUpdate() {
    if (this.folder) {
      // this.folder.directory = true;
      // this.folder.webkitdirectory = true;
    }
  }

  render() {
    return (
      <div className="folderU">
        <label htmlFor="files" className="btn labelinput" style={{ zIndex: '2' }}> Directory Path : </label>
        <input
          type="text"
          id="files"
          ref={(ref) => { this.folder = ref; }}
          style={{
            position: 'relative', top: '-1.4px', marginLeft: '-12px', height: '32px', paddingLeft: '8px'
          }}
        />
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
FolderUploader.defaultProps = {
  classes: PropTypes.object.isRequired,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FolderUploader); withStyles(styles);
