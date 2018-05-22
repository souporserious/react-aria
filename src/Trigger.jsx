import React, { Component, createElement } from 'react'
import PropTypes from 'prop-types'
import ReactDOM, { findDOMNode } from 'react-dom'
import upperCaseFirst from 'upper-case-first'
import specialAssign from './utils/special-assign'

const checkedProps = {
  component:   PropTypes.any,
  overlayRole: PropTypes.string,
  controls:    PropTypes.string,
  isOpen:      PropTypes.bool,
  keybindings: PropTypes.array,
  triggerOn:   PropTypes.array,
  onTrigger:   PropTypes.func,
  children:    PropTypes.oneOfType([PropTypes.func, PropTypes.node])
}

class Trigger extends Component {
  static contextTypes = {
    select:         PropTypes.object,
    overlayManager: PropTypes.object
  }

  static propTypes = checkedProps

  static defaultProps = {
    component:   'button',
    overlayRole: 'popover',
    keybindings: [' ', 'ArrowUp', 'ArrowDown'],
    triggerOn:   ['click'],
    onTrigger:   () => null,
  }

  _isKeyDown = false

  componentDidMount() {
    if (this.context.select) {
      this.context.select.setRootNode(findDOMNode(this))
    }
  }

  _handleKeyDown = (e) => {
    const { keybindings, onKeyDown } = this.props

    this._isKeyDown = true

    if (keybindings.indexOf(e.key) > -1) {
      this._trigger(e)
    }

    if (typeof onKeyDown === 'function') {
      onKeyDown(e)
    }
  }

  _handleKeyUp = (e) => {
    // allow _handleEvent to check whether key was just down
    setTimeout(() => {
      this._isKeyDown = false
    })

    if (typeof this.props.onKeyUp === 'function') {
      this.props.onKeyUp(e)
    }
  }

  _handleEvent(name, e) {
    const onEvent = this.props[`on${upperCaseFirst(name)}`]

    // don't allow button component to trigger onClick
    if (this._isKeyDown) return;

    this._trigger(e)

    if (typeof onEvent === 'function') {
      onEvent(e)
    }
  }

  _trigger(e) {
    e.preventDefault()

    if (
      this.context.overlayManager &&
      typeof this.props.isOpen === 'undefined'
    ) {
      this.context.overlayManager.toggle()
    }

    this.props.onTrigger(e)
  }

  _getProps() {
    const { overlayManager } = this.context
    const { component, disabled, overlayRole, controls, triggerOn } = this.props
    const isOpen = overlayManager ? overlayManager.isOpen : this.props.isOpen
    const props = {
      [component === 'button' ? 'type' : 'role']: 'button',
      tabIndex:        disabled ? '' : 0,
      'aria-disabled': disabled,
      onKeyDown:       this._handleKeyDown,
      onKeyUp:         this._handleKeyUp
    }

    if (overlayRole !== 'modal') {
      props['aria-haspopup'] = true
      props['aria-expanded'] = isOpen
    }

    if (overlayRole === 'popover') {
      props['id'] = controls
    }
    else if (overlayRole === 'tooltip') {
      props['aria-describedby'] = controls
    }

    if (triggerOn.indexOf('click') > -1) {
      props.onClick = this._handleEvent.bind(this, 'click')
    }

    if (triggerOn.indexOf('hover') > -1) {
      props.onMouseOver = this._handleEvent.bind(this, 'mouseOver')
      props.onMouseOut = this._handleEvent.bind(this, 'mouseOut')
    }

    if (triggerOn.indexOf('focus') > -1) {
      props.onFocus = this._handleEvent.bind(this, 'focus')
      props.onBlur = this._handleEvent.bind(this, 'blur')
    }

    return specialAssign(props, this.props, checkedProps)
  }

  render() {
    const { component, children } = this.props
    const props = this._getProps()

    if (typeof children === 'function') {
      return children(props)
    }

    return createElement(component, props, children)
  }
}

export default Trigger
