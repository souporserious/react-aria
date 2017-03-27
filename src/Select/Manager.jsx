import React, { Component, PropTypes, createElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import uuid from '../utils/uuid'
import specialAssign from '../utils/special-assign'

const checkedProps = {
  component: PropTypes.any,
  id: PropTypes.any,
  children:  PropTypes.node
}

class Select extends Component {
  static childContextTypes = {
    select: PropTypes.object
  }

  static propTypes = checkedProps

  static defaultProps = {
    component: 'div'
  }

  state = {
    rootNode: null,
    activeDescendant: {}
  }

  _id = this.props.id || uuid()

  getChildContext() {
    return {
      select: {
        uuid: this._id,
        setRootNode: this._setRootNode,
        getRootNode: this._getRootNode,
        setActiveDescendant: this._setActiveDescendant,
        getActiveDescendant: this._getActiveDescendant
      }
    }
  }

  _setRootNode = (node) => {
    this.setState({ rootNode: node })
  }

  _getRootNode = () => {
    return this.state.rootNode
  }

  _setActiveDescendant = (option) => {
    this.setState({ activeDescendant: option })
  }

  _getActiveDescendant = () => {
    return this.state.activeDescendant
  }

  render() {
    const { component, children, ...props } = this.props
    return component
      ? createElement(component, props, children)
      : children
  }
}

export default Select
