/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, ViewEncapsulation, ElementRef, ChangeDetectorRef, HostListener } from "@angular/core";
import { scaleBand, scaleLinear } from "d3-scale";
import { ColorHelper } from '../utils/color.helper';
import { trimLabel } from '../utils/trim-label.helper';
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
            this._options = tslib_1.__assign({}, this.customOptions, obj, { xAxis: tslib_1.__assign({}, this.customOptions.xAxis, xAxis), yAxis: tslib_1.__assign({}, this.customOptions.yAxis, yAxis), legend: tslib_1.__assign({}, this.customOptions.legend, legend), plotBackground: tslib_1.__assign({}, this.customOptions.plotBackground, plotBackground), plotOptions: tslib_1.__assign({}, this.customOptions.plotOptions, plotOptions), header: tslib_1.__assign({}, this.customOptions.header, header) });
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
        return scaleBand()
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
        return scaleBand()
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
    ngxChartsBarComponent.prototype.calPlotBackground = /**
     * @return {?}
     */
    function () {
        this.options = tslib_1.__assign({}, this.options, { plotBackground: tslib_1.__assign({}, this.options.plotBackground, { x: 0, y: 0, height: this.options.height - this.options.xAxis.height - this.options.header.height - this.options.padding, width: this.options.width - this.options.yAxis.width - this.options.padding }) });
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
        this.options = tslib_1.__assign({}, this.options, { yAxis: tslib_1.__assign({}, this.options.yAxis, { width: yAxisWidth, height: yAxisHeight }) });
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
        this.options = tslib_1.__assign({}, this.options, { xAxis: tslib_1.__assign({}, this.options.xAxis, { height: xAxisHeight }) });
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
        this.options = tslib_1.__assign({}, this.options, { header: tslib_1.__assign({}, this.options.header, { height: headerHeight }) });
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
        { type: Component, args: [{
                    selector: "ngx-charts-bar",
                    template: "<div [style.width]=\"options.width+'px'\" [style.border]=\"'1px solid #f3f3f3'\">\r\n\r\n    <svg version=\"1.1\" class=\"highcharts-root\" [attr.padding]=\"options.padding\" [attr.width]=\"options.width\"\r\n        [attr.height]=\"options.height\" [attr.viewBox]=\"getViewBox()\"\r\n        aria-label=\"Interactive chart\" [style.border]=\"'0px solid gray'\" [style.padding]=\"options.padding\"\r\n        aria-hidden=\"false\">\r\n\r\n        <g header [options]=\"options\" (headerHeightChange)=\"headerHeightChange($event)\"></g>\r\n\r\n        <g y-axis \r\n            [xScale]=\"xScale\" \r\n            [yScale]=\"yScale\" \r\n            [options]=\"options\" \r\n            [categories]=\"categories\" \r\n            [series]=\"series\"\r\n            (yAxisWidthChange)=\"yAxisWidthChange($event)\"></g>\r\n\r\n        <g x-axis \r\n            [xScale]=\"xScale\" \r\n            [yScale]=\"yScale\" \r\n            [options]=\"options\" \r\n            [categories]=\"categories\" \r\n            [series]=\"series\"\r\n            (xAxisHeightChange)=\"xAxisHeightChange($event)\"></g>\r\n\r\n        <g data-z-index=\"0.1\" >\r\n            <rect *ngFor=\"let bar of bars\" \r\n                [attr.class]=\"bar.className\"\r\n                [attr.x]=\"bar.x+this.options.yAxis.width\"\r\n                [tooltip]=\"bar.value+', '+bar.group+', '+bar.data\" \r\n                [placement]=\"toolTipPlaccement(bar.data)\" \r\n                [tooltipColor]=\"bar.color\" \r\n                delay=\"10\"\r\n                [attr.y]=\"bar.y+this.options.header.height\" \r\n                [attr.width]=\"bar.width\" [attr.height]=\"bar.height\"\r\n                [attr.fill]=\"bar.color\" opacity=\"1\"  tabindex=\"-1\" role=\"img\"\r\n                aria-label=\"1. Jan, 49.9. Tokyo.\"></rect>\r\n        </g>\r\n    </svg>\r\n    <chart-legend\r\n        *ngIf=\"groupName.length\"\r\n        [groupName]=\"groupName\"\r\n        [options]=\"options\"\r\n        [series] = \"series\"    \r\n    >\r\n    </chart-legend>\r\n  \r\n</div>\r\n\r\n",
                    // changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styles: [".tooltip-example{text-align:center;padding:0 50px}.tooltip-example [tooltip]{display:inline-block;margin:50px 20px;width:180px;height:50px;border:1px solid gray;border-radius:5px;line-height:50px;text-align:center}.ng-tooltip{position:absolute;max-width:150px;font-size:14px;text-align:center;color:#fafae3;padding:3px 8px;background:#282a36;border-radius:4px;z-index:1000;opacity:0}.ng-tooltip:after{content:\"\";position:absolute;border-style:solid}.ng-tooltip-top:after{top:100%;left:50%;margin-left:-5px;border-width:5px;border-color:#000 transparent transparent}.ng-tooltip-bottom:after{bottom:100%;left:50%;margin-left:-5px;border-width:5px;border-color:transparent transparent #000}.ng-tooltip-left:after{top:50%;left:100%;margin-top:-5px;border-width:5px;border-color:transparent transparent transparent #000}.ng-tooltip-right:after{top:50%;right:100%;margin-top:-5px;border-width:5px;border-color:transparent #000 transparent transparent}.ng-tooltip-show{opacity:1}.horizontal_bar{-webkit-animation:1s linear forwards horizontal_bar_frames;animation:1s linear forwards horizontal_bar_frames}@-webkit-keyframes horizontal_bar_frames{from{width:0}}@keyframes horizontal_bar_frames{from{width:0}}.vertical_bar{-webkit-animation:1s linear forwards vertical_bar_frames;animation:1s linear forwards vertical_bar_frames}@-webkit-keyframes vertical_bar_frames{from{height:0}}@keyframes vertical_bar_frames{from{height:0}}"]
                }] }
    ];
    /** @nocollapse */
    ngxChartsBarComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ElementRef },
        { type: ChangeDetectorRef }
    ]; };
    ngxChartsBarComponent.propDecorators = {
        options: [{ type: Input }],
        categories: [{ type: Input }],
        series: [{ type: Input }],
        onResize: [{ type: HostListener, args: ['window:resize', ['$event'],] }]
    };
    return ngxChartsBarComponent;
}());
export { ngxChartsBarComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNoYXJ0cy1iYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHR1c2hhcmdob3NoYmQvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtY2hhcnRzLWJhci9uZ3gtY2hhcnRzLWJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULEtBQUssRUFDTCxpQkFBaUIsRUFJakIsVUFBVSxFQUNWLGlCQUFpQixFQUVqQixZQUFZLEVBQ2YsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDbEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUd2RDtJQThISSwrQkFBWSxPQUFtQixFQUNuQixZQUF3QixFQUN4QixHQUFzQjtRQUR0QixpQkFBWSxHQUFaLFlBQVksQ0FBWTtRQUN4QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQXRIMUIsa0JBQWEsR0FBQztZQUNsQixPQUFPLEVBQUUsVUFBVTtZQUNuQixLQUFLLEVBQUUsRUFBRTtZQUNULFFBQVEsRUFBRSxFQUFFO1lBQ1osTUFBTSxFQUFFLENBQUM7WUFDVCxLQUFLLEVBQUUsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDO1lBQ1YsS0FBSyxFQUFFO2dCQUNILEtBQUssRUFBRSxFQUFFO2dCQUNULE1BQU0sRUFBRSxDQUFDO2dCQUNULGFBQWEsRUFBRSxDQUFDO2dCQUNoQixVQUFVLEVBQUUsTUFBTTtnQkFDbEIsYUFBYSxFQUFFLEtBQUs7Z0JBQ3BCLGlCQUFpQixFQUFDLEVBQUU7YUFDdkI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsYUFB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RSxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7O3dCQUNoQyxLQUFLLEVBQUUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO3dCQUMxQixLQUFLLEVBQUUsS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQzs7d0JBRTNDLEtBQUssRUFBRSxLQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRTt3QkFDbEMsTUFBTSxFQUFFLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFDLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN2SixDQUFDLEVBQUUsS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO3dCQUN6RCxDQUFDLEVBQUUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFD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QUFPLENBQUMsTUFBTSxDQUFDOztZQUV6RCxPQUFPLFNBQVMsQ0FBQztJQUN6QixDQUFDOzs7Ozs7SUFLTywyQ0FBVzs7Ozs7SUFBbkIsVUFBb0IsR0FBRzs7WUFDZixhQUFhLEdBQUMsTUFBTTs7WUFDcEIsR0FBRyxHQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUN6QyxPQUFPLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzQixDQUFDOztnQkE3WkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLGlpRUFBOEM7O29CQUc5QyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7aUJBQ3hDOzs7O2dCQWxCRyxVQUFVO2dCQUFWLFVBQVU7Z0JBQ1YsaUJBQWlCOzs7MEJBa0VoQixLQUFLOzZCQXNETCxLQUFLO3lCQUNMLEtBQUs7MkJBMlJMLFlBQVksU0FBQyxlQUFlLEVBQUUsQ0FBQyxRQUFRLENBQUM7O0lBcUI3Qyw0QkFBQztDQUFBLEFBOVpELElBOFpDO1NBdFpZLHFCQUFxQjs7Ozs7O0lBRTlCLDhDQXlDRTs7Ozs7SUFFRix5Q0FBeUI7O0lBd0R6QiwyQ0FBNEI7O0lBQzVCLHVDQUF3Qjs7SUFFeEIsd0NBQWE7O0lBS2IsdUNBQVk7O0lBQ1osMkNBQWdCOztJQUNoQix1Q0FBWTs7SUFDWixxQ0FBYTs7SUFDYiwwQ0FBb0I7O0lBQ3BCLGtEQUF1Qjs7SUFDdkIsa0RBQXVCOztJQUN2QiwyQ0FBZ0I7O0lBQ2hCLDBDQUFlOzs7OztJQUVYLDZDQUFnQzs7Ozs7SUFDaEMsb0NBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIENvbXBvbmVudCxcclxuICAgIElucHV0LFxyXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXHJcbiAgICBPbkNoYW5nZXMsXHJcbiAgICBPbkluaXQsXHJcbiAgICBTaW1wbGVDaGFuZ2VzLFxyXG4gICAgRWxlbWVudFJlZixcclxuICAgIENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgICBIb3N0TGlzdGVuZXJcclxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBzZWxlY3QgfSBmcm9tICdkMy1zZWxlY3Rpb24nO1xyXG5pbXBvcnQgeyB0cmFuc2l0aW9uIH0gZnJvbSAnZDMtdHJhbnNpdGlvbic7XHJcbmltcG9ydCB7IHNjYWxlQmFuZCwgc2NhbGVMaW5lYXIgfSBmcm9tIFwiZDMtc2NhbGVcIjtcclxuaW1wb3J0IHsgQ29sb3JIZWxwZXIgfSBmcm9tICcuLi91dGlscy9jb2xvci5oZWxwZXInO1xyXG5pbXBvcnQgeyB0cmltTGFiZWwgfSBmcm9tICcuLi91dGlscy90cmltLWxhYmVsLmhlbHBlcic7XHJcbmltcG9ydCB7IENsYXNzR2V0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXIvc3JjL291dHB1dC9vdXRwdXRfYXN0JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibmd4LWNoYXJ0cy1iYXJcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbmd4LWNoYXJ0cy1iYXIuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi9uZ3gtY2hhcnRzLWJhci5jb21wb25lbnQuY3NzXCJdLFxyXG4gICAgLy8gY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3Mgbmd4Q2hhcnRzQmFyQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQge1xyXG5cclxuICAgIHByaXZhdGUgY3VzdG9tT3B0aW9ucz17XHJcbiAgICAgICAgYmFyVHlwZTogJ3ZlcnRpY2FsJyxcclxuICAgICAgICB0aXRsZTogJycsXHJcbiAgICAgICAgc3VidGl0bGU6ICcnLFxyXG4gICAgICAgIGhlaWdodDogMCxcclxuICAgICAgICB3aWR0aDogMCxcclxuICAgICAgICBwYWRkaW5nOiA1LFxyXG4gICAgICAgIHhBeGlzOiB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnJyxcclxuICAgICAgICAgICAgaGVpZ2h0OiAwLFxyXG4gICAgICAgICAgICBsYWJlbFJvdGF0aW9uOiAwLFxyXG4gICAgICAgICAgICBsYWJlbEFsaWduOiAnbGVmdCcsXHJcbiAgICAgICAgICAgIGxhYmVsRWxsaXBzaXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBsYWJlbEVsbGlwc2lzU2l6ZToxNlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgeUF4aXM6IHtcclxuICAgICAgICAgICAgdGl0bGU6ICcnLFxyXG4gICAgICAgICAgICB3aWR0aDogMCxcclxuICAgICAgICAgICAgaGVpZ2h0OiAwLFxyXG4gICAgICAgICAgICBsYWJlbFJvdGF0aW9uOiAwLFxyXG4gICAgICAgICAgICBsYWJlbEVsbGlwc2lzOiBmYWxzZSxcclxuICAgICAgICAgICAgbGFiZWxFbGxpcHNpc1NpemU6MTZcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxlZ2VuZDoge1xyXG4gICAgICAgICAgICBsYWJlbEVsbGlwc2lzOiBmYWxzZSxcclxuICAgICAgICAgICAgbGFiZWxFbGxpcHNpc1NpemU6MTZcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBsb3RCYWNrZ3JvdW5kOiB7XHJcbiAgICAgICAgICAgIHg6IDAsXHJcbiAgICAgICAgICAgIHk6IDAsXHJcbiAgICAgICAgICAgIGhlaWdodDogMCxcclxuICAgICAgICAgICAgd2lkdGg6IDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBsb3RPcHRpb25zOiB7XHJcbiAgICAgICAgICAgIGdyb3VwQmFyUGFkZGluZzogMjAsXHJcbiAgICAgICAgICAgIGlubmVyQmFyUGFkZGluZzogM1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgIGhlaWdodDogMCxcclxuICAgICAgICAgICAgd2lkdGg6IDBcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgX29wdGlvbnM6IGFueT17fTtcclxuXHJcbiAgICBASW5wdXQoKSBzZXQgb3B0aW9ucyhvYmo6IGFueSkge1xyXG4gICAgICAgIGxldCB4QXhpcz1vYmoueEF4aXM7XHJcbiAgICAgICAgeEF4aXNbJ2xhYmVsRWxsaXBzaXMnXT0ob2JqLnhBeGlzLmxhYmVsRWxsaXBzaXNTaXplIT11bmRlZmluZWQmJm9iai54QXhpcy5sYWJlbEVsbGlwc2lzU2l6ZT4wKT8gdHJ1ZTpmYWxzZTtcclxuXHJcbiAgICAgICAgbGV0IHlBeGlzPW9iai55QXhpcztcclxuICAgICAgICB5QXhpc1snbGFiZWxFbGxpcHNpcyddPShvYmoueUF4aXMubGFiZWxFbGxpcHNpc1NpemUhPXVuZGVmaW5lZCYmb2JqLnlBeGlzLmxhYmVsRWxsaXBzaXNTaXplPjApPyB0cnVlOmZhbHNlO1xyXG5cclxuICAgICAgICBsZXQgbGVnZW5kPW9iai5sZWdlbmQ7XHJcbiAgICAgICAgbGVnZW5kWydsYWJlbEVsbGlwc2lzJ109KG9iai5sZWdlbmQubGFiZWxFbGxpcHNpc1NpemUhPXVuZGVmaW5lZCYmb2JqLmxlZ2VuZC5sYWJlbEVsbGlwc2lzU2l6ZT4wKT8gdHJ1ZTpmYWxzZTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgcGxvdEJhY2tncm91bmQ9b2JqLnBsb3RCYWNrZ3JvdW5kO1xyXG4gICAgICAgIGxldCBwbG90T3B0aW9ucz1vYmoucGxvdE9wdGlvbnM7XHJcbiAgICAgICAgbGV0IGhlYWRlcj1vYmouaGVhZGVyO1xyXG5cclxuICAgICAgICBkZWxldGUgb2JqWyd4QXhpcyddO1xyXG4gICAgICAgIGRlbGV0ZSBvYmpbJ3lBeGlzJ107XHJcbiAgICAgICAgZGVsZXRlIG9ialsnbGVnZW5kJ107XHJcbiAgICAgICAgZGVsZXRlIG9ialsncGxvdEJhY2tncm91bmQnXTtcclxuICAgICAgICBkZWxldGUgb2JqWydwbG90T3B0aW9ucyddO1xyXG4gICAgICAgIGRlbGV0ZSBvYmpbJ2hlYWRlciddO1xyXG5cclxuICAgICAgICB0aGlzLl9vcHRpb25zPXtcclxuICAgICAgICAgICAgLi4udGhpcy5jdXN0b21PcHRpb25zLFxyXG4gICAgICAgICAgICAuLi5vYmosXHJcbiAgICAgICAgICAgIHhBeGlzOiB7XHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLmN1c3RvbU9wdGlvbnMueEF4aXMsXHJcbiAgICAgICAgICAgICAgICAuLi54QXhpc1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB5QXhpczoge1xyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5jdXN0b21PcHRpb25zLnlBeGlzLFxyXG4gICAgICAgICAgICAgICAgLi4ueUF4aXNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbGVnZW5kOnsgXHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLmN1c3RvbU9wdGlvbnMubGVnZW5kLFxyXG4gICAgICAgICAgICAgICAgLi4ubGVnZW5kXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHBsb3RCYWNrZ3JvdW5kOiB7XHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLmN1c3RvbU9wdGlvbnMucGxvdEJhY2tncm91bmQsXHJcbiAgICAgICAgICAgICAgICAuLi5wbG90QmFja2dyb3VuZFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwbG90T3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5jdXN0b21PcHRpb25zLnBsb3RPcHRpb25zLFxyXG4gICAgICAgICAgICAgICAgLi4ucGxvdE9wdGlvbnNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLmN1c3RvbU9wdGlvbnMuaGVhZGVyLFxyXG4gICAgICAgICAgICAgICAgLi4uaGVhZGVyXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuX29wdGlvbnMpXHJcbiAgICB9XHJcbiAgICBnZXQgb3B0aW9ucygpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9vcHRpb25zO1xyXG4gICAgfVxyXG4gICAgQElucHV0KCkgY2F0ZWdvcmllczogYW55PVtdO1xyXG4gICAgQElucHV0KCkgc2VyaWVzOiBhbnk9W107XHJcblxyXG4gICAgZWxlbWVudDogYW55O1xyXG4gICAgLy9ASW5wdXQoKSBncm91cEJhclBhZGRpbmc9MjA7XHJcbiAgICAvL0BJbnB1dCgpIGlubmVyQmFyUGFkZGluZz0zO1xyXG5cclxuICAgIC8vIHNjYWxlOiBhbnk7XHJcbiAgICB4U2NhbGU6IGFueTtcclxuICAgIGlubmVyU2NhbGU6IGFueTtcclxuICAgIHlTY2FsZTogYW55O1xyXG4gICAgYmFyczogYW55PVtdO1xyXG4gICAgZ3JvdXBOYW1lOiBhbnlbXT1bXTtcclxuICAgIGdyb3VwQmFyUGFkZGluZ0JLOiBhbnk7XHJcbiAgICBpbm5lckJhclBhZGRpbmdCSzogYW55O1xyXG4gICAgY29sb3JTY2FsZTogYW55O1xyXG4gICAgdHJpbUxhYmVsOiBhbnk7XHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmLFxyXG4gICAgICAgIHByaXZhdGUgY2hhcnRFbGVtZW50OiBFbGVtZW50UmVmLFxyXG4gICAgICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudD1lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy50cmltTGFiZWwgPSB0cmltTGFiZWw7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZ3JvdXBCYXJQYWRkaW5nQks9dGhpcy5vcHRpb25zLnBsb3RPcHRpb25zLmdyb3VwQmFyUGFkZGluZztcclxuICAgICAgICB0aGlzLmlubmVyQmFyUGFkZGluZ0JLPXRoaXMub3B0aW9ucy5wbG90T3B0aW9ucy5pbm5lckJhclBhZGRpbmc7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnVwZGF0ZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnMud2lkdGg9dGhpcy5vcHRpb25zLndpZHRoO1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy5oZWlnaHQ9dGhpcy5vcHRpb25zLmhlaWdodDtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJ0dHR0dHR0XCIsdGhpcy5vcHRpb25zKVxyXG4gICAgICAgIGNvbnN0IGhvc3RFbGVtPXRoaXMuY2hhcnRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICAgICAgbGV0IGRpbXM9aG9zdEVsZW0ucGFyZW50Tm9kZSE9PW51bGw/IGhvc3RFbGVtLnBhcmVudE5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk6eyBoZWlnaHQ6IDQwMCwgd2lkdGg6IDgwMCB9O1xyXG5cclxuICAgICAgICB2YXIgc3R5bGU9aG9zdEVsZW0ucGFyZW50Tm9kZS5jdXJyZW50U3R5bGV8fHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGhvc3RFbGVtLnBhcmVudE5vZGUpO1xyXG5cclxuICAgICAgICB0aGlzLm9wdGlvbnMuaGVpZ2h0PSF0aGlzLm9wdGlvbnMuaGVpZ2h0PyBkaW1zLmhlaWdodC10aGlzLnN0clRvTnVtYmVyKHN0eWxlLnBhZGRpbmdMZWZ0KS10aGlzLnN0clRvTnVtYmVyKHN0eWxlLnBhZGRpbmdSaWdodCk6dGhpcy5vcHRpb25zLmhlaWdodDtcclxuICAgICAgICB0aGlzLm9wdGlvbnMud2lkdGg9IXRoaXMub3B0aW9ucy53aWR0aD8gZGltcy53aWR0aC10aGlzLnN0clRvTnVtYmVyKHN0eWxlLnBhZGRpbmdMZWZ0KS10aGlzLnN0clRvTnVtYmVyKHN0eWxlLnBhZGRpbmdSaWdodCk6ZGltcy53aWR0aC10aGlzLnN0clRvTnVtYmVyKHN0eWxlLnBhZGRpbmdMZWZ0KS10aGlzLnN0clRvTnVtYmVyKHN0eWxlLnBhZGRpbmdSaWdodCk7XHJcblxyXG4gICAgICAgIHRoaXMuY2FsUGxvdEJhY2tncm91bmQoKVxyXG5cclxuICAgICAgICBsZXQgY291bnRGbGFnPWZhbHNlO1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy5wbG90T3B0aW9ucy5ncm91cEJhclBhZGRpbmc9dGhpcy5ncm91cEJhclBhZGRpbmdCSztcclxuICAgICAgICB0aGlzLm9wdGlvbnMucGxvdE9wdGlvbnMuaW5uZXJCYXJQYWRkaW5nPXRoaXMuaW5uZXJCYXJQYWRkaW5nQks7XHJcbiAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICBpZiAoY291bnRGbGFnPT10cnVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMucGxvdE9wdGlvbnMuZ3JvdXBCYXJQYWRkaW5nLS07XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMucGxvdE9wdGlvbnMuaW5uZXJCYXJQYWRkaW5nPTI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5iYXJUeXBlPT0ndmVydGljYWwnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnhTY2FsZT10aGlzLmdldFhTY2FsZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy55U2NhbGU9dGhpcy5nZXRYU2NhbGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlubmVyU2NhbGU9dGhpcy5nZXRJbm5lclNjYWxlKCk7XHJcbiAgICAgICAgICAgIGNvdW50RmxhZz10cnVlO1xyXG5cclxuICAgICAgICB9IHdoaWxlICh0aGlzLmlubmVyU2NhbGUuYmFuZHdpZHRoKCk8Mik7XHJcbiAgICAgICAgLy8gXHJcblxyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYmFyVHlwZT09J3ZlcnRpY2FsJykge1xyXG4gICAgICAgICAgICB0aGlzLnlTY2FsZT10aGlzLmdldFlTY2FsZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy54U2NhbGU9dGhpcy5nZXRZU2NhbGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjb2xvckhlbHBlcj1uZXcgQ29sb3JIZWxwZXIodGhpcy5vcHRpb25zLCB0aGlzLnNlcmllcyk7XHJcbiAgICAgICAgdGhpcy5jb2xvclNjYWxlPWNvbG9ySGVscGVyLmdlbmVyYXRlQ29sb3JTY2FsZSgpO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5ncm91cE5hbWU9W107XHJcbiAgICAgICAgICAgIHRoaXMuc2VyaWVzLm1hcChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLm5hbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm91cE5hbWUucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGl0ZW0ubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoaXMuY29sb3JTY2FsZShpdGVtLm5hbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQmFyKCk7XHJcblxyXG4gICAgICAgICAgICAvL3NldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gZm9yIChsZXQgaT0wOyBpPHRoaXMuYmFycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKHRoaXMuYmFyc1tpXS5jbGFzc05hbWUpXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdHJhbnNpdGlvbihzZWxlY3QodGhpcy5lbGVtZW50KSkuc2VsZWN0KCcuYmFyMDInKS50cmFuc2l0aW9uKClcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgLmR1cmF0aW9uKDUwMClcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgLmF0dHIoJ3dpZHRoJywgdGhpcy5iYXJzW2ldLndpZHRoKTtcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgLy99LDEwMDApXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRYU2NhbGUoKTogYW55IHtcclxuXHJcbiAgICAgICAgbGV0IHNwYWNpbmc7XHJcbiAgICAgICAgbGV0IHJhbmdlO1xyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYmFyVHlwZT09J3ZlcnRpY2FsJykge1xyXG4gICAgICAgICAgICBzcGFjaW5nPSh0aGlzLmNhdGVnb3JpZXMubGVuZ3RoLyh0aGlzLm9wdGlvbnMucGxvdEJhY2tncm91bmQud2lkdGgvdGhpcy5vcHRpb25zLnBsb3RPcHRpb25zLmdyb3VwQmFyUGFkZGluZykpO1xyXG4gICAgICAgICAgICByYW5nZT1bMCwgdGhpcy5vcHRpb25zLnBsb3RCYWNrZ3JvdW5kLndpZHRoXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBsZW5ndGg9dGhpcy5vcHRpb25zLmhlaWdodC10aGlzLm9wdGlvbnMuaGVhZGVyLmhlaWdodDtcclxuICAgICAgICAgICAgc3BhY2luZz0odGhpcy5jYXRlZ29yaWVzLmxlbmd0aC8odGhpcy5vcHRpb25zLnBsb3RCYWNrZ3JvdW5kLmhlaWdodC90aGlzLm9wdGlvbnMucGxvdE9wdGlvbnMuZ3JvdXBCYXJQYWRkaW5nKSk7XHJcbiAgICAgICAgICAgIHJhbmdlPVswLCB0aGlzLm9wdGlvbnMucGxvdEJhY2tncm91bmQuaGVpZ2h0XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNjYWxlQmFuZCgpXHJcbiAgICAgICAgICAgIC5yYW5nZShyYW5nZSlcclxuICAgICAgICAgICAgLnBhZGRpbmdJbm5lcihzcGFjaW5nKVxyXG4gICAgICAgICAgICAucGFkZGluZ091dGVyKDAuMSlcclxuICAgICAgICAgICAgLmRvbWFpbih0aGlzLmNhdGVnb3JpZXMpO1xyXG4gICAgfVxyXG4gICAgZ2V0SW5uZXJTY2FsZSgpOiBhbnkge1xyXG5cclxuICAgICAgICBsZXQgZ3JvdXBEYXRhQXJyPVtdO1xyXG4gICAgICAgIGZvciAobGV0IGk9MDsgaTx0aGlzLnNlcmllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBncm91cERhdGFBcnIucHVzaCh0aGlzLnNlcmllc1tpXS5uYW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzcGFjaW5nO1xyXG4gICAgICAgIGxldCByYW5nZTtcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmJhclR5cGU9PSd2ZXJ0aWNhbCcpIHtcclxuICAgICAgICAgICAgc3BhY2luZz0odGhpcy5zZXJpZXMubGVuZ3RoLyh0aGlzLnhTY2FsZS5iYW5kd2lkdGgoKS90aGlzLm9wdGlvbnMucGxvdE9wdGlvbnMuaW5uZXJCYXJQYWRkaW5nKSk7XHJcbiAgICAgICAgICAgIHJhbmdlPXRoaXMueFNjYWxlLmJhbmR3aWR0aCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgc3BhY2luZz0odGhpcy5zZXJpZXMubGVuZ3RoLyh0aGlzLnlTY2FsZS5iYW5kd2lkdGgoKS90aGlzLm9wdGlvbnMucGxvdE9wdGlvbnMuaW5uZXJCYXJQYWRkaW5nKSk7XHJcbiAgICAgICAgICAgIHJhbmdlPXRoaXMueVNjYWxlLmJhbmR3aWR0aCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNjYWxlQmFuZCgpXHJcbiAgICAgICAgICAgIC5yYW5nZShbMCwgcmFuZ2VdKVxyXG4gICAgICAgICAgICAucGFkZGluZ0lubmVyKHNwYWNpbmcpXHJcbiAgICAgICAgICAgIC5kb21haW4oZ3JvdXBEYXRhQXJyKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRZU2NhbGUoKTogYW55IHtcclxuICAgICAgICBsZXQgdW5pcXVlVmFsdWU6IGFueT1uZXcgU2V0KCk7XHJcbiAgICAgICAgdGhpcy5zZXJpZXMubWFwKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGl0ZW0uZGF0YS5tYXAoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB1bmlxdWVWYWx1ZS5hZGQodmFsdWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IG1pbj1NYXRoLm1pbiguLi51bmlxdWVWYWx1ZSk7XHJcbiAgICAgICAgbWluPW1pbj4wPyAwOm1pbjtcclxuXHJcbiAgICAgICAgbGV0IG1heD1NYXRoLm1heCgwLCAuLi51bmlxdWVWYWx1ZSk7XHJcbiAgICAgICAgbWF4PW1heD4wPyBtYXg6MDtcclxuXHJcbiAgICAgICAgbGV0IHJhbmdlPVtdO1xyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYmFyVHlwZT09J3ZlcnRpY2FsJykge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWU9dGhpcy5vcHRpb25zLnBsb3RCYWNrZ3JvdW5kLmhlaWdodDtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJiYXIgZ2V0WVNjYWxlXCIsdmFsdWUpXHJcbiAgICAgICAgICAgIHJhbmdlPVt2YWx1ZSwgMF07XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiYmFyIGdldFlTY2FsZSAtIFwiLCByYW5nZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZT10aGlzLm9wdGlvbnMucGxvdEJhY2tncm91bmQud2lkdGgtMzA7XHJcbiAgICAgICAgICAgIHJhbmdlPVswLCB2YWx1ZV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImJhciBnZXRZU2NhbGUgLS0tIFwiLCByYW5nZSwgbWluLCBtYXgpXHJcblxyXG4gICAgICAgIHJldHVybiBzY2FsZUxpbmVhcigpXHJcbiAgICAgICAgICAgIC5yYW5nZShyYW5nZSlcclxuICAgICAgICAgICAgLmRvbWFpbihbbWluLCBtYXhdKTtcclxuICAgICAgICAvL3JldHVybiB0aGlzLnNjYWxlLm5pY2UoKS50aWNrcygpO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbFBsb3RCYWNrZ3JvdW5kKCkge1xyXG4gICAgICAgIHRoaXMub3B0aW9ucz17XHJcbiAgICAgICAgICAgIC4uLnRoaXMub3B0aW9ucyxcclxuICAgICAgICAgICAgcGxvdEJhY2tncm91bmQ6IHtcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMub3B0aW9ucy5wbG90QmFja2dyb3VuZCxcclxuICAgICAgICAgICAgICAgIHg6IDAsXHJcbiAgICAgICAgICAgICAgICB5OiAwLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLm9wdGlvbnMuaGVpZ2h0LXRoaXMub3B0aW9ucy54QXhpcy5oZWlnaHQtdGhpcy5vcHRpb25zLmhlYWRlci5oZWlnaHQtdGhpcy5vcHRpb25zLnBhZGRpbmcsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy5vcHRpb25zLndpZHRoLXRoaXMub3B0aW9ucy55QXhpcy53aWR0aC10aGlzLm9wdGlvbnMucGFkZGluZ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiY2FsUGxvdEJhY2tncm91bmRcIiwgSlNPTi5zdHJpbmdpZnkodGhpcy5vcHRpb25zKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlQmFyKCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJ0aGlzLmlubmVyU2NhbGUuYmFuZHdpZHRoKCkgXCIrdGhpcy5pbm5lclNjYWxlLmJhbmR3aWR0aCgpKVxyXG4gICAgICAgIHRoaXMuYmFycz1bXTtcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmJhclR5cGU9PSd2ZXJ0aWNhbCcpIHtcclxuICAgICAgICAgICAgdGhpcy5jYXRlZ29yaWVzLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGk9MDsgaTx0aGlzLnNlcmllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhcjogYW55PXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGl0ZW0sICAvL2phbixmZWJcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhpcy5zZXJpZXNbaV0uZGF0YVtpbmRleF0sIC8vMTAxLDIwMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cDogdGhpcy5zZXJpZXNbaV0ubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoaXMuY29sb3JTY2FsZSh0aGlzLnNlcmllc1tpXS5uYW1lKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9mb3JtYXR0ZWRMYWJlbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHRoaXMuaW5uZXJTY2FsZS5iYW5kd2lkdGgoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLnNlcmllc1tpXS5kYXRhW2luZGV4XT4wPyAodGhpcy55U2NhbGUoMCktdGhpcy55U2NhbGUodGhpcy5zZXJpZXNbaV0uZGF0YVtpbmRleF0pKToodGhpcy55U2NhbGUodGhpcy5zZXJpZXNbaV0uZGF0YVtpbmRleF0pLXRoaXMueVNjYWxlKDApKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeDogdGhpcy5pbm5lclNjYWxlKHRoaXMuc2VyaWVzW2ldLm5hbWUpK3RoaXMueFNjYWxlKGl0ZW0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiB0aGlzLnNlcmllc1tpXS5kYXRhW2luZGV4XT4wPyB0aGlzLnlTY2FsZSh0aGlzLnNlcmllc1tpXS5kYXRhW2luZGV4XSk6dGhpcy55U2NhbGUoMCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ2ZXJ0aWNhbF9iYXJcIlxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXJzLnB1c2goYmFyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNhdGVnb3JpZXMubWFwKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaT0wOyBpPHRoaXMuc2VyaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFyOiBhbnk9e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogaXRlbSwgIC8vamFuLGZlYlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLnNlcmllc1tpXS5kYXRhW2luZGV4XSwgLy8xMDEsMjAyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwOiB0aGlzLnNlcmllc1tpXS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhpcy5jb2xvclNjYWxlKHRoaXMuc2VyaWVzW2ldLm5hbWUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2Zvcm1hdHRlZExhYmVsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy5zZXJpZXNbaV0uZGF0YVtpbmRleF0+MD8gKHRoaXMueFNjYWxlKHRoaXMuc2VyaWVzW2ldLmRhdGFbaW5kZXhdKS10aGlzLnhTY2FsZSgwKSk6KHRoaXMueFNjYWxlKDApLXRoaXMueFNjYWxlKHRoaXMuc2VyaWVzW2ldLmRhdGFbaW5kZXhdKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogdGhpcy5pbm5lclNjYWxlLmJhbmR3aWR0aCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB4OiB0aGlzLnNlcmllc1tpXS5kYXRhW2luZGV4XT4wPyB0aGlzLnhTY2FsZSgwKTp0aGlzLnhTY2FsZSh0aGlzLnNlcmllc1tpXS5kYXRhW2luZGV4XSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IHRoaXMuaW5uZXJTY2FsZSh0aGlzLnNlcmllc1tpXS5uYW1lKSt0aGlzLnlTY2FsZShpdGVtKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImhvcml6b250YWxfYmFyXCJcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmFycy5wdXNoKGJhcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgeUF4aXNXaWR0aENoYW5nZSh7IHlBeGlzV2lkdGgsIHlBeGlzSGVpZ2h0LCAgeUF4aXNSaWdodFdpZHRoIH0pIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwieUF4aXNXaWR0aCBcIit5QXhpc1dpZHRoKVxyXG4gICAgICAgIHRoaXMub3B0aW9ucz17XHJcbiAgICAgICAgICAgIC4uLnRoaXMub3B0aW9ucyxcclxuICAgICAgICAgICAgeUF4aXM6IHtcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMub3B0aW9ucy55QXhpcyxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiB5QXhpc1dpZHRoLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiB5QXhpc0hlaWdodFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY29uc29sZS5sb2coIHRoaXMub3B0aW9ucylcclxuICAgICAgICB0aGlzLnVwZGF0ZSgpXHJcbiAgICB9XHJcblxyXG4gICAgeEF4aXNIZWlnaHRDaGFuZ2UoeyB4QXhpc0hlaWdodCB9KSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zPXtcclxuICAgICAgICAgICAgLi4udGhpcy5vcHRpb25zLFxyXG4gICAgICAgICAgICB4QXhpczoge1xyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5vcHRpb25zLnhBeGlzLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiB4QXhpc0hlaWdodFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJ4QXhpc0hlaWdodENoYW5nZVwiLCB4QXhpc0hlaWdodCwgSlNPTi5zdHJpbmdpZnkodGhpcy5vcHRpb25zLnhBeGlzKSk7XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKVxyXG4gICAgfVxyXG4gICAgaGVhZGVySGVpZ2h0Q2hhbmdlKHsgaGVhZGVySGVpZ2h0IH0pIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnM9e1xyXG4gICAgICAgICAgICAuLi50aGlzLm9wdGlvbnMsXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5vcHRpb25zLmhlYWRlcixcclxuICAgICAgICAgICAgICAgIGhlaWdodDogaGVhZGVySGVpZ2h0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICB0b29sVGlwUGxhY2NlbWVudChkYXRhKSB7XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5iYXJUeXBlPT0ndmVydGljYWwnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhPjA/ICd0b3AnOidib3R0b20nXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0YT4wPyAncmlnaHQnOidsZWZ0J1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnLCBbJyRldmVudCddKVxyXG4gICAgb25SZXNpemUoZXZlbnQpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwid2luZG93OnJlc2l6ZVwiKVxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy51cGRhdGUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Vmlld0JveCgpIHtcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLndpZHRoPjAmJnRoaXMub3B0aW9ucy5oZWlnaHQ+MClcclxuICAgICAgICAgICAgcmV0dXJuICcwIDAgJyt0aGlzLm9wdGlvbnMud2lkdGgrJyAnK3RoaXMub3B0aW9ucy5oZWlnaHQ7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gJzAgMCAwIDAnO1xyXG4gICAgfVxyXG4gICAgXHJcblxyXG5cclxuXHJcbiAgICBwcml2YXRlIHN0clRvTnVtYmVyKHN0cikge1xyXG4gICAgICAgIGxldCBudW1iZXJQYXR0ZXJuPS9cXGQrL2c7XHJcbiAgICAgICAgbGV0IG51bT1zdHIubWF0Y2gobnVtYmVyUGF0dGVybikuam9pbignJylcclxuICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChudW0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==