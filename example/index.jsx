import React, { Component, PropTypes, Children, createElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import { AriaManager, Toggle, Menu, MenuItem } from '../src/react-aria'
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

class Dropdown extends Component {
  state = {
    selection: null
  }

  _handleSelection = (value, e) => {
    this.setState({ selection: value })
  }

  render() {
    return (
      <AriaManager
        onSelection={this._handleSelection}
      >
        { isOpen =>
          <div>
            <Toggle>
              {this.state.selection || 'Toggle'}
            </Toggle>
            { isOpen &&
              <Menu key="menu">
                <MenuItem>Apples</MenuItem>
                <MenuItem>Pears</MenuItem>
                <MenuItem>Oranges</MenuItem>
              </Menu>
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
        <Dropdown/>
        <Dropdown/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
