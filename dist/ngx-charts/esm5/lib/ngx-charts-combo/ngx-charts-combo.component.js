/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, ViewEncapsulation, ElementRef, ChangeDetectorRef, HostListener } from "@angular/core";
import { scaleBand, scaleLinear } from "d3-scale";
import { ColorHelper } from '../utils/color.helper';
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
            this._options = tslib_1.__assign({}, this.customOptions, obj, { xAxis: tslib_1.__assign({}, this.customOptions.xAxis, xAxis), yAxis: tslib_1.__assign({}, this.customOptions.yAxis, yAxis), legend: tslib_1.__assign({}, this.customOptions.legend, legend), plotBackground: tslib_1.__assign({}, this.customOptions.plotBackground, plotBackground), plotOptions: tslib_1.__assign({}, this.customOptions.plotOptions, plotOptions), header: tslib_1.__assign({}, this.customOptions.header, header) });
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
        return scaleBand()
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
        return scaleBand()
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
        var min = Math.min.apply(Math, tslib_1.__spread(uniqueValue));
        min = min > 0 ? 0 : min;
        /** @type {?} */
        var max = Math.max.apply(Math, tslib_1.__spread([0], uniqueValue));
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
        return scaleLinear()
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
        var min = Math.min.apply(Math, tslib_1.__spread(uniqueValue));
        min = min > 0 ? 0 : min;
        /** @type {?} */
        var max = Math.max.apply(Math, tslib_1.__spread([0], uniqueValue));
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
        return scaleLinear()
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
        this.options = tslib_1.__assign({}, this.options, { plotBackground: tslib_1.__assign({}, this.options.plotBackground, { x: 0, y: 0, height: this.options.height - this.options.xAxis.height - this.options.header.height - this.options.padding, width: this.options.width - this.options.yAxis.width - this.options.padding - this.options.yAxis.rightWidth }) });
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
        this.options = tslib_1.__assign({}, this.options, { yAxis: tslib_1.__assign({}, this.options.yAxis, { width: yAxisWidth, height: yAxisHeight, rightWidth: yAxisRightWidth }) });
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
        this.options = tslib_1.__assign({}, this.options, { xAxis: tslib_1.__assign({}, this.options.xAxis, { height: xAxisHeight }) });
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
        this.options = tslib_1.__assign({}, this.options, { header: tslib_1.__assign({}, this.options.header, { height: headerHeight }) });
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
        { type: Component, args: [{
                    selector: "ngx-charts-combo",
                    template: "<div [style.width]=\"options.width+'px'\" [style.border]=\"'1px solid #f3f3f3'\">\r\n    \r\n    <svg version=\"1.1\" class=\"highcharts-root\" [attr.padding]=\"options.padding\" [attr.width]=\"options.width\"\r\n        [attr.height]=\"options.height\" [attr.viewBox]=\"'0 0 '+options.width +' '+ options.height\"\r\n        aria-label=\"Interactive chart\" [style.border]=\"'0px solid gray'\" [style.padding]=\"options.padding\"\r\n        aria-hidden=\"false\">\r\n\r\n        <g header [options]=\"options\" (headerHeightChange)=\"headerHeightChange($event)\"></g>\r\n\r\n        <g y-axis \r\n            [xScale]=\"xScale\" \r\n            [yScale]=\"yScale\" \r\n            [yRightScale]= \"yRightScale\"\r\n            [options]=\"options\" \r\n            [categories]=\"categories\" \r\n            [series]=\"series\"\r\n            (yAxisWidthChange)=\"yAxisWidthChange($event)\"></g>\r\n\r\n        <g x-axis \r\n            [xScale]=\"xScale\" \r\n            [yScale]=\"yScale\" \r\n            [options]=\"options\" \r\n            [categories]=\"categories\" \r\n            [series]=\"series\"\r\n            (xAxisHeightChange)=\"xAxisHeightChange($event)\"></g>\r\n            \r\n        <g data-z-index=\"0.1\" >\r\n            <rect *ngFor=\"let bar of bars\" \r\n                [attr.class]=\"bar.className\"\r\n                [attr.x]=\"bar.x+this.options.yAxis.width\"\r\n                [tooltip]=\"bar.value+', '+bar.group+', '+bar.data\" \r\n                [placement]=\"toolTipPlaccement(bar.data)\" \r\n                delay=\"10\"\r\n                [attr.y]=\"bar.y+this.options.header.height\" \r\n                [attr.width]=\"bar.width\" [attr.height]=\"bar.height\"\r\n                [attr.fill]=\"bar.color\" opacity=\"1\"  tabindex=\"-1\" role=\"img\"\r\n                aria-label=\"1. Jan, 49.9. Tokyo.\"></rect>\r\n        </g>\r\n        <g data-z-index=\"0.1\">\r\n            <polyline  \r\n                class=\"line\"\r\n                *ngFor=\"let line of lines\" \r\n                [attr.points]=\"line.points\"\r\n                [style.fill]=\"'none'\"\r\n                [style.stroke]=\"line.color\"\r\n                [style.stroke-width]=\"3\" >\r\n            </polyline>\r\n            <circle \r\n                *ngFor=\"let lc of lineCircle\"\r\n                [tooltip]=\"lc.value+', '+lc.group+', '+lc.data\" \r\n                [placement]=\"toolTipPlaccement(lc.data)\" \r\n                [attr.cx]=\"lc.x\" \r\n                [attr.cy]=\"lc.y\" \r\n                [attr.r]=\"3\" \r\n                [attr.stroke]=\"lc.color\" \r\n                [attr.stroke-width]=\"3\" \r\n                [attr.fill]=\"lc.color\">\r\n            </circle>\r\n        </g>\r\n\r\n    </svg>\r\n    <chart-legend\r\n        *ngIf=\"groupName.length\"\r\n        [groupName]=\"groupName\"\r\n        [options]=\"options\"\r\n        [series] = \"series\"    \r\n    >\r\n    </chart-legend>\r\n  \r\n</div>\r\n\r\n",
                    // changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styles: [".tooltip-example{text-align:center;padding:0 50px}.tooltip-example [tooltip]{display:inline-block;margin:50px 20px;width:180px;height:50px;border:1px solid gray;border-radius:5px;line-height:50px;text-align:center}.ng-tooltip{position:absolute;max-width:150px;font-size:14px;text-align:center;color:#fafae3;padding:3px 8px;background:#282a36;border-radius:4px;z-index:1000;opacity:0}.ng-tooltip:after{content:\"\";position:absolute;border-style:solid}.ng-tooltip-top:after{top:100%;left:50%;margin-left:-5px;border-width:5px;border-color:#000 transparent transparent}.ng-tooltip-bottom:after{bottom:100%;left:50%;margin-left:-5px;border-width:5px;border-color:transparent transparent #000}.ng-tooltip-left:after{top:50%;left:100%;margin-top:-5px;border-width:5px;border-color:transparent transparent transparent #000}.ng-tooltip-right:after{top:50%;right:100%;margin-top:-5px;border-width:5px;border-color:transparent #000 transparent transparent}.ng-tooltip-show{opacity:1}.line{stroke-dasharray:2000;stroke-dashoffset:2000;-webkit-animation:2s linear forwards line_frames;animation:2s linear forwards line_frames}@-webkit-keyframes line_frames{to{stroke-dashoffset:0}}@keyframes line_frames{to{stroke-dashoffset:0}}"]
                }] }
    ];
    /** @nocollapse */
    ngxChartsComboComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef }
    ]; };
    ngxChartsComboComponent.propDecorators = {
        options: [{ type: Input }],
        categories: [{ type: Input }],
        series: [{ type: Input }],
        onResize: [{ type: HostListener, args: ['window:resize', ['$event'],] }]
    };
    return ngxChartsComboComponent;
}());
export { ngxChartsComboComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNoYXJ0cy1jb21iby5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHVzaGFyZ2hvc2hiZC9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL25neC1jaGFydHMtY29tYm8vbmd4LWNoYXJ0cy1jb21iby5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULEtBQUssRUFDTCxpQkFBaUIsRUFJakIsVUFBVSxFQUNWLGlCQUFpQixFQUVqQixZQUFZLEVBQ2YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDbEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBR3BEO0lBaUlJLGlDQUNZLFlBQXdCLEVBQ3hCLEdBQXNCO1FBRHRCLGlCQUFZLEdBQVosWUFBWSxDQUFZO1FBQ3hCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBM0gxQixrQkFBYSxHQUFDO1lBQ2xCLE9BQU8sRUFBRSxVQUFVO1lBQ25CLEtBQUssRUFBRSxFQUFFO1lBQ1QsUUFBUSxFQUFFLEVBQUU7WUFDWixNQUFNLEVBQUUsQ0FBQztZQUNULEtBQUssRUFBRSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUM7WUFDVixLQUFLLEVBQUU7Z0JBQ0gsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsYUFBYSxFQUFFLENBQUM7Z0JBQ2hCLFVBQVUsRUFBRSxNQUFNO2dCQUNsQixhQUFhLEVBQUUsS0FBSztnQkFDcEIsaUJBQWlCLEVBQUUsRUFBRTthQUN4QjtZQUNELEtBQUssRUFBRTtnQkFDSCxLQUFLLEVBQUUsRUFBRTtnQkFDVCxVQUFVLEVBQUMsRUFBRTtnQkFDYixLQUFLLEVBQUUsQ0FBQztnQkFDUixVQUFVLEVBQUUsQ0FBQztnQkFDYixNQUFNLEVBQUUsQ0FBQztnQkFDVCxhQUFhLEVBQUUs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Q0FBQyxJQUFJLEdBQUMsRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHOzs7OztRQUFDLFVBQUMsSUFBSSxFQUFFLEtBQUs7WUFDNUIsS0FBSyxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNyQyxJQUFJLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFFLGFBQWEsRUFBRTs7d0JBQzlCLEdBQUcsR0FBTTt3QkFDWCxLQUFLLEVBQUUsSUFBSTs7d0JBQ1gsSUFBSSxFQUFFLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQzs7d0JBQ2hDLEtBQUssRUFBRSxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7d0JBQzFCLEtBQUssRUFBRSxLQUFJLENBQUMsVUFBVSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO3dCQUMzQyxLQUFLLEVBQUUsS0FBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUU7d0JBQ2xDLE1BQU0sRUFBRSxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FB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LEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7aUJBQ3hDOzs7O2dCQWhCRyxVQUFVO2dCQUNWLGlCQUFpQjs7OzBCQWdFaEIsS0FBSzs2QkF1REwsS0FBSzt5QkFDTCxLQUFLOzJCQTRUTCxZQUFZLFNBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDOztJQWdCN0MsOEJBQUM7Q0FBQSxBQTNiRCxJQTJiQztTQXBiWSx1QkFBdUI7Ozs7OztJQUNoQyxnREEyQ0U7Ozs7O0lBRUYsMkNBQXlCOztJQXlEekIsNkNBQTRCOztJQUM1Qix5Q0FBd0I7O0lBTXhCLHlDQUFZOztJQUNaLDZDQUFnQjs7SUFDaEIseUNBQVk7O0lBQ1osOENBQWlCOztJQUNqQix3Q0FBYzs7SUFDZCx1Q0FBYTs7SUFDYiw2Q0FBbUI7O0lBQ25CLDRDQUFvQjs7SUFDcEIsb0RBQXVCOztJQUN2QixvREFBdUI7O0lBQ3ZCLDZDQUFnQjs7Ozs7SUFHWiwrQ0FBZ0M7Ozs7O0lBQ2hDLHNDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBDb21wb25lbnQsXHJcbiAgICBJbnB1dCxcclxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxyXG4gICAgT25DaGFuZ2VzLFxyXG4gICAgT25Jbml0LFxyXG4gICAgU2ltcGxlQ2hhbmdlcyxcclxuICAgIEVsZW1lbnRSZWYsXHJcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gICAgSG9zdExpc3RlbmVyXHJcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuXHJcbmltcG9ydCB7IHNjYWxlQmFuZCwgc2NhbGVMaW5lYXIgfSBmcm9tIFwiZDMtc2NhbGVcIjtcclxuaW1wb3J0IHsgQ29sb3JIZWxwZXIgfSBmcm9tICcuLi91dGlscy9jb2xvci5oZWxwZXInO1xyXG5pbXBvcnQgeyBDbGFzc0dldHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyL3NyYy9vdXRwdXQvb3V0cHV0X2FzdCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIm5neC1jaGFydHMtY29tYm9cIixcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbmd4LWNoYXJ0cy1jb21iby5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL25neC1jaGFydHMtY29tYm8uY29tcG9uZW50LmNzc1wiXSxcclxuICAgIC8vIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxyXG59KVxyXG5leHBvcnQgY2xhc3Mgbmd4Q2hhcnRzQ29tYm9Db21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCB7XHJcbiAgICBwcml2YXRlIGN1c3RvbU9wdGlvbnM9e1xyXG4gICAgICAgIGJhclR5cGU6ICd2ZXJ0aWNhbCcsXHJcbiAgICAgICAgdGl0bGU6ICcnLFxyXG4gICAgICAgIHN1YnRpdGxlOiAnJyxcclxuICAgICAgICBoZWlnaHQ6IDAsXHJcbiAgICAgICAgd2lkdGg6IDAsXHJcbiAgICAgICAgcGFkZGluZzogNSxcclxuICAgICAgICB4QXhpczoge1xyXG4gICAgICAgICAgICB0aXRsZTogJycsXHJcbiAgICAgICAgICAgIGhlaWdodDogMCxcclxuICAgICAgICAgICAgbGFiZWxSb3RhdGlvbjogMCxcclxuICAgICAgICAgICAgbGFiZWxBbGlnbjogJ2xlZnQnLFxyXG4gICAgICAgICAgICBsYWJlbEVsbGlwc2lzOiBmYWxzZSxcclxuICAgICAgICAgICAgbGFiZWxFbGxpcHNpc1NpemU6IDE2XHJcbiAgICAgICAgfSxcclxuICAgICAgICB5QXhpczoge1xyXG4gICAgICAgICAgICB0aXRsZTogJycsXHJcbiAgICAgICAgICAgIHJpZ2h0VGl0bGU6JycsXHJcbiAgICAgICAgICAgIHdpZHRoOiAwLFxyXG4gICAgICAgICAgICByaWdodFdpZHRoOiAwLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDAsXHJcbiAgICAgICAgICAgIGxhYmVsUm90YXRpb246IDAsXHJcbiAgICAgICAgICAgIGxhYmVsRWxsaXBzaXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBsYWJlbEVsbGlwc2lzU2l6ZTogMTZcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxlZ2VuZDoge1xyXG4gICAgICAgICAgICBsYWJlbEVsbGlwc2lzOiBmYWxzZSxcclxuICAgICAgICAgICAgbGFiZWxFbGxpcHNpc1NpemU6IDE2XHJcbiAgICAgICAgfSxcclxuICAgICAgICBwbG90QmFja2dyb3VuZDoge1xyXG4gICAgICAgICAgICB4OiAwLFxyXG4gICAgICAgICAgICB5OiAwLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDAsXHJcbiAgICAgICAgICAgIHdpZHRoOiAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwbG90T3B0aW9uczoge1xyXG4gICAgICAgICAgICBncm91cEJhclBhZGRpbmc6IDIwLFxyXG4gICAgICAgICAgICBpbm5lckJhclBhZGRpbmc6IDNcclxuICAgICAgICB9LFxyXG4gICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICBoZWlnaHQ6IDAsXHJcbiAgICAgICAgICAgIHdpZHRoOiAwXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIF9vcHRpb25zOiBhbnk9e307XHJcblxyXG4gICAgQElucHV0KCkgc2V0IG9wdGlvbnMob2JqOiBhbnkpIHtcclxuICAgICAgICBsZXQgeEF4aXM9b2JqLnhBeGlzO1xyXG4gICAgICAgIHhBeGlzWydsYWJlbEVsbGlwc2lzJ109KG9iai54QXhpcy5sYWJlbEVsbGlwc2lzU2l6ZSE9dW5kZWZpbmVkJiZvYmoueEF4aXMubGFiZWxFbGxpcHNpc1NpemU+MCk/IHRydWU6ZmFsc2U7XHJcblxyXG4gICAgICAgIGxldCB5QXhpcz1vYmoueUF4aXM7XHJcbiAgICAgICAgeUF4aXNbJ2xhYmVsRWxsaXBzaXMnXT0ob2JqLnlBeGlzLmxhYmVsRWxsaXBzaXNTaXplIT11bmRlZmluZWQmJm9iai55QXhpcy5sYWJlbEVsbGlwc2lzU2l6ZT4wKT8gdHJ1ZTpmYWxzZTtcclxuICAgICAgICB5QXhpc1sndGl0bGUnXT15QXhpcy5sZWZ0VGl0bGVcclxuXHJcbiAgICAgICAgbGV0IGxlZ2VuZD1vYmoubGVnZW5kO1xyXG4gICAgICAgIGxlZ2VuZFsnbGFiZWxFbGxpcHNpcyddPShvYmoubGVnZW5kLmxhYmVsRWxsaXBzaXNTaXplIT11bmRlZmluZWQmJm9iai5sZWdlbmQubGFiZWxFbGxpcHNpc1NpemU+MCk/IHRydWU6ZmFsc2U7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHBsb3RCYWNrZ3JvdW5kPW9iai5wbG90QmFja2dyb3VuZDtcclxuICAgICAgICBsZXQgcGxvdE9wdGlvbnM9b2JqLnBsb3RPcHRpb25zO1xyXG4gICAgICAgIGxldCBoZWFkZXI9b2JqLmhlYWRlcjtcclxuXHJcbiAgICAgICAgZGVsZXRlIG9ialsneEF4aXMnXTtcclxuICAgICAgICBkZWxldGUgb2JqWyd5QXhpcyddO1xyXG4gICAgICAgIGRlbGV0ZSBvYmpbJ2xlZ2VuZCddO1xyXG4gICAgICAgIGRlbGV0ZSBvYmpbJ3Bsb3RCYWNrZ3JvdW5kJ107XHJcbiAgICAgICAgZGVsZXRlIG9ialsncGxvdE9wdGlvbnMnXTtcclxuICAgICAgICBkZWxldGUgb2JqWydoZWFkZXInXTtcclxuXHJcbiAgICAgICAgdGhpcy5fb3B0aW9ucz17XHJcbiAgICAgICAgICAgIC4uLnRoaXMuY3VzdG9tT3B0aW9ucyxcclxuICAgICAgICAgICAgLi4ub2JqLFxyXG4gICAgICAgICAgICB4QXhpczoge1xyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5jdXN0b21PcHRpb25zLnhBeGlzLFxyXG4gICAgICAgICAgICAgICAgLi4ueEF4aXNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgeUF4aXM6IHtcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMuY3VzdG9tT3B0aW9ucy55QXhpcyxcclxuICAgICAgICAgICAgICAgIC4uLnlBeGlzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGxlZ2VuZDoge1xyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5jdXN0b21PcHRpb25zLmxlZ2VuZCxcclxuICAgICAgICAgICAgICAgIC4uLmxlZ2VuZFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwbG90QmFja2dyb3VuZDoge1xyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5jdXN0b21PcHRpb25zLnBsb3RCYWNrZ3JvdW5kLFxyXG4gICAgICAgICAgICAgICAgLi4ucGxvdEJhY2tncm91bmRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcGxvdE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMuY3VzdG9tT3B0aW9ucy5wbG90T3B0aW9ucyxcclxuICAgICAgICAgICAgICAgIC4uLnBsb3RPcHRpb25zXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5jdXN0b21PcHRpb25zLmhlYWRlcixcclxuICAgICAgICAgICAgICAgIC4uLmhlYWRlclxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLl9vcHRpb25zWydiYXJUeXBlJ109J3ZlcnRpY2FsJztcclxuICAgIH1cclxuICAgIGdldCBvcHRpb25zKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wdGlvbnM7XHJcbiAgICB9XHJcbiAgICBASW5wdXQoKSBjYXRlZ29yaWVzOiBhbnk9W107XHJcbiAgICBASW5wdXQoKSBzZXJpZXM6IGFueT1bXTtcclxuXHJcbiAgICAvL0BJbnB1dCgpIGdyb3VwQmFyUGFkZGluZz0yMDtcclxuICAgIC8vQElucHV0KCkgaW5uZXJCYXJQYWRkaW5nPTM7XHJcblxyXG4gICAgLy8gc2NhbGU6IGFueTtcclxuICAgIHhTY2FsZTogYW55O1xyXG4gICAgaW5uZXJTY2FsZTogYW55O1xyXG4gICAgeVNjYWxlOiBhbnk7XHJcbiAgICB5UmlnaHRTY2FsZTogYW55O1xyXG4gICAgbGluZXM6IGFueT1bXTtcclxuICAgIGJhcnM6IGFueT1bXTtcclxuICAgIGxpbmVDaXJjbGU6IGFueT1bXTtcclxuICAgIGdyb3VwTmFtZTogYW55W109W107XHJcbiAgICBncm91cEJhclBhZGRpbmdCSzogYW55O1xyXG4gICAgaW5uZXJCYXJQYWRkaW5nQks6IGFueTtcclxuICAgIGNvbG9yU2NhbGU6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIGNoYXJ0RWxlbWVudDogRWxlbWVudFJlZixcclxuICAgICAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHsgfVxyXG5cclxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmdyb3VwQmFyUGFkZGluZ0JLPXRoaXMub3B0aW9ucy5wbG90T3B0aW9ucy5ncm91cEJhclBhZGRpbmc7XHJcbiAgICAgICAgdGhpcy5pbm5lckJhclBhZGRpbmdCSz10aGlzLm9wdGlvbnMucGxvdE9wdGlvbnMuaW5uZXJCYXJQYWRkaW5nO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy51cGRhdGUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLndpZHRoPXRoaXMub3B0aW9ucy53aWR0aDtcclxuICAgICAgICB0aGlzLm9wdGlvbnMuaGVpZ2h0PXRoaXMub3B0aW9ucy5oZWlnaHQ7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwidHR0dHR0dFwiLHRoaXMub3B0aW9ucylcclxuICAgICAgICBjb25zdCBob3N0RWxlbT10aGlzLmNoYXJ0RWxlbWVudC5uYXRpdmVFbGVtZW50O1xyXG4gICAgICAgIGxldCBkaW1zPWhvc3RFbGVtLnBhcmVudE5vZGUhPT1udWxsPyBob3N0RWxlbS5wYXJlbnROb2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpOnsgaGVpZ2h0OiA0MDAsIHdpZHRoOiA4MDAgfTtcclxuXHJcbiAgICAgICAgdmFyIHN0eWxlPWhvc3RFbGVtLnBhcmVudE5vZGUuY3VycmVudFN0eWxlfHx3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShob3N0RWxlbS5wYXJlbnROb2RlKTtcclxuXHJcbiAgICAgICAgdGhpcy5vcHRpb25zLmhlaWdodD0hdGhpcy5vcHRpb25zLmhlaWdodD8gZGltcy5oZWlnaHQtdGhpcy5zdHJUb051bWJlcihzdHlsZS5wYWRkaW5nTGVmdCktdGhpcy5zdHJUb051bWJlcihzdHlsZS5wYWRkaW5nUmlnaHQpOnRoaXMub3B0aW9ucy5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLndpZHRoPSF0aGlzLm9wdGlvbnMud2lkdGg/IGRpbXMud2lkdGgtdGhpcy5zdHJUb051bWJlcihzdHlsZS5wYWRkaW5nTGVmdCktdGhpcy5zdHJUb051bWJlcihzdHlsZS5wYWRkaW5nUmlnaHQpOmRpbXMud2lkdGgtdGhpcy5zdHJUb051bWJlcihzdHlsZS5wYWRkaW5nTGVmdCktdGhpcy5zdHJUb051bWJlcihzdHlsZS5wYWRkaW5nUmlnaHQpO1xyXG5cclxuICAgICAgICB0aGlzLmNhbFBsb3RCYWNrZ3JvdW5kKClcclxuXHJcbiAgICAgICAgbGV0IGNvdW50RmxhZz1mYWxzZTtcclxuICAgICAgICB0aGlzLm9wdGlvbnMucGxvdE9wdGlvbnMuZ3JvdXBCYXJQYWRkaW5nPXRoaXMuZ3JvdXBCYXJQYWRkaW5nQks7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLnBsb3RPcHRpb25zLmlubmVyQmFyUGFkZGluZz10aGlzLmlubmVyQmFyUGFkZGluZ0JLO1xyXG4gICAgICAgIGRvIHtcclxuICAgICAgICAgICAgaWYgKGNvdW50RmxhZz09dHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLnBsb3RPcHRpb25zLmdyb3VwQmFyUGFkZGluZy0tO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLnBsb3RPcHRpb25zLmlubmVyQmFyUGFkZGluZz0yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYmFyVHlwZT09J3ZlcnRpY2FsJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy54U2NhbGU9dGhpcy5nZXRYU2NhbGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMueVNjYWxlPXRoaXMuZ2V0WFNjYWxlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pbm5lclNjYWxlPXRoaXMuZ2V0SW5uZXJTY2FsZSgpO1xyXG4gICAgICAgICAgICBjb3VudEZsYWc9dHJ1ZTtcclxuICAgICAgICB9IHdoaWxlICh0aGlzLmlubmVyU2NhbGUuYmFuZHdpZHRoKCk8Mik7XHJcbiAgICAgICAgLy8gXHJcblxyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYmFyVHlwZT09J3ZlcnRpY2FsJykge1xyXG4gICAgICAgICAgICB0aGlzLnlTY2FsZT10aGlzLmdldFlTY2FsZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnlSaWdodFNjYWxlPXRoaXMuZ2V0WVJpZ2h0U2NhbGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIHRoaXMueFNjYWxlPXRoaXMuZ2V0WVNjYWxlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY29sb3JIZWxwZXI9bmV3IENvbG9ySGVscGVyKHRoaXMub3B0aW9ucywgdGhpcy5zZXJpZXMpO1xyXG4gICAgICAgIHRoaXMuY29sb3JTY2FsZT1jb2xvckhlbHBlci5nZW5lcmF0ZUNvbG9yU2NhbGUoKTtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBOYW1lPVtdO1xyXG4gICAgICAgICAgICB0aGlzLnNlcmllcy5tYXAoaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm91cE5hbWUucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGl0ZW0ubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoaXMuY29sb3JTY2FsZShpdGVtLm5hbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQmFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTGluZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRYU2NhbGUoKTogYW55IHtcclxuXHJcbiAgICAgICAgbGV0IHNwYWNpbmc7XHJcbiAgICAgICAgbGV0IHJhbmdlO1xyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYmFyVHlwZT09J3ZlcnRpY2FsJykge1xyXG4gICAgICAgICAgICBzcGFjaW5nPSh0aGlzLmNhdGVnb3JpZXMubGVuZ3RoLyh0aGlzLm9wdGlvbnMucGxvdEJhY2tncm91bmQud2lkdGgvdGhpcy5vcHRpb25zLnBsb3RPcHRpb25zLmdyb3VwQmFyUGFkZGluZykpO1xyXG4gICAgICAgICAgICByYW5nZT1bMCwgdGhpcy5vcHRpb25zLnBsb3RCYWNrZ3JvdW5kLndpZHRoXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGxldCBsZW5ndGg9dGhpcy5vcHRpb25zLmhlaWdodC10aGlzLm9wdGlvbnMuaGVhZGVyLmhlaWdodDtcclxuICAgICAgICAgICAgLy8gc3BhY2luZz0odGhpcy5jYXRlZ29yaWVzLmxlbmd0aC8odGhpcy5vcHRpb25zLnBsb3RCYWNrZ3JvdW5kLmhlaWdodC90aGlzLm9wdGlvbnMucGxvdE9wdGlvbnMuZ3JvdXBCYXJQYWRkaW5nKSk7XHJcbiAgICAgICAgICAgIC8vIHJhbmdlPVswLCB0aGlzLm9wdGlvbnMucGxvdEJhY2tncm91bmQuaGVpZ2h0XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNjYWxlQmFuZCgpXHJcbiAgICAgICAgICAgIC5yYW5nZShyYW5nZSlcclxuICAgICAgICAgICAgLnBhZGRpbmdJbm5lcihzcGFjaW5nKVxyXG4gICAgICAgICAgICAucGFkZGluZ091dGVyKDAuMSlcclxuICAgICAgICAgICAgLmRvbWFpbih0aGlzLmNhdGVnb3JpZXMpO1xyXG4gICAgfVxyXG4gICAgZ2V0SW5uZXJTY2FsZSgpOiBhbnkge1xyXG5cclxuICAgICAgICBsZXQgZ3JvdXBEYXRhQXJyPVtdO1xyXG4gICAgICAgIGZvciAobGV0IGk9MDsgaTx0aGlzLnNlcmllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXJpZXNbaV0udHlwZT09XCJ2ZXJ0aWNhbEJhclwiKSB7XHJcbiAgICAgICAgICAgICAgICBncm91cERhdGFBcnIucHVzaCh0aGlzLnNlcmllc1tpXS5uYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNwYWNpbmc7XHJcbiAgICAgICAgbGV0IHJhbmdlO1xyXG4gICAgICAgIGxldCBsZW5ndGg9MDtcclxuICAgICAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy5zZXJpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VyaWVzW2ldLnR5cGU9PVwidmVydGljYWxCYXJcIikge1xyXG4gICAgICAgICAgICAgICAgbGVuZ3RoKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5iYXJUeXBlPT0ndmVydGljYWwnKSB7XHJcbiAgICAgICAgICAgIHNwYWNpbmc9KGxlbmd0aC8odGhpcy54U2NhbGUuYmFuZHdpZHRoKCkvdGhpcy5vcHRpb25zLnBsb3RPcHRpb25zLmlubmVyQmFyUGFkZGluZykpO1xyXG4gICAgICAgICAgICByYW5nZT10aGlzLnhTY2FsZS5iYW5kd2lkdGgoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIHNwYWNpbmc9KGxlbmd0aC8odGhpcy55U2NhbGUuYmFuZHdpZHRoKCkvdGhpcy5vcHRpb25zLnBsb3RPcHRpb25zLmlubmVyQmFyUGFkZGluZykpO1xyXG4gICAgICAgICAgICAvLyByYW5nZT10aGlzLnlTY2FsZS5iYW5kd2lkdGgoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzY2FsZUJhbmQoKVxyXG4gICAgICAgICAgICAucmFuZ2UoWzAsIHJhbmdlXSlcclxuICAgICAgICAgICAgLnBhZGRpbmdJbm5lcihzcGFjaW5nKVxyXG4gICAgICAgICAgICAuZG9tYWluKGdyb3VwRGF0YUFycik7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0WVNjYWxlKCk6IGFueSB7XHJcbiAgICAgICAgbGV0IHVuaXF1ZVZhbHVlOiBhbnk9bmV3IFNldCgpO1xyXG4gICAgICAgIHRoaXMuc2VyaWVzLm1hcCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaXRlbS50eXBlPT1cInZlcnRpY2FsQmFyXCIpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uZGF0YS5tYXAoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdW5pcXVlVmFsdWUuYWRkKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBtaW49TWF0aC5taW4oLi4udW5pcXVlVmFsdWUpO1xyXG4gICAgICAgIG1pbj1taW4+MD8gMDptaW47XHJcblxyXG4gICAgICAgIGxldCBtYXg9TWF0aC5tYXgoMCwgLi4udW5pcXVlVmFsdWUpO1xyXG4gICAgICAgIG1heD1tYXg+MD8gbWF4OjA7XHJcblxyXG4gICAgICAgIGxldCByYW5nZT1bXTtcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmJhclR5cGU9PSd2ZXJ0aWNhbCcpIHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlPXRoaXMub3B0aW9ucy5wbG90QmFja2dyb3VuZC5oZWlnaHQ7XHJcbiAgICAgICAgICAgIHJhbmdlPVt2YWx1ZSwgMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGVsc2Uge1xyXG4gICAgICAgIC8vICAgICBsZXQgdmFsdWU9dGhpcy5vcHRpb25zLnBsb3RCYWNrZ3JvdW5kLndpZHRoLTMwO1xyXG4gICAgICAgIC8vICAgICByYW5nZT1bMCwgdmFsdWVdO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJiYXIgZ2V0WVNjYWxlIC0tLSBcIiwgcmFuZ2UsIG1pbiwgbWF4KVxyXG5cclxuICAgICAgICByZXR1cm4gc2NhbGVMaW5lYXIoKVxyXG4gICAgICAgICAgICAucmFuZ2UocmFuZ2UpXHJcbiAgICAgICAgICAgIC5kb21haW4oW21pbiwgbWF4XSk7XHJcbiAgICAgICAgLy9yZXR1cm4gdGhpcy5zY2FsZS5uaWNlKCkudGlja3MoKTtcclxuICAgIH1cclxuICAgIGdldFlSaWdodFNjYWxlKCkge1xyXG4gICAgICAgIGxldCB1bmlxdWVWYWx1ZTogYW55PW5ldyBTZXQoKTtcclxuICAgICAgICB0aGlzLnNlcmllcy5tYXAoKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgaWYgKGl0ZW0udHlwZT09XCJsaW5lXCJ8fGl0ZW0udHlwZT09dW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmRhdGEubWFwKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHVuaXF1ZVZhbHVlLmFkZCh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgbWluPU1hdGgubWluKC4uLnVuaXF1ZVZhbHVlKTtcclxuICAgICAgICBtaW49bWluPjA/IDA6bWluO1xyXG5cclxuICAgICAgICBsZXQgbWF4PU1hdGgubWF4KDAsIC4uLnVuaXF1ZVZhbHVlKTtcclxuICAgICAgICBtYXg9bWF4PjA/IG1heDowO1xyXG5cclxuICAgICAgICBsZXQgcmFuZ2U9W107XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5iYXJUeXBlPT0ndmVydGljYWwnKSB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZT10aGlzLm9wdGlvbnMucGxvdEJhY2tncm91bmQuaGVpZ2h0O1xyXG4gICAgICAgICAgICByYW5nZT1bdmFsdWUsIDBdO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBlbHNlIHtcclxuICAgICAgICAvLyAgICAgbGV0IHZhbHVlPXRoaXMub3B0aW9ucy5wbG90QmFja2dyb3VuZC53aWR0aC0zMDtcclxuICAgICAgICAvLyAgICAgcmFuZ2U9WzAsIHZhbHVlXTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiYmFyIGdldFlTY2FsZSAtLS0gXCIsIHJhbmdlLCBtaW4sIG1heClcclxuXHJcbiAgICAgICAgcmV0dXJuIHNjYWxlTGluZWFyKClcclxuICAgICAgICAgICAgLnJhbmdlKHJhbmdlKVxyXG4gICAgICAgICAgICAuZG9tYWluKFttaW4sIG1heF0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBjYWxQbG90QmFja2dyb3VuZCgpIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnM9e1xyXG4gICAgICAgICAgICAuLi50aGlzLm9wdGlvbnMsXHJcbiAgICAgICAgICAgIHBsb3RCYWNrZ3JvdW5kOiB7XHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLm9wdGlvbnMucGxvdEJhY2tncm91bmQsXHJcbiAgICAgICAgICAgICAgICB4OiAwLFxyXG4gICAgICAgICAgICAgICAgeTogMCxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogdGhpcy5vcHRpb25zLmhlaWdodC10aGlzLm9wdGlvbnMueEF4aXMuaGVpZ2h0LXRoaXMub3B0aW9ucy5oZWFkZXIuaGVpZ2h0LXRoaXMub3B0aW9ucy5wYWRkaW5nLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IHRoaXMub3B0aW9ucy53aWR0aC10aGlzLm9wdGlvbnMueUF4aXMud2lkdGgtdGhpcy5vcHRpb25zLnBhZGRpbmctdGhpcy5vcHRpb25zLnlBeGlzLnJpZ2h0V2lkdGhcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImNhbFBsb3RCYWNrZ3JvdW5kXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMub3B0aW9ucykpO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlTGluZSgpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwidGhpcy5pbm5lclNjYWxlLmJhbmR3aWR0aCgpIFwiK3RoaXMuaW5uZXJTY2FsZS5iYW5kd2lkdGgoKSlcclxuICAgICAgICB0aGlzLmxpbmVzPVtdO1xyXG4gICAgICAgIHRoaXMubGluZUNpcmNsZT1bXTtcclxuICAgICAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy5zZXJpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VyaWVzW2ldLnR5cGU9PVwibGluZVwifHx0aGlzLnNlcmllc1tpXS50eXBlPT11bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBsaW5lPXsgcG9pbnRzOiBcIlwiLCBjb2xvcjogXCJcIiB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqPTA7IGo8dGhpcy5jYXRlZ29yaWVzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHg9dGhpcy54U2NhbGUodGhpcy5jYXRlZ29yaWVzW2pdKSsodGhpcy54U2NhbGUuYmFuZHdpZHRoKCkvMikrdGhpcy5vcHRpb25zLnlBeGlzLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB5PXRoaXMueVJpZ2h0U2NhbGUodGhpcy5zZXJpZXNbaV0uZGF0YVtqXSkrdGhpcy5vcHRpb25zLmhlYWRlci5oZWlnaHRcclxuICAgICAgICAgICAgICAgICAgICBsaW5lLnBvaW50cys9KHgrXCIsXCIreStcIiBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZS5jb2xvcj10aGlzLmNvbG9yU2NhbGUodGhpcy5zZXJpZXNbaV0ubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saW5lQ2lyY2xlLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhpcy5jb2xvclNjYWxlKHRoaXMuc2VyaWVzW2ldLm5hbWUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5jYXRlZ29yaWVzW2pdLCAgLy9qYW4sZmViXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuc2VyaWVzW2ldLmRhdGFbal0sIC8vMTAxLDIwMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cDogdGhpcy5zZXJpZXNbaV0ubmFtZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5saW5lcy5wdXNoKGxpbmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY3JlYXRlQmFyKCkge1xyXG4gICAgICAgIHRoaXMuYmFycz1bXTtcclxuICAgICAgICB0aGlzLmNhdGVnb3JpZXMubWFwKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy5zZXJpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlcmllc1tpXS50eXBlPT1cInZlcnRpY2FsQmFyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBiYXI6IGFueT17XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBpdGVtLCAgLy9qYW4sZmViXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuc2VyaWVzW2ldLmRhdGFbaW5kZXhdLCAvLzEwMSwyMDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IHRoaXMuc2VyaWVzW2ldLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB0aGlzLmNvbG9yU2NhbGUodGhpcy5zZXJpZXNbaV0ubmFtZSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiB0aGlzLmlubmVyU2NhbGUuYmFuZHdpZHRoKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogdGhpcy5zZXJpZXNbaV0uZGF0YVtpbmRleF0+MD8gKHRoaXMueVNjYWxlKDApLXRoaXMueVNjYWxlKHRoaXMuc2VyaWVzW2ldLmRhdGFbaW5kZXhdKSk6KHRoaXMueVNjYWxlKHRoaXMuc2VyaWVzW2ldLmRhdGFbaW5kZXhdKS10aGlzLnlTY2FsZSgwKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IHRoaXMuaW5uZXJTY2FsZSh0aGlzLnNlcmllc1tpXS5uYW1lKSt0aGlzLnhTY2FsZShpdGVtKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeTogdGhpcy5zZXJpZXNbaV0uZGF0YVtpbmRleF0+MD8gdGhpcy55U2NhbGUodGhpcy5zZXJpZXNbaV0uZGF0YVtpbmRleF0pOnRoaXMueVNjYWxlKDApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwidmVydGljYWxfYmFyXCJcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmFycy5wdXNoKGJhcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInRoaXMuYmFycz1bXSBcIiwgdGhpcy5iYXJzKVxyXG4gICAgfVxyXG5cclxuICAgIHlBeGlzV2lkdGhDaGFuZ2UoeyB5QXhpc1dpZHRoLCB5QXhpc0hlaWdodCwgeUF4aXNSaWdodFdpZHRoIH0pIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnM9e1xyXG4gICAgICAgICAgICAuLi50aGlzLm9wdGlvbnMsXHJcbiAgICAgICAgICAgIHlBeGlzOiB7XHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLm9wdGlvbnMueUF4aXMsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogeUF4aXNXaWR0aCxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogeUF4aXNIZWlnaHQsXHJcbiAgICAgICAgICAgICAgICByaWdodFdpZHRoOiB5QXhpc1JpZ2h0V2lkdGhcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnVwZGF0ZSgpXHJcbiAgICB9XHJcblxyXG4gICAgeEF4aXNIZWlnaHRDaGFuZ2UoeyB4QXhpc0hlaWdodCB9KSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zPXtcclxuICAgICAgICAgICAgLi4udGhpcy5vcHRpb25zLFxyXG4gICAgICAgICAgICB4QXhpczoge1xyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5vcHRpb25zLnhBeGlzLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiB4QXhpc0hlaWdodFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJ4QXhpc0hlaWdodENoYW5nZVwiLCB4QXhpc0hlaWdodCwgSlNPTi5zdHJpbmdpZnkodGhpcy5vcHRpb25zLnhBeGlzKSk7XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKVxyXG4gICAgfVxyXG4gICAgaGVhZGVySGVpZ2h0Q2hhbmdlKHsgaGVhZGVySGVpZ2h0IH0pIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnM9e1xyXG4gICAgICAgICAgICAuLi50aGlzLm9wdGlvbnMsXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5vcHRpb25zLmhlYWRlcixcclxuICAgICAgICAgICAgICAgIGhlaWdodDogaGVhZGVySGVpZ2h0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICB0b29sVGlwUGxhY2NlbWVudChkYXRhKSB7XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5iYXJUeXBlPT0ndmVydGljYWwnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhPjA/ICd0b3AnOidib3R0b20nXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0YT4wPyAncmlnaHQnOidsZWZ0J1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnLCBbJyRldmVudCddKVxyXG4gICAgb25SZXNpemUoZXZlbnQpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwid2luZG93OnJlc2l6ZVwiKVxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy51cGRhdGUoKSk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICBwcml2YXRlIHN0clRvTnVtYmVyKHN0cikge1xyXG4gICAgICAgIGxldCBudW1iZXJQYXR0ZXJuPS9cXGQrL2c7XHJcbiAgICAgICAgbGV0IG51bT1zdHIubWF0Y2gobnVtYmVyUGF0dGVybikuam9pbignJylcclxuICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChudW0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==