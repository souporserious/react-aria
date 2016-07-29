import React, { Component, PropTypes, Children, createElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import a11y from 'react-a11y'
import Transition from 'react-motion-ui-pack'
import { AriaManager, AriaToggle, AriaPopover, AriaItem, AriaTabList, AriaTab, AriaPanel } from '../src/react-aria'

import Collapse from 'react-collapse'

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

import './main.scss'

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
          <AriaToggle className="popover-toggle">
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

class Tabs extends Component {
  state = {
    tabs: [{
      id: 't1',
      title: 'Mm Bacon 🍗',
      panel: <div><p>Bacon ipsum dolor amet pork prosciutto tail ground round cow pancetta ham beef.  Brisket cupim shoulder drumstick turkey sausage cow pork beef pig venison boudin.  Ham hock bacon hamburger alcatra boudin shank shankle porchetta short ribs.  Jowl shank shoulder, pork belly tail ham hock ribeye fatback sirloin doner beef swine ground round meatball hamburger.</p><p>Venison pork turkey jerky pig.  Kevin andouille pastrami, ham hock sausage landjaeger sirloin tri-tip spare ribs boudin kielbasa tenderloin bresaola.  Short loin ribeye biltong capicola salami tenderloin, fatback ground round rump sirloin meatloaf porchetta.  Pork loin alcatra short loin ham hock kevin salami beef ribs filet mignon leberkas.  Bresaola pork landjaeger, tail jowl t-bone corned beef.  Cupim ground round tail brisket, pork belly short loin t-bone.  Beef ribs pork chop kevin short ribs frankfurter alcatra ball tip ground round jerky.</p></div>
    }, {
      id: 't2',
      title: 'Zombiez 💀',
      panel: <div><p>Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris. Hi mindless mortuis soulless creaturas, imo evil stalking monstra adventus resi dentevil vultus comedat cerebella viventium. Qui animated corpse, cricket bat max brucks terribilem incessu zomby. The voodoo sacerdos flesh eater, suscitat mortuos comedere carnem virus. Zonbi tattered for solum oculi eorum defunctis go lum cerebro.</p></div>
    }, {
      id: 't3',
      title: 'Samuel 👨🏿',
      panel: <div><h1>No man, I don't eat pork</h1><p>Now that we know who you are, I know who I am. I'm not a mistake! It all makes sense! In a comic, you know how you can tell who the arch-villain's going to be? He's the exact opposite of the hero. And most times they're friends, like you and me! I should've known way back when... You know why, David? Because of the kids. They called me Mr Glass.</p><p>Your bones don't break, mine do. That's clear. Your cells react to bacteria and viruses differently than mine. You don't get sick, I do. That's also clear. But for some reason, you and I react the exact same way to water. We swallow it too fast, we choke. We get some in our lungs, we drown. However unreal it may seem, we are connected, you and I. We're on the same curve, just on opposite ends.</p></div>
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
        <div className="tab-set">
          <h3>Tabs (Stateless)</h3>
          <AriaTabList className="tab-list">
            {tabs.map(({ id, title }) =>
              <AriaTab
                key={id}
                id={id}
                isActive={id === activeId}
                className={`tab-list-item ${id === activeId ? 'is-active' : ''}`}
              >
                {title}
              </AriaTab>
            )}
          </AriaTabList>
          <div className="tab-panels">
            {tabs.map(({ id, panel }) =>
              <AriaPanel
                key={id}
                controlledBy={id}
                isActive={id === activeId}
                className="tab-panel"
              >
                {panel}
              </AriaPanel>
            )}
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
      panel: <div>Some cool content for accordion one.</div>
    }, {
      tab: 'two',
      panel: <div>Some cool content for accordion two.</div>
    }, {
      tab: 'three',
      panel: <div>Some cool content for accordion three.</div>
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

class App extends Component {
  render() {
    return (
      <div>
        <Dropdown/>
        <Modal/>
        <Popover/>
        <Tabs/>
        <Accordion/>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))
