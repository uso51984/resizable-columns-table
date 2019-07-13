export var isFunction = function isFunction(value) {
  return Object.prototype.toString.call(value) === '[object Function]';
};
export var isArray = function isArray(value) {
  return Object.prototype.toString.call(value) === '[object Array]';
};
export var isElement = function isElement(value) {
  return Object.prototype.toString.call(value) === '[object HTMLTableElement]';
};

export var tryParseInt = function tryParseInt(value) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  var resultValue = parseInt(value, 10);

  if (isNaN(resultValue)) {
    return defaultValue;
  }
  return resultValue;
};

export function addClass(elm, className) {
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

export function removeClass(elm, className) {
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