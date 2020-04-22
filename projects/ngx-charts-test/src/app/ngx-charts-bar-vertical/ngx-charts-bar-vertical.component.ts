import {
    Component,
    Input,
    ViewEncapsulation,
    OnChanges,
    OnInit,
    SimpleChanges,
    ChangeDetectorRef,
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
        height: 400,
        width: 800,
        xAxis: {
            title: 'Rainfall (mm)',
            height: 0,
        },
        yAxis: {
            title: 'Rainfall (mm)',
            width: 0
        }
    };

    private _options: any={};

    @Input() set options(obj: any) {
        let xAxis=obj.xAxis;
        let yAxis=obj.yAxis;
        delete obj['xAxis'];
        delete obj['yAxis'];

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
            }
        };
    }
    get options(): any {
        return this._options;
    }
    @Input() categories: any=[];
    @Input() series: any=[];

    @Input() barPadding=8;

    scale: any;
    xScale: any;
    yScale: any;
    bars: any;
    margin={
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    };

    ngOnChanges(changes: SimpleChanges): void {
    }
    ngOnInit() {
        this.options.width=this.options.width-this.margin.left-this.margin.right;
        this.options.height=this.options.height-this.margin.top-this.margin.bottom;
        this.update();

    }

    update(): void {
        this.xScale=this.getXScale();
        this.yScale=this.getYScale();
        // this.xData.map(item => {
        //   console.log(this.xScale(item));
        // })

        this.createBar();
        // console.log(this.bars);
    }

    getXScale(): any {
        const spacing=this.categories.length/(this.options.width/this.barPadding+1);
        return scaleBand()
            .range([40, this.options.width])
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

        return scaleLinear()
            .range([this.options.height, 0])
            .domain([min, max]);
        //return this.scale.nice().ticks();
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
                width:yAxisWidth
            }
        }
        this.update()
    }
}
