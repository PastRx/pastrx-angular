import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { DatePipe } from '@angular/common';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
declare var PASTRX: any;
declare var gapi: any;

@Component({
  selector: 'app-set-date',
  templateUrl: './set-date.component.html',
  styleUrls: ['./set-date.component.css'],
})
export class SetDateComponent {
  selected: Date | null;
  constructor(public datepipe: DatePipe,private dialog: Dialog){}
  changeTargetDate() {
    if (this.selected == null) {
      this.selected = null;
    }
  
    var dateText = "Mon Dec 4 2021"; //this.datepipe.transform(new Date(this.selected), 'EEE MMM d YYYY'); 
    console.log("Setting target date to: " + dateText);
    PASTRX.targetDate = dateText;
    PASTRX.patientDataList = null;
    this.dialog.closeAll();
    PASTRX.setPatientListPage();
    //PASTRX.refreshPatientListPage();
    // var dialog = document.getElementById('targetdate-panel');
   
  }

  onClick(): void {
    this.dialog.closeAll();
  }
}
