import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
declare var PASTRX: any;

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  Feedback: string = '';
  request = {
    Summary:'',
    Priority:'',
    Description:'',
    AttachFile:'',
    Name:'',
    email:'',
    Checkbox:'',
  }

  srcResult = null;
  myForm: any;

  onFileSelected(){
    const inputNode: any = document.querySelector('#file');

    if(typeof (FileReader) !== 'undefined'){
      const reader = new FileReader();

      reader.onload = (e : any) => {
        this.srcResult = e.target.result;
      };

      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }

  shortLink: string = "";
	loading: boolean = false; // Flag variable
	file: File = null!; // Variable to store file

	// Inject service
	constructor(private api: ApiService, private router: Router,public dialogRef: MatDialogRef<FeedbackComponent>) { }

	ngOnInit(): void {
	}

	// On file Select
	onChange(event:any) {
		this.file = event.target.files[0];
	}

	// OnClick of button Upload
	onUpload() {
		this.loading = !this.loading;
		console.log(this.file);
		// this.feedback.upload(this.file).subscribe(
		// 	(event: any) => {
		// 		if (typeof (event) === 'object') {

		// 			// Short link via api response
		// 			this.shortLink = event.link;

		// 			this.loading = false; // Flag variable
		// 		}
		// 	}
		// );
	}

  //priority
  openLinkk(): void{
    window.open('https://pastco.atlassian.net/secure/ShowConstantsHelp.jspa?decorator=popup#PriorityLevels')
  }
  //Description
  openLink(): void {
    window.open('https://pastco.atlassian.net/secure/WikiRendererHelpAction.jspa?section=texteffects', '_blank');
  }
  //submit
  onSubmit() {
      this.api.getPMPData(
        {
          'Summary': this.request.Summary,
          'Priority': this.request.Priority,
          'Description': this.request.Description,
          'AttachFile':this.request.AttachFile,
          'Name': this.request.Name,
          'email':this.request.email,
          'Chechbox':this.request.Checkbox
        }
        ).subscribe({
          next: (resp) => {
            
            if (resp.data.indexOf("Success: true") > -1) {
              this.router.navigate(['/user-dashboard']);
            } else {
              // alert("There was a problem processing the patient: " + expectedPatient + " Please try again. \n\n Error Message: " + resp.data);
            }
          },
          error: (err) => console.log(err),
        });
        console.log('Feedback submitted:', this.Feedback);

    // Close the dialog
    this.dialogRef.close();
   }
}