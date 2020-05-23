import {
    Component,
    Input,
    ViewEncapsulation,
    OnChanges,
    OnInit,
    SimpleChanges,
    ElementRef,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    HostListener
} from "@angular/core";

import { scaleBand, scaleLinear } from "d3-scale";
import { ColorHelper } from '../utils/color.helper';
import { trimLabel } from '../utils/trim-label.helper';
import { arc, pie } from 'd3-shape';

@Component({
    selector: "ngx-charts-pie",
    templateUrl: "./ngx-charts-pie.component.html",
    styleUrls: ["./ngx-charts-pie.component.css"],
    // changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})

export class ngxChartsPieComponent implements OnChanges, OnInit {

    private customOptions={
        barType: 'vertical',
        title: '',
        subtitle: '',
        height: 0,
        width: 0,
        padding: 5,
        xAxis: {
            title: '',
            height: 0,
            labelRotation: 0,
            labelAlign: 'left',
            labelEllipsis: false,
            labelEllipsisSize:16
        },
        yAxis: {
            title: '',
            width: 0,
            height: 0,
            labelRotation: 0,
            labelEllipsis: false,
            labelEllipsisSize:16
        },
        plotBackground: {
            x: 0,
            y: 0,
            height: 0,
            width: 0
        },
        legend: {
            labelEllipsis: false,
            labelEllipsisSize:16
        },
        plotOptions: {
            outerRadius: 80,
            innerRadius: 0,
            labelEllipsis: false,
            labelEllipsisSize:16
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
        let legend=obj.legend;
        let plotBackground=obj.plotBackground;
        let plotOptions=obj.plotOptions;
        let header=obj.header;

        delete obj['xAxis'];
        delete obj['yAxis'];
        delete obj['legend'];
        delete obj['plotBackground'];
        delete obj['plotOptions'];
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
            legend:{ 
                ...this.customOptions.legend,
                ...legend
            },
            plotBackground: {
                ...this.customOptions.plotBackground,
                ...plotBackground
            },
            plotOptions: {
                ...this.customOptions.plotOptions,
                ...plotOptions

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

    //@Input() groupBarPadding=20;
    //@Input() innerBarPadding=3;

    // scale: any;
    xScale: any;
    innerScale: any;
    yScale: any;
    pies: any=[];
    lineCircle: any=[];
    groupName: any[]=[];
    // groupBarPaddingBK: any;
    // innerBarPaddingBK: any;
    colorScale: any;
    calcArc: any;
    pieGenerator: any;
    translation: string="";
    trimLabel: any;
    constructor(
        private chartElement: ElementRef,
        private cdr: ChangeDetectorRef) { 
            this.trimLabel = trimLabel;
    }

    ngOnChanges(changes: SimpleChanges): void {
        // this.groupBarPaddingBK=this.options.plotOptions.groupBarPadding;
        // this.innerBarPaddingBK=this.options.plotOptions.innerBarPadding;
        setTimeout(() => this.update());
    }

    ngOnInit() {
        this.options.width=this.options.width;
        this.options.height=this.options.height;
        this.update();
    }

    update(): void {
        // console.log("ttttttt",this.options)
        const hostElem=this.chartElement.nativeElement;
        let dims=hostElem.parentNode!==null? hostElem.parentNode.getBoundingClientRect():{ height: 400, width: 800 };

        var style=hostElem.parentNode.currentStyle||window.getComputedStyle(hostElem.parentNode);

        this.options.height=!this.options.height? dims.height-this.strToNumber(style.paddingLeft)-this.strToNumber(style.paddingRight):this.options.height;
        this.options.width=!this.options.width? dims.width-this.strToNumber(style.paddingLeft)-this.strToNumber(style.paddingRight):dims.width-this.strToNumber(style.paddingLeft)-this.strToNumber(style.paddingRight);

        this.calPlotBackground();
        const xOffset=this.options.width/2;
        const yOffset=this.options.header.height+(this.options.plotBackground.height/2);
        this.translation=`translate(${xOffset}, ${yOffset})`;
        this.calcArc=this.calculateArc();
        this.pieGenerator=this.pieGeneratorFunc();

        // console.log(this.pieGenerator)

        // let countFlag=false;
        // this.options.plotOptions.groupBarPadding=this.groupBarPaddingBK;
        // this.options.plotOptions.innerBarPadding=this.innerBarPaddingBK;
        // do {
        //     if (countFlag==true) {
        //         this.options.plotOptions.groupBarPadding--;
        //         this.options.plotOptions.innerBarPadding = 2;
        //     }
        //     if (this.options.barType=='vertical') {
        //         this.xScale=this.getXScale();
        //     }
        //     else { 
        //         this.yScale=this.getXScale();
        //     }
        //     this.innerScale=this.getInnerScale();
        //     countFlag=true;
        // } while (this.innerScale.bandwidth()<2);
        // 

        // if (this.options.barType=='vertical') {
        //     this.yScale=this.getYScale();
        // }
        // else { 
        //     this.xScale=this.getYScale();
        // }

        let colorHelper=new ColorHelper(this.options, this.series);
        this.colorScale=colorHelper.generateColorScale();

        setTimeout(() => {
            this.groupName=[];
            this.series.map(item => {
                if (item.name) {
                    this.groupName.push({
                        name: item.name,
                        color: this.colorScale(item.name)
                    });
                }
            })
            this.createPie();
        });
        this.cdr.detectChanges();
    }

    pieGeneratorFunc() {
        return pie()
            .value(d => d.data)
            .sort(null)(this.series);
    }

    calculateArc(): any {
        let outerRadius=this.options.plotOptions.outerRadius;
        let innerRadius=this.options.plotOptions.innerRadius;
        let cornerRadius=0;
        return arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
            .cornerRadius(cornerRadius);
    }

    outerArc(): any {
        const factor=1.2;
        let outerRadius=this.options.plotOptions.outerRadius;
        return arc()
            .innerRadius(outerRadius*factor)
            .outerRadius(outerRadius*factor);
    }

    calPlotBackground() {
        this.options={
            ...this.options,
            plotBackground: {
                ...this.options.plotBackground,
                x: 0,
                y: 0,
                height: this.options.height-this.options.xAxis.height-this.options.header.height-this.options.padding,
                width: this.options.width-this.options.yAxis.width-this.options.padding
            }
        }
        // console.log("calPlotBackground", JSON.stringify(this.options));
    }
    createPie() {
        //console.log("this.innerScale.bandwidth() "+this.innerScale.bandwidth())
        this.pies=[];
        for (let i=0; i<this.pieGenerator.length; i++) {
            let factor=1.2;
            let tempObj={
                path: this.calcArc.startAngle(this.pieGenerator[i].startAngle).endAngle(this.pieGenerator[i].endAngle)(),
                color: this.colorScale(this.pieGenerator[i].data.name),
                data: this.pieGenerator[i].data,
                pos: this.outerArc().centroid(this.pieGenerator[i]),
                labelPath: "",
                textAnchor: this.midAngle(this.pieGenerator[i])<Math.PI? 'start':'end'
            };
            tempObj["pos"][0]=factor*this.options.plotOptions.outerRadius*(this.midAngle(this.pieGenerator[i])<Math.PI? 1:-1);

            //create a line path
            const innerPos=this.calcArc.centroid(this.pieGenerator[i]);
            let scale=tempObj["pos"][1]/innerPos[1];
            if (tempObj["pos"][1]===0||innerPos[1]===0) {
                scale=1;
            }
            const outerPos=[scale*innerPos[0], scale*innerPos[1]];
            tempObj.labelPath=`M${innerPos}L${outerPos}L${tempObj["pos"]}`;

            this.pies.push(tempObj);
        }
        // console.log("all pies : ", this.pies);
    }
    midAngle(d): number {
        return d.startAngle+(d.endAngle-d.startAngle)/2;
    }

    yAxisWidthChange({ yAxisWidth, yAxisHeight }) {
        //console.log("yAxisWidth "+yAxisWidth)
        this.options={
            ...this.options,
            yAxis: {
                ...this.options.yAxis,
                width: yAxisWidth,
                height: yAxisHeight
            }
        }
        //console.log( this.options)
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
        //console.log("xAxisHeightChange", xAxisHeight, JSON.stringify(this.options.xAxis));
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


    toolTipPlaccement(data) {
        if (this.options.barType=='vertical') {
            return data>0? 'top':'bottom'
        }
        else {
            return data>0? 'right':'left'
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        setTimeout(() => this.update());
    }

    private strToNumber(str) {
        let numberPattern=/\d+/g;
        let num=str.match(numberPattern).join('')
        return parseFloat(num);
    }
}
