import React, { Component, PropTypes, createElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import { Item } from '../Items'
import specialAssign from '../utils/special-assign'

const checkedProps = {
  component: PropTypes.any,
  children:  PropTypes.oneOfType([PropTypes.func, PropTypes.node])
}

class Option extends Component {
  static contextTypes = {
    select: PropTypes.object,
    itemList: PropTypes.object
  }

  static propTypes = checkedProps

  static defaultProps = {
    component: 'div'
  }

  _handleMouseEnter = (e) => {
    const { focusGroup } = this.context.itemList
    const index = focusGroup.getMemberIndexFromNode(findDOMNode(this))

    // move focus on hover
    if (index > -1) {
      focusGroup.focus(index, false)
    }

    if (typeof this.props.onMouseEnter === 'function') {
      this.props.onMouseEnter(e)
    }
  }

  render() {
    const { select } = this.context
    const { component, children } = this.props
    const activeDescendant = select.getActiveDescendant()
    const itemProps = specialAssign({
      role: 'option',
      tabIndex: null,
      onMouseEnter: this._handleMouseEnter
    }, this.props, checkedProps)

    return createElement(Item, itemProps, optionProps => {
      const isHighlighted = (optionProps.id === activeDescendant.id)
      const props = {
        ...optionProps,
        'aria-selected': isHighlighted
      }

      if (typeof children === 'function') {
        return children({ props, isHighlighted })
      }

      return createElement(component, props, children)
    })
  }
}

export default Option
