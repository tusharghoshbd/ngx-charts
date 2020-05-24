import { OnInit, OnChanges, AfterViewInit, EventEmitter, ElementRef, SimpleChanges } from '@angular/core';
export declare class XAxisComponent implements OnInit, OnChanges, AfterViewInit {
    xScale: any;
    yScale: any;
    options: any;
    categories: any;
    series: any;
    xAxisHeightEl: ElementRef;
    xAxisHeightChange: EventEmitter<{}>;
    ticks: any[];
    trimLabel: any;
    constructor();
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    update(): void;
    xTransformRotate(item: any): string;
    pathDirection(tick: any): string;
}
