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
    @Input() yScale: any;
    @Input() options: any;

    @ViewChild('yAxisWidthEl', {static:true}) yAxisWidthEl: ElementRef;
    @Output() yAxisWidthChange = new EventEmitter();

    ticks: any[]=[];
    
    constructor() { }

    ngOnInit() { console.log("test11") }

    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes)
        this.update();
    }
    ngAfterViewInit(): void {
        const yAxisWidth=parseInt(this.yAxisWidthEl.nativeElement.getBoundingClientRect().width, 10);
        this.yAxisWidthChange.emit({ yAxisWidth });
        //setTimeout(() => this.updateDims());
    }

    update() {
        this.ticks=this.yScale.nice().ticks();
        

    }

    transform() {
        return "rotate(270, 5, "+this.options.height/2+")";
    }




}
