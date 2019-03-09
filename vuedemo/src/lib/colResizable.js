import {
  tryParseInt,
  isFunction,
  isArray,
  removeClass,
  addClass
} from './utils';

export default class ColResizable {
  static defaults = {
    liveDrag: true,
    defaultMinWidth: 30,
    headerOnly: true,
    disabledColumns: [],
    onResizing: null,
    onResized: null
  };

  constructor(domElmTable, options = {}) {
    this.options = { ...ColResizable.defaults, ...options };
    this.domElmTable = domElmTable;

    this.onGripMouseDown = this.onGripMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    this.init();
  }

  init() {
    addClass(this.domElmTable, 'table-col-resizer');

    this.domElmHandleList = [];
    this.domElmTableTheadThList = [];
    this.tableWidth = `${this.domElmTable.offsetWidth}px`;

    this.cellSpacing = tryParseInt(getComputedStyle(this.domElmTable).getPropertyValue('border-spacing'));
    this.borderLeftWidth = tryParseInt(getComputedStyle(this.domElmTable).getPropertyValue('border-left-width'));

    this.createGrips();
  }

  createGrips() {
    const thList = this.domElmTable.querySelectorAll('thead th');

    const domElmThList = [];
    this.domElmHandleContainer = this.domElmTable.previousSibling;
    const hasHandleContainer = this.domElmHandleContainer && this.domElmHandleContainer.className === 'col-resize-container';

    if (!hasHandleContainer) {
      this.domElmTable.insertAdjacentHTML('beforebegin', '<div class="col-resize-container"/>');
      this.domElmHandleContainer = this.domElmTable.previousSibling;
    } else {
      Array.prototype.push.apply(this.domElmHandleList, this.domElmHandleContainer.childNodes);
    }

    Array.prototype.push.apply(domElmThList, thList);
    this.thLength = domElmThList.length;
    this.lastThIndex = this.thLength - 1;

    let { disabledColumns } = this.options;

    if (!isArray(disabledColumns)) {
      disabledColumns = [];
    }

    domElmThList.forEach((domElmTh, index) => {
      const disabledColumn = disabledColumns.indexOf(index) !== -1;
      let domElmHandle;
      if (!hasHandleContainer) {
        this.domElmHandleContainer.insertAdjacentHTML('beforeend',
        `<div class="drag-handle">
          <i class="icon icon-caret-right"></i>
          <div class="col-resizer"></div>
          <i class="icon icon-caret-left"></i>
        </div>`
        );
        domElmHandle = this.domElmHandleContainer.lastChild;
      } else {
        domElmHandle = this.domElmHandleList[index];
      }

      if (index === this.lastThIndex && !hasHandleContainer) {
        addClass(domElmHandle, 'last-handle');
      }

      if (!disabledColumn && !hasHandleContainer) {
        domElmHandle.addEventListener('mousedown', this.onGripMouseDown);
      } else if (disabledColumn && !hasHandleContainer) {
        addClass(domElmHandle, 'disabled-drag');
      }

      domElmHandle.index = index;
      domElmTh.w = domElmTh.offsetWidth;

      domElmTh.style.width = `${domElmTh.offsetWidth}px`;
      if (!hasHandleContainer) {
        this.domElmHandleList.push(domElmHandle);
      }
      this.domElmTableTheadThList.push(domElmTh);
    });
    this.syncGrips();
  }

