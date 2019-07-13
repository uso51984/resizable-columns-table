import { isElement } from './utils';
import ColResizable from './colResizable';

var createColResizable = function createColResizable(domEleTable, options) {
  if (isElement(domEleTable) && domEleTable.nodeName === 'TABLE') {
    return domEleTable.__resizable || (domEleTable.__resizable = new ColResizable(domEleTable, options));
  }

  return null;
};

export default createColResizable;