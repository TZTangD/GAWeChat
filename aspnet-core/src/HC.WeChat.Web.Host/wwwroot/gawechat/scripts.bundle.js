/**
 * Swiper 4.2.2
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * http://www.idangero.us/swiper/
 *
 * Copyright 2014-2018 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: April 1, 2018
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Swiper = factory());
}(this, (function () { 'use strict';

/**
 * SSR Window 1.0.0
 * Better handling for window object in SSR environment
 * https://github.com/nolimits4web/ssr-window
 *
 * Copyright 2018, Vladimir Kharlampidi
 *
 * Licensed under MIT
 *
 * Released on: February 10, 2018
 */
var d;
if (typeof document === 'undefined') {
  d = {
    body: {},
    addEventListener: function addEventListener() {},
    removeEventListener: function removeEventListener() {},
    activeElement: {
      blur: function blur() {},
      nodeName: '',
    },
    querySelector: function querySelector() {
      return null;
    },
    querySelectorAll: function querySelectorAll() {
      return [];
    },
    getElementById: function getElementById() {
      return null;
    },
    createEvent: function createEvent() {
      return {
        initEvent: function initEvent() {},
      };
    },
    createElement: function createElement() {
      return {
        children: [],
        childNodes: [],
        style: {},
        setAttribute: function setAttribute() {},
        getElementsByTagName: function getElementsByTagName() {
          return [];
        },
      };
    },
    location: { hash: '' },
  };
} else {
  // eslint-disable-next-line
  d = document;
}

var doc = d;

var w;
if (typeof window === 'undefined') {
  w = {
    document: doc,
    navigator: {
      userAgent: '',
    },
    location: {},
    history: {},
    CustomEvent: function CustomEvent() {
      return this;
    },
    addEventListener: function addEventListener() {},
    removeEventListener: function removeEventListener() {},
    getComputedStyle: function getComputedStyle() {
      return {
        getPropertyValue: function getPropertyValue() {
          return '';
        },
      };
    },
    Image: function Image() {},
    Date: function Date() {},
    screen: {},
    setTimeout: function setTimeout() {},
    clearTimeout: function clearTimeout() {},
  };
} else {
  // eslint-disable-next-line
  w = window;
}

var win = w;

/**
 * Dom7 2.0.3
 * Minimalistic JavaScript library for DOM manipulation, with a jQuery-compatible API
 * http://framework7.io/docs/dom.html
 *
 * Copyright 2018, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under MIT
 *
 * Released on: February 21, 2018
 */

var Dom7 = function Dom7(arr) {
  var self = this;
  // Create array-like object
  for (var i = 0; i < arr.length; i += 1) {
    self[i] = arr[i];
  }
  self.length = arr.length;
  // Return collection with methods
  return this;
};

function $(selector, context) {
  var arr = [];
  var i = 0;
  if (selector && !context) {
    if (selector instanceof Dom7) {
      return selector;
    }
  }
  if (selector) {
      // String
    if (typeof selector === 'string') {
      var els;
      var tempParent;
      var html = selector.trim();
      if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
        var toCreate = 'div';
        if (html.indexOf('<li') === 0) { toCreate = 'ul'; }
        if (html.indexOf('<tr') === 0) { toCreate = 'tbody'; }
        if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) { toCreate = 'tr'; }
        if (html.indexOf('<tbody') === 0) { toCreate = 'table'; }
        if (html.indexOf('<option') === 0) { toCreate = 'select'; }
        tempParent = doc.createElement(toCreate);
        tempParent.innerHTML = html;
        for (i = 0; i < tempParent.childNodes.length; i += 1) {
          arr.push(tempParent.childNodes[i]);
        }
      } else {
        if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
          // Pure ID selector
          els = [doc.getElementById(selector.trim().split('#')[1])];
        } else {
          // Other selectors
          els = (context || doc).querySelectorAll(selector.trim());
        }
        for (i = 0; i < els.length; i += 1) {
          if (els[i]) { arr.push(els[i]); }
        }
      }
    } else if (selector.nodeType || selector === win || selector === doc) {
      // Node/element
      arr.push(selector);
    } else if (selector.length > 0 && selector[0].nodeType) {
      // Array of elements or instance of Dom
      for (i = 0; i < selector.length; i += 1) {
        arr.push(selector[i]);
      }
    }
  }
  return new Dom7(arr);
}

$.fn = Dom7.prototype;
$.Class = Dom7;
$.Dom7 = Dom7;

function unique(arr) {
  var uniqueArray = [];
  for (var i = 0; i < arr.length; i += 1) {
    if (uniqueArray.indexOf(arr[i]) === -1) { uniqueArray.push(arr[i]); }
  }
  return uniqueArray;
}

// Classes and attributes
function addClass(className) {
  var this$1 = this;

  if (typeof className === 'undefined') {
    return this;
  }
  var classes = className.split(' ');
  for (var i = 0; i < classes.length; i += 1) {
    for (var j = 0; j < this.length; j += 1) {
      if (typeof this$1[j].classList !== 'undefined') { this$1[j].classList.add(classes[i]); }
    }
  }
  return this;
}
function removeClass(className) {
  var this$1 = this;

  var classes = className.split(' ');
  for (var i = 0; i < classes.length; i += 1) {
    for (var j = 0; j < this.length; j += 1) {
      if (typeof this$1[j].classList !== 'undefined') { this$1[j].classList.remove(classes[i]); }
    }
  }
  return this;
}
function hasClass(className) {
  if (!this[0]) { return false; }
  return this[0].classList.contains(className);
}
function toggleClass(className) {
  var this$1 = this;

  var classes = className.split(' ');
  for (var i = 0; i < classes.length; i += 1) {
    for (var j = 0; j < this.length; j += 1) {
      if (typeof this$1[j].classList !== 'undefined') { this$1[j].classList.toggle(classes[i]); }
    }
  }
  return this;
}
function attr(attrs, value) {
  var arguments$1 = arguments;
  var this$1 = this;

  if (arguments.length === 1 && typeof attrs === 'string') {
    // Get attr
    if (this[0]) { return this[0].getAttribute(attrs); }
    return undefined;
  }

  // Set attrs
  for (var i = 0; i < this.length; i += 1) {
    if (arguments$1.length === 2) {
      // String
      this$1[i].setAttribute(attrs, value);
    } else {
      // Object
      // eslint-disable-next-line
      for (var attrName in attrs) {
        this$1[i][attrName] = attrs[attrName];
        this$1[i].setAttribute(attrName, attrs[attrName]);
      }
    }
  }
  return this;
}
// eslint-disable-next-line
function removeAttr(attr) {
  var this$1 = this;

  for (var i = 0; i < this.length; i += 1) {
    this$1[i].removeAttribute(attr);
  }
  return this;
}
function data(key, value) {
  var this$1 = this;

  var el;
  if (typeof value === 'undefined') {
    el = this[0];
    // Get value
    if (el) {
      if (el.dom7ElementDataStorage && (key in el.dom7ElementDataStorage)) {
        return el.dom7ElementDataStorage[key];
      }

      var dataKey = el.getAttribute(("data-" + key));
      if (dataKey) {
        return dataKey;
      }
      return undefined;
    }
    return undefined;
  }

  // Set value
  for (var i = 0; i < this.length; i += 1) {
    el = this$1[i];
    if (!el.dom7ElementDataStorage) { el.dom7ElementDataStorage = {}; }
    el.dom7ElementDataStorage[key] = value;
  }
  return this;
}
// Transforms
// eslint-disable-next-line
function transform(transform) {
  var this$1 = this;

  for (var i = 0; i < this.length; i += 1) {
    var elStyle = this$1[i].style;
    elStyle.webkitTransform = transform;
    elStyle.transform = transform;
  }
  return this;
}
function transition(duration) {
  var this$1 = this;

  if (typeof duration !== 'string') {
    duration = duration + "ms"; // eslint-disable-line
  }
  for (var i = 0; i < this.length; i += 1) {
    var elStyle = this$1[i].style;
    elStyle.webkitTransitionDuration = duration;
    elStyle.transitionDuration = duration;
  }
  return this;
}
// Events
function on() {
  var this$1 = this;
  var assign;

  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];
  var eventType = args[0];
  var targetSelector = args[1];
  var listener = args[2];
  var capture = args[3];
  if (typeof args[1] === 'function') {
    (assign = args, eventType = assign[0], listener = assign[1], capture = assign[2]);
    targetSelector = undefined;
  }
  if (!capture) { capture = false; }

  function handleLiveEvent(e) {
    var target = e.target;
    if (!target) { return; }
    var eventData = e.target.dom7EventData || [];
    eventData.unshift(e);
    if ($(target).is(targetSelector)) { listener.apply(target, eventData); }
    else {
      var parents = $(target).parents(); // eslint-disable-line
      for (var k = 0; k < parents.length; k += 1) {
        if ($(parents[k]).is(targetSelector)) { listener.apply(parents[k], eventData); }
      }
    }
  }
  function handleEvent(e) {
    var eventData = e && e.target ? e.target.dom7EventData || [] : [];
    eventData.unshift(e);
    listener.apply(this, eventData);
  }
  var events = eventType.split(' ');
  var j;
  for (var i = 0; i < this.length; i += 1) {
    var el = this$1[i];
    if (!targetSelector) {
      for (j = 0; j < events.length; j += 1) {
        if (!el.dom7Listeners) { el.dom7Listeners = []; }
        el.dom7Listeners.push({
          type: eventType,
          listener: listener,
          proxyListener: handleEvent,
        });
        el.addEventListener(events[j], handleEvent, capture);
      }
    } else {
      // Live events
      for (j = 0; j < events.length; j += 1) {
        if (!el.dom7LiveListeners) { el.dom7LiveListeners = []; }
        el.dom7LiveListeners.push({
          type: eventType,
          listener: listener,
          proxyListener: handleLiveEvent,
        });
        el.addEventListener(events[j], handleLiveEvent, capture);
      }
    }
  }
  return this;
}
function off() {
  var this$1 = this;
  var assign;

  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];
  var eventType = args[0];
  var targetSelector = args[1];
  var listener = args[2];
  var capture = args[3];
  if (typeof args[1] === 'function') {
    (assign = args, eventType = assign[0], listener = assign[1], capture = assign[2]);
    targetSelector = undefined;
  }
  if (!capture) { capture = false; }

  var events = eventType.split(' ');
  for (var i = 0; i < events.length; i += 1) {
    for (var j = 0; j < this.length; j += 1) {
      var el = this$1[j];
      if (!targetSelector) {
        if (el.dom7Listeners) {
          for (var k = 0; k < el.dom7Listeners.length; k += 1) {
            if (listener) {
              if (el.dom7Listeners[k].listener === listener) {
                el.removeEventListener(events[i], el.dom7Listeners[k].proxyListener, capture);
              }
            } else if (el.dom7Listeners[k].type === events[i]) {
              el.removeEventListener(events[i], el.dom7Listeners[k].proxyListener, capture);
            }
          }
        }
      } else if (el.dom7LiveListeners) {
        for (var k$1 = 0; k$1 < el.dom7LiveListeners.length; k$1 += 1) {
          if (listener) {
            if (el.dom7LiveListeners[k$1].listener === listener) {
              el.removeEventListener(events[i], el.dom7LiveListeners[k$1].proxyListener, capture);
            }
          } else if (el.dom7LiveListeners[k$1].type === events[i]) {
            el.removeEventListener(events[i], el.dom7LiveListeners[k$1].proxyListener, capture);
          }
        }
      }
    }
  }
  return this;
}
function trigger() {
  var this$1 = this;
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  var events = args[0].split(' ');
  var eventData = args[1];
  for (var i = 0; i < events.length; i += 1) {
    for (var j = 0; j < this.length; j += 1) {
      var evt = (void 0);
      try {
        evt = new win.CustomEvent(events[i], {
          detail: eventData,
          bubbles: true,
          cancelable: true,
        });
      } catch (e) {
        evt = doc.createEvent('Event');
        evt.initEvent(events[i], true, true);
        evt.detail = eventData;
      }
      // eslint-disable-next-line
      this$1[j].dom7EventData = args.filter(function (data, dataIndex) { return dataIndex > 0; });
      this$1[j].dispatchEvent(evt);
      this$1[j].dom7EventData = [];
      delete this$1[j].dom7EventData;
    }
  }
  return this;
}
function transitionEnd(callback) {
  var events = ['webkitTransitionEnd', 'transitionend'];
  var dom = this;
  var i;
  function fireCallBack(e) {
    /* jshint validthis:true */
    if (e.target !== this) { return; }
    callback.call(this, e);
    for (i = 0; i < events.length; i += 1) {
      dom.off(events[i], fireCallBack);
    }
  }
  if (callback) {
    for (i = 0; i < events.length; i += 1) {
      dom.on(events[i], fireCallBack);
    }
  }
  return this;
}
function outerWidth(includeMargins) {
  if (this.length > 0) {
    if (includeMargins) {
      // eslint-disable-next-line
      var styles = this.styles();
      return this[0].offsetWidth + parseFloat(styles.getPropertyValue('margin-right')) + parseFloat(styles.getPropertyValue('margin-left'));
    }
    return this[0].offsetWidth;
  }
  return null;
}
function outerHeight(includeMargins) {
  if (this.length > 0) {
    if (includeMargins) {
      // eslint-disable-next-line
      var styles = this.styles();
      return this[0].offsetHeight + parseFloat(styles.getPropertyValue('margin-top')) + parseFloat(styles.getPropertyValue('margin-bottom'));
    }
    return this[0].offsetHeight;
  }
  return null;
}
function offset() {
  if (this.length > 0) {
    var el = this[0];
    var box = el.getBoundingClientRect();
    var body = doc.body;
    var clientTop = el.clientTop || body.clientTop || 0;
    var clientLeft = el.clientLeft || body.clientLeft || 0;
    var scrollTop = el === win ? win.scrollY : el.scrollTop;
    var scrollLeft = el === win ? win.scrollX : el.scrollLeft;
    return {
      top: (box.top + scrollTop) - clientTop,
      left: (box.left + scrollLeft) - clientLeft,
    };
  }

  return null;
}
function styles() {
  if (this[0]) { return win.getComputedStyle(this[0], null); }
  return {};
}
function css(props, value) {
  var this$1 = this;

  var i;
  if (arguments.length === 1) {
    if (typeof props === 'string') {
      if (this[0]) { return win.getComputedStyle(this[0], null).getPropertyValue(props); }
    } else {
      for (i = 0; i < this.length; i += 1) {
        // eslint-disable-next-line
        for (var prop in props) {
          this$1[i].style[prop] = props[prop];
        }
      }
      return this;
    }
  }
  if (arguments.length === 2 && typeof props === 'string') {
    for (i = 0; i < this.length; i += 1) {
      this$1[i].style[props] = value;
    }
    return this;
  }
  return this;
}
// Iterate over the collection passing elements to `callback`
function each(callback) {
  var this$1 = this;

  // Don't bother continuing without a callback
  if (!callback) { return this; }
  // Iterate over the current collection
  for (var i = 0; i < this.length; i += 1) {
    // If the callback returns false
    if (callback.call(this$1[i], i, this$1[i]) === false) {
      // End the loop early
      return this$1;
    }
  }
  // Return `this` to allow chained DOM operations
  return this;
}
// eslint-disable-next-line
function html(html) {
  var this$1 = this;

  if (typeof html === 'undefined') {
    return this[0] ? this[0].innerHTML : undefined;
  }

  for (var i = 0; i < this.length; i += 1) {
    this$1[i].innerHTML = html;
  }
  return this;
}
// eslint-disable-next-line
function text(text) {
  var this$1 = this;

  if (typeof text === 'undefined') {
    if (this[0]) {
      return this[0].textContent.trim();
    }
    return null;
  }

  for (var i = 0; i < this.length; i += 1) {
    this$1[i].textContent = text;
  }
  return this;
}
function is(selector) {
  var el = this[0];
  var compareWith;
  var i;
  if (!el || typeof selector === 'undefined') { return false; }
  if (typeof selector === 'string') {
    if (el.matches) { return el.matches(selector); }
    else if (el.webkitMatchesSelector) { return el.webkitMatchesSelector(selector); }
    else if (el.msMatchesSelector) { return el.msMatchesSelector(selector); }

    compareWith = $(selector);
    for (i = 0; i < compareWith.length; i += 1) {
      if (compareWith[i] === el) { return true; }
    }
    return false;
  } else if (selector === doc) { return el === doc; }
  else if (selector === win) { return el === win; }

  if (selector.nodeType || selector instanceof Dom7) {
    compareWith = selector.nodeType ? [selector] : selector;
    for (i = 0; i < compareWith.length; i += 1) {
      if (compareWith[i] === el) { return true; }
    }
    return false;
  }
  return false;
}
function index() {
  var child = this[0];
  var i;
  if (child) {
    i = 0;
    // eslint-disable-next-line
    while ((child = child.previousSibling) !== null) {
      if (child.nodeType === 1) { i += 1; }
    }
    return i;
  }
  return undefined;
}
// eslint-disable-next-line
function eq(index) {
  if (typeof index === 'undefined') { return this; }
  var length = this.length;
  var returnIndex;
  if (index > length - 1) {
    return new Dom7([]);
  }
  if (index < 0) {
    returnIndex = length + index;
    if (returnIndex < 0) { return new Dom7([]); }
    return new Dom7([this[returnIndex]]);
  }
  return new Dom7([this[index]]);
}
function append() {
  var this$1 = this;
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  var newChild;

  for (var k = 0; k < args.length; k += 1) {
    newChild = args[k];
    for (var i = 0; i < this.length; i += 1) {
      if (typeof newChild === 'string') {
        var tempDiv = doc.createElement('div');
        tempDiv.innerHTML = newChild;
        while (tempDiv.firstChild) {
          this$1[i].appendChild(tempDiv.firstChild);
        }
      } else if (newChild instanceof Dom7) {
        for (var j = 0; j < newChild.length; j += 1) {
          this$1[i].appendChild(newChild[j]);
        }
      } else {
        this$1[i].appendChild(newChild);
      }
    }
  }

  return this;
}
function prepend(newChild) {
  var this$1 = this;

  var i;
  var j;
  for (i = 0; i < this.length; i += 1) {
    if (typeof newChild === 'string') {
      var tempDiv = doc.createElement('div');
      tempDiv.innerHTML = newChild;
      for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) {
        this$1[i].insertBefore(tempDiv.childNodes[j], this$1[i].childNodes[0]);
      }
    } else if (newChild instanceof Dom7) {
      for (j = 0; j < newChild.length; j += 1) {
        this$1[i].insertBefore(newChild[j], this$1[i].childNodes[0]);
      }
    } else {
      this$1[i].insertBefore(newChild, this$1[i].childNodes[0]);
    }
  }
  return this;
}
function next(selector) {
  if (this.length > 0) {
    if (selector) {
      if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) {
        return new Dom7([this[0].nextElementSibling]);
      }
      return new Dom7([]);
    }

    if (this[0].nextElementSibling) { return new Dom7([this[0].nextElementSibling]); }
    return new Dom7([]);
  }
  return new Dom7([]);
}
function nextAll(selector) {
  var nextEls = [];
  var el = this[0];
  if (!el) { return new Dom7([]); }
  while (el.nextElementSibling) {
    var next = el.nextElementSibling; // eslint-disable-line
    if (selector) {
      if ($(next).is(selector)) { nextEls.push(next); }
    } else { nextEls.push(next); }
    el = next;
  }
  return new Dom7(nextEls);
}
function prev(selector) {
  if (this.length > 0) {
    var el = this[0];
    if (selector) {
      if (el.previousElementSibling && $(el.previousElementSibling).is(selector)) {
        return new Dom7([el.previousElementSibling]);
      }
      return new Dom7([]);
    }

    if (el.previousElementSibling) { return new Dom7([el.previousElementSibling]); }
    return new Dom7([]);
  }
  return new Dom7([]);
}
function prevAll(selector) {
  var prevEls = [];
  var el = this[0];
  if (!el) { return new Dom7([]); }
  while (el.previousElementSibling) {
    var prev = el.previousElementSibling; // eslint-disable-line
    if (selector) {
      if ($(prev).is(selector)) { prevEls.push(prev); }
    } else { prevEls.push(prev); }
    el = prev;
  }
  return new Dom7(prevEls);
}
function parent(selector) {
  var this$1 = this;

  var parents = []; // eslint-disable-line
  for (var i = 0; i < this.length; i += 1) {
    if (this$1[i].parentNode !== null) {
      if (selector) {
        if ($(this$1[i].parentNode).is(selector)) { parents.push(this$1[i].parentNode); }
      } else {
        parents.push(this$1[i].parentNode);
      }
    }
  }
  return $(unique(parents));
}
function parents(selector) {
  var this$1 = this;

  var parents = []; // eslint-disable-line
  for (var i = 0; i < this.length; i += 1) {
    var parent = this$1[i].parentNode; // eslint-disable-line
    while (parent) {
      if (selector) {
        if ($(parent).is(selector)) { parents.push(parent); }
      } else {
        parents.push(parent);
      }
      parent = parent.parentNode;
    }
  }
  return $(unique(parents));
}
function closest(selector) {
  var closest = this; // eslint-disable-line
  if (typeof selector === 'undefined') {
    return new Dom7([]);
  }
  if (!closest.is(selector)) {
    closest = closest.parents(selector).eq(0);
  }
  return closest;
}
function find(selector) {
  var this$1 = this;

  var foundElements = [];
  for (var i = 0; i < this.length; i += 1) {
    var found = this$1[i].querySelectorAll(selector);
    for (var j = 0; j < found.length; j += 1) {
      foundElements.push(found[j]);
    }
  }
  return new Dom7(foundElements);
}
function children(selector) {
  var this$1 = this;

  var children = []; // eslint-disable-line
  for (var i = 0; i < this.length; i += 1) {
    var childNodes = this$1[i].childNodes;

    for (var j = 0; j < childNodes.length; j += 1) {
      if (!selector) {
        if (childNodes[j].nodeType === 1) { children.push(childNodes[j]); }
      } else if (childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector)) {
        children.push(childNodes[j]);
      }
    }
  }
  return new Dom7(unique(children));
}
function remove() {
  var this$1 = this;

  for (var i = 0; i < this.length; i += 1) {
    if (this$1[i].parentNode) { this$1[i].parentNode.removeChild(this$1[i]); }
  }
  return this;
}
function add() {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  var dom = this;
  var i;
  var j;
  for (i = 0; i < args.length; i += 1) {
    var toAdd = $(args[i]);
    for (j = 0; j < toAdd.length; j += 1) {
      dom[dom.length] = toAdd[j];
      dom.length += 1;
    }
  }
  return dom;
}

var Methods = {
  addClass: addClass,
  removeClass: removeClass,
  hasClass: hasClass,
  toggleClass: toggleClass,
  attr: attr,
  removeAttr: removeAttr,
  data: data,
  transform: transform,
  transition: transition,
  on: on,
  off: off,
  trigger: trigger,
  transitionEnd: transitionEnd,
  outerWidth: outerWidth,
  outerHeight: outerHeight,
  offset: offset,
  css: css,
  each: each,
  html: html,
  text: text,
  is: is,
  index: index,
  eq: eq,
  append: append,
  prepend: prepend,
  next: next,
  nextAll: nextAll,
  prev: prev,
  prevAll: prevAll,
  parent: parent,
  parents: parents,
  closest: closest,
  find: find,
  children: children,
  remove: remove,
  add: add,
  styles: styles,
};

Object.keys(Methods).forEach(function (methodName) {
  $.fn[methodName] = Methods[methodName];
});

var Utils = {
  deleteProps: function deleteProps(obj) {
    var object = obj;
    Object.keys(object).forEach(function (key) {
      try {
        object[key] = null;
      } catch (e) {
        // no getter for object
      }
      try {
        delete object[key];
      } catch (e) {
        // something got wrong
      }
    });
  },
  nextTick: function nextTick(callback, delay) {
    if ( delay === void 0 ) delay = 0;

    return setTimeout(callback, delay);
  },
  now: function now() {
    return Date.now();
  },
  getTranslate: function getTranslate(el, axis) {
    if ( axis === void 0 ) axis = 'x';

    var matrix;
    var curTransform;
    var transformMatrix;

    var curStyle = win.getComputedStyle(el, null);

    if (win.WebKitCSSMatrix) {
      curTransform = curStyle.transform || curStyle.webkitTransform;
      if (curTransform.split(',').length > 6) {
        curTransform = curTransform.split(', ').map(function (a) { return a.replace(',', '.'); }).join(', ');
      }
      // Some old versions of Webkit choke when 'none' is passed; pass
      // empty string instead in this case
      transformMatrix = new win.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
    } else {
      transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
      matrix = transformMatrix.toString().split(',');
    }

    if (axis === 'x') {
      // Latest Chrome and webkits Fix
      if (win.WebKitCSSMatrix) { curTransform = transformMatrix.m41; }
      // Crazy IE10 Matrix
      else if (matrix.length === 16) { curTransform = parseFloat(matrix[12]); }
      // Normal Browsers
      else { curTransform = parseFloat(matrix[4]); }
    }
    if (axis === 'y') {
      // Latest Chrome and webkits Fix
      if (win.WebKitCSSMatrix) { curTransform = transformMatrix.m42; }
      // Crazy IE10 Matrix
      else if (matrix.length === 16) { curTransform = parseFloat(matrix[13]); }
      // Normal Browsers
      else { curTransform = parseFloat(matrix[5]); }
    }
    return curTransform || 0;
  },
  parseUrlQuery: function parseUrlQuery(url) {
    var query = {};
    var urlToParse = url || win.location.href;
    var i;
    var params;
    var param;
    var length;
    if (typeof urlToParse === 'string' && urlToParse.length) {
      urlToParse = urlToParse.indexOf('?') > -1 ? urlToParse.replace(/\S*\?/, '') : '';
      params = urlToParse.split('&').filter(function (paramsPart) { return paramsPart !== ''; });
      length = params.length;

      for (i = 0; i < length; i += 1) {
        param = params[i].replace(/#\S+/g, '').split('=');
        query[decodeURIComponent(param[0])] = typeof param[1] === 'undefined' ? undefined : decodeURIComponent(param[1]) || '';
      }
    }
    return query;
  },
  isObject: function isObject(o) {
    return typeof o === 'object' && o !== null && o.constructor && o.constructor === Object;
  },
  extend: function extend() {
    var args = [], len$1 = arguments.length;
    while ( len$1-- ) args[ len$1 ] = arguments[ len$1 ];

    var to = Object(args[0]);
    for (var i = 1; i < args.length; i += 1) {
      var nextSource = args[i];
      if (nextSource !== undefined && nextSource !== null) {
        var keysArray = Object.keys(Object(nextSource));
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
          var nextKey = keysArray[nextIndex];
          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== undefined && desc.enumerable) {
            if (Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
              Utils.extend(to[nextKey], nextSource[nextKey]);
            } else if (!Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
              to[nextKey] = {};
              Utils.extend(to[nextKey], nextSource[nextKey]);
            } else {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
    }
    return to;
  },
};

var Support = (function Support() {
  var testDiv = doc.createElement('div');
  return {
    touch: (win.Modernizr && win.Modernizr.touch === true) || (function checkTouch() {
      return !!(('ontouchstart' in win) || (win.DocumentTouch && doc instanceof win.DocumentTouch));
    }()),

    pointerEvents: !!(win.navigator.pointerEnabled || win.PointerEvent),
    prefixedPointerEvents: !!win.navigator.msPointerEnabled,

    transition: (function checkTransition() {
      var style = testDiv.style;
      return ('transition' in style || 'webkitTransition' in style || 'MozTransition' in style);
    }()),
    transforms3d: (win.Modernizr && win.Modernizr.csstransforms3d === true) || (function checkTransforms3d() {
      var style = testDiv.style;
      return ('webkitPerspective' in style || 'MozPerspective' in style || 'OPerspective' in style || 'MsPerspective' in style || 'perspective' in style);
    }()),

    flexbox: (function checkFlexbox() {
      var style = testDiv.style;
      var styles = ('alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient').split(' ');
      for (var i = 0; i < styles.length; i += 1) {
        if (styles[i] in style) { return true; }
      }
      return false;
    }()),

    observer: (function checkObserver() {
      return ('MutationObserver' in win || 'WebkitMutationObserver' in win);
    }()),

    passiveListener: (function checkPassiveListener() {
      var supportsPassive = false;
      try {
        var opts = Object.defineProperty({}, 'passive', {
          // eslint-disable-next-line
          get: function get() {
            supportsPassive = true;
          },
        });
        win.addEventListener('testPassiveListener', null, opts);
      } catch (e) {
        // No support
      }
      return supportsPassive;
    }()),

    gestures: (function checkGestures() {
      return 'ongesturestart' in win;
    }()),
  };
}());

var SwiperClass = function SwiperClass(params) {
  if ( params === void 0 ) params = {};

  var self = this;
  self.params = params;

  // Events
  self.eventsListeners = {};

  if (self.params && self.params.on) {
    Object.keys(self.params.on).forEach(function (eventName) {
      self.on(eventName, self.params.on[eventName]);
    });
  }
};

var staticAccessors = { components: { configurable: true } };
SwiperClass.prototype.on = function on (events, handler, priority) {
  var self = this;
  if (typeof handler !== 'function') { return self; }
  var method = priority ? 'unshift' : 'push';
  events.split(' ').forEach(function (event) {
    if (!self.eventsListeners[event]) { self.eventsListeners[event] = []; }
    self.eventsListeners[event][method](handler);
  });
  return self;
};
SwiperClass.prototype.once = function once (events, handler, priority) {
  var self = this;
  if (typeof handler !== 'function') { return self; }
  function onceHandler() {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

    handler.apply(self, args);
    self.off(events, onceHandler);
  }
  return self.on(events, onceHandler, priority);
};
SwiperClass.prototype.off = function off (events, handler) {
  var self = this;
  if (!self.eventsListeners) { return self; }
  events.split(' ').forEach(function (event) {
    if (typeof handler === 'undefined') {
      self.eventsListeners[event] = [];
    } else {
      self.eventsListeners[event].forEach(function (eventHandler, index) {
        if (eventHandler === handler) {
          self.eventsListeners[event].splice(index, 1);
        }
      });
    }
  });
  return self;
};
SwiperClass.prototype.emit = function emit () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

  var self = this;
  if (!self.eventsListeners) { return self; }
  var events;
  var data;
  var context;
  if (typeof args[0] === 'string' || Array.isArray(args[0])) {
    events = args[0];
    data = args.slice(1, args.length);
    context = self;
  } else {
    events = args[0].events;
    data = args[0].data;
    context = args[0].context || self;
  }
  var eventsArray = Array.isArray(events) ? events : events.split(' ');
  eventsArray.forEach(function (event) {
    if (self.eventsListeners && self.eventsListeners[event]) {
      var handlers = [];
      self.eventsListeners[event].forEach(function (eventHandler) {
        handlers.push(eventHandler);
      });
      handlers.forEach(function (eventHandler) {
        eventHandler.apply(context, data);
      });
    }
  });
  return self;
};
SwiperClass.prototype.useModulesParams = function useModulesParams (instanceParams) {
  var instance = this;
  if (!instance.modules) { return; }
  Object.keys(instance.modules).forEach(function (moduleName) {
    var module = instance.modules[moduleName];
    // Extend params
    if (module.params) {
      Utils.extend(instanceParams, module.params);
    }
  });
};
SwiperClass.prototype.useModules = function useModules (modulesParams) {
    if ( modulesParams === void 0 ) modulesParams = {};

  var instance = this;
  if (!instance.modules) { return; }
  Object.keys(instance.modules).forEach(function (moduleName) {
    var module = instance.modules[moduleName];
    var moduleParams = modulesParams[moduleName] || {};
    // Extend instance methods and props
    if (module.instance) {
      Object.keys(module.instance).forEach(function (modulePropName) {
        var moduleProp = module.instance[modulePropName];
        if (typeof moduleProp === 'function') {
          instance[modulePropName] = moduleProp.bind(instance);
        } else {
          instance[modulePropName] = moduleProp;
        }
      });
    }
    // Add event listeners
    if (module.on && instance.on) {
      Object.keys(module.on).forEach(function (moduleEventName) {
        instance.on(moduleEventName, module.on[moduleEventName]);
      });
    }

    // Module create callback
    if (module.create) {
      module.create.bind(instance)(moduleParams);
    }
  });
};
staticAccessors.components.set = function (components) {
  var Class = this;
  if (!Class.use) { return; }
  Class.use(components);
};
SwiperClass.installModule = function installModule (module) {
    var params = [], len = arguments.length - 1;
    while ( len-- > 0 ) params[ len ] = arguments[ len + 1 ];

  var Class = this;
  if (!Class.prototype.modules) { Class.prototype.modules = {}; }
  var name = module.name || (((Object.keys(Class.prototype.modules).length) + "_" + (Utils.now())));
  Class.prototype.modules[name] = module;
  // Prototype
  if (module.proto) {
    Object.keys(module.proto).forEach(function (key) {
      Class.prototype[key] = module.proto[key];
    });
  }
  // Class
  if (module.static) {
    Object.keys(module.static).forEach(function (key) {
      Class[key] = module.static[key];
    });
  }
  // Callback
  if (module.install) {
    module.install.apply(Class, params);
  }
  return Class;
};
SwiperClass.use = function use (module) {
    var params = [], len = arguments.length - 1;
    while ( len-- > 0 ) params[ len ] = arguments[ len + 1 ];

  var Class = this;
  if (Array.isArray(module)) {
    module.forEach(function (m) { return Class.installModule(m); });
    return Class;
  }
  return Class.installModule.apply(Class, [ module ].concat( params ));
};

Object.defineProperties( SwiperClass, staticAccessors );

function updateSize () {
  var swiper = this;
  var width;
  var height;
  var $el = swiper.$el;
  if (typeof swiper.params.width !== 'undefined') {
    width = swiper.params.width;
  } else {
    width = $el[0].clientWidth;
  }
  if (typeof swiper.params.height !== 'undefined') {
    height = swiper.params.height;
  } else {
    height = $el[0].clientHeight;
  }
  if ((width === 0 && swiper.isHorizontal()) || (height === 0 && swiper.isVertical())) {
    return;
  }

  // Subtract paddings
  width = width - parseInt($el.css('padding-left'), 10) - parseInt($el.css('padding-right'), 10);
  height = height - parseInt($el.css('padding-top'), 10) - parseInt($el.css('padding-bottom'), 10);

  Utils.extend(swiper, {
    width: width,
    height: height,
    size: swiper.isHorizontal() ? width : height,
  });
}

function updateSlides () {
  var swiper = this;
  var params = swiper.params;

  var $wrapperEl = swiper.$wrapperEl;
  var swiperSize = swiper.size;
  var rtl = swiper.rtlTranslate;
  var wrongRTL = swiper.wrongRTL;
  var slides = $wrapperEl.children(("." + (swiper.params.slideClass)));
  var isVirtual = swiper.virtual && params.virtual.enabled;
  var slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
  var snapGrid = [];
  var slidesGrid = [];
  var slidesSizesGrid = [];

  var offsetBefore = params.slidesOffsetBefore;
  if (typeof offsetBefore === 'function') {
    offsetBefore = params.slidesOffsetBefore.call(swiper);
  }

  var offsetAfter = params.slidesOffsetAfter;
  if (typeof offsetAfter === 'function') {
    offsetAfter = params.slidesOffsetAfter.call(swiper);
  }

  var previousSlidesLength = slidesLength;
  var previousSnapGridLength = swiper.snapGrid.length;
  var previousSlidesGridLength = swiper.snapGrid.length;

  var spaceBetween = params.spaceBetween;
  var slidePosition = -offsetBefore;
  var prevSlideSize = 0;
  var index = 0;
  if (typeof swiperSize === 'undefined') {
    return;
  }
  if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
    spaceBetween = (parseFloat(spaceBetween.replace('%', '')) / 100) * swiperSize;
  }

  swiper.virtualSize = -spaceBetween;

  // reset margins
  if (rtl) { slides.css({ marginLeft: '', marginTop: '' }); }
  else { slides.css({ marginRight: '', marginBottom: '' }); }

  var slidesNumberEvenToRows;
  if (params.slidesPerColumn > 1) {
    if (Math.floor(slidesLength / params.slidesPerColumn) === slidesLength / swiper.params.slidesPerColumn) {
      slidesNumberEvenToRows = slidesLength;
    } else {
      slidesNumberEvenToRows = Math.ceil(slidesLength / params.slidesPerColumn) * params.slidesPerColumn;
    }
    if (params.slidesPerView !== 'auto' && params.slidesPerColumnFill === 'row') {
      slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, params.slidesPerView * params.slidesPerColumn);
    }
  }

  // Calc slides
  var slideSize;
  var slidesPerColumn = params.slidesPerColumn;
  var slidesPerRow = slidesNumberEvenToRows / slidesPerColumn;
  var numFullColumns = slidesPerRow - ((params.slidesPerColumn * slidesPerRow) - slidesLength);
  for (var i = 0; i < slidesLength; i += 1) {
    slideSize = 0;
    var slide = slides.eq(i);
    if (params.slidesPerColumn > 1) {
      // Set slides order
      var newSlideOrderIndex = (void 0);
      var column = (void 0);
      var row = (void 0);
      if (params.slidesPerColumnFill === 'column') {
        column = Math.floor(i / slidesPerColumn);
        row = i - (column * slidesPerColumn);
        if (column > numFullColumns || (column === numFullColumns && row === slidesPerColumn - 1)) {
          row += 1;
          if (row >= slidesPerColumn) {
            row = 0;
            column += 1;
          }
        }
        newSlideOrderIndex = column + ((row * slidesNumberEvenToRows) / slidesPerColumn);
        slide
          .css({
            '-webkit-box-ordinal-group': newSlideOrderIndex,
            '-moz-box-ordinal-group': newSlideOrderIndex,
            '-ms-flex-order': newSlideOrderIndex,
            '-webkit-order': newSlideOrderIndex,
            order: newSlideOrderIndex,
          });
      } else {
        row = Math.floor(i / slidesPerRow);
        column = i - (row * slidesPerRow);
      }
      slide
        .css(
          ("margin-" + (swiper.isHorizontal() ? 'top' : 'left')),
          (row !== 0 && params.spaceBetween) && (((params.spaceBetween) + "px"))
        )
        .attr('data-swiper-column', column)
        .attr('data-swiper-row', row);
    }
    if (slide.css('display') === 'none') { continue; } // eslint-disable-line

    if (params.slidesPerView === 'auto') {
      var slideStyles = win.getComputedStyle(slide[0], null);
      if (swiper.isHorizontal()) {
        slideSize = slide[0].getBoundingClientRect().width +
          parseFloat(slideStyles.getPropertyValue('margin-left')) +
          parseFloat(slideStyles.getPropertyValue('margin-right'));
      } else {
        slideSize = slide[0].getBoundingClientRect().height +
          parseFloat(slideStyles.getPropertyValue('margin-top')) +
          parseFloat(slideStyles.getPropertyValue('margin-bottom'));
      }
      if (params.roundLengths) { slideSize = Math.floor(slideSize); }
    } else {
      slideSize = (swiperSize - ((params.slidesPerView - 1) * spaceBetween)) / params.slidesPerView;
      if (params.roundLengths) { slideSize = Math.floor(slideSize); }

      if (slides[i]) {
        if (swiper.isHorizontal()) {
          slides[i].style.width = slideSize + "px";
        } else {
          slides[i].style.height = slideSize + "px";
        }
      }
    }
    if (slides[i]) {
      slides[i].swiperSlideSize = slideSize;
    }
    slidesSizesGrid.push(slideSize);


    if (params.centeredSlides) {
      slidePosition = slidePosition + (slideSize / 2) + (prevSlideSize / 2) + spaceBetween;
      if (prevSlideSize === 0 && i !== 0) { slidePosition = slidePosition - (swiperSize / 2) - spaceBetween; }
      if (i === 0) { slidePosition = slidePosition - (swiperSize / 2) - spaceBetween; }
      if (Math.abs(slidePosition) < 1 / 1000) { slidePosition = 0; }
      if ((index) % params.slidesPerGroup === 0) { snapGrid.push(slidePosition); }
      slidesGrid.push(slidePosition);
    } else {
      if ((index) % params.slidesPerGroup === 0) { snapGrid.push(slidePosition); }
      slidesGrid.push(slidePosition);
      slidePosition = slidePosition + slideSize + spaceBetween;
    }

    swiper.virtualSize += slideSize + spaceBetween;

    prevSlideSize = slideSize;

    index += 1;
  }
  swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
  var newSlidesGrid;

  if (
    rtl && wrongRTL && (params.effect === 'slide' || params.effect === 'coverflow')) {
    $wrapperEl.css({ width: ((swiper.virtualSize + params.spaceBetween) + "px") });
  }
  if (!Support.flexbox || params.setWrapperSize) {
    if (swiper.isHorizontal()) { $wrapperEl.css({ width: ((swiper.virtualSize + params.spaceBetween) + "px") }); }
    else { $wrapperEl.css({ height: ((swiper.virtualSize + params.spaceBetween) + "px") }); }
  }

  if (params.slidesPerColumn > 1) {
    swiper.virtualSize = (slideSize + params.spaceBetween) * slidesNumberEvenToRows;
    swiper.virtualSize = Math.ceil(swiper.virtualSize / params.slidesPerColumn) - params.spaceBetween;
    if (swiper.isHorizontal()) { $wrapperEl.css({ width: ((swiper.virtualSize + params.spaceBetween) + "px") }); }
    else { $wrapperEl.css({ height: ((swiper.virtualSize + params.spaceBetween) + "px") }); }
    if (params.centeredSlides) {
      newSlidesGrid = [];
      for (var i$1 = 0; i$1 < snapGrid.length; i$1 += 1) {
        if (snapGrid[i$1] < swiper.virtualSize + snapGrid[0]) { newSlidesGrid.push(snapGrid[i$1]); }
      }
      snapGrid = newSlidesGrid;
    }
  }

  // Remove last grid elements depending on width
  if (!params.centeredSlides) {
    newSlidesGrid = [];
    for (var i$2 = 0; i$2 < snapGrid.length; i$2 += 1) {
      if (snapGrid[i$2] <= swiper.virtualSize - swiperSize) {
        newSlidesGrid.push(snapGrid[i$2]);
      }
    }
    snapGrid = newSlidesGrid;
    if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
      snapGrid.push(swiper.virtualSize - swiperSize);
    }
  }
  if (snapGrid.length === 0) { snapGrid = [0]; }

  if (params.spaceBetween !== 0) {
    if (swiper.isHorizontal()) {
      if (rtl) { slides.css({ marginLeft: (spaceBetween + "px") }); }
      else { slides.css({ marginRight: (spaceBetween + "px") }); }
    } else { slides.css({ marginBottom: (spaceBetween + "px") }); }
  }

  Utils.extend(swiper, {
    slides: slides,
    snapGrid: snapGrid,
    slidesGrid: slidesGrid,
    slidesSizesGrid: slidesSizesGrid,
  });

  if (slidesLength !== previousSlidesLength) {
    swiper.emit('slidesLengthChange');
  }
  if (snapGrid.length !== previousSnapGridLength) {
    if (swiper.params.watchOverflow) { swiper.checkOverflow(); }
    swiper.emit('snapGridLengthChange');
  }
  if (slidesGrid.length !== previousSlidesGridLength) {
    swiper.emit('slidesGridLengthChange');
  }

  if (params.watchSlidesProgress || params.watchSlidesVisibility) {
    swiper.updateSlidesOffset();
  }
}

function updateAutoHeight (speed) {
  var swiper = this;
  var activeSlides = [];
  var newHeight = 0;
  var i;
  if (typeof speed === 'number') {
    swiper.setTransition(speed);
  } else if (speed === true) {
    swiper.setTransition(swiper.params.speed);
  }
  // Find slides currently in view
  if (swiper.params.slidesPerView !== 'auto' && swiper.params.slidesPerView > 1) {
    for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
      var index = swiper.activeIndex + i;
      if (index > swiper.slides.length) { break; }
      activeSlides.push(swiper.slides.eq(index)[0]);
    }
  } else {
    activeSlides.push(swiper.slides.eq(swiper.activeIndex)[0]);
  }

  // Find new height from highest slide in view
  for (i = 0; i < activeSlides.length; i += 1) {
    if (typeof activeSlides[i] !== 'undefined') {
      var height = activeSlides[i].offsetHeight;
      newHeight = height > newHeight ? height : newHeight;
    }
  }

  // Update Height
  if (newHeight) { swiper.$wrapperEl.css('height', (newHeight + "px")); }
}

function updateSlidesOffset () {
  var swiper = this;
  var slides = swiper.slides;
  for (var i = 0; i < slides.length; i += 1) {
    slides[i].swiperSlideOffset = swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop;
  }
}

function updateSlidesProgress (translate) {
  if ( translate === void 0 ) translate = this.translate || 0;

  var swiper = this;
  var params = swiper.params;

  var slides = swiper.slides;
  var rtl = swiper.rtlTranslate;

  if (slides.length === 0) { return; }
  if (typeof slides[0].swiperSlideOffset === 'undefined') { swiper.updateSlidesOffset(); }

  var offsetCenter = -translate;
  if (rtl) { offsetCenter = translate; }

  // Visible Slides
  slides.removeClass(params.slideVisibleClass);

  for (var i = 0; i < slides.length; i += 1) {
    var slide = slides[i];
    var slideProgress =
      (
        (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0)) - slide.swiperSlideOffset
      ) / (slide.swiperSlideSize + params.spaceBetween);
    if (params.watchSlidesVisibility) {
      var slideBefore = -(offsetCenter - slide.swiperSlideOffset);
      var slideAfter = slideBefore + swiper.slidesSizesGrid[i];
      var isVisible =
                (slideBefore >= 0 && slideBefore < swiper.size) ||
                (slideAfter > 0 && slideAfter <= swiper.size) ||
                (slideBefore <= 0 && slideAfter >= swiper.size);
      if (isVisible) {
        slides.eq(i).addClass(params.slideVisibleClass);
      }
    }
    slide.progress = rtl ? -slideProgress : slideProgress;
  }
}

function updateProgress (translate) {
  if ( translate === void 0 ) translate = this.translate || 0;

  var swiper = this;
  var params = swiper.params;

  var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  var progress = swiper.progress;
  var isBeginning = swiper.isBeginning;
  var isEnd = swiper.isEnd;
  var wasBeginning = isBeginning;
  var wasEnd = isEnd;
  if (translatesDiff === 0) {
    progress = 0;
    isBeginning = true;
    isEnd = true;
  } else {
    progress = (translate - swiper.minTranslate()) / (translatesDiff);
    isBeginning = progress <= 0;
    isEnd = progress >= 1;
  }
  Utils.extend(swiper, {
    progress: progress,
    isBeginning: isBeginning,
    isEnd: isEnd,
  });

  if (params.watchSlidesProgress || params.watchSlidesVisibility) { swiper.updateSlidesProgress(translate); }

  if (isBeginning && !wasBeginning) {
    swiper.emit('reachBeginning toEdge');
  }
  if (isEnd && !wasEnd) {
    swiper.emit('reachEnd toEdge');
  }
  if ((wasBeginning && !isBeginning) || (wasEnd && !isEnd)) {
    swiper.emit('fromEdge');
  }

  swiper.emit('progress', progress);
}

function updateSlidesClasses () {
  var swiper = this;

  var slides = swiper.slides;
  var params = swiper.params;
  var $wrapperEl = swiper.$wrapperEl;
  var activeIndex = swiper.activeIndex;
  var realIndex = swiper.realIndex;
  var isVirtual = swiper.virtual && params.virtual.enabled;

  slides.removeClass(((params.slideActiveClass) + " " + (params.slideNextClass) + " " + (params.slidePrevClass) + " " + (params.slideDuplicateActiveClass) + " " + (params.slideDuplicateNextClass) + " " + (params.slideDuplicatePrevClass)));

  var activeSlide;
  if (isVirtual) {
    activeSlide = swiper.$wrapperEl.find(("." + (params.slideClass) + "[data-swiper-slide-index=\"" + activeIndex + "\"]"));
  } else {
    activeSlide = slides.eq(activeIndex);
  }

  // Active classes
  activeSlide.addClass(params.slideActiveClass);

  if (params.loop) {
    // Duplicate to all looped slides
    if (activeSlide.hasClass(params.slideDuplicateClass)) {
      $wrapperEl
        .children(("." + (params.slideClass) + ":not(." + (params.slideDuplicateClass) + ")[data-swiper-slide-index=\"" + realIndex + "\"]"))
        .addClass(params.slideDuplicateActiveClass);
    } else {
      $wrapperEl
        .children(("." + (params.slideClass) + "." + (params.slideDuplicateClass) + "[data-swiper-slide-index=\"" + realIndex + "\"]"))
        .addClass(params.slideDuplicateActiveClass);
    }
  }
  // Next Slide
  var nextSlide = activeSlide.nextAll(("." + (params.slideClass))).eq(0).addClass(params.slideNextClass);
  if (params.loop && nextSlide.length === 0) {
    nextSlide = slides.eq(0);
    nextSlide.addClass(params.slideNextClass);
  }
  // Prev Slide
  var prevSlide = activeSlide.prevAll(("." + (params.slideClass))).eq(0).addClass(params.slidePrevClass);
  if (params.loop && prevSlide.length === 0) {
    prevSlide = slides.eq(-1);
    prevSlide.addClass(params.slidePrevClass);
  }
  if (params.loop) {
    // Duplicate to all looped slides
    if (nextSlide.hasClass(params.slideDuplicateClass)) {
      $wrapperEl
        .children(("." + (params.slideClass) + ":not(." + (params.slideDuplicateClass) + ")[data-swiper-slide-index=\"" + (nextSlide.attr('data-swiper-slide-index')) + "\"]"))
        .addClass(params.slideDuplicateNextClass);
    } else {
      $wrapperEl
        .children(("." + (params.slideClass) + "." + (params.slideDuplicateClass) + "[data-swiper-slide-index=\"" + (nextSlide.attr('data-swiper-slide-index')) + "\"]"))
        .addClass(params.slideDuplicateNextClass);
    }
    if (prevSlide.hasClass(params.slideDuplicateClass)) {
      $wrapperEl
        .children(("." + (params.slideClass) + ":not(." + (params.slideDuplicateClass) + ")[data-swiper-slide-index=\"" + (prevSlide.attr('data-swiper-slide-index')) + "\"]"))
        .addClass(params.slideDuplicatePrevClass);
    } else {
      $wrapperEl
        .children(("." + (params.slideClass) + "." + (params.slideDuplicateClass) + "[data-swiper-slide-index=\"" + (prevSlide.attr('data-swiper-slide-index')) + "\"]"))
        .addClass(params.slideDuplicatePrevClass);
    }
  }
}

function updateActiveIndex (newActiveIndex) {
  var swiper = this;
  var translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
  var slidesGrid = swiper.slidesGrid;
  var snapGrid = swiper.snapGrid;
  var params = swiper.params;
  var previousIndex = swiper.activeIndex;
  var previousRealIndex = swiper.realIndex;
  var previousSnapIndex = swiper.snapIndex;
  var activeIndex = newActiveIndex;
  var snapIndex;
  if (typeof activeIndex === 'undefined') {
    for (var i = 0; i < slidesGrid.length; i += 1) {
      if (typeof slidesGrid[i + 1] !== 'undefined') {
        if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - ((slidesGrid[i + 1] - slidesGrid[i]) / 2)) {
          activeIndex = i;
        } else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) {
          activeIndex = i + 1;
        }
      } else if (translate >= slidesGrid[i]) {
        activeIndex = i;
      }
    }
    // Normalize slideIndex
    if (params.normalizeSlideIndex) {
      if (activeIndex < 0 || typeof activeIndex === 'undefined') { activeIndex = 0; }
    }
  }
  if (snapGrid.indexOf(translate) >= 0) {
    snapIndex = snapGrid.indexOf(translate);
  } else {
    snapIndex = Math.floor(activeIndex / params.slidesPerGroup);
  }
  if (snapIndex >= snapGrid.length) { snapIndex = snapGrid.length - 1; }
  if (activeIndex === previousIndex) {
    if (snapIndex !== previousSnapIndex) {
      swiper.snapIndex = snapIndex;
      swiper.emit('snapIndexChange');
    }
    return;
  }

  // Get real index
  var realIndex = parseInt(swiper.slides.eq(activeIndex).attr('data-swiper-slide-index') || activeIndex, 10);

  Utils.extend(swiper, {
    snapIndex: snapIndex,
    realIndex: realIndex,
    previousIndex: previousIndex,
    activeIndex: activeIndex,
  });
  swiper.emit('activeIndexChange');
  swiper.emit('snapIndexChange');
  if (previousRealIndex !== realIndex) {
    swiper.emit('realIndexChange');
  }
  swiper.emit('slideChange');
}

function updateClickedSlide (e) {
  var swiper = this;
  var params = swiper.params;
  var slide = $(e.target).closest(("." + (params.slideClass)))[0];
  var slideFound = false;
  if (slide) {
    for (var i = 0; i < swiper.slides.length; i += 1) {
      if (swiper.slides[i] === slide) { slideFound = true; }
    }
  }

  if (slide && slideFound) {
    swiper.clickedSlide = slide;
    if (swiper.virtual && swiper.params.virtual.enabled) {
      swiper.clickedIndex = parseInt($(slide).attr('data-swiper-slide-index'), 10);
    } else {
      swiper.clickedIndex = $(slide).index();
    }
  } else {
    swiper.clickedSlide = undefined;
    swiper.clickedIndex = undefined;
    return;
  }
  if (params.slideToClickedSlide && swiper.clickedIndex !== undefined && swiper.clickedIndex !== swiper.activeIndex) {
    swiper.slideToClickedSlide();
  }
}

var update = {
  updateSize: updateSize,
  updateSlides: updateSlides,
  updateAutoHeight: updateAutoHeight,
  updateSlidesOffset: updateSlidesOffset,
  updateSlidesProgress: updateSlidesProgress,
  updateProgress: updateProgress,
  updateSlidesClasses: updateSlidesClasses,
  updateActiveIndex: updateActiveIndex,
  updateClickedSlide: updateClickedSlide,
};

function getTranslate (axis) {
  if ( axis === void 0 ) axis = this.isHorizontal() ? 'x' : 'y';

  var swiper = this;

  var params = swiper.params;
  var rtl = swiper.rtlTranslate;
  var translate = swiper.translate;
  var $wrapperEl = swiper.$wrapperEl;

  if (params.virtualTranslate) {
    return rtl ? -translate : translate;
  }

  var currentTranslate = Utils.getTranslate($wrapperEl[0], axis);
  if (rtl) { currentTranslate = -currentTranslate; }

  return currentTranslate || 0;
}

function setTranslate (translate, byController) {
  var swiper = this;
  var rtl = swiper.rtlTranslate;
  var params = swiper.params;
  var $wrapperEl = swiper.$wrapperEl;
  var progress = swiper.progress;
  var x = 0;
  var y = 0;
  var z = 0;

  if (swiper.isHorizontal()) {
    x = rtl ? -translate : translate;
  } else {
    y = translate;
  }

  if (params.roundLengths) {
    x = Math.floor(x);
    y = Math.floor(y);
  }

  if (!params.virtualTranslate) {
    if (Support.transforms3d) { $wrapperEl.transform(("translate3d(" + x + "px, " + y + "px, " + z + "px)")); }
    else { $wrapperEl.transform(("translate(" + x + "px, " + y + "px)")); }
  }

  swiper.translate = swiper.isHorizontal() ? x : y;

  // Check if we need to update progress
  var newProgress;
  var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  if (translatesDiff === 0) {
    newProgress = 0;
  } else {
    newProgress = (translate - swiper.minTranslate()) / (translatesDiff);
  }
  if (newProgress !== progress) {
    swiper.updateProgress(translate);
  }

  swiper.emit('setTranslate', swiper.translate, byController);
}

function minTranslate () {
  return (-this.snapGrid[0]);
}

function maxTranslate () {
  return (-this.snapGrid[this.snapGrid.length - 1]);
}

var translate = {
  getTranslate: getTranslate,
  setTranslate: setTranslate,
  minTranslate: minTranslate,
  maxTranslate: maxTranslate,
};

function setTransition (duration, byController) {
  var swiper = this;

  swiper.$wrapperEl.transition(duration);

  swiper.emit('setTransition', duration, byController);
}

function transitionStart (runCallbacks, direction) {
  if ( runCallbacks === void 0 ) runCallbacks = true;

  var swiper = this;
  var activeIndex = swiper.activeIndex;
  var params = swiper.params;
  var previousIndex = swiper.previousIndex;
  if (params.autoHeight) {
    swiper.updateAutoHeight();
  }

  var dir = direction;
  if (!dir) {
    if (activeIndex > previousIndex) { dir = 'next'; }
    else if (activeIndex < previousIndex) { dir = 'prev'; }
    else { dir = 'reset'; }
  }

  swiper.emit('transitionStart');

  if (runCallbacks && activeIndex !== previousIndex) {
    if (dir === 'reset') {
      swiper.emit('slideResetTransitionStart');
      return;
    }
    swiper.emit('slideChangeTransitionStart');
    if (dir === 'next') {
      swiper.emit('slideNextTransitionStart');
    } else {
      swiper.emit('slidePrevTransitionStart');
    }
  }
}

function transitionEnd$1 (runCallbacks, direction) {
  if ( runCallbacks === void 0 ) runCallbacks = true;

  var swiper = this;
  var activeIndex = swiper.activeIndex;
  var previousIndex = swiper.previousIndex;
  swiper.animating = false;
  swiper.setTransition(0);

  var dir = direction;
  if (!dir) {
    if (activeIndex > previousIndex) { dir = 'next'; }
    else if (activeIndex < previousIndex) { dir = 'prev'; }
    else { dir = 'reset'; }
  }

  swiper.emit('transitionEnd');

  if (runCallbacks && activeIndex !== previousIndex) {
    if (dir === 'reset') {
      swiper.emit('slideResetTransitionEnd');
      return;
    }
    swiper.emit('slideChangeTransitionEnd');
    if (dir === 'next') {
      swiper.emit('slideNextTransitionEnd');
    } else {
      swiper.emit('slidePrevTransitionEnd');
    }
  }
}

var transition$1 = {
  setTransition: setTransition,
  transitionStart: transitionStart,
  transitionEnd: transitionEnd$1,
};

function slideTo (index, speed, runCallbacks, internal) {
  if ( index === void 0 ) index = 0;
  if ( speed === void 0 ) speed = this.params.speed;
  if ( runCallbacks === void 0 ) runCallbacks = true;

  var swiper = this;
  var slideIndex = index;
  if (slideIndex < 0) { slideIndex = 0; }

  var params = swiper.params;
  var snapGrid = swiper.snapGrid;
  var slidesGrid = swiper.slidesGrid;
  var previousIndex = swiper.previousIndex;
  var activeIndex = swiper.activeIndex;
  var rtl = swiper.rtlTranslate;
  var $wrapperEl = swiper.$wrapperEl;
  if (swiper.animating && params.preventIntercationOnTransition) {
    return false;
  }

  var snapIndex = Math.floor(slideIndex / params.slidesPerGroup);
  if (snapIndex >= snapGrid.length) { snapIndex = snapGrid.length - 1; }

  if ((activeIndex || params.initialSlide || 0) === (previousIndex || 0) && runCallbacks) {
    swiper.emit('beforeSlideChangeStart');
  }

  var translate = -snapGrid[snapIndex];

  // Update progress
  swiper.updateProgress(translate);

  // Normalize slideIndex
  if (params.normalizeSlideIndex) {
    for (var i = 0; i < slidesGrid.length; i += 1) {
      if (-Math.floor(translate * 100) >= Math.floor(slidesGrid[i] * 100)) {
        slideIndex = i;
      }
    }
  }
  // Directions locks
  if (swiper.initialized && slideIndex !== activeIndex) {
    if (!swiper.allowSlideNext && translate < swiper.translate && translate < swiper.minTranslate()) {
      return false;
    }
    if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) {
      if ((activeIndex || 0) !== slideIndex) { return false; }
    }
  }

  var direction;
  if (slideIndex > activeIndex) { direction = 'next'; }
  else if (slideIndex < activeIndex) { direction = 'prev'; }
  else { direction = 'reset'; }


  // Update Index
  if ((rtl && -translate === swiper.translate) || (!rtl && translate === swiper.translate)) {
    swiper.updateActiveIndex(slideIndex);
    // Update Height
    if (params.autoHeight) {
      swiper.updateAutoHeight();
    }
    swiper.updateSlidesClasses();
    if (params.effect !== 'slide') {
      swiper.setTranslate(translate);
    }
    if (direction !== 'reset') {
      swiper.transitionStart(runCallbacks, direction);
      swiper.transitionEnd(runCallbacks, direction);
    }
    return false;
  }

  if (speed === 0 || !Support.transition) {
    swiper.setTransition(0);
    swiper.setTranslate(translate);
    swiper.updateActiveIndex(slideIndex);
    swiper.updateSlidesClasses();
    swiper.emit('beforeTransitionStart', speed, internal);
    swiper.transitionStart(runCallbacks, direction);
    swiper.transitionEnd(runCallbacks, direction);
  } else {
    swiper.setTransition(speed);
    swiper.setTranslate(translate);
    swiper.updateActiveIndex(slideIndex);
    swiper.updateSlidesClasses();
    swiper.emit('beforeTransitionStart', speed, internal);
    swiper.transitionStart(runCallbacks, direction);
    if (!swiper.animating) {
      swiper.animating = true;
      $wrapperEl.transitionEnd(function () {
        if (!swiper || swiper.destroyed) { return; }
        swiper.transitionEnd(runCallbacks, direction);
      });
    }
  }

  return true;
}

function slideToLoop (index, speed, runCallbacks, internal) {
  if ( index === void 0 ) index = 0;
  if ( speed === void 0 ) speed = this.params.speed;
  if ( runCallbacks === void 0 ) runCallbacks = true;

  var swiper = this;
  var newIndex = index;
  if (swiper.params.loop) {
    newIndex += swiper.loopedSlides;
  }

  return swiper.slideTo(newIndex, speed, runCallbacks, internal);
}

/* eslint no-unused-vars: "off" */
function slideNext (speed, runCallbacks, internal) {
  if ( speed === void 0 ) speed = this.params.speed;
  if ( runCallbacks === void 0 ) runCallbacks = true;

  var swiper = this;
  var params = swiper.params;
  var animating = swiper.animating;
  if (params.loop) {
    if (animating) { return false; }
    swiper.loopFix();
    // eslint-disable-next-line
    swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
    return swiper.slideTo(swiper.activeIndex + params.slidesPerGroup, speed, runCallbacks, internal);
  }
  return swiper.slideTo(swiper.activeIndex + params.slidesPerGroup, speed, runCallbacks, internal);
}

/* eslint no-unused-vars: "off" */
function slidePrev (speed, runCallbacks, internal) {
  if ( speed === void 0 ) speed = this.params.speed;
  if ( runCallbacks === void 0 ) runCallbacks = true;

  var swiper = this;
  var params = swiper.params;
  var animating = swiper.animating;
  var snapGrid = swiper.snapGrid;
  var slidesGrid = swiper.slidesGrid;
  var rtlTranslate = swiper.rtlTranslate;

  if (params.loop) {
    if (animating) { return false; }
    swiper.loopFix();
    // eslint-disable-next-line
    swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
  }
  var translate = rtlTranslate ? swiper.translate : -swiper.translate;
  var currentSnap = snapGrid[snapGrid.indexOf(translate)];
  var prevSnap = snapGrid[snapGrid.indexOf(translate) - 1];
  var prevIndex;

  if (prevSnap) {
    prevIndex = slidesGrid.indexOf(prevSnap);
    if (prevIndex < 0) { prevIndex = swiper.activeIndex - 1; }
  }
  return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
}

/* eslint no-unused-vars: "off" */
function slideReset (speed, runCallbacks, internal) {
  if ( speed === void 0 ) speed = this.params.speed;
  if ( runCallbacks === void 0 ) runCallbacks = true;

  var swiper = this;
  return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
}

/* eslint no-unused-vars: "off" */
function slideToClosest (speed, runCallbacks, internal) {
  if ( speed === void 0 ) speed = this.params.speed;
  if ( runCallbacks === void 0 ) runCallbacks = true;

  var swiper = this;
  var index = swiper.activeIndex;
  var snapIndex = Math.floor(index / swiper.params.slidesPerGroup);

  if (snapIndex < swiper.snapGrid.length - 1) {
    var translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;

    var currentSnap = swiper.snapGrid[snapIndex];
    var nextSnap = swiper.snapGrid[snapIndex + 1];

    if ((translate - currentSnap) > (nextSnap - currentSnap) / 2) {
      index = swiper.params.slidesPerGroup;
    }
  }

  return swiper.slideTo(index, speed, runCallbacks, internal);
}

function slideToClickedSlide () {
  var swiper = this;
  var params = swiper.params;
  var $wrapperEl = swiper.$wrapperEl;

  var slidesPerView = params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : params.slidesPerView;
  var slideToIndex = swiper.clickedIndex;
  var realIndex;
  if (params.loop) {
    if (swiper.animating) { return; }
    realIndex = parseInt($(swiper.clickedSlide).attr('data-swiper-slide-index'), 10);
    if (params.centeredSlides) {
      if (
        (slideToIndex < swiper.loopedSlides - (slidesPerView / 2)) ||
        (slideToIndex > (swiper.slides.length - swiper.loopedSlides) + (slidesPerView / 2))
      ) {
        swiper.loopFix();
        slideToIndex = $wrapperEl
          .children(("." + (params.slideClass) + "[data-swiper-slide-index=\"" + realIndex + "\"]:not(." + (params.slideDuplicateClass) + ")"))
          .eq(0)
          .index();

        Utils.nextTick(function () {
          swiper.slideTo(slideToIndex);
        });
      } else {
        swiper.slideTo(slideToIndex);
      }
    } else if (slideToIndex > swiper.slides.length - slidesPerView) {
      swiper.loopFix();
      slideToIndex = $wrapperEl
        .children(("." + (params.slideClass) + "[data-swiper-slide-index=\"" + realIndex + "\"]:not(." + (params.slideDuplicateClass) + ")"))
        .eq(0)
        .index();

      Utils.nextTick(function () {
        swiper.slideTo(slideToIndex);
      });
    } else {
      swiper.slideTo(slideToIndex);
    }
  } else {
    swiper.slideTo(slideToIndex);
  }
}

var slide = {
  slideTo: slideTo,
  slideToLoop: slideToLoop,
  slideNext: slideNext,
  slidePrev: slidePrev,
  slideReset: slideReset,
  slideToClosest: slideToClosest,
  slideToClickedSlide: slideToClickedSlide,
};

function loopCreate () {
  var swiper = this;
  var params = swiper.params;
  var $wrapperEl = swiper.$wrapperEl;
  // Remove duplicated slides
  $wrapperEl.children(("." + (params.slideClass) + "." + (params.slideDuplicateClass))).remove();

  var slides = $wrapperEl.children(("." + (params.slideClass)));

  if (params.loopFillGroupWithBlank) {
    var blankSlidesNum = params.slidesPerGroup - (slides.length % params.slidesPerGroup);
    if (blankSlidesNum !== params.slidesPerGroup) {
      for (var i = 0; i < blankSlidesNum; i += 1) {
        var blankNode = $(doc.createElement('div')).addClass(((params.slideClass) + " " + (params.slideBlankClass)));
        $wrapperEl.append(blankNode);
      }
      slides = $wrapperEl.children(("." + (params.slideClass)));
    }
  }

  if (params.slidesPerView === 'auto' && !params.loopedSlides) { params.loopedSlides = slides.length; }

  swiper.loopedSlides = parseInt(params.loopedSlides || params.slidesPerView, 10);
  swiper.loopedSlides += params.loopAdditionalSlides;
  if (swiper.loopedSlides > slides.length) {
    swiper.loopedSlides = slides.length;
  }

  var prependSlides = [];
  var appendSlides = [];
  slides.each(function (index, el) {
    var slide = $(el);
    if (index < swiper.loopedSlides) { appendSlides.push(el); }
    if (index < slides.length && index >= slides.length - swiper.loopedSlides) { prependSlides.push(el); }
    slide.attr('data-swiper-slide-index', index);
  });
  for (var i$1 = 0; i$1 < appendSlides.length; i$1 += 1) {
    $wrapperEl.append($(appendSlides[i$1].cloneNode(true)).addClass(params.slideDuplicateClass));
  }
  for (var i$2 = prependSlides.length - 1; i$2 >= 0; i$2 -= 1) {
    $wrapperEl.prepend($(prependSlides[i$2].cloneNode(true)).addClass(params.slideDuplicateClass));
  }
}

function loopFix () {
  var swiper = this;
  var params = swiper.params;
  var activeIndex = swiper.activeIndex;
  var slides = swiper.slides;
  var loopedSlides = swiper.loopedSlides;
  var allowSlidePrev = swiper.allowSlidePrev;
  var allowSlideNext = swiper.allowSlideNext;
  var snapGrid = swiper.snapGrid;
  var rtl = swiper.rtlTranslate;
  var newIndex;
  swiper.allowSlidePrev = true;
  swiper.allowSlideNext = true;

  var snapTranslate = -snapGrid[activeIndex];
  var diff = snapTranslate - swiper.getTranslate();


  // Fix For Negative Oversliding
  if (activeIndex < loopedSlides) {
    newIndex = (slides.length - (loopedSlides * 3)) + activeIndex;
    newIndex += loopedSlides;
    var slideChanged = swiper.slideTo(newIndex, 0, false, true);
    if (slideChanged && diff !== 0) {
      swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
    }
  } else if ((params.slidesPerView === 'auto' && activeIndex >= loopedSlides * 2) || (activeIndex > slides.length - (params.slidesPerView * 2))) {
    // Fix For Positive Oversliding
    newIndex = -slides.length + activeIndex + loopedSlides;
    newIndex += loopedSlides;
    var slideChanged$1 = swiper.slideTo(newIndex, 0, false, true);
    if (slideChanged$1 && diff !== 0) {
      swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
    }
  }
  swiper.allowSlidePrev = allowSlidePrev;
  swiper.allowSlideNext = allowSlideNext;
}

function loopDestroy () {
  var swiper = this;
  var $wrapperEl = swiper.$wrapperEl;
  var params = swiper.params;
  var slides = swiper.slides;
  $wrapperEl.children(("." + (params.slideClass) + "." + (params.slideDuplicateClass))).remove();
  slides.removeAttr('data-swiper-slide-index');
}

var loop = {
  loopCreate: loopCreate,
  loopFix: loopFix,
  loopDestroy: loopDestroy,
};

function setGrabCursor (moving) {
  var swiper = this;
  if (Support.touch || !swiper.params.simulateTouch) { return; }
  var el = swiper.el;
  el.style.cursor = 'move';
  el.style.cursor = moving ? '-webkit-grabbing' : '-webkit-grab';
  el.style.cursor = moving ? '-moz-grabbin' : '-moz-grab';
  el.style.cursor = moving ? 'grabbing' : 'grab';
}

function unsetGrabCursor () {
  var swiper = this;
  if (Support.touch) { return; }
  swiper.el.style.cursor = '';
}

var grabCursor = {
  setGrabCursor: setGrabCursor,
  unsetGrabCursor: unsetGrabCursor,
};

function appendSlide (slides) {
  var swiper = this;
  var $wrapperEl = swiper.$wrapperEl;
  var params = swiper.params;
  if (params.loop) {
    swiper.loopDestroy();
  }
  if (typeof slides === 'object' && 'length' in slides) {
    for (var i = 0; i < slides.length; i += 1) {
      if (slides[i]) { $wrapperEl.append(slides[i]); }
    }
  } else {
    $wrapperEl.append(slides);
  }
  if (params.loop) {
    swiper.loopCreate();
  }
  if (!(params.observer && Support.observer)) {
    swiper.update();
  }
}

function prependSlide (slides) {
  var swiper = this;
  var params = swiper.params;
  var $wrapperEl = swiper.$wrapperEl;
  var activeIndex = swiper.activeIndex;

  if (params.loop) {
    swiper.loopDestroy();
  }
  var newActiveIndex = activeIndex + 1;
  if (typeof slides === 'object' && 'length' in slides) {
    for (var i = 0; i < slides.length; i += 1) {
      if (slides[i]) { $wrapperEl.prepend(slides[i]); }
    }
    newActiveIndex = activeIndex + slides.length;
  } else {
    $wrapperEl.prepend(slides);
  }
  if (params.loop) {
    swiper.loopCreate();
  }
  if (!(params.observer && Support.observer)) {
    swiper.update();
  }
  swiper.slideTo(newActiveIndex, 0, false);
}

function removeSlide (slidesIndexes) {
  var swiper = this;
  var params = swiper.params;
  var $wrapperEl = swiper.$wrapperEl;
  var activeIndex = swiper.activeIndex;

  if (params.loop) {
    swiper.loopDestroy();
    swiper.slides = $wrapperEl.children(("." + (params.slideClass)));
  }
  var newActiveIndex = activeIndex;
  var indexToRemove;

  if (typeof slidesIndexes === 'object' && 'length' in slidesIndexes) {
    for (var i = 0; i < slidesIndexes.length; i += 1) {
      indexToRemove = slidesIndexes[i];
      if (swiper.slides[indexToRemove]) { swiper.slides.eq(indexToRemove).remove(); }
      if (indexToRemove < newActiveIndex) { newActiveIndex -= 1; }
    }
    newActiveIndex = Math.max(newActiveIndex, 0);
  } else {
    indexToRemove = slidesIndexes;
    if (swiper.slides[indexToRemove]) { swiper.slides.eq(indexToRemove).remove(); }
    if (indexToRemove < newActiveIndex) { newActiveIndex -= 1; }
    newActiveIndex = Math.max(newActiveIndex, 0);
  }

  if (params.loop) {
    swiper.loopCreate();
  }

  if (!(params.observer && Support.observer)) {
    swiper.update();
  }
  if (params.loop) {
    swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
  } else {
    swiper.slideTo(newActiveIndex, 0, false);
  }
}

function removeAllSlides () {
  var swiper = this;

  var slidesIndexes = [];
  for (var i = 0; i < swiper.slides.length; i += 1) {
    slidesIndexes.push(i);
  }
  swiper.removeSlide(slidesIndexes);
}

var manipulation = {
  appendSlide: appendSlide,
  prependSlide: prependSlide,
  removeSlide: removeSlide,
  removeAllSlides: removeAllSlides,
};

var Device = (function Device() {
  var ua = win.navigator.userAgent;

  var device = {
    ios: false,
    android: false,
    androidChrome: false,
    desktop: false,
    windows: false,
    iphone: false,
    ipod: false,
    ipad: false,
    cordova: win.cordova || win.phonegap,
    phonegap: win.cordova || win.phonegap,
  };

  var windows = ua.match(/(Windows Phone);?[\s\/]+([\d.]+)?/); // eslint-disable-line
  var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/); // eslint-disable-line
  var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
  var iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);


  // Windows
  if (windows) {
    device.os = 'windows';
    device.osVersion = windows[2];
    device.windows = true;
  }
  // Android
  if (android && !windows) {
    device.os = 'android';
    device.osVersion = android[2];
    device.android = true;
    device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
  }
  if (ipad || iphone || ipod) {
    device.os = 'ios';
    device.ios = true;
  }
  // iOS
  if (iphone && !ipod) {
    device.osVersion = iphone[2].replace(/_/g, '.');
    device.iphone = true;
  }
  if (ipad) {
    device.osVersion = ipad[2].replace(/_/g, '.');
    device.ipad = true;
  }
  if (ipod) {
    device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
    device.iphone = true;
  }
  // iOS 8+ changed UA
  if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
    if (device.osVersion.split('.')[0] === '10') {
      device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
    }
  }

  // Desktop
  device.desktop = !(device.os || device.android || device.webView);

  // Webview
  device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i);

  // Minimal UI
  if (device.os && device.os === 'ios') {
    var osVersionArr = device.osVersion.split('.');
    var metaViewport = doc.querySelector('meta[name="viewport"]');
    device.minimalUi =
      !device.webView &&
      (ipod || iphone) &&
      (osVersionArr[0] * 1 === 7 ? osVersionArr[1] * 1 >= 1 : osVersionArr[0] * 1 > 7) &&
      metaViewport && metaViewport.getAttribute('content').indexOf('minimal-ui') >= 0;
  }

  // Pixel Ratio
  device.pixelRatio = win.devicePixelRatio || 1;

  // Export object
  return device;
}());

function onTouchStart (event) {
  var swiper = this;
  var data = swiper.touchEventsData;
  var params = swiper.params;
  var touches = swiper.touches;
  if (swiper.animating && params.preventIntercationOnTransition) {
    return;
  }
  var e = event;
  if (e.originalEvent) { e = e.originalEvent; }
  data.isTouchEvent = e.type === 'touchstart';
  if (!data.isTouchEvent && 'which' in e && e.which === 3) { return; }
  if (data.isTouched && data.isMoved) { return; }
  if (params.noSwiping && $(e.target).closest(params.noSwipingSelector ? params.noSwipingSelector : ("." + (params.noSwipingClass)))[0]) {
    swiper.allowClick = true;
    return;
  }
  if (params.swipeHandler) {
    if (!$(e).closest(params.swipeHandler)[0]) { return; }
  }

  touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
  touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
  var startX = touches.currentX;
  var startY = touches.currentY;

  // Do NOT start if iOS edge swipe is detected. Otherwise iOS app (UIWebView) cannot swipe-to-go-back anymore

  if (
    Device.ios &&
    !Device.cordova &&
    params.iOSEdgeSwipeDetection &&
    (startX <= params.iOSEdgeSwipeThreshold) &&
    (startX >= win.screen.width - params.iOSEdgeSwipeThreshold)
  ) {
    return;
  }

  Utils.extend(data, {
    isTouched: true,
    isMoved: false,
    allowTouchCallbacks: true,
    isScrolling: undefined,
    startMoving: undefined,
  });

  touches.startX = startX;
  touches.startY = startY;
  data.touchStartTime = Utils.now();
  swiper.allowClick = true;
  swiper.updateSize();
  swiper.swipeDirection = undefined;
  if (params.threshold > 0) { data.allowThresholdMove = false; }
  if (e.type !== 'touchstart') {
    var preventDefault = true;
    if ($(e.target).is(data.formElements)) { preventDefault = false; }
    if (
      doc.activeElement &&
      $(doc.activeElement).is(data.formElements) &&
      doc.activeElement !== e.target
    ) {
      doc.activeElement.blur();
    }
    if (preventDefault && swiper.allowTouchMove) {
      e.preventDefault();
    }
  }
  swiper.emit('touchStart', e);
}

function onTouchMove (event) {
  var swiper = this;
  var data = swiper.touchEventsData;
  var params = swiper.params;
  var touches = swiper.touches;
  var rtl = swiper.rtlTranslate;
  var e = event;
  if (e.originalEvent) { e = e.originalEvent; }
  if (!data.isTouched) {
    if (data.startMoving && data.isScrolling) {
      swiper.emit('touchMoveOpposite', e);
    }
    return;
  }
  if (data.isTouchEvent && e.type === 'mousemove') { return; }
  var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
  var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
  if (e.preventedByNestedSwiper) {
    touches.startX = pageX;
    touches.startY = pageY;
    return;
  }
  if (!swiper.allowTouchMove) {
    // isMoved = true;
    swiper.allowClick = false;
    if (data.isTouched) {
      Utils.extend(touches, {
        startX: pageX,
        startY: pageY,
        currentX: pageX,
        currentY: pageY,
      });
      data.touchStartTime = Utils.now();
    }
    return;
  }
  if (data.isTouchEvent && params.touchReleaseOnEdges && !params.loop) {
    if (swiper.isVertical()) {
      // Vertical
      if (
        (pageY < touches.startY && swiper.translate <= swiper.maxTranslate()) ||
        (pageY > touches.startY && swiper.translate >= swiper.minTranslate())
      ) {
        data.isTouched = false;
        data.isMoved = false;
        return;
      }
    } else if (
      (pageX < touches.startX && swiper.translate <= swiper.maxTranslate()) ||
      (pageX > touches.startX && swiper.translate >= swiper.minTranslate())
    ) {
      return;
    }
  }
  if (data.isTouchEvent && doc.activeElement) {
    if (e.target === doc.activeElement && $(e.target).is(data.formElements)) {
      data.isMoved = true;
      swiper.allowClick = false;
      return;
    }
  }
  if (data.allowTouchCallbacks) {
    swiper.emit('touchMove', e);
  }
  if (e.targetTouches && e.targetTouches.length > 1) { return; }

  touches.currentX = pageX;
  touches.currentY = pageY;

  var diffX = touches.currentX - touches.startX;
  var diffY = touches.currentY - touches.startY;

  if (typeof data.isScrolling === 'undefined') {
    var touchAngle;
    if ((swiper.isHorizontal() && touches.currentY === touches.startY) || (swiper.isVertical() && touches.currentX === touches.startX)) {
      data.isScrolling = false;
    } else {
      // eslint-disable-next-line
      if ((diffX * diffX) + (diffY * diffY) >= 25) {
        touchAngle = (Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180) / Math.PI;
        data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : (90 - touchAngle > params.touchAngle);
      }
    }
  }
  if (data.isScrolling) {
    swiper.emit('touchMoveOpposite', e);
  }
  if (typeof startMoving === 'undefined') {
    if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
      data.startMoving = true;
    }
  }
  if (data.isScrolling) {
    data.isTouched = false;
    return;
  }
  if (!data.startMoving) {
    return;
  }
  swiper.allowClick = false;
  e.preventDefault();
  if (params.touchMoveStopPropagation && !params.nested) {
    e.stopPropagation();
  }

  if (!data.isMoved) {
    if (params.loop) {
      swiper.loopFix();
    }
    data.startTranslate = swiper.getTranslate();
    swiper.setTransition(0);
    if (swiper.animating) {
      swiper.$wrapperEl.trigger('webkitTransitionEnd transitionend');
    }
    data.allowMomentumBounce = false;
    // Grab Cursor
    if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
      swiper.setGrabCursor(true);
    }
    swiper.emit('sliderFirstMove', e);
  }
  swiper.emit('sliderMove', e);
  data.isMoved = true;

  var diff = swiper.isHorizontal() ? diffX : diffY;
  touches.diff = diff;

  diff *= params.touchRatio;
  if (rtl) { diff = -diff; }

  swiper.swipeDirection = diff > 0 ? 'prev' : 'next';
  data.currentTranslate = diff + data.startTranslate;

  var disableParentSwiper = true;
  var resistanceRatio = params.resistanceRatio;
  if (params.touchReleaseOnEdges) {
    resistanceRatio = 0;
  }
  if ((diff > 0 && data.currentTranslate > swiper.minTranslate())) {
    disableParentSwiper = false;
    if (params.resistance) { data.currentTranslate = (swiper.minTranslate() - 1) + (Math.pow( (-swiper.minTranslate() + data.startTranslate + diff), resistanceRatio )); }
  } else if (diff < 0 && data.currentTranslate < swiper.maxTranslate()) {
    disableParentSwiper = false;
    if (params.resistance) { data.currentTranslate = (swiper.maxTranslate() + 1) - (Math.pow( (swiper.maxTranslate() - data.startTranslate - diff), resistanceRatio )); }
  }

  if (disableParentSwiper) {
    e.preventedByNestedSwiper = true;
  }

  // Directions locks
  if (!swiper.allowSlideNext && swiper.swipeDirection === 'next' && data.currentTranslate < data.startTranslate) {
    data.currentTranslate = data.startTranslate;
  }
  if (!swiper.allowSlidePrev && swiper.swipeDirection === 'prev' && data.currentTranslate > data.startTranslate) {
    data.currentTranslate = data.startTranslate;
  }


  // Threshold
  if (params.threshold > 0) {
    if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
      if (!data.allowThresholdMove) {
        data.allowThresholdMove = true;
        touches.startX = touches.currentX;
        touches.startY = touches.currentY;
        data.currentTranslate = data.startTranslate;
        touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
        return;
      }
    } else {
      data.currentTranslate = data.startTranslate;
      return;
    }
  }

  if (!params.followFinger) { return; }

  // Update active index in free mode
  if (params.freeMode || params.watchSlidesProgress || params.watchSlidesVisibility) {
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
  }
  if (params.freeMode) {
    // Velocity
    if (data.velocities.length === 0) {
      data.velocities.push({
        position: touches[swiper.isHorizontal() ? 'startX' : 'startY'],
        time: data.touchStartTime,
      });
    }
    data.velocities.push({
      position: touches[swiper.isHorizontal() ? 'currentX' : 'currentY'],
      time: Utils.now(),
    });
  }
  // Update progress
  swiper.updateProgress(data.currentTranslate);
  // Update translate
  swiper.setTranslate(data.currentTranslate);
}

function onTouchEnd (event) {
  var swiper = this;
  var data = swiper.touchEventsData;

  var params = swiper.params;
  var touches = swiper.touches;
  var rtl = swiper.rtlTranslate;
  var $wrapperEl = swiper.$wrapperEl;
  var slidesGrid = swiper.slidesGrid;
  var snapGrid = swiper.snapGrid;
  var e = event;
  if (e.originalEvent) { e = e.originalEvent; }
  if (data.allowTouchCallbacks) {
    swiper.emit('touchEnd', e);
  }
  data.allowTouchCallbacks = false;
  if (!data.isTouched) {
    if (data.isMoved && params.grabCursor) {
      swiper.setGrabCursor(false);
    }
    data.isMoved = false;
    data.startMoving = false;
    return;
  }
  // Return Grab Cursor
  if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
    swiper.setGrabCursor(false);
  }

  // Time diff
  var touchEndTime = Utils.now();
  var timeDiff = touchEndTime - data.touchStartTime;

  // Tap, doubleTap, Click
  if (swiper.allowClick) {
    swiper.updateClickedSlide(e);
    swiper.emit('tap', e);
    if (timeDiff < 300 && (touchEndTime - data.lastClickTime) > 300) {
      if (data.clickTimeout) { clearTimeout(data.clickTimeout); }
      data.clickTimeout = Utils.nextTick(function () {
        if (!swiper || swiper.destroyed) { return; }
        swiper.emit('click', e);
      }, 300);
    }
    if (timeDiff < 300 && (touchEndTime - data.lastClickTime) < 300) {
      if (data.clickTimeout) { clearTimeout(data.clickTimeout); }
      swiper.emit('doubleTap', e);
    }
  }

  data.lastClickTime = Utils.now();
  Utils.nextTick(function () {
    if (!swiper.destroyed) { swiper.allowClick = true; }
  });

  if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 || data.currentTranslate === data.startTranslate) {
    data.isTouched = false;
    data.isMoved = false;
    data.startMoving = false;
    return;
  }
  data.isTouched = false;
  data.isMoved = false;
  data.startMoving = false;

  var currentPos;
  if (params.followFinger) {
    currentPos = rtl ? swiper.translate : -swiper.translate;
  } else {
    currentPos = -data.currentTranslate;
  }

  if (params.freeMode) {
    if (currentPos < -swiper.minTranslate()) {
      swiper.slideTo(swiper.activeIndex);
      return;
    } else if (currentPos > -swiper.maxTranslate()) {
      if (swiper.slides.length < snapGrid.length) {
        swiper.slideTo(snapGrid.length - 1);
      } else {
        swiper.slideTo(swiper.slides.length - 1);
      }
      return;
    }

    if (params.freeModeMomentum) {
      if (data.velocities.length > 1) {
        var lastMoveEvent = data.velocities.pop();
        var velocityEvent = data.velocities.pop();

        var distance = lastMoveEvent.position - velocityEvent.position;
        var time = lastMoveEvent.time - velocityEvent.time;
        swiper.velocity = distance / time;
        swiper.velocity /= 2;
        if (Math.abs(swiper.velocity) < params.freeModeMinimumVelocity) {
          swiper.velocity = 0;
        }
        // this implies that the user stopped moving a finger then released.
        // There would be no events with distance zero, so the last event is stale.
        if (time > 150 || (Utils.now() - lastMoveEvent.time) > 300) {
          swiper.velocity = 0;
        }
      } else {
        swiper.velocity = 0;
      }
      swiper.velocity *= params.freeModeMomentumVelocityRatio;

      data.velocities.length = 0;
      var momentumDuration = 1000 * params.freeModeMomentumRatio;
      var momentumDistance = swiper.velocity * momentumDuration;

      var newPosition = swiper.translate + momentumDistance;
      if (rtl) { newPosition = -newPosition; }

      var doBounce = false;
      var afterBouncePosition;
      var bounceAmount = Math.abs(swiper.velocity) * 20 * params.freeModeMomentumBounceRatio;
      var needsLoopFix;
      if (newPosition < swiper.maxTranslate()) {
        if (params.freeModeMomentumBounce) {
          if (newPosition + swiper.maxTranslate() < -bounceAmount) {
            newPosition = swiper.maxTranslate() - bounceAmount;
          }
          afterBouncePosition = swiper.maxTranslate();
          doBounce = true;
          data.allowMomentumBounce = true;
        } else {
          newPosition = swiper.maxTranslate();
        }
        if (params.loop && params.centeredSlides) { needsLoopFix = true; }
      } else if (newPosition > swiper.minTranslate()) {
        if (params.freeModeMomentumBounce) {
          if (newPosition - swiper.minTranslate() > bounceAmount) {
            newPosition = swiper.minTranslate() + bounceAmount;
          }
          afterBouncePosition = swiper.minTranslate();
          doBounce = true;
          data.allowMomentumBounce = true;
        } else {
          newPosition = swiper.minTranslate();
        }
        if (params.loop && params.centeredSlides) { needsLoopFix = true; }
      } else if (params.freeModeSticky) {
        var nextSlide;
        for (var j = 0; j < snapGrid.length; j += 1) {
          if (snapGrid[j] > -newPosition) {
            nextSlide = j;
            break;
          }
        }

        if (Math.abs(snapGrid[nextSlide] - newPosition) < Math.abs(snapGrid[nextSlide - 1] - newPosition) || swiper.swipeDirection === 'next') {
          newPosition = snapGrid[nextSlide];
        } else {
          newPosition = snapGrid[nextSlide - 1];
        }
        newPosition = -newPosition;
      }
      if (needsLoopFix) {
        swiper.once('transitionEnd', function () {
          swiper.loopFix();
        });
      }
      // Fix duration
      if (swiper.velocity !== 0) {
        if (rtl) {
          momentumDuration = Math.abs((-newPosition - swiper.translate) / swiper.velocity);
        } else {
          momentumDuration = Math.abs((newPosition - swiper.translate) / swiper.velocity);
        }
      } else if (params.freeModeSticky) {
        swiper.slideToClosest();
        return;
      }

      if (params.freeModeMomentumBounce && doBounce) {
        swiper.updateProgress(afterBouncePosition);
        swiper.setTransition(momentumDuration);
        swiper.setTranslate(newPosition);
        swiper.transitionStart(true, swiper.swipeDirection);
        swiper.animating = true;
        $wrapperEl.transitionEnd(function () {
          if (!swiper || swiper.destroyed || !data.allowMomentumBounce) { return; }
          swiper.emit('momentumBounce');

          swiper.setTransition(params.speed);
          swiper.setTranslate(afterBouncePosition);
          $wrapperEl.transitionEnd(function () {
            if (!swiper || swiper.destroyed) { return; }
            swiper.transitionEnd();
          });
        });
      } else if (swiper.velocity) {
        swiper.updateProgress(newPosition);
        swiper.setTransition(momentumDuration);
        swiper.setTranslate(newPosition);
        swiper.transitionStart(true, swiper.swipeDirection);
        if (!swiper.animating) {
          swiper.animating = true;
          $wrapperEl.transitionEnd(function () {
            if (!swiper || swiper.destroyed) { return; }
            swiper.transitionEnd();
          });
        }
      } else {
        swiper.updateProgress(newPosition);
      }

      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    } else if (params.freeModeSticky) {
      swiper.slideToClosest();
      return;
    }

    if (!params.freeModeMomentum || timeDiff >= params.longSwipesMs) {
      swiper.updateProgress();
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
    return;
  }

  // Find current slide
  var stopIndex = 0;
  var groupSize = swiper.slidesSizesGrid[0];
  for (var i = 0; i < slidesGrid.length; i += params.slidesPerGroup) {
    if (typeof slidesGrid[i + params.slidesPerGroup] !== 'undefined') {
      if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + params.slidesPerGroup]) {
        stopIndex = i;
        groupSize = slidesGrid[i + params.slidesPerGroup] - slidesGrid[i];
      }
    } else if (currentPos >= slidesGrid[i]) {
      stopIndex = i;
      groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
    }
  }

  // Find current slide size
  var ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;

  if (timeDiff > params.longSwipesMs) {
    // Long touches
    if (!params.longSwipes) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }
    if (swiper.swipeDirection === 'next') {
      if (ratio >= params.longSwipesRatio) { swiper.slideTo(stopIndex + params.slidesPerGroup); }
      else { swiper.slideTo(stopIndex); }
    }
    if (swiper.swipeDirection === 'prev') {
      if (ratio > (1 - params.longSwipesRatio)) { swiper.slideTo(stopIndex + params.slidesPerGroup); }
      else { swiper.slideTo(stopIndex); }
    }
  } else {
    // Short swipes
    if (!params.shortSwipes) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }
    if (swiper.swipeDirection === 'next') {
      swiper.slideTo(stopIndex + params.slidesPerGroup);
    }
    if (swiper.swipeDirection === 'prev') {
      swiper.slideTo(stopIndex);
    }
  }
}

function onResize () {
  var swiper = this;

  var params = swiper.params;
  var el = swiper.el;

  if (el && el.offsetWidth === 0) { return; }

  // Breakpoints
  if (params.breakpoints) {
    swiper.setBreakpoint();
  }

  // Save locks
  var allowSlideNext = swiper.allowSlideNext;
  var allowSlidePrev = swiper.allowSlidePrev;
  var snapGrid = swiper.snapGrid;

  // Disable locks on resize
  swiper.allowSlideNext = true;
  swiper.allowSlidePrev = true;

  swiper.updateSize();
  swiper.updateSlides();

  if (params.freeMode) {
    var newTranslate = Math.min(Math.max(swiper.translate, swiper.maxTranslate()), swiper.minTranslate());
    swiper.setTranslate(newTranslate);
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();

    if (params.autoHeight) {
      swiper.updateAutoHeight();
    }
  } else {
    swiper.updateSlidesClasses();
    if ((params.slidesPerView === 'auto' || params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
      swiper.slideTo(swiper.slides.length - 1, 0, false, true);
    } else {
      swiper.slideTo(swiper.activeIndex, 0, false, true);
    }
  }
  // Return locks after resize
  swiper.allowSlidePrev = allowSlidePrev;
  swiper.allowSlideNext = allowSlideNext;

  if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
    swiper.checkOverflow();
  }
}

function onClick (e) {
  var swiper = this;
  if (!swiper.allowClick) {
    if (swiper.params.preventClicks) { e.preventDefault(); }
    if (swiper.params.preventClicksPropagation && swiper.animating) {
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
  }
}

function attachEvents() {
  var swiper = this;
  var params = swiper.params;
  var touchEvents = swiper.touchEvents;
  var el = swiper.el;
  var wrapperEl = swiper.wrapperEl;

  {
    swiper.onTouchStart = onTouchStart.bind(swiper);
    swiper.onTouchMove = onTouchMove.bind(swiper);
    swiper.onTouchEnd = onTouchEnd.bind(swiper);
  }

  swiper.onClick = onClick.bind(swiper);

  var target = params.touchEventsTarget === 'container' ? el : wrapperEl;
  var capture = !!params.nested;

  // Touch Events
  {
    if (!Support.touch && (Support.pointerEvents || Support.prefixedPointerEvents)) {
      target.addEventListener(touchEvents.start, swiper.onTouchStart, false);
      doc.addEventListener(touchEvents.move, swiper.onTouchMove, capture);
      doc.addEventListener(touchEvents.end, swiper.onTouchEnd, false);
    } else {
      if (Support.touch) {
        var passiveListener = touchEvents.start === 'touchstart' && Support.passiveListener && params.passiveListeners ? { passive: true, capture: false } : false;
        target.addEventListener(touchEvents.start, swiper.onTouchStart, passiveListener);
        target.addEventListener(touchEvents.move, swiper.onTouchMove, Support.passiveListener ? { passive: false, capture: capture } : capture);
        target.addEventListener(touchEvents.end, swiper.onTouchEnd, passiveListener);
      }
      if ((params.simulateTouch && !Device.ios && !Device.android) || (params.simulateTouch && !Support.touch && Device.ios)) {
        target.addEventListener('mousedown', swiper.onTouchStart, false);
        doc.addEventListener('mousemove', swiper.onTouchMove, capture);
        doc.addEventListener('mouseup', swiper.onTouchEnd, false);
      }
    }
    // Prevent Links Clicks
    if (params.preventClicks || params.preventClicksPropagation) {
      target.addEventListener('click', swiper.onClick, true);
    }
  }

  // Resize handler
  swiper.on('resize observerUpdate', onResize, true);
}

function detachEvents() {
  var swiper = this;

  var params = swiper.params;
  var touchEvents = swiper.touchEvents;
  var el = swiper.el;
  var wrapperEl = swiper.wrapperEl;

  var target = params.touchEventsTarget === 'container' ? el : wrapperEl;
  var capture = !!params.nested;

  // Touch Events
  {
    if (!Support.touch && (Support.pointerEvents || Support.prefixedPointerEvents)) {
      target.removeEventListener(touchEvents.start, swiper.onTouchStart, false);
      doc.removeEventListener(touchEvents.move, swiper.onTouchMove, capture);
      doc.removeEventListener(touchEvents.end, swiper.onTouchEnd, false);
    } else {
      if (Support.touch) {
        var passiveListener = touchEvents.start === 'onTouchStart' && Support.passiveListener && params.passiveListeners ? { passive: true, capture: false } : false;
        target.removeEventListener(touchEvents.start, swiper.onTouchStart, passiveListener);
        target.removeEventListener(touchEvents.move, swiper.onTouchMove, capture);
        target.removeEventListener(touchEvents.end, swiper.onTouchEnd, passiveListener);
      }
      if ((params.simulateTouch && !Device.ios && !Device.android) || (params.simulateTouch && !Support.touch && Device.ios)) {
        target.removeEventListener('mousedown', swiper.onTouchStart, false);
        doc.removeEventListener('mousemove', swiper.onTouchMove, capture);
        doc.removeEventListener('mouseup', swiper.onTouchEnd, false);
      }
    }
    // Prevent Links Clicks
    if (params.preventClicks || params.preventClicksPropagation) {
      target.removeEventListener('click', swiper.onClick, true);
    }
  }

  // Resize handler
  swiper.off('resize observerUpdate', onResize);
}

var events = {
  attachEvents: attachEvents,
  detachEvents: detachEvents,
};

function setBreakpoint () {
  var swiper = this;
  var activeIndex = swiper.activeIndex;
  var loopedSlides = swiper.loopedSlides; if ( loopedSlides === void 0 ) loopedSlides = 0;
  var params = swiper.params;
  var breakpoints = params.breakpoints;
  if (!breakpoints || (breakpoints && Object.keys(breakpoints).length === 0)) { return; }
  // Set breakpoint for window width and update parameters
  var breakpoint = swiper.getBreakpoint(breakpoints);
  if (breakpoint && swiper.currentBreakpoint !== breakpoint) {
    var breakPointsParams = breakpoint in breakpoints ? breakpoints[breakpoint] : swiper.originalParams;
    var needsReLoop = params.loop && (breakPointsParams.slidesPerView !== params.slidesPerView);

    Utils.extend(swiper.params, breakPointsParams);

    Utils.extend(swiper, {
      allowTouchMove: swiper.params.allowTouchMove,
      allowSlideNext: swiper.params.allowSlideNext,
      allowSlidePrev: swiper.params.allowSlidePrev,
    });

    swiper.currentBreakpoint = breakpoint;

    if (needsReLoop) {
      swiper.loopDestroy();
      swiper.loopCreate();
      swiper.updateSlides();
      swiper.slideTo((activeIndex - loopedSlides) + swiper.loopedSlides, 0, false);
    }
    swiper.emit('breakpoint', breakPointsParams);
  }
}

function getBreakpoint (breakpoints) {
  // Get breakpoint for window width
  if (!breakpoints) { return undefined; }
  var breakpoint = false;
  var points = [];
  Object.keys(breakpoints).forEach(function (point) {
    points.push(point);
  });
  points.sort(function (a, b) { return parseInt(a, 10) - parseInt(b, 10); });
  for (var i = 0; i < points.length; i += 1) {
    var point = points[i];
    if (point >= win.innerWidth && !breakpoint) {
      breakpoint = point;
    }
  }
  return breakpoint || 'max';
}

var breakpoints = { setBreakpoint: setBreakpoint, getBreakpoint: getBreakpoint };

var Browser = (function Browser() {
  function isSafari() {
    var ua = win.navigator.userAgent.toLowerCase();
    return (ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0);
  }
  return {
    isIE: !!win.navigator.userAgent.match(/Trident/g) || !!win.navigator.userAgent.match(/MSIE/g),
    isSafari: isSafari(),
    isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(win.navigator.userAgent),
  };
}());

function addClasses () {
  var swiper = this;
  var classNames = swiper.classNames;
  var params = swiper.params;
  var rtl = swiper.rtl;
  var $el = swiper.$el;
  var suffixes = [];

  suffixes.push(params.direction);

  if (params.freeMode) {
    suffixes.push('free-mode');
  }
  if (!Support.flexbox) {
    suffixes.push('no-flexbox');
  }
  if (params.autoHeight) {
    suffixes.push('autoheight');
  }
  if (rtl) {
    suffixes.push('rtl');
  }
  if (params.slidesPerColumn > 1) {
    suffixes.push('multirow');
  }
  if (Device.android) {
    suffixes.push('android');
  }
  if (Device.ios) {
    suffixes.push('ios');
  }
  // WP8 Touch Events Fix
  if (Browser.isIE && (Support.pointerEvents || Support.prefixedPointerEvents)) {
    suffixes.push(("wp8-" + (params.direction)));
  }

  suffixes.forEach(function (suffix) {
    classNames.push(params.containerModifierClass + suffix);
  });

  $el.addClass(classNames.join(' '));
}

function removeClasses () {
  var swiper = this;
  var $el = swiper.$el;
  var classNames = swiper.classNames;

  $el.removeClass(classNames.join(' '));
}

var classes = { addClasses: addClasses, removeClasses: removeClasses };

function loadImage (imageEl, src, srcset, sizes, checkForComplete, callback) {
  var image;
  function onReady() {
    if (callback) { callback(); }
  }
  if (!imageEl.complete || !checkForComplete) {
    if (src) {
      image = new win.Image();
      image.onload = onReady;
      image.onerror = onReady;
      if (sizes) {
        image.sizes = sizes;
      }
      if (srcset) {
        image.srcset = srcset;
      }
      if (src) {
        image.src = src;
      }
    } else {
      onReady();
    }
  } else {
    // image already loaded...
    onReady();
  }
}

function preloadImages () {
  var swiper = this;
  swiper.imagesToLoad = swiper.$el.find('img');
  function onReady() {
    if (typeof swiper === 'undefined' || swiper === null || !swiper || swiper.destroyed) { return; }
    if (swiper.imagesLoaded !== undefined) { swiper.imagesLoaded += 1; }
    if (swiper.imagesLoaded === swiper.imagesToLoad.length) {
      if (swiper.params.updateOnImagesReady) { swiper.update(); }
      swiper.emit('imagesReady');
    }
  }
  for (var i = 0; i < swiper.imagesToLoad.length; i += 1) {
    var imageEl = swiper.imagesToLoad[i];
    swiper.loadImage(
      imageEl,
      imageEl.currentSrc || imageEl.getAttribute('src'),
      imageEl.srcset || imageEl.getAttribute('srcset'),
      imageEl.sizes || imageEl.getAttribute('sizes'),
      true,
      onReady
    );
  }
}

var images = {
  loadImage: loadImage,
  preloadImages: preloadImages,
};

function checkOverflow() {
  var swiper = this;
  var wasLocked = swiper.isLocked;

  swiper.isLocked = swiper.snapGrid.length === 1;
  swiper.allowSlideNext = !swiper.isLocked;
  swiper.allowSlidePrev = !swiper.isLocked;

  // events
  if (wasLocked !== swiper.isLocked) { swiper.emit(swiper.isLocked ? 'lock' : 'unlock'); }

  if (wasLocked && wasLocked !== swiper.isLocked) {
    swiper.isEnd = false;
    swiper.navigation.update();
  }
}

var checkOverflow$1 = { checkOverflow: checkOverflow };

var defaults = {
  init: true,
  direction: 'horizontal',
  touchEventsTarget: 'container',
  initialSlide: 0,
  speed: 300,
  //
  preventIntercationOnTransition: false,

  // To support iOS's swipe-to-go-back gesture (when being used in-app, with UIWebView).
  iOSEdgeSwipeDetection: false,
  iOSEdgeSwipeThreshold: 20,

  // Free mode
  freeMode: false,
  freeModeMomentum: true,
  freeModeMomentumRatio: 1,
  freeModeMomentumBounce: true,
  freeModeMomentumBounceRatio: 1,
  freeModeMomentumVelocityRatio: 1,
  freeModeSticky: false,
  freeModeMinimumVelocity: 0.02,

  // Autoheight
  autoHeight: false,

  // Set wrapper width
  setWrapperSize: false,

  // Virtual Translate
  virtualTranslate: false,

  // Effects
  effect: 'slide', // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'

  // Breakpoints
  breakpoints: undefined,

  // Slides grid
  spaceBetween: 0,
  slidesPerView: 1,
  slidesPerColumn: 1,
  slidesPerColumnFill: 'column',
  slidesPerGroup: 1,
  centeredSlides: false,
  slidesOffsetBefore: 0, // in px
  slidesOffsetAfter: 0, // in px
  normalizeSlideIndex: true,

  // Disable swiper and hide navigation when container not overflow
  watchOverflow: false,

  // Round length
  roundLengths: false,

  // Touches
  touchRatio: 1,
  touchAngle: 45,
  simulateTouch: true,
  shortSwipes: true,
  longSwipes: true,
  longSwipesRatio: 0.5,
  longSwipesMs: 300,
  followFinger: true,
  allowTouchMove: true,
  threshold: 0,
  touchMoveStopPropagation: true,
  touchReleaseOnEdges: false,

  // Unique Navigation Elements
  uniqueNavElements: true,

  // Resistance
  resistance: true,
  resistanceRatio: 0.85,

  // Progress
  watchSlidesProgress: false,
  watchSlidesVisibility: false,

  // Cursor
  grabCursor: false,

  // Clicks
  preventClicks: true,
  preventClicksPropagation: true,
  slideToClickedSlide: false,

  // Images
  preloadImages: true,
  updateOnImagesReady: true,

  // loop
  loop: false,
  loopAdditionalSlides: 0,
  loopedSlides: null,
  loopFillGroupWithBlank: false,

  // Swiping/no swiping
  allowSlidePrev: true,
  allowSlideNext: true,
  swipeHandler: null, // '.swipe-handler',
  noSwiping: true,
  noSwipingClass: 'swiper-no-swiping',
  noSwipingSelector: null,

  // Passive Listeners
  passiveListeners: true,

  // NS
  containerModifierClass: 'swiper-container-', // NEW
  slideClass: 'swiper-slide',
  slideBlankClass: 'swiper-slide-invisible-blank',
  slideActiveClass: 'swiper-slide-active',
  slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
  slideVisibleClass: 'swiper-slide-visible',
  slideDuplicateClass: 'swiper-slide-duplicate',
  slideNextClass: 'swiper-slide-next',
  slideDuplicateNextClass: 'swiper-slide-duplicate-next',
  slidePrevClass: 'swiper-slide-prev',
  slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
  wrapperClass: 'swiper-wrapper',

  // Callbacks
  runCallbacksOnInit: true,
};

var prototypes = {
  update: update,
  translate: translate,
  transition: transition$1,
  slide: slide,
  loop: loop,
  grabCursor: grabCursor,
  manipulation: manipulation,
  events: events,
  breakpoints: breakpoints,
  checkOverflow: checkOverflow$1,
  classes: classes,
  images: images,
};

var extendedDefaults = {};

var Swiper = (function (SwiperClass$$1) {
  function Swiper() {
    var assign;

    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];
    var el;
    var params;
    if (args.length === 1 && args[0].constructor && args[0].constructor === Object) {
      params = args[0];
    } else {
      (assign = args, el = assign[0], params = assign[1]);
    }
    if (!params) { params = {}; }

    params = Utils.extend({}, params);
    if (el && !params.el) { params.el = el; }

    SwiperClass$$1.call(this, params);

    Object.keys(prototypes).forEach(function (prototypeGroup) {
      Object.keys(prototypes[prototypeGroup]).forEach(function (protoMethod) {
        if (!Swiper.prototype[protoMethod]) {
          Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
        }
      });
    });

    // Swiper Instance
    var swiper = this;
    if (typeof swiper.modules === 'undefined') {
      swiper.modules = {};
    }
    Object.keys(swiper.modules).forEach(function (moduleName) {
      var module = swiper.modules[moduleName];
      if (module.params) {
        var moduleParamName = Object.keys(module.params)[0];
        var moduleParams = module.params[moduleParamName];
        if (typeof moduleParams !== 'object') { return; }
        if (!(moduleParamName in params && 'enabled' in moduleParams)) { return; }
        if (params[moduleParamName] === true) {
          params[moduleParamName] = { enabled: true };
        }
        if (
          typeof params[moduleParamName] === 'object' &&
          !('enabled' in params[moduleParamName])
        ) {
          params[moduleParamName].enabled = true;
        }
        if (!params[moduleParamName]) { params[moduleParamName] = { enabled: false }; }
      }
    });

    // Extend defaults with modules params
    var swiperParams = Utils.extend({}, defaults);
    swiper.useModulesParams(swiperParams);

    // Extend defaults with passed params
    swiper.params = Utils.extend({}, swiperParams, extendedDefaults, params);
    swiper.originalParams = Utils.extend({}, swiper.params);
    swiper.passedParams = Utils.extend({}, params);

    // Save Dom lib
    swiper.$ = $;

    // Find el
    var $el = $(swiper.params.el);
    el = $el[0];

    if (!el) {
      return undefined;
    }

    if ($el.length > 1) {
      var swipers = [];
      $el.each(function (index, containerEl) {
        var newParams = Utils.extend({}, params, { el: containerEl });
        swipers.push(new Swiper(newParams));
      });
      return swipers;
    }

    el.swiper = swiper;
    $el.data('swiper', swiper);

    // Find Wrapper
    var $wrapperEl = $el.children(("." + (swiper.params.wrapperClass)));

    // Extend Swiper
    Utils.extend(swiper, {
      $el: $el,
      el: el,
      $wrapperEl: $wrapperEl,
      wrapperEl: $wrapperEl[0],

      // Classes
      classNames: [],

      // Slides
      slides: $(),
      slidesGrid: [],
      snapGrid: [],
      slidesSizesGrid: [],

      // isDirection
      isHorizontal: function isHorizontal() {
        return swiper.params.direction === 'horizontal';
      },
      isVertical: function isVertical() {
        return swiper.params.direction === 'vertical';
      },
      // RTL
      rtl: (el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl'),
      rtlTranslate: swiper.params.direction === 'horizontal' && (el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl'),
      wrongRTL: $wrapperEl.css('display') === '-webkit-box',

      // Indexes
      activeIndex: 0,
      realIndex: 0,

      //
      isBeginning: true,
      isEnd: false,

      // Props
      translate: 0,
      progress: 0,
      velocity: 0,
      animating: false,

      // Locks
      allowSlideNext: swiper.params.allowSlideNext,
      allowSlidePrev: swiper.params.allowSlidePrev,

      // Touch Events
      touchEvents: (function touchEvents() {
        var touch = ['touchstart', 'touchmove', 'touchend'];
        var desktop = ['mousedown', 'mousemove', 'mouseup'];
        if (Support.pointerEvents) {
          desktop = ['pointerdown', 'pointermove', 'pointerup'];
        } else if (Support.prefixedPointerEvents) {
          desktop = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp'];
        }
        swiper.touchEventsTouch = {
          start: touch[0],
          move: touch[1],
          end: touch[2],
        };
        swiper.touchEventsDesktop = {
          start: desktop[0],
          move: desktop[1],
          end: desktop[2],
        };
        return Support.touch || !swiper.params.simulateTouch ? swiper.touchEventsTouch : swiper.touchEventsDesktop;
      }()),
      touchEventsData: {
        isTouched: undefined,
        isMoved: undefined,
        allowTouchCallbacks: undefined,
        touchStartTime: undefined,
        isScrolling: undefined,
        currentTranslate: undefined,
        startTranslate: undefined,
        allowThresholdMove: undefined,
        // Form elements to match
        formElements: 'input, select, option, textarea, button, video',
        // Last click time
        lastClickTime: Utils.now(),
        clickTimeout: undefined,
        // Velocities
        velocities: [],
        allowMomentumBounce: undefined,
        isTouchEvent: undefined,
        startMoving: undefined,
      },

      // Clicks
      allowClick: true,

      // Touches
      allowTouchMove: swiper.params.allowTouchMove,

      touches: {
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        diff: 0,
      },

      // Images
      imagesToLoad: [],
      imagesLoaded: 0,

    });

    // Install Modules
    swiper.useModules();

    // Init
    if (swiper.params.init) {
      swiper.init();
    }

    // Return app instance
    return swiper;
  }

  if ( SwiperClass$$1 ) Swiper.__proto__ = SwiperClass$$1;
  Swiper.prototype = Object.create( SwiperClass$$1 && SwiperClass$$1.prototype );
  Swiper.prototype.constructor = Swiper;

  var staticAccessors = { extendedDefaults: { configurable: true },defaults: { configurable: true },Class: { configurable: true },$: { configurable: true } };
  Swiper.prototype.slidesPerViewDynamic = function slidesPerViewDynamic () {
    var swiper = this;
    var params = swiper.params;
    var slides = swiper.slides;
    var slidesGrid = swiper.slidesGrid;
    var swiperSize = swiper.size;
    var activeIndex = swiper.activeIndex;
    var spv = 1;
    if (params.centeredSlides) {
      var slideSize = slides[activeIndex].swiperSlideSize;
      var breakLoop;
      for (var i = activeIndex + 1; i < slides.length; i += 1) {
        if (slides[i] && !breakLoop) {
          slideSize += slides[i].swiperSlideSize;
          spv += 1;
          if (slideSize > swiperSize) { breakLoop = true; }
        }
      }
      for (var i$1 = activeIndex - 1; i$1 >= 0; i$1 -= 1) {
        if (slides[i$1] && !breakLoop) {
          slideSize += slides[i$1].swiperSlideSize;
          spv += 1;
          if (slideSize > swiperSize) { breakLoop = true; }
        }
      }
    } else {
      for (var i$2 = activeIndex + 1; i$2 < slides.length; i$2 += 1) {
        if (slidesGrid[i$2] - slidesGrid[activeIndex] < swiperSize) {
          spv += 1;
        }
      }
    }
    return spv;
  };
  Swiper.prototype.update = function update$$1 () {
    var swiper = this;
    if (!swiper || swiper.destroyed) { return; }
    var snapGrid = swiper.snapGrid;
    var params = swiper.params;
    // Breakpoints
    if (params.breakpoints) {
      swiper.setBreakpoint();
    }
    swiper.updateSize();
    swiper.updateSlides();
    swiper.updateProgress();
    swiper.updateSlidesClasses();

    function setTranslate() {
      var translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
      var newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
      swiper.setTranslate(newTranslate);
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
    var translated;
    if (swiper.params.freeMode) {
      setTranslate();
      if (swiper.params.autoHeight) {
        swiper.updateAutoHeight();
      }
    } else {
      if ((swiper.params.slidesPerView === 'auto' || swiper.params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
        translated = swiper.slideTo(swiper.slides.length - 1, 0, false, true);
      } else {
        translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
      }
      if (!translated) {
        setTranslate();
      }
    }
    if (params.watchOverflow && snapGrid !== swiper.snapGrid) {
      swiper.checkOverflow();
    }
    swiper.emit('update');
  };
  Swiper.prototype.init = function init () {
    var swiper = this;
    if (swiper.initialized) { return; }

    swiper.emit('beforeInit');

    // Set breakpoint
    if (swiper.params.breakpoints) {
      swiper.setBreakpoint();
    }

    // Add Classes
    swiper.addClasses();

    // Create loop
    if (swiper.params.loop) {
      swiper.loopCreate();
    }

    // Update size
    swiper.updateSize();

    // Update slides
    swiper.updateSlides();

    if (swiper.params.watchOverflow) {
      swiper.checkOverflow();
    }

    // Set Grab Cursor
    if (swiper.params.grabCursor) {
      swiper.setGrabCursor();
    }

    if (swiper.params.preloadImages) {
      swiper.preloadImages();
    }

    // Slide To Initial Slide
    if (swiper.params.loop) {
      swiper.slideTo(swiper.params.initialSlide + swiper.loopedSlides, 0, swiper.params.runCallbacksOnInit);
    } else {
      swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit);
    }

    // Attach events
    swiper.attachEvents();

    // Init Flag
    swiper.initialized = true;

    // Emit
    swiper.emit('init');
  };
  Swiper.prototype.destroy = function destroy (deleteInstance, cleanStyles) {
    if ( deleteInstance === void 0 ) deleteInstance = true;
    if ( cleanStyles === void 0 ) cleanStyles = true;

    var swiper = this;
    var params = swiper.params;
    var $el = swiper.$el;
    var $wrapperEl = swiper.$wrapperEl;
    var slides = swiper.slides;
    swiper.emit('beforeDestroy');

    // Init Flag
    swiper.initialized = false;

    // Detach events
    swiper.detachEvents();

    // Destroy loop
    if (params.loop) {
      swiper.loopDestroy();
    }

    // Cleanup styles
    if (cleanStyles) {
      swiper.removeClasses();
      $el.removeAttr('style');
      $wrapperEl.removeAttr('style');
      if (slides && slides.length) {
        slides
          .removeClass([
            params.slideVisibleClass,
            params.slideActiveClass,
            params.slideNextClass,
            params.slidePrevClass ].join(' '))
          .removeAttr('style')
          .removeAttr('data-swiper-slide-index')
          .removeAttr('data-swiper-column')
          .removeAttr('data-swiper-row');
      }
    }

    swiper.emit('destroy');

    // Detach emitter events
    Object.keys(swiper.eventsListeners).forEach(function (eventName) {
      swiper.off(eventName);
    });

    if (deleteInstance !== false) {
      swiper.$el[0].swiper = null;
      swiper.$el.data('swiper', null);
      Utils.deleteProps(swiper);
    }
    swiper.destroyed = true;
  };
  Swiper.extendDefaults = function extendDefaults (newDefaults) {
    Utils.extend(extendedDefaults, newDefaults);
  };
  staticAccessors.extendedDefaults.get = function () {
    return extendedDefaults;
  };
  staticAccessors.defaults.get = function () {
    return defaults;
  };
  staticAccessors.Class.get = function () {
    return SwiperClass$$1;
  };
  staticAccessors.$.get = function () {
    return $;
  };

  Object.defineProperties( Swiper, staticAccessors );

  return Swiper;
}(SwiperClass));

var Device$1 = {
  name: 'device',
  proto: {
    device: Device,
  },
  static: {
    device: Device,
  },
};

var Support$1 = {
  name: 'support',
  proto: {
    support: Support,
  },
  static: {
    support: Support,
  },
};

var Browser$1 = {
  name: 'browser',
  proto: {
    browser: Browser,
  },
  static: {
    browser: Browser,
  },
};

var Resize = {
  name: 'resize',
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      resize: {
        resizeHandler: function resizeHandler() {
          if (!swiper || swiper.destroyed || !swiper.initialized) { return; }
          swiper.emit('beforeResize');
          swiper.emit('resize');
        },
        orientationChangeHandler: function orientationChangeHandler() {
          if (!swiper || swiper.destroyed || !swiper.initialized) { return; }
          swiper.emit('orientationchange');
        },
      },
    });
  },
  on: {
    init: function init() {
      var swiper = this;
      // Emit resize
      win.addEventListener('resize', swiper.resize.resizeHandler);

      // Emit orientationchange
      win.addEventListener('orientationchange', swiper.resize.orientationChangeHandler);
    },
    destroy: function destroy() {
      var swiper = this;
      win.removeEventListener('resize', swiper.resize.resizeHandler);
      win.removeEventListener('orientationchange', swiper.resize.orientationChangeHandler);
    },
  },
};

var Observer = {
  func: win.MutationObserver || win.WebkitMutationObserver,
  attach: function attach(target, options) {
    if ( options === void 0 ) options = {};

    var swiper = this;

    var ObserverFunc = Observer.func;
    var observer = new ObserverFunc(function (mutations) {
      mutations.forEach(function (mutation) {
        swiper.emit('observerUpdate', mutation);
      });
    });

    observer.observe(target, {
      attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
      childList: typeof options.childList === 'undefined' ? true : options.childList,
      characterData: typeof options.characterData === 'undefined' ? true : options.characterData,
    });

    swiper.observer.observers.push(observer);
  },
  init: function init() {
    var swiper = this;
    if (!Support.observer || !swiper.params.observer) { return; }
    if (swiper.params.observeParents) {
      var containerParents = swiper.$el.parents();
      for (var i = 0; i < containerParents.length; i += 1) {
        swiper.observer.attach(containerParents[i]);
      }
    }
    // Observe container
    swiper.observer.attach(swiper.$el[0], { childList: false });

    // Observe wrapper
    swiper.observer.attach(swiper.$wrapperEl[0], { attributes: false });
  },
  destroy: function destroy() {
    var swiper = this;
    swiper.observer.observers.forEach(function (observer) {
      observer.disconnect();
    });
    swiper.observer.observers = [];
  },
};

var Observer$1 = {
  name: 'observer',
  params: {
    observer: false,
    observeParents: false,
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      observer: {
        init: Observer.init.bind(swiper),
        attach: Observer.attach.bind(swiper),
        destroy: Observer.destroy.bind(swiper),
        observers: [],
      },
    });
  },
  on: {
    init: function init() {
      var swiper = this;
      swiper.observer.init();
    },
    destroy: function destroy() {
      var swiper = this;
      swiper.observer.destroy();
    },
  },
};

var Virtual = {
  update: function update(force) {
    var swiper = this;
    var ref = swiper.params;
    var slidesPerView = ref.slidesPerView;
    var slidesPerGroup = ref.slidesPerGroup;
    var centeredSlides = ref.centeredSlides;
    var ref$1 = swiper.virtual;
    var previousFrom = ref$1.from;
    var previousTo = ref$1.to;
    var slides = ref$1.slides;
    var previousSlidesGrid = ref$1.slidesGrid;
    var renderSlide = ref$1.renderSlide;
    var previousOffset = ref$1.offset;
    swiper.updateActiveIndex();
    var activeIndex = swiper.activeIndex || 0;

    var offsetProp;
    if (swiper.rtlTranslate) { offsetProp = 'right'; }
    else { offsetProp = swiper.isHorizontal() ? 'left' : 'top'; }

    var slidesAfter;
    var slidesBefore;
    if (centeredSlides) {
      slidesAfter = Math.floor(slidesPerView / 2) + slidesPerGroup;
      slidesBefore = Math.floor(slidesPerView / 2) + slidesPerGroup;
    } else {
      slidesAfter = slidesPerView + (slidesPerGroup - 1);
      slidesBefore = slidesPerGroup;
    }
    var from = Math.max((activeIndex || 0) - slidesBefore, 0);
    var to = Math.min((activeIndex || 0) + slidesAfter, slides.length - 1);
    var offset = (swiper.slidesGrid[from] || 0) - (swiper.slidesGrid[0] || 0);

    Utils.extend(swiper.virtual, {
      from: from,
      to: to,
      offset: offset,
      slidesGrid: swiper.slidesGrid,
    });

    function onRendered() {
      swiper.updateSlides();
      swiper.updateProgress();
      swiper.updateSlidesClasses();
      if (swiper.lazy && swiper.params.lazy.enabled) {
        swiper.lazy.load();
      }
    }

    if (previousFrom === from && previousTo === to && !force) {
      if (swiper.slidesGrid !== previousSlidesGrid && offset !== previousOffset) {
        swiper.slides.css(offsetProp, (offset + "px"));
      }
      swiper.updateProgress();
      return;
    }
    if (swiper.params.virtual.renderExternal) {
      swiper.params.virtual.renderExternal.call(swiper, {
        offset: offset,
        from: from,
        to: to,
        slides: (function getSlides() {
          var slidesToRender = [];
          for (var i = from; i <= to; i += 1) {
            slidesToRender.push(slides[i]);
          }
          return slidesToRender;
        }()),
      });
      onRendered();
      return;
    }
    var prependIndexes = [];
    var appendIndexes = [];
    if (force) {
      swiper.$wrapperEl.find(("." + (swiper.params.slideClass))).remove();
    } else {
      for (var i = previousFrom; i <= previousTo; i += 1) {
        if (i < from || i > to) {
          swiper.$wrapperEl.find(("." + (swiper.params.slideClass) + "[data-swiper-slide-index=\"" + i + "\"]")).remove();
        }
      }
    }
    for (var i$1 = 0; i$1 < slides.length; i$1 += 1) {
      if (i$1 >= from && i$1 <= to) {
        if (typeof previousTo === 'undefined' || force) {
          appendIndexes.push(i$1);
        } else {
          if (i$1 > previousTo) { appendIndexes.push(i$1); }
          if (i$1 < previousFrom) { prependIndexes.push(i$1); }
        }
      }
    }
    appendIndexes.forEach(function (index) {
      swiper.$wrapperEl.append(renderSlide(slides[index], index));
    });
    prependIndexes.sort(function (a, b) { return a < b; }).forEach(function (index) {
      swiper.$wrapperEl.prepend(renderSlide(slides[index], index));
    });
    swiper.$wrapperEl.children('.swiper-slide').css(offsetProp, (offset + "px"));
    onRendered();
  },
  renderSlide: function renderSlide(slide, index) {
    var swiper = this;
    var params = swiper.params.virtual;
    if (params.cache && swiper.virtual.cache[index]) {
      return swiper.virtual.cache[index];
    }
    var $slideEl = params.renderSlide
      ? $(params.renderSlide.call(swiper, slide, index))
      : $(("<div class=\"" + (swiper.params.slideClass) + "\" data-swiper-slide-index=\"" + index + "\">" + slide + "</div>"));
    if (!$slideEl.attr('data-swiper-slide-index')) { $slideEl.attr('data-swiper-slide-index', index); }
    if (params.cache) { swiper.virtual.cache[index] = $slideEl; }
    return $slideEl;
  },
  appendSlide: function appendSlide(slide) {
    var swiper = this;
    swiper.virtual.slides.push(slide);
    swiper.virtual.update(true);
  },
  prependSlide: function prependSlide(slide) {
    var swiper = this;
    swiper.virtual.slides.unshift(slide);
    if (swiper.params.virtual.cache) {
      var cache = swiper.virtual.cache;
      var newCache = {};
      Object.keys(cache).forEach(function (cachedIndex) {
        newCache[cachedIndex + 1] = cache[cachedIndex];
      });
      swiper.virtual.cache = newCache;
    }
    swiper.virtual.update(true);
    swiper.slideNext(0);
  },
};

var Virtual$1 = {
  name: 'virtual',
  params: {
    virtual: {
      enabled: false,
      slides: [],
      cache: true,
      renderSlide: null,
      renderExternal: null,
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      virtual: {
        update: Virtual.update.bind(swiper),
        appendSlide: Virtual.appendSlide.bind(swiper),
        prependSlide: Virtual.prependSlide.bind(swiper),
        renderSlide: Virtual.renderSlide.bind(swiper),
        slides: swiper.params.virtual.slides,
        cache: {},
      },
    });
  },
  on: {
    beforeInit: function beforeInit() {
      var swiper = this;
      if (!swiper.params.virtual.enabled) { return; }
      swiper.classNames.push(((swiper.params.containerModifierClass) + "virtual"));
      var overwriteParams = {
        watchSlidesProgress: true,
      };
      Utils.extend(swiper.params, overwriteParams);
      Utils.extend(swiper.originalParams, overwriteParams);

      swiper.virtual.update();
    },
    setTranslate: function setTranslate() {
      var swiper = this;
      if (!swiper.params.virtual.enabled) { return; }
      swiper.virtual.update();
    },
  },
};

var Keyboard = {
  handle: function handle(event) {
    var swiper = this;
    var rtl = swiper.rtlTranslate;
    var e = event;
    if (e.originalEvent) { e = e.originalEvent; } // jquery fix
    var kc = e.keyCode || e.charCode;
    // Directions locks
    if (!swiper.allowSlideNext && ((swiper.isHorizontal() && kc === 39) || (swiper.isVertical() && kc === 40))) {
      return false;
    }
    if (!swiper.allowSlidePrev && ((swiper.isHorizontal() && kc === 37) || (swiper.isVertical() && kc === 38))) {
      return false;
    }
    if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
      return undefined;
    }
    if (doc.activeElement && doc.activeElement.nodeName && (doc.activeElement.nodeName.toLowerCase() === 'input' || doc.activeElement.nodeName.toLowerCase() === 'textarea')) {
      return undefined;
    }
    if (swiper.params.keyboard.onlyInViewport && (kc === 37 || kc === 39 || kc === 38 || kc === 40)) {
      var inView = false;
      // Check that swiper should be inside of visible area of window
      if (swiper.$el.parents(("." + (swiper.params.slideClass))).length > 0 && swiper.$el.parents(("." + (swiper.params.slideActiveClass))).length === 0) {
        return undefined;
      }
      var windowWidth = win.innerWidth;
      var windowHeight = win.innerHeight;
      var swiperOffset = swiper.$el.offset();
      if (rtl) { swiperOffset.left -= swiper.$el[0].scrollLeft; }
      var swiperCoord = [
        [swiperOffset.left, swiperOffset.top],
        [swiperOffset.left + swiper.width, swiperOffset.top],
        [swiperOffset.left, swiperOffset.top + swiper.height],
        [swiperOffset.left + swiper.width, swiperOffset.top + swiper.height] ];
      for (var i = 0; i < swiperCoord.length; i += 1) {
        var point = swiperCoord[i];
        if (
          point[0] >= 0 && point[0] <= windowWidth &&
          point[1] >= 0 && point[1] <= windowHeight
        ) {
          inView = true;
        }
      }
      if (!inView) { return undefined; }
    }
    if (swiper.isHorizontal()) {
      if (kc === 37 || kc === 39) {
        if (e.preventDefault) { e.preventDefault(); }
        else { e.returnValue = false; }
      }
      if ((kc === 39 && !rtl) || (kc === 37 && rtl)) { swiper.slideNext(); }
      if ((kc === 37 && !rtl) || (kc === 39 && rtl)) { swiper.slidePrev(); }
    } else {
      if (kc === 38 || kc === 40) {
        if (e.preventDefault) { e.preventDefault(); }
        else { e.returnValue = false; }
      }
      if (kc === 40) { swiper.slideNext(); }
      if (kc === 38) { swiper.slidePrev(); }
    }
    swiper.emit('keyPress', kc);
    return undefined;
  },
  enable: function enable() {
    var swiper = this;
    if (swiper.keyboard.enabled) { return; }
    $(doc).on('keydown', swiper.keyboard.handle);
    swiper.keyboard.enabled = true;
  },
  disable: function disable() {
    var swiper = this;
    if (!swiper.keyboard.enabled) { return; }
    $(doc).off('keydown', swiper.keyboard.handle);
    swiper.keyboard.enabled = false;
  },
};

var Keyboard$1 = {
  name: 'keyboard',
  params: {
    keyboard: {
      enabled: false,
      onlyInViewport: true,
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      keyboard: {
        enabled: false,
        enable: Keyboard.enable.bind(swiper),
        disable: Keyboard.disable.bind(swiper),
        handle: Keyboard.handle.bind(swiper),
      },
    });
  },
  on: {
    init: function init() {
      var swiper = this;
      if (swiper.params.keyboard.enabled) {
        swiper.keyboard.enable();
      }
    },
    destroy: function destroy() {
      var swiper = this;
      if (swiper.keyboard.enabled) {
        swiper.keyboard.disable();
      }
    },
  },
};

function isEventSupported() {
  var eventName = 'onwheel';
  var isSupported = eventName in doc;

  if (!isSupported) {
    var element = doc.createElement('div');
    element.setAttribute(eventName, 'return;');
    isSupported = typeof element[eventName] === 'function';
  }

  if (!isSupported &&
    doc.implementation &&
    doc.implementation.hasFeature &&
    // always returns true in newer browsers as per the standard.
    // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
    doc.implementation.hasFeature('', '') !== true
  ) {
    // This is the only way to test support for the `wheel` event in IE9+.
    isSupported = doc.implementation.hasFeature('Events.wheel', '3.0');
  }

  return isSupported;
}
var Mousewheel = {
  lastScrollTime: Utils.now(),
  event: (function getEvent() {
    if (win.navigator.userAgent.indexOf('firefox') > -1) { return 'DOMMouseScroll'; }
    return isEventSupported() ? 'wheel' : 'mousewheel';
  }()),
  normalize: function normalize(e) {
    // Reasonable defaults
    var PIXEL_STEP = 10;
    var LINE_HEIGHT = 40;
    var PAGE_HEIGHT = 800;

    var sX = 0;
    var sY = 0; // spinX, spinY
    var pX = 0;
    var pY = 0; // pixelX, pixelY

    // Legacy
    if ('detail' in e) {
      sY = e.detail;
    }
    if ('wheelDelta' in e) {
      sY = -e.wheelDelta / 120;
    }
    if ('wheelDeltaY' in e) {
      sY = -e.wheelDeltaY / 120;
    }
    if ('wheelDeltaX' in e) {
      sX = -e.wheelDeltaX / 120;
    }

    // side scrolling on FF with DOMMouseScroll
    if ('axis' in e && e.axis === e.HORIZONTAL_AXIS) {
      sX = sY;
      sY = 0;
    }

    pX = sX * PIXEL_STEP;
    pY = sY * PIXEL_STEP;

    if ('deltaY' in e) {
      pY = e.deltaY;
    }
    if ('deltaX' in e) {
      pX = e.deltaX;
    }

    if ((pX || pY) && e.deltaMode) {
      if (e.deltaMode === 1) { // delta in LINE units
        pX *= LINE_HEIGHT;
        pY *= LINE_HEIGHT;
      } else { // delta in PAGE units
        pX *= PAGE_HEIGHT;
        pY *= PAGE_HEIGHT;
      }
    }

    // Fall-back if spin cannot be determined
    if (pX && !sX) {
      sX = (pX < 1) ? -1 : 1;
    }
    if (pY && !sY) {
      sY = (pY < 1) ? -1 : 1;
    }

    return {
      spinX: sX,
      spinY: sY,
      pixelX: pX,
      pixelY: pY,
    };
  },
  handleMouseEnter: function handleMouseEnter() {
    var swiper = this;
    swiper.mouseEntered = true;
  },
  handleMouseLeave: function handleMouseLeave() {
    var swiper = this;
    swiper.mouseEntered = false;
  },
  handle: function handle(event) {
    var e = event;
    var swiper = this;
    var params = swiper.params.mousewheel;

    if (!swiper.mouseEntered && !params.releaseOnEdges) { return true; }

    if (e.originalEvent) { e = e.originalEvent; } // jquery fix
    var delta = 0;
    var rtlFactor = swiper.rtlTranslate ? -1 : 1;

    var data = Mousewheel.normalize(e);

    if (params.forceToAxis) {
      if (swiper.isHorizontal()) {
        if (Math.abs(data.pixelX) > Math.abs(data.pixelY)) { delta = data.pixelX * rtlFactor; }
        else { return true; }
      } else if (Math.abs(data.pixelY) > Math.abs(data.pixelX)) { delta = data.pixelY; }
      else { return true; }
    } else {
      delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? -data.pixelX * rtlFactor : -data.pixelY;
    }

    if (delta === 0) { return true; }

    if (params.invert) { delta = -delta; }

    if (!swiper.params.freeMode) {
      if (Utils.now() - swiper.mousewheel.lastScrollTime > 60) {
        if (delta < 0) {
          if ((!swiper.isEnd || swiper.params.loop) && !swiper.animating) {
            swiper.slideNext();
            swiper.emit('scroll', e);
          } else if (params.releaseOnEdges) { return true; }
        } else if ((!swiper.isBeginning || swiper.params.loop) && !swiper.animating) {
          swiper.slidePrev();
          swiper.emit('scroll', e);
        } else if (params.releaseOnEdges) { return true; }
      }
      swiper.mousewheel.lastScrollTime = (new win.Date()).getTime();
    } else {
      // Freemode or scrollContainer:
      if (swiper.params.loop) {
        swiper.loopFix();
      }
      var position = swiper.getTranslate() + (delta * params.sensitivity);
      var wasBeginning = swiper.isBeginning;
      var wasEnd = swiper.isEnd;

      if (position >= swiper.minTranslate()) { position = swiper.minTranslate(); }
      if (position <= swiper.maxTranslate()) { position = swiper.maxTranslate(); }

      swiper.setTransition(0);
      swiper.setTranslate(position);
      swiper.updateProgress();
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();

      if ((!wasBeginning && swiper.isBeginning) || (!wasEnd && swiper.isEnd)) {
        swiper.updateSlidesClasses();
      }

      if (swiper.params.freeModeSticky) {
        clearTimeout(swiper.mousewheel.timeout);
        swiper.mousewheel.timeout = Utils.nextTick(function () {
          swiper.slideToClosest();
        }, 300);
      }
      // Emit event
      swiper.emit('scroll', e);

      // Stop autoplay
      if (swiper.params.autoplay && swiper.params.autoplayDisableOnInteraction) { swiper.stopAutoplay(); }
      // Return page scroll on edge positions
      if (position === swiper.minTranslate() || position === swiper.maxTranslate()) { return true; }
    }

    if (e.preventDefault) { e.preventDefault(); }
    else { e.returnValue = false; }
    return false;
  },
  enable: function enable() {
    var swiper = this;
    if (!Mousewheel.event) { return false; }
    if (swiper.mousewheel.enabled) { return false; }
    var target = swiper.$el;
    if (swiper.params.mousewheel.eventsTarged !== 'container') {
      target = $(swiper.params.mousewheel.eventsTarged);
    }
    target.on('mouseenter', swiper.mousewheel.handleMouseEnter);
    target.on('mouseleave', swiper.mousewheel.handleMouseLeave);
    target.on(Mousewheel.event, swiper.mousewheel.handle);
    swiper.mousewheel.enabled = true;
    return true;
  },
  disable: function disable() {
    var swiper = this;
    if (!Mousewheel.event) { return false; }
    if (!swiper.mousewheel.enabled) { return false; }
    var target = swiper.$el;
    if (swiper.params.mousewheel.eventsTarged !== 'container') {
      target = $(swiper.params.mousewheel.eventsTarged);
    }
    target.off(Mousewheel.event, swiper.mousewheel.handle);
    swiper.mousewheel.enabled = false;
    return true;
  },
};

var Mousewheel$1 = {
  name: 'mousewheel',
  params: {
    mousewheel: {
      enabled: false,
      releaseOnEdges: false,
      invert: false,
      forceToAxis: false,
      sensitivity: 1,
      eventsTarged: 'container',
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      mousewheel: {
        enabled: false,
        enable: Mousewheel.enable.bind(swiper),
        disable: Mousewheel.disable.bind(swiper),
        handle: Mousewheel.handle.bind(swiper),
        handleMouseEnter: Mousewheel.handleMouseEnter.bind(swiper),
        handleMouseLeave: Mousewheel.handleMouseLeave.bind(swiper),
        lastScrollTime: Utils.now(),
      },
    });
  },
  on: {
    init: function init() {
      var swiper = this;
      if (swiper.params.mousewheel.enabled) { swiper.mousewheel.enable(); }
    },
    destroy: function destroy() {
      var swiper = this;
      if (swiper.mousewheel.enabled) { swiper.mousewheel.disable(); }
    },
  },
};

var Navigation = {
  update: function update() {
    // Update Navigation Buttons
    var swiper = this;
    var params = swiper.params.navigation;

    if (swiper.params.loop) { return; }
    var ref = swiper.navigation;
    var $nextEl = ref.$nextEl;
    var $prevEl = ref.$prevEl;

    if ($prevEl && $prevEl.length > 0) {
      if (swiper.isBeginning) {
        $prevEl.addClass(params.disabledClass);
      } else {
        $prevEl.removeClass(params.disabledClass);
      }
      $prevEl[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
    }
    if ($nextEl && $nextEl.length > 0) {
      if (swiper.isEnd) {
        $nextEl.addClass(params.disabledClass);
      } else {
        $nextEl.removeClass(params.disabledClass);
      }
      $nextEl[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
    }
  },
  init: function init() {
    var swiper = this;
    var params = swiper.params.navigation;
    if (!(params.nextEl || params.prevEl)) { return; }

    var $nextEl;
    var $prevEl;
    if (params.nextEl) {
      $nextEl = $(params.nextEl);
      if (
        swiper.params.uniqueNavElements &&
        typeof params.nextEl === 'string' &&
        $nextEl.length > 1 &&
        swiper.$el.find(params.nextEl).length === 1
      ) {
        $nextEl = swiper.$el.find(params.nextEl);
      }
    }
    if (params.prevEl) {
      $prevEl = $(params.prevEl);
      if (
        swiper.params.uniqueNavElements &&
        typeof params.prevEl === 'string' &&
        $prevEl.length > 1 &&
        swiper.$el.find(params.prevEl).length === 1
      ) {
        $prevEl = swiper.$el.find(params.prevEl);
      }
    }

    if ($nextEl && $nextEl.length > 0) {
      $nextEl.on('click', function (e) {
        e.preventDefault();
        if (swiper.isEnd && !swiper.params.loop) { return; }
        swiper.slideNext();
      });
    }
    if ($prevEl && $prevEl.length > 0) {
      $prevEl.on('click', function (e) {
        e.preventDefault();
        if (swiper.isBeginning && !swiper.params.loop) { return; }
        swiper.slidePrev();
      });
    }

    Utils.extend(swiper.navigation, {
      $nextEl: $nextEl,
      nextEl: $nextEl && $nextEl[0],
      $prevEl: $prevEl,
      prevEl: $prevEl && $prevEl[0],
    });
  },
  destroy: function destroy() {
    var swiper = this;
    var ref = swiper.navigation;
    var $nextEl = ref.$nextEl;
    var $prevEl = ref.$prevEl;
    if ($nextEl && $nextEl.length) {
      $nextEl.off('click');
      $nextEl.removeClass(swiper.params.navigation.disabledClass);
    }
    if ($prevEl && $prevEl.length) {
      $prevEl.off('click');
      $prevEl.removeClass(swiper.params.navigation.disabledClass);
    }
  },
};

var Navigation$1 = {
  name: 'navigation',
  params: {
    navigation: {
      nextEl: null,
      prevEl: null,

      hideOnClick: false,
      disabledClass: 'swiper-button-disabled',
      hiddenClass: 'swiper-button-hidden',
      lockClass: 'swiper-button-lock',
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      navigation: {
        init: Navigation.init.bind(swiper),
        update: Navigation.update.bind(swiper),
        destroy: Navigation.destroy.bind(swiper),
      },
    });
  },
  on: {
    init: function init() {
      var swiper = this;
      swiper.navigation.init();
      swiper.navigation.update();
    },
    toEdge: function toEdge() {
      var swiper = this;
      swiper.navigation.update();
    },
    fromEdge: function fromEdge() {
      var swiper = this;
      swiper.navigation.update();
    },
    destroy: function destroy() {
      var swiper = this;
      swiper.navigation.destroy();
    },
    click: function click(e) {
      var swiper = this;
      var ref = swiper.navigation;
      var $nextEl = ref.$nextEl;
      var $prevEl = ref.$prevEl;
      if (
        swiper.params.navigation.hideOnClick &&
        !$(e.target).is($prevEl) &&
        !$(e.target).is($nextEl)
      ) {
        if ($nextEl) { $nextEl.toggleClass(swiper.params.navigation.hiddenClass); }
        if ($prevEl) { $prevEl.toggleClass(swiper.params.navigation.hiddenClass); }
      }
    },
  },
};

var Pagination = {
  update: function update() {
    // Render || Update Pagination bullets/items
    var swiper = this;
    var rtl = swiper.rtl;
    var params = swiper.params.pagination;
    if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) { return; }
    var slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
    var $el = swiper.pagination.$el;
    // Current/Total
    var current;
    var total = swiper.params.loop ? Math.ceil((slidesLength - (swiper.loopedSlides * 2)) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
    if (swiper.params.loop) {
      current = Math.ceil((swiper.activeIndex - swiper.loopedSlides) / swiper.params.slidesPerGroup);
      if (current > slidesLength - 1 - (swiper.loopedSlides * 2)) {
        current -= (slidesLength - (swiper.loopedSlides * 2));
      }
      if (current > total - 1) { current -= total; }
      if (current < 0 && swiper.params.paginationType !== 'bullets') { current = total + current; }
    } else if (typeof swiper.snapIndex !== 'undefined') {
      current = swiper.snapIndex;
    } else {
      current = swiper.activeIndex || 0;
    }
    // Types
    if (params.type === 'bullets' && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
      var bullets = swiper.pagination.bullets;
      var firstIndex;
      var lastIndex;
      var midIndex;
      if (params.dynamicBullets) {
        swiper.pagination.bulletSize = bullets.eq(0)[swiper.isHorizontal() ? 'outerWidth' : 'outerHeight'](true);
        $el.css(swiper.isHorizontal() ? 'width' : 'height', ((swiper.pagination.bulletSize * (params.dynamicMainBullets + 4)) + "px"));
        if (params.dynamicMainBullets > 1 && swiper.previousIndex !== undefined) {
          swiper.pagination.dynamicBulletIndex += (current - swiper.previousIndex);
          if (swiper.pagination.dynamicBulletIndex > (params.dynamicMainBullets - 1)) {
            swiper.pagination.dynamicBulletIndex = params.dynamicMainBullets - 1;
          } else if (swiper.pagination.dynamicBulletIndex < 0) {
            swiper.pagination.dynamicBulletIndex = 0;
          }
        }
        firstIndex = current - swiper.pagination.dynamicBulletIndex;
        lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
        midIndex = (lastIndex + firstIndex) / 2;
      }
      bullets.removeClass(((params.bulletActiveClass) + " " + (params.bulletActiveClass) + "-next " + (params.bulletActiveClass) + "-next-next " + (params.bulletActiveClass) + "-prev " + (params.bulletActiveClass) + "-prev-prev " + (params.bulletActiveClass) + "-main"));
      if ($el.length > 1) {
        bullets.each(function (index, bullet) {
          var $bullet = $(bullet);
          var bulletIndex = $bullet.index();
          if (bulletIndex === current) {
            $bullet.addClass(params.bulletActiveClass);
          }
          if (params.dynamicBullets) {
            if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
              $bullet.addClass(((params.bulletActiveClass) + "-main"));
            }
            if (bulletIndex === firstIndex) {
              $bullet
                .prev()
                .addClass(((params.bulletActiveClass) + "-prev"))
                .prev()
                .addClass(((params.bulletActiveClass) + "-prev-prev"));
            }
            if (bulletIndex === lastIndex) {
              $bullet
                .next()
                .addClass(((params.bulletActiveClass) + "-next"))
                .next()
                .addClass(((params.bulletActiveClass) + "-next-next"));
            }
          }
        });
      } else {
        var $bullet = bullets.eq(current);
        $bullet.addClass(params.bulletActiveClass);
        if (params.dynamicBullets) {
          var $firstDisplayedBullet = bullets.eq(firstIndex);
          var $lastDisplayedBullet = bullets.eq(lastIndex);
          for (var i = firstIndex; i <= lastIndex; i += 1) {
            bullets.eq(i).addClass(((params.bulletActiveClass) + "-main"));
          }
          $firstDisplayedBullet
            .prev()
            .addClass(((params.bulletActiveClass) + "-prev"))
            .prev()
            .addClass(((params.bulletActiveClass) + "-prev-prev"));
          $lastDisplayedBullet
            .next()
            .addClass(((params.bulletActiveClass) + "-next"))
            .next()
            .addClass(((params.bulletActiveClass) + "-next-next"));
        }
      }
      if (params.dynamicBullets) {
        var dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
        var bulletsOffset = (((swiper.pagination.bulletSize * dynamicBulletsLength) - (swiper.pagination.bulletSize)) / 2) - (midIndex * swiper.pagination.bulletSize);
        var offsetProp = rtl ? 'right' : 'left';
        bullets.css(swiper.isHorizontal() ? offsetProp : 'top', (bulletsOffset + "px"));
      }
    }
    if (params.type === 'fraction') {
      $el.find(("." + (params.currentClass))).text(current + 1);
      $el.find(("." + (params.totalClass))).text(total);
    }
    if (params.type === 'progressbar') {
      var progressbarDirection;
      if (params.progressbarOpposite) {
        progressbarDirection = swiper.isHorizontal() ? 'vertical' : 'horizontal';
      } else {
        progressbarDirection = swiper.isHorizontal() ? 'horizontal' : 'vertical';
      }
      var scale = (current + 1) / total;
      var scaleX = 1;
      var scaleY = 1;
      if (progressbarDirection === 'horizontal') {
        scaleX = scale;
      } else {
        scaleY = scale;
      }
      $el.find(("." + (params.progressbarFillClass))).transform(("translate3d(0,0,0) scaleX(" + scaleX + ") scaleY(" + scaleY + ")")).transition(swiper.params.speed);
    }
    if (params.type === 'custom' && params.renderCustom) {
      $el.html(params.renderCustom(swiper, current + 1, total));
      swiper.emit('paginationRender', swiper, $el[0]);
    } else {
      swiper.emit('paginationUpdate', swiper, $el[0]);
    }
    $el[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
  },
  render: function render() {
    // Render Container
    var swiper = this;
    var params = swiper.params.pagination;
    if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) { return; }
    var slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;

    var $el = swiper.pagination.$el;
    var paginationHTML = '';
    if (params.type === 'bullets') {
      var numberOfBullets = swiper.params.loop ? Math.ceil((slidesLength - (swiper.loopedSlides * 2)) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
      for (var i = 0; i < numberOfBullets; i += 1) {
        if (params.renderBullet) {
          paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass);
        } else {
          paginationHTML += "<" + (params.bulletElement) + " class=\"" + (params.bulletClass) + "\"></" + (params.bulletElement) + ">";
        }
      }
      $el.html(paginationHTML);
      swiper.pagination.bullets = $el.find(("." + (params.bulletClass)));
    }
    if (params.type === 'fraction') {
      if (params.renderFraction) {
        paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass);
      } else {
        paginationHTML =
        "<span class=\"" + (params.currentClass) + "\"></span>" +
        ' / ' +
        "<span class=\"" + (params.totalClass) + "\"></span>";
      }
      $el.html(paginationHTML);
    }
    if (params.type === 'progressbar') {
      if (params.renderProgressbar) {
        paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass);
      } else {
        paginationHTML = "<span class=\"" + (params.progressbarFillClass) + "\"></span>";
      }
      $el.html(paginationHTML);
    }
    if (params.type !== 'custom') {
      swiper.emit('paginationRender', swiper.pagination.$el[0]);
    }
  },
  init: function init() {
    var swiper = this;
    var params = swiper.params.pagination;
    if (!params.el) { return; }

    var $el = $(params.el);
    if ($el.length === 0) { return; }

    if (
      swiper.params.uniqueNavElements &&
      typeof params.el === 'string' &&
      $el.length > 1 &&
      swiper.$el.find(params.el).length === 1
    ) {
      $el = swiper.$el.find(params.el);
    }

    if (params.type === 'bullets' && params.clickable) {
      $el.addClass(params.clickableClass);
    }

    $el.addClass(params.modifierClass + params.type);

    if (params.type === 'bullets' && params.dynamicBullets) {
      $el.addClass(("" + (params.modifierClass) + (params.type) + "-dynamic"));
      swiper.pagination.dynamicBulletIndex = 0;
      if (params.dynamicMainBullets < 1) {
        params.dynamicMainBullets = 1;
      }
    }
    if (params.type === 'progressbar' && params.progressbarOpposite) {
      $el.addClass(params.progressbarOppositeClass);
    }

    if (params.clickable) {
      $el.on('click', ("." + (params.bulletClass)), function onClick(e) {
        e.preventDefault();
        var index = $(this).index() * swiper.params.slidesPerGroup;
        if (swiper.params.loop) { index += swiper.loopedSlides; }
        swiper.slideTo(index);
      });
    }

    Utils.extend(swiper.pagination, {
      $el: $el,
      el: $el[0],
    });
  },
  destroy: function destroy() {
    var swiper = this;
    var params = swiper.params.pagination;
    if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) { return; }
    var $el = swiper.pagination.$el;

    $el.removeClass(params.hiddenClass);
    $el.removeClass(params.modifierClass + params.type);
    if (swiper.pagination.bullets) { swiper.pagination.bullets.removeClass(params.bulletActiveClass); }
    if (params.clickable) {
      $el.off('click', ("." + (params.bulletClass)));
    }
  },
};

var Pagination$1 = {
  name: 'pagination',
  params: {
    pagination: {
      el: null,
      bulletElement: 'span',
      clickable: false,
      hideOnClick: false,
      renderBullet: null,
      renderProgressbar: null,
      renderFraction: null,
      renderCustom: null,
      progressbarOpposite: false,
      type: 'bullets', // 'bullets' or 'progressbar' or 'fraction' or 'custom'
      dynamicBullets: false,
      dynamicMainBullets: 1,
      bulletClass: 'swiper-pagination-bullet',
      bulletActiveClass: 'swiper-pagination-bullet-active',
      modifierClass: 'swiper-pagination-', // NEW
      currentClass: 'swiper-pagination-current',
      totalClass: 'swiper-pagination-total',
      hiddenClass: 'swiper-pagination-hidden',
      progressbarFillClass: 'swiper-pagination-progressbar-fill',
      progressbarOppositeClass: 'swiper-pagination-progressbar-opposite',
      clickableClass: 'swiper-pagination-clickable', // NEW
      lockClass: 'swiper-pagination-lock',
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      pagination: {
        init: Pagination.init.bind(swiper),
        render: Pagination.render.bind(swiper),
        update: Pagination.update.bind(swiper),
        destroy: Pagination.destroy.bind(swiper),
        dynamicBulletIndex: 0,
      },
    });
  },
  on: {
    init: function init() {
      var swiper = this;
      swiper.pagination.init();
      swiper.pagination.render();
      swiper.pagination.update();
    },
    activeIndexChange: function activeIndexChange() {
      var swiper = this;
      if (swiper.params.loop) {
        swiper.pagination.update();
      } else if (typeof swiper.snapIndex === 'undefined') {
        swiper.pagination.update();
      }
    },
    snapIndexChange: function snapIndexChange() {
      var swiper = this;
      if (!swiper.params.loop) {
        swiper.pagination.update();
      }
    },
    slidesLengthChange: function slidesLengthChange() {
      var swiper = this;
      if (swiper.params.loop) {
        swiper.pagination.render();
        swiper.pagination.update();
      }
    },
    snapGridLengthChange: function snapGridLengthChange() {
      var swiper = this;
      if (!swiper.params.loop) {
        swiper.pagination.render();
        swiper.pagination.update();
      }
    },
    destroy: function destroy() {
      var swiper = this;
      swiper.pagination.destroy();
    },
    click: function click(e) {
      var swiper = this;
      if (
        swiper.params.pagination.el &&
        swiper.params.pagination.hideOnClick &&
        swiper.pagination.$el.length > 0 &&
        !$(e.target).hasClass(swiper.params.pagination.bulletClass)
      ) {
        swiper.pagination.$el.toggleClass(swiper.params.pagination.hiddenClass);
      }
    },
  },
};

var Scrollbar = {
  setTranslate: function setTranslate() {
    var swiper = this;
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) { return; }
    var scrollbar = swiper.scrollbar;
    var rtl = swiper.rtlTranslate;
    var progress = swiper.progress;
    var dragSize = scrollbar.dragSize;
    var trackSize = scrollbar.trackSize;
    var $dragEl = scrollbar.$dragEl;
    var $el = scrollbar.$el;
    var params = swiper.params.scrollbar;

    var newSize = dragSize;
    var newPos = (trackSize - dragSize) * progress;
    if (rtl) {
      newPos = -newPos;
      if (newPos > 0) {
        newSize = dragSize - newPos;
        newPos = 0;
      } else if (-newPos + dragSize > trackSize) {
        newSize = trackSize + newPos;
      }
    } else if (newPos < 0) {
      newSize = dragSize + newPos;
      newPos = 0;
    } else if (newPos + dragSize > trackSize) {
      newSize = trackSize - newPos;
    }
    if (swiper.isHorizontal()) {
      if (Support.transforms3d) {
        $dragEl.transform(("translate3d(" + newPos + "px, 0, 0)"));
      } else {
        $dragEl.transform(("translateX(" + newPos + "px)"));
      }
      $dragEl[0].style.width = newSize + "px";
    } else {
      if (Support.transforms3d) {
        $dragEl.transform(("translate3d(0px, " + newPos + "px, 0)"));
      } else {
        $dragEl.transform(("translateY(" + newPos + "px)"));
      }
      $dragEl[0].style.height = newSize + "px";
    }
    if (params.hide) {
      clearTimeout(swiper.scrollbar.timeout);
      $el[0].style.opacity = 1;
      swiper.scrollbar.timeout = setTimeout(function () {
        $el[0].style.opacity = 0;
        $el.transition(400);
      }, 1000);
    }
  },
  setTransition: function setTransition(duration) {
    var swiper = this;
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) { return; }
    swiper.scrollbar.$dragEl.transition(duration);
  },
  updateSize: function updateSize() {
    var swiper = this;
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) { return; }

    var scrollbar = swiper.scrollbar;
    var $dragEl = scrollbar.$dragEl;
    var $el = scrollbar.$el;

    $dragEl[0].style.width = '';
    $dragEl[0].style.height = '';
    var trackSize = swiper.isHorizontal() ? $el[0].offsetWidth : $el[0].offsetHeight;

    var divider = swiper.size / swiper.virtualSize;
    var moveDivider = divider * (trackSize / swiper.size);
    var dragSize;
    if (swiper.params.scrollbar.dragSize === 'auto') {
      dragSize = trackSize * divider;
    } else {
      dragSize = parseInt(swiper.params.scrollbar.dragSize, 10);
    }

    if (swiper.isHorizontal()) {
      $dragEl[0].style.width = dragSize + "px";
    } else {
      $dragEl[0].style.height = dragSize + "px";
    }

    if (divider >= 1) {
      $el[0].style.display = 'none';
    } else {
      $el[0].style.display = '';
    }
    if (swiper.params.scrollbarHide) {
      $el[0].style.opacity = 0;
    }
    Utils.extend(scrollbar, {
      trackSize: trackSize,
      divider: divider,
      moveDivider: moveDivider,
      dragSize: dragSize,
    });
    scrollbar.$el[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](swiper.params.scrollbar.lockClass);
  },
  setDragPosition: function setDragPosition(e) {
    var swiper = this;
    var scrollbar = swiper.scrollbar;
    var rtl = swiper.rtlTranslate;
    var $el = scrollbar.$el;
    var dragSize = scrollbar.dragSize;
    var trackSize = scrollbar.trackSize;

    var pointerPosition;
    if (swiper.isHorizontal()) {
      pointerPosition = ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].pageX : e.pageX || e.clientX);
    } else {
      pointerPosition = ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].pageY : e.pageY || e.clientY);
    }
    var positionRatio;
    positionRatio = ((pointerPosition) - $el.offset()[swiper.isHorizontal() ? 'left' : 'top'] - (dragSize / 2)) / (trackSize - dragSize);
    positionRatio = Math.max(Math.min(positionRatio, 1), 0);
    if (rtl) {
      positionRatio = 1 - positionRatio;
    }

    var position = swiper.minTranslate() + ((swiper.maxTranslate() - swiper.minTranslate()) * positionRatio);

    swiper.updateProgress(position);
    swiper.setTranslate(position);
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
  },
  onDragStart: function onDragStart(e) {
    var swiper = this;
    var params = swiper.params.scrollbar;
    var scrollbar = swiper.scrollbar;
    var $wrapperEl = swiper.$wrapperEl;
    var $el = scrollbar.$el;
    var $dragEl = scrollbar.$dragEl;
    swiper.scrollbar.isTouched = true;
    e.preventDefault();
    e.stopPropagation();

    $wrapperEl.transition(100);
    $dragEl.transition(100);
    scrollbar.setDragPosition(e);

    clearTimeout(swiper.scrollbar.dragTimeout);

    $el.transition(0);
    if (params.hide) {
      $el.css('opacity', 1);
    }
    swiper.emit('scrollbarDragStart', e);
  },
  onDragMove: function onDragMove(e) {
    var swiper = this;
    var scrollbar = swiper.scrollbar;
    var $wrapperEl = swiper.$wrapperEl;
    var $el = scrollbar.$el;
    var $dragEl = scrollbar.$dragEl;

    if (!swiper.scrollbar.isTouched) { return; }
    if (e.preventDefault) { e.preventDefault(); }
    else { e.returnValue = false; }
    scrollbar.setDragPosition(e);
    $wrapperEl.transition(0);
    $el.transition(0);
    $dragEl.transition(0);
    swiper.emit('scrollbarDragMove', e);
  },
  onDragEnd: function onDragEnd(e) {
    var swiper = this;

    var params = swiper.params.scrollbar;
    var scrollbar = swiper.scrollbar;
    var $el = scrollbar.$el;

    if (!swiper.scrollbar.isTouched) { return; }
    swiper.scrollbar.isTouched = false;
    if (params.hide) {
      clearTimeout(swiper.scrollbar.dragTimeout);
      swiper.scrollbar.dragTimeout = Utils.nextTick(function () {
        $el.css('opacity', 0);
        $el.transition(400);
      }, 1000);
    }
    swiper.emit('scrollbarDragEnd', e);
    if (params.snapOnRelease) {
      swiper.slideToClosest();
    }
  },
  enableDraggable: function enableDraggable() {
    var swiper = this;
    if (!swiper.params.scrollbar.el) { return; }
    var scrollbar = swiper.scrollbar;
    var touchEvents = swiper.touchEvents;
    var touchEventsDesktop = swiper.touchEventsDesktop;
    var params = swiper.params;
    var $el = scrollbar.$el;
    var target = $el[0];
    var activeListener = Support.passiveListener && params.passiveListener ? { passive: false, capture: false } : false;
    var passiveListener = Support.passiveListener && params.passiveListener ? { passive: true, capture: false } : false;
    if (!Support.touch && (Support.pointerEvents || Support.prefixedPointerEvents)) {
      target.addEventListener(touchEventsDesktop.start, swiper.scrollbar.onDragStart, activeListener);
      doc.addEventListener(touchEventsDesktop.move, swiper.scrollbar.onDragMove, activeListener);
      doc.addEventListener(touchEventsDesktop.end, swiper.scrollbar.onDragEnd, passiveListener);
    } else {
      if (Support.touch) {
        target.addEventListener(touchEvents.start, swiper.scrollbar.onDragStart, activeListener);
        target.addEventListener(touchEvents.move, swiper.scrollbar.onDragMove, activeListener);
        target.addEventListener(touchEvents.end, swiper.scrollbar.onDragEnd, passiveListener);
      }
      if ((params.simulateTouch && !Device.ios && !Device.android) || (params.simulateTouch && !Support.touch && Device.ios)) {
        target.addEventListener('mousedown', swiper.scrollbar.onDragStart, activeListener);
        doc.addEventListener('mousemove', swiper.scrollbar.onDragMove, activeListener);
        doc.addEventListener('mouseup', swiper.scrollbar.onDragEnd, passiveListener);
      }
    }
  },
  disableDraggable: function disableDraggable() {
    var swiper = this;
    if (!swiper.params.scrollbar.el) { return; }
    var scrollbar = swiper.scrollbar;
    var touchEvents = swiper.touchEvents;
    var touchEventsDesktop = swiper.touchEventsDesktop;
    var params = swiper.params;
    var $el = scrollbar.$el;
    var target = $el[0];
    var activeListener = Support.passiveListener && params.passiveListener ? { passive: false, capture: false } : false;
    var passiveListener = Support.passiveListener && params.passiveListener ? { passive: true, capture: false } : false;
    if (!Support.touch && (Support.pointerEvents || Support.prefixedPointerEvents)) {
      target.removeEventListener(touchEventsDesktop.start, swiper.scrollbar.onDragStart, activeListener);
      doc.removeEventListener(touchEventsDesktop.move, swiper.scrollbar.onDragMove, activeListener);
      doc.removeEventListener(touchEventsDesktop.end, swiper.scrollbar.onDragEnd, passiveListener);
    } else {
      if (Support.touch) {
        target.removeEventListener(touchEvents.start, swiper.scrollbar.onDragStart, activeListener);
        target.removeEventListener(touchEvents.move, swiper.scrollbar.onDragMove, activeListener);
        target.removeEventListener(touchEvents.end, swiper.scrollbar.onDragEnd, passiveListener);
      }
      if ((params.simulateTouch && !Device.ios && !Device.android) || (params.simulateTouch && !Support.touch && Device.ios)) {
        target.removeEventListener('mousedown', swiper.scrollbar.onDragStart, activeListener);
        doc.removeEventListener('mousemove', swiper.scrollbar.onDragMove, activeListener);
        doc.removeEventListener('mouseup', swiper.scrollbar.onDragEnd, passiveListener);
      }
    }
  },
  init: function init() {
    var swiper = this;
    if (!swiper.params.scrollbar.el) { return; }
    var scrollbar = swiper.scrollbar;
    var $swiperEl = swiper.$el;
    var params = swiper.params.scrollbar;

    var $el = $(params.el);
    if (swiper.params.uniqueNavElements && typeof params.el === 'string' && $el.length > 1 && $swiperEl.find(params.el).length === 1) {
      $el = $swiperEl.find(params.el);
    }

    var $dragEl = $el.find(("." + (swiper.params.scrollbar.dragClass)));
    if ($dragEl.length === 0) {
      $dragEl = $(("<div class=\"" + (swiper.params.scrollbar.dragClass) + "\"></div>"));
      $el.append($dragEl);
    }

    Utils.extend(scrollbar, {
      $el: $el,
      el: $el[0],
      $dragEl: $dragEl,
      dragEl: $dragEl[0],
    });

    if (params.draggable) {
      scrollbar.enableDraggable();
    }
  },
  destroy: function destroy() {
    var swiper = this;
    swiper.scrollbar.disableDraggable();
  },
};

var Scrollbar$1 = {
  name: 'scrollbar',
  params: {
    scrollbar: {
      el: null,
      dragSize: 'auto',
      hide: false,
      draggable: false,
      snapOnRelease: true,
      lockClass: 'swiper-scrollbar-lock',
      dragClass: 'swiper-scrollbar-drag',
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      scrollbar: {
        init: Scrollbar.init.bind(swiper),
        destroy: Scrollbar.destroy.bind(swiper),
        updateSize: Scrollbar.updateSize.bind(swiper),
        setTranslate: Scrollbar.setTranslate.bind(swiper),
        setTransition: Scrollbar.setTransition.bind(swiper),
        enableDraggable: Scrollbar.enableDraggable.bind(swiper),
        disableDraggable: Scrollbar.disableDraggable.bind(swiper),
        setDragPosition: Scrollbar.setDragPosition.bind(swiper),
        onDragStart: Scrollbar.onDragStart.bind(swiper),
        onDragMove: Scrollbar.onDragMove.bind(swiper),
        onDragEnd: Scrollbar.onDragEnd.bind(swiper),
        isTouched: false,
        timeout: null,
        dragTimeout: null,
      },
    });
  },
  on: {
    init: function init() {
      var swiper = this;
      swiper.scrollbar.init();
      swiper.scrollbar.updateSize();
      swiper.scrollbar.setTranslate();
    },
    update: function update() {
      var swiper = this;
      swiper.scrollbar.updateSize();
    },
    resize: function resize() {
      var swiper = this;
      swiper.scrollbar.updateSize();
    },
    observerUpdate: function observerUpdate() {
      var swiper = this;
      swiper.scrollbar.updateSize();
    },
    setTranslate: function setTranslate() {
      var swiper = this;
      swiper.scrollbar.setTranslate();
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      swiper.scrollbar.setTransition(duration);
    },
    destroy: function destroy() {
      var swiper = this;
      swiper.scrollbar.destroy();
    },
  },
};

var Parallax = {
  setTransform: function setTransform(el, progress) {
    var swiper = this;
    var rtl = swiper.rtl;

    var $el = $(el);
    var rtlFactor = rtl ? -1 : 1;

    var p = $el.attr('data-swiper-parallax') || '0';
    var x = $el.attr('data-swiper-parallax-x');
    var y = $el.attr('data-swiper-parallax-y');
    var scale = $el.attr('data-swiper-parallax-scale');
    var opacity = $el.attr('data-swiper-parallax-opacity');

    if (x || y) {
      x = x || '0';
      y = y || '0';
    } else if (swiper.isHorizontal()) {
      x = p;
      y = '0';
    } else {
      y = p;
      x = '0';
    }

    if ((x).indexOf('%') >= 0) {
      x = (parseInt(x, 10) * progress * rtlFactor) + "%";
    } else {
      x = (x * progress * rtlFactor) + "px";
    }
    if ((y).indexOf('%') >= 0) {
      y = (parseInt(y, 10) * progress) + "%";
    } else {
      y = (y * progress) + "px";
    }

    if (typeof opacity !== 'undefined' && opacity !== null) {
      var currentOpacity = opacity - ((opacity - 1) * (1 - Math.abs(progress)));
      $el[0].style.opacity = currentOpacity;
    }
    if (typeof scale === 'undefined' || scale === null) {
      $el.transform(("translate3d(" + x + ", " + y + ", 0px)"));
    } else {
      var currentScale = scale - ((scale - 1) * (1 - Math.abs(progress)));
      $el.transform(("translate3d(" + x + ", " + y + ", 0px) scale(" + currentScale + ")"));
    }
  },
  setTranslate: function setTranslate() {
    var swiper = this;
    var $el = swiper.$el;
    var slides = swiper.slides;
    var progress = swiper.progress;
    var snapGrid = swiper.snapGrid;
    $el.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]')
      .each(function (index, el) {
        swiper.parallax.setTransform(el, progress);
      });
    slides.each(function (slideIndex, slideEl) {
      var slideProgress = slideEl.progress;
      if (swiper.params.slidesPerGroup > 1 && swiper.params.slidesPerView !== 'auto') {
        slideProgress += Math.ceil(slideIndex / 2) - (progress * (snapGrid.length - 1));
      }
      slideProgress = Math.min(Math.max(slideProgress, -1), 1);
      $(slideEl).find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]')
        .each(function (index, el) {
          swiper.parallax.setTransform(el, slideProgress);
        });
    });
  },
  setTransition: function setTransition(duration) {
    if ( duration === void 0 ) duration = this.params.speed;

    var swiper = this;
    var $el = swiper.$el;
    $el.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]')
      .each(function (index, parallaxEl) {
        var $parallaxEl = $(parallaxEl);
        var parallaxDuration = parseInt($parallaxEl.attr('data-swiper-parallax-duration'), 10) || duration;
        if (duration === 0) { parallaxDuration = 0; }
        $parallaxEl.transition(parallaxDuration);
      });
  },
};

var Parallax$1 = {
  name: 'parallax',
  params: {
    parallax: {
      enabled: false,
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      parallax: {
        setTransform: Parallax.setTransform.bind(swiper),
        setTranslate: Parallax.setTranslate.bind(swiper),
        setTransition: Parallax.setTransition.bind(swiper),
      },
    });
  },
  on: {
    beforeInit: function beforeInit() {
      var swiper = this;
      if (!swiper.params.parallax.enabled) { return; }
      swiper.params.watchSlidesProgress = true;
    },
    init: function init() {
      var swiper = this;
      if (!swiper.params.parallax) { return; }
      swiper.parallax.setTranslate();
    },
    setTranslate: function setTranslate() {
      var swiper = this;
      if (!swiper.params.parallax) { return; }
      swiper.parallax.setTranslate();
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      if (!swiper.params.parallax) { return; }
      swiper.parallax.setTransition(duration);
    },
  },
};

var Zoom = {
  // Calc Scale From Multi-touches
  getDistanceBetweenTouches: function getDistanceBetweenTouches(e) {
    if (e.targetTouches.length < 2) { return 1; }
    var x1 = e.targetTouches[0].pageX;
    var y1 = e.targetTouches[0].pageY;
    var x2 = e.targetTouches[1].pageX;
    var y2 = e.targetTouches[1].pageY;
    var distance = Math.sqrt((Math.pow( (x2 - x1), 2 )) + (Math.pow( (y2 - y1), 2 )));
    return distance;
  },
  // Events
  onGestureStart: function onGestureStart(e) {
    var swiper = this;
    var params = swiper.params.zoom;
    var zoom = swiper.zoom;
    var gesture = zoom.gesture;
    zoom.fakeGestureTouched = false;
    zoom.fakeGestureMoved = false;
    if (!Support.gestures) {
      if (e.type !== 'touchstart' || (e.type === 'touchstart' && e.targetTouches.length < 2)) {
        return;
      }
      zoom.fakeGestureTouched = true;
      gesture.scaleStart = Zoom.getDistanceBetweenTouches(e);
    }
    if (!gesture.$slideEl || !gesture.$slideEl.length) {
      gesture.$slideEl = $(e.target).closest('.swiper-slide');
      if (gesture.$slideEl.length === 0) { gesture.$slideEl = swiper.slides.eq(swiper.activeIndex); }
      gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas');
      gesture.$imageWrapEl = gesture.$imageEl.parent(("." + (params.containerClass)));
      gesture.maxRatio = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
      if (gesture.$imageWrapEl.length === 0) {
        gesture.$imageEl = undefined;
        return;
      }
    }
    gesture.$imageEl.transition(0);
    swiper.zoom.isScaling = true;
  },
  onGestureChange: function onGestureChange(e) {
    var swiper = this;
    var params = swiper.params.zoom;
    var zoom = swiper.zoom;
    var gesture = zoom.gesture;
    if (!Support.gestures) {
      if (e.type !== 'touchmove' || (e.type === 'touchmove' && e.targetTouches.length < 2)) {
        return;
      }
      zoom.fakeGestureMoved = true;
      gesture.scaleMove = Zoom.getDistanceBetweenTouches(e);
    }
    if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
    if (Support.gestures) {
      swiper.zoom.scale = e.scale * zoom.currentScale;
    } else {
      zoom.scale = (gesture.scaleMove / gesture.scaleStart) * zoom.currentScale;
    }
    if (zoom.scale > gesture.maxRatio) {
      zoom.scale = (gesture.maxRatio - 1) + (Math.pow( ((zoom.scale - gesture.maxRatio) + 1), 0.5 ));
    }
    if (zoom.scale < params.minRatio) {
      zoom.scale = (params.minRatio + 1) - (Math.pow( ((params.minRatio - zoom.scale) + 1), 0.5 ));
    }
    gesture.$imageEl.transform(("translate3d(0,0,0) scale(" + (zoom.scale) + ")"));
  },
  onGestureEnd: function onGestureEnd(e) {
    var swiper = this;
    var params = swiper.params.zoom;
    var zoom = swiper.zoom;
    var gesture = zoom.gesture;
    if (!Support.gestures) {
      if (!zoom.fakeGestureTouched || !zoom.fakeGestureMoved) {
        return;
      }
      if (e.type !== 'touchend' || (e.type === 'touchend' && e.changedTouches.length < 2 && !Device.android)) {
        return;
      }
      zoom.fakeGestureTouched = false;
      zoom.fakeGestureMoved = false;
    }
    if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
    zoom.scale = Math.max(Math.min(zoom.scale, gesture.maxRatio), params.minRatio);
    gesture.$imageEl.transition(swiper.params.speed).transform(("translate3d(0,0,0) scale(" + (zoom.scale) + ")"));
    zoom.currentScale = zoom.scale;
    zoom.isScaling = false;
    if (zoom.scale === 1) { gesture.$slideEl = undefined; }
  },
  onTouchStart: function onTouchStart(e) {
    var swiper = this;
    var zoom = swiper.zoom;
    var gesture = zoom.gesture;
    var image = zoom.image;
    if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
    if (image.isTouched) { return; }
    if (Device.android) { e.preventDefault(); }
    image.isTouched = true;
    image.touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
    image.touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
  },
  onTouchMove: function onTouchMove(e) {
    var swiper = this;
    var zoom = swiper.zoom;
    var gesture = zoom.gesture;
    var image = zoom.image;
    var velocity = zoom.velocity;
    if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
    swiper.allowClick = false;
    if (!image.isTouched || !gesture.$slideEl) { return; }

    if (!image.isMoved) {
      image.width = gesture.$imageEl[0].offsetWidth;
      image.height = gesture.$imageEl[0].offsetHeight;
      image.startX = Utils.getTranslate(gesture.$imageWrapEl[0], 'x') || 0;
      image.startY = Utils.getTranslate(gesture.$imageWrapEl[0], 'y') || 0;
      gesture.slideWidth = gesture.$slideEl[0].offsetWidth;
      gesture.slideHeight = gesture.$slideEl[0].offsetHeight;
      gesture.$imageWrapEl.transition(0);
      if (swiper.rtl) {
        image.startX = -image.startX;
        image.startY = -image.startY;
      }
    }
    // Define if we need image drag
    var scaledWidth = image.width * zoom.scale;
    var scaledHeight = image.height * zoom.scale;

    if (scaledWidth < gesture.slideWidth && scaledHeight < gesture.slideHeight) { return; }

    image.minX = Math.min(((gesture.slideWidth / 2) - (scaledWidth / 2)), 0);
    image.maxX = -image.minX;
    image.minY = Math.min(((gesture.slideHeight / 2) - (scaledHeight / 2)), 0);
    image.maxY = -image.minY;

    image.touchesCurrent.x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
    image.touchesCurrent.y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

    if (!image.isMoved && !zoom.isScaling) {
      if (
        swiper.isHorizontal() &&
        (
          (Math.floor(image.minX) === Math.floor(image.startX) && image.touchesCurrent.x < image.touchesStart.x) ||
          (Math.floor(image.maxX) === Math.floor(image.startX) && image.touchesCurrent.x > image.touchesStart.x)
        )
      ) {
        image.isTouched = false;
        return;
      } else if (
        !swiper.isHorizontal() &&
        (
          (Math.floor(image.minY) === Math.floor(image.startY) && image.touchesCurrent.y < image.touchesStart.y) ||
          (Math.floor(image.maxY) === Math.floor(image.startY) && image.touchesCurrent.y > image.touchesStart.y)
        )
      ) {
        image.isTouched = false;
        return;
      }
    }
    e.preventDefault();
    e.stopPropagation();

    image.isMoved = true;
    image.currentX = (image.touchesCurrent.x - image.touchesStart.x) + image.startX;
    image.currentY = (image.touchesCurrent.y - image.touchesStart.y) + image.startY;

    if (image.currentX < image.minX) {
      image.currentX = (image.minX + 1) - (Math.pow( ((image.minX - image.currentX) + 1), 0.8 ));
    }
    if (image.currentX > image.maxX) {
      image.currentX = (image.maxX - 1) + (Math.pow( ((image.currentX - image.maxX) + 1), 0.8 ));
    }

    if (image.currentY < image.minY) {
      image.currentY = (image.minY + 1) - (Math.pow( ((image.minY - image.currentY) + 1), 0.8 ));
    }
    if (image.currentY > image.maxY) {
      image.currentY = (image.maxY - 1) + (Math.pow( ((image.currentY - image.maxY) + 1), 0.8 ));
    }

    // Velocity
    if (!velocity.prevPositionX) { velocity.prevPositionX = image.touchesCurrent.x; }
    if (!velocity.prevPositionY) { velocity.prevPositionY = image.touchesCurrent.y; }
    if (!velocity.prevTime) { velocity.prevTime = Date.now(); }
    velocity.x = (image.touchesCurrent.x - velocity.prevPositionX) / (Date.now() - velocity.prevTime) / 2;
    velocity.y = (image.touchesCurrent.y - velocity.prevPositionY) / (Date.now() - velocity.prevTime) / 2;
    if (Math.abs(image.touchesCurrent.x - velocity.prevPositionX) < 2) { velocity.x = 0; }
    if (Math.abs(image.touchesCurrent.y - velocity.prevPositionY) < 2) { velocity.y = 0; }
    velocity.prevPositionX = image.touchesCurrent.x;
    velocity.prevPositionY = image.touchesCurrent.y;
    velocity.prevTime = Date.now();

    gesture.$imageWrapEl.transform(("translate3d(" + (image.currentX) + "px, " + (image.currentY) + "px,0)"));
  },
  onTouchEnd: function onTouchEnd() {
    var swiper = this;
    var zoom = swiper.zoom;
    var gesture = zoom.gesture;
    var image = zoom.image;
    var velocity = zoom.velocity;
    if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
    if (!image.isTouched || !image.isMoved) {
      image.isTouched = false;
      image.isMoved = false;
      return;
    }
    image.isTouched = false;
    image.isMoved = false;
    var momentumDurationX = 300;
    var momentumDurationY = 300;
    var momentumDistanceX = velocity.x * momentumDurationX;
    var newPositionX = image.currentX + momentumDistanceX;
    var momentumDistanceY = velocity.y * momentumDurationY;
    var newPositionY = image.currentY + momentumDistanceY;

    // Fix duration
    if (velocity.x !== 0) { momentumDurationX = Math.abs((newPositionX - image.currentX) / velocity.x); }
    if (velocity.y !== 0) { momentumDurationY = Math.abs((newPositionY - image.currentY) / velocity.y); }
    var momentumDuration = Math.max(momentumDurationX, momentumDurationY);

    image.currentX = newPositionX;
    image.currentY = newPositionY;

    // Define if we need image drag
    var scaledWidth = image.width * zoom.scale;
    var scaledHeight = image.height * zoom.scale;
    image.minX = Math.min(((gesture.slideWidth / 2) - (scaledWidth / 2)), 0);
    image.maxX = -image.minX;
    image.minY = Math.min(((gesture.slideHeight / 2) - (scaledHeight / 2)), 0);
    image.maxY = -image.minY;
    image.currentX = Math.max(Math.min(image.currentX, image.maxX), image.minX);
    image.currentY = Math.max(Math.min(image.currentY, image.maxY), image.minY);

    gesture.$imageWrapEl.transition(momentumDuration).transform(("translate3d(" + (image.currentX) + "px, " + (image.currentY) + "px,0)"));
  },
  onTransitionEnd: function onTransitionEnd() {
    var swiper = this;
    var zoom = swiper.zoom;
    var gesture = zoom.gesture;
    if (gesture.$slideEl && swiper.previousIndex !== swiper.activeIndex) {
      gesture.$imageEl.transform('translate3d(0,0,0) scale(1)');
      gesture.$imageWrapEl.transform('translate3d(0,0,0)');
      gesture.$slideEl = undefined;
      gesture.$imageEl = undefined;
      gesture.$imageWrapEl = undefined;

      zoom.scale = 1;
      zoom.currentScale = 1;
    }
  },
  // Toggle Zoom
  toggle: function toggle(e) {
    var swiper = this;
    var zoom = swiper.zoom;

    if (zoom.scale && zoom.scale !== 1) {
      // Zoom Out
      zoom.out();
    } else {
      // Zoom In
      zoom.in(e);
    }
  },
  in: function in$1(e) {
    var swiper = this;

    var zoom = swiper.zoom;
    var params = swiper.params.zoom;
    var gesture = zoom.gesture;
    var image = zoom.image;

    if (!gesture.$slideEl) {
      gesture.$slideEl = swiper.clickedSlide ? $(swiper.clickedSlide) : swiper.slides.eq(swiper.activeIndex);
      gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas');
      gesture.$imageWrapEl = gesture.$imageEl.parent(("." + (params.containerClass)));
    }
    if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }

    gesture.$slideEl.addClass(("" + (params.zoomedSlideClass)));

    var touchX;
    var touchY;
    var offsetX;
    var offsetY;
    var diffX;
    var diffY;
    var translateX;
    var translateY;
    var imageWidth;
    var imageHeight;
    var scaledWidth;
    var scaledHeight;
    var translateMinX;
    var translateMinY;
    var translateMaxX;
    var translateMaxY;
    var slideWidth;
    var slideHeight;

    if (typeof image.touchesStart.x === 'undefined' && e) {
      touchX = e.type === 'touchend' ? e.changedTouches[0].pageX : e.pageX;
      touchY = e.type === 'touchend' ? e.changedTouches[0].pageY : e.pageY;
    } else {
      touchX = image.touchesStart.x;
      touchY = image.touchesStart.y;
    }

    zoom.scale = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
    zoom.currentScale = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
    if (e) {
      slideWidth = gesture.$slideEl[0].offsetWidth;
      slideHeight = gesture.$slideEl[0].offsetHeight;
      offsetX = gesture.$slideEl.offset().left;
      offsetY = gesture.$slideEl.offset().top;
      diffX = (offsetX + (slideWidth / 2)) - touchX;
      diffY = (offsetY + (slideHeight / 2)) - touchY;

      imageWidth = gesture.$imageEl[0].offsetWidth;
      imageHeight = gesture.$imageEl[0].offsetHeight;
      scaledWidth = imageWidth * zoom.scale;
      scaledHeight = imageHeight * zoom.scale;

      translateMinX = Math.min(((slideWidth / 2) - (scaledWidth / 2)), 0);
      translateMinY = Math.min(((slideHeight / 2) - (scaledHeight / 2)), 0);
      translateMaxX = -translateMinX;
      translateMaxY = -translateMinY;

      translateX = diffX * zoom.scale;
      translateY = diffY * zoom.scale;

      if (translateX < translateMinX) {
        translateX = translateMinX;
      }
      if (translateX > translateMaxX) {
        translateX = translateMaxX;
      }

      if (translateY < translateMinY) {
        translateY = translateMinY;
      }
      if (translateY > translateMaxY) {
        translateY = translateMaxY;
      }
    } else {
      translateX = 0;
      translateY = 0;
    }
    gesture.$imageWrapEl.transition(300).transform(("translate3d(" + translateX + "px, " + translateY + "px,0)"));
    gesture.$imageEl.transition(300).transform(("translate3d(0,0,0) scale(" + (zoom.scale) + ")"));
  },
  out: function out() {
    var swiper = this;

    var zoom = swiper.zoom;
    var params = swiper.params.zoom;
    var gesture = zoom.gesture;

    if (!gesture.$slideEl) {
      gesture.$slideEl = swiper.clickedSlide ? $(swiper.clickedSlide) : swiper.slides.eq(swiper.activeIndex);
      gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas');
      gesture.$imageWrapEl = gesture.$imageEl.parent(("." + (params.containerClass)));
    }
    if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }

    zoom.scale = 1;
    zoom.currentScale = 1;
    gesture.$imageWrapEl.transition(300).transform('translate3d(0,0,0)');
    gesture.$imageEl.transition(300).transform('translate3d(0,0,0) scale(1)');
    gesture.$slideEl.removeClass(("" + (params.zoomedSlideClass)));
    gesture.$slideEl = undefined;
  },
  // Attach/Detach Events
  enable: function enable() {
    var swiper = this;
    var zoom = swiper.zoom;
    if (zoom.enabled) { return; }
    zoom.enabled = true;

    var passiveListener = swiper.touchEvents.start === 'touchstart' && Support.passiveListener && swiper.params.passiveListeners ? { passive: true, capture: false } : false;

    // Scale image
    if (Support.gestures) {
      swiper.$wrapperEl.on('gesturestart', '.swiper-slide', zoom.onGestureStart, passiveListener);
      swiper.$wrapperEl.on('gesturechange', '.swiper-slide', zoom.onGestureChange, passiveListener);
      swiper.$wrapperEl.on('gestureend', '.swiper-slide', zoom.onGestureEnd, passiveListener);
    } else if (swiper.touchEvents.start === 'touchstart') {
      swiper.$wrapperEl.on(swiper.touchEvents.start, '.swiper-slide', zoom.onGestureStart, passiveListener);
      swiper.$wrapperEl.on(swiper.touchEvents.move, '.swiper-slide', zoom.onGestureChange, passiveListener);
      swiper.$wrapperEl.on(swiper.touchEvents.end, '.swiper-slide', zoom.onGestureEnd, passiveListener);
    }

    // Move image
    swiper.$wrapperEl.on(swiper.touchEvents.move, ("." + (swiper.params.zoom.containerClass)), zoom.onTouchMove);
  },
  disable: function disable() {
    var swiper = this;
    var zoom = swiper.zoom;
    if (!zoom.enabled) { return; }

    swiper.zoom.enabled = false;

    var passiveListener = swiper.touchEvents.start === 'touchstart' && Support.passiveListener && swiper.params.passiveListeners ? { passive: true, capture: false } : false;

    // Scale image
    if (Support.gestures) {
      swiper.$wrapperEl.off('gesturestart', '.swiper-slide', zoom.onGestureStart, passiveListener);
      swiper.$wrapperEl.off('gesturechange', '.swiper-slide', zoom.onGestureChange, passiveListener);
      swiper.$wrapperEl.off('gestureend', '.swiper-slide', zoom.onGestureEnd, passiveListener);
    } else if (swiper.touchEvents.start === 'touchstart') {
      swiper.$wrapperEl.off(swiper.touchEvents.start, '.swiper-slide', zoom.onGestureStart, passiveListener);
      swiper.$wrapperEl.off(swiper.touchEvents.move, '.swiper-slide', zoom.onGestureChange, passiveListener);
      swiper.$wrapperEl.off(swiper.touchEvents.end, '.swiper-slide', zoom.onGestureEnd, passiveListener);
    }

    // Move image
    swiper.$wrapperEl.off(swiper.touchEvents.move, ("." + (swiper.params.zoom.containerClass)), zoom.onTouchMove);
  },
};

var Zoom$1 = {
  name: 'zoom',
  params: {
    zoom: {
      enabled: false,
      maxRatio: 3,
      minRatio: 1,
      toggle: true,
      containerClass: 'swiper-zoom-container',
      zoomedSlideClass: 'swiper-slide-zoomed',
    },
  },
  create: function create() {
    var swiper = this;
    var zoom = {
      enabled: false,
      scale: 1,
      currentScale: 1,
      isScaling: false,
      gesture: {
        $slideEl: undefined,
        slideWidth: undefined,
        slideHeight: undefined,
        $imageEl: undefined,
        $imageWrapEl: undefined,
        maxRatio: 3,
      },
      image: {
        isTouched: undefined,
        isMoved: undefined,
        currentX: undefined,
        currentY: undefined,
        minX: undefined,
        minY: undefined,
        maxX: undefined,
        maxY: undefined,
        width: undefined,
        height: undefined,
        startX: undefined,
        startY: undefined,
        touchesStart: {},
        touchesCurrent: {},
      },
      velocity: {
        x: undefined,
        y: undefined,
        prevPositionX: undefined,
        prevPositionY: undefined,
        prevTime: undefined,
      },
    };
    ('onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out').split(' ').forEach(function (methodName) {
      zoom[methodName] = Zoom[methodName].bind(swiper);
    });
    Utils.extend(swiper, {
      zoom: zoom,
    });
  },
  on: {
    init: function init() {
      var swiper = this;
      if (swiper.params.zoom.enabled) {
        swiper.zoom.enable();
      }
    },
    destroy: function destroy() {
      var swiper = this;
      swiper.zoom.disable();
    },
    touchStart: function touchStart(e) {
      var swiper = this;
      if (!swiper.zoom.enabled) { return; }
      swiper.zoom.onTouchStart(e);
    },
    touchEnd: function touchEnd(e) {
      var swiper = this;
      if (!swiper.zoom.enabled) { return; }
      swiper.zoom.onTouchEnd(e);
    },
    doubleTap: function doubleTap(e) {
      var swiper = this;
      if (swiper.params.zoom.enabled && swiper.zoom.enabled && swiper.params.zoom.toggle) {
        swiper.zoom.toggle(e);
      }
    },
    transitionEnd: function transitionEnd() {
      var swiper = this;
      if (swiper.zoom.enabled && swiper.params.zoom.enabled) {
        swiper.zoom.onTransitionEnd();
      }
    },
  },
};

var Lazy = {
  loadInSlide: function loadInSlide(index, loadInDuplicate) {
    if ( loadInDuplicate === void 0 ) loadInDuplicate = true;

    var swiper = this;
    var params = swiper.params.lazy;
    if (typeof index === 'undefined') { return; }
    if (swiper.slides.length === 0) { return; }
    var isVirtual = swiper.virtual && swiper.params.virtual.enabled;

    var $slideEl = isVirtual
      ? swiper.$wrapperEl.children(("." + (swiper.params.slideClass) + "[data-swiper-slide-index=\"" + index + "\"]"))
      : swiper.slides.eq(index);

    var $images = $slideEl.find(("." + (params.elementClass) + ":not(." + (params.loadedClass) + "):not(." + (params.loadingClass) + ")"));
    if ($slideEl.hasClass(params.elementClass) && !$slideEl.hasClass(params.loadedClass) && !$slideEl.hasClass(params.loadingClass)) {
      $images = $images.add($slideEl[0]);
    }
    if ($images.length === 0) { return; }

    $images.each(function (imageIndex, imageEl) {
      var $imageEl = $(imageEl);
      $imageEl.addClass(params.loadingClass);

      var background = $imageEl.attr('data-background');
      var src = $imageEl.attr('data-src');
      var srcset = $imageEl.attr('data-srcset');
      var sizes = $imageEl.attr('data-sizes');

      swiper.loadImage($imageEl[0], (src || background), srcset, sizes, false, function () {
        if (typeof swiper === 'undefined' || swiper === null || !swiper || (swiper && !swiper.params) || swiper.destroyed) { return; }
        if (background) {
          $imageEl.css('background-image', ("url(\"" + background + "\")"));
          $imageEl.removeAttr('data-background');
        } else {
          if (srcset) {
            $imageEl.attr('srcset', srcset);
            $imageEl.removeAttr('data-srcset');
          }
          if (sizes) {
            $imageEl.attr('sizes', sizes);
            $imageEl.removeAttr('data-sizes');
          }
          if (src) {
            $imageEl.attr('src', src);
            $imageEl.removeAttr('data-src');
          }
        }

        $imageEl.addClass(params.loadedClass).removeClass(params.loadingClass);
        $slideEl.find(("." + (params.preloaderClass))).remove();
        if (swiper.params.loop && loadInDuplicate) {
          var slideOriginalIndex = $slideEl.attr('data-swiper-slide-index');
          if ($slideEl.hasClass(swiper.params.slideDuplicateClass)) {
            var originalSlide = swiper.$wrapperEl.children(("[data-swiper-slide-index=\"" + slideOriginalIndex + "\"]:not(." + (swiper.params.slideDuplicateClass) + ")"));
            swiper.lazy.loadInSlide(originalSlide.index(), false);
          } else {
            var duplicatedSlide = swiper.$wrapperEl.children(("." + (swiper.params.slideDuplicateClass) + "[data-swiper-slide-index=\"" + slideOriginalIndex + "\"]"));
            swiper.lazy.loadInSlide(duplicatedSlide.index(), false);
          }
        }
        swiper.emit('lazyImageReady', $slideEl[0], $imageEl[0]);
      });

      swiper.emit('lazyImageLoad', $slideEl[0], $imageEl[0]);
    });
  },
  load: function load() {
    var swiper = this;
    var $wrapperEl = swiper.$wrapperEl;
    var swiperParams = swiper.params;
    var slides = swiper.slides;
    var activeIndex = swiper.activeIndex;
    var isVirtual = swiper.virtual && swiperParams.virtual.enabled;
    var params = swiperParams.lazy;

    var slidesPerView = swiperParams.slidesPerView;
    if (slidesPerView === 'auto') {
      slidesPerView = 0;
    }

    function slideExist(index) {
      if (isVirtual) {
        if ($wrapperEl.children(("." + (swiperParams.slideClass) + "[data-swiper-slide-index=\"" + index + "\"]")).length) {
          return true;
        }
      } else if (slides[index]) { return true; }
      return false;
    }
    function slideIndex(slideEl) {
      if (isVirtual) {
        return $(slideEl).attr('data-swiper-slide-index');
      }
      return $(slideEl).index();
    }

    if (!swiper.lazy.initialImageLoaded) { swiper.lazy.initialImageLoaded = true; }
    if (swiper.params.watchSlidesVisibility) {
      $wrapperEl.children(("." + (swiperParams.slideVisibleClass))).each(function (elIndex, slideEl) {
        var index = isVirtual ? $(slideEl).attr('data-swiper-slide-index') : $(slideEl).index();
        swiper.lazy.loadInSlide(index);
      });
    } else if (slidesPerView > 1) {
      for (var i = activeIndex; i < activeIndex + slidesPerView; i += 1) {
        if (slideExist(i)) { swiper.lazy.loadInSlide(i); }
      }
    } else {
      swiper.lazy.loadInSlide(activeIndex);
    }
    if (params.loadPrevNext) {
      if (slidesPerView > 1 || (params.loadPrevNextAmount && params.loadPrevNextAmount > 1)) {
        var amount = params.loadPrevNextAmount;
        var spv = slidesPerView;
        var maxIndex = Math.min(activeIndex + spv + Math.max(amount, spv), slides.length);
        var minIndex = Math.max(activeIndex - Math.max(spv, amount), 0);
        // Next Slides
        for (var i$1 = activeIndex + slidesPerView; i$1 < maxIndex; i$1 += 1) {
          if (slideExist(i$1)) { swiper.lazy.loadInSlide(i$1); }
        }
        // Prev Slides
        for (var i$2 = minIndex; i$2 < activeIndex; i$2 += 1) {
          if (slideExist(i$2)) { swiper.lazy.loadInSlide(i$2); }
        }
      } else {
        var nextSlide = $wrapperEl.children(("." + (swiperParams.slideNextClass)));
        if (nextSlide.length > 0) { swiper.lazy.loadInSlide(slideIndex(nextSlide)); }

        var prevSlide = $wrapperEl.children(("." + (swiperParams.slidePrevClass)));
        if (prevSlide.length > 0) { swiper.lazy.loadInSlide(slideIndex(prevSlide)); }
      }
    }
  },
};

var Lazy$1 = {
  name: 'lazy',
  params: {
    lazy: {
      enabled: false,
      loadPrevNext: false,
      loadPrevNextAmount: 1,
      loadOnTransitionStart: false,

      elementClass: 'swiper-lazy',
      loadingClass: 'swiper-lazy-loading',
      loadedClass: 'swiper-lazy-loaded',
      preloaderClass: 'swiper-lazy-preloader',
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      lazy: {
        initialImageLoaded: false,
        load: Lazy.load.bind(swiper),
        loadInSlide: Lazy.loadInSlide.bind(swiper),
      },
    });
  },
  on: {
    beforeInit: function beforeInit() {
      var swiper = this;
      if (swiper.params.lazy.enabled && swiper.params.preloadImages) {
        swiper.params.preloadImages = false;
      }
    },
    init: function init() {
      var swiper = this;
      if (swiper.params.lazy.enabled && !swiper.params.loop && swiper.params.initialSlide === 0) {
        swiper.lazy.load();
      }
    },
    scroll: function scroll() {
      var swiper = this;
      if (swiper.params.freeMode && !swiper.params.freeModeSticky) {
        swiper.lazy.load();
      }
    },
    resize: function resize() {
      var swiper = this;
      if (swiper.params.lazy.enabled) {
        swiper.lazy.load();
      }
    },
    scrollbarDragMove: function scrollbarDragMove() {
      var swiper = this;
      if (swiper.params.lazy.enabled) {
        swiper.lazy.load();
      }
    },
    transitionStart: function transitionStart() {
      var swiper = this;
      if (swiper.params.lazy.enabled) {
        if (swiper.params.lazy.loadOnTransitionStart || (!swiper.params.lazy.loadOnTransitionStart && !swiper.lazy.initialImageLoaded)) {
          swiper.lazy.load();
        }
      }
    },
    transitionEnd: function transitionEnd() {
      var swiper = this;
      if (swiper.params.lazy.enabled && !swiper.params.lazy.loadOnTransitionStart) {
        swiper.lazy.load();
      }
    },
  },
};

/* eslint no-bitwise: ["error", { "allow": [">>"] }] */

var Controller = {
  LinearSpline: function LinearSpline(x, y) {
    var binarySearch = (function search() {
      var maxIndex;
      var minIndex;
      var guess;
      return function (array, val) {
        minIndex = -1;
        maxIndex = array.length;
        while (maxIndex - minIndex > 1) {
          guess = maxIndex + minIndex >> 1;
          if (array[guess] <= val) {
            minIndex = guess;
          } else {
            maxIndex = guess;
          }
        }
        return maxIndex;
      };
    }());
    this.x = x;
    this.y = y;
    this.lastIndex = x.length - 1;
    // Given an x value (x2), return the expected y2 value:
    // (x1,y1) is the known point before given value,
    // (x3,y3) is the known point after given value.
    var i1;
    var i3;

    this.interpolate = function interpolate(x2) {
      if (!x2) { return 0; }

      // Get the indexes of x1 and x3 (the array indexes before and after given x2):
      i3 = binarySearch(this.x, x2);
      i1 = i3 - 1;

      // We have our indexes i1 & i3, so we can calculate already:
      // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1
      return (((x2 - this.x[i1]) * (this.y[i3] - this.y[i1])) / (this.x[i3] - this.x[i1])) + this.y[i1];
    };
    return this;
  },
  // xxx: for now i will just save one spline function to to
  getInterpolateFunction: function getInterpolateFunction(c) {
    var swiper = this;
    if (!swiper.controller.spline) {
      swiper.controller.spline = swiper.params.loop ?
        new Controller.LinearSpline(swiper.slidesGrid, c.slidesGrid) :
        new Controller.LinearSpline(swiper.snapGrid, c.snapGrid);
    }
  },
  setTranslate: function setTranslate(setTranslate$1, byController) {
    var swiper = this;
    var controlled = swiper.controller.control;
    var multiplier;
    var controlledTranslate;
    function setControlledTranslate(c) {
      // this will create an Interpolate function based on the snapGrids
      // x is the Grid of the scrolled scroller and y will be the controlled scroller
      // it makes sense to create this only once and recall it for the interpolation
      // the function does a lot of value caching for performance
      var translate = swiper.rtlTranslate ? -swiper.translate : swiper.translate;
      if (swiper.params.controller.by === 'slide') {
        swiper.controller.getInterpolateFunction(c);
        // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
        // but it did not work out
        controlledTranslate = -swiper.controller.spline.interpolate(-translate);
      }

      if (!controlledTranslate || swiper.params.controller.by === 'container') {
        multiplier = (c.maxTranslate() - c.minTranslate()) / (swiper.maxTranslate() - swiper.minTranslate());
        controlledTranslate = ((translate - swiper.minTranslate()) * multiplier) + c.minTranslate();
      }

      if (swiper.params.controller.inverse) {
        controlledTranslate = c.maxTranslate() - controlledTranslate;
      }
      c.updateProgress(controlledTranslate);
      c.setTranslate(controlledTranslate, swiper);
      c.updateActiveIndex();
      c.updateSlidesClasses();
    }
    if (Array.isArray(controlled)) {
      for (var i = 0; i < controlled.length; i += 1) {
        if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
          setControlledTranslate(controlled[i]);
        }
      }
    } else if (controlled instanceof Swiper && byController !== controlled) {
      setControlledTranslate(controlled);
    }
  },
  setTransition: function setTransition(duration, byController) {
    var swiper = this;
    var controlled = swiper.controller.control;
    var i;
    function setControlledTransition(c) {
      c.setTransition(duration, swiper);
      if (duration !== 0) {
        c.transitionStart();
        c.$wrapperEl.transitionEnd(function () {
          if (!controlled) { return; }
          if (c.params.loop && swiper.params.controller.by === 'slide') {
            c.loopFix();
          }
          c.transitionEnd();
        });
      }
    }
    if (Array.isArray(controlled)) {
      for (i = 0; i < controlled.length; i += 1) {
        if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
          setControlledTransition(controlled[i]);
        }
      }
    } else if (controlled instanceof Swiper && byController !== controlled) {
      setControlledTransition(controlled);
    }
  },
};
var Controller$1 = {
  name: 'controller',
  params: {
    controller: {
      control: undefined,
      inverse: false,
      by: 'slide', // or 'container'
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      controller: {
        control: swiper.params.controller.control,
        getInterpolateFunction: Controller.getInterpolateFunction.bind(swiper),
        setTranslate: Controller.setTranslate.bind(swiper),
        setTransition: Controller.setTransition.bind(swiper),
      },
    });
  },
  on: {
    update: function update() {
      var swiper = this;
      if (!swiper.controller.control) { return; }
      if (swiper.controller.spline) {
        swiper.controller.spline = undefined;
        delete swiper.controller.spline;
      }
    },
    resize: function resize() {
      var swiper = this;
      if (!swiper.controller.control) { return; }
      if (swiper.controller.spline) {
        swiper.controller.spline = undefined;
        delete swiper.controller.spline;
      }
    },
    observerUpdate: function observerUpdate() {
      var swiper = this;
      if (!swiper.controller.control) { return; }
      if (swiper.controller.spline) {
        swiper.controller.spline = undefined;
        delete swiper.controller.spline;
      }
    },
    setTranslate: function setTranslate(translate, byController) {
      var swiper = this;
      if (!swiper.controller.control) { return; }
      swiper.controller.setTranslate(translate, byController);
    },
    setTransition: function setTransition(duration, byController) {
      var swiper = this;
      if (!swiper.controller.control) { return; }
      swiper.controller.setTransition(duration, byController);
    },
  },
};

var a11y = {
  makeElFocusable: function makeElFocusable($el) {
    $el.attr('tabIndex', '0');
    return $el;
  },
  addElRole: function addElRole($el, role) {
    $el.attr('role', role);
    return $el;
  },
  addElLabel: function addElLabel($el, label) {
    $el.attr('aria-label', label);
    return $el;
  },
  disableEl: function disableEl($el) {
    $el.attr('aria-disabled', true);
    return $el;
  },
  enableEl: function enableEl($el) {
    $el.attr('aria-disabled', false);
    return $el;
  },
  onEnterKey: function onEnterKey(e) {
    var swiper = this;
    var params = swiper.params.a11y;
    if (e.keyCode !== 13) { return; }
    var $targetEl = $(e.target);
    if (swiper.navigation && swiper.navigation.$nextEl && $targetEl.is(swiper.navigation.$nextEl)) {
      if (!(swiper.isEnd && !swiper.params.loop)) {
        swiper.slideNext();
      }
      if (swiper.isEnd) {
        swiper.a11y.notify(params.lastSlideMessage);
      } else {
        swiper.a11y.notify(params.nextSlideMessage);
      }
    }
    if (swiper.navigation && swiper.navigation.$prevEl && $targetEl.is(swiper.navigation.$prevEl)) {
      if (!(swiper.isBeginning && !swiper.params.loop)) {
        swiper.slidePrev();
      }
      if (swiper.isBeginning) {
        swiper.a11y.notify(params.firstSlideMessage);
      } else {
        swiper.a11y.notify(params.prevSlideMessage);
      }
    }
    if (swiper.pagination && $targetEl.is(("." + (swiper.params.pagination.bulletClass)))) {
      $targetEl[0].click();
    }
  },
  notify: function notify(message) {
    var swiper = this;
    var notification = swiper.a11y.liveRegion;
    if (notification.length === 0) { return; }
    notification.html('');
    notification.html(message);
  },
  updateNavigation: function updateNavigation() {
    var swiper = this;

    if (swiper.params.loop) { return; }
    var ref = swiper.navigation;
    var $nextEl = ref.$nextEl;
    var $prevEl = ref.$prevEl;

    if ($prevEl && $prevEl.length > 0) {
      if (swiper.isBeginning) {
        swiper.a11y.disableEl($prevEl);
      } else {
        swiper.a11y.enableEl($prevEl);
      }
    }
    if ($nextEl && $nextEl.length > 0) {
      if (swiper.isEnd) {
        swiper.a11y.disableEl($nextEl);
      } else {
        swiper.a11y.enableEl($nextEl);
      }
    }
  },
  updatePagination: function updatePagination() {
    var swiper = this;
    var params = swiper.params.a11y;
    if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
      swiper.pagination.bullets.each(function (bulletIndex, bulletEl) {
        var $bulletEl = $(bulletEl);
        swiper.a11y.makeElFocusable($bulletEl);
        swiper.a11y.addElRole($bulletEl, 'button');
        swiper.a11y.addElLabel($bulletEl, params.paginationBulletMessage.replace(/{{index}}/, $bulletEl.index() + 1));
      });
    }
  },
  init: function init() {
    var swiper = this;

    swiper.$el.append(swiper.a11y.liveRegion);

    // Navigation
    var params = swiper.params.a11y;
    var $nextEl;
    var $prevEl;
    if (swiper.navigation && swiper.navigation.$nextEl) {
      $nextEl = swiper.navigation.$nextEl;
    }
    if (swiper.navigation && swiper.navigation.$prevEl) {
      $prevEl = swiper.navigation.$prevEl;
    }
    if ($nextEl) {
      swiper.a11y.makeElFocusable($nextEl);
      swiper.a11y.addElRole($nextEl, 'button');
      swiper.a11y.addElLabel($nextEl, params.nextSlideMessage);
      $nextEl.on('keydown', swiper.a11y.onEnterKey);
    }
    if ($prevEl) {
      swiper.a11y.makeElFocusable($prevEl);
      swiper.a11y.addElRole($prevEl, 'button');
      swiper.a11y.addElLabel($prevEl, params.prevSlideMessage);
      $prevEl.on('keydown', swiper.a11y.onEnterKey);
    }

    // Pagination
    if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
      swiper.pagination.$el.on('keydown', ("." + (swiper.params.pagination.bulletClass)), swiper.a11y.onEnterKey);
    }
  },
  destroy: function destroy() {
    var swiper = this;
    if (swiper.a11y.liveRegion && swiper.a11y.liveRegion.length > 0) { swiper.a11y.liveRegion.remove(); }

    var $nextEl;
    var $prevEl;
    if (swiper.navigation && swiper.navigation.$nextEl) {
      $nextEl = swiper.navigation.$nextEl;
    }
    if (swiper.navigation && swiper.navigation.$prevEl) {
      $prevEl = swiper.navigation.$prevEl;
    }
    if ($nextEl) {
      $nextEl.off('keydown', swiper.a11y.onEnterKey);
    }
    if ($prevEl) {
      $prevEl.off('keydown', swiper.a11y.onEnterKey);
    }

    // Pagination
    if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
      swiper.pagination.$el.off('keydown', ("." + (swiper.params.pagination.bulletClass)), swiper.a11y.onEnterKey);
    }
  },
};
var A11y = {
  name: 'a11y',
  params: {
    a11y: {
      enabled: true,
      notificationClass: 'swiper-notification',
      prevSlideMessage: 'Previous slide',
      nextSlideMessage: 'Next slide',
      firstSlideMessage: 'This is the first slide',
      lastSlideMessage: 'This is the last slide',
      paginationBulletMessage: 'Go to slide {{index}}',
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      a11y: {
        liveRegion: $(("<span class=\"" + (swiper.params.a11y.notificationClass) + "\" aria-live=\"assertive\" aria-atomic=\"true\"></span>")),
      },
    });
    Object.keys(a11y).forEach(function (methodName) {
      swiper.a11y[methodName] = a11y[methodName].bind(swiper);
    });
  },
  on: {
    init: function init() {
      var swiper = this;
      if (!swiper.params.a11y.enabled) { return; }
      swiper.a11y.init();
      swiper.a11y.updateNavigation();
    },
    toEdge: function toEdge() {
      var swiper = this;
      if (!swiper.params.a11y.enabled) { return; }
      swiper.a11y.updateNavigation();
    },
    fromEdge: function fromEdge() {
      var swiper = this;
      if (!swiper.params.a11y.enabled) { return; }
      swiper.a11y.updateNavigation();
    },
    paginationUpdate: function paginationUpdate() {
      var swiper = this;
      if (!swiper.params.a11y.enabled) { return; }
      swiper.a11y.updatePagination();
    },
    destroy: function destroy() {
      var swiper = this;
      if (!swiper.params.a11y.enabled) { return; }
      swiper.a11y.destroy();
    },
  },
};

var History = {
  init: function init() {
    var swiper = this;
    if (!swiper.params.history) { return; }
    if (!win.history || !win.history.pushState) {
      swiper.params.history.enabled = false;
      swiper.params.hashNavigation.enabled = true;
      return;
    }
    var history = swiper.history;
    history.initialized = true;
    history.paths = History.getPathValues();
    if (!history.paths.key && !history.paths.value) { return; }
    history.scrollToSlide(0, history.paths.value, swiper.params.runCallbacksOnInit);
    if (!swiper.params.history.replaceState) {
      win.addEventListener('popstate', swiper.history.setHistoryPopState);
    }
  },
  destroy: function destroy() {
    var swiper = this;
    if (!swiper.params.history.replaceState) {
      win.removeEventListener('popstate', swiper.history.setHistoryPopState);
    }
  },
  setHistoryPopState: function setHistoryPopState() {
    var swiper = this;
    swiper.history.paths = History.getPathValues();
    swiper.history.scrollToSlide(swiper.params.speed, swiper.history.paths.value, false);
  },
  getPathValues: function getPathValues() {
    var pathArray = win.location.pathname.slice(1).split('/').filter(function (part) { return part !== ''; });
    var total = pathArray.length;
    var key = pathArray[total - 2];
    var value = pathArray[total - 1];
    return { key: key, value: value };
  },
  setHistory: function setHistory(key, index) {
    var swiper = this;
    if (!swiper.history.initialized || !swiper.params.history.enabled) { return; }
    var slide = swiper.slides.eq(index);
    var value = History.slugify(slide.attr('data-history'));
    if (!win.location.pathname.includes(key)) {
      value = key + "/" + value;
    }
    var currentState = win.history.state;
    if (currentState && currentState.value === value) {
      return;
    }
    if (swiper.params.history.replaceState) {
      win.history.replaceState({ value: value }, null, value);
    } else {
      win.history.pushState({ value: value }, null, value);
    }
  },
  slugify: function slugify(text) {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  },
  scrollToSlide: function scrollToSlide(speed, value, runCallbacks) {
    var swiper = this;
    if (value) {
      for (var i = 0, length = swiper.slides.length; i < length; i += 1) {
        var slide = swiper.slides.eq(i);
        var slideHistory = History.slugify(slide.attr('data-history'));
        if (slideHistory === value && !slide.hasClass(swiper.params.slideDuplicateClass)) {
          var index = slide.index();
          swiper.slideTo(index, speed, runCallbacks);
        }
      }
    } else {
      swiper.slideTo(0, speed, runCallbacks);
    }
  },
};

var History$1 = {
  name: 'history',
  params: {
    history: {
      enabled: false,
      replaceState: false,
      key: 'slides',
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      history: {
        init: History.init.bind(swiper),
        setHistory: History.setHistory.bind(swiper),
        setHistoryPopState: History.setHistoryPopState.bind(swiper),
        scrollToSlide: History.scrollToSlide.bind(swiper),
        destroy: History.destroy.bind(swiper),
      },
    });
  },
  on: {
    init: function init() {
      var swiper = this;
      if (swiper.params.history.enabled) {
        swiper.history.init();
      }
    },
    destroy: function destroy() {
      var swiper = this;
      if (swiper.params.history.enabled) {
        swiper.history.destroy();
      }
    },
    transitionEnd: function transitionEnd() {
      var swiper = this;
      if (swiper.history.initialized) {
        swiper.history.setHistory(swiper.params.history.key, swiper.activeIndex);
      }
    },
  },
};

var HashNavigation = {
  onHashCange: function onHashCange() {
    var swiper = this;
    var newHash = doc.location.hash.replace('#', '');
    var activeSlideHash = swiper.slides.eq(swiper.activeIndex).attr('data-hash');
    if (newHash !== activeSlideHash) {
      swiper.slideTo(swiper.$wrapperEl.children(("." + (swiper.params.slideClass) + "[data-hash=\"" + newHash + "\"]")).index());
    }
  },
  setHash: function setHash() {
    var swiper = this;
    if (!swiper.hashNavigation.initialized || !swiper.params.hashNavigation.enabled) { return; }
    if (swiper.params.hashNavigation.replaceState && win.history && win.history.replaceState) {
      win.history.replaceState(null, null, (("#" + (swiper.slides.eq(swiper.activeIndex).attr('data-hash'))) || ''));
    } else {
      var slide = swiper.slides.eq(swiper.activeIndex);
      var hash = slide.attr('data-hash') || slide.attr('data-history');
      doc.location.hash = hash || '';
    }
  },
  init: function init() {
    var swiper = this;
    if (!swiper.params.hashNavigation.enabled || (swiper.params.history && swiper.params.history.enabled)) { return; }
    swiper.hashNavigation.initialized = true;
    var hash = doc.location.hash.replace('#', '');
    if (hash) {
      var speed = 0;
      for (var i = 0, length = swiper.slides.length; i < length; i += 1) {
        var slide = swiper.slides.eq(i);
        var slideHash = slide.attr('data-hash') || slide.attr('data-history');
        if (slideHash === hash && !slide.hasClass(swiper.params.slideDuplicateClass)) {
          var index = slide.index();
          swiper.slideTo(index, speed, swiper.params.runCallbacksOnInit, true);
        }
      }
    }
    if (swiper.params.hashNavigation.watchState) {
      $(win).on('hashchange', swiper.hashNavigation.onHashCange);
    }
  },
  destroy: function destroy() {
    var swiper = this;
    if (swiper.params.hashNavigation.watchState) {
      $(win).off('hashchange', swiper.hashNavigation.onHashCange);
    }
  },
};
var HashNavigation$1 = {
  name: 'hash-navigation',
  params: {
    hashNavigation: {
      enabled: false,
      replaceState: false,
      watchState: false,
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      hashNavigation: {
        initialized: false,
        init: HashNavigation.init.bind(swiper),
        destroy: HashNavigation.destroy.bind(swiper),
        setHash: HashNavigation.setHash.bind(swiper),
        onHashCange: HashNavigation.onHashCange.bind(swiper),
      },
    });
  },
  on: {
    init: function init() {
      var swiper = this;
      if (swiper.params.hashNavigation.enabled) {
        swiper.hashNavigation.init();
      }
    },
    destroy: function destroy() {
      var swiper = this;
      if (swiper.params.hashNavigation.enabled) {
        swiper.hashNavigation.destroy();
      }
    },
    transitionEnd: function transitionEnd() {
      var swiper = this;
      if (swiper.hashNavigation.initialized) {
        swiper.hashNavigation.setHash();
      }
    },
  },
};

var Autoplay = {
  run: function run() {
    var swiper = this;
    var $activeSlideEl = swiper.slides.eq(swiper.activeIndex);
    var delay = swiper.params.autoplay.delay;
    if ($activeSlideEl.attr('data-swiper-autoplay')) {
      delay = $activeSlideEl.attr('data-swiper-autoplay') || swiper.params.autoplay.delay;
    }
    swiper.autoplay.timeout = Utils.nextTick(function () {
      if (swiper.params.autoplay.reverseDirection) {
        if (swiper.params.loop) {
          swiper.loopFix();
          swiper.slidePrev(swiper.params.speed, true, true);
          swiper.emit('autoplay');
        } else if (!swiper.isBeginning) {
          swiper.slidePrev(swiper.params.speed, true, true);
          swiper.emit('autoplay');
        } else if (!swiper.params.autoplay.stopOnLastSlide) {
          swiper.slideTo(swiper.slides.length - 1, swiper.params.speed, true, true);
          swiper.emit('autoplay');
        } else {
          swiper.autoplay.stop();
        }
      } else if (swiper.params.loop) {
        swiper.loopFix();
        swiper.slideNext(swiper.params.speed, true, true);
        swiper.emit('autoplay');
      } else if (!swiper.isEnd) {
        swiper.slideNext(swiper.params.speed, true, true);
        swiper.emit('autoplay');
      } else if (!swiper.params.autoplay.stopOnLastSlide) {
        swiper.slideTo(0, swiper.params.speed, true, true);
        swiper.emit('autoplay');
      } else {
        swiper.autoplay.stop();
      }
    }, delay);
  },
  start: function start() {
    var swiper = this;
    if (typeof swiper.autoplay.timeout !== 'undefined') { return false; }
    if (swiper.autoplay.running) { return false; }
    swiper.autoplay.running = true;
    swiper.emit('autoplayStart');
    swiper.autoplay.run();
    return true;
  },
  stop: function stop() {
    var swiper = this;
    if (!swiper.autoplay.running) { return false; }
    if (typeof swiper.autoplay.timeout === 'undefined') { return false; }

    if (swiper.autoplay.timeout) {
      clearTimeout(swiper.autoplay.timeout);
      swiper.autoplay.timeout = undefined;
    }
    swiper.autoplay.running = false;
    swiper.emit('autoplayStop');
    return true;
  },
  pause: function pause(speed) {
    var swiper = this;
    if (!swiper.autoplay.running) { return; }
    if (swiper.autoplay.paused) { return; }
    if (swiper.autoplay.timeout) { clearTimeout(swiper.autoplay.timeout); }
    swiper.autoplay.paused = true;
    if (speed === 0 || !swiper.params.autoplay.waitForTransition) {
      swiper.autoplay.paused = false;
      swiper.autoplay.run();
    } else {
      swiper.$wrapperEl.transitionEnd(function () {
        if (!swiper || swiper.destroyed) { return; }
        swiper.autoplay.paused = false;
        if (!swiper.autoplay.running) {
          swiper.autoplay.stop();
        } else {
          swiper.autoplay.run();
        }
      });
    }
  },
};

var Autoplay$1 = {
  name: 'autoplay',
  params: {
    autoplay: {
      enabled: false,
      delay: 3000,
      waitForTransition: true,
      disableOnInteraction: true,
      stopOnLastSlide: false,
      reverseDirection: false,
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      autoplay: {
        running: false,
        paused: false,
        run: Autoplay.run.bind(swiper),
        start: Autoplay.start.bind(swiper),
        stop: Autoplay.stop.bind(swiper),
        pause: Autoplay.pause.bind(swiper),
      },
    });
  },
  on: {
    init: function init() {
      var swiper = this;
      if (swiper.params.autoplay.enabled) {
        swiper.autoplay.start();
      }
    },
    beforeTransitionStart: function beforeTransitionStart(speed, internal) {
      var swiper = this;
      if (swiper.autoplay.running) {
        if (internal || !swiper.params.autoplay.disableOnInteraction) {
          swiper.autoplay.pause(speed);
        } else {
          swiper.autoplay.stop();
        }
      }
    },
    sliderFirstMove: function sliderFirstMove() {
      var swiper = this;
      if (swiper.autoplay.running) {
        if (swiper.params.autoplay.disableOnInteraction) {
          swiper.autoplay.stop();
        } else {
          swiper.autoplay.pause();
        }
      }
    },
    destroy: function destroy() {
      var swiper = this;
      if (swiper.autoplay.running) {
        swiper.autoplay.stop();
      }
    },
  },
};

var Fade = {
  setTranslate: function setTranslate() {
    var swiper = this;
    var slides = swiper.slides;
    for (var i = 0; i < slides.length; i += 1) {
      var $slideEl = swiper.slides.eq(i);
      var offset = $slideEl[0].swiperSlideOffset;
      var tx = -offset;
      if (!swiper.params.virtualTranslate) { tx -= swiper.translate; }
      var ty = 0;
      if (!swiper.isHorizontal()) {
        ty = tx;
        tx = 0;
      }
      var slideOpacity = swiper.params.fadeEffect.crossFade ?
        Math.max(1 - Math.abs($slideEl[0].progress), 0) :
        1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
      $slideEl
        .css({
          opacity: slideOpacity,
        })
        .transform(("translate3d(" + tx + "px, " + ty + "px, 0px)"));
    }
  },
  setTransition: function setTransition(duration) {
    var swiper = this;
    var slides = swiper.slides;
    var $wrapperEl = swiper.$wrapperEl;
    slides.transition(duration);
    if (swiper.params.virtualTranslate && duration !== 0) {
      var eventTriggered = false;
      slides.transitionEnd(function () {
        if (eventTriggered) { return; }
        if (!swiper || swiper.destroyed) { return; }
        eventTriggered = true;
        swiper.animating = false;
        var triggerEvents = ['webkitTransitionEnd', 'transitionend'];
        for (var i = 0; i < triggerEvents.length; i += 1) {
          $wrapperEl.trigger(triggerEvents[i]);
        }
      });
    }
  },
};

var EffectFade = {
  name: 'effect-fade',
  params: {
    fadeEffect: {
      crossFade: false,
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      fadeEffect: {
        setTranslate: Fade.setTranslate.bind(swiper),
        setTransition: Fade.setTransition.bind(swiper),
      },
    });
  },
  on: {
    beforeInit: function beforeInit() {
      var swiper = this;
      if (swiper.params.effect !== 'fade') { return; }
      swiper.classNames.push(((swiper.params.containerModifierClass) + "fade"));
      var overwriteParams = {
        slidesPerView: 1,
        slidesPerColumn: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: true,
        spaceBetween: 0,
        virtualTranslate: true,
      };
      Utils.extend(swiper.params, overwriteParams);
      Utils.extend(swiper.originalParams, overwriteParams);
    },
    setTranslate: function setTranslate() {
      var swiper = this;
      if (swiper.params.effect !== 'fade') { return; }
      swiper.fadeEffect.setTranslate();
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      if (swiper.params.effect !== 'fade') { return; }
      swiper.fadeEffect.setTransition(duration);
    },
  },
};

var Cube = {
  setTranslate: function setTranslate() {
    var swiper = this;
    var $el = swiper.$el;
    var $wrapperEl = swiper.$wrapperEl;
    var slides = swiper.slides;
    var swiperWidth = swiper.width;
    var swiperHeight = swiper.height;
    var rtl = swiper.rtlTranslate;
    var swiperSize = swiper.size;
    var params = swiper.params.cubeEffect;
    var isHorizontal = swiper.isHorizontal();
    var isVirtual = swiper.virtual && swiper.params.virtual.enabled;
    var wrapperRotate = 0;
    var $cubeShadowEl;
    if (params.shadow) {
      if (isHorizontal) {
        $cubeShadowEl = $wrapperEl.find('.swiper-cube-shadow');
        if ($cubeShadowEl.length === 0) {
          $cubeShadowEl = $('<div class="swiper-cube-shadow"></div>');
          $wrapperEl.append($cubeShadowEl);
        }
        $cubeShadowEl.css({ height: (swiperWidth + "px") });
      } else {
        $cubeShadowEl = $el.find('.swiper-cube-shadow');
        if ($cubeShadowEl.length === 0) {
          $cubeShadowEl = $('<div class="swiper-cube-shadow"></div>');
          $el.append($cubeShadowEl);
        }
      }
    }
    for (var i = 0; i < slides.length; i += 1) {
      var $slideEl = slides.eq(i);
      var slideIndex = i;
      if (isVirtual) {
        slideIndex = parseInt($slideEl.attr('data-swiper-slide-index'), 10);
      }
      var slideAngle = slideIndex * 90;
      var round = Math.floor(slideAngle / 360);
      if (rtl) {
        slideAngle = -slideAngle;
        round = Math.floor(-slideAngle / 360);
      }
      var progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
      var tx = 0;
      var ty = 0;
      var tz = 0;
      if (slideIndex % 4 === 0) {
        tx = -round * 4 * swiperSize;
        tz = 0;
      } else if ((slideIndex - 1) % 4 === 0) {
        tx = 0;
        tz = -round * 4 * swiperSize;
      } else if ((slideIndex - 2) % 4 === 0) {
        tx = swiperSize + (round * 4 * swiperSize);
        tz = swiperSize;
      } else if ((slideIndex - 3) % 4 === 0) {
        tx = -swiperSize;
        tz = (3 * swiperSize) + (swiperSize * 4 * round);
      }
      if (rtl) {
        tx = -tx;
      }

      if (!isHorizontal) {
        ty = tx;
        tx = 0;
      }

      var transform = "rotateX(" + (isHorizontal ? 0 : -slideAngle) + "deg) rotateY(" + (isHorizontal ? slideAngle : 0) + "deg) translate3d(" + tx + "px, " + ty + "px, " + tz + "px)";
      if (progress <= 1 && progress > -1) {
        wrapperRotate = (slideIndex * 90) + (progress * 90);
        if (rtl) { wrapperRotate = (-slideIndex * 90) - (progress * 90); }
      }
      $slideEl.transform(transform);
      if (params.slideShadows) {
        // Set shadows
        var shadowBefore = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
        var shadowAfter = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
        if (shadowBefore.length === 0) {
          shadowBefore = $(("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'left' : 'top') + "\"></div>"));
          $slideEl.append(shadowBefore);
        }
        if (shadowAfter.length === 0) {
          shadowAfter = $(("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'right' : 'bottom') + "\"></div>"));
          $slideEl.append(shadowAfter);
        }
        if (shadowBefore.length) { shadowBefore[0].style.opacity = Math.max(-progress, 0); }
        if (shadowAfter.length) { shadowAfter[0].style.opacity = Math.max(progress, 0); }
      }
    }
    $wrapperEl.css({
      '-webkit-transform-origin': ("50% 50% -" + (swiperSize / 2) + "px"),
      '-moz-transform-origin': ("50% 50% -" + (swiperSize / 2) + "px"),
      '-ms-transform-origin': ("50% 50% -" + (swiperSize / 2) + "px"),
      'transform-origin': ("50% 50% -" + (swiperSize / 2) + "px"),
    });

    if (params.shadow) {
      if (isHorizontal) {
        $cubeShadowEl.transform(("translate3d(0px, " + ((swiperWidth / 2) + params.shadowOffset) + "px, " + (-swiperWidth / 2) + "px) rotateX(90deg) rotateZ(0deg) scale(" + (params.shadowScale) + ")"));
      } else {
        var shadowAngle = Math.abs(wrapperRotate) - (Math.floor(Math.abs(wrapperRotate) / 90) * 90);
        var multiplier = 1.5 - (
          (Math.sin((shadowAngle * 2 * Math.PI) / 360) / 2) +
          (Math.cos((shadowAngle * 2 * Math.PI) / 360) / 2)
        );
        var scale1 = params.shadowScale;
        var scale2 = params.shadowScale / multiplier;
        var offset = params.shadowOffset;
        $cubeShadowEl.transform(("scale3d(" + scale1 + ", 1, " + scale2 + ") translate3d(0px, " + ((swiperHeight / 2) + offset) + "px, " + (-swiperHeight / 2 / scale2) + "px) rotateX(-90deg)"));
      }
    }
    var zFactor = (Browser.isSafari || Browser.isUiWebView) ? (-swiperSize / 2) : 0;
    $wrapperEl
      .transform(("translate3d(0px,0," + zFactor + "px) rotateX(" + (swiper.isHorizontal() ? 0 : wrapperRotate) + "deg) rotateY(" + (swiper.isHorizontal() ? -wrapperRotate : 0) + "deg)"));
  },
  setTransition: function setTransition(duration) {
    var swiper = this;
    var $el = swiper.$el;
    var slides = swiper.slides;
    slides
      .transition(duration)
      .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
      .transition(duration);
    if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
      $el.find('.swiper-cube-shadow').transition(duration);
    }
  },
};

var EffectCube = {
  name: 'effect-cube',
  params: {
    cubeEffect: {
      slideShadows: true,
      shadow: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      cubeEffect: {
        setTranslate: Cube.setTranslate.bind(swiper),
        setTransition: Cube.setTransition.bind(swiper),
      },
    });
  },
  on: {
    beforeInit: function beforeInit() {
      var swiper = this;
      if (swiper.params.effect !== 'cube') { return; }
      swiper.classNames.push(((swiper.params.containerModifierClass) + "cube"));
      swiper.classNames.push(((swiper.params.containerModifierClass) + "3d"));
      var overwriteParams = {
        slidesPerView: 1,
        slidesPerColumn: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: true,
        resistanceRatio: 0,
        spaceBetween: 0,
        centeredSlides: false,
        virtualTranslate: true,
      };
      Utils.extend(swiper.params, overwriteParams);
      Utils.extend(swiper.originalParams, overwriteParams);
    },
    setTranslate: function setTranslate() {
      var swiper = this;
      if (swiper.params.effect !== 'cube') { return; }
      swiper.cubeEffect.setTranslate();
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      if (swiper.params.effect !== 'cube') { return; }
      swiper.cubeEffect.setTransition(duration);
    },
  },
};

var Flip = {
  setTranslate: function setTranslate() {
    var swiper = this;
    var slides = swiper.slides;
    var rtl = swiper.rtlTranslate;
    for (var i = 0; i < slides.length; i += 1) {
      var $slideEl = slides.eq(i);
      var progress = $slideEl[0].progress;
      if (swiper.params.flipEffect.limitRotation) {
        progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
      }
      var offset = $slideEl[0].swiperSlideOffset;
      var rotate = -180 * progress;
      var rotateY = rotate;
      var rotateX = 0;
      var tx = -offset;
      var ty = 0;
      if (!swiper.isHorizontal()) {
        ty = tx;
        tx = 0;
        rotateX = -rotateY;
        rotateY = 0;
      } else if (rtl) {
        rotateY = -rotateY;
      }

      $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;

      if (swiper.params.flipEffect.slideShadows) {
        // Set shadows
        var shadowBefore = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
        var shadowAfter = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
        if (shadowBefore.length === 0) {
          shadowBefore = $(("<div class=\"swiper-slide-shadow-" + (swiper.isHorizontal() ? 'left' : 'top') + "\"></div>"));
          $slideEl.append(shadowBefore);
        }
        if (shadowAfter.length === 0) {
          shadowAfter = $(("<div class=\"swiper-slide-shadow-" + (swiper.isHorizontal() ? 'right' : 'bottom') + "\"></div>"));
          $slideEl.append(shadowAfter);
        }
        if (shadowBefore.length) { shadowBefore[0].style.opacity = Math.max(-progress, 0); }
        if (shadowAfter.length) { shadowAfter[0].style.opacity = Math.max(progress, 0); }
      }
      $slideEl
        .transform(("translate3d(" + tx + "px, " + ty + "px, 0px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)"));
    }
  },
  setTransition: function setTransition(duration) {
    var swiper = this;
    var slides = swiper.slides;
    var activeIndex = swiper.activeIndex;
    var $wrapperEl = swiper.$wrapperEl;
    slides
      .transition(duration)
      .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
      .transition(duration);
    if (swiper.params.virtualTranslate && duration !== 0) {
      var eventTriggered = false;
      // eslint-disable-next-line
      slides.eq(activeIndex).transitionEnd(function onTransitionEnd() {
        if (eventTriggered) { return; }
        if (!swiper || swiper.destroyed) { return; }
        // if (!$(this).hasClass(swiper.params.slideActiveClass)) return;
        eventTriggered = true;
        swiper.animating = false;
        var triggerEvents = ['webkitTransitionEnd', 'transitionend'];
        for (var i = 0; i < triggerEvents.length; i += 1) {
          $wrapperEl.trigger(triggerEvents[i]);
        }
      });
    }
  },
};

var EffectFlip = {
  name: 'effect-flip',
  params: {
    flipEffect: {
      slideShadows: true,
      limitRotation: true,
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      flipEffect: {
        setTranslate: Flip.setTranslate.bind(swiper),
        setTransition: Flip.setTransition.bind(swiper),
      },
    });
  },
  on: {
    beforeInit: function beforeInit() {
      var swiper = this;
      if (swiper.params.effect !== 'flip') { return; }
      swiper.classNames.push(((swiper.params.containerModifierClass) + "flip"));
      swiper.classNames.push(((swiper.params.containerModifierClass) + "3d"));
      var overwriteParams = {
        slidesPerView: 1,
        slidesPerColumn: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: true,
        spaceBetween: 0,
        virtualTranslate: true,
      };
      Utils.extend(swiper.params, overwriteParams);
      Utils.extend(swiper.originalParams, overwriteParams);
    },
    setTranslate: function setTranslate() {
      var swiper = this;
      if (swiper.params.effect !== 'flip') { return; }
      swiper.flipEffect.setTranslate();
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      if (swiper.params.effect !== 'flip') { return; }
      swiper.flipEffect.setTransition(duration);
    },
  },
};

var Coverflow = {
  setTranslate: function setTranslate() {
    var swiper = this;
    var swiperWidth = swiper.width;
    var swiperHeight = swiper.height;
    var slides = swiper.slides;
    var $wrapperEl = swiper.$wrapperEl;
    var slidesSizesGrid = swiper.slidesSizesGrid;
    var params = swiper.params.coverflowEffect;
    var isHorizontal = swiper.isHorizontal();
    var transform = swiper.translate;
    var center = isHorizontal ? -transform + (swiperWidth / 2) : -transform + (swiperHeight / 2);
    var rotate = isHorizontal ? params.rotate : -params.rotate;
    var translate = params.depth;
    // Each slide offset from center
    for (var i = 0, length = slides.length; i < length; i += 1) {
      var $slideEl = slides.eq(i);
      var slideSize = slidesSizesGrid[i];
      var slideOffset = $slideEl[0].swiperSlideOffset;
      var offsetMultiplier = ((center - slideOffset - (slideSize / 2)) / slideSize) * params.modifier;

      var rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
      var rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
      // var rotateZ = 0
      var translateZ = -translate * Math.abs(offsetMultiplier);

      var translateY = isHorizontal ? 0 : params.stretch * (offsetMultiplier);
      var translateX = isHorizontal ? params.stretch * (offsetMultiplier) : 0;

      // Fix for ultra small values
      if (Math.abs(translateX) < 0.001) { translateX = 0; }
      if (Math.abs(translateY) < 0.001) { translateY = 0; }
      if (Math.abs(translateZ) < 0.001) { translateZ = 0; }
      if (Math.abs(rotateY) < 0.001) { rotateY = 0; }
      if (Math.abs(rotateX) < 0.001) { rotateX = 0; }

      var slideTransform = "translate3d(" + translateX + "px," + translateY + "px," + translateZ + "px)  rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";

      $slideEl.transform(slideTransform);
      $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
      if (params.slideShadows) {
        // Set shadows
        var $shadowBeforeEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
        var $shadowAfterEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
        if ($shadowBeforeEl.length === 0) {
          $shadowBeforeEl = $(("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'left' : 'top') + "\"></div>"));
          $slideEl.append($shadowBeforeEl);
        }
        if ($shadowAfterEl.length === 0) {
          $shadowAfterEl = $(("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'right' : 'bottom') + "\"></div>"));
          $slideEl.append($shadowAfterEl);
        }
        if ($shadowBeforeEl.length) { $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0; }
        if ($shadowAfterEl.length) { $shadowAfterEl[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0; }
      }
    }

    // Set correct perspective for IE10
    if (Support.pointerEvents || Support.prefixedPointerEvents) {
      var ws = $wrapperEl[0].style;
      ws.perspectiveOrigin = center + "px 50%";
    }
  },
  setTransition: function setTransition(duration) {
    var swiper = this;
    swiper.slides
      .transition(duration)
      .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
      .transition(duration);
  },
};

var EffectCoverflow = {
  name: 'effect-coverflow',
  params: {
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      coverflowEffect: {
        setTranslate: Coverflow.setTranslate.bind(swiper),
        setTransition: Coverflow.setTransition.bind(swiper),
      },
    });
  },
  on: {
    beforeInit: function beforeInit() {
      var swiper = this;
      if (swiper.params.effect !== 'coverflow') { return; }

      swiper.classNames.push(((swiper.params.containerModifierClass) + "coverflow"));
      swiper.classNames.push(((swiper.params.containerModifierClass) + "3d"));

      swiper.params.watchSlidesProgress = true;
      swiper.originalParams.watchSlidesProgress = true;
    },
    setTranslate: function setTranslate() {
      var swiper = this;
      if (swiper.params.effect !== 'coverflow') { return; }
      swiper.coverflowEffect.setTranslate();
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      if (swiper.params.effect !== 'coverflow') { return; }
      swiper.coverflowEffect.setTransition(duration);
    },
  },
};

// Swiper Class

var components = [
  Device$1,
  Support$1,
  Browser$1,
  Resize,
  Observer$1,
  Virtual$1,
  Keyboard$1,
  Mousewheel$1,
  Navigation$1,
  Pagination$1,
  Scrollbar$1,
  Parallax$1,
  Zoom$1,
  Lazy$1,
  Controller$1,
  A11y,
  History$1,
  HashNavigation$1,
  Autoplay$1,
  EffectFade,
  EffectCube,
  EffectFlip,
  EffectCoverflow
];

if (typeof Swiper.use === 'undefined') {
  Swiper.use = Swiper.Class.use;
  Swiper.installModule = Swiper.Class.installModule;
}

Swiper.use(components);

return Swiper;

})));

;!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("GM",[],e):"object"==typeof exports?exports.GM=e():t.GM=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return t[r].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";var r=n(2);n(56),n(67),n(62),n(75),n(49),n(64),t.exports=r},function(t,e,n){var r=n(86);t.exports=r},function(t,e,n){var r={Chart:n(91),Util:n(1),Geom:n(17),Shape:n(34),G:n(6),Global:n(3),Vector2:n(7),Theme:n(38),Scale:n(21),Coord:n(27),Plot:n(37),GuideAssist:n(36),Frame:n(10),AnimateAssist:n(24)};t.exports=r},function(t,e,n){"use strict";var r=n(38),i=n(1),a={sizes:{min:1,max:10},scales:{nice:!0},widthRatio:{column:.5,rose:.999999,multiplePie:.75},animateReduceMultiple:1,lineDash:[5,15]};a.setTheme=function(t){i.simpleMix(this,t)},a.setTheme(r),t.exports=a},function(t,e,n){var r=n(44);t.exports=r},function(t,e,n){"use strict";var r=n(1),i=n(4),a=n(23),s=n(97),o="_origin",c=function(t){c.superclass.constructor.call(this,t)};c.ATTRS={id:"",type:null,container:null,attrs:null,shapeObj:null,createTime:null,generatePoints:!1,styleCfg:{},shapeDatas:[]},r.extend(c,i),r.mixin(c,[s]),r.augment(c,{_mapping:function(t){var e=this,n=e.get("attrs"),i=[],a=e.get("generatePoints");return r.each(t,function(t){var s={};s[o]=t[o],a&&(s.points=t.points,s.nextPoints=t.nextPoints),r.each(n,function(n){var i=n.names,a=e._getAttrValues(n,t);r.each(a,function(t,e){var n=i[e];s[n]=r.isArray(t)&&1===t.length?t[0]:t})}),i.push(s)}),i},_processShapePoints:function(t){var e=this,n=e.get("shapeObj");r.each(t,function(t){for(var r=0;r<t.length;r++){var i=t[r],a=e.getAttrValue("shape",i),s=e.getShapePointInfo(i),o=n.getShapePoints(a,s);i.points=o}})},_getAttrValues:function(t,e){var n=t.scales,i=[];r.each(n,function(t){var n=t.dim;"identity"===t.type?i.push(t.value):i.push(e[n])});var a=t.mappingValues.apply(t,i);return a},draw:function(t){var e=this,n=[],i=e.get("shapeType")||e.get("type"),s=a.getShape(i);return s._coord=e.getCoord(),e.set("shapeObj",s),e.processData(t),e.get("generatePoints")&&e._processShapePoints(t),r.each(t,function(t,r){e.beforeMapping(t),e.sortData(t);var i=e._mapping(t);i.length&&e.drawData(i,r),n.push(i)}),n},sortData:function(){},processData:function(){},beforeMapping:function(){},isInCircle:function(){return this.getCoord().isPolar},getShapePointInfo:function(t){var e,n,r=this.getXScale(),i=this.getYScale();return e=r?this._normalizeValues(t[r.dim],r):t.x?t.x:.1,n=i?this._normalizeValues(t[i.dim],i):t.y?t.y:.1,{x:e,y:n,y0:i?i.scale(this.getYMinValue()):void 0,size:this.getSize(t)}},_normalizeValues:function(t,e){var n=[];return r.isArray(t)?r.each(t,function(t){n.push(e.scale(t))}):n=e.scale(t),n},getDefalutSize:function(){return.1},_getSize:function(t){var e,n=this.getCoord();return e=this.isInCircle()&&!n.isTransposed?(n.get("endAngle")-n.get("startAngle"))*n.get("radius"):this.getDimWidth("x"),t/e},getDimWidth:function(t){var e=this,n=e.getCoord(),r=n.convertPoint({x:0,y:0}),i=n.convertPoint({x:"x"===t?1:0,y:"x"===t?0:1}),a=0;return r&&i&&(a=Math.sqrt(Math.pow(i.x-r.x,2)+Math.pow(i.y-r.y,2))),a},getSize:function(t){var e=this.getAttrValue("size",t);return e=r.isNull(e)?this.getDefalutSize():this._getSize(e)},drawData:function(t){var e,n,i,a=this,s=a.get("container"),o=a.get("shapeObj"),c=a.getYDim(),u=a.get("shapeDatas");r.each(t,function(t,l){u.push(t),c&&r.isNull(t._origin[c])||(t.index=l,e=a.getDrawCfg(t),n=a.getDrawShape(t.shape),i=o.drawShape(n,e,s),a.afterDraw(i,t))})},afterDraw:function(){},getDrawShape:function(t){return r.isArray(t)?t[0]:t},getDrawCfg:function(t){var e=this.get("styleCfg"),n=this.isInCircle(),r={points:t.points,nextPoints:t.nextPoints,color:t.color,isInCircle:n,style:e,size:t.size,shape:t.shape,opacity:t.opacity,x:t.x,y:t.y,origin:t,geomType:this.get("type")};return n&&(r.center=this.getCoord().get("center")),r},getYMinValue:function(){var t,e=this.getYScale(),n=e.min;return t=n>=0?n:0},getAttrValue:function(t,e){var n=this.getAttr(t),r=null;return n&&(r=this._getAttrValues(n,e)[0]),r},getAttr:function(t){var e=this.get("attrs"),n=null;return r.each(e,function(e){e.type===t&&(n=e)}),n},getCoord:function(){return this.getAttr("position").coord},getXDim:function(){var t=this.getXScale();return t.dim},getYDim:function(){var t=this.getYScale();return t?t.dim:null},getXScale:function(){return this.getAttr("position").scales[0]},getYScale:function(){return this.getAttr("position").scales[1]}}),t.exports=c},function(t,e,n){"use strict";function r(t,e){var n=t.getContext("2d");if(n.beginPath(),n.save(),n.globalAlpha=e.opacity||1,e.lineDash&&n.setLineDash&&n.setLineDash(e.lineDash),e.fill&&(e.fillStyle=e.fill),delete e.fill,e.stroke&&(e.strokeStyle=e.stroke),delete e.stroke,e.fontStyle||e.fontVariant||e.fontWeight||e.fontSize||e.fontFamily){var r={};a.simpleMix(r,c.defaultFont,e),e.font=[r.fontStyle,r.fontVariant,r.fontWeight,r.fontSize+"px",r.fontFamily].join(" ")}return a.simpleMix(n,e),n}function i(t,e){var n=t.globalAlpha;e.strokeStyle&&(e.strokeOpacity&&(t.globalAlpha=e.strokeOpacity),t.stroke(),t.globalAlpha=n),e.fillStyle&&(t.globalAlpha=e.fillOpacity||t.globalAlpha,t.fill(),(e.fillOpacity||e.strokeOpacity)&&(t.strokeStyle=e.strokeStyle?e.strokeStyle:e.fillStyle,t.globalAlpha=e.strokeOpacity||1,t.stroke())),t.restore()}var a=n(1),s=n(7),o=n(108),c=n(3);t.exports={drawLine:function(t,e,n,a){var s=r(n,a);s.moveTo(t.x,t.y),s.lineTo(e.x,e.y),i(s,a)},drawText:function(t,e,n,i){var a;i.rotate&&(a=i.rotate*Math.PI/180,delete i.rotate);var s=r(n,i);a?(s.translate(e.x,e.y),s.rotate(a),s.fillText(""+t,0,0)):s.fillText(""+t,e.x,e.y),s.restore()},drawCircle:function(t,e,n,a){var s=r(n,a);s.arc(t.x,t.y,e,0,2*Math.PI),s.closePath(),i(s,a)},drawArc:function(t,e,n,a,s,o){var c=r(s,o);c.arc(t.x,t.y,e,n,a),o.z!==!1&&c.closePath(),i(c,o)},radiusRect:function(t,e,n,r,i,a){a.moveTo(t+i,e),a.arcTo(t+n,e,t+n,e+r,i),a.arcTo(t+n,e+r,t,e+r,i),a.arcTo(t,e+r,t,e,i),a.arcTo(t,e,t+n,e,i)},drawRect:function(t,e,n){var a=r(e,n),s=t[0].x,o=t[0].y,c=t[2].x,u=t[1].y;t.forEach(function(t){t.x>c&&(c=t.x),t.x<s&&(s=t.x),t.y>u&&(u=t.y),t.y<o&&(o=t.y)});var l=s,f=o,h=c-s,g=u-o;if(n.radius){var p=Math.min(n.radius,h/2,g/2);this.radiusRect(l,f,h,g,p,a)}else a.rect(l,f,h,g);n.z!==!1&&a.closePath(),i(a,n)},drawShape:function(t,e,n){var a=r(t,e);n(a),e.z&&a.closePath(),i(a,e)},drawLines:function(t,e,n){var a=r(e,n);this.lines(t,a),n.z&&a.closePath(),i(a,n)},lines:function(t,e,n){if(t.length){n!==!1&&e.moveTo(t[0].x,t[0].y);for(var r=1,i=t.length;r<i;r++){var a=t[r];e.lineTo(a.x,a.y)}}},drawFan:function(t,e,n,a){var o=r(n,a),c=new s(1,0),u=new s(t[0].x-e.x,t[0].y-e.y),l=u.length(),f=new s(t[1].x-e.x,t[1].y-e.y),h=f.length(),g=new s(t[2].x-e.x,t[2].y-e.y),p=c.angleTo(f),v=c.angleTo(g);p>v&&p-v<1e-4?(o.moveTo(e.x+h,e.y),o.arc(e.x,e.y,h,0,Math.PI),o.arc(e.x,e.y,h,Math.PI,2*Math.PI),o.moveTo(e.x+l,e.y),o.arc(e.x,e.y,l,2*Math.PI,Math.PI,!0),o.arc(e.x,e.y,l,Math.PI,0,!0),o.closePath()):(o.moveTo(t[0].x,t[0].y),o.lineTo(t[1].x,t[1].y),o.arc(e.x,e.y,h,p,v),o.lineTo(t[3].x,t[3].y),o.arc(e.x,e.y,l,v,p,!0),o.closePath()),i(o,a)},drawSmooth:function(t,e,n){if(0!==t.length){var r=this.before(e,n);this.smooth(t,r),this.after(r,n)}},before:function(t,e){return r(t,e)},after:function(t,e){return i(t,e)},smooth:function(t,e,n){var r=[[0,0],[1,1]],i=o.smooth(t,!1,r);n!==!1&&e.moveTo(t[0].x,t[0].y);for(var a=0,s=i.length;a<s;a++){var c=i[a];e.bezierCurveTo(c[1],c[2],c[3],c[4],c[5],c[6])}}}},function(t,e,n){"use strict";function r(t,e){this.x=t,this.y=e}var i=n(1);r.add=function(t,e){return new r(t.x+e.x,t.y+e.y)},r.sub=function(t,e){return new r(t.x-e.x,t.y-e.y)},i.augment(r,{length:function(){return Math.sqrt(this.x*this.x+this.y*this.y)},normalize:function(){var t=1/this.length();return new r(this.x*t,this.y*t)},add:function(t){return r.add(this,t)},sub:function(t){return r.sub(this,t)},multiply:function(t){return new r(this.x*t,this.y*t)},dot:function(t){return this.x*t.x+this.y*t.y},angle:function(t){var e=this.dot(t)/(this.length()*t.length());return Math.acos(e)},min:function(t){return this.x>t.x&&(this.x=t.x),this.y>t.y&&(this.y=t.y),this},max:function(t){return this.x<t.x&&(this.x=t.x),this.y<t.y&&(this.y=t.y),this},angleTo:function(t){var e=this.angle(t),n=this.direction(t);return n>=0?e:2*Math.PI-e},zero:function(){return 0===this.x&&0===this.y},direction:function(t){return this.x*t.y-t.x*this.y},distanceTo:function(t){return r.sub(this,t).length()},clone:function(){return new r(this.x,this.y)},getPoint:function(){return{x:this.x,y:this.y}}}),t.exports=r},function(t,e,n){"use strict";var r=n(1),i=["min","max"],a=function(t){r.mix(this,t)};r.augment(a,{xScale:null,yScale:null,cfg:{},parsePoint:function(t,e){var n,a=this,s=a.xScale,o=a.yScale,c=e[0],u=e[1],l=u;if(c=s?r.indexOf(i,c)!==-1?s.scale(s[c]):s.scale(c):1,o){var f=o.scale(l),h=o.scale(o[l]);n=r.indexOf(i,u)!==-1?h:f}else n=1;return t.convertPoint({x:c,y:n})},paint:function(){}}),t.exports=a},function(t,e,n){"use strict";var r=n(1),i=function(t){r.mix(this,t)};i.prototype={type:"base",names:null,scales:[],min:0,max:10,method:function(t){return t*(this.max-this.min)+this.min},callback:function(){var t,e,n,i=this,a=i.arr,s=i.scales,o=r.toArray(arguments),c=[];return r.each(s,function(s,u){t=o[u],n=s.scale(t),e=s.translate(t),"identity"===s.type?c.push(s.value):r.isArray(a)?c.push(i._getArrValue(a,s,n,e)):i.method?c.push(i.method(n)):c.push(null)}),c},getNames:function(){var t=this.scales,e=this.names,n=[];return r.each(t,function(t,r){n.push(e[r])}),n},getDims:function(){var t=this.scales,e=[];return r.each(t,function(t){e.push(t.dim)}),e},getScale:function(t){var e=this.scales,n=this.names,r=n.indexOf(t);return e[r]},mappingValues:function(){var t=this.scales,e=r.toArray(arguments),n=this.callback,i=e;if(n){for(var a=0;a<e.length;a++)e[a]=this.parseParam(e[a],t[a]);i=n.apply(this,e)}return this.names&&1===this.names.length&&(i=[i]),i},parseParam:function(t,e){var n=t;return e.isLinear||(n=e.scale(t),n=e.invert(n)),n},_getArrValue:function(t,e,n,r){var i=0;return e.isCategory?i=r:e.isLinear&&(i=parseInt(n*(t.length-1),10)),t[i%t.length]}},t.exports=i},function(t,e,n){var r=n(15);n(47),t.exports=r},function(t,e,n){"use strict";var r=n(1);n(18);var i=function(t){r.mix(this,t)};r.augment(i,{bgimageData:null,imageData:null,ratio:1,startPoint:{x:0,y:0},center:{x:200,y:200},radius:160,reduceMultiple:1,duration:1e3,easing:"easeInOut",success:null,paint:function(t){var e=this,n=document.createElement("canvas"),r=t.width,i=t.height,a=r/parseInt(t.style.width,10);e.ratio=a,n.style.width=r+"px",n.style.height=i+"px",n.width=r,n.height=i,e.draw(t,n)},draw:function(){},animateStep:function(t){var e=this,n=r.animateStep(function(n,r){r%e.reduceMultiple!==0&&1!==n||t(n)},e.duration,e.easing,e.success);e.animateId=n},clear:function(t){var e=t.getContext("2d");e.clearRect(0,0,t.width,t.height)},stop:function(){var t=this,e=t.animateId;r.stopStep(e)}}),t.exports=i},function(t,e,n){"use strict";var r=n(1),i=function(t){r.mix(this,t),this.init()};r.augment(i,{formatter:null,range:[0,1],ticks:null,init:function(){},getTicks:function(){var t=this,e=t.ticks,n=[];return r.each(e,function(e){var i;i=r.isObject(e)?e:{text:t.getText(e),value:t.scale(e)},n.push(i)}),n},getText:function(t){var e=this.formatter;return t=e?e(t):t,!r.isNull(t)&&t.toString||(t=""),t.toString()},rangeMin:function(){return this.range[0]},rangeMax:function(){var t=this.range;return t[t.length-1]},invert:function(){},translate:function(t){return t},scale:function(){},clone:function(){var t=this,e=t.constructor,n={};return r.each(t,function(e,r){n[r]=t[r]}),new e(n)},change:function(t){return this.ticks=null,r.mix(this,t),this.init(),this}}),t.exports=i},function(t,e,n){"use strict";function r(t){r.superclass.constructor.call(this,t),this._init()}var i=n(1),a=n(4),s=n(94),o=["color","size","shape"],c=n(10),u="_origin";r.ATTRS={coreType:null,frames:null,attrs:null,container:null,styleCfg:null},i.extend(r,a),i.augment(r,{_init:function(){var t=this.get("coreType"),e=new s[t]({attrs:this.get("attrs"),container:this.get("container"),styleCfg:this.get("styleCfg")});this.set("core",e),this.processCore()},_getGroupScales:function(){var t=this.get("core"),e=[];return i.each(o,function(n){var r=t.getAttr(n);if(r){var a=r.scales;i.each(a,function(t){t&&t.isCategory&&i.indexOf(e,t)===-1&&e.push(t)})}}),e},_groupFrames:function(t){var e=this,n=[],r=e._getGroupScales();return i.each(r,function(t){n.push(t.dim)}),c.group(t,n)},processCore:function(){},initData:function(t){var e=this._groupFrames(t);e=this._saveOriginData(e),e=this.processFrames(e),this.set("frames",e)},processFrames:function(t){return t},_saveOriginData:function(t){return i.each(t,function(t){var e=t.toJSON();t.addCol(u,e)}),t},draw:function(t){var e=this.get("frames"),n=this.get("core");t&&n.set("container",t);for(var r=[],i=0;i<e.length;i++){var a=e[i];r.push(a.toJSON())}n.draw(r)},getXScale:function(){var t=this.get("core");return t.getXScale()},getYScale:function(){var t=this.get("core");return t.getYScale()},_isStack:function(t){var e=!1;return"intervalStack"!==t&&"areaStack"!==t||(e=!0),e},_getSnap:function(t,e){var n,r=0,i=this.get("attrs")[0].dims[1];if(this._isStack(this.get("type"))&&t.dim===i){var a=this.get("frames");for(n=[],a.forEach(function(e){e.data.forEach(function(e){n.push(e[t.dim])})});r<n.length&&!(n[0][0]>e);r++){if(n[n.length-1][1]<=e){r=n.length-1;break}if(n[r][0]<=e&&n[r][1]>e)break}}else for(n=t.values,n.sort(function(t,e){return t-e});r<n.length&&!((n[0]+n[1])/2>e)&&!((n[r-1]+n[r])/2<=e&&(n[r+1]+n[r])/2>e);r++)if((n[n.length-2]+n[n.length-1])/2<=e){r=n.length-1;break}var s=n[r];return s},getSnapRecords:function(t,e){var n=this,r=n.get("coord"),a=n.getXScale(),s=n.getYScale(),o=a.dim,c=s.dim,l=r.invertPoint(t),f=n.get("frames"),h=[];if(e===c){var g=s.invert(l.y);s.isCategory||(g=n._getSnap(s,g)),i.each(f,function(t){t.each(function(t){(i.isArray(g)?i.equalsArray(t[c],g):t[c]===g)&&h.push(t)})})}else{var p=a.invert(l.x);a.isCategory||(p=n._getSnap(a,p)),i.each(f,function(t){t.each(function(t){var e=i.isNull(t[u])?t[o]:t[u][o];n._isEqual(e,p,a)&&h.push(t)})})}return h},_isEqual:function(t,e,n){return"timeCat"===n.type?n._toTimeStamp(t)===e:e===t},getAllShapeData:function(){var t=this.get("core");return t.get("shapeDatas")}}),t.exports=r},function(t,e,n){"use strict";var r=n(1),i=n(23),a=n(3);r.simpleMix(i.ShapeBase,{parsePoint:function(t){1===t.x&&(t.x=.9999999),1===t.y&&(t.y=.9999999);var e=this._coord;return e.convertPoint(t)},parsePoints:function(t){if(!t)return!1;var e=this,n=[];return t.forEach(function(t){n.push(e.parsePoint(t))}),n}}),r.simpleMix(i.GeomShape,{drawShape:function(t,e,n){var r=this.getShape(t);return e.color||(e.color=a.colors[0]),r.drawShape(e,n)}}),t.exports=i},function(t,e,n){var r=n(1),i=function(t,e){this.data=t,r.mix(this,e),this.initFrame()};i.prototype={isFrame:!0,initFrame:function(){var t=this,e=t.data,n=t.colNames(),i=t.arr;if(r.isArray(e[0])&&(i=t.arr=e),!i){i=[];for(var a=0;a<n.length;a++){for(var s=[],o=n[a],c=0;c<e.length;c++)s.push(e[c][o]);i.push(s)}t.arr=i}},contains:function(t){var e=this.colNames();return r.indexOf(e,t)!==-1},colNames:function(){var t=this,e=t.names;if(!e){var n=this.data,i=n[0];e=[],i&&r.each(i,function(t,n){e.push(n)}),t.names=e}return e},rowCount:function(){var t=this,e=t.arr;return e&&e.length?e[0].length:0},colCount:function(){var t=this,e=t.colNames();return e?e.length:0},colIndex:function(t){return r.indexOf(this.names,t)},colArray:function(t){var e=t;return r.isString(t)&&(e=this.colIndex(t)),this.arr[e]},colReplace:function(t,e){var n=this.arr,i=this.colNames();if(r.isString(t)){var a=t;t=r.indexOf(i,a)}return n[t]=e,this},each:function(t){for(var e=this,n=e.rowCount(),r=0;r<n;r++){var i=e._getObject(r);t(i,r)}return e},rowObject:function(t){return this._getObject(t)},_getObject:function(t,e){var n=this,r=n.arr,i={};e=e||n.colNames();for(var a=0;a<e.length;a++)i[e[a]]=r[a][t];return i},addCol:function(t,e){var n=this;if(r.isFunction(e)){var i=e;e=[],n.each(function(t,n){var r=i(t,n);e.push(r)})}n.names.push(t),n.arr.push(e)},toArray:function(){return this.arr},toJSON:function(){for(var t=this,e=t.rowCount(),n=[],r=0;r<e;r++)n.push(t._getObject(r));return n}},t.exports=i},function(t,e,n){var r={};r.number=n(60),r.time=n(61),r.category=n(59),t.exports=r},function(t,e,n){"use strict";var r=n(13);r.Line=n(102),r.Point=n(103),r.Interval=n(31),r.IntervalStack=n(101),r.StackMixin=n(32),r.WidthMixin=n(33),t.exports=r},function(t,e,n){function r(){return++a}var i=n(1),a=0,s={},o=Math.pow,c=Math,u=Math.abs,l={linear:function(t){return t},easeIn:function(t){return o(t,1.7)},easeOut:function(t){return o(t,.48)},easeInOut:function(t){var e=.48-t/1.04,n=c.sqrt(.1734+e*e),r=n-e,i=o(u(r),1/3)*(r<0?-1:1),a=-n-e,s=o(u(a),1/3)*(a<0?-1:1),l=i+s+.5;return 3*(1-l)*l*l+l*l*l},backIn:function(t){var e=1.70158;return t*t*((e+1)*t-e)},backOut:function(t){t-=1;var e=1.70158;return t*t*((e+1)*t+e)+1},elastic:function(t){return t===!!t?t:o(2,-10*t)*c.sin((t-.075)*(2*Math.PI)/.3)+1},bounce:function(t){var e,n=7.5625,r=2.75;return t<1/r?e=n*t*t:t<2/r?(t-=1.5/r,e=n*t*t+.75):t<2.5/r?(t-=2.25/r,e=n*t*t+.9375):(t-=2.625/r,e=n*t*t+.984375),e}};i.mix(i,{animateStep:function(t,e,n,a){function o(t,e,r,a){var f=(new Date).getTime(),h=f-c;if(h>=r)return e(1,t),void(a&&a());var g=i.isFunction(n)?n:l[n||"linear"],p=g(h/r);e(p,t),s[u]=i.requestAnimationFrame(function(){o(t+1,e,r,a)})}var c=(new Date).getTime(),u=r();return o(0,t,e,a),u},stopStep:function(t){s[t]&&(i.cancelAnimationFrame(s[t]),delete s[t])}}),t.exports=i},function(t,e,n){"use strict";function r(t){r.superclass.constructor.call(this,t)}var i=n(1),a=n(2),s=a.Geom;r.ATTRS={coreType:"Area"},i.extend(r,s),t.exports=r},function(t,e){"use strict";function n(t){for(var e=1;t>10;)e=10*e,t/=10;for(;t<1;)e/=10,t=10*t;return e}function r(t,e){var n=t.length;if(0===n)return NaN;var r=t[0];if(e<t[0])return NaN;if(e>=t[n-1])return t[n-1];for(var i=1;i<t.length&&!(e<t[i]);i++)r=t[i];return r}function i(t,e){var n=t.length;if(0===n)return NaN;var r,i=t[0];if(e>t[n-1])return NaN;if(e<t[0])return t[0];for(var a=1;a<t.length;a++){if(e<=t[a]){r=t[a];break}i=t[a]}return r}var a={snapFactorTo:function(t,e,r){var i=1;t<0&&(i=-1),t*=i;var s=n(t);return i*=s,t/=s,t="floor"===r?a.snapFloor(e,t):"ceil"===r?a.snapCeiling(e,t):a.snapTo(e,t),t*i},snapMultiple:function(t,e,n){var r;return r=n?Math.ceil(t/e,10):Math.floor(t/e,10),r*e},snapTo:function(t,e){var n=r(t,e),a=i(t,e);if(isNaN(n)||isNaN(a)){if(t[0]>=e)return t[0];var s=t[t.length-1];if(s<=e)return s}return Math.abs(e-n)<Math.abs(a-e)?n:a},snapFloor:function(t,e){return r(t,e)},snapCeiling:function(t,e){return i(t,e)}};t.exports=a},function(t,e,n){var r=n(1),i=n(12);i.Linear=n(82),i.linear=function(t){return new i.Linear(t)},i.Cat=n(22),i.cat=function(t){return new i.Cat(t)},i.Identity=n(81),i.I=function(t){return new i.Identity(t)},i.TimeCat=n(83),i.timeCat=function(t){return new i.TimeCat(t)},i.I_TYPE="identity",i.isCategory=function(t){if("cat"===t)return!0;var e=r.ucfirst(t);return!(!i[e]||!i[e].superclass||"cat"!==i[e].superclass.type)},t.exports=i},function(t,e,n){"use strict";var r=n(12),i=n(1),a=n(16),s=function(t){s.superclass.constructor.call(this,t)};i.extend(s,r),i.augment(s,{type:"cat",tickCount:null,isCategory:!0,init:function(){var t=this,e=t.values,n=t.tickCount;if(i.each(e,function(t,n){e[n]=t.toString()}),!t.ticks){var r=e;if(n){var s=a.category({maxCount:n,data:e});r=s.ticks}this.ticks=r}},getText:function(t){return this.values.indexOf(t)>-1?t=t:i.isNumber(t)&&(t=this.values[Math.round(t)]),s.superclass.getText.call(this,t)},translate:function(t){var e=this.values.indexOf(t);return e===-1&&i.isNumber(t)?e=t:e===-1&&(e=NaN),e},scale:function(t){var e,n=this.rangeMin(),r=this.rangeMax();return(i.isString(t)||this.values.indexOf(t)!==-1)&&(t=this.translate(t)),e=this.values.length>1?t/(this.values.length-1):t,n+e*(r-n)},invert:function(t){if(i.isString(t))return t;var e=this.rangeMin(),n=this.rangeMax();t<e&&(t=e),t>n&&(t=n);var r=(t-e)/(n-e),a=Math.round(r*(this.values.length-1))%this.values.length;return a=a||0,this.values[a]}}),t.exports=s},function(t,e,n){"use strict";var r=n(1),i={},a={defaultShapeType:null,getShape:function(t){var e=this,n=e[t]||e[e.defaultShapeType]||r.mix({},i.ShapeBase,{getActiveCfg:e.getActiveCfg,getSelectedCfg:e.getSelectedCfg});return n._coord=e._coord,n},getShapePoints:function(t,e){var n=this.getShape(t);return n.getShapePoints(e)},drawShape:function(t,e,n){var r=this.getShape(t);return r.drawShape(e,n)}},s={_coord:null,drawShape:function(){},getShapePoints:function(){}};i.registGeom=function(t,e){var n=r.ucfirst(t),s=r.mix({},a,e);return i[n]=s,s.className=n,s},i.registShape=function(t,e,n){var a=r.ucfirst(t),s=i[a],o=s.getShape(),c=r.mix({},o,n);return s[e]=c,c},i.getShape=function(t){var e=this;return t=t||"point",t=r.ucfirst(t),e[t]||i.ShapeBase},i.GeomShape=a,i.ShapeBase=s,t.exports=i},function(t,e,n){"use strict";var r=n(1),i=n(3),a=function(t){r.simpleMix(this,t)};r.augment(a,{animate:null,setImageData:function(t,e){var n=this;n.animate.imageData=t,n.animate.bgImageData=e},setStartPoint:function(t){this.animate.startPoint=t},setPolar:function(t,e){this.animate.center=t,this.animate.radius=e},setCallBack:function(t){var e=this.animate.success,n=null;n=r.isFunction(e)?function(){t(),e()}:t,this.animate.success=n},paint:function(t){var e=this.animate;e.cycle=i.animateReduceMultiple,e.paint(t)},clear:function(){var t=this.animate;t&&t.stop&&t.stop()}}),t.exports=a},function(t,e,n){"use strict";var r=n(1),i=n(4),a=n(6),s=n(7),o=function(t){o.superclass.constructor.call(this,t),this.init()};o.ATTRS={ticks:[],tickLine:{},offsetFactor:1,canvas:null,gridPoints:[]},r.extend(o,i),r.augment(o,{init:function(){},draw:function(){var t=this,e=t.get("line"),n=t.get("tickLine"),r=t.get("label");e&&t.drawLine(e),n&&t.drawTicks(n),r&&t.drawLabels(r)},drawGrid:function(){var t=this,e=t.get("grid");if(e){var n,i=t.get("canvas"),s=t.get("gridPoints"),o=t.get("ticks"),c=s.length;r.each(s,function(t,s){if(r.isFunction(e)){var u=o[s]||{};n=e(u.text,s,c)}else n=e;n&&a.drawLines(t,i,n)})}},getOffsetPoint:function(){},getAxisVector:function(){},getOffsetVector:function(t,e){var n=this,r=n.getAxisVector(t),i=r.normalize(),a=n.get("offsetFactor"),o=new s(i.y*-1*a,i.x*a);return o.multiply(e)},getSidePoint:function(t,e){var n=this,r=n.getOffsetVector(t,e);return{x:t.x+r.x,y:t.y+r.y}},drawTicks:function(t){var e=this,n=e.get("ticks"),i=t.value,s=e.get("canvas");r.each(n,function(n){var r=e.getOffsetPoint(n.value),o=e.getSidePoint(r,i);a.drawLine(r,o,s,t)})},getTextAlignInfo:function(t,e){var n,r,i=this,a=i.getOffsetVector(t,e);return n=a.x>0?"left":a.x<0?"right":"center",r=a.y>0?"top":a.y<0?"bottom":"middle",{textAlign:n,textBaseline:r}},drawLabels:function(t){var e,n=this,i=n.get("ticks"),s=n.get("canvas"),o=i.length;r.each(i,function(i,c){if(e=r.isFunction(t)?t(i.text,c,o):t){var u=n.get("labelOffset"),l=n.getOffsetPoint(i.value),f=n.getSidePoint(l,u),h=r.simpleMix({},n.getTextAlignInfo(l,u),e);a.drawText(h.text||i.text,f,s,h)}})},drawLine:function(){}}),t.exports=o},function(t,e,n){"use strict";function r(t){r.superclass.constructor.call(this,t),this.__init()}var i=n(1),a=n(4);r.ATTRS={type:"cartesian",transposed:!1},i.extend(r,a),i.augment(r,{isRect:!0,isTransposed:!1,__init:function(){var t=this,e=t.get("plot"),n={start:e.get("bl").x,end:e.get("br").x},r={start:e.get("bl").y,end:e.get("tl").y};this.isTransposed=t.get("transposed"),t.set("x",n),t.set("y",r)},convertPoint:function(t){var e=this,n=e.isTransposed,r=n?"y":"x",i=n?"x":"y",a=e.get("x"),s=e.get("y");return{x:a.start+(a.end-a.start)*t[r],y:s.start+(s.end-s.start)*t[i]}},invertPoint:function(t){var e=this,n=e.isTransposed,r=n?"y":"x",i=n?"x":"y",a=e.get("x"),s=e.get("y"),o={};return o[r]=(t.x-a.start)/(a.end-a.start),o[i]=(t.y-s.start)/(s.end-s.start),o}}),t.exports=r},function(t,e,n){"use strict";t.exports={Rect:n(26),Cartesian:n(26),Polar:n(28),Circle:n(28)}},function(t,e,n){"use strict";function r(t){r.superclass.constructor.call(this,t),this.__init()}var i=n(1),a=n(4),s=n(7);r.ATTRS={startAngle:-Math.PI/2,endAngle:3*Math.PI/2,inner:0,type:"polar"},i.extend(r,a),i.augment(r,{isPolar:!0,isTransposed:!1,__init:function(){var t,e,n=this,r=n.get("plot"),i=n.get("inner");n.get("startAngle")===-Math.PI&&0===n.get("endAngle")?(t=Math.min(r.get("width")/2,r.get("height")),e={x:(r.get("bl").x+r.get("br").x)/2,y:r.get("bl").y}):(t=Math.min(r.get("width"),r.get("height"))/2,e={x:(r.get("bl").x+r.get("br").x)/2,y:(r.get("tl").y+r.get("bl").y)/2});var a={start:n.get("startAngle"),end:n.get("endAngle")},s={start:t*i,end:t};this.isTransposed=n.get("transposed"),n.set("center",e),n.set("radius",t),n.set("x",a),n.set("y",s)},convertPoint:function(t){var e=this,n=e.get("center"),r=e.isTransposed,i=r?"y":"x",a=r?"x":"y",s=e.get("x"),o=e.get("y"),c=s.start+(s.end-s.start)*t[i],u=o.start+(o.end-o.start)*t[a];return{x:n.x+Math.cos(c)*u,y:n.y+Math.sin(c)*u}},invertPoint:function(t){var e=this,n=e.get("center"),r=e.isTransposed,i=r?"y":"x",a=r?"x":"y",o=e.get("x"),c=e.get("y"),u=new s(1,0),l=new s(t.x-n.x,t.y-n.y);if(l.zero())return{x:0,y:0};for(var f=u.angleTo(l);f>o.end;)f-=2*Math.PI;var h=l.length(),g=(f-o.start)/(o.end-o.start),p=(h-c.start)/(c.end-c.start),v={};return v[i]=g,v[a]=p,v}}),t.exports=r},function(t,e,n){"use strict";var r=n(1);t.exports={splitData:function(t){if(!t.length)return[];for(var e,n=[],i=[],a=this.getYDim(),s=0;s<t.length;s++){var o=t[s];e=o._origin?o._origin[a]:o[a],r.isArray(e)&&r.isNull(e[0])||r.isNull(e)?(n.push(i),i=[]):i.push(o)}return n.push(i),n}}},function(t,e,n){"use strict";function r(t){r.superclass.constructor.call(this,t)}var i=n(1),a=n(5),s=n(29);i.extend(r,a),i.mixin(r,[s]),r.ATTRS={type:"path",shapeType:"line"},i.augment(r,{drawData:function(t,e){var n,r,a=this,s=this.splitData(t),o=this.get("container"),c=this.get("shapeObj"),u=t[0],l=this.getDrawCfg(u),f=u.y.length||1;u.index=e,l=this.getDrawCfg(u),l.origin=t;var h=a.get("adjusts"),g=h&&i.indexOf(h,"Stack")!==-1;a.get("shapeDatas").push(t),r=a.getDrawShape(l.shape),i.each(s,function(t,e){if(l.splitedIndex=e,1===f)l.points=t,c.drawShape(r,l,o);else for(var i=0;i<f;i++)if(!g||0!==i){if(0===t.length)return;n=[];for(var a=0;a<t.length;a++){var s=t[a];n.push({x:s.x,y:s.y[i]})}l.points=n,l.index=i,c.drawShape(r,l,o)}})},_getJoinIdAttr:function(){var t=this.get("attrs"),e=[];return i.each(t,function(t){"position"!==t.type&&e.push(t)}),e}}),t.exports=r},function(t,e,n){"use strict";function r(t){r.superclass.constructor.call(this,t)}var i=n(1),a=n(13),s=n(33);r.ATTRS={coreType:"Interval"},i.extend(r,a),i.mixin(r,[s]),t.exports=r},function(t,e,n){"use strict";var r=n(1),i=n(10),a=function(){};a.ATTRS={isAdjust:!0},r.augment(a,{processFrames:function(t){for(var e=this,n=e.getXScale().dim,a=e.getYScale().dim,s=t.length,o=[],c={},u=[],l=0;l<s;l++){for(var f=t[l].toJSON(),h=0;h<f.length;h++){var g=f[h],p=g[n],v=g[a],d=p.toString();v=r.isArray(v)?v[1]:v,c[d]||(c[d]=0),g[a]=[c[d],v+c[d]],c[d]+=v}o.push(f)}return r.each(o,function(t){var e=new i(t);u.push(e)}),u}}),t.exports=a},function(t,e,n){"use strict";var r=n(1),i=n(3),a=function(){};a.ATTRS={isAdjust:!0},r.augment(a,{processCore:function(){var t=this,e=this.get("core");e.getDefalutSize=function(){return t._getDefalutSize()}},_getDefalutSize:function(){var t=this.get("core"),e=t.getCoord(),n=t.getXScale(),r=n.values,a=i.widthRatio.column;return e.isPolar&&(a=e.isTransposed?1===r.length?i.widthRatio.rose:i.widthRatio.multiplePie:i.widthRatio.rose),a*(1/r.length)}}),t.exports=a},function(t,e,n){"use strict";var r=n(14);n(106),n(105),n(104),t.exports=r},function(t,e,n){"use strict";var r=n(1),i={splitPoints:function(t){var e=[],n=t.x,i=t.y;return i=r.isArray(i)?i:[i],i.forEach(function(t,i){var a={x:r.isArray(n)?n[i]:n,y:t};e.push(a)}),e}};t.exports=i},function(t,e,n){"use strict";var r=n(1),i=function(t){r.simpleMix(this,t),this.guides=[]};r.augment(i,{guides:null,xScale:null,yScale:null,addGuide:function(t){this.guides.push(t)},setScale:function(t,e){var n=this.guides;this.xScale=t,this.yScale=e,r.each(n,function(n){n.xScale=t,n.yScale=e})},paintFront:function(t,e){var n=this.guides;r.each(n,function(n){"text"!==n.type&&"html"!==n.type||n.paint(t,e)})},paintBack:function(t,e){var n=this.guides;r.each(n,function(n){"text"!==n.type&&"html"!==n.type&&n.paint(t,e)})},clear:function(t){if(this.guides=[],t){var e=t.getElementsByClassName("guideWapper")[0];e&&t.removeChild(e)}return this}}),t.exports=i},function(t,e,n){"use strict";function r(t){r.superclass.constructor.call(this,t),this.__init()}var i=n(1),a=n(4);i.extend(r,a),i.augment(r,{__init:function(){var t=this,e=t.get("start"),n=t.get("end"),r={};r.x=Math.min(e.x,n.x),r.y=Math.min(e.y,n.y),t.set("tl",r);var i={};i.x=Math.max(e.x,n.x),i.y=Math.min(e.y,n.y),t.set("tr",i);var a={};a.x=Math.min(e.x,n.x),a.y=Math.max(e.y,n.y),t.set("bl",a);var s={};s.x=Math.max(e.x,n.x),s.y=Math.max(e.y,n.y),t.set("br",s),t.set("width",s.x-r.x),t.set("height",s.y-r.y)},reset:function(t,e){this.set("start",t),this.set("end",e),this.__init()},isInRange:function(t,e){i.isObject(t)&&(e=t.y,t=t.x);var n=this.get("tl"),r=this.get("br");return n.x<=t&&t<=r.x&&n.y<=e&&e<=r.y}}),t.exports=r},function(t,e,n){"use strict";var r="#999999",i="#E9E9E9",a=n(1),s={label:{fillStyle:"#979797",font:"20px san-serif"},labelOffset:6,line:{stroke:i,lineWidth:1},grid:{stroke:i,lineWidth:1},tickLine:null},o={fontStyle:"",fontVariant:"",fontWeight:"",fontSize:"10px",fontFamily:'"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "\u5fae\u8f6f\u96c5\u9ed1", SimSun, "sans-serif"'},c={defaultFont:o,pixelRatio:1,margin:[40,40,40,40],colors:["#4E7CCC","#36B3C3","#4ECDA5","#94E08A","#E2F194","#EDCC72","#F8AB60","#F9815C","#EB4456","#C82B3D"],axis:{bottom:a.mix(!0,{},s,{line:{stroke:r},label:{textBaseline:"hanging"},labelOffset:12,gridAttrs:{},grid:function(t,e,n){return 0===e||e===n-1?null:a.simpleMix({},s.grid,c.axis.bottom.gridAttrs)}}),left:a.mix(!0,{},s,{label:{textAlign:"end"},line:null,tickLine:null}),right:a.mix(!0,{},s,{label:{textAlign:"start"},line:null,tickLine:null,grid:null}),circle:a.mix(!0,{},s,{line:{stroke:r}}),radius:a.mix(!0,{},s,{})}};t.exports=c},function(t,e,n){"use strict";var r=n(9),i=n(1),a=function(t){a.superclass.constructor.call(this,t)};i.extend(a,r),i.augment(a,{type:"color",names:["color"],arr:null}),r.Color=a,r.Position=n(41),r.Size=n(43),r.Shape=n(42),r.Opacity=n(40),t.exports=r},function(t,e,n){"use strict";var r=n(1),i=n(9),a=function(t){a.superclass.constructor.call(this,t)};r.extend(a,i),r.augment(a,{type:"opacity",names:["opacity"],min:.1,max:1,arr:null}),t.exports=a},function(t,e,n){"use strict";var r=n(1),i=n(9),a=function(t){a.superclass.constructor.call(this,t)};r.extend(a,i),r.augment(a,{type:"position",names:["x","y","z"],coord:null,parseParam:function(t,e){var n;return r.isArray(t)?(n=[],r.each(t,function(t){n.push(e.scale(t))})):n=e.scale(t),n},callback:function(t,e){var n,i,a,s=this.coord;if(t||0===t||(t=.1),e||0===e||(e=.1),r.isArray(e)&&r.isArray(t)){n=[],i=[];for(var o=0,c=0;o<t.length&&c<e.length;o++,c++)a=s.convertPoint({x:t[o],y:e[c]}),n.push(a.x),i.push(a.y)}else if(r.isArray(e))i=[],r.each(e,function(e){a=s.convertPoint({x:t,y:e}),n&&n!==a.x?(r.isArray(n)||(n=[n]),n.push(a.x)):n=a.x,i.push(a.y)});else if(r.isArray(t))n=[],r.each(t,function(t){a=s.convertPoint({x:t,y:e}),i&&i!==a.y?(r.isArray(i)||(i=[i]),i.push(a.y)):i=a.y,n.push(a.x)});else{var u=s.convertPoint({x:t,y:e});n=u.x,i=u.y}return[n,i]}}),t.exports=a},function(t,e,n){"use strict";var r=n(1),i=n(9),a=function(t){a.superclass.constructor.call(this,t)};r.extend(a,i),r.augment(a,{type:"shape",names:["shape"],arr:null}),t.exports=a},function(t,e,n){"use strict";
var r=n(1),i=n(9),a=function(t){a.superclass.constructor.call(this,t)};r.extend(a,i),r.augment(a,{type:"size",names:["size"],arr:null}),t.exports=a},function(t,e,n){"use strict";function r(t){if(!t._attrs&&t!==i){var e=t.superclass.constructor;e&&!e._attrs&&r(e),t._attrs={},a.mix(!0,t._attrs,e._attrs),a.mix(!0,t._attrs,t.ATTRS)}}var i,a=n(1);i=function(t){r(this.constructor),this._attrs={},this.events={};var e=this.getDefaultCfg();a.mix(this._attrs,e,t)},a.augment(i,{getDefaultCfg:function(){var t=this,e=t.constructor,n=e._attrs,r=a.mix(!0,{},n);return r},set:function(t,e){var n="_onRender"+a.ucfirst(t);return this[n]&&this[n](e,this._attrs[t]),this._attrs[t]=e,this},get:function(t){return this._attrs[t]},on:function(t,e){var n=this,r=n.events,i=r[t];return i||(i=r[t]=[]),i.push(e),n},fire:function(t,e){var n=this,r=n.events,i=r[t];i&&a.each(i,function(t){t(e)})},off:function(t,e){var n=this,r=n.events,i=r[t];return t?(i&&a.remove(i,e),n):(n.events={},n)},offEvents:function(t){var e=this,n=e.events;return t?(n[t]=null,e):(e.events={},e)},destroy:function(){var t=this,e=t.destroyed;return e?t:(t._attrs={},t.events={},void(t.destroyed=!0))}}),t.exports=i},function(t,e,n){var r=n(46);t.exports=r},function(t,e){"use strict";function n(t){return t instanceof Date?t:new Date(t)}function r(t,e,n){var r=new Date(n);switch(isNaN(r)&&(r=new Date),e=parseInt(e,10),t){case"s":r=new Date(r.getTime()+1e3*e);break;case"n":r=new Date(r.getTime()+6e4*e);break;case"h":r=new Date(r.getTime()+36e5*e);break;case"d":r=new Date(r.getTime()+864e5*e);break;case"w":r=new Date(r.getTime()+6048e5*e);break;case"m":r=new Date(r.getFullYear(),r.getMonth()+e,r.getDate(),r.getHours(),r.getMinutes(),r.getSeconds());break;case"y":r=new Date(r.getFullYear()+e,r.getMonth(),r.getDate(),r.getHours(),r.getMinutes(),r.getSeconds())}return r}var i=/^(?:(?!0000)[0-9]{4}([-\/.]+)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)([-\/.]?)0?2\2(?:29))(\s+([01]|([01][0-9]|2[0-3])):([0-9]|[0-5][0-9]):([0-9]|[0-5][0-9]))?$/,a=function(){var t=/w{1}|d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,e=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,n=/[^-+\dA-Z]/g,r=function(t,e){for(t=String(t),e=e||2;t.length<e;)t="0"+t;return t},i={"default":"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:ss",isoUTCDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",localShortDate:"yy\u5e74mm\u6708dd\u65e5",localShortDateTime:"yy\u5e74mm\u6708dd\u65e5 hh:MM:ss TT",localLongDate:"yyyy\u5e74mm\u6708dd\u65e5",localLongDateTime:"yyyy\u5e74mm\u6708dd\u65e5 hh:MM:ss TT",localFullDate:"yyyy\u5e74mm\u6708dd\u65e5 w",localFullDateTime:"yyyy\u5e74mm\u6708dd\u65e5 w hh:MM:ss TT"},a={dayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","\u661f\u671f\u65e5","\u661f\u671f\u4e00","\u661f\u671f\u4e8c","\u661f\u671f\u4e09","\u661f\u671f\u56db","\u661f\u671f\u4e94","\u661f\u671f\u516d"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"]};return function(s,o,c){if(1!==arguments.length||"[object String]"!==Object.prototype.toString.call(s)||/\d/.test(s)||(o=s,s=void 0),s=s||0===s?new Date(s):new Date,isNaN(s))throw SyntaxError("invalid date");o=String(i[o]||o||i["default"]),"UTC:"===o.slice(0,4)&&(o=o.slice(4),c=!0);var u=c?"getUTC":"get",l=s[u+"Date"](),f=s[u+"Day"](),h=s[u+"Month"](),g=s[u+"FullYear"](),p=s[u+"Hours"](),v=s[u+"Minutes"](),d=s[u+"Seconds"](),m=s[u+"Milliseconds"](),x=c?0:s.getTimezoneOffset(),y={d:l,dd:r(l,void 0),ddd:a.dayNames[f],dddd:a.dayNames[f+7],w:a.dayNames[f+14],m:h+1,mm:r(h+1,void 0),mmm:a.monthNames[h],mmmm:a.monthNames[h+12],yy:String(g).slice(2),yyyy:g,h:p%12||12,hh:r(p%12||12,void 0),H:p,HH:r(p,void 0),M:v,MM:r(v,void 0),s:d,ss:r(d,void 0),l:r(m,3),L:r(m>99?Math.round(m/10):m,void 0),t:p<12?"a":"p",tt:p<12?"am":"pm",T:p<12?"A":"P",TT:p<12?"AM":"PM",Z:c?"UTC":(String(s).match(e)||[""]).pop().replace(n,""),o:(x>0?"-":"+")+r(100*Math.floor(Math.abs(x)/60)+Math.abs(x)%60,4),S:["th","st","nd","rd"][l%10>3?0:(l%100-l%10!==10)*l%10]};return o.replace(t,function(t){return t in y?y[t]:t.slice(1,t.length-1)})}}(),s={add:function(t,e,n){return r(t,e,n)},addHour:function(t,e){return r("h",t,e)},addMinute:function(t,e){return r("n",t,e)},addSecond:function(t,e){return r("s",t,e)},addDay:function(t,e){return r("d",t,e)},addWeek:function(t,e){return r("w",t,e)},addMonths:function(t,e){return r("m",t,e)},addYear:function(t,e){return r("y",t,e)},isDateEquals:function(t,e){return t.getFullYear()===e.getFullYear()&&t.getMonth()===e.getMonth()&&t.getDate()===e.getDate()},isEquals:function(t,e){return t===e||!(!t||!e)&&(!(!t.getTime||!e.getTime)&&t.getTime()===e.getTime())},isDateString:function(t){return i.test(t)},format:function(t,e,n){return a(t,e,n)},parse:function(t){return"string"==typeof t&&(t=t.replace(/-/g,"/")),n(t)},today:function(){var t=new Date;return new Date(t.getFullYear(),t.getMonth(),t.getDate())},getDate:function(t){return new Date(t.getFullYear(),t.getMonth(),t.getDate())}};t.exports=s},function(t,e,n){var r=n(1),i=n(48),a=n(15);r.mix(a,{values:function(t,e){var n=[],r={},a=t.colArray(e);a=i.formatArray(a);for(var s=0,o=a.length;s<o;s++){var c=a[s];r[c]||void 0===c||(r[c]=!0,n.push(c))}return n},group:function(t,e){if(!e)return[t];var n=a.groupToMap(t,e),r=[];for(var i in n)n.hasOwnProperty(i)&&r.push(n[i]);return r},groupToMap:function(t,e){var n=t.colNames(),i={};if(!e)return{0:t};if(!r.isFunction(e)){var s=r.isArray(e)?e:e.replace(/\s+/g,"").split("*");e=function(t){for(var e="",n=0,r=s.length;n<r;n++)e+=t[s[n]].toString();return e}}t.each(function(t){var n=e(t);i[n]?i[n].push(t):i[n]=[t]});for(var o in i)i.hasOwnProperty(o)&&(i[o]=new a(i[o],{names:n.slice(0)}));return i},merge:function(){for(var t=r.toArray(arguments),e=t[0],n=e.colNames(),i=e.colCount(),s=[],o=0;o<i;o++){s[o]=[];for(var c=0;c<t.length;c++){var u=t[c].colArray(o);s[o]=s[o].concat(u)}}return new a(s,{names:n})},sort:function(t,e){var n=function(t,n){return t[e]-n[e]};return i.sort(t,n)}}),t.exports=a},function(t,e,n){function r(t){return function(e,n){var r=t(e,n);return 0===r?e[s]-n[s]:r}}var i=n(1),a=n(15),s="_INDEX";t.exports={filterNull:function(t){var e=[];return i.each(t,function(t){i.isNull(t)||e.push(t)}),e},mixIf:function(t,e,n){i.each(n,function(n){t[n]=e[n]})},formatArray:function(t){var e=[];return i.each(t,function(t){i.isArray(t)?e=e.concat(t):e.push(t)}),e},sort:function(t,e){var n=t.toJSON();return i.each(n,function(t,e){return t[s]=e,t}),n.sort(r(e)),new a(n,{names:t.colNames()})}}},function(t,e,n){var r=n(2);r.AnimateAssist=n(50),t.exports=r},function(t,e,n){var r=n(18),i=n(2),a=n(51),s=n(53),o=n(52),c=n(55),u=n(54),l=i.AnimateAssist;r.augment(l,{waveh:function(t){var e={type:"waveh"};e=r.mix({},t,e),this.animate=new c(e)},wavec:function(t){var e={type:"wavec"};e=r.mix({},t,e),this.animate=new u(e)},scalex:function(t){var e={type:"scalex"};e=r.mix({},t,e),this.animate=new a(e)},scaley:function(t){var e={type:"scaley"};e=r.mix({},t,e),this.animate=new s(e)},scalexy:function(t){var e={type:"scalexy"};e=r.mix({},t,e),this.animate=new o(e)}}),t.exports=l},function(t,e,n){"use strict";var r=n(1),i=n(11),a=function(t){a.superclass.constructor.call(this,t)};r.extend(a,i),r.augment(a,{draw:function(t,e){var n=this,r=n.ratio,i=n.startPoint.x*r,a=t.width,s=t.height,o=t.getContext("2d"),c=e.getContext("2d"),u=n.imageData,l=n.bgImageData;c.putImageData(u,0,0),n.animateStep(function(c){n.clear(t),o.putImageData(l,0,0);var u=i*c/r,f=(a-i)*c/r;o.drawImage(e,0,0,a,s,i*(1-c)/r,0,u+f,s/r)})}}),t.exports=a},function(t,e,n){"use strict";var r=n(1),i=n(11),a=function(t){a.superclass.constructor.call(this,t)};r.extend(a,i),r.augment(a,{draw:function(t,e){var n=this,r=n.ratio,i=n.center,a=t.width,s=t.height,o=t.getContext("2d"),c=e.getContext("2d"),u=n.imageData,l=n.bgImageData;c.putImageData(u,0,0),n.animateStep(function(c){n.clear(t),o.putImageData(l,0,0),o.drawImage(e,0,0,a,s,i.x*(1-c),i.y*(1-c),a*c/r,s*c/r)})}}),t.exports=a},function(t,e,n){"use strict";var r=n(1),i=n(11),a=function(t){a.superclass.constructor.call(this,t)};r.extend(a,i),r.augment(a,{draw:function(t,e){var n=this,r=n.ratio,i=n.startPoint.y*r,a=t.width,s=t.height,o=t.getContext("2d"),c=e.getContext("2d"),u=n.imageData,l=n.bgImageData;c.putImageData(u,0,0),n.animateStep(function(c){n.clear(t),o.putImageData(l,0,0);var u=i*c/r,f=(s-i)*c/r;o.drawImage(e,0,0,a,s,0,i*(1-c)/r,a/r,u+f)})}}),t.exports=a},function(t,e,n){"use strict";var r=n(1),i=n(11),a=function(t){a.superclass.constructor.call(this,t)};r.extend(a,i),r.augment(a,{draw:function(t,e){var n=this,r=t.width,i=t.height,a=t.getContext("2d"),s=e.getContext("2d"),o=n.ratio,c=n.center,u=n.radius,l=n.imageData,f=n.bgImageData;a.putImageData(f,0,0),s.putImageData(l,0,0),n.animateStep(function(s){n.clear(t),a.putImageData(f,0,0),a.save(),n.sector(a,2*Math.PI*s,c,u),a.clip(),a.drawImage(e,0,0,r,i,0,0,r/o,i/o),a.restore()})},sector:function(t,e,n,r){t.beginPath(),t.strokeStyle="rgba(1, 1, 1, 0)",t.arc(n.x,n.y,r,1.5*Math.PI,1.5*Math.PI+e),t.moveTo(n.x+Math.sin(e)*r,n.y-Math.cos(e)*r),t.lineTo(n.x,n.y),t.lineTo(n.x,n.y-r),t.stroke()}}),t.exports=a},function(t,e,n){"use strict";var r=n(1),i=n(11),a=function(t){a.superclass.constructor.call(this,t)};r.extend(a,i),r.augment(a,{draw:function(t,e){var n=this,r=t.width,i=t.height,a=t.getContext("2d"),s=n.ratio,o=e.getContext("2d"),c=n.imageData,u=n.bgImageData;a.putImageData(u,0,0),o.putImageData(c,0,0),n.animateStep(function(o){n.clear(t),a.putImageData(u,0,0),a.drawImage(e,0,0,r*o,i,0,0,r*o/s,i/s)})}}),t.exports=a},function(t,e,n){var r=n(2);r.Geom.Area=n(19),r.Geom.AreaStack=n(57),n(58),r.Chart.registGeom("area"),r.Chart.registGeom("areaStack"),t.exports=r},function(t,e,n){"use strict";function r(t){r.superclass.constructor.call(this,t)}var i=n(1),a=n(19),s=n(2),o=s.Geom.StackMixin;i.extend(r,a),i.mixin(r,[o]),t.exports=r},function(t,e,n){"use strict";function r(t,e){return Math.abs(t-e)<1e-5}function i(t,e){var n=!0;return s.each(t,function(t){if(!r(t.x,e.x)||!r(t.y,e.y))return n=!1,!1}),n}function a(t,e){var n=this,r=t.points,a=[],o=[];s.each(r,function(t){o.push(t[0]),a.push(t[1])});var c=s.mix({fillStyle:t.color},t.style),l=u.before(e,c);o.reverse(),a=n.parsePoints(a),o=n.parsePoints(o),t.isInCircle?(i(o,t.center)&&(o=[]),n.drawCircleArea(a,o,l)):n.drawRectShape(a,o,l),u.after(l,c)}var s=n(1),o=n(2),c=o.Shape,u=o.G,l=c.registGeom("area",{defaultShapeType:"area"});c.registShape("area","area",{getShapePoints:function(t){var e=t.x,n=t.y,r=t.y0;n=s.isArray(n)?n:[r,n];var i=[];return i.push({x:e,y:n[0]},{x:e,y:n[1]}),i},drawShape:function(t,e){a.call(this,t,e)},drawCircleArea:function(t,e,n){u.lines(t,n),n.lineTo(t[0].x,t[0].y),n.closePath(),e.length&&(u.lines(e,n),n.closePath())},drawRectShape:function(t,e,n){t=t.concat(e),u.lines(t,n),n.closePath()}}),c.registShape("area","smooth",{drawShape:function(t,e){a.call(this,t,e)},drawCircleArea:function(t,e,n){u.smooth(t,n),n.closePath(),e.length&&(u.smooth(e,n),n.closePath())},drawRectShape:function(t,e,n){u.smooth(t,n),n.lineTo(e[0].x,e[0].y),u.smooth(e,n,!1),n.closePath()}}),t.exports=l},function(t,e,n){"use strict";function r(t,e){var n=[];return e?i.isArray(t[0])&&i.each(t[0],function(e,r){for(var i=e,a=1;a<t.length;a++)i+=t[a][r];n.push(i)}):i.each(t,function(t){i.isArray(t)?n=n.concat(t):n.push(t)}),n}var i=n(1),a=6,s=function(t){var e={},n=[],i=t.maxCount||a,s=r(t.data);if(s.length<i)n=[].concat(s);else{var o=s.length,c=parseInt(o/(i-1),10),u=s.map(function(t,e){return e%c===0?s.slice(e,e+c):null}).filter(function(t){return t});n.push(s[0]);for(var l=1;l<u.length&&l<i-1;l++)n.push(u[l][0]);n.push(s[o-1])}return e.categories=s,e.ticks=n,e};t.exports=s},function(t,e,n){"use strict";var r=n(1),i=4,a=6,s=[0,1,2,2.5,3,4,5,7.5,10],o=r.isNull,c=n(20),u=function(t){var e,n=t.min,u=t.max,l=t.interval,f=[],h=t.minCount||i,g=t.maxCount||a,p=(h+g)/2;if(o(l)&&(u===n&&(u=t.min+1,l=1),o(l))){var v=(u-n)/p;l=c.snapFactorTo(v,s,"ceil"),e=parseInt((u-n)/l,10),e>g&&(e=g),e<h&&(e=h),l=c.snapFactorTo((u-n)/e,s,"ceil")}u=c.snapMultiple(u,l,!0),n=c.snapMultiple(n,l,!1),e=Math.round((u-n)/l),n=r.fixedBase(n,l),f.push(n);for(var d=1;d<=e;d++)f.push(r.fixedBase(l*d+n,l));return{min:n,max:r.fixedBase(u,l),interval:l,count:e,ticks:f}};t.exports=u},function(t,e,n){"use strict";function r(t){return new Date(t).getFullYear()}function i(t){return new Date(t,0,1).getTime()}function a(t){return new Date(t).getMonth()}function s(t,e){var n=r(t),i=r(e),s=a(t),o=a(e);return 12*(i-n)+(o-s)%12}function o(t,e){return new Date(t,e,1).getTime()}function c(t,e){return Math.ceil((e-t)/d)}function u(t,e){return Math.ceil((e-t)/v)}function l(t,e){return Math.ceil((e-t)/6e4)}var f=n(1),h=6,g=[1,2,4,6,8,12],p=6e4,v=36e5,d=864e5,m=n(20),x=function(t){var e,n=t.min,x=t.max,y=t.interval,S=[];if(x===n&&(x=n+d),f.isNull(y)){var w,T,A=x-n,_=d,C=365*_;y=parseInt(A/(t.maxCount||h)),w=y/C;var M=r(n);if(w>.51){T=Math.ceil(w);for(var D=r(x),b=M;b<=D+T;b+=T)S.push(i(b));y=null}else if(w>.0834){for(var T=r(n),P=Math.ceil(w/.0834),k=a(n),I=s(n,x),b=0;b<=I+P;b+=P)S.push(o(M,b+k));y=null}else if(y>.5*_){var O=new Date(n),T=O.getFullYear(),P=O.getMonth(n),N=O.getDate(),F=Math.ceil(y/_),R=c(n,x);y=F*_;for(var b=0;b<R+F;b+=F)S.push(new Date(T,P,N+b).getTime())}else if(y>v){var O=new Date(n),T=O.getFullYear(),P=O.getMonth(n),F=O.getDate(),G=O.getHours(),z=m.snapTo(g,Math.ceil(y/v)),L=u(n,x);y=z*v;for(var b=0;b<=L+z;b+=z)S.push(new Date(T,P,F,G+b).getTime())}else if(y>p){var j=l(n,x),Y=Math.ceil(y/p);y=Y*p;for(var b=0;b<=j+Y;b+=Y)S.push(n+b*p)}else{y<1e3&&(y=1e3),n=1e3*Math.floor(n/1e3);var E=Math.ceil((x-n)/1e3),H=Math.ceil(y/1e3);y=1e3*H;for(var b=0;b<E+H;b+=H)S.push(n+1e3*b)}}if(!S.length){n=1e3*Math.floor(n/1e3),x=1e3*Math.ceil(x/1e3);for(var e=(x-n)/y,b=0;b<=e;b++)S.push(f.fixedBase(y*b+n,y))}return{max:x,min:n,interval:y,ticks:S,count:S.length}};t.exports=x},function(t,e,n){var r=n(2);n(63),t.exports=r},function(t,e,n){function r(t){var e=t.sort(function(t,e){return t<e?1:-1}),n=e.length;if(n<4)for(var r=e[n-1],i=0;i<4-n;i++)e.push(r);return e}function i(t,e,n){var i=r(e),a=[{x:t,y:i[0]},{x:t,y:i[1]},{x:t-n/2,y:i[2]},{x:t-n/2,y:i[1]},{x:t+n/2,y:i[1]},{x:t+n/2,y:i[2]},{x:t,y:i[2]},{x:t,y:i[3]}];return a}var a=n(2),s=n(1),o=a.Shape,c=a.G;n(78);var u=o.registShape("schema","candle",{getShapePoints:function(t){var e=i(t.x,t.y,t.size);return e},drawShape:function(t,e){var n=this.parsePoints(t.points),r=s.mix({strokeStyle:t.color,fillStyle:t.color},t.style),i=c.before(e,r);i.moveTo(n[0].x,n[0].y),i.lineTo(n[1].x,n[1].y),i.moveTo(n[2].x,n[2].y);for(var a=3;a<6;a++)i.lineTo(n[a].x,n[a].y);i.closePath(),i.moveTo(n[6].x,n[6].y),i.lineTo(n[7].x,n[7].y),c.after(i,r)}});t.exports=u},function(t,e,n){var r=n(2);r.Geom.IntervalDodge=n(66),r.Chart.registGeom("intervalDodge"),t.exports=r},function(t,e,n){"use strict";var r=n(1),i=function(){};i.ATTRS={marginRatio:.5,dodgeRatio:.5},r.augment(i,{getDodgeOffset:function(t,e,n){var r,i=this,a=t.pre,s=t.next,o=s-a,c=o*i.get("dodgeRatio")/n,u=i.get("marginRatio")*c;return r=.5*(o-n*c-(n-1)*u)+((e+1)*c+e*u)-.5*c-.5*o,(a+s)/2+r},_numbric:function(t){var e=this,n=e.getXScale(),i=n.dim;return r.each(t,function(t){for(var e=t.colArray(i),r=0;r<e.length;r++)e[r]=n.translate(e[r])}),t},processFrames:function(t){var e=this,n=e.getXScale();return n.isCategory&&(t=e._numbric(t),t=e._adjustFrames(t)),t},_adjustFrames:function(t){var e=this,n=t.length,i=e.getXScale(),a=i.dim;return r.each(t,function(t,r){for(var i=t.colArray(a),s=0;s<i.length;s++){var o=i[s],c={pre:o-.5,next:o+.5},u=e.getDodgeOffset(c,r,n);i[s]=u}}),t}}),t.exports=i},function(t,e,n){"use strict";function r(t){r.superclass.constructor.call(this,t)}var i=n(1),a=n(2),s=a.Geom.Interval,o=n(65);i.extend(r,s),i.mixin(r,[o]),i.augment(r,{_getDefalutSize:function(){var t=r.superclass._getDefalutSize.call(this),e=this._getGroupScales(),n=e[0],i=this.getXScale().values.length,a=n.values.length,s=t/a;return 1===i&&(s/=2),s}}),t.exports=r},function(t,e,n){var r=n(2);r.GuideAssist=n(69),t.exports=r},function(t,e,n){"use strict";var r=n(1),i=n(8),a=n(2),s=a.Vector2,o=a.G,c=function(t){c.superclass.constructor.call(this,t)};r.extend(c,i),r.augment(c,{start:[],end:[],cfg:{strokeStyle:"#CCC"},getCfg:function(t){var e=this,n=e.parsePoint(t,e.start),r=e.parsePoint(t,e.end),i=t.get("center"),a=new s(1,0),o=new s.sub(n,i),c=new s.sub(r,i),u=o.length(),l={radius:u,startAngle:2*Math.PI-o.angleTo(a,!0),endAngle:2*Math.PI-c.angleTo(a,!0)};return l},paint:function(t,e){var n=this.getCfg(t),i=r.mix({z:!1},this.cfg,n),a=t.get("center"),s=n.radius,c=n.startAngle,u=n.endAngle;o.drawArc(a,s,c,u,e,i)}}),t.exports=c},function(t,e,n){"use strict";var r=n(2),i=n(1),a=n(8);a.Text=n(73),a.Line=n(71),a.Arc=n(68),a.Html=n(70),a.Rect=n(72);var s=r.GuideAssist;i.augment(s,{_getDefault:function(){return{xScale:this.xScale,yScale:this.yScale}},line:function(t,e,n){var r={type:"line",from:t,to:e,cfg:i.mix({},n)};i.mix(r,this._getDefault());var s=new a.Line(r);return this.addGuide(s),this},text:function(t,e,n){var r={type:"text",position:t,text:e,cfg:i.mix({},n)};i.mix(r,this._getDefault());var s=new a.Text(r);return this.addGuide(s),this},arc:function(t,e,n){var r={type:"arc",start:t,end:e,cfg:i.mix({},n)};i.mix(r,this._getDefault());var s=new a.Arc(r);return this.addGuide(s),this},html:function(t,e,n){var r={type:"html",point:t,html:e,cfg:i.mix({},n)};i.mix(r,this._getDefault());var s=new a.Html(r);return this.addGuide(s),this},rect:function(t,e,n){var r={type:"rect",start:t,end:e,cfg:i.mix({},n)};i.mix(r,this._getDefault());var s=new a.Rect(r);return this.addGuide(s),this}}),t.exports=s},function(t,e,n){"use strict";function r(t,e,n){var r=[];switch(t){case"tl":r[0]=0,r[1]=0;break;case"tr":r[0]=-e,r[1]=0;break;case"bl":r[0]=0,r[1]=Math.floor(-n);break;case"br":r[0]=Math.floor(-e),r[1]=Math.floor(-n);break;case"rc":r[0]=Math.floor(-e),r[1]=Math.floor(-n/2);break;case"lc":r[0]=0,r[1]=Math.floor(-n/2);break;case"tc":r[0]=Math.floor(-e/2),r[1]=Math.floor(-n);break;case"bc":r[0]=Math.floor(-e/2),r[1]=0;break;default:r[0]=Math.floor(-e/2),r[1]=Math.floor(-n/2)}return r}var i=n(1),a=n(8);n(74);var s=function(t){s.superclass.constructor.call(this,t)};i.extend(s,a),i.augment(s,{type:"html",point:[],cfg:{offset:[0,0],align:"cc"},html:"",paint:function(t,e){var n=this,a=n.parsePoint(t,n.point),s=i.createDom(n.html);s=i.modiCSS(s,{position:"absolute",top:Math.floor(a.y)+"px",left:Math.floor(a.x)+"px",visibility:"hidden"});var o=e.parentNode;o=i.modiCSS(o,{position:"relative"});var c;o.getElementsByClassName("guideWapper").length>0?c=o.getElementsByClassName("guideWapper")[0]:(c=i.createDom('<div class="guideWapper"></div>'),c=i.modiCSS(c,{position:"absolute",top:0,left:0}),o.appendChild(c)),c.appendChild(s);var u=n.cfg;if(u.align){var l=u.align,f=i.getWidth(s),h=i.getHeight(s),g=r(l,f,h);a.x=a.x+g[0],a.y=a.y+g[1]}if(u.offset){var p=u.offset;a.x=a.x+p[0],a.y=a.y+p[1]}i.modiCSS(s,{top:Math.floor(a.y)+"px",left:Math.floor(a.x)+"px",visibility:"visible"})}}),t.exports=s},function(t,e,n){"use strict";var r=n(1),i=n(8),a=n(2),s=a.G,o=function(t){o.superclass.constructor.call(this,t)};r.extend(o,i),r.augment(o,{from:[],to:[],cfg:{strokeStyle:"#000",lineWidth:1},paint:function(t,e){var n=this,r=[];r[0]=n.parsePoint(t,n.from),r[1]=n.parsePoint(t,n.to);var i=n.cfg;s.drawLines(r,e,i)}}),t.exports=o},function(t,e,n){"use strict";var r=n(1),i=n(8),a=n(2),s=a.G,o=function(t){o.superclass.constructor.call(this,t)};r.extend(o,i),r.augment(o,{start:[],end:[],cfg:{fillStyle:"#fafafa"},paint:function(t,e){var n=this,r=n.cfg,i=[];i[0]=n.parsePoint(t,n.start),i[1]=n.parsePoint(t,[n.start[0],n.end[1]]),i[2]=n.parsePoint(t,n.end),i[3]=n.parsePoint(t,[n.end[0],n.start[1]]),r.radius?s.drawRect(i,e,r):s.drawLines(i,e,r)}}),t.exports=o},function(t,e,n){"use strict";var r=n(1),i=n(8),a=n(2),s=a.G,o=function(t){o.superclass.constructor.call(this,t)};r.extend(o,i),r.augment(o,{position:[],text:"",cfg:{fill:"#000",textAlign:"center"},paint:function(t,e){var n=this,r=n.position,i=n.parsePoint(t,r),a=n.cfg,o=n.text;s.drawText(o,i,e,a)}}),t.exports=o},function(t,e,n){"use strict";var r=n(1);r.mix(r,{modiCSS:function(t,e){var n;for(n in e)e.hasOwnProperty(n)===!0&&(t.style[n]=e[n]);return t},createDom:function(t){var e=document.createElement("div");return t=t.replace(/(^\s*)|(\s*$)/g,""),e.innerHTML=""+t,e.childNodes[0]},getStyle:function(t,e){return window.getComputedStyle?window.getComputedStyle(t,null)[e]:t.currentStyle[e]},getWidth:function(t){var e=this.getStyle(t,"width");return"auto"===e&&(e=t.offsetWidth),parseFloat(e)},getHeight:function(t){var e=this.getStyle(t,"height");return"auto"===e&&(e=t.offsetHeight),parseFloat(e)}}),t.exports=r},function(t,e,n){var r=n(2);r.Geom.Polygon=n(76),n(77),r.Chart.registGeom("polygon"),t.exports=r},function(t,e,n){"use strict";function r(t){r.superclass.constructor.call(this,t)}var i=n(1),a=n(2),s=a.Geom;r.ATTRS={coreType:"Polygon"},i.extend(r,s),t.exports=r},function(t,e,n){"use strict";var r=n(1),i=n(2),a=i.Shape,s=i.G,o=a.registGeom("polygon",{defaultShapeType:"polygon"});a.registShape("polygon","polygon",{getShapePoints:function(t){var e=[];return r.each(t.x,function(n,r){var i=t.y[r];e.push({x:n,y:i})}),e},drawShape:function(t,e){var n=this.parsePoints(t.points),i=r.mix({fillStyle:t.color,z:!0},t.style);s.drawLines(n,e,i)}}),t.exports=o},function(t,e,n){var r=n(2);r.Geom.Schema=n(79),n(80),r.Chart.registGeom("schema"),t.exports=r},function(t,e,n){"use strict";function r(t){r.superclass.constructor.call(this,t)}var i=n(1),a=n(2),s=a.Geom;r.ATTRS={coreType:"Schema"},i.extend(r,s),i.mixin(r,[s.WidthMixin]),t.exports=r},function(t,e,n){"use strict";var r=n(2),i=r.Shape,a=i.registGeom("schema",{});t.exports=a},function(t,e,n){"use strict";var r=n(12),i=n(1),a=function(t){a.superclass.constructor.call(this,t)};i.extend(a,r),i.augment(a,{type:"identity",value:null,getText:function(){return this.value.toString()},scale:function(){return 1},invert:function(){return this.value}}),t.exports=a},function(t,e,n){"use strict";var r=n(12),i=n(1),a=n(16),s=function(t){s.superclass.constructor.call(this,t)};i.extend(s,r),i.augment(s,{type:"linear",isLinear:!0,min:null,max:null,nice:!0,tickCount:5,tickInterval:null,init:function(){var t=this;if(t.ticks){var e=t.ticks,n=t.translate(e[0]),r=t.translate(e[e.length-1]);(i.isNull(t.min)||t.min>n)&&(t.min=n),(i.isNull(t.max)||t.max<r)&&(t.max=r)}else t.min=t.translate(t.min),t.max=t.translate(t.max),t.initTicks()},calculateTicks:function(){var t=this,e=t.min,n=t.max,r=t.tickCount,i=t.tickInterval,s=a.number({min:e,max:n,minCount:r,maxCount:r,interval:i});return s.ticks},initTicks:function(){var t=this,e=t.calculateTicks();if(t.nice)t.ticks=e,t.min=e[0],t.max=e[e.length-1];else{var n=[];i.each(e,function(e){e>=t.min&&e<=t.max&&n.push(e)}),t.ticks=n}},scale:function(t){if(null===t||void 0===t)return NaN;var e=this.max,n=this.min;if(e===n)return 0;var r=(t-n)/(e-n),i=this.rangeMin(),a=this.rangeMax();return i+r*(a-i)},invert:function(t){var e=(t-this.rangeMin())/(this.rangeMax()-this.rangeMin());return this.min+e*(this.max-this.min)}}),t.exports=s},function(t,e,n){"use strict";var r=n(22),i=n(1),a=n(45),s=n(16),o=function(t){o.superclass.constructor.call(this,t)};i.extend(o,r),i.augment(o,{type:"timeCat",mask:"yyyy-mm-dd HH:MM:ss",tickCount:5,init:function(){var t=this,e=this.values;e.sort(function(e,n){return e=t._toTimeStamp(e),n=t._toTimeStamp(n),e-n}),i.each(e,function(n,r){e[r]=t._toTimeStamp(n)}),this.ticks=this.calculateTicks(!0)},calculateTicks:function(t){var e=this,n=e.tickCount,r=s.category({maxCount:n,data:e.values}),o=r.ticks;return t&&i.each(o,function(t,n){o[n]=a.format(t,e.mask)}),o},translate:function(t){t=this._toTimeStamp(t);var e=this.values.indexOf(t);return e===-1&&(e=i.isNumber(t)&&t<this.values.length?t:NaN),e},scale:function(t){var e,n=this.rangeMin(),r=this.rangeMax(),i=this.translate(t);return e=this.values.length>1&&i>-1?i/(this.values.length-1):0,n+e*(r-n)},getText:function(t){var e="",n=this.translate(t);n>-1&&(e=this.values[n]);var r=this.formatter;return e=parseInt(e,10),e=r?r(e):a.format(e,this.mask)},getTicks:function(){var t=this,e=this.calculateTicks(!1),n=[];return i.each(e,function(e){var r;r=i.isObject(e)?e:{text:t.getText(e),value:t.scale(e)},n.push(r)}),n},_toTimeStamp:function(t){return i.isString(t)&&(t=t.replace(/-/gi,"/").replace("T"," ").replace("Z",""),t=new Date(t).getTime()),i.isDate(t)&&(t=t.getTime()),t}}),t.exports=o},function(t,e,n){var r=n(85);t.exports=r},function(t,e){"use strict";function n(t,e,r){r=r||0;for(var i in e)if(e.hasOwnProperty(i)){var o=e[i];null!==o&&s.isObject(o)?(s.isObject(t[i])||(t[i]={}),r<a?n(t[i],e[i],r+1):t[i]=e[i]):s.isArray(o)?(t[i]=[],t[i]=t[i].concat(o)):void 0!==o&&(t[i]=e[i])}}var r=Object.prototype,i=r.toString,a=5,s={substitute:function(t,e){return t&&e?t.replace(/\\?\{([^{}]+)\}/g,function(t,n){return"\\"===t.charAt(0)?t.slice(1):void 0===e[n]?"":e[n]}):t},ucfirst:function(t){return t+="",t.charAt(0).toUpperCase()+t.substring(1)},isString:function(t){return"string"==typeof t},isNumber:function(t){return"number"==typeof t},isNumeric:function(t){return!isNaN(parseFloat(t))&&isFinite(t)},isBoolean:function(t){return"boolean"==typeof t},isFunction:function(t){return"function"==typeof t},isArray:"isArray"in Array?Array.isArray:function(t){return"[object Array]"===i.call(t)},isDate:function(t){return"[object Date]"===i.call(t)},isNull:function(t){return void 0===t||null===t},notNull:function(t){return!s.isNull(t)},isBlank:function(t){if(s.isArray(t))return 0===t.length;if(s.isObject(t)){var e=0;return s.each(t,function(t,n){e++}),0===e}return!1},isObject:"[object Object]"===i.call(null)?function(t){return null!==t&&void 0!==t&&"[object Object]"===i.call(t)&&void 0===t.ownerDocument}:function(t){return"[object Object]"===i.call(t)},extend:function(t,e,n,r){s.isFunction(e)||(n=e,e=t,t=function(){});var i=Object.create?function(t,e){return Object.create(t,{constructor:{value:e}})}:function(t,e){function n(){}n.prototype=t;var r=new n;return r.constructor=e,r},a=i(e.prototype,t);return t.prototype=s.mix(a,t.prototype),t.superclass=i(e.prototype,e),s.mix(a,n),s.mix(t,r),t},augment:function(t){for(var e=s.toArray(arguments),n=1;n<e.length;n++){var r=e[n];s.isFunction(r)&&(r=r.prototype),s.mix(t.prototype,r)}},toArray:function(t){return t&&t.length?Array.prototype.slice.call(t):[]},mix:function(){var t=s.toArray(arguments),e=t[0];if(e===!0){e=t[1];for(var r=2;r<t.length;r++){var i=t[r];n(e,i)}}else for(var r=1;r<t.length;r++){var i=t[r];for(var a in i)i.hasOwnProperty(a)&&"constructor"!==a&&(e[a]=i[a])}return e},each:function(t,e){if(t)if(s.isObject(t)){for(var n in t)if(t.hasOwnProperty(n)){var r=e(t[n],n);if(r===!1)break}}else if(t.length)for(var i=0;i<t.length;i++){var r=e(t[i],i);if(r===!1)break}},requestAnimationFrame:function(t){var e=window.requestAnimationFrame||window.webkitRequestAnimationFrame||function(t){return setTimeout(t,16)};return e(t)},cancelAnimationFrame:function(t){var e=window.cancelAnimationFrame||window.webkitCancelAnimationFrame||function(t){return clearTimeout(t)};return e(t)}};t.exports=s},function(t,e,n){"use strict";function r(t,e){var n=e.toString(),r=n.indexOf(".");if(r===-1)return Math.round(t);var i=n.substr(r+1).length;return i>20&&(i=20),parseFloat(t.toFixed(i))}function i(t,e){for(var n in e)e.hasOwnProperty(n)&&"constructor"!==n&&void 0!==e[n]&&(t[n]=e[n])}var a=n(84);a.mix(a,{mixin:function(t,e){if(t&&e){t._mixins=e,t.ATTRS=t.ATTRS||{};var n={};a.each(e,function(e){a.augment(t,e);var r=e.ATTRS;r&&a.mix(n,r)}),t.ATTRS=a.mix(n,t.ATTRS)}},map:function(t,e){var n=[];return a.each(t,function(t,r){n.push(e(t,r))}),n},filter:function(t,e){var n=[];return a.each(t,function(t,r){e(t,r)&&n.push(t)}),n},guid:function(){var t={};return function(e){return e=e||"g",t[e]?t[e]+=1:t[e]=1,e+t[e]}}(),inArray:function(t,e){return a.indexOf(t,e)!==-1},indexOf:function(t,e){var n=Array.prototype.indexOf;if(n)return n.call(t,e);for(var r=-1,i=0;i<t.length;i++)if(t[i]===e){r=i;break}return r},remove:function(t,e){var n=a.indexOf(t,e);n!==-1&&t.splice(n,1)},empty:function(t){if(!(t instanceof Array))for(var e=t.length-1;e>=0;e--)delete t[e];t.length=0},equalsArray:function(t,e){if(t===e)return!0;if(!t||!e)return!1;if(t.length!==e.length)return!1;for(var n=!0,r=0;r<t.length;r++)if(t[r]!==e[r]){n=!1;break}return n},wrapBehavior:function(t,e){var n=function(n){t[e](n)};return t["_wrap_"+e]=n,n},getWrapBehavior:function(t,e){return t["_wrap_"+e]},fixedBase:function(t,e){return r(t,e)},length:function(t){if(a.isArray(t))return t.length;if(a.isObject(t)){var e=0;return a.each(t,function(){e++}),e}return 0},clone:function(t){if("object"!=typeof t||null===t)return t;var e;if(a.isArray(t)){e=[];for(var n=0,r=t.length;n<r;n++)"object"==typeof t[n]&&null!=t[n]?e[n]=a.clone(t[n]):e[n]=t[n]}else{e={};for(var i in t)"object"==typeof t[i]&&null!=t[i]?e[i]=a.clone(t[i]):e[i]=t[i]}return e},simpleMix:function(t,e,n,r){return e&&i(t,e),n&&i(t,n),r&&i(t,r),t}}),t.exports=a},function(t,e,n){"use strict";function r(t){var e=t.slice(0);if(e.length>0){var n=e[0],r=e[e.length-1];0!==n.value&&e.unshift({value:0}),1!==r.value&&e.push({value:1})}return e}var i=n(1),a=n(88),s=n(3),o=function(t){this.axisCfg={},i.simpleMix(this,t)};i.augment(o,{axisCfg:{},canvas:null,_isHide:function(t){var e=this.axisCfg;return!e||e[t]===!1},_getLinePosition:function(t,e){var n="";return"x"===t&&(n="bottom"),"y"===t&&(n=e?"right":"left"),n},_getLineCfg:function(t,e,n){var r,i,a=1;return"x"===e?(r={x:0,y:0},i={x:1,y:0}):n?(r={x:1,y:0},i={x:1,y:1}):(r={x:0,y:0},i={x:0,y:1},a=-1),t.isTransposed&&(a*=-1),{offsetFactor:a,start:t.convertPoint(r),end:t.convertPoint(i)}},_getCircleCfg:function(t){return{startAngle:t.get("startAngle"),endAngle:t.get("endAngle"),center:t.get("center"),radius:t.get("radius")}},_getRadiusCfg:function(t){var e,n,r=t.isTransposed;return r?(e={x:0,y:0},n={x:1,y:0}):(e={x:0,y:0},n={x:0,y:1}),{offsetFactor:-1,start:t.convertPoint(e),end:t.convertPoint(n)}},_getAxisCfg:function(t,e,n,a,s){var o=this.axisCfg,c=e.getTicks(),u=i.mix(!0,{ticks:c,canvas:this.canvas},s,o[e.dim]);if(u.grid&&n){var l=[],f=r(n.getTicks());i.each(c,function(e){var n=[];i.each(f,function(r){var i="x"===a?e.value:r.value,s="x"===a?r.value:e.value,o=t.convertPoint({x:i,y:s});n.push(o)}),l.push(n)}),u.gridPoints=l}return u},_createAxis:function(t,e,n,r,o){var c,u,l,f=this,h=t.get("type"),g=t.isTransposed;if("cartesian"===h){c=a.Line;var p=f._getLinePosition(r,o);u=s.axis[p],l=f._getLineCfg(t,r,o)}else"x"===r&&!g||"y"===r&&g?(c=a.Circle,u=s.axis.circle,l=f._getCircleCfg(t)):(c=a.Line,u=s.axis.radius,l=f._getRadiusCfg(t));var v=f._getAxisCfg(t,e,n,r,u);v=i.mix(!0,{},v,l);var d=new c(v);return d.drawGrid(),d},createAxis:function(t,e,n){var r=this,a=[];if(e&&!r._isHide(e.dim)){var s=r._createAxis(t,e,n[0],"x");a.push(s)}i.each(n,function(n,i){if(!r._isHide(n.dim)){var s=r._createAxis(t,n,e,"y",i);a.push(s)}}),i.each(a,function(t){t.draw()})}}),t.exports=o},function(t,e,n){"use strict";t.exports={Line:n(90),Circle:n(89)}},function(t,e,n){"use strict";function r(t){r.superclass.constructor.call(this,t)}var i=n(1),a=n(25),s=n(6),o=n(7);r.ATTRS={startAngle:-Math.PI/2,endAngle:3*Math.PI/2,radius:null,center:null},i.extend(r,a),i.augment(r,{getOffsetPoint:function(t){var e=this,n=e.get("startAngle"),r=e.get("endAngle"),i=n+(r-n)*t;return e._getCirclePoint(i)},_getCirclePoint:function(t,e){var n=this,r=n.get("center");return e=e||n.get("radius"),
{x:r.x+Math.cos(t)*e,y:r.y+Math.sin(t)*e}},getTextAlignInfo:function(t,e){var n,r=this,i=r.getOffsetVector(t,e),a="middle";return i.x>0?n="left":i.x<0?n="right":(n="center",i.y>0?a="top":i.y<0&&(a="bottom")),{textAlign:n,textBaseline:a}},getAxisVector:function(t){var e=this,n=e.get("center"),r=e.get("offsetFactor");return new o((t.y-n.y)*r,(t.x-n.x)*-1*r)},drawLine:function(t){var e=this,n=e.get("center"),r=e.get("radius"),i=e.get("canvas"),a=e.get("startAngle"),o=e.get("endAngle");s.drawArc(n,r,a,o,i,t)}}),t.exports=r},function(t,e,n){"use strict";function r(t){r.superclass.constructor.call(this,t)}var i=n(1),a=n(25),s=n(6),o=n(7);r.ATTRS={start:null,end:null},i.extend(r,a),i.augment(r,{getOffsetPoint:function(t){var e=this,n=e.get("start"),r=e.get("end"),i=r.x-n.x,a=r.y-n.y;return{x:n.x+i*t,y:n.y+a*t}},getAxisVector:function(){var t=this,e=t.get("start"),n=t.get("end");return new o(n.x-e.x,n.y-e.y)},drawLine:function(t){var e=this,n=e.get("canvas"),r=e.get("start"),i=e.get("end");s.drawLine(r,i,n,t)}}),t.exports=r},function(t,e,n){"use strict";function r(t){r.superclass.constructor.call(this,t),this.__init()}function i(t){return function(){var e=this,n=new f({chart:e,type:t,coord:e.get("coord")});return e.__addLayer(n),n}}var a=n(4),s=n(37),o=n(1),c=n(10),u=n(27),l=n(17),f=n(107),h=n(109),g=n(87),p=n(36),v=n(3),d=n(92),m=n(24);r.ATTRS={id:null,margin:null,data:null,scales:{},coordCfg:{type:"cartesian"},layers:null,geoms:null,colDefs:null},o.extend(r,a),o.augment(r,{source:function(t,e){var n=this;return e&&n.set("colDefs",e),n.__initData(t),n},axis:function(t,e){var n=this,r=n.get("axisAssist");return t?(r.axisCfg=r.axisCfg||{},r.axisCfg[t]=e):r.axisCfg=null,n},createScale:function(t,e){var n=this;e=e||n.get("data");var r=n.get("scales");return r[t]||(r[t]=n._createScale(t,e)),r[t]},_createScale:function(t,e){var n=this,r=n.get("coord"),i=r.isPolar,a=n.get("scaleAssist");return a.createScale(t,e,i)},coord:function(t,e){var n,r=this;return e?(n=e,n.type=t):n=o.isString(t)?{type:t}:t,r.set("coordCfg",n),r.__initCoord(),r},getPosition:function(t){var e=this,n=e.get("coord"),r=e._getXScale(),i=e._getYScales()[0],a=r.dim,s=r.scale(t[a]),o=i.dim,c=i.scale(t[o]);return n.convertPoint({x:s,y:c})},getRecord:function(t){var e=this,n=e.get("coord"),r=e._getXScale(),i=e._getYScales()[0],a=n.invertPoint(t),s={};return s[r.dim]=r.invert(a.x),s[i.dim]=i.invert(a.y),s},getSnapRecords:function(t,e){var n=this.get("geoms")[0],r=n.getSnapRecords(t,e);return r},__init:function(){var t=this;t.__initCanvas(),t.set("layers",[]),t.set("geoms",[]),t.set("scaleAssist",new h),t.set("axisAssist",new g({canvas:t.get("canvas")})),t.set("guideAssist",new p),t.set("animateAssist",new m),t.__initData(t.get("data"))},__initData:function(t){t&&(t instanceof c||(t=new c(t)),this.set("data",t));var e=this.get("colDefs");if(e){var n=this.get("scaleAssist");n.defs=e}},_getRatio:function(){return v.pixelRatio},__initCanvas:function(){var t,e=this,n=e.get("id"),r=e.get("el"),i=e.get("context");t=r?r:document.getElementById(n),i&&t&&!t.getContext&&(t.getContext=function(){return i});var a=d.getWidth(t),s=d.getHeight(t),o=e._getRatio();if(o){t.width=a*o,t.height=s*o;var c=t.getContext("2d");c.scale(o,o)}e.set("width",a),e.set("height",s),e.set("canvas",t),e.__initLayout()},__initLayout:function(){var t=this,e=t.get("margin");o.isNull(e)&&(e=v.margin,t.set("margin",e));var n,r,i,a,s=t.get("width"),c=t.get("height");o.isNumber(e)?(n=a=e,r=i=e):o.isArray(e)&&(n=e[0],i=o.isNull(e[1])?e[0]:e[1],a=o.isNull(e[2])?e[0]:e[2],r=o.isNull(e[3])?i:e[3]),a=c-a,i=s-i;var u={plot:{start:{x:r,y:n},end:{x:i,y:a}},lAxis:{start:{x:0,y:n},end:{x:r,y:c}},rAxis:{start:{x:i,y:n},end:{x:s,y:c}},bAxis:{start:{x:r,y:a},end:{x:i,y:c}}};t.set("layout",u),t.__initPlot()},__initPlot:function(){var t=this,e=t.get("layout"),n=new s({start:e.plot.start,end:e.plot.end});t.set("plot",n),t.__initCoord()},__initCoord:function(){var t=this,e=t.get("plot"),n=o.simpleMix({},t.get("coordCfg"),{plot:e}),r=n.type,i=u[o.ucfirst(r)]||u.Cartesian,a=new i(n);t.set("coord",a)},__addLayer:function(t){var e=this;e.get("layers").push(t)},clear:function(){var t=this.get("canvas").parentNode;return this.get("guideAssist").clear(t),this.get("animateAssist").clear(),this.set("layers",[]),this.set("geoms",[]),this.set("scales",{}),this._clearCanvas(),this},destroy:function(){this.clear(),r.superclass.destroy.call(this)},_clearCanvas:function(){var t=this.get("canvas"),e=t.getContext("2d");return e.clearRect(0,0,t.width,t.height),this},_isDataChange:function(){var t=this,e=!1,n=t.get("geoms");return o.each(n,function(t){if(t.get("isAdjust"))return e=!0,!1}),e},_trainScale:function(t){var e,n=this,r=n._getYScales();t.length>0&&(e=c.merge.apply(null,t)),o.each(r,function(t){if(t.isLinear){var r=n._createScale(t.dim,e);t.change({min:r.min,max:r.max})}})},_renderBackGuide:function(){var t=this,e=t.get("canvas"),n=t.get("guideAssist");if(n.guides.length){var r=t.get("coord"),i=t._getXScale(),a=t._getYScales()[0];n.setScale(i,a),n.paintBack(r,e)}},_renderFrontGuide:function(){var t=this,e=t.get("canvas"),n=t.get("guideAssist");if(n&&n.guides.length){var r=t.get("coord"),i=t._getXScale(),a=t._getYScales()[0];n.setScale(i,a),n.paintFront(r,e)}},_renderAnimate:function(t){var e=this,n=e.get("imageData"),r=e.get("bgImageData"),i=e.get("animateAssist"),a=e.get("canvas"),s=e.get("coord"),o=s.get("center"),c=s.get("radius"),u=e.get("geoms")[0],l=u.get("core"),f=l.getYScale(),h=l.getYMinValue(),g=s.convertPoint({x:0,y:f.scale(h)});i.animate&&(i.setImageData(n,r),i.setStartPoint(g),i.setPolar(o,c),i.setCallBack(t),i.paint(a))},render:function(){var t,e,n,r=this,i=r.get("layers"),a=r.get("geoms"),s=r.get("data"),c=r.get("animateAssist"),u=[];for(n=0;n<i.length;n++)t=i[n],e=t.createGeom(),e.initData(s),u=u.concat(e.get("frames")),a.push(e);return r._isDataChange()&&r._trainScale(u),r.beforeDrawGeom(),c.animate?o.requestAnimationFrame(function(){r.set("bgImageData",r.getImageData()),r._clearCanvas(),r.drawGeom(a),r.set("imageData",r.getImageData()),r._clearCanvas(),r._renderAnimate(r._renderFrontGuide.bind(r))}):(r.drawGeom(a),r._renderFrontGuide()),r},drawGeom:function(t,e){for(var n=0;n<t.length;n++)e?t[n].draw(e):t[n].draw()},beforeDrawGeom:function(){var t=this;t._renderAxis(),t._renderBackGuide()},getImageData:function(){var t=this,e=t.get("canvas"),n=e.getContext("2d"),r=t.get("width"),i=t.get("height"),a=t._getRatio();return n.getImageData(0,0,r*a,i*a)},_getXScale:function(){var t=this,e=t.get("geoms"),n=e[0].getXScale();return n},_getYScales:function(){var t=this,e=t.get("geoms"),n=[];return o.each(e,function(t){var e=t.getYScale();o.indexOf(n,e)===-1&&n.push(e)}),n},_renderAxis:function(){var t=this,e=t.get("axisAssist"),n=t._getXScale(),r=t._getYScales(),i=t.get("coord");e.createAxis(i,n,r)},guide:function(){return this.get("guideAssist")},animate:function(){return this.get("animateAssist")}});for(var x in l)l.hasOwnProperty(x)&&o.isFunction(l[x])&&(x=x[0].toLowerCase()+x.substr(1),r.prototype[x]=i(x));r.registGeom=function(t){t=t[0].toLowerCase()+t.substr(1),r.prototype[t]=i(t)},t.exports=r},function(t,e){"use strict";var n={getStyle:function(t,e){return"undefined"!=typeof window&&window.getComputedStyle?window.getComputedStyle(t,null)[e]:t.currentStyle?t.currentStyle[e]:t.style[e]},getWidth:function(t){var e=n.getStyle(t,"width");return"auto"===e&&(e=t.offsetWidth),parseFloat(e)},getHeight:function(t){var e=n.getStyle(t,"height");return"auto"===e&&(e=t.offsetHeight),parseFloat(e)}};t.exports=n},function(t,e,n){"use strict";function r(t){r.superclass.constructor.call(this,t)}var i=n(1),a=n(5),s=n(29);i.extend(r,a),i.mixin(r,[s]),r.ATTRS={type:"area",generatePoints:!0},i.augment(r,{sortData:function(t){var e=this.getXScale();if("cat"!==e.type&&"timeCat"!==e.type)return this.sort(t)},drawData:function(t,e){var n,r,a,s,o=this,c=this.splitData(t),u=this.get("container"),l=this.get("shapeObj"),f=t[0];f.index=e,n=this.getDrawCfg(f),n.origin=t,o.get("shapeDatas").push(t),i.each(c,function(t,e){n.splitedIndex=e,a=[];for(var i=0;i<t.length;i++)s=t[i],a.push(s.points);0!==a.length&&(n.points=a,r=o.getDrawShape(n.shape),l.drawShape(r,n,u))})}}),t.exports=r},function(t,e,n){var r={};r.Base=n(5),r.Interval=n(95),r.Point=n(98),r.Line=n(96),r.Polygon=n(99),r.Schema=n(100),r.Path=n(30),r.Area=n(93),t.exports=r},function(t,e,n){"use strict";function r(t){r.superclass.constructor.call(this,t)}var i=n(1),a=n(5);r.ATTRS={type:"interval",generatePoints:!0},i.extend(r,a),i.mixin(r),i.augment(r,{getDrawCfg:function(t){var e=this,n=r.superclass.getDrawCfg.call(e,t),i=e.getCoord();return i.isPolar&&(n.z=!0,n.center=i.get("center")),n}}),t.exports=r},function(t,e,n){"use strict";function r(t){r.superclass.constructor.call(this,t)}var i=n(1),a=n(30);i.extend(r,a),r.ATTRS={type:"line"},i.augment(r,{sortData:function(t){var e=this.getXScale();if("cat"!==e.type&&"timeCat"!==e.type)return this.sort(t)}}),t.exports=r},function(t,e){"use strict";t.exports={sort:function(t){var e=this.getXDim();t.sort(function(t,n){return t[e]-n[e]})}}},function(t,e,n){"use strict";function r(t){r.superclass.constructor.call(this,t)}var i=n(1),a=n(5);i.extend(r,a),r.ATTRS={type:"point",generatePoints:!0},t.exports=r},function(t,e,n){"use strict";function r(t){r.superclass.constructor.call(this,t)}var i=n(1),a=n(5);i.extend(r,a),r.ATTRS={type:"polygon",generatePoints:!0},i.augment(r,{getShapePointInfo:function(t){var e,n=a.prototype.getShapePointInfo.call(this,t),r=this,s=n.x,o=n.y;if(!i.isArray(s)||!i.isArray(o)){var c=r.getXScale(),u=r.getYScale(),l=c.values?c.values.length:c.ticks.length,f=u.values?u.values.length:u.ticks.length,h=.5/l,g=.5/f;c.isCategory&&u.isCategory?(s=[s-h,s-h,s+h,s+h],o=[o-g,o+g,o+g,o-g]):i.isArray(s)?(e=s,s=[e[0],e[0],e[1],e[1]],o=[o-g/2,o+g/2,o+g/2,o-g/2]):i.isArray(o)&&(e=o,o=[e[0],e[1],e[1],e[0]],s=[s-h/2,s-h/2,s+h/2,s+h/2])}var p=i.mix({},t,{x:s,y:o});return p}}),t.exports=r},function(t,e,n){"use strict";function r(t){r.superclass.constructor.call(this,t)}var i=n(1),a=n(5);i.extend(r,a),r.ATTRS={type:"schema",generatePoints:!0},t.exports=r},function(t,e,n){"use strict";function r(t){r.superclass.constructor.call(this,t)}var i=n(1),a=n(31),s=n(32);i.extend(r,a),i.mixin(r,[s]),t.exports=r},function(t,e,n){"use strict";function r(t){r.superclass.constructor.call(this,t)}var i=n(1),a=n(13);r.ATTRS={coreType:"Line"},i.extend(r,a),t.exports=r},function(t,e,n){"use strict";function r(t){r.superclass.constructor.call(this,t)}var i=n(1),a=n(13);i.extend(r,a),r.ATTRS={coreType:"Point"},t.exports=r},function(t,e,n){"use strict";function r(t){var e=t.x,n=t.y,r=t.y0,a=t.size,s=r,o=n;i.isArray(n)&&(o=n[1],s=n[0]);var c,u;i.isArray(e)?(c=e[0],u=e[1]):(c=e-a/2,u=e+a/2);var l=[];return l.push({x:c,y:s},{x:c,y:o},{x:u,y:o},{x:u,y:s}),l}var i=n(1),a=n(14),s=n(6),o=a.registGeom("interval",{defaultShapeType:"rect"});a.registShape("interval","rect",{getShapePoints:function(t){return r(t)},drawShape:function(t,e){var n=this.parsePoints(t.points),r=i.simpleMix({fillStyle:t.color,z:!0},t.style);if(t.isInCircle){var a=n.slice(0);this._coord.isTransposed&&(a=[n[0],n[3],n[2],n[1]]),s.drawFan(a,t.center,e,r)}else s.drawRect(n,e,r)}}),t.exports=o},function(t,e,n){"use strict";function r(t){var e=i.simpleMix({strokeStyle:t.color,lineWidth:t.size||o,z:t.isInCircle},t.style);return e}var i=n(1),a=n(14),s=n(6),o=4,c=n(35),u=n(3),l=a.registGeom("line",{defaultShapeType:"line"});a.registShape("line","line",{getShapePoints:function(t){return c.splitPoints(t)},drawShape:function(t,e){var n=t.points,i=r(t);s.drawLines(n,e,i)}}),a.registShape("line","smooth",{drawShape:function(t,e){var n=t.points,i=r(t);s.drawSmooth(n,e,i)}}),a.registShape("line","dash",{drawShape:function(t,e){var n=t.points,i=r(t);i.lineDash=u.lineDash,s.drawLines(n,e,i)}}),t.exports=l},function(t,e,n){"use strict";function r(t){return{size:t.size||o,style:i.mix({lineWidth:0,strokeStyle:t.color,fillStyle:t.color},t.style)}}var i=n(1),a=n(14),s=n(6),o=5,c=n(35),u=a.registGeom("point",{defaultShapeType:"circle"});a.registShape("point","circle",{getShapePoints:function(t){return c.splitPoints(t)},drawShape:function(t,e){if(0!==t.size){var n=r(t),a=n.size,o=n.style,c=t.x,u=t.y;i.isArray(u)||(u=[u]);for(var l=0;l<u.length;l++)s.drawCircle({x:c,y:u[l]},a,e,o)}}}),a.registShape("point","rect",{drawShape:function(t,e){if(0!==t.size){var n=r(t),a=n.size,o=n.style,c=t.x,u=t.y;i.isArray(u)||(u=[u]),i.each(u,function(t){s.drawShape(e,o,function(e){e.rect(c-a,t-a,2*a,2*a)})})}}}),t.exports=u},function(t,e,n){"use strict";var r=n(1),i=n(39),a=n(3),s=n(17),o=n(34),c=function(t){r.simpleMix(this,t),this.attrs=[]};r.augment(c,{type:null,attrs:null,chart:null,styleCfg:null,_createScales:function(t){var e=this,n=[];return r.each(t,function(t){var r=e._createScale(t);n.push(r)}),n},createGeom:function(){var t=this,e=t.type,n=s[r.ucfirst(e)],i=new n({type:e,attrs:t.attrs,styleCfg:t.styleCfg,coord:t.coord,container:t.chart.get("canvas")});return i},_createScale:function(t){var e=this.chart;return e.createScale(t)},_parseDims:function(t){return r.isString(t)&&t.indexOf("*")!==-1?t=t.replace(/\s+/g,"").split("*"):(r.isNumber(t)||r.isString(t))&&(t=[t]),t},_addAttr:function(t,e){t=r.ucfirst(t);var n=this.attrs,a=new i[t](e);n.push(a)},_createAttr:function(t,e,n){e=this._parseDims(e);var i,s=this._createScales(e),c=[],u=r.ucfirst(this.type),l={dims:e,scales:s};"shape"===t?(i=o[u],r.each(i,function(t,e){r.isObject(t)&&c.push(e)})):c=a[t+"s"],r.isFunction(n)?l.callback=n:r.isArray(n)&&(c=n),"position"===t&&(l.coord=this.coord),"size"===t?(l.min=c.min,l.max=c.max):l.arr=c,this._addAttr(t,l)},position:function(t,e){return this._createAttr("position",t,e),this},color:function(t,e){return this._createAttr("color",t,e),this},size:function(t,e){return this._createAttr("size",t,e),this},shape:function(t,e){return this._createAttr("shape",t,e),this},style:function(t){return this.styleCfg=t,this}}),t.exports=c},function(t,e,n){"use strict";function r(t){return new o(t.x,t.y)}function i(t,e){return t.x*=e,t.y*=e,t}function a(t,e,n,a){var s,c,u,l,f,h,g,p,v=[],d=!!a;if(d){for(u=new o(1/0,1/0),l=new o((-(1/0)),(-(1/0))),p=0,g=t.length;p<g;p++)f=r(t[p]),u.min(f),l.max(f);u.min(r(a[0])),l.max(r(a[1]))}for(p=0,h=t.length;p<h;p++){if(f=r(t[p]),n)s=r(t[p?p-1:h-1]),c=r(t[(p+1)%h]);else{if(0===p||p===h-1){v.push([f.x,f.y]);continue}s=r(t[p-1]),c=r(t[p+1])}var m=o.sub(c,s);i(m,e);var x=f.distanceTo(s),y=f.distanceTo(c),S=x+y;0!==S&&(x/=S,y/=S);var w=i(m.clone(),-x),T=i(m.clone(),y),A=o.add(f,w),_=o.add(f,T);d&&(A.max(u),A.min(l),_.max(u),_.min(l)),v.push([A.x,A.y]),v.push([_.x,_.y])}return n&&v.push(v.shift()),v}function s(t,e,n){for(var r,i,s,o=!!e,c=a(t,.4,o,n),u=t.length,l=[],f=0;f<u-1;f++)r=c[2*f],i=c[2*f+1],s=t[f+1],l.push(["C",r[0],r[1],i[0],i[1],s.x,s.y]);return o&&(r=c[u],i=c[u+1],s=t[0],l.push(["C",r[0],r[1],i[0],i[1],s.x,s.y])),l}var o=n(7);t.exports={smooth:s}},function(t,e,n){"use strict";var r=n(1),i=n(21),a=n(3),s=n(10),o={LINEAR:"linear",CAT:"cat",TIME_CAT:"timeCat"},c=function(t){r.simpleMix(this,t),this.defs=this.defs||{}};r.augment(c,{defs:null,_getDefs:function(){var t=this.defs;return r.mix(!0,{},a.scales,t)},_getRange:function(t,e,n){return t===o.CAT||t===o.TIME_CAT?this._getCatRange(e,n):[0,1]},_getCatRange:function(t,e){var n,r=t.length;return n=1===r?[.5,1]:e?[0,1-1/r]:[1/(2*r),1-1/(2*r)]},_getScaleCfg:function(t,e,n){var r={dim:e};if(n&&n.names.length>0&&n.contains(e)){var i=s.values(n,e);i.length>0&&t!==o.CAT&&t!==o.TIME_CAT&&(r.min=Math.min.apply(null,i),r.max=Math.max.apply(null,i)),r.values=i}return r},_getDefaultType:function(t,e){var n=o.LINEAR,i=e.rowObject(0),a=i[t];return r.isArray(a)&&(a=a[0]),r.isString(a)&&(n=o.CAT),n},_createDefaultScale:function(t,e){var n=this._getDefaultType(t,e),r=this._getScaleCfg(n,t,e);return i[n](r)},createScale:function(t,e,n){var a,s=this,o=s._getDefs();if(r.isNumber(t))a=i.I({value:t,dim:t.toString()});else if(o[t]||r.indexOf(e.colNames(),t)!==-1)if(o[t]){var c=o[t],u=c.type||s._getDefaultType(t,e),l=s._getScaleCfg(u,t,e);r.isNull(c.min)||(l.min=c.min),r.isNull(c.max)||(l.max=c.max),r.simpleMix(l,c),l.values||(l.values=[]),r.isNull(l.min)&&(l.min=0),r.isNull(l.max)&&(l.max=0),a=i[u](l)}else a=s._createDefaultScale(t,e);else a=i.I({value:t,dim:t});if(a&&"I"!==a.type&&(!o[t]||!o[t].range)&&a.values){var f=s._getRange(a.type,a.values,n);a.range=f}return a}}),t.exports=c}])});
;/*! JsBarcode v3.9.0 | (c) Johan Lindell | MIT license */
!function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=19)}([function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function t(e,n){r(this,t),this.data=e,this.text=n.text||e,this.options=n};e.default=o},function(t,e,n){"use strict";function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}Object.defineProperty(e,"__esModule",{value:!0});var o,i=e.SET_A=0,a=e.SET_B=1,u=e.SET_C=2,f=(e.SHIFT=98,e.START_A=103),c=e.START_B=104,s=e.START_C=105;e.MODULO=103,e.STOP=106,e.FNC1=207,e.SET_BY_CODE=(o={},r(o,f,i),r(o,c,a),r(o,s,u),o),e.SWAP={101:i,100:a,99:u},e.A_START_CHAR=String.fromCharCode(208),e.B_START_CHAR=String.fromCharCode(209),e.C_START_CHAR=String.fromCharCode(210),e.A_CHARS="[\0-_È-Ï]",e.B_CHARS="[ -È-Ï]",e.C_CHARS="(Ï*[0-9]{2}Ï*)",e.BARS=[11011001100,11001101100,11001100110,10010011e3,10010001100,10001001100,10011001e3,10011000100,10001100100,11001001e3,11001000100,11000100100,10110011100,10011011100,10011001110,10111001100,10011101100,10011100110,11001110010,11001011100,11001001110,11011100100,11001110100,11101101110,11101001100,11100101100,11100100110,11101100100,11100110100,11100110010,11011011e3,11011000110,11000110110,10100011e3,10001011e3,10001000110,10110001e3,10001101e3,10001100010,11010001e3,11000101e3,11000100010,10110111e3,10110001110,10001101110,10111011e3,10111000110,10001110110,11101110110,11010001110,11000101110,11011101e3,11011100010,11011101110,11101011e3,11101000110,11100010110,11101101e3,11101100010,11100011010,11101111010,11001000010,11110001010,1010011e4,10100001100,1001011e4,10010000110,10000101100,10000100110,1011001e4,10110000100,1001101e4,10011000010,10000110100,10000110010,11000010010,1100101e4,11110111010,11000010100,10001111010,10100111100,10010111100,10010011110,10111100100,10011110100,10011110010,11110100100,11110010100,11110010010,11011011110,11011110110,11110110110,10101111e3,10100011110,10001011110,10111101e3,10111100010,11110101e3,11110100010,10111011110,10111101110,11101011110,11110101110,11010000100,1101001e4,11010011100,1100011101011]},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.SIDE_BIN="101",e.MIDDLE_BIN="01010",e.BINARIES={L:["0001101","0011001","0010011","0111101","0100011","0110001","0101111","0111011","0110111","0001011"],G:["0100111","0110011","0011011","0100001","0011101","0111001","0000101","0010001","0001001","0010111"],R:["1110010","1100110","1101100","1000010","1011100","1001110","1010000","1000100","1001000","1110100"],O:["0001101","0011001","0010011","0111101","0100011","0110001","0101111","0111011","0110111","0001011"],E:["0100111","0110011","0011011","0100001","0011101","0111001","0000101","0010001","0001001","0010111"]},e.EAN2_STRUCTURE=["LL","LG","GL","GG"],e.EAN5_STRUCTURE=["GGLLL","GLGLL","GLLGL","GLLLG","LGGLL","LLGGL","LLLGG","LGLGL","LGLLG","LLGLG"],e.EAN13_STRUCTURE=["LLLLLL","LLGLGG","LLGGLG","LLGGGL","LGLLGG","LGGLLG","LGGGLL","LGLGLG","LGLGGL","LGGLGL"]},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),o=function(t,e,n){var o=t.split("").map(function(t,n){return r.BINARIES[e[n]]}).map(function(e,n){return e?e[t[n]]:""});if(n){var i=t.length-1;o=o.map(function(t,e){return e<i?t+n:t})}return o.join("")};e.default=o},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function a(t,e){for(var n=0;n<e;n++)t="0"+t;return t}Object.defineProperty(e,"__esModule",{value:!0});var u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),f=n(0),c=function(t){return t&&t.__esModule?t:{default:t}}(f),s=function(t){function e(t,n){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n))}return i(e,t),u(e,[{key:"encode",value:function(){for(var t="110",e=0;e<this.data.length;e++){var n=parseInt(this.data[e]),r=n.toString(2);r=a(r,4-r.length);for(var o=0;o<r.length;o++)t+="0"==r[o]?"100":"110"}return t+="1001",{data:t,text:this.text}}},{key:"valid",value:function(){return-1!==this.data.search(/^[0-9]+$/)}}]),e}(c.default);e.default=s},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t};e.default=function(t,e){return r({},t,e)}},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(0),f=function(t){return t&&t.__esModule?t:{default:t}}(u),c=n(1),s=function(t){function e(t,n){r(this,e);var i=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t.substring(1),n));return i.bytes=t.split("").map(function(t){return t.charCodeAt(0)}),i}return i(e,t),a(e,[{key:"valid",value:function(){return/^[\x00-\x7F\xC8-\xD3]+$/.test(this.data)}},{key:"encode",value:function(){var t=this.bytes,n=t.shift()-105,r=c.SET_BY_CODE[n];if(void 0===r)throw new RangeError("The encoding does not start with a start character.");!0===this.shouldEncodeAsEan128()&&t.unshift(c.FNC1);var o=e.next(t,1,r);return{text:this.text===this.data?this.text.replace(/[^\x20-\x7E]/g,""):this.text,data:e.getBar(n)+o.result+e.getBar((o.checksum+n)%c.MODULO)+e.getBar(c.STOP)}}},{key:"shouldEncodeAsEan128",value:function(){var t=this.options.ean128||!1;return"string"==typeof t&&(t="true"===t.toLowerCase()),t}}],[{key:"getBar",value:function(t){return c.BARS[t]?c.BARS[t].toString():""}},{key:"correctIndex",value:function(t,e){if(e===c.SET_A){var n=t.shift();return n<32?n+64:n-32}return e===c.SET_B?t.shift()-32:10*(t.shift()-48)+t.shift()-48}},{key:"next",value:function(t,n,r){if(!t.length)return{result:"",checksum:0};var o=void 0,i=void 0;if(t[0]>=200){i=t.shift()-105;var a=c.SWAP[i];void 0!==a?o=e.next(t,n+1,a):(r!==c.SET_A&&r!==c.SET_B||i!==c.SHIFT||(t[0]=r===c.SET_A?t[0]>95?t[0]-96:t[0]:t[0]<32?t[0]+96:t[0]),o=e.next(t,n+1,r))}else i=e.correctIndex(t,r),o=e.next(t,n+1,r);var u=e.getBar(i),f=i*n;return{result:u+o.result,checksum:f+o.checksum}}}]),e}(f.default);e.default=s},function(t,e,n){"use strict";function r(t){for(var e=0,n=0;n<t.length;n++){var r=parseInt(t[n]);(n+t.length)%2==0?e+=r:e+=2*r%10+Math.floor(2*r/10)}return(10-e%10)%10}function o(t){for(var e=0,n=[2,3,4,5,6,7],r=0;r<t.length;r++){e+=n[r%n.length]*parseInt(t[t.length-1-r])}return(11-e%11)%11}Object.defineProperty(e,"__esModule",{value:!0}),e.mod10=r,e.mod11=o},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var a=function(t){function e(t,n){r(this,e);var i=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return i.name="InvalidInputException",i.symbology=t,i.input=n,i.message='"'+i.input+'" is not a valid input for '+i.symbology,i}return i(e,t),e}(Error),u=function(t){function e(){r(this,e);var t=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return t.name="InvalidElementException",t.message="Not supported type to render on",t}return i(e,t),e}(Error),f=function(t){function e(){r(this,e);var t=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return t.name="NoElementException",t.message="No element to render on.",t}return i(e,t),e}(Error);e.InvalidInputException=a,e.InvalidElementException=u,e.NoElementException=f},function(t,e,n){"use strict";function r(t){var e=["width","height","textMargin","fontSize","margin","marginTop","marginBottom","marginLeft","marginRight"];for(var n in e)e.hasOwnProperty(n)&&(n=e[n],"string"==typeof t[n]&&(t[n]=parseInt(t[n],10)));return"string"==typeof t.displayValue&&(t.displayValue="false"!=t.displayValue),t}Object.defineProperty(e,"__esModule",{value:!0}),e.default=r},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r={width:2,height:100,format:"auto",displayValue:!0,fontOptions:"",font:"monospace",text:void 0,textAlign:"center",textPosition:"bottom",textMargin:2,fontSize:20,background:"#ffffff",lineColor:"#000000",margin:10,marginTop:void 0,marginBottom:void 0,marginLeft:void 0,marginRight:void 0,valid:function(){}};e.default=r},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),f=n(2),c=n(3),s=r(c),l=n(0),p=r(l),d=function(t){function e(t,n){o(this,e);var r=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));return r.fontSize=!n.flat&&n.fontSize>10*n.width?10*n.width:n.fontSize,r.guardHeight=n.height+r.fontSize/2+n.textMargin,r}return a(e,t),u(e,[{key:"encode",value:function(){return this.options.flat?this.encodeFlat():this.encodeGuarded()}},{key:"leftText",value:function(t,e){return this.text.substr(t,e)}},{key:"leftEncode",value:function(t,e){return(0,s.default)(t,e)}},{key:"rightText",value:function(t,e){return this.text.substr(t,e)}},{key:"rightEncode",value:function(t,e){return(0,s.default)(t,e)}},{key:"encodeGuarded",value:function(){var t={fontSize:this.fontSize},e={height:this.guardHeight};return[{data:f.SIDE_BIN,options:e},{data:this.leftEncode(),text:this.leftText(),options:t},{data:f.MIDDLE_BIN,options:e},{data:this.rightEncode(),text:this.rightText(),options:t},{data:f.SIDE_BIN,options:e}]}},{key:"encodeFlat",value:function(){return{data:[f.SIDE_BIN,this.leftEncode(),f.MIDDLE_BIN,this.rightEncode(),f.SIDE_BIN].join(""),text:this.text}}}]),e}(p.default);e.default=d},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function u(t){var e,n=0;for(e=1;e<11;e+=2)n+=parseInt(t[e]);for(e=0;e<11;e+=2)n+=3*parseInt(t[e]);return(10-n%10)%10}Object.defineProperty(e,"__esModule",{value:!0});var f=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();e.checksum=u;var c=n(3),s=r(c),l=n(0),p=r(l),d=function(t){function e(t,n){o(this,e),-1!==t.search(/^[0-9]{11}$/)&&(t+=u(t));var r=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));return r.displayValue=n.displayValue,n.fontSize>10*n.width?r.fontSize=10*n.width:r.fontSize=n.fontSize,r.guardHeight=n.height+r.fontSize/2+n.textMargin,r}return a(e,t),f(e,[{key:"valid",value:function(){return-1!==this.data.search(/^[0-9]{12}$/)&&this.data[11]==u(this.data)}},{key:"encode",value:function(){return this.options.flat?this.flatEncoding():this.guardedEncoding()}},{key:"flatEncoding",value:function(){var t="";return t+="101",t+=(0,s.default)(this.data.substr(0,6),"LLLLLL"),t+="01010",t+=(0,s.default)(this.data.substr(6,6),"RRRRRR"),t+="101",{data:t,text:this.text}}},{key:"guardedEncoding",value:function(){var t=[];return this.displayValue&&t.push({data:"00000000",text:this.text.substr(0,1),options:{textAlign:"left",fontSize:this.fontSize}}),t.push({data:"101"+(0,s.default)(this.data[0],"L"),options:{height:this.guardHeight}}),t.push({data:(0,s.default)(this.data.substr(1,5),"LLLLL"),text:this.text.substr(1,5),options:{fontSize:this.fontSize}}),t.push({data:"01010",options:{height:this.guardHeight}}),t.push({data:(0,s.default)(this.data.substr(6,5),"RRRRR"),text:this.text.substr(6,5),options:{fontSize:this.fontSize}}),t.push({data:(0,s.default)(this.data[11],"R")+"101",options:{height:this.guardHeight}}),this.displayValue&&t.push({data:"00000000",text:this.text.substr(11,1),options:{textAlign:"right",fontSize:this.fontSize}}),t}}]),e}(p.default);e.default=d},function(t,e,n){"use strict";function r(t,e){return e.height+(e.displayValue&&t.text.length>0?e.fontSize+e.textMargin:0)+e.marginTop+e.marginBottom}function o(t,e,n){if(n.displayValue&&e<t){if("center"==n.textAlign)return Math.floor((t-e)/2);if("left"==n.textAlign)return 0;if("right"==n.textAlign)return Math.floor(t-e)}return 0}function i(t,e,n){for(var i=0;i<t.length;i++){var a,u=t[i],c=(0,s.default)(e,u.options);a=c.displayValue?f(u.text,c,n):0;var l=u.data.length*c.width;u.width=Math.ceil(Math.max(a,l)),u.height=r(u,c),u.barcodePadding=o(a,l,c)}}function a(t){for(var e=0,n=0;n<t.length;n++)e+=t[n].width;return e}function u(t){for(var e=0,n=0;n<t.length;n++)t[n].height>e&&(e=t[n].height);return e}function f(t,e,n){var r;if(n)r=n;else{if("undefined"==typeof document)return 0;r=document.createElement("canvas").getContext("2d")}return r.font=e.fontOptions+" "+e.fontSize+"px "+e.font,r.measureText(t).width}Object.defineProperty(e,"__esModule",{value:!0}),e.getTotalWidthOfEncodings=e.calculateEncodingAttributes=e.getBarcodePadding=e.getEncodingHeight=e.getMaximumHeightOfEncodings=void 0;var c=n(5),s=function(t){return t&&t.__esModule?t:{default:t}}(c);e.getMaximumHeightOfEncodings=u,e.getEncodingHeight=r,e.getBarcodePadding=o,e.calculateEncodingAttributes=i,e.getTotalWidthOfEncodings=a},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(26),o=n(25),i=n(32),a=n(35),u=n(34),f=n(40),c=n(42),s=n(41),l=n(33);e.default={CODE39:r.CODE39,CODE128:o.CODE128,CODE128A:o.CODE128A,CODE128B:o.CODE128B,CODE128C:o.CODE128C,EAN13:i.EAN13,EAN8:i.EAN8,EAN5:i.EAN5,EAN2:i.EAN2,UPC:i.UPC,UPCE:i.UPCE,ITF14:a.ITF14,ITF:u.ITF,MSI:f.MSI,MSI10:f.MSI10,MSI11:f.MSI11,MSI1010:f.MSI1010,MSI1110:f.MSI1110,pharmacode:c.pharmacode,codabar:s.codabar,GenericBarcode:l.GenericBarcode}},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=function(){function t(e){r(this,t),this.api=e}return o(t,[{key:"handleCatch",value:function(t){if("InvalidInputException"!==t.name)throw t;if(this.api._options.valid===this.api._defaults.valid)throw t.message;this.api._options.valid(!1),this.api.render=function(){}}},{key:"wrapBarcodeCall",value:function(t){try{var e=t.apply(void 0,arguments);return this.api._options.valid(!0),e}catch(t){return this.handleCatch(t),this.api}}}]),t}();e.default=i},function(t,e,n){"use strict";function r(t){return t.marginTop=t.marginTop||t.margin,t.marginBottom=t.marginBottom||t.margin,t.marginRight=t.marginRight||t.margin,t.marginLeft=t.marginLeft||t.margin,t}Object.defineProperty(e,"__esModule",{value:!0}),e.default=r},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t){if("string"==typeof t)return i(t);if(Array.isArray(t)){for(var e=[],n=0;n<t.length;n++)e.push(o(t[n]));return e}if("undefined"!=typeof HTMLCanvasElement&&t instanceof HTMLImageElement)return a(t);if(t&&"svg"===t.nodeName||"undefined"!=typeof SVGElement&&t instanceof SVGElement)return{element:t,options:(0,c.default)(t),renderer:l.default.SVGRenderer};if("undefined"!=typeof HTMLCanvasElement&&t instanceof HTMLCanvasElement)return{element:t,options:(0,c.default)(t),renderer:l.default.CanvasRenderer};if(t&&t.getContext)return{element:t,renderer:l.default.CanvasRenderer};if(t&&"object"===(void 0===t?"undefined":u(t))&&!t.nodeName)return{element:t,renderer:l.default.ObjectRenderer};throw new p.InvalidElementException}function i(t){var e=document.querySelectorAll(t);if(0!==e.length){for(var n=[],r=0;r<e.length;r++)n.push(o(e[r]));return n}}function a(t){var e=document.createElement("canvas");return{element:e,options:(0,c.default)(t),renderer:l.default.CanvasRenderer,afterRender:function(){t.setAttribute("src",e.toDataURL())}}}Object.defineProperty(e,"__esModule",{value:!0});var u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},f=n(43),c=r(f),s=n(45),l=r(s),p=n(8);e.default=o},function(t,e,n){"use strict";function r(t){function e(t){if(Array.isArray(t))for(var r=0;r<t.length;r++)e(t[r]);else t.text=t.text||"",t.data=t.data||"",n.push(t)}var n=[];return e(t),n}Object.defineProperty(e,"__esModule",{value:!0}),e.default=r},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e,n){t=""+t;var r=new e(t,n);if(!r.valid())throw new E.InvalidInputException(r.constructor.name,t);var o=r.encode();o=(0,p.default)(o);for(var i=0;i<o.length;i++)o[i].options=(0,s.default)(n,o[i].options);return o}function i(){return f.default.CODE128?"CODE128":Object.keys(f.default)[0]}function a(t,e,n){e=(0,p.default)(e);for(var r=0;r<e.length;r++)e[r].options=(0,s.default)(n,e[r].options),(0,h.default)(e[r].options);(0,h.default)(n),new(0,t.renderer)(t.element,e,n).render(),t.afterRender&&t.afterRender()}var u=n(14),f=r(u),c=n(5),s=r(c),l=n(18),p=r(l),d=n(16),h=r(d),y=n(17),b=r(y),v=n(9),_=r(v),g=n(15),O=r(g),E=n(8),w=n(10),m=r(w),j=function(){},x=function(t,e,n){var r=new j;if(void 0===t)throw Error("No element to render on was provided.");return r._renderProperties=(0,b.default)(t),r._encodings=[],r._options=m.default,r._errorHandler=new O.default(r),void 0!==e&&(n=n||{},n.format||(n.format=i()),r.options(n)[n.format](e,n).render()),r};x.getModule=function(t){return f.default[t]};for(var P in f.default)f.default.hasOwnProperty(P)&&function(t,e){j.prototype[e]=j.prototype[e.toUpperCase()]=j.prototype[e.toLowerCase()]=function(n,r){var i=this;return i._errorHandler.wrapBarcodeCall(function(){r.text=void 0===r.text?void 0:""+r.text;var a=(0,s.default)(i._options,r);a=(0,_.default)(a);var u=t[e],f=o(n,u,a);return i._encodings.push(f),i})}}(f.default,P);j.prototype.options=function(t){return this._options=(0,s.default)(this._options,t),this},j.prototype.blank=function(t){var e=new Array(t+1).join("0");return this._encodings.push({data:e}),this},j.prototype.init=function(){if(this._renderProperties){Array.isArray(this._renderProperties)||(this._renderProperties=[this._renderProperties]);var t;for(var e in this._renderProperties){t=this._renderProperties[e];var n=(0,s.default)(this._options,t.options);"auto"==n.format&&(n.format=i()),this._errorHandler.wrapBarcodeCall(function(){var e=n.value,r=f.default[n.format.toUpperCase()],i=o(e,r,n);a(t,i,n)})}}},j.prototype.render=function(){if(!this._renderProperties)throw new E.NoElementException;if(Array.isArray(this._renderProperties))for(var t=0;t<this._renderProperties.length;t++)a(this._renderProperties[t],this._encodings,this._options);else a(this._renderProperties,this._encodings,this._options);return this},j.prototype._defaults=m.default,"undefined"!=typeof window&&(window.JsBarcode=x),"undefined"!=typeof jQuery&&(jQuery.fn.JsBarcode=function(t,e){var n=[];return jQuery(this).each(function(){n.push(this)}),x(n,t,e)}),t.exports=x},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(6),f=function(t){return t&&t.__esModule?t:{default:t}}(u),c=n(1),s=function(t){function e(t,n){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,c.A_START_CHAR+t,n))}return i(e,t),a(e,[{key:"valid",value:function(){return new RegExp("^"+c.A_CHARS+"+$").test(this.data)}}]),e}(f.default);e.default=s},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(6),f=function(t){return t&&t.__esModule?t:{default:t}}(u),c=n(1),s=function(t){function e(t,n){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,c.B_START_CHAR+t,n))}return i(e,t),a(e,[{key:"valid",value:function(){return new RegExp("^"+c.B_CHARS+"+$").test(this.data)}}]),e}(f.default);e.default=s},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(6),f=function(t){return t&&t.__esModule?t:{default:t}}(u),c=n(1),s=function(t){function e(t,n){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,c.C_START_CHAR+t,n))}return i(e,t),a(e,[{key:"valid",value:function(){return new RegExp("^"+c.C_CHARS+"+$").test(this.data)}}]),e}(f.default);e.default=s},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var u=n(6),f=r(u),c=n(24),s=r(c),l=function(t){function e(t,n){if(o(this,e),/^[\x00-\x7F\xC8-\xD3]+$/.test(t))var r=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,(0,s.default)(t),n));else var r=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));return i(r)}return a(e,t),e}(f.default);e.default=l},function(t,e,n){"use strict";function r(t,e){var n=e?i.A_CHARS:i.B_CHARS,a=t.match(new RegExp("^("+n+"+?)(([0-9]{2}){2,})([^0-9]|$)"));if(a)return a[1]+String.fromCharCode(204)+o(t.substring(a[1].length));var u=t.match(new RegExp("^"+n+"+"))[0];return u.length===t.length?t:u+String.fromCharCode(e?205:206)+r(t.substring(u.length),!e)}function o(t){var e=f(t),n=e.length;if(n===t.length)return t;t=t.substring(n);var o=a(t)>=u(t);return e+String.fromCharCode(o?206:205)+r(t,o)}Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),a=function(t){return t.match(new RegExp("^"+i.A_CHARS+"*"))[0].length},u=function(t){return t.match(new RegExp("^"+i.B_CHARS+"*"))[0].length},f=function(t){return t.match(new RegExp("^"+i.C_CHARS+"*"))[0]};e.default=function(t){var e=void 0;if(f(t).length>=2)e=i.C_START_CHAR+o(t);else{var n=a(t)>u(t);e=(n?i.A_START_CHAR:i.B_START_CHAR)+r(t,n)}return e.replace(/[\xCD\xCE]([^])[\xCD\xCE]/,function(t,e){return String.fromCharCode(203)+e})}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.CODE128C=e.CODE128B=e.CODE128A=e.CODE128=void 0;var o=n(23),i=r(o),a=n(20),u=r(a),f=n(21),c=r(f),s=n(22),l=r(s);e.CODE128=i.default,e.CODE128A=u.default,e.CODE128B=c.default,e.CODE128C=l.default},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function a(t){return u(c(t))}function u(t){return b[t].toString(2)}function f(t){return y[t]}function c(t){return y.indexOf(t)}function s(t){for(var e=0,n=0;n<t.length;n++)e+=c(t[n]);return e%=43}Object.defineProperty(e,"__esModule",{value:!0}),e.CODE39=void 0;var l=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),p=n(0),d=function(t){return t&&t.__esModule?t:{default:t}}(p),h=function(t){function e(t,n){return r(this,e),t=t.toUpperCase(),n.mod43&&(t+=f(s(t))),o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n))}return i(e,t),l(e,[{key:"encode",value:function(){for(var t=a("*"),e=0;e<this.data.length;e++)t+=a(this.data[e])+"0";return t+=a("*"),{data:t,text:this.text}}},{key:"valid",value:function(){return-1!==this.data.search(/^[0-9A-Z\-\.\ \$\/\+\%]+$/)}}]),e}(d.default),y=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","-","."," ","$","/","+","%","*"],b=[20957,29783,23639,30485,20951,29813,23669,20855,29789,23645,29975,23831,30533,22295,30149,24005,21623,29981,23837,22301,30023,23879,30545,22343,30161,24017,21959,30065,23921,22385,29015,18263,29141,17879,29045,18293,17783,29021,18269,17477,17489,17681,20753,35770];e.CODE39=h},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=function t(e,n,r){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,n);if(void 0===o){var i=Object.getPrototypeOf(e);return null===i?void 0:t(i,n,r)}if("value"in o)return o.value;var a=o.get;if(void 0!==a)return a.call(r)},f=n(2),c=n(11),s=function(t){return t&&t.__esModule?t:{default:t}}(c),l=function(t){return(10-t.substr(0,12).split("").map(function(t){return+t}).reduce(function(t,e,n){return n%2?t+3*e:t+e},0)%10)%10},p=function(t){function e(t,n){r(this,e),-1!==t.search(/^[0-9]{12}$/)&&(t+=l(t));var i=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));return i.lastChar=n.lastChar,i}return i(e,t),a(e,[{key:"valid",value:function(){return-1!==this.data.search(/^[0-9]{13}$/)&&+this.data[12]===l(this.data)}},{key:"leftText",value:function(){return u(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"leftText",this).call(this,1,6)}},{key:"leftEncode",value:function(){var t=this.data.substr(1,6),n=f.EAN13_STRUCTURE[this.data[0]];return u(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"leftEncode",this).call(this,t,n)}},{key:"rightText",value:function(){return u(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"rightText",this).call(this,7,6)}},{key:"rightEncode",value:function(){var t=this.data.substr(7,6);return u(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"rightEncode",this).call(this,t,"RRRRRR")}},{key:"encodeGuarded",value:function(){var t=u(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"encodeGuarded",this).call(this);return this.options.displayValue&&(t.unshift({data:"000000000000",text:this.text.substr(0,1),options:{textAlign:"left",fontSize:this.fontSize}}),this.options.lastChar&&(t.push({data:"00"}),t.push({data:"00000",text:this.options.lastChar,options:{fontSize:this.fontSize}}))),t}}]),e}(s.default);e.default=p},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),f=n(2),c=n(3),s=r(c),l=n(0),p=r(l),d=function(t){function e(t,n){return o(this,e),i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n))}return a(e,t),u(e,[{key:"valid",value:function(){return-1!==this.data.search(/^[0-9]{2}$/)}},{key:"encode",value:function(){var t=f.EAN2_STRUCTURE[parseInt(this.data)%4];return{data:"1011"+(0,s.default)(this.data,t,"01"),text:this.text}}}]),e}(p.default);e.default=d},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),f=n(2),c=n(3),s=r(c),l=n(0),p=r(l),d=function(t){return t.split("").map(function(t){return+t}).reduce(function(t,e,n){return n%2?t+9*e:t+3*e},0)%10},h=function(t){function e(t,n){return o(this,e),i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n))}return a(e,t),u(e,[{key:"valid",value:function(){return-1!==this.data.search(/^[0-9]{5}$/)}},{key:"encode",value:function(){var t=f.EAN5_STRUCTURE[d(this.data)];return{data:"1011"+(0,s.default)(this.data,t,"01"),text:this.text}}}]),e}(p.default);e.default=h},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=function t(e,n,r){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,n);if(void 0===o){var i=Object.getPrototypeOf(e);return null===i?void 0:t(i,n,r)}if("value"in o)return o.value;var a=o.get;if(void 0!==a)return a.call(r)},f=n(11),c=function(t){return t&&t.__esModule?t:{default:t}}(f),s=function(t){return(10-t.substr(0,7).split("").map(function(t){return+t}).reduce(function(t,e,n){return n%2?t+e:t+3*e},0)%10)%10},l=function(t){function e(t,n){return r(this,e),-1!==t.search(/^[0-9]{7}$/)&&(t+=s(t)),o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n))}return i(e,t),a(e,[{key:"valid",value:function(){return-1!==this.data.search(/^[0-9]{8}$/)&&+this.data[7]===s(this.data)}},{key:"leftText",value:function(){return u(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"leftText",this).call(this,0,4)}},{key:"leftEncode",value:function(){var t=this.data.substr(0,4);return u(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"leftEncode",this).call(this,t,"LLLL")}},{key:"rightText",value:function(){return u(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"rightText",this).call(this,4,4)}},{key:"rightEncode",value:function(){var t=this.data.substr(4,4);return u(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"rightEncode",this).call(this,t,"RRRR")}}]),e}(c.default);e.default=l},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function u(t,e){for(var n=parseInt(t[t.length-1]),r=h[n],o="",i=0,a=0;a<r.length;a++){var u=r[a];o+="X"===u?t[i++]:u}return""+(o=""+e+o)+(0,d.checksum)(o)}Object.defineProperty(e,"__esModule",{value:!0});var f=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),c=n(3),s=r(c),l=n(0),p=r(l),d=n(12),h=["XX00000XXX","XX10000XXX","XX20000XXX","XXX00000XX","XXXX00000X","XXXXX00005","XXXXX00006","XXXXX00007","XXXXX00008","XXXXX00009"],y=[["EEEOOO","OOOEEE"],["EEOEOO","OOEOEE"],["EEOOEO","OOEEOE"],["EEOOOE","OOEEEO"],["EOEEOO","OEOOEE"],["EOOEEO","OEEOOE"],["EOOOEE","OEEEOO"],["EOEOEO","OEOEOE"],["EOEOOE","OEOEEO"],["EOOEOE","OEEOEO"]],b=function(t){function e(t,n){o(this,e);var r=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));if(r.isValid=!1,-1!==t.search(/^[0-9]{6}$/))r.middleDigits=t,r.upcA=u(t,"0"),r.text=n.text||""+r.upcA[0]+t+r.upcA[r.upcA.length-1],r.isValid=!0;else{if(-1===t.search(/^[01][0-9]{7}$/))return i(r);if(r.middleDigits=t.substring(1,t.length-1),r.upcA=u(r.middleDigits,t[0]),r.upcA[r.upcA.length-1]!==t[t.length-1])return i(r);r.isValid=!0}return r.displayValue=n.displayValue,n.fontSize>10*n.width?r.fontSize=10*n.width:r.fontSize=n.fontSize,r.guardHeight=n.height+r.fontSize/2+n.textMargin,r}return a(e,t),f(e,[{key:"valid",value:function(){return this.isValid}},{key:"encode",value:function(){return this.options.flat?this.flatEncoding():this.guardedEncoding()}},{key:"flatEncoding",value:function(){var t="";return t+="101",t+=this.encodeMiddleDigits(),t+="010101",{data:t,text:this.text}}},{key:"guardedEncoding",value:function(){var t=[];return this.displayValue&&t.push({data:"00000000",text:this.text[0],options:{textAlign:"left",fontSize:this.fontSize}}),t.push({data:"101",options:{height:this.guardHeight}}),t.push({data:this.encodeMiddleDigits(),text:this.text.substring(1,7),options:{fontSize:this.fontSize}}),t.push({data:"010101",options:{height:this.guardHeight}}),this.displayValue&&t.push({data:"00000000",text:this.text[7],options:{textAlign:"right",fontSize:this.fontSize}}),t}},{key:"encodeMiddleDigits",value:function(){var t=this.upcA[0],e=this.upcA[this.upcA.length-1],n=y[parseInt(e)][parseInt(t)];return(0,s.default)(this.middleDigits,n)}}]),e}(p.default);e.default=b},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.UPCE=e.UPC=e.EAN2=e.EAN5=e.EAN8=e.EAN13=void 0;var o=n(27),i=r(o),a=n(30),u=r(a),f=n(29),c=r(f),s=n(28),l=r(s),p=n(12),d=r(p),h=n(31),y=r(h);e.EAN13=i.default,e.EAN8=u.default,e.EAN5=c.default,e.EAN2=l.default,e.UPC=d.default,e.UPCE=y.default},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0}),e.GenericBarcode=void 0;var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(0),f=function(t){return t&&t.__esModule?t:{default:t}}(u),c=function(t){function e(t,n){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n))}return i(e,t),a(e,[{key:"encode",value:function(){return{data:"10101010101010101010101010101010101010101",text:this.text}}},{key:"valid",value:function(){return!0}}]),e}(f.default);e.GenericBarcode=c},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0}),e.ITF=void 0;var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(0),f=function(t){return t&&t.__esModule?t:{default:t}}(u),c=function(t){function e(t,n){r(this,e);var i=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));return i.binaryRepresentation={0:"00110",1:"10001",2:"01001",3:"11000",4:"00101",5:"10100",6:"01100",7:"00011",8:"10010",9:"01010"},i}return i(e,t),a(e,[{key:"valid",value:function(){return-1!==this.data.search(/^([0-9]{2})+$/)}},{key:"encode",value:function(){for(var t="1010",e=0;e<this.data.length;e+=2)t+=this.calculatePair(this.data.substr(e,2));return t+="11101",{data:t,text:this.text}}},{key:"calculatePair",value:function(t){for(var e="",n=this.binaryRepresentation[t[0]],r=this.binaryRepresentation[t[1]],o=0;o<5;o++)e+="1"==n[o]?"111":"1",e+="1"==r[o]?"000":"0";return e}}]),e}(f.default);e.ITF=c},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function a(t){for(var e=0,n=0;n<13;n++)e+=parseInt(t[n])*(3-n%2*2);return 10*Math.ceil(e/10)-e}Object.defineProperty(e,"__esModule",{value:!0}),e.ITF14=void 0;var u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),f=n(0),c=function(t){return t&&t.__esModule?t:{default:t}}(f),s=function(t){function e(t,n){r(this,e),-1!==t.search(/^[0-9]{13}$/)&&(t+=a(t));var i=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));return i.binaryRepresentation={0:"00110",1:"10001",2:"01001",3:"11000",4:"00101",5:"10100",6:"01100",7:"00011",8:"10010",9:"01010"},i}return i(e,t),u(e,[{key:"valid",value:function(){return-1!==this.data.search(/^[0-9]{14}$/)&&this.data[13]==a(this.data)}},{key:"encode",value:function(){for(var t="1010",e=0;e<14;e+=2)t+=this.calculatePair(this.data.substr(e,2));return t+="11101",{data:t,text:this.text}}},{key:"calculatePair",value:function(t){for(var e="",n=this.binaryRepresentation[t[0]],r=this.binaryRepresentation[t[1]],o=0;o<5;o++)e+="1"==n[o]?"111":"1",e+="1"==r[o]?"000":"0";return e}}]),e}(c.default);e.ITF14=s},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var a=n(4),u=function(t){return t&&t.__esModule?t:{default:t}}(a),f=n(7),c=function(t){function e(t,n){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t+(0,f.mod10)(t),n))}return i(e,t),e}(u.default);e.default=c},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var a=n(4),u=function(t){return t&&t.__esModule?t:{default:t}}(a),f=n(7),c=function(t){function e(t,n){return r(this,e),t+=(0,f.mod10)(t),t+=(0,f.mod10)(t),o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n))}return i(e,t),e}(u.default);e.default=c},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var a=n(4),u=function(t){return t&&t.__esModule?t:{default:t}}(a),f=n(7),c=function(t){function e(t,n){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t+(0,f.mod11)(t),n))}return i(e,t),e}(u.default);e.default=c},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var a=n(4),u=function(t){return t&&t.__esModule?t:{default:t}}(a),f=n(7),c=function(t){function e(t,n){return r(this,e),t+=(0,f.mod11)(t),t+=(0,f.mod10)(t),o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n))}return i(e,t),e}(u.default);e.default=c},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.MSI1110=e.MSI1010=e.MSI11=e.MSI10=e.MSI=void 0;var o=n(4),i=r(o),a=n(36),u=r(a),f=n(38),c=r(f),s=n(37),l=r(s),p=n(39),d=r(p);e.MSI=i.default,e.MSI10=u.default,e.MSI11=c.default,e.MSI1010=l.default,e.MSI1110=d.default},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0}),e.codabar=void 0;var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(0),f=function(t){return t&&t.__esModule?t:{default:t}}(u),c=function(t){function e(t,n){r(this,e),0===t.search(/^[0-9\-\$\:\.\+\/]+$/)&&(t="A"+t+"A");var i=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t.toUpperCase(),n));return i.text=i.options.text||i.text.replace(/[A-D]/g,""),i}return i(e,t),a(e,[{key:"valid",value:function(){return-1!==this.data.search(/^[A-D][0-9\-\$\:\.\+\/]+[A-D]$/)}},{key:"encode",value:function(){for(var t=[],e=this.getEncodings(),n=0;n<this.data.length;n++)t.push(e[this.data.charAt(n)]),n!==this.data.length-1&&t.push("0");return{text:this.text,data:t.join("")}}},{key:"getEncodings",value:function(){return{0:"101010011",1:"101011001",2:"101001011",3:"110010101",4:"101101001",5:"110101001",6:"100101011",7:"100101101",8:"100110101",9:"110100101","-":"101001101",$:"101100101",":":"1101011011","/":"1101101011",".":"1101101101","+":"101100110011",A:"1011001001",B:"1001001011",C:"1010010011",D:"1010011001"}}}]),e}(f.default);e.codabar=c},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0}),e.pharmacode=void 0;var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(0),f=function(t){return t&&t.__esModule?t:{default:t}}(u),c=function(t){function e(t,n){r(this,e);var i=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));return i.number=parseInt(t,10),i}return i(e,t),a(e,[{key:"encode",value:function(){for(var t=this.number,e="";!isNaN(t)&&0!=t;)t%2==0?(e="11100"+e,t=(t-2)/2):(e="100"+e,t=(t-1)/2);return e=e.slice(0,-2),{data:e,text:this.text}}},{key:"valid",value:function(){return this.number>=3&&this.number<=131070}}]),e}(f.default);e.pharmacode=c},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t){var e={};for(var n in f.default)f.default.hasOwnProperty(n)&&(t.hasAttribute("jsbarcode-"+n.toLowerCase())&&(e[n]=t.getAttribute("jsbarcode-"+n.toLowerCase())),t.hasAttribute("data-"+n.toLowerCase())&&(e[n]=t.getAttribute("data-"+n.toLowerCase())));return e.value=t.getAttribute("jsbarcode-value")||t.getAttribute("data-value"),e=(0,a.default)(e)}Object.defineProperty(e,"__esModule",{value:!0});var i=n(9),a=r(i),u=n(10),f=r(u);e.default=o},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=n(5),a=function(t){return t&&t.__esModule?t:{default:t}}(i),u=n(13),f=function(){function t(e,n,o){r(this,t),this.canvas=e,this.encodings=n,this.options=o}return o(t,[{key:"render",value:function(){if(!this.canvas.getContext)throw new Error("The browser does not support canvas.");this.prepareCanvas();for(var t=0;t<this.encodings.length;t++){var e=(0,a.default)(this.options,this.encodings[t].options);this.drawCanvasBarcode(e,this.encodings[t]),this.drawCanvasText(e,this.encodings[t]),this.moveCanvasDrawing(this.encodings[t])}this.restoreCanvas()}},{key:"prepareCanvas",value:function(){var t=this.canvas.getContext("2d");t.save(),(0,u.calculateEncodingAttributes)(this.encodings,this.options,t);var e=(0,u.getTotalWidthOfEncodings)(this.encodings),n=(0,u.getMaximumHeightOfEncodings)(this.encodings);this.canvas.width=e+this.options.marginLeft+this.options.marginRight,this.canvas.height=n,t.clearRect(0,0,this.canvas.width,this.canvas.height),this.options.background&&(t.fillStyle=this.options.background,t.fillRect(0,0,this.canvas.width,this.canvas.height)),t.translate(this.options.marginLeft,0)}},{key:"drawCanvasBarcode",value:function(t,e){var n,r=this.canvas.getContext("2d"),o=e.data;n="top"==t.textPosition?t.marginTop+t.fontSize+t.textMargin:t.marginTop,r.fillStyle=t.lineColor;for(var i=0;i<o.length;i++){var a=i*t.width+e.barcodePadding;"1"===o[i]?r.fillRect(a,n,t.width,t.height):o[i]&&r.fillRect(a,n,t.width,t.height*o[i])}}},{key:"drawCanvasText",value:function(t,e){var n=this.canvas.getContext("2d"),r=t.fontOptions+" "+t.fontSize+"px "+t.font;if(t.displayValue){var o,i;i="top"==t.textPosition?t.marginTop+t.fontSize-t.textMargin:t.height+t.textMargin+t.marginTop+t.fontSize,n.font=r,"left"==t.textAlign||e.barcodePadding>0?(o=0,n.textAlign="left"):"right"==t.textAlign?(o=e.width-1,n.textAlign="right"):(o=e.width/2,n.textAlign="center"),n.fillText(e.text,o,i)}}},{key:"moveCanvasDrawing",value:function(t){this.canvas.getContext("2d").translate(t.width,0)}},{key:"restoreCanvas",value:function(){this.canvas.getContext("2d").restore()}}]),t}();e.default=f},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(44),i=r(o),a=n(47),u=r(a),f=n(46),c=r(f);e.default={CanvasRenderer:i.default,SVGRenderer:u.default,ObjectRenderer:c.default}},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=function(){function t(e,n,o){r(this,t),this.object=e,this.encodings=n,this.options=o}return o(t,[{key:"render",value:function(){this.object.encodings=this.encodings}}]),t}();e.default=i},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=n(5),a=function(t){return t&&t.__esModule?t:{default:t}}(i),u=n(13),f="http://www.w3.org/2000/svg",c=function(){function t(e,n,o){r(this,t),this.svg=e,this.encodings=n,this.options=o,this.document=o.xmlDocument||document}return o(t,[{key:"render",value:function(){var t=this.options.marginLeft;this.prepareSVG();for(var e=0;e<this.encodings.length;e++){var n=this.encodings[e],r=(0,a.default)(this.options,n.options),o=this.createGroup(t,r.marginTop,this.svg);this.setGroupOptions(o,r),this.drawSvgBarcode(o,r,n),this.drawSVGText(o,r,n),t+=n.width}}},{key:"prepareSVG",value:function(){for(;this.svg.firstChild;)this.svg.removeChild(this.svg.firstChild);(0,u.calculateEncodingAttributes)(this.encodings,this.options);var t=(0,u.getTotalWidthOfEncodings)(this.encodings),e=(0,u.getMaximumHeightOfEncodings)(this.encodings),n=t+this.options.marginLeft+this.options.marginRight;this.setSvgAttributes(n,e),this.options.background&&this.drawRect(0,0,n,e,this.svg).setAttribute("style","fill:"+this.options.background+";")}},{key:"drawSvgBarcode",value:function(t,e,n){var r,o=n.data;r="top"==e.textPosition?e.fontSize+e.textMargin:0;for(var i=0,a=0,u=0;u<o.length;u++)a=u*e.width+n.barcodePadding,"1"===o[u]?i++:i>0&&(this.drawRect(a-e.width*i,r,e.width*i,e.height,t),i=0);i>0&&this.drawRect(a-e.width*(i-1),r,e.width*i,e.height,t)}},{key:"drawSVGText",value:function(t,e,n){var r=this.document.createElementNS(f,"text");if(e.displayValue){var o,i;r.setAttribute("style","font:"+e.fontOptions+" "+e.fontSize+"px "+e.font),i="top"==e.textPosition?e.fontSize-e.textMargin:e.height+e.textMargin+e.fontSize,"left"==e.textAlign||n.barcodePadding>0?(o=0,r.setAttribute("text-anchor","start")):"right"==e.textAlign?(o=n.width-1,r.setAttribute("text-anchor","end")):(o=n.width/2,r.setAttribute("text-anchor","middle")),r.setAttribute("x",o),r.setAttribute("y",i),r.appendChild(this.document.createTextNode(n.text)),t.appendChild(r)}}},{key:"setSvgAttributes",value:function(t,e){var n=this.svg;n.setAttribute("width",t+"px"),n.setAttribute("height",e+"px"),n.setAttribute("x","0px"),n.setAttribute("y","0px"),n.setAttribute("viewBox","0 0 "+t+" "+e),n.setAttribute("xmlns",f),n.setAttribute("version","1.1"),n.setAttribute("style","transform: translate(0,0)")}},{key:"createGroup",value:function(t,e,n){var r=this.document.createElementNS(f,"g");return r.setAttribute("transform","translate("+t+", "+e+")"),n.appendChild(r),r}},{key:"setGroupOptions",value:function(t,e){t.setAttribute("style","fill:"+e.lineColor+";")}},{key:"drawRect",value:function(t,e,n,r,o){var i=this.document.createElementNS(f,"rect");return i.setAttribute("x",t),i.setAttribute("y",e),i.setAttribute("width",n),i.setAttribute("height",r),o.appendChild(i),i}}]),t}();e.default=c}]);
;
//# sourceMappingURL=scripts.bundle.js.map