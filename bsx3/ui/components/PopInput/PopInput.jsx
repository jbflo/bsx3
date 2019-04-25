import React from 'react';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Badge from 'react-bootstrap/Badge';
// import { STATE } from '../../beamlinestatus/beamline-api';


import DefaultInput from './DefaultInput';
import DefaultBusy from './DefaultBusy';
import './style.css';

/**
 * A simple "Popover Input" input control, the value is displayed as text and
 * the associated input is displayed in an overlay when the text is clicked.
 *
 * Valid react properties are:
 *
 *   dataType:   The data type of the value (the input will addapt
 *               accordingly)
 *   inputSize:  Input field size, with any html unit; px, em, rem ...
 *   pkey:       Key used when retreiving or sending data to server
 *   name:       Name displayed in label
 *   suffix:     Suffix to display after value
 *   data:       Object containing value, the current state of the value and
 *               a message describing the state. The object have the following
 *               format:
 *
 *                    data: {value: <value>, state: <state>, msg: <msg>}
 *
 *   title:      Title displayed at the top of popover
 *   placement:  Placement of Popover (left, right, bottom, top)
 *   onSave:     Callback called when user hits save button
 *   onCancel:   Callback called when user hits cancel button
 *
 * @class
 *
 */
export default class PopInput extends React.Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.cancel = this.cancel.bind(this);
    this.submit = this.submit.bind(this);
    this.onLinkClick = this.onLinkClick.bind(this);
    this.renderValue = this.renderValue.bind(this);
    this.renderLabel = this.renderLabel.bind(this);

    this.overlayRef = React.createRef();
    this.inputRef = React.createRef();
  }


  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.data.state !== this.props.data.state) {
  //     if (this.isIdle(nextProps.data)) {
  //       this.handleIdle(nextProps.data);
  //     } else if (this.isAborted(nextProps.data)) {
  //       this.handleError(nextProps.data);
  //     } else {
  //       this.handleError(nextProps.data);
  //     }
  //   }
  // }


  onLinkClick(e) {
    this.overlayRef.current.handleToggle();
    e.preventDefault();
  }


  getChild(key) {
    let { children } = this.props;
    let child;

    // We need to create a real array here since react is so kind to give us
    // undefined if there is no children and an object if there is only one.
    if (this.props.children === undefined) {
      children = [];
    } else if (!Array.isArray(this.props.children)) {
      children = [this.props.children];
    }

    children.forEach((c) => {
      if (children[c].key === key) {
        child = children[c];
      }
    });

    return child;
  }


  setValue(value) {
    if (this.props.onSave !== undefined) {
      // Only update if value actually changed
      this.props.onSave(this.props.pkey, value);
    }
    if (this.props.data.state === 'IMMEDIATE' && this.overlayRefs.current) {
      this.overlayRef.current.hide();
    }
  }


  handleIdle(data) {
    // No message to display to user, hide overlay
    if (data.msg === '') {
      this.overlayRef.current.hide();
    }
  }


  handleError(data) {
    // No message to display to user, hide overlay
    if (data.msg === '') {
      this.overlayRef.current.hide();
    }
  }


  save() {
    this.setValue(this.inputRef.current.getValue());
  }


  cancel() {
    if (this.props.onCancel !== undefined && this.isBusy()) {
      this.props.onCancel(this.props.pkey);
    }

    if (!this.isBusy() && this.overlayRef.current) {
      this.overlayRef.current.hide();
    }
  }


  submit(event) {
    event.preventDefault();
    this.save();
  }


  inputComponent() {
    const props = {
      value: this.props.data.value,
      ref: this.inputRef,
      onSubmit: this.submit,
      onCancel: this.cancel,
      onSave: this.save,
      precision: this.props.data.precision,
      step: this.props.data.step
    };

    let input = (
      <DefaultInput
        ref={this.inputRef}
        precision={this.props.precision}
        step={this.props.data.step}
        dataType={this.props.dataType}
        inputSize={this.props.inputSize}
        inplace={this.props.inplace}
      />);

    input = this.getChild('input') || input;
    input = React.cloneElement(input, props);

    return input;
  }


  busyComponent() {
    const props = { onCancel: this.cancel };
    let input = (<DefaultBusy />);

    input = this.getChild('busy') || input;
    input = React.cloneElement(input, props);

    return input;
  }


  isBusy() {
    return this.props.data.state;
  }


  isIdle() {
    return !this.props.data.state;
  }


  isAborted(data) {
    const state = typeof data !== 'undefined' ? data.state : this.props.data.error;
    return state;
  }

  renderLabel() {
    let el = null;

    if (this.props.variant === 'horizontal') {
      el = (
        <span className={`popinput-input-label ${this.props.ref}`}>
          {this.props.name}
        :
        </span>
      );
    } else {
      el = (
        <Badge
          variant="secondary"
          style={{ display: 'block', fontSize: '100%', marginBottom: '3px' }}
          className={`popinput-input-label ${this.props.ref}`}
        >
          {`${this.props.name}:`}
        </Badge>
      );
    }

    return el;
  }

  renderValue() {
    let el = null;
    const linkClass = 'editable-click';
    let stateClass = 'value-label-enter-success';

    if (this.isBusy()) {
      stateClass = 'input-bg-moving';
    } else if (this.isAborted()) {
      stateClass = 'input-bg-fault';
    }

    let value = this.props.data.value ? parseFloat(this.props.data.value) : '-';

    if (value !== '-' && this.props.data.precision) {
      value = value.toFixed(parseInt(this.props.data.precision, 10));
    }

    if (this.props.variant === 'horizontal') {
      el = (
        <span
          onContextMenu={this.onLinkClick}
          key="valueLabel"
          className={`popinput-input-link ${linkClass} ${stateClass}`}
        >
          {value}
          {' '}
          {this.props.suffix}
        </span>
      );
    } else {
      el = (
        <Badge
          variant="info"
          onContextMenu={this.onLinkClick}
          key="valueLabel"
          style={{ display: 'block', fontSize: '100%' }}
          className={`popinput-input-link ${linkClass} ${stateClass}`}
        >
          {value}
          {' '}
          {this.props.suffix}
        </Badge>
      );
    }

    return el;
  }

  render() {
    const busyVisibility = this.isBusy() ? '' : 'hidden';
    const inputVisibility = !this.isBusy() ? '' : 'hidden';
    const title = (this.props.title === '') ? this.props.name : this.props.title;

    const popoverContent = (
      <span>
        <div className={`${inputVisibility} popinput-form-container`}>
          {this.inputComponent()}
        </div>
        <div className={inputVisibility}>{this.props.data.msg}</div>
        <div className={`${busyVisibility} popinput-input-loading`}>
          {this.busyComponent()}
        </div>
      </span>);

    const popover = (
      <Popover id={title} title={title}>
        { popoverContent }
      </Popover>);

    return (
      <div style={this.props.style} className={`${this.props.className} popinput-input-container`}>
        { this.props.name ? (this.renderLabel()) : null }
        <span
          className={`popinput-input-value ${this.props.pkey}`}
        >
          { this.props.inplace ? (
            <span>
              { popoverContent }
            </span>)
            : (
              <OverlayTrigger
                ref={this.overlayRef}
                trigger="click"
                rootClose
                placement={this.props.placement}
                overlay={popover}
              >
                {this.renderValue()}
              </OverlayTrigger>
            )
          }
        </span>
      </div>
    );
  }
}


PopInput.defaultProps = {
  className: '',
  dataType: 'number',
  inputSize: '80px',
  name: '',
  title: '',
  suffix: '',
  value: 0,
  style: {},
  placement: 'right',
  pkey: undefined,
  onSave: undefined,
  onCancel: undefined,
  variant: 'horizontal',
  data:
  {
    value: 0,
    state: 'ABORTED',
    msg: '',
    step: 0.1
  }
};
