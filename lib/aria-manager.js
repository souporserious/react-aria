'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _focusGroup = require('focus-group');

var _focusGroup2 = _interopRequireDefault(_focusGroup);

var _eventsHandler = require('./events-handler');

var _eventsHandler2 = _interopRequireDefault(_eventsHandler);

var _specialAssign = require('./special-assign');

var _specialAssign2 = _interopRequireDefault(_specialAssign);

var isTarget = function isTarget(node, target) {
  return node === target || node.contains(target);
};

var checkedProps = {
  tag: _react.PropTypes.string,
  children: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.node]).isRequired,
  stringSearch: _react.PropTypes.bool,
  forwardArrows: _react.PropTypes.arrayOf(_react.PropTypes.string),
  backArrows: _react.PropTypes.arrayOf(_react.PropTypes.string),
  wrap: _react.PropTypes.bool,
  stringSearch: _react.PropTypes.bool,
  stringSearchDelay: _react.PropTypes.number,
  onSelection: _react.PropTypes.func.isRequired,
  closeOnSelection: _react.PropTypes.bool
};

var AriaManager = (function (_Component) {
  _inherits(AriaManager, _Component);

  function AriaManager() {
    var _this = this;

    _classCallCheck(this, AriaManager);

    _get(Object.getPrototypeOf(AriaManager.prototype), 'constructor', this).apply(this, arguments);

    this.state = {
      isOpen: false
    };
    this._focusGroup = (0, _focusGroup2['default'])(this.props);
    this._toggle = null;
    this._menu = null;
    this._items = [];

    this._setToggle = function (node) {
      _this._toggle = node;
    };

    this._setMenu = function (node) {
      _this._menu = node;
    };

    this._addItem = function (item) {
      _this._items.push(item);
      _this._focusGroup.addMember(item);
    };

    this._removeItem = function (item) {
      var pos = _this._items.indexOf(item);
      if (pos > -1) {
        _this._items.splice(pos, 1);
      }
      _this._focusGroup.removeMember(item);
    };

    this._clearItems = function () {
      _this._focusGroup.clearMembers();
    };

    this._focusItem = function (index) {
      _this._focusGroup.focusNodeAtIndex(index);
    };

    this._openMenu = function () {
      var focusMenu = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

      if (_this.state.isOpen) return;

      _this.setState({ isOpen: true });

      _this._focusGroup.activate();

      if (focusMenu) {
        _this._focusItem(0);
      }
    };

    this._closeMenu = function () {
      var focusToggle = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

      if (!_this.state.isOpen) return;

      _this.setState({ isOpen: false });

      _this._focusGroup.deactivate();

      if (focusToggle) {
        _this._toggle.focus();
      }
    };

    this._toggleMenu = function () {
      if (!_this.state.isOpen) {
        _this._openMenu();
      } else {
        _this._closeMenu();
      }
    };
  }

  _createClass(AriaManager, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        ariaManager: {
          isOpen: this.state.isOpen,
          onSelection: this._onSelection,
          setToggle: this._setToggle,
          setMenu: this._setMenu,
          addItem: this._addItem,
          removeItem: this._removeItem,
          clearItems: this._clearItems,
          focusItem: this._focusItem,
          openMenu: this._openMenu,
          closeMenu: this._closeMenu,
          toggleMenu: this._toggleMenu
        }
      };
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      _eventsHandler2['default'].add(this);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._focusGroup.deactivate();
      this._toggle = null;
      this._menu = null;
      this._items = [];

      _eventsHandler2['default'].remove(this);
    }
  }, {
    key: '_onTap',
    value: function _onTap(e) {
      var target = e.target;

      var toggleDisabled = this._toggle.getAttribute('disabled');

      if (isTarget(this._toggle, target) && toggleDisabled === null) {
        this._toggleMenu();
      } else if (this._menu && !isTarget(this._menu, target)) {
        this._closeMenu(false);
      } else {
        for (var i = this._items.length; i--;) {
          var item = this._items[i];
          if (item.node === target) {
            this._onSelection(item, e);
          }
        }
      }
    }
  }, {
    key: '_onKeyDown',
    value: function _onKeyDown(e) {
      var key = e.key;
      var target = e.target;

      if (this.state.isOpen) {
        if (key === 'Tab') {
          this._closeMenu(false);
        } else if (key === 'Escape') {
          e.preventDefault();
          this._closeMenu();
        } else if (['Enter', ' '].indexOf(key) > -1) {
          for (var i = this._items.length; i--;) {
            var item = this._items[i];
            if (item.node === target) {
              e.preventDefault();
              this._onSelection(item, e);
            }
          }
        }
      } else if (['ArrowUp', 'ArrowDown', 'Enter', ' '].indexOf(key) > -1) {
        if (isTarget(this._toggle, target)) {
          e.preventDefault();
          this._openMenu();
        }
      }
    }
  }, {
    key: '_onSelection',
    value: function _onSelection(item, e) {
      var value = item.value || item.node.innerHTML;

      if (this.props.closeOnSelection) {
        this._closeMenu();
      }

      this.props.onSelection(value, e);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var tag = _props.tag;
      var children = _props.children;

      var props = (0, _specialAssign2['default'])({}, this.props, checkedProps);
      if (typeof children === 'function') {
        return children(this.state.isOpen);
      }
      return (0, _react.createElement)(tag, props, children);
    }
  }], [{
    key: 'childContextTypes',
    value: {
      ariaManager: _react.PropTypes.object.isRequired
    },
    enumerable: true
  }, {
    key: 'propTypes',
    value: checkedProps,
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      tag: 'div',
      stringSearch: true,
      forwardArrows: ['right', 'down'],
      backArrows: ['left', 'up'],
      wrap: true,
      stringSearch: true,
      stringSearchDelay: 600,
      onSelection: function onSelection() {
        return null;
      },
      closeOnSelection: true
    },
    enumerable: true
  }]);

  return AriaManager;
})(_react.Component);

exports['default'] = AriaManager;
module.exports = exports['default'];