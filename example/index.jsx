import React, { Component, PropTypes, Children, createElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import a11y from 'react-a11y'
import Transition from 'react-motion-ui-pack'
import { AriaManager, AriaToggle, AriaPopover, AriaItem, AriaTabList, AriaTab, AriaPanel } from '../src/react-aria'

// a11y(React)

// Inspiration
// http://www.oaa-accessibility.org/
// https://standards.usa.gov/
// http://ianmcburnie.github.io/mindpatterns/
// http://jqueryui.com/widget/

// Components
// - Popover
// - Modal
// - Dropdown https://www.w3.org/WAI/GL/wiki/Using_ARIA_menus#Success_Criteria_2.1.1_Keyboard
// - Tooltip https://rawgit.com/w3c/aria-in-html/master/index.html#aria-labelledby-and-aria-describedby
// - Select
// - ComboBox
// - Tabs
// - Accordion
// - Panel
// - Rows & Columns https://www.w3.org/TR/wai-aria-practices/#grid

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
        type="menu"
        onItemSelection={this._handleSelection}
      >
        { isOpen =>
          <div>
            <h3>Dropdown</h3>
            <AriaToggle>
              {this.state.selection || 'Select A Menu Item'}
            </AriaToggle>
            { isOpen &&
              <AriaPopover>
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
      <AriaManager
        type="modal"
        trapFocus
        freezeScroll
      >
        { isOpen =>
          <div>
            <h3>Modal</h3>
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
        type="popover"
        onPopoverOpen={() => this.setState({ isOpen: true })}
        onPopoverClose={() => this.setState({ isOpen: false })}
        openPopoverOn="hover"
      >
        <div>
          <h3>Popover</h3>
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

class Accordion extends Component {
  state = {
    tabs: [{
      tab: 'one',
      panel: <div>Some cool content for tab panel one.</div>
    }, {
      tab: 'two',
      panel: <div>Some cool content for tab panel two.</div>
    }, {
      tab: 'three',
      panel: <div>Some cool content for tab panel three with a <a href="http://google.com" target="_blank">link</a>.</div>
    }]
  }

  render() {
    const { tabs } = this.state
    return (
      <AriaManager type="accordion">
        <div>
          <h3>Accordion (Stateful)</h3>
          <AriaTabList>
            {tabs.map(({ tab, panel }) =>
              <div key={tab}>
                <AriaTab id={tab}>
                  {tab}
                </AriaTab>
                <AriaPanel controlledBy={tab}>
                  {panel}
                </AriaPanel>
              </div>
            )}
          </AriaTabList>
        </div>
      </AriaManager>
    )
  }
}

class Tabs extends Component {
  state = {
    tabs: [{
      tab: 'one',
      panel: <div>Some cool content for tab panel one.</div>
    }, {
      tab: 'two',
      panel: <div>Some cool content for tab panel two.</div>
    }, {
      tab: 'three',
      panel: <div>Some cool content for tab panel three with a <a href="http://google.com" target="_blank">link</a>.</div>
    }],
    activeId: 'two'
  }

  _handleChange = (activeId) => {
    this.setState({ activeId })
  }

  render() {
    const { tabs, activeId } = this.state
    return (
      <AriaManager
        type="tabs"
        activeTabId={activeId}
        onChange={this._handleChange}
      >
        <div>
          <h3>Tabs (Stateless)</h3>
          <AriaTabList>
            {tabs.map(({ tab }) =>
              <AriaTab key={tab} id={tab} isActive={tab === activeId}>
                {tab}
              </AriaTab>
            )}
          </AriaTabList>
          <div>
            {tabs.map(({ tab, panel }) =>
              <AriaPanel key={tab} controlledBy={tab} isActive={tab === activeId}>
                {panel}
              </AriaPanel>
            )}
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
        <Accordion/>
        <Tabs/>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))
