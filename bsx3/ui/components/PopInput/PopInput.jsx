import React from 'react';
import Popover from 'react-bootstrap/Popover';
import {
  OverlayTrigger
} from 'react-bootstrap';
import { STATE } from '../../beamlinestatus/beamline-api';


import DefaultInput from './DefaultInput';
import DefaultBusy from './DefaultBusy';
import './style.css';


export default class PopInput extends React.Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.cancel = this.cancel.bind(this);
    this.submit = this.submit.bind(this);
    this.onLinkClick = this.onLinkClick.bind(this);
    this.inputRef = React.createRef(); // create a ref object
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.data.state !== this.props.data.state) {
      if (this.isIdle(nextProps.data)) {
        this.handleIdle(nextProps.data);
      } else if (this.isAborted(nextProps.data)) {
        this.handleError(nextProps.data);
      } else {
        this.handleError(nextProps.data);
      }
    }
  }


  onLinkClick(e) {
    this.overlay.handleToggle();
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

    // Don’t use iterators. Prefer JavaScript’s higher-order functions instead
    // of loops like for-in or for-of. eslint: no-iterator no-restricted-syntax
    // for (const c in children) {
    //   if (children[c].key === key) {
    //     child = children[c];
    //   }
    // }
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
    if (this.props.data.state === 'IMMEDIATE' && this.overlay) {
      this.overlay.hide();
    }
  }


  handleIdle(data) {
    // No message to display to user, hide overlay
    if (data.msg === '') {
      this.overlay.hide();
    }
  }


  handleError(data) {
    // No message to display to user, hide overlay
    if (data.msg === '') {
      this.overlay.hide();
    }
  }


  save() {
    // eslint-disable-next-line react/no-string-refs
    this.setValue(this.refs.input.getValue());
  }


  cancel() {
    if (this.props.onCancel !== undefined && this.isBusy()) {
      this.props.onCancel(this.props.pkey);
    }

    if (!this.isBusy() && this.overlay) {
      this.overlay.hide();
    }
  }


  submit(event) {
    event.preventDefault();
    this.save();
  }


  inputComponent() {
    const props = {
      value: this.props.data.value,
      ref: 'input',
      onSubmit: this.submit,
      onCancel: this.cancel,
      onSave: this.save,
      precision: this.props.data.precision,
      step: this.props.data.step
    };

    let input = (
      <DefaultInput
        ref={(ref) => { this.input = ref; }}
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


  isBusy(data) {
    const state = typeof data !== 'undefined' ? data.state : this.props.data.state;
    return state === STATE.BUSY;
  }


  isIdle(data) {
    const state = typeof data !== 'undefined' ? data.state : this.props.data.state;
    return state === STATE.IDLE;
  }


  isAborted(data) {
    const state = typeof data !== 'undefined' ? data.state : this.props.data.state;
    return state === STATE.ABORT;
  }

  render() {
    const linkClass = 'editable-click';
    // const busyVisibility = this.isBusy() ? '' : 'hidden';
    const inputVisibility = !this.isBusy() ? '' : 'hidden';
    const title = (this.props.title === '') ? this.props.name : this.props.title;

    let stateClass = 'value-label-enter-success';

    if (this.isBusy()) {
      stateClass = 'input-bg-moving';
    } else if (this.isAborted()) {
      stateClass = 'input-bg-fault';
    }

    const popoverContent = (
      <span>
        <div className={`${inputVisibility} popinput-form-container`}>
          {this.inputComponent()}
        </div>
        {/* <div
          ref={(ref) => { this.inputVisibility = ref; }}
          className={inputVisibility}
        >
          {this.props.data.msg}
        </div>

        <div ref={(ref) => { this.busyVisibility = ref; }} className={`${busyVisibility}
        popinput-input-loading`}>
          {this.busyComponent()}
        </div> */}
      </span>);

    const popover = (
      <Popover ref={(ref) => { this.Popover = ref; }} id={title} title={title} className="popover">
        { popoverContent }
      </Popover>);

    let value = this.props.data.value ? parseFloat(this.props.data.value) : '-';

    if (value !== '-' && this.props.data.precision) {
      value = value.toFixed(parseInt(this.props.data.precision, 10));
    }

    return [

      <OverlayTrigger
        ref={(ref) => { this.overlay = ref; }}
        trigger="click"
        rootClose
        placement={this.props.placement}
        overlay={popover}
        className="overlay"
      >
        <a
          ref={(ref) => { this.a = ref; }}
          onContextMenu={this.onLinkClick}
          key="valueLabel"
          className={`popinput-input-link ${linkClass} ${stateClass}`}
          href
        >
          {value}
          {' '}
          {this.props.suffix}
        </a>
      </OverlayTrigger>
    ];
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
  data: {
    value: 0, state: 'ABORTED', msg: '', step: 0.1
  }
};
