import {
  Component,
  Input,
  ViewEncapsulation,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
} from "@angular/core";

import { scaleBand, scaleLinear } from "d3-scale";

@Component({
  selector: "ngx-charts-bar-vertical",
  templateUrl: "./ngx-charts-bar-vertical.component.html",
  styleUrls: ["./ngx-charts-bar-vertical.component.css"],
})
export class ngxChartsBarVerticalComponent implements OnChanges {
  @Input() options: any = {};
  @Input() xData: any = {};
  @Input() yData: any={};
  @Input() barPadding = 8;

  scale: any;
  xScale: any;
  yScale: any;
  bars: any;
  margin = {
    top: 50,
    right: 100,
    bottom: 30,
    left: 80,
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.options.width = this.options.width - this.margin.left - this.margin.right;
    this.options.height = this.options.height - this.margin.top - this.margin.bottom
    this.update();
  }

  update(): void {
    this.xScale = this.getXScale();
    this.yScale=this.getYScale();
    // this.xData.map(item => { 
    //   console.log(this.xScale(item));
    // })

    this.createBar();
    console.log(this.bars )
    
  }

  getXScale(): any {
    const spacing = this.xData.length / (this.options.width / this.barPadding + 1);
    return scaleBand()
      .range([40, this.options.width])
      .paddingInner(spacing)
      .paddingOuter(0.1)
      .domain(this.xData);
  }

  getYScale(): any {
    let uniqueValue: any = new Set();
    this.yData.map((item) => {
      item.data.map((value) => {
        uniqueValue.add(value);
      });
    });

    let min = Math.min(0,...uniqueValue);
    let max=Math.max(0,...uniqueValue);
    
    this.scale = scaleLinear()
      .range([this.options.height, 0])
      .domain([min, max]);
    return this.scale.nice().ticks();

  }

  createBar() { 
    this.bars=this.xData.map((item, index) => {
      if (index) { 
        
      }
      const bar: any = {
        value:item,
        //label,
        //roundEdges,
        data: this.yData[0].data[index],
        width: this.xScale.bandwidth(),
        //formattedLabel,
        height: this.scale(0) - this.scale(this.yData[0].data[index]),
        x: this.xScale(item),
        y: this.scale(this.yData[0].data[index])
      };
      
      return bar;
    });
  }



}
