import React, { Component, createElement } from 'react'
import PropTypes from 'prop-types'
import ReactDOM, { findDOMNode } from 'react-dom'
import specialAssign from '../utils/special-assign'

const checkedProps = {
  component:    PropTypes.any,
  controlledBy: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isActive:     PropTypes.bool,
  children:     PropTypes.oneOfType([PropTypes.func, PropTypes.node])
}

class TabPanel extends Component {
  static contextTypes = {
    tabs: PropTypes.object.isRequired
  }

  static propTypes = checkedProps

  static defaultProps = {
    component: 'div'
  }

  state = {
    isActive: false
  }

  componentDidMount() {
    this.context.tabs.addPanel({
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
    const { onKeyDown } = this.props

    if (e.ctrlKey && e.key === 'ArrowUp') {
      this.context.focusGroup.focus(this.props.controlledBy)
    }

    if (typeof onKeyDown === 'function') {
      onKeyDown(e)
    }
  }

  render() {
    const { component, controlledBy, disabled, children } = this.props
    const isActive = (this.props.isActive !== undefined) ? this.props.isActive : this.state.isActive
    const componentProps = {
      id: `${controlledBy}-panel`,
      role: 'tabpanel',
      'aria-hidden': !isActive,
      'aria-labelledby': controlledBy,
      onKeyDown: this._handleKeyDown
    }

    if (!isActive) {
      componentProps['style'] = {
        display: 'none',
        ...this.props.style
      }
    }

    const props = specialAssign(componentProps, this.props, checkedProps)

    if (typeof children === 'function') {
      return children(props, isActive)
    }

    return createElement(component, props, children)
  }
}

export default TabPanel
