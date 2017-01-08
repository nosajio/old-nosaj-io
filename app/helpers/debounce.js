import {default as _} from 'lodash/core';

let timer = null;

export default function debounce (time, callback) {
  if (! _.isNumber(time) || ! _.isFunction(callback)) {
    throw new TypeError('debounce(time <String>, callback <Function>) both arguments are required');
  }
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(callback, time);
}
