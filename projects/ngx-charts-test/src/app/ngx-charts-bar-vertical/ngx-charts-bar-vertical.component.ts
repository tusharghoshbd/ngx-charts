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
  @Input() yData: any = {};

  scale: any;
  xScale: any;
  yScale: any;

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
    //this.xScale = this.getXScale();
    this.yScale = this.getYScale();
    console.log(this.yScale);
  }

  // getXScale(): any {
  //   this.xDomain = this.getXDomain();
  //   const spacing = this.xDomain.length / (this.dims.width / this.barPadding + 1);
  //   return scaleBand()
  //     .range([0, this.dims.width])
  //     .paddingInner(spacing)
  //     .domain(this.xDomain);
  // }

  getYScale(): any {
    let uniqueValue: any = new Set();
    this.yData.map((item) => {
      item.data.map((value) => {
        uniqueValue.add(value);
      });
    });

    console.log(...uniqueValue);

    let min = Math.min(...uniqueValue);
    let max = Math.max(...uniqueValue);

    console.log(min, max);

    this.scale = scaleLinear()
      .range([this.options.height - 20, 0])
      .domain([min, max]);
    return this.scale.nice().ticks();
  }
}
