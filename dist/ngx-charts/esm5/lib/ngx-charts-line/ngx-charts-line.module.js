/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AxesModule } from '../axes/axes.module';
import { HeaderModule } from '../header/header.module';
import { LegendModule } from '../legend/legend.module';
import { ngxChartsLineComponent } from "./ngx-charts-line.component";
import { TooltipModule } from '../tooltip/tooltip.module';
var ngxChartsLineModule = /** @class */ (function () {
    function ngxChartsLineModule() {
    }
    ngxChartsLineModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [ngxChartsLineComponent],
                    imports: [CommonModule, AxesModule, HeaderModule, LegendModule, TooltipModule],
                    exports: [ngxChartsLineComponent],
                    providers: [],
                },] }
    ];
    return ngxChartsLineModule;
}());
export { ngxChartsLineModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNoYXJ0cy1saW5lLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0dXNoYXJnaG9zaGJkL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvbmd4LWNoYXJ0cy1saW5lL25neC1jaGFydHMtbGluZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUUxRDtJQUFBO0lBTW1DLENBQUM7O2dCQU5uQyxRQUFRLFNBQUM7b0JBQ04sWUFBWSxFQUFFLENBQUMsc0JBQXNCLENBQUM7b0JBQ3RDLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFDLFlBQVksRUFBRSxhQUFhLENBQUM7b0JBQzdFLE9BQU8sRUFBRSxDQUFDLHNCQUFzQixDQUFDO29CQUNqQyxTQUFTLEVBQUUsRUFBRTtpQkFDaEI7O0lBQ2tDLDBCQUFDO0NBQUEsQUFOcEMsSUFNb0M7U0FBdkIsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQnJvd3Nlck1vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyXCI7XHJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xyXG5cclxuaW1wb3J0IHsgQXhlc01vZHVsZSB9IGZyb20gJy4uL2F4ZXMvYXhlcy5tb2R1bGUnO1xyXG5pbXBvcnQgeyBIZWFkZXJNb2R1bGUgfSBmcm9tICcuLi9oZWFkZXIvaGVhZGVyLm1vZHVsZSc7XHJcbmltcG9ydCB7IExlZ2VuZE1vZHVsZSB9IGZyb20gJy4uL2xlZ2VuZC9sZWdlbmQubW9kdWxlJztcclxuaW1wb3J0IHsgbmd4Q2hhcnRzTGluZUNvbXBvbmVudCB9IGZyb20gXCIuL25neC1jaGFydHMtbGluZS5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgVG9vbHRpcE1vZHVsZSB9IGZyb20gJy4uL3Rvb2x0aXAvdG9vbHRpcC5tb2R1bGUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGRlY2xhcmF0aW9uczogW25neENoYXJ0c0xpbmVDb21wb25lbnRdLFxyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgQXhlc01vZHVsZSwgSGVhZGVyTW9kdWxlLExlZ2VuZE1vZHVsZSwgVG9vbHRpcE1vZHVsZV0sXHJcbiAgICBleHBvcnRzOiBbbmd4Q2hhcnRzTGluZUNvbXBvbmVudF0sXHJcbiAgICBwcm92aWRlcnM6IFtdLFxyXG59KVxyXG5leHBvcnQgY2xhc3Mgbmd4Q2hhcnRzTGluZU1vZHVsZSB7IH1cclxuIl19