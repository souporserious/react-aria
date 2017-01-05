import React, { Component, PropTypes, createElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import focusTrap from 'focus-trap'
import noScroll from 'no-scroll'
import Members from '../helpers/Members'
import keys from '../helpers/keys'
import specialAssign from '../helpers/special-assign'

const checkedProps = {
  tag: PropTypes.string,
  id: PropTypes.string,
  role: PropTypes.oneOf(['menu', 'popover', 'modal', 'tooltip', 'alert']),
  focusOnMount: PropTypes.bool,
  trapFocus: PropTypes.bool,
  initialFocus: PropTypes.any,
  freezeScroll: PropTypes.bool,
  closeOnEscapeKey: PropTypes.bool,
  closeOnOutsideClick: PropTypes.bool,
  onRequestClose: PropTypes.func,
  onItemSelection: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
}

class Overlay extends Component {
  static childContextTypes = {
    overlayManager: PropTypes.object
  }

  static propTypes = checkedProps

  static defaultProps = {
    tag: 'div',
    role: 'popover',
    initialFocus: 'first',
    closeOnEscapeKey: true,
    closeOnOutsideClick: true,
    onRequestClose: () => null,
    onItemSelection: () => null
  }

  members = new Members(this.props)

  getChildContext() {
    return {
      overlayManager: {
        members: this.members,
        onItemSelection: this.props.onItemSelection
      }
    }
  }

  componentDidMount() {
    const { trapFocus, initialFocus, freezeScroll } = this.props
    this._lastActiveElement = document.activeElement

    if (trapFocus) {
      this._focusTrap = focusTrap(findDOMNode(this), {
        initialFocus,
        escapeDeactivates: false,
        clickOutsideDeactivates: true
      }).activate()
    }

    if (freezeScroll) {
      noScroll.on()
    }

    if (initialFocus === 'first') {
      this.members.focus(0)
    }

    this._registerEvents()
  }

  componentWillUnmount() {
    if (this.props.trapFocus) {
      this._focusTrap.deactivate()
    }

    if (this.props.freezeScroll) {
      noScroll.off()
    }

    if (this._lastActiveElement) {
      this._lastActiveElement.focus()
    }

    this._unregisterEvents()
  }

  getMembers = () => {
    return this.members
  }

  focusItem = (index) => {
    this.members.focus(index)
  }

  _registerEvents() {
    document.addEventListener('keydown', this._handleDocumentKeyDown)

    if (this.props.closeOnOutsideClick) {
      document.addEventListener('click', this._handleDocumentClick)
    }
  }

  _unregisterEvents() {
    document.removeEventListener('keydown', this._handleDocumentKeyDown)

    if (this.props.closeOnOutsideClick) {
      document.removeEventListener('click', this._handleDocumentClick)
    }
  }

  _handleDocumentKeyDown = ({ keyCode }) => {
    if (keyCode === keys.escape) {
      this.props.onRequestClose()
    }
  }

  _handleDocumentClick = ({ target }) => {
    const node = findDOMNode(this)
    if ((node !== target) && !node.contains(target)) {
      this.props.onRequestClose()
    }
  }

  _getProps() {
    const { role, id } = this.props
    const props = {}

    if (role === 'menu') {
      props['role'] = 'menu'
    }
    else if (role === 'modal') {
      props['role'] = 'dialog'
    }
    else if (role === 'alert') {
      props['role'] = 'alertdialog'
    }
    else if (role === 'tooltip') {
      props['id'] = id
      props['role'] = 'tooltip'
    }
    else if (role === 'popover') {
      props['aria-labelledby'] = id
    }

    return specialAssign(props, this.props, checkedProps)
  }

  render() {
    const { tag, children } = this.props
    const props = this._getProps()

    if (typeof children === 'function') {
      return children(props)
    }

    return createElement(tag, props, children)
  }
}

export default Overlay
