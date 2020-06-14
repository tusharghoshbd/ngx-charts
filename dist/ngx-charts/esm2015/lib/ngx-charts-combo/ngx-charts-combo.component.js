/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewEncapsulation, ElementRef, ChangeDetectorRef, HostListener } from "@angular/core";
import { scaleBand, scaleLinear } from "d3-scale";
import { ColorHelper } from '../utils/color.helper';
export class ngxChartsComboComponent {
    /**
     * @param {?} chartElement
     * @param {?} cdr
     */
    constructor(chartElement, cdr) {
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
        this._options['barType'] = 'vertical';
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
                if (item.name) {
                    this.groupName.push({
                        name: item.name,
                        color: this.colorScale(item.name)
                    });
                }
            }));
            this.createBar();
            this.createLine();
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
            if (this.series[i].type == "column") {
                groupDataArr.push(this.series[i].name);
            }
        }
        /** @type {?} */
        let spacing;
        /** @type {?} */
        let range;
        /** @type {?} */
        let length = 0;
        for (let i = 0; i < this.series.length; i++) {
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
    createLine() {
        //console.log("this.innerScale.bandwidth() "+this.innerScale.bandwidth())
        this.lines = [];
        this.lineCircle = [];
        for (let i = 0; i < this.series.length; i++) {
            if (this.series[i].type == "line" || this.series[i].type == undefined) {
                /** @type {?} */
                let line = { points: "", color: "" };
                for (let j = 0; j < this.categories.length; j++) {
                    /** @type {?} */
                    let x = this.xScale(this.categories[j]) + (this.xScale.bandwidth() / 2) + this.options.yAxis.width;
                    /** @type {?} */
                    let y = this.yScale(this.series[i].data[j]) + this.options.header.height;
                    line.points += (x + "," + y + " ");
                    line.color = this.colorScale(this.series[i].name);
                    this.lineCircle.push({
                        x,
                        y,
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
    }
    /**
     * @return {?}
     */
    createBar() {
        this.bars = [];
        this.categories.map((/**
         * @param {?} item
         * @param {?} index
         * @return {?}
         */
        (item, index) => {
            for (let i = 0; i < this.series.length; i++) {
                if (this.series[i].type == "column") {
                    /** @type {?} */
                    const bar = {
                        value: item,
                        //jan,feb
                        data: this.series[i].data[index],
                        //101,202
                        group: this.series[i].name,
                        color: this.colorScale(this.series[i].name),
                        width: this.innerScale.bandwidth(),
                        height: this.series[i].data[index] > 0 ? (this.yScale(0) - this.yScale(this.series[i].data[index])) : (this.yScale(this.series[i].data[index]) - this.yScale(0)),
                        x: this.innerScale(this.series[i].name) + this.xScale(item),
                        y: this.series[i].data[index] > 0 ? this.yScale(this.series[i].data[index]) : this.yScale(0),
                        className: "vertical_bar"
                    };
                    this.bars.push(bar);
                }
            }
        }));
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    yAxisWidthChange({ yAxisWidth, yAxisHeight }) {
        this.options = Object.assign({}, this.options, { yAxis: Object.assign({}, this.options.yAxis, { width: yAxisWidth, height: yAxisHeight }) });
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
ngxChartsComboComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
ngxChartsComboComponent.propDecorators = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNoYXJ0cy1jb21iby5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHVzaGFyZ2hvc2hiZC9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL25neC1jaGFydHMtY29tYm8vbmd4LWNoYXJ0cy1jb21iby5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsS0FBSyxFQUNMLGlCQUFpQixFQUlqQixVQUFVLEVBQ1YsaUJBQWlCLEVBRWpCLFlBQVksRUFDZixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFVcEQsTUFBTSxPQUFPLHVCQUF1Qjs7Ozs7SUFnSGhDLFlBQ1ksWUFBd0IsRUFDeEIsR0FBc0I7UUFEdEIsaUJBQVksR0FBWixZQUFZLENBQVk7UUFDeEIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFqSDFCLGtCQUFhLEdBQUM7WUFDbEIsT0FBTyxFQUFFLFVBQVU7WUFDbkIsS0FBSyxFQUFFLEVBQUU7WUFDVCxRQUFRLEVBQUUsRUFBRTtZQUNaLE1BQU0sRUFBRSxDQUFDO1lBQ1QsS0FBSyxFQUFFLENBQUM7WUFDUixPQUFPLEVBQUUsQ0FBQztZQUNWLEtBQUssRUFBRTtnQkFDSCxLQUFLLEVBQUUsRUFBRTtnQkFDVCxNQUFNLEVBQUUsQ0FBQztnQkFDVCxhQUFhLEVBQUUsQ0FBQztnQkFDaEIsVUFBVSxFQUFFLE1BQU07Z0JBQ2xCLGFBQWEsRUFBRSxLQUFLO2dCQUNwQixpQkFBaUIsRUFBRSxFQUFFO2FBQ3hCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILEtBQUssRUFBRSxFQUFFO2dCQUNULEtBQUssRUFBRSxDQUFDO2dCQUNSLE1BQU0sRUFBRSxDQUFDO2dCQUNULGFBQWEsRUFBRSxDQUFDO2dCQUNoQixhQUFhLEVBQUUsS0FBSztnQkFDcEIsaUJBQWlCLEVBQUUsRUFBRTthQUN4QjtZQUNELE1BQU0sRUFBRTtnQkFDSixhQUFhLEVBQUUsS0FBSztnQkFDcEIsaUJBQWlCLEVBQUUsRUFBRTthQUN4QjtZQUNELGNBQWMsRUFBRTtnQkFDWixDQUFDLEVBQUUsQ0FBQztnQkFDSixDQUFDLEVBQUUsQ0FBQztnQkFDSixNQUFNLEVBQUUsQ0FBQztnQkFDVCxLQUFLLEVBQUUsQ0FBQzthQUNYO1lBQ0QsV0FBVyxFQUFFO2dCQUNULGVBQWUsRUFBRSxFQUFFO2dCQUNuQixlQUFlLEVBQUUsQ0FBQzthQUNyQjtZQUNELE1BQU0sRUFBRTtnQkFDSixNQUFNLEVBQUUsQ0FBQztnQkFDVCxLQUFLLEVBQUUsQ0FBQzthQUNYO1NBQ0osQ0FBQztRQUVNLGFBQVEsR0FBTSxFQUFFLENBQUM7UUFrRGhCLGVBQVUsR0FBTSxFQUFFLENBQUM7UUFDbkIsV0FBTSxHQUFNLEVBQUUsQ0FBQztRQVN4QixVQUFLLEdBQU0sRUFBRSxDQUFDO1FBQ2QsU0FBSSxHQUFNLEVBQUUsQ0FBQztRQUNiLGVBQVUsR0FBTSxFQUFFLENBQUM7UUFDbkIsY0FBUyxHQUFRLEVBQUUsQ0FBQztJQU9rQixDQUFDOzs7OztJQXBFdkMsSUFBYSxPQUFPLENBQUMsR0FBUTs7WUFDckIsS0FBSyxHQUFDLEdBQUcsQ0FBQyxLQUFLOztZQUNmLEtBQUssR0FBQyxHQUFHLENBQUMsS0FBSzs7WUFDZixNQUFNLEdBQUMsR0FBRyxDQUFDLE1BQU07O1lBQ2pCLGNBQWMsR0FBQyxHQUFHLENBQUMsY0FBYzs7WUFDakMsV0FBVyxHQUFDLEdBQUcsQ0FBQyxXQUFXOztZQUMzQixNQUFNLEdBQUMsR0FBRyxDQUFDLE1BQU07UUFFckIsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEIsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEIsT0FBTyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDckIsT0FBTyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUM3QixPQUFPLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMxQixPQUFPLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVyQixJQUFJLENBQUMsUUFBUSxxQkFDTixJQUFJLENBQUMsYUFBYSxFQUNsQixHQUFHLElBQ04sS0FBSyxvQkFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFDeEIsS0FBSyxHQUVaLEtBQUssb0JBQ0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQ3hCLEtBQUssR0FFWixNQUFNLG9CQUNDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUN6QixNQUFNLEdBRWIsY0FBYyxvQkFDUCxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsRUFDakMsY0FBYyxHQUVyQixXQUFXLG9CQUNKLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUM5QixXQUFXLEdBRWxCLE1BQU0sb0JBQ0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQ3pCLE1BQU0sSUFFaEIsQ0FBQztRQUNGLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUMsVUFBVSxDQUFDO0lBQ3hDLENBQUM7Ozs7SUFDRCxJQUFJLE9BQU87UUFDUCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQzs7Ozs7SUF1QkQsV0FBVyxDQUFDLE9BQXNCO1FBQzlCLElBQUksQ0FBQyxpQkFBaUIsR0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUM7UUFDaEUsSUFBSSxDQUFDLGlCQUFpQixHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQztRQUNoRSxVQUFVOzs7UUFBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUMsQ0FBQztJQUNwQyxDQUFDOzs7O0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBRXhDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsQixDQUFDOzs7O0lBRUQsTUFBTTs7O2NBRUksUUFBUSxHQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYTs7WUFDMUMsSUFBSSxHQUFDLFFBQVEsQ0FBQyxVQUFVLEtBQUcsSUFBSSxDQUFBLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLHFCQUFxQixFQUFFLENBQUEsQ0FBQyxDQUFBLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFOztZQUV4RyxLQUFLLEdBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxZQUFZLElBQUUsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7UUFFeEYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDbkosSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUFDLEtBQUssR0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVoTixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQTs7WUFFcEIsU0FBUyxHQUFDLEtBQUs7UUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsZUFBZSxHQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztRQUNoRSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxlQUFlLEdBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1FBQ2hFLEdBQUc7WUFDQyxJQUFJLFNBQVMsSUFBRSxJQUFJLEVBQUU7Z0JBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUMzQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxlQUFlLEdBQUMsQ0FBQyxDQUFDO2FBQzlDO1lBQ0QsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBRSxVQUFVLEVBQUU7Z0JBQ2xDLElBQUksQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2FBQ2hDO2lCQUNJO2dCQUNELElBQUksQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2FBQ2hDO1lBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDckMsU0FBUyxHQUFDLElBQUksQ0FBQztTQUNsQixRQUFRLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLEdBQUMsQ0FBQyxFQUFFO1FBQ3hDLEdBQUc7UUFFSCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFFLFVBQVUsRUFBRTtZQUNsQyxJQUFJLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNoQzthQUNJO1lBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDaEM7O1lBRUcsV0FBVyxHQUFDLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMxRCxJQUFJLENBQUMsVUFBVSxHQUFDLFdBQVcsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBRWpELFVBQVU7OztRQUFDLEdBQUcsRUFBRTtZQUNaLElBQUksQ0FBQyxTQUFTLEdBQUMsRUFBRSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRzs7OztZQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNuQixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7b0JBQ1gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7d0JBQ2hCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTt3QkFDZixLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO3FCQUNwQyxDQUFDLENBQUM7aUJBQ047WUFDTCxDQUFDLEVBQUMsQ0FBQTtZQUNGLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNqQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDdEIsQ0FBQyxFQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzdCLENBQUM7Ozs7SUFFRCxTQUFTOztZQUVELE9BQU87O1lBQ1AsS0FBSztRQUNULElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUUsVUFBVSxFQUFFO1lBQ2xDLE9BQU8sR0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDOUcsS0FBSyxHQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2hEO2FBQ0k7O2dCQUNHLE1BQU0sR0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNO1lBQ3pELE9BQU8sR0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDL0csS0FBSyxHQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ2pEO1FBQ0QsT0FBTyxTQUFTLEVBQUU7YUFDYixLQUFLLENBQUMsS0FBSyxDQUFDO2FBQ1osWUFBWSxDQUFDLE9BQU8sQ0FBQzthQUNyQixZQUFZLENBQUMsR0FBRyxDQUFDO2FBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDakMsQ0FBQzs7OztJQUNELGFBQWE7O1lBRUwsWUFBWSxHQUFDLEVBQUU7UUFDbkIsS0FBSyxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3JDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUUsUUFBUSxFQUFFO2dCQUMvQixZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDMUM7U0FDSjs7WUFFRyxPQUFPOztZQUNQLEtBQUs7O1lBQ0wsTUFBTSxHQUFHLENBQUM7UUFDZCxLQUFLLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDckMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBRSxRQUFRLEVBQUU7Z0JBQy9CLE1BQU0sRUFBRSxDQUFDO2FBQ1o7U0FDSjtRQUNELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUUsVUFBVSxFQUFFO1lBQ2xDLE9BQU8sR0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLEdBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUNwRixLQUFLLEdBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNqQzthQUNJO1lBQ0QsT0FBTyxHQUFDLENBQUMsTUFBTSxHQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsR0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQ3BGLEtBQUssR0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ2pDO1FBRUQsT0FBTyxTQUFTLEVBQUU7YUFDYixLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDakIsWUFBWSxDQUFDLE9BQU8sQ0FBQzthQUNyQixNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDOUIsQ0FBQzs7OztJQUVELFNBQVM7O1lBQ0QsV0FBVyxHQUFNLElBQUksR0FBRyxFQUFFO1FBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRzs7OztRQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHOzs7O1lBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDcEIsV0FBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzQixDQUFDLEVBQUMsQ0FBQztRQUNQLENBQUMsRUFBQyxDQUFDOztZQUVDLEdBQUcsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsV0FBVyxDQUFDO1FBQ2hDLEdBQUcsR0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFBLEdBQUcsQ0FBQzs7WUFFYixHQUFHLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxXQUFXLENBQUM7UUFDbkMsR0FBRyxHQUFDLEdBQUcsR0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLEdBQUcsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFDOztZQUViLEtBQUssR0FBQyxFQUFFO1FBQ1osSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBRSxVQUFVLEVBQUU7O2dCQUM5QixLQUFLLEdBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTTtZQUM1QyxxQ0FBcUM7WUFDckMsS0FBSyxHQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLHlDQUF5QztTQUM1QzthQUNJOztnQkFDRyxLQUFLLEdBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxHQUFDLEVBQUU7WUFDOUMsS0FBSyxHQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ3BCO1FBRUQscURBQXFEO1FBRXJELE9BQU8sV0FBVyxFQUFFO2FBQ2YsS0FBSyxDQUFDLEtBQUssQ0FBQzthQUNaLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLG1DQUFtQztJQUN2QyxDQUFDOzs7O0lBR0QsaUJBQWlCO1FBQ2IsSUFBSSxDQUFDLE9BQU8scUJBQ0wsSUFBSSxDQUFDLE9BQU8sSUFDZixjQUFjLG9CQUNQLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxJQUM5QixDQUFDLEVBQUUsQ0FBQyxFQUNKLENBQUMsRUFBRSxDQUFDLEVBQ0osTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQ3JHLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLE1BRTlFLENBQUE7UUFDRCxrRUFBa0U7SUFDdEUsQ0FBQzs7OztJQUNELFVBQVU7UUFDTix5RUFBeUU7UUFDekUsSUFBSSxDQUFDLEtBQUssR0FBQyxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsVUFBVSxHQUFDLEVBQUUsQ0FBQztRQUNuQixLQUFLLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDckMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBRSxNQUFNLElBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUUsU0FBUyxFQUFFOztvQkFDekQsSUFBSSxHQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFO2dCQUNsQyxLQUFLLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7O3dCQUNyQyxDQUFDLEdBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxHQUFDLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUs7O3dCQUN0RixDQUFDLEdBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU07b0JBQ3BFLElBQUksQ0FBQyxNQUFNLElBQUUsQ0FBQyxDQUFDLEdBQUMsR0FBRyxHQUFDLENBQUMsR0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDM0IsSUFBSSxDQUFDLEtBQUssR0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2hELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO3dCQUNqQixDQUFDO3dCQUNELENBQUM7d0JBQ0QsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7d0JBQzNDLEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzs7d0JBQ3pCLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7O3dCQUM1QixLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO3FCQUM3QixDQUFDLENBQUM7aUJBQ047Z0JBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDekI7U0FDSjtJQUNMLENBQUM7Ozs7SUFDRCxTQUFTO1FBQ0wsSUFBSSxDQUFDLElBQUksR0FBQyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUc7Ozs7O1FBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDaEMsS0FBSyxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNyQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFFLFFBQVEsRUFBRTs7MEJBQ3pCLEdBQUcsR0FBTTt3QkFDWCxLQUFLLEVBQUUsSUFBSTs7d0JBQ1gsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQzs7d0JBQ2hDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7d0JBQzFCLEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO3dCQUMzQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUU7d0JBQ2xDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDdkosQ0FBQyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQzt3QkFDekQsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFDLENBQUMsQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENB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bXBvcnQge1xyXG4gICAgQ29tcG9uZW50LFxyXG4gICAgSW5wdXQsXHJcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcclxuICAgIE9uQ2hhbmdlcyxcclxuICAgIE9uSW5pdCxcclxuICAgIFNpbXBsZUNoYW5nZXMsXHJcbiAgICBFbGVtZW50UmVmLFxyXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICAgIEhvc3RMaXN0ZW5lclxyXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcblxyXG5pbXBvcnQgeyBzY2FsZUJhbmQsIHNjYWxlTGluZWFyIH0gZnJvbSBcImQzLXNjYWxlXCI7XHJcbmltcG9ydCB7IENvbG9ySGVscGVyIH0gZnJvbSAnLi4vdXRpbHMvY29sb3IuaGVscGVyJztcclxuaW1wb3J0IHsgQ2xhc3NHZXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb21waWxlci9zcmMvb3V0cHV0L291dHB1dF9hc3QnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJuZ3gtY2hhcnRzLWNvbWJvXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL25neC1jaGFydHMtY29tYm8uY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi9uZ3gtY2hhcnRzLWNvbWJvLmNvbXBvbmVudC5jc3NcIl0sXHJcbiAgICAvLyBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcclxufSlcclxuZXhwb3J0IGNsYXNzIG5neENoYXJ0c0NvbWJvQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQge1xyXG4gICAgcHJpdmF0ZSBjdXN0b21PcHRpb25zPXtcclxuICAgICAgICBiYXJUeXBlOiAndmVydGljYWwnLFxyXG4gICAgICAgIHRpdGxlOiAnJyxcclxuICAgICAgICBzdWJ0aXRsZTogJycsXHJcbiAgICAgICAgaGVpZ2h0OiAwLFxyXG4gICAgICAgIHdpZHRoOiAwLFxyXG4gICAgICAgIHBhZGRpbmc6IDUsXHJcbiAgICAgICAgeEF4aXM6IHtcclxuICAgICAgICAgICAgdGl0bGU6ICcnLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDAsXHJcbiAgICAgICAgICAgIGxhYmVsUm90YXRpb246IDAsXHJcbiAgICAgICAgICAgIGxhYmVsQWxpZ246ICdsZWZ0JyxcclxuICAgICAgICAgICAgbGFiZWxFbGxpcHNpczogZmFsc2UsXHJcbiAgICAgICAgICAgIGxhYmVsRWxsaXBzaXNTaXplOiAxNlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgeUF4aXM6IHtcclxuICAgICAgICAgICAgdGl0bGU6ICcnLFxyXG4gICAgICAgICAgICB3aWR0aDogMCxcclxuICAgICAgICAgICAgaGVpZ2h0OiAwLFxyXG4gICAgICAgICAgICBsYWJlbFJvdGF0aW9uOiAwLFxyXG4gICAgICAgICAgICBsYWJlbEVsbGlwc2lzOiBmYWxzZSxcclxuICAgICAgICAgICAgbGFiZWxFbGxpcHNpc1NpemU6IDE2XHJcbiAgICAgICAgfSxcclxuICAgICAgICBsZWdlbmQ6IHtcclxuICAgICAgICAgICAgbGFiZWxFbGxpcHNpczogZmFsc2UsXHJcbiAgICAgICAgICAgIGxhYmVsRWxsaXBzaXNTaXplOiAxNlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGxvdEJhY2tncm91bmQ6IHtcclxuICAgICAgICAgICAgeDogMCxcclxuICAgICAgICAgICAgeTogMCxcclxuICAgICAgICAgICAgaGVpZ2h0OiAwLFxyXG4gICAgICAgICAgICB3aWR0aDogMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGxvdE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgZ3JvdXBCYXJQYWRkaW5nOiAyMCxcclxuICAgICAgICAgICAgaW5uZXJCYXJQYWRkaW5nOiAzXHJcbiAgICAgICAgfSxcclxuICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgaGVpZ2h0OiAwLFxyXG4gICAgICAgICAgICB3aWR0aDogMFxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBfb3B0aW9uczogYW55PXt9O1xyXG5cclxuICAgIEBJbnB1dCgpIHNldCBvcHRpb25zKG9iajogYW55KSB7XHJcbiAgICAgICAgbGV0IHhBeGlzPW9iai54QXhpcztcclxuICAgICAgICBsZXQgeUF4aXM9b2JqLnlBeGlzO1xyXG4gICAgICAgIGxldCBsZWdlbmQ9b2JqLmxlZ2VuZDtcclxuICAgICAgICBsZXQgcGxvdEJhY2tncm91bmQ9b2JqLnBsb3RCYWNrZ3JvdW5kO1xyXG4gICAgICAgIGxldCBwbG90T3B0aW9ucz1vYmoucGxvdE9wdGlvbnM7XHJcbiAgICAgICAgbGV0IGhlYWRlcj1vYmouaGVhZGVyO1xyXG5cclxuICAgICAgICBkZWxldGUgb2JqWyd4QXhpcyddO1xyXG4gICAgICAgIGRlbGV0ZSBvYmpbJ3lBeGlzJ107XHJcbiAgICAgICAgZGVsZXRlIG9ialsnbGVnZW5kJ107XHJcbiAgICAgICAgZGVsZXRlIG9ialsncGxvdEJhY2tncm91bmQnXTtcclxuICAgICAgICBkZWxldGUgb2JqWydwbG90T3B0aW9ucyddO1xyXG4gICAgICAgIGRlbGV0ZSBvYmpbJ2hlYWRlciddO1xyXG5cclxuICAgICAgICB0aGlzLl9vcHRpb25zPXtcclxuICAgICAgICAgICAgLi4udGhpcy5jdXN0b21PcHRpb25zLFxyXG4gICAgICAgICAgICAuLi5vYmosXHJcbiAgICAgICAgICAgIHhBeGlzOiB7XHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLmN1c3RvbU9wdGlvbnMueEF4aXMsXHJcbiAgICAgICAgICAgICAgICAuLi54QXhpc1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB5QXhpczoge1xyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5jdXN0b21PcHRpb25zLnlBeGlzLFxyXG4gICAgICAgICAgICAgICAgLi4ueUF4aXNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbGVnZW5kOiB7XHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLmN1c3RvbU9wdGlvbnMubGVnZW5kLFxyXG4gICAgICAgICAgICAgICAgLi4ubGVnZW5kXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHBsb3RCYWNrZ3JvdW5kOiB7XHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLmN1c3RvbU9wdGlvbnMucGxvdEJhY2tncm91bmQsXHJcbiAgICAgICAgICAgICAgICAuLi5wbG90QmFja2dyb3VuZFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwbG90T3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5jdXN0b21PcHRpb25zLnBsb3RPcHRpb25zLFxyXG4gICAgICAgICAgICAgICAgLi4ucGxvdE9wdGlvbnNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLmN1c3RvbU9wdGlvbnMuaGVhZGVyLFxyXG4gICAgICAgICAgICAgICAgLi4uaGVhZGVyXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuX29wdGlvbnNbJ2JhclR5cGUnXT0ndmVydGljYWwnO1xyXG4gICAgfVxyXG4gICAgZ2V0IG9wdGlvbnMoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fb3B0aW9ucztcclxuICAgIH1cclxuICAgIEBJbnB1dCgpIGNhdGVnb3JpZXM6IGFueT1bXTtcclxuICAgIEBJbnB1dCgpIHNlcmllczogYW55PVtdO1xyXG5cclxuICAgIC8vQElucHV0KCkgZ3JvdXBCYXJQYWRkaW5nPTIwO1xyXG4gICAgLy9ASW5wdXQoKSBpbm5lckJhclBhZGRpbmc9MztcclxuXHJcbiAgICAvLyBzY2FsZTogYW55O1xyXG4gICAgeFNjYWxlOiBhbnk7XHJcbiAgICBpbm5lclNjYWxlOiBhbnk7XHJcbiAgICB5U2NhbGU6IGFueTtcclxuICAgIGxpbmVzOiBhbnk9W107XHJcbiAgICBiYXJzOiBhbnk9W107XHJcbiAgICBsaW5lQ2lyY2xlOiBhbnk9W107XHJcbiAgICBncm91cE5hbWU6IGFueVtdPVtdO1xyXG4gICAgZ3JvdXBCYXJQYWRkaW5nQks6IGFueTtcclxuICAgIGlubmVyQmFyUGFkZGluZ0JLOiBhbnk7XHJcbiAgICBjb2xvclNjYWxlOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBjaGFydEVsZW1lbnQ6IEVsZW1lbnRSZWYsXHJcbiAgICAgICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7IH1cclxuXHJcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ncm91cEJhclBhZGRpbmdCSz10aGlzLm9wdGlvbnMucGxvdE9wdGlvbnMuZ3JvdXBCYXJQYWRkaW5nO1xyXG4gICAgICAgIHRoaXMuaW5uZXJCYXJQYWRkaW5nQks9dGhpcy5vcHRpb25zLnBsb3RPcHRpb25zLmlubmVyQmFyUGFkZGluZztcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMudXBkYXRlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy53aWR0aD10aGlzLm9wdGlvbnMud2lkdGg7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLmhlaWdodD10aGlzLm9wdGlvbnMuaGVpZ2h0O1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInR0dHR0dHRcIix0aGlzLm9wdGlvbnMpXHJcbiAgICAgICAgY29uc3QgaG9zdEVsZW09dGhpcy5jaGFydEVsZW1lbnQubmF0aXZlRWxlbWVudDtcclxuICAgICAgICBsZXQgZGltcz1ob3N0RWxlbS5wYXJlbnROb2RlIT09bnVsbD8gaG9zdEVsZW0ucGFyZW50Tm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTp7IGhlaWdodDogNDAwLCB3aWR0aDogODAwIH07XHJcblxyXG4gICAgICAgIHZhciBzdHlsZT1ob3N0RWxlbS5wYXJlbnROb2RlLmN1cnJlbnRTdHlsZXx8d2luZG93LmdldENvbXB1dGVkU3R5bGUoaG9zdEVsZW0ucGFyZW50Tm9kZSk7XHJcblxyXG4gICAgICAgIHRoaXMub3B0aW9ucy5oZWlnaHQ9IXRoaXMub3B0aW9ucy5oZWlnaHQ/IGRpbXMuaGVpZ2h0LXRoaXMuc3RyVG9OdW1iZXIoc3R5bGUucGFkZGluZ0xlZnQpLXRoaXMuc3RyVG9OdW1iZXIoc3R5bGUucGFkZGluZ1JpZ2h0KTp0aGlzLm9wdGlvbnMuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy53aWR0aD0hdGhpcy5vcHRpb25zLndpZHRoPyBkaW1zLndpZHRoLXRoaXMuc3RyVG9OdW1iZXIoc3R5bGUucGFkZGluZ0xlZnQpLXRoaXMuc3RyVG9OdW1iZXIoc3R5bGUucGFkZGluZ1JpZ2h0KTpkaW1zLndpZHRoLXRoaXMuc3RyVG9OdW1iZXIoc3R5bGUucGFkZGluZ0xlZnQpLXRoaXMuc3RyVG9OdW1iZXIoc3R5bGUucGFkZGluZ1JpZ2h0KTtcclxuXHJcbiAgICAgICAgdGhpcy5jYWxQbG90QmFja2dyb3VuZCgpXHJcblxyXG4gICAgICAgIGxldCBjb3VudEZsYWc9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLnBsb3RPcHRpb25zLmdyb3VwQmFyUGFkZGluZz10aGlzLmdyb3VwQmFyUGFkZGluZ0JLO1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy5wbG90T3B0aW9ucy5pbm5lckJhclBhZGRpbmc9dGhpcy5pbm5lckJhclBhZGRpbmdCSztcclxuICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgIGlmIChjb3VudEZsYWc9PXRydWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5wbG90T3B0aW9ucy5ncm91cEJhclBhZGRpbmctLTtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5wbG90T3B0aW9ucy5pbm5lckJhclBhZGRpbmc9MjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmJhclR5cGU9PSd2ZXJ0aWNhbCcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMueFNjYWxlPXRoaXMuZ2V0WFNjYWxlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnlTY2FsZT10aGlzLmdldFhTY2FsZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaW5uZXJTY2FsZT10aGlzLmdldElubmVyU2NhbGUoKTtcclxuICAgICAgICAgICAgY291bnRGbGFnPXRydWU7XHJcbiAgICAgICAgfSB3aGlsZSAodGhpcy5pbm5lclNjYWxlLmJhbmR3aWR0aCgpPDIpO1xyXG4gICAgICAgIC8vIFxyXG5cclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmJhclR5cGU9PSd2ZXJ0aWNhbCcpIHtcclxuICAgICAgICAgICAgdGhpcy55U2NhbGU9dGhpcy5nZXRZU2NhbGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMueFNjYWxlPXRoaXMuZ2V0WVNjYWxlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY29sb3JIZWxwZXI9bmV3IENvbG9ySGVscGVyKHRoaXMub3B0aW9ucywgdGhpcy5zZXJpZXMpO1xyXG4gICAgICAgIHRoaXMuY29sb3JTY2FsZT1jb2xvckhlbHBlci5nZW5lcmF0ZUNvbG9yU2NhbGUoKTtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBOYW1lPVtdO1xyXG4gICAgICAgICAgICB0aGlzLnNlcmllcy5tYXAoaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm91cE5hbWUucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGl0ZW0ubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoaXMuY29sb3JTY2FsZShpdGVtLm5hbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQmFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTGluZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRYU2NhbGUoKTogYW55IHtcclxuXHJcbiAgICAgICAgbGV0IHNwYWNpbmc7XHJcbiAgICAgICAgbGV0IHJhbmdlO1xyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYmFyVHlwZT09J3ZlcnRpY2FsJykge1xyXG4gICAgICAgICAgICBzcGFjaW5nPSh0aGlzLmNhdGVnb3JpZXMubGVuZ3RoLyh0aGlzLm9wdGlvbnMucGxvdEJhY2tncm91bmQud2lkdGgvdGhpcy5vcHRpb25zLnBsb3RPcHRpb25zLmdyb3VwQmFyUGFkZGluZykpO1xyXG4gICAgICAgICAgICByYW5nZT1bMCwgdGhpcy5vcHRpb25zLnBsb3RCYWNrZ3JvdW5kLndpZHRoXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBsZW5ndGg9dGhpcy5vcHRpb25zLmhlaWdodC10aGlzLm9wdGlvbnMuaGVhZGVyLmhlaWdodDtcclxuICAgICAgICAgICAgc3BhY2luZz0odGhpcy5jYXRlZ29yaWVzLmxlbmd0aC8odGhpcy5vcHRpb25zLnBsb3RCYWNrZ3JvdW5kLmhlaWdodC90aGlzLm9wdGlvbnMucGxvdE9wdGlvbnMuZ3JvdXBCYXJQYWRkaW5nKSk7XHJcbiAgICAgICAgICAgIHJhbmdlPVswLCB0aGlzLm9wdGlvbnMucGxvdEJhY2tncm91bmQuaGVpZ2h0XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNjYWxlQmFuZCgpXHJcbiAgICAgICAgICAgIC5yYW5nZShyYW5nZSlcclxuICAgICAgICAgICAgLnBhZGRpbmdJbm5lcihzcGFjaW5nKVxyXG4gICAgICAgICAgICAucGFkZGluZ091dGVyKDAuMSlcclxuICAgICAgICAgICAgLmRvbWFpbih0aGlzLmNhdGVnb3JpZXMpO1xyXG4gICAgfVxyXG4gICAgZ2V0SW5uZXJTY2FsZSgpOiBhbnkge1xyXG5cclxuICAgICAgICBsZXQgZ3JvdXBEYXRhQXJyPVtdO1xyXG4gICAgICAgIGZvciAobGV0IGk9MDsgaTx0aGlzLnNlcmllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXJpZXNbaV0udHlwZT09XCJjb2x1bW5cIikge1xyXG4gICAgICAgICAgICAgICAgZ3JvdXBEYXRhQXJyLnB1c2godGhpcy5zZXJpZXNbaV0ubmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzcGFjaW5nO1xyXG4gICAgICAgIGxldCByYW5nZTsgXHJcbiAgICAgICAgbGV0IGxlbmd0aCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaT0wOyBpPHRoaXMuc2VyaWVzLmxlbmd0aDsgaSsrKSB7IFxyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXJpZXNbaV0udHlwZT09XCJjb2x1bW5cIikgeyBcclxuICAgICAgICAgICAgICAgIGxlbmd0aCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYmFyVHlwZT09J3ZlcnRpY2FsJykge1xyXG4gICAgICAgICAgICBzcGFjaW5nPShsZW5ndGgvKHRoaXMueFNjYWxlLmJhbmR3aWR0aCgpL3RoaXMub3B0aW9ucy5wbG90T3B0aW9ucy5pbm5lckJhclBhZGRpbmcpKTtcclxuICAgICAgICAgICAgcmFuZ2U9dGhpcy54U2NhbGUuYmFuZHdpZHRoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBzcGFjaW5nPShsZW5ndGgvKHRoaXMueVNjYWxlLmJhbmR3aWR0aCgpL3RoaXMub3B0aW9ucy5wbG90T3B0aW9ucy5pbm5lckJhclBhZGRpbmcpKTtcclxuICAgICAgICAgICAgcmFuZ2U9dGhpcy55U2NhbGUuYmFuZHdpZHRoKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc2NhbGVCYW5kKClcclxuICAgICAgICAgICAgLnJhbmdlKFswLCByYW5nZV0pXHJcbiAgICAgICAgICAgIC5wYWRkaW5nSW5uZXIoc3BhY2luZylcclxuICAgICAgICAgICAgLmRvbWFpbihncm91cERhdGFBcnIpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFlTY2FsZSgpOiBhbnkge1xyXG4gICAgICAgIGxldCB1bmlxdWVWYWx1ZTogYW55PW5ldyBTZXQoKTtcclxuICAgICAgICB0aGlzLnNlcmllcy5tYXAoKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgaXRlbS5kYXRhLm1hcCgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgIHVuaXF1ZVZhbHVlLmFkZCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgbWluPU1hdGgubWluKC4uLnVuaXF1ZVZhbHVlKTtcclxuICAgICAgICBtaW49bWluPjA/IDA6bWluO1xyXG5cclxuICAgICAgICBsZXQgbWF4PU1hdGgubWF4KDAsIC4uLnVuaXF1ZVZhbHVlKTtcclxuICAgICAgICBtYXg9bWF4PjA/IG1heDowO1xyXG5cclxuICAgICAgICBsZXQgcmFuZ2U9W107XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5iYXJUeXBlPT0ndmVydGljYWwnKSB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZT10aGlzLm9wdGlvbnMucGxvdEJhY2tncm91bmQuaGVpZ2h0O1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImJhciBnZXRZU2NhbGVcIix2YWx1ZSlcclxuICAgICAgICAgICAgcmFuZ2U9W3ZhbHVlLCAwXTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJiYXIgZ2V0WVNjYWxlIC0gXCIsIHJhbmdlKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlPXRoaXMub3B0aW9ucy5wbG90QmFja2dyb3VuZC53aWR0aC0zMDtcclxuICAgICAgICAgICAgcmFuZ2U9WzAsIHZhbHVlXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiYmFyIGdldFlTY2FsZSAtLS0gXCIsIHJhbmdlLCBtaW4sIG1heClcclxuXHJcbiAgICAgICAgcmV0dXJuIHNjYWxlTGluZWFyKClcclxuICAgICAgICAgICAgLnJhbmdlKHJhbmdlKVxyXG4gICAgICAgICAgICAuZG9tYWluKFttaW4sIG1heF0pO1xyXG4gICAgICAgIC8vcmV0dXJuIHRoaXMuc2NhbGUubmljZSgpLnRpY2tzKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGNhbFBsb3RCYWNrZ3JvdW5kKCkge1xyXG4gICAgICAgIHRoaXMub3B0aW9ucz17XHJcbiAgICAgICAgICAgIC4uLnRoaXMub3B0aW9ucyxcclxuICAgICAgICAgICAgcGxvdEJhY2tncm91bmQ6IHtcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMub3B0aW9ucy5wbG90QmFja2dyb3VuZCxcclxuICAgICAgICAgICAgICAgIHg6IDAsXHJcbiAgICAgICAgICAgICAgICB5OiAwLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLm9wdGlvbnMuaGVpZ2h0LXRoaXMub3B0aW9ucy54QXhpcy5oZWlnaHQtdGhpcy5vcHRpb25zLmhlYWRlci5oZWlnaHQtdGhpcy5vcHRpb25zLnBhZGRpbmcsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy5vcHRpb25zLndpZHRoLXRoaXMub3B0aW9ucy55QXhpcy53aWR0aC10aGlzLm9wdGlvbnMucGFkZGluZ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiY2FsUGxvdEJhY2tncm91bmRcIiwgSlNPTi5zdHJpbmdpZnkodGhpcy5vcHRpb25zKSk7XHJcbiAgICB9XHJcbiAgICBjcmVhdGVMaW5lKCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJ0aGlzLmlubmVyU2NhbGUuYmFuZHdpZHRoKCkgXCIrdGhpcy5pbm5lclNjYWxlLmJhbmR3aWR0aCgpKVxyXG4gICAgICAgIHRoaXMubGluZXM9W107XHJcbiAgICAgICAgdGhpcy5saW5lQ2lyY2xlPVtdO1xyXG4gICAgICAgIGZvciAobGV0IGk9MDsgaTx0aGlzLnNlcmllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXJpZXNbaV0udHlwZT09XCJsaW5lXCJ8fHRoaXMuc2VyaWVzW2ldLnR5cGU9PXVuZGVmaW5lZCkgeyBcclxuICAgICAgICAgICAgICAgIGxldCBsaW5lPXsgcG9pbnRzOiBcIlwiLCBjb2xvcjogXCJcIiB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqPTA7IGo8dGhpcy5jYXRlZ29yaWVzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHg9dGhpcy54U2NhbGUodGhpcy5jYXRlZ29yaWVzW2pdKSsodGhpcy54U2NhbGUuYmFuZHdpZHRoKCkvMikrdGhpcy5vcHRpb25zLnlBeGlzLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB5PXRoaXMueVNjYWxlKHRoaXMuc2VyaWVzW2ldLmRhdGFbal0pK3RoaXMub3B0aW9ucy5oZWFkZXIuaGVpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZS5wb2ludHMrPSh4K1wiLFwiK3krXCIgXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxpbmUuY29sb3I9dGhpcy5jb2xvclNjYWxlKHRoaXMuc2VyaWVzW2ldLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGluZUNpcmNsZS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoaXMuY29sb3JTY2FsZSh0aGlzLnNlcmllc1tpXS5uYW1lKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuY2F0ZWdvcmllc1tqXSwgIC8vamFuLGZlYlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLnNlcmllc1tpXS5kYXRhW2pdLCAvLzEwMSwyMDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IHRoaXMuc2VyaWVzW2ldLm5hbWVcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMubGluZXMucHVzaChsaW5lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNyZWF0ZUJhcigpIHtcclxuICAgICAgICB0aGlzLmJhcnM9W107XHJcbiAgICAgICAgdGhpcy5jYXRlZ29yaWVzLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaT0wOyBpPHRoaXMuc2VyaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXJpZXNbaV0udHlwZT09XCJjb2x1bW5cIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhcjogYW55PXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGl0ZW0sICAvL2phbixmZWJcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhpcy5zZXJpZXNbaV0uZGF0YVtpbmRleF0sIC8vMTAxLDIwMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cDogdGhpcy5zZXJpZXNbaV0ubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoaXMuY29sb3JTY2FsZSh0aGlzLnNlcmllc1tpXS5uYW1lKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHRoaXMuaW5uZXJTY2FsZS5iYW5kd2lkdGgoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLnNlcmllc1tpXS5kYXRhW2luZGV4XT4wPyAodGhpcy55U2NhbGUoMCktdGhpcy55U2NhbGUodGhpcy5zZXJpZXNbaV0uZGF0YVtpbmRleF0pKToodGhpcy55U2NhbGUodGhpcy5zZXJpZXNbaV0uZGF0YVtpbmRleF0pLXRoaXMueVNjYWxlKDApKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeDogdGhpcy5pbm5lclNjYWxlKHRoaXMuc2VyaWVzW2ldLm5hbWUpK3RoaXMueFNjYWxlKGl0ZW0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiB0aGlzLnNlcmllc1tpXS5kYXRhW2luZGV4XT4wPyB0aGlzLnlTY2FsZSh0aGlzLnNlcmllc1tpXS5kYXRhW2luZGV4XSk6dGhpcy55U2NhbGUoMCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ2ZXJ0aWNhbF9iYXJcIlxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXJzLnB1c2goYmFyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHlBeGlzV2lkdGhDaGFuZ2UoeyB5QXhpc1dpZHRoLCB5QXhpc0hlaWdodCB9KSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zPXtcclxuICAgICAgICAgICAgLi4udGhpcy5vcHRpb25zLFxyXG4gICAgICAgICAgICB5QXhpczoge1xyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5vcHRpb25zLnlBeGlzLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IHlBeGlzV2lkdGgsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IHlBeGlzSGVpZ2h0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKVxyXG4gICAgfVxyXG5cclxuICAgIHhBeGlzSGVpZ2h0Q2hhbmdlKHsgeEF4aXNIZWlnaHQgfSkge1xyXG4gICAgICAgIHRoaXMub3B0aW9ucz17XHJcbiAgICAgICAgICAgIC4uLnRoaXMub3B0aW9ucyxcclxuICAgICAgICAgICAgeEF4aXM6IHtcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMub3B0aW9ucy54QXhpcyxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogeEF4aXNIZWlnaHRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwieEF4aXNIZWlnaHRDaGFuZ2VcIiwgeEF4aXNIZWlnaHQsIEpTT04uc3RyaW5naWZ5KHRoaXMub3B0aW9ucy54QXhpcykpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlKClcclxuICAgIH1cclxuICAgIGhlYWRlckhlaWdodENoYW5nZSh7IGhlYWRlckhlaWdodCB9KSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zPXtcclxuICAgICAgICAgICAgLi4udGhpcy5vcHRpb25zLFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMub3B0aW9ucy5oZWFkZXIsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGhlYWRlckhlaWdodFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudXBkYXRlKClcclxuICAgIH1cclxuXHJcblxyXG4gICAgdG9vbFRpcFBsYWNjZW1lbnQoZGF0YSkge1xyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYmFyVHlwZT09J3ZlcnRpY2FsJykge1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0YT4wPyAndG9wJzonYm90dG9tJ1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGE+MD8gJ3JpZ2h0JzonbGVmdCdcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJywgWyckZXZlbnQnXSlcclxuICAgIG9uUmVzaXplKGV2ZW50KSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIndpbmRvdzpyZXNpemVcIilcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMudXBkYXRlKCkpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBzdHJUb051bWJlcihzdHIpIHtcclxuICAgICAgICBsZXQgbnVtYmVyUGF0dGVybj0vXFxkKy9nO1xyXG4gICAgICAgIGxldCBudW09c3RyLm1hdGNoKG51bWJlclBhdHRlcm4pLmpvaW4oJycpXHJcbiAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQobnVtKTtcclxuICAgIH1cclxufVxyXG4iXX0=