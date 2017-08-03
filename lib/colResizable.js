'use strict';exports.__esModule = true;var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);
var _isArray = require('lodash/isArray');var _isArray2 = _interopRequireDefault(_isArray);
var _utils = require('./utils');





require('./index.less');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var

ColResizable = function () {









  function ColResizable(domElmTable) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};(0, _classCallCheck3.default)(this, ColResizable);
    this.options = (0, _extends3.default)({}, ColResizable.defaults, options);
    this.domElmTable = domElmTable;

    this.onGripMouseDown = this.onGripMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    this.init();
  }ColResizable.prototype.

  init = function init() {
    (0, _utils.addClass)(this.domElmTable, 'table-col-resizer');

    this.domElmHandleList = [];
    this.domElmTableTheadThList = [];
    this.tableWidth = this.domElmTable.offsetWidth + 'px';

    this.cellSpacing = (0, _utils.tryParseInt)(getComputedStyle(this.domElmTable).getPropertyValue('border-spacing'));
    this.borderLeftWidth = (0, _utils.tryParseInt)(getComputedStyle(this.domElmTable).getPropertyValue('border-left-width'));

    this.createGrips();
  };ColResizable.prototype.

  createGrips = function createGrips() {var _this = this;
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
    this.lastThIndex = this.thLength - 1;var

    disabledColumns = this.options.disabledColumns;

    if (!(0, _isArray2.default)(disabledColumns)) {
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
        (0, _utils.addClass)(domElmHandle, 'last-handle');
      }

      if (!disabledColumn && !hasHandleContainer) {
        domElmHandle.addEventListener('mousedown', _this.onGripMouseDown);
      } else if (disabledColumn && !hasHandleContainer) {
        (0, _utils.addClass)(domElmHandle, 'disabled-drag');
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
  };ColResizable.prototype.

  syncGrips = function syncGrips() {var
    headerOnly = this.options.headerOnly;
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
        left = (0, _utils.tryParseInt)(handleColLeft) + domElmTh.offsetWidth;
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
      el.style.marginTop = (0, _utils.tryParseInt)(marginTopNumber) + 'px';
    });
  };ColResizable.prototype.

  onGripMouseDown = function onGripMouseDown(e) {
    e.preventDefault();var
    index = e.currentTarget.index;
    var domElmHandle = this.domElmHandleList[index];

    (0, _utils.addClass)(domElmHandle, 'active-drag');

    domElmHandle.initPageLeftX = e.pageX;
    domElmHandle.initLeft = (0, _utils.tryParseInt)(domElmHandle.style.left);
    domElmHandle.x = domElmHandle.initLeft;
    this.drag = domElmHandle;

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);

    return false;
  };ColResizable.prototype.

  onMouseMove = function onMouseMove(e) {
    e.preventDefault();
    if (!this.drag) {
      return false;
    }var

    defaultMinWidth = this.options.defaultMinWidth;
    var index = this.drag.index;

    var minWidth = defaultMinWidth;
    var pageLeftX = e.pageX;
    var x = pageLeftX - this.drag.initPageLeftX + this.drag.initLeft;

    var l = this.cellSpacing * 1.5 + minWidth + this.borderLeftWidth;
    var min = index ? (0, _utils.tryParseInt)(this.domElmHandleList[index - 1].style.left) +
    this.cellSpacing + minWidth : l;

    var max = (0, _utils.tryParseInt)(this.domElmHandleList[index + 1].style.left) -
    this.cellSpacing - minWidth;

    x = Math.max(min, Math.min(max, x));

    var inc = x - this.drag.initLeft;
    var domElmThNow = this.domElmTableTheadThList[index];
    var domElmThElmNext = this.domElmTableTheadThList[index + 1];

    var w = domElmThNow.w + inc;
    var w2 = domElmThElmNext.w - inc;
    var minWidthOne = (0, _utils.tryParseInt)(this.domElmTableTheadThList[index].getAttribute('data-min-width'));
    var minWidthTwo = (0, _utils.tryParseInt)(this.domElmTableTheadThList[index + 1].getAttribute('data-min-width'));

    if (minWidthOne > w) {
      x = minWidthOne - domElmThNow.w + this.drag.initLeft;
    } else if (minWidthTwo > w2) {
      x = domElmThElmNext.w - minWidthTwo + this.drag.initLeft;
    }

    this.drag.x = x;
    this.drag.style.left = x + 'px';

    if (this.options.liveDrag) {
      this.syncCols(index);
      this.syncGrips();var
      onResizing = this.options.onResizing;

      if ((0, _isFunction2.default)(onResizing)) {
        onResizing(e);
      }
    }

    return false;
  };ColResizable.prototype.

  syncCols = function syncCols(i, isOver) {
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
  };ColResizable.prototype.

  onMouseUp = function onMouseUp(e) {
    document.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('mousemove', this.onMouseMove);

    if (!this.drag) {
      return false;
    }

    (0, _utils.removeClass)(this.drag, 'active-drag');
    if (!(this.drag.x - this.drag.initLeft === 0)) {
      var index = this.drag.index;
      this.syncCols(index, true);
      this.syncGrips();var

      onResized = this.options.onResized;
      if ((0, _isFunction2.default)(onResized)) {
        onResized(e);
      }
    }
    this.drag = null;

    return true;
  };return ColResizable;}();ColResizable.defaults = { liveDrag: true, defaultMinWidth: 30, headerOnly: true, disabledColumns: [], onResizing: null, onResized: null };exports.default = ColResizable;module.exports = exports['default'];