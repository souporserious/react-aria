import React, { Component, PropTypes, createElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import specialAssign from './special-assign'

const checkedProps = {
  tag:      PropTypes.string,
  children: PropTypes.node.isRequired
}

class Menu extends Component {
  static contextTypes = {
    ariaManager: PropTypes.object.isRequired
  }

  static defaultProps = {
    tag: 'div'
  }

  componentDidMount() {
    this._setMenuNode()
  }

  componentDidUpdate(lastProps, lastState, lastContext) {
    if (this.context.ariaManager.isOpen !== lastContext.ariaManager.isOpen) {
      this._setMenuNode()
    }
  }

  _setMenuNode() {
    this.context.ariaManager.setMenu(findDOMNode(this))
  }

  render() {
    const { tag, children } = this.props
    const props = specialAssign({
      role: 'menu'
    }, this.props, checkedProps)

    return createElement(tag, props, children)
  }
}

export default Menu