  syncGrips() {
    const { headerOnly } = this.options;
    const theadHight = this.domElmTableTheadThList[0].offsetHeight;

    let height;
    if (headerOnly) {
      height = theadHight;
    } else {
      height = this.domElmTable.offsetHeight;
    }

    for (let i = 0; i < this.thLength; i += 1) {
      const domElmTh = this.domElmTableTheadThList[i];

      let left;
      if (i === 0) {
        left = domElmTh.offsetWidth + (this.cellSpacing / 2);
      } else {
        const handleColLeft = this.domElmHandleList[i - 1].style.left + (this.cellSpacing / 2);
        left = tryParseInt(handleColLeft) + domElmTh.offsetWidth;
      }

      this.domElmHandleList[i].style.left = `${left}px`;
      this.domElmHandleList[i].style.height = `${height}px`;
    }

    const domElmIconList = [];
    const iconHeight = this.domElmHandleContainer.querySelector('.col-resize-container .icon').offsetHeight;

    const domElemIcons = this.domElmHandleContainer.querySelectorAll('.col-resize-container .icon');
    Array.prototype.push.apply(domElmIconList, domElemIcons);

    domElmIconList.forEach((el) => {
      const marginTopNumber = (theadHight - iconHeight) / 2;
      el.style.marginTop = `${tryParseInt(marginTopNumber)}px`;
    });
  }

  onGripMouseDown(e) {
    e.preventDefault();
    const { index } = e.currentTarget;
    const domElmHandle = this.domElmHandleList[index];

    addClass(domElmHandle, 'active-drag');

    domElmHandle.initPageLeftX = e.pageX;
    domElmHandle.initLeft = tryParseInt(domElmHandle.style.left);
    domElmHandle.x = domElmHandle.initLeft;
    this.drag = domElmHandle;

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);

    return false;
  }

  onMouseMove(e) {
    e.preventDefault();
    if (!this.drag) {
      return false;
    }

    const { defaultMinWidth } = this.options;
    const index = this.drag.index;

    const minWidth = defaultMinWidth;
    const pageLeftX = e.pageX;
    let x = (pageLeftX - this.drag.initPageLeftX) + this.drag.initLeft;

    const l = (this.cellSpacing * 1.5) + minWidth + this.borderLeftWidth;
    const min = index ? tryParseInt(this.domElmHandleList[index - 1].style.left)
      + this.cellSpacing + minWidth : l;

    const max = tryParseInt(this.domElmHandleList[index + 1].style.left)
      - this.cellSpacing - minWidth;

    x = Math.max(min, Math.min(max, x));

    const inc = x - this.drag.initLeft;
    const domElmThNow = this.domElmTableTheadThList[index];
    const domElmThElmNext = this.domElmTableTheadThList[index + 1];

    const w = domElmThNow.w + inc;
    const w2 = domElmThElmNext.w - inc;
    const minWidthOne = tryParseInt(this.domElmTableTheadThList[index].getAttribute('data-min-width'));
    const minWidthTwo = tryParseInt(this.domElmTableTheadThList[index + 1].getAttribute('data-min-width'));

    if (minWidthOne > w) {
      x = (minWidthOne - domElmThNow.w) + this.drag.initLeft;
    } else if (minWidthTwo > w2) {
      x = (domElmThElmNext.w - minWidthTwo) + this.drag.initLeft;
    }

    this.drag.x = x;
    this.drag.style.left = `${x}px`;

    if (this.options.liveDrag) {
      this.syncCols(index);
      this.syncGrips();
      const { onResizing } = this.options;

      if (isFunction(onResizing)) {
        onResizing(e);
      }
    }

    return false;
  }

  syncCols(i, isOver) {
    const inc = this.drag.x - this.drag.initLeft;
    const domElmThNow = this.domElmTableTheadThList[i];
    const domElmThNext = this.domElmTableTheadThList[i + 1];

    const w = domElmThNow.w + inc;
    const w2 = domElmThNext.w - inc;

    domElmThNow.style.width = `${w}px`;
    domElmThNext.style.width = `${w2}px`;

    if (isOver) {
      domElmThNow.w = w;
      domElmThNext.w = w2;
    }
  }

  onMouseUp(e) {
    document.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('mousemove', this.onMouseMove);

    if (!this.drag) {
      return false;
    }

    removeClass(this.drag, 'active-drag');
    if (!(this.drag.x - this.drag.initLeft === 0)) {
      const index = this.drag.index;
      this.syncCols(index, true);
      this.syncGrips();

      const { onResized } = this.options;
      if (isFunction(onResized)) {
        onResized(e);
      }
    }
    this.drag = null;

    return true;
  }
}
