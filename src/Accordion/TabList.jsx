import React, { Component, PropTypes, createElement } from 'react'
import specialAssign from '../special-assign'

const checkedProps = {
  tag:      PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired
}

class TabList extends Component {
  static contextTypes = {
    ariaManager: PropTypes.object.isRequired
  }

  static propTypes = checkedProps

  static defaultProps = {
    tag: 'div'
  }

  render() {
    const { type } = this.context.ariaManager
    const { tag, children } = this.props
    const componentProps = {
      role: 'tablist'
    }

    if (type === 'accordion') {
      componentProps['aria-multiselectable'] = true
    }

    const props = specialAssign(componentProps, this.props, checkedProps)

    if (typeof children === 'function') {
      return children(props)
    }

    return createElement(tag, props, children)
  }
}

export default TabList
