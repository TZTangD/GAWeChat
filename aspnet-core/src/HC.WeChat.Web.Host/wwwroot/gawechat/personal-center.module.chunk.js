webpackJsonp(["personal-center.module"],{

/***/ "./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/JsBarcode.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _barcodes = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/index.js");

var _barcodes2 = _interopRequireDefault(_barcodes);

var _merge = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/help/merge.js");

var _merge2 = _interopRequireDefault(_merge);

var _linearizeEncodings = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/help/linearizeEncodings.js");

var _linearizeEncodings2 = _interopRequireDefault(_linearizeEncodings);

var _fixOptions = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/help/fixOptions.js");

var _fixOptions2 = _interopRequireDefault(_fixOptions);

var _getRenderProperties = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/help/getRenderProperties.js");

var _getRenderProperties2 = _interopRequireDefault(_getRenderProperties);

var _optionsFromStrings = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/help/optionsFromStrings.js");

var _optionsFromStrings2 = _interopRequireDefault(_optionsFromStrings);

var _ErrorHandler = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/exceptions/ErrorHandler.js");

var _ErrorHandler2 = _interopRequireDefault(_ErrorHandler);

var _exceptions = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/exceptions/exceptions.js");

var _defaults = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/options/defaults.js");

var _defaults2 = _interopRequireDefault(_defaults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// The protype of the object returned from the JsBarcode() call


// Help functions
var API = function API() {};

// The first call of the library API
// Will return an object with all barcodes calls and the data that is used
// by the renderers


// Default values


// Exceptions
// Import all the barcodes
var JsBarcode = function JsBarcode(element, text, options) {
	var api = new API();

	if (typeof element === "undefined") {
		throw Error("No element to render on was provided.");
	}

	// Variables that will be pased through the API calls
	api._renderProperties = (0, _getRenderProperties2.default)(element);
	api._encodings = [];
	api._options = _defaults2.default;
	api._errorHandler = new _ErrorHandler2.default(api);

	// If text is set, use the simple syntax (render the barcode directly)
	if (typeof text !== "undefined") {
		options = options || {};

		if (!options.format) {
			options.format = autoSelectBarcode();
		}

		api.options(options)[options.format](text, options).render();
	}

	return api;
};

// To make tests work TODO: remove
JsBarcode.getModule = function (name) {
	return _barcodes2.default[name];
};

// Register all barcodes
for (var name in _barcodes2.default) {
	if (_barcodes2.default.hasOwnProperty(name)) {
		// Security check if the propery is a prototype property
		registerBarcode(_barcodes2.default, name);
	}
}
function registerBarcode(barcodes, name) {
	API.prototype[name] = API.prototype[name.toUpperCase()] = API.prototype[name.toLowerCase()] = function (text, options) {
		var api = this;
		return api._errorHandler.wrapBarcodeCall(function () {
			// Ensure text is options.text
			options.text = typeof options.text === 'undefined' ? undefined : '' + options.text;

			var newOptions = (0, _merge2.default)(api._options, options);
			newOptions = (0, _optionsFromStrings2.default)(newOptions);
			var Encoder = barcodes[name];
			var encoded = encode(text, Encoder, newOptions);
			api._encodings.push(encoded);

			return api;
		});
	};
}

// encode() handles the Encoder call and builds the binary string to be rendered
function encode(text, Encoder, options) {
	// Ensure that text is a string
	text = "" + text;

	var encoder = new Encoder(text, options);

	// If the input is not valid for the encoder, throw error.
	// If the valid callback option is set, call it instead of throwing error
	if (!encoder.valid()) {
		throw new _exceptions.InvalidInputException(encoder.constructor.name, text);
	}

	// Make a request for the binary data (and other infromation) that should be rendered
	var encoded = encoder.encode();

	// Encodings can be nestled like [[1-1, 1-2], 2, [3-1, 3-2]
	// Convert to [1-1, 1-2, 2, 3-1, 3-2]
	encoded = (0, _linearizeEncodings2.default)(encoded);

	// Merge
	for (var i = 0; i < encoded.length; i++) {
		encoded[i].options = (0, _merge2.default)(options, encoded[i].options);
	}

	return encoded;
}

function autoSelectBarcode() {
	// If CODE128 exists. Use it
	if (_barcodes2.default["CODE128"]) {
		return "CODE128";
	}

	// Else, take the first (probably only) barcode
	return Object.keys(_barcodes2.default)[0];
}

// Sets global encoder options
// Added to the api by the JsBarcode function
API.prototype.options = function (options) {
	this._options = (0, _merge2.default)(this._options, options);
	return this;
};

// Will create a blank space (usually in between barcodes)
API.prototype.blank = function (size) {
	var zeroes = new Array(size + 1).join("0");
	this._encodings.push({ data: zeroes });
	return this;
};

// Initialize JsBarcode on all HTML elements defined.
API.prototype.init = function () {
	// Should do nothing if no elements where found
	if (!this._renderProperties) {
		return;
	}

	// Make sure renderProperies is an array
	if (!Array.isArray(this._renderProperties)) {
		this._renderProperties = [this._renderProperties];
	}

	var renderProperty;
	for (var i in this._renderProperties) {
		renderProperty = this._renderProperties[i];
		var options = (0, _merge2.default)(this._options, renderProperty.options);

		if (options.format == "auto") {
			options.format = autoSelectBarcode();
		}

		this._errorHandler.wrapBarcodeCall(function () {
			var text = options.value;
			var Encoder = _barcodes2.default[options.format.toUpperCase()];
			var encoded = encode(text, Encoder, options);

			render(renderProperty, encoded, options);
		});
	}
};

// The render API call. Calls the real render function.
API.prototype.render = function () {
	if (!this._renderProperties) {
		throw new _exceptions.NoElementException();
	}

	if (Array.isArray(this._renderProperties)) {
		for (var i = 0; i < this._renderProperties.length; i++) {
			render(this._renderProperties[i], this._encodings, this._options);
		}
	} else {
		render(this._renderProperties, this._encodings, this._options);
	}

	return this;
};

API.prototype._defaults = _defaults2.default;

// Prepares the encodings and calls the renderer
function render(renderProperties, encodings, options) {
	encodings = (0, _linearizeEncodings2.default)(encodings);

	for (var i = 0; i < encodings.length; i++) {
		encodings[i].options = (0, _merge2.default)(options, encodings[i].options);
		(0, _fixOptions2.default)(encodings[i].options);
	}

	(0, _fixOptions2.default)(options);

	var Renderer = renderProperties.renderer;
	var renderer = new Renderer(renderProperties.element, encodings, options);
	renderer.render();

	if (renderProperties.afterRender) {
		renderProperties.afterRender();
	}
}

// Export to browser
if (typeof window !== "undefined") {
	window.JsBarcode = JsBarcode;
}

// Export to jQuery
/*global jQuery */
if (typeof jQuery !== 'undefined') {
	jQuery.fn.JsBarcode = function (content, options) {
		var elementArray = [];
		jQuery(this).each(function () {
			elementArray.push(this);
		});
		return JsBarcode(elementArray, content, options);
	};
}

// Export to commonJS
module.exports = JsBarcode;

/***/ }),

/***/ "./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/Barcode.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Barcode = function Barcode(data, options) {
	_classCallCheck(this, Barcode);

	this.data = data;
	this.text = options.text || data;
	this.options = options;
};

exports.default = Barcode;

/***/ }),

/***/ "./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/CODE128/CODE128.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Barcode2 = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/Barcode.js");

var _Barcode3 = _interopRequireDefault(_Barcode2);

var _constants = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/CODE128/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// This is the master class,
// it does require the start code to be included in the string
var CODE128 = function (_Barcode) {
	_inherits(CODE128, _Barcode);

	function CODE128(data, options) {
		_classCallCheck(this, CODE128);

		// Get array of ascii codes from data
		var _this = _possibleConstructorReturn(this, (CODE128.__proto__ || Object.getPrototypeOf(CODE128)).call(this, data.substring(1), options));

		_this.bytes = data.split('').map(function (char) {
			return char.charCodeAt(0);
		});
		return _this;
	}

	_createClass(CODE128, [{
		key: 'valid',
		value: function valid() {
			// ASCII value ranges 0-127, 200-211
			return (/^[\x00-\x7F\xC8-\xD3]+$/.test(this.data)
			);
		}

		// The public encoding function

	}, {
		key: 'encode',
		value: function encode() {
			var bytes = this.bytes;
			// Remove the start code from the bytes and set its index
			var startIndex = bytes.shift() - 105;
			// Get start set by index
			var startSet = _constants.SET_BY_CODE[startIndex];

			if (startSet === undefined) {
				throw new RangeError('The encoding does not start with a start character.');
			}

			if (this.shouldEncodeAsEan128() === true) {
				bytes.unshift(_constants.FNC1);
			}

			// Start encode with the right type
			var encodingResult = CODE128.next(bytes, 1, startSet);

			return {
				text: this.text === this.data ? this.text.replace(/[^\x20-\x7E]/g, '') : this.text,
				data:
				// Add the start bits
				CODE128.getBar(startIndex) +
				// Add the encoded bits
				encodingResult.result +
				// Add the checksum
				CODE128.getBar((encodingResult.checksum + startIndex) % _constants.MODULO) +
				// Add the end bits
				CODE128.getBar(_constants.STOP)
			};
		}

		// GS1-128/EAN-128

	}, {
		key: 'shouldEncodeAsEan128',
		value: function shouldEncodeAsEan128() {
			var isEAN128 = this.options.ean128 || false;
			if (typeof isEAN128 === 'string') {
				isEAN128 = isEAN128.toLowerCase() === 'true';
			}
			return isEAN128;
		}

		// Get a bar symbol by index

	}], [{
		key: 'getBar',
		value: function getBar(index) {
			return _constants.BARS[index] ? _constants.BARS[index].toString() : '';
		}

		// Correct an index by a set and shift it from the bytes array

	}, {
		key: 'correctIndex',
		value: function correctIndex(bytes, set) {
			if (set === _constants.SET_A) {
				var charCode = bytes.shift();
				return charCode < 32 ? charCode + 64 : charCode - 32;
			} else if (set === _constants.SET_B) {
				return bytes.shift() - 32;
			} else {
				return (bytes.shift() - 48) * 10 + bytes.shift() - 48;
			}
		}
	}, {
		key: 'next',
		value: function next(bytes, pos, set) {
			if (!bytes.length) {
				return { result: '', checksum: 0 };
			}

			var nextCode = void 0,
			    index = void 0;

			// Special characters
			if (bytes[0] >= 200) {
				index = bytes.shift() - 105;
				var nextSet = _constants.SWAP[index];

				// Swap to other set
				if (nextSet !== undefined) {
					nextCode = CODE128.next(bytes, pos + 1, nextSet);
				}
				// Continue on current set but encode a special character
				else {
						// Shift
						if ((set === _constants.SET_A || set === _constants.SET_B) && index === _constants.SHIFT) {
							// Convert the next character so that is encoded correctly
							bytes[0] = set === _constants.SET_A ? bytes[0] > 95 ? bytes[0] - 96 : bytes[0] : bytes[0] < 32 ? bytes[0] + 96 : bytes[0];
						}
						nextCode = CODE128.next(bytes, pos + 1, set);
					}
			}
			// Continue encoding
			else {
					index = CODE128.correctIndex(bytes, set);
					nextCode = CODE128.next(bytes, pos + 1, set);
				}

			// Get the correct binary encoding and calculate the weight
			var enc = CODE128.getBar(index);
			var weight = index * pos;

			return {
				result: enc + nextCode.result,
				checksum: weight + nextCode.checksum
			};
		}
	}]);

	return CODE128;
}(_Barcode3.default);

exports.default = CODE128;

/***/ }),

/***/ "./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/CODE128/CODE128A.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CODE2 = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/CODE128/CODE128.js");

var _CODE3 = _interopRequireDefault(_CODE2);

var _constants = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/CODE128/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CODE128A = function (_CODE) {
	_inherits(CODE128A, _CODE);

	function CODE128A(string, options) {
		_classCallCheck(this, CODE128A);

		return _possibleConstructorReturn(this, (CODE128A.__proto__ || Object.getPrototypeOf(CODE128A)).call(this, _constants.A_START_CHAR + string, options));
	}

	_createClass(CODE128A, [{
		key: 'valid',
		value: function valid() {
			return new RegExp('^' + _constants.A_CHARS + '+$').test(this.data);
		}
	}]);

	return CODE128A;
}(_CODE3.default);

exports.default = CODE128A;

/***/ }),

/***/ "./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/CODE128/CODE128B.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CODE2 = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/CODE128/CODE128.js");

var _CODE3 = _interopRequireDefault(_CODE2);

var _constants = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/CODE128/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CODE128B = function (_CODE) {
	_inherits(CODE128B, _CODE);

	function CODE128B(string, options) {
		_classCallCheck(this, CODE128B);

		return _possibleConstructorReturn(this, (CODE128B.__proto__ || Object.getPrototypeOf(CODE128B)).call(this, _constants.B_START_CHAR + string, options));
	}

	_createClass(CODE128B, [{
		key: 'valid',
		value: function valid() {
			return new RegExp('^' + _constants.B_CHARS + '+$').test(this.data);
		}
	}]);

	return CODE128B;
}(_CODE3.default);

exports.default = CODE128B;

/***/ }),

/***/ "./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/CODE128/CODE128C.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CODE2 = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/CODE128/CODE128.js");

var _CODE3 = _interopRequireDefault(_CODE2);

var _constants = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/CODE128/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CODE128C = function (_CODE) {
	_inherits(CODE128C, _CODE);

	function CODE128C(string, options) {
		_classCallCheck(this, CODE128C);

		return _possibleConstructorReturn(this, (CODE128C.__proto__ || Object.getPrototypeOf(CODE128C)).call(this, _constants.C_START_CHAR + string, options));
	}

	_createClass(CODE128C, [{
		key: 'valid',
		value: function valid() {
			return new RegExp('^' + _constants.C_CHARS + '+$').test(this.data);
		}
	}]);

	return CODE128C;
}(_CODE3.default);

exports.default = CODE128C;

/***/ }),

/***/ "./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/CODE128/CODE128_AUTO.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _CODE2 = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/CODE128/CODE128.js");

var _CODE3 = _interopRequireDefault(_CODE2);

var _auto = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/CODE128/auto.js");

var _auto2 = _interopRequireDefault(_auto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CODE128AUTO = function (_CODE) {
	_inherits(CODE128AUTO, _CODE);

	function CODE128AUTO(data, options) {
		_classCallCheck(this, CODE128AUTO);

		// ASCII value ranges 0-127, 200-211
		if (/^[\x00-\x7F\xC8-\xD3]+$/.test(data)) {
			var _this = _possibleConstructorReturn(this, (CODE128AUTO.__proto__ || Object.getPrototypeOf(CODE128AUTO)).call(this, (0, _auto2.default)(data), options));
		} else {
			var _this = _possibleConstructorReturn(this, (CODE128AUTO.__proto__ || Object.getPrototypeOf(CODE128AUTO)).call(this, data, options));
		}
		return _possibleConstructorReturn(_this);
	}

	return CODE128AUTO;
}(_CODE3.default);

exports.default = CODE128AUTO;

/***/ }),

/***/ "./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/CODE128/auto.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _constants = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/CODE128/constants.js");

// Match Set functions
var matchSetALength = function matchSetALength(string) {
	return string.match(new RegExp('^' + _constants.A_CHARS + '*'))[0].length;
};
var matchSetBLength = function matchSetBLength(string) {
	return string.match(new RegExp('^' + _constants.B_CHARS + '*'))[0].length;
};
var matchSetC = function matchSetC(string) {
	return string.match(new RegExp('^' + _constants.C_CHARS + '*'))[0];
};

// CODE128A or CODE128B
function autoSelectFromAB(string, isA) {
	var ranges = isA ? _constants.A_CHARS : _constants.B_CHARS;
	var untilC = string.match(new RegExp('^(' + ranges + '+?)(([0-9]{2}){2,})([^0-9]|$)'));

	if (untilC) {
		return untilC[1] + String.fromCharCode(204) + autoSelectFromC(string.substring(untilC[1].length));
	}

	var chars = string.match(new RegExp('^' + ranges + '+'))[0];

	if (chars.length === string.length) {
		return string;
	}

	return chars + String.fromCharCode(isA ? 205 : 206) + autoSelectFromAB(string.substring(chars.length), !isA);
}

// CODE128C
function autoSelectFromC(string) {
	var cMatch = matchSetC(string);
	var length = cMatch.length;

	if (length === string.length) {
		return string;
	}

	string = string.substring(length);

	// Select A/B depending on the longest match
	var isA = matchSetALength(string) >= matchSetBLength(string);
	return cMatch + String.fromCharCode(isA ? 206 : 205) + autoSelectFromAB(string, isA);
}

// Detect Code Set (A, B or C) and format the string

exports.default = function (string) {
	var newString = void 0;
	var cLength = matchSetC(string).length;

	// Select 128C if the string start with enough digits
	if (cLength >= 2) {
		newString = _constants.C_START_CHAR + autoSelectFromC(string);
	} else {
		// Select A/B depending on the longest match
		var isA = matchSetALength(string) > matchSetBLength(string);
		newString = (isA ? _constants.A_START_CHAR : _constants.B_START_CHAR) + autoSelectFromAB(string, isA);
	}

	return newString.replace(/[\xCD\xCE]([^])[\xCD\xCE]/, // Any sequence between 205 and 206 characters
	function (match, char) {
		return String.fromCharCode(203) + char;
	});
};

/***/ }),

/***/ "./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/CODE128/constants.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _SET_BY_CODE;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// constants for internal usage
var SET_A = exports.SET_A = 0;
var SET_B = exports.SET_B = 1;
var SET_C = exports.SET_C = 2;

// Special characters
var SHIFT = exports.SHIFT = 98;
var START_A = exports.START_A = 103;
var START_B = exports.START_B = 104;
var START_C = exports.START_C = 105;
var MODULO = exports.MODULO = 103;
var STOP = exports.STOP = 106;
var FNC1 = exports.FNC1 = 207;

// Get set by start code
var SET_BY_CODE = exports.SET_BY_CODE = (_SET_BY_CODE = {}, _defineProperty(_SET_BY_CODE, START_A, SET_A), _defineProperty(_SET_BY_CODE, START_B, SET_B), _defineProperty(_SET_BY_CODE, START_C, SET_C), _SET_BY_CODE);

// Get next set by code
var SWAP = exports.SWAP = {
	101: SET_A,
	100: SET_B,
	99: SET_C
};

var A_START_CHAR = exports.A_START_CHAR = String.fromCharCode(208); // START_A + 105
var B_START_CHAR = exports.B_START_CHAR = String.fromCharCode(209); // START_B + 105
var C_START_CHAR = exports.C_START_CHAR = String.fromCharCode(210); // START_C + 105

// 128A (Code Set A)
// ASCII characters 00 to 95 (0–9, A–Z and control codes), special characters, and FNC 1–4
var A_CHARS = exports.A_CHARS = "[\x00-\x5F\xC8-\xCF]";

// 128B (Code Set B)
// ASCII characters 32 to 127 (0–9, A–Z, a–z), special characters, and FNC 1–4
var B_CHARS = exports.B_CHARS = "[\x20-\x7F\xC8-\xCF]";

