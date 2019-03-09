export const isFunction = value => Object.prototype.toString.call(value) === '[object Function]';
export const isArray = value => Object.prototype.toString.call(value) === '[object Array]';
export const isElement = value => Object.prototype.toString.call(value) === '[object HTMLTableElement]';

export const tryParseInt = (value, defaultValue = 0) => {
  const resultValue = parseInt(value, 10);

  if (isNaN(resultValue)) {
    return defaultValue;
  }
  return resultValue;
};


export function addClass(elm, className) {
  if (!className) return;

  const els = Array.isArray(elm) ? elm : [elm];

  els.forEach((el) => {
    if (el.classList) {
      el.classList.add(className.split(' '));
    } else {
      el.className += ` ${className}`;
    }
  });
}

export function removeClass(elm, className) {
  if (!className) return;

  const els = Array.isArray(elm) ? elm : [elm];

  els.forEach((el) => {
    if (el.classList) {
      el.classList.remove(className.split(' '));
    } else {
      el.className = el.className.replace(new RegExp(`(^|\\b)${className.split(' ').join('|')}(\\b|$)`, 'gi'), ' ');
    }
  });
}
