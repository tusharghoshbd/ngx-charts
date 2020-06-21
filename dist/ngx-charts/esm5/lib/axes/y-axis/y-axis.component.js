/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild, ElementRef, Output, EventEmitter } from "@angular/core";
import { trimLabel } from '../../utils/trim-label.helper';
var YAxisComponent = /** @class */ (function () {
    function YAxisComponent() {
        this.categories = [];
        this.series = [];
        this.yAxisWidthChange = new EventEmitter();
        this.ticks = [];
        this.rightTicks = [];
        this.trimLabel = trimLabel;
    }
    /**
     * @return {?}
     */
    YAxisComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        //console.log(this.yScale)
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    YAxisComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        // console.log(changes)
        // console.log("-------------------")
        // console.log( JSON.stringify(this.yScale('Africa')))
        //console.log(this.yScale(-200))
        this.update();
    };
    /**
     * @return {?}
     */
    YAxisComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var yAxisWidth = parseInt(_this.yAxisWidthEl.nativeElement.getBoundingClientRect().width, 10) + 30;
            /** @type {?} */
            var yAxisHeight = parseInt(_this.yAxisWidthEl.nativeElement.getBoundingClientRect().height, 10) + 300;
            /** @type {?} */
            var yAxisRightWidth = parseInt(_this.yAxisRightWidthEl.nativeElement.getBoundingClientRect().width, 10) + 30;
            if (yAxisHeight !== _this.options.yAxis.height || yAxisWidth !== _this.options.yAxis.width) {
                _this.yAxisWidthChange.emit({ yAxisWidth: yAxisWidth, yAxisHeight: yAxisHeight, yAxisRightWidth: yAxisRightWidth });
            }
            //setTimeout(() => this.updateDims());
        }), 0);
    };
    /**
     * @return {?}
     */
    YAxisComponent.prototype.update = /**
     * @return {?}
     */
    function () {
        if (this.options.barType == "vertical") {
            if (this.yScale)
                this.ticks = this.yScale.nice().ticks();
            if (this.yRightScale)
                this.rightTicks = this.yRightScale.nice().ticks();
        }
        else {
            //this.ticks=this.xScale.nice().ticks();
        }
        this.ngAfterViewInit();
    };
    /**
     * @param {?} x
     * @return {?}
     */
    YAxisComponent.prototype.transform = /**
     * @param {?} x
     * @return {?}
     */
    function (x) {
        return "rotate(270, " + x + ", " + this.options.height / 2 + ")";
    };
    /**
     * @param {?} tick
     * @return {?}
     */
    YAxisComponent.prototype.pathDirection = /**
     * @param {?} tick
     * @return {?}
     */
    function (tick) {
        //console.log(tick, this.yScale(tick))
        return 'M ' + (this.options.yAxis.width) + ' ' + (this.yScale(tick) + this.options.header.height) + ' L ' + (this.options.plotBackground.width + this.options.yAxis.width) + ' ' + (this.yScale(tick) + this.options.header.height);
    };
    /**
     * @param {?} item
     * @return {?}
     */
    YAxisComponent.prototype.calculateYTextPosition = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (this.yScale(item))
            return parseInt(this.yScale(item) + (this.yScale.bandwidth() / 2) + this.options.header.height);
        return this.options.header.height;
    };
    YAxisComponent.decorators = [
        { type: Component, args: [{
                    selector: "g[y-axis]",
                    template: "<svg>\n    <g #yAxisWidthEl>\n        <g class=\"highcharts-axis highcharts-yaxis\" data-z-index=\"2\" aria-hidden=\"true\">\n            <text x=\"10\" [attr.y]=\"options.height/2\" text-anchor=\"middle\" dominant-baseline=\"central\" \n                style=\"color:#666666;cursor:default;font-size:11px;fill:#666666;\" \n                class=\"highcharts-axis-title\"\n                [attr.transform]=\"transform(10)\">\n                {{options.yAxis ? options.yAxis.title : \"\"}}\n            </text>\n        </g>\n        <g class=\"highcharts-axis-labels highcharts-yaxis-labels\" data-z-index=\"7\" aria-hidden=\"true\"\n            *ngIf=\"options.barType == 'vertical'\">\n            <text\n                style=\"color:#666666;cursor:default;font-size:11px;fill:#666666;\" \n                text-anchor=\"start\"\n                *ngFor=\"let tick of ticks\" \n                [attr.x]=\"30\"\n                [attr.y]=\"yScale(tick)+this.options.header.height\" \n                opacity=\"1\">{{ options.yAxis.labelEllipsis ? trimLabel(tick,  options.yAxis.labelEllipsisSize) :tick}} </text>\n        </g>\n        <g class=\"highcharts-axis-labels highcharts-xaxis-labels\" data-z-index=\"7\" aria-hidden=\"true\"\n            *ngIf=\"options.barType == 'horizontal'\">\n            <text \n                *ngFor=\"let item of categories; let i = index;\"\n                [attr.x] = \"30\"\n                [attr.y] = \"calculateYTextPosition(item)\"\n                style=\"color:#666666;cursor:default;font-size:11px;fill:#666666;\" text-anchor=\"right\" \n                 opacity=\"1\">{{ options.yAxis.labelEllipsis ? trimLabel(item,  options.yAxis.labelEllipsisSize) :item}}</text>\n        </g> \n    </g>\n\n    <g #yAxisRightWidthEl>\n        <g *ngIf= \"yRightScale\" class=\"highcharts-axis highcharts-yaxis\" data-z-index=\"2\" aria-hidden=\"true\" >\n            <text \n                [attr.x]=\"options.width - 10\" \n                [attr.y]=\"options.height/2\" text-anchor=\"middle\" dominant-baseline=\"central\" \n                style=\"color:#666666;cursor:default;font-size:11px;fill:#666666;\" \n                class=\"highcharts-axis-title\"\n                [attr.transform]=\"transform(options.width  - 10)\">\n                {{options.yAxis ? options.yAxis.rightTitle : \"\"}}\n            </text>\n        </g>\n        <g  class=\"highcharts-axis-labels highcharts-yaxis-labels\" data-z-index=\"7\" aria-hidden=\"true\"\n            *ngIf=\"options.barType == 'vertical' && yRightScale\">\n            <text\n                style=\"color:#666666;cursor:default;font-size:11px;fill:#666666;\" \n                text-anchor=\"end\"\n                *ngFor=\"let tick of rightTicks\" \n                [attr.x]=\"options.width - 30\"\n                [attr.y]=\"yRightScale(tick)+this.options.header.height\" \n                opacity=\"1\">{{ options.yAxis.labelEllipsis ? trimLabel(tick,  options.yAxis.labelEllipsisSize) :tick}} </text>\n        </g>\n    </g>\n    \n    <g *ngIf=\"options.barType == 'vertical'\" class=\"highcharts-grid highcharts-yaxis-grid\" data-z-index=\"1\" aria-hidden=\"true\">\n        <path fill=\"none\" stroke=\"#e6e6e6\" stroke-width=\"1\" data-z-index=\"1\" class=\"highcharts-grid-line\"\n            *ngFor=\"let tick of ticks\" [attr.d]=\"pathDirection(tick)\" opacity=\"1\">\n        </path>\n    </g>\n\n</svg>",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    YAxisComponent.ctorParameters = function () { return []; };
    YAxisComponent.propDecorators = {
        xScale: [{ type: Input }],
        yScale: [{ type: Input }],
        yRightScale: [{ type: Input }],
        options: [{ type: Input }],
        categories: [{ type: Input }],
        series: [{ type: Input }],
        yAxisWidthEl: [{ type: ViewChild, args: ['yAxisWidthEl', { static: true },] }],
        yAxisRightWidthEl: [{ type: ViewChild, args: ['yAxisRightWidthEl', { static: true },] }],
        yAxisWidthChange: [{ type: Output }]
    };
    return YAxisComponent;
}());
export { YAxisComponent };
if (false) {
    /** @type {?} */
    YAxisComponent.prototype.xScale;
    /** @type {?} */
    YAxisComponent.prototype.yScale;
    /** @type {?} */
    YAxisComponent.prototype.yRightScale;
    /** @type {?} */
    YAxisComponent.prototype.options;
    /** @type {?} */
    YAxisComponent.prototype.categories;
    /** @type {?} */
    YAxisComponent.prototype.series;
    /** @type {?} */
    YAxisComponent.prototype.yAxisWidthEl;
    /** @type {?} */
    YAxisComponent.prototype.yAxisRightWidthEl;
    /** @type {?} */
    YAxisComponent.prototype.yAxisWidthChange;
    /** @type {?} */
    YAxisComponent.prototype.ticks;
    /** @type {?} */
    YAxisComponent.prototype.rightTicks;
    /** @type {?} */
    YAxisComponent.prototype.trimLabel;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieS1heGlzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0dXNoYXJnaG9zaGJkL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvYXhlcy95LWF4aXMveS1heGlzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILFNBQVMsRUFBVSxLQUFLLEVBQ1QsU0FBUyxFQUFFLFVBQVUsRUFDcEMsTUFBTSxFQUFDLFlBQVksRUFDdEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzFEO0lBc0JJO1FBWFMsZUFBVSxHQUFNLEVBQUUsQ0FBQztRQUNuQixXQUFNLEdBQU0sRUFBRSxDQUFDO1FBSWQscUJBQWdCLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVoRCxVQUFLLEdBQVEsRUFBRSxDQUFDO1FBQ2hCLGVBQVUsR0FBUSxFQUFFLENBQUM7UUFJakIsSUFBSSxDQUFDLFNBQVMsR0FBQyxTQUFTLENBQUM7SUFDN0IsQ0FBQzs7OztJQUVELGlDQUFROzs7SUFBUjtRQUNJLDBCQUEwQjtJQUM5QixDQUFDOzs7OztJQUVELG9DQUFXOzs7O0lBQVgsVUFBWSxPQUFzQjtRQUM5Qix1QkFBdUI7UUFDdkIscUNBQXFDO1FBQ3JDLHNEQUFzRDtRQUN0RCxnQ0FBZ0M7UUFDaEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2xCLENBQUM7Ozs7SUFDRCx3Q0FBZTs7O0lBQWY7UUFBQSxpQkFhQztRQVhHLFVBQVU7OztRQUFDOztnQkFDRCxVQUFVLEdBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxHQUFDLEVBQUU7O2dCQUN6RixXQUFXLEdBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUMs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QUFtQixFQUFFLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQzttQ0FDNUMsTUFBTTs7SUFpRVgscUJBQUM7Q0FBQSxBQWpGRCxJQWlGQztTQTVFWSxjQUFjOzs7SUFDdkIsZ0NBQXFCOztJQUNyQixnQ0FBcUI7O0lBQ3JCLHFDQUEwQjs7SUFDMUIsaUNBQXNCOztJQUV0QixvQ0FBNEI7O0lBQzVCLGdDQUF3Qjs7SUFFeEIsc0NBQXNFOztJQUN0RSwyQ0FBNkU7O0lBQzdFLDBDQUFnRDs7SUFFaEQsK0JBQWdCOztJQUNoQixvQ0FBcUI7O0lBRXJCLG1DQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT25DaGFuZ2VzLFxyXG4gICAgU2ltcGxlQ2hhbmdlcywgVmlld0NoaWxkLCBFbGVtZW50UmVmLFxyXG4gICAgT3V0cHV0LEV2ZW50RW1pdHRlclxyXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IENsYXNzR2V0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXIvc3JjL291dHB1dC9vdXRwdXRfYXN0JztcclxuaW1wb3J0IHsgdHJpbUxhYmVsIH0gZnJvbSAnLi4vLi4vdXRpbHMvdHJpbS1sYWJlbC5oZWxwZXInO1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcImdbeS1heGlzXVwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi95LWF4aXMuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi95LWF4aXMuY29tcG9uZW50LmNzc1wiXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIFlBeGlzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xyXG4gICAgQElucHV0KCkgeFNjYWxlOiBhbnk7XHJcbiAgICBASW5wdXQoKSB5U2NhbGU6IGFueTtcclxuICAgIEBJbnB1dCgpIHlSaWdodFNjYWxlOiBhbnk7XHJcbiAgICBASW5wdXQoKSBvcHRpb25zOiBhbnk7XHJcblxyXG4gICAgQElucHV0KCkgY2F0ZWdvcmllczogYW55PVtdO1xyXG4gICAgQElucHV0KCkgc2VyaWVzOiBhbnk9W107XHJcblxyXG4gICAgQFZpZXdDaGlsZCgneUF4aXNXaWR0aEVsJywgeyBzdGF0aWM6IHRydWUgfSkgeUF4aXNXaWR0aEVsOiBFbGVtZW50UmVmO1xyXG4gICAgQFZpZXdDaGlsZCgneUF4aXNSaWdodFdpZHRoRWwnLCB7c3RhdGljOnRydWV9KSB5QXhpc1JpZ2h0V2lkdGhFbDogRWxlbWVudFJlZjtcclxuICAgIEBPdXRwdXQoKSB5QXhpc1dpZHRoQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIHRpY2tzOiBhbnlbXT1bXTtcclxuICAgIHJpZ2h0VGlja3M6IGFueVtdPVtdO1xyXG4gICAgXHJcbiAgICB0cmltTGFiZWw6IGFueTtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMudHJpbUxhYmVsPXRyaW1MYWJlbDtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMueVNjYWxlKVxyXG4gICAgfVxyXG5cclxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhjaGFuZ2VzKVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLVwiKVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCBKU09OLnN0cmluZ2lmeSh0aGlzLnlTY2FsZSgnQWZyaWNhJykpKVxyXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy55U2NhbGUoLTIwMCkpXHJcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgIH1cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcclxuICAgICAgICBcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgeUF4aXNXaWR0aD1wYXJzZUludCh0aGlzLnlBeGlzV2lkdGhFbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoLCAxMCkrMzA7XHJcbiAgICAgICAgICAgIGNvbnN0IHlBeGlzSGVpZ2h0PXBhcnNlSW50KHRoaXMueUF4aXNXaWR0aEVsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0LCAxMCkrMzAwO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgeUF4aXNSaWdodFdpZHRoPXBhcnNlSW50KHRoaXMueUF4aXNSaWdodFdpZHRoRWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCwgMTApKzMwO1xyXG5cclxuICAgICAgICAgICAgaWYgKHlBeGlzSGVpZ2h0IT09dGhpcy5vcHRpb25zLnlBeGlzLmhlaWdodHx8eUF4aXNXaWR0aCE9PXRoaXMub3B0aW9ucy55QXhpcy53aWR0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy55QXhpc1dpZHRoQ2hhbmdlLmVtaXQoeyB5QXhpc1dpZHRoLCB5QXhpc0hlaWdodCwgeUF4aXNSaWdodFdpZHRoIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vc2V0VGltZW91dCgoKSA9PiB0aGlzLnVwZGF0ZURpbXMoKSk7XHJcbiAgICAgICAgfSwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYmFyVHlwZT09XCJ2ZXJ0aWNhbFwiKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMueVNjYWxlKVxyXG4gICAgICAgICAgICB0aGlzLnRpY2tzPXRoaXMueVNjYWxlLm5pY2UoKS50aWNrcygpO1xyXG4gICAgICAgICAgICBpZih0aGlzLnlSaWdodFNjYWxlKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5yaWdodFRpY2tzPXRoaXMueVJpZ2h0U2NhbGUubmljZSgpLnRpY2tzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvL3RoaXMudGlja3M9dGhpcy54U2NhbGUubmljZSgpLnRpY2tzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubmdBZnRlclZpZXdJbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdHJhbnNmb3JtKHgpIHtcclxuICAgICAgICByZXR1cm4gXCJyb3RhdGUoMjcwLCBcIit4K1wiLCBcIit0aGlzLm9wdGlvbnMuaGVpZ2h0LzIrXCIpXCI7XHJcbiAgICB9XHJcbiAgICBwYXRoRGlyZWN0aW9uKHRpY2spIHsgXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aWNrLCB0aGlzLnlTY2FsZSh0aWNrKSlcclxuICAgICAgICByZXR1cm4gJ00gJysodGhpcy5vcHRpb25zLnlBeGlzLndpZHRoKSsnICcrKHRoaXMueVNjYWxlKHRpY2spK3RoaXMub3B0aW9ucy5oZWFkZXIuaGVpZ2h0KSsnIEwgJysodGhpcy5vcHRpb25zLnBsb3RCYWNrZ3JvdW5kLndpZHRoICsgdGhpcy5vcHRpb25zLnlBeGlzLndpZHRoKSsnICcrKHRoaXMueVNjYWxlKHRpY2spK3RoaXMub3B0aW9ucy5oZWFkZXIuaGVpZ2h0KTtcclxuICAgIH1cclxuICAgIGNhbGN1bGF0ZVlUZXh0UG9zaXRpb24oaXRlbSkgeyBcclxuICAgICAgICBpZiAodGhpcy55U2NhbGUoaXRlbSkpXHJcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUludCh0aGlzLnlTY2FsZShpdGVtKSsodGhpcy55U2NhbGUuYmFuZHdpZHRoKCkvMikrdGhpcy5vcHRpb25zLmhlYWRlci5oZWlnaHQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuaGVhZGVyLmhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcblxyXG59XHJcbiJdfQ==