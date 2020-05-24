/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent() {
        this.headerHeightChange = new EventEmitter();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    HeaderComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        // console.log(changes)
        this.update();
    };
    /**
     * @return {?}
     */
    HeaderComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * @return {?}
     */
    HeaderComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var headerHeight = parseInt(this.headerHeightEl.nativeElement.getBoundingClientRect().height, 10) + 20;
        // console.log("headerHeight "+headerHeight)
        this.headerHeightChange.emit({ headerHeight: headerHeight });
        //setTimeout(() => this.updateDims());
    };
    /**
     * @return {?}
     */
    HeaderComponent.prototype.update = /**
     * @return {?}
     */
    function () {
        //this.ticks=this.xScale.nice().ticks();
    };
    HeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'g[header]',
                    template: "\r\n<svg>\r\n\r\n    <g #headerHeightEl>\r\n\r\n        <text [attr.x]=\"options.width/2\" text-anchor=\"middle\" class=\"highcharts-title\" data-z-index=\"4\" style=\"color:#333333;font-size:18px;fill:#333333;\" y=\"24\" aria-hidden=\"true\">\r\n            <tspan>{{options.title}}</tspan>\r\n        </text>\r\n        <text [attr.x]=\"options.width/2\" text-anchor=\"middle\" class=\"highcharts-subtitle\" data-z-index=\"4\" style=\"color:#666666;fill:#666666;\" y=\"52\" aria-hidden=\"true\">\r\n            <tspan>{{options.subtitle}}</tspan>\r\n        </text>\r\n        <!-- <g class=\"highcharts-axis highcharts-yaxis\" data-z-index=\"2\" aria-hidden=\"true\" >\r\n            <text [attr.x]=\"options.width/2\" [attr.y]=\"options.height-10\" text-anchor=\"middle\" dominant-baseline=\"central\"  style=\"margin-bottom: 50px; color:#666666;cursor:default;font-size:11px;fill:#666666;\"\r\n                class=\"highcharts-axis-title\"\r\n                >\r\n                {{options.xAxis ? options.xAxis.title : \"\"}}\r\n            </text>\r\n        </g> -->\r\n    </g>\r\n \r\n</svg>",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    HeaderComponent.ctorParameters = function () { return []; };
    HeaderComponent.propDecorators = {
        options: [{ type: Input }],
        headerHeightEl: [{ type: ViewChild, args: ['headerHeightEl', { static: true },] }],
        headerHeightChange: [{ type: Output }]
    };
    return HeaderComponent;
}());
export { HeaderComponent };
if (false) {
    /** @type {?} */
    HeaderComponent.prototype.options;
    /** @type {?} */
    HeaderComponent.prototype.headerHeightEl;
    /** @type {?} */
    HeaderComponent.prototype.headerHeightChange;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0dXNoYXJnaG9zaGJkL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvaGVhZGVyL2hlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXFCLEtBQUssRUFBZ0IsU0FBUyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUU5STtJQWVJO1FBRFUsdUJBQWtCLEdBQUMsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUNoQyxDQUFDOzs7OztJQUVqQixxQ0FBVzs7OztJQUFYLFVBQVksT0FBc0I7UUFDOUIsdUJBQXVCO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsQixDQUFDOzs7O0lBRUQsa0NBQVE7OztJQUFSLGNBQVksQ0FBQzs7OztJQUViLHlDQUFlOzs7SUFBZjs7WUFDUSxZQUFZLEdBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxHQUFDLEVBQUU7UUFDbEcsNENBQTRDO1FBQzVDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxZQUFZLGNBQUEsRUFBRSxDQUFDLENBQUM7UUFDL0Msc0NBQXNDO0lBQzFDLENBQUM7Ozs7SUFFRCxnQ0FBTTs7O0lBQU47UUFDSSx3Q0FBd0M7SUFDNUMsQ0FBQzs7Z0JBakNKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsV0FBVztvQkFDckIsMmxDQUFzQzs7aUJBRXpDOzs7OzswQkFJSSxLQUFLO2lDQUtMLFNBQVMsU0FBQyxnQkFBZ0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7cUNBQzVDLE1BQU07O0lBcUJYLHNCQUFDO0NBQUEsQUFuQ0QsSUFtQ0M7U0E5QlksZUFBZTs7O0lBR3hCLGtDQUFzQjs7SUFLdEIseUNBQTBFOztJQUMxRSw2Q0FBZ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25DaGFuZ2VzLCBJbnB1dCxBZnRlclZpZXdJbml0LCBWaWV3Q2hpbGQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBFbGVtZW50UmVmLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnZ1toZWFkZXJdJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9oZWFkZXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vaGVhZGVyLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSGVhZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQge1xyXG4gICAgLy8gQElucHV0KCkgeFNjYWxlOiBhbnk7XHJcbiAgICAvLyBASW5wdXQoKSB5U2NhbGU6IGFueTtcclxuICAgIEBJbnB1dCgpIG9wdGlvbnM6IGFueTtcclxuXHJcbiAgICAvLyBASW5wdXQoKSBjYXRlZ29yaWVzOiBhbnk9W107XHJcbiAgICAvLyBASW5wdXQoKSBzZXJpZXM6IGFueT1bXTtcclxuXHJcbiAgICBAVmlld0NoaWxkKCdoZWFkZXJIZWlnaHRFbCcsIHsgc3RhdGljOiB0cnVlIH0pIGhlYWRlckhlaWdodEVsOiBFbGVtZW50UmVmO1xyXG4gICAgQE91dHB1dCgpIGhlYWRlckhlaWdodENoYW5nZT1uZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhjaGFuZ2VzKVxyXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7fVxyXG5cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcclxuICAgICAgICBsZXQgaGVhZGVySGVpZ2h0PXBhcnNlSW50KHRoaXMuaGVhZGVySGVpZ2h0RWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQsIDEwKSsyMDtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImhlYWRlckhlaWdodCBcIitoZWFkZXJIZWlnaHQpXHJcbiAgICAgICAgdGhpcy5oZWFkZXJIZWlnaHRDaGFuZ2UuZW1pdCh7IGhlYWRlckhlaWdodCB9KTtcclxuICAgICAgICAvL3NldFRpbWVvdXQoKCkgPT4gdGhpcy51cGRhdGVEaW1zKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSgpIHtcclxuICAgICAgICAvL3RoaXMudGlja3M9dGhpcy54U2NhbGUubmljZSgpLnRpY2tzKCk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==