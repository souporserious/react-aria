import React, { Component, PropTypes, createElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import focusTrap from 'focus-trap'
import specialAssign from './special-assign'

const checkedProps = {
  tag:      PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired
}

class AriaPopover extends Component {
  static contextTypes = {
    ariaManager: PropTypes.object.isRequired
  }

  static propTypes = checkedProps

  static defaultProps = {
    tag: 'div'
  }

  componentDidMount() {
    const { trapFocus, initialFocus, onClickOutside } = this.context.ariaManager

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
    const props = specialAssign({}, this.props, checkedProps)

    if (typeof children === 'function') {
      return children(props)
    }

    return createElement(tag, props, children)
  }
}

export default AriaPopover
