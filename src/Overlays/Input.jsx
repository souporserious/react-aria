import React, { Component, PropTypes, createElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import specialAssign from '../helpers/special-assign'

const checkedProps = {
  type: PropTypes.string,
  controls: PropTypes.string,
  isOpen: PropTypes.bool,
  children: PropTypes.func
}

class Trigger extends Component {
  static propTypes = checkedProps

  static defaultProps = {
    type: 'popover'
  }

  _getProps() {
    const { type, controls, isOpen } = this.props

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
    const { children } = this.props
    const props = this._getProps()

    if (typeof children === 'function') {
      return children(props)
    }

    return createElement('input', props)
  }
}

export default Trigger
