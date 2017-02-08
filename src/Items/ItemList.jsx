import React, { Component, PropTypes, createElement, cloneElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import { scopeFocus, unscopeFocus } from 'a11y-focus-scope'
import scrollIntoView from 'scroll-into-view'
import FocusGroup from '../utils/FocusGroup'
import specialAssign from '../utils/special-assign'

const checkedProps = {
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  rootNode: PropTypes.any,
  scopeFocus: PropTypes.bool,
  initialFocus: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
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
    initialFocus: 0,
    onItemFocus: noop,
    onItemSelection: noop
  }

  _focusGroup = new FocusGroup()

  getChildContext() {
    return {
      itemList: {
        focusGroup: this._focusGroup,
        focusItem: this.focusItem,
        onItemSelection: this.props.onItemSelection
      }
    }
  }

  componentDidMount() {
    this._focusGroup.on('focus', this._handleFocus)
    this._focusGroup.on('select', this._handleSelect)

    if (this.props.rootNode) {
      this._focusGroup.setRootNode(this.props.rootNode)
    }

    if (this.props.scopeFocus) {
      scopeFocus(findDOMNode(this))
    }

    if (this.props.initialFocus !== false) {
      this._focusGroup.focus(this.props.initialFocus)
    }
  }

  componentWillUnmount() {
    this._focusGroup.off('focus', this._handleFocus)
    this._focusGroup.off('select', this._handleSelect)

    if (this.props.scopeFocus) {
      unscopeFocus()
    }
  }

  _handleFocus = (member, index) => {
    scrollIntoView(member.node, { time: 0, align: { top: 1 }})
    this.props.onItemFocus(member, index)
  }

  _handleSelect = (member, event) => {
    this.props.onItemSelection(member, event)
  }

  focusItem = (index) => {
    this._focusGroup.focus(index)
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
