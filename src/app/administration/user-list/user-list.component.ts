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
  isAddUser = false;
  isInactiveUsers = false;
  isOnlyInactiveUsers = false;
  isOnlyRemovedUsers = false;
  userListInactiveList: any; selectedItem: any;
  userList: any; list: any; remove: any;
  addUserRequest() {
    this.isAddUser = true;
  }
  stIsAddUser(evnt) {
    console.log(evnt);
    this.isAddUser = evnt;
  }
  constructor(private api: ApiService, private datePipe: DatePipe, private router: Router) { }

  ngOnInit() {
    this.getUsersList();
  }

  getUsersList() {
    this.api.getUserList(
      {
        'masquerade': PASTRX.masquerade
      }
    ).subscribe({
      next: (res) => {
        this.userList = res.items;
      },
      error: (e) => console.log(e),
    });
  }

  onChange() {
    if (this.isInactiveUsers == true) {
      this.userList = this.userList.sort((a, b) => ((a.active < b.active) ? -1 : (a.active > b.active) ? 1 : 0));
    }
    else if (this.isOnlyInactiveUsers == true) {
      this.userListInactiveList = this.userList.filter(item => item.active === false);;
      this.userList = this.userListInactiveList;
    }
    else {
      this.getUsersList();
    }
  }

  onChangeRemove() {

  }

  setInactive() {
    if (this.list != 0) {
      this.selectedItem = [];
      this.selectedItem.push(this.list[0].firstName, this.list[0].lastName);
      this.api.setUserInactiveList(
        {
          providerList: this.selectedItem,
          masquerade: PASTRX.masquerade
        }).subscribe({
          next: (response) => {
            this.getUsersList();
          },
          error: (e) => console.log(e),
        });
    }
  }

  setActive() {
    if (this.list != 0) {
      this.selectedItem = [];
      this.selectedItem.push(this.list[0].firstName, this.list[0].lastName);
      this.api.setUserActiveList(
        {
          providerList: this.list,
          masquerade: PASTRX.masquerade
        }).subscribe({
          next: (response) => {
            this.getUsersList();
          },
          error: (e) => console.log(e),
        });
    }
  }

  setAdmin() {
    this.remove = false;
    if (this.list != 0) {
      this.selectedItem = [];
      this.selectedItem.push(this.list[0].id);
      this.updateAdminList();
    }
  }

  removeAdmin() {
    this.remove = true;
    if (this.list != 0) {
      this.selectedItem = [];
      this.selectedItem.push(this.list[0].id);
      this.updateAdminList();
    }
  }

  removeUsers() {
    if (this.list != 0) {
      this.api.setUserRemoved(
        {
          firstName: this.list[0].firstName,
          lastName: this.list[0].lastName,
          masquerade: PASTRX.masquerade,
          email: null
        }).subscribe({
          next: (response) => {
            this.getUsersList();
          },
          error: (e) => console.log(e),
        });
    }
  }

  unremoveUsers() {
    if (this.list != 0) {
      this.api.setUserUnremoved(
        {
          firstName: this.list[0].firstName,
          lastName: this.list[0].lastName,
          masquerade: PASTRX.masquerade,
          email: null
        }).subscribe({
          next: (response) => {
            this.getUsersList();
          },
          error: (e) => console.log(e),
        });
    }
  }


  getSelected(e: any, items: any) {
    this.list = [];
    items.selected = e.target.checked;
    if (e.target.checked) {
      this.list.push(items);
    }
  }

  updateAdminList() {
    this.api.setUserActiveList(
      {
        providerList: this.selectedItem,
        masquerade: PASTRX.masquerade,
        remove: this.remove
      }).subscribe({
        next: (response) => {
          this.getUsersList();
        },
        error: (e) => console.log(e),
      });
  }

}
