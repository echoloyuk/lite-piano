/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./demo/demojs/ui.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./demo/demojs/ui.css":
/*!****************************!*\
  !*** ./demo/demojs/ui.css ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader!./ui.css */ "./node_modules/css-loader/index.js!./demo/demojs/ui.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./demo/demojs/ui.js":
/*!***************************!*\
  !*** ./demo/demojs/ui.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PianoUI; });
/* harmony import */ var _src_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/index.js */ "./src/index.js");
/* harmony import */ var _ui_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui.css */ "./demo/demojs/ui.css");
/* harmony import */ var _ui_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ui_css__WEBPACK_IMPORTED_MODULE_1__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var PianoUI =
/*#__PURE__*/
function () {
  function PianoUI(options) {
    _classCallCheck(this, PianoUI);

    this.piano = new _src_index_js__WEBPACK_IMPORTED_MODULE_0__["default"](options);
    this.aniTimmer = {};
    this.staccatoMode = false;
  }

  _createClass(PianoUI, [{
    key: "initPiano",
    value: function initPiano() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.piano.resume().then(function () {
          return _this.piano.load();
        }).then(function () {
          resolve(_this.piano);
        }).catch(function () {
          reject();
        });
      });
    }
  }, {
    key: "bindDomEvent",
    value: function bindDomEvent(element) {
      var self = this;
      element.addEventListener('click', function (e) {
        if (!e || !e.target) {
          return;
        }

        var step = e.target.getAttribute('data-step');
        var octave = parseInt(e.target.getAttribute('data-octave'));
        var alter = parseInt(e.target.getAttribute('data-alter'));
        console.log(step, octave, alter);
        self.playOneShot(step, octave, alter, 1);
      });
    }
  }, {
    key: "render",
    value: function render(element) {
      var _this2 = this;

      if (!element) {
        return;
      }

      var keyboard = this.piano.keyboard;
      var html = '<div class="lite-piano-ui-container">';
      keyboard.forEach(function (item) {
        html += "<div class=\"piano-key-outer ".concat(item.alter ? 'alter' : '', "\">");
        html += "<div class=\"piano-key\"\n                id=\"".concat(item.step, "-").concat(item.octave, "-").concat(item.alter, "\"\n                data-step=\"").concat(item.step, "\" \n                data-octave=\"").concat(item.octave, "\" \n                data-alter=\"").concat(item.alter, "\">\n              </div></div>");
      });
      html += '</div>';
      element.innerHTML = html;

      var onResize = function onResize() {
        _this2.refreshAlterKey(element);
      }; // resize to calculate black key to show.


      window.removeEventListener('resize', onResize);
      window.addEventListener('resize', onResize);
      this.refreshAlterKey(element);
    }
  }, {
    key: "playOneShot",
    value: function playOneShot(step, octave, alter, duration) {
      if (!step || isNaN(octave)) {
        return;
      }

      var id = "".concat(step, "-").concat(octave, "-").concat(alter ? 1 : 0);
      var keyDom = document.getElementById(id);

      if (!keyDom) {
        return;
      }

      keyDom.classList.add('playing');
      this.piano.oneShot(step, octave, alter, this.staccatoMode ? 0.2 : duration);

      try {
        clearTimeout(this.aniTimmer[id]);
      } catch (e) {}

      this.aniTimmer[id] = setTimeout(function () {
        keyDom.classList.remove('playing');
      }, 300);
    }
  }, {
    key: "refreshAlterKey",
    value: function refreshAlterKey(element) {
      if (!element) {
        return;
      }

      var alterKeyWidth = element.offsetWidth / 86;
      var keys = element.querySelectorAll('.piano-key-outer.alter .piano-key');
      keys && keys.forEach(function (key) {
        key.style.width = alterKeyWidth + 'px';
      });
    }
  }, {
    key: "renderMusicObj",
    value: function renderMusicObj(obj, panel) {
      var html = '<div class="music-demo-panel">';
      obj.forEach(function (item) {
        html += "<div class=\"music-item\" data-played=\"".concat(item.played, "\">").concat(item.step, " ").concat(item.octave, " ").concat(item.timeStamp, "</div>");
      });
      html += '</div>';
      panel.innerHTML = html;
    }
  }, {
    key: "renderMusicObjTest",
    value: function renderMusicObjTest(obj, panel) {
      var html = '<div class="music-test-panel">';
      obj.playingList.forEach(function (listItem, listIndex) {
        html += "<div class=\"music-test-measure-panel\" id=\"measure_".concat(listIndex, "\">");
        html += "<div class=\"music-test-measure-title\">No.".concat(listIndex + 1, " measure.</div>");
        html += "<div class=\"music-test-measure\" data-index=\"".concat(listIndex, "\">");
        Object.keys(listItem).forEach(function (staffItemName) {
          html += '<div class="music-test-staff">';
          listItem[staffItemName].forEach(function (noteItem) {
            html += "<div class=\"music-test-note\" id=\"note_".concat(noteItem.uid, "\">");
            html += "".concat(noteItem.step, " ").concat(noteItem.octave, " ").concat(noteItem.alter, " ").concat(noteItem.timeStamp);
            html += '</div>';
          });
          html += '</div>';
        });
        html += '</div>';
        html += '</div>';
      });
      html += '</div>';
      panel.innerHTML = html;
    }
  }]);

  return PianoUI;
}();


