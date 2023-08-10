import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(public auth: AuthService, @Inject(DOCUMENT) private doc: Document) {
    console.log("test", this.auth);
    this.auth.user$.subscribe(result => {
      console.log("test", this.auth);
    });
  }

  logout() {
    this.auth.logout({ logoutParams: { returnTo: this.doc.location.origin } });
  }

}
