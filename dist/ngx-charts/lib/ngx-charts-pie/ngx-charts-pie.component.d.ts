import { OnChanges, OnInit, SimpleChanges, ElementRef, ChangeDetectorRef } from "@angular/core";
export declare class ngxChartsPieComponent implements OnChanges, OnInit {
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
    pies: any;
    lineCircle: any;
    groupName: any[];
    colorScale: any;
    calcArc: any;
    pieGenerator: any;
    translation: string;
    trimLabel: any;
    constructor(chartElement: ElementRef, cdr: ChangeDetectorRef);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    update(): void;
    pieGeneratorFunc(): any;
    calculateArc(): any;
    outerArc(): any;
    calPlotBackground(): void;
    createPie(): void;
    midAngle(d: any): number;
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
