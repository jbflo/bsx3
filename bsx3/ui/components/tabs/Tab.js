const React = require('react');
const PropTypes = require('prop-types');
// const specialAssign = require('./specialAssign');

const checkedProps = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
  id: PropTypes.string.isRequired,
  tag: PropTypes.string,
  role: PropTypes.string,
  index: PropTypes.number,
  letterNavigationText: PropTypes.string,
};

export default class Tab extends React.Component {
  // contextTypes() {
  //   atpManager: PropTypes.object.isRequired;
  // }

  getDefaultProps() {
    return { tag: 'div', role: 'tab' };
  }

  getInitialState() {
    return {
      isActive: this.context.atpManager.memberStartsActive(this.props.id) || false,
    };
  }


  componentWillUnmount() {
    this.unregisterWithManager();
  }

  registerWithManager(el) {
    if (this.isRegistered) return;
    this.isRegistered = true;
    this.context.atpManager.registerTab({
      id: this.props.id,
      node: el,
      update: this.updateActiveState,
      index: this.props.index,
      letterNavigationText: this.props.letterNavigationText,
      active: (this.props.active === undefined) ? this.state.isActive : this.props.active,
    });
  }

  handleRef(el) {
    if (el) {
      this.elRef = el;
      this.registerWithManager(this.elRef);
    }
  }

  updateActiveState(nextActiveState) {
    this.setState({ isActive: nextActiveState });
  }

  handleFocus() {
    this.context.atpManager.handleTabFocus(this.props.id);
  }

  unregisterWithManager() {
    this.context.atpManager.unregisterTab(this.props.id);
  }

  render() {
    const isActive = (this.props.active === undefined) ? this.state.isActive : this.props.active;
    const kids = () => {
      if (typeof this.props.children === 'function') {
        return this.props.children({ isActive });
      }
      return this.props.children;
    };

    const elProps = {
      id: this.props.id,
      tabIndex: (isActive) ? 0 : -1,
      onClick: this.handleClick,
      onFocus: this.handleFocus,
      role: this.props.role,
      'aria-selected': isActive,
      'aria-controls': this.props.id,
      ref: this.handleRef,
    };
    // specialAssign(elProps, this.props, checkedProps);

    return (this.props.tag, elProps, kids);
  }
}


Tab.defaultProps = {
  atpManager: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  propTypes: checkedProps,
  displayName: 'AriaTabPanel-Tab',
  active: PropTypes.bool,
  id: PropTypes.string.isRequired,
};
