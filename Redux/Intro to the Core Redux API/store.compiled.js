(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
    "use strict";
    
    var _react = _interopRequireDefault(require("react"));
    
    var _reactDom = _interopRequireDefault(require("react-dom"));
    
    var _redux = require("redux");
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
    
    // REDUX CODE
    ///////////////////////////////////
    var increment = function increment() {
      return {
        type: 'increment'
      };
    };
    
    var decrement = function decrement() {
      return {
        type: 'decrement'
      };
    };
    
    var initialState = 0;
    
    var counterReducer = function counterReducer() {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
      var action = arguments.length > 1 ? arguments[1] : undefined;
    
      switch (action.type) {
        case 'increment':
          return state + 1;
    
        case 'decrement':
          return state - 1;
    
        default:
          return state;
      }
    };
    
    var store = (0, _redux.createStore)(counterReducer); // REACT CODE
    ///////////////////////////////////
    
    var render = function render() {
      _reactDom["default"].render( /*#__PURE__*/_react["default"].createElement(CounterApp, {
        state: store.getState()
      }), document.getElementById('root'));
    };
    
    render();
    store.subscribe(render);
    
    function CounterApp(props) {
      var state = props.state;
    
      var onIncrementButtonClicked = function onIncrementButtonClicked() {
        store.dispatch(increment());
      };
    
      var onDecrementButtonClicked = function onDecrementButtonClicked() {
        store.dispatch(decrement());
      };
    
      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h1", null, " ", state, " "), /*#__PURE__*/_react["default"].createElement("button", {
        onClick: onIncrementButtonClicked
      }, "+"), /*#__PURE__*/_react["default"].createElement("button", {
        onClick: onDecrementButtonClicked
      }, "-"));
    }
    
    },{"react":undefined,"react-dom":undefined,"redux":undefined}]},{},[1]);
    