/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewEncapsulation, ElementRef, ChangeDetectorRef, HostListener } from "@angular/core";
import { scaleBand, scaleLinear } from "d3-scale";
import { ColorHelper } from '../utils/color.helper';
import { trimLabel } from '../utils/trim-label.helper';
export class ngxChartsBarComponent {
    /**
     * @param {?} element
     * @param {?} chartElement
     * @param {?} cdr
     */
    constructor(element, chartElement, cdr) {
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
    /**
     * @param {?} obj
     * @return {?}
     */
    set options(obj) {
        /** @type {?} */
        let xAxis = obj.xAxis;
        /** @type {?} */
        let yAxis = obj.yAxis;
        /** @type {?} */
        let legend = obj.legend;
        /** @type {?} */
        let plotBackground = obj.plotBackground;
        /** @type {?} */
        let plotOptions = obj.plotOptions;
        /** @type {?} */
        let header = obj.header;
        delete obj['xAxis'];
        delete obj['yAxis'];
        delete obj['legend'];
        delete obj['plotBackground'];
        delete obj['plotOptions'];
        delete obj['header'];
        this._options = Object.assign({}, this.customOptions, obj, { xAxis: Object.assign({}, this.customOptions.xAxis, xAxis), yAxis: Object.assign({}, this.customOptions.yAxis, yAxis), legend: Object.assign({}, this.customOptions.legend, legend), plotBackground: Object.assign({}, this.customOptions.plotBackground, plotBackground), plotOptions: Object.assign({}, this.customOptions.plotOptions, plotOptions), header: Object.assign({}, this.customOptions.header, header) });
        // console.log(this._options)
    }
    /**
     * @return {?}
     */
    get options() {
        return this._options;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this.groupBarPaddingBK = this.options.plotOptions.groupBarPadding;
        this.innerBarPaddingBK = this.options.plotOptions.innerBarPadding;
        setTimeout((/**
         * @return {?}
         */
        () => this.update()));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.options.width = this.options.width;
        this.options.height = this.options.height;
        this.update();
    }
    /**
     * @return {?}
     */
    update() {
        // console.log("ttttttt",this.options)
        /** @type {?} */
        const hostElem = this.chartElement.nativeElement;
        /** @type {?} */
        let dims = hostElem.parentNode !== null ? hostElem.parentNode.getBoundingClientRect() : { height: 400, width: 800 };
        /** @type {?} */
        var style = hostElem.parentNode.currentStyle || window.getComputedStyle(hostElem.parentNode);
        this.options.height = !this.options.height ? dims.height - this.strToNumber(style.paddingLeft) - this.strToNumber(style.paddingRight) : this.options.height;
        this.options.width = !this.options.width ? dims.width - this.strToNumber(style.paddingLeft) - this.strToNumber(style.paddingRight) : dims.width - this.strToNumber(style.paddingLeft) - this.strToNumber(style.paddingRight);
        this.calPlotBackground();
        /** @type {?} */
        let countFlag = false;
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
        let colorHelper = new ColorHelper(this.options, this.series);
        this.colorScale = colorHelper.generateColorScale();
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.groupName = [];
            this.series.map((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                if (item.name)
                    this.groupName.push({
                        name: item.name,
                        color: this.colorScale(item.name)
                    });
            }));
            this.createBar();
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
    }
    /**
     * @return {?}
     */
    getXScale() {
        /** @type {?} */
        let spacing;
        /** @type {?} */
        let range;
        if (this.options.barType == 'vertical') {
            spacing = (this.categories.length / (this.options.plotBackground.width / this.options.plotOptions.groupBarPadding));
            range = [0, this.options.plotBackground.width];
        }
        else {
            /** @type {?} */
            let length = this.options.height - this.options.header.height;
            spacing = (this.categories.length / (this.options.plotBackground.height / this.options.plotOptions.groupBarPadding));
            range = [0, this.options.plotBackground.height];
        }
        return scaleBand()
            .range(range)
            .paddingInner(spacing)
            .paddingOuter(0.1)
            .domain(this.categories);
    }
    /**
     * @return {?}
     */
    getInnerScale() {
        /** @type {?} */
        let groupDataArr = [];
        for (let i = 0; i < this.series.length; i++) {
            groupDataArr.push(this.series[i].name);
        }
        /** @type {?} */
        let spacing;
        /** @type {?} */
        let range;
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
    }
    /**
     * @return {?}
     */
    getYScale() {
        /** @type {?} */
        let uniqueValue = new Set();
        this.series.map((/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            item.data.map((/**
             * @param {?} value
             * @return {?}
             */
            (value) => {
                uniqueValue.add(value);
            }));
        }));
        /** @type {?} */
        let min = Math.min(...uniqueValue);
        min = min > 0 ? 0 : min;
        /** @type {?} */
        let max = Math.max(0, ...uniqueValue);
        max = max > 0 ? max : 0;
        /** @type {?} */
        let range = [];
        if (this.options.barType == 'vertical') {
            /** @type {?} */
            let value = this.options.plotBackground.height;
            // console.log("bar getYScale",value)
            range = [value, 0];
            // console.log("bar getYScale - ", range)
        }
        else {
            /** @type {?} */
            let value = this.options.plotBackground.width - 30;
            range = [0, value];
        }
        // console.log("bar getYScale --- ", range, min, max)
        return scaleLinear()
            .range(range)
            .domain([min, max]);
        //return this.scale.nice().ticks();
    }
    /**
     * @return {?}
     */
    calPlotBackground() {
        this.options = Object.assign({}, this.options, { plotBackground: Object.assign({}, this.options.plotBackground, { x: 0, y: 0, height: this.options.height - this.options.xAxis.height - this.options.header.height - this.options.padding, width: this.options.width - this.options.yAxis.width - this.options.padding }) });
        // console.log("calPlotBackground", JSON.stringify(this.options));
    }
    /**
     * @return {?}
     */
    createBar() {
        //console.log("this.innerScale.bandwidth() "+this.innerScale.bandwidth())
        this.bars = [];
        if (this.options.barType == 'vertical') {
            this.categories.map((/**
             * @param {?} item
             * @param {?} index
             * @return {?}
             */
            (item, index) => {
                for (let i = 0; i < this.series.length; i++) {
                    /** @type {?} */
                    const bar = {
                        value: item,
                        //jan,feb
                        data: this.series[i].data[index],
                        //101,202
                        group: this.series[i].name,
                        color: this.colorScale(this.series[i].name),
                        //formattedLabel,
                        width: this.innerScale.bandwidth(),
                        height: this.series[i].data[index] > 0 ? (this.yScale(0) - this.yScale(this.series[i].data[index])) : (this.yScale(this.series[i].data[index]) - this.yScale(0)),
                        x: this.innerScale(this.series[i].name) + this.xScale(item),
                        y: this.series[i].data[index] > 0 ? this.yScale(this.series[i].data[index]) : this.yScale(0),
                        className: "vertical_bar"
                    };
                    this.bars.push(bar);
                }
            }));
        }
        else {
            this.categories.map((/**
             * @param {?} item
             * @param {?} index
             * @return {?}
             */
            (item, index) => {
                for (let i = 0; i < this.series.length; i++) {
                    /** @type {?} */
                    const bar = {
                        value: item,
                        //jan,feb
                        data: this.series[i].data[index],
                        //101,202
                        group: this.series[i].name,
                        color: this.colorScale(this.series[i].name),
                        //formattedLabel,
                        width: this.series[i].data[index] > 0 ? (this.xScale(this.series[i].data[index]) - this.xScale(0)) : (this.xScale(0) - this.xScale(this.series[i].data[index])),
                        height: this.innerScale.bandwidth(),
                        x: this.series[i].data[index] > 0 ? this.xScale(0) : this.xScale(this.series[i].data[index]),
                        y: this.innerScale(this.series[i].name) + this.yScale(item),
                        className: "horizontal_bar"
                    };
                    this.bars.push(bar);
                }
            }));
        }
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    yAxisWidthChange({ yAxisWidth, yAxisHeight }) {
        //console.log("yAxisWidth "+yAxisWidth)
        this.options = Object.assign({}, this.options, { yAxis: Object.assign({}, this.options.yAxis, { width: yAxisWidth, height: yAxisHeight }) });
        //console.log( this.options)
        this.update();
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    xAxisHeightChange({ xAxisHeight }) {
        this.options = Object.assign({}, this.options, { xAxis: Object.assign({}, this.options.xAxis, { height: xAxisHeight }) });
        //console.log("xAxisHeightChange", xAxisHeight, JSON.stringify(this.options.xAxis));
        this.update();
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    headerHeightChange({ headerHeight }) {
        this.options = Object.assign({}, this.options, { header: Object.assign({}, this.options.header, { height: headerHeight }) });
        this.update();
    }
    /**
     * @param {?} data
     * @return {?}
     */
    toolTipPlaccement(data) {
        if (this.options.barType == 'vertical') {
            return data > 0 ? 'top' : 'bottom';
        }
        else {
            return data > 0 ? 'right' : 'left';
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onResize(event) {
        //console.log("window:resize")
        setTimeout((/**
         * @return {?}
         */
        () => this.update()));
    }
    /**
     * @private
     * @param {?} str
     * @return {?}
     */
    strToNumber(str) {
        /** @type {?} */
        let numberPattern = /\d+/g;
        /** @type {?} */
        let num = str.match(numberPattern).join('');
        return parseFloat(num);
    }
}
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
ngxChartsBarComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
ngxChartsBarComponent.propDecorators = {
    options: [{ type: Input }],
    categories: [{ type: Input }],
    series: [{ type: Input }],
    onResize: [{ type: HostListener, args: ['window:resize', ['$event'],] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNoYXJ0cy1iYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHR1c2hhcmdob3NoYmQvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtY2hhcnRzLWJhci9uZ3gtY2hhcnRzLWJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsS0FBSyxFQUNMLGlCQUFpQixFQUlqQixVQUFVLEVBQ1YsaUJBQWlCLEVBRWpCLFlBQVksRUFDZixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBV3ZELE1BQU0sT0FBTyxxQkFBcUI7Ozs7OztJQWdIOUIsWUFBWSxPQUFtQixFQUNuQixZQUF3QixFQUN4QixHQUFzQjtRQUR0QixpQkFBWSxHQUFaLFlBQVksQ0FBWTtRQUN4QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQWhIMUIsa0JBQWEsR0FBQztZQUNsQixPQUFPLEVBQUUsVUFBVTtZQUNuQixLQUFLLEVBQUUsRUFBRTtZQUNULFFBQVEsRUFBRSxFQUFFO1lBQ1osTUFBTSxFQUFFLENBQUM7WUFDVCxLQUFLLEVBQUUsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDO1lBQ1YsS0FBSyxFQUFFO2dCQUNILEtBQUssRUFBRSxFQUFFO2dCQUNULE1BQU0sRUFBRSxDQUFDO2dCQUNULGFBQWEsRUFBRSxDQUFDO2dCQUNoQixVQUFVLEVBQUUsTUFBTTtnQkFDbEIsYUFBYSxFQUFFLEtBQUs7Z0JBQ3BCLGlCQUFpQixFQUFDLEVBQUU7YUFDdkI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsTUFB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QUNWLDhCQUE4QjtRQUM5QixVQUFVOzs7UUFBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUMsQ0FBQztJQUNwQyxDQUFDOzs7Ozs7SUFPTyxXQUFXLENBQUMsR0FBRzs7WUFDZixhQUFhLEdBQUMsTUFBTTs7WUFDcEIsR0FBRyxHQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUN6QyxPQUFPLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzQixDQUFDOzs7WUFqWkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLGloRUFBOEM7O2dCQUc5QyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7YUFDeEM7Ozs7WUFsQkcsVUFBVTtZQUFWLFVBQVU7WUFDVixpQkFBaUI7OztzQkFrRWhCLEtBQUs7eUJBZ0RMLEtBQUs7cUJBQ0wsS0FBSzt1QkEwUkwsWUFBWSxTQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7Ozs7OztJQXhYekMsOENBeUNFOzs7OztJQUVGLHlDQUF5Qjs7SUFrRHpCLDJDQUE0Qjs7SUFDNUIsdUNBQXdCOztJQUV4Qix3Q0FBYTs7SUFLYix1Q0FBWTs7SUFDWiwyQ0FBZ0I7O0lBQ2hCLHVDQUFZOztJQUNaLHFDQUFhOztJQUNiLDBDQUFvQjs7SUFDcEIsa0RBQXVCOztJQUN2QixrREFBdUI7O0lBQ3ZCLDJDQUFnQjs7SUFDaEIsMENBQWU7Ozs7O0lBRVgsNkNBQWdDOzs7OztJQUNoQyxvQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gICAgQ29tcG9uZW50LFxyXG4gICAgSW5wdXQsXHJcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcclxuICAgIE9uQ2hhbmdlcyxcclxuICAgIE9uSW5pdCxcclxuICAgIFNpbXBsZUNoYW5nZXMsXHJcbiAgICBFbGVtZW50UmVmLFxyXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICAgIEhvc3RMaXN0ZW5lclxyXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IHNlbGVjdCB9IGZyb20gJ2QzLXNlbGVjdGlvbic7XHJcbmltcG9ydCB7IHRyYW5zaXRpb24gfSBmcm9tICdkMy10cmFuc2l0aW9uJztcclxuaW1wb3J0IHsgc2NhbGVCYW5kLCBzY2FsZUxpbmVhciB9IGZyb20gXCJkMy1zY2FsZVwiO1xyXG5pbXBvcnQgeyBDb2xvckhlbHBlciB9IGZyb20gJy4uL3V0aWxzL2NvbG9yLmhlbHBlcic7XHJcbmltcG9ydCB7IHRyaW1MYWJlbCB9IGZyb20gJy4uL3V0aWxzL3RyaW0tbGFiZWwuaGVscGVyJztcclxuaW1wb3J0IHsgQ2xhc3NHZXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb21waWxlci9zcmMvb3V0cHV0L291dHB1dF9hc3QnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJuZ3gtY2hhcnRzLWJhclwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9uZ3gtY2hhcnRzLWJhci5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL25neC1jaGFydHMtYmFyLmNvbXBvbmVudC5jc3NcIl0sXHJcbiAgICAvLyBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBuZ3hDaGFydHNCYXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCB7XHJcblxyXG4gICAgcHJpdmF0ZSBjdXN0b21PcHRpb25zPXtcclxuICAgICAgICBiYXJUeXBlOiAndmVydGljYWwnLFxyXG4gICAgICAgIHRpdGxlOiAnJyxcclxuICAgICAgICBzdWJ0aXRsZTogJycsXHJcbiAgICAgICAgaGVpZ2h0OiAwLFxyXG4gICAgICAgIHdpZHRoOiAwLFxyXG4gICAgICAgIHBhZGRpbmc6IDUsXHJcbiAgICAgICAgeEF4aXM6IHtcclxuICAgICAgICAgICAgdGl0bGU6ICcnLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDAsXHJcbiAgICAgICAgICAgIGxhYmVsUm90YXRpb246IDAsXHJcbiAgICAgICAgICAgIGxhYmVsQWxpZ246ICdsZWZ0JyxcclxuICAgICAgICAgICAgbGFiZWxFbGxpcHNpczogZmFsc2UsXHJcbiAgICAgICAgICAgIGxhYmVsRWxsaXBzaXNTaXplOjE2XHJcbiAgICAgICAgfSxcclxuICAgICAgICB5QXhpczoge1xyXG4gICAgICAgICAgICB0aXRsZTogJycsXHJcbiAgICAgICAgICAgIHdpZHRoOiAwLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDAsXHJcbiAgICAgICAgICAgIGxhYmVsUm90YXRpb246IDAsXHJcbiAgICAgICAgICAgIGxhYmVsRWxsaXBzaXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBsYWJlbEVsbGlwc2lzU2l6ZToxNlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGVnZW5kOiB7XHJcbiAgICAgICAgICAgIGxhYmVsRWxsaXBzaXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBsYWJlbEVsbGlwc2lzU2l6ZToxNlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGxvdEJhY2tncm91bmQ6IHtcclxuICAgICAgICAgICAgeDogMCxcclxuICAgICAgICAgICAgeTogMCxcclxuICAgICAgICAgICAgaGVpZ2h0OiAwLFxyXG4gICAgICAgICAgICB3aWR0aDogMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGxvdE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgZ3JvdXBCYXJQYWRkaW5nOiAyMCxcclxuICAgICAgICAgICAgaW5uZXJCYXJQYWRkaW5nOiAzXHJcbiAgICAgICAgfSxcclxuICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgaGVpZ2h0OiAwLFxyXG4gICAgICAgICAgICB3aWR0aDogMFxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBfb3B0aW9uczogYW55PXt9O1xyXG5cclxuICAgIEBJbnB1dCgpIHNldCBvcHRpb25zKG9iajogYW55KSB7XHJcbiAgICAgICAgbGV0IHhBeGlzPW9iai54QXhpcztcclxuICAgICAgICBsZXQgeUF4aXM9b2JqLnlBeGlzO1xyXG4gICAgICAgIGxldCBsZWdlbmQ9b2JqLmxlZ2VuZDtcclxuICAgICAgICBsZXQgcGxvdEJhY2tncm91bmQ9b2JqLnBsb3RCYWNrZ3JvdW5kO1xyXG4gICAgICAgIGxldCBwbG90T3B0aW9ucz1vYmoucGxvdE9wdGlvbnM7XHJcbiAgICAgICAgbGV0IGhlYWRlcj1vYmouaGVhZGVyO1xyXG5cclxuICAgICAgICBkZWxldGUgb2JqWyd4QXhpcyddO1xyXG4gICAgICAgIGRlbGV0ZSBvYmpbJ3lBeGlzJ107XHJcbiAgICAgICAgZGVsZXRlIG9ialsnbGVnZW5kJ107XHJcbiAgICAgICAgZGVsZXRlIG9ialsncGxvdEJhY2tncm91bmQnXTtcclxuICAgICAgICBkZWxldGUgb2JqWydwbG90T3B0aW9ucyddO1xyXG4gICAgICAgIGRlbGV0ZSBvYmpbJ2hlYWRlciddO1xyXG5cclxuICAgICAgICB0aGlzLl9vcHRpb25zPXtcclxuICAgICAgICAgICAgLi4udGhpcy5jdXN0b21PcHRpb25zLFxyXG4gICAgICAgICAgICAuLi5vYmosXHJcbiAgICAgICAgICAgIHhBeGlzOiB7XHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLmN1c3RvbU9wdGlvbnMueEF4aXMsXHJcbiAgICAgICAgICAgICAgICAuLi54QXhpc1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB5QXhpczoge1xyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5jdXN0b21PcHRpb25zLnlBeGlzLFxyXG4gICAgICAgICAgICAgICAgLi4ueUF4aXNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbGVnZW5kOnsgXHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLmN1c3RvbU9wdGlvbnMubGVnZW5kLFxyXG4gICAgICAgICAgICAgICAgLi4ubGVnZW5kXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHBsb3RCYWNrZ3JvdW5kOiB7XHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLmN1c3RvbU9wdGlvbnMucGxvdEJhY2tncm91bmQsXHJcbiAgICAgICAgICAgICAgICAuLi5wbG90QmFja2dyb3VuZFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwbG90T3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5jdXN0b21PcHRpb25zLnBsb3RPcHRpb25zLFxyXG4gICAgICAgICAgICAgICAgLi4ucGxvdE9wdGlvbnNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLmN1c3RvbU9wdGlvbnMuaGVhZGVyLFxyXG4gICAgICAgICAgICAgICAgLi4uaGVhZGVyXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuX29wdGlvbnMpXHJcbiAgICB9XHJcbiAgICBnZXQgb3B0aW9ucygpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9vcHRpb25zO1xyXG4gICAgfVxyXG4gICAgQElucHV0KCkgY2F0ZWdvcmllczogYW55PVtdO1xyXG4gICAgQElucHV0KCkgc2VyaWVzOiBhbnk9W107XHJcblxyXG4gICAgZWxlbWVudDogYW55O1xyXG4gICAgLy9ASW5wdXQoKSBncm91cEJhclBhZGRpbmc9MjA7XHJcbiAgICAvL0BJbnB1dCgpIGlubmVyQmFyUGFkZGluZz0zO1xyXG5cclxuICAgIC8vIHNjYWxlOiBhbnk7XHJcbiAgICB4U2NhbGU6IGFueTtcclxuICAgIGlubmVyU2NhbGU6IGFueTtcclxuICAgIHlTY2FsZTogYW55O1xyXG4gICAgYmFyczogYW55PVtdO1xyXG4gICAgZ3JvdXBOYW1lOiBhbnlbXT1bXTtcclxuICAgIGdyb3VwQmFyUGFkZGluZ0JLOiBhbnk7XHJcbiAgICBpbm5lckJhclBhZGRpbmdCSzogYW55O1xyXG4gICAgY29sb3JTY2FsZTogYW55O1xyXG4gICAgdHJpbUxhYmVsOiBhbnk7XHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmLFxyXG4gICAgICAgIHByaXZhdGUgY2hhcnRFbGVtZW50OiBFbGVtZW50UmVmLFxyXG4gICAgICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudD1lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy50cmltTGFiZWwgPSB0cmltTGFiZWw7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZ3JvdXBCYXJQYWRkaW5nQks9dGhpcy5vcHRpb25zLnBsb3RPcHRpb25zLmdyb3VwQmFyUGFkZGluZztcclxuICAgICAgICB0aGlzLmlubmVyQmFyUGFkZGluZ0JLPXRoaXMub3B0aW9ucy5wbG90T3B0aW9ucy5pbm5lckJhclBhZGRpbmc7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnVwZGF0ZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnMud2lkdGg9dGhpcy5vcHRpb25zLndpZHRoO1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy5oZWlnaHQ9dGhpcy5vcHRpb25zLmhlaWdodDtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJ0dHR0dHR0XCIsdGhpcy5vcHRpb25zKVxyXG4gICAgICAgIGNvbnN0IGhvc3RFbGVtPXRoaXMuY2hhcnRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICAgICAgbGV0IGRpbXM9aG9zdEVsZW0ucGFyZW50Tm9kZSE9PW51bGw/IGhvc3RFbGVtLnBhcmVudE5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk6eyBoZWlnaHQ6IDQwMCwgd2lkdGg6IDgwMCB9O1xyXG5cclxuICAgICAgICB2YXIgc3R5bGU9aG9zdEVsZW0ucGFyZW50Tm9kZS5jdXJyZW50U3R5bGV8fHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGhvc3RFbGVtLnBhcmVudE5vZGUpO1xyXG5cclxuICAgICAgICB0aGlzLm9wdGlvbnMuaGVpZ2h0PSF0aGlzLm9wdGlvbnMuaGVpZ2h0PyBkaW1zLmhlaWdodC10aGlzLnN0clRvTnVtYmVyKHN0eWxlLnBhZGRpbmdMZWZ0KS10aGlzLnN0clRvTnVtYmVyKHN0eWxlLnBhZGRpbmdSaWdodCk6dGhpcy5vcHRpb25zLmhlaWdodDtcclxuICAgICAgICB0aGlzLm9wdGlvbnMud2lkdGg9IXRoaXMub3B0aW9ucy53aWR0aD8gZGltcy53aWR0aC10aGlzLnN0clRvTnVtYmVyKHN0eWxlLnBhZGRpbmdMZWZ0KS10aGlzLnN0clRvTnVtYmVyKHN0eWxlLnBhZGRpbmdSaWdodCk6ZGltcy53aWR0aC10aGlzLnN0clRvTnVtYmVyKHN0eWxlLnBhZGRpbmdMZWZ0KS10aGlzLnN0clRvTnVtYmVyKHN0eWxlLnBhZGRpbmdSaWdodCk7XHJcblxyXG4gICAgICAgIHRoaXMuY2FsUGxvdEJhY2tncm91bmQoKVxyXG5cclxuICAgICAgICBsZXQgY291bnRGbGFnPWZhbHNlO1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy5wbG90T3B0aW9ucy5ncm91cEJhclBhZGRpbmc9dGhpcy5ncm91cEJhclBhZGRpbmdCSztcclxuICAgICAgICB0aGlzLm9wdGlvbnMucGxvdE9wdGlvbnMuaW5uZXJCYXJQYWRkaW5nPXRoaXMuaW5uZXJCYXJQYWRkaW5nQks7XHJcbiAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICBpZiAoY291bnRGbGFnPT10cnVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMucGxvdE9wdGlvbnMuZ3JvdXBCYXJQYWRkaW5nLS07XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMucGxvdE9wdGlvbnMuaW5uZXJCYXJQYWRkaW5nPTI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5iYXJUeXBlPT0ndmVydGljYWwnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnhTY2FsZT10aGlzLmdldFhTY2FsZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy55U2NhbGU9dGhpcy5nZXRYU2NhbGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlubmVyU2NhbGU9dGhpcy5nZXRJbm5lclNjYWxlKCk7XHJcbiAgICAgICAgICAgIGNvdW50RmxhZz10cnVlO1xyXG5cclxuICAgICAgICB9IHdoaWxlICh0aGlzLmlubmVyU2NhbGUuYmFuZHdpZHRoKCk8Mik7XHJcbiAgICAgICAgLy8gXHJcblxyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYmFyVHlwZT09J3ZlcnRpY2FsJykge1xyXG4gICAgICAgICAgICB0aGlzLnlTY2FsZT10aGlzLmdldFlTY2FsZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy54U2NhbGU9dGhpcy5nZXRZU2NhbGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjb2xvckhlbHBlcj1uZXcgQ29sb3JIZWxwZXIodGhpcy5vcHRpb25zLCB0aGlzLnNlcmllcyk7XHJcbiAgICAgICAgdGhpcy5jb2xvclNjYWxlPWNvbG9ySGVscGVyLmdlbmVyYXRlQ29sb3JTY2FsZSgpO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5ncm91cE5hbWU9W107XHJcbiAgICAgICAgICAgIHRoaXMuc2VyaWVzLm1hcChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLm5hbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm91cE5hbWUucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGl0ZW0ubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoaXMuY29sb3JTY2FsZShpdGVtLm5hbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQmFyKCk7XHJcblxyXG4gICAgICAgICAgICAvL3NldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gZm9yIChsZXQgaT0wOyBpPHRoaXMuYmFycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKHRoaXMuYmFyc1tpXS5jbGFzc05hbWUpXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdHJhbnNpdGlvbihzZWxlY3QodGhpcy5lbGVtZW50KSkuc2VsZWN0KCcuYmFyMDInKS50cmFuc2l0aW9uKClcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgLmR1cmF0aW9uKDUwMClcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgLmF0dHIoJ3dpZHRoJywgdGhpcy5iYXJzW2ldLndpZHRoKTtcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgLy99LDEwMDApXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRYU2NhbGUoKTogYW55IHtcclxuXHJcbiAgICAgICAgbGV0IHNwYWNpbmc7XHJcbiAgICAgICAgbGV0IHJhbmdlO1xyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYmFyVHlwZT09J3ZlcnRpY2FsJykge1xyXG4gICAgICAgICAgICBzcGFjaW5nPSh0aGlzLmNhdGVnb3JpZXMubGVuZ3RoLyh0aGlzLm9wdGlvbnMucGxvdEJhY2tncm91bmQud2lkdGgvdGhpcy5vcHRpb25zLnBsb3RPcHRpb25zLmdyb3VwQmFyUGFkZGluZykpO1xyXG4gICAgICAgICAgICByYW5nZT1bMCwgdGhpcy5vcHRpb25zLnBsb3RCYWNrZ3JvdW5kLndpZHRoXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBsZW5ndGg9dGhpcy5vcHRpb25zLmhlaWdodC10aGlzLm9wdGlvbnMuaGVhZGVyLmhlaWdodDtcclxuICAgICAgICAgICAgc3BhY2luZz0odGhpcy5jYXRlZ29yaWVzLmxlbmd0aC8odGhpcy5vcHRpb25zLnBsb3RCYWNrZ3JvdW5kLmhlaWdodC90aGlzLm9wdGlvbnMucGxvdE9wdGlvbnMuZ3JvdXBCYXJQYWRkaW5nKSk7XHJcbiAgICAgICAgICAgIHJhbmdlPVswLCB0aGlzLm9wdGlvbnMucGxvdEJhY2tncm91bmQuaGVpZ2h0XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNjYWxlQmFuZCgpXHJcbiAgICAgICAgICAgIC5yYW5nZShyYW5nZSlcclxuICAgICAgICAgICAgLnBhZGRpbmdJbm5lcihzcGFjaW5nKVxyXG4gICAgICAgICAgICAucGFkZGluZ091dGVyKDAuMSlcclxuICAgICAgICAgICAgLmRvbWFpbih0aGlzLmNhdGVnb3JpZXMpO1xyXG4gICAgfVxyXG4gICAgZ2V0SW5uZXJTY2FsZSgpOiBhbnkge1xyXG5cclxuICAgICAgICBsZXQgZ3JvdXBEYXRhQXJyPVtdO1xyXG4gICAgICAgIGZvciAobGV0IGk9MDsgaTx0aGlzLnNlcmllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBncm91cERhdGFBcnIucHVzaCh0aGlzLnNlcmllc1tpXS5uYW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzcGFjaW5nO1xyXG4gICAgICAgIGxldCByYW5nZTtcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmJhclR5cGU9PSd2ZXJ0aWNhbCcpIHtcclxuICAgICAgICAgICAgc3BhY2luZz0odGhpcy5zZXJpZXMubGVuZ3RoLyh0aGlzLnhTY2FsZS5iYW5kd2lkdGgoKS90aGlzLm9wdGlvbnMucGxvdE9wdGlvbnMuaW5uZXJCYXJQYWRkaW5nKSk7XHJcbiAgICAgICAgICAgIHJhbmdlPXRoaXMueFNjYWxlLmJhbmR3aWR0aCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgc3BhY2luZz0odGhpcy5zZXJpZXMubGVuZ3RoLyh0aGlzLnlTY2FsZS5iYW5kd2lkdGgoKS90aGlzLm9wdGlvbnMucGxvdE9wdGlvbnMuaW5uZXJCYXJQYWRkaW5nKSk7XHJcbiAgICAgICAgICAgIHJhbmdlPXRoaXMueVNjYWxlLmJhbmR3aWR0aCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNjYWxlQmFuZCgpXHJcbiAgICAgICAgICAgIC5yYW5nZShbMCwgcmFuZ2VdKVxyXG4gICAgICAgICAgICAucGFkZGluZ0lubmVyKHNwYWNpbmcpXHJcbiAgICAgICAgICAgIC5kb21haW4oZ3JvdXBEYXRhQXJyKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRZU2NhbGUoKTogYW55IHtcclxuICAgICAgICBsZXQgdW5pcXVlVmFsdWU6IGFueT1uZXcgU2V0KCk7XHJcbiAgICAgICAgdGhpcy5zZXJpZXMubWFwKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGl0ZW0uZGF0YS5tYXAoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB1bmlxdWVWYWx1ZS5hZGQodmFsdWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IG1pbj1NYXRoLm1pbiguLi51bmlxdWVWYWx1ZSk7XHJcbiAgICAgICAgbWluPW1pbj4wPyAwOm1pbjtcclxuXHJcbiAgICAgICAgbGV0IG1heD1NYXRoLm1heCgwLCAuLi51bmlxdWVWYWx1ZSk7XHJcbiAgICAgICAgbWF4PW1heD4wPyBtYXg6MDtcclxuXHJcbiAgICAgICAgbGV0IHJhbmdlPVtdO1xyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYmFyVHlwZT09J3ZlcnRpY2FsJykge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWU9dGhpcy5vcHRpb25zLnBsb3RCYWNrZ3JvdW5kLmhlaWdodDtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJiYXIgZ2V0WVNjYWxlXCIsdmFsdWUpXHJcbiAgICAgICAgICAgIHJhbmdlPVt2YWx1ZSwgMF07XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiYmFyIGdldFlTY2FsZSAtIFwiLCByYW5nZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZT10aGlzLm9wdGlvbnMucGxvdEJhY2tncm91bmQud2lkdGgtMzA7XHJcbiAgICAgICAgICAgIHJhbmdlPVswLCB2YWx1ZV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImJhciBnZXRZU2NhbGUgLS0tIFwiLCByYW5nZSwgbWluLCBtYXgpXHJcblxyXG4gICAgICAgIHJldHVybiBzY2FsZUxpbmVhcigpXHJcbiAgICAgICAgICAgIC5yYW5nZShyYW5nZSlcclxuICAgICAgICAgICAgLmRvbWFpbihbbWluLCBtYXhdKTtcclxuICAgICAgICAvL3JldHVybiB0aGlzLnNjYWxlLm5pY2UoKS50aWNrcygpO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbFBsb3RCYWNrZ3JvdW5kKCkge1xyXG4gICAgICAgIHRoaXMub3B0aW9ucz17XHJcbiAgICAgICAgICAgIC4uLnRoaXMub3B0aW9ucyxcclxuICAgICAgICAgICAgcGxvdEJhY2tncm91bmQ6IHtcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMub3B0aW9ucy5wbG90QmFja2dyb3VuZCxcclxuICAgICAgICAgICAgICAgIHg6IDAsXHJcbiAgICAgICAgICAgICAgICB5OiAwLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLm9wdGlvbnMuaGVpZ2h0LXRoaXMub3B0aW9ucy54QXhpcy5oZWlnaHQtdGhpcy5vcHRpb25zLmhlYWRlci5oZWlnaHQtdGhpcy5vcHRpb25zLnBhZGRpbmcsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy5vcHRpb25zLndpZHRoLXRoaXMub3B0aW9ucy55QXhpcy53aWR0aC10aGlzLm9wdGlvbnMucGFkZGluZ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiY2FsUGxvdEJhY2tncm91bmRcIiwgSlNPTi5zdHJpbmdpZnkodGhpcy5vcHRpb25zKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlQmFyKCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJ0aGlzLmlubmVyU2NhbGUuYmFuZHdpZHRoKCkgXCIrdGhpcy5pbm5lclNjYWxlLmJhbmR3aWR0aCgpKVxyXG4gICAgICAgIHRoaXMuYmFycz1bXTtcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmJhclR5cGU9PSd2ZXJ0aWNhbCcpIHtcclxuICAgICAgICAgICAgdGhpcy5jYXRlZ29yaWVzLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGk9MDsgaTx0aGlzLnNlcmllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhcjogYW55PXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGl0ZW0sICAvL2phbixmZWJcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhpcy5zZXJpZXNbaV0uZGF0YVtpbmRleF0sIC8vMTAxLDIwMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cDogdGhpcy5zZXJpZXNbaV0ubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoaXMuY29sb3JTY2FsZSh0aGlzLnNlcmllc1tpXS5uYW1lKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9mb3JtYXR0ZWRMYWJlbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHRoaXMuaW5uZXJTY2FsZS5iYW5kd2lkdGgoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLnNlcmllc1tpXS5kYXRhW2luZGV4XT4wPyAodGhpcy55U2NhbGUoMCktdGhpcy55U2NhbGUodGhpcy5zZXJpZXNbaV0uZGF0YVtpbmRleF0pKToodGhpcy55U2NhbGUodGhpcy5zZXJpZXNbaV0uZGF0YVtpbmRleF0pLXRoaXMueVNjYWxlKDApKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeDogdGhpcy5pbm5lclNjYWxlKHRoaXMuc2VyaWVzW2ldLm5hbWUpK3RoaXMueFNjYWxlKGl0ZW0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiB0aGlzLnNlcmllc1tpXS5kYXRhW2luZGV4XT4wPyB0aGlzLnlTY2FsZSh0aGlzLnNlcmllc1tpXS5kYXRhW2luZGV4XSk6dGhpcy55U2NhbGUoMCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ2ZXJ0aWNhbF9iYXJcIlxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXJzLnB1c2goYmFyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNhdGVnb3JpZXMubWFwKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaT0wOyBpPHRoaXMuc2VyaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFyOiBhbnk9e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogaXRlbSwgIC8vamFuLGZlYlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLnNlcmllc1tpXS5kYXRhW2luZGV4XSwgLy8xMDEsMjAyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwOiB0aGlzLnNlcmllc1tpXS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhpcy5jb2xvclNjYWxlKHRoaXMuc2VyaWVzW2ldLm5hbWUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2Zvcm1hdHRlZExhYmVsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy5zZXJpZXNbaV0uZGF0YVtpbmRleF0+MD8gKHRoaXMueFNjYWxlKHRoaXMuc2VyaWVzW2ldLmRhdGFbaW5kZXhdKS10aGlzLnhTY2FsZSgwKSk6KHRoaXMueFNjYWxlKDApLXRoaXMueFNjYWxlKHRoaXMuc2VyaWVzW2ldLmRhdGFbaW5kZXhdKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogdGhpcy5pbm5lclNjYWxlLmJhbmR3aWR0aCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB4OiB0aGlzLnNlcmllc1tpXS5kYXRhW2luZGV4XT4wPyB0aGlzLnhTY2FsZSgwKTp0aGlzLnhTY2FsZSh0aGlzLnNlcmllc1tpXS5kYXRhW2luZGV4XSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IHRoaXMuaW5uZXJTY2FsZSh0aGlzLnNlcmllc1tpXS5uYW1lKSt0aGlzLnlTY2FsZShpdGVtKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImhvcml6b250YWxfYmFyXCJcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmFycy5wdXNoKGJhcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgeUF4aXNXaWR0aENoYW5nZSh7IHlBeGlzV2lkdGgsIHlBeGlzSGVpZ2h0IH0pIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwieUF4aXNXaWR0aCBcIit5QXhpc1dpZHRoKVxyXG4gICAgICAgIHRoaXMub3B0aW9ucz17XHJcbiAgICAgICAgICAgIC4uLnRoaXMub3B0aW9ucyxcclxuICAgICAgICAgICAgeUF4aXM6IHtcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMub3B0aW9ucy55QXhpcyxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiB5QXhpc1dpZHRoLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiB5QXhpc0hlaWdodFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY29uc29sZS5sb2coIHRoaXMub3B0aW9ucylcclxuICAgICAgICB0aGlzLnVwZGF0ZSgpXHJcbiAgICB9XHJcblxyXG4gICAgeEF4aXNIZWlnaHRDaGFuZ2UoeyB4QXhpc0hlaWdodCB9KSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zPXtcclxuICAgICAgICAgICAgLi4udGhpcy5vcHRpb25zLFxyXG4gICAgICAgICAgICB4QXhpczoge1xyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5vcHRpb25zLnhBeGlzLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiB4QXhpc0hlaWdodFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJ4QXhpc0hlaWdodENoYW5nZVwiLCB4QXhpc0hlaWdodCwgSlNPTi5zdHJpbmdpZnkodGhpcy5vcHRpb25zLnhBeGlzKSk7XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKVxyXG4gICAgfVxyXG4gICAgaGVhZGVySGVpZ2h0Q2hhbmdlKHsgaGVhZGVySGVpZ2h0IH0pIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnM9e1xyXG4gICAgICAgICAgICAuLi50aGlzLm9wdGlvbnMsXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5vcHRpb25zLmhlYWRlcixcclxuICAgICAgICAgICAgICAgIGhlaWdodDogaGVhZGVySGVpZ2h0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICB0b29sVGlwUGxhY2NlbWVudChkYXRhKSB7XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5iYXJUeXBlPT0ndmVydGljYWwnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhPjA/ICd0b3AnOidib3R0b20nXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0YT4wPyAncmlnaHQnOidsZWZ0J1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnLCBbJyRldmVudCddKVxyXG4gICAgb25SZXNpemUoZXZlbnQpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwid2luZG93OnJlc2l6ZVwiKVxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy51cGRhdGUoKSk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICBwcml2YXRlIHN0clRvTnVtYmVyKHN0cikge1xyXG4gICAgICAgIGxldCBudW1iZXJQYXR0ZXJuPS9cXGQrL2c7XHJcbiAgICAgICAgbGV0IG51bT1zdHIubWF0Y2gobnVtYmVyUGF0dGVybikuam9pbignJylcclxuICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChudW0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==