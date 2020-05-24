import { OnInit, OnChanges, AfterViewInit, EventEmitter, ElementRef, SimpleChanges } from '@angular/core';
export declare class HeaderComponent implements OnInit, OnChanges, AfterViewInit {
    options: any;
    headerHeightEl: ElementRef;
    headerHeightChange: EventEmitter<{}>;
    constructor();
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    update(): void;
}
