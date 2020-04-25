import { Component, OnInit, OnChanges, Input,AfterViewInit, ViewChild, Output, EventEmitter, ElementRef, SimpleChanges } from '@angular/core';

@Component({
    selector: 'g[header]',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges, AfterViewInit {
    // @Input() xScale: any;
    // @Input() yScale: any;
    @Input() options: any;

    // @Input() categories: any=[];
    // @Input() series: any=[];

    @ViewChild('headerHeightEl', { static: true }) headerHeightEl: ElementRef;
    @Output() headerHeightChange=new EventEmitter();
    constructor() { }

    ngOnChanges(changes: SimpleChanges): void {
        // console.log(changes)
        this.update();
    }

    ngOnInit() {}

    ngAfterViewInit(): void {
        let headerHeight=parseInt(this.headerHeightEl.nativeElement.getBoundingClientRect().height, 10)+20;
        console.log("headerHeight "+headerHeight)
        this.headerHeightChange.emit({ headerHeight });
        //setTimeout(() => this.updateDims());
    }

    update() {
        //this.ticks=this.xScale.nice().ticks();
    }

}
