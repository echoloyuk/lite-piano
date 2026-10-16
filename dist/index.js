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
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var DEFAULT_CDN_URL = 'https://mac-blog.oss-cn-beijing.aliyuncs.com/lite-piano/fluidr3';
var LOAD_CONCURRENCY = 6;
var RELEASE_SECONDS = 0.3;
var MIN_FADE_SECONDS = 0.05;
var MIN_NOTE_SECONDS = 0.1;
var MIN_DECAY_SECONDS = 0.3;
var SUSTAIN_SECONDS = 10;
var LOOP_START_RATIO = 0.45;
var LOOP_END_RATIO = 0.95;
var LOOP_BLEND_SECONDS = 0.08;
var SWAP_SECONDS = 0.06;
var DECIDE_BEFORE_END_SECONDS = 0.05;
var LN_AUDIBLE = Math.log(1000);

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
     * cut with a smooth fade (staccato); longer = seamlessly looped and decayed
     * to silence at `duration`. Pedal down at note-off extends it to
     * SUSTAIN_SECONDS. Omitted = ring to natural decay.
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
        var natural = this._buffers[name].duration;
        var endAt = startedAt + seconds;
        voice.startedAt = startedAt;
        voice.seconds = seconds;
        voice.natural = natural;

        if (seconds > natural * LOOP_END_RATIO) {
          // longer than the sample: seamlessly loop the sustain region and
          // shape an exponential decay that reaches silence at `endAt`
          source.buffer = this._createSustainBuffer(this._buffers[name]);
          source.loop = true;
          source.loopStart = natural * LOOP_START_RATIO;
          source.loopEnd = natural * LOOP_END_RATIO;
          var decayFrom = startedAt + natural * LOOP_END_RATIO;
          var tc = Math.max((endAt - decayFrom) / LN_AUDIBLE, MIN_DECAY_SECONDS);
          gain.gain.setValueAtTime(1, decayFrom);
          gain.gain.setTargetAtTime(0, decayFrom, tc);
        } else {
          // shorter than the sample: hold full level until note-off, then fade
          source.buffer = this._buffers[name];
          var fade = Math.min(RELEASE_SECONDS, Math.max(MIN_FADE_SECONDS, seconds / 2));
          voice.fade = fade;
          gain.gain.setValueAtTime(1, endAt);
          gain.gain.linearRampToValueAtTime(0, endAt + fade);
        } // decide slightly before the fade runs so a held pedal cancels it seamlessly


        voice.timer = setTimeout(function () {
          voice.timer = null;

          if (_this2._pedalDown) {
            _this2._extendVoice(voice);

            _this2._sustained.add(voice);
          } else {
            voice.released = true;

            try {
              voice.source.stop(endAt + (voice.fade || 0) + 0.02);
            } catch (e) {}
          }
        }, Math.max(0, seconds - DECIDE_BEFORE_END_SECONDS) * 1000);
      }

      source.start(context.currentTime);
      return source;
    }
    /**
     * Copy of the sample with an 80ms crossfade baked in just before
     * loopEnd, morphing the loop tail into the material right before
     * loopStart, so a [loopStart, loopEnd) loop wraps seamlessly.
     */

  }, {
    key: "_createSustainBuffer",
    value: function _createSustainBuffer(buffer) {
      var context = this._ensureContext();

      var loopStart = Math.floor(buffer.length * LOOP_START_RATIO);
      var loopEnd = Math.floor(buffer.length * LOOP_END_RATIO);
      var blend = Math.min(Math.floor(buffer.sampleRate * LOOP_BLEND_SECONDS), loopStart);
      var out = context.createBuffer(buffer.numberOfChannels, buffer.length, buffer.sampleRate);

      for (var ch = 0; ch < buffer.numberOfChannels; ch++) {
        var data = buffer.getChannelData(ch);
        var target = out.getChannelData(ch);
        target.set(data);

        for (var i = 0; i < blend; i++) {
          var t = i / blend;
          var idx = loopEnd - blend + i;
          target[idx] = data[idx] * (1 - t) + data[loopStart - blend + i] * t;
        }
      }

      return out;
    }
    /**
     * A held pedal turns the note into a long one: keep it sounding for
     * SUSTAIN_SECONDS from note-on. Swaps to the seamless loop if the
     * voice is not looping yet, then re-shapes the decay to the new end.
     */

  }, {
    key: "_extendVoice",
    value: function _extendVoice(voice) {
      var _this3 = this;

      var context = this._ensureContext();

      var now = context.currentTime;
      var endAt = voice.startedAt + Math.max(voice.seconds, SUSTAIN_SECONDS);
      var remaining = Math.max(endAt - now, MIN_DECAY_SECONDS);

      if (!voice.source.loop) {
        var oldSource = voice.source;
        var oldGain = voice.gain;
        var source = context.createBufferSource();
        source.buffer = this._createSustainBuffer(oldSource.buffer);
        source.loop = true;
        source.loopStart = voice.natural * LOOP_START_RATIO;
        source.loopEnd = voice.natural * LOOP_END_RATIO;
        var gain = context.createGain();
        source.connect(gain);
        gain.connect(context.destination);

        source.onended = function () {
          _this3._sustained.delete(voice);

          if (_this3._voices.get(voice.name) === voice) {
            _this3._voices.delete(voice.name);
          }
        };

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(1, now + SWAP_SECONDS);
        oldGain.gain.cancelScheduledValues(now);
        oldGain.gain.setValueAtTime(1, now);
        oldGain.gain.linearRampToValueAtTime(0, now + SWAP_SECONDS);
        oldSource.onended = null;

        try {
          oldSource.stop(now + SWAP_SECONDS + 0.01);
        } catch (e) {}

        source.start(now, voice.natural * LOOP_START_RATIO);
        voice.source = source;
        voice.gain = gain;
        gain.gain.setTargetAtTime(0, now + SWAP_SECONDS, remaining / LN_AUDIBLE);
      } else {
        var param = voice.gain.gain;
        param.cancelScheduledValues(now);
        param.setValueAtTime(param.value, now);
        param.setTargetAtTime(0, now, remaining / LN_AUDIBLE);
      }

      try {
        voice.source.stop(endAt + 0.02);
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
      var _this4 = this;

      this._pedalDown = false;

      this._sustained.forEach(function (voice) {
        return _this4._releaseVoice(voice);
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

/***/ })

/******/ })["default"];
});
//# sourceMappingURL=index.js.map