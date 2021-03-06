import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html'
})

export class PieComponent implements OnInit  {
    tab={ pie: true, donut: false }
    optionsp: any={};
    categoriesp: any=[];
    seriesp: any=[];

    optionsd: any={};
    categoriesd: any=[];
    seriesd: any=[];

    htmlp=`
    <ngx-charts-pie
        [series]="seriesp"
        [options]="optionsp"
    >
    </ngx-charts-pie>`;
    tsp=`
    this.optionsp={
        title: 'Title of the pie bar',
        subtitle: 'Subtitle of the pie bar',
        height: 400,
        //width: 700,
        plotOptions: {
            outerRadius: 80,
            innerRadius: 0,
            labelEllipsisSize: 16
        },
        legend: {
            labelEllipsisSize: 16
        },
    };

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
    }]`;

    htmld=`
    <ngx-charts-pie
        [series]="seriesd"
        [options]="optionsd"
    ></ngx-charts-pie>`;
    tsd=`
    this.optionsd={
        title: 'Title of the donut bar',
        subtitle: 'Subtitle of the donut bar',
        height: 400,
        //width: 700,
        plotOptions: {
            outerRadius: 80,
            innerRadius: 60
        },
        legend: {
            labelEllipsisSize: 16
        }
    };
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
    }]`;

    constructor() { }
    ngOnInit(): void {
        this.pieTabSelect();
    }

    pieTabSelect() { 
        this.tab={ pie: true, donut: false };
        
        // ********************Pie chart*************************
        this.optionsp={
            title: 'Title of the pie bar',
            subtitle: 'Subtitle of the pie bar',
            height: 400,
            //width: 700,
            plotOptions: {
                outerRadius: 80,
                innerRadius: 0,
                labelEllipsisSize: 16
            },
            legend: {
                labelEllipsisSize: 16
            },
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
        }, 0)
    }

    donutTabSelect() {
        this.tab={ pie: false, donut: true };
        // *******************Donut chart****************
        this.optionsd={
            title: 'Title of the donut bar',
            subtitle: 'Subtitle of the donut bar',
            height: 400,
            //width: 700,
            plotOptions: {
                outerRadius: 80,
                innerRadius: 60
            },
            legend: {
                labelEllipsisSize: 16
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
        }, 0)

    }

    
   
}
