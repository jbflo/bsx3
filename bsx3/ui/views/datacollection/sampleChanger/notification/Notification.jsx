import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const NotificationPropTypes = {
  visible: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired
};

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.visible !== nextProps.visible) {
      this.setState({
        visible: nextProps.visible
      }, () => {
        setTimeout(() => this.setState({ visible: false }),
          3000);
      });
    }
  }

  getIcon() {
    switch (this.props.level) {
      case 'warning': return 'fas fa-info-circle';
      case 'danger': return 'fas fa-info-circle';
      case 'success': return 'fas fa-info-circle';
      default:
        return 'fas fa-info-circle';
    }
  }

  render() {
    let classes = `toast ${this.props.level} `;
    classes += this.state.visible ? 'visible' : '';
    return (
      <div className={classes}>
        HHHHHHHHHHHHHHHH
        <p className={`p ${this.getIcon()} `}>{ this.props.message }</p>
      </div>
    );
  }
}

Notification.propTypes = NotificationPropTypes;

export default Notification;
