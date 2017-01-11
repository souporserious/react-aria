import FocusGroup from './FocusGroup'

class Members {
  constructor(options = {}) {
    this._collection = []
    this._options = options
    this._focusGroup = new FocusGroup(options)
  }

  setRootNode = (node) => {
    this._focusGroup.setRootNode(node)
  }

  getCollection() {
    return this._collection
  }

  add = (member) => {
    const { index, node, text } = member

    if (index !== null && index !== undefined) {
      this._collection.splice(index, 0, member)
    } else {
      this._collection.push(member)
    }

    // add member to focus group
    this._focusGroup.addMember({
      ...member,
      text: text || node.innerHTML
    })

    // activate focus group if this was the first member added
    if (this._collection.length === 1) {
      this._focusGroup.activate()
    }

    if (typeof this._options.onAdd === 'function') {
      this._options.onAdd(member)
    }
  }

  remove = (member) => {
    const pos = this._collection.indexOf(member)

    if (pos > -1) {
      this._collection.splice(member, 1)
      this._focusGroup.removeMember(member.node)
    }

    // deactivate focus group if this was the last member removed
    if (this._collection.length <= 0) {
      this._focusGroup.deactivate()
    }

    if (typeof this._options.onRemove === 'function') {
      this._options.onRemove(member)
    }
  }

  focus = (index) => {
    this._focusGroup.focus(index)
  }
}

export default Members
