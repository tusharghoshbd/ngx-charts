import {
    Component, OnInit, Input, OnChanges,
    SimpleChanges, ViewChild, ElementRef,
    Output,EventEmitter
} from "@angular/core";
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

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
    
    constructor() { }

    ngOnInit() {
        // console.log(this.yScale)
    }

    ngOnChanges(changes: SimpleChanges): void {
        // console.log(changes)
        // console.log("-------------------")
        // console.log(this.yScale)
        //console.log(this.yScale(-200))
        this.update();
    }
    ngAfterViewInit(): void {
        const yAxisWidth=parseInt(this.yAxisWidthEl.nativeElement.getBoundingClientRect().width, 10)+20;
        const yAxisHeight=parseInt(this.yAxisWidthEl.nativeElement.getBoundingClientRect().height, 10)+300;
        // console.log("yAxisWidth :"+yAxisWidth)
        this.yAxisWidthChange.emit({ yAxisWidth,yAxisHeight });
        //setTimeout(() => this.updateDims());
    }

    update() {
        if (this.options.barType=="vertical") {
            this.ticks=this.yScale.nice().ticks();
        }
        else if (this.options.barType=="horizontal") {
        }
        
    }

    transform() {
        return "rotate(270, 10, "+this.options.height/2+")";
    }
    pathDirection(tick) { 
        //console.log(tick, this.yScale(tick))
        return 'M '+(this.options.yAxis.width)+' '+(this.yScale(tick)+this.options.header.height)+' L '+(this.options.width)+' '+(this.yScale(tick)+this.options.header.height);
    }

    


}
