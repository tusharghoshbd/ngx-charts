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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieS1heGlzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0dXNoYXJnaG9zaGJkL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvYXhlcy95LWF4aXMveS1heGlzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILFNBQVMsRUFBVSxLQUFLLEVBQ1QsU0FBUyxFQUFFLFVBQVUsRUFDcEMsTUFBTSxFQUFDLFlBQVksRUFDdEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBTTFELE1BQU0sT0FBTyxjQUFjO0lBaUJ2QjtRQVhTLGVBQVUsR0FBTSxFQUFFLENBQUM7UUFDbkIsV0FBTSxHQUFNLEVBQUUsQ0FBQztRQUlkLHFCQUFnQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFaEQsVUFBSyxHQUFRLEVBQUUsQ0FBQztRQUNoQixlQUFVLEdBQVEsRUFBRSxDQUFDO1FBSWpCLElBQUksQ0FBQyxTQUFTLEdBQUMsU0FBUyxDQUFDO0lBQzdCLENBQUM7Ozs7SUFFRCxRQUFRO1FBQ0osMEJBQTBCO0lBQzlCLENBQUM7Ozs7O0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQzlCLHVCQUF1QjtRQUN2QixxQ0FBcUM7UUFDckMsc0RBQXNEO1FBQ3RELGdDQUFnQztRQUNoQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbEIsQ0FBQzs7OztJQUNELGVBQWU7UUFFWCxVQUFVOzs7UUFBQyxHQUFHLEVBQUU7O2tCQUNOLFVBQVUsR0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEdBQUMsRUFBRTs7a0JBQ3pGLFdBQVcsR0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxNQUFNLEVBQUUs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OztJQUMxQixpQ0FBc0I7O0lBRXRCLG9DQUE0Qjs7SUFDNUIsZ0NBQXdCOztJQUV4QixzQ0FBc0U7O0lBQ3RFLDJDQUE2RTs7SUFDN0UsMENBQWdEOztJQUVoRCwrQkFBZ0I7O0lBQ2hCLG9DQUFxQjs7SUFFckIsbUNBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gICAgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPbkNoYW5nZXMsXHJcbiAgICBTaW1wbGVDaGFuZ2VzLCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsXHJcbiAgICBPdXRwdXQsRXZlbnRFbWl0dGVyXHJcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQ2xhc3NHZXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb21waWxlci9zcmMvb3V0cHV0L291dHB1dF9hc3QnO1xyXG5pbXBvcnQgeyB0cmltTGFiZWwgfSBmcm9tICcuLi8uLi91dGlscy90cmltLWxhYmVsLmhlbHBlcic7XHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwiZ1t5LWF4aXNdXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3ktYXhpcy5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL3ktYXhpcy5jb21wb25lbnQuY3NzXCJdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgWUF4aXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XHJcbiAgICBASW5wdXQoKSB4U2NhbGU6IGFueTtcclxuICAgIEBJbnB1dCgpIHlTY2FsZTogYW55O1xyXG4gICAgQElucHV0KCkgeVJpZ2h0U2NhbGU6IGFueTtcclxuICAgIEBJbnB1dCgpIG9wdGlvbnM6IGFueTtcclxuXHJcbiAgICBASW5wdXQoKSBjYXRlZ29yaWVzOiBhbnk9W107XHJcbiAgICBASW5wdXQoKSBzZXJpZXM6IGFueT1bXTtcclxuXHJcbiAgICBAVmlld0NoaWxkKCd5QXhpc1dpZHRoRWwnLCB7IHN0YXRpYzogdHJ1ZSB9KSB5QXhpc1dpZHRoRWw6IEVsZW1lbnRSZWY7XHJcbiAgICBAVmlld0NoaWxkKCd5QXhpc1JpZ2h0V2lkdGhFbCcsIHtzdGF0aWM6dHJ1ZX0pIHlBeGlzUmlnaHRXaWR0aEVsOiBFbGVtZW50UmVmO1xyXG4gICAgQE91dHB1dCgpIHlBeGlzV2lkdGhDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgdGlja3M6IGFueVtdPVtdO1xyXG4gICAgcmlnaHRUaWNrczogYW55W109W107XHJcbiAgICBcclxuICAgIHRyaW1MYWJlbDogYW55O1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy50cmltTGFiZWw9dHJpbUxhYmVsO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy55U2NhbGUpXHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNoYW5nZXMpXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLS0tXCIpXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coIEpTT04uc3RyaW5naWZ5KHRoaXMueVNjYWxlKCdBZnJpY2EnKSkpXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLnlTY2FsZSgtMjAwKSlcclxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgfVxyXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB5QXhpc1dpZHRoPXBhcnNlSW50KHRoaXMueUF4aXNXaWR0aEVsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgsIDEwKSszMDtcclxuICAgICAgICAgICAgY29uc3QgeUF4aXNIZWlnaHQ9cGFyc2VJbnQodGhpcy55QXhpc1dpZHRoRWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQsIDEwKSszMDA7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB5QXhpc1JpZ2h0V2lkdGg9cGFyc2VJbnQodGhpcy55QXhpc1JpZ2h0V2lkdGhFbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoLCAxMCkrMzA7XHJcblxyXG4gICAgICAgICAgICBpZiAoeUF4aXNIZWlnaHQhPT10aGlzLm9wdGlvbnMueUF4aXMuaGVpZ2h0fHx5QXhpc1dpZHRoIT09dGhpcy5vcHRpb25zLnlBeGlzLndpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnlBeGlzV2lkdGhDaGFuZ2UuZW1pdCh7IHlBeGlzV2lkdGgsIHlBeGlzSGVpZ2h0LCB5QXhpc1JpZ2h0V2lkdGggfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9zZXRUaW1lb3V0KCgpID0+IHRoaXMudXBkYXRlRGltcygpKTtcclxuICAgICAgICB9LCAwKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5iYXJUeXBlPT1cInZlcnRpY2FsXCIpIHtcclxuICAgICAgICAgICAgdGhpcy50aWNrcz10aGlzLnlTY2FsZS5uaWNlKCkudGlja3MoKTtcclxuICAgICAgICAgICAgaWYodGhpcy55UmlnaHRTY2FsZSlcclxuICAgICAgICAgICAgICAgIHRoaXMucmlnaHRUaWNrcz10aGlzLnlSaWdodFNjYWxlLm5pY2UoKS50aWNrcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy90aGlzLnRpY2tzPXRoaXMueFNjYWxlLm5pY2UoKS50aWNrcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5nQWZ0ZXJWaWV3SW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRyYW5zZm9ybSh4KSB7XHJcbiAgICAgICAgcmV0dXJuIFwicm90YXRlKDI3MCwgXCIreCtcIiwgXCIrdGhpcy5vcHRpb25zLmhlaWdodC8yK1wiKVwiO1xyXG4gICAgfVxyXG4gICAgcGF0aERpcmVjdGlvbih0aWNrKSB7IFxyXG4gICAgICAgIC8vY29uc29sZS5sb2codGljaywgdGhpcy55U2NhbGUodGljaykpXHJcbiAgICAgICAgcmV0dXJuICdNICcrKHRoaXMub3B0aW9ucy55QXhpcy53aWR0aCkrJyAnKyh0aGlzLnlTY2FsZSh0aWNrKSt0aGlzLm9wdGlvbnMuaGVhZGVyLmhlaWdodCkrJyBMICcrKHRoaXMub3B0aW9ucy5wbG90QmFja2dyb3VuZC53aWR0aCArIHRoaXMub3B0aW9ucy55QXhpcy53aWR0aCkrJyAnKyh0aGlzLnlTY2FsZSh0aWNrKSt0aGlzLm9wdGlvbnMuaGVhZGVyLmhlaWdodCk7XHJcbiAgICB9XHJcbiAgICBjYWxjdWxhdGVZVGV4dFBvc2l0aW9uKGl0ZW0pIHsgXHJcbiAgICAgICAgaWYgKHRoaXMueVNjYWxlKGl0ZW0pKVxyXG4gICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQodGhpcy55U2NhbGUoaXRlbSkrKHRoaXMueVNjYWxlLmJhbmR3aWR0aCgpLzIpK3RoaXMub3B0aW9ucy5oZWFkZXIuaGVpZ2h0KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmhlYWRlci5oZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG5cclxufVxyXG4iXX0=