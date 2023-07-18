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
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Bearer', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJrRTRRME5GTlVGQ1FqTTRORVpGTVVVeE1USTVRVGRETlVFME5qTkdNemhDTkVFMVEwWXlOUSJ9.eyJpc3MiOiJodHRwczovL3Bhc3RyeC5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDM4OTI1MzA0NDY5ODY3NzI5MTkiLCJhdWQiOlsiaHR0cHM6Ly9hcGlzLWV4cGxvcmVyLmFwcHNwb3QuY29tL2FwaXMtZXhwbG9yZXIvP2Jhc2U9aHR0cHM6Ly9wYXN0cngtcWEuYXBwc3BvdC5jb20vX2FoL2FwaSNwL3Bhc3RBUEkvdjIuNDAvIiwiaHR0cHM6Ly9wYXN0cnguYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY4ODQ0Mzc0NiwiZXhwIjoxNjg4NTMwMTQ2LCJhenAiOiJQUGJhdk5Pb1NvbkZmRTUwQ3FWWlV3Q2Q4ZGs5VDJCSiIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwifQ.q92oYkUkSNjE_b5F_rXP4dATLdQkUFQXDff1VWJNqj5a99Xqdoq5y30B7jaOf6RpfmK_Us5btOiVJ5175v4BwNL0llCcqFbYtoAaJXiACIW3DM7iD8kGeXZmZN6Cj6tkGA2Skhc3jd2hN25XOzdL-jccrAB8FlgXmD9HTvnOxmbsgRVwD3id8-SqyQOyv-_AE7b9Iy_9Wzd3SOkFZr-Dgfyb-j4nyNUdLOaV0G-X8F3oLrpCOjtfuuL-bnhbvGBNI3g6MXlIdack1HYxSOXBf9JGONde_m_QB5nY3s8UozmSZkHR2ioQlJTp7w5uEe_p1oztzqqdJtwGTyt0IrCdqg');
    const body=null;
    return this.http.post(`https://pastrx-qa.appspot.com/_ah/api/pastAPI/v2.40/getPatientNames`, body);
  }
}
