import React, { Component, PropTypes, createElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import specialAssign from '../helpers/special-assign'

const checkedProps = {
  type: PropTypes.string,
  controls: PropTypes.string,
  isOpen: PropTypes.bool,
  onRequestOpen: PropTypes.func
}

class Trigger extends Component {
  static propTypes = checkedProps

  static defaultProps = {
    type: 'popover'
  }

  _handleKeyDown = (e) => {
    const { tag, onRequestOpen, onKeyDown } = this.props

    if (['ArrowDown'].indexOf(e.key) > -1 ||
        (tag !== 'button' && ['Enter', ' '].indexOf(e.key) > -1)) {
      onRequestOpen()
    }

    if (typeof onKeyDown === 'function') {
      onKeyDown(e)
    }
  }

  _getProps() {
    const { type, controls, isOpen } = this.props
    const props = {
      onKeyDown: this._handleKeyDown
    }

    if (type !== 'modal') {
      props['aria-haspopup'] = true
      props['aria-expanded'] = isOpen
    }

    if (type === 'popover') {
      props['id'] = controls
    }
    else if (type === 'tooltip') {
      props['aria-describedby'] = controls
    }

    return specialAssign(props, this.props, checkedProps)
  }

  render() {
    return createElement('input', this._getProps())
  }
}

export default Trigger
