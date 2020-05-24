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
        var yAxisWidth = _a.yAxisWidth, yAxisHeight = _a.yAxisHeight;
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
                    template: "<div [style.width]=\"options.width+'px'\" [style.border]=\"'1px solid #f3f3f3'\">\r\n\r\n\r\n    <svg version=\"1.1\" class=\"highcharts-root\" [attr.padding]=\"options.padding\" [attr.width]=\"options.width\"\r\n        [attr.height]=\"options.height\" [attr.viewBox]=\"'0 0 '+options.width +' '+ options.height\"\r\n        aria-label=\"Interactive chart\" [style.border]=\"'0px solid gray'\" [style.padding]=\"options.padding\"\r\n        aria-hidden=\"false\">\r\n\r\n        <g header [options]=\"options\" (headerHeightChange)=\"headerHeightChange($event)\"></g>\r\n\r\n        <g y-axis \r\n            [xScale]=\"xScale\" \r\n            [yScale]=\"yScale\" \r\n            [options]=\"options\" \r\n            [categories]=\"categories\" \r\n            [series]=\"series\"\r\n            (yAxisWidthChange)=\"yAxisWidthChange($event)\"></g>\r\n\r\n        <g x-axis \r\n            [xScale]=\"xScale\" \r\n            [yScale]=\"yScale\" \r\n            [options]=\"options\" \r\n            [categories]=\"categories\" \r\n            [series]=\"series\"\r\n            (xAxisHeightChange)=\"xAxisHeightChange($event)\"></g>\r\n\r\n        <g data-z-index=\"0.1\" >\r\n            <rect *ngFor=\"let bar of bars\" \r\n                [attr.class]=\"bar.className\"\r\n                [attr.x]=\"bar.x+this.options.yAxis.width\"\r\n                [tooltip]=\"bar.value+', '+bar.group+', '+bar.data\" \r\n                [placement]=\"toolTipPlaccement(bar.data)\" \r\n                delay=\"10\"\r\n                [attr.y]=\"bar.y+this.options.header.height\" \r\n                [attr.width]=\"bar.width\" [attr.height]=\"bar.height\"\r\n                [attr.fill]=\"bar.color\" opacity=\"1\"  tabindex=\"-1\" role=\"img\"\r\n                aria-label=\"1. Jan, 49.9. Tokyo.\"></rect>\r\n        </g>\r\n    </svg>\r\n    <chart-legend\r\n        *ngIf=\"groupName.length\"\r\n        [groupName]=\"groupName\"\r\n        [options]=\"options\"\r\n        [series] = \"series\"    \r\n    >\r\n    </chart-legend>\r\n  \r\n</div>\r\n\r\n",
                    // changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styles: [".tooltip-example{text-align:center;padding:0 50px}.tooltip-example [tooltip]{display:inline-block;margin:50px 20px;width:180px;height:50px;border:1px solid gray;border-radius:5px;line-height:50px;text-align:center}.ng-tooltip{position:absolute;max-width:150px;font-size:14px;text-align:center;color:#fafae3;padding:3px 8px;background:#282a36;border-radius:4px;z-index:1000;opacity:0}.ng-tooltip:after{content:\"\";position:absolute;border-style:solid}.ng-tooltip-top:after{top:100%;left:50%;margin-left:-5px;border-width:5px;border-color:#000 transparent transparent}.ng-tooltip-bottom:after{bottom:100%;left:50%;margin-left:-5px;border-width:5px;border-color:transparent transparent #000}.ng-tooltip-left:after{top:50%;left:100%;margin-top:-5px;border-width:5px;border-color:transparent transparent transparent #000}.ng-tooltip-right:after{top:50%;right:100%;margin-top:-5px;border-width:5px;border-color:transparent #000 transparent transparent}.ng-tooltip-show{opacity:1}.horizontal_bar{-webkit-animation:1s linear forwards horizontal_bar_frames;animation:1s linear forwards horizontal_bar_frames}@-webkit-keyframes horizontal_bar_frames{from{width:0}}@keyframes horizontal_bar_frames{from{width:0}}.vertical_bar{-webkit-animation:.5s linear forwards vertical_bar_frames;animation:.5s linear forwards vertical_bar_frames}@-webkit-keyframes vertical_bar_frames{from{height:0}}@keyframes vertical_bar_frames{from{height:0}}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNoYXJ0cy1iYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHR1c2hhcmdob3NoYmQvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtY2hhcnRzLWJhci9uZ3gtY2hhcnRzLWJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULEtBQUssRUFDTCxpQkFBaUIsRUFJakIsVUFBVSxFQUNWLGlCQUFpQixFQUVqQixZQUFZLEVBQ2YsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDbEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUd2RDtJQXdISSwrQkFBWSxPQUFtQixFQUNuQixZQUF3QixFQUN4QixHQUFzQjtRQUR0QixpQkFBWSxHQUFaLFlBQVksQ0FBWTtRQUN4QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQWhIMUIsa0JBQWEsR0FBQztZQUNsQixPQUFPLEVBQUUsVUFBVTtZQUNuQixLQUFLLEVBQUUsRUFBRTtZQUNULFFBQVEsRUFBRSxFQUFFO1lBQ1osTUFBTSxFQUFFLENBQUM7WUFDVCxLQUFLLEVBQUUsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDO1lBQ1YsS0FBSyxFQUFFO2dCQUNILEtBQUssRUFBRSxFQUFFO2dCQUNULE1BQU0sRUFBRSxDQUFDO2dCQUNULGFBQWEsRUFBRSxDQUFDO2dCQUNoQixVQUFVLEVBQUUsTUFBTTtnQkFDbEIsYUFBYSxFQUFFLEtBQUs7Z0JBQ3BCLGlCQUFpQixFQUFDLEVBQUU7YUFDdkI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsYUFB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aW1wb3J0IHtcclxuICAgIENvbXBvbmVudCxcclxuICAgIElucHV0LFxyXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXHJcbiAgICBPbkNoYW5nZXMsXHJcbiAgICBPbkluaXQsXHJcbiAgICBTaW1wbGVDaGFuZ2VzLFxyXG4gICAgRWxlbWVudFJlZixcclxuICAgIENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgICBIb3N0TGlzdGVuZXJcclxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBzZWxlY3QgfSBmcm9tICdkMy1zZWxlY3Rpb24nO1xyXG5pbXBvcnQgeyB0cmFuc2l0aW9uIH0gZnJvbSAnZDMtdHJhbnNpdGlvbic7XHJcbmltcG9ydCB7IHNjYWxlQmFuZCwgc2NhbGVMaW5lYXIgfSBmcm9tIFwiZDMtc2NhbGVcIjtcclxuaW1wb3J0IHsgQ29sb3JIZWxwZXIgfSBmcm9tICcuLi91dGlscy9jb2xvci5oZWxwZXInO1xyXG5pbXBvcnQgeyB0cmltTGFiZWwgfSBmcm9tICcuLi91dGlscy90cmltLWxhYmVsLmhlbHBlcic7XHJcbmltcG9ydCB7IENsYXNzR2V0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXIvc3JjL291dHB1dC9vdXRwdXRfYXN0JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibmd4LWNoYXJ0cy1iYXJcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbmd4LWNoYXJ0cy1iYXIuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi9uZ3gtY2hhcnRzLWJhci5jb21wb25lbnQuY3NzXCJdLFxyXG4gICAgLy8gY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3Mgbmd4Q2hhcnRzQmFyQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQge1xyXG5cclxuICAgIHByaXZhdGUgY3VzdG9tT3B0aW9ucz17XHJcbiAgICAgICAgYmFyVHlwZTogJ3ZlcnRpY2FsJyxcclxuICAgICAgICB0aXRsZTogJycsXHJcbiAgICAgICAgc3VidGl0bGU6ICcnLFxyXG4gICAgICAgIGhlaWdodDogMCxcclxuICAgICAgICB3aWR0aDogMCxcclxuICAgICAgICBwYWRkaW5nOiA1LFxyXG4gICAgICAgIHhBeGlzOiB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnJyxcclxuICAgICAgICAgICAgaGVpZ2h0OiAwLFxyXG4gICAgICAgICAgICBsYWJlbFJvdGF0aW9uOiAwLFxyXG4gICAgICAgICAgICBsYWJlbEFsaWduOiAnbGVmdCcsXHJcbiAgICAgICAgICAgIGxhYmVsRWxsaXBzaXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBsYWJlbEVsbGlwc2lzU2l6ZToxNlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgeUF4aXM6IHtcclxuICAgICAgICAgICAgdGl0bGU6ICcnLFxyXG4gICAgICAgICAgICB3aWR0aDogMCxcclxuICAgICAgICAgICAgaGVpZ2h0OiAwLFxyXG4gICAgICAgICAgICBsYWJlbFJvdGF0aW9uOiAwLFxyXG4gICAgICAgICAgICBsYWJlbEVsbGlwc2lzOiBmYWxzZSxcclxuICAgICAgICAgICAgbGFiZWxFbGxpcHNpc1NpemU6MTZcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxlZ2VuZDoge1xyXG4gICAgICAgICAgICBsYWJlbEVsbGlwc2lzOiBmYWxzZSxcclxuICAgICAgICAgICAgbGFiZWxFbGxpcHNpc1NpemU6MTZcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBsb3RCYWNrZ3JvdW5kOiB7XHJcbiAgICAgICAgICAgIHg6IDAsXHJcbiAgICAgICAgICAgIHk6IDAsXHJcbiAgICAgICAgICAgIGhlaWdodDogMCxcclxuICAgICAgICAgICAgd2lkdGg6IDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBsb3RPcHRpb25zOiB7XHJcbiAgICAgICAgICAgIGdyb3VwQmFyUGFkZGluZzogMjAsXHJcbiAgICAgICAgICAgIGlubmVyQmFyUGFkZGluZzogM1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgIGhlaWdodDogMCxcclxuICAgICAgICAgICAgd2lkdGg6IDBcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgX29wdGlvbnM6IGFueT17fTtcclxuXHJcbiAgICBASW5wdXQoKSBzZXQgb3B0aW9ucyhvYmo6IGFueSkge1xyXG4gICAgICAgIGxldCB4QXhpcz1vYmoueEF4aXM7XHJcbiAgICAgICAgbGV0IHlBeGlzPW9iai55QXhpcztcclxuICAgICAgICBsZXQgbGVnZW5kPW9iai5sZWdlbmQ7XHJcbiAgICAgICAgbGV0IHBsb3RCYWNrZ3JvdW5kPW9iai5wbG90QmFja2dyb3VuZDtcclxuICAgICAgICBsZXQgcGxvdE9wdGlvbnM9b2JqLnBsb3RPcHRpb25zO1xyXG4gICAgICAgIGxldCBoZWFkZXI9b2JqLmhlYWRlcjtcclxuXHJcbiAgICAgICAgZGVsZXRlIG9ialsneEF4aXMnXTtcclxuICAgICAgICBkZWxldGUgb2JqWyd5QXhpcyddO1xyXG4gICAgICAgIGRlbGV0ZSBvYmpbJ2xlZ2VuZCddO1xyXG4gICAgICAgIGRlbGV0ZSBvYmpbJ3Bsb3RCYWNrZ3JvdW5kJ107XHJcbiAgICAgICAgZGVsZXRlIG9ialsncGxvdE9wdGlvbnMnXTtcclxuICAgICAgICBkZWxldGUgb2JqWydoZWFkZXInXTtcclxuXHJcbiAgICAgICAgdGhpcy5fb3B0aW9ucz17XHJcbiAgICAgICAgICAgIC4uLnRoaXMuY3VzdG9tT3B0aW9ucyxcclxuICAgICAgICAgICAgLi4ub2JqLFxyXG4gICAgICAgICAgICB4QXhpczoge1xyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5jdXN0b21PcHRpb25zLnhBeGlzLFxyXG4gICAgICAgICAgICAgICAgLi4ueEF4aXNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgeUF4aXM6IHtcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMuY3VzdG9tT3B0aW9ucy55QXhpcyxcclxuICAgICAgICAgICAgICAgIC4uLnlBeGlzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGxlZ2VuZDp7IFxyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5jdXN0b21PcHRpb25zLmxlZ2VuZCxcclxuICAgICAgICAgICAgICAgIC4uLmxlZ2VuZFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwbG90QmFja2dyb3VuZDoge1xyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5jdXN0b21PcHRpb25zLnBsb3RCYWNrZ3JvdW5kLFxyXG4gICAgICAgICAgICAgICAgLi4ucGxvdEJhY2tncm91bmRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcGxvdE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMuY3VzdG9tT3B0aW9ucy5wbG90T3B0aW9ucyxcclxuICAgICAgICAgICAgICAgIC4uLnBsb3RPcHRpb25zXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5jdXN0b21PcHRpb25zLmhlYWRlcixcclxuICAgICAgICAgICAgICAgIC4uLmhlYWRlclxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLl9vcHRpb25zKVxyXG4gICAgfVxyXG4gICAgZ2V0IG9wdGlvbnMoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fb3B0aW9ucztcclxuICAgIH1cclxuICAgIEBJbnB1dCgpIGNhdGVnb3JpZXM6IGFueT1bXTtcclxuICAgIEBJbnB1dCgpIHNlcmllczogYW55PVtdO1xyXG5cclxuICAgIGVsZW1lbnQ6IGFueTtcclxuICAgIC8vQElucHV0KCkgZ3JvdXBCYXJQYWRkaW5nPTIwO1xyXG4gICAgLy9ASW5wdXQoKSBpbm5lckJhclBhZGRpbmc9MztcclxuXHJcbiAgICAvLyBzY2FsZTogYW55O1xyXG4gICAgeFNjYWxlOiBhbnk7XHJcbiAgICBpbm5lclNjYWxlOiBhbnk7XHJcbiAgICB5U2NhbGU6IGFueTtcclxuICAgIGJhcnM6IGFueT1bXTtcclxuICAgIGdyb3VwTmFtZTogYW55W109W107XHJcbiAgICBncm91cEJhclBhZGRpbmdCSzogYW55O1xyXG4gICAgaW5uZXJCYXJQYWRkaW5nQks6IGFueTtcclxuICAgIGNvbG9yU2NhbGU6IGFueTtcclxuICAgIHRyaW1MYWJlbDogYW55O1xyXG4gICAgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudFJlZixcclxuICAgICAgICBwcml2YXRlIGNoYXJ0RWxlbWVudDogRWxlbWVudFJlZixcclxuICAgICAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnQ9ZWxlbWVudC5uYXRpdmVFbGVtZW50O1xyXG4gICAgICAgIHRoaXMudHJpbUxhYmVsID0gdHJpbUxhYmVsO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmdyb3VwQmFyUGFkZGluZ0JLPXRoaXMub3B0aW9ucy5wbG90T3B0aW9ucy5ncm91cEJhclBhZGRpbmc7XHJcbiAgICAgICAgdGhpcy5pbm5lckJhclBhZGRpbmdCSz10aGlzLm9wdGlvbnMucGxvdE9wdGlvbnMuaW5uZXJCYXJQYWRkaW5nO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy51cGRhdGUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLndpZHRoPXRoaXMub3B0aW9ucy53aWR0aDtcclxuICAgICAgICB0aGlzLm9wdGlvbnMuaGVpZ2h0PXRoaXMub3B0aW9ucy5oZWlnaHQ7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwidHR0dHR0dFwiLHRoaXMub3B0aW9ucylcclxuICAgICAgICBjb25zdCBob3N0RWxlbT10aGlzLmNoYXJ0RWxlbWVudC5uYXRpdmVFbGVtZW50O1xyXG4gICAgICAgIGxldCBkaW1zPWhvc3RFbGVtLnBhcmVudE5vZGUhPT1udWxsPyBob3N0RWxlbS5wYXJlbnROb2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpOnsgaGVpZ2h0OiA0MDAsIHdpZHRoOiA4MDAgfTtcclxuXHJcbiAgICAgICAgdmFyIHN0eWxlPWhvc3RFbGVtLnBhcmVudE5vZGUuY3VycmVudFN0eWxlfHx3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShob3N0RWxlbS5wYXJlbnROb2RlKTtcclxuXHJcbiAgICAgICAgdGhpcy5vcHRpb25zLmhlaWdodD0hdGhpcy5vcHRpb25zLmhlaWdodD8gZGltcy5oZWlnaHQtdGhpcy5zdHJUb051bWJlcihzdHlsZS5wYWRkaW5nTGVmdCktdGhpcy5zdHJUb051bWJlcihzdHlsZS5wYWRkaW5nUmlnaHQpOnRoaXMub3B0aW9ucy5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLndpZHRoPSF0aGlzLm9wdGlvbnMud2lkdGg/IGRpbXMud2lkdGgtdGhpcy5zdHJUb051bWJlcihzdHlsZS5wYWRkaW5nTGVmdCktdGhpcy5zdHJUb051bWJlcihzdHlsZS5wYWRkaW5nUmlnaHQpOmRpbXMud2lkdGgtdGhpcy5zdHJUb051bWJlcihzdHlsZS5wYWRkaW5nTGVmdCktdGhpcy5zdHJUb051bWJlcihzdHlsZS5wYWRkaW5nUmlnaHQpO1xyXG5cclxuICAgICAgICB0aGlzLmNhbFBsb3RCYWNrZ3JvdW5kKClcclxuXHJcbiAgICAgICAgbGV0IGNvdW50RmxhZz1mYWxzZTtcclxuICAgICAgICB0aGlzLm9wdGlvbnMucGxvdE9wdGlvbnMuZ3JvdXBCYXJQYWRkaW5nPXRoaXMuZ3JvdXBCYXJQYWRkaW5nQks7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLnBsb3RPcHRpb25zLmlubmVyQmFyUGFkZGluZz10aGlzLmlubmVyQmFyUGFkZGluZ0JLO1xyXG4gICAgICAgIGRvIHtcclxuICAgICAgICAgICAgaWYgKGNvdW50RmxhZz09dHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLnBsb3RPcHRpb25zLmdyb3VwQmFyUGFkZGluZy0tO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLnBsb3RPcHRpb25zLmlubmVyQmFyUGFkZGluZz0yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYmFyVHlwZT09J3ZlcnRpY2FsJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy54U2NhbGU9dGhpcy5nZXRYU2NhbGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMueVNjYWxlPXRoaXMuZ2V0WFNjYWxlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pbm5lclNjYWxlPXRoaXMuZ2V0SW5uZXJTY2FsZSgpO1xyXG4gICAgICAgICAgICBjb3VudEZsYWc9dHJ1ZTtcclxuXHJcbiAgICAgICAgfSB3aGlsZSAodGhpcy5pbm5lclNjYWxlLmJhbmR3aWR0aCgpPDIpO1xyXG4gICAgICAgIC8vIFxyXG5cclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmJhclR5cGU9PSd2ZXJ0aWNhbCcpIHtcclxuICAgICAgICAgICAgdGhpcy55U2NhbGU9dGhpcy5nZXRZU2NhbGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMueFNjYWxlPXRoaXMuZ2V0WVNjYWxlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY29sb3JIZWxwZXI9bmV3IENvbG9ySGVscGVyKHRoaXMub3B0aW9ucywgdGhpcy5zZXJpZXMpO1xyXG4gICAgICAgIHRoaXMuY29sb3JTY2FsZT1jb2xvckhlbHBlci5nZW5lcmF0ZUNvbG9yU2NhbGUoKTtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBOYW1lPVtdO1xyXG4gICAgICAgICAgICB0aGlzLnNlcmllcy5tYXAoaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5uYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXBOYW1lLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBpdGVtLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB0aGlzLmNvbG9yU2NhbGUoaXRlbS5uYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUJhcigpO1xyXG5cclxuICAgICAgICAgICAgLy9zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIGZvciAobGV0IGk9MDsgaTx0aGlzLmJhcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZyh0aGlzLmJhcnNbaV0uY2xhc3NOYW1lKVxyXG4gICAgICAgICAgICAgICAgLy8gICAgIHRyYW5zaXRpb24oc2VsZWN0KHRoaXMuZWxlbWVudCkpLnNlbGVjdCgnLmJhcjAyJykudHJhbnNpdGlvbigpXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIC5kdXJhdGlvbig1MDApXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHRoaXMuYmFyc1tpXS53aWR0aCk7XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIC8vfSwxMDAwKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0WFNjYWxlKCk6IGFueSB7XHJcblxyXG4gICAgICAgIGxldCBzcGFjaW5nO1xyXG4gICAgICAgIGxldCByYW5nZTtcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmJhclR5cGU9PSd2ZXJ0aWNhbCcpIHtcclxuICAgICAgICAgICAgc3BhY2luZz0odGhpcy5jYXRlZ29yaWVzLmxlbmd0aC8odGhpcy5vcHRpb25zLnBsb3RCYWNrZ3JvdW5kLndpZHRoL3RoaXMub3B0aW9ucy5wbG90T3B0aW9ucy5ncm91cEJhclBhZGRpbmcpKTtcclxuICAgICAgICAgICAgcmFuZ2U9WzAsIHRoaXMub3B0aW9ucy5wbG90QmFja2dyb3VuZC53aWR0aF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgbGVuZ3RoPXRoaXMub3B0aW9ucy5oZWlnaHQtdGhpcy5vcHRpb25zLmhlYWRlci5oZWlnaHQ7XHJcbiAgICAgICAgICAgIHNwYWNpbmc9KHRoaXMuY2F0ZWdvcmllcy5sZW5ndGgvKHRoaXMub3B0aW9ucy5wbG90QmFja2dyb3VuZC5oZWlnaHQvdGhpcy5vcHRpb25zLnBsb3RPcHRpb25zLmdyb3VwQmFyUGFkZGluZykpO1xyXG4gICAgICAgICAgICByYW5nZT1bMCwgdGhpcy5vcHRpb25zLnBsb3RCYWNrZ3JvdW5kLmhlaWdodF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzY2FsZUJhbmQoKVxyXG4gICAgICAgICAgICAucmFuZ2UocmFuZ2UpXHJcbiAgICAgICAgICAgIC5wYWRkaW5nSW5uZXIoc3BhY2luZylcclxuICAgICAgICAgICAgLnBhZGRpbmdPdXRlcigwLjEpXHJcbiAgICAgICAgICAgIC5kb21haW4odGhpcy5jYXRlZ29yaWVzKTtcclxuICAgIH1cclxuICAgIGdldElubmVyU2NhbGUoKTogYW55IHtcclxuXHJcbiAgICAgICAgbGV0IGdyb3VwRGF0YUFycj1bXTtcclxuICAgICAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy5zZXJpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZ3JvdXBEYXRhQXJyLnB1c2godGhpcy5zZXJpZXNbaV0ubmFtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc3BhY2luZztcclxuICAgICAgICBsZXQgcmFuZ2U7XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5iYXJUeXBlPT0ndmVydGljYWwnKSB7XHJcbiAgICAgICAgICAgIHNwYWNpbmc9KHRoaXMuc2VyaWVzLmxlbmd0aC8odGhpcy54U2NhbGUuYmFuZHdpZHRoKCkvdGhpcy5vcHRpb25zLnBsb3RPcHRpb25zLmlubmVyQmFyUGFkZGluZykpO1xyXG4gICAgICAgICAgICByYW5nZT10aGlzLnhTY2FsZS5iYW5kd2lkdGgoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHNwYWNpbmc9KHRoaXMuc2VyaWVzLmxlbmd0aC8odGhpcy55U2NhbGUuYmFuZHdpZHRoKCkvdGhpcy5vcHRpb25zLnBsb3RPcHRpb25zLmlubmVyQmFyUGFkZGluZykpO1xyXG4gICAgICAgICAgICByYW5nZT10aGlzLnlTY2FsZS5iYW5kd2lkdGgoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzY2FsZUJhbmQoKVxyXG4gICAgICAgICAgICAucmFuZ2UoWzAsIHJhbmdlXSlcclxuICAgICAgICAgICAgLnBhZGRpbmdJbm5lcihzcGFjaW5nKVxyXG4gICAgICAgICAgICAuZG9tYWluKGdyb3VwRGF0YUFycik7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0WVNjYWxlKCk6IGFueSB7XHJcbiAgICAgICAgbGV0IHVuaXF1ZVZhbHVlOiBhbnk9bmV3IFNldCgpO1xyXG4gICAgICAgIHRoaXMuc2VyaWVzLm1hcCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBpdGVtLmRhdGEubWFwKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdW5pcXVlVmFsdWUuYWRkKHZhbHVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBtaW49TWF0aC5taW4oLi4udW5pcXVlVmFsdWUpO1xyXG4gICAgICAgIG1pbj1taW4+MD8gMDptaW47XHJcblxyXG4gICAgICAgIGxldCBtYXg9TWF0aC5tYXgoMCwgLi4udW5pcXVlVmFsdWUpO1xyXG4gICAgICAgIG1heD1tYXg+MD8gbWF4OjA7XHJcblxyXG4gICAgICAgIGxldCByYW5nZT1bXTtcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmJhclR5cGU9PSd2ZXJ0aWNhbCcpIHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlPXRoaXMub3B0aW9ucy5wbG90QmFja2dyb3VuZC5oZWlnaHQ7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiYmFyIGdldFlTY2FsZVwiLHZhbHVlKVxyXG4gICAgICAgICAgICByYW5nZT1bdmFsdWUsIDBdO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImJhciBnZXRZU2NhbGUgLSBcIiwgcmFuZ2UpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWU9dGhpcy5vcHRpb25zLnBsb3RCYWNrZ3JvdW5kLndpZHRoLTMwO1xyXG4gICAgICAgICAgICByYW5nZT1bMCwgdmFsdWVdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJiYXIgZ2V0WVNjYWxlIC0tLSBcIiwgcmFuZ2UsIG1pbiwgbWF4KVxyXG5cclxuICAgICAgICByZXR1cm4gc2NhbGVMaW5lYXIoKVxyXG4gICAgICAgICAgICAucmFuZ2UocmFuZ2UpXHJcbiAgICAgICAgICAgIC5kb21haW4oW21pbiwgbWF4XSk7XHJcbiAgICAgICAgLy9yZXR1cm4gdGhpcy5zY2FsZS5uaWNlKCkudGlja3MoKTtcclxuICAgIH1cclxuXHJcbiAgICBjYWxQbG90QmFja2dyb3VuZCgpIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnM9e1xyXG4gICAgICAgICAgICAuLi50aGlzLm9wdGlvbnMsXHJcbiAgICAgICAgICAgIHBsb3RCYWNrZ3JvdW5kOiB7XHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLm9wdGlvbnMucGxvdEJhY2tncm91bmQsXHJcbiAgICAgICAgICAgICAgICB4OiAwLFxyXG4gICAgICAgICAgICAgICAgeTogMCxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogdGhpcy5vcHRpb25zLmhlaWdodC10aGlzLm9wdGlvbnMueEF4aXMuaGVpZ2h0LXRoaXMub3B0aW9ucy5oZWFkZXIuaGVpZ2h0LXRoaXMub3B0aW9ucy5wYWRkaW5nLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IHRoaXMub3B0aW9ucy53aWR0aC10aGlzLm9wdGlvbnMueUF4aXMud2lkdGgtdGhpcy5vcHRpb25zLnBhZGRpbmdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImNhbFBsb3RCYWNrZ3JvdW5kXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMub3B0aW9ucykpO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUJhcigpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwidGhpcy5pbm5lclNjYWxlLmJhbmR3aWR0aCgpIFwiK3RoaXMuaW5uZXJTY2FsZS5iYW5kd2lkdGgoKSlcclxuICAgICAgICB0aGlzLmJhcnM9W107XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5iYXJUeXBlPT0ndmVydGljYWwnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2F0ZWdvcmllcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy5zZXJpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBiYXI6IGFueT17XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBpdGVtLCAgLy9qYW4sZmViXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuc2VyaWVzW2ldLmRhdGFbaW5kZXhdLCAvLzEwMSwyMDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IHRoaXMuc2VyaWVzW2ldLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB0aGlzLmNvbG9yU2NhbGUodGhpcy5zZXJpZXNbaV0ubmFtZSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZm9ybWF0dGVkTGFiZWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiB0aGlzLmlubmVyU2NhbGUuYmFuZHdpZHRoKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogdGhpcy5zZXJpZXNbaV0uZGF0YVtpbmRleF0+MD8gKHRoaXMueVNjYWxlKDApLXRoaXMueVNjYWxlKHRoaXMuc2VyaWVzW2ldLmRhdGFbaW5kZXhdKSk6KHRoaXMueVNjYWxlKHRoaXMuc2VyaWVzW2ldLmRhdGFbaW5kZXhdKS10aGlzLnlTY2FsZSgwKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IHRoaXMuaW5uZXJTY2FsZSh0aGlzLnNlcmllc1tpXS5uYW1lKSt0aGlzLnhTY2FsZShpdGVtKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeTogdGhpcy5zZXJpZXNbaV0uZGF0YVtpbmRleF0+MD8gdGhpcy55U2NhbGUodGhpcy5zZXJpZXNbaV0uZGF0YVtpbmRleF0pOnRoaXMueVNjYWxlKDApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwidmVydGljYWxfYmFyXCJcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmFycy5wdXNoKGJhcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jYXRlZ29yaWVzLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGk9MDsgaTx0aGlzLnNlcmllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhcjogYW55PXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGl0ZW0sICAvL2phbixmZWJcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhpcy5zZXJpZXNbaV0uZGF0YVtpbmRleF0sIC8vMTAxLDIwMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cDogdGhpcy5zZXJpZXNbaV0ubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoaXMuY29sb3JTY2FsZSh0aGlzLnNlcmllc1tpXS5uYW1lKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9mb3JtYXR0ZWRMYWJlbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHRoaXMuc2VyaWVzW2ldLmRhdGFbaW5kZXhdPjA/ICh0aGlzLnhTY2FsZSh0aGlzLnNlcmllc1tpXS5kYXRhW2luZGV4XSktdGhpcy54U2NhbGUoMCkpOih0aGlzLnhTY2FsZSgwKS10aGlzLnhTY2FsZSh0aGlzLnNlcmllc1tpXS5kYXRhW2luZGV4XSkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHRoaXMuaW5uZXJTY2FsZS5iYW5kd2lkdGgoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeDogdGhpcy5zZXJpZXNbaV0uZGF0YVtpbmRleF0+MD8gdGhpcy54U2NhbGUoMCk6dGhpcy54U2NhbGUodGhpcy5zZXJpZXNbaV0uZGF0YVtpbmRleF0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiB0aGlzLmlubmVyU2NhbGUodGhpcy5zZXJpZXNbaV0ubmFtZSkrdGhpcy55U2NhbGUoaXRlbSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJob3Jpem9udGFsX2JhclwiXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJhcnMucHVzaChiYXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHlBeGlzV2lkdGhDaGFuZ2UoeyB5QXhpc1dpZHRoLCB5QXhpc0hlaWdodCB9KSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInlBeGlzV2lkdGggXCIreUF4aXNXaWR0aClcclxuICAgICAgICB0aGlzLm9wdGlvbnM9e1xyXG4gICAgICAgICAgICAuLi50aGlzLm9wdGlvbnMsXHJcbiAgICAgICAgICAgIHlBeGlzOiB7XHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLm9wdGlvbnMueUF4aXMsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogeUF4aXNXaWR0aCxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogeUF4aXNIZWlnaHRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL2NvbnNvbGUubG9nKCB0aGlzLm9wdGlvbnMpXHJcbiAgICAgICAgdGhpcy51cGRhdGUoKVxyXG4gICAgfVxyXG5cclxuICAgIHhBeGlzSGVpZ2h0Q2hhbmdlKHsgeEF4aXNIZWlnaHQgfSkge1xyXG4gICAgICAgIHRoaXMub3B0aW9ucz17XHJcbiAgICAgICAgICAgIC4uLnRoaXMub3B0aW9ucyxcclxuICAgICAgICAgICAgeEF4aXM6IHtcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMub3B0aW9ucy54QXhpcyxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogeEF4aXNIZWlnaHRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwieEF4aXNIZWlnaHRDaGFuZ2VcIiwgeEF4aXNIZWlnaHQsIEpTT04uc3RyaW5naWZ5KHRoaXMub3B0aW9ucy54QXhpcykpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlKClcclxuICAgIH1cclxuICAgIGhlYWRlckhlaWdodENoYW5nZSh7IGhlYWRlckhlaWdodCB9KSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zPXtcclxuICAgICAgICAgICAgLi4udGhpcy5vcHRpb25zLFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMub3B0aW9ucy5oZWFkZXIsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGhlYWRlckhlaWdodFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudXBkYXRlKClcclxuICAgIH1cclxuXHJcblxyXG4gICAgdG9vbFRpcFBsYWNjZW1lbnQoZGF0YSkge1xyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYmFyVHlwZT09J3ZlcnRpY2FsJykge1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0YT4wPyAndG9wJzonYm90dG9tJ1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGE+MD8gJ3JpZ2h0JzonbGVmdCdcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJywgWyckZXZlbnQnXSlcclxuICAgIG9uUmVzaXplKGV2ZW50KSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIndpbmRvdzpyZXNpemVcIilcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMudXBkYXRlKCkpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBzdHJUb051bWJlcihzdHIpIHtcclxuICAgICAgICBsZXQgbnVtYmVyUGF0dGVybj0vXFxkKy9nO1xyXG4gICAgICAgIGxldCBudW09c3RyLm1hdGNoKG51bWJlclBhdHRlcm4pLmpvaW4oJycpXHJcbiAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQobnVtKTtcclxuICAgIH1cclxufVxyXG4iXX0=