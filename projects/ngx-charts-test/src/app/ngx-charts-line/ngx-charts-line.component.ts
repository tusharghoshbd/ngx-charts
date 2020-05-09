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
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

@Component({
    selector: "ngx-charts-line",
    templateUrl: "./ngx-charts-line.component.html",
    styleUrls: ["./ngx-charts-line.component.css"],
    // changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
    
export class ngxChartsLineComponent implements OnChanges, OnInit {

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
            labelAlign: 'left'
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
    innerScale: any;
    yScale: any;
    lines: any=[];
    lineCircle: any = [];
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
        // console.log("ttttttt",this.options)
        const hostElem=this.chartElement.nativeElement;
        let dims=hostElem.parentNode!==null? hostElem.parentNode.getBoundingClientRect():{height:400, width:800};
        
        var style=hostElem.parentNode.currentStyle||window.getComputedStyle(hostElem.parentNode);
       
        this.options.height = !this.options.height? dims.height - this.strToNumber(style.paddingLeft) - this.strToNumber(style.paddingRight)  :this.options.height;
        this.options.width = !this.options.width ? dims.width- this.strToNumber(style.paddingLeft) - this.strToNumber(style.paddingRight)   : dims.width- this.strToNumber(style.paddingLeft) - this.strToNumber(style.paddingRight);
        
        this.calPlotBackground()

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
            }
            else { 
                this.yScale=this.getXScale();
            }
            this.innerScale=this.getInnerScale();
            countFlag=true;
             
        } while (this.innerScale.bandwidth()<2);
        // 

        if (this.options.barType=='vertical') {
            this.yScale=this.getYScale();
        }
        else { 
            this.xScale=this.getYScale();
        }
        
        let colorHelper=new ColorHelper(this.options, this.series);
        this.colorScale=colorHelper.generateColorScale();
        
        

        setTimeout(() => {
            this.groupName=[];
            this.series.map(item => { 
                if (item.name)
                    this.groupName.push({
                        name: item.name,
                        color: this.colorScale(item.name)
                    });
            })
            this.createLine();
        });
        this.cdr.detectChanges();
    }

    getXScale(): any {
        
        let spacing;
        let range;
        if (this.options.barType=='vertical') {
            spacing=(this.categories.length/(this.options.plotBackground.width/this.options.plotOptions.groupBarPadding));
            range= [0, this.options.plotBackground.width];
        }
        else { 
            let length=this.options.height-this.options.header.height;
            spacing=(this.categories.length/(this.options.plotBackground.height/this.options.plotOptions.groupBarPadding));
            range=[0, this.options.plotBackground.height];
        }
        return scaleBand()
            .range(range)
            .paddingInner(spacing)
            .paddingOuter(0.1)
            .domain(this.categories);
    }
    getInnerScale(): any {

        let groupDataArr=[];
        for (let i=0; i<this.series.length; i++) { 
            groupDataArr.push(this.series[i].name);
        }

        let spacing;
        let range;
        if (this.options.barType=='vertical') {
            spacing=(this.series.length/(this.xScale.bandwidth()/this.options.plotOptions.innerBarPadding));
            range=this.xScale.bandwidth();
        }
        else { 
            spacing=(this.series.length/(this.yScale.bandwidth()/this.options.plotOptions.innerBarPadding));
            range=this.yScale.bandwidth();
        }

        return scaleBand()
            .range([0, range])
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
        min=min>0? 0:min;
        
        let max=Math.max(0, ...uniqueValue);
        max=max>0? max:0;
        
        let range = [];
        if (this.options.barType=='vertical') {
            let value=this.options.plotBackground.height;
            // console.log("bar getYScale",value)
            range=[value, 0];
            // console.log("bar getYScale - ", range)
        }
        else { 
            let value=this.options.plotBackground.width-30;
            range=[0, value];
        }

        // console.log("bar getYScale --- ", range, min, max)

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
        // console.log("calPlotBackground", JSON.stringify(this.options));
    }
    createLine() {
        //console.log("this.innerScale.bandwidth() "+this.innerScale.bandwidth())
        this.lines=[];
        this.lineCircle=[];
        for (let i=0; i<this.series.length; i++) { 
            let line={points:"", color:""}
            for (let j=0; j<this.categories.length; j++) { 
                let x=this.xScale(this.categories[j])+(this.xScale.bandwidth()/2)+this.options.yAxis.width;
                let y = this.yScale(this.series[i].data[j])+this.options.header.height
                line.points+=(x +","+y+" ");
                line.color=this.colorScale(this.series[i].name);
                this.lineCircle.push({
                    x,
                    y,
                    color: this.colorScale(this.series[i].name),
                    value: this.categories[j],  //jan,feb
                    data: this.series[i].data[j], //101,202
                    group: this.series[i].name
                });
            }
            this.lines.push(line);
        }

        // console.log(this.lineCircle);
       
       
        
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
        //console.log("window:resize")
        setTimeout(() => this.update());
    }

   
    
    


    private strToNumber(str) { 
        let numberPattern=/\d+/g;
        let num=str.match(numberPattern).join('')
        return parseFloat(num);
    }
}
