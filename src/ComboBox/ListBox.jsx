import React, { Component, PropTypes, createElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import { Overlay } from '../Overlays'
import specialAssign from '../utils/special-assign'

const checkedProps = {
  tag: PropTypes.string,
  children: PropTypes.node,
  onItemHighlight: PropTypes.func
}

class ListBox extends Component {
  static contextTypes = {
    comboBox: PropTypes.object
  }

  static propTypes = checkedProps

  static defaultProps = {
    tag: 'div'
  }

  _handleItemHightlight = (item) => {
    this.context.comboBox.setActiveDescendant(item)

    if (typeof this.props.onItemHighlight === 'function') {
      this.props.onItemHighlight(item)
    }
  }

  render() {
    const { comboBox } = this.context
    const { tag, children } = this.props
    const props = specialAssign({
      role: 'listbox',
      id: comboBox.uuid,
      rootNode: comboBox.inputNode,
      onItemHighlight: this._handleItemHightlight
    }, this.props, checkedProps)

    return createElement(Overlay, props, children)
  }
}

export default ListBox
