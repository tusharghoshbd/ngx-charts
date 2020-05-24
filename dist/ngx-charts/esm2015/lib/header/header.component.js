/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
export class HeaderComponent {
    constructor() {
        this.headerHeightChange = new EventEmitter();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        // console.log(changes)
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
        /** @type {?} */
        let headerHeight = parseInt(this.headerHeightEl.nativeElement.getBoundingClientRect().height, 10) + 20;
        // console.log("headerHeight "+headerHeight)
        this.headerHeightChange.emit({ headerHeight });
        //setTimeout(() => this.updateDims());
    }
    /**
     * @return {?}
     */
    update() {
        //this.ticks=this.xScale.nice().ticks();
    }
}
HeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'g[header]',
                template: "\r\n<svg>\r\n\r\n    <g #headerHeightEl>\r\n\r\n        <text [attr.x]=\"options.width/2\" text-anchor=\"middle\" class=\"highcharts-title\" data-z-index=\"4\" style=\"color:#333333;font-size:18px;fill:#333333;\" y=\"24\" aria-hidden=\"true\">\r\n            <tspan>{{options.title}}</tspan>\r\n        </text>\r\n        <text [attr.x]=\"options.width/2\" text-anchor=\"middle\" class=\"highcharts-subtitle\" data-z-index=\"4\" style=\"color:#666666;fill:#666666;\" y=\"52\" aria-hidden=\"true\">\r\n            <tspan>{{options.subtitle}}</tspan>\r\n        </text>\r\n        <!-- <g class=\"highcharts-axis highcharts-yaxis\" data-z-index=\"2\" aria-hidden=\"true\" >\r\n            <text [attr.x]=\"options.width/2\" [attr.y]=\"options.height-10\" text-anchor=\"middle\" dominant-baseline=\"central\"  style=\"margin-bottom: 50px; color:#666666;cursor:default;font-size:11px;fill:#666666;\"\r\n                class=\"highcharts-axis-title\"\r\n                >\r\n                {{options.xAxis ? options.xAxis.title : \"\"}}\r\n            </text>\r\n        </g> -->\r\n    </g>\r\n \r\n</svg>",
                styles: [""]
            }] }
];
/** @nocollapse */
HeaderComponent.ctorParameters = () => [];
HeaderComponent.propDecorators = {
    options: [{ type: Input }],
    headerHeightEl: [{ type: ViewChild, args: ['headerHeightEl', { static: true },] }],
    headerHeightChange: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    HeaderComponent.prototype.options;
    /** @type {?} */
    HeaderComponent.prototype.headerHeightEl;
    /** @type {?} */
    HeaderComponent.prototype.headerHeightChange;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0dXNoYXJnaG9zaGJkL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvaGVhZGVyL2hlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXFCLEtBQUssRUFBZ0IsU0FBUyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQU85SSxNQUFNLE9BQU8sZUFBZTtJQVV4QjtRQURVLHVCQUFrQixHQUFDLElBQUksWUFBWSxFQUFFLENBQUM7SUFDaEMsQ0FBQzs7Ozs7SUFFakIsV0FBVyxDQUFDLE9BQXNCO1FBQzlCLHVCQUF1QjtRQUN2QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbEIsQ0FBQzs7OztJQUVELFFBQVEsS0FBSSxDQUFDOzs7O0lBRWIsZUFBZTs7WUFDUCxZQUFZLEdBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxHQUFDLEVBQUU7UUFDbEcsNENBQTRDO1FBQzVDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBQy9DLHNDQUFzQztJQUMxQyxDQUFDOzs7O0lBRUQsTUFBTTtRQUNGLHdDQUF3QztJQUM1QyxDQUFDOzs7WUFqQ0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxXQUFXO2dCQUNyQiwybENBQXNDOzthQUV6Qzs7Ozs7c0JBSUksS0FBSzs2QkFLTCxTQUFTLFNBQUMsZ0JBQWdCLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2lDQUM1QyxNQUFNOzs7O0lBTlAsa0NBQXNCOztJQUt0Qix5Q0FBMEU7O0lBQzFFLDZDQUFnRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkNoYW5nZXMsIElucHV0LEFmdGVyVmlld0luaXQsIFZpZXdDaGlsZCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEVsZW1lbnRSZWYsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdnW2hlYWRlcl0nLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2hlYWRlci5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9oZWFkZXIuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBIZWFkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCB7XHJcbiAgICAvLyBASW5wdXQoKSB4U2NhbGU6IGFueTtcclxuICAgIC8vIEBJbnB1dCgpIHlTY2FsZTogYW55O1xyXG4gICAgQElucHV0KCkgb3B0aW9uczogYW55O1xyXG5cclxuICAgIC8vIEBJbnB1dCgpIGNhdGVnb3JpZXM6IGFueT1bXTtcclxuICAgIC8vIEBJbnB1dCgpIHNlcmllczogYW55PVtdO1xyXG5cclxuICAgIEBWaWV3Q2hpbGQoJ2hlYWRlckhlaWdodEVsJywgeyBzdGF0aWM6IHRydWUgfSkgaGVhZGVySGVpZ2h0RWw6IEVsZW1lbnRSZWY7XHJcbiAgICBAT3V0cHV0KCkgaGVhZGVySGVpZ2h0Q2hhbmdlPW5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNoYW5nZXMpXHJcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHt9XHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBoZWFkZXJIZWlnaHQ9cGFyc2VJbnQodGhpcy5oZWFkZXJIZWlnaHRFbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCwgMTApKzIwO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiaGVhZGVySGVpZ2h0IFwiK2hlYWRlckhlaWdodClcclxuICAgICAgICB0aGlzLmhlYWRlckhlaWdodENoYW5nZS5lbWl0KHsgaGVhZGVySGVpZ2h0IH0pO1xyXG4gICAgICAgIC8vc2V0VGltZW91dCgoKSA9PiB0aGlzLnVwZGF0ZURpbXMoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKCkge1xyXG4gICAgICAgIC8vdGhpcy50aWNrcz10aGlzLnhTY2FsZS5uaWNlKCkudGlja3MoKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19