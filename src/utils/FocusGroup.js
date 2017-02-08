import mitt from 'mitt'

class FocusGroup {
  constructor(userOptions) {
    const options = {
      rootNode: document,
      members: [],
      initialIndex: 0,
      wrap: true,
      ...userOptions
    }
    const emitter = mitt()

    this.on = emitter.on
    this.emit = emitter.emit
    this.off = emitter.off

    this._rootNode = options.rootNode
    this._members = options.members
    this._activeIndex = options.initialIndex
    this._options = options
  }

  activate() {
    this._rootNode.addEventListener('keydown', this._handleKeydown, true)
  }

  deactivate() {
    this._rootNode.removeEventListener('keydown', this._handleKeydown, true)
  }

  setRootNode(node) {
    // deactivate, and then reactivate after setting root node so we can
    // attach the proper element to the keydown listener
    this.deactivate()
    this._rootNode = node
    this.activate()
  }

  addMember(member, index) {
    if (index !== null && index !== undefined) {
      this._members.splice(index, 0, member)
    } else {
      this._members.push(member)
    }
  }

  removeMember(member) {
    const indexToRemove = isNaN(member)
      ? this.getMemberIndex(member)
      : member

    if (indexToRemove !== -1) {
      this._members.splice(indexToRemove, 1)
    }
  }

  getMembers() {
    return this._members
  }

  getMemberIndex(member) {
    for (let i = 0; i < this._members.length; i++) {
      if (this._members[i].node === member) {
        return i
      }
    }
    return -1
  }

  getActiveIndex() {
    return this._rootNode !== document
      ? this._activeIndex
      : this.getMemberIndex(document.activeElement)
  }

  getActiveMember() {
    return this._members[this.getActiveIndex()]
  }

  prev() {
    const activeIndex = this.getActiveIndex()
    let targetIndex = activeIndex
    if (activeIndex > 0) {
      targetIndex = activeIndex - 1
    } else if (this._options.wrap) {
      targetIndex = this._members.length - 1
    }
    this.focus(targetIndex)
  }

  next() {
    const activeIndex = this.getActiveIndex()
    let targetIndex = activeIndex
    if (activeIndex < this._members.length - 1) {
      targetIndex = activeIndex + 1
    } else if (this._options.wrap) {
      targetIndex = 0
    }
    this.focus(targetIndex)
  }

  first() {
    this.focus(0)
  }

  last() {
    this.focus(this._members.length - 1)
  }

  focus(index) {
    const member = this._members[index]

    if (!member) {
      return
    }
    if (member.node.focus) {
      member.node.focus()
    }
    else if (member.node.tagName.toLowerCase() === 'input') {
      member.node.select()
    }

    this._activeIndex = index

    this.emit('focus', member, index)
  }

  selectFocusedMember(e) {
    this.emit('select', this.getActiveMember(), e)
  }

  _handleKeydown = (e) => {
    // only respond to keyboard events when
    // focus is already within the focus-group
    if (this.getActiveIndex() === -1) return;

    // setTimeout prevents React from grabbing the event immediately after and
    // causing unexpected behaviour like triggering a button that receives focus
    // maybe we can fix this somehow?
    switch (e.keyCode) {
      case 38: // ArrowUp
        this.prev()
        break;
      case 40: // ArrowDown
        this.next()
        break;
      case 36: // Home
        this.first()
        break;
      case 35: // End
        this.last()
        break;
      case 13: // Enter
        this.selectFocusedMember(e)
        break;
      default:
        return;
    }
    // if we've made it here then we can safely preventDefault since it hit a method we wanted
    e.preventDefault()
  }
}

export default FocusGroup
