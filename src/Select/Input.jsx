import React, { Component, PropTypes, createElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import specialAssign from '../utils/special-assign'

const checkedProps = {
  isOpen: PropTypes.bool,
  children: PropTypes.func
}

class Input extends Component {
  static contextTypes = {
    select: PropTypes.object
  }

  static propTypes = checkedProps

  componentDidMount() {
    this.context.select.setRootNode(findDOMNode(this))
  }

  _getProps() {
    const { select } = this.context
    const { isOpen } = this.props
    const props = {
      role: 'combobox',
      autoComplete: 'off',
      spellCheck: false,
      'aria-autocomplete': 'list',
      'aria-owns': select.uuid,
      'aria-haspopup': isOpen,
      'aria-expanded': isOpen,
      'aria-activedescendant': select.activeDescendant && select.activeDescendant.id
    }
    return specialAssign(props, this.props, checkedProps)
  }

  render() {
    const { children } = this.props
    const props = this._getProps()

    if (typeof children === 'function') {
      return children(props)
    }

    return createElement('input', props)
  }
}

export default Input
