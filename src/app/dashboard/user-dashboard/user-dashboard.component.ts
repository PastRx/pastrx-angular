import { Component, Input } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ApiService } from 'src/app/api.service';
declare var PASTRX: any;
declare var gapi: any;
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  patntrespns = [];
  appTitle = "Patients for: " + this.datePipe.transform(Date.now(), 'MM/dd/YYYY');

  constructor(public auth: AuthService, private api: ApiService, private datePipe: DatePipe) {

    console.log("test", this.auth);
    this.auth.user$.subscribe(result => {
      console.log("test", this.auth);
    });

    this.api.listPASTEncounters(
      {
        'targetDate': this.datePipe.transform(Date.now(), 'MM/dd/YYYY'),
        'masquerade': PASTRX.masquerade
      }
    ).subscribe({
      next: (res) => {
        console.log(res)
        this.patntrespns = res.resultMap;
      },
      error: (e) => console.log(e),
    });

  }
  ngOnInit() {
    // this.api.listPASTEncounters(
    //   {
    //     'targetDate': "08/08/2023",
    //     'masquerade': PASTRX.masquerade
    //   }
    // ).subscribe({
    //   next: (res) => {
    //     console.log(res)
    //   },
    //   error: (e) => console.log(e),
    // });
    // gapi.client.pastAPI.listPASTEncounters({
    //   'targetDate': "07/27/2023",
    //   'masquerade': PASTRX.masquerade
    // }).then(function (resp) {
    //   console.log(resp);
    // });
  }
  setDetailsUser(usrC) {
    localStorage.setItem("usrC", JSON.stringify(usrC));
  }
}
