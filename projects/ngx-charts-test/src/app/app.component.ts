import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  navbarCollapse: boolean=false;
  navBarShow={ home: false, installation: false, bar: false, stacked:false, pie: false, line: false, combo:false }

  ngOnInit() {
    this.clickMenuShow('home');
  }

  clickMenuShow(menuName) {
    this.navBarShow={ home: false, installation: false, bar: false, stacked:false, pie: false, line: false, combo:false }
    this.navBarShow[menuName]=true;
  }

  toggleNavbarCollapse() {
    this.navbarCollapse=!this.navbarCollapse;
  }


}