// 128C (Code Set C)
// 00–99 (encodes two digits with a single code point) and FNC1
var C_CHARS = exports.C_CHARS = "(\xCF*[0-9]{2}\xCF*)";

// CODE128 includes 107 symbols:
// 103 data symbols, 3 start symbols (A, B and C), and 1 stop symbol (the last one)
// Each symbol consist of three black bars (1) and three white spaces (0).
var BARS = exports.BARS = [11011001100, 11001101100, 11001100110, 10010011000, 10010001100, 10001001100, 10011001000, 10011000100, 10001100100, 11001001000, 11001000100, 11000100100, 10110011100, 10011011100, 10011001110, 10111001100, 10011101100, 10011100110, 11001110010, 11001011100, 11001001110, 11011100100, 11001110100, 11101101110, 11101001100, 11100101100, 11100100110, 11101100100, 11100110100, 11100110010, 11011011000, 11011000110, 11000110110, 10100011000, 10001011000, 10001000110, 10110001000, 10001101000, 10001100010, 11010001000, 11000101000, 11000100010, 10110111000, 10110001110, 10001101110, 10111011000, 10111000110, 10001110110, 11101110110, 11010001110, 11000101110, 11011101000, 11011100010, 11011101110, 11101011000, 11101000110, 11100010110, 11101101000, 11101100010, 11100011010, 11101111010, 11001000010, 11110001010, 10100110000, 10100001100, 10010110000, 10010000110, 10000101100, 10000100110, 10110010000, 10110000100, 10011010000, 10011000010, 10000110100, 10000110010, 11000010010, 11001010000, 11110111010, 11000010100, 10001111010, 10100111100, 10010111100, 10010011110, 10111100100, 10011110100, 10011110010, 11110100100, 11110010100, 11110010010, 11011011110, 11011110110, 11110110110, 10101111000, 10100011110, 10001011110, 10111101000, 10111100010, 11110101000, 11110100010, 10111011110, 10111101110, 11101011110, 11110101110, 11010000100, 11010010000, 11010011100, 1100011101011];

/***/ }),

/***/ "./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/CODE128/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CODE128C = exports.CODE128B = exports.CODE128A = exports.CODE128 = undefined;

var _CODE128_AUTO = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/CODE128/CODE128_AUTO.js");

var _CODE128_AUTO2 = _interopRequireDefault(_CODE128_AUTO);

var _CODE128A = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/CODE128/CODE128A.js");

var _CODE128A2 = _interopRequireDefault(_CODE128A);

var _CODE128B = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/CODE128/CODE128B.js");

var _CODE128B2 = _interopRequireDefault(_CODE128B);

var _CODE128C = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/CODE128/CODE128C.js");

var _CODE128C2 = _interopRequireDefault(_CODE128C);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.CODE128 = _CODE128_AUTO2.default;
exports.CODE128A = _CODE128A2.default;
exports.CODE128B = _CODE128B2.default;
exports.CODE128C = _CODE128C2.default;

/***/ }),

/***/ "./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/CODE39/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.CODE39 = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Barcode2 = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/Barcode.js");

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation:
// https://en.wikipedia.org/wiki/Code_39#Encoding

var CODE39 = function (_Barcode) {
	_inherits(CODE39, _Barcode);

	function CODE39(data, options) {
		_classCallCheck(this, CODE39);

		data = data.toUpperCase();

		// Calculate mod43 checksum if enabled
		if (options.mod43) {
			data += getCharacter(mod43checksum(data));
		}

		return _possibleConstructorReturn(this, (CODE39.__proto__ || Object.getPrototypeOf(CODE39)).call(this, data, options));
	}

	_createClass(CODE39, [{
		key: "encode",
		value: function encode() {
			// First character is always a *
			var result = getEncoding("*");

			// Take every character and add the binary representation to the result
			for (var i = 0; i < this.data.length; i++) {
				result += getEncoding(this.data[i]) + "0";
			}

			// Last character is always a *
			result += getEncoding("*");

			return {
				data: result,
				text: this.text
			};
		}
	}, {
		key: "valid",
		value: function valid() {
			return this.data.search(/^[0-9A-Z\-\.\ \$\/\+\%]+$/) !== -1;
		}
	}]);

	return CODE39;
}(_Barcode3.default);

// All characters. The position in the array is the (checksum) value


var characters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "-", ".", " ", "$", "/", "+", "%", "*"];

// The decimal representation of the characters, is converted to the
// corresponding binary with the getEncoding function
var encodings = [20957, 29783, 23639, 30485, 20951, 29813, 23669, 20855, 29789, 23645, 29975, 23831, 30533, 22295, 30149, 24005, 21623, 29981, 23837, 22301, 30023, 23879, 30545, 22343, 30161, 24017, 21959, 30065, 23921, 22385, 29015, 18263, 29141, 17879, 29045, 18293, 17783, 29021, 18269, 17477, 17489, 17681, 20753, 35770];

// Get the binary representation of a character by converting the encodings
// from decimal to binary
function getEncoding(character) {
	return getBinary(characterValue(character));
}

function getBinary(characterValue) {
	return encodings[characterValue].toString(2);
}

function getCharacter(characterValue) {
	return characters[characterValue];
}

function characterValue(character) {
	return characters.indexOf(character);
}

function mod43checksum(data) {
	var checksum = 0;
	for (var i = 0; i < data.length; i++) {
		checksum += characterValue(data[i]);
	}

	checksum = checksum % 43;
	return checksum;
}

exports.CODE39 = CODE39;

/***/ }),

/***/ "./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/EAN_UPC/EAN.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/EAN_UPC/constants.js");

var _encoder = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/EAN_UPC/encoder.js");

var _encoder2 = _interopRequireDefault(_encoder);

var _Barcode2 = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/Barcode.js");

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Base class for EAN8 & EAN13
var EAN = function (_Barcode) {
	_inherits(EAN, _Barcode);

	function EAN(data, options) {
		_classCallCheck(this, EAN);

		// Make sure the font is not bigger than the space between the guard bars
		var _this = _possibleConstructorReturn(this, (EAN.__proto__ || Object.getPrototypeOf(EAN)).call(this, data, options));

		_this.fontSize = !options.flat && options.fontSize > options.width * 10 ? options.width * 10 : options.fontSize;

		// Make the guard bars go down half the way of the text
		_this.guardHeight = options.height + _this.fontSize / 2 + options.textMargin;
		return _this;
	}

	_createClass(EAN, [{
		key: 'encode',
		value: function encode() {
			return this.options.flat ? this.encodeFlat() : this.encodeGuarded();
		}
	}, {
		key: 'leftText',
		value: function leftText(from, to) {
			return this.text.substr(from, to);
		}
	}, {
		key: 'leftEncode',
		value: function leftEncode(data, structure) {
			return (0, _encoder2.default)(data, structure);
		}
	}, {
		key: 'rightText',
		value: function rightText(from, to) {
			return this.text.substr(from, to);
		}
	}, {
		key: 'rightEncode',
		value: function rightEncode(data, structure) {
			return (0, _encoder2.default)(data, structure);
		}
	}, {
		key: 'encodeGuarded',
		value: function encodeGuarded() {
			var textOptions = { fontSize: this.fontSize };
			var guardOptions = { height: this.guardHeight };

			return [{ data: _constants.SIDE_BIN, options: guardOptions }, { data: this.leftEncode(), text: this.leftText(), options: textOptions }, { data: _constants.MIDDLE_BIN, options: guardOptions }, { data: this.rightEncode(), text: this.rightText(), options: textOptions }, { data: _constants.SIDE_BIN, options: guardOptions }];
		}
	}, {
		key: 'encodeFlat',
		value: function encodeFlat() {
			var data = [_constants.SIDE_BIN, this.leftEncode(), _constants.MIDDLE_BIN, this.rightEncode(), _constants.SIDE_BIN];

			return {
				data: data.join(''),
				text: this.text
			};
		}
	}]);

	return EAN;
}(_Barcode3.default);

exports.default = EAN;

/***/ }),

/***/ "./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/EAN_UPC/EAN13.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _constants = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/EAN_UPC/constants.js");

var _EAN2 = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/EAN_UPC/EAN.js");

var _EAN3 = _interopRequireDefault(_EAN2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation:
// https://en.wikipedia.org/wiki/International_Article_Number_(EAN)#Binary_encoding_of_data_digits_into_EAN-13_barcode

// Calculate the checksum digit
// https://en.wikipedia.org/wiki/International_Article_Number_(EAN)#Calculation_of_checksum_digit
var checksum = function checksum(number) {
	var res = number.substr(0, 12).split('').map(function (n) {
		return +n;
	}).reduce(function (sum, a, idx) {
		return idx % 2 ? sum + a * 3 : sum + a;
	}, 0);

	return (10 - res % 10) % 10;
};

var EAN13 = function (_EAN) {
	_inherits(EAN13, _EAN);

	function EAN13(data, options) {
		_classCallCheck(this, EAN13);

		// Add checksum if it does not exist
		if (data.search(/^[0-9]{12}$/) !== -1) {
			data += checksum(data);
		}

		// Adds a last character to the end of the barcode
		var _this = _possibleConstructorReturn(this, (EAN13.__proto__ || Object.getPrototypeOf(EAN13)).call(this, data, options));

		_this.lastChar = options.lastChar;
		return _this;
	}

	_createClass(EAN13, [{
		key: 'valid',
		value: function valid() {
			return this.data.search(/^[0-9]{13}$/) !== -1 && +this.data[12] === checksum(this.data);
		}
	}, {
		key: 'leftText',
		value: function leftText() {
			return _get(EAN13.prototype.__proto__ || Object.getPrototypeOf(EAN13.prototype), 'leftText', this).call(this, 1, 6);
		}
	}, {
		key: 'leftEncode',
		value: function leftEncode() {
			var data = this.data.substr(1, 6);
			var structure = _constants.EAN13_STRUCTURE[this.data[0]];
			return _get(EAN13.prototype.__proto__ || Object.getPrototypeOf(EAN13.prototype), 'leftEncode', this).call(this, data, structure);
		}
	}, {
		key: 'rightText',
		value: function rightText() {
			return _get(EAN13.prototype.__proto__ || Object.getPrototypeOf(EAN13.prototype), 'rightText', this).call(this, 7, 6);
		}
	}, {
		key: 'rightEncode',
		value: function rightEncode() {
			var data = this.data.substr(7, 6);
			return _get(EAN13.prototype.__proto__ || Object.getPrototypeOf(EAN13.prototype), 'rightEncode', this).call(this, data, 'RRRRRR');
		}

		// The "standard" way of printing EAN13 barcodes with guard bars

	}, {
		key: 'encodeGuarded',
		value: function encodeGuarded() {
			var data = _get(EAN13.prototype.__proto__ || Object.getPrototypeOf(EAN13.prototype), 'encodeGuarded', this).call(this);

			// Extend data with left digit & last character
			if (this.options.displayValue) {
				data.unshift({
					data: '000000000000',
					text: this.text.substr(0, 1),
					options: { textAlign: 'left', fontSize: this.fontSize }
				});

				if (this.options.lastChar) {
					data.push({
						data: '00'
					});
					data.push({
						data: '00000',
						text: this.options.lastChar,
						options: { fontSize: this.fontSize }
					});
				}
			}

			return data;
		}
	}]);

	return EAN13;
}(_EAN3.default);

exports.default = EAN13;

/***/ }),

/***/ "./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/EAN_UPC/EAN2.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/EAN_UPC/constants.js");

var _encoder = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/EAN_UPC/encoder.js");

var _encoder2 = _interopRequireDefault(_encoder);

var _Barcode2 = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/Barcode.js");

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation:
// https://en.wikipedia.org/wiki/EAN_2#Encoding

var EAN2 = function (_Barcode) {
	_inherits(EAN2, _Barcode);

	function EAN2(data, options) {
		_classCallCheck(this, EAN2);

		return _possibleConstructorReturn(this, (EAN2.__proto__ || Object.getPrototypeOf(EAN2)).call(this, data, options));
	}

	_createClass(EAN2, [{
		key: 'valid',
		value: function valid() {
			return this.data.search(/^[0-9]{2}$/) !== -1;
		}
	}, {
		key: 'encode',
		value: function encode() {
			// Choose the structure based on the number mod 4
			var structure = _constants.EAN2_STRUCTURE[parseInt(this.data) % 4];
			return {
				// Start bits + Encode the two digits with 01 in between
				data: '1011' + (0, _encoder2.default)(this.data, structure, '01'),
				text: this.text
			};
		}
	}]);

	return EAN2;
}(_Barcode3.default);

exports.default = EAN2;

/***/ }),

/***/ "./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/EAN_UPC/EAN5.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/EAN_UPC/constants.js");

var _encoder = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/EAN_UPC/encoder.js");

var _encoder2 = _interopRequireDefault(_encoder);

var _Barcode2 = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/Barcode.js");

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation:
// https://en.wikipedia.org/wiki/EAN_5#Encoding

var checksum = function checksum(data) {
	var result = data.split('').map(function (n) {
		return +n;
	}).reduce(function (sum, a, idx) {
		return idx % 2 ? sum + a * 9 : sum + a * 3;
	}, 0);
	return result % 10;
};

var EAN5 = function (_Barcode) {
	_inherits(EAN5, _Barcode);

	function EAN5(data, options) {
		_classCallCheck(this, EAN5);

		return _possibleConstructorReturn(this, (EAN5.__proto__ || Object.getPrototypeOf(EAN5)).call(this, data, options));
	}

	_createClass(EAN5, [{
		key: 'valid',
		value: function valid() {
			return this.data.search(/^[0-9]{5}$/) !== -1;
		}
	}, {
		key: 'encode',
		value: function encode() {
			var structure = _constants.EAN5_STRUCTURE[checksum(this.data)];
			return {
				data: '1011' + (0, _encoder2.default)(this.data, structure, '01'),
				text: this.text
			};
		}
	}]);

	return EAN5;
}(_Barcode3.default);

exports.default = EAN5;

/***/ }),

/***/ "./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/EAN_UPC/EAN8.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _EAN2 = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/EAN_UPC/EAN.js");

var _EAN3 = _interopRequireDefault(_EAN2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation:
// http://www.barcodeisland.com/ean8.phtml

// Calculate the checksum digit
var checksum = function checksum(number) {
	var res = number.substr(0, 7).split('').map(function (n) {
		return +n;
	}).reduce(function (sum, a, idx) {
		return idx % 2 ? sum + a : sum + a * 3;
	}, 0);

	return (10 - res % 10) % 10;
};

var EAN8 = function (_EAN) {
	_inherits(EAN8, _EAN);

	function EAN8(data, options) {
		_classCallCheck(this, EAN8);

		// Add checksum if it does not exist
		if (data.search(/^[0-9]{7}$/) !== -1) {
			data += checksum(data);
		}

		return _possibleConstructorReturn(this, (EAN8.__proto__ || Object.getPrototypeOf(EAN8)).call(this, data, options));
	}

	_createClass(EAN8, [{
		key: 'valid',
		value: function valid() {
			return this.data.search(/^[0-9]{8}$/) !== -1 && +this.data[7] === checksum(this.data);
		}
	}, {
		key: 'leftText',
		value: function leftText() {
			return _get(EAN8.prototype.__proto__ || Object.getPrototypeOf(EAN8.prototype), 'leftText', this).call(this, 0, 4);
		}
	}, {
		key: 'leftEncode',
		value: function leftEncode() {
			var data = this.data.substr(0, 4);
			return _get(EAN8.prototype.__proto__ || Object.getPrototypeOf(EAN8.prototype), 'leftEncode', this).call(this, data, 'LLLL');
		}
	}, {
		key: 'rightText',
		value: function rightText() {
			return _get(EAN8.prototype.__proto__ || Object.getPrototypeOf(EAN8.prototype), 'rightText', this).call(this, 4, 4);
		}
	}, {
		key: 'rightEncode',
		value: function rightEncode() {
			var data = this.data.substr(4, 4);
			return _get(EAN8.prototype.__proto__ || Object.getPrototypeOf(EAN8.prototype), 'rightEncode', this).call(this, data, 'RRRR');
		}
	}]);

	return EAN8;
}(_EAN3.default);

exports.default = EAN8;

/***/ }),

/***/ "./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/EAN_UPC/UPC.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.checksum = checksum;

var _encoder = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/EAN_UPC/encoder.js");

var _encoder2 = _interopRequireDefault(_encoder);

var _Barcode2 = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/Barcode.js");

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation:
// https://en.wikipedia.org/wiki/Universal_Product_Code#Encoding

var UPC = function (_Barcode) {
	_inherits(UPC, _Barcode);

	function UPC(data, options) {
		_classCallCheck(this, UPC);

		// Add checksum if it does not exist
		if (data.search(/^[0-9]{11}$/) !== -1) {
			data += checksum(data);
		}

		var _this = _possibleConstructorReturn(this, (UPC.__proto__ || Object.getPrototypeOf(UPC)).call(this, data, options));

		_this.displayValue = options.displayValue;

		// Make sure the font is not bigger than the space between the guard bars
		if (options.fontSize > options.width * 10) {
			_this.fontSize = options.width * 10;
		} else {
			_this.fontSize = options.fontSize;
		}

		// Make the guard bars go down half the way of the text
		_this.guardHeight = options.height + _this.fontSize / 2 + options.textMargin;
		return _this;
	}

	_createClass(UPC, [{
		key: "valid",
		value: function valid() {
			return this.data.search(/^[0-9]{12}$/) !== -1 && this.data[11] == checksum(this.data);
		}
	}, {
		key: "encode",
		value: function encode() {
			if (this.options.flat) {
				return this.flatEncoding();
			} else {
				return this.guardedEncoding();
			}
		}
	}, {
		key: "flatEncoding",
		value: function flatEncoding() {
			var result = "";

			result += "101";
			result += (0, _encoder2.default)(this.data.substr(0, 6), "LLLLLL");
			result += "01010";
			result += (0, _encoder2.default)(this.data.substr(6, 6), "RRRRRR");
			result += "101";

			return {
				data: result,
				text: this.text
			};
		}
	}, {
		key: "guardedEncoding",
		value: function guardedEncoding() {
			var result = [];

			// Add the first digit
			if (this.displayValue) {
				result.push({
					data: "00000000",
					text: this.text.substr(0, 1),
					options: { textAlign: "left", fontSize: this.fontSize }
				});
			}

			// Add the guard bars
			result.push({
				data: "101" + (0, _encoder2.default)(this.data[0], "L"),
				options: { height: this.guardHeight }
			});

			// Add the left side
			result.push({
				data: (0, _encoder2.default)(this.data.substr(1, 5), "LLLLL"),
				text: this.text.substr(1, 5),
				options: { fontSize: this.fontSize }
			});

			// Add the middle bits
			result.push({
				data: "01010",
				options: { height: this.guardHeight }
			});

			// Add the right side
			result.push({
				data: (0, _encoder2.default)(this.data.substr(6, 5), "RRRRR"),
				text: this.text.substr(6, 5),
				options: { fontSize: this.fontSize }
			});

			// Add the end bits
			result.push({
				data: (0, _encoder2.default)(this.data[11], "R") + "101",
				options: { height: this.guardHeight }
			});

			// Add the last digit
			if (this.displayValue) {
				result.push({
					data: "00000000",
					text: this.text.substr(11, 1),
					options: { textAlign: "right", fontSize: this.fontSize }
				});
			}

			return result;
		}
	}]);

	return UPC;
}(_Barcode3.default);

