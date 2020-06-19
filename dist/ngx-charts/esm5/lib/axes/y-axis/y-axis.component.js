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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieS1heGlzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0dXNoYXJnaG9zaGJkL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvYXhlcy95LWF4aXMveS1heGlzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILFNBQVMsRUFBVSxLQUFLLEVBQ1QsU0FBUyxFQUFFLFVBQVUsRUFDcEMsTUFBTSxFQUFDLFlBQVksRUFDdEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzFEO0lBc0JJO1FBWFMsZUFBVSxHQUFNLEVBQUUsQ0FBQztRQUNuQixXQUFNLEdBQU0sRUFBRSxDQUFDO1FBSWQscUJBQWdCLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVoRCxVQUFLLEdBQVEsRUFBRSxDQUFDO1FBQ2hCLGVBQVUsR0FBUSxFQUFFLENBQUM7UUFJakIsSUFBSSxDQUFDLFNBQVMsR0FBQyxTQUFTLENBQUM7SUFDN0IsQ0FBQzs7OztJQUVELGlDQUFROzs7SUFBUjtRQUNJLDBCQUEwQjtJQUM5QixDQUFDOzs7OztJQUVELG9DQUFXOzs7O0lBQVgsVUFBWSxPQUFzQjtRQUM5Qix1QkFBdUI7UUFDdkIscUNBQXFDO1FBQ3JDLHNEQUFzRDtRQUN0RCxnQ0FBZ0M7UUFDaEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2xCLENBQUM7Ozs7SUFDRCx3Q0FBZTs7O0lBQWY7UUFBQSxpQkFhQztRQVhHLFVBQVU7OztRQUFDOztnQkFDRCxVQUFVLEdBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxHQUFDLEVBQUU7O2dCQUN6RixXQUFXLEdBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUMs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QUFJLEVBQUM7bUNBQzVDLE1BQU07O0lBZ0VYLHFCQUFDO0NBQUEsQUFoRkQsSUFnRkM7U0EzRVksY0FBYzs7O0lBQ3ZCLGdDQUFxQjs7SUFDckIsZ0NBQXFCOztJQUNyQixxQ0FBMEI7O0lBQzFCLGlDQUFzQjs7SUFFdEIsb0NBQTRCOztJQUM1QixnQ0FBd0I7O0lBRXhCLHNDQUFzRTs7SUFDdEUsMkNBQTZFOztJQUM3RSwwQ0FBZ0Q7O0lBRWhELCtCQUFnQjs7SUFDaEIsb0NBQXFCOztJQUVyQixtQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE9uQ2hhbmdlcyxcclxuICAgIFNpbXBsZUNoYW5nZXMsIFZpZXdDaGlsZCwgRWxlbWVudFJlZixcclxuICAgIE91dHB1dCxFdmVudEVtaXR0ZXJcclxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBDbGFzc0dldHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyL3NyYy9vdXRwdXQvb3V0cHV0X2FzdCc7XHJcbmltcG9ydCB7IHRyaW1MYWJlbCB9IGZyb20gJy4uLy4uL3V0aWxzL3RyaW0tbGFiZWwuaGVscGVyJztcclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJnW3ktYXhpc11cIixcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4veS1heGlzLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi4veS1heGlzLmNvbXBvbmVudC5jc3NcIl0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBZQXhpc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcclxuICAgIEBJbnB1dCgpIHhTY2FsZTogYW55O1xyXG4gICAgQElucHV0KCkgeVNjYWxlOiBhbnk7XHJcbiAgICBASW5wdXQoKSB5UmlnaHRTY2FsZTogYW55O1xyXG4gICAgQElucHV0KCkgb3B0aW9uczogYW55O1xyXG5cclxuICAgIEBJbnB1dCgpIGNhdGVnb3JpZXM6IGFueT1bXTtcclxuICAgIEBJbnB1dCgpIHNlcmllczogYW55PVtdO1xyXG5cclxuICAgIEBWaWV3Q2hpbGQoJ3lBeGlzV2lkdGhFbCcsIHsgc3RhdGljOiB0cnVlIH0pIHlBeGlzV2lkdGhFbDogRWxlbWVudFJlZjtcclxuICAgIEBWaWV3Q2hpbGQoJ3lBeGlzUmlnaHRXaWR0aEVsJywge3N0YXRpYzp0cnVlfSkgeUF4aXNSaWdodFdpZHRoRWw6IEVsZW1lbnRSZWY7XHJcbiAgICBAT3V0cHV0KCkgeUF4aXNXaWR0aENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICB0aWNrczogYW55W109W107XHJcbiAgICByaWdodFRpY2tzOiBhbnlbXT1bXTtcclxuICAgIFxyXG4gICAgdHJpbUxhYmVsOiBhbnk7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnRyaW1MYWJlbD10cmltTGFiZWw7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLnlTY2FsZSlcclxuICAgIH1cclxuXHJcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coY2hhbmdlcylcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS1cIilcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyggSlNPTi5zdHJpbmdpZnkodGhpcy55U2NhbGUoJ0FmcmljYScpKSlcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMueVNjYWxlKC0yMDApKVxyXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICB9XHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHlBeGlzV2lkdGg9cGFyc2VJbnQodGhpcy55QXhpc1dpZHRoRWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCwgMTApKzMwO1xyXG4gICAgICAgICAgICBjb25zdCB5QXhpc0hlaWdodD1wYXJzZUludCh0aGlzLnlBeGlzV2lkdGhFbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCwgMTApKzMwMDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHlBeGlzUmlnaHRXaWR0aD1wYXJzZUludCh0aGlzLnlBeGlzUmlnaHRXaWR0aEVsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgsIDEwKSszMDtcclxuXHJcbiAgICAgICAgICAgIGlmICh5QXhpc0hlaWdodCE9PXRoaXMub3B0aW9ucy55QXhpcy5oZWlnaHR8fHlBeGlzV2lkdGghPT10aGlzLm9wdGlvbnMueUF4aXMud2lkdGgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMueUF4aXNXaWR0aENoYW5nZS5lbWl0KHsgeUF4aXNXaWR0aCwgeUF4aXNIZWlnaHQsIHlBeGlzUmlnaHRXaWR0aCB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL3NldFRpbWVvdXQoKCkgPT4gdGhpcy51cGRhdGVEaW1zKCkpO1xyXG4gICAgICAgIH0sIDApO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmJhclR5cGU9PVwidmVydGljYWxcIikge1xyXG4gICAgICAgICAgICB0aGlzLnRpY2tzPXRoaXMueVNjYWxlLm5pY2UoKS50aWNrcygpO1xyXG4gICAgICAgICAgICBpZih0aGlzLnlSaWdodFNjYWxlKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5yaWdodFRpY2tzPXRoaXMueVJpZ2h0U2NhbGUubmljZSgpLnRpY2tzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvL3RoaXMudGlja3M9dGhpcy54U2NhbGUubmljZSgpLnRpY2tzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubmdBZnRlclZpZXdJbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdHJhbnNmb3JtKHgpIHtcclxuICAgICAgICByZXR1cm4gXCJyb3RhdGUoMjcwLCBcIit4K1wiLCBcIit0aGlzLm9wdGlvbnMuaGVpZ2h0LzIrXCIpXCI7XHJcbiAgICB9XHJcbiAgICBwYXRoRGlyZWN0aW9uKHRpY2spIHsgXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aWNrLCB0aGlzLnlTY2FsZSh0aWNrKSlcclxuICAgICAgICByZXR1cm4gJ00gJysodGhpcy5vcHRpb25zLnlBeGlzLndpZHRoKSsnICcrKHRoaXMueVNjYWxlKHRpY2spK3RoaXMub3B0aW9ucy5oZWFkZXIuaGVpZ2h0KSsnIEwgJysodGhpcy5vcHRpb25zLnBsb3RCYWNrZ3JvdW5kLndpZHRoICsgdGhpcy5vcHRpb25zLnlBeGlzLndpZHRoKSsnICcrKHRoaXMueVNjYWxlKHRpY2spK3RoaXMub3B0aW9ucy5oZWFkZXIuaGVpZ2h0KTtcclxuICAgIH1cclxuICAgIGNhbGN1bGF0ZVlUZXh0UG9zaXRpb24oaXRlbSkgeyBcclxuICAgICAgICBpZiAodGhpcy55U2NhbGUoaXRlbSkpXHJcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUludCh0aGlzLnlTY2FsZShpdGVtKSsodGhpcy55U2NhbGUuYmFuZHdpZHRoKCkvMikrdGhpcy5vcHRpb25zLmhlYWRlci5oZWlnaHQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuaGVhZGVyLmhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcblxyXG59XHJcbiJdfQ==