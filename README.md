## React ARIA

[![npm version](https://badge.fury.io/js/react-aria.svg)](https://badge.fury.io/js/react-aria)
[![Dependency Status](https://david-dm.org/souporserious/react-aria.svg)](https://david-dm.org/souporserious/react-aria)

Utility components to help compose React ARIA components.

## Usage

`yarn add react-aria`

`npm install react-aria --save`

```html
<script src="https://unpkg.com/react-aria/dist/react-aria.js"></script>
(UMD library exposed as `ReactARIA`)
```

### Example

```js
import { Manager, Toggle, Popover, Item } from 'react-aria'

class Dropdown extends Component {
  state = {
    selection: null
  }

  _handleSelection = (value, e) => {
    this.setState({ selection: value })
  }

  render() {
    return (
      <Manager onItemSelection={this._handleSelection}>
        { isOpen =>
          <div>
            <Toggle>
              {this.state.selection || 'Select A Dropdown Item'}
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
