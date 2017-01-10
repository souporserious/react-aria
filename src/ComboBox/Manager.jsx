import React, { Component, PropTypes, createElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import uuid from '../utils/uuid'
import specialAssign from '../utils/special-assign'

const checkedProps = {
  tag: PropTypes.string,
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
    inputNode: null
  }

  getChildContext() {
    return {
      comboBox: {
        uuid: uuid,
        setInputNode: this._setInputNode,
        getInputNode: this._getInputNode
      }
    }
  }

  _setInputNode = (node) => {
    this.setState({ inputNode: node })
  }

  _getInputNode = () => {
    return this.state.inputNode
  }

  render() {
    const { tag, children } = this.props
    const props = specialAssign({
    }, this.props, checkedProps)

    return createElement(tag, props, children)
  }
}

export default ComboBox
