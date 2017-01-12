import React, { Component, PropTypes, createElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import uuid from '../utils/uuid'
import specialAssign from '../utils/special-assign'

const checkedProps = {
  tag: PropTypes.string,
  index: PropTypes.any,
  value: PropTypes.any,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
}

class Item extends Component {
  static contextTypes = {
    overlay: PropTypes.object
  }

  static propTypes = checkedProps

  static defaultProps = {
    tag: 'div'
  }

  _id = this.props.id || uuid()

  componentDidMount() {
    const { members } = this.context.overlay

    this._member = {
      id: this._id,
      node: findDOMNode(this),
      text: this.props.text,
      index: this.props.index
    }

    if (this.props.value) {
      this._member.value = this.props.value
    }

    this.context.overlay.members.add(this._member)
    this.context.overlay.members.on('select', this._handleSelection)
  }

  componentWillUnmount() {
    this.context.overlay.members.remove(this._member)
  }

  _handleSelection = (item, e) => {
    const { onSelect } = this.props
    if (this._member.id === item.id && typeof onSelect === 'function') {
      onSelect(item, e)
    }
  }

  render() {
    const { tag, id, children } = this.props
    const props = specialAssign({
      id: id || this._id,
      role: 'menuitem',
      tabIndex: -1
    }, this.props, checkedProps)

    if (typeof children === 'function') {
      return children(props)
    }

    return createElement(tag, props, children)
  }
}

export default Item
