import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-stacked',
  templateUrl: './stacked.component.html'
})

export class StackedComponent implements OnInit  {
    
    tab={ horizontal: true, vertical: false }
    optionsVStacked: any={};
    categoriesVStacked: any=[];
    seriesVStacked: any=[];

    optionsHStacked: any={};
    categoriesHStacked: any=[];
    seriesHStacked: any=[];

    constructor() { }
    ngOnInit(): void {
        this.horizontalTabSelect();
    }

    horizontalTabSelect() { 
        this.tab={ horizontal: true, vertical: false }

       //**************************Stacked horizontal chart*************************************
         this.optionsHStacked={
            barType: 'horizontal',
            title: 'Title of the stacked chart bar',
            subtitle: 'Subtitle of the stacked chart bar',
            height: 400,
            //width: 700,
            xAxis: {
                title: 'Number of fruits',
                labelRotation: 0,
                labelAlign: 'middle', // left, middle, right,
                labelEllipsisSize: 8
            },
            yAxis: {
                title: 'Fruits name'
            },
            plotOptions: {
                groupBarPadding: 20
            },
            legend: {
                labelEllipsisSize: 8
            }
        };

        setTimeout(() => {
            this.categoriesHStacked=['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas'];
            this.seriesHStacked=[{
                name: 'John',
                data: [5, 3, 4, 7, 2]
            },
                {
                name: 'Jane',
                data: [2, 2, 3, 2, 1]
            }, {
                name: 'Joe',
                data: [3, 4, 4, 2, 5]
                },
                {
                    name: 'Cris',
                    data: [5, 3, 4, 7, 2]
                }
            ]
        }, 0)
    
    }

    verticalTabSelect() { 

        this.tab={ horizontal: false, vertical: true }

        
        //**************************Stacked vertical chart*************************************
        this.optionsVStacked={
            barType: 'vertical',
            title: 'Title of the stacked chart bar',
            subtitle: 'Subtitle of the stacked chart bar',
            height: 400,
            //width: 700,
            xAxis: {
                title: 'Fruits name',
                labelRotation: 45,
                labelAlign: 'middle', // left, middle, right,
                labelEllipsisSize: 8
            },
            yAxis: {
                title: 'Number of fruits'
            },
            plotOptions: {
                groupBarPadding: 40
            },
            legend: {
                labelEllipsisSize: 8
            }
        };

        setTimeout(() => {
            this.categoriesVStacked=['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas', 'Farkleberry', 'Grapefruit', 'Elderberry', 'Dewberries', 'Lime', 'Paw Paw', 'Strawberries'];
            this.seriesVStacked=[{
                name: 'John',
                data: [5, 3, 4, 7, 2, 7,2,8,3,6,9,4]
            },
                {
                name: 'Jane',
                data: [2, 2, 3, 2, 1, 2, 5,6,3,1,8,2]
            }, {
                name: 'Joe',
                data: [3, 4, 4, 2, 5,7,8,9,6,3,2,5]
                },
                {
                    name: 'Cris',
                    data: [5, 3, 4, 7, 2, 5,9,6,3,2,4,7]
                }
            ]
        }, 0)
    }

    
   
}
