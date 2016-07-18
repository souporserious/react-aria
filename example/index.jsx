import React, { Component, PropTypes, Children, createElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import { AriaManager, Toggle, Menu, Popover, Item } from '../src/react-aria'
import Transition from 'react-motion-ui-pack'

// API
// applyAriaComponent(Component, 'Modal')

// Focus Trap
// - Modal

// Focus Group
// - Dropdown https://www.w3.org/WAI/GL/wiki/Using_ARIA_menus#Success_Criteria_2.1.1_Keyboard
// - Select
// - ComboBox
// - Tabs
// - Popover
// - Tooltip

// get props from AriaManager on whether it's open or not, etc..
// write set of rules that a component can subscribe to
// like how both a modal and a popover can be in open and closed states.
// how focus needs to return to the original elment in both cases.

// AriaManager('Modal')
// <AriaManager type="modal">

// type = {
//   modal: ['openClose', 'clickToClose'],
//   popover: ['openClose'],
//   combobox: ['openClose', 'items'],
//   menu: ['openClose', 'items']
// }

class Dropdown extends Component {
  state = {
    selection: null
  }

  _handleSelection = (value, e) => {
    this.setState({ selection: value })
  }

  render() {
    return (
      <AriaManager onItemSelection={this._handleSelection}>
        { isOpen =>
          <div>
            <Toggle>
              {this.state.selection || 'Select A Menu Item'}
            </Toggle>
            { isOpen &&
              <Popover role="menu">
                <Item>Apples</Item>
                <Item>Pears</Item>
                <Item>Oranges</Item>
              </Popover>
            }
          </div>
        }
      </AriaManager>
    )
  }
}

class Modal extends Component {
  render() {
    return (
      <AriaManager trapFocus>
        { isOpen =>
          <div>
            <Toggle>
              Toggle Modal
            </Toggle>
            { isOpen &&
              <div>
                Clicking here will close since it's outside
                <Popover>
                  <a href="#">One</a>
                  <a href="#">Two</a>
                  <a href="#">Three</a>
                </Popover>
              </div>
            }
          </div>
        }
      </AriaManager>
    )
  }
}

class Popout extends Component {
  render() {
    return (
      <AriaManager>
        { isOpen =>
          <div>
            <Toggle>
              Toggle Popout
            </Toggle>
            { isOpen &&
              <Popover>
                Some cool popout content.
              </Popover>
            }
          </div>
        }
      </AriaManager>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <Dropdown/>
        <Modal/>
        <Popout/>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))
