import React, { Component, PropTypes, createElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import focusTrap from 'focus-trap'
import noScroll from 'no-scroll'
import Members from '../Members'
import keys from '../keys'
import specialAssign from '../special-assign'
import { registerPopover, unregisterPopover, getToggle } from './state-manager'

const isOutsideElement = (node, target) => (
  (node && target) && (node !== target) && !node.contains(target)
)

const checkedProps = {
  tag: PropTypes.string,
  id: PropTypes.any.isRequired,
  type: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  trapFocus: PropTypes.bool,
  freezeScroll: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onOutsideClick: PropTypes.func,
  onItemSelection: PropTypes.func
}

class Overlay extends Component {
  static childContextTypes = {
    overlayManager: PropTypes.object
  }

  static propTypes = checkedProps

  static defaultProps = {
    tag: 'div',
    type: 'popover',
    isOpen: true,
    onOpen: () => null,
    onClose: () => null,
    onOutsideClick: () => null,
    onItemSelection: () => null
  }

  state = {
    isOpen: this.props.isOpen
  }

  members = new Members()

  getChildContext() {
    return {
      overlayManager: {
        members: this.members,
        onItemSelection: this.props.onItemSelection
      }
    }
  }

  componentDidMount() {
    registerPopover(this.props.id, this)

    if (this.props.trapFocus) {
      this._focusTrap = focusTrap(findDOMNode(this), {
        initialFocus: this.props.initialFocus,
        escapeDeactivates: false,
        clickOutsideDeactivates: true
      }).activate()
    }

    this._registerEvents()
  }

  componentWillReceiveProps({ isOpen }) {
    if (this.props.isOpen !== isOpen) {
      this.setState({ isOpen })

      // make sure click handler is added and removed when isOpen changes
      if (isOpen) {
        this._registerEvents()
      } else {
        this._unregisterEvents()
      }
    }
  }

  componentWillUnmount() {
    unregisterPopover(this.props.id)

    if (this.props.trapFocus) {
      this._focusTrap.deactivate()
    }

    this._unregisterEvents()
  }

  _registerEvents() {
    document.addEventListener('keydown', this._handleDocumentKeyDown)

    if (typeof this.props.onOutsideClick === 'function') {
      document.addEventListener('click', this._handleDocumentClick)
    }
  }

  _unregisterEvents() {
    document.removeEventListener('keydown', this._handleDocumentKeyDown)

    if (typeof this.props.onOutsideClick === 'function') {
      document.removeEventListener('click', this._handleDocumentClick)
    }
  }

  open = (focusFirstMember = true) => {
    this.setState({ isOpen: true }, () => {
      if (this.props.freezeScroll) {
        noScroll.on()
      }

      this.props.onOpen()

      if (focusFirstMember) {
        setTimeout(() => {
          this.members.focus(0)
        }, 0)
      }
    })
  }

  close = (focusToggle = true) => {
    this.setState({ isOpen: false }, () => {
      if (this.props.freezeScroll) {
        noScroll.off()
      }

      this.props.onClose()

      if (focusToggle) {
        setTimeout(() => {
          const toggle = getToggle(this.props.id)
          findDOMNode(toggle).focus()
        }, 0)
      }
    })
  }

  toggle = () => {
    if (this.state.isOpen) {
      this.close()
    } else {
      this.open()
    }
  }

  _handleDocumentKeyDown = ({ keyCode }) => {
    if (this.state.isOpen) {
      if (!this.props.trapFocus && keyCode === keys.tab) {
        this.close(false)
      } else if (keyCode === keys.escape) {
        this.close()
      }
    }
  }

  _handleDocumentClick = ({ target }) => {
    const toggle = getToggle(this.props.id)
    if (isOutsideElement(findDOMNode(this), target) &&
        findDOMNode(toggle) !== target) {
      this.props.onOutsideClick()
    }
  }

  _getProps() {
    const { type, id, isOpen } = this.props
    const props = {
      'aria-hidden': !isOpen
    }

    if (type === 'menu') {
      props['role'] = 'menu'
    }
    else if (type === 'modal') {
      props['role'] = 'dialog'
    }
    else if (type === 'alert') {
      props['role'] = 'alertdialog'
    }
    else if (type === 'tooltip') {
      props['id'] = id
      props['role'] = 'tooltip'
    }
    else if (type === 'popover') {
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
