import React, { Component, createElement } from 'react'
import PropTypes from 'prop-types'
import ReactDOM, { findDOMNode } from 'react-dom'
import uuid from '../utils/uuid'
import specialAssign from '../utils/special-assign'

const checkedProps = {
  component: PropTypes.any,
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
    component: 'div',
    role: 'menuitem',
    onFocus: noop,
    onSelect: noop
  }

  _id = this.props.id || uuid()

  componentDidMount() {
    const { focusGroup } = this.context.itemList
    const { index, value, label } = this.props
    const node = findDOMNode(this)

    this._member = {
      id: this._id,
      node,
      index,
      value,
      label: label || node.innerHTML
    }

    focusGroup.addMember(this._member)

    focusGroup.on('focus', this._handleMemberFocus)
    focusGroup.on('select', this._handleMemberSelect)

    if (focusGroup.getMembers().length === 1) {
      focusGroup.activate()
    }
  }

  componentWillUnmount() {
    const { focusGroup } = this.context.itemList

    focusGroup.removeMember(this._member)

    focusGroup.off('focus', this._handleMemberFocus)
    focusGroup.off('select', this._handleMemberSelect)

    if (focusGroup.getMembers().length <= 0) {
      focusGroup.deactivate()
    }
  }

  getMember() {
    return this._member
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

  render() {
    const { component, role, children } = this.props
    const props = specialAssign({
      role,
      id: this._id,
      tabIndex: -1
    }, this.props, checkedProps)

    if (typeof children === 'function') {
      return children(props)
    }

    return createElement(component, props, children)
  }
}

export default Item
