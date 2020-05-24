/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewEncapsulation, ElementRef, ChangeDetectorRef, HostListener } from "@angular/core";
import { scaleBand, scaleLinear } from "d3-scale";
import { ColorHelper } from '../utils/color.helper';
export class ngxChartsLineComponent {
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
                if (item.name)
                    this.groupName.push({
                        name: item.name,
                        color: this.colorScale(item.name)
                    });
            }));
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
    createLine() {
        //console.log("this.innerScale.bandwidth() "+this.innerScale.bandwidth())
        this.lines = [];
        this.lineCircle = [];
        for (let i = 0; i < this.series.length; i++) {
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
        // console.log(this.lineCircle);
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
ngxChartsLineComponent.decorators = [
    { type: Component, args: [{
                selector: "ngx-charts-line",
                template: "<div [style.width]=\"options.width+'px'\" [style.border]=\"'1px solid #f3f3f3'\">\r\n\r\n\r\n    <svg version=\"1.1\" class=\"highcharts-root\" [attr.padding]=\"options.padding\" [attr.width]=\"options.width\"\r\n        [attr.height]=\"options.height\" [attr.viewBox]=\"'0 0 '+options.width +' '+ options.height\"\r\n        aria-label=\"Interactive chart\" [style.border]=\"'0px solid gray'\" [style.padding]=\"options.padding\"\r\n        aria-hidden=\"false\">\r\n\r\n        <g header [options]=\"options\" (headerHeightChange)=\"headerHeightChange($event)\"></g>\r\n\r\n        <g y-axis \r\n            [xScale]=\"xScale\" \r\n            [yScale]=\"yScale\" \r\n            [options]=\"options\" \r\n            [categories]=\"categories\" \r\n            [series]=\"series\"\r\n            (yAxisWidthChange)=\"yAxisWidthChange($event)\"></g>\r\n\r\n        <g x-axis \r\n            [xScale]=\"xScale\" \r\n            [yScale]=\"yScale\" \r\n            [options]=\"options\" \r\n            [categories]=\"categories\" \r\n            [series]=\"series\"\r\n            (xAxisHeightChange)=\"xAxisHeightChange($event)\"></g>\r\n\r\n        <g data-z-index=\"0.1\">\r\n            <polyline  \r\n                class=\"line\"\r\n                *ngFor=\"let line of lines\" \r\n                [attr.points]=\"line.points\"\r\n                [style.fill]=\"'none'\"\r\n                [style.stroke]=\"line.color\"\r\n                [style.stroke-width]=\"3\" >\r\n            </polyline>\r\n            <circle \r\n                *ngFor=\"let lc of lineCircle\"\r\n                [tooltip]=\"lc.value+', '+lc.group+', '+lc.data\" \r\n                [placement]=\"toolTipPlaccement(lc.data)\" \r\n                [attr.cx]=\"lc.x\" \r\n                [attr.cy]=\"lc.y\" \r\n                [attr.r]=\"3\" \r\n                [attr.stroke]=\"lc.color\" \r\n                [attr.stroke-width]=\"3\" \r\n                [attr.fill]=\"lc.color\">\r\n            </circle>\r\n        </g>\r\n\r\n    </svg>\r\n    <chart-legend\r\n        *ngIf=\"groupName.length\"\r\n        [groupName]=\"groupName\"\r\n        [options]=\"options\"\r\n        [series] = \"series\"    \r\n    >\r\n    </chart-legend>\r\n  \r\n</div>\r\n\r\n",
                // changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".tooltip-example{text-align:center;padding:0 50px}.tooltip-example [tooltip]{display:inline-block;margin:50px 20px;width:180px;height:50px;border:1px solid gray;border-radius:5px;line-height:50px;text-align:center}.ng-tooltip{position:absolute;max-width:150px;font-size:14px;text-align:center;color:#fafae3;padding:3px 8px;background:#282a36;border-radius:4px;z-index:1000;opacity:0}.ng-tooltip:after{content:\"\";position:absolute;border-style:solid}.ng-tooltip-top:after{top:100%;left:50%;margin-left:-5px;border-width:5px;border-color:#000 transparent transparent}.ng-tooltip-bottom:after{bottom:100%;left:50%;margin-left:-5px;border-width:5px;border-color:transparent transparent #000}.ng-tooltip-left:after{top:50%;left:100%;margin-top:-5px;border-width:5px;border-color:transparent transparent transparent #000}.ng-tooltip-right:after{top:50%;right:100%;margin-top:-5px;border-width:5px;border-color:transparent #000 transparent transparent}.ng-tooltip-show{opacity:1}.line{stroke-dasharray:2000;stroke-dashoffset:2000;-webkit-animation:2s linear forwards line_frames;animation:2s linear forwards line_frames}@-webkit-keyframes line_frames{to{stroke-dashoffset:0}}@keyframes line_frames{to{stroke-dashoffset:0}}"]
            }] }
];
/** @nocollapse */
ngxChartsLineComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
ngxChartsLineComponent.propDecorators = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNoYXJ0cy1saW5lLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0dXNoYXJnaG9zaGJkL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvbmd4LWNoYXJ0cy1saW5lL25neC1jaGFydHMtbGluZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsS0FBSyxFQUNMLGlCQUFpQixFQUlqQixVQUFVLEVBQ1YsaUJBQWlCLEVBRWpCLFlBQVksRUFDZixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFXcEQsTUFBTSxPQUFPLHNCQUFzQjs7Ozs7SUFnSC9CLFlBQ1ksWUFBd0IsRUFDdkIsR0FBc0I7UUFEdkIsaUJBQVksR0FBWixZQUFZLENBQVk7UUFDdkIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFoSDNCLGtCQUFhLEdBQUM7WUFDbEIsT0FBTyxFQUFFLFVBQVU7WUFDbkIsS0FBSyxFQUFFLEVBQUU7WUFDVCxRQUFRLEVBQUUsRUFBRTtZQUNaLE1BQU0sRUFBRSxDQUFDO1lBQ1QsS0FBSyxFQUFFLENBQUM7WUFDUixPQUFPLEVBQUUsQ0FBQztZQUNWLEtBQUssRUFBRTtnQkFDSCxLQUFLLEVBQUUsRUFBRTtnQkFDVCxNQUFNLEVBQUUsQ0FBQztnQkFDVCxhQUFhLEVBQUUsQ0FBQztnQkFDaEIsVUFBVSxFQUFFLE1BQU07Z0JBQ2xCLGFBQWEsRUFBRSxLQUFLO2dCQUNwQixpQkFBaUIsRUFBQyxFQUFFO2FBQ3ZCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILEtBQUssRUFBRSxFQUFFO2dCQUNULEtBQUssRUFBRSxDQUFDO2dCQUNSLE1BQU0sRUFBQyxDQUFDO2dCQUNSLGFBQWEsRUFBRSxDQUFDO2dCQUNoQixhQUFhLEVBQUUsS0FB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XG4gICAgQ29tcG9uZW50LFxyXG4gICAgSW5wdXQsXHJcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcclxuICAgIE9uQ2hhbmdlcyxcclxuICAgIE9uSW5pdCxcclxuICAgIFNpbXBsZUNoYW5nZXMsXHJcbiAgICBFbGVtZW50UmVmLFxyXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICAgIEhvc3RMaXN0ZW5lclxyXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcblxyXG5pbXBvcnQgeyBzY2FsZUJhbmQsIHNjYWxlTGluZWFyIH0gZnJvbSBcImQzLXNjYWxlXCI7XHJcbmltcG9ydCB7IENvbG9ySGVscGVyIH0gZnJvbSAnLi4vdXRpbHMvY29sb3IuaGVscGVyJztcclxuaW1wb3J0IHsgQ2xhc3NHZXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb21waWxlci9zcmMvb3V0cHV0L291dHB1dF9hc3QnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJuZ3gtY2hhcnRzLWxpbmVcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbmd4LWNoYXJ0cy1saW5lLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi4vbmd4LWNoYXJ0cy1saW5lLmNvbXBvbmVudC5jc3NcIl0sXHJcbiAgICAvLyBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcclxufSlcclxuICAgIFxyXG5leHBvcnQgY2xhc3Mgbmd4Q2hhcnRzTGluZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0IHtcclxuXHJcbiAgICBwcml2YXRlIGN1c3RvbU9wdGlvbnM9e1xyXG4gICAgICAgIGJhclR5cGU6ICd2ZXJ0aWNhbCcsXHJcbiAgICAgICAgdGl0bGU6ICcnLFxyXG4gICAgICAgIHN1YnRpdGxlOiAnJyxcclxuICAgICAgICBoZWlnaHQ6IDAsXHJcbiAgICAgICAgd2lkdGg6IDAsXHJcbiAgICAgICAgcGFkZGluZzogNSxcclxuICAgICAgICB4QXhpczoge1xyXG4gICAgICAgICAgICB0aXRsZTogJycsXHJcbiAgICAgICAgICAgIGhlaWdodDogMCxcclxuICAgICAgICAgICAgbGFiZWxSb3RhdGlvbjogMCxcclxuICAgICAgICAgICAgbGFiZWxBbGlnbjogJ2xlZnQnLFxyXG4gICAgICAgICAgICBsYWJlbEVsbGlwc2lzOiBmYWxzZSxcclxuICAgICAgICAgICAgbGFiZWxFbGxpcHNpc1NpemU6MTZcclxuICAgICAgICB9LFxyXG4gICAgICAgIHlBeGlzOiB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnJyxcclxuICAgICAgICAgICAgd2lkdGg6IDAsXHJcbiAgICAgICAgICAgIGhlaWdodDowLFxyXG4gICAgICAgICAgICBsYWJlbFJvdGF0aW9uOiAwLFxyXG4gICAgICAgICAgICBsYWJlbEVsbGlwc2lzOiBmYWxzZSxcclxuICAgICAgICAgICAgbGFiZWxFbGxpcHNpc1NpemU6MTZcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxlZ2VuZDoge1xyXG4gICAgICAgICAgICBsYWJlbEVsbGlwc2lzOiBmYWxzZSxcclxuICAgICAgICAgICAgbGFiZWxFbGxpcHNpc1NpemU6MTZcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBsb3RCYWNrZ3JvdW5kOiB7XHJcbiAgICAgICAgICAgIHg6IDAsXHJcbiAgICAgICAgICAgIHk6IDAsXHJcbiAgICAgICAgICAgIGhlaWdodDogMCxcclxuICAgICAgICAgICAgd2lkdGg6IDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBsb3RPcHRpb25zOiB7IFxyXG4gICAgICAgICAgICBncm91cEJhclBhZGRpbmcgOjIwLFxyXG4gICAgICAgICAgICBpbm5lckJhclBhZGRpbmcgOjNcclxuICAgICAgICB9LFxyXG4gICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICBoZWlnaHQ6IDAsXHJcbiAgICAgICAgICAgIHdpZHRoOiAwXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIF9vcHRpb25zOiBhbnk9e307XHJcblxyXG4gICAgQElucHV0KCkgc2V0IG9wdGlvbnMob2JqOiBhbnkpIHtcclxuICAgICAgICBsZXQgeEF4aXM9b2JqLnhBeGlzO1xyXG4gICAgICAgIGxldCB5QXhpcz1vYmoueUF4aXM7XHJcbiAgICAgICAgbGV0IGxlZ2VuZD1vYmoubGVnZW5kO1xyXG4gICAgICAgIGxldCBwbG90QmFja2dyb3VuZD1vYmoucGxvdEJhY2tncm91bmQ7XHJcbiAgICAgICAgbGV0IHBsb3RPcHRpb25zPW9iai5wbG90T3B0aW9ucztcclxuICAgICAgICBsZXQgaGVhZGVyPW9iai5oZWFkZXI7XHJcblxyXG4gICAgICAgIGRlbGV0ZSBvYmpbJ3hBeGlzJ107XHJcbiAgICAgICAgZGVsZXRlIG9ialsneUF4aXMnXTtcclxuICAgICAgICBkZWxldGUgb2JqWydsZWdlbmQnXTtcclxuICAgICAgICBkZWxldGUgb2JqWydwbG90QmFja2dyb3VuZCddO1xyXG4gICAgICAgIGRlbGV0ZSBvYmpbJ3Bsb3RPcHRpb25zJ107XHJcbiAgICAgICAgZGVsZXRlIG9ialsnaGVhZGVyJ107XHJcblxyXG4gICAgICAgIHRoaXMuX29wdGlvbnM9e1xyXG4gICAgICAgICAgICAuLi50aGlzLmN1c3RvbU9wdGlvbnMsXHJcbiAgICAgICAgICAgIC4uLm9iaixcclxuICAgICAgICAgICAgeEF4aXM6IHtcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMuY3VzdG9tT3B0aW9ucy54QXhpcyxcclxuICAgICAgICAgICAgICAgIC4uLnhBeGlzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHlBeGlzOiB7XHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLmN1c3RvbU9wdGlvbnMueUF4aXMsXHJcbiAgICAgICAgICAgICAgICAuLi55QXhpc1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBsZWdlbmQ6eyBcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMuY3VzdG9tT3B0aW9ucy5sZWdlbmQsXHJcbiAgICAgICAgICAgICAgICAuLi5sZWdlbmRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcGxvdEJhY2tncm91bmQ6IHtcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMuY3VzdG9tT3B0aW9ucy5wbG90QmFja2dyb3VuZCxcclxuICAgICAgICAgICAgICAgIC4uLnBsb3RCYWNrZ3JvdW5kXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHBsb3RPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLmN1c3RvbU9wdGlvbnMucGxvdE9wdGlvbnMsXHJcbiAgICAgICAgICAgICAgICAuLi5wbG90T3B0aW9uc1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMuY3VzdG9tT3B0aW9ucy5oZWFkZXIsXHJcbiAgICAgICAgICAgICAgICAuLi5oZWFkZXJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fb3B0aW9uc1snYmFyVHlwZSddPSd2ZXJ0aWNhbCc7XHJcbiAgICB9XHJcbiAgICBnZXQgb3B0aW9ucygpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9vcHRpb25zO1xyXG4gICAgfVxyXG4gICAgQElucHV0KCkgY2F0ZWdvcmllczogYW55PVtdO1xyXG4gICAgQElucHV0KCkgc2VyaWVzOiBhbnk9W107XHJcblxyXG4gICAgLy9ASW5wdXQoKSBncm91cEJhclBhZGRpbmc9MjA7XHJcbiAgICAvL0BJbnB1dCgpIGlubmVyQmFyUGFkZGluZz0zO1xyXG5cclxuICAgIC8vIHNjYWxlOiBhbnk7XHJcbiAgICB4U2NhbGU6IGFueTtcclxuICAgIGlubmVyU2NhbGU6IGFueTtcclxuICAgIHlTY2FsZTogYW55O1xyXG4gICAgbGluZXM6IGFueT1bXTtcclxuICAgIGxpbmVDaXJjbGU6IGFueSA9IFtdO1xyXG4gICAgZ3JvdXBOYW1lOiBhbnlbXSA9IFtdO1xyXG4gICAgZ3JvdXBCYXJQYWRkaW5nQks6IGFueTtcclxuICAgIGlubmVyQmFyUGFkZGluZ0JLOiBhbnk7XHJcbiAgICBjb2xvclNjYWxlOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBjaGFydEVsZW1lbnQ6IEVsZW1lbnRSZWYsXHJcbiAgICAgICAgcHJpdmF0ZSAgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikgeyB9XHJcblxyXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZ3JvdXBCYXJQYWRkaW5nQks9dGhpcy5vcHRpb25zLnBsb3RPcHRpb25zLmdyb3VwQmFyUGFkZGluZztcclxuICAgICAgICB0aGlzLmlubmVyQmFyUGFkZGluZ0JLPXRoaXMub3B0aW9ucy5wbG90T3B0aW9ucy5pbm5lckJhclBhZGRpbmc7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnVwZGF0ZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnMud2lkdGg9dGhpcy5vcHRpb25zLndpZHRoO1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy5oZWlnaHQ9dGhpcy5vcHRpb25zLmhlaWdodDtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInR0dHR0dHRcIix0aGlzLm9wdGlvbnMpXHJcbiAgICAgICAgY29uc3QgaG9zdEVsZW09dGhpcy5jaGFydEVsZW1lbnQubmF0aXZlRWxlbWVudDtcclxuICAgICAgICBsZXQgZGltcz1ob3N0RWxlbS5wYXJlbnROb2RlIT09bnVsbD8gaG9zdEVsZW0ucGFyZW50Tm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTp7aGVpZ2h0OjQwMCwgd2lkdGg6ODAwfTtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgc3R5bGU9aG9zdEVsZW0ucGFyZW50Tm9kZS5jdXJyZW50U3R5bGV8fHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGhvc3RFbGVtLnBhcmVudE5vZGUpO1xyXG4gICAgICAgXHJcbiAgICAgICAgdGhpcy5vcHRpb25zLmhlaWdodCA9ICF0aGlzLm9wdGlvbnMuaGVpZ2h0PyBkaW1zLmhlaWdodCAtIHRoaXMuc3RyVG9OdW1iZXIoc3R5bGUucGFkZGluZ0xlZnQpIC0gdGhpcy5zdHJUb051bWJlcihzdHlsZS5wYWRkaW5nUmlnaHQpICA6dGhpcy5vcHRpb25zLmhlaWdodDtcclxuICAgICAgICB0aGlzLm9wdGlvbnMud2lkdGggPSAhdGhpcy5vcHRpb25zLndpZHRoID8gZGltcy53aWR0aC0gdGhpcy5zdHJUb051bWJlcihzdHlsZS5wYWRkaW5nTGVmdCkgLSB0aGlzLnN0clRvTnVtYmVyKHN0eWxlLnBhZGRpbmdSaWdodCkgICA6IGRpbXMud2lkdGgtIHRoaXMuc3RyVG9OdW1iZXIoc3R5bGUucGFkZGluZ0xlZnQpIC0gdGhpcy5zdHJUb051bWJlcihzdHlsZS5wYWRkaW5nUmlnaHQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuY2FsUGxvdEJhY2tncm91bmQoKVxyXG5cclxuICAgICAgICBsZXQgY291bnRGbGFnPWZhbHNlO1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy5wbG90T3B0aW9ucy5ncm91cEJhclBhZGRpbmc9dGhpcy5ncm91cEJhclBhZGRpbmdCSztcclxuICAgICAgICB0aGlzLm9wdGlvbnMucGxvdE9wdGlvbnMuaW5uZXJCYXJQYWRkaW5nPXRoaXMuaW5uZXJCYXJQYWRkaW5nQks7XHJcbiAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICBpZiAoY291bnRGbGFnPT10cnVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMucGxvdE9wdGlvbnMuZ3JvdXBCYXJQYWRkaW5nLS07XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMucGxvdE9wdGlvbnMuaW5uZXJCYXJQYWRkaW5nID0gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmJhclR5cGU9PSd2ZXJ0aWNhbCcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMueFNjYWxlPXRoaXMuZ2V0WFNjYWxlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7IFxyXG4gICAgICAgICAgICAgICAgdGhpcy55U2NhbGU9dGhpcy5nZXRYU2NhbGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlubmVyU2NhbGU9dGhpcy5nZXRJbm5lclNjYWxlKCk7XHJcbiAgICAgICAgICAgIGNvdW50RmxhZz10cnVlO1xyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgfSB3aGlsZSAodGhpcy5pbm5lclNjYWxlLmJhbmR3aWR0aCgpPDIpO1xyXG4gICAgICAgIC8vIFxyXG5cclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmJhclR5cGU9PSd2ZXJ0aWNhbCcpIHtcclxuICAgICAgICAgICAgdGhpcy55U2NhbGU9dGhpcy5nZXRZU2NhbGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7IFxyXG4gICAgICAgICAgICB0aGlzLnhTY2FsZT10aGlzLmdldFlTY2FsZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBsZXQgY29sb3JIZWxwZXI9bmV3IENvbG9ySGVscGVyKHRoaXMub3B0aW9ucywgdGhpcy5zZXJpZXMpO1xyXG4gICAgICAgIHRoaXMuY29sb3JTY2FsZT1jb2xvckhlbHBlci5nZW5lcmF0ZUNvbG9yU2NhbGUoKTtcclxuICAgICAgICBcclxuICAgICAgICBcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBOYW1lPVtdO1xyXG4gICAgICAgICAgICB0aGlzLnNlcmllcy5tYXAoaXRlbSA9PiB7IFxyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0ubmFtZSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyb3VwTmFtZS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogaXRlbS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhpcy5jb2xvclNjYWxlKGl0ZW0ubmFtZSlcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVMaW5lKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFhTY2FsZSgpOiBhbnkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBzcGFjaW5nO1xyXG4gICAgICAgIGxldCByYW5nZTtcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmJhclR5cGU9PSd2ZXJ0aWNhbCcpIHtcclxuICAgICAgICAgICAgc3BhY2luZz0odGhpcy5jYXRlZ29yaWVzLmxlbmd0aC8odGhpcy5vcHRpb25zLnBsb3RCYWNrZ3JvdW5kLndpZHRoL3RoaXMub3B0aW9ucy5wbG90T3B0aW9ucy5ncm91cEJhclBhZGRpbmcpKTtcclxuICAgICAgICAgICAgcmFuZ2U9IFswLCB0aGlzLm9wdGlvbnMucGxvdEJhY2tncm91bmQud2lkdGhdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHsgXHJcbiAgICAgICAgICAgIGxldCBsZW5ndGg9dGhpcy5vcHRpb25zLmhlaWdodC10aGlzLm9wdGlvbnMuaGVhZGVyLmhlaWdodDtcclxuICAgICAgICAgICAgc3BhY2luZz0odGhpcy5jYXRlZ29yaWVzLmxlbmd0aC8odGhpcy5vcHRpb25zLnBsb3RCYWNrZ3JvdW5kLmhlaWdodC90aGlzLm9wdGlvbnMucGxvdE9wdGlvbnMuZ3JvdXBCYXJQYWRkaW5nKSk7XHJcbiAgICAgICAgICAgIHJhbmdlPVswLCB0aGlzLm9wdGlvbnMucGxvdEJhY2tncm91bmQuaGVpZ2h0XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNjYWxlQmFuZCgpXHJcbiAgICAgICAgICAgIC5yYW5nZShyYW5nZSlcclxuICAgICAgICAgICAgLnBhZGRpbmdJbm5lcihzcGFjaW5nKVxyXG4gICAgICAgICAgICAucGFkZGluZ091dGVyKDAuMSlcclxuICAgICAgICAgICAgLmRvbWFpbih0aGlzLmNhdGVnb3JpZXMpO1xyXG4gICAgfVxyXG4gICAgZ2V0SW5uZXJTY2FsZSgpOiBhbnkge1xyXG5cclxuICAgICAgICBsZXQgZ3JvdXBEYXRhQXJyPVtdO1xyXG4gICAgICAgIGZvciAobGV0IGk9MDsgaTx0aGlzLnNlcmllcy5sZW5ndGg7IGkrKykgeyBcclxuICAgICAgICAgICAgZ3JvdXBEYXRhQXJyLnB1c2godGhpcy5zZXJpZXNbaV0ubmFtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc3BhY2luZztcclxuICAgICAgICBsZXQgcmFuZ2U7XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5iYXJUeXBlPT0ndmVydGljYWwnKSB7XHJcbiAgICAgICAgICAgIHNwYWNpbmc9KHRoaXMuc2VyaWVzLmxlbmd0aC8odGhpcy54U2NhbGUuYmFuZHdpZHRoKCkvdGhpcy5vcHRpb25zLnBsb3RPcHRpb25zLmlubmVyQmFyUGFkZGluZykpO1xyXG4gICAgICAgICAgICByYW5nZT10aGlzLnhTY2FsZS5iYW5kd2lkdGgoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7IFxyXG4gICAgICAgICAgICBzcGFjaW5nPSh0aGlzLnNlcmllcy5sZW5ndGgvKHRoaXMueVNjYWxlLmJhbmR3aWR0aCgpL3RoaXMub3B0aW9ucy5wbG90T3B0aW9ucy5pbm5lckJhclBhZGRpbmcpKTtcclxuICAgICAgICAgICAgcmFuZ2U9dGhpcy55U2NhbGUuYmFuZHdpZHRoKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc2NhbGVCYW5kKClcclxuICAgICAgICAgICAgLnJhbmdlKFswLCByYW5nZV0pXHJcbiAgICAgICAgICAgIC5wYWRkaW5nSW5uZXIoc3BhY2luZylcclxuICAgICAgICAgICAgLmRvbWFpbihncm91cERhdGFBcnIpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXRZU2NhbGUoKTogYW55IHtcclxuICAgICAgICBsZXQgdW5pcXVlVmFsdWU6IGFueT1uZXcgU2V0KCk7XHJcbiAgICAgICAgdGhpcy5zZXJpZXMubWFwKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGl0ZW0uZGF0YS5tYXAoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB1bmlxdWVWYWx1ZS5hZGQodmFsdWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IG1pbj1NYXRoLm1pbiguLi51bmlxdWVWYWx1ZSk7XHJcbiAgICAgICAgbWluPW1pbj4wPyAwOm1pbjtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgbWF4PU1hdGgubWF4KDAsIC4uLnVuaXF1ZVZhbHVlKTtcclxuICAgICAgICBtYXg9bWF4PjA/IG1heDowO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCByYW5nZSA9IFtdO1xyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYmFyVHlwZT09J3ZlcnRpY2FsJykge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWU9dGhpcy5vcHRpb25zLnBsb3RCYWNrZ3JvdW5kLmhlaWdodDtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJiYXIgZ2V0WVNjYWxlXCIsdmFsdWUpXHJcbiAgICAgICAgICAgIHJhbmdlPVt2YWx1ZSwgMF07XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiYmFyIGdldFlTY2FsZSAtIFwiLCByYW5nZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7IFxyXG4gICAgICAgICAgICBsZXQgdmFsdWU9dGhpcy5vcHRpb25zLnBsb3RCYWNrZ3JvdW5kLndpZHRoLTMwO1xyXG4gICAgICAgICAgICByYW5nZT1bMCwgdmFsdWVdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJiYXIgZ2V0WVNjYWxlIC0tLSBcIiwgcmFuZ2UsIG1pbiwgbWF4KVxyXG5cclxuICAgICAgICByZXR1cm4gc2NhbGVMaW5lYXIoKVxyXG4gICAgICAgICAgICAucmFuZ2UocmFuZ2UpXHJcbiAgICAgICAgICAgIC5kb21haW4oW21pbiwgbWF4XSk7XHJcbiAgICAgICAgLy9yZXR1cm4gdGhpcy5zY2FsZS5uaWNlKCkudGlja3MoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgY2FsUGxvdEJhY2tncm91bmQoKSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zPXtcclxuICAgICAgICAgICAgLi4udGhpcy5vcHRpb25zLFxyXG4gICAgICAgICAgICBwbG90QmFja2dyb3VuZDoge1xyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5vcHRpb25zLnBsb3RCYWNrZ3JvdW5kLFxyXG4gICAgICAgICAgICAgICAgeDogMCxcclxuICAgICAgICAgICAgICAgIHk6IDAsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6dGhpcy5vcHRpb25zLmhlaWdodC10aGlzLm9wdGlvbnMueEF4aXMuaGVpZ2h0LXRoaXMub3B0aW9ucy5oZWFkZXIuaGVpZ2h0LXRoaXMub3B0aW9ucy5wYWRkaW5nLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IHRoaXMub3B0aW9ucy53aWR0aC10aGlzLm9wdGlvbnMueUF4aXMud2lkdGgtdGhpcy5vcHRpb25zLnBhZGRpbmdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImNhbFBsb3RCYWNrZ3JvdW5kXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMub3B0aW9ucykpO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlTGluZSgpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwidGhpcy5pbm5lclNjYWxlLmJhbmR3aWR0aCgpIFwiK3RoaXMuaW5uZXJTY2FsZS5iYW5kd2lkdGgoKSlcclxuICAgICAgICB0aGlzLmxpbmVzPVtdO1xyXG4gICAgICAgIHRoaXMubGluZUNpcmNsZT1bXTtcclxuICAgICAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy5zZXJpZXMubGVuZ3RoOyBpKyspIHsgXHJcbiAgICAgICAgICAgIGxldCBsaW5lPXtwb2ludHM6XCJcIiwgY29sb3I6XCJcIn1cclxuICAgICAgICAgICAgZm9yIChsZXQgaj0wOyBqPHRoaXMuY2F0ZWdvcmllcy5sZW5ndGg7IGorKykgeyBcclxuICAgICAgICAgICAgICAgIGxldCB4PXRoaXMueFNjYWxlKHRoaXMuY2F0ZWdvcmllc1tqXSkrKHRoaXMueFNjYWxlLmJhbmR3aWR0aCgpLzIpK3RoaXMub3B0aW9ucy55QXhpcy53aWR0aDtcclxuICAgICAgICAgICAgICAgIGxldCB5ID0gdGhpcy55U2NhbGUodGhpcy5zZXJpZXNbaV0uZGF0YVtqXSkrdGhpcy5vcHRpb25zLmhlYWRlci5oZWlnaHRcclxuICAgICAgICAgICAgICAgIGxpbmUucG9pbnRzKz0oeCArXCIsXCIreStcIiBcIik7XHJcbiAgICAgICAgICAgICAgICBsaW5lLmNvbG9yPXRoaXMuY29sb3JTY2FsZSh0aGlzLnNlcmllc1tpXS5uYW1lKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubGluZUNpcmNsZS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICB4LFxyXG4gICAgICAgICAgICAgICAgICAgIHksXHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoaXMuY29sb3JTY2FsZSh0aGlzLnNlcmllc1tpXS5uYW1lKSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5jYXRlZ29yaWVzW2pdLCAgLy9qYW4sZmViXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhpcy5zZXJpZXNbaV0uZGF0YVtqXSwgLy8xMDEsMjAyXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IHRoaXMuc2VyaWVzW2ldLm5hbWVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubGluZXMucHVzaChsaW5lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMubGluZUNpcmNsZSk7XHJcbiAgICAgICBcclxuICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHlBeGlzV2lkdGhDaGFuZ2UoeyB5QXhpc1dpZHRoLHlBeGlzSGVpZ2h0IH0pIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwieUF4aXNXaWR0aCBcIit5QXhpc1dpZHRoKVxyXG4gICAgICAgIHRoaXMub3B0aW9ucz17XHJcbiAgICAgICAgICAgIC4uLnRoaXMub3B0aW9ucyxcclxuICAgICAgICAgICAgeUF4aXM6IHtcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMub3B0aW9ucy55QXhpcyxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiB5QXhpc1dpZHRoLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiB5QXhpc0hlaWdodFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY29uc29sZS5sb2coIHRoaXMub3B0aW9ucylcclxuICAgICAgICB0aGlzLnVwZGF0ZSgpXHJcbiAgICB9XHJcblxyXG4gICAgeEF4aXNIZWlnaHRDaGFuZ2UoeyB4QXhpc0hlaWdodCB9KSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zPXtcclxuICAgICAgICAgICAgLi4udGhpcy5vcHRpb25zLFxyXG4gICAgICAgICAgICB4QXhpczoge1xyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5vcHRpb25zLnhBeGlzLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiB4QXhpc0hlaWdodFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJ4QXhpc0hlaWdodENoYW5nZVwiLCB4QXhpc0hlaWdodCwgSlNPTi5zdHJpbmdpZnkodGhpcy5vcHRpb25zLnhBeGlzKSk7XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKVxyXG4gICAgfVxyXG4gICAgaGVhZGVySGVpZ2h0Q2hhbmdlKHsgaGVhZGVySGVpZ2h0IH0pIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnM9e1xyXG4gICAgICAgICAgICAuLi50aGlzLm9wdGlvbnMsXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5vcHRpb25zLmhlYWRlcixcclxuICAgICAgICAgICAgICAgIGhlaWdodDogaGVhZGVySGVpZ2h0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICB0b29sVGlwUGxhY2NlbWVudChkYXRhKSB7IFxyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYmFyVHlwZT09J3ZlcnRpY2FsJykge1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0YT4wPyAndG9wJzonYm90dG9tJ1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHsgXHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhPjA/ICdyaWdodCc6J2xlZnQnXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScsIFsnJGV2ZW50J10pXHJcbiAgICBvblJlc2l6ZShldmVudCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJ3aW5kb3c6cmVzaXplXCIpXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnVwZGF0ZSgpKTtcclxuICAgIH1cclxuXHJcbiAgIFxyXG4gICAgXHJcbiAgICBcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBzdHJUb051bWJlcihzdHIpIHsgXHJcbiAgICAgICAgbGV0IG51bWJlclBhdHRlcm49L1xcZCsvZztcclxuICAgICAgICBsZXQgbnVtPXN0ci5tYXRjaChudW1iZXJQYXR0ZXJuKS5qb2luKCcnKVxyXG4gICAgICAgIHJldHVybiBwYXJzZUZsb2F0KG51bSk7XHJcbiAgICB9XHJcbn1cclxuIl19