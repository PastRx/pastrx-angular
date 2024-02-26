import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BatchpdfComponent } from 'src/app/batchpdf/batchpdf.component';
import { FeedbackComponent } from 'src/app/feedback/feedback.component';
import { RemoveBtnComponent } from 'src/app/remove-btn/remove-btn.component';
import { Router } from '@angular/router';
import { UserDashboardComponent } from 'src/app/dashboard/user-dashboard/user-dashboard.component';
import { SetDateComponent } from "src/app/common/set-date/set-date.component";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() inputTitle: string;
  currentRout = this.router.url;
  constructor(private router: Router ,private dialog: MatDialog) {}
  onClick() {
    this.dialog.open(SetDateComponent, {
      width: "500px",
      height: "600px",
      hasBackdrop:false
    });
  }
  //FEEDBACK

  openFeedbackDialog(): void {
    const dialogRef = this.dialog.open(FeedbackComponent, {
      width: '70%', // Set the desired width
      data: {} // You can pass data to the dialog if needed
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle any logic after the dialog is closed, if needed
      console.log('Dialog closed:', result);
    });
  }

  //BATCHPDF

  openBatchpdfDialog(): void {
    
    const dialogRef = this.dialog.open(BatchpdfComponent, {
      width: '50%', // Set the desired width
      maxHeight : '70%',
      position: {
      top: '0', // Set the distance from the top
    },
      //data: {} // You can pass data to the dialog if needed
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle any logic after the dialog is closed, if needed
      console.log('Dialog closed:', result);
    });
  }

  openRemoveDialog(): void {
    
    const dialogRef = this.dialog.open(RemoveBtnComponent, {
      width: '50%', // Set the desired width
      maxHeight : '70%',
      position: {
      top: '0', // Set the distance from the top
    },
      data: { showRemovedPatients: false } 
      //data: {} // You can pass data to the dialog if needed
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle any logic after the dialog is closed, if needed
      console.log('Dialog closed:', result);
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(['/user-dashboard']);
    });

    });
  }
}
