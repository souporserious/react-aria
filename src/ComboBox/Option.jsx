import React, { Component, PropTypes, createElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import { Item } from '../Overlays'
import specialAssign from '../utils/special-assign'

const checkedProps = {
  tag: PropTypes.string,
  children: PropTypes.node
}

class Option extends Component {
  static propTypes = checkedProps

  static defaultProps = {
    tag: 'div'
  }

  render() {
    const { tag, children } = this.props
    const props = specialAssign({
    }, this.props, checkedProps)

    return createElement(Item, props, children)
  }
}

export default Option