window.PianoUI = PianoUI;

/***/ }),

/***/ "./node_modules/css-loader/index.js!./demo/demojs/ui.css":
/*!******************************************************!*\
  !*** ./node_modules/css-loader!./demo/demojs/ui.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".lite-piano-ui-container {\n  height: 100%;\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n  align-items: stretch;\n}\n\n.lite-piano-ui-container .piano-key-outer {\n  height: 100%;\n  flex-basis: 2%;\n}\n.lite-piano-ui-container .piano-key-outer .piano-key {\n  border: 1px solid #333;\n  height: 100%;\n  transition: all .2s ease-out;\n  background: #fff;\n}\n.lite-piano-ui-container .piano-key-outer .piano-key.playing {\n  background: #bbb;\n}\n\n.lite-piano-ui-container .piano-key-outer.alter {\n  height: 100%;\n  flex-basis: 0;\n  position: relative;\n}\n\n.lite-piano-ui-container .piano-key-outer.alter .piano-key {\n  height: 60%;\n  position: absolute;\n  left: 0;\n  top:0;\n  background: #333;\n  transform: translateX(-50%);\n}\n.lite-piano-ui-container .piano-key-outer.alter .piano-key.playing {\n  background: #999;\n}\n\n\n.music-test-measure {\n  display: flex;\n  justify-content: space-between;\n  align-items: stretch;\n}\n.music-test-panel {\n  position: relative;\n}\n.music-test-measure-panel {\n  margin-bottom: 12px;\n}\n.music-test-staff {\n  flex-basis: 100%;\n  text-align: center;\n  border: 1px solid #666;\n}\n.music-test-measure-title {\n  text-align: center;\n  background: #666;\n  height: 32px;\n  line-height: 32px;\n  color: #fff;\n}\n\n.music-test-note.played {\n  background: #ccc;\n  color: #fff;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./src/data/piano-keyboard.js":
/*!************************************!*\
  !*** ./src/data/piano-keyboard.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This data represents the standard 88-key piano supported by the lite-piano component. 
 * Each key is an object in keyboard array: 
 *  step is the name of the key, 
 *  octave represents the first octave, 
 *  and alter = 1 to indicate the piano's black key. 0 is white key.
 * 
 * You can get all the piano keys according to the keyboard array,
 * and call the oneShot(step, octave, alter) to play the specified sound.
 */
