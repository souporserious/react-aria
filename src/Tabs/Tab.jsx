import React, { Component, PropTypes, createElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import specialAssign from '../helpers/special-assign'

const checkedProps = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isActive: PropTypes.bool,
  tag: PropTypes.string
}

class Tab extends Component {
  static contextTypes = {
    tabs: PropTypes.object.isRequired
  }

  static propTypes = checkedProps

  static defaultProps = {
    tag: 'div'
  }

  state = {
    isActive: false
  }

  componentDidMount() {
    this._member = {
      id: this.props.id,
      node: findDOMNode(this),
      text: this.props.text,
      setActiveState: this._setActiveState,
      toggleActiveState: this._toggleActiveState
    }
    this.context.tabs.members.add(this._member)
  }

  componentWillUnmount() {
    this.context.tabs.members.remove(this._member)
  }

  _setActiveState = (isActive) => {
    this.setState({ isActive })
  }

  _toggleActiveState = () => {
    this.setState({ isActive: !this.state.isActive })
  }

  _handleClick = (e) => {
    const { onClick } = this.props

    this.context.tabs.activateTab(this.props.id)

    if (typeof onClick === 'function') {
      onClick(e)
    }
  }

  _handleKeyDown = (e) => {
    const { id, tag, onKeyDown } = this.props

    if (tag !== 'button' && ['Enter', ' '].indexOf(e.key) > -1) {
      e.preventDefault()
      this.context.tabs.activateTab(id)
    }

    if (onKeyDown) {
      onKeyDown(e)
    }
  }

  _handleFocus = (e) => {
    const { onFocus } = this.props

    this.context.tabs.activateTab(this.props.id)

    if (typeof onFocus === 'function') {
      onFocus(e)
    }
  }

  render() {
    const { accordion } = this.context.tabs
    const { tag, id, disabled, children } = this.props
    const isActive = (this.props.isActive !== undefined) ? this.props.isActive : this.state.isActive
    const componentProps = {
      id,
      role: 'tab',
      tabIndex: accordion ? 0 : (isActive ? 0 : -1),
      'aria-selected': isActive,
      'aria-controls': `${id}-panel`,
      'aria-disabled': disabled
    }

    if (accordion) {
      componentProps['aria-expanded'] = isActive
      componentProps['onClick'] = this._handleClick
      componentProps['onKeyDown'] = this._handleKeyDown
    } else {
      componentProps['onFocus'] = this._handleFocus
    }

    const props = specialAssign(componentProps, this.props, checkedProps)

    if (typeof children === 'function') {
      return children(props, isActive)
    }

    return createElement(tag, props, children)
  }
}

export default Tab
