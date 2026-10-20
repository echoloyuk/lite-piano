(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["LitePiano"] = factory();
	else
		root["LitePiano"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

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

/******/ })["default"];
});
//# sourceMappingURL=index.js.map