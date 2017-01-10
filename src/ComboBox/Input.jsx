import React, { Component, PropTypes, createElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import specialAssign from '../utils/special-assign'

const checkedProps = {
  isOpen: PropTypes.bool,
  children: PropTypes.func
}

class Input extends Component {
  static contextTypes = {
    comboBox: PropTypes.object
  }

  static propTypes = checkedProps

  componentDidMount() {
    this.context.comboBox.setInputNode(findDOMNode(this))
  }

  _handleKeyDown = (e) => {
    const { tag, onToggle, onKeyDown } = this.props

    if (['ArrowUp', 'ArrowDown'].indexOf(e.key) > -1 ||
        (tag !== 'button' && ['Enter', ' '].indexOf(e.key) > -1)) {
      // highlight first item
    }

    if (typeof onKeyDown === 'function') {
      onKeyDown(e)
    }
  }

  _getProps() {
    const { comboBox } = this.context
    const { isOpen } = this.props
    const props = {
      role: 'combobox',
      autoComplete: 'off',
      'aria-autocomplete': 'list',
      'aria-haspopup': true,
      'aria-expanded': isOpen,
      'aria-owns': comboBox.uuid
      // onKeyDown: this._handleKeyDown
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
