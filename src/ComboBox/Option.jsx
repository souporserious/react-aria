import React, { Component, PropTypes, createElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import { Item } from '../Overlays'
import specialAssign from '../utils/special-assign'

const checkedProps = {
  tag: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
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
    const { tag, children } = this.props
    const { id: activeId } = comboBox.activeDescendant || {}
    const props = specialAssign({
      role: 'option',
      tabIndex: null, // null out default tabIndex for Item component
    }, this.props, checkedProps)

    return createElement(Item, props, (itemProps) => {
      const isHighlighted = (itemProps.id === activeId)

      if (typeof children === 'function') {
        return children({ props: itemProps, isHighlighted })
      }

      return createElement(tag, itemProps, children)
    })
  }
}

export default Option
