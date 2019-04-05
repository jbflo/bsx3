const React = require('react');
const PropTypes = require('prop-types');
// const createReactClass = require('create-react-class');
// const specialAssign = require('./specialAssign');

const checkedProps = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
  tag: PropTypes.string,
  role: PropTypes.string,
};

class TabPanel extends React.Component {
  getDefaultProps() {
    return { tag: 'div', role: 'tabpanel' };
  }

  // contextTypes: {
  //   atpManager: PropTypes.object.isRequired,
  // },

  getInitialState() {
    return {
      isActive: this.context.atpManager.memberStartsActive(this.props.tabId) || false,
    };
  }

  handleKeyDown(event) {
    if (event.ctrlKey && event.key === 'ArrowUp') {
      event.preventDefault();
      this.context.atpManager.focusTab(this.props.tabId);
    }
  }

  updateActiveState(nextActiveState) {
    this.setState({ isActive: nextActiveState });
  }

  registerWithManager(el) {
    if (this.isRegistered) return;
    this.isRegistered = true;
    this.context.atpManager.registerTabPanel({
      node: el,
      update: this.updateActiveState,
      tabId: this.props.tabId,
    });
  }

  render() {
    const isActive = (this.props.active === undefined) ? this.state.isActive
    || false : this.props.active;

    const kids = (typeof this.props.children === 'function')
      ? this.props.children({ isActive })
      : this.props.children;

    const style = this.props.style || {};
    if (!isActive) {
      style.display = 'none';
    }

    const elProps = {
      className: this.props.className,
      id: this.props.id,
      onKeyDown: this.handleKeyDown,
      role: this.props.role,
      style,
      'aria-hidden': !isActive,
      'aria-describedby': this.props.tabId,
      ref: this.registerWithManager,
    };
    // specialAssign(elProps, this.props, checkedProps);

    return (this.props.tag, elProps, kids);
  }
}

TabPanel.defaultProps = {
  atpManager: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  displayName: 'AriaTabPanel-TabPanel',
  propTypes: checkedProps,
  active: PropTypes.bool,
  tabId: PropTypes.string.isRequired,

};

export default TabPanel;
