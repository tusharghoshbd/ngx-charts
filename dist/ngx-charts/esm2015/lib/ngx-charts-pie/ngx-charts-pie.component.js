/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewEncapsulation, ElementRef, ChangeDetectorRef, HostListener } from "@angular/core";
import { ColorHelper } from '../utils/color.helper';
import { trimLabel } from '../utils/trim-label.helper';
import { arc, pie } from 'd3-shape';
export class ngxChartsPieComponent {
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
            plotBackground: {
                x: 0,
                y: 0,
                height: 0,
                width: 0
            },
            legend: {
                labelEllipsis: false,
                labelEllipsisSize: 16
            },
            plotOptions: {
                outerRadius: 80,
                innerRadius: 0,
                labelEllipsis: false,
                labelEllipsisSize: 16
            },
            header: {
                height: 0,
                width: 0
            }
        };
        this._options = {};
        this.categories = [];
        this.series = [];
        this.pies = [];
        this.lineCircle = [];
        this.groupName = [];
        this.translation = "";
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
        // this.groupBarPaddingBK=this.options.plotOptions.groupBarPadding;
        // this.innerBarPaddingBK=this.options.plotOptions.innerBarPadding;
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
        const xOffset = this.options.width / 2;
        /** @type {?} */
        const yOffset = this.options.header.height + (this.options.plotBackground.height / 2);
        this.translation = `translate(${xOffset}, ${yOffset})`;
        this.calcArc = this.calculateArc();
        this.pieGenerator = this.pieGeneratorFunc();
        // console.log(this.pieGenerator)
        // let countFlag=false;
        // this.options.plotOptions.groupBarPadding=this.groupBarPaddingBK;
        // this.options.plotOptions.innerBarPadding=this.innerBarPaddingBK;
        // do {
        //     if (countFlag==true) {
        //         this.options.plotOptions.groupBarPadding--;
        //         this.options.plotOptions.innerBarPadding = 2;
        //     }
        //     if (this.options.barType=='vertical') {
        //         this.xScale=this.getXScale();
        //     }
        //     else { 
        //         this.yScale=this.getXScale();
        //     }
        //     this.innerScale=this.getInnerScale();
        //     countFlag=true;
        // } while (this.innerScale.bandwidth()<2);
        // 
        // if (this.options.barType=='vertical') {
        //     this.yScale=this.getYScale();
        // }
        // else { 
        //     this.xScale=this.getYScale();
        // }
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
            this.createPie();
        }));
        this.cdr.detectChanges();
    }
    /**
     * @return {?}
     */
    pieGeneratorFunc() {
        return pie()
            .value((/**
         * @param {?} d
         * @return {?}
         */
        d => d.data))
            .sort(null)(this.series);
    }
    /**
     * @return {?}
     */
    calculateArc() {
        /** @type {?} */
        let outerRadius = this.options.plotOptions.outerRadius;
        /** @type {?} */
        let innerRadius = this.options.plotOptions.innerRadius;
        /** @type {?} */
        let cornerRadius = 0;
        return arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
            .cornerRadius(cornerRadius);
    }
    /**
     * @return {?}
     */
    outerArc() {
        /** @type {?} */
        const factor = 1.2;
        /** @type {?} */
        let outerRadius = this.options.plotOptions.outerRadius;
        return arc()
            .innerRadius(outerRadius * factor)
            .outerRadius(outerRadius * factor);
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
    createPie() {
        //console.log("this.innerScale.bandwidth() "+this.innerScale.bandwidth())
        this.pies = [];
        for (let i = 0; i < this.pieGenerator.length; i++) {
            /** @type {?} */
            let factor = 1.2;
            /** @type {?} */
            let tempObj = {
                path: this.calcArc.startAngle(this.pieGenerator[i].startAngle).endAngle(this.pieGenerator[i].endAngle)(),
                color: this.colorScale(this.pieGenerator[i].data.name),
                data: this.pieGenerator[i].data,
                pos: this.outerArc().centroid(this.pieGenerator[i]),
                labelPath: "",
                textAnchor: this.midAngle(this.pieGenerator[i]) < Math.PI ? 'start' : 'end'
            };
            tempObj["pos"][0] = factor * this.options.plotOptions.outerRadius * (this.midAngle(this.pieGenerator[i]) < Math.PI ? 1 : -1);
            //create a line path
            /** @type {?} */
            const innerPos = this.calcArc.centroid(this.pieGenerator[i]);
            /** @type {?} */
            let scale = tempObj["pos"][1] / innerPos[1];
            if (tempObj["pos"][1] === 0 || innerPos[1] === 0) {
                scale = 1;
            }
            /** @type {?} */
            const outerPos = [scale * innerPos[0], scale * innerPos[1]];
            tempObj.labelPath = `M${innerPos}L${outerPos}L${tempObj["pos"]}`;
            this.pies.push(tempObj);
        }
        // console.log("all pies : ", this.pies);
    }
    /**
     * @param {?} d
     * @return {?}
     */
    midAngle(d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
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
ngxChartsPieComponent.decorators = [
    { type: Component, args: [{
                selector: "ngx-charts-pie",
                template: "<div [style.width]=\"options.width+'px'\" [style.border]=\"'1px solid #f3f3f3'\">\r\n\r\n    <svg version=\"1.1\" class=\"highcharts-root\" [attr.padding]=\"options.padding\" [attr.width]=\"options.width\"\r\n        [attr.height]=\"options.height\" [attr.viewBox]=\"'0 0 '+options.width +' '+ options.height\"\r\n        aria-label=\"Interactive chart\" [style.border]=\"'0px solid gray'\" [style.padding]=\"options.padding\"\r\n        aria-hidden=\"false\"  >\r\n\r\n        <g header [options]=\"options\" (headerHeightChange)=\"headerHeightChange($event)\"></g>\r\n        <g  \r\n            [attr.transform]=\"translation\" \r\n            *ngFor=\"let pie of pies\" >\r\n            <path  \r\n                class=\"pieSlice\"\r\n                [attr.d]=\"pie.path\"\r\n                [style.fill]=\"pie.color\"\r\n                [tooltip]=\"pie.data.name+', '+pie.data.data\" \r\n                [placement]=\"toolTipPlaccement(pie.data.data)\" \r\n            ></path>\r\n\r\n            <!--label path  -->\r\n            <path  \r\n                class=\"pie\"\r\n                [attr.d]=\"pie.labelPath\"\r\n                [style.stroke]=\"pie.color\"\r\n                fill=\"none\"\r\n            ></path>\r\n\r\n            <text\r\n                [attr.x]=\"pie.pos[0]\" \r\n                [attr.y]=\"pie.pos[1]\"\r\n                [style.textAnchor]=\"pie.textAnchor\"\r\n                [style.shapeRendering]=\"'crispEdges'\"\r\n            >\r\n                {{   options.plotOptions.labelEllipsis ? trimLabel(pie.data.name, options.plotOptions.labelEllipsisSize) :  pie.data.name}}\r\n            </text>\r\n\r\n        </g>\r\n    </svg>\r\n    <chart-legend\r\n        *ngIf=\"groupName.length\"\r\n        [groupName]=\"groupName\"\r\n        [options]=\"options\"\r\n        [series] = \"series\"    \r\n    >\r\n    </chart-legend>\r\n  \r\n</div>\r\n\r\n",
                // changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".tooltip-example{text-align:center;padding:0 50px}.tooltip-example [tooltip]{display:inline-block;margin:50px 20px;width:180px;height:50px;border:1px solid gray;border-radius:5px;line-height:50px;text-align:center}.ng-tooltip{position:absolute;max-width:150px;font-size:14px;text-align:center;color:#fafae3;padding:3px 8px;background:#282a36;border-radius:4px;z-index:1000;opacity:0}.ng-tooltip:after{content:\"\";position:absolute;border-style:solid}.ng-tooltip-top:after{top:100%;left:50%;margin-left:-5px;border-width:5px;border-color:#000 transparent transparent}.ng-tooltip-bottom:after{bottom:100%;left:50%;margin-left:-5px;border-width:5px;border-color:transparent transparent #000}.ng-tooltip-left:after{top:50%;left:100%;margin-top:-5px;border-width:5px;border-color:transparent transparent transparent #000}.ng-tooltip-right:after{top:50%;right:100%;margin-top:-5px;border-width:5px;border-color:transparent #000 transparent transparent}.ng-tooltip-show{opacity:1}.pie{stroke-dasharray:2000;stroke-dashoffset:2000;-webkit-animation:1s linear 1.3s forwards pie_frames;animation:1s linear 1.3s forwards pie_frames}@-webkit-keyframes pie_frames{to{stroke-dashoffset:0}}@keyframes pie_frames{to{stroke-dashoffset:0}}.pieSlice{-webkit-animation:1.5s forwards pieSlice_frames;animation:1.5s forwards pieSlice_frames}@-webkit-keyframes pieSlice_frames{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes pieSlice_frames{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}"]
            }] }
];
/** @nocollapse */
ngxChartsPieComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
ngxChartsPieComponent.propDecorators = {
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
    ngxChartsPieComponent.prototype.customOptions;
    /**
     * @type {?}
     * @private
     */
    ngxChartsPieComponent.prototype._options;
    /** @type {?} */
    ngxChartsPieComponent.prototype.categories;
    /** @type {?} */
    ngxChartsPieComponent.prototype.series;
    /** @type {?} */
    ngxChartsPieComponent.prototype.xScale;
    /** @type {?} */
    ngxChartsPieComponent.prototype.innerScale;
    /** @type {?} */
    ngxChartsPieComponent.prototype.yScale;
    /** @type {?} */
    ngxChartsPieComponent.prototype.pies;
    /** @type {?} */
    ngxChartsPieComponent.prototype.lineCircle;
    /** @type {?} */
    ngxChartsPieComponent.prototype.groupName;
    /** @type {?} */
    ngxChartsPieComponent.prototype.colorScale;
    /** @type {?} */
    ngxChartsPieComponent.prototype.calcArc;
    /** @type {?} */
    ngxChartsPieComponent.prototype.pieGenerator;
    /** @type {?} */
    ngxChartsPieComponent.prototype.translation;
    /** @type {?} */
    ngxChartsPieComponent.prototype.trimLabel;
    /**
     * @type {?}
     * @private
     */
    ngxChartsPieComponent.prototype.chartElement;
    /**
     * @type {?}
     * @private
     */
    ngxChartsPieComponent.prototype.cdr;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNoYXJ0cy1waWUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHR1c2hhcmdob3NoYmQvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtY2hhcnRzLXBpZS9uZ3gtY2hhcnRzLXBpZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsS0FBSyxFQUNMLGlCQUFpQixFQUlqQixVQUFVLEVBQ1YsaUJBQWlCLEVBRWpCLFlBQVksRUFDZixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBVXBDLE1BQU0sT0FBTyxxQkFBcUI7Ozs7O0lBcUg5QixZQUNZLFlBQXdCLEVBQ3hCLEdBQXNCO1FBRHRCLGlCQUFZLEdBQVosWUFBWSxDQUFZO1FBQ3hCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBckgxQixrQkFBYSxHQUFDO1lBQ2xCLE9BQU8sRUFBRSxVQUFVO1lBQ25CLEtBQUssRUFBRSxFQUFFO1lBQ1QsUUFBUSxFQUFFLEVBQUU7WUFDWixNQUFNLEVBQUUsQ0FBQztZQUNULEtBQUssRUFBRSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUM7WUFDVixLQUFLLEVBQUU7Z0JBQ0gsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsYUFBYSxFQUFFLENBQUM7Z0JBQ2hCLFVBQVUsRUFBRSxNQUFNO2dCQUNsQixhQUFhLEVBQUUsS0FBSztnQkFDcEIsaUJBQWlCLEVBQUMsRUFBRTthQUN2QjtZQUNELEtBQUssRUFBRTtnQkFDSCxLQUFLLEVBQUUsRUFBRTtnQkFDVCxLQUFLLEVBQUUsQ0FBQztnQkFDUixNQUFNLEVBQUUsQ0FBQztn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O1FBQ1YsVUFBVTs7O1FBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFDLENBQUM7SUFDcEMsQ0FBQzs7Ozs7O0lBRU8sV0FBVyxDQUFDLEdBQUc7O1lBQ2YsYUFBYSxHQUFDLE1BQU07O1lBQ3BCLEdBQUcsR0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDekMsT0FBTyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0IsQ0FBQzs7O1lBMVVKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixvM0RBQThDOztnQkFHOUMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2FBQ3hDOzs7O1lBakJHLFVBQVU7WUFDVixpQkFBaUI7OztzQkFtRWhCLEtBQUs7eUJBZ0RMLEtBQUs7cUJBQ0wsS0FBSzt1QkF1TkwsWUFBWSxTQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7Ozs7OztJQXZUekMsOENBMkNFOzs7OztJQUVGLHlDQUF5Qjs7SUFrRHpCLDJDQUE0Qjs7SUFDNUIsdUNBQXdCOztJQU14Qix1Q0FBWTs7SUFDWiwyQ0FBZ0I7O0lBQ2hCLHVDQUFZOztJQUNaLHFDQUFhOztJQUNiLDJDQUFtQjs7SUFDbkIsMENBQW9COztJQUdwQiwyQ0FBZ0I7O0lBQ2hCLHdDQUFhOztJQUNiLDZDQUFrQjs7SUFDbEIsNENBQXVCOztJQUN2QiwwQ0FBZTs7Ozs7SUFFWCw2Q0FBZ0M7Ozs7O0lBQ2hDLG9DQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBDb21wb25lbnQsXHJcbiAgICBJbnB1dCxcclxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxyXG4gICAgT25DaGFuZ2VzLFxyXG4gICAgT25Jbml0LFxyXG4gICAgU2ltcGxlQ2hhbmdlcyxcclxuICAgIEVsZW1lbnRSZWYsXHJcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gICAgSG9zdExpc3RlbmVyXHJcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuXHJcbmltcG9ydCB7IHNjYWxlQmFuZCwgc2NhbGVMaW5lYXIgfSBmcm9tIFwiZDMtc2NhbGVcIjtcclxuaW1wb3J0IHsgQ29sb3JIZWxwZXIgfSBmcm9tICcuLi91dGlscy9jb2xvci5oZWxwZXInO1xyXG5pbXBvcnQgeyB0cmltTGFiZWwgfSBmcm9tICcuLi91dGlscy90cmltLWxhYmVsLmhlbHBlcic7XHJcbmltcG9ydCB7IGFyYywgcGllIH0gZnJvbSAnZDMtc2hhcGUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJuZ3gtY2hhcnRzLXBpZVwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9uZ3gtY2hhcnRzLXBpZS5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL25neC1jaGFydHMtcGllLmNvbXBvbmVudC5jc3NcIl0sXHJcbiAgICAvLyBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBuZ3hDaGFydHNQaWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCB7XHJcblxyXG4gICAgcHJpdmF0ZSBjdXN0b21PcHRpb25zPXtcclxuICAgICAgICBiYXJUeXBlOiAndmVydGljYWwnLFxyXG4gICAgICAgIHRpdGxlOiAnJyxcclxuICAgICAgICBzdWJ0aXRsZTogJycsXHJcbiAgICAgICAgaGVpZ2h0OiAwLFxyXG4gICAgICAgIHdpZHRoOiAwLFxyXG4gICAgICAgIHBhZGRpbmc6IDUsXHJcbiAgICAgICAgeEF4aXM6IHtcclxuICAgICAgICAgICAgdGl0bGU6ICcnLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDAsXHJcbiAgICAgICAgICAgIGxhYmVsUm90YXRpb246IDAsXHJcbiAgICAgICAgICAgIGxhYmVsQWxpZ246ICdsZWZ0JyxcclxuICAgICAgICAgICAgbGFiZWxFbGxpcHNpczogZmFsc2UsXHJcbiAgICAgICAgICAgIGxhYmVsRWxsaXBzaXNTaXplOjE2XHJcbiAgICAgICAgfSxcclxuICAgICAgICB5QXhpczoge1xyXG4gICAgICAgICAgICB0aXRsZTogJycsXHJcbiAgICAgICAgICAgIHdpZHRoOiAwLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDAsXHJcbiAgICAgICAgICAgIGxhYmVsUm90YXRpb246IDAsXHJcbiAgICAgICAgICAgIGxhYmVsRWxsaXBzaXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBsYWJlbEVsbGlwc2lzU2l6ZToxNlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGxvdEJhY2tncm91bmQ6IHtcclxuICAgICAgICAgICAgeDogMCxcclxuICAgICAgICAgICAgeTogMCxcclxuICAgICAgICAgICAgaGVpZ2h0OiAwLFxyXG4gICAgICAgICAgICB3aWR0aDogMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGVnZW5kOiB7XHJcbiAgICAgICAgICAgIGxhYmVsRWxsaXBzaXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBsYWJlbEVsbGlwc2lzU2l6ZToxNlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGxvdE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgb3V0ZXJSYWRpdXM6IDgwLFxyXG4gICAgICAgICAgICBpbm5lclJhZGl1czogMCxcclxuICAgICAgICAgICAgbGFiZWxFbGxpcHNpczogZmFsc2UsXHJcbiAgICAgICAgICAgIGxhYmVsRWxsaXBzaXNTaXplOjE2XHJcbiAgICAgICAgfSxcclxuICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgaGVpZ2h0OiAwLFxyXG4gICAgICAgICAgICB3aWR0aDogMFxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBfb3B0aW9uczogYW55PXt9O1xyXG5cclxuICAgIEBJbnB1dCgpIHNldCBvcHRpb25zKG9iajogYW55KSB7XHJcbiAgICAgICAgbGV0IHhBeGlzPW9iai54QXhpcztcclxuICAgICAgICBsZXQgeUF4aXM9b2JqLnlBeGlzO1xyXG4gICAgICAgIGxldCBsZWdlbmQ9b2JqLmxlZ2VuZDtcclxuICAgICAgICBsZXQgcGxvdEJhY2tncm91bmQ9b2JqLnBsb3RCYWNrZ3JvdW5kO1xyXG4gICAgICAgIGxldCBwbG90T3B0aW9ucz1vYmoucGxvdE9wdGlvbnM7XHJcbiAgICAgICAgbGV0IGhlYWRlcj1vYmouaGVhZGVyO1xyXG5cclxuICAgICAgICBkZWxldGUgb2JqWyd4QXhpcyddO1xyXG4gICAgICAgIGRlbGV0ZSBvYmpbJ3lBeGlzJ107XHJcbiAgICAgICAgZGVsZXRlIG9ialsnbGVnZW5kJ107XHJcbiAgICAgICAgZGVsZXRlIG9ialsncGxvdEJhY2tncm91bmQnXTtcclxuICAgICAgICBkZWxldGUgb2JqWydwbG90T3B0aW9ucyddO1xyXG4gICAgICAgIGRlbGV0ZSBvYmpbJ2hlYWRlciddO1xyXG5cclxuICAgICAgICB0aGlzLl9vcHRpb25zPXtcclxuICAgICAgICAgICAgLi4udGhpcy5jdXN0b21PcHRpb25zLFxyXG4gICAgICAgICAgICAuLi5vYmosXHJcbiAgICAgICAgICAgIHhBeGlzOiB7XHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLmN1c3RvbU9wdGlvbnMueEF4aXMsXHJcbiAgICAgICAgICAgICAgICAuLi54QXhpc1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB5QXhpczoge1xyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5jdXN0b21PcHRpb25zLnlBeGlzLFxyXG4gICAgICAgICAgICAgICAgLi4ueUF4aXNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbGVnZW5kOnsgXHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLmN1c3RvbU9wdGlvbnMubGVnZW5kLFxyXG4gICAgICAgICAgICAgICAgLi4ubGVnZW5kXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHBsb3RCYWNrZ3JvdW5kOiB7XHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLmN1c3RvbU9wdGlvbnMucGxvdEJhY2tncm91bmQsXHJcbiAgICAgICAgICAgICAgICAuLi5wbG90QmFja2dyb3VuZFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwbG90T3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5jdXN0b21PcHRpb25zLnBsb3RPcHRpb25zLFxyXG4gICAgICAgICAgICAgICAgLi4ucGxvdE9wdGlvbnNcclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5jdXN0b21PcHRpb25zLmhlYWRlcixcclxuICAgICAgICAgICAgICAgIC4uLmhlYWRlclxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGdldCBvcHRpb25zKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wdGlvbnM7XHJcbiAgICB9XHJcbiAgICBASW5wdXQoKSBjYXRlZ29yaWVzOiBhbnk9W107XHJcbiAgICBASW5wdXQoKSBzZXJpZXM6IGFueT1bXTtcclxuXHJcbiAgICAvL0BJbnB1dCgpIGdyb3VwQmFyUGFkZGluZz0yMDtcclxuICAgIC8vQElucHV0KCkgaW5uZXJCYXJQYWRkaW5nPTM7XHJcblxyXG4gICAgLy8gc2NhbGU6IGFueTtcclxuICAgIHhTY2FsZTogYW55O1xyXG4gICAgaW5uZXJTY2FsZTogYW55O1xyXG4gICAgeVNjYWxlOiBhbnk7XHJcbiAgICBwaWVzOiBhbnk9W107XHJcbiAgICBsaW5lQ2lyY2xlOiBhbnk9W107XHJcbiAgICBncm91cE5hbWU6IGFueVtdPVtdO1xyXG4gICAgLy8gZ3JvdXBCYXJQYWRkaW5nQks6IGFueTtcclxuICAgIC8vIGlubmVyQmFyUGFkZGluZ0JLOiBhbnk7XHJcbiAgICBjb2xvclNjYWxlOiBhbnk7XHJcbiAgICBjYWxjQXJjOiBhbnk7XHJcbiAgICBwaWVHZW5lcmF0b3I6IGFueTtcclxuICAgIHRyYW5zbGF0aW9uOiBzdHJpbmc9XCJcIjtcclxuICAgIHRyaW1MYWJlbDogYW55O1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBjaGFydEVsZW1lbnQ6IEVsZW1lbnRSZWYsXHJcbiAgICAgICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7IFxyXG4gICAgICAgICAgICB0aGlzLnRyaW1MYWJlbCA9IHRyaW1MYWJlbDtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICAgICAgLy8gdGhpcy5ncm91cEJhclBhZGRpbmdCSz10aGlzLm9wdGlvbnMucGxvdE9wdGlvbnMuZ3JvdXBCYXJQYWRkaW5nO1xyXG4gICAgICAgIC8vIHRoaXMuaW5uZXJCYXJQYWRkaW5nQks9dGhpcy5vcHRpb25zLnBsb3RPcHRpb25zLmlubmVyQmFyUGFkZGluZztcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMudXBkYXRlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy53aWR0aD10aGlzLm9wdGlvbnMud2lkdGg7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLmhlaWdodD10aGlzLm9wdGlvbnMuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwidHR0dHR0dFwiLHRoaXMub3B0aW9ucylcclxuICAgICAgICBjb25zdCBob3N0RWxlbT10aGlzLmNoYXJ0RWxlbWVudC5uYXRpdmVFbGVtZW50O1xyXG4gICAgICAgIGxldCBkaW1zPWhvc3RFbGVtLnBhcmVudE5vZGUhPT1udWxsPyBob3N0RWxlbS5wYXJlbnROb2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpOnsgaGVpZ2h0OiA0MDAsIHdpZHRoOiA4MDAgfTtcclxuXHJcbiAgICAgICAgdmFyIHN0eWxlPWhvc3RFbGVtLnBhcmVudE5vZGUuY3VycmVudFN0eWxlfHx3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShob3N0RWxlbS5wYXJlbnROb2RlKTtcclxuXHJcbiAgICAgICAgdGhpcy5vcHRpb25zLmhlaWdodD0hdGhpcy5vcHRpb25zLmhlaWdodD8gZGltcy5oZWlnaHQtdGhpcy5zdHJUb051bWJlcihzdHlsZS5wYWRkaW5nTGVmdCktdGhpcy5zdHJUb051bWJlcihzdHlsZS5wYWRkaW5nUmlnaHQpOnRoaXMub3B0aW9ucy5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLndpZHRoPSF0aGlzLm9wdGlvbnMud2lkdGg/IGRpbXMud2lkdGgtdGhpcy5zdHJUb051bWJlcihzdHlsZS5wYWRkaW5nTGVmdCktdGhpcy5zdHJUb051bWJlcihzdHlsZS5wYWRkaW5nUmlnaHQpOmRpbXMud2lkdGgtdGhpcy5zdHJUb051bWJlcihzdHlsZS5wYWRkaW5nTGVmdCktdGhpcy5zdHJUb051bWJlcihzdHlsZS5wYWRkaW5nUmlnaHQpO1xyXG5cclxuICAgICAgICB0aGlzLmNhbFBsb3RCYWNrZ3JvdW5kKCk7XHJcbiAgICAgICAgY29uc3QgeE9mZnNldD10aGlzLm9wdGlvbnMud2lkdGgvMjtcclxuICAgICAgICBjb25zdCB5T2Zmc2V0PXRoaXMub3B0aW9ucy5oZWFkZXIuaGVpZ2h0Kyh0aGlzLm9wdGlvbnMucGxvdEJhY2tncm91bmQuaGVpZ2h0LzIpO1xyXG4gICAgICAgIHRoaXMudHJhbnNsYXRpb249YHRyYW5zbGF0ZSgke3hPZmZzZXR9LCAke3lPZmZzZXR9KWA7XHJcbiAgICAgICAgdGhpcy5jYWxjQXJjPXRoaXMuY2FsY3VsYXRlQXJjKCk7XHJcbiAgICAgICAgdGhpcy5waWVHZW5lcmF0b3I9dGhpcy5waWVHZW5lcmF0b3JGdW5jKCk7XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucGllR2VuZXJhdG9yKVxyXG5cclxuICAgICAgICAvLyBsZXQgY291bnRGbGFnPWZhbHNlO1xyXG4gICAgICAgIC8vIHRoaXMub3B0aW9ucy5wbG90T3B0aW9ucy5ncm91cEJhclBhZGRpbmc9dGhpcy5ncm91cEJhclBhZGRpbmdCSztcclxuICAgICAgICAvLyB0aGlzLm9wdGlvbnMucGxvdE9wdGlvbnMuaW5uZXJCYXJQYWRkaW5nPXRoaXMuaW5uZXJCYXJQYWRkaW5nQks7XHJcbiAgICAgICAgLy8gZG8ge1xyXG4gICAgICAgIC8vICAgICBpZiAoY291bnRGbGFnPT10cnVlKSB7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLm9wdGlvbnMucGxvdE9wdGlvbnMuZ3JvdXBCYXJQYWRkaW5nLS07XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLm9wdGlvbnMucGxvdE9wdGlvbnMuaW5uZXJCYXJQYWRkaW5nID0gMjtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICBpZiAodGhpcy5vcHRpb25zLmJhclR5cGU9PSd2ZXJ0aWNhbCcpIHtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMueFNjYWxlPXRoaXMuZ2V0WFNjYWxlKCk7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgICAgZWxzZSB7IFxyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy55U2NhbGU9dGhpcy5nZXRYU2NhbGUoKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICB0aGlzLmlubmVyU2NhbGU9dGhpcy5nZXRJbm5lclNjYWxlKCk7XHJcbiAgICAgICAgLy8gICAgIGNvdW50RmxhZz10cnVlO1xyXG4gICAgICAgIC8vIH0gd2hpbGUgKHRoaXMuaW5uZXJTY2FsZS5iYW5kd2lkdGgoKTwyKTtcclxuICAgICAgICAvLyBcclxuXHJcbiAgICAgICAgLy8gaWYgKHRoaXMub3B0aW9ucy5iYXJUeXBlPT0ndmVydGljYWwnKSB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMueVNjYWxlPXRoaXMuZ2V0WVNjYWxlKCk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGVsc2UgeyBcclxuICAgICAgICAvLyAgICAgdGhpcy54U2NhbGU9dGhpcy5nZXRZU2NhbGUoKTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIGxldCBjb2xvckhlbHBlcj1uZXcgQ29sb3JIZWxwZXIodGhpcy5vcHRpb25zLCB0aGlzLnNlcmllcyk7XHJcbiAgICAgICAgdGhpcy5jb2xvclNjYWxlPWNvbG9ySGVscGVyLmdlbmVyYXRlQ29sb3JTY2FsZSgpO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5ncm91cE5hbWU9W107XHJcbiAgICAgICAgICAgIHRoaXMuc2VyaWVzLm1hcChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLm5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyb3VwTmFtZS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogaXRlbS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhpcy5jb2xvclNjYWxlKGl0ZW0ubmFtZSlcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVQaWUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcGllR2VuZXJhdG9yRnVuYygpIHtcclxuICAgICAgICByZXR1cm4gcGllKClcclxuICAgICAgICAgICAgLnZhbHVlKGQgPT4gZC5kYXRhKVxyXG4gICAgICAgICAgICAuc29ydChudWxsKSh0aGlzLnNlcmllcyk7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsY3VsYXRlQXJjKCk6IGFueSB7XHJcbiAgICAgICAgbGV0IG91dGVyUmFkaXVzPXRoaXMub3B0aW9ucy5wbG90T3B0aW9ucy5vdXRlclJhZGl1cztcclxuICAgICAgICBsZXQgaW5uZXJSYWRpdXM9dGhpcy5vcHRpb25zLnBsb3RPcHRpb25zLmlubmVyUmFkaXVzO1xyXG4gICAgICAgIGxldCBjb3JuZXJSYWRpdXM9MDtcclxuICAgICAgICByZXR1cm4gYXJjKClcclxuICAgICAgICAgICAgLmlubmVyUmFkaXVzKGlubmVyUmFkaXVzKVxyXG4gICAgICAgICAgICAub3V0ZXJSYWRpdXMob3V0ZXJSYWRpdXMpXHJcbiAgICAgICAgICAgIC5jb3JuZXJSYWRpdXMoY29ybmVyUmFkaXVzKTtcclxuICAgIH1cclxuXHJcbiAgICBvdXRlckFyYygpOiBhbnkge1xyXG4gICAgICAgIGNvbnN0IGZhY3Rvcj0xLjI7XHJcbiAgICAgICAgbGV0IG91dGVyUmFkaXVzPXRoaXMub3B0aW9ucy5wbG90T3B0aW9ucy5vdXRlclJhZGl1cztcclxuICAgICAgICByZXR1cm4gYXJjKClcclxuICAgICAgICAgICAgLmlubmVyUmFkaXVzKG91dGVyUmFkaXVzKmZhY3RvcilcclxuICAgICAgICAgICAgLm91dGVyUmFkaXVzKG91dGVyUmFkaXVzKmZhY3Rvcik7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsUGxvdEJhY2tncm91bmQoKSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zPXtcclxuICAgICAgICAgICAgLi4udGhpcy5vcHRpb25zLFxyXG4gICAgICAgICAgICBwbG90QmFja2dyb3VuZDoge1xyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5vcHRpb25zLnBsb3RCYWNrZ3JvdW5kLFxyXG4gICAgICAgICAgICAgICAgeDogMCxcclxuICAgICAgICAgICAgICAgIHk6IDAsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IHRoaXMub3B0aW9ucy5oZWlnaHQtdGhpcy5vcHRpb25zLnhBeGlzLmhlaWdodC10aGlzLm9wdGlvbnMuaGVhZGVyLmhlaWdodC10aGlzLm9wdGlvbnMucGFkZGluZyxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiB0aGlzLm9wdGlvbnMud2lkdGgtdGhpcy5vcHRpb25zLnlBeGlzLndpZHRoLXRoaXMub3B0aW9ucy5wYWRkaW5nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJjYWxQbG90QmFja2dyb3VuZFwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLm9wdGlvbnMpKTtcclxuICAgIH1cclxuICAgIGNyZWF0ZVBpZSgpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwidGhpcy5pbm5lclNjYWxlLmJhbmR3aWR0aCgpIFwiK3RoaXMuaW5uZXJTY2FsZS5iYW5kd2lkdGgoKSlcclxuICAgICAgICB0aGlzLnBpZXM9W107XHJcbiAgICAgICAgZm9yIChsZXQgaT0wOyBpPHRoaXMucGllR2VuZXJhdG9yLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBmYWN0b3I9MS4yO1xyXG4gICAgICAgICAgICBsZXQgdGVtcE9iaj17XHJcbiAgICAgICAgICAgICAgICBwYXRoOiB0aGlzLmNhbGNBcmMuc3RhcnRBbmdsZSh0aGlzLnBpZUdlbmVyYXRvcltpXS5zdGFydEFuZ2xlKS5lbmRBbmdsZSh0aGlzLnBpZUdlbmVyYXRvcltpXS5lbmRBbmdsZSkoKSxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiB0aGlzLmNvbG9yU2NhbGUodGhpcy5waWVHZW5lcmF0b3JbaV0uZGF0YS5uYW1lKSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMucGllR2VuZXJhdG9yW2ldLmRhdGEsXHJcbiAgICAgICAgICAgICAgICBwb3M6IHRoaXMub3V0ZXJBcmMoKS5jZW50cm9pZCh0aGlzLnBpZUdlbmVyYXRvcltpXSksXHJcbiAgICAgICAgICAgICAgICBsYWJlbFBhdGg6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0QW5jaG9yOiB0aGlzLm1pZEFuZ2xlKHRoaXMucGllR2VuZXJhdG9yW2ldKTxNYXRoLlBJPyAnc3RhcnQnOidlbmQnXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRlbXBPYmpbXCJwb3NcIl1bMF09ZmFjdG9yKnRoaXMub3B0aW9ucy5wbG90T3B0aW9ucy5vdXRlclJhZGl1cyoodGhpcy5taWRBbmdsZSh0aGlzLnBpZUdlbmVyYXRvcltpXSk8TWF0aC5QST8gMTotMSk7XHJcblxyXG4gICAgICAgICAgICAvL2NyZWF0ZSBhIGxpbmUgcGF0aFxyXG4gICAgICAgICAgICBjb25zdCBpbm5lclBvcz10aGlzLmNhbGNBcmMuY2VudHJvaWQodGhpcy5waWVHZW5lcmF0b3JbaV0pO1xyXG4gICAgICAgICAgICBsZXQgc2NhbGU9dGVtcE9ialtcInBvc1wiXVsxXS9pbm5lclBvc1sxXTtcclxuICAgICAgICAgICAgaWYgKHRlbXBPYmpbXCJwb3NcIl1bMV09PT0wfHxpbm5lclBvc1sxXT09PTApIHtcclxuICAgICAgICAgICAgICAgIHNjYWxlPTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3Qgb3V0ZXJQb3M9W3NjYWxlKmlubmVyUG9zWzBdLCBzY2FsZSppbm5lclBvc1sxXV07XHJcbiAgICAgICAgICAgIHRlbXBPYmoubGFiZWxQYXRoPWBNJHtpbm5lclBvc31MJHtvdXRlclBvc31MJHt0ZW1wT2JqW1wicG9zXCJdfWA7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnBpZXMucHVzaCh0ZW1wT2JqKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJhbGwgcGllcyA6IFwiLCB0aGlzLnBpZXMpO1xyXG4gICAgfVxyXG4gICAgbWlkQW5nbGUoZCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIGQuc3RhcnRBbmdsZSsoZC5lbmRBbmdsZS1kLnN0YXJ0QW5nbGUpLzI7XHJcbiAgICB9XHJcblxyXG4gICAgeUF4aXNXaWR0aENoYW5nZSh7IHlBeGlzV2lkdGgsIHlBeGlzSGVpZ2h0IH0pIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwieUF4aXNXaWR0aCBcIit5QXhpc1dpZHRoKVxyXG4gICAgICAgIHRoaXMub3B0aW9ucz17XHJcbiAgICAgICAgICAgIC4uLnRoaXMub3B0aW9ucyxcclxuICAgICAgICAgICAgeUF4aXM6IHtcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMub3B0aW9ucy55QXhpcyxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiB5QXhpc1dpZHRoLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiB5QXhpc0hlaWdodFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY29uc29sZS5sb2coIHRoaXMub3B0aW9ucylcclxuICAgICAgICB0aGlzLnVwZGF0ZSgpXHJcbiAgICB9XHJcblxyXG4gICAgeEF4aXNIZWlnaHRDaGFuZ2UoeyB4QXhpc0hlaWdodCB9KSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zPXtcclxuICAgICAgICAgICAgLi4udGhpcy5vcHRpb25zLFxyXG4gICAgICAgICAgICB4QXhpczoge1xyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5vcHRpb25zLnhBeGlzLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiB4QXhpc0hlaWdodFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJ4QXhpc0hlaWdodENoYW5nZVwiLCB4QXhpc0hlaWdodCwgSlNPTi5zdHJpbmdpZnkodGhpcy5vcHRpb25zLnhBeGlzKSk7XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKVxyXG4gICAgfVxyXG4gICAgaGVhZGVySGVpZ2h0Q2hhbmdlKHsgaGVhZGVySGVpZ2h0IH0pIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnM9e1xyXG4gICAgICAgICAgICAuLi50aGlzLm9wdGlvbnMsXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5vcHRpb25zLmhlYWRlcixcclxuICAgICAgICAgICAgICAgIGhlaWdodDogaGVhZGVySGVpZ2h0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICB0b29sVGlwUGxhY2NlbWVudChkYXRhKSB7XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5iYXJUeXBlPT0ndmVydGljYWwnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhPjA/ICd0b3AnOidib3R0b20nXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0YT4wPyAncmlnaHQnOidsZWZ0J1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJywgWyckZXZlbnQnXSlcclxuICAgIG9uUmVzaXplKGV2ZW50KSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnVwZGF0ZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0clRvTnVtYmVyKHN0cikge1xyXG4gICAgICAgIGxldCBudW1iZXJQYXR0ZXJuPS9cXGQrL2c7XHJcbiAgICAgICAgbGV0IG51bT1zdHIubWF0Y2gobnVtYmVyUGF0dGVybikuam9pbignJylcclxuICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChudW0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==