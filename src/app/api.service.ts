import { Injectable,EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import config from '../../auth_config.json';
import { User } from '@auth0/auth0-angular';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  patients: any[] = [];
  patientsUpdated = new EventEmitter<any[]>();
  handleError: (err: any, caught: Observable<any>) => Observable<any>;
  constructor(private http: HttpClient) { }

  cleanprms(parms) {
    Object.keys(parms).forEach(key => {
      if (parms[key] == null) {
        delete parms[key];
      }
    });
    return parms;
  }
  
  setPatients(patients: any[]): void {
    this.patients = patients;
    console.log(this.patients);
    this.patientsUpdated.emit(this.patients); // Emit changes
  }
  

  removePatientById(patientId: number[]): void {
    this.patients = this.patients.filter(patient => !patientId.includes(patient.id));
    //this.patientsUpdated.emit(this.patients); // Emit changes
    this.setPatients(this.patients)
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
  getPastReportJson(parms: any): Observable<any> {
    console.log(parms);
    var cprms = this.cleanprms(parms);
    const body = null;
    return this.http.post(environment.api+'getPastReportJson?' + new URLSearchParams(cprms), body);
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
  
  hidePatientAppointments(patientList: number[], masquerade: string | null, targetDate: string | null): Observable<any> {
  // Construct query parameters
  console.log("plist" + patientList);
  const patientListQueryParam = patientList.join('&patientList=');
  let apiParams = `?patientList=${patientListQueryParam}`;
  if (masquerade) {
    apiParams += `&masquerade=${masquerade}`;
  }
  if (targetDate) {
    apiParams += `&targetDate=${targetDate}`;
  }

  // Make HTTP GET request
  return this.http.get(environment.api + 'hidePatientAppointments' + apiParams)
    .pipe(
      catchError(this.handleError) // Handle errors
    );
  }
  
  unhidePatientAppointments(patientList: number[], masquerade: string | null, targetDate: string | null): Observable<any> {
    // Construct query parameters
    console.log("plist" + patientList);
    const patientListQueryParam = patientList.join('&patientList=');
    let apiParams = `?patientList=${patientListQueryParam}`;
    if (masquerade) {
      apiParams += `&masquerade=${masquerade}`;
    }
    if (targetDate) {
      apiParams += `&targetDate=${targetDate}`;
    }
  
    // Make HTTP GET request
    return this.http.get(environment.api + 'unhidePatientAppointments' + apiParams)
      .pipe(
        catchError(this.handleError) // Handle errors
      );
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




  uploadDelegatesCSV(parms:any):Observable<any> {
    console.log(parms);
    var cprms = this.cleanprms(parms);
    console.log(parms);
    return this.http.post('https://pastrx-qa.appspot.com/_ah/api/pastAPI/v2.40/uploadDelegatesCSV?' ,cprms.data)
  }

  listDelegates(parms:any): Observable<any> {
    console.log(parms);  
    var cprms = this.cleanprms(parms); 
    const body=null;
    return this.http.get('https://pastrx-qa.appspot.com/_ah/api/pastAPI/v2.40/listDelegates');
  }
  
  
}
