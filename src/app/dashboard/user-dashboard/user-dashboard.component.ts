import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  constructor(public auth: AuthService) {
    console.log("test", this.auth);
    this.auth.user$.subscribe(result=> {
      console.log("test", this.auth);
});
  }

}
