import React, { Component, PropTypes, createElement } from 'react'
import createFocusGroup from 'focus-group'
import EventsHandler from './events-handler'
import specialAssign from './special-assign'

const isTarget = (node, target) => (node === target || node.contains(target))

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
  trapFocus:            PropTypes.bool,
  children:             PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
  keybindings: PropTypes.shape({
    next:  PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    prev:  PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    first: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    last:  PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  }),
  wrap:                 PropTypes.bool,
  stringSearch:         PropTypes.bool,
  stringSearchDelay:    PropTypes.number,
  openPopoverOn:        PropTypes.oneOf(['tap', 'hover']),
  closeOnOutsideClick:  PropTypes.bool,
  closeOnItemSelection: PropTypes.bool,
  onPopoverOpen:        PropTypes.func,
  onPopoverClose:       PropTypes.func,
  onItemSelection:      PropTypes.func,
}

class AriaManager extends Component {
  static childContextTypes = {
    ariaManager: PropTypes.object.isRequired
  }

  static propTypes = checkedProps

  static defaultProps = {
    tag:                  'div',
    trapFocus:            false,
    keybindings: {
      next:  [{ keyCode: KEYS.arrowDown }, { keyCode: KEYS.arrowRight }],
      prev:  [{ keyCode: KEYS.arrowUp }, { keyCode: KEYS.arrowLeft }],
      first: { keyCode: KEYS.home },
      last:  { keyCode: KEYS.end }
    },
    wrap:                 true,
    stringSearch:         true,
    stringSearchDelay:    600,
    openPopoverOn:        'tap',
    closeOnOutsideClick:  true,
    closeOnItemSelection: true,
    onPopoverOpen:        () => null,
    onPopoverClose:       () => null,
    onItemSelection:      () => null,
  }

  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
    this._focusGroup = createFocusGroup(props)
    this._toggle     = null
    this._popover    = null
    this._items      = []
  }

  getChildContext() {
    return {
      ariaManager: {
        trapFocus:       this.props.trapFocus,
        initialFocus:    this.props.initialFocus,
        isOpen:          this.state.isOpen,
        onItemSelection: this._onItemSelection,
        setToggleNode:   this._setToggleNode,
        setPopoverNode:  this._setPopoverNode,
        addItem:         this._addItem,
        removeItem:      this._removeItem,
        clearItems:      this._clearItems,
        focusItem:       this._focusItem,
        openPopover:     this._openPopover,
        closePopover:    this._closePopover,
        togglePopover:   this._togglePopover
      }
    }
  }

  componentWillMount() {
    EventsHandler.add(this, this.props.openPopoverOn)
  }

  componentWillUnmount() {
    this._focusGroup.deactivate()
    this._toggle  = null
    this._popover = null
    this._items   = []

    EventsHandler.remove(this)
  }

  _onTap(e) {
    if (this.props.openPopoverOn === 'tap') {
      this._handleTapOrHover(e)
    }
  }

  _onHover(e) {
    if (this.props.openPopoverOn === 'hover') {
      this._handleTapOrHover(e)
    }
  }

  _handleTapOrHover(e) {
    const { openPopoverOn, closeOnOutsideClick } = this.props
    const { target } = e
    const toggleDisabled = this._toggle.getAttribute('disabled')

    if (isTarget(this._toggle, target) && toggleDisabled === null) {
      if (openPopoverOn === 'tap') {
        this._togglePopover(false)
      } else {
        this._openPopover(false)
      }
    }
    else if (closeOnOutsideClick && this._popover && !isTarget(this._popover, target)) {
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

    this.props.onPopoverOpen()

    this._focusGroup.activate()

    if (focusPopover) {
      // setTimeout allows animated popovers to still focus
      setTimeout(() => {
        this._focusItem(0)
      }, 60)
    }
  }

  _closePopover = (focusToggle = true) => {
    if (!this.state.isOpen) return;

    this.setState({ isOpen: false })

    this.props.onPopoverClose()

    this._focusGroup.deactivate()

    if (focusToggle) {
      this._toggle.focus()
    }
  }

  _togglePopover = (focus) => {
    if (!this.state.isOpen) {
      this._openPopover(focus)
    } else {
      this._closePopover(focus)
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
