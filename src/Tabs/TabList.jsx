import React, { Component, PropTypes, createElement } from 'react'
import specialAssign from '../helpers/special-assign'

const checkedProps = {
  tag: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired
}

class TabList extends Component {
  static contextTypes = {
    tabs: PropTypes.object.isRequired
  }

  static propTypes = checkedProps

  static defaultProps = {
    tag: 'div'
  }

  render() {
    const { accordion, multiselect } = this.context.tabs
    const { tag, children } = this.props
    const componentProps = {
      role: 'tablist'
    }

    if (accordion && multiselect) {
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
