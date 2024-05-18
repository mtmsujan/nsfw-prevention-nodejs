"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NSFWJS = exports.load = void 0;
var tf = __importStar(require("@tensorflow/tfjs"));
var nsfw_classes_1 = require("./nsfw_classes");
var availableModels = {
    MobileNetV2: { path: "mobilenet_v2", numOfWeightBundles: 1 },
    MobileNetV2Mid: {
        path: "mobilenet_v2_mid",
        numOfWeightBundles: 2,
        options: { type: "graph" },
    },
    InceptionV3: {
        path: "inception_v3",
        numOfWeightBundles: 6,
        options: { size: 299 },
    },
};
var DEFAULT_MODEL_NAME = "MobileNetV2";
var IMAGE_SIZE = 224;
function isModelName(name) {
    return !!name && name in availableModels;
}
function loadWeights(path, numOfWeightBundles) {
    return __awaiter(this, void 0, void 0, function () {
        var promises, data;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    promises = __spreadArray([], Array(numOfWeightBundles), true).map(function (_, index) { return __awaiter(_this, void 0, void 0, function () {
                        var num, bundle, identifier, weight, _a, _b;
                        var _c;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    num = index + 1;
                                    bundle = "group1-shard".concat(num, "of").concat(numOfWeightBundles);
                                    identifier = bundle.replace(/-/g, "_");
                                    _d.label = 1;
                                case 1:
                                    _d.trys.push([1, 4, , 5]);
                                    _a = global[identifier];
                                    if (_a) return [3, 3];
                                    return [4, Promise.resolve("".concat("../models/".concat(path, "/").concat(bundle, ".min.js"))).then(function (s) { return __importStar(require(s)); })];
                                case 2:
                                    _a = (_d.sent()).default;
                                    _d.label = 3;
                                case 3:
                                    weight = _a;
                                    return [2, (_c = {}, _c[bundle] = weight, _c)];
                                case 4:
                                    _b = _d.sent();
                                    throw new Error("Could not load the weight data. Make sure you are importing the ".concat(bundle, ".min.js bundle."));
                                case 5: return [2];
                            }
                        });
                    }); });
                    return [4, Promise.all(promises)];
                case 1:
                    data = _a.sent();
                    return [2, Object.assign.apply(Object, __spreadArray([{}], data, false))];
            }
        });
    });
}
function loadModel(modelName) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, path, numOfWeightBundles, modelJson, _b, _c, weightData, handler;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!isModelName(modelName))
                        return [2, modelName];
                    _a = availableModels[modelName], path = _a.path, numOfWeightBundles = _a.numOfWeightBundles;
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 4, , 5]);
                    _b = global.model;
                    if (_b) return [3, 3];
                    return [4, Promise.resolve("".concat("../models/".concat(path, "/model.min.js"))).then(function (s) { return __importStar(require(s)); })];
                case 2:
                    _b = (_d.sent()).default;
                    _d.label = 3;
                case 3:
                    modelJson = _b;
                    return [3, 5];
                case 4:
                    _c = _d.sent();
                    throw new Error("Could not load the model. Make sure you are importing the model.min.js bundle.");
                case 5: return [4, loadWeights(path, numOfWeightBundles)];
                case 6:
                    weightData = _d.sent();
                    handler = new JSONHandler(modelJson, weightData);
                    return [2, handler];
            }
        });
    });
}
function load(modelOrUrl_1) {
    return __awaiter(this, arguments, void 0, function (modelOrUrl, options) {
        var modelUrlOrHandler, nsfwnet;
        var _a;
        if (options === void 0) { options = { size: IMAGE_SIZE }; }
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (tf == null) {
                        throw new Error("Cannot find TensorFlow.js. If you are using a <script> tag, please " +
                            "also include @tensorflow/tfjs on the page before using this model.");
                    }
                    if (modelOrUrl === undefined) {
                        modelOrUrl = DEFAULT_MODEL_NAME;
                        console.info("%cBy not specifying 'modelOrUrl' parameter, you're using the default model: '".concat(modelOrUrl, "'. See NSFWJS docs for instructions on hosting your own model (https://github.com/infinitered/nsfwjs?tab=readme-ov-file#host-your-own-model)."), "color: lightblue");
                    }
                    else if (isModelName(modelOrUrl)) {
                        console.info("%cYou're using the model: '".concat(modelOrUrl, "'. See NSFWJS docs for instructions on hosting your own model (https://github.com/infinitered/nsfwjs?tab=readme-ov-file#host-your-own-model)."), "color: lightblue");
                        options = (_a = availableModels[modelOrUrl].options) !== null && _a !== void 0 ? _a : options;
                    }
                    options.size = (options === null || options === void 0 ? void 0 : options.size) || IMAGE_SIZE;
                    return [4, loadModel(modelOrUrl)];
                case 1:
                    modelUrlOrHandler = _b.sent();
                    nsfwnet = new NSFWJS(modelUrlOrHandler, options);
                    return [4, nsfwnet.load()];
                case 2:
                    _b.sent();
                    return [2, nsfwnet];
            }
        });
    });
}
exports.load = load;
var JSONHandler = (function () {
    function JSONHandler(modelJson, weightDataBase64) {
        this.modelJson = modelJson;
        this.weightDataBase64 = weightDataBase64;
    }
    JSONHandler.prototype.arrayBufferFromBase64 = function (base64) {
        var binaryString = Buffer.from(base64, "base64").toString("binary");
        var len = binaryString.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    };
    JSONHandler.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modelArtifacts, weightSpecs, weightData, _i, _a, group, _b, _c, path, base64, buffer, weightDataConcat, offset, i;
            return __generator(this, function (_d) {
                modelArtifacts = {
                    modelTopology: this.modelJson.modelTopology,
                    format: this.modelJson.format,
                    generatedBy: this.modelJson.generatedBy,
                    convertedBy: this.modelJson.convertedBy,
                };
                if (this.modelJson.weightsManifest != null) {
                    weightSpecs = [];
                    weightData = [];
                    for (_i = 0, _a = this.modelJson.weightsManifest; _i < _a.length; _i++) {
                        group = _a[_i];
                        for (_b = 0, _c = group.paths; _b < _c.length; _b++) {
                            path = _c[_b];
                            base64 = this.weightDataBase64[path];
                            if (!base64) {
                                throw new Error("Could not find the weight data. Make sure you are importing the correct weight bundle for the model: ".concat(path, ".min.js."));
                            }
                            buffer = this.arrayBufferFromBase64(base64);
                            weightData.push(new Uint8Array(buffer));
                        }
                        weightSpecs.push.apply(weightSpecs, group.weights);
                    }
                    modelArtifacts.weightSpecs = weightSpecs;
                    weightDataConcat = new Uint8Array(weightData.reduce(function (a, b) { return a + b.length; }, 0));
                    offset = 0;
                    for (i = 0; i < weightData.length; i++) {
                        weightDataConcat.set(weightData[i], offset);
                        offset += weightData[i].byteLength;
                    }
                    modelArtifacts.weightData = weightDataConcat.buffer;
                }
                if (this.modelJson.trainingConfig != null) {
                    modelArtifacts.trainingConfig = this.modelJson.trainingConfig;
                }
                if (this.modelJson.userDefinedMetadata != null) {
                    modelArtifacts.userDefinedMetadata = this.modelJson.userDefinedMetadata;
                }
                return [2, modelArtifacts];
            });
        });
    };
    return JSONHandler;
}());
var NSFWJS = (function () {
    function NSFWJS(modelUrlOrIOHandler, options) {
        this.intermediateModels = {};
        this.options = options;
        this.normalizationOffset = tf.scalar(255);
        this.urlOrIOHandler = modelUrlOrIOHandler;
        if (typeof modelUrlOrIOHandler === "string" &&
            !modelUrlOrIOHandler.startsWith("indexeddb://") &&
            !modelUrlOrIOHandler.startsWith("localstorage://") &&
            !modelUrlOrIOHandler.endsWith("model.json")) {
            this.urlOrIOHandler = "".concat(modelUrlOrIOHandler, "model.json");
        }
        else {
            this.urlOrIOHandler = modelUrlOrIOHandler;
        }
    }
    NSFWJS.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, size, type, _b, _c, result;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = this.options, size = _a.size, type = _a.type;
                        if (!(type === "graph")) return [3, 2];
                        _b = this;
                        return [4, tf.loadGraphModel(this.urlOrIOHandler)];
                    case 1:
                        _b.model = _d.sent();
                        return [3, 4];
                    case 2:
                        _c = this;
                        return [4, tf.loadLayersModel(this.urlOrIOHandler)];
                    case 3:
                        _c.model = _d.sent();
                        this.endpoints = this.model.layers.map(function (l) { return l.name; });
                        _d.label = 4;
                    case 4:
                        result = tf.tidy(function () {
                            return _this.model.predict(tf.zeros([1, size, size, 3]));
                        });
                        return [4, result.data()];
                    case 5:
                        _d.sent();
                        result.dispose();
                        return [2];
                }
            });
        });
    };
    NSFWJS.prototype.infer = function (img, endpoint) {
        var _this = this;
        if (endpoint != null && this.endpoints.indexOf(endpoint) === -1) {
            throw new Error("Unknown endpoint ".concat(endpoint, ". Available endpoints: ").concat(this.endpoints, "."));
        }
        return tf.tidy(function () {
            if (!(img instanceof tf.Tensor)) {
                img = tf.browser.fromPixels(img);
            }
            var normalized = img
                .toFloat()
                .div(_this.normalizationOffset);
            var resized = normalized;
            var size = _this.options.size;
            if (img.shape[0] !== size || img.shape[1] !== size) {
                var alignCorners = true;
                resized = tf.image.resizeBilinear(normalized, [size, size], alignCorners);
            }
            var batched = resized.reshape([1, size, size, 3]);
            var model;
            if (endpoint == null) {
                model = _this.model;
            }
            else {
                if (_this.model.hasOwnProperty("layers") &&
                    _this.intermediateModels[endpoint] == null) {
                    var layer = _this.model.layers.find(function (l) { return l.name === endpoint; });
                    _this.intermediateModels[endpoint] = tf.model({
                        inputs: _this.model.inputs,
                        outputs: layer.output,
                    });
                }
                model = _this.intermediateModels[endpoint];
            }
            return model.predict(batched);
        });
    };
    NSFWJS.prototype.classify = function (img_1) {
        return __awaiter(this, arguments, void 0, function (img, topk) {
            var logits, classes;
            if (topk === void 0) { topk = 5; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logits = this.infer(img);
                        return [4, getTopKClasses(logits, topk)];
                    case 1:
                        classes = _a.sent();
                        logits.dispose();
                        return [2, classes];
                }
            });
        });
    };
    return NSFWJS;
}());
exports.NSFWJS = NSFWJS;
function getTopKClasses(logits, topK) {
    return __awaiter(this, void 0, void 0, function () {
        var values, valuesAndIndices, i, topkValues, topkIndices, i, topClassesAndProbs, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, logits.data()];
                case 1:
                    values = _a.sent();
                    valuesAndIndices = [];
                    for (i = 0; i < values.length; i++) {
                        valuesAndIndices.push({ value: values[i], index: i });
                    }
                    valuesAndIndices.sort(function (a, b) {
                        return b.value - a.value;
                    });
                    topkValues = new Float32Array(topK);
                    topkIndices = new Int32Array(topK);
                    for (i = 0; i < topK; i++) {
                        topkValues[i] = valuesAndIndices[i].value;
                        topkIndices[i] = valuesAndIndices[i].index;
                    }
                    topClassesAndProbs = [];
                    for (i = 0; i < topkIndices.length; i++) {
                        topClassesAndProbs.push({
                            className: nsfw_classes_1.NSFW_CLASSES[topkIndices[i]],
                            probability: topkValues[i],
                        });
                    }
                    return [2, topClassesAndProbs];
            }
        });
    });
}
//# sourceMappingURL=index.js.map