import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Row, Button } from 'react-bootstrap';
import NumericInput from 'react-numeric-input';
import './style.css';

export default class DefaultInput extends React.Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.cancel = this.cancel.bind(this);
    this.submit = this.submit.bind(this);
    this.stepIncrement = this.stepChange.bind(this, props.motorName, 1);
    this.stepDecrement = this.stepChange.bind(this, props.motorName, -1);
  }

  getValue() {
    const input = this.NumericInput;
    console.log(input.value);
    return input.value;
  }


  stepChange(name, operator) {
    const input = ReactDOM(this.formControl);
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
        <Form.Group as={Row} className="pull-right popcontent" role="group">
          <NumericInput
            // size={this.props.inputSize}
            size={5}
            className="form-control"
            column
            sm="2"
            inputRef={(ref) => { this.input = ref; }}
            ref={(ref) => { this.NumericInput = ref; }}
            step={0.1}
            precision={2}
            value={this.props.value}
            snap
          />
          <Button column sm="2" type="button" className="btn btn-xs btn-success img-circle" onClick={this.save}>&#x2713;</Button>
          <Button column sm="2" type="button" className="btn btn-xs btn-danger img-circle" onClick={this.cancel}>X</Button>
        </Form.Group>
      </Form>
    );
  }
}


DefaultInput.defaultProps = {
  dataType: 'number',
  inputSize: '110',
  step: 'any',
  precision: 1,
  value: 0,
  onSave: undefined,
  onCancel: undefined,
  onSubmit: undefined,
};
