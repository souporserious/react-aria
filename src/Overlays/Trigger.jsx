import React, { Component, PropTypes, createElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import specialAssign from '../utils/special-assign'

const checkedProps = {
  tag: PropTypes.string,
  overlayRole: PropTypes.string,
  controls: PropTypes.string,
  isOpen: PropTypes.bool,
  toggleOn: PropTypes.array,
  onToggle: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
}

class Trigger extends Component {
  static propTypes = checkedProps

  static defaultProps = {
    tag: 'button',
    overlayRole: 'popover',
    toggleOn: ['click'],
    onToggle: () => null
  }

  _handleKeyDown = (e) => {
    const { tag, onToggle, onKeyDown } = this.props

    if (['ArrowUp', 'ArrowDown'].indexOf(e.key) > -1 ||
        (tag !== 'button' && ['Enter', ' '].indexOf(e.key) > -1)) {
      this._toggle(e)
    }

    if (typeof onKeyDown === 'function') {
      onKeyDown(e)
    }
  }

  _handleEvent(name, e) {
    const onEvent = this.props[`on${name}`]

    this._toggle(e)

    if (typeof onEvent === 'function') {
      onEvent(e)
    }
  }

  _toggle(e) {
    e.preventDefault()
    this.props.onToggle()
  }

  _getProps() {
    const { disabled, overlayRole, controls, isOpen, toggleOn } = this.props
    const props = {
      role: 'button',
      tabIndex: (disabled) ? '' : 0,
      'aria-disabled': disabled,
      onKeyDown: this._handleKeyDown
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

    if (toggleOn.indexOf('click') > -1) {
      props.onClick = this._handleEvent.bind(this, 'click')
    }
    if (toggleOn.indexOf('hover') > -1) {
      props.onMouseOver = this._handleEvent.bind(this, 'mouseOver')
      props.onMouseOut = this._handleEvent.bind(this, 'mouseOut')
    }
    if (toggleOn.indexOf('focus') > -1) {
      props.onFocus = this._handleEvent.bind(this, 'focus')
      props.onBlur = this._handleEvent.bind(this, 'blur')
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

export default Trigger