/* harmony default export */ __webpack_exports__["default"] = ({
  keyborad: [{
    step: 'A',
    octave: 0,
    alter: 0
  }, {
    step: 'A',
    octave: 0,
    alter: 1
  }, {
    step: 'B',
    octave: 0,
    alter: 0
  }, {
    step: 'C',
    octave: 1,
    alter: 0
  }, {
    step: 'C',
    octave: 1,
    alter: 1
  }, {
    step: 'D',
    octave: 1,
    alter: 0
  }, {
    step: 'D',
    octave: 1,
    alter: 1
  }, {
    step: 'E',
    octave: 1,
    alter: 0
  }, {
    step: 'F',
    octave: 1,
    alter: 0
  }, {
    step: 'F',
    octave: 1,
    alter: 1
  }, {
    step: 'G',
    octave: 1,
    alter: 0
  }, {
    step: 'G',
    octave: 1,
    alter: 1
  }, {
    step: 'A',
    octave: 1,
    alter: 0
  }, {
    step: 'A',
    octave: 1,
    alter: 1
  }, {
    step: 'B',
    octave: 1,
    alter: 0
  }, {
    step: 'C',
    octave: 2,
    alter: 0
  }, {
    step: 'C',
    octave: 2,
    alter: 1
  }, {
    step: 'D',
    octave: 2,
    alter: 0
  }, {
    step: 'D',
    octave: 2,
    alter: 1
  }, {
    step: 'E',
    octave: 2,
    alter: 0
  }, {
    step: 'F',
    octave: 2,
    alter: 0
  }, {
    step: 'F',
    octave: 2,
    alter: 1
  }, {
    step: 'G',
    octave: 2,
    alter: 0
  }, {
    step: 'G',
    octave: 2,
    alter: 1
  }, {
    step: 'A',
    octave: 2,
    alter: 0
  }, {
    step: 'A',
    octave: 2,
    alter: 1
  }, {
    step: 'B',
    octave: 2,
    alter: 0
  }, {
    step: 'C',
    octave: 3,
    alter: 0
  }, {
    step: 'C',
    octave: 3,
    alter: 1
  }, {
    step: 'D',
    octave: 3,
    alter: 0
  }, {
    step: 'D',
    octave: 3,
    alter: 1
  }, {
    step: 'E',
    octave: 3,
    alter: 0
  }, {
    step: 'F',
    octave: 3,
    alter: 0
  }, {
    step: 'F',
    octave: 3,
    alter: 1
  }, {
    step: 'G',
    octave: 3,
    alter: 0
  }, {
    step: 'G',
    octave: 3,
    alter: 1
  }, {
    step: 'A',
    octave: 3,
    alter: 0
  }, {
    step: 'A',
    octave: 3,
    alter: 1
  }, {
    step: 'B',
    octave: 3,
    alter: 0
  }, {
    step: 'C',
    octave: 4,
    alter: 0
  }, {
    step: 'C',
    octave: 4,
    alter: 1
  }, {
    step: 'D',
    octave: 4,
    alter: 0
  }, {
    step: 'D',
    octave: 4,
    alter: 1
  }, {
    step: 'E',
    octave: 4,
    alter: 0
  }, {
    step: 'F',
    octave: 4,
    alter: 0
  }, {
    step: 'F',
    octave: 4,
    alter: 1
  }, {
    step: 'G',
    octave: 4,
    alter: 0
  }, {
    step: 'G',
    octave: 4,
    alter: 1
  }, {
    step: 'A',
    octave: 4,
    alter: 0
  }, {
    step: 'A',
    octave: 4,
    alter: 1
  }, {
    step: 'B',
    octave: 4,
    alter: 0
  }, {
    step: 'C',
    octave: 5,
    alter: 0
  }, {
    step: 'C',
    octave: 5,
    alter: 1
  }, {
    step: 'D',
    octave: 5,
    alter: 0
  }, {
    step: 'D',
    octave: 5,
    alter: 1
  }, {
    step: 'E',
    octave: 5,
    alter: 0
  }, {
    step: 'F',
    octave: 5,
    alter: 0
  }, {
    step: 'F',
    octave: 5,
    alter: 1
  }, {
    step: 'G',
    octave: 5,
    alter: 0
  }, {
    step: 'G',
    octave: 5,
    alter: 1
  }, {
    step: 'A',
    octave: 5,
    alter: 0
  }, {
    step: 'A',
    octave: 5,
    alter: 1
  }, {
    step: 'B',
    octave: 5,
    alter: 0
  }, {
    step: 'C',
    octave: 6,
    alter: 0
  }, {
    step: 'C',
    octave: 6,
    alter: 1
  }, {
    step: 'D',
    octave: 6,
    alter: 0
  }, {
    step: 'D',
    octave: 6,
    alter: 1
  }, {
    step: 'E',
    octave: 6,
    alter: 0
  }, {
    step: 'F',
    octave: 6,
    alter: 0
  }, {
    step: 'F',
    octave: 6,
    alter: 1
  }, {
    step: 'G',
    octave: 6,
    alter: 0
  }, {
    step: 'G',
    octave: 6,
    alter: 1
  }, {
    step: 'A',
    octave: 6,
    alter: 0
  }, {
    step: 'A',
    octave: 6,
    alter: 1
  }, {
    step: 'B',
    octave: 6,
    alter: 0
  }, {
    step: 'C',
    octave: 7,
    alter: 0
  }, {
    step: 'C',
    octave: 7,
    alter: 1
  }, {
    step: 'D',
    octave: 7,
    alter: 0
  }, {
    step: 'D',
    octave: 7,
    alter: 1
  }, {
    step: 'E',
    octave: 7,
    alter: 0
  }, {
    step: 'F',
    octave: 7,
    alter: 0
  }, {
    step: 'F',
    octave: 7,
    alter: 1
  }, {
    step: 'G',
    octave: 7,
    alter: 0
  }, {
    step: 'G',
    octave: 7,
    alter: 1
  }, {
    step: 'A',
    octave: 7,
    alter: 0
  }, {
    step: 'A',
    octave: 7,
    alter: 1
  }, {
    step: 'B',
    octave: 7,
    alter: 0
  }, {
    step: 'C',
    octave: 8,
    alter: 0
  }]
});

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LitePiano; });
/* harmony import */ var _data_piano_keyboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data/piano-keyboard.js */ "./src/data/piano-keyboard.js");
/* harmony import */ var _note_name_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./note-name.js */ "./src/note-name.js");
/* harmony import */ var _sustain_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sustain.js */ "./src/sustain.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var DEFAULT_CDN_URL = 'https://mac-blog.oss-cn-beijing.aliyuncs.com/lite-piano/fluidr3';
var LOAD_CONCURRENCY = 6;
var RELEASE_SECONDS = 0.3;
var MIN_FADE_SECONDS = 0.05;
var MIN_NOTE_SECONDS = 0.1;
var SUSTAIN_SECONDS = 10;
var DECIDE_BEFORE_END_SECONDS = 0.05;

