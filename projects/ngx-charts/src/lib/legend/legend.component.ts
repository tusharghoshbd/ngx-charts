import { Component, OnInit, OnChanges, Input,AfterViewInit, ViewChild, Output, EventEmitter, ElementRef, SimpleChanges } from '@angular/core';
import { trimLabel } from '../utils/trim-label.helper';
@Component({
    selector: 'chart-legend',
    templateUrl: './legend.component.html',
    styleUrls: ['./legend.component.css']
})
export class LegendComponent implements OnInit, OnChanges, AfterViewInit {
    
    @Input() groupName: any;
    @Input() series: any;
    @Input() options: any;
    trimLabel: any;
    constructor() {
        this.trimLabel=trimLabel;
    }

    ngOnChanges(changes: SimpleChanges): void {
        // console.log(changes)
        this.update();
    }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
    }

    update() {
    }

}
