import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import config from '../../auth_config.json';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  ping$(): Observable<any> {
    console.log(config.apiUri);
    return this.http.get(`${config.apiUri}/api/external`);
  }
  getPatientNames(): Observable<any> {
    console.log(config.apiUri);
    const body=null;
    return this.http.post(`https://pastrx-qa.appspot.com/_ah/api/pastAPI/v2.40/getPatientNames`, body);
  }
  listPASTEncounters(parms:any): Observable<any> {
    console.log(config.apiUri);    
    return this.http.get(`https://pastrx-qa.appspot.com/_ah/api/pastAPI/v2.40/listPASTEncounters?targetDate=08%2F08%2F2023`, parms);
  }
}
