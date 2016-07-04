import React, { Component, PropTypes, createElement } from 'react'
import createFocusGroup from 'focus-group'
import EventsHandler from './events-handler'
import specialAssign from './special-assign'

const isTarget = (node, target) => (node === target || node.contains(target))

const checkedProps = {
  tag:               PropTypes.string,
  children:          PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
  stringSearch:      PropTypes.bool,
  forwardArrows:     PropTypes.arrayOf(PropTypes.string),
  backArrows:        PropTypes.arrayOf(PropTypes.string),
  wrap:              PropTypes.bool,
  stringSearch:      PropTypes.bool,
  stringSearchDelay: PropTypes.number,
  onSelection:       PropTypes.func.isRequired,
  closeOnSelection:  PropTypes.bool
}

class AriaManager extends Component {
  static childContextTypes = {
    ariaManager: PropTypes.object.isRequired
  }

  static propTypes = checkedProps

  static defaultProps = {
    tag:               'div',
    stringSearch:      true,
    forwardArrows:     ['right', 'down'],
    backArrows:        ['left', 'up'],
    wrap:              true,
    stringSearch:      true,
    stringSearchDelay: 600,
    onSelection:       () => null,
    closeOnSelection:  true
  }

  state = {
    isOpen: false
  }

  _focusGroup = createFocusGroup(this.props)
  _toggle     = null
  _menu       = null
  _items      = []

  getChildContext() {
    return {
      ariaManager: {
        isOpen:      this.state.isOpen,
        onSelection: this._onSelection,
        setToggle:   this._setToggle,
        setMenu:     this._setMenu,
        addItem:     this._addItem,
        removeItem:  this._removeItem,
        clearItems:  this._clearItems,
        focusItem:   this._focusItem,
        openMenu:    this._openMenu,
        closeMenu:   this._closeMenu,
        toggleMenu:  this._toggleMenu
      }
    }
  }

  componentWillMount() {
    EventsHandler.add(this)
  }

  componentWillUnmount() {
    this._focusGroup.deactivate()
    this._toggle = null
    this._menu   = null
    this._items  = []

    EventsHandler.remove(this)
  }

  _onTap(e) {
    const { target } = e
    const toggleDisabled = this._toggle.getAttribute('disabled')

    if (isTarget(this._toggle, target) && toggleDisabled === null) {
      this._toggleMenu()
    }
    else if (this._menu && !isTarget(this._menu, target)) {
      this._closeMenu(false)
    }
    else {
      for (let i = this._items.length; i--;) {
        const item = this._items[i]
        if (item.node === target) {
          this._onSelection(item, e)
        }
      }
    }
  }

  _onKeyDown(e) {
    const { key, target } = e

    if (this.state.isOpen) {
      if (key === 'Tab') {
        this._closeMenu(false)
      }
      else if (key === 'Escape') {
        e.preventDefault()
        this._closeMenu()
      }
      else if (['Enter', ' '].indexOf(key) > -1) {
        for (let i = this._items.length; i--;) {
          const item = this._items[i]
          if (item.node === target) {
            e.preventDefault()
            this._onSelection(item, e)
          }
        }
      }
    }
    else if (['ArrowUp', 'ArrowDown', 'Enter', ' '].indexOf(key) > -1) {
      if (isTarget(this._toggle, target)) {
        e.preventDefault()
        this._openMenu()
      }
    }
  }

  _onSelection(item, e) {
    const value = item.value || item.node.innerHTML

    if (this.props.closeOnSelection) {
      this._closeMenu()
    }

    this.props.onSelection(value, e)
  }

  _setToggle = (node) => {
    this._toggle = node
  }

  _setMenu = (node) => {
    this._menu = node
  }

  _addItem = (item) => {
    this._items.push(item)
    this._focusGroup.addMember(item)
  }

  _removeItem = (item) => {
    const pos = this._items.indexOf(item)
    if (pos > -1) {
      this._items.splice(pos, 1)
    }
    this._focusGroup.removeMember(item)
  }

  _clearItems = () => {
    this._focusGroup.clearMembers()
  }

  _focusItem = (index) => {
    this._focusGroup.focusNodeAtIndex(index)
  }

  _openMenu = (focusMenu = true) => {
    if (this.state.isOpen) return;

    this.setState({ isOpen: true })

    this._focusGroup.activate()

    if (focusMenu) {
      this._focusItem(0)
    }
  }

  _closeMenu = (focusToggle = true) => {
    if (!this.state.isOpen) return;

    this.setState({ isOpen: false })

    this._focusGroup.deactivate()

    if (focusToggle) {
      this._toggle.focus()
    }
  }

  _toggleMenu = () => {
    if (!this.state.isOpen) {
      this._openMenu()
    } else {
      this._closeMenu()
    }
  }

  render() {
    const { tag, children } = this.props
    const props = specialAssign({}, this.props, checkedProps)
    if (typeof children === 'function') {
      return children(this.state.isOpen)
    }
    return createElement(tag, props, children)
  }
}

export default AriaManager
