import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
declare var PASTRX: any;
declare var gapi: any;

@Component({
  selector: 'app-delegate-settings',
  templateUrl: './delegate-settings.component.html',
  styleUrls: ['./delegate-settings.component.css']
})
export class DelegateSettingsComponent {
  userList: any;
  constructor(private api: ApiService,private datePipe: DatePipe, private router: Router   ) { }
 
  ngOnInit() {
    this.api.getUserList(
      {
        'masquerade': PASTRX.masquerade
      }
    ).subscribe({
      next: (res) => {
        console.log('getuserlist------------>'+res)
        this.userList =res.items;
      },
      error: (e) => console.log(e),
    });
  }


  uploadDelegateFile(){}
  updateDelegateList(){}
  moveToDelegateList(){}
  moveToUserList(){}

}
