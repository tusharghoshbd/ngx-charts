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
        // console.log("-----------------------")
        // console.log(this.options)
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
    xTransformRotate(item) { 
        // let angle=315;
        // console.log(this.categories.join(" ").length, this.xScale.bandwidth())
        // if (this.categories.join(" ").length>this.options.plotBackground.width)
        //     angle=0;
        return "rotate("+this.options.xAxis.labelRotation+", "+(this.xScale(item) + (this.xScale.bandwidth()/2)+this.options.yAxis.width)+", "+(this.yScale(this.ticks[0])+20+this.options.header.height)+")";
    }



}
