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

@Component({
    selector: "ngx-charts-bar-vertical",
    templateUrl: "./ngx-charts-bar-vertical.component.html",
    styleUrls: ["./ngx-charts-bar-vertical.component.css"],
    // changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
    
export class ngxChartsBarVerticalComponent implements OnChanges, OnInit {

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
            labelRotation:0
        },
        yAxis: {
            title: '',
            width: 0,
            height:0,
            labelRotation:0
        },
        plotBackground: {
            x: 0,
            y: 0,
            height: 0,
            width: 0
        },
        plotOptions: { 
            groupBarPadding :20,
            innerBarPadding :3
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
        let plotOptions=obj.plotOptions;
        let header=obj.header;

        delete obj['xAxis'];
        delete obj['yAxis'];
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
    xInnerScale: any;
    yScale: any;
    bars: any = [];
    groupName: any[] = [];
    groupBarPaddingBK: any;
    innerBarPaddingBK: any;
    colorScale: any;

    constructor(
        private chartElement: ElementRef,
        private  cdr: ChangeDetectorRef) { }

    ngOnChanges(changes: SimpleChanges): void {
        this.groupBarPaddingBK=this.options.plotOptions.groupBarPadding;
        this.innerBarPaddingBK=this.options.plotOptions.innerBarPadding;
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
        this.options.width = !this.options.width ? dims.width- this.strToNumber(style.paddingLeft) - this.strToNumber(style.paddingRight)   : dims.width- this.strToNumber(style.paddingLeft) - this.strToNumber(style.paddingRight);
        
        let countFlag=false;
        this.options.plotOptions.groupBarPadding=this.groupBarPaddingBK;
        this.options.plotOptions.innerBarPadding=this.innerBarPaddingBK;
        do {
            if (countFlag==true) {
                this.options.plotOptions.groupBarPadding--;
                this.options.plotOptions.innerBarPadding = 2;
            }
            if (this.options.barType=='vertical') {
                this.xScale=this.getXScale();
                this.xInnerScale=this.getXInnerScale();
            }
            else { 
                this.xScale=this.getYScale();
            }
            
            countFlag=true;
             
        } while (0);
        // this.xInnerScale.bandwidth()<2

        if (this.options.barType=='vertical') {
            this.yScale=this.getYScale();
        }
        else { 
            this.yScale=this.getXScale();
        }
        
        let colorHelper=new ColorHelper(this.options, this.series);
        this.colorScale=colorHelper.generateColorScale();
        
        this.calPlotBackground()

        setTimeout(() => {
            this.groupName=[];
            this.series.map(item => { 
                if (item.name)
                    this.groupName.push({
                        name: item.name,
                        color: this.colorScale(item.name)
                    });
            })
            this.createBar();
        });
        this.cdr.detectChanges();
    }

    getXScale(): any {
        
        let spacing;
        let range;
        if (this.options.barType=='vertical') {
            spacing=(this.categories.length/(this.options.width/this.options.plotOptions.groupBarPadding));
            range=this.options.width-this.options.yAxis.width;
        }
        else { 
            let length=this.options.height-this.options.header.height;
            spacing=(this.categories.length/(this.options.plotBackground.height/this.options.plotOptions.groupBarPadding));
            range=this.options.height-this.options.header.height-this.options.xAxis.height;
        }
        
        return scaleBand()
            .range([0, range])
            .paddingInner(spacing)
            .paddingOuter(0.1)
            .domain(this.categories);
    }
    getXInnerScale(): any {
        let groupDataArr=[];
        for (let i=0; i<this.series.length; i++) { 
            groupDataArr.push(this.series[i].name);
        }
        const spacing= (this.series.length/(this.xScale.bandwidth()/this.options.plotOptions.innerBarPadding) ) ;
        let width=this.xScale.bandwidth();
        return scaleBand()
            .range([0, width])
            .paddingInner(spacing)
            .domain(groupDataArr);
    }
    
    getYScale(): any {
        let uniqueValue: any=new Set();
        this.series.map((item) => {
            item.data.map((value) => {
                uniqueValue.add(value);
            });
        });

        let min=Math.min(...uniqueValue);
        min=min>0 ? 0:min;
        // console.log(min);
        let max=Math.max(0, ...uniqueValue);
        max=max > 0 ? max:0;
        // console.log(max);

        let range = [];
        if (this.options.barType=='vertical') {
            let value=this.options.height-this.options.xAxis.height-this.options.header.height;
            range=[value, 0];
        }
        else { 
            let value=this.options.plotBackground.width-30;
            range=[0, value];
        }
            

        // console.log(this.options.header.height, this.options.xAxis.height)
        // console.log(min, max, height);

        return scaleLinear()
            .range(range)
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
                height:this.options.height-this.options.xAxis.height-this.options.header.height-this.options.padding,
                width: this.options.width-this.options.yAxis.width-this.options.padding
            }
        }
    }
    createBar() {
        //console.log("this.xInnerScale.bandwidth() "+this.xInnerScale.bandwidth())
        this.bars=[];
        this.categories.map((item, index) => {
            for (let i=0; i<this.series.length; i++) { 
                const bar: any={
                    value: item,  //jan,feb
                    data: this.series[i].data[index], //101,202
                    group: this.series[i].name,
                    color: this.colorScale(this.series[i].name),
                    //formattedLabel,
                    width: this.xInnerScale.bandwidth(),
                    height:  this.series[i].data[index] > 0  ? (this.yScale(0)-this.yScale(this.series[i].data[index]) ) : (this.yScale(this.series[i].data[index]) - this.yScale(0) ),
                    x: this.xInnerScale(this.series[i].name)+ this.xScale(item) ,
                    y: this.series[i].data[index] > 0 ? this.yScale(this.series[i].data[index]) : this.yScale(0) ,
                };
                this.bars.push(bar);
            }
        });
    }

    yAxisWidthChange({ yAxisWidth,yAxisHeight }) {
        //console.log("yAxisWidth "+yAxisWidth)
        this.options={
            ...this.options,
            yAxis: {
                ...this.options.yAxis,
                width: yAxisWidth,
                height: yAxisHeight
            }
        }
        console.log( this.options)
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
        //console.log("window:resize")
        setTimeout(() => this.update());
    }

   
    
    


    private strToNumber(str) { 
        let numberPattern=/\d+/g;
        let num=str.match(numberPattern).join('')
        return parseFloat(num);
    }
}