// Calulate the checksum digit
// https://en.wikipedia.org/wiki/International_Article_Number_(EAN)#Calculation_of_checksum_digit


function checksum(number) {
	var result = 0;

	var i;
	for (i = 1; i < 11; i += 2) {
		result += parseInt(number[i]);
	}
	for (i = 0; i < 11; i += 2) {
		result += parseInt(number[i]) * 3;
	}

	return (10 - result % 10) % 10;
}

exports.default = UPC;

/***/ }),

/***/ "./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/EAN_UPC/UPCE.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _encoder = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/EAN_UPC/encoder.js");

var _encoder2 = _interopRequireDefault(_encoder);

var _Barcode2 = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/Barcode.js");

var _Barcode3 = _interopRequireDefault(_Barcode2);

var _UPC = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/EAN_UPC/UPC.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation:
// https://en.wikipedia.org/wiki/Universal_Product_Code#Encoding
//
// UPC-E documentation:
// https://en.wikipedia.org/wiki/Universal_Product_Code#UPC-E

var EXPANSIONS = ["XX00000XXX", "XX10000XXX", "XX20000XXX", "XXX00000XX", "XXXX00000X", "XXXXX00005", "XXXXX00006", "XXXXX00007", "XXXXX00008", "XXXXX00009"];

var PARITIES = [["EEEOOO", "OOOEEE"], ["EEOEOO", "OOEOEE"], ["EEOOEO", "OOEEOE"], ["EEOOOE", "OOEEEO"], ["EOEEOO", "OEOOEE"], ["EOOEEO", "OEEOOE"], ["EOOOEE", "OEEEOO"], ["EOEOEO", "OEOEOE"], ["EOEOOE", "OEOEEO"], ["EOOEOE", "OEEOEO"]];

var UPCE = function (_Barcode) {
	_inherits(UPCE, _Barcode);

	function UPCE(data, options) {
		_classCallCheck(this, UPCE);

		var _this = _possibleConstructorReturn(this, (UPCE.__proto__ || Object.getPrototypeOf(UPCE)).call(this, data, options));
		// Code may be 6 or 8 digits;
		// A 7 digit code is ambiguous as to whether the extra digit
		// is a UPC-A check or number system digit.


		_this.isValid = false;
		if (data.search(/^[0-9]{6}$/) !== -1) {
			_this.middleDigits = data;
			_this.upcA = expandToUPCA(data, "0");
			_this.text = options.text || '' + _this.upcA[0] + data + _this.upcA[_this.upcA.length - 1];
			_this.isValid = true;
		} else if (data.search(/^[01][0-9]{7}$/) !== -1) {
			_this.middleDigits = data.substring(1, data.length - 1);
			_this.upcA = expandToUPCA(_this.middleDigits, data[0]);

			if (_this.upcA[_this.upcA.length - 1] === data[data.length - 1]) {
				_this.isValid = true;
			} else {
				// checksum mismatch
				return _possibleConstructorReturn(_this);
			}
		} else {
			return _possibleConstructorReturn(_this);
		}

		_this.displayValue = options.displayValue;

		// Make sure the font is not bigger than the space between the guard bars
		if (options.fontSize > options.width * 10) {
			_this.fontSize = options.width * 10;
		} else {
			_this.fontSize = options.fontSize;
		}

		// Make the guard bars go down half the way of the text
		_this.guardHeight = options.height + _this.fontSize / 2 + options.textMargin;
		return _this;
	}

	_createClass(UPCE, [{
		key: 'valid',
		value: function valid() {
			return this.isValid;
		}
	}, {
		key: 'encode',
		value: function encode() {
			if (this.options.flat) {
				return this.flatEncoding();
			} else {
				return this.guardedEncoding();
			}
		}
	}, {
		key: 'flatEncoding',
		value: function flatEncoding() {
			var result = "";

			result += "101";
			result += this.encodeMiddleDigits();
			result += "010101";

			return {
				data: result,
				text: this.text
			};
		}
	}, {
		key: 'guardedEncoding',
		value: function guardedEncoding() {
			var result = [];

			// Add the UPC-A number system digit beneath the quiet zone
			if (this.displayValue) {
				result.push({
					data: "00000000",
					text: this.text[0],
					options: { textAlign: "left", fontSize: this.fontSize }
				});
			}

			// Add the guard bars
			result.push({
				data: "101",
				options: { height: this.guardHeight }
			});

			// Add the 6 UPC-E digits
			result.push({
				data: this.encodeMiddleDigits(),
				text: this.text.substring(1, 7),
				options: { fontSize: this.fontSize }
			});

			// Add the end bits
			result.push({
				data: "010101",
				options: { height: this.guardHeight }
			});

			// Add the UPC-A check digit beneath the quiet zone
			if (this.displayValue) {
				result.push({
					data: "00000000",
					text: this.text[7],
					options: { textAlign: "right", fontSize: this.fontSize }
				});
			}

			return result;
		}
	}, {
		key: 'encodeMiddleDigits',
		value: function encodeMiddleDigits() {
			var numberSystem = this.upcA[0];
			var checkDigit = this.upcA[this.upcA.length - 1];
			var parity = PARITIES[parseInt(checkDigit)][parseInt(numberSystem)];
			return (0, _encoder2.default)(this.middleDigits, parity);
		}
	}]);

	return UPCE;
}(_Barcode3.default);

function expandToUPCA(middleDigits, numberSystem) {
	var lastUpcE = parseInt(middleDigits[middleDigits.length - 1]);
	var expansion = EXPANSIONS[lastUpcE];

	var result = "";
	var digitIndex = 0;
	for (var i = 0; i < expansion.length; i++) {
		var c = expansion[i];
		if (c === 'X') {
			result += middleDigits[digitIndex++];
		} else {
			result += c;
		}
	}

	result = '' + numberSystem + result;
	return '' + result + (0, _UPC.checksum)(result);
}

exports.default = UPCE;

/***/ }),

/***/ "./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/EAN_UPC/constants.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
// Standard start end and middle bits
var SIDE_BIN = exports.SIDE_BIN = '101';
var MIDDLE_BIN = exports.MIDDLE_BIN = '01010';

var BINARIES = exports.BINARIES = {
	'L': [// The L (left) type of encoding
	'0001101', '0011001', '0010011', '0111101', '0100011', '0110001', '0101111', '0111011', '0110111', '0001011'],
	'G': [// The G type of encoding
	'0100111', '0110011', '0011011', '0100001', '0011101', '0111001', '0000101', '0010001', '0001001', '0010111'],
	'R': [// The R (right) type of encoding
	'1110010', '1100110', '1101100', '1000010', '1011100', '1001110', '1010000', '1000100', '1001000', '1110100'],
	'O': [// The O (odd) encoding for UPC-E
	'0001101', '0011001', '0010011', '0111101', '0100011', '0110001', '0101111', '0111011', '0110111', '0001011'],
	'E': [// The E (even) encoding for UPC-E
	'0100111', '0110011', '0011011', '0100001', '0011101', '0111001', '0000101', '0010001', '0001001', '0010111']
};

// Define the EAN-2 structure
var EAN2_STRUCTURE = exports.EAN2_STRUCTURE = ['LL', 'LG', 'GL', 'GG'];

// Define the EAN-5 structure
var EAN5_STRUCTURE = exports.EAN5_STRUCTURE = ['GGLLL', 'GLGLL', 'GLLGL', 'GLLLG', 'LGGLL', 'LLGGL', 'LLLGG', 'LGLGL', 'LGLLG', 'LLGLG'];

// Define the EAN-13 structure
var EAN13_STRUCTURE = exports.EAN13_STRUCTURE = ['LLLLLL', 'LLGLGG', 'LLGGLG', 'LLGGGL', 'LGLLGG', 'LGGLLG', 'LGGGLL', 'LGLGLG', 'LGLGGL', 'LGGLGL'];

/***/ }),

/***/ "./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/EAN_UPC/encoder.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _constants = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/EAN_UPC/constants.js");

// Encode data string
var encode = function encode(data, structure, separator) {
	var encoded = data.split('').map(function (val, idx) {
		return _constants.BINARIES[structure[idx]];
	}).map(function (val, idx) {
		return val ? val[data[idx]] : '';
	});

	if (separator) {
		var last = data.length - 1;
		encoded = encoded.map(function (val, idx) {
			return idx < last ? val + separator : val;
		});
	}

	return encoded.join('');
};

exports.default = encode;

/***/ }),

/***/ "./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/EAN_UPC/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UPCE = exports.UPC = exports.EAN2 = exports.EAN5 = exports.EAN8 = exports.EAN13 = undefined;

var _EAN = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/EAN_UPC/EAN13.js");

var _EAN2 = _interopRequireDefault(_EAN);

var _EAN3 = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/EAN_UPC/EAN8.js");

var _EAN4 = _interopRequireDefault(_EAN3);

var _EAN5 = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/EAN_UPC/EAN5.js");

var _EAN6 = _interopRequireDefault(_EAN5);

var _EAN7 = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/EAN_UPC/EAN2.js");

var _EAN8 = _interopRequireDefault(_EAN7);

var _UPC = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/EAN_UPC/UPC.js");

var _UPC2 = _interopRequireDefault(_UPC);

var _UPCE = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/EAN_UPC/UPCE.js");

var _UPCE2 = _interopRequireDefault(_UPCE);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.EAN13 = _EAN2.default;
exports.EAN8 = _EAN4.default;
exports.EAN5 = _EAN6.default;
exports.EAN2 = _EAN8.default;
exports.UPC = _UPC2.default;
exports.UPCE = _UPCE2.default;

/***/ }),

/***/ "./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/GenericBarcode/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.GenericBarcode = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Barcode2 = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/Barcode.js");

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GenericBarcode = function (_Barcode) {
	_inherits(GenericBarcode, _Barcode);

	function GenericBarcode(data, options) {
		_classCallCheck(this, GenericBarcode);

		return _possibleConstructorReturn(this, (GenericBarcode.__proto__ || Object.getPrototypeOf(GenericBarcode)).call(this, data, options)); // Sets this.data and this.text
	}

	// Return the corresponding binary numbers for the data provided


	_createClass(GenericBarcode, [{
		key: "encode",
		value: function encode() {
			return {
				data: "10101010101010101010101010101010101010101",
				text: this.text
			};
		}

		// Resturn true/false if the string provided is valid for this encoder

	}, {
		key: "valid",
		value: function valid() {
			return true;
		}
	}]);

	return GenericBarcode;
}(_Barcode3.default);

exports.GenericBarcode = GenericBarcode;

/***/ }),

/***/ "./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/ITF/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ITF = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Barcode2 = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/Barcode.js");

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ITF = function (_Barcode) {
	_inherits(ITF, _Barcode);

	function ITF(data, options) {
		_classCallCheck(this, ITF);

		var _this = _possibleConstructorReturn(this, (ITF.__proto__ || Object.getPrototypeOf(ITF)).call(this, data, options));

		_this.binaryRepresentation = {
			"0": "00110",
			"1": "10001",
			"2": "01001",
			"3": "11000",
			"4": "00101",
			"5": "10100",
			"6": "01100",
			"7": "00011",
			"8": "10010",
			"9": "01010"
		};
		return _this;
	}

	_createClass(ITF, [{
		key: "valid",
		value: function valid() {
			return this.data.search(/^([0-9]{2})+$/) !== -1;
		}
	}, {
		key: "encode",
		value: function encode() {
			// Always add the same start bits
			var result = "1010";

			// Calculate all the digit pairs
			for (var i = 0; i < this.data.length; i += 2) {
				result += this.calculatePair(this.data.substr(i, 2));
			}

			// Always add the same end bits
			result += "11101";

			return {
				data: result,
				text: this.text
			};
		}

		// Calculate the data of a number pair

	}, {
		key: "calculatePair",
		value: function calculatePair(numberPair) {
			var result = "";

			var number1Struct = this.binaryRepresentation[numberPair[0]];
			var number2Struct = this.binaryRepresentation[numberPair[1]];

			// Take every second bit and add to the result
			for (var i = 0; i < 5; i++) {
				result += number1Struct[i] == "1" ? "111" : "1";
				result += number2Struct[i] == "1" ? "000" : "0";
			}

			return result;
		}
	}]);

	return ITF;
}(_Barcode3.default);

exports.ITF = ITF;

/***/ }),

/***/ "./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/ITF14/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ITF14 = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Barcode2 = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/Barcode.js");

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ITF14 = function (_Barcode) {
	_inherits(ITF14, _Barcode);

	function ITF14(data, options) {
		_classCallCheck(this, ITF14);

		// Add checksum if it does not exist
		if (data.search(/^[0-9]{13}$/) !== -1) {
			data += checksum(data);
		}

		var _this = _possibleConstructorReturn(this, (ITF14.__proto__ || Object.getPrototypeOf(ITF14)).call(this, data, options));

		_this.binaryRepresentation = {
			"0": "00110",
			"1": "10001",
			"2": "01001",
			"3": "11000",
			"4": "00101",
			"5": "10100",
			"6": "01100",
			"7": "00011",
			"8": "10010",
			"9": "01010"
		};
		return _this;
	}

	_createClass(ITF14, [{
		key: "valid",
		value: function valid() {
			return this.data.search(/^[0-9]{14}$/) !== -1 && this.data[13] == checksum(this.data);
		}
	}, {
		key: "encode",
		value: function encode() {
			var result = "1010";

			// Calculate all the digit pairs
			for (var i = 0; i < 14; i += 2) {
				result += this.calculatePair(this.data.substr(i, 2));
			}

			// Always add the same end bits
			result += "11101";

			return {
				data: result,
				text: this.text
			};
		}

		// Calculate the data of a number pair

	}, {
		key: "calculatePair",
		value: function calculatePair(numberPair) {
			var result = "";

			var number1Struct = this.binaryRepresentation[numberPair[0]];
			var number2Struct = this.binaryRepresentation[numberPair[1]];

			// Take every second bit and add to the result
			for (var i = 0; i < 5; i++) {
				result += number1Struct[i] == "1" ? "111" : "1";
				result += number2Struct[i] == "1" ? "000" : "0";
			}

			return result;
		}
	}]);

	return ITF14;
}(_Barcode3.default);

// Calulate the checksum digit


function checksum(data) {
	var result = 0;

	for (var i = 0; i < 13; i++) {
		result += parseInt(data[i]) * (3 - i % 2 * 2);
	}

	return Math.ceil(result / 10) * 10 - result;
}

exports.ITF14 = ITF14;

/***/ }),

/***/ "./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/MSI/MSI.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Barcode2 = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/Barcode.js");

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation
// https://en.wikipedia.org/wiki/MSI_Barcode#Character_set_and_binary_lookup

var MSI = function (_Barcode) {
	_inherits(MSI, _Barcode);

	function MSI(data, options) {
		_classCallCheck(this, MSI);

		return _possibleConstructorReturn(this, (MSI.__proto__ || Object.getPrototypeOf(MSI)).call(this, data, options));
	}

	_createClass(MSI, [{
		key: "encode",
		value: function encode() {
			// Start bits
			var ret = "110";

			for (var i = 0; i < this.data.length; i++) {
				// Convert the character to binary (always 4 binary digits)
				var digit = parseInt(this.data[i]);
				var bin = digit.toString(2);
				bin = addZeroes(bin, 4 - bin.length);

				// Add 100 for every zero and 110 for every 1
				for (var b = 0; b < bin.length; b++) {
					ret += bin[b] == "0" ? "100" : "110";
				}
			}

			// End bits
			ret += "1001";

			return {
				data: ret,
				text: this.text
			};
		}
	}, {
		key: "valid",
		value: function valid() {
			return this.data.search(/^[0-9]+$/) !== -1;
		}
	}]);

	return MSI;
}(_Barcode3.default);

function addZeroes(number, n) {
	for (var i = 0; i < n; i++) {
		number = "0" + number;
	}
	return number;
}

exports.default = MSI;

/***/ }),

/***/ "./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/MSI/MSI10.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _MSI2 = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/MSI/MSI.js");

var _MSI3 = _interopRequireDefault(_MSI2);

var _checksums = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/MSI/checksums.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MSI10 = function (_MSI) {
	_inherits(MSI10, _MSI);

	function MSI10(data, options) {
		_classCallCheck(this, MSI10);

		return _possibleConstructorReturn(this, (MSI10.__proto__ || Object.getPrototypeOf(MSI10)).call(this, data + (0, _checksums.mod10)(data), options));
	}

	return MSI10;
}(_MSI3.default);

exports.default = MSI10;

/***/ }),

/***/ "./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/MSI/MSI1010.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _MSI2 = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/MSI/MSI.js");

var _MSI3 = _interopRequireDefault(_MSI2);

var _checksums = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/MSI/checksums.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MSI1010 = function (_MSI) {
	_inherits(MSI1010, _MSI);

	function MSI1010(data, options) {
		_classCallCheck(this, MSI1010);

		data += (0, _checksums.mod10)(data);
		data += (0, _checksums.mod10)(data);
		return _possibleConstructorReturn(this, (MSI1010.__proto__ || Object.getPrototypeOf(MSI1010)).call(this, data, options));
	}

	return MSI1010;
}(_MSI3.default);

exports.default = MSI1010;

/***/ }),

/***/ "./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/MSI/MSI11.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _MSI2 = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/MSI/MSI.js");

var _MSI3 = _interopRequireDefault(_MSI2);

var _checksums = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/MSI/checksums.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MSI11 = function (_MSI) {
	_inherits(MSI11, _MSI);

	function MSI11(data, options) {
		_classCallCheck(this, MSI11);

		return _possibleConstructorReturn(this, (MSI11.__proto__ || Object.getPrototypeOf(MSI11)).call(this, data + (0, _checksums.mod11)(data), options));
	}

	return MSI11;
}(_MSI3.default);

exports.default = MSI11;

/***/ }),

/***/ "./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/MSI/MSI1110.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _MSI2 = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/MSI/MSI.js");

var _MSI3 = _interopRequireDefault(_MSI2);

var _checksums = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/MSI/checksums.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MSI1110 = function (_MSI) {
	_inherits(MSI1110, _MSI);

	function MSI1110(data, options) {
		_classCallCheck(this, MSI1110);

		data += (0, _checksums.mod11)(data);
		data += (0, _checksums.mod10)(data);
		return _possibleConstructorReturn(this, (MSI1110.__proto__ || Object.getPrototypeOf(MSI1110)).call(this, data, options));
	}

	return MSI1110;
}(_MSI3.default);

exports.default = MSI1110;

/***/ }),

/***/ "./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/MSI/checksums.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.mod10 = mod10;
exports.mod11 = mod11;
function mod10(number) {
	var sum = 0;
	for (var i = 0; i < number.length; i++) {
		var n = parseInt(number[i]);
		if ((i + number.length) % 2 === 0) {
			sum += n;
		} else {
			sum += n * 2 % 10 + Math.floor(n * 2 / 10);
		}
	}
	return (10 - sum % 10) % 10;
}

