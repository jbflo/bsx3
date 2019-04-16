import React from 'react';
import { Label } from 'react-bootstrap/Form';

import './style.css';


export default class LabeledValue extends React.Component {
  render() {
    let valueStyle = {
      backgroundColor: 'transparent',
      display: 'block-inline',
      fontSize: '100%',
      borderRadius: '0px',
      color: 'rgb(255, 255, 255)',
      padding: '0px'
    };

    if (this.props.look === 'vertical') {
      valueStyle = { display: 'block', fontSize: '100%', borderRadius: '0px' };
    }

    return [
      <div>
        <span>
          <div>
            <Label
              style={valueStyle}
            >
              {this.props.value}
              {this.props.suffix}
            </Label>
          </div>
        </span>
      </div>
    ];
  }
}

LabeledValue.defaultProps = {
  extraInfo: {},
  value: 0,
  name: '',
  suffix: '',
  look: 'horizontal',
  level: 'info'
};
