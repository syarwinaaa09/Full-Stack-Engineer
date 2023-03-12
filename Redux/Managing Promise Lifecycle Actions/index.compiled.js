(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
    (function (process){(function (){
    
    'use strict'
    
    if (process.env.NODE_ENV === 'production') {
      module.exports = require('./redux-toolkit.cjs.production.min.js')
    } else {
      module.exports = require('./redux-toolkit.cjs.development.js')
    }
    
    }).call(this)}).call(this,require('_process'))
    },{"./redux-toolkit.cjs.development.js":2,"./redux-toolkit.cjs.production.min.js":3,"_process":9}],2:[function(require,module,exports){
    'use strict';
    
    function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }
    
    var createNextState = require('immer');
    var createNextState__default = _interopDefault(createNextState);
    var redux = require('redux');
    var reselect = require('reselect');
    var thunkMiddleware = _interopDefault(require('redux-thunk'));
    
    function _extends() {
      _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
    
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
    
        return target;
      };
    
      return _extends.apply(this, arguments);
    }
    
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }
    
    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
      return _getPrototypeOf(o);
    }
    
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
      };
    
      return _setPrototypeOf(o, p);
    }
    
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
    
      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }
    
    function _construct(Parent, args, Class) {
      if (isNativeReflectConstruct()) {
        _construct = Reflect.construct;
      } else {
        _construct = function _construct(Parent, args, Class) {
          var a = [null];
          a.push.apply(a, args);
          var Constructor = Function.bind.apply(Parent, a);
          var instance = new Constructor();
          if (Class) _setPrototypeOf(instance, Class.prototype);
          return instance;
        };
      }
    
      return _construct.apply(null, arguments);
    }
    
    function _isNativeFunction(fn) {
      return Function.toString.call(fn).indexOf("[native code]") !== -1;
    }
    
    function _wrapNativeSuper(Class) {
      var _cache = typeof Map === "function" ? new Map() : undefined;
    
      _wrapNativeSuper = function _wrapNativeSuper(Class) {
        if (Class === null || !_isNativeFunction(Class)) return Class;
    
        if (typeof Class !== "function") {
          throw new TypeError("Super expression must either be null or a function");
        }
    
        if (typeof _cache !== "undefined") {
          if (_cache.has(Class)) return _cache.get(Class);
    
          _cache.set(Class, Wrapper);
        }
    
        function Wrapper() {
          return _construct(Class, arguments, _getPrototypeOf(this).constructor);
        }
    
        Wrapper.prototype = Object.create(Class.prototype, {
          constructor: {
            value: Wrapper,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        return _setPrototypeOf(Wrapper, Class);
      };
    
      return _wrapNativeSuper(Class);
    }
    
    /**
     * @public
     */
    
    var composeWithDevTools = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function () {
      if (arguments.length === 0) return undefined;
      if (typeof arguments[0] === 'object') return redux.compose;
      return redux.compose.apply(null, arguments);
    };
    
    /**
     * Returns true if the passed value is "plain" object, i.e. an object whose
     * protoype is the root `Object.prototype`. This includes objects created
     * using object literals, but not for instance for class instances.
     *
     * @param {any} value The value to inspect.
     * @returns {boolean} True if the argument appears to be a plain object.
     */
    function isPlainObject(value) {
      if (typeof value !== 'object' || value === null) return false;
      var proto = value;
    
      while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto);
      }
    
      return Object.getPrototypeOf(value) === proto;
    }
    
    function getTimeMeasureUtils(maxDelay, fnName) {
      var elapsed = 0;
      return {
        measureTime: function measureTime(fn) {
          var started = Date.now();
    
          try {
            return fn();
          } finally {
            var finished = Date.now();
            elapsed += finished - started;
          }
        },
        warnIfExceeded: function warnIfExceeded() {
          if (elapsed > maxDelay) {
            console.warn(fnName + " took " + elapsed + "ms, which is more than the warning threshold of " + maxDelay + "ms. \nIf your state or actions are very large, you may want to disable the middleware as it might cause too much of a slowdown in development mode. See https://redux-toolkit.js.org/api/getDefaultMiddleware for instructions.\nIt is disabled in production builds, so you don't need to worry about that.");
          }
        }
      };
    }
    /**
     * @public
     */
    
    var MiddlewareArray =
    /*#__PURE__*/
    function (_Array) {
      _inheritsLoose(MiddlewareArray, _Array);
    
      function MiddlewareArray() {
        return _Array.apply(this, arguments) || this;
      }
    
      var _proto = MiddlewareArray.prototype;
    
      _proto.concat = function concat() {
        var _Array$prototype$conc;
    
        for (var _len = arguments.length, arr = new Array(_len), _key = 0; _key < _len; _key++) {
          arr[_key] = arguments[_key];
        }
    
        return _construct(MiddlewareArray, (_Array$prototype$conc = _Array.prototype.concat).call.apply(_Array$prototype$conc, [this].concat(arr)));
      };
    
      _proto.prepend = function prepend() {
        for (var _len2 = arguments.length, arr = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          arr[_key2] = arguments[_key2];
        }
    
        if (arr.length === 1 && Array.isArray(arr[0])) {
          return _construct(MiddlewareArray, arr[0].concat(this));
        }
    
        return _construct(MiddlewareArray, arr.concat(this));
      };
    
      return MiddlewareArray;
    }(
    /*#__PURE__*/
    _wrapNativeSuper(Array));
    
    var prefix = 'Invariant failed'; // Throw an error if the condition fails
    // Strip out error messages for production
    // > Not providing an inline default argument for message as the result is smaller
    
    function invariant(condition, message) {
      if (condition) {
        return;
      } // Condition not passed
      // *This block will be removed in production builds*
    
    
      throw new Error(prefix + ": " + (message || ''));
    }
    
    function stringify(obj, serializer, indent, decycler) {
      return JSON.stringify(obj, getSerialize(serializer, decycler), indent);
    }
    
    function getSerialize(serializer, decycler) {
      var stack = [],
          keys = [];
      if (!decycler) decycler = function decycler(_, value) {
        if (stack[0] === value) return '[Circular ~]';
        return '[Circular ~.' + keys.slice(0, stack.indexOf(value)).join('.') + ']';
      };
      return function (key, value) {
        if (stack.length > 0) {
          var thisPos = stack.indexOf(this);
          ~thisPos ? stack.splice(thisPos + 1) : stack.push(this);
          ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key);
          if (~stack.indexOf(value)) value = decycler.call(this, key, value);
        } else stack.push(value);
    
        return serializer == null ? value : serializer.call(this, key, value);
      };
    }
    /**
     * The default `isImmutable` function.
     *
     * @public
     */
    
    
    function isImmutableDefault(value) {
      return typeof value !== 'object' || value === null || typeof value === 'undefined';
    }
    function trackForMutations(isImmutable, ignorePaths, obj) {
      var trackedProperties = trackProperties(isImmutable, ignorePaths, obj);
      return {
        detectMutations: function detectMutations() {
          return _detectMutations(isImmutable, ignorePaths, trackedProperties, obj);
        }
      };
    }
    
    function trackProperties(isImmutable, ignorePaths, obj, path) {
      if (ignorePaths === void 0) {
        ignorePaths = [];
      }
    
      if (path === void 0) {
        path = [];
      }
    
      var tracked = {
        value: obj
      };
    
      if (!isImmutable(obj)) {
        tracked.children = {};
    
        for (var key in obj) {
          var childPath = path.concat(key);
    
          if (ignorePaths.length && ignorePaths.indexOf(childPath.join('.')) !== -1) {
            continue;
          }
    
          tracked.children[key] = trackProperties(isImmutable, ignorePaths, obj[key], childPath);
        }
      }
    
      return tracked;
    }
    
    function _detectMutations(isImmutable, ignorePaths, trackedProperty, obj, sameParentRef, path) {
      if (ignorePaths === void 0) {
        ignorePaths = [];
      }
    
      if (sameParentRef === void 0) {
        sameParentRef = false;
      }
    
      if (path === void 0) {
        path = [];
      }
    
      var prevObj = trackedProperty ? trackedProperty.value : undefined;
      var sameRef = prevObj === obj;
    
      if (sameParentRef && !sameRef && !Number.isNaN(obj)) {
        return {
          wasMutated: true,
          path: path
        };
      }
    
      if (isImmutable(prevObj) || isImmutable(obj)) {
        return {
          wasMutated: false
        };
      } // Gather all keys from prev (tracked) and after objs
    
    
      var keysToDetect = {};
      Object.keys(trackedProperty.children).forEach(function (key) {
        keysToDetect[key] = true;
      });
      Object.keys(obj).forEach(function (key) {
        keysToDetect[key] = true;
      });
      var keys = Object.keys(keysToDetect);
    
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var childPath = path.concat(key);
    
        if (ignorePaths.length && ignorePaths.indexOf(childPath.join('.')) !== -1) {
          continue;
        }
    
        var result = _detectMutations(isImmutable, ignorePaths, trackedProperty.children[key], obj[key], sameRef, childPath);
    
        if (result.wasMutated) {
          return result;
        }
      }
    
      return {
        wasMutated: false
      };
    }
    /**
     * Creates a middleware that checks whether any state was mutated in between
     * dispatches or during a dispatch. If any mutations are detected, an error is
     * thrown.
     *
     * @param options Middleware options.
     *
     * @public
     */
    
    
    function createImmutableStateInvariantMiddleware(options) {
      if (options === void 0) {
        options = {};
      }
    
      var _options = options,
          _options$isImmutable = _options.isImmutable,
          isImmutable = _options$isImmutable === void 0 ? isImmutableDefault : _options$isImmutable,
          ignoredPaths = _options.ignoredPaths,
          _options$warnAfter = _options.warnAfter,
          warnAfter = _options$warnAfter === void 0 ? 32 : _options$warnAfter,
          ignore = _options.ignore; // Alias ignore->ignoredPaths, but prefer ignoredPaths if present
    
      ignoredPaths = ignoredPaths || ignore;
      var track = trackForMutations.bind(null, isImmutable, ignoredPaths);
      return function (_ref) {
        var getState = _ref.getState;
        var state = getState();
        var tracker = track(state);
        var result;
        return function (next) {
          return function (action) {
            var measureUtils = getTimeMeasureUtils(warnAfter, 'ImmutableStateInvariantMiddleware');
            measureUtils.measureTime(function () {
              state = getState();
              result = tracker.detectMutations(); // Track before potentially not meeting the invariant
    
              tracker = track(state);
              !!result.wasMutated ?  invariant(false, "A state mutation was detected between dispatches, in the path '" + (result.path || []).join('.') + "'.  This may cause incorrect behavior. (https://redux.js.org/troubleshooting#never-mutate-reducer-arguments)")  : void 0;
            });
            var dispatchedAction = next(action);
            measureUtils.measureTime(function () {
              state = getState();
              result = tracker.detectMutations(); // Track before potentially not meeting the invariant
    
              tracker = track(state);
              result.wasMutated && (!!result.wasMutated ?  invariant(false, "A state mutation was detected inside a dispatch, in the path: " + (result.path || []).join('.') + ". Take a look at the reducer(s) handling the action " + stringify(action) + ". (https://redux.js.org/troubleshooting#never-mutate-reducer-arguments)")  : void 0);
            });
            measureUtils.warnIfExceeded();
            return dispatchedAction;
          };
        };
      };
    }
    
    /**
     * Returns true if the passed value is "plain", i.e. a value that is either
     * directly JSON-serializable (boolean, number, string, array, plain object)
     * or `undefined`.
     *
     * @param val The value to check.
     *
     * @public
     */
    
    function isPlain(val) {
      return typeof val === 'undefined' || val === null || typeof val === 'string' || typeof val === 'boolean' || typeof val === 'number' || Array.isArray(val) || isPlainObject(val);
    }
    /**
     * @public
     */
    
    function findNonSerializableValue(value, path, isSerializable, getEntries, ignoredPaths) {
      if (path === void 0) {
        path = [];
      }
    
      if (isSerializable === void 0) {
        isSerializable = isPlain;
      }
    
      if (ignoredPaths === void 0) {
        ignoredPaths = [];
      }
    
      var foundNestedSerializable;
    
      if (!isSerializable(value)) {
        return {
          keyPath: path.join('.') || '<root>',
          value: value
        };
      }
    
      if (typeof value !== 'object' || value === null) {
        return false;
      }
    
      var entries = getEntries != null ? getEntries(value) : Object.entries(value);
      var hasIgnoredPaths = ignoredPaths.length > 0;
    
      for (var _iterator = entries, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;
    
        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }
    
        var _ref2 = _ref,
            property = _ref2[0],
            nestedValue = _ref2[1];
        var nestedPath = path.concat(property);
    
        if (hasIgnoredPaths && ignoredPaths.indexOf(nestedPath.join('.')) >= 0) {
          continue;
        }
    
        if (!isSerializable(nestedValue)) {
          return {
            keyPath: nestedPath.join('.'),
            value: nestedValue
          };
        }
    
        if (typeof nestedValue === 'object') {
          foundNestedSerializable = findNonSerializableValue(nestedValue, nestedPath, isSerializable, getEntries, ignoredPaths);
    
          if (foundNestedSerializable) {
            return foundNestedSerializable;
          }
        }
      }
    
      return false;
    }
    /**
     * Creates a middleware that, after every state change, checks if the new
     * state is serializable. If a non-serializable value is found within the
     * state, an error is printed to the console.
     *
     * @param options Middleware options.
     *
     * @public
     */
    
    function createSerializableStateInvariantMiddleware(options) {
      if (options === void 0) {
        options = {};
      }
    
      var _options = options,
          _options$isSerializab = _options.isSerializable,
          isSerializable = _options$isSerializab === void 0 ? isPlain : _options$isSerializab,
          getEntries = _options.getEntries,
          _options$ignoredActio = _options.ignoredActions,
          ignoredActions = _options$ignoredActio === void 0 ? [] : _options$ignoredActio,
          _options$ignoredActio2 = _options.ignoredActionPaths,
          ignoredActionPaths = _options$ignoredActio2 === void 0 ? ['meta.arg'] : _options$ignoredActio2,
          _options$ignoredPaths = _options.ignoredPaths,
          ignoredPaths = _options$ignoredPaths === void 0 ? [] : _options$ignoredPaths,
          _options$warnAfter = _options.warnAfter,
          warnAfter = _options$warnAfter === void 0 ? 32 : _options$warnAfter;
      return function (storeAPI) {
        return function (next) {
          return function (action) {
            if (ignoredActions.length && ignoredActions.indexOf(action.type) !== -1) {
              return next(action);
            }
    
            var measureUtils = getTimeMeasureUtils(warnAfter, 'SerializableStateInvariantMiddleware');
            measureUtils.measureTime(function () {
              var foundActionNonSerializableValue = findNonSerializableValue(action, [], isSerializable, getEntries, ignoredActionPaths);
    
              if (foundActionNonSerializableValue) {
                var keyPath = foundActionNonSerializableValue.keyPath,
                    value = foundActionNonSerializableValue.value;
                console.error("A non-serializable value was detected in an action, in the path: `" + keyPath + "`. Value:", value, '\nTake a look at the logic that dispatched this action: ', action, '\n(See https://redux.js.org/faq/actions#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants)', '\n(To allow non-serializable values see: https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data)');
              }
            });
            var result = next(action);
            measureUtils.measureTime(function () {
              var state = storeAPI.getState();
              var foundStateNonSerializableValue = findNonSerializableValue(state, [], isSerializable, getEntries, ignoredPaths);
    
              if (foundStateNonSerializableValue) {
                var keyPath = foundStateNonSerializableValue.keyPath,
                    value = foundStateNonSerializableValue.value;
                console.error("A non-serializable value was detected in the state, in the path: `" + keyPath + "`. Value:", value, "\nTake a look at the reducer(s) handling this action type: " + action.type + ".\n(See https://redux.js.org/faq/organizing-state#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state)");
              }
            });
            measureUtils.warnIfExceeded();
            return result;
          };
        };
      };
    }
    
    function isBoolean(x) {
      return typeof x === 'boolean';
    }
    
    function curryGetDefaultMiddleware() {
      return function curriedGetDefaultMiddleware(options) {
        return getDefaultMiddleware(options);
      };
    }
    /**
     * Returns any array containing the default middleware installed by
     * `configureStore()`. Useful if you want to configure your store with a custom
     * `middleware` array but still keep the default set.
     *
     * @return The default middleware used by `configureStore()`.
     *
     * @public
     */
    
    function getDefaultMiddleware(options) {
      if (options === void 0) {
        options = {};
      }
    
      var _options = options,
          _options$thunk = _options.thunk,
          thunk = _options$thunk === void 0 ? true : _options$thunk,
          _options$immutableChe = _options.immutableCheck,
          immutableCheck = _options$immutableChe === void 0 ? true : _options$immutableChe,
          _options$serializable = _options.serializableCheck,
          serializableCheck = _options$serializable === void 0 ? true : _options$serializable;
      var middlewareArray = new MiddlewareArray();
    
      if (thunk) {
        if (isBoolean(thunk)) {
          middlewareArray.push(thunkMiddleware);
        } else {
          middlewareArray.push(thunkMiddleware.withExtraArgument(thunk.extraArgument));
        }
      }
    
      {
        if (immutableCheck) {
          /* PROD_START_REMOVE_UMD */
          var immutableOptions = {};
    
          if (!isBoolean(immutableCheck)) {
            immutableOptions = immutableCheck;
          }
    
          middlewareArray.unshift(createImmutableStateInvariantMiddleware(immutableOptions));
          /* PROD_STOP_REMOVE_UMD */
        }
    
        if (serializableCheck) {
          var serializableOptions = {};
    
          if (!isBoolean(serializableCheck)) {
            serializableOptions = serializableCheck;
          }
    
          middlewareArray.push(createSerializableStateInvariantMiddleware(serializableOptions));
        }
      }
    
      return middlewareArray;
    }
    
    var IS_PRODUCTION = "development" === 'production';
    /**
     * A friendly abstraction over the standard Redux `createStore()` function.
     *
     * @param config The store configuration.
     * @returns A configured Redux store.
     *
     * @public
     */
    
    function configureStore(options) {
      var curriedGetDefaultMiddleware = curryGetDefaultMiddleware();
    
      var _ref = options || {},
          _ref$reducer = _ref.reducer,
          reducer = _ref$reducer === void 0 ? undefined : _ref$reducer,
          _ref$middleware = _ref.middleware,
          middleware = _ref$middleware === void 0 ? curriedGetDefaultMiddleware() : _ref$middleware,
          _ref$devTools = _ref.devTools,
          devTools = _ref$devTools === void 0 ? true : _ref$devTools,
          _ref$preloadedState = _ref.preloadedState,
          preloadedState = _ref$preloadedState === void 0 ? undefined : _ref$preloadedState,
          _ref$enhancers = _ref.enhancers,
          enhancers = _ref$enhancers === void 0 ? undefined : _ref$enhancers;
    
      var rootReducer;
    
      if (typeof reducer === 'function') {
        rootReducer = reducer;
      } else if (isPlainObject(reducer)) {
        rootReducer = redux.combineReducers(reducer);
      } else {
        throw new Error('"reducer" is a required argument, and must be a function or an object of functions that can be passed to combineReducers');
      }
    
      var middlewareEnhancer = redux.applyMiddleware.apply(void 0, typeof middleware === 'function' ? middleware(curriedGetDefaultMiddleware) : middleware);
      var finalCompose = redux.compose;
    
      if (devTools) {
        finalCompose = composeWithDevTools(_extends({
          // Enable capture of stack traces for dispatched Redux actions
          trace: !IS_PRODUCTION
        }, typeof devTools === 'object' && devTools));
      }
    
      var storeEnhancers = [middlewareEnhancer];
    
      if (Array.isArray(enhancers)) {
        storeEnhancers = [middlewareEnhancer].concat(enhancers);
      } else if (typeof enhancers === 'function') {
        storeEnhancers = enhancers(storeEnhancers);
      }
    
      var composedEnhancer = finalCompose.apply(void 0, storeEnhancers);
      return redux.createStore(rootReducer, preloadedState, composedEnhancer);
    }
    
    function createAction(type, prepareAction) {
      function actionCreator() {
        if (prepareAction) {
          var prepared = prepareAction.apply(void 0, arguments);
    
          if (!prepared) {
            throw new Error('prepareAction did not return an object');
          }
    
          return _extends({
            type: type,
            payload: prepared.payload
          }, 'meta' in prepared && {
            meta: prepared.meta
          }, {}, 'error' in prepared && {
            error: prepared.error
          });
        }
    
        return {
          type: type,
          payload: arguments.length <= 0 ? undefined : arguments[0]
        };
      }
    
      actionCreator.toString = function () {
        return "" + type;
      };
    
      actionCreator.type = type;
    
      actionCreator.match = function (action) {
        return action.type === type;
      };
    
      return actionCreator;
    }
    function isFSA(action) {
      return isPlainObject(action) && typeof action.type === 'string' && Object.keys(action).every(isValidKey);
    }
    
    function isValidKey(key) {
      return ['type', 'payload', 'error', 'meta'].indexOf(key) > -1;
    }
    /**
     * Returns the action type of the actions created by the passed
     * `createAction()`-generated action creator (arbitrary action creators
     * are not supported).
     *
     * @param action The action creator whose action type to get.
     * @returns The action type used by the action creator.
     *
     * @public
     */
    
    
    function getType(actionCreator) {
      return "" + actionCreator;
    }
    
    function executeReducerBuilderCallback(builderCallback) {
      var actionsMap = {};
      var actionMatchers = [];
      var defaultCaseReducer;
      var builder = {
        addCase: function addCase(typeOrActionCreator, reducer) {
          {
            /*
             to keep the definition by the user in line with actual behavior,
             we enforce `addCase` to always be called before calling `addMatcher`
             as matching cases take precedence over matchers
             */
            if (actionMatchers.length > 0) {
              throw new Error('`builder.addCase` should only be called before calling `builder.addMatcher`');
            }
    
            if (defaultCaseReducer) {
              throw new Error('`builder.addCase` should only be called before calling `builder.addDefaultCase`');
            }
          }
    
          var type = typeof typeOrActionCreator === 'string' ? typeOrActionCreator : typeOrActionCreator.type;
    
          if (type in actionsMap) {
            throw new Error('addCase cannot be called with two reducers for the same action type');
          }
    
          actionsMap[type] = reducer;
          return builder;
        },
        addMatcher: function addMatcher(matcher, reducer) {
          {
            if (defaultCaseReducer) {
              throw new Error('`builder.addMatcher` should only be called before calling `builder.addDefaultCase`');
            }
          }
    
          actionMatchers.push({
            matcher: matcher,
            reducer: reducer
          });
          return builder;
        },
        addDefaultCase: function addDefaultCase(reducer) {
          {
            if (defaultCaseReducer) {
              throw new Error('`builder.addDefaultCase` can only be called once');
            }
          }
    
          defaultCaseReducer = reducer;
          return builder;
        }
      };
      builderCallback(builder);
      return [actionsMap, actionMatchers, defaultCaseReducer];
    }
    
    function createReducer(initialState, mapOrBuilderCallback, actionMatchers, defaultCaseReducer) {
      if (actionMatchers === void 0) {
        actionMatchers = [];
      }
    
      var _ref = typeof mapOrBuilderCallback === 'function' ? executeReducerBuilderCallback(mapOrBuilderCallback) : [mapOrBuilderCallback, actionMatchers, defaultCaseReducer],
          actionsMap = _ref[0],
          finalActionMatchers = _ref[1],
          finalDefaultCaseReducer = _ref[2];
    
      return function (state, action) {
        if (state === void 0) {
          state = initialState;
        }
    
        var caseReducers = [actionsMap[action.type]].concat(finalActionMatchers.filter(function (_ref2) {
          var matcher = _ref2.matcher;
          return matcher(action);
        }).map(function (_ref3) {
          var reducer = _ref3.reducer;
          return reducer;
        }));
    
        if (caseReducers.filter(function (cr) {
          return !!cr;
        }).length === 0) {
          caseReducers = [finalDefaultCaseReducer];
        }
    
        return caseReducers.reduce(function (previousState, caseReducer) {
          if (caseReducer) {
            if (createNextState.isDraft(previousState)) {
              // If it's already a draft, we must already be inside a `createNextState` call,
              // likely because this is being wrapped in `createReducer`, `createSlice`, or nested
              // inside an existing draft. It's safe to just pass the draft to the mutator.
              var draft = previousState; // We can assume this is already a draft
    
              var result = caseReducer(draft, action);
    
              if (typeof result === 'undefined') {
                return previousState;
              }
    
              return result;
            } else if (!createNextState.isDraftable(previousState)) {
              // If state is not draftable (ex: a primitive, such as 0), we want to directly
              // return the caseReducer func and not wrap it with produce.
              var _result = caseReducer(previousState, action);
    
              if (typeof _result === 'undefined') {
                throw Error('A case reducer on a non-draftable value must not return undefined');
              }
    
              return _result;
            } else {
              // @ts-ignore createNextState() produces an Immutable<Draft<S>> rather
              // than an Immutable<S>, and TypeScript cannot find out how to reconcile
              // these two types.
              return createNextState__default(previousState, function (draft) {
                return caseReducer(draft, action);
              });
            }
          }
    
          return previousState;
        }, state);
      };
    }
    
    function getType$1(slice, actionKey) {
      return slice + "/" + actionKey;
    }
    /**
     * A function that accepts an initial state, an object full of reducer
     * functions, and a "slice name", and automatically generates
     * action creators and action types that correspond to the
     * reducers and state.
     *
     * The `reducer` argument is passed to `createReducer()`.
     *
     * @public
     */
    
    
    function createSlice(options) {
      var name = options.name,
          initialState = options.initialState;
    
      if (!name) {
        throw new Error('`name` is a required option for createSlice');
      }
    
      var reducers = options.reducers || {};
    
      var _ref = typeof options.extraReducers === 'undefined' ? [] : typeof options.extraReducers === 'function' ? executeReducerBuilderCallback(options.extraReducers) : [options.extraReducers],
          _ref$ = _ref[0],
          extraReducers = _ref$ === void 0 ? {} : _ref$,
          _ref$2 = _ref[1],
          actionMatchers = _ref$2 === void 0 ? [] : _ref$2,
          _ref$3 = _ref[2],
          defaultCaseReducer = _ref$3 === void 0 ? undefined : _ref$3;
    
      var reducerNames = Object.keys(reducers);
      var sliceCaseReducersByName = {};
      var sliceCaseReducersByType = {};
      var actionCreators = {};
      reducerNames.forEach(function (reducerName) {
        var maybeReducerWithPrepare = reducers[reducerName];
        var type = getType$1(name, reducerName);
        var caseReducer;
        var prepareCallback;
    
        if ('reducer' in maybeReducerWithPrepare) {
          caseReducer = maybeReducerWithPrepare.reducer;
          prepareCallback = maybeReducerWithPrepare.prepare;
        } else {
          caseReducer = maybeReducerWithPrepare;
        }
    
        sliceCaseReducersByName[reducerName] = caseReducer;
        sliceCaseReducersByType[type] = caseReducer;
        actionCreators[reducerName] = prepareCallback ? createAction(type, prepareCallback) : createAction(type);
      });
    
      var finalCaseReducers = _extends({}, extraReducers, {}, sliceCaseReducersByType);
    
      var reducer = createReducer(initialState, finalCaseReducers, actionMatchers, defaultCaseReducer);
      return {
        name: name,
        reducer: reducer,
        actions: actionCreators,
        caseReducers: sliceCaseReducersByName
      };
    }
    
    function getInitialEntityState() {
      return {
        ids: [],
        entities: {}
      };
    }
    function createInitialStateFactory() {
      function getInitialState(additionalState) {
        if (additionalState === void 0) {
          additionalState = {};
        }
    
        return Object.assign(getInitialEntityState(), additionalState);
      }
    
      return {
        getInitialState: getInitialState
      };
    }
    
    function createSelectorsFactory() {
      function getSelectors(selectState) {
        var selectIds = function selectIds(state) {
          return state.ids;
        };
    
        var selectEntities = function selectEntities(state) {
          return state.entities;
        };
    
        var selectAll = reselect.createSelector(selectIds, selectEntities, function (ids, entities) {
          return ids.map(function (id) {
            return entities[id];
          });
        });
    
        var selectId = function selectId(_, id) {
          return id;
        };
    
        var selectById = function selectById(entities, id) {
          return entities[id];
        };
    
        var selectTotal = reselect.createSelector(selectIds, function (ids) {
          return ids.length;
        });
    
        if (!selectState) {
          return {
            selectIds: selectIds,
            selectEntities: selectEntities,
            selectAll: selectAll,
            selectTotal: selectTotal,
            selectById: reselect.createSelector(selectEntities, selectId, selectById)
          };
        }
    
        var selectGlobalizedEntities = reselect.createSelector(selectState, selectEntities);
        return {
          selectIds: reselect.createSelector(selectState, selectIds),
          selectEntities: selectGlobalizedEntities,
          selectAll: reselect.createSelector(selectState, selectAll),
          selectTotal: reselect.createSelector(selectState, selectTotal),
          selectById: reselect.createSelector(selectGlobalizedEntities, selectId, selectById)
        };
      }
    
      return {
        getSelectors: getSelectors
      };
    }
    
    function createSingleArgumentStateOperator(mutator) {
      var operator = createStateOperator(function (_, state) {
        return mutator(state);
      });
      return function operation(state) {
        return operator(state, undefined);
      };
    }
    function createStateOperator(mutator) {
      return function operation(state, arg) {
        function isPayloadActionArgument(arg) {
          return isFSA(arg);
        }
    
        var runMutator = function runMutator(draft) {
          if (isPayloadActionArgument(arg)) {
            mutator(arg.payload, draft);
          } else {
            mutator(arg, draft);
          }
        };
    
        if (createNextState.isDraft(state)) {
          // we must already be inside a `createNextState` call, likely because
          // this is being wrapped in `createReducer` or `createSlice`.
          // It's safe to just pass the draft to the mutator.
          runMutator(state); // since it's a draft, we'll just return it
    
          return state;
        } else {
          // @ts-ignore createNextState() produces an Immutable<Draft<S>> rather
          // than an Immutable<S>, and TypeScript cannot find out how to reconcile
          // these two types.
          return createNextState__default(state, runMutator);
        }
      };
    }
    
    function selectIdValue(entity, selectId) {
      var key = selectId(entity);
    
      if ( key === undefined) {
        console.warn('The entity passed to the `selectId` implementation returned undefined.', 'You should probably provide your own `selectId` implementation.', 'The entity that was passed:', entity, 'The `selectId` implementation:', selectId.toString());
      }
    
      return key;
    }
    
    function createUnsortedStateAdapter(selectId) {
      function addOneMutably(entity, state) {
        var key = selectIdValue(entity, selectId);
    
        if (key in state.entities) {
          return;
        }
    
        state.ids.push(key);
        state.entities[key] = entity;
      }
    
      function addManyMutably(entities, state) {
        if (!Array.isArray(entities)) {
          entities = Object.values(entities);
        }
    
        for (var _iterator = entities, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
          var _ref;
    
          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
          }
    
          var entity = _ref;
          addOneMutably(entity, state);
        }
      }
    
      function setAllMutably(entities, state) {
        if (!Array.isArray(entities)) {
          entities = Object.values(entities);
        }
    
        state.ids = [];
        state.entities = {};
        addManyMutably(entities, state);
      }
    
      function removeOneMutably(key, state) {
        return removeManyMutably([key], state);
      }
    
      function removeManyMutably(keys, state) {
        var didMutate = false;
        keys.forEach(function (key) {
          if (key in state.entities) {
            delete state.entities[key];
            didMutate = true;
          }
        });
    
        if (didMutate) {
          state.ids = state.ids.filter(function (id) {
            return id in state.entities;
          });
        }
      }
    
      function removeAllMutably(state) {
        Object.assign(state, {
          ids: [],
          entities: {}
        });
      }
    
      function takeNewKey(keys, update, state) {
        var original = state.entities[update.id];
        var updated = Object.assign({}, original, update.changes);
        var newKey = selectIdValue(updated, selectId);
        var hasNewKey = newKey !== update.id;
    
        if (hasNewKey) {
          keys[update.id] = newKey;
          delete state.entities[update.id];
        }
    
        state.entities[newKey] = updated;
        return hasNewKey;
      }
    
      function updateOneMutably(update, state) {
        return updateManyMutably([update], state);
      }
    
      function updateManyMutably(updates, state) {
        var newKeys = {};
        var updatesPerEntity = {};
        updates.forEach(function (update) {
          // Only apply updates to entities that currently exist
          if (update.id in state.entities) {
            // If there are multiple updates to one entity, merge them together
            updatesPerEntity[update.id] = {
              id: update.id,
              // Spreads ignore falsy values, so this works even if there isn't
              // an existing update already at this key
              changes: _extends({}, updatesPerEntity[update.id] ? updatesPerEntity[update.id].changes : null, {}, update.changes)
            };
          }
        });
        updates = Object.values(updatesPerEntity);
        var didMutateEntities = updates.length > 0;
    
        if (didMutateEntities) {
          var didMutateIds = updates.filter(function (update) {
            return takeNewKey(newKeys, update, state);
          }).length > 0;
    
          if (didMutateIds) {
            state.ids = state.ids.map(function (id) {
              return newKeys[id] || id;
            });
          }
        }
      }
    
      function upsertOneMutably(entity, state) {
        return upsertManyMutably([entity], state);
      }
    
      function upsertManyMutably(entities, state) {
        if (!Array.isArray(entities)) {
          entities = Object.values(entities);
        }
    
        var added = [];
        var updated = [];
    
        for (var _iterator2 = entities, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
          var _ref2;
    
          if (_isArray2) {
            if (_i2 >= _iterator2.length) break;
            _ref2 = _iterator2[_i2++];
          } else {
            _i2 = _iterator2.next();
            if (_i2.done) break;
            _ref2 = _i2.value;
          }
    
          var entity = _ref2;
          var id = selectIdValue(entity, selectId);
    
          if (id in state.entities) {
            updated.push({
              id: id,
              changes: entity
            });
          } else {
            added.push(entity);
          }
        }
    
        updateManyMutably(updated, state);
        addManyMutably(added, state);
      }
    
      return {
        removeAll: createSingleArgumentStateOperator(removeAllMutably),
        addOne: createStateOperator(addOneMutably),
        addMany: createStateOperator(addManyMutably),
        setAll: createStateOperator(setAllMutably),
        updateOne: createStateOperator(updateOneMutably),
        updateMany: createStateOperator(updateManyMutably),
        upsertOne: createStateOperator(upsertOneMutably),
        upsertMany: createStateOperator(upsertManyMutably),
        removeOne: createStateOperator(removeOneMutably),
        removeMany: createStateOperator(removeManyMutably)
      };
    }
    
    function createSortedStateAdapter(selectId, sort) {
      var _createUnsortedStateA = createUnsortedStateAdapter(selectId),
          removeOne = _createUnsortedStateA.removeOne,
          removeMany = _createUnsortedStateA.removeMany,
          removeAll = _createUnsortedStateA.removeAll;
    
      function addOneMutably(entity, state) {
        return addManyMutably([entity], state);
      }
    
      function addManyMutably(newModels, state) {
        if (!Array.isArray(newModels)) {
          newModels = Object.values(newModels);
        }
    
        var models = newModels.filter(function (model) {
          return !(selectIdValue(model, selectId) in state.entities);
        });
    
        if (models.length !== 0) {
          merge(models, state);
        }
      }
    
      function setAllMutably(models, state) {
        if (!Array.isArray(models)) {
          models = Object.values(models);
        }
    
        state.entities = {};
        state.ids = [];
        addManyMutably(models, state);
      }
    
      function updateOneMutably(update, state) {
        return updateManyMutably([update], state);
      }
    
      function takeUpdatedModel(models, update, state) {
        if (!(update.id in state.entities)) {
          return false;
        }
    
        var original = state.entities[update.id];
        var updated = Object.assign({}, original, update.changes);
        var newKey = selectIdValue(updated, selectId);
        delete state.entities[update.id];
        models.push(updated);
        return newKey !== update.id;
      }
    
      function updateManyMutably(updates, state) {
        var models = [];
        updates.forEach(function (update) {
          return takeUpdatedModel(models, update, state);
        });
    
        if (models.length !== 0) {
          merge(models, state);
        }
      }
    
      function upsertOneMutably(entity, state) {
        return upsertManyMutably([entity], state);
      }
    
      function upsertManyMutably(entities, state) {
        if (!Array.isArray(entities)) {
          entities = Object.values(entities);
        }
    
        var added = [];
        var updated = [];
    
        for (var _iterator = entities, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
          var _ref;
    
          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
          }
    
          var entity = _ref;
          var id = selectIdValue(entity, selectId);
    
          if (id in state.entities) {
            updated.push({
              id: id,
              changes: entity
            });
          } else {
            added.push(entity);
          }
        }
    
        updateManyMutably(updated, state);
        addManyMutably(added, state);
      }
    
      function areArraysEqual(a, b) {
        if (a.length !== b.length) {
          return false;
        }
    
        for (var i = 0; i < a.length && i < b.length; i++) {
          if (a[i] === b[i]) {
            continue;
          }
    
          return false;
        }
    
        return true;
      }
    
      function merge(models, state) {
        models.sort(sort); // Insert/overwrite all new/updated
    
        models.forEach(function (model) {
          state.entities[selectId(model)] = model;
        });
        var allEntities = Object.values(state.entities);
        allEntities.sort(sort);
        var newSortedIds = allEntities.map(selectId);
        var ids = state.ids;
    
        if (!areArraysEqual(ids, newSortedIds)) {
          state.ids = newSortedIds;
        }
      }
    
      return {
        removeOne: removeOne,
        removeMany: removeMany,
        removeAll: removeAll,
        addOne: createStateOperator(addOneMutably),
        updateOne: createStateOperator(updateOneMutably),
        upsertOne: createStateOperator(upsertOneMutably),
        setAll: createStateOperator(setAllMutably),
        addMany: createStateOperator(addManyMutably),
        updateMany: createStateOperator(updateManyMutably),
        upsertMany: createStateOperator(upsertManyMutably)
      };
    }
    
    /**
     *
     * @param options
     *
     * @public
     */
    
    function createEntityAdapter(options) {
      if (options === void 0) {
        options = {};
      }
    
      var _sortComparer$selectI = _extends({
        sortComparer: false,
        selectId: function selectId(instance) {
          return instance.id;
        }
      }, options),
          selectId = _sortComparer$selectI.selectId,
          sortComparer = _sortComparer$selectI.sortComparer;
    
      var stateFactory = createInitialStateFactory();
      var selectorsFactory = createSelectorsFactory();
      var stateAdapter = sortComparer ? createSortedStateAdapter(selectId, sortComparer) : createUnsortedStateAdapter(selectId);
      return _extends({
        selectId: selectId,
        sortComparer: sortComparer
      }, stateFactory, {}, selectorsFactory, {}, stateAdapter);
    }
    
    // A type of promise-like that resolves synchronously and supports only one observer
    
    const _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";
    
    const _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";
    
    // Asynchronously call a function and send errors to recovery continuation
    function _catch(body, recover) {
        try {
            var result = body();
        } catch(e) {
            return recover(e);
        }
        if (result && result.then) {
            return result.then(void 0, recover);
        }
        return result;
    }
    
    // Borrowed from https://github.com/ai/nanoid/blob/3.0.2/non-secure/index.js
    // This alphabet uses `A-Za-z0-9_-` symbols. A genetic algorithm helped
    // optimize the gzip compression for this alphabet.
    var urlAlphabet = 'ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW';
    /**
     *
     * @public
     */
    
    var nanoid = function nanoid(size) {
      if (size === void 0) {
        size = 21;
      }
    
      var id = ''; // A compact alternative for `for (var i = 0; i < step; i++)`.
    
      var i = size;
    
      while (i--) {
        // `| 0` is more compact and faster than `Math.floor()`.
        id += urlAlphabet[Math.random() * 64 | 0];
      }
    
      return id;
    };
    
    var commonProperties = ['name', 'message', 'stack', 'code'];
    
    var RejectWithValue = function RejectWithValue(value) {
      this.value = value;
    }; // Reworked from https://github.com/sindresorhus/serialize-error
    
    
    var miniSerializeError = function miniSerializeError(value) {
      if (typeof value === 'object' && value !== null) {
        var simpleError = {};
    
        for (var _iterator = commonProperties, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
          var _ref;
    
          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
          }
    
          var property = _ref;
    
          if (typeof value[property] === 'string') {
            simpleError[property] = value[property];
          }
        }
    
        return simpleError;
      }
    
      return {
        message: String(value)
      };
    };
    /**
     *
     * @param typePrefix
     * @param payloadCreator
     * @param options
     *
     * @public
     */
    
    function createAsyncThunk(typePrefix, payloadCreator, options) {
      var fulfilled = createAction(typePrefix + '/fulfilled', function (result, requestId, arg) {
        return {
          payload: result,
          meta: {
            arg: arg,
            requestId: requestId
          }
        };
      });
      var pending = createAction(typePrefix + '/pending', function (requestId, arg) {
        return {
          payload: undefined,
          meta: {
            arg: arg,
            requestId: requestId
          }
        };
      });
      var rejected = createAction(typePrefix + '/rejected', function (error, requestId, arg, payload) {
        var aborted = !!error && error.name === 'AbortError';
        var condition = !!error && error.name === 'ConditionError';
        return {
          payload: payload,
          error: miniSerializeError(error || 'Rejected'),
          meta: {
            arg: arg,
            requestId: requestId,
            aborted: aborted,
            condition: condition
          }
        };
      });
      var displayedWarning = false;
      var AC = typeof AbortController !== 'undefined' ? AbortController :
      /*#__PURE__*/
      function () {
        function _class() {
          this.signal = {
            aborted: false,
            addEventListener: function addEventListener() {},
            dispatchEvent: function dispatchEvent() {
              return false;
            },
            onabort: function onabort() {},
            removeEventListener: function removeEventListener() {}
          };
        }
    
        var _proto = _class.prototype;
    
        _proto.abort = function abort() {
          {
            if (!displayedWarning) {
              displayedWarning = true;
              console.info("This platform does not implement AbortController. \nIf you want to use the AbortController to react to `abort` events, please consider importing a polyfill like 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'.");
            }
          }
        };
    
        return _class;
      }();
    
      function actionCreator(arg) {
        return function (dispatch, getState, extra) {
          var requestId = nanoid();
          var abortController = new AC();
          var abortReason;
          var abortedPromise = new Promise(function (_, reject) {
            return abortController.signal.addEventListener('abort', function () {
              return reject({
                name: 'AbortError',
                message: abortReason || 'Aborted'
              });
            });
          });
          var started = false;
    
          function abort(reason) {
            if (started) {
              abortReason = reason;
              abortController.abort();
            }
          }
    
          var promise = function () {
            try {
              var _temp3 = function _temp3(_result) {
                if (_exit2) return _result;
                // We dispatch the result action _after_ the catch, to avoid having any errors
                // here get swallowed by the try/catch block,
                // per https://twitter.com/dan_abramov/status/770914221638942720
                // and https://redux-toolkit.js.org/tutorials/advanced-tutorial#async-error-handling-logic-in-thunks
                var skipDispatch = options && !options.dispatchConditionRejection && rejected.match(finalAction) && finalAction.meta.condition;
    
                if (!skipDispatch) {
                  dispatch(finalAction);
                }
    
                return finalAction;
              };
    
              var _exit2 = false;
              var finalAction;
    
              var _temp4 = _catch(function () {
                if (options && options.condition && options.condition(arg, {
                  getState: getState,
                  extra: extra
                }) === false) {
                  // eslint-disable-next-line no-throw-literal
                  throw {
                    name: 'ConditionError',
                    message: 'Aborted due to condition callback returning false.'
                  };
                }
    
                started = true;
                dispatch(pending(requestId, arg));
                return Promise.resolve(Promise.race([abortedPromise, Promise.resolve(payloadCreator(arg, {
                  dispatch: dispatch,
                  getState: getState,
                  extra: extra,
                  requestId: requestId,
                  signal: abortController.signal,
                  rejectWithValue: function rejectWithValue(value) {
                    return new RejectWithValue(value);
                  }
                })).then(function (result) {
                  if (result instanceof RejectWithValue) {
                    return rejected(null, requestId, arg, result.value);
                  }
    
                  return fulfilled(result, requestId, arg);
                })])).then(function (_Promise$race) {
                  finalAction = _Promise$race;
                });
              }, function (err) {
                finalAction = rejected(err, requestId, arg);
              });
    
              return Promise.resolve(_temp4 && _temp4.then ? _temp4.then(_temp3) : _temp3(_temp4));
            } catch (e) {
              return Promise.reject(e);
            }
          }();
    
          return Object.assign(promise, {
            abort: abort
          });
        };
      }
    
      return Object.assign(actionCreator, {
        pending: pending,
        rejected: rejected,
        fulfilled: fulfilled,
        typePrefix: typePrefix
      });
    }
    /**
     * @public
     */
    
    function unwrapResult(returned) {
      if ('error' in returned) {
        throw returned.error;
      }
    
      return returned.payload;
    }
    
    // we assume RTK will be used with React Native and other Proxy-less
    // environments.  In addition, that's how Immer 4 behaved, and since
    // we want to ship this in an RTK minor, we should keep the same behavior.
    
    createNextState.enableES5();
    
    Object.keys(redux).forEach(function (k) {
      if (k !== 'default') Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () {
          return redux[k];
        }
      });
    });
    exports.createNextState = createNextState__default;
    Object.defineProperty(exports, 'current', {
      enumerable: true,
      get: function () {
        return createNextState.current;
      }
    });
    Object.defineProperty(exports, 'createSelector', {
      enumerable: true,
      get: function () {
        return reselect.createSelector;
      }
    });
    exports.MiddlewareArray = MiddlewareArray;
    exports.configureStore = configureStore;
    exports.createAction = createAction;
    exports.createAsyncThunk = createAsyncThunk;
    exports.createEntityAdapter = createEntityAdapter;
    exports.createImmutableStateInvariantMiddleware = createImmutableStateInvariantMiddleware;
    exports.createReducer = createReducer;
    exports.createSerializableStateInvariantMiddleware = createSerializableStateInvariantMiddleware;
    exports.createSlice = createSlice;
    exports.findNonSerializableValue = findNonSerializableValue;
    exports.getDefaultMiddleware = getDefaultMiddleware;
    exports.getType = getType;
    exports.isImmutableDefault = isImmutableDefault;
    exports.isPlain = isPlain;
    exports.nanoid = nanoid;
    exports.unwrapResult = unwrapResult;
    
    
    },{"immer":6,"redux":undefined,"redux-thunk":10,"reselect":11}],3:[function(require,module,exports){
    "use strict";function e(e){return e&&"object"==typeof e&&"default"in e?e.default:e}var t=require("immer"),r=e(t),n=require("redux"),o=require("reselect"),i=e(require("redux-thunk"));function a(){return(a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function u(e){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function c(e,t){return(c=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function f(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function s(e,t,r){return(s=f()?Reflect.construct:function(e,t,r){var n=[null];n.push.apply(n,t);var o=new(Function.bind.apply(e,n));return r&&c(o,r.prototype),o}).apply(null,arguments)}function l(e){var t="function"==typeof Map?new Map:void 0;return(l=function(e){if(null===e||-1===Function.toString.call(e).indexOf("[native code]"))return e;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,r)}function r(){return s(e,arguments,u(this).constructor)}return r.prototype=Object.create(e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),c(r,e)})(e)}var d="undefined"!=typeof window&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(0!==arguments.length)return"object"==typeof arguments[0]?n.compose:n.compose.apply(null,arguments)};function p(e){if("object"!=typeof e||null===e)return!1;for(var t=e;null!==Object.getPrototypeOf(t);)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t}var y=function(e){var t,r;function n(){return e.apply(this,arguments)||this}r=e,(t=n).prototype=Object.create(r.prototype),t.prototype.constructor=t,t.__proto__=r;var o=n.prototype;return o.concat=function(){for(var t,r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];return s(n,(t=e.prototype.concat).call.apply(t,[this].concat(o)))},o.prepend=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return 1===t.length&&Array.isArray(t[0])?s(n,t[0].concat(this)):s(n,t.concat(this))},n}(l(Array));function v(e){return null==e||"string"==typeof e||"boolean"==typeof e||"number"==typeof e||Array.isArray(e)||p(e)}function b(e){void 0===e&&(e={});var t=e.thunk,r=void 0===t||t,n=new y;return r&&n.push("boolean"==typeof r?i:i.withExtraArgument(r.extraArgument)),n}function h(e,t){function r(){if(t){var r=t.apply(void 0,arguments);if(!r)throw new Error("prepareAction did not return an object");return a({type:e,payload:r.payload},"meta"in r&&{meta:r.meta},{},"error"in r&&{error:r.error})}return{type:e,payload:arguments.length<=0?void 0:arguments[0]}}return r.toString=function(){return""+e},r.type=e,r.match=function(t){return t.type===e},r}function m(e){return["type","payload","error","meta"].indexOf(e)>-1}function g(e){var t,r={},n=[],o={addCase:function(e,t){var n="string"==typeof e?e:e.type;if(n in r)throw new Error("addCase cannot be called with two reducers for the same action type");return r[n]=t,o},addMatcher:function(e,t){return n.push({matcher:e,reducer:t}),o},addDefaultCase:function(e){return t=e,o}};return e(o),[r,n,t]}function O(e,n,o,i){void 0===o&&(o=[]);var a="function"==typeof n?g(n):[n,o,i],u=a[0],c=a[1],f=a[2];return function(n,o){void 0===n&&(n=e);var i=[u[o.type]].concat(c.filter((function(e){return(0,e.matcher)(o)})).map((function(e){return e.reducer})));return 0===i.filter((function(e){return!!e})).length&&(i=[f]),i.reduce((function(e,n){if(n){if(t.isDraft(e)){var i=n(e,o);return void 0===i?e:i}if(t.isDraftable(e))return r(e,(function(e){return n(e,o)}));var a=n(e,o);if(void 0===a)throw Error("A case reducer on a non-draftable value must not return undefined");return a}return e}),n)}}function A(e){return function(n,o){var i=function(t){!function(e){return p(t=e)&&"string"==typeof t.type&&Object.keys(t).every(m);var t}(o)?e(o,t):e(o.payload,t)};return t.isDraft(n)?(i(n),n):r(n,i)}}function S(e,t){return t(e)}function j(e){function t(t,r){var n=S(t,e);n in r.entities||(r.ids.push(n),r.entities[n]=t)}function r(e,r){Array.isArray(e)||(e=Object.values(e));var n=e,o=Array.isArray(n),i=0;for(n=o?n:n[Symbol.iterator]();;){var a;if(o){if(i>=n.length)break;a=n[i++]}else{if((i=n.next()).done)break;a=i.value}t(a,r)}}function n(e,t){var r=!1;e.forEach((function(e){e in t.entities&&(delete t.entities[e],r=!0)})),r&&(t.ids=t.ids.filter((function(e){return e in t.entities})))}function o(t,r){var n={},o={};t.forEach((function(e){e.id in r.entities&&(o[e.id]={id:e.id,changes:a({},o[e.id]?o[e.id].changes:null,{},e.changes)})})),(t=Object.values(o)).length>0&&t.filter((function(t){return function(t,r,n){var o=Object.assign({},n.entities[r.id],r.changes),i=S(o,e),a=i!==r.id;return a&&(t[r.id]=i,delete n.entities[r.id]),n.entities[i]=o,a}(n,t,r)})).length>0&&(r.ids=r.ids.map((function(e){return n[e]||e})))}function i(t,n){Array.isArray(t)||(t=Object.values(t));var i=[],a=[],u=t,c=Array.isArray(u),f=0;for(u=c?u:u[Symbol.iterator]();;){var s;if(c){if(f>=u.length)break;s=u[f++]}else{if((f=u.next()).done)break;s=f.value}var l=s,d=S(l,e);d in n.entities?a.push({id:d,changes:l}):i.push(l)}o(a,n),r(i,n)}return{removeAll:(u=function(e){Object.assign(e,{ids:[],entities:{}})},c=A((function(e,t){return u(t)})),function(e){return c(e,void 0)}),addOne:A(t),addMany:A(r),setAll:A((function(e,t){Array.isArray(e)||(e=Object.values(e)),t.ids=[],t.entities={},r(e,t)})),updateOne:A((function(e,t){return o([e],t)})),updateMany:A(o),upsertOne:A((function(e,t){return i([e],t)})),upsertMany:A(i),removeOne:A((function(e,t){return n([e],t)})),removeMany:A(n)};var u,c}"undefined"!=typeof Symbol&&(Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator"))),"undefined"!=typeof Symbol&&(Symbol.asyncIterator||(Symbol.asyncIterator=Symbol("Symbol.asyncIterator")));var x=function(e){void 0===e&&(e=21);for(var t="",r=e;r--;)t+="ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW"[64*Math.random()|0];return t},w=["name","message","stack","code"],E=function(e){this.value=e},_=function(e){if("object"==typeof e&&null!==e){var t={},r=w,n=Array.isArray(r),o=0;for(r=n?r:r[Symbol.iterator]();;){var i;if(n){if(o>=r.length)break;i=r[o++]}else{if((o=r.next()).done)break;i=o.value}"string"==typeof e[i]&&(t[i]=e[i])}return t}return{message:String(e)}};t.enableES5(),Object.keys(n).forEach((function(e){"default"!==e&&Object.defineProperty(exports,e,{enumerable:!0,get:function(){return n[e]}})})),exports.createNextState=r,Object.defineProperty(exports,"current",{enumerable:!0,get:function(){return t.current}}),Object.defineProperty(exports,"createSelector",{enumerable:!0,get:function(){return o.createSelector}}),exports.MiddlewareArray=y,exports.configureStore=function(e){var t,r=function(e){return b(e)},o=e||{},i=o.reducer,u=void 0===i?void 0:i,c=o.middleware,f=void 0===c?r():c,s=o.devTools,l=void 0===s||s,y=o.preloadedState,v=void 0===y?void 0:y,h=o.enhancers,m=void 0===h?void 0:h;if("function"==typeof u)t=u;else{if(!p(u))throw new Error('"reducer" is a required argument, and must be a function or an object of functions that can be passed to combineReducers');t=n.combineReducers(u)}var g=n.applyMiddleware.apply(void 0,"function"==typeof f?f(r):f),O=n.compose;l&&(O=d(a({trace:!1},"object"==typeof l&&l)));var A=[g];Array.isArray(m)?A=[g].concat(m):"function"==typeof m&&(A=m(A));var S=O.apply(void 0,A);return n.createStore(t,v,S)},exports.createAction=h,exports.createAsyncThunk=function(e,t,r){var n=h(e+"/fulfilled",(function(e,t,r){return{payload:e,meta:{arg:r,requestId:t}}})),o=h(e+"/pending",(function(e,t){return{payload:void 0,meta:{arg:t,requestId:e}}})),i=h(e+"/rejected",(function(e,t,r,n){var o=!!e&&"AbortError"===e.name,i=!!e&&"ConditionError"===e.name;return{payload:n,error:_(e||"Rejected"),meta:{arg:r,requestId:t,aborted:o,condition:i}}})),a="undefined"!=typeof AbortController?AbortController:function(){function e(){this.signal={aborted:!1,addEventListener:function(){},dispatchEvent:function(){return!1},onabort:function(){},removeEventListener:function(){}}}return e.prototype.abort=function(){},e}();return Object.assign((function(e){return function(u,c,f){var s,l=x(),d=new a,p=new Promise((function(e,t){return d.signal.addEventListener("abort",(function(){return t({name:"AbortError",message:s||"Aborted"})}))})),y=!1,v=function(){try{var a,s=function(e){return v?e:(r&&!r.dispatchConditionRejection&&i.match(a)&&a.meta.condition||u(a),a)},v=!1,b=function(s,v){try{var b=function(){if(r&&r.condition&&!1===r.condition(e,{getState:c,extra:f}))throw{name:"ConditionError",message:"Aborted due to condition callback returning false."};return y=!0,u(o(l,e)),Promise.resolve(Promise.race([p,Promise.resolve(t(e,{dispatch:u,getState:c,extra:f,requestId:l,signal:d.signal,rejectWithValue:function(e){return new E(e)}})).then((function(t){return t instanceof E?i(null,l,e,t.value):n(t,l,e)}))])).then((function(e){a=e}))}()}catch(e){return v(e)}return b&&b.then?b.then(void 0,v):b}(0,(function(t){a=i(t,l,e)}));return Promise.resolve(b&&b.then?b.then(s):s(b))}catch(e){return Promise.reject(e)}}();return Object.assign(v,{abort:function(e){y&&(s=e,d.abort())}})}}),{pending:o,rejected:i,fulfilled:n,typePrefix:e})},exports.createEntityAdapter=function(e){void 0===e&&(e={});var t=a({sortComparer:!1,selectId:function(e){return e.id}},e),r=t.selectId,n=t.sortComparer;return a({selectId:r,sortComparer:n},{getInitialState:function(e){return void 0===e&&(e={}),Object.assign({ids:[],entities:{}},e)}},{},{getSelectors:function(e){var t=function(e){return e.ids},r=function(e){return e.entities},n=o.createSelector(t,r,(function(e,t){return e.map((function(e){return t[e]}))})),i=function(e,t){return t},a=function(e,t){return e[t]},u=o.createSelector(t,(function(e){return e.length}));if(!e)return{selectIds:t,selectEntities:r,selectAll:n,selectTotal:u,selectById:o.createSelector(r,i,a)};var c=o.createSelector(e,r);return{selectIds:o.createSelector(e,t),selectEntities:c,selectAll:o.createSelector(e,n),selectTotal:o.createSelector(e,u),selectById:o.createSelector(c,i,a)}}},{},n?function(e,t){var r=j(e);function n(t,r){Array.isArray(t)||(t=Object.values(t));var n=t.filter((function(t){return!(S(t,e)in r.entities)}));0!==n.length&&a(n,r)}function o(t,r){var n=[];t.forEach((function(t){return function(t,r,n){if(!(r.id in n.entities))return!1;var o=Object.assign({},n.entities[r.id],r.changes),i=S(o,e);return delete n.entities[r.id],t.push(o),i!==r.id}(n,t,r)})),0!==n.length&&a(n,r)}function i(t,r){Array.isArray(t)||(t=Object.values(t));var i=[],a=[],u=t,c=Array.isArray(u),f=0;for(u=c?u:u[Symbol.iterator]();;){var s;if(c){if(f>=u.length)break;s=u[f++]}else{if((f=u.next()).done)break;s=f.value}var l=s,d=S(l,e);d in r.entities?a.push({id:d,changes:l}):i.push(l)}o(a,r),n(i,r)}function a(r,n){r.sort(t),r.forEach((function(t){n.entities[e(t)]=t}));var o=Object.values(n.entities);o.sort(t);var i=o.map(e);(function(e,t){if(e.length!==t.length)return!1;for(var r=0;r<e.length&&r<t.length;r++)if(e[r]!==t[r])return!1;return!0})(n.ids,i)||(n.ids=i)}return{removeOne:r.removeOne,removeMany:r.removeMany,removeAll:r.removeAll,addOne:A((function(e,t){return n([e],t)})),updateOne:A((function(e,t){return o([e],t)})),upsertOne:A((function(e,t){return i([e],t)})),setAll:A((function(e,t){Array.isArray(e)||(e=Object.values(e)),t.entities={},t.ids=[],n(e,t)})),addMany:A(n),updateMany:A(o),upsertMany:A(i)}}(r,n):j(r))},exports.createImmutableStateInvariantMiddleware=function(e){return function(){return function(e){return function(t){return e(t)}}}},exports.createReducer=O,exports.createSerializableStateInvariantMiddleware=function(e){return function(){return function(e){return function(t){return e(t)}}}},exports.createSlice=function(e){var t=e.name,r=e.initialState;if(!t)throw new Error("`name` is a required option for createSlice");var n=e.reducers||{},o=void 0===e.extraReducers?[]:"function"==typeof e.extraReducers?g(e.extraReducers):[e.extraReducers],i=o[0],u=void 0===i?{}:i,c=o[1],f=void 0===c?[]:c,s=o[2],l=void 0===s?void 0:s,d=Object.keys(n),p={},y={},v={};d.forEach((function(e){var r,o,i=n[e],a=t+"/"+e;"reducer"in i?(r=i.reducer,o=i.prepare):r=i,p[e]=r,y[a]=r,v[e]=o?h(a,o):h(a)}));var b=O(r,a({},u,{},y),f,l);return{name:t,reducer:b,actions:v,caseReducers:p}},exports.findNonSerializableValue=function e(t,r,n,o,i){var a;if(void 0===r&&(r=[]),void 0===n&&(n=v),void 0===i&&(i=[]),!n(t))return{keyPath:r.join(".")||"<root>",value:t};if("object"!=typeof t||null===t)return!1;var u=null!=o?o(t):Object.entries(t),c=i.length>0,f=u,s=Array.isArray(f),l=0;for(f=s?f:f[Symbol.iterator]();;){var d;if(s){if(l>=f.length)break;d=f[l++]}else{if((l=f.next()).done)break;d=l.value}var p=d[1],y=r.concat(d[0]);if(!(c&&i.indexOf(y.join("."))>=0)){if(!n(p))return{keyPath:y.join("."),value:p};if("object"==typeof p&&(a=e(p,y,n,o,i)))return a}}return!1},exports.getDefaultMiddleware=b,exports.getType=function(e){return""+e},exports.isImmutableDefault=function(e){return"object"!=typeof e||null==e},exports.isPlain=v,exports.nanoid=x,exports.unwrapResult=function(e){if("error"in e)throw e.error;return e.payload};
    
    
    },{"immer":6,"redux":undefined,"redux-thunk":10,"reselect":11}],4:[function(require,module,exports){
    'use strict';
    
    Object.defineProperty(exports, '__esModule', { value: true });
    
    var _ref;
    
    // Should be no imports here!
    // Some things that should be evaluated before all else...
    // We only want to know if non-polyfilled symbols are available
    var hasSymbol = typeof Symbol !== "undefined" && typeof
    /*#__PURE__*/
    Symbol("x") === "symbol";
    var hasMap = typeof Map !== "undefined";
    var hasSet = typeof Set !== "undefined";
    var hasProxies = typeof Proxy !== "undefined" && typeof Proxy.revocable !== "undefined" && typeof Reflect !== "undefined";
    /**
     * The sentinel value returned by producers to replace the draft with undefined.
     */
    
    var NOTHING = hasSymbol ?
    /*#__PURE__*/
    Symbol.for("immer-nothing") : (_ref = {}, _ref["immer-nothing"] = true, _ref);
    /**
     * To let Immer treat your class instances as plain immutable objects
     * (albeit with a custom prototype), you must define either an instance property
     * or a static property on each of your custom classes.
     *
     * Otherwise, your class instance will never be drafted, which means it won't be
     * safe to mutate in a produce callback.
     */
    
    var DRAFTABLE = hasSymbol ?
    /*#__PURE__*/
    Symbol.for("immer-draftable") : "__$immer_draftable";
    var DRAFT_STATE = hasSymbol ?
    /*#__PURE__*/
    Symbol.for("immer-state") : "__$immer_state"; // Even a polyfilled Symbol might provide Symbol.iterator
    
    var iteratorSymbol = typeof Symbol != "undefined" && Symbol.iterator || "@@iterator";
    
    var errors = {
      0: "Illegal state",
      1: "Immer drafts cannot have computed properties",
      2: "This object has been frozen and should not be mutated",
      3: function _(data) {
        return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + data;
      },
      4: "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",
      5: "Immer forbids circular references",
      6: "The first or second argument to `produce` must be a function",
      7: "The third argument to `produce` must be a function or undefined",
      8: "First argument to `createDraft` must be a plain object, an array, or an immerable object",
      9: "First argument to `finishDraft` must be a draft returned by `createDraft`",
      10: "The given draft is already finalized",
      11: "Object.defineProperty() cannot be used on an Immer draft",
      12: "Object.setPrototypeOf() cannot be used on an Immer draft",
      13: "Immer only supports deleting array indices",
      14: "Immer only supports setting array indices and the 'length' property",
      15: function _(path) {
        return "Cannot apply patch, path doesn't resolve: " + path;
      },
      16: 'Sets cannot have "replace" patches.',
      17: function _(op) {
        return "Unsupported patch operation: " + op;
      },
      18: function _(plugin) {
        return "The plugin for '" + plugin + "' has not been loaded into Immer. To enable the plugin, import and call `enable" + plugin + "()` when initializing your application.";
      },
      20: "Cannot use proxies if Proxy, Proxy.revocable or Reflect are not available",
      21: function _(thing) {
        return "produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '" + thing + "'";
      },
      22: function _(thing) {
        return "'current' expects a draft, got: " + thing;
      },
      23: function _(thing) {
        return "'original' expects a draft, got: " + thing;
      }
    };
    function die(error) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
    
      {
        var e = errors[error];
        var msg = !e ? "unknown error nr: " + error : typeof e === "function" ? e.apply(null, args) : e;
        throw new Error("[Immer] " + msg);
      }
    }
    
    var ArchtypeObject = 0;
    var ArchtypeArray = 1;
    var ArchtypeMap = 2;
    var ArchtypeSet = 3;
    var ProxyTypeProxyObject = 0;
    var ProxyTypeProxyArray = 1;
    var ProxyTypeES5Object = 4;
    var ProxyTypeES5Array = 5;
    var ProxyTypeMap = 2;
    var ProxyTypeSet = 3;
    
    /** Returns true if the given value is an Immer draft */
    
    /*#__PURE__*/
    
    function isDraft(value) {
      return !!value && !!value[DRAFT_STATE];
    }
    /** Returns true if the given value can be drafted by Immer */
    
    /*#__PURE__*/
    
    function isDraftable(value) {
      if (!value) return false;
      return isPlainObject(value) || Array.isArray(value) || !!value[DRAFTABLE] || !!value.constructor[DRAFTABLE] || isMap(value) || isSet(value);
    }
    /*#__PURE__*/
    
    function isPlainObject(value) {
      if (!value || typeof value !== "object") return false;
      var proto = Object.getPrototypeOf(value);
      return !proto || proto === Object.prototype;
    }
    function original(value) {
      if (!isDraft(value)) die(23, value);
      return value[DRAFT_STATE].base_;
    }
    /*#__PURE__*/
    
    var ownKeys = typeof Reflect !== "undefined" && Reflect.ownKeys ? Reflect.ownKeys : typeof Object.getOwnPropertySymbols !== "undefined" ? function (obj) {
      return Object.getOwnPropertyNames(obj).concat(Object.getOwnPropertySymbols(obj));
    } :
    /* istanbul ignore next */
    Object.getOwnPropertyNames;
    var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors || function getOwnPropertyDescriptors(target) {
      // Polyfill needed for Hermes and IE, see https://github.com/facebook/hermes/issues/274
      var res = {};
      ownKeys(target).forEach(function (key) {
        res[key] = Object.getOwnPropertyDescriptor(target, key);
      });
      return res;
    };
    function each(obj, iter, enumerableOnly) {
      if (enumerableOnly === void 0) {
        enumerableOnly = false;
      }
    
      if (getArchtype(obj) === ArchtypeObject) {
        (enumerableOnly ? Object.keys : ownKeys)(obj).forEach(function (key) {
          if (!enumerableOnly || typeof key !== "symbol") iter(key, obj[key], obj);
        });
      } else {
        obj.forEach(function (entry, index) {
          return iter(index, entry, obj);
        });
      }
    }
    /*#__PURE__*/
    
    function getArchtype(thing) {
      /* istanbul ignore next */
      var state = thing[DRAFT_STATE];
      return state ? state.type_ > 3 ? state.type_ - 4 // cause Object and Array map back from 4 and 5
      : state.type_ // others are the same
      : Array.isArray(thing) ? ArchtypeArray : isMap(thing) ? ArchtypeMap : isSet(thing) ? ArchtypeSet : ArchtypeObject;
    }
    /*#__PURE__*/
    
    function has(thing, prop) {
      return getArchtype(thing) === ArchtypeMap ? thing.has(prop) : Object.prototype.hasOwnProperty.call(thing, prop);
    }
    /*#__PURE__*/
    
    function get(thing, prop) {
      // @ts-ignore
      return getArchtype(thing) === ArchtypeMap ? thing.get(prop) : thing[prop];
    }
    /*#__PURE__*/
    
    function set(thing, propOrOldValue, value) {
      var t = getArchtype(thing);
      if (t === ArchtypeMap) thing.set(propOrOldValue, value);else if (t === ArchtypeSet) {
        thing.delete(propOrOldValue);
        thing.add(value);
      } else thing[propOrOldValue] = value;
    }
    /*#__PURE__*/
    
    function is(x, y) {
      // From: https://github.com/facebook/fbjs/blob/c69904a511b900266935168223063dd8772dfc40/packages/fbjs/src/core/shallowEqual.js
      if (x === y) {
        return x !== 0 || 1 / x === 1 / y;
      } else {
        return x !== x && y !== y;
      }
    }
    /*#__PURE__*/
    
    function isMap(target) {
      return hasMap && target instanceof Map;
    }
    /*#__PURE__*/
    
    function isSet(target) {
      return hasSet && target instanceof Set;
    }
    /*#__PURE__*/
    
    function latest(state) {
      return state.copy_ || state.base_;
    }
    /*#__PURE__*/
    
    function shallowCopy(base) {
      if (Array.isArray(base)) return Array.prototype.slice.call(base);
      var descriptors = getOwnPropertyDescriptors(base);
      delete descriptors[DRAFT_STATE];
      var keys = ownKeys(descriptors);
    
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var desc = descriptors[key];
    
        if (desc.writable === false) {
          desc.writable = true;
          desc.configurable = true;
        } // like object.assign, we will read any _own_, get/set accessors. This helps in dealing
        // with libraries that trap values, like mobx or vue
        // unlike object.assign, non-enumerables will be copied as well
    
    
        if (desc.get || desc.set) descriptors[key] = {
          configurable: true,
          writable: true,
          enumerable: desc.enumerable,
          value: base[key]
        };
      }
    
      return Object.create(Object.getPrototypeOf(base), descriptors);
    }
    function freeze(obj, deep) {
      if (isFrozen(obj) || isDraft(obj) || !isDraftable(obj)) return;
    
      if (getArchtype(obj) > 1
      /* Map or Set */
      ) {
          obj.set = obj.add = obj.clear = obj.delete = dontMutateFrozenCollections;
        }
    
      Object.freeze(obj);
      if (deep) each(obj, function (key, value) {
        return freeze(value, true);
      }, true);
    }
    
    function dontMutateFrozenCollections() {
      die(2);
    }
    
    function isFrozen(obj) {
      if (obj == null || typeof obj !== "object") return true; // See #600, IE dies on non-objects in Object.isFrozen
    
      return Object.isFrozen(obj);
    }
    
    /** Plugin utilities */
    
    var plugins = {};
    function getPlugin(pluginKey) {
      var plugin = plugins[pluginKey];
    
      if (!plugin) {
        die(18, pluginKey);
      } // @ts-ignore
    
    
      return plugin;
    }
    function loadPlugin(pluginKey, implementation) {
      if (!plugins[pluginKey]) plugins[pluginKey] = implementation;
    }
    
    var currentScope;
    function getCurrentScope() {
      if ( !currentScope) die(0);
      return currentScope;
    }
    
    function createScope(parent_, immer_) {
      return {
        drafts_: [],
        parent_: parent_,
        immer_: immer_,
        // Whenever the modified draft contains a draft from another scope, we
        // need to prevent auto-freezing so the unowned draft can be finalized.
        canAutoFreeze_: true,
        unfinalizedDrafts_: 0
      };
    }
    
    function usePatchesInScope(scope, patchListener) {
      if (patchListener) {
        getPlugin("Patches"); // assert we have the plugin
    
        scope.patches_ = [];
        scope.inversePatches_ = [];
        scope.patchListener_ = patchListener;
      }
    }
    function revokeScope(scope) {
      leaveScope(scope);
      scope.drafts_.forEach(revokeDraft); // @ts-ignore
    
      scope.drafts_ = null;
    }
    function leaveScope(scope) {
      if (scope === currentScope) {
        currentScope = scope.parent_;
      }
    }
    function enterScope(immer) {
      return currentScope = createScope(currentScope, immer);
    }
    
    function revokeDraft(draft) {
      var state = draft[DRAFT_STATE];
      if (state.type_ === ProxyTypeProxyObject || state.type_ === ProxyTypeProxyArray) state.revoke_();else state.revoked_ = true;
    }
    
    function processResult(result, scope) {
      scope.unfinalizedDrafts_ = scope.drafts_.length;
      var baseDraft = scope.drafts_[0];
      var isReplaced = result !== undefined && result !== baseDraft;
      if (!scope.immer_.useProxies_) getPlugin("ES5").willFinalizeES5_(scope, result, isReplaced);
    
      if (isReplaced) {
        if (baseDraft[DRAFT_STATE].modified_) {
          revokeScope(scope);
          die(4);
        }
    
        if (isDraftable(result)) {
          // Finalize the result in case it contains (or is) a subset of the draft.
          result = finalize(scope, result);
          if (!scope.parent_) maybeFreeze(scope, result);
        }
    
        if (scope.patches_) {
          getPlugin("Patches").generateReplacementPatches_(baseDraft[DRAFT_STATE], result, scope.patches_, scope.inversePatches_);
        }
      } else {
        // Finalize the base draft.
        result = finalize(scope, baseDraft, []);
      }
    
      revokeScope(scope);
    
      if (scope.patches_) {
        scope.patchListener_(scope.patches_, scope.inversePatches_);
      }
    
      return result !== NOTHING ? result : undefined;
    }
    
    function finalize(rootScope, value, path) {
      // Don't recurse in tho recursive data structures
      if (isFrozen(value)) return value;
      var state = value[DRAFT_STATE]; // A plain object, might need freezing, might contain drafts
    
      if (!state) {
        each(value, function (key, childValue) {
          return finalizeProperty(rootScope, state, value, key, childValue, path);
        }, true // See #590, don't recurse into non-enumarable of non drafted objects
        );
        return value;
      } // Never finalize drafts owned by another scope.
    
    
      if (state.scope_ !== rootScope) return value; // Unmodified draft, return the (frozen) original
    
      if (!state.modified_) {
        maybeFreeze(rootScope, state.base_, true);
        return state.base_;
      } // Not finalized yet, let's do that now
    
    
      if (!state.finalized_) {
        state.finalized_ = true;
        state.scope_.unfinalizedDrafts_--;
        var result = // For ES5, create a good copy from the draft first, with added keys and without deleted keys.
        state.type_ === ProxyTypeES5Object || state.type_ === ProxyTypeES5Array ? state.copy_ = shallowCopy(state.draft_) : state.copy_; // Finalize all children of the copy
        // For sets we clone before iterating, otherwise we can get in endless loop due to modifying during iteration, see #628
        // Although the original test case doesn't seem valid anyway, so if this in the way we can turn the next line
        // back to each(result, ....)
    
        each(state.type_ === ProxyTypeSet ? new Set(result) : result, function (key, childValue) {
          return finalizeProperty(rootScope, state, result, key, childValue, path);
        }); // everything inside is frozen, we can freeze here
    
        maybeFreeze(rootScope, result, false); // first time finalizing, let's create those patches
    
        if (path && rootScope.patches_) {
          getPlugin("Patches").generatePatches_(state, path, rootScope.patches_, rootScope.inversePatches_);
        }
      }
    
      return state.copy_;
    }
    
    function finalizeProperty(rootScope, parentState, targetObject, prop, childValue, rootPath) {
      if ( childValue === targetObject) die(5);
    
      if (isDraft(childValue)) {
        var path = rootPath && parentState && parentState.type_ !== ProxyTypeSet && // Set objects are atomic since they have no keys.
        !has(parentState.assigned_, prop) // Skip deep patches for assigned keys.
        ? rootPath.concat(prop) : undefined; // Drafts owned by `scope` are finalized here.
    
        var res = finalize(rootScope, childValue, path);
        set(targetObject, prop, res); // Drafts from another scope must prevented to be frozen
        // if we got a draft back from finalize, we're in a nested produce and shouldn't freeze
    
        if (isDraft(res)) {
          rootScope.canAutoFreeze_ = false;
        } else return;
      } // Search new objects for unfinalized drafts. Frozen objects should never contain drafts.
    
    
      if (isDraftable(childValue) && !isFrozen(childValue)) {
        if (!rootScope.immer_.autoFreeze_ && rootScope.unfinalizedDrafts_ < 1) {
          // optimization: if an object is not a draft, and we don't have to
          // deepfreeze everything, and we are sure that no drafts are left in the remaining object
          // cause we saw and finalized all drafts already; we can stop visiting the rest of the tree.
          // This benefits especially adding large data tree's without further processing.
          // See add-data.js perf test
          return;
        }
    
        finalize(rootScope, childValue); // immer deep freezes plain objects, so if there is no parent state, we freeze as well
    
        if (!parentState || !parentState.scope_.parent_) maybeFreeze(rootScope, childValue);
      }
    }
    
    function maybeFreeze(scope, value, deep) {
      if (deep === void 0) {
        deep = false;
      }
    
      if (scope.immer_.autoFreeze_ && scope.canAutoFreeze_) {
        freeze(value, deep);
      }
    }
    
    /**
     * Returns a new draft of the `base` object.
     *
     * The second argument is the parent draft-state (used internally).
     */
    
    function createProxyProxy(base, parent) {
      var isArray = Array.isArray(base);
      var state = {
        type_: isArray ? ProxyTypeProxyArray : ProxyTypeProxyObject,
        // Track which produce call this is associated with.
        scope_: parent ? parent.scope_ : getCurrentScope(),
        // True for both shallow and deep changes.
        modified_: false,
        // Used during finalization.
        finalized_: false,
        // Track which properties have been assigned (true) or deleted (false).
        assigned_: {},
        // The parent draft state.
        parent_: parent,
        // The base state.
        base_: base,
        // The base proxy.
        draft_: null,
        // The base copy with any updated values.
        copy_: null,
        // Called by the `produce` function.
        revoke_: null,
        isManual_: false
      }; // the traps must target something, a bit like the 'real' base.
      // but also, we need to be able to determine from the target what the relevant state is
      // (to avoid creating traps per instance to capture the state in closure,
      // and to avoid creating weird hidden properties as well)
      // So the trick is to use 'state' as the actual 'target'! (and make sure we intercept everything)
      // Note that in the case of an array, we put the state in an array to have better Reflect defaults ootb
    
      var target = state;
      var traps = objectTraps;
    
      if (isArray) {
        target = [state];
        traps = arrayTraps;
      }
    
      var _Proxy$revocable = Proxy.revocable(target, traps),
          revoke = _Proxy$revocable.revoke,
          proxy = _Proxy$revocable.proxy;
    
      state.draft_ = proxy;
      state.revoke_ = revoke;
      return proxy;
    }
    /**
     * Object drafts
     */
    
    var objectTraps = {
      get: function get(state, prop) {
        if (prop === DRAFT_STATE) return state;
        var source = latest(state);
    
        if (!has(source, prop)) {
          // non-existing or non-own property...
          return readPropFromProto(state, source, prop);
        }
    
        var value = source[prop];
    
        if (state.finalized_ || !isDraftable(value)) {
          return value;
        } // Check for existing draft in modified state.
        // Assigned values are never drafted. This catches any drafts we created, too.
    
    
        if (value === peek(state.base_, prop)) {
          prepareCopy(state);
          return state.copy_[prop] = createProxy(state.scope_.immer_, value, state);
        }
    
        return value;
      },
      has: function has(state, prop) {
        return prop in latest(state);
      },
      ownKeys: function ownKeys(state) {
        return Reflect.ownKeys(latest(state));
      },
      set: function set(state, prop
      /* strictly not, but helps TS */
      , value) {
        var desc = getDescriptorFromProto(latest(state), prop);
    
        if (desc === null || desc === void 0 ? void 0 : desc.set) {
          // special case: if this write is captured by a setter, we have
          // to trigger it with the correct context
          desc.set.call(state.draft_, value);
          return true;
        }
    
        if (!state.modified_) {
          // the last check is because we need to be able to distinguish setting a non-existig to undefined (which is a change)
          // from setting an existing property with value undefined to undefined (which is not a change)
          var current = peek(latest(state), prop); // special case, if we assigning the original value to a draft, we can ignore the assignment
    
          var currentState = current === null || current === void 0 ? void 0 : current[DRAFT_STATE];
    
          if (currentState && currentState.base_ === value) {
            state.copy_[prop] = value;
            state.assigned_[prop] = false;
            return true;
          }
    
          if (is(value, current) && (value !== undefined || has(state.base_, prop))) return true;
          prepareCopy(state);
          markChanged(state);
        } // @ts-ignore
    
    
        state.copy_[prop] = value;
        state.assigned_[prop] = true;
        return true;
      },
      deleteProperty: function deleteProperty(state, prop) {
        // The `undefined` check is a fast path for pre-existing keys.
        if (peek(state.base_, prop) !== undefined || prop in state.base_) {
          state.assigned_[prop] = false;
          prepareCopy(state);
          markChanged(state);
        } else {
          // if an originally not assigned property was deleted
          delete state.assigned_[prop];
        } // @ts-ignore
    
    
        if (state.copy_) delete state.copy_[prop];
        return true;
      },
      // Note: We never coerce `desc.value` into an Immer draft, because we can't make
      // the same guarantee in ES5 mode.
      getOwnPropertyDescriptor: function getOwnPropertyDescriptor(state, prop) {
        var owner = latest(state);
        var desc = Reflect.getOwnPropertyDescriptor(owner, prop);
        if (!desc) return desc;
        return {
          writable: true,
          configurable: state.type_ !== ProxyTypeProxyArray || prop !== "length",
          enumerable: desc.enumerable,
          value: owner[prop]
        };
      },
      defineProperty: function defineProperty() {
        die(11);
      },
      getPrototypeOf: function getPrototypeOf(state) {
        return Object.getPrototypeOf(state.base_);
      },
      setPrototypeOf: function setPrototypeOf() {
        die(12);
      }
    };
    /**
     * Array drafts
     */
    
    var arrayTraps = {};
    each(objectTraps, function (key, fn) {
      // @ts-ignore
      arrayTraps[key] = function () {
        arguments[0] = arguments[0][0];
        return fn.apply(this, arguments);
      };
    });
    
    arrayTraps.deleteProperty = function (state, prop) {
      if ( isNaN(parseInt(prop))) die(13);
      return objectTraps.deleteProperty.call(this, state[0], prop);
    };
    
    arrayTraps.set = function (state, prop, value) {
      if ( prop !== "length" && isNaN(parseInt(prop))) die(14);
      return objectTraps.set.call(this, state[0], prop, value, state[0]);
    }; // Access a property without creating an Immer draft.
    
    
    function peek(draft, prop) {
      var state = draft[DRAFT_STATE];
      var source = state ? latest(state) : draft;
      return source[prop];
    }
    
    function readPropFromProto(state, source, prop) {
      var _desc$get;
    
      var desc = getDescriptorFromProto(source, prop);
      return desc ? "value" in desc ? desc.value : // This is a very special case, if the prop is a getter defined by the
      // prototype, we should invoke it with the draft as context!
      (_desc$get = desc.get) === null || _desc$get === void 0 ? void 0 : _desc$get.call(state.draft_) : undefined;
    }
    
    function getDescriptorFromProto(source, prop) {
      // 'in' checks proto!
      if (!(prop in source)) return undefined;
      var proto = Object.getPrototypeOf(source);
    
      while (proto) {
        var desc = Object.getOwnPropertyDescriptor(proto, prop);
        if (desc) return desc;
        proto = Object.getPrototypeOf(proto);
      }
    
      return undefined;
    }
    
    function markChanged(state) {
      if (!state.modified_) {
        state.modified_ = true;
    
        if (state.parent_) {
          markChanged(state.parent_);
        }
      }
    }
    function prepareCopy(state) {
      if (!state.copy_) {
        state.copy_ = shallowCopy(state.base_);
      }
    }
    
    var Immer =
    /*#__PURE__*/
    function () {
      function Immer(config) {
        this.useProxies_ = hasProxies;
        this.autoFreeze_ =  true
        /* istanbul ignore next */
        ;
        if (typeof (config === null || config === void 0 ? void 0 : config.useProxies) === "boolean") this.setUseProxies(config.useProxies);
        if (typeof (config === null || config === void 0 ? void 0 : config.autoFreeze) === "boolean") this.setAutoFreeze(config.autoFreeze);
        this.produce = this.produce.bind(this);
        this.produceWithPatches = this.produceWithPatches.bind(this);
      }
      /**
       * The `produce` function takes a value and a "recipe function" (whose
       * return value often depends on the base state). The recipe function is
       * free to mutate its first argument however it wants. All mutations are
       * only ever applied to a __copy__ of the base state.
       *
       * Pass only a function to create a "curried producer" which relieves you
       * from passing the recipe function every time.
       *
       * Only plain objects and arrays are made mutable. All other objects are
       * considered uncopyable.
       *
       * Note: This function is __bound__ to its `Immer` instance.
       *
       * @param {any} base - the initial state
       * @param {Function} producer - function that receives a proxy of the base state as first argument and which can be freely modified
       * @param {Function} patchListener - optional function that will be called with all the patches produced here
       * @returns {any} a new state, or the initial state if nothing was modified
       */
    
    
      var _proto = Immer.prototype;
    
      _proto.produce = function produce(base, recipe, patchListener) {
        // curried invocation
        if (typeof base === "function" && typeof recipe !== "function") {
          var defaultBase = recipe;
          recipe = base;
          var self = this;
          return function curriedProduce(base) {
            var _this = this;
    
            if (base === void 0) {
              base = defaultBase;
            }
    
            for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              args[_key - 1] = arguments[_key];
            }
    
            return self.produce(base, function (draft) {
              var _recipe;
    
              return (_recipe = recipe).call.apply(_recipe, [_this, draft].concat(args));
            }); // prettier-ignore
          };
        }
    
        if (typeof recipe !== "function") die(6);
        if (patchListener !== undefined && typeof patchListener !== "function") die(7);
        var result; // Only plain objects, arrays, and "immerable classes" are drafted.
    
        if (isDraftable(base)) {
          var scope = enterScope(this);
          var proxy = createProxy(this, base, undefined);
          var hasError = true;
    
          try {
            result = recipe(proxy);
            hasError = false;
          } finally {
            // finally instead of catch + rethrow better preserves original stack
            if (hasError) revokeScope(scope);else leaveScope(scope);
          }
    
          if (typeof Promise !== "undefined" && result instanceof Promise) {
            return result.then(function (result) {
              usePatchesInScope(scope, patchListener);
              return processResult(result, scope);
            }, function (error) {
              revokeScope(scope);
              throw error;
            });
          }
    
          usePatchesInScope(scope, patchListener);
          return processResult(result, scope);
        } else if (!base || typeof base !== "object") {
          result = recipe(base);
          if (result === NOTHING) return undefined;
          if (result === undefined) result = base;
          if (this.autoFreeze_) freeze(result, true);
          return result;
        } else die(21, base);
      };
    
      _proto.produceWithPatches = function produceWithPatches(arg1, arg2, arg3) {
        var _this2 = this;
    
        if (typeof arg1 === "function") {
          return function (state) {
            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }
    
            return _this2.produceWithPatches(state, function (draft) {
              return arg1.apply(void 0, [draft].concat(args));
            });
          };
        }
    
        var patches, inversePatches;
        var nextState = this.produce(arg1, arg2, function (p, ip) {
          patches = p;
          inversePatches = ip;
        });
        return [nextState, patches, inversePatches];
      };
    
      _proto.createDraft = function createDraft(base) {
        if (!isDraftable(base)) die(8);
        if (isDraft(base)) base = current(base);
        var scope = enterScope(this);
        var proxy = createProxy(this, base, undefined);
        proxy[DRAFT_STATE].isManual_ = true;
        leaveScope(scope);
        return proxy;
      };
    
      _proto.finishDraft = function finishDraft(draft, patchListener) {
        var state = draft && draft[DRAFT_STATE];
    
        {
          if (!state || !state.isManual_) die(9);
          if (state.finalized_) die(10);
        }
    
        var scope = state.scope_;
        usePatchesInScope(scope, patchListener);
        return processResult(undefined, scope);
      }
      /**
       * Pass true to automatically freeze all copies created by Immer.
       *
       * By default, auto-freezing is disabled in production.
       */
      ;
    
      _proto.setAutoFreeze = function setAutoFreeze(value) {
        this.autoFreeze_ = value;
      }
      /**
       * Pass true to use the ES2015 `Proxy` class when creating drafts, which is
       * always faster than using ES5 proxies.
       *
       * By default, feature detection is used, so calling this is rarely necessary.
       */
      ;
    
      _proto.setUseProxies = function setUseProxies(value) {
        if (value && !hasProxies) {
          die(20);
        }
    
        this.useProxies_ = value;
      };
    
      _proto.applyPatches = function applyPatches(base, patches) {
        // If a patch replaces the entire state, take that replacement as base
        // before applying patches
        var i;
    
        for (i = patches.length - 1; i >= 0; i--) {
          var patch = patches[i];
    
          if (patch.path.length === 0 && patch.op === "replace") {
            base = patch.value;
            break;
          }
        }
    
        var applyPatchesImpl = getPlugin("Patches").applyPatches_;
    
        if (isDraft(base)) {
          // N.B: never hits if some patch a replacement, patches are never drafts
          return applyPatchesImpl(base, patches);
        } // Otherwise, produce a copy of the base state.
    
    
        return this.produce(base, function (draft) {
          return applyPatchesImpl(draft, patches.slice(i + 1));
        });
      };
    
      return Immer;
    }();
    function createProxy(immer, value, parent) {
      // precondition: createProxy should be guarded by isDraftable, so we know we can safely draft
      var draft = isMap(value) ? getPlugin("MapSet").proxyMap_(value, parent) : isSet(value) ? getPlugin("MapSet").proxySet_(value, parent) : immer.useProxies_ ? createProxyProxy(value, parent) : getPlugin("ES5").createES5Proxy_(value, parent);
      var scope = parent ? parent.scope_ : getCurrentScope();
      scope.drafts_.push(draft);
      return draft;
    }
    
    function current(value) {
      if (!isDraft(value)) die(22, value);
      return currentImpl(value);
    }
    
    function currentImpl(value) {
      if (!isDraftable(value)) return value;
      var state = value[DRAFT_STATE];
      var copy;
      var archType = getArchtype(value);
    
      if (state) {
        if (!state.modified_ && (state.type_ < 4 || !getPlugin("ES5").hasChanges_(state))) return state.base_; // Optimization: avoid generating new drafts during copying
    
        state.finalized_ = true;
        copy = copyHelper(value, archType);
        state.finalized_ = false;
      } else {
        copy = copyHelper(value, archType);
      }
    
      each(copy, function (key, childValue) {
        if (state && get(state.base_, key) === childValue) return; // no need to copy or search in something that didn't change
    
        set(copy, key, currentImpl(childValue));
      }); // In the future, we might consider freezing here, based on the current settings
    
      return archType === ArchtypeSet ? new Set(copy) : copy;
    }
    
    function copyHelper(value, archType) {
      // creates a shallow copy, even if it is a map or set
      switch (archType) {
        case ArchtypeMap:
          return new Map(value);
    
        case ArchtypeSet:
          // Set will be cloned as array temporarily, so that we can replace individual items
          return Array.from(value);
      }
    
      return shallowCopy(value);
    }
    
    function enableES5() {
      function willFinalizeES5_(scope, result, isReplaced) {
        if (!isReplaced) {
          if (scope.patches_) {
            markChangesRecursively(scope.drafts_[0]);
          } // This is faster when we don't care about which attributes changed.
    
    
          markChangesSweep(scope.drafts_);
        } // When a child draft is returned, look for changes.
        else if (isDraft(result) && result[DRAFT_STATE].scope_ === scope) {
            markChangesSweep(scope.drafts_);
          }
      }
    
      function createES5Draft(isArray, base) {
        if (isArray) {
          var draft = new Array(base.length);
    
          for (var i = 0; i < base.length; i++) {
            Object.defineProperty(draft, "" + i, proxyProperty(i, true));
          }
    
          return draft;
        } else {
          var _descriptors = getOwnPropertyDescriptors(base);
    
          delete _descriptors[DRAFT_STATE];
          var keys = ownKeys(_descriptors);
    
          for (var _i = 0; _i < keys.length; _i++) {
            var key = keys[_i];
            _descriptors[key] = proxyProperty(key, isArray || !!_descriptors[key].enumerable);
          }
    
          return Object.create(Object.getPrototypeOf(base), _descriptors);
        }
      }
    
      function createES5Proxy_(base, parent) {
        var isArray = Array.isArray(base);
        var draft = createES5Draft(isArray, base);
        var state = {
          type_: isArray ? ProxyTypeES5Array : ProxyTypeES5Object,
          scope_: parent ? parent.scope_ : getCurrentScope(),
          modified_: false,
          finalized_: false,
          assigned_: {},
          parent_: parent,
          // base is the object we are drafting
          base_: base,
          // draft is the draft object itself, that traps all reads and reads from either the base (if unmodified) or copy (if modified)
          draft_: draft,
          copy_: null,
          revoked_: false,
          isManual_: false
        };
        Object.defineProperty(draft, DRAFT_STATE, {
          value: state,
          // enumerable: false <- the default
          writable: true
        });
        return draft;
      } // property descriptors are recycled to make sure we don't create a get and set closure per property,
      // but share them all instead
    
    
      var descriptors = {};
    
      function proxyProperty(prop, enumerable) {
        var desc = descriptors[prop];
    
        if (desc) {
          desc.enumerable = enumerable;
        } else {
          descriptors[prop] = desc = {
            configurable: true,
            enumerable: enumerable,
            get: function get() {
              var state = this[DRAFT_STATE];
              assertUnrevoked(state); // @ts-ignore
    
              return objectTraps.get(state, prop);
            },
            set: function set(value) {
              var state = this[DRAFT_STATE];
              assertUnrevoked(state); // @ts-ignore
    
              objectTraps.set(state, prop, value);
            }
          };
        }
    
        return desc;
      } // This looks expensive, but only proxies are visited, and only objects without known changes are scanned.
    
    
      function markChangesSweep(drafts) {
        // The natural order of drafts in the `scope` array is based on when they
        // were accessed. By processing drafts in reverse natural order, we have a
        // better chance of processing leaf nodes first. When a leaf node is known to
        // have changed, we can avoid any traversal of its ancestor nodes.
        for (var i = drafts.length - 1; i >= 0; i--) {
          var state = drafts[i][DRAFT_STATE];
    
          if (!state.modified_) {
            switch (state.type_) {
              case ProxyTypeES5Array:
                if (hasArrayChanges(state)) markChanged(state);
                break;
    
              case ProxyTypeES5Object:
                if (hasObjectChanges(state)) markChanged(state);
                break;
            }
          }
        }
      }
    
      function markChangesRecursively(object) {
        if (!object || typeof object !== "object") return;
        var state = object[DRAFT_STATE];
        if (!state) return;
        var base_ = state.base_,
            draft_ = state.draft_,
            assigned_ = state.assigned_,
            type_ = state.type_;
    
        if (type_ === ProxyTypeES5Object) {
          // Look for added keys.
          // probably there is a faster way to detect changes, as sweep + recurse seems to do some
          // unnecessary work.
          // also: probably we can store the information we detect here, to speed up tree finalization!
          each(draft_, function (key) {
            if (key === DRAFT_STATE) return; // The `undefined` check is a fast path for pre-existing keys.
    
            if (base_[key] === undefined && !has(base_, key)) {
              assigned_[key] = true;
              markChanged(state);
            } else if (!assigned_[key]) {
              // Only untouched properties trigger recursion.
              markChangesRecursively(draft_[key]);
            }
          }); // Look for removed keys.
    
          each(base_, function (key) {
            // The `undefined` check is a fast path for pre-existing keys.
            if (draft_[key] === undefined && !has(draft_, key)) {
              assigned_[key] = false;
              markChanged(state);
            }
          });
        } else if (type_ === ProxyTypeES5Array) {
          if (hasArrayChanges(state)) {
            markChanged(state);
            assigned_.length = true;
          }
    
          if (draft_.length < base_.length) {
            for (var i = draft_.length; i < base_.length; i++) {
              assigned_[i] = false;
            }
          } else {
            for (var _i2 = base_.length; _i2 < draft_.length; _i2++) {
              assigned_[_i2] = true;
            }
          } // Minimum count is enough, the other parts has been processed.
    
    
          var min = Math.min(draft_.length, base_.length);
    
          for (var _i3 = 0; _i3 < min; _i3++) {
            // Only untouched indices trigger recursion.
            if (assigned_[_i3] === undefined) markChangesRecursively(draft_[_i3]);
          }
        }
      }
    
      function hasObjectChanges(state) {
        var base_ = state.base_,
            draft_ = state.draft_; // Search for added keys and changed keys. Start at the back, because
        // non-numeric keys are ordered by time of definition on the object.
    
        var keys = ownKeys(draft_);
    
        for (var i = keys.length - 1; i >= 0; i--) {
          var key = keys[i];
          if (key === DRAFT_STATE) continue;
          var baseValue = base_[key]; // The `undefined` check is a fast path for pre-existing keys.
    
          if (baseValue === undefined && !has(base_, key)) {
            return true;
          } // Once a base key is deleted, future changes go undetected, because its
          // descriptor is erased. This branch detects any missed changes.
          else {
              var value = draft_[key];
    
              var _state = value && value[DRAFT_STATE];
    
              if (_state ? _state.base_ !== baseValue : !is(value, baseValue)) {
                return true;
              }
            }
        } // At this point, no keys were added or changed.
        // Compare key count to determine if keys were deleted.
    
    
        var baseIsDraft = !!base_[DRAFT_STATE];
        return keys.length !== ownKeys(base_).length + (baseIsDraft ? 0 : 1); // + 1 to correct for DRAFT_STATE
      }
    
      function hasArrayChanges(state) {
        var draft_ = state.draft_;
        if (draft_.length !== state.base_.length) return true; // See #116
        // If we first shorten the length, our array interceptors will be removed.
        // If after that new items are added, result in the same original length,
        // those last items will have no intercepting property.
        // So if there is no own descriptor on the last position, we know that items were removed and added
        // N.B.: splice, unshift, etc only shift values around, but not prop descriptors, so we only have to check
        // the last one
    
        var descriptor = Object.getOwnPropertyDescriptor(draft_, draft_.length - 1); // descriptor can be null, but only for newly created sparse arrays, eg. new Array(10)
    
        if (descriptor && !descriptor.get) return true; // For all other cases, we don't have to compare, as they would have been picked up by the index setters
    
        return false;
      }
    
      function hasChanges_(state) {
        return state.type_ === ProxyTypeES5Object ? hasObjectChanges(state) : hasArrayChanges(state);
      }
    
      function assertUnrevoked(state
      /*ES5State | MapState | SetState*/
      ) {
        if (state.revoked_) die(3, JSON.stringify(latest(state)));
      }
    
      loadPlugin("ES5", {
        createES5Proxy_: createES5Proxy_,
        willFinalizeES5_: willFinalizeES5_,
        hasChanges_: hasChanges_
      });
    }
    
    function enablePatches() {
      var REPLACE = "replace";
      var ADD = "add";
      var REMOVE = "remove";
    
      function generatePatches_(state, basePath, patches, inversePatches) {
        switch (state.type_) {
          case ProxyTypeProxyObject:
          case ProxyTypeES5Object:
          case ProxyTypeMap:
            return generatePatchesFromAssigned(state, basePath, patches, inversePatches);
    
          case ProxyTypeES5Array:
          case ProxyTypeProxyArray:
            return generateArrayPatches(state, basePath, patches, inversePatches);
    
          case ProxyTypeSet:
            return generateSetPatches(state, basePath, patches, inversePatches);
        }
      }
    
      function generateArrayPatches(state, basePath, patches, inversePatches) {
        var base_ = state.base_,
            assigned_ = state.assigned_;
        var copy_ = state.copy_; // Reduce complexity by ensuring `base` is never longer.
    
        if (copy_.length < base_.length) {
          var _ref = [copy_, base_];
          base_ = _ref[0];
          copy_ = _ref[1];
          var _ref2 = [inversePatches, patches];
          patches = _ref2[0];
          inversePatches = _ref2[1];
        } // Process replaced indices.
    
    
        for (var i = 0; i < base_.length; i++) {
          if (assigned_[i] && copy_[i] !== base_[i]) {
            var path = basePath.concat([i]);
            patches.push({
              op: REPLACE,
              path: path,
              // Need to maybe clone it, as it can in fact be the original value
              // due to the base/copy inversion at the start of this function
              value: clonePatchValueIfNeeded(copy_[i])
            });
            inversePatches.push({
              op: REPLACE,
              path: path,
              value: clonePatchValueIfNeeded(base_[i])
            });
          }
        } // Process added indices.
    
    
        for (var _i = base_.length; _i < copy_.length; _i++) {
          var _path = basePath.concat([_i]);
    
          patches.push({
            op: ADD,
            path: _path,
            // Need to maybe clone it, as it can in fact be the original value
            // due to the base/copy inversion at the start of this function
            value: clonePatchValueIfNeeded(copy_[_i])
          });
        }
    
        if (base_.length < copy_.length) {
          inversePatches.push({
            op: REPLACE,
            path: basePath.concat(["length"]),
            value: base_.length
          });
        }
      } // This is used for both Map objects and normal objects.
    
    
      function generatePatchesFromAssigned(state, basePath, patches, inversePatches) {
        var base_ = state.base_,
            copy_ = state.copy_;
        each(state.assigned_, function (key, assignedValue) {
          var origValue = get(base_, key);
          var value = get(copy_, key);
          var op = !assignedValue ? REMOVE : has(base_, key) ? REPLACE : ADD;
          if (origValue === value && op === REPLACE) return;
          var path = basePath.concat(key);
          patches.push(op === REMOVE ? {
            op: op,
            path: path
          } : {
            op: op,
            path: path,
            value: value
          });
          inversePatches.push(op === ADD ? {
            op: REMOVE,
            path: path
          } : op === REMOVE ? {
            op: ADD,
            path: path,
            value: clonePatchValueIfNeeded(origValue)
          } : {
            op: REPLACE,
            path: path,
            value: clonePatchValueIfNeeded(origValue)
          });
        });
      }
    
      function generateSetPatches(state, basePath, patches, inversePatches) {
        var base_ = state.base_,
            copy_ = state.copy_;
        var i = 0;
        base_.forEach(function (value) {
          if (!copy_.has(value)) {
            var path = basePath.concat([i]);
            patches.push({
              op: REMOVE,
              path: path,
              value: value
            });
            inversePatches.unshift({
              op: ADD,
              path: path,
              value: value
            });
          }
    
          i++;
        });
        i = 0;
        copy_.forEach(function (value) {
          if (!base_.has(value)) {
            var path = basePath.concat([i]);
            patches.push({
              op: ADD,
              path: path,
              value: value
            });
            inversePatches.unshift({
              op: REMOVE,
              path: path,
              value: value
            });
          }
    
          i++;
        });
      }
    
      function generateReplacementPatches_(rootState, replacement, patches, inversePatches) {
        patches.push({
          op: REPLACE,
          path: [],
          value: replacement
        });
        inversePatches.push({
          op: REPLACE,
          path: [],
          value: rootState.base_
        });
      }
    
      function applyPatches_(draft, patches) {
        patches.forEach(function (patch) {
          var path = patch.path,
              op = patch.op;
          var base = draft;
    
          for (var i = 0; i < path.length - 1; i++) {
            base = get(base, path[i]);
            if (typeof base !== "object") die(15, path.join("/"));
          }
    
          var type = getArchtype(base);
          var value = deepClonePatchValue(patch.value); // used to clone patch to ensure original patch is not modified, see #411
    
          var key = path[path.length - 1];
    
          switch (op) {
            case REPLACE:
              switch (type) {
                case ArchtypeMap:
                  return base.set(key, value);
    
                /* istanbul ignore next */
    
                case ArchtypeSet:
                  die(16);
    
                default:
                  // if value is an object, then it's assigned by reference
                  // in the following add or remove ops, the value field inside the patch will also be modifyed
                  // so we use value from the cloned patch
                  // @ts-ignore
                  return base[key] = value;
              }
    
            case ADD:
              switch (type) {
                case ArchtypeArray:
                  return base.splice(key, 0, value);
    
                case ArchtypeMap:
                  return base.set(key, value);
    
                case ArchtypeSet:
                  return base.add(value);
    
                default:
                  return base[key] = value;
              }
    
            case REMOVE:
              switch (type) {
                case ArchtypeArray:
                  return base.splice(key, 1);
    
                case ArchtypeMap:
                  return base.delete(key);
    
                case ArchtypeSet:
                  return base.delete(patch.value);
    
                default:
                  return delete base[key];
              }
    
            default:
              die(17, op);
          }
        });
        return draft;
      }
    
      function deepClonePatchValue(obj) {
        if (!isDraftable(obj)) return obj;
        if (Array.isArray(obj)) return obj.map(deepClonePatchValue);
        if (isMap(obj)) return new Map(Array.from(obj.entries()).map(function (_ref3) {
          var k = _ref3[0],
              v = _ref3[1];
          return [k, deepClonePatchValue(v)];
        }));
        if (isSet(obj)) return new Set(Array.from(obj).map(deepClonePatchValue));
        var cloned = Object.create(Object.getPrototypeOf(obj));
    
        for (var key in obj) {
          cloned[key] = deepClonePatchValue(obj[key]);
        }
    
        return cloned;
      }
    
      function clonePatchValueIfNeeded(obj) {
        if (isDraft(obj)) {
          return deepClonePatchValue(obj);
        } else return obj;
      }
    
      loadPlugin("Patches", {
        applyPatches_: applyPatches_,
        generatePatches_: generatePatches_,
        generateReplacementPatches_: generateReplacementPatches_
      });
    }
    
    // types only!
    function enableMapSet() {
      /* istanbul ignore next */
      var _extendStatics = function extendStatics(d, b) {
        _extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function (d, b) {
          d.__proto__ = b;
        } || function (d, b) {
          for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
          }
        };
    
        return _extendStatics(d, b);
      }; // Ugly hack to resolve #502 and inherit built in Map / Set
    
    
      function __extends(d, b) {
        _extendStatics(d, b);
    
        function __() {
          this.constructor = d;
        }
    
        d.prototype = ( // @ts-ignore
        __.prototype = b.prototype, new __());
      }
    
      var DraftMap = function (_super) {
        __extends(DraftMap, _super); // Create class manually, cause #502
    
    
        function DraftMap(target, parent) {
          this[DRAFT_STATE] = {
            type_: ProxyTypeMap,
            parent_: parent,
            scope_: parent ? parent.scope_ : getCurrentScope(),
            modified_: false,
            finalized_: false,
            copy_: undefined,
            assigned_: undefined,
            base_: target,
            draft_: this,
            isManual_: false,
            revoked_: false
          };
          return this;
        }
    
        var p = DraftMap.prototype;
        Object.defineProperty(p, "size", {
          get: function get() {
            return latest(this[DRAFT_STATE]).size;
          } // enumerable: false,
          // configurable: true
    
        });
    
        p.has = function (key) {
          return latest(this[DRAFT_STATE]).has(key);
        };
    
        p.set = function (key, value) {
          var state = this[DRAFT_STATE];
          assertUnrevoked(state);
    
          if (!latest(state).has(key) || latest(state).get(key) !== value) {
            prepareMapCopy(state);
            markChanged(state);
            state.assigned_.set(key, true);
            state.copy_.set(key, value);
            state.assigned_.set(key, true);
          }
    
          return this;
        };
    
        p.delete = function (key) {
          if (!this.has(key)) {
            return false;
          }
    
          var state = this[DRAFT_STATE];
          assertUnrevoked(state);
          prepareMapCopy(state);
          markChanged(state);
          state.assigned_.set(key, false);
          state.copy_.delete(key);
          return true;
        };
    
        p.clear = function () {
          var state = this[DRAFT_STATE];
          assertUnrevoked(state);
    
          if (latest(state).size) {
            prepareMapCopy(state);
            markChanged(state);
            state.assigned_ = new Map();
            each(state.base_, function (key) {
              state.assigned_.set(key, false);
            });
            state.copy_.clear();
          }
        };
    
        p.forEach = function (cb, thisArg) {
          var _this = this;
    
          var state = this[DRAFT_STATE];
          latest(state).forEach(function (_value, key, _map) {
            cb.call(thisArg, _this.get(key), key, _this);
          });
        };
    
        p.get = function (key) {
          var state = this[DRAFT_STATE];
          assertUnrevoked(state);
          var value = latest(state).get(key);
    
          if (state.finalized_ || !isDraftable(value)) {
            return value;
          }
    
          if (value !== state.base_.get(key)) {
            return value; // either already drafted or reassigned
          } // despite what it looks, this creates a draft only once, see above condition
    
    
          var draft = createProxy(state.scope_.immer_, value, state);
          prepareMapCopy(state);
          state.copy_.set(key, draft);
          return draft;
        };
    
        p.keys = function () {
          return latest(this[DRAFT_STATE]).keys();
        };
    
        p.values = function () {
          var _this2 = this,
              _ref;
    
          var iterator = this.keys();
          return _ref = {}, _ref[iteratorSymbol] = function () {
            return _this2.values();
          }, _ref.next = function next() {
            var r = iterator.next();
            /* istanbul ignore next */
    
            if (r.done) return r;
    
            var value = _this2.get(r.value);
    
            return {
              done: false,
              value: value
            };
          }, _ref;
        };
    
        p.entries = function () {
          var _this3 = this,
              _ref2;
    
          var iterator = this.keys();
          return _ref2 = {}, _ref2[iteratorSymbol] = function () {
            return _this3.entries();
          }, _ref2.next = function next() {
            var r = iterator.next();
            /* istanbul ignore next */
    
            if (r.done) return r;
    
            var value = _this3.get(r.value);
    
            return {
              done: false,
              value: [r.value, value]
            };
          }, _ref2;
        };
    
        p[iteratorSymbol] = function () {
          return this.entries();
        };
    
        return DraftMap;
      }(Map);
    
      function proxyMap_(target, parent) {
        // @ts-ignore
        return new DraftMap(target, parent);
      }
    
      function prepareMapCopy(state) {
        if (!state.copy_) {
          state.assigned_ = new Map();
          state.copy_ = new Map(state.base_);
        }
      }
    
      var DraftSet = function (_super) {
        __extends(DraftSet, _super); // Create class manually, cause #502
    
    
        function DraftSet(target, parent) {
          this[DRAFT_STATE] = {
            type_: ProxyTypeSet,
            parent_: parent,
            scope_: parent ? parent.scope_ : getCurrentScope(),
            modified_: false,
            finalized_: false,
            copy_: undefined,
            base_: target,
            draft_: this,
            drafts_: new Map(),
            revoked_: false,
            isManual_: false
          };
          return this;
        }
    
        var p = DraftSet.prototype;
        Object.defineProperty(p, "size", {
          get: function get() {
            return latest(this[DRAFT_STATE]).size;
          } // enumerable: true,
    
        });
    
        p.has = function (value) {
          var state = this[DRAFT_STATE];
          assertUnrevoked(state); // bit of trickery here, to be able to recognize both the value, and the draft of its value
    
          if (!state.copy_) {
            return state.base_.has(value);
          }
    
          if (state.copy_.has(value)) return true;
          if (state.drafts_.has(value) && state.copy_.has(state.drafts_.get(value))) return true;
          return false;
        };
    
        p.add = function (value) {
          var state = this[DRAFT_STATE];
          assertUnrevoked(state);
    
          if (!this.has(value)) {
            prepareSetCopy(state);
            markChanged(state);
            state.copy_.add(value);
          }
    
          return this;
        };
    
        p.delete = function (value) {
          if (!this.has(value)) {
            return false;
          }
    
          var state = this[DRAFT_STATE];
          assertUnrevoked(state);
          prepareSetCopy(state);
          markChanged(state);
          return state.copy_.delete(value) || (state.drafts_.has(value) ? state.copy_.delete(state.drafts_.get(value)) :
          /* istanbul ignore next */
          false);
        };
    
        p.clear = function () {
          var state = this[DRAFT_STATE];
          assertUnrevoked(state);
    
          if (latest(state).size) {
            prepareSetCopy(state);
            markChanged(state);
            state.copy_.clear();
          }
        };
    
        p.values = function () {
          var state = this[DRAFT_STATE];
          assertUnrevoked(state);
          prepareSetCopy(state);
          return state.copy_.values();
        };
    
        p.entries = function entries() {
          var state = this[DRAFT_STATE];
          assertUnrevoked(state);
          prepareSetCopy(state);
          return state.copy_.entries();
        };
    
        p.keys = function () {
          return this.values();
        };
    
        p[iteratorSymbol] = function () {
          return this.values();
        };
    
        p.forEach = function forEach(cb, thisArg) {
          var iterator = this.values();
          var result = iterator.next();
    
          while (!result.done) {
            cb.call(thisArg, result.value, result.value, this);
            result = iterator.next();
          }
        };
    
        return DraftSet;
      }(Set);
    
      function proxySet_(target, parent) {
        // @ts-ignore
        return new DraftSet(target, parent);
      }
    
      function prepareSetCopy(state) {
        if (!state.copy_) {
          // create drafts for all entries to preserve insertion order
          state.copy_ = new Set();
          state.base_.forEach(function (value) {
            if (isDraftable(value)) {
              var draft = createProxy(state.scope_.immer_, value, state);
              state.drafts_.set(value, draft);
              state.copy_.add(draft);
            } else {
              state.copy_.add(value);
            }
          });
        }
      }
    
      function assertUnrevoked(state
      /*ES5State | MapState | SetState*/
      ) {
        if (state.revoked_) die(3, JSON.stringify(latest(state)));
      }
    
      loadPlugin("MapSet", {
        proxyMap_: proxyMap_,
        proxySet_: proxySet_
      });
    }
    
    function enableAllPlugins() {
      enableES5();
      enableMapSet();
      enablePatches();
    }
    
    var immer =
    /*#__PURE__*/
    new Immer();
    /**
     * The `produce` function takes a value and a "recipe function" (whose
     * return value often depends on the base state). The recipe function is
     * free to mutate its first argument however it wants. All mutations are
     * only ever applied to a __copy__ of the base state.
     *
     * Pass only a function to create a "curried producer" which relieves you
     * from passing the recipe function every time.
     *
     * Only plain objects and arrays are made mutable. All other objects are
     * considered uncopyable.
     *
     * Note: This function is __bound__ to its `Immer` instance.
     *
     * @param {any} base - the initial state
     * @param {Function} producer - function that receives a proxy of the base state as first argument and which can be freely modified
     * @param {Function} patchListener - optional function that will be called with all the patches produced here
     * @returns {any} a new state, or the initial state if nothing was modified
     */
    
    var produce = immer.produce;
    /**
     * Like `produce`, but `produceWithPatches` always returns a tuple
     * [nextState, patches, inversePatches] (instead of just the next state)
     */
    
    var produceWithPatches =
    /*#__PURE__*/
    immer.produceWithPatches.bind(immer);
    /**
     * Pass true to automatically freeze all copies created by Immer.
     *
     * By default, auto-freezing is disabled in production.
     */
    
    var setAutoFreeze =
    /*#__PURE__*/
    immer.setAutoFreeze.bind(immer);
    /**
     * Pass true to use the ES2015 `Proxy` class when creating drafts, which is
     * always faster than using ES5 proxies.
     *
     * By default, feature detection is used, so calling this is rarely necessary.
     */
    
    var setUseProxies =
    /*#__PURE__*/
    immer.setUseProxies.bind(immer);
    /**
     * Apply an array of Immer patches to the first argument.
     *
     * This function is a producer, which means copy-on-write is in effect.
     */
    
    var applyPatches =
    /*#__PURE__*/
    immer.applyPatches.bind(immer);
    /**
     * Create an Immer draft from the given base state, which may be a draft itself.
     * The draft can be modified until you finalize it with the `finishDraft` function.
     */
    
    var createDraft =
    /*#__PURE__*/
    immer.createDraft.bind(immer);
    /**
     * Finalize an Immer draft from a `createDraft` call, returning the base state
     * (if no changes were made) or a modified copy. The draft must *not* be
     * mutated afterwards.
     *
     * Pass a function as the 2nd argument to generate Immer patches based on the
     * changes that were made.
     */
    
    var finishDraft =
    /*#__PURE__*/
    immer.finishDraft.bind(immer);
    /**
     * This function is actually a no-op, but can be used to cast an immutable type
     * to an draft type and make TypeScript happy
     *
     * @param value
     */
    
    function castDraft(value) {
      return value;
    }
    /**
     * This function is actually a no-op, but can be used to cast a mutable type
     * to an immutable type and make TypeScript happy
     * @param value
     */
    
    function castImmutable(value) {
      return value;
    }
    
    exports.Immer = Immer;
    exports.applyPatches = applyPatches;
    exports.castDraft = castDraft;
    exports.castImmutable = castImmutable;
    exports.createDraft = createDraft;
    exports.current = current;
    exports.default = produce;
    exports.enableAllPlugins = enableAllPlugins;
    exports.enableES5 = enableES5;
    exports.enableMapSet = enableMapSet;
    exports.enablePatches = enablePatches;
    exports.finishDraft = finishDraft;
    exports.immerable = DRAFTABLE;
    exports.isDraft = isDraft;
    exports.isDraftable = isDraftable;
    exports.nothing = NOTHING;
    exports.original = original;
    exports.produce = produce;
    exports.produceWithPatches = produceWithPatches;
    exports.setAutoFreeze = setAutoFreeze;
    exports.setUseProxies = setUseProxies;
    
    
    },{}],5:[function(require,module,exports){
    function t(t){for(var n=arguments.length,r=Array(n>1?n-1:0),e=1;e<n;e++)r[e-1]=arguments[e];throw Error("[Immer] minified error nr: "+t+(r.length?" "+r.map((function(t){return"'"+t+"'"})).join(","):"")+". Find the full error at: https://bit.ly/3cXEKWf")}function n(t){return!!t&&!!t[H]}function r(t){return!!t&&(function(t){if(!t||"object"!=typeof t)return!1;var n=Object.getPrototypeOf(t);return!n||n===Object.prototype}(t)||Array.isArray(t)||!!t[G]||!!t.constructor[G]||c(t)||s(t))}function e(t,n,r){void 0===r&&(r=!1),0===i(t)?(r?Object.keys:Q)(t).forEach((function(e){r&&"symbol"==typeof e||n(e,t[e],t)})):t.forEach((function(r,e){return n(e,r,t)}))}function i(t){var n=t[H];return n?n.t>3?n.t-4:n.t:Array.isArray(t)?1:c(t)?2:s(t)?3:0}function u(t,n){return 2===i(t)?t.has(n):Object.prototype.hasOwnProperty.call(t,n)}function o(t,n){return 2===i(t)?t.get(n):t[n]}function f(t,n,r){var e=i(t);2===e?t.set(n,r):3===e?(t.delete(n),t.add(r)):t[n]=r}function a(t,n){return t===n?0!==t||1/t==1/n:t!=t&&n!=n}function c(t){return W&&t instanceof Map}function s(t){return X&&t instanceof Set}function v(t){return t.i||t.u}function p(t){if(Array.isArray(t))return Array.prototype.slice.call(t);var n=T(t);delete n[H];for(var r=Q(n),e=0;e<r.length;e++){var i=r[e],u=n[i];!1===u.writable&&(u.writable=!0,u.configurable=!0),(u.get||u.set)&&(n[i]={configurable:!0,writable:!0,enumerable:u.enumerable,value:t[i]})}return Object.create(Object.getPrototypeOf(t),n)}function l(t,u){d(t)||n(t)||!r(t)||(i(t)>1&&(t.set=t.add=t.clear=t.delete=h),Object.freeze(t),u&&e(t,(function(t,n){return l(n,!0)}),!0))}function h(){t(2)}function d(t){return null==t||"object"!=typeof t||Object.isFrozen(t)}function y(n){var r=U[n];return r||t(18,n),r}function _(t,n){U[t]||(U[t]=n)}function b(){return J}function m(t,n){n&&(y("Patches"),t.o=[],t.s=[],t.v=n)}function j(t){O(t),t.p.forEach(x),t.p=null}function O(t){t===J&&(J=t.l)}function w(t){return J={p:[],l:J,h:t,_:!0,m:0}}function x(t){var n=t[H];0===n.t||1===n.t?n.j():n.O=!0}function S(n,e){e.m=e.p.length;var i=e.p[0],u=void 0!==n&&n!==i;return e.h.S||y("ES5").M(e,n,u),u?(i[H].P&&(j(e),t(4)),r(n)&&(n=M(e,n),e.l||g(e,n)),e.o&&y("Patches").g(i[H],n,e.o,e.s)):n=M(e,i,[]),j(e),e.o&&e.v(e.o,e.s),n!==B?n:void 0}function M(t,n,r){if(d(n))return n;var i=n[H];if(!i)return e(n,(function(e,u){return P(t,i,n,e,u,r)}),!0),n;if(i.A!==t)return n;if(!i.P)return g(t,i.u,!0),i.u;if(!i.R){i.R=!0,i.A.m--;var u=4===i.t||5===i.t?i.i=p(i.k):i.i;e(3===i.t?new Set(u):u,(function(n,e){return P(t,i,u,n,e,r)})),g(t,u,!1),r&&t.o&&y("Patches").F(i,r,t.o,t.s)}return i.i}function P(t,e,i,o,a,c){if(n(a)){var s=M(t,a,c&&e&&3!==e.t&&!u(e.D,o)?c.concat(o):void 0);if(f(i,o,s),!n(s))return;t._=!1}if(r(a)&&!d(a)){if(!t.h.K&&t.m<1)return;M(t,a),e&&e.A.l||g(t,a)}}function g(t,n,r){void 0===r&&(r=!1),t.h.K&&t._&&l(n,r)}function A(t,n){var r=t[H];return(r?v(r):t)[n]}function z(t,n){if(n in t)for(var r=Object.getPrototypeOf(t);r;){var e=Object.getOwnPropertyDescriptor(r,n);if(e)return e;r=Object.getPrototypeOf(r)}}function E(t){t.P||(t.P=!0,t.l&&E(t.l))}function R(t){t.i||(t.i=p(t.u))}function k(t,n,r){var e=c(n)?y("MapSet").$(n,r):s(n)?y("MapSet").C(n,r):t.S?function(t,n){var r=Array.isArray(t),e={t:r?1:0,A:n?n.A:b(),P:!1,R:!1,D:{},l:n,u:t,k:null,i:null,j:null,I:!1},i=e,u=V;r&&(i=[e],u=Y);var o=Proxy.revocable(i,u),f=o.revoke,a=o.proxy;return e.k=a,e.j=f,a}(n,r):y("ES5").J(n,r);return(r?r.A:b()).p.push(e),e}function F(u){return n(u)||t(22,u),function t(n){if(!r(n))return n;var u,a=n[H],c=i(n);if(a){if(!a.P&&(a.t<4||!y("ES5").N(a)))return a.u;a.R=!0,u=D(n,c),a.R=!1}else u=D(n,c);return e(u,(function(n,r){a&&o(a.u,n)===r||f(u,n,t(r))})),3===c?new Set(u):u}(u)}function D(t,n){switch(n){case 2:return new Map(t);case 3:return Array.from(t)}return p(t)}function K(){function t(t,n){var r=f[t];return r?r.enumerable=n:f[t]=r={configurable:!0,enumerable:n,get:function(){return V.get(this[H],t)},set:function(n){V.set(this[H],t,n)}},r}function r(t){for(var n=t.length-1;n>=0;n--){var r=t[n][H];if(!r.P)switch(r.t){case 5:o(r)&&E(r);break;case 4:i(r)&&E(r)}}}function i(t){for(var n=t.u,r=t.k,e=Q(r),i=e.length-1;i>=0;i--){var o=e[i];if(o!==H){var f=n[o];if(void 0===f&&!u(n,o))return!0;var c=r[o],s=c&&c[H];if(s?s.u!==f:!a(c,f))return!0}}var v=!!n[H];return e.length!==Q(n).length+(v?0:1)}function o(t){var n=t.k;if(n.length!==t.u.length)return!0;var r=Object.getOwnPropertyDescriptor(n,n.length-1);return!(!r||r.get)}var f={};_("ES5",{J:function(n,r){var e=Array.isArray(n),i=function(n,r){if(n){for(var e=Array(r.length),i=0;i<r.length;i++)Object.defineProperty(e,""+i,t(i,!0));return e}var u=T(r);delete u[H];for(var o=Q(u),f=0;f<o.length;f++){var a=o[f];u[a]=t(a,n||!!u[a].enumerable)}return Object.create(Object.getPrototypeOf(r),u)}(e,n),u={t:e?5:4,A:r?r.A:b(),P:!1,R:!1,D:{},l:r,u:n,k:i,i:null,O:!1,I:!1};return Object.defineProperty(i,H,{value:u,writable:!0}),i},M:function(t,i,f){f?n(i)&&i[H].A===t&&r(t.p):(t.o&&function t(n){if(n&&"object"==typeof n){var r=n[H];if(r){var i=r.u,f=r.k,a=r.D,c=r.t;if(4===c)e(f,(function(n){n!==H&&(void 0!==i[n]||u(i,n)?a[n]||t(f[n]):(a[n]=!0,E(r)))})),e(i,(function(t){void 0!==f[t]||u(f,t)||(a[t]=!1,E(r))}));else if(5===c){if(o(r)&&(E(r),a.length=!0),f.length<i.length)for(var s=f.length;s<i.length;s++)a[s]=!1;else for(var v=i.length;v<f.length;v++)a[v]=!0;for(var p=Math.min(f.length,i.length),l=0;l<p;l++)void 0===a[l]&&t(f[l])}}}}(t.p[0]),r(t.p))},N:function(t){return 4===t.t?i(t):o(t)}})}function $(){function f(t){if(!r(t))return t;if(Array.isArray(t))return t.map(f);if(c(t))return new Map(Array.from(t.entries()).map((function(t){return[t[0],f(t[1])]})));if(s(t))return new Set(Array.from(t).map(f));var n=Object.create(Object.getPrototypeOf(t));for(var e in t)n[e]=f(t[e]);return n}function a(t){return n(t)?f(t):t}var v="add";_("Patches",{W:function(n,r){return r.forEach((function(r){for(var e=r.path,u=r.op,a=n,c=0;c<e.length-1;c++)"object"!=typeof(a=o(a,e[c]))&&t(15,e.join("/"));var s=i(a),p=f(r.value),l=e[e.length-1];switch(u){case"replace":switch(s){case 2:return a.set(l,p);case 3:t(16);default:return a[l]=p}case v:switch(s){case 1:return a.splice(l,0,p);case 2:return a.set(l,p);case 3:return a.add(p);default:return a[l]=p}case"remove":switch(s){case 1:return a.splice(l,1);case 2:return a.delete(l);case 3:return a.delete(r.value);default:return delete a[l]}default:t(17,u)}})),n},F:function(t,n,r,i){switch(t.t){case 0:case 4:case 2:return function(t,n,r,i){var f=t.u,c=t.i;e(t.D,(function(t,e){var s=o(f,t),p=o(c,t),l=e?u(f,t)?"replace":v:"remove";if(s!==p||"replace"!==l){var h=n.concat(t);r.push("remove"===l?{op:l,path:h}:{op:l,path:h,value:p}),i.push(l===v?{op:"remove",path:h}:"remove"===l?{op:v,path:h,value:a(s)}:{op:"replace",path:h,value:a(s)})}}))}(t,n,r,i);case 5:case 1:return function(t,n,r,e){var i=t.u,u=t.D,o=t.i;if(o.length<i.length){var f=[o,i];i=f[0],o=f[1];var c=[e,r];r=c[0],e=c[1]}for(var s=0;s<i.length;s++)if(u[s]&&o[s]!==i[s]){var p=n.concat([s]);r.push({op:"replace",path:p,value:a(o[s])}),e.push({op:"replace",path:p,value:a(i[s])})}for(var l=i.length;l<o.length;l++){var h=n.concat([l]);r.push({op:v,path:h,value:a(o[l])})}i.length<o.length&&e.push({op:"replace",path:n.concat(["length"]),value:i.length})}(t,n,r,i);case 3:return function(t,n,r,e){var i=t.u,u=t.i,o=0;i.forEach((function(t){if(!u.has(t)){var i=n.concat([o]);r.push({op:"remove",path:i,value:t}),e.unshift({op:v,path:i,value:t})}o++})),o=0,u.forEach((function(t){if(!i.has(t)){var u=n.concat([o]);r.push({op:v,path:u,value:t}),e.unshift({op:"remove",path:u,value:t})}o++}))}(t,n,r,i)}},g:function(t,n,r,e){r.push({op:"replace",path:[],value:n}),e.push({op:"replace",path:[],value:t.u})}})}function C(){function n(t,n){function r(){this.constructor=t}f(t,n),t.prototype=(r.prototype=n.prototype,new r)}function i(t){t.i||(t.D=new Map,t.i=new Map(t.u))}function u(t){t.i||(t.i=new Set,t.u.forEach((function(n){if(r(n)){var e=k(t.A.h,n,t);t.p.set(n,e),t.i.add(e)}else t.i.add(n)})))}function o(n){n.O&&t(3,JSON.stringify(v(n)))}var f=function(t,n){return(f=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var r in n)n.hasOwnProperty(r)&&(t[r]=n[r])})(t,n)},a=function(){function t(t,n){return this[H]={t:2,l:n,A:n?n.A:b(),P:!1,R:!1,i:void 0,D:void 0,u:t,k:this,I:!1,O:!1},this}n(t,Map);var u=t.prototype;return Object.defineProperty(u,"size",{get:function(){return v(this[H]).size}}),u.has=function(t){return v(this[H]).has(t)},u.set=function(t,n){var r=this[H];return o(r),v(r).has(t)&&v(r).get(t)===n||(i(r),E(r),r.D.set(t,!0),r.i.set(t,n),r.D.set(t,!0)),this},u.delete=function(t){if(!this.has(t))return!1;var n=this[H];return o(n),i(n),E(n),n.D.set(t,!1),n.i.delete(t),!0},u.clear=function(){var t=this[H];o(t),v(t).size&&(i(t),E(t),t.D=new Map,e(t.u,(function(n){t.D.set(n,!1)})),t.i.clear())},u.forEach=function(t,n){var r=this;v(this[H]).forEach((function(e,i){t.call(n,r.get(i),i,r)}))},u.get=function(t){var n=this[H];o(n);var e=v(n).get(t);if(n.R||!r(e))return e;if(e!==n.u.get(t))return e;var u=k(n.A.h,e,n);return i(n),n.i.set(t,u),u},u.keys=function(){return v(this[H]).keys()},u.values=function(){var t,n=this,r=this.keys();return(t={})[L]=function(){return n.values()},t.next=function(){var t=r.next();return t.done?t:{done:!1,value:n.get(t.value)}},t},u.entries=function(){var t,n=this,r=this.keys();return(t={})[L]=function(){return n.entries()},t.next=function(){var t=r.next();if(t.done)return t;var e=n.get(t.value);return{done:!1,value:[t.value,e]}},t},u[L]=function(){return this.entries()},t}(),c=function(){function t(t,n){return this[H]={t:3,l:n,A:n?n.A:b(),P:!1,R:!1,i:void 0,u:t,k:this,p:new Map,O:!1,I:!1},this}n(t,Set);var r=t.prototype;return Object.defineProperty(r,"size",{get:function(){return v(this[H]).size}}),r.has=function(t){var n=this[H];return o(n),n.i?!!n.i.has(t)||!(!n.p.has(t)||!n.i.has(n.p.get(t))):n.u.has(t)},r.add=function(t){var n=this[H];return o(n),this.has(t)||(u(n),E(n),n.i.add(t)),this},r.delete=function(t){if(!this.has(t))return!1;var n=this[H];return o(n),u(n),E(n),n.i.delete(t)||!!n.p.has(t)&&n.i.delete(n.p.get(t))},r.clear=function(){var t=this[H];o(t),v(t).size&&(u(t),E(t),t.i.clear())},r.values=function(){var t=this[H];return o(t),u(t),t.i.values()},r.entries=function(){var t=this[H];return o(t),u(t),t.i.entries()},r.keys=function(){return this.values()},r[L]=function(){return this.values()},r.forEach=function(t,n){for(var r=this.values(),e=r.next();!e.done;)t.call(n,e.value,e.value,this),e=r.next()},t}();_("MapSet",{$:function(t,n){return new a(t,n)},C:function(t,n){return new c(t,n)}})}var I;Object.defineProperty(exports,"__esModule",{value:!0});var J,N="undefined"!=typeof Symbol&&"symbol"==typeof Symbol("x"),W="undefined"!=typeof Map,X="undefined"!=typeof Set,q="undefined"!=typeof Proxy&&void 0!==Proxy.revocable&&"undefined"!=typeof Reflect,B=N?Symbol.for("immer-nothing"):((I={})["immer-nothing"]=!0,I),G=N?Symbol.for("immer-draftable"):"__$immer_draftable",H=N?Symbol.for("immer-state"):"__$immer_state",L="undefined"!=typeof Symbol&&Symbol.iterator||"@@iterator",Q="undefined"!=typeof Reflect&&Reflect.ownKeys?Reflect.ownKeys:void 0!==Object.getOwnPropertySymbols?function(t){return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))}:Object.getOwnPropertyNames,T=Object.getOwnPropertyDescriptors||function(t){var n={};return Q(t).forEach((function(r){n[r]=Object.getOwnPropertyDescriptor(t,r)})),n},U={},V={get:function(t,n){if(n===H)return t;var e=v(t);if(!u(e,n))return function(t,n,r){var e,i=z(n,r);return i?"value"in i?i.value:null===(e=i.get)||void 0===e?void 0:e.call(t.k):void 0}(t,e,n);var i=e[n];return t.R||!r(i)?i:i===A(t.u,n)?(R(t),t.i[n]=k(t.A.h,i,t)):i},has:function(t,n){return n in v(t)},ownKeys:function(t){return Reflect.ownKeys(v(t))},set:function(t,n,r){var e=z(v(t),n);if(null==e?void 0:e.set)return e.set.call(t.k,r),!0;if(!t.P){var i=A(v(t),n),o=null==i?void 0:i[H];if(o&&o.u===r)return t.i[n]=r,t.D[n]=!1,!0;if(a(r,i)&&(void 0!==r||u(t.u,n)))return!0;R(t),E(t)}return t.i[n]=r,t.D[n]=!0,!0},deleteProperty:function(t,n){return void 0!==A(t.u,n)||n in t.u?(t.D[n]=!1,R(t),E(t)):delete t.D[n],t.i&&delete t.i[n],!0},getOwnPropertyDescriptor:function(t,n){var r=v(t),e=Reflect.getOwnPropertyDescriptor(r,n);return e?{writable:!0,configurable:1!==t.t||"length"!==n,enumerable:e.enumerable,value:r[n]}:e},defineProperty:function(){t(11)},getPrototypeOf:function(t){return Object.getPrototypeOf(t.u)},setPrototypeOf:function(){t(12)}},Y={};e(V,(function(t,n){Y[t]=function(){return arguments[0]=arguments[0][0],n.apply(this,arguments)}})),Y.deleteProperty=function(t,n){return V.deleteProperty.call(this,t[0],n)},Y.set=function(t,n,r){return V.set.call(this,t[0],n,r,t[0])};var Z=function(){function e(t){this.S=q,this.K=!1,"boolean"==typeof(null==t?void 0:t.useProxies)&&this.setUseProxies(t.useProxies),"boolean"==typeof(null==t?void 0:t.autoFreeze)&&this.setAutoFreeze(t.autoFreeze),this.produce=this.produce.bind(this),this.produceWithPatches=this.produceWithPatches.bind(this)}var i=e.prototype;return i.produce=function(n,e,i){if("function"==typeof n&&"function"!=typeof e){var u=e;e=n;var o=this;return function(t){var n=this;void 0===t&&(t=u);for(var r=arguments.length,i=Array(r>1?r-1:0),f=1;f<r;f++)i[f-1]=arguments[f];return o.produce(t,(function(t){var r;return(r=e).call.apply(r,[n,t].concat(i))}))}}var f;if("function"!=typeof e&&t(6),void 0!==i&&"function"!=typeof i&&t(7),r(n)){var a=w(this),c=k(this,n,void 0),s=!0;try{f=e(c),s=!1}finally{s?j(a):O(a)}return"undefined"!=typeof Promise&&f instanceof Promise?f.then((function(t){return m(a,i),S(t,a)}),(function(t){throw j(a),t})):(m(a,i),S(f,a))}if(!n||"object"!=typeof n){if((f=e(n))===B)return;return void 0===f&&(f=n),this.K&&l(f,!0),f}t(21,n)},i.produceWithPatches=function(t,n){var r,e,i=this;return"function"==typeof t?function(n){for(var r=arguments.length,e=Array(r>1?r-1:0),u=1;u<r;u++)e[u-1]=arguments[u];return i.produceWithPatches(n,(function(n){return t.apply(void 0,[n].concat(e))}))}:[this.produce(t,n,(function(t,n){r=t,e=n})),r,e]},i.createDraft=function(e){r(e)||t(8),n(e)&&(e=F(e));var i=w(this),u=k(this,e,void 0);return u[H].I=!0,O(i),u},i.finishDraft=function(t,n){var r=(t&&t[H]).A;return m(r,n),S(void 0,r)},i.setAutoFreeze=function(t){this.K=t},i.setUseProxies=function(n){n&&!q&&t(20),this.S=n},i.applyPatches=function(t,r){var e;for(e=r.length-1;e>=0;e--){var i=r[e];if(0===i.path.length&&"replace"===i.op){t=i.value;break}}var u=y("Patches").W;return n(t)?u(t,r):this.produce(t,(function(t){return u(t,r.slice(e+1))}))},e}(),tt=new Z,nt=tt.produce,rt=tt.produceWithPatches.bind(tt),et=tt.setAutoFreeze.bind(tt),it=tt.setUseProxies.bind(tt),ut=tt.applyPatches.bind(tt),ot=tt.createDraft.bind(tt),ft=tt.finishDraft.bind(tt);exports.Immer=Z,exports.applyPatches=ut,exports.castDraft=function(t){return t},exports.castImmutable=function(t){return t},exports.createDraft=ot,exports.current=F,exports.default=nt,exports.enableAllPlugins=function(){K(),C(),$()},exports.enableES5=K,exports.enableMapSet=C,exports.enablePatches=$,exports.finishDraft=ft,exports.immerable=G,exports.isDraft=n,exports.isDraftable=r,exports.nothing=B,exports.original=function(r){return n(r)||t(23,r),r[H].u},exports.produce=nt,exports.produceWithPatches=rt,exports.setAutoFreeze=et,exports.setUseProxies=it;
    
    
    },{}],6:[function(require,module,exports){
    (function (process){(function (){
    
    'use strict'
    
    if (process.env.NODE_ENV === 'production') {
      module.exports = require('./immer.cjs.production.min.js')
    } else {
      module.exports = require('./immer.cjs.development.js')
    }
    
    }).call(this)}).call(this,require('_process'))
    },{"./immer.cjs.development.js":4,"./immer.cjs.production.min.js":5,"_process":9}],7:[function(require,module,exports){
    (function (process,global){(function (){
    (function (global, factory) {
      typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
      typeof define === 'function' && define.amd ? define(['exports'], factory) :
      (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.MockServiceWorker = {}));
    }(this, (function (exports) { 'use strict';
    
      var statuses = {
          "100": "Continue",
          "101": "Switching Protocols",
          "102": "Processing",
          "103": "Early Hints",
          "200": "OK",
          "201": "Created",
          "202": "Accepted",
          "203": "Non-Authoritative Information",
          "204": "No Content",
          "205": "Reset Content",
          "206": "Partial Content",
          "207": "Multi-Status",
          "208": "Already Reported",
          "226": "IM Used",
          "300": "Multiple Choices",
          "301": "Moved Permanently",
          "302": "Found",
          "303": "See Other",
          "304": "Not Modified",
          "305": "Use Proxy",
          "307": "Temporary Redirect",
          "308": "Permanent Redirect",
          "400": "Bad Request",
          "401": "Unauthorized",
          "402": "Payment Required",
          "403": "Forbidden",
          "404": "Not Found",
          "405": "Method Not Allowed",
          "406": "Not Acceptable",
          "407": "Proxy Authentication Required",
          "408": "Request Timeout",
          "409": "Conflict",
          "410": "Gone",
          "411": "Length Required",
          "412": "Precondition Failed",
          "413": "Payload Too Large",
          "414": "URI Too Long",
          "415": "Unsupported Media Type",
          "416": "Range Not Satisfiable",
          "417": "Expectation Failed",
          "418": "I'm a Teapot",
          "421": "Misdirected Request",
          "422": "Unprocessable Entity",
          "423": "Locked",
          "424": "Failed Dependency",
          "425": "Too Early",
          "426": "Upgrade Required",
          "428": "Precondition Required",
          "429": "Too Many Requests",
          "431": "Request Header Fields Too Large",
          "451": "Unavailable For Legal Reasons",
          "500": "Internal Server Error",
          "501": "Not Implemented",
          "502": "Bad Gateway",
          "503": "Service Unavailable",
          "504": "Gateway Timeout",
          "505": "HTTP Version Not Supported",
          "506": "Variant Also Negotiates",
          "507": "Insufficient Storage",
          "508": "Loop Detected",
          "509": "Bandwidth Limit Exceeded",
          "510": "Not Extended",
          "511": "Network Authentication Required"
      };
    
      const status = (statusCode, statusText) => {
          return (res) => {
              res.status = statusCode;
              res.statusText =
                  statusText || statuses[String(statusCode)];
              return res;
          };
      };
    
      var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};
    
      function createCommonjsModule(fn, basedir, module) {
          return module = {
              path: basedir,
              exports: {},
              require: function (path, base) {
                  return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
              }
          }, fn(module, module.exports), module.exports;
      }
    
      function commonjsRequire () {
          throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
      }
    
      var Headers_1 = createCommonjsModule(function (module, exports) {
      Object.defineProperty(exports, "__esModule", { value: true });
      var HEADERS_INVALID_CHARACTERS = /[^a-z0-9\-#$%&'*+.^_`|~]/i;
      var Headers = /** @class */ (function () {
          function Headers(headers) {
              var _this = this;
              this.map = {};
              if ((headers === null || headers === void 0 ? void 0 : headers.constructor.name) === 'Headers') {
                  headers.forEach(function (value, name) {
                      _this.append(name, value);
                  }, this);
              }
              else if (Array.isArray(headers)) {
                  headers.forEach(function (_a) {
                      var name = _a[0], value = _a[1];
                      _this.append(name, Array.isArray(value) ? value.join(', ') : value);
                  });
              }
              else if (headers) {
                  Object.getOwnPropertyNames(headers).forEach(function (name) {
                      _this.append(name, headers[name]);
                  });
              }
          }
          /**
           * Sets a new value for an existing header inside a `Headers` object, or adds the header if it does not already exist.
           */
          Headers.prototype.set = function (name, value) {
              this.map[this.normalizeName(name)] = this.normalizeValue(value);
          };
          /**
           * Appends a new value onto an existing header inside a `Headers` object, or adds the header if it does not already exist.
           */
          Headers.prototype.append = function (name, value) {
              name = this.normalizeName(name);
              value = this.normalizeValue(value);
              this.map[name] = this.has(name) ? this.map[name] + ", " + value : value;
          };
          /**
           * Deletes a header from the `Headers` object.
           */
          Headers.prototype.delete = function (name) {
              delete this.map[this.normalizeName(name)];
              return this;
          };
          /**
           * Returns a `ByteString` sequence of all the values of a header with a given name.
           */
          Headers.prototype.get = function (name) {
              return this.map[this.normalizeName(name)] || null;
          };
          /**
           * Returns the map of all headers in a `Headers` object.
           */
          Headers.prototype.getAllHeaders = function () {
              return this.map;
          };
          /**
           * Returns a boolean stating whether a `Headers` object contains a certain header.
           */
          Headers.prototype.has = function (name) {
              return this.map.hasOwnProperty(this.normalizeName(name));
          };
          Headers.prototype.forEach = function (callback, thisArg) {
              for (var name_1 in this.map) {
                  if (this.map.hasOwnProperty(name_1)) {
                      callback.call(thisArg, this.map[name_1], name_1, this);
                  }
              }
          };
          Headers.prototype.normalizeName = function (name) {
              if (typeof name !== 'string') {
                  name = String(name);
              }
              if (HEADERS_INVALID_CHARACTERS.test(name) || name.trim() === '') {
                  throw new TypeError('Invalid character in header field name');
              }
              return name.toLowerCase();
          };
          Headers.prototype.normalizeValue = function (value) {
              if (typeof value !== 'string') {
                  value = String(value);
              }
              return value;
          };
          return Headers;
      }());
      exports.Headers = Headers;
      });
    
      var headersToList_1 = createCommonjsModule(function (module, exports) {
      Object.defineProperty(exports, "__esModule", { value: true });
      function headersToList(headers) {
          var headersList = [];
          headers.forEach(function (value, name) {
              var resolvedValue = value.includes(',')
                  ? value.split(',').map(function (v) { return v.trim(); })
                  : value;
              headersList.push([name, resolvedValue]);
          });
          return headersList;
      }
      exports.headersToList = headersToList;
      });
    
      var headersToObject_1 = createCommonjsModule(function (module, exports) {
      Object.defineProperty(exports, "__esModule", { value: true });
      // List of headers that cannot have multiple values,
      // while potentially having a comma in their single value.
      var singleValueHeaders = ['user-agent'];
      /**
       * Converts a given `Headers` instance into a plain object.
       * Respects headers with multiple values.
       */
      function headersToObject(headers) {
          var headersObject = {};
          headers.forEach(function (value, name) {
              var isMultiValue = !singleValueHeaders.includes(name.toLowerCase()) && value.includes(',');
              headersObject[name] = isMultiValue
                  ? value.split(',').map(function (s) { return s.trim(); })
                  : value;
          });
          return headersObject;
      }
      exports.headersToObject = headersToObject;
      });
    
      var stringToHeaders_1 = createCommonjsModule(function (module, exports) {
      Object.defineProperty(exports, "__esModule", { value: true });
      /**
       * Converts a string representation of headers (i.e. from XMLHttpRequest)
       * to a new `Headers` instance.
       */
      function stringToHeaders(str) {
          var lines = str.trim().split(/[\r\n]+/);
          return lines.reduce(function (headers, line) {
              var parts = line.split(': ');
              var name = parts.shift();
              var value = parts.join(': ');
              headers.append(name, value);
              return headers;
          }, new Headers());
      }
      exports.stringToHeaders = stringToHeaders;
      });
    
      var listToHeaders_1 = createCommonjsModule(function (module, exports) {
      Object.defineProperty(exports, "__esModule", { value: true });
      function listToHeaders(list) {
          var headers = new Headers();
          list.forEach(function (_a) {
              var name = _a[0], value = _a[1];
              var values = [].concat(value);
              values.forEach(function (value) {
                  headers.append(name, value);
              });
          });
          return headers;
      }
      exports.listToHeaders = listToHeaders;
      });
    
      var reduceHeadersObject_1 = createCommonjsModule(function (module, exports) {
      Object.defineProperty(exports, "__esModule", { value: true });
      /**
       * Reduces given headers object instnace.
       */
      function reduceHeadersObject(headers, reducer, initialState) {
          return Object.keys(headers).reduce(function (nextHeaders, name) {
              return reducer(nextHeaders, name, headers[name]);
          }, initialState);
      }
      exports.reduceHeadersObject = reduceHeadersObject;
      });
    
      var objectToHeaders_1 = createCommonjsModule(function (module, exports) {
      Object.defineProperty(exports, "__esModule", { value: true });
    
      /**
       * Converts a given headers object to a new `Headers` instance.
       */
      function objectToHeaders(obj) {
          return reduceHeadersObject_1.reduceHeadersObject(obj, function (headers, name, value) {
              var values = [].concat(value);
              values.forEach(function (value) {
                  headers.append(name, value);
              });
              return headers;
          }, new Headers());
      }
      exports.objectToHeaders = objectToHeaders;
      });
    
      var flattenHeadersList_1 = createCommonjsModule(function (module, exports) {
      Object.defineProperty(exports, "__esModule", { value: true });
      function flattenHeadersList(list) {
          return list.map(function (_a) {
              var name = _a[0], values = _a[1];
              return [name, [].concat(values).join('; ')];
          });
      }
      exports.flattenHeadersList = flattenHeadersList;
      });
    
      var flattenHeadersObject_1 = createCommonjsModule(function (module, exports) {
      Object.defineProperty(exports, "__esModule", { value: true });
    
      function flattenHeadersObject(obj) {
          return reduceHeadersObject_1.reduceHeadersObject(obj, function (headers, name, value) {
              headers[name] = [].concat(value).join('; ');
              return headers;
          }, {});
      }
      exports.flattenHeadersObject = flattenHeadersObject;
      });
    
      var lib = createCommonjsModule(function (module, exports) {
      Object.defineProperty(exports, "__esModule", { value: true });
    
      exports.Headers = Headers_1.Headers;
    
      exports.headersToList = headersToList_1.headersToList;
    
      exports.headersToObject = headersToObject_1.headersToObject;
    
      exports.stringToHeaders = stringToHeaders_1.stringToHeaders;
    
      exports.listToHeaders = listToHeaders_1.listToHeaders;
    
      exports.objectToHeaders = objectToHeaders_1.objectToHeaders;
    
      exports.reduceHeadersObject = reduceHeadersObject_1.reduceHeadersObject;
    
      exports.flattenHeadersList = flattenHeadersList_1.flattenHeadersList;
    
      exports.flattenHeadersObject = flattenHeadersObject_1.flattenHeadersObject;
      });
    
      function set(...args) {
          return (res) => {
              const [name, value] = args;
              if (typeof name === 'string') {
                  res.headers.append(name, value);
              }
              else {
                  const headers = lib.objectToHeaders(name);
                  headers.forEach((value, name) => {
                      res.headers.append(name, value);
                  });
              }
              return res;
          };
      }
    
      /*!
       * cookie
       * Copyright(c) 2012-2014 Roman Shtylman
       * Copyright(c) 2015 Douglas Christopher Wilson
       * MIT Licensed
       */
    
      /**
       * Module exports.
       * @public
       */
    
      var parse_1 = parse;
      var serialize_1 = serialize;
    
      /**
       * Module variables.
       * @private
       */
    
      var decode = decodeURIComponent;
      var encode = encodeURIComponent;
      var pairSplitRegExp = /; */;
    
      /**
       * RegExp to match field-content in RFC 7230 sec 3.2
       *
       * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
       * field-vchar   = VCHAR / obs-text
       * obs-text      = %x80-FF
       */
    
      var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    
      /**
       * Parse a cookie header.
       *
       * Parse the given cookie header string into an object
       * The object has the various cookies as keys(names) => values
       *
       * @param {string} str
       * @param {object} [options]
       * @return {object}
       * @public
       */
    
      function parse(str, options) {
        if (typeof str !== 'string') {
          throw new TypeError('argument str must be a string');
        }
    
        var obj = {};
        var opt = options || {};
        var pairs = str.split(pairSplitRegExp);
        var dec = opt.decode || decode;
    
        for (var i = 0; i < pairs.length; i++) {
          var pair = pairs[i];
          var eq_idx = pair.indexOf('=');
    
          // skip things that don't look like key=value
          if (eq_idx < 0) {
            continue;
          }
    
          var key = pair.substr(0, eq_idx).trim();
          var val = pair.substr(++eq_idx, pair.length).trim();
    
          // quoted values
          if ('"' == val[0]) {
            val = val.slice(1, -1);
          }
    
          // only assign once
          if (undefined == obj[key]) {
            obj[key] = tryDecode(val, dec);
          }
        }
    
        return obj;
      }
    
      /**
       * Serialize data into a cookie header.
       *
       * Serialize the a name value pair into a cookie string suitable for
       * http headers. An optional options object specified cookie parameters.
       *
       * serialize('foo', 'bar', { httpOnly: true })
       *   => "foo=bar; httpOnly"
       *
       * @param {string} name
       * @param {string} val
       * @param {object} [options]
       * @return {string}
       * @public
       */
    
      function serialize(name, val, options) {
        var opt = options || {};
        var enc = opt.encode || encode;
    
        if (typeof enc !== 'function') {
          throw new TypeError('option encode is invalid');
        }
    
        if (!fieldContentRegExp.test(name)) {
          throw new TypeError('argument name is invalid');
        }
    
        var value = enc(val);
    
        if (value && !fieldContentRegExp.test(value)) {
          throw new TypeError('argument val is invalid');
        }
    
        var str = name + '=' + value;
    
        if (null != opt.maxAge) {
          var maxAge = opt.maxAge - 0;
    
          if (isNaN(maxAge) || !isFinite(maxAge)) {
            throw new TypeError('option maxAge is invalid')
          }
    
          str += '; Max-Age=' + Math.floor(maxAge);
        }
    
        if (opt.domain) {
          if (!fieldContentRegExp.test(opt.domain)) {
            throw new TypeError('option domain is invalid');
          }
    
          str += '; Domain=' + opt.domain;
        }
    
        if (opt.path) {
          if (!fieldContentRegExp.test(opt.path)) {
            throw new TypeError('option path is invalid');
          }
    
          str += '; Path=' + opt.path;
        }
    
        if (opt.expires) {
          if (typeof opt.expires.toUTCString !== 'function') {
            throw new TypeError('option expires is invalid');
          }
    
          str += '; Expires=' + opt.expires.toUTCString();
        }
    
        if (opt.httpOnly) {
          str += '; HttpOnly';
        }
    
        if (opt.secure) {
          str += '; Secure';
        }
    
        if (opt.sameSite) {
          var sameSite = typeof opt.sameSite === 'string'
            ? opt.sameSite.toLowerCase() : opt.sameSite;
    
          switch (sameSite) {
            case true:
              str += '; SameSite=Strict';
              break;
            case 'lax':
              str += '; SameSite=Lax';
              break;
            case 'strict':
              str += '; SameSite=Strict';
              break;
            case 'none':
              str += '; SameSite=None';
              break;
            default:
              throw new TypeError('option sameSite is invalid');
          }
        }
    
        return str;
      }
    
      /**
       * Try decoding a string using a decoding function.
       *
       * @param {string} str
       * @param {function} decode
       * @private
       */
    
      function tryDecode(str, decode) {
        try {
          return decode(str);
        } catch (e) {
          return str;
        }
      }
    
      /**
       * Sets a given cookie on the response.
       * @example
       * res(cookie('name', 'value'))
       */
      const cookie = (name, value, options) => {
          return (res) => {
              const serializedCookie = serialize_1(name, value, options);
              res.headers.set('Set-Cookie', serializedCookie);
              if (typeof document !== 'undefined') {
                  document.cookie = serializedCookie;
              }
              return res;
          };
      };
    
      /**
       * Sets the body of the response without any `Content-Type` header.
       * @example
       * res(body('message'))
       */
      const body = (value) => {
          return (res) => {
              res.body = value;
              return res;
          };
      };
    
      /**
       * Determines if the given value is an object.
       */
      function isObject(value) {
          return value != null && typeof value === 'object' && !Array.isArray(value);
      }
    
      /**
       * Deeply merges two given objects with the right one
       * having a priority during property assignment.
       */
      function mergeRight(left, right) {
          return Object.entries(right).reduce((result, [key, rightValue]) => {
              const leftValue = result[key];
              if (Array.isArray(leftValue) && Array.isArray(rightValue)) {
                  result[key] = leftValue.concat(rightValue);
                  return result;
              }
              if (isObject(leftValue) && isObject(rightValue)) {
                  result[key] = mergeRight(leftValue, rightValue);
                  return result;
              }
              result[key] = rightValue;
              return result;
          }, Object.assign({}, left));
      }
    
      /**
       * Sets the given value as the JSON body of the response.
       * @example
       * res(json({ key: 'value' }))
       * res(json('Some string'))
       * res(json([1, '2', false, { ok: true }]))
       */
      const json = (body, { merge = false } = {}) => {
          return (res) => {
              res.headers.set('Content-Type', 'application/json');
              res.body = merge ? mergeRight(res.body || {}, body) : body;
              return res;
          };
      };
    
      /**
       * Returns a GraphQL body payload.
       */
      const data = (payload) => {
          return json({ data: payload }, { merge: true });
      };
    
      /**
       * Returns a boolean indicating if the current process is running in NodeJS environment.
       * @see https://github.com/mswjs/msw/pull/255
       */
      function isNodeProcess() {
          // Check browser environment.
          if (typeof global !== 'object') {
              return false;
          }
          // Check nodejs or React Native environment.
          if (Object.prototype.toString.call(global.process) === '[object process]' ||
              navigator.product === 'ReactNative') {
              return true;
          }
      }
    
      const MIN_SERVER_RESPONSE_TIME = 100;
      const MAX_SERVER_RESPONSE_TIME = 400;
      const NODE_SERVER_RESPONSE_TIME = 5;
      const getRandomServerResponseTime = () => {
          if (isNodeProcess()) {
              return NODE_SERVER_RESPONSE_TIME;
          }
          return Math.floor(Math.random() * (MAX_SERVER_RESPONSE_TIME - MIN_SERVER_RESPONSE_TIME) +
              MIN_SERVER_RESPONSE_TIME);
      };
      /**
       * Delays the current response for the given duration (in ms)
       * @example
       * res(delay()) // realistic server response time
       * res(delay(1500)) // explicit response delay duration
       */
      const delay = (durationMs) => {
          return (res) => {
              res.delay = durationMs !== null && durationMs !== void 0 ? durationMs : getRandomServerResponseTime();
              return res;
          };
      };
    
      /**
       * Sets a given list of GraphQL errors on the mocked response.
       */
      const errors = (errorsList) => {
          if (errorsList == null) {
              return (res) => res;
          }
          return json({ errors: errorsList }, { merge: true });
      };
    
      const useFetch = isNodeProcess() ? require('node-fetch') : window.fetch;
      const augmentRequestInit = (requestInit) => {
          const headers = new lib.Headers(requestInit.headers);
          headers.set('x-msw-bypass', 'true');
          return Object.assign(Object.assign({}, requestInit), { headers: headers.getAllHeaders() });
      };
      const createFetchRequestParameters = (input) => {
          const { body, method } = input;
          const requestParameters = Object.assign(Object.assign({}, input), { body: undefined });
          if (['GET', 'HEAD'].includes(method)) {
              return requestParameters;
          }
          requestParameters.body =
              typeof body === 'object' ? JSON.stringify(body) : body;
          return requestParameters;
      };
      /**
       * Wrapper around the native `window.fetch()` function that performs
       * a request bypassing MSW. Requests performed using
       * this function will never be mocked.
       */
      const fetch = (input, requestInit = {}) => {
          // Keep the default `window.fetch()` call signature
          if (typeof input === 'string') {
              return useFetch(input, augmentRequestInit(requestInit));
          }
          const requestParameters = createFetchRequestParameters(input);
          const compliantRequest = augmentRequestInit(requestParameters);
          return useFetch(input.url.href, compliantRequest);
      };
    
      /**
       * Sets a given text as a "Cotent-Type: text/plain" body of the response.
       * @example
       * res(text('message'))
       */
      const text = (body) => {
          return (res) => {
              res.headers.set('Content-Type', 'text/plain');
              res.body = body;
              return res;
          };
      };
    
      /**
       * Sets the given XML as the body of the response.
       * @example
       * res(xml('<key>value</key>'))
       */
      const xml = (body) => {
          return (res) => {
              res.headers.set('Content-Type', 'text/xml');
              res.body = body;
              return res;
          };
      };
    
      var index = /*#__PURE__*/Object.freeze({
        __proto__: null,
        status: status,
        set: set,
        cookie: cookie,
        body: body,
        data: data,
        delay: delay,
        errors: errors,
        fetch: fetch,
        json: json,
        text: text,
        xml: xml
      });
    
      /*! *****************************************************************************
      Copyright (c) Microsoft Corporation. All rights reserved.
      Licensed under the Apache License, Version 2.0 (the "License"); you may not use
      this file except in compliance with the License. You may obtain a copy of the
      License at http://www.apache.org/licenses/LICENSE-2.0
    
      THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
      KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
      WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
      MERCHANTABLITY OR NON-INFRINGEMENT.
    
      See the Apache Version 2.0 License for specific language governing permissions
      and limitations under the License.
      ***************************************************************************** */
    
      function __awaiter(thisArg, _arguments, P, generator) {
          function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
          return new (P || (P = Promise))(function (resolve, reject) {
              function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
              function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
              function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
              step((generator = generator.apply(thisArg, _arguments || [])).next());
          });
      }
    
      var until = createCommonjsModule(function (module, exports) {
      Object.defineProperty(exports, "__esModule", { value: true });
      /**
       * Gracefully handles a given Promise factory.
       * @example
       * cosnt [error, data] = await until(() => asyncAction())
       */
      exports.until = async (promise) => {
          try {
              const data = await promise().catch((error) => {
                  throw error;
              });
              return [null, data];
          }
          catch (error) {
              return [error, null];
          }
      };
      });
    
      var lib$1 = createCommonjsModule(function (module, exports) {
      Object.defineProperty(exports, "__esModule", { value: true });
    
      exports.until = until.until;
      });
    
      /**
       * Attempts to resolve a Service Worker instance from a given registration,
       * regardless of its state (active, installing, waiting).
       */
      const getWorkerByRegistration = (registration, absoluteWorkerUrl, findWorker) => {
          const allStates = [
              registration.active,
              registration.installing,
              registration.waiting,
          ];
          const existingStates = allStates.filter(Boolean);
          const mockWorker = existingStates.find((worker) => {
              return findWorker(worker.scriptURL, absoluteWorkerUrl);
          });
          return mockWorker || null;
      };
    
      /**
       * Returns an absolute Service Worker URL based on the given
       * relative URL (known during the registration).
       */
      function getAbsoluteWorkerUrl(relativeUrl) {
          return new URL(relativeUrl, location.origin).href;
      }
    
      /**
       * Returns an active Service Worker instance.
       * When not found, registers a new Service Worker.
       */
      const getWorkerInstance = (url, options = {}, findWorker) => __awaiter(void 0, void 0, void 0, function* () {
          // Resolve the absolute Service Worker URL.
          const absoluteWorkerUrl = getAbsoluteWorkerUrl(url);
          const [, mockRegistrations] = yield lib$1.until(() => __awaiter(void 0, void 0, void 0, function* () {
              const registrations = yield navigator.serviceWorker.getRegistrations();
              return registrations.filter((registration) => {
                  return getWorkerByRegistration(registration, absoluteWorkerUrl, findWorker);
              });
          }));
          if (!navigator.serviceWorker.controller && mockRegistrations.length > 0) {
              // Reload the page when it has associated workers, but no active controller.
              // The absence of a controller can mean either:
              // - page has no Service Worker associated with it
              // - page has been hard-reloaded and its workers won't be used until the next reload.
              // Since we've checked that there are registrations associated with this page,
              // at this point we are sure it's hard reload that falls into this clause.
              location.reload();
          }
          const [existingRegistration] = mockRegistrations;
          if (existingRegistration) {
              // When the Service Worker is registered, update it and return the reference.
              return existingRegistration.update().then(() => {
                  return [
                      getWorkerByRegistration(existingRegistration, absoluteWorkerUrl, findWorker),
                      existingRegistration,
                  ];
              });
          }
          // When the Service Worker wasn't found, register it anew and return the reference.
          const [error, instance] = yield lib$1.until(() => __awaiter(void 0, void 0, void 0, function* () {
              const registration = yield navigator.serviceWorker.register(url, options);
              return [
                  // Compare existing worker registration by its worker URL,
                  // to prevent irrelevant workers to resolve here (such as Codesandbox worker).
                  getWorkerByRegistration(registration, absoluteWorkerUrl, findWorker),
                  registration,
              ];
          }));
          // Handle Service Worker registration errors.
          if (error) {
              const isWorkerMissing = error.message.includes('(404)');
              // Produce a custom error message when given a non-existing Service Worker url.
              // Suggest developers to check their setup.
              if (isWorkerMissing) {
                  const scopeUrl = new URL((options === null || options === void 0 ? void 0 : options.scope) || '/', location.href);
                  console.error(`\
    [MSW] Failed to register a Service Worker for scope ('${scopeUrl.href}') with script ('${absoluteWorkerUrl}'): Service Worker script does not exist at the given path.
    
    Did you forget to run "npx msw init <PUBLIC_DIR>"?
    
    Learn more about creating the Service Worker script: https://mswjs.io/docs/cli/init`);
                  return null;
              }
              // Fallback error message for any other registration errors.
              console.error(`[MSW] Failed to register a Service Worker:\n\m${error.message}`);
              return null;
          }
          return instance;
      });
    
      const activateMocking = (context, options) => __awaiter(void 0, void 0, void 0, function* () {
          var _a;
          (_a = context.worker) === null || _a === void 0 ? void 0 : _a.postMessage('MOCK_ACTIVATE');
          return context.events.once('MOCKING_ENABLED').then(() => {
              if (!(options === null || options === void 0 ? void 0 : options.quiet)) {
                  console.groupCollapsed('%c[MSW] Mocking enabled.', 'color:orangered;font-weight:bold;');
                  console.log('%cDocumentation: %chttps://mswjs.io/docs', 'font-weight:bold', 'font-weight:normal');
                  console.log('Found an issue? https://github.com/mswjs/msw/issues');
                  console.groupEnd();
              }
          });
      });
    
      /**
       * Creates a communication channel between the client
       * and the Service Worker associated with the given event.
       */
      const createBroadcastChannel = (event) => {
          const port = event.ports[0];
          return {
              /**
               * Sends a text message to the connected Service Worker.
               */
              send(message) {
                  if (port) {
                      port.postMessage(message);
                  }
              },
          };
      };
    
      const defaultContext = {
          status,
          set,
          delay,
          fetch,
      };
    
      /**
       * Composes a given list of functions into a new function that
       * executes from right to left.
       */
      function compose(...funcs) {
          return funcs.reduce((f, g) => (...args) => f(g(...args)));
      }
    
      class NetworkError extends Error {
          constructor(message) {
              super(message);
              this.name = 'NetworkError';
          }
      }
    
      /**
       * Internal response transformer to ensure response JSON body
       * is always stringified.
       */
      const stringifyJsonBody = (res) => {
          var _a, _b;
          if (res.body && ((_b = (_a = res.headers) === null || _a === void 0 ? void 0 : _a.get('content-type')) === null || _b === void 0 ? void 0 : _b.endsWith('json'))) {
              res.body = JSON.stringify(res.body);
          }
          return res;
      };
      const defaultResponse = {
          status: 200,
          statusText: 'OK',
          body: null,
          delay: 0,
          once: false,
      };
      const defaultResponseTransformers = [
          stringifyJsonBody,
      ];
      function createResponseComposition(responseOverrides, defaultTransformers = defaultResponseTransformers) {
          return (...transformers) => {
              const initialResponse = Object.assign({}, defaultResponse, {
                  headers: new lib.Headers({
                      'x-powered-by': 'msw',
                  }),
              }, responseOverrides);
              const resolvedTransformers = [
                  ...defaultTransformers,
                  ...transformers,
              ].filter(Boolean);
              const resolvedResponse = resolvedTransformers.length > 0
                  ? compose(...resolvedTransformers)(initialResponse)
                  : initialResponse;
              return resolvedResponse;
          };
      }
      const response = Object.assign(createResponseComposition(), {
          once: createResponseComposition({ once: true }),
          networkError(message) {
              throw new NetworkError(message);
          },
      });
    
      /**
       * Returns a mocked response for a given request using following request handlers.
       */
      const getResponse = (req, handlers) => __awaiter(void 0, void 0, void 0, function* () {
          const relevantHandlers = handlers
              .filter((requestHandler) => {
              // Skip a handler if it has been already used for a one-time response.
              return !requestHandler.shouldSkip;
          })
              .map((requestHandler) => {
              // Parse the captured request to get additional information.
              // Make the predicate function accept all the necessary information
              // to decide on the interception.
              const parsedRequest = requestHandler.parse
                  ? requestHandler.parse(req)
                  : null;
              return [requestHandler, parsedRequest];
          })
              .filter(([requestHandler, parsedRequest]) => {
              return requestHandler.predicate(req, parsedRequest);
          });
          if (relevantHandlers.length == 0) {
              // Handle a scenario when a request has no relevant request handlers.
              // In that case it would be bypassed (performed as-is).
              return {
                  handler: null,
                  response: null,
              };
          }
          const { requestHandler, parsedRequest, mockedResponse, publicRequest, } = yield relevantHandlers.reduce((asyncAcc, [requestHandler, parsedRequest]) => __awaiter(void 0, void 0, void 0, function* () {
              // Now the reduce function is async so we need to await if response was found
              const acc = yield asyncAcc;
              // If a first not empty response was found we'll stop evaluating other requests
              if (acc.requestHandler) {
                  return acc;
              }
              const { getPublicRequest, defineContext, resolver } = requestHandler;
              const publicRequest = getPublicRequest
                  ? getPublicRequest(req, parsedRequest)
                  : req;
              const context = defineContext
                  ? defineContext(publicRequest)
                  : defaultContext;
              const mockedResponse = yield resolver(publicRequest, response, context);
              if (!mockedResponse) {
                  return acc;
              }
              if (mockedResponse && mockedResponse.once) {
                  // When responded with a one-time response, match the relevant request handler
                  // as skipped, so it cannot affect the captured requests anymore.
                  requestHandler.shouldSkip = true;
              }
              return {
                  requestHandler,
                  parsedRequest,
                  mockedResponse,
                  publicRequest,
              };
          }), Promise.resolve({ mockedResponse: null }));
          // Although reducing a list of relevant request handlers, it's possible
          // that in the end there will be no handler associted with the request
          // (i.e. if relevant handlers are fall-through).
          if (!requestHandler) {
              return {
                  handler: null,
                  response: null,
              };
          }
          return {
              handler: requestHandler,
              response: mockedResponse,
              publicRequest,
              parsedRequest,
          };
      });
    
      var punycode = createCommonjsModule(function (module, exports) {
      (function(root) {
    
          /** Detect free variables */
          var freeExports =  exports &&
              !exports.nodeType && exports;
          var freeModule =  module &&
              !module.nodeType && module;
          var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal;
          if (
              freeGlobal.global === freeGlobal ||
              freeGlobal.window === freeGlobal ||
              freeGlobal.self === freeGlobal
          ) {
              root = freeGlobal;
          }
    
          /**
           * The `punycode` object.
           * @name punycode
           * @type Object
           */
          var punycode,
    
          /** Highest positive signed 32-bit float value */
          maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1
    
          /** Bootstring parameters */
          base = 36,
          tMin = 1,
          tMax = 26,
          skew = 38,
          damp = 700,
          initialBias = 72,
          initialN = 128, // 0x80
          delimiter = '-', // '\x2D'
    
          /** Regular expressions */
          regexPunycode = /^xn--/,
          regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
          regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators
    
          /** Error messages */
          errors = {
              'overflow': 'Overflow: input needs wider integers to process',
              'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
              'invalid-input': 'Invalid input'
          },
    
          /** Convenience shortcuts */
          baseMinusTMin = base - tMin,
          floor = Math.floor,
          stringFromCharCode = String.fromCharCode,
    
          /** Temporary variable */
          key;
    
          /*--------------------------------------------------------------------------*/
    
          /**
           * A generic error utility function.
           * @private
           * @param {String} type The error type.
           * @returns {Error} Throws a `RangeError` with the applicable error message.
           */
          function error(type) {
              throw RangeError(errors[type]);
          }
    
          /**
           * A generic `Array#map` utility function.
           * @private
           * @param {Array} array The array to iterate over.
           * @param {Function} callback The function that gets called for every array
           * item.
           * @returns {Array} A new array of values returned by the callback function.
           */
          function map(array, fn) {
              var length = array.length;
              var result = [];
              while (length--) {
                  result[length] = fn(array[length]);
              }
              return result;
          }
    
          /**
           * A simple `Array#map`-like wrapper to work with domain name strings or email
           * addresses.
           * @private
           * @param {String} domain The domain name or email address.
           * @param {Function} callback The function that gets called for every
           * character.
           * @returns {Array} A new string of characters returned by the callback
           * function.
           */
          function mapDomain(string, fn) {
              var parts = string.split('@');
              var result = '';
              if (parts.length > 1) {
                  // In email addresses, only the domain name should be punycoded. Leave
                  // the local part (i.e. everything up to `@`) intact.
                  result = parts[0] + '@';
                  string = parts[1];
              }
              // Avoid `split(regex)` for IE8 compatibility. See #17.
              string = string.replace(regexSeparators, '\x2E');
              var labels = string.split('.');
              var encoded = map(labels, fn).join('.');
              return result + encoded;
          }
    
          /**
           * Creates an array containing the numeric code points of each Unicode
           * character in the string. While JavaScript uses UCS-2 internally,
           * this function will convert a pair of surrogate halves (each of which
           * UCS-2 exposes as separate characters) into a single code point,
           * matching UTF-16.
           * @see `punycode.ucs2.encode`
           * @see <https://mathiasbynens.be/notes/javascript-encoding>
           * @memberOf punycode.ucs2
           * @name decode
           * @param {String} string The Unicode input string (UCS-2).
           * @returns {Array} The new array of code points.
           */
          function ucs2decode(string) {
              var output = [],
                  counter = 0,
                  length = string.length,
                  value,
                  extra;
              while (counter < length) {
                  value = string.charCodeAt(counter++);
                  if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
                      // high surrogate, and there is a next character
                      extra = string.charCodeAt(counter++);
                      if ((extra & 0xFC00) == 0xDC00) { // low surrogate
                          output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
                      } else {
                          // unmatched surrogate; only append this code unit, in case the next
                          // code unit is the high surrogate of a surrogate pair
                          output.push(value);
                          counter--;
                      }
                  } else {
                      output.push(value);
                  }
              }
              return output;
          }
    
          /**
           * Creates a string based on an array of numeric code points.
           * @see `punycode.ucs2.decode`
           * @memberOf punycode.ucs2
           * @name encode
           * @param {Array} codePoints The array of numeric code points.
           * @returns {String} The new Unicode string (UCS-2).
           */
          function ucs2encode(array) {
              return map(array, function(value) {
                  var output = '';
                  if (value > 0xFFFF) {
                      value -= 0x10000;
                      output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
                      value = 0xDC00 | value & 0x3FF;
                  }
                  output += stringFromCharCode(value);
                  return output;
              }).join('');
          }
    
          /**
           * Converts a basic code point into a digit/integer.
           * @see `digitToBasic()`
           * @private
           * @param {Number} codePoint The basic numeric code point value.
           * @returns {Number} The numeric value of a basic code point (for use in
           * representing integers) in the range `0` to `base - 1`, or `base` if
           * the code point does not represent a value.
           */
          function basicToDigit(codePoint) {
              if (codePoint - 48 < 10) {
                  return codePoint - 22;
              }
              if (codePoint - 65 < 26) {
                  return codePoint - 65;
              }
              if (codePoint - 97 < 26) {
                  return codePoint - 97;
              }
              return base;
          }
    
          /**
           * Converts a digit/integer into a basic code point.
           * @see `basicToDigit()`
           * @private
           * @param {Number} digit The numeric value of a basic code point.
           * @returns {Number} The basic code point whose value (when used for
           * representing integers) is `digit`, which needs to be in the range
           * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
           * used; else, the lowercase form is used. The behavior is undefined
           * if `flag` is non-zero and `digit` has no uppercase form.
           */
          function digitToBasic(digit, flag) {
              //  0..25 map to ASCII a..z or A..Z
              // 26..35 map to ASCII 0..9
              return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
          }
    
          /**
           * Bias adaptation function as per section 3.4 of RFC 3492.
           * http://tools.ietf.org/html/rfc3492#section-3.4
           * @private
           */
          function adapt(delta, numPoints, firstTime) {
              var k = 0;
              delta = firstTime ? floor(delta / damp) : delta >> 1;
              delta += floor(delta / numPoints);
              for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
                  delta = floor(delta / baseMinusTMin);
              }
              return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
          }
    
          /**
           * Converts a Punycode string of ASCII-only symbols to a string of Unicode
           * symbols.
           * @memberOf punycode
           * @param {String} input The Punycode string of ASCII-only symbols.
           * @returns {String} The resulting string of Unicode symbols.
           */
          function decode(input) {
              // Don't use UCS-2
              var output = [],
                  inputLength = input.length,
                  out,
                  i = 0,
                  n = initialN,
                  bias = initialBias,
                  basic,
                  j,
                  index,
                  oldi,
                  w,
                  k,
                  digit,
                  t,
                  /** Cached calculation results */
                  baseMinusT;
    
              // Handle the basic code points: let `basic` be the number of input code
              // points before the last delimiter, or `0` if there is none, then copy
              // the first basic code points to the output.
    
              basic = input.lastIndexOf(delimiter);
              if (basic < 0) {
                  basic = 0;
              }
    
              for (j = 0; j < basic; ++j) {
                  // if it's not a basic code point
                  if (input.charCodeAt(j) >= 0x80) {
                      error('not-basic');
                  }
                  output.push(input.charCodeAt(j));
              }
    
              // Main decoding loop: start just after the last delimiter if any basic code
              // points were copied; start at the beginning otherwise.
    
              for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {
    
                  // `index` is the index of the next character to be consumed.
                  // Decode a generalized variable-length integer into `delta`,
                  // which gets added to `i`. The overflow checking is easier
                  // if we increase `i` as we go, then subtract off its starting
                  // value at the end to obtain `delta`.
                  for (oldi = i, w = 1, k = base; /* no condition */; k += base) {
    
                      if (index >= inputLength) {
                          error('invalid-input');
                      }
    
                      digit = basicToDigit(input.charCodeAt(index++));
    
                      if (digit >= base || digit > floor((maxInt - i) / w)) {
                          error('overflow');
                      }
    
                      i += digit * w;
                      t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
    
                      if (digit < t) {
                          break;
                      }
    
                      baseMinusT = base - t;
                      if (w > floor(maxInt / baseMinusT)) {
                          error('overflow');
                      }
    
                      w *= baseMinusT;
    
                  }
    
                  out = output.length + 1;
                  bias = adapt(i - oldi, out, oldi == 0);
    
                  // `i` was supposed to wrap around from `out` to `0`,
                  // incrementing `n` each time, so we'll fix that now:
                  if (floor(i / out) > maxInt - n) {
                      error('overflow');
                  }
    
                  n += floor(i / out);
                  i %= out;
    
                  // Insert `n` at position `i` of the output
                  output.splice(i++, 0, n);
    
              }
    
              return ucs2encode(output);
          }
    
          /**
           * Converts a string of Unicode symbols (e.g. a domain name label) to a
           * Punycode string of ASCII-only symbols.
           * @memberOf punycode
           * @param {String} input The string of Unicode symbols.
           * @returns {String} The resulting Punycode string of ASCII-only symbols.
           */
          function encode(input) {
              var n,
                  delta,
                  handledCPCount,
                  basicLength,
                  bias,
                  j,
                  m,
                  q,
                  k,
                  t,
                  currentValue,
                  output = [],
                  /** `inputLength` will hold the number of code points in `input`. */
                  inputLength,
                  /** Cached calculation results */
                  handledCPCountPlusOne,
                  baseMinusT,
                  qMinusT;
    
              // Convert the input in UCS-2 to Unicode
              input = ucs2decode(input);
    
              // Cache the length
              inputLength = input.length;
    
              // Initialize the state
              n = initialN;
              delta = 0;
              bias = initialBias;
    
              // Handle the basic code points
              for (j = 0; j < inputLength; ++j) {
                  currentValue = input[j];
                  if (currentValue < 0x80) {
                      output.push(stringFromCharCode(currentValue));
                  }
              }
    
              handledCPCount = basicLength = output.length;
    
              // `handledCPCount` is the number of code points that have been handled;
              // `basicLength` is the number of basic code points.
    
              // Finish the basic string - if it is not empty - with a delimiter
              if (basicLength) {
                  output.push(delimiter);
              }
    
              // Main encoding loop:
              while (handledCPCount < inputLength) {
    
                  // All non-basic code points < n have been handled already. Find the next
                  // larger one:
                  for (m = maxInt, j = 0; j < inputLength; ++j) {
                      currentValue = input[j];
                      if (currentValue >= n && currentValue < m) {
                          m = currentValue;
                      }
                  }
    
                  // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
                  // but guard against overflow
                  handledCPCountPlusOne = handledCPCount + 1;
                  if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
                      error('overflow');
                  }
    
                  delta += (m - n) * handledCPCountPlusOne;
                  n = m;
    
                  for (j = 0; j < inputLength; ++j) {
                      currentValue = input[j];
    
                      if (currentValue < n && ++delta > maxInt) {
                          error('overflow');
                      }
    
                      if (currentValue == n) {
                          // Represent delta as a generalized variable-length integer
                          for (q = delta, k = base; /* no condition */; k += base) {
                              t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
                              if (q < t) {
                                  break;
                              }
                              qMinusT = q - t;
                              baseMinusT = base - t;
                              output.push(
                                  stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
                              );
                              q = floor(qMinusT / baseMinusT);
                          }
    
                          output.push(stringFromCharCode(digitToBasic(q, 0)));
                          bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
                          delta = 0;
                          ++handledCPCount;
                      }
                  }
    
                  ++delta;
                  ++n;
    
              }
              return output.join('');
          }
    
          /**
           * Converts a Punycode string representing a domain name or an email address
           * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
           * it doesn't matter if you call it on a string that has already been
           * converted to Unicode.
           * @memberOf punycode
           * @param {String} input The Punycoded domain name or email address to
           * convert to Unicode.
           * @returns {String} The Unicode representation of the given Punycode
           * string.
           */
          function toUnicode(input) {
              return mapDomain(input, function(string) {
                  return regexPunycode.test(string)
                      ? decode(string.slice(4).toLowerCase())
                      : string;
              });
          }
    
          /**
           * Converts a Unicode string representing a domain name or an email address to
           * Punycode. Only the non-ASCII parts of the domain name will be converted,
           * i.e. it doesn't matter if you call it with a domain that's already in
           * ASCII.
           * @memberOf punycode
           * @param {String} input The domain name or email address to convert, as a
           * Unicode string.
           * @returns {String} The Punycode representation of the given domain name or
           * email address.
           */
          function toASCII(input) {
              return mapDomain(input, function(string) {
                  return regexNonASCII.test(string)
                      ? 'xn--' + encode(string)
                      : string;
              });
          }
    
          /*--------------------------------------------------------------------------*/
    
          /** Define the public API */
          punycode = {
              /**
               * A string representing the current Punycode.js version number.
               * @memberOf punycode
               * @type String
               */
              'version': '1.3.2',
              /**
               * An object of methods to convert from JavaScript's internal character
               * representation (UCS-2) to Unicode code points, and back.
               * @see <https://mathiasbynens.be/notes/javascript-encoding>
               * @memberOf punycode
               * @type Object
               */
              'ucs2': {
                  'decode': ucs2decode,
                  'encode': ucs2encode
              },
              'decode': decode,
              'encode': encode,
              'toASCII': toASCII,
              'toUnicode': toUnicode
          };
    
          /** Expose `punycode` */
          // Some AMD build optimizers, like r.js, check for specific condition patterns
          // like the following:
          if (freeExports && freeModule) {
              if (module.exports == freeExports) { // in Node.js or RingoJS v0.8.0+
                  freeModule.exports = punycode;
              } else { // in Narwhal or RingoJS v0.7.0-
                  for (key in punycode) {
                      punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
                  }
              }
          } else { // in Rhino or a web browser
              root.punycode = punycode;
          }
    
      }(commonjsGlobal));
      });
    
      var util = {
        isString: function(arg) {
          return typeof(arg) === 'string';
        },
        isObject: function(arg) {
          return typeof(arg) === 'object' && arg !== null;
        },
        isNull: function(arg) {
          return arg === null;
        },
        isNullOrUndefined: function(arg) {
          return arg == null;
        }
      };
    
      // Copyright Joyent, Inc. and other Node contributors.
    
      // If obj.hasOwnProperty has been overridden, then calling
      // obj.hasOwnProperty(prop) will break.
      // See: https://github.com/joyent/node/issues/1707
      function hasOwnProperty(obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
      }
    
      var decode$1 = function(qs, sep, eq, options) {
        sep = sep || '&';
        eq = eq || '=';
        var obj = {};
    
        if (typeof qs !== 'string' || qs.length === 0) {
          return obj;
        }
    
        var regexp = /\+/g;
        qs = qs.split(sep);
    
        var maxKeys = 1000;
        if (options && typeof options.maxKeys === 'number') {
          maxKeys = options.maxKeys;
        }
    
        var len = qs.length;
        // maxKeys <= 0 means that we should not limit keys count
        if (maxKeys > 0 && len > maxKeys) {
          len = maxKeys;
        }
    
        for (var i = 0; i < len; ++i) {
          var x = qs[i].replace(regexp, '%20'),
              idx = x.indexOf(eq),
              kstr, vstr, k, v;
    
          if (idx >= 0) {
            kstr = x.substr(0, idx);
            vstr = x.substr(idx + 1);
          } else {
            kstr = x;
            vstr = '';
          }
    
          k = decodeURIComponent(kstr);
          v = decodeURIComponent(vstr);
    
          if (!hasOwnProperty(obj, k)) {
            obj[k] = v;
          } else if (Array.isArray(obj[k])) {
            obj[k].push(v);
          } else {
            obj[k] = [obj[k], v];
          }
        }
    
        return obj;
      };
    
      // Copyright Joyent, Inc. and other Node contributors.
    
      var stringifyPrimitive = function(v) {
        switch (typeof v) {
          case 'string':
            return v;
    
          case 'boolean':
            return v ? 'true' : 'false';
    
          case 'number':
            return isFinite(v) ? v : '';
    
          default:
            return '';
        }
      };
    
      var encode$1 = function(obj, sep, eq, name) {
        sep = sep || '&';
        eq = eq || '=';
        if (obj === null) {
          obj = undefined;
        }
    
        if (typeof obj === 'object') {
          return Object.keys(obj).map(function(k) {
            var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
            if (Array.isArray(obj[k])) {
              return obj[k].map(function(v) {
                return ks + encodeURIComponent(stringifyPrimitive(v));
              }).join(sep);
            } else {
              return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
            }
          }).join(sep);
    
        }
    
        if (!name) return '';
        return encodeURIComponent(stringifyPrimitive(name)) + eq +
               encodeURIComponent(stringifyPrimitive(obj));
      };
    
      var querystring = createCommonjsModule(function (module, exports) {
    
      exports.decode = exports.parse = decode$1;
      exports.encode = exports.stringify = encode$1;
      });
    
      var format = urlFormat;
    
      function Url() {
        this.protocol = null;
        this.slashes = null;
        this.auth = null;
        this.host = null;
        this.port = null;
        this.hostname = null;
        this.hash = null;
        this.search = null;
        this.query = null;
        this.pathname = null;
        this.path = null;
        this.href = null;
      }
    
      // Reference: RFC 3986, RFC 1808, RFC 2396
    
      // define these here so at least they only have to be
      // compiled once on the first module load.
      var protocolPattern = /^([a-z0-9.+-]+:)/i,
          portPattern = /:[0-9]*$/,
    
          // Special case for a simple path URL
          simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
    
          // RFC 2396: characters reserved for delimiting URLs.
          // We actually just auto-escape these.
          delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],
    
          // RFC 2396: characters not allowed for various reasons.
          unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),
    
          // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
          autoEscape = ['\''].concat(unwise),
          // Characters that are never ever allowed in a hostname.
          // Note that any invalid chars are also handled, but these
          // are the ones that are *expected* to be seen, so we fast-path
          // them.
          nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
          hostEndingChars = ['/', '?', '#'],
          hostnameMaxLen = 255,
          hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
          hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
          // protocols that can allow "unsafe" and "unwise" chars.
          unsafeProtocol = {
            'javascript': true,
            'javascript:': true
          },
          // protocols that never have a hostname.
          hostlessProtocol = {
            'javascript': true,
            'javascript:': true
          },
          // protocols that always contain a // bit.
          slashedProtocol = {
            'http': true,
            'https': true,
            'ftp': true,
            'gopher': true,
            'file': true,
            'http:': true,
            'https:': true,
            'ftp:': true,
            'gopher:': true,
            'file:': true
          };
    
      function urlParse(url, parseQueryString, slashesDenoteHost) {
        if (url && util.isObject(url) && url instanceof Url) return url;
    
        var u = new Url;
        u.parse(url, parseQueryString, slashesDenoteHost);
        return u;
      }
    
      Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
        if (!util.isString(url)) {
          throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
        }
    
        // Copy chrome, IE, opera backslash-handling behavior.
        // Back slashes before the query string get converted to forward slashes
        // See: https://code.google.com/p/chromium/issues/detail?id=25916
        var queryIndex = url.indexOf('?'),
            splitter =
                (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
            uSplit = url.split(splitter),
            slashRegex = /\\/g;
        uSplit[0] = uSplit[0].replace(slashRegex, '/');
        url = uSplit.join(splitter);
    
        var rest = url;
    
        // trim before proceeding.
        // This is to support parse stuff like "  http://foo.com  \n"
        rest = rest.trim();
    
        if (!slashesDenoteHost && url.split('#').length === 1) {
          // Try fast path regexp
          var simplePath = simplePathPattern.exec(rest);
          if (simplePath) {
            this.path = rest;
            this.href = rest;
            this.pathname = simplePath[1];
            if (simplePath[2]) {
              this.search = simplePath[2];
              if (parseQueryString) {
                this.query = querystring.parse(this.search.substr(1));
              } else {
                this.query = this.search.substr(1);
              }
            } else if (parseQueryString) {
              this.search = '';
              this.query = {};
            }
            return this;
          }
        }
    
        var proto = protocolPattern.exec(rest);
        if (proto) {
          proto = proto[0];
          var lowerProto = proto.toLowerCase();
          this.protocol = lowerProto;
          rest = rest.substr(proto.length);
        }
    
        // figure out if it's got a host
        // user@server is *always* interpreted as a hostname, and url
        // resolution will treat //foo/bar as host=foo,path=bar because that's
        // how the browser resolves relative URLs.
        if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
          var slashes = rest.substr(0, 2) === '//';
          if (slashes && !(proto && hostlessProtocol[proto])) {
            rest = rest.substr(2);
            this.slashes = true;
          }
        }
    
        if (!hostlessProtocol[proto] &&
            (slashes || (proto && !slashedProtocol[proto]))) {
    
          // there's a hostname.
          // the first instance of /, ?, ;, or # ends the host.
          //
          // If there is an @ in the hostname, then non-host chars *are* allowed
          // to the left of the last @ sign, unless some host-ending character
          // comes *before* the @-sign.
          // URLs are obnoxious.
          //
          // ex:
          // http://a@b@c/ => user:a@b host:c
          // http://a@b?@c => user:a host:c path:/?@c
    
          // v0.12 TODO(isaacs): This is not quite how Chrome does things.
          // Review our test case against browsers more comprehensively.
    
          // find the first instance of any hostEndingChars
          var hostEnd = -1;
          for (var i = 0; i < hostEndingChars.length; i++) {
            var hec = rest.indexOf(hostEndingChars[i]);
            if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
              hostEnd = hec;
          }
    
          // at this point, either we have an explicit point where the
          // auth portion cannot go past, or the last @ char is the decider.
          var auth, atSign;
          if (hostEnd === -1) {
            // atSign can be anywhere.
            atSign = rest.lastIndexOf('@');
          } else {
            // atSign must be in auth portion.
            // http://a@b/c@d => host:b auth:a path:/c@d
            atSign = rest.lastIndexOf('@', hostEnd);
          }
    
          // Now we have a portion which is definitely the auth.
          // Pull that off.
          if (atSign !== -1) {
            auth = rest.slice(0, atSign);
            rest = rest.slice(atSign + 1);
            this.auth = decodeURIComponent(auth);
          }
    
          // the host is the remaining to the left of the first non-host char
          hostEnd = -1;
          for (var i = 0; i < nonHostChars.length; i++) {
            var hec = rest.indexOf(nonHostChars[i]);
            if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
              hostEnd = hec;
          }
          // if we still have not hit it, then the entire thing is a host.
          if (hostEnd === -1)
            hostEnd = rest.length;
    
          this.host = rest.slice(0, hostEnd);
          rest = rest.slice(hostEnd);
    
          // pull out port.
          this.parseHost();
    
          // we've indicated that there is a hostname,
          // so even if it's empty, it has to be present.
          this.hostname = this.hostname || '';
    
          // if hostname begins with [ and ends with ]
          // assume that it's an IPv6 address.
          var ipv6Hostname = this.hostname[0] === '[' &&
              this.hostname[this.hostname.length - 1] === ']';
    
          // validate a little.
          if (!ipv6Hostname) {
            var hostparts = this.hostname.split(/\./);
            for (var i = 0, l = hostparts.length; i < l; i++) {
              var part = hostparts[i];
              if (!part) continue;
              if (!part.match(hostnamePartPattern)) {
                var newpart = '';
                for (var j = 0, k = part.length; j < k; j++) {
                  if (part.charCodeAt(j) > 127) {
                    // we replace non-ASCII char with a temporary placeholder
                    // we need this to make sure size of hostname is not
                    // broken by replacing non-ASCII by nothing
                    newpart += 'x';
                  } else {
                    newpart += part[j];
                  }
                }
                // we test again with ASCII char only
                if (!newpart.match(hostnamePartPattern)) {
                  var validParts = hostparts.slice(0, i);
                  var notHost = hostparts.slice(i + 1);
                  var bit = part.match(hostnamePartStart);
                  if (bit) {
                    validParts.push(bit[1]);
                    notHost.unshift(bit[2]);
                  }
                  if (notHost.length) {
                    rest = '/' + notHost.join('.') + rest;
                  }
                  this.hostname = validParts.join('.');
                  break;
                }
              }
            }
          }
    
          if (this.hostname.length > hostnameMaxLen) {
            this.hostname = '';
          } else {
            // hostnames are always lower case.
            this.hostname = this.hostname.toLowerCase();
          }
    
          if (!ipv6Hostname) {
            // IDNA Support: Returns a punycoded representation of "domain".
            // It only converts parts of the domain name that
            // have non-ASCII characters, i.e. it doesn't matter if
            // you call it with a domain that already is ASCII-only.
            this.hostname = punycode.toASCII(this.hostname);
          }
    
          var p = this.port ? ':' + this.port : '';
          var h = this.hostname || '';
          this.host = h + p;
          this.href += this.host;
    
          // strip [ and ] from the hostname
          // the host field still retains them, though
          if (ipv6Hostname) {
            this.hostname = this.hostname.substr(1, this.hostname.length - 2);
            if (rest[0] !== '/') {
              rest = '/' + rest;
            }
          }
        }
    
        // now rest is set to the post-host stuff.
        // chop off any delim chars.
        if (!unsafeProtocol[lowerProto]) {
    
          // First, make 100% sure that any "autoEscape" chars get
          // escaped, even if encodeURIComponent doesn't think they
          // need to be.
          for (var i = 0, l = autoEscape.length; i < l; i++) {
            var ae = autoEscape[i];
            if (rest.indexOf(ae) === -1)
              continue;
            var esc = encodeURIComponent(ae);
            if (esc === ae) {
              esc = escape(ae);
            }
            rest = rest.split(ae).join(esc);
          }
        }
    
    
        // chop off from the tail first.
        var hash = rest.indexOf('#');
        if (hash !== -1) {
          // got a fragment string.
          this.hash = rest.substr(hash);
          rest = rest.slice(0, hash);
        }
        var qm = rest.indexOf('?');
        if (qm !== -1) {
          this.search = rest.substr(qm);
          this.query = rest.substr(qm + 1);
          if (parseQueryString) {
            this.query = querystring.parse(this.query);
          }
          rest = rest.slice(0, qm);
        } else if (parseQueryString) {
          // no query string, but parseQueryString still requested
          this.search = '';
          this.query = {};
        }
        if (rest) this.pathname = rest;
        if (slashedProtocol[lowerProto] &&
            this.hostname && !this.pathname) {
          this.pathname = '/';
        }
    
        //to support http.request
        if (this.pathname || this.search) {
          var p = this.pathname || '';
          var s = this.search || '';
          this.path = p + s;
        }
    
        // finally, reconstruct the href based on what has been validated.
        this.href = this.format();
        return this;
      };
    
      // format a parsed object into a url string
      function urlFormat(obj) {
        // ensure it's an object, and not a string url.
        // If it's an obj, this is a no-op.
        // this way, you can call url_format() on strings
        // to clean up potentially wonky urls.
        if (util.isString(obj)) obj = urlParse(obj);
        if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
        return obj.format();
      }
    
      Url.prototype.format = function() {
        var auth = this.auth || '';
        if (auth) {
          auth = encodeURIComponent(auth);
          auth = auth.replace(/%3A/i, ':');
          auth += '@';
        }
    
        var protocol = this.protocol || '',
            pathname = this.pathname || '',
            hash = this.hash || '',
            host = false,
            query = '';
    
        if (this.host) {
          host = auth + this.host;
        } else if (this.hostname) {
          host = auth + (this.hostname.indexOf(':') === -1 ?
              this.hostname :
              '[' + this.hostname + ']');
          if (this.port) {
            host += ':' + this.port;
          }
        }
    
        if (this.query &&
            util.isObject(this.query) &&
            Object.keys(this.query).length) {
          query = querystring.stringify(this.query);
        }
    
        var search = this.search || (query && ('?' + query)) || '';
    
        if (protocol && protocol.substr(-1) !== ':') protocol += ':';
    
        // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
        // unless they had them to begin with.
        if (this.slashes ||
            (!protocol || slashedProtocol[protocol]) && host !== false) {
          host = '//' + (host || '');
          if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
        } else if (!host) {
          host = '';
        }
    
        if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
        if (search && search.charAt(0) !== '?') search = '?' + search;
    
        pathname = pathname.replace(/[?#]/g, function(match) {
          return encodeURIComponent(match);
        });
        search = search.replace('#', '%23');
    
        return protocol + host + pathname + search + hash;
      };
    
      Url.prototype.resolve = function(relative) {
        return this.resolveObject(urlParse(relative, false, true)).format();
      };
    
      Url.prototype.resolveObject = function(relative) {
        if (util.isString(relative)) {
          var rel = new Url();
          rel.parse(relative, false, true);
          relative = rel;
        }
    
        var result = new Url();
        var tkeys = Object.keys(this);
        for (var tk = 0; tk < tkeys.length; tk++) {
          var tkey = tkeys[tk];
          result[tkey] = this[tkey];
        }
    
        // hash is always overridden, no matter what.
        // even href="" will remove it.
        result.hash = relative.hash;
    
        // if the relative url is empty, then there's nothing left to do here.
        if (relative.href === '') {
          result.href = result.format();
          return result;
        }
    
        // hrefs like //foo/bar always cut to the protocol.
        if (relative.slashes && !relative.protocol) {
          // take everything except the protocol from relative
          var rkeys = Object.keys(relative);
          for (var rk = 0; rk < rkeys.length; rk++) {
            var rkey = rkeys[rk];
            if (rkey !== 'protocol')
              result[rkey] = relative[rkey];
          }
    
          //urlParse appends trailing / to urls like http://www.example.com
          if (slashedProtocol[result.protocol] &&
              result.hostname && !result.pathname) {
            result.path = result.pathname = '/';
          }
    
          result.href = result.format();
          return result;
        }
    
        if (relative.protocol && relative.protocol !== result.protocol) {
          // if it's a known url protocol, then changing
          // the protocol does weird things
          // first, if it's not file:, then we MUST have a host,
          // and if there was a path
          // to begin with, then we MUST have a path.
          // if it is file:, then the host is dropped,
          // because that's known to be hostless.
          // anything else is assumed to be absolute.
          if (!slashedProtocol[relative.protocol]) {
            var keys = Object.keys(relative);
            for (var v = 0; v < keys.length; v++) {
              var k = keys[v];
              result[k] = relative[k];
            }
            result.href = result.format();
            return result;
          }
    
          result.protocol = relative.protocol;
          if (!relative.host && !hostlessProtocol[relative.protocol]) {
            var relPath = (relative.pathname || '').split('/');
            while (relPath.length && !(relative.host = relPath.shift()));
            if (!relative.host) relative.host = '';
            if (!relative.hostname) relative.hostname = '';
            if (relPath[0] !== '') relPath.unshift('');
            if (relPath.length < 2) relPath.unshift('');
            result.pathname = relPath.join('/');
          } else {
            result.pathname = relative.pathname;
          }
          result.search = relative.search;
          result.query = relative.query;
          result.host = relative.host || '';
          result.auth = relative.auth;
          result.hostname = relative.hostname || relative.host;
          result.port = relative.port;
          // to support http.request
          if (result.pathname || result.search) {
            var p = result.pathname || '';
            var s = result.search || '';
            result.path = p + s;
          }
          result.slashes = result.slashes || relative.slashes;
          result.href = result.format();
          return result;
        }
    
        var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
            isRelAbs = (
                relative.host ||
                relative.pathname && relative.pathname.charAt(0) === '/'
            ),
            mustEndAbs = (isRelAbs || isSourceAbs ||
                          (result.host && relative.pathname)),
            removeAllDots = mustEndAbs,
            srcPath = result.pathname && result.pathname.split('/') || [],
            relPath = relative.pathname && relative.pathname.split('/') || [],
            psychotic = result.protocol && !slashedProtocol[result.protocol];
    
        // if the url is a non-slashed url, then relative
        // links like ../.. should be able
        // to crawl up to the hostname, as well.  This is strange.
        // result.protocol has already been set by now.
        // Later on, put the first path part into the host field.
        if (psychotic) {
          result.hostname = '';
          result.port = null;
          if (result.host) {
            if (srcPath[0] === '') srcPath[0] = result.host;
            else srcPath.unshift(result.host);
          }
          result.host = '';
          if (relative.protocol) {
            relative.hostname = null;
            relative.port = null;
            if (relative.host) {
              if (relPath[0] === '') relPath[0] = relative.host;
              else relPath.unshift(relative.host);
            }
            relative.host = null;
          }
          mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
        }
    
        if (isRelAbs) {
          // it's absolute.
          result.host = (relative.host || relative.host === '') ?
                        relative.host : result.host;
          result.hostname = (relative.hostname || relative.hostname === '') ?
                            relative.hostname : result.hostname;
          result.search = relative.search;
          result.query = relative.query;
          srcPath = relPath;
          // fall through to the dot-handling below.
        } else if (relPath.length) {
          // it's relative
          // throw away the existing file, and take the new path instead.
          if (!srcPath) srcPath = [];
          srcPath.pop();
          srcPath = srcPath.concat(relPath);
          result.search = relative.search;
          result.query = relative.query;
        } else if (!util.isNullOrUndefined(relative.search)) {
          // just pull out the search.
          // like href='?foo'.
          // Put this after the other two cases because it simplifies the booleans
          if (psychotic) {
            result.hostname = result.host = srcPath.shift();
            //occationaly the auth can get stuck only in host
            //this especially happens in cases like
            //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
            var authInHost = result.host && result.host.indexOf('@') > 0 ?
                             result.host.split('@') : false;
            if (authInHost) {
              result.auth = authInHost.shift();
              result.host = result.hostname = authInHost.shift();
            }
          }
          result.search = relative.search;
          result.query = relative.query;
          //to support http.request
          if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
            result.path = (result.pathname ? result.pathname : '') +
                          (result.search ? result.search : '');
          }
          result.href = result.format();
          return result;
        }
    
        if (!srcPath.length) {
          // no path at all.  easy.
          // we've already handled the other stuff above.
          result.pathname = null;
          //to support http.request
          if (result.search) {
            result.path = '/' + result.search;
          } else {
            result.path = null;
          }
          result.href = result.format();
          return result;
        }
    
        // if a url ENDs in . or .., then it must get a trailing slash.
        // however, if it ends in anything else non-slashy,
        // then it must NOT get a trailing slash.
        var last = srcPath.slice(-1)[0];
        var hasTrailingSlash = (
            (result.host || relative.host || srcPath.length > 1) &&
            (last === '.' || last === '..') || last === '');
    
        // strip single dots, resolve double dots to parent dir
        // if the path tries to go above the root, `up` ends up > 0
        var up = 0;
        for (var i = srcPath.length; i >= 0; i--) {
          last = srcPath[i];
          if (last === '.') {
            srcPath.splice(i, 1);
          } else if (last === '..') {
            srcPath.splice(i, 1);
            up++;
          } else if (up) {
            srcPath.splice(i, 1);
            up--;
          }
        }
    
        // if the path is allowed to go above the root, restore leading ..s
        if (!mustEndAbs && !removeAllDots) {
          for (; up--; up) {
            srcPath.unshift('..');
          }
        }
    
        if (mustEndAbs && srcPath[0] !== '' &&
            (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
          srcPath.unshift('');
        }
    
        if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
          srcPath.push('');
        }
    
        var isAbsolute = srcPath[0] === '' ||
            (srcPath[0] && srcPath[0].charAt(0) === '/');
    
        // put the host back
        if (psychotic) {
          result.hostname = result.host = isAbsolute ? '' :
                                          srcPath.length ? srcPath.shift() : '';
          //occationaly the auth can get stuck only in host
          //this especially happens in cases like
          //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
          var authInHost = result.host && result.host.indexOf('@') > 0 ?
                           result.host.split('@') : false;
          if (authInHost) {
            result.auth = authInHost.shift();
            result.host = result.hostname = authInHost.shift();
          }
        }
    
        mustEndAbs = mustEndAbs || (result.host && srcPath.length);
    
        if (mustEndAbs && !isAbsolute) {
          srcPath.unshift('');
        }
    
        if (!srcPath.length) {
          result.pathname = null;
          result.path = null;
        } else {
          result.pathname = srcPath.join('/');
        }
    
        //to support request.http
        if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
          result.path = (result.pathname ? result.pathname : '') +
                        (result.search ? result.search : '');
        }
        result.auth = relative.auth || result.auth;
        result.slashes = result.slashes || relative.slashes;
        result.href = result.format();
        return result;
      };
    
      Url.prototype.parseHost = function() {
        var host = this.host;
        var port = portPattern.exec(host);
        if (port) {
          port = port[0];
          if (port !== ':') {
            this.port = port.substr(1);
          }
          host = host.substr(0, host.length - port.length);
        }
        if (host) this.hostname = host;
      };
    
      /**
       * Returns a relative URL if the given request URL is relative to the current origin.
       * Otherwise returns an absolute URL.
       */
      const getPublicUrlFromRequest = (request) => {
          return request.referrer.startsWith(request.url.origin)
              ? request.url.pathname
              : format({
                  protocol: request.url.protocol,
                  host: request.url.host,
                  pathname: request.url.pathname,
              });
      };
    
      function onUnhandledRequest(request, onUnhandledRequest = 'bypass') {
          if (typeof onUnhandledRequest === 'function') {
              onUnhandledRequest(request);
              return;
          }
          const publicUrl = getPublicUrlFromRequest(request);
          const message = `captured a ${request.method} ${request.url} request without a corresponding request handler.
    
      If you wish to intercept this request, consider creating a request handler for it:
    
      rest.${request.method.toLowerCase()}('${publicUrl}', (req, res, ctx) => {
        return res(ctx.text('body'))
      })`;
          switch (onUnhandledRequest) {
              case 'error': {
                  throw new Error(`[MSW] Error: ${message}`);
              }
              case 'warn': {
                  console.warn(`[MSW] Warning: ${message}`);
              }
              default:
                  return;
          }
      }
    
      /**
       * Parses a given string into a JSON.
       * Does not throw an exception on an invalid JSON string.
       */
      function jsonParse(str) {
          try {
              return JSON.parse(str);
          }
          catch (error) {
              return undefined;
          }
      }
    
      /**
       * Parses a given request/response body based on the `Content-Type` header.
       */
      function parseBody(body, headers) {
          var _a;
          if (body) {
              // If the intercepted request's body has a JSON Content-Type
              // parse it into an object, otherwise leave as-is.
              const hasJsonContent = (_a = headers === null || headers === void 0 ? void 0 : headers.get('content-type')) === null || _a === void 0 ? void 0 : _a.includes('json');
              if (hasJsonContent && typeof body !== 'object') {
                  return jsonParse(body) || body;
              }
              return body;
          }
          // Return whatever falsey body value is given.
          return body;
      }
    
      function getAllCookies() {
          return parse_1(document.cookie);
      }
      /**
       * Returns relevant document cookies based on the request `credentials` option.
       */
      function getRequestCookies(req) {
          switch (req.credentials) {
              case 'same-origin': {
                  // Return document cookies only when requested a resource
                  // from the same origin as the current document.
                  return location.origin === req.url.origin ? getAllCookies() : {};
              }
              case 'include': {
                  // Return all document cookies.
                  return getAllCookies();
              }
              default: {
                  return {};
              }
          }
      }
    
      /**
       * Performs a case-insensitive comparison of two given strings.
       */
      function isStringEqual(actual, expected) {
          return actual.toLowerCase() === expected.toLowerCase();
      }
    
      const handleRequestWith = (context, options) => {
          return (event) => __awaiter(void 0, void 0, void 0, function* () {
              const channel = createBroadcastChannel(event);
              try {
                  const message = JSON.parse(event.data, function (key, value) {
                      if (key === 'url') {
                          return new URL(value);
                      }
                      // Serialize headers
                      if (key === 'headers') {
                          return new lib.Headers(value);
                      }
                      // Prevent empty fields from presering an empty value.
                      // It's invalid to perform a GET request with { body: "" }
                      if (
                      // Check if we are parsing deeper in `event.data.payload`,
                      // because this custom JSON parser is invoked for each depth level.
                      this.method &&
                          isStringEqual(this.method, 'GET') &&
                          key === 'body' &&
                          value === '') {
                          return undefined;
                      }
                      return value;
                  });
                  const { type, payload: req } = message;
                  // Ignore irrelevant worker message types
                  if (type !== 'REQUEST') {
                      return null;
                  }
                  // Parse the request's body based on the "Content-Type" header.
                  req.body = parseBody(req.body, req.headers);
                  // Set document cookies on the request.
                  req.cookies = getRequestCookies(req);
                  const { response, handler, publicRequest, parsedRequest, } = yield getResponse(req, context.requestHandlers);
                  // Handle a scenario when there is no request handler
                  // found for a given request.
                  if (!handler) {
                      onUnhandledRequest(req, options.onUnhandledRequest);
                      return channel.send({ type: 'MOCK_NOT_FOUND' });
                  }
                  // Handle a scenario when there is a request handler,
                  // but it doesn't return any mocked response.
                  if (!response) {
                      console.warn('[MSW] Expected a mocking resolver function to return a mocked response Object, but got: %s. Original response is going to be used instead.', response);
                      return channel.send({ type: 'MOCK_NOT_FOUND' });
                  }
                  const responseWithSerializedHeaders = Object.assign(Object.assign({}, response), { headers: lib.headersToList(response.headers) });
                  if (!options.quiet) {
                      setTimeout(() => {
                          handler.log(publicRequest, responseWithSerializedHeaders, handler, parsedRequest);
                      }, response.delay);
                  }
                  channel.send({
                      type: 'MOCK_SUCCESS',
                      payload: responseWithSerializedHeaders,
                  });
              }
              catch (error) {
                  if (error instanceof NetworkError) {
                      // Treat emulated network error differently,
                      // as it is an intended exception in a request handler.
                      return channel.send({
                          type: 'NETWORK_ERROR',
                          payload: {
                              name: error.name,
                              message: error.message,
                          },
                      });
                  }
                  // Treat all the other exceptions in a request handler
                  // as unintended, alerting that there is a problem needs fixing.
                  channel.send({
                      type: 'INTERNAL_ERROR',
                      payload: {
                          status: 500,
                          body: JSON.stringify({
                              errorType: error.constructor.name,
                              message: error.message,
                              location: error.stack,
                          }),
                      },
                  });
              }
          });
      };
    
      function requestIntegrityCheck(context, serviceWorker) {
          return __awaiter(this, void 0, void 0, function* () {
              // Signal Service Worker to report back its integrity
              serviceWorker.postMessage('INTEGRITY_CHECK_REQUEST');
              const { payload: actualChecksum } = yield context.events.once('INTEGRITY_CHECK_RESPONSE');
              // Compare the response from the Service Worker and the
              // global variable set by webpack upon build.
              if (actualChecksum !== "65d33ca82955e1c5928aed19d1bdf3f9") {
                  throw new Error(`Currently active Service Worker (${actualChecksum}) is behind the latest published one (${"65d33ca82955e1c5928aed19d1bdf3f9"}).`);
              }
              return serviceWorker;
          });
      }
    
      /**
       * Intercepts and defers any requests on the page
       * until the Service Worker instance is ready.
       * Must only be used in a browser.
       */
      function deferNetworkRequestsUntil(predicatePromise) {
          // Defer any `XMLHttpRequest` requests until the Service Worker is ready.
          const originalXhrSend = window.XMLHttpRequest.prototype.send;
          window.XMLHttpRequest.prototype.send = function (...args) {
              // Keep this function synchronous to comply with `XMLHttpRequest.prototype.send`,
              // because that method is always synchronous.
              lib$1.until(() => predicatePromise).then(() => {
                  window.XMLHttpRequest.prototype.send = originalXhrSend;
                  this.send(...args);
              });
          };
          // Defer any `fetch` requests until the Service Worker is ready.
          const originalFetch = window.fetch;
          window.fetch = (...args) => __awaiter(this, void 0, void 0, function* () {
              yield lib$1.until(() => predicatePromise);
              window.fetch = originalFetch;
              return window.fetch(...args);
          });
      }
    
      const DEFAULT_START_OPTIONS = {
          serviceWorker: {
              url: '/mockServiceWorker.js',
              options: null,
          },
          quiet: false,
          waitUntilReady: true,
          onUnhandledRequest: 'bypass',
          findWorker: (scriptURL, mockServiceWorkerUrl) => scriptURL === mockServiceWorkerUrl,
      };
      const createStart = (context) => {
          /**
           * Registers and activates the mock Service Worker.
           */
          return function start(options) {
              const resolvedOptions = mergeRight(DEFAULT_START_OPTIONS, options || {});
              const startWorkerInstance = () => __awaiter(this, void 0, void 0, function* () {
                  if (!('serviceWorker' in navigator)) {
                      console.error(`[MSW] Failed to register a Service Worker: this browser does not support Service Workers (see https://caniuse.com/serviceworkers), or your application is running on an insecure host (consider using HTTPS for custom hostnames).`);
                      return null;
                  }
                  // Remove all previously existing event listeners.
                  // This way none of the listeners persists between Fast refresh
                  // of the application's code.
                  context.events.removeAllListeners();
                  context.events.addListener(navigator.serviceWorker, 'message', handleRequestWith(context, resolvedOptions));
                  const [, instance] = yield lib$1.until(() => getWorkerInstance(resolvedOptions.serviceWorker.url, resolvedOptions.serviceWorker.options, resolvedOptions.findWorker));
                  if (!instance) {
                      return null;
                  }
                  const [worker, registration] = instance;
                  if (!worker) {
                      if (options === null || options === void 0 ? void 0 : options.findWorker) {
                          console.error(`\
    [MSW] Failed to locate the Service Worker registration using a custom "findWorker" predicate.
    
    Please ensure that the custom predicate properly locates the Service Worker registration at "${resolvedOptions.serviceWorker.url}".
    More details: https://mswjs.io/docs/api/setup-worker/start#findworker
    `);
                      }
                      else {
                          console.error(`\
    [MSW] Failed to locate the Service Worker registration.
    
    This most likely means that the worker script URL "${resolvedOptions.serviceWorker.url}" cannot resolve against the actual public hostname (${location.host}). This may happen if your application runs behind a proxy, or has a dynamic hostname.
    
    Please consider using a custom "serviceWorker.url" option to point to the actual worker script location, or a custom "findWorker" option to resolve the Service Worker registration manually. More details: https://mswjs.io/docs/api/setup-worker/start`);
                      }
                      return null;
                  }
                  context.worker = worker;
                  context.registration = registration;
                  context.events.addListener(window, 'beforeunload', () => {
                      if (worker.state !== 'redundant') {
                          // Notify the Service Worker that this client has closed.
                          // Internally, it's similar to disabling the mocking, only
                          // client close event has a handler that self-terminates
                          // the Service Worker when there are no open clients.
                          worker.postMessage('CLIENT_CLOSED');
                      }
                      // Make sure we're always clearing the interval - there are reports that not doing this can
                      // cause memory leaks in headless browser environments.
                      window.clearInterval(context.keepAliveInterval);
                  });
                  // Check if the active Service Worker is the latest published one
                  const [integrityError] = yield lib$1.until(() => requestIntegrityCheck(context, worker));
                  if (integrityError) {
                      console.error(`\
    [MSW] Detected outdated Service Worker: ${integrityError.message}
    
    The mocking is still enabled, but it's highly recommended that you update your Service Worker by running:
    
    $ npx msw init <PUBLIC_DIR>
    
    This is necessary to ensure that the Service Worker is in sync with the library to guarantee its stability.
    If this message still persists after updating, please report an issue: https://github.com/open-draft/msw/issues\
          `);
                  }
                  // Signal the Service Worker to enable requests interception
                  const [activationError] = yield lib$1.until(() => activateMocking(context, options));
                  if (activationError) {
                      console.error('Failed to enable mocking', activationError);
                      return null;
                  }
                  context.keepAliveInterval = window.setInterval(() => worker.postMessage('KEEPALIVE_REQUEST'), 5000);
                  return registration;
              });
              const workerRegistration = startWorkerInstance();
              // Defer any network requests until the Service Worker instance is ready.
              // This prevents a race condition between the Service Worker registration
              // and application's runtime requests (i.e. requests on mount).
              if (resolvedOptions.waitUntilReady) {
                  deferNetworkRequestsUntil(workerRegistration);
              }
              return workerRegistration;
          };
      };
    
      const createStop = (context) => {
          /**
           * Signal the Service Worker to disable mocking for this client.
           * Use this an an explicit way to stop the mocking, while preserving
           * the worker-client relation. Does not affect the worker's lifecycle.
           */
          return function stop() {
              var _a;
              (_a = context.worker) === null || _a === void 0 ? void 0 : _a.postMessage('MOCK_DEACTIVATE');
              context.events.removeAllListeners();
              window.clearInterval(context.keepAliveInterval);
          };
      };
    
      function use(currentHandlers, ...handlers) {
          currentHandlers.unshift(...handlers);
      }
      function restoreHandlers(handlers) {
          handlers.forEach((handler) => {
              if ('shouldSkip' in handler) {
                  handler.shouldSkip = false;
              }
          });
      }
      function resetHandlers(initialHandlers, ...nextHandlers) {
          return nextHandlers.length > 0 ? [...nextHandlers] : [...initialHandlers];
      }
    
      // Declare the list of event handlers on the module's scope
      // so it persists between Fash refreshes of the application's code.
      let listeners = [];
      function setupWorker(...requestHandlers) {
          requestHandlers.forEach((handler) => {
              if (Array.isArray(handler))
                  throw new Error(`[MSW] Failed to call "setupWorker" given an Array of request handlers (setupWorker([a, b])), expected to receive each handler individually: setupWorker(a, b).`);
          });
          const context = {
              worker: null,
              registration: null,
              requestHandlers: [...requestHandlers],
              events: {
                  addListener(target, event, callback) {
                      target.addEventListener(event, callback);
                      listeners.push({ event, target, callback });
                      return () => {
                          target.removeEventListener(event, callback);
                      };
                  },
                  removeAllListeners() {
                      for (const { target, event, callback } of listeners) {
                          target.removeEventListener(event, callback);
                      }
                      listeners = [];
                  },
                  once(type) {
                      const bindings = [];
                      return new Promise((resolve, reject) => {
                          const handleIncomingMessage = (event) => {
                              try {
                                  const message = JSON.parse(event.data);
                                  if (message.type === type) {
                                      resolve(message);
                                  }
                              }
                              catch (error) {
                                  reject(error);
                              }
                          };
                          bindings.push(context.events.addListener(navigator.serviceWorker, 'message', handleIncomingMessage), context.events.addListener(navigator.serviceWorker, 'messageerror', reject));
                      }).finally(() => {
                          bindings.forEach((unbind) => unbind());
                      });
                  },
              },
          };
          // Error when attempting to run this function in a NodeJS environment.
          if (isNodeProcess()) {
              throw new Error('[MSW] Failed to execute `setupWorker` in a non-browser environment. Consider using `setupServer` for NodeJS environment instead.');
          }
          return {
              start: createStart(context),
              stop: createStop(context),
              use(...handlers) {
                  use(context.requestHandlers, ...handlers);
              },
              restoreHandlers() {
                  restoreHandlers(context.requestHandlers);
              },
              resetHandlers(...nextHandlers) {
                  context.requestHandlers = resetHandlers(requestHandlers, ...nextHandlers);
              },
          };
      }
    
      /**
       * Formats a mocked request for introspection in browser's console.
       */
      function prepareRequest(req) {
          return Object.assign(Object.assign({}, req), { headers: req.headers.getAllHeaders() });
      }
    
      /**
       * Formats a mocked response for introspection in browser's console.
       */
      function prepareResponse(res) {
          const responseHeaders = lib.listToHeaders(res.headers);
          return Object.assign(Object.assign({}, res), { 
              // Parse a response JSON body for preview in the logs
              body: parseBody(res.body, responseHeaders) });
      }
    
      function getTimestamp() {
          const now = new Date();
          return [now.getHours(), now.getMinutes(), now.getSeconds()]
              .map(String)
              .map((chunk) => chunk.slice(0, 2))
              .map((chunk) => chunk.padStart(2, '0'))
              .join(':');
      }
    
      /**
       * Returns a HEX color for a given response status code number.
       */
      function getStatusCodeColor(status) {
          if (status < 300) {
              return '#69AB32';
          }
          if (status < 400) {
              return '#F0BB4B';
          }
          return '#E95F5D';
      }
    
      /**
       * Converts a string path to a Regular Expression.
       * Transforms path parameters into named RegExp groups.
       */
      const pathToRegExp = (path) => {
          const pattern = path
              // Escape literal dots
              .replace(/\./g, '\\.')
              // Escape literal slashes
              .replace(/\//g, '/')
              // Escape literal question marks
              .replace(/\?/g, '\\?')
              // Ignore trailing slashes
              .replace(/\/+$/, '')
              // Replace wildcard with any zero-to-any character sequence
              .replace(/\*+/g, '.*')
              // Replace parameters with named capturing groups
              .replace(/:([^\d|^\/][a-zA-Z0-9_]*(?=(?:\/|\\.)|$))/g, (_, paramName) => `(?<${paramName}>[^\/]+?)`)
              // Allow optional trailing slash
              .concat('(\\/|$)');
          return new RegExp(pattern, 'gi');
      };
    
      /**
       * Matches a given url against a path.
       */
      const match = (path, url) => {
          const expression = path instanceof RegExp ? path : pathToRegExp(path);
          const match = expression.exec(url) || false;
          // Matches in strict mode: match string should equal to input (url)
          // Otherwise loose matches will be considered truthy:
          // match('/messages/:id', '/messages/123/users') // true
          const matches = path instanceof RegExp ? !!match : !!match && match[0] === match.input;
          return {
              matches,
              params: match && matches ? match.groups || null : null,
          };
      };
    
      var getCleanUrl_1 = createCommonjsModule(function (module, exports) {
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getCleanUrl = void 0;
      /**
       * Removes query parameters and hashes from a given URL.
       */
      function getCleanUrl(url, isAbsolute) {
          if (isAbsolute === void 0) { isAbsolute = true; }
          return [isAbsolute && url.origin, url.pathname].filter(Boolean).join('');
      }
      exports.getCleanUrl = getCleanUrl;
    
      });
    
      /**
       * Returns an absolute URL based on the given relative URL, if possible.
       * Ignores regular expressions.
       */
      const getAbsoluteUrl = (mask) => {
          // Global `location` object doesn't exist in Node.
          // Relative request predicate URL cannot become absolute.
          const hasLocation = typeof location !== 'undefined';
          return typeof mask === 'string' && mask.startsWith('/')
              ? `${hasLocation ? location.origin : ''}${mask}`
              : mask;
      };
    
      /**
       * Converts a given request handler mask into a URL, if given a valid URL string.
       */
      function getUrlByMask(mask) {
          /**
           * If a string mask contains an asterisk (wildcard), return it as-is.
           * Converting a URL-like path string into an actual URL is misleading.
           * @see https://github.com/mswjs/msw/issues/357
           */
          if (mask instanceof RegExp || mask.includes('*')) {
              return mask;
          }
          try {
              // Attempt to create a URL instance out of the mask string.
              // Resolve mask to an absolute URL, because even a valid relative URL
              // cannot be converted into the URL instance (required absolute URL only).
              return new URL(getAbsoluteUrl(mask));
          }
          catch (error) {
              // Otherwise, the mask is a path string.
              return mask;
          }
      }
    
      function getCleanMask(resolvedMask) {
          return resolvedMask instanceof URL
              ? getCleanUrl_1.getCleanUrl(resolvedMask)
              : resolvedMask instanceof RegExp
                  ? resolvedMask
                  : getAbsoluteUrl(resolvedMask);
      }
    
      /**
       * Returns the result of matching given request URL
       * against a mask.
       */
      function matchRequestUrl(url, mask) {
          const resolvedMask = getUrlByMask(mask);
          const cleanMask = getCleanMask(resolvedMask);
          const cleanRequestUrl = getCleanUrl_1.getCleanUrl(url);
          return match(cleanMask, cleanRequestUrl);
      }
    
      (function (RESTMethods) {
          RESTMethods["HEAD"] = "HEAD";
          RESTMethods["GET"] = "GET";
          RESTMethods["POST"] = "POST";
          RESTMethods["PUT"] = "PUT";
          RESTMethods["PATCH"] = "PATCH";
          RESTMethods["OPTIONS"] = "OPTIONS";
          RESTMethods["DELETE"] = "DELETE";
      })(exports.RESTMethods || (exports.RESTMethods = {}));
      const restContext = {
          set,
          status,
          cookie,
          body,
          text,
          json,
          xml,
          delay,
          fetch,
      };
      const createRestHandler = (method) => {
          return (mask, resolver) => {
              const resolvedMask = getUrlByMask(mask);
              return {
                  parse(req) {
                      // Match the request during parsing to prevent matching it twice
                      // in order to get the request URL parameters.
                      const match = matchRequestUrl(req.url, mask);
                      return {
                          match,
                      };
                  },
                  predicate(req, parsedRequest) {
                      return isStringEqual(method, req.method) && parsedRequest.match.matches;
                  },
                  getPublicRequest(req, parsedRequest) {
                      // Get request path parameters based on the given mask
                      const params = (mask && parsedRequest.match.params) || {};
                      return Object.assign(Object.assign({}, req), { params });
                  },
                  resolver,
                  defineContext() {
                      return restContext;
                  },
                  log(req, res, handler) {
                      // Warn on request handler URL containing query parameters.
                      if (resolvedMask instanceof URL && resolvedMask.search !== '') {
                          const queryParams = [];
                          resolvedMask.searchParams.forEach((_, paramName) => queryParams.push(paramName));
                          console.warn(`\
    [MSW] Found a redundant usage of query parameters in the request handler URL for "${method} ${mask}". Please match against a path instead, and access query parameters in the response resolver function:
    
    rest.${method.toLowerCase()}("${resolvedMask.pathname}", (req, res, ctx) => {
      const query = req.url.searchParams
    ${queryParams
                            .map((paramName) => `\
      const ${paramName} = query.get("${paramName}")`)
                            .join('\n')}
    })\
    `);
                      }
                      const publicUrl = getPublicUrlFromRequest(req);
                      const loggedRequest = prepareRequest(req);
                      const loggedResponse = prepareResponse(res);
                      console.groupCollapsed('[MSW] %s %s %s (%c%s%c)', getTimestamp(), req.method, publicUrl, `color:${getStatusCodeColor(res.status)}`, res.status, 'color:inherit');
                      console.log('Request', loggedRequest);
                      console.log('Handler:', {
                          mask,
                          resolver: handler.resolver,
                      });
                      console.log('Response', loggedResponse);
                      console.groupEnd();
                  },
              };
          };
      };
      const rest = {
          head: createRestHandler(exports.RESTMethods.HEAD),
          get: createRestHandler(exports.RESTMethods.GET),
          post: createRestHandler(exports.RESTMethods.POST),
          put: createRestHandler(exports.RESTMethods.PUT),
          delete: createRestHandler(exports.RESTMethods.DELETE),
          patch: createRestHandler(exports.RESTMethods.PATCH),
          options: createRestHandler(exports.RESTMethods.OPTIONS),
      };
    
      function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }
    
      /**
       * Return true if `value` is object-like. A value is object-like if it's not
       * `null` and has a `typeof` result of "object".
       */
      function isObjectLike(value) {
        return _typeof(value) == 'object' && value !== null;
      }
    
      // In ES2015 (or a polyfilled) environment, this will be Symbol.iterator
    
      var SYMBOL_TO_STRING_TAG = typeof Symbol === 'function' && Symbol.toStringTag != null ? Symbol.toStringTag : '@@toStringTag';
    
      /**
       * Represents a location in a Source.
       */
    
      /**
       * Takes a Source and a UTF-8 character offset, and returns the corresponding
       * line and column as a SourceLocation.
       */
      function getLocation(source, position) {
        var lineRegexp = /\r\n|[\n\r]/g;
        var line = 1;
        var column = position + 1;
        var match;
    
        while ((match = lineRegexp.exec(source.body)) && match.index < position) {
          line += 1;
          column = position + 1 - (match.index + match[0].length);
        }
    
        return {
          line: line,
          column: column
        };
      }
    
      /**
       * Render a helpful description of the location in the GraphQL Source document.
       */
    
      function printLocation(location) {
        return printSourceLocation(location.source, getLocation(location.source, location.start));
      }
      /**
       * Render a helpful description of the location in the GraphQL Source document.
       */
    
      function printSourceLocation(source, sourceLocation) {
        var firstLineColumnOffset = source.locationOffset.column - 1;
        var body = whitespace(firstLineColumnOffset) + source.body;
        var lineIndex = sourceLocation.line - 1;
        var lineOffset = source.locationOffset.line - 1;
        var lineNum = sourceLocation.line + lineOffset;
        var columnOffset = sourceLocation.line === 1 ? firstLineColumnOffset : 0;
        var columnNum = sourceLocation.column + columnOffset;
        var locationStr = "".concat(source.name, ":").concat(lineNum, ":").concat(columnNum, "\n");
        var lines = body.split(/\r\n|[\n\r]/g);
        var locationLine = lines[lineIndex]; // Special case for minified documents
    
        if (locationLine.length > 120) {
          var subLineIndex = Math.floor(columnNum / 80);
          var subLineColumnNum = columnNum % 80;
          var subLines = [];
    
          for (var i = 0; i < locationLine.length; i += 80) {
            subLines.push(locationLine.slice(i, i + 80));
          }
    
          return locationStr + printPrefixedLines([["".concat(lineNum), subLines[0]]].concat(subLines.slice(1, subLineIndex + 1).map(function (subLine) {
            return ['', subLine];
          }), [[' ', whitespace(subLineColumnNum - 1) + '^'], ['', subLines[subLineIndex + 1]]]));
        }
    
        return locationStr + printPrefixedLines([// Lines specified like this: ["prefix", "string"],
        ["".concat(lineNum - 1), lines[lineIndex - 1]], ["".concat(lineNum), locationLine], ['', whitespace(columnNum - 1) + '^'], ["".concat(lineNum + 1), lines[lineIndex + 1]]]);
      }
    
      function printPrefixedLines(lines) {
        var existingLines = lines.filter(function (_ref) {
          var _ = _ref[0],
              line = _ref[1];
          return line !== undefined;
        });
        var padLen = Math.max.apply(Math, existingLines.map(function (_ref2) {
          var prefix = _ref2[0];
          return prefix.length;
        }));
        return existingLines.map(function (_ref3) {
          var prefix = _ref3[0],
              line = _ref3[1];
          return leftPad(padLen, prefix) + (line ? ' | ' + line : ' |');
        }).join('\n');
      }
    
      function whitespace(len) {
        return Array(len + 1).join(' ');
      }
    
      function leftPad(len, str) {
        return whitespace(len - str.length) + str;
      }
    
      function _typeof$1(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$1 = function _typeof(obj) { return typeof obj; }; } else { _typeof$1 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$1(obj); }
    
      function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
    
      function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
    
      function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }
    
      function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }
    
      function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
    
      function _possibleConstructorReturn(self, call) { if (call && (_typeof$1(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }
    
      function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
    
      function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
    
      function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
    
      function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
    
      function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }
    
      function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
    
      function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
      /**
       * A GraphQLError describes an Error found during the parse, validate, or
       * execute phases of performing a GraphQL operation. In addition to a message
       * and stack trace, it also includes information about the locations in a
       * GraphQL document and/or execution result that correspond to the Error.
       */
    
      var GraphQLError = /*#__PURE__*/function (_Error) {
        _inherits(GraphQLError, _Error);
    
        var _super = _createSuper(GraphQLError);
    
        /**
         * A message describing the Error for debugging purposes.
         *
         * Enumerable, and appears in the result of JSON.stringify().
         *
         * Note: should be treated as readonly, despite invariant usage.
         */
    
        /**
         * An array of { line, column } locations within the source GraphQL document
         * which correspond to this error.
         *
         * Errors during validation often contain multiple locations, for example to
         * point out two things with the same name. Errors during execution include a
         * single location, the field which produced the error.
         *
         * Enumerable, and appears in the result of JSON.stringify().
         */
    
        /**
         * An array describing the JSON-path into the execution response which
         * corresponds to this error. Only included for errors during execution.
         *
         * Enumerable, and appears in the result of JSON.stringify().
         */
    
        /**
         * An array of GraphQL AST Nodes corresponding to this error.
         */
    
        /**
         * The source GraphQL document for the first location of this error.
         *
         * Note that if this Error represents more than one node, the source may not
         * represent nodes after the first node.
         */
    
        /**
         * An array of character offsets within the source GraphQL document
         * which correspond to this error.
         */
    
        /**
         * The original error thrown from a field resolver during execution.
         */
    
        /**
         * Extension fields to add to the formatted error.
         */
        function GraphQLError(message, nodes, source, positions, path, originalError, extensions) {
          var _locations2, _source2, _positions2, _extensions2;
    
          var _this;
    
          _classCallCheck(this, GraphQLError);
    
          _this = _super.call(this, message); // Compute list of blame nodes.
    
          var _nodes = Array.isArray(nodes) ? nodes.length !== 0 ? nodes : undefined : nodes ? [nodes] : undefined; // Compute locations in the source for the given nodes/positions.
    
    
          var _source = source;
    
          if (!_source && _nodes) {
            var _nodes$0$loc;
    
            _source = (_nodes$0$loc = _nodes[0].loc) === null || _nodes$0$loc === void 0 ? void 0 : _nodes$0$loc.source;
          }
    
          var _positions = positions;
    
          if (!_positions && _nodes) {
            _positions = _nodes.reduce(function (list, node) {
              if (node.loc) {
                list.push(node.loc.start);
              }
    
              return list;
            }, []);
          }
    
          if (_positions && _positions.length === 0) {
            _positions = undefined;
          }
    
          var _locations;
    
          if (positions && source) {
            _locations = positions.map(function (pos) {
              return getLocation(source, pos);
            });
          } else if (_nodes) {
            _locations = _nodes.reduce(function (list, node) {
              if (node.loc) {
                list.push(getLocation(node.loc.source, node.loc.start));
              }
    
              return list;
            }, []);
          }
    
          var _extensions = extensions;
    
          if (_extensions == null && originalError != null) {
            var originalExtensions = originalError.extensions;
    
            if (isObjectLike(originalExtensions)) {
              _extensions = originalExtensions;
            }
          }
    
          Object.defineProperties(_assertThisInitialized(_this), {
            name: {
              value: 'GraphQLError'
            },
            message: {
              value: message,
              // By being enumerable, JSON.stringify will include `message` in the
              // resulting output. This ensures that the simplest possible GraphQL
              // service adheres to the spec.
              enumerable: true,
              writable: true
            },
            locations: {
              // Coercing falsy values to undefined ensures they will not be included
              // in JSON.stringify() when not provided.
              value: (_locations2 = _locations) !== null && _locations2 !== void 0 ? _locations2 : undefined,
              // By being enumerable, JSON.stringify will include `locations` in the
              // resulting output. This ensures that the simplest possible GraphQL
              // service adheres to the spec.
              enumerable: _locations != null
            },
            path: {
              // Coercing falsy values to undefined ensures they will not be included
              // in JSON.stringify() when not provided.
              value: path !== null && path !== void 0 ? path : undefined,
              // By being enumerable, JSON.stringify will include `path` in the
              // resulting output. This ensures that the simplest possible GraphQL
              // service adheres to the spec.
              enumerable: path != null
            },
            nodes: {
              value: _nodes !== null && _nodes !== void 0 ? _nodes : undefined
            },
            source: {
              value: (_source2 = _source) !== null && _source2 !== void 0 ? _source2 : undefined
            },
            positions: {
              value: (_positions2 = _positions) !== null && _positions2 !== void 0 ? _positions2 : undefined
            },
            originalError: {
              value: originalError
            },
            extensions: {
              // Coercing falsy values to undefined ensures they will not be included
              // in JSON.stringify() when not provided.
              value: (_extensions2 = _extensions) !== null && _extensions2 !== void 0 ? _extensions2 : undefined,
              // By being enumerable, JSON.stringify will include `path` in the
              // resulting output. This ensures that the simplest possible GraphQL
              // service adheres to the spec.
              enumerable: _extensions != null
            }
          }); // Include (non-enumerable) stack trace.
    
          if (originalError === null || originalError === void 0 ? void 0 : originalError.stack) {
            Object.defineProperty(_assertThisInitialized(_this), 'stack', {
              value: originalError.stack,
              writable: true,
              configurable: true
            });
            return _possibleConstructorReturn(_this);
          } // istanbul ignore next (See: 'https://github.com/graphql/graphql-js/issues/2317')
    
    
          if (Error.captureStackTrace) {
            Error.captureStackTrace(_assertThisInitialized(_this), GraphQLError);
          } else {
            Object.defineProperty(_assertThisInitialized(_this), 'stack', {
              value: Error().stack,
              writable: true,
              configurable: true
            });
          }
    
          return _this;
        }
    
        _createClass(GraphQLError, [{
          key: "toString",
          value: function toString() {
            return printError(this);
          } // FIXME: workaround to not break chai comparisons, should be remove in v16
          // $FlowFixMe[unsupported-syntax] Flow doesn't support computed properties yet
    
        }, {
          key: SYMBOL_TO_STRING_TAG,
          get: function get() {
            return 'Object';
          }
        }]);
    
        return GraphQLError;
      }( /*#__PURE__*/_wrapNativeSuper(Error));
      /**
       * Prints a GraphQLError to a string, representing useful location information
       * about the error's position in the source.
       */
    
      function printError(error) {
        var output = error.message;
    
        if (error.nodes) {
          for (var _i2 = 0, _error$nodes2 = error.nodes; _i2 < _error$nodes2.length; _i2++) {
            var node = _error$nodes2[_i2];
    
            if (node.loc) {
              output += '\n\n' + printLocation(node.loc);
            }
          }
        } else if (error.source && error.locations) {
          for (var _i4 = 0, _error$locations2 = error.locations; _i4 < _error$locations2.length; _i4++) {
            var location = _error$locations2[_i4];
            output += '\n\n' + printSourceLocation(error.source, location);
          }
        }
    
        return output;
      }
    
      /**
       * Produces a GraphQLError representing a syntax error, containing useful
       * descriptive information about the syntax error's position in the source.
       */
    
      function syntaxError(source, position, description) {
        return new GraphQLError("Syntax Error: ".concat(description), undefined, source, [position]);
      }
    
      /**
       * The set of allowed kind values for AST nodes.
       */
      var Kind = Object.freeze({
        // Name
        NAME: 'Name',
        // Document
        DOCUMENT: 'Document',
        OPERATION_DEFINITION: 'OperationDefinition',
        VARIABLE_DEFINITION: 'VariableDefinition',
        SELECTION_SET: 'SelectionSet',
        FIELD: 'Field',
        ARGUMENT: 'Argument',
        // Fragments
        FRAGMENT_SPREAD: 'FragmentSpread',
        INLINE_FRAGMENT: 'InlineFragment',
        FRAGMENT_DEFINITION: 'FragmentDefinition',
        // Values
        VARIABLE: 'Variable',
        INT: 'IntValue',
        FLOAT: 'FloatValue',
        STRING: 'StringValue',
        BOOLEAN: 'BooleanValue',
        NULL: 'NullValue',
        ENUM: 'EnumValue',
        LIST: 'ListValue',
        OBJECT: 'ObjectValue',
        OBJECT_FIELD: 'ObjectField',
        // Directives
        DIRECTIVE: 'Directive',
        // Types
        NAMED_TYPE: 'NamedType',
        LIST_TYPE: 'ListType',
        NON_NULL_TYPE: 'NonNullType',
        // Type System Definitions
        SCHEMA_DEFINITION: 'SchemaDefinition',
        OPERATION_TYPE_DEFINITION: 'OperationTypeDefinition',
        // Type Definitions
        SCALAR_TYPE_DEFINITION: 'ScalarTypeDefinition',
        OBJECT_TYPE_DEFINITION: 'ObjectTypeDefinition',
        FIELD_DEFINITION: 'FieldDefinition',
        INPUT_VALUE_DEFINITION: 'InputValueDefinition',
        INTERFACE_TYPE_DEFINITION: 'InterfaceTypeDefinition',
        UNION_TYPE_DEFINITION: 'UnionTypeDefinition',
        ENUM_TYPE_DEFINITION: 'EnumTypeDefinition',
        ENUM_VALUE_DEFINITION: 'EnumValueDefinition',
        INPUT_OBJECT_TYPE_DEFINITION: 'InputObjectTypeDefinition',
        // Directive Definitions
        DIRECTIVE_DEFINITION: 'DirectiveDefinition',
        // Type System Extensions
        SCHEMA_EXTENSION: 'SchemaExtension',
        // Type Extensions
        SCALAR_TYPE_EXTENSION: 'ScalarTypeExtension',
        OBJECT_TYPE_EXTENSION: 'ObjectTypeExtension',
        INTERFACE_TYPE_EXTENSION: 'InterfaceTypeExtension',
        UNION_TYPE_EXTENSION: 'UnionTypeExtension',
        ENUM_TYPE_EXTENSION: 'EnumTypeExtension',
        INPUT_OBJECT_TYPE_EXTENSION: 'InputObjectTypeExtension'
      });
      /**
       * The enum type representing the possible kind values of AST nodes.
       */
    
      function invariant(condition, message) {
        var booleanCondition = Boolean(condition); // istanbul ignore else (See transformation done in './resources/inlineInvariant.js')
    
        if (!booleanCondition) {
          throw new Error(message != null ? message : 'Unexpected invariant triggered.');
        }
      }
    
      // istanbul ignore next (See: 'https://github.com/graphql/graphql-js/issues/2317')
      var nodejsCustomInspectSymbol = typeof Symbol === 'function' && typeof Symbol.for === 'function' ? Symbol.for('nodejs.util.inspect.custom') : undefined;
    
      /**
       * The `defineInspect()` function defines `inspect()` prototype method as alias of `toJSON`
       */
    
      function defineInspect(classObject) {
        var fn = classObject.prototype.toJSON;
        typeof fn === 'function' || invariant(0);
        classObject.prototype.inspect = fn; // istanbul ignore else (See: 'https://github.com/graphql/graphql-js/issues/2317')
    
        if (nodejsCustomInspectSymbol) {
          classObject.prototype[nodejsCustomInspectSymbol] = fn;
        }
      }
    
      /**
       * Contains a range of UTF-8 character offsets and token references that
       * identify the region of the source from which the AST derived.
       */
      var Location = /*#__PURE__*/function () {
        /**
         * The character offset at which this Node begins.
         */
    
        /**
         * The character offset at which this Node ends.
         */
    
        /**
         * The Token at which this Node begins.
         */
    
        /**
         * The Token at which this Node ends.
         */
    
        /**
         * The Source document the AST represents.
         */
        function Location(startToken, endToken, source) {
          this.start = startToken.start;
          this.end = endToken.end;
          this.startToken = startToken;
          this.endToken = endToken;
          this.source = source;
        }
    
        var _proto = Location.prototype;
    
        _proto.toJSON = function toJSON() {
          return {
            start: this.start,
            end: this.end
          };
        };
    
        return Location;
      }(); // Print a simplified form when appearing in `inspect` and `util.inspect`.
    
      defineInspect(Location);
      /**
       * Represents a range of characters represented by a lexical token
       * within a Source.
       */
    
      var Token = /*#__PURE__*/function () {
        /**
         * The kind of Token.
         */
    
        /**
         * The character offset at which this Node begins.
         */
    
        /**
         * The character offset at which this Node ends.
         */
    
        /**
         * The 1-indexed line number on which this Token appears.
         */
    
        /**
         * The 1-indexed column number at which this Token begins.
         */
    
        /**
         * For non-punctuation tokens, represents the interpreted value of the token.
         */
    
        /**
         * Tokens exist as nodes in a double-linked-list amongst all tokens
         * including ignored tokens. <SOF> is always the first node and <EOF>
         * the last.
         */
        function Token(kind, start, end, line, column, prev, value) {
          this.kind = kind;
          this.start = start;
          this.end = end;
          this.line = line;
          this.column = column;
          this.value = value;
          this.prev = prev;
          this.next = null;
        }
    
        var _proto2 = Token.prototype;
    
        _proto2.toJSON = function toJSON() {
          return {
            kind: this.kind,
            value: this.value,
            line: this.line,
            column: this.column
          };
        };
    
        return Token;
      }(); // Print a simplified form when appearing in `inspect` and `util.inspect`.
    
      defineInspect(Token);
      /**
       * The list of all possible AST node types.
       */
    
      /**
       * An exported enum describing the different kinds of tokens that the
       * lexer emits.
       */
      var TokenKind = Object.freeze({
        SOF: '<SOF>',
        EOF: '<EOF>',
        BANG: '!',
        DOLLAR: '$',
        AMP: '&',
        PAREN_L: '(',
        PAREN_R: ')',
        SPREAD: '...',
        COLON: ':',
        EQUALS: '=',
        AT: '@',
        BRACKET_L: '[',
        BRACKET_R: ']',
        BRACE_L: '{',
        PIPE: '|',
        BRACE_R: '}',
        NAME: 'Name',
        INT: 'Int',
        FLOAT: 'Float',
        STRING: 'String',
        BLOCK_STRING: 'BlockString',
        COMMENT: 'Comment'
      });
      /**
       * The enum type representing the token kinds values.
       */
    
      function _typeof$2(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$2 = function _typeof(obj) { return typeof obj; }; } else { _typeof$2 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$2(obj); }
      var MAX_ARRAY_LENGTH = 10;
      var MAX_RECURSIVE_DEPTH = 2;
      /**
       * Used to print values in error messages.
       */
    
      function inspect(value) {
        return formatValue(value, []);
      }
    
      function formatValue(value, seenValues) {
        switch (_typeof$2(value)) {
          case 'string':
            return JSON.stringify(value);
    
          case 'function':
            return value.name ? "[function ".concat(value.name, "]") : '[function]';
    
          case 'object':
            if (value === null) {
              return 'null';
            }
    
            return formatObjectValue(value, seenValues);
    
          default:
            return String(value);
        }
      }
    
      function formatObjectValue(value, previouslySeenValues) {
        if (previouslySeenValues.indexOf(value) !== -1) {
          return '[Circular]';
        }
    
        var seenValues = [].concat(previouslySeenValues, [value]);
        var customInspectFn = getCustomFn(value);
    
        if (customInspectFn !== undefined) {
          var customValue = customInspectFn.call(value); // check for infinite recursion
    
          if (customValue !== value) {
            return typeof customValue === 'string' ? customValue : formatValue(customValue, seenValues);
          }
        } else if (Array.isArray(value)) {
          return formatArray(value, seenValues);
        }
    
        return formatObject(value, seenValues);
      }
    
      function formatObject(object, seenValues) {
        var keys = Object.keys(object);
    
        if (keys.length === 0) {
          return '{}';
        }
    
        if (seenValues.length > MAX_RECURSIVE_DEPTH) {
          return '[' + getObjectTag(object) + ']';
        }
    
        var properties = keys.map(function (key) {
          var value = formatValue(object[key], seenValues);
          return key + ': ' + value;
        });
        return '{ ' + properties.join(', ') + ' }';
      }
    
      function formatArray(array, seenValues) {
        if (array.length === 0) {
          return '[]';
        }
    
        if (seenValues.length > MAX_RECURSIVE_DEPTH) {
          return '[Array]';
        }
    
        var len = Math.min(MAX_ARRAY_LENGTH, array.length);
        var remaining = array.length - len;
        var items = [];
    
        for (var i = 0; i < len; ++i) {
          items.push(formatValue(array[i], seenValues));
        }
    
        if (remaining === 1) {
          items.push('... 1 more item');
        } else if (remaining > 1) {
          items.push("... ".concat(remaining, " more items"));
        }
    
        return '[' + items.join(', ') + ']';
      }
    
      function getCustomFn(object) {
        var customInspectFn = object[String(nodejsCustomInspectSymbol)];
    
        if (typeof customInspectFn === 'function') {
          return customInspectFn;
        }
    
        if (typeof object.inspect === 'function') {
          return object.inspect;
        }
      }
    
      function getObjectTag(object) {
        var tag = Object.prototype.toString.call(object).replace(/^\[object /, '').replace(/]$/, '');
    
        if (tag === 'Object' && typeof object.constructor === 'function') {
          var name = object.constructor.name;
    
          if (typeof name === 'string' && name !== '') {
            return name;
          }
        }
    
        return tag;
      }
    
      function devAssert(condition, message) {
        var booleanCondition = Boolean(condition); // istanbul ignore else (See transformation done in './resources/inlineInvariant.js')
    
        if (!booleanCondition) {
          throw new Error(message);
        }
      }
    
      /**
       * A replacement for instanceof which includes an error warning when multi-realm
       * constructors are detected.
       */
      // See: https://expressjs.com/en/advanced/best-practice-performance.html#set-node_env-to-production
      // See: https://webpack.js.org/guides/production/
      var instanceOf = process.env.NODE_ENV === 'production' ? // istanbul ignore next (See: 'https://github.com/graphql/graphql-js/issues/2317')
      // eslint-disable-next-line no-shadow
      function instanceOf(value, constructor) {
        return value instanceof constructor;
      } : // eslint-disable-next-line no-shadow
      function instanceOf(value, constructor) {
        if (value instanceof constructor) {
          return true;
        }
    
        if (value) {
          var valueClass = value.constructor;
          var className = constructor.name;
    
          if (className && valueClass && valueClass.name === className) {
            throw new Error("Cannot use ".concat(className, " \"").concat(value, "\" from another module or realm.\n\nEnsure that there is only one instance of \"graphql\" in the node_modules\ndirectory. If different versions of \"graphql\" are the dependencies of other\nrelied on modules, use \"resolutions\" to ensure only one version is installed.\n\nhttps://yarnpkg.com/en/docs/selective-version-resolutions\n\nDuplicate \"graphql\" modules cannot be used at the same time since different\nversions may have different capabilities and behavior. The data from one\nversion used in the function from another could produce confusing and\nspurious results."));
          }
        }
    
        return false;
      };
    
      function _defineProperties$1(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
    
      function _createClass$1(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$1(Constructor.prototype, protoProps); if (staticProps) _defineProperties$1(Constructor, staticProps); return Constructor; }
    
      /**
       * A representation of source input to GraphQL. The `name` and `locationOffset` parameters are
       * optional, but they are useful for clients who store GraphQL documents in source files.
       * For example, if the GraphQL input starts at line 40 in a file named `Foo.graphql`, it might
       * be useful for `name` to be `"Foo.graphql"` and location to be `{ line: 40, column: 1 }`.
       * The `line` and `column` properties in `locationOffset` are 1-indexed.
       */
      var Source = /*#__PURE__*/function () {
        function Source(body) {
          var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GraphQL request';
          var locationOffset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
            line: 1,
            column: 1
          };
          typeof body === 'string' || devAssert(0, "Body must be a string. Received: ".concat(inspect(body), "."));
          this.body = body;
          this.name = name;
          this.locationOffset = locationOffset;
          this.locationOffset.line > 0 || devAssert(0, 'line in locationOffset is 1-indexed and must be positive.');
          this.locationOffset.column > 0 || devAssert(0, 'column in locationOffset is 1-indexed and must be positive.');
        } // $FlowFixMe[unsupported-syntax] Flow doesn't support computed properties yet
    
    
        _createClass$1(Source, [{
          key: SYMBOL_TO_STRING_TAG,
          get: function get() {
            return 'Source';
          }
        }]);
    
        return Source;
      }();
      /**
       * Test if the given value is a Source object.
       *
       * @internal
       */
    
      // eslint-disable-next-line no-redeclare
      function isSource(source) {
        return instanceOf(source, Source);
      }
    
      /**
       * The set of allowed directive location values.
       */
      var DirectiveLocation = Object.freeze({
        // Request Definitions
        QUERY: 'QUERY',
        MUTATION: 'MUTATION',
        SUBSCRIPTION: 'SUBSCRIPTION',
        FIELD: 'FIELD',
        FRAGMENT_DEFINITION: 'FRAGMENT_DEFINITION',
        FRAGMENT_SPREAD: 'FRAGMENT_SPREAD',
        INLINE_FRAGMENT: 'INLINE_FRAGMENT',
        VARIABLE_DEFINITION: 'VARIABLE_DEFINITION',
        // Type System Definitions
        SCHEMA: 'SCHEMA',
        SCALAR: 'SCALAR',
        OBJECT: 'OBJECT',
        FIELD_DEFINITION: 'FIELD_DEFINITION',
        ARGUMENT_DEFINITION: 'ARGUMENT_DEFINITION',
        INTERFACE: 'INTERFACE',
        UNION: 'UNION',
        ENUM: 'ENUM',
        ENUM_VALUE: 'ENUM_VALUE',
        INPUT_OBJECT: 'INPUT_OBJECT',
        INPUT_FIELD_DEFINITION: 'INPUT_FIELD_DEFINITION'
      });
      /**
       * The enum type representing the directive location values.
       */
    
      /**
       * Produces the value of a block string from its parsed raw value, similar to
       * CoffeeScript's block string, Python's docstring trim or Ruby's strip_heredoc.
       *
       * This implements the GraphQL spec's BlockStringValue() static algorithm.
       *
       * @internal
       */
      function dedentBlockStringValue(rawString) {
        // Expand a block string's raw value into independent lines.
        var lines = rawString.split(/\r\n|[\n\r]/g); // Remove common indentation from all lines but first.
    
        var commonIndent = getBlockStringIndentation(rawString);
    
        if (commonIndent !== 0) {
          for (var i = 1; i < lines.length; i++) {
            lines[i] = lines[i].slice(commonIndent);
          }
        } // Remove leading and trailing blank lines.
    
    
        var startLine = 0;
    
        while (startLine < lines.length && isBlank(lines[startLine])) {
          ++startLine;
        }
    
        var endLine = lines.length;
    
        while (endLine > startLine && isBlank(lines[endLine - 1])) {
          --endLine;
        } // Return a string of the lines joined with U+000A.
    
    
        return lines.slice(startLine, endLine).join('\n');
      }
    
      function isBlank(str) {
        for (var i = 0; i < str.length; ++i) {
          if (str[i] !== ' ' && str[i] !== '\t') {
            return false;
          }
        }
    
        return true;
      }
      /**
       * @internal
       */
    
    
      function getBlockStringIndentation(value) {
        var _commonIndent;
    
        var isFirstLine = true;
        var isEmptyLine = true;
        var indent = 0;
        var commonIndent = null;
    
        for (var i = 0; i < value.length; ++i) {
          switch (value.charCodeAt(i)) {
            case 13:
              //  \r
              if (value.charCodeAt(i + 1) === 10) {
                ++i; // skip \r\n as one symbol
              }
    
            // falls through
    
            case 10:
              //  \n
              isFirstLine = false;
              isEmptyLine = true;
              indent = 0;
              break;
    
            case 9: //   \t
    
            case 32:
              //  <space>
              ++indent;
              break;
    
            default:
              if (isEmptyLine && !isFirstLine && (commonIndent === null || indent < commonIndent)) {
                commonIndent = indent;
              }
    
              isEmptyLine = false;
          }
        }
    
        return (_commonIndent = commonIndent) !== null && _commonIndent !== void 0 ? _commonIndent : 0;
      }
    
      /**
       * Given a Source object, creates a Lexer for that source.
       * A Lexer is a stateful stream generator in that every time
       * it is advanced, it returns the next token in the Source. Assuming the
       * source lexes, the final Token emitted by the lexer will be of kind
       * EOF, after which the lexer will repeatedly return the same EOF token
       * whenever called.
       */
    
      var Lexer = /*#__PURE__*/function () {
        /**
         * The previously focused non-ignored token.
         */
    
        /**
         * The currently focused non-ignored token.
         */
    
        /**
         * The (1-indexed) line containing the current token.
         */
    
        /**
         * The character offset at which the current line begins.
         */
        function Lexer(source) {
          var startOfFileToken = new Token(TokenKind.SOF, 0, 0, 0, 0, null);
          this.source = source;
          this.lastToken = startOfFileToken;
          this.token = startOfFileToken;
          this.line = 1;
          this.lineStart = 0;
        }
        /**
         * Advances the token stream to the next non-ignored token.
         */
    
    
        var _proto = Lexer.prototype;
    
        _proto.advance = function advance() {
          this.lastToken = this.token;
          var token = this.token = this.lookahead();
          return token;
        }
        /**
         * Looks ahead and returns the next non-ignored token, but does not change
         * the state of Lexer.
         */
        ;
    
        _proto.lookahead = function lookahead() {
          var token = this.token;
    
          if (token.kind !== TokenKind.EOF) {
            do {
              var _token$next;
    
              // Note: next is only mutable during parsing, so we cast to allow this.
              token = (_token$next = token.next) !== null && _token$next !== void 0 ? _token$next : token.next = readToken(this, token);
            } while (token.kind === TokenKind.COMMENT);
          }
    
          return token;
        };
    
        return Lexer;
      }();
      /**
       * @internal
       */
    
      function isPunctuatorTokenKind(kind) {
        return kind === TokenKind.BANG || kind === TokenKind.DOLLAR || kind === TokenKind.AMP || kind === TokenKind.PAREN_L || kind === TokenKind.PAREN_R || kind === TokenKind.SPREAD || kind === TokenKind.COLON || kind === TokenKind.EQUALS || kind === TokenKind.AT || kind === TokenKind.BRACKET_L || kind === TokenKind.BRACKET_R || kind === TokenKind.BRACE_L || kind === TokenKind.PIPE || kind === TokenKind.BRACE_R;
      }
    
      function printCharCode(code) {
        return (// NaN/undefined represents access beyond the end of the file.
          isNaN(code) ? TokenKind.EOF : // Trust JSON for ASCII.
          code < 0x007f ? JSON.stringify(String.fromCharCode(code)) : // Otherwise print the escaped form.
          "\"\\u".concat(('00' + code.toString(16).toUpperCase()).slice(-4), "\"")
        );
      }
      /**
       * Gets the next token from the source starting at the given position.
       *
       * This skips over whitespace until it finds the next lexable token, then lexes
       * punctuators immediately or calls the appropriate helper function for more
       * complicated tokens.
       */
    
    
      function readToken(lexer, prev) {
        var source = lexer.source;
        var body = source.body;
        var bodyLength = body.length;
        var pos = prev.end;
    
        while (pos < bodyLength) {
          var code = body.charCodeAt(pos);
          var _line = lexer.line;
    
          var _col = 1 + pos - lexer.lineStart; // SourceCharacter
    
    
          switch (code) {
            case 0xfeff: // <BOM>
    
            case 9: //   \t
    
            case 32: //  <space>
    
            case 44:
              //  ,
              ++pos;
              continue;
    
            case 10:
              //  \n
              ++pos;
              ++lexer.line;
              lexer.lineStart = pos;
              continue;
    
            case 13:
              //  \r
              if (body.charCodeAt(pos + 1) === 10) {
                pos += 2;
              } else {
                ++pos;
              }
    
              ++lexer.line;
              lexer.lineStart = pos;
              continue;
    
            case 33:
              //  !
              return new Token(TokenKind.BANG, pos, pos + 1, _line, _col, prev);
    
            case 35:
              //  #
              return readComment(source, pos, _line, _col, prev);
    
            case 36:
              //  $
              return new Token(TokenKind.DOLLAR, pos, pos + 1, _line, _col, prev);
    
            case 38:
              //  &
              return new Token(TokenKind.AMP, pos, pos + 1, _line, _col, prev);
    
            case 40:
              //  (
              return new Token(TokenKind.PAREN_L, pos, pos + 1, _line, _col, prev);
    
            case 41:
              //  )
              return new Token(TokenKind.PAREN_R, pos, pos + 1, _line, _col, prev);
    
            case 46:
              //  .
              if (body.charCodeAt(pos + 1) === 46 && body.charCodeAt(pos + 2) === 46) {
                return new Token(TokenKind.SPREAD, pos, pos + 3, _line, _col, prev);
              }
    
              break;
    
            case 58:
              //  :
              return new Token(TokenKind.COLON, pos, pos + 1, _line, _col, prev);
    
            case 61:
              //  =
              return new Token(TokenKind.EQUALS, pos, pos + 1, _line, _col, prev);
    
            case 64:
              //  @
              return new Token(TokenKind.AT, pos, pos + 1, _line, _col, prev);
    
            case 91:
              //  [
              return new Token(TokenKind.BRACKET_L, pos, pos + 1, _line, _col, prev);
    
            case 93:
              //  ]
              return new Token(TokenKind.BRACKET_R, pos, pos + 1, _line, _col, prev);
    
            case 123:
              // {
              return new Token(TokenKind.BRACE_L, pos, pos + 1, _line, _col, prev);
    
            case 124:
              // |
              return new Token(TokenKind.PIPE, pos, pos + 1, _line, _col, prev);
    
            case 125:
              // }
              return new Token(TokenKind.BRACE_R, pos, pos + 1, _line, _col, prev);
    
            case 34:
              //  "
              if (body.charCodeAt(pos + 1) === 34 && body.charCodeAt(pos + 2) === 34) {
                return readBlockString(source, pos, _line, _col, prev, lexer);
              }
    
              return readString(source, pos, _line, _col, prev);
    
            case 45: //  -
    
            case 48: //  0
    
            case 49: //  1
    
            case 50: //  2
    
            case 51: //  3
    
            case 52: //  4
    
            case 53: //  5
    
            case 54: //  6
    
            case 55: //  7
    
            case 56: //  8
    
            case 57:
              //  9
              return readNumber(source, pos, code, _line, _col, prev);
    
            case 65: //  A
    
            case 66: //  B
    
            case 67: //  C
    
            case 68: //  D
    
            case 69: //  E
    
            case 70: //  F
    
            case 71: //  G
    
            case 72: //  H
    
            case 73: //  I
    
            case 74: //  J
    
            case 75: //  K
    
            case 76: //  L
    
            case 77: //  M
    
            case 78: //  N
    
            case 79: //  O
    
            case 80: //  P
    
            case 81: //  Q
    
            case 82: //  R
    
            case 83: //  S
    
            case 84: //  T
    
            case 85: //  U
    
            case 86: //  V
    
            case 87: //  W
    
            case 88: //  X
    
            case 89: //  Y
    
            case 90: //  Z
    
            case 95: //  _
    
            case 97: //  a
    
            case 98: //  b
    
            case 99: //  c
    
            case 100: // d
    
            case 101: // e
    
            case 102: // f
    
            case 103: // g
    
            case 104: // h
    
            case 105: // i
    
            case 106: // j
    
            case 107: // k
    
            case 108: // l
    
            case 109: // m
    
            case 110: // n
    
            case 111: // o
    
            case 112: // p
    
            case 113: // q
    
            case 114: // r
    
            case 115: // s
    
            case 116: // t
    
            case 117: // u
    
            case 118: // v
    
            case 119: // w
    
            case 120: // x
    
            case 121: // y
    
            case 122:
              // z
              return readName(source, pos, _line, _col, prev);
          }
    
          throw syntaxError(source, pos, unexpectedCharacterMessage(code));
        }
    
        var line = lexer.line;
        var col = 1 + pos - lexer.lineStart;
        return new Token(TokenKind.EOF, bodyLength, bodyLength, line, col, prev);
      }
      /**
       * Report a message that an unexpected character was encountered.
       */
    
    
      function unexpectedCharacterMessage(code) {
        if (code < 0x0020 && code !== 0x0009 && code !== 0x000a && code !== 0x000d) {
          return "Cannot contain the invalid character ".concat(printCharCode(code), ".");
        }
    
        if (code === 39) {
          // '
          return 'Unexpected single quote character (\'), did you mean to use a double quote (")?';
        }
    
        return "Cannot parse the unexpected character ".concat(printCharCode(code), ".");
      }
      /**
       * Reads a comment token from the source file.
       *
       * #[\u0009\u0020-\uFFFF]*
       */
    
    
      function readComment(source, start, line, col, prev) {
        var body = source.body;
        var code;
        var position = start;
    
        do {
          code = body.charCodeAt(++position);
        } while (!isNaN(code) && ( // SourceCharacter but not LineTerminator
        code > 0x001f || code === 0x0009));
    
        return new Token(TokenKind.COMMENT, start, position, line, col, prev, body.slice(start + 1, position));
      }
      /**
       * Reads a number token from the source file, either a float
       * or an int depending on whether a decimal point appears.
       *
       * Int:   -?(0|[1-9][0-9]*)
       * Float: -?(0|[1-9][0-9]*)(\.[0-9]+)?((E|e)(+|-)?[0-9]+)?
       */
    
    
      function readNumber(source, start, firstCode, line, col, prev) {
        var body = source.body;
        var code = firstCode;
        var position = start;
        var isFloat = false;
    
        if (code === 45) {
          // -
          code = body.charCodeAt(++position);
        }
    
        if (code === 48) {
          // 0
          code = body.charCodeAt(++position);
    
          if (code >= 48 && code <= 57) {
            throw syntaxError(source, position, "Invalid number, unexpected digit after 0: ".concat(printCharCode(code), "."));
          }
        } else {
          position = readDigits(source, position, code);
          code = body.charCodeAt(position);
        }
    
        if (code === 46) {
          // .
          isFloat = true;
          code = body.charCodeAt(++position);
          position = readDigits(source, position, code);
          code = body.charCodeAt(position);
        }
    
        if (code === 69 || code === 101) {
          // E e
          isFloat = true;
          code = body.charCodeAt(++position);
    
          if (code === 43 || code === 45) {
            // + -
            code = body.charCodeAt(++position);
          }
    
          position = readDigits(source, position, code);
          code = body.charCodeAt(position);
        } // Numbers cannot be followed by . or NameStart
    
    
        if (code === 46 || isNameStart(code)) {
          throw syntaxError(source, position, "Invalid number, expected digit but got: ".concat(printCharCode(code), "."));
        }
    
        return new Token(isFloat ? TokenKind.FLOAT : TokenKind.INT, start, position, line, col, prev, body.slice(start, position));
      }
      /**
       * Returns the new position in the source after reading digits.
       */
    
    
      function readDigits(source, start, firstCode) {
        var body = source.body;
        var position = start;
        var code = firstCode;
    
        if (code >= 48 && code <= 57) {
          // 0 - 9
          do {
            code = body.charCodeAt(++position);
          } while (code >= 48 && code <= 57); // 0 - 9
    
    
          return position;
        }
    
        throw syntaxError(source, position, "Invalid number, expected digit but got: ".concat(printCharCode(code), "."));
      }
      /**
       * Reads a string token from the source file.
       *
       * "([^"\\\u000A\u000D]|(\\(u[0-9a-fA-F]{4}|["\\/bfnrt])))*"
       */
    
    
      function readString(source, start, line, col, prev) {
        var body = source.body;
        var position = start + 1;
        var chunkStart = position;
        var code = 0;
        var value = '';
    
        while (position < body.length && !isNaN(code = body.charCodeAt(position)) && // not LineTerminator
        code !== 0x000a && code !== 0x000d) {
          // Closing Quote (")
          if (code === 34) {
            value += body.slice(chunkStart, position);
            return new Token(TokenKind.STRING, start, position + 1, line, col, prev, value);
          } // SourceCharacter
    
    
          if (code < 0x0020 && code !== 0x0009) {
            throw syntaxError(source, position, "Invalid character within String: ".concat(printCharCode(code), "."));
          }
    
          ++position;
    
          if (code === 92) {
            // \
            value += body.slice(chunkStart, position - 1);
            code = body.charCodeAt(position);
    
            switch (code) {
              case 34:
                value += '"';
                break;
    
              case 47:
                value += '/';
                break;
    
              case 92:
                value += '\\';
                break;
    
              case 98:
                value += '\b';
                break;
    
              case 102:
                value += '\f';
                break;
    
              case 110:
                value += '\n';
                break;
    
              case 114:
                value += '\r';
                break;
    
              case 116:
                value += '\t';
                break;
    
              case 117:
                {
                  // uXXXX
                  var charCode = uniCharCode(body.charCodeAt(position + 1), body.charCodeAt(position + 2), body.charCodeAt(position + 3), body.charCodeAt(position + 4));
    
                  if (charCode < 0) {
                    var invalidSequence = body.slice(position + 1, position + 5);
                    throw syntaxError(source, position, "Invalid character escape sequence: \\u".concat(invalidSequence, "."));
                  }
    
                  value += String.fromCharCode(charCode);
                  position += 4;
                  break;
                }
    
              default:
                throw syntaxError(source, position, "Invalid character escape sequence: \\".concat(String.fromCharCode(code), "."));
            }
    
            ++position;
            chunkStart = position;
          }
        }
    
        throw syntaxError(source, position, 'Unterminated string.');
      }
      /**
       * Reads a block string token from the source file.
       *
       * """("?"?(\\"""|\\(?!=""")|[^"\\]))*"""
       */
    
    
      function readBlockString(source, start, line, col, prev, lexer) {
        var body = source.body;
        var position = start + 3;
        var chunkStart = position;
        var code = 0;
        var rawValue = '';
    
        while (position < body.length && !isNaN(code = body.charCodeAt(position))) {
          // Closing Triple-Quote (""")
          if (code === 34 && body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34) {
            rawValue += body.slice(chunkStart, position);
            return new Token(TokenKind.BLOCK_STRING, start, position + 3, line, col, prev, dedentBlockStringValue(rawValue));
          } // SourceCharacter
    
    
          if (code < 0x0020 && code !== 0x0009 && code !== 0x000a && code !== 0x000d) {
            throw syntaxError(source, position, "Invalid character within String: ".concat(printCharCode(code), "."));
          }
    
          if (code === 10) {
            // new line
            ++position;
            ++lexer.line;
            lexer.lineStart = position;
          } else if (code === 13) {
            // carriage return
            if (body.charCodeAt(position + 1) === 10) {
              position += 2;
            } else {
              ++position;
            }
    
            ++lexer.line;
            lexer.lineStart = position;
          } else if ( // Escape Triple-Quote (\""")
          code === 92 && body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34 && body.charCodeAt(position + 3) === 34) {
            rawValue += body.slice(chunkStart, position) + '"""';
            position += 4;
            chunkStart = position;
          } else {
            ++position;
          }
        }
    
        throw syntaxError(source, position, 'Unterminated string.');
      }
      /**
       * Converts four hexadecimal chars to the integer that the
       * string represents. For example, uniCharCode('0','0','0','f')
       * will return 15, and uniCharCode('0','0','f','f') returns 255.
       *
       * Returns a negative number on error, if a char was invalid.
       *
       * This is implemented by noting that char2hex() returns -1 on error,
       * which means the result of ORing the char2hex() will also be negative.
       */
    
    
      function uniCharCode(a, b, c, d) {
        return char2hex(a) << 12 | char2hex(b) << 8 | char2hex(c) << 4 | char2hex(d);
      }
      /**
       * Converts a hex character to its integer value.
       * '0' becomes 0, '9' becomes 9
       * 'A' becomes 10, 'F' becomes 15
       * 'a' becomes 10, 'f' becomes 15
       *
       * Returns -1 on error.
       */
    
    
      function char2hex(a) {
        return a >= 48 && a <= 57 ? a - 48 // 0-9
        : a >= 65 && a <= 70 ? a - 55 // A-F
        : a >= 97 && a <= 102 ? a - 87 // a-f
        : -1;
      }
      /**
       * Reads an alphanumeric + underscore name from the source.
       *
       * [_A-Za-z][_0-9A-Za-z]*
       */
    
    
      function readName(source, start, line, col, prev) {
        var body = source.body;
        var bodyLength = body.length;
        var position = start + 1;
        var code = 0;
    
        while (position !== bodyLength && !isNaN(code = body.charCodeAt(position)) && (code === 95 || // _
        code >= 48 && code <= 57 || // 0-9
        code >= 65 && code <= 90 || // A-Z
        code >= 97 && code <= 122) // a-z
        ) {
          ++position;
        }
    
        return new Token(TokenKind.NAME, start, position, line, col, prev, body.slice(start, position));
      } // _ A-Z a-z
    
    
      function isNameStart(code) {
        return code === 95 || code >= 65 && code <= 90 || code >= 97 && code <= 122;
      }
    
      /**
       * Configuration options to control parser behavior
       */
    
      /**
       * Given a GraphQL source, parses it into a Document.
       * Throws GraphQLError if a syntax error is encountered.
       */
      function parse$1(source, options) {
        var parser = new Parser(source, options);
        return parser.parseDocument();
      }
      /**
       * This class is exported only to assist people in implementing their own parsers
       * without duplicating too much code and should be used only as last resort for cases
       * such as experimental syntax or if certain features could not be contributed upstream.
       *
       * It is still part of the internal API and is versioned, so any changes to it are never
       * considered breaking changes. If you still need to support multiple versions of the
       * library, please use the `versionInfo` variable for version detection.
       *
       * @internal
       */
    
      var Parser = /*#__PURE__*/function () {
        function Parser(source, options) {
          var sourceObj = isSource(source) ? source : new Source(source);
          this._lexer = new Lexer(sourceObj);
          this._options = options;
        }
        /**
         * Converts a name lex token into a name parse node.
         */
    
    
        var _proto = Parser.prototype;
    
        _proto.parseName = function parseName() {
          var token = this.expectToken(TokenKind.NAME);
          return {
            kind: Kind.NAME,
            value: token.value,
            loc: this.loc(token)
          };
        } // Implements the parsing rules in the Document section.
    
        /**
         * Document : Definition+
         */
        ;
    
        _proto.parseDocument = function parseDocument() {
          var start = this._lexer.token;
          return {
            kind: Kind.DOCUMENT,
            definitions: this.many(TokenKind.SOF, this.parseDefinition, TokenKind.EOF),
            loc: this.loc(start)
          };
        }
        /**
         * Definition :
         *   - ExecutableDefinition
         *   - TypeSystemDefinition
         *   - TypeSystemExtension
         *
         * ExecutableDefinition :
         *   - OperationDefinition
         *   - FragmentDefinition
         */
        ;
    
        _proto.parseDefinition = function parseDefinition() {
          if (this.peek(TokenKind.NAME)) {
            switch (this._lexer.token.value) {
              case 'query':
              case 'mutation':
              case 'subscription':
                return this.parseOperationDefinition();
    
              case 'fragment':
                return this.parseFragmentDefinition();
    
              case 'schema':
              case 'scalar':
              case 'type':
              case 'interface':
              case 'union':
              case 'enum':
              case 'input':
              case 'directive':
                return this.parseTypeSystemDefinition();
    
              case 'extend':
                return this.parseTypeSystemExtension();
            }
          } else if (this.peek(TokenKind.BRACE_L)) {
            return this.parseOperationDefinition();
          } else if (this.peekDescription()) {
            return this.parseTypeSystemDefinition();
          }
    
          throw this.unexpected();
        } // Implements the parsing rules in the Operations section.
    
        /**
         * OperationDefinition :
         *  - SelectionSet
         *  - OperationType Name? VariableDefinitions? Directives? SelectionSet
         */
        ;
    
        _proto.parseOperationDefinition = function parseOperationDefinition() {
          var start = this._lexer.token;
    
          if (this.peek(TokenKind.BRACE_L)) {
            return {
              kind: Kind.OPERATION_DEFINITION,
              operation: 'query',
              name: undefined,
              variableDefinitions: [],
              directives: [],
              selectionSet: this.parseSelectionSet(),
              loc: this.loc(start)
            };
          }
    
          var operation = this.parseOperationType();
          var name;
    
          if (this.peek(TokenKind.NAME)) {
            name = this.parseName();
          }
    
          return {
            kind: Kind.OPERATION_DEFINITION,
            operation: operation,
            name: name,
            variableDefinitions: this.parseVariableDefinitions(),
            directives: this.parseDirectives(false),
            selectionSet: this.parseSelectionSet(),
            loc: this.loc(start)
          };
        }
        /**
         * OperationType : one of query mutation subscription
         */
        ;
    
        _proto.parseOperationType = function parseOperationType() {
          var operationToken = this.expectToken(TokenKind.NAME);
    
          switch (operationToken.value) {
            case 'query':
              return 'query';
    
            case 'mutation':
              return 'mutation';
    
            case 'subscription':
              return 'subscription';
          }
    
          throw this.unexpected(operationToken);
        }
        /**
         * VariableDefinitions : ( VariableDefinition+ )
         */
        ;
    
        _proto.parseVariableDefinitions = function parseVariableDefinitions() {
          return this.optionalMany(TokenKind.PAREN_L, this.parseVariableDefinition, TokenKind.PAREN_R);
        }
        /**
         * VariableDefinition : Variable : Type DefaultValue? Directives[Const]?
         */
        ;
    
        _proto.parseVariableDefinition = function parseVariableDefinition() {
          var start = this._lexer.token;
          return {
            kind: Kind.VARIABLE_DEFINITION,
            variable: this.parseVariable(),
            type: (this.expectToken(TokenKind.COLON), this.parseTypeReference()),
            defaultValue: this.expectOptionalToken(TokenKind.EQUALS) ? this.parseValueLiteral(true) : undefined,
            directives: this.parseDirectives(true),
            loc: this.loc(start)
          };
        }
        /**
         * Variable : $ Name
         */
        ;
    
        _proto.parseVariable = function parseVariable() {
          var start = this._lexer.token;
          this.expectToken(TokenKind.DOLLAR);
          return {
            kind: Kind.VARIABLE,
            name: this.parseName(),
            loc: this.loc(start)
          };
        }
        /**
         * SelectionSet : { Selection+ }
         */
        ;
    
        _proto.parseSelectionSet = function parseSelectionSet() {
          var start = this._lexer.token;
          return {
            kind: Kind.SELECTION_SET,
            selections: this.many(TokenKind.BRACE_L, this.parseSelection, TokenKind.BRACE_R),
            loc: this.loc(start)
          };
        }
        /**
         * Selection :
         *   - Field
         *   - FragmentSpread
         *   - InlineFragment
         */
        ;
    
        _proto.parseSelection = function parseSelection() {
          return this.peek(TokenKind.SPREAD) ? this.parseFragment() : this.parseField();
        }
        /**
         * Field : Alias? Name Arguments? Directives? SelectionSet?
         *
         * Alias : Name :
         */
        ;
    
        _proto.parseField = function parseField() {
          var start = this._lexer.token;
          var nameOrAlias = this.parseName();
          var alias;
          var name;
    
          if (this.expectOptionalToken(TokenKind.COLON)) {
            alias = nameOrAlias;
            name = this.parseName();
          } else {
            name = nameOrAlias;
          }
    
          return {
            kind: Kind.FIELD,
            alias: alias,
            name: name,
            arguments: this.parseArguments(false),
            directives: this.parseDirectives(false),
            selectionSet: this.peek(TokenKind.BRACE_L) ? this.parseSelectionSet() : undefined,
            loc: this.loc(start)
          };
        }
        /**
         * Arguments[Const] : ( Argument[?Const]+ )
         */
        ;
    
        _proto.parseArguments = function parseArguments(isConst) {
          var item = isConst ? this.parseConstArgument : this.parseArgument;
          return this.optionalMany(TokenKind.PAREN_L, item, TokenKind.PAREN_R);
        }
        /**
         * Argument[Const] : Name : Value[?Const]
         */
        ;
    
        _proto.parseArgument = function parseArgument() {
          var start = this._lexer.token;
          var name = this.parseName();
          this.expectToken(TokenKind.COLON);
          return {
            kind: Kind.ARGUMENT,
            name: name,
            value: this.parseValueLiteral(false),
            loc: this.loc(start)
          };
        };
    
        _proto.parseConstArgument = function parseConstArgument() {
          var start = this._lexer.token;
          return {
            kind: Kind.ARGUMENT,
            name: this.parseName(),
            value: (this.expectToken(TokenKind.COLON), this.parseValueLiteral(true)),
            loc: this.loc(start)
          };
        } // Implements the parsing rules in the Fragments section.
    
        /**
         * Corresponds to both FragmentSpread and InlineFragment in the spec.
         *
         * FragmentSpread : ... FragmentName Directives?
         *
         * InlineFragment : ... TypeCondition? Directives? SelectionSet
         */
        ;
    
        _proto.parseFragment = function parseFragment() {
          var start = this._lexer.token;
          this.expectToken(TokenKind.SPREAD);
          var hasTypeCondition = this.expectOptionalKeyword('on');
    
          if (!hasTypeCondition && this.peek(TokenKind.NAME)) {
            return {
              kind: Kind.FRAGMENT_SPREAD,
              name: this.parseFragmentName(),
              directives: this.parseDirectives(false),
              loc: this.loc(start)
            };
          }
    
          return {
            kind: Kind.INLINE_FRAGMENT,
            typeCondition: hasTypeCondition ? this.parseNamedType() : undefined,
            directives: this.parseDirectives(false),
            selectionSet: this.parseSelectionSet(),
            loc: this.loc(start)
          };
        }
        /**
         * FragmentDefinition :
         *   - fragment FragmentName on TypeCondition Directives? SelectionSet
         *
         * TypeCondition : NamedType
         */
        ;
    
        _proto.parseFragmentDefinition = function parseFragmentDefinition() {
          var _this$_options;
    
          var start = this._lexer.token;
          this.expectKeyword('fragment'); // Experimental support for defining variables within fragments changes
          // the grammar of FragmentDefinition:
          //   - fragment FragmentName VariableDefinitions? on TypeCondition Directives? SelectionSet
    
          if (((_this$_options = this._options) === null || _this$_options === void 0 ? void 0 : _this$_options.experimentalFragmentVariables) === true) {
            return {
              kind: Kind.FRAGMENT_DEFINITION,
              name: this.parseFragmentName(),
              variableDefinitions: this.parseVariableDefinitions(),
              typeCondition: (this.expectKeyword('on'), this.parseNamedType()),
              directives: this.parseDirectives(false),
              selectionSet: this.parseSelectionSet(),
              loc: this.loc(start)
            };
          }
    
          return {
            kind: Kind.FRAGMENT_DEFINITION,
            name: this.parseFragmentName(),
            typeCondition: (this.expectKeyword('on'), this.parseNamedType()),
            directives: this.parseDirectives(false),
            selectionSet: this.parseSelectionSet(),
            loc: this.loc(start)
          };
        }
        /**
         * FragmentName : Name but not `on`
         */
        ;
    
        _proto.parseFragmentName = function parseFragmentName() {
          if (this._lexer.token.value === 'on') {
            throw this.unexpected();
          }
    
          return this.parseName();
        } // Implements the parsing rules in the Values section.
    
        /**
         * Value[Const] :
         *   - [~Const] Variable
         *   - IntValue
         *   - FloatValue
         *   - StringValue
         *   - BooleanValue
         *   - NullValue
         *   - EnumValue
         *   - ListValue[?Const]
         *   - ObjectValue[?Const]
         *
         * BooleanValue : one of `true` `false`
         *
         * NullValue : `null`
         *
         * EnumValue : Name but not `true`, `false` or `null`
         */
        ;
    
        _proto.parseValueLiteral = function parseValueLiteral(isConst) {
          var token = this._lexer.token;
    
          switch (token.kind) {
            case TokenKind.BRACKET_L:
              return this.parseList(isConst);
    
            case TokenKind.BRACE_L:
              return this.parseObject(isConst);
    
            case TokenKind.INT:
              this._lexer.advance();
    
              return {
                kind: Kind.INT,
                value: token.value,
                loc: this.loc(token)
              };
    
            case TokenKind.FLOAT:
              this._lexer.advance();
    
              return {
                kind: Kind.FLOAT,
                value: token.value,
                loc: this.loc(token)
              };
    
            case TokenKind.STRING:
            case TokenKind.BLOCK_STRING:
              return this.parseStringLiteral();
    
            case TokenKind.NAME:
              this._lexer.advance();
    
              switch (token.value) {
                case 'true':
                  return {
                    kind: Kind.BOOLEAN,
                    value: true,
                    loc: this.loc(token)
                  };
    
                case 'false':
                  return {
                    kind: Kind.BOOLEAN,
                    value: false,
                    loc: this.loc(token)
                  };
    
                case 'null':
                  return {
                    kind: Kind.NULL,
                    loc: this.loc(token)
                  };
    
                default:
                  return {
                    kind: Kind.ENUM,
                    value: token.value,
                    loc: this.loc(token)
                  };
              }
    
            case TokenKind.DOLLAR:
              if (!isConst) {
                return this.parseVariable();
              }
    
              break;
          }
    
          throw this.unexpected();
        };
    
        _proto.parseStringLiteral = function parseStringLiteral() {
          var token = this._lexer.token;
    
          this._lexer.advance();
    
          return {
            kind: Kind.STRING,
            value: token.value,
            block: token.kind === TokenKind.BLOCK_STRING,
            loc: this.loc(token)
          };
        }
        /**
         * ListValue[Const] :
         *   - [ ]
         *   - [ Value[?Const]+ ]
         */
        ;
    
        _proto.parseList = function parseList(isConst) {
          var _this = this;
    
          var start = this._lexer.token;
    
          var item = function item() {
            return _this.parseValueLiteral(isConst);
          };
    
          return {
            kind: Kind.LIST,
            values: this.any(TokenKind.BRACKET_L, item, TokenKind.BRACKET_R),
            loc: this.loc(start)
          };
        }
        /**
         * ObjectValue[Const] :
         *   - { }
         *   - { ObjectField[?Const]+ }
         */
        ;
    
        _proto.parseObject = function parseObject(isConst) {
          var _this2 = this;
    
          var start = this._lexer.token;
    
          var item = function item() {
            return _this2.parseObjectField(isConst);
          };
    
          return {
            kind: Kind.OBJECT,
            fields: this.any(TokenKind.BRACE_L, item, TokenKind.BRACE_R),
            loc: this.loc(start)
          };
        }
        /**
         * ObjectField[Const] : Name : Value[?Const]
         */
        ;
    
        _proto.parseObjectField = function parseObjectField(isConst) {
          var start = this._lexer.token;
          var name = this.parseName();
          this.expectToken(TokenKind.COLON);
          return {
            kind: Kind.OBJECT_FIELD,
            name: name,
            value: this.parseValueLiteral(isConst),
            loc: this.loc(start)
          };
        } // Implements the parsing rules in the Directives section.
    
        /**
         * Directives[Const] : Directive[?Const]+
         */
        ;
    
        _proto.parseDirectives = function parseDirectives(isConst) {
          var directives = [];
    
          while (this.peek(TokenKind.AT)) {
            directives.push(this.parseDirective(isConst));
          }
    
          return directives;
        }
        /**
         * Directive[Const] : @ Name Arguments[?Const]?
         */
        ;
    
        _proto.parseDirective = function parseDirective(isConst) {
          var start = this._lexer.token;
          this.expectToken(TokenKind.AT);
          return {
            kind: Kind.DIRECTIVE,
            name: this.parseName(),
            arguments: this.parseArguments(isConst),
            loc: this.loc(start)
          };
        } // Implements the parsing rules in the Types section.
    
        /**
         * Type :
         *   - NamedType
         *   - ListType
         *   - NonNullType
         */
        ;
    
        _proto.parseTypeReference = function parseTypeReference() {
          var start = this._lexer.token;
          var type;
    
          if (this.expectOptionalToken(TokenKind.BRACKET_L)) {
            type = this.parseTypeReference();
            this.expectToken(TokenKind.BRACKET_R);
            type = {
              kind: Kind.LIST_TYPE,
              type: type,
              loc: this.loc(start)
            };
          } else {
            type = this.parseNamedType();
          }
    
          if (this.expectOptionalToken(TokenKind.BANG)) {
            return {
              kind: Kind.NON_NULL_TYPE,
              type: type,
              loc: this.loc(start)
            };
          }
    
          return type;
        }
        /**
         * NamedType : Name
         */
        ;
    
        _proto.parseNamedType = function parseNamedType() {
          var start = this._lexer.token;
          return {
            kind: Kind.NAMED_TYPE,
            name: this.parseName(),
            loc: this.loc(start)
          };
        } // Implements the parsing rules in the Type Definition section.
    
        /**
         * TypeSystemDefinition :
         *   - SchemaDefinition
         *   - TypeDefinition
         *   - DirectiveDefinition
         *
         * TypeDefinition :
         *   - ScalarTypeDefinition
         *   - ObjectTypeDefinition
         *   - InterfaceTypeDefinition
         *   - UnionTypeDefinition
         *   - EnumTypeDefinition
         *   - InputObjectTypeDefinition
         */
        ;
    
        _proto.parseTypeSystemDefinition = function parseTypeSystemDefinition() {
          // Many definitions begin with a description and require a lookahead.
          var keywordToken = this.peekDescription() ? this._lexer.lookahead() : this._lexer.token;
    
          if (keywordToken.kind === TokenKind.NAME) {
            switch (keywordToken.value) {
              case 'schema':
                return this.parseSchemaDefinition();
    
              case 'scalar':
                return this.parseScalarTypeDefinition();
    
              case 'type':
                return this.parseObjectTypeDefinition();
    
              case 'interface':
                return this.parseInterfaceTypeDefinition();
    
              case 'union':
                return this.parseUnionTypeDefinition();
    
              case 'enum':
                return this.parseEnumTypeDefinition();
    
              case 'input':
                return this.parseInputObjectTypeDefinition();
    
              case 'directive':
                return this.parseDirectiveDefinition();
            }
          }
    
          throw this.unexpected(keywordToken);
        };
    
        _proto.peekDescription = function peekDescription() {
          return this.peek(TokenKind.STRING) || this.peek(TokenKind.BLOCK_STRING);
        }
        /**
         * Description : StringValue
         */
        ;
    
        _proto.parseDescription = function parseDescription() {
          if (this.peekDescription()) {
            return this.parseStringLiteral();
          }
        }
        /**
         * SchemaDefinition : Description? schema Directives[Const]? { OperationTypeDefinition+ }
         */
        ;
    
        _proto.parseSchemaDefinition = function parseSchemaDefinition() {
          var start = this._lexer.token;
          var description = this.parseDescription();
          this.expectKeyword('schema');
          var directives = this.parseDirectives(true);
          var operationTypes = this.many(TokenKind.BRACE_L, this.parseOperationTypeDefinition, TokenKind.BRACE_R);
          return {
            kind: Kind.SCHEMA_DEFINITION,
            description: description,
            directives: directives,
            operationTypes: operationTypes,
            loc: this.loc(start)
          };
        }
        /**
         * OperationTypeDefinition : OperationType : NamedType
         */
        ;
    
        _proto.parseOperationTypeDefinition = function parseOperationTypeDefinition() {
          var start = this._lexer.token;
          var operation = this.parseOperationType();
          this.expectToken(TokenKind.COLON);
          var type = this.parseNamedType();
          return {
            kind: Kind.OPERATION_TYPE_DEFINITION,
            operation: operation,
            type: type,
            loc: this.loc(start)
          };
        }
        /**
         * ScalarTypeDefinition : Description? scalar Name Directives[Const]?
         */
        ;
    
        _proto.parseScalarTypeDefinition = function parseScalarTypeDefinition() {
          var start = this._lexer.token;
          var description = this.parseDescription();
          this.expectKeyword('scalar');
          var name = this.parseName();
          var directives = this.parseDirectives(true);
          return {
            kind: Kind.SCALAR_TYPE_DEFINITION,
            description: description,
            name: name,
            directives: directives,
            loc: this.loc(start)
          };
        }
        /**
         * ObjectTypeDefinition :
         *   Description?
         *   type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition?
         */
        ;
    
        _proto.parseObjectTypeDefinition = function parseObjectTypeDefinition() {
          var start = this._lexer.token;
          var description = this.parseDescription();
          this.expectKeyword('type');
          var name = this.parseName();
          var interfaces = this.parseImplementsInterfaces();
          var directives = this.parseDirectives(true);
          var fields = this.parseFieldsDefinition();
          return {
            kind: Kind.OBJECT_TYPE_DEFINITION,
            description: description,
            name: name,
            interfaces: interfaces,
            directives: directives,
            fields: fields,
            loc: this.loc(start)
          };
        }
        /**
         * ImplementsInterfaces :
         *   - implements `&`? NamedType
         *   - ImplementsInterfaces & NamedType
         */
        ;
    
        _proto.parseImplementsInterfaces = function parseImplementsInterfaces() {
          var _this$_options2;
    
          if (!this.expectOptionalKeyword('implements')) {
            return [];
          }
    
          if (((_this$_options2 = this._options) === null || _this$_options2 === void 0 ? void 0 : _this$_options2.allowLegacySDLImplementsInterfaces) === true) {
            var types = []; // Optional leading ampersand
    
            this.expectOptionalToken(TokenKind.AMP);
    
            do {
              types.push(this.parseNamedType());
            } while (this.expectOptionalToken(TokenKind.AMP) || this.peek(TokenKind.NAME));
    
            return types;
          }
    
          return this.delimitedMany(TokenKind.AMP, this.parseNamedType);
        }
        /**
         * FieldsDefinition : { FieldDefinition+ }
         */
        ;
    
        _proto.parseFieldsDefinition = function parseFieldsDefinition() {
          var _this$_options3;
    
          // Legacy support for the SDL?
          if (((_this$_options3 = this._options) === null || _this$_options3 === void 0 ? void 0 : _this$_options3.allowLegacySDLEmptyFields) === true && this.peek(TokenKind.BRACE_L) && this._lexer.lookahead().kind === TokenKind.BRACE_R) {
            this._lexer.advance();
    
            this._lexer.advance();
    
            return [];
          }
    
          return this.optionalMany(TokenKind.BRACE_L, this.parseFieldDefinition, TokenKind.BRACE_R);
        }
        /**
         * FieldDefinition :
         *   - Description? Name ArgumentsDefinition? : Type Directives[Const]?
         */
        ;
    
        _proto.parseFieldDefinition = function parseFieldDefinition() {
          var start = this._lexer.token;
          var description = this.parseDescription();
          var name = this.parseName();
          var args = this.parseArgumentDefs();
          this.expectToken(TokenKind.COLON);
          var type = this.parseTypeReference();
          var directives = this.parseDirectives(true);
          return {
            kind: Kind.FIELD_DEFINITION,
            description: description,
            name: name,
            arguments: args,
            type: type,
            directives: directives,
            loc: this.loc(start)
          };
        }
        /**
         * ArgumentsDefinition : ( InputValueDefinition+ )
         */
        ;
    
        _proto.parseArgumentDefs = function parseArgumentDefs() {
          return this.optionalMany(TokenKind.PAREN_L, this.parseInputValueDef, TokenKind.PAREN_R);
        }
        /**
         * InputValueDefinition :
         *   - Description? Name : Type DefaultValue? Directives[Const]?
         */
        ;
    
        _proto.parseInputValueDef = function parseInputValueDef() {
          var start = this._lexer.token;
          var description = this.parseDescription();
          var name = this.parseName();
          this.expectToken(TokenKind.COLON);
          var type = this.parseTypeReference();
          var defaultValue;
    
          if (this.expectOptionalToken(TokenKind.EQUALS)) {
            defaultValue = this.parseValueLiteral(true);
          }
    
          var directives = this.parseDirectives(true);
          return {
            kind: Kind.INPUT_VALUE_DEFINITION,
            description: description,
            name: name,
            type: type,
            defaultValue: defaultValue,
            directives: directives,
            loc: this.loc(start)
          };
        }
        /**
         * InterfaceTypeDefinition :
         *   - Description? interface Name Directives[Const]? FieldsDefinition?
         */
        ;
    
        _proto.parseInterfaceTypeDefinition = function parseInterfaceTypeDefinition() {
          var start = this._lexer.token;
          var description = this.parseDescription();
          this.expectKeyword('interface');
          var name = this.parseName();
          var interfaces = this.parseImplementsInterfaces();
          var directives = this.parseDirectives(true);
          var fields = this.parseFieldsDefinition();
          return {
            kind: Kind.INTERFACE_TYPE_DEFINITION,
            description: description,
            name: name,
            interfaces: interfaces,
            directives: directives,
            fields: fields,
            loc: this.loc(start)
          };
        }
        /**
         * UnionTypeDefinition :
         *   - Description? union Name Directives[Const]? UnionMemberTypes?
         */
        ;
    
        _proto.parseUnionTypeDefinition = function parseUnionTypeDefinition() {
          var start = this._lexer.token;
          var description = this.parseDescription();
          this.expectKeyword('union');
          var name = this.parseName();
          var directives = this.parseDirectives(true);
          var types = this.parseUnionMemberTypes();
          return {
            kind: Kind.UNION_TYPE_DEFINITION,
            description: description,
            name: name,
            directives: directives,
            types: types,
            loc: this.loc(start)
          };
        }
        /**
         * UnionMemberTypes :
         *   - = `|`? NamedType
         *   - UnionMemberTypes | NamedType
         */
        ;
    
        _proto.parseUnionMemberTypes = function parseUnionMemberTypes() {
          return this.expectOptionalToken(TokenKind.EQUALS) ? this.delimitedMany(TokenKind.PIPE, this.parseNamedType) : [];
        }
        /**
         * EnumTypeDefinition :
         *   - Description? enum Name Directives[Const]? EnumValuesDefinition?
         */
        ;
    
        _proto.parseEnumTypeDefinition = function parseEnumTypeDefinition() {
          var start = this._lexer.token;
          var description = this.parseDescription();
          this.expectKeyword('enum');
          var name = this.parseName();
          var directives = this.parseDirectives(true);
          var values = this.parseEnumValuesDefinition();
          return {
            kind: Kind.ENUM_TYPE_DEFINITION,
            description: description,
            name: name,
            directives: directives,
            values: values,
            loc: this.loc(start)
          };
        }
        /**
         * EnumValuesDefinition : { EnumValueDefinition+ }
         */
        ;
    
        _proto.parseEnumValuesDefinition = function parseEnumValuesDefinition() {
          return this.optionalMany(TokenKind.BRACE_L, this.parseEnumValueDefinition, TokenKind.BRACE_R);
        }
        /**
         * EnumValueDefinition : Description? EnumValue Directives[Const]?
         *
         * EnumValue : Name
         */
        ;
    
        _proto.parseEnumValueDefinition = function parseEnumValueDefinition() {
          var start = this._lexer.token;
          var description = this.parseDescription();
          var name = this.parseName();
          var directives = this.parseDirectives(true);
          return {
            kind: Kind.ENUM_VALUE_DEFINITION,
            description: description,
            name: name,
            directives: directives,
            loc: this.loc(start)
          };
        }
        /**
         * InputObjectTypeDefinition :
         *   - Description? input Name Directives[Const]? InputFieldsDefinition?
         */
        ;
    
        _proto.parseInputObjectTypeDefinition = function parseInputObjectTypeDefinition() {
          var start = this._lexer.token;
          var description = this.parseDescription();
          this.expectKeyword('input');
          var name = this.parseName();
          var directives = this.parseDirectives(true);
          var fields = this.parseInputFieldsDefinition();
          return {
            kind: Kind.INPUT_OBJECT_TYPE_DEFINITION,
            description: description,
            name: name,
            directives: directives,
            fields: fields,
            loc: this.loc(start)
          };
        }
        /**
         * InputFieldsDefinition : { InputValueDefinition+ }
         */
        ;
    
        _proto.parseInputFieldsDefinition = function parseInputFieldsDefinition() {
          return this.optionalMany(TokenKind.BRACE_L, this.parseInputValueDef, TokenKind.BRACE_R);
        }
        /**
         * TypeSystemExtension :
         *   - SchemaExtension
         *   - TypeExtension
         *
         * TypeExtension :
         *   - ScalarTypeExtension
         *   - ObjectTypeExtension
         *   - InterfaceTypeExtension
         *   - UnionTypeExtension
         *   - EnumTypeExtension
         *   - InputObjectTypeDefinition
         */
        ;
    
        _proto.parseTypeSystemExtension = function parseTypeSystemExtension() {
          var keywordToken = this._lexer.lookahead();
    
          if (keywordToken.kind === TokenKind.NAME) {
            switch (keywordToken.value) {
              case 'schema':
                return this.parseSchemaExtension();
    
              case 'scalar':
                return this.parseScalarTypeExtension();
    
              case 'type':
                return this.parseObjectTypeExtension();
    
              case 'interface':
                return this.parseInterfaceTypeExtension();
    
              case 'union':
                return this.parseUnionTypeExtension();
    
              case 'enum':
                return this.parseEnumTypeExtension();
    
              case 'input':
                return this.parseInputObjectTypeExtension();
            }
          }
    
          throw this.unexpected(keywordToken);
        }
        /**
         * SchemaExtension :
         *  - extend schema Directives[Const]? { OperationTypeDefinition+ }
         *  - extend schema Directives[Const]
         */
        ;
    
        _proto.parseSchemaExtension = function parseSchemaExtension() {
          var start = this._lexer.token;
          this.expectKeyword('extend');
          this.expectKeyword('schema');
          var directives = this.parseDirectives(true);
          var operationTypes = this.optionalMany(TokenKind.BRACE_L, this.parseOperationTypeDefinition, TokenKind.BRACE_R);
    
          if (directives.length === 0 && operationTypes.length === 0) {
            throw this.unexpected();
          }
    
          return {
            kind: Kind.SCHEMA_EXTENSION,
            directives: directives,
            operationTypes: operationTypes,
            loc: this.loc(start)
          };
        }
        /**
         * ScalarTypeExtension :
         *   - extend scalar Name Directives[Const]
         */
        ;
    
        _proto.parseScalarTypeExtension = function parseScalarTypeExtension() {
          var start = this._lexer.token;
          this.expectKeyword('extend');
          this.expectKeyword('scalar');
          var name = this.parseName();
          var directives = this.parseDirectives(true);
    
          if (directives.length === 0) {
            throw this.unexpected();
          }
    
          return {
            kind: Kind.SCALAR_TYPE_EXTENSION,
            name: name,
            directives: directives,
            loc: this.loc(start)
          };
        }
        /**
         * ObjectTypeExtension :
         *  - extend type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
         *  - extend type Name ImplementsInterfaces? Directives[Const]
         *  - extend type Name ImplementsInterfaces
         */
        ;
    
        _proto.parseObjectTypeExtension = function parseObjectTypeExtension() {
          var start = this._lexer.token;
          this.expectKeyword('extend');
          this.expectKeyword('type');
          var name = this.parseName();
          var interfaces = this.parseImplementsInterfaces();
          var directives = this.parseDirectives(true);
          var fields = this.parseFieldsDefinition();
    
          if (interfaces.length === 0 && directives.length === 0 && fields.length === 0) {
            throw this.unexpected();
          }
    
          return {
            kind: Kind.OBJECT_TYPE_EXTENSION,
            name: name,
            interfaces: interfaces,
            directives: directives,
            fields: fields,
            loc: this.loc(start)
          };
        }
        /**
         * InterfaceTypeExtension :
         *  - extend interface Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
         *  - extend interface Name ImplementsInterfaces? Directives[Const]
         *  - extend interface Name ImplementsInterfaces
         */
        ;
    
        _proto.parseInterfaceTypeExtension = function parseInterfaceTypeExtension() {
          var start = this._lexer.token;
          this.expectKeyword('extend');
          this.expectKeyword('interface');
          var name = this.parseName();
          var interfaces = this.parseImplementsInterfaces();
          var directives = this.parseDirectives(true);
          var fields = this.parseFieldsDefinition();
    
          if (interfaces.length === 0 && directives.length === 0 && fields.length === 0) {
            throw this.unexpected();
          }
    
          return {
            kind: Kind.INTERFACE_TYPE_EXTENSION,
            name: name,
            interfaces: interfaces,
            directives: directives,
            fields: fields,
            loc: this.loc(start)
          };
        }
        /**
         * UnionTypeExtension :
         *   - extend union Name Directives[Const]? UnionMemberTypes
         *   - extend union Name Directives[Const]
         */
        ;
    
        _proto.parseUnionTypeExtension = function parseUnionTypeExtension() {
          var start = this._lexer.token;
          this.expectKeyword('extend');
          this.expectKeyword('union');
          var name = this.parseName();
          var directives = this.parseDirectives(true);
          var types = this.parseUnionMemberTypes();
    
          if (directives.length === 0 && types.length === 0) {
            throw this.unexpected();
          }
    
          return {
            kind: Kind.UNION_TYPE_EXTENSION,
            name: name,
            directives: directives,
            types: types,
            loc: this.loc(start)
          };
        }
        /**
         * EnumTypeExtension :
         *   - extend enum Name Directives[Const]? EnumValuesDefinition
         *   - extend enum Name Directives[Const]
         */
        ;
    
        _proto.parseEnumTypeExtension = function parseEnumTypeExtension() {
          var start = this._lexer.token;
          this.expectKeyword('extend');
          this.expectKeyword('enum');
          var name = this.parseName();
          var directives = this.parseDirectives(true);
          var values = this.parseEnumValuesDefinition();
    
          if (directives.length === 0 && values.length === 0) {
            throw this.unexpected();
          }
    
          return {
            kind: Kind.ENUM_TYPE_EXTENSION,
            name: name,
            directives: directives,
            values: values,
            loc: this.loc(start)
          };
        }
        /**
         * InputObjectTypeExtension :
         *   - extend input Name Directives[Const]? InputFieldsDefinition
         *   - extend input Name Directives[Const]
         */
        ;
    
        _proto.parseInputObjectTypeExtension = function parseInputObjectTypeExtension() {
          var start = this._lexer.token;
          this.expectKeyword('extend');
          this.expectKeyword('input');
          var name = this.parseName();
          var directives = this.parseDirectives(true);
          var fields = this.parseInputFieldsDefinition();
    
          if (directives.length === 0 && fields.length === 0) {
            throw this.unexpected();
          }
    
          return {
            kind: Kind.INPUT_OBJECT_TYPE_EXTENSION,
            name: name,
            directives: directives,
            fields: fields,
            loc: this.loc(start)
          };
        }
        /**
         * DirectiveDefinition :
         *   - Description? directive @ Name ArgumentsDefinition? `repeatable`? on DirectiveLocations
         */
        ;
    
        _proto.parseDirectiveDefinition = function parseDirectiveDefinition() {
          var start = this._lexer.token;
          var description = this.parseDescription();
          this.expectKeyword('directive');
          this.expectToken(TokenKind.AT);
          var name = this.parseName();
          var args = this.parseArgumentDefs();
          var repeatable = this.expectOptionalKeyword('repeatable');
          this.expectKeyword('on');
          var locations = this.parseDirectiveLocations();
          return {
            kind: Kind.DIRECTIVE_DEFINITION,
            description: description,
            name: name,
            arguments: args,
            repeatable: repeatable,
            locations: locations,
            loc: this.loc(start)
          };
        }
        /**
         * DirectiveLocations :
         *   - `|`? DirectiveLocation
         *   - DirectiveLocations | DirectiveLocation
         */
        ;
    
        _proto.parseDirectiveLocations = function parseDirectiveLocations() {
          return this.delimitedMany(TokenKind.PIPE, this.parseDirectiveLocation);
        }
        /*
         * DirectiveLocation :
         *   - ExecutableDirectiveLocation
         *   - TypeSystemDirectiveLocation
         *
         * ExecutableDirectiveLocation : one of
         *   `QUERY`
         *   `MUTATION`
         *   `SUBSCRIPTION`
         *   `FIELD`
         *   `FRAGMENT_DEFINITION`
         *   `FRAGMENT_SPREAD`
         *   `INLINE_FRAGMENT`
         *
         * TypeSystemDirectiveLocation : one of
         *   `SCHEMA`
         *   `SCALAR`
         *   `OBJECT`
         *   `FIELD_DEFINITION`
         *   `ARGUMENT_DEFINITION`
         *   `INTERFACE`
         *   `UNION`
         *   `ENUM`
         *   `ENUM_VALUE`
         *   `INPUT_OBJECT`
         *   `INPUT_FIELD_DEFINITION`
         */
        ;
    
        _proto.parseDirectiveLocation = function parseDirectiveLocation() {
          var start = this._lexer.token;
          var name = this.parseName();
    
          if (DirectiveLocation[name.value] !== undefined) {
            return name;
          }
    
          throw this.unexpected(start);
        } // Core parsing utility functions
    
        /**
         * Returns a location object, used to identify the place in the source that created a given parsed object.
         */
        ;
    
        _proto.loc = function loc(startToken) {
          var _this$_options4;
    
          if (((_this$_options4 = this._options) === null || _this$_options4 === void 0 ? void 0 : _this$_options4.noLocation) !== true) {
            return new Location(startToken, this._lexer.lastToken, this._lexer.source);
          }
        }
        /**
         * Determines if the next token is of a given kind
         */
        ;
    
        _proto.peek = function peek(kind) {
          return this._lexer.token.kind === kind;
        }
        /**
         * If the next token is of the given kind, return that token after advancing the lexer.
         * Otherwise, do not change the parser state and throw an error.
         */
        ;
    
        _proto.expectToken = function expectToken(kind) {
          var token = this._lexer.token;
    
          if (token.kind === kind) {
            this._lexer.advance();
    
            return token;
          }
    
          throw syntaxError(this._lexer.source, token.start, "Expected ".concat(getTokenKindDesc(kind), ", found ").concat(getTokenDesc(token), "."));
        }
        /**
         * If the next token is of the given kind, return that token after advancing the lexer.
         * Otherwise, do not change the parser state and return undefined.
         */
        ;
    
        _proto.expectOptionalToken = function expectOptionalToken(kind) {
          var token = this._lexer.token;
    
          if (token.kind === kind) {
            this._lexer.advance();
    
            return token;
          }
    
          return undefined;
        }
        /**
         * If the next token is a given keyword, advance the lexer.
         * Otherwise, do not change the parser state and throw an error.
         */
        ;
    
        _proto.expectKeyword = function expectKeyword(value) {
          var token = this._lexer.token;
    
          if (token.kind === TokenKind.NAME && token.value === value) {
            this._lexer.advance();
          } else {
            throw syntaxError(this._lexer.source, token.start, "Expected \"".concat(value, "\", found ").concat(getTokenDesc(token), "."));
          }
        }
        /**
         * If the next token is a given keyword, return "true" after advancing the lexer.
         * Otherwise, do not change the parser state and return "false".
         */
        ;
    
        _proto.expectOptionalKeyword = function expectOptionalKeyword(value) {
          var token = this._lexer.token;
    
          if (token.kind === TokenKind.NAME && token.value === value) {
            this._lexer.advance();
    
            return true;
          }
    
          return false;
        }
        /**
         * Helper function for creating an error when an unexpected lexed token is encountered.
         */
        ;
    
        _proto.unexpected = function unexpected(atToken) {
          var token = atToken !== null && atToken !== void 0 ? atToken : this._lexer.token;
          return syntaxError(this._lexer.source, token.start, "Unexpected ".concat(getTokenDesc(token), "."));
        }
        /**
         * Returns a possibly empty list of parse nodes, determined by the parseFn.
         * This list begins with a lex token of openKind and ends with a lex token of closeKind.
         * Advances the parser to the next lex token after the closing token.
         */
        ;
    
        _proto.any = function any(openKind, parseFn, closeKind) {
          this.expectToken(openKind);
          var nodes = [];
    
          while (!this.expectOptionalToken(closeKind)) {
            nodes.push(parseFn.call(this));
          }
    
          return nodes;
        }
        /**
         * Returns a list of parse nodes, determined by the parseFn.
         * It can be empty only if open token is missing otherwise it will always return non-empty list
         * that begins with a lex token of openKind and ends with a lex token of closeKind.
         * Advances the parser to the next lex token after the closing token.
         */
        ;
    
        _proto.optionalMany = function optionalMany(openKind, parseFn, closeKind) {
          if (this.expectOptionalToken(openKind)) {
            var nodes = [];
    
            do {
              nodes.push(parseFn.call(this));
            } while (!this.expectOptionalToken(closeKind));
    
            return nodes;
          }
    
          return [];
        }
        /**
         * Returns a non-empty list of parse nodes, determined by the parseFn.
         * This list begins with a lex token of openKind and ends with a lex token of closeKind.
         * Advances the parser to the next lex token after the closing token.
         */
        ;
    
        _proto.many = function many(openKind, parseFn, closeKind) {
          this.expectToken(openKind);
          var nodes = [];
    
          do {
            nodes.push(parseFn.call(this));
          } while (!this.expectOptionalToken(closeKind));
    
          return nodes;
        }
        /**
         * Returns a non-empty list of parse nodes, determined by the parseFn.
         * This list may begin with a lex token of delimiterKind followed by items separated by lex tokens of tokenKind.
         * Advances the parser to the next lex token after last item in the list.
         */
        ;
    
        _proto.delimitedMany = function delimitedMany(delimiterKind, parseFn) {
          this.expectOptionalToken(delimiterKind);
          var nodes = [];
    
          do {
            nodes.push(parseFn.call(this));
          } while (this.expectOptionalToken(delimiterKind));
    
          return nodes;
        };
    
        return Parser;
      }();
      /**
       * A helper function to describe a token as a string for debugging.
       */
    
      function getTokenDesc(token) {
        var value = token.value;
        return getTokenKindDesc(token.kind) + (value != null ? " \"".concat(value, "\"") : '');
      }
      /**
       * A helper function to describe a token kind as a string for debugging.
       */
    
    
      function getTokenKindDesc(kind) {
        return isPunctuatorTokenKind(kind) ? "\"".concat(kind, "\"") : kind;
      }
    
      const graphqlContext = {
          set,
          status,
          delay,
          fetch,
          data,
          errors,
      };
      function parseQuery(query, definitionOperation = 'query') {
          var _a;
          const ast = parse$1(query);
          const operationDef = ast.definitions.find((def) => {
              return (def.kind === 'OperationDefinition' &&
                  (definitionOperation === 'all' || def.operation === definitionOperation));
          });
          return {
              operationType: operationDef === null || operationDef === void 0 ? void 0 : operationDef.operation,
              operationName: (_a = operationDef === null || operationDef === void 0 ? void 0 : operationDef.name) === null || _a === void 0 ? void 0 : _a.value,
          };
      }
      function graphQLRequestHandler(expectedOperationType, expectedOperationName, mask, resolver) {
          return {
              resolver,
              parse(req) {
                  var _a;
                  // According to the GraphQL specification, a GraphQL request can be issued
                  // using both "GET" and "POST" methods.
                  switch (req.method) {
                      case 'GET': {
                          const query = req.url.searchParams.get('query');
                          const variablesString = req.url.searchParams.get('variables') || '';
                          if (!query) {
                              return null;
                          }
                          const variables = variablesString
                              ? jsonParse(variablesString)
                              : {};
                          const { operationType, operationName } = parseQuery(query, expectedOperationType);
                          return {
                              operationType,
                              operationName,
                              variables,
                          };
                      }
                      case 'POST': {
                          if (!((_a = req.body) === null || _a === void 0 ? void 0 : _a.query)) {
                              return null;
                          }
                          const { query, variables } = req.body;
                          const { operationType, operationName } = parseQuery(query, expectedOperationType);
                          return {
                              operationType,
                              operationName,
                              variables,
                          };
                      }
                      default:
                          return null;
                  }
              },
              getPublicRequest(req, parsed) {
                  return Object.assign(Object.assign({}, req), { variables: parsed.variables || {} });
              },
              predicate(req, parsed) {
                  if (!parsed || !parsed.operationName) {
                      return false;
                  }
                  // Match the request URL against a given mask,
                  // in case of an endpoint-specific request handler.
                  const hasMatchingMask = matchRequestUrl(req.url, mask);
                  const isMatchingOperation = expectedOperationName instanceof RegExp
                      ? expectedOperationName.test(parsed.operationName)
                      : expectedOperationName === parsed.operationName;
                  return hasMatchingMask.matches && isMatchingOperation;
              },
              defineContext() {
                  return graphqlContext;
              },
              log(req, res, handler, parsed) {
                  const { operationType, operationName } = parsed;
                  const loggedRequest = prepareRequest(req);
                  const loggedResponse = prepareResponse(res);
                  console.groupCollapsed('[MSW] %s %s (%c%s%c)', getTimestamp(), operationName, `color:${getStatusCodeColor(res.status)}`, res.status, 'color:inherit');
                  console.log('Request:', loggedRequest);
                  console.log('Handler:', {
                      operationType,
                      operationName: expectedOperationName,
                      predicate: handler.predicate,
                  });
                  console.log('Response:', loggedResponse);
                  console.groupEnd();
              },
          };
      }
      const createGraphQLScopedHandler = (expectedOperationType, mask) => {
          return (expectedOperationName, resolver) => {
              return graphQLRequestHandler(expectedOperationType, expectedOperationName, mask, resolver);
          };
      };
      const createGraphQLOperationHandler = (mask) => {
          return (resolver) => {
              return graphQLRequestHandler('all', new RegExp('.*'), mask, resolver);
          };
      };
      const graphqlStandardHandlers = {
          operation: createGraphQLOperationHandler('*'),
          query: createGraphQLScopedHandler('query', '*'),
          mutation: createGraphQLScopedHandler('mutation', '*'),
      };
      function createGraphQLLink(uri) {
          return {
              operation: createGraphQLOperationHandler(uri),
              query: createGraphQLScopedHandler('query', uri),
              mutation: createGraphQLScopedHandler('mutation', uri),
          };
      }
      const graphql = Object.assign(Object.assign({}, graphqlStandardHandlers), { link: createGraphQLLink });
    
      exports.context = index;
      exports.createResponseComposition = createResponseComposition;
      exports.defaultContext = defaultContext;
      exports.defaultResponse = defaultResponse;
      exports.graphql = graphql;
      exports.graphqlContext = graphqlContext;
      exports.matchRequestUrl = matchRequestUrl;
      exports.response = response;
      exports.rest = rest;
      exports.restContext = restContext;
      exports.setupWorker = setupWorker;
    
    })));
    
    }).call(this)}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    },{"_process":9,"node-fetch":8}],8:[function(require,module,exports){
    (function (global){(function (){
    "use strict";
    
    // ref: https://github.com/tc39/proposal-global
    var getGlobal = function () {
        // the only reliable means to get the global object is
        // `Function('return this')()`
        // However, this causes CSP violations in Chrome apps.
        if (typeof self !== 'undefined') { return self; }
        if (typeof window !== 'undefined') { return window; }
        if (typeof global !== 'undefined') { return global; }
        throw new Error('unable to locate global object');
    }
    
    var global = getGlobal();
    
    module.exports = exports = global.fetch;
    
    // Needed for TypeScript and Webpack.
    if (global.fetch) {
        exports.default = global.fetch.bind(global);
    }
    
    exports.Headers = global.Headers;
    exports.Request = global.Request;
    exports.Response = global.Response;
    }).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    },{}],9:[function(require,module,exports){
    // shim for using process in browser
    var process = module.exports = {};
    
    // cached from whatever global is present so that test runners that stub it
    // don't break things.  But we need to wrap it in a try catch in case it is
    // wrapped in strict mode code which doesn't define any globals.  It's inside a
    // function because try/catches deoptimize in certain engines.
    
    var cachedSetTimeout;
    var cachedClearTimeout;
    
    function defaultSetTimout() {
        throw new Error('setTimeout has not been defined');
    }
    function defaultClearTimeout () {
        throw new Error('clearTimeout has not been defined');
    }
    (function () {
        try {
            if (typeof setTimeout === 'function') {
                cachedSetTimeout = setTimeout;
            } else {
                cachedSetTimeout = defaultSetTimout;
            }
        } catch (e) {
            cachedSetTimeout = defaultSetTimout;
        }
        try {
            if (typeof clearTimeout === 'function') {
                cachedClearTimeout = clearTimeout;
            } else {
                cachedClearTimeout = defaultClearTimeout;
            }
        } catch (e) {
            cachedClearTimeout = defaultClearTimeout;
        }
    } ())
    function runTimeout(fun) {
        if (cachedSetTimeout === setTimeout) {
            //normal enviroments in sane situations
            return setTimeout(fun, 0);
        }
        // if setTimeout wasn't available but was latter defined
        if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
            cachedSetTimeout = setTimeout;
            return setTimeout(fun, 0);
        }
        try {
            // when when somebody has screwed with setTimeout but no I.E. maddness
            return cachedSetTimeout(fun, 0);
        } catch(e){
            try {
                // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
                return cachedSetTimeout.call(null, fun, 0);
            } catch(e){
                // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
                return cachedSetTimeout.call(this, fun, 0);
            }
        }
    
    
    }
    function runClearTimeout(marker) {
        if (cachedClearTimeout === clearTimeout) {
            //normal enviroments in sane situations
            return clearTimeout(marker);
        }
        // if clearTimeout wasn't available but was latter defined
        if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
            cachedClearTimeout = clearTimeout;
            return clearTimeout(marker);
        }
        try {
            // when when somebody has screwed with setTimeout but no I.E. maddness
            return cachedClearTimeout(marker);
        } catch (e){
            try {
                // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
                return cachedClearTimeout.call(null, marker);
            } catch (e){
                // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
                // Some versions of I.E. have different rules for clearTimeout vs setTimeout
                return cachedClearTimeout.call(this, marker);
            }
        }
    
    
    
    }
    var queue = [];
    var draining = false;
    var currentQueue;
    var queueIndex = -1;
    
    function cleanUpNextTick() {
        if (!draining || !currentQueue) {
            return;
        }
        draining = false;
        if (currentQueue.length) {
            queue = currentQueue.concat(queue);
        } else {
            queueIndex = -1;
        }
        if (queue.length) {
            drainQueue();
        }
    }
    
    function drainQueue() {
        if (draining) {
            return;
        }
        var timeout = runTimeout(cleanUpNextTick);
        draining = true;
    
        var len = queue.length;
        while(len) {
            currentQueue = queue;
            queue = [];
            while (++queueIndex < len) {
                if (currentQueue) {
                    currentQueue[queueIndex].run();
                }
            }
            queueIndex = -1;
            len = queue.length;
        }
        currentQueue = null;
        draining = false;
        runClearTimeout(timeout);
    }
    
    process.nextTick = function (fun) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
            for (var i = 1; i < arguments.length; i++) {
                args[i - 1] = arguments[i];
            }
        }
        queue.push(new Item(fun, args));
        if (queue.length === 1 && !draining) {
            runTimeout(drainQueue);
        }
    };
    
    // v8 likes predictible objects
    function Item(fun, array) {
        this.fun = fun;
        this.array = array;
    }
    Item.prototype.run = function () {
        this.fun.apply(null, this.array);
    };
    process.title = 'browser';
    process.browser = true;
    process.env = {};
    process.argv = [];
    process.version = ''; // empty string to avoid regexp issues
    process.versions = {};
    
    function noop() {}
    
    process.on = noop;
    process.addListener = noop;
    process.once = noop;
    process.off = noop;
    process.removeListener = noop;
    process.removeAllListeners = noop;
    process.emit = noop;
    process.prependListener = noop;
    process.prependOnceListener = noop;
    
    process.listeners = function (name) { return [] }
    
    process.binding = function (name) {
        throw new Error('process.binding is not supported');
    };
    
    process.cwd = function () { return '/' };
    process.chdir = function (dir) {
        throw new Error('process.chdir is not supported');
    };
    process.umask = function() { return 0; };
    
    },{}],10:[function(require,module,exports){
    'use strict';
    
    exports.__esModule = true;
    function createThunkMiddleware(extraArgument) {
      return function (_ref) {
        var dispatch = _ref.dispatch,
            getState = _ref.getState;
        return function (next) {
          return function (action) {
            if (typeof action === 'function') {
              return action(dispatch, getState, extraArgument);
            }
    
            return next(action);
          };
        };
      };
    }
    
    var thunk = createThunkMiddleware();
    thunk.withExtraArgument = createThunkMiddleware;
    
    exports['default'] = thunk;
    },{}],11:[function(require,module,exports){
    'use strict';
    
    exports.__esModule = true;
    exports.defaultMemoize = defaultMemoize;
    exports.createSelectorCreator = createSelectorCreator;
    exports.createStructuredSelector = createStructuredSelector;
    function defaultEqualityCheck(a, b) {
      return a === b;
    }
    
    function areArgumentsShallowlyEqual(equalityCheck, prev, next) {
      if (prev === null || next === null || prev.length !== next.length) {
        return false;
      }
    
      // Do this in a for loop (and not a `forEach` or an `every`) so we can determine equality as fast as possible.
      var length = prev.length;
      for (var i = 0; i < length; i++) {
        if (!equalityCheck(prev[i], next[i])) {
          return false;
        }
      }
    
      return true;
    }
    
    function defaultMemoize(func) {
      var equalityCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultEqualityCheck;
    
      var lastArgs = null;
      var lastResult = null;
      // we reference arguments instead of spreading them for performance reasons
      return function () {
        if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {
          // apply arguments instead of spreading for performance.
          lastResult = func.apply(null, arguments);
        }
    
        lastArgs = arguments;
        return lastResult;
      };
    }
    
    function getDependencies(funcs) {
      var dependencies = Array.isArray(funcs[0]) ? funcs[0] : funcs;
    
      if (!dependencies.every(function (dep) {
        return typeof dep === 'function';
      })) {
        var dependencyTypes = dependencies.map(function (dep) {
          return typeof dep;
        }).join(', ');
        throw new Error('Selector creators expect all input-selectors to be functions, ' + ('instead received the following types: [' + dependencyTypes + ']'));
      }
    
      return dependencies;
    }
    
    function createSelectorCreator(memoize) {
      for (var _len = arguments.length, memoizeOptions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        memoizeOptions[_key - 1] = arguments[_key];
      }
    
      return function () {
        for (var _len2 = arguments.length, funcs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          funcs[_key2] = arguments[_key2];
        }
    
        var recomputations = 0;
        var resultFunc = funcs.pop();
        var dependencies = getDependencies(funcs);
    
        var memoizedResultFunc = memoize.apply(undefined, [function () {
          recomputations++;
          // apply arguments instead of spreading for performance.
          return resultFunc.apply(null, arguments);
        }].concat(memoizeOptions));
    
        // If a selector is called with the exact same arguments we don't need to traverse our dependencies again.
        var selector = memoize(function () {
          var params = [];
          var length = dependencies.length;
    
          for (var i = 0; i < length; i++) {
            // apply arguments instead of spreading and mutate a local list of params for performance.
            params.push(dependencies[i].apply(null, arguments));
          }
    
          // apply arguments instead of spreading for performance.
          return memoizedResultFunc.apply(null, params);
        });
    
        selector.resultFunc = resultFunc;
        selector.dependencies = dependencies;
        selector.recomputations = function () {
          return recomputations;
        };
        selector.resetRecomputations = function () {
          return recomputations = 0;
        };
        return selector;
      };
    }
    
    var createSelector = exports.createSelector = createSelectorCreator(defaultMemoize);
    
    function createStructuredSelector(selectors) {
      var selectorCreator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : createSelector;
    
      if (typeof selectors !== 'object') {
        throw new Error('createStructuredSelector expects first argument to be an object ' + ('where each property is a selector, instead received a ' + typeof selectors));
      }
      var objectKeys = Object.keys(selectors);
      return selectorCreator(objectKeys.map(function (key) {
        return selectors[key];
      }), function () {
        for (var _len3 = arguments.length, values = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          values[_key3] = arguments[_key3];
        }
    
        return values.reduce(function (composition, value, index) {
          composition[objectKeys[index]] = value;
          return composition;
        }, {});
      });
    }
    },{}],12:[function(require,module,exports){
    "use strict";
    
    function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    
    var _react = _interopRequireWildcard(require("react"));
    
    var _reactRedux = require("react-redux");
    
    var _allRecipesSlice = require("./features/allRecipes/allRecipesSlice");
    
    var _AllRecipes = _interopRequireDefault(require("./features/allRecipes/AllRecipes"));
    
    var _FavoriteRecipes = _interopRequireDefault(require("./features/favoriteRecipes/FavoriteRecipes"));
    
    var _Search = _interopRequireDefault(require("./features/search/Search"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
    
    function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }
    
    function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
    
    function App() {
      var dispatch = (0, _reactRedux.useDispatch)();
    
      var _useSelector = (0, _reactRedux.useSelector)(function (state) {
        return state.allRecipes;
      }),
          hasError = _useSelector.hasError;
    
      (0, _react.useEffect)(function () {
        dispatch((0, _allRecipesSlice.loadRecipes)());
      }, [dispatch]);
    
      var onTryAgainHandler = function onTryAgainHandler() {
        dispatch((0, _allRecipesSlice.loadRecipes)());
      };
    
      return /*#__PURE__*/_react["default"].createElement("div", {
        id: "app"
      }, /*#__PURE__*/_react["default"].createElement("header", null, /*#__PURE__*/_react["default"].createElement(_Search["default"], null)), /*#__PURE__*/_react["default"].createElement("main", {
        id: "recipes-wrapper"
      }, hasError ? /*#__PURE__*/_react["default"].createElement("div", {
        id: "error-wrapper"
      }, /*#__PURE__*/_react["default"].createElement("h1", null, "Oh no! There was a mess in the kitchen and we couldn't get the recipes."), /*#__PURE__*/_react["default"].createElement("button", {
        onClick: onTryAgainHandler
      }, "Try again")) : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("section", {
        className: "recipes-section"
      }, /*#__PURE__*/_react["default"].createElement("h2", {
        className: "header"
      }, "Recipes"), /*#__PURE__*/_react["default"].createElement(_AllRecipes["default"], null)), /*#__PURE__*/_react["default"].createElement("section", {
        id: "favorite-recipes",
        className: "recipes-section"
      }, /*#__PURE__*/_react["default"].createElement("h2", {
        className: "header"
      }, "Favorites"), /*#__PURE__*/_react["default"].createElement(_FavoriteRecipes["default"], null)))));
    }
    
    var _default = App;
    exports["default"] = _default;
    
    },{"./features/allRecipes/AllRecipes":17,"./features/allRecipes/allRecipesSlice":18,"./features/favoriteRecipes/FavoriteRecipes":19,"./features/search/Search":21,"react":undefined,"react-redux":undefined}],13:[function(require,module,exports){
    "use strict";
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    
    var _toolkit = require("@reduxjs/toolkit");
    
    var _allRecipesSlice = _interopRequireDefault(require("../features/allRecipes/allRecipesSlice"));
    
    var _favoriteRecipesSlice = _interopRequireDefault(require("../features/favoriteRecipes/favoriteRecipesSlice"));
    
    var _searchSlice = _interopRequireDefault(require("../features/search/searchSlice"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
    
    var _default = (0, _toolkit.configureStore)({
      reducer: {
        allRecipes: _allRecipesSlice["default"],
        favoriteRecipes: _favoriteRecipesSlice["default"],
        search: _searchSlice["default"]
      }
    });
    
    exports["default"] = _default;
    
    },{"../features/allRecipes/allRecipesSlice":18,"../features/favoriteRecipes/favoriteRecipesSlice":20,"../features/search/searchSlice":22,"@reduxjs/toolkit":1}],14:[function(require,module,exports){
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
    
    },{"react":undefined}],15:[function(require,module,exports){
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
    
    },{"react":undefined}],16:[function(require,module,exports){
    "use strict";
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = Spinner;
    
    var _react = _interopRequireDefault(require("react"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
    
    var spinnerIconUrl = 'https://static-assets.codecademy.com/Courses/Learn-Redux/Recipes-App/icons/spinner.png';
    
    function Spinner() {
      return /*#__PURE__*/_react["default"].createElement("img", {
        src: spinnerIconUrl,
        alt: "Recipes are loading",
        className: "spinner"
      });
    }
    
    },{"react":undefined}],17:[function(require,module,exports){
    "use strict";
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    
    var _react = _interopRequireDefault(require("react"));
    
    var _reactRedux = require("react-redux");
    
    var _FavoriteButton = _interopRequireDefault(require("../../components/FavoriteButton"));
    
    var _Recipe = _interopRequireDefault(require("../../components/Recipe"));
    
    var _favoriteRecipesSlice = require("../favoriteRecipes/favoriteRecipesSlice");
    
    var _allRecipesSlice = require("./allRecipesSlice");
    
    var _Spinner = _interopRequireDefault(require("../../components/Spinner"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
    
    var favoriteIconURL = 'https://static-assets.codecademy.com/Courses/Learn-Redux/Recipes-App/icons/favorite.svg';
    
    var AllRecipes = function AllRecipes() {
      var dispatch = (0, _reactRedux.useDispatch)();
      var allRecipes = (0, _reactRedux.useSelector)(_allRecipesSlice.selectFilteredAllRecipes);
    
      var _useSelector = (0, _reactRedux.useSelector)(function (state) {
        return state.allRecipes;
      }),
          isLoading = _useSelector.isLoading;
    
      var onAddFavoriteRecipeHandler = function onAddFavoriteRecipeHandler(recipe) {
        dispatch((0, _favoriteRecipesSlice.addFavoriteRecipe)(recipe));
      };
    
      if (isLoading) {
        return /*#__PURE__*/_react["default"].createElement(_Spinner["default"], null);
      }
    
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "recipes-container"
      }, allRecipes.map(function (recipe) {
        return /*#__PURE__*/_react["default"].createElement(_Recipe["default"], {
          recipe: recipe,
          key: recipe.id
        }, /*#__PURE__*/_react["default"].createElement(_FavoriteButton["default"], {
          onClickHandler: function onClickHandler() {
            return onAddFavoriteRecipeHandler(recipe);
          },
          icon: favoriteIconURL
        }, "Add to Favorites"));
      }));
    };
    
    var _default = AllRecipes;
    exports["default"] = _default;
    
    },{"../../components/FavoriteButton":14,"../../components/Recipe":15,"../../components/Spinner":16,"../favoriteRecipes/favoriteRecipesSlice":20,"./allRecipesSlice":18,"react":undefined,"react-redux":undefined}],18:[function(require,module,exports){
    "use strict";
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = exports.selectFilteredAllRecipes = exports.selectAllRecipes = exports.allRecipesSlice = exports.loadRecipes = void 0;
    
    var _toolkit = require("@reduxjs/toolkit");
    
    var _favoriteRecipesSlice = require("../favoriteRecipes/favoriteRecipesSlice");
    
    var _searchSlice = require("../search/searchSlice");
    
    var _extraReducers;
    
    function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    
    function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
    
    function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
    
    // createAsyncThunk simplifies our Redux app by returning an action creator that dispatches promise lifecycle actions for us so we don't have to dispatch them ourselves.
    var loadRecipes = (0, _toolkit.createAsyncThunk)("allRecipes/getAllRecipes", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var data, json;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return fetch("api/recipes?limit=10");
    
            case 2:
              data = _context.sent;
              _context.next = 5;
              return data.json();
    
            case 5:
              json = _context.sent;
              return _context.abrupt("return", json);
    
            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    exports.loadRecipes = loadRecipes;
    var sliceOptions = {
      name: "allRecipes",
      initialState: {
        recipes: [],
        isLoading: false,
        hasError: false
      },
      reducers: {},
      extraReducers: (_extraReducers = {}, _defineProperty(_extraReducers, loadRecipes.pending, function (state, action) {
        state.isLoading = true;
        state.hasError = false;
      }), _defineProperty(_extraReducers, loadRecipes.fulfilled, function (state, action) {
        state.recipes = action.payload;
        state.isLoading = false;
        state.hasError = false;
      }), _defineProperty(_extraReducers, loadRecipes.rejected, function (state, action) {
        state.isLoading = false;
        state.hasError = true;
      }), _extraReducers)
    };
    var allRecipesSlice = (0, _toolkit.createSlice)(sliceOptions);
    exports.allRecipesSlice = allRecipesSlice;
    
    var selectAllRecipes = function selectAllRecipes(state) {
      return state.allRecipes.recipes;
    };
    
    exports.selectAllRecipes = selectAllRecipes;
    
    var selectFilteredAllRecipes = function selectFilteredAllRecipes(state) {
      var allRecipes = selectAllRecipes(state);
      var searchTerm = (0, _searchSlice.selectSearchTerm)(state);
      return allRecipes.filter(function (recipe) {
        return recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
    };
    
    exports.selectFilteredAllRecipes = selectFilteredAllRecipes;
    var _default = allRecipesSlice.reducer;
    exports["default"] = _default;
    
    },{"../favoriteRecipes/favoriteRecipesSlice":20,"../search/searchSlice":22,"@reduxjs/toolkit":1}],19:[function(require,module,exports){
    "use strict";
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    
    var _react = _interopRequireDefault(require("react"));
    
    var _reactRedux = require("react-redux");
    
    var _FavoriteButton = _interopRequireDefault(require("../../components/FavoriteButton"));
    
    var _Recipe = _interopRequireDefault(require("../../components/Recipe"));
    
    var _favoriteRecipesSlice = require("./favoriteRecipesSlice");
    
    var _Spinner = _interopRequireDefault(require("../../components/Spinner"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
    
    var unfavoriteIconUrl = 'https://static-assets.codecademy.com/Courses/Learn-Redux/Recipes-App/icons/unfavorite.svg';
    
    var FavoriteRecipes = function FavoriteRecipes() {
      var dispatch = (0, _reactRedux.useDispatch)();
      var favoriteRecipes = (0, _reactRedux.useSelector)(_favoriteRecipesSlice.selectFilteredFavoriteRecipes);
    
      var _useSelector = (0, _reactRedux.useSelector)(function (state) {
        return state.allRecipes;
      }),
          isLoading = _useSelector.isLoading;
    
      var onRemoveFavoriteRecipeHandler = function onRemoveFavoriteRecipeHandler(recipe) {
        dispatch((0, _favoriteRecipesSlice.removeFavoriteRecipe)(recipe));
      };
    
      if (isLoading) {
        return /*#__PURE__*/_react["default"].createElement(_Spinner["default"], null);
      }
    
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "recipes-container"
      }, favoriteRecipes.map(function (recipe) {
        return /*#__PURE__*/_react["default"].createElement(_Recipe["default"], {
          recipe: recipe,
          key: recipe.id
        }, /*#__PURE__*/_react["default"].createElement(_FavoriteButton["default"], {
          onClickHandler: function onClickHandler() {
            return onRemoveFavoriteRecipeHandler(recipe);
          },
          icon: unfavoriteIconUrl
        }, "Remove Favorite"));
      }));
    };
    
    var _default = FavoriteRecipes;
    exports["default"] = _default;
    
    },{"../../components/FavoriteButton":14,"../../components/Recipe":15,"../../components/Spinner":16,"./favoriteRecipesSlice":20,"react":undefined,"react-redux":undefined}],20:[function(require,module,exports){
    "use strict";
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = exports.selectFilteredFavoriteRecipes = exports.selectFavoriteRecipes = exports.removeFavoriteRecipe = exports.addFavoriteRecipe = exports.favoriteRecipesSlice = void 0;
    
    var _toolkit = require("@reduxjs/toolkit");
    
    var _searchSlice = require("../search/searchSlice");
    
    var favoriteRecipesSlice = (0, _toolkit.createSlice)({
      name: "favoriteRecipes",
      initialState: [],
      reducers: {
        addFavoriteRecipe: function addFavoriteRecipe(state, action) {
          state.push(action.payload);
        },
        removeFavoriteRecipe: function removeFavoriteRecipe(state, action) {
          return state.filter(function (recipe) {
            return recipe.name !== action.payload.name;
          });
        }
      }
    });
    exports.favoriteRecipesSlice = favoriteRecipesSlice;
    var _favoriteRecipesSlice = favoriteRecipesSlice.actions,
        addFavoriteRecipe = _favoriteRecipesSlice.addFavoriteRecipe,
        removeFavoriteRecipe = _favoriteRecipesSlice.removeFavoriteRecipe;
    exports.removeFavoriteRecipe = removeFavoriteRecipe;
    exports.addFavoriteRecipe = addFavoriteRecipe;
    
    var selectFavoriteRecipes = function selectFavoriteRecipes(state) {
      return state.favoriteRecipes;
    };
    
    exports.selectFavoriteRecipes = selectFavoriteRecipes;
    
    var selectFilteredFavoriteRecipes = function selectFilteredFavoriteRecipes(state) {
      var favoriteRecipes = selectFavoriteRecipes(state);
      var searchTerm = (0, _searchSlice.selectSearchTerm)(state);
      return favoriteRecipes.filter(function (recipe) {
        return recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
    };
    
    exports.selectFilteredFavoriteRecipes = selectFilteredFavoriteRecipes;
    var _default = favoriteRecipesSlice.reducer;
    exports["default"] = _default;
    
    },{"../search/searchSlice":22,"@reduxjs/toolkit":1}],21:[function(require,module,exports){
    "use strict";
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    
    var _react = _interopRequireDefault(require("react"));
    
    var _reactRedux = require("react-redux");
    
    var _searchSlice = require("./searchSlice");
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
    
    var searchIconUrl = 'https://static-assets.codecademy.com/Courses/Learn-Redux/Recipes-App/icons/search.svg';
    var clearIconUrl = 'https://static-assets.codecademy.com/Courses/Learn-Redux/Recipes-App/icons/clear.svg';
    
    var Search = function Search() {
      var dispatch = (0, _reactRedux.useDispatch)();
      var searchTerm = (0, _reactRedux.useSelector)(_searchSlice.selectSearchTerm);
    
      var onSearchChangeHandler = function onSearchChangeHandler(e) {
        dispatch((0, _searchSlice.setSearchTerm)(e.target.value));
      };
    
      var onSearchTermClearHandler = function onSearchTermClearHandler() {
        dispatch((0, _searchSlice.clearSearchTerm)());
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
        onChange: onSearchChangeHandler,
        placeholder: "Search recipes"
      }), searchTerm.length > 0 && /*#__PURE__*/_react["default"].createElement("button", {
        onClick: onSearchTermClearHandler,
        type: "button",
        id: "search-clear-button"
      }, /*#__PURE__*/_react["default"].createElement("img", {
        src: clearIconUrl,
        alt: ""
      })));
    };
    
    var _default = Search;
    exports["default"] = _default;
    
    },{"./searchSlice":22,"react":undefined,"react-redux":undefined}],22:[function(require,module,exports){
    "use strict";
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = exports.selectSearchTerm = exports.clearSearchTerm = exports.setSearchTerm = exports.searchSlice = void 0;
    
    var _toolkit = require("@reduxjs/toolkit");
    
    var searchSlice = (0, _toolkit.createSlice)({
      name: "search",
      initialState: "",
      reducers: {
        setSearchTerm: function setSearchTerm(state, action) {
          return state = action.payload;
        },
        clearSearchTerm: function clearSearchTerm(state) {
          return state = "";
        }
      }
    });
    exports.searchSlice = searchSlice;
    var _searchSlice$actions = searchSlice.actions,
        setSearchTerm = _searchSlice$actions.setSearchTerm,
        clearSearchTerm = _searchSlice$actions.clearSearchTerm;
    exports.clearSearchTerm = clearSearchTerm;
    exports.setSearchTerm = setSearchTerm;
    
    var selectSearchTerm = function selectSearchTerm(state) {
      return state.search;
    };
    
    exports.selectSearchTerm = selectSearchTerm;
    var _default = searchSlice.reducer;
    exports["default"] = _default;
    
    },{"@reduxjs/toolkit":1}],23:[function(require,module,exports){
    "use strict";
    
    var _react = _interopRequireDefault(require("react"));
    
    var _reactDom = _interopRequireDefault(require("react-dom"));
    
    var _App = _interopRequireDefault(require("./App"));
    
    var _store = _interopRequireDefault(require("./app/store"));
    
    var _reactRedux = require("react-redux");
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
    
    var _require = require("./mocks/browser"),
        worker = _require.worker;
    
    worker.start();
    
    _reactDom["default"].render( /*#__PURE__*/_react["default"].createElement(_react["default"].StrictMode, null, /*#__PURE__*/_react["default"].createElement(_reactRedux.Provider, {
      store: _store["default"]
    }, /*#__PURE__*/_react["default"].createElement(_App["default"], null))), document.getElementById("root"));
    
    },{"./App":12,"./app/store":13,"./mocks/browser":24,"react":undefined,"react-dom":undefined,"react-redux":undefined}],24:[function(require,module,exports){
    "use strict";
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.worker = void 0;
    
    var _msw = require("msw");
    
    var _handlers = require("./handlers");
    
    function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
    
    function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
    
    function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
    
    function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }
    
    function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
    
    function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
    
    var worker = _msw.setupWorker.apply(void 0, _toConsumableArray(_handlers.handlers));
    
    exports.worker = worker;
    
    },{"./handlers":25,"msw":7}],25:[function(require,module,exports){
    "use strict";
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.handlers = void 0;
    
    var _msw = require("msw");
    
    var _recipes = _interopRequireDefault(require("./recipes.json"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
    
    var handlers = [_msw.rest.get("/api/recipes", function (req, res, ctx) {
      return res(ctx.status(200), ctx.json(_recipes["default"]));
    })];
    exports.handlers = handlers;
    
    },{"./recipes.json":26,"msw":7}],26:[function(require,module,exports){
    module.exports=[
      {
        "id": 1,
        "name": "Cheeseburger",
        "img": "/img/cheeseburger.jpg"
      },
      {
        "id": 2,
        "name": "Dumplings",
        "img": "/img/dumplings.jpg"
      },
      {
        "id": 3,
        "name": "Ceviche",
        "img": "/img/ceviche.jpg"
      },
      {
        "id": 4,
        "name": "Spaghetti",
        "img": "/img/spaghetti.jpg"
      },
      {
        "id": 5,
        "name": "Pad Thai",
        "img": "/img/padthai.jpg"
      },
      {
        "id": 6,
        "name": "Calamari",
        "img": "/img/calamari.jpg"
      },
      {
        "id": 7,
        "name": "Pizza",
        "img": "/img/pizza.jpg"
      },
      {
        "id": 8,
        "name": "Ramen",
        "img": "/img/ramen.jpg"
      },
      {
        "id": 9,
        "name": "Biscuits",
        "img": "/img/biscuits.jpg"
      },
      {
        "id": 10,
        "name": "Sushi",
        "img": "/img/sushi.jpg"
      },
      {
        "id": 11,
        "name": "Spam musubi",
        "img": "/img/spammusubi.jpg"
      },
      {
        "id": 12,
        "name": "Fish n' chips",
        "img": "/img/fishnchips.jpg"
      },
      {
        "id": 13,
        "name": "Tacos",
        "img": "/img/tacos.jpg"
      },
      {
        "id": 14,
        "name": "Poutine",
        "img": "/img/poutine.jpg"
      },
      {
        "id": 15,
        "name": "Som tam",
        "img": "/img/somtam.jpg"
      },
      {
        "id": 16,
        "name": "Masala dosa",
        "img": "/img/masaladosa.jpg"
      },
      {
        "id": 17,
        "name": "Pho",
        "img": "/img/pho.jpg"
      },
      {
        "id": 18,
        "name": "Hummus",
        "img": "/img/hummus.jpg"
      },
      {
        "id": 19,
        "name": "Churrasco",
        "img": "/img/churrasco.jpg"
      },
      {
        "id": 20,
        "name": "Bulgogi",
        "img": "/img/bulgogi.jpg"
      }
    ]
    
    },{}]},{},[23]);
    