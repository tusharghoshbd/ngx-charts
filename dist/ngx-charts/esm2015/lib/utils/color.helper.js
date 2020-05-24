/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { scaleOrdinal } from 'd3-scale';
export class ColorHelper {
    /**
     * @param {?} options
     * @param {?} series
     */
    constructor(options, series) {
        this.options = options;
        this.series = series;
    }
    /**
     * @return {?}
     */
    generateColorScale() {
        //let colorArr=["#a8385d", "#7aa3e5", "#a27ea8", "#aae3f5", "#adcded", "#a95963", "#8796c0", "#7ed3ed", "#50abcc", "#ad6886"]; //ngx-charts default color code
        //let colorList=['#7cb5ec', '#434348', '#f7a35c', '#90ed7d', '#8085E9', '#F15C80', '#E4D354', '#2B908F', '#F45B5B', '#91E8E1']; //highchart color code
        /** @type {?} */
        let colorList = ['#7cb5ec', '#434348', '#f7a35c', '#90ed7d', '#8085E9', '#F15C80', '#E4D354', '#2B908F', '#F45B5B', '#91E8E1', "#7aa3e5", "#a27ea8", "#aae3f5", "#adcded", "#a95963", "#8796c0", "#7ed3ed", "#50abcc", "#ad6886"];
        /** @type {?} */
        let barColors = [];
        /** @type {?} */
        let groupDataArr = [];
        for (let i = 0; i < this.series.length; i++) {
            groupDataArr.push(this.series[i].name);
            if (this.series[i].colorCode) {
                barColors.push(this.series[i].colorCode);
            }
            else {
                /** @type {?} */
                let index = i % colorList.length;
                barColors.push(colorList[index]);
            }
        }
        return scaleOrdinal()
            .range(barColors)
            .domain(groupDataArr);
    }
}
if (false) {
    /** @type {?} */
    ColorHelper.prototype.options;
    /** @type {?} */
    ColorHelper.prototype.series;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3IuaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHR1c2hhcmdob3NoYmQvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi91dGlscy9jb2xvci5oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBMEIsWUFBWSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRWhFLE1BQU0sT0FBTyxXQUFXOzs7OztJQUtwQixZQUFZLE9BQU8sRUFBRSxNQUFNO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUMsT0FBTyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7Ozs7SUFFRCxrQkFBa0I7Ozs7WUFHVixTQUFTLEdBQUcsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUM7O1lBQzdOLFNBQVMsR0FBQyxFQUFFOztZQUNaLFlBQVksR0FBQyxFQUFFO1FBQ25CLEtBQUssSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNyQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRTtnQkFDMUIsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQzVDO2lCQUNJOztvQkFDRyxLQUFLLEdBQUMsQ0FBQyxHQUFDLFNBQVMsQ0FBQyxNQUFNO2dCQUM1QixTQUFTLENBQUMsSUFBSSxDQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQ3JDO1NBQ0o7UUFDRCxPQUFPLFlBQVksRUFBRTthQUNoQixLQUFLLENBQUMsU0FBUyxDQUFDO2FBQ2hCLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM5QixDQUFDO0NBR0o7OztJQTlCRyw4QkFBYTs7SUFDYiw2QkFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJhbmdlIH0gZnJvbSAnZDMtYXJyYXknO1xyXG5pbXBvcnQgeyBzY2FsZUJhbmQsIHNjYWxlTGluZWFyLCBzY2FsZU9yZGluYWwgfSBmcm9tICdkMy1zY2FsZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29sb3JIZWxwZXIge1xyXG5cclxuICAgIG9wdGlvbnM6IGFueTtcclxuICAgIHNlcmllczogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMsIHNlcmllcykge1xyXG4gICAgICAgIHRoaXMub3B0aW9ucz1vcHRpb25zO1xyXG4gICAgICAgIHRoaXMuc2VyaWVzPXNlcmllcztcclxuICAgIH1cclxuXHJcbiAgICBnZW5lcmF0ZUNvbG9yU2NhbGUoKSB7XHJcbiAgICAgICAgLy9sZXQgY29sb3JBcnI9W1wiI2E4Mzg1ZFwiLCBcIiM3YWEzZTVcIiwgXCIjYTI3ZWE4XCIsIFwiI2FhZTNmNVwiLCBcIiNhZGNkZWRcIiwgXCIjYTk1OTYzXCIsIFwiIzg3OTZjMFwiLCBcIiM3ZWQzZWRcIiwgXCIjNTBhYmNjXCIsIFwiI2FkNjg4NlwiXTsgLy9uZ3gtY2hhcnRzIGRlZmF1bHQgY29sb3IgY29kZVxyXG4gICAgICAgIC8vbGV0IGNvbG9yTGlzdD1bJyM3Y2I1ZWMnLCAnIzQzNDM0OCcsICcjZjdhMzVjJywgJyM5MGVkN2QnLCAnIzgwODVFOScsICcjRjE1QzgwJywgJyNFNEQzNTQnLCAnIzJCOTA4RicsICcjRjQ1QjVCJywgJyM5MUU4RTEnXTsgLy9oaWdoY2hhcnQgY29sb3IgY29kZVxyXG4gICAgICAgIGxldCBjb2xvckxpc3QgPSBbJyM3Y2I1ZWMnLCAnIzQzNDM0OCcsICcjZjdhMzVjJywgJyM5MGVkN2QnLCAnIzgwODVFOScsICcjRjE1QzgwJywgJyNFNEQzNTQnLCAnIzJCOTA4RicsICcjRjQ1QjVCJywgJyM5MUU4RTEnLCBcIiM3YWEzZTVcIiwgXCIjYTI3ZWE4XCIsIFwiI2FhZTNmNVwiLCBcIiNhZGNkZWRcIiwgXCIjYTk1OTYzXCIsIFwiIzg3OTZjMFwiLCBcIiM3ZWQzZWRcIiwgXCIjNTBhYmNjXCIsIFwiI2FkNjg4NlwiXVxyXG4gICAgICAgIGxldCBiYXJDb2xvcnM9W107XHJcbiAgICAgICAgbGV0IGdyb3VwRGF0YUFycj1bXTtcclxuICAgICAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy5zZXJpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZ3JvdXBEYXRhQXJyLnB1c2godGhpcy5zZXJpZXNbaV0ubmFtZSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlcmllc1tpXS5jb2xvckNvZGUpIHtcclxuICAgICAgICAgICAgICAgIGJhckNvbG9ycy5wdXNoKHRoaXMuc2VyaWVzW2ldLmNvbG9yQ29kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXg9aSVjb2xvckxpc3QubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgYmFyQ29sb3JzLnB1c2goIGNvbG9yTGlzdFtpbmRleF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzY2FsZU9yZGluYWwoKVxyXG4gICAgICAgICAgICAucmFuZ2UoYmFyQ29sb3JzKVxyXG4gICAgICAgICAgICAuZG9tYWluKGdyb3VwRGF0YUFycik7XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG4iXX0=