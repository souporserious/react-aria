import React, { Component, PropTypes, createElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import { Item } from '../Overlays'
import specialAssign from '../utils/special-assign'

const checkedProps = {
  tag: PropTypes.string,
  children: PropTypes.node
}

class Option extends Component {
  static contextTypes = {
    comboBox: PropTypes.object
  }

  static propTypes = checkedProps

  static defaultProps = {
    tag: 'div'
  }

  render() {
    const { comboBox } = this.context
    const { tag, id, children } = this.props
    const props = specialAssign({
      role: 'option',
      tabIndex: null, // null out default tabIndex for Item component
      // 'aria-selected': comboBox.activeDescendant
    }, this.props, checkedProps)

    return createElement(Item, props, children)
  }
}

export default Option
