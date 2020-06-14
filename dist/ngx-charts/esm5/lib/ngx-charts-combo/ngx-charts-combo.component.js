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
            /** @type {?} */
            var yAxis = obj.yAxis;
            /** @type {?} */
            var legend = obj.legend;
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
            /** @type {?} */
            var length_1 = this.options.height - this.options.header.height;
            spacing = (this.categories.length / (this.options.plotBackground.height / this.options.plotOptions.groupBarPadding));
            range = [0, this.options.plotBackground.height];
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
            if (this.series[i].type == "column") {
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
            if (this.series[i].type == "column") {
                length++;
            }
        }
        if (this.options.barType == 'vertical') {
            spacing = (length / (this.xScale.bandwidth() / this.options.plotOptions.innerBarPadding));
            range = this.xScale.bandwidth();
        }
        else {
            spacing = (length / (this.yScale.bandwidth() / this.options.plotOptions.innerBarPadding));
            range = this.yScale.bandwidth();
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
            item.data.map((/**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                uniqueValue.add(value);
            }));
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
        return scaleLinear()
            .range(range)
            .domain([min, max]);
        //return this.scale.nice().ticks();
    };
    /**
     * @return {?}
     */
    ngxChartsComboComponent.prototype.calPlotBackground = /**
     * @return {?}
     */
    function () {
        this.options = tslib_1.__assign({}, this.options, { plotBackground: tslib_1.__assign({}, this.options.plotBackground, { x: 0, y: 0, height: this.options.height - this.options.xAxis.height - this.options.header.height - this.options.padding, width: this.options.width - this.options.yAxis.width - this.options.padding }) });
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
                if (_this.series[i].type == "column") {
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
        var yAxisWidth = _a.yAxisWidth, yAxisHeight = _a.yAxisHeight;
        this.options = tslib_1.__assign({}, this.options, { yAxis: tslib_1.__assign({}, this.options.yAxis, { width: yAxisWidth, height: yAxisHeight }) });
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
                    template: "<div [style.width]=\"options.width+'px'\" [style.border]=\"'1px solid #f3f3f3'\">\r\n    \r\n    <svg version=\"1.1\" class=\"highcharts-root\" [attr.padding]=\"options.padding\" [attr.width]=\"options.width\"\r\n        [attr.height]=\"options.height\" [attr.viewBox]=\"'0 0 '+options.width +' '+ options.height\"\r\n        aria-label=\"Interactive chart\" [style.border]=\"'0px solid gray'\" [style.padding]=\"options.padding\"\r\n        aria-hidden=\"false\">\r\n\r\n        <g header [options]=\"options\" (headerHeightChange)=\"headerHeightChange($event)\"></g>\r\n\r\n        <g y-axis \r\n            [xScale]=\"xScale\" \r\n            [yScale]=\"yScale\" \r\n            [options]=\"options\" \r\n            [categories]=\"categories\" \r\n            [series]=\"series\"\r\n            (yAxisWidthChange)=\"yAxisWidthChange($event)\"></g>\r\n\r\n        <g x-axis \r\n            [xScale]=\"xScale\" \r\n            [yScale]=\"yScale\" \r\n            [options]=\"options\" \r\n            [categories]=\"categories\" \r\n            [series]=\"series\"\r\n            (xAxisHeightChange)=\"xAxisHeightChange($event)\"></g>\r\n            \r\n        <g data-z-index=\"0.1\" >\r\n            <rect *ngFor=\"let bar of bars\" \r\n                [attr.class]=\"bar.className\"\r\n                [attr.x]=\"bar.x+this.options.yAxis.width\"\r\n                [tooltip]=\"bar.value+', '+bar.group+', '+bar.data\" \r\n                [placement]=\"toolTipPlaccement(bar.data)\" \r\n                delay=\"10\"\r\n                [attr.y]=\"bar.y+this.options.header.height\" \r\n                [attr.width]=\"bar.width\" [attr.height]=\"bar.height\"\r\n                [attr.fill]=\"bar.color\" opacity=\"1\"  tabindex=\"-1\" role=\"img\"\r\n                aria-label=\"1. Jan, 49.9. Tokyo.\"></rect>\r\n        </g>\r\n        <g data-z-index=\"0.1\">\r\n            <polyline  \r\n                class=\"line\"\r\n                *ngFor=\"let line of lines\" \r\n                [attr.points]=\"line.points\"\r\n                [style.fill]=\"'none'\"\r\n                [style.stroke]=\"line.color\"\r\n                [style.stroke-width]=\"3\" >\r\n            </polyline>\r\n            <circle \r\n                *ngFor=\"let lc of lineCircle\"\r\n                [tooltip]=\"lc.value+', '+lc.group+', '+lc.data\" \r\n                [placement]=\"toolTipPlaccement(lc.data)\" \r\n                [attr.cx]=\"lc.x\" \r\n                [attr.cy]=\"lc.y\" \r\n                [attr.r]=\"3\" \r\n                [attr.stroke]=\"lc.color\" \r\n                [attr.stroke-width]=\"3\" \r\n                [attr.fill]=\"lc.color\">\r\n            </circle>\r\n        </g>\r\n\r\n    </svg>\r\n    <chart-legend\r\n        *ngIf=\"groupName.length\"\r\n        [groupName]=\"groupName\"\r\n        [options]=\"options\"\r\n        [series] = \"series\"    \r\n    >\r\n    </chart-legend>\r\n  \r\n</div>\r\n\r\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNoYXJ0cy1jb21iby5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHVzaGFyZ2hvc2hiZC9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL25neC1jaGFydHMtY29tYm8vbmd4LWNoYXJ0cy1jb21iby5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULEtBQUssRUFDTCxpQkFBaUIsRUFJakIsVUFBVSxFQUNWLGlCQUFpQixFQUVqQixZQUFZLEVBQ2YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDbEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBR3BEO0lBdUhJLGlDQUNZLFlBQXdCLEVBQ3hCLEdBQXNCO1FBRHRCLGlCQUFZLEdBQVosWUFBWSxDQUFZO1FBQ3hCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBakgxQixrQkFBYSxHQUFDO1lBQ2xCLE9BQU8sRUFBRSxVQUFVO1lBQ25CLEtBQUssRUFBRSxFQUFFO1lBQ1QsUUFBUSxFQUFFLEVBQUU7WUFDWixNQUFNLEVBQUUsQ0FBQztZQUNULEtBQUssRUFBRSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUM7WUFDVixLQUFLLEVBQUU7Z0JBQ0gsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsYUFBYSxFQUFFLENBQUM7Z0JBQ2hCLFVBQVUsRUFBRSxNQUFNO2dCQUNsQixhQUFhLEVBQUUsS0FBSztnQkFDcEIsaUJBQWlCLEVBQUUsRUFBRTthQUN4QjtZQUNELEtBQUssRUFBRTtnQkFDSCxLQUFLLEVBQUUsRUFBRTtnQkFDVCxLQUFLLEVBQUUsQ0FBQztnQkFDUixNQUFNLEVBQUUsQ0FBQztnQkFDVCxhQUFhLEVBQUUsQ0FBQztnQkFDaEIsYUFBYSxFQUFFLEtBQUs7Z0JBQ3BCLGlCQUFpQixF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QUU7Z0JBQ3JDLElBQUksS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUUsUUFBUSxFQUFFOzt3QkFDekIsR0FBRyxHQUFNO3dCQUNYLEtBQUssRUFBRSxJQUFJOzt3QkFDWCxJQUFJLEVBQUUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDOzt3QkFDaEMsS0FBSyxFQUFFLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTt3QkFDMUIsS0FBSyxFQUFFLEtBQUksQ0FBQyxVQUFVLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7d0JBQzNDLEtBQUssRUFBRSxLQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRTt3QkFDbEMsTUFBTSxFQUFFLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFDLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN2SixDQUFDLEVBQUUsS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO3dCQUN6RCxDQUFDLEVBQUUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJ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O0lBa0R6Qiw2Q0FBNEI7O0lBQzVCLHlDQUF3Qjs7SUFNeEIseUNBQVk7O0lBQ1osNkNBQWdCOztJQUNoQix5Q0FBWTs7SUFDWix3Q0FBYzs7SUFDZCx1Q0FBYTs7SUFDYiw2Q0FBbUI7O0lBQ25CLDRDQUFvQjs7SUFDcEIsb0RBQXVCOztJQUN2QixvREFBdUI7O0lBQ3ZCLDZDQUFnQjs7Ozs7SUFHWiwrQ0FBZ0M7Ozs7O0lBQ2hDLHNDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBDb21wb25lbnQsXHJcbiAgICBJbnB1dCxcclxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxyXG4gICAgT25DaGFuZ2VzLFxyXG4gICAgT25Jbml0LFxyXG4gICAgU2ltcGxlQ2hhbmdlcyxcclxuICAgIEVsZW1lbnRSZWYsXHJcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gICAgSG9zdExpc3RlbmVyXHJcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuXHJcbmltcG9ydCB7IHNjYWxlQmFuZCwgc2NhbGVMaW5lYXIgfSBmcm9tIFwiZDMtc2NhbGVcIjtcclxuaW1wb3J0IHsgQ29sb3JIZWxwZXIgfSBmcm9tICcuLi91dGlscy9jb2xvci5oZWxwZXInO1xyXG5pbXBvcnQgeyBDbGFzc0dldHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyL3NyYy9vdXRwdXQvb3V0cHV0X2FzdCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIm5neC1jaGFydHMtY29tYm9cIixcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbmd4LWNoYXJ0cy1jb21iby5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL25neC1jaGFydHMtY29tYm8uY29tcG9uZW50LmNzc1wiXSxcclxuICAgIC8vIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxyXG59KVxyXG5leHBvcnQgY2xhc3Mgbmd4Q2hhcnRzQ29tYm9Db21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCB7XHJcbiAgICBwcml2YXRlIGN1c3RvbU9wdGlvbnM9e1xyXG4gICAgICAgIGJhclR5cGU6ICd2ZXJ0aWNhbCcsXHJcbiAgICAgICAgdGl0bGU6ICcnLFxyXG4gICAgICAgIHN1YnRpdGxlOiAnJyxcclxuICAgICAgICBoZWlnaHQ6IDAsXHJcbiAgICAgICAgd2lkdGg6IDAsXHJcbiAgICAgICAgcGFkZGluZzogNSxcclxuICAgICAgICB4QXhpczoge1xyXG4gICAgICAgICAgICB0aXRsZTogJycsXHJcbiAgICAgICAgICAgIGhlaWdodDogMCxcclxuICAgICAgICAgICAgbGFiZWxSb3RhdGlvbjogMCxcclxuICAgICAgICAgICAgbGFiZWxBbGlnbjogJ2xlZnQnLFxyXG4gICAgICAgICAgICBsYWJlbEVsbGlwc2lzOiBmYWxzZSxcclxuICAgICAgICAgICAgbGFiZWxFbGxpcHNpc1NpemU6IDE2XHJcbiAgICAgICAgfSxcclxuICAgICAgICB5QXhpczoge1xyXG4gICAgICAgICAgICB0aXRsZTogJycsXHJcbiAgICAgICAgICAgIHdpZHRoOiAwLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDAsXHJcbiAgICAgICAgICAgIGxhYmVsUm90YXRpb246IDAsXHJcbiAgICAgICAgICAgIGxhYmVsRWxsaXBzaXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBsYWJlbEVsbGlwc2lzU2l6ZTogMTZcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxlZ2VuZDoge1xyXG4gICAgICAgICAgICBsYWJlbEVsbGlwc2lzOiBmYWxzZSxcclxuICAgICAgICAgICAgbGFiZWxFbGxpcHNpc1NpemU6IDE2XHJcbiAgICAgICAgfSxcclxuICAgICAgICBwbG90QmFja2dyb3VuZDoge1xyXG4gICAgICAgICAgICB4OiAwLFxyXG4gICAgICAgICAgICB5OiAwLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDAsXHJcbiAgICAgICAgICAgIHdpZHRoOiAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwbG90T3B0aW9uczoge1xyXG4gICAgICAgICAgICBncm91cEJhclBhZGRpbmc6IDIwLFxyXG4gICAgICAgICAgICBpbm5lckJhclBhZGRpbmc6IDNcclxuICAgICAgICB9LFxyXG4gICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICBoZWlnaHQ6IDAsXHJcbiAgICAgICAgICAgIHdpZHRoOiAwXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIF9vcHRpb25zOiBhbnk9e307XHJcblxyXG4gICAgQElucHV0KCkgc2V0IG9wdGlvbnMob2JqOiBhbnkpIHtcclxuICAgICAgICBsZXQgeEF4aXM9b2JqLnhBeGlzO1xyXG4gICAgICAgIGxldCB5QXhpcz1vYmoueUF4aXM7XHJcbiAgICAgICAgbGV0IGxlZ2VuZD1vYmoubGVnZW5kO1xyXG4gICAgICAgIGxldCBwbG90QmFja2dyb3VuZD1vYmoucGxvdEJhY2tncm91bmQ7XHJcbiAgICAgICAgbGV0IHBsb3RPcHRpb25zPW9iai5wbG90T3B0aW9ucztcclxuICAgICAgICBsZXQgaGVhZGVyPW9iai5oZWFkZXI7XHJcblxyXG4gICAgICAgIGRlbGV0ZSBvYmpbJ3hBeGlzJ107XHJcbiAgICAgICAgZGVsZXRlIG9ialsneUF4aXMnXTtcclxuICAgICAgICBkZWxldGUgb2JqWydsZWdlbmQnXTtcclxuICAgICAgICBkZWxldGUgb2JqWydwbG90QmFja2dyb3VuZCddO1xyXG4gICAgICAgIGRlbGV0ZSBvYmpbJ3Bsb3RPcHRpb25zJ107XHJcbiAgICAgICAgZGVsZXRlIG9ialsnaGVhZGVyJ107XHJcblxyXG4gICAgICAgIHRoaXMuX29wdGlvbnM9e1xyXG4gICAgICAgICAgICAuLi50aGlzLmN1c3RvbU9wdGlvbnMsXHJcbiAgICAgICAgICAgIC4uLm9iaixcclxuICAgICAgICAgICAgeEF4aXM6IHtcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMuY3VzdG9tT3B0aW9ucy54QXhpcyxcclxuICAgICAgICAgICAgICAgIC4uLnhBeGlzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHlBeGlzOiB7XHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLmN1c3RvbU9wdGlvbnMueUF4aXMsXHJcbiAgICAgICAgICAgICAgICAuLi55QXhpc1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBsZWdlbmQ6IHtcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMuY3VzdG9tT3B0aW9ucy5sZWdlbmQsXHJcbiAgICAgICAgICAgICAgICAuLi5sZWdlbmRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcGxvdEJhY2tncm91bmQ6IHtcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMuY3VzdG9tT3B0aW9ucy5wbG90QmFja2dyb3VuZCxcclxuICAgICAgICAgICAgICAgIC4uLnBsb3RCYWNrZ3JvdW5kXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHBsb3RPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLmN1c3RvbU9wdGlvbnMucGxvdE9wdGlvbnMsXHJcbiAgICAgICAgICAgICAgICAuLi5wbG90T3B0aW9uc1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMuY3VzdG9tT3B0aW9ucy5oZWFkZXIsXHJcbiAgICAgICAgICAgICAgICAuLi5oZWFkZXJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fb3B0aW9uc1snYmFyVHlwZSddPSd2ZXJ0aWNhbCc7XHJcbiAgICB9XHJcbiAgICBnZXQgb3B0aW9ucygpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9vcHRpb25zO1xyXG4gICAgfVxyXG4gICAgQElucHV0KCkgY2F0ZWdvcmllczogYW55PVtdO1xyXG4gICAgQElucHV0KCkgc2VyaWVzOiBhbnk9W107XHJcblxyXG4gICAgLy9ASW5wdXQoKSBncm91cEJhclBhZGRpbmc9MjA7XHJcbiAgICAvL0BJbnB1dCgpIGlubmVyQmFyUGFkZGluZz0zO1xyXG5cclxuICAgIC8vIHNjYWxlOiBhbnk7XHJcbiAgICB4U2NhbGU6IGFueTtcclxuICAgIGlubmVyU2NhbGU6IGFueTtcclxuICAgIHlTY2FsZTogYW55O1xyXG4gICAgbGluZXM6IGFueT1bXTtcclxuICAgIGJhcnM6IGFueT1bXTtcclxuICAgIGxpbmVDaXJjbGU6IGFueT1bXTtcclxuICAgIGdyb3VwTmFtZTogYW55W109W107XHJcbiAgICBncm91cEJhclBhZGRpbmdCSzogYW55O1xyXG4gICAgaW5uZXJCYXJQYWRkaW5nQks6IGFueTtcclxuICAgIGNvbG9yU2NhbGU6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIGNoYXJ0RWxlbWVudDogRWxlbWVudFJlZixcclxuICAgICAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHsgfVxyXG5cclxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmdyb3VwQmFyUGFkZGluZ0JLPXRoaXMub3B0aW9ucy5wbG90T3B0aW9ucy5ncm91cEJhclBhZGRpbmc7XHJcbiAgICAgICAgdGhpcy5pbm5lckJhclBhZGRpbmdCSz10aGlzLm9wdGlvbnMucGxvdE9wdGlvbnMuaW5uZXJCYXJQYWRkaW5nO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy51cGRhdGUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLndpZHRoPXRoaXMub3B0aW9ucy53aWR0aDtcclxuICAgICAgICB0aGlzLm9wdGlvbnMuaGVpZ2h0PXRoaXMub3B0aW9ucy5oZWlnaHQ7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwidHR0dHR0dFwiLHRoaXMub3B0aW9ucylcclxuICAgICAgICBjb25zdCBob3N0RWxlbT10aGlzLmNoYXJ0RWxlbWVudC5uYXRpdmVFbGVtZW50O1xyXG4gICAgICAgIGxldCBkaW1zPWhvc3RFbGVtLnBhcmVudE5vZGUhPT1udWxsPyBob3N0RWxlbS5wYXJlbnROb2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpOnsgaGVpZ2h0OiA0MDAsIHdpZHRoOiA4MDAgfTtcclxuXHJcbiAgICAgICAgdmFyIHN0eWxlPWhvc3RFbGVtLnBhcmVudE5vZGUuY3VycmVudFN0eWxlfHx3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShob3N0RWxlbS5wYXJlbnROb2RlKTtcclxuXHJcbiAgICAgICAgdGhpcy5vcHRpb25zLmhlaWdodD0hdGhpcy5vcHRpb25zLmhlaWdodD8gZGltcy5oZWlnaHQtdGhpcy5zdHJUb051bWJlcihzdHlsZS5wYWRkaW5nTGVmdCktdGhpcy5zdHJUb051bWJlcihzdHlsZS5wYWRkaW5nUmlnaHQpOnRoaXMub3B0aW9ucy5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLndpZHRoPSF0aGlzLm9wdGlvbnMud2lkdGg/IGRpbXMud2lkdGgtdGhpcy5zdHJUb051bWJlcihzdHlsZS5wYWRkaW5nTGVmdCktdGhpcy5zdHJUb051bWJlcihzdHlsZS5wYWRkaW5nUmlnaHQpOmRpbXMud2lkdGgtdGhpcy5zdHJUb051bWJlcihzdHlsZS5wYWRkaW5nTGVmdCktdGhpcy5zdHJUb051bWJlcihzdHlsZS5wYWRkaW5nUmlnaHQpO1xyXG5cclxuICAgICAgICB0aGlzLmNhbFBsb3RCYWNrZ3JvdW5kKClcclxuXHJcbiAgICAgICAgbGV0IGNvdW50RmxhZz1mYWxzZTtcclxuICAgICAgICB0aGlzLm9wdGlvbnMucGxvdE9wdGlvbnMuZ3JvdXBCYXJQYWRkaW5nPXRoaXMuZ3JvdXBCYXJQYWRkaW5nQks7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLnBsb3RPcHRpb25zLmlubmVyQmFyUGFkZGluZz10aGlzLmlubmVyQmFyUGFkZGluZ0JLO1xyXG4gICAgICAgIGRvIHtcclxuICAgICAgICAgICAgaWYgKGNvdW50RmxhZz09dHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLnBsb3RPcHRpb25zLmdyb3VwQmFyUGFkZGluZy0tO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLnBsb3RPcHRpb25zLmlubmVyQmFyUGFkZGluZz0yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYmFyVHlwZT09J3ZlcnRpY2FsJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy54U2NhbGU9dGhpcy5nZXRYU2NhbGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMueVNjYWxlPXRoaXMuZ2V0WFNjYWxlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pbm5lclNjYWxlPXRoaXMuZ2V0SW5uZXJTY2FsZSgpO1xyXG4gICAgICAgICAgICBjb3VudEZsYWc9dHJ1ZTtcclxuICAgICAgICB9IHdoaWxlICh0aGlzLmlubmVyU2NhbGUuYmFuZHdpZHRoKCk8Mik7XHJcbiAgICAgICAgLy8gXHJcblxyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYmFyVHlwZT09J3ZlcnRpY2FsJykge1xyXG4gICAgICAgICAgICB0aGlzLnlTY2FsZT10aGlzLmdldFlTY2FsZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy54U2NhbGU9dGhpcy5nZXRZU2NhbGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjb2xvckhlbHBlcj1uZXcgQ29sb3JIZWxwZXIodGhpcy5vcHRpb25zLCB0aGlzLnNlcmllcyk7XHJcbiAgICAgICAgdGhpcy5jb2xvclNjYWxlPWNvbG9ySGVscGVyLmdlbmVyYXRlQ29sb3JTY2FsZSgpO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5ncm91cE5hbWU9W107XHJcbiAgICAgICAgICAgIHRoaXMuc2VyaWVzLm1hcChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLm5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyb3VwTmFtZS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogaXRlbS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhpcy5jb2xvclNjYWxlKGl0ZW0ubmFtZSlcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVCYXIoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVMaW5lKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFhTY2FsZSgpOiBhbnkge1xyXG5cclxuICAgICAgICBsZXQgc3BhY2luZztcclxuICAgICAgICBsZXQgcmFuZ2U7XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5iYXJUeXBlPT0ndmVydGljYWwnKSB7XHJcbiAgICAgICAgICAgIHNwYWNpbmc9KHRoaXMuY2F0ZWdvcmllcy5sZW5ndGgvKHRoaXMub3B0aW9ucy5wbG90QmFja2dyb3VuZC53aWR0aC90aGlzLm9wdGlvbnMucGxvdE9wdGlvbnMuZ3JvdXBCYXJQYWRkaW5nKSk7XHJcbiAgICAgICAgICAgIHJhbmdlPVswLCB0aGlzLm9wdGlvbnMucGxvdEJhY2tncm91bmQud2lkdGhdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IGxlbmd0aD10aGlzLm9wdGlvbnMuaGVpZ2h0LXRoaXMub3B0aW9ucy5oZWFkZXIuaGVpZ2h0O1xyXG4gICAgICAgICAgICBzcGFjaW5nPSh0aGlzLmNhdGVnb3JpZXMubGVuZ3RoLyh0aGlzLm9wdGlvbnMucGxvdEJhY2tncm91bmQuaGVpZ2h0L3RoaXMub3B0aW9ucy5wbG90T3B0aW9ucy5ncm91cEJhclBhZGRpbmcpKTtcclxuICAgICAgICAgICAgcmFuZ2U9WzAsIHRoaXMub3B0aW9ucy5wbG90QmFja2dyb3VuZC5oZWlnaHRdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2NhbGVCYW5kKClcclxuICAgICAgICAgICAgLnJhbmdlKHJhbmdlKVxyXG4gICAgICAgICAgICAucGFkZGluZ0lubmVyKHNwYWNpbmcpXHJcbiAgICAgICAgICAgIC5wYWRkaW5nT3V0ZXIoMC4xKVxyXG4gICAgICAgICAgICAuZG9tYWluKHRoaXMuY2F0ZWdvcmllcyk7XHJcbiAgICB9XHJcbiAgICBnZXRJbm5lclNjYWxlKCk6IGFueSB7XHJcblxyXG4gICAgICAgIGxldCBncm91cERhdGFBcnI9W107XHJcbiAgICAgICAgZm9yIChsZXQgaT0wOyBpPHRoaXMuc2VyaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlcmllc1tpXS50eXBlPT1cImNvbHVtblwiKSB7XHJcbiAgICAgICAgICAgICAgICBncm91cERhdGFBcnIucHVzaCh0aGlzLnNlcmllc1tpXS5uYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNwYWNpbmc7XHJcbiAgICAgICAgbGV0IHJhbmdlOyBcclxuICAgICAgICBsZXQgbGVuZ3RoID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy5zZXJpZXMubGVuZ3RoOyBpKyspIHsgXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlcmllc1tpXS50eXBlPT1cImNvbHVtblwiKSB7IFxyXG4gICAgICAgICAgICAgICAgbGVuZ3RoKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5iYXJUeXBlPT0ndmVydGljYWwnKSB7XHJcbiAgICAgICAgICAgIHNwYWNpbmc9KGxlbmd0aC8odGhpcy54U2NhbGUuYmFuZHdpZHRoKCkvdGhpcy5vcHRpb25zLnBsb3RPcHRpb25zLmlubmVyQmFyUGFkZGluZykpO1xyXG4gICAgICAgICAgICByYW5nZT10aGlzLnhTY2FsZS5iYW5kd2lkdGgoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHNwYWNpbmc9KGxlbmd0aC8odGhpcy55U2NhbGUuYmFuZHdpZHRoKCkvdGhpcy5vcHRpb25zLnBsb3RPcHRpb25zLmlubmVyQmFyUGFkZGluZykpO1xyXG4gICAgICAgICAgICByYW5nZT10aGlzLnlTY2FsZS5iYW5kd2lkdGgoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzY2FsZUJhbmQoKVxyXG4gICAgICAgICAgICAucmFuZ2UoWzAsIHJhbmdlXSlcclxuICAgICAgICAgICAgLnBhZGRpbmdJbm5lcihzcGFjaW5nKVxyXG4gICAgICAgICAgICAuZG9tYWluKGdyb3VwRGF0YUFycik7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0WVNjYWxlKCk6IGFueSB7XHJcbiAgICAgICAgbGV0IHVuaXF1ZVZhbHVlOiBhbnk9bmV3IFNldCgpO1xyXG4gICAgICAgIHRoaXMuc2VyaWVzLm1hcCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBpdGVtLmRhdGEubWFwKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdW5pcXVlVmFsdWUuYWRkKHZhbHVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBtaW49TWF0aC5taW4oLi4udW5pcXVlVmFsdWUpO1xyXG4gICAgICAgIG1pbj1taW4+MD8gMDptaW47XHJcblxyXG4gICAgICAgIGxldCBtYXg9TWF0aC5tYXgoMCwgLi4udW5pcXVlVmFsdWUpO1xyXG4gICAgICAgIG1heD1tYXg+MD8gbWF4OjA7XHJcblxyXG4gICAgICAgIGxldCByYW5nZT1bXTtcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmJhclR5cGU9PSd2ZXJ0aWNhbCcpIHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlPXRoaXMub3B0aW9ucy5wbG90QmFja2dyb3VuZC5oZWlnaHQ7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiYmFyIGdldFlTY2FsZVwiLHZhbHVlKVxyXG4gICAgICAgICAgICByYW5nZT1bdmFsdWUsIDBdO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImJhciBnZXRZU2NhbGUgLSBcIiwgcmFuZ2UpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWU9dGhpcy5vcHRpb25zLnBsb3RCYWNrZ3JvdW5kLndpZHRoLTMwO1xyXG4gICAgICAgICAgICByYW5nZT1bMCwgdmFsdWVdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJiYXIgZ2V0WVNjYWxlIC0tLSBcIiwgcmFuZ2UsIG1pbiwgbWF4KVxyXG5cclxuICAgICAgICByZXR1cm4gc2NhbGVMaW5lYXIoKVxyXG4gICAgICAgICAgICAucmFuZ2UocmFuZ2UpXHJcbiAgICAgICAgICAgIC5kb21haW4oW21pbiwgbWF4XSk7XHJcbiAgICAgICAgLy9yZXR1cm4gdGhpcy5zY2FsZS5uaWNlKCkudGlja3MoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgY2FsUGxvdEJhY2tncm91bmQoKSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zPXtcclxuICAgICAgICAgICAgLi4udGhpcy5vcHRpb25zLFxyXG4gICAgICAgICAgICBwbG90QmFja2dyb3VuZDoge1xyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5vcHRpb25zLnBsb3RCYWNrZ3JvdW5kLFxyXG4gICAgICAgICAgICAgICAgeDogMCxcclxuICAgICAgICAgICAgICAgIHk6IDAsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IHRoaXMub3B0aW9ucy5oZWlnaHQtdGhpcy5vcHRpb25zLnhBeGlzLmhlaWdodC10aGlzLm9wdGlvbnMuaGVhZGVyLmhlaWdodC10aGlzLm9wdGlvbnMucGFkZGluZyxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiB0aGlzLm9wdGlvbnMud2lkdGgtdGhpcy5vcHRpb25zLnlBeGlzLndpZHRoLXRoaXMub3B0aW9ucy5wYWRkaW5nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJjYWxQbG90QmFja2dyb3VuZFwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLm9wdGlvbnMpKTtcclxuICAgIH1cclxuICAgIGNyZWF0ZUxpbmUoKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInRoaXMuaW5uZXJTY2FsZS5iYW5kd2lkdGgoKSBcIit0aGlzLmlubmVyU2NhbGUuYmFuZHdpZHRoKCkpXHJcbiAgICAgICAgdGhpcy5saW5lcz1bXTtcclxuICAgICAgICB0aGlzLmxpbmVDaXJjbGU9W107XHJcbiAgICAgICAgZm9yIChsZXQgaT0wOyBpPHRoaXMuc2VyaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlcmllc1tpXS50eXBlPT1cImxpbmVcInx8dGhpcy5zZXJpZXNbaV0udHlwZT09dW5kZWZpbmVkKSB7IFxyXG4gICAgICAgICAgICAgICAgbGV0IGxpbmU9eyBwb2ludHM6IFwiXCIsIGNvbG9yOiBcIlwiIH1cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGo9MDsgajx0aGlzLmNhdGVnb3JpZXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgeD10aGlzLnhTY2FsZSh0aGlzLmNhdGVnb3JpZXNbal0pKyh0aGlzLnhTY2FsZS5iYW5kd2lkdGgoKS8yKSt0aGlzLm9wdGlvbnMueUF4aXMud2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHk9dGhpcy55U2NhbGUodGhpcy5zZXJpZXNbaV0uZGF0YVtqXSkrdGhpcy5vcHRpb25zLmhlYWRlci5oZWlnaHRcclxuICAgICAgICAgICAgICAgICAgICBsaW5lLnBvaW50cys9KHgrXCIsXCIreStcIiBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZS5jb2xvcj10aGlzLmNvbG9yU2NhbGUodGhpcy5zZXJpZXNbaV0ubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saW5lQ2lyY2xlLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhpcy5jb2xvclNjYWxlKHRoaXMuc2VyaWVzW2ldLm5hbWUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5jYXRlZ29yaWVzW2pdLCAgLy9qYW4sZmViXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuc2VyaWVzW2ldLmRhdGFbal0sIC8vMTAxLDIwMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cDogdGhpcy5zZXJpZXNbaV0ubmFtZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5saW5lcy5wdXNoKGxpbmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY3JlYXRlQmFyKCkge1xyXG4gICAgICAgIHRoaXMuYmFycz1bXTtcclxuICAgICAgICB0aGlzLmNhdGVnb3JpZXMubWFwKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy5zZXJpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlcmllc1tpXS50eXBlPT1cImNvbHVtblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFyOiBhbnk9e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogaXRlbSwgIC8vamFuLGZlYlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLnNlcmllc1tpXS5kYXRhW2luZGV4XSwgLy8xMDEsMjAyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwOiB0aGlzLnNlcmllc1tpXS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhpcy5jb2xvclNjYWxlKHRoaXMuc2VyaWVzW2ldLm5hbWUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy5pbm5lclNjYWxlLmJhbmR3aWR0aCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHRoaXMuc2VyaWVzW2ldLmRhdGFbaW5kZXhdPjA/ICh0aGlzLnlTY2FsZSgwKS10aGlzLnlTY2FsZSh0aGlzLnNlcmllc1tpXS5kYXRhW2luZGV4XSkpOih0aGlzLnlTY2FsZSh0aGlzLnNlcmllc1tpXS5kYXRhW2luZGV4XSktdGhpcy55U2NhbGUoMCkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB4OiB0aGlzLmlubmVyU2NhbGUodGhpcy5zZXJpZXNbaV0ubmFtZSkrdGhpcy54U2NhbGUoaXRlbSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IHRoaXMuc2VyaWVzW2ldLmRhdGFbaW5kZXhdPjA/IHRoaXMueVNjYWxlKHRoaXMuc2VyaWVzW2ldLmRhdGFbaW5kZXhdKTp0aGlzLnlTY2FsZSgwKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInZlcnRpY2FsX2JhclwiXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJhcnMucHVzaChiYXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgeUF4aXNXaWR0aENoYW5nZSh7IHlBeGlzV2lkdGgsIHlBeGlzSGVpZ2h0IH0pIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnM9e1xyXG4gICAgICAgICAgICAuLi50aGlzLm9wdGlvbnMsXHJcbiAgICAgICAgICAgIHlBeGlzOiB7XHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLm9wdGlvbnMueUF4aXMsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogeUF4aXNXaWR0aCxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogeUF4aXNIZWlnaHRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnVwZGF0ZSgpXHJcbiAgICB9XHJcblxyXG4gICAgeEF4aXNIZWlnaHRDaGFuZ2UoeyB4QXhpc0hlaWdodCB9KSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zPXtcclxuICAgICAgICAgICAgLi4udGhpcy5vcHRpb25zLFxyXG4gICAgICAgICAgICB4QXhpczoge1xyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5vcHRpb25zLnhBeGlzLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiB4QXhpc0hlaWdodFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJ4QXhpc0hlaWdodENoYW5nZVwiLCB4QXhpc0hlaWdodCwgSlNPTi5zdHJpbmdpZnkodGhpcy5vcHRpb25zLnhBeGlzKSk7XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKVxyXG4gICAgfVxyXG4gICAgaGVhZGVySGVpZ2h0Q2hhbmdlKHsgaGVhZGVySGVpZ2h0IH0pIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnM9e1xyXG4gICAgICAgICAgICAuLi50aGlzLm9wdGlvbnMsXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5vcHRpb25zLmhlYWRlcixcclxuICAgICAgICAgICAgICAgIGhlaWdodDogaGVhZGVySGVpZ2h0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICB0b29sVGlwUGxhY2NlbWVudChkYXRhKSB7XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5iYXJUeXBlPT0ndmVydGljYWwnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhPjA/ICd0b3AnOidib3R0b20nXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0YT4wPyAncmlnaHQnOidsZWZ0J1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnLCBbJyRldmVudCddKVxyXG4gICAgb25SZXNpemUoZXZlbnQpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwid2luZG93OnJlc2l6ZVwiKVxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy51cGRhdGUoKSk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICBwcml2YXRlIHN0clRvTnVtYmVyKHN0cikge1xyXG4gICAgICAgIGxldCBudW1iZXJQYXR0ZXJuPS9cXGQrL2c7XHJcbiAgICAgICAgbGV0IG51bT1zdHIubWF0Y2gobnVtYmVyUGF0dGVybikuam9pbignJylcclxuICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChudW0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==