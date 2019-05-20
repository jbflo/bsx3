// A React component that takes manage item selection state in tables
// Source git hub react-item-select

import _every from 'lodash.every';
import _has from 'lodash.has';
import _isEmpty from 'lodash.isempty';
import _size from 'lodash.size';
import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import update from 'immutability-helper';

function derivedState(incomingState) {
  // Sets derived state based on new selections
  return Object.assign({}, incomingState, {
    areAnySelected: !_isEmpty(incomingState.selections),
    selectedCount: _size(incomingState.selections),
  });
}

const enhance = (WrappedComponent) => {
  class WithSelections extends React.Component {
    state = {
      areAnySelected: false,
      selectedCount: 0,
      selections: { },
    };

    handleClearAll = () => {
      this.setState(derivedState({
        selections: {},
      }));
    }

    handleSelect = (id) => {
      this.setState((prevState) => {
        if (_has(prevState.selections, id)) {
          // { 1: true } -> {}
          return derivedState(update(prevState, {
            selections: { $unset: [id] },
          }));
        }
        // {} -> { 1: true }
        return derivedState(update(prevState, {
          selections: { [id]: { $set: true } },
        }));
      });
    }

    handleSelectAll = (items) => {
      if (_isEmpty(this.state.selections)) {
        const newSelections = {};
        items.forEach((item) => {
          newSelections[item.id] = true;
        });
        this.setState(derivedState({
          selections: newSelections,
        }));
      } else {
        this.setState(derivedState({
          selections: {},
        }));
      }
    }

    areAllIndeterminate = items => !_isEmpty(this.state.selections) && !this.areAllSelected(items);

    areAllSelected = items => _every(items, item => _has(this.state.selections, item.id));

    isItemSelected = id => _has(this.state.selections, id);

    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}
          handleClearAll={this.handleClearAll}
          handleSelect={this.handleSelect}
          handleSelectAll={this.handleSelectAll}
          areAllIndeterminate={this.areAllIndeterminate}
          areAllSelected={this.areAllSelected}
          isItemSelected={this.isItemSelected}
        />
      );
    }
  }

  hoistNonReactStatics(WithSelections, WrappedComponent);
  WithSelections.displayName = `WithSelections(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithSelections;
};

export default enhance;
