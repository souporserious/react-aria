(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("ReactDOM"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "ReactDOM"], factory);
	else if(typeof exports === 'object')
		exports["ReactARIA"] = factory(require("React"), require("ReactDOM"));
	else
		root["ReactARIA"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_8__) {
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

	var _ariaManager = __webpack_require__(1);

	var _ariaManager2 = _interopRequireDefault(_ariaManager);

	exports.AriaManager = _ariaManager2['default'];

	var _toggle = __webpack_require__(7);

	var _toggle2 = _interopRequireDefault(_toggle);

	exports.Toggle = _toggle2['default'];

	var _menu = __webpack_require__(9);

	var _menu2 = _interopRequireDefault(_menu);

	exports.Menu = _menu2['default'];

	var _menuItem = __webpack_require__(10);

	var _menuItem2 = _interopRequireDefault(_menuItem);

	exports.MenuItem = _menuItem2['default'];

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

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	function FocusGroup(options) {
	  options = options || {};
	  this._settings = {
	    forwardArrows: options.forwardArrows || ['down'],
	    backArrows: options.backArrows || ['up'],
	    wrap: options.wrap,
	    stringSearch: options.stringSearch,
	    stringSearchDelay: 800
	  };
	  this._searchString = '';
	  this._members = [];
	  if (options.members) this.setMembers(options.members);
	  this._boundHandleKeydownEvent = this._handleKeydownEvent.bind(this);
	}

	FocusGroup.prototype.activate = function () {
	  // Use capture in case other libraries might grab it first -- i.e. React
	  document.addEventListener('keydown', this._boundHandleKeydownEvent, true);
	  return this;
	};

	FocusGroup.prototype.deactivate = function () {
	  document.removeEventListener('keydown', this._boundHandleKeydownEvent, true);
	  this._clearSearchStringRefreshTimer();
	  return this;
	};

	FocusGroup.prototype._handleKeydownEvent = function (event) {
	  // Only respond to keyboard events when
	  // focus is already within the focus-group
	  var activeElementIndex = this._getActiveElementIndex();
	  if (activeElementIndex === -1) return;

	  var arrow = getEventArrowKey(event);

	  if (!arrow) {
	    this._handleNonArrowKey(event);
	    return;
	  }

	  if (this._settings.forwardArrows.indexOf(arrow) !== -1) {
	    event.preventDefault();
	    this.moveFocusForward();
	    return;
	  }

	  if (this._settings.backArrows.indexOf(arrow) !== -1) {
	    event.preventDefault();
	    this.moveFocusBack();
	    return;
	  }
	};

	FocusGroup.prototype.moveFocusForward = function () {
	  var activeElementIndex = this._getActiveElementIndex();
	  var targetIndex;
	  if (activeElementIndex < this._members.length - 1) {
	    targetIndex = activeElementIndex + 1;
	  } else if (this._settings.wrap) {
	    targetIndex = 0;
	  } else {
	    targetIndex = activeElementIndex;
	  }
	  this.focusNodeAtIndex(targetIndex);
	  return targetIndex;
	};

	FocusGroup.prototype.moveFocusBack = function () {
	  var activeElementIndex = this._getActiveElementIndex();
	  var targetIndex;
	  if (activeElementIndex > 0) {
	    targetIndex = activeElementIndex - 1;
	  } else if (this._settings.wrap) {
	    targetIndex = this._members.length - 1;
	  } else {
	    targetIndex = activeElementIndex;
	  }
	  this.focusNodeAtIndex(targetIndex);
	  return targetIndex;
	};

	FocusGroup.prototype._handleNonArrowKey = function (event) {
	  if (!this._settings.stringSearch) return;

	  // While a string search is underway, ignore spaces
	  // and prevent the default space-key behavior
	  if (this._searchString !== '' && (event.key === ' ' || event.keyCode === 32)) {
	    event.preventDefault();
	    return -1;
	  }

	  // Only respond to letter keys
	  if (!isLetterKeyCode(event.keyCode)) return -1;

	  // If the letter key is part of a key combo,
	  // let it do whatever it was going to do
	  if (event.ctrlKey || event.metaKey || event.altKey) return -1;

	  event.preventDefault();

	  this._addToSearchString(String.fromCharCode(event.keyCode));
	  this._runStringSearch();
	};

	FocusGroup.prototype._clearSearchString = function () {
	  this._searchString = '';
	};

	FocusGroup.prototype._addToSearchString = function (letter) {
	  // Always store the lowercase version of the letter
	  this._searchString += letter.toLowerCase();
	};

	FocusGroup.prototype._startSearchStringRefreshTimer = function () {
	  var self = this;
	  this._clearSearchStringRefreshTimer();
	  this._stringSearchTimer = setTimeout(function () {
	    self._clearSearchString();
	  }, this._settings.stringSearchDelay);
	};

	FocusGroup.prototype._clearSearchStringRefreshTimer = function () {
	  clearTimeout(this._stringSearchTimer);
	};

	FocusGroup.prototype._runStringSearch = function () {
	  this._startSearchStringRefreshTimer();
	  this.moveFocusByString(this._searchString);
	};

	FocusGroup.prototype.moveFocusByString = function (str) {
	  var member;
	  for (var i = 0, l = this._members.length; i < l; i++) {
	    member = this._members[i];
	    if (!member.text) continue;

	    if (member.text.indexOf(str) === 0) {
	      return focusNode(member.node);
	    }
	  }
	};

	FocusGroup.prototype._findIndexOfNode = function (searchNode) {
	  for (var i = 0, l = this._members.length; i < l; i++) {
	    if (this._members[i].node === searchNode) {
	      return i;
	    }
	  }
	  return -1;
	};

	FocusGroup.prototype._getActiveElementIndex = function () {
	  return this._findIndexOfNode(document.activeElement);
	};

	FocusGroup.prototype.focusNodeAtIndex = function (index) {
	  var member = this._members[index];
	  if (member) focusNode(member.node);
	  return this;
	};

	FocusGroup.prototype.addMember = function (member, index) {
	  var node = member.node || member;
	  var nodeText = member.text || node.getAttribute('data-focus-group-text') || node.textContent || '';

	  this._checkNode(node);

	  var cleanedNodeText = nodeText.replace(/[\W_]/g, '').toLowerCase();
	  var member = {
	    node: node,
	    text: cleanedNodeText
	  };

	  if (index !== null && index !== undefined) {
	    this._members.splice(index, 0, member);
	  } else {
	    this._members.push(member);
	  }
	  return this;
	};

	FocusGroup.prototype.removeMember = function (member) {
	  var removalIndex = typeof member === 'number' ? member : this._findIndexOfNode(member);
	  if (removalIndex === -1) return;
	  this._members.splice(removalIndex, 1);
	  return this;
	};

	FocusGroup.prototype.clearMembers = function () {
	  this._members = [];
	  return this;
	};

	FocusGroup.prototype.setMembers = function (nextMembers) {
	  this.clearMembers();
	  for (var i = 0, l = nextMembers.length; i < l; i++) {
	    this.addMember(nextMembers[i]);
	  }
	  return this;
	};

	FocusGroup.prototype.getMembers = function () {
	  return this._members;
	};

	FocusGroup.prototype._checkNode = function (node) {
	  if (!node.nodeType || node.nodeType !== window.Node.ELEMENT_NODE) {
	    throw new Error('focus-group: only DOM nodes allowed');
	  }
	  return node;
	};

	function getEventArrowKey(event) {
	  if (event.key === 'ArrowUp' || event.keyCode === 38) return 'up';
	  if (event.key === 'ArrowDown' || event.keyCode === 40) return 'down';
	  if (event.key === 'ArrowLeft' || event.keyCode === 37) return 'left';
	  if (event.key === 'ArrowRight' || event.keyCode === 39) return 'right';
	  return null;
	}

	function isLetterKeyCode(keyCode) {
	  return keyCode >= 65 && keyCode <= 90;
	}

	function focusNode(node) {
	  if (!node || !node.focus) return;
	  node.focus();
	  if (node.tagName.toLowerCase() === 'input') node.select();
	}

	module.exports = function createFocusGroup(options) {
	  return new FocusGroup(options);
	};

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

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function createTapListener(el, callback, useCapture) {
	  var startX = 0;
	  var startY = 0;
	  var touchStarted = false;
	  var touchMoved = false;
	  // Assume that if a touchstart event initiates, the user is
	  // using touch and click events should be ignored.
	  // If this isn't done, touch-clicks will fire the callback
	  // twice: once on touchend, once on the subsequent "click".
	  var usingTouch = false;

	  el.addEventListener('click', handleClick, useCapture);
	  el.addEventListener('touchstart', handleTouchstart, useCapture);

	  function handleClick(e) {
	    if (usingTouch) return;
	    callback(e);
	  }

	  function handleTouchstart(e) {
	    usingTouch = true;

	    if (touchStarted) return;
	    touchStarted = true;

	    el.addEventListener('touchmove', handleTouchmove, useCapture);
	    el.addEventListener('touchend', handleTouchend, useCapture);
	    el.addEventListener('touchcancel', handleTouchcancel, useCapture);

	    touchMoved = false;
	    startX = e.touches[0].clientX;
	    startY = e.touches[0].clientY;
	  }

	  function handleTouchmove(e) {
	    if (touchMoved) return;

	    if (Math.abs(e.touches[0].clientX - startX) <= 10 && Math.abs(e.touches[0].clientY - startY) <= 10) return;

	    touchMoved = true;
	  }

	  function handleTouchend(e) {
	    touchStarted = false;
	    removeSecondaryTouchListeners();
	    if (!touchMoved) {
	      callback(e);
	    }
	  }

	  function handleTouchcancel() {
	    touchStarted = false;
	    touchMoved = false;
	    startX = 0;
	    startY = 0;
	  }

	  function removeSecondaryTouchListeners() {
	    el.removeEventListener('touchmove', handleTouchmove, useCapture);
	    el.removeEventListener('touchend', handleTouchend, useCapture);
	    el.removeEventListener('touchcancel', handleTouchcancel, useCapture);
	  }

	  function removeTapListener() {
	    el.removeEventListener('click', handleClick, useCapture);
	    el.removeEventListener('touchstart', handleTouchstart, useCapture);
	    removeSecondaryTouchListeners();
	  }

	  return {
	    remove: removeTapListener
	  };
	};

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
	  children: _react.PropTypes.node.isRequired
	};

	var Toggle = (function (_Component) {
	  _inherits(Toggle, _Component);

	  function Toggle() {
	    _classCallCheck(this, Toggle);

	    _get(Object.getPrototypeOf(Toggle.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(Toggle, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.context.ariaManager.setToggle((0, _reactDom.findDOMNode)(this));
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

	      return (0, _react.createElement)(tag, props, children);
	    }
	  }], [{
	    key: 'contextTypes',
	    value: {
	      ariaManager: _react.PropTypes.object.isRequired
	    },
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: {
	      tag: 'button'
	    },
	    enumerable: true
	  }]);

	  return Toggle;
	})(_react.Component);

	exports['default'] = Toggle;
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

	var _specialAssign = __webpack_require__(6);

	var _specialAssign2 = _interopRequireDefault(_specialAssign);

	var checkedProps = {
	  tag: _react.PropTypes.string,
	  children: _react.PropTypes.node.isRequired
	};

	var Menu = (function (_Component) {
	  _inherits(Menu, _Component);

	  function Menu() {
	    _classCallCheck(this, Menu);

	    _get(Object.getPrototypeOf(Menu.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(Menu, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this._setMenuNode();
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(lastProps, lastState, lastContext) {
	      if (this.context.ariaManager.isOpen !== lastContext.ariaManager.isOpen) {
	        this._setMenuNode();
	      }
	    }
	  }, {
	    key: '_setMenuNode',
	    value: function _setMenuNode() {
	      this.context.ariaManager.setMenu((0, _reactDom.findDOMNode)(this));
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var tag = _props.tag;
	      var children = _props.children;

	      var props = (0, _specialAssign2['default'])({
	        role: 'menu'
	      }, this.props, checkedProps);

	      return (0, _react.createElement)(tag, props, children);
	    }
	  }], [{
	    key: 'contextTypes',
	    value: {
	      ariaManager: _react.PropTypes.object.isRequired
	    },
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: {
	      tag: 'div'
	    },
	    enumerable: true
	  }]);

	  return Menu;
	})(_react.Component);

	exports['default'] = Menu;
	module.exports = exports['default'];

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

	var _reactDom = __webpack_require__(8);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _specialAssign = __webpack_require__(6);

	var _specialAssign2 = _interopRequireDefault(_specialAssign);

	var checkedProps = {
	  tag: _react.PropTypes.string,
	  children: _react.PropTypes.node.isRequired
	};

	var MenuItem = (function (_Component) {
	  _inherits(MenuItem, _Component);

	  function MenuItem() {
	    _classCallCheck(this, MenuItem);

	    _get(Object.getPrototypeOf(MenuItem.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(MenuItem, [{
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

	      return (0, _react.createElement)(tag, props, children);
	    }
	  }], [{
	    key: 'contextTypes',
	    value: {
	      ariaManager: _react.PropTypes.object.isRequired
	    },
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: {
	      tag: 'div'
	    },
	    enumerable: true
	  }]);

	  return MenuItem;
	})(_react.Component);

	exports['default'] = MenuItem;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;