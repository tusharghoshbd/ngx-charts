import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html'
})

export class LineComponent implements OnInit  {
    optionsl: any={};
    categoriesl: any=[];
    seriesl: any=[];

    htmll=`
    <ngx-charts-line
        [categories]="categoriesl"
        [series]="seriesl"
        [options]="optionsl"
    >
    </ngx-charts-line>`;

    tsl=`
    this.optionsl={
        title: 'Title of the line bar',
        subtitle: 'Subtitle of the line bar',
        height: 400,
        //width: 700,
        xAxis: {
            title: 'Year name',
            labelRotation: 0,
            labelAlign: 'middle', // left, middle, right,
            labelEllipsisSize: 8
        },
        yAxis: {
            title: 'Rainfall (mm)',
            labelEllipsisSize: 8
        },
        legend: {
            labelEllipsisSize: 8
        }
    };

    this.categoriesl=[2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017];
    
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
    }]`;

    constructor() { }
    ngOnInit(): void {
       
        //**************************Line chart*************************************
        this.optionsl={
            title: 'Title of the line bar',
            subtitle: 'Subtitle of the line bar',
            height: 400,
            //width: 700,
            xAxis: {
                title: 'Year name',
                labelRotation: 0,
                labelAlign: 'middle', // left, middle, right,
                labelEllipsisSize: 8
            },
            yAxis: {
                title: 'Rainfall (mm)',
                labelEllipsisSize: 8
            },
            legend: {
                labelEllipsisSize: 8
            }
        };

        setTimeout(() => {
            this.categoriesl=[2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017];
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
        }, 0)

       
    }


    
   
}
