import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
require('stream');

declare var PASTRX: any;
declare var gapi: any;
const fs = require('fs');

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
  ddDelegates=[];
  delegateList = [];
  delegate = {
    firstName: '',
    lastName: '',
    email: '',
    practiceId: '',
    active : true,
    loginAllowed: true,
    ownerId: ''
  
  };
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
    this.delegates = [];
    var delegateNames = [];
    console.log(this.delegatesList);
    for (var i = 0; i < this.delegatesList.length; i++) {
        if (this.delegatesList[i]) {
            delegateNames.push(this.delegatesList[i].firstName + " " + this.delegatesList[i].lastName);
            this.delegates.push(this.delegatesList[i].id)
        }
    }

   this.api.updateDelegates({
      'delegateList': this.delegates,
      'masquerade': PASTRX.masquerade
  });


  }
  moveToDelegateList(){
    for(var i = 0; i < this.userList.length; i++){
     
      
      if (this.userList[i].isChecked) {
        console.log(this.userList[i]);
        this.userList[i].isChecked=false;
        this.delegatesList.push(this.userList[i]);
        console.log(this.delegatesList);
        
       
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
        var StringReader = require('StringReader');
        var BufferedReader = require('BufferedReader');
        var sr = new StringReader(file);
        var reader = new BufferedReader(sr);
        let responseMessages = [];
        let providerDelegatedListMap = [];
        let total = 0;

        try {
          let provider = null;
          var line = reader.readLine();
          while (line != null) {
              try {
                   let strarray = line.split(",");

                  if(strarray.length > 0) {
                      // Handle line of csv file

                      let providerFirstname = strarray[0]; // Provider First Name
                      let providerLastname = strarray[1]; // Provider Last Name
                      let providerEmail = strarray[2];

                      let i = 3;
                      while (i < strarray.length) {
                        // Set Provider Delegates
                        let delegateFirstname = strarray[i];
                        let delegateLastname = strarray[i + 1];
                        let delegateEmail = strarray[i + 2];
                        i += 3;
                    
                        
                                        this.delegate.firstName = delegateFirstname;
                                        this.delegate.lastName=delegateLastname;
                                        this.delegate.practiceId = PASTRX.practiceId;
                                        this.delegate.active = true;
                                        this.delegate.loginAllowed=true;
                                        this.delegate.email = delegateEmail;
                                        this.delegate.ownerId = PASTRX.masquerade;

                                        total++;
                                        this.delegateList.push(this.delegate);


                  }             
                  

                      
              } 
              line = reader.readLine();
             
              //lineCount++;
          }

       

      catch(Exception){}

        
     }
      const formData = new FormData();

        this.api.uploadDelegatesCSV({
          'file': file,
          'masquerade':PASTRX.masquerade,
          'user': this.delegateList
       }).subscribe({
             next: (resp) => {
               console.log(resp);
             //  this.openDialog();
             },
             error: (err) => console.log(err),
           });
        
    }catch(Exception){}

}                  
}
}
