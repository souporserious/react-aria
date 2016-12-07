// NEW REACT ARIA SPEC
import { Popovers: { Manager, Toggle, Popover, Item } } = 'react-aria'

////////////////////////////////////////////
// MODAL
///////////////////////////////////////////
<Manger>
  <Toggle>
    Toggle Modal
  </Toggle>
  <Popover
    type="modal"
    trapFocus={true||false} // keeps focus contained within popover
    freezeScroll={true||false} // prevents window from being able to scroll
    closeOnOutsideClick
  >
    Modal Content
    <Button type="button">Cancel</Button> // these are special buttons that will dismiss the popover after being clicked
    <Button type="submit">Save</Button>
  </Popover>
</Manger>


////////////////////////////////////////////
// TOOLTIP
///////////////////////////////////////////
<Manger>
  <Toggle on={'tap'||'hover'}>
    I could be an input or even an icon that toggles the tooltip.
  </Toggle>
  <Popover
    type="tooltip"
    isOpen={true||false} // user should be able to control open state of every popover
  >
    This is some helper information that pops up on hover.
  </Popover>
</Manger>


////////////////////////////////////////////
// ALERT
///////////////////////////////////////////
<Manger>
  <Popover
    type="alert"
    isOpen={this.state.hasError}
  >
    Alert things are broken!
    <Button type="button">Cancel</Button>
    <Button type="submit">Save</Button>
  </Popover>
</Manger>


////////////////////////////////////////////
// MENU
///////////////////////////////////////////
<Manger>
  <Toggle>
    Menu Toggle
  </Toggle>
  <Popover
    type="menu"
    onItemSelection={this._handleItemSelection} // items can be selected by mouse/keyboard so we have to control that and give users a callback
    closeOnItemSelection
  >
    <Item value="1">Menu Item 1</Item>
    <Item value="2">Menu Item 2</Item>
    <Item value="3">Menu Item 3</Item>
  </Popover>
</Manger>


////////////////////////////////////////////
// POPOVER
///////////////////////////////////////////
<Manger>
  <Toggle
    tag="input"
    onChange={this._handleChange}
  />
  <Popover
    isOpen={this.state.isOpen}
    onItemSelection={cb => cb()}
    onOpen={this._handleOpen}
    onClose={this._handleClose}
  >
    <Item value={() => action1()}>Item 1</Item>
    <Item value={() => action2()}>Item 2</Item>
    <Item value={() => action3()}>Item 3</Item>
    <Button>Open Something</Button>
  </Popover>
</Manger>


import { Tabs: { Manager, TabList, Tab, TabPanel } } from 'react-aria'

////////////////////////////////////////////
// TABS
///////////////////////////////////////////
<Manager
  type="tabs||accordion"
  activeTabId={this.state.activeTabId}
  multiselect={true||false}
  letterNavigation // allow users to navigate to a tab by letters
  onChange={id => this.setState({ activeTabId: id })}
>
  <TabList>
    <Tab id="1" isActive/>
    <Tab id="2"/>
    <Tab id="3"/>
  </TabList>
  <TabPanel controlledBy="1" isActive/>
  <TabPanel controlledBy="2"/>
  <TabPanel controlledBy="3"/>
</Manager>


////////////////////////////////////////////
// Public Functions
///////////////////////////////////////////
openPopover(popoverId)
closePopover(popoverId)
changeTab(tabId)
