import React, { Component, PropTypes, createElement } from 'react'
import createFocusGroup from 'focus-group'
import noScroll from 'no-scroll'
import EventsHandler from './events-handler'
import specialAssign from './special-assign'

const isTarget = (node, target) => (node === target || node.contains(target))

const KEYS = {
  tab:        9,
  escape:     27,
  end:        35,
  home:       36,
  arrowLeft:  37,
  arrowUp:    38,
  arrowRight: 39,
  arrowDown:  40,
}

const checkedProps = {
  type:                 PropTypes.oneOf(['menu', 'popover', 'modal', 'tooltip', 'alert', 'tabs', 'accordion']).isRequired,
  tag:                  PropTypes.string,
  isOpen:               PropTypes.bool,
  trapFocus:            PropTypes.bool,
  freezeScroll:         PropTypes.bool,
  activeTabId:          PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
  collapsible:          PropTypes.bool,
  openPopoverOn:        PropTypes.oneOf(['tap', 'hover']),
  closeOnOutsideClick:  PropTypes.bool,
  closeOnItemSelection: PropTypes.bool,
  accordion:            PropTypes.bool,
  onPopoverOpen:        PropTypes.func,
  onPopoverClose:       PropTypes.func,
  onItemSelection:      PropTypes.func,
}

class Manager extends Component {
  static childContextTypes = {
    ariaManager: PropTypes.object.isRequired
  }

  static propTypes = checkedProps

  static defaultProps = {
    tag:                  'div',
    isOpen:               false,
    trapFocus:            false,
    freezeScroll:         false,
    keybindings: {
      next:  [{ keyCode: KEYS.arrowDown }, { keyCode: KEYS.arrowRight }],
      prev:  [{ keyCode: KEYS.arrowUp }, { keyCode: KEYS.arrowLeft }],
      first: { keyCode: KEYS.home },
      last:  { keyCode: KEYS.end }
    },
    wrap:                 true,
    stringSearch:         true,
    stringSearchDelay:    600,
    collapsible:          false,
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
      isPopoverOpen: props.isOpen
    }

