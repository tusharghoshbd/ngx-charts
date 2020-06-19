import { OnChanges, OnInit, SimpleChanges, ElementRef, ChangeDetectorRef } from "@angular/core";
export declare class ngxChartsBarComponent implements OnChanges, OnInit {
    private chartElement;
    private cdr;
    private customOptions;
    private _options;
    options: any;
    categories: any;
    series: any;
    element: any;
    xScale: any;
    innerScale: any;
    yScale: any;
    bars: any;
    groupName: any[];
    groupBarPaddingBK: any;
    innerBarPaddingBK: any;
    colorScale: any;
    trimLabel: any;
    constructor(element: ElementRef, chartElement: ElementRef, cdr: ChangeDetectorRef);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    update(): void;
    getXScale(): any;
    getInnerScale(): any;
    getYScale(): any;
    calPlotBackground(): void;
    createBar(): void;
    yAxisWidthChange({ yAxisWidth, yAxisHeight, yAxisRightWidth }: {
        yAxisWidth: any;
        yAxisHeight: any;
        yAxisRightWidth: any;
    }): void;
    xAxisHeightChange({ xAxisHeight }: {
        xAxisHeight: any;
    }): void;
    headerHeightChange({ headerHeight }: {
        headerHeight: any;
    }): void;
    toolTipPlaccement(data: any): "left" | "right" | "top" | "bottom";
    onResize(event: any): void;
    getViewBox(): string;
    private strToNumber;
}
