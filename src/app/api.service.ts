import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import config from '../../auth_config.json';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) { }

  cleanprms(parms) {
    Object.keys(parms).forEach(key => {
      if (parms[key] == null) {
        delete parms[key];
      }
    });
    return parms;
  }

  ping$(): Observable<any> {
    console.log(config.apiUri);
    return this.http.get('${config.apiUri}/api/external');
  }
  listPrescribers(): Observable<any> {
    console.log(config.apiUri);
    return this.http.get(environment.api+'listPrescribers');
  }
  getPatientNames(): Observable<any> {
    console.log(config.apiUri);
    const body = null;
    return this.http.post(environment.api+'getPatientNames', body);
  }
  listPASTEncounters(parms: any): Observable<any> {
    console.log(parms);
    return this.http.get(environment.api+'listPASTEncounters?targetDate=' + parms.targetDate, parms);
  }
  getPMPData(parms: any): Observable<any> {
    console.log(parms);
    var cprms = this.cleanprms(parms);
    return this.http.get(environment.api+'getpmpdata?' + new URLSearchParams(cprms));
  }
  addUser(parms: any): Observable<any> {
    console.log(parms);
    var cprms = this.cleanprms(parms);
    const body = null;
    return this.http.post(environment.api+'addUser?' + new URLSearchParams(cprms), body);
  }
  getUserList(parms: any): Observable<any> {
    console.log(parms);
    const body = null;
    return this.http.post(environment.api+'getOurUsers', body);
  }
  getUserData(parms: any): Observable<any> {
    console.log(parms);
    var cprms = this.cleanprms(parms);
    return this.http.get(environment.api+'getUserData?' + new URLSearchParams(cprms));
  }

  getEHRIDsForUser(parms: any): Observable<any> {
    console.log(parms);
    var cprms = this.cleanprms(parms);
    return this.http.get(environment.api+'getEHRIDsForUser?' + new URLSearchParams(cprms));
  }

  setUserInactiveList(parms: any): Observable<any> {
    console.log(parms);
    var cprms = this.cleanprms(parms);
    const body = null;
    return this.http.post(environment.api+'setUserInactiveList?' + new URLSearchParams(cprms), body);
  }

  setUserActiveList(parms: any): Observable<any> {
    console.log(parms);
    var cprms = this.cleanprms(parms);
    const body = null;
    return this.http.post(environment.api+'setUserActiveList?' + new URLSearchParams(cprms), body);
  }

  setUserRemoved(parms: any): Observable<any> {
    console.log(parms);
    var cprms = this.cleanprms(parms);
    const body = null;
    return this.http.post(environment.api+'setUserRemoved?' + new URLSearchParams(cprms), body);
  }

  setUserUnremoved(parms: any): Observable<any> {
    console.log(parms);
    var cprms = this.cleanprms(parms);
    const body = null;
    return this.http.post(environment.api+'setUserUnremoved?' + new URLSearchParams(cprms), body);
  }



  updatePractice(parms: any): Observable<any> {
    console.log(parms);
    var cprms = this.cleanprms(parms);
    console.log(parms);
    return this.http.post(environment.api+'updatePractice?', cprms.practice)
  }

  getPractice(parms: any): Observable<any> {
    console.log(parms);
    var cprms = this.cleanprms(parms);
    return this.http.get(environment.api+'getPractice' + new URLSearchParams(cprms));
  }

}
