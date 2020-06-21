/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, ViewEncapsulation, ElementRef, ChangeDetectorRef, HostListener } from "@angular/core";
import { scaleBand, scaleLinear } from "d3-scale";
import { ColorHelper } from '../utils/color.helper';
import { trimLabel } from '../utils/trim-label.helper';
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
            this._options = tslib_1.__assign({}, this.customOptions, obj, { xAxis: tslib_1.__assign({}, this.customOptions.xAxis, xAxis), yAxis: tslib_1.__assign({}, this.customOptions.yAxis, yAxis), legend: tslib_1.__assign({}, this.customOptions.legend, legend), plotBackground: tslib_1.__assign({}, this.customOptions.plotBackground, plotBackground), plotOptions: tslib_1.__assign({}, this.customOptions.plotOptions, plotOptions), header: tslib_1.__assign({}, this.customOptions.header, header) });
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
        return scaleBand()
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
        return scaleBand()
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
    ngxChartsStackedComponent.prototype.calPlotBackground = /**
     * @return {?}
     */
    function () {
        this.options = tslib_1.__assign({}, this.options, { plotBackground: tslib_1.__assign({}, this.options.plotBackground, { x: 0, y: 0, height: this.options.height - this.options.xAxis.height - this.options.header.height - this.options.padding, width: this.options.width - this.options.yAxis.width - this.options.padding }) });
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
        this.options = tslib_1.__assign({}, this.options, { yAxis: tslib_1.__assign({}, this.options.yAxis, { width: yAxisWidth, height: yAxisHeight }) });
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
        this.options = tslib_1.__assign({}, this.options, { xAxis: tslib_1.__assign({}, this.options.xAxis, { height: xAxisHeight }) });
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
        this.options = tslib_1.__assign({}, this.options, { header: tslib_1.__assign({}, this.options.header, { height: headerHeight }) });
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
        { type: Component, args: [{
                    selector: "ngx-charts-stacked",
                    template: "<div [style.width]=\"options.width+'px'\" [style.border]=\"'1px solid #f3f3f3'\">\r\n\r\n    <svg version=\"1.1\" class=\"highcharts-root\" [attr.padding]=\"options.padding\" [attr.width]=\"options.width\"\r\n        [attr.height]=\"options.height\" [attr.viewBox]=\"getViewBox()\"\r\n        aria-label=\"Interactive chart\" [style.border]=\"'0px solid gray'\" [style.padding]=\"options.padding\"\r\n        aria-hidden=\"false\">\r\n\r\n        <g header [options]=\"options\" (headerHeightChange)=\"headerHeightChange($event)\"></g>\r\n\r\n        <g y-axis \r\n            [xScale]=\"xScale\" \r\n            [yScale]=\"yScale\" \r\n            [options]=\"options\" \r\n            [categories]=\"categories\" \r\n            [series]=\"series\"\r\n            (yAxisWidthChange)=\"yAxisWidthChange($event)\"></g>\r\n\r\n        <g x-axis \r\n            [xScale]=\"xScale\" \r\n            [yScale]=\"yScale\" \r\n            [options]=\"options\" \r\n            [categories]=\"categories\" \r\n            [series]=\"series\"\r\n            (xAxisHeightChange)=\"xAxisHeightChange($event)\"></g>\r\n\r\n        <g data-z-index=\"0.1\" >\r\n            <rect *ngFor=\"let bar of bars\" \r\n                [attr.class]=\"bar.className\"\r\n                [attr.x]=\"bar.x+this.options.yAxis.width\"\r\n                [tooltip]=\"bar.value+', '+bar.group+', '+bar.data\" \r\n                [placement]=\"toolTipPlaccement(bar.data)\" \r\n                delay=\"10\"\r\n                [attr.y]=\"bar.y+this.options.header.height\" \r\n                [attr.width]=\"bar.width\" [attr.height]=\"bar.height\"\r\n                [attr.fill]=\"bar.color\" opacity=\"1\"  tabindex=\"-1\" role=\"img\"\r\n                aria-label=\"1. Jan, 49.9. Tokyo.\"></rect>\r\n        </g>\r\n    </svg>\r\n    <chart-legend\r\n        *ngIf=\"groupName.length\"\r\n        [groupName]=\"groupName\"\r\n        [options]=\"options\"\r\n        [series] = \"series\"    \r\n    >\r\n    </chart-legend>\r\n  \r\n</div>\r\n\r\n",
                    // changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styles: [".tooltip-example{text-align:center;padding:0 50px}.tooltip-example [tooltip]{display:inline-block;margin:50px 20px;width:180px;height:50px;border:1px solid gray;border-radius:5px;line-height:50px;text-align:center}.ng-tooltip{position:absolute;max-width:150px;font-size:14px;text-align:center;color:#fafae3;padding:3px 8px;background:#282a36;border-radius:4px;z-index:1000;opacity:0}.ng-tooltip:after{content:\"\";position:absolute;border-style:solid}.ng-tooltip-top:after{top:100%;left:50%;margin-left:-5px;border-width:5px;border-color:#000 transparent transparent}.ng-tooltip-bottom:after{bottom:100%;left:50%;margin-left:-5px;border-width:5px;border-color:transparent transparent #000}.ng-tooltip-left:after{top:50%;left:100%;margin-top:-5px;border-width:5px;border-color:transparent transparent transparent #000}.ng-tooltip-right:after{top:50%;right:100%;margin-top:-5px;border-width:5px;border-color:transparent #000 transparent transparent}.ng-tooltip-show{opacity:1}.horizontal_bar{-webkit-animation:1s linear forwards horizontal_bar_frames;animation:1s linear forwards horizontal_bar_frames}@-webkit-keyframes horizontal_bar_frames{from{width:0}}@keyframes horizontal_bar_frames{from{width:0}}.vertical_bar{-webkit-animation:1s linear forwards vertical_bar_frames;animation:1s linear forwards vertical_bar_frames}@-webkit-keyframes vertical_bar_frames{from{height:0}}@keyframes vertical_bar_frames{from{height:0}}"]
                }] }
    ];
    /** @nocollapse */
    ngxChartsStackedComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ElementRef },
        { type: ChangeDetectorRef }
    ]; };
    ngxChartsStackedComponent.propDecorators = {
        options: [{ type: Input }],
        categories: [{ type: Input }],
        series: [{ type: Input }],
        onResize: [{ type: HostListener, args: ['window:resize', ['$event'],] }]
    };
    return ngxChartsStackedComponent;
}());
export { ngxChartsStackedComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNoYXJ0cy1zdGFja2VkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0dXNoYXJnaG9zaGJkL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvbmd4LWNoYXJ0cy1zdGFja2VkL25neC1jaGFydHMtc3RhY2tlZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULEtBQUssRUFDTCxpQkFBaUIsRUFJakIsVUFBVSxFQUNWLGlCQUFpQixFQUVqQixZQUFZLEVBQ2YsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDbEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUd2RDtJQTBJSSxtQ0FBWSxPQUFtQixFQUNuQixZQUF3QixFQUN4QixHQUFzQjtRQUR0QixpQkFBWSxHQUFaLFlBQVksQ0FBWTtRQUN4QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQWxJMUIsa0JBQWEsR0FBQztZQUNsQixPQUFPLEVBQUUsVUFBVTtZQUNuQixLQUFLLEVBQUUsRUFBRTtZQUNULFFBQVEsRUFBRSxFQUFFO1lBQ1osTUFBTSxFQUFFLENBQUM7WUFDVCxLQUFLLEVBQUUsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDO1lBQ1YsS0FBSyxFQUFFO2dCQUNILEtBQUssRUFBRSxFQUFFO2dCQUNULE1BQU0sRUFBRSxDQUFDO2dCQUNULGFBQWEsRUFBRSxDQUFDO2dCQUNoQixVQUFVLEVBQUUsTUFBTTtnQkFDbEIsYUFBYSxFQUFFLEtBQUs7Z0JBQ3BCLGlCQUFpQixFQUFDLEVBQUU7YUFDdkI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsTUFBTSxFQUFFLENB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Q0FBQzs7d0JBRTNDLEtBQUssRUFBRSxLQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRTt3QkFDbEMsTUFBTSxFQUFFLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFDLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN2SixDQUFDLEVBQUUsS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQzs7d0JBRTNDLFNBQVMsRUFBRSxjQUFjO3FCQUM1QjtvQkFDRCxJQUFJLENBQUMsSUFBRSxDQUFDLEVBQUU7d0JBQ04sR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFDLENBQUMsQ0FBQSxDQUFDLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQSxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUNqRzt5QkFDSTt3QkFDRCxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUMsS0FBSyxHQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7cUJBQzdCO29CQUNELEtBQUssR0FBQyxHQUFH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T0FBTyxDQUFDLE1BQU0sR0FBQyxDQUFDO1lBQzNDLE9BQU8sTUFBTSxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFDLEdBQUcsR0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQzs7WUFFekQsT0FBTyxTQUFTLENBQUM7SUFDekIsQ0FBQzs7Ozs7O0lBS08sK0NBQVc7Ozs7O0lBQW5CLFVBQW9CLEdBQUc7O1lBQ2YsYUFBYSxHQUFDLE1BQU07O1lBQ3BCLEdBQUcsR0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDekMsT0FBTyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0IsQ0FBQzs7Z0JBaGNKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixnL0RBQWtEOztvQkFHbEQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2lCQUN4Qzs7OztnQkFsQkcsVUFBVTtnQkFBVixVQUFVO2dCQUNWLGlCQUFpQjs7OzBCQW1FaEIsS0FBSzs2QkFzREwsS0FBSzt5QkFFTCxLQUFLOzJCQTRUTCxZQUFZLFNBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDOztJQXFCN0MsZ0NBQUM7Q0FBQSxBQWpjRCxJQWljQztTQXpiWSx5QkFBeUI7Ozs7OztJQUVsQyxrREF5Q0U7Ozs7O0lBRUYsNkNBQXlCOzs7OztJQUN6Qiw0Q0FBd0I7O0lBd0R4QiwrQ0FBNEI7O0lBYzVCLDRDQUFhOztJQUtiLDJDQUFZOztJQUNaLCtDQUFnQjs7SUFDaEIsMkNBQVk7O0lBQ1oseUNBQWE7O0lBQ2IsOENBQW9COztJQUNwQixzREFBdUI7O0lBQ3ZCLHNEQUF1Qjs7SUFDdkIsK0NBQWdCOztJQUNoQiw4Q0FBZTs7Ozs7SUFFWCxpREFBZ0M7Ozs7O0lBQ2hDLHdDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBDb21wb25lbnQsXHJcbiAgICBJbnB1dCxcclxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxyXG4gICAgT25DaGFuZ2VzLFxyXG4gICAgT25Jbml0LFxyXG4gICAgU2ltcGxlQ2hhbmdlcyxcclxuICAgIEVsZW1lbnRSZWYsXHJcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gICAgSG9zdExpc3RlbmVyXHJcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgc2VsZWN0IH0gZnJvbSAnZDMtc2VsZWN0aW9uJztcclxuaW1wb3J0IHsgdHJhbnNpdGlvbiB9IGZyb20gJ2QzLXRyYW5zaXRpb24nO1xyXG5pbXBvcnQgeyBzY2FsZUJhbmQsIHNjYWxlTGluZWFyIH0gZnJvbSBcImQzLXNjYWxlXCI7XHJcbmltcG9ydCB7IENvbG9ySGVscGVyIH0gZnJvbSAnLi4vdXRpbHMvY29sb3IuaGVscGVyJztcclxuaW1wb3J0IHsgdHJpbUxhYmVsIH0gZnJvbSAnLi4vdXRpbHMvdHJpbS1sYWJlbC5oZWxwZXInO1xyXG5pbXBvcnQgeyBDbGFzc0dldHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyL3NyYy9vdXRwdXQvb3V0cHV0X2FzdCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIm5neC1jaGFydHMtc3RhY2tlZFwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9uZ3gtY2hhcnRzLXN0YWNrZWQuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi9uZ3gtY2hhcnRzLXN0YWNrZWQuY29tcG9uZW50LmNzc1wiXSxcclxuICAgIC8vIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIG5neENoYXJ0c1N0YWNrZWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCB7XHJcblxyXG4gICAgcHJpdmF0ZSBjdXN0b21PcHRpb25zPXtcclxuICAgICAgICBiYXJUeXBlOiAndmVydGljYWwnLFxyXG4gICAgICAgIHRpdGxlOiAnJyxcclxuICAgICAgICBzdWJ0aXRsZTogJycsXHJcbiAgICAgICAgaGVpZ2h0OiAwLFxyXG4gICAgICAgIHdpZHRoOiAwLFxyXG4gICAgICAgIHBhZGRpbmc6IDUsXHJcbiAgICAgICAgeEF4aXM6IHtcclxuICAgICAgICAgICAgdGl0bGU6ICcnLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDAsXHJcbiAgICAgICAgICAgIGxhYmVsUm90YXRpb246IDAsXHJcbiAgICAgICAgICAgIGxhYmVsQWxpZ246ICdsZWZ0JyxcclxuICAgICAgICAgICAgbGFiZWxFbGxpcHNpczogZmFsc2UsXHJcbiAgICAgICAgICAgIGxhYmVsRWxsaXBzaXNTaXplOjE2XHJcbiAgICAgICAgfSxcclxuICAgICAgICB5QXhpczoge1xyXG4gICAgICAgICAgICB0aXRsZTogJycsXHJcbiAgICAgICAgICAgIHdpZHRoOiAwLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDAsXHJcbiAgICAgICAgICAgIGxhYmVsUm90YXRpb246IDAsXHJcbiAgICAgICAgICAgIGxhYmVsRWxsaXBzaXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBsYWJlbEVsbGlwc2lzU2l6ZToxNlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGVnZW5kOiB7XHJcbiAgICAgICAgICAgIGxhYmVsRWxsaXBzaXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBsYWJlbEVsbGlwc2lzU2l6ZToxNlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGxvdEJhY2tncm91bmQ6IHtcclxuICAgICAgICAgICAgeDogMCxcclxuICAgICAgICAgICAgeTogMCxcclxuICAgICAgICAgICAgaGVpZ2h0OiAwLFxyXG4gICAgICAgICAgICB3aWR0aDogMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGxvdE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgZ3JvdXBCYXJQYWRkaW5nOiAyMCxcclxuICAgICAgICAgICAgaW5uZXJCYXJQYWRkaW5nOiAzXHJcbiAgICAgICAgfSxcclxuICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgaGVpZ2h0OiAwLFxyXG4gICAgICAgICAgICB3aWR0aDogMFxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBfb3B0aW9uczogYW55PXt9O1xyXG4gICAgcHJpdmF0ZSBfc2VyaWVzOiBhbnk9W107XHJcblxyXG4gICAgQElucHV0KCkgc2V0IG9wdGlvbnMob2JqOiBhbnkpIHtcclxuICAgICAgICBsZXQgeEF4aXM9b2JqLnhBeGlzO1xyXG4gICAgICAgIHhBeGlzWydsYWJlbEVsbGlwc2lzJ109KG9iai54QXhpcy5sYWJlbEVsbGlwc2lzU2l6ZSE9dW5kZWZpbmVkJiZvYmoueEF4aXMubGFiZWxFbGxpcHNpc1NpemU+MCk/IHRydWU6ZmFsc2U7XHJcblxyXG4gICAgICAgIGxldCB5QXhpcz1vYmoueUF4aXM7XHJcbiAgICAgICAgeUF4aXNbJ2xhYmVsRWxsaXBzaXMnXT0ob2JqLnlBeGlzLmxhYmVsRWxsaXBzaXNTaXplIT11bmRlZmluZWQmJm9iai55QXhpcy5sYWJlbEVsbGlwc2lzU2l6ZT4wKT8gdHJ1ZTpmYWxzZTtcclxuXHJcbiAgICAgICAgbGV0IGxlZ2VuZD1vYmoubGVnZW5kO1xyXG4gICAgICAgIGxlZ2VuZFsnbGFiZWxFbGxpcHNpcyddPShvYmoubGVnZW5kLmxhYmVsRWxsaXBzaXNTaXplIT11bmRlZmluZWQmJm9iai5sZWdlbmQubGFiZWxFbGxpcHNpc1NpemU+MCk/IHRydWU6ZmFsc2U7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHBsb3RCYWNrZ3JvdW5kPW9iai5wbG90QmFja2dyb3VuZDtcclxuICAgICAgICBsZXQgcGxvdE9wdGlvbnM9b2JqLnBsb3RPcHRpb25zO1xyXG4gICAgICAgIGxldCBoZWFkZXI9b2JqLmhlYWRlcjtcclxuXHJcbiAgICAgICAgZGVsZXRlIG9ialsneEF4aXMnXTtcclxuICAgICAgICBkZWxldGUgb2JqWyd5QXhpcyddO1xyXG4gICAgICAgIGRlbGV0ZSBvYmpbJ2xlZ2VuZCddO1xyXG4gICAgICAgIGRlbGV0ZSBvYmpbJ3Bsb3RCYWNrZ3JvdW5kJ107XHJcbiAgICAgICAgZGVsZXRlIG9ialsncGxvdE9wdGlvbnMnXTtcclxuICAgICAgICBkZWxldGUgb2JqWydoZWFkZXInXTtcclxuXHJcbiAgICAgICAgdGhpcy5fb3B0aW9ucz17XHJcbiAgICAgICAgICAgIC4uLnRoaXMuY3VzdG9tT3B0aW9ucyxcclxuICAgICAgICAgICAgLi4ub2JqLFxyXG4gICAgICAgICAgICB4QXhpczoge1xyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5jdXN0b21PcHRpb25zLnhBeGlzLFxyXG4gICAgICAgICAgICAgICAgLi4ueEF4aXNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgeUF4aXM6IHtcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMuY3VzdG9tT3B0aW9ucy55QXhpcyxcclxuICAgICAgICAgICAgICAgIC4uLnlBeGlzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGxlZ2VuZDp7IFxyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5jdXN0b21PcHRpb25zLmxlZ2VuZCxcclxuICAgICAgICAgICAgICAgIC4uLmxlZ2VuZFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwbG90QmFja2dyb3VuZDoge1xyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5jdXN0b21PcHRpb25zLnBsb3RCYWNrZ3JvdW5kLFxyXG4gICAgICAgICAgICAgICAgLi4ucGxvdEJhY2tncm91bmRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcGxvdE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMuY3VzdG9tT3B0aW9ucy5wbG90T3B0aW9ucyxcclxuICAgICAgICAgICAgICAgIC4uLnBsb3RPcHRpb25zXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5jdXN0b21PcHRpb25zLmhlYWRlcixcclxuICAgICAgICAgICAgICAgIC4uLmhlYWRlclxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLl9vcHRpb25zKVxyXG4gICAgfVxyXG4gICAgZ2V0IG9wdGlvbnMoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fb3B0aW9ucztcclxuICAgIH1cclxuICAgIEBJbnB1dCgpIGNhdGVnb3JpZXM6IGFueT1bXTtcclxuICAgIC8vIEBJbnB1dCgpIHNlcmllczogYW55PVtdO1xyXG4gICAgQElucHV0KCkgc2V0IHNlcmllcyhkYXRhOiBhbnkpIHsgXHJcbiAgICAgICAgdGhpcy5fc2VyaWVzPWRhdGE7XHJcbiAgICAgICAgZm9yIChsZXQgaT0wOyBpPGRhdGEubGVuZ3RoOyBpKyspIHsgXHJcbiAgICAgICAgICAgIGZvciAobGV0IGo9MDsgajxkYXRhW2ldLmRhdGEubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Nlcmllc1tpXS5kYXRhW2pdID0gdGhpcy5fc2VyaWVzW2ldLmRhdGFbal0gPDAgPyAwIDogdGhpcy5fc2VyaWVzW2ldLmRhdGFbal1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBnZXQgc2VyaWVzKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlcmllcztcclxuICAgIH1cclxuXHJcbiAgICBlbGVtZW50OiBhbnk7XHJcbiAgICAvL0BJbnB1dCgpIGdyb3VwQmFyUGFkZGluZz0yMDtcclxuICAgIC8vQElucHV0KCkgaW5uZXJCYXJQYWRkaW5nPTM7XHJcblxyXG4gICAgLy8gc2NhbGU6IGFueTtcclxuICAgIHhTY2FsZTogYW55O1xyXG4gICAgaW5uZXJTY2FsZTogYW55O1xyXG4gICAgeVNjYWxlOiBhbnk7XHJcbiAgICBiYXJzOiBhbnk9W107XHJcbiAgICBncm91cE5hbWU6IGFueVtdPVtdO1xyXG4gICAgZ3JvdXBCYXJQYWRkaW5nQks6IGFueTtcclxuICAgIGlubmVyQmFyUGFkZGluZ0JLOiBhbnk7XHJcbiAgICBjb2xvclNjYWxlOiBhbnk7XHJcbiAgICB0cmltTGFiZWw6IGFueTtcclxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnRSZWYsXHJcbiAgICAgICAgcHJpdmF0ZSBjaGFydEVsZW1lbnQ6IEVsZW1lbnRSZWYsXHJcbiAgICAgICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50PWVsZW1lbnQubmF0aXZlRWxlbWVudDtcclxuICAgICAgICB0aGlzLnRyaW1MYWJlbCA9IHRyaW1MYWJlbDtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ncm91cEJhclBhZGRpbmdCSz10aGlzLm9wdGlvbnMucGxvdE9wdGlvbnMuZ3JvdXBCYXJQYWRkaW5nO1xyXG4gICAgICAgIHRoaXMuaW5uZXJCYXJQYWRkaW5nQks9dGhpcy5vcHRpb25zLnBsb3RPcHRpb25zLmlubmVyQmFyUGFkZGluZztcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMudXBkYXRlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy53aWR0aD10aGlzLm9wdGlvbnMud2lkdGg7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLmhlaWdodD10aGlzLm9wdGlvbnMuaGVpZ2h0O1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInR0dHR0dHRcIix0aGlzLm9wdGlvbnMpXHJcbiAgICAgICAgY29uc3QgaG9zdEVsZW09dGhpcy5jaGFydEVsZW1lbnQubmF0aXZlRWxlbWVudDtcclxuICAgICAgICBsZXQgZGltcz1ob3N0RWxlbS5wYXJlbnROb2RlIT09bnVsbD8gaG9zdEVsZW0ucGFyZW50Tm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTp7IGhlaWdodDogNDAwLCB3aWR0aDogODAwIH07XHJcblxyXG4gICAgICAgIHZhciBzdHlsZT1ob3N0RWxlbS5wYXJlbnROb2RlLmN1cnJlbnRTdHlsZXx8d2luZG93LmdldENvbXB1dGVkU3R5bGUoaG9zdEVsZW0ucGFyZW50Tm9kZSk7XHJcblxyXG4gICAgICAgIHRoaXMub3B0aW9ucy5oZWlnaHQ9IXRoaXMub3B0aW9ucy5oZWlnaHQ/IGRpbXMuaGVpZ2h0LXRoaXMuc3RyVG9OdW1iZXIoc3R5bGUucGFkZGluZ0xlZnQpLXRoaXMuc3RyVG9OdW1iZXIoc3R5bGUucGFkZGluZ1JpZ2h0KTp0aGlzLm9wdGlvbnMuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy53aWR0aD0hdGhpcy5vcHRpb25zLndpZHRoPyBkaW1zLndpZHRoLXRoaXMuc3RyVG9OdW1iZXIoc3R5bGUucGFkZGluZ0xlZnQpLXRoaXMuc3RyVG9OdW1iZXIoc3R5bGUucGFkZGluZ1JpZ2h0KTpkaW1zLndpZHRoLXRoaXMuc3RyVG9OdW1iZXIoc3R5bGUucGFkZGluZ0xlZnQpLXRoaXMuc3RyVG9OdW1iZXIoc3R5bGUucGFkZGluZ1JpZ2h0KTtcclxuXHJcbiAgICAgICAgdGhpcy5jYWxQbG90QmFja2dyb3VuZCgpXHJcblxyXG4gICAgICAgIGxldCBjb3VudEZsYWc9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLnBsb3RPcHRpb25zLmdyb3VwQmFyUGFkZGluZz10aGlzLmdyb3VwQmFyUGFkZGluZ0JLO1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy5wbG90T3B0aW9ucy5pbm5lckJhclBhZGRpbmc9dGhpcy5pbm5lckJhclBhZGRpbmdCSztcclxuICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgIGlmIChjb3VudEZsYWc9PXRydWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5wbG90T3B0aW9ucy5ncm91cEJhclBhZGRpbmctLTtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5wbG90T3B0aW9ucy5pbm5lckJhclBhZGRpbmc9MjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmJhclR5cGU9PSd2ZXJ0aWNhbCcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMueFNjYWxlPXRoaXMuZ2V0WFNjYWxlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnlTY2FsZT10aGlzLmdldFhTY2FsZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaW5uZXJTY2FsZT10aGlzLmdldElubmVyU2NhbGUoKTtcclxuICAgICAgICAgICAgY291bnRGbGFnPXRydWU7XHJcblxyXG4gICAgICAgIH0gd2hpbGUgKHRoaXMuaW5uZXJTY2FsZS5iYW5kd2lkdGgoKTwyKTtcclxuICAgICAgICAvLyBcclxuXHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5iYXJUeXBlPT0ndmVydGljYWwnKSB7XHJcbiAgICAgICAgICAgIHRoaXMueVNjYWxlPXRoaXMuZ2V0WVNjYWxlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnhTY2FsZT10aGlzLmdldFlTY2FsZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGNvbG9ySGVscGVyPW5ldyBDb2xvckhlbHBlcih0aGlzLm9wdGlvbnMsIHRoaXMuc2VyaWVzKTtcclxuICAgICAgICB0aGlzLmNvbG9yU2NhbGU9Y29sb3JIZWxwZXIuZ2VuZXJhdGVDb2xvclNjYWxlKCk7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmdyb3VwTmFtZT1bXTtcclxuICAgICAgICAgICAgdGhpcy5zZXJpZXMubWFwKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0ubmFtZSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyb3VwTmFtZS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogaXRlbS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhpcy5jb2xvclNjYWxlKGl0ZW0ubmFtZSlcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVCYXIoKTtcclxuXHJcbiAgICAgICAgICAgIC8vc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBmb3IgKGxldCBpPTA7IGk8dGhpcy5iYXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2codGhpcy5iYXJzW2ldLmNsYXNzTmFtZSlcclxuICAgICAgICAgICAgICAgIC8vICAgICB0cmFuc2l0aW9uKHNlbGVjdCh0aGlzLmVsZW1lbnQpKS5zZWxlY3QoJy5iYXIwMicpLnRyYW5zaXRpb24oKVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAuZHVyYXRpb24oNTAwKVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAuYXR0cignd2lkdGgnLCB0aGlzLmJhcnNbaV0ud2lkdGgpO1xyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAvL30sMTAwMClcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFhTY2FsZSgpOiBhbnkge1xyXG5cclxuICAgICAgICBsZXQgc3BhY2luZztcclxuICAgICAgICBsZXQgcmFuZ2U7XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5iYXJUeXBlPT0ndmVydGljYWwnKSB7XHJcbiAgICAgICAgICAgIHNwYWNpbmc9KHRoaXMuY2F0ZWdvcmllcy5sZW5ndGgvKHRoaXMub3B0aW9ucy5wbG90QmFja2dyb3VuZC53aWR0aC90aGlzLm9wdGlvbnMucGxvdE9wdGlvbnMuZ3JvdXBCYXJQYWRkaW5nKSk7XHJcbiAgICAgICAgICAgIHJhbmdlPVswLCB0aGlzLm9wdGlvbnMucGxvdEJhY2tncm91bmQud2lkdGhdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IGxlbmd0aD10aGlzLm9wdGlvbnMuaGVpZ2h0LXRoaXMub3B0aW9ucy5oZWFkZXIuaGVpZ2h0O1xyXG4gICAgICAgICAgICBzcGFjaW5nPSh0aGlzLmNhdGVnb3JpZXMubGVuZ3RoLyh0aGlzLm9wdGlvbnMucGxvdEJhY2tncm91bmQuaGVpZ2h0L3RoaXMub3B0aW9ucy5wbG90T3B0aW9ucy5ncm91cEJhclBhZGRpbmcpKTtcclxuICAgICAgICAgICAgcmFuZ2U9WzAsIHRoaXMub3B0aW9ucy5wbG90QmFja2dyb3VuZC5oZWlnaHRdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2NhbGVCYW5kKClcclxuICAgICAgICAgICAgLnJhbmdlKHJhbmdlKVxyXG4gICAgICAgICAgICAucGFkZGluZ0lubmVyKHNwYWNpbmcpXHJcbiAgICAgICAgICAgIC5wYWRkaW5nT3V0ZXIoMC4xKVxyXG4gICAgICAgICAgICAuZG9tYWluKHRoaXMuY2F0ZWdvcmllcyk7XHJcbiAgICB9XHJcbiAgICBnZXRJbm5lclNjYWxlKCk6IGFueSB7XHJcblxyXG4gICAgICAgIGxldCBncm91cERhdGFBcnI9WydBbGwnXTtcclxuICAgICAgICAvLyBmb3IgKGxldCBpPTA7IGk8dGhpcy5zZXJpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAvLyAgICAgZ3JvdXBEYXRhQXJyLnB1c2godGhpcy5zZXJpZXNbaV0ubmFtZSk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIGxldCBzcGFjaW5nO1xyXG4gICAgICAgIGxldCByYW5nZTtcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmJhclR5cGU9PSd2ZXJ0aWNhbCcpIHtcclxuICAgICAgICAgICAgc3BhY2luZz0odGhpcy5zZXJpZXMubGVuZ3RoLyh0aGlzLnhTY2FsZS5iYW5kd2lkdGgoKS90aGlzLm9wdGlvbnMucGxvdE9wdGlvbnMuaW5uZXJCYXJQYWRkaW5nKSk7XHJcbiAgICAgICAgICAgIHJhbmdlPXRoaXMueFNjYWxlLmJhbmR3aWR0aCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgc3BhY2luZz0odGhpcy5zZXJpZXMubGVuZ3RoLyh0aGlzLnlTY2FsZS5iYW5kd2lkdGgoKS90aGlzLm9wdGlvbnMucGxvdE9wdGlvbnMuaW5uZXJCYXJQYWRkaW5nKSk7XHJcbiAgICAgICAgICAgIHJhbmdlPXRoaXMueVNjYWxlLmJhbmR3aWR0aCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNjYWxlQmFuZCgpXHJcbiAgICAgICAgICAgIC5yYW5nZShbMCwgcmFuZ2VdKVxyXG4gICAgICAgICAgICAucGFkZGluZ0lubmVyKHNwYWNpbmcpXHJcbiAgICAgICAgICAgIC5kb21haW4oZ3JvdXBEYXRhQXJyKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRZU2NhbGUoKTogYW55IHtcclxuICAgICAgICBsZXQgdW5pcXVlVmFsdWU6IGFueT1uZXcgU2V0KCk7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VyaWVzLmxlbmd0aCAhPSAwKSB7IFxyXG4gICAgICAgICAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy5zZXJpZXNbMF0uZGF0YS5sZW5ndGg7IGkrKykgeyBcclxuICAgICAgICAgICAgICAgIGxldCBzdW09MDtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGo9MDsgajx0aGlzLnNlcmllcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1bSs9dGhpcy5zZXJpZXNbal0uZGF0YVtpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHVuaXF1ZVZhbHVlLmFkZChzdW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHRoaXMuc2VyaWVzLm1hcCgoaXRlbSkgPT4ge1xyXG4gICAgICAgIC8vICAgICBpdGVtLmRhdGEubWFwKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgdW5pcXVlVmFsdWUuYWRkKHZhbHVlKTtcclxuICAgICAgICAvLyAgICAgfSk7XHJcbiAgICAgICAgLy8gfSk7XHJcblxyXG4gICAgICAgIGxldCBtaW49TWF0aC5taW4oLi4udW5pcXVlVmFsdWUpO1xyXG4gICAgICAgIG1pbj1taW4+MD8gMDptaW47XHJcblxyXG4gICAgICAgIGxldCBtYXg9TWF0aC5tYXgoMCwgLi4udW5pcXVlVmFsdWUpO1xyXG4gICAgICAgIG1heD1tYXg+MD8gbWF4OjA7XHJcblxyXG4gICAgICAgIGxldCByYW5nZT1bXTtcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmJhclR5cGU9PSd2ZXJ0aWNhbCcpIHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlPXRoaXMub3B0aW9ucy5wbG90QmFja2dyb3VuZC5oZWlnaHQ7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiYmFyIGdldFlTY2FsZVwiLHZhbHVlKVxyXG4gICAgICAgICAgICByYW5nZT1bdmFsdWUsIDBdO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImJhciBnZXRZU2NhbGUgLSBcIiwgcmFuZ2UpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWU9dGhpcy5vcHRpb25zLnBsb3RCYWNrZ3JvdW5kLndpZHRoLTMwO1xyXG4gICAgICAgICAgICByYW5nZT1bMCwgdmFsdWVdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJiYXIgZ2V0WVNjYWxlIC0tLSBcIiwgcmFuZ2UsIG1pbiwgbWF4KVxyXG5cclxuICAgICAgICByZXR1cm4gc2NhbGVMaW5lYXIoKVxyXG4gICAgICAgICAgICAucmFuZ2UocmFuZ2UpXHJcbiAgICAgICAgICAgIC5kb21haW4oW21pbiwgbWF4XSk7XHJcbiAgICAgICAgLy9yZXR1cm4gdGhpcy5zY2FsZS5uaWNlKCkudGlja3MoKTtcclxuICAgIH1cclxuXHJcbiAgICBjYWxQbG90QmFja2dyb3VuZCgpIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnM9e1xyXG4gICAgICAgICAgICAuLi50aGlzLm9wdGlvbnMsXHJcbiAgICAgICAgICAgIHBsb3RCYWNrZ3JvdW5kOiB7XHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLm9wdGlvbnMucGxvdEJhY2tncm91bmQsXHJcbiAgICAgICAgICAgICAgICB4OiAwLFxyXG4gICAgICAgICAgICAgICAgeTogMCxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogdGhpcy5vcHRpb25zLmhlaWdodC10aGlzLm9wdGlvbnMueEF4aXMuaGVpZ2h0LXRoaXMub3B0aW9ucy5oZWFkZXIuaGVpZ2h0LXRoaXMub3B0aW9ucy5wYWRkaW5nLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IHRoaXMub3B0aW9ucy53aWR0aC10aGlzLm9wdGlvbnMueUF4aXMud2lkdGgtdGhpcy5vcHRpb25zLnBhZGRpbmdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImNhbFBsb3RCYWNrZ3JvdW5kXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMub3B0aW9ucykpO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUJhcigpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwidGhpcy5pbm5lclNjYWxlLmJhbmR3aWR0aCgpIFwiK3RoaXMuaW5uZXJTY2FsZS5iYW5kd2lkdGgoKSlcclxuICAgICAgICB0aGlzLmJhcnM9W107XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5iYXJUeXBlPT0ndmVydGljYWwnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2F0ZWdvcmllcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcHJldlk9IDA7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy5zZXJpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBiYXI6IGFueT17XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBpdGVtLCAgLy9qYW4sZmViXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuc2VyaWVzW2ldLmRhdGFbaW5kZXhdLCAvLzEwMSwyMDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IHRoaXMuc2VyaWVzW2ldLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB0aGlzLmNvbG9yU2NhbGUodGhpcy5zZXJpZXNbaV0ubmFtZSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZm9ybWF0dGVkTGFiZWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiB0aGlzLmlubmVyU2NhbGUuYmFuZHdpZHRoKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogdGhpcy5zZXJpZXNbaV0uZGF0YVtpbmRleF0+MD8gKHRoaXMueVNjYWxlKDApLXRoaXMueVNjYWxlKHRoaXMuc2VyaWVzW2ldLmRhdGFbaW5kZXhdKSk6KHRoaXMueVNjYWxlKHRoaXMuc2VyaWVzW2ldLmRhdGFbaW5kZXhdKS10aGlzLnlTY2FsZSgwKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IHRoaXMuaW5uZXJTY2FsZSgnQWxsJykrdGhpcy54U2NhbGUoaXRlbSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8veTogcHJldkhlaWdodCArICggdGhpcy5zZXJpZXNbaV0uZGF0YVtpbmRleF0+MD8gdGhpcy55U2NhbGUodGhpcy5zZXJpZXNbaV0uZGF0YVtpbmRleF0pOnRoaXMueVNjYWxlKDApICksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ2ZXJ0aWNhbF9iYXJcIlxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGk9PTApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmFyWyd5J109dGhpcy5zZXJpZXNbaV0uZGF0YVtpbmRleF0+MD8gdGhpcy55U2NhbGUodGhpcy5zZXJpZXNbaV0uZGF0YVtpbmRleF0pOnRoaXMueVNjYWxlKDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhclsneSddPXByZXZZLWJhci5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHByZXZZPWJhci55O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmFycy5wdXNoKGJhcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jYXRlZ29yaWVzLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBwcmV2WD0gMDtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGk9MDsgaTx0aGlzLnNlcmllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhcjogYW55PXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGl0ZW0sICAvL2phbixmZWJcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhpcy5zZXJpZXNbaV0uZGF0YVtpbmRleF0sIC8vMTAxLDIwMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cDogdGhpcy5zZXJpZXNbaV0ubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoaXMuY29sb3JTY2FsZSh0aGlzLnNlcmllc1tpXS5uYW1lKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9mb3JtYXR0ZWRMYWJlbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHRoaXMuc2VyaWVzW2ldLmRhdGFbaW5kZXhdPjA/ICh0aGlzLnhTY2FsZSh0aGlzLnNlcmllc1tpXS5kYXRhW2luZGV4XSktdGhpcy54U2NhbGUoMCkpOih0aGlzLnhTY2FsZSgwKS10aGlzLnhTY2FsZSh0aGlzLnNlcmllc1tpXS5kYXRhW2luZGV4XSkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHRoaXMuaW5uZXJTY2FsZS5iYW5kd2lkdGgoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8geDogdGhpcy5zZXJpZXNbaV0uZGF0YVtpbmRleF0+MD8gdGhpcy54U2NhbGUoMCk6dGhpcy54U2NhbGUodGhpcy5zZXJpZXNbaV0uZGF0YVtpbmRleF0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiB0aGlzLmlubmVyU2NhbGUoJ0FsbCcpK3RoaXMueVNjYWxlKGl0ZW0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiaG9yaXpvbnRhbF9iYXJcIlxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGk9PTApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmFyWyd4J109dGhpcy5zZXJpZXNbaV0uZGF0YVtpbmRleF0+MD8gdGhpcy54U2NhbGUoMCk6dGhpcy54U2NhbGUodGhpcy5zZXJpZXNbaV0uZGF0YVtpbmRleF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhclsneCddPXByZXZYO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBwcmV2WD1iYXIueCArIGJhci53aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJhcnMucHVzaChiYXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHlBeGlzV2lkdGhDaGFuZ2UoeyB5QXhpc1dpZHRoLCB5QXhpc0hlaWdodCwgIHlBeGlzUmlnaHRXaWR0aCB9KSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInlBeGlzV2lkdGggXCIreUF4aXNXaWR0aClcclxuICAgICAgICB0aGlzLm9wdGlvbnM9e1xyXG4gICAgICAgICAgICAuLi50aGlzLm9wdGlvbnMsXHJcbiAgICAgICAgICAgIHlBeGlzOiB7XHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLm9wdGlvbnMueUF4aXMsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogeUF4aXNXaWR0aCxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogeUF4aXNIZWlnaHRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL2NvbnNvbGUubG9nKCB0aGlzLm9wdGlvbnMpXHJcbiAgICAgICAgdGhpcy51cGRhdGUoKVxyXG4gICAgfVxyXG5cclxuICAgIHhBeGlzSGVpZ2h0Q2hhbmdlKHsgeEF4aXNIZWlnaHQgfSkge1xyXG4gICAgICAgIHRoaXMub3B0aW9ucz17XHJcbiAgICAgICAgICAgIC4uLnRoaXMub3B0aW9ucyxcclxuICAgICAgICAgICAgeEF4aXM6IHtcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMub3B0aW9ucy54QXhpcyxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogeEF4aXNIZWlnaHRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwieEF4aXNIZWlnaHRDaGFuZ2VcIiwgeEF4aXNIZWlnaHQsIEpTT04uc3RyaW5naWZ5KHRoaXMub3B0aW9ucy54QXhpcykpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlKClcclxuICAgIH1cclxuICAgIGhlYWRlckhlaWdodENoYW5nZSh7IGhlYWRlckhlaWdodCB9KSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zPXtcclxuICAgICAgICAgICAgLi4udGhpcy5vcHRpb25zLFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMub3B0aW9ucy5oZWFkZXIsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGhlYWRlckhlaWdodFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudXBkYXRlKClcclxuICAgIH1cclxuXHJcblxyXG4gICAgdG9vbFRpcFBsYWNjZW1lbnQoZGF0YSkge1xyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYmFyVHlwZT09J3ZlcnRpY2FsJykge1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0YT4wPyAndG9wJzonYm90dG9tJ1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGE+MD8gJ3JpZ2h0JzonbGVmdCdcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJywgWyckZXZlbnQnXSlcclxuICAgIG9uUmVzaXplKGV2ZW50KSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIndpbmRvdzpyZXNpemVcIilcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMudXBkYXRlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFZpZXdCb3goKSB7XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy53aWR0aD4wJiZ0aGlzLm9wdGlvbnMuaGVpZ2h0PjApXHJcbiAgICAgICAgICAgIHJldHVybiAnMCAwICcrdGhpcy5vcHRpb25zLndpZHRoKycgJyt0aGlzLm9wdGlvbnMuaGVpZ2h0O1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuICcwIDAgMCAwJztcclxuICAgIH1cclxuICAgIFxyXG5cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBzdHJUb051bWJlcihzdHIpIHtcclxuICAgICAgICBsZXQgbnVtYmVyUGF0dGVybj0vXFxkKy9nO1xyXG4gICAgICAgIGxldCBudW09c3RyLm1hdGNoKG51bWJlclBhdHRlcm4pLmpvaW4oJycpXHJcbiAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQobnVtKTtcclxuICAgIH1cclxufVxyXG4iXX0=