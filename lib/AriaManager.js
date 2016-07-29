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

var _noScroll = require('no-scroll');

var _noScroll2 = _interopRequireDefault(_noScroll);

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
  end: 35,
  home: 36,
  arrowLeft: 37,
  arrowUp: 38,
  arrowRight: 39,
  arrowDown: 40
};

var checkedProps = {
  type: _react.PropTypes.oneOf(['menu', 'popover', 'modal', 'tooltip', 'alert', 'tabs', 'accordion']).isRequired,
  tag: _react.PropTypes.string,
  trapFocus: _react.PropTypes.bool,
  freezeScroll: _react.PropTypes.bool,
  activeTabId: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  //defaultTabId:       PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
  collapsible: _react.PropTypes.bool,
  openPopoverOn: _react.PropTypes.oneOf(['tap', 'hover']),
  closeOnOutsideClick: _react.PropTypes.bool,
  closeOnItemSelection: _react.PropTypes.bool,
  accordion: _react.PropTypes.bool,
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
      freezeScroll: false,
      keybindings: {
        next: [{ keyCode: KEYS.arrowDown }, { keyCode: KEYS.arrowRight }],
        prev: [{ keyCode: KEYS.arrowUp }, { keyCode: KEYS.arrowLeft }],
        first: { keyCode: KEYS.home },
        last: { keyCode: KEYS.end }
      },
      wrap: true,
      stringSearch: true,
      stringSearchDelay: 600,
      collapsible: false,
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

    this._onItemSelection = function (item, e) {
      var value = item.value || item.node.innerHTML;

      if (_this.props.closeOnItemSelection) {
        _this._closePopover();
      }

      _this.props.onItemSelection(value, e);
    };

    this._setToggleNode = function (node) {
      _this._toggle = node;
    };

    this._setPopoverNode = function (node) {
      _this._popover = node;
    };

    this._addMember = function (member) {
      var activeTabId = _this.props.activeTabId;
      var id = member.id;
      var index = member.index;
      var node = member.node;
      var text = member.text;

      if (index === undefined) {
        _this._members.push(member);
      } else {
        _this._members.splice(index, 0, member);
      }

      _this._focusGroup.addMember({
        node: node,
        text: text || node.innerHTML
      });

      if (member.type === 'tab') {
        if (activeTabId === id) {
          _this._activateTab(activeTabId, true);
        } else {
          _this._handleFirstTabSelection(id);
        }
      }
    };

    this._removeMember = function (member) {
      var pos = _this._members.indexOf(member);

      if (pos > -1) {
        _this._members.splice(member, 1);
        _this._focusGroup.removeMember(member.node);
      }
    };

    this._focusItem = function (index) {
      _this._focusGroup.focusNodeAtIndex(index);
    };

    this._openPopover = function () {
      var focusFirstMember = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
      var _props = _this.props;
      var freezeScroll = _props.freezeScroll;
      var onPopoverOpen = _props.onPopoverOpen;

      if (_this.state.isPopoverOpen) return;

      _this.setState({ isPopoverOpen: true });

      if (freezeScroll) {
        _noScroll2['default'].on();
      }

      onPopoverOpen();

      if (focusFirstMember) {
        setTimeout(function () {
          _this._focusItem(0);
        }, 60);
      }
    };

    this._closePopover = function () {
      var focusToggle = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
      var _props2 = _this.props;
      var freezeScroll = _props2.freezeScroll;
      var onPopoverClose = _props2.onPopoverClose;

      if (!_this.state.isPopoverOpen) return;

      _this.setState({ isPopoverOpen: false });

      if (freezeScroll) {
        _noScroll2['default'].off();
      }

      onPopoverClose();

      if (focusToggle) {
        setTimeout(function () {
          _this._toggle.focus();
        }, 60);
      }
    };

    this._togglePopover = function (focus) {
      if (!_this.state.isPopoverOpen) {
        _this._openPopover(focus);
      } else {
        _this._closePopover(focus);
      }
    };

    this._addPanel = function (panel) {
      var activeTabId = _this.props.activeTabId;
      var controlledBy = panel.controlledBy;

      _this._panels.push(panel);

      if (activeTabId === controlledBy) {
        _this._activateTab(activeTabId, true);
      } else {
        _this._handleFirstTabSelection(panel.controlledBy);
      }
    };

    this._focusTab = function (id) {
      var tabToFocus = _this._members.filter(function (tab) {
        return tab.id === id;
      });
      if (tabToFocus) {
        tabToFocus.node.focus();
      }
    };

    this._activateTab = function (id, forceActivate) {
      var type = _this.props.type;

      if (type === 'tabs') {
        if (id === _this._activeTabId && !forceActivate) {
          return;
        } else {
          _this._activeTabId = id;
        }
      }

      if (_this.props.onChange) {
        _this.props.onChange(id);
        return;
      }

      for (var i = _this._members.length; i--;) {
        var tab = _this._members[i];
        if (type === 'accordion') {
          if (tab.id === id) {
            tab.toggleActiveState();
          }
        } else {
          tab.setActiveState(id === tab.id);
        }
      }
      for (var i = _this._panels.length; i--;) {
        var panel = _this._panels[i];
        if (type === 'accordion') {
          if (panel.controlledBy === id) {
            panel.toggleActiveState();
          }
        } else {
          panel.setActiveState(id === panel.controlledBy);
        }
      }
    };

    this.state = {
      isPopoverOpen: false
    };
    this._focusGroup = (0, _focusGroup2['default'])(props);
    this._toggle = null;
    this._popover = null;
    this._members = [];

    this._activeTabId = null;
    this._panels = [];
    this._uuid = 'RA' + Math.abs(~ ~(Math.random() * new Date()));
  }

  _createClass(AriaManager, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        ariaManager: {
          uuid: this._uuid,
          type: this.props.type,
          trapFocus: this.props.trapFocus,
          initialFocus: this.props.initialFocus,
          isPopoverOpen: this.state.isPopoverOpen,
          onItemSelection: this._onItemSelection,
          setToggleNode: this._setToggleNode,
          setPopoverNode: this._setPopoverNode,
          addMember: this._addMember,
          addPanel: this._addPanel,
          removeMember: this._removeMember,
          activateTab: this._activateTab,
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
      this._focusGroup.activate();
      _eventsHandler2['default'].add(this);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._focusGroup.deactivate();
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
      var _props3 = this.props;
      var openPopoverOn = _props3.openPopoverOn;
      var closeOnOutsideClick = _props3.closeOnOutsideClick;
      var target = e.target;

      if (this._toggle) {
        var toggleDisabled = this._toggle.getAttribute('disabled');

        if (isTarget(this._toggle, target) && toggleDisabled === null) {
          if (openPopoverOn === 'tap') {
            this._togglePopover(false);
          } else {
            this._openPopover(false);
          }
          return;
        } else if (closeOnOutsideClick && this._popover && !isTarget(this._popover, target)) {
          this._closePopover(false);
          return;
        }
      }

      for (var i = this._members.length; i--;) {
        var member = this._members[i];
        if (member.node === target) {
          if (member.type === 'item') {
            this._onItemSelection(member, e);
          } else {
            this._activateTab(member.id);
          }
          return;
        }
      }
    }
  }, {
    key: '_onKeyDown',
    value: function _onKeyDown(_ref) {
      var keyCode = _ref.keyCode;

      if (this.state.isPopoverOpen) {
        if (!this.props.trapFocus && keyCode === KEYS.tab) {
          this._closePopover(false);
        } else if (keyCode === KEYS.escape) {
          this._closePopover();
        }
      }
    }
  }, {
    key: '_handleFirstTabSelection',
    value: function _handleFirstTabSelection(id) {
      if (this.props.type === 'tabs' && !this._activeTabId || id === this._activeTabId) {
        this._activateTab(id, true);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props4 = this.props;
      var tag = _props4.tag;
      var children = _props4.children;

      var props = (0, _specialAssign2['default'])({}, this.props, checkedProps);

      if (typeof children === 'function') {
        return children(this.state.isPopoverOpen);
      }

      return (0, _react.createElement)(tag, props, children);
    }
  }]);

  return AriaManager;
})(_react.Component);

exports['default'] = AriaManager;
module.exports = exports['default'];