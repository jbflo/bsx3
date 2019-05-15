import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import NumericInput from 'react-numeric-input';

import { FaCheck, FaTimes } from 'react-icons/fa';
import './style.css';

export default class DefaultInput extends React.Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.cancel = this.cancel.bind(this);
    this.submit = this.submit.bind(this);
    this.stepIncrement = this.stepChange.bind(this, props.motorName, 1);
    this.stepDecrement = this.stepChange.bind(this, props.motorName, -1);
    this.formControlRef = React.createRef();
    this.inputRef = React.createRef();
  }

  getValue() {
    return this.formControlRef.current.value;
  }

  stepChange(name, operator) {
    const input = this.formControlRef.current;
    const nv = (Number(input.value) + this.props.step * operator).toFixed(this.props.precision);
    input.value = nv;
    input.defaultValue = nv;
  }

  save() {
    this.props.onSave();
  }


  cancel() {
    this.props.onCancel();
  }

  submit(event) {
    this.props.onSubmit(event);
  }

  render() {
    return (
      <Form inline onSubmit={this.submit} noValidate>
        <NumericInput
          className="popinput-input"
          size="5"
          ref={this.formControlRef}
          defaultValue={this.props.value}
          precision={this.props.precision}
          value={this.props.value}
          step={this.props.step}
        />
        <ButtonToolbar style={{ marginLeft: '0px' }} className="form-group editable-buttons">
          <Button variant="success" className="btn-sm" onClick={this.save}>
            <FaCheck />
          </Button>
          { !this.props.inplace ? (
            <Button variant="danger" className="btn-sm" onClick={this.cancel}>
              <FaTimes />
            </Button>
          ) : (null)
          }
        </ButtonToolbar>
      </Form>
    );
  }
}


DefaultInput.defaultProps = {
  dataType: 'number',
  inputSize: '10',
  step: 0.1,
  inplace: false,
  precision: 3,
  value: 0,
  onSave: undefined,
  onCancel: undefined,
  onSubmit: undefined,
};