    this._focusGroup  = createFocusGroup(props)
    this._toggle      = null
    this._popover     = null
    this._members     = []
    this._panels      = []
    this._activeTabId = props.activeTabId
    this._uuid        = 'RA' + Math.abs(~~(Math.random() * new Date()))
  }

  getChildContext() {
    return {
      ariaManager: {
        uuid:            this._uuid,
        type:            this.props.type,
        trapFocus:       this.props.trapFocus,
        initialFocus:    this.props.initialFocus,
        isPopoverOpen:   this.state.isPopoverOpen,
        onItemSelection: this._onItemSelection,
        setToggleNode:   this._setToggleNode,
        setPopoverNode:  this._setPopoverNode,
        addMember:       this._addMember,
        addPanel:        this._addPanel,
        removeMember:    this._removeMember,
        activateTab:     this._activateTab,
        focusItem:       this._focusItem,
        openPopover:     this.openPopover,
        closePopover:    this.closePopover,
        togglePopover:   this.togglePopover
      }
    }
  }

  componentWillMount() {
    this._focusGroup.activate()
    EventsHandler.add(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isOpen !== nextProps.isOpen) {
      this.setState({ isPopoverOpen: nextProps.isOpen })
    }
  }

  componentWillUnmount() {
    this._focusGroup.deactivate()
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

    if (this._toggle && this._toggle.tagName !== 'INPUT') {
      const toggleDisabled = this._toggle.getAttribute('disabled')

      if (isTarget(this._toggle, target) && toggleDisabled === null) {
        if (openPopoverOn === 'tap') {
          this.togglePopover(false)
        } else {
          this.openPopover(false)
        }
        return
      }
      else if (closeOnOutsideClick && this._popover && !isTarget(this._popover, target)) {
        this.closePopover(false)
        return
      }
    }

    for (let i = this._members.length; i--;) {
      const member = this._members[i]
      if (member.node === target) {
        if (member.type === 'item') {
          this._onItemSelection(member, e)
        } else {
          this._activateTab(member.id)
        }
        return
      }
    }
  }

  _onKeyDown({ keyCode }) {
    if (this.state.isPopoverOpen) {
      if (!this.props.trapFocus && keyCode === KEYS.tab) {
        this.closePopover(false)
      }
      else if (keyCode === KEYS.escape) {
        this.closePopover()
      }
    }
  }

  _onItemSelection = (item, e) => {
    const value = item.value || item.node.innerHTML

    if (this.props.closeOnItemSelection) {
      this.closePopover()
    }

    this.props.onItemSelection(value, e)
  }

  _setToggleNode = (node) => {
    this._toggle = node
  }

  _setPopoverNode = (node) => {
    this._popover = node
  }

  _addMember = (member) => {
    const { activeTabId } = this.props
    const { id, index, node, text } = member

    if (index === undefined) {
      this._members.push(member)
    } else {
      this._members.splice(index, 0, member)
    }

    this._focusGroup.addMember({
      node,
      text: text || node.innerHTML
    })

    if (member.type === 'tab') {
      if (activeTabId === id) {
        this._activateTab(activeTabId, true, false)
      } else {
        this._handleFirstTabSelection(id)
      }
    }
  }

  _removeMember = (member) => {
    const pos = this._members.indexOf(member)

    if (pos > -1) {
      this._members.splice(member, 1)
      this._focusGroup.removeMember(member.node)
    }
  }

  _focusItem = (index) => {
    this._focusGroup.focusNodeAtIndex(index)
  }

  openPopover = (focusFirstMember = true) => {
    const { freezeScroll, onPopoverOpen } = this.props

    if (this.state.isPopoverOpen) return;

    this.setState({ isPopoverOpen: true })

    if (freezeScroll) {
      noScroll.on()
    }

    onPopoverOpen()

    if (focusFirstMember) {
      setTimeout(() => {
        this._focusItem(0)
      }, 60)
    }
  }

  closePopover = (focusToggle = true) => {
    const { freezeScroll, onPopoverClose } = this.props

    if (!this.state.isPopoverOpen) return;

    this.setState({ isPopoverOpen: false })

    if (freezeScroll) {
      noScroll.off()
    }

    onPopoverClose()

    if (focusToggle) {
      setTimeout(() => {
        this._toggle.focus()
      }, 60)
    }
  }

  togglePopover = (focus) => {
    if (!this.state.isPopoverOpen) {
      this.openPopover(focus)
    } else {
      this.closePopover(focus)
    }
  }

  _addPanel = (panel) => {
    const { activeTabId } = this.props
    const { controlledBy } = panel

    this._panels.push(panel)

    if (activeTabId === controlledBy) {
      this._activateTab(activeTabId, true, false)
    } else {
      this._handleFirstTabSelection(panel.controlledBy)
    }
  }

  _focusTab = (id) => {
    const tabToFocus = this._members.filter(tab => tab.id === id)
    if (tabToFocus) {
      tabToFocus.node.focus()
    }
  }

  _activateTab = (id, forceActivate, shouldChange = true) => {
    const { type, onChange } = this.props

    if (type === 'tabs') {
      if (id === this._activeTabId && !forceActivate) {
        return
      } else {
        this._activeTabId = id
      }
    }

    // shouldChange makes sure we don't fire callbacks when we don't need to
    if (shouldChange && typeof onChange === 'function') {
      onChange(id)

      // if onChange is being used we don't need to go any farther since the
      // user is now controlling state
      return
    }

    for (let i = this._members.length; i--;) {
      const tab = this._members[i]
      if (type === 'accordion') {
        if (tab.id === id) {
          tab.toggleActiveState()
        }
      } else {
        tab.setActiveState(id === tab.id)
      }
    }
    for (let i = this._panels.length; i--;) {
      const panel = this._panels[i]
      if (type === 'accordion') {
        if (panel.controlledBy === id) {
          panel.toggleActiveState()
        }
      } else {
        panel.setActiveState(id === panel.controlledBy)
      }
    }
  }

  _handleFirstTabSelection(id) {
    if (this.props.type === 'tabs' && !this._activeTabId || id === this._activeTabId) {
      this._activateTab(id, true, false)
    }
  }

  render() {
    const { tag, children } = this.props
    const props = specialAssign({}, this.props, checkedProps)

    if (typeof children === 'function') {
      return children(this.state.isPopoverOpen)
    }

    return createElement(tag, props, children)
  }
}

export default Manager
