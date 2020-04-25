import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'ngx-charts-test';

    options = {
        title: 'Monthly Average Rainfall',
        subtitle: 'Source: WorldClimate.com',
        height:400,
        // width: 700,
        xAxis: {
            title: 'Month name'
        },
        yAxis: {
            title: 'Rainfall (mm)'
        },
    }
    categories = [ 'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec' ]
    series=[{
        name: 'Tokyo',
        data: [49.9, 71.5, -106.4, 129.2, 144.0, 57.0, -135.6, -148.5, 216.4, 194.1, 95.6, 54.4]
    }]
        

}
