import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
declare var PASTRX: any;

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent {
  appTitle = "Submit PMP Request";
  oneYearFromNow = new Date(new Date().setFullYear(new Date().getFullYear() - 1)); 
  resgetPatientNames: any;
  isQuickSearch = false;
  reslistPrescribers: any;
  selptnt:any;
  request = {
    firstName: '',
    lastName: '',
    dobString: '',
    zipString: '',
    phoneString: '',
    ssn: '',
    appointmentDate: this.datePipe.transform(Date.now(),'MM/dd/YYYY'),
    appointmentTime: this.datePipe.transform(Date.now(),'shortTime'),
    startDate: this.datePipe.transform(this.oneYearFromNow,'MM/dd/YYYY'),
    endDate: this.datePipe.transform(Date.now(),'MM/dd/YYYY'),
    address: '',
    city: '',
    state: ''
  };
selectedProvider: any;
  selectedProviderId: any;
  constructor(private api: ApiService,private datePipe: DatePipe, private router: Router   ) { }
  ngOnInit() {
    this.api.getPatientNames().subscribe({
      next: (res) => {
        this.resgetPatientNames = res.practicePatients;
        console.log(this.resgetPatientNames)
      },
      error: (err) => console.log(err),
    });
    this.api.listPrescribers().subscribe({
      next: (res) => {
        this.reslistPrescribers = res.items;
        console.log(this.reslistPrescribers)
      },
      error: (err) => console.log(err),
    });
  }
  selectedProviderChange() {
this.selectedProviderId = this.selectedProvider.id;
  }
  submitRequest() {
    this.api.getPMPData(
      {
        'userMode': PASTRX.queryMode,
        'masquerade': PASTRX.masquerade,
        'firstName': this.request.firstName,
        'lastName': this.request.lastName,
        'dobString': this.request.dobString,
        'zipString': PASTRX.nullIfEmptyString(this.request.zipString),
        'phoneString': PASTRX.nullIfEmptyString(this.request.phoneString),
        'SSN': PASTRX.nullIfEmptyString(this.request.ssn),
        'providerId': this.selectedProviderId,
        'appointmentDateString': this.request.appointmentDate,
        'appointmentTimeString': this.request.appointmentTime,
        'startDateString': this.request.startDate,
        'endDateString': this.request.endDate,
        'addressLine1': this.request.address,
        'city': this.request.city,
        'patientState': this.request.state,
        // 'athenaDeptId': athenaDeptId
      }
    ).subscribe({
      next: (resp) => {
        console.log(resp);
        if (resp.data.indexOf("Success: true") > -1) {
          this.router.navigate(['/user-dashboard']);
          // If User should see this patient in their list then add to patient list else don't add to list
          // if( providerId == PASTRX.masquerade || providerId == PASTRX.userInfo.id ||
          //     (this.delegatedList != null && this.delegatedList.indexOf(providerId) != -1) ){
          //     PASTRX.autoRefreshPatientList(expectedPatient, 60);
          // }

        } else {
          // alert("There was a problem processing the patient: " + expectedPatient + " Please try again. \n\n Error Message: " + resp.data);
        }
      },
      error: (err) => console.log(err),
    });
  }
  updateFields(){


    var input = this.selptnt;

    console.log("Update Fields");
    console.log(input);

    var str_array = input.split(", ");

    console.log(str_array);

    if(str_array != undefined && str_array != null && str_array.length >= 3) {

        if(str_array[0] != null) {
            this.request.lastName = str_array[0];
        }else{
            this.request.lastName = "";
        }
        if(str_array[1] != null) {
            this.request.firstName = str_array[1];
        }else{
            this.request.firstName = "";
        }
        if(str_array[2] != null) {
            this.request.dobString = str_array[2];
        }else{
            this.request.dobString = "";
        }
        if(str_array[3] != null) {
            this.request.zipString = str_array[3];
        }else{
            this.request.zipString = "";
        }

    }
  }



}
