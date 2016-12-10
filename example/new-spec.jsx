// NEW REACT ARIA SPEC
import { Popovers: { Manager, Toggle, Input, Popover, Item } } = 'react-aria'


////////////////////////////////////////////
// POPOVER (LATEST)
///////////////////////////////////////////
<Overlay.Toggle controls="my-popover">
  Toggle Popover (Receives focus after modal closes, keyboard accessible, etc..)
</Overlay.Toggle>
<Overlay.Manager
  id="my-popover"
  trapFocus={false} // traps focus within the popover, mainly useful for compliant ARIA modals
  freezeScroll={false} // prevents the main document scrollbar from being able to scroll while popover is open
  onRequestClose={() => this.setState({ isOpen: false })}
  onOutsideClick={() => this.setState({ isOpen: false })}
  onItemSelection={(item, e) => {
    console.log('item selected:', item)
    this.setState({ isOpen: false })
  }}
>
  <TransitionMotion> // allows composition of other components
    { this.state.isOpen &&
      <Overlay.Popover> // this can be other provided components <Overlay.Modal>, <Overlay.Menu>, etc.
        <div>Popover!</div>
        <Overlay.Item>Item 1</Overlay.Item>
        <Overlay.Item>Item 2</Overlay.Item>
        <Overlay.Item>Item 3</Overlay.Item>
      </Overlay.Popover>
    }
  </TransitionMotion>
</Overlay.Manager>


////////////////////////////////////////////
// MODAL
///////////////////////////////////////////
<Popovers.Manager
  trapFocus={true||false} // keeps focus contained within popover
  freezeScroll={true||false} // prevents window from being able to scroll
  // closeOnOutsideTap
  // onOutsideTap
>
 { (isOpen, requestClose) =>
    <div>
      <Popovers.Toggle
        className={classNames(
          'popover-toggle',
          isOpen && 'is-active',
        )}
      >
        Toggle Modal
      </Popovers.Toggle>
      <Transition>
        { isOpen &&
          <Popovers.Modal>
            Modal Content
            <button
              type="button"
              onClick={requestClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={requestClose}
            >
              Save
            </button>
          </Popovers.Modal>
        }
      </Transition>
    </div>
  }
</Popovers.Manager>


////////////////////////////////////////////
// TOOLTIP
///////////////////////////////////////////
const { Manager, Toggle, Tooltip } = Overlays
<Manager
  isOpen={true||false} // user should be able to control open state of every popover
>
  { isOpen =>
    <div>
      <Toggle on={['tap'||'hover'||'focus']}> // array of values
        I could be an input or even an icon that toggles the tooltip.
      </Toggle>
      <Tooltip>
        <Transition>
          { isOpen &&
            <div>
              This is some helper information that pops up on hover.
            </div>
          }
        </Transition>
      </Tooltip>
    </div>
  }
</Manager>

////////////////////////////////////////////
// TOOLTIP ALT
///////////////////////////////////////////
const { Manager, Toggle, Tooltip } = Overlays
<Manager>
  <Toggle>
    { (props, isOpen) =>
      <div {...props}>Trigger</div>
    }
  </Toggle>
  <Tooltip>
    { (props, isOpen) =>
      <Transition>
        { isOpen &&
          <div {...props}>
            This is some helper information that pops up on hover.
          </div>
        }
      </Transition>
    }
  </Tooltip>
</Manager>


////////////////////////////////////////////
// ALERT
///////////////////////////////////////////
<Manager>
  <Popover
    type="alert"
    isOpen={this.state.hasError}
  >
    Alert things are broken!
    <Button type="button">Cancel</Button>
    <Button type="submit">Save</Button>
  </Popover>
</Manager>


////////////////////////////////////////////
// MENU
///////////////////////////////////////////
<Manager>
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
</Manager>


////////////////////////////////////////////
// INPUT POPOVER
///////////////////////////////////////////
<Manager>
  <Input
    onChange={this._handleChange}
  />
  <Popover
    ref={c => this._popover = c}
    component={c => <Transition>{c}</Transition>} // specify transition in a component render function?
    isOpen={this.state.isOpen}
    onOpen={this._handleOpen}
    onClose={this._handleClose}
  >
    <Item onSelect={() => action1()}>Item 1</Item>
    <Item onSelect={() => action2()}>Item 2</Item>
    <Item onSelect={() => action3()}>Item 3</Item>
    <button onClick={() => this._popover.close()}>
      Open Something
    </button>
  </Popover>
</Manager>


////////////////////////////////////////////
// INPUT POPOVER
///////////////////////////////////////////
<Manager
  isOpen={this.state.isOpen}
  onOpen={this._handleOpen}
  onClose={this._handleClose}
>
  { isOpen =>
    <div>
      <Input
        onChange={this._handleChange}
      />
      <Transition> // or compose more naturally?
        { isOpen &&
          <Popover ref={c => this._popover = c}>
            <Item onSelect={() => action1()}>Item 1</Item>
            <Item onSelect={() => action2()}>Item 2</Item>
            <Item onSelect={() => action3()}>Item 3</Item>
            <button onClick={() => this._popover.close()}>
              Open Something
            </button>
          </Popover>
        }
      </Transition>
    </div>
  }
</Manager>


import { Tabs: { Manager, TabList, Tab, TabPanel } } from 'react-aria'

////////////////////////////////////////////
// TABS
// Might be better to split these components up into tabs and accordion since they differ so much
// but, it is nice to be able to switch functionality so easy, thinking a responsive scenario
///////////////////////////////////////////
<Tabs||Accordion
  type="tabs||accordion"
  activeTabId={this.state.activeTabId}
  defaultActiveTabId="2" // set the default tab if youre not controlling state
  // activeTabs={{1: true, 0: true}} // maybe allow this for accordion
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
togglePopover(popoverId)

changeTab(tabId)
