import React, { Component, PropTypes, createElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import { Overlay } from '../Overlays'
import specialAssign from '../utils/special-assign'

const checkedProps = {
  tag: PropTypes.string,
  children: PropTypes.node
}

class ListBox extends Component {
  static contextTypes = {
    comboBox: PropTypes.object
  }

  static propTypes = checkedProps

  static defaultProps = {
    tag: 'div'
  }

  render() {
    const { comboBox } = this.context
    console.log(comboBox)
    const { tag, children } = this.props
    const props = specialAssign({
      role: 'listbox',
      id: comboBox.uuid
    }, this.props, checkedProps)

    return createElement(Overlay, props, children)
  }
}

export default ListBox
