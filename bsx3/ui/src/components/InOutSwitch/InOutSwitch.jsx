import React from 'react';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Badge from 'react-bootstrap/Badge';

export default class InOutSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.setIn = this.setIn.bind(this);
    this.setOut = this.setOut.bind(this);
    this.onLinkRightClick = this.onLinkRightClick.bind(this);
    this.onOptionsRightClick = this.onOptionsRightClick.bind(this);
    this.overlayRef = React.createRef();
    this.optionsOverlayRef = React.createRef();
  }


  onLinkRightClick(e) {
    this.overlayRef.current.handleClick();
    e.preventDefault();
  }


  onOptionsRightClick(e) {
    this.optionsOverlayRef.current.handleClick();
    e.preventDefault();
  }

  setIn() {
    if (this.props.onSave !== undefined) {
      this.props.onSave(this.props.pkey, 'in');
    }

    this.overlayRef.current.hide();
  }


  setOut() {
    if (this.props.onSave !== undefined) {
      this.props.onSave(this.props.pkey, 'out');
    }

    this.overlayRef.current.hide();
  }


  renderLabel() {
    let optionsLabel = (
      <Badge
        variant="secondary"
        style={{ display: 'block', marginBottom: '3px', fontSize: '100%' }}
      >
        {this.props.labelText}
      </Badge>);

    if (this.props.optionsOverlay) {
      optionsLabel = (
        <OverlayTrigger
          ref={this.optionsOverlayRef}
          rootClose
          trigger="click"
          placement="bottom"
          overlay={this.props.optionsOverlay}
        >
          <div onContextMenu={this.onOptionsRightClick}>
            <Badge
              style={{ display: 'block', marginBottom: '3px', }}
            >
              { this.props.labelText }
              <span>
                <i className="fa fa-cog" />
              </span>
            </Badge>
          </div>
        </OverlayTrigger>);
    }

    return optionsLabel;
  }

  render() {
    let msgBgStyle = 'warning';
    if (this.props.state === 'CLOSED') {
      msgBgStyle = 'danger';
    } else if (this.props.state === 'OPEN') {
      msgBgStyle = 'success';
    }

    let btn = <Button block bsSize="small" disabled>---</Button>;
    if (this.props.state === 'OPEN') {
      btn = <Button block bsSize="small" onClick={this.setIn}>{this.props.offText}</Button>;
    } else if (this.props.state === 'CLOSED') {
      btn = <Button block bsSize="small" onClick={this.setOut}>{this.props.onText}</Button>;
    }

    const msgLabelStyle = {
      display: 'block',
      fontSize: '100%',
      borderRadius: '0px',
      color: '#000',
      cursor: 'pointer'
    };

    return (
      <div>
        {this.renderLabel()}
        <OverlayTrigger
          ref={this.overlayRef}
          rootClose
          trigger="click"
          placement="bottom"
          overlay={(<Popover id={`${this.props.labelText} popover`}>{btn}</Popover>)}
        >
          <div onContextMenu={this.onLinkRightClick}>
            <Badge variant={msgBgStyle} style={msgLabelStyle}>{this.props.state}</Badge>
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
  data: { value: 'undefined', state: 'CLOSED', msg: 'UNKNOWN' }
};
