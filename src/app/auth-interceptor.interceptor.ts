import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService) {
  
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.auth.user$.subscribe(result=> {
      console.log("test", result);
});
    const tkn = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJrRTRRME5GTlVGQ1FqTTRORVpGTVVVeE1USTVRVGRETlVFME5qTkdNemhDTkVFMVEwWXlOUSJ9.eyJpc3MiOiJodHRwczovL3Bhc3RyeC5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDM4OTI1MzA0NDY5ODY3NzI5MTkiLCJhdWQiOlsiaHR0cHM6Ly9hcGlzLWV4cGxvcmVyLmFwcHNwb3QuY29tL2FwaXMtZXhwbG9yZXIvP2Jhc2U9aHR0cHM6Ly9wYXN0cngtcWEuYXBwc3BvdC5jb20vX2FoL2FwaSNwL3Bhc3RBUEkvdjIuNDAvIiwiaHR0cHM6Ly9wYXN0cnguYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY4ODYxNjA2MCwiZXhwIjoxNjg4NzAyNDYwLCJhenAiOiJQUGJhdk5Pb1NvbkZmRTUwQ3FWWlV3Q2Q4ZGs5VDJCSiIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwifQ.PEPv3w1w1b-TqnY9bQO4H3DeUZyV-cj90D1R76-9L3Pklx837Od0HkIgHoHPaPwVtDhBEb_C1sSLHP7kg5xutZpOdOW48E-YA01GeL-8Mjn_jBcbiI3-OhYeC1J-Pd2zp7McW546ySKYeAWmNtAHRvMPi2dhtEvjGINpJiENO0Weki8ZMG5vddCaWRSfUFNGLpktgmR9KXnqGA-PcLk6G3aURmKN-N0XH8RXXQbbkgWztBr5unVZTX-wF6CUlCvo6_rb7Edd3oYAbGxiM3AgvOseUmT6qYNvEe67TdzsYL9nE3HWr8sczDRQ7eXGZ7rNIEJE-PficHq6w5zMjtkl3Q";
    if (tkn) {
        const cln = request.clone({
            headers: request.headers.set('Authorization', 'Bearer '+tkn)
        });
        return next.handle(cln);
    }else{
        return next.handle(request);
    }
  }
}
