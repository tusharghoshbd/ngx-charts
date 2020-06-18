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
                template: "<svg>\n    <g #yAxisWidthEl>\n        <g class=\"highcharts-axis highcharts-yaxis\" data-z-index=\"2\" aria-hidden=\"true\">\n            <text x=\"10\" [attr.y]=\"options.height/2\" text-anchor=\"middle\" dominant-baseline=\"central\" \n                style=\"color:#666666;cursor:default;font-size:11px;fill:#666666;\" \n                class=\"highcharts-axis-title\"\n                [attr.transform]=\"transform(10)\">\n                {{options.yAxis ? options.yAxis.title : \"\"}}\n            </text>\n        </g>\n        <g class=\"highcharts-axis-labels highcharts-yaxis-labels\" data-z-index=\"7\" aria-hidden=\"true\"\n            *ngIf=\"options.barType == 'vertical'\">\n            <text\n                style=\"color:#666666;cursor:default;font-size:11px;fill:#666666;\" \n                text-anchor=\"right\"\n                *ngFor=\"let tick of ticks\" \n                [attr.x]=\"30\"\n                [attr.y]=\"yScale(tick)+this.options.header.height\" \n                opacity=\"1\">{{ options.yAxis.labelEllipsis ? trimLabel(tick,  options.yAxis.labelEllipsisSize) :tick}} </text>\n        </g>\n        <g class=\"highcharts-axis-labels highcharts-xaxis-labels\" data-z-index=\"7\" aria-hidden=\"true\"\n            *ngIf=\"options.barType == 'horizontal'\">\n            <text \n                *ngFor=\"let item of categories; let i = index;\"\n                [attr.x] = \"30\"\n                [attr.y] = \"calculateYTextPosition(item)\"\n                style=\"color:#666666;cursor:default;font-size:11px;fill:#666666;\" text-anchor=\"right\" \n                 opacity=\"1\">{{ options.yAxis.labelEllipsis ? trimLabel(item,  options.yAxis.labelEllipsisSize) :item}}</text>\n        </g> \n    </g>\n\n    <g #yAxisRightWidthEl>\n        <g class=\"highcharts-axis highcharts-yaxis\" data-z-index=\"2\" aria-hidden=\"true\">\n            <text \n                [attr.x]=\"options.plotBackground.width+options.yAxis.width - 10\" \n                [attr.y]=\"options.height/2\" text-anchor=\"middle\" dominant-baseline=\"central\" \n                style=\"color:#666666;cursor:default;font-size:11px;fill:#666666;\" \n                class=\"highcharts-axis-title\"\n                [attr.transform]=\"transform(options.plotBackground.width+options.yAxis.width - 10)\">\n                {{options.yAxis ? options.yAxis.title : \"\"}}\n            </text>\n        </g>\n        <g class=\"highcharts-axis-labels highcharts-yaxis-labels\" data-z-index=\"7\" aria-hidden=\"true\"\n            *ngIf=\"options.barType == 'vertical'\">\n            <text\n                style=\"color:#666666;cursor:default;font-size:11px;fill:#666666;\" \n                text-anchor=\"left\"\n                *ngFor=\"let tick of ticks\" \n                [attr.x]=\"options.plotBackground.width+options.yAxis.width - 30\"\n                [attr.y]=\"yScale(tick)+this.options.header.height\" \n                opacity=\"1\">{{ options.yAxis.labelEllipsis ? trimLabel(tick,  options.yAxis.labelEllipsisSize) :tick}} </text>\n        </g>\n    </g>\n    \n    <g *ngIf=\"options.barType == 'vertical'\" class=\"highcharts-grid highcharts-yaxis-grid\" data-z-index=\"1\" aria-hidden=\"true\">\n        <path fill=\"none\" stroke=\"#e6e6e6\" stroke-width=\"1\" data-z-index=\"1\" class=\"highcharts-grid-line\"\n            *ngFor=\"let tick of ticks\" [attr.d]=\"pathDirection(tick)\" opacity=\"1\">\n        </path>\n    </g>\n\n</svg>",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieS1heGlzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0dXNoYXJnaG9zaGJkL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvYXhlcy95LWF4aXMveS1heGlzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILFNBQVMsRUFBVSxLQUFLLEVBQ1QsU0FBUyxFQUFFLFVBQVUsRUFDcEMsTUFBTSxFQUFDLFlBQVksRUFDdEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBTTFELE1BQU0sT0FBTyxjQUFjO0lBY3ZCO1FBVFMsZUFBVSxHQUFNLEVBQUUsQ0FBQztRQUNuQixXQUFNLEdBQU0sRUFBRSxDQUFDO1FBR2QscUJBQWdCLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVoRCxVQUFLLEdBQVEsRUFBRSxDQUFDO1FBSVosSUFBSSxDQUFDLFNBQVMsR0FBQyxTQUFTLENBQUM7SUFDN0IsQ0FBQzs7OztJQUVELFFBQVE7UUFDSiwwQkFBMEI7SUFDOUIsQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDOUIsdUJBQXVCO1FBQ3ZCLHFDQUFxQztRQUNyQyxzREFBc0Q7UUFDdEQsZ0NBQWdDO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsQixDQUFDOzs7O0lBQ0QsZUFBZTtRQUNYLFVBQVU7OztRQUFDLEdBQUcsRUFBRTs7a0JBQ04sVUFBVSxHQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsR0FBQyxFQUFFOztrQkFDekYsV0FBVyxHQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsR0FBQyxHQUFHO1lBQ2xHLElBQUksV0FBVyxLQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBRSxVQUFVLEtBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFO2dCQUNoRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7YUFDM0Q7WUFDRCxzQ0FBc0M7UUFDMUMsQ0FBQyxHQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ1YsQ0FBQzs7OztJQUVELE1BQU07UUFDRixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFFLFVBQVUsRUFBRTtZQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDdEMsc0NBQXNDO1lBQ3RDLCtDQUErQztTQUNsRDthQUNJO1lBQ0Qsd0NBQXdDO1NBQzNDO1FBQ0QsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7Ozs7O0lBRUQsU0FBUyxDQUFDLENBQUM7UUFDUCxPQUFPLGNBQWMsR0FBQyxDQUFDLEdBQUMsSUFBSSxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFDLENBQUMsR0FBQyxHQUFHLENBQUM7SUFDM0QsQ0FBQzs7Ozs7SUFDRCxhQUFhLENBQUMsSUFBSTtRQUNkLHNDQUFzQztRQUN0QyxPQUFPLElBQUksR0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFDLEdBQUcsR0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUMsS0FBSyxHQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBQyxHQUFHLEdBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVLLENBQUM7Ozs7O0lBQ0Qsc0JBQXNCLENBQUMsSUFBSTtRQUN2QixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2pCLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxHQUFDLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlGLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ3RDLENBQUM7OztZQXBFSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLDI0R0FBc0M7O2FBRXpDOzs7OztxQkFFSSxLQUFLO3FCQUNMLEtBQUs7c0JBQ0wsS0FBSzt5QkFFTCxLQUFLO3FCQUNMLEtBQUs7MkJBRUwsU0FBUyxTQUFDLGNBQWMsRUFBRSxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUM7K0JBQ3ZDLE1BQU07Ozs7SUFSUCxnQ0FBcUI7O0lBQ3JCLGdDQUFxQjs7SUFDckIsaUNBQXNCOztJQUV0QixvQ0FBNEI7O0lBQzVCLGdDQUF3Qjs7SUFFeEIsc0NBQW1FOztJQUNuRSwwQ0FBZ0Q7O0lBRWhELCtCQUFnQjs7SUFFaEIsbUNBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gICAgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPbkNoYW5nZXMsXHJcbiAgICBTaW1wbGVDaGFuZ2VzLCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsXHJcbiAgICBPdXRwdXQsRXZlbnRFbWl0dGVyXHJcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQ2xhc3NHZXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb21waWxlci9zcmMvb3V0cHV0L291dHB1dF9hc3QnO1xyXG5pbXBvcnQgeyB0cmltTGFiZWwgfSBmcm9tICcuLi8uLi91dGlscy90cmltLWxhYmVsLmhlbHBlcic7XHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwiZ1t5LWF4aXNdXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3ktYXhpcy5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL3ktYXhpcy5jb21wb25lbnQuY3NzXCJdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgWUF4aXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XHJcbiAgICBASW5wdXQoKSB4U2NhbGU6IGFueTtcclxuICAgIEBJbnB1dCgpIHlTY2FsZTogYW55O1xyXG4gICAgQElucHV0KCkgb3B0aW9uczogYW55O1xyXG5cclxuICAgIEBJbnB1dCgpIGNhdGVnb3JpZXM6IGFueT1bXTtcclxuICAgIEBJbnB1dCgpIHNlcmllczogYW55PVtdO1xyXG5cclxuICAgIEBWaWV3Q2hpbGQoJ3lBeGlzV2lkdGhFbCcsIHtzdGF0aWM6dHJ1ZX0pIHlBeGlzV2lkdGhFbDogRWxlbWVudFJlZjtcclxuICAgIEBPdXRwdXQoKSB5QXhpc1dpZHRoQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIHRpY2tzOiBhbnlbXT1bXTtcclxuICAgIFxyXG4gICAgdHJpbUxhYmVsOiBhbnk7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnRyaW1MYWJlbD10cmltTGFiZWw7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLnlTY2FsZSlcclxuICAgIH1cclxuXHJcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coY2hhbmdlcylcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS1cIilcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyggSlNPTi5zdHJpbmdpZnkodGhpcy55U2NhbGUoJ0FmcmljYScpKSlcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMueVNjYWxlKC0yMDApKVxyXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICB9XHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHlBeGlzV2lkdGg9cGFyc2VJbnQodGhpcy55QXhpc1dpZHRoRWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCwgMTApKzMwO1xyXG4gICAgICAgICAgICBjb25zdCB5QXhpc0hlaWdodD1wYXJzZUludCh0aGlzLnlBeGlzV2lkdGhFbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCwgMTApKzMwMDtcclxuICAgICAgICAgICAgaWYgKHlBeGlzSGVpZ2h0IT09dGhpcy5vcHRpb25zLnlBeGlzLmhlaWdodHx8eUF4aXNXaWR0aCE9PXRoaXMub3B0aW9ucy55QXhpcy53aWR0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy55QXhpc1dpZHRoQ2hhbmdlLmVtaXQoeyB5QXhpc1dpZHRoLCB5QXhpc0hlaWdodCB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL3NldFRpbWVvdXQoKCkgPT4gdGhpcy51cGRhdGVEaW1zKCkpO1xyXG4gICAgICAgIH0sIDApO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmJhclR5cGU9PVwidmVydGljYWxcIikge1xyXG4gICAgICAgICAgICB0aGlzLnRpY2tzPXRoaXMueVNjYWxlLm5pY2UoKS50aWNrcygpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwidXBkYXRlIHkgXCIsIHRoaXMudGlja3MpXHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJ1cGRhdGUgeSAtLSAgXCIsIHRoaXMueVNjYWxlKDApKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vdGhpcy50aWNrcz10aGlzLnhTY2FsZS5uaWNlKCkudGlja3MoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5uZ0FmdGVyVmlld0luaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICB0cmFuc2Zvcm0oeCkge1xyXG4gICAgICAgIHJldHVybiBcInJvdGF0ZSgyNzAsIFwiK3grXCIsIFwiK3RoaXMub3B0aW9ucy5oZWlnaHQvMitcIilcIjtcclxuICAgIH1cclxuICAgIHBhdGhEaXJlY3Rpb24odGljaykgeyBcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRpY2ssIHRoaXMueVNjYWxlKHRpY2spKVxyXG4gICAgICAgIHJldHVybiAnTSAnKyh0aGlzLm9wdGlvbnMueUF4aXMud2lkdGgpKycgJysodGhpcy55U2NhbGUodGljaykrdGhpcy5vcHRpb25zLmhlYWRlci5oZWlnaHQpKycgTCAnKyh0aGlzLm9wdGlvbnMud2lkdGgpKycgJysodGhpcy55U2NhbGUodGljaykrdGhpcy5vcHRpb25zLmhlYWRlci5oZWlnaHQpO1xyXG4gICAgfVxyXG4gICAgY2FsY3VsYXRlWVRleHRQb3NpdGlvbihpdGVtKSB7IFxyXG4gICAgICAgIGlmICh0aGlzLnlTY2FsZShpdGVtKSlcclxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KHRoaXMueVNjYWxlKGl0ZW0pKyh0aGlzLnlTY2FsZS5iYW5kd2lkdGgoKS8yKSt0aGlzLm9wdGlvbnMuaGVhZGVyLmhlaWdodCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5oZWFkZXIuaGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuXHJcbn1cclxuIl19