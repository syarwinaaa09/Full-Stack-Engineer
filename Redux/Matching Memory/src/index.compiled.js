(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("./App.css");

var _react = _interopRequireDefault(require("react"));

var _Score = require("./features/score/Score.js");

var _Board = require("./features/board/Board.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Add import statements below
var App = function App() {
  // Add dispatch variable below
  var startGameHandler = function startGameHandler() {// Add action dispatch below
  };

  var tryAgainHandler = function tryAgainHandler() {// Add action dispatch below
  };

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "App"
  }, /*#__PURE__*/_react["default"].createElement(_Score.Score, null), /*#__PURE__*/_react["default"].createElement(_Board.Board, null), /*#__PURE__*/_react["default"].createElement("footer", {
    className: "footer"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: startGameHandler,
    className: "start-button"
  }, "Start Game"), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: tryAgainHandler,
    className: "try-new-pair-button"
  }, "Try New Pair")));
};

var _default = App;
exports["default"] = _default;

},{"./App.css":1,"./features/board/Board.js":4,"./features/score/Score.js":8,"react":undefined}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = void 0;

var _redux = require("redux");

var _boardSlice = require("../features/board/boardSlice.js");

var rootReducer = (0, _redux.combineReducers)({
  board: _boardSlice.boardReducer
});
var store = (0, _redux.createStore)(rootReducer);
exports.store = store;

},{"../features/board/boardSlice.js":5,"redux":undefined}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Board = void 0;

var _react = _interopRequireDefault(require("react"));

var _CardRow = require("./cardRow/CardRow.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Add import statements below
var Board = function Board() {
  // Add selected data variable and implement below
  var numberOfCards = 0;
  var columns = 3;
  var rows = Math.floor(numberOfCards / columns);

  var getRowCards = function getRowCards(row) {
    var rowCards = [];

    for (var j = 0; j < columns; j++) {
      var cardIndex = row * columns + j; // Implement selected data below

      rowCards.push({});
    }

    return rowCards;
  };

  var content = [];

  for (var row = 0; row < rows; row++) {
    var rowCards = getRowCards(row);
    content.push( /*#__PURE__*/_react["default"].createElement(_CardRow.CardRow, {
      key: row,
      cards: rowCards
    }));
  }

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "cards-container"
  }, content);
};

exports.Board = Board;

},{"./cardRow/CardRow.js":6,"react":undefined}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetCards = exports.flipCard = exports.setBoard = exports.boardReducer = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var initialState = [{
  id: 0,
  contents: 'Provider',
  visible: true,
  matched: true
}, {
  id: 1,
  contents: 'Provider',
  visible: true,
  matched: true
}, {
  id: 2,
  contents: 'selector',
  visible: true,
  matched: true
}, {
  id: 3,
  contents: 'selector',
  visible: true,
  matched: true
}, {
  id: 4,
  contents: 'useSelector()',
  visible: true,
  matched: true
}, {
  id: 5,
  contents: 'useSelector()',
  visible: true,
  matched: true
}, {
  id: 6,
  contents: 'useDispatch()',
  visible: true,
  matched: true
}, {
  id: 7,
  contents: 'useDispatch()',
  visible: true,
  matched: true
}, {
  id: 8,
  contents: 'Pure Function',
  visible: true,
  matched: true
}, {
  id: 9,
  contents: 'Pure Function',
  visible: true,
  matched: true
}, {
  id: 10,
  contents: 'react-redux',
  visible: true,
  matched: true
}, {
  id: 11,
  contents: 'react-redux',
  visible: true,
  matched: true
}];

var boardReducer = function boardReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'board/setBoard':
      var setState = [];
      action.payload.forEach(function (element, index) {
        return setState.push({
          id: index,
          contents: element,
          visible: false,
          matched: false
        });
      });
      return setState;

    case 'board/flipCard':
      var flipState = _toConsumableArray(state);

      var cardID = action.payload;
      flipState[cardID] = _objectSpread(_objectSpread({}, state[cardID]), {}, {
        visible: true
      });

      var _flipState$filter$map = flipState.filter(function (card) {
        return card.visible;
      }).map(function (card) {
        return card.id;
      }),
          _flipState$filter$map2 = _slicedToArray(_flipState$filter$map, 2),
          index1 = _flipState$filter$map2[0],
          index2 = _flipState$filter$map2[1];

      if (index2 !== undefined) {
        var card1 = flipState[index1];
        var card2 = flipState[index2];

        if (card1.contents === card2.contents) {
          flipState[index1] = _objectSpread(_objectSpread({}, card1), {}, {
            visible: false,
            matched: true
          });
          flipState[index2] = _objectSpread(_objectSpread({}, card2), {}, {
            visible: false,
            matched: true
          });
        }
      }

      return flipState;

    case 'board/resetCards':
      return state.map(function (card) {
        return _objectSpread(_objectSpread({}, card), {}, {
          visible: false
        });
      });

    default:
      return state;
  }
};

