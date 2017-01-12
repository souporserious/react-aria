import React, { Component, PropTypes, createElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import uuid from '../utils/uuid'
import specialAssign from '../utils/special-assign'

const checkedProps = {
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  children: PropTypes.node
}

class ComboBox extends Component {
  static childContextTypes = {
    comboBox: PropTypes.object
  }

  static propTypes = checkedProps

  static defaultProps = {
    tag: 'div'
  }

  state = {
    inputNode: null,
    activeDescendant: null
  }

  _id = uuid()

  getChildContext() {
    return {
      comboBox: {
        uuid: this._id,
        setInputNode: this._setInputNode,
        inputNode: this.state.inputNode,
        setActiveDescendant: this._setActiveDescendant,
        activeDescendant: this.state.activeDescendant
      }
    }
  }

  _setInputNode = (node) => {
    this.setState({ inputNode: node })
  }

  _setActiveDescendant = (item) => {
    this.setState({ activeDescendant: item })
  }

  render() {
    const { tag, ...props } = this.props
    return tag ? createElement(tag, props) : props.children
  }
}

export default ComboBox
