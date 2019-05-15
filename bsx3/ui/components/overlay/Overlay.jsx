import React from 'react';
import {
  Button, OverlayTrigger, Popover
} from 'react-bootstrap';

import { Label } from 'react-bootstrap/Form';

const styles = {

  danger: {
    width: 70,
    height: 25,
    padding: 0,
    margin: 0,
    transform: 'translateZ(0)',
  },
  success: {
    width: 70,
    height: 25,
    padding: 0,
    margin: 0,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  lbl: {
    cursor: 'pointer',
    color: 'rgb(255, 255, 255)',
  }
};

export default class Overlay extends React.Component {
  constructor(props) {
    super(props);
    this.setIn = this.setIn.bind(this);
    this.setOut = this.setOut.bind(this);
    this.onLinkRightClick = this.onLinkRightClick.bind(this);
    this.onOptionsRightClick = this.onOptionsRightClick.bind(this);
  }


  onLinkRightClick(e) {
    this.OverlayTrigger.handleToggle();
    e.preventDefault();
  }


  onOptionsRightClick(e) {
    this.OverlayTrigger.handleToggle();
    e.preventDefault();
  }

  setIn() {
    if (this.props.onSave !== undefined) {
      this.props.onSave(this.props.pkey, 'in');
    }

    this.OverlayTrigger.hide();
  }

  setOut() {
    if (this.props.onSave !== undefined) {
      this.props.onSave(this.props.pkey, 'out');
    }
    this.OverlayTrigger.hide();
  }

  render() {
    let btn = <Button variant="light" disabled>---</Button>;
    if (this.props.data.state === 'OPEN') {
      btn = (
        <Button
          style={styles.danger}
          variant="light"
          onClick={this.setIn}
          ref={(OverlayButton) => {
            if (OverlayButton) OverlayButton.style.setProperty('color', '#ff1a1a', 'important');
          }}
        >
          {this.props.offText}
        </Button>
      );
    } else if (this.props.data.state === 'CLOSED') {
      btn = (
        <Button
          variant="light"
          style={styles.success}
          onClick={this.setOut}
          ref={(OverlayButton) => {
            if (OverlayButton) OverlayButton.style.setProperty('color', '#47d147', 'important');
          }}
        >
          {this.props.onText}
        </Button>
      );
    }
    return (
      <div>
        <OverlayTrigger
          ref={(ref) => { this.OverlayTrigger = ref; }}
          rootClose
          trigger="click"
          placement="bottom"
          overlay={(<Popover style={{ height: '38px' }} id={`${this.props.labelText} popover`}>{btn}</Popover>)}
        >
          <div onContextMenu={this.onLinkRightClick}>
            <Label style={styles.lbl}>{this.props.data.state}</Label>
          </div>
        </OverlayTrigger>
      </div>
    );
  }
}


Overlay.defaultProps = {
  onText: 'Open',
  offText: 'Close',
  pkey: undefined,
  onSave: undefined,
  data: { value: 'undefined', state: 'IN' }
};
