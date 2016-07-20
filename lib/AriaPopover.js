'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _focusTrap = require('focus-trap');

var _focusTrap2 = _interopRequireDefault(_focusTrap);

var _specialAssign = require('./special-assign');

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