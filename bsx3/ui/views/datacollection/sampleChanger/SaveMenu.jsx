import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const styles = {
  button: {
    backgroundColor: '#00695c',
    color: '#fff',
    width: '100px',
    fontSize: '12px'
  },
  primary: {},
  icon: {},
};

class SaveMenu extends React.Component {
  state = {

  };

  openMenu = () => {
    this.setState(state => ({ open: !state.open }));
  };


  render() {
    return (
      <div>
        <Dropdown style={{ marginTop: '25px' }}>
          <Dropdown.Toggle variant="none" id="dropdown-basic" style={styles.button}>
            File
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-4">Import</Dropdown.Item>
            <Dropdown.Item href="#/action-1">Save</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Save As XLS</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Save As CSV</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
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
)(SaveMenu);
