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

var _specialAssign = require('./special-assign');

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