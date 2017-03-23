import React, { Component, PropTypes, createElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import { scopeFocus, unscopeFocus } from 'a11y-focus-scope'
import noScroll from 'no-scroll'
import specialAssign from '../utils/special-assign'

const checkedProps = {
  component:           PropTypes.any,
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
    component:           'div',
    role:                'popover',
    returnFocus:         true,
    closeOnEscapeKey:    true,
    closeOnOutsideClick: true,
    onRequestClose:      noop,
  }

  componentDidMount() {
    this._lastActiveElement = document.activeElement

    if (this.context.overlayManager) {
      this.context.overlayManager.setOverlay(this)
    }

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

    // make sure to only return focus if another focusable item was not clicked
    // clicking an element that is not focusable returns document.body as the activeElement
    if (this.props.returnFocus && document.activeElement === document.body) {
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
    const { overlayManager } = this.context
    if (overlayManager && overlayManager.getOverlay() === this) {
      overlayManager.close()
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
    const { component, role, children } = this.props
    const props = specialAssign({
      role
    }, this.props, checkedProps)

    if (typeof children === 'function') {
      return children(props, overlayManager && overlayManager.isOpen)
    }

    if (overlayManager) {
      if (overlayManager.isOpen) {
        return createElement(component, props, children)
      } else {
        return null
      }
    } else {
      return createElement(component, props, children)
    }
  }
}

export default Overlay
