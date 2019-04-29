import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import NavLoggedIn from '../header/NavLoggedIn';

// import DataCollection from '../datacollection/DataCollection';
import BeamlineStatus from '../beamlinestatus/BeamlineStatus';


class Main extends Component {
  render() {
    return (
      <div className="main">
        <Container fluid style={{ padding: '0px' }}>
          <NavLoggedIn />
          <BeamlineStatus key="bmstatatus" />
        </Container>
      </div>
    );
  }
}

export default Main;
