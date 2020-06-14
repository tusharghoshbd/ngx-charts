/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AxesModule } from '../axes/axes.module';
import { HeaderModule } from '../header/header.module';
import { LegendModule } from '../legend/legend.module';
import { ngxChartsComboComponent } from "./ngx-charts-combo.component";
import { TooltipModule } from '../tooltip/tooltip.module';
var ngxChartsComboModule = /** @class */ (function () {
    function ngxChartsComboModule() {
    }
    ngxChartsComboModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [ngxChartsComboComponent],
                    imports: [CommonModule, AxesModule, HeaderModule, LegendModule, TooltipModule],
                    exports: [ngxChartsComboComponent],
                    providers: [],
                },] }
    ];
    return ngxChartsComboModule;
}());
export { ngxChartsComboModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNoYXJ0cy1jb21iby5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHVzaGFyZ2hvc2hiZC9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL25neC1jaGFydHMtY29tYm8vbmd4LWNoYXJ0cy1jb21iby5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUUxRDtJQUFBO0lBTW9DLENBQUM7O2dCQU5wQyxRQUFRLFNBQUM7b0JBQ04sWUFBWSxFQUFFLENBQUMsdUJBQXVCLENBQUM7b0JBQ3ZDLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxhQUFhLENBQUM7b0JBQzlFLE9BQU8sRUFBRSxDQUFDLHVCQUF1QixDQUFDO29CQUNsQyxTQUFTLEVBQUUsRUFBRTtpQkFDaEI7O0lBQ21DLDJCQUFDO0NBQUEsQUFOckMsSUFNcUM7U0FBeEIsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQnJvd3Nlck1vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyXCI7XHJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xyXG5cclxuaW1wb3J0IHsgQXhlc01vZHVsZSB9IGZyb20gJy4uL2F4ZXMvYXhlcy5tb2R1bGUnO1xyXG5pbXBvcnQgeyBIZWFkZXJNb2R1bGUgfSBmcm9tICcuLi9oZWFkZXIvaGVhZGVyLm1vZHVsZSc7XHJcbmltcG9ydCB7IExlZ2VuZE1vZHVsZSB9IGZyb20gJy4uL2xlZ2VuZC9sZWdlbmQubW9kdWxlJztcclxuaW1wb3J0IHsgbmd4Q2hhcnRzQ29tYm9Db21wb25lbnQgfSBmcm9tIFwiLi9uZ3gtY2hhcnRzLWNvbWJvLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBUb29sdGlwTW9kdWxlIH0gZnJvbSAnLi4vdG9vbHRpcC90b29sdGlwLm1vZHVsZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgZGVjbGFyYXRpb25zOiBbbmd4Q2hhcnRzQ29tYm9Db21wb25lbnRdLFxyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgQXhlc01vZHVsZSwgSGVhZGVyTW9kdWxlLCBMZWdlbmRNb2R1bGUsIFRvb2x0aXBNb2R1bGVdLFxyXG4gICAgZXhwb3J0czogW25neENoYXJ0c0NvbWJvQ29tcG9uZW50XSxcclxuICAgIHByb3ZpZGVyczogW10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBuZ3hDaGFydHNDb21ib01vZHVsZSB7IH1cclxuIl19