var LitePiano =
/*#__PURE__*/
function () {
  function LitePiano() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, LitePiano);

    this.cdnBaseUrl = (options.cdnBaseUrl || DEFAULT_CDN_URL).replace(/\/+$/, '');
    this.context = null;
    this.keyboard = _data_piano_keyboard_js__WEBPACK_IMPORTED_MODULE_0__["default"].keyborad;
    this.status = 'idle';
    this.progress = {
      loaded: 0,
      total: _note_name_js__WEBPACK_IMPORTED_MODULE_1__["NOTES"].length
    };
    this.onStatusChange = null;
    this._buffers = {};
    this._voices = new Map();
    this._sustained = new Set();
    this._pedalDown = false;
    this._loadPromise = null;
    this._sustainInfo = {};
    this._loopBuffers = {};
  }

  _createClass(LitePiano, [{
    key: "_ensureContext",
    value: function _ensureContext() {
      if (!this.context) {
        var AudioContext = typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext);

        if (!AudioContext) {
          throw new Error('LitePiano: Web Audio API is not supported in this environment');
        }

        this.context = new AudioContext();
      }

      return this.context;
    }
  }, {
    key: "_setStatus",
    value: function _setStatus(status) {
      this.status = status;

      if (typeof this.onStatusChange === 'function') {
        this.onStatusChange(status);
      }
    }
    /**
     * For Note:
     * > On iOS, the Web Audio API requires sounds to be triggered from an explicit user action, such as a tap.
     * > Calling noteOn() from an onload event will not play sound.
     * in https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/PlayingandSynthesizingSounds/PlayingandSynthesizingSounds.html#//apple_ref/doc/uid/TP40009523-CH6-SW1
     *
     * The function encapsulates the automatic processing of the state in which the sound context of the unlocked ios is suspended by user interaction.
     *
     * Returns the Promise object, if executed on the IOS, then resolve will be executed after the user clicks the screen to unlock the audio context.
     */

  }, {
    key: "resume",
    value: function resume() {
      var context = this._ensureContext();

      return new Promise(function (resolve, reject) {
        if (context.state === 'suspended' && 'ontouchstart' in window) {
          var unlock = function unlock() {
            context.resume().then(function () {
              document.body.removeEventListener('touchstart', unlock);
              document.body.removeEventListener('touchend', unlock);
              resolve();
            }).catch(function (e) {
              reject(e);
            });
          };

          document.body.addEventListener('touchstart', unlock, false);
          document.body.addEventListener('touchend', unlock, false);
        } else {
          resolve();
        }
      });
    }
    /**
     * Fetch and decode all 88 note samples from the CDN. Idempotent: safe to
     * call repeatedly; after an 'error' it only refetches the missing notes.
     */

  }, {
    key: "load",
    value: function load() {
      var _this = this;

      if (this._loadPromise) {
        return this._loadPromise;
      }

      var context = this._ensureContext();

      this._setStatus('loading');

      var todo = _note_name_js__WEBPACK_IMPORTED_MODULE_1__["NOTES"].filter(function (name) {
        return !_this._buffers[name];
      });
      var failed = [];
      var cursor = 0;

      var loadOne = function loadOne(name, retried) {
        return fetch("".concat(_this.cdnBaseUrl, "/").concat(name, ".mp3")).then(function (res) {
          if (!res.ok) {
            throw new Error("http ".concat(res.status));
          }

          return res.arrayBuffer();
        }).then(function (ab) {
          return new Promise(function (resolve, reject) {
            context.decodeAudioData(ab, resolve, reject);
          });
        }).then(function (buffer) {
          _this._buffers[name] = buffer;
          _this.progress.loaded += 1;
        }).catch(function (err) {
          if (!retried) {
            return loadOne(name, true);
          }

          failed.push(name);
          console.warn("lite-piano: failed to load ".concat(name), err);
        });
      };

      var worker = function worker() {
        if (cursor >= todo.length) {
          return Promise.resolve();
        }

        var name = todo[cursor++];
        return loadOne(name, false).then(worker);
      };

      var workers = [];

      for (var i = 0; i < Math.min(LOAD_CONCURRENCY, todo.length); i++) {
        workers.push(worker());
      }

      this._loadPromise = Promise.all(workers).then(function () {
        if (failed.length) {
          _this._setStatus('error');

          _this._loadPromise = null;
          throw new Error("LitePiano: failed to load notes: ".concat(failed.join(', ')));
        }

        _this._setStatus('ready');
      });
      return this._loadPromise;
    }
    /**
     * Lazily analyze a note's sustain envelope and build its processed loop
     * buffer on first long-duration use; both are cached per note. Returns
     * null for dead-type notes whose real sustain dies inside the sample.
     */

  }, {
    key: "_loopVoiceData",
    value: function _loopVoiceData(name) {
      if (!(name in this._sustainInfo)) {
        this._sustainInfo[name] = Object(_sustain_js__WEBPACK_IMPORTED_MODULE_2__["analyzeSustain"])(this._buffers[name]);
      }

      var analysis = this._sustainInfo[name];

      if (!analysis.sustaining) {
        return null;
      }

      if (!this._loopBuffers[name]) {
        var raw = this._buffers[name];

        var context = this._ensureContext();

        var buffer = context.createBuffer(raw.numberOfChannels, raw.length, raw.sampleRate);
        Object(_sustain_js__WEBPACK_IMPORTED_MODULE_2__["buildLoopChannels"])(raw, analysis).forEach(function (data, ch) {
          buffer.getChannelData(ch).set(data);
        });
        this._loopBuffers[name] = buffer;
      }

      return {
        analysis: analysis,
        buffer: this._loopBuffers[name]
      };
    }
  }, {
    key: "_releaseVoice",
    value: function _releaseVoice(voice) {
      if (!voice || voice.released) {
        return;
      }

      voice.released = true;

      if (voice.timer) {
        clearTimeout(voice.timer);
        voice.timer = null;
      }

      this._sustained.delete(voice);

      var t = this._ensureContext().currentTime;

      voice.gain.gain.cancelScheduledValues(t);
      voice.gain.gain.setValueAtTime(voice.gain.gain.value, t);
      voice.gain.gain.linearRampToValueAtTime(0, t + RELEASE_SECONDS);

      try {
        voice.source.stop(t + RELEASE_SECONDS + 0.01);
      } catch (e) {}

      if (this._voices.get(voice.name) === voice) {
        this._voices.delete(voice.name);
      }
    }
    /**
     * Play a tone through tone name, octave and alter.
     * eg: oneShot('D', 4) plays D4; oneShot('C', 4, 1) plays C#4 (same as oneShot('D', 4, -1)).
     * @param {string} step C D E F G A B
     * @param {number} octave 0..8
     * @param {number} alter 1 = sharp, 0 = natural, -1 = flat
     * @param {number} duration seconds the note lasts. Shorter than the sample =
     * cut with a smooth fade (staccato); longer = the de-tilted sustain region
     * loops seamlessly while the note's measured decay rate carries it toward
     * silence (high notes whose real sustain is short simply die naturally).
     * Pedal down at note-off extends it to SUSTAIN_SECONDS.
     * Omitted = ring to natural decay.
     */

  }, {
    key: "oneShot",
    value: function oneShot(step, octave) {
      var _this2 = this;

      var alter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var duration = arguments.length > 3 ? arguments[3] : undefined;

      if (this.status !== 'ready') {
        console.warn('lite-piano: sounds are not loaded yet, call load() first');
        return null;
      }

      var name = Object(_note_name_js__WEBPACK_IMPORTED_MODULE_1__["toNoteName"])(step, octave, alter);

      if (!name) {
        return null;
      }

      var context = this._ensureContext();

      var old = this._voices.get(name);

      if (old) {
        this._releaseVoice(old);
      }

      var source = context.createBufferSource();
      var gain = context.createGain();
      source.connect(gain);
      gain.connect(context.destination);
      var voice = {
        name: name,
        source: source,
        gain: gain,
        timer: null,
        released: false
      };

      this._voices.set(name, voice);

      source.onended = function () {
        _this2._sustained.delete(voice);

        if (_this2._voices.get(name) === voice) {
          _this2._voices.delete(name);
        }
      };

      if (duration === undefined || duration === null) {
        source.buffer = this._buffers[name];
      } else {
        var seconds = Math.max(Number(duration) || 0, MIN_NOTE_SECONDS);
        var startedAt = context.currentTime;
        var endAt = startedAt + seconds;
        voice.startedAt = startedAt;
        voice.seconds = seconds;

        var data = this._loopVoiceData(name);

        if (data) {
          // A sustaining note plays the de-tilted loop buffer from the very
          // start while the gain envelope re-applies the measured decay, so a
          // short note sounds identical to the raw sample — and a held pedal
          // only re-aims the envelope, never swaps the source mid-playback.
          var analysis = data.analysis;
          source.buffer = data.buffer;
          source.loop = true;
          source.loopStart = analysis.loopStart;
          source.loopEnd = analysis.loopEnd;
          var fade = Math.min(RELEASE_SECONDS, Math.max(MIN_FADE_SECONDS, seconds / 2));
          voice.fade = fade;
          var loopAt = startedAt + analysis.loopStart;
          var inaudibleAt = startedAt + Object(_sustain_js__WEBPACK_IMPORTED_MODULE_2__["inaudibleAfter"])(analysis);
          var decayEnd = Math.min(endAt, inaudibleAt);

          if (decayEnd > loopAt) {
            gain.gain.setValueAtTime(1, loopAt);
            gain.gain.exponentialRampToValueAtTime(Object(_sustain_js__WEBPACK_IMPORTED_MODULE_2__["naturalGainAt"])(analysis, decayEnd - startedAt), decayEnd);
          }

          if (endAt < inaudibleAt) {
            if (decayEnd <= loopAt) {
              gain.gain.setValueAtTime(1, endAt);
            }

            gain.gain.linearRampToValueAtTime(0, endAt + fade);
          }

          voice.stopAt = Math.min(endAt + fade, inaudibleAt) + 0.02;

          try {
            source.stop(voice.stopAt);
          } catch (e) {}
        } else if (seconds < this._buffers[name].duration) {
          // dead-type note cut short: raw sample + fade at note-off
          source.buffer = this._buffers[name];

          var _fade = Math.min(RELEASE_SECONDS, Math.max(MIN_FADE_SECONDS, seconds / 2));

          voice.fade = _fade;
          gain.gain.setValueAtTime(1, endAt);
          gain.gain.linearRampToValueAtTime(0, endAt + _fade);
        } else {
          // dead-type note with a long duration: plays out and dies on its own
          source.buffer = this._buffers[name];
        } // decide slightly before the fade runs so a held pedal cancels it seamlessly


        voice.timer = setTimeout(function () {
          voice.timer = null;

          if (_this2._pedalDown) {
            _this2._extendVoice(voice);

            _this2._sustained.add(voice);
          } else {
            voice.released = true;
            var stopAt = endAt + (voice.fade || 0) + 0.02;

            if (!voice.stopAt || stopAt < voice.stopAt) {
              try {
                voice.source.stop(stopAt);
              } catch (e) {}

              voice.stopAt = stopAt;
            }
          }
        }, Math.max(0, seconds - DECIDE_BEFORE_END_SECONDS) * 1000);
      }

      source.start(context.currentTime);
      return source;
    }
    /**
     * A held pedal turns the note into a long one: keep it sounding for
     * SUSTAIN_SECONDS from note-on. The measured decay rate never changes —
     * only the envelope target and stop time move. The source has been looping
     * the de-tilted buffer since note-on, so there is nothing to swap.
     * Dead-type notes ignore the pedal.
     */

  }, {
    key: "_extendVoice",
    value: function _extendVoice(voice) {
      var data = this._loopVoiceData(voice.name);

      if (!data || voice.released) {
        return;
      }

      var analysis = data.analysis;

      var context = this._ensureContext();

      var now = context.currentTime;
      var endAt = voice.startedAt + Math.max(voice.seconds, SUSTAIN_SECONDS);
      var inaudibleAt = voice.startedAt + Object(_sustain_js__WEBPACK_IMPORTED_MODULE_2__["inaudibleAfter"])(analysis); // decayEnd can land in the past for a fast-decaying note caught late

      var decayEnd = Math.max(Math.min(endAt, inaudibleAt), now + 0.01);
      var param = voice.gain.gain;
      param.cancelScheduledValues(now); // the ramp cancelled above follows naturalGainAt exactly, so re-anchoring
      // at the natural level for the elapsed time is continuous

      param.setValueAtTime(Object(_sustain_js__WEBPACK_IMPORTED_MODULE_2__["naturalGainAt"])(analysis, now - voice.startedAt), now);
      var loopAt = voice.startedAt + analysis.loopStart;

      if (loopAt > now) {
        param.setValueAtTime(1, loopAt);
      }

      param.exponentialRampToValueAtTime(Object(_sustain_js__WEBPACK_IMPORTED_MODULE_2__["naturalGainAt"])(analysis, decayEnd - voice.startedAt), decayEnd);

      if (endAt < inaudibleAt) {
        param.linearRampToValueAtTime(0, endAt + RELEASE_SECONDS);
      }

      voice.stopAt = Math.min(endAt + RELEASE_SECONDS, inaudibleAt) + 0.02;

      try {
        voice.source.stop(voice.stopAt);
      } catch (e) {}
    }
    /**
     * Sustain pedal down. Notes whose note-off arrives while the pedal is
     * down are held for SUSTAIN_SECONDS, or until pedalUp(). Idempotent.
     */

  }, {
    key: "pedalDown",
    value: function pedalDown() {
      this._pedalDown = true;
    }
    /**
     * Sustain pedal up. Releases every voice the pedal was holding. Idempotent.
     */

  }, {
    key: "pedalUp",
    value: function pedalUp() {
      var _this3 = this;

      this._pedalDown = false;

      this._sustained.forEach(function (voice) {
        return _this3._releaseVoice(voice);
      });

      this._sustained.clear();
    }
  }]);

  return LitePiano;
}();



