import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  public onSucess(msg: any) {
    this.snackBar.open(msg, 'X', {
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: ["success-snackbar"],
      duration: 3000
    });
  }
  public onError(msg: any) {
    this.snackBar.open(msg, 'X', {
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: ["error-snackbar"],
      duration: 3000
    });
  }
}
