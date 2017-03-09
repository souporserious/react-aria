import React, { Component, PropTypes, createElement } from 'react'
import uuid from '../utils/uuid'

class Manager extends Component {
  static childContextTypes = {
    overlayManager: PropTypes.object
  }

  static propTypes = {
    tag:      PropTypes.any,
    children: PropTypes.node
  }

  _id = this.props.id || uuid()

  state = {
    isOpen: false
  }

  getChildContext() {
    return {
      overlayManager: {
        id:     this._id,
        open:   this.open,
        close:  this.close,
        toggle: this.toggle,
        isOpen: this.state.isOpen
      }
    }
  }

  open = () => {
    this.setState({ isOpen: true })
  }

  close = () => {
    this.setState({ isOpen: false })
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    const { tag, children, ...restProps } = this.props

    if (typeof children === 'function') {
      return children(this.state.isOpen)
    }

    return tag
      ? createElement(tag, restProps)
      : children
  }
}

export default Manager
