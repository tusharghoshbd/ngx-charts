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
        xAxis['labelEllipsis'] = (obj.xAxis.labelEllipsisSize != undefined && obj.xAxis.labelEllipsisSize > 0) ? true : false;
        /** @type {?} */
        let yAxis = obj.yAxis;
        yAxis['labelEllipsis'] = (obj.yAxis.labelEllipsisSize != undefined && obj.yAxis.labelEllipsisSize > 0) ? true : false;
        /** @type {?} */
        let legend = obj.legend;
        legend['labelEllipsis'] = (obj.legend.labelEllipsisSize != undefined && obj.legend.labelEllipsisSize > 0) ? true : false;
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
    yAxisWidthChange({ yAxisWidth, yAxisHeight, yAxisRightWidth }) {
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
     * @return {?}
     */
    getViewBox() {
        if (this.options.width > 0 && this.options.height > 0)
            return '0 0 ' + this.options.width + ' ' + this.options.height;
        else
            return '0 0 0 0';
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
                template: "<div [style.width]=\"options.width+'px'\" [style.border]=\"'1px solid #f3f3f3'\">\r\n\r\n    <svg version=\"1.1\" class=\"highcharts-root\" [attr.padding]=\"options.padding\" [attr.width]=\"options.width\"\r\n        [attr.height]=\"options.height\" [attr.viewBox]=\"getViewBox()\"\r\n        aria-label=\"Interactive chart\" [style.border]=\"'0px solid gray'\" [style.padding]=\"options.padding\"\r\n        aria-hidden=\"false\">\r\n\r\n        <g header [options]=\"options\" (headerHeightChange)=\"headerHeightChange($event)\"></g>\r\n\r\n        <g y-axis \r\n            [xScale]=\"xScale\" \r\n            [yScale]=\"yScale\" \r\n            [options]=\"options\" \r\n            [categories]=\"categories\" \r\n            [series]=\"series\"\r\n            (yAxisWidthChange)=\"yAxisWidthChange($event)\"></g>\r\n\r\n        <g x-axis \r\n            [xScale]=\"xScale\" \r\n            [yScale]=\"yScale\" \r\n            [options]=\"options\" \r\n            [categories]=\"categories\" \r\n            [series]=\"series\"\r\n            (xAxisHeightChange)=\"xAxisHeightChange($event)\"></g>\r\n\r\n        <g data-z-index=\"0.1\" >\r\n            <rect *ngFor=\"let bar of bars\" \r\n                [attr.class]=\"bar.className\"\r\n                [attr.x]=\"bar.x+this.options.yAxis.width\"\r\n                [tooltip]=\"bar.value+', '+bar.group+', '+bar.data\" \r\n                [placement]=\"toolTipPlaccement(bar.data)\" \r\n                delay=\"10\"\r\n                [attr.y]=\"bar.y+this.options.header.height\" \r\n                [attr.width]=\"bar.width\" [attr.height]=\"bar.height\"\r\n                [attr.fill]=\"bar.color\" opacity=\"1\"  tabindex=\"-1\" role=\"img\"\r\n                aria-label=\"1. Jan, 49.9. Tokyo.\"></rect>\r\n        </g>\r\n    </svg>\r\n    <chart-legend\r\n        *ngIf=\"groupName.length\"\r\n        [groupName]=\"groupName\"\r\n        [options]=\"options\"\r\n        [series] = \"series\"    \r\n    >\r\n    </chart-legend>\r\n  \r\n</div>\r\n\r\n",
                // changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".tooltip-example{text-align:center;padding:0 50px}.tooltip-example [tooltip]{display:inline-block;margin:50px 20px;width:180px;height:50px;border:1px solid gray;border-radius:5px;line-height:50px;text-align:center}.ng-tooltip{position:absolute;max-width:150px;font-size:14px;text-align:center;color:#fafae3;padding:3px 8px;background:#282a36;border-radius:4px;z-index:1000;opacity:0}.ng-tooltip:after{content:\"\";position:absolute;border-style:solid}.ng-tooltip-top:after{top:100%;left:50%;margin-left:-5px;border-width:5px;border-color:#000 transparent transparent}.ng-tooltip-bottom:after{bottom:100%;left:50%;margin-left:-5px;border-width:5px;border-color:transparent transparent #000}.ng-tooltip-left:after{top:50%;left:100%;margin-top:-5px;border-width:5px;border-color:transparent transparent transparent #000}.ng-tooltip-right:after{top:50%;right:100%;margin-top:-5px;border-width:5px;border-color:transparent #000 transparent transparent}.ng-tooltip-show{opacity:1}.horizontal_bar{-webkit-animation:1s linear forwards horizontal_bar_frames;animation:1s linear forwards horizontal_bar_frames}@-webkit-keyframes horizontal_bar_frames{from{width:0}}@keyframes horizontal_bar_frames{from{width:0}}.vertical_bar{-webkit-animation:1s linear forwards vertical_bar_frames;animation:1s linear forwards vertical_bar_frames}@-webkit-keyframes vertical_bar_frames{from{height:0}}@keyframes vertical_bar_frames{from{height:0}}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNoYXJ0cy1iYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHR1c2hhcmdob3NoYmQvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtY2hhcnRzLWJhci9uZ3gtY2hhcnRzLWJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsS0FBSyxFQUNMLGlCQUFpQixFQUlqQixVQUFVLEVBQ1YsaUJBQWlCLEVBRWpCLFlBQVksRUFDZixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBV3ZELE1BQU0sT0FBTyxxQkFBcUI7Ozs7OztJQXNIOUIsWUFBWSxPQUFtQixFQUNuQixZQUF3QixFQUN4QixHQUFzQjtRQUR0QixpQkFBWSxHQUFaLFlBQVksQ0FBWTtRQUN4QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQXRIMUIsa0JBQWEsR0FBQztZQUNsQixPQUFPLEVBQUUsVUFBVTtZQUNuQixLQUFLLEVBQUUsRUFBRTtZQUNULFFBQVEsRUFBRSxFQUFFO1lBQ1osTUFBTSxFQUFFLENBQUM7WUFDVCxLQUFLLEVBQUUsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDO1lBQ1YsS0FBSyxFQUFFO2dCQUNILEtBQUssRUFBRSxFQUFFO2dCQUNULE1BQU0sRUFBRSxDQUFDO2dCQUNULGFBQWEsRUFBRSxDQUFDO2dCQUNoQixVQUFVLEVBQUUsTUFBTTtnQkFDbEIsYUFBYSxFQUFFLEtBQUs7Z0JBQ3BCLGlCQUFpQixFQUFDLEVBQUU7YUFDdkI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsTUFB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QUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7d0JBQzFCLEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDOzt3QkFFM0MsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFO3dCQUNsQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3ZKLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7d0JBQ3pELENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7d0JBQ3ZGLFNBQVMsRUFBRSxjQUFj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YSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUN6QyxPQUFPLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzQixDQUFDOzs7WUE1WkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLGcvREFBOEM7O2dCQUc5QyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7YUFDeEM7Ozs7WUFsQkcsVUFBVTtZQUFWLFVBQVU7WUFDVixpQkFBaUI7OztzQkFrRWhCLEtBQUs7eUJBc0RMLEtBQUs7cUJBQ0wsS0FBSzt1QkEwUkwsWUFBWSxTQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7Ozs7OztJQTlYekMsOENBeUNFOzs7OztJQUVGLHlDQUF5Qjs7SUF3RHpCLDJDQUE0Qjs7SUFDNUIsdUNBQXdCOztJQUV4Qix3Q0FBYTs7SUFLYix1Q0FBWTs7SUFDWiwyQ0FBZ0I7O0lBQ2hCLHVDQUFZOztJQUNaLHFDQUFhOztJQUNiLDBDQUFvQjs7SUFDcEIsa0RBQXVCOztJQUN2QixrREFBdUI7O0lBQ3ZCLDJDQUFnQjs7SUFDaEIsMENBQWU7Ozs7O0lBRVgsNkNBQWdDOzs7OztJQUNoQyxvQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gICAgQ29tcG9uZW50LFxyXG4gICAgSW5wdXQsXHJcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcclxuICAgIE9uQ2hhbmdlcyxcclxuICAgIE9uSW5pdCxcclxuICAgIFNpbXBsZUNoYW5nZXMsXHJcbiAgICBFbGVtZW50UmVmLFxyXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICAgIEhvc3RMaXN0ZW5lclxyXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IHNlbGVjdCB9IGZyb20gJ2QzLXNlbGVjdGlvbic7XHJcbmltcG9ydCB7IHRyYW5zaXRpb24gfSBmcm9tICdkMy10cmFuc2l0aW9uJztcclxuaW1wb3J0IHsgc2NhbGVCYW5kLCBzY2FsZUxpbmVhciB9IGZyb20gXCJkMy1zY2FsZVwiO1xyXG5pbXBvcnQgeyBDb2xvckhlbHBlciB9IGZyb20gJy4uL3V0aWxzL2NvbG9yLmhlbHBlcic7XHJcbmltcG9ydCB7IHRyaW1MYWJlbCB9IGZyb20gJy4uL3V0aWxzL3RyaW0tbGFiZWwuaGVscGVyJztcclxuaW1wb3J0IHsgQ2xhc3NHZXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb21waWxlci9zcmMvb3V0cHV0L291dHB1dF9hc3QnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJuZ3gtY2hhcnRzLWJhclwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9uZ3gtY2hhcnRzLWJhci5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL25neC1jaGFydHMtYmFyLmNvbXBvbmVudC5jc3NcIl0sXHJcbiAgICAvLyBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBuZ3hDaGFydHNCYXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCB7XHJcblxyXG4gICAgcHJpdmF0ZSBjdXN0b21PcHRpb25zPXtcclxuICAgICAgICBiYXJUeXBlOiAndmVydGljYWwnLFxyXG4gICAgICAgIHRpdGxlOiAnJyxcclxuICAgICAgICBzdWJ0aXRsZTogJycsXHJcbiAgICAgICAgaGVpZ2h0OiAwLFxyXG4gICAgICAgIHdpZHRoOiAwLFxyXG4gICAgICAgIHBhZGRpbmc6IDUsXHJcbiAgICAgICAgeEF4aXM6IHtcclxuICAgICAgICAgICAgdGl0bGU6ICcnLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDAsXHJcbiAgICAgICAgICAgIGxhYmVsUm90YXRpb246IDAsXHJcbiAgICAgICAgICAgIGxhYmVsQWxpZ246ICdsZWZ0JyxcclxuICAgICAgICAgICAgbGFiZWxFbGxpcHNpczogZmFsc2UsXHJcbiAgICAgICAgICAgIGxhYmVsRWxsaXBzaXNTaXplOjE2XHJcbiAgICAgICAgfSxcclxuICAgICAgICB5QXhpczoge1xyXG4gICAgICAgICAgICB0aXRsZTogJycsXHJcbiAgICAgICAgICAgIHdpZHRoOiAwLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDAsXHJcbiAgICAgICAgICAgIGxhYmVsUm90YXRpb246IDAsXHJcbiAgICAgICAgICAgIGxhYmVsRWxsaXBzaXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBsYWJlbEVsbGlwc2lzU2l6ZToxNlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGVnZW5kOiB7XHJcbiAgICAgICAgICAgIGxhYmVsRWxsaXBzaXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBsYWJlbEVsbGlwc2lzU2l6ZToxNlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGxvdEJhY2tncm91bmQ6IHtcclxuICAgICAgICAgICAgeDogMCxcclxuICAgICAgICAgICAgeTogMCxcclxuICAgICAgICAgICAgaGVpZ2h0OiAwLFxyXG4gICAgICAgICAgICB3aWR0aDogMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGxvdE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgZ3JvdXBCYXJQYWRkaW5nOiAyMCxcclxuICAgICAgICAgICAgaW5uZXJCYXJQYWRkaW5nOiAzXHJcbiAgICAgICAgfSxcclxuICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgaGVpZ2h0OiAwLFxyXG4gICAgICAgICAgICB3aWR0aDogMFxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBfb3B0aW9uczogYW55PXt9O1xyXG5cclxuICAgIEBJbnB1dCgpIHNldCBvcHRpb25zKG9iajogYW55KSB7XHJcbiAgICAgICAgbGV0IHhBeGlzPW9iai54QXhpcztcclxuICAgICAgICB4QXhpc1snbGFiZWxFbGxpcHNpcyddPShvYmoueEF4aXMubGFiZWxFbGxpcHNpc1NpemUhPXVuZGVmaW5lZCYmb2JqLnhBeGlzLmxhYmVsRWxsaXBzaXNTaXplPjApPyB0cnVlOmZhbHNlO1xyXG5cclxuICAgICAgICBsZXQgeUF4aXM9b2JqLnlBeGlzO1xyXG4gICAgICAgIHlBeGlzWydsYWJlbEVsbGlwc2lzJ109KG9iai55QXhpcy5sYWJlbEVsbGlwc2lzU2l6ZSE9dW5kZWZpbmVkJiZvYmoueUF4aXMubGFiZWxFbGxpcHNpc1NpemU+MCk/IHRydWU6ZmFsc2U7XHJcblxyXG4gICAgICAgIGxldCBsZWdlbmQ9b2JqLmxlZ2VuZDtcclxuICAgICAgICBsZWdlbmRbJ2xhYmVsRWxsaXBzaXMnXT0ob2JqLmxlZ2VuZC5sYWJlbEVsbGlwc2lzU2l6ZSE9dW5kZWZpbmVkJiZvYmoubGVnZW5kLmxhYmVsRWxsaXBzaXNTaXplPjApPyB0cnVlOmZhbHNlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBwbG90QmFja2dyb3VuZD1vYmoucGxvdEJhY2tncm91bmQ7XHJcbiAgICAgICAgbGV0IHBsb3RPcHRpb25zPW9iai5wbG90T3B0aW9ucztcclxuICAgICAgICBsZXQgaGVhZGVyPW9iai5oZWFkZXI7XHJcblxyXG4gICAgICAgIGRlbGV0ZSBvYmpbJ3hBeGlzJ107XHJcbiAgICAgICAgZGVsZXRlIG9ialsneUF4aXMnXTtcclxuICAgICAgICBkZWxldGUgb2JqWydsZWdlbmQnXTtcclxuICAgICAgICBkZWxldGUgb2JqWydwbG90QmFja2dyb3VuZCddO1xyXG4gICAgICAgIGRlbGV0ZSBvYmpbJ3Bsb3RPcHRpb25zJ107XHJcbiAgICAgICAgZGVsZXRlIG9ialsnaGVhZGVyJ107XHJcblxyXG4gICAgICAgIHRoaXMuX29wdGlvbnM9e1xyXG4gICAgICAgICAgICAuLi50aGlzLmN1c3RvbU9wdGlvbnMsXHJcbiAgICAgICAgICAgIC4uLm9iaixcclxuICAgICAgICAgICAgeEF4aXM6IHtcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMuY3VzdG9tT3B0aW9ucy54QXhpcyxcclxuICAgICAgICAgICAgICAgIC4uLnhBeGlzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHlBeGlzOiB7XHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLmN1c3RvbU9wdGlvbnMueUF4aXMsXHJcbiAgICAgICAgICAgICAgICAuLi55QXhpc1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBsZWdlbmQ6eyBcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMuY3VzdG9tT3B0aW9ucy5sZWdlbmQsXHJcbiAgICAgICAgICAgICAgICAuLi5sZWdlbmRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcGxvdEJhY2tncm91bmQ6IHtcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMuY3VzdG9tT3B0aW9ucy5wbG90QmFja2dyb3VuZCxcclxuICAgICAgICAgICAgICAgIC4uLnBsb3RCYWNrZ3JvdW5kXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHBsb3RPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLmN1c3RvbU9wdGlvbnMucGxvdE9wdGlvbnMsXHJcbiAgICAgICAgICAgICAgICAuLi5wbG90T3B0aW9uc1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMuY3VzdG9tT3B0aW9ucy5oZWFkZXIsXHJcbiAgICAgICAgICAgICAgICAuLi5oZWFkZXJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5fb3B0aW9ucylcclxuICAgIH1cclxuICAgIGdldCBvcHRpb25zKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wdGlvbnM7XHJcbiAgICB9XHJcbiAgICBASW5wdXQoKSBjYXRlZ29yaWVzOiBhbnk9W107XHJcbiAgICBASW5wdXQoKSBzZXJpZXM6IGFueT1bXTtcclxuXHJcbiAgICBlbGVtZW50OiBhbnk7XHJcbiAgICAvL0BJbnB1dCgpIGdyb3VwQmFyUGFkZGluZz0yMDtcclxuICAgIC8vQElucHV0KCkgaW5uZXJCYXJQYWRkaW5nPTM7XHJcblxyXG4gICAgLy8gc2NhbGU6IGFueTtcclxuICAgIHhTY2FsZTogYW55O1xyXG4gICAgaW5uZXJTY2FsZTogYW55O1xyXG4gICAgeVNjYWxlOiBhbnk7XHJcbiAgICBiYXJzOiBhbnk9W107XHJcbiAgICBncm91cE5hbWU6IGFueVtdPVtdO1xyXG4gICAgZ3JvdXBCYXJQYWRkaW5nQks6IGFueTtcclxuICAgIGlubmVyQmFyUGFkZGluZ0JLOiBhbnk7XHJcbiAgICBjb2xvclNjYWxlOiBhbnk7XHJcbiAgICB0cmltTGFiZWw6IGFueTtcclxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnRSZWYsXHJcbiAgICAgICAgcHJpdmF0ZSBjaGFydEVsZW1lbnQ6IEVsZW1lbnRSZWYsXHJcbiAgICAgICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50PWVsZW1lbnQubmF0aXZlRWxlbWVudDtcclxuICAgICAgICB0aGlzLnRyaW1MYWJlbCA9IHRyaW1MYWJlbDtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ncm91cEJhclBhZGRpbmdCSz10aGlzLm9wdGlvbnMucGxvdE9wdGlvbnMuZ3JvdXBCYXJQYWRkaW5nO1xyXG4gICAgICAgIHRoaXMuaW5uZXJCYXJQYWRkaW5nQks9dGhpcy5vcHRpb25zLnBsb3RPcHRpb25zLmlubmVyQmFyUGFkZGluZztcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMudXBkYXRlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy53aWR0aD10aGlzLm9wdGlvbnMud2lkdGg7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLmhlaWdodD10aGlzLm9wdGlvbnMuaGVpZ2h0O1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInR0dHR0dHRcIix0aGlzLm9wdGlvbnMpXHJcbiAgICAgICAgY29uc3QgaG9zdEVsZW09dGhpcy5jaGFydEVsZW1lbnQubmF0aXZlRWxlbWVudDtcclxuICAgICAgICBsZXQgZGltcz1ob3N0RWxlbS5wYXJlbnROb2RlIT09bnVsbD8gaG9zdEVsZW0ucGFyZW50Tm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTp7IGhlaWdodDogNDAwLCB3aWR0aDogODAwIH07XHJcblxyXG4gICAgICAgIHZhciBzdHlsZT1ob3N0RWxlbS5wYXJlbnROb2RlLmN1cnJlbnRTdHlsZXx8d2luZG93LmdldENvbXB1dGVkU3R5bGUoaG9zdEVsZW0ucGFyZW50Tm9kZSk7XHJcblxyXG4gICAgICAgIHRoaXMub3B0aW9ucy5oZWlnaHQ9IXRoaXMub3B0aW9ucy5oZWlnaHQ/IGRpbXMuaGVpZ2h0LXRoaXMuc3RyVG9OdW1iZXIoc3R5bGUucGFkZGluZ0xlZnQpLXRoaXMuc3RyVG9OdW1iZXIoc3R5bGUucGFkZGluZ1JpZ2h0KTp0aGlzLm9wdGlvbnMuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy53aWR0aD0hdGhpcy5vcHRpb25zLndpZHRoPyBkaW1zLndpZHRoLXRoaXMuc3RyVG9OdW1iZXIoc3R5bGUucGFkZGluZ0xlZnQpLXRoaXMuc3RyVG9OdW1iZXIoc3R5bGUucGFkZGluZ1JpZ2h0KTpkaW1zLndpZHRoLXRoaXMuc3RyVG9OdW1iZXIoc3R5bGUucGFkZGluZ0xlZnQpLXRoaXMuc3RyVG9OdW1iZXIoc3R5bGUucGFkZGluZ1JpZ2h0KTtcclxuXHJcbiAgICAgICAgdGhpcy5jYWxQbG90QmFja2dyb3VuZCgpXHJcblxyXG4gICAgICAgIGxldCBjb3VudEZsYWc9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLnBsb3RPcHRpb25zLmdyb3VwQmFyUGFkZGluZz10aGlzLmdyb3VwQmFyUGFkZGluZ0JLO1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy5wbG90T3B0aW9ucy5pbm5lckJhclBhZGRpbmc9dGhpcy5pbm5lckJhclBhZGRpbmdCSztcclxuICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgIGlmIChjb3VudEZsYWc9PXRydWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5wbG90T3B0aW9ucy5ncm91cEJhclBhZGRpbmctLTtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5wbG90T3B0aW9ucy5pbm5lckJhclBhZGRpbmc9MjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmJhclR5cGU9PSd2ZXJ0aWNhbCcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMueFNjYWxlPXRoaXMuZ2V0WFNjYWxlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnlTY2FsZT10aGlzLmdldFhTY2FsZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaW5uZXJTY2FsZT10aGlzLmdldElubmVyU2NhbGUoKTtcclxuICAgICAgICAgICAgY291bnRGbGFnPXRydWU7XHJcblxyXG4gICAgICAgIH0gd2hpbGUgKHRoaXMuaW5uZXJTY2FsZS5iYW5kd2lkdGgoKTwyKTtcclxuICAgICAgICAvLyBcclxuXHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5iYXJUeXBlPT0ndmVydGljYWwnKSB7XHJcbiAgICAgICAgICAgIHRoaXMueVNjYWxlPXRoaXMuZ2V0WVNjYWxlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnhTY2FsZT10aGlzLmdldFlTY2FsZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGNvbG9ySGVscGVyPW5ldyBDb2xvckhlbHBlcih0aGlzLm9wdGlvbnMsIHRoaXMuc2VyaWVzKTtcclxuICAgICAgICB0aGlzLmNvbG9yU2NhbGU9Y29sb3JIZWxwZXIuZ2VuZXJhdGVDb2xvclNjYWxlKCk7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmdyb3VwTmFtZT1bXTtcclxuICAgICAgICAgICAgdGhpcy5zZXJpZXMubWFwKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0ubmFtZSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyb3VwTmFtZS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogaXRlbS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhpcy5jb2xvclNjYWxlKGl0ZW0ubmFtZSlcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVCYXIoKTtcclxuXHJcbiAgICAgICAgICAgIC8vc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBmb3IgKGxldCBpPTA7IGk8dGhpcy5iYXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2codGhpcy5iYXJzW2ldLmNsYXNzTmFtZSlcclxuICAgICAgICAgICAgICAgIC8vICAgICB0cmFuc2l0aW9uKHNlbGVjdCh0aGlzLmVsZW1lbnQpKS5zZWxlY3QoJy5iYXIwMicpLnRyYW5zaXRpb24oKVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAuZHVyYXRpb24oNTAwKVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAuYXR0cignd2lkdGgnLCB0aGlzLmJhcnNbaV0ud2lkdGgpO1xyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAvL30sMTAwMClcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFhTY2FsZSgpOiBhbnkge1xyXG5cclxuICAgICAgICBsZXQgc3BhY2luZztcclxuICAgICAgICBsZXQgcmFuZ2U7XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5iYXJUeXBlPT0ndmVydGljYWwnKSB7XHJcbiAgICAgICAgICAgIHNwYWNpbmc9KHRoaXMuY2F0ZWdvcmllcy5sZW5ndGgvKHRoaXMub3B0aW9ucy5wbG90QmFja2dyb3VuZC53aWR0aC90aGlzLm9wdGlvbnMucGxvdE9wdGlvbnMuZ3JvdXBCYXJQYWRkaW5nKSk7XHJcbiAgICAgICAgICAgIHJhbmdlPVswLCB0aGlzLm9wdGlvbnMucGxvdEJhY2tncm91bmQud2lkdGhdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IGxlbmd0aD10aGlzLm9wdGlvbnMuaGVpZ2h0LXRoaXMub3B0aW9ucy5oZWFkZXIuaGVpZ2h0O1xyXG4gICAgICAgICAgICBzcGFjaW5nPSh0aGlzLmNhdGVnb3JpZXMubGVuZ3RoLyh0aGlzLm9wdGlvbnMucGxvdEJhY2tncm91bmQuaGVpZ2h0L3RoaXMub3B0aW9ucy5wbG90T3B0aW9ucy5ncm91cEJhclBhZGRpbmcpKTtcclxuICAgICAgICAgICAgcmFuZ2U9WzAsIHRoaXMub3B0aW9ucy5wbG90QmFja2dyb3VuZC5oZWlnaHRdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2NhbGVCYW5kKClcclxuICAgICAgICAgICAgLnJhbmdlKHJhbmdlKVxyXG4gICAgICAgICAgICAucGFkZGluZ0lubmVyKHNwYWNpbmcpXHJcbiAgICAgICAgICAgIC5wYWRkaW5nT3V0ZXIoMC4xKVxyXG4gICAgICAgICAgICAuZG9tYWluKHRoaXMuY2F0ZWdvcmllcyk7XHJcbiAgICB9XHJcbiAgICBnZXRJbm5lclNjYWxlKCk6IGFueSB7XHJcblxyXG4gICAgICAgIGxldCBncm91cERhdGFBcnI9W107XHJcbiAgICAgICAgZm9yIChsZXQgaT0wOyBpPHRoaXMuc2VyaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGdyb3VwRGF0YUFyci5wdXNoKHRoaXMuc2VyaWVzW2ldLm5hbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNwYWNpbmc7XHJcbiAgICAgICAgbGV0IHJhbmdlO1xyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYmFyVHlwZT09J3ZlcnRpY2FsJykge1xyXG4gICAgICAgICAgICBzcGFjaW5nPSh0aGlzLnNlcmllcy5sZW5ndGgvKHRoaXMueFNjYWxlLmJhbmR3aWR0aCgpL3RoaXMub3B0aW9ucy5wbG90T3B0aW9ucy5pbm5lckJhclBhZGRpbmcpKTtcclxuICAgICAgICAgICAgcmFuZ2U9dGhpcy54U2NhbGUuYmFuZHdpZHRoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBzcGFjaW5nPSh0aGlzLnNlcmllcy5sZW5ndGgvKHRoaXMueVNjYWxlLmJhbmR3aWR0aCgpL3RoaXMub3B0aW9ucy5wbG90T3B0aW9ucy5pbm5lckJhclBhZGRpbmcpKTtcclxuICAgICAgICAgICAgcmFuZ2U9dGhpcy55U2NhbGUuYmFuZHdpZHRoKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc2NhbGVCYW5kKClcclxuICAgICAgICAgICAgLnJhbmdlKFswLCByYW5nZV0pXHJcbiAgICAgICAgICAgIC5wYWRkaW5nSW5uZXIoc3BhY2luZylcclxuICAgICAgICAgICAgLmRvbWFpbihncm91cERhdGFBcnIpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFlTY2FsZSgpOiBhbnkge1xyXG4gICAgICAgIGxldCB1bmlxdWVWYWx1ZTogYW55PW5ldyBTZXQoKTtcclxuICAgICAgICB0aGlzLnNlcmllcy5tYXAoKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgaXRlbS5kYXRhLm1hcCgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgIHVuaXF1ZVZhbHVlLmFkZCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgbWluPU1hdGgubWluKC4uLnVuaXF1ZVZhbHVlKTtcclxuICAgICAgICBtaW49bWluPjA/IDA6bWluO1xyXG5cclxuICAgICAgICBsZXQgbWF4PU1hdGgubWF4KDAsIC4uLnVuaXF1ZVZhbHVlKTtcclxuICAgICAgICBtYXg9bWF4PjA/IG1heDowO1xyXG5cclxuICAgICAgICBsZXQgcmFuZ2U9W107XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5iYXJUeXBlPT0ndmVydGljYWwnKSB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZT10aGlzLm9wdGlvbnMucGxvdEJhY2tncm91bmQuaGVpZ2h0O1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImJhciBnZXRZU2NhbGVcIix2YWx1ZSlcclxuICAgICAgICAgICAgcmFuZ2U9W3ZhbHVlLCAwXTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJiYXIgZ2V0WVNjYWxlIC0gXCIsIHJhbmdlKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlPXRoaXMub3B0aW9ucy5wbG90QmFja2dyb3VuZC53aWR0aC0zMDtcclxuICAgICAgICAgICAgcmFuZ2U9WzAsIHZhbHVlXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiYmFyIGdldFlTY2FsZSAtLS0gXCIsIHJhbmdlLCBtaW4sIG1heClcclxuXHJcbiAgICAgICAgcmV0dXJuIHNjYWxlTGluZWFyKClcclxuICAgICAgICAgICAgLnJhbmdlKHJhbmdlKVxyXG4gICAgICAgICAgICAuZG9tYWluKFttaW4sIG1heF0pO1xyXG4gICAgICAgIC8vcmV0dXJuIHRoaXMuc2NhbGUubmljZSgpLnRpY2tzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsUGxvdEJhY2tncm91bmQoKSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zPXtcclxuICAgICAgICAgICAgLi4udGhpcy5vcHRpb25zLFxyXG4gICAgICAgICAgICBwbG90QmFja2dyb3VuZDoge1xyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5vcHRpb25zLnBsb3RCYWNrZ3JvdW5kLFxyXG4gICAgICAgICAgICAgICAgeDogMCxcclxuICAgICAgICAgICAgICAgIHk6IDAsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IHRoaXMub3B0aW9ucy5oZWlnaHQtdGhpcy5vcHRpb25zLnhBeGlzLmhlaWdodC10aGlzLm9wdGlvbnMuaGVhZGVyLmhlaWdodC10aGlzLm9wdGlvbnMucGFkZGluZyxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiB0aGlzLm9wdGlvbnMud2lkdGgtdGhpcy5vcHRpb25zLnlBeGlzLndpZHRoLXRoaXMub3B0aW9ucy5wYWRkaW5nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJjYWxQbG90QmFja2dyb3VuZFwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLm9wdGlvbnMpKTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVCYXIoKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInRoaXMuaW5uZXJTY2FsZS5iYW5kd2lkdGgoKSBcIit0aGlzLmlubmVyU2NhbGUuYmFuZHdpZHRoKCkpXHJcbiAgICAgICAgdGhpcy5iYXJzPVtdO1xyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYmFyVHlwZT09J3ZlcnRpY2FsJykge1xyXG4gICAgICAgICAgICB0aGlzLmNhdGVnb3JpZXMubWFwKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaT0wOyBpPHRoaXMuc2VyaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFyOiBhbnk9e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogaXRlbSwgIC8vamFuLGZlYlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLnNlcmllc1tpXS5kYXRhW2luZGV4XSwgLy8xMDEsMjAyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwOiB0aGlzLnNlcmllc1tpXS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhpcy5jb2xvclNjYWxlKHRoaXMuc2VyaWVzW2ldLm5hbWUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2Zvcm1hdHRlZExhYmVsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy5pbm5lclNjYWxlLmJhbmR3aWR0aCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHRoaXMuc2VyaWVzW2ldLmRhdGFbaW5kZXhdPjA/ICh0aGlzLnlTY2FsZSgwKS10aGlzLnlTY2FsZSh0aGlzLnNlcmllc1tpXS5kYXRhW2luZGV4XSkpOih0aGlzLnlTY2FsZSh0aGlzLnNlcmllc1tpXS5kYXRhW2luZGV4XSktdGhpcy55U2NhbGUoMCkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB4OiB0aGlzLmlubmVyU2NhbGUodGhpcy5zZXJpZXNbaV0ubmFtZSkrdGhpcy54U2NhbGUoaXRlbSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IHRoaXMuc2VyaWVzW2ldLmRhdGFbaW5kZXhdPjA/IHRoaXMueVNjYWxlKHRoaXMuc2VyaWVzW2ldLmRhdGFbaW5kZXhdKTp0aGlzLnlTY2FsZSgwKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInZlcnRpY2FsX2JhclwiXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJhcnMucHVzaChiYXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2F0ZWdvcmllcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy5zZXJpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBiYXI6IGFueT17XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBpdGVtLCAgLy9qYW4sZmViXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuc2VyaWVzW2ldLmRhdGFbaW5kZXhdLCAvLzEwMSwyMDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IHRoaXMuc2VyaWVzW2ldLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB0aGlzLmNvbG9yU2NhbGUodGhpcy5zZXJpZXNbaV0ubmFtZSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZm9ybWF0dGVkTGFiZWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiB0aGlzLnNlcmllc1tpXS5kYXRhW2luZGV4XT4wPyAodGhpcy54U2NhbGUodGhpcy5zZXJpZXNbaV0uZGF0YVtpbmRleF0pLXRoaXMueFNjYWxlKDApKToodGhpcy54U2NhbGUoMCktdGhpcy54U2NhbGUodGhpcy5zZXJpZXNbaV0uZGF0YVtpbmRleF0pKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLmlubmVyU2NhbGUuYmFuZHdpZHRoKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IHRoaXMuc2VyaWVzW2ldLmRhdGFbaW5kZXhdPjA/IHRoaXMueFNjYWxlKDApOnRoaXMueFNjYWxlKHRoaXMuc2VyaWVzW2ldLmRhdGFbaW5kZXhdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeTogdGhpcy5pbm5lclNjYWxlKHRoaXMuc2VyaWVzW2ldLm5hbWUpK3RoaXMueVNjYWxlKGl0ZW0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiaG9yaXpvbnRhbF9iYXJcIlxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXJzLnB1c2goYmFyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICB5QXhpc1dpZHRoQ2hhbmdlKHsgeUF4aXNXaWR0aCwgeUF4aXNIZWlnaHQsICB5QXhpc1JpZ2h0V2lkdGggfSkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJ5QXhpc1dpZHRoIFwiK3lBeGlzV2lkdGgpXHJcbiAgICAgICAgdGhpcy5vcHRpb25zPXtcclxuICAgICAgICAgICAgLi4udGhpcy5vcHRpb25zLFxyXG4gICAgICAgICAgICB5QXhpczoge1xyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5vcHRpb25zLnlBeGlzLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IHlBeGlzV2lkdGgsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IHlBeGlzSGVpZ2h0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyggdGhpcy5vcHRpb25zKVxyXG4gICAgICAgIHRoaXMudXBkYXRlKClcclxuICAgIH1cclxuXHJcbiAgICB4QXhpc0hlaWdodENoYW5nZSh7IHhBeGlzSGVpZ2h0IH0pIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnM9e1xyXG4gICAgICAgICAgICAuLi50aGlzLm9wdGlvbnMsXHJcbiAgICAgICAgICAgIHhBeGlzOiB7XHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLm9wdGlvbnMueEF4aXMsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IHhBeGlzSGVpZ2h0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInhBeGlzSGVpZ2h0Q2hhbmdlXCIsIHhBeGlzSGVpZ2h0LCBKU09OLnN0cmluZ2lmeSh0aGlzLm9wdGlvbnMueEF4aXMpKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZSgpXHJcbiAgICB9XHJcbiAgICBoZWFkZXJIZWlnaHRDaGFuZ2UoeyBoZWFkZXJIZWlnaHQgfSkge1xyXG4gICAgICAgIHRoaXMub3B0aW9ucz17XHJcbiAgICAgICAgICAgIC4uLnRoaXMub3B0aW9ucyxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLm9wdGlvbnMuaGVhZGVyLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBoZWFkZXJIZWlnaHRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnVwZGF0ZSgpXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHRvb2xUaXBQbGFjY2VtZW50KGRhdGEpIHtcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmJhclR5cGU9PSd2ZXJ0aWNhbCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGE+MD8gJ3RvcCc6J2JvdHRvbSdcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhPjA/ICdyaWdodCc6J2xlZnQnXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScsIFsnJGV2ZW50J10pXHJcbiAgICBvblJlc2l6ZShldmVudCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJ3aW5kb3c6cmVzaXplXCIpXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnVwZGF0ZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRWaWV3Qm94KCkge1xyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMud2lkdGg+MCYmdGhpcy5vcHRpb25zLmhlaWdodD4wKVxyXG4gICAgICAgICAgICByZXR1cm4gJzAgMCAnK3RoaXMub3B0aW9ucy53aWR0aCsnICcrdGhpcy5vcHRpb25zLmhlaWdodDtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiAnMCAwIDAgMCc7XHJcbiAgICB9XHJcbiAgICBcclxuXHJcblxyXG5cclxuICAgIHByaXZhdGUgc3RyVG9OdW1iZXIoc3RyKSB7XHJcbiAgICAgICAgbGV0IG51bWJlclBhdHRlcm49L1xcZCsvZztcclxuICAgICAgICBsZXQgbnVtPXN0ci5tYXRjaChudW1iZXJQYXR0ZXJuKS5qb2luKCcnKVxyXG4gICAgICAgIHJldHVybiBwYXJzZUZsb2F0KG51bSk7XHJcbiAgICB9XHJcbn1cclxuIl19