function mod11(number) {
	var sum = 0;
	var weights = [2, 3, 4, 5, 6, 7];
	for (var i = 0; i < number.length; i++) {
		var n = parseInt(number[number.length - 1 - i]);
		sum += weights[i % weights.length] * n;
	}
	return (11 - sum % 11) % 11;
}

/***/ }),

/***/ "./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/MSI/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MSI1110 = exports.MSI1010 = exports.MSI11 = exports.MSI10 = exports.MSI = undefined;

var _MSI = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/MSI/MSI.js");

var _MSI2 = _interopRequireDefault(_MSI);

var _MSI3 = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/MSI/MSI10.js");

var _MSI4 = _interopRequireDefault(_MSI3);

var _MSI5 = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/MSI/MSI11.js");

var _MSI6 = _interopRequireDefault(_MSI5);

var _MSI7 = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/MSI/MSI1010.js");

var _MSI8 = _interopRequireDefault(_MSI7);

var _MSI9 = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/MSI/MSI1110.js");

var _MSI10 = _interopRequireDefault(_MSI9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.MSI = _MSI2.default;
exports.MSI10 = _MSI4.default;
exports.MSI11 = _MSI6.default;
exports.MSI1010 = _MSI8.default;
exports.MSI1110 = _MSI10.default;

/***/ }),

/***/ "./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/codabar/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.codabar = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Barcode2 = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/Barcode.js");

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding specification:
// http://www.barcodeisland.com/codabar.phtml

var codabar = function (_Barcode) {
	_inherits(codabar, _Barcode);

	function codabar(data, options) {
		_classCallCheck(this, codabar);

		if (data.search(/^[0-9\-\$\:\.\+\/]+$/) === 0) {
			data = "A" + data + "A";
		}

		var _this = _possibleConstructorReturn(this, (codabar.__proto__ || Object.getPrototypeOf(codabar)).call(this, data.toUpperCase(), options));

		_this.text = _this.options.text || _this.text.replace(/[A-D]/g, '');
		return _this;
	}

	_createClass(codabar, [{
		key: "valid",
		value: function valid() {
			return this.data.search(/^[A-D][0-9\-\$\:\.\+\/]+[A-D]$/) !== -1;
		}
	}, {
		key: "encode",
		value: function encode() {
			var result = [];
			var encodings = this.getEncodings();
			for (var i = 0; i < this.data.length; i++) {
				result.push(encodings[this.data.charAt(i)]);
				// for all characters except the last, append a narrow-space ("0")
				if (i !== this.data.length - 1) {
					result.push("0");
				}
			}
			return {
				text: this.text,
				data: result.join('')
			};
		}
	}, {
		key: "getEncodings",
		value: function getEncodings() {
			return {
				"0": "101010011",
				"1": "101011001",
				"2": "101001011",
				"3": "110010101",
				"4": "101101001",
				"5": "110101001",
				"6": "100101011",
				"7": "100101101",
				"8": "100110101",
				"9": "110100101",
				"-": "101001101",
				"$": "101100101",
				":": "1101011011",
				"/": "1101101011",
				".": "1101101101",
				"+": "101100110011",
				"A": "1011001001",
				"B": "1001001011",
				"C": "1010010011",
				"D": "1010011001"
			};
		}
	}]);

	return codabar;
}(_Barcode3.default);

exports.codabar = codabar;

/***/ }),

/***/ "./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _CODE = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/CODE39/index.js");

var _CODE2 = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/CODE128/index.js");

var _EAN_UPC = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/EAN_UPC/index.js");

var _ITF = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/ITF14/index.js");

var _ITF2 = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/ITF/index.js");

var _MSI = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/MSI/index.js");

var _pharmacode = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/pharmacode/index.js");

var _codabar = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/codabar/index.js");

var _GenericBarcode = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/GenericBarcode/index.js");

exports.default = {
	CODE39: _CODE.CODE39,
	CODE128: _CODE2.CODE128, CODE128A: _CODE2.CODE128A, CODE128B: _CODE2.CODE128B, CODE128C: _CODE2.CODE128C,
	EAN13: _EAN_UPC.EAN13, EAN8: _EAN_UPC.EAN8, EAN5: _EAN_UPC.EAN5, EAN2: _EAN_UPC.EAN2, UPC: _EAN_UPC.UPC, UPCE: _EAN_UPC.UPCE,
	ITF14: _ITF.ITF14,
	ITF: _ITF2.ITF,
	MSI: _MSI.MSI, MSI10: _MSI.MSI10, MSI11: _MSI.MSI11, MSI1010: _MSI.MSI1010, MSI1110: _MSI.MSI1110,
	pharmacode: _pharmacode.pharmacode,
	codabar: _codabar.codabar,
	GenericBarcode: _GenericBarcode.GenericBarcode
};

/***/ }),

/***/ "./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/pharmacode/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.pharmacode = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Barcode2 = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/barcodes/Barcode.js");

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation
// http://www.gomaro.ch/ftproot/Laetus_PHARMA-CODE.pdf

var pharmacode = function (_Barcode) {
	_inherits(pharmacode, _Barcode);

	function pharmacode(data, options) {
		_classCallCheck(this, pharmacode);

		var _this = _possibleConstructorReturn(this, (pharmacode.__proto__ || Object.getPrototypeOf(pharmacode)).call(this, data, options));

		_this.number = parseInt(data, 10);
		return _this;
	}

	_createClass(pharmacode, [{
		key: "encode",
		value: function encode() {
			var z = this.number;
			var result = "";

			// http://i.imgur.com/RMm4UDJ.png
			// (source: http://www.gomaro.ch/ftproot/Laetus_PHARMA-CODE.pdf, page: 34)
			while (!isNaN(z) && z != 0) {
				if (z % 2 === 0) {
					// Even
					result = "11100" + result;
					z = (z - 2) / 2;
				} else {
					// Odd
					result = "100" + result;
					z = (z - 1) / 2;
				}
			}

			// Remove the two last zeroes
			result = result.slice(0, -2);

			return {
				data: result,
				text: this.text
			};
		}
	}, {
		key: "valid",
		value: function valid() {
			return this.number >= 3 && this.number <= 131070;
		}
	}]);

	return pharmacode;
}(_Barcode3.default);

exports.pharmacode = pharmacode;

/***/ }),

/***/ "./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/exceptions/ErrorHandler.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*eslint no-console: 0 */

var ErrorHandler = function () {
	function ErrorHandler(api) {
		_classCallCheck(this, ErrorHandler);

		this.api = api;
	}

	_createClass(ErrorHandler, [{
		key: "handleCatch",
		value: function handleCatch(e) {
			// If babel supported extending of Error in a correct way instanceof would be used here
			if (e.name === "InvalidInputException") {
				if (this.api._options.valid !== this.api._defaults.valid) {
					this.api._options.valid(false);
				} else {
					throw e.message;
				}
			} else {
				throw e;
			}

			this.api.render = function () {};
		}
	}, {
		key: "wrapBarcodeCall",
		value: function wrapBarcodeCall(func) {
			try {
				var result = func.apply(undefined, arguments);
				this.api._options.valid(true);
				return result;
			} catch (e) {
				this.handleCatch(e);

				return this.api;
			}
		}
	}]);

	return ErrorHandler;
}();

exports.default = ErrorHandler;

/***/ }),

/***/ "./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/exceptions/exceptions.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InvalidInputException = function (_Error) {
	_inherits(InvalidInputException, _Error);

	function InvalidInputException(symbology, input) {
		_classCallCheck(this, InvalidInputException);

		var _this = _possibleConstructorReturn(this, (InvalidInputException.__proto__ || Object.getPrototypeOf(InvalidInputException)).call(this));

		_this.name = "InvalidInputException";

		_this.symbology = symbology;
		_this.input = input;

		_this.message = '"' + _this.input + '" is not a valid input for ' + _this.symbology;
		return _this;
	}

	return InvalidInputException;
}(Error);

var InvalidElementException = function (_Error2) {
	_inherits(InvalidElementException, _Error2);

	function InvalidElementException() {
		_classCallCheck(this, InvalidElementException);

		var _this2 = _possibleConstructorReturn(this, (InvalidElementException.__proto__ || Object.getPrototypeOf(InvalidElementException)).call(this));

		_this2.name = "InvalidElementException";
		_this2.message = "Not supported type to render on";
		return _this2;
	}

	return InvalidElementException;
}(Error);

var NoElementException = function (_Error3) {
	_inherits(NoElementException, _Error3);

	function NoElementException() {
		_classCallCheck(this, NoElementException);

		var _this3 = _possibleConstructorReturn(this, (NoElementException.__proto__ || Object.getPrototypeOf(NoElementException)).call(this));

		_this3.name = "NoElementException";
		_this3.message = "No element to render on.";
		return _this3;
	}

	return NoElementException;
}(Error);

exports.InvalidInputException = InvalidInputException;
exports.InvalidElementException = InvalidElementException;
exports.NoElementException = NoElementException;

/***/ }),

/***/ "./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/help/fixOptions.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = fixOptions;


function fixOptions(options) {
	// Fix the margins
	options.marginTop = options.marginTop || options.margin;
	options.marginBottom = options.marginBottom || options.margin;
	options.marginRight = options.marginRight || options.margin;
	options.marginLeft = options.marginLeft || options.margin;

	return options;
}

/***/ }),

/***/ "./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/help/getOptionsFromElement.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _optionsFromStrings = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/help/optionsFromStrings.js");

var _optionsFromStrings2 = _interopRequireDefault(_optionsFromStrings);

var _defaults = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/options/defaults.js");

var _defaults2 = _interopRequireDefault(_defaults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getOptionsFromElement(element) {
	var options = {};
	for (var property in _defaults2.default) {
		if (_defaults2.default.hasOwnProperty(property)) {
			// jsbarcode-*
			if (element.hasAttribute("jsbarcode-" + property.toLowerCase())) {
				options[property] = element.getAttribute("jsbarcode-" + property.toLowerCase());
			}

			// data-*
			if (element.hasAttribute("data-" + property.toLowerCase())) {
				options[property] = element.getAttribute("data-" + property.toLowerCase());
			}
		}
	}

	options["value"] = element.getAttribute("jsbarcode-value") || element.getAttribute("data-value");

	// Since all atributes are string they need to be converted to integers
	options = (0, _optionsFromStrings2.default)(options);

	return options;
}

exports.default = getOptionsFromElement;

/***/ }),

/***/ "./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/help/getRenderProperties.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* global HTMLImageElement */
/* global HTMLCanvasElement */
/* global SVGElement */

var _getOptionsFromElement = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/help/getOptionsFromElement.js");

var _getOptionsFromElement2 = _interopRequireDefault(_getOptionsFromElement);

var _renderers = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/renderers/index.js");

var _renderers2 = _interopRequireDefault(_renderers);

var _exceptions = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/exceptions/exceptions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Takes an element and returns an object with information about how
// it should be rendered
// This could also return an array with these objects
// {
//   element: The element that the renderer should draw on
//   renderer: The name of the renderer
//   afterRender (optional): If something has to done after the renderer
//     completed, calls afterRender (function)
//   options (optional): Options that can be defined in the element
// }

function getRenderProperties(element) {
	// If the element is a string, query select call again
	if (typeof element === "string") {
		return querySelectedRenderProperties(element);
	}
	// If element is array. Recursivly call with every object in the array
	else if (Array.isArray(element)) {
			var returnArray = [];
			for (var i = 0; i < element.length; i++) {
				returnArray.push(getRenderProperties(element[i]));
			}
			return returnArray;
		}
		// If element, render on canvas and set the uri as src
		else if (typeof HTMLCanvasElement !== 'undefined' && element instanceof HTMLImageElement) {
				return newCanvasRenderProperties(element);
			}
			// If SVG
			else if (element && element.nodeName === 'svg' || typeof SVGElement !== 'undefined' && element instanceof SVGElement) {
					return {
						element: element,
						options: (0, _getOptionsFromElement2.default)(element),
						renderer: _renderers2.default.SVGRenderer
					};
				}
				// If canvas (in browser)
				else if (typeof HTMLCanvasElement !== 'undefined' && element instanceof HTMLCanvasElement) {
						return {
							element: element,
							options: (0, _getOptionsFromElement2.default)(element),
							renderer: _renderers2.default.CanvasRenderer
						};
					}
					// If canvas (in node)
					else if (element && element.getContext) {
							return {
								element: element,
								renderer: _renderers2.default.CanvasRenderer
							};
						} else if (element && (typeof element === "undefined" ? "undefined" : _typeof(element)) === 'object' && !element.nodeName) {
							return {
								element: element,
								renderer: _renderers2.default.ObjectRenderer
							};
						} else {
							throw new _exceptions.InvalidElementException();
						}
}

function querySelectedRenderProperties(string) {
	var selector = document.querySelectorAll(string);
	if (selector.length === 0) {
		return undefined;
	} else {
		var returnArray = [];
		for (var i = 0; i < selector.length; i++) {
			returnArray.push(getRenderProperties(selector[i]));
		}
		return returnArray;
	}
}

function newCanvasRenderProperties(imgElement) {
	var canvas = document.createElement('canvas');
	return {
		element: canvas,
		options: (0, _getOptionsFromElement2.default)(imgElement),
		renderer: _renderers2.default.CanvasRenderer,
		afterRender: function afterRender() {
			imgElement.setAttribute("src", canvas.toDataURL());
		}
	};
}

exports.default = getRenderProperties;

/***/ }),

/***/ "./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/help/linearizeEncodings.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = linearizeEncodings;

// Encodings can be nestled like [[1-1, 1-2], 2, [3-1, 3-2]
// Convert to [1-1, 1-2, 2, 3-1, 3-2]

function linearizeEncodings(encodings) {
	var linearEncodings = [];
	function nextLevel(encoded) {
		if (Array.isArray(encoded)) {
			for (var i = 0; i < encoded.length; i++) {
				nextLevel(encoded[i]);
			}
		} else {
			encoded.text = encoded.text || "";
			encoded.data = encoded.data || "";
			linearEncodings.push(encoded);
		}
	}
	nextLevel(encodings);

	return linearEncodings;
}

/***/ }),

/***/ "./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/help/merge.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (old, replaceObj) {
  return _extends({}, old, replaceObj);
};

/***/ }),

/***/ "./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/help/optionsFromStrings.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = optionsFromStrings;

// Convert string to integers/booleans where it should be

function optionsFromStrings(options) {
	var intOptions = ["width", "height", "textMargin", "fontSize", "margin", "marginTop", "marginBottom", "marginLeft", "marginRight"];

	for (var intOption in intOptions) {
		if (intOptions.hasOwnProperty(intOption)) {
			intOption = intOptions[intOption];
			if (typeof options[intOption] === "string") {
				options[intOption] = parseInt(options[intOption], 10);
			}
		}
	}

	if (typeof options["displayValue"] === "string") {
		options["displayValue"] = options["displayValue"] != "false";
	}

	return options;
}

/***/ }),

/***/ "./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/options/defaults.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var defaults = {
	width: 2,
	height: 100,
	format: "auto",
	displayValue: true,
	fontOptions: "",
	font: "monospace",
	text: undefined,
	textAlign: "center",
	textPosition: "bottom",
	textMargin: 2,
	fontSize: 20,
	background: "#ffffff",
	lineColor: "#000000",
	margin: 10,
	marginTop: undefined,
	marginBottom: undefined,
	marginLeft: undefined,
	marginRight: undefined,
	valid: function valid() {}
};

exports.default = defaults;

/***/ }),

/***/ "./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/renderers/canvas.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _merge = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/help/merge.js");

var _merge2 = _interopRequireDefault(_merge);

var _shared = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/renderers/shared.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CanvasRenderer = function () {
	function CanvasRenderer(canvas, encodings, options) {
		_classCallCheck(this, CanvasRenderer);

		this.canvas = canvas;
		this.encodings = encodings;
		this.options = options;
	}

	_createClass(CanvasRenderer, [{
		key: "render",
		value: function render() {
			// Abort if the browser does not support HTML5 canvas
			if (!this.canvas.getContext) {
				throw new Error('The browser does not support canvas.');
			}

			this.prepareCanvas();
			for (var i = 0; i < this.encodings.length; i++) {
				var encodingOptions = (0, _merge2.default)(this.options, this.encodings[i].options);

				this.drawCanvasBarcode(encodingOptions, this.encodings[i]);
				this.drawCanvasText(encodingOptions, this.encodings[i]);

				this.moveCanvasDrawing(this.encodings[i]);
			}

			this.restoreCanvas();
		}
	}, {
		key: "prepareCanvas",
		value: function prepareCanvas() {
			// Get the canvas context
			var ctx = this.canvas.getContext("2d");

			ctx.save();

			(0, _shared.calculateEncodingAttributes)(this.encodings, this.options, ctx);
			var totalWidth = (0, _shared.getTotalWidthOfEncodings)(this.encodings);
			var maxHeight = (0, _shared.getMaximumHeightOfEncodings)(this.encodings);

			this.canvas.width = totalWidth + this.options.marginLeft + this.options.marginRight;

			this.canvas.height = maxHeight;

			// Paint the canvas
			ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			if (this.options.background) {
				ctx.fillStyle = this.options.background;
				ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
			}

			ctx.translate(this.options.marginLeft, 0);
		}
	}, {
		key: "drawCanvasBarcode",
		value: function drawCanvasBarcode(options, encoding) {
			// Get the canvas context
			var ctx = this.canvas.getContext("2d");

			var binary = encoding.data;

			// Creates the barcode out of the encoded binary
			var yFrom;
			if (options.textPosition == "top") {
				yFrom = options.marginTop + options.fontSize + options.textMargin;
			} else {
				yFrom = options.marginTop;
			}

			ctx.fillStyle = options.lineColor;

			for (var b = 0; b < binary.length; b++) {
				var x = b * options.width + encoding.barcodePadding;

				if (binary[b] === "1") {
					ctx.fillRect(x, yFrom, options.width, options.height);
				} else if (binary[b]) {
					ctx.fillRect(x, yFrom, options.width, options.height * binary[b]);
				}
			}
		}
	}, {
		key: "drawCanvasText",
		value: function drawCanvasText(options, encoding) {
			// Get the canvas context
			var ctx = this.canvas.getContext("2d");

			var font = options.fontOptions + " " + options.fontSize + "px " + options.font;

			// Draw the text if displayValue is set
			if (options.displayValue) {
				var x, y;

				if (options.textPosition == "top") {
					y = options.marginTop + options.fontSize - options.textMargin;
				} else {
					y = options.height + options.textMargin + options.marginTop + options.fontSize;
				}

				ctx.font = font;

				// Draw the text in the correct X depending on the textAlign option
				if (options.textAlign == "left" || encoding.barcodePadding > 0) {
					x = 0;
					ctx.textAlign = 'left';
				} else if (options.textAlign == "right") {
					x = encoding.width - 1;
					ctx.textAlign = 'right';
				}
				// In all other cases, center the text
				else {
						x = encoding.width / 2;
						ctx.textAlign = 'center';
					}

				ctx.fillText(encoding.text, x, y);
			}
		}
	}, {
		key: "moveCanvasDrawing",
		value: function moveCanvasDrawing(encoding) {
			var ctx = this.canvas.getContext("2d");

			ctx.translate(encoding.width, 0);
		}
	}, {
		key: "restoreCanvas",
		value: function restoreCanvas() {
			// Get the canvas context
			var ctx = this.canvas.getContext("2d");

			ctx.restore();
		}
	}]);

	return CanvasRenderer;
}();

