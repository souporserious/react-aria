import React, { Component, PropTypes, createElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import specialAssign from './special-assign'

const checkedProps = {
  tag:      PropTypes.string,
  children: PropTypes.node.isRequired
}

class Toggle extends Component {
  static contextTypes = {
    ariaManager: PropTypes.object.isRequired
  }

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

    return createElement(tag, props, children)
  }
}

export default Toggle

// toggle: ['haspopup']
// items: {
//   toggle: ['haspopup', 'expanded', 'disabled']
// }
