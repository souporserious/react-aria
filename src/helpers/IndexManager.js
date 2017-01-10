class IndexManager {
  constructor({
    members = [],
    activeIndex = 0,
    faux = false,
    wrap = true,
    onChange = () => null
  }) {
    this._members = members
    this._activeIndex = activeIndex
    this._options = {
      faux,
      wrap,
      onChange
    }
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
    return this._options.faux
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
    this.select(targetIndex)
  }

  next() {
    const activeIndex = this.getActiveIndex()
    let targetIndex = activeIndex
    if (activeIndex < this._members.length - 1) {
      targetIndex = activeIndex + 1
    } else if (this._options.wrap) {
      targetIndex = 0
    }
    this.select(targetIndex)
  }

  first() {
    this.select(0)
  }

  last() {
    this.select(this._members.length - 1)
  }

  select(index) {
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
    this._options.onChange(index)
  }
}

export default IndexManager