if (typeof window !== 'undefined') {
  window.LitePiano = LitePiano;
}

/***/ }),

/***/ "./src/note-name.js":
/*!**************************!*\
  !*** ./src/note-name.js ***!
  \**************************/
/*! exports provided: toNoteName, NOTES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toNoteName", function() { return toNoteName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NOTES", function() { return NOTES; });
var PC = {
  C: 0,
  D: 2,
  E: 4,
  F: 5,
  G: 7,
  A: 9,
  B: 11
};
var NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']; // 88 keys range in absolute semitones: A0 = 9, C8 = 96

var MIN_ABS = 9;
var MAX_ABS = 96;
/**
 * Map (step, octave, alter) to a sample file note name like 'Db4'.
 * alter: 1 = sharp, 0 = natural, -1 = flat (aligned with MusicXML).
 * Returns null (and warns) for unsupported input.
 */

function toNoteName(step, octave) {
  var alter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var s = String(step).toUpperCase();
  var oct = parseInt(octave, 10);
  var alt = alter === undefined || alter === null ? 0 : parseInt(alter, 10);

  if (!Object.prototype.hasOwnProperty.call(PC, s) || isNaN(oct) || isNaN(alt) || Math.abs(alt) > 1) {
    console.warn("lite-piano: unsupported note ".concat(step, " ").concat(octave, " ").concat(alter));
    return null;
  }

  var semitone = PC[s] + alt;
  var o = oct;

  if (semitone < 0) {
    semitone += 12;
    o -= 1;
  } else if (semitone > 11) {
    semitone -= 12;
    o += 1;
  }

  var abs = o * 12 + semitone;

  if (abs < MIN_ABS || abs > MAX_ABS) {
    console.warn("lite-piano: note out of 88-key range ".concat(step, " ").concat(octave, " ").concat(alter));
    return null;
  }

  return NAMES[semitone] + o;
} // A0..C8 ascending, flat names

