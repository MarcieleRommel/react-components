import React, { Component } from "react";
import PropTypes from "prop-types";
import { findDOMNode } from "react-dom";

const Selectable = (
  ChildComponent,
  {
    action,
    preventDefault = false,
    stopPropagation = false,
    selectOnHover = false,
    selectEvent = "onMouseDown"
  } = {}
) => {
  class Selectable extends Component {
    static selectable = true;

    static propTypes = {
      disabled: PropTypes.bool,
      onSelect: PropTypes.func,
      onValueChosen: PropTypes.func,
      selected: PropTypes.bool,
      value: PropTypes.any
    };

    static defaultProps = Object.assign({}, ChildComponent.defaultProps || {}, {
      action,
      disabled: false
    });

    onChoseValue = e => {
      const { disabled, onValueChosen, value } = this.props;

      if (!disabled && onValueChosen) {
        onValueChosen(value, e);
        preventDefault && e.preventDefault();
        stopPropagation && e.stopPropagation();
      }
    };

    onMouseEnter = e => {
      const { onSelect } = this.props;

      this.hover = true;
      if (selectOnHover) {
        setTimeout(() => {
          onSelect && onSelect(e, this);
        }, 0);
      }
    };

    onMouseLeave = e => {
      this.hover = false;
    };

    onMouseDown = e => {
      preventDefault && e.preventDefault();
    };

    componentWillReceiveProps(nextProps) {
      const { selected } = this.props;

      if (!selected && nextProps.selected && !this.hover) {
        setTimeout(() => {
          if (this.domNode.scrollIntoViewIfNeeded) {
            this.domNode.scrollIntoViewIfNeeded(false);
          } else if (this.domNode.scrollIntoView) {
            this.domNode.scrollIntoView(false);
          }
        }, 0);
      }
    }

    render() {
      const props = {
        ...this.props,
        onMouseEnter: this.onMouseEnter,
        onMouseLeave: this.onMouseLeave,
        onMouseDown: this.onMouseDown,
        [selectEvent]: this.onChoseValue
      };

      return (
        <ChildComponent
          ref={ref => {
            this.domNode = this.domNode || (ref && findDOMNode(ref));
          }}
          {...props}
        />
      );
    }
  }

  return Selectable;
};

export default Selectable;
