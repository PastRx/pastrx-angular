import { Component } from '@angular/core';
declare var PASTRX: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Auth0 Angular SDK Sample';

  constructor() {
    console.log(PASTRX.logoutURL);
  }
}