exports.default = CanvasRenderer;

/***/ }),

/***/ "./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/renderers/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _canvas = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/renderers/canvas.js");

var _canvas2 = _interopRequireDefault(_canvas);

var _svg = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/renderers/svg.js");

var _svg2 = _interopRequireDefault(_svg);

var _object = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/renderers/object.js");

var _object2 = _interopRequireDefault(_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { CanvasRenderer: _canvas2.default, SVGRenderer: _svg2.default, ObjectRenderer: _object2.default };

/***/ }),

/***/ "./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/renderers/object.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ObjectRenderer = function () {
	function ObjectRenderer(object, encodings, options) {
		_classCallCheck(this, ObjectRenderer);

		this.object = object;
		this.encodings = encodings;
		this.options = options;
	}

	_createClass(ObjectRenderer, [{
		key: "render",
		value: function render() {
			this.object.encodings = this.encodings;
		}
	}]);

	return ObjectRenderer;
}();

exports.default = ObjectRenderer;

/***/ }),

/***/ "./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/renderers/shared.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getTotalWidthOfEncodings = exports.calculateEncodingAttributes = exports.getBarcodePadding = exports.getEncodingHeight = exports.getMaximumHeightOfEncodings = undefined;

var _merge = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/help/merge.js");

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getEncodingHeight(encoding, options) {
	return options.height + (options.displayValue && encoding.text.length > 0 ? options.fontSize + options.textMargin : 0) + options.marginTop + options.marginBottom;
}

function getBarcodePadding(textWidth, barcodeWidth, options) {
	if (options.displayValue && barcodeWidth < textWidth) {
		if (options.textAlign == "center") {
			return Math.floor((textWidth - barcodeWidth) / 2);
		} else if (options.textAlign == "left") {
			return 0;
		} else if (options.textAlign == "right") {
			return Math.floor(textWidth - barcodeWidth);
		}
	}
	return 0;
}

function calculateEncodingAttributes(encodings, barcodeOptions, context) {
	for (var i = 0; i < encodings.length; i++) {
		var encoding = encodings[i];
		var options = (0, _merge2.default)(barcodeOptions, encoding.options);

		// Calculate the width of the encoding
		var textWidth;
		if (options.displayValue) {
			textWidth = messureText(encoding.text, options, context);
		} else {
			textWidth = 0;
		}

		var barcodeWidth = encoding.data.length * options.width;
		encoding.width = Math.ceil(Math.max(textWidth, barcodeWidth));

		encoding.height = getEncodingHeight(encoding, options);

		encoding.barcodePadding = getBarcodePadding(textWidth, barcodeWidth, options);
	}
}

function getTotalWidthOfEncodings(encodings) {
	var totalWidth = 0;
	for (var i = 0; i < encodings.length; i++) {
		totalWidth += encodings[i].width;
	}
	return totalWidth;
}

function getMaximumHeightOfEncodings(encodings) {
	var maxHeight = 0;
	for (var i = 0; i < encodings.length; i++) {
		if (encodings[i].height > maxHeight) {
			maxHeight = encodings[i].height;
		}
	}
	return maxHeight;
}

function messureText(string, options, context) {
	var ctx;

	if (context) {
		ctx = context;
	} else if (typeof document !== "undefined") {
		ctx = document.createElement("canvas").getContext("2d");
	} else {
		// If the text cannot be messured we will return 0.
		// This will make some barcode with big text render incorrectly
		return 0;
	}
	ctx.font = options.fontOptions + " " + options.fontSize + "px " + options.font;

	// Calculate the width of the encoding
	var size = ctx.measureText(string).width;

	return size;
}

exports.getMaximumHeightOfEncodings = getMaximumHeightOfEncodings;
exports.getEncodingHeight = getEncodingHeight;
exports.getBarcodePadding = getBarcodePadding;
exports.calculateEncodingAttributes = calculateEncodingAttributes;
exports.getTotalWidthOfEncodings = getTotalWidthOfEncodings;

/***/ }),

/***/ "./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/renderers/svg.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _merge = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/help/merge.js");

var _merge2 = _interopRequireDefault(_merge);

var _shared = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/renderers/shared.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var svgns = "http://www.w3.org/2000/svg";

var SVGRenderer = function () {
	function SVGRenderer(svg, encodings, options) {
		_classCallCheck(this, SVGRenderer);

		this.svg = svg;
		this.encodings = encodings;
		this.options = options;
		this.document = options.xmlDocument || document;
	}

	_createClass(SVGRenderer, [{
		key: "render",
		value: function render() {
			var currentX = this.options.marginLeft;

			this.prepareSVG();
			for (var i = 0; i < this.encodings.length; i++) {
				var encoding = this.encodings[i];
				var encodingOptions = (0, _merge2.default)(this.options, encoding.options);

				var group = this.createGroup(currentX, encodingOptions.marginTop, this.svg);

				this.setGroupOptions(group, encodingOptions);

				this.drawSvgBarcode(group, encodingOptions, encoding);
				this.drawSVGText(group, encodingOptions, encoding);

				currentX += encoding.width;
			}
		}
	}, {
		key: "prepareSVG",
		value: function prepareSVG() {
			// Clear the SVG
			while (this.svg.firstChild) {
				this.svg.removeChild(this.svg.firstChild);
			}

			(0, _shared.calculateEncodingAttributes)(this.encodings, this.options);
			var totalWidth = (0, _shared.getTotalWidthOfEncodings)(this.encodings);
			var maxHeight = (0, _shared.getMaximumHeightOfEncodings)(this.encodings);

			var width = totalWidth + this.options.marginLeft + this.options.marginRight;
			this.setSvgAttributes(width, maxHeight);

			if (this.options.background) {
				this.drawRect(0, 0, width, maxHeight, this.svg).setAttribute("style", "fill:" + this.options.background + ";");
			}
		}
	}, {
		key: "drawSvgBarcode",
		value: function drawSvgBarcode(parent, options, encoding) {
			var binary = encoding.data;

			// Creates the barcode out of the encoded binary
			var yFrom;
			if (options.textPosition == "top") {
				yFrom = options.fontSize + options.textMargin;
			} else {
				yFrom = 0;
			}

			var barWidth = 0;
			var x = 0;
			for (var b = 0; b < binary.length; b++) {
				x = b * options.width + encoding.barcodePadding;

				if (binary[b] === "1") {
					barWidth++;
				} else if (barWidth > 0) {
					this.drawRect(x - options.width * barWidth, yFrom, options.width * barWidth, options.height, parent);
					barWidth = 0;
				}
			}

			// Last draw is needed since the barcode ends with 1
			if (barWidth > 0) {
				this.drawRect(x - options.width * (barWidth - 1), yFrom, options.width * barWidth, options.height, parent);
			}
		}
	}, {
		key: "drawSVGText",
		value: function drawSVGText(parent, options, encoding) {
			var textElem = this.document.createElementNS(svgns, 'text');

			// Draw the text if displayValue is set
			if (options.displayValue) {
				var x, y;

				textElem.setAttribute("style", "font:" + options.fontOptions + " " + options.fontSize + "px " + options.font);

				if (options.textPosition == "top") {
					y = options.fontSize - options.textMargin;
				} else {
					y = options.height + options.textMargin + options.fontSize;
				}

				// Draw the text in the correct X depending on the textAlign option
				if (options.textAlign == "left" || encoding.barcodePadding > 0) {
					x = 0;
					textElem.setAttribute("text-anchor", "start");
				} else if (options.textAlign == "right") {
					x = encoding.width - 1;
					textElem.setAttribute("text-anchor", "end");
				}
				// In all other cases, center the text
				else {
						x = encoding.width / 2;
						textElem.setAttribute("text-anchor", "middle");
					}

				textElem.setAttribute("x", x);
				textElem.setAttribute("y", y);

				textElem.appendChild(this.document.createTextNode(encoding.text));

				parent.appendChild(textElem);
			}
		}
	}, {
		key: "setSvgAttributes",
		value: function setSvgAttributes(width, height) {
			var svg = this.svg;
			svg.setAttribute("width", width + "px");
			svg.setAttribute("height", height + "px");
			svg.setAttribute("x", "0px");
			svg.setAttribute("y", "0px");
			svg.setAttribute("viewBox", "0 0 " + width + " " + height);

			svg.setAttribute("xmlns", svgns);
			svg.setAttribute("version", "1.1");

			svg.setAttribute("style", "transform: translate(0,0)");
		}
	}, {
		key: "createGroup",
		value: function createGroup(x, y, parent) {
			var group = this.document.createElementNS(svgns, 'g');
			group.setAttribute("transform", "translate(" + x + ", " + y + ")");

			parent.appendChild(group);

			return group;
		}
	}, {
		key: "setGroupOptions",
		value: function setGroupOptions(group, options) {
			group.setAttribute("style", "fill:" + options.lineColor + ";");
		}
	}, {
		key: "drawRect",
		value: function drawRect(x, y, width, height, parent) {
			var rect = this.document.createElementNS(svgns, 'rect');

			rect.setAttribute("x", x);
			rect.setAttribute("y", y);
			rect.setAttribute("width", width);
			rect.setAttribute("height", height);

			parent.appendChild(rect);

			return rect;
		}
	}]);

	return SVGRenderer;
}();

exports.default = SVGRenderer;

/***/ }),

/***/ "./node_modules/rxjs/_esm5/add/observable/timer.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__observable_timer__ = __webpack_require__("./node_modules/rxjs/_esm5/observable/timer.js");
/** PURE_IMPORTS_START .._.._Observable,.._.._observable_timer PURE_IMPORTS_END */


__WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */].timer = __WEBPACK_IMPORTED_MODULE_1__observable_timer__["a" /* timer */];
//# sourceMappingURL=timer.js.map


/***/ }),

/***/ "./src/app/wechat/components/app-component-base.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponentBase; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services__ = __webpack_require__("./src/app/services/index.ts");


var AppComponentBase = /** @class */ (function () {
    function AppComponentBase(injector) {
        var _this = this;
        this.query = {
            pageIndex: 1,
            pageSize: 10,
            skipCount: function () { return (this.pageIndex - 1) * this.pageSize; },
            total: 0,
            sorter: ''
        };
        this.activatedRoute = injector.get(__WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* ActivatedRoute */]);
        this.settingsService = injector.get(__WEBPACK_IMPORTED_MODULE_1__services__["b" /* SettingsService */]);
        this.activatedRoute.params.subscribe(function (params) {
            var openId = params['openId'];
            var tenantId = params['tenantId'];
            _this.id = params['id'];
            if (openId) {
                _this.settingsService.setUserId(openId, tenantId);
            }
            console.log('openId:' + openId);
            console.log('tenantId:' + tenantId);
            console.log('id:' + _this.id);
        });
    }
    Object.defineProperty(AppComponentBase.prototype, "WUserParams", {
        get: function () {
            var params = {};
            if (this.settingsService.tenantId) {
                params.tenantId = this.settingsService.tenantId;
            }
            if (this.settingsService.openId) {
                params.openId = this.settingsService.openId;
            }
            return params;
        },
        enumerable: true,
        configurable: true
    });
    return AppComponentBase;
}());



/***/ }),

/***/ "./src/app/wechat/personal-center/member-card/member-card.component.html":
/***/ (function(module, exports) {

module.exports = "<Page [ngClass]=\"'panel'\" [title]=\"'会员卡'\" [showTitle]=\"false\" [spacing]=\"false\">\r\n    <div class=\"weui-media-box weui-media-box_small-appmsg\">\r\n        <div class=\"weui-cells\">\r\n            <div class=\"weui-cell weui-cell_access\" >\r\n                <div class=\"weui-cell__hd\">\r\n                    <img src=\"./assets/images/icon_nav_layout.png\" alt=\"\" style=\"width:20px;margin-right:5px;display:block\">\r\n                </div>\r\n                <div class=\"weui-cell__bd weui-cell_primary\">\r\n                    <p>会员卡</p>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"weui-cells__title\">购买商品扫码积分</div>\r\n    <div class=\"weui-cells\">\r\n        <div class=\"weui-cell\">\r\n            <div style=\"text-align: center; width: 100%;\">\r\n                <img id=\"barcode\" />\r\n            </div>\r\n        </div>\r\n        <div class=\"weui-cell\" style=\"font-size: 14px;\" *ngIf=\"user\">\r\n            <div class=\"weui-cell__bd\">\r\n                <span style=\"vertical-align: middle\">会员名</span>\r\n            </div>\r\n            <div class=\"weui-cell__ft\">{{user.nickName}}</div>\r\n        </div>\r\n        <div class=\"weui-cell\" style=\"font-size: 14px;\" *ngIf=\"user\">\r\n            <div class=\"weui-cell__bd\">\r\n                <span style=\"vertical-align: middle\">会员类型</span>\r\n            </div>\r\n            <div class=\"weui-cell__ft\">{{user.userTypeName}}</div>\r\n        </div>\r\n    </div>\r\n</Page>"

/***/ }),

/***/ "./src/app/wechat/personal-center/member-card/member-card.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/wechat/personal-center/member-card/member-card.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MemberCardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_app_component_base__ = __webpack_require__("./src/app/wechat/components/app-component-base.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services__ = __webpack_require__("./src/app/services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jsbarcode__ = __webpack_require__("./node_modules/_jsbarcode@3.9.0@jsbarcode/bin/JsBarcode.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jsbarcode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_jsbarcode__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MemberCardComponent = /** @class */ (function (_super) {
    __extends(MemberCardComponent, _super);
    function MemberCardComponent(injector, wechatUserService, router) {
        var _this = _super.call(this, injector) || this;
        _this.wechatUserService = wechatUserService;
        _this.router = router;
        return _this;
    }
    MemberCardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.settingsService.getUser().subscribe(function (result) {
            _this.user = result;
            if (!_this.user || !_this.user.phone || !_this.user.memberBarCode) {
                _this.router.navigate(["/center/bind-member"]);
            }
            else {
                _this.generateBarcode('barcode', _this.user.memberBarCode);
            }
        });
    };
    MemberCardComponent.prototype.generateBarcode = function (id, code) {
        var barcode = document.getElementById(id), options = {
            format: 'CODE128',
            displayValue: true,
            background: '#FAFAFA',
            fontSize: 20,
            height: 100,
            font: 'sans-serif' //,
            //fontOptions: 'bold'
        };
        JsBarcode(barcode, code, options);
    };
    MemberCardComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'wechat-member-card',
            template: __webpack_require__("./src/app/wechat/personal-center/member-card/member-card.component.html"),
            styles: [__webpack_require__("./src/app/wechat/personal-center/member-card/member-card.component.scss")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"], __WEBPACK_IMPORTED_MODULE_2__services__["d" /* WechatUserService */], __WEBPACK_IMPORTED_MODULE_4__angular_router__["d" /* Router */]])
    ], MemberCardComponent);
    return MemberCardComponent;
}(__WEBPACK_IMPORTED_MODULE_1__components_app_component_base__["a" /* AppComponentBase */]));



/***/ }),

/***/ "./src/app/wechat/personal-center/personal-center.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PersonalCenterModule", function() { return PersonalCenterModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular_split__ = __webpack_require__("./node_modules/angular-split/esm5/angular-split.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__personal_personal_component__ = __webpack_require__("./src/app/wechat/personal-center/personal/personal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_shared_module__ = __webpack_require__("./src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_components_module__ = __webpack_require__("./src/app/wechat/components/components.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__member_card_member_card_component__ = __webpack_require__("./src/app/wechat/personal-center/member-card/member-card.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__personal_bind_member_bind_member_component__ = __webpack_require__("./src/app/wechat/personal-center/personal/bind-member/bind-member.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__personal_bind_retailer_bind_retailer_component__ = __webpack_require__("./src/app/wechat/personal-center/personal/bind-retailer/bind-retailer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__shop_shop_component__ = __webpack_require__("./src/app/wechat/personal-center/shop/shop.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__personal_bind_staff_bind_staff_component__ = __webpack_require__("./src/app/wechat/personal-center/personal/bind-staff/bind-staff.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__shop_wait_audit_wait_audit_component__ = __webpack_require__("./src/app/wechat/personal-center/shop/wait-audit/wait-audit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__shop_shop_add_shop_add_component__ = __webpack_require__("./src/app/wechat/personal-center/shop/shop-add/shop-add.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__scan_scan_component__ = __webpack_require__("./src/app/wechat/personal-center/scan/scan.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














// region: components
var COMPONENTS = [__WEBPACK_IMPORTED_MODULE_3__personal_personal_component__["a" /* PersonalComponent */],
    __WEBPACK_IMPORTED_MODULE_6__member_card_member_card_component__["a" /* MemberCardComponent */],
    __WEBPACK_IMPORTED_MODULE_7__personal_bind_member_bind_member_component__["a" /* BindMemberComponent */],
    __WEBPACK_IMPORTED_MODULE_8__personal_bind_retailer_bind_retailer_component__["a" /* BindRetailerComponent */],
    __WEBPACK_IMPORTED_MODULE_9__shop_shop_component__["a" /* ShopComponent */],
    __WEBPACK_IMPORTED_MODULE_10__personal_bind_staff_bind_staff_component__["a" /* BindStaffComponent */],
    __WEBPACK_IMPORTED_MODULE_11__shop_wait_audit_wait_audit_component__["a" /* WaitAuditComponent */],
    __WEBPACK_IMPORTED_MODULE_12__shop_shop_add_shop_add_component__["a" /* ShopAddComponent */],
    __WEBPACK_IMPORTED_MODULE_13__scan_scan_component__["a" /* ScanComponent */]];
var routes = [
    { path: '', redirectTo: 'personal' },
    { path: 'personal', component: __WEBPACK_IMPORTED_MODULE_3__personal_personal_component__["a" /* PersonalComponent */] },
    { path: 'personal/:openId/:tenantId', component: __WEBPACK_IMPORTED_MODULE_3__personal_personal_component__["a" /* PersonalComponent */] },
    { path: 'member-card', component: __WEBPACK_IMPORTED_MODULE_6__member_card_member_card_component__["a" /* MemberCardComponent */] },
    { path: 'member-card/:openId/:tenantId', component: __WEBPACK_IMPORTED_MODULE_6__member_card_member_card_component__["a" /* MemberCardComponent */] },
    { path: 'bind-member', component: __WEBPACK_IMPORTED_MODULE_7__personal_bind_member_bind_member_component__["a" /* BindMemberComponent */] },
    { path: 'bind-retailer', component: __WEBPACK_IMPORTED_MODULE_8__personal_bind_retailer_bind_retailer_component__["a" /* BindRetailerComponent */] },
    { path: 'bind-retailer/:openId/:tenantId', component: __WEBPACK_IMPORTED_MODULE_8__personal_bind_retailer_bind_retailer_component__["a" /* BindRetailerComponent */] },
    { path: 'shop', component: __WEBPACK_IMPORTED_MODULE_9__shop_shop_component__["a" /* ShopComponent */] },
    { path: 'shop/:openId/:tenantId', component: __WEBPACK_IMPORTED_MODULE_9__shop_shop_component__["a" /* ShopComponent */] },
    { path: 'bind-staff', component: __WEBPACK_IMPORTED_MODULE_10__personal_bind_staff_bind_staff_component__["a" /* BindStaffComponent */] },
    { path: 'wait-audit', component: __WEBPACK_IMPORTED_MODULE_11__shop_wait_audit_wait_audit_component__["a" /* WaitAuditComponent */] },
    { path: 'shop-add', component: __WEBPACK_IMPORTED_MODULE_12__shop_shop_add_shop_add_component__["a" /* ShopAddComponent */] },
    { path: 'scan', component: __WEBPACK_IMPORTED_MODULE_13__scan_scan_component__["a" /* ScanComponent */] },
    { path: 'scan/:openId/:tenantId', component: __WEBPACK_IMPORTED_MODULE_13__scan_scan_component__["a" /* ScanComponent */] },
];
// endregion
var PersonalCenterModule = /** @class */ (function () {
    function PersonalCenterModule() {
    }
    PersonalCenterModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_4__shared_shared_module__["a" /* SharedModule */],
                __WEBPACK_IMPORTED_MODULE_2_angular_split__["a" /* AngularSplitModule */],
                __WEBPACK_IMPORTED_MODULE_5__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* RouterModule */].forChild(routes)
            ],
            declarations: COMPONENTS.slice()
        })
    ], PersonalCenterModule);
    return PersonalCenterModule;
}());



/***/ }),

