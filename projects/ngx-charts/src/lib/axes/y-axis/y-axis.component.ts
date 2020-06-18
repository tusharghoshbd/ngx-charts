import {
    Component, OnInit, Input, OnChanges,
    SimpleChanges, ViewChild, ElementRef,
    Output,EventEmitter
} from "@angular/core";
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { trimLabel } from '../../utils/trim-label.helper';
@Component({
    selector: "g[y-axis]",
    templateUrl: "./y-axis.component.html",
    styleUrls: ["./y-axis.component.css"],
})
export class YAxisComponent implements OnInit, OnChanges {
    @Input() xScale: any;
    @Input() yScale: any;
    @Input() options: any;

    @Input() categories: any=[];
    @Input() series: any=[];

    @ViewChild('yAxisWidthEl', {static:true}) yAxisWidthEl: ElementRef;
    @Output() yAxisWidthChange = new EventEmitter();

    ticks: any[]=[];
    
    trimLabel: any;
    constructor() {
        this.trimLabel=trimLabel;
    }

    ngOnInit() {
        //console.log(this.yScale)
    }

    ngOnChanges(changes: SimpleChanges): void {
        // console.log(changes)
        // console.log("-------------------")
        // console.log( JSON.stringify(this.yScale('Africa')))
        //console.log(this.yScale(-200))
        this.update();
    }
    ngAfterViewInit(): void {
        setTimeout(() => {
            const yAxisWidth=parseInt(this.yAxisWidthEl.nativeElement.getBoundingClientRect().width, 10)+30;
            const yAxisHeight=parseInt(this.yAxisWidthEl.nativeElement.getBoundingClientRect().height, 10)+300;
            if (yAxisHeight!==this.options.yAxis.height||yAxisWidth!==this.options.yAxis.width) {
                this.yAxisWidthChange.emit({ yAxisWidth, yAxisHeight });
            }
            //setTimeout(() => this.updateDims());
        }, 0);
    }

    update() {
        if (this.options.barType=="vertical") {
            this.ticks=this.yScale.nice().ticks();
            //console.log("update y ", this.ticks)
            //console.log("update y --  ", this.yScale(0));
        }
        else {
            //this.ticks=this.xScale.nice().ticks();
        }
        this.ngAfterViewInit();
    }

    transform(x) {
        return "rotate(270, "+x+", "+this.options.height/2+")";
    }
    pathDirection(tick) { 
        //console.log(tick, this.yScale(tick))
        return 'M '+(this.options.yAxis.width)+' '+(this.yScale(tick)+this.options.header.height)+' L '+(this.options.width)+' '+(this.yScale(tick)+this.options.header.height);
    }
    calculateYTextPosition(item) { 
        if (this.yScale(item))
            return parseInt(this.yScale(item)+(this.yScale.bandwidth()/2)+this.options.header.height);
        return this.options.header.height;
    }

    


}
