import React, { Component, createElement } from 'react'
import PropTypes from 'prop-types'
import specialAssign from '../utils/special-assign'

const checkedProps = {
  component: PropTypes.any,
  children:  PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired
}

class TabList extends Component {
  static contextTypes = {
    tabs: PropTypes.object.isRequired
  }

  static propTypes = checkedProps

  static defaultProps = {
    component: 'div'
  }

  render() {
    const { accordion, multiselect } = this.context.tabs
    const { component, children } = this.props
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

    return createElement(component, props, children)
  }
}

export default TabList
