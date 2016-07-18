import React, { Component, PropTypes, createElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import focusTrap from 'focus-trap'
import specialAssign from './special-assign'

const checkedProps = {
  tag:      PropTypes.string,
  children: PropTypes.node.isRequired
}

class Popover extends Component {
  static contextTypes = {
    ariaManager: PropTypes.object.isRequired
  }

  static propTypes = {
    tag: PropTypes.string,
    trapFocus: PropTypes.bool
  }

  static defaultProps = {
    tag: 'div',
    trapFocus: false
  }

  componentDidMount() {
    const { trapFocus, initialFocus, closePopover } = this.context.ariaManager

    this._setPopoverNode()

    if (trapFocus) {
      this._focusTrap = focusTrap(findDOMNode(this), {
        initialFocus,
        escapeDeactivates: false,
        clickOutsideDeactivates: true
      }).activate()
    }
  }

  componentWillUnmount() {
    if (this.context.ariaManager.trapFocus) {
      this._focusTrap.deactivate()
    }
  }

  // componentWillRecieveProps(nextProps) {
  //   if (this.props.isOpen !== nextProps.isOpen) {
  //     this.context.ariaManager.setPopoverState()
  //   }
  // }

  componentDidUpdate(lastProps, lastState, lastContext) {
    if (this.context.ariaManager.isOpen !== lastContext.ariaManager.isOpen) {
      this._setPopoverNode()
    }
  }

  _setPopoverNode() {
    this.context.ariaManager.setPopoverNode(findDOMNode(this))
  }

  render() {
    const { tag, children } = this.props
    const props = specialAssign({
      role: 'menu'
    }, this.props, checkedProps)

    return createElement(tag, props, children)
  }
}

export default Popover
