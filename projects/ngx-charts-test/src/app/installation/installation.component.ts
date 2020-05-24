import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-installation',
  templateUrl: './installation.component.html'
})

export class InstallationComponent implements OnInit  {
    
    import=`import { 
            ngxChartsBarModule, 
            ngxChartsLineModule, 
            ngxChartsPieModule
        } from '@tusharghoshbd/ngx-charts';

        @NgModule({
        imports:[ 
                    ... 
                    ngxChartsBarModule, 
                    ngxChartsLineModule, 
                    ngxChartsPieModule
                ]
        })`;

    constructor() { }
    ngOnInit(): void {
       
       
    }


    
   
}
