import React from 'react';
import {
  Button, OverlayTrigger, Popover
} from 'react-bootstrap';

import { Label } from 'react-bootstrap/Form';

export default class InOutSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.setIn = this.setIn.bind(this);
    this.setOut = this.setOut.bind(this);
    this.onLinkRightClick = this.onLinkRightClick.bind(this);
    this.onOptionsRightClick = this.onOptionsRightClick.bind(this);
  }


  onLinkRightClick(e) {
    this.overlay.handleToggle();
    e.preventDefault();
  }


  onOptionsRightClick(e) {
    this.optionsOverlay.handleToggle();
    e.preventDefault();
  }

  setIn() {
    if (this.props.onSave !== undefined) {
      this.props.onSave(this.props.pkey, 'in');
    }

    this.overlay.hide();
  }


  setOut() {
    if (this.props.onSave !== undefined) {
      this.props.onSave(this.props.pkey, 'out');
    }

    this.overlay.hide();
  }


  renderLabel() {
    let optionsLabel = (
      <Label
        style={{ display: 'block', marginBottom: '3px' }}
      >
        {this.props.labelText}
      </Label>);

    if (this.props.optionsOverlay) {
      optionsLabel = (
        <OverlayTrigger
          ref={(ref) => { this.optionsOverlay = ref; }}
          rootClose
          trigger="click"
          placement="bottom"
          overlay={this.props.optionsOverlay}
        >
          <div onContextMenu={this.onOptionsRightClick}>
            <Label
              style={{ display: 'block', marginBottom: '3px' }}
            >
              { this.props.labelText }
              <span>
                <i className="fa fa-cog" />
              </span>
            </Label>
          </div>
        </OverlayTrigger>);
    }

    return optionsLabel;
  }

  render() {
    // let msgBgStyle = 'warning';
    // if (this.props.data.state === 'out') {
    //   msgBgStyle = 'success';
    // } else if (this.props.data.state === 'in') {
    //   msgBgStyle = 'danger';
    // }

    let btn = <Button block bsSize="small" disabled>---</Button>;
    if (this.props.data.state === 'out') {
      btn = <Button block bsSize="small" onClick={this.setIn}>{this.props.offText}</Button>;
    } else if (this.props.data.state === 'in') {
      btn = <Button block bsSize="small" onClick={this.setOut}>{this.props.onText}</Button>;
    }

    const msgLabelStyle = {
      display: 'block',
      fontSize: '100%',
      borderRadius: '0px',
      // color: '#000'
    };

    return (
      <div>
        {this.renderLabel()}
        <OverlayTrigger
          ref={(ref) => { this.OverlayTrigger = ref; }}
          rootClose
          trigger="click"
          placement="bottom"
          overlay={(<Popover style={{ height: '50px' }} id={`${this.props.labelText} popover`}>{btn}</Popover>)}
        >
          <div onContextMenu={this.onLinkRightClick}>
            <Label style={msgLabelStyle}>{this.props.data.msg}</Label>
          </div>
        </OverlayTrigger>
      </div>
    );
  }
}


InOutSwitch.defaultProps = {
  onText: 'Open',
  offText: 'Close',
  labelText: '',
  pkey: undefined,
  onSave: undefined,
  data: { value: 'undefined', state: 'IN', msg: 'UNKNOWN' }
};
