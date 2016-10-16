import React, { Component, PropTypes, createElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import focusTrap from 'focus-trap'
import specialAssign from './special-assign'

const checkedProps = {
  tag: PropTypes.string,
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
    if (this.context.ariaManager.isPopoverOpen !== lastContext.ariaManager.isPopoverOpen) {
      this._setPopoverNode()
    }
  }

  _setPopoverNode() {
    this.context.ariaManager.setPopoverNode(findDOMNode(this))
  }

  render() {
    const { type, uuid, isPopoverOpen } = this.context.ariaManager
    const { tag, children } = this.props
    const componentProps = {
      'aria-hidden': !isPopoverOpen
    }

    if (type === 'menu') {
      componentProps['role'] = 'menu'
    } else if (type === 'modal') {
      componentProps['role'] = 'dialog'
    } else if (type === 'alert') {
      componentProps['role'] = 'alertdialog'
    } else if (type === 'tooltip') {
      componentProps['id'] = uuid
      componentProps['role'] = 'tooltip'
    }

    if (type === 'popover') {
      componentProps['aria-labelledby'] = uuid
    }

    const props = specialAssign(componentProps, this.props, checkedProps)

    if (typeof children === 'function') {
      return children(props)
    }

    return createElement(tag, props, children)
  }
}

export default AriaPopover
