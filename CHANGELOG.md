## CHANGELOG
### 0.9.2
Fix `OptionList` children prop type

Add `children` prop type for the `Select.Manager` component

### 0.9.1
Fix `component` prop type to be any for now

### 0.9.0
Move `Overlay` into `Overlays` namespace

Add `Manager` component for easy uncontrolled `Trigger` and `Overlay` usage

Use `unique-number` package to generate better uuid's

Fix nested `Overlay` components causing the whole tree to close

Change prop name `tag` -> `component`

Allow all `Manager` style components to just pass `children` through

Make sure the `Overlay` component only returns focus if another focusable item was not clicked

Set `activeDescendant` properly

### 0.8.2
Exclude `lastActiveElement` as an outside click

Prevent `button` element from triggering `onClick` with keyboard

Added public `focusMember` and `getActiveMember` methods to `ItemList` and `OptionList`

### 0.8.1
Rename `currentFocus` -> `initialFocus` since `initialFocus` is more practical

Removed internal `Members` class in place of just using `FocusGroup` class

Added `returnFocus` to `Overlay` component to specify whether or not to return focus to the original element before mounting


### 0.8.0
Fix published build

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
