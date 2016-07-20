(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("createFocusGroup"), require("createTapListener"), require("ReactDOM"), require("focusTrap"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "createFocusGroup", "createTapListener", "ReactDOM", "focusTrap"], factory);
	else if(typeof exports === 'object')
		exports["ReactARIA"] = factory(require("React"), require("createFocusGroup"), require("createTapListener"), require("ReactDOM"), require("focusTrap"));
	else
		root["ReactARIA"] = factory(root["React"], root["createFocusGroup"], root["createTapListener"], root["ReactDOM"], root["focusTrap"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_10__) {
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

	var _AriaToggle2 = __webpack_require__(7);

	var _AriaToggle3 = _interopRequireDefault(_AriaToggle2);

	exports.AriaToggle = _AriaToggle3['default'];

	var _AriaPopover2 = __webpack_require__(9);

	var _AriaPopover3 = _interopRequireDefault(_AriaPopover2);

	exports.AriaPopover = _AriaPopover3['default'];

	var _AriaItem2 = __webpack_require__(11);

	var _AriaItem3 = _interopRequireDefault(_AriaItem2);

	exports.AriaItem = _AriaItem3['default'];

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

	var _eventsHandler = __webpack_require__(4);

	var _eventsHandler2 = _interopRequireDefault(_eventsHandler);

	var _specialAssign = __webpack_require__(6);

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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _teenyTap = __webpack_require__(5);

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
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
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
/* 7 */
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

	var _reactDom = __webpack_require__(8);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _specialAssign = __webpack_require__(6);

	var _specialAssign2 = _interopRequireDefault(_specialAssign);

	var checkedProps = {
	  tag: _react.PropTypes.string,
	  children: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.node]).isRequired
	};

	var AriaToggle = (function (_Component) {
	  _inherits(AriaToggle, _Component);

	  function AriaToggle() {
	    _classCallCheck(this, AriaToggle);

	    _get(Object.getPrototypeOf(AriaToggle.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(AriaToggle, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.context.ariaManager.setToggleNode((0, _reactDom.findDOMNode)(this));
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var tag = _props.tag;
	      var disabled = _props.disabled;
	      var children = _props.children;

	      var props = (0, _specialAssign2['default'])({
	        role: 'button',
	        tabIndex: disabled ? '' : '0',
	        'aria-haspopup': true,
	        'aria-expanded': this.context.ariaManager.isOpen,
	        'aria-disabled': disabled
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
	      tag: 'button'
	    },
	    enumerable: true
	  }]);

	  return AriaToggle;
	})(_react.Component);

	exports['default'] = AriaToggle;
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },
/* 9 */
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

	var _reactDom = __webpack_require__(8);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _focusTrap = __webpack_require__(10);

	var _focusTrap2 = _interopRequireDefault(_focusTrap);

	var _specialAssign = __webpack_require__(6);

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
	      if (this.context.ariaManager.isOpen !== lastContext.ariaManager.isOpen) {
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
	      var _props = this.props;
	      var tag = _props.tag;
	      var children = _props.children;

	      var props = (0, _specialAssign2['default'])({}, this.props, checkedProps);

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
/* 10 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ },
/* 11 */
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

	var _reactDom = __webpack_require__(8);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _specialAssign = __webpack_require__(6);

	var _specialAssign2 = _interopRequireDefault(_specialAssign);

	var checkedProps = {
	  tag: _react.PropTypes.string,
	  children: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.node]).isRequired
	};

	var AriaItem = (function (_Component) {
	  _inherits(AriaItem, _Component);

	  function AriaItem() {
	    _classCallCheck(this, AriaItem);

	    _get(Object.getPrototypeOf(AriaItem.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(AriaItem, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this._node = (0, _reactDom.findDOMNode)(this);

	      this.context.ariaManager.addItem({
	        node: this._node,
	        text: this.props.text
	      });
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.context.ariaManager.removeItem(this._node);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var tag = _props.tag;
	      var children = _props.children;

	      var props = (0, _specialAssign2['default'])({
	        role: 'menuitem',
	        tabIndex: -1
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

/***/ }
/******/ ])
});
;