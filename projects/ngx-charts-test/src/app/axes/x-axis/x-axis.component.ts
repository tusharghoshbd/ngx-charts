import { Component, OnInit, OnChanges, Input, AfterViewInit, ViewChild, Output, EventEmitter, ElementRef, SimpleChanges } from '@angular/core';

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

    @ViewChild('xAxisHeightEl', { read: ElementRef, static: false }) xAxisHeightEl: ElementRef;
    @Output() xAxisHeightChange=new EventEmitter();

    ticks: any[]=[];

    constructor() { }

    ngOnChanges(changes: SimpleChanges): void {
        // console.log("-----------------------")
        // console.log(this.options)
        //console.log(this.xScale)
        this.update();
    }

    ngOnInit() { }

    ngAfterViewInit(): void {
        setTimeout(() => {
            let xAxisHeight=parseInt(this.xAxisHeightEl.nativeElement.getBoundingClientRect().height, 10)+10;
            // if (xAxisHeight<50)
            //     xAxisHeight=50;
            // console.log("x height ", xAxisHeight)
            if (xAxisHeight!==this.options.xAxis.height) {
                // console.log("ngAfterViewInit", "xxxxxxxxxx", xAxisHeight, this.options.xAxis.height)
                this.xAxisHeightChange.emit({ xAxisHeight });
            }
        }, 0);
        
    }

    update() {
        if (this.options.barType=="vertical") {
            this.ticks=this.yScale.nice().ticks();
        }
        else {
            this.ticks=this.xScale.nice().ticks();
        }
        this.ngAfterViewInit();
    }
    xTransformRotate(item) {
        if (this.options.barType=="vertical") {
            return "rotate("+this.options.xAxis.labelRotation+", "+(this.xScale(item)+(this.xScale.bandwidth()/2)+this.options.yAxis.width)+", "+(this.options.height-20)+")";
        }
        else {
            return "rotate("+this.options.xAxis.labelRotation+", "+(this.xScale(item)+this.options.yAxis.width)+", "+(this.options.height-this.options.xAxis.height+20)+")";
        }

    }

    pathDirection(tick) {
        return 'M '+(this.xScale(tick)+this.options.yAxis.width)+' '+(this.options.header.height)+' L '+(this.xScale(tick)+this.options.yAxis.width)+' '+(this.options.height-this.options.xAxis.height);
    }




}
