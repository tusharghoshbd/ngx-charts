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
        if (this.options.barType == "vertical" && this.xScale) {
            /** @type {?} */
            let midRotation = (this.xScale(item) + (this.xScale.bandwidth() / 2) + this.options.yAxis.width);
            if (!isNaN(midRotation))
                return "rotate(" + this.options.xAxis.labelRotation + ", " + (this.xScale(item) + (this.xScale.bandwidth() / 2) + this.options.yAxis.width) + ", " + (this.options.height - 20) + ")";
            else
                return "rotate(0,0,0)";
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
                template: "\n<svg>\n    <g #xAxisHeightEl data-z-index=\"20\" height=\"70\"> \n        <g class=\"highcharts-axis highcharts-yaxis\" data-z-index=\"2\" aria-hidden=\"true\" >\n            <text [attr.x]=\"options.width/2\" [attr.y]=\"options.height-10\" text-anchor=\"middle\" dominant-baseline=\"central\"  style=\"margin-bottom: 50px; color:#666666;cursor:default;font-size:11px;fill:#666666;\"\n                class=\"highcharts-axis-title\"\n                >\n                {{options.xAxis ? options.xAxis.title : \"\"}}\n            </text>\n        </g>\n        \n        <g class=\"highcharts-axis-labels highcharts-xaxis-labels\" data-z-index=\"7\" aria-hidden=\"true\"\n            *ngIf=\"options.barType == 'vertical'\">\n            <text \n                *ngFor=\"let item of categories; let i = index;let f = first;\"\n                [attr.x] = \" xScale(item) != undefined  ? xScale(item) + (xScale.bandwidth()/2)+options.yAxis.width : 0\"\n                [attr.y] = \"options.height-30\"\n                [attr.transform]=\"xTransformRotate(item)\"\n                [attr.text-anchor]=\"options.xAxis.labelAlign\"\n                style=\"color:#666666;cursor:default;font-size:11px;fill:#666666;\"\n                opacity=\"1\">{{ options.xAxis.labelEllipsis ? trimLabel(item,  options.xAxis.labelEllipsisSize) :item}}</text>\n        </g> \n\n        <g class=\"highcharts-axis-labels highcharts-yaxis-labels\" data-z-index=\"7\" aria-hidden=\"true\"\n            *ngIf=\"options.barType == 'horizontal'\">\n            <text style=\"color:#666666;cursor:default;font-size:11px;fill:#666666;\" \n                text-anchor=\"middle\"\n                *ngFor=\"let tick of ticks\" \n                [attr.x] = 'xScale(tick) + options.yAxis.width'\n                [attr.y] = \"options.height - 30\"\n                [attr.transform]=\"xTransformRotate(tick)\"\n                opacity=\"1\">{{ options.xAxis.labelEllipsis ? trimLabel(tick,  options.xAxis.labelEllipsisSize) :tick}}</text>\n        </g>\n    </g>\n    <g *ngIf=\"options.barType == 'horizontal'\" class=\"highcharts-grid highcharts-yaxis-grid\" data-z-index=\"1\" aria-hidden=\"true\">\n        <path fill=\"none\" stroke=\"#e6e6e6\" stroke-width=\"1\" data-z-index=\"1\" class=\"highcharts-grid-line\"\n            *ngFor=\"let tick of ticks\" [attr.d]=\"pathDirection(tick)\" opacity=\"1\">\n        </path>\n    </g>\n</svg>\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieC1heGlzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0dXNoYXJnaG9zaGJkL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvYXhlcy94LWF4aXMveC1heGlzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBcUIsS0FBSyxFQUFpQixTQUFTLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRS9JLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQU8xRCxNQUFNLE9BQU8sY0FBYztJQWN2QjtRQVJTLGVBQVUsR0FBTSxFQUFFLENBQUM7UUFDbkIsV0FBTSxHQUFNLEVBQUUsQ0FBQztRQUdkLHNCQUFpQixHQUFDLElBQUksWUFBWSxFQUFFLENBQUM7UUFFL0MsVUFBSyxHQUFRLEVBQUUsQ0FBQztRQUdaLElBQUksQ0FBQyxTQUFTLEdBQUMsU0FBUyxDQUFDO0lBQzdCLENBQUM7Ozs7O0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQzlCLHlDQUF5QztRQUN6QywyQkFBMkI7UUFDM0IsMEJBQTBCO1FBQzFCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsQixDQUFDOzs7O0lBRUQsUUFBUSxLQUFLLENBQUM7Ozs7SUFFZCxlQUFlO1FBQ1gsVUFBVTs7O1FBQUMsR0FBRyxFQUFFOztnQkFDUixXQUFXLEdBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxHQUFDLEVBQUU7WUFDaEcsc0JBQXNCO1lBQ3RCLHNCQUFzQjtZQUN0Qix3Q0FBd0M7WUFDeEMsSUFBSSxXQUFXLEtBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO2dCQUN6Qyx1RkFBdUY7Z0JBQ3ZGLElBQUksQ0FBQyxpQkFBaUIs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TSxFQUFFLEtBQUssRUFBRTtnQ0FDOUQsTUFBTTs7OztJQVJQLGdDQUFxQjs7SUFDckIsZ0NBQXFCOztJQUNyQixpQ0FBc0I7O0lBRXRCLG9DQUE0Qjs7SUFDNUIsZ0NBQXdCOztJQUV4Qix1Q0FBMkY7O0lBQzNGLDJDQUErQzs7SUFFL0MsK0JBQWdCOztJQUNoQixtQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkNoYW5nZXMsIElucHV0LCBBZnRlclZpZXdJbml0LCBWaWV3Q2hpbGQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBFbGVtZW50UmVmLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IHRyaW1MYWJlbCB9IGZyb20gJy4uLy4uL3V0aWxzL3RyaW0tbGFiZWwuaGVscGVyJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdnW3gtYXhpc10nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi94LWF4aXMuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3gtYXhpcy5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgWEF4aXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgICBASW5wdXQoKSB4U2NhbGU6IGFueTtcbiAgICBASW5wdXQoKSB5U2NhbGU6IGFueTtcbiAgICBASW5wdXQoKSBvcHRpb25zOiBhbnk7XG5cbiAgICBASW5wdXQoKSBjYXRlZ29yaWVzOiBhbnk9W107XG4gICAgQElucHV0KCkgc2VyaWVzOiBhbnk9W107XG5cbiAgICBAVmlld0NoaWxkKCd4QXhpc0hlaWdodEVsJywgeyByZWFkOiBFbGVtZW50UmVmLCBzdGF0aWM6IGZhbHNlIH0pIHhBeGlzSGVpZ2h0RWw6IEVsZW1lbnRSZWY7XG4gICAgQE91dHB1dCgpIHhBeGlzSGVpZ2h0Q2hhbmdlPW5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIHRpY2tzOiBhbnlbXT1bXTtcbiAgICB0cmltTGFiZWw6IGFueTtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy50cmltTGFiZWw9dHJpbUxhYmVsO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKVxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMub3B0aW9ucylcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLnhTY2FsZSlcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHsgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGxldCB4QXhpc0hlaWdodD1wYXJzZUludCh0aGlzLnhBeGlzSGVpZ2h0RWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQsIDEwKSsxMDtcbiAgICAgICAgICAgIC8vIGlmICh4QXhpc0hlaWdodDw1MClcbiAgICAgICAgICAgIC8vICAgICB4QXhpc0hlaWdodD01MDtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwieCBoZWlnaHQgXCIsIHhBeGlzSGVpZ2h0KVxuICAgICAgICAgICAgaWYgKHhBeGlzSGVpZ2h0IT09dGhpcy5vcHRpb25zLnhBeGlzLmhlaWdodCkge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwibmdBZnRlclZpZXdJbml0XCIsIFwieHh4eHh4eHh4eFwiLCB4QXhpc0hlaWdodCwgdGhpcy5vcHRpb25zLnhBeGlzLmhlaWdodClcbiAgICAgICAgICAgICAgICB0aGlzLnhBeGlzSGVpZ2h0Q2hhbmdlLmVtaXQoeyB4QXhpc0hlaWdodCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMCk7XG4gICAgICAgIFxuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5iYXJUeXBlPT1cInZlcnRpY2FsXCIpIHtcbiAgICAgICAgICAgIHRoaXMudGlja3M9dGhpcy55U2NhbGUubmljZSgpLnRpY2tzKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRpY2tzPXRoaXMueFNjYWxlLm5pY2UoKS50aWNrcygpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubmdBZnRlclZpZXdJbml0KCk7XG4gICAgfVxuICAgIHhUcmFuc2Zvcm1Sb3RhdGUoaXRlbSkge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmJhclR5cGU9PVwidmVydGljYWxcIiYmdGhpcy54U2NhbGUpIHtcbiAgICAgICAgICAgIGxldCBtaWRSb3RhdGlvbj0odGhpcy54U2NhbGUoaXRlbSkrKHRoaXMueFNjYWxlLmJhbmR3aWR0aCgpLzIpK3RoaXMub3B0aW9ucy55QXhpcy53aWR0aCk7XG4gICAgICAgICAgICBpZiAoIWlzTmFOKG1pZFJvdGF0aW9uKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJyb3RhdGUoXCIrdGhpcy5vcHRpb25zLnhBeGlzLmxhYmVsUm90YXRpb24rXCIsIFwiKyh0aGlzLnhTY2FsZShpdGVtKSsodGhpcy54U2NhbGUuYmFuZHdpZHRoKCkvMikrdGhpcy5vcHRpb25zLnlBeGlzLndpZHRoKStcIiwgXCIrKHRoaXMub3B0aW9ucy5oZWlnaHQtMjApK1wiKVwiO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiBcInJvdGF0ZSgwLDAsMClcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBcInJvdGF0ZShcIit0aGlzLm9wdGlvbnMueEF4aXMubGFiZWxSb3RhdGlvbitcIiwgXCIrKHRoaXMueFNjYWxlKGl0ZW0pK3RoaXMub3B0aW9ucy55QXhpcy53aWR0aCkrXCIsIFwiKyh0aGlzLm9wdGlvbnMuaGVpZ2h0LXRoaXMub3B0aW9ucy54QXhpcy5oZWlnaHQrMjApK1wiKVwiO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBwYXRoRGlyZWN0aW9uKHRpY2spIHtcbiAgICAgICAgcmV0dXJuICdNICcrKHRoaXMueFNjYWxlKHRpY2spK3RoaXMub3B0aW9ucy55QXhpcy53aWR0aCkrJyAnKyh0aGlzLm9wdGlvbnMuaGVhZGVyLmhlaWdodCkrJyBMICcrKHRoaXMueFNjYWxlKHRpY2spK3RoaXMub3B0aW9ucy55QXhpcy53aWR0aCkrJyAnKyh0aGlzLm9wdGlvbnMuaGVpZ2h0LXRoaXMub3B0aW9ucy54QXhpcy5oZWlnaHQpO1xuICAgIH1cblxuXG5cblxufVxuIl19