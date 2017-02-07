import React, { Component, PropTypes, createElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import { Item } from '../Items'
import specialAssign from '../utils/special-assign'

const checkedProps = {
  tag: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
}

class Option extends Component {
  static contextTypes = {
    select: PropTypes.object
  }

  static propTypes = checkedProps

  static defaultProps = {
    tag: 'div'
  }

  render() {
    const { select } = this.context
    const { tag, children } = this.props
    const { id: activeId } = select.activeDescendant || {}
    const itemProps = specialAssign({
      role: 'option',
      tabIndex: null, // null out default tabIndex for Item component
    }, this.props, checkedProps)

    return createElement(Item, itemProps, _props => {
      const isHighlighted = (_props.id === activeId)
      const props = {
        ..._props,
        'aria-selected': isHighlighted
      }

      if (typeof children === 'function') {
        return children({ props, isHighlighted })
      }

      return createElement(tag, props, children)
    })
  }
}

export default Option
