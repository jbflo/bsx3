import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const NotificationPropTypes = {
  visible: PropTypes.bool.isRequired,
  level: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  // handleShowNotification: PropTypes.func.isRequired,
};
const styles = {
  display: {
    display: 'visible',

  },
  none: {
    display: 'none',

  }
};

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // visible: false
    };
  }

  componentWillMount() {
    // if (this.props.visible !== this.visible) {
    //   this.setState({
    //     visible: this.props.visible
    //   }, () => {
    //     setTimeout(() => this.setState({ visible: false }),
    //       3000);
    //   });
    // }
    setTimeout(() => this.props.handleShowNotification(false),
      3000);
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
    let classes = `toasts ${this.props.level} `;
    classes += this.props.visible ? 'visible' : 'none';
    return (
      <div className={classes} style={this.props.visible ? styles.display : styles.none}>
        <p className={`p ${this.getIcon()} `}>
          {` ${this.props.message} ${this.props.visible}`}
        </p>
      </div>
    );
  }
}

Notification.propTypes = NotificationPropTypes;

export default Notification;
