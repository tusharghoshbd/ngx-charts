import { OnInit, OnChanges, AfterViewInit, SimpleChanges } from '@angular/core';
export declare class LegendComponent implements OnInit, OnChanges, AfterViewInit {
    groupName: any;
    series: any;
    options: any;
    trimLabel: any;
    constructor();
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    update(): void;
}
