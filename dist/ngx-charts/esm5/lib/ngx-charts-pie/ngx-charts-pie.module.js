/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AxesModule } from '../axes/axes.module';
import { HeaderModule } from '../header/header.module';
import { LegendModule } from '../legend/legend.module';
import { ngxChartsPieComponent } from "./ngx-charts-pie.component";
import { TooltipModule } from '../tooltip/tooltip.module';
var ngxChartsPieModule = /** @class */ (function () {
    function ngxChartsPieModule() {
    }
    ngxChartsPieModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [ngxChartsPieComponent],
                    imports: [CommonModule, AxesModule, HeaderModule, LegendModule, TooltipModule],
                    exports: [ngxChartsPieComponent],
                    providers: [],
                },] }
    ];
    return ngxChartsPieModule;
}());
export { ngxChartsPieModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNoYXJ0cy1waWUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHR1c2hhcmdob3NoYmQvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtY2hhcnRzLXBpZS9uZ3gtY2hhcnRzLXBpZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ25FLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUUxRDtJQUFBO0lBTWtDLENBQUM7O2dCQU5sQyxRQUFRLFNBQUM7b0JBQ04sWUFBWSxFQUFFLENBQUMscUJBQXFCLENBQUM7b0JBQ3JDLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFDLFlBQVksRUFBRSxhQUFhLENBQUM7b0JBQzdFLE9BQU8sRUFBRSxDQUFDLHFCQUFxQixDQUFDO29CQUNoQyxTQUFTLEVBQUUsRUFBRTtpQkFDaEI7O0lBQ2lDLHlCQUFDO0NBQUEsQUFObkMsSUFNbUM7U0FBdEIsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQnJvd3Nlck1vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyXCI7XHJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xyXG5cclxuaW1wb3J0IHsgQXhlc01vZHVsZSB9IGZyb20gJy4uL2F4ZXMvYXhlcy5tb2R1bGUnO1xyXG5pbXBvcnQgeyBIZWFkZXJNb2R1bGUgfSBmcm9tICcuLi9oZWFkZXIvaGVhZGVyLm1vZHVsZSc7XHJcbmltcG9ydCB7IExlZ2VuZE1vZHVsZSB9IGZyb20gJy4uL2xlZ2VuZC9sZWdlbmQubW9kdWxlJztcclxuaW1wb3J0IHsgbmd4Q2hhcnRzUGllQ29tcG9uZW50IH0gZnJvbSBcIi4vbmd4LWNoYXJ0cy1waWUuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFRvb2x0aXBNb2R1bGUgfSBmcm9tICcuLi90b29sdGlwL3Rvb2x0aXAubW9kdWxlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBkZWNsYXJhdGlvbnM6IFtuZ3hDaGFydHNQaWVDb21wb25lbnRdLFxyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgQXhlc01vZHVsZSwgSGVhZGVyTW9kdWxlLExlZ2VuZE1vZHVsZSwgVG9vbHRpcE1vZHVsZV0sXHJcbiAgICBleHBvcnRzOiBbbmd4Q2hhcnRzUGllQ29tcG9uZW50XSxcclxuICAgIHByb3ZpZGVyczogW10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBuZ3hDaGFydHNQaWVNb2R1bGUgeyB9XHJcbiJdfQ==