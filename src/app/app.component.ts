import { Component, HostListener, Inject } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
declare var PASTRX: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Auth0 Angular SDK Sample';
  userActivity: ReturnType<typeof setTimeout> | undefined;
  userInactive: Subject<any> = new Subject()

  constructor(public auth: AuthService, @Inject(DOCUMENT) private doc: Document) {
    console.log('user has been inactive for 1 hour');
    console.log(PASTRX.logoutURL);
  }
  ngOnInit() {
    this.userInactive.subscribe(res => {
      this.auth.logout({ logoutParams: { returnTo: this.doc.location.origin } });
      console.log('user has been inactive for 1 hour');
    });
    this.setTimeout();
  }
  setTimeout() {
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), 3600000);
  }

  @HostListener('window:mousemove')
  @HostListener('window:keydown')
  refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }


}