var NOTES = [];

for (var abs = MIN_ABS; abs <= MAX_ABS; abs++) {
  NOTES.push(NAMES[abs % 12] + Math.floor(abs / 12));
}

/***/ }),

/***/ "./src/sustain.js":
/*!************************!*\
  !*** ./src/sustain.js ***!
  \************************/
/*! exports provided: analyzeSustain, buildLoopChannels, naturalGainAt, inaudibleAfter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "analyzeSustain", function() { return analyzeSustain; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildLoopChannels", function() { return buildLoopChannels; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "naturalGainAt", function() { return naturalGainAt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inaudibleAfter", function() { return inaudibleAfter; });
var WINDOW_SECONDS = 0.05;
var ATTACK_FIT_DELAY = 0.3;
var AUDIBLE_DROP_DB = 55;
var AUDIBLE_FLOOR_DBFS = -78;
var MIN_SUSTAIN_SECONDS = 0.8;
var MIN_LOOP_SECONDS = 0.4;
var ATTACK_SETTLE = 0.15;
var LOOP_TARGET_SECONDS = 1.2;
var LOOP_END_MARGIN = 0.05;
var MIN_DB_PER_SEC = 0.5;
var MAX_DB_PER_SEC = 60;
var BLEND_SECONDS = 0.08;

var clamp = function clamp(v, lo, hi) {
  return Math.min(Math.max(v, lo), hi);
};
/**
 * Measure a decoded sample's sustain envelope.
 * buffer: { numberOfChannels, length, sampleRate, getChannelData(ch) }.
 * Returns times in seconds: { peakTime, audibleEnd, decayDbPerSec,
 * loopStart, loopEnd, sustaining }.
 */


