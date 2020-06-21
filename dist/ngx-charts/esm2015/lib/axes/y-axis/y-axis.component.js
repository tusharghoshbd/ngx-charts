/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild, ElementRef, Output, EventEmitter } from "@angular/core";
import { trimLabel } from '../../utils/trim-label.helper';
export class YAxisComponent {
    constructor() {
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
    ngOnInit() {
        //console.log(this.yScale)
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        // console.log(changes)
        // console.log("-------------------")
        // console.log( JSON.stringify(this.yScale('Africa')))
        //console.log(this.yScale(-200))
        this.update();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        setTimeout((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const yAxisWidth = parseInt(this.yAxisWidthEl.nativeElement.getBoundingClientRect().width, 10) + 30;
            /** @type {?} */
            const yAxisHeight = parseInt(this.yAxisWidthEl.nativeElement.getBoundingClientRect().height, 10) + 300;
            /** @type {?} */
            const yAxisRightWidth = parseInt(this.yAxisRightWidthEl.nativeElement.getBoundingClientRect().width, 10) + 30;
            if (yAxisHeight !== this.options.yAxis.height || yAxisWidth !== this.options.yAxis.width) {
                this.yAxisWidthChange.emit({ yAxisWidth, yAxisHeight, yAxisRightWidth });
            }
            //setTimeout(() => this.updateDims());
        }), 0);
    }
    /**
     * @return {?}
     */
    update() {
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
    }
    /**
     * @param {?} x
     * @return {?}
     */
    transform(x) {
        return "rotate(270, " + x + ", " + this.options.height / 2 + ")";
    }
    /**
     * @param {?} tick
     * @return {?}
     */
    pathDirection(tick) {
        //console.log(tick, this.yScale(tick))
        return 'M ' + (this.options.yAxis.width) + ' ' + (this.yScale(tick) + this.options.header.height) + ' L ' + (this.options.plotBackground.width + this.options.yAxis.width) + ' ' + (this.yScale(tick) + this.options.header.height);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    calculateYTextPosition(item) {
        if (this.yScale(item))
            return parseInt(this.yScale(item) + (this.yScale.bandwidth() / 2) + this.options.header.height);
        return this.options.header.height;
    }
}
YAxisComponent.decorators = [
    { type: Component, args: [{
                selector: "g[y-axis]",
                template: "<svg>\n    <g #yAxisWidthEl>\n        <g class=\"highcharts-axis highcharts-yaxis\" data-z-index=\"2\" aria-hidden=\"true\">\n            <text x=\"10\" [attr.y]=\"options.height/2\" text-anchor=\"middle\" dominant-baseline=\"central\" \n                style=\"color:#666666;cursor:default;font-size:11px;fill:#666666;\" \n                class=\"highcharts-axis-title\"\n                [attr.transform]=\"transform(10)\">\n                {{options.yAxis ? options.yAxis.title : \"\"}}\n            </text>\n        </g>\n        <g class=\"highcharts-axis-labels highcharts-yaxis-labels\" data-z-index=\"7\" aria-hidden=\"true\"\n            *ngIf=\"options.barType == 'vertical'\">\n            <text\n                style=\"color:#666666;cursor:default;font-size:11px;fill:#666666;\" \n                text-anchor=\"start\"\n                *ngFor=\"let tick of ticks\" \n                [attr.x]=\"30\"\n                [attr.y]=\"yScale(tick)+this.options.header.height\" \n                opacity=\"1\">{{ options.yAxis.labelEllipsis ? trimLabel(tick,  options.yAxis.labelEllipsisSize) :tick}} </text>\n        </g>\n        <g class=\"highcharts-axis-labels highcharts-xaxis-labels\" data-z-index=\"7\" aria-hidden=\"true\"\n            *ngIf=\"options.barType == 'horizontal'\">\n            <text \n                *ngFor=\"let item of categories; let i = index;\"\n                [attr.x] = \"30\"\n                [attr.y] = \"calculateYTextPosition(item)\"\n                style=\"color:#666666;cursor:default;font-size:11px;fill:#666666;\" text-anchor=\"right\" \n                 opacity=\"1\">{{ options.yAxis.labelEllipsis ? trimLabel(item,  options.yAxis.labelEllipsisSize) :item}}</text>\n        </g> \n    </g>\n\n    <g #yAxisRightWidthEl>\n        <g *ngIf= \"yRightScale\" class=\"highcharts-axis highcharts-yaxis\" data-z-index=\"2\" aria-hidden=\"true\" >\n            <text \n                [attr.x]=\"options.width - 10\" \n                [attr.y]=\"options.height/2\" text-anchor=\"middle\" dominant-baseline=\"central\" \n                style=\"color:#666666;cursor:default;font-size:11px;fill:#666666;\" \n                class=\"highcharts-axis-title\"\n                [attr.transform]=\"transform(options.width  - 10)\">\n                {{options.yAxis ? options.yAxis.rightTitle : \"\"}}\n            </text>\n        </g>\n        <g  class=\"highcharts-axis-labels highcharts-yaxis-labels\" data-z-index=\"7\" aria-hidden=\"true\"\n            *ngIf=\"options.barType == 'vertical' && yRightScale\">\n            <text\n                style=\"color:#666666;cursor:default;font-size:11px;fill:#666666;\" \n                text-anchor=\"end\"\n                *ngFor=\"let tick of rightTicks\" \n                [attr.x]=\"options.width - 30\"\n                [attr.y]=\"yRightScale(tick)+this.options.header.height\" \n                opacity=\"1\">{{ options.yAxis.labelEllipsis ? trimLabel(tick,  options.yAxis.labelEllipsisSize) :tick}} </text>\n        </g>\n    </g>\n    \n    <g *ngIf=\"options.barType == 'vertical'\" class=\"highcharts-grid highcharts-yaxis-grid\" data-z-index=\"1\" aria-hidden=\"true\">\n        <path fill=\"none\" stroke=\"#e6e6e6\" stroke-width=\"1\" data-z-index=\"1\" class=\"highcharts-grid-line\"\n            *ngFor=\"let tick of ticks\" [attr.d]=\"pathDirection(tick)\" opacity=\"1\">\n        </path>\n    </g>\n\n</svg>",
                styles: [""]
            }] }
];
/** @nocollapse */
YAxisComponent.ctorParameters = () => [];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieS1heGlzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0dXNoYXJnaG9zaGJkL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvYXhlcy95LWF4aXMveS1heGlzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILFNBQVMsRUFBVSxLQUFLLEVBQ1QsU0FBUyxFQUFFLFVBQVUsRUFDcEMsTUFBTSxFQUFDLFlBQVksRUFDdEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBTTFELE1BQU0sT0FBTyxjQUFjO0lBaUJ2QjtRQVhTLGVBQVUsR0FBTSxFQUFFLENBQUM7UUFDbkIsV0FBTSxHQUFNLEVBQUUsQ0FBQztRQUlkLHFCQUFnQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFaEQsVUFBSyxHQUFRLEVBQUUsQ0FBQztRQUNoQixlQUFVLEdBQVEsRUFBRSxDQUFDO1FBSWpCLElBQUksQ0FBQyxTQUFTLEdBQUMsU0FBUyxDQUFDO0lBQzdCLENBQUM7Ozs7SUFFRCxRQUFRO1FBQ0osMEJBQTBCO0lBQzlCLENBQUM7Ozs7O0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQzlCLHVCQUF1QjtRQUN2QixxQ0FBcUM7UUFDckMsc0RBQXNEO1FBQ3RELGdDQUFnQztRQUNoQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbEIsQ0FBQzs7OztJQUNELGVBQWU7UUFFWCxVQUFVOzs7UUFBQyxHQUFHLEVBQUU7O2tCQUNOLFVBQVUsR0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEdBQUMsRUFBRTs7a0JBQ3pGLFdBQVcsR0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxNQUFNLEVBQUUs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SUFDckIsZ0NBQXFCOztJQUNyQixxQ0FBMEI7O0lBQzFCLGlDQUFzQjs7SUFFdEIsb0NBQTRCOztJQUM1QixnQ0FBd0I7O0lBRXhCLHNDQUFzRTs7SUFDdEUsMkNBQTZFOztJQUM3RSwwQ0FBZ0Q7O0lBRWhELCtCQUFnQjs7SUFDaEIsb0NBQXFCOztJQUVyQixtQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE9uQ2hhbmdlcyxcclxuICAgIFNpbXBsZUNoYW5nZXMsIFZpZXdDaGlsZCwgRWxlbWVudFJlZixcclxuICAgIE91dHB1dCxFdmVudEVtaXR0ZXJcclxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBDbGFzc0dldHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyL3NyYy9vdXRwdXQvb3V0cHV0X2FzdCc7XHJcbmltcG9ydCB7IHRyaW1MYWJlbCB9IGZyb20gJy4uLy4uL3V0aWxzL3RyaW0tbGFiZWwuaGVscGVyJztcclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJnW3ktYXhpc11cIixcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4veS1heGlzLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi4veS1heGlzLmNvbXBvbmVudC5jc3NcIl0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBZQXhpc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcclxuICAgIEBJbnB1dCgpIHhTY2FsZTogYW55O1xyXG4gICAgQElucHV0KCkgeVNjYWxlOiBhbnk7XHJcbiAgICBASW5wdXQoKSB5UmlnaHRTY2FsZTogYW55O1xyXG4gICAgQElucHV0KCkgb3B0aW9uczogYW55O1xyXG5cclxuICAgIEBJbnB1dCgpIGNhdGVnb3JpZXM6IGFueT1bXTtcclxuICAgIEBJbnB1dCgpIHNlcmllczogYW55PVtdO1xyXG5cclxuICAgIEBWaWV3Q2hpbGQoJ3lBeGlzV2lkdGhFbCcsIHsgc3RhdGljOiB0cnVlIH0pIHlBeGlzV2lkdGhFbDogRWxlbWVudFJlZjtcclxuICAgIEBWaWV3Q2hpbGQoJ3lBeGlzUmlnaHRXaWR0aEVsJywge3N0YXRpYzp0cnVlfSkgeUF4aXNSaWdodFdpZHRoRWw6IEVsZW1lbnRSZWY7XHJcbiAgICBAT3V0cHV0KCkgeUF4aXNXaWR0aENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICB0aWNrczogYW55W109W107XHJcbiAgICByaWdodFRpY2tzOiBhbnlbXT1bXTtcclxuICAgIFxyXG4gICAgdHJpbUxhYmVsOiBhbnk7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnRyaW1MYWJlbD10cmltTGFiZWw7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLnlTY2FsZSlcclxuICAgIH1cclxuXHJcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coY2hhbmdlcylcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS1cIilcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyggSlNPTi5zdHJpbmdpZnkodGhpcy55U2NhbGUoJ0FmcmljYScpKSlcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMueVNjYWxlKC0yMDApKVxyXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICB9XHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHlBeGlzV2lkdGg9cGFyc2VJbnQodGhpcy55QXhpc1dpZHRoRWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCwgMTApKzMwO1xyXG4gICAgICAgICAgICBjb25zdCB5QXhpc0hlaWdodD1wYXJzZUludCh0aGlzLnlBeGlzV2lkdGhFbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCwgMTApKzMwMDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHlBeGlzUmlnaHRXaWR0aD1wYXJzZUludCh0aGlzLnlBeGlzUmlnaHRXaWR0aEVsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgsIDEwKSszMDtcclxuXHJcbiAgICAgICAgICAgIGlmICh5QXhpc0hlaWdodCE9PXRoaXMub3B0aW9ucy55QXhpcy5oZWlnaHR8fHlBeGlzV2lkdGghPT10aGlzLm9wdGlvbnMueUF4aXMud2lkdGgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMueUF4aXNXaWR0aENoYW5nZS5lbWl0KHsgeUF4aXNXaWR0aCwgeUF4aXNIZWlnaHQsIHlBeGlzUmlnaHRXaWR0aCB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL3NldFRpbWVvdXQoKCkgPT4gdGhpcy51cGRhdGVEaW1zKCkpO1xyXG4gICAgICAgIH0sIDApO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmJhclR5cGU9PVwidmVydGljYWxcIikge1xyXG4gICAgICAgICAgICBpZih0aGlzLnlTY2FsZSlcclxuICAgICAgICAgICAgdGhpcy50aWNrcz10aGlzLnlTY2FsZS5uaWNlKCkudGlja3MoKTtcclxuICAgICAgICAgICAgaWYodGhpcy55UmlnaHRTY2FsZSlcclxuICAgICAgICAgICAgICAgIHRoaXMucmlnaHRUaWNrcz10aGlzLnlSaWdodFNjYWxlLm5pY2UoKS50aWNrcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy90aGlzLnRpY2tzPXRoaXMueFNjYWxlLm5pY2UoKS50aWNrcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5nQWZ0ZXJWaWV3SW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRyYW5zZm9ybSh4KSB7XHJcbiAgICAgICAgcmV0dXJuIFwicm90YXRlKDI3MCwgXCIreCtcIiwgXCIrdGhpcy5vcHRpb25zLmhlaWdodC8yK1wiKVwiO1xyXG4gICAgfVxyXG4gICAgcGF0aERpcmVjdGlvbih0aWNrKSB7IFxyXG4gICAgICAgIC8vY29uc29sZS5sb2codGljaywgdGhpcy55U2NhbGUodGljaykpXHJcbiAgICAgICAgcmV0dXJuICdNICcrKHRoaXMub3B0aW9ucy55QXhpcy53aWR0aCkrJyAnKyh0aGlzLnlTY2FsZSh0aWNrKSt0aGlzLm9wdGlvbnMuaGVhZGVyLmhlaWdodCkrJyBMICcrKHRoaXMub3B0aW9ucy5wbG90QmFja2dyb3VuZC53aWR0aCArIHRoaXMub3B0aW9ucy55QXhpcy53aWR0aCkrJyAnKyh0aGlzLnlTY2FsZSh0aWNrKSt0aGlzLm9wdGlvbnMuaGVhZGVyLmhlaWdodCk7XHJcbiAgICB9XHJcbiAgICBjYWxjdWxhdGVZVGV4dFBvc2l0aW9uKGl0ZW0pIHsgXHJcbiAgICAgICAgaWYgKHRoaXMueVNjYWxlKGl0ZW0pKVxyXG4gICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQodGhpcy55U2NhbGUoaXRlbSkrKHRoaXMueVNjYWxlLmJhbmR3aWR0aCgpLzIpK3RoaXMub3B0aW9ucy5oZWFkZXIuaGVpZ2h0KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmhlYWRlci5oZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG5cclxufVxyXG4iXX0=