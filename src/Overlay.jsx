import React, { Component, PropTypes, createElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import { scopeFocus, unscopeFocus } from 'a11y-focus-scope'
import noScroll from 'no-scroll'
import specialAssign from './utils/special-assign'

const checkedProps = {
  tag: PropTypes.string,
  role: PropTypes.oneOf(['menu', 'popover', 'modal', 'tooltip', 'alert', 'listbox']),
  scopeFocus: PropTypes.bool,
  returnFocus: PropTypes.bool,
  freezeScroll: PropTypes.bool,
  closeOnEscapeKey: PropTypes.bool,
  closeOnOutsideClick: PropTypes.bool,
  onRequestClose: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
}
const noop = () => null

class Overlay extends Component {
  static propTypes = checkedProps

  static defaultProps = {
    tag: 'div',
    role: 'popover',
    returnFocus: true,
    closeOnEscapeKey: true,
    closeOnOutsideClick: true,
    onRequestClose: noop,
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

  _handleDocumentKeyDown = ({ keyCode }) => {
    if (keyCode === 27) { // Escape
      this.props.onRequestClose()
    }
  }

  _handleDocumentClick = (e) => {
    const node = findDOMNode(this)
    if ((node !== e.target) && !node.contains(e.target) && this._lastActiveElement !== e.target) {
      e.stopPropagation()
      this.props.onRequestClose()
    }
  }

  render() {
    const { tag, role, children } = this.props
    const props = specialAssign({
      role
    }, this.props, checkedProps)

    if (typeof children === 'function') {
      return children(props)
    }

    return createElement(tag, props, children)
  }
}

export default Overlay
