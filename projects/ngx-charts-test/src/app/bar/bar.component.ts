import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html'
})

export class BarComponent implements OnInit  {
    
    tab={ horizontal: true, vertical: false }
    optionsv: any={};
    categoriesv: any=[];
    seriesv: any=[];

    optionsh: any={};
    categoriesh: any=[];
    seriesh: any=[];

    constructor() { }

    htmlH: string=`
    <ngx-charts-bar
        [categories]="categoriesh"
        [series]="seriesh"
        [options]="optionsh"
    >
    </ngx-charts-bar>`;
    tsH: string=`
    this.optionsh={
        barType: 'horizontal',
        title: 'Title of the horizontal bar',
        subtitle: 'Subtitle of the horizontal bar',
        height: 400,
        //width: 700,
        xAxis: {
            title: 'Continent population no',
            labelRotation: 0,
            labelAlign: 'middle',
            labelEllipsisSize: 16
        },
        yAxis: {
            title: 'Continent name',
            labelEllipsisSize: 16
        },
        plotOptions: {
            groupBarPadding: 20,
            innerBarPadding: 2
        },
        legend: {
            labelEllipsisSize: 10
        }
    };

    this.categoriesh=['Africa', 'America', 'Asia', 'Europe', 'Oceania']

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
    `

    htmlV: string=`
    <ngx-charts-bar 
        [categories]="categoriesv"
        [series]="seriesv"
        [options]="optionsv"
    >
    </ngx-charts-bar>`;

    tsV: string=`
    this.optionsv={
        barType: 'vertical',
        title: 'Title of the vertical bar',
        subtitle: 'Subtitle of the vertical bar',
        height: 400,
        //width: 700,
        xAxis: {
            title: 'Month name',
            labelRotation: 0,
            labelAlign: 'middle'
        },
        yAxis: {
            title: 'Rainfall (mm)'
        },
        plotOptions: {
            groupBarPadding: 30,
            innerBarPadding: 2
        },
        legend: {
            labelEllipsis: true,
            labelEllipsisSize: 8
        }
    };

    this.categoriesv=[ 'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    this.seriesv=[{
        name: 'Tokyo dfds',
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
    `;

    ngOnInit(): void {
        this.horizontalTabSelect();
    }

    horizontalTabSelect() { 
        this.tab={ horizontal: true, vertical: false }

        // *********************************** horizontal chart************************************************8
        this.optionsh={
            barType: 'horizontal',
            title: 'Title of the horizontal bar',
            subtitle: 'Subtitle of the horizontal bar',
            height: 400,
            //width: 700,
            xAxis: {
                title: 'Continent population no',
                labelRotation: 0,
                labelAlign: 'middle',
                labelEllipsisSize: 16
            },
            yAxis: {
                title: 'Continent name',
                labelEllipsisSize: 16
            },
            plotOptions: {
                groupBarPadding: 20,
                innerBarPadding: 2
            },
            legend: {
                labelEllipsisSize: 10
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
        }, 0)
    
    }

    verticalTabSelect() { 

        this.tab={ horizontal: false, vertical: true }

        //***************************vertical chart******************************
        this.optionsv={
            barType: 'vertical',
            title: 'Title of the vertical bar',
            subtitle: 'Subtitle of the vertical bar',
            height: 400,
            //width: 700,
            xAxis: {
                title: 'Month name',
                labelRotation: 0,
                labelAlign: 'middle'
            },
            yAxis: {
                title: 'Rainfall (mm)'
            },
            plotOptions: {
                groupBarPadding: 30,
                innerBarPadding: 2
            },
            legend: {
                labelEllipsis: true,
                labelEllipsisSize: 8
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
                name: 'Tokyo dfds',
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
        }, 0)
    }






    
   
}
