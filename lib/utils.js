'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.













addClass = addClass;exports.













removeClass = removeClass;var isFunction = exports.isFunction = function isFunction(value) {return Object.prototype.toString.call(value) === '[object Function]';};var isArray = exports.isArray = function isArray(value) {return Object.prototype.toString.call(value) === '[object Array]';};var isElement = exports.isElement = function isElement(value) {return Object.prototype.toString.call(value) === '[object HTMLTableElement]';};var tryParseInt = exports.tryParseInt = function tryParseInt(value) {var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var resultValue = parseInt(value, 10);if (isNaN(resultValue)) {return defaultValue;}return resultValue;};function addClass(elm, className) {if (!className) return;var els = Array.isArray(elm) ? elm : [elm];els.forEach(function (el) {if (el.classList) {el.classList.add(className.split(' '));} else {el.className += ' ' + className;}});}function removeClass(elm, className) {
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