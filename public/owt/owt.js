(function (f) {
    if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = f()
    } else if (typeof define === "function" && define.amd) {
        define([], f)
    } else {
        var g;
        if (typeof window !== "undefined") {
            g = window
        } else if (typeof global !== "undefined") {
            g = global
        } else if (typeof self !== "undefined") {
            g = self
        } else {
            g = this
        }
        g.Owt = f()
    }
})(function () {
    var define, module, exports;
    return (function () {
        function r(e, n, t) {
            function o(i, f) {
                if (!n[i]) {
                    if (!e[i]) {
                        var c = "function" == typeof require && require;
                        if (!f && c) return c(i, !0);
                        if (u) return u(i, !0);
                        var a = new Error("Cannot find module '" + i + "'");
                        throw a.code = "MODULE_NOT_FOUND", a
                    }
                    var p = n[i] = {exports: {}};
                    e[i][0].call(p.exports, function (r) {
                        var n = e[i][1][r];
                        return o(n || r)
                    }, p, p.exports, r, e, n, t)
                }
                return n[i].exports
            }

            for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
            return o
        }

        return r
    })()({
        1: [function (require, module, exports) {
// MIT License
//
// Copyright (c) 2012 Universidad Politécnica de Madrid
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// Copyright (C) <2018> Intel Corporation
//
// SPDX-License-Identifier: Apache-2.0
// This file is borrowed from lynckia/licode with some modifications.

            /* global unescape*/
            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.Base64 = void 0;

            var Base64 = function () {
                var END_OF_INPUT = -1;
                var base64Str;
                var base64Count;
                var i;
                var base64Chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/'];
                var reverseBase64Chars = [];

                for (i = 0; i < base64Chars.length; i = i + 1) {
                    reverseBase64Chars[base64Chars[i]] = i;
                }

                var setBase64Str = function setBase64Str(str) {
                    base64Str = str;
                    base64Count = 0;
                };

                var readBase64 = function readBase64() {
                    if (!base64Str) {
                        return END_OF_INPUT;
                    }

                    if (base64Count >= base64Str.length) {
                        return END_OF_INPUT;
                    }

                    var c = base64Str.charCodeAt(base64Count) & 0xff;
                    base64Count = base64Count + 1;
                    return c;
                };

                var encodeBase64 = function encodeBase64(str) {
                    var result;
                    var done;
                    setBase64Str(str);
                    result = '';
                    var inBuffer = new Array(3);
                    done = false;

                    while (!done && (inBuffer[0] = readBase64()) !== END_OF_INPUT) {
                        inBuffer[1] = readBase64();
                        inBuffer[2] = readBase64();
                        result = result + base64Chars[inBuffer[0] >> 2];

                        if (inBuffer[1] !== END_OF_INPUT) {
                            result = result + base64Chars[inBuffer[0] << 4 & 0x30 | inBuffer[1] >> 4];

                            if (inBuffer[2] !== END_OF_INPUT) {
                                result = result + base64Chars[inBuffer[1] << 2 & 0x3c | inBuffer[2] >> 6];
                                result = result + base64Chars[inBuffer[2] & 0x3F];
                            } else {
                                result = result + base64Chars[inBuffer[1] << 2 & 0x3c];
                                result = result + '=';
                                done = true;
                            }
                        } else {
                            result = result + base64Chars[inBuffer[0] << 4 & 0x30];
                            result = result + '=';
                            result = result + '=';
                            done = true;
                        }
                    }

                    return result;
                };

                var readReverseBase64 = function readReverseBase64() {
                    if (!base64Str) {
                        return END_OF_INPUT;
                    }

                    while (true) {
                        // eslint-disable-line no-constant-condition
                        if (base64Count >= base64Str.length) {
                            return END_OF_INPUT;
                        }

                        var nextCharacter = base64Str.charAt(base64Count);
                        base64Count = base64Count + 1;

                        if (reverseBase64Chars[nextCharacter]) {
                            return reverseBase64Chars[nextCharacter];
                        }

                        if (nextCharacter === 'A') {
                            return 0;
                        }
                    }
                };

                var ntos = function ntos(n) {
                    n = n.toString(16);

                    if (n.length === 1) {
                        n = '0' + n;
                    }

                    n = '%' + n;
                    return unescape(n);
                };

                var decodeBase64 = function decodeBase64(str) {
                    var result;
                    var done;
                    setBase64Str(str);
                    result = '';
                    var inBuffer = new Array(4);
                    done = false;

                    while (!done && (inBuffer[0] = readReverseBase64()) !== END_OF_INPUT && (inBuffer[1] = readReverseBase64()) !== END_OF_INPUT) {
                        inBuffer[2] = readReverseBase64();
                        inBuffer[3] = readReverseBase64();
                        result = result + ntos(inBuffer[0] << 2 & 0xff | inBuffer[1] >> 4);

                        if (inBuffer[2] !== END_OF_INPUT) {
                            result += ntos(inBuffer[1] << 4 & 0xff | inBuffer[2] >> 2);

                            if (inBuffer[3] !== END_OF_INPUT) {
                                result = result + ntos(inBuffer[2] << 6 & 0xff | inBuffer[3]);
                            } else {
                                done = true;
                            }
                        } else {
                            done = true;
                        }
                    }

                    return result;
                };

                return {
                    encodeBase64: encodeBase64,
                    decodeBase64: decodeBase64
                };
            }();

            exports.Base64 = Base64;

        }, {}],
        2: [function (require, module, exports) {
// Copyright (C) <2018> Intel Corporation
//
// SPDX-License-Identifier: Apache-2.0
            'use strict';
            /**
             * @class AudioCodec
             * @memberOf Owt.Base
             * @classDesc Audio codec enumeration.
             * @hideconstructor
             */

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.VideoEncodingParameters = exports.VideoCodecParameters = exports.VideoCodec = exports.AudioEncodingParameters = exports.AudioCodecParameters = exports.AudioCodec = void 0;

            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }

            var AudioCodec = {
                PCMU: 'pcmu',
                PCMA: 'pcma',
                OPUS: 'opus',
                G722: 'g722',
                ISAC: 'iSAC',
                ILBC: 'iLBC',
                AAC: 'aac',
                AC3: 'ac3',
                NELLYMOSER: 'nellymoser'
            };
            /**
             * @class AudioCodecParameters
             * @memberOf Owt.Base
             * @classDesc Codec parameters for an audio track.
             * @hideconstructor
             */

            exports.AudioCodec = AudioCodec;

            var AudioCodecParameters = // eslint-disable-next-line require-jsdoc
                function AudioCodecParameters(name, channelCount, clockRate) {
                    _classCallCheck(this, AudioCodecParameters);

                    /**
                     * @member {string} name
                     * @memberof Owt.Base.AudioCodecParameters
                     * @instance
                     * @desc Name of a codec. Please use a value in Owt.Base.AudioCodec. However, some functions do not support all the values in Owt.Base.AudioCodec.
                     */
                    this.name = name;
                    /**
                     * @member {?number} channelCount
                     * @memberof Owt.Base.AudioCodecParameters
                     * @instance
                     * @desc Numbers of channels for an audio track.
                     */

                    this.channelCount = channelCount;
                    /**
                     * @member {?number} clockRate
                     * @memberof Owt.Base.AudioCodecParameters
                     * @instance
                     * @desc The codec clock rate expressed in Hertz.
                     */

                    this.clockRate = clockRate;
                };
            /**
             * @class AudioEncodingParameters
             * @memberOf Owt.Base
             * @classDesc Encoding parameters for sending an audio track.
             * @hideconstructor
             */


            exports.AudioCodecParameters = AudioCodecParameters;

            var AudioEncodingParameters = // eslint-disable-next-line require-jsdoc
                function AudioEncodingParameters(codec, maxBitrate) {
                    _classCallCheck(this, AudioEncodingParameters);

                    /**
                     * @member {?Owt.Base.AudioCodecParameters} codec
                     * @instance
                     * @memberof Owt.Base.AudioEncodingParameters
                     */
                    this.codec = codec;
                    /**
                     * @member {?number} maxBitrate
                     * @instance
                     * @memberof Owt.Base.AudioEncodingParameters
                     * @desc Max bitrate expressed in kbps.
                     */

                    this.maxBitrate = maxBitrate;
                };
            /**
             * @class VideoCodec
             * @memberOf Owt.Base
             * @classDesc Video codec enumeration.
             * @hideconstructor
             */


            exports.AudioEncodingParameters = AudioEncodingParameters;
            var VideoCodec = {
                VP8: 'vp8',
                VP9: 'vp9',
                H264: 'h264',
                H265: 'h265'
            };
            /**
             * @class VideoCodecParameters
             * @memberOf Owt.Base
             * @classDesc Codec parameters for a video track.
             * @hideconstructor
             */

            exports.VideoCodec = VideoCodec;

            var VideoCodecParameters = // eslint-disable-next-line require-jsdoc
                function VideoCodecParameters(name, profile) {
                    _classCallCheck(this, VideoCodecParameters);

                    /**
                     * @member {string} name
                     * @memberof Owt.Base.VideoCodecParameters
                     * @instance
                     * @desc Name of a codec. Please use a value in Owt.Base.VideoCodec. However, some functions do not support all the values in Owt.Base.AudioCodec.
                     */
                    this.name = name;
                    /**
                     * @member {?string} profile
                     * @memberof Owt.Base.VideoCodecParameters
                     * @instance
                     * @desc The profile of a codec. Profile may not apply to all codecs.
                     */

                    this.profile = profile;
                };
            /**
             * @class VideoEncodingParameters
             * @memberOf Owt.Base
             * @classDesc Encoding parameters for sending a video track.
             * @hideconstructor
             */


            exports.VideoCodecParameters = VideoCodecParameters;

            var VideoEncodingParameters = // eslint-disable-next-line require-jsdoc
                function VideoEncodingParameters(codec, maxBitrate) {
                    _classCallCheck(this, VideoEncodingParameters);

                    /**
                     * @member {?Owt.Base.VideoCodecParameters} codec
                     * @instance
                     * @memberof Owt.Base.VideoEncodingParameters
                     */
                    this.codec = codec;
                    /**
                     * @member {?number} maxBitrate
                     * @instance
                     * @memberof Owt.Base.VideoEncodingParameters
                     * @desc Max bitrate expressed in kbps.
                     */

                    this.maxBitrate = maxBitrate;
                };

            exports.VideoEncodingParameters = VideoEncodingParameters;

        }, {}],
        3: [function (require, module, exports) {
// MIT License
//
// Copyright (c) 2012 Universidad Politécnica de Madrid
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// Copyright (C) <2018> Intel Corporation
//
// SPDX-License-Identifier: Apache-2.0
// This file is borrowed from lynckia/licode with some modifications.
            'use strict';
            /**
             * @class EventDispatcher
             * @classDesc A shim for EventTarget. Might be changed to EventTarget later.
             * @memberof Owt.Base
             * @hideconstructor
             */

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.MuteEvent = exports.ErrorEvent = exports.MessageEvent = exports.OwtEvent = exports.EventDispatcher = void 0;

            function _typeof(obj) {
                if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                    _typeof = function _typeof(obj) {
                        return typeof obj;
                    };
                } else {
                    _typeof = function _typeof(obj) {
                        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                    };
                }
                return _typeof(obj);
            }

            function _possibleConstructorReturn(self, call) {
                if (call && (_typeof(call) === "object" || typeof call === "function")) {
                    return call;
                }
                return _assertThisInitialized(self);
            }

            function _assertThisInitialized(self) {
                if (self === void 0) {
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                }
                return self;
            }

            function _getPrototypeOf(o) {
                _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
                    return o.__proto__ || Object.getPrototypeOf(o);
                };
                return _getPrototypeOf(o);
            }

            function _inherits(subClass, superClass) {
                if (typeof superClass !== "function" && superClass !== null) {
                    throw new TypeError("Super expression must either be null or a function");
                }
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        writable: true,
                        configurable: true
                    }
                });
                if (superClass) _setPrototypeOf(subClass, superClass);
            }

            function _setPrototypeOf(o, p) {
                _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
                    o.__proto__ = p;
                    return o;
                };
                return _setPrototypeOf(o, p);
            }

            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }

            var EventDispatcher = function EventDispatcher() {
                // Private vars
                var spec = {};
                spec.dispatcher = {};
                spec.dispatcher.eventListeners = {};
                /**
                 * @function addEventListener
                 * @desc This function registers a callback function as a handler for the corresponding event. It's shortened form is on(eventType, listener). See the event description in the following table.
                 * @instance
                 * @memberof Owt.Base.EventDispatcher
                 * @param {string} eventType Event string.
                 * @param {function} listener Callback function.
                 */

                this.addEventListener = function (eventType, listener) {
                    if (spec.dispatcher.eventListeners[eventType] === undefined) {
                        spec.dispatcher.eventListeners[eventType] = [];
                    }

                    spec.dispatcher.eventListeners[eventType].push(listener);
                };
                /**
                 * @function removeEventListener
                 * @desc This function removes a registered event listener.
                 * @instance
                 * @memberof Owt.Base.EventDispatcher
                 * @param {string} eventType Event string.
                 * @param {function} listener Callback function.
                 */


                this.removeEventListener = function (eventType, listener) {
                    if (!spec.dispatcher.eventListeners[eventType]) {
                        return;
                    }

                    var index = spec.dispatcher.eventListeners[eventType].indexOf(listener);

                    if (index !== -1) {
                        spec.dispatcher.eventListeners[eventType].splice(index, 1);
                    }
                };
                /**
                 * @function clearEventListener
                 * @desc This function removes all event listeners for one type.
                 * @instance
                 * @memberof Owt.Base.EventDispatcher
                 * @param {string} eventType Event string.
                 */


                this.clearEventListener = function (eventType) {
                    spec.dispatcher.eventListeners[eventType] = [];
                }; // It dispatch a new event to the event listeners, based on the type
                // of event. All events are intended to be LicodeEvents.


                this.dispatchEvent = function (event) {
                    if (!spec.dispatcher.eventListeners[event.type]) {
                        return;
                    }

                    spec.dispatcher.eventListeners[event.type].map(function (listener) {
                        listener(event);
                    });
                };
            };
            /**
             * @class OwtEvent
             * @classDesc Class OwtEvent represents a generic Event in the library.
             * @memberof Owt.Base
             * @hideconstructor
             */


            exports.EventDispatcher = EventDispatcher;

            var OwtEvent = // eslint-disable-next-line require-jsdoc
                function OwtEvent(type) {
                    _classCallCheck(this, OwtEvent);

                    this.type = type;
                };
            /**
             * @class MessageEvent
             * @classDesc Class MessageEvent represents a message Event in the library.
             * @memberof Owt.Base
             * @hideconstructor
             */


            exports.OwtEvent = OwtEvent;

            var MessageEvent =
                /*#__PURE__*/
                function (_OwtEvent) {
                    _inherits(MessageEvent, _OwtEvent);

                    // eslint-disable-next-line require-jsdoc
                    function MessageEvent(type, init) {
                        var _this;

                        _classCallCheck(this, MessageEvent);

                        _this = _possibleConstructorReturn(this, _getPrototypeOf(MessageEvent).call(this, type));
                        /**
                         * @member {string} origin
                         * @instance
                         * @memberof Owt.Base.MessageEvent
                         * @desc ID of the remote endpoint who published this stream.
                         */

                        _this.origin = init.origin;
                        /**
                         * @member {string} message
                         * @instance
                         * @memberof Owt.Base.MessageEvent
                         */

                        _this.message = init.message;
                        /**
                         * @member {string} to
                         * @instance
                         * @memberof Owt.Base.MessageEvent
                         * @desc Values could be "all", "me" in conference mode, or undefined in P2P mode..
                         */

                        _this.to = init.to;
                        return _this;
                    }

                    return MessageEvent;
                }(OwtEvent);
            /**
             * @class ErrorEvent
             * @classDesc Class ErrorEvent represents an error Event in the library.
             * @memberof Owt.Base
             * @hideconstructor
             */


            exports.MessageEvent = MessageEvent;

            var ErrorEvent =
                /*#__PURE__*/
                function (_OwtEvent2) {
                    _inherits(ErrorEvent, _OwtEvent2);

                    // eslint-disable-next-line require-jsdoc
                    function ErrorEvent(type, init) {
                        var _this2;

                        _classCallCheck(this, ErrorEvent);

                        _this2 = _possibleConstructorReturn(this, _getPrototypeOf(ErrorEvent).call(this, type));
                        /**
                         * @member {Error} error
                         * @instance
                         * @memberof Owt.Base.ErrorEvent
                         */

                        _this2.error = init.error;
                        return _this2;
                    }

                    return ErrorEvent;
                }(OwtEvent);
            /**
             * @class MuteEvent
             * @classDesc Class MuteEvent represents a mute or unmute event.
             * @memberof Owt.Base
             * @hideconstructor
             */


            exports.ErrorEvent = ErrorEvent;

            var MuteEvent =
                /*#__PURE__*/
                function (_OwtEvent3) {
                    _inherits(MuteEvent, _OwtEvent3);

                    // eslint-disable-next-line require-jsdoc
                    function MuteEvent(type, init) {
                        var _this3;

                        _classCallCheck(this, MuteEvent);

                        _this3 = _possibleConstructorReturn(this, _getPrototypeOf(MuteEvent).call(this, type));
                        /**
                         * @member {Owt.Base.TrackKind} kind
                         * @instance
                         * @memberof Owt.Base.MuteEvent
                         */

                        _this3.kind = init.kind;
                        return _this3;
                    }

                    return MuteEvent;
                }(OwtEvent);

            exports.MuteEvent = MuteEvent;

        }, {}],
        4: [function (require, module, exports) {
// Copyright (C) <2018> Intel Corporation
//
// SPDX-License-Identifier: Apache-2.0
            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _mediastreamFactory = require("./mediastream-factory.js");

            Object.keys(_mediastreamFactory).forEach(function (key) {
                if (key === "default" || key === "__esModule") return;
                Object.defineProperty(exports, key, {
                    enumerable: true,
                    get: function get() {
                        return _mediastreamFactory[key];
                    }
                });
            });

            var _stream = require("./stream.js");

            Object.keys(_stream).forEach(function (key) {
                if (key === "default" || key === "__esModule") return;
                Object.defineProperty(exports, key, {
                    enumerable: true,
                    get: function get() {
                        return _stream[key];
                    }
                });
            });

            var _mediaformat = require("./mediaformat.js");

            Object.keys(_mediaformat).forEach(function (key) {
                if (key === "default" || key === "__esModule") return;
                Object.defineProperty(exports, key, {
                    enumerable: true,
                    get: function get() {
                        return _mediaformat[key];
                    }
                });
            });

        }, {"./mediaformat.js": 6, "./mediastream-factory.js": 7, "./stream.js": 10}],
        5: [function (require, module, exports) {
// MIT License
//
// Copyright (c) 2012 Universidad Politécnica de Madrid
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// Copyright (C) <2018> Intel Corporation
//
// SPDX-License-Identifier: Apache-2.0
// This file is borrowed from lynckia/licode with some modifications.

            /* global console,window */
            'use strict';
            /*
 * API to write logs based on traditional logging mechanisms: debug, trace,
 * info, warning, error
 */

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.default = void 0;

            var Logger = function () {
                var DEBUG = 0;
                var TRACE = 1;
                var INFO = 2;
                var WARNING = 3;
                var ERROR = 4;
                var NONE = 5;

                var noOp = function noOp() {
                }; // |that| is the object to be returned.


                var that = {
                    DEBUG: DEBUG,
                    TRACE: TRACE,
                    INFO: INFO,
                    WARNING: WARNING,
                    ERROR: ERROR,
                    NONE: NONE
                };
                that.log = window.console.log.bind(window.console);

                var bindType = function bindType(type) {
                    if (typeof window.console[type] === 'function') {
                        return window.console[type].bind(window.console);
                    } else {
                        return window.console.log.bind(window.console);
                    }
                };

                var setLogLevel = function setLogLevel(level) {
                    if (level <= DEBUG) {
                        that.debug = bindType('log');
                    } else {
                        that.debug = noOp;
                    }

                    if (level <= TRACE) {
                        that.trace = bindType('trace');
                    } else {
                        that.trace = noOp;
                    }

                    if (level <= INFO) {
                        that.info = bindType('info');
                    } else {
                        that.info = noOp;
                    }

                    if (level <= WARNING) {
                        that.warning = bindType('warn');
                    } else {
                        that.warning = noOp;
                    }

                    if (level <= ERROR) {
                        that.error = bindType('error');
                    } else {
                        that.error = noOp;
                    }
                };

                setLogLevel(DEBUG); // Default level is debug.

                that.setLogLevel = setLogLevel;
                return that;
            }();

            var _default = Logger;
            exports.default = _default;

        }, {}],
        6: [function (require, module, exports) {
// Copyright (C) <2018> Intel Corporation
//
// SPDX-License-Identifier: Apache-2.0
            'use strict';
            /**
             * @class AudioSourceInfo
             * @classDesc Source info about an audio track. Values: 'mic', 'screen-cast', 'file', 'mixed'.
             * @memberOf Owt.Base
             * @readonly
             * @enum {string}
             */

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.Resolution = exports.TrackKind = exports.VideoSourceInfo = exports.AudioSourceInfo = void 0;

            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }

            var AudioSourceInfo = {
                MIC: 'mic',
                SCREENCAST: 'screen-cast',
                FILE: 'file',
                MIXED: 'mixed'
            };
            /**
             * @class VideoSourceInfo
             * @classDesc Source info about a video track. Values: 'camera', 'screen-cast', 'file', 'mixed'.
             * @memberOf Owt.Base
             * @readonly
             * @enum {string}
             */

            exports.AudioSourceInfo = AudioSourceInfo;
            var VideoSourceInfo = {
                CAMERA: 'camera',
                SCREENCAST: 'screen-cast',
                FILE: 'file',
                MIXED: 'mixed'
            };
            /**
             * @class TrackKind
             * @classDesc Kind of a track. Values: 'audio' for audio track, 'video' for video track, 'av' for both audio and video tracks.
             * @memberOf Owt.Base
             * @readonly
             * @enum {string}
             */

            exports.VideoSourceInfo = VideoSourceInfo;
            var TrackKind = {
                /**
                 * Audio tracks.
                 * @type string
                 */
                AUDIO: 'audio',

                /**
                 * Video tracks.
                 * @type string
                 */
                VIDEO: 'video',

                /**
                 * Both audio and video tracks.
                 * @type string
                 */
                AUDIO_AND_VIDEO: 'av'
            };
            /**
             * @class Resolution
             * @memberOf Owt.Base
             * @classDesc The Resolution defines the size of a rectangle.
             * @constructor
             * @param {number} width
             * @param {number} height
             */

            exports.TrackKind = TrackKind;

            var Resolution = // eslint-disable-next-line require-jsdoc
                function Resolution(width, height) {
                    _classCallCheck(this, Resolution);

                    /**
                     * @member {number} width
                     * @instance
                     * @memberof Owt.Base.Resolution
                     */
                    this.width = width;
                    /**
                     * @member {number} height
                     * @instance
                     * @memberof Owt.Base.Resolution
                     */

                    this.height = height;
                };

            exports.Resolution = Resolution;

        }, {}],
        7: [function (require, module, exports) {
// Copyright (C) <2018> Intel Corporation
//
// SPDX-License-Identifier: Apache-2.0

            /* global console, window, Promise, chrome, navigator */
            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.MediaStreamFactory = exports.StreamConstraints = exports.VideoTrackConstraints = exports.AudioTrackConstraints = void 0;

            var utils = _interopRequireWildcard(require("./utils.js"));

            var _logger = _interopRequireDefault(require("./logger.js"));

            var MediaFormatModule = _interopRequireWildcard(require("./mediaformat.js"));

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {default: obj};
            }

            function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) {
                    return obj;
                } else {
                    var newObj = {};
                    if (obj != null) {
                        for (var key in obj) {
                            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                                var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                                if (desc.get || desc.set) {
                                    Object.defineProperty(newObj, key, desc);
                                } else {
                                    newObj[key] = obj[key];
                                }
                            }
                        }
                    }
                    newObj.default = obj;
                    return newObj;
                }
            }

            function _defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            function _createClass(Constructor, protoProps, staticProps) {
                if (protoProps) _defineProperties(Constructor.prototype, protoProps);
                if (staticProps) _defineProperties(Constructor, staticProps);
                return Constructor;
            }

            function _typeof(obj) {
                if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                    _typeof = function _typeof(obj) {
                        return typeof obj;
                    };
                } else {
                    _typeof = function _typeof(obj) {
                        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                    };
                }
                return _typeof(obj);
            }

            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }

            /**
             * @class AudioTrackConstraints
             * @classDesc Constraints for creating an audio MediaStreamTrack.
             * @memberof Owt.Base
             * @constructor
             * @param {Owt.Base.AudioSourceInfo} source Source info of this audio track.
             */
            var AudioTrackConstraints = // eslint-disable-next-line require-jsdoc
                function AudioTrackConstraints(source) {
                    _classCallCheck(this, AudioTrackConstraints);

                    if (!Object.values(MediaFormatModule.AudioSourceInfo).some(function (v) {
                        return v === source;
                    })) {
                        throw new TypeError('Invalid source.');
                    }
                    /**
                     * @member {string} source
                     * @memberof Owt.Base.AudioTrackConstraints
                     * @desc Values could be "mic", "screen-cast", "file" or "mixed".
                     * @instance
                     */


                    this.source = source;
                    /**
                     * @member {string} deviceId
                     * @memberof Owt.Base.AudioTrackConstraints
                     * @desc Do not provide deviceId if source is not "mic".
                     * @instance
                     * @see https://w3c.github.io/mediacapture-main/#def-constraint-deviceId
                     */

                    this.deviceId = undefined;
                };
            /**
             * @class VideoTrackConstraints
             * @classDesc Constraints for creating a video MediaStreamTrack.
             * @memberof Owt.Base
             * @constructor
             * @param {Owt.Base.VideoSourceInfo} source Source info of this video track.
             */


            exports.AudioTrackConstraints = AudioTrackConstraints;

            var VideoTrackConstraints = // eslint-disable-next-line require-jsdoc
                function VideoTrackConstraints(source) {
                    _classCallCheck(this, VideoTrackConstraints);

                    if (!Object.values(MediaFormatModule.VideoSourceInfo).some(function (v) {
                        return v === source;
                    })) {
                        throw new TypeError('Invalid source.');
                    }
                    /**
                     * @member {string} source
                     * @memberof Owt.Base.VideoTrackConstraints
                     * @desc Values could be "camera", "screen-cast", "file" or "mixed".
                     * @instance
                     */


                    this.source = source;
                    /**
                     * @member {string} deviceId
                     * @memberof Owt.Base.VideoTrackConstraints
                     * @desc Do not provide deviceId if source is not "camera".
                     * @instance
                     * @see https://w3c.github.io/mediacapture-main/#def-constraint-deviceId
                     */

                    this.deviceId = undefined;
                    /**
                     * @member {Owt.Base.Resolution} resolution
                     * @memberof Owt.Base.VideoTrackConstraints
                     * @instance
                     */

                    this.resolution = undefined;
                    /**
                     * @member {number} frameRate
                     * @memberof Owt.Base.VideoTrackConstraints
                     * @instance
                     */

                    this.frameRate = undefined;
                };
            /**
             * @class StreamConstraints
             * @classDesc Constraints for creating a MediaStream from screen mic and camera.
             * @memberof Owt.Base
             * @constructor
             * @param {?Owt.Base.AudioTrackConstraints} audioConstraints
             * @param {?Owt.Base.VideoTrackConstraints} videoConstraints
             */


            exports.VideoTrackConstraints = VideoTrackConstraints;

            var StreamConstraints = // eslint-disable-next-line require-jsdoc
                function StreamConstraints() {
                    var audioConstraints = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
                    var videoConstraints = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

                    _classCallCheck(this, StreamConstraints);

                    /**
                     * @member {Owt.Base.MediaStreamTrackDeviceConstraintsForAudio} audio
                     * @memberof Owt.Base.MediaStreamDeviceConstraints
                     * @instance
                     */
                    this.audio = audioConstraints;
                    /**
                     * @member {Owt.Base.MediaStreamTrackDeviceConstraintsForVideo} Video
                     * @memberof Owt.Base.MediaStreamDeviceConstraints
                     * @instance
                     */

                    this.video = videoConstraints;
                }; // eslint-disable-next-line require-jsdoc


            exports.StreamConstraints = StreamConstraints;

            function isVideoConstrainsForScreenCast(constraints) {
                return _typeof(constraints.video) === 'object' && constraints.video.source === MediaFormatModule.VideoSourceInfo.SCREENCAST;
            }

            /**
             * @class MediaStreamFactory
             * @classDesc A factory to create MediaStream. You can also create MediaStream by yourself.
             * @memberof Owt.Base
             */


            var MediaStreamFactory =
                /*#__PURE__*/
                function () {
                    function MediaStreamFactory() {
                        _classCallCheck(this, MediaStreamFactory);
                    }

                    _createClass(MediaStreamFactory, null, [{
                        key: "createMediaStream",

                        /**
                         * @function createMediaStream
                         * @static
                         * @desc Create a MediaStream with given constraints. If you want to create a MediaStream for screen cast, please make sure both audio and video's source are "screen-cast".
                         * @memberof Owt.Base.MediaStreamFactory
                         * @returns {Promise<MediaStream, Error>} Return a promise that is resolved when stream is successfully created, or rejected if one of the following error happened:
                         * - One or more parameters cannot be satisfied.
                         * - Specified device is busy.
                         * - Cannot obtain necessary permission or operation is canceled by user.
                         * - Video source is screen cast, while audio source is not.
                         * - Audio source is screen cast, while video source is disabled.
                         * @param {Owt.Base.StreamConstraints} constraints
                         */
                        value: function createMediaStream(constraints) {
                            if (_typeof(constraints) !== 'object' || !constraints.audio && !constraints.video) {
                                return Promise.reject(new TypeError('Invalid constrains'));
                            }

                            if (!isVideoConstrainsForScreenCast(constraints) && _typeof(constraints.audio) === 'object' && constraints.audio.source === MediaFormatModule.AudioSourceInfo.SCREENCAST) {
                                return Promise.reject(new TypeError('Cannot share screen without video.'));
                            }

                            if (isVideoConstrainsForScreenCast(constraints) && _typeof(constraints.audio) === 'object' && constraints.audio.source !== MediaFormatModule.AudioSourceInfo.SCREENCAST) {
                                return Promise.reject(new TypeError('Cannot capture video from screen cast while capture audio from' + ' other source.'));
                            } // Check and convert constraints.


                            if (!constraints.audio && !constraints.video) {
                                return Promise.reject(new TypeError('At least one of audio and video must be requested.'));
                            }

                            var mediaConstraints = Object.create({});

                            if (_typeof(constraints.audio) === 'object' && constraints.audio.source === MediaFormatModule.AudioSourceInfo.MIC) {
                                mediaConstraints.audio = Object.create({});

                                if (utils.isEdge()) {
                                    mediaConstraints.audio.deviceId = constraints.audio.deviceId;
                                } else {
                                    mediaConstraints.audio.deviceId = {
                                        exact: constraints.audio.deviceId
                                    };
                                }
                            } else {
                                if (constraints.audio.source === MediaFormatModule.AudioSourceInfo.SCREENCAST) {
                                    mediaConstraints.audio = true;
                                } else {
                                    mediaConstraints.audio = constraints.audio;
                                }
                            }

                            if (_typeof(constraints.video) === 'object') {
                                mediaConstraints.video = Object.create({});

                                if (typeof constraints.video.frameRate === 'number') {
                                 //   mediaConstraints.video.frameRate = constraints.video.frameRate;
                                }

                                if (constraints.video.resolution && constraints.video.resolution.width && constraints.video.resolution.height) {
                                    if (constraints.video.source === MediaFormatModule.VideoSourceInfo.SCREENCAST) {
                                        mediaConstraints.video.width = constraints.video.resolution.width;
                                        mediaConstraints.video.height = constraints.video.resolution.height;
                                    } else {
                                        mediaConstraints.video.width = Object.create({});
                                        mediaConstraints.video.width.exact = constraints.video.resolution.width;
                                        mediaConstraints.video.height = Object.create({});
                                        mediaConstraints.video.height.exact = constraints.video.resolution.height;
                                    }
                                }

                                if (typeof constraints.video.deviceId === 'string') {
                                    mediaConstraints.video.deviceId = {
                                        exact: constraints.video.deviceId
                                    };
                                }

                                if (utils.isFirefox() && constraints.video.source === MediaFormatModule.VideoSourceInfo.SCREENCAST) {
                                    mediaConstraints.video.mediaSource = 'screen';
                                }
                            } else {
                                mediaConstraints.video = constraints.video;
                            }

                            if (isVideoConstrainsForScreenCast(constraints)) {
                                return navigator.mediaDevices.getDisplayMedia(mediaConstraints);
                            } else {
                                console.log("创建的实际分辨率:" + JSON.stringify(mediaConstraints))
                                return navigator.mediaDevices.getUserMedia(mediaConstraints);
                            }
                        }
                    }]);

                    return MediaStreamFactory;
                }();

            exports.MediaStreamFactory = MediaStreamFactory;

        }, {"./logger.js": 5, "./mediaformat.js": 6, "./utils.js": 11}],
        8: [function (require, module, exports) {
// Copyright (C) <2018> Intel Corporation
//
// SPDX-License-Identifier: Apache-2.0
            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.PublishOptions = exports.Publication = exports.PublicationSettings = exports.VideoPublicationSettings = exports.AudioPublicationSettings = void 0;

            var Utils = _interopRequireWildcard(require("./utils.js"));

            var MediaFormat = _interopRequireWildcard(require("./mediaformat.js"));

            var _event = require("../base/event.js");

            function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) {
                    return obj;
                } else {
                    var newObj = {};
                    if (obj != null) {
                        for (var key in obj) {
                            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                                var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                                if (desc.get || desc.set) {
                                    Object.defineProperty(newObj, key, desc);
                                } else {
                                    newObj[key] = obj[key];
                                }
                            }
                        }
                    }
                    newObj.default = obj;
                    return newObj;
                }
            }

            function _typeof(obj) {
                if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                    _typeof = function _typeof(obj) {
                        return typeof obj;
                    };
                } else {
                    _typeof = function _typeof(obj) {
                        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                    };
                }
                return _typeof(obj);
            }

            function _possibleConstructorReturn(self, call) {
                if (call && (_typeof(call) === "object" || typeof call === "function")) {
                    return call;
                }
                return _assertThisInitialized(self);
            }

            function _getPrototypeOf(o) {
                _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
                    return o.__proto__ || Object.getPrototypeOf(o);
                };
                return _getPrototypeOf(o);
            }

            function _inherits(subClass, superClass) {
                if (typeof superClass !== "function" && superClass !== null) {
                    throw new TypeError("Super expression must either be null or a function");
                }
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        writable: true,
                        configurable: true
                    }
                });
                if (superClass) _setPrototypeOf(subClass, superClass);
            }

            function _setPrototypeOf(o, p) {
                _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
                    o.__proto__ = p;
                    return o;
                };
                return _setPrototypeOf(o, p);
            }

            function _assertThisInitialized(self) {
                if (self === void 0) {
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                }
                return self;
            }

            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }

            /**
             * @class AudioPublicationSettings
             * @memberOf Owt.Base
             * @classDesc The audio settings of a publication.
             * @hideconstructor
             */
            var AudioPublicationSettings = // eslint-disable-next-line require-jsdoc
                function AudioPublicationSettings(codec) {
                    _classCallCheck(this, AudioPublicationSettings);

                    /**
                     * @member {?Owt.Base.AudioCodecParameters} codec
                     * @instance
                     * @memberof Owt.Base.AudioPublicationSettings
                     */
                    this.codec = codec;
                };
            /**
             * @class VideoPublicationSettings
             * @memberOf Owt.Base
             * @classDesc The video settings of a publication.
             * @hideconstructor
             */


            exports.AudioPublicationSettings = AudioPublicationSettings;

            var VideoPublicationSettings = // eslint-disable-next-line require-jsdoc
                function VideoPublicationSettings(codec, resolution, frameRate, bitrate, keyFrameInterval, rid) {
                    _classCallCheck(this, VideoPublicationSettings);

                    /**
                     * @member {?Owt.Base.VideoCodecParameters} codec
                     * @instance
                     * @memberof Owt.Base.VideoPublicationSettings
                     */
                    this.codec = codec,
                        /**
                         * @member {?Owt.Base.Resolution} resolution
                         * @instance
                         * @memberof Owt.Base.VideoPublicationSettings
                         */
                        this.resolution = resolution;
                    /**
                     * @member {?number} frameRates
                     * @instance
                     * @classDesc Frames per second.
                     * @memberof Owt.Base.VideoPublicationSettings
                     */

                    this.frameRate = frameRate;
                    /**
                     * @member {?number} bitrate
                     * @instance
                     * @memberof Owt.Base.VideoPublicationSettings
                     */

                    this.bitrate = bitrate;
                    /**
                     * @member {?number} keyFrameIntervals
                     * @instance
                     * @classDesc The time interval between key frames. Unit: second.
                     * @memberof Owt.Base.VideoPublicationSettings
                     */

                    this.keyFrameInterval = keyFrameInterval;
                    /**
                     * @member {?number} rid
                     * @instance
                     * @classDesc Restriction identifier to identify the RTP Streams within an RTP session.
                     * @memberof Owt.Base.VideoPublicationSettings
                     */

                    this.rid = rid;
                };
            /**
             * @class PublicationSettings
             * @memberOf Owt.Base
             * @classDesc The settings of a publication.
             * @hideconstructor
             */


            exports.VideoPublicationSettings = VideoPublicationSettings;

            var PublicationSettings = // eslint-disable-next-line require-jsdoc
                function PublicationSettings(audio, video) {
                    _classCallCheck(this, PublicationSettings);

                    /**
                     * @member {Owt.Base.AudioPublicationSettings[]} audio
                     * @instance
                     * @memberof Owt.Base.PublicationSettings
                     */
                    this.audio = audio;
                    /**
                     * @member {Owt.Base.VideoPublicationSettings[]} video
                     * @instance
                     * @memberof Owt.Base.PublicationSettings
                     */

                    this.video = video;
                };
            /**
             * @class Publication
             * @extends Owt.Base.EventDispatcher
             * @memberOf Owt.Base
             * @classDesc Publication represents a sender for publishing a stream. It
             * handles the actions on a LocalStream published to a conference.
             *
             * Events:
             *
             * | Event Name      | Argument Type    | Fired when       |
             * | ----------------| ---------------- | ---------------- |
             * | ended           | Event            | Publication is ended. |
             * | error           | ErrorEvent       | An error occurred on the publication. |
             * | mute            | MuteEvent        | Publication is muted. Client stopped sending audio and/or video data to remote endpoint. |
             * | unmute          | MuteEvent        | Publication is unmuted. Client continued sending audio and/or video data to remote endpoint. |
             *
             * `ended` event may not be fired on Safari after calling `Publication.stop()`.
             *
             * @hideconstructor
             */


            exports.PublicationSettings = PublicationSettings;

            var Publication =
                /*#__PURE__*/
                function (_EventDispatcher) {
                    _inherits(Publication, _EventDispatcher);

                    // eslint-disable-next-line require-jsdoc
                    function Publication(id, stop, getStats, mute, unmute) {
                        var _this;

                        _classCallCheck(this, Publication);

                        _this = _possibleConstructorReturn(this, _getPrototypeOf(Publication).call(this));
                        /**
                         * @member {string} id
                         * @instance
                         * @memberof Owt.Base.Publication
                         */

                        Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), 'id', {
                            configurable: false,
                            writable: false,
                            value: id ? id : Utils.createUuid()
                        });
                        /**
                         * @function stop
                         * @instance
                         * @desc Stop certain publication. Once a subscription is stopped, it cannot be recovered.
                         * @memberof Owt.Base.Publication
                         * @returns {undefined}
                         */

                        _this.stop = stop;
                        /**
                         * @function getStats
                         * @instance
                         * @desc Get stats of underlying PeerConnection.
                         * @memberof Owt.Base.Publication
                         * @returns {Promise<RTCStatsReport, Error>}
                         */

                        _this.getStats = getStats;
                        /**
                         * @function mute
                         * @instance
                         * @desc Stop sending data to remote endpoint.
                         * @memberof Owt.Base.Publication
                         * @param {Owt.Base.TrackKind } kind Kind of tracks to be muted.
                         * @returns {Promise<undefined, Error>}
                         */

                        _this.mute = mute;
                        /**
                         * @function unmute
                         * @instance
                         * @desc Continue sending data to remote endpoint.
                         * @memberof Owt.Base.Publication
                         * @param {Owt.Base.TrackKind } kind Kind of tracks to be unmuted.
                         * @returns {Promise<undefined, Error>}
                         */

                        _this.unmute = unmute;
                        return _this;
                    }

                    return Publication;
                }(_event.EventDispatcher);
            /**
             * @class PublishOptions
             * @memberOf Owt.Base
             * @classDesc PublishOptions defines options for publishing a Owt.Base.LocalStream.
             */


            exports.Publication = Publication;

            var PublishOptions = // eslint-disable-next-line require-jsdoc
                function PublishOptions(audio, video) {
                    _classCallCheck(this, PublishOptions);

                    /**
                     * @member {?Array<Owt.Base.AudioEncodingParameters> | ?Array<RTCRtpEncodingParameters>} audio
                     * @instance
                     * @memberof Owt.Base.PublishOptions
                     * @desc Parameters for audio RtpSender. Publishing with RTCRtpEncodingParameters is an experimental feature. It is subject to change.
                     */
                    this.audio = audio;
                    /**
                     * @member {?Array<Owt.Base.VideoEncodingParameters> | ?Array<RTCRtpEncodingParameters>} video
                     * @instance
                     * @memberof Owt.Base.PublishOptions
                     * @desc Parameters for video RtpSender. Publishing with RTCRtpEncodingParameters is an experimental feature. It is subject to change.
                     */

                    this.video = video;
                };

            exports.PublishOptions = PublishOptions;

        }, {"../base/event.js": 3, "./mediaformat.js": 6, "./utils.js": 11}],
        9: [function (require, module, exports) {
            "use strict";

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.reorderCodecs = reorderCodecs;
            exports.addLegacySimulcast = addLegacySimulcast;
            exports.setMaxBitrate = setMaxBitrate;

            var _logger = _interopRequireDefault(require("./logger.js"));

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {default: obj};
            }

            /*
 *  Copyright (c) 2014 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

            /* More information about these options at jshint.com/docs/options */

            /* eslint-disable */

            /* globals  adapter, trace */

            /* exported setCodecParam, iceCandidateType, formatTypePreference,
   maybeSetOpusOptions, maybePreferAudioReceiveCodec,
   maybePreferAudioSendCodec, maybeSetAudioReceiveBitRate,
   maybeSetAudioSendBitRate, maybePreferVideoReceiveCodec,
   maybePreferVideoSendCodec, maybeSetVideoReceiveBitRate,
   maybeSetVideoSendBitRate, maybeSetVideoSendInitialBitRate,
   maybeRemoveVideoFec, mergeConstraints, removeCodecParam*/

            /* This file is borrowed from apprtc with some modifications. */

            /* Commit hash: c6af0c25e9af527f71b3acdd6bfa1389d778f7bd + PR 530 */
            'use strict';

            function mergeConstraints(cons1, cons2) {
                if (!cons1 || !cons2) {
                    return cons1 || cons2;
                }

                var merged = cons1;

                for (var key in cons2) {
                    merged[key] = cons2[key];
                }

                return merged;
            }

            function iceCandidateType(candidateStr) {
                return candidateStr.split(' ')[7];
            } // Turns the local type preference into a human-readable string.
// Note that this mapping is browser-specific.


            function formatTypePreference(pref) {
                if (adapter.browserDetails.browser === 'chrome') {
                    switch (pref) {
                        case 0:
                            return 'TURN/TLS';

                        case 1:
                            return 'TURN/TCP';

                        case 2:
                            return 'TURN/UDP';

                        default:
                            break;
                    }
                } else if (adapter.browserDetails.browser === 'firefox') {
                    switch (pref) {
                        case 0:
                            return 'TURN/TCP';

                        case 5:
                            return 'TURN/UDP';

                        default:
                            break;
                    }
                }

                return '';
            }

            function maybeSetOpusOptions(sdp, params) {
                // Set Opus in Stereo, if stereo is true, unset it, if stereo is false, and
                // do nothing if otherwise.
                if (params.opusStereo === 'true') {
                    sdp = setCodecParam(sdp, 'opus/48000', 'stereo', '1');
                } else if (params.opusStereo === 'false') {
                    sdp = removeCodecParam(sdp, 'opus/48000', 'stereo');
                } // Set Opus FEC, if opusfec is true, unset it, if opusfec is false, and
                // do nothing if otherwise.


                if (params.opusFec === 'true') {
                    sdp = setCodecParam(sdp, 'opus/48000', 'useinbandfec', '1');
                } else if (params.opusFec === 'false') {
                    sdp = removeCodecParam(sdp, 'opus/48000', 'useinbandfec');
                } // Set Opus DTX, if opusdtx is true, unset it, if opusdtx is false, and
                // do nothing if otherwise.


                if (params.opusDtx === 'true') {
                    sdp = setCodecParam(sdp, 'opus/48000', 'usedtx', '1');
                } else if (params.opusDtx === 'false') {
                    sdp = removeCodecParam(sdp, 'opus/48000', 'usedtx');
                } // Set Opus maxplaybackrate, if requested.


                if (params.opusMaxPbr) {
                    sdp = setCodecParam(sdp, 'opus/48000', 'maxplaybackrate', params.opusMaxPbr);
                }

                return sdp;
            }

            function maybeSetAudioSendBitRate(sdp, params) {
                if (!params.audioSendBitrate) {
                    return sdp;
                }

                _logger.default.debug('Prefer audio send bitrate: ' + params.audioSendBitrate);

                return preferBitRate(sdp, params.audioSendBitrate, 'audio');
            }

            function maybeSetAudioReceiveBitRate(sdp, params) {
                if (!params.audioRecvBitrate) {
                    return sdp;
                }

                _logger.default.debug('Prefer audio receive bitrate: ' + params.audioRecvBitrate);

                return preferBitRate(sdp, params.audioRecvBitrate, 'audio');
            }

            function maybeSetVideoSendBitRate(sdp, params) {
                if (!params.videoSendBitrate) {
                    return sdp;
                }

                _logger.default.debug('Prefer video send bitrate: ' + params.videoSendBitrate);

                return preferBitRate(sdp, params.videoSendBitrate, 'video');
            }

            function maybeSetVideoReceiveBitRate(sdp, params) {
                if (!params.videoRecvBitrate) {
                    return sdp;
                }

                _logger.default.debug('Prefer video receive bitrate: ' + params.videoRecvBitrate);

                return preferBitRate(sdp, params.videoRecvBitrate, 'video');
            } // Add a b=AS:bitrate line to the m=mediaType section.


            function preferBitRate(sdp, bitrate, mediaType) {
                var sdpLines = sdp.split('\r\n'); // Find m line for the given mediaType.

                var mLineIndex = findLine(sdpLines, 'm=', mediaType);

                if (mLineIndex === null) {
                    _logger.default.debug('Failed to add bandwidth line to sdp, as no m-line found');

                    return sdp;
                } // Find next m-line if any.


                var nextMLineIndex = findLineInRange(sdpLines, mLineIndex + 1, -1, 'm=');

                if (nextMLineIndex === null) {
                    nextMLineIndex = sdpLines.length;
                } // Find c-line corresponding to the m-line.


                var cLineIndex = findLineInRange(sdpLines, mLineIndex + 1, nextMLineIndex, 'c=');

                if (cLineIndex === null) {
                    _logger.default.debug('Failed to add bandwidth line to sdp, as no c-line found');

                    return sdp;
                } // Check if bandwidth line already exists between c-line and next m-line.


                var bLineIndex = findLineInRange(sdpLines, cLineIndex + 1, nextMLineIndex, 'b=AS');

                if (bLineIndex) {
                    sdpLines.splice(bLineIndex, 1);
                } // Create the b (bandwidth) sdp line.


                var bwLine = 'b=AS:' + bitrate; // As per RFC 4566, the b line should follow after c-line.

                sdpLines.splice(cLineIndex + 1, 0, bwLine);
                sdp = sdpLines.join('\r\n');
                return sdp;
            } // Add an a=fmtp: x-google-min-bitrate=kbps line, if videoSendInitialBitrate
// is specified. We'll also add a x-google-min-bitrate value, since the max
// must be >= the min.


            function maybeSetVideoSendInitialBitRate(sdp, params) {
                var initialBitrate = parseInt(params.videoSendInitialBitrate);

                if (!initialBitrate) {
                    return sdp;
                } // Validate the initial bitrate value.


                var maxBitrate = parseInt(initialBitrate);
                var bitrate = parseInt(params.videoSendBitrate);

                if (bitrate) {
                    if (initialBitrate > bitrate) {
                        _logger.default.debug('Clamping initial bitrate to max bitrate of ' + bitrate + ' kbps.');

                        initialBitrate = bitrate;
                        params.videoSendInitialBitrate = initialBitrate;
                    }

                    maxBitrate = bitrate;
                }

                var sdpLines = sdp.split('\r\n'); // Search for m line.

                var mLineIndex = findLine(sdpLines, 'm=', 'video');

                if (mLineIndex === null) {
                    _logger.default.debug('Failed to find video m-line');

                    return sdp;
                } // Figure out the first codec payload type on the m=video SDP line.


                var videoMLine = sdpLines[mLineIndex];
                var pattern = new RegExp('m=video\\s\\d+\\s[A-Z/]+\\s');
                var sendPayloadType = videoMLine.split(pattern)[1].split(' ')[0];
                var fmtpLine = sdpLines[findLine(sdpLines, 'a=rtpmap', sendPayloadType)];
                var codecName = fmtpLine.split('a=rtpmap:' + sendPayloadType)[1].split('/')[0]; // Use codec from params if specified via URL param, otherwise use from SDP.

                var codec = params.videoSendCodec || codecName;
                sdp = setCodecParam(sdp, codec, 'x-google-min-bitrate', params.videoSendInitialBitrate.toString());
                sdp = setCodecParam(sdp, codec, 'x-google-max-bitrate', maxBitrate.toString());
                return sdp;
            }

            function removePayloadTypeFromMline(mLine, payloadType) {
                mLine = mLine.split(' ');

                for (var i = 0; i < mLine.length; ++i) {
                    if (mLine[i] === payloadType.toString()) {
                        mLine.splice(i, 1);
                    }
                }

                return mLine.join(' ');
            }

            function removeCodecByName(sdpLines, codec) {
                var index = findLine(sdpLines, 'a=rtpmap', codec);

                if (index === null) {
                    return sdpLines;
                }

                var payloadType = getCodecPayloadTypeFromLine(sdpLines[index]);
                sdpLines.splice(index, 1); // Search for the video m= line and remove the codec.

                var mLineIndex = findLine(sdpLines, 'm=', 'video');

                if (mLineIndex === null) {
                    return sdpLines;
                }

                sdpLines[mLineIndex] = removePayloadTypeFromMline(sdpLines[mLineIndex], payloadType);
                return sdpLines;
            }

            function removeCodecByPayloadType(sdpLines, payloadType) {
                var index = findLine(sdpLines, 'a=rtpmap', payloadType.toString());

                if (index === null) {
                    return sdpLines;
                }

                sdpLines.splice(index, 1); // Search for the video m= line and remove the codec.

                var mLineIndex = findLine(sdpLines, 'm=', 'video');

                if (mLineIndex === null) {
                    return sdpLines;
                }

                sdpLines[mLineIndex] = removePayloadTypeFromMline(sdpLines[mLineIndex], payloadType);
                return sdpLines;
            }

            function maybeRemoveVideoFec(sdp, params) {
                if (params.videoFec !== 'false') {
                    return sdp;
                }

                var sdpLines = sdp.split('\r\n');
                var index = findLine(sdpLines, 'a=rtpmap', 'red');

                if (index === null) {
                    return sdp;
                }

                var redPayloadType = getCodecPayloadTypeFromLine(sdpLines[index]);
                sdpLines = removeCodecByPayloadType(sdpLines, redPayloadType);
                sdpLines = removeCodecByName(sdpLines, 'ulpfec'); // Remove fmtp lines associated with red codec.

                index = findLine(sdpLines, 'a=fmtp', redPayloadType.toString());

                if (index === null) {
                    return sdp;
                }

                var fmtpLine = parseFmtpLine(sdpLines[index]);
                var rtxPayloadType = fmtpLine.pt;

                if (rtxPayloadType === null) {
                    return sdp;
                }

                sdpLines.splice(index, 1);
                sdpLines = removeCodecByPayloadType(sdpLines, rtxPayloadType);
                return sdpLines.join('\r\n');
            } // Promotes |audioSendCodec| to be the first in the m=audio line, if set.


            function maybePreferAudioSendCodec(sdp, params) {
                return maybePreferCodec(sdp, 'audio', 'send', params.audioSendCodec);
            } // Promotes |audioRecvCodec| to be the first in the m=audio line, if set.


            function maybePreferAudioReceiveCodec(sdp, params) {
                return maybePreferCodec(sdp, 'audio', 'receive', params.audioRecvCodec);
            } // Promotes |videoSendCodec| to be the first in the m=audio line, if set.


            function maybePreferVideoSendCodec(sdp, params) {
                return maybePreferCodec(sdp, 'video', 'send', params.videoSendCodec);
            } // Promotes |videoRecvCodec| to be the first in the m=audio line, if set.


            function maybePreferVideoReceiveCodec(sdp, params) {
                return maybePreferCodec(sdp, 'video', 'receive', params.videoRecvCodec);
            } // Sets |codec| as the default |type| codec if it's present.
// The format of |codec| is 'NAME/RATE', e.g. 'opus/48000'.


            function maybePreferCodec(sdp, type, dir, codec) {
                var str = type + ' ' + dir + ' codec';

                if (!codec) {
                    _logger.default.debug('No preference on ' + str + '.');

                    return sdp;
                }

                _logger.default.debug('Prefer ' + str + ': ' + codec);

                var sdpLines = sdp.split('\r\n'); // Search for m line.

                var mLineIndex = findLine(sdpLines, 'm=', type);

                if (mLineIndex === null) {
                    return sdp;
                } // If the codec is available, set it as the default in m line.


                var payload = null;

                for (var i = 0; i < sdpLines.length; i++) {
                    var index = findLineInRange(sdpLines, i, -1, 'a=rtpmap', codec);

                    if (index !== null) {
                        payload = getCodecPayloadTypeFromLine(sdpLines[index]);

                        if (payload) {
                            sdpLines[mLineIndex] = setDefaultCodec(sdpLines[mLineIndex], payload);
                        }
                    }
                }

                sdp = sdpLines.join('\r\n');
                return sdp;
            } // Set fmtp param to specific codec in SDP. If param does not exists, add it.


            function setCodecParam(sdp, codec, param, value) {
                var sdpLines = sdp.split('\r\n'); // SDPs sent from MCU use \n as line break.

                if (sdpLines.length <= 1) {
                    sdpLines = sdp.split('\n');
                }

                var fmtpLineIndex = findFmtpLine(sdpLines, codec);
                var fmtpObj = {};

                if (fmtpLineIndex === null) {
                    var index = findLine(sdpLines, 'a=rtpmap', codec);

                    if (index === null) {
                        return sdp;
                    }

                    var payload = getCodecPayloadTypeFromLine(sdpLines[index]);
                    fmtpObj.pt = payload.toString();
                    fmtpObj.params = {};
                    fmtpObj.params[param] = value;
                    sdpLines.splice(index + 1, 0, writeFmtpLine(fmtpObj));
                } else {
                    fmtpObj = parseFmtpLine(sdpLines[fmtpLineIndex]);
                    fmtpObj.params[param] = value;
                    sdpLines[fmtpLineIndex] = writeFmtpLine(fmtpObj);
                }

                sdp = sdpLines.join('\r\n');
                return sdp;
            } // Remove fmtp param if it exists.


            function removeCodecParam(sdp, codec, param) {
                var sdpLines = sdp.split('\r\n');
                var fmtpLineIndex = findFmtpLine(sdpLines, codec);

                if (fmtpLineIndex === null) {
                    return sdp;
                }

                var map = parseFmtpLine(sdpLines[fmtpLineIndex]);
                delete map.params[param];
                var newLine = writeFmtpLine(map);

                if (newLine === null) {
                    sdpLines.splice(fmtpLineIndex, 1);
                } else {
                    sdpLines[fmtpLineIndex] = newLine;
                }

                sdp = sdpLines.join('\r\n');
                return sdp;
            } // Split an fmtp line into an object including 'pt' and 'params'.


            function parseFmtpLine(fmtpLine) {
                var fmtpObj = {};
                var spacePos = fmtpLine.indexOf(' ');
                var keyValues = fmtpLine.substring(spacePos + 1).split(';');
                var pattern = new RegExp('a=fmtp:(\\d+)');
                var result = fmtpLine.match(pattern);

                if (result && result.length === 2) {
                    fmtpObj.pt = result[1];
                } else {
                    return null;
                }

                var params = {};

                for (var i = 0; i < keyValues.length; ++i) {
                    var pair = keyValues[i].split('=');

                    if (pair.length === 2) {
                        params[pair[0]] = pair[1];
                    }
                }

                fmtpObj.params = params;
                return fmtpObj;
            } // Generate an fmtp line from an object including 'pt' and 'params'.


            function writeFmtpLine(fmtpObj) {
                if (!fmtpObj.hasOwnProperty('pt') || !fmtpObj.hasOwnProperty('params')) {
                    return null;
                }

                var pt = fmtpObj.pt;
                var params = fmtpObj.params;
                var keyValues = [];
                var i = 0;

                for (var key in params) {
                    keyValues[i] = key + '=' + params[key];
                    ++i;
                }

                if (i === 0) {
                    return null;
                }

                return 'a=fmtp:' + pt.toString() + ' ' + keyValues.join(';');
            } // Find fmtp attribute for |codec| in |sdpLines|.


            function findFmtpLine(sdpLines, codec) {
                // Find payload of codec.
                var payload = getCodecPayloadType(sdpLines, codec); // Find the payload in fmtp line.

                return payload ? findLine(sdpLines, 'a=fmtp:' + payload.toString()) : null;
            } // Find the line in sdpLines that starts with |prefix|, and, if specified,
// contains |substr| (case-insensitive search).


            function findLine(sdpLines, prefix, substr) {
                return findLineInRange(sdpLines, 0, -1, prefix, substr);
            } // Find the line in sdpLines[startLine...endLine - 1] that starts with |prefix|
// and, if specified, contains |substr| (case-insensitive search).


            function findLineInRange(sdpLines, startLine, endLine, prefix, substr) {
                var realEndLine = endLine !== -1 ? endLine : sdpLines.length;

                for (var i = startLine; i < realEndLine; ++i) {
                    if (sdpLines[i].indexOf(prefix) === 0) {
                        if (!substr || sdpLines[i].toLowerCase().indexOf(substr.toLowerCase()) !== -1) {
                            return i;
                        }
                    }
                }

                return null;
            } // Gets the codec payload type from sdp lines.


            function getCodecPayloadType(sdpLines, codec) {
                var index = findLine(sdpLines, 'a=rtpmap', codec);
                return index ? getCodecPayloadTypeFromLine(sdpLines[index]) : null;
            } // Gets the codec payload type from an a=rtpmap:X line.


            function getCodecPayloadTypeFromLine(sdpLine) {
                var pattern = new RegExp('a=rtpmap:(\\d+) [a-zA-Z0-9-]+\\/\\d+');
                var result = sdpLine.match(pattern);
                return result && result.length === 2 ? result[1] : null;
            } // Returns a new m= line with the specified codec as the first one.


            function setDefaultCodec(mLine, payload) {
                var elements = mLine.split(' '); // Just copy the first three parameters; codec order starts on fourth.

                var newLine = elements.slice(0, 3); // Put target payload first and copy in the rest.

                newLine.push(payload);

                for (var i = 3; i < elements.length; i++) {
                    if (elements[i] !== payload) {
                        newLine.push(elements[i]);
                    }
                }

                return newLine.join(' ');
            }

            /* Below are newly added functions */
// Following codecs will not be removed from SDP event they are not in the
// user-specified codec list.


            var audioCodecWhiteList = ['CN', 'telephone-event'];
            var videoCodecWhiteList = ['red', 'ulpfec']; // Returns a new m= line with the specified codec order.

            function setCodecOrder(mLine, payloads) {
                var elements = mLine.split(' '); // Just copy the first three parameters; codec order starts on fourth.

                var newLine = elements.slice(0, 3); // Concat payload types.

                newLine = newLine.concat(payloads);
                return newLine.join(' ');
            } // Append RTX payloads for existing payloads.


            function appendRtxPayloads(sdpLines, payloads) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = payloads[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var payload = _step.value;
                        var index = findLine(sdpLines, 'a=fmtp', 'apt=' + payload);

                        if (index !== null) {
                            var fmtpLine = parseFmtpLine(sdpLines[index]);
                            payloads.push(fmtpLine.pt);
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                return payloads;
            } // Remove a codec with all its associated a lines.


            function removeCodecFramALine(sdpLines, payload) {
                var pattern = new RegExp('a=(rtpmap|rtcp-fb|fmtp):' + payload + '\\s');

                for (var i = sdpLines.length - 1; i > 0; i--) {
                    if (sdpLines[i].match(pattern)) {
                        sdpLines.splice(i, 1);
                    }
                }

                return sdpLines;
            } // Reorder codecs in m-line according the order of |codecs|. Remove codecs from
// m-line if it is not present in |codecs|
// The format of |codec| is 'NAME/RATE', e.g. 'opus/48000'.


            function reorderCodecs(sdp, type, codecs) {
                if (!codecs || codecs.length === 0) {
                    return sdp;
                }

                codecs = type === 'audio' ? codecs.concat(audioCodecWhiteList) : codecs.concat(videoCodecWhiteList);
                var sdpLines = sdp.split('\r\n'); // Search for m line.

                var mLineIndex = findLine(sdpLines, 'm=', type);

                if (mLineIndex === null) {
                    return sdp;
                }

                var originPayloads = sdpLines[mLineIndex].split(' ');
                originPayloads.splice(0, 3); // If the codec is available, set it as the default in m line.

                var payloads = [];
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = codecs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var codec = _step2.value;

                        for (var i = 0; i < sdpLines.length; i++) {
                            var index = findLineInRange(sdpLines, i, -1, 'a=rtpmap', codec);

                            if (index !== null) {
                                var payload = getCodecPayloadTypeFromLine(sdpLines[index]);

                                if (payload) {
                                    payloads.push(payload);
                                    i = index;
                                }
                            }
                        }
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                payloads = appendRtxPayloads(sdpLines, payloads);
                sdpLines[mLineIndex] = setCodecOrder(sdpLines[mLineIndex], payloads); // Remove a lines.

                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = originPayloads[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var _payload = _step3.value;

                        if (payloads.indexOf(_payload) === -1) {
                            sdpLines = removeCodecFramALine(sdpLines, _payload);
                        }
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }

                sdp = sdpLines.join('\r\n');
                return sdp;
            } // Add legacy simulcast.


            function addLegacySimulcast(sdp, type, numStreams) {
                var _sdpLines, _sdpLines2;

                if (!numStreams || !(numStreams > 1)) {
                    return sdp;
                }

                var sdpLines = sdp.split('\r\n'); // Search for m line.

                var mLineStart = findLine(sdpLines, 'm=', type);

                if (mLineStart === null) {
                    return sdp;
                }

                var mLineEnd = findLineInRange(sdpLines, mLineStart + 1, -1, 'm=');

                if (mLineEnd === null) {
                    mLineEnd = sdpLines.length;
                }

                var ssrcGetter = function ssrcGetter(line) {
                    var parts = line.split(' ');
                    var ssrc = parts[0].split(':')[1];
                    return ssrc;
                }; // Process ssrc lines from mLineIndex.


                var removes = new Set();
                var ssrcs = new Set();
                var gssrcs = new Set();
                var simLines = [];
                var simGroupLines = [];
                var i = mLineStart + 1;

                while (i < mLineEnd) {
                    var line = sdpLines[i];

                    if (line === '') {
                        break;
                    }

                    if (line.indexOf('a=ssrc:') > -1) {
                        var ssrc = ssrcGetter(sdpLines[i]);
                        ssrcs.add(ssrc);

                        if (line.indexOf('cname') > -1 || line.indexOf('msid') > -1) {
                            for (var j = 1; j < numStreams; j++) {
                                var nssrc = parseInt(ssrc) + j + '';
                                simLines.push(line.replace(ssrc, nssrc));
                            }
                        } else {
                            removes.add(line);
                        }
                    }

                    if (line.indexOf('a=ssrc-group:FID') > -1) {
                        var parts = line.split(' ');
                        gssrcs.add(parts[2]);

                        for (var _j = 1; _j < numStreams; _j++) {
                            var nssrc1 = parseInt(parts[1]) + _j + '';
                            var nssrc2 = parseInt(parts[2]) + _j + '';
                            simGroupLines.push(line.replace(parts[1], nssrc1).replace(parts[2], nssrc2));
                        }
                    }

                    i++;
                }

                var insertPos = i;
                ssrcs.forEach(function (ssrc) {
                    if (!gssrcs.has(ssrc)) {
                        var groupLine = 'a=ssrc-group:SIM';
                        groupLine = groupLine + ' ' + ssrc;

                        for (var _j2 = 1; _j2 < numStreams; _j2++) {
                            groupLine = groupLine + ' ' + (parseInt(ssrc) + _j2);
                        }

                        simGroupLines.push(groupLine);
                    }
                });
                simLines.sort(); // Insert simulcast ssrc lines.

                (_sdpLines = sdpLines).splice.apply(_sdpLines, [insertPos, 0].concat(simGroupLines));

                (_sdpLines2 = sdpLines).splice.apply(_sdpLines2, [insertPos, 0].concat(simLines));

                sdpLines = sdpLines.filter(function (line) {
                    return !removes.has(line);
                });
                sdp = sdpLines.join('\r\n');
                return sdp;
            }

            function setMaxBitrate(sdp, encodingParametersList) {
                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                    for (var _iterator4 = encodingParametersList[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var encodingParameters = _step4.value;

                        if (encodingParameters.maxBitrate) {
                            sdp = setCodecParam(sdp, encodingParameters.codec.name, 'x-google-max-bitrate', encodingParameters.maxBitrate.toString());
                        }
                    }
                } catch (err) {
                    _didIteratorError4 = true;
                    _iteratorError4 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
                            _iterator4.return();
                        }
                    } finally {
                        if (_didIteratorError4) {
                            throw _iteratorError4;
                        }
                    }
                }

                return sdp;
            }

        }, {"./logger.js": 5}],
        10: [function (require, module, exports) {
// Copyright (C) <2018> Intel Corporation
//
// SPDX-License-Identifier: Apache-2.0
            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.StreamEvent = exports.RemoteStream = exports.LocalStream = exports.Stream = exports.StreamSourceInfo = void 0;

            var _logger = _interopRequireDefault(require("./logger.js"));

            var _event = require("./event.js");

            var Utils = _interopRequireWildcard(require("./utils.js"));

            function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) {
                    return obj;
                } else {
                    var newObj = {};
                    if (obj != null) {
                        for (var key in obj) {
                            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                                var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                                if (desc.get || desc.set) {
                                    Object.defineProperty(newObj, key, desc);
                                } else {
                                    newObj[key] = obj[key];
                                }
                            }
                        }
                    }
                    newObj.default = obj;
                    return newObj;
                }
            }

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {default: obj};
            }

            function _typeof(obj) {
                if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                    _typeof = function _typeof(obj) {
                        return typeof obj;
                    };
                } else {
                    _typeof = function _typeof(obj) {
                        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                    };
                }
                return _typeof(obj);
            }

            function _possibleConstructorReturn(self, call) {
                if (call && (_typeof(call) === "object" || typeof call === "function")) {
                    return call;
                }
                return _assertThisInitialized(self);
            }

            function _getPrototypeOf(o) {
                _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
                    return o.__proto__ || Object.getPrototypeOf(o);
                };
                return _getPrototypeOf(o);
            }

            function _inherits(subClass, superClass) {
                if (typeof superClass !== "function" && superClass !== null) {
                    throw new TypeError("Super expression must either be null or a function");
                }
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        writable: true,
                        configurable: true
                    }
                });
                if (superClass) _setPrototypeOf(subClass, superClass);
            }

            function _setPrototypeOf(o, p) {
                _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
                    o.__proto__ = p;
                    return o;
                };
                return _setPrototypeOf(o, p);
            }

            function _assertThisInitialized(self) {
                if (self === void 0) {
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                }
                return self;
            }

            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }

// eslint-disable-next-line require-jsdoc
            function isAllowedValue(obj, allowedValues) {
                return allowedValues.some(function (ele) {
                    return ele === obj;
                });
            }

            /**
             * @class StreamSourceInfo
             * @memberOf Owt.Base
             * @classDesc Information of a stream's source.
             * @constructor
             * @description Audio source info or video source info could be undefined if a stream does not have audio/video track.
             * @param {?string} audioSourceInfo Audio source info. Accepted values are: "mic", "screen-cast", "file", "mixed" or undefined.
             * @param {?string} videoSourceInfo Video source info. Accepted values are: "camera", "screen-cast", "file", "mixed" or undefined.
             */


            var StreamSourceInfo = // eslint-disable-next-line require-jsdoc
                function StreamSourceInfo(audioSourceInfo, videoSourceInfo) {
                    _classCallCheck(this, StreamSourceInfo);

                    if (!isAllowedValue(audioSourceInfo, [undefined, 'mic', 'screen-cast', 'file', 'mixed'])) {
                        throw new TypeError('Incorrect value for audioSourceInfo');
                    }

                    if (!isAllowedValue(videoSourceInfo, [undefined, 'camera', 'screen-cast', 'file', 'encoded-file', 'raw-file', 'mixed'])) {
                        throw new TypeError('Incorrect value for videoSourceInfo');
                    }

                    this.audio = audioSourceInfo;
                    this.video = videoSourceInfo;
                };
            /**
             * @class Stream
             * @memberOf Owt.Base
             * @classDesc Base class of streams.
             * @extends Owt.Base.EventDispatcher
             * @hideconstructor
             */


            exports.StreamSourceInfo = StreamSourceInfo;

            var Stream =
                /*#__PURE__*/
                function (_EventDispatcher) {
                    _inherits(Stream, _EventDispatcher);

                    // eslint-disable-next-line require-jsdoc
                    function Stream(stream, sourceInfo, attributes) {
                        var _this;

                        _classCallCheck(this, Stream);

                        _this = _possibleConstructorReturn(this, _getPrototypeOf(Stream).call(this));

                        if (stream && !(stream instanceof MediaStream) || _typeof(sourceInfo) !== 'object') {
                            throw new TypeError('Invalid stream or sourceInfo.');
                        }

                        if (stream && (stream.getAudioTracks().length > 0 && !sourceInfo.audio || stream.getVideoTracks().length > 0 && !sourceInfo.video)) {
                            throw new TypeError('Missing audio source info or video source info.');
                        }
                        /**
                         * @member {?MediaStream} mediaStream
                         * @instance
                         * @memberof Owt.Base.Stream
                         * @see {@link https://www.w3.org/TR/mediacapture-streams/#mediastream|MediaStream API of Media Capture and Streams}.
                         */


                        Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), 'mediaStream', {
                            configurable: false,
                            writable: true,
                            value: stream
                        });
                        /**
                         * @member {Owt.Base.StreamSourceInfo} source
                         * @instance
                         * @memberof Owt.Base.Stream
                         * @desc Source info of a stream.
                         */

                        Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), 'source', {
                            configurable: false,
                            writable: false,
                            value: sourceInfo
                        });
                        /**
                         * @member {object} attributes
                         * @instance
                         * @memberof Owt.Base.Stream
                         * @desc Custom attributes of a stream.
                         */

                        Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), 'attributes', {
                            configurable: true,
                            writable: false,
                            value: attributes
                        });
                        return _this;
                    }

                    return Stream;
                }(_event.EventDispatcher);
            /**
             * @class LocalStream
             * @classDesc Stream captured from current endpoint.
             * @memberOf Owt.Base
             * @extends Owt.Base.Stream
             * @constructor
             * @param {MediaStream} stream Underlying MediaStream.
             * @param {Owt.Base.StreamSourceInfo} sourceInfo Information about stream's source.
             * @param {object} attributes Custom attributes of the stream.
             */


            exports.Stream = Stream;

            var LocalStream =
                /*#__PURE__*/
                function (_Stream) {
                    _inherits(LocalStream, _Stream);

                    // eslint-disable-next-line require-jsdoc
                    function LocalStream(stream, sourceInfo, attributes) {
                        var _this2;

                        _classCallCheck(this, LocalStream);

                        if (!(stream instanceof MediaStream)) {
                            throw new TypeError('Invalid stream.');
                        }

                        _this2 = _possibleConstructorReturn(this, _getPrototypeOf(LocalStream).call(this, stream, sourceInfo, attributes));
                        /**
                         * @member {string} id
                         * @instance
                         * @memberof Owt.Base.LocalStream
                         */

                        Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), 'id', {
                            configurable: false,
                            writable: false,
                            value: Utils.createUuid()
                        });
                        return _this2;
                    }

                    return LocalStream;
                }(Stream);
            /**
             * @class RemoteStream
             * @classDesc Stream sent from a remote endpoint.
             * Events:
             *
             * | Event Name      | Argument Type    | Fired when         |
             * | ----------------| ---------------- | ------------------ |
             * | ended           | Event            | Stream is ended.   |
             * | updated         | Event            | Stream is updated. |
             *
             * @memberOf Owt.Base
             * @extends Owt.Base.Stream
             * @hideconstructor
             */


            exports.LocalStream = LocalStream;

            var RemoteStream =
                /*#__PURE__*/
                function (_Stream2) {
                    _inherits(RemoteStream, _Stream2);

                    // eslint-disable-next-line require-jsdoc
                    function RemoteStream(id, origin, stream, sourceInfo, attributes) {
                        var _this3;

                        _classCallCheck(this, RemoteStream);

                        _this3 = _possibleConstructorReturn(this, _getPrototypeOf(RemoteStream).call(this, stream, sourceInfo, attributes));
                        /**
                         * @member {string} id
                         * @instance
                         * @memberof Owt.Base.RemoteStream
                         */

                        Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this3)), 'id', {
                            configurable: false,
                            writable: false,
                            value: id ? id : Utils.createUuid()
                        });
                        /**
                         * @member {string} origin
                         * @instance
                         * @memberof Owt.Base.RemoteStream
                         * @desc ID of the remote endpoint who published this stream.
                         */

                        Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this3)), 'origin', {
                            configurable: false,
                            writable: false,
                            value: origin
                        });
                        /**
                         * @member {Owt.Base.PublicationSettings} settings
                         * @instance
                         * @memberof Owt.Base.RemoteStream
                         * @desc Original settings for publishing this stream. This property is only valid in conference mode.
                         */

                        _this3.settings = undefined;
                        /**
                         * @member {Owt.Conference.SubscriptionCapabilities} extraCapabilities
                         * @instance
                         * @memberof Owt.Base.RemoteStream
                         * @desc Extra capabilities remote endpoint provides for subscription. Extra capabilities don't include original settings. This property is only valid in conference mode.
                         */

                        _this3.extraCapabilities = undefined;
                        return _this3;
                    }

                    return RemoteStream;
                }(Stream);
            /**
             * @class StreamEvent
             * @classDesc Event for Stream.
             * @extends Owt.Base.OwtEvent
             * @memberof Owt.Base
             * @hideconstructor
             */


            exports.RemoteStream = RemoteStream;

            var StreamEvent =
                /*#__PURE__*/
                function (_OwtEvent) {
                    _inherits(StreamEvent, _OwtEvent);

                    // eslint-disable-next-line require-jsdoc
                    function StreamEvent(type, init) {
                        var _this4;

                        _classCallCheck(this, StreamEvent);

                        _this4 = _possibleConstructorReturn(this, _getPrototypeOf(StreamEvent).call(this, type));
                        /**
                         * @member {Owt.Base.Stream} stream
                         * @instance
                         * @memberof Owt.Base.StreamEvent
                         */

                        _this4.stream = init.stream;
                        return _this4;
                    }

                    return StreamEvent;
                }(_event.OwtEvent);

            exports.StreamEvent = StreamEvent;

        }, {"./event.js": 3, "./logger.js": 5, "./utils.js": 11}],
        11: [function (require, module, exports) {
// Copyright (C) <2018> Intel Corporation
//
// SPDX-License-Identifier: Apache-2.0

            /* global navigator, window */
            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.isFirefox = isFirefox;
            exports.isChrome = isChrome;
            exports.isSafari = isSafari;
            exports.isEdge = isEdge;
            exports.createUuid = createUuid;
            exports.sysInfo = sysInfo;
            var sdkVersion = '4.3.1'; // eslint-disable-next-line require-jsdoc

            function isFirefox() {
                return window.navigator.userAgent.match('Firefox') !== null;
            } // eslint-disable-next-line require-jsdoc


            function isChrome() {
                return window.navigator.userAgent.match('Chrome') !== null;
            } // eslint-disable-next-line require-jsdoc


            function isSafari() {
                return /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent);
            } // eslint-disable-next-line require-jsdoc


            function isEdge() {
                return window.navigator.userAgent.match(/Edge\/(\d+).(\d+)$/) !== null;
            } // eslint-disable-next-line require-jsdoc


            function createUuid() {
                return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0;
                    var v = c === 'x' ? r : r & 0x3 | 0x8;
                    return v.toString(16);
                });
            } // Returns system information.
// Format: {sdk:{version:**, type:**}, runtime:{version:**, name:**}, os:{version:**, name:**}};
// eslint-disable-next-line require-jsdoc


            function sysInfo() {
                var info = Object.create({});
                info.sdk = {
                    version: sdkVersion,
                    type: 'JavaScript'
                }; // Runtime info.

                var userAgent = navigator.userAgent;
                var firefoxRegex = /Firefox\/([0-9\.]+)/;
                var chromeRegex = /Chrome\/([0-9\.]+)/;
                var edgeRegex = /Edge\/([0-9\.]+)/;
                var safariVersionRegex = /Version\/([0-9\.]+) Safari/;
                var result = chromeRegex.exec(userAgent);

                if (result) {
                    info.runtime = {
                        name: 'Chrome',
                        version: result[1]
                    };
                } else if (result = firefoxRegex.exec(userAgent)) {
                    info.runtime = {
                        name: 'Firefox',
                        version: result[1]
                    };
                } else if (result = edgeRegex.exec(userAgent)) {
                    info.runtime = {
                        name: 'Edge',
                        version: result[1]
                    };
                } else if (isSafari()) {
                    result = safariVersionRegex.exec(userAgent);
                    info.runtime = {
                        name: 'Safari'
                    };
                    info.runtime.version = result ? result[1] : 'Unknown';
                } else {
                    info.runtime = {
                        name: 'Unknown',
                        version: 'Unknown'
                    };
                } // OS info.


                var windowsRegex = /Windows NT ([0-9\.]+)/;
                var macRegex = /Intel Mac OS X ([0-9_\.]+)/;
                var iPhoneRegex = /iPhone OS ([0-9_\.]+)/;
                var linuxRegex = /X11; Linux/;
                var androidRegex = /Android( ([0-9\.]+))?/;
                var chromiumOsRegex = /CrOS/;

                if (result = windowsRegex.exec(userAgent)) {
                    info.os = {
                        name: 'Windows NT',
                        version: result[1]
                    };
                } else if (result = macRegex.exec(userAgent)) {
                    info.os = {
                        name: 'Mac OS X',
                        version: result[1].replace(/_/g, '.')
                    };
                } else if (result = iPhoneRegex.exec(userAgent)) {
                    info.os = {
                        name: 'iPhone OS',
                        version: result[1].replace(/_/g, '.')
                    };
                } else if (result = linuxRegex.exec(userAgent)) {
                    info.os = {
                        name: 'Linux',
                        version: 'Unknown'
                    };
                } else if (result = androidRegex.exec(userAgent)) {
                    info.os = {
                        name: 'Android',
                        version: result[1] || 'Unknown'
                    };
                } else if (result = chromiumOsRegex.exec(userAgent)) {
                    info.os = {
                        name: 'Chrome OS',
                        version: 'Unknown'
                    };
                } else {
                    info.os = {
                        name: 'Unknown',
                        version: 'Unknown'
                    };
                }

                info.capabilities = {
                    continualIceGathering: false,
                    unifiedPlan: true,
                    streamRemovable: info.runtime.name !== 'Firefox'
                };
                return info;
            }

        }, {}],
        12: [function (require, module, exports) {
// Copyright (C) <2018> Intel Corporation
//
// SPDX-License-Identifier: Apache-2.0

            /* eslint-disable require-jsdoc */

            /* global Promise */
            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.ConferencePeerConnectionChannel = void 0;

            var _logger = _interopRequireDefault(require("../base/logger.js"));

            var _event = require("../base/event.js");

            var _mediaformat = require("../base/mediaformat.js");

            var _publication = require("../base/publication.js");

            var _subscription = require("./subscription.js");

            var _error2 = require("./error.js");

            var Utils = _interopRequireWildcard(require("../base/utils.js"));

            var SdpUtils = _interopRequireWildcard(require("../base/sdputils.js"));

            function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) {
                    return obj;
                } else {
                    var newObj = {};
                    if (obj != null) {
                        for (var key in obj) {
                            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                                var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                                if (desc.get || desc.set) {
                                    Object.defineProperty(newObj, key, desc);
                                } else {
                                    newObj[key] = obj[key];
                                }
                            }
                        }
                    }
                    newObj.default = obj;
                    return newObj;
                }
            }

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {default: obj};
            }

            function _typeof(obj) {
                if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                    _typeof = function _typeof(obj) {
                        return typeof obj;
                    };
                } else {
                    _typeof = function _typeof(obj) {
                        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                    };
                }
                return _typeof(obj);
            }

            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }

            function _defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            function _createClass(Constructor, protoProps, staticProps) {
                if (protoProps) _defineProperties(Constructor.prototype, protoProps);
                if (staticProps) _defineProperties(Constructor, staticProps);
                return Constructor;
            }

            function _possibleConstructorReturn(self, call) {
                if (call && (_typeof(call) === "object" || typeof call === "function")) {
                    return call;
                }
                return _assertThisInitialized(self);
            }

            function _assertThisInitialized(self) {
                if (self === void 0) {
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                }
                return self;
            }

            function _getPrototypeOf(o) {
                _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
                    return o.__proto__ || Object.getPrototypeOf(o);
                };
                return _getPrototypeOf(o);
            }

            function _inherits(subClass, superClass) {
                if (typeof superClass !== "function" && superClass !== null) {
                    throw new TypeError("Super expression must either be null or a function");
                }
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        writable: true,
                        configurable: true
                    }
                });
                if (superClass) _setPrototypeOf(subClass, superClass);
            }

            function _setPrototypeOf(o, p) {
                _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
                    o.__proto__ = p;
                    return o;
                };
                return _setPrototypeOf(o, p);
            }

            /**
             * @class ConferencePeerConnectionChannel
             * @classDesc A channel for a connection between client and conference server. Currently, only one stream could be tranmitted in a channel.
             * @hideconstructor
             * @private
             */
            var ConferencePeerConnectionChannel =
                /*#__PURE__*/
                function (_EventDispatcher) {
                    _inherits(ConferencePeerConnectionChannel, _EventDispatcher);

                    // eslint-disable-next-line require-jsdoc
                    function ConferencePeerConnectionChannel(config, signaling) {
                        var _this;

                        _classCallCheck(this, ConferencePeerConnectionChannel);

                        _this = _possibleConstructorReturn(this, _getPrototypeOf(ConferencePeerConnectionChannel).call(this));
                        _this._config = config;
                        _this._options = null;
                        _this._videoCodecs = undefined;
                        _this._signaling = signaling;
                        _this._pc = null;
                        _this._internalId = null; // It's publication ID or subscription ID.

                        _this._pendingCandidates = [];
                        _this._subscribePromise = null;
                        _this._publishPromise = null;
                        _this._subscribedStream = null;
                        _this._publishedStream = null;
                        _this._publication = null;
                        _this._subscription = null; // Timer for PeerConnection disconnected. Will stop connection after timer.

                        _this._disconnectTimer = null;
                        _this._ended = false;
                        _this._stopped = false;
                        return _this;
                    }

                    /**
                     * @function onMessage
                     * @desc Received a message from conference portal. Defined in client-server protocol.
                     * @param {string} notification Notification type.
                     * @param {object} message Message received.
                     * @private
                     */


                    _createClass(ConferencePeerConnectionChannel, [{
                        key: "onMessage",
                        value: function onMessage(notification, message) {
                            switch (notification) {
                                case 'progress':
                                    if (message.status === 'soac') {
                                        this._sdpHandler(message.data);
                                    } else if (message.status === 'ready') {
                                        this._readyHandler();
                                    } else if (message.status === 'error') {
                                        this._errorHandler(message.data);
                                    }

                                    break;

                                case 'stream':
                                    this._onStreamEvent(message);

                                    break;

                                default:
                                    _logger.default.warning('Unknown notification from MCU.');

                            }
                        }
                    }, {
                        key: "publish",
                        value: function publish(stream, options, videoCodecs) {
                            var _this2 = this;

                            if (options === undefined) {
                                options = {
                                    audio: !!stream.mediaStream.getAudioTracks().length,
                                    video: !!stream.mediaStream.getVideoTracks().length
                                };
                            }

                            if (_typeof(options) !== 'object') {
                                return Promise.reject(new TypeError('Options should be an object.'));
                            }

                            if (this._isRtpEncodingParameters(options.audio) && this._isOwtEncodingParameters(options.video) || this._isOwtEncodingParameters(options.audio) && this._isRtpEncodingParameters(options.video)) {
                                return Promise.reject(new _error2.ConferenceError('Mixing RTCRtpEncodingParameters and AudioEncodingParameters/VideoEncodingParameters is not allowed.'));
                            }

                            if (options.audio === undefined) {
                                options.audio = !!stream.mediaStream.getAudioTracks().length;
                            }

                            if (options.video === undefined) {
                                options.video = !!stream.mediaStream.getVideoTracks().length;
                            }

                            if (!!options.audio && !stream.mediaStream.getAudioTracks().length || !!options.video && !stream.mediaStream.getVideoTracks().length) {
                                return Promise.reject(new _error2.ConferenceError('options.audio/video is inconsistent with tracks presented in the ' + 'MediaStream.'));
                            }

                            if ((options.audio === false || options.audio === null) && (options.video === false || options.video === null)) {
                                return Promise.reject(new _error2.ConferenceError('Cannot publish a stream without audio and video.'));
                            }

                            if (_typeof(options.audio) === 'object') {
                                if (!Array.isArray(options.audio)) {
                                    return Promise.reject(new TypeError('options.audio should be a boolean or an array.'));
                                }

                                var _iteratorNormalCompletion = true;
                                var _didIteratorError = false;
                                var _iteratorError = undefined;

                                try {
                                    for (var _iterator = options.audio[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                        var parameters = _step.value;

                                        if (!parameters.codec || typeof parameters.codec.name !== 'string' || parameters.maxBitrate !== undefined && typeof parameters.maxBitrate !== 'number') {
                                            return Promise.reject(new TypeError('options.audio has incorrect parameters.'));
                                        }
                                    }
                                } catch (err) {
                                    _didIteratorError = true;
                                    _iteratorError = err;
                                } finally {
                                    try {
                                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                                            _iterator.return();
                                        }
                                    } finally {
                                        if (_didIteratorError) {
                                            throw _iteratorError;
                                        }
                                    }
                                }
                            }

                            if (_typeof(options.video) === 'object' && !Array.isArray(options.video)) {
                                return Promise.reject(new TypeError('options.video should be a boolean or an array.'));
                            }

                            if (this._isOwtEncodingParameters(options.video)) {
                                var _iteratorNormalCompletion2 = true;
                                var _didIteratorError2 = false;
                                var _iteratorError2 = undefined;

                                try {
                                    for (var _iterator2 = options.video[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                        var _parameters = _step2.value;

                                        if (!_parameters.codec || typeof _parameters.codec.name !== 'string' || _parameters.maxBitrate !== undefined && typeof _parameters.maxBitrate !== 'number' || _parameters.codec.profile !== undefined && typeof _parameters.codec.profile !== 'string') {
                                            return Promise.reject(new TypeError('options.video has incorrect parameters.'));
                                        }
                                    }
                                } catch (err) {
                                    _didIteratorError2 = true;
                                    _iteratorError2 = err;
                                } finally {
                                    try {
                                        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                                            _iterator2.return();
                                        }
                                    } finally {
                                        if (_didIteratorError2) {
                                            throw _iteratorError2;
                                        }
                                    }
                                }
                            }

                            this._options = options;
                            var mediaOptions = {};

                            this._createPeerConnection();

                            if (stream.mediaStream.getAudioTracks().length > 0 && options.audio !== false && options.audio !== null) {
                                if (stream.mediaStream.getAudioTracks().length > 1) {
                                    _logger.default.warning('Publishing a stream with multiple audio tracks is not fully' + ' supported.');
                                }

                                if (typeof options.audio !== 'boolean' && _typeof(options.audio) !== 'object') {
                                    return Promise.reject(new _error2.ConferenceError('Type of audio options should be boolean or an object.'));
                                }

                                mediaOptions.audio = {};
                                mediaOptions.audio.source = stream.source.audio;
                            } else {
                                mediaOptions.audio = false;
                            }

                            if (stream.mediaStream.getVideoTracks().length > 0 && options.video !== false && options.video !== null) {
                                if (stream.mediaStream.getVideoTracks().length > 1) {
                                    _logger.default.warning('Publishing a stream with multiple video tracks is not fully ' + 'supported.');
                                }

                                mediaOptions.video = {};
                                mediaOptions.video.source = stream.source.video;
                                var trackSettings = stream.mediaStream.getVideoTracks()[0].getSettings();
                                mediaOptions.video.parameters = {
                                    resolution: {
                                        width: trackSettings.width,
                                        height: trackSettings.height
                                    },
                                    framerate: trackSettings.frameRate
                                };
                            } else {
                                mediaOptions.video = false;
                            }

                            this._publishedStream = stream;

                            this._signaling.sendSignalingMessage('publish', {
                                media: mediaOptions,
                                attributes: stream.attributes
                            }).then(function (data) {
                                var messageEvent = new _event.MessageEvent('id', {
                                    message: data.id,
                                    origin: _this2._remoteId
                                });

                                _this2.dispatchEvent(messageEvent);

                                _this2._internalId = data.id;
                                var offerOptions = {};

                                if (typeof _this2._pc.addTransceiver === 'function') {
                                    var setPromise = Promise.resolve(); // |direction| seems not working on Safari.

                                    if (mediaOptions.audio && stream.mediaStream.getAudioTracks().length > 0) {
                                        var transceiverInit = {
                                            direction: 'sendonly'
                                        };

                                        if (_this2._isRtpEncodingParameters(options.audio)) {
                                            transceiverInit.sendEncodings = options.audio;
                                        }

                                        var transceiver = _this2._pc.addTransceiver(stream.mediaStream.getAudioTracks()[0], transceiverInit);

                                        if (Utils.isFirefox()) {
                                            // Firefox does not support encodings setting in addTransceiver.
                                            var _parameters2 = transceiver.sender.getParameters();

                                            _parameters2.encodings = transceiverInit.sendEncodings;
                                            setPromise = transceiver.sender.setParameters(_parameters2);
                                        }
                                    }

                                    if (mediaOptions.video && stream.mediaStream.getVideoTracks().length > 0) {
                                        var _transceiverInit = {
                                            direction: 'sendonly'
                                        };

                                        if (_this2._isRtpEncodingParameters(options.video)) {
                                            _transceiverInit.sendEncodings = options.video;
                                            _this2._videoCodecs = videoCodecs;
                                        }

                                        var _transceiver = _this2._pc.addTransceiver(stream.mediaStream.getVideoTracks()[0], _transceiverInit);

                                        if (Utils.isFirefox()) {
                                            // Firefox does not support encodings setting in addTransceiver.
                                            var _parameters3 = _transceiver.sender.getParameters();

                                            _parameters3.encodings = _transceiverInit.sendEncodings;
                                            setPromise = setPromise.then(function () {
                                                return _transceiver.sender.setParameters(_parameters3);
                                            });
                                        }
                                    }

                                    return setPromise.then(function () {
                                        return offerOptions;
                                    });
                                } else {
                                    if (mediaOptions.audio && stream.mediaStream.getAudioTracks().length > 0) {
                                        var _iteratorNormalCompletion3 = true;
                                        var _didIteratorError3 = false;
                                        var _iteratorError3 = undefined;

                                        try {
                                            for (var _iterator3 = stream.mediaStream.getAudioTracks()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                                var track = _step3.value;

                                                _this2._pc.addTrack(track, stream.mediaStream);
                                            }
                                        } catch (err) {
                                            _didIteratorError3 = true;
                                            _iteratorError3 = err;
                                        } finally {
                                            try {
                                                if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                                                    _iterator3.return();
                                                }
                                            } finally {
                                                if (_didIteratorError3) {
                                                    throw _iteratorError3;
                                                }
                                            }
                                        }
                                    }

                                    if (mediaOptions.video && stream.mediaStream.getVideoTracks().length > 0) {
                                        var _iteratorNormalCompletion4 = true;
                                        var _didIteratorError4 = false;
                                        var _iteratorError4 = undefined;

                                        try {
                                            for (var _iterator4 = stream.mediaStream.getVideoTracks()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                                var _track = _step4.value;

                                                _this2._pc.addTrack(_track, stream.mediaStream);
                                            }
                                        } catch (err) {
                                            _didIteratorError4 = true;
                                            _iteratorError4 = err;
                                        } finally {
                                            try {
                                                if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
                                                    _iterator4.return();
                                                }
                                            } finally {
                                                if (_didIteratorError4) {
                                                    throw _iteratorError4;
                                                }
                                            }
                                        }
                                    }

                                    offerOptions.offerToReceiveAudio = false;
                                    offerOptions.offerToReceiveVideo = false;
                                }

                                return offerOptions;
                            }).then(function (offerOptions) {
                                var localDesc;

                                _this2._pc.createOffer(offerOptions).then(function (desc) {
                                    if (options) {
                                        desc.sdp = _this2._setRtpReceiverOptions(desc.sdp, options);
                                    }

                                    return desc;
                                }).then(function (desc) {
                                    localDesc = desc;
                                    return _this2._pc.setLocalDescription(desc);
                                }).then(function () {
                                    _this2._signaling.sendSignalingMessage('soac', {
                                        id: _this2._internalId,
                                        signaling: localDesc
                                    });
                                }).catch(function (e) {
                                    _logger.default.error('Failed to create offer or set SDP. Message: ' + e.message);

                                    _this2._unpublish();

                                    _this2._rejectPromise(e);

                                    _this2._fireEndedEventOnPublicationOrSubscription();
                                });
                            }).catch(function (e) {
                                _this2._unpublish();

                                _this2._rejectPromise(e);

                                _this2._fireEndedEventOnPublicationOrSubscription();
                            });

                            return new Promise(function (resolve, reject) {
                                _this2._publishPromise = {
                                    resolve: resolve,
                                    reject: reject
                                };
                            });
                        }
                    }, {
                        key: "subscribe",
                        value: function subscribe(stream, options) {
                            var _this3 = this;

                            if (options === undefined) {
                                options = {
                                    audio: !!stream.settings.audio,
                                    video: !!stream.settings.video
                                };
                            }

                            if (_typeof(options) !== 'object') {
                                return Promise.reject(new TypeError('Options should be an object.'));
                            }

                            if (options.audio === undefined) {
                                options.audio = !!stream.settings.audio;
                            }

                            if (options.video === undefined) {
                                options.video = !!stream.settings.video;
                            }

                            if (options.audio !== undefined && _typeof(options.audio) !== 'object' && typeof options.audio !== 'boolean' && options.audio !== null || options.video !== undefined && _typeof(options.video) !== 'object' && typeof options.video !== 'boolean' && options.video !== null) {
                                return Promise.reject(new TypeError('Invalid options type.'));
                            }

                            if (options.audio && !stream.settings.audio || options.video && !stream.settings.video) {
                                return Promise.reject(new _error2.ConferenceError('options.audio/video cannot be true or an object if there is no ' + 'audio/video track in remote stream.'));
                            }

                            if (options.audio === false && options.video === false) {
                                return Promise.reject(new _error2.ConferenceError('Cannot subscribe a stream without audio and video.'));
                            }

                            this._options = options;
                            var mediaOptions = {};

                            if (options.audio) {
                                if (_typeof(options.audio) === 'object' && Array.isArray(options.audio.codecs)) {
                                    if (options.audio.codecs.length === 0) {
                                        return Promise.reject(new TypeError('Audio codec cannot be an empty array.'));
                                    }
                                }

                                mediaOptions.audio = {};
                                mediaOptions.audio.from = stream.id;
                            } else {
                                mediaOptions.audio = false;
                            }

                            if (options.video) {
                                if (_typeof(options.video) === 'object' && Array.isArray(options.video.codecs)) {
                                    if (options.video.codecs.length === 0) {
                                        return Promise.reject(new TypeError('Video codec cannot be an empty array.'));
                                    }
                                }

                                mediaOptions.video = {};
                                mediaOptions.video.from = stream.id;

                                if (options.video.resolution || options.video.frameRate || options.video.bitrateMultiplier && options.video.bitrateMultiplier !== 1 || options.video.keyFrameInterval) {
                                    mediaOptions.video.parameters = {
                                        resolution: options.video.resolution,
                                        framerate: options.video.frameRate,
                                        bitrate: options.video.bitrateMultiplier ? 'x' + options.video.bitrateMultiplier.toString() : undefined,
                                        keyFrameInterval: options.video.keyFrameInterval
                                    };
                                }

                                if (options.video.rid) {
                                    mediaOptions.video.simulcastRid = options.video.rid; // Ignore other settings when RID set.

                                    delete mediaOptions.video.parameters;
                                    options.video = true;
                                }
                            } else {
                                mediaOptions.video = false;
                            }

                            this._subscribedStream = stream;

                            this._signaling.sendSignalingMessage('subscribe', {
                                media: mediaOptions
                            }).then(function (data) {
                                var messageEvent = new _event.MessageEvent('id', {
                                    message: data.id,
                                    origin: _this3._remoteId
                                });

                                _this3.dispatchEvent(messageEvent);

                                _this3._internalId = data.id;

                                _this3._createPeerConnection();

                                var offerOptions = {};

                                if (typeof _this3._pc.addTransceiver === 'function') {
                                    // |direction| seems not working on Safari.
                                    if (mediaOptions.audio) {
                                        _this3._pc.addTransceiver('audio', {
                                            direction: 'recvonly'
                                        });
                                    }

                                    if (mediaOptions.video) {
                                        _this3._pc.addTransceiver('video', {
                                            direction: 'recvonly'
                                        });
                                    }
                                } else {
                                    offerOptions.offerToReceiveAudio = !!options.audio;
                                    offerOptions.offerToReceiveVideo = !!options.video;
                                }

                                _this3._pc.createOffer(offerOptions).then(function (desc) {
                                    if (options) {
                                        desc.sdp = _this3._setRtpReceiverOptions(desc.sdp, options);
                                    }

                                    _this3._pc.setLocalDescription(desc).then(function () {
                                        _this3._signaling.sendSignalingMessage('soac', {
                                            id: _this3._internalId,
                                            signaling: desc
                                        });
                                    }, function (errorMessage) {
                                        _logger.default.error('Set local description failed. Message: ' + JSON.stringify(errorMessage));
                                    });
                                }, function (error) {
                                    _logger.default.error('Create offer failed. Error info: ' + JSON.stringify(error));
                                }).catch(function (e) {
                                    _logger.default.error('Failed to create offer or set SDP. Message: ' + e.message);

                                    _this3._unsubscribe();

                                    _this3._rejectPromise(e);

                                    _this3._fireEndedEventOnPublicationOrSubscription();
                                });
                            }).catch(function (e) {
                                _this3._unsubscribe();

                                _this3._rejectPromise(e);

                                _this3._fireEndedEventOnPublicationOrSubscription();
                            });

                            return new Promise(function (resolve, reject) {
                                _this3._subscribePromise = {
                                    resolve: resolve,
                                    reject: reject
                                };
                            });
                        }
                    }, {
                        key: "_unpublish",
                        value: function _unpublish() {
                            if (!this._stopped) {
                                this._stopped = true;

                                this._signaling.sendSignalingMessage('unpublish', {
                                    id: this._internalId
                                }).catch(function (e) {
                                    _logger.default.warning('MCU returns negative ack for unpublishing, ' + e);
                                });

                                if (this._pc && this._pc.signalingState !== 'closed') {
                                    this._pc.close();
                                }
                            }
                        }
                    }, {
                        key: "_unsubscribe",
                        value: function _unsubscribe() {
                            if (!this._stopped) {
                                this._stopped = true;

                                this._signaling.sendSignalingMessage('unsubscribe', {
                                    id: this._internalId
                                }).catch(function (e) {
                                    _logger.default.warning('MCU returns negative ack for unsubscribing, ' + e);
                                });

                                if (this._pc && this._pc.signalingState !== 'closed') {
                                    this._pc.close();
                                }
                            }
                        }
                    }, {
                        key: "_muteOrUnmute",
                        value: function _muteOrUnmute(isMute, isPub, trackKind) {
                            var _this4 = this;

                            var eventName = isPub ? 'stream-control' : 'subscription-control';
                            var operation = isMute ? 'pause' : 'play';
                            return this._signaling.sendSignalingMessage(eventName, {
                                id: this._internalId,
                                operation: operation,
                                data: trackKind
                            }).then(function () {
                                if (!isPub) {
                                    var muteEventName = isMute ? 'mute' : 'unmute';

                                    _this4._subscription.dispatchEvent(new _event.MuteEvent(muteEventName, {
                                        kind: trackKind
                                    }));
                                }
                            });
                        }
                    }, {
                        key: "_applyOptions",
                        value: function _applyOptions(options) {
                            if (_typeof(options) !== 'object' || _typeof(options.video) !== 'object') {
                                return Promise.reject(new _error2.ConferenceError('Options should be an object.'));
                            }

                            var videoOptions = {};
                            videoOptions.resolution = options.video.resolution;
                            videoOptions.framerate = options.video.frameRate;
                            videoOptions.bitrate = options.video.bitrateMultiplier ? 'x' + options.video.bitrateMultiplier.toString() : undefined;
                            videoOptions.keyFrameInterval = options.video.keyFrameInterval;
                            return this._signaling.sendSignalingMessage('subscription-control', {
                                id: this._internalId,
                                operation: 'update',
                                data: {
                                    video: {
                                        parameters: videoOptions
                                    }
                                }
                            }).then();
                        }
                    }, {
                        key: "_onRemoteStreamAdded",
                        value: function _onRemoteStreamAdded(event) {
                            _logger.default.debug('Remote stream added.');

                            if (this._subscribedStream) {
                                this._subscribedStream.mediaStream = event.streams[0];
                            } else {
                                // This is not expected path. However, this is going to happen on Safari
                                // because it does not support setting direction of transceiver.
                                _logger.default.warning('Received remote stream without subscription.');
                            }
                        }
                    }, {
                        key: "_onLocalIceCandidate",
                        value: function _onLocalIceCandidate(event) {
                            if (event.candidate) {
                                if (this._pc.signalingState !== 'stable') {
                                    this._pendingCandidates.push(event.candidate);
                                } else {
                                    this._sendCandidate(event.candidate);
                                }
                            } else {
                                _logger.default.debug('Empty candidate.');
                            }
                        }
                    }, {
                        key: "_fireEndedEventOnPublicationOrSubscription",
                        value: function _fireEndedEventOnPublicationOrSubscription() {
                            if (this._ended) {
                                return;
                            }

                            this._ended = true;
                            var event = new _event.OwtEvent('ended');

                            if (this._publication) {
                                this._publication.dispatchEvent(event);

                                this._publication.stop();
                            } else if (this._subscription) {
                                this._subscription.dispatchEvent(event);

                                this._subscription.stop();
                            }
                        }
                    }, {
                        key: "_rejectPromise",
                        value: function _rejectPromise(error) {
                            if (!error) {
                                var _error = new _error2.ConferenceError('Connection failed or closed.');
                            } // Rejecting corresponding promise if publishing and subscribing is ongoing.


                            if (this._publishPromise) {
                                this._publishPromise.reject(error);

                                this._publishPromise = undefined;
                            } else if (this._subscribePromise) {
                                this._subscribePromise.reject(error);

                                this._subscribePromise = undefined;
                            }
                        }
                    }, {
                        key: "_onIceConnectionStateChange",
                        value: function _onIceConnectionStateChange(event) {
                            if (!event || !event.currentTarget) {
                                return;
                            }

                            _logger.default.debug('ICE connection state changed to ' + event.currentTarget.iceConnectionState);

                            if (event.currentTarget.iceConnectionState === 'closed' || event.currentTarget.iceConnectionState === 'failed') {
                                if (event.currentTarget.iceConnectionState === 'failed') {
                                    this._handleError('connection failed.');
                                } else {
                                    // Fire ended event if publication or subscription exists.
                                    this._fireEndedEventOnPublicationOrSubscription();
                                }
                            }
                        }
                    }, {
                        key: "_onConnectionStateChange",
                        value: function _onConnectionStateChange(event) {
                            if (this._pc.connectionState === 'closed' || this._pc.connectionState === 'failed') {
                                if (this._pc.connectionState === 'failed') {
                                    this._handleError('connection failed.');
                                } else {
                                    // Fire ended event if publication or subscription exists.
                                    this._fireEndedEventOnPublicationOrSubscription();
                                }
                            }
                        }
                    }, {
                        key: "_sendCandidate",
                        value: function _sendCandidate(candidate) {
                            this._signaling.sendSignalingMessage('soac', {
                                id: this._internalId,
                                signaling: {
                                    type: 'candidate',
                                    candidate: {
                                        candidate: 'a=' + candidate.candidate,
                                        sdpMid: candidate.sdpMid,
                                        sdpMLineIndex: candidate.sdpMLineIndex
                                    }
                                }
                            });
                        }
                    }, {
                        key: "_createPeerConnection",
                        value: function _createPeerConnection() {
                            var _this5 = this;

                            var pcConfiguration = this._config.rtcConfiguration || {};

                            if (Utils.isChrome()) {
                                pcConfiguration.sdpSemantics = 'unified-plan';
                            }

                            this._pc = new RTCPeerConnection(pcConfiguration);

                            this._pc.onicecandidate = function (event) {
                                _this5._onLocalIceCandidate.apply(_this5, [event]);
                            };

                            this._pc.ontrack = function (event) {
                                _this5._onRemoteStreamAdded.apply(_this5, [event]);
                            };

                            this._pc.oniceconnectionstatechange = function (event) {
                                _this5._onIceConnectionStateChange.apply(_this5, [event]);
                            };

                            this._pc.onconnectionstatechange = function (event) {
                                _this5._onConnectionStateChange.apply(_this5, [event]);
                            };
                        }
                    }, {
                        key: "_getStats",
                        value: function _getStats() {
                            if (this._pc) {
                                return this._pc.getStats();
                            } else {
                                return Promise.reject(new _error2.ConferenceError('PeerConnection is not available.'));
                            }
                        }
                    }, {
                        key: "_readyHandler",
                        value: function _readyHandler() {
                            var _this6 = this;

                            if (this._subscribePromise) {
                                this._subscription = new _subscription.Subscription(this._internalId, function () {
                                    _this6._unsubscribe();
                                }, function () {
                                    return _this6._getStats();
                                }, function (trackKind) {
                                    return _this6._muteOrUnmute(true, false, trackKind);
                                }, function (trackKind) {
                                    return _this6._muteOrUnmute(false, false, trackKind);
                                }, function (options) {
                                    return _this6._applyOptions(options);
                                }); // Fire subscription's ended event when associated stream is ended.

                                this._subscribedStream.addEventListener('ended', function () {
                                    _this6._subscription.dispatchEvent('ended', new _event.OwtEvent('ended'));
                                });

                                this._subscribePromise.resolve(this._subscription);
                            } else if (this._publishPromise) {
                                this._publication = new _publication.Publication(this._internalId, function () {
                                    _this6._unpublish();

                                    return Promise.resolve();
                                }, function () {
                                    return _this6._getStats();
                                }, function (trackKind) {
                                    return _this6._muteOrUnmute(true, true, trackKind);
                                }, function (trackKind) {
                                    return _this6._muteOrUnmute(false, true, trackKind);
                                });

                                this._publishPromise.resolve(this._publication); // Do not fire publication's ended event when associated stream is ended.
                                // It may still sending silence or black frames.
                                // Refer to https://w3c.github.io/webrtc-pc/#rtcrtpsender-interface.

                            }

                            this._publishPromise = null;
                            this._subscribePromise = null;
                        }
                    }, {
                        key: "_sdpHandler",
                        value: function _sdpHandler(sdp) {
                            var _this7 = this;

                            if (sdp.type === 'answer') {
                                if ((this._publication || this._publishPromise) && this._options) {
                                    sdp.sdp = this._setRtpSenderOptions(sdp.sdp, this._options);
                                }

                                this._pc.setRemoteDescription(sdp).then(function () {
                                    if (_this7._pendingCandidates.length > 0) {
                                        var _iteratorNormalCompletion5 = true;
                                        var _didIteratorError5 = false;
                                        var _iteratorError5 = undefined;

                                        try {
                                            for (var _iterator5 = _this7._pendingCandidates[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                                var candidate = _step5.value;

                                                _this7._sendCandidate(candidate);
                                            }
                                        } catch (err) {
                                            _didIteratorError5 = true;
                                            _iteratorError5 = err;
                                        } finally {
                                            try {
                                                if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
                                                    _iterator5.return();
                                                }
                                            } finally {
                                                if (_didIteratorError5) {
                                                    throw _iteratorError5;
                                                }
                                            }
                                        }
                                    }
                                }, function (error) {
                                    _logger.default.error('Set remote description failed: ' + error);

                                    _this7._rejectPromise(error);

                                    _this7._fireEndedEventOnPublicationOrSubscription();
                                });
                            }
                        }
                    }, {
                        key: "_errorHandler",
                        value: function _errorHandler(errorMessage) {
                            return this._handleError(errorMessage);
                        }
                    }, {
                        key: "_handleError",
                        value: function _handleError(errorMessage) {
                            var error = new _error2.ConferenceError(errorMessage);
                            var p = this._publishPromise || this._subscribePromise;

                            if (p) {
                                return this._rejectPromise(error);
                            }

                            if (this._ended) {
                                return;
                            }

                            var dispatcher = this._publication || this._subscription;

                            if (!dispatcher) {
                                _logger.default.warning('Neither publication nor subscription is available.');

                                return;
                            }

                            var errorEvent = new _event.ErrorEvent('error', {
                                error: error
                            });
                            dispatcher.dispatchEvent(errorEvent); // Fire ended event when error occured

                            this._fireEndedEventOnPublicationOrSubscription();
                        }
                    }, {
                        key: "_setCodecOrder",
                        value: function _setCodecOrder(sdp, options) {
                            if (this._publication || this._publishPromise) {
                                if (options.audio) {
                                    var audioCodecNames = Array.from(options.audio, function (encodingParameters) {
                                        return encodingParameters.codec.name;
                                    });
                                    sdp = SdpUtils.reorderCodecs(sdp, 'audio', audioCodecNames);
                                }

                                if (options.video) {
                                    var videoCodecNames = Array.from(options.video, function (encodingParameters) {
                                        return encodingParameters.codec.name;
                                    });
                                    sdp = SdpUtils.reorderCodecs(sdp, 'video', videoCodecNames);
                                }
                            } else {
                                if (options.audio && options.audio.codecs) {
                                    var _audioCodecNames = Array.from(options.audio.codecs, function (codec) {
                                        return codec.name;
                                    });

                                    sdp = SdpUtils.reorderCodecs(sdp, 'audio', _audioCodecNames);
                                }

                                if (options.video && options.video.codecs) {
                                    var _videoCodecNames = Array.from(options.video.codecs, function (codec) {
                                        return codec.name;
                                    });

                                    sdp = SdpUtils.reorderCodecs(sdp, 'video', _videoCodecNames);
                                }
                            }

                            return sdp;
                        }
                    }, {
                        key: "_setMaxBitrate",
                        value: function _setMaxBitrate(sdp, options) {
                            if (_typeof(options.audio) === 'object') {
                                sdp = SdpUtils.setMaxBitrate(sdp, options.audio);
                            }

                            if (_typeof(options.video) === 'object') {
                                sdp = SdpUtils.setMaxBitrate(sdp, options.video);
                            }

                            return sdp;
                        }
                    }, {
                        key: "_setRtpSenderOptions",
                        value: function _setRtpSenderOptions(sdp, options) {
                            // SDP mugling is deprecated, moving to `setParameters`.
                            if (this._isRtpEncodingParameters(options.audio) || this._isRtpEncodingParameters(options.video)) {
                                return sdp;
                            }

                            sdp = this._setMaxBitrate(sdp, options);
                            return sdp;
                        }
                    }, {
                        key: "_setRtpReceiverOptions",
                        value: function _setRtpReceiverOptions(sdp, options) {
                            // Add legacy simulcast in SDP for safari.
                            if (this._isRtpEncodingParameters(options.video) && Utils.isSafari()) {
                                if (options.video.length > 1) {
                                    sdp = SdpUtils.addLegacySimulcast(sdp, 'video', options.video.length);
                                }
                            } // _videoCodecs is a workaround for setting video codecs. It will be moved to RTCRtpSendParameters.


                            if (this._isRtpEncodingParameters(options.video) && this._videoCodecs) {
                                sdp = SdpUtils.reorderCodecs(sdp, 'video', this._videoCodecs);
                                return sdp;
                            }

                            if (this._isRtpEncodingParameters(options.audio) || this._isRtpEncodingParameters(options.video)) {
                                return sdp;
                            }

                            sdp = this._setCodecOrder(sdp, options);
                            return sdp;
                        } // Handle stream event sent from MCU. Some stream events should be publication
                        // event or subscription event. It will be handled here.

                    }, {
                        key: "_onStreamEvent",
                        value: function _onStreamEvent(message) {
                            var eventTarget;

                            if (this._publication && message.id === this._publication.id) {
                                eventTarget = this._publication;
                            } else if (this._subscribedStream && message.id === this._subscribedStream.id) {
                                eventTarget = this._subscription;
                            }

                            if (!eventTarget) {
                                return;
                            }

                            var trackKind;

                            if (message.data.field === 'audio.status') {
                                trackKind = _mediaformat.TrackKind.AUDIO;
                            } else if (message.data.field === 'video.status') {
                                trackKind = _mediaformat.TrackKind.VIDEO;
                            } else {
                                _logger.default.warning('Invalid data field for stream update info.');
                            }

                            if (message.data.value === 'active') {
                                eventTarget.dispatchEvent(new _event.MuteEvent('unmute', {
                                    kind: trackKind
                                }));
                            } else if (message.data.value === 'inactive') {
                                eventTarget.dispatchEvent(new _event.MuteEvent('mute', {
                                    kind: trackKind
                                }));
                            } else {
                                _logger.default.warning('Invalid data value for stream update info.');
                            }
                        }
                    }, {
                        key: "_isRtpEncodingParameters",
                        value: function _isRtpEncodingParameters(obj) {
                            if (!Array.isArray(obj)) {
                                return false;
                            } // Only check the first one.


                            var param = obj[0];
                            return param.codecPayloadType || param.dtx || param.active || param.ptime || param.maxFramerate || param.scaleResolutionDownBy || param.rid;
                        }
                    }, {
                        key: "_isOwtEncodingParameters",
                        value: function _isOwtEncodingParameters(obj) {
                            if (!Array.isArray(obj)) {
                                return false;
                            } // Only check the first one.


                            var param = obj[0];
                            return !!param.codec;
                        }
                    }]);

                    return ConferencePeerConnectionChannel;
                }(_event.EventDispatcher);

            exports.ConferencePeerConnectionChannel = ConferencePeerConnectionChannel;

        }, {
            "../base/event.js": 3,
            "../base/logger.js": 5,
            "../base/mediaformat.js": 6,
            "../base/publication.js": 8,
            "../base/sdputils.js": 9,
            "../base/utils.js": 11,
            "./error.js": 14,
            "./subscription.js": 21
        }],
        13: [function (require, module, exports) {
// Copyright (C) <2018> Intel Corporation
//
// SPDX-License-Identifier: Apache-2.0

            /* global Map, Promise */
            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.ConferenceClient = void 0;

            var EventModule = _interopRequireWildcard(require("../base/event.js"));

            var _signaling = require("./signaling.js");

            var _logger = _interopRequireDefault(require("../base/logger.js"));

            var _base = require("../base/base64.js");

            var _error = require("./error.js");

            var Utils = _interopRequireWildcard(require("../base/utils.js"));

            var StreamModule = _interopRequireWildcard(require("../base/stream.js"));

            var _participant2 = require("./participant.js");

            var _info = require("./info.js");

            var _channel = require("./channel.js");

            var _mixedstream = require("./mixedstream.js");

            var StreamUtilsModule = _interopRequireWildcard(require("./streamutils.js"));

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {default: obj};
            }

            function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) {
                    return obj;
                } else {
                    var newObj = {};
                    if (obj != null) {
                        for (var key in obj) {
                            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                                var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                                if (desc.get || desc.set) {
                                    Object.defineProperty(newObj, key, desc);
                                } else {
                                    newObj[key] = obj[key];
                                }
                            }
                        }
                    }
                    newObj.default = obj;
                    return newObj;
                }
            }

            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }

            var SignalingState = {
                READY: 1,
                CONNECTING: 2,
                CONNECTED: 3
            };
            var protocolVersion = '1.1';
            /* eslint-disable valid-jsdoc */

            /**
             * @class ParticipantEvent
             * @classDesc Class ParticipantEvent represents a participant event.
             @extends Owt.Base.OwtEvent
             * @memberof Owt.Conference
             * @hideconstructor
             */

            var ParticipantEvent = function ParticipantEvent(type, init) {
                var that = new EventModule.OwtEvent(type, init);
                /**
                 * @member {Owt.Conference.Participant} participant
                 * @instance
                 * @memberof Owt.Conference.ParticipantEvent
                 */

                that.participant = init.participant;
                return that;
            };
            /* eslint-enable valid-jsdoc */

            /**
             * @class ConferenceClientConfiguration
             * @classDesc Configuration for ConferenceClient.
             * @memberOf Owt.Conference
             * @hideconstructor
             */


            var ConferenceClientConfiguration = // eslint-disable-line no-unused-vars
// eslint-disable-next-line require-jsdoc
                function ConferenceClientConfiguration() {
                    _classCallCheck(this, ConferenceClientConfiguration);

                    /**
                     * @member {?RTCConfiguration} rtcConfiguration
                     * @instance
                     * @memberof Owt.Conference.ConferenceClientConfiguration
                     * @desc It will be used for creating PeerConnection.
                     * @see {@link https://www.w3.org/TR/webrtc/#rtcconfiguration-dictionary|RTCConfiguration Dictionary of WebRTC 1.0}.
                     * @example
                     * // Following object can be set to conferenceClientConfiguration.rtcConfiguration.
                     * {
                     *   iceServers: [{
                     *      urls: "stun:example.com:3478"
                     *   }, {
                     *     urls: [
                     *       "turn:example.com:3478?transport=udp",
                     *       "turn:example.com:3478?transport=tcp"
                     *     ],
                     *      credential: "password",
                     *      username: "username"
                     *   }
                     * }
                     */
                    this.rtcConfiguration = undefined;
                };
            /**
             * @class ConferenceClient
             * @classdesc The ConferenceClient handles PeerConnections between client and server. For conference controlling, please refer to REST API guide.
             * Events:
             *
             * | Event Name            | Argument Type                    | Fired when       |
             * | --------------------- | ---------------------------------| ---------------- |
             * | streamadded           | Owt.Base.StreamEvent             | A new stream is available in the conference. |
             * | participantjoined     | Owt.Conference.ParticipantEvent  | A new participant joined the conference. |
             * | messagereceived       | Owt.Base.MessageEvent            | A new message is received. |
             * | serverdisconnected    | Owt.Base.OwtEvent                | Disconnected from conference server. |
             *
             * @memberof Owt.Conference
             * @extends Owt.Base.EventDispatcher
             * @constructor
             * @param {?Owt.Conference.ConferenceClientConfiguration } config Configuration for ConferenceClient.
             * @param {?Owt.Conference.SioSignaling } signalingImpl Signaling channel implementation for ConferenceClient. SDK uses default signaling channel implementation if this parameter is undefined. Currently, a Socket.IO signaling channel implementation was provided as ics.conference.SioSignaling. However, it is not recommended to directly access signaling channel or customize signaling channel for ConferenceClient as this time.
             */


            var ConferenceClient = function ConferenceClient(config, signalingImpl) {
                Object.setPrototypeOf(this, new EventModule.EventDispatcher());
                config = config || {};
                var self = this;
                var signalingState = SignalingState.READY;
                var signaling = signalingImpl ? signalingImpl : new _signaling.SioSignaling();
                var me;
                var room;
                var remoteStreams = new Map(); // Key is stream ID, value is a RemoteStream.

                var participants = new Map(); // Key is participant ID, value is a Participant object.

                var publishChannels = new Map(); // Key is MediaStream's ID, value is pc channel.

                var channels = new Map(); // Key is channel's internal ID, value is channel.

                /**
                 * @function onSignalingMessage
                 * @desc Received a message from conference portal. Defined in client-server protocol.
                 * @param {string} notification Notification type.
                 * @param {object} data Data received.
                 * @private
                 */

                function onSignalingMessage(notification, data) {
                    if (notification === 'soac' || notification === 'progress') {
                        if (!channels.has(data.id)) {
                            _logger.default.warning('Cannot find a channel for incoming data.');

                            return;
                        }

                        channels.get(data.id).onMessage(notification, data);
                    } else if (notification === 'stream') {
                        if (data.status === 'add') {
                            fireStreamAdded(data.data);
                        } else if (data.status === 'remove') {
                            fireStreamRemoved(data);
                        } else if (data.status === 'update') {
                            // Broadcast audio/video update status to channel so specific events can be fired on publication or subscription.
                            if (data.data.field === 'audio.status' || data.data.field === 'video.status') {
                                channels.forEach(function (c) {
                                    c.onMessage(notification, data);
                                });
                            } else if (data.data.field === 'activeInput') {
                                fireActiveAudioInputChange(data);
                            } else if (data.data.field === 'video.layout') {
                                fireLayoutChange(data);
                            } else if (data.data.field === '.') {
                                updateRemoteStream(data.data.value);
                            } else {
                                _logger.default.warning('Unknown stream event from MCU.');
                            }
                        }
                    } else if (notification === 'text') {
                        fireMessageReceived(data);
                    } else if (notification === 'participant') {
                        fireParticipantEvent(data);
                    }
                }

                signaling.addEventListener('data', function (event) {
                    onSignalingMessage(event.message.notification, event.message.data);
                });
                signaling.addEventListener('disconnect', function () {
                    clean();
                    signalingState = SignalingState.READY;
                    self.dispatchEvent(new EventModule.OwtEvent('serverdisconnected'));
                }); // eslint-disable-next-line require-jsdoc

                function fireParticipantEvent(data) {
                    if (data.action === 'join') {
                        data = data.data;
                        var participant = new _participant2.Participant(data.id, data.role, data.user);
                        participants.set(data.id, participant);
                        var event = new ParticipantEvent('participantjoined', {
                            participant: participant
                        });
                        self.dispatchEvent(event);
                    } else if (data.action === 'leave') {
                        var participantId = data.data;

                        if (!participants.has(participantId)) {
                            _logger.default.warning('Received leave message from MCU for an unknown participant.');

                            return;
                        }

                        var _participant = participants.get(participantId);

                        var _event = new ParticipantEvent('left', {
                            participant: _participant
                        });

                        self.dispatchEvent(_event);
                        participants.delete(participantId); //participant.dispatchEvent(new EventModule.OwtEvent('left'));
                    }
                } // eslint-disable-next-line require-jsdoc


                function fireMessageReceived(data) {
                    var messageEvent = new EventModule.MessageEvent('messagereceived', {
                        message: data.message,
                        origin: data.from,
                        to: data.to
                    });
                    self.dispatchEvent(messageEvent);
                } // eslint-disable-next-line require-jsdoc


                function fireStreamAdded(info) {
                    var stream = createRemoteStream(info);
                    remoteStreams.set(stream.id, stream);
                    var streamEvent = new StreamModule.StreamEvent('streamadded', {
                        stream: stream
                    });
                    self.dispatchEvent(streamEvent);
                } // eslint-disable-next-line require-jsdoc


                function fireStreamRemoved(info) {
                    if (!remoteStreams.has(info.id)) {
                        _logger.default.warning('Cannot find specific remote stream.');

                        return;
                    }

                    var stream = remoteStreams.get(info.id);
                    var streamEvent = new EventModule.OwtEvent('ended');
                    remoteStreams.delete(stream.id);
                    stream.dispatchEvent(streamEvent);
                } // eslint-disable-next-line require-jsdoc


                function fireActiveAudioInputChange(info) {
                    if (!remoteStreams.has(info.id)) {
                        _logger.default.warning('Cannot find specific remote stream.');

                        return;
                    }

                    var stream = remoteStreams.get(info.id);
                    var streamEvent = new _mixedstream.ActiveAudioInputChangeEvent('activeaudioinputchange', {
                        activeAudioInputStreamId: info.data.value
                    });
                    stream.dispatchEvent(streamEvent);
                } // eslint-disable-next-line require-jsdoc


                function fireLayoutChange(info) {
                    if (!remoteStreams.has(info.id)) {
                        _logger.default.warning('Cannot find specific remote stream.');

                        return;
                    }

                    var stream = remoteStreams.get(info.id);
                    var streamEvent = new _mixedstream.LayoutChangeEvent('layoutchange', {
                        layout: info.data.value
                    });
                    stream.dispatchEvent(streamEvent);
                } // eslint-disable-next-line require-jsdoc


                function updateRemoteStream(streamInfo) {
                    if (!remoteStreams.has(streamInfo.id)) {
                        _logger.default.warning('Cannot find specific remote stream.');

                        return;
                    }

                    var stream = remoteStreams.get(streamInfo.id);
                    stream.settings = StreamUtilsModule.convertToPublicationSettings(streamInfo.media);
                    stream.extraCapabilities = StreamUtilsModule.convertToSubscriptionCapabilities(streamInfo.media);
                    var streamEvent = new EventModule.OwtEvent('updated');
                    stream.dispatchEvent(streamEvent);
                } // eslint-disable-next-line require-jsdoc


                function createRemoteStream(streamInfo) {
                    if (streamInfo.type === 'mixed') {
                        return new _mixedstream.RemoteMixedStream(streamInfo);
                    } else {
                        var audioSourceInfo;
                        var videoSourceInfo;

                        if (streamInfo.media.audio) {
                            audioSourceInfo = streamInfo.media.audio.source;
                        }

                        if (streamInfo.media.video) {
                            videoSourceInfo = streamInfo.media.video.source;
                        }

                        var stream = new StreamModule.RemoteStream(streamInfo.id, streamInfo.info.owner, undefined, new StreamModule.StreamSourceInfo(audioSourceInfo, videoSourceInfo), streamInfo.info.attributes);
                        stream.settings = StreamUtilsModule.convertToPublicationSettings(streamInfo.media);
                        stream.extraCapabilities = StreamUtilsModule.convertToSubscriptionCapabilities(streamInfo.media);
                        return stream;
                    }
                } // eslint-disable-next-line require-jsdoc


                function sendSignalingMessage(type, message) {
                    return signaling.send(type, message);
                } // eslint-disable-next-line require-jsdoc


                function createPeerConnectionChannel() {
                    // Construct an signaling sender/receiver for ConferencePeerConnection.
                    var signalingForChannel = Object.create(EventModule.EventDispatcher);
                    signalingForChannel.sendSignalingMessage = sendSignalingMessage;
                    var pcc = new _channel.ConferencePeerConnectionChannel(config, signalingForChannel);
                    pcc.addEventListener('id', function (messageEvent) {
                        channels.set(messageEvent.message, pcc);
                    });
                    return pcc;
                } // eslint-disable-next-line require-jsdoc


                function clean() {
                    participants.clear();
                    remoteStreams.clear();
                }

                Object.defineProperty(this, 'info', {
                    configurable: false,
                    get: function get() {
                        if (!room) {
                            return null;
                        }

                        return new _info.ConferenceInfo(room.id, Array.from(participants, function (x) {
                            return x[1];
                        }), Array.from(remoteStreams, function (x) {
                            return x[1];
                        }), me);
                    }
                });
                /**
                 * @function join
                 * @instance
                 * @desc Join a conference.
                 * @memberof Owt.Conference.ConferenceClient
                 * @returns {Promise<ConferenceInfo, Error>} Return a promise resolved with current conference's information if successfully join the conference. Or return a promise rejected with a newly created Owt.Error if failed to join the conference.
                 * @param {string} tokenString Token is issued by conference server(nuve).
                 */

                this.join = function (tokenString) {
                    return new Promise(function (resolve, reject) {
                        var token = JSON.parse(_base.Base64.decodeBase64(tokenString));
                        var isSecured = token.secure === true;
                        var host = token.host;

                        if (typeof host !== 'string') {
                            reject(new _error.ConferenceError('Invalid host.'));
                            return;
                        }

                        if (host.indexOf('http') === -1) {
                            host = isSecured ? 'https://' + host : 'http://' + host;
                        }
                        console.log('host',host)
                        if (signalingState !== SignalingState.READY) {
                            reject(new _error.ConferenceError('connection state invalid'));
                            return;
                        }

                        signalingState = SignalingState.CONNECTING;
                        var loginInfo = {
                            token: tokenString,
                            userAgent: Utils.sysInfo(),
                            protocol: protocolVersion
                        };
                        signaling.connect(host, isSecured, loginInfo).then(function (resp) { //TODO??
                            signalingState = SignalingState.CONNECTED; // 信号状态
                            room = resp.room;

                            if (room.streams !== undefined) {
                                var _iteratorNormalCompletion = true;
                                var _didIteratorError = false;
                                var _iteratorError = undefined;

                                try {
                                    for (var _iterator = room.streams[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                        var st = _step.value;

                                        if (st.type === 'mixed') {
                                            st.viewport = st.info.label;
                                        }

                                        remoteStreams.set(st.id, createRemoteStream(st));
                                    }
                                } catch (err) {
                                    _didIteratorError = true;
                                    _iteratorError = err;
                                } finally {
                                    try {
                                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                                            _iterator.return();
                                        }
                                    } finally {
                                        if (_didIteratorError) {
                                            throw _iteratorError;
                                        }
                                    }
                                }
                            }

                            if (resp.room && resp.room.participants !== undefined) {
                                var _iteratorNormalCompletion2 = true;
                                var _didIteratorError2 = false;
                                var _iteratorError2 = undefined;

                                try {
                                    for (var _iterator2 = resp.room.participants[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                        var p = _step2.value;
                                        participants.set(p.id, new _participant2.Participant(p.id, p.role, p.user));

                                        if (p.id === resp.id) {
                                            me = participants.get(p.id);
                                        }
                                    }
                                } catch (err) {
                                    _didIteratorError2 = true;
                                    _iteratorError2 = err;
                                } finally {
                                    try {
                                        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                                            _iterator2.return();
                                        }
                                    } finally {
                                        if (_didIteratorError2) {
                                            throw _iteratorError2;
                                        }
                                    }
                                }
                            }

                            resolve(new _info.ConferenceInfo(resp.room.id, Array.from(participants.values()), Array.from(remoteStreams.values()), me));
                        }, function (e) {
                            signalingState = SignalingState.READY;
                            reject(new _error.ConferenceError(e));
                        });
                    });
                };
                /**
                 * @function publish
                 * @memberof Owt.Conference.ConferenceClient
                 * @instance
                 * @desc Publish a LocalStream to conference server. Other participants will be able to subscribe this stream when it is successfully published.
                 * @param {Owt.Base.LocalStream} stream The stream to be published.
                 * @param {Owt.Base.PublishOptions} options Options for publication.
                 * @param {string[]} videoCodecs Video codec names for publishing. Valid values are 'VP8', 'VP9' and 'H264'. This parameter only valid when options.video is RTCRtpEncodingParameters. Publishing with RTCRtpEncodingParameters is an experimental feature. This parameter is subject to change.
                 * @returns {Promise<Publication, Error>} Returned promise will be resolved with a newly created Publication once specific stream is successfully published, or rejected with a newly created Error if stream is invalid or options cannot be satisfied. Successfully published means PeerConnection is established and server is able to process media data.
                 */


                this.publish = function (stream, options, videoCodecs) {
                    if (!(stream instanceof StreamModule.LocalStream)) {
                        return Promise.reject(new _error.ConferenceError('Invalid stream.'));
                    }

                    if (publishChannels.has(stream.mediaStream.id)) {
                        return Promise.reject(new _error.ConferenceError('Cannot publish a published stream.'));
                    }

                    var channel = createPeerConnectionChannel();
                    return channel.publish(stream, options, videoCodecs);
                };
                /**
                 * @function subscribe
                 * @memberof Owt.Conference.ConferenceClient
                 * @instance
                 * @desc Subscribe a RemoteStream from conference server.
                 * @param {Owt.Base.RemoteStream} stream The stream to be subscribed.
                 * @param {Owt.Conference.SubscribeOptions} options Options for subscription.
                 * @returns {Promise<Subscription, Error>} Returned promise will be resolved with a newly created Subscription once specific stream is successfully subscribed, or rejected with a newly created Error if stream is invalid or options cannot be satisfied. Successfully subscribed means PeerConnection is established and server was started to send media data.
                 */


                this.subscribe = function (stream, options) {
                    if (!(stream instanceof StreamModule.RemoteStream)) {
                        return Promise.reject(new _error.ConferenceError('Invalid stream.'));
                    }

                    var channel = createPeerConnectionChannel();
                    return channel.subscribe(stream, options);
                };
                /**
                 * @function send
                 * @memberof Owt.Conference.ConferenceClient
                 * @instance
                 * @desc Send a text message to a participant or all participants.
                 * @param {string} message Message to be sent.
                 * @param {string} participantId Receiver of this message. Message will be sent to all participants if participantId is undefined.
                 * @return {Promise<void, Error>} Returned promise will be resolved when conference server received certain message.
                 */


                this.send = function (message, participantId) {
                    if (participantId === undefined) {
                        participantId = 'all';
                    }

                    return sendSignalingMessage('text', {
                        to: participantId,
                        message: message
                    });
                };
                /**
                 * @function leave
                 * @memberOf Owt.Conference.ConferenceClient
                 * @instance
                 * @desc Leave a conference.
                 * @return {Promise<void, Error>} Returned promise will be resolved with undefined once the connection is disconnected.
                 */


                this.leave = function () {
                    return signaling.disconnect().then(function () {
                        clean();
                        signalingState = SignalingState.READY;
                    });
                };
            };

            exports.ConferenceClient = ConferenceClient;

        }, {
            "../base/base64.js": 1,
            "../base/event.js": 3,
            "../base/logger.js": 5,
            "../base/stream.js": 10,
            "../base/utils.js": 11,
            "./channel.js": 12,
            "./error.js": 14,
            "./info.js": 16,
            "./mixedstream.js": 17,
            "./participant.js": 18,
            "./signaling.js": 19,
            "./streamutils.js": 20
        }],
        14: [function (require, module, exports) {
// Copyright (C) <2018> Intel Corporation
//
// SPDX-License-Identifier: Apache-2.0
            'use strict';
            /**
             * @class ConferenceError
             * @classDesc The ConferenceError object represents an error in conference mode.
             * @memberOf Owt.Conference
             * @hideconstructor
             */

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.ConferenceError = void 0;

            function _typeof(obj) {
                if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                    _typeof = function _typeof(obj) {
                        return typeof obj;
                    };
                } else {
                    _typeof = function _typeof(obj) {
                        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                    };
                }
                return _typeof(obj);
            }

            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }

            function _possibleConstructorReturn(self, call) {
                if (call && (_typeof(call) === "object" || typeof call === "function")) {
                    return call;
                }
                return _assertThisInitialized(self);
            }

            function _assertThisInitialized(self) {
                if (self === void 0) {
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                }
                return self;
            }

            function _inherits(subClass, superClass) {
                if (typeof superClass !== "function" && superClass !== null) {
                    throw new TypeError("Super expression must either be null or a function");
                }
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        writable: true,
                        configurable: true
                    }
                });
                if (superClass) _setPrototypeOf(subClass, superClass);
            }

            function _wrapNativeSuper(Class) {
                var _cache = typeof Map === "function" ? new Map() : undefined;
                _wrapNativeSuper = function _wrapNativeSuper(Class) {
                    if (Class === null || !_isNativeFunction(Class)) return Class;
                    if (typeof Class !== "function") {
                        throw new TypeError("Super expression must either be null or a function");
                    }
                    if (typeof _cache !== "undefined") {
                        if (_cache.has(Class)) return _cache.get(Class);
                        _cache.set(Class, Wrapper);
                    }

                    function Wrapper() {
                        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
                    }

                    Wrapper.prototype = Object.create(Class.prototype, {
                        constructor: {
                            value: Wrapper,
                            enumerable: false,
                            writable: true,
                            configurable: true
                        }
                    });
                    return _setPrototypeOf(Wrapper, Class);
                };
                return _wrapNativeSuper(Class);
            }

            function isNativeReflectConstruct() {
                if (typeof Reflect === "undefined" || !Reflect.construct) return false;
                if (Reflect.construct.sham) return false;
                if (typeof Proxy === "function") return true;
                try {
                    Date.prototype.toString.call(Reflect.construct(Date, [], function () {
                    }));
                    return true;
                } catch (e) {
                    return false;
                }
            }

            function _construct(Parent, args, Class) {
                if (isNativeReflectConstruct()) {
                    _construct = Reflect.construct;
                } else {
                    _construct = function _construct(Parent, args, Class) {
                        var a = [null];
                        a.push.apply(a, args);
                        var Constructor = Function.bind.apply(Parent, a);
                        var instance = new Constructor();
                        if (Class) _setPrototypeOf(instance, Class.prototype);
                        return instance;
                    };
                }
                return _construct.apply(null, arguments);
            }

            function _isNativeFunction(fn) {
                return Function.toString.call(fn).indexOf("[native code]") !== -1;
            }

            function _setPrototypeOf(o, p) {
                _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
                    o.__proto__ = p;
                    return o;
                };
                return _setPrototypeOf(o, p);
            }

            function _getPrototypeOf(o) {
                _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
                    return o.__proto__ || Object.getPrototypeOf(o);
                };
                return _getPrototypeOf(o);
            }

            var ConferenceError =
                /*#__PURE__*/
                function (_Error) {
                    _inherits(ConferenceError, _Error);

                    // eslint-disable-next-line require-jsdoc
                    function ConferenceError(message) {
                        _classCallCheck(this, ConferenceError);

                        return _possibleConstructorReturn(this, _getPrototypeOf(ConferenceError).call(this, message));
                    }

                    return ConferenceError;
                }(_wrapNativeSuper(Error));

            exports.ConferenceError = ConferenceError;

        }, {}],
        15: [function (require, module, exports) {
// Copyright (C) <2018> Intel Corporation
//
// SPDX-License-Identifier: Apache-2.0
            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            Object.defineProperty(exports, "ConferenceClient", {
                enumerable: true,
                get: function get() {
                    return _client.ConferenceClient;
                }
            });
            Object.defineProperty(exports, "SioSignaling", {
                enumerable: true,
                get: function get() {
                    return _signaling.SioSignaling;
                }
            });

            var _client = require("./client.js");

            var _signaling = require("./signaling.js");

        }, {"./client.js": 13, "./signaling.js": 19}],
        16: [function (require, module, exports) {
// Copyright (C) <2018> Intel Corporation
//
// SPDX-License-Identifier: Apache-2.0
            'use strict';
            /**
             * @class ConferenceInfo
             * @classDesc Information for a conference.
             * @memberOf Owt.Conference
             * @hideconstructor
             */

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.ConferenceInfo = void 0;

            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }

            var ConferenceInfo = // eslint-disable-next-line require-jsdoc
                function ConferenceInfo(id, participants, remoteStreams, myInfo) {
                    _classCallCheck(this, ConferenceInfo);

                    /**
                     * @member {string} id
                     * @instance
                     * @memberof Owt.Conference.ConferenceInfo
                     * @desc Conference ID.
                     */
                    this.id = id;
                    /**
                     * @member {Array<Owt.Conference.Participant>} participants
                     * @instance
                     * @memberof Owt.Conference.ConferenceInfo
                     * @desc Participants in the conference.
                     */

                    this.participants = participants;
                    /**
                     * @member {Array<Owt.Base.RemoteStream>} remoteStreams
                     * @instance
                     * @memberof Owt.Conference.ConferenceInfo
                     * @desc Streams published by participants. It also includes streams published by current user.
                     */

                    this.remoteStreams = remoteStreams;
                    /**
                     * @member {Owt.Base.Participant} self
                     * @instance
                     * @memberof Owt.Conference.ConferenceInfo
                     */

                    this.self = myInfo;
                };

            exports.ConferenceInfo = ConferenceInfo;

        }, {}],
        17: [function (require, module, exports) {
// Copyright (C) <2018> Intel Corporation
//
// SPDX-License-Identifier: Apache-2.0
            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.LayoutChangeEvent = exports.ActiveAudioInputChangeEvent = exports.RemoteMixedStream = void 0;

            var StreamModule = _interopRequireWildcard(require("../base/stream.js"));

            var StreamUtilsModule = _interopRequireWildcard(require("./streamutils.js"));

            var _event = require("../base/event.js");

            function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) {
                    return obj;
                } else {
                    var newObj = {};
                    if (obj != null) {
                        for (var key in obj) {
                            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                                var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                                if (desc.get || desc.set) {
                                    Object.defineProperty(newObj, key, desc);
                                } else {
                                    newObj[key] = obj[key];
                                }
                            }
                        }
                    }
                    newObj.default = obj;
                    return newObj;
                }
            }

            function _typeof(obj) {
                if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                    _typeof = function _typeof(obj) {
                        return typeof obj;
                    };
                } else {
                    _typeof = function _typeof(obj) {
                        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                    };
                }
                return _typeof(obj);
            }

            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }

            function _possibleConstructorReturn(self, call) {
                if (call && (_typeof(call) === "object" || typeof call === "function")) {
                    return call;
                }
                return _assertThisInitialized(self);
            }

            function _assertThisInitialized(self) {
                if (self === void 0) {
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                }
                return self;
            }

            function _getPrototypeOf(o) {
                _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
                    return o.__proto__ || Object.getPrototypeOf(o);
                };
                return _getPrototypeOf(o);
            }

            function _inherits(subClass, superClass) {
                if (typeof superClass !== "function" && superClass !== null) {
                    throw new TypeError("Super expression must either be null or a function");
                }
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        writable: true,
                        configurable: true
                    }
                });
                if (superClass) _setPrototypeOf(subClass, superClass);
            }

            function _setPrototypeOf(o, p) {
                _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
                    o.__proto__ = p;
                    return o;
                };
                return _setPrototypeOf(o, p);
            }

            /**
             * @class RemoteMixedStream
             * @classDesc Mixed stream from conference server.
             * Events:
             *
             * | Event Name             | Argument Type    | Fired when       |
             * | -----------------------| ---------------- | ---------------- |
             * | activeaudioinputchange | Event            | Audio activeness of input stream (of the mixed stream) is changed. |
             * | layoutchange           | Event            | Video's layout has been changed. It usually happens when a new video is mixed into the target mixed stream or an existing video has been removed from mixed stream. |
             *
             * @memberOf Owt.Conference
             * @extends Owt.Base.RemoteStream
             * @hideconstructor
             */
            var RemoteMixedStream =
                /*#__PURE__*/
                function (_StreamModule$RemoteS) {
                    _inherits(RemoteMixedStream, _StreamModule$RemoteS);

                    // eslint-disable-next-line require-jsdoc
                    function RemoteMixedStream(info) {
                        var _this;

                        _classCallCheck(this, RemoteMixedStream);

                        if (info.type !== 'mixed') {
                            throw new TypeError('Not a mixed stream');
                        }

                        _this = _possibleConstructorReturn(this, _getPrototypeOf(RemoteMixedStream).call(this, info.id, undefined, undefined, new StreamModule.StreamSourceInfo('mixed', 'mixed')));
                        _this.settings = StreamUtilsModule.convertToPublicationSettings(info.media);
                        _this.extraCapabilities = new StreamUtilsModule.convertToSubscriptionCapabilities(info.media);
                        return _this;
                    }

                    return RemoteMixedStream;
                }(StreamModule.RemoteStream);
            /**
             * @class ActiveAudioInputChangeEvent
             * @classDesc Class ActiveAudioInputChangeEvent represents an active audio input change event.
             * @memberof Owt.Conference
             * @hideconstructor
             */


            exports.RemoteMixedStream = RemoteMixedStream;

            var ActiveAudioInputChangeEvent =
                /*#__PURE__*/
                function (_OwtEvent) {
                    _inherits(ActiveAudioInputChangeEvent, _OwtEvent);

                    // eslint-disable-next-line require-jsdoc
                    function ActiveAudioInputChangeEvent(type, init) {
                        var _this2;

                        _classCallCheck(this, ActiveAudioInputChangeEvent);

                        _this2 = _possibleConstructorReturn(this, _getPrototypeOf(ActiveAudioInputChangeEvent).call(this, type));
                        /**
                         * @member {string} activeAudioInputStreamId
                         * @instance
                         * @memberof Owt.Conference.ActiveAudioInputChangeEvent
                         * @desc The ID of input stream(of the mixed stream) whose audio is active.
                         */

                        _this2.activeAudioInputStreamId = init.activeAudioInputStreamId;
                        return _this2;
                    }

                    return ActiveAudioInputChangeEvent;
                }(_event.OwtEvent);
            /**
             * @class LayoutChangeEvent
             * @classDesc Class LayoutChangeEvent represents an video layout change event.
             * @memberof Owt.Conference
             * @hideconstructor
             */


            exports.ActiveAudioInputChangeEvent = ActiveAudioInputChangeEvent;

            var LayoutChangeEvent =
                /*#__PURE__*/
                function (_OwtEvent2) {
                    _inherits(LayoutChangeEvent, _OwtEvent2);

                    // eslint-disable-next-line require-jsdoc
                    function LayoutChangeEvent(type, init) {
                        var _this3;

                        _classCallCheck(this, LayoutChangeEvent);

                        _this3 = _possibleConstructorReturn(this, _getPrototypeOf(LayoutChangeEvent).call(this, type));
                        /**
                         * @member {object} layout
                         * @instance
                         * @memberof Owt.Conference.LayoutChangeEvent
                         * @desc Current video's layout. It's an array of map which maps each stream to a region.
                         */

                        _this3.layout = init.layout;
                        return _this3;
                    }

                    return LayoutChangeEvent;
                }(_event.OwtEvent);

            exports.LayoutChangeEvent = LayoutChangeEvent;

        }, {"../base/event.js": 3, "../base/stream.js": 10, "./streamutils.js": 20}],
        18: [function (require, module, exports) {
            "use strict";

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.Participant = void 0;

            var EventModule = _interopRequireWildcard(require("../base/event.js"));

            function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) {
                    return obj;
                } else {
                    var newObj = {};
                    if (obj != null) {
                        for (var key in obj) {
                            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                                var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                                if (desc.get || desc.set) {
                                    Object.defineProperty(newObj, key, desc);
                                } else {
                                    newObj[key] = obj[key];
                                }
                            }
                        }
                    }
                    newObj.default = obj;
                    return newObj;
                }
            }

            function _typeof(obj) {
                if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                    _typeof = function _typeof(obj) {
                        return typeof obj;
                    };
                } else {
                    _typeof = function _typeof(obj) {
                        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                    };
                }
                return _typeof(obj);
            }

            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }

            function _possibleConstructorReturn(self, call) {
                if (call && (_typeof(call) === "object" || typeof call === "function")) {
                    return call;
                }
                return _assertThisInitialized(self);
            }

            function _getPrototypeOf(o) {
                _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
                    return o.__proto__ || Object.getPrototypeOf(o);
                };
                return _getPrototypeOf(o);
            }

            function _inherits(subClass, superClass) {
                if (typeof superClass !== "function" && superClass !== null) {
                    throw new TypeError("Super expression must either be null or a function");
                }
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        writable: true,
                        configurable: true
                    }
                });
                if (superClass) _setPrototypeOf(subClass, superClass);
            }

            function _setPrototypeOf(o, p) {
                _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
                    o.__proto__ = p;
                    return o;
                };
                return _setPrototypeOf(o, p);
            }

            function _assertThisInitialized(self) {
                if (self === void 0) {
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                }
                return self;
            }

            'use strict';
            /**
             * @class Participant
             * @memberOf Owt.Conference
             * @classDesc The Participant defines a participant in a conference.
             * Events:
             *
             * | Event Name      | Argument Type      | Fired when       |
             * | ----------------| ------------------ | ---------------- |
             * | left            | Owt.Base.OwtEvent  | The participant left the conference. |
             *
             * @extends Owt.Base.EventDispatcher
             * @hideconstructor
             */


            var Participant =
                /*#__PURE__*/
                function (_EventModule$EventDis) {
                    _inherits(Participant, _EventModule$EventDis);

                    // eslint-disable-next-line require-jsdoc
                    function Participant(id, role, userId) {
                        var _this;

                        _classCallCheck(this, Participant);

                        _this = _possibleConstructorReturn(this, _getPrototypeOf(Participant).call(this));
                        /**
                         * @member {string} id
                         * @instance
                         * @memberof Owt.Conference.Participant
                         * @desc The ID of the participant. It varies when a single user join different conferences.
                         */

                        Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), 'id', {
                            configurable: false,
                            writable: false,
                            value: id
                        });
                        /**
                         * @member {string} role
                         * @instance
                         * @memberof Owt.Conference.Participant
                         */

                        Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), 'role', {
                            configurable: false,
                            writable: false,
                            value: role
                        });
                        /**
                         * @member {string} userId
                         * @instance
                         * @memberof Owt.Conference.Participant
                         * @desc The user ID of the participant. It can be integrated into existing account management system.
                         */

                        Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), 'userId', {
                            configurable: false,
                            writable: false,
                            value: userId
                        });
                        return _this;
                    }

                    return Participant;
                }(EventModule.EventDispatcher);

            exports.Participant = Participant;

        }, {"../base/event.js": 3}],
        19: [function (require, module, exports) {
            "use strict";

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.SioSignaling = void 0;

            var _logger = _interopRequireDefault(require("../base/logger.js"));

            var EventModule = _interopRequireWildcard(require("../base/event.js"));

            var _error = require("./error.js");

            var _base = require("../base/base64.js");

            function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) {
                    return obj;
                } else {
                    var newObj = {};
                    if (obj != null) {
                        for (var key in obj) {
                            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                                var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                                if (desc.get || desc.set) {
                                    Object.defineProperty(newObj, key, desc);
                                } else {
                                    newObj[key] = obj[key];
                                }
                            }
                        }
                    }
                    newObj.default = obj;
                    return newObj;
                }
            }

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {default: obj};
            }

            function _typeof(obj) {
                if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                    _typeof = function _typeof(obj) {
                        return typeof obj;
                    };
                } else {
                    _typeof = function _typeof(obj) {
                        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                    };
                }
                return _typeof(obj);
            }

            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }

            function _defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            function _createClass(Constructor, protoProps, staticProps) {
                if (protoProps) _defineProperties(Constructor.prototype, protoProps);
                if (staticProps) _defineProperties(Constructor, staticProps);
                return Constructor;
            }

            function _possibleConstructorReturn(self, call) {
                if (call && (_typeof(call) === "object" || typeof call === "function")) {
                    return call;
                }
                return _assertThisInitialized(self);
            }

            function _assertThisInitialized(self) {
                if (self === void 0) {
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                }
                return self;
            }

            function _getPrototypeOf(o) {
                _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
                    return o.__proto__ || Object.getPrototypeOf(o);
                };
                return _getPrototypeOf(o);
            }

            function _inherits(subClass, superClass) {
                if (typeof superClass !== "function" && superClass !== null) {
                    throw new TypeError("Super expression must either be null or a function");
                }
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        writable: true,
                        configurable: true
                    }
                });
                if (superClass) _setPrototypeOf(subClass, superClass);
            }

            function _setPrototypeOf(o, p) {
                _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
                    o.__proto__ = p;
                    return o;
                };
                return _setPrototypeOf(o, p);
            }

            'use strict';

            var reconnectionAttempts = 10; // eslint-disable-next-line require-jsdoc

            function handleResponse(status, data, resolve, reject) {
                if (status === 'ok' || status === 'success') {
                    resolve(data);
                } else if (status === 'error') {
                    reject(data);
                } else {
                    _logger.default.error('MCU returns unknown ack.');
                }
            }

            /**
             * @class SioSignaling
             * @classdesc Socket.IO signaling channel for ConferenceClient. It is not recommended to directly access this class.
             * @memberof Owt.Conference
             * @extends Owt.Base.EventDispatcher
             * @constructor
             */


            var SioSignaling =
                /*#__PURE__*/
                function (_EventModule$EventDis) {
                    _inherits(SioSignaling, _EventModule$EventDis);

                    // eslint-disable-next-line require-jsdoc
                    function SioSignaling() {
                        var _this;

                        _classCallCheck(this, SioSignaling);

                        _this = _possibleConstructorReturn(this, _getPrototypeOf(SioSignaling).call(this));
                        _this._socket = null;
                        _this._loggedIn = false;
                        _this._reconnectTimes = 0;
                        _this._reconnectionTicket = null;
                        _this._refreshReconnectionTicket = null;
                        return _this;
                    }

                    /**
                     * @function connect
                     * @instance
                     * @desc Connect to a portal.
                     * @memberof Oms.Conference.SioSignaling
                     * @return {Promise<Object, Error>} Return a promise resolved with the data returned by portal if successfully logged in. Or return a promise rejected with a newly created Oms.Error if failed.
                     * @param {string} host Host of the portal.
                     * @param {string} isSecured Is secure connection or not.
                     * @param {string} loginInfo Infomation required for logging in.
                     * @private.
                     */


                    _createClass(SioSignaling, [{
                        key: "connect",
                        value: function connect(host, isSecured, loginInfo) {
                            var _this2 = this;

                            return new Promise(function (resolve, reject) {
                                var opts = {
                                    'reconnection': true,
                                    'reconnectionAttempts': reconnectionAttempts,
                                    'force new connection': true
                                };
                                _this2._socket = io(host, opts);
                                ['participant', 'text', 'stream', 'progress'].forEach(function (notification) {
                                    _this2._socket.on(notification, function (data) {
                                        _this2.dispatchEvent(new EventModule.MessageEvent('data', {
                                            message: {
                                                notification: notification,
                                                data: data
                                            }
                                        }));
                                    });
                                });

                                _this2._socket.on('reconnecting', function () {
                                    _this2._reconnectTimes++;
                                });

                                _this2._socket.on('reconnect_failed', function () {
                                    if (_this2._reconnectTimes >= reconnectionAttempts) {
                                        _this2.dispatchEvent(new EventModule.OwtEvent('disconnect'));
                                    }
                                });

                                _this2._socket.on('connect_error', function (e) {
                                    reject("connect_error:".concat(host));
                                });

                                _this2._socket.on('drop', function () {
                                    _this2._reconnectTimes = reconnectionAttempts;
                                });

                                _this2._socket.on('disconnect', function () {
                                    _this2._clearReconnectionTask();

                                    if (_this2._reconnectTimes >= reconnectionAttempts) {
                                        _this2._loggedIn = false;

                                        _this2.dispatchEvent(new EventModule.OwtEvent('disconnect'));
                                    }
                                });

                                _this2._socket.emit('login', loginInfo, function (status, data) {
                                    if (status === 'ok') {
                                        _this2._loggedIn = true;

                                        _this2._onReconnectionTicket(data.reconnectionTicket);

                                        _this2._socket.on('connect', function () {
                                            // re-login with reconnection ticket.
                                            _this2._socket.emit('relogin', _this2._reconnectionTicket, function (status, data) {
                                                if (status === 'ok') {
                                                    _this2._reconnectTimes = 0;

                                                    _this2._onReconnectionTicket(data);
                                                } else {
                                                    _this2.dispatchEvent(new EventModule.OwtEvent('disconnect'));
                                                }
                                            });
                                        });
                                    }

                                    handleResponse(status, data, resolve, reject);
                                });
                            });
                        }
                        /**
                         * @function disconnect
                         * @instance
                         * @desc Disconnect from a portal.
                         * @memberof Oms.Conference.SioSignaling
                         * @return {Promise<Object, Error>} Return a promise resolved with the data returned by portal if successfully disconnected. Or return a promise rejected with a newly created Oms.Error if failed.
                         * @private.
                         */

                    }, {
                        key: "disconnect",
                        value: function disconnect() {
                            var _this3 = this;

                            if (!this._socket || this._socket.disconnected) {
                                return Promise.reject(new _error.ConferenceError('Portal is not connected.'));
                            }

                            return new Promise(function (resolve, reject) {
                                _this3._socket.emit('logout', function (status, data) {
                                    // Maximize the reconnect times to disable reconnection.
                                    _this3._reconnectTimes = reconnectionAttempts;

                                    _this3._socket.disconnect();

                                    handleResponse(status, data, resolve, reject);
                                });
                            });
                        }
                        /**
                         * @function send
                         * @instance
                         * @desc Send data to portal.
                         * @memberof Oms.Conference.SioSignaling
                         * @return {Promise<Object, Error>} Return a promise resolved with the data returned by portal. Or return a promise rejected with a newly created Oms.Error if failed to send the message.
                         * @param {string} requestName Name defined in client-server protocol.
                         * @param {string} requestData Data format is defined in client-server protocol.
                         * @private.
                         */

                    }, {
                        key: "send",
                        value: function send(requestName, requestData) {
                            var _this4 = this;

                            return new Promise(function (resolve, reject) {
                                _this4._socket.emit(requestName, requestData, function (status, data) {
                                    handleResponse(status, data, resolve, reject);
                                });
                            });
                        }
                        /**
                         * @function _onReconnectionTicket
                         * @instance
                         * @desc Parse reconnection ticket and schedule ticket refreshing.
                         * @memberof Owt.Conference.SioSignaling
                         * @private.
                         */

                    }, {
                        key: "_onReconnectionTicket",
                        value: function _onReconnectionTicket(ticketString) {
                            var _this5 = this;

                            this._reconnectionTicket = ticketString;
                            var ticket = JSON.parse(_base.Base64.decodeBase64(ticketString)); // Refresh ticket 1 min or 10 seconds before it expires.

                            var now = Date.now();
                            var millisecondsInOneMinute = 60 * 1000;
                            var millisecondsInTenSeconds = 10 * 1000;

                            if (ticket.notAfter <= now - millisecondsInTenSeconds) {
                                _logger.default.warning('Reconnection ticket expires too soon.');

                                return;
                            }

                            var refreshAfter = ticket.notAfter - now - millisecondsInOneMinute;

                            if (refreshAfter < 0) {
                                refreshAfter = ticket.notAfter - now - millisecondsInTenSeconds;
                            }

                            this._clearReconnectionTask();

                            this._refreshReconnectionTicket = setTimeout(function () {
                                _this5._socket.emit('refreshReconnectionTicket', function (status, data) {
                                    if (status !== 'ok') {
                                        _logger.default.warning('Failed to refresh reconnection ticket.');

                                        return;
                                    }

                                    _this5._onReconnectionTicket(data);
                                });
                            }, refreshAfter);
                        }
                    }, {
                        key: "_clearReconnectionTask",
                        value: function _clearReconnectionTask() {
                            clearTimeout(this._refreshReconnectionTicket);
                            this._refreshReconnectionTicket = null;
                        }
                    }]);

                    return SioSignaling;
                }(EventModule.EventDispatcher);

            exports.SioSignaling = SioSignaling;

        }, {"../base/base64.js": 1, "../base/event.js": 3, "../base/logger.js": 5, "./error.js": 14}],
        20: [function (require, module, exports) {
// Copyright (C) <2018> Intel Corporation
//
// SPDX-License-Identifier: Apache-2.0
// This file doesn't have public APIs.

            /* eslint-disable valid-jsdoc */
            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.convertToPublicationSettings = convertToPublicationSettings;
            exports.convertToSubscriptionCapabilities = convertToSubscriptionCapabilities;

            var PublicationModule = _interopRequireWildcard(require("../base/publication.js"));

            var MediaFormatModule = _interopRequireWildcard(require("../base/mediaformat.js"));

            var CodecModule = _interopRequireWildcard(require("../base/codec.js"));

            var SubscriptionModule = _interopRequireWildcard(require("./subscription.js"));

            function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) {
                    return obj;
                } else {
                    var newObj = {};
                    if (obj != null) {
                        for (var key in obj) {
                            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                                var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                                if (desc.get || desc.set) {
                                    Object.defineProperty(newObj, key, desc);
                                } else {
                                    newObj[key] = obj[key];
                                }
                            }
                        }
                    }
                    newObj.default = obj;
                    return newObj;
                }
            }

            /**
             * @function extractBitrateMultiplier
             * @desc Extract bitrate multiplier from a string like "x0.2".
             * @return {Promise<Object, Error>} The float number after "x".
             * @private
             */
            function extractBitrateMultiplier(input) {
                if (typeof input !== 'string' || !input.startsWith('x')) {
                    L.Logger.warning('Invalid bitrate multiplier input.');
                    return 0;
                }

                return Number.parseFloat(input.replace(/^x/, ''));
            } // eslint-disable-next-line require-jsdoc


            function sortNumbers(x, y) {
                return x - y;
            } // eslint-disable-next-line require-jsdoc


            function sortResolutions(x, y) {
                if (x.width !== y.width) {
                    return x.width - y.width;
                } else {
                    return x.height - y.height;
                }
            }

            /**
             * @function convertToPublicationSettings
             * @desc Convert mediaInfo received from server to PublicationSettings.
             * @private
             */


            function convertToPublicationSettings(mediaInfo) {
                var audio = [],
                    video = [];
                var audioCodec, videoCodec, resolution, framerate, bitrate, keyFrameInterval, rid;

                if (mediaInfo.audio) {
                    if (mediaInfo.audio.format) {
                        audioCodec = new CodecModule.AudioCodecParameters(mediaInfo.audio.format.codec, mediaInfo.audio.format.channelNum, mediaInfo.audio.format.sampleRate);
                    }

                    audio.push(new PublicationModule.AudioPublicationSettings(audioCodec));
                }

                if (mediaInfo.video) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = mediaInfo.video.original[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var videoInfo = _step.value;

                            if (videoInfo.format) {
                                videoCodec = new CodecModule.VideoCodecParameters(videoInfo.format.codec, videoInfo.format.profile);
                            }

                            if (videoInfo.parameters) {
                                if (videoInfo.parameters.resolution) {
                                    resolution = new MediaFormatModule.Resolution(videoInfo.parameters.resolution.width, videoInfo.parameters.resolution.height);
                                }

                                framerate = videoInfo.parameters.framerate;
                                bitrate = videoInfo.parameters.bitrate * 1000;
                                keyFrameInterval = videoInfo.parameters.keyFrameInterval;
                            }

                            if (videoInfo.simulcastRid) {
                                rid = videoInfo.simulcastRid;
                            }

                            video.push(new PublicationModule.VideoPublicationSettings(videoCodec, resolution, framerate, bitrate, keyFrameInterval, rid));
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return != null) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                }

                return new PublicationModule.PublicationSettings(audio, video);
            }

            /**
             * @function convertToSubscriptionCapabilities
             * @desc Convert mediaInfo received from server to SubscriptionCapabilities.
             * @private
             */


            function convertToSubscriptionCapabilities(mediaInfo) {
                var audio;
                var video;

                if (mediaInfo.audio) {
                    var audioCodecs = [];

                    if (mediaInfo.audio && mediaInfo.audio.optional && mediaInfo.audio.optional.format) {
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                            for (var _iterator2 = mediaInfo.audio.optional.format[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var audioCodecInfo = _step2.value;
                                var audioCodec = new CodecModule.AudioCodecParameters(audioCodecInfo.codec, audioCodecInfo.channelNum, audioCodecInfo.sampleRate);
                                audioCodecs.push(audioCodec);
                            }
                        } catch (err) {
                            _didIteratorError2 = true;
                            _iteratorError2 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                                    _iterator2.return();
                                }
                            } finally {
                                if (_didIteratorError2) {
                                    throw _iteratorError2;
                                }
                            }
                        }
                    }

                    audioCodecs.sort();
                    audio = new SubscriptionModule.AudioSubscriptionCapabilities(audioCodecs);
                }

                if (mediaInfo.video) {
                    var videoCodecs = [];

                    if (mediaInfo.video && mediaInfo.video.optional && mediaInfo.video.optional.format) {
                        var _iteratorNormalCompletion3 = true;
                        var _didIteratorError3 = false;
                        var _iteratorError3 = undefined;

                        try {
                            for (var _iterator3 = mediaInfo.video.optional.format[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                var videoCodecInfo = _step3.value;
                                var videoCodec = new CodecModule.VideoCodecParameters(videoCodecInfo.codec, videoCodecInfo.profile);
                                videoCodecs.push(videoCodec);
                            }
                        } catch (err) {
                            _didIteratorError3 = true;
                            _iteratorError3 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                                    _iterator3.return();
                                }
                            } finally {
                                if (_didIteratorError3) {
                                    throw _iteratorError3;
                                }
                            }
                        }
                    }

                    videoCodecs.sort();

                    if (mediaInfo.video && mediaInfo.video.optional && mediaInfo.video.optional.parameters) {
                        var resolutions = Array.from(mediaInfo.video.optional.parameters.resolution, function (r) {
                            return new MediaFormatModule.Resolution(r.width, r.height);
                        });
                        resolutions.sort(sortResolutions);
                        var bitrates = Array.from(mediaInfo.video.optional.parameters.bitrate, function (bitrate) {
                            return extractBitrateMultiplier(bitrate);
                        });
                        bitrates.push(1.0);
                        bitrates.sort(sortNumbers);
                        var frameRates = JSON.parse(JSON.stringify(mediaInfo.video.optional.parameters.framerate));
                        frameRates.sort(sortNumbers);
                        var keyFrameIntervals = JSON.parse(JSON.stringify(mediaInfo.video.optional.parameters.keyFrameInterval));
                        keyFrameIntervals.sort(sortNumbers);
                        video = new SubscriptionModule.VideoSubscriptionCapabilities(videoCodecs, resolutions, frameRates, bitrates, keyFrameIntervals);
                    } else {
                        video = new SubscriptionModule.VideoSubscriptionCapabilities(videoCodecs, [], [], [1.0], []);
                    }
                }

                return new SubscriptionModule.SubscriptionCapabilities(audio, video);
            }

        }, {"../base/codec.js": 2, "../base/mediaformat.js": 6, "../base/publication.js": 8, "./subscription.js": 21}],
        21: [function (require, module, exports) {
// Copyright (C) <2018> Intel Corporation
//
// SPDX-License-Identifier: Apache-2.0
            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.Subscription = exports.SubscriptionUpdateOptions = exports.VideoSubscriptionUpdateOptions = exports.SubscribeOptions = exports.VideoSubscriptionConstraints = exports.AudioSubscriptionConstraints = exports.SubscriptionCapabilities = exports.VideoSubscriptionCapabilities = exports.AudioSubscriptionCapabilities = void 0;

            var MediaFormatModule = _interopRequireWildcard(require("../base/mediaformat.js"));

            var CodecModule = _interopRequireWildcard(require("../base/codec.js"));

            var _event = require("../base/event.js");

            function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) {
                    return obj;
                } else {
                    var newObj = {};
                    if (obj != null) {
                        for (var key in obj) {
                            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                                var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                                if (desc.get || desc.set) {
                                    Object.defineProperty(newObj, key, desc);
                                } else {
                                    newObj[key] = obj[key];
                                }
                            }
                        }
                    }
                    newObj.default = obj;
                    return newObj;
                }
            }

            function _typeof(obj) {
                if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                    _typeof = function _typeof(obj) {
                        return typeof obj;
                    };
                } else {
                    _typeof = function _typeof(obj) {
                        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                    };
                }
                return _typeof(obj);
            }

            function _possibleConstructorReturn(self, call) {
                if (call && (_typeof(call) === "object" || typeof call === "function")) {
                    return call;
                }
                return _assertThisInitialized(self);
            }

            function _getPrototypeOf(o) {
                _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
                    return o.__proto__ || Object.getPrototypeOf(o);
                };
                return _getPrototypeOf(o);
            }

            function _inherits(subClass, superClass) {
                if (typeof superClass !== "function" && superClass !== null) {
                    throw new TypeError("Super expression must either be null or a function");
                }
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        writable: true,
                        configurable: true
                    }
                });
                if (superClass) _setPrototypeOf(subClass, superClass);
            }

            function _setPrototypeOf(o, p) {
                _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
                    o.__proto__ = p;
                    return o;
                };
                return _setPrototypeOf(o, p);
            }

            function _assertThisInitialized(self) {
                if (self === void 0) {
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                }
                return self;
            }

            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }

            /**
             * @class AudioSubscriptionCapabilities
             * @memberOf Owt.Conference
             * @classDesc Represents the audio capability for subscription.
             * @hideconstructor
             */
            var AudioSubscriptionCapabilities = // eslint-disable-next-line require-jsdoc
                function AudioSubscriptionCapabilities(codecs) {
                    _classCallCheck(this, AudioSubscriptionCapabilities);

                    /**
                     * @member {Array.<Owt.Base.AudioCodecParameters>} codecs
                     * @instance
                     * @memberof Owt.Conference.AudioSubscriptionCapabilities
                     */
                    this.codecs = codecs;
                };
            /**
             * @class VideoSubscriptionCapabilities
             * @memberOf Owt.Conference
             * @classDesc Represents the video capability for subscription.
             * @hideconstructor
             */


            exports.AudioSubscriptionCapabilities = AudioSubscriptionCapabilities;

            var VideoSubscriptionCapabilities = // eslint-disable-next-line require-jsdoc
                function VideoSubscriptionCapabilities(codecs, resolutions, frameRates, bitrateMultipliers, keyFrameIntervals) {
                    _classCallCheck(this, VideoSubscriptionCapabilities);

                    /**
                     * @member {Array.<Owt.Base.VideoCodecParameters>} codecs
                     * @instance
                     * @memberof Owt.Conference.VideoSubscriptionCapabilities
                     */
                    this.codecs = codecs;
                    /**
                     * @member {Array.<Owt.Base.Resolution>} resolutions
                     * @instance
                     * @memberof Owt.Conference.VideoSubscriptionCapabilities
                     */

                    this.resolutions = resolutions;
                    /**
                     * @member {Array.<number>} frameRates
                     * @instance
                     * @memberof Owt.Conference.VideoSubscriptionCapabilities
                     */

                    this.frameRates = frameRates;
                    /**
                     * @member {Array.<number>} bitrateMultipliers
                     * @instance
                     * @memberof Owt.Conference.VideoSubscriptionCapabilities
                     */

                    this.bitrateMultipliers = bitrateMultipliers;
                    /**
                     * @member {Array.<number>} keyFrameIntervals
                     * @instance
                     * @memberof Owt.Conference.VideoSubscriptionCapabilities
                     */

                    this.keyFrameIntervals = keyFrameIntervals;
                };
            /**
             * @class SubscriptionCapabilities
             * @memberOf Owt.Conference
             * @classDesc Represents the capability for subscription.
             * @hideconstructor
             */


            exports.VideoSubscriptionCapabilities = VideoSubscriptionCapabilities;

            var SubscriptionCapabilities = // eslint-disable-next-line require-jsdoc
                function SubscriptionCapabilities(audio, video) {
                    _classCallCheck(this, SubscriptionCapabilities);

                    /**
                     * @member {?Owt.Conference.AudioSubscriptionCapabilities} audio
                     * @instance
                     * @memberof Owt.Conference.SubscriptionCapabilities
                     */
                    this.audio = audio;
                    /**
                     * @member {?Owt.Conference.VideoSubscriptionCapabilities} video
                     * @instance
                     * @memberof Owt.Conference.SubscriptionCapabilities
                     */

                    this.video = video;
                };
            /**
             * @class AudioSubscriptionConstraints
             * @memberOf Owt.Conference
             * @classDesc Represents the audio constraints for subscription.
             * @hideconstructor
             */


            exports.SubscriptionCapabilities = SubscriptionCapabilities;

            var AudioSubscriptionConstraints = // eslint-disable-next-line require-jsdoc
                function AudioSubscriptionConstraints(codecs) {
                    _classCallCheck(this, AudioSubscriptionConstraints);

                    /**
                     * @member {?Array.<Owt.Base.AudioCodecParameters>} codecs
                     * @instance
                     * @memberof Owt.Conference.AudioSubscriptionConstraints
                     * @desc Codecs accepted. If none of `codecs` supported by both sides, connection fails. Leave it undefined will use all possible codecs.
                     */
                    this.codecs = codecs;
                };
            /**
             * @class VideoSubscriptionConstraints
             * @memberOf Owt.Conference
             * @classDesc Represents the video constraints for subscription.
             * @hideconstructor
             */


            exports.AudioSubscriptionConstraints = AudioSubscriptionConstraints;

            var VideoSubscriptionConstraints = // eslint-disable-next-line require-jsdoc
                function VideoSubscriptionConstraints(codecs, resolution, frameRate, bitrateMultiplier, keyFrameInterval, rid) {
                    _classCallCheck(this, VideoSubscriptionConstraints);

                    /**
                     * @member {?Array.<Owt.Base.VideoCodecParameters>} codecs
                     * @instance
                     * @memberof Owt.Conference.VideoSubscriptionConstraints
                     * @desc Codecs accepted. If none of `codecs` supported by both sides, connection fails. Leave it undefined will use all possible codecs.
                     */
                    this.codecs = codecs;
                    /**
                     * @member {?Owt.Base.Resolution} resolution
                     * @instance
                     * @memberof Owt.Conference.VideoSubscriptionConstraints
                     * @desc Only resolutions listed in Owt.Conference.VideoSubscriptionCapabilities are allowed.
                     */

                    this.resolution = resolution;
                    /**
                     * @member {?number} frameRate
                     * @instance
                     * @memberof Owt.Conference.VideoSubscriptionConstraints
                     * @desc Only frameRates listed in Owt.Conference.VideoSubscriptionCapabilities are allowed.
                     */

                    this.frameRate = frameRate;
                    /**
                     * @member {?number} bitrateMultiplier
                     * @instance
                     * @memberof Owt.Conference.VideoSubscriptionConstraints
                     * @desc Only bitrateMultipliers listed in Owt.Conference.VideoSubscriptionCapabilities are allowed.
                     */

                    this.bitrateMultiplier = bitrateMultiplier;
                    /**
                     * @member {?number} keyFrameInterval
                     * @instance
                     * @memberof Owt.Conference.VideoSubscriptionConstraints
                     * @desc Only keyFrameIntervals listed in Owt.Conference.VideoSubscriptionCapabilities are allowed.
                     */

                    this.keyFrameInterval = keyFrameInterval;
                    /**
                     * @member {?number} rid
                     * @instance
                     * @memberof Owt.Conference.VideoSubscriptionConstraints
                     * @desc Restriction identifier to identify the RTP Streams within an RTP session. When rid is specified, other constraints will be ignored.
                     */

                    this.rid = rid;
                };
            /**
             * @class SubscribeOptions
             * @memberOf Owt.Conference
             * @classDesc SubscribeOptions defines options for subscribing a Owt.Base.RemoteStream.
             */


            exports.VideoSubscriptionConstraints = VideoSubscriptionConstraints;

            var SubscribeOptions = // eslint-disable-next-line require-jsdoc
                function SubscribeOptions(audio, video) {
                    _classCallCheck(this, SubscribeOptions);

                    /**
                     * @member {?Owt.Conference.AudioSubscriptionConstraints} audio
                     * @instance
                     * @memberof Owt.Conference.SubscribeOptions
                     */
                    this.audio = audio;
                    /**
                     * @member {?Owt.Conference.VideoSubscriptionConstraints} video
                     * @instance
                     * @memberof Owt.Conference.SubscribeOptions
                     */

                    this.video = video;
                };
            /**
             * @class VideoSubscriptionUpdateOptions
             * @memberOf Owt.Conference
             * @classDesc VideoSubscriptionUpdateOptions defines options for updating a subscription's video part.
             * @hideconstructor
             */


            exports.SubscribeOptions = SubscribeOptions;

            var VideoSubscriptionUpdateOptions = // eslint-disable-next-line require-jsdoc
                function VideoSubscriptionUpdateOptions() {
                    _classCallCheck(this, VideoSubscriptionUpdateOptions);

                    /**
                     * @member {?Owt.Base.Resolution} resolution
                     * @instance
                     * @memberof Owt.Conference.VideoSubscriptionUpdateOptions
                     * @desc Only resolutions listed in VideoSubscriptionCapabilities are allowed.
                     */
                    this.resolution = undefined;
                    /**
                     * @member {?number} frameRates
                     * @instance
                     * @memberof Owt.Conference.VideoSubscriptionUpdateOptions
                     * @desc Only frameRates listed in VideoSubscriptionCapabilities are allowed.
                     */

                    this.frameRate = undefined;
                    /**
                     * @member {?number} bitrateMultipliers
                     * @instance
                     * @memberof Owt.Conference.VideoSubscriptionUpdateOptions
                     * @desc Only bitrateMultipliers listed in VideoSubscriptionCapabilities are allowed.
                     */

                    this.bitrateMultipliers = undefined;
                    /**
                     * @member {?number} keyFrameIntervals
                     * @instance
                     * @memberof Owt.Conference.VideoSubscriptionUpdateOptions
                     * @desc Only keyFrameIntervals listed in VideoSubscriptionCapabilities are allowed.
                     */

                    this.keyFrameInterval = undefined;
                };
            /**
             * @class SubscriptionUpdateOptions
             * @memberOf Owt.Conference
             * @classDesc SubscriptionUpdateOptions defines options for updating a subscription.
             * @hideconstructor
             */


            exports.VideoSubscriptionUpdateOptions = VideoSubscriptionUpdateOptions;

            var SubscriptionUpdateOptions = // eslint-disable-next-line require-jsdoc
                function SubscriptionUpdateOptions() {
                    _classCallCheck(this, SubscriptionUpdateOptions);

                    /**
                     * @member {?VideoSubscriptionUpdateOptions} video
                     * @instance
                     * @memberof Owt.Conference.SubscriptionUpdateOptions
                     */
                    this.video = undefined;
                };
            /**
             * @class Subscription
             * @memberof Owt.Conference
             * @classDesc Subscription is a receiver for receiving a stream.
             * Events:
             *
             * | Event Name      | Argument Type    | Fired when       |
             * | ----------------| ---------------- | ---------------- |
             * | ended           | Event            | Subscription is ended. |
             * | error           | ErrorEvent       | An error occurred on the subscription. |
             * | mute            | MuteEvent        | Publication is muted. Remote side stopped sending audio and/or video data. |
             * | unmute          | MuteEvent        | Publication is unmuted. Remote side continued sending audio and/or video data. |
             *
             * @extends Owt.Base.EventDispatcher
             * @hideconstructor
             */


            exports.SubscriptionUpdateOptions = SubscriptionUpdateOptions;

            var Subscription =
                /*#__PURE__*/
                function (_EventDispatcher) {
                    _inherits(Subscription, _EventDispatcher);

                    // eslint-disable-next-line require-jsdoc
                    function Subscription(id, stop, getStats, mute, unmute, applyOptions) {
                        var _this;

                        _classCallCheck(this, Subscription);

                        _this = _possibleConstructorReturn(this, _getPrototypeOf(Subscription).call(this));

                        if (!id) {
                            throw new TypeError('ID cannot be null or undefined.');
                        }
                        /**
                         * @member {string} id
                         * @instance
                         * @memberof Owt.Conference.Subscription
                         */


                        Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), 'id', {
                            configurable: false,
                            writable: false,
                            value: id
                        });
                        /**
                         * @function stop
                         * @instance
                         * @desc Stop certain subscription. Once a subscription is stopped, it cannot be recovered.
                         * @memberof Owt.Conference.Subscription
                         * @returns {undefined}
                         */

                        _this.stop = stop;
                        /**
                         * @function getStats
                         * @instance
                         * @desc Get stats of underlying PeerConnection.
                         * @memberof Owt.Conference.Subscription
                         * @returns {Promise<RTCStatsReport, Error>}
                         */

                        _this.getStats = getStats;
                        /**
                         * @function mute
                         * @instance
                         * @desc Stop reeving data from remote endpoint.
                         * @memberof Owt.Conference.Subscription
                         * @param {Owt.Base.TrackKind } kind Kind of tracks to be muted.
                         * @returns {Promise<undefined, Error>}
                         */

                        _this.mute = mute;
                        /**
                         * @function unmute
                         * @instance
                         * @desc Continue reeving data from remote endpoint.
                         * @memberof Owt.Conference.Subscription
                         * @param {Owt.Base.TrackKind } kind Kind of tracks to be unmuted.
                         * @returns {Promise<undefined, Error>}
                         */

                        _this.unmute = unmute;
                        /**
                         * @function applyOptions
                         * @instance
                         * @desc Update subscription with given options.
                         * @memberof Owt.Conference.Subscription
                         * @param {Owt.Conference.SubscriptionUpdateOptions } options Subscription update options.
                         * @returns {Promise<undefined, Error>}
                         */

                        _this.applyOptions = applyOptions;
                        return _this;
                    }

                    return Subscription;
                }(_event.EventDispatcher);

            exports.Subscription = Subscription;

        }, {"../base/codec.js": 2, "../base/event.js": 3, "../base/mediaformat.js": 6}],
        22: [function (require, module, exports) {
// Copyright (C) <2018> Intel Corporation
//
// SPDX-License-Identifier: Apache-2.0
            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.Conference = exports.P2P = exports.Base = void 0;

            var base = _interopRequireWildcard(require("./base/export.js"));

            var p2p = _interopRequireWildcard(require("./p2p/export.js"));

            var conference = _interopRequireWildcard(require("./conference/export.js"));

            function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) {
                    return obj;
                } else {
                    var newObj = {};
                    if (obj != null) {
                        for (var key in obj) {
                            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                                var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                                if (desc.get || desc.set) {
                                    Object.defineProperty(newObj, key, desc);
                                } else {
                                    newObj[key] = obj[key];
                                }
                            }
                        }
                    }
                    newObj.default = obj;
                    return newObj;
                }
            }

            /**
             * Base objects for both P2P and conference.
             * @namespace Owt.Base
             */
            var Base = base;
            /**
             * P2P WebRTC connections.
             * @namespace Owt.P2P
             */

            exports.Base = Base;
            var P2P = p2p;
            /**
             * WebRTC connections with conference server.
             * @namespace Owt.Conference
             */

            exports.P2P = P2P;
            var Conference = conference;
            exports.Conference = Conference;

        }, {"./base/export.js": 4, "./conference/export.js": 15, "./p2p/export.js": 24}],
        23: [function (require, module, exports) {
// Copyright (C) <2018> Intel Corporation
//
// SPDX-License-Identifier: Apache-2.0
            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.getErrorByCode = getErrorByCode;
            exports.P2PError = exports.errors = void 0;

            function _typeof(obj) {
                if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                    _typeof = function _typeof(obj) {
                        return typeof obj;
                    };
                } else {
                    _typeof = function _typeof(obj) {
                        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                    };
                }
                return _typeof(obj);
            }

            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }

            function _possibleConstructorReturn(self, call) {
                if (call && (_typeof(call) === "object" || typeof call === "function")) {
                    return call;
                }
                return _assertThisInitialized(self);
            }

            function _assertThisInitialized(self) {
                if (self === void 0) {
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                }
                return self;
            }

            function _inherits(subClass, superClass) {
                if (typeof superClass !== "function" && superClass !== null) {
                    throw new TypeError("Super expression must either be null or a function");
                }
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        writable: true,
                        configurable: true
                    }
                });
                if (superClass) _setPrototypeOf(subClass, superClass);
            }

            function _wrapNativeSuper(Class) {
                var _cache = typeof Map === "function" ? new Map() : undefined;
                _wrapNativeSuper = function _wrapNativeSuper(Class) {
                    if (Class === null || !_isNativeFunction(Class)) return Class;
                    if (typeof Class !== "function") {
                        throw new TypeError("Super expression must either be null or a function");
                    }
                    if (typeof _cache !== "undefined") {
                        if (_cache.has(Class)) return _cache.get(Class);
                        _cache.set(Class, Wrapper);
                    }

                    function Wrapper() {
                        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
                    }

                    Wrapper.prototype = Object.create(Class.prototype, {
                        constructor: {
                            value: Wrapper,
                            enumerable: false,
                            writable: true,
                            configurable: true
                        }
                    });
                    return _setPrototypeOf(Wrapper, Class);
                };
                return _wrapNativeSuper(Class);
            }

            function isNativeReflectConstruct() {
                if (typeof Reflect === "undefined" || !Reflect.construct) return false;
                if (Reflect.construct.sham) return false;
                if (typeof Proxy === "function") return true;
                try {
                    Date.prototype.toString.call(Reflect.construct(Date, [], function () {
                    }));
                    return true;
                } catch (e) {
                    return false;
                }
            }

            function _construct(Parent, args, Class) {
                if (isNativeReflectConstruct()) {
                    _construct = Reflect.construct;
                } else {
                    _construct = function _construct(Parent, args, Class) {
                        var a = [null];
                        a.push.apply(a, args);
                        var Constructor = Function.bind.apply(Parent, a);
                        var instance = new Constructor();
                        if (Class) _setPrototypeOf(instance, Class.prototype);
                        return instance;
                    };
                }
                return _construct.apply(null, arguments);
            }

            function _isNativeFunction(fn) {
                return Function.toString.call(fn).indexOf("[native code]") !== -1;
            }

            function _setPrototypeOf(o, p) {
                _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
                    o.__proto__ = p;
                    return o;
                };
                return _setPrototypeOf(o, p);
            }

            function _getPrototypeOf(o) {
                _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
                    return o.__proto__ || Object.getPrototypeOf(o);
                };
                return _getPrototypeOf(o);
            }

            var errors = {
                // 2100-2999 for P2P errors
                // 2100-2199 for connection errors
                // 2100-2109 for server errors
                P2P_CONN_SERVER_UNKNOWN: {
                    code: 2100,
                    message: 'Server unknown error.'
                },
                P2P_CONN_SERVER_UNAVAILABLE: {
                    code: 2101,
                    message: 'Server is unavaliable.'
                },
                P2P_CONN_SERVER_BUSY: {
                    code: 2102,
                    message: 'Server is too busy.'
                },
                P2P_CONN_SERVER_NOT_SUPPORTED: {
                    code: 2103,
                    message: 'Method has not been supported by server.'
                },
                // 2110-2119 for client errors
                P2P_CONN_CLIENT_UNKNOWN: {
                    code: 2110,
                    message: 'Client unknown error.'
                },
                P2P_CONN_CLIENT_NOT_INITIALIZED: {
                    code: 2111,
                    message: 'Connection is not initialized.'
                },
                // 2120-2129 for authentication errors
                P2P_CONN_AUTH_UNKNOWN: {
                    code: 2120,
                    message: 'Authentication unknown error.'
                },
                P2P_CONN_AUTH_FAILED: {
                    code: 2121,
                    message: 'Wrong username or token.'
                },
                // 2200-2299 for message transport errors
                P2P_MESSAGING_TARGET_UNREACHABLE: {
                    code: 2201,
                    message: 'Remote user cannot be reached.'
                },
                P2P_CLIENT_DENIED: {
                    code: 2202,
                    message: 'User is denied.'
                },
                // 2301-2399 for chat room errors
                // 2401-2499 for client errors
                P2P_CLIENT_UNKNOWN: {
                    code: 2400,
                    message: 'Unknown errors.'
                },
                P2P_CLIENT_UNSUPPORTED_METHOD: {
                    code: 2401,
                    message: 'This method is unsupported in current browser.'
                },
                P2P_CLIENT_ILLEGAL_ARGUMENT: {
                    code: 2402,
                    message: 'Illegal argument.'
                },
                P2P_CLIENT_INVALID_STATE: {
                    code: 2403,
                    message: 'Invalid peer state.'
                },
                P2P_CLIENT_NOT_ALLOWED: {
                    code: 2404,
                    message: 'Remote user is not allowed.'
                },
                // 2501-2599 for WebRTC erros.
                P2P_WEBRTC_UNKNOWN: {
                    code: 2500,
                    message: 'WebRTC error.'
                },
                P2P_WEBRTC_SDP: {
                    code: 2502,
                    message: 'SDP error.'
                }
            };
            /**
             * @function getErrorByCode
             * @desc Get error object by error code.
             * @param {string} errorCode Error code.
             * @return {Owt.P2P.Error} Error object
             * @private
             */

            exports.errors = errors;

            function getErrorByCode(errorCode) {
                var codeErrorMap = {
                    2100: errors.P2P_CONN_SERVER_UNKNOWN,
                    2101: errors.P2P_CONN_SERVER_UNAVAILABLE,
                    2102: errors.P2P_CONN_SERVER_BUSY,
                    2103: errors.P2P_CONN_SERVER_NOT_SUPPORTED,
                    2110: errors.P2P_CONN_CLIENT_UNKNOWN,
                    2111: errors.P2P_CONN_CLIENT_NOT_INITIALIZED,
                    2120: errors.P2P_CONN_AUTH_UNKNOWN,
                    2121: errors.P2P_CONN_AUTH_FAILED,
                    2201: errors.P2P_MESSAGING_TARGET_UNREACHABLE,
                    2400: errors.P2P_CLIENT_UNKNOWN,
                    2401: errors.P2P_CLIENT_UNSUPPORTED_METHOD,
                    2402: errors.P2P_CLIENT_ILLEGAL_ARGUMENT,
                    2403: errors.P2P_CLIENT_INVALID_STATE,
                    2404: errors.P2P_CLIENT_NOT_ALLOWED,
                    2500: errors.P2P_WEBRTC_UNKNOWN,
                    2501: errors.P2P_WEBRTC_SDP
                };
                return codeErrorMap[errorCode];
            }

            /**
             * @class P2PError
             * @classDesc The P2PError object represents an error in P2P mode.
             * @memberOf Owt.P2P
             * @hideconstructor
             */


            var P2PError =
                /*#__PURE__*/
                function (_Error) {
                    _inherits(P2PError, _Error);

                    // eslint-disable-next-line require-jsdoc
                    function P2PError(error, message) {
                        var _this;

                        _classCallCheck(this, P2PError);

                        _this = _possibleConstructorReturn(this, _getPrototypeOf(P2PError).call(this, message));

                        if (typeof error === 'number') {
                            _this.code = error;
                        } else {
                            _this.code = error.code;
                        }

                        return _this;
                    }

                    return P2PError;
                }(_wrapNativeSuper(Error));

            exports.P2PError = P2PError;

        }, {}],
        24: [function (require, module, exports) {
// Copyright (C) <2018> Intel Corporation
//
// SPDX-License-Identifier: Apache-2.0
            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            Object.defineProperty(exports, "P2PClient", {
                enumerable: true,
                get: function get() {
                    return _p2pclient.default;
                }
            });
            Object.defineProperty(exports, "P2PError", {
                enumerable: true,
                get: function get() {
                    return _error.P2PError;
                }
            });

            var _p2pclient = _interopRequireDefault(require("./p2pclient.js"));

            var _error = require("./error.js");

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {default: obj};
            }

        }, {"./error.js": 23, "./p2pclient.js": 25}],
        25: [function (require, module, exports) {
// Copyright (C) <2018> Intel Corporation
//
// SPDX-License-Identifier: Apache-2.0

            /* global Map, Promise */
            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.default = void 0;

            var _logger = _interopRequireDefault(require("../base/logger.js"));

            var _event = require("../base/event.js");

            var Utils = _interopRequireWildcard(require("../base/utils.js"));

            var ErrorModule = _interopRequireWildcard(require("./error.js"));

            var _peerconnectionChannel = _interopRequireDefault(require("./peerconnection-channel.js"));

            function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) {
                    return obj;
                } else {
                    var newObj = {};
                    if (obj != null) {
                        for (var key in obj) {
                            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                                var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                                if (desc.get || desc.set) {
                                    Object.defineProperty(newObj, key, desc);
                                } else {
                                    newObj[key] = obj[key];
                                }
                            }
                        }
                    }
                    newObj.default = obj;
                    return newObj;
                }
            }

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {default: obj};
            }

            var ConnectionState = {
                READY: 1,
                CONNECTING: 2,
                CONNECTED: 3
            };
            /* eslint-disable no-unused-vars */

            /**
             * @class P2PClientConfiguration
             * @classDesc Configuration for P2PClient.
             * @memberOf Owt.P2P
             * @hideconstructor
             */

            var P2PClientConfiguration = function P2PClientConfiguration() {
                /**
                 * @member {?Array<Owt.Base.AudioEncodingParameters>} audioEncoding
                 * @instance
                 * @desc Encoding parameters for publishing audio tracks.
                 * @memberof Owt.P2P.P2PClientConfiguration
                 */
                this.audioEncoding = undefined;
                /**
                 * @member {?Array<Owt.Base.VideoEncodingParameters>} videoEncoding
                 * @instance
                 * @desc Encoding parameters for publishing video tracks.
                 * @memberof Owt.P2P.P2PClientConfiguration
                 */

                this.videoEncoding = undefined;
                /**
                 * @member {?RTCConfiguration} rtcConfiguration
                 * @instance
                 * @memberof Owt.P2P.P2PClientConfiguration
                 * @desc It will be used for creating PeerConnection.
                 * @see {@link https://www.w3.org/TR/webrtc/#rtcconfiguration-dictionary|RTCConfiguration Dictionary of WebRTC 1.0}.
                 * @example
                 * // Following object can be set to p2pClientConfiguration.rtcConfiguration.
                 * {
                 *   iceServers: [{
                 *      urls: "stun:example.com:3478"
                 *   }, {
                 *     urls: [
                 *       "turn:example.com:3478?transport=udp",
                 *       "turn:example.com:3478?transport=tcp"
                 *     ],
                 *      credential: "password",
                 *      username: "username"
                 *   }
                 * }
                 */

                this.rtcConfiguration = undefined;
            };
            /* eslint-enable no-unused-vars */

            /**
             * @class P2PClient
             * @classDesc The P2PClient handles PeerConnections between different clients.
             * Events:
             *
             * | Event Name            | Argument Type    | Fired when       |
             * | --------------------- | ---------------- | ---------------- |
             * | streamadded           | StreamEvent      | A new stream is sent from remote endpoint. |
             * | messagereceived       | MessageEvent     | A new message is received. |
             * | serverdisconnected    | OwtEvent         | Disconnected from signaling server. |
             *
             * @memberof Owt.P2P
             * @extends Owt.Base.EventDispatcher
             * @constructor
             * @param {?Owt.P2P.P2PClientConfiguration } configuration Configuration for Owt.P2P.P2PClient.
             * @param {Object} signalingChannel A channel for sending and receiving signaling messages.
             */


            var P2PClient = function P2PClient(configuration, signalingChannel) {
                Object.setPrototypeOf(this, new _event.EventDispatcher());
                var config = configuration;
                var signaling = signalingChannel;
                var channels = new Map(); // Map of PeerConnectionChannels.

                var self = this;
                var state = ConnectionState.READY;
                var myId;

                signaling.onMessage = function (origin, message) {
                    _logger.default.debug('Received signaling message from ' + origin + ': ' + message);

                    var data = JSON.parse(message);

                    if (data.type === 'chat-closed') {
                        if (channels.has(origin)) {
                            getOrCreateChannel(origin).onMessage(data);
                            channels.delete(origin);
                        }

                        return;
                    }

                    if (self.allowedRemoteIds.indexOf(origin) >= 0) {
                        getOrCreateChannel(origin).onMessage(data);
                    } else {
                        sendSignalingMessage(origin, 'chat-closed', ErrorModule.errors.P2P_CLIENT_DENIED);
                    }
                };

                signaling.onServerDisconnected = function () {
                    state = ConnectionState.READY;
                    self.dispatchEvent(new _event.OwtEvent('serverdisconnected'));
                };
                /**
                 * @member {array} allowedRemoteIds
                 * @memberof Owt.P2P.P2PClient
                 * @instance
                 * @desc Only allowed remote endpoint IDs are able to publish stream or send message to current endpoint. Removing an ID from allowedRemoteIds does stop existing connection with certain endpoint. Please call stop to stop the PeerConnection.
                 */


                this.allowedRemoteIds = [];
                /**
                 * @function connect
                 * @instance
                 * @desc Connect to signaling server. Since signaling can be customized, this method does not define how a token looks like. SDK passes token to signaling channel without changes.
                 * @memberof Owt.P2P.P2PClient
                 * @param {string} token A token for connecting to signaling server. The format of this token depends on signaling server's requirement.
                 * @return {Promise<object, Error>} It returns a promise resolved with an object returned by signaling channel once signaling channel reports connection has been established.
                 */

                this.connect = function (token) {
                    if (state === ConnectionState.READY) {
                        state = ConnectionState.CONNECTING;
                    } else {
                        _logger.default.warning('Invalid connection state: ' + state);

                        return Promise.reject(new ErrorModule.P2PError(ErrorModule.errors.P2P_CLIENT_INVALID_STATE));
                    }

                    return new Promise(function (resolve, reject) {
                        signaling.connect(token).then(function (id) {
                            myId = id;
                            state = ConnectionState.CONNECTED;
                            resolve(myId);
                        }, function (errCode) {
                            reject(new ErrorModule.P2PError(ErrorModule.getErrorByCode(errCode)));
                        });
                    });
                };
                /**
                 * @function disconnect
                 * @instance
                 * @desc Disconnect from the signaling channel. It stops all existing sessions with remote endpoints.
                 * @memberof Owt.P2P.P2PClient
                 * @returns {Promise<undefined, Error>}
                 */


                this.disconnect = function () {
                    if (state == ConnectionState.READY) {
                        return;
                    }

                    channels.forEach(function (channel) {
                        channel.stop();
                    });
                    channels.clear();
                    signaling.disconnect();
                };
                /**
                 * @function publish
                 * @instance
                 * @desc Publish a stream to a remote endpoint.
                 * @memberof Owt.P2P.P2PClient
                 * @param {string} remoteId Remote endpoint's ID.
                 * @param {Owt.Base.LocalStream} stream An Owt.Base.LocalStream to be published.
                 * @return {Promise<Owt.Base.Publication, Error>} A promised that resolves when remote side received the certain stream. However, remote endpoint may not display this stream, or ignore it.
                 */


                this.publish = function (remoteId, stream) {
                    if (state !== ConnectionState.CONNECTED) {
                        return Promise.reject(new ErrorModule.P2PError(ErrorModule.errors.P2P_CLIENT_INVALID_STATE, 'P2P Client is not connected to signaling channel.'));
                    }

                    if (this.allowedRemoteIds.indexOf(remoteId) < 0) {
                        return Promise.reject(new ErrorModule.P2PError(ErrorModule.errors.P2P_CLIENT_NOT_ALLOWED));
                    }

                    return Promise.resolve(getOrCreateChannel(remoteId).publish(stream));
                };
                /**
                 * @function send
                 * @instance
                 * @desc Send a message to remote endpoint.
                 * @memberof Owt.P2P.P2PClient
                 * @param {string} remoteId Remote endpoint's ID.
                 * @param {string} message Message to be sent. It should be a string.
                 * @return {Promise<undefined, Error>} It returns a promise resolved when remote endpoint received certain message.
                 */


                this.send = function (remoteId, message) {
                    if (state !== ConnectionState.CONNECTED) {
                        return Promise.reject(new ErrorModule.P2PError(ErrorModule.errors.P2P_CLIENT_INVALID_STATE, 'P2P Client is not connected to signaling channel.'));
                    }

                    if (this.allowedRemoteIds.indexOf(remoteId) < 0) {
                        return Promise.reject(new ErrorModule.P2PError(ErrorModule.errors.P2P_CLIENT_NOT_ALLOWED));
                    }

                    return Promise.resolve(getOrCreateChannel(remoteId).send(message));
                };
                /**
                 * @function stop
                 * @instance
                 * @desc Clean all resources associated with given remote endpoint. It may include RTCPeerConnection, RTCRtpTransceiver and RTCDataChannel. It still possible to publish a stream, or send a message to given remote endpoint after stop.
                 * @memberof Owt.P2P.P2PClient
                 * @param {string} remoteId Remote endpoint's ID.
                 * @return {undefined}
                 */


                this.stop = function (remoteId) {
                    if (!channels.has(remoteId)) {
                        _logger.default.warning('No PeerConnection between current endpoint and specific remote ' + 'endpoint.');

                        return;
                    }

                    channels.get(remoteId).stop();
                    channels.delete(remoteId);
                };
                /**
                 * @function getStats
                 * @instance
                 * @desc Get stats of underlying PeerConnection.
                 * @memberof Owt.P2P.P2PClient
                 * @param {string} remoteId Remote endpoint's ID.
                 * @return {Promise<RTCStatsReport, Error>} It returns a promise resolved with an RTCStatsReport or reject with an Error if there is no connection with specific user.
                 */


                this.getStats = function (remoteId) {
                    if (!channels.has(remoteId)) {
                        return Promise.reject(new ErrorModule.P2PError(ErrorModule.errors.P2P_CLIENT_INVALID_STATE, 'No PeerConnection between current endpoint and specific remote ' + 'endpoint.'));
                    }

                    return channels.get(remoteId).getStats();
                };

                var sendSignalingMessage = function sendSignalingMessage(remoteId, type, message) {
                    var msg = {
                        type: type
                    };

                    if (message) {
                        msg.data = message;
                    }

                    return signaling.send(remoteId, JSON.stringify(msg)).catch(function (e) {
                        if (typeof e === 'number') {
                            throw ErrorModule.getErrorByCode(e);
                        }
                    });
                };

                var getOrCreateChannel = function getOrCreateChannel(remoteId) {
                    if (!channels.has(remoteId)) {
                        // Construct an signaling sender/receiver for P2PPeerConnection.
                        var signalingForChannel = Object.create(_event.EventDispatcher);
                        signalingForChannel.sendSignalingMessage = sendSignalingMessage;
                        var pcc = new _peerconnectionChannel.default(config, myId, remoteId, signalingForChannel);
                        pcc.addEventListener('streamadded', function (streamEvent) {
                            self.dispatchEvent(streamEvent);
                        });
                        pcc.addEventListener('messagereceived', function (messageEvent) {
                            self.dispatchEvent(messageEvent);
                        });
                        pcc.addEventListener('ended', function () {
                            channels.delete(remoteId);
                        });
                        channels.set(remoteId, pcc);
                    }

                    return channels.get(remoteId);
                };
            };

            var _default = P2PClient;
            exports.default = _default;

        }, {
            "../base/event.js": 3,
            "../base/logger.js": 5,
            "../base/utils.js": 11,
            "./error.js": 23,
            "./peerconnection-channel.js": 26
        }],
        26: [function (require, module, exports) {
// Copyright (C) <2018> Intel Corporation
//
// SPDX-License-Identifier: Apache-2.0
// This file doesn't have public APIs.

            /* eslint-disable valid-jsdoc */

            /* eslint-disable require-jsdoc */

            /* global Event, Map, Promise, RTCIceCandidate */
            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.default = exports.P2PPeerConnectionChannelEvent = void 0;

            var _logger = _interopRequireDefault(require("../base/logger.js"));

            var _event = require("../base/event.js");

            var _publication = require("../base/publication.js");

            var Utils = _interopRequireWildcard(require("../base/utils.js"));

            var ErrorModule = _interopRequireWildcard(require("./error.js"));

            var StreamModule = _interopRequireWildcard(require("../base/stream.js"));

            var SdpUtils = _interopRequireWildcard(require("../base/sdputils.js"));

            function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) {
                    return obj;
                } else {
                    var newObj = {};
                    if (obj != null) {
                        for (var key in obj) {
                            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                                var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                                if (desc.get || desc.set) {
                                    Object.defineProperty(newObj, key, desc);
                                } else {
                                    newObj[key] = obj[key];
                                }
                            }
                        }
                    }
                    newObj.default = obj;
                    return newObj;
                }
            }

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {default: obj};
            }

            function _slicedToArray(arr, i) {
                return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
            }

            function _nonIterableRest() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            }

            function _iterableToArrayLimit(arr, i) {
                var _arr = [];
                var _n = true;
                var _d = false;
                var _e = undefined;
                try {
                    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                        _arr.push(_s.value);
                        if (i && _arr.length === i) break;
                    }
                } catch (err) {
                    _d = true;
                    _e = err;
                } finally {
                    try {
                        if (!_n && _i["return"] != null) _i["return"]();
                    } finally {
                        if (_d) throw _e;
                    }
                }
                return _arr;
            }

            function _arrayWithHoles(arr) {
                if (Array.isArray(arr)) return arr;
            }

            function _typeof(obj) {
                if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                    _typeof = function _typeof(obj) {
                        return typeof obj;
                    };
                } else {
                    _typeof = function _typeof(obj) {
                        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                    };
                }
                return _typeof(obj);
            }

            function _defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            function _createClass(Constructor, protoProps, staticProps) {
                if (protoProps) _defineProperties(Constructor.prototype, protoProps);
                if (staticProps) _defineProperties(Constructor, staticProps);
                return Constructor;
            }

            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }

            function _possibleConstructorReturn(self, call) {
                if (call && (_typeof(call) === "object" || typeof call === "function")) {
                    return call;
                }
                return _assertThisInitialized(self);
            }

            function _assertThisInitialized(self) {
                if (self === void 0) {
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                }
                return self;
            }

            function _inherits(subClass, superClass) {
                if (typeof superClass !== "function" && superClass !== null) {
                    throw new TypeError("Super expression must either be null or a function");
                }
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        writable: true,
                        configurable: true
                    }
                });
                if (superClass) _setPrototypeOf(subClass, superClass);
            }

            function _wrapNativeSuper(Class) {
                var _cache = typeof Map === "function" ? new Map() : undefined;
                _wrapNativeSuper = function _wrapNativeSuper(Class) {
                    if (Class === null || !_isNativeFunction(Class)) return Class;
                    if (typeof Class !== "function") {
                        throw new TypeError("Super expression must either be null or a function");
                    }
                    if (typeof _cache !== "undefined") {
                        if (_cache.has(Class)) return _cache.get(Class);
                        _cache.set(Class, Wrapper);
                    }

                    function Wrapper() {
                        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
                    }

                    Wrapper.prototype = Object.create(Class.prototype, {
                        constructor: {
                            value: Wrapper,
                            enumerable: false,
                            writable: true,
                            configurable: true
                        }
                    });
                    return _setPrototypeOf(Wrapper, Class);
                };
                return _wrapNativeSuper(Class);
            }

            function isNativeReflectConstruct() {
                if (typeof Reflect === "undefined" || !Reflect.construct) return false;
                if (Reflect.construct.sham) return false;
                if (typeof Proxy === "function") return true;
                try {
                    Date.prototype.toString.call(Reflect.construct(Date, [], function () {
                    }));
                    return true;
                } catch (e) {
                    return false;
                }
            }

            function _construct(Parent, args, Class) {
                if (isNativeReflectConstruct()) {
                    _construct = Reflect.construct;
                } else {
                    _construct = function _construct(Parent, args, Class) {
                        var a = [null];
                        a.push.apply(a, args);
                        var Constructor = Function.bind.apply(Parent, a);
                        var instance = new Constructor();
                        if (Class) _setPrototypeOf(instance, Class.prototype);
                        return instance;
                    };
                }
                return _construct.apply(null, arguments);
            }

            function _isNativeFunction(fn) {
                return Function.toString.call(fn).indexOf("[native code]") !== -1;
            }

            function _setPrototypeOf(o, p) {
                _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
                    o.__proto__ = p;
                    return o;
                };
                return _setPrototypeOf(o, p);
            }

            function _getPrototypeOf(o) {
                _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
                    return o.__proto__ || Object.getPrototypeOf(o);
                };
                return _getPrototypeOf(o);
            }

            /**
             * @class P2PPeerConnectionChannelEvent
             * @desc Event for Stream.
             * @memberOf Owt.P2P
             * @private
             * */
            var P2PPeerConnectionChannelEvent =
                /*#__PURE__*/
                function (_Event) {
                    _inherits(P2PPeerConnectionChannelEvent, _Event);

                    /* eslint-disable-next-line require-jsdoc */
                    function P2PPeerConnectionChannelEvent(init) {
                        var _this;

                        _classCallCheck(this, P2PPeerConnectionChannelEvent);

                        _this = _possibleConstructorReturn(this, _getPrototypeOf(P2PPeerConnectionChannelEvent).call(this, init));
                        _this.stream = init.stream;
                        return _this;
                    }

                    return P2PPeerConnectionChannelEvent;
                }(_wrapNativeSuper(Event));

            exports.P2PPeerConnectionChannelEvent = P2PPeerConnectionChannelEvent;
            var DataChannelLabel = {
                MESSAGE: 'message',
                FILE: 'file'
            };
            var SignalingType = {
                DENIED: 'chat-denied',
                CLOSED: 'chat-closed',
                NEGOTIATION_NEEDED: 'chat-negotiation-needed',
                TRACK_SOURCES: 'chat-track-sources',
                STREAM_INFO: 'chat-stream-info',
                SDP: 'chat-signal',
                TRACKS_ADDED: 'chat-tracks-added',
                TRACKS_REMOVED: 'chat-tracks-removed',
                DATA_RECEIVED: 'chat-data-received',
                UA: 'chat-ua'
            };
            var sysInfo = Utils.sysInfo();
            /**
             * @class P2PPeerConnectionChannel
             * @desc A P2PPeerConnectionChannel handles all interactions between this endpoint and a remote endpoint.
             * @memberOf Owt.P2P
             * @private
             */

            var P2PPeerConnectionChannel =
                /*#__PURE__*/
                function (_EventDispatcher) {
                    _inherits(P2PPeerConnectionChannel, _EventDispatcher);

                    // |signaling| is an object has a method |sendSignalingMessage|.

                    /* eslint-disable-next-line require-jsdoc */
                    function P2PPeerConnectionChannel(config, localId, remoteId, signaling) {
                        var _this2;

                        _classCallCheck(this, P2PPeerConnectionChannel);

                        _this2 = _possibleConstructorReturn(this, _getPrototypeOf(P2PPeerConnectionChannel).call(this));
                        _this2._config = config;
                        _this2._localId = localId;
                        _this2._remoteId = remoteId;
                        _this2._signaling = signaling;
                        _this2._pc = null;
                        _this2._publishedStreams = new Map(); // Key is streams published, value is its publication.

                        _this2._pendingStreams = []; // Streams going to be added to PeerConnection.

                        _this2._publishingStreams = []; // Streams have been added to PeerConnection, but does not receive ack from remote side.

                        _this2._pendingUnpublishStreams = []; // Streams going to be removed.
                        // Key is MediaStream's ID, value is an object {source:{audio:string, video:string}, attributes: object, stream: RemoteStream, mediaStream: MediaStream}. `stream` and `mediaStream` will be set when `track` event is fired on `RTCPeerConnection`. `mediaStream` will be `null` after `streamadded` event is fired on `P2PClient`. Other propertes will be set upon `STREAM_INFO` event from signaling channel.

                        _this2._remoteStreamInfo = new Map();
                        _this2._remoteStreams = [];
                        _this2._remoteTrackSourceInfo = new Map(); // Key is MediaStreamTrack's ID, value is source info.

                        _this2._publishPromises = new Map(); // Key is MediaStream's ID, value is an object has |resolve| and |reject|.

                        _this2._unpublishPromises = new Map(); // Key is MediaStream's ID, value is an object has |resolve| and |reject|.

                        _this2._publishingStreamTracks = new Map(); // Key is MediaStream's ID, value is an array of the ID of its MediaStreamTracks that haven't been acked.

                        _this2._publishedStreamTracks = new Map(); // Key is MediaStream's ID, value is an array of the ID of its MediaStreamTracks that haven't been removed.

                        _this2._isNegotiationNeeded = false;
                        _this2._remoteSideSupportsRemoveStream = true;
                        _this2._remoteSideSupportsPlanB = true;
                        _this2._remoteSideSupportsUnifiedPlan = true;
                        _this2._remoteIceCandidates = [];
                        _this2._dataChannels = new Map(); // Key is data channel's label, value is a RTCDataChannel.

                        _this2._pendingMessages = [];
                        _this2._dataSeq = 1; // Sequence number for data channel messages.

                        _this2._sendDataPromises = new Map(); // Key is data sequence number, value is an object has |resolve| and |reject|.

                        _this2._addedTrackIds = []; // Tracks that have been added after receiving remote SDP but before connection is established. Draining these messages when ICE connection state is connected.

                        _this2._isCaller = true;
                        _this2._infoSent = false;
                        _this2._disposed = false;

                        _this2._createPeerConnection();

                        return _this2;
                    }

                    /**
                     * @function publish
                     * @desc Publish a stream to the remote endpoint.
                     * @private
                     */


                    _createClass(P2PPeerConnectionChannel, [{
                        key: "publish",
                        value: function publish(stream) {
                            var _this3 = this;

                            if (!(stream instanceof StreamModule.LocalStream)) {
                                return Promise.reject(new TypeError('Invalid stream.'));
                            }

                            if (this._publishedStreams.has(stream)) {
                                return Promise.reject(new ErrorModule.P2PError(ErrorModule.errors.P2P_CLIENT_ILLEGAL_ARGUMENT, 'Duplicated stream.'));
                            }

                            if (this._areAllTracksEnded(stream.mediaStream)) {
                                return Promise.reject(new ErrorModule.P2PError(ErrorModule.errors.P2P_CLIENT_INVALID_STATE, 'All tracks are ended.'));
                            }

                            return Promise.all([this._sendClosedMsgIfNecessary(), this._sendSysInfoIfNecessary(), this._sendStreamInfo(stream)]).then(function () {
                                return new Promise(function (resolve, reject) {
                                    // Replace |addStream| with PeerConnection.addTrack when all browsers are ready.
                                    var _iteratorNormalCompletion = true;
                                    var _didIteratorError = false;
                                    var _iteratorError = undefined;

                                    try {
                                        for (var _iterator = stream.mediaStream.getTracks()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                            var track = _step.value;

                                            _this3._pc.addTrack(track, stream.mediaStream);
                                        }
                                    } catch (err) {
                                        _didIteratorError = true;
                                        _iteratorError = err;
                                    } finally {
                                        try {
                                            if (!_iteratorNormalCompletion && _iterator.return != null) {
                                                _iterator.return();
                                            }
                                        } finally {
                                            if (_didIteratorError) {
                                                throw _iteratorError;
                                            }
                                        }
                                    }

                                    _this3._onNegotiationneeded();

                                    _this3._publishingStreams.push(stream);

                                    var trackIds = Array.from(stream.mediaStream.getTracks(), function (track) {
                                        return track.id;
                                    });

                                    _this3._publishingStreamTracks.set(stream.mediaStream.id, trackIds);

                                    _this3._publishPromises.set(stream.mediaStream.id, {
                                        resolve: resolve,
                                        reject: reject
                                    });
                                });
                            });
                        }
                        /**
                         * @function send
                         * @desc Send a message to the remote endpoint.
                         * @private
                         */

                    }, {
                        key: "send",
                        value: function send(message) {
                            var _this4 = this;

                            if (!(typeof message === 'string')) {
                                return Promise.reject(new TypeError('Invalid message.'));
                            }

                            var data = {
                                id: this._dataSeq++,
                                data: message
                            };
                            var promise = new Promise(function (resolve, reject) {
                                _this4._sendDataPromises.set(data.id, {
                                    resolve: resolve,
                                    reject: reject
                                });
                            });

                            if (!this._dataChannels.has(DataChannelLabel.MESSAGE)) {
                                this._createDataChannel(DataChannelLabel.MESSAGE);
                            }

                            this._sendClosedMsgIfNecessary().catch(function (err) {
                                _logger.default.debug('Failed to send closed message.' + err.message);
                            });

                            this._sendSysInfoIfNecessary().catch(function (err) {
                                _logger.default.debug('Failed to send sysInfo.' + err.message);
                            });

                            var dc = this._dataChannels.get(DataChannelLabel.MESSAGE);

                            if (dc.readyState === 'open') {
                                this._dataChannels.get(DataChannelLabel.MESSAGE).send(JSON.stringify(data));
                            } else {
                                this._pendingMessages.push(data);
                            }

                            return promise;
                        }
                        /**
                         * @function stop
                         * @desc Stop the connection with remote endpoint.
                         * @private
                         */

                    }, {
                        key: "stop",
                        value: function stop() {
                            this._stop(undefined, true);
                        }
                        /**
                         * @function getStats
                         * @desc Get stats for a specific MediaStream.
                         * @private
                         */

                    }, {
                        key: "getStats",
                        value: function getStats(mediaStream) {
                            var _this5 = this;

                            if (this._pc) {
                                if (mediaStream === undefined) {
                                    return this._pc.getStats();
                                } else {
                                    var tracksStatsReports = [];
                                    return Promise.all([mediaStream.getTracks().forEach(function (track) {
                                        _this5._getStats(track, tracksStatsReports);
                                    })]).then(function () {
                                        return new Promise(function (resolve, reject) {
                                            resolve(tracksStatsReports);
                                        });
                                    });
                                }
                            } else {
                                return Promise.reject(new ErrorModule.P2PError(ErrorModule.errors.P2P_CLIENT_INVALID_STATE));
                            }
                        }
                    }, {
                        key: "_getStats",
                        value: function _getStats(mediaStreamTrack, reportsResult) {
                            return this._pc.getStats(mediaStreamTrack).then(function (statsReport) {
                                reportsResult.push(statsReport);
                            });
                        }
                        /**
                         * @function onMessage
                         * @desc This method is called by P2PClient when there is new signaling message arrived.
                         * @private
                         */

                    }, {
                        key: "onMessage",
                        value: function onMessage(message) {
                            this._SignalingMesssageHandler(message);
                        }
                    }, {
                        key: "_sendSdp",
                        value: function _sendSdp(sdp) {
                            return this._signaling.sendSignalingMessage(this._remoteId, SignalingType.SDP, sdp);
                        }
                    }, {
                        key: "_sendSignalingMessage",
                        value: function _sendSignalingMessage(type, message) {
                            return this._signaling.sendSignalingMessage(this._remoteId, type, message);
                        }
                    }, {
                        key: "_SignalingMesssageHandler",
                        value: function _SignalingMesssageHandler(message) {
                            _logger.default.debug('Channel received message: ' + message);

                            switch (message.type) {
                                case SignalingType.UA:
                                    this._handleRemoteCapability(message.data);

                                    this._sendSysInfoIfNecessary();

                                    break;

                                case SignalingType.TRACK_SOURCES:
                                    this._trackSourcesHandler(message.data);

                                    break;

                                case SignalingType.STREAM_INFO:
                                    this._streamInfoHandler(message.data);

                                    break;

                                case SignalingType.SDP:
                                    this._sdpHandler(message.data);

                                    break;

                                case SignalingType.TRACKS_ADDED:
                                    this._tracksAddedHandler(message.data);

                                    break;

                                case SignalingType.TRACKS_REMOVED:
                                    this._tracksRemovedHandler(message.data);

                                    break;

                                case SignalingType.DATA_RECEIVED:
                                    this._dataReceivedHandler(message.data);

                                    break;

                                case SignalingType.CLOSED:
                                    this._chatClosedHandler(message.data);

                                    break;

                                default:
                                    _logger.default.error('Invalid signaling message received. Type: ' + message.type);

                            }
                        }
                        /**
                         * @function _tracksAddedHandler
                         * @desc Handle track added event from remote side.
                         * @private
                         */

                    }, {
                        key: "_tracksAddedHandler",
                        value: function _tracksAddedHandler(ids) {
                            var _this6 = this;

                            // Currently, |ids| contains all track IDs of a MediaStream. Following algorithm also handles |ids| is a part of a MediaStream's tracks.
                            var _iteratorNormalCompletion2 = true;
                            var _didIteratorError2 = false;
                            var _iteratorError2 = undefined;

                            try {
                                var _loop = function _loop() {
                                    var id = _step2.value;

                                    // It could be a problem if there is a track published with different MediaStreams.
                                    _this6._publishingStreamTracks.forEach(function (mediaTrackIds, mediaStreamId) {
                                        for (var i = 0; i < mediaTrackIds.length; i++) {
                                            if (mediaTrackIds[i] === id) {
                                                // Move this track from publishing tracks to published tracks.
                                                if (!_this6._publishedStreamTracks.has(mediaStreamId)) {
                                                    _this6._publishedStreamTracks.set(mediaStreamId, []);
                                                }

                                                _this6._publishedStreamTracks.get(mediaStreamId).push(mediaTrackIds[i]);

                                                mediaTrackIds.splice(i, 1);
                                            } // Resolving certain publish promise when remote endpoint received all tracks of a MediaStream.


                                            if (mediaTrackIds.length == 0) {
                                                var _ret = function () {
                                                    if (!_this6._publishPromises.has(mediaStreamId)) {
                                                        _logger.default.warning('Cannot find the promise for publishing ' + mediaStreamId);

                                                        return "continue";
                                                    }

                                                    var targetStreamIndex = _this6._publishingStreams.findIndex(function (element) {
                                                        return element.mediaStream.id == mediaStreamId;
                                                    });

                                                    var targetStream = _this6._publishingStreams[targetStreamIndex];

                                                    _this6._publishingStreams.splice(targetStreamIndex, 1);

                                                    var publication = new _publication.Publication(id, function () {
                                                        _this6._unpublish(targetStream).then(function () {
                                                            publication.dispatchEvent(new _event.OwtEvent('ended'));
                                                        }, function (err) {
                                                            // Use debug mode because this error usually doesn't block stopping a publication.
                                                            _logger.default.debug('Something wrong happened during stopping a ' + 'publication. ' + err.message);
                                                        });
                                                    }, function () {
                                                        if (!targetStream || !targetStream.mediaStream) {
                                                            return Promise.reject(new ErrorModule.P2PError(ErrorModule.errors.P2P_CLIENT_INVALID_STATE, 'Publication is not available.'));
                                                        }

                                                        return _this6.getStats(targetStream.mediaStream);
                                                    });

                                                    _this6._publishedStreams.set(targetStream, publication);

                                                    _this6._publishPromises.get(mediaStreamId).resolve(publication);

                                                    _this6._publishPromises.delete(mediaStreamId);
                                                }();

                                                if (_ret === "continue") continue;
                                            }
                                        }
                                    });
                                };

                                for (var _iterator2 = ids[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                    _loop();
                                }
                            } catch (err) {
                                _didIteratorError2 = true;
                                _iteratorError2 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                                        _iterator2.return();
                                    }
                                } finally {
                                    if (_didIteratorError2) {
                                        throw _iteratorError2;
                                    }
                                }
                            }
                        }
                        /**
                         * @function _tracksRemovedHandler
                         * @desc Handle track removed event from remote side.
                         * @private
                         */

                    }, {
                        key: "_tracksRemovedHandler",
                        value: function _tracksRemovedHandler(ids) {
                            var _this7 = this;

                            // Currently, |ids| contains all track IDs of a MediaStream. Following algorithm also handles |ids| is a part of a MediaStream's tracks.
                            var _iteratorNormalCompletion3 = true;
                            var _didIteratorError3 = false;
                            var _iteratorError3 = undefined;

                            try {
                                var _loop2 = function _loop2() {
                                    var id = _step3.value;

                                    // It could be a problem if there is a track published with different MediaStreams.
                                    _this7._publishedStreamTracks.forEach(function (mediaTrackIds, mediaStreamId) {
                                        for (var i = 0; i < mediaTrackIds.length; i++) {
                                            if (mediaTrackIds[i] === id) {
                                                mediaTrackIds.splice(i, 1);
                                            }
                                        }
                                    });
                                };

                                for (var _iterator3 = ids[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                    _loop2();
                                }
                            } catch (err) {
                                _didIteratorError3 = true;
                                _iteratorError3 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                                        _iterator3.return();
                                    }
                                } finally {
                                    if (_didIteratorError3) {
                                        throw _iteratorError3;
                                    }
                                }
                            }
                        }
                        /**
                         * @function _dataReceivedHandler
                         * @desc Handle data received event from remote side.
                         * @private
                         */

                    }, {
                        key: "_dataReceivedHandler",
                        value: function _dataReceivedHandler(id) {
                            if (!this._sendDataPromises.has(id)) {
                                _logger.default.warning('Received unknown data received message. ID: ' + id);

                                return;
                            } else {
                                this._sendDataPromises.get(id).resolve();
                            }
                        }
                        /**
                         * @function _sdpHandler
                         * @desc Handle SDP received event from remote side.
                         * @private
                         */

                    }, {
                        key: "_sdpHandler",
                        value: function _sdpHandler(sdp) {
                            if (sdp.type === 'offer') {
                                this._onOffer(sdp);
                            } else if (sdp.type === 'answer') {
                                this._onAnswer(sdp);
                            } else if (sdp.type === 'candidates') {
                                this._onRemoteIceCandidate(sdp);
                            }
                        }
                        /**
                         * @function _trackSourcesHandler
                         * @desc Received track source information from remote side.
                         * @private
                         */

                    }, {
                        key: "_trackSourcesHandler",
                        value: function _trackSourcesHandler(data) {
                            var _iteratorNormalCompletion4 = true;
                            var _didIteratorError4 = false;
                            var _iteratorError4 = undefined;

                            try {
                                for (var _iterator4 = data[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                    var info = _step4.value;

                                    this._remoteTrackSourceInfo.set(info.id, info.source);
                                }
                            } catch (err) {
                                _didIteratorError4 = true;
                                _iteratorError4 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
                                        _iterator4.return();
                                    }
                                } finally {
                                    if (_didIteratorError4) {
                                        throw _iteratorError4;
                                    }
                                }
                            }
                        }
                        /**
                         * @function _streamInfoHandler
                         * @desc Received stream information from remote side.
                         * @private
                         */

                    }, {
                        key: "_streamInfoHandler",
                        value: function _streamInfoHandler(data) {
                            if (!data) {
                                _logger.default.warning('Unexpected stream info.');

                                return;
                            }

                            this._remoteStreamInfo.set(data.id, {
                                source: data.source,
                                attributes: data.attributes,
                                stream: null,
                                mediaStream: null,
                                trackIds: data.tracks // Track IDs may not match at sender and receiver sides. Keep it for legacy porposes.

                            });
                        }
                        /**
                         * @function _chatClosedHandler
                         * @desc Received chat closed event from remote side.
                         * @private
                         */

                    }, {
                        key: "_chatClosedHandler",
                        value: function _chatClosedHandler(data) {
                            this._disposed = true;

                            this._stop(data, false);
                        }
                    }, {
                        key: "_onOffer",
                        value: function _onOffer(sdp) {
                            var _this8 = this;

                            _logger.default.debug('About to set remote description. Signaling state: ' + this._pc.signalingState);

                            sdp.sdp = this._setRtpSenderOptions(sdp.sdp, this._config); // Firefox only has one codec in answer, which does not truly reflect its
                            // decoding capability. So we set codec preference to remote offer, and let
                            // Firefox choose its preferred codec.
                            // Reference: https://bugzilla.mozilla.org/show_bug.cgi?id=814227.

                            if (Utils.isFirefox()) {
                                sdp.sdp = this._setCodecOrder(sdp.sdp);
                            }

                            var sessionDescription = new RTCSessionDescription(sdp);

                            this._pc.setRemoteDescription(sessionDescription).then(function () {
                                _this8._createAndSendAnswer();
                            }, function (error) {
                                _logger.default.debug('Set remote description failed. Message: ' + error.message);

                                _this8._stop(error, true);
                            });
                        }
                    }, {
                        key: "_onAnswer",
                        value: function _onAnswer(sdp) {
                            var _this9 = this;

                            _logger.default.debug('About to set remote description. Signaling state: ' + this._pc.signalingState);

                            sdp.sdp = this._setRtpSenderOptions(sdp.sdp, this._config);
                            var sessionDescription = new RTCSessionDescription(sdp);

                            this._pc.setRemoteDescription(new RTCSessionDescription(sessionDescription)).then(function () {
                                _logger.default.debug('Set remote descripiton successfully.');

                                _this9._drainPendingMessages();
                            }, function (error) {
                                _logger.default.debug('Set remote description failed. Message: ' + error.message);

                                _this9._stop(error, true);
                            });
                        }
                    }, {
                        key: "_onLocalIceCandidate",
                        value: function _onLocalIceCandidate(event) {
                            if (event.candidate) {
                                this._sendSdp({
                                    type: 'candidates',
                                    candidate: event.candidate.candidate,
                                    sdpMid: event.candidate.sdpMid,
                                    sdpMLineIndex: event.candidate.sdpMLineIndex
                                }).catch(function (e) {
                                    _logger.default.warning('Failed to send candidate.');
                                });
                            } else {
                                _logger.default.debug('Empty candidate.');
                            }
                        }
                    }, {
                        key: "_onRemoteTrackAdded",
                        value: function _onRemoteTrackAdded(event) {
                            _logger.default.debug('Remote track added.');

                            var _iteratorNormalCompletion5 = true;
                            var _didIteratorError5 = false;
                            var _iteratorError5 = undefined;

                            try {
                                for (var _iterator5 = event.streams[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                    var stream = _step5.value;

                                    if (!this._remoteStreamInfo.has(stream.id)) {
                                        _logger.default.warning('Missing stream info.');

                                        return;
                                    }

                                    if (!this._remoteStreamInfo.get(stream.id).stream) {
                                        this._setStreamToRemoteStreamInfo(stream);
                                    }
                                }
                            } catch (err) {
                                _didIteratorError5 = true;
                                _iteratorError5 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
                                        _iterator5.return();
                                    }
                                } finally {
                                    if (_didIteratorError5) {
                                        throw _iteratorError5;
                                    }
                                }
                            }

                            if (this._pc.iceConnectionState === 'connected' || this._pc.iceConnectionState === 'completed') {
                                this._checkIceConnectionStateAndFireEvent();
                            } else {
                                this._addedTrackIds.concat(event.track.id);
                            }
                        }
                    }, {
                        key: "_onRemoteStreamAdded",
                        value: function _onRemoteStreamAdded(event) {
                            _logger.default.debug('Remote stream added.');

                            if (!this._remoteStreamInfo.has(event.stream.id)) {
                                _logger.default.warning('Cannot find source info for stream ' + event.stream.id);

                                return;
                            }

                            if (this._pc.iceConnectionState === 'connected' || this._pc.iceConnectionState === 'completed') {
                                this._sendSignalingMessage(SignalingType.TRACKS_ADDED, this._remoteStreamInfo.get(event.stream.id).trackIds);
                            } else {
                                this._addedTrackIds = this._addedTrackIds.concat(this._remoteStreamInfo.get(event.stream.id).trackIds);
                            }

                            var audioTrackSource = this._remoteStreamInfo.get(event.stream.id).source.audio;

                            var videoTrackSource = this._remoteStreamInfo.get(event.stream.id).source.video;

                            var sourceInfo = new StreamModule.StreamSourceInfo(audioTrackSource, videoTrackSource);

                            if (Utils.isSafari()) {
                                if (!sourceInfo.audio) {
                                    event.stream.getAudioTracks().forEach(function (track) {
                                        event.stream.removeTrack(track);
                                    });
                                }

                                if (!sourceInfo.video) {
                                    event.stream.getVideoTracks().forEach(function (track) {
                                        event.stream.removeTrack(track);
                                    });
                                }
                            }

                            var attributes = this._remoteStreamInfo.get(event.stream.id).attributes;

                            var stream = new StreamModule.RemoteStream(undefined, this._remoteId, event.stream, sourceInfo, attributes);

                            if (stream) {
                                this._remoteStreams.push(stream);

                                var streamEvent = new StreamModule.StreamEvent('streamadded', {
                                    stream: stream
                                });
                                this.dispatchEvent(streamEvent);
                            }
                        }
                    }, {
                        key: "_onRemoteStreamRemoved",
                        value: function _onRemoteStreamRemoved(event) {
                            _logger.default.debug('Remote stream removed.');

                            var i = this._remoteStreams.findIndex(function (s) {
                                return s.mediaStream.id === event.stream.id;
                            });

                            if (i !== -1) {
                                var stream = this._remoteStreams[i];

                                this._streamRemoved(stream);

                                this._remoteStreams.splice(i, 1);
                            }
                        }
                    }, {
                        key: "_onNegotiationneeded",
                        value: function _onNegotiationneeded() {
                            // This is intented to be executed when onnegotiationneeded event is fired.
                            // However, onnegotiationneeded may fire mutiple times when more than one
                            // track is added/removed. So we manually execute this function after
                            // adding/removing track and creating data channel.
                            _logger.default.debug('On negotiation needed.');

                            if (this._pc.signalingState === 'stable') {
                                this._doNegotiate();
                            } else {
                                this._isNegotiationNeeded = true;
                            }
                        }
                    }, {
                        key: "_onRemoteIceCandidate",
                        value: function _onRemoteIceCandidate(candidateInfo) {
                            var candidate = new RTCIceCandidate({
                                candidate: candidateInfo.candidate,
                                sdpMid: candidateInfo.sdpMid,
                                sdpMLineIndex: candidateInfo.sdpMLineIndex
                            });

                            if (this._pc.remoteDescription && this._pc.remoteDescription.sdp !== '') {
                                _logger.default.debug('Add remote ice candidates.');

                                this._pc.addIceCandidate(candidate).catch(function (error) {
                                    _logger.default.warning('Error processing ICE candidate: ' + error);
                                });
                            } else {
                                _logger.default.debug('Cache remote ice candidates.');

                                this._remoteIceCandidates.push(candidate);
                            }
                        }
                    }, {
                        key: "_onSignalingStateChange",
                        value: function _onSignalingStateChange(event) {
                            _logger.default.debug('Signaling state changed: ' + this._pc.signalingState);

                            if (this._pc.signalingState === 'closed') {// stopChatLocally(peer, peer.id);
                            } else if (this._pc.signalingState === 'stable') {
                                this._negotiating = false;

                                if (this._isNegotiationNeeded) {
                                    this._onNegotiationneeded();
                                } else {
                                    this._drainPendingStreams();

                                    this._drainPendingMessages();
                                }
                            } else if (this._pc.signalingState === 'have-remote-offer') {
                                this._drainPendingRemoteIceCandidates();
                            }
                        }
                    }, {
                        key: "_onIceConnectionStateChange",
                        value: function _onIceConnectionStateChange(event) {
                            if (event.currentTarget.iceConnectionState === 'closed' || event.currentTarget.iceConnectionState === 'failed') {
                                var _error = new ErrorModule.P2PError(ErrorModule.errors.P2P_WEBRTC_UNKNOWN, 'ICE connection failed or closed.');

                                this._stop(_error, true);
                            } else if (event.currentTarget.iceConnectionState === 'connected' || event.currentTarget.iceConnectionState === 'completed') {
                                this._sendSignalingMessage(SignalingType.TRACKS_ADDED, this._addedTrackIds);

                                this._addedTrackIds = [];

                                this._checkIceConnectionStateAndFireEvent();
                            }
                        }
                    }, {
                        key: "_onDataChannelMessage",
                        value: function _onDataChannelMessage(event) {
                            var message = JSON.parse(event.data);

                            _logger.default.debug('Data channel message received: ' + message.data);

                            this._sendSignalingMessage(SignalingType.DATA_RECEIVED, message.id);

                            var messageEvent = new _event.MessageEvent('messagereceived', {
                                message: message.data,
                                origin: this._remoteId
                            });
                            this.dispatchEvent(messageEvent);
                        }
                    }, {
                        key: "_onDataChannelOpen",
                        value: function _onDataChannelOpen(event) {
                            _logger.default.debug('Data Channel is opened.');

                            if (event.target.label === DataChannelLabel.MESSAGE) {
                                _logger.default.debug('Data channel for messages is opened.');

                                this._drainPendingMessages();
                            }
                        }
                    }, {
                        key: "_onDataChannelClose",
                        value: function _onDataChannelClose(event) {
                            _logger.default.debug('Data Channel is closed.');
                        }
                    }, {
                        key: "_streamRemoved",
                        value: function _streamRemoved(stream) {
                            if (!this._remoteStreamInfo.has(stream.mediaStream.id)) {
                                _logger.default.warning('Cannot find stream info.');
                            }

                            this._sendSignalingMessage(SignalingType.TRACKS_REMOVED, this._remoteStreamInfo.get(stream.mediaStream.id).trackIds);

                            var event = new _event.OwtEvent('ended');
                            stream.dispatchEvent(event);
                        }
                    }, {
                        key: "_isUnifiedPlan",
                        value: function _isUnifiedPlan() {
                            if (Utils.isFirefox()) {
                                return true;
                            }

                            var pc = new RTCPeerConnection({
                                sdpSemantics: 'unified-plan'
                            });
                            return pc.getConfiguration() && pc.getConfiguration().sdpSemantics === 'plan-b';
                        }
                    }, {
                        key: "_createPeerConnection",
                        value: function _createPeerConnection() {
                            var _this10 = this;

                            var pcConfiguration = this._config.rtcConfiguration || {};

                            if (Utils.isChrome()) {
                                pcConfiguration.sdpSemantics = 'unified-plan';
                            }

                            this._pc = new RTCPeerConnection(pcConfiguration); // Firefox 59 implemented addTransceiver. However, mid in SDP will differ from track's ID in this case. And transceiver's mid is null.

                            if (typeof this._pc.addTransceiver === 'function' && Utils.isSafari()) {
                                this._pc.addTransceiver('audio');

                                this._pc.addTransceiver('video');
                            }

                            if (!this._isUnifiedPlan() && !Utils.isSafari()) {
                                this._pc.onaddstream = function (event) {
                                    // TODO: Legacy API, should be removed when all UAs implemented WebRTC 1.0.
                                    _this10._onRemoteStreamAdded.apply(_this10, [event]);
                                };

                                this._pc.onremovestream = function (event) {
                                    _this10._onRemoteStreamRemoved.apply(_this10, [event]);
                                };
                            } else {
                                this._pc.ontrack = function (event) {
                                    _this10._onRemoteTrackAdded.apply(_this10, [event]);
                                };
                            }

                            this._pc.onicecandidate = function (event) {
                                _this10._onLocalIceCandidate.apply(_this10, [event]);
                            };

                            this._pc.onsignalingstatechange = function (event) {
                                _this10._onSignalingStateChange.apply(_this10, [event]);
                            };

                            this._pc.ondatachannel = function (event) {
                                _logger.default.debug('On data channel.'); // Save remote created data channel.


                                if (!_this10._dataChannels.has(event.channel.label)) {
                                    _this10._dataChannels.set(event.channel.label, event.channel);

                                    _logger.default.debug('Save remote created data channel.');
                                }

                                _this10._bindEventsToDataChannel(event.channel);
                            };

                            this._pc.oniceconnectionstatechange = function (event) {
                                _this10._onIceConnectionStateChange.apply(_this10, [event]);
                            };
                            /*
      this._pc.oniceChannelStatechange = function(event) {
        _onIceChannelStateChange(peer, event);
      };
       = function() {
        onNegotiationneeded(peers[peer.id]);
      };
        //DataChannel
      this._pc.ondatachannel = function(event) {
        Logger.debug(myId + ': On data channel');
        // Save remote created data channel.
        if (!peer.dataChannels[event.channel.label]) {
          peer.dataChannels[event.channel.label] = event.channel;
          Logger.debug('Save remote created data channel.');
        }
        bindEventsToDataChannel(event.channel, peer);
      };*/

                        }
                    }, {
                        key: "_drainPendingStreams",
                        value: function _drainPendingStreams() {
                            var negotiationNeeded = false;

                            _logger.default.debug('Draining pending streams.');

                            if (this._pc && this._pc.signalingState === 'stable') {
                                _logger.default.debug('Peer connection is ready for draining pending streams.');

                                for (var i = 0; i < this._pendingStreams.length; i++) {
                                    var stream = this._pendingStreams[i]; // OnNegotiationNeeded event will be triggered immediately after adding stream to PeerConnection in Firefox.
                                    // And OnNegotiationNeeded handler will execute drainPendingStreams. To avoid add the same stream multiple times,
                                    // shift it from pending stream list before adding it to PeerConnection.

                                    this._pendingStreams.shift();

                                    if (!stream.mediaStream) {
                                        continue;
                                    }

                                    var _iteratorNormalCompletion6 = true;
                                    var _didIteratorError6 = false;
                                    var _iteratorError6 = undefined;

                                    try {
                                        for (var _iterator6 = stream.mediaStream.getTracks()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                                            var track = _step6.value;

                                            this._pc.addTrack(track, stream.mediaStream);

                                            negotiationNeeded = true;
                                        }
                                    } catch (err) {
                                        _didIteratorError6 = true;
                                        _iteratorError6 = err;
                                    } finally {
                                        try {
                                            if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
                                                _iterator6.return();
                                            }
                                        } finally {
                                            if (_didIteratorError6) {
                                                throw _iteratorError6;
                                            }
                                        }
                                    }

                                    _logger.default.debug('Added stream to peer connection.');

                                    this._publishingStreams.push(stream);
                                }

                                this._pendingStreams.length = 0;

                                for (var j = 0; j < this._pendingUnpublishStreams.length; j++) {
                                    if (!this._pendingUnpublishStreams[j].mediaStream) {
                                        continue;
                                    }

                                    this._pc.removeStream(this._pendingUnpublishStreams[j].mediaStream);

                                    negotiationNeeded = true;

                                    this._unpublishPromises.get(this._pendingUnpublishStreams[j].mediaStream.id).resolve();

                                    this._publishedStreams.delete(this._pendingUnpublishStreams[j]);

                                    _logger.default.debug('Remove stream.');
                                }

                                this._pendingUnpublishStreams.length = 0;
                            }

                            if (negotiationNeeded) {
                                this._onNegotiationneeded();
                            }
                        }
                    }, {
                        key: "_drainPendingRemoteIceCandidates",
                        value: function _drainPendingRemoteIceCandidates() {
                            for (var i = 0; i < this._remoteIceCandidates.length; i++) {
                                _logger.default.debug('Add candidate');

                                this._pc.addIceCandidate(this._remoteIceCandidates[i]).catch(function (error) {
                                    _logger.default.warning('Error processing ICE candidate: ' + error);
                                });
                            }

                            this._remoteIceCandidates.length = 0;
                        }
                    }, {
                        key: "_drainPendingMessages",
                        value: function _drainPendingMessages() {
                            _logger.default.debug('Draining pending messages.');

                            if (this._pendingMessages.length == 0) {
                                return;
                            }

                            var dc = this._dataChannels.get(DataChannelLabel.MESSAGE);

                            if (dc && dc.readyState === 'open') {
                                for (var i = 0; i < this._pendingMessages.length; i++) {
                                    _logger.default.debug('Sending message via data channel: ' + this._pendingMessages[i]);

                                    dc.send(JSON.stringify(this._pendingMessages[i]));
                                }

                                this._pendingMessages.length = 0;
                            } else if (this._pc && !dc) {
                                this._createDataChannel(DataChannelLabel.MESSAGE);
                            }
                        }
                    }, {
                        key: "_sendStreamInfo",
                        value: function _sendStreamInfo(stream) {
                            if (!stream || !stream.mediaStream) {
                                return new ErrorModule.P2PError(ErrorModule.errors.P2P_CLIENT_ILLEGAL_ARGUMENT);
                            }

                            var info = [];
                            stream.mediaStream.getTracks().map(function (track) {
                                info.push({
                                    id: track.id,
                                    source: stream.source[track.kind]
                                });
                            });
                            return Promise.all([this._sendSignalingMessage(SignalingType.TRACK_SOURCES, info), this._sendSignalingMessage(SignalingType.STREAM_INFO, {
                                id: stream.mediaStream.id,
                                attributes: stream.attributes,
                                // Track IDs may not match at sender and receiver sides.
                                tracks: Array.from(info, function (item) {
                                    return item.id;
                                }),
                                // This is a workaround for Safari. Please use track-sources if possible.
                                source: stream.source
                            })]);
                        }
                    }, {
                        key: "_sendSysInfoIfNecessary",
                        value: function _sendSysInfoIfNecessary() {
                            if (this._infoSent) {
                                return Promise.resolve();
                            }

                            this._infoSent = true;
                            return this._sendSignalingMessage(SignalingType.UA, sysInfo);
                        }
                    }, {
                        key: "_sendClosedMsgIfNecessary",
                        value: function _sendClosedMsgIfNecessary() {
                            if (this._pc.remoteDescription === null || this._pc.remoteDescription.sdp === '') {
                                return this._sendSignalingMessage(SignalingType.CLOSED);
                            }

                            return Promise.resolve();
                        }
                    }, {
                        key: "_handleRemoteCapability",
                        value: function _handleRemoteCapability(ua) {
                            if (ua.sdk && ua.sdk && ua.sdk.type === 'JavaScript' && ua.runtime && ua.runtime.name === 'Firefox') {
                                this._remoteSideSupportsRemoveStream = false;
                                this._remoteSideSupportsPlanB = false;
                                this._remoteSideSupportsUnifiedPlan = true;
                            } else {
                                // Remote side is iOS/Android/C++ which uses Google's WebRTC stack.
                                this._remoteSideSupportsRemoveStream = true;
                                this._remoteSideSupportsPlanB = true;
                                this._remoteSideSupportsUnifiedPlan = false;
                            }
                        }
                    }, {
                        key: "_doNegotiate",
                        value: function _doNegotiate() {
                            this._createAndSendOffer();
                        }
                    }, {
                        key: "_setCodecOrder",
                        value: function _setCodecOrder(sdp) {
                            if (this._config.audioEncodings) {
                                var audioCodecNames = Array.from(this._config.audioEncodings, function (encodingParameters) {
                                    return encodingParameters.codec.name;
                                });
                                sdp = SdpUtils.reorderCodecs(sdp, 'audio', audioCodecNames);
                            }

                            if (this._config.videoEncodings) {
                                var videoCodecNames = Array.from(this._config.videoEncodings, function (encodingParameters) {
                                    return encodingParameters.codec.name;
                                });
                                sdp = SdpUtils.reorderCodecs(sdp, 'video', videoCodecNames);
                            }

                            return sdp;
                        }
                    }, {
                        key: "_setMaxBitrate",
                        value: function _setMaxBitrate(sdp, options) {
                            if (_typeof(options.audioEncodings) === 'object') {
                                sdp = SdpUtils.setMaxBitrate(sdp, options.audioEncodings);
                            }

                            if (_typeof(options.videoEncodings) === 'object') {
                                sdp = SdpUtils.setMaxBitrate(sdp, options.videoEncodings);
                            }

                            return sdp;
                        }
                    }, {
                        key: "_setRtpSenderOptions",
                        value: function _setRtpSenderOptions(sdp, options) {
                            sdp = this._setMaxBitrate(sdp, options);
                            return sdp;
                        }
                    }, {
                        key: "_setRtpReceiverOptions",
                        value: function _setRtpReceiverOptions(sdp) {
                            sdp = this._setCodecOrder(sdp);
                            return sdp;
                        }
                    }, {
                        key: "_createAndSendOffer",
                        value: function _createAndSendOffer() {
                            var _this11 = this;

                            if (!this._pc) {
                                _logger.default.error('Peer connection have not been created.');

                                return;
                            }

                            this._isNegotiationNeeded = false;
                            this._isCaller = true;
                            var localDesc;

                            this._pc.createOffer().then(function (desc) {
                                desc.sdp = _this11._setRtpReceiverOptions(desc.sdp);
                                localDesc = desc;

                                if (_this11._pc.signalingState === 'stable') {
                                    return _this11._pc.setLocalDescription(desc).then(function () {
                                        return _this11._sendSdp(localDesc);
                                    });
                                }
                            }).catch(function (e) {
                                _logger.default.error(e.message + ' Please check your codec settings.');

                                var error = new ErrorModule.P2PError(ErrorModule.errors.P2P_WEBRTC_SDP, e.message);

                                _this11._stop(error, true);
                            });
                        }
                    }, {
                        key: "_createAndSendAnswer",
                        value: function _createAndSendAnswer() {
                            var _this12 = this;

                            this._drainPendingStreams();

                            this._isNegotiationNeeded = false;
                            this._isCaller = false;
                            var localDesc;

                            this._pc.createAnswer().then(function (desc) {
                                desc.sdp = _this12._setRtpReceiverOptions(desc.sdp);
                                localDesc = desc;

                                _this12._logCurrentAndPendingLocalDescription();

                                return _this12._pc.setLocalDescription(desc);
                            }).then(function () {
                                return _this12._sendSdp(localDesc);
                            }).catch(function (e) {
                                _logger.default.error(e.message + ' Please check your codec settings.');

                                var error = new ErrorModule.P2PError(ErrorModule.errors.P2P_WEBRTC_SDP, e.message);

                                _this12._stop(error, true);
                            });
                        }
                    }, {
                        key: "_logCurrentAndPendingLocalDescription",
                        value: function _logCurrentAndPendingLocalDescription() {
                            _logger.default.info('Current description: ' + this._pc.currentLocalDescription);

                            _logger.default.info('Pending description: ' + this._pc.pendingLocalDescription);
                        }
                    }, {
                        key: "_getAndDeleteTrackSourceInfo",
                        value: function _getAndDeleteTrackSourceInfo(tracks) {
                            if (tracks.length > 0) {
                                var trackId = tracks[0].id;

                                if (this._remoteTrackSourceInfo.has(trackId)) {
                                    var sourceInfo = this._remoteTrackSourceInfo.get(trackId);

                                    this._remoteTrackSourceInfo.delete(trackId);

                                    return sourceInfo;
                                } else {
                                    _logger.default.warning('Cannot find source info for ' + trackId);
                                }
                            }
                        }
                    }, {
                        key: "_unpublish",
                        value: function _unpublish(stream) {
                            var _this13 = this;

                            if (navigator.mozGetUserMedia || !this._remoteSideSupportsRemoveStream) {
                                // Actually unpublish is supported. It is a little bit complex since Firefox implemented WebRTC spec while Chrome implemented an old API.
                                _logger.default.error('Stopping a publication is not supported on Firefox. Please use P2PClient.stop() to stop the connection with remote endpoint.');

                                return Promise.reject(new ErrorModule.P2PError(ErrorModule.errors.P2P_CLIENT_UNSUPPORTED_METHOD));
                            }

                            if (!this._publishedStreams.has(stream)) {
                                return Promise.reject(new ErrorModule.P2PError(ErrorModule.errors.P2P_CLIENT_ILLEGAL_ARGUMENT));
                            }

                            this._pendingUnpublishStreams.push(stream);

                            return new Promise(function (resolve, reject) {
                                _this13._unpublishPromises.set(stream.mediaStream.id, {
                                    resolve: resolve,
                                    reject: reject
                                });

                                _this13._drainPendingStreams();
                            });
                        } // Make sure |_pc| is available before calling this method.

                    }, {
                        key: "_createDataChannel",
                        value: function _createDataChannel(label) {
                            if (this._dataChannels.has(label)) {
                                _logger.default.warning('Data channel labeled ' + label + ' already exists.');

                                return;
                            }

                            if (!this._pc) {
                                _logger.default.debug('PeerConnection is not available before creating DataChannel.');

                                return;
                            }

                            _logger.default.debug('Create data channel.');

                            var dc = this._pc.createDataChannel(label);

                            this._bindEventsToDataChannel(dc);

                            this._dataChannels.set(DataChannelLabel.MESSAGE, dc);

                            this._onNegotiationneeded();
                        }
                    }, {
                        key: "_bindEventsToDataChannel",
                        value: function _bindEventsToDataChannel(dc) {
                            var _this14 = this;

                            dc.onmessage = function (event) {
                                _this14._onDataChannelMessage.apply(_this14, [event]);
                            };

                            dc.onopen = function (event) {
                                _this14._onDataChannelOpen.apply(_this14, [event]);
                            };

                            dc.onclose = function (event) {
                                _this14._onDataChannelClose.apply(_this14, [event]);
                            };

                            dc.onerror = function (event) {
                                _logger.default.debug('Data Channel Error:', error);
                            };
                        } // Returns all MediaStreams it belongs to.

                    }, {
                        key: "_getStreamByTrack",
                        value: function _getStreamByTrack(mediaStreamTrack) {
                            var streams = [];
                            var _iteratorNormalCompletion7 = true;
                            var _didIteratorError7 = false;
                            var _iteratorError7 = undefined;

                            try {
                                for (var _iterator7 = this._remoteStreamInfo[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                                    var _step7$value = _slicedToArray(_step7.value, 2),
                                        id = _step7$value[0],
                                        info = _step7$value[1];

                                    if (!info.stream || !info.stream.mediaStream) {
                                        continue;
                                    }

                                    var _iteratorNormalCompletion8 = true;
                                    var _didIteratorError8 = false;
                                    var _iteratorError8 = undefined;

                                    try {
                                        for (var _iterator8 = info.stream.mediaStream.getTracks()[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                                            var track = _step8.value;

                                            if (mediaStreamTrack === track) {
                                                streams.push(info.stream.mediaStream);
                                            }
                                        }
                                    } catch (err) {
                                        _didIteratorError8 = true;
                                        _iteratorError8 = err;
                                    } finally {
                                        try {
                                            if (!_iteratorNormalCompletion8 && _iterator8.return != null) {
                                                _iterator8.return();
                                            }
                                        } finally {
                                            if (_didIteratorError8) {
                                                throw _iteratorError8;
                                            }
                                        }
                                    }
                                }
                            } catch (err) {
                                _didIteratorError7 = true;
                                _iteratorError7 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion7 && _iterator7.return != null) {
                                        _iterator7.return();
                                    }
                                } finally {
                                    if (_didIteratorError7) {
                                        throw _iteratorError7;
                                    }
                                }
                            }

                            return streams;
                        }
                    }, {
                        key: "_areAllTracksEnded",
                        value: function _areAllTracksEnded(mediaStream) {
                            var _iteratorNormalCompletion9 = true;
                            var _didIteratorError9 = false;
                            var _iteratorError9 = undefined;

                            try {
                                for (var _iterator9 = mediaStream.getTracks()[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                                    var track = _step9.value;

                                    if (track.readyState === 'live') {
                                        return false;
                                    }
                                }
                            } catch (err) {
                                _didIteratorError9 = true;
                                _iteratorError9 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion9 && _iterator9.return != null) {
                                        _iterator9.return();
                                    }
                                } finally {
                                    if (_didIteratorError9) {
                                        throw _iteratorError9;
                                    }
                                }
                            }

                            return true;
                        }
                    }, {
                        key: "_stop",
                        value: function _stop(error, notifyRemote) {
                            var promiseError = error;

                            if (!promiseError) {
                                promiseError = new ErrorModule.P2PError(ErrorModule.errors.P2P_CLIENT_UNKNOWN);
                            }

                            var _iteratorNormalCompletion10 = true;
                            var _didIteratorError10 = false;
                            var _iteratorError10 = undefined;

                            try {
                                for (var _iterator10 = this._dataChannels[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                                    var _step10$value = _slicedToArray(_step10.value, 2),
                                        label = _step10$value[0],
                                        dc = _step10$value[1];

                                    dc.close();
                                }
                            } catch (err) {
                                _didIteratorError10 = true;
                                _iteratorError10 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion10 && _iterator10.return != null) {
                                        _iterator10.return();
                                    }
                                } finally {
                                    if (_didIteratorError10) {
                                        throw _iteratorError10;
                                    }
                                }
                            }

                            this._dataChannels.clear();

                            if (this._pc && this._pc.iceConnectionState !== 'closed') {
                                this._pc.close();
                            }

                            var _iteratorNormalCompletion11 = true;
                            var _didIteratorError11 = false;
                            var _iteratorError11 = undefined;

                            try {
                                for (var _iterator11 = this._publishPromises[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                                    var _step11$value = _slicedToArray(_step11.value, 2),
                                        id = _step11$value[0],
                                        promise = _step11$value[1];

                                    promise.reject(promiseError);
                                }
                            } catch (err) {
                                _didIteratorError11 = true;
                                _iteratorError11 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion11 && _iterator11.return != null) {
                                        _iterator11.return();
                                    }
                                } finally {
                                    if (_didIteratorError11) {
                                        throw _iteratorError11;
                                    }
                                }
                            }

                            this._publishPromises.clear();

                            var _iteratorNormalCompletion12 = true;
                            var _didIteratorError12 = false;
                            var _iteratorError12 = undefined;

                            try {
                                for (var _iterator12 = this._unpublishPromises[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
                                    var _step12$value = _slicedToArray(_step12.value, 2),
                                        id = _step12$value[0],
                                        promise = _step12$value[1];

                                    promise.reject(promiseError);
                                }
                            } catch (err) {
                                _didIteratorError12 = true;
                                _iteratorError12 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion12 && _iterator12.return != null) {
                                        _iterator12.return();
                                    }
                                } finally {
                                    if (_didIteratorError12) {
                                        throw _iteratorError12;
                                    }
                                }
                            }

                            this._unpublishPromises.clear();

                            var _iteratorNormalCompletion13 = true;
                            var _didIteratorError13 = false;
                            var _iteratorError13 = undefined;

                            try {
                                for (var _iterator13 = this._sendDataPromises[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
                                    var _step13$value = _slicedToArray(_step13.value, 2),
                                        id = _step13$value[0],
                                        promise = _step13$value[1];

                                    promise.reject(promiseError);
                                }
                            } catch (err) {
                                _didIteratorError13 = true;
                                _iteratorError13 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion13 && _iterator13.return != null) {
                                        _iterator13.return();
                                    }
                                } finally {
                                    if (_didIteratorError13) {
                                        throw _iteratorError13;
                                    }
                                }
                            }

                            this._sendDataPromises.clear(); // Fire ended event if publication or remote stream exists.


                            this._publishedStreams.forEach(function (publication) {
                                publication.dispatchEvent(new _event.OwtEvent('ended'));
                            });

                            this._publishedStreams.clear();

                            this._remoteStreams.forEach(function (stream) {
                                stream.dispatchEvent(new _event.OwtEvent('ended'));
                            });

                            this._remoteStreams = [];

                            if (!this._disposed) {
                                if (notifyRemote) {
                                    var sendError;

                                    if (error) {
                                        sendError = JSON.parse(JSON.stringify(error)); // Avoid to leak detailed error to remote side.

                                        sendError.message = 'Error happened at remote side.';
                                    }

                                    this._sendSignalingMessage(SignalingType.CLOSED, sendError).catch(function (err) {
                                        _logger.default.debug('Failed to send close.' + err.message);
                                    });
                                }

                                this.dispatchEvent(new Event('ended'));
                            }
                        }
                    }, {
                        key: "_setStreamToRemoteStreamInfo",
                        value: function _setStreamToRemoteStreamInfo(mediaStream) {
                            var info = this._remoteStreamInfo.get(mediaStream.id);

                            var attributes = info.attributes;
                            var sourceInfo = new StreamModule.StreamSourceInfo(this._remoteStreamInfo.get(mediaStream.id).source.audio, this._remoteStreamInfo.get(mediaStream.id).source.video);
                            info.stream = new StreamModule.RemoteStream(undefined, this._remoteId, mediaStream, sourceInfo, attributes);
                            info.mediaStream = mediaStream;
                            var stream = info.stream;

                            if (stream) {
                                this._remoteStreams.push(stream);
                            } else {
                                _logger.default.warning('Failed to create RemoteStream.');
                            }
                        }
                    }, {
                        key: "_checkIceConnectionStateAndFireEvent",
                        value: function _checkIceConnectionStateAndFireEvent() {
                            var _this15 = this;

                            if (this._pc.iceConnectionState === 'connected' || this._pc.iceConnectionState === 'completed') {
                                var _iteratorNormalCompletion14 = true;
                                var _didIteratorError14 = false;
                                var _iteratorError14 = undefined;

                                try {
                                    for (var _iterator14 = this._remoteStreamInfo[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
                                        var _step14$value = _slicedToArray(_step14.value, 2),
                                            id = _step14$value[0],
                                            info = _step14$value[1];

                                        if (info.mediaStream) {
                                            var streamEvent = new StreamModule.StreamEvent('streamadded', {
                                                stream: info.stream
                                            });

                                            if (this._isUnifiedPlan()) {
                                                var _iteratorNormalCompletion15 = true;
                                                var _didIteratorError15 = false;
                                                var _iteratorError15 = undefined;

                                                try {
                                                    for (var _iterator15 = info.mediaStream.getTracks()[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
                                                        var track = _step15.value;
                                                        track.addEventListener('ended', function (event) {
                                                            var mediaStreams = _this15._getStreamByTrack(event.target);

                                                            var _iteratorNormalCompletion16 = true;
                                                            var _didIteratorError16 = false;
                                                            var _iteratorError16 = undefined;

                                                            try {
                                                                for (var _iterator16 = mediaStreams[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
                                                                    var mediaStream = _step16.value;

                                                                    if (_this15._areAllTracksEnded(mediaStream)) {
                                                                        _this15._onRemoteStreamRemoved(mediaStream);
                                                                    }
                                                                }
                                                            } catch (err) {
                                                                _didIteratorError16 = true;
                                                                _iteratorError16 = err;
                                                            } finally {
                                                                try {
                                                                    if (!_iteratorNormalCompletion16 && _iterator16.return != null) {
                                                                        _iterator16.return();
                                                                    }
                                                                } finally {
                                                                    if (_didIteratorError16) {
                                                                        throw _iteratorError16;
                                                                    }
                                                                }
                                                            }
                                                        });
                                                    }
                                                } catch (err) {
                                                    _didIteratorError15 = true;
                                                    _iteratorError15 = err;
                                                } finally {
                                                    try {
                                                        if (!_iteratorNormalCompletion15 && _iterator15.return != null) {
                                                            _iterator15.return();
                                                        }
                                                    } finally {
                                                        if (_didIteratorError15) {
                                                            throw _iteratorError15;
                                                        }
                                                    }
                                                }
                                            }

                                            this._sendSignalingMessage(SignalingType.TRACKS_ADDED, info.trackIds);

                                            this._remoteStreamInfo.get(info.mediaStream.id).mediaStream = null;
                                            this.dispatchEvent(streamEvent);
                                        }
                                    }
                                } catch (err) {
                                    _didIteratorError14 = true;
                                    _iteratorError14 = err;
                                } finally {
                                    try {
                                        if (!_iteratorNormalCompletion14 && _iterator14.return != null) {
                                            _iterator14.return();
                                        }
                                    } finally {
                                        if (_didIteratorError14) {
                                            throw _iteratorError14;
                                        }
                                    }
                                }
                            }
                        }
                    }]);

                    return P2PPeerConnectionChannel;
                }(_event.EventDispatcher);

            var _default = P2PPeerConnectionChannel;
            exports.default = _default;

        }, {
            "../base/event.js": 3,
            "../base/logger.js": 5,
            "../base/publication.js": 8,
            "../base/sdputils.js": 9,
            "../base/stream.js": 10,
            "../base/utils.js": 11,
            "./error.js": 23
        }]
    }, {}, [22])(22)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2RrL2Jhc2UvYmFzZTY0LmpzIiwic3JjL3Nkay9iYXNlL2NvZGVjLmpzIiwic3JjL3Nkay9iYXNlL2V2ZW50LmpzIiwic3JjL3Nkay9iYXNlL2V4cG9ydC5qcyIsInNyYy9zZGsvYmFzZS9sb2dnZXIuanMiLCJzcmMvc2RrL2Jhc2UvbWVkaWFmb3JtYXQuanMiLCJzcmMvc2RrL2Jhc2UvbWVkaWFzdHJlYW0tZmFjdG9yeS5qcyIsInNyYy9zZGsvYmFzZS9wdWJsaWNhdGlvbi5qcyIsInNyYy9zZGsvYmFzZS9zZHB1dGlscy5qcyIsInNyYy9zZGsvYmFzZS9zdHJlYW0uanMiLCJzcmMvc2RrL2Jhc2UvdXRpbHMuanMiLCJzcmMvc2RrL2NvbmZlcmVuY2UvY2hhbm5lbC5qcyIsInNyYy9zZGsvY29uZmVyZW5jZS9jbGllbnQuanMiLCJzcmMvc2RrL2NvbmZlcmVuY2UvZXJyb3IuanMiLCJzcmMvc2RrL2NvbmZlcmVuY2UvZXhwb3J0LmpzIiwic3JjL3Nkay9jb25mZXJlbmNlL2luZm8uanMiLCJzcmMvc2RrL2NvbmZlcmVuY2UvbWl4ZWRzdHJlYW0uanMiLCJzcmMvc2RrL2NvbmZlcmVuY2UvcGFydGljaXBhbnQuanMiLCJzcmMvc2RrL2NvbmZlcmVuY2Uvc2lnbmFsaW5nLmpzIiwic3JjL3Nkay9jb25mZXJlbmNlL3N0cmVhbXV0aWxzLmpzIiwic3JjL3Nkay9jb25mZXJlbmNlL3N1YnNjcmlwdGlvbi5qcyIsInNyYy9zZGsvZXhwb3J0LmpzIiwic3JjL3Nkay9wMnAvZXJyb3IuanMiLCJzcmMvc2RrL3AycC9leHBvcnQuanMiLCJzcmMvc2RrL3AycC9wMnBjbGllbnQuanMiLCJzcmMvc2RrL3AycC9wZWVyY29ubmVjdGlvbi1jaGFubmVsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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eEIsd0IiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvLyBNSVQgTGljZW5zZVxyXG4vL1xyXG4vLyBDb3B5cmlnaHQgKGMpIDIwMTIgVW5pdmVyc2lkYWQgUG9saXTDqWNuaWNhIGRlIE1hZHJpZFxyXG4vL1xyXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcclxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG4vL1xyXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcclxuLy8gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuLy9cclxuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcclxuLy8gU09GVFdBUkUuXHJcblxyXG4vLyBDb3B5cmlnaHQgKEMpIDwyMDE4PiBJbnRlbCBDb3Jwb3JhdGlvblxyXG4vL1xyXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxyXG5cclxuLy8gVGhpcyBmaWxlIGlzIGJvcnJvd2VkIGZyb20gbHluY2tpYS9saWNvZGUgd2l0aCBzb21lIG1vZGlmaWNhdGlvbnMuXHJcblxyXG4vKiBnbG9iYWwgdW5lc2NhcGUqL1xyXG4ndXNlIHN0cmljdCc7XHJcbmV4cG9ydCBjb25zdCBCYXNlNjQgPSAoZnVuY3Rpb24oKSB7XHJcbiAgY29uc3QgRU5EX09GX0lOUFVUID0gLTE7XHJcbiAgbGV0IGJhc2U2NFN0cjtcclxuICBsZXQgYmFzZTY0Q291bnQ7XHJcblxyXG4gIGxldCBpO1xyXG5cclxuICBjb25zdCBiYXNlNjRDaGFycyA9IFtcclxuICAgICdBJywgJ0InLCAnQycsICdEJywgJ0UnLCAnRicsICdHJywgJ0gnLFxyXG4gICAgJ0knLCAnSicsICdLJywgJ0wnLCAnTScsICdOJywgJ08nLCAnUCcsXHJcbiAgICAnUScsICdSJywgJ1MnLCAnVCcsICdVJywgJ1YnLCAnVycsICdYJyxcclxuICAgICdZJywgJ1onLCAnYScsICdiJywgJ2MnLCAnZCcsICdlJywgJ2YnLFxyXG4gICAgJ2cnLCAnaCcsICdpJywgJ2onLCAnaycsICdsJywgJ20nLCAnbicsXHJcbiAgICAnbycsICdwJywgJ3EnLCAncicsICdzJywgJ3QnLCAndScsICd2JyxcclxuICAgICd3JywgJ3gnLCAneScsICd6JywgJzAnLCAnMScsICcyJywgJzMnLFxyXG4gICAgJzQnLCAnNScsICc2JywgJzcnLCAnOCcsICc5JywgJysnLCAnLycsXHJcbiAgXTtcclxuXHJcbiAgY29uc3QgcmV2ZXJzZUJhc2U2NENoYXJzID0gW107XHJcblxyXG4gIGZvciAoaSA9IDA7IGkgPCBiYXNlNjRDaGFycy5sZW5ndGg7IGkgPSBpICsgMSkge1xyXG4gICAgcmV2ZXJzZUJhc2U2NENoYXJzW2Jhc2U2NENoYXJzW2ldXSA9IGk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBzZXRCYXNlNjRTdHIgPSBmdW5jdGlvbihzdHIpIHtcclxuICAgIGJhc2U2NFN0ciA9IHN0cjtcclxuICAgIGJhc2U2NENvdW50ID0gMDtcclxuICB9O1xyXG5cclxuICBjb25zdCByZWFkQmFzZTY0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAoIWJhc2U2NFN0cikge1xyXG4gICAgICByZXR1cm4gRU5EX09GX0lOUFVUO1xyXG4gICAgfVxyXG4gICAgaWYgKGJhc2U2NENvdW50ID49IGJhc2U2NFN0ci5sZW5ndGgpIHtcclxuICAgICAgcmV0dXJuIEVORF9PRl9JTlBVVDtcclxuICAgIH1cclxuICAgIGNvbnN0IGMgPSBiYXNlNjRTdHIuY2hhckNvZGVBdChiYXNlNjRDb3VudCkgJiAweGZmO1xyXG4gICAgYmFzZTY0Q291bnQgPSBiYXNlNjRDb3VudCArIDE7XHJcbiAgICByZXR1cm4gYztcclxuICB9O1xyXG5cclxuICBjb25zdCBlbmNvZGVCYXNlNjQgPSBmdW5jdGlvbihzdHIpIHtcclxuICAgIGxldCByZXN1bHQ7XHJcbiAgICBsZXQgZG9uZTtcclxuICAgIHNldEJhc2U2NFN0cihzdHIpO1xyXG4gICAgcmVzdWx0ID0gJyc7XHJcbiAgICBjb25zdCBpbkJ1ZmZlciA9IG5ldyBBcnJheSgzKTtcclxuICAgIGRvbmUgPSBmYWxzZTtcclxuICAgIHdoaWxlICghZG9uZSAmJiAoaW5CdWZmZXJbMF0gPSByZWFkQmFzZTY0KCkpICE9PSBFTkRfT0ZfSU5QVVQpIHtcclxuICAgICAgaW5CdWZmZXJbMV0gPSByZWFkQmFzZTY0KCk7XHJcbiAgICAgIGluQnVmZmVyWzJdID0gcmVhZEJhc2U2NCgpO1xyXG4gICAgICByZXN1bHQgPSByZXN1bHQgKyAoYmFzZTY0Q2hhcnNbaW5CdWZmZXJbMF0gPj4gMl0pO1xyXG4gICAgICBpZiAoaW5CdWZmZXJbMV0gIT09IEVORF9PRl9JTlBVVCkge1xyXG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdCArIChiYXNlNjRDaGFyc1soKGluQnVmZmVyWzBdIDw8IDQpICYgMHgzMCkgfCAoXHJcbiAgICAgICAgICBpbkJ1ZmZlclsxXSA+PiA0KV0pO1xyXG4gICAgICAgIGlmIChpbkJ1ZmZlclsyXSAhPT0gRU5EX09GX0lOUFVUKSB7XHJcbiAgICAgICAgICByZXN1bHQgPSByZXN1bHQgKyAoYmFzZTY0Q2hhcnNbKChpbkJ1ZmZlclsxXSA8PCAyKSAmIDB4M2MpIHwgKFxyXG4gICAgICAgICAgICBpbkJ1ZmZlclsyXSA+PiA2KV0pO1xyXG4gICAgICAgICAgcmVzdWx0ID0gcmVzdWx0ICsgKGJhc2U2NENoYXJzW2luQnVmZmVyWzJdICYgMHgzRl0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXN1bHQgPSByZXN1bHQgKyAoYmFzZTY0Q2hhcnNbKChpbkJ1ZmZlclsxXSA8PCAyKSAmIDB4M2MpXSk7XHJcbiAgICAgICAgICByZXN1bHQgPSByZXN1bHQgKyAoJz0nKTtcclxuICAgICAgICAgIGRvbmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXN1bHQgPSByZXN1bHQgKyAoYmFzZTY0Q2hhcnNbKChpbkJ1ZmZlclswXSA8PCA0KSAmIDB4MzApXSk7XHJcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0ICsgKCc9Jyk7XHJcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0ICsgKCc9Jyk7XHJcbiAgICAgICAgZG9uZSA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgcmVhZFJldmVyc2VCYXNlNjQgPSBmdW5jdGlvbigpIHtcclxuICAgIGlmICghYmFzZTY0U3RyKSB7XHJcbiAgICAgIHJldHVybiBFTkRfT0ZfSU5QVVQ7XHJcbiAgICB9XHJcbiAgICB3aGlsZSAodHJ1ZSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnN0YW50LWNvbmRpdGlvblxyXG4gICAgICBpZiAoYmFzZTY0Q291bnQgPj0gYmFzZTY0U3RyLmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVybiBFTkRfT0ZfSU5QVVQ7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgbmV4dENoYXJhY3RlciA9IGJhc2U2NFN0ci5jaGFyQXQoYmFzZTY0Q291bnQpO1xyXG4gICAgICBiYXNlNjRDb3VudCA9IGJhc2U2NENvdW50ICsgMTtcclxuICAgICAgaWYgKHJldmVyc2VCYXNlNjRDaGFyc1tuZXh0Q2hhcmFjdGVyXSkge1xyXG4gICAgICAgIHJldHVybiByZXZlcnNlQmFzZTY0Q2hhcnNbbmV4dENoYXJhY3Rlcl07XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG5leHRDaGFyYWN0ZXIgPT09ICdBJykge1xyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgbnRvcyA9IGZ1bmN0aW9uKG4pIHtcclxuICAgIG4gPSBuLnRvU3RyaW5nKDE2KTtcclxuICAgIGlmIChuLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICBuID0gJzAnICsgbjtcclxuICAgIH1cclxuICAgIG4gPSAnJScgKyBuO1xyXG4gICAgcmV0dXJuIHVuZXNjYXBlKG4pO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGRlY29kZUJhc2U2NCA9IGZ1bmN0aW9uKHN0cikge1xyXG4gICAgbGV0IHJlc3VsdDtcclxuICAgIGxldCBkb25lO1xyXG4gICAgc2V0QmFzZTY0U3RyKHN0cik7XHJcbiAgICByZXN1bHQgPSAnJztcclxuICAgIGNvbnN0IGluQnVmZmVyID0gbmV3IEFycmF5KDQpO1xyXG4gICAgZG9uZSA9IGZhbHNlO1xyXG4gICAgd2hpbGUgKCFkb25lICYmIChpbkJ1ZmZlclswXSA9IHJlYWRSZXZlcnNlQmFzZTY0KCkpICE9PSBFTkRfT0ZfSU5QVVQgJiZcclxuICAgICAgKGluQnVmZmVyWzFdID0gcmVhZFJldmVyc2VCYXNlNjQoKSkgIT09IEVORF9PRl9JTlBVVCkge1xyXG4gICAgICBpbkJ1ZmZlclsyXSA9IHJlYWRSZXZlcnNlQmFzZTY0KCk7XHJcbiAgICAgIGluQnVmZmVyWzNdID0gcmVhZFJldmVyc2VCYXNlNjQoKTtcclxuICAgICAgcmVzdWx0ID0gcmVzdWx0ICsgbnRvcygoKChpbkJ1ZmZlclswXSA8PCAyKSAmIDB4ZmYpIHwgaW5CdWZmZXJbMV0gPj5cclxuICAgICAgICA0KSk7XHJcbiAgICAgIGlmIChpbkJ1ZmZlclsyXSAhPT0gRU5EX09GX0lOUFVUKSB7XHJcbiAgICAgICAgcmVzdWx0ICs9IG50b3MoKCgoaW5CdWZmZXJbMV0gPDwgNCkgJiAweGZmKSB8IGluQnVmZmVyWzJdID4+IDIpKTtcclxuICAgICAgICBpZiAoaW5CdWZmZXJbM10gIT09IEVORF9PRl9JTlBVVCkge1xyXG4gICAgICAgICAgcmVzdWx0ID0gcmVzdWx0ICsgbnRvcygoKChpbkJ1ZmZlclsyXSA8PCA2KSAmIDB4ZmYpIHwgaW5CdWZmZXJbXHJcbiAgICAgICAgICAgICAgM10pKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZG9uZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRvbmUgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH07XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBlbmNvZGVCYXNlNjQ6IGVuY29kZUJhc2U2NCxcclxuICAgIGRlY29kZUJhc2U2NDogZGVjb2RlQmFzZTY0LFxyXG4gIH07XHJcbn0oKSk7XHJcbiIsIi8vIENvcHlyaWdodCAoQykgPDIwMTg+IEludGVsIENvcnBvcmF0aW9uXHJcbi8vXHJcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXHJcblxyXG4ndXNlIHN0cmljdCc7XHJcblxyXG4vKipcclxuICogQGNsYXNzIEF1ZGlvQ29kZWNcclxuICogQG1lbWJlck9mIE93dC5CYXNlXHJcbiAqIEBjbGFzc0Rlc2MgQXVkaW8gY29kZWMgZW51bWVyYXRpb24uXHJcbiAqIEBoaWRlY29uc3RydWN0b3JcclxuICovXHJcbmV4cG9ydCBjb25zdCBBdWRpb0NvZGVjID0ge1xyXG4gIFBDTVU6ICdwY211JyxcclxuICBQQ01BOiAncGNtYScsXHJcbiAgT1BVUzogJ29wdXMnLFxyXG4gIEc3MjI6ICdnNzIyJyxcclxuICBJU0FDOiAnaVNBQycsXHJcbiAgSUxCQzogJ2lMQkMnLFxyXG4gIEFBQzogJ2FhYycsXHJcbiAgQUMzOiAnYWMzJyxcclxuICBORUxMWU1PU0VSOiAnbmVsbHltb3NlcicsXHJcbn07XHJcbi8qKlxyXG4gKiBAY2xhc3MgQXVkaW9Db2RlY1BhcmFtZXRlcnNcclxuICogQG1lbWJlck9mIE93dC5CYXNlXHJcbiAqIEBjbGFzc0Rlc2MgQ29kZWMgcGFyYW1ldGVycyBmb3IgYW4gYXVkaW8gdHJhY2suXHJcbiAqIEBoaWRlY29uc3RydWN0b3JcclxuICovXHJcbmV4cG9ydCBjbGFzcyBBdWRpb0NvZGVjUGFyYW1ldGVycyB7XHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2NcclxuICBjb25zdHJ1Y3RvcihuYW1lLCBjaGFubmVsQ291bnQsIGNsb2NrUmF0ZSkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAbWVtYmVyIHtzdHJpbmd9IG5hbWVcclxuICAgICAqIEBtZW1iZXJvZiBPd3QuQmFzZS5BdWRpb0NvZGVjUGFyYW1ldGVyc1xyXG4gICAgICogQGluc3RhbmNlXHJcbiAgICAgKiBAZGVzYyBOYW1lIG9mIGEgY29kZWMuIFBsZWFzZSB1c2UgYSB2YWx1ZSBpbiBPd3QuQmFzZS5BdWRpb0NvZGVjLiBIb3dldmVyLCBzb21lIGZ1bmN0aW9ucyBkbyBub3Qgc3VwcG9ydCBhbGwgdGhlIHZhbHVlcyBpbiBPd3QuQmFzZS5BdWRpb0NvZGVjLlxyXG4gICAgICovXHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAbWVtYmVyIHs/bnVtYmVyfSBjaGFubmVsQ291bnRcclxuICAgICAqIEBtZW1iZXJvZiBPd3QuQmFzZS5BdWRpb0NvZGVjUGFyYW1ldGVyc1xyXG4gICAgICogQGluc3RhbmNlXHJcbiAgICAgKiBAZGVzYyBOdW1iZXJzIG9mIGNoYW5uZWxzIGZvciBhbiBhdWRpbyB0cmFjay5cclxuICAgICAqL1xyXG4gICAgdGhpcy5jaGFubmVsQ291bnQgPSBjaGFubmVsQ291bnQ7XHJcbiAgICAvKipcclxuICAgICAqIEBtZW1iZXIgez9udW1iZXJ9IGNsb2NrUmF0ZVxyXG4gICAgICogQG1lbWJlcm9mIE93dC5CYXNlLkF1ZGlvQ29kZWNQYXJhbWV0ZXJzXHJcbiAgICAgKiBAaW5zdGFuY2VcclxuICAgICAqIEBkZXNjIFRoZSBjb2RlYyBjbG9jayByYXRlIGV4cHJlc3NlZCBpbiBIZXJ0ei5cclxuICAgICAqL1xyXG4gICAgdGhpcy5jbG9ja1JhdGUgPSBjbG9ja1JhdGU7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogQGNsYXNzIEF1ZGlvRW5jb2RpbmdQYXJhbWV0ZXJzXHJcbiAqIEBtZW1iZXJPZiBPd3QuQmFzZVxyXG4gKiBAY2xhc3NEZXNjIEVuY29kaW5nIHBhcmFtZXRlcnMgZm9yIHNlbmRpbmcgYW4gYXVkaW8gdHJhY2suXHJcbiAqIEBoaWRlY29uc3RydWN0b3JcclxuICovXHJcbmV4cG9ydCBjbGFzcyBBdWRpb0VuY29kaW5nUGFyYW1ldGVycyB7XHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2NcclxuICBjb25zdHJ1Y3Rvcihjb2RlYywgbWF4Qml0cmF0ZSkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAbWVtYmVyIHs/T3d0LkJhc2UuQXVkaW9Db2RlY1BhcmFtZXRlcnN9IGNvZGVjXHJcbiAgICAgKiBAaW5zdGFuY2VcclxuICAgICAqIEBtZW1iZXJvZiBPd3QuQmFzZS5BdWRpb0VuY29kaW5nUGFyYW1ldGVyc1xyXG4gICAgICovXHJcbiAgICB0aGlzLmNvZGVjID0gY29kZWM7XHJcbiAgICAvKipcclxuICAgICAqIEBtZW1iZXIgez9udW1iZXJ9IG1heEJpdHJhdGVcclxuICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICogQG1lbWJlcm9mIE93dC5CYXNlLkF1ZGlvRW5jb2RpbmdQYXJhbWV0ZXJzXHJcbiAgICAgKiBAZGVzYyBNYXggYml0cmF0ZSBleHByZXNzZWQgaW4ga2Jwcy5cclxuICAgICAqL1xyXG4gICAgdGhpcy5tYXhCaXRyYXRlID0gbWF4Qml0cmF0ZTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgVmlkZW9Db2RlY1xyXG4gKiBAbWVtYmVyT2YgT3d0LkJhc2VcclxuICogQGNsYXNzRGVzYyBWaWRlbyBjb2RlYyBlbnVtZXJhdGlvbi5cclxuICogQGhpZGVjb25zdHJ1Y3RvclxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IFZpZGVvQ29kZWMgPSB7XHJcbiAgVlA4OiAndnA4JyxcclxuICBWUDk6ICd2cDknLFxyXG4gIEgyNjQ6ICdoMjY0JyxcclxuICBIMjY1OiAnaDI2NScsXHJcbn07XHJcblxyXG4vKipcclxuICogQGNsYXNzIFZpZGVvQ29kZWNQYXJhbWV0ZXJzXHJcbiAqIEBtZW1iZXJPZiBPd3QuQmFzZVxyXG4gKiBAY2xhc3NEZXNjIENvZGVjIHBhcmFtZXRlcnMgZm9yIGEgdmlkZW8gdHJhY2suXHJcbiAqIEBoaWRlY29uc3RydWN0b3JcclxuICovXHJcbmV4cG9ydCBjbGFzcyBWaWRlb0NvZGVjUGFyYW1ldGVycyB7XHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2NcclxuICBjb25zdHJ1Y3RvcihuYW1lLCBwcm9maWxlKSB7XHJcbiAgICAvKipcclxuICAgICAqIEBtZW1iZXIge3N0cmluZ30gbmFtZVxyXG4gICAgICogQG1lbWJlcm9mIE93dC5CYXNlLlZpZGVvQ29kZWNQYXJhbWV0ZXJzXHJcbiAgICAgKiBAaW5zdGFuY2VcclxuICAgICAqIEBkZXNjIE5hbWUgb2YgYSBjb2RlYy4gUGxlYXNlIHVzZSBhIHZhbHVlIGluIE93dC5CYXNlLlZpZGVvQ29kZWMuIEhvd2V2ZXIsIHNvbWUgZnVuY3Rpb25zIGRvIG5vdCBzdXBwb3J0IGFsbCB0aGUgdmFsdWVzIGluIE93dC5CYXNlLkF1ZGlvQ29kZWMuXHJcbiAgICAgKi9cclxuICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAvKipcclxuICAgICAqIEBtZW1iZXIgez9zdHJpbmd9IHByb2ZpbGVcclxuICAgICAqIEBtZW1iZXJvZiBPd3QuQmFzZS5WaWRlb0NvZGVjUGFyYW1ldGVyc1xyXG4gICAgICogQGluc3RhbmNlXHJcbiAgICAgKiBAZGVzYyBUaGUgcHJvZmlsZSBvZiBhIGNvZGVjLiBQcm9maWxlIG1heSBub3QgYXBwbHkgdG8gYWxsIGNvZGVjcy5cclxuICAgICAqL1xyXG4gICAgdGhpcy5wcm9maWxlID0gcHJvZmlsZTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgVmlkZW9FbmNvZGluZ1BhcmFtZXRlcnNcclxuICogQG1lbWJlck9mIE93dC5CYXNlXHJcbiAqIEBjbGFzc0Rlc2MgRW5jb2RpbmcgcGFyYW1ldGVycyBmb3Igc2VuZGluZyBhIHZpZGVvIHRyYWNrLlxyXG4gKiBAaGlkZWNvbnN0cnVjdG9yXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVmlkZW9FbmNvZGluZ1BhcmFtZXRlcnMge1xyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jXHJcbiAgY29uc3RydWN0b3IoY29kZWMsIG1heEJpdHJhdGUpIHtcclxuICAgIC8qKlxyXG4gICAgICogQG1lbWJlciB7P093dC5CYXNlLlZpZGVvQ29kZWNQYXJhbWV0ZXJzfSBjb2RlY1xyXG4gICAgICogQGluc3RhbmNlXHJcbiAgICAgKiBAbWVtYmVyb2YgT3d0LkJhc2UuVmlkZW9FbmNvZGluZ1BhcmFtZXRlcnNcclxuICAgICAqL1xyXG4gICAgdGhpcy5jb2RlYyA9IGNvZGVjO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAbWVtYmVyIHs/bnVtYmVyfSBtYXhCaXRyYXRlXHJcbiAgICAgKiBAaW5zdGFuY2VcclxuICAgICAqIEBtZW1iZXJvZiBPd3QuQmFzZS5WaWRlb0VuY29kaW5nUGFyYW1ldGVyc1xyXG4gICAgICogQGRlc2MgTWF4IGJpdHJhdGUgZXhwcmVzc2VkIGluIGticHMuXHJcbiAgICAgKi9cclxuICAgIHRoaXMubWF4Qml0cmF0ZSA9IG1heEJpdHJhdGU7XHJcbiAgfVxyXG59XHJcbiIsIi8vIE1JVCBMaWNlbnNlXHJcbi8vXHJcbi8vIENvcHlyaWdodCAoYykgMjAxMiBVbml2ZXJzaWRhZCBQb2xpdMOpY25pY2EgZGUgTWFkcmlkXHJcbi8vXHJcbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxyXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXHJcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcbi8vXHJcbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxyXG4vLyBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG4vL1xyXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxyXG4vLyBTT0ZUV0FSRS5cclxuXHJcbi8vIENvcHlyaWdodCAoQykgPDIwMTg+IEludGVsIENvcnBvcmF0aW9uXHJcbi8vXHJcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXHJcblxyXG4vLyBUaGlzIGZpbGUgaXMgYm9ycm93ZWQgZnJvbSBseW5ja2lhL2xpY29kZSB3aXRoIHNvbWUgbW9kaWZpY2F0aW9ucy5cclxuXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgRXZlbnREaXNwYXRjaGVyXHJcbiAqIEBjbGFzc0Rlc2MgQSBzaGltIGZvciBFdmVudFRhcmdldC4gTWlnaHQgYmUgY2hhbmdlZCB0byBFdmVudFRhcmdldCBsYXRlci5cclxuICogQG1lbWJlcm9mIE93dC5CYXNlXHJcbiAqIEBoaWRlY29uc3RydWN0b3JcclxuICovXHJcbmV4cG9ydCBjb25zdCBFdmVudERpc3BhdGNoZXIgPSBmdW5jdGlvbigpIHtcclxuICAvLyBQcml2YXRlIHZhcnNcclxuICBjb25zdCBzcGVjID0ge307XHJcbiAgc3BlYy5kaXNwYXRjaGVyID0ge307XHJcbiAgc3BlYy5kaXNwYXRjaGVyLmV2ZW50TGlzdGVuZXJzID0ge307XHJcblxyXG4gIC8qKlxyXG4gICAqIEBmdW5jdGlvbiBhZGRFdmVudExpc3RlbmVyXHJcbiAgICogQGRlc2MgVGhpcyBmdW5jdGlvbiByZWdpc3RlcnMgYSBjYWxsYmFjayBmdW5jdGlvbiBhcyBhIGhhbmRsZXIgZm9yIHRoZSBjb3JyZXNwb25kaW5nIGV2ZW50LiBJdCdzIHNob3J0ZW5lZCBmb3JtIGlzIG9uKGV2ZW50VHlwZSwgbGlzdGVuZXIpLiBTZWUgdGhlIGV2ZW50IGRlc2NyaXB0aW9uIGluIHRoZSBmb2xsb3dpbmcgdGFibGUuXHJcbiAgICogQGluc3RhbmNlXHJcbiAgICogQG1lbWJlcm9mIE93dC5CYXNlLkV2ZW50RGlzcGF0Y2hlclxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGUgRXZlbnQgc3RyaW5nLlxyXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpc3RlbmVyIENhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gICAqL1xyXG4gIHRoaXMuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50VHlwZSwgbGlzdGVuZXIpIHtcclxuICAgIGlmIChzcGVjLmRpc3BhdGNoZXIuZXZlbnRMaXN0ZW5lcnNbZXZlbnRUeXBlXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHNwZWMuZGlzcGF0Y2hlci5ldmVudExpc3RlbmVyc1tldmVudFR5cGVdID0gW107XHJcbiAgICB9XHJcbiAgICBzcGVjLmRpc3BhdGNoZXIuZXZlbnRMaXN0ZW5lcnNbZXZlbnRUeXBlXS5wdXNoKGxpc3RlbmVyKTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBAZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lclxyXG4gICAqIEBkZXNjIFRoaXMgZnVuY3Rpb24gcmVtb3ZlcyBhIHJlZ2lzdGVyZWQgZXZlbnQgbGlzdGVuZXIuXHJcbiAgICogQGluc3RhbmNlXHJcbiAgICogQG1lbWJlcm9mIE93dC5CYXNlLkV2ZW50RGlzcGF0Y2hlclxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGUgRXZlbnQgc3RyaW5nLlxyXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpc3RlbmVyIENhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gICAqL1xyXG4gIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50VHlwZSwgbGlzdGVuZXIpIHtcclxuICAgIGlmICghc3BlYy5kaXNwYXRjaGVyLmV2ZW50TGlzdGVuZXJzW2V2ZW50VHlwZV0pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3QgaW5kZXggPSBzcGVjLmRpc3BhdGNoZXIuZXZlbnRMaXN0ZW5lcnNbZXZlbnRUeXBlXS5pbmRleE9mKGxpc3RlbmVyKTtcclxuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcclxuICAgICAgc3BlYy5kaXNwYXRjaGVyLmV2ZW50TGlzdGVuZXJzW2V2ZW50VHlwZV0uc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBAZnVuY3Rpb24gY2xlYXJFdmVudExpc3RlbmVyXHJcbiAgICogQGRlc2MgVGhpcyBmdW5jdGlvbiByZW1vdmVzIGFsbCBldmVudCBsaXN0ZW5lcnMgZm9yIG9uZSB0eXBlLlxyXG4gICAqIEBpbnN0YW5jZVxyXG4gICAqIEBtZW1iZXJvZiBPd3QuQmFzZS5FdmVudERpc3BhdGNoZXJcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlIEV2ZW50IHN0cmluZy5cclxuICAgKi9cclxuICB0aGlzLmNsZWFyRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50VHlwZSkge1xyXG4gICAgc3BlYy5kaXNwYXRjaGVyLmV2ZW50TGlzdGVuZXJzW2V2ZW50VHlwZV0gPSBbXTtcclxuICB9O1xyXG5cclxuICAvLyBJdCBkaXNwYXRjaCBhIG5ldyBldmVudCB0byB0aGUgZXZlbnQgbGlzdGVuZXJzLCBiYXNlZCBvbiB0aGUgdHlwZVxyXG4gIC8vIG9mIGV2ZW50LiBBbGwgZXZlbnRzIGFyZSBpbnRlbmRlZCB0byBiZSBMaWNvZGVFdmVudHMuXHJcbiAgdGhpcy5kaXNwYXRjaEV2ZW50ID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIGlmICghc3BlYy5kaXNwYXRjaGVyLmV2ZW50TGlzdGVuZXJzW2V2ZW50LnR5cGVdKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHNwZWMuZGlzcGF0Y2hlci5ldmVudExpc3RlbmVyc1tldmVudC50eXBlXS5tYXAoZnVuY3Rpb24obGlzdGVuZXIpIHtcclxuICAgICAgbGlzdGVuZXIoZXZlbnQpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgT3d0RXZlbnRcclxuICogQGNsYXNzRGVzYyBDbGFzcyBPd3RFdmVudCByZXByZXNlbnRzIGEgZ2VuZXJpYyBFdmVudCBpbiB0aGUgbGlicmFyeS5cclxuICogQG1lbWJlcm9mIE93dC5CYXNlXHJcbiAqIEBoaWRlY29uc3RydWN0b3JcclxuICovXHJcbmV4cG9ydCBjbGFzcyBPd3RFdmVudCB7XHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2NcclxuICBjb25zdHJ1Y3Rvcih0eXBlKSB7XHJcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBNZXNzYWdlRXZlbnRcclxuICogQGNsYXNzRGVzYyBDbGFzcyBNZXNzYWdlRXZlbnQgcmVwcmVzZW50cyBhIG1lc3NhZ2UgRXZlbnQgaW4gdGhlIGxpYnJhcnkuXHJcbiAqIEBtZW1iZXJvZiBPd3QuQmFzZVxyXG4gKiBAaGlkZWNvbnN0cnVjdG9yXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTWVzc2FnZUV2ZW50IGV4dGVuZHMgT3d0RXZlbnQge1xyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jXHJcbiAgY29uc3RydWN0b3IodHlwZSwgaW5pdCkge1xyXG4gICAgc3VwZXIodHlwZSk7XHJcbiAgICAvKipcclxuICAgICAqIEBtZW1iZXIge3N0cmluZ30gb3JpZ2luXHJcbiAgICAgKiBAaW5zdGFuY2VcclxuICAgICAqIEBtZW1iZXJvZiBPd3QuQmFzZS5NZXNzYWdlRXZlbnRcclxuICAgICAqIEBkZXNjIElEIG9mIHRoZSByZW1vdGUgZW5kcG9pbnQgd2hvIHB1Ymxpc2hlZCB0aGlzIHN0cmVhbS5cclxuICAgICAqL1xyXG4gICAgdGhpcy5vcmlnaW4gPSBpbml0Lm9yaWdpbjtcclxuICAgIC8qKlxyXG4gICAgICogQG1lbWJlciB7c3RyaW5nfSBtZXNzYWdlXHJcbiAgICAgKiBAaW5zdGFuY2VcclxuICAgICAqIEBtZW1iZXJvZiBPd3QuQmFzZS5NZXNzYWdlRXZlbnRcclxuICAgICAqL1xyXG4gICAgdGhpcy5tZXNzYWdlID0gaW5pdC5tZXNzYWdlO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAbWVtYmVyIHtzdHJpbmd9IHRvXHJcbiAgICAgKiBAaW5zdGFuY2VcclxuICAgICAqIEBtZW1iZXJvZiBPd3QuQmFzZS5NZXNzYWdlRXZlbnRcclxuICAgICAqIEBkZXNjIFZhbHVlcyBjb3VsZCBiZSBcImFsbFwiLCBcIm1lXCIgaW4gY29uZmVyZW5jZSBtb2RlLCBvciB1bmRlZmluZWQgaW4gUDJQIG1vZGUuLlxyXG4gICAgICovXHJcbiAgICB0aGlzLnRvID0gaW5pdC50bztcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgRXJyb3JFdmVudFxyXG4gKiBAY2xhc3NEZXNjIENsYXNzIEVycm9yRXZlbnQgcmVwcmVzZW50cyBhbiBlcnJvciBFdmVudCBpbiB0aGUgbGlicmFyeS5cclxuICogQG1lbWJlcm9mIE93dC5CYXNlXHJcbiAqIEBoaWRlY29uc3RydWN0b3JcclxuICovXHJcbmV4cG9ydCBjbGFzcyBFcnJvckV2ZW50IGV4dGVuZHMgT3d0RXZlbnQge1xyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jXHJcbiAgY29uc3RydWN0b3IodHlwZSwgaW5pdCkge1xyXG4gICAgc3VwZXIodHlwZSk7XHJcbiAgICAvKipcclxuICAgICAqIEBtZW1iZXIge0Vycm9yfSBlcnJvclxyXG4gICAgICogQGluc3RhbmNlXHJcbiAgICAgKiBAbWVtYmVyb2YgT3d0LkJhc2UuRXJyb3JFdmVudFxyXG4gICAgICovXHJcbiAgICB0aGlzLmVycm9yID0gaW5pdC5lcnJvcjtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgTXV0ZUV2ZW50XHJcbiAqIEBjbGFzc0Rlc2MgQ2xhc3MgTXV0ZUV2ZW50IHJlcHJlc2VudHMgYSBtdXRlIG9yIHVubXV0ZSBldmVudC5cclxuICogQG1lbWJlcm9mIE93dC5CYXNlXHJcbiAqIEBoaWRlY29uc3RydWN0b3JcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNdXRlRXZlbnQgZXh0ZW5kcyBPd3RFdmVudCB7XHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2NcclxuICBjb25zdHJ1Y3Rvcih0eXBlLCBpbml0KSB7XHJcbiAgICBzdXBlcih0eXBlKTtcclxuICAgIC8qKlxyXG4gICAgICogQG1lbWJlciB7T3d0LkJhc2UuVHJhY2tLaW5kfSBraW5kXHJcbiAgICAgKiBAaW5zdGFuY2VcclxuICAgICAqIEBtZW1iZXJvZiBPd3QuQmFzZS5NdXRlRXZlbnRcclxuICAgICAqL1xyXG4gICAgdGhpcy5raW5kID0gaW5pdC5raW5kO1xyXG4gIH1cclxufVxyXG4iLCIvLyBDb3B5cmlnaHQgKEMpIDwyMDE4PiBJbnRlbCBDb3Jwb3JhdGlvblxyXG4vL1xyXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxyXG5cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9tZWRpYXN0cmVhbS1mYWN0b3J5LmpzJztcclxuZXhwb3J0ICogZnJvbSAnLi9zdHJlYW0uanMnO1xyXG5leHBvcnQgKiBmcm9tICcuL21lZGlhZm9ybWF0LmpzJztcclxuIiwiLy8gTUlUIExpY2Vuc2VcclxuLy9cclxuLy8gQ29weXJpZ2h0IChjKSAyMDEyIFVuaXZlcnNpZGFkIFBvbGl0w6ljbmljYSBkZSBNYWRyaWRcclxuLy9cclxuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXHJcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcclxuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuLy9cclxuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXHJcbi8vIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcbi8vXHJcbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXHJcbi8vIFNPRlRXQVJFLlxyXG5cclxuLy8gQ29weXJpZ2h0IChDKSA8MjAxOD4gSW50ZWwgQ29ycG9yYXRpb25cclxuLy9cclxuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcclxuXHJcbi8vIFRoaXMgZmlsZSBpcyBib3Jyb3dlZCBmcm9tIGx5bmNraWEvbGljb2RlIHdpdGggc29tZSBtb2RpZmljYXRpb25zLlxyXG5cclxuLyogZ2xvYmFsIGNvbnNvbGUsd2luZG93ICovXHJcblxyXG4ndXNlIHN0cmljdCc7XHJcblxyXG4vKlxyXG4gKiBBUEkgdG8gd3JpdGUgbG9ncyBiYXNlZCBvbiB0cmFkaXRpb25hbCBsb2dnaW5nIG1lY2hhbmlzbXM6IGRlYnVnLCB0cmFjZSxcclxuICogaW5mbywgd2FybmluZywgZXJyb3JcclxuICovXHJcbmNvbnN0IExvZ2dlciA9IChmdW5jdGlvbigpIHtcclxuICBjb25zdCBERUJVRyA9IDA7XHJcbiAgY29uc3QgVFJBQ0UgPSAxO1xyXG4gIGNvbnN0IElORk8gPSAyO1xyXG4gIGNvbnN0IFdBUk5JTkcgPSAzO1xyXG4gIGNvbnN0IEVSUk9SID0gNDtcclxuICBjb25zdCBOT05FID0gNTtcclxuXHJcbiAgY29uc3Qgbm9PcCA9IGZ1bmN0aW9uKCkge307XHJcblxyXG4gIC8vIHx0aGF0fCBpcyB0aGUgb2JqZWN0IHRvIGJlIHJldHVybmVkLlxyXG4gIGNvbnN0IHRoYXQgPSB7XHJcbiAgICBERUJVRzogREVCVUcsXHJcbiAgICBUUkFDRTogVFJBQ0UsXHJcbiAgICBJTkZPOiBJTkZPLFxyXG4gICAgV0FSTklORzogV0FSTklORyxcclxuICAgIEVSUk9SOiBFUlJPUixcclxuICAgIE5PTkU6IE5PTkUsXHJcbiAgfTtcclxuXHJcbiAgdGhhdC5sb2cgPSB3aW5kb3cuY29uc29sZS5sb2cuYmluZCh3aW5kb3cuY29uc29sZSk7XHJcblxyXG4gIGNvbnN0IGJpbmRUeXBlID0gZnVuY3Rpb24odHlwZSkge1xyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cuY29uc29sZVt0eXBlXSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICByZXR1cm4gd2luZG93LmNvbnNvbGVbdHlwZV0uYmluZCh3aW5kb3cuY29uc29sZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gd2luZG93LmNvbnNvbGUubG9nLmJpbmQod2luZG93LmNvbnNvbGUpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IHNldExvZ0xldmVsID0gZnVuY3Rpb24obGV2ZWwpIHtcclxuICAgIGlmIChsZXZlbCA8PSBERUJVRykge1xyXG4gICAgICB0aGF0LmRlYnVnID0gYmluZFR5cGUoJ2xvZycpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhhdC5kZWJ1ZyA9IG5vT3A7XHJcbiAgICB9XHJcbiAgICBpZiAobGV2ZWwgPD0gVFJBQ0UpIHtcclxuICAgICAgdGhhdC50cmFjZSA9IGJpbmRUeXBlKCd0cmFjZScpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhhdC50cmFjZSA9IG5vT3A7XHJcbiAgICB9XHJcbiAgICBpZiAobGV2ZWwgPD0gSU5GTykge1xyXG4gICAgICB0aGF0LmluZm8gPSBiaW5kVHlwZSgnaW5mbycpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhhdC5pbmZvID0gbm9PcDtcclxuICAgIH1cclxuICAgIGlmIChsZXZlbCA8PSBXQVJOSU5HKSB7XHJcbiAgICAgIHRoYXQud2FybmluZyA9IGJpbmRUeXBlKCd3YXJuJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGF0Lndhcm5pbmcgPSBub09wO1xyXG4gICAgfVxyXG4gICAgaWYgKGxldmVsIDw9IEVSUk9SKSB7XHJcbiAgICAgIHRoYXQuZXJyb3IgPSBiaW5kVHlwZSgnZXJyb3InKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoYXQuZXJyb3IgPSBub09wO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHNldExvZ0xldmVsKERFQlVHKTsgLy8gRGVmYXVsdCBsZXZlbCBpcyBkZWJ1Zy5cclxuXHJcbiAgdGhhdC5zZXRMb2dMZXZlbCA9IHNldExvZ0xldmVsO1xyXG5cclxuICByZXR1cm4gdGhhdDtcclxufSgpKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IExvZ2dlcjtcclxuIiwiLy8gQ29weXJpZ2h0IChDKSA8MjAxOD4gSW50ZWwgQ29ycG9yYXRpb25cclxuLy9cclxuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcclxuXHJcbid1c2Ugc3RyaWN0JztcclxuLyoqXHJcbiAqIEBjbGFzcyBBdWRpb1NvdXJjZUluZm9cclxuICogQGNsYXNzRGVzYyBTb3VyY2UgaW5mbyBhYm91dCBhbiBhdWRpbyB0cmFjay4gVmFsdWVzOiAnbWljJywgJ3NjcmVlbi1jYXN0JywgJ2ZpbGUnLCAnbWl4ZWQnLlxyXG4gKiBAbWVtYmVyT2YgT3d0LkJhc2VcclxuICogQHJlYWRvbmx5XHJcbiAqIEBlbnVtIHtzdHJpbmd9XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgQXVkaW9Tb3VyY2VJbmZvID0ge1xyXG4gIE1JQzogJ21pYycsXHJcbiAgU0NSRUVOQ0FTVDogJ3NjcmVlbi1jYXN0JyxcclxuICBGSUxFOiAnZmlsZScsXHJcbiAgTUlYRUQ6ICdtaXhlZCcsXHJcbn07XHJcblxyXG4vKipcclxuICogQGNsYXNzIFZpZGVvU291cmNlSW5mb1xyXG4gKiBAY2xhc3NEZXNjIFNvdXJjZSBpbmZvIGFib3V0IGEgdmlkZW8gdHJhY2suIFZhbHVlczogJ2NhbWVyYScsICdzY3JlZW4tY2FzdCcsICdmaWxlJywgJ21peGVkJy5cclxuICogQG1lbWJlck9mIE93dC5CYXNlXHJcbiAqIEByZWFkb25seVxyXG4gKiBAZW51bSB7c3RyaW5nfVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IFZpZGVvU291cmNlSW5mbyA9IHtcclxuICBDQU1FUkE6ICdjYW1lcmEnLFxyXG4gIFNDUkVFTkNBU1Q6ICdzY3JlZW4tY2FzdCcsXHJcbiAgRklMRTogJ2ZpbGUnLFxyXG4gIE1JWEVEOiAnbWl4ZWQnLFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBUcmFja0tpbmRcclxuICogQGNsYXNzRGVzYyBLaW5kIG9mIGEgdHJhY2suIFZhbHVlczogJ2F1ZGlvJyBmb3IgYXVkaW8gdHJhY2ssICd2aWRlbycgZm9yIHZpZGVvIHRyYWNrLCAnYXYnIGZvciBib3RoIGF1ZGlvIGFuZCB2aWRlbyB0cmFja3MuXHJcbiAqIEBtZW1iZXJPZiBPd3QuQmFzZVxyXG4gKiBAcmVhZG9ubHlcclxuICogQGVudW0ge3N0cmluZ31cclxuICovXHJcbmV4cG9ydCBjb25zdCBUcmFja0tpbmQgPSB7XHJcbiAgLyoqXHJcbiAgICogQXVkaW8gdHJhY2tzLlxyXG4gICAqIEB0eXBlIHN0cmluZ1xyXG4gICAqL1xyXG4gIEFVRElPOiAnYXVkaW8nLFxyXG4gIC8qKlxyXG4gICAqIFZpZGVvIHRyYWNrcy5cclxuICAgKiBAdHlwZSBzdHJpbmdcclxuICAgKi9cclxuICBWSURFTzogJ3ZpZGVvJyxcclxuICAvKipcclxuICAgKiBCb3RoIGF1ZGlvIGFuZCB2aWRlbyB0cmFja3MuXHJcbiAgICogQHR5cGUgc3RyaW5nXHJcbiAgICovXHJcbiAgQVVESU9fQU5EX1ZJREVPOiAnYXYnLFxyXG59O1xyXG4vKipcclxuICogQGNsYXNzIFJlc29sdXRpb25cclxuICogQG1lbWJlck9mIE93dC5CYXNlXHJcbiAqIEBjbGFzc0Rlc2MgVGhlIFJlc29sdXRpb24gZGVmaW5lcyB0aGUgc2l6ZSBvZiBhIHJlY3RhbmdsZS5cclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxyXG4gKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUmVzb2x1dGlvbiB7XHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2NcclxuICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAvKipcclxuICAgICAqIEBtZW1iZXIge251bWJlcn0gd2lkdGhcclxuICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICogQG1lbWJlcm9mIE93dC5CYXNlLlJlc29sdXRpb25cclxuICAgICAqL1xyXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAbWVtYmVyIHtudW1iZXJ9IGhlaWdodFxyXG4gICAgICogQGluc3RhbmNlXHJcbiAgICAgKiBAbWVtYmVyb2YgT3d0LkJhc2UuUmVzb2x1dGlvblxyXG4gICAgICovXHJcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuICB9XHJcbn1cclxuIiwiLy8gQ29weXJpZ2h0IChDKSA8MjAxOD4gSW50ZWwgQ29ycG9yYXRpb25cclxuLy9cclxuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcclxuXHJcbi8qIGdsb2JhbCBjb25zb2xlLCB3aW5kb3csIFByb21pc2UsIGNocm9tZSwgbmF2aWdhdG9yICovXHJcblxyXG4ndXNlIHN0cmljdCc7XHJcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vdXRpbHMuanMnO1xyXG5pbXBvcnQgTG9nZ2VyIGZyb20gJy4vbG9nZ2VyLmpzJztcclxuaW1wb3J0ICogYXMgTWVkaWFGb3JtYXRNb2R1bGUgZnJvbSAnLi9tZWRpYWZvcm1hdC5qcyc7XHJcblxyXG4vKipcclxuICogQGNsYXNzIEF1ZGlvVHJhY2tDb25zdHJhaW50c1xyXG4gKiBAY2xhc3NEZXNjIENvbnN0cmFpbnRzIGZvciBjcmVhdGluZyBhbiBhdWRpbyBNZWRpYVN0cmVhbVRyYWNrLlxyXG4gKiBAbWVtYmVyb2YgT3d0LkJhc2VcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIEBwYXJhbSB7T3d0LkJhc2UuQXVkaW9Tb3VyY2VJbmZvfSBzb3VyY2UgU291cmNlIGluZm8gb2YgdGhpcyBhdWRpbyB0cmFjay5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBBdWRpb1RyYWNrQ29uc3RyYWludHMge1xyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jXHJcbiAgY29uc3RydWN0b3Ioc291cmNlKSB7XHJcbiAgICBpZiAoIU9iamVjdC52YWx1ZXMoTWVkaWFGb3JtYXRNb2R1bGUuQXVkaW9Tb3VyY2VJbmZvKVxyXG4gICAgICAgIC5zb21lKCh2KSA9PiB2ID09PSBzb3VyY2UpKSB7XHJcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgc291cmNlLicpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAbWVtYmVyIHtzdHJpbmd9IHNvdXJjZVxyXG4gICAgICogQG1lbWJlcm9mIE93dC5CYXNlLkF1ZGlvVHJhY2tDb25zdHJhaW50c1xyXG4gICAgICogQGRlc2MgVmFsdWVzIGNvdWxkIGJlIFwibWljXCIsIFwic2NyZWVuLWNhc3RcIiwgXCJmaWxlXCIgb3IgXCJtaXhlZFwiLlxyXG4gICAgICogQGluc3RhbmNlXHJcbiAgICAgKi9cclxuICAgIHRoaXMuc291cmNlID0gc291cmNlO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAbWVtYmVyIHtzdHJpbmd9IGRldmljZUlkXHJcbiAgICAgKiBAbWVtYmVyb2YgT3d0LkJhc2UuQXVkaW9UcmFja0NvbnN0cmFpbnRzXHJcbiAgICAgKiBAZGVzYyBEbyBub3QgcHJvdmlkZSBkZXZpY2VJZCBpZiBzb3VyY2UgaXMgbm90IFwibWljXCIuXHJcbiAgICAgKiBAaW5zdGFuY2VcclxuICAgICAqIEBzZWUgaHR0cHM6Ly93M2MuZ2l0aHViLmlvL21lZGlhY2FwdHVyZS1tYWluLyNkZWYtY29uc3RyYWludC1kZXZpY2VJZFxyXG4gICAgICovXHJcbiAgICB0aGlzLmRldmljZUlkID0gdW5kZWZpbmVkO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBWaWRlb1RyYWNrQ29uc3RyYWludHNcclxuICogQGNsYXNzRGVzYyBDb25zdHJhaW50cyBmb3IgY3JlYXRpbmcgYSB2aWRlbyBNZWRpYVN0cmVhbVRyYWNrLlxyXG4gKiBAbWVtYmVyb2YgT3d0LkJhc2VcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIEBwYXJhbSB7T3d0LkJhc2UuVmlkZW9Tb3VyY2VJbmZvfSBzb3VyY2UgU291cmNlIGluZm8gb2YgdGhpcyB2aWRlbyB0cmFjay5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBWaWRlb1RyYWNrQ29uc3RyYWludHMge1xyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jXHJcbiAgY29uc3RydWN0b3Ioc291cmNlKSB7XHJcbiAgICBpZiAoIU9iamVjdC52YWx1ZXMoTWVkaWFGb3JtYXRNb2R1bGUuVmlkZW9Tb3VyY2VJbmZvKVxyXG4gICAgICAuc29tZSgodikgPT4gdiA9PT0gc291cmNlKSkge1xyXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIHNvdXJjZS4nKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQG1lbWJlciB7c3RyaW5nfSBzb3VyY2VcclxuICAgICAqIEBtZW1iZXJvZiBPd3QuQmFzZS5WaWRlb1RyYWNrQ29uc3RyYWludHNcclxuICAgICAqIEBkZXNjIFZhbHVlcyBjb3VsZCBiZSBcImNhbWVyYVwiLCBcInNjcmVlbi1jYXN0XCIsIFwiZmlsZVwiIG9yIFwibWl4ZWRcIi5cclxuICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICovXHJcbiAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcclxuICAgIC8qKlxyXG4gICAgICogQG1lbWJlciB7c3RyaW5nfSBkZXZpY2VJZFxyXG4gICAgICogQG1lbWJlcm9mIE93dC5CYXNlLlZpZGVvVHJhY2tDb25zdHJhaW50c1xyXG4gICAgICogQGRlc2MgRG8gbm90IHByb3ZpZGUgZGV2aWNlSWQgaWYgc291cmNlIGlzIG5vdCBcImNhbWVyYVwiLlxyXG4gICAgICogQGluc3RhbmNlXHJcbiAgICAgKiBAc2VlIGh0dHBzOi8vdzNjLmdpdGh1Yi5pby9tZWRpYWNhcHR1cmUtbWFpbi8jZGVmLWNvbnN0cmFpbnQtZGV2aWNlSWRcclxuICAgICAqL1xyXG5cclxuICAgIHRoaXMuZGV2aWNlSWQgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbWVtYmVyIHtPd3QuQmFzZS5SZXNvbHV0aW9ufSByZXNvbHV0aW9uXHJcbiAgICAgKiBAbWVtYmVyb2YgT3d0LkJhc2UuVmlkZW9UcmFja0NvbnN0cmFpbnRzXHJcbiAgICAgKiBAaW5zdGFuY2VcclxuICAgICAqL1xyXG4gICAgdGhpcy5yZXNvbHV0aW9uID0gdW5kZWZpbmVkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG1lbWJlciB7bnVtYmVyfSBmcmFtZVJhdGVcclxuICAgICAqIEBtZW1iZXJvZiBPd3QuQmFzZS5WaWRlb1RyYWNrQ29uc3RyYWludHNcclxuICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICovXHJcbiAgICB0aGlzLmZyYW1lUmF0ZSA9IHVuZGVmaW5lZDtcclxuICB9XHJcbn1cclxuLyoqXHJcbiAqIEBjbGFzcyBTdHJlYW1Db25zdHJhaW50c1xyXG4gKiBAY2xhc3NEZXNjIENvbnN0cmFpbnRzIGZvciBjcmVhdGluZyBhIE1lZGlhU3RyZWFtIGZyb20gc2NyZWVuIG1pYyBhbmQgY2FtZXJhLlxyXG4gKiBAbWVtYmVyb2YgT3d0LkJhc2VcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIEBwYXJhbSB7P093dC5CYXNlLkF1ZGlvVHJhY2tDb25zdHJhaW50c30gYXVkaW9Db25zdHJhaW50c1xyXG4gKiBAcGFyYW0gez9Pd3QuQmFzZS5WaWRlb1RyYWNrQ29uc3RyYWludHN9IHZpZGVvQ29uc3RyYWludHNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBTdHJlYW1Db25zdHJhaW50cyB7XHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2NcclxuICBjb25zdHJ1Y3RvcihhdWRpb0NvbnN0cmFpbnRzID0gZmFsc2UsIHZpZGVvQ29uc3RyYWludHMgPSBmYWxzZSkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAbWVtYmVyIHtPd3QuQmFzZS5NZWRpYVN0cmVhbVRyYWNrRGV2aWNlQ29uc3RyYWludHNGb3JBdWRpb30gYXVkaW9cclxuICAgICAqIEBtZW1iZXJvZiBPd3QuQmFzZS5NZWRpYVN0cmVhbURldmljZUNvbnN0cmFpbnRzXHJcbiAgICAgKiBAaW5zdGFuY2VcclxuICAgICAqL1xyXG4gICAgdGhpcy5hdWRpbyA9IGF1ZGlvQ29uc3RyYWludHM7XHJcbiAgICAvKipcclxuICAgICAqIEBtZW1iZXIge093dC5CYXNlLk1lZGlhU3RyZWFtVHJhY2tEZXZpY2VDb25zdHJhaW50c0ZvclZpZGVvfSBWaWRlb1xyXG4gICAgICogQG1lbWJlcm9mIE93dC5CYXNlLk1lZGlhU3RyZWFtRGV2aWNlQ29uc3RyYWludHNcclxuICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICovXHJcbiAgICB0aGlzLnZpZGVvID0gdmlkZW9Db25zdHJhaW50cztcclxuICB9XHJcbn1cclxuXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jXHJcbmZ1bmN0aW9uIGlzVmlkZW9Db25zdHJhaW5zRm9yU2NyZWVuQ2FzdChjb25zdHJhaW50cykge1xyXG4gIHJldHVybiAodHlwZW9mIGNvbnN0cmFpbnRzLnZpZGVvID09PSAnb2JqZWN0JyAmJiBjb25zdHJhaW50cy52aWRlby5zb3VyY2UgPT09XHJcbiAgICBNZWRpYUZvcm1hdE1vZHVsZS5WaWRlb1NvdXJjZUluZm8uU0NSRUVOQ0FTVCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgTWVkaWFTdHJlYW1GYWN0b3J5XHJcbiAqIEBjbGFzc0Rlc2MgQSBmYWN0b3J5IHRvIGNyZWF0ZSBNZWRpYVN0cmVhbS4gWW91IGNhbiBhbHNvIGNyZWF0ZSBNZWRpYVN0cmVhbSBieSB5b3Vyc2VsZi5cclxuICogQG1lbWJlcm9mIE93dC5CYXNlXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTWVkaWFTdHJlYW1GYWN0b3J5IHtcclxuICAvKipcclxuICAgKiBAZnVuY3Rpb24gY3JlYXRlTWVkaWFTdHJlYW1cclxuICAgKiBAc3RhdGljXHJcbiAgICogQGRlc2MgQ3JlYXRlIGEgTWVkaWFTdHJlYW0gd2l0aCBnaXZlbiBjb25zdHJhaW50cy4gSWYgeW91IHdhbnQgdG8gY3JlYXRlIGEgTWVkaWFTdHJlYW0gZm9yIHNjcmVlbiBjYXN0LCBwbGVhc2UgbWFrZSBzdXJlIGJvdGggYXVkaW8gYW5kIHZpZGVvJ3Mgc291cmNlIGFyZSBcInNjcmVlbi1jYXN0XCIuXHJcbiAgICogQG1lbWJlcm9mIE93dC5CYXNlLk1lZGlhU3RyZWFtRmFjdG9yeVxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPE1lZGlhU3RyZWFtLCBFcnJvcj59IFJldHVybiBhIHByb21pc2UgdGhhdCBpcyByZXNvbHZlZCB3aGVuIHN0cmVhbSBpcyBzdWNjZXNzZnVsbHkgY3JlYXRlZCwgb3IgcmVqZWN0ZWQgaWYgb25lIG9mIHRoZSBmb2xsb3dpbmcgZXJyb3IgaGFwcGVuZWQ6XHJcbiAgICogLSBPbmUgb3IgbW9yZSBwYXJhbWV0ZXJzIGNhbm5vdCBiZSBzYXRpc2ZpZWQuXHJcbiAgICogLSBTcGVjaWZpZWQgZGV2aWNlIGlzIGJ1c3kuXHJcbiAgICogLSBDYW5ub3Qgb2J0YWluIG5lY2Vzc2FyeSBwZXJtaXNzaW9uIG9yIG9wZXJhdGlvbiBpcyBjYW5jZWxlZCBieSB1c2VyLlxyXG4gICAqIC0gVmlkZW8gc291cmNlIGlzIHNjcmVlbiBjYXN0LCB3aGlsZSBhdWRpbyBzb3VyY2UgaXMgbm90LlxyXG4gICAqIC0gQXVkaW8gc291cmNlIGlzIHNjcmVlbiBjYXN0LCB3aGlsZSB2aWRlbyBzb3VyY2UgaXMgZGlzYWJsZWQuXHJcbiAgICogQHBhcmFtIHtPd3QuQmFzZS5TdHJlYW1Db25zdHJhaW50c30gY29uc3RyYWludHNcclxuICAgKi9cclxuICBzdGF0aWMgY3JlYXRlTWVkaWFTdHJlYW0oY29uc3RyYWludHMpIHtcclxuICAgIGlmICh0eXBlb2YgY29uc3RyYWludHMgIT09ICdvYmplY3QnIHx8XHJcbiAgICAgICAgKCFjb25zdHJhaW50cy5hdWRpbyAmJiAhY29uc3RyYWludHMudmlkZW8pKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGNvbnN0cmFpbnMnKSk7XHJcbiAgICB9XHJcbiAgICBpZiAoIWlzVmlkZW9Db25zdHJhaW5zRm9yU2NyZWVuQ2FzdChjb25zdHJhaW50cykgJiZcclxuICAgICAgICAodHlwZW9mIGNvbnN0cmFpbnRzLmF1ZGlvID09PSAnb2JqZWN0JykgJiZcclxuICAgICAgICBjb25zdHJhaW50cy5hdWRpby5zb3VyY2UgPT09XHJcbiAgICAgICAgICAgIE1lZGlhRm9ybWF0TW9kdWxlLkF1ZGlvU291cmNlSW5mby5TQ1JFRU5DQVNUKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChcclxuICAgICAgICAgIG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBzaGFyZSBzY3JlZW4gd2l0aG91dCB2aWRlby4nKSk7XHJcbiAgICB9XHJcbiAgICBpZiAoaXNWaWRlb0NvbnN0cmFpbnNGb3JTY3JlZW5DYXN0KGNvbnN0cmFpbnRzKSAmJlxyXG4gICAgICAgIHR5cGVvZiBjb25zdHJhaW50cy5hdWRpbyA9PT0gJ29iamVjdCcgJiZcclxuICAgICAgICBjb25zdHJhaW50cy5hdWRpby5zb3VyY2UgIT09XHJcbiAgICAgICAgICAgIE1lZGlhRm9ybWF0TW9kdWxlLkF1ZGlvU291cmNlSW5mby5TQ1JFRU5DQVNUKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgVHlwZUVycm9yKFxyXG4gICAgICAgICAgJ0Nhbm5vdCBjYXB0dXJlIHZpZGVvIGZyb20gc2NyZWVuIGNhc3Qgd2hpbGUgY2FwdHVyZSBhdWRpbyBmcm9tJ1xyXG4gICAgICAgICAgKyAnIG90aGVyIHNvdXJjZS4nKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2hlY2sgYW5kIGNvbnZlcnQgY29uc3RyYWludHMuXHJcbiAgICBpZiAoIWNvbnN0cmFpbnRzLmF1ZGlvICYmICFjb25zdHJhaW50cy52aWRlbykge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFR5cGVFcnJvcihcclxuICAgICAgICAnQXQgbGVhc3Qgb25lIG9mIGF1ZGlvIGFuZCB2aWRlbyBtdXN0IGJlIHJlcXVlc3RlZC4nKSk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBtZWRpYUNvbnN0cmFpbnRzID0gT2JqZWN0LmNyZWF0ZSh7fSk7XHJcbiAgICBpZiAodHlwZW9mIGNvbnN0cmFpbnRzLmF1ZGlvID09PSAnb2JqZWN0JyAmJlxyXG4gICAgICAgIGNvbnN0cmFpbnRzLmF1ZGlvLnNvdXJjZSA9PT0gTWVkaWFGb3JtYXRNb2R1bGUuQXVkaW9Tb3VyY2VJbmZvLk1JQykge1xyXG4gICAgICBtZWRpYUNvbnN0cmFpbnRzLmF1ZGlvID0gT2JqZWN0LmNyZWF0ZSh7fSk7XHJcbiAgICAgIGlmICh1dGlscy5pc0VkZ2UoKSkge1xyXG4gICAgICAgIG1lZGlhQ29uc3RyYWludHMuYXVkaW8uZGV2aWNlSWQgPSBjb25zdHJhaW50cy5hdWRpby5kZXZpY2VJZDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBtZWRpYUNvbnN0cmFpbnRzLmF1ZGlvLmRldmljZUlkID0ge1xyXG4gICAgICAgICAgZXhhY3Q6IGNvbnN0cmFpbnRzLmF1ZGlvLmRldmljZUlkLFxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChjb25zdHJhaW50cy5hdWRpby5zb3VyY2UgPT09IE1lZGlhRm9ybWF0TW9kdWxlLkF1ZGlvU291cmNlSW5mby5TQ1JFRU5DQVNUKSB7XHJcbiAgICAgICAgbWVkaWFDb25zdHJhaW50cy5hdWRpbyA9IHRydWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbWVkaWFDb25zdHJhaW50cy5hdWRpbyA9IGNvbnN0cmFpbnRzLmF1ZGlvO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIGNvbnN0cmFpbnRzLnZpZGVvID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBtZWRpYUNvbnN0cmFpbnRzLnZpZGVvID0gT2JqZWN0LmNyZWF0ZSh7fSk7XHJcbiAgICAgIGlmICh0eXBlb2YgY29uc3RyYWludHMudmlkZW8uZnJhbWVSYXRlID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgIG1lZGlhQ29uc3RyYWludHMudmlkZW8uZnJhbWVSYXRlID0gY29uc3RyYWludHMudmlkZW8uZnJhbWVSYXRlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjb25zdHJhaW50cy52aWRlby5yZXNvbHV0aW9uICYmXHJcbiAgICAgICAgICBjb25zdHJhaW50cy52aWRlby5yZXNvbHV0aW9uLndpZHRoICYmXHJcbiAgICAgICAgICBjb25zdHJhaW50cy52aWRlby5yZXNvbHV0aW9uLmhlaWdodCkge1xyXG4gICAgICAgICAgICBpZiAoY29uc3RyYWludHMudmlkZW8uc291cmNlID09PVxyXG4gICAgICAgICAgICAgIE1lZGlhRm9ybWF0TW9kdWxlLlZpZGVvU291cmNlSW5mby5TQ1JFRU5DQVNUKSB7XHJcbiAgICAgICAgICAgICAgbWVkaWFDb25zdHJhaW50cy52aWRlby53aWR0aCA9XHJcbiAgICAgICAgICAgICAgICBjb25zdHJhaW50cy52aWRlby5yZXNvbHV0aW9uLndpZHRoO1xyXG4gICAgICAgICAgICAgIG1lZGlhQ29uc3RyYWludHMudmlkZW8uaGVpZ2h0ID1cclxuICAgICAgICAgICAgICAgIGNvbnN0cmFpbnRzLnZpZGVvLnJlc29sdXRpb24uaGVpZ2h0O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIG1lZGlhQ29uc3RyYWludHMudmlkZW8ud2lkdGggPSBPYmplY3QuY3JlYXRlKHt9KTtcclxuICAgICAgICAgICAgICBtZWRpYUNvbnN0cmFpbnRzLnZpZGVvLndpZHRoLmV4YWN0ID1cclxuICAgICAgICAgICAgICAgICAgY29uc3RyYWludHMudmlkZW8ucmVzb2x1dGlvbi53aWR0aDtcclxuICAgICAgICAgICAgICBtZWRpYUNvbnN0cmFpbnRzLnZpZGVvLmhlaWdodCA9IE9iamVjdC5jcmVhdGUoe30pO1xyXG4gICAgICAgICAgICAgIG1lZGlhQ29uc3RyYWludHMudmlkZW8uaGVpZ2h0LmV4YWN0ID1cclxuICAgICAgICAgICAgICAgICAgY29uc3RyYWludHMudmlkZW8ucmVzb2x1dGlvbi5oZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHR5cGVvZiBjb25zdHJhaW50cy52aWRlby5kZXZpY2VJZCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICBtZWRpYUNvbnN0cmFpbnRzLnZpZGVvLmRldmljZUlkID0geyBleGFjdDogY29uc3RyYWludHMudmlkZW8uZGV2aWNlSWQgfTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodXRpbHMuaXNGaXJlZm94KCkgJiZcclxuICAgICAgICAgIGNvbnN0cmFpbnRzLnZpZGVvLnNvdXJjZSA9PT1cclxuICAgICAgICAgICAgICBNZWRpYUZvcm1hdE1vZHVsZS5WaWRlb1NvdXJjZUluZm8uU0NSRUVOQ0FTVCkge1xyXG4gICAgICAgIG1lZGlhQ29uc3RyYWludHMudmlkZW8ubWVkaWFTb3VyY2UgPSAnc2NyZWVuJztcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbWVkaWFDb25zdHJhaW50cy52aWRlbyA9IGNvbnN0cmFpbnRzLnZpZGVvO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpc1ZpZGVvQ29uc3RyYWluc0ZvclNjcmVlbkNhc3QoY29uc3RyYWludHMpKSB7XHJcbiAgICAgIHJldHVybiBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldERpc3BsYXlNZWRpYShtZWRpYUNvbnN0cmFpbnRzKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYShtZWRpYUNvbnN0cmFpbnRzKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiLy8gQ29weXJpZ2h0IChDKSA8MjAxOD4gSW50ZWwgQ29ycG9yYXRpb25cclxuLy9cclxuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcclxuXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIFV0aWxzIGZyb20gJy4vdXRpbHMuanMnO1xyXG5pbXBvcnQgKiBhcyBNZWRpYUZvcm1hdCBmcm9tICcuL21lZGlhZm9ybWF0LmpzJztcclxuaW1wb3J0IHtFdmVudERpc3BhdGNoZXJ9IGZyb20gJy4uL2Jhc2UvZXZlbnQuanMnO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBBdWRpb1B1YmxpY2F0aW9uU2V0dGluZ3NcclxuICogQG1lbWJlck9mIE93dC5CYXNlXHJcbiAqIEBjbGFzc0Rlc2MgVGhlIGF1ZGlvIHNldHRpbmdzIG9mIGEgcHVibGljYXRpb24uXHJcbiAqIEBoaWRlY29uc3RydWN0b3JcclxuICovXHJcbmV4cG9ydCBjbGFzcyBBdWRpb1B1YmxpY2F0aW9uU2V0dGluZ3Mge1xyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jXHJcbiAgY29uc3RydWN0b3IoY29kZWMpIHtcclxuICAgIC8qKlxyXG4gICAgICogQG1lbWJlciB7P093dC5CYXNlLkF1ZGlvQ29kZWNQYXJhbWV0ZXJzfSBjb2RlY1xyXG4gICAgICogQGluc3RhbmNlXHJcbiAgICAgKiBAbWVtYmVyb2YgT3d0LkJhc2UuQXVkaW9QdWJsaWNhdGlvblNldHRpbmdzXHJcbiAgICAgKi9cclxuICAgIHRoaXMuY29kZWMgPSBjb2RlYztcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgVmlkZW9QdWJsaWNhdGlvblNldHRpbmdzXHJcbiAqIEBtZW1iZXJPZiBPd3QuQmFzZVxyXG4gKiBAY2xhc3NEZXNjIFRoZSB2aWRlbyBzZXR0aW5ncyBvZiBhIHB1YmxpY2F0aW9uLlxyXG4gKiBAaGlkZWNvbnN0cnVjdG9yXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVmlkZW9QdWJsaWNhdGlvblNldHRpbmdzIHtcclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvY1xyXG4gIGNvbnN0cnVjdG9yKGNvZGVjLCByZXNvbHV0aW9uLCBmcmFtZVJhdGUsIGJpdHJhdGUsIGtleUZyYW1lSW50ZXJ2YWwsIHJpZCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAbWVtYmVyIHs/T3d0LkJhc2UuVmlkZW9Db2RlY1BhcmFtZXRlcnN9IGNvZGVjXHJcbiAgICAgKiBAaW5zdGFuY2VcclxuICAgICAqIEBtZW1iZXJvZiBPd3QuQmFzZS5WaWRlb1B1YmxpY2F0aW9uU2V0dGluZ3NcclxuICAgICAqL1xyXG4gICAgdGhpcy5jb2RlYz1jb2RlYyxcclxuICAgIC8qKlxyXG4gICAgICogQG1lbWJlciB7P093dC5CYXNlLlJlc29sdXRpb259IHJlc29sdXRpb25cclxuICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICogQG1lbWJlcm9mIE93dC5CYXNlLlZpZGVvUHVibGljYXRpb25TZXR0aW5nc1xyXG4gICAgICovXHJcbiAgICB0aGlzLnJlc29sdXRpb249cmVzb2x1dGlvbjtcclxuICAgIC8qKlxyXG4gICAgICogQG1lbWJlciB7P251bWJlcn0gZnJhbWVSYXRlc1xyXG4gICAgICogQGluc3RhbmNlXHJcbiAgICAgKiBAY2xhc3NEZXNjIEZyYW1lcyBwZXIgc2Vjb25kLlxyXG4gICAgICogQG1lbWJlcm9mIE93dC5CYXNlLlZpZGVvUHVibGljYXRpb25TZXR0aW5nc1xyXG4gICAgICovXHJcbiAgICB0aGlzLmZyYW1lUmF0ZT1mcmFtZVJhdGU7XHJcbiAgICAvKipcclxuICAgICAqIEBtZW1iZXIgez9udW1iZXJ9IGJpdHJhdGVcclxuICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICogQG1lbWJlcm9mIE93dC5CYXNlLlZpZGVvUHVibGljYXRpb25TZXR0aW5nc1xyXG4gICAgICovXHJcbiAgICB0aGlzLmJpdHJhdGU9Yml0cmF0ZTtcclxuICAgIC8qKlxyXG4gICAgICogQG1lbWJlciB7P251bWJlcn0ga2V5RnJhbWVJbnRlcnZhbHNcclxuICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICogQGNsYXNzRGVzYyBUaGUgdGltZSBpbnRlcnZhbCBiZXR3ZWVuIGtleSBmcmFtZXMuIFVuaXQ6IHNlY29uZC5cclxuICAgICAqIEBtZW1iZXJvZiBPd3QuQmFzZS5WaWRlb1B1YmxpY2F0aW9uU2V0dGluZ3NcclxuICAgICAqL1xyXG4gICAgdGhpcy5rZXlGcmFtZUludGVydmFsPWtleUZyYW1lSW50ZXJ2YWw7XHJcbiAgICAvKipcclxuICAgICAqIEBtZW1iZXIgez9udW1iZXJ9IHJpZFxyXG4gICAgICogQGluc3RhbmNlXHJcbiAgICAgKiBAY2xhc3NEZXNjIFJlc3RyaWN0aW9uIGlkZW50aWZpZXIgdG8gaWRlbnRpZnkgdGhlIFJUUCBTdHJlYW1zIHdpdGhpbiBhbiBSVFAgc2Vzc2lvbi5cclxuICAgICAqIEBtZW1iZXJvZiBPd3QuQmFzZS5WaWRlb1B1YmxpY2F0aW9uU2V0dGluZ3NcclxuICAgICAqL1xyXG4gICAgdGhpcy5yaWQ9cmlkO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBQdWJsaWNhdGlvblNldHRpbmdzXHJcbiAqIEBtZW1iZXJPZiBPd3QuQmFzZVxyXG4gKiBAY2xhc3NEZXNjIFRoZSBzZXR0aW5ncyBvZiBhIHB1YmxpY2F0aW9uLlxyXG4gKiBAaGlkZWNvbnN0cnVjdG9yXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUHVibGljYXRpb25TZXR0aW5ncyB7XHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2NcclxuICBjb25zdHJ1Y3RvcihhdWRpbywgdmlkZW8pIHtcclxuICAgIC8qKlxyXG4gICAgICogQG1lbWJlciB7T3d0LkJhc2UuQXVkaW9QdWJsaWNhdGlvblNldHRpbmdzW119IGF1ZGlvXHJcbiAgICAgKiBAaW5zdGFuY2VcclxuICAgICAqIEBtZW1iZXJvZiBPd3QuQmFzZS5QdWJsaWNhdGlvblNldHRpbmdzXHJcbiAgICAgKi9cclxuICAgIHRoaXMuYXVkaW89YXVkaW87XHJcbiAgICAvKipcclxuICAgICAqIEBtZW1iZXIge093dC5CYXNlLlZpZGVvUHVibGljYXRpb25TZXR0aW5nc1tdfSB2aWRlb1xyXG4gICAgICogQGluc3RhbmNlXHJcbiAgICAgKiBAbWVtYmVyb2YgT3d0LkJhc2UuUHVibGljYXRpb25TZXR0aW5nc1xyXG4gICAgICovXHJcbiAgICB0aGlzLnZpZGVvPXZpZGVvO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBQdWJsaWNhdGlvblxyXG4gKiBAZXh0ZW5kcyBPd3QuQmFzZS5FdmVudERpc3BhdGNoZXJcclxuICogQG1lbWJlck9mIE93dC5CYXNlXHJcbiAqIEBjbGFzc0Rlc2MgUHVibGljYXRpb24gcmVwcmVzZW50cyBhIHNlbmRlciBmb3IgcHVibGlzaGluZyBhIHN0cmVhbS4gSXRcclxuICogaGFuZGxlcyB0aGUgYWN0aW9ucyBvbiBhIExvY2FsU3RyZWFtIHB1Ymxpc2hlZCB0byBhIGNvbmZlcmVuY2UuXHJcbiAqXHJcbiAqIEV2ZW50czpcclxuICpcclxuICogfCBFdmVudCBOYW1lICAgICAgfCBBcmd1bWVudCBUeXBlICAgIHwgRmlyZWQgd2hlbiAgICAgICB8XHJcbiAqIHwgLS0tLS0tLS0tLS0tLS0tLXwgLS0tLS0tLS0tLS0tLS0tLSB8IC0tLS0tLS0tLS0tLS0tLS0gfFxyXG4gKiB8IGVuZGVkICAgICAgICAgICB8IEV2ZW50ICAgICAgICAgICAgfCBQdWJsaWNhdGlvbiBpcyBlbmRlZC4gfFxyXG4gKiB8IGVycm9yICAgICAgICAgICB8IEVycm9yRXZlbnQgICAgICAgfCBBbiBlcnJvciBvY2N1cnJlZCBvbiB0aGUgcHVibGljYXRpb24uIHxcclxuICogfCBtdXRlICAgICAgICAgICAgfCBNdXRlRXZlbnQgICAgICAgIHwgUHVibGljYXRpb24gaXMgbXV0ZWQuIENsaWVudCBzdG9wcGVkIHNlbmRpbmcgYXVkaW8gYW5kL29yIHZpZGVvIGRhdGEgdG8gcmVtb3RlIGVuZHBvaW50LiB8XHJcbiAqIHwgdW5tdXRlICAgICAgICAgIHwgTXV0ZUV2ZW50ICAgICAgICB8IFB1YmxpY2F0aW9uIGlzIHVubXV0ZWQuIENsaWVudCBjb250aW51ZWQgc2VuZGluZyBhdWRpbyBhbmQvb3IgdmlkZW8gZGF0YSB0byByZW1vdGUgZW5kcG9pbnQuIHxcclxuICpcclxuICogYGVuZGVkYCBldmVudCBtYXkgbm90IGJlIGZpcmVkIG9uIFNhZmFyaSBhZnRlciBjYWxsaW5nIGBQdWJsaWNhdGlvbi5zdG9wKClgLlxyXG4gKlxyXG4gKiBAaGlkZWNvbnN0cnVjdG9yXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUHVibGljYXRpb24gZXh0ZW5kcyBFdmVudERpc3BhdGNoZXIge1xyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jXHJcbiAgY29uc3RydWN0b3IoaWQsIHN0b3AsIGdldFN0YXRzLCBtdXRlLCB1bm11dGUpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICAvKipcclxuICAgICAqIEBtZW1iZXIge3N0cmluZ30gaWRcclxuICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICogQG1lbWJlcm9mIE93dC5CYXNlLlB1YmxpY2F0aW9uXHJcbiAgICAgKi9cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnaWQnLCB7XHJcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXHJcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcclxuICAgICAgdmFsdWU6IGlkID8gaWQgOiBVdGlscy5jcmVhdGVVdWlkKCksXHJcbiAgICB9KTtcclxuICAgIC8qKlxyXG4gICAgICogQGZ1bmN0aW9uIHN0b3BcclxuICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICogQGRlc2MgU3RvcCBjZXJ0YWluIHB1YmxpY2F0aW9uLiBPbmNlIGEgc3Vic2NyaXB0aW9uIGlzIHN0b3BwZWQsIGl0IGNhbm5vdCBiZSByZWNvdmVyZWQuXHJcbiAgICAgKiBAbWVtYmVyb2YgT3d0LkJhc2UuUHVibGljYXRpb25cclxuICAgICAqIEByZXR1cm5zIHt1bmRlZmluZWR9XHJcbiAgICAgKi9cclxuICAgIHRoaXMuc3RvcCA9IHN0b3A7XHJcbiAgICAvKipcclxuICAgICAqIEBmdW5jdGlvbiBnZXRTdGF0c1xyXG4gICAgICogQGluc3RhbmNlXHJcbiAgICAgKiBAZGVzYyBHZXQgc3RhdHMgb2YgdW5kZXJseWluZyBQZWVyQ29ubmVjdGlvbi5cclxuICAgICAqIEBtZW1iZXJvZiBPd3QuQmFzZS5QdWJsaWNhdGlvblxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8UlRDU3RhdHNSZXBvcnQsIEVycm9yPn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5nZXRTdGF0cyA9IGdldFN0YXRzO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAZnVuY3Rpb24gbXV0ZVxyXG4gICAgICogQGluc3RhbmNlXHJcbiAgICAgKiBAZGVzYyBTdG9wIHNlbmRpbmcgZGF0YSB0byByZW1vdGUgZW5kcG9pbnQuXHJcbiAgICAgKiBAbWVtYmVyb2YgT3d0LkJhc2UuUHVibGljYXRpb25cclxuICAgICAqIEBwYXJhbSB7T3d0LkJhc2UuVHJhY2tLaW5kIH0ga2luZCBLaW5kIG9mIHRyYWNrcyB0byBiZSBtdXRlZC5cclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHVuZGVmaW5lZCwgRXJyb3I+fVxyXG4gICAgICovXHJcbiAgICB0aGlzLm11dGUgPSBtdXRlO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAZnVuY3Rpb24gdW5tdXRlXHJcbiAgICAgKiBAaW5zdGFuY2VcclxuICAgICAqIEBkZXNjIENvbnRpbnVlIHNlbmRpbmcgZGF0YSB0byByZW1vdGUgZW5kcG9pbnQuXHJcbiAgICAgKiBAbWVtYmVyb2YgT3d0LkJhc2UuUHVibGljYXRpb25cclxuICAgICAqIEBwYXJhbSB7T3d0LkJhc2UuVHJhY2tLaW5kIH0ga2luZCBLaW5kIG9mIHRyYWNrcyB0byBiZSB1bm11dGVkLlxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dW5kZWZpbmVkLCBFcnJvcj59XHJcbiAgICAgKi9cclxuICAgIHRoaXMudW5tdXRlID0gdW5tdXRlO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBQdWJsaXNoT3B0aW9uc1xyXG4gKiBAbWVtYmVyT2YgT3d0LkJhc2VcclxuICogQGNsYXNzRGVzYyBQdWJsaXNoT3B0aW9ucyBkZWZpbmVzIG9wdGlvbnMgZm9yIHB1Ymxpc2hpbmcgYSBPd3QuQmFzZS5Mb2NhbFN0cmVhbS5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBQdWJsaXNoT3B0aW9ucyB7XHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2NcclxuICBjb25zdHJ1Y3RvcihhdWRpbywgdmlkZW8pIHtcclxuICAgIC8qKlxyXG4gICAgICogQG1lbWJlciB7P0FycmF5PE93dC5CYXNlLkF1ZGlvRW5jb2RpbmdQYXJhbWV0ZXJzPiB8ID9BcnJheTxSVENSdHBFbmNvZGluZ1BhcmFtZXRlcnM+fSBhdWRpb1xyXG4gICAgICogQGluc3RhbmNlXHJcbiAgICAgKiBAbWVtYmVyb2YgT3d0LkJhc2UuUHVibGlzaE9wdGlvbnNcclxuICAgICAqIEBkZXNjIFBhcmFtZXRlcnMgZm9yIGF1ZGlvIFJ0cFNlbmRlci4gUHVibGlzaGluZyB3aXRoIFJUQ1J0cEVuY29kaW5nUGFyYW1ldGVycyBpcyBhbiBleHBlcmltZW50YWwgZmVhdHVyZS4gSXQgaXMgc3ViamVjdCB0byBjaGFuZ2UuXHJcbiAgICAgKi9cclxuICAgIHRoaXMuYXVkaW8gPSBhdWRpbztcclxuICAgIC8qKlxyXG4gICAgICogQG1lbWJlciB7P0FycmF5PE93dC5CYXNlLlZpZGVvRW5jb2RpbmdQYXJhbWV0ZXJzPiB8ID9BcnJheTxSVENSdHBFbmNvZGluZ1BhcmFtZXRlcnM+fSB2aWRlb1xyXG4gICAgICogQGluc3RhbmNlXHJcbiAgICAgKiBAbWVtYmVyb2YgT3d0LkJhc2UuUHVibGlzaE9wdGlvbnNcclxuICAgICAqIEBkZXNjIFBhcmFtZXRlcnMgZm9yIHZpZGVvIFJ0cFNlbmRlci4gUHVibGlzaGluZyB3aXRoIFJUQ1J0cEVuY29kaW5nUGFyYW1ldGVycyBpcyBhbiBleHBlcmltZW50YWwgZmVhdHVyZS4gSXQgaXMgc3ViamVjdCB0byBjaGFuZ2UuXHJcbiAgICAgKi9cclxuICAgIHRoaXMudmlkZW8gPSB2aWRlbztcclxuICB9XHJcbn1cclxuIiwiLypcclxuICogIENvcHlyaWdodCAoYykgMjAxNCBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcclxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxyXG4gKiAgdHJlZS5cclxuICovXHJcblxyXG4vKiBNb3JlIGluZm9ybWF0aW9uIGFib3V0IHRoZXNlIG9wdGlvbnMgYXQganNoaW50LmNvbS9kb2NzL29wdGlvbnMgKi9cclxuXHJcbi8qIGVzbGludC1kaXNhYmxlICovXHJcblxyXG4vKiBnbG9iYWxzICBhZGFwdGVyLCB0cmFjZSAqL1xyXG4vKiBleHBvcnRlZCBzZXRDb2RlY1BhcmFtLCBpY2VDYW5kaWRhdGVUeXBlLCBmb3JtYXRUeXBlUHJlZmVyZW5jZSxcclxuICAgbWF5YmVTZXRPcHVzT3B0aW9ucywgbWF5YmVQcmVmZXJBdWRpb1JlY2VpdmVDb2RlYyxcclxuICAgbWF5YmVQcmVmZXJBdWRpb1NlbmRDb2RlYywgbWF5YmVTZXRBdWRpb1JlY2VpdmVCaXRSYXRlLFxyXG4gICBtYXliZVNldEF1ZGlvU2VuZEJpdFJhdGUsIG1heWJlUHJlZmVyVmlkZW9SZWNlaXZlQ29kZWMsXHJcbiAgIG1heWJlUHJlZmVyVmlkZW9TZW5kQ29kZWMsIG1heWJlU2V0VmlkZW9SZWNlaXZlQml0UmF0ZSxcclxuICAgbWF5YmVTZXRWaWRlb1NlbmRCaXRSYXRlLCBtYXliZVNldFZpZGVvU2VuZEluaXRpYWxCaXRSYXRlLFxyXG4gICBtYXliZVJlbW92ZVZpZGVvRmVjLCBtZXJnZUNvbnN0cmFpbnRzLCByZW1vdmVDb2RlY1BhcmFtKi9cclxuXHJcbi8qIFRoaXMgZmlsZSBpcyBib3Jyb3dlZCBmcm9tIGFwcHJ0YyB3aXRoIHNvbWUgbW9kaWZpY2F0aW9ucy4gKi9cclxuLyogQ29tbWl0IGhhc2g6IGM2YWYwYzI1ZTlhZjUyN2Y3MWIzYWNkZDZiZmExMzg5ZDc3OGY3YmQgKyBQUiA1MzAgKi9cclxuXHJcbmltcG9ydCBMb2dnZXIgZnJvbSAnLi9sb2dnZXIuanMnO1xyXG5cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuZnVuY3Rpb24gbWVyZ2VDb25zdHJhaW50cyhjb25zMSwgY29uczIpIHtcclxuICBpZiAoIWNvbnMxIHx8ICFjb25zMikge1xyXG4gICAgcmV0dXJuIGNvbnMxIHx8IGNvbnMyO1xyXG4gIH1cclxuICBjb25zdCBtZXJnZWQgPSBjb25zMTtcclxuICBmb3IgKGNvbnN0IGtleSBpbiBjb25zMikge1xyXG4gICAgbWVyZ2VkW2tleV0gPSBjb25zMltrZXldO1xyXG4gIH1cclxuICByZXR1cm4gbWVyZ2VkO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpY2VDYW5kaWRhdGVUeXBlKGNhbmRpZGF0ZVN0cikge1xyXG4gIHJldHVybiBjYW5kaWRhdGVTdHIuc3BsaXQoJyAnKVs3XTtcclxufVxyXG5cclxuLy8gVHVybnMgdGhlIGxvY2FsIHR5cGUgcHJlZmVyZW5jZSBpbnRvIGEgaHVtYW4tcmVhZGFibGUgc3RyaW5nLlxyXG4vLyBOb3RlIHRoYXQgdGhpcyBtYXBwaW5nIGlzIGJyb3dzZXItc3BlY2lmaWMuXHJcbmZ1bmN0aW9uIGZvcm1hdFR5cGVQcmVmZXJlbmNlKHByZWYpIHtcclxuICBpZiAoYWRhcHRlci5icm93c2VyRGV0YWlscy5icm93c2VyID09PSAnY2hyb21lJykge1xyXG4gICAgc3dpdGNoIChwcmVmKSB7XHJcbiAgICAgIGNhc2UgMDpcclxuICAgICAgICByZXR1cm4gJ1RVUk4vVExTJztcclxuICAgICAgY2FzZSAxOlxyXG4gICAgICAgIHJldHVybiAnVFVSTi9UQ1AnO1xyXG4gICAgICBjYXNlIDI6XHJcbiAgICAgICAgcmV0dXJuICdUVVJOL1VEUCc7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChhZGFwdGVyLmJyb3dzZXJEZXRhaWxzLmJyb3dzZXIgPT09ICdmaXJlZm94Jykge1xyXG4gICAgc3dpdGNoIChwcmVmKSB7XHJcbiAgICAgIGNhc2UgMDpcclxuICAgICAgICByZXR1cm4gJ1RVUk4vVENQJztcclxuICAgICAgY2FzZSA1OlxyXG4gICAgICAgIHJldHVybiAnVFVSTi9VRFAnO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gJyc7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1heWJlU2V0T3B1c09wdGlvbnMoc2RwLCBwYXJhbXMpIHtcclxuICAvLyBTZXQgT3B1cyBpbiBTdGVyZW8sIGlmIHN0ZXJlbyBpcyB0cnVlLCB1bnNldCBpdCwgaWYgc3RlcmVvIGlzIGZhbHNlLCBhbmRcclxuICAvLyBkbyBub3RoaW5nIGlmIG90aGVyd2lzZS5cclxuICBpZiAocGFyYW1zLm9wdXNTdGVyZW8gPT09ICd0cnVlJykge1xyXG4gICAgc2RwID0gc2V0Q29kZWNQYXJhbShzZHAsICdvcHVzLzQ4MDAwJywgJ3N0ZXJlbycsICcxJyk7XHJcbiAgfSBlbHNlIGlmIChwYXJhbXMub3B1c1N0ZXJlbyA9PT0gJ2ZhbHNlJykge1xyXG4gICAgc2RwID0gcmVtb3ZlQ29kZWNQYXJhbShzZHAsICdvcHVzLzQ4MDAwJywgJ3N0ZXJlbycpO1xyXG4gIH1cclxuXHJcbiAgLy8gU2V0IE9wdXMgRkVDLCBpZiBvcHVzZmVjIGlzIHRydWUsIHVuc2V0IGl0LCBpZiBvcHVzZmVjIGlzIGZhbHNlLCBhbmRcclxuICAvLyBkbyBub3RoaW5nIGlmIG90aGVyd2lzZS5cclxuICBpZiAocGFyYW1zLm9wdXNGZWMgPT09ICd0cnVlJykge1xyXG4gICAgc2RwID0gc2V0Q29kZWNQYXJhbShzZHAsICdvcHVzLzQ4MDAwJywgJ3VzZWluYmFuZGZlYycsICcxJyk7XHJcbiAgfSBlbHNlIGlmIChwYXJhbXMub3B1c0ZlYyA9PT0gJ2ZhbHNlJykge1xyXG4gICAgc2RwID0gcmVtb3ZlQ29kZWNQYXJhbShzZHAsICdvcHVzLzQ4MDAwJywgJ3VzZWluYmFuZGZlYycpO1xyXG4gIH1cclxuXHJcbiAgLy8gU2V0IE9wdXMgRFRYLCBpZiBvcHVzZHR4IGlzIHRydWUsIHVuc2V0IGl0LCBpZiBvcHVzZHR4IGlzIGZhbHNlLCBhbmRcclxuICAvLyBkbyBub3RoaW5nIGlmIG90aGVyd2lzZS5cclxuICBpZiAocGFyYW1zLm9wdXNEdHggPT09ICd0cnVlJykge1xyXG4gICAgc2RwID0gc2V0Q29kZWNQYXJhbShzZHAsICdvcHVzLzQ4MDAwJywgJ3VzZWR0eCcsICcxJyk7XHJcbiAgfSBlbHNlIGlmIChwYXJhbXMub3B1c0R0eCA9PT0gJ2ZhbHNlJykge1xyXG4gICAgc2RwID0gcmVtb3ZlQ29kZWNQYXJhbShzZHAsICdvcHVzLzQ4MDAwJywgJ3VzZWR0eCcpO1xyXG4gIH1cclxuXHJcbiAgLy8gU2V0IE9wdXMgbWF4cGxheWJhY2tyYXRlLCBpZiByZXF1ZXN0ZWQuXHJcbiAgaWYgKHBhcmFtcy5vcHVzTWF4UGJyKSB7XHJcbiAgICBzZHAgPSBzZXRDb2RlY1BhcmFtKFxyXG4gICAgICAgIHNkcCwgJ29wdXMvNDgwMDAnLCAnbWF4cGxheWJhY2tyYXRlJywgcGFyYW1zLm9wdXNNYXhQYnIpO1xyXG4gIH1cclxuICByZXR1cm4gc2RwO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYXliZVNldEF1ZGlvU2VuZEJpdFJhdGUoc2RwLCBwYXJhbXMpIHtcclxuICBpZiAoIXBhcmFtcy5hdWRpb1NlbmRCaXRyYXRlKSB7XHJcbiAgICByZXR1cm4gc2RwO1xyXG4gIH1cclxuICBMb2dnZXIuZGVidWcoJ1ByZWZlciBhdWRpbyBzZW5kIGJpdHJhdGU6ICcgKyBwYXJhbXMuYXVkaW9TZW5kQml0cmF0ZSk7XHJcbiAgcmV0dXJuIHByZWZlckJpdFJhdGUoc2RwLCBwYXJhbXMuYXVkaW9TZW5kQml0cmF0ZSwgJ2F1ZGlvJyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1heWJlU2V0QXVkaW9SZWNlaXZlQml0UmF0ZShzZHAsIHBhcmFtcykge1xyXG4gIGlmICghcGFyYW1zLmF1ZGlvUmVjdkJpdHJhdGUpIHtcclxuICAgIHJldHVybiBzZHA7XHJcbiAgfVxyXG4gIExvZ2dlci5kZWJ1ZygnUHJlZmVyIGF1ZGlvIHJlY2VpdmUgYml0cmF0ZTogJyArIHBhcmFtcy5hdWRpb1JlY3ZCaXRyYXRlKTtcclxuICByZXR1cm4gcHJlZmVyQml0UmF0ZShzZHAsIHBhcmFtcy5hdWRpb1JlY3ZCaXRyYXRlLCAnYXVkaW8nKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbWF5YmVTZXRWaWRlb1NlbmRCaXRSYXRlKHNkcCwgcGFyYW1zKSB7XHJcbiAgaWYgKCFwYXJhbXMudmlkZW9TZW5kQml0cmF0ZSkge1xyXG4gICAgcmV0dXJuIHNkcDtcclxuICB9XHJcbiAgTG9nZ2VyLmRlYnVnKCdQcmVmZXIgdmlkZW8gc2VuZCBiaXRyYXRlOiAnICsgcGFyYW1zLnZpZGVvU2VuZEJpdHJhdGUpO1xyXG4gIHJldHVybiBwcmVmZXJCaXRSYXRlKHNkcCwgcGFyYW1zLnZpZGVvU2VuZEJpdHJhdGUsICd2aWRlbycpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYXliZVNldFZpZGVvUmVjZWl2ZUJpdFJhdGUoc2RwLCBwYXJhbXMpIHtcclxuICBpZiAoIXBhcmFtcy52aWRlb1JlY3ZCaXRyYXRlKSB7XHJcbiAgICByZXR1cm4gc2RwO1xyXG4gIH1cclxuICBMb2dnZXIuZGVidWcoJ1ByZWZlciB2aWRlbyByZWNlaXZlIGJpdHJhdGU6ICcgKyBwYXJhbXMudmlkZW9SZWN2Qml0cmF0ZSk7XHJcbiAgcmV0dXJuIHByZWZlckJpdFJhdGUoc2RwLCBwYXJhbXMudmlkZW9SZWN2Qml0cmF0ZSwgJ3ZpZGVvJyk7XHJcbn1cclxuXHJcbi8vIEFkZCBhIGI9QVM6Yml0cmF0ZSBsaW5lIHRvIHRoZSBtPW1lZGlhVHlwZSBzZWN0aW9uLlxyXG5mdW5jdGlvbiBwcmVmZXJCaXRSYXRlKHNkcCwgYml0cmF0ZSwgbWVkaWFUeXBlKSB7XHJcbiAgY29uc3Qgc2RwTGluZXMgPSBzZHAuc3BsaXQoJ1xcclxcbicpO1xyXG5cclxuICAvLyBGaW5kIG0gbGluZSBmb3IgdGhlIGdpdmVuIG1lZGlhVHlwZS5cclxuICBjb25zdCBtTGluZUluZGV4ID0gZmluZExpbmUoc2RwTGluZXMsICdtPScsIG1lZGlhVHlwZSk7XHJcbiAgaWYgKG1MaW5lSW5kZXggPT09IG51bGwpIHtcclxuICAgIExvZ2dlci5kZWJ1ZygnRmFpbGVkIHRvIGFkZCBiYW5kd2lkdGggbGluZSB0byBzZHAsIGFzIG5vIG0tbGluZSBmb3VuZCcpO1xyXG4gICAgcmV0dXJuIHNkcDtcclxuICB9XHJcblxyXG4gIC8vIEZpbmQgbmV4dCBtLWxpbmUgaWYgYW55LlxyXG4gIGxldCBuZXh0TUxpbmVJbmRleCA9IGZpbmRMaW5lSW5SYW5nZShzZHBMaW5lcywgbUxpbmVJbmRleCArIDEsIC0xLCAnbT0nKTtcclxuICBpZiAobmV4dE1MaW5lSW5kZXggPT09IG51bGwpIHtcclxuICAgIG5leHRNTGluZUluZGV4ID0gc2RwTGluZXMubGVuZ3RoO1xyXG4gIH1cclxuXHJcbiAgLy8gRmluZCBjLWxpbmUgY29ycmVzcG9uZGluZyB0byB0aGUgbS1saW5lLlxyXG4gIGNvbnN0IGNMaW5lSW5kZXggPSBmaW5kTGluZUluUmFuZ2Uoc2RwTGluZXMsIG1MaW5lSW5kZXggKyAxLFxyXG4gICAgICBuZXh0TUxpbmVJbmRleCwgJ2M9Jyk7XHJcbiAgaWYgKGNMaW5lSW5kZXggPT09IG51bGwpIHtcclxuICAgIExvZ2dlci5kZWJ1ZygnRmFpbGVkIHRvIGFkZCBiYW5kd2lkdGggbGluZSB0byBzZHAsIGFzIG5vIGMtbGluZSBmb3VuZCcpO1xyXG4gICAgcmV0dXJuIHNkcDtcclxuICB9XHJcblxyXG4gIC8vIENoZWNrIGlmIGJhbmR3aWR0aCBsaW5lIGFscmVhZHkgZXhpc3RzIGJldHdlZW4gYy1saW5lIGFuZCBuZXh0IG0tbGluZS5cclxuICBjb25zdCBiTGluZUluZGV4ID0gZmluZExpbmVJblJhbmdlKHNkcExpbmVzLCBjTGluZUluZGV4ICsgMSxcclxuICAgICAgbmV4dE1MaW5lSW5kZXgsICdiPUFTJyk7XHJcbiAgaWYgKGJMaW5lSW5kZXgpIHtcclxuICAgIHNkcExpbmVzLnNwbGljZShiTGluZUluZGV4LCAxKTtcclxuICB9XHJcblxyXG4gIC8vIENyZWF0ZSB0aGUgYiAoYmFuZHdpZHRoKSBzZHAgbGluZS5cclxuICBjb25zdCBid0xpbmUgPSAnYj1BUzonICsgYml0cmF0ZTtcclxuICAvLyBBcyBwZXIgUkZDIDQ1NjYsIHRoZSBiIGxpbmUgc2hvdWxkIGZvbGxvdyBhZnRlciBjLWxpbmUuXHJcbiAgc2RwTGluZXMuc3BsaWNlKGNMaW5lSW5kZXggKyAxLCAwLCBid0xpbmUpO1xyXG4gIHNkcCA9IHNkcExpbmVzLmpvaW4oJ1xcclxcbicpO1xyXG4gIHJldHVybiBzZHA7XHJcbn1cclxuXHJcbi8vIEFkZCBhbiBhPWZtdHA6IHgtZ29vZ2xlLW1pbi1iaXRyYXRlPWticHMgbGluZSwgaWYgdmlkZW9TZW5kSW5pdGlhbEJpdHJhdGVcclxuLy8gaXMgc3BlY2lmaWVkLiBXZSdsbCBhbHNvIGFkZCBhIHgtZ29vZ2xlLW1pbi1iaXRyYXRlIHZhbHVlLCBzaW5jZSB0aGUgbWF4XHJcbi8vIG11c3QgYmUgPj0gdGhlIG1pbi5cclxuZnVuY3Rpb24gbWF5YmVTZXRWaWRlb1NlbmRJbml0aWFsQml0UmF0ZShzZHAsIHBhcmFtcykge1xyXG4gIGxldCBpbml0aWFsQml0cmF0ZSA9IHBhcnNlSW50KHBhcmFtcy52aWRlb1NlbmRJbml0aWFsQml0cmF0ZSk7XHJcbiAgaWYgKCFpbml0aWFsQml0cmF0ZSkge1xyXG4gICAgcmV0dXJuIHNkcDtcclxuICB9XHJcblxyXG4gIC8vIFZhbGlkYXRlIHRoZSBpbml0aWFsIGJpdHJhdGUgdmFsdWUuXHJcbiAgbGV0IG1heEJpdHJhdGUgPSBwYXJzZUludChpbml0aWFsQml0cmF0ZSk7XHJcbiAgY29uc3QgYml0cmF0ZSA9IHBhcnNlSW50KHBhcmFtcy52aWRlb1NlbmRCaXRyYXRlKTtcclxuICBpZiAoYml0cmF0ZSkge1xyXG4gICAgaWYgKGluaXRpYWxCaXRyYXRlID4gYml0cmF0ZSkge1xyXG4gICAgICBMb2dnZXIuZGVidWcoJ0NsYW1waW5nIGluaXRpYWwgYml0cmF0ZSB0byBtYXggYml0cmF0ZSBvZiAnICsgYml0cmF0ZSArICcga2Jwcy4nKTtcclxuICAgICAgaW5pdGlhbEJpdHJhdGUgPSBiaXRyYXRlO1xyXG4gICAgICBwYXJhbXMudmlkZW9TZW5kSW5pdGlhbEJpdHJhdGUgPSBpbml0aWFsQml0cmF0ZTtcclxuICAgIH1cclxuICAgIG1heEJpdHJhdGUgPSBiaXRyYXRlO1xyXG4gIH1cclxuXHJcbiAgY29uc3Qgc2RwTGluZXMgPSBzZHAuc3BsaXQoJ1xcclxcbicpO1xyXG5cclxuICAvLyBTZWFyY2ggZm9yIG0gbGluZS5cclxuICBjb25zdCBtTGluZUluZGV4ID0gZmluZExpbmUoc2RwTGluZXMsICdtPScsICd2aWRlbycpO1xyXG4gIGlmIChtTGluZUluZGV4ID09PSBudWxsKSB7XHJcbiAgICBMb2dnZXIuZGVidWcoJ0ZhaWxlZCB0byBmaW5kIHZpZGVvIG0tbGluZScpO1xyXG4gICAgcmV0dXJuIHNkcDtcclxuICB9XHJcbiAgLy8gRmlndXJlIG91dCB0aGUgZmlyc3QgY29kZWMgcGF5bG9hZCB0eXBlIG9uIHRoZSBtPXZpZGVvIFNEUCBsaW5lLlxyXG4gIGNvbnN0IHZpZGVvTUxpbmUgPSBzZHBMaW5lc1ttTGluZUluZGV4XTtcclxuICBjb25zdCBwYXR0ZXJuID0gbmV3IFJlZ0V4cCgnbT12aWRlb1xcXFxzXFxcXGQrXFxcXHNbQS1aL10rXFxcXHMnKTtcclxuICBjb25zdCBzZW5kUGF5bG9hZFR5cGUgPSB2aWRlb01MaW5lLnNwbGl0KHBhdHRlcm4pWzFdLnNwbGl0KCcgJylbMF07XHJcbiAgY29uc3QgZm10cExpbmUgPSBzZHBMaW5lc1tmaW5kTGluZShzZHBMaW5lcywgJ2E9cnRwbWFwJywgc2VuZFBheWxvYWRUeXBlKV07XHJcbiAgY29uc3QgY29kZWNOYW1lID0gZm10cExpbmUuc3BsaXQoJ2E9cnRwbWFwOicgK1xyXG4gICAgICBzZW5kUGF5bG9hZFR5cGUpWzFdLnNwbGl0KCcvJylbMF07XHJcblxyXG4gIC8vIFVzZSBjb2RlYyBmcm9tIHBhcmFtcyBpZiBzcGVjaWZpZWQgdmlhIFVSTCBwYXJhbSwgb3RoZXJ3aXNlIHVzZSBmcm9tIFNEUC5cclxuICBjb25zdCBjb2RlYyA9IHBhcmFtcy52aWRlb1NlbmRDb2RlYyB8fCBjb2RlY05hbWU7XHJcbiAgc2RwID0gc2V0Q29kZWNQYXJhbShzZHAsIGNvZGVjLCAneC1nb29nbGUtbWluLWJpdHJhdGUnLFxyXG4gICAgICBwYXJhbXMudmlkZW9TZW5kSW5pdGlhbEJpdHJhdGUudG9TdHJpbmcoKSk7XHJcbiAgc2RwID0gc2V0Q29kZWNQYXJhbShzZHAsIGNvZGVjLCAneC1nb29nbGUtbWF4LWJpdHJhdGUnLFxyXG4gICAgICBtYXhCaXRyYXRlLnRvU3RyaW5nKCkpO1xyXG5cclxuICByZXR1cm4gc2RwO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVQYXlsb2FkVHlwZUZyb21NbGluZShtTGluZSwgcGF5bG9hZFR5cGUpIHtcclxuICBtTGluZSA9IG1MaW5lLnNwbGl0KCcgJyk7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBtTGluZS5sZW5ndGg7ICsraSkge1xyXG4gICAgaWYgKG1MaW5lW2ldID09PSBwYXlsb2FkVHlwZS50b1N0cmluZygpKSB7XHJcbiAgICAgIG1MaW5lLnNwbGljZShpLCAxKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIG1MaW5lLmpvaW4oJyAnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlQ29kZWNCeU5hbWUoc2RwTGluZXMsIGNvZGVjKSB7XHJcbiAgY29uc3QgaW5kZXggPSBmaW5kTGluZShzZHBMaW5lcywgJ2E9cnRwbWFwJywgY29kZWMpO1xyXG4gIGlmIChpbmRleCA9PT0gbnVsbCkge1xyXG4gICAgcmV0dXJuIHNkcExpbmVzO1xyXG4gIH1cclxuICBjb25zdCBwYXlsb2FkVHlwZSA9IGdldENvZGVjUGF5bG9hZFR5cGVGcm9tTGluZShzZHBMaW5lc1tpbmRleF0pO1xyXG4gIHNkcExpbmVzLnNwbGljZShpbmRleCwgMSk7XHJcblxyXG4gIC8vIFNlYXJjaCBmb3IgdGhlIHZpZGVvIG09IGxpbmUgYW5kIHJlbW92ZSB0aGUgY29kZWMuXHJcbiAgY29uc3QgbUxpbmVJbmRleCA9IGZpbmRMaW5lKHNkcExpbmVzLCAnbT0nLCAndmlkZW8nKTtcclxuICBpZiAobUxpbmVJbmRleCA9PT0gbnVsbCkge1xyXG4gICAgcmV0dXJuIHNkcExpbmVzO1xyXG4gIH1cclxuICBzZHBMaW5lc1ttTGluZUluZGV4XSA9IHJlbW92ZVBheWxvYWRUeXBlRnJvbU1saW5lKHNkcExpbmVzW21MaW5lSW5kZXhdLFxyXG4gICAgICBwYXlsb2FkVHlwZSk7XHJcbiAgcmV0dXJuIHNkcExpbmVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVDb2RlY0J5UGF5bG9hZFR5cGUoc2RwTGluZXMsIHBheWxvYWRUeXBlKSB7XHJcbiAgY29uc3QgaW5kZXggPSBmaW5kTGluZShzZHBMaW5lcywgJ2E9cnRwbWFwJywgcGF5bG9hZFR5cGUudG9TdHJpbmcoKSk7XHJcbiAgaWYgKGluZGV4ID09PSBudWxsKSB7XHJcbiAgICByZXR1cm4gc2RwTGluZXM7XHJcbiAgfVxyXG4gIHNkcExpbmVzLnNwbGljZShpbmRleCwgMSk7XHJcblxyXG4gIC8vIFNlYXJjaCBmb3IgdGhlIHZpZGVvIG09IGxpbmUgYW5kIHJlbW92ZSB0aGUgY29kZWMuXHJcbiAgY29uc3QgbUxpbmVJbmRleCA9IGZpbmRMaW5lKHNkcExpbmVzLCAnbT0nLCAndmlkZW8nKTtcclxuICBpZiAobUxpbmVJbmRleCA9PT0gbnVsbCkge1xyXG4gICAgcmV0dXJuIHNkcExpbmVzO1xyXG4gIH1cclxuICBzZHBMaW5lc1ttTGluZUluZGV4XSA9IHJlbW92ZVBheWxvYWRUeXBlRnJvbU1saW5lKHNkcExpbmVzW21MaW5lSW5kZXhdLFxyXG4gICAgICBwYXlsb2FkVHlwZSk7XHJcbiAgcmV0dXJuIHNkcExpbmVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYXliZVJlbW92ZVZpZGVvRmVjKHNkcCwgcGFyYW1zKSB7XHJcbiAgaWYgKHBhcmFtcy52aWRlb0ZlYyAhPT0gJ2ZhbHNlJykge1xyXG4gICAgcmV0dXJuIHNkcDtcclxuICB9XHJcblxyXG4gIGxldCBzZHBMaW5lcyA9IHNkcC5zcGxpdCgnXFxyXFxuJyk7XHJcblxyXG4gIGxldCBpbmRleCA9IGZpbmRMaW5lKHNkcExpbmVzLCAnYT1ydHBtYXAnLCAncmVkJyk7XHJcbiAgaWYgKGluZGV4ID09PSBudWxsKSB7XHJcbiAgICByZXR1cm4gc2RwO1xyXG4gIH1cclxuICBjb25zdCByZWRQYXlsb2FkVHlwZSA9IGdldENvZGVjUGF5bG9hZFR5cGVGcm9tTGluZShzZHBMaW5lc1tpbmRleF0pO1xyXG4gIHNkcExpbmVzID0gcmVtb3ZlQ29kZWNCeVBheWxvYWRUeXBlKHNkcExpbmVzLCByZWRQYXlsb2FkVHlwZSk7XHJcblxyXG4gIHNkcExpbmVzID0gcmVtb3ZlQ29kZWNCeU5hbWUoc2RwTGluZXMsICd1bHBmZWMnKTtcclxuXHJcbiAgLy8gUmVtb3ZlIGZtdHAgbGluZXMgYXNzb2NpYXRlZCB3aXRoIHJlZCBjb2RlYy5cclxuICBpbmRleCA9IGZpbmRMaW5lKHNkcExpbmVzLCAnYT1mbXRwJywgcmVkUGF5bG9hZFR5cGUudG9TdHJpbmcoKSk7XHJcbiAgaWYgKGluZGV4ID09PSBudWxsKSB7XHJcbiAgICByZXR1cm4gc2RwO1xyXG4gIH1cclxuICBjb25zdCBmbXRwTGluZSA9IHBhcnNlRm10cExpbmUoc2RwTGluZXNbaW5kZXhdKTtcclxuICBjb25zdCBydHhQYXlsb2FkVHlwZSA9IGZtdHBMaW5lLnB0O1xyXG4gIGlmIChydHhQYXlsb2FkVHlwZSA9PT0gbnVsbCkge1xyXG4gICAgcmV0dXJuIHNkcDtcclxuICB9XHJcbiAgc2RwTGluZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuXHJcbiAgc2RwTGluZXMgPSByZW1vdmVDb2RlY0J5UGF5bG9hZFR5cGUoc2RwTGluZXMsIHJ0eFBheWxvYWRUeXBlKTtcclxuICByZXR1cm4gc2RwTGluZXMuam9pbignXFxyXFxuJyk7XHJcbn1cclxuXHJcbi8vIFByb21vdGVzIHxhdWRpb1NlbmRDb2RlY3wgdG8gYmUgdGhlIGZpcnN0IGluIHRoZSBtPWF1ZGlvIGxpbmUsIGlmIHNldC5cclxuZnVuY3Rpb24gbWF5YmVQcmVmZXJBdWRpb1NlbmRDb2RlYyhzZHAsIHBhcmFtcykge1xyXG4gIHJldHVybiBtYXliZVByZWZlckNvZGVjKHNkcCwgJ2F1ZGlvJywgJ3NlbmQnLCBwYXJhbXMuYXVkaW9TZW5kQ29kZWMpO1xyXG59XHJcblxyXG4vLyBQcm9tb3RlcyB8YXVkaW9SZWN2Q29kZWN8IHRvIGJlIHRoZSBmaXJzdCBpbiB0aGUgbT1hdWRpbyBsaW5lLCBpZiBzZXQuXHJcbmZ1bmN0aW9uIG1heWJlUHJlZmVyQXVkaW9SZWNlaXZlQ29kZWMoc2RwLCBwYXJhbXMpIHtcclxuICByZXR1cm4gbWF5YmVQcmVmZXJDb2RlYyhzZHAsICdhdWRpbycsICdyZWNlaXZlJywgcGFyYW1zLmF1ZGlvUmVjdkNvZGVjKTtcclxufVxyXG5cclxuLy8gUHJvbW90ZXMgfHZpZGVvU2VuZENvZGVjfCB0byBiZSB0aGUgZmlyc3QgaW4gdGhlIG09YXVkaW8gbGluZSwgaWYgc2V0LlxyXG5mdW5jdGlvbiBtYXliZVByZWZlclZpZGVvU2VuZENvZGVjKHNkcCwgcGFyYW1zKSB7XHJcbiAgcmV0dXJuIG1heWJlUHJlZmVyQ29kZWMoc2RwLCAndmlkZW8nLCAnc2VuZCcsIHBhcmFtcy52aWRlb1NlbmRDb2RlYyk7XHJcbn1cclxuXHJcbi8vIFByb21vdGVzIHx2aWRlb1JlY3ZDb2RlY3wgdG8gYmUgdGhlIGZpcnN0IGluIHRoZSBtPWF1ZGlvIGxpbmUsIGlmIHNldC5cclxuZnVuY3Rpb24gbWF5YmVQcmVmZXJWaWRlb1JlY2VpdmVDb2RlYyhzZHAsIHBhcmFtcykge1xyXG4gIHJldHVybiBtYXliZVByZWZlckNvZGVjKHNkcCwgJ3ZpZGVvJywgJ3JlY2VpdmUnLCBwYXJhbXMudmlkZW9SZWN2Q29kZWMpO1xyXG59XHJcblxyXG4vLyBTZXRzIHxjb2RlY3wgYXMgdGhlIGRlZmF1bHQgfHR5cGV8IGNvZGVjIGlmIGl0J3MgcHJlc2VudC5cclxuLy8gVGhlIGZvcm1hdCBvZiB8Y29kZWN8IGlzICdOQU1FL1JBVEUnLCBlLmcuICdvcHVzLzQ4MDAwJy5cclxuZnVuY3Rpb24gbWF5YmVQcmVmZXJDb2RlYyhzZHAsIHR5cGUsIGRpciwgY29kZWMpIHtcclxuICBjb25zdCBzdHIgPSB0eXBlICsgJyAnICsgZGlyICsgJyBjb2RlYyc7XHJcbiAgaWYgKCFjb2RlYykge1xyXG4gICAgTG9nZ2VyLmRlYnVnKCdObyBwcmVmZXJlbmNlIG9uICcgKyBzdHIgKyAnLicpO1xyXG4gICAgcmV0dXJuIHNkcDtcclxuICB9XHJcblxyXG4gIExvZ2dlci5kZWJ1ZygnUHJlZmVyICcgKyBzdHIgKyAnOiAnICsgY29kZWMpO1xyXG5cclxuICBjb25zdCBzZHBMaW5lcyA9IHNkcC5zcGxpdCgnXFxyXFxuJyk7XHJcblxyXG4gIC8vIFNlYXJjaCBmb3IgbSBsaW5lLlxyXG4gIGNvbnN0IG1MaW5lSW5kZXggPSBmaW5kTGluZShzZHBMaW5lcywgJ209JywgdHlwZSk7XHJcbiAgaWYgKG1MaW5lSW5kZXggPT09IG51bGwpIHtcclxuICAgIHJldHVybiBzZHA7XHJcbiAgfVxyXG5cclxuICAvLyBJZiB0aGUgY29kZWMgaXMgYXZhaWxhYmxlLCBzZXQgaXQgYXMgdGhlIGRlZmF1bHQgaW4gbSBsaW5lLlxyXG4gIGxldCBwYXlsb2FkID0gbnVsbDtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHNkcExpbmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBjb25zdCBpbmRleCA9IGZpbmRMaW5lSW5SYW5nZShzZHBMaW5lcywgaSwgLTEsICdhPXJ0cG1hcCcsIGNvZGVjKTtcclxuICAgIGlmIChpbmRleCAhPT0gbnVsbCkge1xyXG4gICAgICBwYXlsb2FkID0gZ2V0Q29kZWNQYXlsb2FkVHlwZUZyb21MaW5lKHNkcExpbmVzW2luZGV4XSk7XHJcbiAgICAgIGlmIChwYXlsb2FkKSB7XHJcbiAgICAgICAgc2RwTGluZXNbbUxpbmVJbmRleF0gPSBzZXREZWZhdWx0Q29kZWMoc2RwTGluZXNbbUxpbmVJbmRleF0sIHBheWxvYWQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZHAgPSBzZHBMaW5lcy5qb2luKCdcXHJcXG4nKTtcclxuICByZXR1cm4gc2RwO1xyXG59XHJcblxyXG4vLyBTZXQgZm10cCBwYXJhbSB0byBzcGVjaWZpYyBjb2RlYyBpbiBTRFAuIElmIHBhcmFtIGRvZXMgbm90IGV4aXN0cywgYWRkIGl0LlxyXG5mdW5jdGlvbiBzZXRDb2RlY1BhcmFtKHNkcCwgY29kZWMsIHBhcmFtLCB2YWx1ZSkge1xyXG4gIGxldCBzZHBMaW5lcyA9IHNkcC5zcGxpdCgnXFxyXFxuJyk7XHJcbiAgLy8gU0RQcyBzZW50IGZyb20gTUNVIHVzZSBcXG4gYXMgbGluZSBicmVhay5cclxuICBpZiAoc2RwTGluZXMubGVuZ3RoIDw9IDEpIHtcclxuICAgIHNkcExpbmVzID0gc2RwLnNwbGl0KCdcXG4nKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGZtdHBMaW5lSW5kZXggPSBmaW5kRm10cExpbmUoc2RwTGluZXMsIGNvZGVjKTtcclxuXHJcbiAgbGV0IGZtdHBPYmogPSB7fTtcclxuICBpZiAoZm10cExpbmVJbmRleCA9PT0gbnVsbCkge1xyXG4gICAgY29uc3QgaW5kZXggPSBmaW5kTGluZShzZHBMaW5lcywgJ2E9cnRwbWFwJywgY29kZWMpO1xyXG4gICAgaWYgKGluZGV4ID09PSBudWxsKSB7XHJcbiAgICAgIHJldHVybiBzZHA7XHJcbiAgICB9XHJcbiAgICBjb25zdCBwYXlsb2FkID0gZ2V0Q29kZWNQYXlsb2FkVHlwZUZyb21MaW5lKHNkcExpbmVzW2luZGV4XSk7XHJcbiAgICBmbXRwT2JqLnB0ID0gcGF5bG9hZC50b1N0cmluZygpO1xyXG4gICAgZm10cE9iai5wYXJhbXMgPSB7fTtcclxuICAgIGZtdHBPYmoucGFyYW1zW3BhcmFtXSA9IHZhbHVlO1xyXG4gICAgc2RwTGluZXMuc3BsaWNlKGluZGV4ICsgMSwgMCwgd3JpdGVGbXRwTGluZShmbXRwT2JqKSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGZtdHBPYmogPSBwYXJzZUZtdHBMaW5lKHNkcExpbmVzW2ZtdHBMaW5lSW5kZXhdKTtcclxuICAgIGZtdHBPYmoucGFyYW1zW3BhcmFtXSA9IHZhbHVlO1xyXG4gICAgc2RwTGluZXNbZm10cExpbmVJbmRleF0gPSB3cml0ZUZtdHBMaW5lKGZtdHBPYmopO1xyXG4gIH1cclxuXHJcbiAgc2RwID0gc2RwTGluZXMuam9pbignXFxyXFxuJyk7XHJcbiAgcmV0dXJuIHNkcDtcclxufVxyXG5cclxuLy8gUmVtb3ZlIGZtdHAgcGFyYW0gaWYgaXQgZXhpc3RzLlxyXG5mdW5jdGlvbiByZW1vdmVDb2RlY1BhcmFtKHNkcCwgY29kZWMsIHBhcmFtKSB7XHJcbiAgY29uc3Qgc2RwTGluZXMgPSBzZHAuc3BsaXQoJ1xcclxcbicpO1xyXG5cclxuICBjb25zdCBmbXRwTGluZUluZGV4ID0gZmluZEZtdHBMaW5lKHNkcExpbmVzLCBjb2RlYyk7XHJcbiAgaWYgKGZtdHBMaW5lSW5kZXggPT09IG51bGwpIHtcclxuICAgIHJldHVybiBzZHA7XHJcbiAgfVxyXG5cclxuICBjb25zdCBtYXAgPSBwYXJzZUZtdHBMaW5lKHNkcExpbmVzW2ZtdHBMaW5lSW5kZXhdKTtcclxuICBkZWxldGUgbWFwLnBhcmFtc1twYXJhbV07XHJcblxyXG4gIGNvbnN0IG5ld0xpbmUgPSB3cml0ZUZtdHBMaW5lKG1hcCk7XHJcbiAgaWYgKG5ld0xpbmUgPT09IG51bGwpIHtcclxuICAgIHNkcExpbmVzLnNwbGljZShmbXRwTGluZUluZGV4LCAxKTtcclxuICB9IGVsc2Uge1xyXG4gICAgc2RwTGluZXNbZm10cExpbmVJbmRleF0gPSBuZXdMaW5lO1xyXG4gIH1cclxuXHJcbiAgc2RwID0gc2RwTGluZXMuam9pbignXFxyXFxuJyk7XHJcbiAgcmV0dXJuIHNkcDtcclxufVxyXG5cclxuLy8gU3BsaXQgYW4gZm10cCBsaW5lIGludG8gYW4gb2JqZWN0IGluY2x1ZGluZyAncHQnIGFuZCAncGFyYW1zJy5cclxuZnVuY3Rpb24gcGFyc2VGbXRwTGluZShmbXRwTGluZSkge1xyXG4gIGNvbnN0IGZtdHBPYmogPSB7fTtcclxuICBjb25zdCBzcGFjZVBvcyA9IGZtdHBMaW5lLmluZGV4T2YoJyAnKTtcclxuICBjb25zdCBrZXlWYWx1ZXMgPSBmbXRwTGluZS5zdWJzdHJpbmcoc3BhY2VQb3MgKyAxKS5zcGxpdCgnOycpO1xyXG5cclxuICBjb25zdCBwYXR0ZXJuID0gbmV3IFJlZ0V4cCgnYT1mbXRwOihcXFxcZCspJyk7XHJcbiAgY29uc3QgcmVzdWx0ID0gZm10cExpbmUubWF0Y2gocGF0dGVybik7XHJcbiAgaWYgKHJlc3VsdCAmJiByZXN1bHQubGVuZ3RoID09PSAyKSB7XHJcbiAgICBmbXRwT2JqLnB0ID0gcmVzdWx0WzFdO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIGNvbnN0IHBhcmFtcyA9IHt9O1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwga2V5VmFsdWVzLmxlbmd0aDsgKytpKSB7XHJcbiAgICBjb25zdCBwYWlyID0ga2V5VmFsdWVzW2ldLnNwbGl0KCc9Jyk7XHJcbiAgICBpZiAocGFpci5sZW5ndGggPT09IDIpIHtcclxuICAgICAgcGFyYW1zW3BhaXJbMF1dID0gcGFpclsxXTtcclxuICAgIH1cclxuICB9XHJcbiAgZm10cE9iai5wYXJhbXMgPSBwYXJhbXM7XHJcblxyXG4gIHJldHVybiBmbXRwT2JqO1xyXG59XHJcblxyXG4vLyBHZW5lcmF0ZSBhbiBmbXRwIGxpbmUgZnJvbSBhbiBvYmplY3QgaW5jbHVkaW5nICdwdCcgYW5kICdwYXJhbXMnLlxyXG5mdW5jdGlvbiB3cml0ZUZtdHBMaW5lKGZtdHBPYmopIHtcclxuICBpZiAoIWZtdHBPYmouaGFzT3duUHJvcGVydHkoJ3B0JykgfHwgIWZtdHBPYmouaGFzT3duUHJvcGVydHkoJ3BhcmFtcycpKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbiAgY29uc3QgcHQgPSBmbXRwT2JqLnB0O1xyXG4gIGNvbnN0IHBhcmFtcyA9IGZtdHBPYmoucGFyYW1zO1xyXG4gIGNvbnN0IGtleVZhbHVlcyA9IFtdO1xyXG4gIGxldCBpID0gMDtcclxuICBmb3IgKGNvbnN0IGtleSBpbiBwYXJhbXMpIHtcclxuICAgIGtleVZhbHVlc1tpXSA9IGtleSArICc9JyArIHBhcmFtc1trZXldO1xyXG4gICAgKytpO1xyXG4gIH1cclxuICBpZiAoaSA9PT0gMCkge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG4gIHJldHVybiAnYT1mbXRwOicgKyBwdC50b1N0cmluZygpICsgJyAnICsga2V5VmFsdWVzLmpvaW4oJzsnKTtcclxufVxyXG5cclxuLy8gRmluZCBmbXRwIGF0dHJpYnV0ZSBmb3IgfGNvZGVjfCBpbiB8c2RwTGluZXN8LlxyXG5mdW5jdGlvbiBmaW5kRm10cExpbmUoc2RwTGluZXMsIGNvZGVjKSB7XHJcbiAgLy8gRmluZCBwYXlsb2FkIG9mIGNvZGVjLlxyXG4gIGNvbnN0IHBheWxvYWQgPSBnZXRDb2RlY1BheWxvYWRUeXBlKHNkcExpbmVzLCBjb2RlYyk7XHJcbiAgLy8gRmluZCB0aGUgcGF5bG9hZCBpbiBmbXRwIGxpbmUuXHJcbiAgcmV0dXJuIHBheWxvYWQgPyBmaW5kTGluZShzZHBMaW5lcywgJ2E9Zm10cDonICsgcGF5bG9hZC50b1N0cmluZygpKSA6IG51bGw7XHJcbn1cclxuXHJcbi8vIEZpbmQgdGhlIGxpbmUgaW4gc2RwTGluZXMgdGhhdCBzdGFydHMgd2l0aCB8cHJlZml4fCwgYW5kLCBpZiBzcGVjaWZpZWQsXHJcbi8vIGNvbnRhaW5zIHxzdWJzdHJ8IChjYXNlLWluc2Vuc2l0aXZlIHNlYXJjaCkuXHJcbmZ1bmN0aW9uIGZpbmRMaW5lKHNkcExpbmVzLCBwcmVmaXgsIHN1YnN0cikge1xyXG4gIHJldHVybiBmaW5kTGluZUluUmFuZ2Uoc2RwTGluZXMsIDAsIC0xLCBwcmVmaXgsIHN1YnN0cik7XHJcbn1cclxuXHJcbi8vIEZpbmQgdGhlIGxpbmUgaW4gc2RwTGluZXNbc3RhcnRMaW5lLi4uZW5kTGluZSAtIDFdIHRoYXQgc3RhcnRzIHdpdGggfHByZWZpeHxcclxuLy8gYW5kLCBpZiBzcGVjaWZpZWQsIGNvbnRhaW5zIHxzdWJzdHJ8IChjYXNlLWluc2Vuc2l0aXZlIHNlYXJjaCkuXHJcbmZ1bmN0aW9uIGZpbmRMaW5lSW5SYW5nZShzZHBMaW5lcywgc3RhcnRMaW5lLCBlbmRMaW5lLCBwcmVmaXgsIHN1YnN0cikge1xyXG4gIGNvbnN0IHJlYWxFbmRMaW5lID0gZW5kTGluZSAhPT0gLTEgPyBlbmRMaW5lIDogc2RwTGluZXMubGVuZ3RoO1xyXG4gIGZvciAobGV0IGkgPSBzdGFydExpbmU7IGkgPCByZWFsRW5kTGluZTsgKytpKSB7XHJcbiAgICBpZiAoc2RwTGluZXNbaV0uaW5kZXhPZihwcmVmaXgpID09PSAwKSB7XHJcbiAgICAgIGlmICghc3Vic3RyIHx8XHJcbiAgICAgICAgICBzZHBMaW5lc1tpXS50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc3Vic3RyLnRvTG93ZXJDYXNlKCkpICE9PSAtMSkge1xyXG4gICAgICAgIHJldHVybiBpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBudWxsO1xyXG59XHJcblxyXG4vLyBHZXRzIHRoZSBjb2RlYyBwYXlsb2FkIHR5cGUgZnJvbSBzZHAgbGluZXMuXHJcbmZ1bmN0aW9uIGdldENvZGVjUGF5bG9hZFR5cGUoc2RwTGluZXMsIGNvZGVjKSB7XHJcbiAgY29uc3QgaW5kZXggPSBmaW5kTGluZShzZHBMaW5lcywgJ2E9cnRwbWFwJywgY29kZWMpO1xyXG4gIHJldHVybiBpbmRleCA/IGdldENvZGVjUGF5bG9hZFR5cGVGcm9tTGluZShzZHBMaW5lc1tpbmRleF0pIDogbnVsbDtcclxufVxyXG5cclxuLy8gR2V0cyB0aGUgY29kZWMgcGF5bG9hZCB0eXBlIGZyb20gYW4gYT1ydHBtYXA6WCBsaW5lLlxyXG5mdW5jdGlvbiBnZXRDb2RlY1BheWxvYWRUeXBlRnJvbUxpbmUoc2RwTGluZSkge1xyXG4gIGNvbnN0IHBhdHRlcm4gPSBuZXcgUmVnRXhwKCdhPXJ0cG1hcDooXFxcXGQrKSBbYS16QS1aMC05LV0rXFxcXC9cXFxcZCsnKTtcclxuICBjb25zdCByZXN1bHQgPSBzZHBMaW5lLm1hdGNoKHBhdHRlcm4pO1xyXG4gIHJldHVybiAocmVzdWx0ICYmIHJlc3VsdC5sZW5ndGggPT09IDIpID8gcmVzdWx0WzFdIDogbnVsbDtcclxufVxyXG5cclxuLy8gUmV0dXJucyBhIG5ldyBtPSBsaW5lIHdpdGggdGhlIHNwZWNpZmllZCBjb2RlYyBhcyB0aGUgZmlyc3Qgb25lLlxyXG5mdW5jdGlvbiBzZXREZWZhdWx0Q29kZWMobUxpbmUsIHBheWxvYWQpIHtcclxuICBjb25zdCBlbGVtZW50cyA9IG1MaW5lLnNwbGl0KCcgJyk7XHJcblxyXG4gIC8vIEp1c3QgY29weSB0aGUgZmlyc3QgdGhyZWUgcGFyYW1ldGVyczsgY29kZWMgb3JkZXIgc3RhcnRzIG9uIGZvdXJ0aC5cclxuICBjb25zdCBuZXdMaW5lID0gZWxlbWVudHMuc2xpY2UoMCwgMyk7XHJcblxyXG4gIC8vIFB1dCB0YXJnZXQgcGF5bG9hZCBmaXJzdCBhbmQgY29weSBpbiB0aGUgcmVzdC5cclxuICBuZXdMaW5lLnB1c2gocGF5bG9hZCk7XHJcbiAgZm9yIChsZXQgaSA9IDM7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgaWYgKGVsZW1lbnRzW2ldICE9PSBwYXlsb2FkKSB7XHJcbiAgICAgIG5ld0xpbmUucHVzaChlbGVtZW50c1tpXSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBuZXdMaW5lLmpvaW4oJyAnKTtcclxufVxyXG5cclxuLyogQmVsb3cgYXJlIG5ld2x5IGFkZGVkIGZ1bmN0aW9ucyAqL1xyXG5cclxuLy8gRm9sbG93aW5nIGNvZGVjcyB3aWxsIG5vdCBiZSByZW1vdmVkIGZyb20gU0RQIGV2ZW50IHRoZXkgYXJlIG5vdCBpbiB0aGVcclxuLy8gdXNlci1zcGVjaWZpZWQgY29kZWMgbGlzdC5cclxuY29uc3QgYXVkaW9Db2RlY1doaXRlTGlzdCA9IFsnQ04nLCAndGVsZXBob25lLWV2ZW50J107XHJcbmNvbnN0IHZpZGVvQ29kZWNXaGl0ZUxpc3QgPSBbJ3JlZCcsICd1bHBmZWMnXTtcclxuXHJcbi8vIFJldHVybnMgYSBuZXcgbT0gbGluZSB3aXRoIHRoZSBzcGVjaWZpZWQgY29kZWMgb3JkZXIuXHJcbmZ1bmN0aW9uIHNldENvZGVjT3JkZXIobUxpbmUsIHBheWxvYWRzKSB7XHJcbiAgY29uc3QgZWxlbWVudHMgPSBtTGluZS5zcGxpdCgnICcpO1xyXG5cclxuICAvLyBKdXN0IGNvcHkgdGhlIGZpcnN0IHRocmVlIHBhcmFtZXRlcnM7IGNvZGVjIG9yZGVyIHN0YXJ0cyBvbiBmb3VydGguXHJcbiAgbGV0IG5ld0xpbmUgPSBlbGVtZW50cy5zbGljZSgwLCAzKTtcclxuXHJcbiAgLy8gQ29uY2F0IHBheWxvYWQgdHlwZXMuXHJcbiAgbmV3TGluZSA9IG5ld0xpbmUuY29uY2F0KHBheWxvYWRzKTtcclxuXHJcbiAgcmV0dXJuIG5ld0xpbmUuam9pbignICcpO1xyXG59XHJcblxyXG4vLyBBcHBlbmQgUlRYIHBheWxvYWRzIGZvciBleGlzdGluZyBwYXlsb2Fkcy5cclxuZnVuY3Rpb24gYXBwZW5kUnR4UGF5bG9hZHMoc2RwTGluZXMsIHBheWxvYWRzKSB7XHJcbiAgZm9yIChjb25zdCBwYXlsb2FkIG9mIHBheWxvYWRzKSB7XHJcbiAgICBjb25zdCBpbmRleCA9IGZpbmRMaW5lKHNkcExpbmVzLCAnYT1mbXRwJywgJ2FwdD0nICsgcGF5bG9hZCk7XHJcbiAgICBpZiAoaW5kZXggIT09IG51bGwpIHtcclxuICAgICAgY29uc3QgZm10cExpbmUgPSBwYXJzZUZtdHBMaW5lKHNkcExpbmVzW2luZGV4XSk7XHJcbiAgICAgIHBheWxvYWRzLnB1c2goZm10cExpbmUucHQpO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gcGF5bG9hZHM7XHJcbn1cclxuXHJcbi8vIFJlbW92ZSBhIGNvZGVjIHdpdGggYWxsIGl0cyBhc3NvY2lhdGVkIGEgbGluZXMuXHJcbmZ1bmN0aW9uIHJlbW92ZUNvZGVjRnJhbUFMaW5lKHNkcExpbmVzLCBwYXlsb2FkKSB7XHJcbiAgY29uc3QgcGF0dGVybiA9IG5ldyBSZWdFeHAoJ2E9KHJ0cG1hcHxydGNwLWZifGZtdHApOicrcGF5bG9hZCsnXFxcXHMnKTtcclxuICBmb3IgKGxldCBpPXNkcExpbmVzLmxlbmd0aC0xOyBpPjA7IGktLSkge1xyXG4gICAgaWYgKHNkcExpbmVzW2ldLm1hdGNoKHBhdHRlcm4pKSB7XHJcbiAgICAgIHNkcExpbmVzLnNwbGljZShpLCAxKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHNkcExpbmVzO1xyXG59XHJcblxyXG4vLyBSZW9yZGVyIGNvZGVjcyBpbiBtLWxpbmUgYWNjb3JkaW5nIHRoZSBvcmRlciBvZiB8Y29kZWNzfC4gUmVtb3ZlIGNvZGVjcyBmcm9tXHJcbi8vIG0tbGluZSBpZiBpdCBpcyBub3QgcHJlc2VudCBpbiB8Y29kZWNzfFxyXG4vLyBUaGUgZm9ybWF0IG9mIHxjb2RlY3wgaXMgJ05BTUUvUkFURScsIGUuZy4gJ29wdXMvNDgwMDAnLlxyXG5leHBvcnQgZnVuY3Rpb24gcmVvcmRlckNvZGVjcyhzZHAsIHR5cGUsIGNvZGVjcykge1xyXG4gIGlmICghY29kZWNzIHx8IGNvZGVjcy5sZW5ndGggPT09IDApIHtcclxuICAgIHJldHVybiBzZHA7XHJcbiAgfVxyXG5cclxuICBjb2RlY3MgPSB0eXBlID09PSAnYXVkaW8nID8gY29kZWNzLmNvbmNhdChhdWRpb0NvZGVjV2hpdGVMaXN0KSA6IGNvZGVjcy5jb25jYXQoXHJcbiAgICAgIHZpZGVvQ29kZWNXaGl0ZUxpc3QpO1xyXG5cclxuICBsZXQgc2RwTGluZXMgPSBzZHAuc3BsaXQoJ1xcclxcbicpO1xyXG5cclxuICAvLyBTZWFyY2ggZm9yIG0gbGluZS5cclxuICBjb25zdCBtTGluZUluZGV4ID0gZmluZExpbmUoc2RwTGluZXMsICdtPScsIHR5cGUpO1xyXG4gIGlmIChtTGluZUluZGV4ID09PSBudWxsKSB7XHJcbiAgICByZXR1cm4gc2RwO1xyXG4gIH1cclxuXHJcbiAgY29uc3Qgb3JpZ2luUGF5bG9hZHMgPSBzZHBMaW5lc1ttTGluZUluZGV4XS5zcGxpdCgnICcpO1xyXG4gIG9yaWdpblBheWxvYWRzLnNwbGljZSgwLCAzKTtcclxuXHJcbiAgLy8gSWYgdGhlIGNvZGVjIGlzIGF2YWlsYWJsZSwgc2V0IGl0IGFzIHRoZSBkZWZhdWx0IGluIG0gbGluZS5cclxuICBsZXQgcGF5bG9hZHMgPSBbXTtcclxuICBmb3IgKGNvbnN0IGNvZGVjIG9mIGNvZGVjcykge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZHBMaW5lcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCBpbmRleCA9IGZpbmRMaW5lSW5SYW5nZShzZHBMaW5lcywgaSwgLTEsICdhPXJ0cG1hcCcsIGNvZGVjKTtcclxuICAgICAgaWYgKGluZGV4ICE9PSBudWxsKSB7XHJcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IGdldENvZGVjUGF5bG9hZFR5cGVGcm9tTGluZShzZHBMaW5lc1tpbmRleF0pO1xyXG4gICAgICAgIGlmIChwYXlsb2FkKSB7XHJcbiAgICAgICAgICBwYXlsb2Fkcy5wdXNoKHBheWxvYWQpO1xyXG4gICAgICAgICAgaSA9IGluZGV4O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBwYXlsb2FkcyA9IGFwcGVuZFJ0eFBheWxvYWRzKHNkcExpbmVzLCBwYXlsb2Fkcyk7XHJcbiAgc2RwTGluZXNbbUxpbmVJbmRleF0gPSBzZXRDb2RlY09yZGVyKHNkcExpbmVzW21MaW5lSW5kZXhdLCBwYXlsb2Fkcyk7XHJcblxyXG4gIC8vIFJlbW92ZSBhIGxpbmVzLlxyXG4gIGZvciAoY29uc3QgcGF5bG9hZCBvZiBvcmlnaW5QYXlsb2Fkcykge1xyXG4gICAgaWYgKHBheWxvYWRzLmluZGV4T2YocGF5bG9hZCk9PT0tMSkge1xyXG4gICAgICBzZHBMaW5lcyA9IHJlbW92ZUNvZGVjRnJhbUFMaW5lKHNkcExpbmVzLCBwYXlsb2FkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNkcCA9IHNkcExpbmVzLmpvaW4oJ1xcclxcbicpO1xyXG4gIHJldHVybiBzZHA7XHJcbn1cclxuXHJcbi8vIEFkZCBsZWdhY3kgc2ltdWxjYXN0LlxyXG5leHBvcnQgZnVuY3Rpb24gYWRkTGVnYWN5U2ltdWxjYXN0KHNkcCwgdHlwZSwgbnVtU3RyZWFtcykge1xyXG4gIGlmICghbnVtU3RyZWFtcyB8fCAhKG51bVN0cmVhbXMgPiAxKSkge1xyXG4gICAgcmV0dXJuIHNkcDtcclxuICB9XHJcblxyXG4gIGxldCBzZHBMaW5lcyA9IHNkcC5zcGxpdCgnXFxyXFxuJyk7XHJcbiAgLy8gU2VhcmNoIGZvciBtIGxpbmUuXHJcbiAgY29uc3QgbUxpbmVTdGFydCA9IGZpbmRMaW5lKHNkcExpbmVzLCAnbT0nLCB0eXBlKTtcclxuICBpZiAobUxpbmVTdGFydCA9PT0gbnVsbCkge1xyXG4gICAgcmV0dXJuIHNkcDtcclxuICB9XHJcbiAgbGV0IG1MaW5lRW5kID0gZmluZExpbmVJblJhbmdlKHNkcExpbmVzLCBtTGluZVN0YXJ0ICsgMSwgLTEsICdtPScpO1xyXG4gIGlmIChtTGluZUVuZCA9PT0gbnVsbCkge1xyXG4gICAgbUxpbmVFbmQgPSBzZHBMaW5lcy5sZW5ndGg7XHJcbiAgfVxyXG5cclxuICBjb25zdCBzc3JjR2V0dGVyID0gKGxpbmUpID0+IHtcclxuICAgIGNvbnN0IHBhcnRzID0gbGluZS5zcGxpdCgnICcpO1xyXG4gICAgY29uc3Qgc3NyYyA9IHBhcnRzWzBdLnNwbGl0KCc6JylbMV07XHJcbiAgICByZXR1cm4gc3NyYztcclxuICB9O1xyXG5cclxuICAvLyBQcm9jZXNzIHNzcmMgbGluZXMgZnJvbSBtTGluZUluZGV4LlxyXG4gIGNvbnN0IHJlbW92ZXMgPSBuZXcgU2V0KCk7XHJcbiAgY29uc3Qgc3NyY3MgPSBuZXcgU2V0KCk7XHJcbiAgY29uc3QgZ3NzcmNzID0gbmV3IFNldCgpO1xyXG4gIGNvbnN0IHNpbUxpbmVzID0gW107XHJcbiAgY29uc3Qgc2ltR3JvdXBMaW5lcyA9IFtdO1xyXG4gIGxldCBpID0gbUxpbmVTdGFydCArIDE7XHJcbiAgd2hpbGUgKGkgPCBtTGluZUVuZCkge1xyXG4gICAgY29uc3QgbGluZSA9IHNkcExpbmVzW2ldO1xyXG4gICAgaWYgKGxpbmUgPT09ICcnKSB7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgaWYgKGxpbmUuaW5kZXhPZignYT1zc3JjOicpID4gLTEpIHtcclxuICAgICAgY29uc3Qgc3NyYyA9IHNzcmNHZXR0ZXIoc2RwTGluZXNbaV0pO1xyXG4gICAgICBzc3Jjcy5hZGQoc3NyYyk7XHJcbiAgICAgIGlmIChsaW5lLmluZGV4T2YoJ2NuYW1lJykgPiAtMSB8fCBsaW5lLmluZGV4T2YoJ21zaWQnKSA+IC0xKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDE7IGogPCBudW1TdHJlYW1zOyBqKyspIHtcclxuICAgICAgICAgIGNvbnN0IG5zc3JjID0gKHBhcnNlSW50KHNzcmMpICsgaikgKyAnJztcclxuICAgICAgICAgIHNpbUxpbmVzLnB1c2gobGluZS5yZXBsYWNlKHNzcmMsIG5zc3JjKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlbW92ZXMuYWRkKGxpbmUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAobGluZS5pbmRleE9mKCdhPXNzcmMtZ3JvdXA6RklEJykgPiAtMSkge1xyXG4gICAgICBjb25zdCBwYXJ0cyA9IGxpbmUuc3BsaXQoJyAnKTtcclxuICAgICAgZ3NzcmNzLmFkZChwYXJ0c1syXSk7XHJcbiAgICAgIGZvciAobGV0IGogPSAxOyBqIDwgbnVtU3RyZWFtczsgaisrKSB7XHJcbiAgICAgICAgY29uc3QgbnNzcmMxID0gKHBhcnNlSW50KHBhcnRzWzFdKSArIGopICsgJyc7XHJcbiAgICAgICAgY29uc3QgbnNzcmMyID0gKHBhcnNlSW50KHBhcnRzWzJdKSArIGopICsgJyc7XHJcbiAgICAgICAgc2ltR3JvdXBMaW5lcy5wdXNoKFxyXG4gICAgICAgICAgbGluZS5yZXBsYWNlKHBhcnRzWzFdLCBuc3NyYzEpLnJlcGxhY2UocGFydHNbMl0sIG5zc3JjMikpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpKys7XHJcbiAgfVxyXG5cclxuICBjb25zdCBpbnNlcnRQb3MgPSBpO1xyXG4gIHNzcmNzLmZvckVhY2goc3NyYyA9PiB7XHJcbiAgICBpZiAoIWdzc3Jjcy5oYXMoc3NyYykpIHtcclxuICAgICAgbGV0IGdyb3VwTGluZSA9ICdhPXNzcmMtZ3JvdXA6U0lNJztcclxuICAgICAgZ3JvdXBMaW5lID0gZ3JvdXBMaW5lICsgJyAnICsgc3NyYztcclxuICAgICAgZm9yIChsZXQgaiA9IDE7IGogPCBudW1TdHJlYW1zOyBqKyspIHtcclxuICAgICAgICBncm91cExpbmUgPSBncm91cExpbmUgKyAnICcgKyAocGFyc2VJbnQoc3NyYykgKyBqKTtcclxuICAgICAgfVxyXG4gICAgICBzaW1Hcm91cExpbmVzLnB1c2goZ3JvdXBMaW5lKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgc2ltTGluZXMuc29ydCgpO1xyXG4gIC8vIEluc2VydCBzaW11bGNhc3Qgc3NyYyBsaW5lcy5cclxuICBzZHBMaW5lcy5zcGxpY2UoaW5zZXJ0UG9zLCAwLCAuLi5zaW1Hcm91cExpbmVzKTtcclxuICBzZHBMaW5lcy5zcGxpY2UoaW5zZXJ0UG9zLCAwLCAuLi5zaW1MaW5lcyk7XHJcbiAgc2RwTGluZXMgPSBzZHBMaW5lcy5maWx0ZXIobGluZSA9PiAhcmVtb3Zlcy5oYXMobGluZSkpO1xyXG5cclxuICBzZHAgPSBzZHBMaW5lcy5qb2luKCdcXHJcXG4nKTtcclxuICByZXR1cm4gc2RwO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0TWF4Qml0cmF0ZShzZHAsIGVuY29kaW5nUGFyYW1ldGVyc0xpc3QpIHtcclxuICBmb3IgKGNvbnN0IGVuY29kaW5nUGFyYW1ldGVycyBvZiBlbmNvZGluZ1BhcmFtZXRlcnNMaXN0KSB7XHJcbiAgICBpZiAoZW5jb2RpbmdQYXJhbWV0ZXJzLm1heEJpdHJhdGUpIHtcclxuICAgICAgc2RwID0gc2V0Q29kZWNQYXJhbShcclxuICAgICAgICAgIHNkcCwgZW5jb2RpbmdQYXJhbWV0ZXJzLmNvZGVjLm5hbWUsICd4LWdvb2dsZS1tYXgtYml0cmF0ZScsXHJcbiAgICAgICAgICAoZW5jb2RpbmdQYXJhbWV0ZXJzLm1heEJpdHJhdGUpLnRvU3RyaW5nKCkpO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gc2RwO1xyXG59XHJcbiIsIi8vIENvcHlyaWdodCAoQykgPDIwMTg+IEludGVsIENvcnBvcmF0aW9uXHJcbi8vXHJcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXHJcblxyXG4ndXNlIHN0cmljdCc7XHJcbmltcG9ydCBMb2dnZXIgZnJvbSAnLi9sb2dnZXIuanMnXHJcbmltcG9ydCB7T3d0RXZlbnR9IGZyb20gJy4vZXZlbnQuanMnXHJcbmltcG9ydCAqIGFzIFV0aWxzIGZyb20gJy4vdXRpbHMuanMnXHJcbmltcG9ydCB7IEV2ZW50RGlzcGF0Y2hlcn0gZnJvbSAnLi9ldmVudC5qcyc7XHJcblxyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvY1xyXG5mdW5jdGlvbiBpc0FsbG93ZWRWYWx1ZShvYmosIGFsbG93ZWRWYWx1ZXMpIHtcclxuICByZXR1cm4gKGFsbG93ZWRWYWx1ZXMuc29tZSgoZWxlKSA9PiB7XHJcbiAgICByZXR1cm4gZWxlID09PSBvYmo7XHJcbiAgfSkpO1xyXG59XHJcbi8qKlxyXG4gKiBAY2xhc3MgU3RyZWFtU291cmNlSW5mb1xyXG4gKiBAbWVtYmVyT2YgT3d0LkJhc2VcclxuICogQGNsYXNzRGVzYyBJbmZvcm1hdGlvbiBvZiBhIHN0cmVhbSdzIHNvdXJjZS5cclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIEBkZXNjcmlwdGlvbiBBdWRpbyBzb3VyY2UgaW5mbyBvciB2aWRlbyBzb3VyY2UgaW5mbyBjb3VsZCBiZSB1bmRlZmluZWQgaWYgYSBzdHJlYW0gZG9lcyBub3QgaGF2ZSBhdWRpby92aWRlbyB0cmFjay5cclxuICogQHBhcmFtIHs/c3RyaW5nfSBhdWRpb1NvdXJjZUluZm8gQXVkaW8gc291cmNlIGluZm8uIEFjY2VwdGVkIHZhbHVlcyBhcmU6IFwibWljXCIsIFwic2NyZWVuLWNhc3RcIiwgXCJmaWxlXCIsIFwibWl4ZWRcIiBvciB1bmRlZmluZWQuXHJcbiAqIEBwYXJhbSB7P3N0cmluZ30gdmlkZW9Tb3VyY2VJbmZvIFZpZGVvIHNvdXJjZSBpbmZvLiBBY2NlcHRlZCB2YWx1ZXMgYXJlOiBcImNhbWVyYVwiLCBcInNjcmVlbi1jYXN0XCIsIFwiZmlsZVwiLCBcIm1peGVkXCIgb3IgdW5kZWZpbmVkLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFN0cmVhbVNvdXJjZUluZm8ge1xyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jXHJcbiAgY29uc3RydWN0b3IoYXVkaW9Tb3VyY2VJbmZvLCB2aWRlb1NvdXJjZUluZm8pIHtcclxuICAgIGlmICghaXNBbGxvd2VkVmFsdWUoYXVkaW9Tb3VyY2VJbmZvLCBbdW5kZWZpbmVkLCAnbWljJywgJ3NjcmVlbi1jYXN0JyxcclxuICAgICAgJ2ZpbGUnLCAnbWl4ZWQnXSkpIHtcclxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW5jb3JyZWN0IHZhbHVlIGZvciBhdWRpb1NvdXJjZUluZm8nKTtcclxuICAgIH1cclxuICAgIGlmICghaXNBbGxvd2VkVmFsdWUodmlkZW9Tb3VyY2VJbmZvLCBbdW5kZWZpbmVkLCAnY2FtZXJhJywgJ3NjcmVlbi1jYXN0JyxcclxuICAgICAgJ2ZpbGUnLCAnZW5jb2RlZC1maWxlJywgJ3Jhdy1maWxlJywgJ21peGVkJ10pKSB7XHJcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0luY29ycmVjdCB2YWx1ZSBmb3IgdmlkZW9Tb3VyY2VJbmZvJyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmF1ZGlvID0gYXVkaW9Tb3VyY2VJbmZvO1xyXG4gICAgdGhpcy52aWRlbyA9IHZpZGVvU291cmNlSW5mbztcclxuICB9XHJcbn1cclxuLyoqXHJcbiAqIEBjbGFzcyBTdHJlYW1cclxuICogQG1lbWJlck9mIE93dC5CYXNlXHJcbiAqIEBjbGFzc0Rlc2MgQmFzZSBjbGFzcyBvZiBzdHJlYW1zLlxyXG4gKiBAZXh0ZW5kcyBPd3QuQmFzZS5FdmVudERpc3BhdGNoZXJcclxuICogQGhpZGVjb25zdHJ1Y3RvclxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFN0cmVhbSBleHRlbmRzIEV2ZW50RGlzcGF0Y2hlciB7XHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2NcclxuICBjb25zdHJ1Y3RvcihzdHJlYW0sIHNvdXJjZUluZm8sIGF0dHJpYnV0ZXMpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICBpZiAoKHN0cmVhbSAmJiAhKHN0cmVhbSBpbnN0YW5jZW9mIE1lZGlhU3RyZWFtKSkgfHwgKHR5cGVvZiBzb3VyY2VJbmZvICE9PVxyXG4gICAgICAgICdvYmplY3QnKSkge1xyXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIHN0cmVhbSBvciBzb3VyY2VJbmZvLicpO1xyXG4gICAgfVxyXG4gICAgaWYgKHN0cmVhbSAmJiAoKHN0cmVhbS5nZXRBdWRpb1RyYWNrcygpLmxlbmd0aCA+IDAgJiYgIXNvdXJjZUluZm8uYXVkaW8pIHx8XHJcbiAgICAgICAgc3RyZWFtLmdldFZpZGVvVHJhY2tzKCkubGVuZ3RoID4gMCAmJiAhc291cmNlSW5mby52aWRlbykpIHtcclxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignTWlzc2luZyBhdWRpbyBzb3VyY2UgaW5mbyBvciB2aWRlbyBzb3VyY2UgaW5mby4nKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQG1lbWJlciB7P01lZGlhU3RyZWFtfSBtZWRpYVN0cmVhbVxyXG4gICAgICogQGluc3RhbmNlXHJcbiAgICAgKiBAbWVtYmVyb2YgT3d0LkJhc2UuU3RyZWFtXHJcbiAgICAgKiBAc2VlIHtAbGluayBodHRwczovL3d3dy53My5vcmcvVFIvbWVkaWFjYXB0dXJlLXN0cmVhbXMvI21lZGlhc3RyZWFtfE1lZGlhU3RyZWFtIEFQSSBvZiBNZWRpYSBDYXB0dXJlIGFuZCBTdHJlYW1zfS5cclxuICAgICAqL1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdtZWRpYVN0cmVhbScsIHtcclxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcclxuICAgICAgd3JpdGFibGU6IHRydWUsXHJcbiAgICAgIHZhbHVlOiBzdHJlYW0sXHJcbiAgICB9KTtcclxuICAgIC8qKlxyXG4gICAgICogQG1lbWJlciB7T3d0LkJhc2UuU3RyZWFtU291cmNlSW5mb30gc291cmNlXHJcbiAgICAgKiBAaW5zdGFuY2VcclxuICAgICAqIEBtZW1iZXJvZiBPd3QuQmFzZS5TdHJlYW1cclxuICAgICAqIEBkZXNjIFNvdXJjZSBpbmZvIG9mIGEgc3RyZWFtLlxyXG4gICAgICovXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3NvdXJjZScsIHtcclxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcclxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxyXG4gICAgICB2YWx1ZTogc291cmNlSW5mbyxcclxuICAgIH0pO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAbWVtYmVyIHtvYmplY3R9IGF0dHJpYnV0ZXNcclxuICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICogQG1lbWJlcm9mIE93dC5CYXNlLlN0cmVhbVxyXG4gICAgICogQGRlc2MgQ3VzdG9tIGF0dHJpYnV0ZXMgb2YgYSBzdHJlYW0uXHJcbiAgICAgKi9cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnYXR0cmlidXRlcycsIHtcclxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gICAgICB3cml0YWJsZTogZmFsc2UsXHJcbiAgICAgIHZhbHVlOiBhdHRyaWJ1dGVzLFxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbi8qKlxyXG4gKiBAY2xhc3MgTG9jYWxTdHJlYW1cclxuICogQGNsYXNzRGVzYyBTdHJlYW0gY2FwdHVyZWQgZnJvbSBjdXJyZW50IGVuZHBvaW50LlxyXG4gKiBAbWVtYmVyT2YgT3d0LkJhc2VcclxuICogQGV4dGVuZHMgT3d0LkJhc2UuU3RyZWFtXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKiBAcGFyYW0ge01lZGlhU3RyZWFtfSBzdHJlYW0gVW5kZXJseWluZyBNZWRpYVN0cmVhbS5cclxuICogQHBhcmFtIHtPd3QuQmFzZS5TdHJlYW1Tb3VyY2VJbmZvfSBzb3VyY2VJbmZvIEluZm9ybWF0aW9uIGFib3V0IHN0cmVhbSdzIHNvdXJjZS5cclxuICogQHBhcmFtIHtvYmplY3R9IGF0dHJpYnV0ZXMgQ3VzdG9tIGF0dHJpYnV0ZXMgb2YgdGhlIHN0cmVhbS5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBMb2NhbFN0cmVhbSBleHRlbmRzIFN0cmVhbSB7XHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2NcclxuICBjb25zdHJ1Y3RvcihzdHJlYW0sIHNvdXJjZUluZm8sIGF0dHJpYnV0ZXMpIHtcclxuICAgIGlmICghKHN0cmVhbSBpbnN0YW5jZW9mIE1lZGlhU3RyZWFtKSkge1xyXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIHN0cmVhbS4nKTtcclxuICAgIH1cclxuICAgIHN1cGVyKHN0cmVhbSwgc291cmNlSW5mbywgYXR0cmlidXRlcyk7XHJcbiAgICAvKipcclxuICAgICAqIEBtZW1iZXIge3N0cmluZ30gaWRcclxuICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICogQG1lbWJlcm9mIE93dC5CYXNlLkxvY2FsU3RyZWFtXHJcbiAgICAgKi9cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnaWQnLCB7XHJcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXHJcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcclxuICAgICAgdmFsdWU6IFV0aWxzLmNyZWF0ZVV1aWQoKSxcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4vKipcclxuICogQGNsYXNzIFJlbW90ZVN0cmVhbVxyXG4gKiBAY2xhc3NEZXNjIFN0cmVhbSBzZW50IGZyb20gYSByZW1vdGUgZW5kcG9pbnQuXHJcbiAqIEV2ZW50czpcclxuICpcclxuICogfCBFdmVudCBOYW1lICAgICAgfCBBcmd1bWVudCBUeXBlICAgIHwgRmlyZWQgd2hlbiAgICAgICAgIHxcclxuICogfCAtLS0tLS0tLS0tLS0tLS0tfCAtLS0tLS0tLS0tLS0tLS0tIHwgLS0tLS0tLS0tLS0tLS0tLS0tIHxcclxuICogfCBlbmRlZCAgICAgICAgICAgfCBFdmVudCAgICAgICAgICAgIHwgU3RyZWFtIGlzIGVuZGVkLiAgIHxcclxuICogfCB1cGRhdGVkICAgICAgICAgfCBFdmVudCAgICAgICAgICAgIHwgU3RyZWFtIGlzIHVwZGF0ZWQuIHxcclxuICpcclxuICogQG1lbWJlck9mIE93dC5CYXNlXHJcbiAqIEBleHRlbmRzIE93dC5CYXNlLlN0cmVhbVxyXG4gKiBAaGlkZWNvbnN0cnVjdG9yXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUmVtb3RlU3RyZWFtIGV4dGVuZHMgU3RyZWFtIHtcclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvY1xyXG4gIGNvbnN0cnVjdG9yKGlkLCBvcmlnaW4sIHN0cmVhbSwgc291cmNlSW5mbywgYXR0cmlidXRlcykge1xyXG4gICAgc3VwZXIoc3RyZWFtLCBzb3VyY2VJbmZvLCBhdHRyaWJ1dGVzKTtcclxuICAgIC8qKlxyXG4gICAgICogQG1lbWJlciB7c3RyaW5nfSBpZFxyXG4gICAgICogQGluc3RhbmNlXHJcbiAgICAgKiBAbWVtYmVyb2YgT3d0LkJhc2UuUmVtb3RlU3RyZWFtXHJcbiAgICAgKi9cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnaWQnLCB7XHJcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXHJcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcclxuICAgICAgdmFsdWU6IGlkID8gaWQgOiBVdGlscy5jcmVhdGVVdWlkKCksXHJcbiAgICB9KTtcclxuICAgIC8qKlxyXG4gICAgICogQG1lbWJlciB7c3RyaW5nfSBvcmlnaW5cclxuICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICogQG1lbWJlcm9mIE93dC5CYXNlLlJlbW90ZVN0cmVhbVxyXG4gICAgICogQGRlc2MgSUQgb2YgdGhlIHJlbW90ZSBlbmRwb2ludCB3aG8gcHVibGlzaGVkIHRoaXMgc3RyZWFtLlxyXG4gICAgICovXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ29yaWdpbicsIHtcclxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcclxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxyXG4gICAgICB2YWx1ZTogb3JpZ2luLFxyXG4gICAgfSk7XHJcbiAgICAvKipcclxuICAgICAqIEBtZW1iZXIge093dC5CYXNlLlB1YmxpY2F0aW9uU2V0dGluZ3N9IHNldHRpbmdzXHJcbiAgICAgKiBAaW5zdGFuY2VcclxuICAgICAqIEBtZW1iZXJvZiBPd3QuQmFzZS5SZW1vdGVTdHJlYW1cclxuICAgICAqIEBkZXNjIE9yaWdpbmFsIHNldHRpbmdzIGZvciBwdWJsaXNoaW5nIHRoaXMgc3RyZWFtLiBUaGlzIHByb3BlcnR5IGlzIG9ubHkgdmFsaWQgaW4gY29uZmVyZW5jZSBtb2RlLlxyXG4gICAgICovXHJcbiAgICB0aGlzLnNldHRpbmdzID0gdW5kZWZpbmVkO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAbWVtYmVyIHtPd3QuQ29uZmVyZW5jZS5TdWJzY3JpcHRpb25DYXBhYmlsaXRpZXN9IGV4dHJhQ2FwYWJpbGl0aWVzXHJcbiAgICAgKiBAaW5zdGFuY2VcclxuICAgICAqIEBtZW1iZXJvZiBPd3QuQmFzZS5SZW1vdGVTdHJlYW1cclxuICAgICAqIEBkZXNjIEV4dHJhIGNhcGFiaWxpdGllcyByZW1vdGUgZW5kcG9pbnQgcHJvdmlkZXMgZm9yIHN1YnNjcmlwdGlvbi4gRXh0cmEgY2FwYWJpbGl0aWVzIGRvbid0IGluY2x1ZGUgb3JpZ2luYWwgc2V0dGluZ3MuIFRoaXMgcHJvcGVydHkgaXMgb25seSB2YWxpZCBpbiBjb25mZXJlbmNlIG1vZGUuXHJcbiAgICAgKi9cclxuICAgIHRoaXMuZXh0cmFDYXBhYmlsaXRpZXMgPSB1bmRlZmluZWQ7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogQGNsYXNzIFN0cmVhbUV2ZW50XHJcbiAqIEBjbGFzc0Rlc2MgRXZlbnQgZm9yIFN0cmVhbS5cclxuICogQGV4dGVuZHMgT3d0LkJhc2UuT3d0RXZlbnRcclxuICogQG1lbWJlcm9mIE93dC5CYXNlXHJcbiAqIEBoaWRlY29uc3RydWN0b3JcclxuICovXHJcbmV4cG9ydCBjbGFzcyBTdHJlYW1FdmVudCBleHRlbmRzIE93dEV2ZW50IHtcclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvY1xyXG4gIGNvbnN0cnVjdG9yKHR5cGUsIGluaXQpIHtcclxuICAgIHN1cGVyKHR5cGUpO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAbWVtYmVyIHtPd3QuQmFzZS5TdHJlYW19IHN0cmVhbVxyXG4gICAgICogQGluc3RhbmNlXHJcbiAgICAgKiBAbWVtYmVyb2YgT3d0LkJhc2UuU3RyZWFtRXZlbnRcclxuICAgICAqL1xyXG4gICAgdGhpcy5zdHJlYW0gPSBpbml0LnN0cmVhbTtcclxuICB9XHJcbn1cclxuIiwiLy8gQ29weXJpZ2h0IChDKSA8MjAxOD4gSW50ZWwgQ29ycG9yYXRpb25cclxuLy9cclxuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcclxuXHJcbi8qIGdsb2JhbCBuYXZpZ2F0b3IsIHdpbmRvdyAqL1xyXG5cclxuJ3VzZSBzdHJpY3QnO1xyXG5jb25zdCBzZGtWZXJzaW9uID0gJzQuMy4xJztcclxuXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0ZpcmVmb3goKSB7XHJcbiAgcmV0dXJuIHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKCdGaXJlZm94JykgIT09IG51bGw7XHJcbn1cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2NcclxuZXhwb3J0IGZ1bmN0aW9uIGlzQ2hyb21lKCkge1xyXG4gIHJldHVybiB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgnQ2hyb21lJykgIT09IG51bGw7XHJcbn1cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2NcclxuZXhwb3J0IGZ1bmN0aW9uIGlzU2FmYXJpKCkge1xyXG4gIHJldHVybiAvXigoPyFjaHJvbWV8YW5kcm9pZCkuKSpzYWZhcmkvaS50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KTtcclxufVxyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvY1xyXG5leHBvcnQgZnVuY3Rpb24gaXNFZGdlKCkge1xyXG4gIHJldHVybiB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvRWRnZVxcLyhcXGQrKS4oXFxkKykkLykgIT09IG51bGw7XHJcbn1cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2NcclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVV1aWQoKSB7XHJcbiAgcmV0dXJuICd4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eCcucmVwbGFjZSgvW3h5XS9nLCBmdW5jdGlvbihjKSB7XHJcbiAgICBjb25zdCByID0gTWF0aC5yYW5kb20oKSAqIDE2IHwgMDtcclxuICAgIGNvbnN0IHYgPSBjID09PSAneCcgPyByIDogKHIgJiAweDMgfCAweDgpO1xyXG4gICAgcmV0dXJuIHYudG9TdHJpbmcoMTYpO1xyXG4gIH0pO1xyXG59XHJcblxyXG4vLyBSZXR1cm5zIHN5c3RlbSBpbmZvcm1hdGlvbi5cclxuLy8gRm9ybWF0OiB7c2RrOnt2ZXJzaW9uOioqLCB0eXBlOioqfSwgcnVudGltZTp7dmVyc2lvbjoqKiwgbmFtZToqKn0sIG9zOnt2ZXJzaW9uOioqLCBuYW1lOioqfX07XHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jXHJcbmV4cG9ydCBmdW5jdGlvbiBzeXNJbmZvKCkge1xyXG4gIGNvbnN0IGluZm8gPSBPYmplY3QuY3JlYXRlKHt9KTtcclxuICBpbmZvLnNkayA9IHtcclxuICAgIHZlcnNpb246IHNka1ZlcnNpb24sXHJcbiAgICB0eXBlOiAnSmF2YVNjcmlwdCcsXHJcbiAgfTtcclxuICAvLyBSdW50aW1lIGluZm8uXHJcbiAgY29uc3QgdXNlckFnZW50ID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcclxuICBjb25zdCBmaXJlZm94UmVnZXggPSAvRmlyZWZveFxcLyhbMC05XFwuXSspLztcclxuICBjb25zdCBjaHJvbWVSZWdleCA9IC9DaHJvbWVcXC8oWzAtOVxcLl0rKS87XHJcbiAgY29uc3QgZWRnZVJlZ2V4ID0gL0VkZ2VcXC8oWzAtOVxcLl0rKS87XHJcbiAgY29uc3Qgc2FmYXJpVmVyc2lvblJlZ2V4ID0gL1ZlcnNpb25cXC8oWzAtOVxcLl0rKSBTYWZhcmkvO1xyXG4gIGxldCByZXN1bHQgPSBjaHJvbWVSZWdleC5leGVjKHVzZXJBZ2VudCk7XHJcbiAgaWYgKHJlc3VsdCkge1xyXG4gICAgaW5mby5ydW50aW1lID0ge1xyXG4gICAgICBuYW1lOiAnQ2hyb21lJyxcclxuICAgICAgdmVyc2lvbjogcmVzdWx0WzFdLFxyXG4gICAgfTtcclxuICB9IGVsc2UgaWYgKHJlc3VsdCA9IGZpcmVmb3hSZWdleC5leGVjKHVzZXJBZ2VudCkpIHtcclxuICAgIGluZm8ucnVudGltZSA9IHtcclxuICAgICAgbmFtZTogJ0ZpcmVmb3gnLFxyXG4gICAgICB2ZXJzaW9uOiByZXN1bHRbMV0sXHJcbiAgICB9O1xyXG4gIH0gZWxzZSBpZiAocmVzdWx0ID0gZWRnZVJlZ2V4LmV4ZWModXNlckFnZW50KSkge1xyXG4gICAgaW5mby5ydW50aW1lID0ge1xyXG4gICAgICBuYW1lOiAnRWRnZScsXHJcbiAgICAgIHZlcnNpb246IHJlc3VsdFsxXSxcclxuICAgIH07XHJcbiAgfSBlbHNlIGlmIChpc1NhZmFyaSgpKSB7XHJcbiAgICByZXN1bHQgPSBzYWZhcmlWZXJzaW9uUmVnZXguZXhlYyh1c2VyQWdlbnQpO1xyXG4gICAgaW5mby5ydW50aW1lID0ge1xyXG4gICAgICBuYW1lOiAnU2FmYXJpJyxcclxuICAgIH07XHJcbiAgICBpbmZvLnJ1bnRpbWUudmVyc2lvbiA9IHJlc3VsdCA/IHJlc3VsdFsxXSA6ICdVbmtub3duJztcclxuICB9IGVsc2Uge1xyXG4gICAgaW5mby5ydW50aW1lID0ge1xyXG4gICAgICBuYW1lOiAnVW5rbm93bicsXHJcbiAgICAgIHZlcnNpb246ICdVbmtub3duJyxcclxuICAgIH07XHJcbiAgfVxyXG4gIC8vIE9TIGluZm8uXHJcbiAgY29uc3Qgd2luZG93c1JlZ2V4ID0gL1dpbmRvd3MgTlQgKFswLTlcXC5dKykvO1xyXG4gIGNvbnN0IG1hY1JlZ2V4ID0gL0ludGVsIE1hYyBPUyBYIChbMC05X1xcLl0rKS87XHJcbiAgY29uc3QgaVBob25lUmVnZXggPSAvaVBob25lIE9TIChbMC05X1xcLl0rKS87XHJcbiAgY29uc3QgbGludXhSZWdleCA9IC9YMTE7IExpbnV4LztcclxuICBjb25zdCBhbmRyb2lkUmVnZXggPSAvQW5kcm9pZCggKFswLTlcXC5dKykpPy87XHJcbiAgY29uc3QgY2hyb21pdW1Pc1JlZ2V4ID0gL0NyT1MvO1xyXG4gIGlmIChyZXN1bHQgPSB3aW5kb3dzUmVnZXguZXhlYyh1c2VyQWdlbnQpKSB7XHJcbiAgICBpbmZvLm9zID0ge1xyXG4gICAgICBuYW1lOiAnV2luZG93cyBOVCcsXHJcbiAgICAgIHZlcnNpb246IHJlc3VsdFsxXSxcclxuICAgIH07XHJcbiAgfSBlbHNlIGlmIChyZXN1bHQgPSBtYWNSZWdleC5leGVjKHVzZXJBZ2VudCkpIHtcclxuICAgIGluZm8ub3MgPSB7XHJcbiAgICAgIG5hbWU6ICdNYWMgT1MgWCcsXHJcbiAgICAgIHZlcnNpb246IHJlc3VsdFsxXS5yZXBsYWNlKC9fL2csICcuJyksXHJcbiAgICB9O1xyXG4gIH0gZWxzZSBpZiAocmVzdWx0ID0gaVBob25lUmVnZXguZXhlYyh1c2VyQWdlbnQpKSB7XHJcbiAgICBpbmZvLm9zID0ge1xyXG4gICAgICBuYW1lOiAnaVBob25lIE9TJyxcclxuICAgICAgdmVyc2lvbjogcmVzdWx0WzFdLnJlcGxhY2UoL18vZywgJy4nKSxcclxuICAgIH07XHJcbiAgfSBlbHNlIGlmIChyZXN1bHQgPSBsaW51eFJlZ2V4LmV4ZWModXNlckFnZW50KSkge1xyXG4gICAgaW5mby5vcyA9IHtcclxuICAgICAgbmFtZTogJ0xpbnV4JyxcclxuICAgICAgdmVyc2lvbjogJ1Vua25vd24nLFxyXG4gICAgfTtcclxuICB9IGVsc2UgaWYgKHJlc3VsdCA9IGFuZHJvaWRSZWdleC5leGVjKHVzZXJBZ2VudCkpIHtcclxuICAgIGluZm8ub3MgPSB7XHJcbiAgICAgIG5hbWU6ICdBbmRyb2lkJyxcclxuICAgICAgdmVyc2lvbjogcmVzdWx0WzFdIHx8ICdVbmtub3duJyxcclxuICAgIH07XHJcbiAgfSBlbHNlIGlmIChyZXN1bHQgPSBjaHJvbWl1bU9zUmVnZXguZXhlYyh1c2VyQWdlbnQpKSB7XHJcbiAgICBpbmZvLm9zID0ge1xyXG4gICAgICBuYW1lOiAnQ2hyb21lIE9TJyxcclxuICAgICAgdmVyc2lvbjogJ1Vua25vd24nLFxyXG4gICAgfTtcclxuICB9IGVsc2Uge1xyXG4gICAgaW5mby5vcyA9IHtcclxuICAgICAgbmFtZTogJ1Vua25vd24nLFxyXG4gICAgICB2ZXJzaW9uOiAnVW5rbm93bicsXHJcbiAgICB9O1xyXG4gIH1cclxuICBpbmZvLmNhcGFiaWxpdGllcyA9IHtcclxuICAgIGNvbnRpbnVhbEljZUdhdGhlcmluZzogZmFsc2UsXHJcbiAgICB1bmlmaWVkUGxhbjogdHJ1ZSxcclxuICAgIHN0cmVhbVJlbW92YWJsZTogaW5mby5ydW50aW1lLm5hbWUgIT09ICdGaXJlZm94JyxcclxuICB9O1xyXG4gIHJldHVybiBpbmZvO1xyXG59XHJcbiIsIi8vIENvcHlyaWdodCAoQykgPDIwMTg+IEludGVsIENvcnBvcmF0aW9uXHJcbi8vXHJcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXHJcblxyXG4vKiBlc2xpbnQtZGlzYWJsZSByZXF1aXJlLWpzZG9jICovXHJcbi8qIGdsb2JhbCBQcm9taXNlICovXHJcblxyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgTG9nZ2VyIGZyb20gJy4uL2Jhc2UvbG9nZ2VyLmpzJztcclxuaW1wb3J0IHtcclxuICBFdmVudERpc3BhdGNoZXIsXHJcbiAgTWVzc2FnZUV2ZW50LFxyXG4gIE93dEV2ZW50LFxyXG4gIEVycm9yRXZlbnQsXHJcbiAgTXV0ZUV2ZW50XHJcbn0gZnJvbSAnLi4vYmFzZS9ldmVudC5qcyc7XHJcbmltcG9ydCB7IFRyYWNrS2luZCB9IGZyb20gJy4uL2Jhc2UvbWVkaWFmb3JtYXQuanMnXHJcbmltcG9ydCB7IFB1YmxpY2F0aW9uIH0gZnJvbSAnLi4vYmFzZS9wdWJsaWNhdGlvbi5qcyc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJy4vc3Vic2NyaXB0aW9uLmpzJ1xyXG5pbXBvcnQgeyBDb25mZXJlbmNlRXJyb3IgfSBmcm9tICcuL2Vycm9yLmpzJ1xyXG5pbXBvcnQgKiBhcyBVdGlscyBmcm9tICcuLi9iYXNlL3V0aWxzLmpzJztcclxuaW1wb3J0ICogYXMgU2RwVXRpbHMgZnJvbSAnLi4vYmFzZS9zZHB1dGlscy5qcyc7XHJcblxyXG4vKipcclxuICogQGNsYXNzIENvbmZlcmVuY2VQZWVyQ29ubmVjdGlvbkNoYW5uZWxcclxuICogQGNsYXNzRGVzYyBBIGNoYW5uZWwgZm9yIGEgY29ubmVjdGlvbiBiZXR3ZWVuIGNsaWVudCBhbmQgY29uZmVyZW5jZSBzZXJ2ZXIuIEN1cnJlbnRseSwgb25seSBvbmUgc3RyZWFtIGNvdWxkIGJlIHRyYW5taXR0ZWQgaW4gYSBjaGFubmVsLlxyXG4gKiBAaGlkZWNvbnN0cnVjdG9yXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29uZmVyZW5jZVBlZXJDb25uZWN0aW9uQ2hhbm5lbCBleHRlbmRzIEV2ZW50RGlzcGF0Y2hlciB7XHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2NcclxuICBjb25zdHJ1Y3Rvcihjb25maWcsIHNpZ25hbGluZykge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZztcclxuICAgIHRoaXMuX29wdGlvbnMgPSBudWxsO1xyXG4gICAgdGhpcy5fdmlkZW9Db2RlY3MgPSB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLl9zaWduYWxpbmcgPSBzaWduYWxpbmc7XHJcbiAgICB0aGlzLl9wYyA9IG51bGw7XHJcbiAgICB0aGlzLl9pbnRlcm5hbElkID0gbnVsbDsgLy8gSXQncyBwdWJsaWNhdGlvbiBJRCBvciBzdWJzY3JpcHRpb24gSUQuXHJcbiAgICB0aGlzLl9wZW5kaW5nQ2FuZGlkYXRlcyA9IFtdO1xyXG4gICAgdGhpcy5fc3Vic2NyaWJlUHJvbWlzZSA9IG51bGw7XHJcbiAgICB0aGlzLl9wdWJsaXNoUHJvbWlzZSA9IG51bGw7XHJcbiAgICB0aGlzLl9zdWJzY3JpYmVkU3RyZWFtID0gbnVsbDtcclxuICAgIHRoaXMuX3B1Ymxpc2hlZFN0cmVhbSA9IG51bGw7XHJcbiAgICB0aGlzLl9wdWJsaWNhdGlvbiA9IG51bGw7XHJcbiAgICB0aGlzLl9zdWJzY3JpcHRpb24gPSBudWxsO1xyXG4gICAgLy8gVGltZXIgZm9yIFBlZXJDb25uZWN0aW9uIGRpc2Nvbm5lY3RlZC4gV2lsbCBzdG9wIGNvbm5lY3Rpb24gYWZ0ZXIgdGltZXIuXHJcbiAgICB0aGlzLl9kaXNjb25uZWN0VGltZXIgPSBudWxsO1xyXG4gICAgdGhpcy5fZW5kZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuX3N0b3BwZWQgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBmdW5jdGlvbiBvbk1lc3NhZ2VcclxuICAgKiBAZGVzYyBSZWNlaXZlZCBhIG1lc3NhZ2UgZnJvbSBjb25mZXJlbmNlIHBvcnRhbC4gRGVmaW5lZCBpbiBjbGllbnQtc2VydmVyIHByb3RvY29sLlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBub3RpZmljYXRpb24gTm90aWZpY2F0aW9uIHR5cGUuXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IG1lc3NhZ2UgTWVzc2FnZSByZWNlaXZlZC5cclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIG9uTWVzc2FnZShub3RpZmljYXRpb24sIG1lc3NhZ2UpIHtcclxuICAgIHN3aXRjaCAobm90aWZpY2F0aW9uKSB7XHJcbiAgICAgIGNhc2UgJ3Byb2dyZXNzJzpcclxuICAgICAgICBpZiAobWVzc2FnZS5zdGF0dXMgPT09ICdzb2FjJykge1xyXG4gICAgICAgICAgdGhpcy5fc2RwSGFuZGxlcihtZXNzYWdlLmRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobWVzc2FnZS5zdGF0dXMgPT09ICdyZWFkeScpIHtcclxuICAgICAgICAgIHRoaXMuX3JlYWR5SGFuZGxlcigpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobWVzc2FnZS5zdGF0dXMgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgIHRoaXMuX2Vycm9ySGFuZGxlcihtZXNzYWdlLmRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnc3RyZWFtJzpcclxuICAgICAgICB0aGlzLl9vblN0cmVhbUV2ZW50KG1lc3NhZ2UpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIExvZ2dlci53YXJuaW5nKCdVbmtub3duIG5vdGlmaWNhdGlvbiBmcm9tIE1DVS4nKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1Ymxpc2goc3RyZWFtLCBvcHRpb25zLCB2aWRlb0NvZGVjcykge1xyXG4gICAgaWYgKG9wdGlvbnMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBvcHRpb25zID0ge2F1ZGlvOiAhIXN0cmVhbS5tZWRpYVN0cmVhbS5nZXRBdWRpb1RyYWNrcygpLmxlbmd0aCwgdmlkZW86ICEhc3RyZWFtXHJcbiAgICAgICAgICAubWVkaWFTdHJlYW0uZ2V0VmlkZW9UcmFja3MoKS5sZW5ndGh9O1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFR5cGVFcnJvcignT3B0aW9ucyBzaG91bGQgYmUgYW4gb2JqZWN0LicpKTtcclxuICAgIH1cclxuICAgIGlmICgodGhpcy5faXNSdHBFbmNvZGluZ1BhcmFtZXRlcnMob3B0aW9ucy5hdWRpbykgJiZcclxuICAgICAgICAgdGhpcy5faXNPd3RFbmNvZGluZ1BhcmFtZXRlcnMob3B0aW9ucy52aWRlbykpIHx8XHJcbiAgICAgICAgKHRoaXMuX2lzT3d0RW5jb2RpbmdQYXJhbWV0ZXJzKG9wdGlvbnMuYXVkaW8pICYmXHJcbiAgICAgICAgIHRoaXMuX2lzUnRwRW5jb2RpbmdQYXJhbWV0ZXJzKG9wdGlvbnMudmlkZW8pKSkge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IENvbmZlcmVuY2VFcnJvcihcclxuICAgICAgICAgICdNaXhpbmcgUlRDUnRwRW5jb2RpbmdQYXJhbWV0ZXJzIGFuZCBBdWRpb0VuY29kaW5nUGFyYW1ldGVycy9WaWRlb0VuY29kaW5nUGFyYW1ldGVycyBpcyBub3QgYWxsb3dlZC4nKSlcclxuICAgIH1cclxuICAgIGlmIChvcHRpb25zLmF1ZGlvID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgb3B0aW9ucy5hdWRpbyA9ICEhc3RyZWFtLm1lZGlhU3RyZWFtLmdldEF1ZGlvVHJhY2tzKCkubGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgaWYgKG9wdGlvbnMudmlkZW8gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBvcHRpb25zLnZpZGVvID0gISFzdHJlYW0ubWVkaWFTdHJlYW0uZ2V0VmlkZW9UcmFja3MoKS5sZW5ndGg7XHJcbiAgICB9XHJcbiAgICBpZiAoKCEhb3B0aW9ucy5hdWRpbyAmJiAhc3RyZWFtLm1lZGlhU3RyZWFtLmdldEF1ZGlvVHJhY2tzKCkubGVuZ3RoKSB8fFxyXG4gICAgICAgICghIW9wdGlvbnMudmlkZW8gJiYgIXN0cmVhbS5tZWRpYVN0cmVhbS5nZXRWaWRlb1RyYWNrcygpLmxlbmd0aCkpIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBDb25mZXJlbmNlRXJyb3IoXHJcbiAgICAgICAgICAnb3B0aW9ucy5hdWRpby92aWRlbyBpcyBpbmNvbnNpc3RlbnQgd2l0aCB0cmFja3MgcHJlc2VudGVkIGluIHRoZSAnICtcclxuICAgICAgICAgICdNZWRpYVN0cmVhbS4nXHJcbiAgICAgICkpO1xyXG4gICAgfVxyXG4gICAgaWYgKChvcHRpb25zLmF1ZGlvID09PSBmYWxzZSB8fCBvcHRpb25zLmF1ZGlvID09PSBudWxsKSAmJlxyXG4gICAgICAob3B0aW9ucy52aWRlbyA9PT0gZmFsc2UgfHwgb3B0aW9ucy52aWRlbyA9PT0gbnVsbCkpIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBDb25mZXJlbmNlRXJyb3IoXHJcbiAgICAgICAgICAnQ2Fubm90IHB1Ymxpc2ggYSBzdHJlYW0gd2l0aG91dCBhdWRpbyBhbmQgdmlkZW8uJykpO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLmF1ZGlvID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkob3B0aW9ucy5hdWRpbykpIHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFR5cGVFcnJvcihcclxuICAgICAgICAgICAgJ29wdGlvbnMuYXVkaW8gc2hvdWxkIGJlIGEgYm9vbGVhbiBvciBhbiBhcnJheS4nKSk7XHJcbiAgICAgIH1cclxuICAgICAgZm9yIChjb25zdCBwYXJhbWV0ZXJzIG9mIG9wdGlvbnMuYXVkaW8pIHtcclxuICAgICAgICBpZiAoIXBhcmFtZXRlcnMuY29kZWMgfHwgdHlwZW9mIHBhcmFtZXRlcnMuY29kZWMubmFtZSAhPT0gJ3N0cmluZycgfHwgKFxyXG4gICAgICAgICAgcGFyYW1ldGVycy5tYXhCaXRyYXRlICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIHBhcmFtZXRlcnMubWF4Qml0cmF0ZVxyXG4gICAgICAgICAgIT09ICdudW1iZXInKSkge1xyXG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoXHJcbiAgICAgICAgICAgICAgJ29wdGlvbnMuYXVkaW8gaGFzIGluY29ycmVjdCBwYXJhbWV0ZXJzLicpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy52aWRlbyA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkob3B0aW9ucy52aWRlbykpIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoXHJcbiAgICAgICAgJ29wdGlvbnMudmlkZW8gc2hvdWxkIGJlIGEgYm9vbGVhbiBvciBhbiBhcnJheS4nKSk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5faXNPd3RFbmNvZGluZ1BhcmFtZXRlcnMob3B0aW9ucy52aWRlbykpIHtcclxuICAgICAgZm9yIChjb25zdCBwYXJhbWV0ZXJzIG9mIG9wdGlvbnMudmlkZW8pIHtcclxuICAgICAgICBpZiAoIXBhcmFtZXRlcnMuY29kZWMgfHwgdHlwZW9mIHBhcmFtZXRlcnMuY29kZWMubmFtZSAhPT0gJ3N0cmluZycgfHxcclxuICAgICAgICAgIChcclxuICAgICAgICAgICAgcGFyYW1ldGVycy5tYXhCaXRyYXRlICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIHBhcmFtZXRlcnNcclxuICAgICAgICAgICAgLm1heEJpdHJhdGUgIT09XHJcbiAgICAgICAgICAgICdudW1iZXInKSB8fCAocGFyYW1ldGVycy5jb2RlYy5wcm9maWxlICE9PSB1bmRlZmluZWQgJiZcclxuICAgICAgICAgICAgdHlwZW9mIHBhcmFtZXRlcnMuY29kZWMucHJvZmlsZSAhPT0gJ3N0cmluZycpKSB7XHJcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFR5cGVFcnJvcihcclxuICAgICAgICAgICAgJ29wdGlvbnMudmlkZW8gaGFzIGluY29ycmVjdCBwYXJhbWV0ZXJzLicpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgY29uc3QgbWVkaWFPcHRpb25zID0ge307XHJcbiAgICB0aGlzLl9jcmVhdGVQZWVyQ29ubmVjdGlvbigpO1xyXG4gICAgaWYgKHN0cmVhbS5tZWRpYVN0cmVhbS5nZXRBdWRpb1RyYWNrcygpLmxlbmd0aCA+IDAgJiYgb3B0aW9ucy5hdWRpbyAhPT1cclxuICAgICAgZmFsc2UgJiYgb3B0aW9ucy5hdWRpbyAhPT0gbnVsbCkge1xyXG4gICAgICBpZiAoc3RyZWFtLm1lZGlhU3RyZWFtLmdldEF1ZGlvVHJhY2tzKCkubGVuZ3RoID4gMSkge1xyXG4gICAgICAgIExvZ2dlci53YXJuaW5nKFxyXG4gICAgICAgICAgICAnUHVibGlzaGluZyBhIHN0cmVhbSB3aXRoIG11bHRpcGxlIGF1ZGlvIHRyYWNrcyBpcyBub3QgZnVsbHknXHJcbiAgICAgICAgICAgICsgJyBzdXBwb3J0ZWQuJ1xyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmF1ZGlvICE9PSAnYm9vbGVhbicgJiYgdHlwZW9mIG9wdGlvbnMuYXVkaW8gIT09XHJcbiAgICAgICAgJ29iamVjdCcpIHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IENvbmZlcmVuY2VFcnJvcihcclxuICAgICAgICAgICAgJ1R5cGUgb2YgYXVkaW8gb3B0aW9ucyBzaG91bGQgYmUgYm9vbGVhbiBvciBhbiBvYmplY3QuJ1xyXG4gICAgICAgICkpO1xyXG4gICAgICB9XHJcbiAgICAgIG1lZGlhT3B0aW9ucy5hdWRpbyA9IHt9O1xyXG4gICAgICBtZWRpYU9wdGlvbnMuYXVkaW8uc291cmNlID0gc3RyZWFtLnNvdXJjZS5hdWRpbztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG1lZGlhT3B0aW9ucy5hdWRpbyA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKHN0cmVhbS5tZWRpYVN0cmVhbS5nZXRWaWRlb1RyYWNrcygpLmxlbmd0aCA+IDAgJiYgb3B0aW9ucy52aWRlbyAhPT1cclxuICAgICAgZmFsc2UgJiYgb3B0aW9ucy52aWRlbyAhPT0gbnVsbCkge1xyXG4gICAgICBpZiAoc3RyZWFtLm1lZGlhU3RyZWFtLmdldFZpZGVvVHJhY2tzKCkubGVuZ3RoID4gMSkge1xyXG4gICAgICAgIExvZ2dlci53YXJuaW5nKFxyXG4gICAgICAgICAgICAnUHVibGlzaGluZyBhIHN0cmVhbSB3aXRoIG11bHRpcGxlIHZpZGVvIHRyYWNrcyBpcyBub3QgZnVsbHkgJ1xyXG4gICAgICAgICAgICArICdzdXBwb3J0ZWQuJ1xyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgbWVkaWFPcHRpb25zLnZpZGVvID0ge307XHJcbiAgICAgIG1lZGlhT3B0aW9ucy52aWRlby5zb3VyY2UgPSBzdHJlYW0uc291cmNlLnZpZGVvO1xyXG4gICAgICBjb25zdCB0cmFja1NldHRpbmdzID0gc3RyZWFtLm1lZGlhU3RyZWFtLmdldFZpZGVvVHJhY2tzKClbMF1cclxuICAgICAgICAgIC5nZXRTZXR0aW5ncygpO1xyXG4gICAgICBtZWRpYU9wdGlvbnMudmlkZW8ucGFyYW1ldGVycyA9IHtcclxuICAgICAgICByZXNvbHV0aW9uOiB7XHJcbiAgICAgICAgICB3aWR0aDogdHJhY2tTZXR0aW5ncy53aWR0aCxcclxuICAgICAgICAgIGhlaWdodDogdHJhY2tTZXR0aW5ncy5oZWlnaHQsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmcmFtZXJhdGU6IHRyYWNrU2V0dGluZ3MuZnJhbWVSYXRlLFxyXG4gICAgICB9O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbWVkaWFPcHRpb25zLnZpZGVvID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9wdWJsaXNoZWRTdHJlYW0gPSBzdHJlYW07XHJcbiAgICB0aGlzLl9zaWduYWxpbmcuc2VuZFNpZ25hbGluZ01lc3NhZ2UoJ3B1Ymxpc2gnLCB7XHJcbiAgICAgIG1lZGlhOiBtZWRpYU9wdGlvbnMsXHJcbiAgICAgIGF0dHJpYnV0ZXM6IHN0cmVhbS5hdHRyaWJ1dGVzLFxyXG4gICAgfSkudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICBjb25zdCBtZXNzYWdlRXZlbnQgPSBuZXcgTWVzc2FnZUV2ZW50KCdpZCcsIHtcclxuICAgICAgICBtZXNzYWdlOiBkYXRhLmlkLFxyXG4gICAgICAgIG9yaWdpbjogdGhpcy5fcmVtb3RlSWQsXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobWVzc2FnZUV2ZW50KTtcclxuICAgICAgdGhpcy5faW50ZXJuYWxJZCA9IGRhdGEuaWQ7XHJcbiAgICAgIGNvbnN0IG9mZmVyT3B0aW9ucyA9IHt9O1xyXG4gICAgICBpZiAodHlwZW9mIHRoaXMuX3BjLmFkZFRyYW5zY2VpdmVyID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgbGV0IHNldFByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICAvLyB8ZGlyZWN0aW9ufCBzZWVtcyBub3Qgd29ya2luZyBvbiBTYWZhcmkuXHJcbiAgICAgICAgaWYgKG1lZGlhT3B0aW9ucy5hdWRpbyAmJiBzdHJlYW0ubWVkaWFTdHJlYW0uZ2V0QXVkaW9UcmFja3MoKS5sZW5ndGggPlxyXG4gICAgICAgICAgMCkge1xyXG4gICAgICAgICAgY29uc3QgdHJhbnNjZWl2ZXJJbml0ID0ge1xyXG4gICAgICAgICAgICBkaXJlY3Rpb246ICdzZW5kb25seSdcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICBpZiAodGhpcy5faXNSdHBFbmNvZGluZ1BhcmFtZXRlcnMob3B0aW9ucy5hdWRpbykpIHtcclxuICAgICAgICAgICAgdHJhbnNjZWl2ZXJJbml0LnNlbmRFbmNvZGluZ3MgPSBvcHRpb25zLmF1ZGlvO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY29uc3QgdHJhbnNjZWl2ZXIgPSB0aGlzLl9wYy5hZGRUcmFuc2NlaXZlcihzdHJlYW0ubWVkaWFTdHJlYW0uZ2V0QXVkaW9UcmFja3MoKVswXSxcclxuICAgICAgICAgICAgdHJhbnNjZWl2ZXJJbml0KTtcclxuXHJcbiAgICAgICAgICBpZiAoVXRpbHMuaXNGaXJlZm94KCkpIHtcclxuICAgICAgICAgICAgLy8gRmlyZWZveCBkb2VzIG5vdCBzdXBwb3J0IGVuY29kaW5ncyBzZXR0aW5nIGluIGFkZFRyYW5zY2VpdmVyLlxyXG4gICAgICAgICAgICBjb25zdCBwYXJhbWV0ZXJzID0gdHJhbnNjZWl2ZXIuc2VuZGVyLmdldFBhcmFtZXRlcnMoKTtcclxuICAgICAgICAgICAgcGFyYW1ldGVycy5lbmNvZGluZ3MgPSB0cmFuc2NlaXZlckluaXQuc2VuZEVuY29kaW5ncztcclxuICAgICAgICAgICAgc2V0UHJvbWlzZSA9IHRyYW5zY2VpdmVyLnNlbmRlci5zZXRQYXJhbWV0ZXJzKHBhcmFtZXRlcnMpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobWVkaWFPcHRpb25zLnZpZGVvICYmIHN0cmVhbS5tZWRpYVN0cmVhbS5nZXRWaWRlb1RyYWNrcygpLmxlbmd0aCA+XHJcbiAgICAgICAgICAwKSB7XHJcbiAgICAgICAgICBjb25zdCB0cmFuc2NlaXZlckluaXQgPSB7XHJcbiAgICAgICAgICAgIGRpcmVjdGlvbjogJ3NlbmRvbmx5J1xyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIGlmICh0aGlzLl9pc1J0cEVuY29kaW5nUGFyYW1ldGVycyhvcHRpb25zLnZpZGVvKSkge1xyXG4gICAgICAgICAgICB0cmFuc2NlaXZlckluaXQuc2VuZEVuY29kaW5ncyA9IG9wdGlvbnMudmlkZW87XHJcbiAgICAgICAgICAgIHRoaXMuX3ZpZGVvQ29kZWNzID0gdmlkZW9Db2RlY3M7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjb25zdCB0cmFuc2NlaXZlciA9IHRoaXMuX3BjLmFkZFRyYW5zY2VpdmVyKHN0cmVhbS5tZWRpYVN0cmVhbS5nZXRWaWRlb1RyYWNrcygpWzBdLFxyXG4gICAgICAgICAgICB0cmFuc2NlaXZlckluaXQpO1xyXG5cclxuICAgICAgICAgIGlmIChVdGlscy5pc0ZpcmVmb3goKSkge1xyXG4gICAgICAgICAgICAvLyBGaXJlZm94IGRvZXMgbm90IHN1cHBvcnQgZW5jb2RpbmdzIHNldHRpbmcgaW4gYWRkVHJhbnNjZWl2ZXIuXHJcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtZXRlcnMgPSB0cmFuc2NlaXZlci5zZW5kZXIuZ2V0UGFyYW1ldGVycygpO1xyXG4gICAgICAgICAgICBwYXJhbWV0ZXJzLmVuY29kaW5ncyA9IHRyYW5zY2VpdmVySW5pdC5zZW5kRW5jb2RpbmdzO1xyXG4gICAgICAgICAgICBzZXRQcm9taXNlID0gc2V0UHJvbWlzZS50aGVuKFxyXG4gICAgICAgICAgICAgICgpID0+IHRyYW5zY2VpdmVyLnNlbmRlci5zZXRQYXJhbWV0ZXJzKHBhcmFtZXRlcnMpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNldFByb21pc2UudGhlbigoKSA9PiBvZmZlck9wdGlvbnMpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChtZWRpYU9wdGlvbnMuYXVkaW8gJiYgc3RyZWFtLm1lZGlhU3RyZWFtLmdldEF1ZGlvVHJhY2tzKCkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgZm9yIChjb25zdCB0cmFjayBvZiBzdHJlYW0ubWVkaWFTdHJlYW0uZ2V0QXVkaW9UcmFja3MoKSlcclxuICAgICAgICAgICAgdGhpcy5fcGMuYWRkVHJhY2sodHJhY2ssIHN0cmVhbS5tZWRpYVN0cmVhbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtZWRpYU9wdGlvbnMudmlkZW8gJiYgc3RyZWFtLm1lZGlhU3RyZWFtLmdldFZpZGVvVHJhY2tzKCkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgZm9yIChjb25zdCB0cmFjayBvZiBzdHJlYW0ubWVkaWFTdHJlYW0uZ2V0VmlkZW9UcmFja3MoKSlcclxuICAgICAgICAgICAgdGhpcy5fcGMuYWRkVHJhY2sodHJhY2ssIHN0cmVhbS5tZWRpYVN0cmVhbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZUF1ZGlvID0gZmFsc2U7XHJcbiAgICAgICAgb2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlVmlkZW8gPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gb2ZmZXJPcHRpb25zO1xyXG4gICAgfSkudGhlbigob2ZmZXJPcHRpb25zKSA9PiB7XHJcbiAgICAgIGxldCBsb2NhbERlc2M7XHJcbiAgICAgIHRoaXMuX3BjLmNyZWF0ZU9mZmVyKG9mZmVyT3B0aW9ucykudGhlbigoZGVzYykgPT4ge1xyXG4gICAgICAgIGlmIChvcHRpb25zKSB7XHJcbiAgICAgICAgICBkZXNjLnNkcCA9IHRoaXMuX3NldFJ0cFJlY2VpdmVyT3B0aW9ucyhkZXNjLnNkcCwgb3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkZXNjO1xyXG4gICAgICB9KS50aGVuKChkZXNjKSA9PiB7XHJcbiAgICAgICAgbG9jYWxEZXNjID0gZGVzYztcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGMuc2V0TG9jYWxEZXNjcmlwdGlvbihkZXNjKTtcclxuICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5fc2lnbmFsaW5nLnNlbmRTaWduYWxpbmdNZXNzYWdlKCdzb2FjJywge1xyXG4gICAgICAgICAgaWQ6IHRoaXNcclxuICAgICAgICAgICAgICAuX2ludGVybmFsSWQsXHJcbiAgICAgICAgICBzaWduYWxpbmc6IGxvY2FsRGVzYyxcclxuICAgICAgICB9KTtcclxuICAgICAgfSkuY2F0Y2goKGUpID0+IHtcclxuICAgICAgICBMb2dnZXIuZXJyb3IoJ0ZhaWxlZCB0byBjcmVhdGUgb2ZmZXIgb3Igc2V0IFNEUC4gTWVzc2FnZTogJ1xyXG4gICAgICAgICAgICArIGUubWVzc2FnZSk7XHJcbiAgICAgICAgdGhpcy5fdW5wdWJsaXNoKCk7XHJcbiAgICAgICAgdGhpcy5fcmVqZWN0UHJvbWlzZShlKTtcclxuICAgICAgICB0aGlzLl9maXJlRW5kZWRFdmVudE9uUHVibGljYXRpb25PclN1YnNjcmlwdGlvbigpO1xyXG4gICAgICB9KTtcclxuICAgIH0pLmNhdGNoKChlKSA9PiB7XHJcbiAgICAgIHRoaXMuX3VucHVibGlzaCgpO1xyXG4gICAgICB0aGlzLl9yZWplY3RQcm9taXNlKGUpO1xyXG4gICAgICB0aGlzLl9maXJlRW5kZWRFdmVudE9uUHVibGljYXRpb25PclN1YnNjcmlwdGlvbigpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICB0aGlzLl9wdWJsaXNoUHJvbWlzZSA9IHtyZXNvbHZlOiByZXNvbHZlLCByZWplY3Q6IHJlamVjdH07XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHN1YnNjcmliZShzdHJlYW0sIG9wdGlvbnMpIHtcclxuICAgIGlmIChvcHRpb25zID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgb3B0aW9ucyA9IHtcclxuICAgICAgICBhdWRpbzogISFzdHJlYW0uc2V0dGluZ3MuYXVkaW8sXHJcbiAgICAgICAgdmlkZW86ICEhc3RyZWFtLnNldHRpbmdzLnZpZGVvLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFR5cGVFcnJvcignT3B0aW9ucyBzaG91bGQgYmUgYW4gb2JqZWN0LicpKTtcclxuICAgIH1cclxuICAgIGlmIChvcHRpb25zLmF1ZGlvID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgb3B0aW9ucy5hdWRpbyA9ICEhc3RyZWFtLnNldHRpbmdzLmF1ZGlvO1xyXG4gICAgfVxyXG4gICAgaWYgKG9wdGlvbnMudmlkZW8gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBvcHRpb25zLnZpZGVvID0gISFzdHJlYW0uc2V0dGluZ3MudmlkZW87XHJcbiAgICB9XHJcbiAgICBpZiAoKG9wdGlvbnMuYXVkaW8gIT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygb3B0aW9ucy5hdWRpbyAhPT0gJ29iamVjdCcgJiZcclxuICAgICAgICB0eXBlb2Ygb3B0aW9ucy5hdWRpbyAhPT0gJ2Jvb2xlYW4nICYmIG9wdGlvbnMuYXVkaW8gIT09IG51bGwpIHx8IChcclxuICAgICAgb3B0aW9ucy52aWRlbyAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBvcHRpb25zLnZpZGVvICE9PSAnb2JqZWN0JyAmJlxyXG4gICAgICAgIHR5cGVvZiBvcHRpb25zLnZpZGVvICE9PSAnYm9vbGVhbicgJiYgb3B0aW9ucy52aWRlbyAhPT0gbnVsbCkpIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgb3B0aW9ucyB0eXBlLicpKTtcclxuICAgIH1cclxuICAgIGlmIChvcHRpb25zLmF1ZGlvICYmICFzdHJlYW0uc2V0dGluZ3MuYXVkaW8gfHwgKG9wdGlvbnMudmlkZW8gJiZcclxuICAgICAgICAhc3RyZWFtLnNldHRpbmdzLnZpZGVvKSkge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IENvbmZlcmVuY2VFcnJvcihcclxuICAgICAgICAgICdvcHRpb25zLmF1ZGlvL3ZpZGVvIGNhbm5vdCBiZSB0cnVlIG9yIGFuIG9iamVjdCBpZiB0aGVyZSBpcyBubyAnXHJcbiAgICAgICAgICArICdhdWRpby92aWRlbyB0cmFjayBpbiByZW1vdGUgc3RyZWFtLidcclxuICAgICAgKSk7XHJcbiAgICB9XHJcbiAgICBpZiAob3B0aW9ucy5hdWRpbyA9PT0gZmFsc2UgJiYgb3B0aW9ucy52aWRlbyA9PT0gZmFsc2UpIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBDb25mZXJlbmNlRXJyb3IoXHJcbiAgICAgICAgICAnQ2Fubm90IHN1YnNjcmliZSBhIHN0cmVhbSB3aXRob3V0IGF1ZGlvIGFuZCB2aWRlby4nKSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcclxuICAgIGNvbnN0IG1lZGlhT3B0aW9ucyA9IHt9O1xyXG4gICAgaWYgKG9wdGlvbnMuYXVkaW8pIHtcclxuICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmF1ZGlvID09PSAnb2JqZWN0JyAmJlxyXG4gICAgICAgICAgQXJyYXkuaXNBcnJheShvcHRpb25zLmF1ZGlvLmNvZGVjcykpIHtcclxuICAgICAgICBpZiAob3B0aW9ucy5hdWRpby5jb2RlY3MubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFR5cGVFcnJvcihcclxuICAgICAgICAgICAgICAnQXVkaW8gY29kZWMgY2Fubm90IGJlIGFuIGVtcHR5IGFycmF5LicpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgbWVkaWFPcHRpb25zLmF1ZGlvID0ge307XHJcbiAgICAgIG1lZGlhT3B0aW9ucy5hdWRpby5mcm9tID0gc3RyZWFtLmlkO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbWVkaWFPcHRpb25zLmF1ZGlvID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAob3B0aW9ucy52aWRlbykge1xyXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbnMudmlkZW8gPT09ICdvYmplY3QnICYmXHJcbiAgICAgICAgICBBcnJheS5pc0FycmF5KG9wdGlvbnMudmlkZW8uY29kZWNzKSkge1xyXG4gICAgICAgIGlmIChvcHRpb25zLnZpZGVvLmNvZGVjcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgVHlwZUVycm9yKFxyXG4gICAgICAgICAgICAgICdWaWRlbyBjb2RlYyBjYW5ub3QgYmUgYW4gZW1wdHkgYXJyYXkuJykpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBtZWRpYU9wdGlvbnMudmlkZW8gPSB7fTtcclxuICAgICAgbWVkaWFPcHRpb25zLnZpZGVvLmZyb20gPSBzdHJlYW0uaWQ7XHJcbiAgICAgIGlmIChvcHRpb25zLnZpZGVvLnJlc29sdXRpb24gfHwgb3B0aW9ucy52aWRlby5mcmFtZVJhdGUgfHwgKG9wdGlvbnMudmlkZW9cclxuICAgICAgICAgIC5iaXRyYXRlTXVsdGlwbGllciAmJiBvcHRpb25zLnZpZGVvLmJpdHJhdGVNdWx0aXBsaWVyICE9PSAxKSB8fFxyXG4gICAgICAgIG9wdGlvbnMudmlkZW8ua2V5RnJhbWVJbnRlcnZhbCkge1xyXG4gICAgICAgIG1lZGlhT3B0aW9ucy52aWRlby5wYXJhbWV0ZXJzID0ge1xyXG4gICAgICAgICAgcmVzb2x1dGlvbjogb3B0aW9ucy52aWRlby5yZXNvbHV0aW9uLFxyXG4gICAgICAgICAgZnJhbWVyYXRlOiBvcHRpb25zLnZpZGVvLmZyYW1lUmF0ZSxcclxuICAgICAgICAgIGJpdHJhdGU6IG9wdGlvbnMudmlkZW8uYml0cmF0ZU11bHRpcGxpZXIgPyAneCdcclxuICAgICAgICAgICAgICArIG9wdGlvbnMudmlkZW8uYml0cmF0ZU11bHRpcGxpZXIudG9TdHJpbmcoKSA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgIGtleUZyYW1lSW50ZXJ2YWw6IG9wdGlvbnMudmlkZW8ua2V5RnJhbWVJbnRlcnZhbFxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG9wdGlvbnMudmlkZW8ucmlkKSB7XHJcbiAgICAgICAgbWVkaWFPcHRpb25zLnZpZGVvLnNpbXVsY2FzdFJpZCA9IG9wdGlvbnMudmlkZW8ucmlkO1xyXG4gICAgICAgIC8vIElnbm9yZSBvdGhlciBzZXR0aW5ncyB3aGVuIFJJRCBzZXQuXHJcbiAgICAgICAgZGVsZXRlIG1lZGlhT3B0aW9ucy52aWRlby5wYXJhbWV0ZXJzO1xyXG4gICAgICAgIG9wdGlvbnMudmlkZW8gPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBtZWRpYU9wdGlvbnMudmlkZW8gPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9zdWJzY3JpYmVkU3RyZWFtID0gc3RyZWFtO1xyXG4gICAgdGhpcy5fc2lnbmFsaW5nLnNlbmRTaWduYWxpbmdNZXNzYWdlKCdzdWJzY3JpYmUnLCB7XHJcbiAgICAgIG1lZGlhOiBtZWRpYU9wdGlvbnMsXHJcbiAgICB9KS50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2VFdmVudCA9IG5ldyBNZXNzYWdlRXZlbnQoJ2lkJywge1xyXG4gICAgICAgIG1lc3NhZ2U6IGRhdGEuaWQsXHJcbiAgICAgICAgb3JpZ2luOiB0aGlzLl9yZW1vdGVJZCxcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChtZXNzYWdlRXZlbnQpO1xyXG4gICAgICB0aGlzLl9pbnRlcm5hbElkID0gZGF0YS5pZDtcclxuICAgICAgdGhpcy5fY3JlYXRlUGVlckNvbm5lY3Rpb24oKTtcclxuICAgICAgY29uc3Qgb2ZmZXJPcHRpb25zID0ge307XHJcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5fcGMuYWRkVHJhbnNjZWl2ZXIgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAvLyB8ZGlyZWN0aW9ufCBzZWVtcyBub3Qgd29ya2luZyBvbiBTYWZhcmkuXHJcbiAgICAgICAgaWYgKG1lZGlhT3B0aW9ucy5hdWRpbykge1xyXG4gICAgICAgICAgdGhpcy5fcGMuYWRkVHJhbnNjZWl2ZXIoJ2F1ZGlvJywge2RpcmVjdGlvbjogJ3JlY3Zvbmx5J30pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobWVkaWFPcHRpb25zLnZpZGVvKSB7XHJcbiAgICAgICAgICB0aGlzLl9wYy5hZGRUcmFuc2NlaXZlcigndmlkZW8nLCB7ZGlyZWN0aW9uOiAncmVjdm9ubHknfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZUF1ZGlvID0gISFvcHRpb25zLmF1ZGlvO1xyXG4gICAgICAgIG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZVZpZGVvID0gISFvcHRpb25zLnZpZGVvO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLl9wYy5jcmVhdGVPZmZlcihvZmZlck9wdGlvbnMpLnRoZW4oKGRlc2MpID0+IHtcclxuICAgICAgICBpZiAob3B0aW9ucykge1xyXG4gICAgICAgICAgZGVzYy5zZHAgPSB0aGlzLl9zZXRSdHBSZWNlaXZlck9wdGlvbnMoZGVzYy5zZHAsIG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9wYy5zZXRMb2NhbERlc2NyaXB0aW9uKGRlc2MpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5fc2lnbmFsaW5nLnNlbmRTaWduYWxpbmdNZXNzYWdlKCdzb2FjJywge1xyXG4gICAgICAgICAgICBpZDogdGhpc1xyXG4gICAgICAgICAgICAgICAgLl9pbnRlcm5hbElkLFxyXG4gICAgICAgICAgICBzaWduYWxpbmc6IGRlc2MsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9LCBmdW5jdGlvbihlcnJvck1lc3NhZ2UpIHtcclxuICAgICAgICAgIExvZ2dlci5lcnJvcignU2V0IGxvY2FsIGRlc2NyaXB0aW9uIGZhaWxlZC4gTWVzc2FnZTogJyArXHJcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGVycm9yTWVzc2FnZSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xyXG4gICAgICAgIExvZ2dlci5lcnJvcignQ3JlYXRlIG9mZmVyIGZhaWxlZC4gRXJyb3IgaW5mbzogJyArIEpTT04uc3RyaW5naWZ5KFxyXG4gICAgICAgICAgICBlcnJvcikpO1xyXG4gICAgICB9KS5jYXRjaCgoZSk9PntcclxuICAgICAgICBMb2dnZXIuZXJyb3IoJ0ZhaWxlZCB0byBjcmVhdGUgb2ZmZXIgb3Igc2V0IFNEUC4gTWVzc2FnZTogJ1xyXG4gICAgICAgICAgICArIGUubWVzc2FnZSk7XHJcbiAgICAgICAgdGhpcy5fdW5zdWJzY3JpYmUoKTtcclxuICAgICAgICB0aGlzLl9yZWplY3RQcm9taXNlKGUpO1xyXG4gICAgICAgIHRoaXMuX2ZpcmVFbmRlZEV2ZW50T25QdWJsaWNhdGlvbk9yU3Vic2NyaXB0aW9uKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSkuY2F0Y2goKGUpID0+IHtcclxuICAgICAgdGhpcy5fdW5zdWJzY3JpYmUoKTtcclxuICAgICAgdGhpcy5fcmVqZWN0UHJvbWlzZShlKTtcclxuICAgICAgdGhpcy5fZmlyZUVuZGVkRXZlbnRPblB1YmxpY2F0aW9uT3JTdWJzY3JpcHRpb24oKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgdGhpcy5fc3Vic2NyaWJlUHJvbWlzZSA9IHtyZXNvbHZlOiByZXNvbHZlLCByZWplY3Q6IHJlamVjdH07XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIF91bnB1Ymxpc2goKSB7XHJcbiAgICBpZiAoIXRoaXMuX3N0b3BwZWQpIHtcclxuICAgICAgdGhpcy5fc3RvcHBlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuX3NpZ25hbGluZy5zZW5kU2lnbmFsaW5nTWVzc2FnZSgndW5wdWJsaXNoJywge2lkOiB0aGlzLl9pbnRlcm5hbElkfSlcclxuICAgICAgICAgIC5jYXRjaCgoZSkgPT4ge1xyXG4gICAgICAgICAgICBMb2dnZXIud2FybmluZygnTUNVIHJldHVybnMgbmVnYXRpdmUgYWNrIGZvciB1bnB1Ymxpc2hpbmcsICcgKyBlKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICBpZiAodGhpcy5fcGMgJiYgdGhpcy5fcGMuc2lnbmFsaW5nU3RhdGUgIT09ICdjbG9zZWQnKSB7XHJcbiAgICAgICAgdGhpcy5fcGMuY2xvc2UoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX3Vuc3Vic2NyaWJlKCkge1xyXG4gICAgaWYgKCF0aGlzLl9zdG9wcGVkKSB7XHJcbiAgICAgIHRoaXMuX3N0b3BwZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLl9zaWduYWxpbmcuc2VuZFNpZ25hbGluZ01lc3NhZ2UoJ3Vuc3Vic2NyaWJlJywge1xyXG4gICAgICAgIGlkOiB0aGlzLl9pbnRlcm5hbElkLFxyXG4gICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKChlKSA9PiB7XHJcbiAgICAgICAgICAgIExvZ2dlci53YXJuaW5nKCdNQ1UgcmV0dXJucyBuZWdhdGl2ZSBhY2sgZm9yIHVuc3Vic2NyaWJpbmcsICcgKyBlKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICBpZiAodGhpcy5fcGMgJiYgdGhpcy5fcGMuc2lnbmFsaW5nU3RhdGUgIT09ICdjbG9zZWQnKSB7XHJcbiAgICAgICAgdGhpcy5fcGMuY2xvc2UoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX211dGVPclVubXV0ZShpc011dGUsIGlzUHViLCB0cmFja0tpbmQpIHtcclxuICAgIGNvbnN0IGV2ZW50TmFtZSA9IGlzUHViID8gJ3N0cmVhbS1jb250cm9sJyA6XHJcbiAgICAgICdzdWJzY3JpcHRpb24tY29udHJvbCc7XHJcbiAgICBjb25zdCBvcGVyYXRpb24gPSBpc011dGUgPyAncGF1c2UnIDogJ3BsYXknO1xyXG4gICAgcmV0dXJuIHRoaXMuX3NpZ25hbGluZy5zZW5kU2lnbmFsaW5nTWVzc2FnZShldmVudE5hbWUsIHtcclxuICAgICAgaWQ6IHRoaXMuX2ludGVybmFsSWQsXHJcbiAgICAgIG9wZXJhdGlvbjogb3BlcmF0aW9uLFxyXG4gICAgICBkYXRhOiB0cmFja0tpbmQsXHJcbiAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgaWYgKCFpc1B1Yikge1xyXG4gICAgICAgIGNvbnN0IG11dGVFdmVudE5hbWUgPSBpc011dGUgPyAnbXV0ZScgOiAndW5tdXRlJztcclxuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24uZGlzcGF0Y2hFdmVudChcclxuICAgICAgICAgICAgbmV3IE11dGVFdmVudChtdXRlRXZlbnROYW1lLCB7a2luZDogdHJhY2tLaW5kfSkpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIF9hcHBseU9wdGlvbnMob3B0aW9ucykge1xyXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0JyB8fCB0eXBlb2Ygb3B0aW9ucy52aWRlbyAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBDb25mZXJlbmNlRXJyb3IoXHJcbiAgICAgICAgICAnT3B0aW9ucyBzaG91bGQgYmUgYW4gb2JqZWN0LicpKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHZpZGVvT3B0aW9ucyA9IHt9O1xyXG4gICAgdmlkZW9PcHRpb25zLnJlc29sdXRpb24gPSBvcHRpb25zLnZpZGVvLnJlc29sdXRpb247XHJcbiAgICB2aWRlb09wdGlvbnMuZnJhbWVyYXRlID0gb3B0aW9ucy52aWRlby5mcmFtZVJhdGU7XHJcbiAgICB2aWRlb09wdGlvbnMuYml0cmF0ZSA9IG9wdGlvbnMudmlkZW8uYml0cmF0ZU11bHRpcGxpZXIgPyAneCcgKyBvcHRpb25zLnZpZGVvXHJcbiAgICAgICAgLmJpdHJhdGVNdWx0aXBsaWVyXHJcbiAgICAgICAgLnRvU3RyaW5nKCkgOiB1bmRlZmluZWQ7XHJcbiAgICB2aWRlb09wdGlvbnMua2V5RnJhbWVJbnRlcnZhbCA9IG9wdGlvbnMudmlkZW8ua2V5RnJhbWVJbnRlcnZhbDtcclxuICAgIHJldHVybiB0aGlzLl9zaWduYWxpbmcuc2VuZFNpZ25hbGluZ01lc3NhZ2UoJ3N1YnNjcmlwdGlvbi1jb250cm9sJywge1xyXG4gICAgICBpZDogdGhpcy5faW50ZXJuYWxJZCxcclxuICAgICAgb3BlcmF0aW9uOiAndXBkYXRlJyxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIHZpZGVvOiB7cGFyYW1ldGVyczogdmlkZW9PcHRpb25zfSxcclxuICAgICAgfSxcclxuICAgIH0pLnRoZW4oKTtcclxuICB9XHJcblxyXG4gIF9vblJlbW90ZVN0cmVhbUFkZGVkKGV2ZW50KSB7XHJcbiAgICBMb2dnZXIuZGVidWcoJ1JlbW90ZSBzdHJlYW0gYWRkZWQuJyk7XHJcbiAgICBpZiAodGhpcy5fc3Vic2NyaWJlZFN0cmVhbSkge1xyXG4gICAgICB0aGlzLl9zdWJzY3JpYmVkU3RyZWFtLm1lZGlhU3RyZWFtID0gZXZlbnQuc3RyZWFtc1swXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIFRoaXMgaXMgbm90IGV4cGVjdGVkIHBhdGguIEhvd2V2ZXIsIHRoaXMgaXMgZ29pbmcgdG8gaGFwcGVuIG9uIFNhZmFyaVxyXG4gICAgICAvLyBiZWNhdXNlIGl0IGRvZXMgbm90IHN1cHBvcnQgc2V0dGluZyBkaXJlY3Rpb24gb2YgdHJhbnNjZWl2ZXIuXHJcbiAgICAgIExvZ2dlci53YXJuaW5nKCdSZWNlaXZlZCByZW1vdGUgc3RyZWFtIHdpdGhvdXQgc3Vic2NyaXB0aW9uLicpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX29uTG9jYWxJY2VDYW5kaWRhdGUoZXZlbnQpIHtcclxuICAgIGlmIChldmVudC5jYW5kaWRhdGUpIHtcclxuICAgICAgaWYgKHRoaXMuX3BjLnNpZ25hbGluZ1N0YXRlICE9PSAnc3RhYmxlJykge1xyXG4gICAgICAgIHRoaXMuX3BlbmRpbmdDYW5kaWRhdGVzLnB1c2goZXZlbnQuY2FuZGlkYXRlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLl9zZW5kQ2FuZGlkYXRlKGV2ZW50LmNhbmRpZGF0ZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIExvZ2dlci5kZWJ1ZygnRW1wdHkgY2FuZGlkYXRlLicpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX2ZpcmVFbmRlZEV2ZW50T25QdWJsaWNhdGlvbk9yU3Vic2NyaXB0aW9uKCkge1xyXG4gICAgaWYgKHRoaXMuX2VuZGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuX2VuZGVkID0gdHJ1ZTtcclxuICAgIGNvbnN0IGV2ZW50ID0gbmV3IE93dEV2ZW50KCdlbmRlZCcpO1xyXG4gICAgaWYgKHRoaXMuX3B1YmxpY2F0aW9uKSB7XHJcbiAgICAgIHRoaXMuX3B1YmxpY2F0aW9uLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG4gICAgICB0aGlzLl9wdWJsaWNhdGlvbi5zdG9wKCk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3N1YnNjcmlwdGlvbikge1xyXG4gICAgICB0aGlzLl9zdWJzY3JpcHRpb24uZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbiAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi5zdG9wKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfcmVqZWN0UHJvbWlzZShlcnJvcikge1xyXG4gICAgaWYgKCFlcnJvcikge1xyXG4gICAgICBjb25zdCBlcnJvciA9IG5ldyBDb25mZXJlbmNlRXJyb3IoJ0Nvbm5lY3Rpb24gZmFpbGVkIG9yIGNsb3NlZC4nKTtcclxuICAgIH1cclxuICAgIC8vIFJlamVjdGluZyBjb3JyZXNwb25kaW5nIHByb21pc2UgaWYgcHVibGlzaGluZyBhbmQgc3Vic2NyaWJpbmcgaXMgb25nb2luZy5cclxuICAgIGlmICh0aGlzLl9wdWJsaXNoUHJvbWlzZSkge1xyXG4gICAgICB0aGlzLl9wdWJsaXNoUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xyXG4gICAgICB0aGlzLl9wdWJsaXNoUHJvbWlzZSA9IHVuZGVmaW5lZDtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5fc3Vic2NyaWJlUHJvbWlzZSkge1xyXG4gICAgICB0aGlzLl9zdWJzY3JpYmVQcm9taXNlLnJlamVjdChlcnJvcik7XHJcbiAgICAgIHRoaXMuX3N1YnNjcmliZVByb21pc2UgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfb25JY2VDb25uZWN0aW9uU3RhdGVDaGFuZ2UoZXZlbnQpIHtcclxuICAgIGlmICghZXZlbnQgfHwgIWV2ZW50LmN1cnJlbnRUYXJnZXQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIExvZ2dlci5kZWJ1ZygnSUNFIGNvbm5lY3Rpb24gc3RhdGUgY2hhbmdlZCB0byAnICtcclxuICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0LmljZUNvbm5lY3Rpb25TdGF0ZSk7XHJcbiAgICBpZiAoZXZlbnQuY3VycmVudFRhcmdldC5pY2VDb25uZWN0aW9uU3RhdGUgPT09ICdjbG9zZWQnIHx8XHJcbiAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5pY2VDb25uZWN0aW9uU3RhdGUgPT09ICdmYWlsZWQnKSB7XHJcbiAgICAgIGlmIChldmVudC5jdXJyZW50VGFyZ2V0LmljZUNvbm5lY3Rpb25TdGF0ZSA9PT0gJ2ZhaWxlZCcpIHtcclxuICAgICAgICB0aGlzLl9oYW5kbGVFcnJvcignY29ubmVjdGlvbiBmYWlsZWQuJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gRmlyZSBlbmRlZCBldmVudCBpZiBwdWJsaWNhdGlvbiBvciBzdWJzY3JpcHRpb24gZXhpc3RzLlxyXG4gICAgICAgIHRoaXMuX2ZpcmVFbmRlZEV2ZW50T25QdWJsaWNhdGlvbk9yU3Vic2NyaXB0aW9uKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIF9vbkNvbm5lY3Rpb25TdGF0ZUNoYW5nZShldmVudCkge1xyXG4gICAgaWYgKHRoaXMuX3BjLmNvbm5lY3Rpb25TdGF0ZSA9PT0gJ2Nsb3NlZCcgfHxcclxuICAgICAgICB0aGlzLl9wYy5jb25uZWN0aW9uU3RhdGUgPT09ICdmYWlsZWQnKSB7XHJcbiAgICAgIGlmICh0aGlzLl9wYy5jb25uZWN0aW9uU3RhdGUgPT09ICdmYWlsZWQnKSB7XHJcbiAgICAgICAgdGhpcy5faGFuZGxlRXJyb3IoJ2Nvbm5lY3Rpb24gZmFpbGVkLicpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIEZpcmUgZW5kZWQgZXZlbnQgaWYgcHVibGljYXRpb24gb3Igc3Vic2NyaXB0aW9uIGV4aXN0cy5cclxuICAgICAgICB0aGlzLl9maXJlRW5kZWRFdmVudE9uUHVibGljYXRpb25PclN1YnNjcmlwdGlvbigpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfc2VuZENhbmRpZGF0ZShjYW5kaWRhdGUpIHtcclxuICAgIHRoaXMuX3NpZ25hbGluZy5zZW5kU2lnbmFsaW5nTWVzc2FnZSgnc29hYycsIHtcclxuICAgICAgaWQ6IHRoaXMuX2ludGVybmFsSWQsXHJcbiAgICAgIHNpZ25hbGluZzoge1xyXG4gICAgICAgIHR5cGU6ICdjYW5kaWRhdGUnLFxyXG4gICAgICAgIGNhbmRpZGF0ZToge1xyXG4gICAgICAgICAgY2FuZGlkYXRlOiAnYT0nICsgY2FuZGlkYXRlLmNhbmRpZGF0ZSxcclxuICAgICAgICAgIHNkcE1pZDogY2FuZGlkYXRlLnNkcE1pZCxcclxuICAgICAgICAgIHNkcE1MaW5lSW5kZXg6IGNhbmRpZGF0ZS5zZHBNTGluZUluZGV4LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIF9jcmVhdGVQZWVyQ29ubmVjdGlvbigpIHtcclxuICAgIGNvbnN0IHBjQ29uZmlndXJhdGlvbiA9IHRoaXMuX2NvbmZpZy5ydGNDb25maWd1cmF0aW9uIHx8IHt9O1xyXG4gICAgaWYgKFV0aWxzLmlzQ2hyb21lKCkpIHtcclxuICAgICAgcGNDb25maWd1cmF0aW9uLnNkcFNlbWFudGljcyA9ICd1bmlmaWVkLXBsYW4nO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fcGMgPSBuZXcgUlRDUGVlckNvbm5lY3Rpb24ocGNDb25maWd1cmF0aW9uKTtcclxuICAgIHRoaXMuX3BjLm9uaWNlY2FuZGlkYXRlID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgIHRoaXMuX29uTG9jYWxJY2VDYW5kaWRhdGUuYXBwbHkodGhpcywgW2V2ZW50XSk7XHJcbiAgICB9O1xyXG4gICAgdGhpcy5fcGMub250cmFjayA9IChldmVudCkgPT4ge1xyXG4gICAgICB0aGlzLl9vblJlbW90ZVN0cmVhbUFkZGVkLmFwcGx5KHRoaXMsIFtldmVudF0pO1xyXG4gICAgfTtcclxuICAgIHRoaXMuX3BjLm9uaWNlY29ubmVjdGlvbnN0YXRlY2hhbmdlID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgIHRoaXMuX29uSWNlQ29ubmVjdGlvblN0YXRlQ2hhbmdlLmFwcGx5KHRoaXMsIFtldmVudF0pO1xyXG4gICAgfTtcclxuICAgIHRoaXMuX3BjLm9uY29ubmVjdGlvbnN0YXRlY2hhbmdlID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgIHRoaXMuX29uQ29ubmVjdGlvblN0YXRlQ2hhbmdlLmFwcGx5KHRoaXMsIFtldmVudF0pO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIF9nZXRTdGF0cygpIHtcclxuICAgIGlmICh0aGlzLl9wYykge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcGMuZ2V0U3RhdHMoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgQ29uZmVyZW5jZUVycm9yKFxyXG4gICAgICAgICAgJ1BlZXJDb25uZWN0aW9uIGlzIG5vdCBhdmFpbGFibGUuJykpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX3JlYWR5SGFuZGxlcigpIHtcclxuICAgIGlmICh0aGlzLl9zdWJzY3JpYmVQcm9taXNlKSB7XHJcbiAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24odGhpcy5faW50ZXJuYWxJZCwgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuX3Vuc3Vic2NyaWJlKCk7XHJcbiAgICAgIH0sICgpID0+IHRoaXMuX2dldFN0YXRzKCksXHJcbiAgICAgICh0cmFja0tpbmQpID0+IHRoaXMuX211dGVPclVubXV0ZSh0cnVlLCBmYWxzZSwgdHJhY2tLaW5kKSxcclxuICAgICAgKHRyYWNrS2luZCkgPT4gdGhpcy5fbXV0ZU9yVW5tdXRlKGZhbHNlLCBmYWxzZSwgdHJhY2tLaW5kKSxcclxuICAgICAgKG9wdGlvbnMpID0+IHRoaXMuX2FwcGx5T3B0aW9ucyhvcHRpb25zKSk7XHJcbiAgICAgIC8vIEZpcmUgc3Vic2NyaXB0aW9uJ3MgZW5kZWQgZXZlbnQgd2hlbiBhc3NvY2lhdGVkIHN0cmVhbSBpcyBlbmRlZC5cclxuICAgICAgdGhpcy5fc3Vic2NyaWJlZFN0cmVhbS5hZGRFdmVudExpc3RlbmVyKCdlbmRlZCcsICgpID0+IHtcclxuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24uZGlzcGF0Y2hFdmVudCgnZW5kZWQnLCBuZXcgT3d0RXZlbnQoJ2VuZGVkJykpO1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5fc3Vic2NyaWJlUHJvbWlzZS5yZXNvbHZlKHRoaXMuX3N1YnNjcmlwdGlvbik7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3B1Ymxpc2hQcm9taXNlKSB7XHJcbiAgICAgIHRoaXMuX3B1YmxpY2F0aW9uID0gbmV3IFB1YmxpY2F0aW9uKHRoaXMuX2ludGVybmFsSWQsICgpID0+IHtcclxuICAgICAgICB0aGlzLl91bnB1Ymxpc2goKTtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgIH0sICgpID0+IHRoaXMuX2dldFN0YXRzKCksXHJcbiAgICAgICh0cmFja0tpbmQpID0+IHRoaXMuX211dGVPclVubXV0ZSh0cnVlLCB0cnVlLCB0cmFja0tpbmQpLFxyXG4gICAgICAodHJhY2tLaW5kKSA9PiB0aGlzLl9tdXRlT3JVbm11dGUoZmFsc2UsIHRydWUsIHRyYWNrS2luZCkpO1xyXG4gICAgICB0aGlzLl9wdWJsaXNoUHJvbWlzZS5yZXNvbHZlKHRoaXMuX3B1YmxpY2F0aW9uKTtcclxuICAgICAgLy8gRG8gbm90IGZpcmUgcHVibGljYXRpb24ncyBlbmRlZCBldmVudCB3aGVuIGFzc29jaWF0ZWQgc3RyZWFtIGlzIGVuZGVkLlxyXG4gICAgICAvLyBJdCBtYXkgc3RpbGwgc2VuZGluZyBzaWxlbmNlIG9yIGJsYWNrIGZyYW1lcy5cclxuICAgICAgLy8gUmVmZXIgdG8gaHR0cHM6Ly93M2MuZ2l0aHViLmlvL3dlYnJ0Yy1wYy8jcnRjcnRwc2VuZGVyLWludGVyZmFjZS5cclxuICAgIH1cclxuICAgIHRoaXMuX3B1Ymxpc2hQcm9taXNlID0gbnVsbDtcclxuICAgIHRoaXMuX3N1YnNjcmliZVByb21pc2UgPSBudWxsO1xyXG4gIH1cclxuXHJcbiAgX3NkcEhhbmRsZXIoc2RwKSB7XHJcbiAgICBpZiAoc2RwLnR5cGUgPT09ICdhbnN3ZXInKSB7XHJcbiAgICAgIGlmICgodGhpcy5fcHVibGljYXRpb24gfHwgdGhpcy5fcHVibGlzaFByb21pc2UpICYmIHRoaXMuX29wdGlvbnMpIHtcclxuICAgICAgICBzZHAuc2RwID0gdGhpcy5fc2V0UnRwU2VuZGVyT3B0aW9ucyhzZHAuc2RwLCB0aGlzLl9vcHRpb25zKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLl9wYy5zZXRSZW1vdGVEZXNjcmlwdGlvbihzZHApLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLl9wZW5kaW5nQ2FuZGlkYXRlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICBmb3IgKGNvbnN0IGNhbmRpZGF0ZSBvZiB0aGlzLl9wZW5kaW5nQ2FuZGlkYXRlcykge1xyXG4gICAgICAgICAgICB0aGlzLl9zZW5kQ2FuZGlkYXRlKGNhbmRpZGF0ZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICBMb2dnZXIuZXJyb3IoJ1NldCByZW1vdGUgZGVzY3JpcHRpb24gZmFpbGVkOiAnICsgZXJyb3IpO1xyXG4gICAgICAgIHRoaXMuX3JlamVjdFByb21pc2UoZXJyb3IpO1xyXG4gICAgICAgIHRoaXMuX2ZpcmVFbmRlZEV2ZW50T25QdWJsaWNhdGlvbk9yU3Vic2NyaXB0aW9uKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX2Vycm9ySGFuZGxlcihlcnJvck1lc3NhZ2UpIHtcclxuICAgIHJldHVybiB0aGlzLl9oYW5kbGVFcnJvcihlcnJvck1lc3NhZ2UpO1xyXG4gIH1cclxuXHJcbiAgX2hhbmRsZUVycm9yKGVycm9yTWVzc2FnZSl7XHJcbiAgICBjb25zdCBlcnJvciA9IG5ldyBDb25mZXJlbmNlRXJyb3IoZXJyb3JNZXNzYWdlKTtcclxuICAgIGNvbnN0IHAgPSB0aGlzLl9wdWJsaXNoUHJvbWlzZSB8fCB0aGlzLl9zdWJzY3JpYmVQcm9taXNlO1xyXG4gICAgaWYgKHApIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlamVjdFByb21pc2UoZXJyb3IpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuX2VuZGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IGRpc3BhdGNoZXIgPSB0aGlzLl9wdWJsaWNhdGlvbiB8fCB0aGlzLl9zdWJzY3JpcHRpb247XHJcbiAgICBpZiAoIWRpc3BhdGNoZXIpIHtcclxuICAgICAgTG9nZ2VyLndhcm5pbmcoJ05laXRoZXIgcHVibGljYXRpb24gbm9yIHN1YnNjcmlwdGlvbiBpcyBhdmFpbGFibGUuJyk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IGVycm9yRXZlbnQgPSBuZXcgRXJyb3JFdmVudCgnZXJyb3InLCB7XHJcbiAgICAgIGVycm9yOiBlcnJvcixcclxuICAgIH0pO1xyXG4gICAgZGlzcGF0Y2hlci5kaXNwYXRjaEV2ZW50KGVycm9yRXZlbnQpO1xyXG4gICAgLy8gRmlyZSBlbmRlZCBldmVudCB3aGVuIGVycm9yIG9jY3VyZWRcclxuICAgIHRoaXMuX2ZpcmVFbmRlZEV2ZW50T25QdWJsaWNhdGlvbk9yU3Vic2NyaXB0aW9uKCk7XHJcbiAgfVxyXG5cclxuICBfc2V0Q29kZWNPcmRlcihzZHAsIG9wdGlvbnMpIHtcclxuICAgIGlmICh0aGlzLl9wdWJsaWNhdGlvbiB8fCB0aGlzLl9wdWJsaXNoUHJvbWlzZSkge1xyXG4gICAgICBpZiAob3B0aW9ucy5hdWRpbykge1xyXG4gICAgICAgIGNvbnN0IGF1ZGlvQ29kZWNOYW1lcyA9IEFycmF5LmZyb20ob3B0aW9ucy5hdWRpbyxcclxuICAgICAgICAgICAgKGVuY29kaW5nUGFyYW1ldGVycykgPT4gZW5jb2RpbmdQYXJhbWV0ZXJzLmNvZGVjLm5hbWUpO1xyXG4gICAgICAgIHNkcCA9IFNkcFV0aWxzLnJlb3JkZXJDb2RlY3Moc2RwLCAnYXVkaW8nLCBhdWRpb0NvZGVjTmFtZXMpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChvcHRpb25zLnZpZGVvKSB7XHJcbiAgICAgICAgY29uc3QgdmlkZW9Db2RlY05hbWVzID0gQXJyYXkuZnJvbShvcHRpb25zLnZpZGVvLFxyXG4gICAgICAgICAgICAoZW5jb2RpbmdQYXJhbWV0ZXJzKSA9PiBlbmNvZGluZ1BhcmFtZXRlcnMuY29kZWMubmFtZSk7XHJcbiAgICAgICAgc2RwID0gU2RwVXRpbHMucmVvcmRlckNvZGVjcyhzZHAsICd2aWRlbycsIHZpZGVvQ29kZWNOYW1lcyk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChvcHRpb25zLmF1ZGlvICYmIG9wdGlvbnMuYXVkaW8uY29kZWNzKSB7XHJcbiAgICAgICAgY29uc3QgYXVkaW9Db2RlY05hbWVzID0gQXJyYXkuZnJvbShvcHRpb25zLmF1ZGlvLmNvZGVjcywgKGNvZGVjKSA9PlxyXG4gICAgICAgICAgY29kZWMubmFtZSk7XHJcbiAgICAgICAgc2RwID0gU2RwVXRpbHMucmVvcmRlckNvZGVjcyhzZHAsICdhdWRpbycsIGF1ZGlvQ29kZWNOYW1lcyk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG9wdGlvbnMudmlkZW8gJiYgb3B0aW9ucy52aWRlby5jb2RlY3MpIHtcclxuICAgICAgICBjb25zdCB2aWRlb0NvZGVjTmFtZXMgPSBBcnJheS5mcm9tKG9wdGlvbnMudmlkZW8uY29kZWNzLCAoY29kZWMpID0+XHJcbiAgICAgICAgICBjb2RlYy5uYW1lKTtcclxuICAgICAgICBzZHAgPSBTZHBVdGlscy5yZW9yZGVyQ29kZWNzKHNkcCwgJ3ZpZGVvJywgdmlkZW9Db2RlY05hbWVzKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHNkcDtcclxuICB9XHJcblxyXG4gIF9zZXRNYXhCaXRyYXRlKHNkcCwgb3B0aW9ucykge1xyXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLmF1ZGlvID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBzZHAgPSBTZHBVdGlscy5zZXRNYXhCaXRyYXRlKHNkcCwgb3B0aW9ucy5hdWRpbyk7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMudmlkZW8gPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIHNkcCA9IFNkcFV0aWxzLnNldE1heEJpdHJhdGUoc2RwLCBvcHRpb25zLnZpZGVvKTtcclxuICAgIH1cclxuICAgIHJldHVybiBzZHA7XHJcbiAgfVxyXG5cclxuICBfc2V0UnRwU2VuZGVyT3B0aW9ucyhzZHAsIG9wdGlvbnMpIHtcclxuICAgIC8vIFNEUCBtdWdsaW5nIGlzIGRlcHJlY2F0ZWQsIG1vdmluZyB0byBgc2V0UGFyYW1ldGVyc2AuXHJcbiAgICBpZiAodGhpcy5faXNSdHBFbmNvZGluZ1BhcmFtZXRlcnMob3B0aW9ucy5hdWRpbykgfHxcclxuICAgICAgICB0aGlzLl9pc1J0cEVuY29kaW5nUGFyYW1ldGVycyhvcHRpb25zLnZpZGVvKSkge1xyXG4gICAgICByZXR1cm4gc2RwO1xyXG4gICAgfVxyXG4gICAgc2RwID0gdGhpcy5fc2V0TWF4Qml0cmF0ZShzZHAsIG9wdGlvbnMpO1xyXG4gICAgcmV0dXJuIHNkcDtcclxuICB9XHJcblxyXG4gIF9zZXRSdHBSZWNlaXZlck9wdGlvbnMoc2RwLCBvcHRpb25zKSB7XHJcbiAgICAvLyBBZGQgbGVnYWN5IHNpbXVsY2FzdCBpbiBTRFAgZm9yIHNhZmFyaS5cclxuICAgIGlmICh0aGlzLl9pc1J0cEVuY29kaW5nUGFyYW1ldGVycyhvcHRpb25zLnZpZGVvKSAmJiBVdGlscy5pc1NhZmFyaSgpKSB7XHJcbiAgICAgIGlmIChvcHRpb25zLnZpZGVvLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICBzZHAgPSBTZHBVdGlscy5hZGRMZWdhY3lTaW11bGNhc3Qoc2RwLCAndmlkZW8nLCBvcHRpb25zLnZpZGVvLmxlbmd0aCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBfdmlkZW9Db2RlY3MgaXMgYSB3b3JrYXJvdW5kIGZvciBzZXR0aW5nIHZpZGVvIGNvZGVjcy4gSXQgd2lsbCBiZSBtb3ZlZCB0byBSVENSdHBTZW5kUGFyYW1ldGVycy5cclxuICAgIGlmICh0aGlzLl9pc1J0cEVuY29kaW5nUGFyYW1ldGVycyhvcHRpb25zLnZpZGVvKSAmJiB0aGlzLl92aWRlb0NvZGVjcykge1xyXG4gICAgICBzZHAgPSBTZHBVdGlscy5yZW9yZGVyQ29kZWNzKHNkcCwgJ3ZpZGVvJywgdGhpcy5fdmlkZW9Db2RlY3MpO1xyXG4gICAgICByZXR1cm4gc2RwO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuX2lzUnRwRW5jb2RpbmdQYXJhbWV0ZXJzKG9wdGlvbnMuYXVkaW8pIHx8XHJcbiAgICAgICAgdGhpcy5faXNSdHBFbmNvZGluZ1BhcmFtZXRlcnMob3B0aW9ucy52aWRlbykpIHtcclxuICAgICAgcmV0dXJuIHNkcDtcclxuICAgIH1cclxuICAgIHNkcCA9IHRoaXMuX3NldENvZGVjT3JkZXIoc2RwLCBvcHRpb25zKTtcclxuICAgIHJldHVybiBzZHA7XHJcbiAgfVxyXG5cclxuICAvLyBIYW5kbGUgc3RyZWFtIGV2ZW50IHNlbnQgZnJvbSBNQ1UuIFNvbWUgc3RyZWFtIGV2ZW50cyBzaG91bGQgYmUgcHVibGljYXRpb25cclxuICAvLyBldmVudCBvciBzdWJzY3JpcHRpb24gZXZlbnQuIEl0IHdpbGwgYmUgaGFuZGxlZCBoZXJlLlxyXG4gIF9vblN0cmVhbUV2ZW50KG1lc3NhZ2UpIHtcclxuICAgIGxldCBldmVudFRhcmdldDtcclxuICAgIGlmICh0aGlzLl9wdWJsaWNhdGlvbiAmJiBtZXNzYWdlLmlkID09PSB0aGlzLl9wdWJsaWNhdGlvbi5pZCkge1xyXG4gICAgICBldmVudFRhcmdldCA9IHRoaXMuX3B1YmxpY2F0aW9uO1xyXG4gICAgfSBlbHNlIGlmIChcclxuICAgICAgdGhpcy5fc3Vic2NyaWJlZFN0cmVhbSAmJiBtZXNzYWdlLmlkID09PSB0aGlzLl9zdWJzY3JpYmVkU3RyZWFtLmlkKSB7XHJcbiAgICAgIGV2ZW50VGFyZ2V0ID0gdGhpcy5fc3Vic2NyaXB0aW9uO1xyXG4gICAgfVxyXG4gICAgaWYgKCFldmVudFRhcmdldCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBsZXQgdHJhY2tLaW5kO1xyXG4gICAgaWYgKG1lc3NhZ2UuZGF0YS5maWVsZCA9PT0gJ2F1ZGlvLnN0YXR1cycpIHtcclxuICAgICAgdHJhY2tLaW5kID0gVHJhY2tLaW5kLkFVRElPO1xyXG4gICAgfSBlbHNlIGlmIChtZXNzYWdlLmRhdGEuZmllbGQgPT09ICd2aWRlby5zdGF0dXMnKSB7XHJcbiAgICAgIHRyYWNrS2luZCA9IFRyYWNrS2luZC5WSURFTztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIExvZ2dlci53YXJuaW5nKCdJbnZhbGlkIGRhdGEgZmllbGQgZm9yIHN0cmVhbSB1cGRhdGUgaW5mby4nKTtcclxuICAgIH1cclxuICAgIGlmIChtZXNzYWdlLmRhdGEudmFsdWUgPT09ICdhY3RpdmUnKSB7XHJcbiAgICAgIGV2ZW50VGFyZ2V0LmRpc3BhdGNoRXZlbnQobmV3IE11dGVFdmVudCgndW5tdXRlJywge2tpbmQ6IHRyYWNrS2luZH0pKTtcclxuICAgIH0gZWxzZSBpZiAobWVzc2FnZS5kYXRhLnZhbHVlID09PSAnaW5hY3RpdmUnKSB7XHJcbiAgICAgIGV2ZW50VGFyZ2V0LmRpc3BhdGNoRXZlbnQobmV3IE11dGVFdmVudCgnbXV0ZScsIHtraW5kOiB0cmFja0tpbmR9KSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBMb2dnZXIud2FybmluZygnSW52YWxpZCBkYXRhIHZhbHVlIGZvciBzdHJlYW0gdXBkYXRlIGluZm8uJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfaXNSdHBFbmNvZGluZ1BhcmFtZXRlcnMob2JqKSB7XHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkob2JqKSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICAvLyBPbmx5IGNoZWNrIHRoZSBmaXJzdCBvbmUuXHJcbiAgICBjb25zdCBwYXJhbSA9IG9ialswXTtcclxuICAgIHJldHVybiBwYXJhbS5jb2RlY1BheWxvYWRUeXBlIHx8IHBhcmFtLmR0eCB8fCBwYXJhbS5hY3RpdmUgfHwgcGFyYW1cclxuICAgICAgLnB0aW1lIHx8IHBhcmFtLm1heEZyYW1lcmF0ZSB8fCBwYXJhbS5zY2FsZVJlc29sdXRpb25Eb3duQnkgfHwgcGFyYW0ucmlkO1xyXG4gIH1cclxuXHJcbiAgX2lzT3d0RW5jb2RpbmdQYXJhbWV0ZXJzKG9iaikge1xyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KG9iaikpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgLy8gT25seSBjaGVjayB0aGUgZmlyc3Qgb25lLlxyXG4gICAgY29uc3QgcGFyYW0gPSBvYmpbMF07XHJcbiAgICByZXR1cm4gISFwYXJhbS5jb2RlYztcclxuICB9XHJcbn1cclxuIiwiLy8gQ29weXJpZ2h0IChDKSA8MjAxOD4gSW50ZWwgQ29ycG9yYXRpb25cclxuLy9cclxuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcclxuXHJcbi8qIGdsb2JhbCBNYXAsIFByb21pc2UgKi9cclxuXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIEV2ZW50TW9kdWxlIGZyb20gJy4uL2Jhc2UvZXZlbnQuanMnO1xyXG5pbXBvcnQge1Npb1NpZ25hbGluZyBhcyBTaWduYWxpbmd9IGZyb20gJy4vc2lnbmFsaW5nLmpzJztcclxuaW1wb3J0IExvZ2dlciBmcm9tICcuLi9iYXNlL2xvZ2dlci5qcyc7XHJcbmltcG9ydCB7QmFzZTY0fSBmcm9tICcuLi9iYXNlL2Jhc2U2NC5qcyc7XHJcbmltcG9ydCB7Q29uZmVyZW5jZUVycm9yfSBmcm9tICcuL2Vycm9yLmpzJztcclxuaW1wb3J0ICogYXMgVXRpbHMgZnJvbSAnLi4vYmFzZS91dGlscy5qcyc7XHJcbmltcG9ydCAqIGFzIFN0cmVhbU1vZHVsZSBmcm9tICcuLi9iYXNlL3N0cmVhbS5qcyc7XHJcbmltcG9ydCB7UGFydGljaXBhbnR9IGZyb20gJy4vcGFydGljaXBhbnQuanMnO1xyXG5pbXBvcnQge0NvbmZlcmVuY2VJbmZvfSBmcm9tICcuL2luZm8uanMnO1xyXG5pbXBvcnQge0NvbmZlcmVuY2VQZWVyQ29ubmVjdGlvbkNoYW5uZWx9IGZyb20gJy4vY2hhbm5lbC5qcyc7XHJcbmltcG9ydCB7XHJcbiAgUmVtb3RlTWl4ZWRTdHJlYW0sXHJcbiAgQWN0aXZlQXVkaW9JbnB1dENoYW5nZUV2ZW50LFxyXG4gIExheW91dENoYW5nZUV2ZW50LFxyXG59IGZyb20gJy4vbWl4ZWRzdHJlYW0uanMnO1xyXG5pbXBvcnQgKiBhcyBTdHJlYW1VdGlsc01vZHVsZSBmcm9tICcuL3N0cmVhbXV0aWxzLmpzJztcclxuXHJcbmNvbnN0IFNpZ25hbGluZ1N0YXRlID0ge1xyXG4gIFJFQURZOiAxLFxyXG4gIENPTk5FQ1RJTkc6IDIsXHJcbiAgQ09OTkVDVEVEOiAzLFxyXG59O1xyXG5cclxuY29uc3QgcHJvdG9jb2xWZXJzaW9uID0gJzEuMSc7XHJcblxyXG4vKiBlc2xpbnQtZGlzYWJsZSB2YWxpZC1qc2RvYyAqL1xyXG4vKipcclxuICogQGNsYXNzIFBhcnRpY2lwYW50RXZlbnRcclxuICogQGNsYXNzRGVzYyBDbGFzcyBQYXJ0aWNpcGFudEV2ZW50IHJlcHJlc2VudHMgYSBwYXJ0aWNpcGFudCBldmVudC5cclxuICAgQGV4dGVuZHMgT3d0LkJhc2UuT3d0RXZlbnRcclxuICogQG1lbWJlcm9mIE93dC5Db25mZXJlbmNlXHJcbiAqIEBoaWRlY29uc3RydWN0b3JcclxuICovXHJcbmNvbnN0IFBhcnRpY2lwYW50RXZlbnQgPSBmdW5jdGlvbih0eXBlLCBpbml0KSB7XHJcbiAgY29uc3QgdGhhdCA9IG5ldyBFdmVudE1vZHVsZS5Pd3RFdmVudCh0eXBlLCBpbml0KTtcclxuICAvKipcclxuICAgKiBAbWVtYmVyIHtPd3QuQ29uZmVyZW5jZS5QYXJ0aWNpcGFudH0gcGFydGljaXBhbnRcclxuICAgKiBAaW5zdGFuY2VcclxuICAgKiBAbWVtYmVyb2YgT3d0LkNvbmZlcmVuY2UuUGFydGljaXBhbnRFdmVudFxyXG4gICAqL1xyXG4gIHRoYXQucGFydGljaXBhbnQgPSBpbml0LnBhcnRpY2lwYW50O1xyXG4gIHJldHVybiB0aGF0O1xyXG59O1xyXG4vKiBlc2xpbnQtZW5hYmxlIHZhbGlkLWpzZG9jICovXHJcblxyXG4vKipcclxuICogQGNsYXNzIENvbmZlcmVuY2VDbGllbnRDb25maWd1cmF0aW9uXHJcbiAqIEBjbGFzc0Rlc2MgQ29uZmlndXJhdGlvbiBmb3IgQ29uZmVyZW5jZUNsaWVudC5cclxuICogQG1lbWJlck9mIE93dC5Db25mZXJlbmNlXHJcbiAqIEBoaWRlY29uc3RydWN0b3JcclxuICovXHJcbmNsYXNzIENvbmZlcmVuY2VDbGllbnRDb25maWd1cmF0aW9uIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAvKipcclxuICAgICAqIEBtZW1iZXIgez9SVENDb25maWd1cmF0aW9ufSBydGNDb25maWd1cmF0aW9uXHJcbiAgICAgKiBAaW5zdGFuY2VcclxuICAgICAqIEBtZW1iZXJvZiBPd3QuQ29uZmVyZW5jZS5Db25mZXJlbmNlQ2xpZW50Q29uZmlndXJhdGlvblxyXG4gICAgICogQGRlc2MgSXQgd2lsbCBiZSB1c2VkIGZvciBjcmVhdGluZyBQZWVyQ29ubmVjdGlvbi5cclxuICAgICAqIEBzZWUge0BsaW5rIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93ZWJydGMvI3J0Y2NvbmZpZ3VyYXRpb24tZGljdGlvbmFyeXxSVENDb25maWd1cmF0aW9uIERpY3Rpb25hcnkgb2YgV2ViUlRDIDEuMH0uXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogLy8gRm9sbG93aW5nIG9iamVjdCBjYW4gYmUgc2V0IHRvIGNvbmZlcmVuY2VDbGllbnRDb25maWd1cmF0aW9uLnJ0Y0NvbmZpZ3VyYXRpb24uXHJcbiAgICAgKiB7XHJcbiAgICAgKiAgIGljZVNlcnZlcnM6IFt7XHJcbiAgICAgKiAgICAgIHVybHM6IFwic3R1bjpleGFtcGxlLmNvbTozNDc4XCJcclxuICAgICAqICAgfSwge1xyXG4gICAgICogICAgIHVybHM6IFtcclxuICAgICAqICAgICAgIFwidHVybjpleGFtcGxlLmNvbTozNDc4P3RyYW5zcG9ydD11ZHBcIixcclxuICAgICAqICAgICAgIFwidHVybjpleGFtcGxlLmNvbTozNDc4P3RyYW5zcG9ydD10Y3BcIlxyXG4gICAgICogICAgIF0sXHJcbiAgICAgKiAgICAgIGNyZWRlbnRpYWw6IFwicGFzc3dvcmRcIixcclxuICAgICAqICAgICAgdXNlcm5hbWU6IFwidXNlcm5hbWVcIlxyXG4gICAgICogICB9XHJcbiAgICAgKiB9XHJcbiAgICAgKi9cclxuICAgIHRoaXMucnRjQ29uZmlndXJhdGlvbiA9IHVuZGVmaW5lZDtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgQ29uZmVyZW5jZUNsaWVudFxyXG4gKiBAY2xhc3NkZXNjIFRoZSBDb25mZXJlbmNlQ2xpZW50IGhhbmRsZXMgUGVlckNvbm5lY3Rpb25zIGJldHdlZW4gY2xpZW50IGFuZCBzZXJ2ZXIuIEZvciBjb25mZXJlbmNlIGNvbnRyb2xsaW5nLCBwbGVhc2UgcmVmZXIgdG8gUkVTVCBBUEkgZ3VpZGUuXHJcbiAqIEV2ZW50czpcclxuICpcclxuICogfCBFdmVudCBOYW1lICAgICAgICAgICAgfCBBcmd1bWVudCBUeXBlICAgICAgICAgICAgICAgICAgICB8IEZpcmVkIHdoZW4gICAgICAgfFxyXG4gKiB8IC0tLS0tLS0tLS0tLS0tLS0tLS0tLSB8IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXwgLS0tLS0tLS0tLS0tLS0tLSB8XHJcbiAqIHwgc3RyZWFtYWRkZWQgICAgICAgICAgIHwgT3d0LkJhc2UuU3RyZWFtRXZlbnQgICAgICAgICAgICAgfCBBIG5ldyBzdHJlYW0gaXMgYXZhaWxhYmxlIGluIHRoZSBjb25mZXJlbmNlLiB8XHJcbiAqIHwgcGFydGljaXBhbnRqb2luZWQgICAgIHwgT3d0LkNvbmZlcmVuY2UuUGFydGljaXBhbnRFdmVudCAgfCBBIG5ldyBwYXJ0aWNpcGFudCBqb2luZWQgdGhlIGNvbmZlcmVuY2UuIHxcclxuICogfCBtZXNzYWdlcmVjZWl2ZWQgICAgICAgfCBPd3QuQmFzZS5NZXNzYWdlRXZlbnQgICAgICAgICAgICB8IEEgbmV3IG1lc3NhZ2UgaXMgcmVjZWl2ZWQuIHxcclxuICogfCBzZXJ2ZXJkaXNjb25uZWN0ZWQgICAgfCBPd3QuQmFzZS5Pd3RFdmVudCAgICAgICAgICAgICAgICB8IERpc2Nvbm5lY3RlZCBmcm9tIGNvbmZlcmVuY2Ugc2VydmVyLiB8XHJcbiAqXHJcbiAqIEBtZW1iZXJvZiBPd3QuQ29uZmVyZW5jZVxyXG4gKiBAZXh0ZW5kcyBPd3QuQmFzZS5FdmVudERpc3BhdGNoZXJcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIEBwYXJhbSB7P093dC5Db25mZXJlbmNlLkNvbmZlcmVuY2VDbGllbnRDb25maWd1cmF0aW9uIH0gY29uZmlnIENvbmZpZ3VyYXRpb24gZm9yIENvbmZlcmVuY2VDbGllbnQuXHJcbiAqIEBwYXJhbSB7P093dC5Db25mZXJlbmNlLlNpb1NpZ25hbGluZyB9IHNpZ25hbGluZ0ltcGwgU2lnbmFsaW5nIGNoYW5uZWwgaW1wbGVtZW50YXRpb24gZm9yIENvbmZlcmVuY2VDbGllbnQuIFNESyB1c2VzIGRlZmF1bHQgc2lnbmFsaW5nIGNoYW5uZWwgaW1wbGVtZW50YXRpb24gaWYgdGhpcyBwYXJhbWV0ZXIgaXMgdW5kZWZpbmVkLiBDdXJyZW50bHksIGEgU29ja2V0LklPIHNpZ25hbGluZyBjaGFubmVsIGltcGxlbWVudGF0aW9uIHdhcyBwcm92aWRlZCBhcyBpY3MuY29uZmVyZW5jZS5TaW9TaWduYWxpbmcuIEhvd2V2ZXIsIGl0IGlzIG5vdCByZWNvbW1lbmRlZCB0byBkaXJlY3RseSBhY2Nlc3Mgc2lnbmFsaW5nIGNoYW5uZWwgb3IgY3VzdG9taXplIHNpZ25hbGluZyBjaGFubmVsIGZvciBDb25mZXJlbmNlQ2xpZW50IGFzIHRoaXMgdGltZS5cclxuICovXHJcbmV4cG9ydCBjb25zdCBDb25mZXJlbmNlQ2xpZW50ID0gZnVuY3Rpb24oY29uZmlnLCBzaWduYWxpbmdJbXBsKSB7XHJcbiAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsIG5ldyBFdmVudE1vZHVsZS5FdmVudERpc3BhdGNoZXIoKSk7XHJcbiAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xyXG4gIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gIGxldCBzaWduYWxpbmdTdGF0ZSA9IFNpZ25hbGluZ1N0YXRlLlJFQURZO1xyXG4gIGNvbnN0IHNpZ25hbGluZyA9IHNpZ25hbGluZ0ltcGwgPyBzaWduYWxpbmdJbXBsIDogKG5ldyBTaWduYWxpbmcoKSk7XHJcbiAgbGV0IG1lO1xyXG4gIGxldCByb29tO1xyXG4gIGNvbnN0IHJlbW90ZVN0cmVhbXMgPSBuZXcgTWFwKCk7IC8vIEtleSBpcyBzdHJlYW0gSUQsIHZhbHVlIGlzIGEgUmVtb3RlU3RyZWFtLlxyXG4gIGNvbnN0IHBhcnRpY2lwYW50cyA9IG5ldyBNYXAoKTsgLy8gS2V5IGlzIHBhcnRpY2lwYW50IElELCB2YWx1ZSBpcyBhIFBhcnRpY2lwYW50IG9iamVjdC5cclxuICBjb25zdCBwdWJsaXNoQ2hhbm5lbHMgPSBuZXcgTWFwKCk7IC8vIEtleSBpcyBNZWRpYVN0cmVhbSdzIElELCB2YWx1ZSBpcyBwYyBjaGFubmVsLlxyXG4gIGNvbnN0IGNoYW5uZWxzID0gbmV3IE1hcCgpOyAvLyBLZXkgaXMgY2hhbm5lbCdzIGludGVybmFsIElELCB2YWx1ZSBpcyBjaGFubmVsLlxyXG5cclxuICAvKipcclxuICAgKiBAZnVuY3Rpb24gb25TaWduYWxpbmdNZXNzYWdlXHJcbiAgICogQGRlc2MgUmVjZWl2ZWQgYSBtZXNzYWdlIGZyb20gY29uZmVyZW5jZSBwb3J0YWwuIERlZmluZWQgaW4gY2xpZW50LXNlcnZlciBwcm90b2NvbC5cclxuICAgKiBAcGFyYW0ge3N0cmluZ30gbm90aWZpY2F0aW9uIE5vdGlmaWNhdGlvbiB0eXBlLlxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIERhdGEgcmVjZWl2ZWQuXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBmdW5jdGlvbiBvblNpZ25hbGluZ01lc3NhZ2Uobm90aWZpY2F0aW9uLCBkYXRhKSB7XHJcbiAgICBpZiAobm90aWZpY2F0aW9uID09PSAnc29hYycgfHwgbm90aWZpY2F0aW9uID09PSAncHJvZ3Jlc3MnKSB7XHJcbiAgICAgIGlmICghY2hhbm5lbHMuaGFzKGRhdGEuaWQpKSB7XHJcbiAgICAgICAgTG9nZ2VyLndhcm5pbmcoJ0Nhbm5vdCBmaW5kIGEgY2hhbm5lbCBmb3IgaW5jb21pbmcgZGF0YS4nKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgY2hhbm5lbHMuZ2V0KGRhdGEuaWQpLm9uTWVzc2FnZShub3RpZmljYXRpb24sIGRhdGEpO1xyXG4gICAgfSBlbHNlIGlmIChub3RpZmljYXRpb24gPT09ICdzdHJlYW0nKSB7XHJcbiAgICAgIGlmIChkYXRhLnN0YXR1cyA9PT0gJ2FkZCcpIHtcclxuICAgICAgICBmaXJlU3RyZWFtQWRkZWQoZGF0YS5kYXRhKTtcclxuICAgICAgfSBlbHNlIGlmIChkYXRhLnN0YXR1cyA9PT0gJ3JlbW92ZScpIHtcclxuICAgICAgICBmaXJlU3RyZWFtUmVtb3ZlZChkYXRhKTtcclxuICAgICAgfSBlbHNlIGlmIChkYXRhLnN0YXR1cyA9PT0gJ3VwZGF0ZScpIHtcclxuICAgICAgICAvLyBCcm9hZGNhc3QgYXVkaW8vdmlkZW8gdXBkYXRlIHN0YXR1cyB0byBjaGFubmVsIHNvIHNwZWNpZmljIGV2ZW50cyBjYW4gYmUgZmlyZWQgb24gcHVibGljYXRpb24gb3Igc3Vic2NyaXB0aW9uLlxyXG4gICAgICAgIGlmIChkYXRhLmRhdGEuZmllbGQgPT09ICdhdWRpby5zdGF0dXMnIHx8IGRhdGEuZGF0YS5maWVsZCA9PT1cclxuICAgICAgICAgICd2aWRlby5zdGF0dXMnKSB7XHJcbiAgICAgICAgICBjaGFubmVscy5mb3JFYWNoKChjKSA9PiB7XHJcbiAgICAgICAgICAgIGMub25NZXNzYWdlKG5vdGlmaWNhdGlvbiwgZGF0YSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRhdGEuZGF0YS5maWVsZCA9PT0gJ2FjdGl2ZUlucHV0Jykge1xyXG4gICAgICAgICAgZmlyZUFjdGl2ZUF1ZGlvSW5wdXRDaGFuZ2UoZGF0YSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhLmRhdGEuZmllbGQgPT09ICd2aWRlby5sYXlvdXQnKSB7XHJcbiAgICAgICAgICBmaXJlTGF5b3V0Q2hhbmdlKGRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YS5kYXRhLmZpZWxkID09PSAnLicpIHtcclxuICAgICAgICAgIHVwZGF0ZVJlbW90ZVN0cmVhbShkYXRhLmRhdGEudmFsdWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBMb2dnZXIud2FybmluZygnVW5rbm93biBzdHJlYW0gZXZlbnQgZnJvbSBNQ1UuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKG5vdGlmaWNhdGlvbiA9PT0gJ3RleHQnKSB7XHJcbiAgICAgIGZpcmVNZXNzYWdlUmVjZWl2ZWQoZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKG5vdGlmaWNhdGlvbiA9PT0gJ3BhcnRpY2lwYW50Jykge1xyXG4gICAgICBmaXJlUGFydGljaXBhbnRFdmVudChkYXRhKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNpZ25hbGluZy5hZGRFdmVudExpc3RlbmVyKCdkYXRhJywgKGV2ZW50KSA9PiB7XHJcbiAgICBvblNpZ25hbGluZ01lc3NhZ2UoZXZlbnQubWVzc2FnZS5ub3RpZmljYXRpb24sIGV2ZW50Lm1lc3NhZ2UuZGF0YSk7XHJcbiAgfSk7XHJcblxyXG4gIHNpZ25hbGluZy5hZGRFdmVudExpc3RlbmVyKCdkaXNjb25uZWN0JywgKCkgPT4ge1xyXG4gICAgY2xlYW4oKTtcclxuICAgIHNpZ25hbGluZ1N0YXRlID0gU2lnbmFsaW5nU3RhdGUuUkVBRFk7XHJcbiAgICBzZWxmLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50TW9kdWxlLk93dEV2ZW50KCdzZXJ2ZXJkaXNjb25uZWN0ZWQnKSk7XHJcbiAgfSk7XHJcblxyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jXHJcbiAgZnVuY3Rpb24gZmlyZVBhcnRpY2lwYW50RXZlbnQoZGF0YSkge1xyXG4gICAgaWYgKGRhdGEuYWN0aW9uID09PSAnam9pbicpIHtcclxuICAgICAgZGF0YSA9IGRhdGEuZGF0YTtcclxuICAgICAgY29uc3QgcGFydGljaXBhbnQgPSBuZXcgUGFydGljaXBhbnQoZGF0YS5pZCwgZGF0YS5yb2xlLCBkYXRhLnVzZXIpO1xyXG4gICAgICBwYXJ0aWNpcGFudHMuc2V0KGRhdGEuaWQsIHBhcnRpY2lwYW50KTtcclxuICAgICAgY29uc3QgZXZlbnQgPSBuZXcgUGFydGljaXBhbnRFdmVudChcclxuICAgICAgICAgICdwYXJ0aWNpcGFudGpvaW5lZCcsIHtwYXJ0aWNpcGFudDogcGFydGljaXBhbnR9KTtcclxuICAgICAgc2VsZi5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuICAgIH0gZWxzZSBpZiAoZGF0YS5hY3Rpb24gPT09ICdsZWF2ZScpIHtcclxuICAgICAgY29uc3QgcGFydGljaXBhbnRJZCA9IGRhdGEuZGF0YTtcclxuICAgICAgaWYgKCFwYXJ0aWNpcGFudHMuaGFzKHBhcnRpY2lwYW50SWQpKSB7XHJcbiAgICAgICAgTG9nZ2VyLndhcm5pbmcoXHJcbiAgICAgICAgICAgICdSZWNlaXZlZCBsZWF2ZSBtZXNzYWdlIGZyb20gTUNVIGZvciBhbiB1bmtub3duIHBhcnRpY2lwYW50LicpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBwYXJ0aWNpcGFudCA9IHBhcnRpY2lwYW50cy5nZXQocGFydGljaXBhbnRJZCk7XHJcbiAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IFBhcnRpY2lwYW50RXZlbnQoXHJcbiAgICAgICAgICAnbGVmdCcsIHtwYXJ0aWNpcGFudDogcGFydGljaXBhbnR9KTtcclxuICAgICAgc2VsZi5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuICAgICAgcGFydGljaXBhbnRzLmRlbGV0ZShwYXJ0aWNpcGFudElkKTtcclxuICAgICAgLy9wYXJ0aWNpcGFudC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudE1vZHVsZS5Pd3RFdmVudCgnbGVmdCcpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jXHJcbiAgZnVuY3Rpb24gZmlyZU1lc3NhZ2VSZWNlaXZlZChkYXRhKSB7XHJcbiAgICBjb25zdCBtZXNzYWdlRXZlbnQgPSBuZXcgRXZlbnRNb2R1bGUuTWVzc2FnZUV2ZW50KCdtZXNzYWdlcmVjZWl2ZWQnLCB7XHJcbiAgICAgIG1lc3NhZ2U6IGRhdGEubWVzc2FnZSxcclxuICAgICAgb3JpZ2luOiBkYXRhLmZyb20sXHJcbiAgICAgIHRvOiBkYXRhLnRvLFxyXG4gICAgfSk7XHJcbiAgICBzZWxmLmRpc3BhdGNoRXZlbnQobWVzc2FnZUV2ZW50KTtcclxuICB9XHJcblxyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jXHJcbiAgZnVuY3Rpb24gZmlyZVN0cmVhbUFkZGVkKGluZm8pIHtcclxuICAgIGNvbnN0IHN0cmVhbSA9IGNyZWF0ZVJlbW90ZVN0cmVhbShpbmZvKTtcclxuICAgIHJlbW90ZVN0cmVhbXMuc2V0KHN0cmVhbS5pZCwgc3RyZWFtKTtcclxuICAgIGNvbnN0IHN0cmVhbUV2ZW50ID0gbmV3IFN0cmVhbU1vZHVsZS5TdHJlYW1FdmVudCgnc3RyZWFtYWRkZWQnLCB7XHJcbiAgICAgIHN0cmVhbTogc3RyZWFtLFxyXG4gICAgfSk7XHJcbiAgICBzZWxmLmRpc3BhdGNoRXZlbnQoc3RyZWFtRXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2NcclxuICBmdW5jdGlvbiBmaXJlU3RyZWFtUmVtb3ZlZChpbmZvKSB7XHJcbiAgICBpZiAoIXJlbW90ZVN0cmVhbXMuaGFzKGluZm8uaWQpKSB7XHJcbiAgICAgIExvZ2dlci53YXJuaW5nKCdDYW5ub3QgZmluZCBzcGVjaWZpYyByZW1vdGUgc3RyZWFtLicpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBzdHJlYW0gPSByZW1vdGVTdHJlYW1zLmdldChpbmZvLmlkKTtcclxuICAgIGNvbnN0IHN0cmVhbUV2ZW50ID0gbmV3IEV2ZW50TW9kdWxlLk93dEV2ZW50KCdlbmRlZCcpO1xyXG4gICAgcmVtb3RlU3RyZWFtcy5kZWxldGUoc3RyZWFtLmlkKTtcclxuICAgIHN0cmVhbS5kaXNwYXRjaEV2ZW50KHN0cmVhbUV2ZW50KTtcclxuICB9XHJcblxyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jXHJcbiAgZnVuY3Rpb24gZmlyZUFjdGl2ZUF1ZGlvSW5wdXRDaGFuZ2UoaW5mbykge1xyXG4gICAgaWYgKCFyZW1vdGVTdHJlYW1zLmhhcyhpbmZvLmlkKSkge1xyXG4gICAgICBMb2dnZXIud2FybmluZygnQ2Fubm90IGZpbmQgc3BlY2lmaWMgcmVtb3RlIHN0cmVhbS4nKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgc3RyZWFtID0gcmVtb3RlU3RyZWFtcy5nZXQoaW5mby5pZCk7XHJcbiAgICBjb25zdCBzdHJlYW1FdmVudCA9IG5ldyBBY3RpdmVBdWRpb0lucHV0Q2hhbmdlRXZlbnQoXHJcbiAgICAgICAgJ2FjdGl2ZWF1ZGlvaW5wdXRjaGFuZ2UnLCB7XHJcbiAgICAgICAgICBhY3RpdmVBdWRpb0lucHV0U3RyZWFtSWQ6IGluZm8uZGF0YS52YWx1ZSxcclxuICAgICAgICB9KTtcclxuICAgIHN0cmVhbS5kaXNwYXRjaEV2ZW50KHN0cmVhbUV2ZW50KTtcclxuICB9XHJcblxyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jXHJcbiAgZnVuY3Rpb24gZmlyZUxheW91dENoYW5nZShpbmZvKSB7XHJcbiAgICBpZiAoIXJlbW90ZVN0cmVhbXMuaGFzKGluZm8uaWQpKSB7XHJcbiAgICAgIExvZ2dlci53YXJuaW5nKCdDYW5ub3QgZmluZCBzcGVjaWZpYyByZW1vdGUgc3RyZWFtLicpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBzdHJlYW0gPSByZW1vdGVTdHJlYW1zLmdldChpbmZvLmlkKTtcclxuICAgIGNvbnN0IHN0cmVhbUV2ZW50ID0gbmV3IExheW91dENoYW5nZUV2ZW50KFxyXG4gICAgICAgICdsYXlvdXRjaGFuZ2UnLCB7XHJcbiAgICAgICAgICBsYXlvdXQ6IGluZm8uZGF0YS52YWx1ZSxcclxuICAgICAgICB9KTtcclxuICAgIHN0cmVhbS5kaXNwYXRjaEV2ZW50KHN0cmVhbUV2ZW50KTtcclxuICB9XHJcblxyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jXHJcbiAgZnVuY3Rpb24gdXBkYXRlUmVtb3RlU3RyZWFtKHN0cmVhbUluZm8pIHtcclxuICAgIGlmICghcmVtb3RlU3RyZWFtcy5oYXMoc3RyZWFtSW5mby5pZCkpIHtcclxuICAgICAgTG9nZ2VyLndhcm5pbmcoJ0Nhbm5vdCBmaW5kIHNwZWNpZmljIHJlbW90ZSBzdHJlYW0uJyk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IHN0cmVhbSA9IHJlbW90ZVN0cmVhbXMuZ2V0KHN0cmVhbUluZm8uaWQpO1xyXG4gICAgc3RyZWFtLnNldHRpbmdzID0gU3RyZWFtVXRpbHNNb2R1bGUuY29udmVydFRvUHVibGljYXRpb25TZXR0aW5ncyhzdHJlYW1JbmZvXHJcbiAgICAgICAgLm1lZGlhKTtcclxuICAgIHN0cmVhbS5leHRyYUNhcGFiaWxpdGllcyA9IFN0cmVhbVV0aWxzTW9kdWxlXHJcbiAgICAgIC5jb252ZXJ0VG9TdWJzY3JpcHRpb25DYXBhYmlsaXRpZXMoXHJcbiAgICAgICAgc3RyZWFtSW5mby5tZWRpYSk7XHJcbiAgICBjb25zdCBzdHJlYW1FdmVudCA9IG5ldyBFdmVudE1vZHVsZS5Pd3RFdmVudCgndXBkYXRlZCcpO1xyXG4gICAgc3RyZWFtLmRpc3BhdGNoRXZlbnQoc3RyZWFtRXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2NcclxuICBmdW5jdGlvbiBjcmVhdGVSZW1vdGVTdHJlYW0oc3RyZWFtSW5mbykge1xyXG4gICAgaWYgKHN0cmVhbUluZm8udHlwZSA9PT0gJ21peGVkJykge1xyXG4gICAgICByZXR1cm4gbmV3IFJlbW90ZU1peGVkU3RyZWFtKHN0cmVhbUluZm8pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IGF1ZGlvU291cmNlSW5mbzsgbGV0IHZpZGVvU291cmNlSW5mbztcclxuICAgICAgaWYgKHN0cmVhbUluZm8ubWVkaWEuYXVkaW8pIHtcclxuICAgICAgICBhdWRpb1NvdXJjZUluZm8gPSBzdHJlYW1JbmZvLm1lZGlhLmF1ZGlvLnNvdXJjZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoc3RyZWFtSW5mby5tZWRpYS52aWRlbykge1xyXG4gICAgICAgIHZpZGVvU291cmNlSW5mbyA9IHN0cmVhbUluZm8ubWVkaWEudmlkZW8uc291cmNlO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHN0cmVhbSA9IG5ldyBTdHJlYW1Nb2R1bGUuUmVtb3RlU3RyZWFtKHN0cmVhbUluZm8uaWQsXHJcbiAgICAgICAgICBzdHJlYW1JbmZvLmluZm8ub3duZXIsIHVuZGVmaW5lZCwgbmV3IFN0cmVhbU1vZHVsZS5TdHJlYW1Tb3VyY2VJbmZvKFxyXG4gICAgICAgICAgICAgIGF1ZGlvU291cmNlSW5mbywgdmlkZW9Tb3VyY2VJbmZvKSwgc3RyZWFtSW5mby5pbmZvLmF0dHJpYnV0ZXMpO1xyXG4gICAgICBzdHJlYW0uc2V0dGluZ3MgPSBTdHJlYW1VdGlsc01vZHVsZS5jb252ZXJ0VG9QdWJsaWNhdGlvblNldHRpbmdzKFxyXG4gICAgICAgICAgc3RyZWFtSW5mby5tZWRpYSk7XHJcbiAgICAgIHN0cmVhbS5leHRyYUNhcGFiaWxpdGllcyA9IFN0cmVhbVV0aWxzTW9kdWxlXHJcbiAgICAgICAgLmNvbnZlcnRUb1N1YnNjcmlwdGlvbkNhcGFiaWxpdGllcyhcclxuICAgICAgICAgIHN0cmVhbUluZm8ubWVkaWEpO1xyXG4gICAgICByZXR1cm4gc3RyZWFtO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2NcclxuICBmdW5jdGlvbiBzZW5kU2lnbmFsaW5nTWVzc2FnZSh0eXBlLCBtZXNzYWdlKSB7XHJcbiAgICByZXR1cm4gc2lnbmFsaW5nLnNlbmQodHlwZSwgbWVzc2FnZSk7XHJcbiAgfVxyXG5cclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvY1xyXG4gIGZ1bmN0aW9uIGNyZWF0ZVBlZXJDb25uZWN0aW9uQ2hhbm5lbCgpIHtcclxuICAgIC8vIENvbnN0cnVjdCBhbiBzaWduYWxpbmcgc2VuZGVyL3JlY2VpdmVyIGZvciBDb25mZXJlbmNlUGVlckNvbm5lY3Rpb24uXHJcbiAgICBjb25zdCBzaWduYWxpbmdGb3JDaGFubmVsID0gT2JqZWN0LmNyZWF0ZShFdmVudE1vZHVsZS5FdmVudERpc3BhdGNoZXIpO1xyXG4gICAgc2lnbmFsaW5nRm9yQ2hhbm5lbC5zZW5kU2lnbmFsaW5nTWVzc2FnZSA9IHNlbmRTaWduYWxpbmdNZXNzYWdlO1xyXG4gICAgY29uc3QgcGNjID0gbmV3IENvbmZlcmVuY2VQZWVyQ29ubmVjdGlvbkNoYW5uZWwoXHJcbiAgICAgICAgY29uZmlnLCBzaWduYWxpbmdGb3JDaGFubmVsKTtcclxuICAgIHBjYy5hZGRFdmVudExpc3RlbmVyKCdpZCcsIChtZXNzYWdlRXZlbnQpID0+IHtcclxuICAgICAgY2hhbm5lbHMuc2V0KG1lc3NhZ2VFdmVudC5tZXNzYWdlLCBwY2MpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcGNjO1xyXG4gIH1cclxuXHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2NcclxuICBmdW5jdGlvbiBjbGVhbigpIHtcclxuICAgIHBhcnRpY2lwYW50cy5jbGVhcigpO1xyXG4gICAgcmVtb3RlU3RyZWFtcy5jbGVhcigpO1xyXG4gIH1cclxuXHJcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdpbmZvJywge1xyXG4gICAgY29uZmlndXJhYmxlOiBmYWxzZSxcclxuICAgIGdldDogKCkgPT4ge1xyXG4gICAgICBpZiAoIXJvb20pIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbmV3IENvbmZlcmVuY2VJbmZvKHJvb20uaWQsIEFycmF5LmZyb20ocGFydGljaXBhbnRzLCAoeCkgPT4geFtcclxuICAgICAgICAgIDFdKSwgQXJyYXkuZnJvbShyZW1vdGVTdHJlYW1zLCAoeCkgPT4geFsxXSksIG1lKTtcclxuICAgIH0sXHJcbiAgfSk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBmdW5jdGlvbiBqb2luXHJcbiAgICogQGluc3RhbmNlXHJcbiAgICogQGRlc2MgSm9pbiBhIGNvbmZlcmVuY2UuXHJcbiAgICogQG1lbWJlcm9mIE93dC5Db25mZXJlbmNlLkNvbmZlcmVuY2VDbGllbnRcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxDb25mZXJlbmNlSW5mbywgRXJyb3I+fSBSZXR1cm4gYSBwcm9taXNlIHJlc29sdmVkIHdpdGggY3VycmVudCBjb25mZXJlbmNlJ3MgaW5mb3JtYXRpb24gaWYgc3VjY2Vzc2Z1bGx5IGpvaW4gdGhlIGNvbmZlcmVuY2UuIE9yIHJldHVybiBhIHByb21pc2UgcmVqZWN0ZWQgd2l0aCBhIG5ld2x5IGNyZWF0ZWQgT3d0LkVycm9yIGlmIGZhaWxlZCB0byBqb2luIHRoZSBjb25mZXJlbmNlLlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0b2tlblN0cmluZyBUb2tlbiBpcyBpc3N1ZWQgYnkgY29uZmVyZW5jZSBzZXJ2ZXIobnV2ZSkuXHJcbiAgICovXHJcbiAgdGhpcy5qb2luID0gZnVuY3Rpb24odG9rZW5TdHJpbmcpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGNvbnN0IHRva2VuID0gSlNPTi5wYXJzZShCYXNlNjQuZGVjb2RlQmFzZTY0KHRva2VuU3RyaW5nKSk7XHJcbiAgICAgIGNvbnN0IGlzU2VjdXJlZCA9ICh0b2tlbi5zZWN1cmUgPT09IHRydWUpO1xyXG4gICAgICBsZXQgaG9zdCA9IHRva2VuLmhvc3Q7XHJcbiAgICAgIGlmICh0eXBlb2YgaG9zdCAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgICByZWplY3QobmV3IENvbmZlcmVuY2VFcnJvcignSW52YWxpZCBob3N0LicpKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGhvc3QuaW5kZXhPZignaHR0cCcpID09PSAtMSkge1xyXG4gICAgICAgIGhvc3QgPSBpc1NlY3VyZWQgPyAoJ2h0dHBzOi8vJyArIGhvc3QpIDogKCdodHRwOi8vJyArIGhvc3QpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChzaWduYWxpbmdTdGF0ZSAhPT0gU2lnbmFsaW5nU3RhdGUuUkVBRFkpIHtcclxuICAgICAgICByZWplY3QobmV3IENvbmZlcmVuY2VFcnJvcignY29ubmVjdGlvbiBzdGF0ZSBpbnZhbGlkJykpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2lnbmFsaW5nU3RhdGUgPSBTaWduYWxpbmdTdGF0ZS5DT05ORUNUSU5HO1xyXG5cclxuICAgICAgY29uc3QgbG9naW5JbmZvID0ge1xyXG4gICAgICAgIHRva2VuOiB0b2tlblN0cmluZyxcclxuICAgICAgICB1c2VyQWdlbnQ6IFV0aWxzLnN5c0luZm8oKSxcclxuICAgICAgICBwcm90b2NvbDogcHJvdG9jb2xWZXJzaW9uLFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgc2lnbmFsaW5nLmNvbm5lY3QoaG9zdCwgaXNTZWN1cmVkLCBsb2dpbkluZm8pLnRoZW4oKHJlc3ApID0+IHtcclxuICAgICAgICBzaWduYWxpbmdTdGF0ZSA9IFNpZ25hbGluZ1N0YXRlLkNPTk5FQ1RFRDtcclxuICAgICAgICByb29tID0gcmVzcC5yb29tO1xyXG4gICAgICAgIGlmIChyb29tLnN0cmVhbXMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgZm9yIChjb25zdCBzdCBvZiByb29tLnN0cmVhbXMpIHtcclxuICAgICAgICAgICAgaWYgKHN0LnR5cGUgPT09ICdtaXhlZCcpIHtcclxuICAgICAgICAgICAgICBzdC52aWV3cG9ydCA9IHN0LmluZm8ubGFiZWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVtb3RlU3RyZWFtcy5zZXQoc3QuaWQsIGNyZWF0ZVJlbW90ZVN0cmVhbShzdCkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocmVzcC5yb29tICYmIHJlc3Aucm9vbS5wYXJ0aWNpcGFudHMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgZm9yIChjb25zdCBwIG9mIHJlc3Aucm9vbS5wYXJ0aWNpcGFudHMpIHtcclxuICAgICAgICAgICAgcGFydGljaXBhbnRzLnNldChwLmlkLCBuZXcgUGFydGljaXBhbnQocC5pZCwgcC5yb2xlLCBwLnVzZXIpKTtcclxuICAgICAgICAgICAgaWYgKHAuaWQgPT09IHJlc3AuaWQpIHtcclxuICAgICAgICAgICAgICBtZSA9IHBhcnRpY2lwYW50cy5nZXQocC5pZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzb2x2ZShuZXcgQ29uZmVyZW5jZUluZm8ocmVzcC5yb29tLmlkLCBBcnJheS5mcm9tKHBhcnRpY2lwYW50c1xyXG4gICAgICAgICAgICAudmFsdWVzKCkpLCBBcnJheS5mcm9tKHJlbW90ZVN0cmVhbXMudmFsdWVzKCkpLCBtZSkpO1xyXG4gICAgICB9LCAoZSkgPT4ge1xyXG4gICAgICAgIHNpZ25hbGluZ1N0YXRlID0gU2lnbmFsaW5nU3RhdGUuUkVBRFk7XHJcbiAgICAgICAgcmVqZWN0KG5ldyBDb25mZXJlbmNlRXJyb3IoZSkpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIEBmdW5jdGlvbiBwdWJsaXNoXHJcbiAgICogQG1lbWJlcm9mIE93dC5Db25mZXJlbmNlLkNvbmZlcmVuY2VDbGllbnRcclxuICAgKiBAaW5zdGFuY2VcclxuICAgKiBAZGVzYyBQdWJsaXNoIGEgTG9jYWxTdHJlYW0gdG8gY29uZmVyZW5jZSBzZXJ2ZXIuIE90aGVyIHBhcnRpY2lwYW50cyB3aWxsIGJlIGFibGUgdG8gc3Vic2NyaWJlIHRoaXMgc3RyZWFtIHdoZW4gaXQgaXMgc3VjY2Vzc2Z1bGx5IHB1Ymxpc2hlZC5cclxuICAgKiBAcGFyYW0ge093dC5CYXNlLkxvY2FsU3RyZWFtfSBzdHJlYW0gVGhlIHN0cmVhbSB0byBiZSBwdWJsaXNoZWQuXHJcbiAgICogQHBhcmFtIHtPd3QuQmFzZS5QdWJsaXNoT3B0aW9uc30gb3B0aW9ucyBPcHRpb25zIGZvciBwdWJsaWNhdGlvbi5cclxuICAgKiBAcGFyYW0ge3N0cmluZ1tdfSB2aWRlb0NvZGVjcyBWaWRlbyBjb2RlYyBuYW1lcyBmb3IgcHVibGlzaGluZy4gVmFsaWQgdmFsdWVzIGFyZSAnVlA4JywgJ1ZQOScgYW5kICdIMjY0Jy4gVGhpcyBwYXJhbWV0ZXIgb25seSB2YWxpZCB3aGVuIG9wdGlvbnMudmlkZW8gaXMgUlRDUnRwRW5jb2RpbmdQYXJhbWV0ZXJzLiBQdWJsaXNoaW5nIHdpdGggUlRDUnRwRW5jb2RpbmdQYXJhbWV0ZXJzIGlzIGFuIGV4cGVyaW1lbnRhbCBmZWF0dXJlLiBUaGlzIHBhcmFtZXRlciBpcyBzdWJqZWN0IHRvIGNoYW5nZS5cclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxQdWJsaWNhdGlvbiwgRXJyb3I+fSBSZXR1cm5lZCBwcm9taXNlIHdpbGwgYmUgcmVzb2x2ZWQgd2l0aCBhIG5ld2x5IGNyZWF0ZWQgUHVibGljYXRpb24gb25jZSBzcGVjaWZpYyBzdHJlYW0gaXMgc3VjY2Vzc2Z1bGx5IHB1Ymxpc2hlZCwgb3IgcmVqZWN0ZWQgd2l0aCBhIG5ld2x5IGNyZWF0ZWQgRXJyb3IgaWYgc3RyZWFtIGlzIGludmFsaWQgb3Igb3B0aW9ucyBjYW5ub3QgYmUgc2F0aXNmaWVkLiBTdWNjZXNzZnVsbHkgcHVibGlzaGVkIG1lYW5zIFBlZXJDb25uZWN0aW9uIGlzIGVzdGFibGlzaGVkIGFuZCBzZXJ2ZXIgaXMgYWJsZSB0byBwcm9jZXNzIG1lZGlhIGRhdGEuXHJcbiAgICovXHJcbiAgdGhpcy5wdWJsaXNoID0gZnVuY3Rpb24oc3RyZWFtLCBvcHRpb25zLCB2aWRlb0NvZGVjcykge1xyXG4gICAgaWYgKCEoc3RyZWFtIGluc3RhbmNlb2YgU3RyZWFtTW9kdWxlLkxvY2FsU3RyZWFtKSkge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IENvbmZlcmVuY2VFcnJvcignSW52YWxpZCBzdHJlYW0uJykpO1xyXG4gICAgfVxyXG4gICAgaWYgKHB1Ymxpc2hDaGFubmVscy5oYXMoc3RyZWFtLm1lZGlhU3RyZWFtLmlkKSkge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IENvbmZlcmVuY2VFcnJvcihcclxuICAgICAgICAgICdDYW5ub3QgcHVibGlzaCBhIHB1Ymxpc2hlZCBzdHJlYW0uJykpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgY2hhbm5lbCA9IGNyZWF0ZVBlZXJDb25uZWN0aW9uQ2hhbm5lbCgpO1xyXG4gICAgcmV0dXJuIGNoYW5uZWwucHVibGlzaChzdHJlYW0sIG9wdGlvbnMsIHZpZGVvQ29kZWNzKTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBAZnVuY3Rpb24gc3Vic2NyaWJlXHJcbiAgICogQG1lbWJlcm9mIE93dC5Db25mZXJlbmNlLkNvbmZlcmVuY2VDbGllbnRcclxuICAgKiBAaW5zdGFuY2VcclxuICAgKiBAZGVzYyBTdWJzY3JpYmUgYSBSZW1vdGVTdHJlYW0gZnJvbSBjb25mZXJlbmNlIHNlcnZlci5cclxuICAgKiBAcGFyYW0ge093dC5CYXNlLlJlbW90ZVN0cmVhbX0gc3RyZWFtIFRoZSBzdHJlYW0gdG8gYmUgc3Vic2NyaWJlZC5cclxuICAgKiBAcGFyYW0ge093dC5Db25mZXJlbmNlLlN1YnNjcmliZU9wdGlvbnN9IG9wdGlvbnMgT3B0aW9ucyBmb3Igc3Vic2NyaXB0aW9uLlxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPFN1YnNjcmlwdGlvbiwgRXJyb3I+fSBSZXR1cm5lZCBwcm9taXNlIHdpbGwgYmUgcmVzb2x2ZWQgd2l0aCBhIG5ld2x5IGNyZWF0ZWQgU3Vic2NyaXB0aW9uIG9uY2Ugc3BlY2lmaWMgc3RyZWFtIGlzIHN1Y2Nlc3NmdWxseSBzdWJzY3JpYmVkLCBvciByZWplY3RlZCB3aXRoIGEgbmV3bHkgY3JlYXRlZCBFcnJvciBpZiBzdHJlYW0gaXMgaW52YWxpZCBvciBvcHRpb25zIGNhbm5vdCBiZSBzYXRpc2ZpZWQuIFN1Y2Nlc3NmdWxseSBzdWJzY3JpYmVkIG1lYW5zIFBlZXJDb25uZWN0aW9uIGlzIGVzdGFibGlzaGVkIGFuZCBzZXJ2ZXIgd2FzIHN0YXJ0ZWQgdG8gc2VuZCBtZWRpYSBkYXRhLlxyXG4gICAqL1xyXG4gIHRoaXMuc3Vic2NyaWJlID0gZnVuY3Rpb24oc3RyZWFtLCBvcHRpb25zKSB7XHJcbiAgICBpZiAoIShzdHJlYW0gaW5zdGFuY2VvZiBTdHJlYW1Nb2R1bGUuUmVtb3RlU3RyZWFtKSkge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IENvbmZlcmVuY2VFcnJvcignSW52YWxpZCBzdHJlYW0uJykpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgY2hhbm5lbCA9IGNyZWF0ZVBlZXJDb25uZWN0aW9uQ2hhbm5lbCgpO1xyXG4gICAgcmV0dXJuIGNoYW5uZWwuc3Vic2NyaWJlKHN0cmVhbSwgb3B0aW9ucyk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogQGZ1bmN0aW9uIHNlbmRcclxuICAgKiBAbWVtYmVyb2YgT3d0LkNvbmZlcmVuY2UuQ29uZmVyZW5jZUNsaWVudFxyXG4gICAqIEBpbnN0YW5jZVxyXG4gICAqIEBkZXNjIFNlbmQgYSB0ZXh0IG1lc3NhZ2UgdG8gYSBwYXJ0aWNpcGFudCBvciBhbGwgcGFydGljaXBhbnRzLlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIE1lc3NhZ2UgdG8gYmUgc2VudC5cclxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGFydGljaXBhbnRJZCBSZWNlaXZlciBvZiB0aGlzIG1lc3NhZ2UuIE1lc3NhZ2Ugd2lsbCBiZSBzZW50IHRvIGFsbCBwYXJ0aWNpcGFudHMgaWYgcGFydGljaXBhbnRJZCBpcyB1bmRlZmluZWQuXHJcbiAgICogQHJldHVybiB7UHJvbWlzZTx2b2lkLCBFcnJvcj59IFJldHVybmVkIHByb21pc2Ugd2lsbCBiZSByZXNvbHZlZCB3aGVuIGNvbmZlcmVuY2Ugc2VydmVyIHJlY2VpdmVkIGNlcnRhaW4gbWVzc2FnZS5cclxuICAgKi9cclxuICB0aGlzLnNlbmQgPSBmdW5jdGlvbihtZXNzYWdlLCBwYXJ0aWNpcGFudElkKSB7XHJcbiAgICBpZiAocGFydGljaXBhbnRJZCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHBhcnRpY2lwYW50SWQgPSAnYWxsJztcclxuICAgIH1cclxuICAgIHJldHVybiBzZW5kU2lnbmFsaW5nTWVzc2FnZSgndGV4dCcsIHt0bzogcGFydGljaXBhbnRJZCwgbWVzc2FnZTogbWVzc2FnZX0pO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIEBmdW5jdGlvbiBsZWF2ZVxyXG4gICAqIEBtZW1iZXJPZiBPd3QuQ29uZmVyZW5jZS5Db25mZXJlbmNlQ2xpZW50XHJcbiAgICogQGluc3RhbmNlXHJcbiAgICogQGRlc2MgTGVhdmUgYSBjb25mZXJlbmNlLlxyXG4gICAqIEByZXR1cm4ge1Byb21pc2U8dm9pZCwgRXJyb3I+fSBSZXR1cm5lZCBwcm9taXNlIHdpbGwgYmUgcmVzb2x2ZWQgd2l0aCB1bmRlZmluZWQgb25jZSB0aGUgY29ubmVjdGlvbiBpcyBkaXNjb25uZWN0ZWQuXHJcbiAgICovXHJcbiAgdGhpcy5sZWF2ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHNpZ25hbGluZy5kaXNjb25uZWN0KCkudGhlbigoKSA9PiB7XHJcbiAgICAgIGNsZWFuKCk7XHJcbiAgICAgIHNpZ25hbGluZ1N0YXRlID0gU2lnbmFsaW5nU3RhdGUuUkVBRFk7XHJcbiAgICB9KTtcclxuICB9O1xyXG59O1xyXG4iLCIvLyBDb3B5cmlnaHQgKEMpIDwyMDE4PiBJbnRlbCBDb3Jwb3JhdGlvblxyXG4vL1xyXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxyXG5cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBDb25mZXJlbmNlRXJyb3JcclxuICogQGNsYXNzRGVzYyBUaGUgQ29uZmVyZW5jZUVycm9yIG9iamVjdCByZXByZXNlbnRzIGFuIGVycm9yIGluIGNvbmZlcmVuY2UgbW9kZS5cclxuICogQG1lbWJlck9mIE93dC5Db25mZXJlbmNlXHJcbiAqIEBoaWRlY29uc3RydWN0b3JcclxuICovXHJcbmV4cG9ydCBjbGFzcyBDb25mZXJlbmNlRXJyb3IgZXh0ZW5kcyBFcnJvciB7XHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2NcclxuICBjb25zdHJ1Y3RvcihtZXNzYWdlKSB7XHJcbiAgICBzdXBlcihtZXNzYWdlKTtcclxuICB9XHJcbn1cclxuIiwiLy8gQ29weXJpZ2h0IChDKSA8MjAxOD4gSW50ZWwgQ29ycG9yYXRpb25cclxuLy9cclxuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcclxuXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCB7Q29uZmVyZW5jZUNsaWVudH0gZnJvbSAnLi9jbGllbnQuanMnO1xyXG5leHBvcnQge1Npb1NpZ25hbGluZ30gZnJvbSAnLi9zaWduYWxpbmcuanMnO1xyXG4iLCIvLyBDb3B5cmlnaHQgKEMpIDwyMDE4PiBJbnRlbCBDb3Jwb3JhdGlvblxyXG4vL1xyXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxyXG5cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBDb25mZXJlbmNlSW5mb1xyXG4gKiBAY2xhc3NEZXNjIEluZm9ybWF0aW9uIGZvciBhIGNvbmZlcmVuY2UuXHJcbiAqIEBtZW1iZXJPZiBPd3QuQ29uZmVyZW5jZVxyXG4gKiBAaGlkZWNvbnN0cnVjdG9yXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29uZmVyZW5jZUluZm8ge1xyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jXHJcbiAgY29uc3RydWN0b3IoaWQsIHBhcnRpY2lwYW50cywgcmVtb3RlU3RyZWFtcywgbXlJbmZvKSB7XHJcbiAgICAvKipcclxuICAgICAqIEBtZW1iZXIge3N0cmluZ30gaWRcclxuICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICogQG1lbWJlcm9mIE93dC5Db25mZXJlbmNlLkNvbmZlcmVuY2VJbmZvXHJcbiAgICAgKiBAZGVzYyBDb25mZXJlbmNlIElELlxyXG4gICAgICovXHJcbiAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAvKipcclxuICAgICAqIEBtZW1iZXIge0FycmF5PE93dC5Db25mZXJlbmNlLlBhcnRpY2lwYW50Pn0gcGFydGljaXBhbnRzXHJcbiAgICAgKiBAaW5zdGFuY2VcclxuICAgICAqIEBtZW1iZXJvZiBPd3QuQ29uZmVyZW5jZS5Db25mZXJlbmNlSW5mb1xyXG4gICAgICogQGRlc2MgUGFydGljaXBhbnRzIGluIHRoZSBjb25mZXJlbmNlLlxyXG4gICAgICovXHJcbiAgICB0aGlzLnBhcnRpY2lwYW50cyA9IHBhcnRpY2lwYW50cztcclxuICAgIC8qKlxyXG4gICAgICogQG1lbWJlciB7QXJyYXk8T3d0LkJhc2UuUmVtb3RlU3RyZWFtPn0gcmVtb3RlU3RyZWFtc1xyXG4gICAgICogQGluc3RhbmNlXHJcbiAgICAgKiBAbWVtYmVyb2YgT3d0LkNvbmZlcmVuY2UuQ29uZmVyZW5jZUluZm9cclxuICAgICAqIEBkZXNjIFN0cmVhbXMgcHVibGlzaGVkIGJ5IHBhcnRpY2lwYW50cy4gSXQgYWxzbyBpbmNsdWRlcyBzdHJlYW1zIHB1Ymxpc2hlZCBieSBjdXJyZW50IHVzZXIuXHJcbiAgICAgKi9cclxuICAgIHRoaXMucmVtb3RlU3RyZWFtcyA9IHJlbW90ZVN0cmVhbXM7XHJcbiAgICAvKipcclxuICAgICAqIEBtZW1iZXIge093dC5CYXNlLlBhcnRpY2lwYW50fSBzZWxmXHJcbiAgICAgKiBAaW5zdGFuY2VcclxuICAgICAqIEBtZW1iZXJvZiBPd3QuQ29uZmVyZW5jZS5Db25mZXJlbmNlSW5mb1xyXG4gICAgICovXHJcbiAgICB0aGlzLnNlbGYgPSBteUluZm87XHJcbiAgfVxyXG59XHJcbiIsIi8vIENvcHlyaWdodCAoQykgPDIwMTg+IEludGVsIENvcnBvcmF0aW9uXHJcbi8vXHJcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXHJcblxyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBTdHJlYW1Nb2R1bGUgZnJvbSAnLi4vYmFzZS9zdHJlYW0uanMnO1xyXG5pbXBvcnQgKiBhcyBTdHJlYW1VdGlsc01vZHVsZSBmcm9tICcuL3N0cmVhbXV0aWxzLmpzJztcclxuaW1wb3J0IHtPd3RFdmVudH0gZnJvbSAnLi4vYmFzZS9ldmVudC5qcyc7XHJcblxyXG4vKipcclxuICogQGNsYXNzIFJlbW90ZU1peGVkU3RyZWFtXHJcbiAqIEBjbGFzc0Rlc2MgTWl4ZWQgc3RyZWFtIGZyb20gY29uZmVyZW5jZSBzZXJ2ZXIuXHJcbiAqIEV2ZW50czpcclxuICpcclxuICogfCBFdmVudCBOYW1lICAgICAgICAgICAgIHwgQXJndW1lbnQgVHlwZSAgICB8IEZpcmVkIHdoZW4gICAgICAgfFxyXG4gKiB8IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfCAtLS0tLS0tLS0tLS0tLS0tIHwgLS0tLS0tLS0tLS0tLS0tLSB8XHJcbiAqIHwgYWN0aXZlYXVkaW9pbnB1dGNoYW5nZSB8IEV2ZW50ICAgICAgICAgICAgfCBBdWRpbyBhY3RpdmVuZXNzIG9mIGlucHV0IHN0cmVhbSAob2YgdGhlIG1peGVkIHN0cmVhbSkgaXMgY2hhbmdlZC4gfFxyXG4gKiB8IGxheW91dGNoYW5nZSAgICAgICAgICAgfCBFdmVudCAgICAgICAgICAgIHwgVmlkZW8ncyBsYXlvdXQgaGFzIGJlZW4gY2hhbmdlZC4gSXQgdXN1YWxseSBoYXBwZW5zIHdoZW4gYSBuZXcgdmlkZW8gaXMgbWl4ZWQgaW50byB0aGUgdGFyZ2V0IG1peGVkIHN0cmVhbSBvciBhbiBleGlzdGluZyB2aWRlbyBoYXMgYmVlbiByZW1vdmVkIGZyb20gbWl4ZWQgc3RyZWFtLiB8XHJcbiAqXHJcbiAqIEBtZW1iZXJPZiBPd3QuQ29uZmVyZW5jZVxyXG4gKiBAZXh0ZW5kcyBPd3QuQmFzZS5SZW1vdGVTdHJlYW1cclxuICogQGhpZGVjb25zdHJ1Y3RvclxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFJlbW90ZU1peGVkU3RyZWFtIGV4dGVuZHMgU3RyZWFtTW9kdWxlLlJlbW90ZVN0cmVhbSB7XHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2NcclxuICBjb25zdHJ1Y3RvcihpbmZvKSB7XHJcbiAgICBpZiAoaW5mby50eXBlICE9PSAnbWl4ZWQnKSB7XHJcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ05vdCBhIG1peGVkIHN0cmVhbScpO1xyXG4gICAgfVxyXG4gICAgc3VwZXIoaW5mby5pZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIG5ldyBTdHJlYW1Nb2R1bGUuU3RyZWFtU291cmNlSW5mbyhcclxuICAgICAgICAnbWl4ZWQnLCAnbWl4ZWQnKSk7XHJcblxyXG4gICAgdGhpcy5zZXR0aW5ncyA9IFN0cmVhbVV0aWxzTW9kdWxlLmNvbnZlcnRUb1B1YmxpY2F0aW9uU2V0dGluZ3MoaW5mby5tZWRpYSk7XHJcblxyXG4gICAgdGhpcy5leHRyYUNhcGFiaWxpdGllcyA9IG5ldyBTdHJlYW1VdGlsc01vZHVsZVxyXG4gICAgICAuY29udmVydFRvU3Vic2NyaXB0aW9uQ2FwYWJpbGl0aWVzKFxyXG4gICAgICAgIGluZm8ubWVkaWEpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBBY3RpdmVBdWRpb0lucHV0Q2hhbmdlRXZlbnRcclxuICogQGNsYXNzRGVzYyBDbGFzcyBBY3RpdmVBdWRpb0lucHV0Q2hhbmdlRXZlbnQgcmVwcmVzZW50cyBhbiBhY3RpdmUgYXVkaW8gaW5wdXQgY2hhbmdlIGV2ZW50LlxyXG4gKiBAbWVtYmVyb2YgT3d0LkNvbmZlcmVuY2VcclxuICogQGhpZGVjb25zdHJ1Y3RvclxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEFjdGl2ZUF1ZGlvSW5wdXRDaGFuZ2VFdmVudCBleHRlbmRzIE93dEV2ZW50IHtcclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvY1xyXG4gIGNvbnN0cnVjdG9yKHR5cGUsIGluaXQpIHtcclxuICAgIHN1cGVyKHR5cGUpO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAbWVtYmVyIHtzdHJpbmd9IGFjdGl2ZUF1ZGlvSW5wdXRTdHJlYW1JZFxyXG4gICAgICogQGluc3RhbmNlXHJcbiAgICAgKiBAbWVtYmVyb2YgT3d0LkNvbmZlcmVuY2UuQWN0aXZlQXVkaW9JbnB1dENoYW5nZUV2ZW50XHJcbiAgICAgKiBAZGVzYyBUaGUgSUQgb2YgaW5wdXQgc3RyZWFtKG9mIHRoZSBtaXhlZCBzdHJlYW0pIHdob3NlIGF1ZGlvIGlzIGFjdGl2ZS5cclxuICAgICAqL1xyXG4gICAgdGhpcy5hY3RpdmVBdWRpb0lucHV0U3RyZWFtSWQgPSBpbml0LmFjdGl2ZUF1ZGlvSW5wdXRTdHJlYW1JZDtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgTGF5b3V0Q2hhbmdlRXZlbnRcclxuICogQGNsYXNzRGVzYyBDbGFzcyBMYXlvdXRDaGFuZ2VFdmVudCByZXByZXNlbnRzIGFuIHZpZGVvIGxheW91dCBjaGFuZ2UgZXZlbnQuXHJcbiAqIEBtZW1iZXJvZiBPd3QuQ29uZmVyZW5jZVxyXG4gKiBAaGlkZWNvbnN0cnVjdG9yXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTGF5b3V0Q2hhbmdlRXZlbnQgZXh0ZW5kcyBPd3RFdmVudCB7XHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2NcclxuICBjb25zdHJ1Y3Rvcih0eXBlLCBpbml0KSB7XHJcbiAgICBzdXBlcih0eXBlKTtcclxuICAgIC8qKlxyXG4gICAgICogQG1lbWJlciB7b2JqZWN0fSBsYXlvdXRcclxuICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICogQG1lbWJlcm9mIE93dC5Db25mZXJlbmNlLkxheW91dENoYW5nZUV2ZW50XHJcbiAgICAgKiBAZGVzYyBDdXJyZW50IHZpZGVvJ3MgbGF5b3V0LiBJdCdzIGFuIGFycmF5IG9mIG1hcCB3aGljaCBtYXBzIGVhY2ggc3RyZWFtIHRvIGEgcmVnaW9uLlxyXG4gICAgICovXHJcbiAgICB0aGlzLmxheW91dCA9IGluaXQubGF5b3V0O1xyXG4gIH1cclxufVxyXG5cclxuIiwiLy8gQ29weXJpZ2h0IChDKSA8MjAxOD4gSW50ZWwgQ29ycG9yYXRpb25cclxuLy9cclxuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcclxuXHJcbmltcG9ydCAqIGFzIEV2ZW50TW9kdWxlIGZyb20gJy4uL2Jhc2UvZXZlbnQuanMnO1xyXG5cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBQYXJ0aWNpcGFudFxyXG4gKiBAbWVtYmVyT2YgT3d0LkNvbmZlcmVuY2VcclxuICogQGNsYXNzRGVzYyBUaGUgUGFydGljaXBhbnQgZGVmaW5lcyBhIHBhcnRpY2lwYW50IGluIGEgY29uZmVyZW5jZS5cclxuICogRXZlbnRzOlxyXG4gKlxyXG4gKiB8IEV2ZW50IE5hbWUgICAgICB8IEFyZ3VtZW50IFR5cGUgICAgICB8IEZpcmVkIHdoZW4gICAgICAgfFxyXG4gKiB8IC0tLS0tLS0tLS0tLS0tLS18IC0tLS0tLS0tLS0tLS0tLS0tLSB8IC0tLS0tLS0tLS0tLS0tLS0gfFxyXG4gKiB8IGxlZnQgICAgICAgICAgICB8IE93dC5CYXNlLk93dEV2ZW50ICB8IFRoZSBwYXJ0aWNpcGFudCBsZWZ0IHRoZSBjb25mZXJlbmNlLiB8XHJcbiAqXHJcbiAqIEBleHRlbmRzIE93dC5CYXNlLkV2ZW50RGlzcGF0Y2hlclxyXG4gKiBAaGlkZWNvbnN0cnVjdG9yXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUGFydGljaXBhbnQgZXh0ZW5kcyBFdmVudE1vZHVsZS5FdmVudERpc3BhdGNoZXIge1xyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jXHJcbiAgY29uc3RydWN0b3IoaWQsIHJvbGUsIHVzZXJJZCkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIC8qKlxyXG4gICAgICogQG1lbWJlciB7c3RyaW5nfSBpZFxyXG4gICAgICogQGluc3RhbmNlXHJcbiAgICAgKiBAbWVtYmVyb2YgT3d0LkNvbmZlcmVuY2UuUGFydGljaXBhbnRcclxuICAgICAqIEBkZXNjIFRoZSBJRCBvZiB0aGUgcGFydGljaXBhbnQuIEl0IHZhcmllcyB3aGVuIGEgc2luZ2xlIHVzZXIgam9pbiBkaWZmZXJlbnQgY29uZmVyZW5jZXMuXHJcbiAgICAgKi9cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnaWQnLCB7XHJcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXHJcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcclxuICAgICAgdmFsdWU6IGlkLFxyXG4gICAgfSk7XHJcbiAgICAvKipcclxuICAgICAqIEBtZW1iZXIge3N0cmluZ30gcm9sZVxyXG4gICAgICogQGluc3RhbmNlXHJcbiAgICAgKiBAbWVtYmVyb2YgT3d0LkNvbmZlcmVuY2UuUGFydGljaXBhbnRcclxuICAgICAqL1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdyb2xlJywge1xyXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxyXG4gICAgICB3cml0YWJsZTogZmFsc2UsXHJcbiAgICAgIHZhbHVlOiByb2xlLFxyXG4gICAgfSk7XHJcbiAgICAvKipcclxuICAgICAqIEBtZW1iZXIge3N0cmluZ30gdXNlcklkXHJcbiAgICAgKiBAaW5zdGFuY2VcclxuICAgICAqIEBtZW1iZXJvZiBPd3QuQ29uZmVyZW5jZS5QYXJ0aWNpcGFudFxyXG4gICAgICogQGRlc2MgVGhlIHVzZXIgSUQgb2YgdGhlIHBhcnRpY2lwYW50LiBJdCBjYW4gYmUgaW50ZWdyYXRlZCBpbnRvIGV4aXN0aW5nIGFjY291bnQgbWFuYWdlbWVudCBzeXN0ZW0uXHJcbiAgICAgKi9cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAndXNlcklkJywge1xyXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxyXG4gICAgICB3cml0YWJsZTogZmFsc2UsXHJcbiAgICAgIHZhbHVlOiB1c2VySWQsXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiLy8gQ29weXJpZ2h0IChDKSA8MjAxOD4gSW50ZWwgQ29ycG9yYXRpb25cclxuLy9cclxuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcclxuXHJcbi8qIGdsb2JhbCBpbywgUHJvbWlzZSAqL1xyXG5pbXBvcnQgTG9nZ2VyIGZyb20gJy4uL2Jhc2UvbG9nZ2VyLmpzJztcclxuaW1wb3J0ICogYXMgRXZlbnRNb2R1bGUgZnJvbSAnLi4vYmFzZS9ldmVudC5qcyc7XHJcbmltcG9ydCB7Q29uZmVyZW5jZUVycm9yfSBmcm9tICcuL2Vycm9yLmpzJztcclxuaW1wb3J0IHtCYXNlNjR9IGZyb20gJy4uL2Jhc2UvYmFzZTY0LmpzJztcclxuXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IHJlY29ubmVjdGlvbkF0dGVtcHRzID0gMTA7XHJcblxyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvY1xyXG5mdW5jdGlvbiBoYW5kbGVSZXNwb25zZShzdGF0dXMsIGRhdGEsIHJlc29sdmUsIHJlamVjdCkge1xyXG4gIGlmIChzdGF0dXMgPT09ICdvaycgfHwgc3RhdHVzID09PSAnc3VjY2VzcycpIHtcclxuICAgIHJlc29sdmUoZGF0YSk7XHJcbiAgfSBlbHNlIGlmIChzdGF0dXMgPT09ICdlcnJvcicpIHtcclxuICAgIHJlamVjdChkYXRhKTtcclxuICB9IGVsc2Uge1xyXG4gICAgTG9nZ2VyLmVycm9yKCdNQ1UgcmV0dXJucyB1bmtub3duIGFjay4nKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgU2lvU2lnbmFsaW5nXHJcbiAqIEBjbGFzc2Rlc2MgU29ja2V0LklPIHNpZ25hbGluZyBjaGFubmVsIGZvciBDb25mZXJlbmNlQ2xpZW50LiBJdCBpcyBub3QgcmVjb21tZW5kZWQgdG8gZGlyZWN0bHkgYWNjZXNzIHRoaXMgY2xhc3MuXHJcbiAqIEBtZW1iZXJvZiBPd3QuQ29uZmVyZW5jZVxyXG4gKiBAZXh0ZW5kcyBPd3QuQmFzZS5FdmVudERpc3BhdGNoZXJcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU2lvU2lnbmFsaW5nIGV4dGVuZHMgRXZlbnRNb2R1bGUuRXZlbnREaXNwYXRjaGVyIHtcclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvY1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMuX3NvY2tldCA9IG51bGw7XHJcbiAgICB0aGlzLl9sb2dnZWRJbiA9IGZhbHNlO1xyXG4gICAgdGhpcy5fcmVjb25uZWN0VGltZXMgPSAwO1xyXG4gICAgdGhpcy5fcmVjb25uZWN0aW9uVGlja2V0ID0gbnVsbDtcclxuICAgIHRoaXMuX3JlZnJlc2hSZWNvbm5lY3Rpb25UaWNrZXQgPSBudWxsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGZ1bmN0aW9uIGNvbm5lY3RcclxuICAgKiBAaW5zdGFuY2VcclxuICAgKiBAZGVzYyBDb25uZWN0IHRvIGEgcG9ydGFsLlxyXG4gICAqIEBtZW1iZXJvZiBPbXMuQ29uZmVyZW5jZS5TaW9TaWduYWxpbmdcclxuICAgKiBAcmV0dXJuIHtQcm9taXNlPE9iamVjdCwgRXJyb3I+fSBSZXR1cm4gYSBwcm9taXNlIHJlc29sdmVkIHdpdGggdGhlIGRhdGEgcmV0dXJuZWQgYnkgcG9ydGFsIGlmIHN1Y2Nlc3NmdWxseSBsb2dnZWQgaW4uIE9yIHJldHVybiBhIHByb21pc2UgcmVqZWN0ZWQgd2l0aCBhIG5ld2x5IGNyZWF0ZWQgT21zLkVycm9yIGlmIGZhaWxlZC5cclxuICAgKiBAcGFyYW0ge3N0cmluZ30gaG9zdCBIb3N0IG9mIHRoZSBwb3J0YWwuXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlzU2VjdXJlZCBJcyBzZWN1cmUgY29ubmVjdGlvbiBvciBub3QuXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGxvZ2luSW5mbyBJbmZvbWF0aW9uIHJlcXVpcmVkIGZvciBsb2dnaW5nIGluLlxyXG4gICAqIEBwcml2YXRlLlxyXG4gICAqL1xyXG4gIGNvbm5lY3QoaG9zdCwgaXNTZWN1cmVkLCBsb2dpbkluZm8pIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGNvbnN0IG9wdHMgPSB7XHJcbiAgICAgICAgJ3JlY29ubmVjdGlvbic6IHRydWUsXHJcbiAgICAgICAgJ3JlY29ubmVjdGlvbkF0dGVtcHRzJzogcmVjb25uZWN0aW9uQXR0ZW1wdHMsXHJcbiAgICAgICAgJ2ZvcmNlIG5ldyBjb25uZWN0aW9uJzogdHJ1ZSxcclxuICAgICAgfTtcclxuICAgICAgdGhpcy5fc29ja2V0ID0gaW8oaG9zdCwgb3B0cyk7XHJcbiAgICAgIFsncGFydGljaXBhbnQnLCAndGV4dCcsICdzdHJlYW0nLCAncHJvZ3Jlc3MnXS5mb3JFYWNoKChcclxuICAgICAgICAgIG5vdGlmaWNhdGlvbikgPT4ge1xyXG4gICAgICAgIHRoaXMuX3NvY2tldC5vbihub3RpZmljYXRpb24sIChkYXRhKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50TW9kdWxlLk1lc3NhZ2VFdmVudCgnZGF0YScsIHtcclxuICAgICAgICAgICAgbWVzc2FnZToge1xyXG4gICAgICAgICAgICAgIG5vdGlmaWNhdGlvbjogbm90aWZpY2F0aW9uLFxyXG4gICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLl9zb2NrZXQub24oJ3JlY29ubmVjdGluZycsICgpID0+IHtcclxuICAgICAgICB0aGlzLl9yZWNvbm5lY3RUaW1lcysrO1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5fc29ja2V0Lm9uKCdyZWNvbm5lY3RfZmFpbGVkJywgKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLl9yZWNvbm5lY3RUaW1lcyA+PSByZWNvbm5lY3Rpb25BdHRlbXB0cykge1xyXG4gICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudE1vZHVsZS5Pd3RFdmVudCgnZGlzY29ubmVjdCcpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLl9zb2NrZXQub24oJ2Nvbm5lY3RfZXJyb3InLCAoZSkgPT4ge1xyXG4gICAgICAgIHJlamVjdChgY29ubmVjdF9lcnJvcjoke2hvc3R9YCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLl9zb2NrZXQub24oJ2Ryb3AnLCAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5fcmVjb25uZWN0VGltZXMgPSByZWNvbm5lY3Rpb25BdHRlbXB0cztcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuX3NvY2tldC5vbignZGlzY29ubmVjdCcsICgpID0+IHtcclxuICAgICAgICB0aGlzLl9jbGVhclJlY29ubmVjdGlvblRhc2soKTtcclxuICAgICAgICBpZiAodGhpcy5fcmVjb25uZWN0VGltZXMgPj0gcmVjb25uZWN0aW9uQXR0ZW1wdHMpIHtcclxuICAgICAgICAgIHRoaXMuX2xvZ2dlZEluID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50TW9kdWxlLk93dEV2ZW50KCdkaXNjb25uZWN0JykpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuX3NvY2tldC5lbWl0KCdsb2dpbicsIGxvZ2luSW5mbywgKHN0YXR1cywgZGF0YSkgPT4ge1xyXG4gICAgICAgIGlmIChzdGF0dXMgPT09ICdvaycpIHtcclxuICAgICAgICAgIHRoaXMuX2xvZ2dlZEluID0gdHJ1ZTtcclxuICAgICAgICAgIHRoaXMuX29uUmVjb25uZWN0aW9uVGlja2V0KGRhdGEucmVjb25uZWN0aW9uVGlja2V0KTtcclxuICAgICAgICAgIHRoaXMuX3NvY2tldC5vbignY29ubmVjdCcsICgpID0+IHtcclxuICAgICAgICAgICAgLy8gcmUtbG9naW4gd2l0aCByZWNvbm5lY3Rpb24gdGlja2V0LlxyXG4gICAgICAgICAgICB0aGlzLl9zb2NrZXQuZW1pdCgncmVsb2dpbicsIHRoaXMuX3JlY29ubmVjdGlvblRpY2tldCwgKHN0YXR1cyxcclxuICAgICAgICAgICAgICAgIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICBpZiAoc3RhdHVzID09PSAnb2snKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWNvbm5lY3RUaW1lcyA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9vblJlY29ubmVjdGlvblRpY2tldChkYXRhKTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudE1vZHVsZS5Pd3RFdmVudCgnZGlzY29ubmVjdCcpKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGhhbmRsZVJlc3BvbnNlKHN0YXR1cywgZGF0YSwgcmVzb2x2ZSwgcmVqZWN0KTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBmdW5jdGlvbiBkaXNjb25uZWN0XHJcbiAgICogQGluc3RhbmNlXHJcbiAgICogQGRlc2MgRGlzY29ubmVjdCBmcm9tIGEgcG9ydGFsLlxyXG4gICAqIEBtZW1iZXJvZiBPbXMuQ29uZmVyZW5jZS5TaW9TaWduYWxpbmdcclxuICAgKiBAcmV0dXJuIHtQcm9taXNlPE9iamVjdCwgRXJyb3I+fSBSZXR1cm4gYSBwcm9taXNlIHJlc29sdmVkIHdpdGggdGhlIGRhdGEgcmV0dXJuZWQgYnkgcG9ydGFsIGlmIHN1Y2Nlc3NmdWxseSBkaXNjb25uZWN0ZWQuIE9yIHJldHVybiBhIHByb21pc2UgcmVqZWN0ZWQgd2l0aCBhIG5ld2x5IGNyZWF0ZWQgT21zLkVycm9yIGlmIGZhaWxlZC5cclxuICAgKiBAcHJpdmF0ZS5cclxuICAgKi9cclxuICBkaXNjb25uZWN0KCkge1xyXG4gICAgaWYgKCF0aGlzLl9zb2NrZXQgfHwgdGhpcy5fc29ja2V0LmRpc2Nvbm5lY3RlZCkge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IENvbmZlcmVuY2VFcnJvcihcclxuICAgICAgICAgICdQb3J0YWwgaXMgbm90IGNvbm5lY3RlZC4nKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICB0aGlzLl9zb2NrZXQuZW1pdCgnbG9nb3V0JywgKHN0YXR1cywgZGF0YSkgPT4ge1xyXG4gICAgICAgIC8vIE1heGltaXplIHRoZSByZWNvbm5lY3QgdGltZXMgdG8gZGlzYWJsZSByZWNvbm5lY3Rpb24uXHJcbiAgICAgICAgdGhpcy5fcmVjb25uZWN0VGltZXMgPSByZWNvbm5lY3Rpb25BdHRlbXB0cztcclxuICAgICAgICB0aGlzLl9zb2NrZXQuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgIGhhbmRsZVJlc3BvbnNlKHN0YXR1cywgZGF0YSwgcmVzb2x2ZSwgcmVqZWN0KTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBmdW5jdGlvbiBzZW5kXHJcbiAgICogQGluc3RhbmNlXHJcbiAgICogQGRlc2MgU2VuZCBkYXRhIHRvIHBvcnRhbC5cclxuICAgKiBAbWVtYmVyb2YgT21zLkNvbmZlcmVuY2UuU2lvU2lnbmFsaW5nXHJcbiAgICogQHJldHVybiB7UHJvbWlzZTxPYmplY3QsIEVycm9yPn0gUmV0dXJuIGEgcHJvbWlzZSByZXNvbHZlZCB3aXRoIHRoZSBkYXRhIHJldHVybmVkIGJ5IHBvcnRhbC4gT3IgcmV0dXJuIGEgcHJvbWlzZSByZWplY3RlZCB3aXRoIGEgbmV3bHkgY3JlYXRlZCBPbXMuRXJyb3IgaWYgZmFpbGVkIHRvIHNlbmQgdGhlIG1lc3NhZ2UuXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlcXVlc3ROYW1lIE5hbWUgZGVmaW5lZCBpbiBjbGllbnQtc2VydmVyIHByb3RvY29sLlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZXF1ZXN0RGF0YSBEYXRhIGZvcm1hdCBpcyBkZWZpbmVkIGluIGNsaWVudC1zZXJ2ZXIgcHJvdG9jb2wuXHJcbiAgICogQHByaXZhdGUuXHJcbiAgICovXHJcbiAgc2VuZChyZXF1ZXN0TmFtZSwgcmVxdWVzdERhdGEpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHRoaXMuX3NvY2tldC5lbWl0KHJlcXVlc3ROYW1lLCByZXF1ZXN0RGF0YSwgKHN0YXR1cywgZGF0YSkgPT4ge1xyXG4gICAgICAgIGhhbmRsZVJlc3BvbnNlKHN0YXR1cywgZGF0YSwgcmVzb2x2ZSwgcmVqZWN0KTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBmdW5jdGlvbiBfb25SZWNvbm5lY3Rpb25UaWNrZXRcclxuICAgKiBAaW5zdGFuY2VcclxuICAgKiBAZGVzYyBQYXJzZSByZWNvbm5lY3Rpb24gdGlja2V0IGFuZCBzY2hlZHVsZSB0aWNrZXQgcmVmcmVzaGluZy5cclxuICAgKiBAbWVtYmVyb2YgT3d0LkNvbmZlcmVuY2UuU2lvU2lnbmFsaW5nXHJcbiAgICogQHByaXZhdGUuXHJcbiAgICovXHJcbiAgX29uUmVjb25uZWN0aW9uVGlja2V0KHRpY2tldFN0cmluZykge1xyXG4gICAgdGhpcy5fcmVjb25uZWN0aW9uVGlja2V0ID0gdGlja2V0U3RyaW5nO1xyXG4gICAgY29uc3QgdGlja2V0ID0gSlNPTi5wYXJzZShCYXNlNjQuZGVjb2RlQmFzZTY0KHRpY2tldFN0cmluZykpO1xyXG4gICAgLy8gUmVmcmVzaCB0aWNrZXQgMSBtaW4gb3IgMTAgc2Vjb25kcyBiZWZvcmUgaXQgZXhwaXJlcy5cclxuICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XHJcbiAgICBjb25zdCBtaWxsaXNlY29uZHNJbk9uZU1pbnV0ZSA9IDYwICogMTAwMDtcclxuICAgIGNvbnN0IG1pbGxpc2Vjb25kc0luVGVuU2Vjb25kcyA9IDEwICogMTAwMDtcclxuICAgIGlmICh0aWNrZXQubm90QWZ0ZXIgPD0gbm93IC0gbWlsbGlzZWNvbmRzSW5UZW5TZWNvbmRzKSB7XHJcbiAgICAgIExvZ2dlci53YXJuaW5nKCdSZWNvbm5lY3Rpb24gdGlja2V0IGV4cGlyZXMgdG9vIHNvb24uJyk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGxldCByZWZyZXNoQWZ0ZXIgPSB0aWNrZXQubm90QWZ0ZXIgLSBub3cgLSBtaWxsaXNlY29uZHNJbk9uZU1pbnV0ZTtcclxuICAgIGlmIChyZWZyZXNoQWZ0ZXIgPCAwKSB7XHJcbiAgICAgIHJlZnJlc2hBZnRlciA9IHRpY2tldC5ub3RBZnRlciAtIG5vdyAtIG1pbGxpc2Vjb25kc0luVGVuU2Vjb25kcztcclxuICAgIH1cclxuICAgIHRoaXMuX2NsZWFyUmVjb25uZWN0aW9uVGFzaygpO1xyXG4gICAgdGhpcy5fcmVmcmVzaFJlY29ubmVjdGlvblRpY2tldCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLl9zb2NrZXQuZW1pdCgncmVmcmVzaFJlY29ubmVjdGlvblRpY2tldCcsIChzdGF0dXMsIGRhdGEpID0+IHtcclxuICAgICAgICBpZiAoc3RhdHVzICE9PSAnb2snKSB7XHJcbiAgICAgICAgICBMb2dnZXIud2FybmluZygnRmFpbGVkIHRvIHJlZnJlc2ggcmVjb25uZWN0aW9uIHRpY2tldC4nKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fb25SZWNvbm5lY3Rpb25UaWNrZXQoZGF0YSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSwgcmVmcmVzaEFmdGVyKTtcclxuICB9XHJcblxyXG4gIF9jbGVhclJlY29ubmVjdGlvblRhc2soKSB7XHJcbiAgICBjbGVhclRpbWVvdXQodGhpcy5fcmVmcmVzaFJlY29ubmVjdGlvblRpY2tldCk7XHJcbiAgICB0aGlzLl9yZWZyZXNoUmVjb25uZWN0aW9uVGlja2V0ID0gbnVsbDtcclxuICB9XHJcbn1cclxuIiwiLy8gQ29weXJpZ2h0IChDKSA8MjAxOD4gSW50ZWwgQ29ycG9yYXRpb25cclxuLy9cclxuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcclxuXHJcbi8vIFRoaXMgZmlsZSBkb2Vzbid0IGhhdmUgcHVibGljIEFQSXMuXHJcbi8qIGVzbGludC1kaXNhYmxlIHZhbGlkLWpzZG9jICovXHJcblxyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgKiBhcyBQdWJsaWNhdGlvbk1vZHVsZSBmcm9tICcuLi9iYXNlL3B1YmxpY2F0aW9uLmpzJztcclxuaW1wb3J0ICogYXMgTWVkaWFGb3JtYXRNb2R1bGUgZnJvbSAnLi4vYmFzZS9tZWRpYWZvcm1hdC5qcyc7XHJcbmltcG9ydCAqIGFzIENvZGVjTW9kdWxlIGZyb20gJy4uL2Jhc2UvY29kZWMuanMnO1xyXG5pbXBvcnQgKiBhcyBTdWJzY3JpcHRpb25Nb2R1bGUgZnJvbSAnLi9zdWJzY3JpcHRpb24uanMnO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBAZnVuY3Rpb24gZXh0cmFjdEJpdHJhdGVNdWx0aXBsaWVyXHJcbiAqIEBkZXNjIEV4dHJhY3QgYml0cmF0ZSBtdWx0aXBsaWVyIGZyb20gYSBzdHJpbmcgbGlrZSBcIngwLjJcIi5cclxuICogQHJldHVybiB7UHJvbWlzZTxPYmplY3QsIEVycm9yPn0gVGhlIGZsb2F0IG51bWJlciBhZnRlciBcInhcIi5cclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIGV4dHJhY3RCaXRyYXRlTXVsdGlwbGllcihpbnB1dCkge1xyXG4gIGlmICh0eXBlb2YgaW5wdXQgIT09ICdzdHJpbmcnIHx8ICFpbnB1dC5zdGFydHNXaXRoKCd4JykpIHtcclxuICAgIEwuTG9nZ2VyLndhcm5pbmcoJ0ludmFsaWQgYml0cmF0ZSBtdWx0aXBsaWVyIGlucHV0LicpO1xyXG4gICAgcmV0dXJuIDA7XHJcbiAgfVxyXG4gIHJldHVybiBOdW1iZXIucGFyc2VGbG9hdChpbnB1dC5yZXBsYWNlKC9eeC8sICcnKSk7XHJcbn1cclxuXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jXHJcbmZ1bmN0aW9uIHNvcnROdW1iZXJzKHgsIHkpIHtcclxuICByZXR1cm4geCAtIHk7XHJcbn1cclxuXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jXHJcbmZ1bmN0aW9uIHNvcnRSZXNvbHV0aW9ucyh4LCB5KSB7XHJcbiAgaWYgKHgud2lkdGggIT09IHkud2lkdGgpIHtcclxuICAgIHJldHVybiB4LndpZHRoIC0geS53aWR0aDtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIHguaGVpZ2h0IC0geS5oZWlnaHQ7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogQGZ1bmN0aW9uIGNvbnZlcnRUb1B1YmxpY2F0aW9uU2V0dGluZ3NcclxuICogQGRlc2MgQ29udmVydCBtZWRpYUluZm8gcmVjZWl2ZWQgZnJvbSBzZXJ2ZXIgdG8gUHVibGljYXRpb25TZXR0aW5ncy5cclxuICogQHByaXZhdGVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0VG9QdWJsaWNhdGlvblNldHRpbmdzKG1lZGlhSW5mbykge1xyXG4gIGxldCBhdWRpbyA9IFtdLFxyXG4gICAgdmlkZW8gPSBbXTtcclxuICBsZXQgYXVkaW9Db2RlYywgdmlkZW9Db2RlYywgcmVzb2x1dGlvbiwgZnJhbWVyYXRlLCBiaXRyYXRlLCBrZXlGcmFtZUludGVydmFsLFxyXG4gICAgcmlkO1xyXG4gIGlmIChtZWRpYUluZm8uYXVkaW8pIHtcclxuICAgIGlmIChtZWRpYUluZm8uYXVkaW8uZm9ybWF0KSB7XHJcbiAgICAgIGF1ZGlvQ29kZWMgPSBuZXcgQ29kZWNNb2R1bGUuQXVkaW9Db2RlY1BhcmFtZXRlcnMoXHJcbiAgICAgICAgbWVkaWFJbmZvLmF1ZGlvLmZvcm1hdC5jb2RlYywgbWVkaWFJbmZvLmF1ZGlvLmZvcm1hdC5jaGFubmVsTnVtLFxyXG4gICAgICAgIG1lZGlhSW5mby5hdWRpby5mb3JtYXQuc2FtcGxlUmF0ZSk7XHJcbiAgICB9XHJcbiAgICBhdWRpby5wdXNoKG5ldyBQdWJsaWNhdGlvbk1vZHVsZS5BdWRpb1B1YmxpY2F0aW9uU2V0dGluZ3MoYXVkaW9Db2RlYykpO1xyXG4gIH1cclxuICBpZiAobWVkaWFJbmZvLnZpZGVvKSB7XHJcbiAgICBmb3IgKGNvbnN0IHZpZGVvSW5mbyBvZiBtZWRpYUluZm8udmlkZW8ub3JpZ2luYWwpIHtcclxuICAgICAgaWYgKHZpZGVvSW5mby5mb3JtYXQpIHtcclxuICAgICAgICB2aWRlb0NvZGVjID0gbmV3IENvZGVjTW9kdWxlLlZpZGVvQ29kZWNQYXJhbWV0ZXJzKFxyXG4gICAgICAgICAgdmlkZW9JbmZvLmZvcm1hdC5jb2RlYywgdmlkZW9JbmZvLmZvcm1hdC5wcm9maWxlKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodmlkZW9JbmZvLnBhcmFtZXRlcnMpIHtcclxuICAgICAgICBpZiAodmlkZW9JbmZvLnBhcmFtZXRlcnMucmVzb2x1dGlvbikge1xyXG4gICAgICAgICAgcmVzb2x1dGlvbiA9IG5ldyBNZWRpYUZvcm1hdE1vZHVsZS5SZXNvbHV0aW9uKFxyXG4gICAgICAgICAgICB2aWRlb0luZm8ucGFyYW1ldGVycy5yZXNvbHV0aW9uLndpZHRoLFxyXG4gICAgICAgICAgICB2aWRlb0luZm8ucGFyYW1ldGVycy5yZXNvbHV0aW9uLmhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZyYW1lcmF0ZSA9IHZpZGVvSW5mby5wYXJhbWV0ZXJzLmZyYW1lcmF0ZTtcclxuICAgICAgICBiaXRyYXRlID0gdmlkZW9JbmZvLnBhcmFtZXRlcnMuYml0cmF0ZSAqIDEwMDA7XHJcbiAgICAgICAga2V5RnJhbWVJbnRlcnZhbCA9IHZpZGVvSW5mby5wYXJhbWV0ZXJzLmtleUZyYW1lSW50ZXJ2YWw7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHZpZGVvSW5mby5zaW11bGNhc3RSaWQpIHtcclxuICAgICAgICByaWQgPSB2aWRlb0luZm8uc2ltdWxjYXN0UmlkO1xyXG4gICAgICB9XHJcbiAgICAgIHZpZGVvLnB1c2gobmV3IFB1YmxpY2F0aW9uTW9kdWxlLlZpZGVvUHVibGljYXRpb25TZXR0aW5ncyhcclxuICAgICAgICB2aWRlb0NvZGVjLCByZXNvbHV0aW9uLCBmcmFtZXJhdGUsIGJpdHJhdGUsIGtleUZyYW1lSW50ZXJ2YWwsIHJpZCkpO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gbmV3IFB1YmxpY2F0aW9uTW9kdWxlLlB1YmxpY2F0aW9uU2V0dGluZ3MoYXVkaW8sIHZpZGVvKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBmdW5jdGlvbiBjb252ZXJ0VG9TdWJzY3JpcHRpb25DYXBhYmlsaXRpZXNcclxuICogQGRlc2MgQ29udmVydCBtZWRpYUluZm8gcmVjZWl2ZWQgZnJvbSBzZXJ2ZXIgdG8gU3Vic2NyaXB0aW9uQ2FwYWJpbGl0aWVzLlxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRUb1N1YnNjcmlwdGlvbkNhcGFiaWxpdGllcyhtZWRpYUluZm8pIHtcclxuICBsZXQgYXVkaW87IGxldCB2aWRlbztcclxuICBpZiAobWVkaWFJbmZvLmF1ZGlvKSB7XHJcbiAgICBjb25zdCBhdWRpb0NvZGVjcyA9IFtdO1xyXG4gICAgaWYgKG1lZGlhSW5mby5hdWRpbyAmJiBtZWRpYUluZm8uYXVkaW8ub3B0aW9uYWwgJiZcclxuICAgICAgbWVkaWFJbmZvLmF1ZGlvLm9wdGlvbmFsLmZvcm1hdCkge1xyXG4gICAgICBmb3IgKGNvbnN0IGF1ZGlvQ29kZWNJbmZvIG9mIG1lZGlhSW5mby5hdWRpby5vcHRpb25hbC5mb3JtYXQpIHtcclxuICAgICAgICBjb25zdCBhdWRpb0NvZGVjID0gbmV3IENvZGVjTW9kdWxlLkF1ZGlvQ29kZWNQYXJhbWV0ZXJzKFxyXG4gICAgICAgICAgICBhdWRpb0NvZGVjSW5mby5jb2RlYywgYXVkaW9Db2RlY0luZm8uY2hhbm5lbE51bSxcclxuICAgICAgICAgICAgYXVkaW9Db2RlY0luZm8uc2FtcGxlUmF0ZSk7XHJcbiAgICAgICAgYXVkaW9Db2RlY3MucHVzaChhdWRpb0NvZGVjKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgYXVkaW9Db2RlY3Muc29ydCgpO1xyXG4gICAgYXVkaW8gPSBuZXcgU3Vic2NyaXB0aW9uTW9kdWxlLkF1ZGlvU3Vic2NyaXB0aW9uQ2FwYWJpbGl0aWVzKGF1ZGlvQ29kZWNzKTtcclxuICB9XHJcbiAgaWYgKG1lZGlhSW5mby52aWRlbykge1xyXG4gICAgY29uc3QgdmlkZW9Db2RlY3MgPSBbXTtcclxuICAgIGlmIChtZWRpYUluZm8udmlkZW8gJiYgbWVkaWFJbmZvLnZpZGVvLm9wdGlvbmFsICYmXHJcbiAgICAgIG1lZGlhSW5mby52aWRlby5vcHRpb25hbC5mb3JtYXQpIHtcclxuICAgICAgZm9yIChjb25zdCB2aWRlb0NvZGVjSW5mbyBvZiBtZWRpYUluZm8udmlkZW8ub3B0aW9uYWwuZm9ybWF0KSB7XHJcbiAgICAgICAgY29uc3QgdmlkZW9Db2RlYyA9IG5ldyBDb2RlY01vZHVsZS5WaWRlb0NvZGVjUGFyYW1ldGVycyhcclxuICAgICAgICAgICAgdmlkZW9Db2RlY0luZm8uY29kZWMsIHZpZGVvQ29kZWNJbmZvLnByb2ZpbGUpO1xyXG4gICAgICAgIHZpZGVvQ29kZWNzLnB1c2godmlkZW9Db2RlYyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHZpZGVvQ29kZWNzLnNvcnQoKTtcclxuICAgIGlmIChtZWRpYUluZm8udmlkZW8gJiYgbWVkaWFJbmZvLnZpZGVvLm9wdGlvbmFsICYmIG1lZGlhSW5mby52aWRlby5vcHRpb25hbFxyXG4gICAgICAucGFyYW1ldGVycykge1xyXG4gICAgICBjb25zdCByZXNvbHV0aW9ucyA9IEFycmF5LmZyb20oXHJcbiAgICAgICAgbWVkaWFJbmZvLnZpZGVvLm9wdGlvbmFsLnBhcmFtZXRlcnMucmVzb2x1dGlvbixcclxuICAgICAgICAocikgPT4gbmV3IE1lZGlhRm9ybWF0TW9kdWxlLlJlc29sdXRpb24oci53aWR0aCwgci5oZWlnaHQpKTtcclxuICAgICAgcmVzb2x1dGlvbnMuc29ydChzb3J0UmVzb2x1dGlvbnMpO1xyXG4gICAgICBjb25zdCBiaXRyYXRlcyA9IEFycmF5LmZyb20oXHJcbiAgICAgICAgbWVkaWFJbmZvLnZpZGVvLm9wdGlvbmFsLnBhcmFtZXRlcnMuYml0cmF0ZSxcclxuICAgICAgICAoYml0cmF0ZSkgPT4gZXh0cmFjdEJpdHJhdGVNdWx0aXBsaWVyKGJpdHJhdGUpKTtcclxuICAgICAgYml0cmF0ZXMucHVzaCgxLjApO1xyXG4gICAgICBiaXRyYXRlcy5zb3J0KHNvcnROdW1iZXJzKTtcclxuICAgICAgY29uc3QgZnJhbWVSYXRlcyA9IEpTT04ucGFyc2UoXHJcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkobWVkaWFJbmZvLnZpZGVvLm9wdGlvbmFsLnBhcmFtZXRlcnMuZnJhbWVyYXRlKSk7XHJcbiAgICAgIGZyYW1lUmF0ZXMuc29ydChzb3J0TnVtYmVycyk7XHJcbiAgICAgIGNvbnN0IGtleUZyYW1lSW50ZXJ2YWxzID0gSlNPTi5wYXJzZShcclxuICAgICAgICBKU09OLnN0cmluZ2lmeShtZWRpYUluZm8udmlkZW8ub3B0aW9uYWwucGFyYW1ldGVycy5rZXlGcmFtZUludGVydmFsKSk7XHJcbiAgICAgIGtleUZyYW1lSW50ZXJ2YWxzLnNvcnQoc29ydE51bWJlcnMpO1xyXG4gICAgICB2aWRlbyA9IG5ldyBTdWJzY3JpcHRpb25Nb2R1bGUuVmlkZW9TdWJzY3JpcHRpb25DYXBhYmlsaXRpZXMoXHJcbiAgICAgICAgdmlkZW9Db2RlY3MsIHJlc29sdXRpb25zLCBmcmFtZVJhdGVzLCBiaXRyYXRlcywga2V5RnJhbWVJbnRlcnZhbHMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmlkZW8gPSBuZXcgU3Vic2NyaXB0aW9uTW9kdWxlLlZpZGVvU3Vic2NyaXB0aW9uQ2FwYWJpbGl0aWVzKHZpZGVvQ29kZWNzLFxyXG4gICAgICAgIFtdLCBbXSwgWzEuMF0sIFtdKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIG5ldyBTdWJzY3JpcHRpb25Nb2R1bGUuU3Vic2NyaXB0aW9uQ2FwYWJpbGl0aWVzKGF1ZGlvLCB2aWRlbyk7XHJcbn1cclxuIiwiLy8gQ29weXJpZ2h0IChDKSA8MjAxOD4gSW50ZWwgQ29ycG9yYXRpb25cclxuLy9cclxuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcclxuXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIE1lZGlhRm9ybWF0TW9kdWxlIGZyb20gJy4uL2Jhc2UvbWVkaWFmb3JtYXQuanMnO1xyXG5pbXBvcnQgKiBhcyBDb2RlY01vZHVsZSBmcm9tICcuLi9iYXNlL2NvZGVjLmpzJztcclxuaW1wb3J0IHtFdmVudERpc3BhdGNoZXJ9IGZyb20gJy4uL2Jhc2UvZXZlbnQuanMnO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBBdWRpb1N1YnNjcmlwdGlvbkNhcGFiaWxpdGllc1xyXG4gKiBAbWVtYmVyT2YgT3d0LkNvbmZlcmVuY2VcclxuICogQGNsYXNzRGVzYyBSZXByZXNlbnRzIHRoZSBhdWRpbyBjYXBhYmlsaXR5IGZvciBzdWJzY3JpcHRpb24uXHJcbiAqIEBoaWRlY29uc3RydWN0b3JcclxuICovXHJcbmV4cG9ydCBjbGFzcyBBdWRpb1N1YnNjcmlwdGlvbkNhcGFiaWxpdGllcyB7XHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2NcclxuICBjb25zdHJ1Y3Rvcihjb2RlY3MpIHtcclxuICAgIC8qKlxyXG4gICAgICogQG1lbWJlciB7QXJyYXkuPE93dC5CYXNlLkF1ZGlvQ29kZWNQYXJhbWV0ZXJzPn0gY29kZWNzXHJcbiAgICAgKiBAaW5zdGFuY2VcclxuICAgICAqIEBtZW1iZXJvZiBPd3QuQ29uZmVyZW5jZS5BdWRpb1N1YnNjcmlwdGlvbkNhcGFiaWxpdGllc1xyXG4gICAgICovXHJcbiAgICB0aGlzLmNvZGVjcyA9IGNvZGVjcztcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgVmlkZW9TdWJzY3JpcHRpb25DYXBhYmlsaXRpZXNcclxuICogQG1lbWJlck9mIE93dC5Db25mZXJlbmNlXHJcbiAqIEBjbGFzc0Rlc2MgUmVwcmVzZW50cyB0aGUgdmlkZW8gY2FwYWJpbGl0eSBmb3Igc3Vic2NyaXB0aW9uLlxyXG4gKiBAaGlkZWNvbnN0cnVjdG9yXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVmlkZW9TdWJzY3JpcHRpb25DYXBhYmlsaXRpZXMge1xyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jXHJcbiAgY29uc3RydWN0b3IoY29kZWNzLCByZXNvbHV0aW9ucywgZnJhbWVSYXRlcywgYml0cmF0ZU11bHRpcGxpZXJzLFxyXG4gICAgICBrZXlGcmFtZUludGVydmFscykge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAbWVtYmVyIHtBcnJheS48T3d0LkJhc2UuVmlkZW9Db2RlY1BhcmFtZXRlcnM+fSBjb2RlY3NcclxuICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICogQG1lbWJlcm9mIE93dC5Db25mZXJlbmNlLlZpZGVvU3Vic2NyaXB0aW9uQ2FwYWJpbGl0aWVzXHJcbiAgICAgKi9cclxuICAgIHRoaXMuY29kZWNzID0gY29kZWNzO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAbWVtYmVyIHtBcnJheS48T3d0LkJhc2UuUmVzb2x1dGlvbj59IHJlc29sdXRpb25zXHJcbiAgICAgKiBAaW5zdGFuY2VcclxuICAgICAqIEBtZW1iZXJvZiBPd3QuQ29uZmVyZW5jZS5WaWRlb1N1YnNjcmlwdGlvbkNhcGFiaWxpdGllc1xyXG4gICAgICovXHJcbiAgICB0aGlzLnJlc29sdXRpb25zID0gcmVzb2x1dGlvbnM7XHJcbiAgICAvKipcclxuICAgICAqIEBtZW1iZXIge0FycmF5LjxudW1iZXI+fSBmcmFtZVJhdGVzXHJcbiAgICAgKiBAaW5zdGFuY2VcclxuICAgICAqIEBtZW1iZXJvZiBPd3QuQ29uZmVyZW5jZS5WaWRlb1N1YnNjcmlwdGlvbkNhcGFiaWxpdGllc1xyXG4gICAgICovXHJcbiAgICB0aGlzLmZyYW1lUmF0ZXMgPSBmcmFtZVJhdGVzO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAbWVtYmVyIHtBcnJheS48bnVtYmVyPn0gYml0cmF0ZU11bHRpcGxpZXJzXHJcbiAgICAgKiBAaW5zdGFuY2VcclxuICAgICAqIEBtZW1iZXJvZiBPd3QuQ29uZmVyZW5jZS5WaWRlb1N1YnNjcmlwdGlvbkNhcGFiaWxpdGllc1xyXG4gICAgICovXHJcbiAgICB0aGlzLmJpdHJhdGVNdWx0aXBsaWVycyA9IGJpdHJhdGVNdWx0aXBsaWVycztcclxuICAgIC8qKlxyXG4gICAgICogQG1lbWJlciB7QXJyYXkuPG51bWJlcj59IGtleUZyYW1lSW50ZXJ2YWxzXHJcbiAgICAgKiBAaW5zdGFuY2VcclxuICAgICAqIEBtZW1iZXJvZiBPd3QuQ29uZmVyZW5jZS5WaWRlb1N1YnNjcmlwdGlvbkNhcGFiaWxpdGllc1xyXG4gICAgICovXHJcbiAgICB0aGlzLmtleUZyYW1lSW50ZXJ2YWxzID0ga2V5RnJhbWVJbnRlcnZhbHM7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogQGNsYXNzIFN1YnNjcmlwdGlvbkNhcGFiaWxpdGllc1xyXG4gKiBAbWVtYmVyT2YgT3d0LkNvbmZlcmVuY2VcclxuICogQGNsYXNzRGVzYyBSZXByZXNlbnRzIHRoZSBjYXBhYmlsaXR5IGZvciBzdWJzY3JpcHRpb24uXHJcbiAqIEBoaWRlY29uc3RydWN0b3JcclxuICovXHJcbmV4cG9ydCBjbGFzcyBTdWJzY3JpcHRpb25DYXBhYmlsaXRpZXMge1xyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jXHJcbiAgY29uc3RydWN0b3IoYXVkaW8sIHZpZGVvKSB7XHJcbiAgICAvKipcclxuICAgICAqIEBtZW1iZXIgez9Pd3QuQ29uZmVyZW5jZS5BdWRpb1N1YnNjcmlwdGlvbkNhcGFiaWxpdGllc30gYXVkaW9cclxuICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICogQG1lbWJlcm9mIE93dC5Db25mZXJlbmNlLlN1YnNjcmlwdGlvbkNhcGFiaWxpdGllc1xyXG4gICAgICovXHJcbiAgICB0aGlzLmF1ZGlvID0gYXVkaW87XHJcbiAgICAvKipcclxuICAgICAqIEBtZW1iZXIgez9Pd3QuQ29uZmVyZW5jZS5WaWRlb1N1YnNjcmlwdGlvbkNhcGFiaWxpdGllc30gdmlkZW9cclxuICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICogQG1lbWJlcm9mIE93dC5Db25mZXJlbmNlLlN1YnNjcmlwdGlvbkNhcGFiaWxpdGllc1xyXG4gICAgICovXHJcbiAgICB0aGlzLnZpZGVvID0gdmlkZW87XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogQGNsYXNzIEF1ZGlvU3Vic2NyaXB0aW9uQ29uc3RyYWludHNcclxuICogQG1lbWJlck9mIE93dC5Db25mZXJlbmNlXHJcbiAqIEBjbGFzc0Rlc2MgUmVwcmVzZW50cyB0aGUgYXVkaW8gY29uc3RyYWludHMgZm9yIHN1YnNjcmlwdGlvbi5cclxuICogQGhpZGVjb25zdHJ1Y3RvclxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEF1ZGlvU3Vic2NyaXB0aW9uQ29uc3RyYWludHMge1xyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jXHJcbiAgY29uc3RydWN0b3IoY29kZWNzKSB7XHJcbiAgICAvKipcclxuICAgICAqIEBtZW1iZXIgez9BcnJheS48T3d0LkJhc2UuQXVkaW9Db2RlY1BhcmFtZXRlcnM+fSBjb2RlY3NcclxuICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICogQG1lbWJlcm9mIE93dC5Db25mZXJlbmNlLkF1ZGlvU3Vic2NyaXB0aW9uQ29uc3RyYWludHNcclxuICAgICAqIEBkZXNjIENvZGVjcyBhY2NlcHRlZC4gSWYgbm9uZSBvZiBgY29kZWNzYCBzdXBwb3J0ZWQgYnkgYm90aCBzaWRlcywgY29ubmVjdGlvbiBmYWlscy4gTGVhdmUgaXQgdW5kZWZpbmVkIHdpbGwgdXNlIGFsbCBwb3NzaWJsZSBjb2RlY3MuXHJcbiAgICAgKi9cclxuICAgIHRoaXMuY29kZWNzID0gY29kZWNzO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBWaWRlb1N1YnNjcmlwdGlvbkNvbnN0cmFpbnRzXHJcbiAqIEBtZW1iZXJPZiBPd3QuQ29uZmVyZW5jZVxyXG4gKiBAY2xhc3NEZXNjIFJlcHJlc2VudHMgdGhlIHZpZGVvIGNvbnN0cmFpbnRzIGZvciBzdWJzY3JpcHRpb24uXHJcbiAqIEBoaWRlY29uc3RydWN0b3JcclxuICovXHJcbmV4cG9ydCBjbGFzcyBWaWRlb1N1YnNjcmlwdGlvbkNvbnN0cmFpbnRzIHtcclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvY1xyXG4gIGNvbnN0cnVjdG9yKGNvZGVjcywgcmVzb2x1dGlvbiwgZnJhbWVSYXRlLCBiaXRyYXRlTXVsdGlwbGllcixcclxuICAgICAga2V5RnJhbWVJbnRlcnZhbCwgcmlkKSB7XHJcbiAgICAvKipcclxuICAgICAqIEBtZW1iZXIgez9BcnJheS48T3d0LkJhc2UuVmlkZW9Db2RlY1BhcmFtZXRlcnM+fSBjb2RlY3NcclxuICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICogQG1lbWJlcm9mIE93dC5Db25mZXJlbmNlLlZpZGVvU3Vic2NyaXB0aW9uQ29uc3RyYWludHNcclxuICAgICAqIEBkZXNjIENvZGVjcyBhY2NlcHRlZC4gSWYgbm9uZSBvZiBgY29kZWNzYCBzdXBwb3J0ZWQgYnkgYm90aCBzaWRlcywgY29ubmVjdGlvbiBmYWlscy4gTGVhdmUgaXQgdW5kZWZpbmVkIHdpbGwgdXNlIGFsbCBwb3NzaWJsZSBjb2RlY3MuXHJcbiAgICAgKi9cclxuICAgIHRoaXMuY29kZWNzID0gY29kZWNzO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAbWVtYmVyIHs/T3d0LkJhc2UuUmVzb2x1dGlvbn0gcmVzb2x1dGlvblxyXG4gICAgICogQGluc3RhbmNlXHJcbiAgICAgKiBAbWVtYmVyb2YgT3d0LkNvbmZlcmVuY2UuVmlkZW9TdWJzY3JpcHRpb25Db25zdHJhaW50c1xyXG4gICAgICogQGRlc2MgT25seSByZXNvbHV0aW9ucyBsaXN0ZWQgaW4gT3d0LkNvbmZlcmVuY2UuVmlkZW9TdWJzY3JpcHRpb25DYXBhYmlsaXRpZXMgYXJlIGFsbG93ZWQuXHJcbiAgICAgKi9cclxuICAgIHRoaXMucmVzb2x1dGlvbiA9IHJlc29sdXRpb247XHJcbiAgICAvKipcclxuICAgICAqIEBtZW1iZXIgez9udW1iZXJ9IGZyYW1lUmF0ZVxyXG4gICAgICogQGluc3RhbmNlXHJcbiAgICAgKiBAbWVtYmVyb2YgT3d0LkNvbmZlcmVuY2UuVmlkZW9TdWJzY3JpcHRpb25Db25zdHJhaW50c1xyXG4gICAgICogQGRlc2MgT25seSBmcmFtZVJhdGVzIGxpc3RlZCBpbiBPd3QuQ29uZmVyZW5jZS5WaWRlb1N1YnNjcmlwdGlvbkNhcGFiaWxpdGllcyBhcmUgYWxsb3dlZC5cclxuICAgICAqL1xyXG4gICAgdGhpcy5mcmFtZVJhdGUgPSBmcmFtZVJhdGU7XHJcbiAgICAvKipcclxuICAgICAqIEBtZW1iZXIgez9udW1iZXJ9IGJpdHJhdGVNdWx0aXBsaWVyXHJcbiAgICAgKiBAaW5zdGFuY2VcclxuICAgICAqIEBtZW1iZXJvZiBPd3QuQ29uZmVyZW5jZS5WaWRlb1N1YnNjcmlwdGlvbkNvbnN0cmFpbnRzXHJcbiAgICAgKiBAZGVzYyBPbmx5IGJpdHJhdGVNdWx0aXBsaWVycyBsaXN0ZWQgaW4gT3d0LkNvbmZlcmVuY2UuVmlkZW9TdWJzY3JpcHRpb25DYXBhYmlsaXRpZXMgYXJlIGFsbG93ZWQuXHJcbiAgICAgKi9cclxuICAgIHRoaXMuYml0cmF0ZU11bHRpcGxpZXIgPSBiaXRyYXRlTXVsdGlwbGllcjtcclxuICAgIC8qKlxyXG4gICAgICogQG1lbWJlciB7P251bWJlcn0ga2V5RnJhbWVJbnRlcnZhbFxyXG4gICAgICogQGluc3RhbmNlXHJcbiAgICAgKiBAbWVtYmVyb2YgT3d0LkNvbmZlcmVuY2UuVmlkZW9TdWJzY3JpcHRpb25Db25zdHJhaW50c1xyXG4gICAgICogQGRlc2MgT25seSBrZXlGcmFtZUludGVydmFscyBsaXN0ZWQgaW4gT3d0LkNvbmZlcmVuY2UuVmlkZW9TdWJzY3JpcHRpb25DYXBhYmlsaXRpZXMgYXJlIGFsbG93ZWQuXHJcbiAgICAgKi9cclxuICAgIHRoaXMua2V5RnJhbWVJbnRlcnZhbCA9IGtleUZyYW1lSW50ZXJ2YWw7XHJcbiAgICAvKipcclxuICAgICAqIEBtZW1iZXIgez9udW1iZXJ9IHJpZFxyXG4gICAgICogQGluc3RhbmNlXHJcbiAgICAgKiBAbWVtYmVyb2YgT3d0LkNvbmZlcmVuY2UuVmlkZW9TdWJzY3JpcHRpb25Db25zdHJhaW50c1xyXG4gICAgICogQGRlc2MgUmVzdHJpY3Rpb24gaWRlbnRpZmllciB0byBpZGVudGlmeSB0aGUgUlRQIFN0cmVhbXMgd2l0aGluIGFuIFJUUCBzZXNzaW9uLiBXaGVuIHJpZCBpcyBzcGVjaWZpZWQsIG90aGVyIGNvbnN0cmFpbnRzIHdpbGwgYmUgaWdub3JlZC5cclxuICAgICAqL1xyXG4gICAgdGhpcy5yaWQgPSByaWQ7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogQGNsYXNzIFN1YnNjcmliZU9wdGlvbnNcclxuICogQG1lbWJlck9mIE93dC5Db25mZXJlbmNlXHJcbiAqIEBjbGFzc0Rlc2MgU3Vic2NyaWJlT3B0aW9ucyBkZWZpbmVzIG9wdGlvbnMgZm9yIHN1YnNjcmliaW5nIGEgT3d0LkJhc2UuUmVtb3RlU3RyZWFtLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFN1YnNjcmliZU9wdGlvbnMge1xyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jXHJcbiAgY29uc3RydWN0b3IoYXVkaW8sIHZpZGVvKSB7XHJcbiAgICAvKipcclxuICAgICAqIEBtZW1iZXIgez9Pd3QuQ29uZmVyZW5jZS5BdWRpb1N1YnNjcmlwdGlvbkNvbnN0cmFpbnRzfSBhdWRpb1xyXG4gICAgICogQGluc3RhbmNlXHJcbiAgICAgKiBAbWVtYmVyb2YgT3d0LkNvbmZlcmVuY2UuU3Vic2NyaWJlT3B0aW9uc1xyXG4gICAgICovXHJcbiAgICB0aGlzLmF1ZGlvID0gYXVkaW87XHJcbiAgICAvKipcclxuICAgICAqIEBtZW1iZXIgez9Pd3QuQ29uZmVyZW5jZS5WaWRlb1N1YnNjcmlwdGlvbkNvbnN0cmFpbnRzfSB2aWRlb1xyXG4gICAgICogQGluc3RhbmNlXHJcbiAgICAgKiBAbWVtYmVyb2YgT3d0LkNvbmZlcmVuY2UuU3Vic2NyaWJlT3B0aW9uc1xyXG4gICAgICovXHJcbiAgICB0aGlzLnZpZGVvID0gdmlkZW87XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogQGNsYXNzIFZpZGVvU3Vic2NyaXB0aW9uVXBkYXRlT3B0aW9uc1xyXG4gKiBAbWVtYmVyT2YgT3d0LkNvbmZlcmVuY2VcclxuICogQGNsYXNzRGVzYyBWaWRlb1N1YnNjcmlwdGlvblVwZGF0ZU9wdGlvbnMgZGVmaW5lcyBvcHRpb25zIGZvciB1cGRhdGluZyBhIHN1YnNjcmlwdGlvbidzIHZpZGVvIHBhcnQuXHJcbiAqIEBoaWRlY29uc3RydWN0b3JcclxuICovXHJcbmV4cG9ydCBjbGFzcyBWaWRlb1N1YnNjcmlwdGlvblVwZGF0ZU9wdGlvbnMge1xyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAvKipcclxuICAgICAqIEBtZW1iZXIgez9Pd3QuQmFzZS5SZXNvbHV0aW9ufSByZXNvbHV0aW9uXHJcbiAgICAgKiBAaW5zdGFuY2VcclxuICAgICAqIEBtZW1iZXJvZiBPd3QuQ29uZmVyZW5jZS5WaWRlb1N1YnNjcmlwdGlvblVwZGF0ZU9wdGlvbnNcclxuICAgICAqIEBkZXNjIE9ubHkgcmVzb2x1dGlvbnMgbGlzdGVkIGluIFZpZGVvU3Vic2NyaXB0aW9uQ2FwYWJpbGl0aWVzIGFyZSBhbGxvd2VkLlxyXG4gICAgICovXHJcbiAgICB0aGlzLnJlc29sdXRpb24gPSB1bmRlZmluZWQ7XHJcbiAgICAvKipcclxuICAgICAqIEBtZW1iZXIgez9udW1iZXJ9IGZyYW1lUmF0ZXNcclxuICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICogQG1lbWJlcm9mIE93dC5Db25mZXJlbmNlLlZpZGVvU3Vic2NyaXB0aW9uVXBkYXRlT3B0aW9uc1xyXG4gICAgICogQGRlc2MgT25seSBmcmFtZVJhdGVzIGxpc3RlZCBpbiBWaWRlb1N1YnNjcmlwdGlvbkNhcGFiaWxpdGllcyBhcmUgYWxsb3dlZC5cclxuICAgICAqL1xyXG4gICAgdGhpcy5mcmFtZVJhdGUgPSB1bmRlZmluZWQ7XHJcbiAgICAvKipcclxuICAgICAqIEBtZW1iZXIgez9udW1iZXJ9IGJpdHJhdGVNdWx0aXBsaWVyc1xyXG4gICAgICogQGluc3RhbmNlXHJcbiAgICAgKiBAbWVtYmVyb2YgT3d0LkNvbmZlcmVuY2UuVmlkZW9TdWJzY3JpcHRpb25VcGRhdGVPcHRpb25zXHJcbiAgICAgKiBAZGVzYyBPbmx5IGJpdHJhdGVNdWx0aXBsaWVycyBsaXN0ZWQgaW4gVmlkZW9TdWJzY3JpcHRpb25DYXBhYmlsaXRpZXMgYXJlIGFsbG93ZWQuXHJcbiAgICAgKi9cclxuICAgIHRoaXMuYml0cmF0ZU11bHRpcGxpZXJzID0gdW5kZWZpbmVkO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAbWVtYmVyIHs/bnVtYmVyfSBrZXlGcmFtZUludGVydmFsc1xyXG4gICAgICogQGluc3RhbmNlXHJcbiAgICAgKiBAbWVtYmVyb2YgT3d0LkNvbmZlcmVuY2UuVmlkZW9TdWJzY3JpcHRpb25VcGRhdGVPcHRpb25zXHJcbiAgICAgKiBAZGVzYyBPbmx5IGtleUZyYW1lSW50ZXJ2YWxzIGxpc3RlZCBpbiBWaWRlb1N1YnNjcmlwdGlvbkNhcGFiaWxpdGllcyBhcmUgYWxsb3dlZC5cclxuICAgICAqL1xyXG4gICAgdGhpcy5rZXlGcmFtZUludGVydmFsID0gdW5kZWZpbmVkO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBTdWJzY3JpcHRpb25VcGRhdGVPcHRpb25zXHJcbiAqIEBtZW1iZXJPZiBPd3QuQ29uZmVyZW5jZVxyXG4gKiBAY2xhc3NEZXNjIFN1YnNjcmlwdGlvblVwZGF0ZU9wdGlvbnMgZGVmaW5lcyBvcHRpb25zIGZvciB1cGRhdGluZyBhIHN1YnNjcmlwdGlvbi5cclxuICogQGhpZGVjb25zdHJ1Y3RvclxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFN1YnNjcmlwdGlvblVwZGF0ZU9wdGlvbnMge1xyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAvKipcclxuICAgICAqIEBtZW1iZXIgez9WaWRlb1N1YnNjcmlwdGlvblVwZGF0ZU9wdGlvbnN9IHZpZGVvXHJcbiAgICAgKiBAaW5zdGFuY2VcclxuICAgICAqIEBtZW1iZXJvZiBPd3QuQ29uZmVyZW5jZS5TdWJzY3JpcHRpb25VcGRhdGVPcHRpb25zXHJcbiAgICAgKi9cclxuICAgIHRoaXMudmlkZW8gPSB1bmRlZmluZWQ7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogQGNsYXNzIFN1YnNjcmlwdGlvblxyXG4gKiBAbWVtYmVyb2YgT3d0LkNvbmZlcmVuY2VcclxuICogQGNsYXNzRGVzYyBTdWJzY3JpcHRpb24gaXMgYSByZWNlaXZlciBmb3IgcmVjZWl2aW5nIGEgc3RyZWFtLlxyXG4gKiBFdmVudHM6XHJcbiAqXHJcbiAqIHwgRXZlbnQgTmFtZSAgICAgIHwgQXJndW1lbnQgVHlwZSAgICB8IEZpcmVkIHdoZW4gICAgICAgfFxyXG4gKiB8IC0tLS0tLS0tLS0tLS0tLS18IC0tLS0tLS0tLS0tLS0tLS0gfCAtLS0tLS0tLS0tLS0tLS0tIHxcclxuICogfCBlbmRlZCAgICAgICAgICAgfCBFdmVudCAgICAgICAgICAgIHwgU3Vic2NyaXB0aW9uIGlzIGVuZGVkLiB8XHJcbiAqIHwgZXJyb3IgICAgICAgICAgIHwgRXJyb3JFdmVudCAgICAgICB8IEFuIGVycm9yIG9jY3VycmVkIG9uIHRoZSBzdWJzY3JpcHRpb24uIHxcclxuICogfCBtdXRlICAgICAgICAgICAgfCBNdXRlRXZlbnQgICAgICAgIHwgUHVibGljYXRpb24gaXMgbXV0ZWQuIFJlbW90ZSBzaWRlIHN0b3BwZWQgc2VuZGluZyBhdWRpbyBhbmQvb3IgdmlkZW8gZGF0YS4gfFxyXG4gKiB8IHVubXV0ZSAgICAgICAgICB8IE11dGVFdmVudCAgICAgICAgfCBQdWJsaWNhdGlvbiBpcyB1bm11dGVkLiBSZW1vdGUgc2lkZSBjb250aW51ZWQgc2VuZGluZyBhdWRpbyBhbmQvb3IgdmlkZW8gZGF0YS4gfFxyXG4gKlxyXG4gKiBAZXh0ZW5kcyBPd3QuQmFzZS5FdmVudERpc3BhdGNoZXJcclxuICogQGhpZGVjb25zdHJ1Y3RvclxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFN1YnNjcmlwdGlvbiBleHRlbmRzIEV2ZW50RGlzcGF0Y2hlciB7XHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2NcclxuICBjb25zdHJ1Y3RvcihpZCwgc3RvcCwgZ2V0U3RhdHMsIG11dGUsIHVubXV0ZSwgYXBwbHlPcHRpb25zKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgaWYgKCFpZCkge1xyXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJRCBjYW5ub3QgYmUgbnVsbCBvciB1bmRlZmluZWQuJyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEBtZW1iZXIge3N0cmluZ30gaWRcclxuICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICogQG1lbWJlcm9mIE93dC5Db25mZXJlbmNlLlN1YnNjcmlwdGlvblxyXG4gICAgICovXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2lkJywge1xyXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxyXG4gICAgICB3cml0YWJsZTogZmFsc2UsXHJcbiAgICAgIHZhbHVlOiBpZCxcclxuICAgIH0pO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAZnVuY3Rpb24gc3RvcFxyXG4gICAgICogQGluc3RhbmNlXHJcbiAgICAgKiBAZGVzYyBTdG9wIGNlcnRhaW4gc3Vic2NyaXB0aW9uLiBPbmNlIGEgc3Vic2NyaXB0aW9uIGlzIHN0b3BwZWQsIGl0IGNhbm5vdCBiZSByZWNvdmVyZWQuXHJcbiAgICAgKiBAbWVtYmVyb2YgT3d0LkNvbmZlcmVuY2UuU3Vic2NyaXB0aW9uXHJcbiAgICAgKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxyXG4gICAgICovXHJcbiAgICB0aGlzLnN0b3AgPSBzdG9wO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAZnVuY3Rpb24gZ2V0U3RhdHNcclxuICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICogQGRlc2MgR2V0IHN0YXRzIG9mIHVuZGVybHlpbmcgUGVlckNvbm5lY3Rpb24uXHJcbiAgICAgKiBAbWVtYmVyb2YgT3d0LkNvbmZlcmVuY2UuU3Vic2NyaXB0aW9uXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxSVENTdGF0c1JlcG9ydCwgRXJyb3I+fVxyXG4gICAgICovXHJcbiAgICB0aGlzLmdldFN0YXRzID0gZ2V0U3RhdHM7XHJcbiAgICAvKipcclxuICAgICAqIEBmdW5jdGlvbiBtdXRlXHJcbiAgICAgKiBAaW5zdGFuY2VcclxuICAgICAqIEBkZXNjIFN0b3AgcmVldmluZyBkYXRhIGZyb20gcmVtb3RlIGVuZHBvaW50LlxyXG4gICAgICogQG1lbWJlcm9mIE93dC5Db25mZXJlbmNlLlN1YnNjcmlwdGlvblxyXG4gICAgICogQHBhcmFtIHtPd3QuQmFzZS5UcmFja0tpbmQgfSBraW5kIEtpbmQgb2YgdHJhY2tzIHRvIGJlIG11dGVkLlxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dW5kZWZpbmVkLCBFcnJvcj59XHJcbiAgICAgKi9cclxuICAgIHRoaXMubXV0ZSA9IG11dGU7XHJcbiAgICAvKipcclxuICAgICAqIEBmdW5jdGlvbiB1bm11dGVcclxuICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICogQGRlc2MgQ29udGludWUgcmVldmluZyBkYXRhIGZyb20gcmVtb3RlIGVuZHBvaW50LlxyXG4gICAgICogQG1lbWJlcm9mIE93dC5Db25mZXJlbmNlLlN1YnNjcmlwdGlvblxyXG4gICAgICogQHBhcmFtIHtPd3QuQmFzZS5UcmFja0tpbmQgfSBraW5kIEtpbmQgb2YgdHJhY2tzIHRvIGJlIHVubXV0ZWQuXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx1bmRlZmluZWQsIEVycm9yPn1cclxuICAgICAqL1xyXG4gICAgdGhpcy51bm11dGUgPSB1bm11dGU7XHJcbiAgICAvKipcclxuICAgICAqIEBmdW5jdGlvbiBhcHBseU9wdGlvbnNcclxuICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICogQGRlc2MgVXBkYXRlIHN1YnNjcmlwdGlvbiB3aXRoIGdpdmVuIG9wdGlvbnMuXHJcbiAgICAgKiBAbWVtYmVyb2YgT3d0LkNvbmZlcmVuY2UuU3Vic2NyaXB0aW9uXHJcbiAgICAgKiBAcGFyYW0ge093dC5Db25mZXJlbmNlLlN1YnNjcmlwdGlvblVwZGF0ZU9wdGlvbnMgfSBvcHRpb25zIFN1YnNjcmlwdGlvbiB1cGRhdGUgb3B0aW9ucy5cclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHVuZGVmaW5lZCwgRXJyb3I+fVxyXG4gICAgICovXHJcbiAgICB0aGlzLmFwcGx5T3B0aW9ucyA9IGFwcGx5T3B0aW9ucztcclxuICB9XHJcbn1cclxuIiwiLy8gQ29weXJpZ2h0IChDKSA8MjAxOD4gSW50ZWwgQ29ycG9yYXRpb25cclxuLy9cclxuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcclxuXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAqIGFzIGJhc2UgZnJvbSAnLi9iYXNlL2V4cG9ydC5qcyc7XHJcbmltcG9ydCAqIGFzIHAycCBmcm9tICcuL3AycC9leHBvcnQuanMnO1xyXG5pbXBvcnQgKiBhcyBjb25mZXJlbmNlIGZyb20gJy4vY29uZmVyZW5jZS9leHBvcnQuanMnO1xyXG5cclxuLyoqXHJcbiAqIEJhc2Ugb2JqZWN0cyBmb3IgYm90aCBQMlAgYW5kIGNvbmZlcmVuY2UuXHJcbiAqIEBuYW1lc3BhY2UgT3d0LkJhc2VcclxuICovXHJcbmV4cG9ydCBjb25zdCBCYXNlID0gYmFzZTtcclxuXHJcbi8qKlxyXG4gKiBQMlAgV2ViUlRDIGNvbm5lY3Rpb25zLlxyXG4gKiBAbmFtZXNwYWNlIE93dC5QMlBcclxuICovXHJcbmV4cG9ydCBjb25zdCBQMlAgPSBwMnA7XHJcblxyXG4vKipcclxuICogV2ViUlRDIGNvbm5lY3Rpb25zIHdpdGggY29uZmVyZW5jZSBzZXJ2ZXIuXHJcbiAqIEBuYW1lc3BhY2UgT3d0LkNvbmZlcmVuY2VcclxuICovXHJcbmV4cG9ydCBjb25zdCBDb25mZXJlbmNlID0gY29uZmVyZW5jZTtcclxuIiwiLy8gQ29weXJpZ2h0IChDKSA8MjAxOD4gSW50ZWwgQ29ycG9yYXRpb25cclxuLy9cclxuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcclxuXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBjb25zdCBlcnJvcnMgPSB7XHJcbiAgLy8gMjEwMC0yOTk5IGZvciBQMlAgZXJyb3JzXHJcbiAgLy8gMjEwMC0yMTk5IGZvciBjb25uZWN0aW9uIGVycm9yc1xyXG4gIC8vIDIxMDAtMjEwOSBmb3Igc2VydmVyIGVycm9yc1xyXG4gIFAyUF9DT05OX1NFUlZFUl9VTktOT1dOOiB7XHJcbiAgICBjb2RlOiAyMTAwLFxyXG4gICAgbWVzc2FnZTogJ1NlcnZlciB1bmtub3duIGVycm9yLicsXHJcbiAgfSxcclxuICBQMlBfQ09OTl9TRVJWRVJfVU5BVkFJTEFCTEU6IHtcclxuICAgIGNvZGU6IDIxMDEsXHJcbiAgICBtZXNzYWdlOiAnU2VydmVyIGlzIHVuYXZhbGlhYmxlLicsXHJcbiAgfSxcclxuICBQMlBfQ09OTl9TRVJWRVJfQlVTWToge1xyXG4gICAgY29kZTogMjEwMixcclxuICAgIG1lc3NhZ2U6ICdTZXJ2ZXIgaXMgdG9vIGJ1c3kuJyxcclxuICB9LFxyXG4gIFAyUF9DT05OX1NFUlZFUl9OT1RfU1VQUE9SVEVEOiB7XHJcbiAgICBjb2RlOiAyMTAzLFxyXG4gICAgbWVzc2FnZTogJ01ldGhvZCBoYXMgbm90IGJlZW4gc3VwcG9ydGVkIGJ5IHNlcnZlci4nLFxyXG4gIH0sXHJcbiAgLy8gMjExMC0yMTE5IGZvciBjbGllbnQgZXJyb3JzXHJcbiAgUDJQX0NPTk5fQ0xJRU5UX1VOS05PV046IHtcclxuICAgIGNvZGU6IDIxMTAsXHJcbiAgICBtZXNzYWdlOiAnQ2xpZW50IHVua25vd24gZXJyb3IuJyxcclxuICB9LFxyXG4gIFAyUF9DT05OX0NMSUVOVF9OT1RfSU5JVElBTElaRUQ6IHtcclxuICAgIGNvZGU6IDIxMTEsXHJcbiAgICBtZXNzYWdlOiAnQ29ubmVjdGlvbiBpcyBub3QgaW5pdGlhbGl6ZWQuJyxcclxuICB9LFxyXG4gIC8vIDIxMjAtMjEyOSBmb3IgYXV0aGVudGljYXRpb24gZXJyb3JzXHJcbiAgUDJQX0NPTk5fQVVUSF9VTktOT1dOOiB7XHJcbiAgICBjb2RlOiAyMTIwLFxyXG4gICAgbWVzc2FnZTogJ0F1dGhlbnRpY2F0aW9uIHVua25vd24gZXJyb3IuJyxcclxuICB9LFxyXG4gIFAyUF9DT05OX0FVVEhfRkFJTEVEOiB7XHJcbiAgICBjb2RlOiAyMTIxLFxyXG4gICAgbWVzc2FnZTogJ1dyb25nIHVzZXJuYW1lIG9yIHRva2VuLicsXHJcbiAgfSxcclxuICAvLyAyMjAwLTIyOTkgZm9yIG1lc3NhZ2UgdHJhbnNwb3J0IGVycm9yc1xyXG4gIFAyUF9NRVNTQUdJTkdfVEFSR0VUX1VOUkVBQ0hBQkxFOiB7XHJcbiAgICBjb2RlOiAyMjAxLFxyXG4gICAgbWVzc2FnZTogJ1JlbW90ZSB1c2VyIGNhbm5vdCBiZSByZWFjaGVkLicsXHJcbiAgfSxcclxuICBQMlBfQ0xJRU5UX0RFTklFRDoge1xyXG4gICAgY29kZTogMjIwMixcclxuICAgIG1lc3NhZ2U6ICdVc2VyIGlzIGRlbmllZC4nLFxyXG4gIH0sXHJcbiAgLy8gMjMwMS0yMzk5IGZvciBjaGF0IHJvb20gZXJyb3JzXHJcbiAgLy8gMjQwMS0yNDk5IGZvciBjbGllbnQgZXJyb3JzXHJcbiAgUDJQX0NMSUVOVF9VTktOT1dOOiB7XHJcbiAgICBjb2RlOiAyNDAwLFxyXG4gICAgbWVzc2FnZTogJ1Vua25vd24gZXJyb3JzLicsXHJcbiAgfSxcclxuICBQMlBfQ0xJRU5UX1VOU1VQUE9SVEVEX01FVEhPRDoge1xyXG4gICAgY29kZTogMjQwMSxcclxuICAgIG1lc3NhZ2U6ICdUaGlzIG1ldGhvZCBpcyB1bnN1cHBvcnRlZCBpbiBjdXJyZW50IGJyb3dzZXIuJyxcclxuICB9LFxyXG4gIFAyUF9DTElFTlRfSUxMRUdBTF9BUkdVTUVOVDoge1xyXG4gICAgY29kZTogMjQwMixcclxuICAgIG1lc3NhZ2U6ICdJbGxlZ2FsIGFyZ3VtZW50LicsXHJcbiAgfSxcclxuICBQMlBfQ0xJRU5UX0lOVkFMSURfU1RBVEU6IHtcclxuICAgIGNvZGU6IDI0MDMsXHJcbiAgICBtZXNzYWdlOiAnSW52YWxpZCBwZWVyIHN0YXRlLicsXHJcbiAgfSxcclxuICBQMlBfQ0xJRU5UX05PVF9BTExPV0VEOiB7XHJcbiAgICBjb2RlOiAyNDA0LFxyXG4gICAgbWVzc2FnZTogJ1JlbW90ZSB1c2VyIGlzIG5vdCBhbGxvd2VkLicsXHJcbiAgfSxcclxuICAvLyAyNTAxLTI1OTkgZm9yIFdlYlJUQyBlcnJvcy5cclxuICBQMlBfV0VCUlRDX1VOS05PV046IHtcclxuICAgIGNvZGU6IDI1MDAsXHJcbiAgICBtZXNzYWdlOiAnV2ViUlRDIGVycm9yLicsXHJcbiAgfSxcclxuICBQMlBfV0VCUlRDX1NEUDoge1xyXG4gICAgY29kZTogMjUwMixcclxuICAgIG1lc3NhZ2U6ICdTRFAgZXJyb3IuJyxcclxuICB9LFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBmdW5jdGlvbiBnZXRFcnJvckJ5Q29kZVxyXG4gKiBAZGVzYyBHZXQgZXJyb3Igb2JqZWN0IGJ5IGVycm9yIGNvZGUuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBlcnJvckNvZGUgRXJyb3IgY29kZS5cclxuICogQHJldHVybiB7T3d0LlAyUC5FcnJvcn0gRXJyb3Igb2JqZWN0XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RXJyb3JCeUNvZGUoZXJyb3JDb2RlKSB7XHJcbiAgY29uc3QgY29kZUVycm9yTWFwID0ge1xyXG4gICAgMjEwMDogZXJyb3JzLlAyUF9DT05OX1NFUlZFUl9VTktOT1dOLFxyXG4gICAgMjEwMTogZXJyb3JzLlAyUF9DT05OX1NFUlZFUl9VTkFWQUlMQUJMRSxcclxuICAgIDIxMDI6IGVycm9ycy5QMlBfQ09OTl9TRVJWRVJfQlVTWSxcclxuICAgIDIxMDM6IGVycm9ycy5QMlBfQ09OTl9TRVJWRVJfTk9UX1NVUFBPUlRFRCxcclxuICAgIDIxMTA6IGVycm9ycy5QMlBfQ09OTl9DTElFTlRfVU5LTk9XTixcclxuICAgIDIxMTE6IGVycm9ycy5QMlBfQ09OTl9DTElFTlRfTk9UX0lOSVRJQUxJWkVELFxyXG4gICAgMjEyMDogZXJyb3JzLlAyUF9DT05OX0FVVEhfVU5LTk9XTixcclxuICAgIDIxMjE6IGVycm9ycy5QMlBfQ09OTl9BVVRIX0ZBSUxFRCxcclxuICAgIDIyMDE6IGVycm9ycy5QMlBfTUVTU0FHSU5HX1RBUkdFVF9VTlJFQUNIQUJMRSxcclxuICAgIDI0MDA6IGVycm9ycy5QMlBfQ0xJRU5UX1VOS05PV04sXHJcbiAgICAyNDAxOiBlcnJvcnMuUDJQX0NMSUVOVF9VTlNVUFBPUlRFRF9NRVRIT0QsXHJcbiAgICAyNDAyOiBlcnJvcnMuUDJQX0NMSUVOVF9JTExFR0FMX0FSR1VNRU5ULFxyXG4gICAgMjQwMzogZXJyb3JzLlAyUF9DTElFTlRfSU5WQUxJRF9TVEFURSxcclxuICAgIDI0MDQ6IGVycm9ycy5QMlBfQ0xJRU5UX05PVF9BTExPV0VELFxyXG4gICAgMjUwMDogZXJyb3JzLlAyUF9XRUJSVENfVU5LTk9XTixcclxuICAgIDI1MDE6IGVycm9ycy5QMlBfV0VCUlRDX1NEUCxcclxuICB9O1xyXG4gIHJldHVybiBjb2RlRXJyb3JNYXBbZXJyb3JDb2RlXTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBQMlBFcnJvclxyXG4gKiBAY2xhc3NEZXNjIFRoZSBQMlBFcnJvciBvYmplY3QgcmVwcmVzZW50cyBhbiBlcnJvciBpbiBQMlAgbW9kZS5cclxuICogQG1lbWJlck9mIE93dC5QMlBcclxuICogQGhpZGVjb25zdHJ1Y3RvclxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFAyUEVycm9yIGV4dGVuZHMgRXJyb3Ige1xyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jXHJcbiAgY29uc3RydWN0b3IoZXJyb3IsIG1lc3NhZ2UpIHtcclxuICAgIHN1cGVyKG1lc3NhZ2UpO1xyXG4gICAgaWYgKHR5cGVvZiBlcnJvciA9PT0gJ251bWJlcicpIHtcclxuICAgICAgdGhpcy5jb2RlID0gZXJyb3I7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNvZGUgPSBlcnJvci5jb2RlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCIvLyBDb3B5cmlnaHQgKEMpIDwyMDE4PiBJbnRlbCBDb3Jwb3JhdGlvblxyXG4vL1xyXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxyXG5cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuZXhwb3J0IHtkZWZhdWx0IGFzIFAyUENsaWVudH0gZnJvbSAnLi9wMnBjbGllbnQuanMnO1xyXG5leHBvcnQge1AyUEVycm9yfSBmcm9tICcuL2Vycm9yLmpzJztcclxuIiwiLy8gQ29weXJpZ2h0IChDKSA8MjAxOD4gSW50ZWwgQ29ycG9yYXRpb25cclxuLy9cclxuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcclxuXHJcbi8qIGdsb2JhbCBNYXAsIFByb21pc2UgKi9cclxuXHJcbid1c2Ugc3RyaWN0JztcclxuaW1wb3J0IExvZ2dlciBmcm9tICcuLi9iYXNlL2xvZ2dlci5qcyc7XHJcbmltcG9ydCB7RXZlbnREaXNwYXRjaGVyLCBPd3RFdmVudH0gZnJvbSAnLi4vYmFzZS9ldmVudC5qcyc7XHJcbmltcG9ydCAqIGFzIFV0aWxzIGZyb20gJy4uL2Jhc2UvdXRpbHMuanMnO1xyXG5pbXBvcnQgKiBhcyBFcnJvck1vZHVsZSBmcm9tICcuL2Vycm9yLmpzJztcclxuaW1wb3J0IFAyUFBlZXJDb25uZWN0aW9uQ2hhbm5lbCBmcm9tICcuL3BlZXJjb25uZWN0aW9uLWNoYW5uZWwuanMnO1xyXG5cclxuY29uc3QgQ29ubmVjdGlvblN0YXRlID0ge1xyXG4gIFJFQURZOiAxLFxyXG4gIENPTk5FQ1RJTkc6IDIsXHJcbiAgQ09OTkVDVEVEOiAzLFxyXG59O1xyXG5cclxuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cclxuLyoqXHJcbiAqIEBjbGFzcyBQMlBDbGllbnRDb25maWd1cmF0aW9uXHJcbiAqIEBjbGFzc0Rlc2MgQ29uZmlndXJhdGlvbiBmb3IgUDJQQ2xpZW50LlxyXG4gKiBAbWVtYmVyT2YgT3d0LlAyUFxyXG4gKiBAaGlkZWNvbnN0cnVjdG9yXHJcbiAqL1xyXG5jb25zdCBQMlBDbGllbnRDb25maWd1cmF0aW9uID0gZnVuY3Rpb24oKSB7XHJcbiAgLyoqXHJcbiAgICogQG1lbWJlciB7P0FycmF5PE93dC5CYXNlLkF1ZGlvRW5jb2RpbmdQYXJhbWV0ZXJzPn0gYXVkaW9FbmNvZGluZ1xyXG4gICAqIEBpbnN0YW5jZVxyXG4gICAqIEBkZXNjIEVuY29kaW5nIHBhcmFtZXRlcnMgZm9yIHB1Ymxpc2hpbmcgYXVkaW8gdHJhY2tzLlxyXG4gICAqIEBtZW1iZXJvZiBPd3QuUDJQLlAyUENsaWVudENvbmZpZ3VyYXRpb25cclxuICAgKi9cclxuICB0aGlzLmF1ZGlvRW5jb2RpbmcgPSB1bmRlZmluZWQ7XHJcbiAgLyoqXHJcbiAgICogQG1lbWJlciB7P0FycmF5PE93dC5CYXNlLlZpZGVvRW5jb2RpbmdQYXJhbWV0ZXJzPn0gdmlkZW9FbmNvZGluZ1xyXG4gICAqIEBpbnN0YW5jZVxyXG4gICAqIEBkZXNjIEVuY29kaW5nIHBhcmFtZXRlcnMgZm9yIHB1Ymxpc2hpbmcgdmlkZW8gdHJhY2tzLlxyXG4gICAqIEBtZW1iZXJvZiBPd3QuUDJQLlAyUENsaWVudENvbmZpZ3VyYXRpb25cclxuICAgKi9cclxuICB0aGlzLnZpZGVvRW5jb2RpbmcgPSB1bmRlZmluZWQ7XHJcbiAgLyoqXHJcbiAgICogQG1lbWJlciB7P1JUQ0NvbmZpZ3VyYXRpb259IHJ0Y0NvbmZpZ3VyYXRpb25cclxuICAgKiBAaW5zdGFuY2VcclxuICAgKiBAbWVtYmVyb2YgT3d0LlAyUC5QMlBDbGllbnRDb25maWd1cmF0aW9uXHJcbiAgICogQGRlc2MgSXQgd2lsbCBiZSB1c2VkIGZvciBjcmVhdGluZyBQZWVyQ29ubmVjdGlvbi5cclxuICAgKiBAc2VlIHtAbGluayBodHRwczovL3d3dy53My5vcmcvVFIvd2VicnRjLyNydGNjb25maWd1cmF0aW9uLWRpY3Rpb25hcnl8UlRDQ29uZmlndXJhdGlvbiBEaWN0aW9uYXJ5IG9mIFdlYlJUQyAxLjB9LlxyXG4gICAqIEBleGFtcGxlXHJcbiAgICogLy8gRm9sbG93aW5nIG9iamVjdCBjYW4gYmUgc2V0IHRvIHAycENsaWVudENvbmZpZ3VyYXRpb24ucnRjQ29uZmlndXJhdGlvbi5cclxuICAgKiB7XHJcbiAgICogICBpY2VTZXJ2ZXJzOiBbe1xyXG4gICAqICAgICAgdXJsczogXCJzdHVuOmV4YW1wbGUuY29tOjM0NzhcIlxyXG4gICAqICAgfSwge1xyXG4gICAqICAgICB1cmxzOiBbXHJcbiAgICogICAgICAgXCJ0dXJuOmV4YW1wbGUuY29tOjM0Nzg/dHJhbnNwb3J0PXVkcFwiLFxyXG4gICAqICAgICAgIFwidHVybjpleGFtcGxlLmNvbTozNDc4P3RyYW5zcG9ydD10Y3BcIlxyXG4gICAqICAgICBdLFxyXG4gICAqICAgICAgY3JlZGVudGlhbDogXCJwYXNzd29yZFwiLFxyXG4gICAqICAgICAgdXNlcm5hbWU6IFwidXNlcm5hbWVcIlxyXG4gICAqICAgfVxyXG4gICAqIH1cclxuICAgKi9cclxuICB0aGlzLnJ0Y0NvbmZpZ3VyYXRpb24gPSB1bmRlZmluZWQ7XHJcbn07XHJcbi8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLXZhcnMgKi9cclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgUDJQQ2xpZW50XHJcbiAqIEBjbGFzc0Rlc2MgVGhlIFAyUENsaWVudCBoYW5kbGVzIFBlZXJDb25uZWN0aW9ucyBiZXR3ZWVuIGRpZmZlcmVudCBjbGllbnRzLlxyXG4gKiBFdmVudHM6XHJcbiAqXHJcbiAqIHwgRXZlbnQgTmFtZSAgICAgICAgICAgIHwgQXJndW1lbnQgVHlwZSAgICB8IEZpcmVkIHdoZW4gICAgICAgfFxyXG4gKiB8IC0tLS0tLS0tLS0tLS0tLS0tLS0tLSB8IC0tLS0tLS0tLS0tLS0tLS0gfCAtLS0tLS0tLS0tLS0tLS0tIHxcclxuICogfCBzdHJlYW1hZGRlZCAgICAgICAgICAgfCBTdHJlYW1FdmVudCAgICAgIHwgQSBuZXcgc3RyZWFtIGlzIHNlbnQgZnJvbSByZW1vdGUgZW5kcG9pbnQuIHxcclxuICogfCBtZXNzYWdlcmVjZWl2ZWQgICAgICAgfCBNZXNzYWdlRXZlbnQgICAgIHwgQSBuZXcgbWVzc2FnZSBpcyByZWNlaXZlZC4gfFxyXG4gKiB8IHNlcnZlcmRpc2Nvbm5lY3RlZCAgICB8IE93dEV2ZW50ICAgICAgICAgfCBEaXNjb25uZWN0ZWQgZnJvbSBzaWduYWxpbmcgc2VydmVyLiB8XHJcbiAqXHJcbiAqIEBtZW1iZXJvZiBPd3QuUDJQXHJcbiAqIEBleHRlbmRzIE93dC5CYXNlLkV2ZW50RGlzcGF0Y2hlclxyXG4gKiBAY29uc3RydWN0b3JcclxuICogQHBhcmFtIHs/T3d0LlAyUC5QMlBDbGllbnRDb25maWd1cmF0aW9uIH0gY29uZmlndXJhdGlvbiBDb25maWd1cmF0aW9uIGZvciBPd3QuUDJQLlAyUENsaWVudC5cclxuICogQHBhcmFtIHtPYmplY3R9IHNpZ25hbGluZ0NoYW5uZWwgQSBjaGFubmVsIGZvciBzZW5kaW5nIGFuZCByZWNlaXZpbmcgc2lnbmFsaW5nIG1lc3NhZ2VzLlxyXG4gKi9cclxuY29uc3QgUDJQQ2xpZW50ID0gZnVuY3Rpb24oY29uZmlndXJhdGlvbiwgc2lnbmFsaW5nQ2hhbm5lbCkge1xyXG4gIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBuZXcgRXZlbnREaXNwYXRjaGVyKCkpO1xyXG4gIGNvbnN0IGNvbmZpZyA9IGNvbmZpZ3VyYXRpb247XHJcbiAgY29uc3Qgc2lnbmFsaW5nID0gc2lnbmFsaW5nQ2hhbm5lbDtcclxuICBjb25zdCBjaGFubmVscyA9IG5ldyBNYXAoKTsgLy8gTWFwIG9mIFBlZXJDb25uZWN0aW9uQ2hhbm5lbHMuXHJcbiAgY29uc3Qgc2VsZj10aGlzO1xyXG4gIGxldCBzdGF0ZSA9IENvbm5lY3Rpb25TdGF0ZS5SRUFEWTtcclxuICBsZXQgbXlJZDtcclxuXHJcbiAgc2lnbmFsaW5nLm9uTWVzc2FnZSA9IGZ1bmN0aW9uKG9yaWdpbiwgbWVzc2FnZSkge1xyXG4gICAgTG9nZ2VyLmRlYnVnKCdSZWNlaXZlZCBzaWduYWxpbmcgbWVzc2FnZSBmcm9tICcgKyBvcmlnaW4gKyAnOiAnICsgbWVzc2FnZSk7XHJcbiAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShtZXNzYWdlKTtcclxuICAgIGlmIChkYXRhLnR5cGUgPT09ICdjaGF0LWNsb3NlZCcpIHtcclxuICAgICAgaWYgKGNoYW5uZWxzLmhhcyhvcmlnaW4pKSB7XHJcbiAgICAgICAgZ2V0T3JDcmVhdGVDaGFubmVsKG9yaWdpbikub25NZXNzYWdlKGRhdGEpO1xyXG4gICAgICAgIGNoYW5uZWxzLmRlbGV0ZShvcmlnaW4pO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChzZWxmLmFsbG93ZWRSZW1vdGVJZHMuaW5kZXhPZihvcmlnaW4pID49IDApIHtcclxuICAgICAgZ2V0T3JDcmVhdGVDaGFubmVsKG9yaWdpbikub25NZXNzYWdlKGRhdGEpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2VuZFNpZ25hbGluZ01lc3NhZ2Uob3JpZ2luLCAnY2hhdC1jbG9zZWQnLFxyXG4gICAgICAgICAgRXJyb3JNb2R1bGUuZXJyb3JzLlAyUF9DTElFTlRfREVOSUVEKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBzaWduYWxpbmcub25TZXJ2ZXJEaXNjb25uZWN0ZWQgPSBmdW5jdGlvbigpIHtcclxuICAgIHN0YXRlID0gQ29ubmVjdGlvblN0YXRlLlJFQURZO1xyXG4gICAgc2VsZi5kaXNwYXRjaEV2ZW50KG5ldyBPd3RFdmVudCgnc2VydmVyZGlzY29ubmVjdGVkJykpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIEBtZW1iZXIge2FycmF5fSBhbGxvd2VkUmVtb3RlSWRzXHJcbiAgICogQG1lbWJlcm9mIE93dC5QMlAuUDJQQ2xpZW50XHJcbiAgICogQGluc3RhbmNlXHJcbiAgICogQGRlc2MgT25seSBhbGxvd2VkIHJlbW90ZSBlbmRwb2ludCBJRHMgYXJlIGFibGUgdG8gcHVibGlzaCBzdHJlYW0gb3Igc2VuZCBtZXNzYWdlIHRvIGN1cnJlbnQgZW5kcG9pbnQuIFJlbW92aW5nIGFuIElEIGZyb20gYWxsb3dlZFJlbW90ZUlkcyBkb2VzIHN0b3AgZXhpc3RpbmcgY29ubmVjdGlvbiB3aXRoIGNlcnRhaW4gZW5kcG9pbnQuIFBsZWFzZSBjYWxsIHN0b3AgdG8gc3RvcCB0aGUgUGVlckNvbm5lY3Rpb24uXHJcbiAgICovXHJcbiAgdGhpcy5hbGxvd2VkUmVtb3RlSWRzPVtdO1xyXG5cclxuICAvKipcclxuICAgKiBAZnVuY3Rpb24gY29ubmVjdFxyXG4gICAqIEBpbnN0YW5jZVxyXG4gICAqIEBkZXNjIENvbm5lY3QgdG8gc2lnbmFsaW5nIHNlcnZlci4gU2luY2Ugc2lnbmFsaW5nIGNhbiBiZSBjdXN0b21pemVkLCB0aGlzIG1ldGhvZCBkb2VzIG5vdCBkZWZpbmUgaG93IGEgdG9rZW4gbG9va3MgbGlrZS4gU0RLIHBhc3NlcyB0b2tlbiB0byBzaWduYWxpbmcgY2hhbm5lbCB3aXRob3V0IGNoYW5nZXMuXHJcbiAgICogQG1lbWJlcm9mIE93dC5QMlAuUDJQQ2xpZW50XHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRva2VuIEEgdG9rZW4gZm9yIGNvbm5lY3RpbmcgdG8gc2lnbmFsaW5nIHNlcnZlci4gVGhlIGZvcm1hdCBvZiB0aGlzIHRva2VuIGRlcGVuZHMgb24gc2lnbmFsaW5nIHNlcnZlcidzIHJlcXVpcmVtZW50LlxyXG4gICAqIEByZXR1cm4ge1Byb21pc2U8b2JqZWN0LCBFcnJvcj59IEl0IHJldHVybnMgYSBwcm9taXNlIHJlc29sdmVkIHdpdGggYW4gb2JqZWN0IHJldHVybmVkIGJ5IHNpZ25hbGluZyBjaGFubmVsIG9uY2Ugc2lnbmFsaW5nIGNoYW5uZWwgcmVwb3J0cyBjb25uZWN0aW9uIGhhcyBiZWVuIGVzdGFibGlzaGVkLlxyXG4gICAqL1xyXG4gIHRoaXMuY29ubmVjdCA9IGZ1bmN0aW9uKHRva2VuKSB7XHJcbiAgICBpZiAoc3RhdGUgPT09IENvbm5lY3Rpb25TdGF0ZS5SRUFEWSkge1xyXG4gICAgICBzdGF0ZSA9IENvbm5lY3Rpb25TdGF0ZS5DT05ORUNUSU5HO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgTG9nZ2VyLndhcm5pbmcoJ0ludmFsaWQgY29ubmVjdGlvbiBzdGF0ZTogJyArIHN0YXRlKTtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvck1vZHVsZS5QMlBFcnJvcihcclxuICAgICAgICAgIEVycm9yTW9kdWxlLmVycm9ycy5QMlBfQ0xJRU5UX0lOVkFMSURfU1RBVEUpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHNpZ25hbGluZy5jb25uZWN0KHRva2VuKS50aGVuKChpZCkgPT4ge1xyXG4gICAgICAgIG15SWQgPSBpZDtcclxuICAgICAgICBzdGF0ZSA9IENvbm5lY3Rpb25TdGF0ZS5DT05ORUNURUQ7XHJcbiAgICAgICAgcmVzb2x2ZShteUlkKTtcclxuICAgICAgfSwgKGVyckNvZGUpID0+IHtcclxuICAgICAgICByZWplY3QobmV3IEVycm9yTW9kdWxlLlAyUEVycm9yKEVycm9yTW9kdWxlLmdldEVycm9yQnlDb2RlKFxyXG4gICAgICAgICAgICBlcnJDb2RlKSkpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIEBmdW5jdGlvbiBkaXNjb25uZWN0XHJcbiAgICogQGluc3RhbmNlXHJcbiAgICogQGRlc2MgRGlzY29ubmVjdCBmcm9tIHRoZSBzaWduYWxpbmcgY2hhbm5lbC4gSXQgc3RvcHMgYWxsIGV4aXN0aW5nIHNlc3Npb25zIHdpdGggcmVtb3RlIGVuZHBvaW50cy5cclxuICAgKiBAbWVtYmVyb2YgT3d0LlAyUC5QMlBDbGllbnRcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx1bmRlZmluZWQsIEVycm9yPn1cclxuICAgKi9cclxuICB0aGlzLmRpc2Nvbm5lY3QgPSBmdW5jdGlvbigpIHtcclxuICAgIGlmIChzdGF0ZSA9PSBDb25uZWN0aW9uU3RhdGUuUkVBRFkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY2hhbm5lbHMuZm9yRWFjaCgoY2hhbm5lbCk9PntcclxuICAgICAgY2hhbm5lbC5zdG9wKCk7XHJcbiAgICB9KTtcclxuICAgIGNoYW5uZWxzLmNsZWFyKCk7XHJcbiAgICBzaWduYWxpbmcuZGlzY29ubmVjdCgpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIEBmdW5jdGlvbiBwdWJsaXNoXHJcbiAgICogQGluc3RhbmNlXHJcbiAgICogQGRlc2MgUHVibGlzaCBhIHN0cmVhbSB0byBhIHJlbW90ZSBlbmRwb2ludC5cclxuICAgKiBAbWVtYmVyb2YgT3d0LlAyUC5QMlBDbGllbnRcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVtb3RlSWQgUmVtb3RlIGVuZHBvaW50J3MgSUQuXHJcbiAgICogQHBhcmFtIHtPd3QuQmFzZS5Mb2NhbFN0cmVhbX0gc3RyZWFtIEFuIE93dC5CYXNlLkxvY2FsU3RyZWFtIHRvIGJlIHB1Ymxpc2hlZC5cclxuICAgKiBAcmV0dXJuIHtQcm9taXNlPE93dC5CYXNlLlB1YmxpY2F0aW9uLCBFcnJvcj59IEEgcHJvbWlzZWQgdGhhdCByZXNvbHZlcyB3aGVuIHJlbW90ZSBzaWRlIHJlY2VpdmVkIHRoZSBjZXJ0YWluIHN0cmVhbS4gSG93ZXZlciwgcmVtb3RlIGVuZHBvaW50IG1heSBub3QgZGlzcGxheSB0aGlzIHN0cmVhbSwgb3IgaWdub3JlIGl0LlxyXG4gICAqL1xyXG4gIHRoaXMucHVibGlzaCA9IGZ1bmN0aW9uKHJlbW90ZUlkLCBzdHJlYW0pIHtcclxuICAgIGlmIChzdGF0ZSAhPT0gQ29ubmVjdGlvblN0YXRlLkNPTk5FQ1RFRCkge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yTW9kdWxlLlAyUEVycm9yKFxyXG4gICAgICAgICAgRXJyb3JNb2R1bGUuZXJyb3JzLlAyUF9DTElFTlRfSU5WQUxJRF9TVEFURSxcclxuICAgICAgICAgICdQMlAgQ2xpZW50IGlzIG5vdCBjb25uZWN0ZWQgdG8gc2lnbmFsaW5nIGNoYW5uZWwuJykpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuYWxsb3dlZFJlbW90ZUlkcy5pbmRleE9mKHJlbW90ZUlkKSA8IDApIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvck1vZHVsZS5QMlBFcnJvcihcclxuICAgICAgICAgIEVycm9yTW9kdWxlLmVycm9ycy5QMlBfQ0xJRU5UX05PVF9BTExPV0VEKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGdldE9yQ3JlYXRlQ2hhbm5lbChyZW1vdGVJZCkucHVibGlzaChzdHJlYW0pKTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBAZnVuY3Rpb24gc2VuZFxyXG4gICAqIEBpbnN0YW5jZVxyXG4gICAqIEBkZXNjIFNlbmQgYSBtZXNzYWdlIHRvIHJlbW90ZSBlbmRwb2ludC5cclxuICAgKiBAbWVtYmVyb2YgT3d0LlAyUC5QMlBDbGllbnRcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVtb3RlSWQgUmVtb3RlIGVuZHBvaW50J3MgSUQuXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgTWVzc2FnZSB0byBiZSBzZW50LiBJdCBzaG91bGQgYmUgYSBzdHJpbmcuXHJcbiAgICogQHJldHVybiB7UHJvbWlzZTx1bmRlZmluZWQsIEVycm9yPn0gSXQgcmV0dXJucyBhIHByb21pc2UgcmVzb2x2ZWQgd2hlbiByZW1vdGUgZW5kcG9pbnQgcmVjZWl2ZWQgY2VydGFpbiBtZXNzYWdlLlxyXG4gICAqL1xyXG4gIHRoaXMuc2VuZD1mdW5jdGlvbihyZW1vdGVJZCwgbWVzc2FnZSkge1xyXG4gICAgaWYgKHN0YXRlICE9PSBDb25uZWN0aW9uU3RhdGUuQ09OTkVDVEVEKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3JNb2R1bGUuUDJQRXJyb3IoXHJcbiAgICAgICAgICBFcnJvck1vZHVsZS5lcnJvcnMuUDJQX0NMSUVOVF9JTlZBTElEX1NUQVRFLFxyXG4gICAgICAgICAgJ1AyUCBDbGllbnQgaXMgbm90IGNvbm5lY3RlZCB0byBzaWduYWxpbmcgY2hhbm5lbC4nKSk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5hbGxvd2VkUmVtb3RlSWRzLmluZGV4T2YocmVtb3RlSWQpIDwgMCkge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yTW9kdWxlLlAyUEVycm9yKFxyXG4gICAgICAgICAgRXJyb3JNb2R1bGUuZXJyb3JzLlAyUF9DTElFTlRfTk9UX0FMTE9XRUQpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZ2V0T3JDcmVhdGVDaGFubmVsKHJlbW90ZUlkKS5zZW5kKG1lc3NhZ2UpKTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBAZnVuY3Rpb24gc3RvcFxyXG4gICAqIEBpbnN0YW5jZVxyXG4gICAqIEBkZXNjIENsZWFuIGFsbCByZXNvdXJjZXMgYXNzb2NpYXRlZCB3aXRoIGdpdmVuIHJlbW90ZSBlbmRwb2ludC4gSXQgbWF5IGluY2x1ZGUgUlRDUGVlckNvbm5lY3Rpb24sIFJUQ1J0cFRyYW5zY2VpdmVyIGFuZCBSVENEYXRhQ2hhbm5lbC4gSXQgc3RpbGwgcG9zc2libGUgdG8gcHVibGlzaCBhIHN0cmVhbSwgb3Igc2VuZCBhIG1lc3NhZ2UgdG8gZ2l2ZW4gcmVtb3RlIGVuZHBvaW50IGFmdGVyIHN0b3AuXHJcbiAgICogQG1lbWJlcm9mIE93dC5QMlAuUDJQQ2xpZW50XHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlbW90ZUlkIFJlbW90ZSBlbmRwb2ludCdzIElELlxyXG4gICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cclxuICAgKi9cclxuICB0aGlzLnN0b3AgPSBmdW5jdGlvbihyZW1vdGVJZCkge1xyXG4gICAgaWYgKCFjaGFubmVscy5oYXMocmVtb3RlSWQpKSB7XHJcbiAgICAgIExvZ2dlci53YXJuaW5nKFxyXG4gICAgICAgICAgJ05vIFBlZXJDb25uZWN0aW9uIGJldHdlZW4gY3VycmVudCBlbmRwb2ludCBhbmQgc3BlY2lmaWMgcmVtb3RlICcgK1xyXG4gICAgICAgICAgJ2VuZHBvaW50LidcclxuICAgICAgKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY2hhbm5lbHMuZ2V0KHJlbW90ZUlkKS5zdG9wKCk7XHJcbiAgICBjaGFubmVscy5kZWxldGUocmVtb3RlSWQpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIEBmdW5jdGlvbiBnZXRTdGF0c1xyXG4gICAqIEBpbnN0YW5jZVxyXG4gICAqIEBkZXNjIEdldCBzdGF0cyBvZiB1bmRlcmx5aW5nIFBlZXJDb25uZWN0aW9uLlxyXG4gICAqIEBtZW1iZXJvZiBPd3QuUDJQLlAyUENsaWVudFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZW1vdGVJZCBSZW1vdGUgZW5kcG9pbnQncyBJRC5cclxuICAgKiBAcmV0dXJuIHtQcm9taXNlPFJUQ1N0YXRzUmVwb3J0LCBFcnJvcj59IEl0IHJldHVybnMgYSBwcm9taXNlIHJlc29sdmVkIHdpdGggYW4gUlRDU3RhdHNSZXBvcnQgb3IgcmVqZWN0IHdpdGggYW4gRXJyb3IgaWYgdGhlcmUgaXMgbm8gY29ubmVjdGlvbiB3aXRoIHNwZWNpZmljIHVzZXIuXHJcbiAgICovXHJcbiAgdGhpcy5nZXRTdGF0cyA9IGZ1bmN0aW9uKHJlbW90ZUlkKSB7XHJcbiAgICBpZiAoIWNoYW5uZWxzLmhhcyhyZW1vdGVJZCkpIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvck1vZHVsZS5QMlBFcnJvcihcclxuICAgICAgICAgIEVycm9yTW9kdWxlLmVycm9ycy5QMlBfQ0xJRU5UX0lOVkFMSURfU1RBVEUsXHJcbiAgICAgICAgICAnTm8gUGVlckNvbm5lY3Rpb24gYmV0d2VlbiBjdXJyZW50IGVuZHBvaW50IGFuZCBzcGVjaWZpYyByZW1vdGUgJyArXHJcbiAgICAgICAgICAnZW5kcG9pbnQuJykpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNoYW5uZWxzLmdldChyZW1vdGVJZCkuZ2V0U3RhdHMoKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBzZW5kU2lnbmFsaW5nTWVzc2FnZSA9IGZ1bmN0aW9uKHJlbW90ZUlkLCB0eXBlLCBtZXNzYWdlKSB7XHJcbiAgICBjb25zdCBtc2cgPSB7XHJcbiAgICAgIHR5cGU6IHR5cGUsXHJcbiAgICB9O1xyXG4gICAgaWYgKG1lc3NhZ2UpIHtcclxuICAgICAgbXNnLmRhdGEgPSBtZXNzYWdlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHNpZ25hbGluZy5zZW5kKHJlbW90ZUlkLCBKU09OLnN0cmluZ2lmeShtc2cpKS5jYXRjaCgoZSkgPT4ge1xyXG4gICAgICBpZiAodHlwZW9mIGUgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgdGhyb3cgRXJyb3JNb2R1bGUuZ2V0RXJyb3JCeUNvZGUoZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGdldE9yQ3JlYXRlQ2hhbm5lbCA9IGZ1bmN0aW9uKHJlbW90ZUlkKSB7XHJcbiAgICBpZiAoIWNoYW5uZWxzLmhhcyhyZW1vdGVJZCkpIHtcclxuICAgICAgLy8gQ29uc3RydWN0IGFuIHNpZ25hbGluZyBzZW5kZXIvcmVjZWl2ZXIgZm9yIFAyUFBlZXJDb25uZWN0aW9uLlxyXG4gICAgICBjb25zdCBzaWduYWxpbmdGb3JDaGFubmVsID0gT2JqZWN0LmNyZWF0ZShFdmVudERpc3BhdGNoZXIpO1xyXG4gICAgICBzaWduYWxpbmdGb3JDaGFubmVsLnNlbmRTaWduYWxpbmdNZXNzYWdlID0gc2VuZFNpZ25hbGluZ01lc3NhZ2U7XHJcbiAgICAgIGNvbnN0IHBjYyA9IG5ldyBQMlBQZWVyQ29ubmVjdGlvbkNoYW5uZWwoY29uZmlnLCBteUlkLCByZW1vdGVJZCxcclxuICAgICAgICAgIHNpZ25hbGluZ0ZvckNoYW5uZWwpO1xyXG4gICAgICBwY2MuYWRkRXZlbnRMaXN0ZW5lcignc3RyZWFtYWRkZWQnLCAoc3RyZWFtRXZlbnQpPT57XHJcbiAgICAgICAgc2VsZi5kaXNwYXRjaEV2ZW50KHN0cmVhbUV2ZW50KTtcclxuICAgICAgfSk7XHJcbiAgICAgIHBjYy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlcmVjZWl2ZWQnLCAobWVzc2FnZUV2ZW50KT0+e1xyXG4gICAgICAgIHNlbGYuZGlzcGF0Y2hFdmVudChtZXNzYWdlRXZlbnQpO1xyXG4gICAgICB9KTtcclxuICAgICAgcGNjLmFkZEV2ZW50TGlzdGVuZXIoJ2VuZGVkJywgKCk9PntcclxuICAgICAgICBjaGFubmVscy5kZWxldGUocmVtb3RlSWQpO1xyXG4gICAgICB9KTtcclxuICAgICAgY2hhbm5lbHMuc2V0KHJlbW90ZUlkLCBwY2MpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNoYW5uZWxzLmdldChyZW1vdGVJZCk7XHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFAyUENsaWVudDtcclxuIiwiLy8gQ29weXJpZ2h0IChDKSA8MjAxOD4gSW50ZWwgQ29ycG9yYXRpb25cclxuLy9cclxuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcclxuXHJcbi8vIFRoaXMgZmlsZSBkb2Vzbid0IGhhdmUgcHVibGljIEFQSXMuXHJcbi8qIGVzbGludC1kaXNhYmxlIHZhbGlkLWpzZG9jICovXHJcbi8qIGVzbGludC1kaXNhYmxlIHJlcXVpcmUtanNkb2MgKi9cclxuLyogZ2xvYmFsIEV2ZW50LCBNYXAsIFByb21pc2UsIFJUQ0ljZUNhbmRpZGF0ZSAqL1xyXG5cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IExvZ2dlciBmcm9tICcuLi9iYXNlL2xvZ2dlci5qcyc7XHJcbmltcG9ydCB7RXZlbnREaXNwYXRjaGVyLCBNZXNzYWdlRXZlbnQsIE93dEV2ZW50fSBmcm9tICcuLi9iYXNlL2V2ZW50LmpzJztcclxuaW1wb3J0IHtQdWJsaWNhdGlvbn0gZnJvbSAnLi4vYmFzZS9wdWJsaWNhdGlvbi5qcyc7XHJcbmltcG9ydCAqIGFzIFV0aWxzIGZyb20gJy4uL2Jhc2UvdXRpbHMuanMnO1xyXG5pbXBvcnQgKiBhcyBFcnJvck1vZHVsZSBmcm9tICcuL2Vycm9yLmpzJztcclxuaW1wb3J0ICogYXMgU3RyZWFtTW9kdWxlIGZyb20gJy4uL2Jhc2Uvc3RyZWFtLmpzJztcclxuaW1wb3J0ICogYXMgU2RwVXRpbHMgZnJvbSAnLi4vYmFzZS9zZHB1dGlscy5qcyc7XHJcblxyXG4vKipcclxuICogQGNsYXNzIFAyUFBlZXJDb25uZWN0aW9uQ2hhbm5lbEV2ZW50XHJcbiAqIEBkZXNjIEV2ZW50IGZvciBTdHJlYW0uXHJcbiAqIEBtZW1iZXJPZiBPd3QuUDJQXHJcbiAqIEBwcml2YXRlXHJcbiAqICovXHJcbmV4cG9ydCBjbGFzcyBQMlBQZWVyQ29ubmVjdGlvbkNoYW5uZWxFdmVudCBleHRlbmRzIEV2ZW50IHtcclxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xyXG4gIGNvbnN0cnVjdG9yKGluaXQpIHtcclxuICAgIHN1cGVyKGluaXQpO1xyXG4gICAgdGhpcy5zdHJlYW0gPSBpbml0LnN0cmVhbTtcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IERhdGFDaGFubmVsTGFiZWwgPSB7XHJcbiAgTUVTU0FHRTogJ21lc3NhZ2UnLFxyXG4gIEZJTEU6ICdmaWxlJyxcclxufTtcclxuXHJcbmNvbnN0IFNpZ25hbGluZ1R5cGUgPSB7XHJcbiAgREVOSUVEOiAnY2hhdC1kZW5pZWQnLFxyXG4gIENMT1NFRDogJ2NoYXQtY2xvc2VkJyxcclxuICBORUdPVElBVElPTl9ORUVERUQ6ICdjaGF0LW5lZ290aWF0aW9uLW5lZWRlZCcsXHJcbiAgVFJBQ0tfU09VUkNFUzogJ2NoYXQtdHJhY2stc291cmNlcycsXHJcbiAgU1RSRUFNX0lORk86ICdjaGF0LXN0cmVhbS1pbmZvJyxcclxuICBTRFA6ICdjaGF0LXNpZ25hbCcsXHJcbiAgVFJBQ0tTX0FEREVEOiAnY2hhdC10cmFja3MtYWRkZWQnLFxyXG4gIFRSQUNLU19SRU1PVkVEOiAnY2hhdC10cmFja3MtcmVtb3ZlZCcsXHJcbiAgREFUQV9SRUNFSVZFRDogJ2NoYXQtZGF0YS1yZWNlaXZlZCcsXHJcbiAgVUE6ICdjaGF0LXVhJyxcclxufTtcclxuXHJcbmNvbnN0IHN5c0luZm8gPSBVdGlscy5zeXNJbmZvKCk7XHJcblxyXG4vKipcclxuICogQGNsYXNzIFAyUFBlZXJDb25uZWN0aW9uQ2hhbm5lbFxyXG4gKiBAZGVzYyBBIFAyUFBlZXJDb25uZWN0aW9uQ2hhbm5lbCBoYW5kbGVzIGFsbCBpbnRlcmFjdGlvbnMgYmV0d2VlbiB0aGlzIGVuZHBvaW50IGFuZCBhIHJlbW90ZSBlbmRwb2ludC5cclxuICogQG1lbWJlck9mIE93dC5QMlBcclxuICogQHByaXZhdGVcclxuICovXHJcbmNsYXNzIFAyUFBlZXJDb25uZWN0aW9uQ2hhbm5lbCBleHRlbmRzIEV2ZW50RGlzcGF0Y2hlciB7XHJcbiAgLy8gfHNpZ25hbGluZ3wgaXMgYW4gb2JqZWN0IGhhcyBhIG1ldGhvZCB8c2VuZFNpZ25hbGluZ01lc3NhZ2V8LlxyXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXHJcbiAgY29uc3RydWN0b3IoY29uZmlnLCBsb2NhbElkLCByZW1vdGVJZCwgc2lnbmFsaW5nKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xyXG4gICAgdGhpcy5fbG9jYWxJZCA9IGxvY2FsSWQ7XHJcbiAgICB0aGlzLl9yZW1vdGVJZCA9IHJlbW90ZUlkO1xyXG4gICAgdGhpcy5fc2lnbmFsaW5nID0gc2lnbmFsaW5nO1xyXG4gICAgdGhpcy5fcGMgPSBudWxsO1xyXG4gICAgdGhpcy5fcHVibGlzaGVkU3RyZWFtcyA9IG5ldyBNYXAoKTsgLy8gS2V5IGlzIHN0cmVhbXMgcHVibGlzaGVkLCB2YWx1ZSBpcyBpdHMgcHVibGljYXRpb24uXHJcbiAgICB0aGlzLl9wZW5kaW5nU3RyZWFtcyA9IFtdOyAvLyBTdHJlYW1zIGdvaW5nIHRvIGJlIGFkZGVkIHRvIFBlZXJDb25uZWN0aW9uLlxyXG4gICAgdGhpcy5fcHVibGlzaGluZ1N0cmVhbXMgPSBbXTsgLy8gU3RyZWFtcyBoYXZlIGJlZW4gYWRkZWQgdG8gUGVlckNvbm5lY3Rpb24sIGJ1dCBkb2VzIG5vdCByZWNlaXZlIGFjayBmcm9tIHJlbW90ZSBzaWRlLlxyXG4gICAgdGhpcy5fcGVuZGluZ1VucHVibGlzaFN0cmVhbXMgPSBbXTsgLy8gU3RyZWFtcyBnb2luZyB0byBiZSByZW1vdmVkLlxyXG4gICAgLy8gS2V5IGlzIE1lZGlhU3RyZWFtJ3MgSUQsIHZhbHVlIGlzIGFuIG9iamVjdCB7c291cmNlOnthdWRpbzpzdHJpbmcsIHZpZGVvOnN0cmluZ30sIGF0dHJpYnV0ZXM6IG9iamVjdCwgc3RyZWFtOiBSZW1vdGVTdHJlYW0sIG1lZGlhU3RyZWFtOiBNZWRpYVN0cmVhbX0uIGBzdHJlYW1gIGFuZCBgbWVkaWFTdHJlYW1gIHdpbGwgYmUgc2V0IHdoZW4gYHRyYWNrYCBldmVudCBpcyBmaXJlZCBvbiBgUlRDUGVlckNvbm5lY3Rpb25gLiBgbWVkaWFTdHJlYW1gIHdpbGwgYmUgYG51bGxgIGFmdGVyIGBzdHJlYW1hZGRlZGAgZXZlbnQgaXMgZmlyZWQgb24gYFAyUENsaWVudGAuIE90aGVyIHByb3BlcnRlcyB3aWxsIGJlIHNldCB1cG9uIGBTVFJFQU1fSU5GT2AgZXZlbnQgZnJvbSBzaWduYWxpbmcgY2hhbm5lbC5cclxuICAgIHRoaXMuX3JlbW90ZVN0cmVhbUluZm8gPSBuZXcgTWFwKCk7XHJcbiAgICB0aGlzLl9yZW1vdGVTdHJlYW1zID0gW107XHJcbiAgICB0aGlzLl9yZW1vdGVUcmFja1NvdXJjZUluZm8gPSBuZXcgTWFwKCk7IC8vIEtleSBpcyBNZWRpYVN0cmVhbVRyYWNrJ3MgSUQsIHZhbHVlIGlzIHNvdXJjZSBpbmZvLlxyXG4gICAgdGhpcy5fcHVibGlzaFByb21pc2VzID0gbmV3IE1hcCgpOyAvLyBLZXkgaXMgTWVkaWFTdHJlYW0ncyBJRCwgdmFsdWUgaXMgYW4gb2JqZWN0IGhhcyB8cmVzb2x2ZXwgYW5kIHxyZWplY3R8LlxyXG4gICAgdGhpcy5fdW5wdWJsaXNoUHJvbWlzZXMgPSBuZXcgTWFwKCk7IC8vIEtleSBpcyBNZWRpYVN0cmVhbSdzIElELCB2YWx1ZSBpcyBhbiBvYmplY3QgaGFzIHxyZXNvbHZlfCBhbmQgfHJlamVjdHwuXHJcbiAgICB0aGlzLl9wdWJsaXNoaW5nU3RyZWFtVHJhY2tzID0gbmV3IE1hcCgpOyAvLyBLZXkgaXMgTWVkaWFTdHJlYW0ncyBJRCwgdmFsdWUgaXMgYW4gYXJyYXkgb2YgdGhlIElEIG9mIGl0cyBNZWRpYVN0cmVhbVRyYWNrcyB0aGF0IGhhdmVuJ3QgYmVlbiBhY2tlZC5cclxuICAgIHRoaXMuX3B1Ymxpc2hlZFN0cmVhbVRyYWNrcyA9IG5ldyBNYXAoKTsgLy8gS2V5IGlzIE1lZGlhU3RyZWFtJ3MgSUQsIHZhbHVlIGlzIGFuIGFycmF5IG9mIHRoZSBJRCBvZiBpdHMgTWVkaWFTdHJlYW1UcmFja3MgdGhhdCBoYXZlbid0IGJlZW4gcmVtb3ZlZC5cclxuICAgIHRoaXMuX2lzTmVnb3RpYXRpb25OZWVkZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuX3JlbW90ZVNpZGVTdXBwb3J0c1JlbW92ZVN0cmVhbSA9IHRydWU7XHJcbiAgICB0aGlzLl9yZW1vdGVTaWRlU3VwcG9ydHNQbGFuQiA9IHRydWU7XHJcbiAgICB0aGlzLl9yZW1vdGVTaWRlU3VwcG9ydHNVbmlmaWVkUGxhbiA9IHRydWU7XHJcbiAgICB0aGlzLl9yZW1vdGVJY2VDYW5kaWRhdGVzID0gW107XHJcbiAgICB0aGlzLl9kYXRhQ2hhbm5lbHMgPSBuZXcgTWFwKCk7IC8vIEtleSBpcyBkYXRhIGNoYW5uZWwncyBsYWJlbCwgdmFsdWUgaXMgYSBSVENEYXRhQ2hhbm5lbC5cclxuICAgIHRoaXMuX3BlbmRpbmdNZXNzYWdlcyA9IFtdO1xyXG4gICAgdGhpcy5fZGF0YVNlcSA9IDE7IC8vIFNlcXVlbmNlIG51bWJlciBmb3IgZGF0YSBjaGFubmVsIG1lc3NhZ2VzLlxyXG4gICAgdGhpcy5fc2VuZERhdGFQcm9taXNlcyA9IG5ldyBNYXAoKTsgLy8gS2V5IGlzIGRhdGEgc2VxdWVuY2UgbnVtYmVyLCB2YWx1ZSBpcyBhbiBvYmplY3QgaGFzIHxyZXNvbHZlfCBhbmQgfHJlamVjdHwuXHJcbiAgICB0aGlzLl9hZGRlZFRyYWNrSWRzID0gW107IC8vIFRyYWNrcyB0aGF0IGhhdmUgYmVlbiBhZGRlZCBhZnRlciByZWNlaXZpbmcgcmVtb3RlIFNEUCBidXQgYmVmb3JlIGNvbm5lY3Rpb24gaXMgZXN0YWJsaXNoZWQuIERyYWluaW5nIHRoZXNlIG1lc3NhZ2VzIHdoZW4gSUNFIGNvbm5lY3Rpb24gc3RhdGUgaXMgY29ubmVjdGVkLlxyXG4gICAgdGhpcy5faXNDYWxsZXIgPSB0cnVlO1xyXG4gICAgdGhpcy5faW5mb1NlbnQgPSBmYWxzZTtcclxuICAgIHRoaXMuX2Rpc3Bvc2VkID0gZmFsc2U7XHJcbiAgICB0aGlzLl9jcmVhdGVQZWVyQ29ubmVjdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGZ1bmN0aW9uIHB1Ymxpc2hcclxuICAgKiBAZGVzYyBQdWJsaXNoIGEgc3RyZWFtIHRvIHRoZSByZW1vdGUgZW5kcG9pbnQuXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwdWJsaXNoKHN0cmVhbSkge1xyXG4gICAgaWYgKCEoc3RyZWFtIGluc3RhbmNlb2YgU3RyZWFtTW9kdWxlLkxvY2FsU3RyZWFtKSkge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFR5cGVFcnJvcignSW52YWxpZCBzdHJlYW0uJykpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuX3B1Ymxpc2hlZFN0cmVhbXMuaGFzKHN0cmVhbSkpIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvck1vZHVsZS5QMlBFcnJvcihcclxuICAgICAgICAgIEVycm9yTW9kdWxlLmVycm9ycy5QMlBfQ0xJRU5UX0lMTEVHQUxfQVJHVU1FTlQsXHJcbiAgICAgICAgICAnRHVwbGljYXRlZCBzdHJlYW0uJykpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuX2FyZUFsbFRyYWNrc0VuZGVkKHN0cmVhbS5tZWRpYVN0cmVhbSkpIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvck1vZHVsZS5QMlBFcnJvcihcclxuICAgICAgICAgIEVycm9yTW9kdWxlLmVycm9ycy5QMlBfQ0xJRU5UX0lOVkFMSURfU1RBVEUsXHJcbiAgICAgICAgICAnQWxsIHRyYWNrcyBhcmUgZW5kZWQuJykpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKFt0aGlzLl9zZW5kQ2xvc2VkTXNnSWZOZWNlc3NhcnkoKSxcclxuICAgICAgdGhpcy5fc2VuZFN5c0luZm9JZk5lY2Vzc2FyeSgpLFxyXG4gICAgICB0aGlzLl9zZW5kU3RyZWFtSW5mbyhzdHJlYW0pXSkudGhlbigoKSA9PiB7XHJcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgLy8gUmVwbGFjZSB8YWRkU3RyZWFtfCB3aXRoIFBlZXJDb25uZWN0aW9uLmFkZFRyYWNrIHdoZW4gYWxsIGJyb3dzZXJzIGFyZSByZWFkeS5cclxuICAgICAgICBmb3IgKGNvbnN0IHRyYWNrIG9mIHN0cmVhbS5tZWRpYVN0cmVhbS5nZXRUcmFja3MoKSkge1xyXG4gICAgICAgICAgdGhpcy5fcGMuYWRkVHJhY2sodHJhY2ssIHN0cmVhbS5tZWRpYVN0cmVhbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX29uTmVnb3RpYXRpb25uZWVkZWQoKTtcclxuICAgICAgICB0aGlzLl9wdWJsaXNoaW5nU3RyZWFtcy5wdXNoKHN0cmVhbSk7XHJcbiAgICAgICAgY29uc3QgdHJhY2tJZHMgPSBBcnJheS5mcm9tKHN0cmVhbS5tZWRpYVN0cmVhbS5nZXRUcmFja3MoKSxcclxuICAgICAgICAgICAgKHRyYWNrKSA9PiB0cmFjay5pZCk7XHJcbiAgICAgICAgdGhpcy5fcHVibGlzaGluZ1N0cmVhbVRyYWNrcy5zZXQoc3RyZWFtLm1lZGlhU3RyZWFtLmlkLFxyXG4gICAgICAgICAgICB0cmFja0lkcyk7XHJcbiAgICAgICAgdGhpcy5fcHVibGlzaFByb21pc2VzLnNldChzdHJlYW0ubWVkaWFTdHJlYW0uaWQsIHtcclxuICAgICAgICAgIHJlc29sdmU6IHJlc29sdmUsXHJcbiAgICAgICAgICByZWplY3Q6IHJlamVjdCxcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBmdW5jdGlvbiBzZW5kXHJcbiAgICogQGRlc2MgU2VuZCBhIG1lc3NhZ2UgdG8gdGhlIHJlbW90ZSBlbmRwb2ludC5cclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHNlbmQobWVzc2FnZSkge1xyXG4gICAgaWYgKCEodHlwZW9mIG1lc3NhZ2UgPT09ICdzdHJpbmcnKSkge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFR5cGVFcnJvcignSW52YWxpZCBtZXNzYWdlLicpKTtcclxuICAgIH1cclxuICAgIGNvbnN0IGRhdGEgPSB7XHJcbiAgICAgIGlkOiB0aGlzLl9kYXRhU2VxKyssXHJcbiAgICAgIGRhdGE6IG1lc3NhZ2UsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgdGhpcy5fc2VuZERhdGFQcm9taXNlcy5zZXQoZGF0YS5pZCwge1xyXG4gICAgICAgIHJlc29sdmU6IHJlc29sdmUsXHJcbiAgICAgICAgcmVqZWN0OiByZWplY3QsXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICBpZiAoIXRoaXMuX2RhdGFDaGFubmVscy5oYXMoRGF0YUNoYW5uZWxMYWJlbC5NRVNTQUdFKSkge1xyXG4gICAgICB0aGlzLl9jcmVhdGVEYXRhQ2hhbm5lbChEYXRhQ2hhbm5lbExhYmVsLk1FU1NBR0UpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX3NlbmRDbG9zZWRNc2dJZk5lY2Vzc2FyeSgpLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgTG9nZ2VyLmRlYnVnKCdGYWlsZWQgdG8gc2VuZCBjbG9zZWQgbWVzc2FnZS4nICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5fc2VuZFN5c0luZm9JZk5lY2Vzc2FyeSgpLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgTG9nZ2VyLmRlYnVnKCdGYWlsZWQgdG8gc2VuZCBzeXNJbmZvLicgKyBlcnIubWVzc2FnZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBkYyA9IHRoaXMuX2RhdGFDaGFubmVscy5nZXQoRGF0YUNoYW5uZWxMYWJlbC5NRVNTQUdFKTtcclxuICAgIGlmIChkYy5yZWFkeVN0YXRlID09PSAnb3BlbicpIHtcclxuICAgICAgdGhpcy5fZGF0YUNoYW5uZWxzLmdldChEYXRhQ2hhbm5lbExhYmVsLk1FU1NBR0UpLnNlbmQoXHJcbiAgICAgICAgICBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9wZW5kaW5nTWVzc2FnZXMucHVzaChkYXRhKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwcm9taXNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGZ1bmN0aW9uIHN0b3BcclxuICAgKiBAZGVzYyBTdG9wIHRoZSBjb25uZWN0aW9uIHdpdGggcmVtb3RlIGVuZHBvaW50LlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgc3RvcCgpIHtcclxuICAgIHRoaXMuX3N0b3AodW5kZWZpbmVkLCB0cnVlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBmdW5jdGlvbiBnZXRTdGF0c1xyXG4gICAqIEBkZXNjIEdldCBzdGF0cyBmb3IgYSBzcGVjaWZpYyBNZWRpYVN0cmVhbS5cclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIGdldFN0YXRzKG1lZGlhU3RyZWFtKSB7XHJcbiAgICBpZiAodGhpcy5fcGMpIHtcclxuICAgICAgaWYgKG1lZGlhU3RyZWFtID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGMuZ2V0U3RhdHMoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCB0cmFja3NTdGF0c1JlcG9ydHMgPSBbXTtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW21lZGlhU3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goKHRyYWNrKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLl9nZXRTdGF0cyh0cmFjaywgdHJhY2tzU3RhdHNSZXBvcnRzKTtcclxuICAgICAgICB9KV0pLnRoZW4oXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0cmFja3NTdGF0c1JlcG9ydHMpO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvck1vZHVsZS5QMlBFcnJvcihcclxuICAgICAgICAgIEVycm9yTW9kdWxlLmVycm9ycy5QMlBfQ0xJRU5UX0lOVkFMSURfU1RBVEUpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIF9nZXRTdGF0cyhtZWRpYVN0cmVhbVRyYWNrLCByZXBvcnRzUmVzdWx0KSB7XHJcbiAgICByZXR1cm4gdGhpcy5fcGMuZ2V0U3RhdHMobWVkaWFTdHJlYW1UcmFjaykudGhlbihcclxuICAgICAgICAoc3RhdHNSZXBvcnQpID0+IHtcclxuICAgICAgICAgIHJlcG9ydHNSZXN1bHQucHVzaChzdGF0c1JlcG9ydCk7XHJcbiAgICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAZnVuY3Rpb24gb25NZXNzYWdlXHJcbiAgICogQGRlc2MgVGhpcyBtZXRob2QgaXMgY2FsbGVkIGJ5IFAyUENsaWVudCB3aGVuIHRoZXJlIGlzIG5ldyBzaWduYWxpbmcgbWVzc2FnZSBhcnJpdmVkLlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgb25NZXNzYWdlKG1lc3NhZ2UpIHtcclxuICAgIHRoaXMuX1NpZ25hbGluZ01lc3NzYWdlSGFuZGxlcihtZXNzYWdlKTtcclxuICB9XHJcblxyXG4gIF9zZW5kU2RwKHNkcCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NpZ25hbGluZy5zZW5kU2lnbmFsaW5nTWVzc2FnZShcclxuICAgICAgICB0aGlzLl9yZW1vdGVJZCwgU2lnbmFsaW5nVHlwZS5TRFAsIHNkcCk7XHJcbiAgfVxyXG5cclxuICBfc2VuZFNpZ25hbGluZ01lc3NhZ2UodHlwZSwgbWVzc2FnZSkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NpZ25hbGluZy5zZW5kU2lnbmFsaW5nTWVzc2FnZSh0aGlzLl9yZW1vdGVJZCwgdHlwZSwgbWVzc2FnZSk7XHJcbiAgfVxyXG5cclxuICBfU2lnbmFsaW5nTWVzc3NhZ2VIYW5kbGVyKG1lc3NhZ2UpIHtcclxuICAgIExvZ2dlci5kZWJ1ZygnQ2hhbm5lbCByZWNlaXZlZCBtZXNzYWdlOiAnICsgbWVzc2FnZSk7XHJcbiAgICBzd2l0Y2ggKG1lc3NhZ2UudHlwZSkge1xyXG4gICAgICBjYXNlIFNpZ25hbGluZ1R5cGUuVUE6XHJcbiAgICAgICAgdGhpcy5faGFuZGxlUmVtb3RlQ2FwYWJpbGl0eShtZXNzYWdlLmRhdGEpO1xyXG4gICAgICAgIHRoaXMuX3NlbmRTeXNJbmZvSWZOZWNlc3NhcnkoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBTaWduYWxpbmdUeXBlLlRSQUNLX1NPVVJDRVM6XHJcbiAgICAgICAgdGhpcy5fdHJhY2tTb3VyY2VzSGFuZGxlcihtZXNzYWdlLmRhdGEpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFNpZ25hbGluZ1R5cGUuU1RSRUFNX0lORk86XHJcbiAgICAgICAgdGhpcy5fc3RyZWFtSW5mb0hhbmRsZXIobWVzc2FnZS5kYXRhKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBTaWduYWxpbmdUeXBlLlNEUDpcclxuICAgICAgICB0aGlzLl9zZHBIYW5kbGVyKG1lc3NhZ2UuZGF0YSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgU2lnbmFsaW5nVHlwZS5UUkFDS1NfQURERUQ6XHJcbiAgICAgICAgdGhpcy5fdHJhY2tzQWRkZWRIYW5kbGVyKG1lc3NhZ2UuZGF0YSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgU2lnbmFsaW5nVHlwZS5UUkFDS1NfUkVNT1ZFRDpcclxuICAgICAgICB0aGlzLl90cmFja3NSZW1vdmVkSGFuZGxlcihtZXNzYWdlLmRhdGEpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFNpZ25hbGluZ1R5cGUuREFUQV9SRUNFSVZFRDpcclxuICAgICAgICB0aGlzLl9kYXRhUmVjZWl2ZWRIYW5kbGVyKG1lc3NhZ2UuZGF0YSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgU2lnbmFsaW5nVHlwZS5DTE9TRUQ6XHJcbiAgICAgICAgdGhpcy5fY2hhdENsb3NlZEhhbmRsZXIobWVzc2FnZS5kYXRhKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBMb2dnZXIuZXJyb3IoJ0ludmFsaWQgc2lnbmFsaW5nIG1lc3NhZ2UgcmVjZWl2ZWQuIFR5cGU6ICcgK1xyXG4gICAgICAgICAgICBtZXNzYWdlLnR5cGUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGZ1bmN0aW9uIF90cmFja3NBZGRlZEhhbmRsZXJcclxuICAgKiBAZGVzYyBIYW5kbGUgdHJhY2sgYWRkZWQgZXZlbnQgZnJvbSByZW1vdGUgc2lkZS5cclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIF90cmFja3NBZGRlZEhhbmRsZXIoaWRzKSB7XHJcbiAgICAvLyBDdXJyZW50bHksIHxpZHN8IGNvbnRhaW5zIGFsbCB0cmFjayBJRHMgb2YgYSBNZWRpYVN0cmVhbS4gRm9sbG93aW5nIGFsZ29yaXRobSBhbHNvIGhhbmRsZXMgfGlkc3wgaXMgYSBwYXJ0IG9mIGEgTWVkaWFTdHJlYW0ncyB0cmFja3MuXHJcbiAgICBmb3IgKGNvbnN0IGlkIG9mIGlkcykge1xyXG4gICAgICAvLyBJdCBjb3VsZCBiZSBhIHByb2JsZW0gaWYgdGhlcmUgaXMgYSB0cmFjayBwdWJsaXNoZWQgd2l0aCBkaWZmZXJlbnQgTWVkaWFTdHJlYW1zLlxyXG4gICAgICB0aGlzLl9wdWJsaXNoaW5nU3RyZWFtVHJhY2tzLmZvckVhY2goKG1lZGlhVHJhY2tJZHMsIG1lZGlhU3RyZWFtSWQpID0+IHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1lZGlhVHJhY2tJZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGlmIChtZWRpYVRyYWNrSWRzW2ldID09PSBpZCkge1xyXG4gICAgICAgICAgICAvLyBNb3ZlIHRoaXMgdHJhY2sgZnJvbSBwdWJsaXNoaW5nIHRyYWNrcyB0byBwdWJsaXNoZWQgdHJhY2tzLlxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX3B1Ymxpc2hlZFN0cmVhbVRyYWNrcy5oYXMobWVkaWFTdHJlYW1JZCkpIHtcclxuICAgICAgICAgICAgICB0aGlzLl9wdWJsaXNoZWRTdHJlYW1UcmFja3Muc2V0KG1lZGlhU3RyZWFtSWQsIFtdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9wdWJsaXNoZWRTdHJlYW1UcmFja3MuZ2V0KG1lZGlhU3RyZWFtSWQpLnB1c2goXHJcbiAgICAgICAgICAgICAgICBtZWRpYVRyYWNrSWRzW2ldKTtcclxuICAgICAgICAgICAgbWVkaWFUcmFja0lkcy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAvLyBSZXNvbHZpbmcgY2VydGFpbiBwdWJsaXNoIHByb21pc2Ugd2hlbiByZW1vdGUgZW5kcG9pbnQgcmVjZWl2ZWQgYWxsIHRyYWNrcyBvZiBhIE1lZGlhU3RyZWFtLlxyXG4gICAgICAgICAgaWYgKG1lZGlhVHJhY2tJZHMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9wdWJsaXNoUHJvbWlzZXMuaGFzKG1lZGlhU3RyZWFtSWQpKSB7XHJcbiAgICAgICAgICAgICAgTG9nZ2VyLndhcm5pbmcoJ0Nhbm5vdCBmaW5kIHRoZSBwcm9taXNlIGZvciBwdWJsaXNoaW5nICcgK1xyXG4gICAgICAgICAgICAgICAgbWVkaWFTdHJlYW1JZCk7XHJcbiAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgdGFyZ2V0U3RyZWFtSW5kZXggPSB0aGlzLl9wdWJsaXNoaW5nU3RyZWFtcy5maW5kSW5kZXgoXHJcbiAgICAgICAgICAgICAgICAoZWxlbWVudCkgPT4gZWxlbWVudC5tZWRpYVN0cmVhbS5pZCA9PSBtZWRpYVN0cmVhbUlkKTtcclxuICAgICAgICAgICAgY29uc3QgdGFyZ2V0U3RyZWFtID0gdGhpcy5fcHVibGlzaGluZ1N0cmVhbXNbdGFyZ2V0U3RyZWFtSW5kZXhdO1xyXG4gICAgICAgICAgICB0aGlzLl9wdWJsaXNoaW5nU3RyZWFtcy5zcGxpY2UodGFyZ2V0U3RyZWFtSW5kZXgsIDEpO1xyXG4gICAgICAgICAgICBjb25zdCBwdWJsaWNhdGlvbiA9IG5ldyBQdWJsaWNhdGlvbihcclxuICAgICAgICAgICAgICAgIGlkLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuX3VucHVibGlzaCh0YXJnZXRTdHJlYW0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHB1YmxpY2F0aW9uLmRpc3BhdGNoRXZlbnQobmV3IE93dEV2ZW50KCdlbmRlZCcpKTtcclxuICAgICAgICAgICAgICAgICAgfSwgKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAvLyBVc2UgZGVidWcgbW9kZSBiZWNhdXNlIHRoaXMgZXJyb3IgdXN1YWxseSBkb2Vzbid0IGJsb2NrIHN0b3BwaW5nIGEgcHVibGljYXRpb24uXHJcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmRlYnVnKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnU29tZXRoaW5nIHdyb25nIGhhcHBlbmVkIGR1cmluZyBzdG9wcGluZyBhICcrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdwdWJsaWNhdGlvbi4gJyArIGVyci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIGlmICghdGFyZ2V0U3RyZWFtIHx8ICF0YXJnZXRTdHJlYW0ubWVkaWFTdHJlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yTW9kdWxlLlAyUEVycm9yKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBFcnJvck1vZHVsZS5lcnJvcnMuUDJQX0NMSUVOVF9JTlZBTElEX1NUQVRFLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnUHVibGljYXRpb24gaXMgbm90IGF2YWlsYWJsZS4nKSk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3RhdHModGFyZ2V0U3RyZWFtLm1lZGlhU3RyZWFtKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLl9wdWJsaXNoZWRTdHJlYW1zLnNldCh0YXJnZXRTdHJlYW0sIHB1YmxpY2F0aW9uKTtcclxuICAgICAgICAgICAgdGhpcy5fcHVibGlzaFByb21pc2VzLmdldChtZWRpYVN0cmVhbUlkKS5yZXNvbHZlKHB1YmxpY2F0aW9uKTtcclxuICAgICAgICAgICAgdGhpcy5fcHVibGlzaFByb21pc2VzLmRlbGV0ZShtZWRpYVN0cmVhbUlkKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGZ1bmN0aW9uIF90cmFja3NSZW1vdmVkSGFuZGxlclxyXG4gICAqIEBkZXNjIEhhbmRsZSB0cmFjayByZW1vdmVkIGV2ZW50IGZyb20gcmVtb3RlIHNpZGUuXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBfdHJhY2tzUmVtb3ZlZEhhbmRsZXIoaWRzKSB7XHJcbiAgICAvLyBDdXJyZW50bHksIHxpZHN8IGNvbnRhaW5zIGFsbCB0cmFjayBJRHMgb2YgYSBNZWRpYVN0cmVhbS4gRm9sbG93aW5nIGFsZ29yaXRobSBhbHNvIGhhbmRsZXMgfGlkc3wgaXMgYSBwYXJ0IG9mIGEgTWVkaWFTdHJlYW0ncyB0cmFja3MuXHJcbiAgICBmb3IgKGNvbnN0IGlkIG9mIGlkcykge1xyXG4gICAgICAvLyBJdCBjb3VsZCBiZSBhIHByb2JsZW0gaWYgdGhlcmUgaXMgYSB0cmFjayBwdWJsaXNoZWQgd2l0aCBkaWZmZXJlbnQgTWVkaWFTdHJlYW1zLlxyXG4gICAgICB0aGlzLl9wdWJsaXNoZWRTdHJlYW1UcmFja3MuZm9yRWFjaCgobWVkaWFUcmFja0lkcywgbWVkaWFTdHJlYW1JZCkgPT4ge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWVkaWFUcmFja0lkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgaWYgKG1lZGlhVHJhY2tJZHNbaV0gPT09IGlkKSB7XHJcbiAgICAgICAgICAgIG1lZGlhVHJhY2tJZHMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAZnVuY3Rpb24gX2RhdGFSZWNlaXZlZEhhbmRsZXJcclxuICAgKiBAZGVzYyBIYW5kbGUgZGF0YSByZWNlaXZlZCBldmVudCBmcm9tIHJlbW90ZSBzaWRlLlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgX2RhdGFSZWNlaXZlZEhhbmRsZXIoaWQpIHtcclxuICAgIGlmICghdGhpcy5fc2VuZERhdGFQcm9taXNlcy5oYXMoaWQpKSB7XHJcbiAgICAgIExvZ2dlci53YXJuaW5nKCdSZWNlaXZlZCB1bmtub3duIGRhdGEgcmVjZWl2ZWQgbWVzc2FnZS4gSUQ6ICcgKyBpZCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX3NlbmREYXRhUHJvbWlzZXMuZ2V0KGlkKS5yZXNvbHZlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAZnVuY3Rpb24gX3NkcEhhbmRsZXJcclxuICAgKiBAZGVzYyBIYW5kbGUgU0RQIHJlY2VpdmVkIGV2ZW50IGZyb20gcmVtb3RlIHNpZGUuXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBfc2RwSGFuZGxlcihzZHApIHtcclxuICAgIGlmIChzZHAudHlwZSA9PT0gJ29mZmVyJykge1xyXG4gICAgICB0aGlzLl9vbk9mZmVyKHNkcCk7XHJcbiAgICB9IGVsc2UgaWYgKHNkcC50eXBlID09PSAnYW5zd2VyJykge1xyXG4gICAgICB0aGlzLl9vbkFuc3dlcihzZHApO1xyXG4gICAgfSBlbHNlIGlmIChzZHAudHlwZSA9PT0gJ2NhbmRpZGF0ZXMnKSB7XHJcbiAgICAgIHRoaXMuX29uUmVtb3RlSWNlQ2FuZGlkYXRlKHNkcCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAZnVuY3Rpb24gX3RyYWNrU291cmNlc0hhbmRsZXJcclxuICAgKiBAZGVzYyBSZWNlaXZlZCB0cmFjayBzb3VyY2UgaW5mb3JtYXRpb24gZnJvbSByZW1vdGUgc2lkZS5cclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIF90cmFja1NvdXJjZXNIYW5kbGVyKGRhdGEpIHtcclxuICAgIGZvciAoY29uc3QgaW5mbyBvZiBkYXRhKSB7XHJcbiAgICAgIHRoaXMuX3JlbW90ZVRyYWNrU291cmNlSW5mby5zZXQoaW5mby5pZCwgaW5mby5zb3VyY2UpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGZ1bmN0aW9uIF9zdHJlYW1JbmZvSGFuZGxlclxyXG4gICAqIEBkZXNjIFJlY2VpdmVkIHN0cmVhbSBpbmZvcm1hdGlvbiBmcm9tIHJlbW90ZSBzaWRlLlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgX3N0cmVhbUluZm9IYW5kbGVyKGRhdGEpIHtcclxuICAgIGlmICghZGF0YSkge1xyXG4gICAgICBMb2dnZXIud2FybmluZygnVW5leHBlY3RlZCBzdHJlYW0gaW5mby4nKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fcmVtb3RlU3RyZWFtSW5mby5zZXQoZGF0YS5pZCwge1xyXG4gICAgICBzb3VyY2U6IGRhdGEuc291cmNlLFxyXG4gICAgICBhdHRyaWJ1dGVzOiBkYXRhLmF0dHJpYnV0ZXMsXHJcbiAgICAgIHN0cmVhbTogbnVsbCxcclxuICAgICAgbWVkaWFTdHJlYW06IG51bGwsXHJcbiAgICAgIHRyYWNrSWRzOiBkYXRhLnRyYWNrcywgLy8gVHJhY2sgSURzIG1heSBub3QgbWF0Y2ggYXQgc2VuZGVyIGFuZCByZWNlaXZlciBzaWRlcy4gS2VlcCBpdCBmb3IgbGVnYWN5IHBvcnBvc2VzLlxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAZnVuY3Rpb24gX2NoYXRDbG9zZWRIYW5kbGVyXHJcbiAgICogQGRlc2MgUmVjZWl2ZWQgY2hhdCBjbG9zZWQgZXZlbnQgZnJvbSByZW1vdGUgc2lkZS5cclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIF9jaGF0Q2xvc2VkSGFuZGxlcihkYXRhKSB7XHJcbiAgICB0aGlzLl9kaXNwb3NlZCA9IHRydWU7XHJcbiAgICB0aGlzLl9zdG9wKGRhdGEsIGZhbHNlKTtcclxuICB9XHJcblxyXG4gIF9vbk9mZmVyKHNkcCkge1xyXG4gICAgTG9nZ2VyLmRlYnVnKCdBYm91dCB0byBzZXQgcmVtb3RlIGRlc2NyaXB0aW9uLiBTaWduYWxpbmcgc3RhdGU6ICcgK1xyXG4gICAgICB0aGlzLl9wYy5zaWduYWxpbmdTdGF0ZSk7XHJcbiAgICBzZHAuc2RwID0gdGhpcy5fc2V0UnRwU2VuZGVyT3B0aW9ucyhzZHAuc2RwLCB0aGlzLl9jb25maWcpO1xyXG4gICAgLy8gRmlyZWZveCBvbmx5IGhhcyBvbmUgY29kZWMgaW4gYW5zd2VyLCB3aGljaCBkb2VzIG5vdCB0cnVseSByZWZsZWN0IGl0c1xyXG4gICAgLy8gZGVjb2RpbmcgY2FwYWJpbGl0eS4gU28gd2Ugc2V0IGNvZGVjIHByZWZlcmVuY2UgdG8gcmVtb3RlIG9mZmVyLCBhbmQgbGV0XHJcbiAgICAvLyBGaXJlZm94IGNob29zZSBpdHMgcHJlZmVycmVkIGNvZGVjLlxyXG4gICAgLy8gUmVmZXJlbmNlOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD04MTQyMjcuXHJcbiAgICBpZiAoVXRpbHMuaXNGaXJlZm94KCkpIHtcclxuICAgICAgc2RwLnNkcCA9IHRoaXMuX3NldENvZGVjT3JkZXIoc2RwLnNkcCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBzZXNzaW9uRGVzY3JpcHRpb24gPSBuZXcgUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKHNkcCk7XHJcbiAgICB0aGlzLl9wYy5zZXRSZW1vdGVEZXNjcmlwdGlvbihzZXNzaW9uRGVzY3JpcHRpb24pLnRoZW4oKCkgPT4ge1xyXG4gICAgICB0aGlzLl9jcmVhdGVBbmRTZW5kQW5zd2VyKCk7XHJcbiAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgTG9nZ2VyLmRlYnVnKCdTZXQgcmVtb3RlIGRlc2NyaXB0aW9uIGZhaWxlZC4gTWVzc2FnZTogJyArIGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICB0aGlzLl9zdG9wKGVycm9yLCB0cnVlKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgX29uQW5zd2VyKHNkcCkge1xyXG4gICAgTG9nZ2VyLmRlYnVnKCdBYm91dCB0byBzZXQgcmVtb3RlIGRlc2NyaXB0aW9uLiBTaWduYWxpbmcgc3RhdGU6ICcgK1xyXG4gICAgICB0aGlzLl9wYy5zaWduYWxpbmdTdGF0ZSk7XHJcbiAgICBzZHAuc2RwID0gdGhpcy5fc2V0UnRwU2VuZGVyT3B0aW9ucyhzZHAuc2RwLCB0aGlzLl9jb25maWcpO1xyXG4gICAgY29uc3Qgc2Vzc2lvbkRlc2NyaXB0aW9uID0gbmV3IFJUQ1Nlc3Npb25EZXNjcmlwdGlvbihzZHApO1xyXG4gICAgdGhpcy5fcGMuc2V0UmVtb3RlRGVzY3JpcHRpb24obmV3IFJUQ1Nlc3Npb25EZXNjcmlwdGlvbihcclxuICAgICAgICBzZXNzaW9uRGVzY3JpcHRpb24pKS50aGVuKCgpID0+IHtcclxuICAgICAgTG9nZ2VyLmRlYnVnKCdTZXQgcmVtb3RlIGRlc2NyaXBpdG9uIHN1Y2Nlc3NmdWxseS4nKTtcclxuICAgICAgdGhpcy5fZHJhaW5QZW5kaW5nTWVzc2FnZXMoKTtcclxuICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICBMb2dnZXIuZGVidWcoJ1NldCByZW1vdGUgZGVzY3JpcHRpb24gZmFpbGVkLiBNZXNzYWdlOiAnICsgZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgIHRoaXMuX3N0b3AoZXJyb3IsIHRydWUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBfb25Mb2NhbEljZUNhbmRpZGF0ZShldmVudCkge1xyXG4gICAgaWYgKGV2ZW50LmNhbmRpZGF0ZSkge1xyXG4gICAgICB0aGlzLl9zZW5kU2RwKHtcclxuICAgICAgICB0eXBlOiAnY2FuZGlkYXRlcycsXHJcbiAgICAgICAgY2FuZGlkYXRlOiBldmVudC5jYW5kaWRhdGUuY2FuZGlkYXRlLFxyXG4gICAgICAgIHNkcE1pZDogZXZlbnQuY2FuZGlkYXRlLnNkcE1pZCxcclxuICAgICAgICBzZHBNTGluZUluZGV4OiBldmVudC5jYW5kaWRhdGUuc2RwTUxpbmVJbmRleCxcclxuICAgICAgfSkuY2F0Y2goKGUpPT57XHJcbiAgICAgICAgTG9nZ2VyLndhcm5pbmcoJ0ZhaWxlZCB0byBzZW5kIGNhbmRpZGF0ZS4nKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBMb2dnZXIuZGVidWcoJ0VtcHR5IGNhbmRpZGF0ZS4nKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIF9vblJlbW90ZVRyYWNrQWRkZWQoZXZlbnQpIHtcclxuICAgIExvZ2dlci5kZWJ1ZygnUmVtb3RlIHRyYWNrIGFkZGVkLicpO1xyXG4gICAgZm9yIChjb25zdCBzdHJlYW0gb2YgZXZlbnQuc3RyZWFtcykge1xyXG4gICAgICBpZiAoIXRoaXMuX3JlbW90ZVN0cmVhbUluZm8uaGFzKHN0cmVhbS5pZCkpIHtcclxuICAgICAgICBMb2dnZXIud2FybmluZygnTWlzc2luZyBzdHJlYW0gaW5mby4nKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCF0aGlzLl9yZW1vdGVTdHJlYW1JbmZvLmdldChzdHJlYW0uaWQpLnN0cmVhbSkge1xyXG4gICAgICAgIHRoaXMuX3NldFN0cmVhbVRvUmVtb3RlU3RyZWFtSW5mbyhzdHJlYW0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5fcGMuaWNlQ29ubmVjdGlvblN0YXRlID09PSAnY29ubmVjdGVkJyB8fFxyXG4gICAgICAgdGhpcy5fcGMuaWNlQ29ubmVjdGlvblN0YXRlID09PSAnY29tcGxldGVkJykge1xyXG4gICAgICB0aGlzLl9jaGVja0ljZUNvbm5lY3Rpb25TdGF0ZUFuZEZpcmVFdmVudCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fYWRkZWRUcmFja0lkcy5jb25jYXQoZXZlbnQudHJhY2suaWQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX29uUmVtb3RlU3RyZWFtQWRkZWQoZXZlbnQpIHtcclxuICAgIExvZ2dlci5kZWJ1ZygnUmVtb3RlIHN0cmVhbSBhZGRlZC4nKTtcclxuICAgIGlmICghdGhpcy5fcmVtb3RlU3RyZWFtSW5mby5oYXMoZXZlbnQuc3RyZWFtLmlkKSkge1xyXG4gICAgICBMb2dnZXIud2FybmluZygnQ2Fubm90IGZpbmQgc291cmNlIGluZm8gZm9yIHN0cmVhbSAnICsgZXZlbnQuc3RyZWFtLmlkKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuX3BjLmljZUNvbm5lY3Rpb25TdGF0ZSA9PT0gJ2Nvbm5lY3RlZCcgfHxcclxuICAgICAgdGhpcy5fcGMuaWNlQ29ubmVjdGlvblN0YXRlID09PSAnY29tcGxldGVkJykge1xyXG4gICAgICB0aGlzLl9zZW5kU2lnbmFsaW5nTWVzc2FnZShTaWduYWxpbmdUeXBlLlRSQUNLU19BRERFRCxcclxuICAgICAgICAgIHRoaXMuX3JlbW90ZVN0cmVhbUluZm8uZ2V0KGV2ZW50LnN0cmVhbS5pZCkudHJhY2tJZHMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fYWRkZWRUcmFja0lkcyA9IHRoaXMuX2FkZGVkVHJhY2tJZHMuY29uY2F0KFxyXG4gICAgICAgICAgdGhpcy5fcmVtb3RlU3RyZWFtSW5mby5nZXQoZXZlbnQuc3RyZWFtLmlkKS50cmFja0lkcyk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBhdWRpb1RyYWNrU291cmNlID0gdGhpcy5fcmVtb3RlU3RyZWFtSW5mby5nZXQoZXZlbnQuc3RyZWFtLmlkKVxyXG4gICAgICAgIC5zb3VyY2UuYXVkaW87XHJcbiAgICBjb25zdCB2aWRlb1RyYWNrU291cmNlID0gdGhpcy5fcmVtb3RlU3RyZWFtSW5mby5nZXQoZXZlbnQuc3RyZWFtLmlkKVxyXG4gICAgICAgIC5zb3VyY2UudmlkZW87XHJcbiAgICBjb25zdCBzb3VyY2VJbmZvID0gbmV3IFN0cmVhbU1vZHVsZS5TdHJlYW1Tb3VyY2VJbmZvKGF1ZGlvVHJhY2tTb3VyY2UsXHJcbiAgICAgICAgdmlkZW9UcmFja1NvdXJjZSk7XHJcbiAgICBpZiAoVXRpbHMuaXNTYWZhcmkoKSkge1xyXG4gICAgICBpZiAoIXNvdXJjZUluZm8uYXVkaW8pIHtcclxuICAgICAgICBldmVudC5zdHJlYW0uZ2V0QXVkaW9UcmFja3MoKS5mb3JFYWNoKCh0cmFjaykgPT4ge1xyXG4gICAgICAgICAgZXZlbnQuc3RyZWFtLnJlbW92ZVRyYWNrKHRyYWNrKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoIXNvdXJjZUluZm8udmlkZW8pIHtcclxuICAgICAgICBldmVudC5zdHJlYW0uZ2V0VmlkZW9UcmFja3MoKS5mb3JFYWNoKCh0cmFjaykgPT4ge1xyXG4gICAgICAgICAgZXZlbnQuc3RyZWFtLnJlbW92ZVRyYWNrKHRyYWNrKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc3QgYXR0cmlidXRlcyA9IHRoaXMuX3JlbW90ZVN0cmVhbUluZm8uZ2V0KGV2ZW50LnN0cmVhbS5pZCkuYXR0cmlidXRlcztcclxuICAgIGNvbnN0IHN0cmVhbSA9IG5ldyBTdHJlYW1Nb2R1bGUuUmVtb3RlU3RyZWFtKHVuZGVmaW5lZCwgdGhpcy5fcmVtb3RlSWQsXHJcbiAgICAgICAgZXZlbnQuc3RyZWFtLCBzb3VyY2VJbmZvLCBhdHRyaWJ1dGVzKTtcclxuICAgIGlmIChzdHJlYW0pIHtcclxuICAgICAgdGhpcy5fcmVtb3RlU3RyZWFtcy5wdXNoKHN0cmVhbSk7XHJcbiAgICAgIGNvbnN0IHN0cmVhbUV2ZW50ID0gbmV3IFN0cmVhbU1vZHVsZS5TdHJlYW1FdmVudCgnc3RyZWFtYWRkZWQnLCB7XHJcbiAgICAgICAgc3RyZWFtOiBzdHJlYW0sXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoc3RyZWFtRXZlbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX29uUmVtb3RlU3RyZWFtUmVtb3ZlZChldmVudCkge1xyXG4gICAgTG9nZ2VyLmRlYnVnKCdSZW1vdGUgc3RyZWFtIHJlbW92ZWQuJyk7XHJcbiAgICBjb25zdCBpID0gdGhpcy5fcmVtb3RlU3RyZWFtcy5maW5kSW5kZXgoKHMpID0+IHtcclxuICAgICAgcmV0dXJuIHMubWVkaWFTdHJlYW0uaWQgPT09IGV2ZW50LnN0cmVhbS5pZDtcclxuICAgIH0pO1xyXG4gICAgaWYgKGkgIT09IC0xKSB7XHJcbiAgICAgIGNvbnN0IHN0cmVhbSA9IHRoaXMuX3JlbW90ZVN0cmVhbXNbaV07XHJcbiAgICAgIHRoaXMuX3N0cmVhbVJlbW92ZWQoc3RyZWFtKTtcclxuICAgICAgdGhpcy5fcmVtb3RlU3RyZWFtcy5zcGxpY2UoaSwgMSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfb25OZWdvdGlhdGlvbm5lZWRlZCgpIHtcclxuICAgIC8vIFRoaXMgaXMgaW50ZW50ZWQgdG8gYmUgZXhlY3V0ZWQgd2hlbiBvbm5lZ290aWF0aW9ubmVlZGVkIGV2ZW50IGlzIGZpcmVkLlxyXG4gICAgLy8gSG93ZXZlciwgb25uZWdvdGlhdGlvbm5lZWRlZCBtYXkgZmlyZSBtdXRpcGxlIHRpbWVzIHdoZW4gbW9yZSB0aGFuIG9uZVxyXG4gICAgLy8gdHJhY2sgaXMgYWRkZWQvcmVtb3ZlZC4gU28gd2UgbWFudWFsbHkgZXhlY3V0ZSB0aGlzIGZ1bmN0aW9uIGFmdGVyXHJcbiAgICAvLyBhZGRpbmcvcmVtb3ZpbmcgdHJhY2sgYW5kIGNyZWF0aW5nIGRhdGEgY2hhbm5lbC5cclxuICAgIExvZ2dlci5kZWJ1ZygnT24gbmVnb3RpYXRpb24gbmVlZGVkLicpO1xyXG5cclxuICAgIGlmICh0aGlzLl9wYy5zaWduYWxpbmdTdGF0ZSA9PT0gJ3N0YWJsZScpIHtcclxuICAgICAgdGhpcy5fZG9OZWdvdGlhdGUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX2lzTmVnb3RpYXRpb25OZWVkZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX29uUmVtb3RlSWNlQ2FuZGlkYXRlKGNhbmRpZGF0ZUluZm8pIHtcclxuICAgIGNvbnN0IGNhbmRpZGF0ZSA9IG5ldyBSVENJY2VDYW5kaWRhdGUoe1xyXG4gICAgICBjYW5kaWRhdGU6IGNhbmRpZGF0ZUluZm8uY2FuZGlkYXRlLFxyXG4gICAgICBzZHBNaWQ6IGNhbmRpZGF0ZUluZm8uc2RwTWlkLFxyXG4gICAgICBzZHBNTGluZUluZGV4OiBjYW5kaWRhdGVJbmZvLnNkcE1MaW5lSW5kZXgsXHJcbiAgICB9KTtcclxuICAgIGlmICh0aGlzLl9wYy5yZW1vdGVEZXNjcmlwdGlvbiAmJiB0aGlzLl9wYy5yZW1vdGVEZXNjcmlwdGlvbi5zZHAgIT09ICcnKSB7XHJcbiAgICAgIExvZ2dlci5kZWJ1ZygnQWRkIHJlbW90ZSBpY2UgY2FuZGlkYXRlcy4nKTtcclxuICAgICAgdGhpcy5fcGMuYWRkSWNlQ2FuZGlkYXRlKGNhbmRpZGF0ZSkuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgTG9nZ2VyLndhcm5pbmcoJ0Vycm9yIHByb2Nlc3NpbmcgSUNFIGNhbmRpZGF0ZTogJyArIGVycm9yKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBMb2dnZXIuZGVidWcoJ0NhY2hlIHJlbW90ZSBpY2UgY2FuZGlkYXRlcy4nKTtcclxuICAgICAgdGhpcy5fcmVtb3RlSWNlQ2FuZGlkYXRlcy5wdXNoKGNhbmRpZGF0ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfb25TaWduYWxpbmdTdGF0ZUNoYW5nZShldmVudCkge1xyXG4gICAgTG9nZ2VyLmRlYnVnKCdTaWduYWxpbmcgc3RhdGUgY2hhbmdlZDogJyArIHRoaXMuX3BjLnNpZ25hbGluZ1N0YXRlKTtcclxuICAgIGlmICh0aGlzLl9wYy5zaWduYWxpbmdTdGF0ZSA9PT0gJ2Nsb3NlZCcpIHtcclxuICAgICAgLy8gc3RvcENoYXRMb2NhbGx5KHBlZXIsIHBlZXIuaWQpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLl9wYy5zaWduYWxpbmdTdGF0ZSA9PT0gJ3N0YWJsZScpIHtcclxuICAgICAgdGhpcy5fbmVnb3RpYXRpbmcgPSBmYWxzZTtcclxuICAgICAgaWYgKHRoaXMuX2lzTmVnb3RpYXRpb25OZWVkZWQpIHtcclxuICAgICAgICB0aGlzLl9vbk5lZ290aWF0aW9ubmVlZGVkKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5fZHJhaW5QZW5kaW5nU3RyZWFtcygpO1xyXG4gICAgICAgIHRoaXMuX2RyYWluUGVuZGluZ01lc3NhZ2VzKCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodGhpcy5fcGMuc2lnbmFsaW5nU3RhdGUgPT09ICdoYXZlLXJlbW90ZS1vZmZlcicpIHtcclxuICAgICAgdGhpcy5fZHJhaW5QZW5kaW5nUmVtb3RlSWNlQ2FuZGlkYXRlcygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX29uSWNlQ29ubmVjdGlvblN0YXRlQ2hhbmdlKGV2ZW50KSB7XHJcbiAgICBpZiAoZXZlbnQuY3VycmVudFRhcmdldC5pY2VDb25uZWN0aW9uU3RhdGUgPT09ICdjbG9zZWQnIHx8XHJcbiAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5pY2VDb25uZWN0aW9uU3RhdGUgPT09ICdmYWlsZWQnKSB7XHJcbiAgICAgIGNvbnN0IGVycm9yID0gbmV3IEVycm9yTW9kdWxlLlAyUEVycm9yKFxyXG4gICAgICAgICAgRXJyb3JNb2R1bGUuZXJyb3JzLlAyUF9XRUJSVENfVU5LTk9XTixcclxuICAgICAgICAgICdJQ0UgY29ubmVjdGlvbiBmYWlsZWQgb3IgY2xvc2VkLicpO1xyXG4gICAgICB0aGlzLl9zdG9wKGVycm9yLCB0cnVlKTtcclxuICAgIH0gZWxzZSBpZiAoZXZlbnQuY3VycmVudFRhcmdldC5pY2VDb25uZWN0aW9uU3RhdGUgPT09ICdjb25uZWN0ZWQnIHx8XHJcbiAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQuaWNlQ29ubmVjdGlvblN0YXRlID09PSAnY29tcGxldGVkJykge1xyXG4gICAgICB0aGlzLl9zZW5kU2lnbmFsaW5nTWVzc2FnZShTaWduYWxpbmdUeXBlLlRSQUNLU19BRERFRCxcclxuICAgICAgICAgIHRoaXMuX2FkZGVkVHJhY2tJZHMpO1xyXG4gICAgICB0aGlzLl9hZGRlZFRyYWNrSWRzID0gW107XHJcbiAgICAgIHRoaXMuX2NoZWNrSWNlQ29ubmVjdGlvblN0YXRlQW5kRmlyZUV2ZW50KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfb25EYXRhQ2hhbm5lbE1lc3NhZ2UoZXZlbnQpIHtcclxuICAgIGNvbnN0IG1lc3NhZ2U9SlNPTi5wYXJzZShldmVudC5kYXRhKTtcclxuICAgIExvZ2dlci5kZWJ1ZygnRGF0YSBjaGFubmVsIG1lc3NhZ2UgcmVjZWl2ZWQ6ICcrbWVzc2FnZS5kYXRhKTtcclxuICAgIHRoaXMuX3NlbmRTaWduYWxpbmdNZXNzYWdlKFNpZ25hbGluZ1R5cGUuREFUQV9SRUNFSVZFRCwgbWVzc2FnZS5pZCk7XHJcbiAgICBjb25zdCBtZXNzYWdlRXZlbnQgPSBuZXcgTWVzc2FnZUV2ZW50KCdtZXNzYWdlcmVjZWl2ZWQnLCB7XHJcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UuZGF0YSxcclxuICAgICAgb3JpZ2luOiB0aGlzLl9yZW1vdGVJZCxcclxuICAgIH0pO1xyXG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KG1lc3NhZ2VFdmVudCk7XHJcbiAgfVxyXG5cclxuICBfb25EYXRhQ2hhbm5lbE9wZW4oZXZlbnQpIHtcclxuICAgIExvZ2dlci5kZWJ1ZygnRGF0YSBDaGFubmVsIGlzIG9wZW5lZC4nKTtcclxuICAgIGlmIChldmVudC50YXJnZXQubGFiZWwgPT09IERhdGFDaGFubmVsTGFiZWwuTUVTU0FHRSkge1xyXG4gICAgICBMb2dnZXIuZGVidWcoJ0RhdGEgY2hhbm5lbCBmb3IgbWVzc2FnZXMgaXMgb3BlbmVkLicpO1xyXG4gICAgICB0aGlzLl9kcmFpblBlbmRpbmdNZXNzYWdlcygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX29uRGF0YUNoYW5uZWxDbG9zZShldmVudCkge1xyXG4gICAgTG9nZ2VyLmRlYnVnKCdEYXRhIENoYW5uZWwgaXMgY2xvc2VkLicpO1xyXG4gIH1cclxuXHJcbiAgX3N0cmVhbVJlbW92ZWQoc3RyZWFtKSB7XHJcbiAgICBpZiAoIXRoaXMuX3JlbW90ZVN0cmVhbUluZm8uaGFzKHN0cmVhbS5tZWRpYVN0cmVhbS5pZCkpIHtcclxuICAgICAgTG9nZ2VyLndhcm5pbmcoJ0Nhbm5vdCBmaW5kIHN0cmVhbSBpbmZvLicpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fc2VuZFNpZ25hbGluZ01lc3NhZ2UoU2lnbmFsaW5nVHlwZS5UUkFDS1NfUkVNT1ZFRCxcclxuICAgICAgICB0aGlzLl9yZW1vdGVTdHJlYW1JbmZvLmdldChzdHJlYW0ubWVkaWFTdHJlYW0uaWQpLnRyYWNrSWRzKTtcclxuICAgIGNvbnN0IGV2ZW50ID0gbmV3IE93dEV2ZW50KCdlbmRlZCcpO1xyXG4gICAgc3RyZWFtLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgX2lzVW5pZmllZFBsYW4oKSB7XHJcbiAgICBpZiAoVXRpbHMuaXNGaXJlZm94KCkpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBjb25zdCBwYyA9IG5ldyBSVENQZWVyQ29ubmVjdGlvbih7XHJcbiAgICAgIHNkcFNlbWFudGljczogJ3VuaWZpZWQtcGxhbicsXHJcbiAgICB9KTtcclxuICAgIHJldHVybiAocGMuZ2V0Q29uZmlndXJhdGlvbigpICYmIHBjLmdldENvbmZpZ3VyYXRpb24oKS5zZHBTZW1hbnRpY3MgPT09XHJcbiAgICAgICdwbGFuLWInKTtcclxuICB9XHJcblxyXG4gIF9jcmVhdGVQZWVyQ29ubmVjdGlvbigpIHtcclxuICAgIGNvbnN0IHBjQ29uZmlndXJhdGlvbiA9IHRoaXMuX2NvbmZpZy5ydGNDb25maWd1cmF0aW9uIHx8IHt9O1xyXG4gICAgaWYgKFV0aWxzLmlzQ2hyb21lKCkpIHtcclxuICAgICAgcGNDb25maWd1cmF0aW9uLnNkcFNlbWFudGljcyA9ICd1bmlmaWVkLXBsYW4nO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fcGMgPSBuZXcgUlRDUGVlckNvbm5lY3Rpb24ocGNDb25maWd1cmF0aW9uKTtcclxuICAgIC8vIEZpcmVmb3ggNTkgaW1wbGVtZW50ZWQgYWRkVHJhbnNjZWl2ZXIuIEhvd2V2ZXIsIG1pZCBpbiBTRFAgd2lsbCBkaWZmZXIgZnJvbSB0cmFjaydzIElEIGluIHRoaXMgY2FzZS4gQW5kIHRyYW5zY2VpdmVyJ3MgbWlkIGlzIG51bGwuXHJcbiAgICBpZiAodHlwZW9mIHRoaXMuX3BjLmFkZFRyYW5zY2VpdmVyID09PSAnZnVuY3Rpb24nICYmIFV0aWxzLmlzU2FmYXJpKCkpIHtcclxuICAgICAgdGhpcy5fcGMuYWRkVHJhbnNjZWl2ZXIoJ2F1ZGlvJyk7XHJcbiAgICAgIHRoaXMuX3BjLmFkZFRyYW5zY2VpdmVyKCd2aWRlbycpO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLl9pc1VuaWZpZWRQbGFuKCkgJiYgIVV0aWxzLmlzU2FmYXJpKCkpIHtcclxuICAgICAgdGhpcy5fcGMub25hZGRzdHJlYW0gPSAoZXZlbnQpID0+IHtcclxuICAgICAgICAvLyBUT0RPOiBMZWdhY3kgQVBJLCBzaG91bGQgYmUgcmVtb3ZlZCB3aGVuIGFsbCBVQXMgaW1wbGVtZW50ZWQgV2ViUlRDIDEuMC5cclxuICAgICAgICB0aGlzLl9vblJlbW90ZVN0cmVhbUFkZGVkLmFwcGx5KHRoaXMsIFtldmVudF0pO1xyXG4gICAgICB9O1xyXG4gICAgICB0aGlzLl9wYy5vbnJlbW92ZXN0cmVhbSA9IChldmVudCkgPT4ge1xyXG4gICAgICAgIHRoaXMuX29uUmVtb3RlU3RyZWFtUmVtb3ZlZC5hcHBseSh0aGlzLCBbZXZlbnRdKTtcclxuICAgICAgfTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX3BjLm9udHJhY2sgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICB0aGlzLl9vblJlbW90ZVRyYWNrQWRkZWQuYXBwbHkodGhpcywgW2V2ZW50XSk7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICB0aGlzLl9wYy5vbmljZWNhbmRpZGF0ZSA9IChldmVudCkgPT4ge1xyXG4gICAgICB0aGlzLl9vbkxvY2FsSWNlQ2FuZGlkYXRlLmFwcGx5KHRoaXMsIFtldmVudF0pO1xyXG4gICAgfTtcclxuICAgIHRoaXMuX3BjLm9uc2lnbmFsaW5nc3RhdGVjaGFuZ2UgPSAoZXZlbnQpID0+IHtcclxuICAgICAgdGhpcy5fb25TaWduYWxpbmdTdGF0ZUNoYW5nZS5hcHBseSh0aGlzLCBbZXZlbnRdKTtcclxuICAgIH07XHJcbiAgICB0aGlzLl9wYy5vbmRhdGFjaGFubmVsID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgIExvZ2dlci5kZWJ1ZygnT24gZGF0YSBjaGFubmVsLicpO1xyXG4gICAgICAvLyBTYXZlIHJlbW90ZSBjcmVhdGVkIGRhdGEgY2hhbm5lbC5cclxuICAgICAgaWYgKCF0aGlzLl9kYXRhQ2hhbm5lbHMuaGFzKGV2ZW50LmNoYW5uZWwubGFiZWwpKSB7XHJcbiAgICAgICAgdGhpcy5fZGF0YUNoYW5uZWxzLnNldChldmVudC5jaGFubmVsLmxhYmVsLCBldmVudC5jaGFubmVsKTtcclxuICAgICAgICBMb2dnZXIuZGVidWcoJ1NhdmUgcmVtb3RlIGNyZWF0ZWQgZGF0YSBjaGFubmVsLicpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuX2JpbmRFdmVudHNUb0RhdGFDaGFubmVsKGV2ZW50LmNoYW5uZWwpO1xyXG4gICAgfTtcclxuICAgIHRoaXMuX3BjLm9uaWNlY29ubmVjdGlvbnN0YXRlY2hhbmdlID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgIHRoaXMuX29uSWNlQ29ubmVjdGlvblN0YXRlQ2hhbmdlLmFwcGx5KHRoaXMsIFtldmVudF0pO1xyXG4gICAgfTtcclxuICAgIC8qXHJcbiAgICB0aGlzLl9wYy5vbmljZUNoYW5uZWxTdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIF9vbkljZUNoYW5uZWxTdGF0ZUNoYW5nZShwZWVyLCBldmVudCk7XHJcbiAgICB9O1xyXG4gICAgID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIG9uTmVnb3RpYXRpb25uZWVkZWQocGVlcnNbcGVlci5pZF0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL0RhdGFDaGFubmVsXHJcbiAgICB0aGlzLl9wYy5vbmRhdGFjaGFubmVsID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgTG9nZ2VyLmRlYnVnKG15SWQgKyAnOiBPbiBkYXRhIGNoYW5uZWwnKTtcclxuICAgICAgLy8gU2F2ZSByZW1vdGUgY3JlYXRlZCBkYXRhIGNoYW5uZWwuXHJcbiAgICAgIGlmICghcGVlci5kYXRhQ2hhbm5lbHNbZXZlbnQuY2hhbm5lbC5sYWJlbF0pIHtcclxuICAgICAgICBwZWVyLmRhdGFDaGFubmVsc1tldmVudC5jaGFubmVsLmxhYmVsXSA9IGV2ZW50LmNoYW5uZWw7XHJcbiAgICAgICAgTG9nZ2VyLmRlYnVnKCdTYXZlIHJlbW90ZSBjcmVhdGVkIGRhdGEgY2hhbm5lbC4nKTtcclxuICAgICAgfVxyXG4gICAgICBiaW5kRXZlbnRzVG9EYXRhQ2hhbm5lbChldmVudC5jaGFubmVsLCBwZWVyKTtcclxuICAgIH07Ki9cclxuICB9XHJcblxyXG4gIF9kcmFpblBlbmRpbmdTdHJlYW1zKCkge1xyXG4gICAgbGV0IG5lZ290aWF0aW9uTmVlZGVkID0gZmFsc2U7XHJcbiAgICBMb2dnZXIuZGVidWcoJ0RyYWluaW5nIHBlbmRpbmcgc3RyZWFtcy4nKTtcclxuICAgIGlmICh0aGlzLl9wYyAmJiB0aGlzLl9wYy5zaWduYWxpbmdTdGF0ZSA9PT0gJ3N0YWJsZScpIHtcclxuICAgICAgTG9nZ2VyLmRlYnVnKCdQZWVyIGNvbm5lY3Rpb24gaXMgcmVhZHkgZm9yIGRyYWluaW5nIHBlbmRpbmcgc3RyZWFtcy4nKTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9wZW5kaW5nU3RyZWFtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHN0cmVhbSA9IHRoaXMuX3BlbmRpbmdTdHJlYW1zW2ldO1xyXG4gICAgICAgIC8vIE9uTmVnb3RpYXRpb25OZWVkZWQgZXZlbnQgd2lsbCBiZSB0cmlnZ2VyZWQgaW1tZWRpYXRlbHkgYWZ0ZXIgYWRkaW5nIHN0cmVhbSB0byBQZWVyQ29ubmVjdGlvbiBpbiBGaXJlZm94LlxyXG4gICAgICAgIC8vIEFuZCBPbk5lZ290aWF0aW9uTmVlZGVkIGhhbmRsZXIgd2lsbCBleGVjdXRlIGRyYWluUGVuZGluZ1N0cmVhbXMuIFRvIGF2b2lkIGFkZCB0aGUgc2FtZSBzdHJlYW0gbXVsdGlwbGUgdGltZXMsXHJcbiAgICAgICAgLy8gc2hpZnQgaXQgZnJvbSBwZW5kaW5nIHN0cmVhbSBsaXN0IGJlZm9yZSBhZGRpbmcgaXQgdG8gUGVlckNvbm5lY3Rpb24uXHJcbiAgICAgICAgdGhpcy5fcGVuZGluZ1N0cmVhbXMuc2hpZnQoKTtcclxuICAgICAgICBpZiAoIXN0cmVhbS5tZWRpYVN0cmVhbSkge1xyXG4gICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAoY29uc3QgdHJhY2sgb2Ygc3RyZWFtLm1lZGlhU3RyZWFtLmdldFRyYWNrcygpKSB7XHJcbiAgICAgICAgICB0aGlzLl9wYy5hZGRUcmFjayh0cmFjaywgc3RyZWFtLm1lZGlhU3RyZWFtKTtcclxuICAgICAgICAgIG5lZ290aWF0aW9uTmVlZGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgTG9nZ2VyLmRlYnVnKCdBZGRlZCBzdHJlYW0gdG8gcGVlciBjb25uZWN0aW9uLicpO1xyXG4gICAgICAgIHRoaXMuX3B1Ymxpc2hpbmdTdHJlYW1zLnB1c2goc3RyZWFtKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLl9wZW5kaW5nU3RyZWFtcy5sZW5ndGggPSAwO1xyXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuX3BlbmRpbmdVbnB1Ymxpc2hTdHJlYW1zLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9wZW5kaW5nVW5wdWJsaXNoU3RyZWFtc1tqXS5tZWRpYVN0cmVhbSkge1xyXG4gICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3BjLnJlbW92ZVN0cmVhbSh0aGlzLl9wZW5kaW5nVW5wdWJsaXNoU3RyZWFtc1tqXS5tZWRpYVN0cmVhbSk7XHJcbiAgICAgICAgbmVnb3RpYXRpb25OZWVkZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX3VucHVibGlzaFByb21pc2VzLmdldChcclxuICAgICAgICAgICAgdGhpcy5fcGVuZGluZ1VucHVibGlzaFN0cmVhbXNbal0ubWVkaWFTdHJlYW0uaWQpLnJlc29sdmUoKTtcclxuICAgICAgICB0aGlzLl9wdWJsaXNoZWRTdHJlYW1zLmRlbGV0ZSh0aGlzLl9wZW5kaW5nVW5wdWJsaXNoU3RyZWFtc1tqXSk7XHJcbiAgICAgICAgTG9nZ2VyLmRlYnVnKCdSZW1vdmUgc3RyZWFtLicpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuX3BlbmRpbmdVbnB1Ymxpc2hTdHJlYW1zLmxlbmd0aCA9IDA7XHJcbiAgICB9XHJcbiAgICBpZiAobmVnb3RpYXRpb25OZWVkZWQpIHtcclxuICAgICAgdGhpcy5fb25OZWdvdGlhdGlvbm5lZWRlZCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX2RyYWluUGVuZGluZ1JlbW90ZUljZUNhbmRpZGF0ZXMoKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3JlbW90ZUljZUNhbmRpZGF0ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgTG9nZ2VyLmRlYnVnKCdBZGQgY2FuZGlkYXRlJyk7XHJcbiAgICAgIHRoaXMuX3BjLmFkZEljZUNhbmRpZGF0ZSh0aGlzLl9yZW1vdGVJY2VDYW5kaWRhdGVzW2ldKS5jYXRjaCgoZXJyb3IpPT57XHJcbiAgICAgICAgTG9nZ2VyLndhcm5pbmcoJ0Vycm9yIHByb2Nlc3NpbmcgSUNFIGNhbmRpZGF0ZTogJytlcnJvcik7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fcmVtb3RlSWNlQ2FuZGlkYXRlcy5sZW5ndGggPSAwO1xyXG4gIH1cclxuXHJcbiAgX2RyYWluUGVuZGluZ01lc3NhZ2VzKCkge1xyXG4gICAgTG9nZ2VyLmRlYnVnKCdEcmFpbmluZyBwZW5kaW5nIG1lc3NhZ2VzLicpO1xyXG4gICAgaWYgKHRoaXMuX3BlbmRpbmdNZXNzYWdlcy5sZW5ndGggPT0gMCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBkYyA9IHRoaXMuX2RhdGFDaGFubmVscy5nZXQoRGF0YUNoYW5uZWxMYWJlbC5NRVNTQUdFKTtcclxuICAgIGlmIChkYyAmJiBkYy5yZWFkeVN0YXRlID09PSAnb3BlbicpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9wZW5kaW5nTWVzc2FnZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBMb2dnZXIuZGVidWcoJ1NlbmRpbmcgbWVzc2FnZSB2aWEgZGF0YSBjaGFubmVsOiAnK3RoaXMuX3BlbmRpbmdNZXNzYWdlc1tpXSk7XHJcbiAgICAgICAgZGMuc2VuZChKU09OLnN0cmluZ2lmeSh0aGlzLl9wZW5kaW5nTWVzc2FnZXNbaV0pKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLl9wZW5kaW5nTWVzc2FnZXMubGVuZ3RoID0gMDtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5fcGMgJiYgIWRjKSB7XHJcbiAgICAgIHRoaXMuX2NyZWF0ZURhdGFDaGFubmVsKERhdGFDaGFubmVsTGFiZWwuTUVTU0FHRSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfc2VuZFN0cmVhbUluZm8oc3RyZWFtKSB7XHJcbiAgICBpZiAoIXN0cmVhbSB8fCAhc3RyZWFtLm1lZGlhU3RyZWFtKSB7XHJcbiAgICAgIHJldHVybiBuZXcgRXJyb3JNb2R1bGUuUDJQRXJyb3IoRXJyb3JNb2R1bGUuZXJyb3JzLlAyUF9DTElFTlRfSUxMRUdBTF9BUkdVTUVOVCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBpbmZvID0gW107XHJcbiAgICBzdHJlYW0ubWVkaWFTdHJlYW0uZ2V0VHJhY2tzKCkubWFwKCh0cmFjaykgPT4ge1xyXG4gICAgICBpbmZvLnB1c2goe1xyXG4gICAgICAgIGlkOiB0cmFjay5pZCxcclxuICAgICAgICBzb3VyY2U6IHN0cmVhbS5zb3VyY2VbdHJhY2sua2luZF0sXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoW3RoaXMuX3NlbmRTaWduYWxpbmdNZXNzYWdlKFNpZ25hbGluZ1R5cGUuVFJBQ0tfU09VUkNFUyxcclxuICAgICAgICBpbmZvKSxcclxuICAgIHRoaXMuX3NlbmRTaWduYWxpbmdNZXNzYWdlKFNpZ25hbGluZ1R5cGUuU1RSRUFNX0lORk8sIHtcclxuICAgICAgaWQ6IHN0cmVhbS5tZWRpYVN0cmVhbS5pZCxcclxuICAgICAgYXR0cmlidXRlczogc3RyZWFtLmF0dHJpYnV0ZXMsXHJcbiAgICAgIC8vIFRyYWNrIElEcyBtYXkgbm90IG1hdGNoIGF0IHNlbmRlciBhbmQgcmVjZWl2ZXIgc2lkZXMuXHJcbiAgICAgIHRyYWNrczogQXJyYXkuZnJvbShpbmZvLCAoaXRlbSkgPT4gaXRlbS5pZCksXHJcbiAgICAgIC8vIFRoaXMgaXMgYSB3b3JrYXJvdW5kIGZvciBTYWZhcmkuIFBsZWFzZSB1c2UgdHJhY2stc291cmNlcyBpZiBwb3NzaWJsZS5cclxuICAgICAgc291cmNlOiBzdHJlYW0uc291cmNlLFxyXG4gICAgfSksXHJcbiAgICBdKTtcclxuICB9XHJcblxyXG5cclxuICBfc2VuZFN5c0luZm9JZk5lY2Vzc2FyeSgpIHtcclxuICAgIGlmICh0aGlzLl9pbmZvU2VudCkge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9pbmZvU2VudCA9IHRydWU7XHJcbiAgICByZXR1cm4gdGhpcy5fc2VuZFNpZ25hbGluZ01lc3NhZ2UoU2lnbmFsaW5nVHlwZS5VQSwgc3lzSW5mbyk7XHJcbiAgfVxyXG5cclxuICBfc2VuZENsb3NlZE1zZ0lmTmVjZXNzYXJ5KCkge1xyXG4gICAgaWYgKHRoaXMuX3BjLnJlbW90ZURlc2NyaXB0aW9uID09PSBudWxsIHx8XHJcbiAgICAgICAgdGhpcy5fcGMucmVtb3RlRGVzY3JpcHRpb24uc2RwID09PSAnJykge1xyXG4gICAgICByZXR1cm4gdGhpcy5fc2VuZFNpZ25hbGluZ01lc3NhZ2UoU2lnbmFsaW5nVHlwZS5DTE9TRUQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gIH1cclxuXHJcbiAgX2hhbmRsZVJlbW90ZUNhcGFiaWxpdHkodWEpIHtcclxuICAgIGlmICh1YS5zZGsgJiYgdWEuc2RrICYmIHVhLnNkay50eXBlID09PSAnSmF2YVNjcmlwdCcgJiYgdWEucnVudGltZSAmJlxyXG4gICAgICAgIHVhLnJ1bnRpbWUubmFtZSA9PT0gJ0ZpcmVmb3gnKSB7XHJcbiAgICAgIHRoaXMuX3JlbW90ZVNpZGVTdXBwb3J0c1JlbW92ZVN0cmVhbSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLl9yZW1vdGVTaWRlU3VwcG9ydHNQbGFuQiA9IGZhbHNlO1xyXG4gICAgICB0aGlzLl9yZW1vdGVTaWRlU3VwcG9ydHNVbmlmaWVkUGxhbiA9IHRydWU7XHJcbiAgICB9IGVsc2UgeyAvLyBSZW1vdGUgc2lkZSBpcyBpT1MvQW5kcm9pZC9DKysgd2hpY2ggdXNlcyBHb29nbGUncyBXZWJSVEMgc3RhY2suXHJcbiAgICAgIHRoaXMuX3JlbW90ZVNpZGVTdXBwb3J0c1JlbW92ZVN0cmVhbSA9IHRydWU7XHJcbiAgICAgIHRoaXMuX3JlbW90ZVNpZGVTdXBwb3J0c1BsYW5CID0gdHJ1ZTtcclxuICAgICAgdGhpcy5fcmVtb3RlU2lkZVN1cHBvcnRzVW5pZmllZFBsYW4gPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIF9kb05lZ290aWF0ZSgpIHtcclxuICAgIHRoaXMuX2NyZWF0ZUFuZFNlbmRPZmZlcigpO1xyXG4gIH1cclxuXHJcbiAgX3NldENvZGVjT3JkZXIoc2RwKSB7XHJcbiAgICBpZiAodGhpcy5fY29uZmlnLmF1ZGlvRW5jb2RpbmdzKSB7XHJcbiAgICAgIGNvbnN0IGF1ZGlvQ29kZWNOYW1lcyA9IEFycmF5LmZyb20odGhpcy5fY29uZmlnLmF1ZGlvRW5jb2RpbmdzLFxyXG4gICAgICAgICAgKGVuY29kaW5nUGFyYW1ldGVycykgPT4gZW5jb2RpbmdQYXJhbWV0ZXJzLmNvZGVjLm5hbWUpO1xyXG4gICAgICBzZHAgPSBTZHBVdGlscy5yZW9yZGVyQ29kZWNzKHNkcCwgJ2F1ZGlvJywgYXVkaW9Db2RlY05hbWVzKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLl9jb25maWcudmlkZW9FbmNvZGluZ3MpIHtcclxuICAgICAgY29uc3QgdmlkZW9Db2RlY05hbWVzID0gQXJyYXkuZnJvbSh0aGlzLl9jb25maWcudmlkZW9FbmNvZGluZ3MsXHJcbiAgICAgICAgICAoZW5jb2RpbmdQYXJhbWV0ZXJzKSA9PiBlbmNvZGluZ1BhcmFtZXRlcnMuY29kZWMubmFtZSk7XHJcbiAgICAgIHNkcCA9IFNkcFV0aWxzLnJlb3JkZXJDb2RlY3Moc2RwLCAndmlkZW8nLCB2aWRlb0NvZGVjTmFtZXMpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHNkcDtcclxuICB9XHJcblxyXG4gIF9zZXRNYXhCaXRyYXRlKHNkcCwgb3B0aW9ucykge1xyXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLmF1ZGlvRW5jb2RpbmdzID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBzZHAgPSBTZHBVdGlscy5zZXRNYXhCaXRyYXRlKHNkcCwgb3B0aW9ucy5hdWRpb0VuY29kaW5ncyk7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMudmlkZW9FbmNvZGluZ3MgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIHNkcCA9IFNkcFV0aWxzLnNldE1heEJpdHJhdGUoc2RwLCBvcHRpb25zLnZpZGVvRW5jb2RpbmdzKTtcclxuICAgIH1cclxuICAgIHJldHVybiBzZHA7XHJcbiAgfVxyXG5cclxuICBfc2V0UnRwU2VuZGVyT3B0aW9ucyhzZHAsIG9wdGlvbnMpIHtcclxuICAgIHNkcCA9IHRoaXMuX3NldE1heEJpdHJhdGUoc2RwLCBvcHRpb25zKTtcclxuICAgIHJldHVybiBzZHA7XHJcbiAgfVxyXG5cclxuICBfc2V0UnRwUmVjZWl2ZXJPcHRpb25zKHNkcCkge1xyXG4gICAgc2RwID0gdGhpcy5fc2V0Q29kZWNPcmRlcihzZHApO1xyXG4gICAgcmV0dXJuIHNkcDtcclxuICB9XHJcblxyXG4gIF9jcmVhdGVBbmRTZW5kT2ZmZXIoKSB7XHJcbiAgICBpZiAoIXRoaXMuX3BjKSB7XHJcbiAgICAgIExvZ2dlci5lcnJvcignUGVlciBjb25uZWN0aW9uIGhhdmUgbm90IGJlZW4gY3JlYXRlZC4nKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5faXNOZWdvdGlhdGlvbk5lZWRlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5faXNDYWxsZXIgPSB0cnVlO1xyXG4gICAgbGV0IGxvY2FsRGVzYztcclxuICAgIHRoaXMuX3BjLmNyZWF0ZU9mZmVyKCkudGhlbigoZGVzYykgPT4ge1xyXG4gICAgICBkZXNjLnNkcCA9IHRoaXMuX3NldFJ0cFJlY2VpdmVyT3B0aW9ucyhkZXNjLnNkcCk7XHJcbiAgICAgIGxvY2FsRGVzYyA9IGRlc2M7XHJcbiAgICAgIGlmKHRoaXMuX3BjLnNpZ25hbGluZ1N0YXRlPT09J3N0YWJsZScpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYy5zZXRMb2NhbERlc2NyaXB0aW9uKGRlc2MpLnRoZW4oKCk9PntcclxuICAgICAgICAgIHJldHVybiB0aGlzLl9zZW5kU2RwKGxvY2FsRGVzYyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pLmNhdGNoKChlKSA9PiB7XHJcbiAgICAgIExvZ2dlci5lcnJvcihlLm1lc3NhZ2UgKyAnIFBsZWFzZSBjaGVjayB5b3VyIGNvZGVjIHNldHRpbmdzLicpO1xyXG4gICAgICBjb25zdCBlcnJvciA9IG5ldyBFcnJvck1vZHVsZS5QMlBFcnJvcihFcnJvck1vZHVsZS5lcnJvcnMuUDJQX1dFQlJUQ19TRFAsXHJcbiAgICAgICAgICBlLm1lc3NhZ2UpO1xyXG4gICAgICB0aGlzLl9zdG9wKGVycm9yLCB0cnVlKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgX2NyZWF0ZUFuZFNlbmRBbnN3ZXIoKSB7XHJcbiAgICB0aGlzLl9kcmFpblBlbmRpbmdTdHJlYW1zKCk7XHJcbiAgICB0aGlzLl9pc05lZ290aWF0aW9uTmVlZGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLl9pc0NhbGxlciA9IGZhbHNlO1xyXG4gICAgbGV0IGxvY2FsRGVzYztcclxuICAgIHRoaXMuX3BjLmNyZWF0ZUFuc3dlcigpLnRoZW4oKGRlc2MpID0+IHtcclxuICAgICAgZGVzYy5zZHAgPSB0aGlzLl9zZXRSdHBSZWNlaXZlck9wdGlvbnMoZGVzYy5zZHApO1xyXG4gICAgICBsb2NhbERlc2M9ZGVzYztcclxuICAgICAgdGhpcy5fbG9nQ3VycmVudEFuZFBlbmRpbmdMb2NhbERlc2NyaXB0aW9uKCk7XHJcbiAgICAgIHJldHVybiB0aGlzLl9wYy5zZXRMb2NhbERlc2NyaXB0aW9uKGRlc2MpO1xyXG4gICAgfSkudGhlbigoKT0+e1xyXG4gICAgICByZXR1cm4gdGhpcy5fc2VuZFNkcChsb2NhbERlc2MpO1xyXG4gICAgfSkuY2F0Y2goKGUpID0+IHtcclxuICAgICAgTG9nZ2VyLmVycm9yKGUubWVzc2FnZSArICcgUGxlYXNlIGNoZWNrIHlvdXIgY29kZWMgc2V0dGluZ3MuJyk7XHJcbiAgICAgIGNvbnN0IGVycm9yID0gbmV3IEVycm9yTW9kdWxlLlAyUEVycm9yKEVycm9yTW9kdWxlLmVycm9ycy5QMlBfV0VCUlRDX1NEUCxcclxuICAgICAgICAgIGUubWVzc2FnZSk7XHJcbiAgICAgIHRoaXMuX3N0b3AoZXJyb3IsIHRydWUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBfbG9nQ3VycmVudEFuZFBlbmRpbmdMb2NhbERlc2NyaXB0aW9uKCl7XHJcbiAgICBMb2dnZXIuaW5mbygnQ3VycmVudCBkZXNjcmlwdGlvbjogJyt0aGlzLl9wYy5jdXJyZW50TG9jYWxEZXNjcmlwdGlvbik7XHJcbiAgICBMb2dnZXIuaW5mbygnUGVuZGluZyBkZXNjcmlwdGlvbjogJyt0aGlzLl9wYy5wZW5kaW5nTG9jYWxEZXNjcmlwdGlvbik7XHJcbiAgfVxyXG5cclxuICBfZ2V0QW5kRGVsZXRlVHJhY2tTb3VyY2VJbmZvKHRyYWNrcykge1xyXG4gICAgaWYgKHRyYWNrcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNvbnN0IHRyYWNrSWQgPSB0cmFja3NbMF0uaWQ7XHJcbiAgICAgIGlmICh0aGlzLl9yZW1vdGVUcmFja1NvdXJjZUluZm8uaGFzKHRyYWNrSWQpKSB7XHJcbiAgICAgICAgY29uc3Qgc291cmNlSW5mbyA9IHRoaXMuX3JlbW90ZVRyYWNrU291cmNlSW5mby5nZXQodHJhY2tJZCk7XHJcbiAgICAgICAgdGhpcy5fcmVtb3RlVHJhY2tTb3VyY2VJbmZvLmRlbGV0ZSh0cmFja0lkKTtcclxuICAgICAgICByZXR1cm4gc291cmNlSW5mbztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBMb2dnZXIud2FybmluZygnQ2Fubm90IGZpbmQgc291cmNlIGluZm8gZm9yICcgKyB0cmFja0lkKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX3VucHVibGlzaChzdHJlYW0pIHtcclxuICAgIGlmIChuYXZpZ2F0b3IubW96R2V0VXNlck1lZGlhIHx8ICF0aGlzLl9yZW1vdGVTaWRlU3VwcG9ydHNSZW1vdmVTdHJlYW0pIHtcclxuICAgICAgLy8gQWN0dWFsbHkgdW5wdWJsaXNoIGlzIHN1cHBvcnRlZC4gSXQgaXMgYSBsaXR0bGUgYml0IGNvbXBsZXggc2luY2UgRmlyZWZveCBpbXBsZW1lbnRlZCBXZWJSVEMgc3BlYyB3aGlsZSBDaHJvbWUgaW1wbGVtZW50ZWQgYW4gb2xkIEFQSS5cclxuICAgICAgTG9nZ2VyLmVycm9yKFxyXG4gICAgICAgICAgJ1N0b3BwaW5nIGEgcHVibGljYXRpb24gaXMgbm90IHN1cHBvcnRlZCBvbiBGaXJlZm94LiBQbGVhc2UgdXNlIFAyUENsaWVudC5zdG9wKCkgdG8gc3RvcCB0aGUgY29ubmVjdGlvbiB3aXRoIHJlbW90ZSBlbmRwb2ludC4nXHJcbiAgICAgICk7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3JNb2R1bGUuUDJQRXJyb3IoXHJcbiAgICAgICAgICBFcnJvck1vZHVsZS5lcnJvcnMuUDJQX0NMSUVOVF9VTlNVUFBPUlRFRF9NRVRIT0QpKTtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5fcHVibGlzaGVkU3RyZWFtcy5oYXMoc3RyZWFtKSkge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yTW9kdWxlLlAyUEVycm9yKFxyXG4gICAgICAgICAgRXJyb3JNb2R1bGUuZXJyb3JzLlAyUF9DTElFTlRfSUxMRUdBTF9BUkdVTUVOVCkpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fcGVuZGluZ1VucHVibGlzaFN0cmVhbXMucHVzaChzdHJlYW0pO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgdGhpcy5fdW5wdWJsaXNoUHJvbWlzZXMuc2V0KHN0cmVhbS5tZWRpYVN0cmVhbS5pZCwge1xyXG4gICAgICAgIHJlc29sdmU6IHJlc29sdmUsXHJcbiAgICAgICAgcmVqZWN0OiByZWplY3QsXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLl9kcmFpblBlbmRpbmdTdHJlYW1zKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vIE1ha2Ugc3VyZSB8X3BjfCBpcyBhdmFpbGFibGUgYmVmb3JlIGNhbGxpbmcgdGhpcyBtZXRob2QuXHJcbiAgX2NyZWF0ZURhdGFDaGFubmVsKGxhYmVsKSB7XHJcbiAgICBpZiAodGhpcy5fZGF0YUNoYW5uZWxzLmhhcyhsYWJlbCkpIHtcclxuICAgICAgTG9nZ2VyLndhcm5pbmcoJ0RhdGEgY2hhbm5lbCBsYWJlbGVkICcrIGxhYmVsKycgYWxyZWFkeSBleGlzdHMuJyk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5fcGMpIHtcclxuICAgICAgTG9nZ2VyLmRlYnVnKCdQZWVyQ29ubmVjdGlvbiBpcyBub3QgYXZhaWxhYmxlIGJlZm9yZSBjcmVhdGluZyBEYXRhQ2hhbm5lbC4nKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgTG9nZ2VyLmRlYnVnKCdDcmVhdGUgZGF0YSBjaGFubmVsLicpO1xyXG4gICAgY29uc3QgZGMgPSB0aGlzLl9wYy5jcmVhdGVEYXRhQ2hhbm5lbChsYWJlbCk7XHJcbiAgICB0aGlzLl9iaW5kRXZlbnRzVG9EYXRhQ2hhbm5lbChkYyk7XHJcbiAgICB0aGlzLl9kYXRhQ2hhbm5lbHMuc2V0KERhdGFDaGFubmVsTGFiZWwuTUVTU0FHRSwgZGMpO1xyXG4gICAgdGhpcy5fb25OZWdvdGlhdGlvbm5lZWRlZCgpO1xyXG4gIH1cclxuXHJcbiAgX2JpbmRFdmVudHNUb0RhdGFDaGFubmVsKGRjKSB7XHJcbiAgICBkYy5vbm1lc3NhZ2UgPSAoZXZlbnQpID0+IHtcclxuICAgICAgdGhpcy5fb25EYXRhQ2hhbm5lbE1lc3NhZ2UuYXBwbHkodGhpcywgW2V2ZW50XSk7XHJcbiAgICB9O1xyXG4gICAgZGMub25vcGVuID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgIHRoaXMuX29uRGF0YUNoYW5uZWxPcGVuLmFwcGx5KHRoaXMsIFtldmVudF0pO1xyXG4gICAgfTtcclxuICAgIGRjLm9uY2xvc2UgPSAoZXZlbnQpID0+IHtcclxuICAgICAgdGhpcy5fb25EYXRhQ2hhbm5lbENsb3NlLmFwcGx5KHRoaXMsIFtldmVudF0pO1xyXG4gICAgfTtcclxuICAgIGRjLm9uZXJyb3IgPSAoZXZlbnQpID0+IHtcclxuICAgICAgTG9nZ2VyLmRlYnVnKCdEYXRhIENoYW5uZWwgRXJyb3I6JywgZXJyb3IpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8vIFJldHVybnMgYWxsIE1lZGlhU3RyZWFtcyBpdCBiZWxvbmdzIHRvLlxyXG4gIF9nZXRTdHJlYW1CeVRyYWNrKG1lZGlhU3RyZWFtVHJhY2spIHtcclxuICAgIGNvbnN0IHN0cmVhbXMgPSBbXTtcclxuICAgIGZvciAoY29uc3QgW2lkLCBpbmZvXSBvZiB0aGlzLl9yZW1vdGVTdHJlYW1JbmZvKSB7XHJcbiAgICAgIGlmICghaW5mby5zdHJlYW0gfHwgIWluZm8uc3RyZWFtLm1lZGlhU3RyZWFtKSB7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuICAgICAgZm9yIChjb25zdCB0cmFjayBvZiBpbmZvLnN0cmVhbS5tZWRpYVN0cmVhbS5nZXRUcmFja3MoKSkge1xyXG4gICAgICAgIGlmIChtZWRpYVN0cmVhbVRyYWNrID09PSB0cmFjaykge1xyXG4gICAgICAgICAgc3RyZWFtcy5wdXNoKGluZm8uc3RyZWFtLm1lZGlhU3RyZWFtKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBzdHJlYW1zO1xyXG4gIH1cclxuXHJcbiAgX2FyZUFsbFRyYWNrc0VuZGVkKG1lZGlhU3RyZWFtKSB7XHJcbiAgICBmb3IgKGNvbnN0IHRyYWNrIG9mIG1lZGlhU3RyZWFtLmdldFRyYWNrcygpKSB7XHJcbiAgICAgIGlmICh0cmFjay5yZWFkeVN0YXRlID09PSAnbGl2ZScpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgX3N0b3AoZXJyb3IsIG5vdGlmeVJlbW90ZSkge1xyXG4gICAgbGV0IHByb21pc2VFcnJvciA9IGVycm9yO1xyXG4gICAgaWYgKCFwcm9taXNlRXJyb3IpIHtcclxuICAgICAgcHJvbWlzZUVycm9yID0gbmV3IEVycm9yTW9kdWxlLlAyUEVycm9yKFxyXG4gICAgICAgICAgRXJyb3JNb2R1bGUuZXJyb3JzLlAyUF9DTElFTlRfVU5LTk9XTik7XHJcbiAgICB9XHJcbiAgICBmb3IgKGNvbnN0IFtsYWJlbCwgZGNdIG9mIHRoaXMuX2RhdGFDaGFubmVscykge1xyXG4gICAgICBkYy5jbG9zZSgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fZGF0YUNoYW5uZWxzLmNsZWFyKCk7XHJcbiAgICBpZiAodGhpcy5fcGMgJiYgdGhpcy5fcGMuaWNlQ29ubmVjdGlvblN0YXRlICE9PSAnY2xvc2VkJykge1xyXG4gICAgICB0aGlzLl9wYy5jbG9zZSgpO1xyXG4gICAgfVxyXG4gICAgZm9yIChjb25zdCBbaWQsIHByb21pc2VdIG9mIHRoaXMuX3B1Ymxpc2hQcm9taXNlcykge1xyXG4gICAgICBwcm9taXNlLnJlamVjdChwcm9taXNlRXJyb3IpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fcHVibGlzaFByb21pc2VzLmNsZWFyKCk7XHJcbiAgICBmb3IgKGNvbnN0IFtpZCwgcHJvbWlzZV0gb2YgdGhpcy5fdW5wdWJsaXNoUHJvbWlzZXMpIHtcclxuICAgICAgcHJvbWlzZS5yZWplY3QocHJvbWlzZUVycm9yKTtcclxuICAgIH1cclxuICAgIHRoaXMuX3VucHVibGlzaFByb21pc2VzLmNsZWFyKCk7XHJcbiAgICBmb3IgKGNvbnN0IFtpZCwgcHJvbWlzZV0gb2YgdGhpcy5fc2VuZERhdGFQcm9taXNlcykge1xyXG4gICAgICBwcm9taXNlLnJlamVjdChwcm9taXNlRXJyb3IpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fc2VuZERhdGFQcm9taXNlcy5jbGVhcigpO1xyXG4gICAgLy8gRmlyZSBlbmRlZCBldmVudCBpZiBwdWJsaWNhdGlvbiBvciByZW1vdGUgc3RyZWFtIGV4aXN0cy5cclxuICAgIHRoaXMuX3B1Ymxpc2hlZFN0cmVhbXMuZm9yRWFjaCgocHVibGljYXRpb24pID0+IHtcclxuICAgICAgcHVibGljYXRpb24uZGlzcGF0Y2hFdmVudChuZXcgT3d0RXZlbnQoJ2VuZGVkJykpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLl9wdWJsaXNoZWRTdHJlYW1zLmNsZWFyKCk7XHJcbiAgICB0aGlzLl9yZW1vdGVTdHJlYW1zLmZvckVhY2goKHN0cmVhbSkgPT4ge1xyXG4gICAgICBzdHJlYW0uZGlzcGF0Y2hFdmVudChuZXcgT3d0RXZlbnQoJ2VuZGVkJykpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLl9yZW1vdGVTdHJlYW1zID0gW107XHJcbiAgICBpZiAoIXRoaXMuX2Rpc3Bvc2VkKSB7XHJcbiAgICAgIGlmIChub3RpZnlSZW1vdGUpIHtcclxuICAgICAgICBsZXQgc2VuZEVycm9yO1xyXG4gICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgc2VuZEVycm9yID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShlcnJvcikpO1xyXG4gICAgICAgICAgLy8gQXZvaWQgdG8gbGVhayBkZXRhaWxlZCBlcnJvciB0byByZW1vdGUgc2lkZS5cclxuICAgICAgICAgIHNlbmRFcnJvci5tZXNzYWdlID0gJ0Vycm9yIGhhcHBlbmVkIGF0IHJlbW90ZSBzaWRlLic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3NlbmRTaWduYWxpbmdNZXNzYWdlKFNpZ25hbGluZ1R5cGUuQ0xPU0VELCBzZW5kRXJyb3IpLmNhdGNoKFxyXG4gICAgICAgICAgICAoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgTG9nZ2VyLmRlYnVnKCdGYWlsZWQgdG8gc2VuZCBjbG9zZS4nICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdlbmRlZCcpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIF9zZXRTdHJlYW1Ub1JlbW90ZVN0cmVhbUluZm8obWVkaWFTdHJlYW0pIHtcclxuICAgIGNvbnN0IGluZm8gPSB0aGlzLl9yZW1vdGVTdHJlYW1JbmZvLmdldChtZWRpYVN0cmVhbS5pZCk7XHJcbiAgICBjb25zdCBhdHRyaWJ1dGVzID0gaW5mby5hdHRyaWJ1dGVzO1xyXG4gICAgY29uc3Qgc291cmNlSW5mbyA9IG5ldyBTdHJlYW1Nb2R1bGUuU3RyZWFtU291cmNlSW5mbyh0aGlzLl9yZW1vdGVTdHJlYW1JbmZvXHJcbiAgICAgICAgLmdldChtZWRpYVN0cmVhbS5pZCkuc291cmNlLmF1ZGlvLCB0aGlzLl9yZW1vdGVTdHJlYW1JbmZvLmdldChcclxuICAgICAgICBtZWRpYVN0cmVhbS5pZClcclxuICAgICAgICAuc291cmNlLnZpZGVvKTtcclxuICAgIGluZm8uc3RyZWFtID0gbmV3IFN0cmVhbU1vZHVsZS5SZW1vdGVTdHJlYW0oXHJcbiAgICAgICAgdW5kZWZpbmVkLCB0aGlzLl9yZW1vdGVJZCwgbWVkaWFTdHJlYW0sXHJcbiAgICAgICAgc291cmNlSW5mbywgYXR0cmlidXRlcyk7XHJcbiAgICBpbmZvLm1lZGlhU3RyZWFtID0gbWVkaWFTdHJlYW07XHJcbiAgICBjb25zdCBzdHJlYW0gPSBpbmZvLnN0cmVhbTtcclxuICAgIGlmIChzdHJlYW0pIHtcclxuICAgICAgdGhpcy5fcmVtb3RlU3RyZWFtcy5wdXNoKHN0cmVhbSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBMb2dnZXIud2FybmluZygnRmFpbGVkIHRvIGNyZWF0ZSBSZW1vdGVTdHJlYW0uJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfY2hlY2tJY2VDb25uZWN0aW9uU3RhdGVBbmRGaXJlRXZlbnQoKSB7XHJcbiAgICBpZiAodGhpcy5fcGMuaWNlQ29ubmVjdGlvblN0YXRlID09PSAnY29ubmVjdGVkJyB8fFxyXG4gICAgICAgIHRoaXMuX3BjLmljZUNvbm5lY3Rpb25TdGF0ZSA9PT0gJ2NvbXBsZXRlZCcpIHtcclxuICAgICAgZm9yIChjb25zdCBbaWQsIGluZm9dIG9mIHRoaXMuX3JlbW90ZVN0cmVhbUluZm8pIHtcclxuICAgICAgICBpZiAoaW5mby5tZWRpYVN0cmVhbSkge1xyXG4gICAgICAgICAgY29uc3Qgc3RyZWFtRXZlbnQgPSBuZXcgU3RyZWFtTW9kdWxlLlN0cmVhbUV2ZW50KCdzdHJlYW1hZGRlZCcsIHtcclxuICAgICAgICAgICAgc3RyZWFtOiBpbmZvLnN0cmVhbSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgaWYgKHRoaXMuX2lzVW5pZmllZFBsYW4oKSkge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRyYWNrIG9mIGluZm8ubWVkaWFTdHJlYW0uZ2V0VHJhY2tzKCkpIHtcclxuICAgICAgICAgICAgICB0cmFjay5hZGRFdmVudExpc3RlbmVyKCdlbmRlZCcsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWVkaWFTdHJlYW1zID0gdGhpcy5fZ2V0U3RyZWFtQnlUcmFjayhldmVudC50YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBtZWRpYVN0cmVhbSBvZiBtZWRpYVN0cmVhbXMpIHtcclxuICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2FyZUFsbFRyYWNrc0VuZGVkKG1lZGlhU3RyZWFtKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29uUmVtb3RlU3RyZWFtUmVtb3ZlZChtZWRpYVN0cmVhbSk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5fc2VuZFNpZ25hbGluZ01lc3NhZ2UoU2lnbmFsaW5nVHlwZS5UUkFDS1NfQURERUQsIGluZm8udHJhY2tJZHMpO1xyXG4gICAgICAgICAgdGhpcy5fcmVtb3RlU3RyZWFtSW5mby5nZXQoaW5mby5tZWRpYVN0cmVhbS5pZCkubWVkaWFTdHJlYW0gPSBudWxsO1xyXG4gICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KHN0cmVhbUV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFAyUFBlZXJDb25uZWN0aW9uQ2hhbm5lbDtcclxuIl19
