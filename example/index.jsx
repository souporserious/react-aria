import React, { Component, PropTypes, Children, createElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import a11y from 'react-a11y'
import Transition from 'react-motion-ui-pack'
import { AriaManager, AriaToggle, AriaPopover, AriaItem } from '../src/react-aria'

// a11y(React)

// Components
// - Modal
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
      <AriaManager onItemSelection={this._handleSelection}>
        { isOpen =>
          <div>
            <AriaToggle id="dropdown">
              {this.state.selection || 'Select A Menu Item'}
            </AriaToggle>
            { isOpen &&
              <AriaPopover
                role="menu"
                aria-labelledby="dropdown"
              >
                <AriaItem>Apples</AriaItem>
                <AriaItem>Pears</AriaItem>
                <AriaItem>Oranges</AriaItem>
              </AriaPopover>
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
            <AriaToggle>
              Toggle Modal
            </AriaToggle>
            <Transition>
              { isOpen &&
                <div key="popover">
                  Clicking here will close since it's outside
                  <AriaPopover>
                    <a href="#">One</a>
                    <a href="#">Two</a>
                    <a href="#">Three</a>
                  </AriaPopover>
                </div>
              }
            </Transition>
          </div>
        }
      </AriaManager>
    )
  }
}

class Popover extends Component {
  state = {
    isOpen: false
  }

  render() {
    const { isOpen } = this.state
    return (
      <AriaManager
        onPopoverOpen={() => this.setState({ isOpen: true })}
        onPopoverClose={() => this.setState({ isOpen: false })}
        openPopoverOn="hover"
      >
        <div>
          <AriaToggle>
            Toggle Popover <span>👻</span>
          </AriaToggle>
          { isOpen &&
            <AriaPopover>
              Some cool popover content.
            </AriaPopover>
          }
          <div>
            Popover is {isOpen ? 'Open' : 'Closed'}
          </div>
        </div>
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
        <Popover/>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))
