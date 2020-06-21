import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-combo',
  templateUrl: './combo.component.html'
})

export class ComboComponent implements OnInit  {
    optionsCombo: any={};
    categoriesCombo: any=[];
    seriesCombo: any=[];

    constructor() { }
    ngOnInit(): void {
        //**************************Combo chart*************************************
        this.optionsCombo={
            title: 'Title of the combo chart bar',
            subtitle: 'Subtitle of the combo chart bar',
            height: 400,
            //width: 700,
            xAxis: {
                title: 'Year name',
                labelRotation: 0,
                labelAlign: 'middle', // left, middle, right,
                labelEllipsisSize: 8
            },
            yAxis: {
                leftTitle: 'Rainfall (mm)',
                rightTitle: 'Yearly Sales (Taka)',
                labelEllipsisSize: 8
            },
            plotOptions: {
            },
            legend: {
                labelEllipsisSize: 8
            }
        };

        setTimeout(() => {
            this.categoriesCombo=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            this.seriesCombo=[{
                name: 'Installation',
                type: 'verticalBar',
                data: [49.9, 71.5, 155.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
            },
            {
                name: 'Install 2',
                type: 'verticalBar',
                data: [91.9, 100.5, 155.4, 209.2, 140.0, 106.0, 103.6, 18.5, 260.4, 190.1, 90.6, 50.4]
            },
            {
                name: 'Manufacturing',
                type: 'line',
                data: [3000, 10000.5, 5000.4, 2000.2, 4000.0, 6000.0, 5000.6, 8000.5, 2000.4, 9000.1, 5000.6, 4000.4]
                },
                {
                    name: 'Production',
                    type: 'line',
                    data: [1000, 1500.5, 3000.4, 4000.2, 400.0, 2000.0, 10000.6, 800.5, 5000.4, 900.1, 3500.6, 7000.4]
                }
            ]
        }, 0)
    }
}
