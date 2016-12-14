// NEW REACT ARIA SPEC

////////////////////////////////////////////
// POPOVER (LATEST)
///////////////////////////////////////////
<Toggle controls="my-popover">
  Toggle Popover (Receives focus after modal closes, keyboard accessible, etc..)
</Toggle>
<Overlay
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
  <Transition> // allows composition of other components
    { this.state.isOpen &&
      <Popover> // this can be other provided components <Modal>, <Menu>, etc.
        <div>Popover!</div>
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
      </Popover>
    }
  </Transition>
</Overlay>


// building our own ARIA tooltip
class Tooltip extends Component {
  state = { isOpen: false }
  uuid = 'TOOLTIP' + Math.abs(~~(Math.random() * new Date()))
  open = () => this.setState({ isOpen: true })
  close = () => this.setState({ isOpen: false })

  render() {
    return (
      <div>
        <Toggle
          controls={this.uuid}
          toggleOn="hover"
          onToggle={this.open}
        >
          { props => cloneElement(firstChild, props)}
        </Toggle>
        <Overlay
          id={this.uuid}
          type="tooltip"
          onRequestClose={this.close}
        >
          { props =>
            <TransitionMotion>
              { this.state.isOpen &&
                <Portal>
                  {cloneElement(secondChild, props)}
                </Portal>
              }
            </TransitionMotion>
          }
        </Overlay>
      <div>
    )
  }
}

// <Overlay.Toggle on="hover">
//   <InfoIcon/>
// </Overlay.Toggle>
// <Overlay.Manager>
//   <Overlay.Tooltip>
//     Some Popover Content
//   </Overlay.Tooltip>
// </Overlay.Manager>

// <Overlay.Toggle on="hover" controls="tooltip">
//   <InfoIcon/>
// </Overlay.Toggle>
// <Overlay.Tooltip id="tooltip">
//   I'm a tooltip!
// </Overlay.Tooltip>

// <Toggle on="hover" controls="tooltip">
//   <InfoIcon/>
// </Toggle>
// <Overlay type="tooltip" id="tooltip">
// { props =>
//   <TransitionMotion>
//     { isOpen &&
//       <div {...props}>I'm a tooltip</div>
//     }
//   </TransitionMotion>
// }
// </Overlay>

// <Toggle controls="tip" on="hover">
//   <InfoIcon/>
// </Toggle>
// <Overlay id="tip" type="tooltip">
// { (props, isOpen) =>
//   <TransitionMotion>
//     { isOpen &&
//       <div {...props}>I'm a tooltip</div>
//     }
//   </TransitionMotion>
// }
// </Overlay>

// <Toggle controls="tip" on="hover">
//   <InfoIcon/>
// </Toggle>
// <Overlay id="tip" type="tooltip">
//   { props => this.state.isOpen &&
//     <div {...props}>I'm a tooltip</div>
//   }
// </Overlay>

// <Toggle controls="tip" on="hover">
//   <InfoIcon/>
// </Toggle>
// <Overlay id="tip" type="tooltip">
//   { props =>
//     <TransitionMotion>
//       { this.state.isOpen &&
//         <div {...props}>I'm a tooltip</div>
//       }
//     </TransitionMotion>
//   }
// </Overlay>


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
<Toggle>
  Trigger
</Toggle>
<Overlay>
  <Transition>
    { this.state.isOpen &&
      <Tooltip>
        This is some helper information that pops up on hover.
      </Tooltip>
    }
  </Transition>
</Overlay>


////////////////////////////////////////////
// ALERT
///////////////////////////////////////////
<Overlay>
  { isOpen &&
    <Alert>
      Alert things are broken!
      <Button type="button">Cancel</Button>
      <Button type="submit">Save</Button>
    </Alert>
  }
</Overlay>


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