/***/ "./src/app/wechat/personal-center/personal/bind-member/bind-member.component.html":
/***/ (function(module, exports) {

module.exports = "<Page [ngClass]=\"'input'\" [title]=\"'手机号绑定'\" [subTitle]=\"'绑定手机号立即成为会员'\" [showTitle]=\"false\" [spacing]=\"false\">\r\n    <div class=\"weui-media-box weui-media-box_small-appmsg\">\r\n        <div class=\"weui-cells\">\r\n            <div class=\"weui-cell weui-cell_access\" >\r\n                <div class=\"weui-cell__hd\">\r\n                    <img src=\"./assets/images/shop/PDA-o.png\" alt=\"\" style=\"width:25px;margin-right:5px;display:block\">\r\n                </div>\r\n                <div class=\"weui-cell__bd weui-cell_primary\">\r\n                    <p>手机号绑定</p>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <form #f=\"ngForm\" (ngSubmit)=\"onSave()\">\r\n        <div class=\"weui-cells__title\">更换或绑定手机号，绑定手机号可购买商品扫码积分</div>\r\n        <div class=\"weui-cells weui-cells_form\">\r\n            <div class=\"weui-cell weui-cell_warn\">\r\n                <div class=\"weui-cell__hd\">\r\n                    <label class=\"weui-label\">手机号</label>\r\n                </div>\r\n                <div class=\"weui-cell__bd\">\r\n                    <input class=\"weui-input\" type=\"tel\" [(ngModel)]=\"res.phone\" name=\"phone\" placeholder=\"请输入手机号\" weui-input=\"mobile\" weui-required>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"weui-btn-area\">\r\n            <button class=\"weui-btn weui-btn_primary\" [disabled]=\"!f.form.valid || !f.form.dirty\" [ngClass]=\"{'weui-btn_disabled': !f.form.valid || !f.form.dirty}\">绑定</button>\r\n        </div>\r\n    </form>\r\n    <!--将对话框组件放在底部-->\r\n    <weui-toptips #toptips></weui-toptips>\r\n    <weui-toast #loading [type]=\"'loading'\" [text]=\"'提交中...'\"></weui-toast>\r\n</Page>"

/***/ }),

/***/ "./src/app/wechat/personal-center/personal/bind-member/bind-member.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/wechat/personal-center/personal/bind-member/bind-member.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BindMemberComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_app_component_base__ = __webpack_require__("./src/app/wechat/components/app-component-base.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services__ = __webpack_require__("./src/app/services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_weui_toptips__ = __webpack_require__("./components/toptips/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ngx_weui_toast__ = __webpack_require__("./components/toast/index.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var BindMemberComponent = /** @class */ (function (_super) {
    __extends(BindMemberComponent, _super);
    function BindMemberComponent(injector, wechatUserService, router, srv) {
        var _this = _super.call(this, injector) || this;
        _this.wechatUserService = wechatUserService;
        _this.router = router;
        _this.srv = srv;
        _this.res = {};
        return _this;
    }
    BindMemberComponent.prototype.onSave = function () {
        var _this = this;
        this.res.openId = this.settingsService.openId;
        if (this.settingsService.tenantId) {
            this.res.tenantId = this.settingsService.tenantId;
        }
        this.loadingToast._showd = true;
        this.wechatUserService.BindMemberAsync(this.res).subscribe(function (result) {
            _this.loadingToast.onHide();
            if (result.code == 0) {
                _this.srv['success']('绑定成功');
                _this.settingsService.setUser(result.data);
                _this.router.navigate(["/center/member-card"]);
            }
            else {
                _this.srv['warn'](result.msg);
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('toptips'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4_ngx_weui_toptips__["a" /* ToptipsComponent */])
    ], BindMemberComponent.prototype, "toptips", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('loading'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_5_ngx_weui_toast__["a" /* ToastComponent */])
    ], BindMemberComponent.prototype, "loadingToast", void 0);
    BindMemberComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'wechat-bind-member',
            template: __webpack_require__("./src/app/wechat/personal-center/personal/bind-member/bind-member.component.html"),
            styles: [__webpack_require__("./src/app/wechat/personal-center/personal/bind-member/bind-member.component.scss")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"],
            __WEBPACK_IMPORTED_MODULE_2__services__["d" /* WechatUserService */],
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["d" /* Router */],
            __WEBPACK_IMPORTED_MODULE_4_ngx_weui_toptips__["b" /* ToptipsService */]])
    ], BindMemberComponent);
    return BindMemberComponent;
}(__WEBPACK_IMPORTED_MODULE_1__components_app_component_base__["a" /* AppComponentBase */]));



/***/ }),

/***/ "./src/app/wechat/personal-center/personal/bind-retailer/bind-retailer.component.html":
/***/ (function(module, exports) {

module.exports = "<Page [ngClass]=\"'input'\" [title]=\"'零售客户绑定'\" [showTitle]=\"false\" [showBack]=\"false\" [spacing]=\"false\">\r\n    <div class=\"weui-media-box weui-media-box_small-appmsg\">\r\n        <div class=\"weui-cells\">\r\n            <a class=\"weui-cell weui-cell_access\" href=\"javascript:;\">\r\n                <div class=\"weui-cell__hd\">\r\n                    <img src=\"./assets/images/icon_nav_dialog.png\" alt=\"\" style=\"width:20px;margin-right:5px;display:block\">\r\n                </div>\r\n                <div class=\"weui-cell__bd weui-cell_primary\">\r\n                    <p>零售客户绑定</p>\r\n                </div>\r\n            </a>\r\n\r\n        </div>\r\n    </div>\r\n    <form #f=\"ngForm\" (ngSubmit)=\"onSave()\">\r\n        <div class=\"weui-cells__title\">绑定后可进行店铺、特色商品、店员管理</div>\r\n        <div class=\"weui-cells weui-cells_form\">\r\n            <div class=\"weui-cell weui-cell_warn\">\r\n                <div class=\"weui-cell__hd\">\r\n                    <label class=\"weui-label\">专卖证</label>\r\n                </div>\r\n                <div class=\"weui-cell__bd\">\r\n                    <input class=\"weui-input\" type=\"text\" [(ngModel)]=\"res.licenseKey\" name=\"licenseKey\" weui-input=\"licenseKey\" placeholder=\"请输入专卖证号\" weui-required>\r\n                </div>\r\n            </div>\r\n            <div class=\"weui-cell weui-cell_warn\">\r\n                <div class=\"weui-cell__hd\">\r\n                    <label class=\"weui-label\">验证码</label>\r\n                </div>\r\n                <div class=\"weui-cell__bd\">\r\n                    <input class=\"weui-input\" type=\"text\" [(ngModel)]=\"res.verificationCode\" name=\"verificationCode\" weui-input=\"verificationCode\" placeholder=\"请输入验证码\" weui-required>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"weui-cells__tips\">店员绑定，需店铺管理员审核</div>\r\n        <div class=\"weui-btn-area\">\r\n            <button class=\"weui-btn weui-btn_primary\" [disabled]=\"!f.form.valid || !f.form.dirty\" [ngClass]=\"{'weui-btn_disabled': !f.form.valid || !f.form.dirty}\">绑定</button>\r\n        </div>\r\n    </form>\r\n    <!--将对话框组件放在底部-->\r\n    <weui-toptips #toptips></weui-toptips>\r\n    <weui-toast #loading [type]=\"'loading'\" [text]=\"'提交中...'\"></weui-toast>\r\n</Page>"

/***/ }),

/***/ "./src/app/wechat/personal-center/personal/bind-retailer/bind-retailer.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/wechat/personal-center/personal/bind-retailer/bind-retailer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BindRetailerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_app_component_base__ = __webpack_require__("./src/app/wechat/components/app-component-base.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services__ = __webpack_require__("./src/app/services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_weui_toptips__ = __webpack_require__("./components/toptips/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ngx_weui_toast__ = __webpack_require__("./components/toast/index.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var BindRetailerComponent = /** @class */ (function (_super) {
    __extends(BindRetailerComponent, _super);
    function BindRetailerComponent(injector, wechatUserService, router, srv) {
        var _this = _super.call(this, injector) || this;
        _this.wechatUserService = wechatUserService;
        _this.router = router;
        _this.srv = srv;
        _this.res = {};
        return _this;
    }
    BindRetailerComponent.prototype.onSave = function () {
        var _this = this;
        this.res.openId = this.settingsService.openId;
        if (this.settingsService.tenantId) {
            this.res.tenantId = this.settingsService.tenantId;
        }
        this.res.userType = 1; //零售客户
        this.loadingToast._showd = true;
        this.wechatUserService.BindWeChatUserAsync(this.res).subscribe(function (result) {
            _this.loadingToast.onHide();
            if (result.code == 0) {
                _this.srv['success']('绑定成功');
                _this.settingsService.setUser(result.data);
                _this.router.navigate(["/center/shop"]);
            }
            else {
                _this.srv['warn'](result.msg);
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('toptips'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4_ngx_weui_toptips__["a" /* ToptipsComponent */])
    ], BindRetailerComponent.prototype, "toptips", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('loading'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_5_ngx_weui_toast__["a" /* ToastComponent */])
    ], BindRetailerComponent.prototype, "loadingToast", void 0);
    BindRetailerComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'wechat-bind-retailer',
            template: __webpack_require__("./src/app/wechat/personal-center/personal/bind-retailer/bind-retailer.component.html"),
            styles: [__webpack_require__("./src/app/wechat/personal-center/personal/bind-retailer/bind-retailer.component.scss")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"],
            __WEBPACK_IMPORTED_MODULE_2__services__["d" /* WechatUserService */],
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["d" /* Router */],
            __WEBPACK_IMPORTED_MODULE_4_ngx_weui_toptips__["b" /* ToptipsService */]])
    ], BindRetailerComponent);
    return BindRetailerComponent;
}(__WEBPACK_IMPORTED_MODULE_1__components_app_component_base__["a" /* AppComponentBase */]));



/***/ }),

/***/ "./src/app/wechat/personal-center/personal/bind-staff/bind-staff.component.html":
/***/ (function(module, exports) {

module.exports = "<Page [ngClass]=\"'input'\" [title]=\"'内部员工绑定'\" [showTitle]=\"false\" [showBack]=\"false\" [spacing]=\"false\">\r\n    <div class=\"weui-media-box weui-media-box_small-appmsg\">\r\n        <div class=\"weui-cells\">\r\n            <a class=\"weui-cell weui-cell_access\" href=\"javascript:;\">\r\n                <div class=\"weui-cell__hd\">\r\n                    <img src=\"./assets/images/icon_nav_dialog.png\" alt=\"\" style=\"width:20px;margin-right:5px;display:block\">\r\n                </div>\r\n                <div class=\"weui-cell__bd weui-cell_primary\">\r\n                    <p>内部员工绑定</p>\r\n                </div>\r\n            </a>\r\n        </div>\r\n    </div>\r\n    <form #f=\"ngForm\" (ngSubmit)=\"onSave()\">\r\n        <div class=\"weui-cells__title\">绑定后获得内部员工权限</div>\r\n        <div class=\"weui-cells weui-cells_form\">\r\n            <div class=\"weui-cell weui-cell_warn\">\r\n                <div class=\"weui-cell__hd\">\r\n                    <label class=\"weui-label\">员工编码</label>\r\n                </div>\r\n                <div class=\"weui-cell__bd\">\r\n                    <input class=\"weui-input\" type=\"text\" [(ngModel)]=\"res.code\" name=\"code\" weui-input=\"code\" placeholder=\"请输入员工编码\" weui-required>\r\n                </div>\r\n            </div>\r\n            <div class=\"weui-cell weui-cell_warn\">\r\n                <div class=\"weui-cell__hd\">\r\n                    <label class=\"weui-label\">验证码</label>\r\n                </div>\r\n                <div class=\"weui-cell__bd\">\r\n                    <input class=\"weui-input\" type=\"text\" [(ngModel)]=\"res.verificationCode\" name=\"verificationCode\" weui-input=\"verificationCode\" placeholder=\"请输入验证码\" weui-required>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"weui-btn-area\">\r\n            <button class=\"weui-btn weui-btn_primary\" [disabled]=\"!f.form.valid || !f.form.dirty\" [ngClass]=\"{'weui-btn_disabled': !f.form.valid || !f.form.dirty}\">绑定</button>\r\n        </div>\r\n    </form>\r\n    <!--将对话框组件放在底部-->\r\n    <weui-toptips #toptips></weui-toptips>\r\n    <weui-toast #loading [type]=\"'loading'\" [text]=\"'提交中...'\"></weui-toast>\r\n</Page>"

/***/ }),

/***/ "./src/app/wechat/personal-center/personal/bind-staff/bind-staff.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/wechat/personal-center/personal/bind-staff/bind-staff.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BindStaffComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_app_component_base__ = __webpack_require__("./src/app/wechat/components/app-component-base.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services__ = __webpack_require__("./src/app/services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_weui_toptips__ = __webpack_require__("./components/toptips/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ngx_weui_toast__ = __webpack_require__("./components/toast/index.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var BindStaffComponent = /** @class */ (function (_super) {
    __extends(BindStaffComponent, _super);
    function BindStaffComponent(injector, wechatUserService, router, srv) {
        var _this = _super.call(this, injector) || this;
        _this.wechatUserService = wechatUserService;
        _this.router = router;
        _this.srv = srv;
        _this.res = {};
        return _this;
    }
    BindStaffComponent.prototype.onSave = function () {
        var _this = this;
        this.res.openId = this.settingsService.openId;
        if (this.settingsService.tenantId) {
            this.res.tenantId = this.settingsService.tenantId;
        }
        this.res.userType = 2; //内部员工
        this.loadingToast._showd = true;
        this.wechatUserService.BindWeChatUserAsync(this.res).subscribe(function (result) {
            _this.loadingToast.onHide();
            if (result.code == 0) {
                _this.srv['success']('绑定成功');
                _this.settingsService.setUser(result.data);
                _this.router.navigate(["/center/personal"]);
            }
            else {
                _this.srv['warn'](result.msg);
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('toptips'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4_ngx_weui_toptips__["a" /* ToptipsComponent */])
    ], BindStaffComponent.prototype, "toptips", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('loading'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_5_ngx_weui_toast__["a" /* ToastComponent */])
    ], BindStaffComponent.prototype, "loadingToast", void 0);
    BindStaffComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'wechat-bind-staff',
            template: __webpack_require__("./src/app/wechat/personal-center/personal/bind-staff/bind-staff.component.html"),
            styles: [__webpack_require__("./src/app/wechat/personal-center/personal/bind-staff/bind-staff.component.scss")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"],
            __WEBPACK_IMPORTED_MODULE_2__services__["d" /* WechatUserService */],
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["d" /* Router */],
            __WEBPACK_IMPORTED_MODULE_4_ngx_weui_toptips__["b" /* ToptipsService */]])
    ], BindStaffComponent);
    return BindStaffComponent;
}(__WEBPACK_IMPORTED_MODULE_1__components_app_component_base__["a" /* AppComponentBase */]));



/***/ }),

/***/ "./src/app/wechat/personal-center/personal/personal.component.html":
/***/ (function(module, exports) {

module.exports = "<Page [ngClass]=\"'badge'\" [spacing]=\"false\" [ftBottom]=\"true\" [showTitle]=\"false\" [showBindStaff]=\"true\">\r\n    <div class=\"weui-cells\" *ngIf=\"user\">\r\n        <div class=\"weui-cell\">\r\n            <div class=\"weui-cell__hd\" style=\"position: relative;margin-right: 10px;\">\r\n                <img src=\"{{user.headImgUrl}}\" style=\"width: 50px;display: block\">\r\n            </div>\r\n            <div class=\"weui-cell__bd\">\r\n                <p>{{user.nickName}}</p>\r\n                <p style=\"font-size: 13px; color: #888888;\">{{user.userTypeName}}</p>\r\n            </div>\r\n            <div class=\"weui-cell__ft\">\r\n                <img alt=\"\" (click)=\"goShowCard()\" src=\"./assets/images/icon_nav_layout.png\" style=\"height: 25px; margin-right: 12px;\">\r\n            </div>\r\n        </div>\r\n        <div class=\"weui-cell weui-cell_access\">\r\n            <div class=\"weui-cell__bd\">\r\n                <span style=\"vertical-align: middle; font-size: 13px;\">我的积分</span>\r\n            </div>\r\n            <div class=\"weui-cell__ft\">\r\n                <span class=\"weui-badge\" style=\"margin-left: 5px; background-color:goldenrod;\">{{user.integralTotal}}</span>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"weui-cells\">\r\n        <div class=\"weui-cells__title\">个人信息</div>\r\n        <div class=\"weui-cell weui-cell_access\">\r\n            <div class=\"weui-cell__bd\">\r\n                <span style=\"vertical-align: middle\">购买记录</span>\r\n            </div>\r\n            <div class=\"weui-cell__ft\">\r\n            </div>\r\n        </div>\r\n        <div class=\"weui-cell weui-cell_access\">\r\n            <div class=\"weui-cell__bd\">\r\n                <span style=\"vertical-align: middle\">店铺评价</span>\r\n                <span class=\"weui-badge\" style=\"margin-left: 5px;\">6</span>\r\n            </div>\r\n            <div class=\"weui-cell__ft\" style=\"font-size: 13px;\">评价送积分</div>\r\n        </div>\r\n        <div class=\"weui-cell weui-cell_access\" (click)=\"goBindPhone()\">\r\n            <div class=\"weui-cell__bd\">\r\n                <span style=\"vertical-align: middle\">换绑手机</span>\r\n            </div>\r\n            <div class=\"weui-cell__ft\" style=\"font-size: 13px;\">{{phone}}</div>\r\n        </div>\r\n    </div>\r\n    <div class=\"weui-cells\">\r\n        <div class=\"weui-cells__title\">零售客户</div>\r\n        <div class=\"weui-cell weui-cell_access\">\r\n            <div class=\"weui-cell__bd\">\r\n                <span style=\"vertical-align: middle\">档级货源</span>\r\n            </div>\r\n            <div class=\"weui-cell__ft\">\r\n            </div>\r\n        </div>\r\n        <div class=\"weui-cell weui-cell_access\">\r\n            <div class=\"weui-cell__bd\">\r\n                <span style=\"vertical-align: middle\">我的台账</span>\r\n            </div>\r\n            <div class=\"weui-cell__ft\" style=\"font-size: 13px;\"></div>\r\n        </div>\r\n        <div class=\"weui-cell weui-cell_access\">\r\n            <div class=\"weui-cell__bd\">\r\n                <span style=\"vertical-align: middle\">店员管理</span>\r\n            </div>\r\n            <div class=\"weui-cell__ft\" style=\"font-size: 13px;\"></div>\r\n        </div>\r\n    </div>\r\n    <div class=\"weui-cells\">\r\n        <div class=\"weui-cell weui-cell_access\">\r\n            <div class=\"weui-cell__bd\">\r\n                <span style=\"vertical-align: middle\">意见反馈</span>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n</Page>"

/***/ }),

