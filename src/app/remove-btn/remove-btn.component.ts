import { MatDialogRef } from '@angular/material/dialog';
import { Component,ChangeDetectorRef} from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { ApiService } from 'src/app/api.service';
declare var PASTRX: any;
declare var gapi: any;
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-remove-btn',
  templateUrl: './remove-btn.component.html',
  styleUrls: ['./remove-btn.component.css']
})
export class RemoveBtnComponent {
  patntrespns: any[] = [];
  showRemovedPatients: boolean = false;
  removedPatients: any[] = [];


  constructor(public dialogRef: MatDialogRef<Component>,private cdr: ChangeDetectorRef,public auth: AuthService, private api: ApiService, private datePipe: DatePipe) {
    this.api.listPASTEncounters(
      {
        'targetDate': this.datePipe.transform(Date.now(), 'MM/dd/YYYY'),
        'masquerade': PASTRX.masquerade
      }
    ).subscribe({
      next: (res) => {
        console.log(res)
        this.patntrespns = res.resultMap;
        this.removedPatients = res.resultMap.filter(ptn => ptn.patientHidden == true);
      },
      error: (e) => console.log(e),
    });
    this.removedPatients = this.patntrespns.filter(ptn => ptn.patientHidden == true);
    console.log("rempat", this.removedPatients);
  } 



    handleButtonClick():void {
      if (this.showRemovedPatients) {
        this.unremoveSelectedPatients();
      } else {
        this.removeSelectedPatients();
      }
    }

    handleButtonClick1() {
      if (this.showRemovedPatients) {
        this.selectAllPatientss();
      } else {
        this.selectAllPatients();
      }
    }

    handleButtonClick2() {
      if (this.showRemovedPatients) {
        this.deselectAllPatientss();
      } else {
        this.deselectAllPatients();
      }
    }

  closeDialog(): void {
    console.log('Closing dialog...');
    this.dialogRef.close();
  }
  selectAllPatients() {
    // Toggle the selected state for all patients
    this.patntrespns.forEach(patient => (patient.selected = true));
    //this.patntrespns.forEach(patient => (patient.selected = !patient.selected))
  }

  selectAllPatientss() {
    // Toggle the selected state for all patients
    this.patntrespns.forEach(patient => (patient.selected = true));
    //this.patntrespns.forEach(patient => (patient.selected = !patient.selected))
  }

  deselectAllPatients() {
    // Deselect all patients
    this.patntrespns.forEach(patient => (patient.selected = false));
  }  

  deselectAllPatientss() {
    // Deselect all patients
    this.patntrespns.forEach(patient => (patient.selected = false));
  }   


  getPatientsToShow(): any[] {
    return this.showRemovedPatients ? this.patntrespns.filter(ptn => ptn.patientHidden == 'true') : this.patntrespns.filter(ptn => ptn.patientHidden != 'true');
    
  }

  removeSelectedPatients() {
  
    const removedIds = this.patntrespns.filter(ptn => ptn.selected).map(ptn => ptn.patientId);
    // Emit patientsUpdated event to inform other components
     this.api.setPatients(this.patntrespns);
     //this.cdr.detectChanges();

    const currentDate = new Date();
    const formattedDate = this.datePipe.transform(currentDate, 'MM%2Fdd%2FYYYY');
    const masquerade = PASTRX.masquerade;
    console.log(removedIds);
    this.api.hidePatientAppointments(removedIds, masquerade, formattedDate).subscribe({
      next: (res) => {
        console.log(res);
        this.closeDialog();
    },
    error: (e) => console.log(e)
  });
  //  location.reload();
  
   }


unremoveSelectedPatients() {
  const removedIds = this.patntrespns.filter(ptn => ptn.selected).map(ptn => ptn.patientId);
  this.removedPatients = this.removedPatients.filter(ptn => !removedIds.includes(ptn.patientId));
  
  // Add selected patients back to active patients list
  const selectedPatients = this.removedPatients.filter(ptn => ptn.selected);
  this.patntrespns.push(...selectedPatients);
  
  this.api.setPatients(this.patntrespns); 
  const currentDate = new Date();
  const formattedDate = this.datePipe.transform(currentDate, 'MM%2Fdd%2FYYYY');
  const masquerade = PASTRX.masquerade;
  this.api.unhidePatientAppointments(removedIds, masquerade, formattedDate).subscribe({
      next: (res) => {
          console.log(res);
          this.closeDialog();
      },
      error: (e) => console.log(e)
  });
  // location.reload();
}

}



// removeSelectedPatients() {
  
//   const removedIds = this.patntrespns.filter(ptn => ptn.selected).map(ptn => ptn.patientId);
//   // this.removedPatients = this.patntrespns.filter(ptn => removedIds.includes(ptn.patientId));
//   // console.log("removedpat", this.removedPatients);

//   // Remove selected patients from the local array
//   // this.patntrespns = this.patntrespns.filter(ptn => !removedIds.includes(ptn.patientId));
//   // console.log("patnrespns", this.patntrespns);
  
//   // Add removed patients to the removedPatients array
//   //  this.removedPatients.push(...this.removedPatients);
//   //  console.log("removedpat", this.removedPatients);

//   // // Remove selected state from removed patients
//   //  this.removedPatients.forEach(patient => (patient.selected = false));
//   //  console.log("removedpat", this.removedPatients);

//   // Emit patientsUpdated event to inform other components
//    this.api.setPatients(this.patntrespns);
//    //this.cdr.detectChanges();
  

//   const currentDate = new Date();
//   const formattedDate = this.datePipe.transform(currentDate, 'MM%2Fdd%2FYYYY');
//   const masquerade = PASTRX.masquerade;
//   console.log(removedIds);
//   this.api.hidePatientAppointments(removedIds, masquerade, formattedDate).subscribe({
//     next: (res) => {
//       console.log(res);
//       this.closeDialog();
//   },
//   error: (e) => console.log(e)
// });
// //  location.reload();

//  }