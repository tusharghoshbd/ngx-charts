/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { trimLabel } from '../../utils/trim-label.helper';
export class XAxisComponent {
    constructor() {
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
    ngOnChanges(changes) {
        // console.log("-----------------------")
        //console.log(this.options)
        //console.log(this.xScale)
        this.update();
    }
    /**
     * @return {?}
     */
    ngOnInit() { }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        setTimeout((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            let xAxisHeight = parseInt(this.xAxisHeightEl.nativeElement.getBoundingClientRect().height, 10) + 10;
            // if (xAxisHeight<50)
            //     xAxisHeight=50;
            // console.log("x height ", xAxisHeight)
            if (xAxisHeight !== this.options.xAxis.height) {
                // console.log("ngAfterViewInit", "xxxxxxxxxx", xAxisHeight, this.options.xAxis.height)
                this.xAxisHeightChange.emit({ xAxisHeight });
            }
        }), 0);
    }
    /**
     * @return {?}
     */
    update() {
        if (this.options.barType == "vertical") {
            this.ticks = this.yScale.nice().ticks();
        }
        else {
            this.ticks = this.xScale.nice().ticks();
        }
        this.ngAfterViewInit();
    }
    /**
     * @param {?} item
     * @return {?}
     */
    xTransformRotate(item) {
        if (this.options.barType == "vertical") {
            return "rotate(" + this.options.xAxis.labelRotation + ", " + (this.xScale(item) + (this.xScale.bandwidth() / 2) + this.options.yAxis.width) + ", " + (this.options.height - 20) + ")";
        }
        else {
            return "rotate(" + this.options.xAxis.labelRotation + ", " + (this.xScale(item) + this.options.yAxis.width) + ", " + (this.options.height - this.options.xAxis.height + 20) + ")";
        }
    }
    /**
     * @param {?} tick
     * @return {?}
     */
    pathDirection(tick) {
        return 'M ' + (this.xScale(tick) + this.options.yAxis.width) + ' ' + (this.options.header.height) + ' L ' + (this.xScale(tick) + this.options.yAxis.width) + ' ' + (this.options.height - this.options.xAxis.height);
    }
}
XAxisComponent.decorators = [
    { type: Component, args: [{
                selector: 'g[x-axis]',
                template: "\n<svg>\n    <g #xAxisHeightEl data-z-index=\"20\" height=\"70\"> \n        <g class=\"highcharts-axis highcharts-yaxis\" data-z-index=\"2\" aria-hidden=\"true\" >\n            <text [attr.x]=\"options.width/2\" [attr.y]=\"options.height-10\" text-anchor=\"middle\" dominant-baseline=\"central\"  style=\"margin-bottom: 50px; color:#666666;cursor:default;font-size:11px;fill:#666666;\"\n                class=\"highcharts-axis-title\"\n                >\n                {{options.xAxis ? options.xAxis.title : \"\"}}\n            </text>\n        </g>\n        \n        <g class=\"highcharts-axis-labels highcharts-xaxis-labels\" data-z-index=\"7\" aria-hidden=\"true\"\n            *ngIf=\"options.barType == 'vertical'\">\n            <text \n                *ngFor=\"let item of categories; let i = index;let f = first;\"\n                [attr.x] = 'xScale(item) + (xScale.bandwidth()/2)+options.yAxis.width'\n                [attr.y] = \"options.height-30\"\n                [attr.transform]=\"xTransformRotate(item)\"\n                [attr.text-anchor]=\"options.xAxis.labelAlign\"\n                style=\"color:#666666;cursor:default;font-size:11px;fill:#666666;\"\n                opacity=\"1\">{{ options.xAxis.labelEllipsis ? trimLabel(item,  options.xAxis.labelEllipsisSize) :item}}</text>\n        </g> \n\n        <g class=\"highcharts-axis-labels highcharts-yaxis-labels\" data-z-index=\"7\" aria-hidden=\"true\"\n            *ngIf=\"options.barType == 'horizontal'\">\n            <text style=\"color:#666666;cursor:default;font-size:11px;fill:#666666;\" \n                text-anchor=\"middle\"\n                *ngFor=\"let tick of ticks\" \n                [attr.x] = 'xScale(tick) + options.yAxis.width'\n                [attr.y] = \"options.height - 30\"\n                [attr.transform]=\"xTransformRotate(tick)\"\n                opacity=\"1\">{{ options.xAxis.labelEllipsis ? trimLabel(tick,  options.xAxis.labelEllipsisSize) :tick}}</text>\n        </g>\n    </g>\n    <g *ngIf=\"options.barType == 'horizontal'\" class=\"highcharts-grid highcharts-yaxis-grid\" data-z-index=\"1\" aria-hidden=\"true\">\n        <path fill=\"none\" stroke=\"#e6e6e6\" stroke-width=\"1\" data-z-index=\"1\" class=\"highcharts-grid-line\"\n            *ngFor=\"let tick of ticks\" [attr.d]=\"pathDirection(tick)\" opacity=\"1\">\n        </path>\n    </g>\n</svg>\n",
                styles: [""]
            }] }
];
/** @nocollapse */
XAxisComponent.ctorParameters = () => [];
XAxisComponent.propDecorators = {
    xScale: [{ type: Input }],
    yScale: [{ type: Input }],
    options: [{ type: Input }],
    categories: [{ type: Input }],
    series: [{ type: Input }],
    xAxisHeightEl: [{ type: ViewChild, args: ['xAxisHeightEl', { read: ElementRef, static: false },] }],
    xAxisHeightChange: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieC1heGlzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0dXNoYXJnaG9zaGJkL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvYXhlcy94LWF4aXMveC1heGlzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBcUIsS0FBSyxFQUFpQixTQUFTLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRS9JLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQU8xRCxNQUFNLE9BQU8sY0FBYztJQWN2QjtRQVJTLGVBQVUsR0FBTSxFQUFFLENBQUM7UUFDbkIsV0FBTSxHQUFNLEVBQUUsQ0FBQztRQUdkLHNCQUFpQixHQUFDLElBQUksWUFBWSxFQUFFLENBQUM7UUFFL0MsVUFBSyxHQUFRLEVBQUUsQ0FBQztRQUdaLElBQUksQ0FBQyxTQUFTLEdBQUMsU0FBUyxDQUFDO0lBQzdCLENBQUM7Ozs7O0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQzlCLHlDQUF5QztRQUN6QywyQkFBMkI7UUFDM0IsMEJBQTBCO1FBQzFCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsQixDQUFDOzs7O0lBRUQsUUFBUSxLQUFLLENBQUM7Ozs7SUFFZCxlQUFlO1FBQ1gsVUFBVTs7O1FBQUMsR0FBRyxFQUFFOztnQkFDUixXQUFXLEdBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxHQUFDLEVBQUU7WUFDaEcsc0JBQXNCO1lBQ3RCLHNCQUFzQjtZQUN0Qix3Q0FBd0M7WUFDeEMsSUFBSSxXQUFXLEtBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO2dCQUN6Qyx1RkFBdUY7Z0JBQ3ZGLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO2FBQ2hEO1FBQ0wsQ0FBQyxHQUFFLENBQUMsQ0FBQyxDQUFDO0lBRVYsQ0FBQzs7OztJQUVELE1BQU07UUFDRixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFFLFVBQVUsRUFBRTtZQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDekM7YUFDSTtZQUNELElBQUksQ0FBQyxLQUFLLEdBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUN6QztRQUNELElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMzQixDQUFDOzs7OztJQUNELGdCQUFnQixDQUFDLElBQUk7UUFDakIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBRSxVQUFVLEVBQUU7WUFDbEMsT0FBTyxTQUFTLEdBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFDLElBQUksR0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxHQUFDLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFDLElBQUksR0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFDLEVBQUUsQ0FBQyxHQUFDLEdBQUcsQ0FBQztTQUNySzthQUNJO1lBQ0QsT0FBTyxTQUFTLEdBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFDLElBQUksR0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUMsSUFBSSxHQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFDLEVBQUUsQ0FBQyxHQUFDLEdBQUcsQ0FBQztTQUNuSztJQUVMLENBQUM7Ozs7O0lBRUQsYUFBYSxDQUFDLElBQUk7UUFDZCxPQUFPLElBQUksR0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUMsR0FBRyxHQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUMsS0FBSyxHQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBQyxHQUFHLEdBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyTSxDQUFDOzs7WUFuRUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxXQUFXO2dCQUNyQixtMUVBQXNDOzthQUV6Qzs7Ozs7cUJBR0ksS0FBSztxQkFDTCxLQUFLO3NCQUNMLEtBQUs7eUJBRUwsS0FBSztxQkFDTCxLQUFLOzRCQUVMLFNBQVMsU0FBQyxlQUFlLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7Z0NBQzlELE1BQU07Ozs7SUFSUCxnQ0FBcUI7O0lBQ3JCLGdDQUFxQjs7SUFDckIsaUNBQXNCOztJQUV0QixvQ0FBNEI7O0lBQzVCLGdDQUF3Qjs7SUFFeEIsdUNBQTJGOztJQUMzRiwyQ0FBK0M7O0lBRS9DLCtCQUFnQjs7SUFDaEIsbUNBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25DaGFuZ2VzLCBJbnB1dCwgQWZ0ZXJWaWV3SW5pdCwgVmlld0NoaWxkLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZiwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyB0cmltTGFiZWwgfSBmcm9tICcuLi8uLi91dGlscy90cmltLWxhYmVsLmhlbHBlcic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZ1t4LWF4aXNdJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4veC1heGlzLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi94LWF4aXMuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFhBeGlzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQge1xuXG4gICAgQElucHV0KCkgeFNjYWxlOiBhbnk7XG4gICAgQElucHV0KCkgeVNjYWxlOiBhbnk7XG4gICAgQElucHV0KCkgb3B0aW9uczogYW55O1xuXG4gICAgQElucHV0KCkgY2F0ZWdvcmllczogYW55PVtdO1xuICAgIEBJbnB1dCgpIHNlcmllczogYW55PVtdO1xuXG4gICAgQFZpZXdDaGlsZCgneEF4aXNIZWlnaHRFbCcsIHsgcmVhZDogRWxlbWVudFJlZiwgc3RhdGljOiBmYWxzZSB9KSB4QXhpc0hlaWdodEVsOiBFbGVtZW50UmVmO1xuICAgIEBPdXRwdXQoKSB4QXhpc0hlaWdodENoYW5nZT1uZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICB0aWNrczogYW55W109W107XG4gICAgdHJpbUxhYmVsOiBhbnk7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMudHJpbUxhYmVsPXRyaW1MYWJlbDtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cIilcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLm9wdGlvbnMpXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy54U2NhbGUpXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7IH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgeEF4aXNIZWlnaHQ9cGFyc2VJbnQodGhpcy54QXhpc0hlaWdodEVsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0LCAxMCkrMTA7XG4gICAgICAgICAgICAvLyBpZiAoeEF4aXNIZWlnaHQ8NTApXG4gICAgICAgICAgICAvLyAgICAgeEF4aXNIZWlnaHQ9NTA7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInggaGVpZ2h0IFwiLCB4QXhpc0hlaWdodClcbiAgICAgICAgICAgIGlmICh4QXhpc0hlaWdodCE9PXRoaXMub3B0aW9ucy54QXhpcy5oZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIm5nQWZ0ZXJWaWV3SW5pdFwiLCBcInh4eHh4eHh4eHhcIiwgeEF4aXNIZWlnaHQsIHRoaXMub3B0aW9ucy54QXhpcy5oZWlnaHQpXG4gICAgICAgICAgICAgICAgdGhpcy54QXhpc0hlaWdodENoYW5nZS5lbWl0KHsgeEF4aXNIZWlnaHQgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDApO1xuICAgICAgICBcbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYmFyVHlwZT09XCJ2ZXJ0aWNhbFwiKSB7XG4gICAgICAgICAgICB0aGlzLnRpY2tzPXRoaXMueVNjYWxlLm5pY2UoKS50aWNrcygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50aWNrcz10aGlzLnhTY2FsZS5uaWNlKCkudGlja3MoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5nQWZ0ZXJWaWV3SW5pdCgpO1xuICAgIH1cbiAgICB4VHJhbnNmb3JtUm90YXRlKGl0ZW0pIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5iYXJUeXBlPT1cInZlcnRpY2FsXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBcInJvdGF0ZShcIit0aGlzLm9wdGlvbnMueEF4aXMubGFiZWxSb3RhdGlvbitcIiwgXCIrKHRoaXMueFNjYWxlKGl0ZW0pKyh0aGlzLnhTY2FsZS5iYW5kd2lkdGgoKS8yKSt0aGlzLm9wdGlvbnMueUF4aXMud2lkdGgpK1wiLCBcIisodGhpcy5vcHRpb25zLmhlaWdodC0yMCkrXCIpXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gXCJyb3RhdGUoXCIrdGhpcy5vcHRpb25zLnhBeGlzLmxhYmVsUm90YXRpb24rXCIsIFwiKyh0aGlzLnhTY2FsZShpdGVtKSt0aGlzLm9wdGlvbnMueUF4aXMud2lkdGgpK1wiLCBcIisodGhpcy5vcHRpb25zLmhlaWdodC10aGlzLm9wdGlvbnMueEF4aXMuaGVpZ2h0KzIwKStcIilcIjtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcGF0aERpcmVjdGlvbih0aWNrKSB7XG4gICAgICAgIHJldHVybiAnTSAnKyh0aGlzLnhTY2FsZSh0aWNrKSt0aGlzLm9wdGlvbnMueUF4aXMud2lkdGgpKycgJysodGhpcy5vcHRpb25zLmhlYWRlci5oZWlnaHQpKycgTCAnKyh0aGlzLnhTY2FsZSh0aWNrKSt0aGlzLm9wdGlvbnMueUF4aXMud2lkdGgpKycgJysodGhpcy5vcHRpb25zLmhlaWdodC10aGlzLm9wdGlvbnMueEF4aXMuaGVpZ2h0KTtcbiAgICB9XG5cblxuXG5cbn1cbiJdfQ==