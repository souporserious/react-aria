import React, { Component, PropTypes, createElement } from 'react'
import createFocusGroup from 'focus-group'
import EventsHandler from './events-handler'
import specialAssign from './special-assign'

const isTarget = (node, target) => (node === target || node.contains(target))

// inspo:
// http://yuilibrary.com/yui/docs/node-focusmanager/node-focusmanager-button.html

const KEYS = {
  tab:        9,
  escape:     27,
  enter:      13,
  space:      32,
  end:        35,
  home:       36,
  arrowLeft:  37,
  arrowUp:    38,
  arrowRight: 39,
  arrowDown:  40,
}

const checkedProps = {
  tag:                  PropTypes.string,
  children:             PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
  stringSearch:         PropTypes.bool,
  forwardArrows:        PropTypes.arrayOf(PropTypes.string),
  backArrows:           PropTypes.arrayOf(PropTypes.string),
  wrap:                 PropTypes.bool,
  stringSearch:         PropTypes.bool,
  stringSearchDelay:    PropTypes.number,
  onItemSelection:      PropTypes.func.isRequired,
  closeOnItemSelection: PropTypes.bool
}

class AriaManager extends Component {
  static childContextTypes = {
    ariaManager: PropTypes.object.isRequired
  }

  static propTypes = checkedProps

  static defaultProps = {
    type:         'modal',
    trapFocus:    false,
    tag:          'div',
    stringSearch: true,
    keybindings:  {
      next:  [{ keyCode: KEYS.arrowDown }, { keyCode: KEYS.arrowRight }],
      prev:  [{ keyCode: KEYS.arrowUp }, { keyCode: KEYS.arrowLeft }],
      first: { keyCode: KEYS.home },
      last:  { keyCode: KEYS.end }
    },
    wrap:                 true,
    stringSearch:         true,
    stringSearchDelay:    600,
    onItemSelection:      () => null,
    onPopoverOpen:        () => null,
    onPopoverClose:       () => null,
    closeOnItemSelection: true
  }

  state = {
    isOpen: false
  }

  _focusGroup = createFocusGroup(this.props)
  _toggle     = null
  _popover    = null
  _items      = []

  getChildContext() {
    return {
      ariaManager: {
        type:           this.props.type,
        trapFocus:      this.props.trapFocus,
        initialFocus:   this.props.initialFocus,

        isOpen:         this.state.isOpen,

        onItemSelection: this._onItemSelection,

        setToggleNode:  this._setToggleNode,
        setPopoverNode: this._setPopoverNode,
        addItem:        this._addItem,
        removeItem:     this._removeItem,
        clearItems:     this._clearItems,
        focusItem:      this._focusItem,
        openPopover:    this._openPopover,
        closePopover:   this._closePopover,
        togglePopover:  this._togglePopover
      }
    }
  }

  componentWillMount() {
    EventsHandler.add(this)
  }

  componentWillUnmount() {
    this._focusGroup.deactivate()
    this._toggle  = null
    this._popover = null
    this._items   = []

    EventsHandler.remove(this)
  }

  _onTap(e) {
    const { target } = e
    const toggleDisabled = this._toggle.getAttribute('disabled')

    if (isTarget(this._toggle, target) && toggleDisabled === null) {
      this._togglePopover()
    }
    else if (this._popover && !isTarget(this._popover, target)) {
      this._closePopover(false)
    }
    else {
      for (let i = this._items.length; i--;) {
        const item = this._items[i]
        if (item.node === target) {
          this._onItemSelection(item, e)
        }
      }
    }
  }

  _onKeyDown(e) {
    const { keyCode, target } = e

    if (this.state.isOpen) {
      if (!this.props.trapFocus && keyCode === KEYS.tab) {
        this._closePopover(false)
      }
      else if (keyCode === KEYS.escape) {
        e.preventDefault()
        this._closePopover()
      }
      else if ([KEYS.enter, KEYS.space].indexOf(keyCode) > -1) {
        for (let i = this._items.length; i--;) {
          const item = this._items[i]
          if (item.node === target) {
            e.preventDefault()
            this._onItemSelection(item, e)
          }
        }
      }
    }
    else if ([KEYS.arrowUp, KEYS.arrowDown, KEYS.enter, KEYS.space].indexOf(keyCode) > -1) {
      if (isTarget(this._toggle, target)) {
        e.preventDefault()
        this._openPopover()
      }
    }
  }

  _onItemSelection(item, e) {
    const value = item.value || item.node.innerHTML

    if (this.props.closeOnItemSelection) {
      this._closePopover()
    }

    this.props.onItemSelection(value, e)
  }

  _setToggleNode = (node) => {
    this._toggle = node
  }

  _setPopoverNode = (node) => {
    this._popover = node
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

  _openPopover = (focusPopover = true) => {
    if (this.state.isOpen) return;

    this.setState({ isOpen: true })

    this._focusGroup.activate()

    this.props.onPopoverOpen()

    if (focusPopover) {
      this._focusItem(0)
    }
  }

  _closePopover = (focusToggle = true) => {
    if (!this.state.isOpen) return;

    this.setState({ isOpen: false })

    this._focusGroup.deactivate()

    this.props.onPopoverClose()

    if (focusToggle) {
      this._toggle.focus()
    }
  }

  _togglePopover = () => {
    if (!this.state.isOpen) {
      this._openPopover()
    } else {
      this._closePopover()
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
