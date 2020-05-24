/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, ViewEncapsulation, ElementRef, ChangeDetectorRef, HostListener } from "@angular/core";
import { ColorHelper } from '../utils/color.helper';
import { trimLabel } from '../utils/trim-label.helper';
import { arc, pie } from 'd3-shape';
var ngxChartsPieComponent = /** @class */ (function () {
    function ngxChartsPieComponent(chartElement, cdr) {
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
    Object.defineProperty(ngxChartsPieComponent.prototype, "options", {
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
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} changes
     * @return {?}
     */
    ngxChartsPieComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        // this.groupBarPaddingBK=this.options.plotOptions.groupBarPadding;
        // this.innerBarPaddingBK=this.options.plotOptions.innerBarPadding;
        setTimeout((/**
         * @return {?}
         */
        function () { return _this.update(); }));
    };
    /**
     * @return {?}
     */
    ngxChartsPieComponent.prototype.ngOnInit = /**
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
    ngxChartsPieComponent.prototype.update = /**
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
        var xOffset = this.options.width / 2;
        /** @type {?} */
        var yOffset = this.options.header.height + (this.options.plotBackground.height / 2);
        this.translation = "translate(" + xOffset + ", " + yOffset + ")";
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
                if (item.name) {
                    _this.groupName.push({
                        name: item.name,
                        color: _this.colorScale(item.name)
                    });
                }
            }));
            _this.createPie();
        }));
        this.cdr.detectChanges();
    };
    /**
     * @return {?}
     */
    ngxChartsPieComponent.prototype.pieGeneratorFunc = /**
     * @return {?}
     */
    function () {
        return pie()
            .value((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return d.data; }))
            .sort(null)(this.series);
    };
    /**
     * @return {?}
     */
    ngxChartsPieComponent.prototype.calculateArc = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var outerRadius = this.options.plotOptions.outerRadius;
        /** @type {?} */
        var innerRadius = this.options.plotOptions.innerRadius;
        /** @type {?} */
        var cornerRadius = 0;
        return arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
            .cornerRadius(cornerRadius);
    };
    /**
     * @return {?}
     */
    ngxChartsPieComponent.prototype.outerArc = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var factor = 1.2;
        /** @type {?} */
        var outerRadius = this.options.plotOptions.outerRadius;
        return arc()
            .innerRadius(outerRadius * factor)
            .outerRadius(outerRadius * factor);
    };
    /**
     * @return {?}
     */
    ngxChartsPieComponent.prototype.calPlotBackground = /**
     * @return {?}
     */
    function () {
        this.options = tslib_1.__assign({}, this.options, { plotBackground: tslib_1.__assign({}, this.options.plotBackground, { x: 0, y: 0, height: this.options.height - this.options.xAxis.height - this.options.header.height - this.options.padding, width: this.options.width - this.options.yAxis.width - this.options.padding }) });
        // console.log("calPlotBackground", JSON.stringify(this.options));
    };
    /**
     * @return {?}
     */
    ngxChartsPieComponent.prototype.createPie = /**
     * @return {?}
     */
    function () {
        //console.log("this.innerScale.bandwidth() "+this.innerScale.bandwidth())
        this.pies = [];
        for (var i = 0; i < this.pieGenerator.length; i++) {
            /** @type {?} */
            var factor = 1.2;
            /** @type {?} */
            var tempObj = {
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
            var innerPos = this.calcArc.centroid(this.pieGenerator[i]);
            /** @type {?} */
            var scale = tempObj["pos"][1] / innerPos[1];
            if (tempObj["pos"][1] === 0 || innerPos[1] === 0) {
                scale = 1;
            }
            /** @type {?} */
            var outerPos = [scale * innerPos[0], scale * innerPos[1]];
            tempObj.labelPath = "M" + innerPos + "L" + outerPos + "L" + tempObj["pos"];
            this.pies.push(tempObj);
        }
        // console.log("all pies : ", this.pies);
    };
    /**
     * @param {?} d
     * @return {?}
     */
    ngxChartsPieComponent.prototype.midAngle = /**
     * @param {?} d
     * @return {?}
     */
    function (d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
    };
    /**
     * @param {?} __0
     * @return {?}
     */
    ngxChartsPieComponent.prototype.yAxisWidthChange = /**
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
    ngxChartsPieComponent.prototype.xAxisHeightChange = /**
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
    ngxChartsPieComponent.prototype.headerHeightChange = /**
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
    ngxChartsPieComponent.prototype.toolTipPlaccement = /**
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
    ngxChartsPieComponent.prototype.onResize = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
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
    ngxChartsPieComponent.prototype.strToNumber = /**
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
    ngxChartsPieComponent.decorators = [
        { type: Component, args: [{
                    selector: "ngx-charts-pie",
                    template: "<div [style.width]=\"options.width+'px'\" [style.border]=\"'1px solid #f3f3f3'\">\r\n\r\n\r\n    <svg version=\"1.1\" class=\"highcharts-root\" [attr.padding]=\"options.padding\" [attr.width]=\"options.width\"\r\n        [attr.height]=\"options.height\" [attr.viewBox]=\"'0 0 '+options.width +' '+ options.height\"\r\n        aria-label=\"Interactive chart\" [style.border]=\"'0px solid gray'\" [style.padding]=\"options.padding\"\r\n        aria-hidden=\"false\"  >\r\n\r\n        <g header [options]=\"options\" (headerHeightChange)=\"headerHeightChange($event)\"></g>\r\n        <g  \r\n            [attr.transform]=\"translation\" \r\n            *ngFor=\"let pie of pies\" >\r\n            <path  \r\n                class=\"pieSlice\"\r\n                [attr.d]=\"pie.path\"\r\n                [style.fill]=\"pie.color\"\r\n                [tooltip]=\"pie.data.name+', '+pie.data.data\" \r\n                [placement]=\"toolTipPlaccement(pie.data.data)\" \r\n            ></path>\r\n\r\n            <!--label path  -->\r\n            <path  \r\n                class=\"pie\"\r\n                [attr.d]=\"pie.labelPath\"\r\n                [style.stroke]=\"pie.color\"\r\n                fill=\"none\"\r\n            ></path>\r\n\r\n            <text\r\n                [attr.x]=\"pie.pos[0]\" \r\n                [attr.y]=\"pie.pos[1]\"\r\n                [style.textAnchor]=\"pie.textAnchor\"\r\n                [style.shapeRendering]=\"'crispEdges'\"\r\n            >\r\n                {{   options.plotOptions.labelEllipsis ? trimLabel(pie.data.name, options.plotOptions.labelEllipsisSize) :  pie.data.name}}\r\n            </text>\r\n\r\n        </g>\r\n    </svg>\r\n    <chart-legend\r\n        *ngIf=\"groupName.length\"\r\n        [groupName]=\"groupName\"\r\n        [options]=\"options\"\r\n        [series] = \"series\"    \r\n    >\r\n    </chart-legend>\r\n  \r\n</div>\r\n\r\n",
                    // changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styles: [".tooltip-example{text-align:center;padding:0 50px}.tooltip-example [tooltip]{display:inline-block;margin:50px 20px;width:180px;height:50px;border:1px solid gray;border-radius:5px;line-height:50px;text-align:center}.ng-tooltip{position:absolute;max-width:150px;font-size:14px;text-align:center;color:#fafae3;padding:3px 8px;background:#282a36;border-radius:4px;z-index:1000;opacity:0}.ng-tooltip:after{content:\"\";position:absolute;border-style:solid}.ng-tooltip-top:after{top:100%;left:50%;margin-left:-5px;border-width:5px;border-color:#000 transparent transparent}.ng-tooltip-bottom:after{bottom:100%;left:50%;margin-left:-5px;border-width:5px;border-color:transparent transparent #000}.ng-tooltip-left:after{top:50%;left:100%;margin-top:-5px;border-width:5px;border-color:transparent transparent transparent #000}.ng-tooltip-right:after{top:50%;right:100%;margin-top:-5px;border-width:5px;border-color:transparent #000 transparent transparent}.ng-tooltip-show{opacity:1}.pie{stroke-dasharray:2000;stroke-dashoffset:2000;-webkit-animation:1s linear 1.3s forwards pie_frames;animation:1s linear 1.3s forwards pie_frames}@-webkit-keyframes pie_frames{to{stroke-dashoffset:0}}@keyframes pie_frames{to{stroke-dashoffset:0}}.pieSlice{-webkit-animation:1.5s forwards pieSlice_frames;animation:1.5s forwards pieSlice_frames}@-webkit-keyframes pieSlice_frames{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes pieSlice_frames{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}"]
                }] }
    ];
    /** @nocollapse */
    ngxChartsPieComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef }
    ]; };
    ngxChartsPieComponent.propDecorators = {
        options: [{ type: Input }],
        categories: [{ type: Input }],
        series: [{ type: Input }],
        onResize: [{ type: HostListener, args: ['window:resize', ['$event'],] }]
    };
    return ngxChartsPieComponent;
}());
export { ngxChartsPieComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNoYXJ0cy1waWUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHR1c2hhcmdob3NoYmQvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtY2hhcnRzLXBpZS9uZ3gtY2hhcnRzLXBpZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULEtBQUssRUFDTCxpQkFBaUIsRUFJakIsVUFBVSxFQUNWLGlCQUFpQixFQUVqQixZQUFZLEVBQ2YsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUVwQztJQTZISSwrQkFDWSxZQUF3QixFQUN4QixHQUFzQjtRQUR0QixpQkFBWSxHQUFaLFlBQVksQ0FBWTtRQUN4QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQXJIMUIsa0JBQWEsR0FBQztZQUNsQixPQUFPLEVBQUUsVUFBVTtZQUNuQixLQUFLLEVBQUUsRUFBRTtZQUNULFFBQVEsRUFBRSxFQUFFO1lBQ1osTUFBTSxFQUFFLENBQUM7WUFDVCxLQUFLLEVBQUUsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDO1lBQ1YsS0FBSyxFQUFFO2dCQUNILEtBQUssRUFBRSxFQUFFO2dCQUNULE1BQU0sRUFBRSxDQUFDO2dCQUNULGFBQWEsRUFBRSxDQUFDO2dCQUNoQixVQUFVLEVBQUUsTUFBTTtnQkFDbEIsYUFBYSxFQUFFLEtBQUs7Z0JBQ3BCLGlCQUFpQixFQUFDLEVBQUU7YUFDdkI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsYUFBYSxFQUFFLENBQUM7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Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIENvbXBvbmVudCxcclxuICAgIElucHV0LFxyXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXHJcbiAgICBPbkNoYW5nZXMsXHJcbiAgICBPbkluaXQsXHJcbiAgICBTaW1wbGVDaGFuZ2VzLFxyXG4gICAgRWxlbWVudFJlZixcclxuICAgIENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgICBIb3N0TGlzdGVuZXJcclxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5cclxuaW1wb3J0IHsgc2NhbGVCYW5kLCBzY2FsZUxpbmVhciB9IGZyb20gXCJkMy1zY2FsZVwiO1xyXG5pbXBvcnQgeyBDb2xvckhlbHBlciB9IGZyb20gJy4uL3V0aWxzL2NvbG9yLmhlbHBlcic7XHJcbmltcG9ydCB7IHRyaW1MYWJlbCB9IGZyb20gJy4uL3V0aWxzL3RyaW0tbGFiZWwuaGVscGVyJztcclxuaW1wb3J0IHsgYXJjLCBwaWUgfSBmcm9tICdkMy1zaGFwZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIm5neC1jaGFydHMtcGllXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL25neC1jaGFydHMtcGllLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi4vbmd4LWNoYXJ0cy1waWUuY29tcG9uZW50LmNzc1wiXSxcclxuICAgIC8vIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIG5neENoYXJ0c1BpZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0IHtcclxuXHJcbiAgICBwcml2YXRlIGN1c3RvbU9wdGlvbnM9e1xyXG4gICAgICAgIGJhclR5cGU6ICd2ZXJ0aWNhbCcsXHJcbiAgICAgICAgdGl0bGU6ICcnLFxyXG4gICAgICAgIHN1YnRpdGxlOiAnJyxcclxuICAgICAgICBoZWlnaHQ6IDAsXHJcbiAgICAgICAgd2lkdGg6IDAsXHJcbiAgICAgICAgcGFkZGluZzogNSxcclxuICAgICAgICB4QXhpczoge1xyXG4gICAgICAgICAgICB0aXRsZTogJycsXHJcbiAgICAgICAgICAgIGhlaWdodDogMCxcclxuICAgICAgICAgICAgbGFiZWxSb3RhdGlvbjogMCxcclxuICAgICAgICAgICAgbGFiZWxBbGlnbjogJ2xlZnQnLFxyXG4gICAgICAgICAgICBsYWJlbEVsbGlwc2lzOiBmYWxzZSxcclxuICAgICAgICAgICAgbGFiZWxFbGxpcHNpc1NpemU6MTZcclxuICAgICAgICB9LFxyXG4gICAgICAgIHlBeGlzOiB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnJyxcclxuICAgICAgICAgICAgd2lkdGg6IDAsXHJcbiAgICAgICAgICAgIGhlaWdodDogMCxcclxuICAgICAgICAgICAgbGFiZWxSb3RhdGlvbjogMCxcclxuICAgICAgICAgICAgbGFiZWxFbGxpcHNpczogZmFsc2UsXHJcbiAgICAgICAgICAgIGxhYmVsRWxsaXBzaXNTaXplOjE2XHJcbiAgICAgICAgfSxcclxuICAgICAgICBwbG90QmFja2dyb3VuZDoge1xyXG4gICAgICAgICAgICB4OiAwLFxyXG4gICAgICAgICAgICB5OiAwLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDAsXHJcbiAgICAgICAgICAgIHdpZHRoOiAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsZWdlbmQ6IHtcclxuICAgICAgICAgICAgbGFiZWxFbGxpcHNpczogZmFsc2UsXHJcbiAgICAgICAgICAgIGxhYmVsRWxsaXBzaXNTaXplOjE2XHJcbiAgICAgICAgfSxcclxuICAgICAgICBwbG90T3B0aW9uczoge1xyXG4gICAgICAgICAgICBvdXRlclJhZGl1czogODAsXHJcbiAgICAgICAgICAgIGlubmVyUmFkaXVzOiAwLFxyXG4gICAgICAgICAgICBsYWJlbEVsbGlwc2lzOiBmYWxzZSxcclxuICAgICAgICAgICAgbGFiZWxFbGxpcHNpc1NpemU6MTZcclxuICAgICAgICB9LFxyXG4gICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICBoZWlnaHQ6IDAsXHJcbiAgICAgICAgICAgIHdpZHRoOiAwXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIF9vcHRpb25zOiBhbnk9e307XHJcblxyXG4gICAgQElucHV0KCkgc2V0IG9wdGlvbnMob2JqOiBhbnkpIHtcclxuICAgICAgICBsZXQgeEF4aXM9b2JqLnhBeGlzO1xyXG4gICAgICAgIGxldCB5QXhpcz1vYmoueUF4aXM7XHJcbiAgICAgICAgbGV0IGxlZ2VuZD1vYmoubGVnZW5kO1xyXG4gICAgICAgIGxldCBwbG90QmFja2dyb3VuZD1vYmoucGxvdEJhY2tncm91bmQ7XHJcbiAgICAgICAgbGV0IHBsb3RPcHRpb25zPW9iai5wbG90T3B0aW9ucztcclxuICAgICAgICBsZXQgaGVhZGVyPW9iai5oZWFkZXI7XHJcblxyXG4gICAgICAgIGRlbGV0ZSBvYmpbJ3hBeGlzJ107XHJcbiAgICAgICAgZGVsZXRlIG9ialsneUF4aXMnXTtcclxuICAgICAgICBkZWxldGUgb2JqWydsZWdlbmQnXTtcclxuICAgICAgICBkZWxldGUgb2JqWydwbG90QmFja2dyb3VuZCddO1xyXG4gICAgICAgIGRlbGV0ZSBvYmpbJ3Bsb3RPcHRpb25zJ107XHJcbiAgICAgICAgZGVsZXRlIG9ialsnaGVhZGVyJ107XHJcblxyXG4gICAgICAgIHRoaXMuX29wdGlvbnM9e1xyXG4gICAgICAgICAgICAuLi50aGlzLmN1c3RvbU9wdGlvbnMsXHJcbiAgICAgICAgICAgIC4uLm9iaixcclxuICAgICAgICAgICAgeEF4aXM6IHtcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMuY3VzdG9tT3B0aW9ucy54QXhpcyxcclxuICAgICAgICAgICAgICAgIC4uLnhBeGlzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHlBeGlzOiB7XHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLmN1c3RvbU9wdGlvbnMueUF4aXMsXHJcbiAgICAgICAgICAgICAgICAuLi55QXhpc1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBsZWdlbmQ6eyBcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMuY3VzdG9tT3B0aW9ucy5sZWdlbmQsXHJcbiAgICAgICAgICAgICAgICAuLi5sZWdlbmRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcGxvdEJhY2tncm91bmQ6IHtcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMuY3VzdG9tT3B0aW9ucy5wbG90QmFja2dyb3VuZCxcclxuICAgICAgICAgICAgICAgIC4uLnBsb3RCYWNrZ3JvdW5kXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHBsb3RPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLmN1c3RvbU9wdGlvbnMucGxvdE9wdGlvbnMsXHJcbiAgICAgICAgICAgICAgICAuLi5wbG90T3B0aW9uc1xyXG5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLmN1c3RvbU9wdGlvbnMuaGVhZGVyLFxyXG4gICAgICAgICAgICAgICAgLi4uaGVhZGVyXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgZ2V0IG9wdGlvbnMoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fb3B0aW9ucztcclxuICAgIH1cclxuICAgIEBJbnB1dCgpIGNhdGVnb3JpZXM6IGFueT1bXTtcclxuICAgIEBJbnB1dCgpIHNlcmllczogYW55PVtdO1xyXG5cclxuICAgIC8vQElucHV0KCkgZ3JvdXBCYXJQYWRkaW5nPTIwO1xyXG4gICAgLy9ASW5wdXQoKSBpbm5lckJhclBhZGRpbmc9MztcclxuXHJcbiAgICAvLyBzY2FsZTogYW55O1xyXG4gICAgeFNjYWxlOiBhbnk7XHJcbiAgICBpbm5lclNjYWxlOiBhbnk7XHJcbiAgICB5U2NhbGU6IGFueTtcclxuICAgIHBpZXM6IGFueT1bXTtcclxuICAgIGxpbmVDaXJjbGU6IGFueT1bXTtcclxuICAgIGdyb3VwTmFtZTogYW55W109W107XHJcbiAgICAvLyBncm91cEJhclBhZGRpbmdCSzogYW55O1xyXG4gICAgLy8gaW5uZXJCYXJQYWRkaW5nQks6IGFueTtcclxuICAgIGNvbG9yU2NhbGU6IGFueTtcclxuICAgIGNhbGNBcmM6IGFueTtcclxuICAgIHBpZUdlbmVyYXRvcjogYW55O1xyXG4gICAgdHJhbnNsYXRpb246IHN0cmluZz1cIlwiO1xyXG4gICAgdHJpbUxhYmVsOiBhbnk7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIGNoYXJ0RWxlbWVudDogRWxlbWVudFJlZixcclxuICAgICAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHsgXHJcbiAgICAgICAgICAgIHRoaXMudHJpbUxhYmVsID0gdHJpbUxhYmVsO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgICAgICAvLyB0aGlzLmdyb3VwQmFyUGFkZGluZ0JLPXRoaXMub3B0aW9ucy5wbG90T3B0aW9ucy5ncm91cEJhclBhZGRpbmc7XHJcbiAgICAgICAgLy8gdGhpcy5pbm5lckJhclBhZGRpbmdCSz10aGlzLm9wdGlvbnMucGxvdE9wdGlvbnMuaW5uZXJCYXJQYWRkaW5nO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy51cGRhdGUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLndpZHRoPXRoaXMub3B0aW9ucy53aWR0aDtcclxuICAgICAgICB0aGlzLm9wdGlvbnMuaGVpZ2h0PXRoaXMub3B0aW9ucy5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJ0dHR0dHR0XCIsdGhpcy5vcHRpb25zKVxyXG4gICAgICAgIGNvbnN0IGhvc3RFbGVtPXRoaXMuY2hhcnRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICAgICAgbGV0IGRpbXM9aG9zdEVsZW0ucGFyZW50Tm9kZSE9PW51bGw/IGhvc3RFbGVtLnBhcmVudE5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk6eyBoZWlnaHQ6IDQwMCwgd2lkdGg6IDgwMCB9O1xyXG5cclxuICAgICAgICB2YXIgc3R5bGU9aG9zdEVsZW0ucGFyZW50Tm9kZS5jdXJyZW50U3R5bGV8fHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGhvc3RFbGVtLnBhcmVudE5vZGUpO1xyXG5cclxuICAgICAgICB0aGlzLm9wdGlvbnMuaGVpZ2h0PSF0aGlzLm9wdGlvbnMuaGVpZ2h0PyBkaW1zLmhlaWdodC10aGlzLnN0clRvTnVtYmVyKHN0eWxlLnBhZGRpbmdMZWZ0KS10aGlzLnN0clRvTnVtYmVyKHN0eWxlLnBhZGRpbmdSaWdodCk6dGhpcy5vcHRpb25zLmhlaWdodDtcclxuICAgICAgICB0aGlzLm9wdGlvbnMud2lkdGg9IXRoaXMub3B0aW9ucy53aWR0aD8gZGltcy53aWR0aC10aGlzLnN0clRvTnVtYmVyKHN0eWxlLnBhZGRpbmdMZWZ0KS10aGlzLnN0clRvTnVtYmVyKHN0eWxlLnBhZGRpbmdSaWdodCk6ZGltcy53aWR0aC10aGlzLnN0clRvTnVtYmVyKHN0eWxlLnBhZGRpbmdMZWZ0KS10aGlzLnN0clRvTnVtYmVyKHN0eWxlLnBhZGRpbmdSaWdodCk7XHJcblxyXG4gICAgICAgIHRoaXMuY2FsUGxvdEJhY2tncm91bmQoKTtcclxuICAgICAgICBjb25zdCB4T2Zmc2V0PXRoaXMub3B0aW9ucy53aWR0aC8yO1xyXG4gICAgICAgIGNvbnN0IHlPZmZzZXQ9dGhpcy5vcHRpb25zLmhlYWRlci5oZWlnaHQrKHRoaXMub3B0aW9ucy5wbG90QmFja2dyb3VuZC5oZWlnaHQvMik7XHJcbiAgICAgICAgdGhpcy50cmFuc2xhdGlvbj1gdHJhbnNsYXRlKCR7eE9mZnNldH0sICR7eU9mZnNldH0pYDtcclxuICAgICAgICB0aGlzLmNhbGNBcmM9dGhpcy5jYWxjdWxhdGVBcmMoKTtcclxuICAgICAgICB0aGlzLnBpZUdlbmVyYXRvcj10aGlzLnBpZUdlbmVyYXRvckZ1bmMoKTtcclxuXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5waWVHZW5lcmF0b3IpXHJcblxyXG4gICAgICAgIC8vIGxldCBjb3VudEZsYWc9ZmFsc2U7XHJcbiAgICAgICAgLy8gdGhpcy5vcHRpb25zLnBsb3RPcHRpb25zLmdyb3VwQmFyUGFkZGluZz10aGlzLmdyb3VwQmFyUGFkZGluZ0JLO1xyXG4gICAgICAgIC8vIHRoaXMub3B0aW9ucy5wbG90T3B0aW9ucy5pbm5lckJhclBhZGRpbmc9dGhpcy5pbm5lckJhclBhZGRpbmdCSztcclxuICAgICAgICAvLyBkbyB7XHJcbiAgICAgICAgLy8gICAgIGlmIChjb3VudEZsYWc9PXRydWUpIHtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMub3B0aW9ucy5wbG90T3B0aW9ucy5ncm91cEJhclBhZGRpbmctLTtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMub3B0aW9ucy5wbG90T3B0aW9ucy5pbm5lckJhclBhZGRpbmcgPSAyO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gICAgIGlmICh0aGlzLm9wdGlvbnMuYmFyVHlwZT09J3ZlcnRpY2FsJykge1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy54U2NhbGU9dGhpcy5nZXRYU2NhbGUoKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICBlbHNlIHsgXHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnlTY2FsZT10aGlzLmdldFhTY2FsZSgpO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gICAgIHRoaXMuaW5uZXJTY2FsZT10aGlzLmdldElubmVyU2NhbGUoKTtcclxuICAgICAgICAvLyAgICAgY291bnRGbGFnPXRydWU7XHJcbiAgICAgICAgLy8gfSB3aGlsZSAodGhpcy5pbm5lclNjYWxlLmJhbmR3aWR0aCgpPDIpO1xyXG4gICAgICAgIC8vIFxyXG5cclxuICAgICAgICAvLyBpZiAodGhpcy5vcHRpb25zLmJhclR5cGU9PSd2ZXJ0aWNhbCcpIHtcclxuICAgICAgICAvLyAgICAgdGhpcy55U2NhbGU9dGhpcy5nZXRZU2NhbGUoKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gZWxzZSB7IFxyXG4gICAgICAgIC8vICAgICB0aGlzLnhTY2FsZT10aGlzLmdldFlTY2FsZSgpO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgbGV0IGNvbG9ySGVscGVyPW5ldyBDb2xvckhlbHBlcih0aGlzLm9wdGlvbnMsIHRoaXMuc2VyaWVzKTtcclxuICAgICAgICB0aGlzLmNvbG9yU2NhbGU9Y29sb3JIZWxwZXIuZ2VuZXJhdGVDb2xvclNjYWxlKCk7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmdyb3VwTmFtZT1bXTtcclxuICAgICAgICAgICAgdGhpcy5zZXJpZXMubWFwKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0ubmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXBOYW1lLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBpdGVtLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB0aGlzLmNvbG9yU2NhbGUoaXRlbS5uYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVBpZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwaWVHZW5lcmF0b3JGdW5jKCkge1xyXG4gICAgICAgIHJldHVybiBwaWUoKVxyXG4gICAgICAgICAgICAudmFsdWUoZCA9PiBkLmRhdGEpXHJcbiAgICAgICAgICAgIC5zb3J0KG51bGwpKHRoaXMuc2VyaWVzKTtcclxuICAgIH1cclxuXHJcbiAgICBjYWxjdWxhdGVBcmMoKTogYW55IHtcclxuICAgICAgICBsZXQgb3V0ZXJSYWRpdXM9dGhpcy5vcHRpb25zLnBsb3RPcHRpb25zLm91dGVyUmFkaXVzO1xyXG4gICAgICAgIGxldCBpbm5lclJhZGl1cz10aGlzLm9wdGlvbnMucGxvdE9wdGlvbnMuaW5uZXJSYWRpdXM7XHJcbiAgICAgICAgbGV0IGNvcm5lclJhZGl1cz0wO1xyXG4gICAgICAgIHJldHVybiBhcmMoKVxyXG4gICAgICAgICAgICAuaW5uZXJSYWRpdXMoaW5uZXJSYWRpdXMpXHJcbiAgICAgICAgICAgIC5vdXRlclJhZGl1cyhvdXRlclJhZGl1cylcclxuICAgICAgICAgICAgLmNvcm5lclJhZGl1cyhjb3JuZXJSYWRpdXMpO1xyXG4gICAgfVxyXG5cclxuICAgIG91dGVyQXJjKCk6IGFueSB7XHJcbiAgICAgICAgY29uc3QgZmFjdG9yPTEuMjtcclxuICAgICAgICBsZXQgb3V0ZXJSYWRpdXM9dGhpcy5vcHRpb25zLnBsb3RPcHRpb25zLm91dGVyUmFkaXVzO1xyXG4gICAgICAgIHJldHVybiBhcmMoKVxyXG4gICAgICAgICAgICAuaW5uZXJSYWRpdXMob3V0ZXJSYWRpdXMqZmFjdG9yKVxyXG4gICAgICAgICAgICAub3V0ZXJSYWRpdXMob3V0ZXJSYWRpdXMqZmFjdG9yKTtcclxuICAgIH1cclxuXHJcbiAgICBjYWxQbG90QmFja2dyb3VuZCgpIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnM9e1xyXG4gICAgICAgICAgICAuLi50aGlzLm9wdGlvbnMsXHJcbiAgICAgICAgICAgIHBsb3RCYWNrZ3JvdW5kOiB7XHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLm9wdGlvbnMucGxvdEJhY2tncm91bmQsXHJcbiAgICAgICAgICAgICAgICB4OiAwLFxyXG4gICAgICAgICAgICAgICAgeTogMCxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogdGhpcy5vcHRpb25zLmhlaWdodC10aGlzLm9wdGlvbnMueEF4aXMuaGVpZ2h0LXRoaXMub3B0aW9ucy5oZWFkZXIuaGVpZ2h0LXRoaXMub3B0aW9ucy5wYWRkaW5nLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IHRoaXMub3B0aW9ucy53aWR0aC10aGlzLm9wdGlvbnMueUF4aXMud2lkdGgtdGhpcy5vcHRpb25zLnBhZGRpbmdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImNhbFBsb3RCYWNrZ3JvdW5kXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMub3B0aW9ucykpO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlUGllKCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJ0aGlzLmlubmVyU2NhbGUuYmFuZHdpZHRoKCkgXCIrdGhpcy5pbm5lclNjYWxlLmJhbmR3aWR0aCgpKVxyXG4gICAgICAgIHRoaXMucGllcz1bXTtcclxuICAgICAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy5waWVHZW5lcmF0b3IubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGZhY3Rvcj0xLjI7XHJcbiAgICAgICAgICAgIGxldCB0ZW1wT2JqPXtcclxuICAgICAgICAgICAgICAgIHBhdGg6IHRoaXMuY2FsY0FyYy5zdGFydEFuZ2xlKHRoaXMucGllR2VuZXJhdG9yW2ldLnN0YXJ0QW5nbGUpLmVuZEFuZ2xlKHRoaXMucGllR2VuZXJhdG9yW2ldLmVuZEFuZ2xlKSgpLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6IHRoaXMuY29sb3JTY2FsZSh0aGlzLnBpZUdlbmVyYXRvcltpXS5kYXRhLm5hbWUpLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogdGhpcy5waWVHZW5lcmF0b3JbaV0uZGF0YSxcclxuICAgICAgICAgICAgICAgIHBvczogdGhpcy5vdXRlckFyYygpLmNlbnRyb2lkKHRoaXMucGllR2VuZXJhdG9yW2ldKSxcclxuICAgICAgICAgICAgICAgIGxhYmVsUGF0aDogXCJcIixcclxuICAgICAgICAgICAgICAgIHRleHRBbmNob3I6IHRoaXMubWlkQW5nbGUodGhpcy5waWVHZW5lcmF0b3JbaV0pPE1hdGguUEk/ICdzdGFydCc6J2VuZCdcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGVtcE9ialtcInBvc1wiXVswXT1mYWN0b3IqdGhpcy5vcHRpb25zLnBsb3RPcHRpb25zLm91dGVyUmFkaXVzKih0aGlzLm1pZEFuZ2xlKHRoaXMucGllR2VuZXJhdG9yW2ldKTxNYXRoLlBJPyAxOi0xKTtcclxuXHJcbiAgICAgICAgICAgIC8vY3JlYXRlIGEgbGluZSBwYXRoXHJcbiAgICAgICAgICAgIGNvbnN0IGlubmVyUG9zPXRoaXMuY2FsY0FyYy5jZW50cm9pZCh0aGlzLnBpZUdlbmVyYXRvcltpXSk7XHJcbiAgICAgICAgICAgIGxldCBzY2FsZT10ZW1wT2JqW1wicG9zXCJdWzFdL2lubmVyUG9zWzFdO1xyXG4gICAgICAgICAgICBpZiAodGVtcE9ialtcInBvc1wiXVsxXT09PTB8fGlubmVyUG9zWzFdPT09MCkge1xyXG4gICAgICAgICAgICAgICAgc2NhbGU9MTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBvdXRlclBvcz1bc2NhbGUqaW5uZXJQb3NbMF0sIHNjYWxlKmlubmVyUG9zWzFdXTtcclxuICAgICAgICAgICAgdGVtcE9iai5sYWJlbFBhdGg9YE0ke2lubmVyUG9zfUwke291dGVyUG9zfUwke3RlbXBPYmpbXCJwb3NcIl19YDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucGllcy5wdXNoKHRlbXBPYmopO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImFsbCBwaWVzIDogXCIsIHRoaXMucGllcyk7XHJcbiAgICB9XHJcbiAgICBtaWRBbmdsZShkKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gZC5zdGFydEFuZ2xlKyhkLmVuZEFuZ2xlLWQuc3RhcnRBbmdsZSkvMjtcclxuICAgIH1cclxuXHJcbiAgICB5QXhpc1dpZHRoQ2hhbmdlKHsgeUF4aXNXaWR0aCwgeUF4aXNIZWlnaHQgfSkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJ5QXhpc1dpZHRoIFwiK3lBeGlzV2lkdGgpXHJcbiAgICAgICAgdGhpcy5vcHRpb25zPXtcclxuICAgICAgICAgICAgLi4udGhpcy5vcHRpb25zLFxyXG4gICAgICAgICAgICB5QXhpczoge1xyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5vcHRpb25zLnlBeGlzLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IHlBeGlzV2lkdGgsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IHlBeGlzSGVpZ2h0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyggdGhpcy5vcHRpb25zKVxyXG4gICAgICAgIHRoaXMudXBkYXRlKClcclxuICAgIH1cclxuXHJcbiAgICB4QXhpc0hlaWdodENoYW5nZSh7IHhBeGlzSGVpZ2h0IH0pIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnM9e1xyXG4gICAgICAgICAgICAuLi50aGlzLm9wdGlvbnMsXHJcbiAgICAgICAgICAgIHhBeGlzOiB7XHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLm9wdGlvbnMueEF4aXMsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IHhBeGlzSGVpZ2h0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInhBeGlzSGVpZ2h0Q2hhbmdlXCIsIHhBeGlzSGVpZ2h0LCBKU09OLnN0cmluZ2lmeSh0aGlzLm9wdGlvbnMueEF4aXMpKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZSgpXHJcbiAgICB9XHJcbiAgICBoZWFkZXJIZWlnaHRDaGFuZ2UoeyBoZWFkZXJIZWlnaHQgfSkge1xyXG4gICAgICAgIHRoaXMub3B0aW9ucz17XHJcbiAgICAgICAgICAgIC4uLnRoaXMub3B0aW9ucyxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLm9wdGlvbnMuaGVhZGVyLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBoZWFkZXJIZWlnaHRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnVwZGF0ZSgpXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHRvb2xUaXBQbGFjY2VtZW50KGRhdGEpIHtcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmJhclR5cGU9PSd2ZXJ0aWNhbCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGE+MD8gJ3RvcCc6J2JvdHRvbSdcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhPjA/ICdyaWdodCc6J2xlZnQnXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnLCBbJyRldmVudCddKVxyXG4gICAgb25SZXNpemUoZXZlbnQpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMudXBkYXRlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RyVG9OdW1iZXIoc3RyKSB7XHJcbiAgICAgICAgbGV0IG51bWJlclBhdHRlcm49L1xcZCsvZztcclxuICAgICAgICBsZXQgbnVtPXN0ci5tYXRjaChudW1iZXJQYXR0ZXJuKS5qb2luKCcnKVxyXG4gICAgICAgIHJldHVybiBwYXJzZUZsb2F0KG51bSk7XHJcbiAgICB9XHJcbn1cclxuIl19