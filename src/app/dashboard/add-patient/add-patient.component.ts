import { Component, OnDestroy } from '@angular/core';
import { ApiService } from '../../api.service';
import { CommonService } from '../../common.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
declare var PASTRX: any;

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnDestroy {
  appTitle = "Submit PMP Request";
  oneYearFromNow = new Date(new Date().setFullYear(new Date().getFullYear() - 1)); 
  resgetPatientNames: any;
  filteredPatientNames: any[] = [];
  isQuickSearch = false;
  reslistPrescribers: any;
  filteredPrescribers: any[] = [];
  selptnt:any;
  private patientInput$ = new Subject<string>();
  private destroyed$ = new Subject<void>();
  request = {
    firstName: '',
    lastName: '',
    dobString: '',
    zipString: '',
    phoneString: '',
    ssn: '',
    appointmentDate: '',
    appointmentTime: '',
    startDate: '',
    endDate: '',
    address: '',
    city: '',
    state: ''
  };
selectedProvider: any;
  selectedProviderId: any;
  constructor(private api: ApiService,private datePipe: DatePipe, private router: Router, public CommonService:CommonService   ) { }
  ngOnInit() {
    // Initialize date-related fields now that datePipe is available
    this.request.appointmentDate = this.datePipe.transform(Date.now(),'MM/dd/YYYY') || '';
    this.request.appointmentTime = this.datePipe.transform(Date.now(),'shortTime') || '';
    this.request.startDate = this.datePipe.transform(this.oneYearFromNow,'MM/dd/YYYY') || '';
    this.request.endDate = this.datePipe.transform(Date.now(),'MM/dd/YYYY') || '';
    this.api.getPatientNames().subscribe({
      next: (res) => {
        this.resgetPatientNames = res.practicePatients;
        console.log(this.resgetPatientNames)
        // Initialize with first page
        if (Array.isArray(this.resgetPatientNames)) {
          this.filteredPatientNames = this.resgetPatientNames.slice(0, 50);
        }
      },
      error: (err) => console.log(err),
    });
    this.api.listPrescribers().subscribe({
      next: (res) => {
        this.reslistPrescribers = res.items;
        console.log(this.reslistPrescribers)
        if (Array.isArray(this.reslistPrescribers)) {
          this.filteredPrescribers = this.reslistPrescribers.slice(0, 50);
        }
      },
      error: (err) => console.log(err),
    });

    // Debounced input stream to filter locally
    this.patientInput$
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        map((term) => this.filterPatients(term)),
        takeUntil(this.destroyed$)
      )
      .subscribe((results) => {
        this.filteredPatientNames = results;
      });
  }
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.patientInput$.complete();
  }
  onPatientInput(value: string) {
    this.patientInput$.next(value ?? '');
  }
  private filterPatients(term: string): any[] {
    if (!Array.isArray(this.resgetPatientNames) || this.resgetPatientNames.length === 0) {
      return [];
    }
    const search = (term || '').toLowerCase().trim();
    if (search.length === 0) {
      return this.resgetPatientNames.slice(0, 50);
    }
    return this.resgetPatientNames
      .filter((p: any) => (p + '').toLowerCase().includes(search))
      .slice(0, 50);
  }
  onProviderInput(value: string) {
    const results = this.filterProviders(value ?? '');
    this.filteredPrescribers = results;
  }
  onProviderSelected(provider: any) {
    this.selectedProvider = provider;
    this.selectedProviderChange();
  }
  displayProvider = (provider?: any) => provider ? `${provider.lastName},${provider.firstName}` : '';
  private filterProviders(term: string): any[] {
    if (!Array.isArray(this.reslistPrescribers) || this.reslistPrescribers.length === 0) {
      return [];
    }
    const search = (term || '').toLowerCase().trim();
    if (search.length === 0) {
      return this.reslistPrescribers.slice(0, 50);
    }
    return this.reslistPrescribers
      .filter((p: any) =>
        (`${p.lastName}, ${p.firstName}`.toLowerCase().includes(search))
      )
      .slice(0, 50);
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
          this.CommonService.onError("There was a problem processing the patient: " + this.request.firstName + this.request.lastName + " Please try again. \n\n Error Message: " + resp.data);
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
