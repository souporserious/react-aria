import createFocusGroup from 'focus-group'
import keys from './keys'

const defaultOptions = {
  keybindings: {
    next: [{ keyCode: keys.arrowDown }, { keyCode: keys.arrowRight }],
    prev: [{ keyCode: keys.arrowUp }, { keyCode: keys.arrowLeft }],
    first: { keyCode: keys.home },
    last: { keyCode: keys.end }
  },
  wrap: true,
  stringSearch: true,
  stringSearchDelay: 600
}

class Members {
  constructor(options = {}) {
    this.collection = []
    this.options = { ...defaultOptions, ...options }
    this.focusGroup = createFocusGroup(this.options)
  }

  add = (member) => {
    const { id, index, node, text } = member

    if (index === undefined) {
      this.collection.push(member)
    } else {
      this.collection.splice(index, 0, member)
    }

    this.focusGroup.addMember({
      node,
      text: text || node.innerHTML
    })

    // activate focus group if this was the first member added
    if (this.collection.length === 1) {
      this.focusGroup.activate()
    }

    if (typeof this.options.onAdd === 'function') {
      this.options.onAdd(member)
    }
  }

  remove = (member) => {
    const pos = this.collection.indexOf(member)

    if (pos > -1) {
      this.collection.splice(member, 1)
      this.focusGroup.removeMember(member.node)
    }

    // deactivate focus group if this was the last member removed
    if (this.collection.length <= 0) {
      this.focusGroup.activate()
    }

    if (typeof this.options.onRemove === 'function') {
      this.options.onRemove(member)
    }
  }

  focus = (index) => {
    this.focusGroup.focusNodeAtIndex(index)
  }
}

export default Members
