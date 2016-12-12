import React, { Component, PropTypes, createElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import specialAssign from '../special-assign'

const checkedProps = {
  tag: PropTypes.string
}

class Item extends Component {
  static contextTypes = {
    overlayManager: PropTypes.object
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

    this.context.overlayManager.members.add(this._member)
  }

  componentWillUnmount() {
    this.context.overlayManager.members.remove(this._member)
  }

  _handleClick = (e) => {
    const { onClick } = this.props

    this.context.overlayManager.onItemSelection(this._member, e)

    if (typeof onClick === 'function') {
      onClick(e)
    }
  }

  _handleKeyDown = (e) => {
    const { onKeyDown } = this.props

    if ([' ', 'Enter'].indexOf(e.key) > -1) {
      e.preventDefault()
      this.context.overlayManager.onItemSelection(this._member, e)
    }

    if (typeof onKeyDown === 'function') {
      onKeyDown(e)
    }
  }

  render() {
    const { tag, children } = this.props
    const props = specialAssign({
      role: 'menuitem',
      tabIndex: -1,
      onClick: this._handleClick,
      onKeyDown: this._handleKeyDown
    }, this.props, checkedProps)

    if (typeof children === 'function') {
      return children(props)
    }

    return createElement(tag, props, children)
  }
}

export default Item
