import { Component, OnInit, OnChanges, Input,AfterViewInit, ViewChild, Output, EventEmitter, ElementRef, SimpleChanges } from '@angular/core';

@Component({
    selector: 'chart-legend',
    templateUrl: './legend.component.html',
    styleUrls: ['./legend.component.css']
})
export class LegendComponent implements OnInit, OnChanges, AfterViewInit {
   
    @Input() series: any;
    @Input() options: any;
    constructor() { }

    ngOnChanges(changes: SimpleChanges): void {
        // console.log(changes)
        this.update();
    }

    ngOnInit() {}

    ngAfterViewInit(): void {
    }

    update() {
    }

}
