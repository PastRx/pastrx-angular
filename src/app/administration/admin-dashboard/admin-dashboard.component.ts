import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';

declare var PASTRX: any;
declare var gapi: any;
import { DatePipe } from '@angular/common';
// import {MatTabsModule} from '@angular/material/tabs';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  // imports: [MatTabsModule],
  // standalone: true,
})
export class AdminDashboardComponent {
  
  ngOnInit() {
   
  }
}
