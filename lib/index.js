'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('./utils');

var _colResizable = require('./colResizable');

var _colResizable2 = _interopRequireDefault(_colResizable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var createColResizable = function createColResizable(domEleTable, options) {
  if ((0, _utils.isElement)(domEleTable) && domEleTable.nodeName === 'TABLE') {
    return domEleTable.__resizable || (domEleTable.__resizable = new _colResizable2['default'](domEleTable, options));
  }

  return null;
};

exports['default'] = createColResizable;
module.exports = exports['default'];