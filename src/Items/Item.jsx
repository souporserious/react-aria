import React, { Component, PropTypes, createElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import uuid from '../utils/uuid'
import specialAssign from '../utils/special-assign'

const checkedProps = {
  component: PropTypes.any,
  id:        PropTypes.string,
  role:      PropTypes.string,
  index:     PropTypes.number,
  text:      PropTypes.string,
  value:     PropTypes.any,
  onFocus:   PropTypes.func,
  onSelect:  PropTypes.func,
  children:  PropTypes.oneOfType([PropTypes.func, PropTypes.node])
}
const noop = () => null

class Item extends Component {
  static contextTypes = {
    itemList: PropTypes.object
  }

  static propTypes = checkedProps

  static defaultProps = {
    component: 'div',
    role:      'menuitem',
    onFocus:   noop,
    onSelect:  noop
  }

  _id = this.props.id || uuid()

  componentDidMount() {
    const { itemList: { focusGroup } } = this.context
    const { index, text, value } = this.props

    this._member = {
      id:   this._id,
      node: findDOMNode(this),
      index,
      text,
      value
    }

    // add this item as a member
    focusGroup.addMember(this._member)

    // listen for respective focus group events
    focusGroup.on('focus', this._handleMemberFocus)
    focusGroup.on('select', this._handleMemberSelect)

    // activate focus group if this was the first member added
    if (focusGroup.getMembers().length === 1) {
      focusGroup.activate()
    }
  }

  componentWillUnmount() {
    const { itemList: { focusGroup } } = this.context

    focusGroup.removeMember(this._member)

    focusGroup.off('focus', this._handleMemberFocus)
    focusGroup.off('select', this._handleMemberSelect)

    // deactivate focus group if this was the last member removed
    if (focusGroup.getMembers().length <= 0) {
      focusGroup.deactivate()
    }
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
    const { component, role, children } = this.props
    const props = specialAssign({
      role,
      id: this._id,
      tabIndex: -1,
      onClick: this._handleClick
    }, this.props, checkedProps)

    if (typeof children === 'function') {
      return children(props)
    }

    return createElement(component, props, children)
  }
}

export default Item
