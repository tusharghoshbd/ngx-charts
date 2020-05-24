/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { trimLabel } from '../../utils/trim-label.helper';
var XAxisComponent = /** @class */ (function () {
    function XAxisComponent() {
        this.categories = [];
        this.series = [];
        this.xAxisHeightChange = new EventEmitter();
        this.ticks = [];
        this.trimLabel = trimLabel;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    XAxisComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        // console.log("-----------------------")
        //console.log(this.options)
        //console.log(this.xScale)
        this.update();
    };
    /**
     * @return {?}
     */
    XAxisComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * @return {?}
     */
    XAxisComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var xAxisHeight = parseInt(_this.xAxisHeightEl.nativeElement.getBoundingClientRect().height, 10) + 10;
            // if (xAxisHeight<50)
            //     xAxisHeight=50;
            // console.log("x height ", xAxisHeight)
            if (xAxisHeight !== _this.options.xAxis.height) {
                // console.log("ngAfterViewInit", "xxxxxxxxxx", xAxisHeight, this.options.xAxis.height)
                _this.xAxisHeightChange.emit({ xAxisHeight: xAxisHeight });
            }
        }), 0);
    };
    /**
     * @return {?}
     */
    XAxisComponent.prototype.update = /**
     * @return {?}
     */
    function () {
        if (this.options.barType == "vertical") {
            this.ticks = this.yScale.nice().ticks();
        }
        else {
            this.ticks = this.xScale.nice().ticks();
        }
        this.ngAfterViewInit();
    };
    /**
     * @param {?} item
     * @return {?}
     */
    XAxisComponent.prototype.xTransformRotate = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (this.options.barType == "vertical") {
            return "rotate(" + this.options.xAxis.labelRotation + ", " + (this.xScale(item) + (this.xScale.bandwidth() / 2) + this.options.yAxis.width) + ", " + (this.options.height - 20) + ")";
        }
        else {
            return "rotate(" + this.options.xAxis.labelRotation + ", " + (this.xScale(item) + this.options.yAxis.width) + ", " + (this.options.height - this.options.xAxis.height + 20) + ")";
        }
    };
    /**
     * @param {?} tick
     * @return {?}
     */
    XAxisComponent.prototype.pathDirection = /**
     * @param {?} tick
     * @return {?}
     */
    function (tick) {
        return 'M ' + (this.xScale(tick) + this.options.yAxis.width) + ' ' + (this.options.header.height) + ' L ' + (this.xScale(tick) + this.options.yAxis.width) + ' ' + (this.options.height - this.options.xAxis.height);
    };
    XAxisComponent.decorators = [
        { type: Component, args: [{
                    selector: 'g[x-axis]',
                    template: "\n<svg>\n    <g #xAxisHeightEl data-z-index=\"20\" height=\"70\"> \n        <g class=\"highcharts-axis highcharts-yaxis\" data-z-index=\"2\" aria-hidden=\"true\" >\n            <text [attr.x]=\"options.width/2\" [attr.y]=\"options.height-10\" text-anchor=\"middle\" dominant-baseline=\"central\"  style=\"margin-bottom: 50px; color:#666666;cursor:default;font-size:11px;fill:#666666;\"\n                class=\"highcharts-axis-title\"\n                >\n                {{options.xAxis ? options.xAxis.title : \"\"}}\n            </text>\n        </g>\n        \n        <g class=\"highcharts-axis-labels highcharts-xaxis-labels\" data-z-index=\"7\" aria-hidden=\"true\"\n            *ngIf=\"options.barType == 'vertical'\">\n            <text \n                *ngFor=\"let item of categories; let i = index;let f = first;\"\n                [attr.x] = 'xScale(item) + (xScale.bandwidth()/2)+options.yAxis.width'\n                [attr.y] = \"options.height-30\"\n                [attr.transform]=\"xTransformRotate(item)\"\n                [attr.text-anchor]=\"options.xAxis.labelAlign\"\n                style=\"color:#666666;cursor:default;font-size:11px;fill:#666666;\"\n                opacity=\"1\">{{ options.xAxis.labelEllipsis ? trimLabel(item,  options.xAxis.labelEllipsisSize) :item}}</text>\n        </g> \n\n        <g class=\"highcharts-axis-labels highcharts-yaxis-labels\" data-z-index=\"7\" aria-hidden=\"true\"\n            *ngIf=\"options.barType == 'horizontal'\">\n            <text style=\"color:#666666;cursor:default;font-size:11px;fill:#666666;\" \n                text-anchor=\"middle\"\n                *ngFor=\"let tick of ticks\" \n                [attr.x] = 'xScale(tick) + options.yAxis.width'\n                [attr.y] = \"options.height - 30\"\n                [attr.transform]=\"xTransformRotate(tick)\"\n                opacity=\"1\">{{ options.xAxis.labelEllipsis ? trimLabel(tick,  options.xAxis.labelEllipsisSize) :tick}}</text>\n        </g>\n    </g>\n    <g *ngIf=\"options.barType == 'horizontal'\" class=\"highcharts-grid highcharts-yaxis-grid\" data-z-index=\"1\" aria-hidden=\"true\">\n        <path fill=\"none\" stroke=\"#e6e6e6\" stroke-width=\"1\" data-z-index=\"1\" class=\"highcharts-grid-line\"\n            *ngFor=\"let tick of ticks\" [attr.d]=\"pathDirection(tick)\" opacity=\"1\">\n        </path>\n    </g>\n</svg>\n",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    XAxisComponent.ctorParameters = function () { return []; };
    XAxisComponent.propDecorators = {
        xScale: [{ type: Input }],
        yScale: [{ type: Input }],
        options: [{ type: Input }],
        categories: [{ type: Input }],
        series: [{ type: Input }],
        xAxisHeightEl: [{ type: ViewChild, args: ['xAxisHeightEl', { read: ElementRef, static: false },] }],
        xAxisHeightChange: [{ type: Output }]
    };
    return XAxisComponent;
}());
export { XAxisComponent };
if (false) {
    /** @type {?} */
    XAxisComponent.prototype.xScale;
    /** @type {?} */
    XAxisComponent.prototype.yScale;
    /** @type {?} */
    XAxisComponent.prototype.options;
    /** @type {?} */
    XAxisComponent.prototype.categories;
    /** @type {?} */
    XAxisComponent.prototype.series;
    /** @type {?} */
    XAxisComponent.prototype.xAxisHeightEl;
    /** @type {?} */
    XAxisComponent.prototype.xAxisHeightChange;
    /** @type {?} */
    XAxisComponent.prototype.ticks;
    /** @type {?} */
    XAxisComponent.prototype.trimLabel;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieC1heGlzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0dXNoYXJnaG9zaGJkL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvYXhlcy94LWF4aXMveC1heGlzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBcUIsS0FBSyxFQUFpQixTQUFTLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRS9JLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUUxRDtJQW1CSTtRQVJTLGVBQVUsR0FBTSxFQUFFLENBQUM7UUFDbkIsV0FBTSxHQUFNLEVBQUUsQ0FBQztRQUdkLHNCQUFpQixHQUFDLElBQUksWUFBWSxFQUFFLENBQUM7UUFFL0MsVUFBSyxHQUFRLEVBQUUsQ0FBQztRQUdaLElBQUksQ0FBQyxTQUFTLEdBQUMsU0FBUyxDQUFDO0lBQzdCLENBQUM7Ozs7O0lBRUQsb0NBQVc7Ozs7SUFBWCxVQUFZLE9BQXNCO1FBQzlCLHlDQUF5QztRQUN6QywyQkFBMkI7UUFDM0IsMEJBQTBCO1FBQzFCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsQixDQUFDOzs7O0lBRUQsaUNBQVE7OztJQUFSLGNBQWEsQ0FBQzs7OztJQUVkLHdDQUFlOzs7SUFBZjtRQUFBLGlCQVlDO1FBWEcsVUFBVTs7O1FBQUM7O2dCQUNILFdBQVcsR0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEdBQUMsRUFBRTtZQUNoRyxzQkFBc0I7WUFDdEIsc0JBQXNCO1lBQ3RCLHdDQUF3QztZQUN4QyxJQUFJLFdBQVcsS0FBRyxLQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7Z0JBQ3pDLHVGQUF1RjtnQkFDdkYsS0FBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxFQUFFLFdBQVcsYUFBQSxFQUFFLENBQUMsQ0FBQzthQUNoRDtRQUNMLENBQUMsR0FBRSxDQUFDLENBQUMsQ0FBQztJQUVWLENBQUM7Ozs7SUFFRCwrQkFBTTs7O0lBQU47UUFDSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFFLFVBQVUsRUFBRTtZQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDekM7YUFDSTtZQUNELElBQUksQ0FBQyxLQUFLLEdBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUN6QztRQUNELElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMzQixDQUFDOzs7OztJQUNELHlDQUFnQjs7OztJQUFoQixVQUFpQixJQUFJO1FBQ2pCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUUsVUFBVSxFQUFFO1lBQ2xDLE9BQU8sU0FBUyxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLGFBQWEsR0FBQyxJQUFJLEdBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsR0FBQyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBQyxJQUFJLEdBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBQyxFQUFFLENBQUMsR0FBQyxHQUFHLENBQUM7U0FDcks7YUFDSTtZQUNELE9BQU8sU0FBUyxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLGFBQWEsR0FBQyxJQUFJLEdBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFDLElBQUksR0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBQyxFQUFFLENBQUMsR0FBQyxHQUFHLENBQUM7U0FDbks7SUFFTCxDQUFDOzs7OztJQUVELHNDQUFhOzs7O0lBQWIsVUFBYyxJQUFJO1FBQ2QsT0FBTyxJQUFJLEdBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFDLEdBQUcsR0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFDLEtBQUssR0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUMsR0FBRyxHQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDck0sQ0FBQzs7Z0JBbkVKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsV0FBVztvQkFDckIsbTFFQUFzQzs7aUJBRXpDOzs7Ozt5QkFHSSxLQUFLO3lCQUNMLEtBQUs7MEJBQ0wsS0FBSzs2QkFFTCxLQUFLO3lCQUNMLEtBQUs7Z0NBRUwsU0FBUyxTQUFDLGVBQWUsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtvQ0FDOUQsTUFBTTs7SUF5RFgscUJBQUM7Q0FBQSxBQXhFRCxJQXdFQztTQW5FWSxjQUFjOzs7SUFFdkIsZ0NBQXFCOztJQUNyQixnQ0FBcUI7O0lBQ3JCLGlDQUFzQjs7SUFFdEIsb0NBQTRCOztJQUM1QixnQ0FBd0I7O0lBRXhCLHVDQUEyRjs7SUFDM0YsMkNBQStDOztJQUUvQywrQkFBZ0I7O0lBQ2hCLG1DQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uQ2hhbmdlcywgSW5wdXQsIEFmdGVyVmlld0luaXQsIFZpZXdDaGlsZCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEVsZW1lbnRSZWYsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgdHJpbUxhYmVsIH0gZnJvbSAnLi4vLi4vdXRpbHMvdHJpbS1sYWJlbC5oZWxwZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2dbeC1heGlzXScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3gtYXhpcy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4veC1heGlzLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBYQXhpc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0IHtcblxuICAgIEBJbnB1dCgpIHhTY2FsZTogYW55O1xuICAgIEBJbnB1dCgpIHlTY2FsZTogYW55O1xuICAgIEBJbnB1dCgpIG9wdGlvbnM6IGFueTtcblxuICAgIEBJbnB1dCgpIGNhdGVnb3JpZXM6IGFueT1bXTtcbiAgICBASW5wdXQoKSBzZXJpZXM6IGFueT1bXTtcblxuICAgIEBWaWV3Q2hpbGQoJ3hBeGlzSGVpZ2h0RWwnLCB7IHJlYWQ6IEVsZW1lbnRSZWYsIHN0YXRpYzogZmFsc2UgfSkgeEF4aXNIZWlnaHRFbDogRWxlbWVudFJlZjtcbiAgICBAT3V0cHV0KCkgeEF4aXNIZWlnaHRDaGFuZ2U9bmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgdGlja3M6IGFueVtdPVtdO1xuICAgIHRyaW1MYWJlbDogYW55O1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnRyaW1MYWJlbD10cmltTGFiZWw7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXCIpXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5vcHRpb25zKVxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMueFNjYWxlKVxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkgeyB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHhBeGlzSGVpZ2h0PXBhcnNlSW50KHRoaXMueEF4aXNIZWlnaHRFbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCwgMTApKzEwO1xuICAgICAgICAgICAgLy8gaWYgKHhBeGlzSGVpZ2h0PDUwKVxuICAgICAgICAgICAgLy8gICAgIHhBeGlzSGVpZ2h0PTUwO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJ4IGhlaWdodCBcIiwgeEF4aXNIZWlnaHQpXG4gICAgICAgICAgICBpZiAoeEF4aXNIZWlnaHQhPT10aGlzLm9wdGlvbnMueEF4aXMuaGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJuZ0FmdGVyVmlld0luaXRcIiwgXCJ4eHh4eHh4eHh4XCIsIHhBeGlzSGVpZ2h0LCB0aGlzLm9wdGlvbnMueEF4aXMuaGVpZ2h0KVxuICAgICAgICAgICAgICAgIHRoaXMueEF4aXNIZWlnaHRDaGFuZ2UuZW1pdCh7IHhBeGlzSGVpZ2h0IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAwKTtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmJhclR5cGU9PVwidmVydGljYWxcIikge1xuICAgICAgICAgICAgdGhpcy50aWNrcz10aGlzLnlTY2FsZS5uaWNlKCkudGlja3MoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudGlja3M9dGhpcy54U2NhbGUubmljZSgpLnRpY2tzKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5uZ0FmdGVyVmlld0luaXQoKTtcbiAgICB9XG4gICAgeFRyYW5zZm9ybVJvdGF0ZShpdGVtKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYmFyVHlwZT09XCJ2ZXJ0aWNhbFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJyb3RhdGUoXCIrdGhpcy5vcHRpb25zLnhBeGlzLmxhYmVsUm90YXRpb24rXCIsIFwiKyh0aGlzLnhTY2FsZShpdGVtKSsodGhpcy54U2NhbGUuYmFuZHdpZHRoKCkvMikrdGhpcy5vcHRpb25zLnlBeGlzLndpZHRoKStcIiwgXCIrKHRoaXMub3B0aW9ucy5oZWlnaHQtMjApK1wiKVwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFwicm90YXRlKFwiK3RoaXMub3B0aW9ucy54QXhpcy5sYWJlbFJvdGF0aW9uK1wiLCBcIisodGhpcy54U2NhbGUoaXRlbSkrdGhpcy5vcHRpb25zLnlBeGlzLndpZHRoKStcIiwgXCIrKHRoaXMub3B0aW9ucy5oZWlnaHQtdGhpcy5vcHRpb25zLnhBeGlzLmhlaWdodCsyMCkrXCIpXCI7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHBhdGhEaXJlY3Rpb24odGljaykge1xuICAgICAgICByZXR1cm4gJ00gJysodGhpcy54U2NhbGUodGljaykrdGhpcy5vcHRpb25zLnlBeGlzLndpZHRoKSsnICcrKHRoaXMub3B0aW9ucy5oZWFkZXIuaGVpZ2h0KSsnIEwgJysodGhpcy54U2NhbGUodGljaykrdGhpcy5vcHRpb25zLnlBeGlzLndpZHRoKSsnICcrKHRoaXMub3B0aW9ucy5oZWlnaHQtdGhpcy5vcHRpb25zLnhBeGlzLmhlaWdodCk7XG4gICAgfVxuXG5cblxuXG59XG4iXX0=