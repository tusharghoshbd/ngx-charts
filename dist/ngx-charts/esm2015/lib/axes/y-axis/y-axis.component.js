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
            if (yAxisHeight !== this.options.yAxis.height || yAxisWidth !== this.options.yAxis.width) {
                this.yAxisWidthChange.emit({ yAxisWidth, yAxisHeight });
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
            //console.log("update y ", this.ticks)
            //console.log("update y --  ", this.yScale(0));
        }
        else {
            //this.ticks=this.xScale.nice().ticks();
        }
        this.ngAfterViewInit();
    }
    /**
     * @return {?}
     */
    transform() {
        return "rotate(270, 10, " + this.options.height / 2 + ")";
    }
    /**
     * @param {?} tick
     * @return {?}
     */
    pathDirection(tick) {
        //console.log(tick, this.yScale(tick))
        return 'M ' + (this.options.yAxis.width) + ' ' + (this.yScale(tick) + this.options.header.height) + ' L ' + (this.options.width) + ' ' + (this.yScale(tick) + this.options.header.height);
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
                template: "<svg>\n    <g #yAxisWidthEl>\n        <g class=\"highcharts-axis highcharts-yaxis\" data-z-index=\"2\" aria-hidden=\"true\">\n            <text x=\"10\" [attr.y]=\"options.height/2\" text-anchor=\"middle\" dominant-baseline=\"central\" \n                style=\"color:#666666;cursor:default;font-size:11px;fill:#666666;\" \n                class=\"highcharts-axis-title\"\n                [attr.transform]=\"transform()\">\n                {{options.yAxis ? options.yAxis.title : \"\"}}\n            </text>\n        </g>\n        <g class=\"highcharts-axis-labels highcharts-yaxis-labels\" data-z-index=\"7\" aria-hidden=\"true\"\n            *ngIf=\"options.barType == 'vertical'\">\n            <text\n                style=\"color:#666666;cursor:default;font-size:11px;fill:#666666;\" \n                text-anchor=\"right\"\n                *ngFor=\"let tick of ticks\" \n                [attr.x]=\"30\"\n                [attr.y]=\"yScale(tick)+this.options.header.height\" \n                opacity=\"1\">{{ options.yAxis.labelEllipsis ? trimLabel(tick,  options.yAxis.labelEllipsisSize) :tick}} </text>\n        </g>\n        <g class=\"highcharts-axis-labels highcharts-xaxis-labels\" data-z-index=\"7\" aria-hidden=\"true\"\n            *ngIf=\"options.barType == 'horizontal'\">\n            <text \n                *ngFor=\"let item of categories; let i = index;\"\n                [attr.x] = \"30\"\n                [attr.y] = \"calculateYTextPosition(item)\"\n                style=\"color:#666666;cursor:default;font-size:11px;fill:#666666;\" text-anchor=\"right\" \n                 opacity=\"1\">{{ options.yAxis.labelEllipsis ? trimLabel(item,  options.yAxis.labelEllipsisSize) :item}}</text>\n        </g> \n    </g>\n    \n    <g *ngIf=\"options.barType == 'vertical'\" class=\"highcharts-grid highcharts-yaxis-grid\" data-z-index=\"1\" aria-hidden=\"true\">\n        <path fill=\"none\" stroke=\"#e6e6e6\" stroke-width=\"1\" data-z-index=\"1\" class=\"highcharts-grid-line\"\n            *ngFor=\"let tick of ticks\" [attr.d]=\"pathDirection(tick)\" opacity=\"1\">\n        </path>\n    </g>\n\n</svg>",
                styles: [""]
            }] }
];
/** @nocollapse */
YAxisComponent.ctorParameters = () => [];
YAxisComponent.propDecorators = {
    xScale: [{ type: Input }],
    yScale: [{ type: Input }],
    options: [{ type: Input }],
    categories: [{ type: Input }],
    series: [{ type: Input }],
    yAxisWidthEl: [{ type: ViewChild, args: ['yAxisWidthEl', { static: true },] }],
    yAxisWidthChange: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    YAxisComponent.prototype.xScale;
    /** @type {?} */
    YAxisComponent.prototype.yScale;
    /** @type {?} */
    YAxisComponent.prototype.options;
    /** @type {?} */
    YAxisComponent.prototype.categories;
    /** @type {?} */
    YAxisComponent.prototype.series;
    /** @type {?} */
    YAxisComponent.prototype.yAxisWidthEl;
    /** @type {?} */
    YAxisComponent.prototype.yAxisWidthChange;
    /** @type {?} */
    YAxisComponent.prototype.ticks;
    /** @type {?} */
    YAxisComponent.prototype.trimLabel;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieS1heGlzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0dXNoYXJnaG9zaGJkL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvYXhlcy95LWF4aXMveS1heGlzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILFNBQVMsRUFBVSxLQUFLLEVBQ1QsU0FBUyxFQUFFLFVBQVUsRUFDcEMsTUFBTSxFQUFDLFlBQVksRUFDdEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBTTFELE1BQU0sT0FBTyxjQUFjO0lBY3ZCO1FBVFMsZUFBVSxHQUFNLEVBQUUsQ0FBQztRQUNuQixXQUFNLEdBQU0sRUFBRSxDQUFDO1FBR2QscUJBQWdCLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVoRCxVQUFLLEdBQVEsRUFBRSxDQUFDO1FBSVosSUFBSSxDQUFDLFNBQVMsR0FBQyxTQUFTLENBQUM7SUFDN0IsQ0FBQzs7OztJQUVELFFBQVE7UUFDSiwwQkFBMEI7SUFDOUIsQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDOUIsdUJBQXVCO1FBQ3ZCLHFDQUFxQztRQUNyQyxzREFBc0Q7UUFDdEQsZ0NBQWdDO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsQixDQUFDOzs7O0lBQ0QsZUFBZTtRQUNYLFVBQVU7OztRQUFDLEdBQUcsRUFBRTs7a0JBQ04sVUFBVSxHQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsR0FBQyxFQUFFOztrQkFDekYsV0FBVyxHQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsR0FBQyxHQUFHO1lBQ2xHLElBQUksV0FBVyxLQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBRSxVQUFVLEtBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFO2dCQUNoRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7YUFDM0Q7WUFDRCxzQ0FBc0M7UUFDMUMsQ0FBQyxHQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ1YsQ0FBQzs7OztJQUVELE1BQU07UUFDRixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFFLFVBQVUsRUFBRTtZQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDdEMsc0NBQXNDO1lBQ3RDLCtDQUErQztTQUNsRDthQUNJO1lBQ0Qsd0NBQXdDO1NBQzNDO1FBQ0QsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7Ozs7SUFFRCxTQUFTO1FBQ0wsT0FBTyxrQkFBa0IsR0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBQyxDQUFDLEdBQUMsR0FBRyxDQUFDO0lBQ3hELENBQUM7Ozs7O0lBQ0QsYUFBYSxDQUFDLElBQUk7UUFDZCxzQ0FBc0M7UUFDdEMsT0FBTyxJQUFJLEdBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBQyxHQUFHLEdBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFDLEtBQUssR0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUMsR0FBRyxHQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1SyxDQUFDOzs7OztJQUNELHNCQUFzQixDQUFDLElBQUk7UUFDdkIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNqQixPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsR0FBQyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5RixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUN0QyxDQUFDOzs7WUFwRUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxXQUFXO2dCQUNyQixxbEVBQXNDOzthQUV6Qzs7Ozs7cUJBRUksS0FBSztxQkFDTCxLQUFLO3NCQUNMLEtBQUs7eUJBRUwsS0FBSztxQkFDTCxLQUFLOzJCQUVMLFNBQVMsU0FBQyxjQUFjLEVBQUUsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDOytCQUN2QyxNQUFNOzs7O0lBUlAsZ0NBQXFCOztJQUNyQixnQ0FBcUI7O0lBQ3JCLGlDQUFzQjs7SUFFdEIsb0NBQTRCOztJQUM1QixnQ0FBd0I7O0lBRXhCLHNDQUFtRTs7SUFDbkUsMENBQWdEOztJQUVoRCwrQkFBZ0I7O0lBRWhCLG1DQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT25DaGFuZ2VzLFxyXG4gICAgU2ltcGxlQ2hhbmdlcywgVmlld0NoaWxkLCBFbGVtZW50UmVmLFxyXG4gICAgT3V0cHV0LEV2ZW50RW1pdHRlclxyXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IENsYXNzR2V0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXIvc3JjL291dHB1dC9vdXRwdXRfYXN0JztcclxuaW1wb3J0IHsgdHJpbUxhYmVsIH0gZnJvbSAnLi4vLi4vdXRpbHMvdHJpbS1sYWJlbC5oZWxwZXInO1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcImdbeS1heGlzXVwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi95LWF4aXMuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi95LWF4aXMuY29tcG9uZW50LmNzc1wiXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIFlBeGlzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xyXG4gICAgQElucHV0KCkgeFNjYWxlOiBhbnk7XHJcbiAgICBASW5wdXQoKSB5U2NhbGU6IGFueTtcclxuICAgIEBJbnB1dCgpIG9wdGlvbnM6IGFueTtcclxuXHJcbiAgICBASW5wdXQoKSBjYXRlZ29yaWVzOiBhbnk9W107XHJcbiAgICBASW5wdXQoKSBzZXJpZXM6IGFueT1bXTtcclxuXHJcbiAgICBAVmlld0NoaWxkKCd5QXhpc1dpZHRoRWwnLCB7c3RhdGljOnRydWV9KSB5QXhpc1dpZHRoRWw6IEVsZW1lbnRSZWY7XHJcbiAgICBAT3V0cHV0KCkgeUF4aXNXaWR0aENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICB0aWNrczogYW55W109W107XHJcbiAgICBcclxuICAgIHRyaW1MYWJlbDogYW55O1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy50cmltTGFiZWw9dHJpbUxhYmVsO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy55U2NhbGUpXHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNoYW5nZXMpXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLS0tXCIpXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coIEpTT04uc3RyaW5naWZ5KHRoaXMueVNjYWxlKCdBZnJpY2EnKSkpXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLnlTY2FsZSgtMjAwKSlcclxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgfVxyXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB5QXhpc1dpZHRoPXBhcnNlSW50KHRoaXMueUF4aXNXaWR0aEVsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgsIDEwKSszMDtcclxuICAgICAgICAgICAgY29uc3QgeUF4aXNIZWlnaHQ9cGFyc2VJbnQodGhpcy55QXhpc1dpZHRoRWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQsIDEwKSszMDA7XHJcbiAgICAgICAgICAgIGlmICh5QXhpc0hlaWdodCE9PXRoaXMub3B0aW9ucy55QXhpcy5oZWlnaHR8fHlBeGlzV2lkdGghPT10aGlzLm9wdGlvbnMueUF4aXMud2lkdGgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMueUF4aXNXaWR0aENoYW5nZS5lbWl0KHsgeUF4aXNXaWR0aCwgeUF4aXNIZWlnaHQgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9zZXRUaW1lb3V0KCgpID0+IHRoaXMudXBkYXRlRGltcygpKTtcclxuICAgICAgICB9LCAwKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5iYXJUeXBlPT1cInZlcnRpY2FsXCIpIHtcclxuICAgICAgICAgICAgdGhpcy50aWNrcz10aGlzLnlTY2FsZS5uaWNlKCkudGlja3MoKTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInVwZGF0ZSB5IFwiLCB0aGlzLnRpY2tzKVxyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwidXBkYXRlIHkgLS0gIFwiLCB0aGlzLnlTY2FsZSgwKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvL3RoaXMudGlja3M9dGhpcy54U2NhbGUubmljZSgpLnRpY2tzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubmdBZnRlclZpZXdJbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdHJhbnNmb3JtKCkge1xyXG4gICAgICAgIHJldHVybiBcInJvdGF0ZSgyNzAsIDEwLCBcIit0aGlzLm9wdGlvbnMuaGVpZ2h0LzIrXCIpXCI7XHJcbiAgICB9XHJcbiAgICBwYXRoRGlyZWN0aW9uKHRpY2spIHsgXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aWNrLCB0aGlzLnlTY2FsZSh0aWNrKSlcclxuICAgICAgICByZXR1cm4gJ00gJysodGhpcy5vcHRpb25zLnlBeGlzLndpZHRoKSsnICcrKHRoaXMueVNjYWxlKHRpY2spK3RoaXMub3B0aW9ucy5oZWFkZXIuaGVpZ2h0KSsnIEwgJysodGhpcy5vcHRpb25zLndpZHRoKSsnICcrKHRoaXMueVNjYWxlKHRpY2spK3RoaXMub3B0aW9ucy5oZWFkZXIuaGVpZ2h0KTtcclxuICAgIH1cclxuICAgIGNhbGN1bGF0ZVlUZXh0UG9zaXRpb24oaXRlbSkgeyBcclxuICAgICAgICBpZiAodGhpcy55U2NhbGUoaXRlbSkpXHJcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUludCh0aGlzLnlTY2FsZShpdGVtKSsodGhpcy55U2NhbGUuYmFuZHdpZHRoKCkvMikrdGhpcy5vcHRpb25zLmhlYWRlci5oZWlnaHQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuaGVhZGVyLmhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcblxyXG59XHJcbiJdfQ==