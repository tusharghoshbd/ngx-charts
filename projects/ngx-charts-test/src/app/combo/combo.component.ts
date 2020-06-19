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
                name: 'Manufacturing',
                type: 'line',
                data: [30000, 100000.5, 50000.4, 20000.2, 40000.0, 60000.0, 50000.6, 80000.5, 20000.4, 90000.1, 50000.6, 40000.4]
                }
            ]
        }, 0)
    }
}