exports.boardReducer = boardReducer;
var wordPairs = ['Provider', 'Provider', 'selector', 'selector', 'useSelector()', 'useSelector()', 'useDispatch()', 'useDispatch()', 'Pure Function', 'Pure Function', 'react-redux', 'react-redux'];

var randomWords = function randomWords() {
  var words = [];
  var newWordPairs = [].concat(wordPairs);
  var reps = newWordPairs.length;

  for (var i = 0; i < reps; i++) {
    var wordIndex = Math.floor(Math.random() * newWordPairs.length);
    words.push(newWordPairs[wordIndex]);
    newWordPairs.splice(wordIndex, 1);
  }

  return words;
}; // action creators


var setBoard = function setBoard() {
  var words = randomWords();
  return {
    type: 'board/setBoard',
    payload: words
  };
};

exports.setBoard = setBoard;

var flipCard = function flipCard(id) {
  return {
    type: 'board/flipCard',
    payload: id
  };
};

exports.flipCard = flipCard;

var resetCards = function resetCards(indices) {
  return {
    type: 'board/resetCards'
  };
}; // Add selector export statments below


exports.resetCards = resetCards;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardRow = void 0;

var _react = _interopRequireDefault(require("react"));

var _Card = require("./card/Card.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CardRow = function CardRow(_ref) {
  var cards = _ref.cards;
  var content = cards.map(function (card) {
    return /*#__PURE__*/_react["default"].createElement(_Card.Card, {
      key: card.id,
      id: card.id,
      contents: card.contents
    });
  });
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, content);
};

exports.CardRow = CardRow;

},{"./card/Card.js":7,"react":undefined}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Card = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Add import statements below
var cardLogo = "https://static-assets.codecademy.com/Courses/Learn-Redux/matching-game/codecademy_logo.png";

var Card = function Card(_ref) {
  var id = _ref.id,
      contents = _ref.contents;

  // Add selected data and dispatch variables below
  // flip card action
  var flipHandler = function flipHandler(id) {// Add action dispatch below
  };

  var cardStyle = 'resting';

  var click = function click() {
    return flipHandler(id);
  };

  var cardText = /*#__PURE__*/_react["default"].createElement("img", {
    src: cardLogo,
    className: "logo-placeholder",
    alt: "Card option"
  }); // 1st if statement
  // implement card id array membership check


  if (false) {
    cardText = contents;

    click = function click() {};
  } // 2nd if statement
  // implement card id array membership check


  if (false) {
    cardStyle = 'matched';
  } // 3rd if statement
  // implement number of flipped cards check


  if (false) {
    click = function click() {};
  }

  return /*#__PURE__*/_react["default"].createElement("button", {
    onClick: click,
    className: "card ".concat(cardStyle)
  }, cardText);
};

exports.Card = Card;

},{"react":undefined}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Score = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Add import statement below
var Score = function Score() {
  // Add selected data variable below
  return (
    /*#__PURE__*/
    // implement selected data inside <div>
    _react["default"].createElement("div", {
      className: "score-container"
    }, "Matched: 0")
  );
};

exports.Score = Score;

},{"react":undefined}],9:[function(require,module,exports){
"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _App = _interopRequireDefault(require("./App"));

var _store = require("./app/store.js");

var _reactRedux = require("react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Add import statement below
_reactDom["default"].render(
/*#__PURE__*/
// Implement Provider component with store below
_react["default"].createElement(_App["default"], null), document.getElementById('root'));

},{"./App":2,"./app/store.js":3,"react":undefined,"react-dom":undefined,"react-redux":undefined}]},{},[9]);
