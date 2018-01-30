import React, { Component, createElement, cloneElement } from 'react'
import PropTypes from 'prop-types'
import ReactDOM, { findDOMNode } from 'react-dom'
import FocusGroup from '../utils/FocusGroup'
import specialAssign from '../utils/special-assign'

const checkedProps = {
  component: PropTypes.any,
  rootNode: PropTypes.any,
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
    component: 'div',
    initialFocus: 0,
    onItemFocus: noop,
    onItemSelection: noop
  }

  _focusGroup = new FocusGroup()

  getChildContext() {
    return {
      itemList: {
        focusGroup: this._focusGroup,
        onItemSelection: this.props.onItemSelection
      }
    }
  }

  componentDidMount() {
    this._focusGroup.on('focus', this._handleItemFocus)
    this._focusGroup.on('select', this._handleItemSelect)

    if (this.props.rootNode) {
      this._focusGroup.setRootNode(this.props.rootNode)
    }

    if (this.props.initialFocus !== false) {
      this._focusGroup.focus(this.props.initialFocus)
    }
  }

  componentWillUnmount() {
    this._focusGroup.off('focus', this._handleItemFocus)
    this._focusGroup.off('select', this._handleItemSelect)
  }

  _handleItemFocus = (member, index) => {
    this.props.onItemFocus(member, index)
  }

  _handleItemSelect = (member, event) => {
    this.props.onItemSelection(member, event)
  }

  render() {
    const { component, children } = this.props
    const props = specialAssign({}, this.props, checkedProps)
    return component
      ? createElement(component, props, children)
      : children
  }
}

export default ItemList
