import React, { Component, createElement } from 'react'
import PropTypes from 'prop-types'
import ReactDOM, { findDOMNode } from 'react-dom'
import { ItemList } from '../Items'
import Overlay from '../Overlays/Overlay'
import specialAssign from '../utils/special-assign'

const checkedProps = {
  component:           PropTypes.any,
  children:            PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  initialFocus:        PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  closeOnOutsideClick: PropTypes.bool,
  onOptionHighlight:   PropTypes.func,
  onOptionSelection:   PropTypes.func
}

class OptionList extends Component {
  static contextTypes = {
    select: PropTypes.object
  }

  static propTypes = checkedProps

  static defaultProps = {
    component:           'div',
    initialFocus:        0,
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
    const { component, role, scopeFocus, initialFocus, onOptionSelection, closeOnOutsideClick, children } = this.props
    const props = specialAssign({
      component,
      role: 'listbox',
      id:   select.uuid,
      closeOnOutsideClick
    }, this.props, checkedProps)

    return (
      <ItemList
        ref={c => this._itemList = c}
        component={false}
        rootNode={select.getRootNode()}
        scopeFocus={false}
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
