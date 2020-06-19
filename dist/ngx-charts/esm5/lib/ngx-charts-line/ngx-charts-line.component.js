/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, ViewEncapsulation, ElementRef, ChangeDetectorRef, HostListener } from "@angular/core";
import { scaleBand, scaleLinear } from "d3-scale";
import { ColorHelper } from '../utils/color.helper';
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
        return scaleBand()
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
        return scaleBand()
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
    ngxChartsLineComponent.prototype.calPlotBackground = /**
     * @return {?}
     */
    function () {
        this.options = tslib_1.__assign({}, this.options, { plotBackground: tslib_1.__assign({}, this.options.plotBackground, { x: 0, y: 0, height: this.options.height - this.options.xAxis.height - this.options.header.height - this.options.padding, width: this.options.width - this.options.yAxis.width - this.options.padding }) });
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
        this.options = tslib_1.__assign({}, this.options, { yAxis: tslib_1.__assign({}, this.options.yAxis, { width: yAxisWidth, height: yAxisHeight }) });
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
        this.options = tslib_1.__assign({}, this.options, { xAxis: tslib_1.__assign({}, this.options.xAxis, { height: xAxisHeight }) });
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
        this.options = tslib_1.__assign({}, this.options, { header: tslib_1.__assign({}, this.options.header, { height: headerHeight }) });
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
        { type: Component, args: [{
                    selector: "ngx-charts-line",
                    template: "<div [style.width]=\"options.width+'px'\" [style.border]=\"'1px solid #f3f3f3'\">\r\n    \r\n    <svg version=\"1.1\" class=\"highcharts-root\" [attr.padding]=\"options.padding\" [attr.width]=\"options.width\"\r\n        [attr.height]=\"options.height\" [attr.viewBox]=\"'0 0 '+options.width +' '+ options.height\"\r\n        aria-label=\"Interactive chart\" [style.border]=\"'0px solid gray'\" [style.padding]=\"options.padding\"\r\n        aria-hidden=\"false\">\r\n\r\n        <g header [options]=\"options\" (headerHeightChange)=\"headerHeightChange($event)\"></g>\r\n\r\n        <g y-axis \r\n            [xScale]=\"xScale\" \r\n            [yScale]=\"yScale\" \r\n            [options]=\"options\" \r\n            [categories]=\"categories\" \r\n            [series]=\"series\"\r\n            (yAxisWidthChange)=\"yAxisWidthChange($event)\"></g>\r\n\r\n        <g x-axis \r\n            [xScale]=\"xScale\" \r\n            [yScale]=\"yScale\" \r\n            [options]=\"options\" \r\n            [categories]=\"categories\" \r\n            [series]=\"series\"\r\n            (xAxisHeightChange)=\"xAxisHeightChange($event)\"></g>\r\n\r\n        <g data-z-index=\"0.1\">\r\n            <polyline  \r\n                class=\"line\"\r\n                *ngFor=\"let line of lines\" \r\n                [attr.points]=\"line.points\"\r\n                [style.fill]=\"'none'\"\r\n                [style.stroke]=\"line.color\"\r\n                [style.stroke-width]=\"3\" >\r\n            </polyline>\r\n            <circle \r\n                *ngFor=\"let lc of lineCircle\"\r\n                [tooltip]=\"lc.value+', '+lc.group+', '+lc.data\" \r\n                [placement]=\"toolTipPlaccement(lc.data)\" \r\n                [attr.cx]=\"lc.x\" \r\n                [attr.cy]=\"lc.y\" \r\n                [attr.r]=\"3\" \r\n                [attr.stroke]=\"lc.color\" \r\n                [attr.stroke-width]=\"3\" \r\n                [attr.fill]=\"lc.color\">\r\n            </circle>\r\n        </g>\r\n\r\n    </svg>\r\n    <chart-legend\r\n        *ngIf=\"groupName.length\"\r\n        [groupName]=\"groupName\"\r\n        [options]=\"options\"\r\n        [series] = \"series\"    \r\n    >\r\n    </chart-legend>\r\n  \r\n</div>\r\n\r\n",
                    // changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styles: [".tooltip-example{text-align:center;padding:0 50px}.tooltip-example [tooltip]{display:inline-block;margin:50px 20px;width:180px;height:50px;border:1px solid gray;border-radius:5px;line-height:50px;text-align:center}.ng-tooltip{position:absolute;max-width:150px;font-size:14px;text-align:center;color:#fafae3;padding:3px 8px;background:#282a36;border-radius:4px;z-index:1000;opacity:0}.ng-tooltip:after{content:\"\";position:absolute;border-style:solid}.ng-tooltip-top:after{top:100%;left:50%;margin-left:-5px;border-width:5px;border-color:#000 transparent transparent}.ng-tooltip-bottom:after{bottom:100%;left:50%;margin-left:-5px;border-width:5px;border-color:transparent transparent #000}.ng-tooltip-left:after{top:50%;left:100%;margin-top:-5px;border-width:5px;border-color:transparent transparent transparent #000}.ng-tooltip-right:after{top:50%;right:100%;margin-top:-5px;border-width:5px;border-color:transparent #000 transparent transparent}.ng-tooltip-show{opacity:1}.line{stroke-dasharray:2000;stroke-dashoffset:2000;-webkit-animation:2s linear forwards line_frames;animation:2s linear forwards line_frames}@-webkit-keyframes line_frames{to{stroke-dashoffset:0}}@keyframes line_frames{to{stroke-dashoffset:0}}"]
                }] }
    ];
    /** @nocollapse */
    ngxChartsLineComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef }
    ]; };
    ngxChartsLineComponent.propDecorators = {
        options: [{ type: Input }],
        categories: [{ type: Input }],
        series: [{ type: Input }],
        onResize: [{ type: HostListener, args: ['window:resize', ['$event'],] }]
    };
    return ngxChartsLineComponent;
}());
export { ngxChartsLineComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNoYXJ0cy1saW5lLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0dXNoYXJnaG9zaGJkL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvbmd4LWNoYXJ0cy1saW5lL25neC1jaGFydHMtbGluZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULEtBQUssRUFDTCxpQkFBaUIsRUFJakIsVUFBVSxFQUNWLGlCQUFpQixFQUVqQixZQUFZLEVBQ2YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDbEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBR3BEO0lBOEhJLGdDQUNZLFlBQXdCLEVBQ3ZCLEdBQXNCO1FBRHZCLGlCQUFZLEdBQVosWUFBWSxDQUFZO1FBQ3ZCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBdEgzQixrQkFBYSxHQUFDO1lBQ2xCLE9BQU8sRUFBRSxVQUFVO1lBQ25CLEtBQUssRUFBRSxFQUFFO1lBQ1QsUUFBUSxFQUFFLEVBQUU7WUFDWixNQUFNLEVBQUUsQ0FBQztZQUNULEtBQUssRUFBRSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUM7WUFDVixLQUFLLEVBQUU7Z0JBQ0gsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsYUFBYSxFQUFFLENBQUM7Z0JBQ2hCLFVBQVUsRUFBRSxNQUFNO2dCQUNsQixhQUFhLEVBQUUsS0FBSztnQkFDcEIsaUJBQWlCLEVBQUMsRUFBRTthQUN2QjtZQUNELEtBQUssRUFBRTtnQkFDSCxLQUFLLEVBQUUsRUFBRTtnQkFDVCxLQUFLLEVBQUUsQ0FBQztnQkFDUixNQUFNLEVBQUMsQ0FBQztnQkFDUixhQUFhLEVBQUUsQ0FBQztnQkFDaEIsYUFBYSxFQUFFLEtBQUs7Z0JBQ3BCLGlCQUFpQixFQUFD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LENBQWEsRUFBQyxDQUFDO0lBQ3BDLENBQUM7Ozs7OztJQU9PLDRDQUFXOzs7OztJQUFuQixVQUFvQixHQUFHOztZQUNmLGFBQWEsR0FBQyxNQUFNOztZQUNwQixHQUFHLEdBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ3pDLE9BQU8sVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNCLENBQUM7O2dCQTdYSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsOHNFQUErQzs7b0JBRy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOztpQkFDeEM7Ozs7Z0JBaEJHLFVBQVU7Z0JBQ1YsaUJBQWlCOzs7MEJBZ0VoQixLQUFLOzZCQXNETCxLQUFLO3lCQUNMLEtBQUs7MkJBZ1FMLFlBQVksU0FBQyxlQUFlLEVBQUUsQ0FBQyxRQUFRLENBQUM7O0lBZ0I3Qyw2QkFBQztDQUFBLEFBOVhELElBOFhDO1NBdFhZLHNCQUFzQjs7Ozs7O0lBRS9CLCtDQXlDRTs7Ozs7SUFFRiwwQ0FBeUI7O0lBd0R6Qiw0Q0FBNEI7O0lBQzVCLHdDQUF3Qjs7SUFNeEIsd0NBQVk7O0lBQ1osNENBQWdCOztJQUNoQix3Q0FBWTs7SUFDWix1Q0FBYzs7SUFDZCw0Q0FBcUI7O0lBQ3JCLDJDQUFzQjs7SUFDdEIsbURBQXVCOztJQUN2QixtREFBdUI7O0lBQ3ZCLDRDQUFnQjs7Ozs7SUFHWiw4Q0FBZ0M7Ozs7O0lBQ2hDLHFDQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBDb21wb25lbnQsXHJcbiAgICBJbnB1dCxcclxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxyXG4gICAgT25DaGFuZ2VzLFxyXG4gICAgT25Jbml0LFxyXG4gICAgU2ltcGxlQ2hhbmdlcyxcclxuICAgIEVsZW1lbnRSZWYsXHJcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gICAgSG9zdExpc3RlbmVyXHJcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuXHJcbmltcG9ydCB7IHNjYWxlQmFuZCwgc2NhbGVMaW5lYXIgfSBmcm9tIFwiZDMtc2NhbGVcIjtcclxuaW1wb3J0IHsgQ29sb3JIZWxwZXIgfSBmcm9tICcuLi91dGlscy9jb2xvci5oZWxwZXInO1xyXG5pbXBvcnQgeyBDbGFzc0dldHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyL3NyYy9vdXRwdXQvb3V0cHV0X2FzdCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIm5neC1jaGFydHMtbGluZVwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9uZ3gtY2hhcnRzLWxpbmUuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi9uZ3gtY2hhcnRzLWxpbmUuY29tcG9uZW50LmNzc1wiXSxcclxuICAgIC8vIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxyXG59KVxyXG4gICAgXHJcbmV4cG9ydCBjbGFzcyBuZ3hDaGFydHNMaW5lQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQge1xyXG5cclxuICAgIHByaXZhdGUgY3VzdG9tT3B0aW9ucz17XHJcbiAgICAgICAgYmFyVHlwZTogJ3ZlcnRpY2FsJyxcclxuICAgICAgICB0aXRsZTogJycsXHJcbiAgICAgICAgc3VidGl0bGU6ICcnLFxyXG4gICAgICAgIGhlaWdodDogMCxcclxuICAgICAgICB3aWR0aDogMCxcclxuICAgICAgICBwYWRkaW5nOiA1LFxyXG4gICAgICAgIHhBeGlzOiB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnJyxcclxuICAgICAgICAgICAgaGVpZ2h0OiAwLFxyXG4gICAgICAgICAgICBsYWJlbFJvdGF0aW9uOiAwLFxyXG4gICAgICAgICAgICBsYWJlbEFsaWduOiAnbGVmdCcsXHJcbiAgICAgICAgICAgIGxhYmVsRWxsaXBzaXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBsYWJlbEVsbGlwc2lzU2l6ZToxNlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgeUF4aXM6IHtcclxuICAgICAgICAgICAgdGl0bGU6ICcnLFxyXG4gICAgICAgICAgICB3aWR0aDogMCxcclxuICAgICAgICAgICAgaGVpZ2h0OjAsXHJcbiAgICAgICAgICAgIGxhYmVsUm90YXRpb246IDAsXHJcbiAgICAgICAgICAgIGxhYmVsRWxsaXBzaXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBsYWJlbEVsbGlwc2lzU2l6ZToxNlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGVnZW5kOiB7XHJcbiAgICAgICAgICAgIGxhYmVsRWxsaXBzaXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBsYWJlbEVsbGlwc2lzU2l6ZToxNlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGxvdEJhY2tncm91bmQ6IHtcclxuICAgICAgICAgICAgeDogMCxcclxuICAgICAgICAgICAgeTogMCxcclxuICAgICAgICAgICAgaGVpZ2h0OiAwLFxyXG4gICAgICAgICAgICB3aWR0aDogMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGxvdE9wdGlvbnM6IHsgXHJcbiAgICAgICAgICAgIGdyb3VwQmFyUGFkZGluZyA6MjAsXHJcbiAgICAgICAgICAgIGlubmVyQmFyUGFkZGluZyA6M1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgIGhlaWdodDogMCxcclxuICAgICAgICAgICAgd2lkdGg6IDBcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgX29wdGlvbnM6IGFueT17fTtcclxuXHJcbiAgICBASW5wdXQoKSBzZXQgb3B0aW9ucyhvYmo6IGFueSkge1xyXG4gICAgICAgIGxldCB4QXhpcz1vYmoueEF4aXM7XHJcbiAgICAgICAgeEF4aXNbJ2xhYmVsRWxsaXBzaXMnXT0ob2JqLnhBeGlzLmxhYmVsRWxsaXBzaXNTaXplIT11bmRlZmluZWQmJm9iai54QXhpcy5sYWJlbEVsbGlwc2lzU2l6ZT4wKT8gdHJ1ZTpmYWxzZTtcclxuXHJcbiAgICAgICAgbGV0IHlBeGlzPW9iai55QXhpcztcclxuICAgICAgICB5QXhpc1snbGFiZWxFbGxpcHNpcyddPShvYmoueUF4aXMubGFiZWxFbGxpcHNpc1NpemUhPXVuZGVmaW5lZCYmb2JqLnlBeGlzLmxhYmVsRWxsaXBzaXNTaXplPjApPyB0cnVlOmZhbHNlO1xyXG5cclxuICAgICAgICBsZXQgbGVnZW5kPW9iai5sZWdlbmQ7XHJcbiAgICAgICAgbGVnZW5kWydsYWJlbEVsbGlwc2lzJ109KG9iai5sZWdlbmQubGFiZWxFbGxpcHNpc1NpemUhPXVuZGVmaW5lZCYmb2JqLmxlZ2VuZC5sYWJlbEVsbGlwc2lzU2l6ZT4wKT8gdHJ1ZTpmYWxzZTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgcGxvdEJhY2tncm91bmQ9b2JqLnBsb3RCYWNrZ3JvdW5kO1xyXG4gICAgICAgIGxldCBwbG90T3B0aW9ucz1vYmoucGxvdE9wdGlvbnM7XHJcbiAgICAgICAgbGV0IGhlYWRlcj1vYmouaGVhZGVyO1xyXG5cclxuICAgICAgICBkZWxldGUgb2JqWyd4QXhpcyddO1xyXG4gICAgICAgIGRlbGV0ZSBvYmpbJ3lBeGlzJ107XHJcbiAgICAgICAgZGVsZXRlIG9ialsnbGVnZW5kJ107XHJcbiAgICAgICAgZGVsZXRlIG9ialsncGxvdEJhY2tncm91bmQnXTtcclxuICAgICAgICBkZWxldGUgb2JqWydwbG90T3B0aW9ucyddO1xyXG4gICAgICAgIGRlbGV0ZSBvYmpbJ2hlYWRlciddO1xyXG5cclxuICAgICAgICB0aGlzLl9vcHRpb25zPXtcclxuICAgICAgICAgICAgLi4udGhpcy5jdXN0b21PcHRpb25zLFxyXG4gICAgICAgICAgICAuLi5vYmosXHJcbiAgICAgICAgICAgIHhBeGlzOiB7XHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLmN1c3RvbU9wdGlvbnMueEF4aXMsXHJcbiAgICAgICAgICAgICAgICAuLi54QXhpc1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB5QXhpczoge1xyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5jdXN0b21PcHRpb25zLnlBeGlzLFxyXG4gICAgICAgICAgICAgICAgLi4ueUF4aXNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbGVnZW5kOnsgXHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLmN1c3RvbU9wdGlvbnMubGVnZW5kLFxyXG4gICAgICAgICAgICAgICAgLi4ubGVnZW5kXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHBsb3RCYWNrZ3JvdW5kOiB7XHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLmN1c3RvbU9wdGlvbnMucGxvdEJhY2tncm91bmQsXHJcbiAgICAgICAgICAgICAgICAuLi5wbG90QmFja2dyb3VuZFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwbG90T3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5jdXN0b21PcHRpb25zLnBsb3RPcHRpb25zLFxyXG4gICAgICAgICAgICAgICAgLi4ucGxvdE9wdGlvbnNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLmN1c3RvbU9wdGlvbnMuaGVhZGVyLFxyXG4gICAgICAgICAgICAgICAgLi4uaGVhZGVyXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuX29wdGlvbnNbJ2JhclR5cGUnXT0ndmVydGljYWwnO1xyXG4gICAgfVxyXG4gICAgZ2V0IG9wdGlvbnMoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fb3B0aW9ucztcclxuICAgIH1cclxuICAgIEBJbnB1dCgpIGNhdGVnb3JpZXM6IGFueT1bXTtcclxuICAgIEBJbnB1dCgpIHNlcmllczogYW55PVtdO1xyXG5cclxuICAgIC8vQElucHV0KCkgZ3JvdXBCYXJQYWRkaW5nPTIwO1xyXG4gICAgLy9ASW5wdXQoKSBpbm5lckJhclBhZGRpbmc9MztcclxuXHJcbiAgICAvLyBzY2FsZTogYW55O1xyXG4gICAgeFNjYWxlOiBhbnk7XHJcbiAgICBpbm5lclNjYWxlOiBhbnk7XHJcbiAgICB5U2NhbGU6IGFueTtcclxuICAgIGxpbmVzOiBhbnk9W107XHJcbiAgICBsaW5lQ2lyY2xlOiBhbnkgPSBbXTtcclxuICAgIGdyb3VwTmFtZTogYW55W10gPSBbXTtcclxuICAgIGdyb3VwQmFyUGFkZGluZ0JLOiBhbnk7XHJcbiAgICBpbm5lckJhclBhZGRpbmdCSzogYW55O1xyXG4gICAgY29sb3JTY2FsZTogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgY2hhcnRFbGVtZW50OiBFbGVtZW50UmVmLFxyXG4gICAgICAgIHByaXZhdGUgIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHsgfVxyXG5cclxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmdyb3VwQmFyUGFkZGluZ0JLPXRoaXMub3B0aW9ucy5wbG90T3B0aW9ucy5ncm91cEJhclBhZGRpbmc7XHJcbiAgICAgICAgdGhpcy5pbm5lckJhclBhZGRpbmdCSz10aGlzLm9wdGlvbnMucGxvdE9wdGlvbnMuaW5uZXJCYXJQYWRkaW5nO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy51cGRhdGUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLndpZHRoPXRoaXMub3B0aW9ucy53aWR0aDtcclxuICAgICAgICB0aGlzLm9wdGlvbnMuaGVpZ2h0PXRoaXMub3B0aW9ucy5oZWlnaHQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJ0dHR0dHR0XCIsdGhpcy5vcHRpb25zKVxyXG4gICAgICAgIGNvbnN0IGhvc3RFbGVtPXRoaXMuY2hhcnRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICAgICAgbGV0IGRpbXM9aG9zdEVsZW0ucGFyZW50Tm9kZSE9PW51bGw/IGhvc3RFbGVtLnBhcmVudE5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk6e2hlaWdodDo0MDAsIHdpZHRoOjgwMH07XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHN0eWxlPWhvc3RFbGVtLnBhcmVudE5vZGUuY3VycmVudFN0eWxlfHx3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShob3N0RWxlbS5wYXJlbnROb2RlKTtcclxuICAgICAgIFxyXG4gICAgICAgIHRoaXMub3B0aW9ucy5oZWlnaHQgPSAhdGhpcy5vcHRpb25zLmhlaWdodD8gZGltcy5oZWlnaHQgLSB0aGlzLnN0clRvTnVtYmVyKHN0eWxlLnBhZGRpbmdMZWZ0KSAtIHRoaXMuc3RyVG9OdW1iZXIoc3R5bGUucGFkZGluZ1JpZ2h0KSAgOnRoaXMub3B0aW9ucy5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLndpZHRoID0gIXRoaXMub3B0aW9ucy53aWR0aCA/IGRpbXMud2lkdGgtIHRoaXMuc3RyVG9OdW1iZXIoc3R5bGUucGFkZGluZ0xlZnQpIC0gdGhpcy5zdHJUb051bWJlcihzdHlsZS5wYWRkaW5nUmlnaHQpICAgOiBkaW1zLndpZHRoLSB0aGlzLnN0clRvTnVtYmVyKHN0eWxlLnBhZGRpbmdMZWZ0KSAtIHRoaXMuc3RyVG9OdW1iZXIoc3R5bGUucGFkZGluZ1JpZ2h0KTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmNhbFBsb3RCYWNrZ3JvdW5kKClcclxuXHJcbiAgICAgICAgbGV0IGNvdW50RmxhZz1mYWxzZTtcclxuICAgICAgICB0aGlzLm9wdGlvbnMucGxvdE9wdGlvbnMuZ3JvdXBCYXJQYWRkaW5nPXRoaXMuZ3JvdXBCYXJQYWRkaW5nQks7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLnBsb3RPcHRpb25zLmlubmVyQmFyUGFkZGluZz10aGlzLmlubmVyQmFyUGFkZGluZ0JLO1xyXG4gICAgICAgIGRvIHtcclxuICAgICAgICAgICAgaWYgKGNvdW50RmxhZz09dHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLnBsb3RPcHRpb25zLmdyb3VwQmFyUGFkZGluZy0tO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLnBsb3RPcHRpb25zLmlubmVyQmFyUGFkZGluZyA9IDI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5iYXJUeXBlPT0ndmVydGljYWwnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnhTY2FsZT10aGlzLmdldFhTY2FsZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgeyBcclxuICAgICAgICAgICAgICAgIHRoaXMueVNjYWxlPXRoaXMuZ2V0WFNjYWxlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pbm5lclNjYWxlPXRoaXMuZ2V0SW5uZXJTY2FsZSgpO1xyXG4gICAgICAgICAgICBjb3VudEZsYWc9dHJ1ZTtcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgIH0gd2hpbGUgKHRoaXMuaW5uZXJTY2FsZS5iYW5kd2lkdGgoKTwyKTtcclxuICAgICAgICAvLyBcclxuXHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5iYXJUeXBlPT0ndmVydGljYWwnKSB7XHJcbiAgICAgICAgICAgIHRoaXMueVNjYWxlPXRoaXMuZ2V0WVNjYWxlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgeyBcclxuICAgICAgICAgICAgdGhpcy54U2NhbGU9dGhpcy5nZXRZU2NhbGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGNvbG9ySGVscGVyPW5ldyBDb2xvckhlbHBlcih0aGlzLm9wdGlvbnMsIHRoaXMuc2VyaWVzKTtcclxuICAgICAgICB0aGlzLmNvbG9yU2NhbGU9Y29sb3JIZWxwZXIuZ2VuZXJhdGVDb2xvclNjYWxlKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmdyb3VwTmFtZT1bXTtcclxuICAgICAgICAgICAgdGhpcy5zZXJpZXMubWFwKGl0ZW0gPT4geyBcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLm5hbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm91cE5hbWUucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGl0ZW0ubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoaXMuY29sb3JTY2FsZShpdGVtLm5hbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTGluZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRYU2NhbGUoKTogYW55IHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgc3BhY2luZztcclxuICAgICAgICBsZXQgcmFuZ2U7XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5iYXJUeXBlPT0ndmVydGljYWwnKSB7XHJcbiAgICAgICAgICAgIHNwYWNpbmc9KHRoaXMuY2F0ZWdvcmllcy5sZW5ndGgvKHRoaXMub3B0aW9ucy5wbG90QmFja2dyb3VuZC53aWR0aC90aGlzLm9wdGlvbnMucGxvdE9wdGlvbnMuZ3JvdXBCYXJQYWRkaW5nKSk7XHJcbiAgICAgICAgICAgIHJhbmdlPSBbMCwgdGhpcy5vcHRpb25zLnBsb3RCYWNrZ3JvdW5kLndpZHRoXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7IFxyXG4gICAgICAgICAgICBsZXQgbGVuZ3RoPXRoaXMub3B0aW9ucy5oZWlnaHQtdGhpcy5vcHRpb25zLmhlYWRlci5oZWlnaHQ7XHJcbiAgICAgICAgICAgIHNwYWNpbmc9KHRoaXMuY2F0ZWdvcmllcy5sZW5ndGgvKHRoaXMub3B0aW9ucy5wbG90QmFja2dyb3VuZC5oZWlnaHQvdGhpcy5vcHRpb25zLnBsb3RPcHRpb25zLmdyb3VwQmFyUGFkZGluZykpO1xyXG4gICAgICAgICAgICByYW5nZT1bMCwgdGhpcy5vcHRpb25zLnBsb3RCYWNrZ3JvdW5kLmhlaWdodF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzY2FsZUJhbmQoKVxyXG4gICAgICAgICAgICAucmFuZ2UocmFuZ2UpXHJcbiAgICAgICAgICAgIC5wYWRkaW5nSW5uZXIoc3BhY2luZylcclxuICAgICAgICAgICAgLnBhZGRpbmdPdXRlcigwLjEpXHJcbiAgICAgICAgICAgIC5kb21haW4odGhpcy5jYXRlZ29yaWVzKTtcclxuICAgIH1cclxuICAgIGdldElubmVyU2NhbGUoKTogYW55IHtcclxuXHJcbiAgICAgICAgbGV0IGdyb3VwRGF0YUFycj1bXTtcclxuICAgICAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy5zZXJpZXMubGVuZ3RoOyBpKyspIHsgXHJcbiAgICAgICAgICAgIGdyb3VwRGF0YUFyci5wdXNoKHRoaXMuc2VyaWVzW2ldLm5hbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNwYWNpbmc7XHJcbiAgICAgICAgbGV0IHJhbmdlO1xyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYmFyVHlwZT09J3ZlcnRpY2FsJykge1xyXG4gICAgICAgICAgICBzcGFjaW5nPSh0aGlzLnNlcmllcy5sZW5ndGgvKHRoaXMueFNjYWxlLmJhbmR3aWR0aCgpL3RoaXMub3B0aW9ucy5wbG90T3B0aW9ucy5pbm5lckJhclBhZGRpbmcpKTtcclxuICAgICAgICAgICAgcmFuZ2U9dGhpcy54U2NhbGUuYmFuZHdpZHRoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgeyBcclxuICAgICAgICAgICAgc3BhY2luZz0odGhpcy5zZXJpZXMubGVuZ3RoLyh0aGlzLnlTY2FsZS5iYW5kd2lkdGgoKS90aGlzLm9wdGlvbnMucGxvdE9wdGlvbnMuaW5uZXJCYXJQYWRkaW5nKSk7XHJcbiAgICAgICAgICAgIHJhbmdlPXRoaXMueVNjYWxlLmJhbmR3aWR0aCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNjYWxlQmFuZCgpXHJcbiAgICAgICAgICAgIC5yYW5nZShbMCwgcmFuZ2VdKVxyXG4gICAgICAgICAgICAucGFkZGluZ0lubmVyKHNwYWNpbmcpXHJcbiAgICAgICAgICAgIC5kb21haW4oZ3JvdXBEYXRhQXJyKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0WVNjYWxlKCk6IGFueSB7XHJcbiAgICAgICAgbGV0IHVuaXF1ZVZhbHVlOiBhbnk9bmV3IFNldCgpO1xyXG4gICAgICAgIHRoaXMuc2VyaWVzLm1hcCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBpdGVtLmRhdGEubWFwKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdW5pcXVlVmFsdWUuYWRkKHZhbHVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBtaW49TWF0aC5taW4oLi4udW5pcXVlVmFsdWUpO1xyXG4gICAgICAgIG1pbj1taW4+MD8gMDptaW47XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IG1heD1NYXRoLm1heCgwLCAuLi51bmlxdWVWYWx1ZSk7XHJcbiAgICAgICAgbWF4PW1heD4wPyBtYXg6MDtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgcmFuZ2UgPSBbXTtcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmJhclR5cGU9PSd2ZXJ0aWNhbCcpIHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlPXRoaXMub3B0aW9ucy5wbG90QmFja2dyb3VuZC5oZWlnaHQ7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiYmFyIGdldFlTY2FsZVwiLHZhbHVlKVxyXG4gICAgICAgICAgICByYW5nZT1bdmFsdWUsIDBdO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImJhciBnZXRZU2NhbGUgLSBcIiwgcmFuZ2UpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgeyBcclxuICAgICAgICAgICAgbGV0IHZhbHVlPXRoaXMub3B0aW9ucy5wbG90QmFja2dyb3VuZC53aWR0aC0zMDtcclxuICAgICAgICAgICAgcmFuZ2U9WzAsIHZhbHVlXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiYmFyIGdldFlTY2FsZSAtLS0gXCIsIHJhbmdlLCBtaW4sIG1heClcclxuXHJcbiAgICAgICAgcmV0dXJuIHNjYWxlTGluZWFyKClcclxuICAgICAgICAgICAgLnJhbmdlKHJhbmdlKVxyXG4gICAgICAgICAgICAuZG9tYWluKFttaW4sIG1heF0pO1xyXG4gICAgICAgIC8vcmV0dXJuIHRoaXMuc2NhbGUubmljZSgpLnRpY2tzKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGNhbFBsb3RCYWNrZ3JvdW5kKCkge1xyXG4gICAgICAgIHRoaXMub3B0aW9ucz17XHJcbiAgICAgICAgICAgIC4uLnRoaXMub3B0aW9ucyxcclxuICAgICAgICAgICAgcGxvdEJhY2tncm91bmQ6IHtcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMub3B0aW9ucy5wbG90QmFja2dyb3VuZCxcclxuICAgICAgICAgICAgICAgIHg6IDAsXHJcbiAgICAgICAgICAgICAgICB5OiAwLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OnRoaXMub3B0aW9ucy5oZWlnaHQtdGhpcy5vcHRpb25zLnhBeGlzLmhlaWdodC10aGlzLm9wdGlvbnMuaGVhZGVyLmhlaWdodC10aGlzLm9wdGlvbnMucGFkZGluZyxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiB0aGlzLm9wdGlvbnMud2lkdGgtdGhpcy5vcHRpb25zLnlBeGlzLndpZHRoLXRoaXMub3B0aW9ucy5wYWRkaW5nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJjYWxQbG90QmFja2dyb3VuZFwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLm9wdGlvbnMpKTtcclxuICAgIH1cclxuICAgIGNyZWF0ZUxpbmUoKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInRoaXMuaW5uZXJTY2FsZS5iYW5kd2lkdGgoKSBcIit0aGlzLmlubmVyU2NhbGUuYmFuZHdpZHRoKCkpXHJcbiAgICAgICAgdGhpcy5saW5lcz1bXTtcclxuICAgICAgICB0aGlzLmxpbmVDaXJjbGU9W107XHJcbiAgICAgICAgZm9yIChsZXQgaT0wOyBpPHRoaXMuc2VyaWVzLmxlbmd0aDsgaSsrKSB7IFxyXG4gICAgICAgICAgICBsZXQgbGluZT17cG9pbnRzOlwiXCIsIGNvbG9yOlwiXCJ9XHJcbiAgICAgICAgICAgIGZvciAobGV0IGo9MDsgajx0aGlzLmNhdGVnb3JpZXMubGVuZ3RoOyBqKyspIHsgXHJcbiAgICAgICAgICAgICAgICBsZXQgeD10aGlzLnhTY2FsZSh0aGlzLmNhdGVnb3JpZXNbal0pKyh0aGlzLnhTY2FsZS5iYW5kd2lkdGgoKS8yKSt0aGlzLm9wdGlvbnMueUF4aXMud2lkdGg7XHJcbiAgICAgICAgICAgICAgICBsZXQgeSA9IHRoaXMueVNjYWxlKHRoaXMuc2VyaWVzW2ldLmRhdGFbal0pK3RoaXMub3B0aW9ucy5oZWFkZXIuaGVpZ2h0XHJcbiAgICAgICAgICAgICAgICBsaW5lLnBvaW50cys9KHggK1wiLFwiK3krXCIgXCIpO1xyXG4gICAgICAgICAgICAgICAgbGluZS5jb2xvcj10aGlzLmNvbG9yU2NhbGUodGhpcy5zZXJpZXNbaV0ubmFtZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmVDaXJjbGUucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgeCxcclxuICAgICAgICAgICAgICAgICAgICB5LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiB0aGlzLmNvbG9yU2NhbGUodGhpcy5zZXJpZXNbaV0ubmFtZSksXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuY2F0ZWdvcmllc1tqXSwgIC8vamFuLGZlYlxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuc2VyaWVzW2ldLmRhdGFbal0sIC8vMTAxLDIwMlxyXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwOiB0aGlzLnNlcmllc1tpXS5uYW1lXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmxpbmVzLnB1c2gobGluZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmxpbmVDaXJjbGUpO1xyXG4gICAgICAgXHJcbiAgICAgICBcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICB5QXhpc1dpZHRoQ2hhbmdlKHsgeUF4aXNXaWR0aCx5QXhpc0hlaWdodCB9KSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInlBeGlzV2lkdGggXCIreUF4aXNXaWR0aClcclxuICAgICAgICB0aGlzLm9wdGlvbnM9e1xyXG4gICAgICAgICAgICAuLi50aGlzLm9wdGlvbnMsXHJcbiAgICAgICAgICAgIHlBeGlzOiB7XHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLm9wdGlvbnMueUF4aXMsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogeUF4aXNXaWR0aCxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogeUF4aXNIZWlnaHRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL2NvbnNvbGUubG9nKCB0aGlzLm9wdGlvbnMpXHJcbiAgICAgICAgdGhpcy51cGRhdGUoKVxyXG4gICAgfVxyXG5cclxuICAgIHhBeGlzSGVpZ2h0Q2hhbmdlKHsgeEF4aXNIZWlnaHQgfSkge1xyXG4gICAgICAgIHRoaXMub3B0aW9ucz17XHJcbiAgICAgICAgICAgIC4uLnRoaXMub3B0aW9ucyxcclxuICAgICAgICAgICAgeEF4aXM6IHtcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMub3B0aW9ucy54QXhpcyxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogeEF4aXNIZWlnaHRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwieEF4aXNIZWlnaHRDaGFuZ2VcIiwgeEF4aXNIZWlnaHQsIEpTT04uc3RyaW5naWZ5KHRoaXMub3B0aW9ucy54QXhpcykpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlKClcclxuICAgIH1cclxuICAgIGhlYWRlckhlaWdodENoYW5nZSh7IGhlYWRlckhlaWdodCB9KSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zPXtcclxuICAgICAgICAgICAgLi4udGhpcy5vcHRpb25zLFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMub3B0aW9ucy5oZWFkZXIsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGhlYWRlckhlaWdodFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudXBkYXRlKClcclxuICAgIH1cclxuXHJcblxyXG4gICAgdG9vbFRpcFBsYWNjZW1lbnQoZGF0YSkgeyBcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmJhclR5cGU9PSd2ZXJ0aWNhbCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGE+MD8gJ3RvcCc6J2JvdHRvbSdcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7IFxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YT4wPyAncmlnaHQnOidsZWZ0J1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnLCBbJyRldmVudCddKVxyXG4gICAgb25SZXNpemUoZXZlbnQpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwid2luZG93OnJlc2l6ZVwiKVxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy51cGRhdGUoKSk7XHJcbiAgICB9XHJcblxyXG4gICBcclxuICAgIFxyXG4gICAgXHJcblxyXG5cclxuICAgIHByaXZhdGUgc3RyVG9OdW1iZXIoc3RyKSB7IFxyXG4gICAgICAgIGxldCBudW1iZXJQYXR0ZXJuPS9cXGQrL2c7XHJcbiAgICAgICAgbGV0IG51bT1zdHIubWF0Y2gobnVtYmVyUGF0dGVybikuam9pbignJylcclxuICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChudW0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==