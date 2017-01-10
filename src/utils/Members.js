import FocusGroup from './FocusGroup'

class Members {
  constructor(options = {}) {
    this.collection = []
    this.options = options
    this.focusGroup = new FocusGroup(this.options)
  }

  setRootNode = (node) => {
    // deactivate, then activate after setting root node so we can attach keydown listener
    this.focusGroup.deactivate()
    this.focusGroup.setRootNode(node)
    this.focusGroup.activate()
  }

  add = (member) => {
    const { index, node, text } = member

    if (index === undefined) {
      this.collection.push(member)
    } else {
      this.collection.splice(index, 0, member)
    }

    // add member to focus group
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
      this.focusGroup.deactivate()
    }

    if (typeof this.options.onRemove === 'function') {
      this.options.onRemove(member)
    }
  }

  focus = (index) => {
    this.focusGroup.focus(index)
  }
}

export default Members
