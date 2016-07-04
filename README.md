## React ARIA

[![npm version](https://badge.fury.io/js/react-aria.svg)](https://badge.fury.io/js/react-aria)
[![Dependency Status](https://david-dm.org/souporserious/react-aria.svg)](https://david-dm.org/souporserious/react-aria)

Utilities

## Usage

`npm install react-aria --save`

`bower install react-aria --save`

### Example

```js
import { AriaManager, Toggle, Menu, MenuItem } from 'react-aria'

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
