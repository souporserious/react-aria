import React, { Component, PropTypes, createElement, cloneElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import { scopeFocus, unscopeFocus } from 'a11y-focus-scope'
import scrollIntoView from 'scroll-into-view'
import Members from '../utils/Members'
import specialAssign from '../utils/special-assign'

const checkedProps = {
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  rootNode: PropTypes.any,
  scopeFocus: PropTypes.bool,
  currentFocus: PropTypes.number,
  onItemFocus: PropTypes.func,
  onItemSelection: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
}
const noop = () => null

class ItemList extends Component {
  static childContextTypes = {
    itemList: PropTypes.object
  }

  static propTypes = checkedProps

  static defaultProps = {
    tag: false,
    currentFocus: 0,
    onItemFocus: noop,
    onItemSelection: noop
  }

  state = {
    currentFocus: this.props.currentFocus
  }

  _members = new Members()

  getChildContext() {
    return {
      itemList: {
        members: this._members,
        onItemSelection: this.props.onItemSelection
      }
    }
  }

  componentDidMount() {
    this._lastActiveElement = document.activeElement

    this._members.on('focus', this._handleFocus)
    this._members.on('select', this._handleSelect)

    if (this.props.rootNode) {
      this._members.setRootNode(this.props.rootNode)
    }

    if (this.props.scopeFocus) {
      scopeFocus(findDOMNode(this))
    }

    if (this.props.currentFocus !== false) {
      this._members.focus(this.props.currentFocus)
    }
  }

  componentDidUpdate(nextProps) {
    if (this.props.currentFocus !== nextProps.currentFocus) {
      this._members.focus(nextProps.currentFocus)
    }
  }

  componentWillUnmount() {
    this._members.off('focus', this._handleFocus)
    this._members.off('select', this._handleSelect)

    if (this.props.scopeFocus) {
      unscopeFocus()
    }

    if (this._lastActiveElement) {
      this._lastActiveElement.focus()
    }
  }

  _handleFocus = (member, index) => {
    scrollIntoView(member.node, { time: 0, align: { top: 1 }})
    this.props.onItemFocus(member, index)
  }

  _handleSelect = (member, event) => {
    this.props.onItemSelection(member, event)
  }

  getItems = () => {
    return this._members
  }

  focusItem = (index) => {
    this._members.focus(index)
  }

  render() {
    const { tag, children } = this.props
    const props = specialAssign({}, this.props, checkedProps)

    if (!tag) {
      return children
    }

    return createElement(tag, props, children)
  }
}

export default ItemList
