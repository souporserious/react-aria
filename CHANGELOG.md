## CHANGELOG
### 0.7.0
Make sure `children` get pulled off of props so child functions work as expected

Cleanup invalid prop warnings

Added `ItemList`, and `Item` components for focusable and keyboard friendly items

Added `Select` components to build custom combobox and select menus

Breaking Changes:

Renamed `type` prop to `role` since `type` is a reserved word

Renamed `Overlay` prop `trapFocus` -> `scopeFocus`

Exports as `Trigger`, `Overlay`, `Items`, `Tabs`, `Select` now

Replaced `minivents` with `mitt`

Replaced `focus-trap` with `a11y-focus-scope`

Added `scroll-into-view`, and `upper-case-first` as dependencies

### 0.6.0
Exports as `Tabs`, and `Overlays` now, can be imported individually if needed ( e.g. import `Tabs` from `react-aria/Tabs` )

All new props will be documented in README

### 0.5.1
Fixed `Item` component to accept and use `value` prop

Added `isOpen` prop to `Manager` so user can control `Popover` open/close state

Ignore `input` when listening for taps

### 0.5.0
Removed `Aria` prefix from each component name

Added the ability to include `node_modules/react-aria/Menu` and `node_modules/react-aria/Tabs` if you don't need the kitchen sink

### 0.4.0
Trying to fix yarn add

### 0.3.2
Yarn publish fix

Remove bower

### 0.3.1
Update `focus-group` dependency to 0.3.1

### 0.3.0
Added `AriaTabList`, `AriaTab`, and `AriaPanel` components

Cleaned up other ARIA components to be smart based on `AriaManager` `type`

### 0.2.0
Fleshed out API

### 0.1.0
Initial release
