(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("createFocusGroup"), require("noScroll"), require("createTapListener"), require("ReactDOM"), require("focusTrap"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "createFocusGroup", "noScroll", "createTapListener", "ReactDOM", "focusTrap"], factory);
	else if(typeof exports === 'object')
		exports["ReactARIA"] = factory(require("React"), require("createFocusGroup"), require("noScroll"), require("createTapListener"), require("ReactDOM"), require("focusTrap"));
	else
		root["ReactARIA"] = factory(root["React"], root["createFocusGroup"], root["noScroll"], root["createTapListener"], root["ReactDOM"], root["focusTrap"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_11__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _AriaManager2 = __webpack_require__(1);

	var _AriaManager3 = _interopRequireDefault(_AriaManager2);

	exports.AriaManager = _AriaManager3['default'];

	var _AriaToggle2 = __webpack_require__(8);

	var _AriaToggle3 = _interopRequireDefault(_AriaToggle2);

	exports.AriaToggle = _AriaToggle3['default'];

	var _AriaPopover2 = __webpack_require__(10);

	var _AriaPopover3 = _interopRequireDefault(_AriaPopover2);

	exports.AriaPopover = _AriaPopover3['default'];

	var _AriaItem2 = __webpack_require__(12);

	var _AriaItem3 = _interopRequireDefault(_AriaItem2);

	exports.AriaItem = _AriaItem3['default'];

	var _AriaTabList2 = __webpack_require__(13);

	var _AriaTabList3 = _interopRequireDefault(_AriaTabList2);

	exports.AriaTabList = _AriaTabList3['default'];

	var _AriaTab2 = __webpack_require__(14);

	var _AriaTab3 = _interopRequireDefault(_AriaTab2);

	exports.AriaTab = _AriaTab3['default'];

	var _AriaPanel2 = __webpack_require__(15);

	var _AriaPanel3 = _interopRequireDefault(_AriaPanel2);

	exports.AriaPanel = _AriaPanel3['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _focusGroup = __webpack_require__(3);

	var _focusGroup2 = _interopRequireDefault(_focusGroup);

	var _noScroll = __webpack_require__(4);

	var _noScroll2 = _interopRequireDefault(_noScroll);

	var _eventsHandler = __webpack_require__(5);

	var _eventsHandler2 = _interopRequireDefault(_eventsHandler);

	var _specialAssign = __webpack_require__(7);

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

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _teenyTap = __webpack_require__(6);

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
	    document.addEventListener('mouseover', this._documentEvent.bind(this, '_onHover'));
	    document.addEventListener('keydown', this._documentEvent.bind(this, '_onKeyDown'));
	  },

	  _detachListeners: function _detachListeners() {
	    this._tapListener.remove();
	    document.removeEventListener('mouseover', this._documentEvent);
	    document.removeEventListener('keydown', this._documentEvent);
	  },

	  _documentEvent: function _documentEvent(method, e) {
	    for (var i = this._queue.length; i--;) {
	      this._queue[i][method](e);
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = specialAssign;

	function specialAssign(a, b, reserved) {
	  for (var x in b) {
	    if (!b.hasOwnProperty(x) || reserved[x]) continue;
	    a[x] = b[x];
	  }
	  return a;
	}

	module.exports = exports["default"];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(9);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _specialAssign = __webpack_require__(7);

	var _specialAssign2 = _interopRequireDefault(_specialAssign);

	var checkedProps = {
	  tag: _react.PropTypes.string,
	  children: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.node]).isRequired
	};

	var AriaToggle = (function (_Component) {
	  _inherits(AriaToggle, _Component);

	  function AriaToggle() {
	    var _this = this;

	    _classCallCheck(this, AriaToggle);

	    _get(Object.getPrototypeOf(AriaToggle.prototype), 'constructor', this).apply(this, arguments);

	    this._handleKeyDown = function (e) {
	      if (['ArrowUp', 'ArrowDown', ' '].indexOf(e.key) > -1 || _this.props.tag !== 'button' && e.key === 'Enter') {
	        if (!_this.context.ariaManager.isPopoverOpen) {
	          _this.context.ariaManager.openPopover();
	        } else {
	          _this.context.ariaManager.focusItem(0);
	        }
	      }
	      if (_this.props.onKeyDown) {
	        _this.props.onKeyDown(e);
	      }
	    };
	  }

	  _createClass(AriaToggle, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.context.ariaManager.setToggleNode((0, _reactDom.findDOMNode)(this));
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _context$ariaManager = this.context.ariaManager;
	      var type = _context$ariaManager.type;
	      var uuid = _context$ariaManager.uuid;
	      var isPopoverOpen = _context$ariaManager.isPopoverOpen;
	      var _props = this.props;
	      var tag = _props.tag;
	      var disabled = _props.disabled;
	      var children = _props.children;

	      var componentProps = {
	        role: 'button',
	        tabIndex: disabled ? '' : 0,
	        'aria-haspopup': true,
	        'aria-expanded': isPopoverOpen,
	        'aria-disabled': disabled,
	        onKeyDown: this._handleKeyDown
	      };

	      if (type === 'popover') {
	        componentProps['id'] = uuid;
	      }

	      if (type === 'tooltip') {
	        componentProps['aria-describedby'] = uuid;
	      }

	      var props = (0, _specialAssign2['default'])(componentProps, this.props, checkedProps);

	      if (typeof children === 'function') {
	        return children(props);
	      }

	      return (0, _react.createElement)(tag, props, children);
	    }
	  }], [{
	    key: 'contextTypes',
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
	      tag: 'button'
	    },
	    enumerable: true
	  }]);

	  return AriaToggle;
	})(_react.Component);

	exports['default'] = AriaToggle;
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(9);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _focusTrap = __webpack_require__(11);

	var _focusTrap2 = _interopRequireDefault(_focusTrap);

	var _specialAssign = __webpack_require__(7);

	var _specialAssign2 = _interopRequireDefault(_specialAssign);

	var checkedProps = {
	  tag: _react.PropTypes.string,
	  children: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.node]).isRequired
	};

	var AriaPopover = (function (_Component) {
	  _inherits(AriaPopover, _Component);

	  function AriaPopover() {
	    _classCallCheck(this, AriaPopover);

	    _get(Object.getPrototypeOf(AriaPopover.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(AriaPopover, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _context$ariaManager = this.context.ariaManager;
	      var trapFocus = _context$ariaManager.trapFocus;
	      var initialFocus = _context$ariaManager.initialFocus;
	      var onClickOutside = _context$ariaManager.onClickOutside;

	      this._setPopoverNode();

	      if (trapFocus) {
	        this._focusTrap = (0, _focusTrap2['default'])((0, _reactDom.findDOMNode)(this), {
	          initialFocus: initialFocus,
	          escapeDeactivates: false,
	          clickOutsideDeactivates: true
	        }).activate();
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      if (this.context.ariaManager.trapFocus) {
	        this._focusTrap.deactivate();
	      }
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(lastProps, lastState, lastContext) {
	      if (this.context.ariaManager.isPopoverOpen !== lastContext.ariaManager.isPopoverOpen) {
	        this._setPopoverNode();
	      }
	    }
	  }, {
	    key: '_setPopoverNode',
	    value: function _setPopoverNode() {
	      this.context.ariaManager.setPopoverNode((0, _reactDom.findDOMNode)(this));
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _context$ariaManager2 = this.context.ariaManager;
	      var type = _context$ariaManager2.type;
	      var uuid = _context$ariaManager2.uuid;
	      var isPopoverOpen = _context$ariaManager2.isPopoverOpen;
	      var _props = this.props;
	      var tag = _props.tag;
	      var children = _props.children;

	      var componentProps = {
	        'aria-hidden': !isPopoverOpen
	      };

	      if (type === 'menu') {
	        componentProps['role'] = 'menu';
	      } else if (type === 'modal') {
	        componentProps['role'] = 'dialog';
	      } else if (type === 'alert') {
	        componentProps['role'] = 'alertdialog';
	      } else if (type === 'tooltip') {
	        componentProps['id'] = uuid;
	        componentProps['role'] = 'tooltip';
	      }

	      if (type === 'popover') {
	        componentProps['aria-labelledby'] = uuid;
	      }

	      var props = (0, _specialAssign2['default'])(componentProps, this.props, checkedProps);

	      if (typeof children === 'function') {
	        return children(props);
	      }

	      return (0, _react.createElement)(tag, props, children);
	    }
	  }], [{
	    key: 'contextTypes',
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
	      tag: 'div'
	    },
	    enumerable: true
	  }]);

	  return AriaPopover;
	})(_react.Component);

	exports['default'] = AriaPopover;
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_11__;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(9);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _specialAssign = __webpack_require__(7);

	var _specialAssign2 = _interopRequireDefault(_specialAssign);

	var checkedProps = {
	  tag: _react.PropTypes.string,
	  children: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.node]).isRequired
	};

	var AriaItem = (function (_Component) {
	  _inherits(AriaItem, _Component);

	  function AriaItem() {
	    var _this = this;

	    _classCallCheck(this, AriaItem);

	    _get(Object.getPrototypeOf(AriaItem.prototype), 'constructor', this).apply(this, arguments);

	    this._handleKeyDown = function (e) {
	      var onKeyDown = _this.props.onKeyDown;

	      if ([' ', 'Enter'].indexOf(e.key) > -1) {
	        _this.context.ariaManager.onItemSelection(_this._member, e);
	      }
	      if (onKeyDown) {
	        onKeyDown(e);
	      }
	    };
	  }

	  _createClass(AriaItem, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this._member = {
	        type: 'item',
	        node: (0, _reactDom.findDOMNode)(this),
	        text: this.props.text
	      };
	      this.context.ariaManager.addMember(this._member);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.context.ariaManager.removeMember(this._member);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var tag = _props.tag;
	      var children = _props.children;

	      var props = (0, _specialAssign2['default'])({
	        role: 'menuitem',
	        tabIndex: -1,
	        onKeyDown: this._handleKeyDown
	      }, this.props, checkedProps);

	      if (typeof children === 'function') {
	        return children(props);
	      }

	      return (0, _react.createElement)(tag, props, children);
	    }
	  }], [{
	    key: 'contextTypes',
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
	      tag: 'div'
	    },
	    enumerable: true
	  }]);

	  return AriaItem;
	})(_react.Component);

	exports['default'] = AriaItem;
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _specialAssign = __webpack_require__(7);

	var _specialAssign2 = _interopRequireDefault(_specialAssign);

	var checkedProps = {
	  tag: _react.PropTypes.string,
	  children: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.node]).isRequired
	};

	var AriaTabList = (function (_Component) {
	  _inherits(AriaTabList, _Component);

	  function AriaTabList() {
	    _classCallCheck(this, AriaTabList);

	    _get(Object.getPrototypeOf(AriaTabList.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(AriaTabList, [{
	    key: 'render',
	    value: function render() {
	      var type = this.context.ariaManager.type;
	      var _props = this.props;
	      var tag = _props.tag;
	      var children = _props.children;

	      var componentProps = {
	        role: 'tablist'
	      };

	      if (type === 'accordion') {
	        componentProps['aria-multiselectable'] = true;
	      }

	      var props = (0, _specialAssign2['default'])(componentProps, this.props, checkedProps);

	      if (typeof children === 'function') {
	        return children(props);
	      }

	      return (0, _react.createElement)(tag, props, children);
	    }
	  }], [{
	    key: 'contextTypes',
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
	      tag: 'div'
	    },
	    enumerable: true
	  }]);

	  return AriaTabList;
	})(_react.Component);

	exports['default'] = AriaTabList;
	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(9);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _specialAssign = __webpack_require__(7);

	var _specialAssign2 = _interopRequireDefault(_specialAssign);

	var checkedProps = {
	  tag: _react.PropTypes.string,
	  id: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]).isRequired,
	  isActive: _react.PropTypes.bool,
	  children: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.node]).isRequired
	};

	var AriaTab = (function (_Component) {
	  _inherits(AriaTab, _Component);

	  function AriaTab() {
	    var _this = this;

	    _classCallCheck(this, AriaTab);

	    _get(Object.getPrototypeOf(AriaTab.prototype), 'constructor', this).apply(this, arguments);

	    this.state = {
	      isActive: false
	    };

	    this._setActiveState = function (isActive) {
	      _this.setState({ isActive: isActive });
	    };

	    this._toggleActiveState = function () {
	      _this.setState({ isActive: !_this.state.isActive });
	    };

	    this._handleKeyDown = function (e) {
	      var _context$ariaManager = _this.context.ariaManager;
	      var type = _context$ariaManager.type;
	      var activateTab = _context$ariaManager.activateTab;
	      var _props = _this.props;
	      var id = _props.id;
	      var onKeyDown = _props.onKeyDown;

	      if (type === 'accordion' && [' ', 'Enter'].indexOf(e.key) > -1) {
	        activateTab(id);
	      }
	      if (onKeyDown) {
	        onKeyDown(e);
	      }
	    };

	    this._handleFocus = function (e) {
	      var _context$ariaManager2 = _this.context.ariaManager;
	      var type = _context$ariaManager2.type;
	      var activateTab = _context$ariaManager2.activateTab;
	      var _props2 = _this.props;
	      var id = _props2.id;
	      var onFocus = _props2.onFocus;

	      if (type === 'tabs') {
	        activateTab(id);
	      }
	      if (onFocus) {
	        onFocus(e);
	      }
	    };
	  }

	  _createClass(AriaTab, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this._member = {
	        type: 'tab',
	        id: this.props.id,
	        node: (0, _reactDom.findDOMNode)(this),
	        text: this.props.text,
	        setActiveState: this._setActiveState,
	        toggleActiveState: this._toggleActiveState
	      };
	      this.context.ariaManager.addMember(this._member);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.context.ariaManager.removeMember(this._member);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var type = this.context.ariaManager.type;
	      var _props3 = this.props;
	      var tag = _props3.tag;
	      var id = _props3.id;
	      var disabled = _props3.disabled;
	      var children = _props3.children;

	      var isActive = this.props.isActive !== undefined ? this.props.isActive : this.state.isActive;
	      var componentProps = {
	        id: id,
	        role: 'tab',
	        tabIndex: type === 'accordion' ? 0 : isActive ? 0 : -1,
	        'aria-selected': isActive,
	        'aria-controls': id + '-panel',
	        'aria-disabled': disabled,
	        onKeyDown: this._handleKeyDown,
	        onFocus: this._handleFocus
	      };

	      if (type === 'accordion') {
	        componentProps['aria-expanded'] = isActive;
	      }

	      var props = (0, _specialAssign2['default'])(componentProps, this.props, checkedProps);

	      if (typeof children === 'function') {
	        return children(props, isActive);
	      }

	      return (0, _react.createElement)(tag, props, children);
	    }
	  }], [{
	    key: 'contextTypes',
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
	      tag: 'div'
	    },
	    enumerable: true
	  }]);

	  return AriaTab;
	})(_react.Component);

	exports['default'] = AriaTab;
	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(9);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _specialAssign = __webpack_require__(7);

	var _specialAssign2 = _interopRequireDefault(_specialAssign);

	var checkedProps = {
	  tag: _react.PropTypes.string,
	  controlledBy: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]).isRequired,
	  isActive: _react.PropTypes.bool,
	  children: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.node]).isRequired
	};

	var AriaPanel = (function (_Component) {
	  _inherits(AriaPanel, _Component);

	  function AriaPanel() {
	    var _this = this;

	    _classCallCheck(this, AriaPanel);

	    _get(Object.getPrototypeOf(AriaPanel.prototype), 'constructor', this).apply(this, arguments);

	    this.state = {
	      isActive: false
	    };

	    this._setActiveState = function (isActive) {
	      _this.setState({ isActive: isActive });
	    };

	    this._toggleActiveState = function () {
	      _this.setState({ isActive: !_this.state.isActive });
	    };

	    this._handleKeyDown = function (e) {
	      if (e.ctrlKey && e.key === 'ArrowUp') {
	        _this.context.ariaManager.focusTab(_this.props.controlledBy);
	      }
	      if (_this.props.onKeyDown) {
	        _this.props.onKeyDown(e);
	      }
	    };
	  }

	  _createClass(AriaPanel, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.context.ariaManager.addPanel({
	        controlledBy: this.props.controlledBy,
	        node: (0, _reactDom.findDOMNode)(this),
	        setActiveState: this._setActiveState,
	        toggleActiveState: this._toggleActiveState
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var tag = _props.tag;
	      var controlledBy = _props.controlledBy;
	      var disabled = _props.disabled;
	      var children = _props.children;

	      var isActive = this.props.isActive !== undefined ? this.props.isActive : this.state.isActive;
	      var componentProps = {
	        id: controlledBy + '-panel',
	        role: 'tabpanel',
	        'aria-hidden': !isActive,
	        'aria-labelledby': controlledBy,
	        onKeyDown: this._handleKeyDown
	      };

	      if (!isActive) {
	        componentProps['style'] = _extends({
	          display: 'none'
	        }, this.props.style);
	      }

	      var props = (0, _specialAssign2['default'])(componentProps, this.props, checkedProps);

	      if (typeof children === 'function') {
	        return children(props, isActive);
	      }

	      return (0, _react.createElement)(tag, props, children);
	    }
	  }], [{
	    key: 'contextTypes',
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
	      tag: 'div'
	    },
	    enumerable: true
	  }]);

	  return AriaPanel;
	})(_react.Component);

	exports['default'] = AriaPanel;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;