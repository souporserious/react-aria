import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import Members from '../Members'

class Wrapper extends Component {
  static childContextTypes = {
    tabs: PropTypes.object
  }

  constructor(props) {
    super(props)
    this._members = new Members({ ...this.props, onAdd: this._addMember })
    this._panels = []
  }

  getChildContext() {
    return {
      tabs: {
        accordion: this.props.accordion,
        multiple: this.props.multiple,
        members: this._members,
        addPanel: this._addPanel,
        activateTab: this._activateTab,
        focusTab: this.focusTab
      }
    }
  }

  _addMember = ({ id }) => {
    if (id === this.props.activeTabId) {
      this._activateTab(id, true, false)
    }
  }

  _addPanel = (panel) => {
    const { controlledBy } = panel

    this._panels.push(panel)

    // set an active panel if there is one
    if (controlledBy === this.props.activeTabId) {
      this._activateTab(controlledBy, true, false)
    }
  }

  _activateTab = (id, forceActivate, emitEvent = true) => {
    // bail out if this is the same id
    if (id === this.props.activeTabId && !forceActivate) return;

    const { onChange } = this.props

    if (emitEvent && typeof onChange === 'function') {
      onChange(id)
    } else {
      this._setActiveStates(id)
    }
  }

  _setActiveStates(id) {
    const { accordion, multiple } = this.props
    const { collection } = this._members

    for (let i = collection.length; i--;) {
      const tab = collection[i]
      if (accordion) {
        if (tab.id === id) {
          tab.toggleActiveState()
        } else if (!multiple) {
          tab.setActiveState(false)
        }
      } else {
        tab.setActiveState(tab.id === id)
      }
    }

    for (let i = this._panels.length; i--;) {
      const panel = this._panels[i]
      if (accordion) {
        if (panel.controlledBy === id) {
          panel.toggleActiveState()
        } else if (!multiple) {
          panel.setActiveState(false)
        }
      } else {
        panel.setActiveState(panel.controlledBy === id)
      }
    }
  }

  render() {
    return this.props.children
  }
}

export default Wrapper
