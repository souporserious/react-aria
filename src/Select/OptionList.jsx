import React, { Component, PropTypes, createElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import { ItemList } from '../Items'
import Overlay from '../Overlay'
import specialAssign from '../utils/special-assign'

const checkedProps = {
  tag: PropTypes.string,
  children: PropTypes.node,
  scopeFocus: PropTypes.bool,
  initialFocus: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  closeOnOutsideClick: PropTypes.bool,
  onOptionHighlight: PropTypes.func,
  onOptionSelection: PropTypes.func
}

class OptionList extends Component {
  static contextTypes = {
    select: PropTypes.object
  }

  static propTypes = checkedProps

  static defaultProps = {
    tag: 'div',
    role: 'listbox',
    initialFocus: 0,
    closeOnOutsideClick: false
  }

  _handleItemFocus = (item) => {
    this.context.select.setActiveDescendant(item)

    if (typeof this.props.onOptionHighlight === 'function') {
      this.props.onOptionHighlight(item)
    }
  }

  focusMember = (index) => {
    this._itemList.focusMember(index)
  }

  getActiveMember = () => {
    return this._itemList.getActiveMember()
  }

  render() {
    const { select } = this.context
    const { tag, role, scopeFocus, initialFocus, onOptionSelection, closeOnOutsideClick, children } = this.props
    const props = specialAssign({
      tag,
      role,
      id: select.uuid,
      closeOnOutsideClick
    }, this.props, checkedProps)

    return (
      <ItemList
        ref={c => this._itemList = c}
        rootNode={select.rootNode}
        scopeFocus={scopeFocus}
        initialFocus={initialFocus}
        onItemFocus={this._handleItemFocus}
        onItemSelection={onOptionSelection}
      >
        <Overlay {...props}>
          {children}
        </Overlay>
      </ItemList>
    )
  }
}

export default OptionList
