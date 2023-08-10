import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.auth.getAccessTokenSilently().pipe(
      switchMap(idTokenClaims => {
        console.log('idTokenClaims', idTokenClaims);

        // Get the ID token
        const idToken = idTokenClaims;

        // Clone the request and add the Authorization header
        const modifiedRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${idToken}`
          }
        });

        // Continue with the modified request
        return next.handle(modifiedRequest);
      })
    );
  }
}
