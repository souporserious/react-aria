import createFocusGroup from 'focus-group'
import keys from './keys'

const defaultOptions = {
  keybindings: {
    next:[{ keyCode: keys.arrowDown }, { keyCode: keys.arrowRight }],
    prev:[{ keyCode: keys.arrowUp }, { keyCode: keys.arrowLeft }],
    first: { keyCode: keys.home },
    last: { keyCode: keys.end }
  },
  wrap: true,
  stringSearch: true,
  stringSearchDelay: 600,
}

class Members {
  constructor(options) {
    this._members = []
    this._focusGroup = createFocusGroup({
      ...defaultOptions,
      ...options
    })
  }

  add = (member) => {
    const { id, index, node, text } = member

    if (index === undefined) {
      this._members.push(member)
    } else {
      this._members.splice(index, 0, member)
    }

    this._focusGroup.addMember({
      node,
      text: text || node.innerHTML
    })

    // activate focus trap if this was the first member added
    if (this._members.length === 1) {
      this._focusGroup.activate()
    }
  }

  remove = (member) => {
    const pos = this._members.indexOf(member)

    if (pos > -1) {
      this._members.splice(member, 1)
      this._focusGroup.removeMember(member.node)
    }

    // deactivate focus trap if this was the last member removed
    if (this._members.length <= 0) {
      this._focusGroup.activate()
    }
  }

  focus = (index) => {
    this._focusGroup.focusNodeAtIndex(index)
  }
}

export default Members
