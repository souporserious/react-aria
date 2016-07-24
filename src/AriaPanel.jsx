import React, { Component, PropTypes, createElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import specialAssign from './special-assign'

const checkedProps = {
  tag:          PropTypes.string,
  controlledBy: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isActive:     PropTypes.bool,
  children:     PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired
}

class AriaPanel extends Component {
  static contextTypes = {
    ariaManager: PropTypes.object.isRequired
  }

  static propTypes = checkedProps

  static defaultProps = {
    tag: 'div'
  }

  state = {
    isActive: false
  }

  componentDidMount() {
    this.context.ariaManager.addPanel({
      controlledBy: this.props.controlledBy,
      node: findDOMNode(this),
      setActiveState: this._setActiveState,
      toggleActiveState: this._toggleActiveState
    })
  }

  _setActiveState = (isActive) => {
    this.setState({ isActive })
  }

  _toggleActiveState = () => {
    this.setState({ isActive: !this.state.isActive })
  }

  _handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === 'ArrowUp') {
      this.context.ariaManager.focusTab(this.props.controlledBy)
    }
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e)
    }
  }

  render() {
    const { tag, controlledBy, disabled, children } = this.props
    const isActive = (this.props.isActive !== undefined) ? this.props.isActive : this.state.isActive
    const props = specialAssign({
      id: `${controlledBy}-panel`,
      role: 'tabpanel',
      'aria-hidden': !isActive,
      'aria-labelledby': controlledBy,
      onKeyDown: this._handleKeyDown,
      style: {
        display: isActive ? '' : 'none'
      }
    }, this.props, checkedProps)

    if (typeof children === 'function') {
      return children(props, isActive)
    }

    return createElement(tag, props, children)
  }
}

export default AriaPanel
