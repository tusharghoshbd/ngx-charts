import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    options: any={};
    categories: any =[];
    series: any=[];
    
    optionsv: any={};
    categoriesv: any =[];
    seriesv: any =[];
        
    ngOnInit() {

    
        this.optionsv={
            barType : 'horizontal',
            title: 'Monthly Average Rainfall',
            subtitle: 'Source: WorldClimate.com',
            height: 400,
            //width: 700,
            xAxis: {
                title: 'Month name',
                labelRotation: 315,
                labelAlign:'left' // left, middle, right
            },
            yAxis: {
                title: 'Rainfall (mm)'
            },
            plotOptions: {
                groupBarPadding: 20,
                innerBarPadding: 2
            }
        };
        
        setTimeout(() => { 
            this.categoriesv=['Africa', 'America', 'Asia', 'Europe', 'Oceania'];
            this.seriesv=[{
                name: 'Year 1800',
                data: [107, 31, 635, 203, 2000]
            }, {
                name: 'Year 1900',
                data: [133, 156, 947, 408, 6]
            }, {
                name: 'Year 2000',
                data: [814, 841, 3714, 727, 31]
            }, {
                name: 'Year 2016',
                data: [1216, 1001, 4436, 738, 40]
            }]
        },1000)



// ***********************************************************************************8
        this.options={
            barType : 'vertical',
            title: 'Monthly Average Rainfall',
            subtitle: 'Source: WorldClimate.com',
            height: 400,
            //width: 700,
            xAxis: {
                title: 'Month name',
                labelRotation: 0,
                labelAlign:'middle'
            },
            yAxis: {
                title: 'Rainfall (mm)'
            },
            plotOptions: {
                groupBarPadding: 20,
                innerBarPadding: 2
            }
        };

        this.categories=[
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ];
        
        setTimeout(() => { 
            
            this.series=[{
                name: 'Tokyo',
                data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
        
            }, {
                name: 'New York',
                data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
        
            }, {
                name: 'London',
                data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
        
            }, {
                name: 'Berlin',
                data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
        
            }]
        }, 2000)


    }
}
