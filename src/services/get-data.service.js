"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDataService = void 0;
var core_1 = require("@angular/core");
var product_1 = require("../models/product");
var GetDataService = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var GetDataService = _classThis = /** @class */ (function () {
        function GetDataService_1() {
            this.products = [];
        }
        GetDataService_1.prototype.ngOnInit = function () {
            this.addSampleData();
        };
        GetDataService_1.prototype.addSampleData = function () {
            this.products.push(new product_1.Product('p1', 'SuperStay Matte Ink Lipstick', 'Maybelline', 79.99, 'A long-lasting matte liquid lipstick that delivers intense color and up to 16-hour wear.', '../assets/p1.jpg', ['Dimethicone', 'Isododecane', 'Silica', 'Disteardimonium Hectorite'], 'Apply from the center of your lips outward for bold matte color.'));
            this.products.push(new product_1.Product('p2', 'Fit Me Matte + Poreless Foundation', 'Maybelline', 89.99, 'Lightweight foundation that mattifies and refines pores for a natural, seamless finish.', '../assets/p2.jpg', ['Water', 'Cyclopentasiloxane', 'Glycerin', 'Dimethicone', 'Talc'], 'Apply evenly using fingertips, sponge, or foundation brush.'));
            this.products.push(new product_1.Product('p3', 'Lash Princess False Lash Effect Mascara', 'Essence', 54.99, 'A mascara that gives dramatic volume and sculpted length without clumps.', '../assets/p3.jpg', ['Aqua', 'Cera Alba', 'Paraffin', 'Acacia Senegal Gum', 'Panthenol'], 'Sweep the brush from root to tip. Repeat for more volume.'));
            this.products.push(new product_1.Product('p4', 'Reloaded Eyeshadow Palette - Velvet Rose', 'Makeup Revolution', 99.99, 'An affordable eyeshadow palette with warm mattes and shimmers.', '../assets/p4.jpg', ['Talc', 'Mica', 'Magnesium Stearate', 'Dimethicone'], 'Use a brush or fingertip to apply and blend on eyelids.'));
            this.products.push(new product_1.Product('p5', 'Dewy Finish Setting Spray', 'NYX Professional Makeup', 69.99, 'Lightweight mist that sets makeup with a fresh, dewy glow.', '../assets/p5.jpg', ['Water', 'Glycerin', 'Niacinamide', 'Phenoxyethanol'], 'Shake well and spray over your face from 20cm after makeup.'));
        };
        GetDataService_1.prototype.getProducts = function () {
            return this.products;
        };
        return GetDataService_1;
    }());
    __setFunctionName(_classThis, "GetDataService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        GetDataService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return GetDataService = _classThis;
}();
exports.GetDataService = GetDataService;
