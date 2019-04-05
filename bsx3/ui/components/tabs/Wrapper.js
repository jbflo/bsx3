const React = require('react');
const PropTypes = require('prop-types');
// const createReactClass = require('create-react-class');
const createManager = require('./createManager');
// const specialAssign = require('./specialAssign');

const checkedProps = {
  children: PropTypes.node.isRequired,
  activeTabId: PropTypes.string,
  letterNavigation: PropTypes.bool,
  onChange: PropTypes.func,
  tag: PropTypes.string,
};

// module.exports = createReactClass({
class Wrapper extends React.Component {
  getDefaultProps() {
    return { tag: 'div' };
  }

  // childContextTypes: {
  //   atpManager: PropTypes.object.isRequired,
  // },

  getChildContext() {
    return { atpManager: this.manager };
  }

  componentWillMount() {
    this.manager = createManager({
      onChange: this.props.onChange,
      activeTabId: this.props.activeTabId,
      letterNavigation: this.props.letterNavigation,
    });
  }

  componentDidMount() {
    this.manager.activate();
  }

  componentDidUpdate(prevProps) {
    const updateActiveTab = (prevProps.activeTabId === this.manager.activeTabId)
    && (prevProps.activeTabId !== this.props.activeTabId);
    if (updateActiveTab) {
      this.manager.activateTab(this.props.activeTabId);
    }
  }

  componentWillUnmount() {
    this.manager.destroy();
  }

  render() {
    // const props = this.props;
    const elProps = {};
    // specialAssign(elProps, this.props, checkedProps);
    return (this.props.tag, elProps, this.props.children);
  }
}

Wrapper.defaultProps = {
  atpManager: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  displayName: 'AriaTabPanel-Wrapper',
  propTypes: checkedProps,
};


export default Wrapper;
