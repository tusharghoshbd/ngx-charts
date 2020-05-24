/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AxesModule } from '../axes/axes.module';
import { HeaderModule } from '../header/header.module';
import { LegendModule } from '../legend/legend.module';
import { TooltipModule } from '../tooltip/tooltip.module';
import { ngxChartsBarComponent } from "./ngx-charts-bar.component";
var ngxChartsBarModule = /** @class */ (function () {
    function ngxChartsBarModule() {
    }
    ngxChartsBarModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [ngxChartsBarComponent],
                    imports: [CommonModule, AxesModule, HeaderModule, LegendModule, TooltipModule],
                    exports: [ngxChartsBarComponent],
                    providers: [],
                },] }
    ];
    return ngxChartsBarModule;
}());
export { ngxChartsBarModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNoYXJ0cy1iYXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHR1c2hhcmdob3NoYmQvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtY2hhcnRzLWJhci9uZ3gtY2hhcnRzLWJhci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUUxRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUduRTtJQUFBO0lBTWtDLENBQUM7O2dCQU5sQyxRQUFRLFNBQUM7b0JBQ04sWUFBWSxFQUFFLENBQUMscUJBQXFCLENBQUM7b0JBQ3JDLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFDLFlBQVksRUFBRSxhQUFhLENBQUM7b0JBQzdFLE9BQU8sRUFBRSxDQUFDLHFCQUFxQixDQUFDO29CQUNoQyxTQUFTLEVBQUUsRUFBRTtpQkFDaEI7O0lBQ2lDLHlCQUFDO0NBQUEsQUFObkMsSUFNbUM7U0FBdEIsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQnJvd3Nlck1vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyXCI7XHJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xyXG5cclxuaW1wb3J0IHsgQXhlc01vZHVsZSB9IGZyb20gJy4uL2F4ZXMvYXhlcy5tb2R1bGUnO1xyXG5pbXBvcnQgeyBIZWFkZXJNb2R1bGUgfSBmcm9tICcuLi9oZWFkZXIvaGVhZGVyLm1vZHVsZSc7XHJcbmltcG9ydCB7IExlZ2VuZE1vZHVsZSB9IGZyb20gJy4uL2xlZ2VuZC9sZWdlbmQubW9kdWxlJztcclxuaW1wb3J0IHsgVG9vbHRpcE1vZHVsZSB9IGZyb20gJy4uL3Rvb2x0aXAvdG9vbHRpcC5tb2R1bGUnO1xyXG5cclxuaW1wb3J0IHsgbmd4Q2hhcnRzQmFyQ29tcG9uZW50IH0gZnJvbSBcIi4vbmd4LWNoYXJ0cy1iYXIuY29tcG9uZW50XCI7XHJcblxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGRlY2xhcmF0aW9uczogW25neENoYXJ0c0JhckNvbXBvbmVudF0sXHJcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBBeGVzTW9kdWxlLCBIZWFkZXJNb2R1bGUsTGVnZW5kTW9kdWxlLCBUb29sdGlwTW9kdWxlXSxcclxuICAgIGV4cG9ydHM6IFtuZ3hDaGFydHNCYXJDb21wb25lbnRdLFxyXG4gICAgcHJvdmlkZXJzOiBbXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIG5neENoYXJ0c0Jhck1vZHVsZSB7IH1cclxuIl19