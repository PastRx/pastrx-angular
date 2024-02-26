import { MatDialogRef } from '@angular/material/dialog';
import { Component, Input } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ApiService } from 'src/app/api.service';
declare var PASTRX: any;
declare var gapi: any;
import { DatePipe } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';  
import JSZip from 'jszip';
import { MatCard } from '@angular/material/card';


@Component({
  selector: 'app-batchpdf',
  templateUrl: './batchpdf.component.html',
  styleUrls: ['./batchpdf.component.css']
})
export class BatchpdfComponent {
  Batchpdf: string = '';
  patntrespns = [];
  totalPatients: any[] = [];
  hidePatientsWithNoPMPs: boolean = false;
  selectAll: any;
  request = {
    Checkbox: '',
  }
  patients: any;
  constructor(public dialogRef: MatDialogRef<Component>,private http: HttpClient,private cdr: ChangeDetectorRef,public auth: AuthService, private api: ApiService, private datePipe: DatePipe) {

    this.api.listPASTEncounters(
      {
        'targetDate': this.datePipe.transform(Date.now(), 'MM/dd/YYYY'),
        'masquerade': PASTRX.masquerade
      }
    ).subscribe({
      next: (res) => {
        this.totalPatients = res.resultMap; 
        //this.patntrespns = this.patntrespns.filter(ptn => !this.removedPatients.some(removed => removed.id === ptn.id));
      },
      error: (e) => console.log(e),
    });
    if(this.api.patients.length > 0 || this.totalPatients.length == 0) {
      this.patntrespns = this.api.patients;
    }
    else {
      this.patntrespns = this.totalPatients;
     }
  }

  //CLOSE DIALOG
  closeDialog(): void {
    console.log('Closing dialog...');
    this.dialogRef.close();
  }

  selectAllPatients() {
    // Toggle the selected state for all patients
    this.patntrespns.forEach(patient => (patient.selected = true));
  }

  deselectAllPatients() {
    // Deselect all patients
    this.patntrespns.forEach(patient => (patient.selected = false));
  }   
  toggleHidePatients() {
    this.hidePatientsWithNoPMPs = !this.hidePatientsWithNoPMPs;
    this.cdr.detectChanges();
  }
  updateCheckboxState(ptn: any) {

    this.cdr.detectChanges();
  }
  
  downloadpdf() {
    const oneYearFromNow = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
    const zip = new JSZip();
    const pdfPromises: Promise<{ data: Uint8Array; id: string }>[] = [];
  
    for (let i = 0; i < this.patntrespns.length; i++) {
      // Construct query parameters for the API request
      const queryParams = {
        userMode: 'NORMAL',
        firstName: this.patntrespns[i].patientFirst,
        lastName: this.patntrespns[i].patientLast,
        dobString: this.patntrespns[i].patientDOBString,
        providerId: this.patntrespns[i].metadata.providerId,
        startDateString: this.datePipe.transform(Date.now(), 'MM/dd/YYYY'),
        appointmentDateString: this.patntrespns[i].appointmentDate,
        zipString: this.patntrespns[i].patientZipString,
        appointmentTimeString: this.patntrespns[i].appointmentTime,
        endDateString: this.datePipe.transform(oneYearFromNow, 'MM/dd/YYYY'),
      };

      
  
      // Push a promise for each patient to the pdfPromises array
      pdfPromises.push(
        new Promise((resolve, reject) => {
          // Make an API request to getPMPData using queryParams
          this.api.getPMPData(queryParams).subscribe(
            (response: any) => {

              //console.log(`API Response for patient ${this.patntrespns[i].id}:`, response);

              const uint8ArrayData = new Uint8Array(response.data);

              //console.log(`Size of Uint8Array for patient ${this.patntrespns[i].id}:`, uint8ArrayData.length);

              resolve({ data: uint8ArrayData, id: this.patntrespns[i].id }); // Resolve the promise with the PDF data and patient ID
            },
            (error) => {
              console.error(`Error fetching PDF data for patient ${this.patntrespns[i].id}:`, error);
              reject(error); // Reject the promise if there's an error
            }
          );
        })
      );
    }
    
    
    // Wait for all promises to resolve
    Promise.all(pdfPromises).then(
      (pdfDataArray:  { data: Uint8Array; id: string }[]) => {
        // Iterate through the resolved promises and add each PDF data to the zip file
        pdfDataArray.forEach(pdfData => {
         
          const blob = new Blob([pdfData.data], { type: 'application/pdf' });
          //console.log(`Size of Blob for patient ${pdfData.id}:`, blob.size);
          zip.file(`patient_report_${pdfData.id}.pdf`, blob);
          
        });
  
        // Generate the zip file
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()}_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}`;
        const zipFilename = `PastReport_${formattedDate}.zip`;
        zip.generateAsync({ type: 'blob' }).then((content) => {
          // Use FileSaver.js to trigger the download of the zip file
          saveAs(content, zipFilename);
        });
      },
      (error) => {
        // Handle errors during the API requests
        console.error('Error fetching PMP data for one or more patients:', error);
      }
    );
    
  }
  
}



