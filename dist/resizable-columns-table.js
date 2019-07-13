(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["createColResizable"] = factory();
	else
		root["createColResizable"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/colResizable.js":
/*!*****************************!*\
  !*** ./src/colResizable.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var ColResizable = function () {
  function ColResizable(domElmTable) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, ColResizable);

    this.options = _extends({}, ColResizable.defaults, options);
    this.domElmTable = domElmTable;

    this.onGripMouseDown = this.onGripMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    this.init();
  }

  _createClass(ColResizable, [{
    key: 'init',
    value: function init() {
      Object(_utils__WEBPACK_IMPORTED_MODULE_0__["addClass"])(this.domElmTable, 'table-col-resizer');

      this.domElmHandleList = [];
      this.domElmTableTheadThList = [];
      this.tableWidth = this.domElmTable.offsetWidth + 'px';

      this.cellSpacing = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["tryParseInt"])(getComputedStyle(this.domElmTable).getPropertyValue('border-spacing'));
      this.borderLeftWidth = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["tryParseInt"])(getComputedStyle(this.domElmTable).getPropertyValue('border-left-width'));

      this.createGrips();
    }
  }, {
    key: 'createGrips',
    value: function createGrips() {
      var _this = this;

      var thList = this.domElmTable.querySelectorAll('thead th');

      var domElmThList = [];
      this.domElmHandleContainer = this.domElmTable.previousSibling;
      var hasHandleContainer = this.domElmHandleContainer && this.domElmHandleContainer.className === 'col-resize-container';

      if (!hasHandleContainer) {
        this.domElmTable.insertAdjacentHTML('beforebegin', '<div class="col-resize-container"/>');
        this.domElmHandleContainer = this.domElmTable.previousSibling;
      } else {
        Array.prototype.push.apply(this.domElmHandleList, this.domElmHandleContainer.childNodes);
      }

      Array.prototype.push.apply(domElmThList, thList);
      this.thLength = domElmThList.length;
      this.lastThIndex = this.thLength - 1;

      var disabledColumns = this.options.disabledColumns;


      if (!Object(_utils__WEBPACK_IMPORTED_MODULE_0__["isArray"])(disabledColumns)) {
        disabledColumns = [];
      }

      domElmThList.forEach(function (domElmTh, index) {
        var disabledColumn = disabledColumns.indexOf(index) !== -1;
        var domElmHandle = void 0;
        if (!hasHandleContainer) {
          _this.domElmHandleContainer.insertAdjacentHTML('beforeend', '<div class="drag-handle">\n          <i class="icon icon-caret-right"></i>\n          <div class="col-resizer"></div>\n          <i class="icon icon-caret-left"></i>\n        </div>');
          domElmHandle = _this.domElmHandleContainer.lastChild;
        } else {
          domElmHandle = _this.domElmHandleList[index];
        }

        if (index === _this.lastThIndex && !hasHandleContainer) {
          Object(_utils__WEBPACK_IMPORTED_MODULE_0__["addClass"])(domElmHandle, 'last-handle');
        }

        if (!disabledColumn && !hasHandleContainer) {
          domElmHandle.addEventListener('mousedown', _this.onGripMouseDown);
        } else if (disabledColumn && !hasHandleContainer) {
          Object(_utils__WEBPACK_IMPORTED_MODULE_0__["addClass"])(domElmHandle, 'disabled-drag');
        }

        domElmHandle.index = index;
        domElmTh.w = domElmTh.offsetWidth;

        domElmTh.style.width = domElmTh.offsetWidth + 'px';
        if (!hasHandleContainer) {
          _this.domElmHandleList.push(domElmHandle);
        }
        _this.domElmTableTheadThList.push(domElmTh);
      });
      this.syncGrips();
    }
  }, {
    key: 'syncGrips',
    value: function syncGrips() {
      var headerOnly = this.options.headerOnly;

      var theadHight = this.domElmTableTheadThList[0].offsetHeight;

      var height = void 0;
      if (headerOnly) {
        height = theadHight;
      } else {
        height = this.domElmTable.offsetHeight;
      }

      for (var i = 0; i < this.thLength; i += 1) {
        var domElmTh = this.domElmTableTheadThList[i];

        var left = void 0;
        if (i === 0) {
          left = domElmTh.offsetWidth + this.cellSpacing / 2;
        } else {
          var handleColLeft = this.domElmHandleList[i - 1].style.left + this.cellSpacing / 2;
          left = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["tryParseInt"])(handleColLeft) + domElmTh.offsetWidth;
        }

        this.domElmHandleList[i].style.left = left + 'px';
        this.domElmHandleList[i].style.height = height + 'px';
      }

      var domElmIconList = [];
      var iconHeight = this.domElmHandleContainer.querySelector('.col-resize-container .icon').offsetHeight;

      var domElemIcons = this.domElmHandleContainer.querySelectorAll('.col-resize-container .icon');
      Array.prototype.push.apply(domElmIconList, domElemIcons);

      domElmIconList.forEach(function (el) {
        var marginTopNumber = (theadHight - iconHeight) / 2;
        el.style.marginTop = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["tryParseInt"])(marginTopNumber) + 'px';
      });
    }
  }, {
    key: 'onGripMouseDown',
    value: function onGripMouseDown(e) {
      e.preventDefault();
      var index = e.currentTarget.index;

      var domElmHandle = this.domElmHandleList[index];

      Object(_utils__WEBPACK_IMPORTED_MODULE_0__["addClass"])(domElmHandle, 'active-drag');

      domElmHandle.initPageLeftX = e.pageX;
      domElmHandle.initLeft = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["tryParseInt"])(domElmHandle.style.left);
      domElmHandle.x = domElmHandle.initLeft;
      this.drag = domElmHandle;

      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);

      return false;
    }
  }, {
    key: 'onMouseMove',
    value: function onMouseMove(e) {
      e.preventDefault();
      if (!this.drag) {
        return false;
      }

      var defaultMinWidth = this.options.defaultMinWidth;

      var index = this.drag.index;

      var minWidth = defaultMinWidth;
      var pageLeftX = e.pageX;
      var x = pageLeftX - this.drag.initPageLeftX + this.drag.initLeft;

      var l = this.cellSpacing * 1.5 + minWidth + this.borderLeftWidth;
      var min = index ? Object(_utils__WEBPACK_IMPORTED_MODULE_0__["tryParseInt"])(this.domElmHandleList[index - 1].style.left) + this.cellSpacing + minWidth : l;

      var max = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["tryParseInt"])(this.domElmHandleList[index + 1].style.left) - this.cellSpacing - minWidth;

      x = Math.max(min, Math.min(max, x));

      var inc = x - this.drag.initLeft;
      var domElmThNow = this.domElmTableTheadThList[index];
      var domElmThElmNext = this.domElmTableTheadThList[index + 1];

      var w = domElmThNow.w + inc;
      var w2 = domElmThElmNext.w - inc;
      var minWidthOne = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["tryParseInt"])(this.domElmTableTheadThList[index].getAttribute('data-min-width'));
      var minWidthTwo = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["tryParseInt"])(this.domElmTableTheadThList[index + 1].getAttribute('data-min-width'));

      if (minWidthOne > w) {
        x = minWidthOne - domElmThNow.w + this.drag.initLeft;
      } else if (minWidthTwo > w2) {
        x = domElmThElmNext.w - minWidthTwo + this.drag.initLeft;
      }

      this.drag.x = x;
      this.drag.style.left = x + 'px';

      if (this.options.liveDrag) {
        this.syncCols(index);
        this.syncGrips();
        var onResizing = this.options.onResizing;


        if (Object(_utils__WEBPACK_IMPORTED_MODULE_0__["isFunction"])(onResizing)) {
          onResizing(e);
        }
      }

      return false;
    }
  }, {
    key: 'syncCols',
    value: function syncCols(i, isOver) {
      var inc = this.drag.x - this.drag.initLeft;
      var domElmThNow = this.domElmTableTheadThList[i];
      var domElmThNext = this.domElmTableTheadThList[i + 1];

      var w = domElmThNow.w + inc;
      var w2 = domElmThNext.w - inc;

      domElmThNow.style.width = w + 'px';
      domElmThNext.style.width = w2 + 'px';

      if (isOver) {
        domElmThNow.w = w;
        domElmThNext.w = w2;
      }
    }
  }, {
    key: 'onMouseUp',
    value: function onMouseUp(e) {
      document.removeEventListener('mouseup', this.onMouseUp);
      document.removeEventListener('mousemove', this.onMouseMove);

      if (!this.drag) {
        return false;
      }

      Object(_utils__WEBPACK_IMPORTED_MODULE_0__["removeClass"])(this.drag, 'active-drag');
      if (!(this.drag.x - this.drag.initLeft === 0)) {
        var index = this.drag.index;
        this.syncCols(index, true);
        this.syncGrips();

        var onResized = this.options.onResized;

        if (Object(_utils__WEBPACK_IMPORTED_MODULE_0__["isFunction"])(onResized)) {
          onResized(e);
        }
      }
      this.drag = null;

      return true;
    }
  }]);

  return ColResizable;
}();

ColResizable.defaults = {
  liveDrag: true,
  defaultMinWidth: 30,
  headerOnly: true,
  disabledColumns: [],
  onResizing: null,
  onResized: null
};
/* harmony default export */ __webpack_exports__["default"] = (ColResizable);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.js");
/* harmony import */ var _colResizable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./colResizable */ "./src/colResizable.js");



var createColResizable = function createColResizable(domEleTable, options) {
  if (Object(_utils__WEBPACK_IMPORTED_MODULE_0__["isElement"])(domEleTable) && domEleTable.nodeName === 'TABLE') {
    return domEleTable.__resizable || (domEleTable.__resizable = new _colResizable__WEBPACK_IMPORTED_MODULE_1__["default"](domEleTable, options));
  }

  return null;
};

/* harmony default export */ __webpack_exports__["default"] = (createColResizable);

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: isFunction, isArray, isElement, tryParseInt, addClass, removeClass */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFunction", function() { return isFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isArray", function() { return isArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isElement", function() { return isElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tryParseInt", function() { return tryParseInt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addClass", function() { return addClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeClass", function() { return removeClass; });
var isFunction = function isFunction(value) {
  return Object.prototype.toString.call(value) === '[object Function]';
};
var isArray = function isArray(value) {
  return Object.prototype.toString.call(value) === '[object Array]';
};
var isElement = function isElement(value) {
  return Object.prototype.toString.call(value) === '[object HTMLTableElement]';
};

var tryParseInt = function tryParseInt(value) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  var resultValue = parseInt(value, 10);

  if (isNaN(resultValue)) {
    return defaultValue;
  }
  return resultValue;
};

function addClass(elm, className) {
  if (!className) return;

  var els = Array.isArray(elm) ? elm : [elm];

  els.forEach(function (el) {
    if (el.classList) {
      el.classList.add(className.split(' '));
    } else {
      el.className += ' ' + className;
    }
  });
}

function removeClass(elm, className) {
  if (!className) return;

  var els = Array.isArray(elm) ? elm : [elm];

  els.forEach(function (el) {
    if (el.classList) {
      el.classList.remove(className.split(' '));
    } else {
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  });
}

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/index.js */"./src/index.js");


/***/ })

/******/ })["default"];
});
//# sourceMappingURL=resizable-columns-table.js.map