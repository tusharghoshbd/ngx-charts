import { OnChanges, OnInit, SimpleChanges, ElementRef, ChangeDetectorRef } from "@angular/core";
export declare class ngxChartsLineComponent implements OnChanges, OnInit {
    private chartElement;
    private cdr;
    private customOptions;
    private _options;
    options: any;
    categories: any;
    series: any;
    xScale: any;
    innerScale: any;
    yScale: any;
    lines: any;
    lineCircle: any;
    groupName: any[];
    groupBarPaddingBK: any;
    innerBarPaddingBK: any;
    colorScale: any;
    constructor(chartElement: ElementRef, cdr: ChangeDetectorRef);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    update(): void;
    getXScale(): any;
    getInnerScale(): any;
    getYScale(): any;
    calPlotBackground(): void;
    createLine(): void;
    yAxisWidthChange({ yAxisWidth, yAxisHeight }: {
        yAxisWidth: any;
        yAxisHeight: any;
    }): void;
    xAxisHeightChange({ xAxisHeight }: {
        xAxisHeight: any;
    }): void;
    headerHeightChange({ headerHeight }: {
        headerHeight: any;
    }): void;
    toolTipPlaccement(data: any): "left" | "right" | "top" | "bottom";
    onResize(event: any): void;
    private strToNumber;
}
