import { range } from 'd3-array';
import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale';

export class ColorHelper {

    options: any;
    series: any;

    constructor(options, series) {
        this.options=options;
        this.series=series;
    }

    generateColorScale() {
        //let colorArr=["#a8385d", "#7aa3e5", "#a27ea8", "#aae3f5", "#adcded", "#a95963", "#8796c0", "#7ed3ed", "#50abcc", "#ad6886"]; //ngx-charts default color code
        //let colorList=['#7cb5ec', '#434348', '#f7a35c', '#90ed7d', '#8085E9', '#F15C80', '#E4D354', '#2B908F', '#F45B5B', '#91E8E1']; //highchart color code
        let colorList = ['#7cb5ec', '#434348', '#f7a35c', '#90ed7d', '#8085E9', '#F15C80', '#E4D354', '#2B908F', '#F45B5B', '#91E8E1', "#7aa3e5", "#a27ea8", "#aae3f5", "#adcded", "#a95963", "#8796c0", "#7ed3ed", "#50abcc", "#ad6886"]
        let barColors=[];
        let groupDataArr=[];
        for (let i=0; i<this.series.length; i++) {
            groupDataArr.push(this.series[i].name);
            if (this.series[i].colorCode) {
                barColors.push(this.series[i].colorCode);
            }
            else {
                let index=i%colorList.length;
                barColors.push( colorList[index]);
            }
        }
        return scaleOrdinal()
            .range(barColors)
            .domain(groupDataArr);
    }


}
