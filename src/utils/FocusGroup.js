class FocusGroup {
  constructor({
    rootNode = document,
    members = [],
    activeIndex = 0,
    wrap = true,
    onChange = () => null,
    onSelect = () => null
  }) {
    this._rootNode = rootNode
    this._members = members
    this._activeIndex = activeIndex
    this._options = {
      wrap,
      onChange,
      onSelect
    }
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
    this._options.onChange(member, index)
  }

  selectFocusedMember() {
    this._options.onSelect(this.getActiveMember())
  }

  _handleKeydown = (e) => {
    // only respond to keyboard events when
    // focus is already within the focus-group
    if (this.getActiveIndex() === -1) return;

    switch (e.key) {
      // case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault()
        this.prev()
        break;
      // case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault()
        this.next()
        break;
      case 'Enter':
      case ' ':
        this.selectFocusedMember()
        break;
    }
  }
}

export default FocusGroup
