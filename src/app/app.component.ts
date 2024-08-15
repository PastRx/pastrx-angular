import { Component, HostListener, Inject } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Router } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { environment } from 'src/environments/environment';
import Parse from 'parse';


declare var PASTRX: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Auth0 Angular SDK Sample';
  userActivity;
  userInactive: Subject<any> = new Subject(); // Subject from RxJS to track user inactivity
  idleState = 'Not started.';  // Holds the current state of idle monitoring.
  timedOut = false;
  lastPing?: Date = null;  //Stores the timestamp of the last keepalive ping

  constructor(
    public auth: AuthService,@Inject(DOCUMENT) private doc: Document,private locationStrategy: LocationStrategy,private idle: Idle,private keepalive: Keepalive,private router: Router) {
    Parse.initialize(environment.api);  //Initializes Parse with the API key from the environment and sets the server URL.
    Parse.serverURL = 'environment.api';
    console.log(PASTRX.logoutURL);
    console.log('user has been inactive for 20 minutes');  
    idle.setIdle(1200); // Time in seconds before considering the user idle
    idle.setTimeout(1);  //Time in seconds before triggering a timeout after idle
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES); // Interrupt sources to reset the idle timer

    idle.onIdleEnd.subscribe(() => (this.idleState = 'No longer idle.'));  //Subscribes event when the user is no longer idle, updating the idleState.
    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      this.signout();
    });
    idle.onIdleStart.subscribe(() => (this.idleState = "You've gone idle!")); // Subscribes the event when the user goes idle, updates the idleState.
    idle.onTimeoutWarning.subscribe(
      (countdown) => (this.idleState = 'You will time out in ' + countdown + ' seconds!')  // Subscribes timeout warning events, updating the idleState with in remaining countdown time.

    );  

    keepalive.interval(15); // Ping interval in seconds to check user activity
    keepalive.onPing.subscribe(() => (this.lastPing = new Date()));

    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.reset(); // Start the idle timer when the user logs in
      } else {
        this.idle.stop(); // Stop the idle timer when the user logs out
      }
    });
  }

  reset() {
    this.idle.watch(); // Start monitoring user activity
    this.idleState = 'Started.';
    this.timedOut = false;
  }
    
  signout() {
    return new Promise<void>((resolve, reject) => {
      Parse.User.logOut()
        .then(() => {
          localStorage.clear();
          window.location.href = window.location.origin;
          resolve();
        })
        .catch((err) => {
          console.error('Error during signout:', err);
          resolve();
        });

      // Prevent navigation back to the previous page
      history.pushState(null, null, location.href);
      this.locationStrategy.onPopState(() => {
        history.pushState(null, null, location.href);
      });
    });
  }
}