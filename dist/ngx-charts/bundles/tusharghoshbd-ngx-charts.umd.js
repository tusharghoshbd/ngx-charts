(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('d3-scale'), require('d3-shape')) :
    typeof define === 'function' && define.amd ? define('@tusharghoshbd/ngx-charts', ['exports', '@angular/core', '@angular/common', 'd3-scale', 'd3-shape'], factory) :
    (global = global || self, factory((global.tusharghoshbd = global.tusharghoshbd || {}, global.tusharghoshbd['ngx-charts'] = {}), global.ng.core, global.ng.common, global.d3Scale, global.d3Shape));
}(this, (function (exports, core, common, d3Scale, d3Shape) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
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
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} s
     * @param {?=} max
     * @return {?}
     */
    function trimLabel(s, max) {
        if (max === void 0) { max = 5; }
        if (typeof s !== 'string') {
            if (typeof s === 'number') {
                return s + '';
            }
            else {
                return '';
            }
        }
        s = s.trim();
        if (s.length <= max) {
            return s;
        }
        else {
            return s.slice(0, max) + "...";
        }
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var XAxisComponent = /** @class */ (function () {
        function XAxisComponent() {
            this.categories = [];
            this.series = [];
            this.xAxisHeightChange = new core.EventEmitter();
            this.ticks = [];
            this.trimLabel = trimLabel;
        }
        /**
         * @param {?} changes
         * @return {?}
         */
        XAxisComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            // console.log("-----------------------")
            //console.log(this.options)
            //console.log(this.xScale)
            this.update();
        };
        /**
         * @return {?}
         */
        XAxisComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () { };
        /**
         * @return {?}
         */
        XAxisComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            setTimeout((/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var xAxisHeight = parseInt(_this.xAxisHeightEl.nativeElement.getBoundingClientRect().height, 10) + 10;
                // if (xAxisHeight<50)
                //     xAxisHeight=50;
                // console.log("x height ", xAxisHeight)
                if (xAxisHeight !== _this.options.xAxis.height) {
                    // console.log("ngAfterViewInit", "xxxxxxxxxx", xAxisHeight, this.options.xAxis.height)
                    _this.xAxisHeightChange.emit({ xAxisHeight: xAxisHeight });
                }
            }), 0);
        };
        /**
         * @return {?}
         */
        XAxisComponent.prototype.update = /**
         * @return {?}
         */
        function () {
            if (this.options.barType == "vertical") {
                this.ticks = this.yScale.nice().ticks();
            }
            else {
                this.ticks = this.xScale.nice().ticks();
            }
            this.ngAfterViewInit();
        };
        /**
         * @param {?} item
         * @return {?}
         */
        XAxisComponent.prototype.xTransformRotate = /**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            if (this.options.barType == "vertical") {
                return "rotate(" + this.options.xAxis.labelRotation + ", " + (this.xScale(item) + (this.xScale.bandwidth() / 2) + this.options.yAxis.width) + ", " + (this.options.height - 20) + ")";
            }
            else {
                return "rotate(" + this.options.xAxis.labelRotation + ", " + (this.xScale(item) + this.options.yAxis.width) + ", " + (this.options.height - this.options.xAxis.height + 20) + ")";
            }
        };
        /**
         * @param {?} tick
         * @return {?}
         */
        XAxisComponent.prototype.pathDirection = /**
         * @param {?} tick
         * @return {?}
         */
        function (tick) {
            return 'M ' + (this.xScale(tick) + this.options.yAxis.width) + ' ' + (this.options.header.height) + ' L ' + (this.xScale(tick) + this.options.yAxis.width) + ' ' + (this.options.height - this.options.xAxis.height);
        };
        XAxisComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'g[x-axis]',
                        template: "\n<svg>\n    <g #xAxisHeightEl data-z-index=\"20\" height=\"70\"> \n        <g class=\"highcharts-axis highcharts-yaxis\" data-z-index=\"2\" aria-hidden=\"true\" >\n            <text [attr.x]=\"options.width/2\" [attr.y]=\"options.height-10\" text-anchor=\"middle\" dominant-baseline=\"central\"  style=\"margin-bottom: 50px; color:#666666;cursor:default;font-size:11px;fill:#666666;\"\n                class=\"highcharts-axis-title\"\n                >\n                {{options.xAxis ? options.xAxis.title : \"\"}}\n            </text>\n        </g>\n        \n        <g class=\"highcharts-axis-labels highcharts-xaxis-labels\" data-z-index=\"7\" aria-hidden=\"true\"\n            *ngIf=\"options.barType == 'vertical'\">\n            <text \n                *ngFor=\"let item of categories; let i = index;let f = first;\"\n                [attr.x] = 'xScale(item) + (xScale.bandwidth()/2)+options.yAxis.width'\n                [attr.y] = \"options.height-30\"\n                [attr.transform]=\"xTransformRotate(item)\"\n                [attr.text-anchor]=\"options.xAxis.labelAlign\"\n                style=\"color:#666666;cursor:default;font-size:11px;fill:#666666;\"\n                opacity=\"1\">{{ options.xAxis.labelEllipsis ? trimLabel(item,  options.xAxis.labelEllipsisSize) :item}}</text>\n        </g> \n\n        <g class=\"highcharts-axis-labels highcharts-yaxis-labels\" data-z-index=\"7\" aria-hidden=\"true\"\n            *ngIf=\"options.barType == 'horizontal'\">\n            <text style=\"color:#666666;cursor:default;font-size:11px;fill:#666666;\" \n                text-anchor=\"middle\"\n                *ngFor=\"let tick of ticks\" \n                [attr.x] = 'xScale(tick) + options.yAxis.width'\n                [attr.y] = \"options.height - 30\"\n                [attr.transform]=\"xTransformRotate(tick)\"\n                opacity=\"1\">{{ options.xAxis.labelEllipsis ? trimLabel(tick,  options.xAxis.labelEllipsisSize) :tick}}</text>\n        </g>\n    </g>\n    <g *ngIf=\"options.barType == 'horizontal'\" class=\"highcharts-grid highcharts-yaxis-grid\" data-z-index=\"1\" aria-hidden=\"true\">\n        <path fill=\"none\" stroke=\"#e6e6e6\" stroke-width=\"1\" data-z-index=\"1\" class=\"highcharts-grid-line\"\n            *ngFor=\"let tick of ticks\" [attr.d]=\"pathDirection(tick)\" opacity=\"1\">\n        </path>\n    </g>\n</svg>\n",
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        XAxisComponent.ctorParameters = function () { return []; };
        XAxisComponent.propDecorators = {
            xScale: [{ type: core.Input }],
            yScale: [{ type: core.Input }],
            options: [{ type: core.Input }],
            categories: [{ type: core.Input }],
            series: [{ type: core.Input }],
            xAxisHeightEl: [{ type: core.ViewChild, args: ['xAxisHeightEl', { read: core.ElementRef, static: false },] }],
            xAxisHeightChange: [{ type: core.Output }]
        };
        return XAxisComponent;
    }());
    if (false) {
        /** @type {?} */
        XAxisComponent.prototype.xScale;
        /** @type {?} */
        XAxisComponent.prototype.yScale;
        /** @type {?} */
        XAxisComponent.prototype.options;
        /** @type {?} */
        XAxisComponent.prototype.categories;
        /** @type {?} */
        XAxisComponent.prototype.series;
        /** @type {?} */
        XAxisComponent.prototype.xAxisHeightEl;
        /** @type {?} */
        XAxisComponent.prototype.xAxisHeightChange;
        /** @type {?} */
        XAxisComponent.prototype.ticks;
        /** @type {?} */
        XAxisComponent.prototype.trimLabel;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var YAxisComponent = /** @class */ (function () {
        function YAxisComponent() {
            this.categories = [];
            this.series = [];
            this.yAxisWidthChange = new core.EventEmitter();
            this.ticks = [];
            this.rightTicks = [];
            this.trimLabel = trimLabel;
        }
        /**
         * @return {?}
         */
        YAxisComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            //console.log(this.yScale)
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        YAxisComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            // console.log(changes)
            // console.log("-------------------")
            // console.log( JSON.stringify(this.yScale('Africa')))
            //console.log(this.yScale(-200))
            this.update();
        };
        /**
         * @return {?}
         */
        YAxisComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            setTimeout((/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var yAxisWidth = parseInt(_this.yAxisWidthEl.nativeElement.getBoundingClientRect().width, 10) + 30;
                /** @type {?} */
                var yAxisHeight = parseInt(_this.yAxisWidthEl.nativeElement.getBoundingClientRect().height, 10) + 300;
                /** @type {?} */
                var yAxisRightWidth = parseInt(_this.yAxisRightWidthEl.nativeElement.getBoundingClientRect().width, 10) + 30;
                if (yAxisHeight !== _this.options.yAxis.height || yAxisWidth !== _this.options.yAxis.width) {
                    _this.yAxisWidthChange.emit({ yAxisWidth: yAxisWidth, yAxisHeight: yAxisHeight, yAxisRightWidth: yAxisRightWidth });
                }
                //setTimeout(() => this.updateDims());
            }), 0);
        };
        /**
         * @return {?}
         */
        YAxisComponent.prototype.update = /**
         * @return {?}
         */
        function () {
            if (this.options.barType == "vertical") {
                if (this.yScale)
                    this.ticks = this.yScale.nice().ticks();
                if (this.yRightScale)
                    this.rightTicks = this.yRightScale.nice().ticks();
            }
            else {
                //this.ticks=this.xScale.nice().ticks();
            }
            this.ngAfterViewInit();
        };
        /**
         * @param {?} x
         * @return {?}
         */
        YAxisComponent.prototype.transform = /**
         * @param {?} x
         * @return {?}
         */
        function (x) {
            return "rotate(270, " + x + ", " + this.options.height / 2 + ")";
        };
        /**
         * @param {?} tick
         * @return {?}
         */
        YAxisComponent.prototype.pathDirection = /**
         * @param {?} tick
         * @return {?}
         */
        function (tick) {
            //console.log(tick, this.yScale(tick))
            return 'M ' + (this.options.yAxis.width) + ' ' + (this.yScale(tick) + this.options.header.height) + ' L ' + (this.options.plotBackground.width + this.options.yAxis.width) + ' ' + (this.yScale(tick) + this.options.header.height);
        };
        /**
         * @param {?} item
         * @return {?}
         */
        YAxisComponent.prototype.calculateYTextPosition = /**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            if (this.yScale(item))
                return parseInt(this.yScale(item) + (this.yScale.bandwidth() / 2) + this.options.header.height);
            return this.options.header.height;
        };
        YAxisComponent.decorators = [
            { type: core.Component, args: [{
                        selector: "g[y-axis]",
                        template: "<svg>\n    <g #yAxisWidthEl>\n        <g class=\"highcharts-axis highcharts-yaxis\" data-z-index=\"2\" aria-hidden=\"true\">\n            <text x=\"10\" [attr.y]=\"options.height/2\" text-anchor=\"middle\" dominant-baseline=\"central\" \n                style=\"color:#666666;cursor:default;font-size:11px;fill:#666666;\" \n                class=\"highcharts-axis-title\"\n                [attr.transform]=\"transform(10)\">\n                {{options.yAxis ? options.yAxis.title : \"\"}}\n            </text>\n        </g>\n        <g class=\"highcharts-axis-labels highcharts-yaxis-labels\" data-z-index=\"7\" aria-hidden=\"true\"\n            *ngIf=\"options.barType == 'vertical'\">\n            <text\n                style=\"color:#666666;cursor:default;font-size:11px;fill:#666666;\" \n                text-anchor=\"start\"\n                *ngFor=\"let tick of ticks\" \n                [attr.x]=\"30\"\n                [attr.y]=\"yScale(tick)+this.options.header.height\" \n                opacity=\"1\">{{ options.yAxis.labelEllipsis ? trimLabel(tick,  options.yAxis.labelEllipsisSize) :tick}} </text>\n        </g>\n        <g class=\"highcharts-axis-labels highcharts-xaxis-labels\" data-z-index=\"7\" aria-hidden=\"true\"\n            *ngIf=\"options.barType == 'horizontal'\">\n            <text \n                *ngFor=\"let item of categories; let i = index;\"\n                [attr.x] = \"30\"\n                [attr.y] = \"calculateYTextPosition(item)\"\n                style=\"color:#666666;cursor:default;font-size:11px;fill:#666666;\" text-anchor=\"right\" \n                 opacity=\"1\">{{ options.yAxis.labelEllipsis ? trimLabel(item,  options.yAxis.labelEllipsisSize) :item}}</text>\n        </g> \n    </g>\n\n    <g #yAxisRightWidthEl>\n        <g *ngIf= \"yRightScale\" class=\"highcharts-axis highcharts-yaxis\" data-z-index=\"2\" aria-hidden=\"true\" >\n            <text \n                [attr.x]=\"options.width - 10\" \n                [attr.y]=\"options.height/2\" text-anchor=\"middle\" dominant-baseline=\"central\" \n                style=\"color:#666666;cursor:default;font-size:11px;fill:#666666;\" \n                class=\"highcharts-axis-title\"\n                [attr.transform]=\"transform(options.width  - 10)\">\n                {{options.yAxis ? options.yAxis.rightTitle : \"\"}}\n            </text>\n        </g>\n        <g  class=\"highcharts-axis-labels highcharts-yaxis-labels\" data-z-index=\"7\" aria-hidden=\"true\"\n            *ngIf=\"options.barType == 'vertical' && yRightScale\">\n            <text\n                style=\"color:#666666;cursor:default;font-size:11px;fill:#666666;\" \n                text-anchor=\"end\"\n                *ngFor=\"let tick of rightTicks\" \n                [attr.x]=\"options.width - 30\"\n                [attr.y]=\"yRightScale(tick)+this.options.header.height\" \n                opacity=\"1\">{{ options.yAxis.labelEllipsis ? trimLabel(tick,  options.yAxis.labelEllipsisSize) :tick}} </text>\n        </g>\n    </g>\n    \n    <g *ngIf=\"options.barType == 'vertical'\" class=\"highcharts-grid highcharts-yaxis-grid\" data-z-index=\"1\" aria-hidden=\"true\">\n        <path fill=\"none\" stroke=\"#e6e6e6\" stroke-width=\"1\" data-z-index=\"1\" class=\"highcharts-grid-line\"\n            *ngFor=\"let tick of ticks\" [attr.d]=\"pathDirection(tick)\" opacity=\"1\">\n        </path>\n    </g>\n\n</svg>",
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        YAxisComponent.ctorParameters = function () { return []; };
        YAxisComponent.propDecorators = {
            xScale: [{ type: core.Input }],
            yScale: [{ type: core.Input }],
            yRightScale: [{ type: core.Input }],
            options: [{ type: core.Input }],
            categories: [{ type: core.Input }],
            series: [{ type: core.Input }],
            yAxisWidthEl: [{ type: core.ViewChild, args: ['yAxisWidthEl', { static: true },] }],
            yAxisRightWidthEl: [{ type: core.ViewChild, args: ['yAxisRightWidthEl', { static: true },] }],
            yAxisWidthChange: [{ type: core.Output }]
        };
        return YAxisComponent;
    }());
    if (false) {
        /** @type {?} */
        YAxisComponent.prototype.xScale;
        /** @type {?} */
        YAxisComponent.prototype.yScale;
        /** @type {?} */
        YAxisComponent.prototype.yRightScale;
        /** @type {?} */
        YAxisComponent.prototype.options;
        /** @type {?} */
        YAxisComponent.prototype.categories;
        /** @type {?} */
        YAxisComponent.prototype.series;
        /** @type {?} */
        YAxisComponent.prototype.yAxisWidthEl;
        /** @type {?} */
        YAxisComponent.prototype.yAxisRightWidthEl;
        /** @type {?} */
        YAxisComponent.prototype.yAxisWidthChange;
        /** @type {?} */
        YAxisComponent.prototype.ticks;
        /** @type {?} */
        YAxisComponent.prototype.rightTicks;
        /** @type {?} */
        YAxisComponent.prototype.trimLabel;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AxesModule = /** @class */ (function () {
        function AxesModule() {
        }
        AxesModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule],
                        declarations: [XAxisComponent, YAxisComponent],
                        exports: [XAxisComponent, YAxisComponent]
                    },] }
        ];
        return AxesModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var HeaderComponent = /** @class */ (function () {
        function HeaderComponent() {
            this.headerHeightChange = new core.EventEmitter();
        }
        /**
         * @param {?} changes
         * @return {?}
         */
        HeaderComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            // console.log(changes)
            this.update();
        };
        /**
         * @return {?}
         */
        HeaderComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () { };
        /**
         * @return {?}
         */
        HeaderComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var headerHeight = parseInt(this.headerHeightEl.nativeElement.getBoundingClientRect().height, 10) + 20;
            // console.log("headerHeight "+headerHeight)
            this.headerHeightChange.emit({ headerHeight: headerHeight });
            //setTimeout(() => this.updateDims());
        };
        /**
         * @return {?}
         */
        HeaderComponent.prototype.update = /**
         * @return {?}
         */
        function () {
            //this.ticks=this.xScale.nice().ticks();
        };
        HeaderComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'g[header]',
                        template: "\r\n<svg>\r\n\r\n    <g #headerHeightEl>\r\n\r\n        <text [attr.x]=\"options.width/2\" text-anchor=\"middle\" class=\"highcharts-title\" data-z-index=\"4\" style=\"color:#333333;font-size:18px;fill:#333333;\" y=\"24\" aria-hidden=\"true\">\r\n            <tspan>{{options.title}}</tspan>\r\n        </text>\r\n        <text [attr.x]=\"options.width/2\" text-anchor=\"middle\" class=\"highcharts-subtitle\" data-z-index=\"4\" style=\"color:#666666;fill:#666666;\" y=\"52\" aria-hidden=\"true\">\r\n            <tspan>{{options.subtitle}}</tspan>\r\n        </text>\r\n        <!-- <g class=\"highcharts-axis highcharts-yaxis\" data-z-index=\"2\" aria-hidden=\"true\" >\r\n            <text [attr.x]=\"options.width/2\" [attr.y]=\"options.height-10\" text-anchor=\"middle\" dominant-baseline=\"central\"  style=\"margin-bottom: 50px; color:#666666;cursor:default;font-size:11px;fill:#666666;\"\r\n                class=\"highcharts-axis-title\"\r\n                >\r\n                {{options.xAxis ? options.xAxis.title : \"\"}}\r\n            </text>\r\n        </g> -->\r\n    </g>\r\n \r\n</svg>",
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        HeaderComponent.ctorParameters = function () { return []; };
        HeaderComponent.propDecorators = {
            options: [{ type: core.Input }],
            headerHeightEl: [{ type: core.ViewChild, args: ['headerHeightEl', { static: true },] }],
            headerHeightChange: [{ type: core.Output }]
        };
        return HeaderComponent;
    }());
    if (false) {
        /** @type {?} */
        HeaderComponent.prototype.options;
        /** @type {?} */
        HeaderComponent.prototype.headerHeightEl;
        /** @type {?} */
        HeaderComponent.prototype.headerHeightChange;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var HeaderModule = /** @class */ (function () {
        function HeaderModule() {
        }
        HeaderModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule],
                        declarations: [HeaderComponent],
                        exports: [HeaderComponent]
                    },] }
        ];
        return HeaderModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var LegendComponent = /** @class */ (function () {
        function LegendComponent() {
            this.trimLabel = trimLabel;
        }
        /**
         * @param {?} changes
         * @return {?}
         */
        LegendComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            // console.log(changes)
            this.update();
        };
        /**
         * @return {?}
         */
        LegendComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
        };
        /**
         * @return {?}
         */
        LegendComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
        };
        /**
         * @return {?}
         */
        LegendComponent.prototype.update = /**
         * @return {?}
         */
        function () {
        };
        LegendComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'chart-legend',
                        template: "<div class=\"chart-legend ng-tns-c30-0 ng-star-inserted\" [style.width]=\"options.width+'px'\">\r\n    <div style=\"text-align: center;\">\r\n        <div class=\"legend-wrap\">\r\n            <ul class=\"legend-labels\" style=\"max-height: 255px;\">\r\n                <li class=\"legend-label ng-star-inserted\"\r\n                  *ngFor=\"let gn of groupName;let i=index\"  \r\n                >\r\n                    <div  *ngIf=\"gn.name\">\r\n                        <span class=\"legend-label-color\" \r\n                            [style.background-color] = \"gn.color\"> </span>\r\n                        <span class=\"legend-label-text\">\r\n                            {{ options.legend.labelEllipsis ? trimLabel(gn.name,  options.legend.labelEllipsisSize) :gn.name}}\r\n                        </span>\r\n                    </div>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n</div>",
                        styles: [".chart-legend ul li{display:inline-block}.chart-legend{text-align:center;display:inline-block;padding:0}.chart-legend .legend-label{text-align:center;cursor:pointer;font-size:90%;margin:8px;color:#afb7c8}.chart-legend li,.chart-legend ul{padding:0;margin:0;list-style:none}.chart-legend .legend-labels{line-height:85%;list-style:none;float:left;width:100%;border-radius:3px;overflow-y:auto;overflow-x:hidden;white-space:nowrap}.chart-legend .legend-label-color{display:inline-block;height:15px;width:15px;margin-right:5px;color:#5b646b;border-radius:3px}.chart-legend .legend-label-text{display:inline-block;vertical-align:top;line-height:15px;font-size:12px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}"]
                    }] }
        ];
        /** @nocollapse */
        LegendComponent.ctorParameters = function () { return []; };
        LegendComponent.propDecorators = {
            groupName: [{ type: core.Input }],
            series: [{ type: core.Input }],
            options: [{ type: core.Input }]
        };
        return LegendComponent;
    }());
    if (false) {
        /** @type {?} */
        LegendComponent.prototype.groupName;
        /** @type {?} */
        LegendComponent.prototype.series;
        /** @type {?} */
        LegendComponent.prototype.options;
        /** @type {?} */
        LegendComponent.prototype.trimLabel;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var LegendModule = /** @class */ (function () {
        function LegendModule() {
        }
        LegendModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule],
                        declarations: [LegendComponent],
                        exports: [LegendComponent]
                    },] }
        ];
        return LegendModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TooltipDirective = /** @class */ (function () {
        function TooltipDirective(el, renderer) {
            this.el = el;
            this.renderer = renderer;
            // 호스트 요소와 tooltip 요소 간의 거리
            this.offset = 10;
        }
        /**
         * @return {?}
         */
        TooltipDirective.prototype.onMouseEnter = /**
         * @return {?}
         */
        function () {
            // console.log("onMouseEnter")
            if (!this.tooltip) {
                this.show();
            }
        };
        /**
         * @return {?}
         */
        TooltipDirective.prototype.onMouseLeave = /**
         * @return {?}
         */
        function () {
            // console.log("onMouseLeave")
            if (this.tooltip) {
                this.hide();
            }
        };
        /**
         * @return {?}
         */
        TooltipDirective.prototype.show = /**
         * @return {?}
         */
        function () {
            this.create();
            this.setPosition();
            this.renderer.addClass(this.tooltip, 'ng-tooltip-show');
        };
        /**
         * @return {?}
         */
        TooltipDirective.prototype.hide = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.renderer.removeClass(this.tooltip, 'ng-tooltip-show');
            window.setTimeout((/**
             * @return {?}
             */
            function () {
                _this.renderer.removeChild(document.body, _this.tooltip);
                _this.tooltip = null;
            }), this.delay);
        };
        /**
         * @return {?}
         */
        TooltipDirective.prototype.create = /**
         * @return {?}
         */
        function () {
            this.tooltip = this.renderer.createElement('span');
            this.renderer.appendChild(this.tooltip, this.renderer.createText(this.tooltipTitle) // textNode
            );
            this.renderer.appendChild(document.body, this.tooltip);
            // this.renderer.appendChild(this.el.nativeElement, this.tooltip);
            this.renderer.addClass(this.tooltip, 'ng-tooltip');
            this.renderer.addClass(this.tooltip, "ng-tooltip-" + this.placement);
            // delay 설정
            this.renderer.setStyle(this.tooltip, '-webkit-transition', "opacity " + this.delay + "ms");
            this.renderer.setStyle(this.tooltip, '-moz-transition', "opacity " + this.delay + "ms");
            this.renderer.setStyle(this.tooltip, '-o-transition', "opacity " + this.delay + "ms");
            this.renderer.setStyle(this.tooltip, 'transition', "opacity " + this.delay + "ms");
        };
        /**
         * @return {?}
         */
        TooltipDirective.prototype.setPosition = /**
         * @return {?}
         */
        function () {
            // 호스트 요소의 사이즈와 위치 정보
            /** @type {?} */
            var hostPos = this.el.nativeElement.getBoundingClientRect();
            // tooltip 요소의 사이즈와 위치 정보
            /** @type {?} */
            var tooltipPos = this.tooltip.getBoundingClientRect();
            // window의 scroll top
            // getBoundingClientRect 메소드는 viewport에서의 상대적인 위치를 반환한다.
            // 스크롤이 발생한 경우, tooltip 요소의 top에 세로 스크롤 좌표값을 반영하여야 한다.
            /** @type {?} */
            var scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            /** @type {?} */
            var top;
            /** @type {?} */
            var left;
            if (this.placement === 'top') {
                top = hostPos.top - tooltipPos.height - this.offset;
                left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
            }
            if (this.placement === 'bottom') {
                top = hostPos.bottom + this.offset;
                left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
            }
            if (this.placement === 'left') {
                top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
                left = hostPos.left - tooltipPos.width - this.offset;
            }
            if (this.placement === 'right') {
                top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
                left = hostPos.right + this.offset;
            }
            // 스크롤이 발생한 경우, tooltip 요소의 top에 세로 스크롤 좌표값을 반영하여야 한다.
            this.renderer.setStyle(this.tooltip, 'top', top + scrollPos + "px");
            this.renderer.setStyle(this.tooltip, 'left', left + "px");
        };
        TooltipDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[tooltip]'
                    },] }
        ];
        /** @nocollapse */
        TooltipDirective.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 }
        ]; };
        TooltipDirective.propDecorators = {
            tooltipTitle: [{ type: core.Input, args: ['tooltip',] }],
            placement: [{ type: core.Input }],
            delay: [{ type: core.Input }],
            onMouseEnter: [{ type: core.HostListener, args: ['mouseenter',] }],
            onMouseLeave: [{ type: core.HostListener, args: ['mouseleave',] }]
        };
        return TooltipDirective;
    }());
    if (false) {
        /** @type {?} */
        TooltipDirective.prototype.tooltipTitle;
        /** @type {?} */
        TooltipDirective.prototype.placement;
        /** @type {?} */
        TooltipDirective.prototype.delay;
        /** @type {?} */
        TooltipDirective.prototype.tooltip;
        /** @type {?} */
        TooltipDirective.prototype.offset;
        /**
         * @type {?}
         * @private
         */
        TooltipDirective.prototype.el;
        /**
         * @type {?}
         * @private
         */
        TooltipDirective.prototype.renderer;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TooltipModule = /** @class */ (function () {
        function TooltipModule() {
        }
        TooltipModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule],
                        declarations: [TooltipDirective],
                        exports: [TooltipDirective]
                    },] }
        ];
        return TooltipModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ColorHelper = /** @class */ (function () {
        function ColorHelper(options, series) {
            this.options = options;
            this.series = series;
        }
        /**
         * @return {?}
         */
        ColorHelper.prototype.generateColorScale = /**
         * @return {?}
         */
        function () {
            //let colorArr=["#a8385d", "#7aa3e5", "#a27ea8", "#aae3f5", "#adcded", "#a95963", "#8796c0", "#7ed3ed", "#50abcc", "#ad6886"]; //ngx-charts default color code
            //let colorList=['#7cb5ec', '#434348', '#f7a35c', '#90ed7d', '#8085E9', '#F15C80', '#E4D354', '#2B908F', '#F45B5B', '#91E8E1']; //highchart color code
            /** @type {?} */
            var colorList = ['#7cb5ec', '#434348', '#f7a35c', '#90ed7d', '#8085E9', '#F15C80', '#E4D354', '#2B908F', '#F45B5B', '#91E8E1', "#7aa3e5", "#a27ea8", "#aae3f5", "#adcded", "#a95963", "#8796c0", "#7ed3ed", "#50abcc", "#ad6886"];
            /** @type {?} */
            var barColors = [];
            /** @type {?} */
            var groupDataArr = [];
            for (var i = 0; i < this.series.length; i++) {
                groupDataArr.push(this.series[i].name);
                if (this.series[i].colorCode) {
                    barColors.push(this.series[i].colorCode);
                }
                else {
                    /** @type {?} */
                    var index = i % colorList.length;
                    barColors.push(colorList[index]);
                }
            }
            return d3Scale.scaleOrdinal()
                .range(barColors)
                .domain(groupDataArr);
        };
        return ColorHelper;
    }());
    if (false) {
        /** @type {?} */
        ColorHelper.prototype.options;
        /** @type {?} */
        ColorHelper.prototype.series;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ngxChartsBarComponent = /** @class */ (function () {
        function ngxChartsBarComponent(element, chartElement, cdr) {
            this.chartElement = chartElement;
            this.cdr = cdr;
            this.customOptions = {
                barType: 'vertical',
                title: '',
                subtitle: '',
                height: 0,
                width: 0,
                padding: 5,
                xAxis: {
                    title: '',
                    height: 0,
                    labelRotation: 0,
                    labelAlign: 'left',
                    labelEllipsis: false,
                    labelEllipsisSize: 16
                },
                yAxis: {
                    title: '',
                    width: 0,
                    height: 0,
                    labelRotation: 0,
                    labelEllipsis: false,
                    labelEllipsisSize: 16
                },
                legend: {
                    labelEllipsis: false,
                    labelEllipsisSize: 16
                },
                plotBackground: {
                    x: 0,
                    y: 0,
                    height: 0,
                    width: 0
                },
                plotOptions: {
                    groupBarPadding: 20,
                    innerBarPadding: 3
                },
                header: {
                    height: 0,
                    width: 0
                }
            };
            this._options = {};
            this.categories = [];
            this.series = [];
            this.bars = [];
            this.groupName = [];
            this.element = element.nativeElement;
            this.trimLabel = trimLabel;
        }
        Object.defineProperty(ngxChartsBarComponent.prototype, "options", {
            get: /**
             * @return {?}
             */
            function () {
                return this._options;
            },
            set: /**
             * @param {?} obj
             * @return {?}
             */
            function (obj) {
                /** @type {?} */
                var xAxis = obj.xAxis;
                xAxis['labelEllipsis'] = (obj.xAxis.labelEllipsisSize != undefined && obj.xAxis.labelEllipsisSize > 0) ? true : false;
                /** @type {?} */
                var yAxis = obj.yAxis;
                yAxis['labelEllipsis'] = (obj.yAxis.labelEllipsisSize != undefined && obj.yAxis.labelEllipsisSize > 0) ? true : false;
                /** @type {?} */
                var legend = obj.legend;
                legend['labelEllipsis'] = (obj.legend.labelEllipsisSize != undefined && obj.legend.labelEllipsisSize > 0) ? true : false;
                /** @type {?} */
                var plotBackground = obj.plotBackground;
                /** @type {?} */
                var plotOptions = obj.plotOptions;
                /** @type {?} */
                var header = obj.header;
                delete obj['xAxis'];
                delete obj['yAxis'];
                delete obj['legend'];
                delete obj['plotBackground'];
                delete obj['plotOptions'];
                delete obj['header'];
                this._options = __assign({}, this.customOptions, obj, { xAxis: __assign({}, this.customOptions.xAxis, xAxis), yAxis: __assign({}, this.customOptions.yAxis, yAxis), legend: __assign({}, this.customOptions.legend, legend), plotBackground: __assign({}, this.customOptions.plotBackground, plotBackground), plotOptions: __assign({}, this.customOptions.plotOptions, plotOptions), header: __assign({}, this.customOptions.header, header) });
                // console.log(this._options)
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} changes
         * @return {?}
         */
        ngxChartsBarComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var _this = this;
            this.groupBarPaddingBK = this.options.plotOptions.groupBarPadding;
            this.innerBarPaddingBK = this.options.plotOptions.innerBarPadding;
            setTimeout((/**
             * @return {?}
             */
            function () { return _this.update(); }));
        };
        /**
         * @return {?}
         */
        ngxChartsBarComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.options.width = this.options.width;
            this.options.height = this.options.height;
            this.update();
        };
        /**
         * @return {?}
         */
        ngxChartsBarComponent.prototype.update = /**
         * @return {?}
         */
        function () {
            var _this = this;
            // console.log("ttttttt",this.options)
            /** @type {?} */
            var hostElem = this.chartElement.nativeElement;
            /** @type {?} */
            var dims = hostElem.parentNode !== null ? hostElem.parentNode.getBoundingClientRect() : { height: 400, width: 800 };
            /** @type {?} */
            var style = hostElem.parentNode.currentStyle || window.getComputedStyle(hostElem.parentNode);
            this.options.height = !this.options.height ? dims.height - this.strToNumber(style.paddingLeft) - this.strToNumber(style.paddingRight) : this.options.height;
            this.options.width = !this.options.width ? dims.width - this.strToNumber(style.paddingLeft) - this.strToNumber(style.paddingRight) : dims.width - this.strToNumber(style.paddingLeft) - this.strToNumber(style.paddingRight);
            this.calPlotBackground();
            /** @type {?} */
            var countFlag = false;
            this.options.plotOptions.groupBarPadding = this.groupBarPaddingBK;
            this.options.plotOptions.innerBarPadding = this.innerBarPaddingBK;
            do {
                if (countFlag == true) {
                    this.options.plotOptions.groupBarPadding--;
                    this.options.plotOptions.innerBarPadding = 2;
                }
                if (this.options.barType == 'vertical') {
                    this.xScale = this.getXScale();
                }
                else {
                    this.yScale = this.getXScale();
                }
                this.innerScale = this.getInnerScale();
                countFlag = true;
            } while (this.innerScale.bandwidth() < 2);
            // 
            if (this.options.barType == 'vertical') {
                this.yScale = this.getYScale();
            }
            else {
                this.xScale = this.getYScale();
            }
            /** @type {?} */
            var colorHelper = new ColorHelper(this.options, this.series);
            this.colorScale = colorHelper.generateColorScale();
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.groupName = [];
                _this.series.map((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    if (item.name)
                        _this.groupName.push({
                            name: item.name,
                            color: _this.colorScale(item.name)
                        });
                }));
                _this.createBar();
                //setTimeout(() => {
                // for (let i=0; i<this.bars.length; i++) {
                //     console.log(this.bars[i].className)
                //     transition(select(this.element)).select('.bar02').transition()
                //         .duration(500)
                //         .attr('width', this.bars[i].width);
                // }
                //},1000)
            }));
            this.cdr.detectChanges();
        };
        /**
         * @return {?}
         */
        ngxChartsBarComponent.prototype.getXScale = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var spacing;
            /** @type {?} */
            var range;
            if (this.options.barType == 'vertical') {
                spacing = (this.categories.length / (this.options.plotBackground.width / this.options.plotOptions.groupBarPadding));
                range = [0, this.options.plotBackground.width];
            }
            else {
                /** @type {?} */
                var length_1 = this.options.height - this.options.header.height;
                spacing = (this.categories.length / (this.options.plotBackground.height / this.options.plotOptions.groupBarPadding));
                range = [0, this.options.plotBackground.height];
            }
            return d3Scale.scaleBand()
                .range(range)
                .paddingInner(spacing)
                .paddingOuter(0.1)
                .domain(this.categories);
        };
        /**
         * @return {?}
         */
        ngxChartsBarComponent.prototype.getInnerScale = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var groupDataArr = [];
            for (var i = 0; i < this.series.length; i++) {
                groupDataArr.push(this.series[i].name);
            }
            /** @type {?} */
            var spacing;
            /** @type {?} */
            var range;
            if (this.options.barType == 'vertical') {
                spacing = (this.series.length / (this.xScale.bandwidth() / this.options.plotOptions.innerBarPadding));
                range = this.xScale.bandwidth();
            }
            else {
                spacing = (this.series.length / (this.yScale.bandwidth() / this.options.plotOptions.innerBarPadding));
                range = this.yScale.bandwidth();
            }
            return d3Scale.scaleBand()
                .range([0, range])
                .paddingInner(spacing)
                .domain(groupDataArr);
        };
        /**
         * @return {?}
         */
        ngxChartsBarComponent.prototype.getYScale = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var uniqueValue = new Set();
            this.series.map((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                item.data.map((/**
                 * @param {?} value
                 * @return {?}
                 */
                function (value) {
                    uniqueValue.add(value);
                }));
            }));
            /** @type {?} */
            var min = Math.min.apply(Math, __spread(uniqueValue));
            min = min > 0 ? 0 : min;
            /** @type {?} */
            var max = Math.max.apply(Math, __spread([0], uniqueValue));
            max = max > 0 ? max : 0;
            /** @type {?} */
            var range = [];
            if (this.options.barType == 'vertical') {
                /** @type {?} */
                var value = this.options.plotBackground.height;
                // console.log("bar getYScale",value)
                range = [value, 0];
                // console.log("bar getYScale - ", range)
            }
            else {
                /** @type {?} */
                var value = this.options.plotBackground.width - 30;
                range = [0, value];
            }
            // console.log("bar getYScale --- ", range, min, max)
            return d3Scale.scaleLinear()
                .range(range)
                .domain([min, max]);
            //return this.scale.nice().ticks();
        };
        /**
         * @return {?}
         */
        ngxChartsBarComponent.prototype.calPlotBackground = /**
         * @return {?}
         */
        function () {
            this.options = __assign({}, this.options, { plotBackground: __assign({}, this.options.plotBackground, { x: 0, y: 0, height: this.options.height - this.options.xAxis.height - this.options.header.height - this.options.padding, width: this.options.width - this.options.yAxis.width - this.options.padding }) });
            // console.log("calPlotBackground", JSON.stringify(this.options));
        };
        /**
         * @return {?}
         */
        ngxChartsBarComponent.prototype.createBar = /**
         * @return {?}
         */
        function () {
            var _this = this;
            //console.log("this.innerScale.bandwidth() "+this.innerScale.bandwidth())
            this.bars = [];
            if (this.options.barType == 'vertical') {
                this.categories.map((/**
                 * @param {?} item
                 * @param {?} index
                 * @return {?}
                 */
                function (item, index) {
                    for (var i = 0; i < _this.series.length; i++) {
                        /** @type {?} */
                        var bar = {
                            value: item,
                            //jan,feb
                            data: _this.series[i].data[index],
                            //101,202
                            group: _this.series[i].name,
                            color: _this.colorScale(_this.series[i].name),
                            //formattedLabel,
                            width: _this.innerScale.bandwidth(),
                            height: _this.series[i].data[index] > 0 ? (_this.yScale(0) - _this.yScale(_this.series[i].data[index])) : (_this.yScale(_this.series[i].data[index]) - _this.yScale(0)),
                            x: _this.innerScale(_this.series[i].name) + _this.xScale(item),
                            y: _this.series[i].data[index] > 0 ? _this.yScale(_this.series[i].data[index]) : _this.yScale(0),
                            className: "vertical_bar"
                        };
                        _this.bars.push(bar);
                    }
                }));
            }
            else {
                this.categories.map((/**
                 * @param {?} item
                 * @param {?} index
                 * @return {?}
                 */
                function (item, index) {
                    for (var i = 0; i < _this.series.length; i++) {
                        /** @type {?} */
                        var bar = {
                            value: item,
                            //jan,feb
                            data: _this.series[i].data[index],
                            //101,202
                            group: _this.series[i].name,
                            color: _this.colorScale(_this.series[i].name),
                            //formattedLabel,
                            width: _this.series[i].data[index] > 0 ? (_this.xScale(_this.series[i].data[index]) - _this.xScale(0)) : (_this.xScale(0) - _this.xScale(_this.series[i].data[index])),
                            height: _this.innerScale.bandwidth(),
                            x: _this.series[i].data[index] > 0 ? _this.xScale(0) : _this.xScale(_this.series[i].data[index]),
                            y: _this.innerScale(_this.series[i].name) + _this.yScale(item),
                            className: "horizontal_bar"
                        };
                        _this.bars.push(bar);
                    }
                }));
            }
        };
        /**
         * @param {?} __0
         * @return {?}
         */
        ngxChartsBarComponent.prototype.yAxisWidthChange = /**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var yAxisWidth = _a.yAxisWidth, yAxisHeight = _a.yAxisHeight, yAxisRightWidth = _a.yAxisRightWidth;
            //console.log("yAxisWidth "+yAxisWidth)
            this.options = __assign({}, this.options, { yAxis: __assign({}, this.options.yAxis, { width: yAxisWidth, height: yAxisHeight }) });
            //console.log( this.options)
            this.update();
        };
        /**
         * @param {?} __0
         * @return {?}
         */
        ngxChartsBarComponent.prototype.xAxisHeightChange = /**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var xAxisHeight = _a.xAxisHeight;
            this.options = __assign({}, this.options, { xAxis: __assign({}, this.options.xAxis, { height: xAxisHeight }) });
            //console.log("xAxisHeightChange", xAxisHeight, JSON.stringify(this.options.xAxis));
            this.update();
        };
        /**
         * @param {?} __0
         * @return {?}
         */
        ngxChartsBarComponent.prototype.headerHeightChange = /**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var headerHeight = _a.headerHeight;
            this.options = __assign({}, this.options, { header: __assign({}, this.options.header, { height: headerHeight }) });
            this.update();
        };
        /**
         * @param {?} data
         * @return {?}
         */
        ngxChartsBarComponent.prototype.toolTipPlaccement = /**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            if (this.options.barType == 'vertical') {
                return data > 0 ? 'top' : 'bottom';
            }
            else {
                return data > 0 ? 'right' : 'left';
            }
        };
        /**
         * @param {?} event
         * @return {?}
         */
        ngxChartsBarComponent.prototype.onResize = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            var _this = this;
            //console.log("window:resize")
            setTimeout((/**
             * @return {?}
             */
            function () { return _this.update(); }));
        };
        /**
         * @return {?}
         */
        ngxChartsBarComponent.prototype.getViewBox = /**
         * @return {?}
         */
        function () {
            if (this.options.width > 0 && this.options.height > 0)
                return '0 0 ' + this.options.width + ' ' + this.options.height;
            else
                return '0 0 0 0';
        };
        /**
         * @private
         * @param {?} str
         * @return {?}
         */
        ngxChartsBarComponent.prototype.strToNumber = /**
         * @private
         * @param {?} str
         * @return {?}
         */
        function (str) {
            /** @type {?} */
            var numberPattern = /\d+/g;
            /** @type {?} */
            var num = str.match(numberPattern).join('');
            return parseFloat(num);
        };
        ngxChartsBarComponent.decorators = [
            { type: core.Component, args: [{
                        selector: "ngx-charts-bar",
                        template: "<div [style.width]=\"options.width+'px'\" [style.border]=\"'1px solid #f3f3f3'\">\r\n\r\n    <svg version=\"1.1\" class=\"highcharts-root\" [attr.padding]=\"options.padding\" [attr.width]=\"options.width\"\r\n        [attr.height]=\"options.height\" [attr.viewBox]=\"getViewBox()\"\r\n        aria-label=\"Interactive chart\" [style.border]=\"'0px solid gray'\" [style.padding]=\"options.padding\"\r\n        aria-hidden=\"false\">\r\n\r\n        <g header [options]=\"options\" (headerHeightChange)=\"headerHeightChange($event)\"></g>\r\n\r\n        <g y-axis \r\n            [xScale]=\"xScale\" \r\n            [yScale]=\"yScale\" \r\n            [options]=\"options\" \r\n            [categories]=\"categories\" \r\n            [series]=\"series\"\r\n            (yAxisWidthChange)=\"yAxisWidthChange($event)\"></g>\r\n\r\n        <g x-axis \r\n            [xScale]=\"xScale\" \r\n            [yScale]=\"yScale\" \r\n            [options]=\"options\" \r\n            [categories]=\"categories\" \r\n            [series]=\"series\"\r\n            (xAxisHeightChange)=\"xAxisHeightChange($event)\"></g>\r\n\r\n        <g data-z-index=\"0.1\" >\r\n            <rect *ngFor=\"let bar of bars\" \r\n                [attr.class]=\"bar.className\"\r\n                [attr.x]=\"bar.x+this.options.yAxis.width\"\r\n                [tooltip]=\"bar.value+', '+bar.group+', '+bar.data\" \r\n                [placement]=\"toolTipPlaccement(bar.data)\" \r\n                delay=\"10\"\r\n                [attr.y]=\"bar.y+this.options.header.height\" \r\n                [attr.width]=\"bar.width\" [attr.height]=\"bar.height\"\r\n                [attr.fill]=\"bar.color\" opacity=\"1\"  tabindex=\"-1\" role=\"img\"\r\n                aria-label=\"1. Jan, 49.9. Tokyo.\"></rect>\r\n        </g>\r\n    </svg>\r\n    <chart-legend\r\n        *ngIf=\"groupName.length\"\r\n        [groupName]=\"groupName\"\r\n        [options]=\"options\"\r\n        [series] = \"series\"    \r\n    >\r\n    </chart-legend>\r\n  \r\n</div>\r\n\r\n",
                        // changeDetection: ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        styles: [".tooltip-example{text-align:center;padding:0 50px}.tooltip-example [tooltip]{display:inline-block;margin:50px 20px;width:180px;height:50px;border:1px solid gray;border-radius:5px;line-height:50px;text-align:center}.ng-tooltip{position:absolute;max-width:150px;font-size:14px;text-align:center;color:#fafae3;padding:3px 8px;background:#282a36;border-radius:4px;z-index:1000;opacity:0}.ng-tooltip:after{content:\"\";position:absolute;border-style:solid}.ng-tooltip-top:after{top:100%;left:50%;margin-left:-5px;border-width:5px;border-color:#000 transparent transparent}.ng-tooltip-bottom:after{bottom:100%;left:50%;margin-left:-5px;border-width:5px;border-color:transparent transparent #000}.ng-tooltip-left:after{top:50%;left:100%;margin-top:-5px;border-width:5px;border-color:transparent transparent transparent #000}.ng-tooltip-right:after{top:50%;right:100%;margin-top:-5px;border-width:5px;border-color:transparent #000 transparent transparent}.ng-tooltip-show{opacity:1}.horizontal_bar{-webkit-animation:1s linear forwards horizontal_bar_frames;animation:1s linear forwards horizontal_bar_frames}@-webkit-keyframes horizontal_bar_frames{from{width:0}}@keyframes horizontal_bar_frames{from{width:0}}.vertical_bar{-webkit-animation:1s linear forwards vertical_bar_frames;animation:1s linear forwards vertical_bar_frames}@-webkit-keyframes vertical_bar_frames{from{height:0}}@keyframes vertical_bar_frames{from{height:0}}"]
                    }] }
        ];
        /** @nocollapse */
        ngxChartsBarComponent.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.ElementRef },
            { type: core.ChangeDetectorRef }
        ]; };
        ngxChartsBarComponent.propDecorators = {
            options: [{ type: core.Input }],
            categories: [{ type: core.Input }],
            series: [{ type: core.Input }],
            onResize: [{ type: core.HostListener, args: ['window:resize', ['$event'],] }]
        };
        return ngxChartsBarComponent;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        ngxChartsBarComponent.prototype.customOptions;
        /**
         * @type {?}
         * @private
         */
        ngxChartsBarComponent.prototype._options;
        /** @type {?} */
        ngxChartsBarComponent.prototype.categories;
        /** @type {?} */
        ngxChartsBarComponent.prototype.series;
        /** @type {?} */
        ngxChartsBarComponent.prototype.element;
        /** @type {?} */
        ngxChartsBarComponent.prototype.xScale;
        /** @type {?} */
        ngxChartsBarComponent.prototype.innerScale;
        /** @type {?} */
        ngxChartsBarComponent.prototype.yScale;
        /** @type {?} */
        ngxChartsBarComponent.prototype.bars;
        /** @type {?} */
        ngxChartsBarComponent.prototype.groupName;
        /** @type {?} */
        ngxChartsBarComponent.prototype.groupBarPaddingBK;
        /** @type {?} */
        ngxChartsBarComponent.prototype.innerBarPaddingBK;
        /** @type {?} */
        ngxChartsBarComponent.prototype.colorScale;
        /** @type {?} */
        ngxChartsBarComponent.prototype.trimLabel;
        /**
         * @type {?}
         * @private
         */
        ngxChartsBarComponent.prototype.chartElement;
        /**
         * @type {?}
         * @private
         */
        ngxChartsBarComponent.prototype.cdr;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ngxChartsBarModule = /** @class */ (function () {
        function ngxChartsBarModule() {
        }
        ngxChartsBarModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [ngxChartsBarComponent],
                        imports: [common.CommonModule, AxesModule, HeaderModule, LegendModule, TooltipModule],
                        exports: [ngxChartsBarComponent],
                        providers: [],
                    },] }
        ];
        return ngxChartsBarModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ngxChartsStackedComponent = /** @class */ (function () {
        function ngxChartsStackedComponent(element, chartElement, cdr) {
            this.chartElement = chartElement;
            this.cdr = cdr;
            this.customOptions = {
                barType: 'vertical',
                title: '',
                subtitle: '',
                height: 0,
                width: 0,
                padding: 5,
                xAxis: {
                    title: '',
                    height: 0,
                    labelRotation: 0,
                    labelAlign: 'left',
                    labelEllipsis: false,
                    labelEllipsisSize: 16
                },
                yAxis: {
                    title: '',
                    width: 0,
                    height: 0,
                    labelRotation: 0,
                    labelEllipsis: false,
                    labelEllipsisSize: 16
                },
                legend: {
                    labelEllipsis: false,
                    labelEllipsisSize: 16
                },
                plotBackground: {
                    x: 0,
                    y: 0,
                    height: 0,
                    width: 0
                },
                plotOptions: {
                    groupBarPadding: 20,
                    innerBarPadding: 3
                },
                header: {
                    height: 0,
                    width: 0
                }
            };
            this._options = {};
            this._series = [];
            this.categories = [];
            this.bars = [];
            this.groupName = [];
            this.element = element.nativeElement;
            this.trimLabel = trimLabel;
        }
        Object.defineProperty(ngxChartsStackedComponent.prototype, "options", {
            get: /**
             * @return {?}
             */
            function () {
                return this._options;
            },
            set: /**
             * @param {?} obj
             * @return {?}
             */
            function (obj) {
                /** @type {?} */
                var xAxis = obj.xAxis;
                xAxis['labelEllipsis'] = (obj.xAxis.labelEllipsisSize != undefined && obj.xAxis.labelEllipsisSize > 0) ? true : false;
                /** @type {?} */
                var yAxis = obj.yAxis;
                yAxis['labelEllipsis'] = (obj.yAxis.labelEllipsisSize != undefined && obj.yAxis.labelEllipsisSize > 0) ? true : false;
                /** @type {?} */
                var legend = obj.legend;
                legend['labelEllipsis'] = (obj.legend.labelEllipsisSize != undefined && obj.legend.labelEllipsisSize > 0) ? true : false;
                /** @type {?} */
                var plotBackground = obj.plotBackground;
                /** @type {?} */
                var plotOptions = obj.plotOptions;
                /** @type {?} */
                var header = obj.header;
                delete obj['xAxis'];
                delete obj['yAxis'];
                delete obj['legend'];
                delete obj['plotBackground'];
                delete obj['plotOptions'];
                delete obj['header'];
                this._options = __assign({}, this.customOptions, obj, { xAxis: __assign({}, this.customOptions.xAxis, xAxis), yAxis: __assign({}, this.customOptions.yAxis, yAxis), legend: __assign({}, this.customOptions.legend, legend), plotBackground: __assign({}, this.customOptions.plotBackground, plotBackground), plotOptions: __assign({}, this.customOptions.plotOptions, plotOptions), header: __assign({}, this.customOptions.header, header) });
                // console.log(this._options)
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ngxChartsStackedComponent.prototype, "series", {
            get: /**
             * @return {?}
             */
            function () {
                return this._series;
            },
            // @Input() series: any=[];
            set: 
            // @Input() series: any=[];
            /**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                this._series = data;
                for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < data[i].data.length; j++) {
                        this._series[i].data[j] = this._series[i].data[j] < 0 ? 0 : this._series[i].data[j];
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        ;
        /**
         * @param {?} changes
         * @return {?}
         */
        ngxChartsStackedComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var _this = this;
            this.groupBarPaddingBK = this.options.plotOptions.groupBarPadding;
            this.innerBarPaddingBK = this.options.plotOptions.innerBarPadding;
            setTimeout((/**
             * @return {?}
             */
            function () { return _this.update(); }));
        };
        /**
         * @return {?}
         */
        ngxChartsStackedComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.options.width = this.options.width;
            this.options.height = this.options.height;
            this.update();
        };
        /**
         * @return {?}
         */
        ngxChartsStackedComponent.prototype.update = /**
         * @return {?}
         */
        function () {
            var _this = this;
            // console.log("ttttttt",this.options)
            /** @type {?} */
            var hostElem = this.chartElement.nativeElement;
            /** @type {?} */
            var dims = hostElem.parentNode !== null ? hostElem.parentNode.getBoundingClientRect() : { height: 400, width: 800 };
            /** @type {?} */
            var style = hostElem.parentNode.currentStyle || window.getComputedStyle(hostElem.parentNode);
            this.options.height = !this.options.height ? dims.height - this.strToNumber(style.paddingLeft) - this.strToNumber(style.paddingRight) : this.options.height;
            this.options.width = !this.options.width ? dims.width - this.strToNumber(style.paddingLeft) - this.strToNumber(style.paddingRight) : dims.width - this.strToNumber(style.paddingLeft) - this.strToNumber(style.paddingRight);
            this.calPlotBackground();
            /** @type {?} */
            var countFlag = false;
            this.options.plotOptions.groupBarPadding = this.groupBarPaddingBK;
            this.options.plotOptions.innerBarPadding = this.innerBarPaddingBK;
            do {
                if (countFlag == true) {
                    this.options.plotOptions.groupBarPadding--;
                    this.options.plotOptions.innerBarPadding = 2;
                }
                if (this.options.barType == 'vertical') {
                    this.xScale = this.getXScale();
                }
                else {
                    this.yScale = this.getXScale();
                }
                this.innerScale = this.getInnerScale();
                countFlag = true;
            } while (this.innerScale.bandwidth() < 2);
            // 
            if (this.options.barType == 'vertical') {
                this.yScale = this.getYScale();
            }
            else {
                this.xScale = this.getYScale();
            }
            /** @type {?} */
            var colorHelper = new ColorHelper(this.options, this.series);
            this.colorScale = colorHelper.generateColorScale();
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.groupName = [];
                _this.series.map((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    if (item.name)
                        _this.groupName.push({
                            name: item.name,
                            color: _this.colorScale(item.name)
                        });
                }));
                _this.createBar();
                //setTimeout(() => {
                // for (let i=0; i<this.bars.length; i++) {
                //     console.log(this.bars[i].className)
                //     transition(select(this.element)).select('.bar02').transition()
                //         .duration(500)
                //         .attr('width', this.bars[i].width);
                // }
                //},1000)
            }));
            this.cdr.detectChanges();
        };
        /**
         * @return {?}
         */
        ngxChartsStackedComponent.prototype.getXScale = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var spacing;
            /** @type {?} */
            var range;
            if (this.options.barType == 'vertical') {
                spacing = (this.categories.length / (this.options.plotBackground.width / this.options.plotOptions.groupBarPadding));
                range = [0, this.options.plotBackground.width];
            }
            else {
                /** @type {?} */
                var length_1 = this.options.height - this.options.header.height;
                spacing = (this.categories.length / (this.options.plotBackground.height / this.options.plotOptions.groupBarPadding));
                range = [0, this.options.plotBackground.height];
            }
            return d3Scale.scaleBand()
                .range(range)
                .paddingInner(spacing)
                .paddingOuter(0.1)
                .domain(this.categories);
        };
        /**
         * @return {?}
         */
        ngxChartsStackedComponent.prototype.getInnerScale = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var groupDataArr = ['All'];
            // for (let i=0; i<this.series.length; i++) {
            //     groupDataArr.push(this.series[i].name);
            // }
            /** @type {?} */
            var spacing;
            /** @type {?} */
            var range;
            if (this.options.barType == 'vertical') {
                spacing = (this.series.length / (this.xScale.bandwidth() / this.options.plotOptions.innerBarPadding));
                range = this.xScale.bandwidth();
            }
            else {
                spacing = (this.series.length / (this.yScale.bandwidth() / this.options.plotOptions.innerBarPadding));
                range = this.yScale.bandwidth();
            }
            return d3Scale.scaleBand()
                .range([0, range])
                .paddingInner(spacing)
                .domain(groupDataArr);
        };
        /**
         * @return {?}
         */
        ngxChartsStackedComponent.prototype.getYScale = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var uniqueValue = new Set();
            if (this.series.length != 0) {
                for (var i = 0; i < this.series[0].data.length; i++) {
                    /** @type {?} */
                    var sum = 0;
                    for (var j = 0; j < this.series.length; j++) {
                        sum += this.series[j].data[i];
                    }
                    uniqueValue.add(sum);
                }
            }
            // this.series.map((item) => {
            //     item.data.map((value) => {
            //         uniqueValue.add(value);
            //     });
            // });
            /** @type {?} */
            var min = Math.min.apply(Math, __spread(uniqueValue));
            min = min > 0 ? 0 : min;
            /** @type {?} */
            var max = Math.max.apply(Math, __spread([0], uniqueValue));
            max = max > 0 ? max : 0;
            /** @type {?} */
            var range = [];
            if (this.options.barType == 'vertical') {
                /** @type {?} */
                var value = this.options.plotBackground.height;
                // console.log("bar getYScale",value)
                range = [value, 0];
                // console.log("bar getYScale - ", range)
            }
            else {
                /** @type {?} */
                var value = this.options.plotBackground.width - 30;
                range = [0, value];
            }
            // console.log("bar getYScale --- ", range, min, max)
            return d3Scale.scaleLinear()
                .range(range)
                .domain([min, max]);
            //return this.scale.nice().ticks();
        };
        /**
         * @return {?}
         */
        ngxChartsStackedComponent.prototype.calPlotBackground = /**
         * @return {?}
         */
        function () {
            this.options = __assign({}, this.options, { plotBackground: __assign({}, this.options.plotBackground, { x: 0, y: 0, height: this.options.height - this.options.xAxis.height - this.options.header.height - this.options.padding, width: this.options.width - this.options.yAxis.width - this.options.padding }) });
            // console.log("calPlotBackground", JSON.stringify(this.options));
        };
        /**
         * @return {?}
         */
        ngxChartsStackedComponent.prototype.createBar = /**
         * @return {?}
         */
        function () {
            var _this = this;
            //console.log("this.innerScale.bandwidth() "+this.innerScale.bandwidth())
            this.bars = [];
            if (this.options.barType == 'vertical') {
                this.categories.map((/**
                 * @param {?} item
                 * @param {?} index
                 * @return {?}
                 */
                function (item, index) {
                    /** @type {?} */
                    var prevY = 0;
                    for (var i = 0; i < _this.series.length; i++) {
                        /** @type {?} */
                        var bar = {
                            value: item,
                            //jan,feb
                            data: _this.series[i].data[index],
                            //101,202
                            group: _this.series[i].name,
                            color: _this.colorScale(_this.series[i].name),
                            //formattedLabel,
                            width: _this.innerScale.bandwidth(),
                            height: _this.series[i].data[index] > 0 ? (_this.yScale(0) - _this.yScale(_this.series[i].data[index])) : (_this.yScale(_this.series[i].data[index]) - _this.yScale(0)),
                            x: _this.innerScale('All') + _this.xScale(item),
                            //y: prevHeight + ( this.series[i].data[index]>0? this.yScale(this.series[i].data[index]):this.yScale(0) ),
                            className: "vertical_bar"
                        };
                        if (i == 0) {
                            bar['y'] = _this.series[i].data[index] > 0 ? _this.yScale(_this.series[i].data[index]) : _this.yScale(0);
                        }
                        else {
                            bar['y'] = prevY - bar.height;
                        }
                        prevY = bar.y;
                        _this.bars.push(bar);
                    }
                }));
            }
            else {
                this.categories.map((/**
                 * @param {?} item
                 * @param {?} index
                 * @return {?}
                 */
                function (item, index) {
                    /** @type {?} */
                    var prevX = 0;
                    for (var i = 0; i < _this.series.length; i++) {
                        /** @type {?} */
                        var bar = {
                            value: item,
                            //jan,feb
                            data: _this.series[i].data[index],
                            //101,202
                            group: _this.series[i].name,
                            color: _this.colorScale(_this.series[i].name),
                            //formattedLabel,
                            width: _this.series[i].data[index] > 0 ? (_this.xScale(_this.series[i].data[index]) - _this.xScale(0)) : (_this.xScale(0) - _this.xScale(_this.series[i].data[index])),
                            height: _this.innerScale.bandwidth(),
                            // x: this.series[i].data[index]>0? this.xScale(0):this.xScale(this.series[i].data[index]),
                            y: _this.innerScale('All') + _this.yScale(item),
                            className: "horizontal_bar"
                        };
                        if (i == 0) {
                            bar['x'] = _this.series[i].data[index] > 0 ? _this.xScale(0) : _this.xScale(_this.series[i].data[index]);
                        }
                        else {
                            bar['x'] = prevX;
                        }
                        prevX = bar.x + bar.width;
                        _this.bars.push(bar);
                    }
                }));
            }
        };
        /**
         * @param {?} __0
         * @return {?}
         */
        ngxChartsStackedComponent.prototype.yAxisWidthChange = /**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var yAxisWidth = _a.yAxisWidth, yAxisHeight = _a.yAxisHeight, yAxisRightWidth = _a.yAxisRightWidth;
            //console.log("yAxisWidth "+yAxisWidth)
            this.options = __assign({}, this.options, { yAxis: __assign({}, this.options.yAxis, { width: yAxisWidth, height: yAxisHeight }) });
            //console.log( this.options)
            this.update();
        };
        /**
         * @param {?} __0
         * @return {?}
         */
        ngxChartsStackedComponent.prototype.xAxisHeightChange = /**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var xAxisHeight = _a.xAxisHeight;
            this.options = __assign({}, this.options, { xAxis: __assign({}, this.options.xAxis, { height: xAxisHeight }) });
            //console.log("xAxisHeightChange", xAxisHeight, JSON.stringify(this.options.xAxis));
            this.update();
        };
        /**
         * @param {?} __0
         * @return {?}
         */
        ngxChartsStackedComponent.prototype.headerHeightChange = /**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var headerHeight = _a.headerHeight;
            this.options = __assign({}, this.options, { header: __assign({}, this.options.header, { height: headerHeight }) });
            this.update();
        };
        /**
         * @param {?} data
         * @return {?}
         */
        ngxChartsStackedComponent.prototype.toolTipPlaccement = /**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            if (this.options.barType == 'vertical') {
                return data > 0 ? 'top' : 'bottom';
            }
            else {
                return data > 0 ? 'right' : 'left';
            }
        };
        /**
         * @param {?} event
         * @return {?}
         */
        ngxChartsStackedComponent.prototype.onResize = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            var _this = this;
            //console.log("window:resize")
            setTimeout((/**
             * @return {?}
             */
            function () { return _this.update(); }));
        };
        /**
         * @return {?}
         */
        ngxChartsStackedComponent.prototype.getViewBox = /**
         * @return {?}
         */
        function () {
            if (this.options.width > 0 && this.options.height > 0)
                return '0 0 ' + this.options.width + ' ' + this.options.height;
            else
                return '0 0 0 0';
        };
        /**
         * @private
         * @param {?} str
         * @return {?}
         */
        ngxChartsStackedComponent.prototype.strToNumber = /**
         * @private
         * @param {?} str
         * @return {?}
         */
        function (str) {
            /** @type {?} */
            var numberPattern = /\d+/g;
            /** @type {?} */
            var num = str.match(numberPattern).join('');
            return parseFloat(num);
        };
        ngxChartsStackedComponent.decorators = [
            { type: core.Component, args: [{
                        selector: "ngx-charts-stacked",
                        template: "<div [style.width]=\"options.width+'px'\" [style.border]=\"'1px solid #f3f3f3'\">\r\n\r\n    <svg version=\"1.1\" class=\"highcharts-root\" [attr.padding]=\"options.padding\" [attr.width]=\"options.width\"\r\n        [attr.height]=\"options.height\" [attr.viewBox]=\"getViewBox()\"\r\n        aria-label=\"Interactive chart\" [style.border]=\"'0px solid gray'\" [style.padding]=\"options.padding\"\r\n        aria-hidden=\"false\">\r\n\r\n        <g header [options]=\"options\" (headerHeightChange)=\"headerHeightChange($event)\"></g>\r\n\r\n        <g y-axis \r\n            [xScale]=\"xScale\" \r\n            [yScale]=\"yScale\" \r\n            [options]=\"options\" \r\n            [categories]=\"categories\" \r\n            [series]=\"series\"\r\n            (yAxisWidthChange)=\"yAxisWidthChange($event)\"></g>\r\n\r\n        <g x-axis \r\n            [xScale]=\"xScale\" \r\n            [yScale]=\"yScale\" \r\n            [options]=\"options\" \r\n            [categories]=\"categories\" \r\n            [series]=\"series\"\r\n            (xAxisHeightChange)=\"xAxisHeightChange($event)\"></g>\r\n\r\n        <g data-z-index=\"0.1\" >\r\n            <rect *ngFor=\"let bar of bars\" \r\n                [attr.class]=\"bar.className\"\r\n                [attr.x]=\"bar.x+this.options.yAxis.width\"\r\n                [tooltip]=\"bar.value+', '+bar.group+', '+bar.data\" \r\n                [placement]=\"toolTipPlaccement(bar.data)\" \r\n                delay=\"10\"\r\n                [attr.y]=\"bar.y+this.options.header.height\" \r\n                [attr.width]=\"bar.width\" [attr.height]=\"bar.height\"\r\n                [attr.fill]=\"bar.color\" opacity=\"1\"  tabindex=\"-1\" role=\"img\"\r\n                aria-label=\"1. Jan, 49.9. Tokyo.\"></rect>\r\n        </g>\r\n    </svg>\r\n    <chart-legend\r\n        *ngIf=\"groupName.length\"\r\n        [groupName]=\"groupName\"\r\n        [options]=\"options\"\r\n        [series] = \"series\"    \r\n    >\r\n    </chart-legend>\r\n  \r\n</div>\r\n\r\n",
                        // changeDetection: ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        styles: [".tooltip-example{text-align:center;padding:0 50px}.tooltip-example [tooltip]{display:inline-block;margin:50px 20px;width:180px;height:50px;border:1px solid gray;border-radius:5px;line-height:50px;text-align:center}.ng-tooltip{position:absolute;max-width:150px;font-size:14px;text-align:center;color:#fafae3;padding:3px 8px;background:#282a36;border-radius:4px;z-index:1000;opacity:0}.ng-tooltip:after{content:\"\";position:absolute;border-style:solid}.ng-tooltip-top:after{top:100%;left:50%;margin-left:-5px;border-width:5px;border-color:#000 transparent transparent}.ng-tooltip-bottom:after{bottom:100%;left:50%;margin-left:-5px;border-width:5px;border-color:transparent transparent #000}.ng-tooltip-left:after{top:50%;left:100%;margin-top:-5px;border-width:5px;border-color:transparent transparent transparent #000}.ng-tooltip-right:after{top:50%;right:100%;margin-top:-5px;border-width:5px;border-color:transparent #000 transparent transparent}.ng-tooltip-show{opacity:1}.horizontal_bar{-webkit-animation:1s linear forwards horizontal_bar_frames;animation:1s linear forwards horizontal_bar_frames}@-webkit-keyframes horizontal_bar_frames{from{width:0}}@keyframes horizontal_bar_frames{from{width:0}}.vertical_bar{-webkit-animation:1s linear forwards vertical_bar_frames;animation:1s linear forwards vertical_bar_frames}@-webkit-keyframes vertical_bar_frames{from{height:0}}@keyframes vertical_bar_frames{from{height:0}}"]
                    }] }
        ];
        /** @nocollapse */
        ngxChartsStackedComponent.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.ElementRef },
            { type: core.ChangeDetectorRef }
        ]; };
        ngxChartsStackedComponent.propDecorators = {
            options: [{ type: core.Input }],
            categories: [{ type: core.Input }],
            series: [{ type: core.Input }],
            onResize: [{ type: core.HostListener, args: ['window:resize', ['$event'],] }]
        };
        return ngxChartsStackedComponent;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        ngxChartsStackedComponent.prototype.customOptions;
        /**
         * @type {?}
         * @private
         */
        ngxChartsStackedComponent.prototype._options;
        /**
         * @type {?}
         * @private
         */
        ngxChartsStackedComponent.prototype._series;
        /** @type {?} */
        ngxChartsStackedComponent.prototype.categories;
        /** @type {?} */
        ngxChartsStackedComponent.prototype.element;
        /** @type {?} */
        ngxChartsStackedComponent.prototype.xScale;
        /** @type {?} */
        ngxChartsStackedComponent.prototype.innerScale;
        /** @type {?} */
        ngxChartsStackedComponent.prototype.yScale;
        /** @type {?} */
        ngxChartsStackedComponent.prototype.bars;
        /** @type {?} */
        ngxChartsStackedComponent.prototype.groupName;
        /** @type {?} */
        ngxChartsStackedComponent.prototype.groupBarPaddingBK;
        /** @type {?} */
        ngxChartsStackedComponent.prototype.innerBarPaddingBK;
        /** @type {?} */
        ngxChartsStackedComponent.prototype.colorScale;
        /** @type {?} */
        ngxChartsStackedComponent.prototype.trimLabel;
        /**
         * @type {?}
         * @private
         */
        ngxChartsStackedComponent.prototype.chartElement;
        /**
         * @type {?}
         * @private
         */
        ngxChartsStackedComponent.prototype.cdr;
        /* Skipping unhandled member: ;*/
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ngxChartsStackedModule = /** @class */ (function () {
        function ngxChartsStackedModule() {
        }
        ngxChartsStackedModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [ngxChartsStackedComponent],
                        imports: [common.CommonModule, AxesModule, HeaderModule, LegendModule, TooltipModule],
                        exports: [ngxChartsStackedComponent],
                        providers: [],
                    },] }
        ];
        return ngxChartsStackedModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ngxChartsLineComponent = /** @class */ (function () {
        function ngxChartsLineComponent(chartElement, cdr) {
            this.chartElement = chartElement;
            this.cdr = cdr;
            this.customOptions = {
                barType: 'vertical',
                title: '',
                subtitle: '',
                height: 0,
                width: 0,
                padding: 5,
                xAxis: {
                    title: '',
                    height: 0,
                    labelRotation: 0,
                    labelAlign: 'left',
                    labelEllipsis: false,
                    labelEllipsisSize: 16
                },
                yAxis: {
                    title: '',
                    width: 0,
                    height: 0,
                    labelRotation: 0,
                    labelEllipsis: false,
                    labelEllipsisSize: 16
                },
                legend: {
                    labelEllipsis: false,
                    labelEllipsisSize: 16
                },
                plotBackground: {
                    x: 0,
                    y: 0,
                    height: 0,
                    width: 0
                },
                plotOptions: {
                    groupBarPadding: 20,
                    innerBarPadding: 3
                },
                header: {
                    height: 0,
                    width: 0
                }
            };
            this._options = {};
            this.categories = [];
            this.series = [];
            this.lines = [];
            this.lineCircle = [];
            this.groupName = [];
        }
        Object.defineProperty(ngxChartsLineComponent.prototype, "options", {
            get: /**
             * @return {?}
             */
            function () {
                return this._options;
            },
            set: /**
             * @param {?} obj
             * @return {?}
             */
            function (obj) {
                /** @type {?} */
                var xAxis = obj.xAxis;
                xAxis['labelEllipsis'] = (obj.xAxis.labelEllipsisSize != undefined && obj.xAxis.labelEllipsisSize > 0) ? true : false;
                /** @type {?} */
                var yAxis = obj.yAxis;
                yAxis['labelEllipsis'] = (obj.yAxis.labelEllipsisSize != undefined && obj.yAxis.labelEllipsisSize > 0) ? true : false;
                /** @type {?} */
                var legend = obj.legend;
                legend['labelEllipsis'] = (obj.legend.labelEllipsisSize != undefined && obj.legend.labelEllipsisSize > 0) ? true : false;
                /** @type {?} */
                var plotBackground = obj.plotBackground;
                /** @type {?} */
                var plotOptions = obj.plotOptions;
                /** @type {?} */
                var header = obj.header;
                delete obj['xAxis'];
                delete obj['yAxis'];
                delete obj['legend'];
                delete obj['plotBackground'];
                delete obj['plotOptions'];
                delete obj['header'];
                this._options = __assign({}, this.customOptions, obj, { xAxis: __assign({}, this.customOptions.xAxis, xAxis), yAxis: __assign({}, this.customOptions.yAxis, yAxis), legend: __assign({}, this.customOptions.legend, legend), plotBackground: __assign({}, this.customOptions.plotBackground, plotBackground), plotOptions: __assign({}, this.customOptions.plotOptions, plotOptions), header: __assign({}, this.customOptions.header, header) });
                this._options['barType'] = 'vertical';
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} changes
         * @return {?}
         */
        ngxChartsLineComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var _this = this;
            this.groupBarPaddingBK = this.options.plotOptions.groupBarPadding;
            this.innerBarPaddingBK = this.options.plotOptions.innerBarPadding;
            setTimeout((/**
             * @return {?}
             */
            function () { return _this.update(); }));
        };
        /**
         * @return {?}
         */
        ngxChartsLineComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.options.width = this.options.width;
            this.options.height = this.options.height;
            this.update();
        };
        /**
         * @return {?}
         */
        ngxChartsLineComponent.prototype.update = /**
         * @return {?}
         */
        function () {
            var _this = this;
            // console.log("ttttttt",this.options)
            /** @type {?} */
            var hostElem = this.chartElement.nativeElement;
            /** @type {?} */
            var dims = hostElem.parentNode !== null ? hostElem.parentNode.getBoundingClientRect() : { height: 400, width: 800 };
            /** @type {?} */
            var style = hostElem.parentNode.currentStyle || window.getComputedStyle(hostElem.parentNode);
            this.options.height = !this.options.height ? dims.height - this.strToNumber(style.paddingLeft) - this.strToNumber(style.paddingRight) : this.options.height;
            this.options.width = !this.options.width ? dims.width - this.strToNumber(style.paddingLeft) - this.strToNumber(style.paddingRight) : dims.width - this.strToNumber(style.paddingLeft) - this.strToNumber(style.paddingRight);
            this.calPlotBackground();
            /** @type {?} */
            var countFlag = false;
            this.options.plotOptions.groupBarPadding = this.groupBarPaddingBK;
            this.options.plotOptions.innerBarPadding = this.innerBarPaddingBK;
            do {
                if (countFlag == true) {
                    this.options.plotOptions.groupBarPadding--;
                    this.options.plotOptions.innerBarPadding = 2;
                }
                if (this.options.barType == 'vertical') {
                    this.xScale = this.getXScale();
                }
                else {
                    this.yScale = this.getXScale();
                }
                this.innerScale = this.getInnerScale();
                countFlag = true;
            } while (this.innerScale.bandwidth() < 2);
            // 
            if (this.options.barType == 'vertical') {
                this.yScale = this.getYScale();
            }
            else {
                this.xScale = this.getYScale();
            }
            /** @type {?} */
            var colorHelper = new ColorHelper(this.options, this.series);
            this.colorScale = colorHelper.generateColorScale();
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.groupName = [];
                _this.series.map((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    if (item.name)
                        _this.groupName.push({
                            name: item.name,
                            color: _this.colorScale(item.name)
                        });
                }));
                _this.createLine();
            }));
            this.cdr.detectChanges();
        };
        /**
         * @return {?}
         */
        ngxChartsLineComponent.prototype.getXScale = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var spacing;
            /** @type {?} */
            var range;
            if (this.options.barType == 'vertical') {
                spacing = (this.categories.length / (this.options.plotBackground.width / this.options.plotOptions.groupBarPadding));
                range = [0, this.options.plotBackground.width];
            }
            else {
                /** @type {?} */
                var length_1 = this.options.height - this.options.header.height;
                spacing = (this.categories.length / (this.options.plotBackground.height / this.options.plotOptions.groupBarPadding));
                range = [0, this.options.plotBackground.height];
            }
            return d3Scale.scaleBand()
                .range(range)
                .paddingInner(spacing)
                .paddingOuter(0.1)
                .domain(this.categories);
        };
        /**
         * @return {?}
         */
        ngxChartsLineComponent.prototype.getInnerScale = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var groupDataArr = [];
            for (var i = 0; i < this.series.length; i++) {
                groupDataArr.push(this.series[i].name);
            }
            /** @type {?} */
            var spacing;
            /** @type {?} */
            var range;
            if (this.options.barType == 'vertical') {
                spacing = (this.series.length / (this.xScale.bandwidth() / this.options.plotOptions.innerBarPadding));
                range = this.xScale.bandwidth();
            }
            else {
                spacing = (this.series.length / (this.yScale.bandwidth() / this.options.plotOptions.innerBarPadding));
                range = this.yScale.bandwidth();
            }
            return d3Scale.scaleBand()
                .range([0, range])
                .paddingInner(spacing)
                .domain(groupDataArr);
        };
        /**
         * @return {?}
         */
        ngxChartsLineComponent.prototype.getYScale = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var uniqueValue = new Set();
            this.series.map((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                item.data.map((/**
                 * @param {?} value
                 * @return {?}
                 */
                function (value) {
                    uniqueValue.add(value);
                }));
            }));
            /** @type {?} */
            var min = Math.min.apply(Math, __spread(uniqueValue));
            min = min > 0 ? 0 : min;
            /** @type {?} */
            var max = Math.max.apply(Math, __spread([0], uniqueValue));
            max = max > 0 ? max : 0;
            /** @type {?} */
            var range = [];
            if (this.options.barType == 'vertical') {
                /** @type {?} */
                var value = this.options.plotBackground.height;
                // console.log("bar getYScale",value)
                range = [value, 0];
                // console.log("bar getYScale - ", range)
            }
            else {
                /** @type {?} */
                var value = this.options.plotBackground.width - 30;
                range = [0, value];
            }
            // console.log("bar getYScale --- ", range, min, max)
            return d3Scale.scaleLinear()
                .range(range)
                .domain([min, max]);
            //return this.scale.nice().ticks();
        };
        /**
         * @return {?}
         */
        ngxChartsLineComponent.prototype.calPlotBackground = /**
         * @return {?}
         */
        function () {
            this.options = __assign({}, this.options, { plotBackground: __assign({}, this.options.plotBackground, { x: 0, y: 0, height: this.options.height - this.options.xAxis.height - this.options.header.height - this.options.padding, width: this.options.width - this.options.yAxis.width - this.options.padding }) });
            // console.log("calPlotBackground", JSON.stringify(this.options));
        };
        /**
         * @return {?}
         */
        ngxChartsLineComponent.prototype.createLine = /**
         * @return {?}
         */
        function () {
            //console.log("this.innerScale.bandwidth() "+this.innerScale.bandwidth())
            this.lines = [];
            this.lineCircle = [];
            for (var i = 0; i < this.series.length; i++) {
                /** @type {?} */
                var line = { points: "", color: "" };
                for (var j = 0; j < this.categories.length; j++) {
                    /** @type {?} */
                    var x = this.xScale(this.categories[j]) + (this.xScale.bandwidth() / 2) + this.options.yAxis.width;
                    /** @type {?} */
                    var y = this.yScale(this.series[i].data[j]) + this.options.header.height;
                    line.points += (x + "," + y + " ");
                    line.color = this.colorScale(this.series[i].name);
                    this.lineCircle.push({
                        x: x,
                        y: y,
                        color: this.colorScale(this.series[i].name),
                        value: this.categories[j],
                        //jan,feb
                        data: this.series[i].data[j],
                        //101,202
                        group: this.series[i].name
                    });
                }
                this.lines.push(line);
            }
            // console.log(this.lineCircle);
        };
        /**
         * @param {?} __0
         * @return {?}
         */
        ngxChartsLineComponent.prototype.yAxisWidthChange = /**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var yAxisWidth = _a.yAxisWidth, yAxisHeight = _a.yAxisHeight;
            //console.log("yAxisWidth "+yAxisWidth)
            this.options = __assign({}, this.options, { yAxis: __assign({}, this.options.yAxis, { width: yAxisWidth, height: yAxisHeight }) });
            //console.log( this.options)
            this.update();
        };
        /**
         * @param {?} __0
         * @return {?}
         */
        ngxChartsLineComponent.prototype.xAxisHeightChange = /**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var xAxisHeight = _a.xAxisHeight;
            this.options = __assign({}, this.options, { xAxis: __assign({}, this.options.xAxis, { height: xAxisHeight }) });
            //console.log("xAxisHeightChange", xAxisHeight, JSON.stringify(this.options.xAxis));
            this.update();
        };
        /**
         * @param {?} __0
         * @return {?}
         */
        ngxChartsLineComponent.prototype.headerHeightChange = /**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var headerHeight = _a.headerHeight;
            this.options = __assign({}, this.options, { header: __assign({}, this.options.header, { height: headerHeight }) });
            this.update();
        };
        /**
         * @param {?} data
         * @return {?}
         */
        ngxChartsLineComponent.prototype.toolTipPlaccement = /**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            if (this.options.barType == 'vertical') {
                return data > 0 ? 'top' : 'bottom';
            }
            else {
                return data > 0 ? 'right' : 'left';
            }
        };
        /**
         * @param {?} event
         * @return {?}
         */
        ngxChartsLineComponent.prototype.onResize = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            var _this = this;
            //console.log("window:resize")
            setTimeout((/**
             * @return {?}
             */
            function () { return _this.update(); }));
        };
        /**
         * @private
         * @param {?} str
         * @return {?}
         */
        ngxChartsLineComponent.prototype.strToNumber = /**
         * @private
         * @param {?} str
         * @return {?}
         */
        function (str) {
            /** @type {?} */
            var numberPattern = /\d+/g;
            /** @type {?} */
            var num = str.match(numberPattern).join('');
            return parseFloat(num);
        };
        ngxChartsLineComponent.decorators = [
            { type: core.Component, args: [{
                        selector: "ngx-charts-line",
                        template: "<div [style.width]=\"options.width+'px'\" [style.border]=\"'1px solid #f3f3f3'\">\r\n    \r\n    <svg version=\"1.1\" class=\"highcharts-root\" [attr.padding]=\"options.padding\" [attr.width]=\"options.width\"\r\n        [attr.height]=\"options.height\" [attr.viewBox]=\"'0 0 '+options.width +' '+ options.height\"\r\n        aria-label=\"Interactive chart\" [style.border]=\"'0px solid gray'\" [style.padding]=\"options.padding\"\r\n        aria-hidden=\"false\">\r\n\r\n        <g header [options]=\"options\" (headerHeightChange)=\"headerHeightChange($event)\"></g>\r\n\r\n        <g y-axis \r\n            [xScale]=\"xScale\" \r\n            [yScale]=\"yScale\" \r\n            [options]=\"options\" \r\n            [categories]=\"categories\" \r\n            [series]=\"series\"\r\n            (yAxisWidthChange)=\"yAxisWidthChange($event)\"></g>\r\n\r\n        <g x-axis \r\n            [xScale]=\"xScale\" \r\n            [yScale]=\"yScale\" \r\n            [options]=\"options\" \r\n            [categories]=\"categories\" \r\n            [series]=\"series\"\r\n            (xAxisHeightChange)=\"xAxisHeightChange($event)\"></g>\r\n\r\n        <g data-z-index=\"0.1\">\r\n            <polyline  \r\n                class=\"line\"\r\n                *ngFor=\"let line of lines\" \r\n                [attr.points]=\"line.points\"\r\n                [style.fill]=\"'none'\"\r\n                [style.stroke]=\"line.color\"\r\n                [style.stroke-width]=\"3\" >\r\n            </polyline>\r\n            <circle \r\n                *ngFor=\"let lc of lineCircle\"\r\n                [tooltip]=\"lc.value+', '+lc.group+', '+lc.data\" \r\n                [placement]=\"toolTipPlaccement(lc.data)\" \r\n                [attr.cx]=\"lc.x\" \r\n                [attr.cy]=\"lc.y\" \r\n                [attr.r]=\"3\" \r\n                [attr.stroke]=\"lc.color\" \r\n                [attr.stroke-width]=\"3\" \r\n                [attr.fill]=\"lc.color\">\r\n            </circle>\r\n        </g>\r\n\r\n    </svg>\r\n    <chart-legend\r\n        *ngIf=\"groupName.length\"\r\n        [groupName]=\"groupName\"\r\n        [options]=\"options\"\r\n        [series] = \"series\"    \r\n    >\r\n    </chart-legend>\r\n  \r\n</div>\r\n\r\n",
                        // changeDetection: ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        styles: [".tooltip-example{text-align:center;padding:0 50px}.tooltip-example [tooltip]{display:inline-block;margin:50px 20px;width:180px;height:50px;border:1px solid gray;border-radius:5px;line-height:50px;text-align:center}.ng-tooltip{position:absolute;max-width:150px;font-size:14px;text-align:center;color:#fafae3;padding:3px 8px;background:#282a36;border-radius:4px;z-index:1000;opacity:0}.ng-tooltip:after{content:\"\";position:absolute;border-style:solid}.ng-tooltip-top:after{top:100%;left:50%;margin-left:-5px;border-width:5px;border-color:#000 transparent transparent}.ng-tooltip-bottom:after{bottom:100%;left:50%;margin-left:-5px;border-width:5px;border-color:transparent transparent #000}.ng-tooltip-left:after{top:50%;left:100%;margin-top:-5px;border-width:5px;border-color:transparent transparent transparent #000}.ng-tooltip-right:after{top:50%;right:100%;margin-top:-5px;border-width:5px;border-color:transparent #000 transparent transparent}.ng-tooltip-show{opacity:1}.line{stroke-dasharray:2000;stroke-dashoffset:2000;-webkit-animation:2s linear forwards line_frames;animation:2s linear forwards line_frames}@-webkit-keyframes line_frames{to{stroke-dashoffset:0}}@keyframes line_frames{to{stroke-dashoffset:0}}"]
                    }] }
        ];
        /** @nocollapse */
        ngxChartsLineComponent.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.ChangeDetectorRef }
        ]; };
        ngxChartsLineComponent.propDecorators = {
            options: [{ type: core.Input }],
            categories: [{ type: core.Input }],
            series: [{ type: core.Input }],
            onResize: [{ type: core.HostListener, args: ['window:resize', ['$event'],] }]
        };
        return ngxChartsLineComponent;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        ngxChartsLineComponent.prototype.customOptions;
        /**
         * @type {?}
         * @private
         */
        ngxChartsLineComponent.prototype._options;
        /** @type {?} */
        ngxChartsLineComponent.prototype.categories;
        /** @type {?} */
        ngxChartsLineComponent.prototype.series;
        /** @type {?} */
        ngxChartsLineComponent.prototype.xScale;
        /** @type {?} */
        ngxChartsLineComponent.prototype.innerScale;
        /** @type {?} */
        ngxChartsLineComponent.prototype.yScale;
        /** @type {?} */
        ngxChartsLineComponent.prototype.lines;
        /** @type {?} */
        ngxChartsLineComponent.prototype.lineCircle;
        /** @type {?} */
        ngxChartsLineComponent.prototype.groupName;
        /** @type {?} */
        ngxChartsLineComponent.prototype.groupBarPaddingBK;
        /** @type {?} */
        ngxChartsLineComponent.prototype.innerBarPaddingBK;
        /** @type {?} */
        ngxChartsLineComponent.prototype.colorScale;
        /**
         * @type {?}
         * @private
         */
        ngxChartsLineComponent.prototype.chartElement;
        /**
         * @type {?}
         * @private
         */
        ngxChartsLineComponent.prototype.cdr;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ngxChartsLineModule = /** @class */ (function () {
        function ngxChartsLineModule() {
        }
        ngxChartsLineModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [ngxChartsLineComponent],
                        imports: [common.CommonModule, AxesModule, HeaderModule, LegendModule, TooltipModule],
                        exports: [ngxChartsLineComponent],
                        providers: [],
                    },] }
        ];
        return ngxChartsLineModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ngxChartsPieComponent = /** @class */ (function () {
        function ngxChartsPieComponent(chartElement, cdr) {
            this.chartElement = chartElement;
            this.cdr = cdr;
            this.customOptions = {
                barType: 'vertical',
                title: '',
                subtitle: '',
                height: 0,
                width: 0,
                padding: 5,
                xAxis: {
                    title: '',
                    height: 0,
                    labelRotation: 0,
                    labelAlign: 'left',
                    labelEllipsis: false,
                    labelEllipsisSize: 16
                },
                yAxis: {
                    title: '',
                    width: 0,
                    height: 0,
                    labelRotation: 0,
                    labelEllipsis: false,
                    labelEllipsisSize: 16
                },
                plotBackground: {
                    x: 0,
                    y: 0,
                    height: 0,
                    width: 0
                },
                legend: {
                    labelEllipsis: false,
                    labelEllipsisSize: 16
                },
                plotOptions: {
                    outerRadius: 80,
                    innerRadius: 0,
                    labelEllipsis: false,
                    labelEllipsisSize: 16
                },
                header: {
                    height: 0,
                    width: 0
                }
            };
            this._options = {};
            this.categories = [];
            this.series = [];
            this.pies = [];
            this.lineCircle = [];
            this.groupName = [];
            this.translation = "";
            this.trimLabel = trimLabel;
        }
        Object.defineProperty(ngxChartsPieComponent.prototype, "options", {
            get: /**
             * @return {?}
             */
            function () {
                return this._options;
            },
            set: /**
             * @param {?} obj
             * @return {?}
             */
            function (obj) {
                /** @type {?} */
                var xAxis = obj.xAxis;
                /** @type {?} */
                var yAxis = obj.yAxis;
                /** @type {?} */
                var legend = obj.legend;
                legend['labelEllipsis'] = (obj.legend.labelEllipsisSize != undefined && obj.legend.labelEllipsisSize > 0) ? true : false;
                /** @type {?} */
                var plotBackground = obj.plotBackground;
                /** @type {?} */
                var plotOptions = obj.plotOptions;
                plotOptions['labelEllipsis'] = (obj.plotOptions.labelEllipsisSize != undefined && obj.plotOptions.labelEllipsisSize > 0) ? true : false;
                /** @type {?} */
                var header = obj.header;
                delete obj['xAxis'];
                delete obj['yAxis'];
                delete obj['legend'];
                delete obj['plotBackground'];
                delete obj['plotOptions'];
                delete obj['header'];
                this._options = __assign({}, this.customOptions, obj, { xAxis: __assign({}, this.customOptions.xAxis, xAxis), yAxis: __assign({}, this.customOptions.yAxis, yAxis), legend: __assign({}, this.customOptions.legend, legend), plotBackground: __assign({}, this.customOptions.plotBackground, plotBackground), plotOptions: __assign({}, this.customOptions.plotOptions, plotOptions), header: __assign({}, this.customOptions.header, header) });
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} changes
         * @return {?}
         */
        ngxChartsPieComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var _this = this;
            // this.groupBarPaddingBK=this.options.plotOptions.groupBarPadding;
            // this.innerBarPaddingBK=this.options.plotOptions.innerBarPadding;
            setTimeout((/**
             * @return {?}
             */
            function () { return _this.update(); }));
        };
        /**
         * @return {?}
         */
        ngxChartsPieComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.options.width = this.options.width;
            this.options.height = this.options.height;
            this.update();
        };
        /**
         * @return {?}
         */
        ngxChartsPieComponent.prototype.update = /**
         * @return {?}
         */
        function () {
            var _this = this;
            // console.log("ttttttt",this.options)
            /** @type {?} */
            var hostElem = this.chartElement.nativeElement;
            /** @type {?} */
            var dims = hostElem.parentNode !== null ? hostElem.parentNode.getBoundingClientRect() : { height: 400, width: 800 };
            /** @type {?} */
            var style = hostElem.parentNode.currentStyle || window.getComputedStyle(hostElem.parentNode);
            this.options.height = !this.options.height ? dims.height - this.strToNumber(style.paddingLeft) - this.strToNumber(style.paddingRight) : this.options.height;
            this.options.width = !this.options.width ? dims.width - this.strToNumber(style.paddingLeft) - this.strToNumber(style.paddingRight) : dims.width - this.strToNumber(style.paddingLeft) - this.strToNumber(style.paddingRight);
            this.calPlotBackground();
            /** @type {?} */
            var xOffset = this.options.width / 2;
            /** @type {?} */
            var yOffset = this.options.header.height + (this.options.plotBackground.height / 2);
            this.translation = "translate(" + xOffset + ", " + yOffset + ")";
            this.calcArc = this.calculateArc();
            this.pieGenerator = this.pieGeneratorFunc();
            // console.log(this.pieGenerator)
            // let countFlag=false;
            // this.options.plotOptions.groupBarPadding=this.groupBarPaddingBK;
            // this.options.plotOptions.innerBarPadding=this.innerBarPaddingBK;
            // do {
            //     if (countFlag==true) {
            //         this.options.plotOptions.groupBarPadding--;
            //         this.options.plotOptions.innerBarPadding = 2;
            //     }
            //     if (this.options.barType=='vertical') {
            //         this.xScale=this.getXScale();
            //     }
            //     else { 
            //         this.yScale=this.getXScale();
            //     }
            //     this.innerScale=this.getInnerScale();
            //     countFlag=true;
            // } while (this.innerScale.bandwidth()<2);
            // 
            // if (this.options.barType=='vertical') {
            //     this.yScale=this.getYScale();
            // }
            // else { 
            //     this.xScale=this.getYScale();
            // }
            /** @type {?} */
            var colorHelper = new ColorHelper(this.options, this.series);
            this.colorScale = colorHelper.generateColorScale();
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.groupName = [];
                _this.series.map((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    if (item.name) {
                        _this.groupName.push({
                            name: item.name,
                            color: _this.colorScale(item.name)
                        });
                    }
                }));
                _this.createPie();
            }));
            this.cdr.detectChanges();
        };
        /**
         * @return {?}
         */
        ngxChartsPieComponent.prototype.pieGeneratorFunc = /**
         * @return {?}
         */
        function () {
            return d3Shape.pie()
                .value((/**
             * @param {?} d
             * @return {?}
             */
            function (d) { return d.data; }))
                .sort(null)(this.series);
        };
        /**
         * @return {?}
         */
        ngxChartsPieComponent.prototype.calculateArc = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var outerRadius = this.options.plotOptions.outerRadius;
            /** @type {?} */
            var innerRadius = this.options.plotOptions.innerRadius;
            /** @type {?} */
            var cornerRadius = 0;
            return d3Shape.arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius)
                .cornerRadius(cornerRadius);
        };
        /**
         * @return {?}
         */
        ngxChartsPieComponent.prototype.outerArc = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var factor = 1.2;
            /** @type {?} */
            var outerRadius = this.options.plotOptions.outerRadius;
            return d3Shape.arc()
                .innerRadius(outerRadius * factor)
                .outerRadius(outerRadius * factor);
        };
        /**
         * @return {?}
         */
        ngxChartsPieComponent.prototype.calPlotBackground = /**
         * @return {?}
         */
        function () {
            this.options = __assign({}, this.options, { plotBackground: __assign({}, this.options.plotBackground, { x: 0, y: 0, height: this.options.height - this.options.xAxis.height - this.options.header.height - this.options.padding, width: this.options.width - this.options.yAxis.width - this.options.padding }) });
            // console.log("calPlotBackground", JSON.stringify(this.options));
        };
        /**
         * @return {?}
         */
        ngxChartsPieComponent.prototype.createPie = /**
         * @return {?}
         */
        function () {
            //console.log("this.innerScale.bandwidth() "+this.innerScale.bandwidth())
            this.pies = [];
            for (var i = 0; i < this.pieGenerator.length; i++) {
                /** @type {?} */
                var factor = 1.2;
                /** @type {?} */
                var tempObj = {
                    path: this.calcArc.startAngle(this.pieGenerator[i].startAngle).endAngle(this.pieGenerator[i].endAngle)(),
                    color: this.colorScale(this.pieGenerator[i].data.name),
                    data: this.pieGenerator[i].data,
                    pos: this.outerArc().centroid(this.pieGenerator[i]),
                    labelPath: "",
                    textAnchor: this.midAngle(this.pieGenerator[i]) < Math.PI ? 'start' : 'end'
                };
                tempObj["pos"][0] = factor * this.options.plotOptions.outerRadius * (this.midAngle(this.pieGenerator[i]) < Math.PI ? 1 : -1);
                //create a line path
                /** @type {?} */
                var innerPos = this.calcArc.centroid(this.pieGenerator[i]);
                /** @type {?} */
                var scale = tempObj["pos"][1] / innerPos[1];
                if (tempObj["pos"][1] === 0 || innerPos[1] === 0) {
                    scale = 1;
                }
                /** @type {?} */
                var outerPos = [scale * innerPos[0], scale * innerPos[1]];
                tempObj.labelPath = "M" + innerPos + "L" + outerPos + "L" + tempObj["pos"];
                this.pies.push(tempObj);
            }
            // console.log("all pies : ", this.pies);
        };
        /**
         * @param {?} d
         * @return {?}
         */
        ngxChartsPieComponent.prototype.midAngle = /**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return d.startAngle + (d.endAngle - d.startAngle) / 2;
        };
        /**
         * @param {?} __0
         * @return {?}
         */
        ngxChartsPieComponent.prototype.yAxisWidthChange = /**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var yAxisWidth = _a.yAxisWidth, yAxisHeight = _a.yAxisHeight;
            //console.log("yAxisWidth "+yAxisWidth)
            this.options = __assign({}, this.options, { yAxis: __assign({}, this.options.yAxis, { width: yAxisWidth, height: yAxisHeight }) });
            //console.log( this.options)
            this.update();
        };
        /**
         * @param {?} __0
         * @return {?}
         */
        ngxChartsPieComponent.prototype.xAxisHeightChange = /**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var xAxisHeight = _a.xAxisHeight;
            this.options = __assign({}, this.options, { xAxis: __assign({}, this.options.xAxis, { height: xAxisHeight }) });
            //console.log("xAxisHeightChange", xAxisHeight, JSON.stringify(this.options.xAxis));
            this.update();
        };
        /**
         * @param {?} __0
         * @return {?}
         */
        ngxChartsPieComponent.prototype.headerHeightChange = /**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var headerHeight = _a.headerHeight;
            this.options = __assign({}, this.options, { header: __assign({}, this.options.header, { height: headerHeight }) });
            this.update();
        };
        /**
         * @param {?} data
         * @return {?}
         */
        ngxChartsPieComponent.prototype.toolTipPlaccement = /**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            if (this.options.barType == 'vertical') {
                return data > 0 ? 'top' : 'bottom';
            }
            else {
                return data > 0 ? 'right' : 'left';
            }
        };
        /**
         * @param {?} event
         * @return {?}
         */
        ngxChartsPieComponent.prototype.onResize = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            var _this = this;
            setTimeout((/**
             * @return {?}
             */
            function () { return _this.update(); }));
        };
        /**
         * @private
         * @param {?} str
         * @return {?}
         */
        ngxChartsPieComponent.prototype.strToNumber = /**
         * @private
         * @param {?} str
         * @return {?}
         */
        function (str) {
            /** @type {?} */
            var numberPattern = /\d+/g;
            /** @type {?} */
            var num = str.match(numberPattern).join('');
            return parseFloat(num);
        };
        ngxChartsPieComponent.decorators = [
            { type: core.Component, args: [{
                        selector: "ngx-charts-pie",
                        template: "<div [style.width]=\"options.width+'px'\" [style.border]=\"'1px solid #f3f3f3'\">\r\n\r\n    <svg version=\"1.1\" class=\"highcharts-root\" [attr.padding]=\"options.padding\" [attr.width]=\"options.width\"\r\n        [attr.height]=\"options.height\" [attr.viewBox]=\"'0 0 '+options.width +' '+ options.height\"\r\n        aria-label=\"Interactive chart\" [style.border]=\"'0px solid gray'\" [style.padding]=\"options.padding\"\r\n        aria-hidden=\"false\"  >\r\n\r\n        <g header [options]=\"options\" (headerHeightChange)=\"headerHeightChange($event)\"></g>\r\n        <g  \r\n            [attr.transform]=\"translation\" \r\n            *ngFor=\"let pie of pies\" >\r\n            <path  \r\n                class=\"pieSlice\"\r\n                [attr.d]=\"pie.path\"\r\n                [style.fill]=\"pie.color\"\r\n                [tooltip]=\"pie.data.name+', '+pie.data.data\" \r\n                [placement]=\"toolTipPlaccement(pie.data.data)\" \r\n            ></path>\r\n\r\n            <!--label path  -->\r\n            <path  \r\n                class=\"pie\"\r\n                [attr.d]=\"pie.labelPath\"\r\n                [style.stroke]=\"pie.color\"\r\n                fill=\"none\"\r\n            ></path>\r\n\r\n            <text\r\n                [attr.x]=\"pie.pos[0]\" \r\n                [attr.y]=\"pie.pos[1]\"\r\n                [style.textAnchor]=\"pie.textAnchor\"\r\n                [style.shapeRendering]=\"'crispEdges'\"\r\n            >\r\n                {{   options.plotOptions.labelEllipsis ? trimLabel(pie.data.name, options.plotOptions.labelEllipsisSize) :  pie.data.name}}\r\n            </text>\r\n\r\n        </g>\r\n    </svg>\r\n    <chart-legend\r\n        *ngIf=\"groupName.length\"\r\n        [groupName]=\"groupName\"\r\n        [options]=\"options\"\r\n        [series] = \"series\"    \r\n    >\r\n    </chart-legend>\r\n  \r\n</div>\r\n\r\n",
                        // changeDetection: ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        styles: [".tooltip-example{text-align:center;padding:0 50px}.tooltip-example [tooltip]{display:inline-block;margin:50px 20px;width:180px;height:50px;border:1px solid gray;border-radius:5px;line-height:50px;text-align:center}.ng-tooltip{position:absolute;max-width:150px;font-size:14px;text-align:center;color:#fafae3;padding:3px 8px;background:#282a36;border-radius:4px;z-index:1000;opacity:0}.ng-tooltip:after{content:\"\";position:absolute;border-style:solid}.ng-tooltip-top:after{top:100%;left:50%;margin-left:-5px;border-width:5px;border-color:#000 transparent transparent}.ng-tooltip-bottom:after{bottom:100%;left:50%;margin-left:-5px;border-width:5px;border-color:transparent transparent #000}.ng-tooltip-left:after{top:50%;left:100%;margin-top:-5px;border-width:5px;border-color:transparent transparent transparent #000}.ng-tooltip-right:after{top:50%;right:100%;margin-top:-5px;border-width:5px;border-color:transparent #000 transparent transparent}.ng-tooltip-show{opacity:1}.pie{stroke-dasharray:2000;stroke-dashoffset:2000;-webkit-animation:1s linear 1.3s forwards pie_frames;animation:1s linear 1.3s forwards pie_frames}@-webkit-keyframes pie_frames{to{stroke-dashoffset:0}}@keyframes pie_frames{to{stroke-dashoffset:0}}.pieSlice{-webkit-animation:1.5s forwards pieSlice_frames;animation:1.5s forwards pieSlice_frames}@-webkit-keyframes pieSlice_frames{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes pieSlice_frames{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}"]
                    }] }
        ];
        /** @nocollapse */
        ngxChartsPieComponent.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.ChangeDetectorRef }
        ]; };
        ngxChartsPieComponent.propDecorators = {
            options: [{ type: core.Input }],
            categories: [{ type: core.Input }],
            series: [{ type: core.Input }],
            onResize: [{ type: core.HostListener, args: ['window:resize', ['$event'],] }]
        };
        return ngxChartsPieComponent;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        ngxChartsPieComponent.prototype.customOptions;
        /**
         * @type {?}
         * @private
         */
        ngxChartsPieComponent.prototype._options;
        /** @type {?} */
        ngxChartsPieComponent.prototype.categories;
        /** @type {?} */
        ngxChartsPieComponent.prototype.series;
        /** @type {?} */
        ngxChartsPieComponent.prototype.xScale;
        /** @type {?} */
        ngxChartsPieComponent.prototype.innerScale;
        /** @type {?} */
        ngxChartsPieComponent.prototype.yScale;
        /** @type {?} */
        ngxChartsPieComponent.prototype.pies;
        /** @type {?} */
        ngxChartsPieComponent.prototype.lineCircle;
        /** @type {?} */
        ngxChartsPieComponent.prototype.groupName;
        /** @type {?} */
        ngxChartsPieComponent.prototype.colorScale;
        /** @type {?} */
        ngxChartsPieComponent.prototype.calcArc;
        /** @type {?} */
        ngxChartsPieComponent.prototype.pieGenerator;
        /** @type {?} */
        ngxChartsPieComponent.prototype.translation;
        /** @type {?} */
        ngxChartsPieComponent.prototype.trimLabel;
        /**
         * @type {?}
         * @private
         */
        ngxChartsPieComponent.prototype.chartElement;
        /**
         * @type {?}
         * @private
         */
        ngxChartsPieComponent.prototype.cdr;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ngxChartsPieModule = /** @class */ (function () {
        function ngxChartsPieModule() {
        }
        ngxChartsPieModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [ngxChartsPieComponent],
                        imports: [common.CommonModule, AxesModule, HeaderModule, LegendModule, TooltipModule],
                        exports: [ngxChartsPieComponent],
                        providers: [],
                    },] }
        ];
        return ngxChartsPieModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ngxChartsComboComponent = /** @class */ (function () {
        function ngxChartsComboComponent(chartElement, cdr) {
            this.chartElement = chartElement;
            this.cdr = cdr;
            this.customOptions = {
                barType: 'vertical',
                title: '',
                subtitle: '',
                height: 0,
                width: 0,
                padding: 5,
                xAxis: {
                    title: '',
                    height: 0,
                    labelRotation: 0,
                    labelAlign: 'left',
                    labelEllipsis: false,
                    labelEllipsisSize: 16
                },
                yAxis: {
                    title: '',
                    rightTitle: '',
                    width: 0,
                    rightWidth: 0,
                    height: 0,
                    labelRotation: 0,
                    labelEllipsis: false,
                    labelEllipsisSize: 16
                },
                legend: {
                    labelEllipsis: false,
                    labelEllipsisSize: 16
                },
                plotBackground: {
                    x: 0,
                    y: 0,
                    height: 0,
                    width: 0
                },
                plotOptions: {
                    groupBarPadding: 20,
                    innerBarPadding: 3
                },
                header: {
                    height: 0,
                    width: 0
                }
            };
            this._options = {};
            this.categories = [];
            this.series = [];
            this.lines = [];
            this.bars = [];
            this.lineCircle = [];
            this.groupName = [];
        }
        Object.defineProperty(ngxChartsComboComponent.prototype, "options", {
            get: /**
             * @return {?}
             */
            function () {
                return this._options;
            },
            set: /**
             * @param {?} obj
             * @return {?}
             */
            function (obj) {
                /** @type {?} */
                var xAxis = obj.xAxis;
                xAxis['labelEllipsis'] = (obj.xAxis.labelEllipsisSize != undefined && obj.xAxis.labelEllipsisSize > 0) ? true : false;
                /** @type {?} */
                var yAxis = obj.yAxis;
                yAxis['labelEllipsis'] = (obj.yAxis.labelEllipsisSize != undefined && obj.yAxis.labelEllipsisSize > 0) ? true : false;
                yAxis['title'] = yAxis.leftTitle;
                /** @type {?} */
                var legend = obj.legend;
                legend['labelEllipsis'] = (obj.legend.labelEllipsisSize != undefined && obj.legend.labelEllipsisSize > 0) ? true : false;
                /** @type {?} */
                var plotBackground = obj.plotBackground;
                /** @type {?} */
                var plotOptions = obj.plotOptions;
                /** @type {?} */
                var header = obj.header;
                delete obj['xAxis'];
                delete obj['yAxis'];
                delete obj['legend'];
                delete obj['plotBackground'];
                delete obj['plotOptions'];
                delete obj['header'];
                this._options = __assign({}, this.customOptions, obj, { xAxis: __assign({}, this.customOptions.xAxis, xAxis), yAxis: __assign({}, this.customOptions.yAxis, yAxis), legend: __assign({}, this.customOptions.legend, legend), plotBackground: __assign({}, this.customOptions.plotBackground, plotBackground), plotOptions: __assign({}, this.customOptions.plotOptions, plotOptions), header: __assign({}, this.customOptions.header, header) });
                this._options['barType'] = 'vertical';
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} changes
         * @return {?}
         */
        ngxChartsComboComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var _this = this;
            this.groupBarPaddingBK = this.options.plotOptions.groupBarPadding;
            this.innerBarPaddingBK = this.options.plotOptions.innerBarPadding;
            setTimeout((/**
             * @return {?}
             */
            function () { return _this.update(); }));
        };
        /**
         * @return {?}
         */
        ngxChartsComboComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.options.width = this.options.width;
            this.options.height = this.options.height;
            this.update();
        };
        /**
         * @return {?}
         */
        ngxChartsComboComponent.prototype.update = /**
         * @return {?}
         */
        function () {
            var _this = this;
            // console.log("ttttttt",this.options)
            /** @type {?} */
            var hostElem = this.chartElement.nativeElement;
            /** @type {?} */
            var dims = hostElem.parentNode !== null ? hostElem.parentNode.getBoundingClientRect() : { height: 400, width: 800 };
            /** @type {?} */
            var style = hostElem.parentNode.currentStyle || window.getComputedStyle(hostElem.parentNode);
            this.options.height = !this.options.height ? dims.height - this.strToNumber(style.paddingLeft) - this.strToNumber(style.paddingRight) : this.options.height;
            this.options.width = !this.options.width ? dims.width - this.strToNumber(style.paddingLeft) - this.strToNumber(style.paddingRight) : dims.width - this.strToNumber(style.paddingLeft) - this.strToNumber(style.paddingRight);
            this.calPlotBackground();
            /** @type {?} */
            var countFlag = false;
            this.options.plotOptions.groupBarPadding = this.groupBarPaddingBK;
            this.options.plotOptions.innerBarPadding = this.innerBarPaddingBK;
            do {
                if (countFlag == true) {
                    this.options.plotOptions.groupBarPadding--;
                    this.options.plotOptions.innerBarPadding = 2;
                }
                if (this.options.barType == 'vertical') {
                    this.xScale = this.getXScale();
                }
                else {
                    // this.yScale=this.getXScale();
                }
                this.innerScale = this.getInnerScale();
                countFlag = true;
            } while (this.innerScale.bandwidth() < 2);
            // 
            if (this.options.barType == 'vertical') {
                this.yScale = this.getYScale();
                this.yRightScale = this.getYRightScale();
            }
            else {
                // this.xScale=this.getYScale();
            }
            /** @type {?} */
            var colorHelper = new ColorHelper(this.options, this.series);
            this.colorScale = colorHelper.generateColorScale();
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.groupName = [];
                _this.series.map((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    if (item.name) {
                        _this.groupName.push({
                            name: item.name,
                            color: _this.colorScale(item.name)
                        });
                    }
                }));
                _this.createBar();
                _this.createLine();
            }));
            this.cdr.detectChanges();
        };
        /**
         * @return {?}
         */
        ngxChartsComboComponent.prototype.getXScale = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var spacing;
            /** @type {?} */
            var range;
            if (this.options.barType == 'vertical') {
                spacing = (this.categories.length / (this.options.plotBackground.width / this.options.plotOptions.groupBarPadding));
                range = [0, this.options.plotBackground.width];
            }
            else {
                // let length=this.options.height-this.options.header.height;
                // spacing=(this.categories.length/(this.options.plotBackground.height/this.options.plotOptions.groupBarPadding));
                // range=[0, this.options.plotBackground.height];
            }
            return d3Scale.scaleBand()
                .range(range)
                .paddingInner(spacing)
                .paddingOuter(0.1)
                .domain(this.categories);
        };
        /**
         * @return {?}
         */
        ngxChartsComboComponent.prototype.getInnerScale = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var groupDataArr = [];
            for (var i = 0; i < this.series.length; i++) {
                if (this.series[i].type == "verticalBar") {
                    groupDataArr.push(this.series[i].name);
                }
            }
            /** @type {?} */
            var spacing;
            /** @type {?} */
            var range;
            /** @type {?} */
            var length = 0;
            for (var i = 0; i < this.series.length; i++) {
                if (this.series[i].type == "verticalBar") {
                    length++;
                }
            }
            if (this.options.barType == 'vertical') {
                spacing = (length / (this.xScale.bandwidth() / this.options.plotOptions.innerBarPadding));
                range = this.xScale.bandwidth();
            }
            else {
                // spacing=(length/(this.yScale.bandwidth()/this.options.plotOptions.innerBarPadding));
                // range=this.yScale.bandwidth();
            }
            return d3Scale.scaleBand()
                .range([0, range])
                .paddingInner(spacing)
                .domain(groupDataArr);
        };
        /**
         * @return {?}
         */
        ngxChartsComboComponent.prototype.getYScale = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var uniqueValue = new Set();
            this.series.map((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                if (item.type == "verticalBar") {
                    item.data.map((/**
                     * @param {?} value
                     * @return {?}
                     */
                    function (value) {
                        uniqueValue.add(value);
                    }));
                }
            }));
            /** @type {?} */
            var min = Math.min.apply(Math, __spread(uniqueValue));
            min = min > 0 ? 0 : min;
            /** @type {?} */
            var max = Math.max.apply(Math, __spread([0], uniqueValue));
            max = max > 0 ? max : 0;
            /** @type {?} */
            var range = [];
            if (this.options.barType == 'vertical') {
                /** @type {?} */
                var value = this.options.plotBackground.height;
                range = [value, 0];
            }
            // else {
            //     let value=this.options.plotBackground.width-30;
            //     range=[0, value];
            // }
            // console.log("bar getYScale --- ", range, min, max)
            return d3Scale.scaleLinear()
                .range(range)
                .domain([min, max]);
            //return this.scale.nice().ticks();
        };
        /**
         * @return {?}
         */
        ngxChartsComboComponent.prototype.getYRightScale = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var uniqueValue = new Set();
            this.series.map((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                if (item.type == "line" || item.type == undefined) {
                    item.data.map((/**
                     * @param {?} value
                     * @return {?}
                     */
                    function (value) {
                        uniqueValue.add(value);
                    }));
                }
            }));
            /** @type {?} */
            var min = Math.min.apply(Math, __spread(uniqueValue));
            min = min > 0 ? 0 : min;
            /** @type {?} */
            var max = Math.max.apply(Math, __spread([0], uniqueValue));
            max = max > 0 ? max : 0;
            /** @type {?} */
            var range = [];
            if (this.options.barType == 'vertical') {
                /** @type {?} */
                var value = this.options.plotBackground.height;
                range = [value, 0];
            }
            // else {
            //     let value=this.options.plotBackground.width-30;
            //     range=[0, value];
            // }
            // console.log("bar getYScale --- ", range, min, max)
            return d3Scale.scaleLinear()
                .range(range)
                .domain([min, max]);
        };
        /**
         * @return {?}
         */
        ngxChartsComboComponent.prototype.calPlotBackground = /**
         * @return {?}
         */
        function () {
            this.options = __assign({}, this.options, { plotBackground: __assign({}, this.options.plotBackground, { x: 0, y: 0, height: this.options.height - this.options.xAxis.height - this.options.header.height - this.options.padding, width: this.options.width - this.options.yAxis.width - this.options.padding - this.options.yAxis.rightWidth }) });
            // console.log("calPlotBackground", JSON.stringify(this.options));
        };
        /**
         * @return {?}
         */
        ngxChartsComboComponent.prototype.createLine = /**
         * @return {?}
         */
        function () {
            //console.log("this.innerScale.bandwidth() "+this.innerScale.bandwidth())
            this.lines = [];
            this.lineCircle = [];
            for (var i = 0; i < this.series.length; i++) {
                if (this.series[i].type == "line" || this.series[i].type == undefined) {
                    /** @type {?} */
                    var line = { points: "", color: "" };
                    for (var j = 0; j < this.categories.length; j++) {
                        /** @type {?} */
                        var x = this.xScale(this.categories[j]) + (this.xScale.bandwidth() / 2) + this.options.yAxis.width;
                        /** @type {?} */
                        var y = this.yRightScale(this.series[i].data[j]) + this.options.header.height;
                        line.points += (x + "," + y + " ");
                        line.color = this.colorScale(this.series[i].name);
                        this.lineCircle.push({
                            x: x,
                            y: y,
                            color: this.colorScale(this.series[i].name),
                            value: this.categories[j],
                            //jan,feb
                            data: this.series[i].data[j],
                            //101,202
                            group: this.series[i].name
                        });
                    }
                    this.lines.push(line);
                }
            }
        };
        /**
         * @return {?}
         */
        ngxChartsComboComponent.prototype.createBar = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.bars = [];
            this.categories.map((/**
             * @param {?} item
             * @param {?} index
             * @return {?}
             */
            function (item, index) {
                for (var i = 0; i < _this.series.length; i++) {
                    if (_this.series[i].type == "verticalBar") {
                        /** @type {?} */
                        var bar = {
                            value: item,
                            //jan,feb
                            data: _this.series[i].data[index],
                            //101,202
                            group: _this.series[i].name,
                            color: _this.colorScale(_this.series[i].name),
                            width: _this.innerScale.bandwidth(),
                            height: _this.series[i].data[index] > 0 ? (_this.yScale(0) - _this.yScale(_this.series[i].data[index])) : (_this.yScale(_this.series[i].data[index]) - _this.yScale(0)),
                            x: _this.innerScale(_this.series[i].name) + _this.xScale(item),
                            y: _this.series[i].data[index] > 0 ? _this.yScale(_this.series[i].data[index]) : _this.yScale(0),
                            className: "vertical_bar"
                        };
                        _this.bars.push(bar);
                    }
                }
            }));
            // console.log("this.bars=[] ", this.bars)
        };
        /**
         * @param {?} __0
         * @return {?}
         */
        ngxChartsComboComponent.prototype.yAxisWidthChange = /**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var yAxisWidth = _a.yAxisWidth, yAxisHeight = _a.yAxisHeight, yAxisRightWidth = _a.yAxisRightWidth;
            this.options = __assign({}, this.options, { yAxis: __assign({}, this.options.yAxis, { width: yAxisWidth, height: yAxisHeight, rightWidth: yAxisRightWidth }) });
            this.update();
        };
        /**
         * @param {?} __0
         * @return {?}
         */
        ngxChartsComboComponent.prototype.xAxisHeightChange = /**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var xAxisHeight = _a.xAxisHeight;
            this.options = __assign({}, this.options, { xAxis: __assign({}, this.options.xAxis, { height: xAxisHeight }) });
            //console.log("xAxisHeightChange", xAxisHeight, JSON.stringify(this.options.xAxis));
            this.update();
        };
        /**
         * @param {?} __0
         * @return {?}
         */
        ngxChartsComboComponent.prototype.headerHeightChange = /**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var headerHeight = _a.headerHeight;
            this.options = __assign({}, this.options, { header: __assign({}, this.options.header, { height: headerHeight }) });
            this.update();
        };
        /**
         * @param {?} data
         * @return {?}
         */
        ngxChartsComboComponent.prototype.toolTipPlaccement = /**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            if (this.options.barType == 'vertical') {
                return data > 0 ? 'top' : 'bottom';
            }
            else {
                return data > 0 ? 'right' : 'left';
            }
        };
        /**
         * @param {?} event
         * @return {?}
         */
        ngxChartsComboComponent.prototype.onResize = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            var _this = this;
            //console.log("window:resize")
            setTimeout((/**
             * @return {?}
             */
            function () { return _this.update(); }));
        };
        /**
         * @private
         * @param {?} str
         * @return {?}
         */
        ngxChartsComboComponent.prototype.strToNumber = /**
         * @private
         * @param {?} str
         * @return {?}
         */
        function (str) {
            /** @type {?} */
            var numberPattern = /\d+/g;
            /** @type {?} */
            var num = str.match(numberPattern).join('');
            return parseFloat(num);
        };
        ngxChartsComboComponent.decorators = [
            { type: core.Component, args: [{
                        selector: "ngx-charts-combo",
                        template: "<div [style.width]=\"options.width+'px'\" [style.border]=\"'1px solid #f3f3f3'\">\r\n    \r\n    <svg version=\"1.1\" class=\"highcharts-root\" [attr.padding]=\"options.padding\" [attr.width]=\"options.width\"\r\n        [attr.height]=\"options.height\" [attr.viewBox]=\"'0 0 '+options.width +' '+ options.height\"\r\n        aria-label=\"Interactive chart\" [style.border]=\"'0px solid gray'\" [style.padding]=\"options.padding\"\r\n        aria-hidden=\"false\">\r\n\r\n        <g header [options]=\"options\" (headerHeightChange)=\"headerHeightChange($event)\"></g>\r\n\r\n        <g y-axis \r\n            [xScale]=\"xScale\" \r\n            [yScale]=\"yScale\" \r\n            [yRightScale]= \"yRightScale\"\r\n            [options]=\"options\" \r\n            [categories]=\"categories\" \r\n            [series]=\"series\"\r\n            (yAxisWidthChange)=\"yAxisWidthChange($event)\"></g>\r\n\r\n        <g x-axis \r\n            [xScale]=\"xScale\" \r\n            [yScale]=\"yScale\" \r\n            [options]=\"options\" \r\n            [categories]=\"categories\" \r\n            [series]=\"series\"\r\n            (xAxisHeightChange)=\"xAxisHeightChange($event)\"></g>\r\n            \r\n        <g data-z-index=\"0.1\" >\r\n            <rect *ngFor=\"let bar of bars\" \r\n                [attr.class]=\"bar.className\"\r\n                [attr.x]=\"bar.x+this.options.yAxis.width\"\r\n                [tooltip]=\"bar.value+', '+bar.group+', '+bar.data\" \r\n                [placement]=\"toolTipPlaccement(bar.data)\" \r\n                delay=\"10\"\r\n                [attr.y]=\"bar.y+this.options.header.height\" \r\n                [attr.width]=\"bar.width\" [attr.height]=\"bar.height\"\r\n                [attr.fill]=\"bar.color\" opacity=\"1\"  tabindex=\"-1\" role=\"img\"\r\n                aria-label=\"1. Jan, 49.9. Tokyo.\"></rect>\r\n        </g>\r\n        <g data-z-index=\"0.1\">\r\n            <polyline  \r\n                class=\"line\"\r\n                *ngFor=\"let line of lines\" \r\n                [attr.points]=\"line.points\"\r\n                [style.fill]=\"'none'\"\r\n                [style.stroke]=\"line.color\"\r\n                [style.stroke-width]=\"3\" >\r\n            </polyline>\r\n            <circle \r\n                *ngFor=\"let lc of lineCircle\"\r\n                [tooltip]=\"lc.value+', '+lc.group+', '+lc.data\" \r\n                [placement]=\"toolTipPlaccement(lc.data)\" \r\n                [attr.cx]=\"lc.x\" \r\n                [attr.cy]=\"lc.y\" \r\n                [attr.r]=\"3\" \r\n                [attr.stroke]=\"lc.color\" \r\n                [attr.stroke-width]=\"3\" \r\n                [attr.fill]=\"lc.color\">\r\n            </circle>\r\n        </g>\r\n\r\n    </svg>\r\n    <chart-legend\r\n        *ngIf=\"groupName.length\"\r\n        [groupName]=\"groupName\"\r\n        [options]=\"options\"\r\n        [series] = \"series\"    \r\n    >\r\n    </chart-legend>\r\n  \r\n</div>\r\n\r\n",
                        // changeDetection: ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        styles: [".tooltip-example{text-align:center;padding:0 50px}.tooltip-example [tooltip]{display:inline-block;margin:50px 20px;width:180px;height:50px;border:1px solid gray;border-radius:5px;line-height:50px;text-align:center}.ng-tooltip{position:absolute;max-width:150px;font-size:14px;text-align:center;color:#fafae3;padding:3px 8px;background:#282a36;border-radius:4px;z-index:1000;opacity:0}.ng-tooltip:after{content:\"\";position:absolute;border-style:solid}.ng-tooltip-top:after{top:100%;left:50%;margin-left:-5px;border-width:5px;border-color:#000 transparent transparent}.ng-tooltip-bottom:after{bottom:100%;left:50%;margin-left:-5px;border-width:5px;border-color:transparent transparent #000}.ng-tooltip-left:after{top:50%;left:100%;margin-top:-5px;border-width:5px;border-color:transparent transparent transparent #000}.ng-tooltip-right:after{top:50%;right:100%;margin-top:-5px;border-width:5px;border-color:transparent #000 transparent transparent}.ng-tooltip-show{opacity:1}.line{stroke-dasharray:2000;stroke-dashoffset:2000;-webkit-animation:2s linear forwards line_frames;animation:2s linear forwards line_frames}@-webkit-keyframes line_frames{to{stroke-dashoffset:0}}@keyframes line_frames{to{stroke-dashoffset:0}}"]
                    }] }
        ];
        /** @nocollapse */
        ngxChartsComboComponent.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.ChangeDetectorRef }
        ]; };
        ngxChartsComboComponent.propDecorators = {
            options: [{ type: core.Input }],
            categories: [{ type: core.Input }],
            series: [{ type: core.Input }],
            onResize: [{ type: core.HostListener, args: ['window:resize', ['$event'],] }]
        };
        return ngxChartsComboComponent;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        ngxChartsComboComponent.prototype.customOptions;
        /**
         * @type {?}
         * @private
         */
        ngxChartsComboComponent.prototype._options;
        /** @type {?} */
        ngxChartsComboComponent.prototype.categories;
        /** @type {?} */
        ngxChartsComboComponent.prototype.series;
        /** @type {?} */
        ngxChartsComboComponent.prototype.xScale;
        /** @type {?} */
        ngxChartsComboComponent.prototype.innerScale;
        /** @type {?} */
        ngxChartsComboComponent.prototype.yScale;
        /** @type {?} */
        ngxChartsComboComponent.prototype.yRightScale;
        /** @type {?} */
        ngxChartsComboComponent.prototype.lines;
        /** @type {?} */
        ngxChartsComboComponent.prototype.bars;
        /** @type {?} */
        ngxChartsComboComponent.prototype.lineCircle;
        /** @type {?} */
        ngxChartsComboComponent.prototype.groupName;
        /** @type {?} */
        ngxChartsComboComponent.prototype.groupBarPaddingBK;
        /** @type {?} */
        ngxChartsComboComponent.prototype.innerBarPaddingBK;
        /** @type {?} */
        ngxChartsComboComponent.prototype.colorScale;
        /**
         * @type {?}
         * @private
         */
        ngxChartsComboComponent.prototype.chartElement;
        /**
         * @type {?}
         * @private
         */
        ngxChartsComboComponent.prototype.cdr;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ngxChartsComboModule = /** @class */ (function () {
        function ngxChartsComboModule() {
        }
        ngxChartsComboModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [ngxChartsComboComponent],
                        imports: [common.CommonModule, AxesModule, HeaderModule, LegendModule, TooltipModule],
                        exports: [ngxChartsComboComponent],
                        providers: [],
                    },] }
        ];
        return ngxChartsComboModule;
    }());

    exports.ngxChartsBarModule = ngxChartsBarModule;
    exports.ngxChartsComboModule = ngxChartsComboModule;
    exports.ngxChartsLineModule = ngxChartsLineModule;
    exports.ngxChartsPieModule = ngxChartsPieModule;
    exports.ngxChartsStackedModule = ngxChartsStackedModule;
    exports.ɵa = ngxChartsBarComponent;
    exports.ɵb = AxesModule;
    exports.ɵc = XAxisComponent;
    exports.ɵd = YAxisComponent;
    exports.ɵe = HeaderModule;
    exports.ɵf = HeaderComponent;
    exports.ɵg = LegendModule;
    exports.ɵh = LegendComponent;
    exports.ɵi = TooltipModule;
    exports.ɵj = TooltipDirective;
    exports.ɵk = ngxChartsStackedComponent;
    exports.ɵl = ngxChartsLineComponent;
    exports.ɵm = ngxChartsPieComponent;
    exports.ɵn = ngxChartsComboComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=tusharghoshbd-ngx-charts.umd.js.map
