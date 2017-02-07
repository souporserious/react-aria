import React, { Component, PropTypes, createElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import uuid from '../utils/uuid'
import specialAssign from '../utils/special-assign'

const checkedProps = {
  tag: PropTypes.string,
  id: PropTypes.string,
  role: PropTypes.string,
  index: PropTypes.number,
  text: PropTypes.string,
  value: PropTypes.any,
  onFocus: PropTypes.func,
  onSelect: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
}
const noop = () => null

class Item extends Component {
  static contextTypes = {
    itemList: PropTypes.object
  }

  static propTypes = checkedProps

  static defaultProps = {
    tag: 'div',
    role: 'menuitem',
    onFocus: noop,
    onSelect: noop
  }

  _id = this.props.id || uuid()

  componentDidMount() {
    const { itemList: { members } } = this.context
    const { index, text, value } = this.props

    this._member = {
      id: this._id,
      node: findDOMNode(this),
      index,
      text,
      value
    }

    // add this item as a member
    members.add(this._member)

    // listen for respective focus group events
    members.on('focus', this._handleMemberFocus)
    members.on('select', this._handleMemberSelect)
  }

  componentWillUnmount() {
    const { itemList: { members } } = this.context
    members.remove(this._member)
    members.off('focus', this._handleMemberFocus)
    members.off('select', this._handleMemberSelect)
  }

  _handleMemberFocus = (member, e) => {
    if (this._member.id === member.id) {
      this.props.onFocus(member, e)
    }
  }

  _handleMemberSelect = (member, e) => {
    if (this._member.id === member.id) {
      this.props.onSelect(member, e)
    }
  }

  _handleClick = (e) => {
    this.props.onSelect(this._member, e)
    this.context.itemList.onItemSelection(this._member, e)
  }

  render() {
    const { tag, role, children } = this.props
    const props = specialAssign({
      role,
      id: this._id,
      tabIndex: -1,
      onClick: this._handleClick
    }, this.props, checkedProps)

    if (typeof children === 'function') {
      return children(props)
    }

    return createElement(tag, props, children)
  }
}

export default Item
