import React, { Component, PropTypes, createElement } from 'react'
import specialAssign from '../special-assign'

const checkedProps = {
  type: PropTypes.oneOf(['menu', 'popover', 'modal', 'tooltip', 'alert', 'tabs', 'accordion']).isRequired,
  tag: PropTypes.string,
  activeTabId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  collapsible: PropTypes.bool,
  accordion: PropTypes.bool,
}

class Manager extends Component {
  static childContextTypes = {
    ariaManager: PropTypes.object.isRequired
  }

  static propTypes = checkedProps

  static defaultProps = {
    tag:                  'div',
    collapsible:          false,
  }

  constructor(props) {
    super(props)
    this._members     = []
    this._panels      = []
    this._activeTabId = props.activeTabId
  }

  getChildContext() {
    return {
      ariaManager: {
        type: this.props.type,
        addMember: this._addMember,
        addPanel: this._addPanel,
        activateTab: this._activateTab,
      }
    }
  }

  _handleTapOrHover(e) {
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


  _addMember = (member) => {

//////////////////////////
    if (member.type === 'tab') {
      if (activeTabId === id) {
        this._activateTab(activeTabId, true, false)
      } else {
        this._handleFirstTabSelection(id)
      }
    }
    //////////////////////
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
