import React, { Component, PropTypes, createElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import specialAssign from './special-assign'

const checkedProps = {
  tag:      PropTypes.string,
  id:       PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isActive: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired
}

// write a function that allows you to bind native functionality to
// props like onChange and stuff like that, I shouldn't need to write
// this example over and over again:
// _handleFocus = (e) => {
//   // code
//   if (this.props.onKeyDown) {
//     this.props.onKeyDown(e)
//   }
// }
//
// Ideally it should autobind the function as well as provide an original tie into the props[event]

class AriaTab extends Component {
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
    this._member = {
      type: 'tab',
      id: this.props.id,
      node: findDOMNode(this),
      text: this.props.text,
      setActiveState: this._setActiveState,
      toggleActiveState: this._toggleActiveState
    }
    this.context.ariaManager.addMember(this._member)
  }

  componentWillUnmount() {
    this.context.ariaManager.removeMember(this._member)
  }

  _setActiveState = (isActive) => {
    this.setState({ isActive })
  }

  _toggleActiveState = () => {
    this.setState({ isActive: !this.state.isActive })
  }

  _handleKeyDown = (e) => {
    const { type, activateTab } = this.context.ariaManager
    const { id, onKeyDown } = this.props

    if (type === 'accordion' && [' ', 'Enter'].indexOf(e.key) > -1) {
      activateTab(id)
    }
    if (onKeyDown) {
      onKeyDown(e)
    }
  }

  _handleFocus = (e) => {
    const { type, activateTab } = this.context.ariaManager
    const { id, onFocus } = this.props

    if (type === 'tabs') {
      activateTab(id)
    }
    if (onFocus) {
      onFocus(e)
    }
  }

  render() {
    const { type } = this.context.ariaManager
    const { tag, id, disabled, children } = this.props
    const isActive = (this.props.isActive !== undefined) ? this.props.isActive : this.state.isActive
    const componentProps = {
      id,
      role: 'tab',
      tabIndex: type === 'accordion' ? 0 : (isActive ? 0 : -1),
      'aria-selected': isActive,
      'aria-controls': `${id}-panel`,
      'aria-disabled': disabled,
      onKeyDown: this._handleKeyDown,
      onFocus: this._handleFocus,
      style: {
        color: isActive ? 'red' : ''
      }
    }

    if (type === 'accordion') {
      componentProps['aria-expanded'] = isActive
    }

    const props = specialAssign(componentProps, this.props, checkedProps)

    if (typeof children === 'function') {
      return children(props)
    }

    return createElement(tag, props, children)
  }
}

export default AriaTab
