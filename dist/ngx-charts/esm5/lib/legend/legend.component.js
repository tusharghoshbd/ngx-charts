/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { trimLabel } from '../utils/trim-label.helper';
var LegendComponent = /** @class */ (function () {
    function LegendComponent() {
        this.trimLabel = trimLabel;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    LegendComponent.prototype.ngOnChanges = /**
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
    LegendComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    LegendComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    LegendComponent.prototype.update = /**
     * @return {?}
     */
    function () {
    };
    LegendComponent.decorators = [
        { type: Component, args: [{
                    selector: 'chart-legend',
                    template: "<div class=\"chart-legend ng-tns-c30-0 ng-star-inserted\" [style.width]=\"options.width+'px'\">\r\n    <div style=\"text-align: center;\">\r\n        <div class=\"legend-wrap\">\r\n            <ul class=\"legend-labels\" style=\"max-height: 255px;\">\r\n                <li class=\"legend-label ng-star-inserted\"\r\n                  *ngFor=\"let gn of groupName;let i=index\"  \r\n                >\r\n                    <div  *ngIf=\"gn.name\">\r\n                        <span class=\"legend-label-color\" \r\n                            [style.background-color] = \"gn.color\"> </span>\r\n                        <span class=\"legend-label-text\">\r\n                            {{ options.legend.labelEllipsis ? trimLabel(gn.name,  options.legend.labelEllipsisSize) :gn.name}}\r\n                        </span>\r\n                    </div>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n</div>",
                    styles: [".chart-legend ul li{display:inline-block}.chart-legend{text-align:center;display:inline-block;padding:0}.chart-legend .legend-label{text-align:center;cursor:pointer;font-size:90%;margin:8px;color:#afb7c8}.chart-legend li,.chart-legend ul{padding:0;margin:0;list-style:none}.chart-legend .legend-labels{line-height:85%;list-style:none;float:left;width:100%;border-radius:3px;overflow-y:auto;overflow-x:hidden;white-space:nowrap}.chart-legend .legend-label-color{display:inline-block;height:15px;width:15px;margin-right:5px;color:#5b646b;border-radius:3px}.chart-legend .legend-label-text{display:inline-block;vertical-align:top;line-height:15px;font-size:12px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}"]
                }] }
    ];
    /** @nocollapse */
    LegendComponent.ctorParameters = function () { return []; };
    LegendComponent.propDecorators = {
        groupName: [{ type: Input }],
        series: [{ type: Input }],
        options: [{ type: Input }]
    };
    return LegendComponent;
}());
export { LegendComponent };
if (false) {
    /** @type {?} */
    LegendComponent.prototype.groupName;
    /** @type {?} */
    LegendComponent.prototype.series;
    /** @type {?} */
    LegendComponent.prototype.options;
    /** @type {?} */
    LegendComponent.prototype.trimLabel;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVnZW5kLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0dXNoYXJnaG9zaGJkL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvbGVnZW5kL2xlZ2VuZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXFCLEtBQUssRUFBNEUsTUFBTSxlQUFlLENBQUM7QUFDOUksT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3ZEO0lBV0k7UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFDLFNBQVMsQ0FBQztJQUM3QixDQUFDOzs7OztJQUVELHFDQUFXOzs7O0lBQVgsVUFBWSxPQUFzQjtRQUM5Qix1QkFBdUI7UUFDdkIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2xCLENBQUM7Ozs7SUFFRCxrQ0FBUTs7O0lBQVI7SUFDQSxDQUFDOzs7O0lBRUQseUNBQWU7OztJQUFmO0lBQ0EsQ0FBQzs7OztJQUVELGdDQUFNOzs7SUFBTjtJQUNBLENBQUM7O2dCQTNCSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLG83QkFBc0M7O2lCQUV6Qzs7Ozs7NEJBR0ksS0FBSzt5QkFDTCxLQUFLOzBCQUNMLEtBQUs7O0lBb0JWLHNCQUFDO0NBQUEsQUE3QkQsSUE2QkM7U0F4QlksZUFBZTs7O0lBRXhCLG9DQUF3Qjs7SUFDeEIsaUNBQXFCOztJQUNyQixrQ0FBc0I7O0lBQ3RCLG9DQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uQ2hhbmdlcywgSW5wdXQsQWZ0ZXJWaWV3SW5pdCwgVmlld0NoaWxkLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZiwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyB0cmltTGFiZWwgfSBmcm9tICcuLi91dGlscy90cmltLWxhYmVsLmhlbHBlcic7XHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdjaGFydC1sZWdlbmQnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2xlZ2VuZC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9sZWdlbmQuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMZWdlbmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCB7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIGdyb3VwTmFtZTogYW55O1xyXG4gICAgQElucHV0KCkgc2VyaWVzOiBhbnk7XHJcbiAgICBASW5wdXQoKSBvcHRpb25zOiBhbnk7XHJcbiAgICB0cmltTGFiZWw6IGFueTtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMudHJpbUxhYmVsPXRyaW1MYWJlbDtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coY2hhbmdlcylcclxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKSB7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==