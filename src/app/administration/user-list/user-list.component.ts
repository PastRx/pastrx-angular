import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { DatePipe } from '@angular/common';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
declare var PASTRX: any;
declare var gapi: any;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  isAddUser=false;
  isInactiveUsers=false;
  isOnlyInactiveUsers=false;
  isOnlyRemovedUsers=false;
  userList: any;
  addUserRequest(){
   this.isAddUser=true;
  }
  stIsAddUser(evnt){
    console.log(evnt);
    this.isAddUser=evnt;
  }
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
}
