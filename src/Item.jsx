import React, { Component, PropTypes, createElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import specialAssign from './special-assign'

const checkedProps = {
  tag:      PropTypes.string,
  children: PropTypes.node.isRequired
}

class Item extends Component {
  static contextTypes = {
    ariaManager: PropTypes.object.isRequired
  }

  static defaultProps = {
    tag: 'div'
  }

  componentDidMount() {
    this._node = findDOMNode(this)

    this.context.ariaManager.addItem({
      node: this._node,
      text: this.props.text
    })
  }

  componentWillUnmount() {
    this.context.ariaManager.removeItem(this._node)
  }

  render() {
    const { tag, children } = this.props
    const props = specialAssign({
      role: 'menuitem',
      tabIndex: -1
    }, this.props, checkedProps)

    return createElement(tag, props, children)
  }
}

export default Item