function analyzeSustain(buffer) {
  var numberOfChannels = buffer.numberOfChannels,
      length = buffer.length,
      sampleRate = buffer.sampleRate;
  var win = Math.max(1, Math.floor(WINDOW_SECONDS * sampleRate));
  var count = Math.floor(length / win);
  var levelDb = new Float64Array(count);

  for (var w = 0; w < count; w++) {
    var sum = 0;
    var from = w * win;

    for (var ch = 0; ch < numberOfChannels; ch++) {
      var data = buffer.getChannelData(ch);

      for (var i = from; i < from + win; i++) {
        sum += data[i] * data[i];
      }
    }

    var rms = Math.sqrt(sum / (win * numberOfChannels));
    levelDb[w] = 20 * Math.log10(Math.max(rms, 1e-9));
  }

  var peak = 0;

  for (var _w = 1; _w < count; _w++) {
    if (levelDb[_w] > levelDb[peak]) {
      peak = _w;
    }
  }

  var peakTime = (peak + 0.5) * WINDOW_SECONDS;
  var peakDb = levelDb[peak];
  var threshold = Math.max(peakDb - AUDIBLE_DROP_DB, AUDIBLE_FLOOR_DBFS);
  var last = count - 1;

  while (last > peak && levelDb[last] <= threshold) {
    last--;
  }

  var audibleEnd = Math.min((last + 1) * WINDOW_SECONDS, length / sampleRate); // least-squares fit of level vs time over the settled decay region

  var t0 = peakTime + ATTACK_FIT_DELAY;
  var n = 0,
      sx = 0,
      sy = 0,
      sxx = 0,
      sxy = 0;

  for (var _w2 = 0; _w2 <= last; _w2++) {
    var t = (_w2 + 0.5) * WINDOW_SECONDS;

    if (t < t0) {
      continue;
    }

    n++;
    sx += t;
    sy += levelDb[_w2];
    sxx += t * t;
    sxy += t * levelDb[_w2];
  }

  var decayDbPerSec = MIN_DB_PER_SEC;

  if (n >= 2) {
    var denom = n * sxx - sx * sx;

    if (denom > 0) {
      var slope = (n * sxy - sx * sy) / denom;
      decayDbPerSec = clamp(-slope, MIN_DB_PER_SEC, MAX_DB_PER_SEC);
    }
  }

  var loopStart = Math.max(peakTime + ATTACK_SETTLE, audibleEnd - LOOP_TARGET_SECONDS);
  var loopEnd = audibleEnd - LOOP_END_MARGIN;
  var sustaining = audibleEnd - peakTime >= MIN_SUSTAIN_SECONDS && loopEnd - loopStart >= MIN_LOOP_SECONDS;
  return {
    peakTime: peakTime,
    audibleEnd: audibleEnd,
    decayDbPerSec: decayDbPerSec,
    loopStart: loopStart,
    loopEnd: loopEnd,
    sustaining: sustaining
  };
}
/**
 * Full-length per-channel copies with the loop region de-tilted (the measured
 * decay ramped out, so loop start/end levels match) and an 80ms seam morphed
 * into the material just before loopStart, so a [loopStart, loopEnd) loop
 * wraps without a click. The input buffer is never mutated.
 */

