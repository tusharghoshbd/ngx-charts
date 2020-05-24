# Ngx Chartx

**Ngx Charts** is an angular library for presenting data in chart. This library is easy to integrate in your angular component. This library supports Horizontal Bar, Vertical Bar, Pie, Donuts and Line chart. In this libray use D3 to calculate math, scale, axis and shape. You can also customize this library as your requirements.

Building this library is inspired by jQuery Highchart and @swimlane/ngx-chartx.


## Demo

![](https://media2.giphy.com/media/ft5jOe21QwSVtUiRW5/giphy.gif)

[Demo example](https://tusharghoshbd.github.io/ngx-charts/#)

[Demo in stackblitz](https://stackblitz.com/edit/tusharghoshdbd-ngx-charts)

## Installation

```ts
npm i @tusharghoshbd/ngx-charts
```


## Usage

#### Html file
```html
<ngx-charts-bar
    [categories]="categoriesh"
    [series]="seriesh"
    [options]="optionsh"
>
</ngx-charts-bar>
```

#### Ts file
```ts
optionsh: any={};
categoriesh: any=[];
seriesh: any=[];

ngOnInit(): void {

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
          labelEllipsis: true,
          labelEllipsisSize: 16
       },
       yAxis: {
          title: 'Continent name',
          labelEllipsis: true,
          labelEllipsisSize: 16
       },
       plotOptions: {
          groupBarPadding: 20,
          innerBarPadding: 2
       },
       legend: {
          labelEllipsis: true,
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
}
```

#### Module file
```ts
import { ngxChartsBarModule} from '@tusharghoshbd/ngx-charts';

@NgModule({
   imports:[ 
             ... 
             ngxChartsBarModule
          ]
})
```

## Features
* Responsive
* Horizontal bar chart
* Vertical bar chart
* Pie chart
* Donuts chart
* Line chart
* Customized legend
* Tool-tip
* Chart animation


**All features examples are available in 
[Demo in stackblitz](https://stackblitz.com/edit/tusharghoshdbd-ngx-charts)** 

## Upcoming features
* Customized tooltip template
* Legend click event


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License
[MIT](https://choosealicense.com/licenses/mit/)