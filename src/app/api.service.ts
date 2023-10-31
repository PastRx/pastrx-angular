import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import config from '../../auth_config.json';

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
    return this.http.get('https://pastrx-qa.appspot.com/_ah/api/pastAPI/v2.40/listPrescribers');
  }
  getPatientNames(): Observable<any> {
    console.log(config.apiUri);
    const body = null;
    return this.http.post('https://pastrx-qa.appspot.com/_ah/api/pastAPI/v2.40/getPatientNames', body);
  }
  listPASTEncounters(parms: any): Observable<any> {
    console.log(parms);
    return this.http.get('https://pastrx-qa.appspot.com/_ah/api/pastAPI/v2.40/listPASTEncounters?targetDate=' + parms.targetDate, parms);
  }
  getPMPData(parms: any): Observable<any> {
    console.log(parms);
    var cprms = this.cleanprms(parms);
    return this.http.get('https://pastrx-qa.appspot.com/_ah/api/pastAPI/v2.40/getpmpdata?' + new URLSearchParams(cprms));
  }
  addUser(parms: any): Observable<any> {
    console.log(parms);
    var cprms = this.cleanprms(parms);
    const body = null;
    return this.http.post('https://pastrx-qa.appspot.com/_ah/api/pastAPI/v2.40/addUser?' + new URLSearchParams(cprms), body);
  }
  getUserList(parms: any): Observable<any> {
    console.log(parms);
    const body = null;
    return this.http.post('https://pastrx-qa.appspot.com/_ah/api/pastAPI/v2.40/getOurUsers', body);
  }
  getUserData(parms: any): Observable<any> {
    console.log(parms);
    var cprms = this.cleanprms(parms);
    return this.http.get('https://pastrx-qa.appspot.com/_ah/api/pastAPI/v2.40/getUserData?' + new URLSearchParams(cprms));
  }

  getEHRIDsForUser(parms: any): Observable<any> {
    console.log(parms);
    var cprms = this.cleanprms(parms);
    return this.http.get('https://pastrx-qa.appspot.com/_ah/api/pastAPI/v2.40/getEHRIDsForUser?' + new URLSearchParams(cprms));
  }

  setUserInactiveList(parms: any): Observable<any> {
    console.log(parms);
    var cprms = this.cleanprms(parms);
    const body = null;
    return this.http.post('https://pastrx-qa.appspot.com/_ah/api/pastAPI/v2.40/setUserInactiveList?' + new URLSearchParams(cprms), body);
  }

  setUserActiveList(parms: any): Observable<any> {
    console.log(parms);
    var cprms = this.cleanprms(parms);
    const body = null;
    return this.http.post('https://pastrx-qa.appspot.com/_ah/api/pastAPI/v2.40/setUserActiveList?' + new URLSearchParams(cprms), body);
  }

  setUserRemoved(parms: any): Observable<any> {
    console.log(parms);
    var cprms = this.cleanprms(parms);
    const body = null;
    return this.http.post('https://pastrx-qa.appspot.com/_ah/api/pastAPI/v2.40/setUserRemoved?' + new URLSearchParams(cprms), body);
  }

  setUserUnremoved(parms: any): Observable<any> {
    console.log(parms);
    var cprms = this.cleanprms(parms);
    const body = null;
    return this.http.post('https://pastrx-qa.appspot.com/_ah/api/pastAPI/v2.40/setUserUnremoved?' + new URLSearchParams(cprms), body);
  }



  updatePractice(parms: any): Observable<any> {
    console.log(parms);
    var cprms = this.cleanprms(parms);
    console.log(parms);
    return this.http.post('https://pastrx-qa.appspot.com/_ah/api/pastAPI/v2.40/updatePractice?', cprms.practice)
  }

  getPractice(parms: any): Observable<any> {
    console.log(parms);
    var cprms = this.cleanprms(parms);
    return this.http.get('https://pastrx-qa.appspot.com/_ah/api/pastAPI/v2.40/getPractice' + new URLSearchParams(cprms));
  }

}