function buildLoopChannels(buffer, analysis) {
  var numberOfChannels = buffer.numberOfChannels,
      length = buffer.length,
      sampleRate = buffer.sampleRate;
  var loopStartFrame = Math.floor(analysis.loopStart * sampleRate);
  var loopEndFrame = Math.min(Math.floor(analysis.loopEnd * sampleRate), length);
  var blend = Math.min(Math.floor(BLEND_SECONDS * sampleRate), loopStartFrame);
  var out = [];

  for (var ch = 0; ch < numberOfChannels; ch++) {
    var data = buffer.getChannelData(ch);
    var target = new Float32Array(length);
    target.set(data);

    for (var f = loopStartFrame; f < loopEndFrame; f++) {
      var t = (f - loopStartFrame) / sampleRate;
      target[f] *= Math.pow(10, analysis.decayDbPerSec * t / 20);
    }

    for (var i = 0; i < blend; i++) {
      var _t = i / blend;

      var idx = loopEndFrame - blend + i;
      target[idx] = target[idx] * (1 - _t) + target[loopStartFrame - blend + i] * _t;
    }

    out.push(target);
  }

  return out;
}
/**
 * Gain a looping note should have `elapsed` seconds after note start:
 * full level until loopStart, then the measured decay, clamped to
 * [-60 dB, 0 dB].
 */

function naturalGainAt(analysis, elapsed) {
  if (elapsed <= analysis.loopStart) {
    return 1;
  }

  var gain = Math.pow(10, -analysis.decayDbPerSec * (elapsed - analysis.loopStart) / 20);
  return clamp(gain, 0.001, 1);
}
/**
 * Seconds after note start when the natural decay reaches -60 dB.
 */

function inaudibleAfter(analysis) {
  return analysis.loopStart + 60 / analysis.decayDbPerSec;
}

/***/ })

/******/ });
//# sourceMappingURL=ui.js.map