import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    optionsp: any={};
    categoriesp: any =[];
    seriesp: any=[];

    optionsd: any={};
    categoriesd: any =[];
    seriesd: any=[];

    optionsl: any={};
    categoriesl: any =[];
    seriesl: any=[];
    
    optionsv: any={};
    categoriesv: any =[];
    seriesv: any=[];
    
    optionsh: any={};
    categoriesh: any =[];
    seriesh: any=[];
        
    ngOnInit() {
        this.optionsd={
            title: 'Monthly Average Rainfall',
            subtitle: 'Source: WorldClimate.com',
            height: 400,
            //width: 700,
            xAxis: {
                title: 'Month name',
                labelRotation: 0,
                labelAlign:'middle' // left, middle, right
            },
            yAxis: {
                title: 'Rainfall (mm)'
            },
            plotOptions: {
                outerRadius:120,
                innerRadius:80
            }
        };
        
        setTimeout(() => { 
            this.seriesd=[{
                name: 'Chrome',
                data: 61.41
            }, {
                name: 'IE',
                data: 11.84
            }, {
                name: 'Firefox',
                data: 10.84
            }, {
                name: 'Opera',
                data: 15
            }, {
                name: 'Other',
                data: 20
            }]
        }, 3000)
        
        // *********************************************

        this.optionsp={
            title: 'Monthly Average Rainfall',
            subtitle: 'Source: WorldClimate.com',
            height: 400,
            //width: 700,
            xAxis: {
                title: 'Month name',
                labelRotation: 0,
                labelAlign:'middle' // left, middle, right
            },
            yAxis: {
                title: 'Rainfall (mm)'
            },
            plotOptions: {
                outerRadius:120,
                innerRadius:0
            }
        };
        
        setTimeout(() => { 
            this.seriesp=[{
                name: 'Chrome',
                data: 61.41
            }, {
                name: 'IE',
                data: 11.84
            }, {
                name: 'Firefox',
                data: 10.84
            }, {
                name: 'Opera',
                data: 15
            }, {
                name: 'Other',
                data: 20
            }]
        },0)
/** **************************************************************************** */
        this.optionsl={
            title: 'Monthly Average Rainfall',
            subtitle: 'Source: WorldClimate.com',
            height: 400,
            //width: 700,
            xAxis: {
                title: 'Month name',
                labelRotation: 0,
                labelAlign:'middle' // left, middle, right
            },
            yAxis: {
                title: 'Rainfall (mm)'
            },
            plotOptions: {
            }
        };
        
        setTimeout(() => { 
            this.categoriesl=[2010,2011,2012,2013,2014,2015,2016,2017];
            this.seriesl=[{
                name: 'Installation',
                data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
            }, {
                name: 'Manufacturing',
                data: [24916, 24064, 29742, 29851, 32490, 49282, 38121, 40434]
            }, {
                name: 'Sales & Distribution',
                data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
            }, {
                name: 'Project Development',
                data: [19771, 16005, 7988, 12169, 15112, 22452, 34400, 34227]
            }, {
                name: 'Other',
                data: [12908, 5948, 8105, 11248, 8989, 61816, 18274, 18111]
            }]
        },500)

        /*********************************************************/
    
        this.optionsv={
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
                groupBarPadding: 30,
                innerBarPadding: 2
            }
        };
        
        setTimeout(() => { 
            this.categoriesv=[
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
            this.seriesv=[{
                name: 'Tokyo',
                data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
        
            }, {
                name: 'New York',
                data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
        
            }, {
                name: 'London',
                data: [48.9, 83.8, 39.3, 41.4, 173.0, 48.3, 59.0, 193.6, 123.4, 51.2, 59.3, 51.2]
        
            }, {
                name: 'Berlin',
                data: [42.4, 33.2, 34.5, 139.7, 52.6, 75.5, 157.4, 60.4, 247.6, 39.1, 46.8, 51.1]
        
                }]
        },1000)



// ***********************************************************************************8
        this.optionsh={
            barType : 'horizontal',
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

        this.categoriesh=['Africa', 'America', 'Asia', 'Europe', 'Oceania']
        
        setTimeout(() => { 
            
            this.seriesh=[{
                name: 'Year 1800',
                data: [107, 31, 635, 203, 545]
            }, {
                name: 'Year 1900',
                data: [133, 156, 947, 408, 643]
            }, {
                name: 'Year 2000',
                data: [814, 841, 1714, 727, 31]
            }, {
                name: 'Year 2016',
                data: [1216, 1001, 1436, 738, 40]
            }];
        }, 2000)


    }
}
