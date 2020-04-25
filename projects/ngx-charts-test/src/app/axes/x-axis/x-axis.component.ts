import { Component, OnInit, OnChanges, Input,AfterViewInit, ViewChild, Output, EventEmitter, ElementRef, SimpleChanges } from '@angular/core';

@Component({
    selector: 'g[x-axis]',
    templateUrl: './x-axis.component.html',
    styleUrls: ['./x-axis.component.css']
})
export class XAxisComponent implements OnInit, OnChanges, AfterViewInit {

    @Input() xScale: any;
    @Input() yScale: any;
    @Input() options: any;

    @Input() categories: any=[];
    @Input() series: any=[];

    @ViewChild('xAxisHeightEl', { static: true }) xAxisHeightEl: ElementRef;
    @Output() xAxisHeightChange=new EventEmitter();

    ticks: any[]=[];

    constructor() { }

    ngOnChanges(changes: SimpleChanges): void {
        // console.log(changes)
        this.update();
    }

    ngOnInit() {}

    ngAfterViewInit(): void {
        let xAxisHeight=parseInt(this.xAxisHeightEl.nativeElement.getBoundingClientRect().height, 10);
        if (xAxisHeight<50)
            xAxisHeight=50;
        //console.log("xAxisHeight "+xAxisHeight);
        this.xAxisHeightChange.emit({ xAxisHeight });
        //setTimeout(() => this.updateDims());
    }

    update() {
        this.ticks=this.yScale.nice().ticks();
    }



}
