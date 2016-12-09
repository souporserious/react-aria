import React, { Component, PropTypes, createElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import specialAssign from '../special-assign'
import { registerToggle, unregisterToggle, togglePopover, openPopover, closePopover } from './state-manager'

const checkedProps = {
  tag: PropTypes.string,
  on: PropTypes.array,
  isOpen: PropTypes.bool.isRequired
}

class Toggle extends Component {
  static propTypes = checkedProps

  static defaultProps = {
    tag: 'button',
    on: ['click']
  }

  componentDidMount() {
    registerToggle(this.props.controls, this)
  }

  componentWillUnmount() {
    unregisterToggle(this.props.controls)
  }

  _handleKeyDown = (e) => {
    const { tag, controls, onKeyDown } = this.props

    // toggle the popover with keyboard controls
    if (['ArrowUp', 'ArrowDown'].indexOf(e.key) > -1 ||
        (tag !== 'button' && ['Enter', ' '].indexOf(e.key) > -1)) {
      togglePopover(controls)
    }

    // call original prop if passed in
    if (typeof onKeyDown === 'function') {
      onKeyDown(e)
    }
  }

  _handleClick = (e) => {
    const { controls, onClick } = this.props
    togglePopover(controls)
    if (typeof onClick === 'function') {
      onClick(e)
    }
  }

  _handleMouseOver = (e) => {
    const { controls, onMouseOver } = this.props
    openPopover(controls)
    if (typeof onMouseOver === 'function') {
      onMouseOver(e)
    }
  }

  _handleMouseOut = (e) => {
    const { controls, onMouseOut } = this.props
    closePopover(controls)
    if (typeof onMouseOut === 'function') {
      onMouseOut(e)
    }
  }

  _handleFocus = (e) => {
    const { controls, onFocus } = this.props
    openPopover(controls)
    if (typeof onFocus === 'function') {
      onFocus(e)
    }
  }

  _handleBlur = (e) => {
    const { controls, onBlur } = this.props
    closePopover(controls)
    if (typeof onBlur === 'function') {
      onBlur(e)
    }
  }

  _getProps() {
    const { type, controls, on, isOpen, disabled } = this.props
    const props = {
      id: controls,
      role: 'button',
      tabIndex: (disabled) ? '' : 0,
      'aria-haspopup': true,
      'aria-expanded': isOpen,
      'aria-disabled': disabled,
      onKeyDown: this._handleKeyDown
    }

    if (type === 'popover') {
      props['id'] = controls
    }
    if (type === 'tooltip') {
      props['aria-describedby'] = controls
    }

    // apply "on" toggle events
    if (on.indexOf('click') > -1) {
      props.onClick = this._handleClick
    }
    if (on.indexOf('hover') > -1) {
      props.onMouseOver = this._handleMouseOver
      props.onMouseOut = this._handleMouseOut
    }
    if (on.indexOf('focus') > -1) {
      props.onFocus = this._handleFocus
      props.onBlur = this._handleBlur
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

export default Toggle
