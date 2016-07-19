import createTapListener from 'teeny-tap'

export default {
  _queue: [],

  add: function (component) {
    this._queue.push(component)

    // attach listeners if this was the first component added
    if (this._queue.length === 1) {
      this._attachListeners()
    }
  },

  remove: function (component) {
    const pos = this._queue.indexOf(component)

    if (pos > -1) {
      this._queue.splice(pos, 1)
    }

    // detach listeners if this was the last component removed
    if (this._queue.length <= 0) {
      this._detachListeners()
    }
  },

  _attachListeners: function () {
    this._tapListener = createTapListener(
      document.documentElement,
      this._documentEvent.bind(this, '_onTap')
    )
    document.addEventListener(
      'mouseover',
      this._documentEvent.bind(this, '_onHover')
    )
    document.addEventListener(
      'keydown',
      this._documentEvent.bind(this, '_onKeyDown')
    )
  },

  _detachListeners: function () {
    this._tapListener.remove()
    document.removeEventListener('mouseover', this._documentEvent)
    document.removeEventListener('keydown', this._documentEvent)
  },

  _documentEvent: function (method, e) {
    for (let i = this._queue.length; i--;) {
      this._queue[i][method](e)
    }
  }
}