/***/ "./src/app/wechat/personal-center/personal/personal.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/wechat/personal-center/personal/personal.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PersonalComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_app_component_base__ = __webpack_require__("./src/app/wechat/components/app-component-base.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PersonalComponent = /** @class */ (function (_super) {
    __extends(PersonalComponent, _super);
    function PersonalComponent(injector, router) {
        var _this = _super.call(this, injector) || this;
        _this.router = router;
        _this.phone = '';
        return _this;
    }
    PersonalComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.settingsService.getUser().subscribe(function (result) {
            _this.user = result;
            if (_this.user && _this.user.phone) {
                _this.phone = _this.user.phone.substr(0, 3) + '****' + _this.user.phone.substr(7);
            }
        });
    };
    PersonalComponent.prototype.goShowCard = function () {
        this.router.navigate(["/center/member-card"]);
    };
    PersonalComponent.prototype.goBindPhone = function () {
        this.router.navigate(["/center/bind-member"]);
    };
    PersonalComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'wechat-personal',
            template: __webpack_require__("./src/app/wechat/personal-center/personal/personal.component.html"),
            styles: [__webpack_require__("./src/app/wechat/personal-center/personal/personal.component.scss")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"], __WEBPACK_IMPORTED_MODULE_2__angular_router__["d" /* Router */]])
    ], PersonalComponent);
    return PersonalComponent;
}(__WEBPACK_IMPORTED_MODULE_1__components_app_component_base__["a" /* AppComponentBase */]));



/***/ }),

/***/ "./src/app/wechat/personal-center/scan/scan.component.html":
/***/ (function(module, exports) {

module.exports = "<Page [ngClass]=\"'Scan'\" [title]=\"'扫码积分'\" [showTitle]=\"false\" [spacing]=\"false\">\r\n    <div class=\"weui-media-box weui-media-box_small-appmsg\">\r\n        <div class=\"weui-cells\">\r\n            <div class=\"weui-cell weui-cell_access\">\r\n                <div class=\"weui-cell__hd\">\r\n                    <img src=\"./assets/images/scan/shoppingbag-o.png\" alt=\"\" style=\"width:25px;margin-right:5px;display:block\">\r\n                </div>\r\n                <div class=\"weui-cell__bd weui-cell_primary\" style=\"font-size: 17px;\">\r\n                    <p>扫码积分</p>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"weui-cells__title\">店铺信息</div>\r\n    <div class=\"weui-cells\" *ngIf=\"shop\">\r\n        <div class=\"weui-cell\">\r\n            <div class=\"weui-cell__bd\">\r\n                <p>店铺名称</p>\r\n            </div>\r\n            <div class=\"weui-cell__ft\">{{shop.name}}</div>\r\n        </div>\r\n        <div class=\"weui-cell\">\r\n            <div class=\"weui-cell__bd\">\r\n                <p>店铺地址</p>\r\n            </div>\r\n            <div class=\"weui-cell__ft\">{{shop.address}}</div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"weui-cells__title\">会员卡扫一扫</div>\r\n    <div class=\"weui-cells\">\r\n        <div class=\"weui-cell\" >\r\n            <div class=\"weui-cell__hd\">\r\n                <label class=\"weui-label\">会员卡</label>\r\n            </div>\r\n            <div class=\"weui-cell__bd\">\r\n                <input class=\"weui-input\"  type=\"text\" [(ngModel)]=\"cardNum\" name=\"cardNum\" placeholder=\"扫一扫会员卡\" >\r\n            </div>\r\n            <a class=\"weui-cell__ft weui-cell_access\" (click)=\"scanCard()\" >\r\n                <img class=\"weui-icon-h18\" src=\"./assets/images/scan/scan-o-2.png\" alt=\"\">\r\n            </a>\r\n        </div>\r\n        <div class=\"weui-cell\" >\r\n            <div class=\"weui-cell__bd\">\r\n                <p>会员名</p>\r\n            </div>\r\n            <div class=\"weui-cell__ft\">Donald</div>\r\n        </div>\r\n        <div class=\"weui-cell\" >\r\n            <div class=\"weui-cell__bd\">\r\n                <p>手机号</p>\r\n            </div>\r\n            <div class=\"weui-cell__ft\">138****4084</div>\r\n        </div>\r\n    </div>\r\n    <div class=\"weui-cells__title\">商品扫一扫</div>\r\n    <div class=\"weui-cells\">\r\n        <div class=\"weui-cell\" >\r\n            <div class=\"weui-cell__hd\">\r\n                <label for=\"\" class=\"weui-label\">商品码</label>\r\n            </div>\r\n            <div class=\"weui-cell__bd\">\r\n                <input class=\"weui-input\" type=\"text\" [(ngModel)]=\"goodsBarCode\" name=\"goodsBarCode\" placeholder=\"扫一扫商品包码或条码\" >\r\n            </div>\r\n            <a class=\"weui-cell__ft weui-cell_access\" (click)=\"scanGoodsBarCode()\" >\r\n                <img class=\"weui-icon-h18\" src=\"./assets/images/scan/scan-o-2.png\" alt=\"\">\r\n            </a>\r\n        </div>\r\n    </div>\r\n    <div class=\"weui-cells__title\">购买商品列表</div>\r\n    <div class=\"weui-cells\">\r\n        <div class=\"weui-cell\" >\r\n            <div class=\"weui-cell__bd\">\r\n                <p>宽窄五粮浓香</p>\r\n            </div>\r\n            <div class=\"weui-cell__ft\">\r\n                <weui-stepper [(ngModel)]=\"num\" [min]=\"1\" name=\"num\" [max]=\"10\"></weui-stepper>\r\n            </div>\r\n        </div>\r\n        <div class=\"weui-cell\" >\r\n            <div class=\"weui-cell__bd\">\r\n                <p>宽窄如意</p>\r\n            </div>\r\n            <div class=\"weui-cell__ft\">\r\n                <weui-stepper [(ngModel)]=\"num1\" name=\"num1\" [min]=\"-10\" [max]=\"10\"></weui-stepper>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"weui-btn-area\">\r\n        <button class=\"weui-btn weui-btn_primary\" [disabled]=\"!cardNum || !goodsBarCode\" [ngClass]=\"{'weui-btn_disabled': !cardNum || !goodsBarCode}\">确定兑换</button>\r\n    </div>\r\n</Page>"

/***/ }),

/***/ "./src/app/wechat/personal-center/scan/scan.component.scss":
/***/ (function(module, exports) {

module.exports = ".Scan .weui-cell {\n  font-size: 14px; }\n\n.weui-icon-h18 {\n  height: 32px; }\n"

/***/ }),

/***/ "./src/app/wechat/personal-center/scan/scan.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScanComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_timer__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/timer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_app_component_base__ = __webpack_require__("./src/app/wechat/components/app-component-base.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_model__ = __webpack_require__("./src/app/services/model/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services__ = __webpack_require__("./src/app/services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ngx_weui_jweixin__ = __webpack_require__("./components/jweixin/index.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ScanComponent = /** @class */ (function (_super) {
    __extends(ScanComponent, _super);
    function ScanComponent(injector, shopService, router, wxService) {
        var _this = _super.call(this, injector) || this;
        _this.shopService = shopService;
        _this.router = router;
        _this.wxService = wxService;
        _this.num = 1;
        _this.num1 = 1;
        return _this;
    }
    ScanComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.wxService.get().then(function (res) {
            if (!res) {
                console.warn('jweixin.js 加载失败');
                return;
            }
            //alert(location.href.split('#')[0])
            //alert(encodeURIComponent(location.href.split('#')[0]));
            var url = encodeURIComponent(location.href.split('#')[0]);
            _this.settingsService.getJsApiConfig(url).subscribe(function (result) {
                if (result) {
                    result.jsApiList = ['scanQRCode']; //指定调用的接口名
                    //console.log(result.toJSON());
                    // 1、通过config接口注入权限验证配置
                    wx.config(result.toJSON());
                    // 2、通过ready接口处理成功验证
                    wx.ready(function () {
                        // 注册各种onMenuShareTimeline & onMenuShareAppMessage
                    });
                    // 2、通过error接口处理失败验证
                    wx.error(function () {
                    });
                }
            });
        });
        this.settingsService.getUser().subscribe(function (result) {
            _this.user = result;
            if (_this.user) {
                //console.table(this.user);
                if (_this.user.userType != __WEBPACK_IMPORTED_MODULE_4__services_model__["e" /* UserType */].Retailer) {
                    _this.router.navigate(['/center/bind-retailer']);
                }
                else {
                    if (!_this.user.isShopkeeper && _this.user.status == 0) {
                        _this.router.navigate(['/center/wait-audit']);
                    }
                    else {
                        _this.shopService.GetShopByOpenId(_this.WUserParams)
                            .subscribe(function (result) {
                            _this.shop = result;
                            if (!_this.shop) {
                                _this.router.navigate(['/center/shop-add']);
                            }
                        });
                    }
                }
            }
        });
    };
    ScanComponent.prototype.scanCard = function () {
        //console.log('log scanCard start');
        var _this = this;
        wx.scanQRCode({
            needResult: 1,
            //scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            scanType: ['barCode'],
            success: (function (res) {
                _this.cardNum = res.resultStr;
            })
        });
        //console.log('log scanCard end');
    };
    ScanComponent.prototype.scanGoodsBarCode = function () {
        var _this = this;
        wx.scanQRCode({
            needResult: 1,
            scanType: ['barCode'],
            success: (function (res) {
                _this.goodsBarCode = res.resultStr;
            })
        });
    };
    ScanComponent.prototype.onSave = function () {
    };
    ScanComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'wechat-scan',
            template: __webpack_require__("./src/app/wechat/personal-center/scan/scan.component.html"),
            styles: [__webpack_require__("./src/app/wechat/personal-center/scan/scan.component.scss")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"],
            __WEBPACK_IMPORTED_MODULE_5__services__["c" /* ShopService */],
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["d" /* Router */],
            __WEBPACK_IMPORTED_MODULE_6_ngx_weui_jweixin__["a" /* JWeiXinService */]])
    ], ScanComponent);
    return ScanComponent;
}(__WEBPACK_IMPORTED_MODULE_2__components_app_component_base__["a" /* AppComponentBase */]));



/***/ }),

/***/ "./src/app/wechat/personal-center/shop/shop-add/shop-add.component.html":
/***/ (function(module, exports) {

module.exports = "<Page [ngClass]=\"'icons'\" [spacing]=\"false\" [showTitle]=\"false\" *ngIf=\"showAddInfo\">\r\n    <div class=\"weui-cells\">\r\n        <div class=\"weui-cell\">\r\n            <div class=\"icon-box\">\r\n                <i class=\"weui-icon-info weui-icon_msg\"></i>\r\n                <div class=\"icon-box__ctn\">\r\n                    <h3 class=\"icon-box__title\">提示</h3>\r\n                    <p class=\"icon-box__desc\">您还没有添加店铺信息，请点击新增店铺添加店铺</p>\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n        <div class=\"weui-cell\">\r\n            <button weui-button (click)=\"showAddInfo = false\">新增店铺</button>\r\n        </div>\r\n    </div>\r\n</Page>\r\n<Page [ngClass]=\"'input'\" [showTitle]=\"true\" [title]=\"title\" [subTitle]=\"'维护自己的店铺信息'\" [spacing]=\"false\" *ngIf=\"!showAddInfo\">\r\n    <form #f=\"ngForm\" (ngSubmit)=\"onSave()\">\r\n        <div class=\"weui-cells__title\">店铺信息</div>\r\n        <div class=\"weui-cells weui-cells_form\">\r\n            <div class=\"weui-cell\">\r\n                <div class=\"weui-cell__hd\">\r\n                    <label class=\"weui-label\">店铺名称</label>\r\n                </div>\r\n                <div class=\"weui-cell__bd\">\r\n                    <input class=\"weui-input\" type=\"text\" [(ngModel)]=\"res.name\" name=\"name\" placeholder=\"请输入店铺名称\" weui-input=\"name\" weui-required>\r\n                </div>\r\n            </div>\r\n            <div class=\"weui-cell\">\r\n                <div class=\"weui-cell__hd\">\r\n                    <label class=\"weui-label\">店铺电话</label>\r\n                </div>\r\n                <div class=\"weui-cell__bd\">\r\n                    <input class=\"weui-input\" type=\"tel\" [(ngModel)]=\"res.tel\" name=\"tel\" placeholder=\"请输入店铺电话\" weui-input=\"tel\" weui-required>\r\n                </div>\r\n            </div>\r\n            <div class=\"weui-cell\">\r\n                <div class=\"weui-cell__hd\">\r\n                    <label class=\"weui-label\">店铺地址</label>\r\n                </div>\r\n                <div class=\"weui-cell__bd\">\r\n                    <input class=\"weui-input\" type=\"text\" [(ngModel)]=\"res.address\" name=\"address\" placeholder=\"定位店铺地址\" weui-input=\"address\"\r\n                        weui-required>\r\n                </div>\r\n                <div class=\"weui-cell__ft\">\r\n                    <button type=\"button\" class=\"weui-vcode-btn\">重新定位</button>\r\n                </div>\r\n            </div>\r\n            <div class=\"weui-cells__title\">店铺描述</div>\r\n            <div class=\"weui-cells weui-cells_form\">\r\n                <div class=\"weui-cell\">\r\n                    <div class=\"weui-cell__bd\">\r\n                        <textarea class=\"weui-textarea\" placeholder=\"请输入店铺描述信息\" rows=\"3\" [(ngModel)]=\"res.desc\" name=\"desc\" weui-textarea weui-cn=\"2\"\r\n                            maxlength=\"500\"></textarea>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"weui-cell\">\r\n                <div class=\"weui-cell__bd\">\r\n                    <div class=\"weui-uploader\">\r\n                        <div class=\"weui-uploader__hd\">\r\n                            <p class=\"weui-uploader__title\">店铺形象</p>\r\n                            <div class=\"weui-uploader__info\">{{uploader?.uploadedCount}}/{{uploader?.queue?.length}}</div>\r\n                        </div>\r\n                        <div class=\"weui-uploader__bd\">\r\n                            <ul class=\"weui-uploader__files\">\r\n                                <li class=\"weui-uploader__file\" *ngFor=\"let item of uploader.queue\"\r\n                                    [weui-thumb]=\"item._file\"\r\n                                    (click)=\"onGallery(item)\"\r\n                                    [ngClass]=\"{'weui-uploader__file_status': item.isError}\">\r\n                                    <div class=\"weui-uploader__file-content\" *ngIf=\"item.isUploading\">{{item.progress}}%</div>\r\n                                    <div class=\"weui-uploader__file-content\" *ngIf=\"item.isError\">\r\n                                        <i class=\"weui-icon-warn\"></i>\r\n                                    </div>\r\n                                </li>\r\n                            </ul>\r\n                            <div class=\"weui-uploader__input-box\" *ngIf=\"uploader?.queue?.length < 1\" >\r\n                                <input class=\"weui-uploader__input\" type=\"file\" accept=\"image/*\"\r\n                                    [weui-uploader-file]=\"uploader\" name=\"files\" weui-required>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <weui-gallery [imgs]=\"img\" [(show)]=\"imgShow\" (delete)=\"onDel($event)\"></weui-gallery>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        \r\n        <label for=\"weuiAgree\" class=\"weui-agree\">\r\n            <span class=\"weui-agree__text\">\r\n                店铺信息提交后需等待营销中心审核，审核通过后可维护商品信息，消费者可以在附近店铺和特色商品进行查找\r\n            </span>\r\n        </label>\r\n        <div class=\"weui-btn-area\">\r\n            <button class=\"weui-btn weui-btn_primary\" [disabled]=\"!f.form.valid || !f.form.dirty\" [ngClass]=\"{'weui-btn_disabled': !f.form.valid || !f.form.dirty}\">提交</button>\r\n        </div>\r\n    </form>\r\n</Page>"

/***/ }),

