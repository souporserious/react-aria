import React, { Component, createElement } from 'react'
import PropTypes from 'prop-types'
import uuid from '../utils/uuid'

class Manager extends Component {
  static childContextTypes = {
    overlayManager: PropTypes.object
  }

  static propTypes = {
    component: PropTypes.any,
    children:  PropTypes.node
  }

  _id = this.props.id || uuid()

  state = {
    isOpen: false
  }

  getChildContext() {
    return {
      overlayManager: {
        setOverlay: this._setOverlay,
        getOverlay: this._getOverlay,
        id:         this._id,
        open:       this.open,
        close:      this.close,
        toggle:     this.toggle,
        isOpen:     this.state.isOpen,
      }
    }
  }

  _setOverlay = (component) => {
    if (!this._overlay) {
      this._overlay = component
    }
  }

  _getOverlay = (component) => {
    return this._overlay
  }

  open = () => {
    this.setState({ isOpen: true })
  }

  close = () => {
    this.setState({ isOpen: false })
  }

  toggle = () => {
    this.setState(state => ({ isOpen: !state.isOpen }))
  }

  render() {
    const { component, children, ...props } = this.props

    if (typeof children === 'function') {
      return children(this.state.isOpen)
    }

    return component
      ? createElement(component, props, children)
      : children
  }
}

export default Manager
