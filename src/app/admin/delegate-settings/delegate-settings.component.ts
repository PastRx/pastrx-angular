import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


declare var PASTRX: any;
declare var gapi: any;

@Component({
  selector: 'app-delegate-settings',
  templateUrl: './delegate-settings.component.html',
  styleUrls: ['./delegate-settings.component.css']
})
export class DelegateSettingsComponent {
  userList: any;
  fileName: any;
  delegatesList= [];
  user: any;
  idToUse: any;
  delegates=[];
  
  constructor(private api: ApiService,private datePipe: DatePipe, private router: Router,private http: HttpClient   ) { }
 
  ngOnInit() {
    this.getUserData();
    this.getUserList();
    
  }
  
  getUserData(){
    this.api.getUserData(
      {
        'masquerade': PASTRX.masquerade
      }
    ).subscribe({
      next: (res) => {
        console.log('getUserData------------>' + res)
        this.user = res.id;
        console.log(this.user);
        this.listDelegates();
      },
      error: (e) => console.log(e),
    });
  }

  getUserList(){
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

  listDelegates(){
   
    this.api.listDelegates(
      {
        'masquerade': PASTRX.masquerade
      }
    ).subscribe({
      next: (res) => {
        console.log('getDelegateslist------------>'+res.items)
        this.delegates =res.items;
        this.getMyDelegates(this.user);
        console.log('getDelegates------------>'+this.delegates)
      },
      error: (e) => console.log(e),
    });

   
  }

  getMyDelegates(userId){
    if(this.delegates){
    for(var i = 0; i < this.delegates.length; i++){
     
      var OwnerId = this.delegates[i].ownerId;
      if (userId == OwnerId) {
        console.log(userId,OwnerId);
       
          this.delegatesList.push(this.delegates[i]);
         // this.userList.remove(this.delegatesList[i]);
      }
  }
}
  }


  uploadDelegateFile(){}
  updateDelegateList(){

  }
  moveToDelegateList(){
    for(var i = 0; i < this.userList.length; i++){
     
      
      if (this.userList[i].isChecked) {
        console.log(this.userList[i]);
        this.userList[i].isChecked=false;
        this.delegatesList.push(this.userList[i]);
        
        
       
        this.userList.splice(i,1);
      }
  } 
  }
  moveToUserList(){
    for(var i = 0; i < this.delegatesList.length; i++){
      
      var selected = this.delegatesList[i].isChecked;
      if (selected = 'true') {
        this.delegatesList.splice(i,1);
        this.userList.push(this.delegatesList[i]);
      }
  } 
  }
  onFileSelected(event) {

    const file:File = event.target.files[0];

    if (file) {

        this.fileName = file.name;

        const formData = new FormData();

        this.api.uploadDelegatesCSV({
          'data': formData
       }).subscribe({
             next: (resp) => {
               console.log(resp);
             //  this.openDialog();
             },
             error: (err) => console.log(err),
           });
        
    }
}                  
}
