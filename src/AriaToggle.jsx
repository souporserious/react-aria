import React, { Component, PropTypes, createElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import specialAssign from './special-assign'

const checkedProps = {
  tag:      PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired
}

class AriaToggle extends Component {
  static contextTypes = {
    ariaManager: PropTypes.object.isRequired
  }

  static propTypes = checkedProps

  static defaultProps = {
    tag: 'button'
  }

  componentDidMount() {
    this.context.ariaManager.setToggleNode(findDOMNode(this))
  }

  _handleKeyDown = (e) => {
    if (['ArrowUp', 'ArrowDown', ' ', 'Enter'].indexOf(e.key) > -1) {
      if (!this.context.ariaManager.isPopoverOpen) {
        this.context.ariaManager.openPopover()
      } else {
        this.context.ariaManager.focusItem(0)
      }
    }
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e)
    }
  }

  render() {
    const { type, uuid, isPopoverOpen } = this.context.ariaManager
    const { tag, disabled, children } = this.props
    const componentProps = {
      role: 'button',
      tabIndex: (disabled) ? '' : 0,
      'aria-haspopup': true,
      'aria-expanded': isPopoverOpen,
      'aria-disabled': disabled,
      onKeyDown: this._handleKeyDown
    }

    if (type === 'popover' || type === 'menu') {
      componentProps['id'] = uuid
    }

    if (type === 'tooltip') {
      componentProps['aria-describedby'] = uuid
    }

    const props = specialAssign(componentProps, this.props, checkedProps)

    if (typeof children === 'function') {
      return children(props)
    }

    return createElement(tag, props, children)
  }
}

export default AriaToggle
