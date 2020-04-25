import {
    Component,
    Input,
    ViewEncapsulation,
    OnChanges,
    OnInit,
    SimpleChanges,
    ElementRef,
    ChangeDetectorRef,
    HostListener
} from "@angular/core";

import { scaleBand, scaleLinear } from "d3-scale";

@Component({
    selector: "ngx-charts-bar-vertical",
    templateUrl: "./ngx-charts-bar-vertical.component.html",
    styleUrls: ["./ngx-charts-bar-vertical.component.css"],
    encapsulation: ViewEncapsulation.None
})
export class ngxChartsBarVerticalComponent implements OnChanges, OnInit {

    private customOptions={
        title: '',
        subtitle: '',
        height: 0,
        width: 0,
        padding: 5,
        xAxis: {
            title: '',
            height: 0,
        },
        yAxis: {
            title: '',
            width: 0
        },
        plotBackground: {
            x: 0,
            y: 0,
            height: 0,
            width: 0
        },
        header: {
            height: 0,
            width: 0
        }
    };

    private _options: any={};

    @Input() set options(obj: any) {
        let xAxis=obj.xAxis;
        let yAxis=obj.yAxis;
        let plotBackground=obj.plotBackground;
        let header=obj.header;

        delete obj['xAxis'];
        delete obj['yAxis'];
        delete obj['plotBackground'];
        delete obj['header'];

        this._options={
            ...this.customOptions,
            ...obj,
            xAxis: {
                ...this.customOptions.xAxis,
                ...xAxis
            },
            yAxis: {
                ...this.customOptions.yAxis,
                ...yAxis
            },
            plotBackground: {
                ...this.customOptions.plotBackground,
                ...plotBackground
            },
            header: {
                ...this.customOptions.header,
                ...header
            }
        };
    }
    get options(): any {
        return this._options;
    }
    @Input() categories: any=[];
    @Input() series: any=[];

    @Input() barPadding=8;

    // scale: any;
    xScale: any;
    yScale: any;
    bars: any;
    // margin={
    //     top: 0,
    //     right: 0,
    //     bottom: 0,
    //     left: 0,
    // };
    groupName:any[] =[] 

    constructor(public chartElement: ElementRef) { }


    ngOnChanges(changes: SimpleChanges): void {

        setTimeout(() => this.update());
    }

    ngOnInit() {
        this.options.width=this.options.width;
        this.options.height=this.options.height;
        this.update();
    }

    update(): void {

        const hostElem=this.chartElement.nativeElement;
        let dims=hostElem.parentNode!==null? hostElem.parentNode.getBoundingClientRect():{height:400, width:800};
        
        var style=hostElem.parentNode.currentStyle||window.getComputedStyle(hostElem.parentNode);
       
        this.options.height = !this.options.height? dims.height - this.strToNumber(style.paddingLeft) - this.strToNumber(style.paddingRight)  :this.options.height;
        this.options.width = !this.options.width ? dims.width- this.strToNumber(style.paddingLeft) - this.strToNumber(style.paddingRight)   : this.options.width;

        this.xScale=this.getXScale();
        this.yScale=this.getYScale();
        this.calPlotBackground()
        setTimeout(() => {
            this.series.map(item => { 
                if (item.name)
                    this.groupName.push(item.name);
            })
            this.createBar();
        });
    }

    getXScale(): any {
        const spacing=this.categories.length/(this.options.width/this.barPadding+1);
        let width=this.options.width-this.options.yAxis.width;
        return scaleBand()
            .range([0, width])
            .paddingInner(spacing)
            .paddingOuter(0.1)
            .domain(this.categories);
    }

    getYScale(): any {
        let uniqueValue: any=new Set();
        this.series.map((item) => {
            item.data.map((value) => {
                uniqueValue.add(value);
            });
        });

        let min=Math.min(0, ...uniqueValue);
        let max=Math.max(0, ...uniqueValue);

        let height=this.options.height-this.options.xAxis.height-this.options.header.height;

        // console.log("getYScale height = "+height);

        return scaleLinear()
            .range([height, 0])
            .domain([min, max]);
        //return this.scale.nice().ticks();
    }


    calPlotBackground() {
        this.options={
            ...this.options,
            plotBackground: {
                ...this.options.plotBackground,
                x: 0,
                y: 0,
                height: 0,
                width: 0
            }
        }
    }
    createBar() {
        this.bars=this.categories.map((item, index) => {
            const bar: any={
                value: item,
                //label,
                //roundEdges,
                data: this.series[0].data[index],
                width: this.xScale.bandwidth(),
                //formattedLabel,
                height: this.yScale(0)-this.yScale(this.series[0].data[index]),
                x: this.xScale(item),
                y: this.yScale(this.series[0].data[index]),
            };

            return bar;
        });
    }

    yAxisWidthChange({ yAxisWidth }) {
        console.log("yAxisWidth "+yAxisWidth)
        this.options={
            ...this.options,
            yAxis: {
                ...this.options.yAxis,
                width: yAxisWidth
            }
        }
        this.update()
    }

    xAxisHeightChange({ xAxisHeight }) {
        this.options={
            ...this.options,
            xAxis: {
                ...this.options.xAxis,
                height: xAxisHeight
            }
        }
        this.update()
    }
    headerHeightChange({ headerHeight }) {
        this.options={
            ...this.options,
            header: {
                ...this.options.header,
                height: headerHeight
            }
        }
        this.update()
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        console.log("window:resize")
        setTimeout(() => this.update());
    }

    private strToNumber(str) { 
        let numberPattern=/\d+/g;
        let num=str.match(numberPattern).join('')
        return parseFloat(num);
    }
}
