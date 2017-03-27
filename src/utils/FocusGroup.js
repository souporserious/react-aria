import mitt from 'mitt'
import scrollIntoView from './scroll-into-view'

class FocusGroup {
  constructor(userOptions) {
    const emitter = mitt()
    const options = {
      rootNode: document,
      members: [],
      initialIndex: 0,
      wrap: true,
      ...userOptions
    }

    this.on = emitter.on
    this.emit = emitter.emit
    this.off = emitter.off

    this._rootNode = options.rootNode
    this._members = options.members
    this._activeIndex = options.initialIndex
    this._options = options
  }

  activate() {
    document.addEventListener('click', this._handleClick, true)
    this._rootNode.addEventListener('keydown', this._handleKeydown, true)
  }

  deactivate() {
    document.removeEventListener('click', this._handleClick, true)
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
      ? this.getMemberIndexFromNode(member)
      : member

    if (indexToRemove !== -1) {
      this._members.splice(indexToRemove, 1)
    }
  }

  getMembers() {
    return this._members
  }

  getMemberIndexFromNode(member) {
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
      : this.getMemberIndexFromNode(document.activeElement)
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

  focus(index, shouldScrollIntoView = true) {
    const member = this._members[index]

    if (!member) {
      return
    }

    if (member.node.focus) {
      member.node.focus()
    } else if (member.node.select) {
      member.node.select()
    }

    if (shouldScrollIntoView) {
      scrollIntoView(member.node)
    }

    this._activeIndex = index

    this.emit('focus', member, index)
  }

  select(member = this.getActiveMember()) {
    this.emit('select', member)
  }

  _handleClick = (e) => {
    this._members.some(member => {
      if (e.target === member.node || e.target.contains(member.node)) {
        this.select(member)
        return true
      }
    })
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
        this.select()
        break;
      default:
        return;
    }
    // if we've made it here then we can safely preventDefault since it hit a method we wanted
    e.preventDefault()
  }
}

export default FocusGroup
