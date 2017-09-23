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
var config;
(function (config) {
    var AppConfig = (function () {
        function AppConfig() {
        }
        return AppConfig;
    }());
    config.AppConfig = AppConfig;
    var GLConfig = (function () {
        function GLConfig() {
        }
        GLConfig.UNIFORM_TYPE_MATRIX4 = 'matrix4fv';
        GLConfig.UNIFORM_TYPE_MATRIX3 = 'matrix3fv';
        GLConfig.UNIFORM_TYPE_MATRIX2 = 'matrix2fv';
        GLConfig.UNIFORM_TYPE_VECTOR4 = '4fv';
        GLConfig.UNIFORM_TYPE_VECTOR3 = '3fv';
        GLConfig.UNIFORM_TYPE_VECTOR2 = '2fv';
        GLConfig.UNIFORM_TYPE_VECTOR1 = '1fv';
        GLConfig.UNIFORM_TYPE_FLOAT = '1f';
        GLConfig.UNIFORM_TYPE_INT_VECTOR = '1iv';
        GLConfig.UNIFORM_TYPE_INT = '1i';
        return GLConfig;
    }());
    config.GLConfig = GLConfig;
})(config || (config = {}));
var events;
(function (events) {
    var EventDispatcher = (function () {
        function EventDispatcher() {
            this.listeners = {};
        }
        /**
         * @param event
         */
        EventDispatcher.prototype.dispatchEvent = function (event) {
            var e;
            var type;
            if (event instanceof Event) {
                type = event.type;
                e = event;
            }
            else {
                type = event;
                e = new Event(type);
            }
            if (this.listeners[type] != null) {
                e.currentTarget = this;
                for (var i = 0; i < this.listeners[type].length; i++) {
                    var listener = this.listeners[type][i];
                    try {
                        listener.handler(e);
                    }
                    catch (error) {
                        if (window.console) {
                            console.error(error.stack);
                        }
                    }
                }
            }
        };
        /**
         *
         * @param type
         * @param callback
         * @param priolity
         */
        EventDispatcher.prototype.addEventListener = function (type, callback, priolity) {
            if (priolity === void 0) { priolity = 0; }
            if (this.listeners[type] == null) {
                this.listeners[type] = [];
            }
            this.listeners[type].push(new EventListener(type, callback, priolity));
            this.listeners[type].sort(function (listener1, listener2) {
                return listener2.priolity - listener1.priolity;
            });
        };
        /**
         *
         * @param type
         * @param callback
         */
        EventDispatcher.prototype.removeEventListener = function (type, callback) {
            if (this.hasEventListener(type, callback)) {
                for (var i = 0; i < this.listeners[type].length; i++) {
                    var listener = this.listeners[type][i];
                    if (listener.equalCurrentListener(type, callback)) {
                        listener.handler = null;
                        this.listeners[type].splice(i, 1);
                        return;
                    }
                }
            }
        };
        /**
         *
         */
        EventDispatcher.prototype.clearEventListener = function () {
            this.listeners = {};
        };
        /**
         *
         * @param type
         * @returns {boolean}
         */
        EventDispatcher.prototype.containEventListener = function (type) {
            if (this.listeners[type] == null)
                return false;
            return this.listeners[type].length > 0;
        };
        /**
         *
         * @param type
         * @param callback
         * @returns {boolean}
         */
        EventDispatcher.prototype.hasEventListener = function (type, callback) {
            if (this.listeners[type] == null)
                return false;
            for (var i = 0; i < this.listeners[type].length; i++) {
                var listener = this.listeners[type][i];
                if (listener.equalCurrentListener(type, callback)) {
                    return true;
                }
            }
            return false;
        };
        return EventDispatcher;
    }());
    events.EventDispatcher = EventDispatcher;
    /**
     *
     */
    var EventListener = (function () {
        /**
         *
         * @param type
         * @param handler
         * @param priolity
         */
        function EventListener(type, handler, priolity) {
            if (type === void 0) { type = null; }
            if (handler === void 0) { handler = null; }
            if (priolity === void 0) { priolity = 0; }
            this.type = type;
            this.handler = handler;
            this.priolity = priolity;
        }
        /**
         *
         * @param type
         * @param handler
         * @returns {boolean}
         */
        EventListener.prototype.equalCurrentListener = function (type, handler) {
            if (this.type == type && this.handler == handler) {
                return true;
            }
            return false;
        };
        return EventListener;
    }());
    /**
     *
     */
    var Event = (function () {
        function Event(type, value) {
            if (type === void 0) { type = null; }
            if (value === void 0) { value = null; }
            this.type = type;
            this.value = value;
        }
        Event.COMPLETE = "complete";
        Event.CHANGE_PROPERTY = "changeProperty";
        return Event;
    }());
    events.Event = Event;
})(events || (events = {}));
///<reference path="./events/EventDispatcher.ts" />
var model;
(function (model) {
    var Model = (function (_super) {
        __extends(Model, _super);
        function Model() {
            var _this = _super.call(this) || this;
            _this._scene = Model.SCENE_LOAD;
            return _this;
        }
        Object.defineProperty(Model.prototype, "screen", {
            get: function () {
                return this._screen;
            },
            set: function (value) {
                this._screen = value;
                this.dispatchEvent(Model.EVENT_RESIZE);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Model.prototype, "scene", {
            get: function () {
                return this._scene;
            },
            set: function (value) {
                this._scene = value;
                this.dispatchEvent(Model.EVENT_SCENE_CHANGE);
            },
            enumerable: true,
            configurable: true
        });
        Model.EVENT_RESIZE = 'resizeEvent';
        Model.EVENT_SCENE_CHANGE = 'sceneChangeEvent';
        Model.SCENE_LOAD = 'sceneLoad';
        Model.SCENE_INTRO = 'sceneIntro';
        Model.SCENE_FIRST = 'First';
        return Model;
    }(events.EventDispatcher));
    model.Model = Model;
})(model || (model = {}));
var utils;
(function (utils) {
    var Methods = (function () {
        function Methods() {
        }
        Methods.showError = function (err) {
            if (err === void 0) { err = null; }
            console.log(err || 'error');
        };
        /**
         * 範囲を指定してランダムな数を返す
         * @param {number} min
         * @param {number} max
         * @returns {number}
         */
        Methods.getRandomNumber = function (min, max) {
            return Math.random() * (max - min) + min;
        };
        /**
         * hsvをRGBに変換する
         * @param {number} hue 0 - 360
         * @param {number} saturation 0 - 100
         * @param {number} value 0 - 100
         * @param {number} alpha 0 - 100
         * @returns {Array}
         */
        Methods.hsv2RGB = function (hue, saturation, value, alpha) {
            if (saturation > 100 || value > 100 || alpha > 100) {
                return;
            }
            var color = [];
            saturation = saturation / 100;
            value = value / 100;
            if (saturation === 0) {
                color.push(value, value, value, alpha);
            }
            else {
                var th = hue % 360;
                var i = Math.floor(th / 60);
                var f = th / 60 - i;
                var m = value * (1 - saturation);
                var n = value * (1 - saturation * f);
                var k = value * (1 - saturation * (1 - f));
                var r = [value, n, m, m, k, value];
                var g = [k, value, value, n, m, m];
                var b = [m, m, k, value, value, n];
                color.push(r[i], g[i], b[i], alpha);
            }
            return color;
        };
        return Methods;
    }());
    utils.Methods = Methods;
    var GLUtils = (function () {
        function GLUtils() {
        }
        /**
         * シェーダをつくります。
         * @param {string} id GLSLのscript要素のID名
         * @param {WebGLRenderingContext} gl WebGLレンダリングコンテキスト
         * @returns {WebGLShader}
         */
        GLUtils.createShader = function (id, gl) {
            var shader;
            var script = document.getElementById(id);
            if (!script) {
                utils.Methods.showError();
                return false;
            }
            // scriptタグのtype属性をチェック
            switch (script.type) {
                // 頂点シェーダの場合
                case 'x-shader/x-vertex':
                    shader = gl.createShader(gl.VERTEX_SHADER);
                    break;
                // フラグメントシェーダの場合
                case 'x-shader/x-fragment':
                    shader = gl.createShader(gl.FRAGMENT_SHADER);
                    break;
                default:
                    return false;
            }
            // 生成されたシェーダにソースを割り当てる
            gl.shaderSource(shader, script.text);
            // シェーダをコンパイルする
            gl.compileShader(shader);
            // シェーダが正しくコンパイルされたかチェック
            if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                // 成功していたらシェーダを返して終了
                return shader;
            }
            else {
                // 失敗していたらエラーログをアラートする
                utils.Methods.showError(gl.getShaderInfoLog(shader));
            }
        };
        /**
         * プログラムを作って返します。
         * @param {WebGLRenderingContext} gl
         * @param {WebGLShader} vs
         * @param {WebGLShader} fs
         * @returns {WebGLProgram}
         */
        GLUtils.createProgram = function (gl, vs, fs) {
            var program = gl.createProgram();
            gl.attachShader(program, vs);
            gl.attachShader(program, fs);
            gl.linkProgram(program);
            if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
                gl.useProgram(program);
                return program;
            }
            else {
                utils.Methods.showError(gl.getProgramInfoLog(program));
            }
        };
        GLUtils.createVBO = function (gl, data) {
            var vbo = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
            return vbo;
        };
        GLUtils.createIBO = function (gl, data) {
            var ibo = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(data), gl.STATIC_DRAW);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
            return ibo;
        };
        GLUtils.setAttr = function (gl, vbo, attl, atts) {
            for (var i = 0; i < vbo.length; i++) {
                gl.bindBuffer(gl.ARRAY_BUFFER, vbo[i]);
                gl.enableVertexAttribArray(attl[i]);
                gl.vertexAttribPointer(attl[i], atts[i], gl.FLOAT, false, 0, 0);
            }
        };
        /**
         * フレームバッファを生成
         * @param {WebGLRenderingContext} gl
         * @param {number} _width
         * @param {number} _height
         * @returns {{frameBuffer: WebGLFramebuffer; depthBuffer: WebGLRenderbuffer; texture: WebGLTexture}}
         */
        GLUtils.createFrameBuffer = function (gl, _width, _height) {
            // フレームバッファを生成してバインド
            var frameBuffer = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
            // 深度用レンダーバッファを生成してバインド
            var depthRenderBuffer = gl.createRenderbuffer();
            gl.bindRenderbuffer(gl.RENDERBUFFER, depthRenderBuffer);
            // レンダーバッファを深度用に設定
            gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, _width, _height);
            // フレームバッファにレンダーバッファをひもづける
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthRenderBuffer);
            // 空のテクスチャの生成
            var fTexture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, fTexture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, _width, _height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            //フレームバッファにテクスチャを関連づける
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, fTexture, 0);
            //バインドしたものを解放
            gl.bindTexture(gl.TEXTURE_2D, null);
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            return { frameBuffer: frameBuffer, depthBuffer: depthRenderBuffer, texture: fTexture };
        };
        GLUtils.setUniform = function (gl, _uniTypes, _uniLocation, _values) {
            for (var i = 0; i < _uniTypes.length; i++) {
                switch (_uniTypes[i]) {
                    case config.GLConfig.UNIFORM_TYPE_MATRIX4:
                        gl.uniformMatrix4fv(_uniLocation[i], false, _values[i]);
                        break;
                    case config.GLConfig.UNIFORM_TYPE_VECTOR4:
                        gl.uniform4fv(_uniLocation[i], _values[i]);
                        break;
                    case config.GLConfig.UNIFORM_TYPE_VECTOR3:
                        gl.uniform3fv(_uniLocation[i], _values[i]);
                        break;
                    case config.GLConfig.UNIFORM_TYPE_VECTOR2:
                        gl.uniform2fv(_uniLocation[i], _values[i]);
                        break;
                    case config.GLConfig.UNIFORM_TYPE_VECTOR1:
                        gl.uniform1fv(_uniLocation[i], _values[i]);
                        break;
                    case config.GLConfig.UNIFORM_TYPE_FLOAT:
                        gl.uniform1f(_uniLocation[i], _values[i]);
                        break;
                    case config.GLConfig.UNIFORM_TYPE_INT_VECTOR:
                        gl.uniform1iv(_uniLocation[i], _values[i]);
                        break;
                    case config.GLConfig.UNIFORM_TYPE_INT:
                        gl.uniform1i(_uniLocation[i], _values[i]);
                        break;
                    case config.GLConfig.UNIFORM_TYPE_MATRIX3:
                        gl.uniformMatrix3fv(_uniLocation[i], false, _values[i]);
                        break;
                    case config.GLConfig.UNIFORM_TYPE_MATRIX2:
                        gl.uniformMatrix2fv(_uniLocation[i], false, _values[i]);
                        break;
                    default:
                        utils.Methods.showError("unknown uniform types");
                        break;
                }
            }
        };
        return GLUtils;
    }());
    utils.GLUtils = GLUtils;
    var MatrixUtils = (function () {
        function MatrixUtils() {
        }
        /**
         * 4*4正方行列を生成
         * @returns {Float32Array}
         */
        MatrixUtils.create = function () {
            return new Float32Array(16);
        };
        /**
         * 4x4正方行列の正規化
         * @param {Float32Array} _mat
         * @returns {Float32Array}
         */
        MatrixUtils.initialize = function (_mat) {
            _mat[0] = 1;
            _mat[1] = 0;
            _mat[2] = 0;
            _mat[3] = 0;
            _mat[4] = 0;
            _mat[5] = 1;
            _mat[6] = 0;
            _mat[7] = 0;
            _mat[8] = 0;
            _mat[9] = 0;
            _mat[10] = 1;
            _mat[11] = 0;
            _mat[12] = 0;
            _mat[13] = 0;
            _mat[14] = 0;
            _mat[15] = 1;
            return _mat;
        };
        /**
         * 4 * 4正方行列の掛け算
         * @param {Float32Array} _mat1
         * @param {Float32Array} _mat2
         * @param {Float32Array} _dist
         */
        MatrixUtils.multiply = function (_mat1, _mat2, _dist) {
            if (_dist === void 0) { _dist = MatrixUtils.initialize(new Float32Array(16)); }
            var a = _mat1[0], b = _mat1[1], c = _mat1[2], d = _mat1[3], e = _mat1[4], f = _mat1[5], g = _mat1[6], h = _mat1[7], i = _mat1[8], j = _mat1[9], k = _mat1[10], l = _mat1[11], m = _mat1[12], n = _mat1[13], o = _mat1[14], p = _mat1[15], A = _mat2[0], B = _mat2[1], C = _mat2[2], D = _mat2[3], E = _mat2[4], F = _mat2[5], G = _mat2[6], H = _mat2[7], I = _mat2[8], J = _mat2[9], K = _mat2[10], L = _mat2[11], M = _mat2[12], N = _mat2[13], O = _mat2[14], P = _mat2[15];
            _dist[0] = A * a + B * e + C * i + D * m;
            _dist[1] = A * b + B * f + C * j + D * n;
            _dist[2] = A * c + B * g + C * k + D * o;
            _dist[3] = A * d + B * h + C * l + D * p;
            _dist[4] = E * a + F * e + G * i + H * m;
            _dist[5] = E * b + F * f + G * j + H * n;
            _dist[6] = E * c + F * g + G * k + H * o;
            _dist[7] = E * d + F * h + G * l + H * p;
            _dist[8] = I * a + J * e + K * i + L * m;
            _dist[9] = I * b + J * f + K * j + L * n;
            _dist[10] = I * c + J * g + K * k + L * o;
            _dist[11] = I * d + J * h + K * l + L * p;
            _dist[12] = M * a + N * e + O * i + P * m;
            _dist[13] = M * b + N * f + O * j + P * n;
            _dist[14] = M * c + N * g + O * k + P * o;
            _dist[15] = M * d + N * h + O * l + P * p;
            return _dist;
        };
        /**
         * ワールド座標からカメラ座標へ、座標変換を行う行列を生成
         * @param {Vector} _targetPos カメラの注視点
         * @param {Vector} _cameraPos カメラの位置
         * @param {Vector} _cameraUp カメラの上方向
         * @param {Float32Array} _dist 変換行列
         * @returns {Float32Array}
         */
        MatrixUtils.lookAt = function (_targetPos, _cameraPos, _cameraUp, _dist) {
            // カメラの位置と見る地点が同じ場合は正方行列を返す
            if (_targetPos.x === _cameraPos.x && _targetPos.y === _cameraPos.y && _targetPos.z === _cameraPos.z) {
                return utils.MatrixUtils.initialize(_dist);
            }
            // cameraPos -> targetまでの各ベクトル
            var vecZ = _targetPos.sub(_cameraPos).normalize();
            // 上部ベクトルとz軸ベクトルの外積をとると、x軸ベクトルが求められる
            var vecX = _cameraUp.cross(vecZ).normalize();
            //z軸ベクトルとx軸ベクトルの外積をとると、y軸ベクトルが求められる
            var vecY = vecZ.cross(vecX).normalize();
            //最終的に座標変換用の行列をつくる
            _dist[0] = vecX.x;
            _dist[1] = vecY.x;
            _dist[2] = vecZ.x;
            _dist[3] = 0;
            _dist[4] = vecX.y;
            _dist[5] = vecY.y;
            _dist[6] = vecZ.y;
            _dist[7] = 0;
            _dist[8] = vecX.z;
            _dist[9] = vecY.z;
            _dist[10] = vecZ.z;
            _dist[11] = 0;
            _dist[12] = -(vecX.x * _targetPos.x + vecX.y * _targetPos.y + vecX.z * _targetPos.z);
            _dist[13] = -(vecY.x * _targetPos.x + vecY.y * _targetPos.y + vecY.z * _targetPos.z);
            _dist[14] = -(vecZ.x * _targetPos.x + vecZ.y * _targetPos.y + vecZ.z * _targetPos.z);
            _dist[15] = 1;
            return _dist;
        };
        /**
         * プロジェクション変換を行う行列を生成
         * @param {number} _fov Field Of View カメラの視野角
         * @param {number} _aspect カメラの縦横比
         * @param {number} _near カメラの位置からどのくらいから切り取る（撮影する）か
         * @param {number} _far カメラの位置からどのくらいまで切り取る（撮影する）か
         * @param {Float32Array} _dist 生成された行列
         * @returns {Float32Array}
         */
        MatrixUtils.perspective = function (_fov, _aspect, _near, _far, _dist) {
            // 近いクリップ面のy座標
            var t = _near * Math.tan(_fov * Math.PI / 360);
            var r = t * _aspect;
            var a = r * 2, b = t * 2, c = _far - _near;
            _dist[0] = _near * 2 / a;
            _dist[1] = 0;
            _dist[2] = 0;
            _dist[3] = 0;
            _dist[4] = 0;
            _dist[5] = _near * 2 / b;
            _dist[6] = 0;
            _dist[7] = 0;
            _dist[8] = 0;
            _dist[9] = 0;
            _dist[10] = -(_far + _near) / c;
            _dist[11] = -1;
            _dist[12] = 0;
            _dist[13] = 0;
            _dist[14] = -(_far * _near * 2) / c;
            _dist[15] = 0;
            return _dist;
        };
        return MatrixUtils;
    }());
    utils.MatrixUtils = MatrixUtils;
    var VectorUtils = (function () {
        function VectorUtils() {
        }
        VectorUtils.getFaceNormalArr = function (_vertexArr, _indexArr) {
            var i, len = _vertexArr.length / 3;
            var distArr = [];
            for (i = 0; i < len; i++) {
                var _index1 = _indexArr[i] * 3;
                var _index2 = _indexArr[i] * 3;
                var _index3 = _indexArr[i] * 3;
                var _vec1 = new THREE.Vector3(_vertexArr[_index1], _vertexArr[_index1 + 1], _vertexArr[_index1 + 2]);
                var _vec2 = new THREE.Vector3(_vertexArr[_index2], _vertexArr[_index2 + 1], _vertexArr[_index2 + 2]);
                var _vec3 = new THREE.Vector3(_vertexArr[_index3], _vertexArr[_index3 + 1], _vertexArr[_index3 + 2]);
                var v1 = _vec2.sub(_vec1).normalize();
                var v2 = _vec3.sub(_vec1).normalize();
                distArr[i * 3] = v1.y * v2.z - v1.z * v2.y;
                distArr[i * 3 + 1] = v1.z * v2.x - v1.x * v2.z;
                distArr[i * 3 + 2] = v1.x * v2.y - v1.y * v2.x;
            }
            return distArr;
        };
        VectorUtils.getFaceNormalVector = function (_vec1, _vec2, _vec3) {
            var dist = new THREE.Vector3();
            var v1 = _vec2.sub(_vec1).normalize();
            var v2 = _vec3.sub(_vec1).normalize();
            dist.x = v1.y * v2.z - v1.z * v2.y;
            dist.y = v1.z * v2.x - v1.x * v2.z;
            dist.z = v1.x * v2.y - v1.y * v2.x;
            return dist;
        };
        return VectorUtils;
    }());
    utils.VectorUtils = VectorUtils;
})(utils || (utils = {}));
var text;
(function (text) {
    var W = (function (_super) {
        __extends(W, _super);
        function W() {
            var _this = _super.call(this) || this;
            var vertex = [
                0.0, 0.0,
                1.0, 0.0,
                2.0, -3.0,
                3.0, 0.0,
                4.0, 0.0,
                5.0, -3.0,
                6.0, 0.0,
                7.0, 0.0,
                6.0, -4.0,
                4.5, -4.0,
                3.5, -1.5,
                2.5, -4.0,
                1.0, -4.0,
            ];
            _this.moveTo(vertex[0], vertex[1]);
            for (var i = 2; i < vertex.length; i += 2) {
                _this.lineTo(vertex[i], vertex[i + 1]);
            }
            return _this;
        }
        return W;
    }(THREE.Shape));
    text.W = W;
})(text || (text = {}));
var text;
(function (text) {
    var H = (function (_super) {
        __extends(H, _super);
        function H() {
            var _this = _super.call(this) || this;
            var vertex = [
                0.0, 0.0,
                1.0, 0.0,
                1.0, -1.5,
                2.0, -1.5,
                2.0, 0.0,
                3.0, 0.0,
                3.0, -4.0,
                2.0, -4.0,
                2.0, -2.5,
                1.0, -2.5,
                1.0, -4.0,
                0.0, -4.0,
            ];
            _this.moveTo(vertex[0], vertex[1]);
            for (var i = 0; i < vertex.length; i += 2) {
                _this.lineTo(vertex[i], vertex[i + 1]);
            }
            return _this;
        }
        return H;
    }(THREE.Shape));
    text.H = H;
})(text || (text = {}));
var text;
(function (text) {
    var O = (function (_super) {
        __extends(O, _super);
        function O(rad, row, depth) {
            var _this = _super.call(this) || this;
            var PI2 = Math.PI * 2;
            _this.moveTo(0, 0);
            _this.lineTo(depth, 0);
            _this.lineTo(depth, rad - rad * 0.5);
            _this.lineTo(0, rad - rad * 0.5);
            var points = [];
            //外側の頂点
            for (var i = 0; i < row * 2; i++) {
                var r = PI2 / row * i;
                var rx = Math.cos(r) * rad;
                var ry = Math.sin(r) * rad;
                points.push(new THREE.Vector3(0.0, rx, ry));
            }
            _this._path = new THREE.CatmullRomCurve3(points);
            _this._path['type'] = 'catmullrom';
            _this._path['closed'] = true;
            return _this;
        }
        Object.defineProperty(O.prototype, "path", {
            get: function () {
                return this._path;
            },
            enumerable: true,
            configurable: true
        });
        return O;
    }(THREE.Shape));
    text.O = O;
})(text || (text = {}));
var scene;
(function (scene) {
    var First = (function () {
        function First(_model, _renderer, _mainCamera) {
            var _this = this;
            this._model = _model;
            this._renderer = _renderer;
            this._mainCamera = _mainCamera;
            this.init = function () {
                _this._group = new THREE.Group();
                _this._stage.add(_this._group);
                var light = new THREE.DirectionalLight();
                light.position.set(0.0, 0.7, 0.7);
                _this._stage.add(light);
                var material = new THREE.MeshPhongMaterial();
                var extrudeOption = {
                    amount: 5,
                    steps: 1,
                    material: 1,
                    extrudeMaterial: 0,
                    bevelEnabled: false
                };
                var shapeW = new text.W();
                var w = new THREE.ExtrudeGeometry(shapeW, extrudeOption);
                var meshW = new THREE.Mesh(w, material);
                meshW.position.set(-7, 2, 0);
                _this._group.add(meshW);
                var shapeH = new text.H();
                var h = new THREE.ExtrudeGeometry(shapeH, extrudeOption);
                var meshH = new THREE.Mesh(h, material);
                meshH.position.set(0, 2, 0);
                _this._group.add(meshH);
                var shapeO = new text.O(2, 32, 5);
                extrudeOption['extrudePath'] = shapeO.path;
                extrudeOption['steps'] = 100;
                var o = new THREE.ExtrudeGeometry(shapeO, extrudeOption);
                var meshO = new THREE.Mesh(o, material);
                meshO.position.set(5, 0, 0);
                meshO.rotateY(Math.PI / 2);
                _this._group.add(meshO);
                _this._model.addEventListener(Model.EVENT_SCENE_CHANGE, _this.onSceneChanged);
            };
            this.onSceneChanged = function () {
                if (_this._model.scene === Model.SCENE_FIRST) {
                    _this.play();
                }
                else {
                    _this.pause();
                }
            };
            this.update = function () {
                _this._timer = requestAnimationFrame(_this.update);
                _this.render();
            };
            this.render = function () {
                _this._renderer.render(_this._stage, _this._mainCamera);
            };
            this.play = function () {
                _this.update();
            };
            this.pause = function () {
                if (_this._timer) {
                    cancelAnimationFrame(_this._timer);
                    _this._timer = null;
                }
            };
            this._stage = new THREE.Scene();
            this.init();
        }
        return First;
    }());
    scene.First = First;
})(scene || (scene = {}));
var svg;
(function (svg) {
    var SVGController = (function () {
        function SVGController(_elm, _model) {
            var _this = this;
            this._elm = _elm;
            this._model = _model;
            this.show = function () {
                _this._elm.addEventListener('transitionend', _this.transitionEnd);
                _this._elm.classList.add('show');
            };
            this.sceneChanged = function () {
                if (_this._model.scene === model.Model.SCENE_FIRST) {
                    // this._elm.classList.add('hide');
                    _this._model.removeEventListener(model.Model.EVENT_SCENE_CHANGE, _this.sceneChanged);
                }
            };
            this.transitionEnd = function (e) {
                // start intro
                _this._model.scene = model.Model.SCENE_FIRST;
            };
            this._model.addEventListener(model.Model.EVENT_SCENE_CHANGE, this.sceneChanged);
            this._elm.classList.remove('show');
            console.log(this._elm.classList);
        }
        return SVGController;
    }());
    svg.SVGController = SVGController;
})(svg || (svg = {}));
///<reference path="config/Config.ts" />
///<reference path="Model.ts" />
///<reference path="Utils.ts" />
///<reference path="./Text/W.ts" />
///<reference path="./Text/H.ts" />
///<reference path="./Text/O.ts" />
///<reference path="scenes/First.ts" />
///<reference path="./svg/SVGController.ts" />
var Model = model.Model;
(function (win, doc, undefined) {
    'use strict';
    var _model = new Model();
    function init() {
        win.addEventListener('resize', function () {
            _model.screen = {
                width: win.innerWidth,
                height: win.innerHeight
            };
        });
        _model.screen = {
            width: win.innerWidth,
            height: win.innerHeight
        };
        var mainCamera = new THREE.PerspectiveCamera(60, _model.screen.width / _model.screen.height, 1, 1000);
        mainCamera.position.set(0, 0, 37);
        var ratio = window.devicePixelRatio;
        var renderer = new THREE.WebGLRenderer({
            antialias: true,
            stencil: false
        });
        renderer.setPixelRatio(ratio);
        renderer.setSize(_model.screen.width, _model.screen.height);
        document.getElementById('mv-canvas').appendChild(renderer.domElement);
        var first = new scene.First(_model, renderer, mainCamera);
        var _who = document.querySelectorAll('.mv-svg');
        for (var i = 0; i < _who.length; i++) {
            var _svg = new svg.SVGController(_who.item(i), _model);
            _svg.show();
        }
    }
    // 読み込みが完了してたらそのままinit
    if (doc.readyState !== 'loading') {
        init();
        // 読み込み中の場合は完了をまってからinit
    }
    else {
        doc.addEventListener('DOMContentLoaded', init);
    }
})(window, document);
//# sourceMappingURL=run.js.map