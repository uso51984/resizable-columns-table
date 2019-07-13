var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import { tryParseInt, isFunction, isArray, removeClass, addClass } from './utils';

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
      addClass(this.domElmTable, 'table-col-resizer');

      this.domElmHandleList = [];
      this.domElmTableTheadThList = [];
      this.tableWidth = this.domElmTable.offsetWidth + 'px';

      this.cellSpacing = tryParseInt(getComputedStyle(this.domElmTable).getPropertyValue('border-spacing'));
      this.borderLeftWidth = tryParseInt(getComputedStyle(this.domElmTable).getPropertyValue('border-left-width'));

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


      if (!isArray(disabledColumns)) {
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
          addClass(domElmHandle, 'last-handle');
        }

        if (!disabledColumn && !hasHandleContainer) {
          domElmHandle.addEventListener('mousedown', _this.onGripMouseDown);
        } else if (disabledColumn && !hasHandleContainer) {
          addClass(domElmHandle, 'disabled-drag');
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
          left = tryParseInt(handleColLeft) + domElmTh.offsetWidth;
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
        el.style.marginTop = tryParseInt(marginTopNumber) + 'px';
      });
    }
  }, {
    key: 'onGripMouseDown',
    value: function onGripMouseDown(e) {
      e.preventDefault();
      var index = e.currentTarget.index;

      var domElmHandle = this.domElmHandleList[index];

      addClass(domElmHandle, 'active-drag');

      domElmHandle.initPageLeftX = e.pageX;
      domElmHandle.initLeft = tryParseInt(domElmHandle.style.left);
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
      var min = index ? tryParseInt(this.domElmHandleList[index - 1].style.left) + this.cellSpacing + minWidth : l;

      var max = tryParseInt(this.domElmHandleList[index + 1].style.left) - this.cellSpacing - minWidth;

      x = Math.max(min, Math.min(max, x));

      var inc = x - this.drag.initLeft;
      var domElmThNow = this.domElmTableTheadThList[index];
      var domElmThElmNext = this.domElmTableTheadThList[index + 1];

      var w = domElmThNow.w + inc;
      var w2 = domElmThElmNext.w - inc;
      var minWidthOne = tryParseInt(this.domElmTableTheadThList[index].getAttribute('data-min-width'));
      var minWidthTwo = tryParseInt(this.domElmTableTheadThList[index + 1].getAttribute('data-min-width'));

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


        if (isFunction(onResizing)) {
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

      removeClass(this.drag, 'active-drag');
      if (!(this.drag.x - this.drag.initLeft === 0)) {
        var index = this.drag.index;
        this.syncCols(index, true);
        this.syncGrips();

        var onResized = this.options.onResized;

        if (isFunction(onResized)) {
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
export default ColResizable;