(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
    "use strict";
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    var allRecipesData = [{
      id: 0,
      name: 'Biscuits',
      img: 'img/biscuits.jpg'
    }, {
      id: 1,
      name: 'Bulgogi',
      img: 'img/bulgogi.jpg'
    }, {
      id: 2,
      name: 'Calamari',
      img: 'img/calamari.jpg'
    }, {
      id: 3,
      name: 'Ceviche',
      img: 'img/ceviche.jpg'
    }, {
      id: 4,
      name: 'Cheeseburger',
      img: 'img/cheeseburger.jpg'
    }, {
      id: 5,
      name: 'Churrasco',
      img: 'img/churrasco.jpg'
    }, {
      id: 6,
      name: 'Dumplings',
      img: 'img/dumplings.jpg'
    }, {
      id: 7,
      name: 'Fish & Chips',
      img: 'img/fishnchips.jpg'
    }, {
      id: 8,
      name: 'Hummus',
      img: 'img/hummus.jpg'
    }, {
      id: 9,
      name: 'Masala Dosa',
      img: 'img/masaladosa.jpg'
    }, {
      id: 10,
      name: 'Pad Thai',
      img: 'img/padthai.jpg'
    }];
    var _default = allRecipesData;
    exports["default"] = _default;
    
    },{}],2:[function(require,module,exports){
    "use strict";
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.App = App;
    
    var _react = _interopRequireDefault(require("react"));
    
    var _AllRecipes = require("../features/allRecipes/AllRecipes.js");
    
    var _SearchTerm = require("../features/searchTerm/SearchTerm.js");
    
    var _FavoriteRecipes = require("../features/favoriteRecipes/FavoriteRecipes.js");
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
    
    // Import the FavoriteRecipes component here.
    function App(props) {
      var state = props.state,
          dispatch = props.dispatch;
      var visibleAllRecipes = getFilteredRecipes(state.allRecipes, state.searchTerm);
      var visibleFavoriteRecipes = getFilteredRecipes(state.favoriteRecipes, state.searchTerm); // Render the <FavoriteRecipes /> component.
      // Pass `dispatch` and `favoriteRecipes` props.
    
      return /*#__PURE__*/_react["default"].createElement("main", null, /*#__PURE__*/_react["default"].createElement("section", null, /*#__PURE__*/_react["default"].createElement(_SearchTerm.SearchTerm, {
        searchTerm: state.searchTerm,
        dispatch: dispatch
      })), /*#__PURE__*/_react["default"].createElement("section", null, /*#__PURE__*/_react["default"].createElement("h2", null, "Favorite Recipes"), /*#__PURE__*/_react["default"].createElement(_FavoriteRecipes.FavoriteRecipes, {
        favoriteRecipes: visibleFavoriteRecipes,
        dispatch: dispatch
      })), /*#__PURE__*/_react["default"].createElement("hr", null), /*#__PURE__*/_react["default"].createElement("section", null, /*#__PURE__*/_react["default"].createElement("h2", null, "All Recipes"), /*#__PURE__*/_react["default"].createElement(_AllRecipes.AllRecipes, {
        allRecipes: visibleAllRecipes,
        dispatch: dispatch
      })));
    }
    /* Utility Helpers */
    
    
    function getFilteredRecipes(recipes, searchTerm) {
      return recipes.filter(function (recipe) {
        return recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }
    
    },{"../features/allRecipes/AllRecipes.js":6,"../features/favoriteRecipes/FavoriteRecipes.js":8,"../features/searchTerm/SearchTerm.js":10,"react":undefined}],3:[function(require,module,exports){
    "use strict";
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.store = void 0;
    
    var _redux = require("redux");
    
    var _favoriteRecipesSlice = require("../features/favoriteRecipes/favoriteRecipesSlice.js");
    
    var _searchTermSlice = require("../features/searchTerm/searchTermSlice.js");
    
    var _allRecipesSlice = require("../features/allRecipes/allRecipesSlice.js");
    
    var store = (0, _redux.createStore)((0, _redux.combineReducers)({
      favoriteRecipes: _favoriteRecipesSlice.favoriteRecipesReducer,
      searchTerm: _searchTermSlice.searchTermReducer,
      allRecipes: _allRecipesSlice.allRecipesReducer
    }));
    exports.store = store;
    
    },{"../features/allRecipes/allRecipesSlice.js":7,"../features/favoriteRecipes/favoriteRecipesSlice.js":9,"../features/searchTerm/searchTermSlice.js":11,"redux":undefined}],4:[function(require,module,exports){
    "use strict";
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = FavoriteButton;
    
    var _react = _interopRequireDefault(require("react"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
    
    function FavoriteButton(_ref) {
      var children = _ref.children,
          onClickHandler = _ref.onClickHandler,
          icon = _ref.icon;
      return /*#__PURE__*/_react["default"].createElement("button", {
        className: "favorite-button",
        onClick: onClickHandler
      }, /*#__PURE__*/_react["default"].createElement("img", {
        className: "heart-icon",
        alt: "",
        src: icon
      }), children);
    }
    
    },{"react":undefined}],5:[function(require,module,exports){
    "use strict";
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = Recipe;
    
    var _react = _interopRequireDefault(require("react"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
    
    function Recipe(_ref) {
      var recipe = _ref.recipe,
          children = _ref.children;
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: recipe.id,
        className: "recipe",
        tabIndex: 0
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "recipe-container"
      }, /*#__PURE__*/_react["default"].createElement("h3", {
        className: "recipe-name"
      }, recipe.name), /*#__PURE__*/_react["default"].createElement("div", {
        className: "image-container"
      }, /*#__PURE__*/_react["default"].createElement("img", {
        src: recipe.img,
        alt: "",
        className: "recipe-image"
      }))), children);
    }
    
    },{"react":undefined}],6:[function(require,module,exports){
    "use strict";
    
    function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.AllRecipes = void 0;
    
    var _favoriteRecipesSlice = require("../favoriteRecipes/favoriteRecipesSlice.js");
    
    var _allRecipesSlice = require("./allRecipesSlice");
    
    var _react = _interopRequireWildcard(require("react"));
    
    var _FavoriteButton = _interopRequireDefault(require("../../components/FavoriteButton"));
    
    var _Recipe = _interopRequireDefault(require("../../components/Recipe"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
    
    function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }
    
    function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
    
    var favoriteIconURL = 'https://static-assets.codecademy.com/Courses/Learn-Redux/Recipes-App/icons/favorite.svg';
    
    var AllRecipes = function AllRecipes(props) {
      var allRecipes = props.allRecipes,
          dispatch = props.dispatch;
    
      var onFirstRender = function onFirstRender() {
        dispatch((0, _allRecipesSlice.loadData)());
      };
    
      (0, _react.useEffect)(onFirstRender, []);
    
      var onAddRecipeHandler = function onAddRecipeHandler(recipe) {
        dispatch((0, _favoriteRecipesSlice.addRecipe)(recipe));
      };
    
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "recipes-container"
      }, allRecipes.map(function (recipe) {
        return /*#__PURE__*/_react["default"].createElement(_Recipe["default"], {
          recipe: recipe,
          key: recipe.id
        }, /*#__PURE__*/_react["default"].createElement(_FavoriteButton["default"], {
          onClickHandler: function onClickHandler() {
            return onAddRecipeHandler(recipe);
          },
          icon: favoriteIconURL
        }, "Add to Favorites"));
      }));
    };
    
    exports.AllRecipes = AllRecipes;
    
    },{"../../components/FavoriteButton":4,"../../components/Recipe":5,"../favoriteRecipes/favoriteRecipesSlice.js":9,"./allRecipesSlice":7,"react":undefined}],7:[function(require,module,exports){
    "use strict";
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.allRecipesReducer = exports.loadData = void 0;
    
    var _data = _interopRequireDefault(require("../../../data.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
    
    function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
    
    function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
    
    function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
    
    function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }
    
    function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
    
    function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
    
    var loadData = function loadData() {
      return {
        type: 'allRecipes/loadData',
        payload: _data["default"]
      };
    };
    
    exports.loadData = loadData;
    var initialState = [];
    
    var allRecipesReducer = function allRecipesReducer() {
      var allRecipes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
      var action = arguments.length > 1 ? arguments[1] : undefined;
    
      switch (action.type) {
        case 'allRecipes/loadData':
          return action.payload;
    
        case 'favoriteRecipes/addRecipe':
          return allRecipes.filter(function (recipe) {
            return recipe.id !== action.payload.id;
          });
    
        case 'favoriteRecipes/removeRecipe':
          return [].concat(_toConsumableArray(allRecipes), [action.payload]);
    
        default:
          return allRecipes;
      }
    };
    
    exports.allRecipesReducer = allRecipesReducer;
    
    },{"../../../data.js":1}],8:[function(require,module,exports){
    "use strict";
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.FavoriteRecipes = void 0;
    
    var _react = _interopRequireDefault(require("react"));
    
    var _FavoriteButton = _interopRequireDefault(require("../../components/FavoriteButton"));
    
    var _Recipe = _interopRequireDefault(require("../../components/Recipe"));
    
    var _favoriteRecipesSlice = require("./favoriteRecipesSlice.js");
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
    
    var unfavoriteIconUrl = 'https://static-assets.codecademy.com/Courses/Learn-Redux/Recipes-App/icons/unfavorite.svg'; // Import removeRecipe from favoriteRecipesSlice.js
    
    var FavoriteRecipes = function FavoriteRecipes(props) {
      // Extract favoriteRecipes and dispatch from props.
      var favoriteRecipes = props.favoriteRecipes,
          dispatch = props.dispatch;
    
      var onRemoveRecipeHandler = function onRemoveRecipeHandler(recipe) {
        // Dispatch a removeRecipe() action.
        dispatch((0, _favoriteRecipesSlice.removeRecipe)(recipe));
      }; // Map the recipe objects in favoriteRecipes to render <Recipe /> components.
    
    
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "recipes-container"
      }, favoriteRecipes.map(createRecipeComponent)); // Helper Function
    
      function createRecipeComponent(recipe) {
        return /*#__PURE__*/_react["default"].createElement(_Recipe["default"], {
          recipe: recipe,
          key: recipe.id
        }, /*#__PURE__*/_react["default"].createElement(_FavoriteButton["default"], {
          onClickHandler: function onClickHandler() {
            return onRemoveRecipeHandler(recipe);
          },
          icon: unfavoriteIconUrl
        }, "Remove Favorite"));
      }
    };
    
    exports.FavoriteRecipes = FavoriteRecipes;
    
    },{"../../components/FavoriteButton":4,"../../components/Recipe":5,"./favoriteRecipesSlice.js":9,"react":undefined}],9:[function(require,module,exports){
    "use strict";
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.addRecipe = addRecipe;
    exports.removeRecipe = removeRecipe;
    exports.favoriteRecipesReducer = void 0;
    
    function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
    
    function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
    
    function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
    
    function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }
    
    function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
    
    function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
    
    var initialState = [];
    
    var favoriteRecipesReducer = function favoriteRecipesReducer() {
      var favoriteRecipes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
      var action = arguments.length > 1 ? arguments[1] : undefined;
    
      switch (action.type) {
        case 'favoriteRecipes/addRecipe':
          return [].concat(_toConsumableArray(favoriteRecipes), [action.payload]);
    
        case 'favoriteRecipes/removeRecipe':
          return favoriteRecipes.filter(function (recipe) {
            return recipe.id !== action.payload.id;
          });
    
        default:
          return favoriteRecipes;
      }
    };
    
    exports.favoriteRecipesReducer = favoriteRecipesReducer;
    
    function addRecipe(recipe) {
      return {
        type: 'favoriteRecipes/addRecipe',
        payload: recipe
      };
    }
    
    function removeRecipe(recipe) {
      return {
        type: 'favoriteRecipes/removeRecipe',
        payload: recipe
      };
    }
    
    },{}],10:[function(require,module,exports){
    "use strict";
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SearchTerm = void 0;
    
    var _react = _interopRequireDefault(require("react"));
    
    var _searchTermSlice = require("./searchTermSlice.js");
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
    
    var searchIconUrl = 'https://static-assets.codecademy.com/Courses/Learn-Redux/Recipes-App/icons/search.svg';
    var clearIconUrl = 'https://static-assets.codecademy.com/Courses/Learn-Redux/Recipes-App/icons/clear.svg';
    
    var SearchTerm = function SearchTerm(props) {
      var searchTerm = props.searchTerm,
          dispatch = props.dispatch;
    
      var onSearchTermChangeHandler = function onSearchTermChangeHandler(e) {
        var userInput = e.target.value;
        dispatch((0, _searchTermSlice.setSearchTerm)(userInput));
      };
    
      var onClearSearchTermHandler = function onClearSearchTermHandler() {
        dispatch((0, _searchTermSlice.clearSearchTerm)());
      };
    
      return /*#__PURE__*/_react["default"].createElement("div", {
        id: "search-container"
      }, /*#__PURE__*/_react["default"].createElement("img", {
        id: "search-icon",
        alt: "",
        src: searchIconUrl
      }), /*#__PURE__*/_react["default"].createElement("input", {
        id: "search",
        type: "text",
        value: searchTerm,
        onChange: onSearchTermChangeHandler,
        placeholder: "Search recipes"
      }), searchTerm.length > 0 && /*#__PURE__*/_react["default"].createElement("button", {
        onClick: onClearSearchTermHandler,
        type: "button",
        id: "search-clear-button"
      }, /*#__PURE__*/_react["default"].createElement("img", {
        src: clearIconUrl,
        alt: ""
      })));
    };
    
    exports.SearchTerm = SearchTerm;
    
    },{"./searchTermSlice.js":11,"react":undefined}],11:[function(require,module,exports){
    "use strict";
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.setSearchTerm = setSearchTerm;
    exports.clearSearchTerm = clearSearchTerm;
    exports.searchTermReducer = void 0;
    var initialState = '';
    
    var searchTermReducer = function searchTermReducer() {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
      var action = arguments.length > 1 ? arguments[1] : undefined;
    
      switch (action.type) {
        case 'searchTerm/setSearchTerm':
          return action.payload;
    
        case 'searchTerm/clearSearchTerm':
          return '';
    
        default:
          return state;
      }
    };
    
    exports.searchTermReducer = searchTermReducer;
    
    function setSearchTerm(term) {
      return {
        type: 'searchTerm/setSearchTerm',
        payload: term
      };
    }
    
    function clearSearchTerm() {
      return {
        type: 'searchTerm/clearSearchTerm'
      };
    }
    
    },{}],12:[function(require,module,exports){
    "use strict";
    
    var _react = _interopRequireDefault(require("react"));
    
    var _reactDom = _interopRequireDefault(require("react-dom"));
    
    var _App = require("./app/App.js");
    
    var _store = require("./app/store.js");
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
    
    var render = function render() {
      _reactDom["default"].render( /*#__PURE__*/_react["default"].createElement(_App.App, {
        state: _store.store.getState(),
        dispatch: _store.store.dispatch
      }), document.getElementById('root'));
    };
    
    _store.store.subscribe(render);
    
    render();
    
    },{"./app/App.js":2,"./app/store.js":3,"react":undefined,"react-dom":undefined}]},{},[12]);
    