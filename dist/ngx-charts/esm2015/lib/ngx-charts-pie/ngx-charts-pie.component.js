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
        legend['labelEllipsis'] = (obj.legend.labelEllipsisSize != undefined && obj.legend.labelEllipsisSize > 0) ? true : false;
        /** @type {?} */
        let plotBackground = obj.plotBackground;
        /** @type {?} */
        let plotOptions = obj.plotOptions;
        plotOptions['labelEllipsis'] = (obj.plotOptions.labelEllipsisSize != undefined && obj.plotOptions.labelEllipsisSize > 0) ? true : false;
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
                template: "<div [style.width]=\"options.width+'px'\" [style.border]=\"'1px solid #f3f3f3'\">\r\n\r\n    <svg version=\"1.1\" class=\"highcharts-root\" [attr.padding]=\"options.padding\" [attr.width]=\"options.width\"\r\n        [attr.height]=\"options.height\" [attr.viewBox]=\"'0 0 '+options.width +' '+ options.height\"\r\n        aria-label=\"Interactive chart\" [style.border]=\"'0px solid gray'\" [style.padding]=\"options.padding\"\r\n        aria-hidden=\"false\"  >\r\n\r\n        <g header [options]=\"options\" (headerHeightChange)=\"headerHeightChange($event)\"></g>\r\n        <g  \r\n            [attr.transform]=\"translation\" \r\n            *ngFor=\"let pie of pies\" >\r\n            <path  \r\n                class=\"pieSlice\"\r\n                [attr.d]=\"pie.path\"\r\n                [style.fill]=\"pie.color\"\r\n                [tooltip]=\"pie.data.name+', '+pie.data.data\" \r\n                [tooltipColor]=\"pie.color\"\r\n                [placement]=\"toolTipPlaccement(pie.data.data)\" \r\n            ></path>\r\n\r\n            <!--label path  -->\r\n            <path  \r\n                class=\"pie\"\r\n                [attr.d]=\"pie.labelPath\"\r\n                [style.stroke]=\"pie.color\"\r\n                fill=\"none\"\r\n            ></path>\r\n\r\n            <text\r\n                [attr.x]=\"pie.pos[0]\" \r\n                [attr.y]=\"pie.pos[1]\"\r\n                [style.textAnchor]=\"pie.textAnchor\"\r\n                [style.shapeRendering]=\"'crispEdges'\"\r\n            >\r\n                {{   options.plotOptions.labelEllipsis ? trimLabel(pie.data.name, options.plotOptions.labelEllipsisSize) :  pie.data.name}}\r\n            </text>\r\n\r\n        </g>\r\n    </svg>\r\n    <chart-legend\r\n        *ngIf=\"groupName.length\"\r\n        [groupName]=\"groupName\"\r\n        [options]=\"options\"\r\n        [series] = \"series\"    \r\n    >\r\n    </chart-legend>\r\n  \r\n</div>\r\n\r\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNoYXJ0cy1waWUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHR1c2hhcmdob3NoYmQvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtY2hhcnRzLXBpZS9uZ3gtY2hhcnRzLXBpZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsS0FBSyxFQUNMLGlCQUFpQixFQUlqQixVQUFVLEVBQ1YsaUJBQWlCLEVBRWpCLFlBQVksRUFDZixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBVXBDLE1BQU0sT0FBTyxxQkFBcUI7Ozs7O0lBeUg5QixZQUNZLFlBQXdCLEVBQ3hCLEdBQXNCO1FBRHRCLGlCQUFZLEdBQVosWUFBWSxDQUFZO1FBQ3hCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBekgxQixrQkFBYSxHQUFDO1lBQ2xCLE9BQU8sRUFBRSxVQUFVO1lBQ25CLEtBQUssRUFBRSxFQUFFO1lBQ1QsUUFBUSxFQUFFLEVBQUU7WUFDWixNQUFNLEVBQUUsQ0FBQztZQUNULEtBQUssRUFBRSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUM7WUFDVixLQUFLLEVBQUU7Z0JBQ0gsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsYUFBYSxFQUFFLENBQUM7Z0JBQ2hCLFVBQVUsRUFBRSxNQUFNO2dCQUNsQixhQUFhLEVBQUUsS0FBSztnQkFDcEIsaUJBQWlCLEVBQUMsRUFBRTthQUN2QjtZQUNELEtBQUssRUFBRTtnQkFDSCxLQUFLLEVBQUUsRUFBRTtnQkFDVCxLQUFLLEVBQUUsQ0FBQztnQkFDUixNQUFNLEVBQUUsQ0FBQztn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Qjs7SUFDbkIsMENBQW9COztJQUdwQiwyQ0FBZ0I7O0lBQ2hCLHdDQUFhOztJQUNiLDZDQUFrQjs7SUFDbEIsNENBQXVCOztJQUN2QiwwQ0FBZTs7Ozs7SUFFWCw2Q0FBZ0M7Ozs7O0lBQ2hDLG9DQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBDb21wb25lbnQsXHJcbiAgICBJbnB1dCxcclxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxyXG4gICAgT25DaGFuZ2VzLFxyXG4gICAgT25Jbml0LFxyXG4gICAgU2ltcGxlQ2hhbmdlcyxcclxuICAgIEVsZW1lbnRSZWYsXHJcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gICAgSG9zdExpc3RlbmVyXHJcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuXHJcbmltcG9ydCB7IHNjYWxlQmFuZCwgc2NhbGVMaW5lYXIgfSBmcm9tIFwiZDMtc2NhbGVcIjtcclxuaW1wb3J0IHsgQ29sb3JIZWxwZXIgfSBmcm9tICcuLi91dGlscy9jb2xvci5oZWxwZXInO1xyXG5pbXBvcnQgeyB0cmltTGFiZWwgfSBmcm9tICcuLi91dGlscy90cmltLWxhYmVsLmhlbHBlcic7XHJcbmltcG9ydCB7IGFyYywgcGllIH0gZnJvbSAnZDMtc2hhcGUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJuZ3gtY2hhcnRzLXBpZVwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9uZ3gtY2hhcnRzLXBpZS5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL25neC1jaGFydHMtcGllLmNvbXBvbmVudC5jc3NcIl0sXHJcbiAgICAvLyBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBuZ3hDaGFydHNQaWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCB7XHJcblxyXG4gICAgcHJpdmF0ZSBjdXN0b21PcHRpb25zPXtcclxuICAgICAgICBiYXJUeXBlOiAndmVydGljYWwnLFxyXG4gICAgICAgIHRpdGxlOiAnJyxcclxuICAgICAgICBzdWJ0aXRsZTogJycsXHJcbiAgICAgICAgaGVpZ2h0OiAwLFxyXG4gICAgICAgIHdpZHRoOiAwLFxyXG4gICAgICAgIHBhZGRpbmc6IDUsXHJcbiAgICAgICAgeEF4aXM6IHtcclxuICAgICAgICAgICAgdGl0bGU6ICcnLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDAsXHJcbiAgICAgICAgICAgIGxhYmVsUm90YXRpb246IDAsXHJcbiAgICAgICAgICAgIGxhYmVsQWxpZ246ICdsZWZ0JyxcclxuICAgICAgICAgICAgbGFiZWxFbGxpcHNpczogZmFsc2UsXHJcbiAgICAgICAgICAgIGxhYmVsRWxsaXBzaXNTaXplOjE2XHJcbiAgICAgICAgfSxcclxuICAgICAgICB5QXhpczoge1xyXG4gICAgICAgICAgICB0aXRsZTogJycsXHJcbiAgICAgICAgICAgIHdpZHRoOiAwLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDAsXHJcbiAgICAgICAgICAgIGxhYmVsUm90YXRpb246IDAsXHJcbiAgICAgICAgICAgIGxhYmVsRWxsaXBzaXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBsYWJlbEVsbGlwc2lzU2l6ZToxNlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGxvdEJhY2tncm91bmQ6IHtcclxuICAgICAgICAgICAgeDogMCxcclxuICAgICAgICAgICAgeTogMCxcclxuICAgICAgICAgICAgaGVpZ2h0OiAwLFxyXG4gICAgICAgICAgICB3aWR0aDogMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGVnZW5kOiB7XHJcbiAgICAgICAgICAgIGxhYmVsRWxsaXBzaXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBsYWJlbEVsbGlwc2lzU2l6ZToxNlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGxvdE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgb3V0ZXJSYWRpdXM6IDgwLFxyXG4gICAgICAgICAgICBpbm5lclJhZGl1czogMCxcclxuICAgICAgICAgICAgbGFiZWxFbGxpcHNpczogZmFsc2UsXHJcbiAgICAgICAgICAgIGxhYmVsRWxsaXBzaXNTaXplOjE2XHJcbiAgICAgICAgfSxcclxuICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgaGVpZ2h0OiAwLFxyXG4gICAgICAgICAgICB3aWR0aDogMFxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBfb3B0aW9uczogYW55PXt9O1xyXG5cclxuICAgIEBJbnB1dCgpIHNldCBvcHRpb25zKG9iajogYW55KSB7XHJcbiAgICAgICAgbGV0IHhBeGlzPW9iai54QXhpcztcclxuICAgICAgICBsZXQgeUF4aXM9b2JqLnlBeGlzO1xyXG5cclxuICAgICAgICBsZXQgbGVnZW5kPW9iai5sZWdlbmQ7XHJcbiAgICAgICAgbGVnZW5kWydsYWJlbEVsbGlwc2lzJ109KG9iai5sZWdlbmQubGFiZWxFbGxpcHNpc1NpemUhPXVuZGVmaW5lZCYmb2JqLmxlZ2VuZC5sYWJlbEVsbGlwc2lzU2l6ZT4wKT8gdHJ1ZTpmYWxzZTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgcGxvdEJhY2tncm91bmQ9b2JqLnBsb3RCYWNrZ3JvdW5kO1xyXG4gICAgICAgIGxldCBwbG90T3B0aW9ucz1vYmoucGxvdE9wdGlvbnM7XHJcbiAgICAgICAgcGxvdE9wdGlvbnNbJ2xhYmVsRWxsaXBzaXMnXT0ob2JqLnBsb3RPcHRpb25zLmxhYmVsRWxsaXBzaXNTaXplIT11bmRlZmluZWQmJm9iai5wbG90T3B0aW9ucy5sYWJlbEVsbGlwc2lzU2l6ZT4wKT8gdHJ1ZTpmYWxzZTtcclxuICAgICAgICBsZXQgaGVhZGVyPW9iai5oZWFkZXI7XHJcblxyXG4gICAgICAgIGRlbGV0ZSBvYmpbJ3hBeGlzJ107XHJcbiAgICAgICAgZGVsZXRlIG9ialsneUF4aXMnXTtcclxuICAgICAgICBkZWxldGUgb2JqWydsZWdlbmQnXTtcclxuICAgICAgICBkZWxldGUgb2JqWydwbG90QmFja2dyb3VuZCddO1xyXG4gICAgICAgIGRlbGV0ZSBvYmpbJ3Bsb3RPcHRpb25zJ107XHJcbiAgICAgICAgZGVsZXRlIG9ialsnaGVhZGVyJ107XHJcblxyXG4gICAgICAgIHRoaXMuX29wdGlvbnM9e1xyXG4gICAgICAgICAgICAuLi50aGlzLmN1c3RvbU9wdGlvbnMsXHJcbiAgICAgICAgICAgIC4uLm9iaixcclxuICAgICAgICAgICAgeEF4aXM6IHtcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMuY3VzdG9tT3B0aW9ucy54QXhpcyxcclxuICAgICAgICAgICAgICAgIC4uLnhBeGlzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHlBeGlzOiB7XHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLmN1c3RvbU9wdGlvbnMueUF4aXMsXHJcbiAgICAgICAgICAgICAgICAuLi55QXhpc1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBsZWdlbmQ6eyBcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMuY3VzdG9tT3B0aW9ucy5sZWdlbmQsXHJcbiAgICAgICAgICAgICAgICAuLi5sZWdlbmRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcGxvdEJhY2tncm91bmQ6IHtcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMuY3VzdG9tT3B0aW9ucy5wbG90QmFja2dyb3VuZCxcclxuICAgICAgICAgICAgICAgIC4uLnBsb3RCYWNrZ3JvdW5kXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHBsb3RPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLmN1c3RvbU9wdGlvbnMucGxvdE9wdGlvbnMsXHJcbiAgICAgICAgICAgICAgICAuLi5wbG90T3B0aW9uc1xyXG5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLmN1c3RvbU9wdGlvbnMuaGVhZGVyLFxyXG4gICAgICAgICAgICAgICAgLi4uaGVhZGVyXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgZ2V0IG9wdGlvbnMoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fb3B0aW9ucztcclxuICAgIH1cclxuICAgIEBJbnB1dCgpIGNhdGVnb3JpZXM6IGFueT1bXTtcclxuICAgIEBJbnB1dCgpIHNlcmllczogYW55PVtdO1xyXG5cclxuICAgIC8vQElucHV0KCkgZ3JvdXBCYXJQYWRkaW5nPTIwO1xyXG4gICAgLy9ASW5wdXQoKSBpbm5lckJhclBhZGRpbmc9MztcclxuXHJcbiAgICAvLyBzY2FsZTogYW55O1xyXG4gICAgeFNjYWxlOiBhbnk7XHJcbiAgICBpbm5lclNjYWxlOiBhbnk7XHJcbiAgICB5U2NhbGU6IGFueTtcclxuICAgIHBpZXM6IGFueT1bXTtcclxuICAgIGxpbmVDaXJjbGU6IGFueT1bXTtcclxuICAgIGdyb3VwTmFtZTogYW55W109W107XHJcbiAgICAvLyBncm91cEJhclBhZGRpbmdCSzogYW55O1xyXG4gICAgLy8gaW5uZXJCYXJQYWRkaW5nQks6IGFueTtcclxuICAgIGNvbG9yU2NhbGU6IGFueTtcclxuICAgIGNhbGNBcmM6IGFueTtcclxuICAgIHBpZUdlbmVyYXRvcjogYW55O1xyXG4gICAgdHJhbnNsYXRpb246IHN0cmluZz1cIlwiO1xyXG4gICAgdHJpbUxhYmVsOiBhbnk7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIGNoYXJ0RWxlbWVudDogRWxlbWVudFJlZixcclxuICAgICAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHsgXHJcbiAgICAgICAgICAgIHRoaXMudHJpbUxhYmVsID0gdHJpbUxhYmVsO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgICAgICAvLyB0aGlzLmdyb3VwQmFyUGFkZGluZ0JLPXRoaXMub3B0aW9ucy5wbG90T3B0aW9ucy5ncm91cEJhclBhZGRpbmc7XHJcbiAgICAgICAgLy8gdGhpcy5pbm5lckJhclBhZGRpbmdCSz10aGlzLm9wdGlvbnMucGxvdE9wdGlvbnMuaW5uZXJCYXJQYWRkaW5nO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy51cGRhdGUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLndpZHRoPXRoaXMub3B0aW9ucy53aWR0aDtcclxuICAgICAgICB0aGlzLm9wdGlvbnMuaGVpZ2h0PXRoaXMub3B0aW9ucy5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJ0dHR0dHR0XCIsdGhpcy5vcHRpb25zKVxyXG4gICAgICAgIGNvbnN0IGhvc3RFbGVtPXRoaXMuY2hhcnRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICAgICAgbGV0IGRpbXM9aG9zdEVsZW0ucGFyZW50Tm9kZSE9PW51bGw/IGhvc3RFbGVtLnBhcmVudE5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk6eyBoZWlnaHQ6IDQwMCwgd2lkdGg6IDgwMCB9O1xyXG5cclxuICAgICAgICB2YXIgc3R5bGU9aG9zdEVsZW0ucGFyZW50Tm9kZS5jdXJyZW50U3R5bGV8fHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGhvc3RFbGVtLnBhcmVudE5vZGUpO1xyXG5cclxuICAgICAgICB0aGlzLm9wdGlvbnMuaGVpZ2h0PSF0aGlzLm9wdGlvbnMuaGVpZ2h0PyBkaW1zLmhlaWdodC10aGlzLnN0clRvTnVtYmVyKHN0eWxlLnBhZGRpbmdMZWZ0KS10aGlzLnN0clRvTnVtYmVyKHN0eWxlLnBhZGRpbmdSaWdodCk6dGhpcy5vcHRpb25zLmhlaWdodDtcclxuICAgICAgICB0aGlzLm9wdGlvbnMud2lkdGg9IXRoaXMub3B0aW9ucy53aWR0aD8gZGltcy53aWR0aC10aGlzLnN0clRvTnVtYmVyKHN0eWxlLnBhZGRpbmdMZWZ0KS10aGlzLnN0clRvTnVtYmVyKHN0eWxlLnBhZGRpbmdSaWdodCk6ZGltcy53aWR0aC10aGlzLnN0clRvTnVtYmVyKHN0eWxlLnBhZGRpbmdMZWZ0KS10aGlzLnN0clRvTnVtYmVyKHN0eWxlLnBhZGRpbmdSaWdodCk7XHJcblxyXG4gICAgICAgIHRoaXMuY2FsUGxvdEJhY2tncm91bmQoKTtcclxuICAgICAgICBjb25zdCB4T2Zmc2V0PXRoaXMub3B0aW9ucy53aWR0aC8yO1xyXG4gICAgICAgIGNvbnN0IHlPZmZzZXQ9dGhpcy5vcHRpb25zLmhlYWRlci5oZWlnaHQrKHRoaXMub3B0aW9ucy5wbG90QmFja2dyb3VuZC5oZWlnaHQvMik7XHJcbiAgICAgICAgdGhpcy50cmFuc2xhdGlvbj1gdHJhbnNsYXRlKCR7eE9mZnNldH0sICR7eU9mZnNldH0pYDtcclxuICAgICAgICB0aGlzLmNhbGNBcmM9dGhpcy5jYWxjdWxhdGVBcmMoKTtcclxuICAgICAgICB0aGlzLnBpZUdlbmVyYXRvcj10aGlzLnBpZUdlbmVyYXRvckZ1bmMoKTtcclxuXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5waWVHZW5lcmF0b3IpXHJcblxyXG4gICAgICAgIC8vIGxldCBjb3VudEZsYWc9ZmFsc2U7XHJcbiAgICAgICAgLy8gdGhpcy5vcHRpb25zLnBsb3RPcHRpb25zLmdyb3VwQmFyUGFkZGluZz10aGlzLmdyb3VwQmFyUGFkZGluZ0JLO1xyXG4gICAgICAgIC8vIHRoaXMub3B0aW9ucy5wbG90T3B0aW9ucy5pbm5lckJhclBhZGRpbmc9dGhpcy5pbm5lckJhclBhZGRpbmdCSztcclxuICAgICAgICAvLyBkbyB7XHJcbiAgICAgICAgLy8gICAgIGlmIChjb3VudEZsYWc9PXRydWUpIHtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMub3B0aW9ucy5wbG90T3B0aW9ucy5ncm91cEJhclBhZGRpbmctLTtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMub3B0aW9ucy5wbG90T3B0aW9ucy5pbm5lckJhclBhZGRpbmcgPSAyO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gICAgIGlmICh0aGlzLm9wdGlvbnMuYmFyVHlwZT09J3ZlcnRpY2FsJykge1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy54U2NhbGU9dGhpcy5nZXRYU2NhbGUoKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICBlbHNlIHsgXHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnlTY2FsZT10aGlzLmdldFhTY2FsZSgpO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gICAgIHRoaXMuaW5uZXJTY2FsZT10aGlzLmdldElubmVyU2NhbGUoKTtcclxuICAgICAgICAvLyAgICAgY291bnRGbGFnPXRydWU7XHJcbiAgICAgICAgLy8gfSB3aGlsZSAodGhpcy5pbm5lclNjYWxlLmJhbmR3aWR0aCgpPDIpO1xyXG4gICAgICAgIC8vIFxyXG5cclxuICAgICAgICAvLyBpZiAodGhpcy5vcHRpb25zLmJhclR5cGU9PSd2ZXJ0aWNhbCcpIHtcclxuICAgICAgICAvLyAgICAgdGhpcy55U2NhbGU9dGhpcy5nZXRZU2NhbGUoKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gZWxzZSB7IFxyXG4gICAgICAgIC8vICAgICB0aGlzLnhTY2FsZT10aGlzLmdldFlTY2FsZSgpO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgbGV0IGNvbG9ySGVscGVyPW5ldyBDb2xvckhlbHBlcih0aGlzLm9wdGlvbnMsIHRoaXMuc2VyaWVzKTtcclxuICAgICAgICB0aGlzLmNvbG9yU2NhbGU9Y29sb3JIZWxwZXIuZ2VuZXJhdGVDb2xvclNjYWxlKCk7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmdyb3VwTmFtZT1bXTtcclxuICAgICAgICAgICAgdGhpcy5zZXJpZXMubWFwKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0ubmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXBOYW1lLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBpdGVtLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB0aGlzLmNvbG9yU2NhbGUoaXRlbS5uYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVBpZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwaWVHZW5lcmF0b3JGdW5jKCkge1xyXG4gICAgICAgIHJldHVybiBwaWUoKVxyXG4gICAgICAgICAgICAudmFsdWUoZCA9PiBkLmRhdGEpXHJcbiAgICAgICAgICAgIC5zb3J0KG51bGwpKHRoaXMuc2VyaWVzKTtcclxuICAgIH1cclxuXHJcbiAgICBjYWxjdWxhdGVBcmMoKTogYW55IHtcclxuICAgICAgICBsZXQgb3V0ZXJSYWRpdXM9dGhpcy5vcHRpb25zLnBsb3RPcHRpb25zLm91dGVyUmFkaXVzO1xyXG4gICAgICAgIGxldCBpbm5lclJhZGl1cz10aGlzLm9wdGlvbnMucGxvdE9wdGlvbnMuaW5uZXJSYWRpdXM7XHJcbiAgICAgICAgbGV0IGNvcm5lclJhZGl1cz0wO1xyXG4gICAgICAgIHJldHVybiBhcmMoKVxyXG4gICAgICAgICAgICAuaW5uZXJSYWRpdXMoaW5uZXJSYWRpdXMpXHJcbiAgICAgICAgICAgIC5vdXRlclJhZGl1cyhvdXRlclJhZGl1cylcclxuICAgICAgICAgICAgLmNvcm5lclJhZGl1cyhjb3JuZXJSYWRpdXMpO1xyXG4gICAgfVxyXG5cclxuICAgIG91dGVyQXJjKCk6IGFueSB7XHJcbiAgICAgICAgY29uc3QgZmFjdG9yPTEuMjtcclxuICAgICAgICBsZXQgb3V0ZXJSYWRpdXM9dGhpcy5vcHRpb25zLnBsb3RPcHRpb25zLm91dGVyUmFkaXVzO1xyXG4gICAgICAgIHJldHVybiBhcmMoKVxyXG4gICAgICAgICAgICAuaW5uZXJSYWRpdXMob3V0ZXJSYWRpdXMqZmFjdG9yKVxyXG4gICAgICAgICAgICAub3V0ZXJSYWRpdXMob3V0ZXJSYWRpdXMqZmFjdG9yKTtcclxuICAgIH1cclxuXHJcbiAgICBjYWxQbG90QmFja2dyb3VuZCgpIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnM9e1xyXG4gICAgICAgICAgICAuLi50aGlzLm9wdGlvbnMsXHJcbiAgICAgICAgICAgIHBsb3RCYWNrZ3JvdW5kOiB7XHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLm9wdGlvbnMucGxvdEJhY2tncm91bmQsXHJcbiAgICAgICAgICAgICAgICB4OiAwLFxyXG4gICAgICAgICAgICAgICAgeTogMCxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogdGhpcy5vcHRpb25zLmhlaWdodC10aGlzLm9wdGlvbnMueEF4aXMuaGVpZ2h0LXRoaXMub3B0aW9ucy5oZWFkZXIuaGVpZ2h0LXRoaXMub3B0aW9ucy5wYWRkaW5nLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IHRoaXMub3B0aW9ucy53aWR0aC10aGlzLm9wdGlvbnMueUF4aXMud2lkdGgtdGhpcy5vcHRpb25zLnBhZGRpbmdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImNhbFBsb3RCYWNrZ3JvdW5kXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMub3B0aW9ucykpO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlUGllKCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJ0aGlzLmlubmVyU2NhbGUuYmFuZHdpZHRoKCkgXCIrdGhpcy5pbm5lclNjYWxlLmJhbmR3aWR0aCgpKVxyXG4gICAgICAgIHRoaXMucGllcz1bXTtcclxuICAgICAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy5waWVHZW5lcmF0b3IubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGZhY3Rvcj0xLjI7XHJcbiAgICAgICAgICAgIGxldCB0ZW1wT2JqPXtcclxuICAgICAgICAgICAgICAgIHBhdGg6IHRoaXMuY2FsY0FyYy5zdGFydEFuZ2xlKHRoaXMucGllR2VuZXJhdG9yW2ldLnN0YXJ0QW5nbGUpLmVuZEFuZ2xlKHRoaXMucGllR2VuZXJhdG9yW2ldLmVuZEFuZ2xlKSgpLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6IHRoaXMuY29sb3JTY2FsZSh0aGlzLnBpZUdlbmVyYXRvcltpXS5kYXRhLm5hbWUpLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogdGhpcy5waWVHZW5lcmF0b3JbaV0uZGF0YSxcclxuICAgICAgICAgICAgICAgIHBvczogdGhpcy5vdXRlckFyYygpLmNlbnRyb2lkKHRoaXMucGllR2VuZXJhdG9yW2ldKSxcclxuICAgICAgICAgICAgICAgIGxhYmVsUGF0aDogXCJcIixcclxuICAgICAgICAgICAgICAgIHRleHRBbmNob3I6IHRoaXMubWlkQW5nbGUodGhpcy5waWVHZW5lcmF0b3JbaV0pPE1hdGguUEk/ICdzdGFydCc6J2VuZCdcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGVtcE9ialtcInBvc1wiXVswXT1mYWN0b3IqdGhpcy5vcHRpb25zLnBsb3RPcHRpb25zLm91dGVyUmFkaXVzKih0aGlzLm1pZEFuZ2xlKHRoaXMucGllR2VuZXJhdG9yW2ldKTxNYXRoLlBJPyAxOi0xKTtcclxuXHJcbiAgICAgICAgICAgIC8vY3JlYXRlIGEgbGluZSBwYXRoXHJcbiAgICAgICAgICAgIGNvbnN0IGlubmVyUG9zPXRoaXMuY2FsY0FyYy5jZW50cm9pZCh0aGlzLnBpZUdlbmVyYXRvcltpXSk7XHJcbiAgICAgICAgICAgIGxldCBzY2FsZT10ZW1wT2JqW1wicG9zXCJdWzFdL2lubmVyUG9zWzFdO1xyXG4gICAgICAgICAgICBpZiAodGVtcE9ialtcInBvc1wiXVsxXT09PTB8fGlubmVyUG9zWzFdPT09MCkge1xyXG4gICAgICAgICAgICAgICAgc2NhbGU9MTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBvdXRlclBvcz1bc2NhbGUqaW5uZXJQb3NbMF0sIHNjYWxlKmlubmVyUG9zWzFdXTtcclxuICAgICAgICAgICAgdGVtcE9iai5sYWJlbFBhdGg9YE0ke2lubmVyUG9zfUwke291dGVyUG9zfUwke3RlbXBPYmpbXCJwb3NcIl19YDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucGllcy5wdXNoKHRlbXBPYmopO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImFsbCBwaWVzIDogXCIsIHRoaXMucGllcyk7XHJcbiAgICB9XHJcbiAgICBtaWRBbmdsZShkKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gZC5zdGFydEFuZ2xlKyhkLmVuZEFuZ2xlLWQuc3RhcnRBbmdsZSkvMjtcclxuICAgIH1cclxuXHJcbiAgICB5QXhpc1dpZHRoQ2hhbmdlKHsgeUF4aXNXaWR0aCwgeUF4aXNIZWlnaHQgfSkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJ5QXhpc1dpZHRoIFwiK3lBeGlzV2lkdGgpXHJcbiAgICAgICAgdGhpcy5vcHRpb25zPXtcclxuICAgICAgICAgICAgLi4udGhpcy5vcHRpb25zLFxyXG4gICAgICAgICAgICB5QXhpczoge1xyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5vcHRpb25zLnlBeGlzLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IHlBeGlzV2lkdGgsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IHlBeGlzSGVpZ2h0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyggdGhpcy5vcHRpb25zKVxyXG4gICAgICAgIHRoaXMudXBkYXRlKClcclxuICAgIH1cclxuXHJcbiAgICB4QXhpc0hlaWdodENoYW5nZSh7IHhBeGlzSGVpZ2h0IH0pIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnM9e1xyXG4gICAgICAgICAgICAuLi50aGlzLm9wdGlvbnMsXHJcbiAgICAgICAgICAgIHhBeGlzOiB7XHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLm9wdGlvbnMueEF4aXMsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IHhBeGlzSGVpZ2h0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInhBeGlzSGVpZ2h0Q2hhbmdlXCIsIHhBeGlzSGVpZ2h0LCBKU09OLnN0cmluZ2lmeSh0aGlzLm9wdGlvbnMueEF4aXMpKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZSgpXHJcbiAgICB9XHJcbiAgICBoZWFkZXJIZWlnaHRDaGFuZ2UoeyBoZWFkZXJIZWlnaHQgfSkge1xyXG4gICAgICAgIHRoaXMub3B0aW9ucz17XHJcbiAgICAgICAgICAgIC4uLnRoaXMub3B0aW9ucyxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLm9wdGlvbnMuaGVhZGVyLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBoZWFkZXJIZWlnaHRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnVwZGF0ZSgpXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHRvb2xUaXBQbGFjY2VtZW50KGRhdGEpIHtcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmJhclR5cGU9PSd2ZXJ0aWNhbCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGE+MD8gJ3RvcCc6J2JvdHRvbSdcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhPjA/ICdyaWdodCc6J2xlZnQnXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnLCBbJyRldmVudCddKVxyXG4gICAgb25SZXNpemUoZXZlbnQpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMudXBkYXRlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RyVG9OdW1iZXIoc3RyKSB7XHJcbiAgICAgICAgbGV0IG51bWJlclBhdHRlcm49L1xcZCsvZztcclxuICAgICAgICBsZXQgbnVtPXN0ci5tYXRjaChudW1iZXJQYXR0ZXJuKS5qb2luKCcnKVxyXG4gICAgICAgIHJldHVybiBwYXJzZUZsb2F0KG51bSk7XHJcbiAgICB9XHJcbn1cclxuIl19