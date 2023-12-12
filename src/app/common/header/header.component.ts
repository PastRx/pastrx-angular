import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from "@angular/material/dialog";
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
}
