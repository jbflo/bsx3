const React = require('react');
const PropTypes = require('prop-types');
// const specialAssign = require('./specialAssign');

const checkedProps = {
  children: PropTypes.node.isRequired,
  tag: PropTypes.string,
  role: PropTypes.string,
};

class TabList extends React.Component {
  getDefaultProps() {
    return { tag: 'div', role: 'tablist' };
  }

  render() {
    const elProps = {
      role: this.props.role,
    };
    // specialAssign(elProps, this.props, checkedProps);
    return (this.props.tag, elProps, this.props.children);
  }
}

TabList.defaultProps = {
  atpManager: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  propTypes: checkedProps,
  displayName: 'AriaTabPanel-TabList',

};


export default TabList;
