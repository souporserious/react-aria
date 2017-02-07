## React ARIA

[![npm version](https://badge.fury.io/js/react-aria.svg)](https://badge.fury.io/js/react-aria)
[![Dependency Status](https://david-dm.org/souporserious/react-aria.svg)](https://david-dm.org/souporserious/react-aria)

A set of utility components to help compose ARIA components in React. Please feel free to file an issue or submit a PR if you feel these can be more ARIA compliant ❤️

## Usage

`yarn add react-aria`

`npm install react-aria --save`

```html
<script src="https://unpkg.com/react-aria/dist/react-aria.js"></script>
(UMD library exposed as `ReactARIA`)
```

### Building a select menu

```jsx
import { Trigger, Select: { Manager, OptionList, Option } } from 'react-aria'

class SelectMenu extends Component {
  state = {
    selection: null
  }

  _handleSelection = (item, e) => {
    this.setState({
      selection: item.value,
      isOpen: false
    })
  }

  render() {
    const { isOpen } = this.state
    return (
      <Manager>
        <Trigger
          controls="select-menu"
          type="menu"
          isOpen={isOpen}
          onToggle={() => this.setState({ isOpen: !isOpen })}
        >
          {this.state.selection || 'Select A Dropdown Item'}
        </Trigger>
        { isOpen &&
          <OptionList
            id="select-menu"
            onOptionSelection={this._handleSelection}
            onRequestClose={() => this.setState({ isOpen: false })}
          >
            <Option value="apples">Apples</Option>
            <Option value="pears">Pears</Option>
            <Option value="oranges">Oranges</Option>
          </OptionList>
        }
      </Manager>
    )
  }
}
```

### Building a set of tabs

```jsx
import { Tabs: { Manager, TabList, Tab, TabPanel } } from 'react-aria'

class TabsDemo extends Component {
  state = {
    tabs: [{
      id: 't1',
      title: 'Bacon 🐷',
      panel: <div>And eggs 🐔</div>
    }, {
      id: 't2',
      title: 'Zombiez 💀',
      panel: <div>Brainz</div>
    }, {
      id: 't3',
      title: 'Samuel 👨🏿',
      panel: <div>Samuel L Jackson</div>
    }],
    activeId: 't2'
  }

  render() {
    const { tabs, activeId } = this.state
    return (
      <Manager
        activeTabId={activeId}
        onChange={id => this.setState({ activeId: id })}
        className="tab-set"
      >
        <TabList className="tab-list">
          {tabs.map(({ id, title }) =>
            <Tab
              key={id}
              id={id}
              isActive={id === activeId}
              className={`tab-list-item ${id === activeId ? 'is-active' : ''}`}
            >
              {title}
            </Tab>
          )}
        </TabList>
        <div className="tab-panels">
          {tabs.map(({ id, panel }) =>
            <TabPanel
              key={id}
              controlledBy={id}
              isActive={id === activeId}
              className="tab-panel"
            >
              {panel}
            </TabPanel>
          )}
        </div>
      </Manager>
    )
  }
}
```

## Running Locally

clone repo

`git clone git@github.com:souporserious/react-aria.git`

move into folder

`cd ~/react-aria`

install dependencies

`npm install`

run dev mode

`npm run dev`

open your browser and visit: `http://localhost:8080/`

## Thank You

Huge thank you to [David Clark](https://github.com/davidtheclark) and all of his ARIA work. Most of the code in here is heavily inspired by what he has done.
