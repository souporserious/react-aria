import IndexManager from './IndexManager'

class FocusGroup extends IndexManager {
  constructor({ root = document, ...options }) {
    super(options)

    this._root = root
    this._handleKeydown = this._handleKeydown.bind(this)

    this._options = {
      onSelect: () => null,
      ...this._options,
      ...options,
      faux: this._root !== document
    }
  }

  activate() {
    this._root.addEventListener('keydown', this._handleKeydown, true)
  }

  deactivate() {
    this._root.removeEventListener('keydown', this._handleKeydown, true)
  }

  focus(index) {
    this.select(index)
  }

  selectFocusedMember() {
    this._options.onSelect(this.getActiveMember())
  }

  _handleKeydown(e) {
    // only respond to keyboard events when
    // focus is already within the focus-group
    if (this.getActiveIndex() === -1) return;

    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault()
        this.prev()
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault()
        this.next()
        break;
      case 'Enter':
        this.selectFocusedMember()
        break;
    }
  }
}

export default FocusGroup
