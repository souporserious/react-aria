import React, { Component, PropTypes, createElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import { scopeFocus, unscopeFocus } from 'a11y-focus-scope'
import noScroll from 'no-scroll'
import specialAssign from '../utils/special-assign'

const checkedProps = {
  tag:                 PropTypes.string,
  role:                PropTypes.oneOf(['menu', 'popover', 'modal', 'tooltip', 'alert', 'listbox']),
  scopeFocus:          PropTypes.bool,
  returnFocus:         PropTypes.bool,
  freezeScroll:        PropTypes.bool,
  closeOnEscapeKey:    PropTypes.bool,
  closeOnOutsideClick: PropTypes.bool,
  onRequestClose:      PropTypes.func,
  children:            PropTypes.oneOfType([PropTypes.func, PropTypes.node])
}
const noop = () => null

class Overlay extends Component {
  static contextTypes = {
    overlayManager: PropTypes.object
  }

  static propTypes = checkedProps

  static defaultProps = {
    tag:                 'div',
    role:                'popover',
    returnFocus:         true,
    closeOnEscapeKey:    true,
    closeOnOutsideClick: true,
    onRequestClose:      noop,
  }

  componentDidMount() {
    this._lastActiveElement = document.activeElement

    if (this.props.scopeFocus) {
      scopeFocus(findDOMNode(this))
    }

    if (this.props.freezeScroll) {
      noScroll.on()
    }

    this._registerEvents()
  }

  componentWillUnmount() {
    if (this.props.scopeFocus) {
      unscopeFocus()
    }

    if (this.props.returnFocus) {
      this._lastActiveElement.focus()
    }

    if (this.props.freezeScroll) {
      noScroll.off()
    }

    this._unregisterEvents()
  }

  _registerEvents() {
    if (this.props.closeOnEscapeKey) {
      document.addEventListener('keydown', this._handleDocumentKeyDown, true)
    }

    if (this.props.closeOnOutsideClick) {
      document.addEventListener('click', this._handleDocumentClick, true)
    }
  }

  _unregisterEvents() {
    if (this.props.closeOnEscapeKey) {
      document.removeEventListener('keydown', this._handleDocumentKeyDown, true)
    }

    if (this.props.closeOnOutsideClick) {
      document.removeEventListener('click', this._handleDocumentClick, true)
    }
  }

  _requestClose() {
    if (
      this.context.overlayManager &&
      typeof this.props.isOpen === 'undefined'
    ) {
      this.context.overlayManager.close()
    }
    this.props.onRequestClose()
  }

  _handleDocumentKeyDown = ({ keyCode }) => {
    if (keyCode === 27) { // Escape
      this._requestClose()
    }
  }

  _handleDocumentClick = (e) => {
    const node = findDOMNode(this)
    if (
      node &&
      node !== e.target &&
      !node.contains(e.target) &&
      this._lastActiveElement !== e.target
    ) {
      e.stopPropagation()
      this._requestClose()
    }
  }

  render() {
    const { overlayManager } = this.context
    const { tag, role, isOpen, children } = this.props
    const props = specialAssign({
      role
    }, this.props, checkedProps)

    if (typeof children === 'function') {
      return children(props, overlayManager.isOpen)
    }

    const component = createElement(tag, props, children)

    if (overlayManager) {
      if (overlayManager.isOpen) {
        return component
      } else {
        return null
      }
    } else {
      return component
    }
  }
}

export default Overlay
