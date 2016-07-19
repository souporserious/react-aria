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

  render() {
    const { tag, disabled, children } = this.props
    const props = specialAssign({
      role: 'button',
      tabIndex: (disabled) ? '' : '0',
      'aria-haspopup': true,
      'aria-expanded': this.context.ariaManager.isOpen,
      'aria-disabled': disabled,
    }, this.props, checkedProps)

    if (typeof children === 'function') {
      return children(props)
    }

    return createElement(tag, props, children)
  }
}

export default AriaToggle