/***/ "./src/app/wechat/personal-center/shop/shop-add/shop-add.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/wechat/personal-center/shop/shop-add/shop-add.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShopAddComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_timer__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/timer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_app_component_base__ = __webpack_require__("./src/app/wechat/components/app-component-base.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_weui__ = __webpack_require__("./components/ngx-weui.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services__ = __webpack_require__("./src/app/services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ngx_weui_toptips__ = __webpack_require__("./components/toptips/index.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ShopAddComponent = /** @class */ (function (_super) {
    __extends(ShopAddComponent, _super);
    function ShopAddComponent(injector, router, shopService, srv) {
        var _this = _super.call(this, injector) || this;
        _this.router = router;
        _this.shopService = shopService;
        _this.srv = srv;
        _this.showAddInfo = true;
        _this.res = {};
        _this.coverPhoto = '';
        _this.imgShow = false;
        _this.title = '新增店铺';
        _this.uploader = new __WEBPACK_IMPORTED_MODULE_4_ngx_weui__["a" /* Uploader */]({
            url: __WEBPACK_IMPORTED_MODULE_5__services__["a" /* AppConsts */].remoteServiceBaseUrl + '/WeChatFile/FilesPosts?folder=shop',
            auto: true,
            limit: 1,
            /*onUploadSuccess(file: FileItem, response: string) {
                console.log('onUploadSuccess-' + response, arguments);
                //console.table(file);
                //console.table(arguments);
                let data = JSON.parse(response);
                if(data && data.success == true){
                    this.coverPhoto = data.result;
                }
            },*/
            onUploadSuccess: (function (file, response) {
                console.log('onUploadSuccess-' + response);
                //console.table(file);
                //console.table(arguments);
                var data = JSON.parse(response);
                if (data && data.success == true) {
                    _this.coverPhoto = data.result;
                }
            }),
            onUploadComplete: function (file, response) {
                console.log('onUploadComplete-' + response, arguments);
                //console.table(file);
                //console.table(arguments);  
            }
        });
        return _this;
    }
    ShopAddComponent.prototype.ngOnInit = function () {
        var _this = this;
        //alert(this.id)
        if (this.id && this.id == '1') {
            this.showAddInfo = false;
        }
        this.settingsService.getUser().subscribe(function (result) {
            _this.user = result;
        });
        this.shopService.GetShopByOpenId(this.WUserParams).subscribe(function (result) {
            if (result) {
                _this.res = result.toJSON();
                _this.showAddInfo = false;
                _this.title = '修改店铺';
            }
        });
        /*
        this.activatedRoute.params.subscribe((params: Params) => {
            let shop = params['shop'];
            console.table(shop);
            if(shop){//编辑
                this.res = shop;
                this.showAddInfo = false;
            }
        });*/
    };
    ShopAddComponent.prototype.onGallery = function (item) {
        this.img = [{ file: item._file, item: item }];
        this.imgShow = true;
    };
    ShopAddComponent.prototype.onDel = function (item) {
        console.log(item);
        this.uploader.removeFromQueue(item.item);
        this.coverPhoto = '';
    };
    ShopAddComponent.prototype.onSave = function () {
        var _this = this;
        //alert('请求数据：' + JSON.stringify(this.res));
        if (this.coverPhoto != '') {
            this.res.coverPhoto = this.coverPhoto;
        }
        //console.table(this.res);
        if (!this.res.coverPhoto || this.res.coverPhoto == '') {
            this.srv['warn']('请上传店铺形象');
            return;
        }
        this.shopService.WechatCreateOrUpdateShop({
            shop: this.res,
            tenantId: this.settingsService.tenantId,
            openId: this.settingsService.openId
        }).subscribe(function (data) {
            if (data) {
                _this.srv['success']('保存成功');
                _this.router.navigate(["/center/shop"]);
            }
            else {
                _this.srv['warn']('保存失败');
            }
        });
    };
    ShopAddComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'wechat-shop-add',
            template: __webpack_require__("./src/app/wechat/personal-center/shop/shop-add/shop-add.component.html"),
            styles: [__webpack_require__("./src/app/wechat/personal-center/shop/shop-add/shop-add.component.scss")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"], __WEBPACK_IMPORTED_MODULE_3__angular_router__["d" /* Router */],
            __WEBPACK_IMPORTED_MODULE_5__services__["c" /* ShopService */],
            __WEBPACK_IMPORTED_MODULE_6_ngx_weui_toptips__["b" /* ToptipsService */]])
    ], ShopAddComponent);
    return ShopAddComponent;
}(__WEBPACK_IMPORTED_MODULE_2__components_app_component_base__["a" /* AppComponentBase */]));



/***/ }),

/***/ "./src/app/wechat/personal-center/shop/shop.component.html":
/***/ (function(module, exports) {

module.exports = "<Page [ngClass]=\"'icons'\" [spacing]=\"false\" [showTitle]=\"false\" *ngIf=\"shop && shop.status == 1\">\r\n    <div class=\"weui-cells\">\r\n        <div class=\"weui-cell\">\r\n            <div class=\"icon-box\">\r\n                <i class=\"weui-icon-waiting weui-icon_msg\"></i>\r\n                <div class=\"icon-box__ctn\">\r\n                    <h3 class=\"icon-box__title\">等待审核</h3>\r\n                    <p class=\"icon-box__desc\">店铺等待营销中心审核</p>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"weui-cell\" *ngIf=\"shop\" style=\"font-size: 14px;\">\r\n            <div class=\"weui-cell__bd\">\r\n                <p>店铺名称</p>\r\n            </div>\r\n            <div class=\"weui-cell__ft\">{{shop.name}}</div>\r\n        </div>\r\n        <div class=\"weui-cell\" *ngIf=\"shop\" style=\"font-size: 14px;\">\r\n            <div class=\"weui-cell__bd\">\r\n                <p>提交时间</p>\r\n            </div>\r\n            <div class=\"weui-cell__ft\">{{shop.creationTime | date:'yyyy-MM-dd HH:mm'}}</div>\r\n        </div>\r\n        <div class=\"weui-cell\">\r\n            <button weui-button (click)=\"goEditShop()\">修改店铺</button>\r\n        </div>\r\n    </div>\r\n</Page>\r\n<Page [ngClass]=\"'list'\" [subTitle]=\"'表单输入'\" [showTitle]=\"false\" [spacing]=\"false\" *ngIf=\"shop && shop.status == 2\">\r\n    <div class=\"weui-cells\" style=\"margin-top: 0px;\">\r\n        <div class=\"weui-cell\">\r\n            <div style=\"text-align: center; width: 100%;\">\r\n                <img src=\"{{shop.coverPhoto}}\" style=\"width:100%;\">\r\n            </div>\r\n        </div>\r\n        <div class=\"weui-cell\" *ngIf=\"shop\" style=\"font-size: 14px;\">\r\n            <div class=\"weui-cell__hd\">\r\n                <img src=\"./assets/images/shop/network-o-3.png\" alt=\"\" style=\"width:24px;margin-right:5px;display:block\">\r\n            </div>\r\n            <div class=\"weui-cell__bd\">\r\n                <p>{{shop.name}}</p>\r\n            </div>\r\n            <div class=\"weui-cell__ft\">\r\n                <p>\r\n                    <img class=\"weui-icon-h18\" src=\"./assets/images/shop/wave.png\" alt=\"人气\">人气：{{shop.readTotal}}\r\n                    <img class=\"weui-icon-h18\" alt=\"销量\" src=\"./assets/images/shop/trend-chart-2.png\">销量：{{shop.saleTotal}}</p>\r\n            </div>\r\n        </div>\r\n        <div class=\"weui-cell\">\r\n            <weui-navbar style=\"width:100%;\">\r\n                <weui-tab heading=\"店铺信息\">\r\n                    <div class=\"weui-panel weui-panel_access\">\r\n                        <div class=\"weui-panel__hd\">店铺介绍</div>\r\n                        <div class=\"weui-panel__bd\">\r\n                            <div class=\"weui-panel__hd\">\r\n                                <p>{{shop.desc}}</p>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"weui-cells\">\r\n                            <div class=\"weui-cell\">\r\n                                <div class=\"weui-cell__hd\">\r\n                                    <img src=\"./assets/images/shop/PDA-o.png\" alt=\"\" style=\"width:24px;margin-right:5px;display:block\">\r\n                                </div>\r\n                                <div class=\"weui-cell__bd weui-cell_primary\" style=\"font-size: 14px;\">\r\n                                    <p>{{shop.tel}}</p>\r\n                                </div>\r\n                                <a class=\"weui-cell__ft weui-cell_access\" href=\"tel:{{shop.tel}}\">\r\n                                    <img class=\"weui-icon-h18\" src=\"./assets/images/shop/phone-r-o.png\" alt=\"\">\r\n                                </a>\r\n                            </div>\r\n                            <div class=\"weui-cell\">\r\n                                <div class=\"weui-cell__hd\">\r\n                                    <img src=\"./assets/images/shop/map-2-o.png\" alt=\"\" style=\"width:24px;margin-right:5px;display:block\">\r\n                                </div>\r\n                                <div class=\"weui-cell__bd weui-cell_primary\" style=\"font-size: 14px;\">\r\n                                    <p>{{shop.address}}</p>\r\n                                </div>\r\n                                <a class=\"weui-cell__ft weui-cell_access\" href=\"#\">\r\n                                    <img class=\"weui-icon-h18\" src=\"./assets/images/shop/navigation-o.png\" alt=\"\">\r\n                                </a>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"weui-cells__title\">店铺评价</div>\r\n                        <div class=\"weui-cells\">\r\n                            <div class=\"weui-cell\">\r\n                                <div class=\"weui-cell__bd weui-cell_primary\" style=\"font-size: 14px;\">\r\n                                    <img class=\"weui-icon-h18\" src=\"./assets/images/shop/service-o.png\" alt=\"\">好（{{shop.evaluationArry[0]}}）\r\n                                    <img class=\"weui-icon-h18\" src=\"./assets/images/shop/service-o-2.png\" alt=\"\">中（{{shop.evaluationArry[1]}}）\r\n                                    <img class=\"weui-icon-h18\" src=\"./assets/images/shop/service-o-3.png\" alt=\"\">差（{{shop.evaluationArry[2]}}）\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"weui-cell\">\r\n                                <button weui-button [weui-plain]=\"true\" (click)=\"goEditShop()\">修改店铺</button>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </weui-tab>\r\n                <weui-tab heading=\"特色商品\" (select)=\"onSelectProducts()\">\r\n                    <div class=\"weui-panel weui-panel_access\">\r\n                        <div class=\"weui-panel__hd\">商品列表</div>\r\n                        <weui-loadmore type=\"line\" *ngIf=\"!shopProducts || shopProducts.length == 0\"></weui-loadmore>\r\n                        <div class=\"weui-panel__bd\" *ngIf=\"shopProducts\">\r\n                            <div class=\"weui-media-box weui-media-box_appmsg\" *ngFor=\"let sp of shopProducts\">\r\n                                <div class=\"weui-media-box__hd\">\r\n                                    <img class=\"weui-media-box__thumb\" src=\"{{sp.photoUrl}}\" alt=\"\">\r\n                                </div>\r\n                                <div class=\"weui-media-box__bd\">\r\n                                    <h4 class=\"weui-media-box__title\">{{sp.specification}}</h4>\r\n                                    <p class=\"weui-media-box__desc\">{{sp.typeName}}</p>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"weui-cells\">\r\n                            <div class=\"weui-cell\">\r\n                                <button weui-button [weui-plain]=\"true\" type=\"button\" (click)=\"onProductPopup()\">新增商品</button>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <weui-popup #product [config]=\"{is_full: true}\">\r\n                        <div class=\"weui-cells__title\">卷烟类</div>\r\n                        <div class=\"weui-cells weui-cells_checkbox\">\r\n                            <label class=\"weui-cell weui-check__label\" for=\"checkbox-{{c.id}}\" *ngFor=\"let c of cigaretteProducts; let index = index\">\r\n                                <div class=\"weui-cell__hd\">\r\n                                    <input type=\"checkbox\" class=\"weui-check\" [weui-checklist]=\"shopProductIds\" name=\"cigarette\" [weui-value]=\"c.id\" id=\"checkbox-{{c.id}}\">\r\n                                    <i class=\"weui-icon-checked\"></i>\r\n                                </div>\r\n                                <div class=\"weui-cell__bd\">\r\n                                    <p>{{c.specification}}</p>\r\n                                </div>\r\n                            </label>\r\n                        </div>\r\n                        <div class=\"weui-cells__title\">特产类</div>\r\n                        <div class=\"weui-cells weui-cells_checkbox\">\r\n                            <label class=\"weui-cell weui-check__label\" for=\"checkbox-{{s.id}}\" *ngFor=\"let s of specialProducts; let index = index\">\r\n                                <div class=\"weui-cell__hd\">\r\n                                    <input type=\"checkbox\" class=\"weui-check\" [weui-checklist]=\"shopProductIds\" name=\"special\" [weui-value]=\"s.id\" id=\"checkbox-{{s.id}}\">\r\n                                    <i class=\"weui-icon-checked\"></i>\r\n                                </div>\r\n                                <div class=\"weui-cell__bd\">\r\n                                    <p>{{s.specification}}</p>\r\n                                </div>\r\n                            </label>\r\n                        </div>\r\n                        <div class=\"weui-cells__title\">请选择特色商品并提交</div>\r\n                        <div class=\"weui-cell\">\r\n                            <div class=\"weui-media-box__bd\" style=\"width: 100%;\">\r\n                                <button weui-button type=\"button\" (click)=\"save()\" >提交</button>\r\n                                <button weui-button [weui-type]=\"'default'\" type=\"button\" (click)=\"productPopup.close()\" >取消</button>\r\n                            </div>\r\n                        </div>\r\n                    </weui-popup>\r\n                </weui-tab>\r\n            </weui-navbar>\r\n        </div>\r\n    </div>\r\n</Page>"

/***/ }),

/***/ "./src/app/wechat/personal-center/shop/shop.component.scss":
/***/ (function(module, exports) {

module.exports = ".weui-icon-h18 {\n  height: 24px; }\n"

/***/ }),

/***/ "./src/app/wechat/personal-center/shop/shop.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShopComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_timer__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/timer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_app_component_base__ = __webpack_require__("./src/app/wechat/components/app-component-base.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_model__ = __webpack_require__("./src/app/services/model/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services__ = __webpack_require__("./src/app/services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ngx_weui_popup__ = __webpack_require__("./components/popup/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ngx_weui_toptips__ = __webpack_require__("./components/toptips/index.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ShopComponent = /** @class */ (function (_super) {
    __extends(ShopComponent, _super);
    function ShopComponent(injector, router, shopService, srv) {
        var _this = _super.call(this, injector) || this;
        _this.router = router;
        _this.shopService = shopService;
        _this.srv = srv;
        _this.host = __WEBPACK_IMPORTED_MODULE_5__services__["a" /* AppConsts */].remoteServiceBaseUrl;
        return _this;
    }
    ShopComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.settingsService.getUser().subscribe(function (result) {
            _this.user = result;
            if (_this.user) {
                //console.table(this.user);
                if (_this.user.userType != __WEBPACK_IMPORTED_MODULE_3__services_model__["e" /* UserType */].Retailer) {
                    _this.router.navigate(['/center/bind-retailer']);
                }
                else {
                    if (!_this.user.isShopkeeper && _this.user.status == 0) {
                        _this.router.navigate(['/center/wait-audit']);
                    }
                    else {
                        _this.shopService.GetShopByOpenId(_this.WUserParams)
                            .subscribe(function (result) {
                            _this.shop = result;
                            if (!_this.shop) {
                                _this.router.navigate(['/center/shop-add']);
                            }
                        });
                    }
                }
            }
        });
    };
    ShopComponent.prototype.goEditShop = function () {
        this.router.navigate(['/center/shop-add', { id: '1' }]);
        //this.router.navigateByUrl('/center/shop-add');
    };
    ShopComponent.prototype.onSelectProducts = function () {
        var _this = this;
        if (!this.shopProducts) {
            var params = { shopId: this.shop.id };
            if (this.settingsService.tenantId) {
                params.tenantId = this.settingsService.tenantId;
            }
            this.shopService.GetShopProductsByShopId(params).subscribe(function (result) {
                _this.shopProducts = result.map(function (result) {
                    result.photoUrl = _this.host + result.photoUrl;
                    return result;
                });
                _this.shopProductIds = _this.shopProducts.map(function (s) { return s.id; });
            });
            var params2 = {};
            if (this.settingsService.tenantId) {
                params2.tenantId = this.settingsService.tenantId;
            }
            this.shopService.GetRareProduct(params2).subscribe(function (data) {
                _this.cigaretteProducts = data.cigaretteProducts;
                _this.specialProducts = data.specialProducts;
            });
        }
    };
    ShopComponent.prototype.onProductPopup = function () {
        this.productPopup.show();
    };
    ShopComponent.prototype.save = function () {
        var _this = this;
        console.table(this.shopProductIds);
        if (this.shopProductIds.length <= 0) {
            this.srv['warn']('请选择特色产品');
        }
        else {
            var params = { shopId: this.shop.id, productIds: this.shopProductIds };
            if (this.settingsService.tenantId) {
                params.tenantId = this.settingsService.tenantId;
            }
            this.shopService.SaveShopProducts(params).subscribe(function (result) {
                if (result && result.code == 0) {
                    _this.shopProducts = __WEBPACK_IMPORTED_MODULE_3__services_model__["d" /* ShopProduct */].fromJSArray(result.data);
                    _this.srv['success']('保存成功');
                    _this.productPopup.close();
                }
                else {
                    _this.srv['warn']('保存异常');
                }
            });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('product'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_6_ngx_weui_popup__["a" /* PopupComponent */])
    ], ShopComponent.prototype, "productPopup", void 0);
    ShopComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'wechat-shop',
            template: __webpack_require__("./src/app/wechat/personal-center/shop/shop.component.html"),
            styles: [__webpack_require__("./src/app/wechat/personal-center/shop/shop.component.scss")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["d" /* Router */],
            __WEBPACK_IMPORTED_MODULE_5__services__["c" /* ShopService */],
            __WEBPACK_IMPORTED_MODULE_7_ngx_weui_toptips__["b" /* ToptipsService */]])
    ], ShopComponent);
    return ShopComponent;
}(__WEBPACK_IMPORTED_MODULE_2__components_app_component_base__["a" /* AppComponentBase */]));



/***/ }),

/***/ "./src/app/wechat/personal-center/shop/wait-audit/wait-audit.component.html":
/***/ (function(module, exports) {

module.exports = "<Page [ngClass]=\"'icons'\" [spacing]=\"false\" [showTitle]=\"false\">\r\n    <div class=\"weui-cells\">\r\n        <div class=\"weui-cell\">\r\n            <div class=\"icon-box\">\r\n                <i class=\"weui-icon-waiting weui-icon_msg\"></i>\r\n                <div class=\"icon-box__ctn\">\r\n                    <h3 class=\"icon-box__title\">等待审核</h3>\r\n                    <p class=\"icon-box__desc\">等待店铺管理员审核，审核通过后可管理我的店铺</p>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"weui-cell\" *ngIf=\"user\" style=\"font-size: 14px;\" >\r\n            <div class=\"weui-cell__bd\">\r\n                <p>绑定用户名</p>\r\n            </div>\r\n            <div class=\"weui-cell__ft\">{{user.nickName}}</div>\r\n        </div>\r\n        <div class=\"weui-cell\" *ngIf=\"user\" style=\"font-size: 14px;\" >\r\n            <div class=\"weui-cell__bd\">\r\n                <p>绑定用户类型</p>\r\n            </div>\r\n            <div class=\"weui-cell__ft\">{{user.userTypeName}}</div>\r\n        </div>\r\n        <div class=\"weui-cell\" *ngIf=\"user\" style=\"font-size: 14px;\" >\r\n            <div class=\"weui-cell__bd\">\r\n                <p>绑定时间</p>\r\n            </div>\r\n            <div class=\"weui-cell__ft\">{{user.bindTime | date:'yyyy-MM-dd HH:mm'}}</div>\r\n        </div>\r\n    </div>\r\n</Page>"

/***/ }),

/***/ "./src/app/wechat/personal-center/shop/wait-audit/wait-audit.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/wechat/personal-center/shop/wait-audit/wait-audit.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WaitAuditComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_app_component_base__ = __webpack_require__("./src/app/wechat/components/app-component-base.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var WaitAuditComponent = /** @class */ (function (_super) {
    __extends(WaitAuditComponent, _super);
    function WaitAuditComponent(injector) {
        return _super.call(this, injector) || this;
    }
    WaitAuditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.settingsService.getUser().subscribe(function (result) {
            _this.user = result;
        });
    };
    WaitAuditComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'wechat-wait-audit',
            template: __webpack_require__("./src/app/wechat/personal-center/shop/wait-audit/wait-audit.component.html"),
            styles: [__webpack_require__("./src/app/wechat/personal-center/shop/wait-audit/wait-audit.component.scss")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"]])
    ], WaitAuditComponent);
    return WaitAuditComponent;
}(__WEBPACK_IMPORTED_MODULE_1__components_app_component_base__["a" /* AppComponentBase */]));



/***/ })

});
//# sourceMappingURL=personal-center.module.chunk.js.map