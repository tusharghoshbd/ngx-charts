import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    options: any;
    categories: any;
    series: any;
        
    ngOnInit() {
        //setTimeout(() => { 
        this.options={
            barType : 'horizontal',
            title: 'Monthly Average Rainfall',
            subtitle: 'Source: WorldClimate.com',
            height: 400,
            //width: 700,
            xAxis: {
                title: 'Month name',
                labelRotation: 315
            },
            yAxis: {
                title: 'Rainfall (mm)'
            },
            plotOptions: {
                groupBarPadding: 15,
                innerBarPadding: 2
            }
        };
        this.categories=['Africa', 'America', 'Asia', 'Europe', 'Oceania'];
            this.series=[{
                name: 'Year 1800',
                data: [107, 31, 635, 203, 200]
            }, {
                name: 'Year 1900',
                data: [133, 156, 947, 408, 6]
            }, {
                name: 'Year 2000',
                data: [814, 841, 3714, 727, 31]
            }, {
                name: 'Year 2016',
                data: [1216, 1001, 4436, 738, 400]
            }]
        //},100)
    }
}
