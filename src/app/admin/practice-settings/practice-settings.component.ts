import { Component } from '@angular/core';

@Component({
  selector: 'app-practice-settings',
  templateUrl: './practice-settings.component.html',
  styleUrls: ['./practice-settings.component.css']
})
export class PracticeSettingsComponent {
  appTitle = "Practice Settings";
  MMEThreshold=90;
  alertTrigger=90;
  whiteRange=5;
  line1:any;
  line2: any;
  city: any;
  state: any;
  zip:any

  hint = "As you move through the form , this panel will display details about the current field.";

  hintMME(){
   this.hint= "The MME/Day Alert Threshold is the number of mg Morphine Milligram Equivalency per Day that will set off the high dose alert. So, with an MME/Day Alert Threshold of 400, a patient would need to have 400 mg MME/Day on a single day to set off the alert.";
  }

  hintAlert(){
    this.hint = "The alert trigger range is the number of days into the past that the program will look to trigger alerts. So if it’s set at 60 days, you’ll still receive prescription information for the past year, but alerts will only be triggered for events in the past two months.";
  }

  hintGap(){
    this.hint="The Write/Fill Gap Range is the number of days between the date a prescription was written and the date it was filled. So, if you set this at two days, an alert will be triggered when a patient fills a prescription two or more days after it was written.";
  }
  
  update(){

  }
}
