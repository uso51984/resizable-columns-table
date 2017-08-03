'use strict';exports.__esModule = true;exports.tryParseInt = undefined;exports.











addClass = addClass;exports.













removeClass = removeClass;var _parseInt = require('lodash/parseInt');var _parseInt2 = _interopRequireDefault(_parseInt);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var tryParseInt = exports.tryParseInt = function tryParseInt(value) {var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var resultValue = (0, _parseInt2.default)(value);if (isNaN(resultValue)) {return defaultValue;}return resultValue;};function addClass(elm, className) {if (!className) return;var els = Array.isArray(elm) ? elm : [elm];els.forEach(function (el) {if (el.classList) {el.classList.add(className.split(' '));} else {el.className += ' ' + className;}});}function removeClass(elm, className) {
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