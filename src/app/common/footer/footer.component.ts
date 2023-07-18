import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(public auth: AuthService) {
    console.log("test", this.auth);
    this.auth.user$.subscribe(result=> {
      console.log("test", this.auth);
});
  }

}
