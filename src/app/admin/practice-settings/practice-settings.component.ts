import {Component, Inject} from '@angular/core';
import {MatDialog,MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from 'src/app/api.service';
declare var PASTRX: any;
declare var gapi: any;

export interface DialogData {
  practiceName: string;
  Address: string;
  medThreshold:'',
    alertDaysBack:'',
    alertWriteFillGap:''
    expectedPatientsPerNight:''

}

@Component({
  selector: 'app-practice-settings',
  templateUrl: './practice-settings.component.html',
  styleUrls: ['./practice-settings.component.css']
})
export class PracticeSettingsComponent {
 
  
  
  practice={
    medThreshold:'',
    alertDaysBack:'',
    alertWriteFillGap:'',
    address : {
      line1: '',
    line2: '',
    city: '',
    state: '',
    zip: ''
    },
    defaultPMPState:'' 
  }

  hint = "As you move through the form , this panel will display details about the current field.";
  InfoPanel = "Info Panel";
  constructor(private api: ApiService,public dialog: MatDialog) { }

  ngOnInit() {
    this.api.getPractice(
      {
        'masquerade': PASTRX.masquerade
      }
    ).subscribe({
      next: (res) => {
        console.log('getPractice------------>'+res)
        this.practice =res;
        console.log(this.practice)
      },
      error: (e) => console.log(e),
    });
  }
  
  hintMME(){
    this.InfoPanel = "MME/Day Alert Threshold";
   this.hint= "The MME/Day Alert Threshold is the number of mg Morphine Milligram Equivalency per Day that will set off the high dose alert. So, with an MME/Day Alert Threshold of 400, a patient would need to have 400 mg MME/Day on a single day to set off the alert.";
  }

  hintAlert(){
    this.InfoPanel = "Alert Trigger Range";
    this.hint = "The alert trigger range is the number of days into the past that the program will look to trigger alerts. So if it’s set at 60 days, you’ll still receive prescription information for the past year, but alerts will only be triggered for events in the past two months.";
  }

  hintGap(){
    this.InfoPanel = "Write/Fill Gap Range";
    this.hint="The Write/Fill Gap Range is the number of days between the date a prescription was written and the date it was filled. So, if you set this at two days, an alert will be triggered when a patient fills a prescription two or more days after it was written.";
  }

  hintAddress(){
    this.InfoPanel = "Practice Address";
    this.hint="Enter the Address of your practice";
  }
  hintPMPState(){
    this.InfoPanel = "PMP State";
    this.hint="Enter the default state for PMP requests.";
  }
  
  update(){
   
  this.api.updatePractice({
     'practice': this.practice
  }).subscribe({
        next: (resp) => {
          console.log(resp);
          this.openDialog();
        },
        error: (err) => console.log(err),
      });

  }

  openDialog() {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        this.dialog.open(practiceUploadedDialogComponent, {width: '500px',data: this.practice} );
        
    }
}


@Component({
  selector: 'practice-uploaded-dialog',
  templateUrl: 'practice-uploaded-dialog.html',
})
export class practiceUploadedDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<practiceUploadedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data={
    practiceName: '',
    address: {locSource: ''},
    medThreshold:'',
      alertDaysBack:'',
      alertWriteFillGap:'',
      expectedPatientsPerNight:''
  }) {}
  onClick(): void {
    this.dialogRef.close();
  }
}