import React from 'react';
import Badge from 'react-bootstrap/Badge';

import './style.css';


export default class LabeledValue extends React.Component {
  render() {
    let badgeStyle = {
      display: 'inline-block',
      fontSize: '100%',
      marginBottom: '3px',
      color: '#000',
      padding: '5px'
    };

    let valueStyle = {
      display: 'inline-block',
      fontSize: '100%',
      borderRadius: '0px',
      color: '#000',
      padding: '3px'
    };

    if (this.props.look === 'vertical') {
      badgeStyle = { display: 'block', fontSize: '100%', marginBottom: '3px' };
      valueStyle = { display: 'block', fontSize: '100%', borderRadius: '0px' };
    }

    return (
      <div>
        <span>
          <div>
            <Badge
              variant="secondary"
              style={badgeStyle}
            >
              {this.props.name}
            </Badge>
          </div>
          <div>
            <Badge
              variant={this.props.level}
              style={valueStyle}
            >
              {this.props.value}
              {' '}
              {this.props.suffix}
            </Badge>
          </div>
        </span>
      </div>
    );
  }
}

LabeledValue.defaultProps = {
  extraInfo: {},
  value: 0,
  name: '',
  suffix: '',
  look: 'vertical',
  level: 'info'
};
