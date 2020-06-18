import { OnInit, OnChanges, SimpleChanges, ElementRef, EventEmitter } from "@angular/core";
export declare class YAxisComponent implements OnInit, OnChanges {
    xScale: any;
    yScale: any;
    options: any;
    categories: any;
    series: any;
    yAxisWidthEl: ElementRef;
    yAxisWidthChange: EventEmitter<{}>;
    ticks: any[];
    trimLabel: any;
    constructor();
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    update(): void;
    transform(x: any): string;
    pathDirection(tick: any): string;
    calculateYTextPosition(item: any): any;
}
