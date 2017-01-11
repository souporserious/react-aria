import React, { Component, PropTypes, createElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import uuid from '../utils/uuid'
import specialAssign from '../utils/special-assign'

const checkedProps = {
  tag: PropTypes.string,
  index: PropTypes.any,
  value: PropTypes.any,
  onSelect: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
}

class Item extends Component {
  static contextTypes = {
    overlayManager: PropTypes.object
  }

  static propTypes = checkedProps

  static defaultProps = {
    tag: 'div'
  }

  _id = this.props.id || uuid()

  componentDidMount() {
    this._member = {
      id: this._id,
      node: findDOMNode(this),
      text: this.props.text,
      index: this.props.index
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

    this._handleSelection(e)

    if (typeof onClick === 'function') {
      onClick(e)
    }
  }

  _handleKeyDown = (e) => {
    const { onKeyDown } = this.props

    if ([' ', 'Enter'].indexOf(e.key) > -1) {
      e.preventDefault()
      this._handleSelection(e)
    }

    if (typeof onKeyDown === 'function') {
      onKeyDown(e)
    }
  }

  _handleSelection = (e) => {
    const { onSelect } = this.props

    this.context.overlayManager.onItemSelection(this._member, e)

    if (typeof onSelect === 'function') {
      onSelect(this._member, e)
    }
  }

  render() {
    const { overlayManager } = this.context
    const { tag, id, children } = this.props
    const props = specialAssign({
      id: id || this._id,
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
