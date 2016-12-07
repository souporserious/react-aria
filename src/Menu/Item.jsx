import React, { Component, PropTypes, createElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import specialAssign from '../special-assign'

const checkedProps = {
  tag:      PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired
}

class Item extends Component {
  static contextTypes = {
    ariaManager: PropTypes.object.isRequired
  }

  static propTypes = checkedProps

  static defaultProps = {
    tag: 'div'
  }

  componentDidMount() {
    this._member = {
      type: 'item',
      node: findDOMNode(this),
      text: this.props.text
    }

    if (this.props.value) {
      this._member.value = this.props.value
    }

    this.context.ariaManager.addMember(this._member)
  }

  componentWillUnmount() {
    this.context.ariaManager.removeMember(this._member)
  }

  _handleKeyDown = (e) => {
    const { onKeyDown } = this.props

    if ([' ', 'Enter'].indexOf(e.key) > -1) {
      this.context.ariaManager.onItemSelection(this._member, e)
    }
    if (onKeyDown) {
      onKeyDown(e)
    }
  }

  render() {
    const { tag, children } = this.props
    const props = specialAssign({
      role: 'menuitem',
      tabIndex: -1,
      onKeyDown: this._handleKeyDown
    }, this.props, checkedProps)

    if (typeof children === 'function') {
      return children(props)
    }

    return createElement(tag, props, children)
  }
}

export default Item
