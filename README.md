## React ARIA

[![npm version](https://badge.fury.io/js/react-aria.svg)](https://badge.fury.io/js/react-aria)
[![Dependency Status](https://david-dm.org/souporserious/react-aria.svg)](https://david-dm.org/souporserious/react-aria)

Utilities to help compose ARIA compliant components.

## Usage

`npm install react-aria --save`

```html
<script src="https://unpkg.com/react-aria/dist/react-aria.js"></script>
(UMD library exposed as `ReactARIA`)
```

### Example

```js
import { AriaManager, AriaToggle, AriaPopover, AriaItem } from 'react-aria'

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
            <AriaToggle>
              {this.state.selection || 'Select A Dropdown Item'}
            </AriaToggle>
            { isOpen &&
              <AriaPopover role="menu">
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
