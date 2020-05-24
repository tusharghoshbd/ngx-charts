/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { trimLabel } from '../utils/trim-label.helper';
export class LegendComponent {
    constructor() {
        this.trimLabel = trimLabel;
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
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
    }
    /**
     * @return {?}
     */
    update() {
    }
}
LegendComponent.decorators = [
    { type: Component, args: [{
                selector: 'chart-legend',
                template: "<div class=\"chart-legend ng-tns-c30-0 ng-star-inserted\" [style.width]=\"options.width+'px'\">\r\n    <div style=\"text-align: center;\">\r\n        <div class=\"legend-wrap\">\r\n            <ul class=\"legend-labels\" style=\"max-height: 255px;\">\r\n                <li class=\"legend-label ng-star-inserted\"\r\n                  *ngFor=\"let gn of groupName;let i=index\"  \r\n                >\r\n                    <div  *ngIf=\"gn.name\">\r\n                        <span class=\"legend-label-color\" \r\n                            [style.background-color] = \"gn.color\"> </span>\r\n                        <span class=\"legend-label-text\">\r\n                            {{ options.legend.labelEllipsis ? trimLabel(gn.name,  options.legend.labelEllipsisSize) :gn.name}}\r\n                        </span>\r\n                    </div>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n</div>",
                styles: [".chart-legend ul li{display:inline-block}.chart-legend{text-align:center;display:inline-block;padding:0}.chart-legend .legend-label{text-align:center;cursor:pointer;font-size:90%;margin:8px;color:#afb7c8}.chart-legend li,.chart-legend ul{padding:0;margin:0;list-style:none}.chart-legend .legend-labels{line-height:85%;list-style:none;float:left;width:100%;border-radius:3px;overflow-y:auto;overflow-x:hidden;white-space:nowrap}.chart-legend .legend-label-color{display:inline-block;height:15px;width:15px;margin-right:5px;color:#5b646b;border-radius:3px}.chart-legend .legend-label-text{display:inline-block;vertical-align:top;line-height:15px;font-size:12px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}"]
            }] }
];
/** @nocollapse */
LegendComponent.ctorParameters = () => [];
LegendComponent.propDecorators = {
    groupName: [{ type: Input }],
    series: [{ type: Input }],
    options: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVnZW5kLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0dXNoYXJnaG9zaGJkL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvbGVnZW5kL2xlZ2VuZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXFCLEtBQUssRUFBNEUsTUFBTSxlQUFlLENBQUM7QUFDOUksT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBTXZELE1BQU0sT0FBTyxlQUFlO0lBTXhCO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBQyxTQUFTLENBQUM7SUFDN0IsQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDOUIsdUJBQXVCO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsQixDQUFDOzs7O0lBRUQsUUFBUTtJQUNSLENBQUM7Ozs7SUFFRCxlQUFlO0lBQ2YsQ0FBQzs7OztJQUVELE1BQU07SUFDTixDQUFDOzs7WUEzQkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxjQUFjO2dCQUN4QixvN0JBQXNDOzthQUV6Qzs7Ozs7d0JBR0ksS0FBSztxQkFDTCxLQUFLO3NCQUNMLEtBQUs7Ozs7SUFGTixvQ0FBd0I7O0lBQ3hCLGlDQUFxQjs7SUFDckIsa0NBQXNCOztJQUN0QixvQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkNoYW5nZXMsIElucHV0LEFmdGVyVmlld0luaXQsIFZpZXdDaGlsZCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEVsZW1lbnRSZWYsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgdHJpbUxhYmVsIH0gZnJvbSAnLi4vdXRpbHMvdHJpbS1sYWJlbC5oZWxwZXInO1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnY2hhcnQtbGVnZW5kJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9sZWdlbmQuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vbGVnZW5kLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGVnZW5kQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQge1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBncm91cE5hbWU6IGFueTtcclxuICAgIEBJbnB1dCgpIHNlcmllczogYW55O1xyXG4gICAgQElucHV0KCkgb3B0aW9uczogYW55O1xyXG4gICAgdHJpbUxhYmVsOiBhbnk7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnRyaW1MYWJlbD10cmltTGFiZWw7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNoYW5nZXMpXHJcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgIH1cclxuXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKCkge1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=