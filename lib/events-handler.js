'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _teenyTap = require('teeny-tap');

var _teenyTap2 = _interopRequireDefault(_teenyTap);

exports['default'] = {
  _queue: [],

  add: function add(component) {
    this._queue.push(component);

    // attach listeners if this was the first component added
    if (this._queue.length === 1) {
      this._attachListeners();
    }
  },

  remove: function remove(component) {
    var pos = this._queue.indexOf(component);

    if (pos > -1) {
      this._queue.splice(pos, 1);
    }

    // detach listeners if this was the last component removed
    if (this._queue.length <= 0) {
      this._detachListeners();
    }
  },

  _attachListeners: function _attachListeners() {
    this._tapListener = (0, _teenyTap2['default'])(document.documentElement, this._documentEvent.bind(this, '_onTap'));
    document.addEventListener('keydown', this._documentEvent.bind(this, '_onKeyDown'));
  },

  _detachListeners: function _detachListeners() {
    this._tapListener.remove();
    document.removeEventListener('keydown', this._documentEvent);
  },

  _documentEvent: function _documentEvent(method, e) {
    for (var i = this._queue.length; i--;) {
      this._queue[i][method](e);
    }
  }
};
module.exports = exports['default'];