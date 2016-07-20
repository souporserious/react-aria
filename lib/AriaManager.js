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

var KEYS = {
  tab: 9,
  escape: 27,
  enter: 13,
  space: 32,
  end: 35,
  home: 36,
  arrowLeft: 37,
  arrowUp: 38,
  arrowRight: 39,
  arrowDown: 40
};

var checkedProps = {
  tag: _react.PropTypes.string,
  trapFocus: _react.PropTypes.bool,
  children: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.node]).isRequired,
  keybindings: _react.PropTypes.shape({
    next: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.array]),
    prev: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.array]),
    first: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.array]),
    last: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.array])
  }),
  wrap: _react.PropTypes.bool,
  stringSearch: _react.PropTypes.bool,
  stringSearchDelay: _react.PropTypes.number,
  openPopoverOn: _react.PropTypes.oneOf(['tap', 'hover']),
  closeOnOutsideClick: _react.PropTypes.bool,
  closeOnItemSelection: _react.PropTypes.bool,
  onPopoverOpen: _react.PropTypes.func,
  onPopoverClose: _react.PropTypes.func,
  onItemSelection: _react.PropTypes.func
};

var AriaManager = (function (_Component) {
  _inherits(AriaManager, _Component);

  _createClass(AriaManager, null, [{
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
      trapFocus: false,
      keybindings: {
        next: [{ keyCode: KEYS.arrowDown }, { keyCode: KEYS.arrowRight }],
        prev: [{ keyCode: KEYS.arrowUp }, { keyCode: KEYS.arrowLeft }],
        first: { keyCode: KEYS.home },
        last: { keyCode: KEYS.end }
      },
      wrap: true,
      stringSearch: true,
      stringSearchDelay: 600,
      openPopoverOn: 'tap',
      closeOnOutsideClick: true,
      closeOnItemSelection: true,
      onPopoverOpen: function onPopoverOpen() {
        return null;
      },
      onPopoverClose: function onPopoverClose() {
        return null;
      },
      onItemSelection: function onItemSelection() {
        return null;
      }
    },
    enumerable: true
  }]);

  function AriaManager(props) {
    var _this = this;

    _classCallCheck(this, AriaManager);

    _get(Object.getPrototypeOf(AriaManager.prototype), 'constructor', this).call(this, props);

    this._setToggleNode = function (node) {
      _this._toggle = node;
    };

    this._setPopoverNode = function (node) {
      _this._popover = node;
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

    this._openPopover = function () {
      var focusPopover = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

      if (_this.state.isOpen) return;

      _this.setState({ isOpen: true });

      _this.props.onPopoverOpen();

      _this._focusGroup.activate();

      if (focusPopover) {
        // setTimeout allows animated popovers to still focus
        setTimeout(function () {
          _this._focusItem(0);
        }, 60);
      }
    };

    this._closePopover = function () {
      var focusToggle = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

      if (!_this.state.isOpen) return;

      _this.setState({ isOpen: false });

      _this.props.onPopoverClose();

      _this._focusGroup.deactivate();

      if (focusToggle) {
        _this._toggle.focus();
      }
    };

    this._togglePopover = function (focus) {
      if (!_this.state.isOpen) {
        _this._openPopover(focus);
      } else {
        _this._closePopover(focus);
      }
    };

    this.state = {
      isOpen: false
    };
    this._focusGroup = (0, _focusGroup2['default'])(props);
    this._toggle = null;
    this._popover = null;
    this._items = [];
  }

  _createClass(AriaManager, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        ariaManager: {
          trapFocus: this.props.trapFocus,
          initialFocus: this.props.initialFocus,
          isOpen: this.state.isOpen,
          onItemSelection: this._onItemSelection,
          setToggleNode: this._setToggleNode,
          setPopoverNode: this._setPopoverNode,
          addItem: this._addItem,
          removeItem: this._removeItem,
          clearItems: this._clearItems,
          focusItem: this._focusItem,
          openPopover: this._openPopover,
          closePopover: this._closePopover,
          togglePopover: this._togglePopover
        }
      };
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      _eventsHandler2['default'].add(this, this.props.openPopoverOn);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._focusGroup.deactivate();
      this._toggle = null;
      this._popover = null;
      this._items = [];

      _eventsHandler2['default'].remove(this);
    }
  }, {
    key: '_onTap',
    value: function _onTap(e) {
      if (this.props.openPopoverOn === 'tap') {
        this._handleTapOrHover(e);
      }
    }
  }, {
    key: '_onHover',
    value: function _onHover(e) {
      if (this.props.openPopoverOn === 'hover') {
        this._handleTapOrHover(e);
      }
    }
  }, {
    key: '_handleTapOrHover',
    value: function _handleTapOrHover(e) {
      var _props = this.props;
      var openPopoverOn = _props.openPopoverOn;
      var closeOnOutsideClick = _props.closeOnOutsideClick;
      var target = e.target;

      var toggleDisabled = this._toggle.getAttribute('disabled');

      if (isTarget(this._toggle, target) && toggleDisabled === null) {
        if (openPopoverOn === 'tap') {
          this._togglePopover(false);
        } else {
          this._openPopover(false);
        }
      } else if (closeOnOutsideClick && this._popover && !isTarget(this._popover, target)) {
        this._closePopover(false);
      } else {
        for (var i = this._items.length; i--;) {
          var item = this._items[i];
          if (item.node === target) {
            this._onItemSelection(item, e);
          }
        }
      }
    }
  }, {
    key: '_onKeyDown',
    value: function _onKeyDown(e) {
      var keyCode = e.keyCode;
      var target = e.target;

      if (this.state.isOpen) {
        if (!this.props.trapFocus && keyCode === KEYS.tab) {
          this._closePopover(false);
        } else if (keyCode === KEYS.escape) {
          e.preventDefault();
          this._closePopover();
        } else if ([KEYS.enter, KEYS.space].indexOf(keyCode) > -1) {
          for (var i = this._items.length; i--;) {
            var item = this._items[i];
            if (item.node === target) {
              e.preventDefault();
              this._onItemSelection(item, e);
            }
          }
        }
      } else if ([KEYS.arrowUp, KEYS.arrowDown, KEYS.enter, KEYS.space].indexOf(keyCode) > -1) {
        if (isTarget(this._toggle, target)) {
          e.preventDefault();
          this._openPopover();
        }
      }
    }
  }, {
    key: '_onItemSelection',
    value: function _onItemSelection(item, e) {
      var value = item.value || item.node.innerHTML;

      if (this.props.closeOnItemSelection) {
        this._closePopover();
      }

      this.props.onItemSelection(value, e);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var tag = _props2.tag;
      var children = _props2.children;

      var props = (0, _specialAssign2['default'])({}, this.props, checkedProps);

      if (typeof children === 'function') {
        return children(this.state.isOpen);
      }

      return (0, _react.createElement)(tag, props, children);
    }
  }]);

  return AriaManager;
})(_react.Component);

exports['default'] = AriaManager;
module.exports = exports['default'];