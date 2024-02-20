import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
// declare var PASTRX: any;
declare global {
    interface Window { reactReportData: any; }
}

window.reactReportData = window.reactReportData || {};
@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
    shwrpt = false;
    showMaps = false;
    showPMP = false;
    showAlerts = false;
    appTitle = "Patients Details";
    center: google.maps.LatLngLiteral = {
        lat: 22.2736308,
        lng: 70.7512555
    };
    zoom = 6;
    constructor(private api: ApiService) {
        // gapi.client.pastAPI.getPastReportJson({
        //     'patientId': PASTRX.selectedPid,
        //     'masquerade': PASTRX.masquerade,
        //     'appointmentId': PASTRX.appointmentId
        // })
    }
    ngOnInit() {
        var cuser = JSON.parse(localStorage.getItem("usrC"));
        console.log(cuser);
        this.api.getPastReportJson(
            {
                'patientId': cuser.patientId,
                // 'masquerade': PASTRX.masquerade,
                'appointmentId': cuser.id
            }
        ).subscribe({
            next: (res) => {
                console.log(res)
                window.reactReportData = res;
                this.shwrpt = true;
                // this.patntrespns = res.resultMap;
            },
            error: (e) => console.log(e),
        });
        
        // {
        //     "pastReport": {
        //         "reportDate": "2024-01-26T00:00:00.000+05:30",
        //         "processDate": "2024-01-26T08:36:44.952+05:30",
        //         "patient": {
        //             "id": "6007697174429696",
        //             "created": "2023-04-18T09:38:17.912+05:30",
        //             "modified": "2024-01-26T08:36:50.003+05:30",
        //             "ownerId": "6323257011601408",
        //             "practiceId": "4634407151337472",
        //             "hashString": "e438717f05a318cc4b5ba990a584d1f0",
        //             "firstName": "ULA",
        //             "lastName": "PECK",
        //             "dateOfBirth": "1939-02-04T00:00:00.000+05:30",
        //             "dobString": "02/04/1939",
        //             "lDateOfBirth": {
        //                 "dayOfMonth": 4,
        //                 "dayOfWeek": 6,
        //                 "era": 1,
        //                 "year": 1939,
        //                 "dayOfYear": 35,
        //                 "weekOfWeekyear": 5,
        //                 "chronology": {
        //                     "zone": {
        //                         "fixed": true,
        //                         "id": "UTC"
        //                     }
        //                 },
        //                 "centuryOfEra": 19,
        //                 "yearOfCentury": 39,
        //                 "weekyear": 1939,
        //                 "yearOfEra": 1939,
        //                 "monthOfYear": 2,
        //                 "fields": [
        //                     {
        //                         "leapDurationField": {
        //                             "precise": true,
        //                             "unitMillis": "86400000",
        //                             "name": "days",
        //                             "type": {
        //                                 "name": "days"
        //                             },
        //                             "supported": true
        //                         },
        //                         "lenient": false,
        //                         "minimumValue": -292275054,
        //                         "maximumValue": 292278993,
        //                         "durationField": {
        //                             "precise": false,
        //                             "unitMillis": "31556952000",
        //                             "name": "years",
        //                             "type": {
        //                                 "name": "years"
        //                             },
        //                             "supported": true
        //                         },
        //                         "name": "year",
        //                         "type": {
        //                             "durationType": {
        //                                 "name": "years"
        //                             },
        //                             "name": "year"
        //                         },
        //                         "supported": true
        //                     },
        //                     {
        //                         "rangeDurationField": {
        //                             "precise": false,
        //                             "unitMillis": "31556952000",
        //                             "name": "years",
        //                             "type": {
        //                                 "name": "years"
        //                             },
        //                             "supported": true
        //                         },
        //                         "leapDurationField": {
        //                             "precise": true,
        //                             "unitMillis": "86400000",
        //                             "name": "days",
        //                             "type": {
        //                                 "name": "days"
        //                             },
        //                             "supported": true
        //                         },
        //                         "lenient": false,
        //                         "minimumValue": 1,
        //                         "maximumValue": 12,
        //                         "durationField": {
        //                             "precise": false,
        //                             "unitMillis": "2629746000",
        //                             "name": "months",
        //                             "type": {
        //                                 "name": "months"
        //                             },
        //                             "supported": true
        //                         },
        //                         "name": "monthOfYear",
        //                         "type": {
        //                             "durationType": {
        //                                 "name": "months"
        //                             },
        //                             "rangeDurationType": {
        //                                 "name": "years"
        //                             },
        //                             "name": "monthOfYear"
        //                         },
        //                         "supported": true
        //                     },
        //                     {
        //                         "rangeDurationField": {
        //                             "precise": false,
        //                             "unitMillis": "2629746000",
        //                             "name": "months",
        //                             "type": {
        //                                 "name": "months"
        //                             },
        //                             "supported": true
        //                         },
        //                         "minimumValue": 1,
        //                         "maximumValue": 31,
        //                         "lenient": false,
        //                         "durationField": {
        //                             "precise": true,
        //                             "unitMillis": "86400000",
        //                             "name": "days",
        //                             "type": {
        //                                 "name": "days"
        //                             },
        //                             "supported": true
        //                         },
        //                         "unitMillis": "86400000",
        //                         "name": "dayOfMonth",
        //                         "type": {
        //                             "durationType": {
        //                                 "name": "days"
        //                             },
        //                             "rangeDurationType": {
        //                                 "name": "months"
        //                             },
        //                             "name": "dayOfMonth"
        //                         },
        //                         "supported": true
        //                     }
        //                 ],
        //                 "values": [
        //                     1939,
        //                     2,
        //                     4
        //                 ],
        //                 "fieldTypes": [
        //                     {
        //                         "durationType": {
        //                             "name": "years"
        //                         },
        //                         "name": "year"
        //                     },
        //                     {
        //                         "durationType": {
        //                             "name": "months"
        //                         },
        //                         "rangeDurationType": {
        //                             "name": "years"
        //                         },
        //                         "name": "monthOfYear"
        //                     },
        //                     {
        //                         "durationType": {
        //                             "name": "days"
        //                         },
        //                         "rangeDurationType": {
        //                             "name": "months"
        //                         },
        //                         "name": "dayOfMonth"
        //                     }
        //                 ]
        //             },
        //             "status": "Ready",
        //             "address": {
        //                 "id": "5304009732653056",
        //                 "created": "2023-04-18T09:38:22.002+05:30",
        //                 "modified": "2024-01-26T08:36:50.003+05:30",
        //                 "line1": "1702 W Camelback Rd",
        //                 "city": "Phoenix",
        //                 "state": "AZ",
        //                 "zip": "85015",
        //                 "locLat": 33.5101779,
        //                 "locLng": -112.0961681,
        //                 "locSource": "1702 w camelback rd  phoenix,az 85015"
        //             },
        //             "appointmentDate": "2023-04-17T00:00:00.000+05:30",
        //             "appointmentTimeString": "00:00",
        //             "appointmentDateTime": "2023-04-17T00:00:00.000+05:30",
        //             "lastAppointmentSource": "Manual Request",
        //             "lastReportDateString": "2024-01-25",
        //             "zipCode": "88789",
        //             "provider": "Roman V",
        //             "alertPresent": true,
        //             "highDoseAlert": true,
        //             "notOurPrescriberAlert": true,
        //             "notOurPharmacyAlert": true,
        //             "multipleAlert": true,
        //             "screenAlert": false,
        //             "otherAlert": true,
        //             "otherAlertString": "W/F Gap",
        //             "unexpectedPatientAlert": false,
        //             "multiplePrescriberSameCat": true,
        //             "overlappingPrescriber": true,
        //             "overlappingPharmacy": true,
        //             "maxMEDD": 278,
        //             "currentMEDD": 83,
        //             "ccdLoaded": false,
        //             "ccdProblem": false,
        //             "pmpLoaded": true,
        //             "pmpNoData": false,
        //             "pmpProblem": false,
        //             "pmpAndCcdProblem": false,
        //             "apptLoaded": true,
        //             "alertsProcessed": false,
        //             "pmpAlertsProcessed": true,
        //             "combinedAlertsProcessed": false,
        //             "photoLoaded": false,
        //             "late": false,
        //             "veryLate": false,
        //             "problemCodes": "",
        //             "latestPrescriberNote": "",
        //             "qualityKey": "  CCD:NO  PMP:OK  APPOINTMENT:OK  ALERTS:NO",
        //             "fullPatientName": "ULA PECK",
        //             "athenaPatient": false
        //         },
        //         "reportingState": "OH",
        //         "prescribers": [
        //             {
        //                 "id": "5013738662920192",
        //                 "created": "2023-04-18T09:38:32.010+05:30",
        //                 "modified": "2023-04-18T09:38:32.010+05:30",
        //                 "firstName": "SHERISE",
        //                 "lastName": "ALSTON",
        //                 "sourceAddress": "1707 w camelback rd  phoenix,az 85015",
        //                 "location": {
        //                     "id": "6421113546473472",
        //                     "created": "2023-04-18T09:38:32.003+05:30",
        //                     "modified": "2023-04-18T09:38:32.011+05:30",
        //                     "line1": "1707 W Camelback Rd",
        //                     "city": "Phoenix",
        //                     "state": "AZ",
        //                     "zip": "85015",
        //                     "locLat": 33.509006,
        //                     "locLng": -112.096277,
        //                     "locSource": "1707 w camelback rd  phoenix,az 85015"
        //                 },
        //                 "deaNumber": "FR4679734"
        //             },
        //             {
        //                 "id": "4661894942031872",
        //                 "created": "2023-04-18T09:38:28.708+05:30",
        //                 "modified": "2023-04-18T09:38:28.708+05:30",
        //                 "firstName": "LEONORE",
        //                 "lastName": "BURKE",
        //                 "sourceAddress": "3330 n scottsdale rd  scottsdale,az 85251",
        //                 "location": {
        //                     "id": "6491482290651136",
        //                     "created": "2023-04-18T09:38:28.700+05:30",
        //                     "modified": "2023-04-18T09:38:28.708+05:30",
        //                     "line1": "3330 N Scottsdale Rd",
        //                     "city": "Scottsdale",
        //                     "state": "AZ",
        //                     "zip": "85251",
        //                     "locLat": 33.4870326,
        //                     "locLng": -111.9272421,
        //                     "locSource": "3330 n scottsdale rd  scottsdale,az 85251"
        //                 },
        //                 "deaNumber": "MF3403273"
        //             },
        //             {
        //                 "id": "5022534755942400",
        //                 "created": "2023-04-18T09:38:22.275+05:30",
        //                 "modified": "2023-04-18T09:38:22.275+05:30",
        //                 "firstName": "TAWNYA",
        //                 "lastName": "NUNEZ",
        //                 "sourceAddress": "6989 n hayden rd  scottsdale,az 85250",
        //                 "location": {
        //                     "id": "6429909639495680",
        //                     "created": "2023-04-18T09:38:22.264+05:30",
        //                     "modified": "2023-04-18T09:38:22.277+05:30",
        //                     "line1": "6989 N Hayden Rd",
        //                     "city": "Scottsdale",
        //                     "state": "AZ",
        //                     "zip": "85250",
        //                     "locLat": 33.5379566,
        //                     "locLng": -111.9060417,
        //                     "locSource": "6989 n hayden rd  scottsdale,az 85250"
        //                 },
        //                 "deaNumber": "MH3849176"
        //             },
        //             {
        //                 "id": "6280376058118144",
        //                 "created": "2023-04-18T09:38:30.534+05:30",
        //                 "modified": "2023-04-18T09:38:30.534+05:30",
        //                 "firstName": "MARNA",
        //                 "lastName": "WITT",
        //                 "sourceAddress": "20759-20963 n tatum blvd  phoenix,az 85050",
        //                 "location": {
        //                     "id": "5154476151275520",
        //                     "created": "2023-04-18T09:38:30.528+05:30",
        //                     "modified": "2023-04-18T09:38:30.534+05:30",
        //                     "line1": "20759 N Tatum Blvd",
        //                     "city": "Phoenix",
        //                     "state": "AZ",
        //                     "zip": "85054",
        //                     "locLat": 33.6749678,
        //                     "locLng": -111.9773019,
        //                     "locSource": "20759- 20963 n tatum blvd  phoenix,az 85050"
        //                 },
        //                 "deaNumber": "BS0422775"
        //             },
        //             {
        //                 "id": "6535462755762176",
        //                 "created": "2023-04-18T09:38:23.938+05:30",
        //                 "modified": "2023-04-18T09:38:23.938+05:30",
        //                 "firstName": "MARNA",
        //                 "lastName": "WITT",
        //                 "sourceAddress": "718 e union hills dr  phoenix,az 85024",
        //                 "location": {
        //                     "id": "5409562848919552",
        //                     "created": "2023-04-18T09:38:23.930+05:30",
        //                     "modified": "2023-04-18T09:38:23.939+05:30",
        //                     "line1": "718 E Union Hills Dr",
        //                     "city": "Phoenix",
        //                     "state": "AZ",
        //                     "zip": "85024",
        //                     "locLat": 33.6561533,
        //                     "locLng": -112.0637055,
        //                     "locSource": "718 e union hills dr  phoenix,az 85024"
        //                 },
        //                 "deaNumber": "BS0422775"
        //             },
        //             {
        //                 "id": "6465094011584512",
        //                 "created": "2023-04-18T09:38:26.965+05:30",
        //                 "modified": "2023-04-18T09:38:26.965+05:30",
        //                 "firstName": "MARNA",
        //                 "lastName": "WITT",
        //                 "sourceAddress": "2605 w deer valley rd  phoenix,az 85027",
        //                 "location": {
        //                     "id": "5339194104741888",
        //                     "created": "2023-04-18T09:38:26.958+05:30",
        //                     "modified": "2023-04-18T09:38:26.965+05:30",
        //                     "line1": "2605 W Deer Valley Rd",
        //                     "city": "Phoenix",
        //                     "state": "AZ",
        //                     "zip": "85027",
        //                     "locLat": 33.6830506,
        //                     "locLng": -112.1160883,
        //                     "locSource": "2605 w deer valley rd  phoenix,az 85027"
        //                 },
        //                 "deaNumber": "BS0422775"
        //             },
        //             {
        //                 "id": "4943369918742528",
        //                 "created": "2023-04-18T09:38:29.340+05:30",
        //                 "modified": "2023-04-18T09:38:29.340+05:30",
        //                 "firstName": "MARNA",
        //                 "lastName": "WITT",
        //                 "sourceAddress": "4214 w dunlap ave  phoenix,az 85051",
        //                 "location": {
        //                     "id": "6350744802295808",
        //                     "created": "2023-04-18T09:38:29.332+05:30",
        //                     "modified": "2023-04-18T09:38:29.341+05:30",
        //                     "line1": "4214 W Dunlap Ave",
        //                     "city": "Phoenix",
        //                     "state": "AZ",
        //                     "zip": "85051",
        //                     "locLat": 33.5679233,
        //                     "locLng": -112.1495883,
        //                     "locSource": "4214 w dunlap ave  phoenix,az 85051"
        //                 },
        //                 "deaNumber": "BS0422775"
        //             },
        //             {
        //                 "id": "5435951127986176",
        //                 "created": "2023-04-18T09:38:31.034+05:30",
        //                 "modified": "2023-04-18T09:38:31.034+05:30",
        //                 "firstName": "BELKIS",
        //                 "lastName": "MUELLER",
        //                 "sourceAddress": "",
        //                 "deaNumber": "MH0820820"
        //             },
        //             {
        //                 "id": "5647057360519168",
        //                 "created": "2023-04-18T09:38:27.828+05:30",
        //                 "modified": "2023-04-18T09:38:27.828+05:30",
        //                 "firstName": "JESUS",
        //                 "lastName": "GOFF",
        //                 "sourceAddress": "3502 w greenway rd  phoenix,az 85053",
        //                 "location": {
        //                     "id": "4521157453676544",
        //                     "created": "2023-04-18T09:38:27.822+05:30",
        //                     "modified": "2023-04-18T09:38:27.829+05:30",
        //                     "line1": "3502 W Greenway Rd",
        //                     "city": "Phoenix",
        //                     "state": "AZ",
        //                     "zip": "85053",
        //                     "locLat": 33.6255504,
        //                     "locLng": -112.1339396,
        //                     "locSource": "3502 w greenway rd  phoenix,az 85053"
        //                 },
        //                 "deaNumber": "MH3182261"
        //             },
        //             {
        //                 "id": "5128087872208896",
        //                 "created": "2023-04-18T09:38:23.147+05:30",
        //                 "modified": "2023-04-18T09:38:23.147+05:30",
        //                 "firstName": "",
        //                 "lastName": "",
        //                 "sourceAddress": "5022 n 17th ave  phoenix,az 85015",
        //                 "location": {
        //                     "id": "5691037825630208",
        //                     "created": "2023-04-18T09:38:23.141+05:30",
        //                     "modified": "2023-04-18T09:38:23.148+05:30",
        //                     "line1": "5022 N 17th Ave",
        //                     "city": "Phoenix",
        //                     "state": "AZ",
        //                     "zip": "85015",
        //                     "locLat": 33.5106346,
        //                     "locLng": -112.0963149,
        //                     "locSource": "5022 n 17th ave  phoenix,az 85015"
        //                 },
        //                 "deaNumber": "BC7786140"
        //             },
        //             {
        //                 "id": "6210007313940480",
        //                 "created": "2023-04-18T09:38:28.143+05:30",
        //                 "modified": "2023-04-18T09:38:28.143+05:30",
        //                 "firstName": "LEONORE",
        //                 "lastName": "BURKE",
        //                 "sourceAddress": "3399 n scottsdale rd  scottsdale,az 85251",
        //                 "location": {
        //                     "id": "5084107407097856",
        //                     "created": "2023-04-18T09:38:28.104+05:30",
        //                     "modified": "2023-04-18T09:38:28.143+05:30",
        //                     "line1": "3399 N Scottsdale Rd",
        //                     "city": "Scottsdale",
        //                     "state": "AZ",
        //                     "zip": "85251",
        //                     "locLat": 33.4873821,
        //                     "locLng": -111.9253742,
        //                     "locSource": "3399 n scottsdale rd  scottsdale,az 85251"
        //                 },
        //                 "deaNumber": "MF3403273"
        //             },
        //             {
        //                 "id": "6676200244117504",
        //                 "created": "2023-04-18T09:38:25.169+05:30",
        //                 "modified": "2023-04-18T09:38:25.169+05:30",
        //                 "firstName": "MARQUITTA",
        //                 "lastName": "BROCK",
        //                 "sourceAddress": "3749-3799 e indian school rd  phoenix,az 85018",
        //                 "location": {
        //                     "id": "5550300337274880",
        //                     "created": "2023-04-18T09:38:25.162+05:30",
        //                     "modified": "2023-04-18T09:38:25.169+05:30",
        //                     "line1": "3749 E Indian School Rd",
        //                     "city": "Phoenix",
        //                     "state": "AZ",
        //                     "zip": "85018",
        //                     "locLat": 33.49479520000001,
        //                     "locLng": -112.0001152,
        //                     "locSource": "3749-3799 e indian school rd  phoenix,az 85018"
        //                 },
        //                 "deaNumber": "MP1714460"
        //             },
        //             {
        //                 "id": "5998901081407488",
        //                 "created": "2023-04-18T09:38:30.934+05:30",
        //                 "modified": "2023-04-18T09:38:30.934+05:30",
        //                 "firstName": "MARNA",
        //                 "lastName": "WITT",
        //                 "sourceAddress": "5310 e high st  phoenix,az 85054",
        //                 "location": {
        //                     "id": "4873001174564864",
        //                     "created": "2023-04-18T09:38:30.926+05:30",
        //                     "modified": "2023-04-18T09:38:30.934+05:30",
        //                     "line1": "5310 E High St",
        //                     "city": "Phoenix",
        //                     "state": "AZ",
        //                     "zip": "85054",
        //                     "locLat": 33.6765403,
        //                     "locLng": -111.9663621,
        //                     "locSource": "5310 e high st  phoenix,az 85054"
        //                 },
        //                 "deaNumber": "BS0422775"
        //             },
        //             {
        //                 "id": "4732263686209536",
        //                 "created": "2023-04-18T09:38:31.419+05:30",
        //                 "modified": "2023-04-18T09:38:31.419+05:30",
        //                 "firstName": "MARNA",
        //                 "lastName": "WITT",
        //                 "sourceAddress": "null n 53rd st  phoenix,az 85054",
        //                 "location": {
        //                     "id": "6561851034828800",
        //                     "created": "2023-04-18T09:38:31.412+05:30",
        //                     "modified": "2023-04-18T09:38:31.419+05:30",
        //                     "line1": "null N 53rd St",
        //                     "city": "Phoenix",
        //                     "state": "AZ",
        //                     "zip": "85054",
        //                     "locLat": 33.6734909,
        //                     "locLng": -111.9683645,
        //                     "locSource": "null n 53rd st  phoenix,az 85054"
        //                 },
        //                 "deaNumber": "BS0422775"
        //             },
        //             {
        //                 "id": "5902144058163200",
        //                 "created": "2023-04-18T09:38:26.654+05:30",
        //                 "modified": "2023-04-18T09:38:26.654+05:30",
        //                 "firstName": "JESUS",
        //                 "lastName": "GOFF",
        //                 "sourceAddress": "21816 n 26th ave  phoenix,az 85027",
        //                 "location": {
        //                     "id": "4776244151320576",
        //                     "created": "2023-04-18T09:38:26.646+05:30",
        //                     "modified": "2023-04-18T09:38:26.655+05:30",
        //                     "line1": "21816 N 26th Ave",
        //                     "city": "Phoenix",
        //                     "state": "AZ",
        //                     "zip": "85027",
        //                     "locLat": 33.684586,
        //                     "locLng": -112.116367,
        //                     "locSource": "21816 n 26th ave  phoenix,az 85027"
        //                 },
        //                 "deaNumber": "MH3182261"
        //             },
        //             {
        //                 "id": "5506319872163840",
        //                 "created": "2023-04-18T09:38:29.637+05:30",
        //                 "modified": "2023-04-18T09:38:29.637+05:30",
        //                 "firstName": "MARNA",
        //                 "lastName": "WITT",
        //                 "sourceAddress": "4225 w dunlap ave  phoenix,az 85051",
        //                 "location": {
        //                     "id": "6069269825585152",
        //                     "created": "2023-04-18T09:38:29.630+05:30",
        //                     "modified": "2023-04-18T09:38:29.637+05:30",
        //                     "line1": "4225 W Dunlap Ave",
        //                     "city": "Phoenix",
        //                     "state": "AZ",
        //                     "zip": "85051",
        //                     "locLat": 33.5671697,
        //                     "locLng": -112.1506737,
        //                     "locSource": "4225 w dunlap ave  phoenix,az 85051"
        //                 },
        //                 "deaNumber": "BS0422775"
        //             },
        //             {
        //                 "id": "6632219779006464",
        //                 "created": "2023-04-18T09:38:29.717+05:30",
        //                 "modified": "2023-04-18T09:38:29.717+05:30",
        //                 "firstName": "LEONORE",
        //                 "lastName": "BURKE",
        //                 "sourceAddress": "",
        //                 "deaNumber": "MF3403273"
        //             },
        //             {
        //                 "id": "6746568988295168",
        //                 "created": "2023-04-18T09:38:27.549+05:30",
        //                 "modified": "2023-04-18T09:38:27.549+05:30",
        //                 "firstName": "MARNA",
        //                 "lastName": "WITT",
        //                 "sourceAddress": "4727 e bell rd  phoenix,az 85032",
        //                 "location": {
        //                     "id": "5620669081452544",
        //                     "created": "2023-04-18T09:38:27.541+05:30",
        //                     "modified": "2023-04-18T09:38:27.550+05:30",
        //                     "line1": "4727 E Bell Rd",
        //                     "city": "Phoenix",
        //                     "state": "AZ",
        //                     "zip": "85032",
        //                     "locLat": 33.6383669,
        //                     "locLng": -111.9792636,
        //                     "locSource": "4727 e bell rd  phoenix,az 85032"
        //                 },
        //                 "deaNumber": "BS0422775"
        //             },
        //             {
        //                 "id": "5717426104696832",
        //                 "created": "2023-04-18T09:38:30.170+05:30",
        //                 "modified": "2023-04-18T09:38:30.170+05:30",
        //                 "firstName": "MARNA",
        //                 "lastName": "WITT",
        //                 "sourceAddress": "21050 n tatum blvd  phoenix,az 85050",
        //                 "location": {
        //                     "id": "4591526197854208",
        //                     "created": "2023-04-18T09:38:30.164+05:30",
        //                     "modified": "2023-04-18T09:38:30.170+05:30",
        //                     "line1": "21050 N Tatum Blvd",
        //                     "city": "Phoenix",
        //                     "state": "AZ",
        //                     "zip": "85050",
        //                     "locLat": 33.6777893,
        //                     "locLng": -111.9789375,
        //                     "locSource": "21050 n tatum blvd  phoenix,az 85050"
        //                 },
        //                 "deaNumber": "BS0422775"
        //             },
        //             {
        //                 "id": "6605831499939840",
        //                 "created": "2023-04-18T09:38:26.369+05:30",
        //                 "modified": "2023-04-18T09:38:26.369+05:30",
        //                 "firstName": "MARNA",
        //                 "lastName": "WITT",
        //                 "sourceAddress": "2602 w deer valley rd  phoenix,az 85027",
        //                 "location": {
        //                     "id": "5479931593097216",
        //                     "created": "2023-04-18T09:38:26.361+05:30",
        //                     "modified": "2023-04-18T09:38:26.369+05:30",
        //                     "line1": "2602 W Deer Valley Rd",
        //                     "city": "Phoenix",
        //                     "state": "AZ",
        //                     "zip": "85027",
        //                     "locLat": 33.6842607,
        //                     "locLng": -112.1163379,
        //                     "locSource": "2602 w deer valley rd  phoenix,az 85027"
        //                 },
        //                 "deaNumber": "BS0422775"
        //             },
        //             {
        //                 "id": "5295213639630848",
        //                 "created": "2023-04-18T09:38:31.720+05:30",
        //                 "modified": "2023-04-18T09:38:31.720+05:30",
        //                 "firstName": "MARNA",
        //                 "lastName": "WITT",
        //                 "sourceAddress": "20855 n 53rd st  phoenix,az 85054",
        //                 "location": {
        //                     "id": "5858163593052160",
        //                     "created": "2023-04-18T09:38:31.711+05:30",
        //                     "modified": "2023-04-18T09:38:31.720+05:30",
        //                     "line1": "20855 N 53rd St",
        //                     "city": "Phoenix",
        //                     "state": "AZ",
        //                     "zip": "85054",
        //                     "locLat": 33.6755749,
        //                     "locLng": -111.9665016,
        //                     "locSource": "20855 n 53rd st  phoenix,az 85054"
        //                 },
        //                 "deaNumber": "BS0422775"
        //             },
        //             {
        //                 "id": "4565137918787584",
        //                 "created": "2023-04-18T09:38:22.853+05:30",
        //                 "modified": "2023-04-18T09:38:22.853+05:30",
        //                 "firstName": "TAWNYA",
        //                 "lastName": "NUNEZ",
        //                 "sourceAddress": "3815 n brown ave  scottsdale,az 85251",
        //                 "location": {
        //                     "id": "6711384616206336",
        //                     "created": "2023-04-18T09:38:22.846+05:30",
        //                     "modified": "2023-04-18T09:38:22.854+05:30",
        //                     "line1": "3815 N Brown Ave",
        //                     "city": "Scottsdale",
        //                     "state": "AZ",
        //                     "zip": "85251",
        //                     "locLat": 33.4918372,
        //                     "locLng": -111.9242563,
        //                     "locSource": "3815 n brown ave  scottsdale,az 85251"
        //                 },
        //                 "deaNumber": "MH3849176"
        //             },
        //             {
        //                 "id": "6394725267406848",
        //                 "created": "2023-04-18T09:38:24.558+05:30",
        //                 "modified": "2023-04-18T09:38:24.558+05:30",
        //                 "firstName": "MARQUITTA",
        //                 "lastName": "BROCK",
        //                 "sourceAddress": "3806-3898 n brown ave  scottsdale,az 85251",
        //                 "location": {
        //                     "id": "5268825360564224",
        //                     "created": "2023-04-18T09:38:24.551+05:30",
        //                     "modified": "2023-04-18T09:38:24.559+05:30",
        //                     "line1": "3806 N Brown Ave",
        //                     "city": "Scottsdale",
        //                     "state": "AZ",
        //                     "zip": "85251",
        //                     "locLat": 33.4916008,
        //                     "locLng": -111.9247454,
        //                     "locSource": "3806-3898 n brown ave  scottsdale,az 85251"
        //                 },
        //                 "deaNumber": "MP1714460"
        //             },
        //             {
        //                 "id": "6113250290696192",
        //                 "created": "2023-04-18T09:38:24.873+05:30",
        //                 "modified": "2023-04-18T09:38:24.873+05:30",
        //                 "firstName": "MARQUITTA",
        //                 "lastName": "BROCK",
        //                 "sourceAddress": "3752 e indian school rd  phoenix,az 85018",
        //                 "location": {
        //                     "id": "4987350383853568",
        //                     "created": "2023-04-18T09:38:24.866+05:30",
        //                     "modified": "2023-04-18T09:38:24.874+05:30",
        //                     "line1": "3752 E Indian School Rd",
        //                     "city": "Phoenix",
        //                     "state": "AZ",
        //                     "zip": "85018",
        //                     "locLat": 33.4954195,
        //                     "locLng": -112.0000832,
        //                     "locSource": "3752 e indian school rd  phoenix,az 85018"
        //                 },
        //                 "deaNumber": "MP1714460"
        //             },
        //             {
        //                 "id": "5761406569807872",
        //                 "created": "2023-04-18T09:38:25.451+05:30",
        //                 "modified": "2023-04-18T09:38:25.451+05:30",
        //                 "firstName": "MADIE",
        //                 "lastName": "WHITNEY",
        //                 "sourceAddress": "3380 n scottsdale rd  scottsdale,az 85251",
        //                 "location": {
        //                     "id": "4635506662965248",
        //                     "created": "2023-04-18T09:38:25.444+05:30",
        //                     "modified": "2023-04-18T09:38:25.451+05:30",
        //                     "line1": "3380 N Scottsdale Rd",
        //                     "city": "Scottsdale",
        //                     "state": "AZ",
        //                     "zip": "85251",
        //                     "locLat": 33.48733199999999,
        //                     "locLng": -111.9270596,
        //                     "locSource": "3380 n scottsdale rd  scottsdale,az 85251"
        //                 },
        //                 "deaNumber": "BD7113234"
        //             },
        //             {
        //                 "id": "6042881546518528",
        //                 "created": "2023-04-18T09:38:26.047+05:30",
        //                 "modified": "2023-04-18T09:38:26.047+05:30",
        //                 "firstName": "MARNA",
        //                 "lastName": "WITT",
        //                 "sourceAddress": "751 e union hills dr  phoenix,az 85024",
        //                 "location": {
        //                     "id": "4916981639675904",
        //                     "created": "2023-04-18T09:38:26.038+05:30",
        //                     "modified": "2023-04-18T09:38:26.048+05:30",
        //                     "line1": "751 E Union Hills Dr",
        //                     "city": "Phoenix",
        //                     "state": "AZ",
        //                     "zip": "85024",
        //                     "locLat": 33.6540547,
        //                     "locLng": -112.063263,
        //                     "locSource": "751 e union hills dr  phoenix,az 85024"
        //                 },
        //                 "deaNumber": "BS0422775"
        //             },
        //             {
        //                 "id": "5831775313985536",
        //                 "created": "2023-04-18T09:38:24.255+05:30",
        //                 "modified": "2023-04-18T09:38:24.255+05:30",
        //                 "firstName": "MARNA",
        //                 "lastName": "WITT",
        //                 "sourceAddress": "765 e rosemonte dr  phoenix,az 85024",
        //                 "location": {
        //                     "id": "4705875407142912",
        //                     "created": "2023-04-18T09:38:24.246+05:30",
        //                     "modified": "2023-04-18T09:38:24.255+05:30",
        //                     "line1": "765 E Rosemonte Dr",
        //                     "city": "Phoenix",
        //                     "state": "AZ",
        //                     "zip": "85024",
        //                     "locLat": 33.6567816,
        //                     "locLng": -112.0631233,
        //                     "locSource": "765 e rosemonte dr  phoenix,az 85024"
        //                 },
        //                 "deaNumber": "BS0422775"
        //             },
        //             {
        //                 "id": "5972512802340864",
        //                 "created": "2023-04-18T09:38:23.605+05:30",
        //                 "modified": "2023-04-18T09:38:23.605+05:30",
        //                 "firstName": "MARQUITTA",
        //                 "lastName": "BROCK",
        //                 "sourceAddress": "3817 n brown ave  scottsdale,az 85251",
        //                 "location": {
        //                     "id": "4846612895498240",
        //                     "created": "2023-04-18T09:38:23.596+05:30",
        //                     "modified": "2023-04-18T09:38:23.605+05:30",
        //                     "line1": "3817 N Brown Ave",
        //                     "city": "Scottsdale",
        //                     "state": "AZ",
        //                     "zip": "85251",
        //                     "locLat": 33.4920038,
        //                     "locLng": -111.9242563,
        //                     "locSource": "3817 n brown ave  scottsdale,az 85251"
        //                 },
        //                 "deaNumber": "MP1714460"
        //             }
        //         ],
        //         "pharmacies": [
        //             {
        //                 "id": "5224844895453184",
        //                 "created": "2023-04-18T09:38:29.053+05:30",
        //                 "modified": "2023-04-18T09:38:29.053+05:30",
        //                 "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                 "sourceAddress": "8015 e indian school rd  scottsdale,az 85251",
        //                 "location": {
        //                     "id": "5787794848874496",
        //                     "created": "2023-04-18T09:38:29.032+05:30",
        //                     "modified": "2023-04-18T09:38:29.054+05:30",
        //                     "line1": "8015 E Indian School Rd",
        //                     "city": "Scottsdale",
        //                     "state": "AZ",
        //                     "zip": "85251",
        //                     "locLat": 33.4935565,
        //                     "locLng": -111.9081693,
        //                     "locSource": "8015 e indian school rd  scottsdale,az 85251"
        //                 },
        //                 "deaNumber": "AW9699818"
        //             },
        //             {
        //                 "id": "5585484709363712",
        //                 "created": "2023-04-18T09:38:22.545+05:30",
        //                 "modified": "2023-04-18T09:38:22.545+05:30",
        //                 "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                 "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                 "location": {
        //                     "id": "6148434662785024",
        //                     "created": "2023-04-18T09:38:22.535+05:30",
        //                     "modified": "2023-04-18T09:38:22.546+05:30",
        //                     "line1": "3402 N Central Ave",
        //                     "city": "Phoenix",
        //                     "state": "AZ",
        //                     "zip": "85012",
        //                     "locLat": 33.4879117,
        //                     "locLng": -112.0745667,
        //                     "locSource": "3402 n central ave  phoenix,az 85012"
        //                 },
        //                 "deaNumber": "AW0572518"
        //             },
        //             {
        //                 "id": "6183619034873856",
        //                 "created": "2023-04-18T09:38:27.240+05:30",
        //                 "modified": "2023-04-18T09:38:27.240+05:30",
        //                 "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                 "sourceAddress": "3605 e thomas rd  phoenix,az 85018",
        //                 "location": {
        //                     "id": "5057719128031232",
        //                     "created": "2023-04-18T09:38:27.232+05:30",
        //                     "modified": "2023-04-18T09:38:27.240+05:30",
        //                     "line1": "3605 E Thomas Rd",
        //                     "city": "Phoenix",
        //                     "state": "AZ",
        //                     "zip": "85018",
        //                     "locLat": 33.4799903,
        //                     "locLng": -112.0035764,
        //                     "locSource": "3605 e thomas rd  phoenix,az 85018"
        //                 },
        //                 "deaNumber": "AW0572481"
        //             },
        //             {
        //                 "id": "5928532337229824",
        //                 "created": "2023-04-18T09:38:28.414+05:30",
        //                 "modified": "2023-04-18T09:38:28.414+05:30",
        //                 "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                 "sourceAddress": "4111 n 24th street  phoenix,az 85016",
        //                 "location": {
        //                     "id": "4802632430387200",
        //                     "created": "2023-04-18T09:38:28.407+05:30",
        //                     "modified": "2023-04-18T09:38:28.415+05:30",
        //                     "line1": "4111 N 24th St",
        //                     "city": "Phoenix",
        //                     "state": "AZ",
        //                     "zip": "85016",
        //                     "locLat": 33.4953117,
        //                     "locLng": -112.0295014,
        //                     "locSource": "4111 n 24th street  phoenix,az 85016"
        //                 },
        //                 "deaNumber": "BW1377200"
        //             },
        //             {
        //                 "id": "6324356523229184",
        //                 "created": "2023-04-18T09:38:25.757+05:30",
        //                 "modified": "2023-04-18T09:38:25.757+05:30",
        //                 "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                 "sourceAddress": "5895 w. peoria avenue  glendale,az 85302",
        //                 "location": {
        //                     "id": "5198456616386560",
        //                     "created": "2023-04-18T09:38:25.748+05:30",
        //                     "modified": "2023-04-18T09:38:25.757+05:30",
        //                     "line1": "5895 W Peoria Ave",
        //                     "city": "Glendale",
        //                     "state": "AZ",
        //                     "zip": "85302",
        //                     "locLat": 33.5812761,
        //                     "locLng": -112.1854129,
        //                     "locSource": "5895 w. peoria avenue  glendale,az 85302"
        //                 },
        //                 "deaNumber": "BW5452228"
        //             }
        //         ],
        //         "prescriptions": [
        //             {
        //                 "id": "4715856911138816",
        //                 "created": "2024-01-26T08:36:48.994+05:30",
        //                 "modified": "2024-01-26T08:36:49.754+05:30",
        //                 "patientId": "6007697174429696",
        //                 "classification": "OPIOID",
        //                 "fillDate": "2024-01-05T10:30:00.000+05:30",
        //                 "fillDateString": "Jan 5",
        //                 "productName": "OXYCONTIN, 10 MG, TABLET, FILM COATED, EXTENDED RELEASE",
        //                 "displayName": "OXYCONTIN, 10 MG, TABLET, FILM COAT",
        //                 "strengthDesc": "10 MG",
        //                 "dosage": 10,
        //                 "prescribedQty": 60,
        //                 "prescribedLen": 30,
        //                 "dailyME": 30,
        //                 "writtenDate": "2023-12-23T10:30:00.000+05:30",
        //                 "writtenDateString": "Dec 23",
        //                 "nrCode": "R",
        //                 "refillCount": 0,
        //                 "rxNum": " ",
        //                 "isActive": true,
        //                 "isOurs": false,
        //                 "prescriber": {
        //                     "id": "5022534755942400",
        //                     "created": "2023-04-18T09:38:22.275+05:30",
        //                     "modified": "2023-04-18T09:38:22.275+05:30",
        //                     "firstName": "TAWNYA",
        //                     "lastName": "NUNEZ",
        //                     "sourceAddress": "6989 n hayden rd  scottsdale,az 85250",
        //                     "location": {
        //                         "id": "6429909639495680",
        //                         "created": "2023-04-18T09:38:22.264+05:30",
        //                         "modified": "2023-04-18T09:38:22.277+05:30",
        //                         "line1": "6989 N Hayden Rd",
        //                         "city": "Scottsdale",
        //                         "state": "AZ",
        //                         "zip": "85250",
        //                         "locLat": 33.5379566,
        //                         "locLng": -111.9060417,
        //                         "locSource": "6989 n hayden rd  scottsdale,az 85250"
        //                     },
        //                     "deaNumber": "MH3849176"
        //                 },
        //                 "pharmacy": {
        //                     "id": "5585484709363712",
        //                     "created": "2023-04-18T09:38:22.545+05:30",
        //                     "modified": "2023-04-18T09:38:22.545+05:30",
        //                     "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                     "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                     "location": {
        //                         "id": "6148434662785024",
        //                         "created": "2023-04-18T09:38:22.535+05:30",
        //                         "modified": "2023-04-18T09:38:22.546+05:30",
        //                         "line1": "3402 N Central Ave",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85012",
        //                         "locLat": 33.4879117,
        //                         "locLng": -112.0745667,
        //                         "locSource": "3402 n central ave  phoenix,az 85012"
        //                     },
        //                     "deaNumber": "AW0572518",
        //                     "isOurs": false
        //                 },
        //                 "ndcCode": "59011041010",
        //                 "patientName": "ULA PECK",
        //                 "patientDOB": "02/04/1939",
        //                 "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                 "isExpectedPatient": true,
        //                 "ndcOriginalSource": "59011041010",
        //                 "productCodeQualifier": "ND",
        //                 "ourPharmacy": false,
        //                 "ourProvider": false,
        //                 "startDate": "2024-01-05T10:30:00.000+05:30",
        //                 "endDate": "2024-02-03T10:30:00.000+05:30"
        //             },
        //             {
        //                 "id": "5841756817981440",
        //                 "created": "2024-01-26T08:36:48.994+05:30",
        //                 "modified": "2024-01-26T08:36:49.755+05:30",
        //                 "patientId": "6007697174429696",
        //                 "classification": "OPIOID",
        //                 "fillDate": "2024-01-05T10:30:00.000+05:30",
        //                 "fillDateString": "Jan 5",
        //                 "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                 "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                 "strengthDesc": "10 MG;325 MG",
        //                 "dosage": 10,
        //                 "prescribedQty": 105,
        //                 "prescribedLen": 30,
        //                 "dailyME": 53,
        //                 "writtenDate": "2023-12-23T10:30:00.000+05:30",
        //                 "writtenDateString": "Dec 23",
        //                 "nrCode": "R",
        //                 "refillCount": 0,
        //                 "rxNum": " ",
        //                 "isActive": true,
        //                 "isOurs": false,
        //                 "prescriber": {
        //                     "id": "4565137918787584",
        //                     "created": "2023-04-18T09:38:22.853+05:30",
        //                     "modified": "2023-04-18T09:38:22.853+05:30",
        //                     "firstName": "TAWNYA",
        //                     "lastName": "NUNEZ",
        //                     "sourceAddress": "3815 n brown ave  scottsdale,az 85251",
        //                     "location": {
        //                         "id": "6711384616206336",
        //                         "created": "2023-04-18T09:38:22.846+05:30",
        //                         "modified": "2023-04-18T09:38:22.854+05:30",
        //                         "line1": "3815 N Brown Ave",
        //                         "city": "Scottsdale",
        //                         "state": "AZ",
        //                         "zip": "85251",
        //                         "locLat": 33.4918372,
        //                         "locLng": -111.9242563,
        //                         "locSource": "3815 n brown ave  scottsdale,az 85251"
        //                     },
        //                     "deaNumber": "MH3849176"
        //                 },
        //                 "pharmacy": {
        //                     "id": "5585484709363712",
        //                     "created": "2023-04-18T09:38:22.545+05:30",
        //                     "modified": "2023-04-18T09:38:22.545+05:30",
        //                     "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                     "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                     "location": {
        //                         "id": "6148434662785024",
        //                         "created": "2023-04-18T09:38:22.535+05:30",
        //                         "modified": "2023-04-18T09:38:22.546+05:30",
        //                         "line1": "3402 N Central Ave",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85012",
        //                         "locLat": 33.4879117,
        //                         "locLng": -112.0745667,
        //                         "locSource": "3402 n central ave  phoenix,az 85012"
        //                     },
        //                     "deaNumber": "AW0572518",
        //                     "isOurs": false
        //                 },
        //                 "ndcCode": "00228298311",
        //                 "patientName": "ULA PECK",
        //                 "patientDOB": "02/04/1939",
        //                 "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                 "isExpectedPatient": true,
        //                 "ndcOriginalSource": "00228298311",
        //                 "productCodeQualifier": "ND",
        //                 "ourPharmacy": false,
        //                 "ourProvider": false,
        //                 "startDate": "2024-01-05T10:30:00.000+05:30",
        //                 "endDate": "2024-02-03T10:30:00.000+05:30"
        //             },
        //             {
        //                 "id": "5278806864560128",
        //                 "created": "2024-01-26T08:36:48.994+05:30",
        //                 "modified": "2024-01-26T08:36:49.756+05:30",
        //                 "patientId": "6007697174429696",
        //                 "classification": "OPIOID",
        //                 "fillDate": "2023-12-30T10:30:00.000+05:30",
        //                 "fillDateString": "Dec 30",
        //                 "productName": "OXYCODONE HYDROCHLORIDE, 5 MG, TABLET",
        //                 "displayName": "OXYCODONE HYDROCHLORIDE, 5 MG, TABL",
        //                 "strengthDesc": "5 MG",
        //                 "dosage": 5,
        //                 "prescribedQty": 60,
        //                 "prescribedLen": 2,
        //                 "dailyME": 225,
        //                 "writtenDate": "2023-12-26T10:30:00.000+05:30",
        //                 "writtenDateString": "Dec 26",
        //                 "nrCode": "R",
        //                 "refillCount": 0,
        //                 "rxNum": " ",
        //                 "isActive": false,
        //                 "isOurs": false,
        //                 "prescriber": {
        //                     "id": "5128087872208896",
        //                     "created": "2023-04-18T09:38:23.147+05:30",
        //                     "modified": "2023-04-18T09:38:23.147+05:30",
        //                     "firstName": "",
        //                     "lastName": "",
        //                     "sourceAddress": "5022 n 17th ave  phoenix,az 85015",
        //                     "location": {
        //                         "id": "5691037825630208",
        //                         "created": "2023-04-18T09:38:23.141+05:30",
        //                         "modified": "2023-04-18T09:38:23.148+05:30",
        //                         "line1": "5022 N 17th Ave",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85015",
        //                         "locLat": 33.5106346,
        //                         "locLng": -112.0963149,
        //                         "locSource": "5022 n 17th ave  phoenix,az 85015"
        //                     },
        //                     "deaNumber": "BC7786140"
        //                 },
        //                 "pharmacy": {
        //                     "id": "5585484709363712",
        //                     "created": "2023-04-18T09:38:22.545+05:30",
        //                     "modified": "2023-04-18T09:38:22.545+05:30",
        //                     "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                     "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                     "location": {
        //                         "id": "6148434662785024",
        //                         "created": "2023-04-18T09:38:22.535+05:30",
        //                         "modified": "2023-04-18T09:38:22.546+05:30",
        //                         "line1": "3402 N Central Ave",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85012",
        //                         "locLat": 33.4879117,
        //                         "locLng": -112.0745667,
        //                         "locSource": "3402 n central ave  phoenix,az 85012"
        //                     },
        //                     "deaNumber": "AW0572518",
        //                     "isOurs": false
        //                 },
        //                 "ndcCode": "00406055201",
        //                 "patientName": "ULA PECK",
        //                 "patientDOB": "02/04/1939",
        //                 "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                 "isExpectedPatient": true,
        //                 "ndcOriginalSource": "00406055201",
        //                 "productCodeQualifier": "ND",
        //                 "ourPharmacy": false,
        //                 "ourProvider": false,
        //                 "startDate": "2023-12-30T10:30:00.000+05:30",
        //                 "endDate": "2023-12-31T10:30:00.000+05:30"
        //             },
        //             {
        //                 "id": "6404706771402752",
        //                 "created": "2024-01-26T08:36:48.995+05:30",
        //                 "modified": "2024-01-26T08:36:49.757+05:30",
        //                 "patientId": "6007697174429696",
        //                 "classification": "OPIOID",
        //                 "fillDate": "2023-12-04T10:30:00.000+05:30",
        //                 "fillDateString": "Dec 4",
        //                 "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                 "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                 "strengthDesc": "10 MG;325 MG",
        //                 "dosage": 10,
        //                 "prescribedQty": 105,
        //                 "prescribedLen": 30,
        //                 "dailyME": 53,
        //                 "writtenDate": "2023-12-03T10:30:00.000+05:30",
        //                 "writtenDateString": "Dec 3",
        //                 "nrCode": "R",
        //                 "refillCount": 0,
        //                 "rxNum": " ",
        //                 "isActive": false,
        //                 "isOurs": false,
        //                 "prescriber": {
        //                     "id": "5972512802340864",
        //                     "created": "2023-04-18T09:38:23.605+05:30",
        //                     "modified": "2023-04-18T09:38:23.605+05:30",
        //                     "firstName": "MARQUITTA",
        //                     "lastName": "BROCK",
        //                     "sourceAddress": "3817 n brown ave  scottsdale,az 85251",
        //                     "location": {
        //                         "id": "4846612895498240",
        //                         "created": "2023-04-18T09:38:23.596+05:30",
        //                         "modified": "2023-04-18T09:38:23.605+05:30",
        //                         "line1": "3817 N Brown Ave",
        //                         "city": "Scottsdale",
        //                         "state": "AZ",
        //                         "zip": "85251",
        //                         "locLat": 33.4920038,
        //                         "locLng": -111.9242563,
        //                         "locSource": "3817 n brown ave  scottsdale,az 85251"
        //                     },
        //                     "deaNumber": "MP1714460"
        //                 },
        //                 "pharmacy": {
        //                     "id": "5585484709363712",
        //                     "created": "2023-04-18T09:38:22.545+05:30",
        //                     "modified": "2023-04-18T09:38:22.545+05:30",
        //                     "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                     "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                     "location": {
        //                         "id": "6148434662785024",
        //                         "created": "2023-04-18T09:38:22.535+05:30",
        //                         "modified": "2023-04-18T09:38:22.546+05:30",
        //                         "line1": "3402 N Central Ave",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85012",
        //                         "locLat": 33.4879117,
        //                         "locLng": -112.0745667,
        //                         "locSource": "3402 n central ave  phoenix,az 85012"
        //                     },
        //                     "deaNumber": "AW0572518",
        //                     "isOurs": false
        //                 },
        //                 "ndcCode": "00228298311",
        //                 "patientName": "ULA PECK",
        //                 "patientDOB": "02/04/1939",
        //                 "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                 "isExpectedPatient": true,
        //                 "ndcOriginalSource": "00228298311",
        //                 "productCodeQualifier": "ND",
        //                 "ourPharmacy": false,
        //                 "ourProvider": false,
        //                 "startDate": "2023-12-04T10:30:00.000+05:30",
        //                 "endDate": "2024-01-02T10:30:00.000+05:30"
        //             },
        //             {
        //                 "id": "4997331887849472",
        //                 "created": "2024-01-26T08:36:48.995+05:30",
        //                 "modified": "2024-01-26T08:36:49.758+05:30",
        //                 "patientId": "6007697174429696",
        //                 "classification": "STIMULANT",
        //                 "fillDate": "2023-11-15T10:30:00.000+05:30",
        //                 "fillDateString": "Nov 15",
        //                 "productName": "VYVANSE, 50 MG, CAPSULE",
        //                 "displayName": "VYVANSE, 50 MG, CAPSULE",
        //                 "strengthDesc": "50 MG",
        //                 "dosage": 50,
        //                 "prescribedQty": 30,
        //                 "prescribedLen": 30,
        //                 "dailyME": 0,
        //                 "writtenDate": "2023-09-22T10:30:00.000+05:30",
        //                 "writtenDateString": "Sep 22",
        //                 "nrCode": "R",
        //                 "refillCount": 0,
        //                 "rxNum": " ",
        //                 "isActive": false,
        //                 "isOurs": false,
        //                 "prescriber": {
        //                     "id": "6535462755762176",
        //                     "created": "2023-04-18T09:38:23.938+05:30",
        //                     "modified": "2023-04-18T09:38:23.938+05:30",
        //                     "firstName": "MARNA",
        //                     "lastName": "WITT",
        //                     "sourceAddress": "718 e union hills dr  phoenix,az 85024",
        //                     "location": {
        //                         "id": "5409562848919552",
        //                         "created": "2023-04-18T09:38:23.930+05:30",
        //                         "modified": "2023-04-18T09:38:23.939+05:30",
        //                         "line1": "718 E Union Hills Dr",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85024",
        //                         "locLat": 33.6561533,
        //                         "locLng": -112.0637055,
        //                         "locSource": "718 e union hills dr  phoenix,az 85024"
        //                     },
        //                     "deaNumber": "BS0422775"
        //                 },
        //                 "pharmacy": {
        //                     "id": "5585484709363712",
        //                     "created": "2023-04-18T09:38:22.545+05:30",
        //                     "modified": "2023-04-18T09:38:22.545+05:30",
        //                     "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                     "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                     "location": {
        //                         "id": "6148434662785024",
        //                         "created": "2023-04-18T09:38:22.535+05:30",
        //                         "modified": "2023-04-18T09:38:22.546+05:30",
        //                         "line1": "3402 N Central Ave",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85012",
        //                         "locLat": 33.4879117,
        //                         "locLng": -112.0745667,
        //                         "locSource": "3402 n central ave  phoenix,az 85012"
        //                     },
        //                     "deaNumber": "AW0572518",
        //                     "isOurs": false
        //                 },
        //                 "ndcCode": "59417010510",
        //                 "patientName": "ULA PECK",
        //                 "patientDOB": "02/04/1939",
        //                 "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                 "isExpectedPatient": true,
        //                 "ndcOriginalSource": "59417010510",
        //                 "productCodeQualifier": "ND",
        //                 "ourPharmacy": false,
        //                 "ourProvider": false,
        //                 "startDate": "2023-11-15T10:30:00.000+05:30",
        //                 "endDate": "2023-12-14T10:30:00.000+05:30"
        //             },
        //             {
        //                 "id": "6123231794692096",
        //                 "created": "2024-01-26T08:36:48.996+05:30",
        //                 "modified": "2024-01-26T08:36:49.759+05:30",
        //                 "patientId": "6007697174429696",
        //                 "classification": "STIMULANT",
        //                 "fillDate": "2023-11-14T10:30:00.000+05:30",
        //                 "fillDateString": "Nov 14",
        //                 "productName": "DEXTROAMPHETAMINE SACCHARATE, AMPHETAMINE ASPARTATE, DEXTROAMPHETAMINE SULFATE AND AMPHETAMINE SULFA, 5 M",
        //                 "displayName": "DEXTROAMPHETAMINE SACCHARATE, AMPHE",
        //                 "strengthDesc": "5 MG;5 MG;5 MG;5 MG",
        //                 "dosage": 5,
        //                 "prescribedQty": 30,
        //                 "prescribedLen": 30,
        //                 "dailyME": 0,
        //                 "writtenDate": "2023-09-22T10:30:00.000+05:30",
        //                 "writtenDateString": "Sep 22",
        //                 "nrCode": "R",
        //                 "refillCount": 0,
        //                 "rxNum": " ",
        //                 "isActive": false,
        //                 "isOurs": false,
        //                 "prescriber": {
        //                     "id": "5831775313985536",
        //                     "created": "2023-04-18T09:38:24.255+05:30",
        //                     "modified": "2023-04-18T09:38:24.255+05:30",
        //                     "firstName": "MARNA",
        //                     "lastName": "WITT",
        //                     "sourceAddress": "765 e rosemonte dr  phoenix,az 85024",
        //                     "location": {
        //                         "id": "4705875407142912",
        //                         "created": "2023-04-18T09:38:24.246+05:30",
        //                         "modified": "2023-04-18T09:38:24.255+05:30",
        //                         "line1": "765 E Rosemonte Dr",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85024",
        //                         "locLat": 33.6567816,
        //                         "locLng": -112.0631233,
        //                         "locSource": "765 e rosemonte dr  phoenix,az 85024"
        //                     },
        //                     "deaNumber": "BS0422775"
        //                 },
        //                 "pharmacy": {
        //                     "id": "5585484709363712",
        //                     "created": "2023-04-18T09:38:22.545+05:30",
        //                     "modified": "2023-04-18T09:38:22.545+05:30",
        //                     "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                     "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                     "location": {
        //                         "id": "6148434662785024",
        //                         "created": "2023-04-18T09:38:22.535+05:30",
        //                         "modified": "2023-04-18T09:38:22.546+05:30",
        //                         "line1": "3402 N Central Ave",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85012",
        //                         "locLat": 33.4879117,
        //                         "locLng": -112.0745667,
        //                         "locSource": "3402 n central ave  phoenix,az 85012"
        //                     },
        //                     "deaNumber": "AW0572518",
        //                     "isOurs": false
        //                 },
        //                 "ndcCode": "00555097302",
        //                 "patientName": "ULA PECK",
        //                 "patientDOB": "02/04/1939",
        //                 "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                 "isExpectedPatient": true,
        //                 "ndcOriginalSource": "00555097302",
        //                 "productCodeQualifier": "ND",
        //                 "ourPharmacy": false,
        //                 "ourProvider": false,
        //                 "startDate": "2023-11-14T10:30:00.000+05:30",
        //                 "endDate": "2023-12-13T10:30:00.000+05:30"
        //             },
        //             {
        //                 "id": "5560281841270784",
        //                 "created": "2024-01-26T08:36:48.996+05:30",
        //                 "modified": "2024-01-26T08:36:49.759+05:30",
        //                 "patientId": "6007697174429696",
        //                 "classification": "OPIOID",
        //                 "fillDate": "2023-11-04T10:30:00.000+05:30",
        //                 "fillDateString": "Nov 4",
        //                 "productName": "OXYCONTIN, 10 MG, TABLET, FILM COATED, EXTENDED RELEASE",
        //                 "displayName": "OXYCONTIN, 10 MG, TABLET, FILM COAT",
        //                 "strengthDesc": "10 MG",
        //                 "dosage": 10,
        //                 "prescribedQty": 60,
        //                 "prescribedLen": 30,
        //                 "dailyME": 30,
        //                 "writtenDate": "2023-10-29T10:30:00.000+05:30",
        //                 "writtenDateString": "Oct 29",
        //                 "nrCode": "R",
        //                 "refillCount": 0,
        //                 "rxNum": " ",
        //                 "isActive": false,
        //                 "isOurs": false,
        //                 "prescriber": {
        //                     "id": "6394725267406848",
        //                     "created": "2023-04-18T09:38:24.558+05:30",
        //                     "modified": "2023-04-18T09:38:24.558+05:30",
        //                     "firstName": "MARQUITTA",
        //                     "lastName": "BROCK",
        //                     "sourceAddress": "3806-3898 n brown ave  scottsdale,az 85251",
        //                     "location": {
        //                         "id": "5268825360564224",
        //                         "created": "2023-04-18T09:38:24.551+05:30",
        //                         "modified": "2023-04-18T09:38:24.559+05:30",
        //                         "line1": "3806 N Brown Ave",
        //                         "city": "Scottsdale",
        //                         "state": "AZ",
        //                         "zip": "85251",
        //                         "locLat": 33.4916008,
        //                         "locLng": -111.9247454,
        //                         "locSource": "3806-3898 n brown ave  scottsdale,az 85251"
        //                     },
        //                     "deaNumber": "MP1714460"
        //                 },
        //                 "pharmacy": {
        //                     "id": "5585484709363712",
        //                     "created": "2023-04-18T09:38:22.545+05:30",
        //                     "modified": "2023-04-18T09:38:22.545+05:30",
        //                     "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                     "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                     "location": {
        //                         "id": "6148434662785024",
        //                         "created": "2023-04-18T09:38:22.535+05:30",
        //                         "modified": "2023-04-18T09:38:22.546+05:30",
        //                         "line1": "3402 N Central Ave",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85012",
        //                         "locLat": 33.4879117,
        //                         "locLng": -112.0745667,
        //                         "locSource": "3402 n central ave  phoenix,az 85012"
        //                     },
        //                     "deaNumber": "AW0572518",
        //                     "isOurs": false
        //                 },
        //                 "ndcCode": "59011041010",
        //                 "patientName": "ULA PECK",
        //                 "patientDOB": "02/04/1939",
        //                 "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                 "isExpectedPatient": true,
        //                 "ndcOriginalSource": "59011041010",
        //                 "productCodeQualifier": "ND",
        //                 "ourPharmacy": false,
        //                 "ourProvider": false,
        //                 "startDate": "2023-11-04T10:30:00.000+05:30",
        //                 "endDate": "2023-12-03T10:30:00.000+05:30"
        //             },
        //             {
        //                 "id": "6686181748113408",
        //                 "created": "2024-01-26T08:36:48.996+05:30",
        //                 "modified": "2024-01-26T08:36:49.760+05:30",
        //                 "patientId": "6007697174429696",
        //                 "classification": "OPIOID",
        //                 "fillDate": "2023-11-04T10:30:00.000+05:30",
        //                 "fillDateString": "Nov 4",
        //                 "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                 "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                 "strengthDesc": "10 MG;325 MG",
        //                 "dosage": 10,
        //                 "prescribedQty": 105,
        //                 "prescribedLen": 30,
        //                 "dailyME": 53,
        //                 "writtenDate": "2023-10-29T10:30:00.000+05:30",
        //                 "writtenDateString": "Oct 29",
        //                 "nrCode": "R",
        //                 "refillCount": 0,
        //                 "rxNum": " ",
        //                 "isActive": false,
        //                 "isOurs": false,
        //                 "prescriber": {
        //                     "id": "6113250290696192",
        //                     "created": "2023-04-18T09:38:24.873+05:30",
        //                     "modified": "2023-04-18T09:38:24.873+05:30",
        //                     "firstName": "MARQUITTA",
        //                     "lastName": "BROCK",
        //                     "sourceAddress": "3752 e indian school rd  phoenix,az 85018",
        //                     "location": {
        //                         "id": "4987350383853568",
        //                         "created": "2023-04-18T09:38:24.866+05:30",
        //                         "modified": "2023-04-18T09:38:24.874+05:30",
        //                         "line1": "3752 E Indian School Rd",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85018",
        //                         "locLat": 33.4954195,
        //                         "locLng": -112.0000832,
        //                         "locSource": "3752 e indian school rd  phoenix,az 85018"
        //                     },
        //                     "deaNumber": "MP1714460"
        //                 },
        //                 "pharmacy": {
        //                     "id": "5585484709363712",
        //                     "created": "2023-04-18T09:38:22.545+05:30",
        //                     "modified": "2023-04-18T09:38:22.545+05:30",
        //                     "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                     "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                     "location": {
        //                         "id": "6148434662785024",
        //                         "created": "2023-04-18T09:38:22.535+05:30",
        //                         "modified": "2023-04-18T09:38:22.546+05:30",
        //                         "line1": "3402 N Central Ave",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85012",
        //                         "locLat": 33.4879117,
        //                         "locLng": -112.0745667,
        //                         "locSource": "3402 n central ave  phoenix,az 85012"
        //                     },
        //                     "deaNumber": "AW0572518",
        //                     "isOurs": false
        //                 },
        //                 "ndcCode": "00228298311",
        //                 "patientName": "ULA PECK",
        //                 "patientDOB": "02/04/1939",
        //                 "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                 "isExpectedPatient": true,
        //                 "ndcOriginalSource": "00228298311",
        //                 "productCodeQualifier": "ND",
        //                 "ourPharmacy": false,
        //                 "ourProvider": false,
        //                 "startDate": "2023-11-04T10:30:00.000+05:30",
        //                 "endDate": "2023-12-03T10:30:00.000+05:30"
        //             },
        //             {
        //                 "id": "4539935050694656",
        //                 "created": "2024-01-26T08:36:48.997+05:30",
        //                 "modified": "2024-01-26T08:36:49.761+05:30",
        //                 "patientId": "6007697174429696",
        //                 "classification": "OPIOID",
        //                 "fillDate": "2023-10-05T10:30:00.000+05:30",
        //                 "fillDateString": "Oct 5",
        //                 "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                 "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                 "strengthDesc": "10 MG;325 MG",
        //                 "dosage": 10,
        //                 "prescribedQty": 105,
        //                 "prescribedLen": 30,
        //                 "dailyME": 53,
        //                 "writtenDate": "2023-10-01T10:30:00.000+05:30",
        //                 "writtenDateString": "Oct 1",
        //                 "nrCode": "R",
        //                 "refillCount": 0,
        //                 "rxNum": " ",
        //                 "isActive": false,
        //                 "isOurs": false,
        //                 "prescriber": {
        //                     "id": "6676200244117504",
        //                     "created": "2023-04-18T09:38:25.169+05:30",
        //                     "modified": "2023-04-18T09:38:25.169+05:30",
        //                     "firstName": "MARQUITTA",
        //                     "lastName": "BROCK",
        //                     "sourceAddress": "3749-3799 e indian school rd  phoenix,az 85018",
        //                     "location": {
        //                         "id": "5550300337274880",
        //                         "created": "2023-04-18T09:38:25.162+05:30",
        //                         "modified": "2023-04-18T09:38:25.169+05:30",
        //                         "line1": "3749 E Indian School Rd",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85018",
        //                         "locLat": 33.49479520000001,
        //                         "locLng": -112.0001152,
        //                         "locSource": "3749-3799 e indian school rd  phoenix,az 85018"
        //                     },
        //                     "deaNumber": "MP1714460"
        //                 },
        //                 "pharmacy": {
        //                     "id": "5585484709363712",
        //                     "created": "2023-04-18T09:38:22.545+05:30",
        //                     "modified": "2023-04-18T09:38:22.545+05:30",
        //                     "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                     "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                     "location": {
        //                         "id": "6148434662785024",
        //                         "created": "2023-04-18T09:38:22.535+05:30",
        //                         "modified": "2023-04-18T09:38:22.546+05:30",
        //                         "line1": "3402 N Central Ave",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85012",
        //                         "locLat": 33.4879117,
        //                         "locLng": -112.0745667,
        //                         "locSource": "3402 n central ave  phoenix,az 85012"
        //                     },
        //                     "deaNumber": "AW0572518",
        //                     "isOurs": false
        //                 },
        //                 "ndcCode": "00228298311",
        //                 "patientName": "ULA PECK",
        //                 "patientDOB": "02/04/1939",
        //                 "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                 "isExpectedPatient": true,
        //                 "ndcOriginalSource": "00228298311",
        //                 "productCodeQualifier": "ND",
        //                 "ourPharmacy": false,
        //                 "ourProvider": false,
        //                 "startDate": "2023-10-05T10:30:00.000+05:30",
        //                 "endDate": "2023-11-03T10:30:00.000+05:30"
        //             },
        //             {
        //                 "id": "5665834957537280",
        //                 "created": "2024-01-26T08:36:48.997+05:30",
        //                 "modified": "2024-01-26T08:36:49.761+05:30",
        //                 "patientId": "6007697174429696",
        //                 "classification": "OPIOID",
        //                 "fillDate": "2023-10-01T10:30:00.000+05:30",
        //                 "fillDateString": "Oct 1",
        //                 "productName": "OPANA ER, 10 MG, TABLET, EXTENDED RELEASE",
        //                 "displayName": "OPANA ER, 10 MG, TABLET, EXTENDED R",
        //                 "strengthDesc": "10 MG",
        //                 "dosage": 10,
        //                 "prescribedQty": 60,
        //                 "prescribedLen": 30,
        //                 "dailyME": 60,
        //                 "writtenDate": "2023-10-01T10:30:00.000+05:30",
        //                 "writtenDateString": "Oct 1",
        //                 "nrCode": "R",
        //                 "refillCount": 0,
        //                 "rxNum": " ",
        //                 "isActive": false,
        //                 "isOurs": false,
        //                 "prescriber": {
        //                     "id": "5761406569807872",
        //                     "created": "2023-04-18T09:38:25.451+05:30",
        //                     "modified": "2023-04-18T09:38:25.451+05:30",
        //                     "firstName": "MADIE",
        //                     "lastName": "WHITNEY",
        //                     "sourceAddress": "3380 n scottsdale rd  scottsdale,az 85251",
        //                     "location": {
        //                         "id": "4635506662965248",
        //                         "created": "2023-04-18T09:38:25.444+05:30",
        //                         "modified": "2023-04-18T09:38:25.451+05:30",
        //                         "line1": "3380 N Scottsdale Rd",
        //                         "city": "Scottsdale",
        //                         "state": "AZ",
        //                         "zip": "85251",
        //                         "locLat": 33.48733199999999,
        //                         "locLng": -111.9270596,
        //                         "locSource": "3380 n scottsdale rd  scottsdale,az 85251"
        //                     },
        //                     "deaNumber": "BD7113234"
        //                 },
        //                 "pharmacy": {
        //                     "id": "6324356523229184",
        //                     "created": "2023-04-18T09:38:25.757+05:30",
        //                     "modified": "2023-04-18T09:38:25.757+05:30",
        //                     "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                     "sourceAddress": "5895 w. peoria avenue  glendale,az 85302",
        //                     "location": {
        //                         "id": "5198456616386560",
        //                         "created": "2023-04-18T09:38:25.748+05:30",
        //                         "modified": "2023-04-18T09:38:25.757+05:30",
        //                         "line1": "5895 W Peoria Ave",
        //                         "city": "Glendale",
        //                         "state": "AZ",
        //                         "zip": "85302",
        //                         "locLat": 33.5812761,
        //                         "locLng": -112.1854129,
        //                         "locSource": "5895 w. peoria avenue  glendale,az 85302"
        //                     },
        //                     "deaNumber": "BW5452228",
        //                     "isOurs": false
        //                 },
        //                 "ndcCode": "63481081460",
        //                 "patientName": "ULA PECK",
        //                 "patientDOB": "02/04/1939",
        //                 "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                 "isExpectedPatient": true,
        //                 "ndcOriginalSource": "63481081460",
        //                 "productCodeQualifier": "ND",
        //                 "ourPharmacy": false,
        //                 "ourProvider": false,
        //                 "startDate": "2023-10-01T10:30:00.000+05:30",
        //                 "endDate": "2023-10-30T10:30:00.000+05:30"
        //             },
        //             {
        //                 "id": "5102885004115968",
        //                 "created": "2024-01-26T08:36:48.997+05:30",
        //                 "modified": "2024-01-26T08:36:49.762+05:30",
        //                 "patientId": "6007697174429696",
        //                 "classification": "STIMULANT",
        //                 "fillDate": "2023-09-26T10:30:00.000+05:30",
        //                 "fillDateString": "Sep 26",
        //                 "productName": "VYVANSE, 50 MG, CAPSULE",
        //                 "displayName": "VYVANSE, 50 MG, CAPSULE",
        //                 "strengthDesc": "50 MG",
        //                 "dosage": 50,
        //                 "prescribedQty": 30,
        //                 "prescribedLen": 30,
        //                 "dailyME": 0,
        //                 "writtenDate": "2023-09-22T10:30:00.000+05:30",
        //                 "writtenDateString": "Sep 22",
        //                 "nrCode": "R",
        //                 "refillCount": 0,
        //                 "rxNum": " ",
        //                 "isActive": false,
        //                 "isOurs": false,
        //                 "prescriber": {
        //                     "id": "6042881546518528",
        //                     "created": "2023-04-18T09:38:26.047+05:30",
        //                     "modified": "2023-04-18T09:38:26.047+05:30",
        //                     "firstName": "MARNA",
        //                     "lastName": "WITT",
        //                     "sourceAddress": "751 e union hills dr  phoenix,az 85024",
        //                     "location": {
        //                         "id": "4916981639675904",
        //                         "created": "2023-04-18T09:38:26.038+05:30",
        //                         "modified": "2023-04-18T09:38:26.048+05:30",
        //                         "line1": "751 E Union Hills Dr",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85024",
        //                         "locLat": 33.6540547,
        //                         "locLng": -112.063263,
        //                         "locSource": "751 e union hills dr  phoenix,az 85024"
        //                     },
        //                     "deaNumber": "BS0422775"
        //                 },
        //                 "pharmacy": {
        //                     "id": "5585484709363712",
        //                     "created": "2023-04-18T09:38:22.545+05:30",
        //                     "modified": "2023-04-18T09:38:22.545+05:30",
        //                     "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                     "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                     "location": {
        //                         "id": "6148434662785024",
        //                         "created": "2023-04-18T09:38:22.535+05:30",
        //                         "modified": "2023-04-18T09:38:22.546+05:30",
        //                         "line1": "3402 N Central Ave",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85012",
        //                         "locLat": 33.4879117,
        //                         "locLng": -112.0745667,
        //                         "locSource": "3402 n central ave  phoenix,az 85012"
        //                     },
        //                     "deaNumber": "AW0572518",
        //                     "isOurs": false
        //                 },
        //                 "ndcCode": "59417010510",
        //                 "patientName": "ULA PECK",
        //                 "patientDOB": "02/04/1939",
        //                 "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                 "isExpectedPatient": true,
        //                 "ndcOriginalSource": "59417010510",
        //                 "productCodeQualifier": "ND",
        //                 "ourPharmacy": false,
        //                 "ourProvider": false,
        //                 "startDate": "2023-09-26T10:30:00.000+05:30",
        //                 "endDate": "2023-10-25T10:30:00.000+05:30"
        //             },
        //             {
        //                 "id": "6228784910958592",
        //                 "created": "2024-01-26T08:36:48.997+05:30",
        //                 "modified": "2024-01-26T08:36:49.763+05:30",
        //                 "patientId": "6007697174429696",
        //                 "classification": "STIMULANT",
        //                 "fillDate": "2023-09-26T10:30:00.000+05:30",
        //                 "fillDateString": "Sep 26",
        //                 "productName": "DEXTROAMPHETAMINE SACCHARATE, AMPHETAMINE ASPARTATE, DEXTROAMPHETAMINE SULFATE AND AMPHETAMINE SULFA, 5 M",
        //                 "displayName": "DEXTROAMPHETAMINE SACCHARATE, AMPHE",
        //                 "strengthDesc": "5 MG;5 MG;5 MG;5 MG",
        //                 "dosage": 5,
        //                 "prescribedQty": 30,
        //                 "prescribedLen": 30,
        //                 "dailyME": 0,
        //                 "writtenDate": "2023-09-22T10:30:00.000+05:30",
        //                 "writtenDateString": "Sep 22",
        //                 "nrCode": "R",
        //                 "refillCount": 0,
        //                 "rxNum": " ",
        //                 "isActive": false,
        //                 "isOurs": false,
        //                 "prescriber": {
        //                     "id": "6605831499939840",
        //                     "created": "2023-04-18T09:38:26.369+05:30",
        //                     "modified": "2023-04-18T09:38:26.369+05:30",
        //                     "firstName": "MARNA",
        //                     "lastName": "WITT",
        //                     "sourceAddress": "2602 w deer valley rd  phoenix,az 85027",
        //                     "location": {
        //                         "id": "5479931593097216",
        //                         "created": "2023-04-18T09:38:26.361+05:30",
        //                         "modified": "2023-04-18T09:38:26.369+05:30",
        //                         "line1": "2602 W Deer Valley Rd",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85027",
        //                         "locLat": 33.6842607,
        //                         "locLng": -112.1163379,
        //                         "locSource": "2602 w deer valley rd  phoenix,az 85027"
        //                     },
        //                     "deaNumber": "BS0422775"
        //                 },
        //                 "pharmacy": {
        //                     "id": "5585484709363712",
        //                     "created": "2023-04-18T09:38:22.545+05:30",
        //                     "modified": "2023-04-18T09:38:22.545+05:30",
        //                     "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                     "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                     "location": {
        //                         "id": "6148434662785024",
        //                         "created": "2023-04-18T09:38:22.535+05:30",
        //                         "modified": "2023-04-18T09:38:22.546+05:30",
        //                         "line1": "3402 N Central Ave",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85012",
        //                         "locLat": 33.4879117,
        //                         "locLng": -112.0745667,
        //                         "locSource": "3402 n central ave  phoenix,az 85012"
        //                     },
        //                     "deaNumber": "AW0572518",
        //                     "isOurs": false
        //                 },
        //                 "ndcCode": "00555097302",
        //                 "patientName": "ULA PECK",
        //                 "patientDOB": "02/04/1939",
        //                 "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                 "isExpectedPatient": true,
        //                 "ndcOriginalSource": "00555097302",
        //                 "productCodeQualifier": "ND",
        //                 "ourPharmacy": false,
        //                 "ourProvider": false,
        //                 "startDate": "2023-09-26T10:30:00.000+05:30",
        //                 "endDate": "2023-10-25T10:30:00.000+05:30"
        //             },
        //             {
        //                 "id": "4821410027405312",
        //                 "created": "2024-01-26T08:36:48.998+05:30",
        //                 "modified": "2024-01-26T08:36:49.764+05:30",
        //                 "patientId": "6007697174429696",
        //                 "classification": "OPIOID",
        //                 "fillDate": "2023-09-05T10:30:00.000+05:30",
        //                 "fillDateString": "Sep 5",
        //                 "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                 "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                 "strengthDesc": "10 MG;325 MG",
        //                 "dosage": 10,
        //                 "prescribedQty": 105,
        //                 "prescribedLen": 26,
        //                 "dailyME": 61,
        //                 "writtenDate": "2023-09-05T10:30:00.000+05:30",
        //                 "writtenDateString": "Sep 5",
        //                 "nrCode": "R",
        //                 "refillCount": 0,
        //                 "rxNum": " ",
        //                 "isActive": false,
        //                 "isOurs": false,
        //                 "prescriber": {
        //                     "id": "5902144058163200",
        //                     "created": "2023-04-18T09:38:26.654+05:30",
        //                     "modified": "2023-04-18T09:38:26.654+05:30",
        //                     "firstName": "JESUS",
        //                     "lastName": "GOFF",
        //                     "sourceAddress": "21816 n 26th ave  phoenix,az 85027",
        //                     "location": {
        //                         "id": "4776244151320576",
        //                         "created": "2023-04-18T09:38:26.646+05:30",
        //                         "modified": "2023-04-18T09:38:26.655+05:30",
        //                         "line1": "21816 N 26th Ave",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85027",
        //                         "locLat": 33.684586,
        //                         "locLng": -112.116367,
        //                         "locSource": "21816 n 26th ave  phoenix,az 85027"
        //                     },
        //                     "deaNumber": "MH3182261"
        //                 },
        //                 "pharmacy": {
        //                     "id": "5585484709363712",
        //                     "created": "2023-04-18T09:38:22.545+05:30",
        //                     "modified": "2023-04-18T09:38:22.545+05:30",
        //                     "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                     "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                     "location": {
        //                         "id": "6148434662785024",
        //                         "created": "2023-04-18T09:38:22.535+05:30",
        //                         "modified": "2023-04-18T09:38:22.546+05:30",
        //                         "line1": "3402 N Central Ave",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85012",
        //                         "locLat": 33.4879117,
        //                         "locLng": -112.0745667,
        //                         "locSource": "3402 n central ave  phoenix,az 85012"
        //                     },
        //                     "deaNumber": "AW0572518",
        //                     "isOurs": false
        //                 },
        //                 "ndcCode": "00228298311",
        //                 "patientName": "ULA PECK",
        //                 "patientDOB": "02/04/1939",
        //                 "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                 "isExpectedPatient": true,
        //                 "ndcOriginalSource": "00228298311",
        //                 "productCodeQualifier": "ND",
        //                 "ourPharmacy": false,
        //                 "ourProvider": false,
        //                 "startDate": "2023-09-05T10:30:00.000+05:30",
        //                 "endDate": "2023-09-30T10:30:00.000+05:30"
        //             },
        //             {
        //                 "id": "5947309934247936",
        //                 "created": "2024-01-26T08:36:48.998+05:30",
        //                 "modified": "2024-01-26T08:36:49.767+05:30",
        //                 "patientId": "6007697174429696",
        //                 "classification": "STIMULANT",
        //                 "fillDate": "2023-09-03T10:30:00.000+05:30",
        //                 "fillDateString": "Sep 3",
        //                 "productName": "DEXTROAMPHETAMINE SACCHARATE, AMPHETAMINE ASPARTATE, DEXTROAMPHETAMINE SULFATE AND AMPHETAMINE SULFA, 5 M",
        //                 "displayName": "DEXTROAMPHETAMINE SACCHARATE, AMPHE",
        //                 "strengthDesc": "5 MG;5 MG;5 MG;5 MG",
        //                 "dosage": 5,
        //                 "prescribedQty": 30,
        //                 "prescribedLen": 30,
        //                 "dailyME": 0,
        //                 "writtenDate": "2023-06-30T10:30:00.000+05:30",
        //                 "writtenDateString": "Jun 30",
        //                 "nrCode": "R",
        //                 "refillCount": 0,
        //                 "rxNum": " ",
        //                 "isActive": false,
        //                 "isOurs": false,
        //                 "prescriber": {
        //                     "id": "6465094011584512",
        //                     "created": "2023-04-18T09:38:26.965+05:30",
        //                     "modified": "2023-04-18T09:38:26.965+05:30",
        //                     "firstName": "MARNA",
        //                     "lastName": "WITT",
        //                     "sourceAddress": "2605 w deer valley rd  phoenix,az 85027",
        //                     "location": {
        //                         "id": "5339194104741888",
        //                         "created": "2023-04-18T09:38:26.958+05:30",
        //                         "modified": "2023-04-18T09:38:26.965+05:30",
        //                         "line1": "2605 W Deer Valley Rd",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85027",
        //                         "locLat": 33.6830506,
        //                         "locLng": -112.1160883,
        //                         "locSource": "2605 w deer valley rd  phoenix,az 85027"
        //                     },
        //                     "deaNumber": "BS0422775"
        //                 },
        //                 "pharmacy": {
        //                     "id": "6183619034873856",
        //                     "created": "2023-04-18T09:38:27.240+05:30",
        //                     "modified": "2023-04-18T09:38:27.240+05:30",
        //                     "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                     "sourceAddress": "3605 e thomas rd  phoenix,az 85018",
        //                     "location": {
        //                         "id": "5057719128031232",
        //                         "created": "2023-04-18T09:38:27.232+05:30",
        //                         "modified": "2023-04-18T09:38:27.240+05:30",
        //                         "line1": "3605 E Thomas Rd",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85018",
        //                         "locLat": 33.4799903,
        //                         "locLng": -112.0035764,
        //                         "locSource": "3605 e thomas rd  phoenix,az 85018"
        //                     },
        //                     "deaNumber": "AW0572481",
        //                     "isOurs": false
        //                 },
        //                 "ndcCode": "00555097302",
        //                 "patientName": "ULA PECK",
        //                 "patientDOB": "02/04/1939",
        //                 "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                 "isExpectedPatient": true,
        //                 "ndcOriginalSource": "00555097302",
        //                 "productCodeQualifier": "ND",
        //                 "ourPharmacy": false,
        //                 "ourProvider": false,
        //                 "startDate": "2023-09-03T10:30:00.000+05:30",
        //                 "endDate": "2023-10-02T10:30:00.000+05:30"
        //             },
        //             {
        //                 "id": "5384359980826624",
        //                 "created": "2024-01-26T08:36:48.998+05:30",
        //                 "modified": "2024-01-26T08:36:49.769+05:30",
        //                 "patientId": "6007697174429696",
        //                 "classification": "STIMULANT",
        //                 "fillDate": "2023-08-09T10:30:00.000+05:30",
        //                 "fillDateString": "Aug 9",
        //                 "productName": "DEXTROAMPHETAMINE SACCHARATE, AMPHETAMINE ASPARTATE, DEXTROAMPHETAMINE SULFATE AND AMPHETAMINE SULFA, 5 M",
        //                 "displayName": "DEXTROAMPHETAMINE SACCHARATE, AMPHE",
        //                 "strengthDesc": "5 MG;5 MG;5 MG;5 MG",
        //                 "dosage": 5,
        //                 "prescribedQty": 30,
        //                 "prescribedLen": 30,
        //                 "dailyME": 0,
        //                 "writtenDate": "2023-06-30T10:30:00.000+05:30",
        //                 "writtenDateString": "Jun 30",
        //                 "nrCode": "R",
        //                 "refillCount": 0,
        //                 "rxNum": " ",
        //                 "isActive": false,
        //                 "isOurs": false,
        //                 "prescriber": {
        //                     "id": "6746568988295168",
        //                     "created": "2023-04-18T09:38:27.549+05:30",
        //                     "modified": "2023-04-18T09:38:27.549+05:30",
        //                     "firstName": "MARNA",
        //                     "lastName": "WITT",
        //                     "sourceAddress": "4727 e bell rd  phoenix,az 85032",
        //                     "location": {
        //                         "id": "5620669081452544",
        //                         "created": "2023-04-18T09:38:27.541+05:30",
        //                         "modified": "2023-04-18T09:38:27.550+05:30",
        //                         "line1": "4727 E Bell Rd",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85032",
        //                         "locLat": 33.6383669,
        //                         "locLng": -111.9792636,
        //                         "locSource": "4727 e bell rd  phoenix,az 85032"
        //                     },
        //                     "deaNumber": "BS0422775"
        //                 },
        //                 "pharmacy": {
        //                     "id": "5585484709363712",
        //                     "created": "2023-04-18T09:38:22.545+05:30",
        //                     "modified": "2023-04-18T09:38:22.545+05:30",
        //                     "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                     "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                     "location": {
        //                         "id": "6148434662785024",
        //                         "created": "2023-04-18T09:38:22.535+05:30",
        //                         "modified": "2023-04-18T09:38:22.546+05:30",
        //                         "line1": "3402 N Central Ave",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85012",
        //                         "locLat": 33.4879117,
        //                         "locLng": -112.0745667,
        //                         "locSource": "3402 n central ave  phoenix,az 85012"
        //                     },
        //                     "deaNumber": "AW0572518",
        //                     "isOurs": false
        //                 },
        //                 "ndcCode": "00555097302",
        //                 "patientName": "ULA PECK",
        //                 "patientDOB": "02/04/1939",
        //                 "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                 "isExpectedPatient": true,
        //                 "ndcOriginalSource": "00555097302",
        //                 "productCodeQualifier": "ND",
        //                 "ourPharmacy": false,
        //                 "ourProvider": false,
        //                 "startDate": "2023-08-09T10:30:00.000+05:30",
        //                 "endDate": "2023-09-07T10:30:00.000+05:30"
        //             },
        //             {
        //                 "id": "6510259887669248",
        //                 "created": "2024-01-26T08:36:48.998+05:30",
        //                 "modified": "2024-01-26T08:36:49.770+05:30",
        //                 "patientId": "6007697174429696",
        //                 "classification": "OPIOID",
        //                 "fillDate": "2023-08-07T10:30:00.000+05:30",
        //                 "fillDateString": "Aug 7",
        //                 "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                 "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                 "strengthDesc": "10 MG;325 MG",
        //                 "dosage": 10,
        //                 "prescribedQty": 105,
        //                 "prescribedLen": 30,
        //                 "dailyME": 53,
        //                 "writtenDate": "2023-08-05T10:30:00.000+05:30",
        //                 "writtenDateString": "Aug 5",
        //                 "nrCode": "R",
        //                 "refillCount": 0,
        //                 "rxNum": " ",
        //                 "isActive": false,
        //                 "isOurs": false,
        //                 "prescriber": {
        //                     "id": "5647057360519168",
        //                     "created": "2023-04-18T09:38:27.828+05:30",
        //                     "modified": "2023-04-18T09:38:27.828+05:30",
        //                     "firstName": "JESUS",
        //                     "lastName": "GOFF",
        //                     "sourceAddress": "3502 w greenway rd  phoenix,az 85053",
        //                     "location": {
        //                         "id": "4521157453676544",
        //                         "created": "2023-04-18T09:38:27.822+05:30",
        //                         "modified": "2023-04-18T09:38:27.829+05:30",
        //                         "line1": "3502 W Greenway Rd",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85053",
        //                         "locLat": 33.6255504,
        //                         "locLng": -112.1339396,
        //                         "locSource": "3502 w greenway rd  phoenix,az 85053"
        //                     },
        //                     "deaNumber": "MH3182261"
        //                 },
        //                 "pharmacy": {
        //                     "id": "6183619034873856",
        //                     "created": "2023-04-18T09:38:27.240+05:30",
        //                     "modified": "2023-04-18T09:38:27.240+05:30",
        //                     "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                     "sourceAddress": "3605 e thomas rd  phoenix,az 85018",
        //                     "location": {
        //                         "id": "5057719128031232",
        //                         "created": "2023-04-18T09:38:27.232+05:30",
        //                         "modified": "2023-04-18T09:38:27.240+05:30",
        //                         "line1": "3605 E Thomas Rd",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85018",
        //                         "locLat": 33.4799903,
        //                         "locLng": -112.0035764,
        //                         "locSource": "3605 e thomas rd  phoenix,az 85018"
        //                     },
        //                     "deaNumber": "AW0572481",
        //                     "isOurs": false
        //                 },
        //                 "ndcCode": "00228298311",
        //                 "patientName": "ULA PECK",
        //                 "patientDOB": "02/04/1939",
        //                 "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                 "isExpectedPatient": true,
        //                 "ndcOriginalSource": "00228298311",
        //                 "productCodeQualifier": "ND",
        //                 "ourPharmacy": false,
        //                 "ourProvider": false,
        //                 "startDate": "2023-08-07T10:30:00.000+05:30",
        //                 "endDate": "2023-09-05T10:30:00.000+05:30"
        //             },
        //             {
        //                 "id": "4680672539049984",
        //                 "created": "2024-01-26T08:36:48.999+05:30",
        //                 "modified": "2024-01-26T08:36:49.770+05:30",
        //                 "patientId": "6007697174429696",
        //                 "classification": "OPIOID",
        //                 "fillDate": "2023-07-08T10:30:00.000+05:30",
        //                 "fillDateString": "Jul 8",
        //                 "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                 "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                 "strengthDesc": "10 MG;325 MG",
        //                 "dosage": 10,
        //                 "prescribedQty": 105,
        //                 "prescribedLen": 26,
        //                 "dailyME": 61,
        //                 "writtenDate": "2023-07-08T10:30:00.000+05:30",
        //                 "writtenDateString": "Jul 8",
        //                 "nrCode": "R",
        //                 "refillCount": 0,
        //                 "rxNum": " ",
        //                 "isActive": false,
        //                 "isOurs": false,
        //                 "prescriber": {
        //                     "id": "6210007313940480",
        //                     "created": "2023-04-18T09:38:28.143+05:30",
        //                     "modified": "2023-04-18T09:38:28.143+05:30",
        //                     "firstName": "LEONORE",
        //                     "lastName": "BURKE",
        //                     "sourceAddress": "3399 n scottsdale rd  scottsdale,az 85251",
        //                     "location": {
        //                         "id": "5084107407097856",
        //                         "created": "2023-04-18T09:38:28.104+05:30",
        //                         "modified": "2023-04-18T09:38:28.143+05:30",
        //                         "line1": "3399 N Scottsdale Rd",
        //                         "city": "Scottsdale",
        //                         "state": "AZ",
        //                         "zip": "85251",
        //                         "locLat": 33.4873821,
        //                         "locLng": -111.9253742,
        //                         "locSource": "3399 n scottsdale rd  scottsdale,az 85251"
        //                     },
        //                     "deaNumber": "MF3403273"
        //                 },
        //                 "pharmacy": {
        //                     "id": "5928532337229824",
        //                     "created": "2023-04-18T09:38:28.414+05:30",
        //                     "modified": "2023-04-18T09:38:28.414+05:30",
        //                     "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                     "sourceAddress": "4111 n 24th street  phoenix,az 85016",
        //                     "location": {
        //                         "id": "4802632430387200",
        //                         "created": "2023-04-18T09:38:28.407+05:30",
        //                         "modified": "2023-04-18T09:38:28.415+05:30",
        //                         "line1": "4111 N 24th St",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85016",
        //                         "locLat": 33.4953117,
        //                         "locLng": -112.0295014,
        //                         "locSource": "4111 n 24th street  phoenix,az 85016"
        //                     },
        //                     "deaNumber": "BW1377200",
        //                     "isOurs": false
        //                 },
        //                 "ndcCode": "00228298311",
        //                 "patientName": "ULA PECK",
        //                 "patientDOB": "02/04/1939",
        //                 "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                 "isExpectedPatient": true,
        //                 "ndcOriginalSource": "00228298311",
        //                 "productCodeQualifier": "ND",
        //                 "ourPharmacy": false,
        //                 "ourProvider": false,
        //                 "startDate": "2023-07-08T10:30:00.000+05:30",
        //                 "endDate": "2023-08-02T10:30:00.000+05:30"
        //             },
        //             {
        //                 "id": "5806572445892608",
        //                 "created": "2024-01-26T08:36:48.999+05:30",
        //                 "modified": "2024-01-26T08:36:49.771+05:30",
        //                 "patientId": "6007697174429696",
        //                 "classification": "OPIOID",
        //                 "fillDate": "2023-06-27T10:30:00.000+05:30",
        //                 "fillDateString": "Jun 27",
        //                 "productName": "OPANA ER, 5 MG, TABLET, EXTENDED RELEASE",
        //                 "displayName": "OPANA ER, 5 MG, TABLET, EXTENDED RE",
        //                 "strengthDesc": "5 MG",
        //                 "dosage": 5,
        //                 "prescribedQty": 60,
        //                 "prescribedLen": 30,
        //                 "dailyME": 30,
        //                 "writtenDate": "2023-06-10T10:30:00.000+05:30",
        //                 "writtenDateString": "Jun 10",
        //                 "nrCode": "R",
        //                 "refillCount": 0,
        //                 "rxNum": " ",
        //                 "isActive": false,
        //                 "isOurs": false,
        //                 "prescriber": {
        //                     "id": "4661894942031872",
        //                     "created": "2023-04-18T09:38:28.708+05:30",
        //                     "modified": "2023-04-18T09:38:28.708+05:30",
        //                     "firstName": "LEONORE",
        //                     "lastName": "BURKE",
        //                     "sourceAddress": "3330 n scottsdale rd  scottsdale,az 85251",
        //                     "location": {
        //                         "id": "6491482290651136",
        //                         "created": "2023-04-18T09:38:28.700+05:30",
        //                         "modified": "2023-04-18T09:38:28.708+05:30",
        //                         "line1": "3330 N Scottsdale Rd",
        //                         "city": "Scottsdale",
        //                         "state": "AZ",
        //                         "zip": "85251",
        //                         "locLat": 33.4870326,
        //                         "locLng": -111.9272421,
        //                         "locSource": "3330 n scottsdale rd  scottsdale,az 85251"
        //                     },
        //                     "deaNumber": "MF3403273"
        //                 },
        //                 "pharmacy": {
        //                     "id": "5224844895453184",
        //                     "created": "2023-04-18T09:38:29.053+05:30",
        //                     "modified": "2023-04-18T09:38:29.053+05:30",
        //                     "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                     "sourceAddress": "8015 e indian school rd  scottsdale,az 85251",
        //                     "location": {
        //                         "id": "5787794848874496",
        //                         "created": "2023-04-18T09:38:29.032+05:30",
        //                         "modified": "2023-04-18T09:38:29.054+05:30",
        //                         "line1": "8015 E Indian School Rd",
        //                         "city": "Scottsdale",
        //                         "state": "AZ",
        //                         "zip": "85251",
        //                         "locLat": 33.4935565,
        //                         "locLng": -111.9081693,
        //                         "locSource": "8015 e indian school rd  scottsdale,az 85251"
        //                     },
        //                     "deaNumber": "AW9699818",
        //                     "isOurs": false
        //                 },
        //                 "ndcCode": "63481081260",
        //                 "patientName": "ULA PECK",
        //                 "patientDOB": "02/04/1939",
        //                 "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                 "isExpectedPatient": true,
        //                 "ndcOriginalSource": "63481081260",
        //                 "productCodeQualifier": "ND",
        //                 "ourPharmacy": false,
        //                 "ourProvider": false,
        //                 "startDate": "2023-06-27T10:30:00.000+05:30",
        //                 "endDate": "2023-07-26T10:30:00.000+05:30"
        //             },
        //             {
        //                 "id": "5243622492471296",
        //                 "created": "2024-01-26T08:36:48.999+05:30",
        //                 "modified": "2024-01-26T08:36:49.772+05:30",
        //                 "patientId": "6007697174429696",
        //                 "classification": "STIMULANT",
        //                 "fillDate": "2023-06-23T10:30:00.000+05:30",
        //                 "fillDateString": "Jun 23",
        //                 "productName": "DEXTROAMPHETAMINE SACCHARATE, AMPHETAMINE ASPARTATE, DEXTROAMPHETAMINE SULFATE AND AMPHETAMINE SULFA, 5 M",
        //                 "displayName": "DEXTROAMPHETAMINE SACCHARATE, AMPHE",
        //                 "strengthDesc": "5 MG;5 MG;5 MG;5 MG",
        //                 "dosage": 5,
        //                 "prescribedQty": 30,
        //                 "prescribedLen": 30,
        //                 "dailyME": 0,
        //                 "writtenDate": "2023-03-31T10:30:00.000+05:30",
        //                 "writtenDateString": "Mar 31",
        //                 "nrCode": "R",
        //                 "refillCount": 0,
        //                 "rxNum": " ",
        //                 "isActive": false,
        //                 "isOurs": false,
        //                 "prescriber": {
        //                     "id": "4943369918742528",
        //                     "created": "2023-04-18T09:38:29.340+05:30",
        //                     "modified": "2023-04-18T09:38:29.340+05:30",
        //                     "firstName": "MARNA",
        //                     "lastName": "WITT",
        //                     "sourceAddress": "4214 w dunlap ave  phoenix,az 85051",
        //                     "location": {
        //                         "id": "6350744802295808",
        //                         "created": "2023-04-18T09:38:29.332+05:30",
        //                         "modified": "2023-04-18T09:38:29.341+05:30",
        //                         "line1": "4214 W Dunlap Ave",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85051",
        //                         "locLat": 33.5679233,
        //                         "locLng": -112.1495883,
        //                         "locSource": "4214 w dunlap ave  phoenix,az 85051"
        //                     },
        //                     "deaNumber": "BS0422775"
        //                 },
        //                 "pharmacy": {
        //                     "id": "5585484709363712",
        //                     "created": "2023-04-18T09:38:22.545+05:30",
        //                     "modified": "2023-04-18T09:38:22.545+05:30",
        //                     "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                     "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                     "location": {
        //                         "id": "6148434662785024",
        //                         "created": "2023-04-18T09:38:22.535+05:30",
        //                         "modified": "2023-04-18T09:38:22.546+05:30",
        //                         "line1": "3402 N Central Ave",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85012",
        //                         "locLat": 33.4879117,
        //                         "locLng": -112.0745667,
        //                         "locSource": "3402 n central ave  phoenix,az 85012"
        //                     },
        //                     "deaNumber": "AW0572518",
        //                     "isOurs": false
        //                 },
        //                 "ndcCode": "00555097302",
        //                 "patientName": "ULA PECK",
        //                 "patientDOB": "02/04/1939",
        //                 "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                 "isExpectedPatient": true,
        //                 "ndcOriginalSource": "00555097302",
        //                 "productCodeQualifier": "ND",
        //                 "ourPharmacy": false,
        //                 "ourProvider": false,
        //                 "startDate": "2023-06-23T10:30:00.000+05:30",
        //                 "endDate": "2023-07-22T10:30:00.000+05:30"
        //             },
        //             {
        //                 "id": "6369522399313920",
        //                 "created": "2024-01-26T08:36:49.000+05:30",
        //                 "modified": "2024-01-26T08:36:49.772+05:30",
        //                 "patientId": "6007697174429696",
        //                 "classification": "STIMULANT",
        //                 "fillDate": "2023-06-23T10:30:00.000+05:30",
        //                 "fillDateString": "Jun 23",
        //                 "productName": "VYVANSE, 50 MG, CAPSULE",
        //                 "displayName": "VYVANSE, 50 MG, CAPSULE",
        //                 "strengthDesc": "50 MG",
        //                 "dosage": 50,
        //                 "prescribedQty": 10,
        //                 "prescribedLen": 10,
        //                 "dailyME": 0,
        //                 "writtenDate": "2023-03-31T10:30:00.000+05:30",
        //                 "writtenDateString": "Mar 31",
        //                 "nrCode": "R",
        //                 "refillCount": 0,
        //                 "rxNum": " ",
        //                 "isActive": false,
        //                 "isOurs": false,
        //                 "prescriber": {
        //                     "id": "5506319872163840",
        //                     "created": "2023-04-18T09:38:29.637+05:30",
        //                     "modified": "2023-04-18T09:38:29.637+05:30",
        //                     "firstName": "MARNA",
        //                     "lastName": "WITT",
        //                     "sourceAddress": "4225 w dunlap ave  phoenix,az 85051",
        //                     "location": {
        //                         "id": "6069269825585152",
        //                         "created": "2023-04-18T09:38:29.630+05:30",
        //                         "modified": "2023-04-18T09:38:29.637+05:30",
        //                         "line1": "4225 W Dunlap Ave",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85051",
        //                         "locLat": 33.5671697,
        //                         "locLng": -112.1506737,
        //                         "locSource": "4225 w dunlap ave  phoenix,az 85051"
        //                     },
        //                     "deaNumber": "BS0422775"
        //                 },
        //                 "pharmacy": {
        //                     "id": "5585484709363712",
        //                     "created": "2023-04-18T09:38:22.545+05:30",
        //                     "modified": "2023-04-18T09:38:22.545+05:30",
        //                     "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                     "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                     "location": {
        //                         "id": "6148434662785024",
        //                         "created": "2023-04-18T09:38:22.535+05:30",
        //                         "modified": "2023-04-18T09:38:22.546+05:30",
        //                         "line1": "3402 N Central Ave",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85012",
        //                         "locLat": 33.4879117,
        //                         "locLng": -112.0745667,
        //                         "locSource": "3402 n central ave  phoenix,az 85012"
        //                     },
        //                     "deaNumber": "AW0572518",
        //                     "isOurs": false
        //                 },
        //                 "ndcCode": "59417010510",
        //                 "patientName": "ULA PECK",
        //                 "patientDOB": "02/04/1939",
        //                 "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                 "isExpectedPatient": true,
        //                 "ndcOriginalSource": "59417010510",
        //                 "productCodeQualifier": "ND",
        //                 "ourPharmacy": false,
        //                 "ourProvider": false,
        //                 "startDate": "2023-06-23T10:30:00.000+05:30",
        //                 "endDate": "2023-07-02T10:30:00.000+05:30"
        //             },
        //             {
        //                 "id": "6088047422603264",
        //                 "created": "2024-01-26T08:36:49.000+05:30",
        //                 "modified": "2024-01-26T08:36:49.774+05:30",
        //                 "patientId": "6007697174429696",
        //                 "classification": "OPIOID",
        //                 "fillDate": "2023-06-10T10:30:00.000+05:30",
        //                 "fillDateString": "Jun 10",
        //                 "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                 "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                 "strengthDesc": "10 MG;325 MG",
        //                 "dosage": 10,
        //                 "prescribedQty": 105,
        //                 "prescribedLen": 30,
        //                 "dailyME": 53,
        //                 "writtenDate": "2023-06-10T10:30:00.000+05:30",
        //                 "writtenDateString": "Jun 10",
        //                 "nrCode": "R",
        //                 "refillCount": 0,
        //                 "rxNum": " ",
        //                 "isActive": false,
        //                 "isOurs": false,
        //                 "prescriber": {
        //                     "id": "6632219779006464",
        //                     "created": "2023-04-18T09:38:29.717+05:30",
        //                     "modified": "2023-04-18T09:38:29.717+05:30",
        //                     "firstName": "LEONORE",
        //                     "lastName": "BURKE",
        //                     "sourceAddress": "",
        //                     "deaNumber": "MF3403273"
        //                 },
        //                 "pharmacy": {
        //                     "id": "5585484709363712",
        //                     "created": "2023-04-18T09:38:22.545+05:30",
        //                     "modified": "2023-04-18T09:38:22.545+05:30",
        //                     "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                     "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                     "location": {
        //                         "id": "6148434662785024",
        //                         "created": "2023-04-18T09:38:22.535+05:30",
        //                         "modified": "2023-04-18T09:38:22.546+05:30",
        //                         "line1": "3402 N Central Ave",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85012",
        //                         "locLat": 33.4879117,
        //                         "locLng": -112.0745667,
        //                         "locSource": "3402 n central ave  phoenix,az 85012"
        //                     },
        //                     "deaNumber": "AW0572518",
        //                     "isOurs": false
        //                 },
        //                 "ndcCode": "00228298311",
        //                 "patientName": "ULA PECK",
        //                 "patientDOB": "02/04/1939",
        //                 "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                 "isExpectedPatient": true,
        //                 "ndcOriginalSource": "00228298311",
        //                 "productCodeQualifier": "ND",
        //                 "ourPharmacy": false,
        //                 "ourProvider": false,
        //                 "startDate": "2023-06-10T10:30:00.000+05:30",
        //                 "endDate": "2023-07-09T10:30:00.000+05:30"
        //             },
        //             {
        //                 "id": "6650997376024576",
        //                 "created": "2024-01-26T08:36:49.000+05:30",
        //                 "modified": "2024-01-26T08:36:49.776+05:30",
        //                 "patientId": "6007697174429696",
        //                 "classification": "OPIOID",
        //                 "fillDate": "2023-05-10T10:30:00.000+05:30",
        //                 "fillDateString": "May 10",
        //                 "productName": "MORPHINE SULFATE, 15 MG, TABLET, EXTENDED RELEASE",
        //                 "displayName": "MORPHINE SULFATE, 15 MG, TABLET, EX",
        //                 "strengthDesc": "15 MG",
        //                 "dosage": 15,
        //                 "prescribedQty": 60,
        //                 "prescribedLen": 30,
        //                 "dailyME": 30,
        //                 "writtenDate": "2023-05-08T10:30:00.000+05:30",
        //                 "writtenDateString": "May 8",
        //                 "nrCode": "R",
        //                 "refillCount": 0,
        //                 "rxNum": " ",
        //                 "isActive": false,
        //                 "isOurs": false,
        //                 "prescriber": {
        //                     "id": "6632219779006464",
        //                     "created": "2023-04-18T09:38:29.717+05:30",
        //                     "modified": "2023-04-18T09:38:29.717+05:30",
        //                     "firstName": "LEONORE",
        //                     "lastName": "BURKE",
        //                     "sourceAddress": "",
        //                     "deaNumber": "MF3403273"
        //                 },
        //                 "pharmacy": {
        //                     "id": "5585484709363712",
        //                     "created": "2023-04-18T09:38:22.545+05:30",
        //                     "modified": "2023-04-18T09:38:22.545+05:30",
        //                     "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                     "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                     "location": {
        //                         "id": "6148434662785024",
        //                         "created": "2023-04-18T09:38:22.535+05:30",
        //                         "modified": "2023-04-18T09:38:22.546+05:30",
        //                         "line1": "3402 N Central Ave",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85012",
        //                         "locLat": 33.4879117,
        //                         "locLng": -112.0745667,
        //                         "locSource": "3402 n central ave  phoenix,az 85012"
        //                     },
        //                     "deaNumber": "AW0572518",
        //                     "isOurs": false
        //                 },
        //                 "ndcCode": "68382090301",
        //                 "patientName": "ULA PECK",
        //                 "patientDOB": "02/04/1939",
        //                 "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                 "isExpectedPatient": true,
        //                 "ndcOriginalSource": "68382090301",
        //                 "productCodeQualifier": "ND",
        //                 "ourPharmacy": false,
        //                 "ourProvider": false,
        //                 "startDate": "2023-05-10T10:30:00.000+05:30",
        //                 "endDate": "2023-06-08T10:30:00.000+05:30"
        //             },
        //             {
        //                 "id": "5173253748293632",
        //                 "created": "2024-01-26T08:36:49.001+05:30",
        //                 "modified": "2024-01-26T08:36:49.777+05:30",
        //                 "patientId": "6007697174429696",
        //                 "classification": "OPIOID",
        //                 "fillDate": "2023-05-10T10:30:00.000+05:30",
        //                 "fillDateString": "May 10",
        //                 "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                 "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                 "strengthDesc": "10 MG;325 MG",
        //                 "dosage": 10,
        //                 "prescribedQty": 105,
        //                 "prescribedLen": 26,
        //                 "dailyME": 61,
        //                 "writtenDate": "2023-05-08T10:30:00.000+05:30",
        //                 "writtenDateString": "May 8",
        //                 "nrCode": "R",
        //                 "refillCount": 0,
        //                 "rxNum": " ",
        //                 "isActive": false,
        //                 "isOurs": false,
        //                 "prescriber": {
        //                     "id": "6632219779006464",
        //                     "created": "2023-04-18T09:38:29.717+05:30",
        //                     "modified": "2023-04-18T09:38:29.717+05:30",
        //                     "firstName": "LEONORE",
        //                     "lastName": "BURKE",
        //                     "sourceAddress": "",
        //                     "deaNumber": "MF3403273"
        //                 },
        //                 "pharmacy": {
        //                     "id": "5585484709363712",
        //                     "created": "2023-04-18T09:38:22.545+05:30",
        //                     "modified": "2023-04-18T09:38:22.545+05:30",
        //                     "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                     "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                     "location": {
        //                         "id": "6148434662785024",
        //                         "created": "2023-04-18T09:38:22.535+05:30",
        //                         "modified": "2023-04-18T09:38:22.546+05:30",
        //                         "line1": "3402 N Central Ave",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85012",
        //                         "locLat": 33.4879117,
        //                         "locLng": -112.0745667,
        //                         "locSource": "3402 n central ave  phoenix,az 85012"
        //                     },
        //                     "deaNumber": "AW0572518",
        //                     "isOurs": false
        //                 },
        //                 "ndcCode": "00228298311",
        //                 "patientName": "ULA PECK",
        //                 "patientDOB": "02/04/1939",
        //                 "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                 "isExpectedPatient": true,
        //                 "ndcOriginalSource": "00228298311",
        //                 "productCodeQualifier": "ND",
        //                 "ourPharmacy": false,
        //                 "ourProvider": false,
        //                 "startDate": "2023-05-10T10:30:00.000+05:30",
        //                 "endDate": "2023-06-04T10:30:00.000+05:30"
        //             },
        //             {
        //                 "id": "6299153655136256",
        //                 "created": "2024-01-26T08:36:49.001+05:30",
        //                 "modified": "2024-01-26T08:36:49.778+05:30",
        //                 "patientId": "6007697174429696",
        //                 "classification": "STIMULANT",
        //                 "fillDate": "2023-04-17T10:30:00.000+05:30",
        //                 "fillDateString": "Apr 17",
        //                 "productName": "DEXTROAMPHETAMINE SACCHARATE, AMPHETAMINE ASPARTATE, DEXTROAMPHETAMINE SULFATE AND AMPHETAMINE SULFA, 5 M",
        //                 "displayName": "DEXTROAMPHETAMINE SACCHARATE, AMPHE",
        //                 "strengthDesc": "5 MG;5 MG;5 MG;5 MG",
        //                 "dosage": 5,
        //                 "prescribedQty": 30,
        //                 "prescribedLen": 30,
        //                 "dailyME": 0,
        //                 "writtenDate": "2023-03-31T10:30:00.000+05:30",
        //                 "writtenDateString": "Mar 31",
        //                 "nrCode": "R",
        //                 "refillCount": 0,
        //                 "rxNum": " ",
        //                 "isActive": false,
        //                 "isOurs": false,
        //                 "prescriber": {
        //                     "id": "5717426104696832",
        //                     "created": "2023-04-18T09:38:30.170+05:30",
        //                     "modified": "2023-04-18T09:38:30.170+05:30",
        //                     "firstName": "MARNA",
        //                     "lastName": "WITT",
        //                     "sourceAddress": "21050 n tatum blvd  phoenix,az 85050",
        //                     "location": {
        //                         "id": "4591526197854208",
        //                         "created": "2023-04-18T09:38:30.164+05:30",
        //                         "modified": "2023-04-18T09:38:30.170+05:30",
        //                         "line1": "21050 N Tatum Blvd",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85050",
        //                         "locLat": 33.6777893,
        //                         "locLng": -111.9789375,
        //                         "locSource": "21050 n tatum blvd  phoenix,az 85050"
        //                     },
        //                     "deaNumber": "BS0422775"
        //                 },
        //                 "pharmacy": {
        //                     "id": "5585484709363712",
        //                     "created": "2023-04-18T09:38:22.545+05:30",
        //                     "modified": "2023-04-18T09:38:22.545+05:30",
        //                     "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                     "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                     "location": {
        //                         "id": "6148434662785024",
        //                         "created": "2023-04-18T09:38:22.535+05:30",
        //                         "modified": "2023-04-18T09:38:22.546+05:30",
        //                         "line1": "3402 N Central Ave",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85012",
        //                         "locLat": 33.4879117,
        //                         "locLng": -112.0745667,
        //                         "locSource": "3402 n central ave  phoenix,az 85012"
        //                     },
        //                     "deaNumber": "AW0572518",
        //                     "isOurs": false
        //                 },
        //                 "ndcCode": "00555097302",
        //                 "patientName": "ULA PECK",
        //                 "patientDOB": "02/04/1939",
        //                 "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                 "isExpectedPatient": true,
        //                 "ndcOriginalSource": "00555097302",
        //                 "productCodeQualifier": "ND",
        //                 "ourPharmacy": false,
        //                 "ourProvider": false,
        //                 "startDate": "2023-04-17T10:30:00.000+05:30",
        //                 "endDate": "2023-05-16T10:30:00.000+05:30"
        //             },
        //             {
        //                 "id": "4891778771582976",
        //                 "created": "2024-01-26T08:36:49.002+05:30",
        //                 "modified": "2024-01-26T08:36:49.779+05:30",
        //                 "patientId": "6007697174429696",
        //                 "classification": "OPIOID",
        //                 "fillDate": "2023-04-12T10:30:00.000+05:30",
        //                 "fillDateString": "Apr 12",
        //                 "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                 "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                 "strengthDesc": "10 MG;325 MG",
        //                 "dosage": 10,
        //                 "prescribedQty": 105,
        //                 "prescribedLen": 30,
        //                 "dailyME": 53,
        //                 "writtenDate": "2023-04-10T10:30:00.000+05:30",
        //                 "writtenDateString": "Apr 10",
        //                 "nrCode": "R",
        //                 "refillCount": 0,
        //                 "rxNum": " ",
        //                 "isActive": false,
        //                 "isOurs": false,
        //                 "prescriber": {
        //                     "id": "6632219779006464",
        //                     "created": "2023-04-18T09:38:29.717+05:30",
        //                     "modified": "2023-04-18T09:38:29.717+05:30",
        //                     "firstName": "LEONORE",
        //                     "lastName": "BURKE",
        //                     "sourceAddress": "",
        //                     "deaNumber": "MF3403273"
        //                 },
        //                 "pharmacy": {
        //                     "id": "5585484709363712",
        //                     "created": "2023-04-18T09:38:22.545+05:30",
        //                     "modified": "2023-04-18T09:38:22.545+05:30",
        //                     "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                     "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                     "location": {
        //                         "id": "6148434662785024",
        //                         "created": "2023-04-18T09:38:22.535+05:30",
        //                         "modified": "2023-04-18T09:38:22.546+05:30",
        //                         "line1": "3402 N Central Ave",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85012",
        //                         "locLat": 33.4879117,
        //                         "locLng": -112.0745667,
        //                         "locSource": "3402 n central ave  phoenix,az 85012"
        //                     },
        //                     "deaNumber": "AW0572518",
        //                     "isOurs": false
        //                 },
        //                 "ndcCode": "00228298311",
        //                 "patientName": "ULA PECK",
        //                 "patientDOB": "02/04/1939",
        //                 "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                 "isExpectedPatient": true,
        //                 "ndcOriginalSource": "00228298311",
        //                 "productCodeQualifier": "ND",
        //                 "ourPharmacy": false,
        //                 "ourProvider": false,
        //                 "startDate": "2023-04-12T10:30:00.000+05:30",
        //                 "endDate": "2023-05-11T10:30:00.000+05:30"
        //             },
        //             {
        //                 "id": "6017678678425600",
        //                 "created": "2024-01-26T08:36:49.002+05:30",
        //                 "modified": "2024-01-26T08:36:49.780+05:30",
        //                 "patientId": "6007697174429696",
        //                 "classification": "STIMULANT",
        //                 "fillDate": "2023-04-12T10:30:00.000+05:30",
        //                 "fillDateString": "Apr 12",
        //                 "productName": "VYVANSE, 50 MG, CAPSULE",
        //                 "displayName": "VYVANSE, 50 MG, CAPSULE",
        //                 "strengthDesc": "50 MG",
        //                 "dosage": 50,
        //                 "prescribedQty": 30,
        //                 "prescribedLen": 30,
        //                 "dailyME": 0,
        //                 "writtenDate": "2023-03-31T10:30:00.000+05:30",
        //                 "writtenDateString": "Mar 31",
        //                 "nrCode": "R",
        //                 "refillCount": 0,
        //                 "rxNum": " ",
        //                 "isActive": false,
        //                 "isOurs": false,
        //                 "prescriber": {
        //                     "id": "6280376058118144",
        //                     "created": "2023-04-18T09:38:30.534+05:30",
        //                     "modified": "2023-04-18T09:38:30.534+05:30",
        //                     "firstName": "MARNA",
        //                     "lastName": "WITT",
        //                     "sourceAddress": "20759-20963 n tatum blvd  phoenix,az 85050",
        //                     "location": {
        //                         "id": "5154476151275520",
        //                         "created": "2023-04-18T09:38:30.528+05:30",
        //                         "modified": "2023-04-18T09:38:30.534+05:30",
        //                         "line1": "20759 N Tatum Blvd",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85054",
        //                         "locLat": 33.6749678,
        //                         "locLng": -111.9773019,
        //                         "locSource": "20759- 20963 n tatum blvd  phoenix,az 85050"
        //                     },
        //                     "deaNumber": "BS0422775"
        //                 },
        //                 "pharmacy": {
        //                     "id": "5585484709363712",
        //                     "created": "2023-04-18T09:38:22.545+05:30",
        //                     "modified": "2023-04-18T09:38:22.545+05:30",
        //                     "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                     "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                     "location": {
        //                         "id": "6148434662785024",
        //                         "created": "2023-04-18T09:38:22.535+05:30",
        //                         "modified": "2023-04-18T09:38:22.546+05:30",
        //                         "line1": "3402 N Central Ave",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85012",
        //                         "locLat": 33.4879117,
        //                         "locLng": -112.0745667,
        //                         "locSource": "3402 n central ave  phoenix,az 85012"
        //                     },
        //                     "deaNumber": "AW0572518",
        //                     "isOurs": false
        //                 },
        //                 "ndcCode": "59417010510",
        //                 "patientName": "ULA PECK",
        //                 "patientDOB": "02/04/1939",
        //                 "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                 "isExpectedPatient": true,
        //                 "ndcOriginalSource": "59417010510",
        //                 "productCodeQualifier": "ND",
        //                 "ourPharmacy": false,
        //                 "ourProvider": false,
        //                 "startDate": "2023-04-12T10:30:00.000+05:30",
        //                 "endDate": "2023-05-11T10:30:00.000+05:30"
        //             },
        //             {
        //                 "id": "5454728725004288",
        //                 "created": "2024-01-26T08:36:49.002+05:30",
        //                 "modified": "2024-01-26T08:36:49.781+05:30",
        //                 "patientId": "6007697174429696",
        //                 "classification": "OPIOID",
        //                 "fillDate": "2023-04-09T10:30:00.000+05:30",
        //                 "fillDateString": "Apr 9",
        //                 "productName": "OXYCONTIN, 10 MG, TABLET, FILM COATED, EXTENDED RELEASE",
        //                 "displayName": "OXYCONTIN, 10 MG, TABLET, FILM COAT",
        //                 "strengthDesc": "10 MG",
        //                 "dosage": 10,
        //                 "prescribedQty": 60,
        //                 "prescribedLen": 30,
        //                 "dailyME": 30,
        //                 "writtenDate": "2023-03-12T10:30:00.000+05:30",
        //                 "writtenDateString": "Mar 12",
        //                 "nrCode": "R",
        //                 "refillCount": 0,
        //                 "rxNum": " ",
        //                 "isActive": false,
        //                 "isOurs": false,
        //                 "prescriber": {
        //                     "id": "6632219779006464",
        //                     "created": "2023-04-18T09:38:29.717+05:30",
        //                     "modified": "2023-04-18T09:38:29.717+05:30",
        //                     "firstName": "LEONORE",
        //                     "lastName": "BURKE",
        //                     "sourceAddress": "",
        //                     "deaNumber": "MF3403273"
        //                 },
        //                 "pharmacy": {
        //                     "id": "6183619034873856",
        //                     "created": "2023-04-18T09:38:27.240+05:30",
        //                     "modified": "2023-04-18T09:38:27.240+05:30",
        //                     "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                     "sourceAddress": "3605 e thomas rd  phoenix,az 85018",
        //                     "location": {
        //                         "id": "5057719128031232",
        //                         "created": "2023-04-18T09:38:27.232+05:30",
        //                         "modified": "2023-04-18T09:38:27.240+05:30",
        //                         "line1": "3605 E Thomas Rd",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85018",
        //                         "locLat": 33.4799903,
        //                         "locLng": -112.0035764,
        //                         "locSource": "3605 e thomas rd  phoenix,az 85018"
        //                     },
        //                     "deaNumber": "AW0572481",
        //                     "isOurs": false
        //                 },
        //                 "ndcCode": "59011041010",
        //                 "patientName": "ULA PECK",
        //                 "patientDOB": "02/04/1939",
        //                 "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                 "isExpectedPatient": true,
        //                 "ndcOriginalSource": "59011041010",
        //                 "productCodeQualifier": "ND",
        //                 "ourPharmacy": false,
        //                 "ourProvider": false,
        //                 "startDate": "2023-04-09T10:30:00.000+05:30",
        //                 "endDate": "2023-05-08T10:30:00.000+05:30"
        //             },
        //             {
        //                 "id": "6580628631846912",
        //                 "created": "2024-01-26T08:36:49.002+05:30",
        //                 "modified": "2024-01-26T08:36:49.782+05:30",
        //                 "patientId": "6007697174429696",
        //                 "classification": "OPIOID",
        //                 "fillDate": "2023-03-12T10:30:00.000+05:30",
        //                 "fillDateString": "Mar 12",
        //                 "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                 "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                 "strengthDesc": "10 MG;325 MG",
        //                 "dosage": 10,
        //                 "prescribedQty": 105,
        //                 "prescribedLen": 30,
        //                 "dailyME": 53,
        //                 "writtenDate": "2023-03-12T10:30:00.000+05:30",
        //                 "writtenDateString": "Mar 12",
        //                 "nrCode": "R",
        //                 "refillCount": 0,
        //                 "rxNum": " ",
        //                 "isActive": false,
        //                 "isOurs": false,
        //                 "prescriber": {
        //                     "id": "6632219779006464",
        //                     "created": "2023-04-18T09:38:29.717+05:30",
        //                     "modified": "2023-04-18T09:38:29.717+05:30",
        //                     "firstName": "LEONORE",
        //                     "lastName": "BURKE",
        //                     "sourceAddress": "",
        //                     "deaNumber": "MF3403273"
        //                 },
        //                 "pharmacy": {
        //                     "id": "6183619034873856",
        //                     "created": "2023-04-18T09:38:27.240+05:30",
        //                     "modified": "2023-04-18T09:38:27.240+05:30",
        //                     "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                     "sourceAddress": "3605 e thomas rd  phoenix,az 85018",
        //                     "location": {
        //                         "id": "5057719128031232",
        //                         "created": "2023-04-18T09:38:27.232+05:30",
        //                         "modified": "2023-04-18T09:38:27.240+05:30",
        //                         "line1": "3605 E Thomas Rd",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85018",
        //                         "locLat": 33.4799903,
        //                         "locLng": -112.0035764,
        //                         "locSource": "3605 e thomas rd  phoenix,az 85018"
        //                     },
        //                     "deaNumber": "AW0572481",
        //                     "isOurs": false
        //                 },
        //                 "ndcCode": "00228298311",
        //                 "patientName": "ULA PECK",
        //                 "patientDOB": "02/04/1939",
        //                 "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                 "isExpectedPatient": true,
        //                 "ndcOriginalSource": "00228298311",
        //                 "productCodeQualifier": "ND",
        //                 "ourPharmacy": false,
        //                 "ourProvider": false,
        //                 "startDate": "2023-03-12T10:30:00.000+05:30",
        //                 "endDate": "2023-04-10T10:30:00.000+05:30"
        //             },
        //             {
        //                 "id": "4751041283227648",
        //                 "created": "2024-01-26T08:36:49.002+05:30",
        //                 "modified": "2024-01-26T08:36:49.783+05:30",
        //                 "patientId": "6007697174429696",
        //                 "classification": "STIMULANT",
        //                 "fillDate": "2023-03-07T10:30:00.000+05:30",
        //                 "fillDateString": "Mar 7",
        //                 "productName": "VYVANSE, 50 MG, CAPSULE",
        //                 "displayName": "VYVANSE, 50 MG, CAPSULE",
        //                 "strengthDesc": "50 MG",
        //                 "dosage": 50,
        //                 "prescribedQty": 30,
        //                 "prescribedLen": 30,
        //                 "dailyME": 0,
        //                 "writtenDate": "2022-12-25T10:30:00.000+05:30",
        //                 "writtenDateString": "Dec 25",
        //                 "nrCode": "R",
        //                 "refillCount": 0,
        //                 "rxNum": " ",
        //                 "isActive": false,
        //                 "isOurs": false,
        //                 "prescriber": {
        //                     "id": "5998901081407488",
        //                     "created": "2023-04-18T09:38:30.934+05:30",
        //                     "modified": "2023-04-18T09:38:30.934+05:30",
        //                     "firstName": "MARNA",
        //                     "lastName": "WITT",
        //                     "sourceAddress": "5310 e high st  phoenix,az 85054",
        //                     "location": {
        //                         "id": "4873001174564864",
        //                         "created": "2023-04-18T09:38:30.926+05:30",
        //                         "modified": "2023-04-18T09:38:30.934+05:30",
        //                         "line1": "5310 E High St",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85054",
        //                         "locLat": 33.6765403,
        //                         "locLng": -111.9663621,
        //                         "locSource": "5310 e high st  phoenix,az 85054"
        //                     },
        //                     "deaNumber": "BS0422775"
        //                 },
        //                 "pharmacy": {
        //                     "id": "5585484709363712",
        //                     "created": "2023-04-18T09:38:22.545+05:30",
        //                     "modified": "2023-04-18T09:38:22.545+05:30",
        //                     "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                     "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                     "location": {
        //                         "id": "6148434662785024",
        //                         "created": "2023-04-18T09:38:22.535+05:30",
        //                         "modified": "2023-04-18T09:38:22.546+05:30",
        //                         "line1": "3402 N Central Ave",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85012",
        //                         "locLat": 33.4879117,
        //                         "locLng": -112.0745667,
        //                         "locSource": "3402 n central ave  phoenix,az 85012"
        //                     },
        //                     "deaNumber": "AW0572518",
        //                     "isOurs": false
        //                 },
        //                 "ndcCode": "59417010510",
        //                 "patientName": "ULA PECK",
        //                 "patientDOB": "02/04/1939",
        //                 "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                 "isExpectedPatient": true,
        //                 "ndcOriginalSource": "59417010510",
        //                 "productCodeQualifier": "ND",
        //                 "ourPharmacy": false,
        //                 "ourProvider": false,
        //                 "startDate": "2023-03-07T10:30:00.000+05:30",
        //                 "endDate": "2023-04-05T10:30:00.000+05:30"
        //             },
        //             {
        //                 "id": "5876941190070272",
        //                 "created": "2024-01-26T08:36:49.003+05:30",
        //                 "modified": "2024-01-26T08:36:49.784+05:30",
        //                 "patientId": "6007697174429696",
        //                 "classification": "OPIOID",
        //                 "fillDate": "2023-02-13T10:30:00.000+05:30",
        //                 "fillDateString": "Feb 13",
        //                 "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                 "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                 "strengthDesc": "10 MG;325 MG",
        //                 "dosage": 10,
        //                 "prescribedQty": 105,
        //                 "prescribedLen": 26,
        //                 "dailyME": 61,
        //                 "writtenDate": "2023-02-11T10:30:00.000+05:30",
        //                 "writtenDateString": "Feb 11",
        //                 "nrCode": "R",
        //                 "refillCount": 0,
        //                 "rxNum": " ",
        //                 "isActive": false,
        //                 "isOurs": false,
        //                 "prescriber": {
        //                     "id": "5435951127986176",
        //                     "created": "2023-04-18T09:38:31.034+05:30",
        //                     "modified": "2023-04-18T09:38:31.034+05:30",
        //                     "firstName": "BELKIS",
        //                     "lastName": "MUELLER",
        //                     "sourceAddress": "",
        //                     "deaNumber": "MH0820820"
        //                 },
        //                 "pharmacy": {
        //                     "id": "5585484709363712",
        //                     "created": "2023-04-18T09:38:22.545+05:30",
        //                     "modified": "2023-04-18T09:38:22.545+05:30",
        //                     "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                     "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                     "location": {
        //                         "id": "6148434662785024",
        //                         "created": "2023-04-18T09:38:22.535+05:30",
        //                         "modified": "2023-04-18T09:38:22.546+05:30",
        //                         "line1": "3402 N Central Ave",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85012",
        //                         "locLat": 33.4879117,
        //                         "locLng": -112.0745667,
        //                         "locSource": "3402 n central ave  phoenix,az 85012"
        //                     },
        //                     "deaNumber": "AW0572518",
        //                     "isOurs": false
        //                 },
        //                 "ndcCode": "00228298311",
        //                 "patientName": "ULA PECK",
        //                 "patientDOB": "02/04/1939",
        //                 "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                 "isExpectedPatient": true,
        //                 "ndcOriginalSource": "00228298311",
        //                 "productCodeQualifier": "ND",
        //                 "ourPharmacy": false,
        //                 "ourProvider": false,
        //                 "startDate": "2023-02-13T10:30:00.000+05:30",
        //                 "endDate": "2023-03-10T10:30:00.000+05:30"
        //             },
        //             {
        //                 "id": "4962147515760640",
        //                 "created": "2024-01-26T08:36:49.003+05:30",
        //                 "modified": "2024-01-26T08:36:49.785+05:30",
        //                 "patientId": "6007697174429696",
        //                 "classification": "OPIOID",
        //                 "fillDate": "2023-02-06T10:30:00.000+05:30",
        //                 "fillDateString": "Feb 6",
        //                 "productName": "OXYCONTIN, 10 MG, TABLET, FILM COATED, EXTENDED RELEASE",
        //                 "displayName": "OXYCONTIN, 10 MG, TABLET, FILM COAT",
        //                 "strengthDesc": "10 MG",
        //                 "dosage": 10,
        //                 "prescribedQty": 60,
        //                 "prescribedLen": 30,
        //                 "dailyME": 30,
        //                 "writtenDate": "2023-01-14T10:30:00.000+05:30",
        //                 "writtenDateString": "Jan 14",
        //                 "nrCode": "R",
        //                 "refillCount": 0,
        //                 "rxNum": " ",
        //                 "isActive": false,
        //                 "isOurs": false,
        //                 "prescriber": {
        //                     "id": "5435951127986176",
        //                     "created": "2023-04-18T09:38:31.034+05:30",
        //                     "modified": "2023-04-18T09:38:31.034+05:30",
        //                     "firstName": "BELKIS",
        //                     "lastName": "MUELLER",
        //                     "sourceAddress": "",
        //                     "deaNumber": "MH0820820"
        //                 },
        //                 "pharmacy": {
        //                     "id": "5585484709363712",
        //                     "created": "2023-04-18T09:38:22.545+05:30",
        //                     "modified": "2023-04-18T09:38:22.545+05:30",
        //                     "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                     "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                     "location": {
        //                         "id": "6148434662785024",
        //                         "created": "2023-04-18T09:38:22.535+05:30",
        //                         "modified": "2023-04-18T09:38:22.546+05:30",
        //                         "line1": "3402 N Central Ave",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85012",
        //                         "locLat": 33.4879117,
        //                         "locLng": -112.0745667,
        //                         "locSource": "3402 n central ave  phoenix,az 85012"
        //                     },
        //                     "deaNumber": "AW0572518",
        //                     "isOurs": false
        //                 },
        //                 "ndcCode": "59011041010",
        //                 "patientName": "ULA PECK",
        //                 "patientDOB": "02/04/1939",
        //                 "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                 "isExpectedPatient": true,
        //                 "ndcOriginalSource": "59011041010",
        //                 "productCodeQualifier": "ND",
        //                 "ourPharmacy": false,
        //                 "ourProvider": false,
        //                 "startDate": "2023-02-06T10:30:00.000+05:30",
        //                 "endDate": "2023-03-07T10:30:00.000+05:30"
        //             },
        //             {
        //                 "id": "5525097469181952",
        //                 "created": "2024-01-26T08:36:49.003+05:30",
        //                 "modified": "2024-01-26T08:36:49.786+05:30",
        //                 "patientId": "6007697174429696",
        //                 "classification": "STIMULANT",
        //                 "fillDate": "2023-02-05T10:30:00.000+05:30",
        //                 "fillDateString": "Feb 5",
        //                 "productName": "DEXTROAMPHETAMINE SACCHARATE, AMPHETAMINE ASPARTATE, DEXTROAMPHETAMINE SULFATE AND AMPHETAMINE SULFA, 5 M",
        //                 "displayName": "DEXTROAMPHETAMINE SACCHARATE, AMPHE",
        //                 "strengthDesc": "5 MG;5 MG;5 MG;5 MG",
        //                 "dosage": 5,
        //                 "prescribedQty": 30,
        //                 "prescribedLen": 30,
        //                 "dailyME": 0,
        //                 "writtenDate": "2022-12-25T10:30:00.000+05:30",
        //                 "writtenDateString": "Dec 25",
        //                 "nrCode": "R",
        //                 "refillCount": 0,
        //                 "rxNum": " ",
        //                 "isActive": false,
        //                 "isOurs": false,
        //                 "prescriber": {
        //                     "id": "4732263686209536",
        //                     "created": "2023-04-18T09:38:31.419+05:30",
        //                     "modified": "2023-04-18T09:38:31.419+05:30",
        //                     "firstName": "MARNA",
        //                     "lastName": "WITT",
        //                     "sourceAddress": "null n 53rd st  phoenix,az 85054",
        //                     "location": {
        //                         "id": "6561851034828800",
        //                         "created": "2023-04-18T09:38:31.412+05:30",
        //                         "modified": "2023-04-18T09:38:31.419+05:30",
        //                         "line1": "null N 53rd St",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85054",
        //                         "locLat": 33.6734909,
        //                         "locLng": -111.9683645,
        //                         "locSource": "null n 53rd st  phoenix,az 85054"
        //                     },
        //                     "deaNumber": "BS0422775"
        //                 },
        //                 "pharmacy": {
        //                     "id": "5585484709363712",
        //                     "created": "2023-04-18T09:38:22.545+05:30",
        //                     "modified": "2023-04-18T09:38:22.545+05:30",
        //                     "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                     "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                     "location": {
        //                         "id": "6148434662785024",
        //                         "created": "2023-04-18T09:38:22.535+05:30",
        //                         "modified": "2023-04-18T09:38:22.546+05:30",
        //                         "line1": "3402 N Central Ave",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85012",
        //                         "locLat": 33.4879117,
        //                         "locLng": -112.0745667,
        //                         "locSource": "3402 n central ave  phoenix,az 85012"
        //                     },
        //                     "deaNumber": "AW0572518",
        //                     "isOurs": false
        //                 },
        //                 "ndcCode": "00555097302",
        //                 "patientName": "ULA PECK",
        //                 "patientDOB": "02/04/1939",
        //                 "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                 "isExpectedPatient": true,
        //                 "ndcOriginalSource": "00555097302",
        //                 "productCodeQualifier": "ND",
        //                 "ourPharmacy": false,
        //                 "ourProvider": false,
        //                 "startDate": "2023-02-05T10:30:00.000+05:30",
        //                 "endDate": "2023-03-06T10:30:00.000+05:30"
        //             },
        //             {
        //                 "id": "4610303794872320",
        //                 "created": "2024-01-26T08:36:49.003+05:30",
        //                 "modified": "2024-01-26T08:36:49.787+05:30",
        //                 "patientId": "6007697174429696",
        //                 "classification": "STIMULANT",
        //                 "fillDate": "2023-02-05T10:30:00.000+05:30",
        //                 "fillDateString": "Feb 5",
        //                 "productName": "VYVANSE, 50 MG, CAPSULE",
        //                 "displayName": "VYVANSE, 50 MG, CAPSULE",
        //                 "strengthDesc": "50 MG",
        //                 "dosage": 50,
        //                 "prescribedQty": 30,
        //                 "prescribedLen": 30,
        //                 "dailyME": 0,
        //                 "writtenDate": "2022-12-25T10:30:00.000+05:30",
        //                 "writtenDateString": "Dec 25",
        //                 "nrCode": "R",
        //                 "refillCount": 0,
        //                 "rxNum": " ",
        //                 "isActive": false,
        //                 "isOurs": false,
        //                 "prescriber": {
        //                     "id": "5295213639630848",
        //                     "created": "2023-04-18T09:38:31.720+05:30",
        //                     "modified": "2023-04-18T09:38:31.720+05:30",
        //                     "firstName": "MARNA",
        //                     "lastName": "WITT",
        //                     "sourceAddress": "20855 n 53rd st  phoenix,az 85054",
        //                     "location": {
        //                         "id": "5858163593052160",
        //                         "created": "2023-04-18T09:38:31.711+05:30",
        //                         "modified": "2023-04-18T09:38:31.720+05:30",
        //                         "line1": "20855 N 53rd St",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85054",
        //                         "locLat": 33.6755749,
        //                         "locLng": -111.9665016,
        //                         "locSource": "20855 n 53rd st  phoenix,az 85054"
        //                     },
        //                     "deaNumber": "BS0422775"
        //                 },
        //                 "pharmacy": {
        //                     "id": "5585484709363712",
        //                     "created": "2023-04-18T09:38:22.545+05:30",
        //                     "modified": "2023-04-18T09:38:22.545+05:30",
        //                     "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                     "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                     "location": {
        //                         "id": "6148434662785024",
        //                         "created": "2023-04-18T09:38:22.535+05:30",
        //                         "modified": "2023-04-18T09:38:22.546+05:30",
        //                         "line1": "3402 N Central Ave",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85012",
        //                         "locLat": 33.4879117,
        //                         "locLng": -112.0745667,
        //                         "locSource": "3402 n central ave  phoenix,az 85012"
        //                     },
        //                     "deaNumber": "AW0572518",
        //                     "isOurs": false
        //                 },
        //                 "ndcCode": "59417010510",
        //                 "patientName": "ULA PECK",
        //                 "patientDOB": "02/04/1939",
        //                 "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                 "isExpectedPatient": true,
        //                 "ndcOriginalSource": "59417010510",
        //                 "productCodeQualifier": "ND",
        //                 "ourPharmacy": false,
        //                 "ourProvider": false,
        //                 "startDate": "2023-02-05T10:30:00.000+05:30",
        //                 "endDate": "2023-03-06T10:30:00.000+05:30"
        //             },
        //             {
        //                 "id": "5736203701714944",
        //                 "created": "2024-01-26T08:36:49.003+05:30",
        //                 "modified": "2024-01-26T08:36:49.788+05:30",
        //                 "patientId": "6007697174429696",
        //                 "classification": "OPIOID",
        //                 "fillDate": "2023-01-29T10:30:00.000+05:30",
        //                 "fillDateString": "Jan 29",
        //                 "productName": "OXYCODONE AND ACETAMINOPHEN, 325 MG;5 MG, TABLET",
        //                 "displayName": "OXYCODONE AND ACETAMINOPHEN, 325 MG",
        //                 "strengthDesc": "325 MG;5 MG",
        //                 "dosage": 5,
        //                 "prescribedQty": 20,
        //                 "prescribedLen": 5,
        //                 "dailyME": 30,
        //                 "writtenDate": "2023-01-29T10:30:00.000+05:30",
        //                 "writtenDateString": "Jan 29",
        //                 "nrCode": "R",
        //                 "refillCount": 0,
        //                 "rxNum": " ",
        //                 "isActive": false,
        //                 "isOurs": false,
        //                 "prescriber": {
        //                     "id": "5013738662920192",
        //                     "created": "2023-04-18T09:38:32.010+05:30",
        //                     "modified": "2023-04-18T09:38:32.010+05:30",
        //                     "firstName": "SHERISE",
        //                     "lastName": "ALSTON",
        //                     "sourceAddress": "1707 w camelback rd  phoenix,az 85015",
        //                     "location": {
        //                         "id": "6421113546473472",
        //                         "created": "2023-04-18T09:38:32.003+05:30",
        //                         "modified": "2023-04-18T09:38:32.011+05:30",
        //                         "line1": "1707 W Camelback Rd",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85015",
        //                         "locLat": 33.509006,
        //                         "locLng": -112.096277,
        //                         "locSource": "1707 w camelback rd  phoenix,az 85015"
        //                     },
        //                     "deaNumber": "FR4679734"
        //                 },
        //                 "pharmacy": {
        //                     "id": "5585484709363712",
        //                     "created": "2023-04-18T09:38:22.545+05:30",
        //                     "modified": "2023-04-18T09:38:22.545+05:30",
        //                     "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                     "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                     "location": {
        //                         "id": "6148434662785024",
        //                         "created": "2023-04-18T09:38:22.535+05:30",
        //                         "modified": "2023-04-18T09:38:22.546+05:30",
        //                         "line1": "3402 N Central Ave",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85012",
        //                         "locLat": 33.4879117,
        //                         "locLng": -112.0745667,
        //                         "locSource": "3402 n central ave  phoenix,az 85012"
        //                     },
        //                     "deaNumber": "AW0572518",
        //                     "isOurs": false
        //                 },
        //                 "ndcCode": "00228298150",
        //                 "patientName": "ULA PECK",
        //                 "patientDOB": "02/04/1939",
        //                 "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                 "isExpectedPatient": true,
        //                 "ndcOriginalSource": "00228298150",
        //                 "productCodeQualifier": "ND",
        //                 "ourPharmacy": false,
        //                 "ourProvider": false,
        //                 "startDate": "2023-01-29T10:30:00.000+05:30",
        //                 "endDate": "2023-02-02T10:30:00.000+05:30"
        //             }
        //         ],
        //         "alerts": [
        //             {
        //                 "id": "4522342864650240",
        //                 "created": "2024-01-26T08:36:49.498+05:30",
        //                 "modified": "2024-01-26T08:36:49.498+05:30",
        //                 "patientId": "6007697174429696",
        //                 "pmpReportId": "5313991236648960",
        //                 "alertType": "WriteFillGap",
        //                 "priority": 800,
        //                 "narrative": " on OXYCODONE AND ACETAMINOPHEN, 10 MG; (105@10 MG;325 MG ) from 10/29/2023 to 11/04/2023 (6 days)",
        //                 "typeString": "W/F Gap",
        //                 "prescriptions": [
        //                     {
        //                         "id": "6686181748113408",
        //                         "created": "2024-01-26T08:36:48.996+05:30",
        //                         "modified": "2024-01-26T08:36:49.760+05:30",
        //                         "patientId": "6007697174429696",
        //                         "classification": "OPIOID",
        //                         "fillDate": "2023-11-04T10:30:00.000+05:30",
        //                         "fillDateString": "Nov 4",
        //                         "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                         "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                         "strengthDesc": "10 MG;325 MG",
        //                         "dosage": 10,
        //                         "prescribedQty": 105,
        //                         "prescribedLen": 30,
        //                         "dailyME": 53,
        //                         "writtenDate": "2023-10-29T10:30:00.000+05:30",
        //                         "writtenDateString": "Oct 29",
        //                         "nrCode": "R",
        //                         "refillCount": 0,
        //                         "rxNum": " ",
        //                         "isActive": false,
        //                         "isOurs": false,
        //                         "prescriber": {
        //                             "id": "6113250290696192",
        //                             "created": "2023-04-18T09:38:24.873+05:30",
        //                             "modified": "2023-04-18T09:38:24.873+05:30",
        //                             "firstName": "MARQUITTA",
        //                             "lastName": "BROCK",
        //                             "sourceAddress": "3752 e indian school rd  phoenix,az 85018",
        //                             "location": {
        //                                 "id": "4987350383853568",
        //                                 "created": "2023-04-18T09:38:24.866+05:30",
        //                                 "modified": "2023-04-18T09:38:24.874+05:30",
        //                                 "line1": "3752 E Indian School Rd",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85018",
        //                                 "locLat": 33.4954195,
        //                                 "locLng": -112.0000832,
        //                                 "locSource": "3752 e indian school rd  phoenix,az 85018"
        //                             },
        //                             "deaNumber": "MP1714460"
        //                         },
        //                         "pharmacy": {
        //                             "id": "5585484709363712",
        //                             "created": "2023-04-18T09:38:22.545+05:30",
        //                             "modified": "2023-04-18T09:38:22.545+05:30",
        //                             "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                             "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                             "location": {
        //                                 "id": "6148434662785024",
        //                                 "created": "2023-04-18T09:38:22.535+05:30",
        //                                 "modified": "2023-04-18T09:38:22.546+05:30",
        //                                 "line1": "3402 N Central Ave",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85012",
        //                                 "locLat": 33.4879117,
        //                                 "locLng": -112.0745667,
        //                                 "locSource": "3402 n central ave  phoenix,az 85012"
        //                             },
        //                             "deaNumber": "AW0572518"
        //                         },
        //                         "ndcCode": "00228298311",
        //                         "patientName": "ULA PECK",
        //                         "patientDOB": "02/04/1939",
        //                         "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                         "isExpectedPatient": true,
        //                         "ndcOriginalSource": "00228298311",
        //                         "productCodeQualifier": "ND",
        //                         "ourPharmacy": false,
        //                         "ourProvider": false,
        //                         "startDate": "2023-11-04T10:30:00.000+05:30",
        //                         "endDate": "2023-12-03T10:30:00.000+05:30"
        //                     }
        //                 ],
        //                 "prescriptionIds": [
        //                     "6686181748113408"
        //                 ],
        //                 "startDate": "2023-10-29T10:30:00.000+05:30",
        //                 "endDate": "2023-11-04T10:30:00.000+05:30",
        //                 "alertTypeString": "WriteFillGap"
        //             },
        //             {
        //                 "id": "4663080353005568",
        //                 "created": "2024-01-26T08:36:49.499+05:30",
        //                 "modified": "2024-01-26T08:36:49.499+05:30",
        //                 "patientId": "6007697174429696",
        //                 "pmpReportId": "5313991236648960",
        //                 "description": "OPIOID : 113",
        //                 "alertType": "HighDose",
        //                 "priority": 200,
        //                 "narrative": " from 10/28/2023 to 10/30/2023",
        //                 "typeString": "High Dose",
        //                 "prescriptions": [
        //                     {
        //                         "id": "4539935050694656",
        //                         "created": "2024-01-26T08:36:48.997+05:30",
        //                         "modified": "2024-01-26T08:36:49.761+05:30",
        //                         "patientId": "6007697174429696",
        //                         "classification": "OPIOID",
        //                         "fillDate": "2023-10-05T10:30:00.000+05:30",
        //                         "fillDateString": "Oct 5",
        //                         "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                         "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                         "strengthDesc": "10 MG;325 MG",
        //                         "dosage": 10,
        //                         "prescribedQty": 105,
        //                         "prescribedLen": 30,
        //                         "dailyME": 53,
        //                         "writtenDate": "2023-10-01T10:30:00.000+05:30",
        //                         "writtenDateString": "Oct 1",
        //                         "nrCode": "R",
        //                         "refillCount": 0,
        //                         "rxNum": " ",
        //                         "isActive": false,
        //                         "isOurs": false,
        //                         "prescriber": {
        //                             "id": "6676200244117504",
        //                             "created": "2023-04-18T09:38:25.169+05:30",
        //                             "modified": "2023-04-18T09:38:25.169+05:30",
        //                             "firstName": "MARQUITTA",
        //                             "lastName": "BROCK",
        //                             "sourceAddress": "3749-3799 e indian school rd  phoenix,az 85018",
        //                             "location": {
        //                                 "id": "5550300337274880",
        //                                 "created": "2023-04-18T09:38:25.162+05:30",
        //                                 "modified": "2023-04-18T09:38:25.169+05:30",
        //                                 "line1": "3749 E Indian School Rd",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85018",
        //                                 "locLat": 33.49479520000001,
        //                                 "locLng": -112.0001152,
        //                                 "locSource": "3749-3799 e indian school rd  phoenix,az 85018"
        //                             },
        //                             "deaNumber": "MP1714460"
        //                         },
        //                         "pharmacy": {
        //                             "id": "5585484709363712",
        //                             "created": "2023-04-18T09:38:22.545+05:30",
        //                             "modified": "2023-04-18T09:38:22.545+05:30",
        //                             "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                             "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                             "location": {
        //                                 "id": "6148434662785024",
        //                                 "created": "2023-04-18T09:38:22.535+05:30",
        //                                 "modified": "2023-04-18T09:38:22.546+05:30",
        //                                 "line1": "3402 N Central Ave",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85012",
        //                                 "locLat": 33.4879117,
        //                                 "locLng": -112.0745667,
        //                                 "locSource": "3402 n central ave  phoenix,az 85012"
        //                             },
        //                             "deaNumber": "AW0572518"
        //                         },
        //                         "ndcCode": "00228298311",
        //                         "patientName": "ULA PECK",
        //                         "patientDOB": "02/04/1939",
        //                         "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                         "isExpectedPatient": true,
        //                         "ndcOriginalSource": "00228298311",
        //                         "productCodeQualifier": "ND",
        //                         "ourPharmacy": false,
        //                         "ourProvider": false,
        //                         "startDate": "2023-10-05T10:30:00.000+05:30",
        //                         "endDate": "2023-11-03T10:30:00.000+05:30"
        //                     },
        //                     {
        //                         "id": "5665834957537280",
        //                         "created": "2024-01-26T08:36:48.997+05:30",
        //                         "modified": "2024-01-26T08:36:49.761+05:30",
        //                         "patientId": "6007697174429696",
        //                         "classification": "OPIOID",
        //                         "fillDate": "2023-10-01T10:30:00.000+05:30",
        //                         "fillDateString": "Oct 1",
        //                         "productName": "OPANA ER, 10 MG, TABLET, EXTENDED RELEASE",
        //                         "displayName": "OPANA ER, 10 MG, TABLET, EXTENDED R",
        //                         "strengthDesc": "10 MG",
        //                         "dosage": 10,
        //                         "prescribedQty": 60,
        //                         "prescribedLen": 30,
        //                         "dailyME": 60,
        //                         "writtenDate": "2023-10-01T10:30:00.000+05:30",
        //                         "writtenDateString": "Oct 1",
        //                         "nrCode": "R",
        //                         "refillCount": 0,
        //                         "rxNum": " ",
        //                         "isActive": false,
        //                         "isOurs": false,
        //                         "prescriber": {
        //                             "id": "5761406569807872",
        //                             "created": "2023-04-18T09:38:25.451+05:30",
        //                             "modified": "2023-04-18T09:38:25.451+05:30",
        //                             "firstName": "MADIE",
        //                             "lastName": "WHITNEY",
        //                             "sourceAddress": "3380 n scottsdale rd  scottsdale,az 85251",
        //                             "location": {
        //                                 "id": "4635506662965248",
        //                                 "created": "2023-04-18T09:38:25.444+05:30",
        //                                 "modified": "2023-04-18T09:38:25.451+05:30",
        //                                 "line1": "3380 N Scottsdale Rd",
        //                                 "city": "Scottsdale",
        //                                 "state": "AZ",
        //                                 "zip": "85251",
        //                                 "locLat": 33.48733199999999,
        //                                 "locLng": -111.9270596,
        //                                 "locSource": "3380 n scottsdale rd  scottsdale,az 85251"
        //                             },
        //                             "deaNumber": "BD7113234"
        //                         },
        //                         "pharmacy": {
        //                             "id": "6324356523229184",
        //                             "created": "2023-04-18T09:38:25.757+05:30",
        //                             "modified": "2023-04-18T09:38:25.757+05:30",
        //                             "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                             "sourceAddress": "5895 w. peoria avenue  glendale,az 85302",
        //                             "location": {
        //                                 "id": "5198456616386560",
        //                                 "created": "2023-04-18T09:38:25.748+05:30",
        //                                 "modified": "2023-04-18T09:38:25.757+05:30",
        //                                 "line1": "5895 W Peoria Ave",
        //                                 "city": "Glendale",
        //                                 "state": "AZ",
        //                                 "zip": "85302",
        //                                 "locLat": 33.5812761,
        //                                 "locLng": -112.1854129,
        //                                 "locSource": "5895 w. peoria avenue  glendale,az 85302"
        //                             },
        //                             "deaNumber": "BW5452228"
        //                         },
        //                         "ndcCode": "63481081460",
        //                         "patientName": "ULA PECK",
        //                         "patientDOB": "02/04/1939",
        //                         "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                         "isExpectedPatient": true,
        //                         "ndcOriginalSource": "63481081460",
        //                         "productCodeQualifier": "ND",
        //                         "ourPharmacy": false,
        //                         "ourProvider": false,
        //                         "startDate": "2023-10-01T10:30:00.000+05:30",
        //                         "endDate": "2023-10-30T10:30:00.000+05:30"
        //                     }
        //                 ],
        //                 "prescriptionIds": [
        //                     "4539935050694656",
        //                     "5665834957537280"
        //                 ],
        //                 "startDate": "2023-10-28T00:00:00.000+05:30",
        //                 "endDate": "2023-10-30T00:00:00.000+05:30",
        //                 "alertTypeString": "HighDose"
        //             },
        //             {
        //                 "id": "4803817841360896",
        //                 "created": "2024-01-26T08:36:49.499+05:30",
        //                 "modified": "2024-01-26T08:36:49.499+05:30",
        //                 "patientId": "6007697174429696",
        //                 "pmpReportId": "5313991236648960",
        //                 "description": "Prescriber: ,  with DEA: BC7786140",
        //                 "alertType": "NotOurPrescription",
        //                 "alertSubtype": "Prescriber",
        //                 "priority": 100,
        //                 "narrative": "Prescriber: ,  with DEA: BC7786140 for OXYCODONE HYDROCHLORIDE, 5 MG, TABL",
        //                 "typeString": "Not Our Prescriber",
        //                 "prescriptions": [
        //                     {
        //                         "id": "5278806864560128",
        //                         "created": "2024-01-26T08:36:48.994+05:30",
        //                         "modified": "2024-01-26T08:36:49.756+05:30",
        //                         "patientId": "6007697174429696",
        //                         "classification": "OPIOID",
        //                         "fillDate": "2023-12-30T10:30:00.000+05:30",
        //                         "fillDateString": "Dec 30",
        //                         "productName": "OXYCODONE HYDROCHLORIDE, 5 MG, TABLET",
        //                         "displayName": "OXYCODONE HYDROCHLORIDE, 5 MG, TABL",
        //                         "strengthDesc": "5 MG",
        //                         "dosage": 5,
        //                         "prescribedQty": 60,
        //                         "prescribedLen": 2,
        //                         "dailyME": 225,
        //                         "writtenDate": "2023-12-26T10:30:00.000+05:30",
        //                         "writtenDateString": "Dec 26",
        //                         "nrCode": "R",
        //                         "refillCount": 0,
        //                         "rxNum": " ",
        //                         "isActive": false,
        //                         "isOurs": false,
        //                         "prescriber": {
        //                             "id": "5128087872208896",
        //                             "created": "2023-04-18T09:38:23.147+05:30",
        //                             "modified": "2023-04-18T09:38:23.147+05:30",
        //                             "firstName": "",
        //                             "lastName": "",
        //                             "sourceAddress": "5022 n 17th ave  phoenix,az 85015",
        //                             "location": {
        //                                 "id": "5691037825630208",
        //                                 "created": "2023-04-18T09:38:23.141+05:30",
        //                                 "modified": "2023-04-18T09:38:23.148+05:30",
        //                                 "line1": "5022 N 17th Ave",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85015",
        //                                 "locLat": 33.5106346,
        //                                 "locLng": -112.0963149,
        //                                 "locSource": "5022 n 17th ave  phoenix,az 85015"
        //                             },
        //                             "deaNumber": "BC7786140"
        //                         },
        //                         "pharmacy": {
        //                             "id": "5585484709363712",
        //                             "created": "2023-04-18T09:38:22.545+05:30",
        //                             "modified": "2023-04-18T09:38:22.545+05:30",
        //                             "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                             "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                             "location": {
        //                                 "id": "6148434662785024",
        //                                 "created": "2023-04-18T09:38:22.535+05:30",
        //                                 "modified": "2023-04-18T09:38:22.546+05:30",
        //                                 "line1": "3402 N Central Ave",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85012",
        //                                 "locLat": 33.4879117,
        //                                 "locLng": -112.0745667,
        //                                 "locSource": "3402 n central ave  phoenix,az 85012"
        //                             },
        //                             "deaNumber": "AW0572518"
        //                         },
        //                         "ndcCode": "00406055201",
        //                         "patientName": "ULA PECK",
        //                         "patientDOB": "02/04/1939",
        //                         "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                         "isExpectedPatient": true,
        //                         "ndcOriginalSource": "00406055201",
        //                         "productCodeQualifier": "ND",
        //                         "ourPharmacy": false,
        //                         "ourProvider": false,
        //                         "startDate": "2023-12-30T10:30:00.000+05:30",
        //                         "endDate": "2023-12-31T10:30:00.000+05:30"
        //                     }
        //                 ],
        //                 "prescriptionIds": [
        //                     "5278806864560128"
        //                 ],
        //                 "startDate": "2023-12-26T10:30:00.000+05:30",
        //                 "endDate": "2023-12-30T10:30:00.000+05:30",
        //                 "alertTypeString": "NotOurPrescription",
        //                 "alertSubtypeString": "Prescriber"
        //             },
        //             {
        //                 "id": "5032516259938304",
        //                 "created": "2024-01-26T08:36:49.498+05:30",
        //                 "modified": "2024-01-26T08:36:49.498+05:30",
        //                 "patientId": "6007697174429696",
        //                 "pmpReportId": "5313991236648960",
        //                 "alertType": "WriteFillGap",
        //                 "priority": 800,
        //                 "narrative": " on OXYCODONE AND ACETAMINOPHEN, 10 MG; (105@10 MG;325 MG ) from 12/23/2023 to 01/05/2024 (13 days)",
        //                 "typeString": "W/F Gap",
        //                 "prescriptions": [
        //                     {
        //                         "id": "5841756817981440",
        //                         "created": "2024-01-26T08:36:48.994+05:30",
        //                         "modified": "2024-01-26T08:36:49.755+05:30",
        //                         "patientId": "6007697174429696",
        //                         "classification": "OPIOID",
        //                         "fillDate": "2024-01-05T10:30:00.000+05:30",
        //                         "fillDateString": "Jan 5",
        //                         "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                         "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                         "strengthDesc": "10 MG;325 MG",
        //                         "dosage": 10,
        //                         "prescribedQty": 105,
        //                         "prescribedLen": 30,
        //                         "dailyME": 53,
        //                         "writtenDate": "2023-12-23T10:30:00.000+05:30",
        //                         "writtenDateString": "Dec 23",
        //                         "nrCode": "R",
        //                         "refillCount": 0,
        //                         "rxNum": " ",
        //                         "isActive": true,
        //                         "isOurs": false,
        //                         "prescriber": {
        //                             "id": "4565137918787584",
        //                             "created": "2023-04-18T09:38:22.853+05:30",
        //                             "modified": "2023-04-18T09:38:22.853+05:30",
        //                             "firstName": "TAWNYA",
        //                             "lastName": "NUNEZ",
        //                             "sourceAddress": "3815 n brown ave  scottsdale,az 85251",
        //                             "location": {
        //                                 "id": "6711384616206336",
        //                                 "created": "2023-04-18T09:38:22.846+05:30",
        //                                 "modified": "2023-04-18T09:38:22.854+05:30",
        //                                 "line1": "3815 N Brown Ave",
        //                                 "city": "Scottsdale",
        //                                 "state": "AZ",
        //                                 "zip": "85251",
        //                                 "locLat": 33.4918372,
        //                                 "locLng": -111.9242563,
        //                                 "locSource": "3815 n brown ave  scottsdale,az 85251"
        //                             },
        //                             "deaNumber": "MH3849176"
        //                         },
        //                         "pharmacy": {
        //                             "id": "5585484709363712",
        //                             "created": "2023-04-18T09:38:22.545+05:30",
        //                             "modified": "2023-04-18T09:38:22.545+05:30",
        //                             "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                             "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                             "location": {
        //                                 "id": "6148434662785024",
        //                                 "created": "2023-04-18T09:38:22.535+05:30",
        //                                 "modified": "2023-04-18T09:38:22.546+05:30",
        //                                 "line1": "3402 N Central Ave",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85012",
        //                                 "locLat": 33.4879117,
        //                                 "locLng": -112.0745667,
        //                                 "locSource": "3402 n central ave  phoenix,az 85012"
        //                             },
        //                             "deaNumber": "AW0572518"
        //                         },
        //                         "ndcCode": "00228298311",
        //                         "patientName": "ULA PECK",
        //                         "patientDOB": "02/04/1939",
        //                         "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                         "isExpectedPatient": true,
        //                         "ndcOriginalSource": "00228298311",
        //                         "productCodeQualifier": "ND",
        //                         "ourPharmacy": false,
        //                         "ourProvider": false,
        //                         "startDate": "2024-01-05T10:30:00.000+05:30",
        //                         "endDate": "2024-02-03T10:30:00.000+05:30"
        //                     }
        //                 ],
        //                 "prescriptionIds": [
        //                     "5841756817981440"
        //                 ],
        //                 "startDate": "2023-12-23T10:30:00.000+05:30",
        //                 "endDate": "2024-01-05T10:30:00.000+05:30",
        //                 "alertTypeString": "WriteFillGap"
        //             },
        //             {
        //                 "id": "5085292818071552",
        //                 "created": "2024-01-26T08:36:49.498+05:30",
        //                 "modified": "2024-01-26T08:36:49.498+05:30",
        //                 "patientId": "6007697174429696",
        //                 "pmpReportId": "5313991236648960",
        //                 "description": "Prescriber: WITT, MARNA with DEA: BS0422775",
        //                 "alertType": "NotOurPrescription",
        //                 "alertSubtype": "Prescriber",
        //                 "priority": 100,
        //                 "narrative": "Prescriber: WITT, MARNA with DEA: BS0422775 for 2 Prescriptions.",
        //                 "typeString": "Not Our Prescriber",
        //                 "prescriptions": [
        //                     {
        //                         "id": "4997331887849472",
        //                         "created": "2024-01-26T08:36:48.995+05:30",
        //                         "modified": "2024-01-26T08:36:49.758+05:30",
        //                         "patientId": "6007697174429696",
        //                         "classification": "STIMULANT",
        //                         "fillDate": "2023-11-15T10:30:00.000+05:30",
        //                         "fillDateString": "Nov 15",
        //                         "productName": "VYVANSE, 50 MG, CAPSULE",
        //                         "displayName": "VYVANSE, 50 MG, CAPSULE",
        //                         "strengthDesc": "50 MG",
        //                         "dosage": 50,
        //                         "prescribedQty": 30,
        //                         "prescribedLen": 30,
        //                         "dailyME": 0,
        //                         "writtenDate": "2023-09-22T10:30:00.000+05:30",
        //                         "writtenDateString": "Sep 22",
        //                         "nrCode": "R",
        //                         "refillCount": 0,
        //                         "rxNum": " ",
        //                         "isActive": false,
        //                         "isOurs": false,
        //                         "prescriber": {
        //                             "id": "6535462755762176",
        //                             "created": "2023-04-18T09:38:23.938+05:30",
        //                             "modified": "2023-04-18T09:38:23.938+05:30",
        //                             "firstName": "MARNA",
        //                             "lastName": "WITT",
        //                             "sourceAddress": "718 e union hills dr  phoenix,az 85024",
        //                             "location": {
        //                                 "id": "5409562848919552",
        //                                 "created": "2023-04-18T09:38:23.930+05:30",
        //                                 "modified": "2023-04-18T09:38:23.939+05:30",
        //                                 "line1": "718 E Union Hills Dr",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85024",
        //                                 "locLat": 33.6561533,
        //                                 "locLng": -112.0637055,
        //                                 "locSource": "718 e union hills dr  phoenix,az 85024"
        //                             },
        //                             "deaNumber": "BS0422775"
        //                         },
        //                         "pharmacy": {
        //                             "id": "5585484709363712",
        //                             "created": "2023-04-18T09:38:22.545+05:30",
        //                             "modified": "2023-04-18T09:38:22.545+05:30",
        //                             "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                             "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                             "location": {
        //                                 "id": "6148434662785024",
        //                                 "created": "2023-04-18T09:38:22.535+05:30",
        //                                 "modified": "2023-04-18T09:38:22.546+05:30",
        //                                 "line1": "3402 N Central Ave",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85012",
        //                                 "locLat": 33.4879117,
        //                                 "locLng": -112.0745667,
        //                                 "locSource": "3402 n central ave  phoenix,az 85012"
        //                             },
        //                             "deaNumber": "AW0572518"
        //                         },
        //                         "ndcCode": "59417010510",
        //                         "patientName": "ULA PECK",
        //                         "patientDOB": "02/04/1939",
        //                         "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                         "isExpectedPatient": true,
        //                         "ndcOriginalSource": "59417010510",
        //                         "productCodeQualifier": "ND",
        //                         "ourPharmacy": false,
        //                         "ourProvider": false,
        //                         "startDate": "2023-11-15T10:30:00.000+05:30",
        //                         "endDate": "2023-12-14T10:30:00.000+05:30"
        //                     },
        //                     {
        //                         "id": "6123231794692096",
        //                         "created": "2024-01-26T08:36:48.996+05:30",
        //                         "modified": "2024-01-26T08:36:49.759+05:30",
        //                         "patientId": "6007697174429696",
        //                         "classification": "STIMULANT",
        //                         "fillDate": "2023-11-14T10:30:00.000+05:30",
        //                         "fillDateString": "Nov 14",
        //                         "productName": "DEXTROAMPHETAMINE SACCHARATE, AMPHETAMINE ASPARTATE, DEXTROAMPHETAMINE SULFATE AND AMPHETAMINE SULFA, 5 M",
        //                         "displayName": "DEXTROAMPHETAMINE SACCHARATE, AMPHE",
        //                         "strengthDesc": "5 MG;5 MG;5 MG;5 MG",
        //                         "dosage": 5,
        //                         "prescribedQty": 30,
        //                         "prescribedLen": 30,
        //                         "dailyME": 0,
        //                         "writtenDate": "2023-09-22T10:30:00.000+05:30",
        //                         "writtenDateString": "Sep 22",
        //                         "nrCode": "R",
        //                         "refillCount": 0,
        //                         "rxNum": " ",
        //                         "isActive": false,
        //                         "isOurs": false,
        //                         "prescriber": {
        //                             "id": "5831775313985536",
        //                             "created": "2023-04-18T09:38:24.255+05:30",
        //                             "modified": "2023-04-18T09:38:24.255+05:30",
        //                             "firstName": "MARNA",
        //                             "lastName": "WITT",
        //                             "sourceAddress": "765 e rosemonte dr  phoenix,az 85024",
        //                             "location": {
        //                                 "id": "4705875407142912",
        //                                 "created": "2023-04-18T09:38:24.246+05:30",
        //                                 "modified": "2023-04-18T09:38:24.255+05:30",
        //                                 "line1": "765 E Rosemonte Dr",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85024",
        //                                 "locLat": 33.6567816,
        //                                 "locLng": -112.0631233,
        //                                 "locSource": "765 e rosemonte dr  phoenix,az 85024"
        //                             },
        //                             "deaNumber": "BS0422775"
        //                         },
        //                         "pharmacy": {
        //                             "id": "5585484709363712",
        //                             "created": "2023-04-18T09:38:22.545+05:30",
        //                             "modified": "2023-04-18T09:38:22.545+05:30",
        //                             "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                             "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                             "location": {
        //                                 "id": "6148434662785024",
        //                                 "created": "2023-04-18T09:38:22.535+05:30",
        //                                 "modified": "2023-04-18T09:38:22.546+05:30",
        //                                 "line1": "3402 N Central Ave",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85012",
        //                                 "locLat": 33.4879117,
        //                                 "locLng": -112.0745667,
        //                                 "locSource": "3402 n central ave  phoenix,az 85012"
        //                             },
        //                             "deaNumber": "AW0572518"
        //                         },
        //                         "ndcCode": "00555097302",
        //                         "patientName": "ULA PECK",
        //                         "patientDOB": "02/04/1939",
        //                         "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                         "isExpectedPatient": true,
        //                         "ndcOriginalSource": "00555097302",
        //                         "productCodeQualifier": "ND",
        //                         "ourPharmacy": false,
        //                         "ourProvider": false,
        //                         "startDate": "2023-11-14T10:30:00.000+05:30",
        //                         "endDate": "2023-12-13T10:30:00.000+05:30"
        //                     }
        //                 ],
        //                 "prescriptionIds": [
        //                     "4997331887849472",
        //                     "6123231794692096"
        //                 ],
        //                 "startDate": "2023-09-22T10:30:00.000+05:30",
        //                 "endDate": "2023-11-15T10:30:00.000+05:30",
        //                 "alertTypeString": "NotOurPrescription",
        //                 "alertSubtypeString": "Prescriber"
        //             },
        //             {
        //                 "id": "5226030306426880",
        //                 "created": "2024-01-26T08:36:49.499+05:30",
        //                 "modified": "2024-01-26T08:36:49.499+05:30",
        //                 "patientId": "6007697174429696",
        //                 "pmpReportId": "5313991236648960",
        //                 "alertType": "MultiplePrescribers",
        //                 "alertSubtype": "Opioid",
        //                 "priority": 400,
        //                 "narrative": " (Opioid) from 12/30/2023 to 12/31/2023",
        //                 "typeString": "Multiple Prescribers",
        //                 "prescriptions": [
        //                     {
        //                         "id": "5278806864560128",
        //                         "created": "2024-01-26T08:36:48.994+05:30",
        //                         "modified": "2024-01-26T08:36:49.756+05:30",
        //                         "patientId": "6007697174429696",
        //                         "classification": "OPIOID",
        //                         "fillDate": "2023-12-30T10:30:00.000+05:30",
        //                         "fillDateString": "Dec 30",
        //                         "productName": "OXYCODONE HYDROCHLORIDE, 5 MG, TABLET",
        //                         "displayName": "OXYCODONE HYDROCHLORIDE, 5 MG, TABL",
        //                         "strengthDesc": "5 MG",
        //                         "dosage": 5,
        //                         "prescribedQty": 60,
        //                         "prescribedLen": 2,
        //                         "dailyME": 225,
        //                         "writtenDate": "2023-12-26T10:30:00.000+05:30",
        //                         "writtenDateString": "Dec 26",
        //                         "nrCode": "R",
        //                         "refillCount": 0,
        //                         "rxNum": " ",
        //                         "isActive": false,
        //                         "isOurs": false,
        //                         "prescriber": {
        //                             "id": "5128087872208896",
        //                             "created": "2023-04-18T09:38:23.147+05:30",
        //                             "modified": "2023-04-18T09:38:23.147+05:30",
        //                             "firstName": "",
        //                             "lastName": "",
        //                             "sourceAddress": "5022 n 17th ave  phoenix,az 85015",
        //                             "location": {
        //                                 "id": "5691037825630208",
        //                                 "created": "2023-04-18T09:38:23.141+05:30",
        //                                 "modified": "2023-04-18T09:38:23.148+05:30",
        //                                 "line1": "5022 N 17th Ave",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85015",
        //                                 "locLat": 33.5106346,
        //                                 "locLng": -112.0963149,
        //                                 "locSource": "5022 n 17th ave  phoenix,az 85015"
        //                             },
        //                             "deaNumber": "BC7786140"
        //                         },
        //                         "pharmacy": {
        //                             "id": "5585484709363712",
        //                             "created": "2023-04-18T09:38:22.545+05:30",
        //                             "modified": "2023-04-18T09:38:22.545+05:30",
        //                             "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                             "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                             "location": {
        //                                 "id": "6148434662785024",
        //                                 "created": "2023-04-18T09:38:22.535+05:30",
        //                                 "modified": "2023-04-18T09:38:22.546+05:30",
        //                                 "line1": "3402 N Central Ave",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85012",
        //                                 "locLat": 33.4879117,
        //                                 "locLng": -112.0745667,
        //                                 "locSource": "3402 n central ave  phoenix,az 85012"
        //                             },
        //                             "deaNumber": "AW0572518"
        //                         },
        //                         "ndcCode": "00406055201",
        //                         "patientName": "ULA PECK",
        //                         "patientDOB": "02/04/1939",
        //                         "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                         "isExpectedPatient": true,
        //                         "ndcOriginalSource": "00406055201",
        //                         "productCodeQualifier": "ND",
        //                         "ourPharmacy": false,
        //                         "ourProvider": false,
        //                         "startDate": "2023-12-30T10:30:00.000+05:30",
        //                         "endDate": "2023-12-31T10:30:00.000+05:30"
        //                     },
        //                     {
        //                         "id": "6404706771402752",
        //                         "created": "2024-01-26T08:36:48.995+05:30",
        //                         "modified": "2024-01-26T08:36:49.757+05:30",
        //                         "patientId": "6007697174429696",
        //                         "classification": "OPIOID",
        //                         "fillDate": "2023-12-04T10:30:00.000+05:30",
        //                         "fillDateString": "Dec 4",
        //                         "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                         "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                         "strengthDesc": "10 MG;325 MG",
        //                         "dosage": 10,
        //                         "prescribedQty": 105,
        //                         "prescribedLen": 30,
        //                         "dailyME": 53,
        //                         "writtenDate": "2023-12-03T10:30:00.000+05:30",
        //                         "writtenDateString": "Dec 3",
        //                         "nrCode": "R",
        //                         "refillCount": 0,
        //                         "rxNum": " ",
        //                         "isActive": false,
        //                         "isOurs": false,
        //                         "prescriber": {
        //                             "id": "5972512802340864",
        //                             "created": "2023-04-18T09:38:23.605+05:30",
        //                             "modified": "2023-04-18T09:38:23.605+05:30",
        //                             "firstName": "MARQUITTA",
        //                             "lastName": "BROCK",
        //                             "sourceAddress": "3817 n brown ave  scottsdale,az 85251",
        //                             "location": {
        //                                 "id": "4846612895498240",
        //                                 "created": "2023-04-18T09:38:23.596+05:30",
        //                                 "modified": "2023-04-18T09:38:23.605+05:30",
        //                                 "line1": "3817 N Brown Ave",
        //                                 "city": "Scottsdale",
        //                                 "state": "AZ",
        //                                 "zip": "85251",
        //                                 "locLat": 33.4920038,
        //                                 "locLng": -111.9242563,
        //                                 "locSource": "3817 n brown ave  scottsdale,az 85251"
        //                             },
        //                             "deaNumber": "MP1714460"
        //                         },
        //                         "pharmacy": {
        //                             "id": "5585484709363712",
        //                             "created": "2023-04-18T09:38:22.545+05:30",
        //                             "modified": "2023-04-18T09:38:22.545+05:30",
        //                             "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                             "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                             "location": {
        //                                 "id": "6148434662785024",
        //                                 "created": "2023-04-18T09:38:22.535+05:30",
        //                                 "modified": "2023-04-18T09:38:22.546+05:30",
        //                                 "line1": "3402 N Central Ave",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85012",
        //                                 "locLat": 33.4879117,
        //                                 "locLng": -112.0745667,
        //                                 "locSource": "3402 n central ave  phoenix,az 85012"
        //                             },
        //                             "deaNumber": "AW0572518"
        //                         },
        //                         "ndcCode": "00228298311",
        //                         "patientName": "ULA PECK",
        //                         "patientDOB": "02/04/1939",
        //                         "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                         "isExpectedPatient": true,
        //                         "ndcOriginalSource": "00228298311",
        //                         "productCodeQualifier": "ND",
        //                         "ourPharmacy": false,
        //                         "ourProvider": false,
        //                         "startDate": "2023-12-04T10:30:00.000+05:30",
        //                         "endDate": "2024-01-02T10:30:00.000+05:30"
        //                     }
        //                 ],
        //                 "prescriptionIds": [
        //                     "5278806864560128",
        //                     "6404706771402752"
        //                 ],
        //                 "startDate": "2023-12-30T00:00:00.000+05:30",
        //                 "endDate": "2023-12-31T00:00:00.000+05:30",
        //                 "alertTypeString": "MultiplePrescribers",
        //                 "alertSubtypeString": "Opioid"
        //             },
        //             {
        //                 "id": "5366767794782208",
        //                 "created": "2024-01-26T08:36:49.499+05:30",
        //                 "modified": "2024-01-26T08:36:49.499+05:30",
        //                 "patientId": "6007697174429696",
        //                 "pmpReportId": "5313991236648960",
        //                 "alertType": "MultiplePrescribers",
        //                 "alertSubtype": "Opioid",
        //                 "priority": 400,
        //                 "narrative": " (Opioid) from 10/28/2023 to 10/30/2023",
        //                 "typeString": "Multiple Prescribers",
        //                 "prescriptions": [
        //                     {
        //                         "id": "4539935050694656",
        //                         "created": "2024-01-26T08:36:48.997+05:30",
        //                         "modified": "2024-01-26T08:36:49.761+05:30",
        //                         "patientId": "6007697174429696",
        //                         "classification": "OPIOID",
        //                         "fillDate": "2023-10-05T10:30:00.000+05:30",
        //                         "fillDateString": "Oct 5",
        //                         "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                         "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                         "strengthDesc": "10 MG;325 MG",
        //                         "dosage": 10,
        //                         "prescribedQty": 105,
        //                         "prescribedLen": 30,
        //                         "dailyME": 53,
        //                         "writtenDate": "2023-10-01T10:30:00.000+05:30",
        //                         "writtenDateString": "Oct 1",
        //                         "nrCode": "R",
        //                         "refillCount": 0,
        //                         "rxNum": " ",
        //                         "isActive": false,
        //                         "isOurs": false,
        //                         "prescriber": {
        //                             "id": "6676200244117504",
        //                             "created": "2023-04-18T09:38:25.169+05:30",
        //                             "modified": "2023-04-18T09:38:25.169+05:30",
        //                             "firstName": "MARQUITTA",
        //                             "lastName": "BROCK",
        //                             "sourceAddress": "3749-3799 e indian school rd  phoenix,az 85018",
        //                             "location": {
        //                                 "id": "5550300337274880",
        //                                 "created": "2023-04-18T09:38:25.162+05:30",
        //                                 "modified": "2023-04-18T09:38:25.169+05:30",
        //                                 "line1": "3749 E Indian School Rd",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85018",
        //                                 "locLat": 33.49479520000001,
        //                                 "locLng": -112.0001152,
        //                                 "locSource": "3749-3799 e indian school rd  phoenix,az 85018"
        //                             },
        //                             "deaNumber": "MP1714460"
        //                         },
        //                         "pharmacy": {
        //                             "id": "5585484709363712",
        //                             "created": "2023-04-18T09:38:22.545+05:30",
        //                             "modified": "2023-04-18T09:38:22.545+05:30",
        //                             "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                             "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                             "location": {
        //                                 "id": "6148434662785024",
        //                                 "created": "2023-04-18T09:38:22.535+05:30",
        //                                 "modified": "2023-04-18T09:38:22.546+05:30",
        //                                 "line1": "3402 N Central Ave",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85012",
        //                                 "locLat": 33.4879117,
        //                                 "locLng": -112.0745667,
        //                                 "locSource": "3402 n central ave  phoenix,az 85012"
        //                             },
        //                             "deaNumber": "AW0572518"
        //                         },
        //                         "ndcCode": "00228298311",
        //                         "patientName": "ULA PECK",
        //                         "patientDOB": "02/04/1939",
        //                         "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                         "isExpectedPatient": true,
        //                         "ndcOriginalSource": "00228298311",
        //                         "productCodeQualifier": "ND",
        //                         "ourPharmacy": false,
        //                         "ourProvider": false,
        //                         "startDate": "2023-10-05T10:30:00.000+05:30",
        //                         "endDate": "2023-11-03T10:30:00.000+05:30"
        //                     },
        //                     {
        //                         "id": "5665834957537280",
        //                         "created": "2024-01-26T08:36:48.997+05:30",
        //                         "modified": "2024-01-26T08:36:49.761+05:30",
        //                         "patientId": "6007697174429696",
        //                         "classification": "OPIOID",
        //                         "fillDate": "2023-10-01T10:30:00.000+05:30",
        //                         "fillDateString": "Oct 1",
        //                         "productName": "OPANA ER, 10 MG, TABLET, EXTENDED RELEASE",
        //                         "displayName": "OPANA ER, 10 MG, TABLET, EXTENDED R",
        //                         "strengthDesc": "10 MG",
        //                         "dosage": 10,
        //                         "prescribedQty": 60,
        //                         "prescribedLen": 30,
        //                         "dailyME": 60,
        //                         "writtenDate": "2023-10-01T10:30:00.000+05:30",
        //                         "writtenDateString": "Oct 1",
        //                         "nrCode": "R",
        //                         "refillCount": 0,
        //                         "rxNum": " ",
        //                         "isActive": false,
        //                         "isOurs": false,
        //                         "prescriber": {
        //                             "id": "5761406569807872",
        //                             "created": "2023-04-18T09:38:25.451+05:30",
        //                             "modified": "2023-04-18T09:38:25.451+05:30",
        //                             "firstName": "MADIE",
        //                             "lastName": "WHITNEY",
        //                             "sourceAddress": "3380 n scottsdale rd  scottsdale,az 85251",
        //                             "location": {
        //                                 "id": "4635506662965248",
        //                                 "created": "2023-04-18T09:38:25.444+05:30",
        //                                 "modified": "2023-04-18T09:38:25.451+05:30",
        //                                 "line1": "3380 N Scottsdale Rd",
        //                                 "city": "Scottsdale",
        //                                 "state": "AZ",
        //                                 "zip": "85251",
        //                                 "locLat": 33.48733199999999,
        //                                 "locLng": -111.9270596,
        //                                 "locSource": "3380 n scottsdale rd  scottsdale,az 85251"
        //                             },
        //                             "deaNumber": "BD7113234"
        //                         },
        //                         "pharmacy": {
        //                             "id": "6324356523229184",
        //                             "created": "2023-04-18T09:38:25.757+05:30",
        //                             "modified": "2023-04-18T09:38:25.757+05:30",
        //                             "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                             "sourceAddress": "5895 w. peoria avenue  glendale,az 85302",
        //                             "location": {
        //                                 "id": "5198456616386560",
        //                                 "created": "2023-04-18T09:38:25.748+05:30",
        //                                 "modified": "2023-04-18T09:38:25.757+05:30",
        //                                 "line1": "5895 W Peoria Ave",
        //                                 "city": "Glendale",
        //                                 "state": "AZ",
        //                                 "zip": "85302",
        //                                 "locLat": 33.5812761,
        //                                 "locLng": -112.1854129,
        //                                 "locSource": "5895 w. peoria avenue  glendale,az 85302"
        //                             },
        //                             "deaNumber": "BW5452228"
        //                         },
        //                         "ndcCode": "63481081460",
        //                         "patientName": "ULA PECK",
        //                         "patientDOB": "02/04/1939",
        //                         "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                         "isExpectedPatient": true,
        //                         "ndcOriginalSource": "63481081460",
        //                         "productCodeQualifier": "ND",
        //                         "ourPharmacy": false,
        //                         "ourProvider": false,
        //                         "startDate": "2023-10-01T10:30:00.000+05:30",
        //                         "endDate": "2023-10-30T10:30:00.000+05:30"
        //                     }
        //                 ],
        //                 "prescriptionIds": [
        //                     "4539935050694656",
        //                     "5665834957537280"
        //                 ],
        //                 "startDate": "2023-10-28T00:00:00.000+05:30",
        //                 "endDate": "2023-10-30T00:00:00.000+05:30",
        //                 "alertTypeString": "MultiplePrescribers",
        //                 "alertSubtypeString": "Opioid"
        //             },
        //             {
        //                 "id": "5595466213359616",
        //                 "created": "2024-01-26T08:36:49.498+05:30",
        //                 "modified": "2024-01-26T08:36:49.498+05:30",
        //                 "patientId": "6007697174429696",
        //                 "pmpReportId": "5313991236648960",
        //                 "alertType": "WriteFillGap",
        //                 "priority": 800,
        //                 "narrative": " on DEXTROAMPHETAMINE SACCHARATE, AMPHE (30@5 MG;5 MG;5 MG;5 MG ) from 09/22/2023 to 11/14/2023 (53 days)",
        //                 "typeString": "W/F Gap",
        //                 "prescriptions": [
        //                     {
        //                         "id": "6123231794692096",
        //                         "created": "2024-01-26T08:36:48.996+05:30",
        //                         "modified": "2024-01-26T08:36:49.759+05:30",
        //                         "patientId": "6007697174429696",
        //                         "classification": "STIMULANT",
        //                         "fillDate": "2023-11-14T10:30:00.000+05:30",
        //                         "fillDateString": "Nov 14",
        //                         "productName": "DEXTROAMPHETAMINE SACCHARATE, AMPHETAMINE ASPARTATE, DEXTROAMPHETAMINE SULFATE AND AMPHETAMINE SULFA, 5 M",
        //                         "displayName": "DEXTROAMPHETAMINE SACCHARATE, AMPHE",
        //                         "strengthDesc": "5 MG;5 MG;5 MG;5 MG",
        //                         "dosage": 5,
        //                         "prescribedQty": 30,
        //                         "prescribedLen": 30,
        //                         "dailyME": 0,
        //                         "writtenDate": "2023-09-22T10:30:00.000+05:30",
        //                         "writtenDateString": "Sep 22",
        //                         "nrCode": "R",
        //                         "refillCount": 0,
        //                         "rxNum": " ",
        //                         "isActive": false,
        //                         "isOurs": false,
        //                         "prescriber": {
        //                             "id": "5831775313985536",
        //                             "created": "2023-04-18T09:38:24.255+05:30",
        //                             "modified": "2023-04-18T09:38:24.255+05:30",
        //                             "firstName": "MARNA",
        //                             "lastName": "WITT",
        //                             "sourceAddress": "765 e rosemonte dr  phoenix,az 85024",
        //                             "location": {
        //                                 "id": "4705875407142912",
        //                                 "created": "2023-04-18T09:38:24.246+05:30",
        //                                 "modified": "2023-04-18T09:38:24.255+05:30",
        //                                 "line1": "765 E Rosemonte Dr",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85024",
        //                                 "locLat": 33.6567816,
        //                                 "locLng": -112.0631233,
        //                                 "locSource": "765 e rosemonte dr  phoenix,az 85024"
        //                             },
        //                             "deaNumber": "BS0422775"
        //                         },
        //                         "pharmacy": {
        //                             "id": "5585484709363712",
        //                             "created": "2023-04-18T09:38:22.545+05:30",
        //                             "modified": "2023-04-18T09:38:22.545+05:30",
        //                             "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                             "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                             "location": {
        //                                 "id": "6148434662785024",
        //                                 "created": "2023-04-18T09:38:22.535+05:30",
        //                                 "modified": "2023-04-18T09:38:22.546+05:30",
        //                                 "line1": "3402 N Central Ave",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85012",
        //                                 "locLat": 33.4879117,
        //                                 "locLng": -112.0745667,
        //                                 "locSource": "3402 n central ave  phoenix,az 85012"
        //                             },
        //                             "deaNumber": "AW0572518"
        //                         },
        //                         "ndcCode": "00555097302",
        //                         "patientName": "ULA PECK",
        //                         "patientDOB": "02/04/1939",
        //                         "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                         "isExpectedPatient": true,
        //                         "ndcOriginalSource": "00555097302",
        //                         "productCodeQualifier": "ND",
        //                         "ourPharmacy": false,
        //                         "ourProvider": false,
        //                         "startDate": "2023-11-14T10:30:00.000+05:30",
        //                         "endDate": "2023-12-13T10:30:00.000+05:30"
        //                     }
        //                 ],
        //                 "prescriptionIds": [
        //                     "6123231794692096"
        //                 ],
        //                 "startDate": "2023-09-22T10:30:00.000+05:30",
        //                 "endDate": "2023-11-14T10:30:00.000+05:30",
        //                 "alertTypeString": "WriteFillGap"
        //             },
        //             {
        //                 "id": "5648242771492864",
        //                 "created": "2024-01-26T08:36:49.498+05:30",
        //                 "modified": "2024-01-26T08:36:49.498+05:30",
        //                 "patientId": "6007697174429696",
        //                 "pmpReportId": "5313991236648960",
        //                 "description": "Prescriber: NUNEZ, TAWNYA with DEA: MH3849176",
        //                 "alertType": "NotOurPrescription",
        //                 "alertSubtype": "Prescriber",
        //                 "priority": 100,
        //                 "narrative": "Prescriber: NUNEZ, TAWNYA with DEA: MH3849176 for 2 Prescriptions.",
        //                 "typeString": "Not Our Prescriber",
        //                 "prescriptions": [
        //                     {
        //                         "id": "4715856911138816",
        //                         "created": "2024-01-26T08:36:48.994+05:30",
        //                         "modified": "2024-01-26T08:36:49.754+05:30",
        //                         "patientId": "6007697174429696",
        //                         "classification": "OPIOID",
        //                         "fillDate": "2024-01-05T10:30:00.000+05:30",
        //                         "fillDateString": "Jan 5",
        //                         "productName": "OXYCONTIN, 10 MG, TABLET, FILM COATED, EXTENDED RELEASE",
        //                         "displayName": "OXYCONTIN, 10 MG, TABLET, FILM COAT",
        //                         "strengthDesc": "10 MG",
        //                         "dosage": 10,
        //                         "prescribedQty": 60,
        //                         "prescribedLen": 30,
        //                         "dailyME": 30,
        //                         "writtenDate": "2023-12-23T10:30:00.000+05:30",
        //                         "writtenDateString": "Dec 23",
        //                         "nrCode": "R",
        //                         "refillCount": 0,
        //                         "rxNum": " ",
        //                         "isActive": true,
        //                         "isOurs": false,
        //                         "prescriber": {
        //                             "id": "5022534755942400",
        //                             "created": "2023-04-18T09:38:22.275+05:30",
        //                             "modified": "2023-04-18T09:38:22.275+05:30",
        //                             "firstName": "TAWNYA",
        //                             "lastName": "NUNEZ",
        //                             "sourceAddress": "6989 n hayden rd  scottsdale,az 85250",
        //                             "location": {
        //                                 "id": "6429909639495680",
        //                                 "created": "2023-04-18T09:38:22.264+05:30",
        //                                 "modified": "2023-04-18T09:38:22.277+05:30",
        //                                 "line1": "6989 N Hayden Rd",
        //                                 "city": "Scottsdale",
        //                                 "state": "AZ",
        //                                 "zip": "85250",
        //                                 "locLat": 33.5379566,
        //                                 "locLng": -111.9060417,
        //                                 "locSource": "6989 n hayden rd  scottsdale,az 85250"
        //                             },
        //                             "deaNumber": "MH3849176"
        //                         },
        //                         "pharmacy": {
        //                             "id": "5585484709363712",
        //                             "created": "2023-04-18T09:38:22.545+05:30",
        //                             "modified": "2023-04-18T09:38:22.545+05:30",
        //                             "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                             "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                             "location": {
        //                                 "id": "6148434662785024",
        //                                 "created": "2023-04-18T09:38:22.535+05:30",
        //                                 "modified": "2023-04-18T09:38:22.546+05:30",
        //                                 "line1": "3402 N Central Ave",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85012",
        //                                 "locLat": 33.4879117,
        //                                 "locLng": -112.0745667,
        //                                 "locSource": "3402 n central ave  phoenix,az 85012"
        //                             },
        //                             "deaNumber": "AW0572518"
        //                         },
        //                         "ndcCode": "59011041010",
        //                         "patientName": "ULA PECK",
        //                         "patientDOB": "02/04/1939",
        //                         "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                         "isExpectedPatient": true,
        //                         "ndcOriginalSource": "59011041010",
        //                         "productCodeQualifier": "ND",
        //                         "ourPharmacy": false,
        //                         "ourProvider": false,
        //                         "startDate": "2024-01-05T10:30:00.000+05:30",
        //                         "endDate": "2024-02-03T10:30:00.000+05:30"
        //                     },
        //                     {
        //                         "id": "5841756817981440",
        //                         "created": "2024-01-26T08:36:48.994+05:30",
        //                         "modified": "2024-01-26T08:36:49.755+05:30",
        //                         "patientId": "6007697174429696",
        //                         "classification": "OPIOID",
        //                         "fillDate": "2024-01-05T10:30:00.000+05:30",
        //                         "fillDateString": "Jan 5",
        //                         "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                         "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                         "strengthDesc": "10 MG;325 MG",
        //                         "dosage": 10,
        //                         "prescribedQty": 105,
        //                         "prescribedLen": 30,
        //                         "dailyME": 53,
        //                         "writtenDate": "2023-12-23T10:30:00.000+05:30",
        //                         "writtenDateString": "Dec 23",
        //                         "nrCode": "R",
        //                         "refillCount": 0,
        //                         "rxNum": " ",
        //                         "isActive": true,
        //                         "isOurs": false,
        //                         "prescriber": {
        //                             "id": "4565137918787584",
        //                             "created": "2023-04-18T09:38:22.853+05:30",
        //                             "modified": "2023-04-18T09:38:22.853+05:30",
        //                             "firstName": "TAWNYA",
        //                             "lastName": "NUNEZ",
        //                             "sourceAddress": "3815 n brown ave  scottsdale,az 85251",
        //                             "location": {
        //                                 "id": "6711384616206336",
        //                                 "created": "2023-04-18T09:38:22.846+05:30",
        //                                 "modified": "2023-04-18T09:38:22.854+05:30",
        //                                 "line1": "3815 N Brown Ave",
        //                                 "city": "Scottsdale",
        //                                 "state": "AZ",
        //                                 "zip": "85251",
        //                                 "locLat": 33.4918372,
        //                                 "locLng": -111.9242563,
        //                                 "locSource": "3815 n brown ave  scottsdale,az 85251"
        //                             },
        //                             "deaNumber": "MH3849176"
        //                         },
        //                         "pharmacy": {
        //                             "id": "5585484709363712",
        //                             "created": "2023-04-18T09:38:22.545+05:30",
        //                             "modified": "2023-04-18T09:38:22.545+05:30",
        //                             "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                             "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                             "location": {
        //                                 "id": "6148434662785024",
        //                                 "created": "2023-04-18T09:38:22.535+05:30",
        //                                 "modified": "2023-04-18T09:38:22.546+05:30",
        //                                 "line1": "3402 N Central Ave",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85012",
        //                                 "locLat": 33.4879117,
        //                                 "locLng": -112.0745667,
        //                                 "locSource": "3402 n central ave  phoenix,az 85012"
        //                             },
        //                             "deaNumber": "AW0572518"
        //                         },
        //                         "ndcCode": "00228298311",
        //                         "patientName": "ULA PECK",
        //                         "patientDOB": "02/04/1939",
        //                         "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                         "isExpectedPatient": true,
        //                         "ndcOriginalSource": "00228298311",
        //                         "productCodeQualifier": "ND",
        //                         "ourPharmacy": false,
        //                         "ourProvider": false,
        //                         "startDate": "2024-01-05T10:30:00.000+05:30",
        //                         "endDate": "2024-02-03T10:30:00.000+05:30"
        //                     }
        //                 ],
        //                 "prescriptionIds": [
        //                     "4715856911138816",
        //                     "5841756817981440"
        //                 ],
        //                 "startDate": "2023-12-23T10:30:00.000+05:30",
        //                 "endDate": "2024-01-05T10:30:00.000+05:30",
        //                 "alertTypeString": "NotOurPrescription",
        //                 "alertSubtypeString": "Prescriber"
        //             },
        //             {
        //                 "id": "5788980259848192",
        //                 "created": "2024-01-26T08:36:49.499+05:30",
        //                 "modified": "2024-01-26T08:36:49.499+05:30",
        //                 "patientId": "6007697174429696",
        //                 "pmpReportId": "5313991236648960",
        //                 "alertType": "Overlapping",
        //                 "alertSubtype": "Prescriber",
        //                 "priority": 500,
        //                 "narrative": " from 11/14/2023 to 12/14/2023",
        //                 "typeString": "Overlapping Prescribers(diff cat)",
        //                 "prescriptions": [
        //                     {
        //                         "id": "5560281841270784",
        //                         "created": "2024-01-26T08:36:48.996+05:30",
        //                         "modified": "2024-01-26T08:36:49.759+05:30",
        //                         "patientId": "6007697174429696",
        //                         "classification": "OPIOID",
        //                         "fillDate": "2023-11-04T10:30:00.000+05:30",
        //                         "fillDateString": "Nov 4",
        //                         "productName": "OXYCONTIN, 10 MG, TABLET, FILM COATED, EXTENDED RELEASE",
        //                         "displayName": "OXYCONTIN, 10 MG, TABLET, FILM COAT",
        //                         "strengthDesc": "10 MG",
        //                         "dosage": 10,
        //                         "prescribedQty": 60,
        //                         "prescribedLen": 30,
        //                         "dailyME": 30,
        //                         "writtenDate": "2023-10-29T10:30:00.000+05:30",
        //                         "writtenDateString": "Oct 29",
        //                         "nrCode": "R",
        //                         "refillCount": 0,
        //                         "rxNum": " ",
        //                         "isActive": false,
        //                         "isOurs": false,
        //                         "prescriber": {
        //                             "id": "6394725267406848",
        //                             "created": "2023-04-18T09:38:24.558+05:30",
        //                             "modified": "2023-04-18T09:38:24.558+05:30",
        //                             "firstName": "MARQUITTA",
        //                             "lastName": "BROCK",
        //                             "sourceAddress": "3806-3898 n brown ave  scottsdale,az 85251",
        //                             "location": {
        //                                 "id": "5268825360564224",
        //                                 "created": "2023-04-18T09:38:24.551+05:30",
        //                                 "modified": "2023-04-18T09:38:24.559+05:30",
        //                                 "line1": "3806 N Brown Ave",
        //                                 "city": "Scottsdale",
        //                                 "state": "AZ",
        //                                 "zip": "85251",
        //                                 "locLat": 33.4916008,
        //                                 "locLng": -111.9247454,
        //                                 "locSource": "3806-3898 n brown ave  scottsdale,az 85251"
        //                             },
        //                             "deaNumber": "MP1714460"
        //                         },
        //                         "pharmacy": {
        //                             "id": "5585484709363712",
        //                             "created": "2023-04-18T09:38:22.545+05:30",
        //                             "modified": "2023-04-18T09:38:22.545+05:30",
        //                             "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                             "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                             "location": {
        //                                 "id": "6148434662785024",
        //                                 "created": "2023-04-18T09:38:22.535+05:30",
        //                                 "modified": "2023-04-18T09:38:22.546+05:30",
        //                                 "line1": "3402 N Central Ave",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85012",
        //                                 "locLat": 33.4879117,
        //                                 "locLng": -112.0745667,
        //                                 "locSource": "3402 n central ave  phoenix,az 85012"
        //                             },
        //                             "deaNumber": "AW0572518"
        //                         },
        //                         "ndcCode": "59011041010",
        //                         "patientName": "ULA PECK",
        //                         "patientDOB": "02/04/1939",
        //                         "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                         "isExpectedPatient": true,
        //                         "ndcOriginalSource": "59011041010",
        //                         "productCodeQualifier": "ND",
        //                         "ourPharmacy": false,
        //                         "ourProvider": false,
        //                         "startDate": "2023-11-04T10:30:00.000+05:30",
        //                         "endDate": "2023-12-03T10:30:00.000+05:30"
        //                     },
        //                     {
        //                         "id": "6686181748113408",
        //                         "created": "2024-01-26T08:36:48.996+05:30",
        //                         "modified": "2024-01-26T08:36:49.760+05:30",
        //                         "patientId": "6007697174429696",
        //                         "classification": "OPIOID",
        //                         "fillDate": "2023-11-04T10:30:00.000+05:30",
        //                         "fillDateString": "Nov 4",
        //                         "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                         "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                         "strengthDesc": "10 MG;325 MG",
        //                         "dosage": 10,
        //                         "prescribedQty": 105,
        //                         "prescribedLen": 30,
        //                         "dailyME": 53,
        //                         "writtenDate": "2023-10-29T10:30:00.000+05:30",
        //                         "writtenDateString": "Oct 29",
        //                         "nrCode": "R",
        //                         "refillCount": 0,
        //                         "rxNum": " ",
        //                         "isActive": false,
        //                         "isOurs": false,
        //                         "prescriber": {
        //                             "id": "6113250290696192",
        //                             "created": "2023-04-18T09:38:24.873+05:30",
        //                             "modified": "2023-04-18T09:38:24.873+05:30",
        //                             "firstName": "MARQUITTA",
        //                             "lastName": "BROCK",
        //                             "sourceAddress": "3752 e indian school rd  phoenix,az 85018",
        //                             "location": {
        //                                 "id": "4987350383853568",
        //                                 "created": "2023-04-18T09:38:24.866+05:30",
        //                                 "modified": "2023-04-18T09:38:24.874+05:30",
        //                                 "line1": "3752 E Indian School Rd",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85018",
        //                                 "locLat": 33.4954195,
        //                                 "locLng": -112.0000832,
        //                                 "locSource": "3752 e indian school rd  phoenix,az 85018"
        //                             },
        //                             "deaNumber": "MP1714460"
        //                         },
        //                         "pharmacy": {
        //                             "id": "5585484709363712",
        //                             "created": "2023-04-18T09:38:22.545+05:30",
        //                             "modified": "2023-04-18T09:38:22.545+05:30",
        //                             "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                             "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                             "location": {
        //                                 "id": "6148434662785024",
        //                                 "created": "2023-04-18T09:38:22.535+05:30",
        //                                 "modified": "2023-04-18T09:38:22.546+05:30",
        //                                 "line1": "3402 N Central Ave",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85012",
        //                                 "locLat": 33.4879117,
        //                                 "locLng": -112.0745667,
        //                                 "locSource": "3402 n central ave  phoenix,az 85012"
        //                             },
        //                             "deaNumber": "AW0572518"
        //                         },
        //                         "ndcCode": "00228298311",
        //                         "patientName": "ULA PECK",
        //                         "patientDOB": "02/04/1939",
        //                         "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                         "isExpectedPatient": true,
        //                         "ndcOriginalSource": "00228298311",
        //                         "productCodeQualifier": "ND",
        //                         "ourPharmacy": false,
        //                         "ourProvider": false,
        //                         "startDate": "2023-11-04T10:30:00.000+05:30",
        //                         "endDate": "2023-12-03T10:30:00.000+05:30"
        //                     },
        //                     {
        //                         "id": "6123231794692096",
        //                         "created": "2024-01-26T08:36:48.996+05:30",
        //                         "modified": "2024-01-26T08:36:49.759+05:30",
        //                         "patientId": "6007697174429696",
        //                         "classification": "STIMULANT",
        //                         "fillDate": "2023-11-14T10:30:00.000+05:30",
        //                         "fillDateString": "Nov 14",
        //                         "productName": "DEXTROAMPHETAMINE SACCHARATE, AMPHETAMINE ASPARTATE, DEXTROAMPHETAMINE SULFATE AND AMPHETAMINE SULFA, 5 M",
        //                         "displayName": "DEXTROAMPHETAMINE SACCHARATE, AMPHE",
        //                         "strengthDesc": "5 MG;5 MG;5 MG;5 MG",
        //                         "dosage": 5,
        //                         "prescribedQty": 30,
        //                         "prescribedLen": 30,
        //                         "dailyME": 0,
        //                         "writtenDate": "2023-09-22T10:30:00.000+05:30",
        //                         "writtenDateString": "Sep 22",
        //                         "nrCode": "R",
        //                         "refillCount": 0,
        //                         "rxNum": " ",
        //                         "isActive": false,
        //                         "isOurs": false,
        //                         "prescriber": {
        //                             "id": "5831775313985536",
        //                             "created": "2023-04-18T09:38:24.255+05:30",
        //                             "modified": "2023-04-18T09:38:24.255+05:30",
        //                             "firstName": "MARNA",
        //                             "lastName": "WITT",
        //                             "sourceAddress": "765 e rosemonte dr  phoenix,az 85024",
        //                             "location": {
        //                                 "id": "4705875407142912",
        //                                 "created": "2023-04-18T09:38:24.246+05:30",
        //                                 "modified": "2023-04-18T09:38:24.255+05:30",
        //                                 "line1": "765 E Rosemonte Dr",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85024",
        //                                 "locLat": 33.6567816,
        //                                 "locLng": -112.0631233,
        //                                 "locSource": "765 e rosemonte dr  phoenix,az 85024"
        //                             },
        //                             "deaNumber": "BS0422775"
        //                         },
        //                         "pharmacy": {
        //                             "id": "5585484709363712",
        //                             "created": "2023-04-18T09:38:22.545+05:30",
        //                             "modified": "2023-04-18T09:38:22.545+05:30",
        //                             "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                             "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                             "location": {
        //                                 "id": "6148434662785024",
        //                                 "created": "2023-04-18T09:38:22.535+05:30",
        //                                 "modified": "2023-04-18T09:38:22.546+05:30",
        //                                 "line1": "3402 N Central Ave",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85012",
        //                                 "locLat": 33.4879117,
        //                                 "locLng": -112.0745667,
        //                                 "locSource": "3402 n central ave  phoenix,az 85012"
        //                             },
        //                             "deaNumber": "AW0572518"
        //                         },
        //                         "ndcCode": "00555097302",
        //                         "patientName": "ULA PECK",
        //                         "patientDOB": "02/04/1939",
        //                         "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                         "isExpectedPatient": true,
        //                         "ndcOriginalSource": "00555097302",
        //                         "productCodeQualifier": "ND",
        //                         "ourPharmacy": false,
        //                         "ourProvider": false,
        //                         "startDate": "2023-11-14T10:30:00.000+05:30",
        //                         "endDate": "2023-12-13T10:30:00.000+05:30"
        //                     },
        //                     {
        //                         "id": "4997331887849472",
        //                         "created": "2024-01-26T08:36:48.995+05:30",
        //                         "modified": "2024-01-26T08:36:49.758+05:30",
        //                         "patientId": "6007697174429696",
        //                         "classification": "STIMULANT",
        //                         "fillDate": "2023-11-15T10:30:00.000+05:30",
        //                         "fillDateString": "Nov 15",
        //                         "productName": "VYVANSE, 50 MG, CAPSULE",
        //                         "displayName": "VYVANSE, 50 MG, CAPSULE",
        //                         "strengthDesc": "50 MG",
        //                         "dosage": 50,
        //                         "prescribedQty": 30,
        //                         "prescribedLen": 30,
        //                         "dailyME": 0,
        //                         "writtenDate": "2023-09-22T10:30:00.000+05:30",
        //                         "writtenDateString": "Sep 22",
        //                         "nrCode": "R",
        //                         "refillCount": 0,
        //                         "rxNum": " ",
        //                         "isActive": false,
        //                         "isOurs": false,
        //                         "prescriber": {
        //                             "id": "6535462755762176",
        //                             "created": "2023-04-18T09:38:23.938+05:30",
        //                             "modified": "2023-04-18T09:38:23.938+05:30",
        //                             "firstName": "MARNA",
        //                             "lastName": "WITT",
        //                             "sourceAddress": "718 e union hills dr  phoenix,az 85024",
        //                             "location": {
        //                                 "id": "5409562848919552",
        //                                 "created": "2023-04-18T09:38:23.930+05:30",
        //                                 "modified": "2023-04-18T09:38:23.939+05:30",
        //                                 "line1": "718 E Union Hills Dr",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85024",
        //                                 "locLat": 33.6561533,
        //                                 "locLng": -112.0637055,
        //                                 "locSource": "718 e union hills dr  phoenix,az 85024"
        //                             },
        //                             "deaNumber": "BS0422775"
        //                         },
        //                         "pharmacy": {
        //                             "id": "5585484709363712",
        //                             "created": "2023-04-18T09:38:22.545+05:30",
        //                             "modified": "2023-04-18T09:38:22.545+05:30",
        //                             "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                             "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                             "location": {
        //                                 "id": "6148434662785024",
        //                                 "created": "2023-04-18T09:38:22.535+05:30",
        //                                 "modified": "2023-04-18T09:38:22.546+05:30",
        //                                 "line1": "3402 N Central Ave",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85012",
        //                                 "locLat": 33.4879117,
        //                                 "locLng": -112.0745667,
        //                                 "locSource": "3402 n central ave  phoenix,az 85012"
        //                             },
        //                             "deaNumber": "AW0572518"
        //                         },
        //                         "ndcCode": "59417010510",
        //                         "patientName": "ULA PECK",
        //                         "patientDOB": "02/04/1939",
        //                         "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                         "isExpectedPatient": true,
        //                         "ndcOriginalSource": "59417010510",
        //                         "productCodeQualifier": "ND",
        //                         "ourPharmacy": false,
        //                         "ourProvider": false,
        //                         "startDate": "2023-11-15T10:30:00.000+05:30",
        //                         "endDate": "2023-12-14T10:30:00.000+05:30"
        //                     },
        //                     {
        //                         "id": "6404706771402752",
        //                         "created": "2024-01-26T08:36:48.995+05:30",
        //                         "modified": "2024-01-26T08:36:49.757+05:30",
        //                         "patientId": "6007697174429696",
        //                         "classification": "OPIOID",
        //                         "fillDate": "2023-12-04T10:30:00.000+05:30",
        //                         "fillDateString": "Dec 4",
        //                         "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                         "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                         "strengthDesc": "10 MG;325 MG",
        //                         "dosage": 10,
        //                         "prescribedQty": 105,
        //                         "prescribedLen": 30,
        //                         "dailyME": 53,
        //                         "writtenDate": "2023-12-03T10:30:00.000+05:30",
        //                         "writtenDateString": "Dec 3",
        //                         "nrCode": "R",
        //                         "refillCount": 0,
        //                         "rxNum": " ",
        //                         "isActive": false,
        //                         "isOurs": false,
        //                         "prescriber": {
        //                             "id": "5972512802340864",
        //                             "created": "2023-04-18T09:38:23.605+05:30",
        //                             "modified": "2023-04-18T09:38:23.605+05:30",
        //                             "firstName": "MARQUITTA",
        //                             "lastName": "BROCK",
        //                             "sourceAddress": "3817 n brown ave  scottsdale,az 85251",
        //                             "location": {
        //                                 "id": "4846612895498240",
        //                                 "created": "2023-04-18T09:38:23.596+05:30",
        //                                 "modified": "2023-04-18T09:38:23.605+05:30",
        //                                 "line1": "3817 N Brown Ave",
        //                                 "city": "Scottsdale",
        //                                 "state": "AZ",
        //                                 "zip": "85251",
        //                                 "locLat": 33.4920038,
        //                                 "locLng": -111.9242563,
        //                                 "locSource": "3817 n brown ave  scottsdale,az 85251"
        //                             },
        //                             "deaNumber": "MP1714460"
        //                         },
        //                         "pharmacy": {
        //                             "id": "5585484709363712",
        //                             "created": "2023-04-18T09:38:22.545+05:30",
        //                             "modified": "2023-04-18T09:38:22.545+05:30",
        //                             "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                             "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                             "location": {
        //                                 "id": "6148434662785024",
        //                                 "created": "2023-04-18T09:38:22.535+05:30",
        //                                 "modified": "2023-04-18T09:38:22.546+05:30",
        //                                 "line1": "3402 N Central Ave",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85012",
        //                                 "locLat": 33.4879117,
        //                                 "locLng": -112.0745667,
        //                                 "locSource": "3402 n central ave  phoenix,az 85012"
        //                             },
        //                             "deaNumber": "AW0572518"
        //                         },
        //                         "ndcCode": "00228298311",
        //                         "patientName": "ULA PECK",
        //                         "patientDOB": "02/04/1939",
        //                         "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                         "isExpectedPatient": true,
        //                         "ndcOriginalSource": "00228298311",
        //                         "productCodeQualifier": "ND",
        //                         "ourPharmacy": false,
        //                         "ourProvider": false,
        //                         "startDate": "2023-12-04T10:30:00.000+05:30",
        //                         "endDate": "2024-01-02T10:30:00.000+05:30"
        //                     }
        //                 ],
        //                 "prescriptionIds": [
        //                     "5560281841270784",
        //                     "6686181748113408",
        //                     "6123231794692096",
        //                     "4997331887849472",
        //                     "6404706771402752"
        //                 ],
        //                 "startDate": "2023-11-14T00:00:00.000+05:30",
        //                 "endDate": "2023-12-14T00:00:00.000+05:30",
        //                 "alertTypeString": "Overlapping",
        //                 "alertSubtypeString": "Prescriber"
        //             },
        //             {
        //                 "id": "5929717748203520",
        //                 "created": "2024-01-26T08:36:49.499+05:30",
        //                 "modified": "2024-01-26T08:36:49.499+05:30",
        //                 "patientId": "6007697174429696",
        //                 "pmpReportId": "5313991236648960",
        //                 "description": "Pharmacy: WALGREEN ARIZONA DRUG CO. with DEA: AW0572518",
        //                 "alertType": "NotOurPrescription",
        //                 "alertSubtype": "Pharmacy",
        //                 "priority": 100,
        //                 "narrative": "Pharmacy: WALGREEN ARIZONA DRUG CO. with DEA: AW0572518 for 8 Prescriptions.",
        //                 "typeString": "Not Our Prescriber",
        //                 "prescriptions": [
        //                     {
        //                         "id": "4715856911138816",
        //                         "created": "2024-01-26T08:36:48.994+05:30",
        //                         "modified": "2024-01-26T08:36:49.754+05:30",
        //                         "patientId": "6007697174429696",
        //                         "classification": "OPIOID",
        //                         "fillDate": "2024-01-05T10:30:00.000+05:30",
        //                         "fillDateString": "Jan 5",
        //                         "productName": "OXYCONTIN, 10 MG, TABLET, FILM COATED, EXTENDED RELEASE",
        //                         "displayName": "OXYCONTIN, 10 MG, TABLET, FILM COAT",
        //                         "strengthDesc": "10 MG",
        //                         "dosage": 10,
        //                         "prescribedQty": 60,
        //                         "prescribedLen": 30,
        //                         "dailyME": 30,
        //                         "writtenDate": "2023-12-23T10:30:00.000+05:30",
        //                         "writtenDateString": "Dec 23",
        //                         "nrCode": "R",
        //                         "refillCount": 0,
        //                         "rxNum": " ",
        //                         "isActive": true,
        //                         "isOurs": false,
        //                         "prescriber": {
        //                             "id": "5022534755942400",
        //                             "created": "2023-04-18T09:38:22.275+05:30",
        //                             "modified": "2023-04-18T09:38:22.275+05:30",
        //                             "firstName": "TAWNYA",
        //                             "lastName": "NUNEZ",
        //                             "sourceAddress": "6989 n hayden rd  scottsdale,az 85250",
        //                             "location": {
        //                                 "id": "6429909639495680",
        //                                 "created": "2023-04-18T09:38:22.264+05:30",
        //                                 "modified": "2023-04-18T09:38:22.277+05:30",
        //                                 "line1": "6989 N Hayden Rd",
        //                                 "city": "Scottsdale",
        //                                 "state": "AZ",
        //                                 "zip": "85250",
        //                                 "locLat": 33.5379566,
        //                                 "locLng": -111.9060417,
        //                                 "locSource": "6989 n hayden rd  scottsdale,az 85250"
        //                             },
        //                             "deaNumber": "MH3849176"
        //                         },
        //                         "pharmacy": {
        //                             "id": "5585484709363712",
        //                             "created": "2023-04-18T09:38:22.545+05:30",
        //                             "modified": "2023-04-18T09:38:22.545+05:30",
        //                             "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                             "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                             "location": {
        //                                 "id": "6148434662785024",
        //                                 "created": "2023-04-18T09:38:22.535+05:30",
        //                                 "modified": "2023-04-18T09:38:22.546+05:30",
        //                                 "line1": "3402 N Central Ave",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85012",
        //                                 "locLat": 33.4879117,
        //                                 "locLng": -112.0745667,
        //                                 "locSource": "3402 n central ave  phoenix,az 85012"
        //                             },
        //                             "deaNumber": "AW0572518"
        //                         },
        //                         "ndcCode": "59011041010",
        //                         "patientName": "ULA PECK",
        //                         "patientDOB": "02/04/1939",
        //                         "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                         "isExpectedPatient": true,
        //                         "ndcOriginalSource": "59011041010",
        //                         "productCodeQualifier": "ND",
        //                         "ourPharmacy": false,
        //                         "ourProvider": false,
        //                         "startDate": "2024-01-05T10:30:00.000+05:30",
        //                         "endDate": "2024-02-03T10:30:00.000+05:30"
        //                     },
        //                     {
        //                         "id": "5841756817981440",
        //                         "created": "2024-01-26T08:36:48.994+05:30",
        //                         "modified": "2024-01-26T08:36:49.755+05:30",
        //                         "patientId": "6007697174429696",
        //                         "classification": "OPIOID",
        //                         "fillDate": "2024-01-05T10:30:00.000+05:30",
        //                         "fillDateString": "Jan 5",
        //                         "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                         "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                         "strengthDesc": "10 MG;325 MG",
        //                         "dosage": 10,
        //                         "prescribedQty": 105,
        //                         "prescribedLen": 30,
        //                         "dailyME": 53,
        //                         "writtenDate": "2023-12-23T10:30:00.000+05:30",
        //                         "writtenDateString": "Dec 23",
        //                         "nrCode": "R",
        //                         "refillCount": 0,
        //                         "rxNum": " ",
        //                         "isActive": true,
        //                         "isOurs": false,
        //                         "prescriber": {
        //                             "id": "4565137918787584",
        //                             "created": "2023-04-18T09:38:22.853+05:30",
        //                             "modified": "2023-04-18T09:38:22.853+05:30",
        //                             "firstName": "TAWNYA",
        //                             "lastName": "NUNEZ",
        //                             "sourceAddress": "3815 n brown ave  scottsdale,az 85251",
        //                             "location": {
        //                                 "id": "6711384616206336",
        //                                 "created": "2023-04-18T09:38:22.846+05:30",
        //                                 "modified": "2023-04-18T09:38:22.854+05:30",
        //                                 "line1": "3815 N Brown Ave",
        //                                 "city": "Scottsdale",
        //                                 "state": "AZ",
        //                                 "zip": "85251",
        //                                 "locLat": 33.4918372,
        //                                 "locLng": -111.9242563,
        //                                 "locSource": "3815 n brown ave  scottsdale,az 85251"
        //                             },
        //                             "deaNumber": "MH3849176"
        //                         },
        //                         "pharmacy": {
        //                             "id": "5585484709363712",
        //                             "created": "2023-04-18T09:38:22.545+05:30",
        //                             "modified": "2023-04-18T09:38:22.545+05:30",
        //                             "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                             "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                             "location": {
        //                                 "id": "6148434662785024",
        //                                 "created": "2023-04-18T09:38:22.535+05:30",
        //                                 "modified": "2023-04-18T09:38:22.546+05:30",
        //                                 "line1": "3402 N Central Ave",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85012",
        //                                 "locLat": 33.4879117,
        //                                 "locLng": -112.0745667,
        //                                 "locSource": "3402 n central ave  phoenix,az 85012"
        //                             },
        //                             "deaNumber": "AW0572518"
        //                         },
        //                         "ndcCode": "00228298311",
        //                         "patientName": "ULA PECK",
        //                         "patientDOB": "02/04/1939",
        //                         "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                         "isExpectedPatient": true,
        //                         "ndcOriginalSource": "00228298311",
        //                         "productCodeQualifier": "ND",
        //                         "ourPharmacy": false,
        //                         "ourProvider": false,
        //                         "startDate": "2024-01-05T10:30:00.000+05:30",
        //                         "endDate": "2024-02-03T10:30:00.000+05:30"
        //                     },
        //                     {
        //                         "id": "5278806864560128",
        //                         "created": "2024-01-26T08:36:48.994+05:30",
        //                         "modified": "2024-01-26T08:36:49.756+05:30",
        //                         "patientId": "6007697174429696",
        //                         "classification": "OPIOID",
        //                         "fillDate": "2023-12-30T10:30:00.000+05:30",
        //                         "fillDateString": "Dec 30",
        //                         "productName": "OXYCODONE HYDROCHLORIDE, 5 MG, TABLET",
        //                         "displayName": "OXYCODONE HYDROCHLORIDE, 5 MG, TABL",
        //                         "strengthDesc": "5 MG",
        //                         "dosage": 5,
        //                         "prescribedQty": 60,
        //                         "prescribedLen": 2,
        //                         "dailyME": 225,
        //                         "writtenDate": "2023-12-26T10:30:00.000+05:30",
        //                         "writtenDateString": "Dec 26",
        //                         "nrCode": "R",
        //                         "refillCount": 0,
        //                         "rxNum": " ",
        //                         "isActive": false,
        //                         "isOurs": false,
        //                         "prescriber": {
        //                             "id": "5128087872208896",
        //                             "created": "2023-04-18T09:38:23.147+05:30",
        //                             "modified": "2023-04-18T09:38:23.147+05:30",
        //                             "firstName": "",
        //                             "lastName": "",
        //                             "sourceAddress": "5022 n 17th ave  phoenix,az 85015",
        //                             "location": {
        //                                 "id": "5691037825630208",
        //                                 "created": "2023-04-18T09:38:23.141+05:30",
        //                                 "modified": "2023-04-18T09:38:23.148+05:30",
        //                                 "line1": "5022 N 17th Ave",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85015",
        //                                 "locLat": 33.5106346,
        //                                 "locLng": -112.0963149,
        //                                 "locSource": "5022 n 17th ave  phoenix,az 85015"
        //                             },
        //                             "deaNumber": "BC7786140"
        //                         },
        //                         "pharmacy": {
        //                             "id": "5585484709363712",
        //                             "created": "2023-04-18T09:38:22.545+05:30",
        //                             "modified": "2023-04-18T09:38:22.545+05:30",
        //                             "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                             "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                             "location": {
        //                                 "id": "6148434662785024",
        //                                 "created": "2023-04-18T09:38:22.535+05:30",
        //                                 "modified": "2023-04-18T09:38:22.546+05:30",
        //                                 "line1": "3402 N Central Ave",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85012",
        //                                 "locLat": 33.4879117,
        //                                 "locLng": -112.0745667,
        //                                 "locSource": "3402 n central ave  phoenix,az 85012"
        //                             },
        //                             "deaNumber": "AW0572518"
        //                         },
        //                         "ndcCode": "00406055201",
        //                         "patientName": "ULA PECK",
        //                         "patientDOB": "02/04/1939",
        //                         "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                         "isExpectedPatient": true,
        //                         "ndcOriginalSource": "00406055201",
        //                         "productCodeQualifier": "ND",
        //                         "ourPharmacy": false,
        //                         "ourProvider": false,
        //                         "startDate": "2023-12-30T10:30:00.000+05:30",
        //                         "endDate": "2023-12-31T10:30:00.000+05:30"
        //                     },
        //                     {
        //                         "id": "6404706771402752",
        //                         "created": "2024-01-26T08:36:48.995+05:30",
        //                         "modified": "2024-01-26T08:36:49.757+05:30",
        //                         "patientId": "6007697174429696",
        //                         "classification": "OPIOID",
        //                         "fillDate": "2023-12-04T10:30:00.000+05:30",
        //                         "fillDateString": "Dec 4",
        //                         "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                         "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                         "strengthDesc": "10 MG;325 MG",
        //                         "dosage": 10,
        //                         "prescribedQty": 105,
        //                         "prescribedLen": 30,
        //                         "dailyME": 53,
        //                         "writtenDate": "2023-12-03T10:30:00.000+05:30",
        //                         "writtenDateString": "Dec 3",
        //                         "nrCode": "R",
        //                         "refillCount": 0,
        //                         "rxNum": " ",
        //                         "isActive": false,
        //                         "isOurs": false,
        //                         "prescriber": {
        //                             "id": "5972512802340864",
        //                             "created": "2023-04-18T09:38:23.605+05:30",
        //                             "modified": "2023-04-18T09:38:23.605+05:30",
        //                             "firstName": "MARQUITTA",
        //                             "lastName": "BROCK",
        //                             "sourceAddress": "3817 n brown ave  scottsdale,az 85251",
        //                             "location": {
        //                                 "id": "4846612895498240",
        //                                 "created": "2023-04-18T09:38:23.596+05:30",
        //                                 "modified": "2023-04-18T09:38:23.605+05:30",
        //                                 "line1": "3817 N Brown Ave",
        //                                 "city": "Scottsdale",
        //                                 "state": "AZ",
        //                                 "zip": "85251",
        //                                 "locLat": 33.4920038,
        //                                 "locLng": -111.9242563,
        //                                 "locSource": "3817 n brown ave  scottsdale,az 85251"
        //                             },
        //                             "deaNumber": "MP1714460"
        //                         },
        //                         "pharmacy": {
        //                             "id": "5585484709363712",
        //                             "created": "2023-04-18T09:38:22.545+05:30",
        //                             "modified": "2023-04-18T09:38:22.545+05:30",
        //                             "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                             "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                             "location": {
        //                                 "id": "6148434662785024",
        //                                 "created": "2023-04-18T09:38:22.535+05:30",
        //                                 "modified": "2023-04-18T09:38:22.546+05:30",
        //                                 "line1": "3402 N Central Ave",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85012",
        //                                 "locLat": 33.4879117,
        //                                 "locLng": -112.0745667,
        //                                 "locSource": "3402 n central ave  phoenix,az 85012"
        //                             },
        //                             "deaNumber": "AW0572518"
        //                         },
        //                         "ndcCode": "00228298311",
        //                         "patientName": "ULA PECK",
        //                         "patientDOB": "02/04/1939",
        //                         "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                         "isExpectedPatient": true,
        //                         "ndcOriginalSource": "00228298311",
        //                         "productCodeQualifier": "ND",
        //                         "ourPharmacy": false,
        //                         "ourProvider": false,
        //                         "startDate": "2023-12-04T10:30:00.000+05:30",
        //                         "endDate": "2024-01-02T10:30:00.000+05:30"
        //                     },
        //                     {
        //                         "id": "4997331887849472",
        //                         "created": "2024-01-26T08:36:48.995+05:30",
        //                         "modified": "2024-01-26T08:36:49.758+05:30",
        //                         "patientId": "6007697174429696",
        //                         "classification": "STIMULANT",
        //                         "fillDate": "2023-11-15T10:30:00.000+05:30",
        //                         "fillDateString": "Nov 15",
        //                         "productName": "VYVANSE, 50 MG, CAPSULE",
        //                         "displayName": "VYVANSE, 50 MG, CAPSULE",
        //                         "strengthDesc": "50 MG",
        //                         "dosage": 50,
        //                         "prescribedQty": 30,
        //                         "prescribedLen": 30,
        //                         "dailyME": 0,
        //                         "writtenDate": "2023-09-22T10:30:00.000+05:30",
        //                         "writtenDateString": "Sep 22",
        //                         "nrCode": "R",
        //                         "refillCount": 0,
        //                         "rxNum": " ",
        //                         "isActive": false,
        //                         "isOurs": false,
        //                         "prescriber": {
        //                             "id": "6535462755762176",
        //                             "created": "2023-04-18T09:38:23.938+05:30",
        //                             "modified": "2023-04-18T09:38:23.938+05:30",
        //                             "firstName": "MARNA",
        //                             "lastName": "WITT",
        //                             "sourceAddress": "718 e union hills dr  phoenix,az 85024",
        //                             "location": {
        //                                 "id": "5409562848919552",
        //                                 "created": "2023-04-18T09:38:23.930+05:30",
        //                                 "modified": "2023-04-18T09:38:23.939+05:30",
        //                                 "line1": "718 E Union Hills Dr",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85024",
        //                                 "locLat": 33.6561533,
        //                                 "locLng": -112.0637055,
        //                                 "locSource": "718 e union hills dr  phoenix,az 85024"
        //                             },
        //                             "deaNumber": "BS0422775"
        //                         },
        //                         "pharmacy": {
        //                             "id": "5585484709363712",
        //                             "created": "2023-04-18T09:38:22.545+05:30",
        //                             "modified": "2023-04-18T09:38:22.545+05:30",
        //                             "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                             "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                             "location": {
        //                                 "id": "6148434662785024",
        //                                 "created": "2023-04-18T09:38:22.535+05:30",
        //                                 "modified": "2023-04-18T09:38:22.546+05:30",
        //                                 "line1": "3402 N Central Ave",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85012",
        //                                 "locLat": 33.4879117,
        //                                 "locLng": -112.0745667,
        //                                 "locSource": "3402 n central ave  phoenix,az 85012"
        //                             },
        //                             "deaNumber": "AW0572518"
        //                         },
        //                         "ndcCode": "59417010510",
        //                         "patientName": "ULA PECK",
        //                         "patientDOB": "02/04/1939",
        //                         "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                         "isExpectedPatient": true,
        //                         "ndcOriginalSource": "59417010510",
        //                         "productCodeQualifier": "ND",
        //                         "ourPharmacy": false,
        //                         "ourProvider": false,
        //                         "startDate": "2023-11-15T10:30:00.000+05:30",
        //                         "endDate": "2023-12-14T10:30:00.000+05:30"
        //                     },
        //                     {
        //                         "id": "6123231794692096",
        //                         "created": "2024-01-26T08:36:48.996+05:30",
        //                         "modified": "2024-01-26T08:36:49.759+05:30",
        //                         "patientId": "6007697174429696",
        //                         "classification": "STIMULANT",
        //                         "fillDate": "2023-11-14T10:30:00.000+05:30",
        //                         "fillDateString": "Nov 14",
        //                         "productName": "DEXTROAMPHETAMINE SACCHARATE, AMPHETAMINE ASPARTATE, DEXTROAMPHETAMINE SULFATE AND AMPHETAMINE SULFA, 5 M",
        //                         "displayName": "DEXTROAMPHETAMINE SACCHARATE, AMPHE",
        //                         "strengthDesc": "5 MG;5 MG;5 MG;5 MG",
        //                         "dosage": 5,
        //                         "prescribedQty": 30,
        //                         "prescribedLen": 30,
        //                         "dailyME": 0,
        //                         "writtenDate": "2023-09-22T10:30:00.000+05:30",
        //                         "writtenDateString": "Sep 22",
        //                         "nrCode": "R",
        //                         "refillCount": 0,
        //                         "rxNum": " ",
        //                         "isActive": false,
        //                         "isOurs": false,
        //                         "prescriber": {
        //                             "id": "5831775313985536",
        //                             "created": "2023-04-18T09:38:24.255+05:30",
        //                             "modified": "2023-04-18T09:38:24.255+05:30",
        //                             "firstName": "MARNA",
        //                             "lastName": "WITT",
        //                             "sourceAddress": "765 e rosemonte dr  phoenix,az 85024",
        //                             "location": {
        //                                 "id": "4705875407142912",
        //                                 "created": "2023-04-18T09:38:24.246+05:30",
        //                                 "modified": "2023-04-18T09:38:24.255+05:30",
        //                                 "line1": "765 E Rosemonte Dr",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85024",
        //                                 "locLat": 33.6567816,
        //                                 "locLng": -112.0631233,
        //                                 "locSource": "765 e rosemonte dr  phoenix,az 85024"
        //                             },
        //                             "deaNumber": "BS0422775"
        //                         },
        //                         "pharmacy": {
        //                             "id": "5585484709363712",
        //                             "created": "2023-04-18T09:38:22.545+05:30",
        //                             "modified": "2023-04-18T09:38:22.545+05:30",
        //                             "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                             "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                             "location": {
        //                                 "id": "6148434662785024",
        //                                 "created": "2023-04-18T09:38:22.535+05:30",
        //                                 "modified": "2023-04-18T09:38:22.546+05:30",
        //                                 "line1": "3402 N Central Ave",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85012",
        //                                 "locLat": 33.4879117,
        //                                 "locLng": -112.0745667,
        //                                 "locSource": "3402 n central ave  phoenix,az 85012"
        //                             },
        //                             "deaNumber": "AW0572518"
        //                         },
        //                         "ndcCode": "00555097302",
        //                         "patientName": "ULA PECK",
        //                         "patientDOB": "02/04/1939",
        //                         "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                         "isExpectedPatient": true,
        //                         "ndcOriginalSource": "00555097302",
        //                         "productCodeQualifier": "ND",
        //                         "ourPharmacy": false,
        //                         "ourProvider": false,
        //                         "startDate": "2023-11-14T10:30:00.000+05:30",
        //                         "endDate": "2023-12-13T10:30:00.000+05:30"
        //                     },
        //                     {
        //                         "id": "5560281841270784",
        //                         "created": "2024-01-26T08:36:48.996+05:30",
        //                         "modified": "2024-01-26T08:36:49.759+05:30",
        //                         "patientId": "6007697174429696",
        //                         "classification": "OPIOID",
        //                         "fillDate": "2023-11-04T10:30:00.000+05:30",
        //                         "fillDateString": "Nov 4",
        //                         "productName": "OXYCONTIN, 10 MG, TABLET, FILM COATED, EXTENDED RELEASE",
        //                         "displayName": "OXYCONTIN, 10 MG, TABLET, FILM COAT",
        //                         "strengthDesc": "10 MG",
        //                         "dosage": 10,
        //                         "prescribedQty": 60,
        //                         "prescribedLen": 30,
        //                         "dailyME": 30,
        //                         "writtenDate": "2023-10-29T10:30:00.000+05:30",
        //                         "writtenDateString": "Oct 29",
        //                         "nrCode": "R",
        //                         "refillCount": 0,
        //                         "rxNum": " ",
        //                         "isActive": false,
        //                         "isOurs": false,
        //                         "prescriber": {
        //                             "id": "6394725267406848",
        //                             "created": "2023-04-18T09:38:24.558+05:30",
        //                             "modified": "2023-04-18T09:38:24.558+05:30",
        //                             "firstName": "MARQUITTA",
        //                             "lastName": "BROCK",
        //                             "sourceAddress": "3806-3898 n brown ave  scottsdale,az 85251",
        //                             "location": {
        //                                 "id": "5268825360564224",
        //                                 "created": "2023-04-18T09:38:24.551+05:30",
        //                                 "modified": "2023-04-18T09:38:24.559+05:30",
        //                                 "line1": "3806 N Brown Ave",
        //                                 "city": "Scottsdale",
        //                                 "state": "AZ",
        //                                 "zip": "85251",
        //                                 "locLat": 33.4916008,
        //                                 "locLng": -111.9247454,
        //                                 "locSource": "3806-3898 n brown ave  scottsdale,az 85251"
        //                             },
        //                             "deaNumber": "MP1714460"
        //                         },
        //                         "pharmacy": {
        //                             "id": "5585484709363712",
        //                             "created": "2023-04-18T09:38:22.545+05:30",
        //                             "modified": "2023-04-18T09:38:22.545+05:30",
        //                             "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                             "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                             "location": {
        //                                 "id": "6148434662785024",
        //                                 "created": "2023-04-18T09:38:22.535+05:30",
        //                                 "modified": "2023-04-18T09:38:22.546+05:30",
        //                                 "line1": "3402 N Central Ave",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85012",
        //                                 "locLat": 33.4879117,
        //                                 "locLng": -112.0745667,
        //                                 "locSource": "3402 n central ave  phoenix,az 85012"
        //                             },
        //                             "deaNumber": "AW0572518"
        //                         },
        //                         "ndcCode": "59011041010",
        //                         "patientName": "ULA PECK",
        //                         "patientDOB": "02/04/1939",
        //                         "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                         "isExpectedPatient": true,
        //                         "ndcOriginalSource": "59011041010",
        //                         "productCodeQualifier": "ND",
        //                         "ourPharmacy": false,
        //                         "ourProvider": false,
        //                         "startDate": "2023-11-04T10:30:00.000+05:30",
        //                         "endDate": "2023-12-03T10:30:00.000+05:30"
        //                     },
        //                     {
        //                         "id": "6686181748113408",
        //                         "created": "2024-01-26T08:36:48.996+05:30",
        //                         "modified": "2024-01-26T08:36:49.760+05:30",
        //                         "patientId": "6007697174429696",
        //                         "classification": "OPIOID",
        //                         "fillDate": "2023-11-04T10:30:00.000+05:30",
        //                         "fillDateString": "Nov 4",
        //                         "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                         "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                         "strengthDesc": "10 MG;325 MG",
        //                         "dosage": 10,
        //                         "prescribedQty": 105,
        //                         "prescribedLen": 30,
        //                         "dailyME": 53,
        //                         "writtenDate": "2023-10-29T10:30:00.000+05:30",
        //                         "writtenDateString": "Oct 29",
        //                         "nrCode": "R",
        //                         "refillCount": 0,
        //                         "rxNum": " ",
        //                         "isActive": false,
        //                         "isOurs": false,
        //                         "prescriber": {
        //                             "id": "6113250290696192",
        //                             "created": "2023-04-18T09:38:24.873+05:30",
        //                             "modified": "2023-04-18T09:38:24.873+05:30",
        //                             "firstName": "MARQUITTA",
        //                             "lastName": "BROCK",
        //                             "sourceAddress": "3752 e indian school rd  phoenix,az 85018",
        //                             "location": {
        //                                 "id": "4987350383853568",
        //                                 "created": "2023-04-18T09:38:24.866+05:30",
        //                                 "modified": "2023-04-18T09:38:24.874+05:30",
        //                                 "line1": "3752 E Indian School Rd",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85018",
        //                                 "locLat": 33.4954195,
        //                                 "locLng": -112.0000832,
        //                                 "locSource": "3752 e indian school rd  phoenix,az 85018"
        //                             },
        //                             "deaNumber": "MP1714460"
        //                         },
        //                         "pharmacy": {
        //                             "id": "5585484709363712",
        //                             "created": "2023-04-18T09:38:22.545+05:30",
        //                             "modified": "2023-04-18T09:38:22.545+05:30",
        //                             "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                             "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                             "location": {
        //                                 "id": "6148434662785024",
        //                                 "created": "2023-04-18T09:38:22.535+05:30",
        //                                 "modified": "2023-04-18T09:38:22.546+05:30",
        //                                 "line1": "3402 N Central Ave",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85012",
        //                                 "locLat": 33.4879117,
        //                                 "locLng": -112.0745667,
        //                                 "locSource": "3402 n central ave  phoenix,az 85012"
        //                             },
        //                             "deaNumber": "AW0572518"
        //                         },
        //                         "ndcCode": "00228298311",
        //                         "patientName": "ULA PECK",
        //                         "patientDOB": "02/04/1939",
        //                         "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                         "isExpectedPatient": true,
        //                         "ndcOriginalSource": "00228298311",
        //                         "productCodeQualifier": "ND",
        //                         "ourPharmacy": false,
        //                         "ourProvider": false,
        //                         "startDate": "2023-11-04T10:30:00.000+05:30",
        //                         "endDate": "2023-12-03T10:30:00.000+05:30"
        //                     }
        //                 ],
        //                 "prescriptionIds": [
        //                     "4715856911138816",
        //                     "5841756817981440",
        //                     "5278806864560128",
        //                     "6404706771402752",
        //                     "4997331887849472",
        //                     "6123231794692096",
        //                     "5560281841270784",
        //                     "6686181748113408"
        //                 ],
        //                 "startDate": "2023-09-22T10:30:00.000+05:30",
        //                 "endDate": "2024-01-05T10:30:00.000+05:30",
        //                 "alertTypeString": "NotOurPrescription",
        //                 "alertSubtypeString": "Pharmacy"
        //             },
        //             {
        //                 "id": "6158416166780928",
        //                 "created": "2024-01-26T08:36:49.498+05:30",
        //                 "modified": "2024-01-26T08:36:49.498+05:30",
        //                 "patientId": "6007697174429696",
        //                 "pmpReportId": "5313991236648960",
        //                 "alertType": "WriteFillGap",
        //                 "priority": 800,
        //                 "narrative": " on VYVANSE, 50 MG, CAPSULE (30@50 MG ) from 09/22/2023 to 11/15/2023 (54 days)",
        //                 "typeString": "W/F Gap",
        //                 "prescriptions": [
        //                     {
        //                         "id": "4997331887849472",
        //                         "created": "2024-01-26T08:36:48.995+05:30",
        //                         "modified": "2024-01-26T08:36:49.758+05:30",
        //                         "patientId": "6007697174429696",
        //                         "classification": "STIMULANT",
        //                         "fillDate": "2023-11-15T10:30:00.000+05:30",
        //                         "fillDateString": "Nov 15",
        //                         "productName": "VYVANSE, 50 MG, CAPSULE",
        //                         "displayName": "VYVANSE, 50 MG, CAPSULE",
        //                         "strengthDesc": "50 MG",
        //                         "dosage": 50,
        //                         "prescribedQty": 30,
        //                         "prescribedLen": 30,
        //                         "dailyME": 0,
        //                         "writtenDate": "2023-09-22T10:30:00.000+05:30",
        //                         "writtenDateString": "Sep 22",
        //                         "nrCode": "R",
        //                         "refillCount": 0,
        //                         "rxNum": " ",
        //                         "isActive": false,
        //                         "isOurs": false,
        //                         "prescriber": {
        //                             "id": "6535462755762176",
        //                             "created": "2023-04-18T09:38:23.938+05:30",
        //                             "modified": "2023-04-18T09:38:23.938+05:30",
        //                             "firstName": "MARNA",
        //                             "lastName": "WITT",
        //                             "sourceAddress": "718 e union hills dr  phoenix,az 85024",
        //                             "location": {
        //                                 "id": "5409562848919552",
        //                                 "created": "2023-04-18T09:38:23.930+05:30",
        //                                 "modified": "2023-04-18T09:38:23.939+05:30",
        //                                 "line1": "718 E Union Hills Dr",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85024",
        //                                 "locLat": 33.6561533,
        //                                 "locLng": -112.0637055,
        //                                 "locSource": "718 e union hills dr  phoenix,az 85024"
        //                             },
        //                             "deaNumber": "BS0422775"
        //                         },
        //                         "pharmacy": {
        //                             "id": "5585484709363712",
        //                             "created": "2023-04-18T09:38:22.545+05:30",
        //                             "modified": "2023-04-18T09:38:22.545+05:30",
        //                             "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                             "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                             "location": {
        //                                 "id": "6148434662785024",
        //                                 "created": "2023-04-18T09:38:22.535+05:30",
        //                                 "modified": "2023-04-18T09:38:22.546+05:30",
        //                                 "line1": "3402 N Central Ave",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85012",
        //                                 "locLat": 33.4879117,
        //                                 "locLng": -112.0745667,
        //                                 "locSource": "3402 n central ave  phoenix,az 85012"
        //                             },
        //                             "deaNumber": "AW0572518"
        //                         },
        //                         "ndcCode": "59417010510",
        //                         "patientName": "ULA PECK",
        //                         "patientDOB": "02/04/1939",
        //                         "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                         "isExpectedPatient": true,
        //                         "ndcOriginalSource": "59417010510",
        //                         "productCodeQualifier": "ND",
        //                         "ourPharmacy": false,
        //                         "ourProvider": false,
        //                         "startDate": "2023-11-15T10:30:00.000+05:30",
        //                         "endDate": "2023-12-14T10:30:00.000+05:30"
        //                     }
        //                 ],
        //                 "prescriptionIds": [
        //                     "4997331887849472"
        //                 ],
        //                 "startDate": "2023-09-22T10:30:00.000+05:30",
        //                 "endDate": "2023-11-15T10:30:00.000+05:30",
        //                 "alertTypeString": "WriteFillGap"
        //             },
        //             {
        //                 "id": "6211192724914176",
        //                 "created": "2024-01-26T08:36:49.499+05:30",
        //                 "modified": "2024-01-26T08:36:49.499+05:30",
        //                 "patientId": "6007697174429696",
        //                 "pmpReportId": "5313991236648960",
        //                 "description": "Prescriber: BROCK, MARQUITTA with DEA: MP1714460",
        //                 "alertType": "NotOurPrescription",
        //                 "alertSubtype": "Prescriber",
        //                 "priority": 100,
        //                 "narrative": "Prescriber: BROCK, MARQUITTA with DEA: MP1714460 for 3 Prescriptions.",
        //                 "typeString": "Not Our Prescriber",
        //                 "prescriptions": [
        //                     {
        //                         "id": "6404706771402752",
        //                         "created": "2024-01-26T08:36:48.995+05:30",
        //                         "modified": "2024-01-26T08:36:49.757+05:30",
        //                         "patientId": "6007697174429696",
        //                         "classification": "OPIOID",
        //                         "fillDate": "2023-12-04T10:30:00.000+05:30",
        //                         "fillDateString": "Dec 4",
        //                         "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                         "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                         "strengthDesc": "10 MG;325 MG",
        //                         "dosage": 10,
        //                         "prescribedQty": 105,
        //                         "prescribedLen": 30,
        //                         "dailyME": 53,
        //                         "writtenDate": "2023-12-03T10:30:00.000+05:30",
        //                         "writtenDateString": "Dec 3",
        //                         "nrCode": "R",
        //                         "refillCount": 0,
        //                         "rxNum": " ",
        //                         "isActive": false,
        //                         "isOurs": false,
        //                         "prescriber": {
        //                             "id": "5972512802340864",
        //                             "created": "2023-04-18T09:38:23.605+05:30",
        //                             "modified": "2023-04-18T09:38:23.605+05:30",
        //                             "firstName": "MARQUITTA",
        //                             "lastName": "BROCK",
        //                             "sourceAddress": "3817 n brown ave  scottsdale,az 85251",
        //                             "location": {
        //                                 "id": "4846612895498240",
        //                                 "created": "2023-04-18T09:38:23.596+05:30",
        //                                 "modified": "2023-04-18T09:38:23.605+05:30",
        //                                 "line1": "3817 N Brown Ave",
        //                                 "city": "Scottsdale",
        //                                 "state": "AZ",
        //                                 "zip": "85251",
        //                                 "locLat": 33.4920038,
        //                                 "locLng": -111.9242563,
        //                                 "locSource": "3817 n brown ave  scottsdale,az 85251"
        //                             },
        //                             "deaNumber": "MP1714460"
        //                         },
        //                         "pharmacy": {
        //                             "id": "5585484709363712",
        //                             "created": "2023-04-18T09:38:22.545+05:30",
        //                             "modified": "2023-04-18T09:38:22.545+05:30",
        //                             "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                             "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                             "location": {
        //                                 "id": "6148434662785024",
        //                                 "created": "2023-04-18T09:38:22.535+05:30",
        //                                 "modified": "2023-04-18T09:38:22.546+05:30",
        //                                 "line1": "3402 N Central Ave",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85012",
        //                                 "locLat": 33.4879117,
        //                                 "locLng": -112.0745667,
        //                                 "locSource": "3402 n central ave  phoenix,az 85012"
        //                             },
        //                             "deaNumber": "AW0572518"
        //                         },
        //                         "ndcCode": "00228298311",
        //                         "patientName": "ULA PECK",
        //                         "patientDOB": "02/04/1939",
        //                         "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                         "isExpectedPatient": true,
        //                         "ndcOriginalSource": "00228298311",
        //                         "productCodeQualifier": "ND",
        //                         "ourPharmacy": false,
        //                         "ourProvider": false,
        //                         "startDate": "2023-12-04T10:30:00.000+05:30",
        //                         "endDate": "2024-01-02T10:30:00.000+05:30"
        //                     },
        //                     {
        //                         "id": "5560281841270784",
        //                         "created": "2024-01-26T08:36:48.996+05:30",
        //                         "modified": "2024-01-26T08:36:49.759+05:30",
        //                         "patientId": "6007697174429696",
        //                         "classification": "OPIOID",
        //                         "fillDate": "2023-11-04T10:30:00.000+05:30",
        //                         "fillDateString": "Nov 4",
        //                         "productName": "OXYCONTIN, 10 MG, TABLET, FILM COATED, EXTENDED RELEASE",
        //                         "displayName": "OXYCONTIN, 10 MG, TABLET, FILM COAT",
        //                         "strengthDesc": "10 MG",
        //                         "dosage": 10,
        //                         "prescribedQty": 60,
        //                         "prescribedLen": 30,
        //                         "dailyME": 30,
        //                         "writtenDate": "2023-10-29T10:30:00.000+05:30",
        //                         "writtenDateString": "Oct 29",
        //                         "nrCode": "R",
        //                         "refillCount": 0,
        //                         "rxNum": " ",
        //                         "isActive": false,
        //                         "isOurs": false,
        //                         "prescriber": {
        //                             "id": "6394725267406848",
        //                             "created": "2023-04-18T09:38:24.558+05:30",
        //                             "modified": "2023-04-18T09:38:24.558+05:30",
        //                             "firstName": "MARQUITTA",
        //                             "lastName": "BROCK",
        //                             "sourceAddress": "3806-3898 n brown ave  scottsdale,az 85251",
        //                             "location": {
        //                                 "id": "5268825360564224",
        //                                 "created": "2023-04-18T09:38:24.551+05:30",
        //                                 "modified": "2023-04-18T09:38:24.559+05:30",
        //                                 "line1": "3806 N Brown Ave",
        //                                 "city": "Scottsdale",
        //                                 "state": "AZ",
        //                                 "zip": "85251",
        //                                 "locLat": 33.4916008,
        //                                 "locLng": -111.9247454,
        //                                 "locSource": "3806-3898 n brown ave  scottsdale,az 85251"
        //                             },
        //                             "deaNumber": "MP1714460"
        //                         },
        //                         "pharmacy": {
        //                             "id": "5585484709363712",
        //                             "created": "2023-04-18T09:38:22.545+05:30",
        //                             "modified": "2023-04-18T09:38:22.545+05:30",
        //                             "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                             "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                             "location": {
        //                                 "id": "6148434662785024",
        //                                 "created": "2023-04-18T09:38:22.535+05:30",
        //                                 "modified": "2023-04-18T09:38:22.546+05:30",
        //                                 "line1": "3402 N Central Ave",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85012",
        //                                 "locLat": 33.4879117,
        //                                 "locLng": -112.0745667,
        //                                 "locSource": "3402 n central ave  phoenix,az 85012"
        //                             },
        //                             "deaNumber": "AW0572518"
        //                         },
        //                         "ndcCode": "59011041010",
        //                         "patientName": "ULA PECK",
        //                         "patientDOB": "02/04/1939",
        //                         "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                         "isExpectedPatient": true,
        //                         "ndcOriginalSource": "59011041010",
        //                         "productCodeQualifier": "ND",
        //                         "ourPharmacy": false,
        //                         "ourProvider": false,
        //                         "startDate": "2023-11-04T10:30:00.000+05:30",
        //                         "endDate": "2023-12-03T10:30:00.000+05:30"
        //                     },
        //                     {
        //                         "id": "6686181748113408",
        //                         "created": "2024-01-26T08:36:48.996+05:30",
        //                         "modified": "2024-01-26T08:36:49.760+05:30",
        //                         "patientId": "6007697174429696",
        //                         "classification": "OPIOID",
        //                         "fillDate": "2023-11-04T10:30:00.000+05:30",
        //                         "fillDateString": "Nov 4",
        //                         "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                         "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                         "strengthDesc": "10 MG;325 MG",
        //                         "dosage": 10,
        //                         "prescribedQty": 105,
        //                         "prescribedLen": 30,
        //                         "dailyME": 53,
        //                         "writtenDate": "2023-10-29T10:30:00.000+05:30",
        //                         "writtenDateString": "Oct 29",
        //                         "nrCode": "R",
        //                         "refillCount": 0,
        //                         "rxNum": " ",
        //                         "isActive": false,
        //                         "isOurs": false,
        //                         "prescriber": {
        //                             "id": "6113250290696192",
        //                             "created": "2023-04-18T09:38:24.873+05:30",
        //                             "modified": "2023-04-18T09:38:24.873+05:30",
        //                             "firstName": "MARQUITTA",
        //                             "lastName": "BROCK",
        //                             "sourceAddress": "3752 e indian school rd  phoenix,az 85018",
        //                             "location": {
        //                                 "id": "4987350383853568",
        //                                 "created": "2023-04-18T09:38:24.866+05:30",
        //                                 "modified": "2023-04-18T09:38:24.874+05:30",
        //                                 "line1": "3752 E Indian School Rd",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85018",
        //                                 "locLat": 33.4954195,
        //                                 "locLng": -112.0000832,
        //                                 "locSource": "3752 e indian school rd  phoenix,az 85018"
        //                             },
        //                             "deaNumber": "MP1714460"
        //                         },
        //                         "pharmacy": {
        //                             "id": "5585484709363712",
        //                             "created": "2023-04-18T09:38:22.545+05:30",
        //                             "modified": "2023-04-18T09:38:22.545+05:30",
        //                             "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                             "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                             "location": {
        //                                 "id": "6148434662785024",
        //                                 "created": "2023-04-18T09:38:22.535+05:30",
        //                                 "modified": "2023-04-18T09:38:22.546+05:30",
        //                                 "line1": "3402 N Central Ave",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85012",
        //                                 "locLat": 33.4879117,
        //                                 "locLng": -112.0745667,
        //                                 "locSource": "3402 n central ave  phoenix,az 85012"
        //                             },
        //                             "deaNumber": "AW0572518"
        //                         },
        //                         "ndcCode": "00228298311",
        //                         "patientName": "ULA PECK",
        //                         "patientDOB": "02/04/1939",
        //                         "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                         "isExpectedPatient": true,
        //                         "ndcOriginalSource": "00228298311",
        //                         "productCodeQualifier": "ND",
        //                         "ourPharmacy": false,
        //                         "ourProvider": false,
        //                         "startDate": "2023-11-04T10:30:00.000+05:30",
        //                         "endDate": "2023-12-03T10:30:00.000+05:30"
        //                     }
        //                 ],
        //                 "prescriptionIds": [
        //                     "6404706771402752",
        //                     "5560281841270784",
        //                     "6686181748113408"
        //                 ],
        //                 "startDate": "2023-10-29T10:30:00.000+05:30",
        //                 "endDate": "2023-12-04T10:30:00.000+05:30",
        //                 "alertTypeString": "NotOurPrescription",
        //                 "alertSubtypeString": "Prescriber"
        //             },
        //             {
        //                 "id": "6351930213269504",
        //                 "created": "2024-01-26T08:36:49.499+05:30",
        //                 "modified": "2024-01-26T08:36:49.499+05:30",
        //                 "patientId": "6007697174429696",
        //                 "pmpReportId": "5313991236648960",
        //                 "description": "OPIOID : 278",
        //                 "alertType": "HighDose",
        //                 "priority": 200,
        //                 "narrative": " from 12/30/2023 to 12/31/2023",
        //                 "typeString": "High Dose",
        //                 "prescriptions": [
        //                     {
        //                         "id": "5278806864560128",
        //                         "created": "2024-01-26T08:36:48.994+05:30",
        //                         "modified": "2024-01-26T08:36:49.756+05:30",
        //                         "patientId": "6007697174429696",
        //                         "classification": "OPIOID",
        //                         "fillDate": "2023-12-30T10:30:00.000+05:30",
        //                         "fillDateString": "Dec 30",
        //                         "productName": "OXYCODONE HYDROCHLORIDE, 5 MG, TABLET",
        //                         "displayName": "OXYCODONE HYDROCHLORIDE, 5 MG, TABL",
        //                         "strengthDesc": "5 MG",
        //                         "dosage": 5,
        //                         "prescribedQty": 60,
        //                         "prescribedLen": 2,
        //                         "dailyME": 225,
        //                         "writtenDate": "2023-12-26T10:30:00.000+05:30",
        //                         "writtenDateString": "Dec 26",
        //                         "nrCode": "R",
        //                         "refillCount": 0,
        //                         "rxNum": " ",
        //                         "isActive": false,
        //                         "isOurs": false,
        //                         "prescriber": {
        //                             "id": "5128087872208896",
        //                             "created": "2023-04-18T09:38:23.147+05:30",
        //                             "modified": "2023-04-18T09:38:23.147+05:30",
        //                             "firstName": "",
        //                             "lastName": "",
        //                             "sourceAddress": "5022 n 17th ave  phoenix,az 85015",
        //                             "location": {
        //                                 "id": "5691037825630208",
        //                                 "created": "2023-04-18T09:38:23.141+05:30",
        //                                 "modified": "2023-04-18T09:38:23.148+05:30",
        //                                 "line1": "5022 N 17th Ave",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85015",
        //                                 "locLat": 33.5106346,
        //                                 "locLng": -112.0963149,
        //                                 "locSource": "5022 n 17th ave  phoenix,az 85015"
        //                             },
        //                             "deaNumber": "BC7786140"
        //                         },
        //                         "pharmacy": {
        //                             "id": "5585484709363712",
        //                             "created": "2023-04-18T09:38:22.545+05:30",
        //                             "modified": "2023-04-18T09:38:22.545+05:30",
        //                             "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                             "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                             "location": {
        //                                 "id": "6148434662785024",
        //                                 "created": "2023-04-18T09:38:22.535+05:30",
        //                                 "modified": "2023-04-18T09:38:22.546+05:30",
        //                                 "line1": "3402 N Central Ave",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85012",
        //                                 "locLat": 33.4879117,
        //                                 "locLng": -112.0745667,
        //                                 "locSource": "3402 n central ave  phoenix,az 85012"
        //                             },
        //                             "deaNumber": "AW0572518"
        //                         },
        //                         "ndcCode": "00406055201",
        //                         "patientName": "ULA PECK",
        //                         "patientDOB": "02/04/1939",
        //                         "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                         "isExpectedPatient": true,
        //                         "ndcOriginalSource": "00406055201",
        //                         "productCodeQualifier": "ND",
        //                         "ourPharmacy": false,
        //                         "ourProvider": false,
        //                         "startDate": "2023-12-30T10:30:00.000+05:30",
        //                         "endDate": "2023-12-31T10:30:00.000+05:30"
        //                     },
        //                     {
        //                         "id": "6404706771402752",
        //                         "created": "2024-01-26T08:36:48.995+05:30",
        //                         "modified": "2024-01-26T08:36:49.757+05:30",
        //                         "patientId": "6007697174429696",
        //                         "classification": "OPIOID",
        //                         "fillDate": "2023-12-04T10:30:00.000+05:30",
        //                         "fillDateString": "Dec 4",
        //                         "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                         "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                         "strengthDesc": "10 MG;325 MG",
        //                         "dosage": 10,
        //                         "prescribedQty": 105,
        //                         "prescribedLen": 30,
        //                         "dailyME": 53,
        //                         "writtenDate": "2023-12-03T10:30:00.000+05:30",
        //                         "writtenDateString": "Dec 3",
        //                         "nrCode": "R",
        //                         "refillCount": 0,
        //                         "rxNum": " ",
        //                         "isActive": false,
        //                         "isOurs": false,
        //                         "prescriber": {
        //                             "id": "5972512802340864",
        //                             "created": "2023-04-18T09:38:23.605+05:30",
        //                             "modified": "2023-04-18T09:38:23.605+05:30",
        //                             "firstName": "MARQUITTA",
        //                             "lastName": "BROCK",
        //                             "sourceAddress": "3817 n brown ave  scottsdale,az 85251",
        //                             "location": {
        //                                 "id": "4846612895498240",
        //                                 "created": "2023-04-18T09:38:23.596+05:30",
        //                                 "modified": "2023-04-18T09:38:23.605+05:30",
        //                                 "line1": "3817 N Brown Ave",
        //                                 "city": "Scottsdale",
        //                                 "state": "AZ",
        //                                 "zip": "85251",
        //                                 "locLat": 33.4920038,
        //                                 "locLng": -111.9242563,
        //                                 "locSource": "3817 n brown ave  scottsdale,az 85251"
        //                             },
        //                             "deaNumber": "MP1714460"
        //                         },
        //                         "pharmacy": {
        //                             "id": "5585484709363712",
        //                             "created": "2023-04-18T09:38:22.545+05:30",
        //                             "modified": "2023-04-18T09:38:22.545+05:30",
        //                             "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                             "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                             "location": {
        //                                 "id": "6148434662785024",
        //                                 "created": "2023-04-18T09:38:22.535+05:30",
        //                                 "modified": "2023-04-18T09:38:22.546+05:30",
        //                                 "line1": "3402 N Central Ave",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85012",
        //                                 "locLat": 33.4879117,
        //                                 "locLng": -112.0745667,
        //                                 "locSource": "3402 n central ave  phoenix,az 85012"
        //                             },
        //                             "deaNumber": "AW0572518"
        //                         },
        //                         "ndcCode": "00228298311",
        //                         "patientName": "ULA PECK",
        //                         "patientDOB": "02/04/1939",
        //                         "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                         "isExpectedPatient": true,
        //                         "ndcOriginalSource": "00228298311",
        //                         "productCodeQualifier": "ND",
        //                         "ourPharmacy": false,
        //                         "ourProvider": false,
        //                         "startDate": "2023-12-04T10:30:00.000+05:30",
        //                         "endDate": "2024-01-02T10:30:00.000+05:30"
        //                     }
        //                 ],
        //                 "prescriptionIds": [
        //                     "5278806864560128",
        //                     "6404706771402752"
        //                 ],
        //                 "startDate": "2023-12-30T00:00:00.000+05:30",
        //                 "endDate": "2023-12-31T00:00:00.000+05:30",
        //                 "alertTypeString": "HighDose"
        //             },
        //             {
        //                 "id": "6439891143491584",
        //                 "created": "2024-01-26T08:36:49.498+05:30",
        //                 "modified": "2024-01-26T08:36:49.498+05:30",
        //                 "patientId": "6007697174429696",
        //                 "pmpReportId": "5313991236648960",
        //                 "alertType": "WriteFillGap",
        //                 "priority": 800,
        //                 "narrative": " on OXYCONTIN, 10 MG, TABLET, FILM COAT (60@10 MG ) from 12/23/2023 to 01/05/2024 (13 days)",
        //                 "typeString": "W/F Gap",
        //                 "prescriptions": [
        //                     {
        //                         "id": "4715856911138816",
        //                         "created": "2024-01-26T08:36:48.994+05:30",
        //                         "modified": "2024-01-26T08:36:49.754+05:30",
        //                         "patientId": "6007697174429696",
        //                         "classification": "OPIOID",
        //                         "fillDate": "2024-01-05T10:30:00.000+05:30",
        //                         "fillDateString": "Jan 5",
        //                         "productName": "OXYCONTIN, 10 MG, TABLET, FILM COATED, EXTENDED RELEASE",
        //                         "displayName": "OXYCONTIN, 10 MG, TABLET, FILM COAT",
        //                         "strengthDesc": "10 MG",
        //                         "dosage": 10,
        //                         "prescribedQty": 60,
        //                         "prescribedLen": 30,
        //                         "dailyME": 30,
        //                         "writtenDate": "2023-12-23T10:30:00.000+05:30",
        //                         "writtenDateString": "Dec 23",
        //                         "nrCode": "R",
        //                         "refillCount": 0,
        //                         "rxNum": " ",
        //                         "isActive": true,
        //                         "isOurs": false,
        //                         "prescriber": {
        //                             "id": "5022534755942400",
        //                             "created": "2023-04-18T09:38:22.275+05:30",
        //                             "modified": "2023-04-18T09:38:22.275+05:30",
        //                             "firstName": "TAWNYA",
        //                             "lastName": "NUNEZ",
        //                             "sourceAddress": "6989 n hayden rd  scottsdale,az 85250",
        //                             "location": {
        //                                 "id": "6429909639495680",
        //                                 "created": "2023-04-18T09:38:22.264+05:30",
        //                                 "modified": "2023-04-18T09:38:22.277+05:30",
        //                                 "line1": "6989 N Hayden Rd",
        //                                 "city": "Scottsdale",
        //                                 "state": "AZ",
        //                                 "zip": "85250",
        //                                 "locLat": 33.5379566,
        //                                 "locLng": -111.9060417,
        //                                 "locSource": "6989 n hayden rd  scottsdale,az 85250"
        //                             },
        //                             "deaNumber": "MH3849176"
        //                         },
        //                         "pharmacy": {
        //                             "id": "5585484709363712",
        //                             "created": "2023-04-18T09:38:22.545+05:30",
        //                             "modified": "2023-04-18T09:38:22.545+05:30",
        //                             "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                             "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                             "location": {
        //                                 "id": "6148434662785024",
        //                                 "created": "2023-04-18T09:38:22.535+05:30",
        //                                 "modified": "2023-04-18T09:38:22.546+05:30",
        //                                 "line1": "3402 N Central Ave",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85012",
        //                                 "locLat": 33.4879117,
        //                                 "locLng": -112.0745667,
        //                                 "locSource": "3402 n central ave  phoenix,az 85012"
        //                             },
        //                             "deaNumber": "AW0572518"
        //                         },
        //                         "ndcCode": "59011041010",
        //                         "patientName": "ULA PECK",
        //                         "patientDOB": "02/04/1939",
        //                         "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                         "isExpectedPatient": true,
        //                         "ndcOriginalSource": "59011041010",
        //                         "productCodeQualifier": "ND",
        //                         "ourPharmacy": false,
        //                         "ourProvider": false,
        //                         "startDate": "2024-01-05T10:30:00.000+05:30",
        //                         "endDate": "2024-02-03T10:30:00.000+05:30"
        //                     }
        //                 ],
        //                 "prescriptionIds": [
        //                     "4715856911138816"
        //                 ],
        //                 "startDate": "2023-12-23T10:30:00.000+05:30",
        //                 "endDate": "2024-01-05T10:30:00.000+05:30",
        //                 "alertTypeString": "WriteFillGap"
        //             },
        //             {
        //                 "id": "6492667701624832",
        //                 "created": "2024-01-26T08:36:49.499+05:30",
        //                 "modified": "2024-01-26T08:36:49.499+05:30",
        //                 "patientId": "6007697174429696",
        //                 "pmpReportId": "5313991236648960",
        //                 "alertType": "Overlapping",
        //                 "alertSubtype": "Pharmacy",
        //                 "priority": 500,
        //                 "narrative": " from 10/28/2023 to 10/30/2023",
        //                 "typeString": "Overlapping Pharmacies",
        //                 "prescriptions": [
        //                     {
        //                         "id": "4539935050694656",
        //                         "created": "2024-01-26T08:36:48.997+05:30",
        //                         "modified": "2024-01-26T08:36:49.761+05:30",
        //                         "patientId": "6007697174429696",
        //                         "classification": "OPIOID",
        //                         "fillDate": "2023-10-05T10:30:00.000+05:30",
        //                         "fillDateString": "Oct 5",
        //                         "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                         "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                         "strengthDesc": "10 MG;325 MG",
        //                         "dosage": 10,
        //                         "prescribedQty": 105,
        //                         "prescribedLen": 30,
        //                         "dailyME": 53,
        //                         "writtenDate": "2023-10-01T10:30:00.000+05:30",
        //                         "writtenDateString": "Oct 1",
        //                         "nrCode": "R",
        //                         "refillCount": 0,
        //                         "rxNum": " ",
        //                         "isActive": false,
        //                         "isOurs": false,
        //                         "prescriber": {
        //                             "id": "6676200244117504",
        //                             "created": "2023-04-18T09:38:25.169+05:30",
        //                             "modified": "2023-04-18T09:38:25.169+05:30",
        //                             "firstName": "MARQUITTA",
        //                             "lastName": "BROCK",
        //                             "sourceAddress": "3749-3799 e indian school rd  phoenix,az 85018",
        //                             "location": {
        //                                 "id": "5550300337274880",
        //                                 "created": "2023-04-18T09:38:25.162+05:30",
        //                                 "modified": "2023-04-18T09:38:25.169+05:30",
        //                                 "line1": "3749 E Indian School Rd",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85018",
        //                                 "locLat": 33.49479520000001,
        //                                 "locLng": -112.0001152,
        //                                 "locSource": "3749-3799 e indian school rd  phoenix,az 85018"
        //                             },
        //                             "deaNumber": "MP1714460"
        //                         },
        //                         "pharmacy": {
        //                             "id": "5585484709363712",
        //                             "created": "2023-04-18T09:38:22.545+05:30",
        //                             "modified": "2023-04-18T09:38:22.545+05:30",
        //                             "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                             "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                             "location": {
        //                                 "id": "6148434662785024",
        //                                 "created": "2023-04-18T09:38:22.535+05:30",
        //                                 "modified": "2023-04-18T09:38:22.546+05:30",
        //                                 "line1": "3402 N Central Ave",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85012",
        //                                 "locLat": 33.4879117,
        //                                 "locLng": -112.0745667,
        //                                 "locSource": "3402 n central ave  phoenix,az 85012"
        //                             },
        //                             "deaNumber": "AW0572518"
        //                         },
        //                         "ndcCode": "00228298311",
        //                         "patientName": "ULA PECK",
        //                         "patientDOB": "02/04/1939",
        //                         "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                         "isExpectedPatient": true,
        //                         "ndcOriginalSource": "00228298311",
        //                         "productCodeQualifier": "ND",
        //                         "ourPharmacy": false,
        //                         "ourProvider": false,
        //                         "startDate": "2023-10-05T10:30:00.000+05:30",
        //                         "endDate": "2023-11-03T10:30:00.000+05:30"
        //                     },
        //                     {
        //                         "id": "5665834957537280",
        //                         "created": "2024-01-26T08:36:48.997+05:30",
        //                         "modified": "2024-01-26T08:36:49.761+05:30",
        //                         "patientId": "6007697174429696",
        //                         "classification": "OPIOID",
        //                         "fillDate": "2023-10-01T10:30:00.000+05:30",
        //                         "fillDateString": "Oct 1",
        //                         "productName": "OPANA ER, 10 MG, TABLET, EXTENDED RELEASE",
        //                         "displayName": "OPANA ER, 10 MG, TABLET, EXTENDED R",
        //                         "strengthDesc": "10 MG",
        //                         "dosage": 10,
        //                         "prescribedQty": 60,
        //                         "prescribedLen": 30,
        //                         "dailyME": 60,
        //                         "writtenDate": "2023-10-01T10:30:00.000+05:30",
        //                         "writtenDateString": "Oct 1",
        //                         "nrCode": "R",
        //                         "refillCount": 0,
        //                         "rxNum": " ",
        //                         "isActive": false,
        //                         "isOurs": false,
        //                         "prescriber": {
        //                             "id": "5761406569807872",
        //                             "created": "2023-04-18T09:38:25.451+05:30",
        //                             "modified": "2023-04-18T09:38:25.451+05:30",
        //                             "firstName": "MADIE",
        //                             "lastName": "WHITNEY",
        //                             "sourceAddress": "3380 n scottsdale rd  scottsdale,az 85251",
        //                             "location": {
        //                                 "id": "4635506662965248",
        //                                 "created": "2023-04-18T09:38:25.444+05:30",
        //                                 "modified": "2023-04-18T09:38:25.451+05:30",
        //                                 "line1": "3380 N Scottsdale Rd",
        //                                 "city": "Scottsdale",
        //                                 "state": "AZ",
        //                                 "zip": "85251",
        //                                 "locLat": 33.48733199999999,
        //                                 "locLng": -111.9270596,
        //                                 "locSource": "3380 n scottsdale rd  scottsdale,az 85251"
        //                             },
        //                             "deaNumber": "BD7113234"
        //                         },
        //                         "pharmacy": {
        //                             "id": "6324356523229184",
        //                             "created": "2023-04-18T09:38:25.757+05:30",
        //                             "modified": "2023-04-18T09:38:25.757+05:30",
        //                             "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                             "sourceAddress": "5895 w. peoria avenue  glendale,az 85302",
        //                             "location": {
        //                                 "id": "5198456616386560",
        //                                 "created": "2023-04-18T09:38:25.748+05:30",
        //                                 "modified": "2023-04-18T09:38:25.757+05:30",
        //                                 "line1": "5895 W Peoria Ave",
        //                                 "city": "Glendale",
        //                                 "state": "AZ",
        //                                 "zip": "85302",
        //                                 "locLat": 33.5812761,
        //                                 "locLng": -112.1854129,
        //                                 "locSource": "5895 w. peoria avenue  glendale,az 85302"
        //                             },
        //                             "deaNumber": "BW5452228"
        //                         },
        //                         "ndcCode": "63481081460",
        //                         "patientName": "ULA PECK",
        //                         "patientDOB": "02/04/1939",
        //                         "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                         "isExpectedPatient": true,
        //                         "ndcOriginalSource": "63481081460",
        //                         "productCodeQualifier": "ND",
        //                         "ourPharmacy": false,
        //                         "ourProvider": false,
        //                         "startDate": "2023-10-01T10:30:00.000+05:30",
        //                         "endDate": "2023-10-30T10:30:00.000+05:30"
        //                     }
        //                 ],
        //                 "prescriptionIds": [
        //                     "4539935050694656",
        //                     "5665834957537280"
        //                 ],
        //                 "startDate": "2023-10-28T00:00:00.000+05:30",
        //                 "endDate": "2023-10-30T00:00:00.000+05:30",
        //                 "alertTypeString": "Overlapping",
        //                 "alertSubtypeString": "Pharmacy"
        //             },
        //             {
        //                 "id": "6721366120202240",
        //                 "created": "2024-01-26T08:36:49.498+05:30",
        //                 "modified": "2024-01-26T08:36:49.498+05:30",
        //                 "patientId": "6007697174429696",
        //                 "pmpReportId": "5313991236648960",
        //                 "alertType": "WriteFillGap",
        //                 "priority": 800,
        //                 "narrative": " on OXYCONTIN, 10 MG, TABLET, FILM COAT (60@10 MG ) from 10/29/2023 to 11/04/2023 (6 days)",
        //                 "typeString": "W/F Gap",
        //                 "prescriptions": [
        //                     {
        //                         "id": "5560281841270784",
        //                         "created": "2024-01-26T08:36:48.996+05:30",
        //                         "modified": "2024-01-26T08:36:49.759+05:30",
        //                         "patientId": "6007697174429696",
        //                         "classification": "OPIOID",
        //                         "fillDate": "2023-11-04T10:30:00.000+05:30",
        //                         "fillDateString": "Nov 4",
        //                         "productName": "OXYCONTIN, 10 MG, TABLET, FILM COATED, EXTENDED RELEASE",
        //                         "displayName": "OXYCONTIN, 10 MG, TABLET, FILM COAT",
        //                         "strengthDesc": "10 MG",
        //                         "dosage": 10,
        //                         "prescribedQty": 60,
        //                         "prescribedLen": 30,
        //                         "dailyME": 30,
        //                         "writtenDate": "2023-10-29T10:30:00.000+05:30",
        //                         "writtenDateString": "Oct 29",
        //                         "nrCode": "R",
        //                         "refillCount": 0,
        //                         "rxNum": " ",
        //                         "isActive": false,
        //                         "isOurs": false,
        //                         "prescriber": {
        //                             "id": "6394725267406848",
        //                             "created": "2023-04-18T09:38:24.558+05:30",
        //                             "modified": "2023-04-18T09:38:24.558+05:30",
        //                             "firstName": "MARQUITTA",
        //                             "lastName": "BROCK",
        //                             "sourceAddress": "3806-3898 n brown ave  scottsdale,az 85251",
        //                             "location": {
        //                                 "id": "5268825360564224",
        //                                 "created": "2023-04-18T09:38:24.551+05:30",
        //                                 "modified": "2023-04-18T09:38:24.559+05:30",
        //                                 "line1": "3806 N Brown Ave",
        //                                 "city": "Scottsdale",
        //                                 "state": "AZ",
        //                                 "zip": "85251",
        //                                 "locLat": 33.4916008,
        //                                 "locLng": -111.9247454,
        //                                 "locSource": "3806-3898 n brown ave  scottsdale,az 85251"
        //                             },
        //                             "deaNumber": "MP1714460"
        //                         },
        //                         "pharmacy": {
        //                             "id": "5585484709363712",
        //                             "created": "2023-04-18T09:38:22.545+05:30",
        //                             "modified": "2023-04-18T09:38:22.545+05:30",
        //                             "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                             "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                             "location": {
        //                                 "id": "6148434662785024",
        //                                 "created": "2023-04-18T09:38:22.535+05:30",
        //                                 "modified": "2023-04-18T09:38:22.546+05:30",
        //                                 "line1": "3402 N Central Ave",
        //                                 "city": "Phoenix",
        //                                 "state": "AZ",
        //                                 "zip": "85012",
        //                                 "locLat": 33.4879117,
        //                                 "locLng": -112.0745667,
        //                                 "locSource": "3402 n central ave  phoenix,az 85012"
        //                             },
        //                             "deaNumber": "AW0572518"
        //                         },
        //                         "ndcCode": "59011041010",
        //                         "patientName": "ULA PECK",
        //                         "patientDOB": "02/04/1939",
        //                         "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                         "isExpectedPatient": true,
        //                         "ndcOriginalSource": "59011041010",
        //                         "productCodeQualifier": "ND",
        //                         "ourPharmacy": false,
        //                         "ourProvider": false,
        //                         "startDate": "2023-11-04T10:30:00.000+05:30",
        //                         "endDate": "2023-12-03T10:30:00.000+05:30"
        //                     }
        //                 ],
        //                 "prescriptionIds": [
        //                     "5560281841270784"
        //                 ],
        //                 "startDate": "2023-10-29T10:30:00.000+05:30",
        //                 "endDate": "2023-11-04T10:30:00.000+05:30",
        //                 "alertTypeString": "WriteFillGap"
        //             }
        //         ],
        //         "pmpReportId": "5313991236648960",
        //         "hasUnexpectedPatients": false,
        //         "outsideProviders": [
        //             "4565137918787584",
        //             "4661894942031872",
        //             "4732263686209536",
        //             "5022534755942400",
        //             "4943369918742528",
        //             "5013738662920192",
        //             "5128087872208896",
        //             "5295213639630848",
        //             "5506319872163840",
        //             "5435951127986176",
        //             "5831775313985536",
        //             "5761406569807872",
        //             "5902144058163200",
        //             "5647057360519168",
        //             "5717426104696832",
        //             "5972512802340864",
        //             "6113250290696192",
        //             "6042881546518528",
        //             "5998901081407488",
        //             "6394725267406848",
        //             "6465094011584512",
        //             "6210007313940480",
        //             "6280376058118144",
        //             "6535462755762176",
        //             "6676200244117504",
        //             "6605831499939840",
        //             "6746568988295168",
        //             "6632219779006464"
        //         ],
        //         "outsidePharmacies": [
        //             "5224844895453184",
        //             "5585484709363712",
        //             "6183619034873856",
        //             "5928532337229824",
        //             "6324356523229184"
        //         ]
        //     },
        //     "practice": {
        //         "id": "4634407151337472",
        //         "created": "2023-04-17T10:03:27.879+05:30",
        //         "modified": "2024-01-26T10:09:08.701+05:30",
        //         "practiceName": "Wright State",
        //         "practiceType": "PR",
        //         "address": {
        //             "id": "6675100732489728",
        //             "created": "2023-04-17T10:03:27.850+05:30",
        //             "modified": "2024-01-26T10:09:08.701+05:30",
        //             "line1": "725 University Blvd",
        //             "city": "Fairborn",
        //             "state": "OH",
        //             "zip": "45324",
        //             "locLat": 39.7890131,
        //             "locLng": -84.0499837,
        //             "locSource": "725 University Blvd. Dayton, OH 45435"
        //         },
        //         "facilityName": "Wright State",
        //         "facilityNPI": "1114920329",
        //         "medThreshold": 90,
        //         "alertDaysBack": 90,
        //         "alertWriteFillGap": 5,
        //         "expectedPatientsPerNight": 0,
        //         "wizardProgress": -1,
        //         "gatewayAccountString": "wrightstate:wbvDZkjK$5@1",
        //         "defaultPMPState": "OH",
        //         "showMap": true,
        //         "checkForEncounterStart": false,
        //         "checkForEncounterEnd": false,
        //         "askIfPrescribedAtEncounterEnd": false,
        //         "askIfExpectedAtEncounterEnd": false,
        //         "askIfAffectedAtEncounterEnd": false,
        //         "showCurrentDayAppointmentsOnly": false,
        //         "lastApptFileUpload": {
        //             "dayOfMonth": 26,
        //             "dayOfWeek": 5,
        //             "era": 1,
        //             "year": 2024,
        //             "dayOfYear": 26,
        //             "weekOfWeekyear": 4,
        //             "chronology": {
        //                 "zone": {
        //                     "fixed": true,
        //                     "id": "UTC"
        //                 }
        //             },
        //             "centuryOfEra": 20,
        //             "yearOfCentury": 24,
        //             "weekyear": 2024,
        //             "yearOfEra": 2024,
        //             "monthOfYear": 1,
        //             "fields": [
        //                 {
        //                     "leapDurationField": {
        //                         "precise": true,
        //                         "unitMillis": "86400000",
        //                         "name": "days",
        //                         "type": {
        //                             "name": "days"
        //                         },
        //                         "supported": true
        //                     },
        //                     "lenient": false,
        //                     "minimumValue": -292275054,
        //                     "maximumValue": 292278993,
        //                     "durationField": {
        //                         "precise": false,
        //                         "unitMillis": "31556952000",
        //                         "name": "years",
        //                         "type": {
        //                             "name": "years"
        //                         },
        //                         "supported": true
        //                     },
        //                     "name": "year",
        //                     "type": {
        //                         "durationType": {
        //                             "name": "years"
        //                         },
        //                         "name": "year"
        //                     },
        //                     "supported": true
        //                 },
        //                 {
        //                     "rangeDurationField": {
        //                         "precise": false,
        //                         "unitMillis": "31556952000",
        //                         "name": "years",
        //                         "type": {
        //                             "name": "years"
        //                         },
        //                         "supported": true
        //                     },
        //                     "leapDurationField": {
        //                         "precise": true,
        //                         "unitMillis": "86400000",
        //                         "name": "days",
        //                         "type": {
        //                             "name": "days"
        //                         },
        //                         "supported": true
        //                     },
        //                     "lenient": false,
        //                     "minimumValue": 1,
        //                     "maximumValue": 12,
        //                     "durationField": {
        //                         "precise": false,
        //                         "unitMillis": "2629746000",
        //                         "name": "months",
        //                         "type": {
        //                             "name": "months"
        //                         },
        //                         "supported": true
        //                     },
        //                     "name": "monthOfYear",
        //                     "type": {
        //                         "durationType": {
        //                             "name": "months"
        //                         },
        //                         "rangeDurationType": {
        //                             "name": "years"
        //                         },
        //                         "name": "monthOfYear"
        //                     },
        //                     "supported": true
        //                 },
        //                 {
        //                     "rangeDurationField": {
        //                         "precise": false,
        //                         "unitMillis": "2629746000",
        //                         "name": "months",
        //                         "type": {
        //                             "name": "months"
        //                         },
        //                         "supported": true
        //                     },
        //                     "minimumValue": 1,
        //                     "maximumValue": 31,
        //                     "lenient": false,
        //                     "durationField": {
        //                         "precise": true,
        //                         "unitMillis": "86400000",
        //                         "name": "days",
        //                         "type": {
        //                             "name": "days"
        //                         },
        //                         "supported": true
        //                     },
        //                     "unitMillis": "86400000",
        //                     "name": "dayOfMonth",
        //                     "type": {
        //                         "durationType": {
        //                             "name": "days"
        //                         },
        //                         "rangeDurationType": {
        //                             "name": "months"
        //                         },
        //                         "name": "dayOfMonth"
        //                     },
        //                     "supported": true
        //                 }
        //             ],
        //             "values": [
        //                 2024,
        //                 1,
        //                 26
        //             ],
        //             "fieldTypes": [
        //                 {
        //                     "durationType": {
        //                         "name": "years"
        //                     },
        //                     "name": "year"
        //                 },
        //                 {
        //                     "durationType": {
        //                         "name": "months"
        //                     },
        //                     "rangeDurationType": {
        //                         "name": "years"
        //                     },
        //                     "name": "monthOfYear"
        //                 },
        //                 {
        //                     "durationType": {
        //                         "name": "days"
        //                     },
        //                     "rangeDurationType": {
        //                         "name": "months"
        //                     },
        //                     "name": "dayOfMonth"
        //                 }
        //             ]
        //         },
        //         "autoSavePastReport": true,
        //         "usesEHRIntegration": true,
        //         "usesRedox": true,
        //         "usesScheduleIntegration": false,
        //         "scheduleIntegrationType": "",
        //         "useLegacyPdf": false,
        //         "athenaPracticeId": "1959153",
        //         "automaticLogoutTimer": 15,
        //         "automaticRefreshTimer": 5
        //     },
        //     "requester": "V, Roman",
        //     "appointments": [
        //         {
        //             "id": "4856594399494144",
        //             "created": "2024-01-26T08:36:42.119+05:30",
        //             "modified": "2024-01-26T11:07:48.312+05:30",
        //             "patientLast": "PECK",
        //             "patientFirst": "ULA",
        //             "patientDOB": {
        //                 "dayOfMonth": 4,
        //                 "dayOfWeek": 6,
        //                 "era": 1,
        //                 "year": 1939,
        //                 "dayOfYear": 35,
        //                 "weekOfWeekyear": 5,
        //                 "chronology": {
        //                     "zone": {
        //                         "fixed": true,
        //                         "id": "UTC"
        //                     }
        //                 },
        //                 "centuryOfEra": 19,
        //                 "yearOfCentury": 39,
        //                 "weekyear": 1939,
        //                 "yearOfEra": 1939,
        //                 "monthOfYear": 2,
        //                 "fields": [
        //                     {
        //                         "leapDurationField": {
        //                             "precise": true,
        //                             "unitMillis": "86400000",
        //                             "name": "days",
        //                             "type": {
        //                                 "name": "days"
        //                             },
        //                             "supported": true
        //                         },
        //                         "lenient": false,
        //                         "minimumValue": -292275054,
        //                         "maximumValue": 292278993,
        //                         "durationField": {
        //                             "precise": false,
        //                             "unitMillis": "31556952000",
        //                             "name": "years",
        //                             "type": {
        //                                 "name": "years"
        //                             },
        //                             "supported": true
        //                         },
        //                         "name": "year",
        //                         "type": {
        //                             "durationType": {
        //                                 "name": "years"
        //                             },
        //                             "name": "year"
        //                         },
        //                         "supported": true
        //                     },
        //                     {
        //                         "rangeDurationField": {
        //                             "precise": false,
        //                             "unitMillis": "31556952000",
        //                             "name": "years",
        //                             "type": {
        //                                 "name": "years"
        //                             },
        //                             "supported": true
        //                         },
        //                         "leapDurationField": {
        //                             "precise": true,
        //                             "unitMillis": "86400000",
        //                             "name": "days",
        //                             "type": {
        //                                 "name": "days"
        //                             },
        //                             "supported": true
        //                         },
        //                         "lenient": false,
        //                         "minimumValue": 1,
        //                         "maximumValue": 12,
        //                         "durationField": {
        //                             "precise": false,
        //                             "unitMillis": "2629746000",
        //                             "name": "months",
        //                             "type": {
        //                                 "name": "months"
        //                             },
        //                             "supported": true
        //                         },
        //                         "name": "monthOfYear",
        //                         "type": {
        //                             "durationType": {
        //                                 "name": "months"
        //                             },
        //                             "rangeDurationType": {
        //                                 "name": "years"
        //                             },
        //                             "name": "monthOfYear"
        //                         },
        //                         "supported": true
        //                     },
        //                     {
        //                         "rangeDurationField": {
        //                             "precise": false,
        //                             "unitMillis": "2629746000",
        //                             "name": "months",
        //                             "type": {
        //                                 "name": "months"
        //                             },
        //                             "supported": true
        //                         },
        //                         "minimumValue": 1,
        //                         "maximumValue": 31,
        //                         "lenient": false,
        //                         "durationField": {
        //                             "precise": true,
        //                             "unitMillis": "86400000",
        //                             "name": "days",
        //                             "type": {
        //                                 "name": "days"
        //                             },
        //                             "supported": true
        //                         },
        //                         "unitMillis": "86400000",
        //                         "name": "dayOfMonth",
        //                         "type": {
        //                             "durationType": {
        //                                 "name": "days"
        //                             },
        //                             "rangeDurationType": {
        //                                 "name": "months"
        //                             },
        //                             "name": "dayOfMonth"
        //                         },
        //                         "supported": true
        //                     }
        //                 ],
        //                 "values": [
        //                     1939,
        //                     2,
        //                     4
        //                 ],
        //                 "fieldTypes": [
        //                     {
        //                         "durationType": {
        //                             "name": "years"
        //                         },
        //                         "name": "year"
        //                     },
        //                     {
        //                         "durationType": {
        //                             "name": "months"
        //                         },
        //                         "rangeDurationType": {
        //                             "name": "years"
        //                         },
        //                         "name": "monthOfYear"
        //                     },
        //                     {
        //                         "durationType": {
        //                             "name": "days"
        //                         },
        //                         "rangeDurationType": {
        //                             "name": "months"
        //                         },
        //                         "name": "dayOfMonth"
        //                     }
        //                 ]
        //             },
        //             "patientDOBString": "02/04/1939",
        //             "patientZipString": "88789",
        //             "providerLast": "V",
        //             "providerFirst": "Roman",
        //             "appointmentDate": {
        //                 "dayOfMonth": 26,
        //                 "dayOfWeek": 5,
        //                 "era": 1,
        //                 "year": 2024,
        //                 "dayOfYear": 26,
        //                 "weekOfWeekyear": 4,
        //                 "chronology": {
        //                     "zone": {
        //                         "fixed": true,
        //                         "id": "UTC"
        //                     }
        //                 },
        //                 "centuryOfEra": 20,
        //                 "yearOfCentury": 24,
        //                 "weekyear": 2024,
        //                 "yearOfEra": 2024,
        //                 "monthOfYear": 1,
        //                 "fields": [
        //                     {
        //                         "leapDurationField": {
        //                             "precise": true,
        //                             "unitMillis": "86400000",
        //                             "name": "days",
        //                             "type": {
        //                                 "name": "days"
        //                             },
        //                             "supported": true
        //                         },
        //                         "lenient": false,
        //                         "minimumValue": -292275054,
        //                         "maximumValue": 292278993,
        //                         "durationField": {
        //                             "precise": false,
        //                             "unitMillis": "31556952000",
        //                             "name": "years",
        //                             "type": {
        //                                 "name": "years"
        //                             },
        //                             "supported": true
        //                         },
        //                         "name": "year",
        //                         "type": {
        //                             "durationType": {
        //                                 "name": "years"
        //                             },
        //                             "name": "year"
        //                         },
        //                         "supported": true
        //                     },
        //                     {
        //                         "rangeDurationField": {
        //                             "precise": false,
        //                             "unitMillis": "31556952000",
        //                             "name": "years",
        //                             "type": {
        //                                 "name": "years"
        //                             },
        //                             "supported": true
        //                         },
        //                         "leapDurationField": {
        //                             "precise": true,
        //                             "unitMillis": "86400000",
        //                             "name": "days",
        //                             "type": {
        //                                 "name": "days"
        //                             },
        //                             "supported": true
        //                         },
        //                         "lenient": false,
        //                         "minimumValue": 1,
        //                         "maximumValue": 12,
        //                         "durationField": {
        //                             "precise": false,
        //                             "unitMillis": "2629746000",
        //                             "name": "months",
        //                             "type": {
        //                                 "name": "months"
        //                             },
        //                             "supported": true
        //                         },
        //                         "name": "monthOfYear",
        //                         "type": {
        //                             "durationType": {
        //                                 "name": "months"
        //                             },
        //                             "rangeDurationType": {
        //                                 "name": "years"
        //                             },
        //                             "name": "monthOfYear"
        //                         },
        //                         "supported": true
        //                     },
        //                     {
        //                         "rangeDurationField": {
        //                             "precise": false,
        //                             "unitMillis": "2629746000",
        //                             "name": "months",
        //                             "type": {
        //                                 "name": "months"
        //                             },
        //                             "supported": true
        //                         },
        //                         "minimumValue": 1,
        //                         "maximumValue": 31,
        //                         "lenient": false,
        //                         "durationField": {
        //                             "precise": true,
        //                             "unitMillis": "86400000",
        //                             "name": "days",
        //                             "type": {
        //                                 "name": "days"
        //                             },
        //                             "supported": true
        //                         },
        //                         "unitMillis": "86400000",
        //                         "name": "dayOfMonth",
        //                         "type": {
        //                             "durationType": {
        //                                 "name": "days"
        //                             },
        //                             "rangeDurationType": {
        //                                 "name": "months"
        //                             },
        //                             "name": "dayOfMonth"
        //                         },
        //                         "supported": true
        //                     }
        //                 ],
        //                 "values": [
        //                     2024,
        //                     1,
        //                     26
        //                 ],
        //                 "fieldTypes": [
        //                     {
        //                         "durationType": {
        //                             "name": "years"
        //                         },
        //                         "name": "year"
        //                     },
        //                     {
        //                         "durationType": {
        //                             "name": "months"
        //                         },
        //                         "rangeDurationType": {
        //                             "name": "years"
        //                         },
        //                         "name": "monthOfYear"
        //                     },
        //                     {
        //                         "durationType": {
        //                             "name": "days"
        //                         },
        //                         "rangeDurationType": {
        //                             "name": "months"
        //                         },
        //                         "name": "dayOfMonth"
        //                     }
        //                 ]
        //             },
        //             "apptDate": "2024-01-26T00:00:00.000+05:30",
        //             "appointmentDateString": "01/26/2024",
        //             "appointmentTime": "08:36",
        //             "scheduledTime": {
        //                 "dayOfMonth": 26,
        //                 "dayOfWeek": 5,
        //                 "era": 1,
        //                 "year": 2024,
        //                 "dayOfYear": 26,
        //                 "weekOfWeekyear": 4,
        //                 "secondOfMinute": 0,
        //                 "millisOfSecond": 0,
        //                 "chronology": {
        //                     "zone": {
        //                         "fixed": true,
        //                         "id": "UTC"
        //                     }
        //                 },
        //                 "minuteOfHour": 36,
        //                 "centuryOfEra": 20,
        //                 "yearOfCentury": 24,
        //                 "millisOfDay": 30960000,
        //                 "weekyear": 2024,
        //                 "hourOfDay": 8,
        //                 "yearOfEra": 2024,
        //                 "monthOfYear": 1,
        //                 "fields": [
        //                     {
        //                         "leapDurationField": {
        //                             "precise": true,
        //                             "unitMillis": "86400000",
        //                             "name": "days",
        //                             "type": {
        //                                 "name": "days"
        //                             },
        //                             "supported": true
        //                         },
        //                         "lenient": false,
        //                         "minimumValue": -292275054,
        //                         "maximumValue": 292278993,
        //                         "durationField": {
        //                             "precise": false,
        //                             "unitMillis": "31556952000",
        //                             "name": "years",
        //                             "type": {
        //                                 "name": "years"
        //                             },
        //                             "supported": true
        //                         },
        //                         "name": "year",
        //                         "type": {
        //                             "durationType": {
        //                                 "name": "years"
        //                             },
        //                             "name": "year"
        //                         },
        //                         "supported": true
        //                     },
        //                     {
        //                         "rangeDurationField": {
        //                             "precise": false,
        //                             "unitMillis": "31556952000",
        //                             "name": "years",
        //                             "type": {
        //                                 "name": "years"
        //                             },
        //                             "supported": true
        //                         },
        //                         "leapDurationField": {
        //                             "precise": true,
        //                             "unitMillis": "86400000",
        //                             "name": "days",
        //                             "type": {
        //                                 "name": "days"
        //                             },
        //                             "supported": true
        //                         },
        //                         "lenient": false,
        //                         "minimumValue": 1,
        //                         "maximumValue": 12,
        //                         "durationField": {
        //                             "precise": false,
        //                             "unitMillis": "2629746000",
        //                             "name": "months",
        //                             "type": {
        //                                 "name": "months"
        //                             },
        //                             "supported": true
        //                         },
        //                         "name": "monthOfYear",
        //                         "type": {
        //                             "durationType": {
        //                                 "name": "months"
        //                             },
        //                             "rangeDurationType": {
        //                                 "name": "years"
        //                             },
        //                             "name": "monthOfYear"
        //                         },
        //                         "supported": true
        //                     },
        //                     {
        //                         "rangeDurationField": {
        //                             "precise": false,
        //                             "unitMillis": "2629746000",
        //                             "name": "months",
        //                             "type": {
        //                                 "name": "months"
        //                             },
        //                             "supported": true
        //                         },
        //                         "minimumValue": 1,
        //                         "maximumValue": 31,
        //                         "lenient": false,
        //                         "durationField": {
        //                             "precise": true,
        //                             "unitMillis": "86400000",
        //                             "name": "days",
        //                             "type": {
        //                                 "name": "days"
        //                             },
        //                             "supported": true
        //                         },
        //                         "unitMillis": "86400000",
        //                         "name": "dayOfMonth",
        //                         "type": {
        //                             "durationType": {
        //                                 "name": "days"
        //                             },
        //                             "rangeDurationType": {
        //                                 "name": "months"
        //                             },
        //                             "name": "dayOfMonth"
        //                         },
        //                         "supported": true
        //                     },
        //                     {
        //                         "rangeDurationField": {
        //                             "precise": true,
        //                             "unitMillis": "86400000",
        //                             "name": "days",
        //                             "type": {
        //                                 "name": "days"
        //                             },
        //                             "supported": true
        //                         },
        //                         "maximumValue": 86399999,
        //                         "range": 86400000,
        //                         "lenient": false,
        //                         "durationField": {
        //                             "name": "millis",
        //                             "type": {
        //                                 "name": "millis"
        //                             },
        //                             "supported": true,
        //                             "precise": true,
        //                             "unitMillis": "1"
        //                         },
        //                         "minimumValue": 0,
        //                         "unitMillis": "1",
        //                         "name": "millisOfDay",
        //                         "type": {
        //                             "durationType": {
        //                                 "name": "millis"
        //                             },
        //                             "rangeDurationType": {
        //                                 "name": "days"
        //                             },
        //                             "name": "millisOfDay"
        //                         },
        //                         "supported": true
        //                     }
        //                 ],
        //                 "values": [
        //                     2024,
        //                     1,
        //                     26,
        //                     30960000
        //                 ],
        //                 "fieldTypes": [
        //                     {
        //                         "durationType": {
        //                             "name": "years"
        //                         },
        //                         "name": "year"
        //                     },
        //                     {
        //                         "durationType": {
        //                             "name": "months"
        //                         },
        //                         "rangeDurationType": {
        //                             "name": "years"
        //                         },
        //                         "name": "monthOfYear"
        //                     },
        //                     {
        //                         "durationType": {
        //                             "name": "days"
        //                         },
        //                         "rangeDurationType": {
        //                             "name": "months"
        //                         },
        //                         "name": "dayOfMonth"
        //                     },
        //                     {
        //                         "durationType": {
        //                             "name": "millis"
        //                         },
        //                         "rangeDurationType": {
        //                             "name": "days"
        //                         },
        //                         "name": "millisOfDay"
        //                     }
        //                 ]
        //             },
        //             "encounterStartTime": {
        //                 "dayOfMonth": 26,
        //                 "dayOfWeek": 5,
        //                 "era": 1,
        //                 "year": 2024,
        //                 "dayOfYear": 26,
        //                 "weekOfWeekyear": 4,
        //                 "secondOfMinute": 48,
        //                 "millisOfSecond": 304,
        //                 "chronology": {
        //                     "zone": {
        //                         "fixed": true,
        //                         "id": "UTC"
        //                     }
        //                 },
        //                 "minuteOfHour": 7,
        //                 "centuryOfEra": 20,
        //                 "yearOfCentury": 24,
        //                 "millisOfDay": 40068304,
        //                 "weekyear": 2024,
        //                 "hourOfDay": 11,
        //                 "yearOfEra": 2024,
        //                 "monthOfYear": 1,
        //                 "fields": [
        //                     {
        //                         "leapDurationField": {
        //                             "precise": true,
        //                             "unitMillis": "86400000",
        //                             "name": "days",
        //                             "type": {
        //                                 "name": "days"
        //                             },
        //                             "supported": true
        //                         },
        //                         "lenient": false,
        //                         "minimumValue": -292275054,
        //                         "maximumValue": 292278993,
        //                         "durationField": {
        //                             "precise": false,
        //                             "unitMillis": "31556952000",
        //                             "name": "years",
        //                             "type": {
        //                                 "name": "years"
        //                             },
        //                             "supported": true
        //                         },
        //                         "name": "year",
        //                         "type": {
        //                             "durationType": {
        //                                 "name": "years"
        //                             },
        //                             "name": "year"
        //                         },
        //                         "supported": true
        //                     },
        //                     {
        //                         "rangeDurationField": {
        //                             "precise": false,
        //                             "unitMillis": "31556952000",
        //                             "name": "years",
        //                             "type": {
        //                                 "name": "years"
        //                             },
        //                             "supported": true
        //                         },
        //                         "leapDurationField": {
        //                             "precise": true,
        //                             "unitMillis": "86400000",
        //                             "name": "days",
        //                             "type": {
        //                                 "name": "days"
        //                             },
        //                             "supported": true
        //                         },
        //                         "lenient": false,
        //                         "minimumValue": 1,
        //                         "maximumValue": 12,
        //                         "durationField": {
        //                             "precise": false,
        //                             "unitMillis": "2629746000",
        //                             "name": "months",
        //                             "type": {
        //                                 "name": "months"
        //                             },
        //                             "supported": true
        //                         },
        //                         "name": "monthOfYear",
        //                         "type": {
        //                             "durationType": {
        //                                 "name": "months"
        //                             },
        //                             "rangeDurationType": {
        //                                 "name": "years"
        //                             },
        //                             "name": "monthOfYear"
        //                         },
        //                         "supported": true
        //                     },
        //                     {
        //                         "rangeDurationField": {
        //                             "precise": false,
        //                             "unitMillis": "2629746000",
        //                             "name": "months",
        //                             "type": {
        //                                 "name": "months"
        //                             },
        //                             "supported": true
        //                         },
        //                         "minimumValue": 1,
        //                         "maximumValue": 31,
        //                         "lenient": false,
        //                         "durationField": {
        //                             "precise": true,
        //                             "unitMillis": "86400000",
        //                             "name": "days",
        //                             "type": {
        //                                 "name": "days"
        //                             },
        //                             "supported": true
        //                         },
        //                         "unitMillis": "86400000",
        //                         "name": "dayOfMonth",
        //                         "type": {
        //                             "durationType": {
        //                                 "name": "days"
        //                             },
        //                             "rangeDurationType": {
        //                                 "name": "months"
        //                             },
        //                             "name": "dayOfMonth"
        //                         },
        //                         "supported": true
        //                     },
        //                     {
        //                         "rangeDurationField": {
        //                             "precise": true,
        //                             "unitMillis": "86400000",
        //                             "name": "days",
        //                             "type": {
        //                                 "name": "days"
        //                             },
        //                             "supported": true
        //                         },
        //                         "maximumValue": 86399999,
        //                         "range": 86400000,
        //                         "lenient": false,
        //                         "durationField": {
        //                             "name": "millis",
        //                             "type": {
        //                                 "name": "millis"
        //                             },
        //                             "supported": true,
        //                             "precise": true,
        //                             "unitMillis": "1"
        //                         },
        //                         "minimumValue": 0,
        //                         "unitMillis": "1",
        //                         "name": "millisOfDay",
        //                         "type": {
        //                             "durationType": {
        //                                 "name": "millis"
        //                             },
        //                             "rangeDurationType": {
        //                                 "name": "days"
        //                             },
        //                             "name": "millisOfDay"
        //                         },
        //                         "supported": true
        //                     }
        //                 ],
        //                 "values": [
        //                     2024,
        //                     1,
        //                     26,
        //                     40068304
        //                 ],
        //                 "fieldTypes": [
        //                     {
        //                         "durationType": {
        //                             "name": "years"
        //                         },
        //                         "name": "year"
        //                     },
        //                     {
        //                         "durationType": {
        //                             "name": "months"
        //                         },
        //                         "rangeDurationType": {
        //                             "name": "years"
        //                         },
        //                         "name": "monthOfYear"
        //                     },
        //                     {
        //                         "durationType": {
        //                             "name": "days"
        //                         },
        //                         "rangeDurationType": {
        //                             "name": "months"
        //                         },
        //                         "name": "dayOfMonth"
        //                     },
        //                     {
        //                         "durationType": {
        //                             "name": "millis"
        //                         },
        //                         "rangeDurationType": {
        //                             "name": "days"
        //                         },
        //                         "name": "millisOfDay"
        //                     }
        //                 ]
        //             },
        //             "encounterStartedById": "6323257011601408",
        //             "encounterEndTime": {
        //                 "dayOfMonth": 26,
        //                 "dayOfWeek": 5,
        //                 "era": 1,
        //                 "year": 2024,
        //                 "dayOfYear": 26,
        //                 "weekOfWeekyear": 4,
        //                 "secondOfMinute": 14,
        //                 "millisOfSecond": 185,
        //                 "chronology": {
        //                     "zone": {
        //                         "fixed": true,
        //                         "id": "UTC"
        //                     }
        //                 },
        //                 "minuteOfHour": 48,
        //                 "centuryOfEra": 20,
        //                 "yearOfCentury": 24,
        //                 "millisOfDay": 31694185,
        //                 "weekyear": 2024,
        //                 "hourOfDay": 8,
        //                 "yearOfEra": 2024,
        //                 "monthOfYear": 1,
        //                 "fields": [
        //                     {
        //                         "leapDurationField": {
        //                             "precise": true,
        //                             "unitMillis": "86400000",
        //                             "name": "days",
        //                             "type": {
        //                                 "name": "days"
        //                             },
        //                             "supported": true
        //                         },
        //                         "lenient": false,
        //                         "minimumValue": -292275054,
        //                         "maximumValue": 292278993,
        //                         "durationField": {
        //                             "precise": false,
        //                             "unitMillis": "31556952000",
        //                             "name": "years",
        //                             "type": {
        //                                 "name": "years"
        //                             },
        //                             "supported": true
        //                         },
        //                         "name": "year",
        //                         "type": {
        //                             "durationType": {
        //                                 "name": "years"
        //                             },
        //                             "name": "year"
        //                         },
        //                         "supported": true
        //                     },
        //                     {
        //                         "rangeDurationField": {
        //                             "precise": false,
        //                             "unitMillis": "31556952000",
        //                             "name": "years",
        //                             "type": {
        //                                 "name": "years"
        //                             },
        //                             "supported": true
        //                         },
        //                         "leapDurationField": {
        //                             "precise": true,
        //                             "unitMillis": "86400000",
        //                             "name": "days",
        //                             "type": {
        //                                 "name": "days"
        //                             },
        //                             "supported": true
        //                         },
        //                         "lenient": false,
        //                         "minimumValue": 1,
        //                         "maximumValue": 12,
        //                         "durationField": {
        //                             "precise": false,
        //                             "unitMillis": "2629746000",
        //                             "name": "months",
        //                             "type": {
        //                                 "name": "months"
        //                             },
        //                             "supported": true
        //                         },
        //                         "name": "monthOfYear",
        //                         "type": {
        //                             "durationType": {
        //                                 "name": "months"
        //                             },
        //                             "rangeDurationType": {
        //                                 "name": "years"
        //                             },
        //                             "name": "monthOfYear"
        //                         },
        //                         "supported": true
        //                     },
        //                     {
        //                         "rangeDurationField": {
        //                             "precise": false,
        //                             "unitMillis": "2629746000",
        //                             "name": "months",
        //                             "type": {
        //                                 "name": "months"
        //                             },
        //                             "supported": true
        //                         },
        //                         "minimumValue": 1,
        //                         "maximumValue": 31,
        //                         "lenient": false,
        //                         "durationField": {
        //                             "precise": true,
        //                             "unitMillis": "86400000",
        //                             "name": "days",
        //                             "type": {
        //                                 "name": "days"
        //                             },
        //                             "supported": true
        //                         },
        //                         "unitMillis": "86400000",
        //                         "name": "dayOfMonth",
        //                         "type": {
        //                             "durationType": {
        //                                 "name": "days"
        //                             },
        //                             "rangeDurationType": {
        //                                 "name": "months"
        //                             },
        //                             "name": "dayOfMonth"
        //                         },
        //                         "supported": true
        //                     },
        //                     {
        //                         "rangeDurationField": {
        //                             "precise": true,
        //                             "unitMillis": "86400000",
        //                             "name": "days",
        //                             "type": {
        //                                 "name": "days"
        //                             },
        //                             "supported": true
        //                         },
        //                         "maximumValue": 86399999,
        //                         "range": 86400000,
        //                         "lenient": false,
        //                         "durationField": {
        //                             "name": "millis",
        //                             "type": {
        //                                 "name": "millis"
        //                             },
        //                             "supported": true,
        //                             "precise": true,
        //                             "unitMillis": "1"
        //                         },
        //                         "minimumValue": 0,
        //                         "unitMillis": "1",
        //                         "name": "millisOfDay",
        //                         "type": {
        //                             "durationType": {
        //                                 "name": "millis"
        //                             },
        //                             "rangeDurationType": {
        //                                 "name": "days"
        //                             },
        //                             "name": "millisOfDay"
        //                         },
        //                         "supported": true
        //                     }
        //                 ],
        //                 "values": [
        //                     2024,
        //                     1,
        //                     26,
        //                     31694185
        //                 ],
        //                 "fieldTypes": [
        //                     {
        //                         "durationType": {
        //                             "name": "years"
        //                         },
        //                         "name": "year"
        //                     },
        //                     {
        //                         "durationType": {
        //                             "name": "months"
        //                         },
        //                         "rangeDurationType": {
        //                             "name": "years"
        //                         },
        //                         "name": "monthOfYear"
        //                     },
        //                     {
        //                         "durationType": {
        //                             "name": "days"
        //                         },
        //                         "rangeDurationType": {
        //                             "name": "months"
        //                         },
        //                         "name": "dayOfMonth"
        //                     },
        //                     {
        //                         "durationType": {
        //                             "name": "millis"
        //                         },
        //                         "rangeDurationType": {
        //                             "name": "days"
        //                         },
        //                         "name": "millisOfDay"
        //                     }
        //                 ]
        //             },
        //             "encounterEndById": "6323257011601408",
        //             "censusAppointment": false,
        //             "appointmentSource": "Manual Request",
        //             "practiceId": "4634407151337472",
        //             "patientId": "6007697174429696",
        //             "providerId": "6323257011601408",
        //             "pmpReportId": "5313991236648960",
        //             "processingStatus": "Ready",
        //             "patientHidden": false,
        //             "patientHiddenByDelegate": false,
        //             "reprocessingNoData": false,
        //             "emptyAppointment": false
        //         }
        //     ],
        //     "wfGapIds": [
        //         "5841756817981440",
        //         "6123231794692096",
        //         "6686181748113408",
        //         "4715856911138816",
        //         "4997331887849472",
        //         "5560281841270784"
        //     ],
        //     "summary": "Found 17 PastRx Alerts in PMP data.",
        //     "currentPrescriptions": [
        //         {
        //             "id": "4715856911138816",
        //             "created": "2024-01-26T08:36:48.994+05:30",
        //             "modified": "2024-01-26T08:36:49.754+05:30",
        //             "patientId": "6007697174429696",
        //             "classification": "OPIOID",
        //             "fillDate": "2024-01-05T10:30:00.000+05:30",
        //             "fillDateString": "Jan 5",
        //             "productName": "OXYCONTIN, 10 MG, TABLET, FILM COATED, EXTENDED RELEASE",
        //             "displayName": "OXYCONTIN, 10 MG, TABLET, FILM COAT",
        //             "strengthDesc": "10 MG",
        //             "dosage": 10,
        //             "prescribedQty": 60,
        //             "prescribedLen": 30,
        //             "dailyME": 30,
        //             "writtenDate": "2023-12-23T10:30:00.000+05:30",
        //             "writtenDateString": "Dec 23",
        //             "nrCode": "R",
        //             "refillCount": 0,
        //             "rxNum": " ",
        //             "isActive": true,
        //             "isOurs": false,
        //             "prescriber": {
        //                 "id": "5022534755942400",
        //                 "created": "2023-04-18T09:38:22.275+05:30",
        //                 "modified": "2023-04-18T09:38:22.275+05:30",
        //                 "firstName": "TAWNYA",
        //                 "lastName": "NUNEZ",
        //                 "sourceAddress": "6989 n hayden rd  scottsdale,az 85250",
        //                 "location": {
        //                     "id": "6429909639495680",
        //                     "created": "2023-04-18T09:38:22.264+05:30",
        //                     "modified": "2023-04-18T09:38:22.277+05:30",
        //                     "line1": "6989 N Hayden Rd",
        //                     "city": "Scottsdale",
        //                     "state": "AZ",
        //                     "zip": "85250",
        //                     "locLat": 33.5379566,
        //                     "locLng": -111.9060417,
        //                     "locSource": "6989 n hayden rd  scottsdale,az 85250"
        //                 },
        //                 "deaNumber": "MH3849176"
        //             },
        //             "pharmacy": {
        //                 "id": "5585484709363712",
        //                 "created": "2023-04-18T09:38:22.545+05:30",
        //                 "modified": "2023-04-18T09:38:22.545+05:30",
        //                 "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                 "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                 "location": {
        //                     "id": "6148434662785024",
        //                     "created": "2023-04-18T09:38:22.535+05:30",
        //                     "modified": "2023-04-18T09:38:22.546+05:30",
        //                     "line1": "3402 N Central Ave",
        //                     "city": "Phoenix",
        //                     "state": "AZ",
        //                     "zip": "85012",
        //                     "locLat": 33.4879117,
        //                     "locLng": -112.0745667,
        //                     "locSource": "3402 n central ave  phoenix,az 85012"
        //                 },
        //                 "deaNumber": "AW0572518"
        //             },
        //             "ndcCode": "59011041010",
        //             "patientName": "ULA PECK",
        //             "patientDOB": "02/04/1939",
        //             "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //             "isExpectedPatient": true,
        //             "ndcOriginalSource": "59011041010",
        //             "productCodeQualifier": "ND",
        //             "ourPharmacy": false,
        //             "ourProvider": false,
        //             "startDate": "2024-01-05T10:30:00.000+05:30",
        //             "endDate": "2024-02-03T10:30:00.000+05:30"
        //         },
        //         {
        //             "id": "5841756817981440",
        //             "created": "2024-01-26T08:36:48.994+05:30",
        //             "modified": "2024-01-26T08:36:49.755+05:30",
        //             "patientId": "6007697174429696",
        //             "classification": "OPIOID",
        //             "fillDate": "2024-01-05T10:30:00.000+05:30",
        //             "fillDateString": "Jan 5",
        //             "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //             "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //             "strengthDesc": "10 MG;325 MG",
        //             "dosage": 10,
        //             "prescribedQty": 105,
        //             "prescribedLen": 30,
        //             "dailyME": 53,
        //             "writtenDate": "2023-12-23T10:30:00.000+05:30",
        //             "writtenDateString": "Dec 23",
        //             "nrCode": "R",
        //             "refillCount": 0,
        //             "rxNum": " ",
        //             "isActive": true,
        //             "isOurs": false,
        //             "prescriber": {
        //                 "id": "4565137918787584",
        //                 "created": "2023-04-18T09:38:22.853+05:30",
        //                 "modified": "2023-04-18T09:38:22.853+05:30",
        //                 "firstName": "TAWNYA",
        //                 "lastName": "NUNEZ",
        //                 "sourceAddress": "3815 n brown ave  scottsdale,az 85251",
        //                 "location": {
        //                     "id": "6711384616206336",
        //                     "created": "2023-04-18T09:38:22.846+05:30",
        //                     "modified": "2023-04-18T09:38:22.854+05:30",
        //                     "line1": "3815 N Brown Ave",
        //                     "city": "Scottsdale",
        //                     "state": "AZ",
        //                     "zip": "85251",
        //                     "locLat": 33.4918372,
        //                     "locLng": -111.9242563,
        //                     "locSource": "3815 n brown ave  scottsdale,az 85251"
        //                 },
        //                 "deaNumber": "MH3849176"
        //             },
        //             "pharmacy": {
        //                 "id": "5585484709363712",
        //                 "created": "2023-04-18T09:38:22.545+05:30",
        //                 "modified": "2023-04-18T09:38:22.545+05:30",
        //                 "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                 "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                 "location": {
        //                     "id": "6148434662785024",
        //                     "created": "2023-04-18T09:38:22.535+05:30",
        //                     "modified": "2023-04-18T09:38:22.546+05:30",
        //                     "line1": "3402 N Central Ave",
        //                     "city": "Phoenix",
        //                     "state": "AZ",
        //                     "zip": "85012",
        //                     "locLat": 33.4879117,
        //                     "locLng": -112.0745667,
        //                     "locSource": "3402 n central ave  phoenix,az 85012"
        //                 },
        //                 "deaNumber": "AW0572518"
        //             },
        //             "ndcCode": "00228298311",
        //             "patientName": "ULA PECK",
        //             "patientDOB": "02/04/1939",
        //             "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //             "isExpectedPatient": true,
        //             "ndcOriginalSource": "00228298311",
        //             "productCodeQualifier": "ND",
        //             "ourPharmacy": false,
        //             "ourProvider": false,
        //             "startDate": "2024-01-05T10:30:00.000+05:30",
        //             "endDate": "2024-02-03T10:30:00.000+05:30"
        //         }
        //     ],
        //     "result": {
        //         "pastReport": {
        //             "reportDate": "2024-01-26T00:00:00.000+05:30",
        //             "processDate": "2024-01-26T08:36:44.952+05:30",
        //             "patient": {
        //                 "id": "6007697174429696",
        //                 "created": "2023-04-18T09:38:17.912+05:30",
        //                 "modified": "2024-01-26T08:36:50.003+05:30",
        //                 "ownerId": "6323257011601408",
        //                 "practiceId": "4634407151337472",
        //                 "hashString": "e438717f05a318cc4b5ba990a584d1f0",
        //                 "firstName": "ULA",
        //                 "lastName": "PECK",
        //                 "dateOfBirth": "1939-02-04T00:00:00.000+05:30",
        //                 "dobString": "02/04/1939",
        //                 "lDateOfBirth": {
        //                     "dayOfMonth": 4,
        //                     "dayOfWeek": 6,
        //                     "era": 1,
        //                     "year": 1939,
        //                     "dayOfYear": 35,
        //                     "weekOfWeekyear": 5,
        //                     "chronology": {
        //                         "zone": {
        //                             "fixed": true,
        //                             "id": "UTC"
        //                         }
        //                     },
        //                     "centuryOfEra": 19,
        //                     "yearOfCentury": 39,
        //                     "weekyear": 1939,
        //                     "yearOfEra": 1939,
        //                     "monthOfYear": 2,
        //                     "fields": [
        //                         {
        //                             "leapDurationField": {
        //                                 "precise": true,
        //                                 "unitMillis": "86400000",
        //                                 "name": "days",
        //                                 "type": {
        //                                     "name": "days"
        //                                 },
        //                                 "supported": true
        //                             },
        //                             "lenient": false,
        //                             "minimumValue": -292275054,
        //                             "maximumValue": 292278993,
        //                             "durationField": {
        //                                 "precise": false,
        //                                 "unitMillis": "31556952000",
        //                                 "name": "years",
        //                                 "type": {
        //                                     "name": "years"
        //                                 },
        //                                 "supported": true
        //                             },
        //                             "name": "year",
        //                             "type": {
        //                                 "durationType": {
        //                                     "name": "years"
        //                                 },
        //                                 "name": "year"
        //                             },
        //                             "supported": true
        //                         },
        //                         {
        //                             "rangeDurationField": {
        //                                 "precise": false,
        //                                 "unitMillis": "31556952000",
        //                                 "name": "years",
        //                                 "type": {
        //                                     "name": "years"
        //                                 },
        //                                 "supported": true
        //                             },
        //                             "leapDurationField": {
        //                                 "precise": true,
        //                                 "unitMillis": "86400000",
        //                                 "name": "days",
        //                                 "type": {
        //                                     "name": "days"
        //                                 },
        //                                 "supported": true
        //                             },
        //                             "lenient": false,
        //                             "minimumValue": 1,
        //                             "maximumValue": 12,
        //                             "durationField": {
        //                                 "precise": false,
        //                                 "unitMillis": "2629746000",
        //                                 "name": "months",
        //                                 "type": {
        //                                     "name": "months"
        //                                 },
        //                                 "supported": true
        //                             },
        //                             "name": "monthOfYear",
        //                             "type": {
        //                                 "durationType": {
        //                                     "name": "months"
        //                                 },
        //                                 "rangeDurationType": {
        //                                     "name": "years"
        //                                 },
        //                                 "name": "monthOfYear"
        //                             },
        //                             "supported": true
        //                         },
        //                         {
        //                             "rangeDurationField": {
        //                                 "precise": false,
        //                                 "unitMillis": "2629746000",
        //                                 "name": "months",
        //                                 "type": {
        //                                     "name": "months"
        //                                 },
        //                                 "supported": true
        //                             },
        //                             "minimumValue": 1,
        //                             "maximumValue": 31,
        //                             "lenient": false,
        //                             "durationField": {
        //                                 "precise": true,
        //                                 "unitMillis": "86400000",
        //                                 "name": "days",
        //                                 "type": {
        //                                     "name": "days"
        //                                 },
        //                                 "supported": true
        //                             },
        //                             "unitMillis": "86400000",
        //                             "name": "dayOfMonth",
        //                             "type": {
        //                                 "durationType": {
        //                                     "name": "days"
        //                                 },
        //                                 "rangeDurationType": {
        //                                     "name": "months"
        //                                 },
        //                                 "name": "dayOfMonth"
        //                             },
        //                             "supported": true
        //                         }
        //                     ],
        //                     "values": [
        //                         1939,
        //                         2,
        //                         4
        //                     ],
        //                     "fieldTypes": [
        //                         {
        //                             "durationType": {
        //                                 "name": "years"
        //                             },
        //                             "name": "year"
        //                         },
        //                         {
        //                             "durationType": {
        //                                 "name": "months"
        //                             },
        //                             "rangeDurationType": {
        //                                 "name": "years"
        //                             },
        //                             "name": "monthOfYear"
        //                         },
        //                         {
        //                             "durationType": {
        //                                 "name": "days"
        //                             },
        //                             "rangeDurationType": {
        //                                 "name": "months"
        //                             },
        //                             "name": "dayOfMonth"
        //                         }
        //                     ]
        //                 },
        //                 "status": "Ready",
        //                 "address": {
        //                     "id": "5304009732653056",
        //                     "created": "2023-04-18T09:38:22.002+05:30",
        //                     "modified": "2024-01-26T08:36:50.003+05:30",
        //                     "line1": "1702 W Camelback Rd",
        //                     "city": "Phoenix",
        //                     "state": "AZ",
        //                     "zip": "85015",
        //                     "locLat": 33.5101779,
        //                     "locLng": -112.0961681,
        //                     "locSource": "1702 w camelback rd  phoenix,az 85015"
        //                 },
        //                 "appointmentDate": "2023-04-17T00:00:00.000+05:30",
        //                 "appointmentTimeString": "00:00",
        //                 "appointmentDateTime": "2023-04-17T00:00:00.000+05:30",
        //                 "lastAppointmentSource": "Manual Request",
        //                 "lastReportDateString": "2024-01-25",
        //                 "zipCode": "88789",
        //                 "provider": "Roman V",
        //                 "alertPresent": true,
        //                 "highDoseAlert": true,
        //                 "notOurPrescriberAlert": true,
        //                 "notOurPharmacyAlert": true,
        //                 "multipleAlert": true,
        //                 "screenAlert": false,
        //                 "otherAlert": true,
        //                 "otherAlertString": "W/F Gap",
        //                 "unexpectedPatientAlert": false,
        //                 "multiplePrescriberSameCat": true,
        //                 "overlappingPrescriber": true,
        //                 "overlappingPharmacy": true,
        //                 "maxMEDD": 278,
        //                 "currentMEDD": 83,
        //                 "ccdLoaded": false,
        //                 "ccdProblem": false,
        //                 "pmpLoaded": true,
        //                 "pmpNoData": false,
        //                 "pmpProblem": false,
        //                 "pmpAndCcdProblem": false,
        //                 "apptLoaded": true,
        //                 "alertsProcessed": false,
        //                 "pmpAlertsProcessed": true,
        //                 "combinedAlertsProcessed": false,
        //                 "photoLoaded": false,
        //                 "late": false,
        //                 "veryLate": false,
        //                 "problemCodes": "",
        //                 "latestPrescriberNote": "",
        //                 "qualityKey": "  CCD:NO  PMP:OK  APPOINTMENT:OK  ALERTS:NO",
        //                 "fullPatientName": "ULA PECK",
        //                 "athenaPatient": false
        //             },
        //             "reportingState": "OH",
        //             "prescribers": [
        //                 {
        //                     "id": "5013738662920192",
        //                     "created": "2023-04-18T09:38:32.010+05:30",
        //                     "modified": "2023-04-18T09:38:32.010+05:30",
        //                     "firstName": "SHERISE",
        //                     "lastName": "ALSTON",
        //                     "sourceAddress": "1707 w camelback rd  phoenix,az 85015",
        //                     "location": {
        //                         "id": "6421113546473472",
        //                         "created": "2023-04-18T09:38:32.003+05:30",
        //                         "modified": "2023-04-18T09:38:32.011+05:30",
        //                         "line1": "1707 W Camelback Rd",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85015",
        //                         "locLat": 33.509006,
        //                         "locLng": -112.096277,
        //                         "locSource": "1707 w camelback rd  phoenix,az 85015"
        //                     },
        //                     "deaNumber": "FR4679734"
        //                 },
        //                 {
        //                     "id": "4661894942031872",
        //                     "created": "2023-04-18T09:38:28.708+05:30",
        //                     "modified": "2023-04-18T09:38:28.708+05:30",
        //                     "firstName": "LEONORE",
        //                     "lastName": "BURKE",
        //                     "sourceAddress": "3330 n scottsdale rd  scottsdale,az 85251",
        //                     "location": {
        //                         "id": "6491482290651136",
        //                         "created": "2023-04-18T09:38:28.700+05:30",
        //                         "modified": "2023-04-18T09:38:28.708+05:30",
        //                         "line1": "3330 N Scottsdale Rd",
        //                         "city": "Scottsdale",
        //                         "state": "AZ",
        //                         "zip": "85251",
        //                         "locLat": 33.4870326,
        //                         "locLng": -111.9272421,
        //                         "locSource": "3330 n scottsdale rd  scottsdale,az 85251"
        //                     },
        //                     "deaNumber": "MF3403273"
        //                 },
        //                 {
        //                     "id": "5022534755942400",
        //                     "created": "2023-04-18T09:38:22.275+05:30",
        //                     "modified": "2023-04-18T09:38:22.275+05:30",
        //                     "firstName": "TAWNYA",
        //                     "lastName": "NUNEZ",
        //                     "sourceAddress": "6989 n hayden rd  scottsdale,az 85250",
        //                     "location": {
        //                         "id": "6429909639495680",
        //                         "created": "2023-04-18T09:38:22.264+05:30",
        //                         "modified": "2023-04-18T09:38:22.277+05:30",
        //                         "line1": "6989 N Hayden Rd",
        //                         "city": "Scottsdale",
        //                         "state": "AZ",
        //                         "zip": "85250",
        //                         "locLat": 33.5379566,
        //                         "locLng": -111.9060417,
        //                         "locSource": "6989 n hayden rd  scottsdale,az 85250"
        //                     },
        //                     "deaNumber": "MH3849176"
        //                 },
        //                 {
        //                     "id": "6280376058118144",
        //                     "created": "2023-04-18T09:38:30.534+05:30",
        //                     "modified": "2023-04-18T09:38:30.534+05:30",
        //                     "firstName": "MARNA",
        //                     "lastName": "WITT",
        //                     "sourceAddress": "20759-20963 n tatum blvd  phoenix,az 85050",
        //                     "location": {
        //                         "id": "5154476151275520",
        //                         "created": "2023-04-18T09:38:30.528+05:30",
        //                         "modified": "2023-04-18T09:38:30.534+05:30",
        //                         "line1": "20759 N Tatum Blvd",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85054",
        //                         "locLat": 33.6749678,
        //                         "locLng": -111.9773019,
        //                         "locSource": "20759- 20963 n tatum blvd  phoenix,az 85050"
        //                     },
        //                     "deaNumber": "BS0422775"
        //                 },
        //                 {
        //                     "id": "6535462755762176",
        //                     "created": "2023-04-18T09:38:23.938+05:30",
        //                     "modified": "2023-04-18T09:38:23.938+05:30",
        //                     "firstName": "MARNA",
        //                     "lastName": "WITT",
        //                     "sourceAddress": "718 e union hills dr  phoenix,az 85024",
        //                     "location": {
        //                         "id": "5409562848919552",
        //                         "created": "2023-04-18T09:38:23.930+05:30",
        //                         "modified": "2023-04-18T09:38:23.939+05:30",
        //                         "line1": "718 E Union Hills Dr",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85024",
        //                         "locLat": 33.6561533,
        //                         "locLng": -112.0637055,
        //                         "locSource": "718 e union hills dr  phoenix,az 85024"
        //                     },
        //                     "deaNumber": "BS0422775"
        //                 },
        //                 {
        //                     "id": "6465094011584512",
        //                     "created": "2023-04-18T09:38:26.965+05:30",
        //                     "modified": "2023-04-18T09:38:26.965+05:30",
        //                     "firstName": "MARNA",
        //                     "lastName": "WITT",
        //                     "sourceAddress": "2605 w deer valley rd  phoenix,az 85027",
        //                     "location": {
        //                         "id": "5339194104741888",
        //                         "created": "2023-04-18T09:38:26.958+05:30",
        //                         "modified": "2023-04-18T09:38:26.965+05:30",
        //                         "line1": "2605 W Deer Valley Rd",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85027",
        //                         "locLat": 33.6830506,
        //                         "locLng": -112.1160883,
        //                         "locSource": "2605 w deer valley rd  phoenix,az 85027"
        //                     },
        //                     "deaNumber": "BS0422775"
        //                 },
        //                 {
        //                     "id": "4943369918742528",
        //                     "created": "2023-04-18T09:38:29.340+05:30",
        //                     "modified": "2023-04-18T09:38:29.340+05:30",
        //                     "firstName": "MARNA",
        //                     "lastName": "WITT",
        //                     "sourceAddress": "4214 w dunlap ave  phoenix,az 85051",
        //                     "location": {
        //                         "id": "6350744802295808",
        //                         "created": "2023-04-18T09:38:29.332+05:30",
        //                         "modified": "2023-04-18T09:38:29.341+05:30",
        //                         "line1": "4214 W Dunlap Ave",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85051",
        //                         "locLat": 33.5679233,
        //                         "locLng": -112.1495883,
        //                         "locSource": "4214 w dunlap ave  phoenix,az 85051"
        //                     },
        //                     "deaNumber": "BS0422775"
        //                 },
        //                 {
        //                     "id": "5435951127986176",
        //                     "created": "2023-04-18T09:38:31.034+05:30",
        //                     "modified": "2023-04-18T09:38:31.034+05:30",
        //                     "firstName": "BELKIS",
        //                     "lastName": "MUELLER",
        //                     "sourceAddress": "",
        //                     "deaNumber": "MH0820820"
        //                 },
        //                 {
        //                     "id": "5647057360519168",
        //                     "created": "2023-04-18T09:38:27.828+05:30",
        //                     "modified": "2023-04-18T09:38:27.828+05:30",
        //                     "firstName": "JESUS",
        //                     "lastName": "GOFF",
        //                     "sourceAddress": "3502 w greenway rd  phoenix,az 85053",
        //                     "location": {
        //                         "id": "4521157453676544",
        //                         "created": "2023-04-18T09:38:27.822+05:30",
        //                         "modified": "2023-04-18T09:38:27.829+05:30",
        //                         "line1": "3502 W Greenway Rd",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85053",
        //                         "locLat": 33.6255504,
        //                         "locLng": -112.1339396,
        //                         "locSource": "3502 w greenway rd  phoenix,az 85053"
        //                     },
        //                     "deaNumber": "MH3182261"
        //                 },
        //                 {
        //                     "id": "5128087872208896",
        //                     "created": "2023-04-18T09:38:23.147+05:30",
        //                     "modified": "2023-04-18T09:38:23.147+05:30",
        //                     "firstName": "",
        //                     "lastName": "",
        //                     "sourceAddress": "5022 n 17th ave  phoenix,az 85015",
        //                     "location": {
        //                         "id": "5691037825630208",
        //                         "created": "2023-04-18T09:38:23.141+05:30",
        //                         "modified": "2023-04-18T09:38:23.148+05:30",
        //                         "line1": "5022 N 17th Ave",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85015",
        //                         "locLat": 33.5106346,
        //                         "locLng": -112.0963149,
        //                         "locSource": "5022 n 17th ave  phoenix,az 85015"
        //                     },
        //                     "deaNumber": "BC7786140"
        //                 },
        //                 {
        //                     "id": "6210007313940480",
        //                     "created": "2023-04-18T09:38:28.143+05:30",
        //                     "modified": "2023-04-18T09:38:28.143+05:30",
        //                     "firstName": "LEONORE",
        //                     "lastName": "BURKE",
        //                     "sourceAddress": "3399 n scottsdale rd  scottsdale,az 85251",
        //                     "location": {
        //                         "id": "5084107407097856",
        //                         "created": "2023-04-18T09:38:28.104+05:30",
        //                         "modified": "2023-04-18T09:38:28.143+05:30",
        //                         "line1": "3399 N Scottsdale Rd",
        //                         "city": "Scottsdale",
        //                         "state": "AZ",
        //                         "zip": "85251",
        //                         "locLat": 33.4873821,
        //                         "locLng": -111.9253742,
        //                         "locSource": "3399 n scottsdale rd  scottsdale,az 85251"
        //                     },
        //                     "deaNumber": "MF3403273"
        //                 },
        //                 {
        //                     "id": "6676200244117504",
        //                     "created": "2023-04-18T09:38:25.169+05:30",
        //                     "modified": "2023-04-18T09:38:25.169+05:30",
        //                     "firstName": "MARQUITTA",
        //                     "lastName": "BROCK",
        //                     "sourceAddress": "3749-3799 e indian school rd  phoenix,az 85018",
        //                     "location": {
        //                         "id": "5550300337274880",
        //                         "created": "2023-04-18T09:38:25.162+05:30",
        //                         "modified": "2023-04-18T09:38:25.169+05:30",
        //                         "line1": "3749 E Indian School Rd",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85018",
        //                         "locLat": 33.49479520000001,
        //                         "locLng": -112.0001152,
        //                         "locSource": "3749-3799 e indian school rd  phoenix,az 85018"
        //                     },
        //                     "deaNumber": "MP1714460"
        //                 },
        //                 {
        //                     "id": "5998901081407488",
        //                     "created": "2023-04-18T09:38:30.934+05:30",
        //                     "modified": "2023-04-18T09:38:30.934+05:30",
        //                     "firstName": "MARNA",
        //                     "lastName": "WITT",
        //                     "sourceAddress": "5310 e high st  phoenix,az 85054",
        //                     "location": {
        //                         "id": "4873001174564864",
        //                         "created": "2023-04-18T09:38:30.926+05:30",
        //                         "modified": "2023-04-18T09:38:30.934+05:30",
        //                         "line1": "5310 E High St",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85054",
        //                         "locLat": 33.6765403,
        //                         "locLng": -111.9663621,
        //                         "locSource": "5310 e high st  phoenix,az 85054"
        //                     },
        //                     "deaNumber": "BS0422775"
        //                 },
        //                 {
        //                     "id": "4732263686209536",
        //                     "created": "2023-04-18T09:38:31.419+05:30",
        //                     "modified": "2023-04-18T09:38:31.419+05:30",
        //                     "firstName": "MARNA",
        //                     "lastName": "WITT",
        //                     "sourceAddress": "null n 53rd st  phoenix,az 85054",
        //                     "location": {
        //                         "id": "6561851034828800",
        //                         "created": "2023-04-18T09:38:31.412+05:30",
        //                         "modified": "2023-04-18T09:38:31.419+05:30",
        //                         "line1": "null N 53rd St",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85054",
        //                         "locLat": 33.6734909,
        //                         "locLng": -111.9683645,
        //                         "locSource": "null n 53rd st  phoenix,az 85054"
        //                     },
        //                     "deaNumber": "BS0422775"
        //                 },
        //                 {
        //                     "id": "5902144058163200",
        //                     "created": "2023-04-18T09:38:26.654+05:30",
        //                     "modified": "2023-04-18T09:38:26.654+05:30",
        //                     "firstName": "JESUS",
        //                     "lastName": "GOFF",
        //                     "sourceAddress": "21816 n 26th ave  phoenix,az 85027",
        //                     "location": {
        //                         "id": "4776244151320576",
        //                         "created": "2023-04-18T09:38:26.646+05:30",
        //                         "modified": "2023-04-18T09:38:26.655+05:30",
        //                         "line1": "21816 N 26th Ave",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85027",
        //                         "locLat": 33.684586,
        //                         "locLng": -112.116367,
        //                         "locSource": "21816 n 26th ave  phoenix,az 85027"
        //                     },
        //                     "deaNumber": "MH3182261"
        //                 },
        //                 {
        //                     "id": "5506319872163840",
        //                     "created": "2023-04-18T09:38:29.637+05:30",
        //                     "modified": "2023-04-18T09:38:29.637+05:30",
        //                     "firstName": "MARNA",
        //                     "lastName": "WITT",
        //                     "sourceAddress": "4225 w dunlap ave  phoenix,az 85051",
        //                     "location": {
        //                         "id": "6069269825585152",
        //                         "created": "2023-04-18T09:38:29.630+05:30",
        //                         "modified": "2023-04-18T09:38:29.637+05:30",
        //                         "line1": "4225 W Dunlap Ave",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85051",
        //                         "locLat": 33.5671697,
        //                         "locLng": -112.1506737,
        //                         "locSource": "4225 w dunlap ave  phoenix,az 85051"
        //                     },
        //                     "deaNumber": "BS0422775"
        //                 },
        //                 {
        //                     "id": "6632219779006464",
        //                     "created": "2023-04-18T09:38:29.717+05:30",
        //                     "modified": "2023-04-18T09:38:29.717+05:30",
        //                     "firstName": "LEONORE",
        //                     "lastName": "BURKE",
        //                     "sourceAddress": "",
        //                     "deaNumber": "MF3403273"
        //                 },
        //                 {
        //                     "id": "6746568988295168",
        //                     "created": "2023-04-18T09:38:27.549+05:30",
        //                     "modified": "2023-04-18T09:38:27.549+05:30",
        //                     "firstName": "MARNA",
        //                     "lastName": "WITT",
        //                     "sourceAddress": "4727 e bell rd  phoenix,az 85032",
        //                     "location": {
        //                         "id": "5620669081452544",
        //                         "created": "2023-04-18T09:38:27.541+05:30",
        //                         "modified": "2023-04-18T09:38:27.550+05:30",
        //                         "line1": "4727 E Bell Rd",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85032",
        //                         "locLat": 33.6383669,
        //                         "locLng": -111.9792636,
        //                         "locSource": "4727 e bell rd  phoenix,az 85032"
        //                     },
        //                     "deaNumber": "BS0422775"
        //                 },
        //                 {
        //                     "id": "5717426104696832",
        //                     "created": "2023-04-18T09:38:30.170+05:30",
        //                     "modified": "2023-04-18T09:38:30.170+05:30",
        //                     "firstName": "MARNA",
        //                     "lastName": "WITT",
        //                     "sourceAddress": "21050 n tatum blvd  phoenix,az 85050",
        //                     "location": {
        //                         "id": "4591526197854208",
        //                         "created": "2023-04-18T09:38:30.164+05:30",
        //                         "modified": "2023-04-18T09:38:30.170+05:30",
        //                         "line1": "21050 N Tatum Blvd",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85050",
        //                         "locLat": 33.6777893,
        //                         "locLng": -111.9789375,
        //                         "locSource": "21050 n tatum blvd  phoenix,az 85050"
        //                     },
        //                     "deaNumber": "BS0422775"
        //                 },
        //                 {
        //                     "id": "6605831499939840",
        //                     "created": "2023-04-18T09:38:26.369+05:30",
        //                     "modified": "2023-04-18T09:38:26.369+05:30",
        //                     "firstName": "MARNA",
        //                     "lastName": "WITT",
        //                     "sourceAddress": "2602 w deer valley rd  phoenix,az 85027",
        //                     "location": {
        //                         "id": "5479931593097216",
        //                         "created": "2023-04-18T09:38:26.361+05:30",
        //                         "modified": "2023-04-18T09:38:26.369+05:30",
        //                         "line1": "2602 W Deer Valley Rd",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85027",
        //                         "locLat": 33.6842607,
        //                         "locLng": -112.1163379,
        //                         "locSource": "2602 w deer valley rd  phoenix,az 85027"
        //                     },
        //                     "deaNumber": "BS0422775"
        //                 },
        //                 {
        //                     "id": "5295213639630848",
        //                     "created": "2023-04-18T09:38:31.720+05:30",
        //                     "modified": "2023-04-18T09:38:31.720+05:30",
        //                     "firstName": "MARNA",
        //                     "lastName": "WITT",
        //                     "sourceAddress": "20855 n 53rd st  phoenix,az 85054",
        //                     "location": {
        //                         "id": "5858163593052160",
        //                         "created": "2023-04-18T09:38:31.711+05:30",
        //                         "modified": "2023-04-18T09:38:31.720+05:30",
        //                         "line1": "20855 N 53rd St",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85054",
        //                         "locLat": 33.6755749,
        //                         "locLng": -111.9665016,
        //                         "locSource": "20855 n 53rd st  phoenix,az 85054"
        //                     },
        //                     "deaNumber": "BS0422775"
        //                 },
        //                 {
        //                     "id": "4565137918787584",
        //                     "created": "2023-04-18T09:38:22.853+05:30",
        //                     "modified": "2023-04-18T09:38:22.853+05:30",
        //                     "firstName": "TAWNYA",
        //                     "lastName": "NUNEZ",
        //                     "sourceAddress": "3815 n brown ave  scottsdale,az 85251",
        //                     "location": {
        //                         "id": "6711384616206336",
        //                         "created": "2023-04-18T09:38:22.846+05:30",
        //                         "modified": "2023-04-18T09:38:22.854+05:30",
        //                         "line1": "3815 N Brown Ave",
        //                         "city": "Scottsdale",
        //                         "state": "AZ",
        //                         "zip": "85251",
        //                         "locLat": 33.4918372,
        //                         "locLng": -111.9242563,
        //                         "locSource": "3815 n brown ave  scottsdale,az 85251"
        //                     },
        //                     "deaNumber": "MH3849176"
        //                 },
        //                 {
        //                     "id": "6394725267406848",
        //                     "created": "2023-04-18T09:38:24.558+05:30",
        //                     "modified": "2023-04-18T09:38:24.558+05:30",
        //                     "firstName": "MARQUITTA",
        //                     "lastName": "BROCK",
        //                     "sourceAddress": "3806-3898 n brown ave  scottsdale,az 85251",
        //                     "location": {
        //                         "id": "5268825360564224",
        //                         "created": "2023-04-18T09:38:24.551+05:30",
        //                         "modified": "2023-04-18T09:38:24.559+05:30",
        //                         "line1": "3806 N Brown Ave",
        //                         "city": "Scottsdale",
        //                         "state": "AZ",
        //                         "zip": "85251",
        //                         "locLat": 33.4916008,
        //                         "locLng": -111.9247454,
        //                         "locSource": "3806-3898 n brown ave  scottsdale,az 85251"
        //                     },
        //                     "deaNumber": "MP1714460"
        //                 },
        //                 {
        //                     "id": "6113250290696192",
        //                     "created": "2023-04-18T09:38:24.873+05:30",
        //                     "modified": "2023-04-18T09:38:24.873+05:30",
        //                     "firstName": "MARQUITTA",
        //                     "lastName": "BROCK",
        //                     "sourceAddress": "3752 e indian school rd  phoenix,az 85018",
        //                     "location": {
        //                         "id": "4987350383853568",
        //                         "created": "2023-04-18T09:38:24.866+05:30",
        //                         "modified": "2023-04-18T09:38:24.874+05:30",
        //                         "line1": "3752 E Indian School Rd",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85018",
        //                         "locLat": 33.4954195,
        //                         "locLng": -112.0000832,
        //                         "locSource": "3752 e indian school rd  phoenix,az 85018"
        //                     },
        //                     "deaNumber": "MP1714460"
        //                 },
        //                 {
        //                     "id": "5761406569807872",
        //                     "created": "2023-04-18T09:38:25.451+05:30",
        //                     "modified": "2023-04-18T09:38:25.451+05:30",
        //                     "firstName": "MADIE",
        //                     "lastName": "WHITNEY",
        //                     "sourceAddress": "3380 n scottsdale rd  scottsdale,az 85251",
        //                     "location": {
        //                         "id": "4635506662965248",
        //                         "created": "2023-04-18T09:38:25.444+05:30",
        //                         "modified": "2023-04-18T09:38:25.451+05:30",
        //                         "line1": "3380 N Scottsdale Rd",
        //                         "city": "Scottsdale",
        //                         "state": "AZ",
        //                         "zip": "85251",
        //                         "locLat": 33.48733199999999,
        //                         "locLng": -111.9270596,
        //                         "locSource": "3380 n scottsdale rd  scottsdale,az 85251"
        //                     },
        //                     "deaNumber": "BD7113234"
        //                 },
        //                 {
        //                     "id": "6042881546518528",
        //                     "created": "2023-04-18T09:38:26.047+05:30",
        //                     "modified": "2023-04-18T09:38:26.047+05:30",
        //                     "firstName": "MARNA",
        //                     "lastName": "WITT",
        //                     "sourceAddress": "751 e union hills dr  phoenix,az 85024",
        //                     "location": {
        //                         "id": "4916981639675904",
        //                         "created": "2023-04-18T09:38:26.038+05:30",
        //                         "modified": "2023-04-18T09:38:26.048+05:30",
        //                         "line1": "751 E Union Hills Dr",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85024",
        //                         "locLat": 33.6540547,
        //                         "locLng": -112.063263,
        //                         "locSource": "751 e union hills dr  phoenix,az 85024"
        //                     },
        //                     "deaNumber": "BS0422775"
        //                 },
        //                 {
        //                     "id": "5831775313985536",
        //                     "created": "2023-04-18T09:38:24.255+05:30",
        //                     "modified": "2023-04-18T09:38:24.255+05:30",
        //                     "firstName": "MARNA",
        //                     "lastName": "WITT",
        //                     "sourceAddress": "765 e rosemonte dr  phoenix,az 85024",
        //                     "location": {
        //                         "id": "4705875407142912",
        //                         "created": "2023-04-18T09:38:24.246+05:30",
        //                         "modified": "2023-04-18T09:38:24.255+05:30",
        //                         "line1": "765 E Rosemonte Dr",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85024",
        //                         "locLat": 33.6567816,
        //                         "locLng": -112.0631233,
        //                         "locSource": "765 e rosemonte dr  phoenix,az 85024"
        //                     },
        //                     "deaNumber": "BS0422775"
        //                 },
        //                 {
        //                     "id": "5972512802340864",
        //                     "created": "2023-04-18T09:38:23.605+05:30",
        //                     "modified": "2023-04-18T09:38:23.605+05:30",
        //                     "firstName": "MARQUITTA",
        //                     "lastName": "BROCK",
        //                     "sourceAddress": "3817 n brown ave  scottsdale,az 85251",
        //                     "location": {
        //                         "id": "4846612895498240",
        //                         "created": "2023-04-18T09:38:23.596+05:30",
        //                         "modified": "2023-04-18T09:38:23.605+05:30",
        //                         "line1": "3817 N Brown Ave",
        //                         "city": "Scottsdale",
        //                         "state": "AZ",
        //                         "zip": "85251",
        //                         "locLat": 33.4920038,
        //                         "locLng": -111.9242563,
        //                         "locSource": "3817 n brown ave  scottsdale,az 85251"
        //                     },
        //                     "deaNumber": "MP1714460"
        //                 }
        //             ],
        //             "pharmacies": [
        //                 {
        //                     "id": "5224844895453184",
        //                     "created": "2023-04-18T09:38:29.053+05:30",
        //                     "modified": "2023-04-18T09:38:29.053+05:30",
        //                     "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                     "sourceAddress": "8015 e indian school rd  scottsdale,az 85251",
        //                     "location": {
        //                         "id": "5787794848874496",
        //                         "created": "2023-04-18T09:38:29.032+05:30",
        //                         "modified": "2023-04-18T09:38:29.054+05:30",
        //                         "line1": "8015 E Indian School Rd",
        //                         "city": "Scottsdale",
        //                         "state": "AZ",
        //                         "zip": "85251",
        //                         "locLat": 33.4935565,
        //                         "locLng": -111.9081693,
        //                         "locSource": "8015 e indian school rd  scottsdale,az 85251"
        //                     },
        //                     "deaNumber": "AW9699818"
        //                 },
        //                 {
        //                     "id": "5585484709363712",
        //                     "created": "2023-04-18T09:38:22.545+05:30",
        //                     "modified": "2023-04-18T09:38:22.545+05:30",
        //                     "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                     "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                     "location": {
        //                         "id": "6148434662785024",
        //                         "created": "2023-04-18T09:38:22.535+05:30",
        //                         "modified": "2023-04-18T09:38:22.546+05:30",
        //                         "line1": "3402 N Central Ave",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85012",
        //                         "locLat": 33.4879117,
        //                         "locLng": -112.0745667,
        //                         "locSource": "3402 n central ave  phoenix,az 85012"
        //                     },
        //                     "deaNumber": "AW0572518"
        //                 },
        //                 {
        //                     "id": "6183619034873856",
        //                     "created": "2023-04-18T09:38:27.240+05:30",
        //                     "modified": "2023-04-18T09:38:27.240+05:30",
        //                     "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                     "sourceAddress": "3605 e thomas rd  phoenix,az 85018",
        //                     "location": {
        //                         "id": "5057719128031232",
        //                         "created": "2023-04-18T09:38:27.232+05:30",
        //                         "modified": "2023-04-18T09:38:27.240+05:30",
        //                         "line1": "3605 E Thomas Rd",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85018",
        //                         "locLat": 33.4799903,
        //                         "locLng": -112.0035764,
        //                         "locSource": "3605 e thomas rd  phoenix,az 85018"
        //                     },
        //                     "deaNumber": "AW0572481"
        //                 },
        //                 {
        //                     "id": "5928532337229824",
        //                     "created": "2023-04-18T09:38:28.414+05:30",
        //                     "modified": "2023-04-18T09:38:28.414+05:30",
        //                     "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                     "sourceAddress": "4111 n 24th street  phoenix,az 85016",
        //                     "location": {
        //                         "id": "4802632430387200",
        //                         "created": "2023-04-18T09:38:28.407+05:30",
        //                         "modified": "2023-04-18T09:38:28.415+05:30",
        //                         "line1": "4111 N 24th St",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85016",
        //                         "locLat": 33.4953117,
        //                         "locLng": -112.0295014,
        //                         "locSource": "4111 n 24th street  phoenix,az 85016"
        //                     },
        //                     "deaNumber": "BW1377200"
        //                 },
        //                 {
        //                     "id": "6324356523229184",
        //                     "created": "2023-04-18T09:38:25.757+05:30",
        //                     "modified": "2023-04-18T09:38:25.757+05:30",
        //                     "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                     "sourceAddress": "5895 w. peoria avenue  glendale,az 85302",
        //                     "location": {
        //                         "id": "5198456616386560",
        //                         "created": "2023-04-18T09:38:25.748+05:30",
        //                         "modified": "2023-04-18T09:38:25.757+05:30",
        //                         "line1": "5895 W Peoria Ave",
        //                         "city": "Glendale",
        //                         "state": "AZ",
        //                         "zip": "85302",
        //                         "locLat": 33.5812761,
        //                         "locLng": -112.1854129,
        //                         "locSource": "5895 w. peoria avenue  glendale,az 85302"
        //                     },
        //                     "deaNumber": "BW5452228"
        //                 }
        //             ],
        //             "prescriptions": [
        //                 {
        //                     "id": "4715856911138816",
        //                     "created": "2024-01-26T08:36:48.994+05:30",
        //                     "modified": "2024-01-26T08:36:49.754+05:30",
        //                     "patientId": "6007697174429696",
        //                     "classification": "OPIOID",
        //                     "fillDate": "2024-01-05T10:30:00.000+05:30",
        //                     "fillDateString": "Jan 5",
        //                     "productName": "OXYCONTIN, 10 MG, TABLET, FILM COATED, EXTENDED RELEASE",
        //                     "displayName": "OXYCONTIN, 10 MG, TABLET, FILM COAT",
        //                     "strengthDesc": "10 MG",
        //                     "dosage": 10,
        //                     "prescribedQty": 60,
        //                     "prescribedLen": 30,
        //                     "dailyME": 30,
        //                     "writtenDate": "2023-12-23T10:30:00.000+05:30",
        //                     "writtenDateString": "Dec 23",
        //                     "nrCode": "R",
        //                     "refillCount": 0,
        //                     "rxNum": " ",
        //                     "isActive": true,
        //                     "isOurs": false,
        //                     "prescriber": {
        //                         "id": "5022534755942400",
        //                         "created": "2023-04-18T09:38:22.275+05:30",
        //                         "modified": "2023-04-18T09:38:22.275+05:30",
        //                         "firstName": "TAWNYA",
        //                         "lastName": "NUNEZ",
        //                         "sourceAddress": "6989 n hayden rd  scottsdale,az 85250",
        //                         "location": {
        //                             "id": "6429909639495680",
        //                             "created": "2023-04-18T09:38:22.264+05:30",
        //                             "modified": "2023-04-18T09:38:22.277+05:30",
        //                             "line1": "6989 N Hayden Rd",
        //                             "city": "Scottsdale",
        //                             "state": "AZ",
        //                             "zip": "85250",
        //                             "locLat": 33.5379566,
        //                             "locLng": -111.9060417,
        //                             "locSource": "6989 n hayden rd  scottsdale,az 85250"
        //                         },
        //                         "deaNumber": "MH3849176"
        //                     },
        //                     "pharmacy": {
        //                         "id": "5585484709363712",
        //                         "created": "2023-04-18T09:38:22.545+05:30",
        //                         "modified": "2023-04-18T09:38:22.545+05:30",
        //                         "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                         "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                         "location": {
        //                             "id": "6148434662785024",
        //                             "created": "2023-04-18T09:38:22.535+05:30",
        //                             "modified": "2023-04-18T09:38:22.546+05:30",
        //                             "line1": "3402 N Central Ave",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85012",
        //                             "locLat": 33.4879117,
        //                             "locLng": -112.0745667,
        //                             "locSource": "3402 n central ave  phoenix,az 85012"
        //                         },
        //                         "deaNumber": "AW0572518"
        //                     },
        //                     "ndcCode": "59011041010",
        //                     "patientName": "ULA PECK",
        //                     "patientDOB": "02/04/1939",
        //                     "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                     "isExpectedPatient": true,
        //                     "ndcOriginalSource": "59011041010",
        //                     "productCodeQualifier": "ND",
        //                     "ourPharmacy": false,
        //                     "ourProvider": false,
        //                     "startDate": "2024-01-05T10:30:00.000+05:30",
        //                     "endDate": "2024-02-03T10:30:00.000+05:30"
        //                 },
        //                 {
        //                     "id": "5841756817981440",
        //                     "created": "2024-01-26T08:36:48.994+05:30",
        //                     "modified": "2024-01-26T08:36:49.755+05:30",
        //                     "patientId": "6007697174429696",
        //                     "classification": "OPIOID",
        //                     "fillDate": "2024-01-05T10:30:00.000+05:30",
        //                     "fillDateString": "Jan 5",
        //                     "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                     "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                     "strengthDesc": "10 MG;325 MG",
        //                     "dosage": 10,
        //                     "prescribedQty": 105,
        //                     "prescribedLen": 30,
        //                     "dailyME": 53,
        //                     "writtenDate": "2023-12-23T10:30:00.000+05:30",
        //                     "writtenDateString": "Dec 23",
        //                     "nrCode": "R",
        //                     "refillCount": 0,
        //                     "rxNum": " ",
        //                     "isActive": true,
        //                     "isOurs": false,
        //                     "prescriber": {
        //                         "id": "4565137918787584",
        //                         "created": "2023-04-18T09:38:22.853+05:30",
        //                         "modified": "2023-04-18T09:38:22.853+05:30",
        //                         "firstName": "TAWNYA",
        //                         "lastName": "NUNEZ",
        //                         "sourceAddress": "3815 n brown ave  scottsdale,az 85251",
        //                         "location": {
        //                             "id": "6711384616206336",
        //                             "created": "2023-04-18T09:38:22.846+05:30",
        //                             "modified": "2023-04-18T09:38:22.854+05:30",
        //                             "line1": "3815 N Brown Ave",
        //                             "city": "Scottsdale",
        //                             "state": "AZ",
        //                             "zip": "85251",
        //                             "locLat": 33.4918372,
        //                             "locLng": -111.9242563,
        //                             "locSource": "3815 n brown ave  scottsdale,az 85251"
        //                         },
        //                         "deaNumber": "MH3849176"
        //                     },
        //                     "pharmacy": {
        //                         "id": "5585484709363712",
        //                         "created": "2023-04-18T09:38:22.545+05:30",
        //                         "modified": "2023-04-18T09:38:22.545+05:30",
        //                         "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                         "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                         "location": {
        //                             "id": "6148434662785024",
        //                             "created": "2023-04-18T09:38:22.535+05:30",
        //                             "modified": "2023-04-18T09:38:22.546+05:30",
        //                             "line1": "3402 N Central Ave",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85012",
        //                             "locLat": 33.4879117,
        //                             "locLng": -112.0745667,
        //                             "locSource": "3402 n central ave  phoenix,az 85012"
        //                         },
        //                         "deaNumber": "AW0572518"
        //                     },
        //                     "ndcCode": "00228298311",
        //                     "patientName": "ULA PECK",
        //                     "patientDOB": "02/04/1939",
        //                     "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                     "isExpectedPatient": true,
        //                     "ndcOriginalSource": "00228298311",
        //                     "productCodeQualifier": "ND",
        //                     "ourPharmacy": false,
        //                     "ourProvider": false,
        //                     "startDate": "2024-01-05T10:30:00.000+05:30",
        //                     "endDate": "2024-02-03T10:30:00.000+05:30"
        //                 },
        //                 {
        //                     "id": "5278806864560128",
        //                     "created": "2024-01-26T08:36:48.994+05:30",
        //                     "modified": "2024-01-26T08:36:49.756+05:30",
        //                     "patientId": "6007697174429696",
        //                     "classification": "OPIOID",
        //                     "fillDate": "2023-12-30T10:30:00.000+05:30",
        //                     "fillDateString": "Dec 30",
        //                     "productName": "OXYCODONE HYDROCHLORIDE, 5 MG, TABLET",
        //                     "displayName": "OXYCODONE HYDROCHLORIDE, 5 MG, TABL",
        //                     "strengthDesc": "5 MG",
        //                     "dosage": 5,
        //                     "prescribedQty": 60,
        //                     "prescribedLen": 2,
        //                     "dailyME": 225,
        //                     "writtenDate": "2023-12-26T10:30:00.000+05:30",
        //                     "writtenDateString": "Dec 26",
        //                     "nrCode": "R",
        //                     "refillCount": 0,
        //                     "rxNum": " ",
        //                     "isActive": false,
        //                     "isOurs": false,
        //                     "prescriber": {
        //                         "id": "5128087872208896",
        //                         "created": "2023-04-18T09:38:23.147+05:30",
        //                         "modified": "2023-04-18T09:38:23.147+05:30",
        //                         "firstName": "",
        //                         "lastName": "",
        //                         "sourceAddress": "5022 n 17th ave  phoenix,az 85015",
        //                         "location": {
        //                             "id": "5691037825630208",
        //                             "created": "2023-04-18T09:38:23.141+05:30",
        //                             "modified": "2023-04-18T09:38:23.148+05:30",
        //                             "line1": "5022 N 17th Ave",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85015",
        //                             "locLat": 33.5106346,
        //                             "locLng": -112.0963149,
        //                             "locSource": "5022 n 17th ave  phoenix,az 85015"
        //                         },
        //                         "deaNumber": "BC7786140"
        //                     },
        //                     "pharmacy": {
        //                         "id": "5585484709363712",
        //                         "created": "2023-04-18T09:38:22.545+05:30",
        //                         "modified": "2023-04-18T09:38:22.545+05:30",
        //                         "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                         "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                         "location": {
        //                             "id": "6148434662785024",
        //                             "created": "2023-04-18T09:38:22.535+05:30",
        //                             "modified": "2023-04-18T09:38:22.546+05:30",
        //                             "line1": "3402 N Central Ave",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85012",
        //                             "locLat": 33.4879117,
        //                             "locLng": -112.0745667,
        //                             "locSource": "3402 n central ave  phoenix,az 85012"
        //                         },
        //                         "deaNumber": "AW0572518"
        //                     },
        //                     "ndcCode": "00406055201",
        //                     "patientName": "ULA PECK",
        //                     "patientDOB": "02/04/1939",
        //                     "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                     "isExpectedPatient": true,
        //                     "ndcOriginalSource": "00406055201",
        //                     "productCodeQualifier": "ND",
        //                     "ourPharmacy": false,
        //                     "ourProvider": false,
        //                     "startDate": "2023-12-30T10:30:00.000+05:30",
        //                     "endDate": "2023-12-31T10:30:00.000+05:30"
        //                 },
        //                 {
        //                     "id": "6404706771402752",
        //                     "created": "2024-01-26T08:36:48.995+05:30",
        //                     "modified": "2024-01-26T08:36:49.757+05:30",
        //                     "patientId": "6007697174429696",
        //                     "classification": "OPIOID",
        //                     "fillDate": "2023-12-04T10:30:00.000+05:30",
        //                     "fillDateString": "Dec 4",
        //                     "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                     "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                     "strengthDesc": "10 MG;325 MG",
        //                     "dosage": 10,
        //                     "prescribedQty": 105,
        //                     "prescribedLen": 30,
        //                     "dailyME": 53,
        //                     "writtenDate": "2023-12-03T10:30:00.000+05:30",
        //                     "writtenDateString": "Dec 3",
        //                     "nrCode": "R",
        //                     "refillCount": 0,
        //                     "rxNum": " ",
        //                     "isActive": false,
        //                     "isOurs": false,
        //                     "prescriber": {
        //                         "id": "5972512802340864",
        //                         "created": "2023-04-18T09:38:23.605+05:30",
        //                         "modified": "2023-04-18T09:38:23.605+05:30",
        //                         "firstName": "MARQUITTA",
        //                         "lastName": "BROCK",
        //                         "sourceAddress": "3817 n brown ave  scottsdale,az 85251",
        //                         "location": {
        //                             "id": "4846612895498240",
        //                             "created": "2023-04-18T09:38:23.596+05:30",
        //                             "modified": "2023-04-18T09:38:23.605+05:30",
        //                             "line1": "3817 N Brown Ave",
        //                             "city": "Scottsdale",
        //                             "state": "AZ",
        //                             "zip": "85251",
        //                             "locLat": 33.4920038,
        //                             "locLng": -111.9242563,
        //                             "locSource": "3817 n brown ave  scottsdale,az 85251"
        //                         },
        //                         "deaNumber": "MP1714460"
        //                     },
        //                     "pharmacy": {
        //                         "id": "5585484709363712",
        //                         "created": "2023-04-18T09:38:22.545+05:30",
        //                         "modified": "2023-04-18T09:38:22.545+05:30",
        //                         "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                         "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                         "location": {
        //                             "id": "6148434662785024",
        //                             "created": "2023-04-18T09:38:22.535+05:30",
        //                             "modified": "2023-04-18T09:38:22.546+05:30",
        //                             "line1": "3402 N Central Ave",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85012",
        //                             "locLat": 33.4879117,
        //                             "locLng": -112.0745667,
        //                             "locSource": "3402 n central ave  phoenix,az 85012"
        //                         },
        //                         "deaNumber": "AW0572518"
        //                     },
        //                     "ndcCode": "00228298311",
        //                     "patientName": "ULA PECK",
        //                     "patientDOB": "02/04/1939",
        //                     "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                     "isExpectedPatient": true,
        //                     "ndcOriginalSource": "00228298311",
        //                     "productCodeQualifier": "ND",
        //                     "ourPharmacy": false,
        //                     "ourProvider": false,
        //                     "startDate": "2023-12-04T10:30:00.000+05:30",
        //                     "endDate": "2024-01-02T10:30:00.000+05:30"
        //                 },
        //                 {
        //                     "id": "4997331887849472",
        //                     "created": "2024-01-26T08:36:48.995+05:30",
        //                     "modified": "2024-01-26T08:36:49.758+05:30",
        //                     "patientId": "6007697174429696",
        //                     "classification": "STIMULANT",
        //                     "fillDate": "2023-11-15T10:30:00.000+05:30",
        //                     "fillDateString": "Nov 15",
        //                     "productName": "VYVANSE, 50 MG, CAPSULE",
        //                     "displayName": "VYVANSE, 50 MG, CAPSULE",
        //                     "strengthDesc": "50 MG",
        //                     "dosage": 50,
        //                     "prescribedQty": 30,
        //                     "prescribedLen": 30,
        //                     "dailyME": 0,
        //                     "writtenDate": "2023-09-22T10:30:00.000+05:30",
        //                     "writtenDateString": "Sep 22",
        //                     "nrCode": "R",
        //                     "refillCount": 0,
        //                     "rxNum": " ",
        //                     "isActive": false,
        //                     "isOurs": false,
        //                     "prescriber": {
        //                         "id": "6535462755762176",
        //                         "created": "2023-04-18T09:38:23.938+05:30",
        //                         "modified": "2023-04-18T09:38:23.938+05:30",
        //                         "firstName": "MARNA",
        //                         "lastName": "WITT",
        //                         "sourceAddress": "718 e union hills dr  phoenix,az 85024",
        //                         "location": {
        //                             "id": "5409562848919552",
        //                             "created": "2023-04-18T09:38:23.930+05:30",
        //                             "modified": "2023-04-18T09:38:23.939+05:30",
        //                             "line1": "718 E Union Hills Dr",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85024",
        //                             "locLat": 33.6561533,
        //                             "locLng": -112.0637055,
        //                             "locSource": "718 e union hills dr  phoenix,az 85024"
        //                         },
        //                         "deaNumber": "BS0422775"
        //                     },
        //                     "pharmacy": {
        //                         "id": "5585484709363712",
        //                         "created": "2023-04-18T09:38:22.545+05:30",
        //                         "modified": "2023-04-18T09:38:22.545+05:30",
        //                         "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                         "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                         "location": {
        //                             "id": "6148434662785024",
        //                             "created": "2023-04-18T09:38:22.535+05:30",
        //                             "modified": "2023-04-18T09:38:22.546+05:30",
        //                             "line1": "3402 N Central Ave",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85012",
        //                             "locLat": 33.4879117,
        //                             "locLng": -112.0745667,
        //                             "locSource": "3402 n central ave  phoenix,az 85012"
        //                         },
        //                         "deaNumber": "AW0572518"
        //                     },
        //                     "ndcCode": "59417010510",
        //                     "patientName": "ULA PECK",
        //                     "patientDOB": "02/04/1939",
        //                     "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                     "isExpectedPatient": true,
        //                     "ndcOriginalSource": "59417010510",
        //                     "productCodeQualifier": "ND",
        //                     "ourPharmacy": false,
        //                     "ourProvider": false,
        //                     "startDate": "2023-11-15T10:30:00.000+05:30",
        //                     "endDate": "2023-12-14T10:30:00.000+05:30"
        //                 },
        //                 {
        //                     "id": "6123231794692096",
        //                     "created": "2024-01-26T08:36:48.996+05:30",
        //                     "modified": "2024-01-26T08:36:49.759+05:30",
        //                     "patientId": "6007697174429696",
        //                     "classification": "STIMULANT",
        //                     "fillDate": "2023-11-14T10:30:00.000+05:30",
        //                     "fillDateString": "Nov 14",
        //                     "productName": "DEXTROAMPHETAMINE SACCHARATE, AMPHETAMINE ASPARTATE, DEXTROAMPHETAMINE SULFATE AND AMPHETAMINE SULFA, 5 M",
        //                     "displayName": "DEXTROAMPHETAMINE SACCHARATE, AMPHE",
        //                     "strengthDesc": "5 MG;5 MG;5 MG;5 MG",
        //                     "dosage": 5,
        //                     "prescribedQty": 30,
        //                     "prescribedLen": 30,
        //                     "dailyME": 0,
        //                     "writtenDate": "2023-09-22T10:30:00.000+05:30",
        //                     "writtenDateString": "Sep 22",
        //                     "nrCode": "R",
        //                     "refillCount": 0,
        //                     "rxNum": " ",
        //                     "isActive": false,
        //                     "isOurs": false,
        //                     "prescriber": {
        //                         "id": "5831775313985536",
        //                         "created": "2023-04-18T09:38:24.255+05:30",
        //                         "modified": "2023-04-18T09:38:24.255+05:30",
        //                         "firstName": "MARNA",
        //                         "lastName": "WITT",
        //                         "sourceAddress": "765 e rosemonte dr  phoenix,az 85024",
        //                         "location": {
        //                             "id": "4705875407142912",
        //                             "created": "2023-04-18T09:38:24.246+05:30",
        //                             "modified": "2023-04-18T09:38:24.255+05:30",
        //                             "line1": "765 E Rosemonte Dr",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85024",
        //                             "locLat": 33.6567816,
        //                             "locLng": -112.0631233,
        //                             "locSource": "765 e rosemonte dr  phoenix,az 85024"
        //                         },
        //                         "deaNumber": "BS0422775"
        //                     },
        //                     "pharmacy": {
        //                         "id": "5585484709363712",
        //                         "created": "2023-04-18T09:38:22.545+05:30",
        //                         "modified": "2023-04-18T09:38:22.545+05:30",
        //                         "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                         "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                         "location": {
        //                             "id": "6148434662785024",
        //                             "created": "2023-04-18T09:38:22.535+05:30",
        //                             "modified": "2023-04-18T09:38:22.546+05:30",
        //                             "line1": "3402 N Central Ave",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85012",
        //                             "locLat": 33.4879117,
        //                             "locLng": -112.0745667,
        //                             "locSource": "3402 n central ave  phoenix,az 85012"
        //                         },
        //                         "deaNumber": "AW0572518"
        //                     },
        //                     "ndcCode": "00555097302",
        //                     "patientName": "ULA PECK",
        //                     "patientDOB": "02/04/1939",
        //                     "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                     "isExpectedPatient": true,
        //                     "ndcOriginalSource": "00555097302",
        //                     "productCodeQualifier": "ND",
        //                     "ourPharmacy": false,
        //                     "ourProvider": false,
        //                     "startDate": "2023-11-14T10:30:00.000+05:30",
        //                     "endDate": "2023-12-13T10:30:00.000+05:30"
        //                 },
        //                 {
        //                     "id": "5560281841270784",
        //                     "created": "2024-01-26T08:36:48.996+05:30",
        //                     "modified": "2024-01-26T08:36:49.759+05:30",
        //                     "patientId": "6007697174429696",
        //                     "classification": "OPIOID",
        //                     "fillDate": "2023-11-04T10:30:00.000+05:30",
        //                     "fillDateString": "Nov 4",
        //                     "productName": "OXYCONTIN, 10 MG, TABLET, FILM COATED, EXTENDED RELEASE",
        //                     "displayName": "OXYCONTIN, 10 MG, TABLET, FILM COAT",
        //                     "strengthDesc": "10 MG",
        //                     "dosage": 10,
        //                     "prescribedQty": 60,
        //                     "prescribedLen": 30,
        //                     "dailyME": 30,
        //                     "writtenDate": "2023-10-29T10:30:00.000+05:30",
        //                     "writtenDateString": "Oct 29",
        //                     "nrCode": "R",
        //                     "refillCount": 0,
        //                     "rxNum": " ",
        //                     "isActive": false,
        //                     "isOurs": false,
        //                     "prescriber": {
        //                         "id": "6394725267406848",
        //                         "created": "2023-04-18T09:38:24.558+05:30",
        //                         "modified": "2023-04-18T09:38:24.558+05:30",
        //                         "firstName": "MARQUITTA",
        //                         "lastName": "BROCK",
        //                         "sourceAddress": "3806-3898 n brown ave  scottsdale,az 85251",
        //                         "location": {
        //                             "id": "5268825360564224",
        //                             "created": "2023-04-18T09:38:24.551+05:30",
        //                             "modified": "2023-04-18T09:38:24.559+05:30",
        //                             "line1": "3806 N Brown Ave",
        //                             "city": "Scottsdale",
        //                             "state": "AZ",
        //                             "zip": "85251",
        //                             "locLat": 33.4916008,
        //                             "locLng": -111.9247454,
        //                             "locSource": "3806-3898 n brown ave  scottsdale,az 85251"
        //                         },
        //                         "deaNumber": "MP1714460"
        //                     },
        //                     "pharmacy": {
        //                         "id": "5585484709363712",
        //                         "created": "2023-04-18T09:38:22.545+05:30",
        //                         "modified": "2023-04-18T09:38:22.545+05:30",
        //                         "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                         "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                         "location": {
        //                             "id": "6148434662785024",
        //                             "created": "2023-04-18T09:38:22.535+05:30",
        //                             "modified": "2023-04-18T09:38:22.546+05:30",
        //                             "line1": "3402 N Central Ave",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85012",
        //                             "locLat": 33.4879117,
        //                             "locLng": -112.0745667,
        //                             "locSource": "3402 n central ave  phoenix,az 85012"
        //                         },
        //                         "deaNumber": "AW0572518"
        //                     },
        //                     "ndcCode": "59011041010",
        //                     "patientName": "ULA PECK",
        //                     "patientDOB": "02/04/1939",
        //                     "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                     "isExpectedPatient": true,
        //                     "ndcOriginalSource": "59011041010",
        //                     "productCodeQualifier": "ND",
        //                     "ourPharmacy": false,
        //                     "ourProvider": false,
        //                     "startDate": "2023-11-04T10:30:00.000+05:30",
        //                     "endDate": "2023-12-03T10:30:00.000+05:30"
        //                 },
        //                 {
        //                     "id": "6686181748113408",
        //                     "created": "2024-01-26T08:36:48.996+05:30",
        //                     "modified": "2024-01-26T08:36:49.760+05:30",
        //                     "patientId": "6007697174429696",
        //                     "classification": "OPIOID",
        //                     "fillDate": "2023-11-04T10:30:00.000+05:30",
        //                     "fillDateString": "Nov 4",
        //                     "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                     "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                     "strengthDesc": "10 MG;325 MG",
        //                     "dosage": 10,
        //                     "prescribedQty": 105,
        //                     "prescribedLen": 30,
        //                     "dailyME": 53,
        //                     "writtenDate": "2023-10-29T10:30:00.000+05:30",
        //                     "writtenDateString": "Oct 29",
        //                     "nrCode": "R",
        //                     "refillCount": 0,
        //                     "rxNum": " ",
        //                     "isActive": false,
        //                     "isOurs": false,
        //                     "prescriber": {
        //                         "id": "6113250290696192",
        //                         "created": "2023-04-18T09:38:24.873+05:30",
        //                         "modified": "2023-04-18T09:38:24.873+05:30",
        //                         "firstName": "MARQUITTA",
        //                         "lastName": "BROCK",
        //                         "sourceAddress": "3752 e indian school rd  phoenix,az 85018",
        //                         "location": {
        //                             "id": "4987350383853568",
        //                             "created": "2023-04-18T09:38:24.866+05:30",
        //                             "modified": "2023-04-18T09:38:24.874+05:30",
        //                             "line1": "3752 E Indian School Rd",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85018",
        //                             "locLat": 33.4954195,
        //                             "locLng": -112.0000832,
        //                             "locSource": "3752 e indian school rd  phoenix,az 85018"
        //                         },
        //                         "deaNumber": "MP1714460"
        //                     },
        //                     "pharmacy": {
        //                         "id": "5585484709363712",
        //                         "created": "2023-04-18T09:38:22.545+05:30",
        //                         "modified": "2023-04-18T09:38:22.545+05:30",
        //                         "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                         "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                         "location": {
        //                             "id": "6148434662785024",
        //                             "created": "2023-04-18T09:38:22.535+05:30",
        //                             "modified": "2023-04-18T09:38:22.546+05:30",
        //                             "line1": "3402 N Central Ave",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85012",
        //                             "locLat": 33.4879117,
        //                             "locLng": -112.0745667,
        //                             "locSource": "3402 n central ave  phoenix,az 85012"
        //                         },
        //                         "deaNumber": "AW0572518"
        //                     },
        //                     "ndcCode": "00228298311",
        //                     "patientName": "ULA PECK",
        //                     "patientDOB": "02/04/1939",
        //                     "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                     "isExpectedPatient": true,
        //                     "ndcOriginalSource": "00228298311",
        //                     "productCodeQualifier": "ND",
        //                     "ourPharmacy": false,
        //                     "ourProvider": false,
        //                     "startDate": "2023-11-04T10:30:00.000+05:30",
        //                     "endDate": "2023-12-03T10:30:00.000+05:30"
        //                 },
        //                 {
        //                     "id": "4539935050694656",
        //                     "created": "2024-01-26T08:36:48.997+05:30",
        //                     "modified": "2024-01-26T08:36:49.761+05:30",
        //                     "patientId": "6007697174429696",
        //                     "classification": "OPIOID",
        //                     "fillDate": "2023-10-05T10:30:00.000+05:30",
        //                     "fillDateString": "Oct 5",
        //                     "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                     "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                     "strengthDesc": "10 MG;325 MG",
        //                     "dosage": 10,
        //                     "prescribedQty": 105,
        //                     "prescribedLen": 30,
        //                     "dailyME": 53,
        //                     "writtenDate": "2023-10-01T10:30:00.000+05:30",
        //                     "writtenDateString": "Oct 1",
        //                     "nrCode": "R",
        //                     "refillCount": 0,
        //                     "rxNum": " ",
        //                     "isActive": false,
        //                     "isOurs": false,
        //                     "prescriber": {
        //                         "id": "6676200244117504",
        //                         "created": "2023-04-18T09:38:25.169+05:30",
        //                         "modified": "2023-04-18T09:38:25.169+05:30",
        //                         "firstName": "MARQUITTA",
        //                         "lastName": "BROCK",
        //                         "sourceAddress": "3749-3799 e indian school rd  phoenix,az 85018",
        //                         "location": {
        //                             "id": "5550300337274880",
        //                             "created": "2023-04-18T09:38:25.162+05:30",
        //                             "modified": "2023-04-18T09:38:25.169+05:30",
        //                             "line1": "3749 E Indian School Rd",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85018",
        //                             "locLat": 33.49479520000001,
        //                             "locLng": -112.0001152,
        //                             "locSource": "3749-3799 e indian school rd  phoenix,az 85018"
        //                         },
        //                         "deaNumber": "MP1714460"
        //                     },
        //                     "pharmacy": {
        //                         "id": "5585484709363712",
        //                         "created": "2023-04-18T09:38:22.545+05:30",
        //                         "modified": "2023-04-18T09:38:22.545+05:30",
        //                         "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                         "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                         "location": {
        //                             "id": "6148434662785024",
        //                             "created": "2023-04-18T09:38:22.535+05:30",
        //                             "modified": "2023-04-18T09:38:22.546+05:30",
        //                             "line1": "3402 N Central Ave",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85012",
        //                             "locLat": 33.4879117,
        //                             "locLng": -112.0745667,
        //                             "locSource": "3402 n central ave  phoenix,az 85012"
        //                         },
        //                         "deaNumber": "AW0572518"
        //                     },
        //                     "ndcCode": "00228298311",
        //                     "patientName": "ULA PECK",
        //                     "patientDOB": "02/04/1939",
        //                     "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                     "isExpectedPatient": true,
        //                     "ndcOriginalSource": "00228298311",
        //                     "productCodeQualifier": "ND",
        //                     "ourPharmacy": false,
        //                     "ourProvider": false,
        //                     "startDate": "2023-10-05T10:30:00.000+05:30",
        //                     "endDate": "2023-11-03T10:30:00.000+05:30"
        //                 },
        //                 {
        //                     "id": "5665834957537280",
        //                     "created": "2024-01-26T08:36:48.997+05:30",
        //                     "modified": "2024-01-26T08:36:49.761+05:30",
        //                     "patientId": "6007697174429696",
        //                     "classification": "OPIOID",
        //                     "fillDate": "2023-10-01T10:30:00.000+05:30",
        //                     "fillDateString": "Oct 1",
        //                     "productName": "OPANA ER, 10 MG, TABLET, EXTENDED RELEASE",
        //                     "displayName": "OPANA ER, 10 MG, TABLET, EXTENDED R",
        //                     "strengthDesc": "10 MG",
        //                     "dosage": 10,
        //                     "prescribedQty": 60,
        //                     "prescribedLen": 30,
        //                     "dailyME": 60,
        //                     "writtenDate": "2023-10-01T10:30:00.000+05:30",
        //                     "writtenDateString": "Oct 1",
        //                     "nrCode": "R",
        //                     "refillCount": 0,
        //                     "rxNum": " ",
        //                     "isActive": false,
        //                     "isOurs": false,
        //                     "prescriber": {
        //                         "id": "5761406569807872",
        //                         "created": "2023-04-18T09:38:25.451+05:30",
        //                         "modified": "2023-04-18T09:38:25.451+05:30",
        //                         "firstName": "MADIE",
        //                         "lastName": "WHITNEY",
        //                         "sourceAddress": "3380 n scottsdale rd  scottsdale,az 85251",
        //                         "location": {
        //                             "id": "4635506662965248",
        //                             "created": "2023-04-18T09:38:25.444+05:30",
        //                             "modified": "2023-04-18T09:38:25.451+05:30",
        //                             "line1": "3380 N Scottsdale Rd",
        //                             "city": "Scottsdale",
        //                             "state": "AZ",
        //                             "zip": "85251",
        //                             "locLat": 33.48733199999999,
        //                             "locLng": -111.9270596,
        //                             "locSource": "3380 n scottsdale rd  scottsdale,az 85251"
        //                         },
        //                         "deaNumber": "BD7113234"
        //                     },
        //                     "pharmacy": {
        //                         "id": "6324356523229184",
        //                         "created": "2023-04-18T09:38:25.757+05:30",
        //                         "modified": "2023-04-18T09:38:25.757+05:30",
        //                         "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                         "sourceAddress": "5895 w. peoria avenue  glendale,az 85302",
        //                         "location": {
        //                             "id": "5198456616386560",
        //                             "created": "2023-04-18T09:38:25.748+05:30",
        //                             "modified": "2023-04-18T09:38:25.757+05:30",
        //                             "line1": "5895 W Peoria Ave",
        //                             "city": "Glendale",
        //                             "state": "AZ",
        //                             "zip": "85302",
        //                             "locLat": 33.5812761,
        //                             "locLng": -112.1854129,
        //                             "locSource": "5895 w. peoria avenue  glendale,az 85302"
        //                         },
        //                         "deaNumber": "BW5452228"
        //                     },
        //                     "ndcCode": "63481081460",
        //                     "patientName": "ULA PECK",
        //                     "patientDOB": "02/04/1939",
        //                     "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                     "isExpectedPatient": true,
        //                     "ndcOriginalSource": "63481081460",
        //                     "productCodeQualifier": "ND",
        //                     "ourPharmacy": false,
        //                     "ourProvider": false,
        //                     "startDate": "2023-10-01T10:30:00.000+05:30",
        //                     "endDate": "2023-10-30T10:30:00.000+05:30"
        //                 },
        //                 {
        //                     "id": "5102885004115968",
        //                     "created": "2024-01-26T08:36:48.997+05:30",
        //                     "modified": "2024-01-26T08:36:49.762+05:30",
        //                     "patientId": "6007697174429696",
        //                     "classification": "STIMULANT",
        //                     "fillDate": "2023-09-26T10:30:00.000+05:30",
        //                     "fillDateString": "Sep 26",
        //                     "productName": "VYVANSE, 50 MG, CAPSULE",
        //                     "displayName": "VYVANSE, 50 MG, CAPSULE",
        //                     "strengthDesc": "50 MG",
        //                     "dosage": 50,
        //                     "prescribedQty": 30,
        //                     "prescribedLen": 30,
        //                     "dailyME": 0,
        //                     "writtenDate": "2023-09-22T10:30:00.000+05:30",
        //                     "writtenDateString": "Sep 22",
        //                     "nrCode": "R",
        //                     "refillCount": 0,
        //                     "rxNum": " ",
        //                     "isActive": false,
        //                     "isOurs": false,
        //                     "prescriber": {
        //                         "id": "6042881546518528",
        //                         "created": "2023-04-18T09:38:26.047+05:30",
        //                         "modified": "2023-04-18T09:38:26.047+05:30",
        //                         "firstName": "MARNA",
        //                         "lastName": "WITT",
        //                         "sourceAddress": "751 e union hills dr  phoenix,az 85024",
        //                         "location": {
        //                             "id": "4916981639675904",
        //                             "created": "2023-04-18T09:38:26.038+05:30",
        //                             "modified": "2023-04-18T09:38:26.048+05:30",
        //                             "line1": "751 E Union Hills Dr",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85024",
        //                             "locLat": 33.6540547,
        //                             "locLng": -112.063263,
        //                             "locSource": "751 e union hills dr  phoenix,az 85024"
        //                         },
        //                         "deaNumber": "BS0422775"
        //                     },
        //                     "pharmacy": {
        //                         "id": "5585484709363712",
        //                         "created": "2023-04-18T09:38:22.545+05:30",
        //                         "modified": "2023-04-18T09:38:22.545+05:30",
        //                         "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                         "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                         "location": {
        //                             "id": "6148434662785024",
        //                             "created": "2023-04-18T09:38:22.535+05:30",
        //                             "modified": "2023-04-18T09:38:22.546+05:30",
        //                             "line1": "3402 N Central Ave",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85012",
        //                             "locLat": 33.4879117,
        //                             "locLng": -112.0745667,
        //                             "locSource": "3402 n central ave  phoenix,az 85012"
        //                         },
        //                         "deaNumber": "AW0572518"
        //                     },
        //                     "ndcCode": "59417010510",
        //                     "patientName": "ULA PECK",
        //                     "patientDOB": "02/04/1939",
        //                     "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                     "isExpectedPatient": true,
        //                     "ndcOriginalSource": "59417010510",
        //                     "productCodeQualifier": "ND",
        //                     "ourPharmacy": false,
        //                     "ourProvider": false,
        //                     "startDate": "2023-09-26T10:30:00.000+05:30",
        //                     "endDate": "2023-10-25T10:30:00.000+05:30"
        //                 },
        //                 {
        //                     "id": "6228784910958592",
        //                     "created": "2024-01-26T08:36:48.997+05:30",
        //                     "modified": "2024-01-26T08:36:49.763+05:30",
        //                     "patientId": "6007697174429696",
        //                     "classification": "STIMULANT",
        //                     "fillDate": "2023-09-26T10:30:00.000+05:30",
        //                     "fillDateString": "Sep 26",
        //                     "productName": "DEXTROAMPHETAMINE SACCHARATE, AMPHETAMINE ASPARTATE, DEXTROAMPHETAMINE SULFATE AND AMPHETAMINE SULFA, 5 M",
        //                     "displayName": "DEXTROAMPHETAMINE SACCHARATE, AMPHE",
        //                     "strengthDesc": "5 MG;5 MG;5 MG;5 MG",
        //                     "dosage": 5,
        //                     "prescribedQty": 30,
        //                     "prescribedLen": 30,
        //                     "dailyME": 0,
        //                     "writtenDate": "2023-09-22T10:30:00.000+05:30",
        //                     "writtenDateString": "Sep 22",
        //                     "nrCode": "R",
        //                     "refillCount": 0,
        //                     "rxNum": " ",
        //                     "isActive": false,
        //                     "isOurs": false,
        //                     "prescriber": {
        //                         "id": "6605831499939840",
        //                         "created": "2023-04-18T09:38:26.369+05:30",
        //                         "modified": "2023-04-18T09:38:26.369+05:30",
        //                         "firstName": "MARNA",
        //                         "lastName": "WITT",
        //                         "sourceAddress": "2602 w deer valley rd  phoenix,az 85027",
        //                         "location": {
        //                             "id": "5479931593097216",
        //                             "created": "2023-04-18T09:38:26.361+05:30",
        //                             "modified": "2023-04-18T09:38:26.369+05:30",
        //                             "line1": "2602 W Deer Valley Rd",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85027",
        //                             "locLat": 33.6842607,
        //                             "locLng": -112.1163379,
        //                             "locSource": "2602 w deer valley rd  phoenix,az 85027"
        //                         },
        //                         "deaNumber": "BS0422775"
        //                     },
        //                     "pharmacy": {
        //                         "id": "5585484709363712",
        //                         "created": "2023-04-18T09:38:22.545+05:30",
        //                         "modified": "2023-04-18T09:38:22.545+05:30",
        //                         "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                         "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                         "location": {
        //                             "id": "6148434662785024",
        //                             "created": "2023-04-18T09:38:22.535+05:30",
        //                             "modified": "2023-04-18T09:38:22.546+05:30",
        //                             "line1": "3402 N Central Ave",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85012",
        //                             "locLat": 33.4879117,
        //                             "locLng": -112.0745667,
        //                             "locSource": "3402 n central ave  phoenix,az 85012"
        //                         },
        //                         "deaNumber": "AW0572518"
        //                     },
        //                     "ndcCode": "00555097302",
        //                     "patientName": "ULA PECK",
        //                     "patientDOB": "02/04/1939",
        //                     "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                     "isExpectedPatient": true,
        //                     "ndcOriginalSource": "00555097302",
        //                     "productCodeQualifier": "ND",
        //                     "ourPharmacy": false,
        //                     "ourProvider": false,
        //                     "startDate": "2023-09-26T10:30:00.000+05:30",
        //                     "endDate": "2023-10-25T10:30:00.000+05:30"
        //                 },
        //                 {
        //                     "id": "4821410027405312",
        //                     "created": "2024-01-26T08:36:48.998+05:30",
        //                     "modified": "2024-01-26T08:36:49.764+05:30",
        //                     "patientId": "6007697174429696",
        //                     "classification": "OPIOID",
        //                     "fillDate": "2023-09-05T10:30:00.000+05:30",
        //                     "fillDateString": "Sep 5",
        //                     "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                     "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                     "strengthDesc": "10 MG;325 MG",
        //                     "dosage": 10,
        //                     "prescribedQty": 105,
        //                     "prescribedLen": 26,
        //                     "dailyME": 61,
        //                     "writtenDate": "2023-09-05T10:30:00.000+05:30",
        //                     "writtenDateString": "Sep 5",
        //                     "nrCode": "R",
        //                     "refillCount": 0,
        //                     "rxNum": " ",
        //                     "isActive": false,
        //                     "isOurs": false,
        //                     "prescriber": {
        //                         "id": "5902144058163200",
        //                         "created": "2023-04-18T09:38:26.654+05:30",
        //                         "modified": "2023-04-18T09:38:26.654+05:30",
        //                         "firstName": "JESUS",
        //                         "lastName": "GOFF",
        //                         "sourceAddress": "21816 n 26th ave  phoenix,az 85027",
        //                         "location": {
        //                             "id": "4776244151320576",
        //                             "created": "2023-04-18T09:38:26.646+05:30",
        //                             "modified": "2023-04-18T09:38:26.655+05:30",
        //                             "line1": "21816 N 26th Ave",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85027",
        //                             "locLat": 33.684586,
        //                             "locLng": -112.116367,
        //                             "locSource": "21816 n 26th ave  phoenix,az 85027"
        //                         },
        //                         "deaNumber": "MH3182261"
        //                     },
        //                     "pharmacy": {
        //                         "id": "5585484709363712",
        //                         "created": "2023-04-18T09:38:22.545+05:30",
        //                         "modified": "2023-04-18T09:38:22.545+05:30",
        //                         "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                         "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                         "location": {
        //                             "id": "6148434662785024",
        //                             "created": "2023-04-18T09:38:22.535+05:30",
        //                             "modified": "2023-04-18T09:38:22.546+05:30",
        //                             "line1": "3402 N Central Ave",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85012",
        //                             "locLat": 33.4879117,
        //                             "locLng": -112.0745667,
        //                             "locSource": "3402 n central ave  phoenix,az 85012"
        //                         },
        //                         "deaNumber": "AW0572518"
        //                     },
        //                     "ndcCode": "00228298311",
        //                     "patientName": "ULA PECK",
        //                     "patientDOB": "02/04/1939",
        //                     "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                     "isExpectedPatient": true,
        //                     "ndcOriginalSource": "00228298311",
        //                     "productCodeQualifier": "ND",
        //                     "ourPharmacy": false,
        //                     "ourProvider": false,
        //                     "startDate": "2023-09-05T10:30:00.000+05:30",
        //                     "endDate": "2023-09-30T10:30:00.000+05:30"
        //                 },
        //                 {
        //                     "id": "5947309934247936",
        //                     "created": "2024-01-26T08:36:48.998+05:30",
        //                     "modified": "2024-01-26T08:36:49.767+05:30",
        //                     "patientId": "6007697174429696",
        //                     "classification": "STIMULANT",
        //                     "fillDate": "2023-09-03T10:30:00.000+05:30",
        //                     "fillDateString": "Sep 3",
        //                     "productName": "DEXTROAMPHETAMINE SACCHARATE, AMPHETAMINE ASPARTATE, DEXTROAMPHETAMINE SULFATE AND AMPHETAMINE SULFA, 5 M",
        //                     "displayName": "DEXTROAMPHETAMINE SACCHARATE, AMPHE",
        //                     "strengthDesc": "5 MG;5 MG;5 MG;5 MG",
        //                     "dosage": 5,
        //                     "prescribedQty": 30,
        //                     "prescribedLen": 30,
        //                     "dailyME": 0,
        //                     "writtenDate": "2023-06-30T10:30:00.000+05:30",
        //                     "writtenDateString": "Jun 30",
        //                     "nrCode": "R",
        //                     "refillCount": 0,
        //                     "rxNum": " ",
        //                     "isActive": false,
        //                     "isOurs": false,
        //                     "prescriber": {
        //                         "id": "6465094011584512",
        //                         "created": "2023-04-18T09:38:26.965+05:30",
        //                         "modified": "2023-04-18T09:38:26.965+05:30",
        //                         "firstName": "MARNA",
        //                         "lastName": "WITT",
        //                         "sourceAddress": "2605 w deer valley rd  phoenix,az 85027",
        //                         "location": {
        //                             "id": "5339194104741888",
        //                             "created": "2023-04-18T09:38:26.958+05:30",
        //                             "modified": "2023-04-18T09:38:26.965+05:30",
        //                             "line1": "2605 W Deer Valley Rd",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85027",
        //                             "locLat": 33.6830506,
        //                             "locLng": -112.1160883,
        //                             "locSource": "2605 w deer valley rd  phoenix,az 85027"
        //                         },
        //                         "deaNumber": "BS0422775"
        //                     },
        //                     "pharmacy": {
        //                         "id": "6183619034873856",
        //                         "created": "2023-04-18T09:38:27.240+05:30",
        //                         "modified": "2023-04-18T09:38:27.240+05:30",
        //                         "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                         "sourceAddress": "3605 e thomas rd  phoenix,az 85018",
        //                         "location": {
        //                             "id": "5057719128031232",
        //                             "created": "2023-04-18T09:38:27.232+05:30",
        //                             "modified": "2023-04-18T09:38:27.240+05:30",
        //                             "line1": "3605 E Thomas Rd",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85018",
        //                             "locLat": 33.4799903,
        //                             "locLng": -112.0035764,
        //                             "locSource": "3605 e thomas rd  phoenix,az 85018"
        //                         },
        //                         "deaNumber": "AW0572481"
        //                     },
        //                     "ndcCode": "00555097302",
        //                     "patientName": "ULA PECK",
        //                     "patientDOB": "02/04/1939",
        //                     "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                     "isExpectedPatient": true,
        //                     "ndcOriginalSource": "00555097302",
        //                     "productCodeQualifier": "ND",
        //                     "ourPharmacy": false,
        //                     "ourProvider": false,
        //                     "startDate": "2023-09-03T10:30:00.000+05:30",
        //                     "endDate": "2023-10-02T10:30:00.000+05:30"
        //                 },
        //                 {
        //                     "id": "5384359980826624",
        //                     "created": "2024-01-26T08:36:48.998+05:30",
        //                     "modified": "2024-01-26T08:36:49.769+05:30",
        //                     "patientId": "6007697174429696",
        //                     "classification": "STIMULANT",
        //                     "fillDate": "2023-08-09T10:30:00.000+05:30",
        //                     "fillDateString": "Aug 9",
        //                     "productName": "DEXTROAMPHETAMINE SACCHARATE, AMPHETAMINE ASPARTATE, DEXTROAMPHETAMINE SULFATE AND AMPHETAMINE SULFA, 5 M",
        //                     "displayName": "DEXTROAMPHETAMINE SACCHARATE, AMPHE",
        //                     "strengthDesc": "5 MG;5 MG;5 MG;5 MG",
        //                     "dosage": 5,
        //                     "prescribedQty": 30,
        //                     "prescribedLen": 30,
        //                     "dailyME": 0,
        //                     "writtenDate": "2023-06-30T10:30:00.000+05:30",
        //                     "writtenDateString": "Jun 30",
        //                     "nrCode": "R",
        //                     "refillCount": 0,
        //                     "rxNum": " ",
        //                     "isActive": false,
        //                     "isOurs": false,
        //                     "prescriber": {
        //                         "id": "6746568988295168",
        //                         "created": "2023-04-18T09:38:27.549+05:30",
        //                         "modified": "2023-04-18T09:38:27.549+05:30",
        //                         "firstName": "MARNA",
        //                         "lastName": "WITT",
        //                         "sourceAddress": "4727 e bell rd  phoenix,az 85032",
        //                         "location": {
        //                             "id": "5620669081452544",
        //                             "created": "2023-04-18T09:38:27.541+05:30",
        //                             "modified": "2023-04-18T09:38:27.550+05:30",
        //                             "line1": "4727 E Bell Rd",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85032",
        //                             "locLat": 33.6383669,
        //                             "locLng": -111.9792636,
        //                             "locSource": "4727 e bell rd  phoenix,az 85032"
        //                         },
        //                         "deaNumber": "BS0422775"
        //                     },
        //                     "pharmacy": {
        //                         "id": "5585484709363712",
        //                         "created": "2023-04-18T09:38:22.545+05:30",
        //                         "modified": "2023-04-18T09:38:22.545+05:30",
        //                         "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                         "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                         "location": {
        //                             "id": "6148434662785024",
        //                             "created": "2023-04-18T09:38:22.535+05:30",
        //                             "modified": "2023-04-18T09:38:22.546+05:30",
        //                             "line1": "3402 N Central Ave",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85012",
        //                             "locLat": 33.4879117,
        //                             "locLng": -112.0745667,
        //                             "locSource": "3402 n central ave  phoenix,az 85012"
        //                         },
        //                         "deaNumber": "AW0572518"
        //                     },
        //                     "ndcCode": "00555097302",
        //                     "patientName": "ULA PECK",
        //                     "patientDOB": "02/04/1939",
        //                     "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                     "isExpectedPatient": true,
        //                     "ndcOriginalSource": "00555097302",
        //                     "productCodeQualifier": "ND",
        //                     "ourPharmacy": false,
        //                     "ourProvider": false,
        //                     "startDate": "2023-08-09T10:30:00.000+05:30",
        //                     "endDate": "2023-09-07T10:30:00.000+05:30"
        //                 },
        //                 {
        //                     "id": "6510259887669248",
        //                     "created": "2024-01-26T08:36:48.998+05:30",
        //                     "modified": "2024-01-26T08:36:49.770+05:30",
        //                     "patientId": "6007697174429696",
        //                     "classification": "OPIOID",
        //                     "fillDate": "2023-08-07T10:30:00.000+05:30",
        //                     "fillDateString": "Aug 7",
        //                     "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                     "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                     "strengthDesc": "10 MG;325 MG",
        //                     "dosage": 10,
        //                     "prescribedQty": 105,
        //                     "prescribedLen": 30,
        //                     "dailyME": 53,
        //                     "writtenDate": "2023-08-05T10:30:00.000+05:30",
        //                     "writtenDateString": "Aug 5",
        //                     "nrCode": "R",
        //                     "refillCount": 0,
        //                     "rxNum": " ",
        //                     "isActive": false,
        //                     "isOurs": false,
        //                     "prescriber": {
        //                         "id": "5647057360519168",
        //                         "created": "2023-04-18T09:38:27.828+05:30",
        //                         "modified": "2023-04-18T09:38:27.828+05:30",
        //                         "firstName": "JESUS",
        //                         "lastName": "GOFF",
        //                         "sourceAddress": "3502 w greenway rd  phoenix,az 85053",
        //                         "location": {
        //                             "id": "4521157453676544",
        //                             "created": "2023-04-18T09:38:27.822+05:30",
        //                             "modified": "2023-04-18T09:38:27.829+05:30",
        //                             "line1": "3502 W Greenway Rd",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85053",
        //                             "locLat": 33.6255504,
        //                             "locLng": -112.1339396,
        //                             "locSource": "3502 w greenway rd  phoenix,az 85053"
        //                         },
        //                         "deaNumber": "MH3182261"
        //                     },
        //                     "pharmacy": {
        //                         "id": "6183619034873856",
        //                         "created": "2023-04-18T09:38:27.240+05:30",
        //                         "modified": "2023-04-18T09:38:27.240+05:30",
        //                         "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                         "sourceAddress": "3605 e thomas rd  phoenix,az 85018",
        //                         "location": {
        //                             "id": "5057719128031232",
        //                             "created": "2023-04-18T09:38:27.232+05:30",
        //                             "modified": "2023-04-18T09:38:27.240+05:30",
        //                             "line1": "3605 E Thomas Rd",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85018",
        //                             "locLat": 33.4799903,
        //                             "locLng": -112.0035764,
        //                             "locSource": "3605 e thomas rd  phoenix,az 85018"
        //                         },
        //                         "deaNumber": "AW0572481"
        //                     },
        //                     "ndcCode": "00228298311",
        //                     "patientName": "ULA PECK",
        //                     "patientDOB": "02/04/1939",
        //                     "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                     "isExpectedPatient": true,
        //                     "ndcOriginalSource": "00228298311",
        //                     "productCodeQualifier": "ND",
        //                     "ourPharmacy": false,
        //                     "ourProvider": false,
        //                     "startDate": "2023-08-07T10:30:00.000+05:30",
        //                     "endDate": "2023-09-05T10:30:00.000+05:30"
        //                 },
        //                 {
        //                     "id": "4680672539049984",
        //                     "created": "2024-01-26T08:36:48.999+05:30",
        //                     "modified": "2024-01-26T08:36:49.770+05:30",
        //                     "patientId": "6007697174429696",
        //                     "classification": "OPIOID",
        //                     "fillDate": "2023-07-08T10:30:00.000+05:30",
        //                     "fillDateString": "Jul 8",
        //                     "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                     "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                     "strengthDesc": "10 MG;325 MG",
        //                     "dosage": 10,
        //                     "prescribedQty": 105,
        //                     "prescribedLen": 26,
        //                     "dailyME": 61,
        //                     "writtenDate": "2023-07-08T10:30:00.000+05:30",
        //                     "writtenDateString": "Jul 8",
        //                     "nrCode": "R",
        //                     "refillCount": 0,
        //                     "rxNum": " ",
        //                     "isActive": false,
        //                     "isOurs": false,
        //                     "prescriber": {
        //                         "id": "6210007313940480",
        //                         "created": "2023-04-18T09:38:28.143+05:30",
        //                         "modified": "2023-04-18T09:38:28.143+05:30",
        //                         "firstName": "LEONORE",
        //                         "lastName": "BURKE",
        //                         "sourceAddress": "3399 n scottsdale rd  scottsdale,az 85251",
        //                         "location": {
        //                             "id": "5084107407097856",
        //                             "created": "2023-04-18T09:38:28.104+05:30",
        //                             "modified": "2023-04-18T09:38:28.143+05:30",
        //                             "line1": "3399 N Scottsdale Rd",
        //                             "city": "Scottsdale",
        //                             "state": "AZ",
        //                             "zip": "85251",
        //                             "locLat": 33.4873821,
        //                             "locLng": -111.9253742,
        //                             "locSource": "3399 n scottsdale rd  scottsdale,az 85251"
        //                         },
        //                         "deaNumber": "MF3403273"
        //                     },
        //                     "pharmacy": {
        //                         "id": "5928532337229824",
        //                         "created": "2023-04-18T09:38:28.414+05:30",
        //                         "modified": "2023-04-18T09:38:28.414+05:30",
        //                         "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                         "sourceAddress": "4111 n 24th street  phoenix,az 85016",
        //                         "location": {
        //                             "id": "4802632430387200",
        //                             "created": "2023-04-18T09:38:28.407+05:30",
        //                             "modified": "2023-04-18T09:38:28.415+05:30",
        //                             "line1": "4111 N 24th St",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85016",
        //                             "locLat": 33.4953117,
        //                             "locLng": -112.0295014,
        //                             "locSource": "4111 n 24th street  phoenix,az 85016"
        //                         },
        //                         "deaNumber": "BW1377200"
        //                     },
        //                     "ndcCode": "00228298311",
        //                     "patientName": "ULA PECK",
        //                     "patientDOB": "02/04/1939",
        //                     "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                     "isExpectedPatient": true,
        //                     "ndcOriginalSource": "00228298311",
        //                     "productCodeQualifier": "ND",
        //                     "ourPharmacy": false,
        //                     "ourProvider": false,
        //                     "startDate": "2023-07-08T10:30:00.000+05:30",
        //                     "endDate": "2023-08-02T10:30:00.000+05:30"
        //                 },
        //                 {
        //                     "id": "5806572445892608",
        //                     "created": "2024-01-26T08:36:48.999+05:30",
        //                     "modified": "2024-01-26T08:36:49.771+05:30",
        //                     "patientId": "6007697174429696",
        //                     "classification": "OPIOID",
        //                     "fillDate": "2023-06-27T10:30:00.000+05:30",
        //                     "fillDateString": "Jun 27",
        //                     "productName": "OPANA ER, 5 MG, TABLET, EXTENDED RELEASE",
        //                     "displayName": "OPANA ER, 5 MG, TABLET, EXTENDED RE",
        //                     "strengthDesc": "5 MG",
        //                     "dosage": 5,
        //                     "prescribedQty": 60,
        //                     "prescribedLen": 30,
        //                     "dailyME": 30,
        //                     "writtenDate": "2023-06-10T10:30:00.000+05:30",
        //                     "writtenDateString": "Jun 10",
        //                     "nrCode": "R",
        //                     "refillCount": 0,
        //                     "rxNum": " ",
        //                     "isActive": false,
        //                     "isOurs": false,
        //                     "prescriber": {
        //                         "id": "4661894942031872",
        //                         "created": "2023-04-18T09:38:28.708+05:30",
        //                         "modified": "2023-04-18T09:38:28.708+05:30",
        //                         "firstName": "LEONORE",
        //                         "lastName": "BURKE",
        //                         "sourceAddress": "3330 n scottsdale rd  scottsdale,az 85251",
        //                         "location": {
        //                             "id": "6491482290651136",
        //                             "created": "2023-04-18T09:38:28.700+05:30",
        //                             "modified": "2023-04-18T09:38:28.708+05:30",
        //                             "line1": "3330 N Scottsdale Rd",
        //                             "city": "Scottsdale",
        //                             "state": "AZ",
        //                             "zip": "85251",
        //                             "locLat": 33.4870326,
        //                             "locLng": -111.9272421,
        //                             "locSource": "3330 n scottsdale rd  scottsdale,az 85251"
        //                         },
        //                         "deaNumber": "MF3403273"
        //                     },
        //                     "pharmacy": {
        //                         "id": "5224844895453184",
        //                         "created": "2023-04-18T09:38:29.053+05:30",
        //                         "modified": "2023-04-18T09:38:29.053+05:30",
        //                         "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                         "sourceAddress": "8015 e indian school rd  scottsdale,az 85251",
        //                         "location": {
        //                             "id": "5787794848874496",
        //                             "created": "2023-04-18T09:38:29.032+05:30",
        //                             "modified": "2023-04-18T09:38:29.054+05:30",
        //                             "line1": "8015 E Indian School Rd",
        //                             "city": "Scottsdale",
        //                             "state": "AZ",
        //                             "zip": "85251",
        //                             "locLat": 33.4935565,
        //                             "locLng": -111.9081693,
        //                             "locSource": "8015 e indian school rd  scottsdale,az 85251"
        //                         },
        //                         "deaNumber": "AW9699818"
        //                     },
        //                     "ndcCode": "63481081260",
        //                     "patientName": "ULA PECK",
        //                     "patientDOB": "02/04/1939",
        //                     "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                     "isExpectedPatient": true,
        //                     "ndcOriginalSource": "63481081260",
        //                     "productCodeQualifier": "ND",
        //                     "ourPharmacy": false,
        //                     "ourProvider": false,
        //                     "startDate": "2023-06-27T10:30:00.000+05:30",
        //                     "endDate": "2023-07-26T10:30:00.000+05:30"
        //                 },
        //                 {
        //                     "id": "5243622492471296",
        //                     "created": "2024-01-26T08:36:48.999+05:30",
        //                     "modified": "2024-01-26T08:36:49.772+05:30",
        //                     "patientId": "6007697174429696",
        //                     "classification": "STIMULANT",
        //                     "fillDate": "2023-06-23T10:30:00.000+05:30",
        //                     "fillDateString": "Jun 23",
        //                     "productName": "DEXTROAMPHETAMINE SACCHARATE, AMPHETAMINE ASPARTATE, DEXTROAMPHETAMINE SULFATE AND AMPHETAMINE SULFA, 5 M",
        //                     "displayName": "DEXTROAMPHETAMINE SACCHARATE, AMPHE",
        //                     "strengthDesc": "5 MG;5 MG;5 MG;5 MG",
        //                     "dosage": 5,
        //                     "prescribedQty": 30,
        //                     "prescribedLen": 30,
        //                     "dailyME": 0,
        //                     "writtenDate": "2023-03-31T10:30:00.000+05:30",
        //                     "writtenDateString": "Mar 31",
        //                     "nrCode": "R",
        //                     "refillCount": 0,
        //                     "rxNum": " ",
        //                     "isActive": false,
        //                     "isOurs": false,
        //                     "prescriber": {
        //                         "id": "4943369918742528",
        //                         "created": "2023-04-18T09:38:29.340+05:30",
        //                         "modified": "2023-04-18T09:38:29.340+05:30",
        //                         "firstName": "MARNA",
        //                         "lastName": "WITT",
        //                         "sourceAddress": "4214 w dunlap ave  phoenix,az 85051",
        //                         "location": {
        //                             "id": "6350744802295808",
        //                             "created": "2023-04-18T09:38:29.332+05:30",
        //                             "modified": "2023-04-18T09:38:29.341+05:30",
        //                             "line1": "4214 W Dunlap Ave",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85051",
        //                             "locLat": 33.5679233,
        //                             "locLng": -112.1495883,
        //                             "locSource": "4214 w dunlap ave  phoenix,az 85051"
        //                         },
        //                         "deaNumber": "BS0422775"
        //                     },
        //                     "pharmacy": {
        //                         "id": "5585484709363712",
        //                         "created": "2023-04-18T09:38:22.545+05:30",
        //                         "modified": "2023-04-18T09:38:22.545+05:30",
        //                         "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                         "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                         "location": {
        //                             "id": "6148434662785024",
        //                             "created": "2023-04-18T09:38:22.535+05:30",
        //                             "modified": "2023-04-18T09:38:22.546+05:30",
        //                             "line1": "3402 N Central Ave",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85012",
        //                             "locLat": 33.4879117,
        //                             "locLng": -112.0745667,
        //                             "locSource": "3402 n central ave  phoenix,az 85012"
        //                         },
        //                         "deaNumber": "AW0572518"
        //                     },
        //                     "ndcCode": "00555097302",
        //                     "patientName": "ULA PECK",
        //                     "patientDOB": "02/04/1939",
        //                     "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                     "isExpectedPatient": true,
        //                     "ndcOriginalSource": "00555097302",
        //                     "productCodeQualifier": "ND",
        //                     "ourPharmacy": false,
        //                     "ourProvider": false,
        //                     "startDate": "2023-06-23T10:30:00.000+05:30",
        //                     "endDate": "2023-07-22T10:30:00.000+05:30"
        //                 },
        //                 {
        //                     "id": "6369522399313920",
        //                     "created": "2024-01-26T08:36:49.000+05:30",
        //                     "modified": "2024-01-26T08:36:49.772+05:30",
        //                     "patientId": "6007697174429696",
        //                     "classification": "STIMULANT",
        //                     "fillDate": "2023-06-23T10:30:00.000+05:30",
        //                     "fillDateString": "Jun 23",
        //                     "productName": "VYVANSE, 50 MG, CAPSULE",
        //                     "displayName": "VYVANSE, 50 MG, CAPSULE",
        //                     "strengthDesc": "50 MG",
        //                     "dosage": 50,
        //                     "prescribedQty": 10,
        //                     "prescribedLen": 10,
        //                     "dailyME": 0,
        //                     "writtenDate": "2023-03-31T10:30:00.000+05:30",
        //                     "writtenDateString": "Mar 31",
        //                     "nrCode": "R",
        //                     "refillCount": 0,
        //                     "rxNum": " ",
        //                     "isActive": false,
        //                     "isOurs": false,
        //                     "prescriber": {
        //                         "id": "5506319872163840",
        //                         "created": "2023-04-18T09:38:29.637+05:30",
        //                         "modified": "2023-04-18T09:38:29.637+05:30",
        //                         "firstName": "MARNA",
        //                         "lastName": "WITT",
        //                         "sourceAddress": "4225 w dunlap ave  phoenix,az 85051",
        //                         "location": {
        //                             "id": "6069269825585152",
        //                             "created": "2023-04-18T09:38:29.630+05:30",
        //                             "modified": "2023-04-18T09:38:29.637+05:30",
        //                             "line1": "4225 W Dunlap Ave",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85051",
        //                             "locLat": 33.5671697,
        //                             "locLng": -112.1506737,
        //                             "locSource": "4225 w dunlap ave  phoenix,az 85051"
        //                         },
        //                         "deaNumber": "BS0422775"
        //                     },
        //                     "pharmacy": {
        //                         "id": "5585484709363712",
        //                         "created": "2023-04-18T09:38:22.545+05:30",
        //                         "modified": "2023-04-18T09:38:22.545+05:30",
        //                         "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                         "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                         "location": {
        //                             "id": "6148434662785024",
        //                             "created": "2023-04-18T09:38:22.535+05:30",
        //                             "modified": "2023-04-18T09:38:22.546+05:30",
        //                             "line1": "3402 N Central Ave",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85012",
        //                             "locLat": 33.4879117,
        //                             "locLng": -112.0745667,
        //                             "locSource": "3402 n central ave  phoenix,az 85012"
        //                         },
        //                         "deaNumber": "AW0572518"
        //                     },
        //                     "ndcCode": "59417010510",
        //                     "patientName": "ULA PECK",
        //                     "patientDOB": "02/04/1939",
        //                     "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                     "isExpectedPatient": true,
        //                     "ndcOriginalSource": "59417010510",
        //                     "productCodeQualifier": "ND",
        //                     "ourPharmacy": false,
        //                     "ourProvider": false,
        //                     "startDate": "2023-06-23T10:30:00.000+05:30",
        //                     "endDate": "2023-07-02T10:30:00.000+05:30"
        //                 },
        //                 {
        //                     "id": "6088047422603264",
        //                     "created": "2024-01-26T08:36:49.000+05:30",
        //                     "modified": "2024-01-26T08:36:49.774+05:30",
        //                     "patientId": "6007697174429696",
        //                     "classification": "OPIOID",
        //                     "fillDate": "2023-06-10T10:30:00.000+05:30",
        //                     "fillDateString": "Jun 10",
        //                     "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                     "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                     "strengthDesc": "10 MG;325 MG",
        //                     "dosage": 10,
        //                     "prescribedQty": 105,
        //                     "prescribedLen": 30,
        //                     "dailyME": 53,
        //                     "writtenDate": "2023-06-10T10:30:00.000+05:30",
        //                     "writtenDateString": "Jun 10",
        //                     "nrCode": "R",
        //                     "refillCount": 0,
        //                     "rxNum": " ",
        //                     "isActive": false,
        //                     "isOurs": false,
        //                     "prescriber": {
        //                         "id": "6632219779006464",
        //                         "created": "2023-04-18T09:38:29.717+05:30",
        //                         "modified": "2023-04-18T09:38:29.717+05:30",
        //                         "firstName": "LEONORE",
        //                         "lastName": "BURKE",
        //                         "sourceAddress": "",
        //                         "deaNumber": "MF3403273"
        //                     },
        //                     "pharmacy": {
        //                         "id": "5585484709363712",
        //                         "created": "2023-04-18T09:38:22.545+05:30",
        //                         "modified": "2023-04-18T09:38:22.545+05:30",
        //                         "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                         "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                         "location": {
        //                             "id": "6148434662785024",
        //                             "created": "2023-04-18T09:38:22.535+05:30",
        //                             "modified": "2023-04-18T09:38:22.546+05:30",
        //                             "line1": "3402 N Central Ave",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85012",
        //                             "locLat": 33.4879117,
        //                             "locLng": -112.0745667,
        //                             "locSource": "3402 n central ave  phoenix,az 85012"
        //                         },
        //                         "deaNumber": "AW0572518"
        //                     },
        //                     "ndcCode": "00228298311",
        //                     "patientName": "ULA PECK",
        //                     "patientDOB": "02/04/1939",
        //                     "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                     "isExpectedPatient": true,
        //                     "ndcOriginalSource": "00228298311",
        //                     "productCodeQualifier": "ND",
        //                     "ourPharmacy": false,
        //                     "ourProvider": false,
        //                     "startDate": "2023-06-10T10:30:00.000+05:30",
        //                     "endDate": "2023-07-09T10:30:00.000+05:30"
        //                 },
        //                 {
        //                     "id": "6650997376024576",
        //                     "created": "2024-01-26T08:36:49.000+05:30",
        //                     "modified": "2024-01-26T08:36:49.776+05:30",
        //                     "patientId": "6007697174429696",
        //                     "classification": "OPIOID",
        //                     "fillDate": "2023-05-10T10:30:00.000+05:30",
        //                     "fillDateString": "May 10",
        //                     "productName": "MORPHINE SULFATE, 15 MG, TABLET, EXTENDED RELEASE",
        //                     "displayName": "MORPHINE SULFATE, 15 MG, TABLET, EX",
        //                     "strengthDesc": "15 MG",
        //                     "dosage": 15,
        //                     "prescribedQty": 60,
        //                     "prescribedLen": 30,
        //                     "dailyME": 30,
        //                     "writtenDate": "2023-05-08T10:30:00.000+05:30",
        //                     "writtenDateString": "May 8",
        //                     "nrCode": "R",
        //                     "refillCount": 0,
        //                     "rxNum": " ",
        //                     "isActive": false,
        //                     "isOurs": false,
        //                     "prescriber": {
        //                         "id": "6632219779006464",
        //                         "created": "2023-04-18T09:38:29.717+05:30",
        //                         "modified": "2023-04-18T09:38:29.717+05:30",
        //                         "firstName": "LEONORE",
        //                         "lastName": "BURKE",
        //                         "sourceAddress": "",
        //                         "deaNumber": "MF3403273"
        //                     },
        //                     "pharmacy": {
        //                         "id": "5585484709363712",
        //                         "created": "2023-04-18T09:38:22.545+05:30",
        //                         "modified": "2023-04-18T09:38:22.545+05:30",
        //                         "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                         "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                         "location": {
        //                             "id": "6148434662785024",
        //                             "created": "2023-04-18T09:38:22.535+05:30",
        //                             "modified": "2023-04-18T09:38:22.546+05:30",
        //                             "line1": "3402 N Central Ave",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85012",
        //                             "locLat": 33.4879117,
        //                             "locLng": -112.0745667,
        //                             "locSource": "3402 n central ave  phoenix,az 85012"
        //                         },
        //                         "deaNumber": "AW0572518"
        //                     },
        //                     "ndcCode": "68382090301",
        //                     "patientName": "ULA PECK",
        //                     "patientDOB": "02/04/1939",
        //                     "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                     "isExpectedPatient": true,
        //                     "ndcOriginalSource": "68382090301",
        //                     "productCodeQualifier": "ND",
        //                     "ourPharmacy": false,
        //                     "ourProvider": false,
        //                     "startDate": "2023-05-10T10:30:00.000+05:30",
        //                     "endDate": "2023-06-08T10:30:00.000+05:30"
        //                 },
        //                 {
        //                     "id": "5173253748293632",
        //                     "created": "2024-01-26T08:36:49.001+05:30",
        //                     "modified": "2024-01-26T08:36:49.777+05:30",
        //                     "patientId": "6007697174429696",
        //                     "classification": "OPIOID",
        //                     "fillDate": "2023-05-10T10:30:00.000+05:30",
        //                     "fillDateString": "May 10",
        //                     "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                     "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                     "strengthDesc": "10 MG;325 MG",
        //                     "dosage": 10,
        //                     "prescribedQty": 105,
        //                     "prescribedLen": 26,
        //                     "dailyME": 61,
        //                     "writtenDate": "2023-05-08T10:30:00.000+05:30",
        //                     "writtenDateString": "May 8",
        //                     "nrCode": "R",
        //                     "refillCount": 0,
        //                     "rxNum": " ",
        //                     "isActive": false,
        //                     "isOurs": false,
        //                     "prescriber": {
        //                         "id": "6632219779006464",
        //                         "created": "2023-04-18T09:38:29.717+05:30",
        //                         "modified": "2023-04-18T09:38:29.717+05:30",
        //                         "firstName": "LEONORE",
        //                         "lastName": "BURKE",
        //                         "sourceAddress": "",
        //                         "deaNumber": "MF3403273"
        //                     },
        //                     "pharmacy": {
        //                         "id": "5585484709363712",
        //                         "created": "2023-04-18T09:38:22.545+05:30",
        //                         "modified": "2023-04-18T09:38:22.545+05:30",
        //                         "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                         "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                         "location": {
        //                             "id": "6148434662785024",
        //                             "created": "2023-04-18T09:38:22.535+05:30",
        //                             "modified": "2023-04-18T09:38:22.546+05:30",
        //                             "line1": "3402 N Central Ave",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85012",
        //                             "locLat": 33.4879117,
        //                             "locLng": -112.0745667,
        //                             "locSource": "3402 n central ave  phoenix,az 85012"
        //                         },
        //                         "deaNumber": "AW0572518"
        //                     },
        //                     "ndcCode": "00228298311",
        //                     "patientName": "ULA PECK",
        //                     "patientDOB": "02/04/1939",
        //                     "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                     "isExpectedPatient": true,
        //                     "ndcOriginalSource": "00228298311",
        //                     "productCodeQualifier": "ND",
        //                     "ourPharmacy": false,
        //                     "ourProvider": false,
        //                     "startDate": "2023-05-10T10:30:00.000+05:30",
        //                     "endDate": "2023-06-04T10:30:00.000+05:30"
        //                 },
        //                 {
        //                     "id": "6299153655136256",
        //                     "created": "2024-01-26T08:36:49.001+05:30",
        //                     "modified": "2024-01-26T08:36:49.778+05:30",
        //                     "patientId": "6007697174429696",
        //                     "classification": "STIMULANT",
        //                     "fillDate": "2023-04-17T10:30:00.000+05:30",
        //                     "fillDateString": "Apr 17",
        //                     "productName": "DEXTROAMPHETAMINE SACCHARATE, AMPHETAMINE ASPARTATE, DEXTROAMPHETAMINE SULFATE AND AMPHETAMINE SULFA, 5 M",
        //                     "displayName": "DEXTROAMPHETAMINE SACCHARATE, AMPHE",
        //                     "strengthDesc": "5 MG;5 MG;5 MG;5 MG",
        //                     "dosage": 5,
        //                     "prescribedQty": 30,
        //                     "prescribedLen": 30,
        //                     "dailyME": 0,
        //                     "writtenDate": "2023-03-31T10:30:00.000+05:30",
        //                     "writtenDateString": "Mar 31",
        //                     "nrCode": "R",
        //                     "refillCount": 0,
        //                     "rxNum": " ",
        //                     "isActive": false,
        //                     "isOurs": false,
        //                     "prescriber": {
        //                         "id": "5717426104696832",
        //                         "created": "2023-04-18T09:38:30.170+05:30",
        //                         "modified": "2023-04-18T09:38:30.170+05:30",
        //                         "firstName": "MARNA",
        //                         "lastName": "WITT",
        //                         "sourceAddress": "21050 n tatum blvd  phoenix,az 85050",
        //                         "location": {
        //                             "id": "4591526197854208",
        //                             "created": "2023-04-18T09:38:30.164+05:30",
        //                             "modified": "2023-04-18T09:38:30.170+05:30",
        //                             "line1": "21050 N Tatum Blvd",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85050",
        //                             "locLat": 33.6777893,
        //                             "locLng": -111.9789375,
        //                             "locSource": "21050 n tatum blvd  phoenix,az 85050"
        //                         },
        //                         "deaNumber": "BS0422775"
        //                     },
        //                     "pharmacy": {
        //                         "id": "5585484709363712",
        //                         "created": "2023-04-18T09:38:22.545+05:30",
        //                         "modified": "2023-04-18T09:38:22.545+05:30",
        //                         "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                         "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                         "location": {
        //                             "id": "6148434662785024",
        //                             "created": "2023-04-18T09:38:22.535+05:30",
        //                             "modified": "2023-04-18T09:38:22.546+05:30",
        //                             "line1": "3402 N Central Ave",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85012",
        //                             "locLat": 33.4879117,
        //                             "locLng": -112.0745667,
        //                             "locSource": "3402 n central ave  phoenix,az 85012"
        //                         },
        //                         "deaNumber": "AW0572518"
        //                     },
        //                     "ndcCode": "00555097302",
        //                     "patientName": "ULA PECK",
        //                     "patientDOB": "02/04/1939",
        //                     "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                     "isExpectedPatient": true,
        //                     "ndcOriginalSource": "00555097302",
        //                     "productCodeQualifier": "ND",
        //                     "ourPharmacy": false,
        //                     "ourProvider": false,
        //                     "startDate": "2023-04-17T10:30:00.000+05:30",
        //                     "endDate": "2023-05-16T10:30:00.000+05:30"
        //                 },
        //                 {
        //                     "id": "4891778771582976",
        //                     "created": "2024-01-26T08:36:49.002+05:30",
        //                     "modified": "2024-01-26T08:36:49.779+05:30",
        //                     "patientId": "6007697174429696",
        //                     "classification": "OPIOID",
        //                     "fillDate": "2023-04-12T10:30:00.000+05:30",
        //                     "fillDateString": "Apr 12",
        //                     "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                     "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                     "strengthDesc": "10 MG;325 MG",
        //                     "dosage": 10,
        //                     "prescribedQty": 105,
        //                     "prescribedLen": 30,
        //                     "dailyME": 53,
        //                     "writtenDate": "2023-04-10T10:30:00.000+05:30",
        //                     "writtenDateString": "Apr 10",
        //                     "nrCode": "R",
        //                     "refillCount": 0,
        //                     "rxNum": " ",
        //                     "isActive": false,
        //                     "isOurs": false,
        //                     "prescriber": {
        //                         "id": "6632219779006464",
        //                         "created": "2023-04-18T09:38:29.717+05:30",
        //                         "modified": "2023-04-18T09:38:29.717+05:30",
        //                         "firstName": "LEONORE",
        //                         "lastName": "BURKE",
        //                         "sourceAddress": "",
        //                         "deaNumber": "MF3403273"
        //                     },
        //                     "pharmacy": {
        //                         "id": "5585484709363712",
        //                         "created": "2023-04-18T09:38:22.545+05:30",
        //                         "modified": "2023-04-18T09:38:22.545+05:30",
        //                         "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                         "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                         "location": {
        //                             "id": "6148434662785024",
        //                             "created": "2023-04-18T09:38:22.535+05:30",
        //                             "modified": "2023-04-18T09:38:22.546+05:30",
        //                             "line1": "3402 N Central Ave",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85012",
        //                             "locLat": 33.4879117,
        //                             "locLng": -112.0745667,
        //                             "locSource": "3402 n central ave  phoenix,az 85012"
        //                         },
        //                         "deaNumber": "AW0572518"
        //                     },
        //                     "ndcCode": "00228298311",
        //                     "patientName": "ULA PECK",
        //                     "patientDOB": "02/04/1939",
        //                     "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                     "isExpectedPatient": true,
        //                     "ndcOriginalSource": "00228298311",
        //                     "productCodeQualifier": "ND",
        //                     "ourPharmacy": false,
        //                     "ourProvider": false,
        //                     "startDate": "2023-04-12T10:30:00.000+05:30",
        //                     "endDate": "2023-05-11T10:30:00.000+05:30"
        //                 },
        //                 {
        //                     "id": "6017678678425600",
        //                     "created": "2024-01-26T08:36:49.002+05:30",
        //                     "modified": "2024-01-26T08:36:49.780+05:30",
        //                     "patientId": "6007697174429696",
        //                     "classification": "STIMULANT",
        //                     "fillDate": "2023-04-12T10:30:00.000+05:30",
        //                     "fillDateString": "Apr 12",
        //                     "productName": "VYVANSE, 50 MG, CAPSULE",
        //                     "displayName": "VYVANSE, 50 MG, CAPSULE",
        //                     "strengthDesc": "50 MG",
        //                     "dosage": 50,
        //                     "prescribedQty": 30,
        //                     "prescribedLen": 30,
        //                     "dailyME": 0,
        //                     "writtenDate": "2023-03-31T10:30:00.000+05:30",
        //                     "writtenDateString": "Mar 31",
        //                     "nrCode": "R",
        //                     "refillCount": 0,
        //                     "rxNum": " ",
        //                     "isActive": false,
        //                     "isOurs": false,
        //                     "prescriber": {
        //                         "id": "6280376058118144",
        //                         "created": "2023-04-18T09:38:30.534+05:30",
        //                         "modified": "2023-04-18T09:38:30.534+05:30",
        //                         "firstName": "MARNA",
        //                         "lastName": "WITT",
        //                         "sourceAddress": "20759-20963 n tatum blvd  phoenix,az 85050",
        //                         "location": {
        //                             "id": "5154476151275520",
        //                             "created": "2023-04-18T09:38:30.528+05:30",
        //                             "modified": "2023-04-18T09:38:30.534+05:30",
        //                             "line1": "20759 N Tatum Blvd",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85054",
        //                             "locLat": 33.6749678,
        //                             "locLng": -111.9773019,
        //                             "locSource": "20759- 20963 n tatum blvd  phoenix,az 85050"
        //                         },
        //                         "deaNumber": "BS0422775"
        //                     },
        //                     "pharmacy": {
        //                         "id": "5585484709363712",
        //                         "created": "2023-04-18T09:38:22.545+05:30",
        //                         "modified": "2023-04-18T09:38:22.545+05:30",
        //                         "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                         "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                         "location": {
        //                             "id": "6148434662785024",
        //                             "created": "2023-04-18T09:38:22.535+05:30",
        //                             "modified": "2023-04-18T09:38:22.546+05:30",
        //                             "line1": "3402 N Central Ave",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85012",
        //                             "locLat": 33.4879117,
        //                             "locLng": -112.0745667,
        //                             "locSource": "3402 n central ave  phoenix,az 85012"
        //                         },
        //                         "deaNumber": "AW0572518"
        //                     },
        //                     "ndcCode": "59417010510",
        //                     "patientName": "ULA PECK",
        //                     "patientDOB": "02/04/1939",
        //                     "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                     "isExpectedPatient": true,
        //                     "ndcOriginalSource": "59417010510",
        //                     "productCodeQualifier": "ND",
        //                     "ourPharmacy": false,
        //                     "ourProvider": false,
        //                     "startDate": "2023-04-12T10:30:00.000+05:30",
        //                     "endDate": "2023-05-11T10:30:00.000+05:30"
        //                 },
        //                 {
        //                     "id": "5454728725004288",
        //                     "created": "2024-01-26T08:36:49.002+05:30",
        //                     "modified": "2024-01-26T08:36:49.781+05:30",
        //                     "patientId": "6007697174429696",
        //                     "classification": "OPIOID",
        //                     "fillDate": "2023-04-09T10:30:00.000+05:30",
        //                     "fillDateString": "Apr 9",
        //                     "productName": "OXYCONTIN, 10 MG, TABLET, FILM COATED, EXTENDED RELEASE",
        //                     "displayName": "OXYCONTIN, 10 MG, TABLET, FILM COAT",
        //                     "strengthDesc": "10 MG",
        //                     "dosage": 10,
        //                     "prescribedQty": 60,
        //                     "prescribedLen": 30,
        //                     "dailyME": 30,
        //                     "writtenDate": "2023-03-12T10:30:00.000+05:30",
        //                     "writtenDateString": "Mar 12",
        //                     "nrCode": "R",
        //                     "refillCount": 0,
        //                     "rxNum": " ",
        //                     "isActive": false,
        //                     "isOurs": false,
        //                     "prescriber": {
        //                         "id": "6632219779006464",
        //                         "created": "2023-04-18T09:38:29.717+05:30",
        //                         "modified": "2023-04-18T09:38:29.717+05:30",
        //                         "firstName": "LEONORE",
        //                         "lastName": "BURKE",
        //                         "sourceAddress": "",
        //                         "deaNumber": "MF3403273"
        //                     },
        //                     "pharmacy": {
        //                         "id": "6183619034873856",
        //                         "created": "2023-04-18T09:38:27.240+05:30",
        //                         "modified": "2023-04-18T09:38:27.240+05:30",
        //                         "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                         "sourceAddress": "3605 e thomas rd  phoenix,az 85018",
        //                         "location": {
        //                             "id": "5057719128031232",
        //                             "created": "2023-04-18T09:38:27.232+05:30",
        //                             "modified": "2023-04-18T09:38:27.240+05:30",
        //                             "line1": "3605 E Thomas Rd",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85018",
        //                             "locLat": 33.4799903,
        //                             "locLng": -112.0035764,
        //                             "locSource": "3605 e thomas rd  phoenix,az 85018"
        //                         },
        //                         "deaNumber": "AW0572481"
        //                     },
        //                     "ndcCode": "59011041010",
        //                     "patientName": "ULA PECK",
        //                     "patientDOB": "02/04/1939",
        //                     "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                     "isExpectedPatient": true,
        //                     "ndcOriginalSource": "59011041010",
        //                     "productCodeQualifier": "ND",
        //                     "ourPharmacy": false,
        //                     "ourProvider": false,
        //                     "startDate": "2023-04-09T10:30:00.000+05:30",
        //                     "endDate": "2023-05-08T10:30:00.000+05:30"
        //                 },
        //                 {
        //                     "id": "6580628631846912",
        //                     "created": "2024-01-26T08:36:49.002+05:30",
        //                     "modified": "2024-01-26T08:36:49.782+05:30",
        //                     "patientId": "6007697174429696",
        //                     "classification": "OPIOID",
        //                     "fillDate": "2023-03-12T10:30:00.000+05:30",
        //                     "fillDateString": "Mar 12",
        //                     "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                     "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                     "strengthDesc": "10 MG;325 MG",
        //                     "dosage": 10,
        //                     "prescribedQty": 105,
        //                     "prescribedLen": 30,
        //                     "dailyME": 53,
        //                     "writtenDate": "2023-03-12T10:30:00.000+05:30",
        //                     "writtenDateString": "Mar 12",
        //                     "nrCode": "R",
        //                     "refillCount": 0,
        //                     "rxNum": " ",
        //                     "isActive": false,
        //                     "isOurs": false,
        //                     "prescriber": {
        //                         "id": "6632219779006464",
        //                         "created": "2023-04-18T09:38:29.717+05:30",
        //                         "modified": "2023-04-18T09:38:29.717+05:30",
        //                         "firstName": "LEONORE",
        //                         "lastName": "BURKE",
        //                         "sourceAddress": "",
        //                         "deaNumber": "MF3403273"
        //                     },
        //                     "pharmacy": {
        //                         "id": "6183619034873856",
        //                         "created": "2023-04-18T09:38:27.240+05:30",
        //                         "modified": "2023-04-18T09:38:27.240+05:30",
        //                         "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                         "sourceAddress": "3605 e thomas rd  phoenix,az 85018",
        //                         "location": {
        //                             "id": "5057719128031232",
        //                             "created": "2023-04-18T09:38:27.232+05:30",
        //                             "modified": "2023-04-18T09:38:27.240+05:30",
        //                             "line1": "3605 E Thomas Rd",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85018",
        //                             "locLat": 33.4799903,
        //                             "locLng": -112.0035764,
        //                             "locSource": "3605 e thomas rd  phoenix,az 85018"
        //                         },
        //                         "deaNumber": "AW0572481"
        //                     },
        //                     "ndcCode": "00228298311",
        //                     "patientName": "ULA PECK",
        //                     "patientDOB": "02/04/1939",
        //                     "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                     "isExpectedPatient": true,
        //                     "ndcOriginalSource": "00228298311",
        //                     "productCodeQualifier": "ND",
        //                     "ourPharmacy": false,
        //                     "ourProvider": false,
        //                     "startDate": "2023-03-12T10:30:00.000+05:30",
        //                     "endDate": "2023-04-10T10:30:00.000+05:30"
        //                 },
        //                 {
        //                     "id": "4751041283227648",
        //                     "created": "2024-01-26T08:36:49.002+05:30",
        //                     "modified": "2024-01-26T08:36:49.783+05:30",
        //                     "patientId": "6007697174429696",
        //                     "classification": "STIMULANT",
        //                     "fillDate": "2023-03-07T10:30:00.000+05:30",
        //                     "fillDateString": "Mar 7",
        //                     "productName": "VYVANSE, 50 MG, CAPSULE",
        //                     "displayName": "VYVANSE, 50 MG, CAPSULE",
        //                     "strengthDesc": "50 MG",
        //                     "dosage": 50,
        //                     "prescribedQty": 30,
        //                     "prescribedLen": 30,
        //                     "dailyME": 0,
        //                     "writtenDate": "2022-12-25T10:30:00.000+05:30",
        //                     "writtenDateString": "Dec 25",
        //                     "nrCode": "R",
        //                     "refillCount": 0,
        //                     "rxNum": " ",
        //                     "isActive": false,
        //                     "isOurs": false,
        //                     "prescriber": {
        //                         "id": "5998901081407488",
        //                         "created": "2023-04-18T09:38:30.934+05:30",
        //                         "modified": "2023-04-18T09:38:30.934+05:30",
        //                         "firstName": "MARNA",
        //                         "lastName": "WITT",
        //                         "sourceAddress": "5310 e high st  phoenix,az 85054",
        //                         "location": {
        //                             "id": "4873001174564864",
        //                             "created": "2023-04-18T09:38:30.926+05:30",
        //                             "modified": "2023-04-18T09:38:30.934+05:30",
        //                             "line1": "5310 E High St",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85054",
        //                             "locLat": 33.6765403,
        //                             "locLng": -111.9663621,
        //                             "locSource": "5310 e high st  phoenix,az 85054"
        //                         },
        //                         "deaNumber": "BS0422775"
        //                     },
        //                     "pharmacy": {
        //                         "id": "5585484709363712",
        //                         "created": "2023-04-18T09:38:22.545+05:30",
        //                         "modified": "2023-04-18T09:38:22.545+05:30",
        //                         "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                         "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                         "location": {
        //                             "id": "6148434662785024",
        //                             "created": "2023-04-18T09:38:22.535+05:30",
        //                             "modified": "2023-04-18T09:38:22.546+05:30",
        //                             "line1": "3402 N Central Ave",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85012",
        //                             "locLat": 33.4879117,
        //                             "locLng": -112.0745667,
        //                             "locSource": "3402 n central ave  phoenix,az 85012"
        //                         },
        //                         "deaNumber": "AW0572518"
        //                     },
        //                     "ndcCode": "59417010510",
        //                     "patientName": "ULA PECK",
        //                     "patientDOB": "02/04/1939",
        //                     "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                     "isExpectedPatient": true,
        //                     "ndcOriginalSource": "59417010510",
        //                     "productCodeQualifier": "ND",
        //                     "ourPharmacy": false,
        //                     "ourProvider": false,
        //                     "startDate": "2023-03-07T10:30:00.000+05:30",
        //                     "endDate": "2023-04-05T10:30:00.000+05:30"
        //                 },
        //                 {
        //                     "id": "5876941190070272",
        //                     "created": "2024-01-26T08:36:49.003+05:30",
        //                     "modified": "2024-01-26T08:36:49.784+05:30",
        //                     "patientId": "6007697174429696",
        //                     "classification": "OPIOID",
        //                     "fillDate": "2023-02-13T10:30:00.000+05:30",
        //                     "fillDateString": "Feb 13",
        //                     "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                     "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                     "strengthDesc": "10 MG;325 MG",
        //                     "dosage": 10,
        //                     "prescribedQty": 105,
        //                     "prescribedLen": 26,
        //                     "dailyME": 61,
        //                     "writtenDate": "2023-02-11T10:30:00.000+05:30",
        //                     "writtenDateString": "Feb 11",
        //                     "nrCode": "R",
        //                     "refillCount": 0,
        //                     "rxNum": " ",
        //                     "isActive": false,
        //                     "isOurs": false,
        //                     "prescriber": {
        //                         "id": "5435951127986176",
        //                         "created": "2023-04-18T09:38:31.034+05:30",
        //                         "modified": "2023-04-18T09:38:31.034+05:30",
        //                         "firstName": "BELKIS",
        //                         "lastName": "MUELLER",
        //                         "sourceAddress": "",
        //                         "deaNumber": "MH0820820"
        //                     },
        //                     "pharmacy": {
        //                         "id": "5585484709363712",
        //                         "created": "2023-04-18T09:38:22.545+05:30",
        //                         "modified": "2023-04-18T09:38:22.545+05:30",
        //                         "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                         "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                         "location": {
        //                             "id": "6148434662785024",
        //                             "created": "2023-04-18T09:38:22.535+05:30",
        //                             "modified": "2023-04-18T09:38:22.546+05:30",
        //                             "line1": "3402 N Central Ave",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85012",
        //                             "locLat": 33.4879117,
        //                             "locLng": -112.0745667,
        //                             "locSource": "3402 n central ave  phoenix,az 85012"
        //                         },
        //                         "deaNumber": "AW0572518"
        //                     },
        //                     "ndcCode": "00228298311",
        //                     "patientName": "ULA PECK",
        //                     "patientDOB": "02/04/1939",
        //                     "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                     "isExpectedPatient": true,
        //                     "ndcOriginalSource": "00228298311",
        //                     "productCodeQualifier": "ND",
        //                     "ourPharmacy": false,
        //                     "ourProvider": false,
        //                     "startDate": "2023-02-13T10:30:00.000+05:30",
        //                     "endDate": "2023-03-10T10:30:00.000+05:30"
        //                 },
        //                 {
        //                     "id": "4962147515760640",
        //                     "created": "2024-01-26T08:36:49.003+05:30",
        //                     "modified": "2024-01-26T08:36:49.785+05:30",
        //                     "patientId": "6007697174429696",
        //                     "classification": "OPIOID",
        //                     "fillDate": "2023-02-06T10:30:00.000+05:30",
        //                     "fillDateString": "Feb 6",
        //                     "productName": "OXYCONTIN, 10 MG, TABLET, FILM COATED, EXTENDED RELEASE",
        //                     "displayName": "OXYCONTIN, 10 MG, TABLET, FILM COAT",
        //                     "strengthDesc": "10 MG",
        //                     "dosage": 10,
        //                     "prescribedQty": 60,
        //                     "prescribedLen": 30,
        //                     "dailyME": 30,
        //                     "writtenDate": "2023-01-14T10:30:00.000+05:30",
        //                     "writtenDateString": "Jan 14",
        //                     "nrCode": "R",
        //                     "refillCount": 0,
        //                     "rxNum": " ",
        //                     "isActive": false,
        //                     "isOurs": false,
        //                     "prescriber": {
        //                         "id": "5435951127986176",
        //                         "created": "2023-04-18T09:38:31.034+05:30",
        //                         "modified": "2023-04-18T09:38:31.034+05:30",
        //                         "firstName": "BELKIS",
        //                         "lastName": "MUELLER",
        //                         "sourceAddress": "",
        //                         "deaNumber": "MH0820820"
        //                     },
        //                     "pharmacy": {
        //                         "id": "5585484709363712",
        //                         "created": "2023-04-18T09:38:22.545+05:30",
        //                         "modified": "2023-04-18T09:38:22.545+05:30",
        //                         "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                         "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                         "location": {
        //                             "id": "6148434662785024",
        //                             "created": "2023-04-18T09:38:22.535+05:30",
        //                             "modified": "2023-04-18T09:38:22.546+05:30",
        //                             "line1": "3402 N Central Ave",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85012",
        //                             "locLat": 33.4879117,
        //                             "locLng": -112.0745667,
        //                             "locSource": "3402 n central ave  phoenix,az 85012"
        //                         },
        //                         "deaNumber": "AW0572518"
        //                     },
        //                     "ndcCode": "59011041010",
        //                     "patientName": "ULA PECK",
        //                     "patientDOB": "02/04/1939",
        //                     "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                     "isExpectedPatient": true,
        //                     "ndcOriginalSource": "59011041010",
        //                     "productCodeQualifier": "ND",
        //                     "ourPharmacy": false,
        //                     "ourProvider": false,
        //                     "startDate": "2023-02-06T10:30:00.000+05:30",
        //                     "endDate": "2023-03-07T10:30:00.000+05:30"
        //                 },
        //                 {
        //                     "id": "5525097469181952",
        //                     "created": "2024-01-26T08:36:49.003+05:30",
        //                     "modified": "2024-01-26T08:36:49.786+05:30",
        //                     "patientId": "6007697174429696",
        //                     "classification": "STIMULANT",
        //                     "fillDate": "2023-02-05T10:30:00.000+05:30",
        //                     "fillDateString": "Feb 5",
        //                     "productName": "DEXTROAMPHETAMINE SACCHARATE, AMPHETAMINE ASPARTATE, DEXTROAMPHETAMINE SULFATE AND AMPHETAMINE SULFA, 5 M",
        //                     "displayName": "DEXTROAMPHETAMINE SACCHARATE, AMPHE",
        //                     "strengthDesc": "5 MG;5 MG;5 MG;5 MG",
        //                     "dosage": 5,
        //                     "prescribedQty": 30,
        //                     "prescribedLen": 30,
        //                     "dailyME": 0,
        //                     "writtenDate": "2022-12-25T10:30:00.000+05:30",
        //                     "writtenDateString": "Dec 25",
        //                     "nrCode": "R",
        //                     "refillCount": 0,
        //                     "rxNum": " ",
        //                     "isActive": false,
        //                     "isOurs": false,
        //                     "prescriber": {
        //                         "id": "4732263686209536",
        //                         "created": "2023-04-18T09:38:31.419+05:30",
        //                         "modified": "2023-04-18T09:38:31.419+05:30",
        //                         "firstName": "MARNA",
        //                         "lastName": "WITT",
        //                         "sourceAddress": "null n 53rd st  phoenix,az 85054",
        //                         "location": {
        //                             "id": "6561851034828800",
        //                             "created": "2023-04-18T09:38:31.412+05:30",
        //                             "modified": "2023-04-18T09:38:31.419+05:30",
        //                             "line1": "null N 53rd St",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85054",
        //                             "locLat": 33.6734909,
        //                             "locLng": -111.9683645,
        //                             "locSource": "null n 53rd st  phoenix,az 85054"
        //                         },
        //                         "deaNumber": "BS0422775"
        //                     },
        //                     "pharmacy": {
        //                         "id": "5585484709363712",
        //                         "created": "2023-04-18T09:38:22.545+05:30",
        //                         "modified": "2023-04-18T09:38:22.545+05:30",
        //                         "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                         "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                         "location": {
        //                             "id": "6148434662785024",
        //                             "created": "2023-04-18T09:38:22.535+05:30",
        //                             "modified": "2023-04-18T09:38:22.546+05:30",
        //                             "line1": "3402 N Central Ave",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85012",
        //                             "locLat": 33.4879117,
        //                             "locLng": -112.0745667,
        //                             "locSource": "3402 n central ave  phoenix,az 85012"
        //                         },
        //                         "deaNumber": "AW0572518"
        //                     },
        //                     "ndcCode": "00555097302",
        //                     "patientName": "ULA PECK",
        //                     "patientDOB": "02/04/1939",
        //                     "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                     "isExpectedPatient": true,
        //                     "ndcOriginalSource": "00555097302",
        //                     "productCodeQualifier": "ND",
        //                     "ourPharmacy": false,
        //                     "ourProvider": false,
        //                     "startDate": "2023-02-05T10:30:00.000+05:30",
        //                     "endDate": "2023-03-06T10:30:00.000+05:30"
        //                 },
        //                 {
        //                     "id": "4610303794872320",
        //                     "created": "2024-01-26T08:36:49.003+05:30",
        //                     "modified": "2024-01-26T08:36:49.787+05:30",
        //                     "patientId": "6007697174429696",
        //                     "classification": "STIMULANT",
        //                     "fillDate": "2023-02-05T10:30:00.000+05:30",
        //                     "fillDateString": "Feb 5",
        //                     "productName": "VYVANSE, 50 MG, CAPSULE",
        //                     "displayName": "VYVANSE, 50 MG, CAPSULE",
        //                     "strengthDesc": "50 MG",
        //                     "dosage": 50,
        //                     "prescribedQty": 30,
        //                     "prescribedLen": 30,
        //                     "dailyME": 0,
        //                     "writtenDate": "2022-12-25T10:30:00.000+05:30",
        //                     "writtenDateString": "Dec 25",
        //                     "nrCode": "R",
        //                     "refillCount": 0,
        //                     "rxNum": " ",
        //                     "isActive": false,
        //                     "isOurs": false,
        //                     "prescriber": {
        //                         "id": "5295213639630848",
        //                         "created": "2023-04-18T09:38:31.720+05:30",
        //                         "modified": "2023-04-18T09:38:31.720+05:30",
        //                         "firstName": "MARNA",
        //                         "lastName": "WITT",
        //                         "sourceAddress": "20855 n 53rd st  phoenix,az 85054",
        //                         "location": {
        //                             "id": "5858163593052160",
        //                             "created": "2023-04-18T09:38:31.711+05:30",
        //                             "modified": "2023-04-18T09:38:31.720+05:30",
        //                             "line1": "20855 N 53rd St",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85054",
        //                             "locLat": 33.6755749,
        //                             "locLng": -111.9665016,
        //                             "locSource": "20855 n 53rd st  phoenix,az 85054"
        //                         },
        //                         "deaNumber": "BS0422775"
        //                     },
        //                     "pharmacy": {
        //                         "id": "5585484709363712",
        //                         "created": "2023-04-18T09:38:22.545+05:30",
        //                         "modified": "2023-04-18T09:38:22.545+05:30",
        //                         "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                         "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                         "location": {
        //                             "id": "6148434662785024",
        //                             "created": "2023-04-18T09:38:22.535+05:30",
        //                             "modified": "2023-04-18T09:38:22.546+05:30",
        //                             "line1": "3402 N Central Ave",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85012",
        //                             "locLat": 33.4879117,
        //                             "locLng": -112.0745667,
        //                             "locSource": "3402 n central ave  phoenix,az 85012"
        //                         },
        //                         "deaNumber": "AW0572518"
        //                     },
        //                     "ndcCode": "59417010510",
        //                     "patientName": "ULA PECK",
        //                     "patientDOB": "02/04/1939",
        //                     "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                     "isExpectedPatient": true,
        //                     "ndcOriginalSource": "59417010510",
        //                     "productCodeQualifier": "ND",
        //                     "ourPharmacy": false,
        //                     "ourProvider": false,
        //                     "startDate": "2023-02-05T10:30:00.000+05:30",
        //                     "endDate": "2023-03-06T10:30:00.000+05:30"
        //                 },
        //                 {
        //                     "id": "5736203701714944",
        //                     "created": "2024-01-26T08:36:49.003+05:30",
        //                     "modified": "2024-01-26T08:36:49.788+05:30",
        //                     "patientId": "6007697174429696",
        //                     "classification": "OPIOID",
        //                     "fillDate": "2023-01-29T10:30:00.000+05:30",
        //                     "fillDateString": "Jan 29",
        //                     "productName": "OXYCODONE AND ACETAMINOPHEN, 325 MG;5 MG, TABLET",
        //                     "displayName": "OXYCODONE AND ACETAMINOPHEN, 325 MG",
        //                     "strengthDesc": "325 MG;5 MG",
        //                     "dosage": 5,
        //                     "prescribedQty": 20,
        //                     "prescribedLen": 5,
        //                     "dailyME": 30,
        //                     "writtenDate": "2023-01-29T10:30:00.000+05:30",
        //                     "writtenDateString": "Jan 29",
        //                     "nrCode": "R",
        //                     "refillCount": 0,
        //                     "rxNum": " ",
        //                     "isActive": false,
        //                     "isOurs": false,
        //                     "prescriber": {
        //                         "id": "5013738662920192",
        //                         "created": "2023-04-18T09:38:32.010+05:30",
        //                         "modified": "2023-04-18T09:38:32.010+05:30",
        //                         "firstName": "SHERISE",
        //                         "lastName": "ALSTON",
        //                         "sourceAddress": "1707 w camelback rd  phoenix,az 85015",
        //                         "location": {
        //                             "id": "6421113546473472",
        //                             "created": "2023-04-18T09:38:32.003+05:30",
        //                             "modified": "2023-04-18T09:38:32.011+05:30",
        //                             "line1": "1707 W Camelback Rd",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85015",
        //                             "locLat": 33.509006,
        //                             "locLng": -112.096277,
        //                             "locSource": "1707 w camelback rd  phoenix,az 85015"
        //                         },
        //                         "deaNumber": "FR4679734"
        //                     },
        //                     "pharmacy": {
        //                         "id": "5585484709363712",
        //                         "created": "2023-04-18T09:38:22.545+05:30",
        //                         "modified": "2023-04-18T09:38:22.545+05:30",
        //                         "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                         "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                         "location": {
        //                             "id": "6148434662785024",
        //                             "created": "2023-04-18T09:38:22.535+05:30",
        //                             "modified": "2023-04-18T09:38:22.546+05:30",
        //                             "line1": "3402 N Central Ave",
        //                             "city": "Phoenix",
        //                             "state": "AZ",
        //                             "zip": "85012",
        //                             "locLat": 33.4879117,
        //                             "locLng": -112.0745667,
        //                             "locSource": "3402 n central ave  phoenix,az 85012"
        //                         },
        //                         "deaNumber": "AW0572518"
        //                     },
        //                     "ndcCode": "00228298150",
        //                     "patientName": "ULA PECK",
        //                     "patientDOB": "02/04/1939",
        //                     "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                     "isExpectedPatient": true,
        //                     "ndcOriginalSource": "00228298150",
        //                     "productCodeQualifier": "ND",
        //                     "ourPharmacy": false,
        //                     "ourProvider": false,
        //                     "startDate": "2023-01-29T10:30:00.000+05:30",
        //                     "endDate": "2023-02-02T10:30:00.000+05:30"
        //                 }
        //             ],
        //             "alerts": [
        //                 {
        //                     "id": "4522342864650240",
        //                     "created": "2024-01-26T08:36:49.498+05:30",
        //                     "modified": "2024-01-26T08:36:49.498+05:30",
        //                     "patientId": "6007697174429696",
        //                     "pmpReportId": "5313991236648960",
        //                     "alertType": "WriteFillGap",
        //                     "priority": 800,
        //                     "narrative": " on OXYCODONE AND ACETAMINOPHEN, 10 MG; (105@10 MG;325 MG ) from 10/29/2023 to 11/04/2023 (6 days)",
        //                     "typeString": "W/F Gap",
        //                     "prescriptions": [
        //                         {
        //                             "id": "6686181748113408",
        //                             "created": "2024-01-26T08:36:48.996+05:30",
        //                             "modified": "2024-01-26T08:36:49.760+05:30",
        //                             "patientId": "6007697174429696",
        //                             "classification": "OPIOID",
        //                             "fillDate": "2023-11-04T10:30:00.000+05:30",
        //                             "fillDateString": "Nov 4",
        //                             "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                             "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                             "strengthDesc": "10 MG;325 MG",
        //                             "dosage": 10,
        //                             "prescribedQty": 105,
        //                             "prescribedLen": 30,
        //                             "dailyME": 53,
        //                             "writtenDate": "2023-10-29T10:30:00.000+05:30",
        //                             "writtenDateString": "Oct 29",
        //                             "nrCode": "R",
        //                             "refillCount": 0,
        //                             "rxNum": " ",
        //                             "isActive": false,
        //                             "isOurs": false,
        //                             "prescriber": {
        //                                 "id": "6113250290696192",
        //                                 "created": "2023-04-18T09:38:24.873+05:30",
        //                                 "modified": "2023-04-18T09:38:24.873+05:30",
        //                                 "firstName": "MARQUITTA",
        //                                 "lastName": "BROCK",
        //                                 "sourceAddress": "3752 e indian school rd  phoenix,az 85018",
        //                                 "location": {
        //                                     "id": "4987350383853568",
        //                                     "created": "2023-04-18T09:38:24.866+05:30",
        //                                     "modified": "2023-04-18T09:38:24.874+05:30",
        //                                     "line1": "3752 E Indian School Rd",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85018",
        //                                     "locLat": 33.4954195,
        //                                     "locLng": -112.0000832,
        //                                     "locSource": "3752 e indian school rd  phoenix,az 85018"
        //                                 },
        //                                 "deaNumber": "MP1714460"
        //                             },
        //                             "pharmacy": {
        //                                 "id": "5585484709363712",
        //                                 "created": "2023-04-18T09:38:22.545+05:30",
        //                                 "modified": "2023-04-18T09:38:22.545+05:30",
        //                                 "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                                 "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                                 "location": {
        //                                     "id": "6148434662785024",
        //                                     "created": "2023-04-18T09:38:22.535+05:30",
        //                                     "modified": "2023-04-18T09:38:22.546+05:30",
        //                                     "line1": "3402 N Central Ave",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85012",
        //                                     "locLat": 33.4879117,
        //                                     "locLng": -112.0745667,
        //                                     "locSource": "3402 n central ave  phoenix,az 85012"
        //                                 },
        //                                 "deaNumber": "AW0572518"
        //                             },
        //                             "ndcCode": "00228298311",
        //                             "patientName": "ULA PECK",
        //                             "patientDOB": "02/04/1939",
        //                             "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                             "isExpectedPatient": true,
        //                             "ndcOriginalSource": "00228298311",
        //                             "productCodeQualifier": "ND",
        //                             "ourPharmacy": false,
        //                             "ourProvider": false,
        //                             "startDate": "2023-11-04T10:30:00.000+05:30",
        //                             "endDate": "2023-12-03T10:30:00.000+05:30"
        //                         }
        //                     ],
        //                     "prescriptionIds": [
        //                         "6686181748113408"
        //                     ],
        //                     "startDate": "2023-10-29T10:30:00.000+05:30",
        //                     "endDate": "2023-11-04T10:30:00.000+05:30",
        //                     "alertTypeString": "WriteFillGap"
        //                 },
        //                 {
        //                     "id": "4663080353005568",
        //                     "created": "2024-01-26T08:36:49.499+05:30",
        //                     "modified": "2024-01-26T08:36:49.499+05:30",
        //                     "patientId": "6007697174429696",
        //                     "pmpReportId": "5313991236648960",
        //                     "description": "OPIOID : 113",
        //                     "alertType": "HighDose",
        //                     "priority": 200,
        //                     "narrative": " from 10/28/2023 to 10/30/2023",
        //                     "typeString": "High Dose",
        //                     "prescriptions": [
        //                         {
        //                             "id": "4539935050694656",
        //                             "created": "2024-01-26T08:36:48.997+05:30",
        //                             "modified": "2024-01-26T08:36:49.761+05:30",
        //                             "patientId": "6007697174429696",
        //                             "classification": "OPIOID",
        //                             "fillDate": "2023-10-05T10:30:00.000+05:30",
        //                             "fillDateString": "Oct 5",
        //                             "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                             "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                             "strengthDesc": "10 MG;325 MG",
        //                             "dosage": 10,
        //                             "prescribedQty": 105,
        //                             "prescribedLen": 30,
        //                             "dailyME": 53,
        //                             "writtenDate": "2023-10-01T10:30:00.000+05:30",
        //                             "writtenDateString": "Oct 1",
        //                             "nrCode": "R",
        //                             "refillCount": 0,
        //                             "rxNum": " ",
        //                             "isActive": false,
        //                             "isOurs": false,
        //                             "prescriber": {
        //                                 "id": "6676200244117504",
        //                                 "created": "2023-04-18T09:38:25.169+05:30",
        //                                 "modified": "2023-04-18T09:38:25.169+05:30",
        //                                 "firstName": "MARQUITTA",
        //                                 "lastName": "BROCK",
        //                                 "sourceAddress": "3749-3799 e indian school rd  phoenix,az 85018",
        //                                 "location": {
        //                                     "id": "5550300337274880",
        //                                     "created": "2023-04-18T09:38:25.162+05:30",
        //                                     "modified": "2023-04-18T09:38:25.169+05:30",
        //                                     "line1": "3749 E Indian School Rd",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85018",
        //                                     "locLat": 33.49479520000001,
        //                                     "locLng": -112.0001152,
        //                                     "locSource": "3749-3799 e indian school rd  phoenix,az 85018"
        //                                 },
        //                                 "deaNumber": "MP1714460"
        //                             },
        //                             "pharmacy": {
        //                                 "id": "5585484709363712",
        //                                 "created": "2023-04-18T09:38:22.545+05:30",
        //                                 "modified": "2023-04-18T09:38:22.545+05:30",
        //                                 "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                                 "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                                 "location": {
        //                                     "id": "6148434662785024",
        //                                     "created": "2023-04-18T09:38:22.535+05:30",
        //                                     "modified": "2023-04-18T09:38:22.546+05:30",
        //                                     "line1": "3402 N Central Ave",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85012",
        //                                     "locLat": 33.4879117,
        //                                     "locLng": -112.0745667,
        //                                     "locSource": "3402 n central ave  phoenix,az 85012"
        //                                 },
        //                                 "deaNumber": "AW0572518"
        //                             },
        //                             "ndcCode": "00228298311",
        //                             "patientName": "ULA PECK",
        //                             "patientDOB": "02/04/1939",
        //                             "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                             "isExpectedPatient": true,
        //                             "ndcOriginalSource": "00228298311",
        //                             "productCodeQualifier": "ND",
        //                             "ourPharmacy": false,
        //                             "ourProvider": false,
        //                             "startDate": "2023-10-05T10:30:00.000+05:30",
        //                             "endDate": "2023-11-03T10:30:00.000+05:30"
        //                         },
        //                         {
        //                             "id": "5665834957537280",
        //                             "created": "2024-01-26T08:36:48.997+05:30",
        //                             "modified": "2024-01-26T08:36:49.761+05:30",
        //                             "patientId": "6007697174429696",
        //                             "classification": "OPIOID",
        //                             "fillDate": "2023-10-01T10:30:00.000+05:30",
        //                             "fillDateString": "Oct 1",
        //                             "productName": "OPANA ER, 10 MG, TABLET, EXTENDED RELEASE",
        //                             "displayName": "OPANA ER, 10 MG, TABLET, EXTENDED R",
        //                             "strengthDesc": "10 MG",
        //                             "dosage": 10,
        //                             "prescribedQty": 60,
        //                             "prescribedLen": 30,
        //                             "dailyME": 60,
        //                             "writtenDate": "2023-10-01T10:30:00.000+05:30",
        //                             "writtenDateString": "Oct 1",
        //                             "nrCode": "R",
        //                             "refillCount": 0,
        //                             "rxNum": " ",
        //                             "isActive": false,
        //                             "isOurs": false,
        //                             "prescriber": {
        //                                 "id": "5761406569807872",
        //                                 "created": "2023-04-18T09:38:25.451+05:30",
        //                                 "modified": "2023-04-18T09:38:25.451+05:30",
        //                                 "firstName": "MADIE",
        //                                 "lastName": "WHITNEY",
        //                                 "sourceAddress": "3380 n scottsdale rd  scottsdale,az 85251",
        //                                 "location": {
        //                                     "id": "4635506662965248",
        //                                     "created": "2023-04-18T09:38:25.444+05:30",
        //                                     "modified": "2023-04-18T09:38:25.451+05:30",
        //                                     "line1": "3380 N Scottsdale Rd",
        //                                     "city": "Scottsdale",
        //                                     "state": "AZ",
        //                                     "zip": "85251",
        //                                     "locLat": 33.48733199999999,
        //                                     "locLng": -111.9270596,
        //                                     "locSource": "3380 n scottsdale rd  scottsdale,az 85251"
        //                                 },
        //                                 "deaNumber": "BD7113234"
        //                             },
        //                             "pharmacy": {
        //                                 "id": "6324356523229184",
        //                                 "created": "2023-04-18T09:38:25.757+05:30",
        //                                 "modified": "2023-04-18T09:38:25.757+05:30",
        //                                 "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                                 "sourceAddress": "5895 w. peoria avenue  glendale,az 85302",
        //                                 "location": {
        //                                     "id": "5198456616386560",
        //                                     "created": "2023-04-18T09:38:25.748+05:30",
        //                                     "modified": "2023-04-18T09:38:25.757+05:30",
        //                                     "line1": "5895 W Peoria Ave",
        //                                     "city": "Glendale",
        //                                     "state": "AZ",
        //                                     "zip": "85302",
        //                                     "locLat": 33.5812761,
        //                                     "locLng": -112.1854129,
        //                                     "locSource": "5895 w. peoria avenue  glendale,az 85302"
        //                                 },
        //                                 "deaNumber": "BW5452228"
        //                             },
        //                             "ndcCode": "63481081460",
        //                             "patientName": "ULA PECK",
        //                             "patientDOB": "02/04/1939",
        //                             "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                             "isExpectedPatient": true,
        //                             "ndcOriginalSource": "63481081460",
        //                             "productCodeQualifier": "ND",
        //                             "ourPharmacy": false,
        //                             "ourProvider": false,
        //                             "startDate": "2023-10-01T10:30:00.000+05:30",
        //                             "endDate": "2023-10-30T10:30:00.000+05:30"
        //                         }
        //                     ],
        //                     "prescriptionIds": [
        //                         "4539935050694656",
        //                         "5665834957537280"
        //                     ],
        //                     "startDate": "2023-10-28T00:00:00.000+05:30",
        //                     "endDate": "2023-10-30T00:00:00.000+05:30",
        //                     "alertTypeString": "HighDose"
        //                 },
        //                 {
        //                     "id": "4803817841360896",
        //                     "created": "2024-01-26T08:36:49.499+05:30",
        //                     "modified": "2024-01-26T08:36:49.499+05:30",
        //                     "patientId": "6007697174429696",
        //                     "pmpReportId": "5313991236648960",
        //                     "description": "Prescriber: ,  with DEA: BC7786140",
        //                     "alertType": "NotOurPrescription",
        //                     "alertSubtype": "Prescriber",
        //                     "priority": 100,
        //                     "narrative": "Prescriber: ,  with DEA: BC7786140 for OXYCODONE HYDROCHLORIDE, 5 MG, TABL",
        //                     "typeString": "Not Our Prescriber",
        //                     "prescriptions": [
        //                         {
        //                             "id": "5278806864560128",
        //                             "created": "2024-01-26T08:36:48.994+05:30",
        //                             "modified": "2024-01-26T08:36:49.756+05:30",
        //                             "patientId": "6007697174429696",
        //                             "classification": "OPIOID",
        //                             "fillDate": "2023-12-30T10:30:00.000+05:30",
        //                             "fillDateString": "Dec 30",
        //                             "productName": "OXYCODONE HYDROCHLORIDE, 5 MG, TABLET",
        //                             "displayName": "OXYCODONE HYDROCHLORIDE, 5 MG, TABL",
        //                             "strengthDesc": "5 MG",
        //                             "dosage": 5,
        //                             "prescribedQty": 60,
        //                             "prescribedLen": 2,
        //                             "dailyME": 225,
        //                             "writtenDate": "2023-12-26T10:30:00.000+05:30",
        //                             "writtenDateString": "Dec 26",
        //                             "nrCode": "R",
        //                             "refillCount": 0,
        //                             "rxNum": " ",
        //                             "isActive": false,
        //                             "isOurs": false,
        //                             "prescriber": {
        //                                 "id": "5128087872208896",
        //                                 "created": "2023-04-18T09:38:23.147+05:30",
        //                                 "modified": "2023-04-18T09:38:23.147+05:30",
        //                                 "firstName": "",
        //                                 "lastName": "",
        //                                 "sourceAddress": "5022 n 17th ave  phoenix,az 85015",
        //                                 "location": {
        //                                     "id": "5691037825630208",
        //                                     "created": "2023-04-18T09:38:23.141+05:30",
        //                                     "modified": "2023-04-18T09:38:23.148+05:30",
        //                                     "line1": "5022 N 17th Ave",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85015",
        //                                     "locLat": 33.5106346,
        //                                     "locLng": -112.0963149,
        //                                     "locSource": "5022 n 17th ave  phoenix,az 85015"
        //                                 },
        //                                 "deaNumber": "BC7786140"
        //                             },
        //                             "pharmacy": {
        //                                 "id": "5585484709363712",
        //                                 "created": "2023-04-18T09:38:22.545+05:30",
        //                                 "modified": "2023-04-18T09:38:22.545+05:30",
        //                                 "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                                 "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                                 "location": {
        //                                     "id": "6148434662785024",
        //                                     "created": "2023-04-18T09:38:22.535+05:30",
        //                                     "modified": "2023-04-18T09:38:22.546+05:30",
        //                                     "line1": "3402 N Central Ave",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85012",
        //                                     "locLat": 33.4879117,
        //                                     "locLng": -112.0745667,
        //                                     "locSource": "3402 n central ave  phoenix,az 85012"
        //                                 },
        //                                 "deaNumber": "AW0572518"
        //                             },
        //                             "ndcCode": "00406055201",
        //                             "patientName": "ULA PECK",
        //                             "patientDOB": "02/04/1939",
        //                             "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                             "isExpectedPatient": true,
        //                             "ndcOriginalSource": "00406055201",
        //                             "productCodeQualifier": "ND",
        //                             "ourPharmacy": false,
        //                             "ourProvider": false,
        //                             "startDate": "2023-12-30T10:30:00.000+05:30",
        //                             "endDate": "2023-12-31T10:30:00.000+05:30"
        //                         }
        //                     ],
        //                     "prescriptionIds": [
        //                         "5278806864560128"
        //                     ],
        //                     "startDate": "2023-12-26T10:30:00.000+05:30",
        //                     "endDate": "2023-12-30T10:30:00.000+05:30",
        //                     "alertTypeString": "NotOurPrescription",
        //                     "alertSubtypeString": "Prescriber"
        //                 },
        //                 {
        //                     "id": "5032516259938304",
        //                     "created": "2024-01-26T08:36:49.498+05:30",
        //                     "modified": "2024-01-26T08:36:49.498+05:30",
        //                     "patientId": "6007697174429696",
        //                     "pmpReportId": "5313991236648960",
        //                     "alertType": "WriteFillGap",
        //                     "priority": 800,
        //                     "narrative": " on OXYCODONE AND ACETAMINOPHEN, 10 MG; (105@10 MG;325 MG ) from 12/23/2023 to 01/05/2024 (13 days)",
        //                     "typeString": "W/F Gap",
        //                     "prescriptions": [
        //                         {
        //                             "id": "5841756817981440",
        //                             "created": "2024-01-26T08:36:48.994+05:30",
        //                             "modified": "2024-01-26T08:36:49.755+05:30",
        //                             "patientId": "6007697174429696",
        //                             "classification": "OPIOID",
        //                             "fillDate": "2024-01-05T10:30:00.000+05:30",
        //                             "fillDateString": "Jan 5",
        //                             "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                             "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                             "strengthDesc": "10 MG;325 MG",
        //                             "dosage": 10,
        //                             "prescribedQty": 105,
        //                             "prescribedLen": 30,
        //                             "dailyME": 53,
        //                             "writtenDate": "2023-12-23T10:30:00.000+05:30",
        //                             "writtenDateString": "Dec 23",
        //                             "nrCode": "R",
        //                             "refillCount": 0,
        //                             "rxNum": " ",
        //                             "isActive": true,
        //                             "isOurs": false,
        //                             "prescriber": {
        //                                 "id": "4565137918787584",
        //                                 "created": "2023-04-18T09:38:22.853+05:30",
        //                                 "modified": "2023-04-18T09:38:22.853+05:30",
        //                                 "firstName": "TAWNYA",
        //                                 "lastName": "NUNEZ",
        //                                 "sourceAddress": "3815 n brown ave  scottsdale,az 85251",
        //                                 "location": {
        //                                     "id": "6711384616206336",
        //                                     "created": "2023-04-18T09:38:22.846+05:30",
        //                                     "modified": "2023-04-18T09:38:22.854+05:30",
        //                                     "line1": "3815 N Brown Ave",
        //                                     "city": "Scottsdale",
        //                                     "state": "AZ",
        //                                     "zip": "85251",
        //                                     "locLat": 33.4918372,
        //                                     "locLng": -111.9242563,
        //                                     "locSource": "3815 n brown ave  scottsdale,az 85251"
        //                                 },
        //                                 "deaNumber": "MH3849176"
        //                             },
        //                             "pharmacy": {
        //                                 "id": "5585484709363712",
        //                                 "created": "2023-04-18T09:38:22.545+05:30",
        //                                 "modified": "2023-04-18T09:38:22.545+05:30",
        //                                 "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                                 "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                                 "location": {
        //                                     "id": "6148434662785024",
        //                                     "created": "2023-04-18T09:38:22.535+05:30",
        //                                     "modified": "2023-04-18T09:38:22.546+05:30",
        //                                     "line1": "3402 N Central Ave",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85012",
        //                                     "locLat": 33.4879117,
        //                                     "locLng": -112.0745667,
        //                                     "locSource": "3402 n central ave  phoenix,az 85012"
        //                                 },
        //                                 "deaNumber": "AW0572518"
        //                             },
        //                             "ndcCode": "00228298311",
        //                             "patientName": "ULA PECK",
        //                             "patientDOB": "02/04/1939",
        //                             "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                             "isExpectedPatient": true,
        //                             "ndcOriginalSource": "00228298311",
        //                             "productCodeQualifier": "ND",
        //                             "ourPharmacy": false,
        //                             "ourProvider": false,
        //                             "startDate": "2024-01-05T10:30:00.000+05:30",
        //                             "endDate": "2024-02-03T10:30:00.000+05:30"
        //                         }
        //                     ],
        //                     "prescriptionIds": [
        //                         "5841756817981440"
        //                     ],
        //                     "startDate": "2023-12-23T10:30:00.000+05:30",
        //                     "endDate": "2024-01-05T10:30:00.000+05:30",
        //                     "alertTypeString": "WriteFillGap"
        //                 },
        //                 {
        //                     "id": "5085292818071552",
        //                     "created": "2024-01-26T08:36:49.498+05:30",
        //                     "modified": "2024-01-26T08:36:49.498+05:30",
        //                     "patientId": "6007697174429696",
        //                     "pmpReportId": "5313991236648960",
        //                     "description": "Prescriber: WITT, MARNA with DEA: BS0422775",
        //                     "alertType": "NotOurPrescription",
        //                     "alertSubtype": "Prescriber",
        //                     "priority": 100,
        //                     "narrative": "Prescriber: WITT, MARNA with DEA: BS0422775 for 2 Prescriptions.",
        //                     "typeString": "Not Our Prescriber",
        //                     "prescriptions": [
        //                         {
        //                             "id": "4997331887849472",
        //                             "created": "2024-01-26T08:36:48.995+05:30",
        //                             "modified": "2024-01-26T08:36:49.758+05:30",
        //                             "patientId": "6007697174429696",
        //                             "classification": "STIMULANT",
        //                             "fillDate": "2023-11-15T10:30:00.000+05:30",
        //                             "fillDateString": "Nov 15",
        //                             "productName": "VYVANSE, 50 MG, CAPSULE",
        //                             "displayName": "VYVANSE, 50 MG, CAPSULE",
        //                             "strengthDesc": "50 MG",
        //                             "dosage": 50,
        //                             "prescribedQty": 30,
        //                             "prescribedLen": 30,
        //                             "dailyME": 0,
        //                             "writtenDate": "2023-09-22T10:30:00.000+05:30",
        //                             "writtenDateString": "Sep 22",
        //                             "nrCode": "R",
        //                             "refillCount": 0,
        //                             "rxNum": " ",
        //                             "isActive": false,
        //                             "isOurs": false,
        //                             "prescriber": {
        //                                 "id": "6535462755762176",
        //                                 "created": "2023-04-18T09:38:23.938+05:30",
        //                                 "modified": "2023-04-18T09:38:23.938+05:30",
        //                                 "firstName": "MARNA",
        //                                 "lastName": "WITT",
        //                                 "sourceAddress": "718 e union hills dr  phoenix,az 85024",
        //                                 "location": {
        //                                     "id": "5409562848919552",
        //                                     "created": "2023-04-18T09:38:23.930+05:30",
        //                                     "modified": "2023-04-18T09:38:23.939+05:30",
        //                                     "line1": "718 E Union Hills Dr",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85024",
        //                                     "locLat": 33.6561533,
        //                                     "locLng": -112.0637055,
        //                                     "locSource": "718 e union hills dr  phoenix,az 85024"
        //                                 },
        //                                 "deaNumber": "BS0422775"
        //                             },
        //                             "pharmacy": {
        //                                 "id": "5585484709363712",
        //                                 "created": "2023-04-18T09:38:22.545+05:30",
        //                                 "modified": "2023-04-18T09:38:22.545+05:30",
        //                                 "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                                 "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                                 "location": {
        //                                     "id": "6148434662785024",
        //                                     "created": "2023-04-18T09:38:22.535+05:30",
        //                                     "modified": "2023-04-18T09:38:22.546+05:30",
        //                                     "line1": "3402 N Central Ave",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85012",
        //                                     "locLat": 33.4879117,
        //                                     "locLng": -112.0745667,
        //                                     "locSource": "3402 n central ave  phoenix,az 85012"
        //                                 },
        //                                 "deaNumber": "AW0572518"
        //                             },
        //                             "ndcCode": "59417010510",
        //                             "patientName": "ULA PECK",
        //                             "patientDOB": "02/04/1939",
        //                             "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                             "isExpectedPatient": true,
        //                             "ndcOriginalSource": "59417010510",
        //                             "productCodeQualifier": "ND",
        //                             "ourPharmacy": false,
        //                             "ourProvider": false,
        //                             "startDate": "2023-11-15T10:30:00.000+05:30",
        //                             "endDate": "2023-12-14T10:30:00.000+05:30"
        //                         },
        //                         {
        //                             "id": "6123231794692096",
        //                             "created": "2024-01-26T08:36:48.996+05:30",
        //                             "modified": "2024-01-26T08:36:49.759+05:30",
        //                             "patientId": "6007697174429696",
        //                             "classification": "STIMULANT",
        //                             "fillDate": "2023-11-14T10:30:00.000+05:30",
        //                             "fillDateString": "Nov 14",
        //                             "productName": "DEXTROAMPHETAMINE SACCHARATE, AMPHETAMINE ASPARTATE, DEXTROAMPHETAMINE SULFATE AND AMPHETAMINE SULFA, 5 M",
        //                             "displayName": "DEXTROAMPHETAMINE SACCHARATE, AMPHE",
        //                             "strengthDesc": "5 MG;5 MG;5 MG;5 MG",
        //                             "dosage": 5,
        //                             "prescribedQty": 30,
        //                             "prescribedLen": 30,
        //                             "dailyME": 0,
        //                             "writtenDate": "2023-09-22T10:30:00.000+05:30",
        //                             "writtenDateString": "Sep 22",
        //                             "nrCode": "R",
        //                             "refillCount": 0,
        //                             "rxNum": " ",
        //                             "isActive": false,
        //                             "isOurs": false,
        //                             "prescriber": {
        //                                 "id": "5831775313985536",
        //                                 "created": "2023-04-18T09:38:24.255+05:30",
        //                                 "modified": "2023-04-18T09:38:24.255+05:30",
        //                                 "firstName": "MARNA",
        //                                 "lastName": "WITT",
        //                                 "sourceAddress": "765 e rosemonte dr  phoenix,az 85024",
        //                                 "location": {
        //                                     "id": "4705875407142912",
        //                                     "created": "2023-04-18T09:38:24.246+05:30",
        //                                     "modified": "2023-04-18T09:38:24.255+05:30",
        //                                     "line1": "765 E Rosemonte Dr",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85024",
        //                                     "locLat": 33.6567816,
        //                                     "locLng": -112.0631233,
        //                                     "locSource": "765 e rosemonte dr  phoenix,az 85024"
        //                                 },
        //                                 "deaNumber": "BS0422775"
        //                             },
        //                             "pharmacy": {
        //                                 "id": "5585484709363712",
        //                                 "created": "2023-04-18T09:38:22.545+05:30",
        //                                 "modified": "2023-04-18T09:38:22.545+05:30",
        //                                 "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                                 "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                                 "location": {
        //                                     "id": "6148434662785024",
        //                                     "created": "2023-04-18T09:38:22.535+05:30",
        //                                     "modified": "2023-04-18T09:38:22.546+05:30",
        //                                     "line1": "3402 N Central Ave",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85012",
        //                                     "locLat": 33.4879117,
        //                                     "locLng": -112.0745667,
        //                                     "locSource": "3402 n central ave  phoenix,az 85012"
        //                                 },
        //                                 "deaNumber": "AW0572518"
        //                             },
        //                             "ndcCode": "00555097302",
        //                             "patientName": "ULA PECK",
        //                             "patientDOB": "02/04/1939",
        //                             "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                             "isExpectedPatient": true,
        //                             "ndcOriginalSource": "00555097302",
        //                             "productCodeQualifier": "ND",
        //                             "ourPharmacy": false,
        //                             "ourProvider": false,
        //                             "startDate": "2023-11-14T10:30:00.000+05:30",
        //                             "endDate": "2023-12-13T10:30:00.000+05:30"
        //                         }
        //                     ],
        //                     "prescriptionIds": [
        //                         "4997331887849472",
        //                         "6123231794692096"
        //                     ],
        //                     "startDate": "2023-09-22T10:30:00.000+05:30",
        //                     "endDate": "2023-11-15T10:30:00.000+05:30",
        //                     "alertTypeString": "NotOurPrescription",
        //                     "alertSubtypeString": "Prescriber"
        //                 },
        //                 {
        //                     "id": "5226030306426880",
        //                     "created": "2024-01-26T08:36:49.499+05:30",
        //                     "modified": "2024-01-26T08:36:49.499+05:30",
        //                     "patientId": "6007697174429696",
        //                     "pmpReportId": "5313991236648960",
        //                     "alertType": "MultiplePrescribers",
        //                     "alertSubtype": "Opioid",
        //                     "priority": 400,
        //                     "narrative": " (Opioid) from 12/30/2023 to 12/31/2023",
        //                     "typeString": "Multiple Prescribers",
        //                     "prescriptions": [
        //                         {
        //                             "id": "5278806864560128",
        //                             "created": "2024-01-26T08:36:48.994+05:30",
        //                             "modified": "2024-01-26T08:36:49.756+05:30",
        //                             "patientId": "6007697174429696",
        //                             "classification": "OPIOID",
        //                             "fillDate": "2023-12-30T10:30:00.000+05:30",
        //                             "fillDateString": "Dec 30",
        //                             "productName": "OXYCODONE HYDROCHLORIDE, 5 MG, TABLET",
        //                             "displayName": "OXYCODONE HYDROCHLORIDE, 5 MG, TABL",
        //                             "strengthDesc": "5 MG",
        //                             "dosage": 5,
        //                             "prescribedQty": 60,
        //                             "prescribedLen": 2,
        //                             "dailyME": 225,
        //                             "writtenDate": "2023-12-26T10:30:00.000+05:30",
        //                             "writtenDateString": "Dec 26",
        //                             "nrCode": "R",
        //                             "refillCount": 0,
        //                             "rxNum": " ",
        //                             "isActive": false,
        //                             "isOurs": false,
        //                             "prescriber": {
        //                                 "id": "5128087872208896",
        //                                 "created": "2023-04-18T09:38:23.147+05:30",
        //                                 "modified": "2023-04-18T09:38:23.147+05:30",
        //                                 "firstName": "",
        //                                 "lastName": "",
        //                                 "sourceAddress": "5022 n 17th ave  phoenix,az 85015",
        //                                 "location": {
        //                                     "id": "5691037825630208",
        //                                     "created": "2023-04-18T09:38:23.141+05:30",
        //                                     "modified": "2023-04-18T09:38:23.148+05:30",
        //                                     "line1": "5022 N 17th Ave",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85015",
        //                                     "locLat": 33.5106346,
        //                                     "locLng": -112.0963149,
        //                                     "locSource": "5022 n 17th ave  phoenix,az 85015"
        //                                 },
        //                                 "deaNumber": "BC7786140"
        //                             },
        //                             "pharmacy": {
        //                                 "id": "5585484709363712",
        //                                 "created": "2023-04-18T09:38:22.545+05:30",
        //                                 "modified": "2023-04-18T09:38:22.545+05:30",
        //                                 "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                                 "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                                 "location": {
        //                                     "id": "6148434662785024",
        //                                     "created": "2023-04-18T09:38:22.535+05:30",
        //                                     "modified": "2023-04-18T09:38:22.546+05:30",
        //                                     "line1": "3402 N Central Ave",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85012",
        //                                     "locLat": 33.4879117,
        //                                     "locLng": -112.0745667,
        //                                     "locSource": "3402 n central ave  phoenix,az 85012"
        //                                 },
        //                                 "deaNumber": "AW0572518"
        //                             },
        //                             "ndcCode": "00406055201",
        //                             "patientName": "ULA PECK",
        //                             "patientDOB": "02/04/1939",
        //                             "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                             "isExpectedPatient": true,
        //                             "ndcOriginalSource": "00406055201",
        //                             "productCodeQualifier": "ND",
        //                             "ourPharmacy": false,
        //                             "ourProvider": false,
        //                             "startDate": "2023-12-30T10:30:00.000+05:30",
        //                             "endDate": "2023-12-31T10:30:00.000+05:30"
        //                         },
        //                         {
        //                             "id": "6404706771402752",
        //                             "created": "2024-01-26T08:36:48.995+05:30",
        //                             "modified": "2024-01-26T08:36:49.757+05:30",
        //                             "patientId": "6007697174429696",
        //                             "classification": "OPIOID",
        //                             "fillDate": "2023-12-04T10:30:00.000+05:30",
        //                             "fillDateString": "Dec 4",
        //                             "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                             "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                             "strengthDesc": "10 MG;325 MG",
        //                             "dosage": 10,
        //                             "prescribedQty": 105,
        //                             "prescribedLen": 30,
        //                             "dailyME": 53,
        //                             "writtenDate": "2023-12-03T10:30:00.000+05:30",
        //                             "writtenDateString": "Dec 3",
        //                             "nrCode": "R",
        //                             "refillCount": 0,
        //                             "rxNum": " ",
        //                             "isActive": false,
        //                             "isOurs": false,
        //                             "prescriber": {
        //                                 "id": "5972512802340864",
        //                                 "created": "2023-04-18T09:38:23.605+05:30",
        //                                 "modified": "2023-04-18T09:38:23.605+05:30",
        //                                 "firstName": "MARQUITTA",
        //                                 "lastName": "BROCK",
        //                                 "sourceAddress": "3817 n brown ave  scottsdale,az 85251",
        //                                 "location": {
        //                                     "id": "4846612895498240",
        //                                     "created": "2023-04-18T09:38:23.596+05:30",
        //                                     "modified": "2023-04-18T09:38:23.605+05:30",
        //                                     "line1": "3817 N Brown Ave",
        //                                     "city": "Scottsdale",
        //                                     "state": "AZ",
        //                                     "zip": "85251",
        //                                     "locLat": 33.4920038,
        //                                     "locLng": -111.9242563,
        //                                     "locSource": "3817 n brown ave  scottsdale,az 85251"
        //                                 },
        //                                 "deaNumber": "MP1714460"
        //                             },
        //                             "pharmacy": {
        //                                 "id": "5585484709363712",
        //                                 "created": "2023-04-18T09:38:22.545+05:30",
        //                                 "modified": "2023-04-18T09:38:22.545+05:30",
        //                                 "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                                 "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                                 "location": {
        //                                     "id": "6148434662785024",
        //                                     "created": "2023-04-18T09:38:22.535+05:30",
        //                                     "modified": "2023-04-18T09:38:22.546+05:30",
        //                                     "line1": "3402 N Central Ave",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85012",
        //                                     "locLat": 33.4879117,
        //                                     "locLng": -112.0745667,
        //                                     "locSource": "3402 n central ave  phoenix,az 85012"
        //                                 },
        //                                 "deaNumber": "AW0572518"
        //                             },
        //                             "ndcCode": "00228298311",
        //                             "patientName": "ULA PECK",
        //                             "patientDOB": "02/04/1939",
        //                             "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                             "isExpectedPatient": true,
        //                             "ndcOriginalSource": "00228298311",
        //                             "productCodeQualifier": "ND",
        //                             "ourPharmacy": false,
        //                             "ourProvider": false,
        //                             "startDate": "2023-12-04T10:30:00.000+05:30",
        //                             "endDate": "2024-01-02T10:30:00.000+05:30"
        //                         }
        //                     ],
        //                     "prescriptionIds": [
        //                         "5278806864560128",
        //                         "6404706771402752"
        //                     ],
        //                     "startDate": "2023-12-30T00:00:00.000+05:30",
        //                     "endDate": "2023-12-31T00:00:00.000+05:30",
        //                     "alertTypeString": "MultiplePrescribers",
        //                     "alertSubtypeString": "Opioid"
        //                 },
        //                 {
        //                     "id": "5366767794782208",
        //                     "created": "2024-01-26T08:36:49.499+05:30",
        //                     "modified": "2024-01-26T08:36:49.499+05:30",
        //                     "patientId": "6007697174429696",
        //                     "pmpReportId": "5313991236648960",
        //                     "alertType": "MultiplePrescribers",
        //                     "alertSubtype": "Opioid",
        //                     "priority": 400,
        //                     "narrative": " (Opioid) from 10/28/2023 to 10/30/2023",
        //                     "typeString": "Multiple Prescribers",
        //                     "prescriptions": [
        //                         {
        //                             "id": "4539935050694656",
        //                             "created": "2024-01-26T08:36:48.997+05:30",
        //                             "modified": "2024-01-26T08:36:49.761+05:30",
        //                             "patientId": "6007697174429696",
        //                             "classification": "OPIOID",
        //                             "fillDate": "2023-10-05T10:30:00.000+05:30",
        //                             "fillDateString": "Oct 5",
        //                             "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                             "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                             "strengthDesc": "10 MG;325 MG",
        //                             "dosage": 10,
        //                             "prescribedQty": 105,
        //                             "prescribedLen": 30,
        //                             "dailyME": 53,
        //                             "writtenDate": "2023-10-01T10:30:00.000+05:30",
        //                             "writtenDateString": "Oct 1",
        //                             "nrCode": "R",
        //                             "refillCount": 0,
        //                             "rxNum": " ",
        //                             "isActive": false,
        //                             "isOurs": false,
        //                             "prescriber": {
        //                                 "id": "6676200244117504",
        //                                 "created": "2023-04-18T09:38:25.169+05:30",
        //                                 "modified": "2023-04-18T09:38:25.169+05:30",
        //                                 "firstName": "MARQUITTA",
        //                                 "lastName": "BROCK",
        //                                 "sourceAddress": "3749-3799 e indian school rd  phoenix,az 85018",
        //                                 "location": {
        //                                     "id": "5550300337274880",
        //                                     "created": "2023-04-18T09:38:25.162+05:30",
        //                                     "modified": "2023-04-18T09:38:25.169+05:30",
        //                                     "line1": "3749 E Indian School Rd",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85018",
        //                                     "locLat": 33.49479520000001,
        //                                     "locLng": -112.0001152,
        //                                     "locSource": "3749-3799 e indian school rd  phoenix,az 85018"
        //                                 },
        //                                 "deaNumber": "MP1714460"
        //                             },
        //                             "pharmacy": {
        //                                 "id": "5585484709363712",
        //                                 "created": "2023-04-18T09:38:22.545+05:30",
        //                                 "modified": "2023-04-18T09:38:22.545+05:30",
        //                                 "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                                 "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                                 "location": {
        //                                     "id": "6148434662785024",
        //                                     "created": "2023-04-18T09:38:22.535+05:30",
        //                                     "modified": "2023-04-18T09:38:22.546+05:30",
        //                                     "line1": "3402 N Central Ave",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85012",
        //                                     "locLat": 33.4879117,
        //                                     "locLng": -112.0745667,
        //                                     "locSource": "3402 n central ave  phoenix,az 85012"
        //                                 },
        //                                 "deaNumber": "AW0572518"
        //                             },
        //                             "ndcCode": "00228298311",
        //                             "patientName": "ULA PECK",
        //                             "patientDOB": "02/04/1939",
        //                             "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                             "isExpectedPatient": true,
        //                             "ndcOriginalSource": "00228298311",
        //                             "productCodeQualifier": "ND",
        //                             "ourPharmacy": false,
        //                             "ourProvider": false,
        //                             "startDate": "2023-10-05T10:30:00.000+05:30",
        //                             "endDate": "2023-11-03T10:30:00.000+05:30"
        //                         },
        //                         {
        //                             "id": "5665834957537280",
        //                             "created": "2024-01-26T08:36:48.997+05:30",
        //                             "modified": "2024-01-26T08:36:49.761+05:30",
        //                             "patientId": "6007697174429696",
        //                             "classification": "OPIOID",
        //                             "fillDate": "2023-10-01T10:30:00.000+05:30",
        //                             "fillDateString": "Oct 1",
        //                             "productName": "OPANA ER, 10 MG, TABLET, EXTENDED RELEASE",
        //                             "displayName": "OPANA ER, 10 MG, TABLET, EXTENDED R",
        //                             "strengthDesc": "10 MG",
        //                             "dosage": 10,
        //                             "prescribedQty": 60,
        //                             "prescribedLen": 30,
        //                             "dailyME": 60,
        //                             "writtenDate": "2023-10-01T10:30:00.000+05:30",
        //                             "writtenDateString": "Oct 1",
        //                             "nrCode": "R",
        //                             "refillCount": 0,
        //                             "rxNum": " ",
        //                             "isActive": false,
        //                             "isOurs": false,
        //                             "prescriber": {
        //                                 "id": "5761406569807872",
        //                                 "created": "2023-04-18T09:38:25.451+05:30",
        //                                 "modified": "2023-04-18T09:38:25.451+05:30",
        //                                 "firstName": "MADIE",
        //                                 "lastName": "WHITNEY",
        //                                 "sourceAddress": "3380 n scottsdale rd  scottsdale,az 85251",
        //                                 "location": {
        //                                     "id": "4635506662965248",
        //                                     "created": "2023-04-18T09:38:25.444+05:30",
        //                                     "modified": "2023-04-18T09:38:25.451+05:30",
        //                                     "line1": "3380 N Scottsdale Rd",
        //                                     "city": "Scottsdale",
        //                                     "state": "AZ",
        //                                     "zip": "85251",
        //                                     "locLat": 33.48733199999999,
        //                                     "locLng": -111.9270596,
        //                                     "locSource": "3380 n scottsdale rd  scottsdale,az 85251"
        //                                 },
        //                                 "deaNumber": "BD7113234"
        //                             },
        //                             "pharmacy": {
        //                                 "id": "6324356523229184",
        //                                 "created": "2023-04-18T09:38:25.757+05:30",
        //                                 "modified": "2023-04-18T09:38:25.757+05:30",
        //                                 "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                                 "sourceAddress": "5895 w. peoria avenue  glendale,az 85302",
        //                                 "location": {
        //                                     "id": "5198456616386560",
        //                                     "created": "2023-04-18T09:38:25.748+05:30",
        //                                     "modified": "2023-04-18T09:38:25.757+05:30",
        //                                     "line1": "5895 W Peoria Ave",
        //                                     "city": "Glendale",
        //                                     "state": "AZ",
        //                                     "zip": "85302",
        //                                     "locLat": 33.5812761,
        //                                     "locLng": -112.1854129,
        //                                     "locSource": "5895 w. peoria avenue  glendale,az 85302"
        //                                 },
        //                                 "deaNumber": "BW5452228"
        //                             },
        //                             "ndcCode": "63481081460",
        //                             "patientName": "ULA PECK",
        //                             "patientDOB": "02/04/1939",
        //                             "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                             "isExpectedPatient": true,
        //                             "ndcOriginalSource": "63481081460",
        //                             "productCodeQualifier": "ND",
        //                             "ourPharmacy": false,
        //                             "ourProvider": false,
        //                             "startDate": "2023-10-01T10:30:00.000+05:30",
        //                             "endDate": "2023-10-30T10:30:00.000+05:30"
        //                         }
        //                     ],
        //                     "prescriptionIds": [
        //                         "4539935050694656",
        //                         "5665834957537280"
        //                     ],
        //                     "startDate": "2023-10-28T00:00:00.000+05:30",
        //                     "endDate": "2023-10-30T00:00:00.000+05:30",
        //                     "alertTypeString": "MultiplePrescribers",
        //                     "alertSubtypeString": "Opioid"
        //                 },
        //                 {
        //                     "id": "5595466213359616",
        //                     "created": "2024-01-26T08:36:49.498+05:30",
        //                     "modified": "2024-01-26T08:36:49.498+05:30",
        //                     "patientId": "6007697174429696",
        //                     "pmpReportId": "5313991236648960",
        //                     "alertType": "WriteFillGap",
        //                     "priority": 800,
        //                     "narrative": " on DEXTROAMPHETAMINE SACCHARATE, AMPHE (30@5 MG;5 MG;5 MG;5 MG ) from 09/22/2023 to 11/14/2023 (53 days)",
        //                     "typeString": "W/F Gap",
        //                     "prescriptions": [
        //                         {
        //                             "id": "6123231794692096",
        //                             "created": "2024-01-26T08:36:48.996+05:30",
        //                             "modified": "2024-01-26T08:36:49.759+05:30",
        //                             "patientId": "6007697174429696",
        //                             "classification": "STIMULANT",
        //                             "fillDate": "2023-11-14T10:30:00.000+05:30",
        //                             "fillDateString": "Nov 14",
        //                             "productName": "DEXTROAMPHETAMINE SACCHARATE, AMPHETAMINE ASPARTATE, DEXTROAMPHETAMINE SULFATE AND AMPHETAMINE SULFA, 5 M",
        //                             "displayName": "DEXTROAMPHETAMINE SACCHARATE, AMPHE",
        //                             "strengthDesc": "5 MG;5 MG;5 MG;5 MG",
        //                             "dosage": 5,
        //                             "prescribedQty": 30,
        //                             "prescribedLen": 30,
        //                             "dailyME": 0,
        //                             "writtenDate": "2023-09-22T10:30:00.000+05:30",
        //                             "writtenDateString": "Sep 22",
        //                             "nrCode": "R",
        //                             "refillCount": 0,
        //                             "rxNum": " ",
        //                             "isActive": false,
        //                             "isOurs": false,
        //                             "prescriber": {
        //                                 "id": "5831775313985536",
        //                                 "created": "2023-04-18T09:38:24.255+05:30",
        //                                 "modified": "2023-04-18T09:38:24.255+05:30",
        //                                 "firstName": "MARNA",
        //                                 "lastName": "WITT",
        //                                 "sourceAddress": "765 e rosemonte dr  phoenix,az 85024",
        //                                 "location": {
        //                                     "id": "4705875407142912",
        //                                     "created": "2023-04-18T09:38:24.246+05:30",
        //                                     "modified": "2023-04-18T09:38:24.255+05:30",
        //                                     "line1": "765 E Rosemonte Dr",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85024",
        //                                     "locLat": 33.6567816,
        //                                     "locLng": -112.0631233,
        //                                     "locSource": "765 e rosemonte dr  phoenix,az 85024"
        //                                 },
        //                                 "deaNumber": "BS0422775"
        //                             },
        //                             "pharmacy": {
        //                                 "id": "5585484709363712",
        //                                 "created": "2023-04-18T09:38:22.545+05:30",
        //                                 "modified": "2023-04-18T09:38:22.545+05:30",
        //                                 "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                                 "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                                 "location": {
        //                                     "id": "6148434662785024",
        //                                     "created": "2023-04-18T09:38:22.535+05:30",
        //                                     "modified": "2023-04-18T09:38:22.546+05:30",
        //                                     "line1": "3402 N Central Ave",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85012",
        //                                     "locLat": 33.4879117,
        //                                     "locLng": -112.0745667,
        //                                     "locSource": "3402 n central ave  phoenix,az 85012"
        //                                 },
        //                                 "deaNumber": "AW0572518"
        //                             },
        //                             "ndcCode": "00555097302",
        //                             "patientName": "ULA PECK",
        //                             "patientDOB": "02/04/1939",
        //                             "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                             "isExpectedPatient": true,
        //                             "ndcOriginalSource": "00555097302",
        //                             "productCodeQualifier": "ND",
        //                             "ourPharmacy": false,
        //                             "ourProvider": false,
        //                             "startDate": "2023-11-14T10:30:00.000+05:30",
        //                             "endDate": "2023-12-13T10:30:00.000+05:30"
        //                         }
        //                     ],
        //                     "prescriptionIds": [
        //                         "6123231794692096"
        //                     ],
        //                     "startDate": "2023-09-22T10:30:00.000+05:30",
        //                     "endDate": "2023-11-14T10:30:00.000+05:30",
        //                     "alertTypeString": "WriteFillGap"
        //                 },
        //                 {
        //                     "id": "5648242771492864",
        //                     "created": "2024-01-26T08:36:49.498+05:30",
        //                     "modified": "2024-01-26T08:36:49.498+05:30",
        //                     "patientId": "6007697174429696",
        //                     "pmpReportId": "5313991236648960",
        //                     "description": "Prescriber: NUNEZ, TAWNYA with DEA: MH3849176",
        //                     "alertType": "NotOurPrescription",
        //                     "alertSubtype": "Prescriber",
        //                     "priority": 100,
        //                     "narrative": "Prescriber: NUNEZ, TAWNYA with DEA: MH3849176 for 2 Prescriptions.",
        //                     "typeString": "Not Our Prescriber",
        //                     "prescriptions": [
        //                         {
        //                             "id": "4715856911138816",
        //                             "created": "2024-01-26T08:36:48.994+05:30",
        //                             "modified": "2024-01-26T08:36:49.754+05:30",
        //                             "patientId": "6007697174429696",
        //                             "classification": "OPIOID",
        //                             "fillDate": "2024-01-05T10:30:00.000+05:30",
        //                             "fillDateString": "Jan 5",
        //                             "productName": "OXYCONTIN, 10 MG, TABLET, FILM COATED, EXTENDED RELEASE",
        //                             "displayName": "OXYCONTIN, 10 MG, TABLET, FILM COAT",
        //                             "strengthDesc": "10 MG",
        //                             "dosage": 10,
        //                             "prescribedQty": 60,
        //                             "prescribedLen": 30,
        //                             "dailyME": 30,
        //                             "writtenDate": "2023-12-23T10:30:00.000+05:30",
        //                             "writtenDateString": "Dec 23",
        //                             "nrCode": "R",
        //                             "refillCount": 0,
        //                             "rxNum": " ",
        //                             "isActive": true,
        //                             "isOurs": false,
        //                             "prescriber": {
        //                                 "id": "5022534755942400",
        //                                 "created": "2023-04-18T09:38:22.275+05:30",
        //                                 "modified": "2023-04-18T09:38:22.275+05:30",
        //                                 "firstName": "TAWNYA",
        //                                 "lastName": "NUNEZ",
        //                                 "sourceAddress": "6989 n hayden rd  scottsdale,az 85250",
        //                                 "location": {
        //                                     "id": "6429909639495680",
        //                                     "created": "2023-04-18T09:38:22.264+05:30",
        //                                     "modified": "2023-04-18T09:38:22.277+05:30",
        //                                     "line1": "6989 N Hayden Rd",
        //                                     "city": "Scottsdale",
        //                                     "state": "AZ",
        //                                     "zip": "85250",
        //                                     "locLat": 33.5379566,
        //                                     "locLng": -111.9060417,
        //                                     "locSource": "6989 n hayden rd  scottsdale,az 85250"
        //                                 },
        //                                 "deaNumber": "MH3849176"
        //                             },
        //                             "pharmacy": {
        //                                 "id": "5585484709363712",
        //                                 "created": "2023-04-18T09:38:22.545+05:30",
        //                                 "modified": "2023-04-18T09:38:22.545+05:30",
        //                                 "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                                 "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                                 "location": {
        //                                     "id": "6148434662785024",
        //                                     "created": "2023-04-18T09:38:22.535+05:30",
        //                                     "modified": "2023-04-18T09:38:22.546+05:30",
        //                                     "line1": "3402 N Central Ave",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85012",
        //                                     "locLat": 33.4879117,
        //                                     "locLng": -112.0745667,
        //                                     "locSource": "3402 n central ave  phoenix,az 85012"
        //                                 },
        //                                 "deaNumber": "AW0572518"
        //                             },
        //                             "ndcCode": "59011041010",
        //                             "patientName": "ULA PECK",
        //                             "patientDOB": "02/04/1939",
        //                             "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                             "isExpectedPatient": true,
        //                             "ndcOriginalSource": "59011041010",
        //                             "productCodeQualifier": "ND",
        //                             "ourPharmacy": false,
        //                             "ourProvider": false,
        //                             "startDate": "2024-01-05T10:30:00.000+05:30",
        //                             "endDate": "2024-02-03T10:30:00.000+05:30"
        //                         },
        //                         {
        //                             "id": "5841756817981440",
        //                             "created": "2024-01-26T08:36:48.994+05:30",
        //                             "modified": "2024-01-26T08:36:49.755+05:30",
        //                             "patientId": "6007697174429696",
        //                             "classification": "OPIOID",
        //                             "fillDate": "2024-01-05T10:30:00.000+05:30",
        //                             "fillDateString": "Jan 5",
        //                             "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                             "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                             "strengthDesc": "10 MG;325 MG",
        //                             "dosage": 10,
        //                             "prescribedQty": 105,
        //                             "prescribedLen": 30,
        //                             "dailyME": 53,
        //                             "writtenDate": "2023-12-23T10:30:00.000+05:30",
        //                             "writtenDateString": "Dec 23",
        //                             "nrCode": "R",
        //                             "refillCount": 0,
        //                             "rxNum": " ",
        //                             "isActive": true,
        //                             "isOurs": false,
        //                             "prescriber": {
        //                                 "id": "4565137918787584",
        //                                 "created": "2023-04-18T09:38:22.853+05:30",
        //                                 "modified": "2023-04-18T09:38:22.853+05:30",
        //                                 "firstName": "TAWNYA",
        //                                 "lastName": "NUNEZ",
        //                                 "sourceAddress": "3815 n brown ave  scottsdale,az 85251",
        //                                 "location": {
        //                                     "id": "6711384616206336",
        //                                     "created": "2023-04-18T09:38:22.846+05:30",
        //                                     "modified": "2023-04-18T09:38:22.854+05:30",
        //                                     "line1": "3815 N Brown Ave",
        //                                     "city": "Scottsdale",
        //                                     "state": "AZ",
        //                                     "zip": "85251",
        //                                     "locLat": 33.4918372,
        //                                     "locLng": -111.9242563,
        //                                     "locSource": "3815 n brown ave  scottsdale,az 85251"
        //                                 },
        //                                 "deaNumber": "MH3849176"
        //                             },
        //                             "pharmacy": {
        //                                 "id": "5585484709363712",
        //                                 "created": "2023-04-18T09:38:22.545+05:30",
        //                                 "modified": "2023-04-18T09:38:22.545+05:30",
        //                                 "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                                 "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                                 "location": {
        //                                     "id": "6148434662785024",
        //                                     "created": "2023-04-18T09:38:22.535+05:30",
        //                                     "modified": "2023-04-18T09:38:22.546+05:30",
        //                                     "line1": "3402 N Central Ave",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85012",
        //                                     "locLat": 33.4879117,
        //                                     "locLng": -112.0745667,
        //                                     "locSource": "3402 n central ave  phoenix,az 85012"
        //                                 },
        //                                 "deaNumber": "AW0572518"
        //                             },
        //                             "ndcCode": "00228298311",
        //                             "patientName": "ULA PECK",
        //                             "patientDOB": "02/04/1939",
        //                             "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                             "isExpectedPatient": true,
        //                             "ndcOriginalSource": "00228298311",
        //                             "productCodeQualifier": "ND",
        //                             "ourPharmacy": false,
        //                             "ourProvider": false,
        //                             "startDate": "2024-01-05T10:30:00.000+05:30",
        //                             "endDate": "2024-02-03T10:30:00.000+05:30"
        //                         }
        //                     ],
        //                     "prescriptionIds": [
        //                         "4715856911138816",
        //                         "5841756817981440"
        //                     ],
        //                     "startDate": "2023-12-23T10:30:00.000+05:30",
        //                     "endDate": "2024-01-05T10:30:00.000+05:30",
        //                     "alertTypeString": "NotOurPrescription",
        //                     "alertSubtypeString": "Prescriber"
        //                 },
        //                 {
        //                     "id": "5788980259848192",
        //                     "created": "2024-01-26T08:36:49.499+05:30",
        //                     "modified": "2024-01-26T08:36:49.499+05:30",
        //                     "patientId": "6007697174429696",
        //                     "pmpReportId": "5313991236648960",
        //                     "alertType": "Overlapping",
        //                     "alertSubtype": "Prescriber",
        //                     "priority": 500,
        //                     "narrative": " from 11/14/2023 to 12/14/2023",
        //                     "typeString": "Overlapping Prescribers(diff cat)",
        //                     "prescriptions": [
        //                         {
        //                             "id": "5560281841270784",
        //                             "created": "2024-01-26T08:36:48.996+05:30",
        //                             "modified": "2024-01-26T08:36:49.759+05:30",
        //                             "patientId": "6007697174429696",
        //                             "classification": "OPIOID",
        //                             "fillDate": "2023-11-04T10:30:00.000+05:30",
        //                             "fillDateString": "Nov 4",
        //                             "productName": "OXYCONTIN, 10 MG, TABLET, FILM COATED, EXTENDED RELEASE",
        //                             "displayName": "OXYCONTIN, 10 MG, TABLET, FILM COAT",
        //                             "strengthDesc": "10 MG",
        //                             "dosage": 10,
        //                             "prescribedQty": 60,
        //                             "prescribedLen": 30,
        //                             "dailyME": 30,
        //                             "writtenDate": "2023-10-29T10:30:00.000+05:30",
        //                             "writtenDateString": "Oct 29",
        //                             "nrCode": "R",
        //                             "refillCount": 0,
        //                             "rxNum": " ",
        //                             "isActive": false,
        //                             "isOurs": false,
        //                             "prescriber": {
        //                                 "id": "6394725267406848",
        //                                 "created": "2023-04-18T09:38:24.558+05:30",
        //                                 "modified": "2023-04-18T09:38:24.558+05:30",
        //                                 "firstName": "MARQUITTA",
        //                                 "lastName": "BROCK",
        //                                 "sourceAddress": "3806-3898 n brown ave  scottsdale,az 85251",
        //                                 "location": {
        //                                     "id": "5268825360564224",
        //                                     "created": "2023-04-18T09:38:24.551+05:30",
        //                                     "modified": "2023-04-18T09:38:24.559+05:30",
        //                                     "line1": "3806 N Brown Ave",
        //                                     "city": "Scottsdale",
        //                                     "state": "AZ",
        //                                     "zip": "85251",
        //                                     "locLat": 33.4916008,
        //                                     "locLng": -111.9247454,
        //                                     "locSource": "3806-3898 n brown ave  scottsdale,az 85251"
        //                                 },
        //                                 "deaNumber": "MP1714460"
        //                             },
        //                             "pharmacy": {
        //                                 "id": "5585484709363712",
        //                                 "created": "2023-04-18T09:38:22.545+05:30",
        //                                 "modified": "2023-04-18T09:38:22.545+05:30",
        //                                 "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                                 "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                                 "location": {
        //                                     "id": "6148434662785024",
        //                                     "created": "2023-04-18T09:38:22.535+05:30",
        //                                     "modified": "2023-04-18T09:38:22.546+05:30",
        //                                     "line1": "3402 N Central Ave",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85012",
        //                                     "locLat": 33.4879117,
        //                                     "locLng": -112.0745667,
        //                                     "locSource": "3402 n central ave  phoenix,az 85012"
        //                                 },
        //                                 "deaNumber": "AW0572518"
        //                             },
        //                             "ndcCode": "59011041010",
        //                             "patientName": "ULA PECK",
        //                             "patientDOB": "02/04/1939",
        //                             "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                             "isExpectedPatient": true,
        //                             "ndcOriginalSource": "59011041010",
        //                             "productCodeQualifier": "ND",
        //                             "ourPharmacy": false,
        //                             "ourProvider": false,
        //                             "startDate": "2023-11-04T10:30:00.000+05:30",
        //                             "endDate": "2023-12-03T10:30:00.000+05:30"
        //                         },
        //                         {
        //                             "id": "6686181748113408",
        //                             "created": "2024-01-26T08:36:48.996+05:30",
        //                             "modified": "2024-01-26T08:36:49.760+05:30",
        //                             "patientId": "6007697174429696",
        //                             "classification": "OPIOID",
        //                             "fillDate": "2023-11-04T10:30:00.000+05:30",
        //                             "fillDateString": "Nov 4",
        //                             "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                             "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                             "strengthDesc": "10 MG;325 MG",
        //                             "dosage": 10,
        //                             "prescribedQty": 105,
        //                             "prescribedLen": 30,
        //                             "dailyME": 53,
        //                             "writtenDate": "2023-10-29T10:30:00.000+05:30",
        //                             "writtenDateString": "Oct 29",
        //                             "nrCode": "R",
        //                             "refillCount": 0,
        //                             "rxNum": " ",
        //                             "isActive": false,
        //                             "isOurs": false,
        //                             "prescriber": {
        //                                 "id": "6113250290696192",
        //                                 "created": "2023-04-18T09:38:24.873+05:30",
        //                                 "modified": "2023-04-18T09:38:24.873+05:30",
        //                                 "firstName": "MARQUITTA",
        //                                 "lastName": "BROCK",
        //                                 "sourceAddress": "3752 e indian school rd  phoenix,az 85018",
        //                                 "location": {
        //                                     "id": "4987350383853568",
        //                                     "created": "2023-04-18T09:38:24.866+05:30",
        //                                     "modified": "2023-04-18T09:38:24.874+05:30",
        //                                     "line1": "3752 E Indian School Rd",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85018",
        //                                     "locLat": 33.4954195,
        //                                     "locLng": -112.0000832,
        //                                     "locSource": "3752 e indian school rd  phoenix,az 85018"
        //                                 },
        //                                 "deaNumber": "MP1714460"
        //                             },
        //                             "pharmacy": {
        //                                 "id": "5585484709363712",
        //                                 "created": "2023-04-18T09:38:22.545+05:30",
        //                                 "modified": "2023-04-18T09:38:22.545+05:30",
        //                                 "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                                 "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                                 "location": {
        //                                     "id": "6148434662785024",
        //                                     "created": "2023-04-18T09:38:22.535+05:30",
        //                                     "modified": "2023-04-18T09:38:22.546+05:30",
        //                                     "line1": "3402 N Central Ave",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85012",
        //                                     "locLat": 33.4879117,
        //                                     "locLng": -112.0745667,
        //                                     "locSource": "3402 n central ave  phoenix,az 85012"
        //                                 },
        //                                 "deaNumber": "AW0572518"
        //                             },
        //                             "ndcCode": "00228298311",
        //                             "patientName": "ULA PECK",
        //                             "patientDOB": "02/04/1939",
        //                             "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                             "isExpectedPatient": true,
        //                             "ndcOriginalSource": "00228298311",
        //                             "productCodeQualifier": "ND",
        //                             "ourPharmacy": false,
        //                             "ourProvider": false,
        //                             "startDate": "2023-11-04T10:30:00.000+05:30",
        //                             "endDate": "2023-12-03T10:30:00.000+05:30"
        //                         },
        //                         {
        //                             "id": "6123231794692096",
        //                             "created": "2024-01-26T08:36:48.996+05:30",
        //                             "modified": "2024-01-26T08:36:49.759+05:30",
        //                             "patientId": "6007697174429696",
        //                             "classification": "STIMULANT",
        //                             "fillDate": "2023-11-14T10:30:00.000+05:30",
        //                             "fillDateString": "Nov 14",
        //                             "productName": "DEXTROAMPHETAMINE SACCHARATE, AMPHETAMINE ASPARTATE, DEXTROAMPHETAMINE SULFATE AND AMPHETAMINE SULFA, 5 M",
        //                             "displayName": "DEXTROAMPHETAMINE SACCHARATE, AMPHE",
        //                             "strengthDesc": "5 MG;5 MG;5 MG;5 MG",
        //                             "dosage": 5,
        //                             "prescribedQty": 30,
        //                             "prescribedLen": 30,
        //                             "dailyME": 0,
        //                             "writtenDate": "2023-09-22T10:30:00.000+05:30",
        //                             "writtenDateString": "Sep 22",
        //                             "nrCode": "R",
        //                             "refillCount": 0,
        //                             "rxNum": " ",
        //                             "isActive": false,
        //                             "isOurs": false,
        //                             "prescriber": {
        //                                 "id": "5831775313985536",
        //                                 "created": "2023-04-18T09:38:24.255+05:30",
        //                                 "modified": "2023-04-18T09:38:24.255+05:30",
        //                                 "firstName": "MARNA",
        //                                 "lastName": "WITT",
        //                                 "sourceAddress": "765 e rosemonte dr  phoenix,az 85024",
        //                                 "location": {
        //                                     "id": "4705875407142912",
        //                                     "created": "2023-04-18T09:38:24.246+05:30",
        //                                     "modified": "2023-04-18T09:38:24.255+05:30",
        //                                     "line1": "765 E Rosemonte Dr",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85024",
        //                                     "locLat": 33.6567816,
        //                                     "locLng": -112.0631233,
        //                                     "locSource": "765 e rosemonte dr  phoenix,az 85024"
        //                                 },
        //                                 "deaNumber": "BS0422775"
        //                             },
        //                             "pharmacy": {
        //                                 "id": "5585484709363712",
        //                                 "created": "2023-04-18T09:38:22.545+05:30",
        //                                 "modified": "2023-04-18T09:38:22.545+05:30",
        //                                 "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                                 "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                                 "location": {
        //                                     "id": "6148434662785024",
        //                                     "created": "2023-04-18T09:38:22.535+05:30",
        //                                     "modified": "2023-04-18T09:38:22.546+05:30",
        //                                     "line1": "3402 N Central Ave",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85012",
        //                                     "locLat": 33.4879117,
        //                                     "locLng": -112.0745667,
        //                                     "locSource": "3402 n central ave  phoenix,az 85012"
        //                                 },
        //                                 "deaNumber": "AW0572518"
        //                             },
        //                             "ndcCode": "00555097302",
        //                             "patientName": "ULA PECK",
        //                             "patientDOB": "02/04/1939",
        //                             "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                             "isExpectedPatient": true,
        //                             "ndcOriginalSource": "00555097302",
        //                             "productCodeQualifier": "ND",
        //                             "ourPharmacy": false,
        //                             "ourProvider": false,
        //                             "startDate": "2023-11-14T10:30:00.000+05:30",
        //                             "endDate": "2023-12-13T10:30:00.000+05:30"
        //                         },
        //                         {
        //                             "id": "4997331887849472",
        //                             "created": "2024-01-26T08:36:48.995+05:30",
        //                             "modified": "2024-01-26T08:36:49.758+05:30",
        //                             "patientId": "6007697174429696",
        //                             "classification": "STIMULANT",
        //                             "fillDate": "2023-11-15T10:30:00.000+05:30",
        //                             "fillDateString": "Nov 15",
        //                             "productName": "VYVANSE, 50 MG, CAPSULE",
        //                             "displayName": "VYVANSE, 50 MG, CAPSULE",
        //                             "strengthDesc": "50 MG",
        //                             "dosage": 50,
        //                             "prescribedQty": 30,
        //                             "prescribedLen": 30,
        //                             "dailyME": 0,
        //                             "writtenDate": "2023-09-22T10:30:00.000+05:30",
        //                             "writtenDateString": "Sep 22",
        //                             "nrCode": "R",
        //                             "refillCount": 0,
        //                             "rxNum": " ",
        //                             "isActive": false,
        //                             "isOurs": false,
        //                             "prescriber": {
        //                                 "id": "6535462755762176",
        //                                 "created": "2023-04-18T09:38:23.938+05:30",
        //                                 "modified": "2023-04-18T09:38:23.938+05:30",
        //                                 "firstName": "MARNA",
        //                                 "lastName": "WITT",
        //                                 "sourceAddress": "718 e union hills dr  phoenix,az 85024",
        //                                 "location": {
        //                                     "id": "5409562848919552",
        //                                     "created": "2023-04-18T09:38:23.930+05:30",
        //                                     "modified": "2023-04-18T09:38:23.939+05:30",
        //                                     "line1": "718 E Union Hills Dr",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85024",
        //                                     "locLat": 33.6561533,
        //                                     "locLng": -112.0637055,
        //                                     "locSource": "718 e union hills dr  phoenix,az 85024"
        //                                 },
        //                                 "deaNumber": "BS0422775"
        //                             },
        //                             "pharmacy": {
        //                                 "id": "5585484709363712",
        //                                 "created": "2023-04-18T09:38:22.545+05:30",
        //                                 "modified": "2023-04-18T09:38:22.545+05:30",
        //                                 "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                                 "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                                 "location": {
        //                                     "id": "6148434662785024",
        //                                     "created": "2023-04-18T09:38:22.535+05:30",
        //                                     "modified": "2023-04-18T09:38:22.546+05:30",
        //                                     "line1": "3402 N Central Ave",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85012",
        //                                     "locLat": 33.4879117,
        //                                     "locLng": -112.0745667,
        //                                     "locSource": "3402 n central ave  phoenix,az 85012"
        //                                 },
        //                                 "deaNumber": "AW0572518"
        //                             },
        //                             "ndcCode": "59417010510",
        //                             "patientName": "ULA PECK",
        //                             "patientDOB": "02/04/1939",
        //                             "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                             "isExpectedPatient": true,
        //                             "ndcOriginalSource": "59417010510",
        //                             "productCodeQualifier": "ND",
        //                             "ourPharmacy": false,
        //                             "ourProvider": false,
        //                             "startDate": "2023-11-15T10:30:00.000+05:30",
        //                             "endDate": "2023-12-14T10:30:00.000+05:30"
        //                         },
        //                         {
        //                             "id": "6404706771402752",
        //                             "created": "2024-01-26T08:36:48.995+05:30",
        //                             "modified": "2024-01-26T08:36:49.757+05:30",
        //                             "patientId": "6007697174429696",
        //                             "classification": "OPIOID",
        //                             "fillDate": "2023-12-04T10:30:00.000+05:30",
        //                             "fillDateString": "Dec 4",
        //                             "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                             "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                             "strengthDesc": "10 MG;325 MG",
        //                             "dosage": 10,
        //                             "prescribedQty": 105,
        //                             "prescribedLen": 30,
        //                             "dailyME": 53,
        //                             "writtenDate": "2023-12-03T10:30:00.000+05:30",
        //                             "writtenDateString": "Dec 3",
        //                             "nrCode": "R",
        //                             "refillCount": 0,
        //                             "rxNum": " ",
        //                             "isActive": false,
        //                             "isOurs": false,
        //                             "prescriber": {
        //                                 "id": "5972512802340864",
        //                                 "created": "2023-04-18T09:38:23.605+05:30",
        //                                 "modified": "2023-04-18T09:38:23.605+05:30",
        //                                 "firstName": "MARQUITTA",
        //                                 "lastName": "BROCK",
        //                                 "sourceAddress": "3817 n brown ave  scottsdale,az 85251",
        //                                 "location": {
        //                                     "id": "4846612895498240",
        //                                     "created": "2023-04-18T09:38:23.596+05:30",
        //                                     "modified": "2023-04-18T09:38:23.605+05:30",
        //                                     "line1": "3817 N Brown Ave",
        //                                     "city": "Scottsdale",
        //                                     "state": "AZ",
        //                                     "zip": "85251",
        //                                     "locLat": 33.4920038,
        //                                     "locLng": -111.9242563,
        //                                     "locSource": "3817 n brown ave  scottsdale,az 85251"
        //                                 },
        //                                 "deaNumber": "MP1714460"
        //                             },
        //                             "pharmacy": {
        //                                 "id": "5585484709363712",
        //                                 "created": "2023-04-18T09:38:22.545+05:30",
        //                                 "modified": "2023-04-18T09:38:22.545+05:30",
        //                                 "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                                 "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                                 "location": {
        //                                     "id": "6148434662785024",
        //                                     "created": "2023-04-18T09:38:22.535+05:30",
        //                                     "modified": "2023-04-18T09:38:22.546+05:30",
        //                                     "line1": "3402 N Central Ave",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85012",
        //                                     "locLat": 33.4879117,
        //                                     "locLng": -112.0745667,
        //                                     "locSource": "3402 n central ave  phoenix,az 85012"
        //                                 },
        //                                 "deaNumber": "AW0572518"
        //                             },
        //                             "ndcCode": "00228298311",
        //                             "patientName": "ULA PECK",
        //                             "patientDOB": "02/04/1939",
        //                             "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                             "isExpectedPatient": true,
        //                             "ndcOriginalSource": "00228298311",
        //                             "productCodeQualifier": "ND",
        //                             "ourPharmacy": false,
        //                             "ourProvider": false,
        //                             "startDate": "2023-12-04T10:30:00.000+05:30",
        //                             "endDate": "2024-01-02T10:30:00.000+05:30"
        //                         }
        //                     ],
        //                     "prescriptionIds": [
        //                         "5560281841270784",
        //                         "6686181748113408",
        //                         "6123231794692096",
        //                         "4997331887849472",
        //                         "6404706771402752"
        //                     ],
        //                     "startDate": "2023-11-14T00:00:00.000+05:30",
        //                     "endDate": "2023-12-14T00:00:00.000+05:30",
        //                     "alertTypeString": "Overlapping",
        //                     "alertSubtypeString": "Prescriber"
        //                 },
        //                 {
        //                     "id": "5929717748203520",
        //                     "created": "2024-01-26T08:36:49.499+05:30",
        //                     "modified": "2024-01-26T08:36:49.499+05:30",
        //                     "patientId": "6007697174429696",
        //                     "pmpReportId": "5313991236648960",
        //                     "description": "Pharmacy: WALGREEN ARIZONA DRUG CO. with DEA: AW0572518",
        //                     "alertType": "NotOurPrescription",
        //                     "alertSubtype": "Pharmacy",
        //                     "priority": 100,
        //                     "narrative": "Pharmacy: WALGREEN ARIZONA DRUG CO. with DEA: AW0572518 for 8 Prescriptions.",
        //                     "typeString": "Not Our Prescriber",
        //                     "prescriptions": [
        //                         {
        //                             "id": "4715856911138816",
        //                             "created": "2024-01-26T08:36:48.994+05:30",
        //                             "modified": "2024-01-26T08:36:49.754+05:30",
        //                             "patientId": "6007697174429696",
        //                             "classification": "OPIOID",
        //                             "fillDate": "2024-01-05T10:30:00.000+05:30",
        //                             "fillDateString": "Jan 5",
        //                             "productName": "OXYCONTIN, 10 MG, TABLET, FILM COATED, EXTENDED RELEASE",
        //                             "displayName": "OXYCONTIN, 10 MG, TABLET, FILM COAT",
        //                             "strengthDesc": "10 MG",
        //                             "dosage": 10,
        //                             "prescribedQty": 60,
        //                             "prescribedLen": 30,
        //                             "dailyME": 30,
        //                             "writtenDate": "2023-12-23T10:30:00.000+05:30",
        //                             "writtenDateString": "Dec 23",
        //                             "nrCode": "R",
        //                             "refillCount": 0,
        //                             "rxNum": " ",
        //                             "isActive": true,
        //                             "isOurs": false,
        //                             "prescriber": {
        //                                 "id": "5022534755942400",
        //                                 "created": "2023-04-18T09:38:22.275+05:30",
        //                                 "modified": "2023-04-18T09:38:22.275+05:30",
        //                                 "firstName": "TAWNYA",
        //                                 "lastName": "NUNEZ",
        //                                 "sourceAddress": "6989 n hayden rd  scottsdale,az 85250",
        //                                 "location": {
        //                                     "id": "6429909639495680",
        //                                     "created": "2023-04-18T09:38:22.264+05:30",
        //                                     "modified": "2023-04-18T09:38:22.277+05:30",
        //                                     "line1": "6989 N Hayden Rd",
        //                                     "city": "Scottsdale",
        //                                     "state": "AZ",
        //                                     "zip": "85250",
        //                                     "locLat": 33.5379566,
        //                                     "locLng": -111.9060417,
        //                                     "locSource": "6989 n hayden rd  scottsdale,az 85250"
        //                                 },
        //                                 "deaNumber": "MH3849176"
        //                             },
        //                             "pharmacy": {
        //                                 "id": "5585484709363712",
        //                                 "created": "2023-04-18T09:38:22.545+05:30",
        //                                 "modified": "2023-04-18T09:38:22.545+05:30",
        //                                 "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                                 "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                                 "location": {
        //                                     "id": "6148434662785024",
        //                                     "created": "2023-04-18T09:38:22.535+05:30",
        //                                     "modified": "2023-04-18T09:38:22.546+05:30",
        //                                     "line1": "3402 N Central Ave",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85012",
        //                                     "locLat": 33.4879117,
        //                                     "locLng": -112.0745667,
        //                                     "locSource": "3402 n central ave  phoenix,az 85012"
        //                                 },
        //                                 "deaNumber": "AW0572518"
        //                             },
        //                             "ndcCode": "59011041010",
        //                             "patientName": "ULA PECK",
        //                             "patientDOB": "02/04/1939",
        //                             "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                             "isExpectedPatient": true,
        //                             "ndcOriginalSource": "59011041010",
        //                             "productCodeQualifier": "ND",
        //                             "ourPharmacy": false,
        //                             "ourProvider": false,
        //                             "startDate": "2024-01-05T10:30:00.000+05:30",
        //                             "endDate": "2024-02-03T10:30:00.000+05:30"
        //                         },
        //                         {
        //                             "id": "5841756817981440",
        //                             "created": "2024-01-26T08:36:48.994+05:30",
        //                             "modified": "2024-01-26T08:36:49.755+05:30",
        //                             "patientId": "6007697174429696",
        //                             "classification": "OPIOID",
        //                             "fillDate": "2024-01-05T10:30:00.000+05:30",
        //                             "fillDateString": "Jan 5",
        //                             "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                             "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                             "strengthDesc": "10 MG;325 MG",
        //                             "dosage": 10,
        //                             "prescribedQty": 105,
        //                             "prescribedLen": 30,
        //                             "dailyME": 53,
        //                             "writtenDate": "2023-12-23T10:30:00.000+05:30",
        //                             "writtenDateString": "Dec 23",
        //                             "nrCode": "R",
        //                             "refillCount": 0,
        //                             "rxNum": " ",
        //                             "isActive": true,
        //                             "isOurs": false,
        //                             "prescriber": {
        //                                 "id": "4565137918787584",
        //                                 "created": "2023-04-18T09:38:22.853+05:30",
        //                                 "modified": "2023-04-18T09:38:22.853+05:30",
        //                                 "firstName": "TAWNYA",
        //                                 "lastName": "NUNEZ",
        //                                 "sourceAddress": "3815 n brown ave  scottsdale,az 85251",
        //                                 "location": {
        //                                     "id": "6711384616206336",
        //                                     "created": "2023-04-18T09:38:22.846+05:30",
        //                                     "modified": "2023-04-18T09:38:22.854+05:30",
        //                                     "line1": "3815 N Brown Ave",
        //                                     "city": "Scottsdale",
        //                                     "state": "AZ",
        //                                     "zip": "85251",
        //                                     "locLat": 33.4918372,
        //                                     "locLng": -111.9242563,
        //                                     "locSource": "3815 n brown ave  scottsdale,az 85251"
        //                                 },
        //                                 "deaNumber": "MH3849176"
        //                             },
        //                             "pharmacy": {
        //                                 "id": "5585484709363712",
        //                                 "created": "2023-04-18T09:38:22.545+05:30",
        //                                 "modified": "2023-04-18T09:38:22.545+05:30",
        //                                 "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                                 "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                                 "location": {
        //                                     "id": "6148434662785024",
        //                                     "created": "2023-04-18T09:38:22.535+05:30",
        //                                     "modified": "2023-04-18T09:38:22.546+05:30",
        //                                     "line1": "3402 N Central Ave",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85012",
        //                                     "locLat": 33.4879117,
        //                                     "locLng": -112.0745667,
        //                                     "locSource": "3402 n central ave  phoenix,az 85012"
        //                                 },
        //                                 "deaNumber": "AW0572518"
        //                             },
        //                             "ndcCode": "00228298311",
        //                             "patientName": "ULA PECK",
        //                             "patientDOB": "02/04/1939",
        //                             "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                             "isExpectedPatient": true,
        //                             "ndcOriginalSource": "00228298311",
        //                             "productCodeQualifier": "ND",
        //                             "ourPharmacy": false,
        //                             "ourProvider": false,
        //                             "startDate": "2024-01-05T10:30:00.000+05:30",
        //                             "endDate": "2024-02-03T10:30:00.000+05:30"
        //                         },
        //                         {
        //                             "id": "5278806864560128",
        //                             "created": "2024-01-26T08:36:48.994+05:30",
        //                             "modified": "2024-01-26T08:36:49.756+05:30",
        //                             "patientId": "6007697174429696",
        //                             "classification": "OPIOID",
        //                             "fillDate": "2023-12-30T10:30:00.000+05:30",
        //                             "fillDateString": "Dec 30",
        //                             "productName": "OXYCODONE HYDROCHLORIDE, 5 MG, TABLET",
        //                             "displayName": "OXYCODONE HYDROCHLORIDE, 5 MG, TABL",
        //                             "strengthDesc": "5 MG",
        //                             "dosage": 5,
        //                             "prescribedQty": 60,
        //                             "prescribedLen": 2,
        //                             "dailyME": 225,
        //                             "writtenDate": "2023-12-26T10:30:00.000+05:30",
        //                             "writtenDateString": "Dec 26",
        //                             "nrCode": "R",
        //                             "refillCount": 0,
        //                             "rxNum": " ",
        //                             "isActive": false,
        //                             "isOurs": false,
        //                             "prescriber": {
        //                                 "id": "5128087872208896",
        //                                 "created": "2023-04-18T09:38:23.147+05:30",
        //                                 "modified": "2023-04-18T09:38:23.147+05:30",
        //                                 "firstName": "",
        //                                 "lastName": "",
        //                                 "sourceAddress": "5022 n 17th ave  phoenix,az 85015",
        //                                 "location": {
        //                                     "id": "5691037825630208",
        //                                     "created": "2023-04-18T09:38:23.141+05:30",
        //                                     "modified": "2023-04-18T09:38:23.148+05:30",
        //                                     "line1": "5022 N 17th Ave",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85015",
        //                                     "locLat": 33.5106346,
        //                                     "locLng": -112.0963149,
        //                                     "locSource": "5022 n 17th ave  phoenix,az 85015"
        //                                 },
        //                                 "deaNumber": "BC7786140"
        //                             },
        //                             "pharmacy": {
        //                                 "id": "5585484709363712",
        //                                 "created": "2023-04-18T09:38:22.545+05:30",
        //                                 "modified": "2023-04-18T09:38:22.545+05:30",
        //                                 "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                                 "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                                 "location": {
        //                                     "id": "6148434662785024",
        //                                     "created": "2023-04-18T09:38:22.535+05:30",
        //                                     "modified": "2023-04-18T09:38:22.546+05:30",
        //                                     "line1": "3402 N Central Ave",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85012",
        //                                     "locLat": 33.4879117,
        //                                     "locLng": -112.0745667,
        //                                     "locSource": "3402 n central ave  phoenix,az 85012"
        //                                 },
        //                                 "deaNumber": "AW0572518"
        //                             },
        //                             "ndcCode": "00406055201",
        //                             "patientName": "ULA PECK",
        //                             "patientDOB": "02/04/1939",
        //                             "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                             "isExpectedPatient": true,
        //                             "ndcOriginalSource": "00406055201",
        //                             "productCodeQualifier": "ND",
        //                             "ourPharmacy": false,
        //                             "ourProvider": false,
        //                             "startDate": "2023-12-30T10:30:00.000+05:30",
        //                             "endDate": "2023-12-31T10:30:00.000+05:30"
        //                         },
        //                         {
        //                             "id": "6404706771402752",
        //                             "created": "2024-01-26T08:36:48.995+05:30",
        //                             "modified": "2024-01-26T08:36:49.757+05:30",
        //                             "patientId": "6007697174429696",
        //                             "classification": "OPIOID",
        //                             "fillDate": "2023-12-04T10:30:00.000+05:30",
        //                             "fillDateString": "Dec 4",
        //                             "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                             "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                             "strengthDesc": "10 MG;325 MG",
        //                             "dosage": 10,
        //                             "prescribedQty": 105,
        //                             "prescribedLen": 30,
        //                             "dailyME": 53,
        //                             "writtenDate": "2023-12-03T10:30:00.000+05:30",
        //                             "writtenDateString": "Dec 3",
        //                             "nrCode": "R",
        //                             "refillCount": 0,
        //                             "rxNum": " ",
        //                             "isActive": false,
        //                             "isOurs": false,
        //                             "prescriber": {
        //                                 "id": "5972512802340864",
        //                                 "created": "2023-04-18T09:38:23.605+05:30",
        //                                 "modified": "2023-04-18T09:38:23.605+05:30",
        //                                 "firstName": "MARQUITTA",
        //                                 "lastName": "BROCK",
        //                                 "sourceAddress": "3817 n brown ave  scottsdale,az 85251",
        //                                 "location": {
        //                                     "id": "4846612895498240",
        //                                     "created": "2023-04-18T09:38:23.596+05:30",
        //                                     "modified": "2023-04-18T09:38:23.605+05:30",
        //                                     "line1": "3817 N Brown Ave",
        //                                     "city": "Scottsdale",
        //                                     "state": "AZ",
        //                                     "zip": "85251",
        //                                     "locLat": 33.4920038,
        //                                     "locLng": -111.9242563,
        //                                     "locSource": "3817 n brown ave  scottsdale,az 85251"
        //                                 },
        //                                 "deaNumber": "MP1714460"
        //                             },
        //                             "pharmacy": {
        //                                 "id": "5585484709363712",
        //                                 "created": "2023-04-18T09:38:22.545+05:30",
        //                                 "modified": "2023-04-18T09:38:22.545+05:30",
        //                                 "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                                 "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                                 "location": {
        //                                     "id": "6148434662785024",
        //                                     "created": "2023-04-18T09:38:22.535+05:30",
        //                                     "modified": "2023-04-18T09:38:22.546+05:30",
        //                                     "line1": "3402 N Central Ave",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85012",
        //                                     "locLat": 33.4879117,
        //                                     "locLng": -112.0745667,
        //                                     "locSource": "3402 n central ave  phoenix,az 85012"
        //                                 },
        //                                 "deaNumber": "AW0572518"
        //                             },
        //                             "ndcCode": "00228298311",
        //                             "patientName": "ULA PECK",
        //                             "patientDOB": "02/04/1939",
        //                             "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                             "isExpectedPatient": true,
        //                             "ndcOriginalSource": "00228298311",
        //                             "productCodeQualifier": "ND",
        //                             "ourPharmacy": false,
        //                             "ourProvider": false,
        //                             "startDate": "2023-12-04T10:30:00.000+05:30",
        //                             "endDate": "2024-01-02T10:30:00.000+05:30"
        //                         },
        //                         {
        //                             "id": "4997331887849472",
        //                             "created": "2024-01-26T08:36:48.995+05:30",
        //                             "modified": "2024-01-26T08:36:49.758+05:30",
        //                             "patientId": "6007697174429696",
        //                             "classification": "STIMULANT",
        //                             "fillDate": "2023-11-15T10:30:00.000+05:30",
        //                             "fillDateString": "Nov 15",
        //                             "productName": "VYVANSE, 50 MG, CAPSULE",
        //                             "displayName": "VYVANSE, 50 MG, CAPSULE",
        //                             "strengthDesc": "50 MG",
        //                             "dosage": 50,
        //                             "prescribedQty": 30,
        //                             "prescribedLen": 30,
        //                             "dailyME": 0,
        //                             "writtenDate": "2023-09-22T10:30:00.000+05:30",
        //                             "writtenDateString": "Sep 22",
        //                             "nrCode": "R",
        //                             "refillCount": 0,
        //                             "rxNum": " ",
        //                             "isActive": false,
        //                             "isOurs": false,
        //                             "prescriber": {
        //                                 "id": "6535462755762176",
        //                                 "created": "2023-04-18T09:38:23.938+05:30",
        //                                 "modified": "2023-04-18T09:38:23.938+05:30",
        //                                 "firstName": "MARNA",
        //                                 "lastName": "WITT",
        //                                 "sourceAddress": "718 e union hills dr  phoenix,az 85024",
        //                                 "location": {
        //                                     "id": "5409562848919552",
        //                                     "created": "2023-04-18T09:38:23.930+05:30",
        //                                     "modified": "2023-04-18T09:38:23.939+05:30",
        //                                     "line1": "718 E Union Hills Dr",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85024",
        //                                     "locLat": 33.6561533,
        //                                     "locLng": -112.0637055,
        //                                     "locSource": "718 e union hills dr  phoenix,az 85024"
        //                                 },
        //                                 "deaNumber": "BS0422775"
        //                             },
        //                             "pharmacy": {
        //                                 "id": "5585484709363712",
        //                                 "created": "2023-04-18T09:38:22.545+05:30",
        //                                 "modified": "2023-04-18T09:38:22.545+05:30",
        //                                 "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                                 "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                                 "location": {
        //                                     "id": "6148434662785024",
        //                                     "created": "2023-04-18T09:38:22.535+05:30",
        //                                     "modified": "2023-04-18T09:38:22.546+05:30",
        //                                     "line1": "3402 N Central Ave",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85012",
        //                                     "locLat": 33.4879117,
        //                                     "locLng": -112.0745667,
        //                                     "locSource": "3402 n central ave  phoenix,az 85012"
        //                                 },
        //                                 "deaNumber": "AW0572518"
        //                             },
        //                             "ndcCode": "59417010510",
        //                             "patientName": "ULA PECK",
        //                             "patientDOB": "02/04/1939",
        //                             "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                             "isExpectedPatient": true,
        //                             "ndcOriginalSource": "59417010510",
        //                             "productCodeQualifier": "ND",
        //                             "ourPharmacy": false,
        //                             "ourProvider": false,
        //                             "startDate": "2023-11-15T10:30:00.000+05:30",
        //                             "endDate": "2023-12-14T10:30:00.000+05:30"
        //                         },
        //                         {
        //                             "id": "6123231794692096",
        //                             "created": "2024-01-26T08:36:48.996+05:30",
        //                             "modified": "2024-01-26T08:36:49.759+05:30",
        //                             "patientId": "6007697174429696",
        //                             "classification": "STIMULANT",
        //                             "fillDate": "2023-11-14T10:30:00.000+05:30",
        //                             "fillDateString": "Nov 14",
        //                             "productName": "DEXTROAMPHETAMINE SACCHARATE, AMPHETAMINE ASPARTATE, DEXTROAMPHETAMINE SULFATE AND AMPHETAMINE SULFA, 5 M",
        //                             "displayName": "DEXTROAMPHETAMINE SACCHARATE, AMPHE",
        //                             "strengthDesc": "5 MG;5 MG;5 MG;5 MG",
        //                             "dosage": 5,
        //                             "prescribedQty": 30,
        //                             "prescribedLen": 30,
        //                             "dailyME": 0,
        //                             "writtenDate": "2023-09-22T10:30:00.000+05:30",
        //                             "writtenDateString": "Sep 22",
        //                             "nrCode": "R",
        //                             "refillCount": 0,
        //                             "rxNum": " ",
        //                             "isActive": false,
        //                             "isOurs": false,
        //                             "prescriber": {
        //                                 "id": "5831775313985536",
        //                                 "created": "2023-04-18T09:38:24.255+05:30",
        //                                 "modified": "2023-04-18T09:38:24.255+05:30",
        //                                 "firstName": "MARNA",
        //                                 "lastName": "WITT",
        //                                 "sourceAddress": "765 e rosemonte dr  phoenix,az 85024",
        //                                 "location": {
        //                                     "id": "4705875407142912",
        //                                     "created": "2023-04-18T09:38:24.246+05:30",
        //                                     "modified": "2023-04-18T09:38:24.255+05:30",
        //                                     "line1": "765 E Rosemonte Dr",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85024",
        //                                     "locLat": 33.6567816,
        //                                     "locLng": -112.0631233,
        //                                     "locSource": "765 e rosemonte dr  phoenix,az 85024"
        //                                 },
        //                                 "deaNumber": "BS0422775"
        //                             },
        //                             "pharmacy": {
        //                                 "id": "5585484709363712",
        //                                 "created": "2023-04-18T09:38:22.545+05:30",
        //                                 "modified": "2023-04-18T09:38:22.545+05:30",
        //                                 "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                                 "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                                 "location": {
        //                                     "id": "6148434662785024",
        //                                     "created": "2023-04-18T09:38:22.535+05:30",
        //                                     "modified": "2023-04-18T09:38:22.546+05:30",
        //                                     "line1": "3402 N Central Ave",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85012",
        //                                     "locLat": 33.4879117,
        //                                     "locLng": -112.0745667,
        //                                     "locSource": "3402 n central ave  phoenix,az 85012"
        //                                 },
        //                                 "deaNumber": "AW0572518"
        //                             },
        //                             "ndcCode": "00555097302",
        //                             "patientName": "ULA PECK",
        //                             "patientDOB": "02/04/1939",
        //                             "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                             "isExpectedPatient": true,
        //                             "ndcOriginalSource": "00555097302",
        //                             "productCodeQualifier": "ND",
        //                             "ourPharmacy": false,
        //                             "ourProvider": false,
        //                             "startDate": "2023-11-14T10:30:00.000+05:30",
        //                             "endDate": "2023-12-13T10:30:00.000+05:30"
        //                         },
        //                         {
        //                             "id": "5560281841270784",
        //                             "created": "2024-01-26T08:36:48.996+05:30",
        //                             "modified": "2024-01-26T08:36:49.759+05:30",
        //                             "patientId": "6007697174429696",
        //                             "classification": "OPIOID",
        //                             "fillDate": "2023-11-04T10:30:00.000+05:30",
        //                             "fillDateString": "Nov 4",
        //                             "productName": "OXYCONTIN, 10 MG, TABLET, FILM COATED, EXTENDED RELEASE",
        //                             "displayName": "OXYCONTIN, 10 MG, TABLET, FILM COAT",
        //                             "strengthDesc": "10 MG",
        //                             "dosage": 10,
        //                             "prescribedQty": 60,
        //                             "prescribedLen": 30,
        //                             "dailyME": 30,
        //                             "writtenDate": "2023-10-29T10:30:00.000+05:30",
        //                             "writtenDateString": "Oct 29",
        //                             "nrCode": "R",
        //                             "refillCount": 0,
        //                             "rxNum": " ",
        //                             "isActive": false,
        //                             "isOurs": false,
        //                             "prescriber": {
        //                                 "id": "6394725267406848",
        //                                 "created": "2023-04-18T09:38:24.558+05:30",
        //                                 "modified": "2023-04-18T09:38:24.558+05:30",
        //                                 "firstName": "MARQUITTA",
        //                                 "lastName": "BROCK",
        //                                 "sourceAddress": "3806-3898 n brown ave  scottsdale,az 85251",
        //                                 "location": {
        //                                     "id": "5268825360564224",
        //                                     "created": "2023-04-18T09:38:24.551+05:30",
        //                                     "modified": "2023-04-18T09:38:24.559+05:30",
        //                                     "line1": "3806 N Brown Ave",
        //                                     "city": "Scottsdale",
        //                                     "state": "AZ",
        //                                     "zip": "85251",
        //                                     "locLat": 33.4916008,
        //                                     "locLng": -111.9247454,
        //                                     "locSource": "3806-3898 n brown ave  scottsdale,az 85251"
        //                                 },
        //                                 "deaNumber": "MP1714460"
        //                             },
        //                             "pharmacy": {
        //                                 "id": "5585484709363712",
        //                                 "created": "2023-04-18T09:38:22.545+05:30",
        //                                 "modified": "2023-04-18T09:38:22.545+05:30",
        //                                 "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                                 "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                                 "location": {
        //                                     "id": "6148434662785024",
        //                                     "created": "2023-04-18T09:38:22.535+05:30",
        //                                     "modified": "2023-04-18T09:38:22.546+05:30",
        //                                     "line1": "3402 N Central Ave",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85012",
        //                                     "locLat": 33.4879117,
        //                                     "locLng": -112.0745667,
        //                                     "locSource": "3402 n central ave  phoenix,az 85012"
        //                                 },
        //                                 "deaNumber": "AW0572518"
        //                             },
        //                             "ndcCode": "59011041010",
        //                             "patientName": "ULA PECK",
        //                             "patientDOB": "02/04/1939",
        //                             "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                             "isExpectedPatient": true,
        //                             "ndcOriginalSource": "59011041010",
        //                             "productCodeQualifier": "ND",
        //                             "ourPharmacy": false,
        //                             "ourProvider": false,
        //                             "startDate": "2023-11-04T10:30:00.000+05:30",
        //                             "endDate": "2023-12-03T10:30:00.000+05:30"
        //                         },
        //                         {
        //                             "id": "6686181748113408",
        //                             "created": "2024-01-26T08:36:48.996+05:30",
        //                             "modified": "2024-01-26T08:36:49.760+05:30",
        //                             "patientId": "6007697174429696",
        //                             "classification": "OPIOID",
        //                             "fillDate": "2023-11-04T10:30:00.000+05:30",
        //                             "fillDateString": "Nov 4",
        //                             "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                             "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                             "strengthDesc": "10 MG;325 MG",
        //                             "dosage": 10,
        //                             "prescribedQty": 105,
        //                             "prescribedLen": 30,
        //                             "dailyME": 53,
        //                             "writtenDate": "2023-10-29T10:30:00.000+05:30",
        //                             "writtenDateString": "Oct 29",
        //                             "nrCode": "R",
        //                             "refillCount": 0,
        //                             "rxNum": " ",
        //                             "isActive": false,
        //                             "isOurs": false,
        //                             "prescriber": {
        //                                 "id": "6113250290696192",
        //                                 "created": "2023-04-18T09:38:24.873+05:30",
        //                                 "modified": "2023-04-18T09:38:24.873+05:30",
        //                                 "firstName": "MARQUITTA",
        //                                 "lastName": "BROCK",
        //                                 "sourceAddress": "3752 e indian school rd  phoenix,az 85018",
        //                                 "location": {
        //                                     "id": "4987350383853568",
        //                                     "created": "2023-04-18T09:38:24.866+05:30",
        //                                     "modified": "2023-04-18T09:38:24.874+05:30",
        //                                     "line1": "3752 E Indian School Rd",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85018",
        //                                     "locLat": 33.4954195,
        //                                     "locLng": -112.0000832,
        //                                     "locSource": "3752 e indian school rd  phoenix,az 85018"
        //                                 },
        //                                 "deaNumber": "MP1714460"
        //                             },
        //                             "pharmacy": {
        //                                 "id": "5585484709363712",
        //                                 "created": "2023-04-18T09:38:22.545+05:30",
        //                                 "modified": "2023-04-18T09:38:22.545+05:30",
        //                                 "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                                 "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                                 "location": {
        //                                     "id": "6148434662785024",
        //                                     "created": "2023-04-18T09:38:22.535+05:30",
        //                                     "modified": "2023-04-18T09:38:22.546+05:30",
        //                                     "line1": "3402 N Central Ave",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85012",
        //                                     "locLat": 33.4879117,
        //                                     "locLng": -112.0745667,
        //                                     "locSource": "3402 n central ave  phoenix,az 85012"
        //                                 },
        //                                 "deaNumber": "AW0572518"
        //                             },
        //                             "ndcCode": "00228298311",
        //                             "patientName": "ULA PECK",
        //                             "patientDOB": "02/04/1939",
        //                             "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                             "isExpectedPatient": true,
        //                             "ndcOriginalSource": "00228298311",
        //                             "productCodeQualifier": "ND",
        //                             "ourPharmacy": false,
        //                             "ourProvider": false,
        //                             "startDate": "2023-11-04T10:30:00.000+05:30",
        //                             "endDate": "2023-12-03T10:30:00.000+05:30"
        //                         }
        //                     ],
        //                     "prescriptionIds": [
        //                         "4715856911138816",
        //                         "5841756817981440",
        //                         "5278806864560128",
        //                         "6404706771402752",
        //                         "4997331887849472",
        //                         "6123231794692096",
        //                         "5560281841270784",
        //                         "6686181748113408"
        //                     ],
        //                     "startDate": "2023-09-22T10:30:00.000+05:30",
        //                     "endDate": "2024-01-05T10:30:00.000+05:30",
        //                     "alertTypeString": "NotOurPrescription",
        //                     "alertSubtypeString": "Pharmacy"
        //                 },
        //                 {
        //                     "id": "6158416166780928",
        //                     "created": "2024-01-26T08:36:49.498+05:30",
        //                     "modified": "2024-01-26T08:36:49.498+05:30",
        //                     "patientId": "6007697174429696",
        //                     "pmpReportId": "5313991236648960",
        //                     "alertType": "WriteFillGap",
        //                     "priority": 800,
        //                     "narrative": " on VYVANSE, 50 MG, CAPSULE (30@50 MG ) from 09/22/2023 to 11/15/2023 (54 days)",
        //                     "typeString": "W/F Gap",
        //                     "prescriptions": [
        //                         {
        //                             "id": "4997331887849472",
        //                             "created": "2024-01-26T08:36:48.995+05:30",
        //                             "modified": "2024-01-26T08:36:49.758+05:30",
        //                             "patientId": "6007697174429696",
        //                             "classification": "STIMULANT",
        //                             "fillDate": "2023-11-15T10:30:00.000+05:30",
        //                             "fillDateString": "Nov 15",
        //                             "productName": "VYVANSE, 50 MG, CAPSULE",
        //                             "displayName": "VYVANSE, 50 MG, CAPSULE",
        //                             "strengthDesc": "50 MG",
        //                             "dosage": 50,
        //                             "prescribedQty": 30,
        //                             "prescribedLen": 30,
        //                             "dailyME": 0,
        //                             "writtenDate": "2023-09-22T10:30:00.000+05:30",
        //                             "writtenDateString": "Sep 22",
        //                             "nrCode": "R",
        //                             "refillCount": 0,
        //                             "rxNum": " ",
        //                             "isActive": false,
        //                             "isOurs": false,
        //                             "prescriber": {
        //                                 "id": "6535462755762176",
        //                                 "created": "2023-04-18T09:38:23.938+05:30",
        //                                 "modified": "2023-04-18T09:38:23.938+05:30",
        //                                 "firstName": "MARNA",
        //                                 "lastName": "WITT",
        //                                 "sourceAddress": "718 e union hills dr  phoenix,az 85024",
        //                                 "location": {
        //                                     "id": "5409562848919552",
        //                                     "created": "2023-04-18T09:38:23.930+05:30",
        //                                     "modified": "2023-04-18T09:38:23.939+05:30",
        //                                     "line1": "718 E Union Hills Dr",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85024",
        //                                     "locLat": 33.6561533,
        //                                     "locLng": -112.0637055,
        //                                     "locSource": "718 e union hills dr  phoenix,az 85024"
        //                                 },
        //                                 "deaNumber": "BS0422775"
        //                             },
        //                             "pharmacy": {
        //                                 "id": "5585484709363712",
        //                                 "created": "2023-04-18T09:38:22.545+05:30",
        //                                 "modified": "2023-04-18T09:38:22.545+05:30",
        //                                 "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                                 "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                                 "location": {
        //                                     "id": "6148434662785024",
        //                                     "created": "2023-04-18T09:38:22.535+05:30",
        //                                     "modified": "2023-04-18T09:38:22.546+05:30",
        //                                     "line1": "3402 N Central Ave",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85012",
        //                                     "locLat": 33.4879117,
        //                                     "locLng": -112.0745667,
        //                                     "locSource": "3402 n central ave  phoenix,az 85012"
        //                                 },
        //                                 "deaNumber": "AW0572518"
        //                             },
        //                             "ndcCode": "59417010510",
        //                             "patientName": "ULA PECK",
        //                             "patientDOB": "02/04/1939",
        //                             "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                             "isExpectedPatient": true,
        //                             "ndcOriginalSource": "59417010510",
        //                             "productCodeQualifier": "ND",
        //                             "ourPharmacy": false,
        //                             "ourProvider": false,
        //                             "startDate": "2023-11-15T10:30:00.000+05:30",
        //                             "endDate": "2023-12-14T10:30:00.000+05:30"
        //                         }
        //                     ],
        //                     "prescriptionIds": [
        //                         "4997331887849472"
        //                     ],
        //                     "startDate": "2023-09-22T10:30:00.000+05:30",
        //                     "endDate": "2023-11-15T10:30:00.000+05:30",
        //                     "alertTypeString": "WriteFillGap"
        //                 },
        //                 {
        //                     "id": "6211192724914176",
        //                     "created": "2024-01-26T08:36:49.499+05:30",
        //                     "modified": "2024-01-26T08:36:49.499+05:30",
        //                     "patientId": "6007697174429696",
        //                     "pmpReportId": "5313991236648960",
        //                     "description": "Prescriber: BROCK, MARQUITTA with DEA: MP1714460",
        //                     "alertType": "NotOurPrescription",
        //                     "alertSubtype": "Prescriber",
        //                     "priority": 100,
        //                     "narrative": "Prescriber: BROCK, MARQUITTA with DEA: MP1714460 for 3 Prescriptions.",
        //                     "typeString": "Not Our Prescriber",
        //                     "prescriptions": [
        //                         {
        //                             "id": "6404706771402752",
        //                             "created": "2024-01-26T08:36:48.995+05:30",
        //                             "modified": "2024-01-26T08:36:49.757+05:30",
        //                             "patientId": "6007697174429696",
        //                             "classification": "OPIOID",
        //                             "fillDate": "2023-12-04T10:30:00.000+05:30",
        //                             "fillDateString": "Dec 4",
        //                             "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                             "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                             "strengthDesc": "10 MG;325 MG",
        //                             "dosage": 10,
        //                             "prescribedQty": 105,
        //                             "prescribedLen": 30,
        //                             "dailyME": 53,
        //                             "writtenDate": "2023-12-03T10:30:00.000+05:30",
        //                             "writtenDateString": "Dec 3",
        //                             "nrCode": "R",
        //                             "refillCount": 0,
        //                             "rxNum": " ",
        //                             "isActive": false,
        //                             "isOurs": false,
        //                             "prescriber": {
        //                                 "id": "5972512802340864",
        //                                 "created": "2023-04-18T09:38:23.605+05:30",
        //                                 "modified": "2023-04-18T09:38:23.605+05:30",
        //                                 "firstName": "MARQUITTA",
        //                                 "lastName": "BROCK",
        //                                 "sourceAddress": "3817 n brown ave  scottsdale,az 85251",
        //                                 "location": {
        //                                     "id": "4846612895498240",
        //                                     "created": "2023-04-18T09:38:23.596+05:30",
        //                                     "modified": "2023-04-18T09:38:23.605+05:30",
        //                                     "line1": "3817 N Brown Ave",
        //                                     "city": "Scottsdale",
        //                                     "state": "AZ",
        //                                     "zip": "85251",
        //                                     "locLat": 33.4920038,
        //                                     "locLng": -111.9242563,
        //                                     "locSource": "3817 n brown ave  scottsdale,az 85251"
        //                                 },
        //                                 "deaNumber": "MP1714460"
        //                             },
        //                             "pharmacy": {
        //                                 "id": "5585484709363712",
        //                                 "created": "2023-04-18T09:38:22.545+05:30",
        //                                 "modified": "2023-04-18T09:38:22.545+05:30",
        //                                 "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                                 "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                                 "location": {
        //                                     "id": "6148434662785024",
        //                                     "created": "2023-04-18T09:38:22.535+05:30",
        //                                     "modified": "2023-04-18T09:38:22.546+05:30",
        //                                     "line1": "3402 N Central Ave",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85012",
        //                                     "locLat": 33.4879117,
        //                                     "locLng": -112.0745667,
        //                                     "locSource": "3402 n central ave  phoenix,az 85012"
        //                                 },
        //                                 "deaNumber": "AW0572518"
        //                             },
        //                             "ndcCode": "00228298311",
        //                             "patientName": "ULA PECK",
        //                             "patientDOB": "02/04/1939",
        //                             "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                             "isExpectedPatient": true,
        //                             "ndcOriginalSource": "00228298311",
        //                             "productCodeQualifier": "ND",
        //                             "ourPharmacy": false,
        //                             "ourProvider": false,
        //                             "startDate": "2023-12-04T10:30:00.000+05:30",
        //                             "endDate": "2024-01-02T10:30:00.000+05:30"
        //                         },
        //                         {
        //                             "id": "5560281841270784",
        //                             "created": "2024-01-26T08:36:48.996+05:30",
        //                             "modified": "2024-01-26T08:36:49.759+05:30",
        //                             "patientId": "6007697174429696",
        //                             "classification": "OPIOID",
        //                             "fillDate": "2023-11-04T10:30:00.000+05:30",
        //                             "fillDateString": "Nov 4",
        //                             "productName": "OXYCONTIN, 10 MG, TABLET, FILM COATED, EXTENDED RELEASE",
        //                             "displayName": "OXYCONTIN, 10 MG, TABLET, FILM COAT",
        //                             "strengthDesc": "10 MG",
        //                             "dosage": 10,
        //                             "prescribedQty": 60,
        //                             "prescribedLen": 30,
        //                             "dailyME": 30,
        //                             "writtenDate": "2023-10-29T10:30:00.000+05:30",
        //                             "writtenDateString": "Oct 29",
        //                             "nrCode": "R",
        //                             "refillCount": 0,
        //                             "rxNum": " ",
        //                             "isActive": false,
        //                             "isOurs": false,
        //                             "prescriber": {
        //                                 "id": "6394725267406848",
        //                                 "created": "2023-04-18T09:38:24.558+05:30",
        //                                 "modified": "2023-04-18T09:38:24.558+05:30",
        //                                 "firstName": "MARQUITTA",
        //                                 "lastName": "BROCK",
        //                                 "sourceAddress": "3806-3898 n brown ave  scottsdale,az 85251",
        //                                 "location": {
        //                                     "id": "5268825360564224",
        //                                     "created": "2023-04-18T09:38:24.551+05:30",
        //                                     "modified": "2023-04-18T09:38:24.559+05:30",
        //                                     "line1": "3806 N Brown Ave",
        //                                     "city": "Scottsdale",
        //                                     "state": "AZ",
        //                                     "zip": "85251",
        //                                     "locLat": 33.4916008,
        //                                     "locLng": -111.9247454,
        //                                     "locSource": "3806-3898 n brown ave  scottsdale,az 85251"
        //                                 },
        //                                 "deaNumber": "MP1714460"
        //                             },
        //                             "pharmacy": {
        //                                 "id": "5585484709363712",
        //                                 "created": "2023-04-18T09:38:22.545+05:30",
        //                                 "modified": "2023-04-18T09:38:22.545+05:30",
        //                                 "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                                 "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                                 "location": {
        //                                     "id": "6148434662785024",
        //                                     "created": "2023-04-18T09:38:22.535+05:30",
        //                                     "modified": "2023-04-18T09:38:22.546+05:30",
        //                                     "line1": "3402 N Central Ave",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85012",
        //                                     "locLat": 33.4879117,
        //                                     "locLng": -112.0745667,
        //                                     "locSource": "3402 n central ave  phoenix,az 85012"
        //                                 },
        //                                 "deaNumber": "AW0572518"
        //                             },
        //                             "ndcCode": "59011041010",
        //                             "patientName": "ULA PECK",
        //                             "patientDOB": "02/04/1939",
        //                             "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                             "isExpectedPatient": true,
        //                             "ndcOriginalSource": "59011041010",
        //                             "productCodeQualifier": "ND",
        //                             "ourPharmacy": false,
        //                             "ourProvider": false,
        //                             "startDate": "2023-11-04T10:30:00.000+05:30",
        //                             "endDate": "2023-12-03T10:30:00.000+05:30"
        //                         },
        //                         {
        //                             "id": "6686181748113408",
        //                             "created": "2024-01-26T08:36:48.996+05:30",
        //                             "modified": "2024-01-26T08:36:49.760+05:30",
        //                             "patientId": "6007697174429696",
        //                             "classification": "OPIOID",
        //                             "fillDate": "2023-11-04T10:30:00.000+05:30",
        //                             "fillDateString": "Nov 4",
        //                             "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                             "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                             "strengthDesc": "10 MG;325 MG",
        //                             "dosage": 10,
        //                             "prescribedQty": 105,
        //                             "prescribedLen": 30,
        //                             "dailyME": 53,
        //                             "writtenDate": "2023-10-29T10:30:00.000+05:30",
        //                             "writtenDateString": "Oct 29",
        //                             "nrCode": "R",
        //                             "refillCount": 0,
        //                             "rxNum": " ",
        //                             "isActive": false,
        //                             "isOurs": false,
        //                             "prescriber": {
        //                                 "id": "6113250290696192",
        //                                 "created": "2023-04-18T09:38:24.873+05:30",
        //                                 "modified": "2023-04-18T09:38:24.873+05:30",
        //                                 "firstName": "MARQUITTA",
        //                                 "lastName": "BROCK",
        //                                 "sourceAddress": "3752 e indian school rd  phoenix,az 85018",
        //                                 "location": {
        //                                     "id": "4987350383853568",
        //                                     "created": "2023-04-18T09:38:24.866+05:30",
        //                                     "modified": "2023-04-18T09:38:24.874+05:30",
        //                                     "line1": "3752 E Indian School Rd",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85018",
        //                                     "locLat": 33.4954195,
        //                                     "locLng": -112.0000832,
        //                                     "locSource": "3752 e indian school rd  phoenix,az 85018"
        //                                 },
        //                                 "deaNumber": "MP1714460"
        //                             },
        //                             "pharmacy": {
        //                                 "id": "5585484709363712",
        //                                 "created": "2023-04-18T09:38:22.545+05:30",
        //                                 "modified": "2023-04-18T09:38:22.545+05:30",
        //                                 "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                                 "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                                 "location": {
        //                                     "id": "6148434662785024",
        //                                     "created": "2023-04-18T09:38:22.535+05:30",
        //                                     "modified": "2023-04-18T09:38:22.546+05:30",
        //                                     "line1": "3402 N Central Ave",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85012",
        //                                     "locLat": 33.4879117,
        //                                     "locLng": -112.0745667,
        //                                     "locSource": "3402 n central ave  phoenix,az 85012"
        //                                 },
        //                                 "deaNumber": "AW0572518"
        //                             },
        //                             "ndcCode": "00228298311",
        //                             "patientName": "ULA PECK",
        //                             "patientDOB": "02/04/1939",
        //                             "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                             "isExpectedPatient": true,
        //                             "ndcOriginalSource": "00228298311",
        //                             "productCodeQualifier": "ND",
        //                             "ourPharmacy": false,
        //                             "ourProvider": false,
        //                             "startDate": "2023-11-04T10:30:00.000+05:30",
        //                             "endDate": "2023-12-03T10:30:00.000+05:30"
        //                         }
        //                     ],
        //                     "prescriptionIds": [
        //                         "6404706771402752",
        //                         "5560281841270784",
        //                         "6686181748113408"
        //                     ],
        //                     "startDate": "2023-10-29T10:30:00.000+05:30",
        //                     "endDate": "2023-12-04T10:30:00.000+05:30",
        //                     "alertTypeString": "NotOurPrescription",
        //                     "alertSubtypeString": "Prescriber"
        //                 },
        //                 {
        //                     "id": "6351930213269504",
        //                     "created": "2024-01-26T08:36:49.499+05:30",
        //                     "modified": "2024-01-26T08:36:49.499+05:30",
        //                     "patientId": "6007697174429696",
        //                     "pmpReportId": "5313991236648960",
        //                     "description": "OPIOID : 278",
        //                     "alertType": "HighDose",
        //                     "priority": 200,
        //                     "narrative": " from 12/30/2023 to 12/31/2023",
        //                     "typeString": "High Dose",
        //                     "prescriptions": [
        //                         {
        //                             "id": "5278806864560128",
        //                             "created": "2024-01-26T08:36:48.994+05:30",
        //                             "modified": "2024-01-26T08:36:49.756+05:30",
        //                             "patientId": "6007697174429696",
        //                             "classification": "OPIOID",
        //                             "fillDate": "2023-12-30T10:30:00.000+05:30",
        //                             "fillDateString": "Dec 30",
        //                             "productName": "OXYCODONE HYDROCHLORIDE, 5 MG, TABLET",
        //                             "displayName": "OXYCODONE HYDROCHLORIDE, 5 MG, TABL",
        //                             "strengthDesc": "5 MG",
        //                             "dosage": 5,
        //                             "prescribedQty": 60,
        //                             "prescribedLen": 2,
        //                             "dailyME": 225,
        //                             "writtenDate": "2023-12-26T10:30:00.000+05:30",
        //                             "writtenDateString": "Dec 26",
        //                             "nrCode": "R",
        //                             "refillCount": 0,
        //                             "rxNum": " ",
        //                             "isActive": false,
        //                             "isOurs": false,
        //                             "prescriber": {
        //                                 "id": "5128087872208896",
        //                                 "created": "2023-04-18T09:38:23.147+05:30",
        //                                 "modified": "2023-04-18T09:38:23.147+05:30",
        //                                 "firstName": "",
        //                                 "lastName": "",
        //                                 "sourceAddress": "5022 n 17th ave  phoenix,az 85015",
        //                                 "location": {
        //                                     "id": "5691037825630208",
        //                                     "created": "2023-04-18T09:38:23.141+05:30",
        //                                     "modified": "2023-04-18T09:38:23.148+05:30",
        //                                     "line1": "5022 N 17th Ave",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85015",
        //                                     "locLat": 33.5106346,
        //                                     "locLng": -112.0963149,
        //                                     "locSource": "5022 n 17th ave  phoenix,az 85015"
        //                                 },
        //                                 "deaNumber": "BC7786140"
        //                             },
        //                             "pharmacy": {
        //                                 "id": "5585484709363712",
        //                                 "created": "2023-04-18T09:38:22.545+05:30",
        //                                 "modified": "2023-04-18T09:38:22.545+05:30",
        //                                 "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                                 "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                                 "location": {
        //                                     "id": "6148434662785024",
        //                                     "created": "2023-04-18T09:38:22.535+05:30",
        //                                     "modified": "2023-04-18T09:38:22.546+05:30",
        //                                     "line1": "3402 N Central Ave",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85012",
        //                                     "locLat": 33.4879117,
        //                                     "locLng": -112.0745667,
        //                                     "locSource": "3402 n central ave  phoenix,az 85012"
        //                                 },
        //                                 "deaNumber": "AW0572518"
        //                             },
        //                             "ndcCode": "00406055201",
        //                             "patientName": "ULA PECK",
        //                             "patientDOB": "02/04/1939",
        //                             "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                             "isExpectedPatient": true,
        //                             "ndcOriginalSource": "00406055201",
        //                             "productCodeQualifier": "ND",
        //                             "ourPharmacy": false,
        //                             "ourProvider": false,
        //                             "startDate": "2023-12-30T10:30:00.000+05:30",
        //                             "endDate": "2023-12-31T10:30:00.000+05:30"
        //                         },
        //                         {
        //                             "id": "6404706771402752",
        //                             "created": "2024-01-26T08:36:48.995+05:30",
        //                             "modified": "2024-01-26T08:36:49.757+05:30",
        //                             "patientId": "6007697174429696",
        //                             "classification": "OPIOID",
        //                             "fillDate": "2023-12-04T10:30:00.000+05:30",
        //                             "fillDateString": "Dec 4",
        //                             "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                             "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                             "strengthDesc": "10 MG;325 MG",
        //                             "dosage": 10,
        //                             "prescribedQty": 105,
        //                             "prescribedLen": 30,
        //                             "dailyME": 53,
        //                             "writtenDate": "2023-12-03T10:30:00.000+05:30",
        //                             "writtenDateString": "Dec 3",
        //                             "nrCode": "R",
        //                             "refillCount": 0,
        //                             "rxNum": " ",
        //                             "isActive": false,
        //                             "isOurs": false,
        //                             "prescriber": {
        //                                 "id": "5972512802340864",
        //                                 "created": "2023-04-18T09:38:23.605+05:30",
        //                                 "modified": "2023-04-18T09:38:23.605+05:30",
        //                                 "firstName": "MARQUITTA",
        //                                 "lastName": "BROCK",
        //                                 "sourceAddress": "3817 n brown ave  scottsdale,az 85251",
        //                                 "location": {
        //                                     "id": "4846612895498240",
        //                                     "created": "2023-04-18T09:38:23.596+05:30",
        //                                     "modified": "2023-04-18T09:38:23.605+05:30",
        //                                     "line1": "3817 N Brown Ave",
        //                                     "city": "Scottsdale",
        //                                     "state": "AZ",
        //                                     "zip": "85251",
        //                                     "locLat": 33.4920038,
        //                                     "locLng": -111.9242563,
        //                                     "locSource": "3817 n brown ave  scottsdale,az 85251"
        //                                 },
        //                                 "deaNumber": "MP1714460"
        //                             },
        //                             "pharmacy": {
        //                                 "id": "5585484709363712",
        //                                 "created": "2023-04-18T09:38:22.545+05:30",
        //                                 "modified": "2023-04-18T09:38:22.545+05:30",
        //                                 "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                                 "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                                 "location": {
        //                                     "id": "6148434662785024",
        //                                     "created": "2023-04-18T09:38:22.535+05:30",
        //                                     "modified": "2023-04-18T09:38:22.546+05:30",
        //                                     "line1": "3402 N Central Ave",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85012",
        //                                     "locLat": 33.4879117,
        //                                     "locLng": -112.0745667,
        //                                     "locSource": "3402 n central ave  phoenix,az 85012"
        //                                 },
        //                                 "deaNumber": "AW0572518"
        //                             },
        //                             "ndcCode": "00228298311",
        //                             "patientName": "ULA PECK",
        //                             "patientDOB": "02/04/1939",
        //                             "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                             "isExpectedPatient": true,
        //                             "ndcOriginalSource": "00228298311",
        //                             "productCodeQualifier": "ND",
        //                             "ourPharmacy": false,
        //                             "ourProvider": false,
        //                             "startDate": "2023-12-04T10:30:00.000+05:30",
        //                             "endDate": "2024-01-02T10:30:00.000+05:30"
        //                         }
        //                     ],
        //                     "prescriptionIds": [
        //                         "5278806864560128",
        //                         "6404706771402752"
        //                     ],
        //                     "startDate": "2023-12-30T00:00:00.000+05:30",
        //                     "endDate": "2023-12-31T00:00:00.000+05:30",
        //                     "alertTypeString": "HighDose"
        //                 },
        //                 {
        //                     "id": "6439891143491584",
        //                     "created": "2024-01-26T08:36:49.498+05:30",
        //                     "modified": "2024-01-26T08:36:49.498+05:30",
        //                     "patientId": "6007697174429696",
        //                     "pmpReportId": "5313991236648960",
        //                     "alertType": "WriteFillGap",
        //                     "priority": 800,
        //                     "narrative": " on OXYCONTIN, 10 MG, TABLET, FILM COAT (60@10 MG ) from 12/23/2023 to 01/05/2024 (13 days)",
        //                     "typeString": "W/F Gap",
        //                     "prescriptions": [
        //                         {
        //                             "id": "4715856911138816",
        //                             "created": "2024-01-26T08:36:48.994+05:30",
        //                             "modified": "2024-01-26T08:36:49.754+05:30",
        //                             "patientId": "6007697174429696",
        //                             "classification": "OPIOID",
        //                             "fillDate": "2024-01-05T10:30:00.000+05:30",
        //                             "fillDateString": "Jan 5",
        //                             "productName": "OXYCONTIN, 10 MG, TABLET, FILM COATED, EXTENDED RELEASE",
        //                             "displayName": "OXYCONTIN, 10 MG, TABLET, FILM COAT",
        //                             "strengthDesc": "10 MG",
        //                             "dosage": 10,
        //                             "prescribedQty": 60,
        //                             "prescribedLen": 30,
        //                             "dailyME": 30,
        //                             "writtenDate": "2023-12-23T10:30:00.000+05:30",
        //                             "writtenDateString": "Dec 23",
        //                             "nrCode": "R",
        //                             "refillCount": 0,
        //                             "rxNum": " ",
        //                             "isActive": true,
        //                             "isOurs": false,
        //                             "prescriber": {
        //                                 "id": "5022534755942400",
        //                                 "created": "2023-04-18T09:38:22.275+05:30",
        //                                 "modified": "2023-04-18T09:38:22.275+05:30",
        //                                 "firstName": "TAWNYA",
        //                                 "lastName": "NUNEZ",
        //                                 "sourceAddress": "6989 n hayden rd  scottsdale,az 85250",
        //                                 "location": {
        //                                     "id": "6429909639495680",
        //                                     "created": "2023-04-18T09:38:22.264+05:30",
        //                                     "modified": "2023-04-18T09:38:22.277+05:30",
        //                                     "line1": "6989 N Hayden Rd",
        //                                     "city": "Scottsdale",
        //                                     "state": "AZ",
        //                                     "zip": "85250",
        //                                     "locLat": 33.5379566,
        //                                     "locLng": -111.9060417,
        //                                     "locSource": "6989 n hayden rd  scottsdale,az 85250"
        //                                 },
        //                                 "deaNumber": "MH3849176"
        //                             },
        //                             "pharmacy": {
        //                                 "id": "5585484709363712",
        //                                 "created": "2023-04-18T09:38:22.545+05:30",
        //                                 "modified": "2023-04-18T09:38:22.545+05:30",
        //                                 "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                                 "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                                 "location": {
        //                                     "id": "6148434662785024",
        //                                     "created": "2023-04-18T09:38:22.535+05:30",
        //                                     "modified": "2023-04-18T09:38:22.546+05:30",
        //                                     "line1": "3402 N Central Ave",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85012",
        //                                     "locLat": 33.4879117,
        //                                     "locLng": -112.0745667,
        //                                     "locSource": "3402 n central ave  phoenix,az 85012"
        //                                 },
        //                                 "deaNumber": "AW0572518"
        //                             },
        //                             "ndcCode": "59011041010",
        //                             "patientName": "ULA PECK",
        //                             "patientDOB": "02/04/1939",
        //                             "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                             "isExpectedPatient": true,
        //                             "ndcOriginalSource": "59011041010",
        //                             "productCodeQualifier": "ND",
        //                             "ourPharmacy": false,
        //                             "ourProvider": false,
        //                             "startDate": "2024-01-05T10:30:00.000+05:30",
        //                             "endDate": "2024-02-03T10:30:00.000+05:30"
        //                         }
        //                     ],
        //                     "prescriptionIds": [
        //                         "4715856911138816"
        //                     ],
        //                     "startDate": "2023-12-23T10:30:00.000+05:30",
        //                     "endDate": "2024-01-05T10:30:00.000+05:30",
        //                     "alertTypeString": "WriteFillGap"
        //                 },
        //                 {
        //                     "id": "6492667701624832",
        //                     "created": "2024-01-26T08:36:49.499+05:30",
        //                     "modified": "2024-01-26T08:36:49.499+05:30",
        //                     "patientId": "6007697174429696",
        //                     "pmpReportId": "5313991236648960",
        //                     "alertType": "Overlapping",
        //                     "alertSubtype": "Pharmacy",
        //                     "priority": 500,
        //                     "narrative": " from 10/28/2023 to 10/30/2023",
        //                     "typeString": "Overlapping Pharmacies",
        //                     "prescriptions": [
        //                         {
        //                             "id": "4539935050694656",
        //                             "created": "2024-01-26T08:36:48.997+05:30",
        //                             "modified": "2024-01-26T08:36:49.761+05:30",
        //                             "patientId": "6007697174429696",
        //                             "classification": "OPIOID",
        //                             "fillDate": "2023-10-05T10:30:00.000+05:30",
        //                             "fillDateString": "Oct 5",
        //                             "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                             "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                             "strengthDesc": "10 MG;325 MG",
        //                             "dosage": 10,
        //                             "prescribedQty": 105,
        //                             "prescribedLen": 30,
        //                             "dailyME": 53,
        //                             "writtenDate": "2023-10-01T10:30:00.000+05:30",
        //                             "writtenDateString": "Oct 1",
        //                             "nrCode": "R",
        //                             "refillCount": 0,
        //                             "rxNum": " ",
        //                             "isActive": false,
        //                             "isOurs": false,
        //                             "prescriber": {
        //                                 "id": "6676200244117504",
        //                                 "created": "2023-04-18T09:38:25.169+05:30",
        //                                 "modified": "2023-04-18T09:38:25.169+05:30",
        //                                 "firstName": "MARQUITTA",
        //                                 "lastName": "BROCK",
        //                                 "sourceAddress": "3749-3799 e indian school rd  phoenix,az 85018",
        //                                 "location": {
        //                                     "id": "5550300337274880",
        //                                     "created": "2023-04-18T09:38:25.162+05:30",
        //                                     "modified": "2023-04-18T09:38:25.169+05:30",
        //                                     "line1": "3749 E Indian School Rd",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85018",
        //                                     "locLat": 33.49479520000001,
        //                                     "locLng": -112.0001152,
        //                                     "locSource": "3749-3799 e indian school rd  phoenix,az 85018"
        //                                 },
        //                                 "deaNumber": "MP1714460"
        //                             },
        //                             "pharmacy": {
        //                                 "id": "5585484709363712",
        //                                 "created": "2023-04-18T09:38:22.545+05:30",
        //                                 "modified": "2023-04-18T09:38:22.545+05:30",
        //                                 "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                                 "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                                 "location": {
        //                                     "id": "6148434662785024",
        //                                     "created": "2023-04-18T09:38:22.535+05:30",
        //                                     "modified": "2023-04-18T09:38:22.546+05:30",
        //                                     "line1": "3402 N Central Ave",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85012",
        //                                     "locLat": 33.4879117,
        //                                     "locLng": -112.0745667,
        //                                     "locSource": "3402 n central ave  phoenix,az 85012"
        //                                 },
        //                                 "deaNumber": "AW0572518"
        //                             },
        //                             "ndcCode": "00228298311",
        //                             "patientName": "ULA PECK",
        //                             "patientDOB": "02/04/1939",
        //                             "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                             "isExpectedPatient": true,
        //                             "ndcOriginalSource": "00228298311",
        //                             "productCodeQualifier": "ND",
        //                             "ourPharmacy": false,
        //                             "ourProvider": false,
        //                             "startDate": "2023-10-05T10:30:00.000+05:30",
        //                             "endDate": "2023-11-03T10:30:00.000+05:30"
        //                         },
        //                         {
        //                             "id": "5665834957537280",
        //                             "created": "2024-01-26T08:36:48.997+05:30",
        //                             "modified": "2024-01-26T08:36:49.761+05:30",
        //                             "patientId": "6007697174429696",
        //                             "classification": "OPIOID",
        //                             "fillDate": "2023-10-01T10:30:00.000+05:30",
        //                             "fillDateString": "Oct 1",
        //                             "productName": "OPANA ER, 10 MG, TABLET, EXTENDED RELEASE",
        //                             "displayName": "OPANA ER, 10 MG, TABLET, EXTENDED R",
        //                             "strengthDesc": "10 MG",
        //                             "dosage": 10,
        //                             "prescribedQty": 60,
        //                             "prescribedLen": 30,
        //                             "dailyME": 60,
        //                             "writtenDate": "2023-10-01T10:30:00.000+05:30",
        //                             "writtenDateString": "Oct 1",
        //                             "nrCode": "R",
        //                             "refillCount": 0,
        //                             "rxNum": " ",
        //                             "isActive": false,
        //                             "isOurs": false,
        //                             "prescriber": {
        //                                 "id": "5761406569807872",
        //                                 "created": "2023-04-18T09:38:25.451+05:30",
        //                                 "modified": "2023-04-18T09:38:25.451+05:30",
        //                                 "firstName": "MADIE",
        //                                 "lastName": "WHITNEY",
        //                                 "sourceAddress": "3380 n scottsdale rd  scottsdale,az 85251",
        //                                 "location": {
        //                                     "id": "4635506662965248",
        //                                     "created": "2023-04-18T09:38:25.444+05:30",
        //                                     "modified": "2023-04-18T09:38:25.451+05:30",
        //                                     "line1": "3380 N Scottsdale Rd",
        //                                     "city": "Scottsdale",
        //                                     "state": "AZ",
        //                                     "zip": "85251",
        //                                     "locLat": 33.48733199999999,
        //                                     "locLng": -111.9270596,
        //                                     "locSource": "3380 n scottsdale rd  scottsdale,az 85251"
        //                                 },
        //                                 "deaNumber": "BD7113234"
        //                             },
        //                             "pharmacy": {
        //                                 "id": "6324356523229184",
        //                                 "created": "2023-04-18T09:38:25.757+05:30",
        //                                 "modified": "2023-04-18T09:38:25.757+05:30",
        //                                 "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                                 "sourceAddress": "5895 w. peoria avenue  glendale,az 85302",
        //                                 "location": {
        //                                     "id": "5198456616386560",
        //                                     "created": "2023-04-18T09:38:25.748+05:30",
        //                                     "modified": "2023-04-18T09:38:25.757+05:30",
        //                                     "line1": "5895 W Peoria Ave",
        //                                     "city": "Glendale",
        //                                     "state": "AZ",
        //                                     "zip": "85302",
        //                                     "locLat": 33.5812761,
        //                                     "locLng": -112.1854129,
        //                                     "locSource": "5895 w. peoria avenue  glendale,az 85302"
        //                                 },
        //                                 "deaNumber": "BW5452228"
        //                             },
        //                             "ndcCode": "63481081460",
        //                             "patientName": "ULA PECK",
        //                             "patientDOB": "02/04/1939",
        //                             "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                             "isExpectedPatient": true,
        //                             "ndcOriginalSource": "63481081460",
        //                             "productCodeQualifier": "ND",
        //                             "ourPharmacy": false,
        //                             "ourProvider": false,
        //                             "startDate": "2023-10-01T10:30:00.000+05:30",
        //                             "endDate": "2023-10-30T10:30:00.000+05:30"
        //                         }
        //                     ],
        //                     "prescriptionIds": [
        //                         "4539935050694656",
        //                         "5665834957537280"
        //                     ],
        //                     "startDate": "2023-10-28T00:00:00.000+05:30",
        //                     "endDate": "2023-10-30T00:00:00.000+05:30",
        //                     "alertTypeString": "Overlapping",
        //                     "alertSubtypeString": "Pharmacy"
        //                 },
        //                 {
        //                     "id": "6721366120202240",
        //                     "created": "2024-01-26T08:36:49.498+05:30",
        //                     "modified": "2024-01-26T08:36:49.498+05:30",
        //                     "patientId": "6007697174429696",
        //                     "pmpReportId": "5313991236648960",
        //                     "alertType": "WriteFillGap",
        //                     "priority": 800,
        //                     "narrative": " on OXYCONTIN, 10 MG, TABLET, FILM COAT (60@10 MG ) from 10/29/2023 to 11/04/2023 (6 days)",
        //                     "typeString": "W/F Gap",
        //                     "prescriptions": [
        //                         {
        //                             "id": "5560281841270784",
        //                             "created": "2024-01-26T08:36:48.996+05:30",
        //                             "modified": "2024-01-26T08:36:49.759+05:30",
        //                             "patientId": "6007697174429696",
        //                             "classification": "OPIOID",
        //                             "fillDate": "2023-11-04T10:30:00.000+05:30",
        //                             "fillDateString": "Nov 4",
        //                             "productName": "OXYCONTIN, 10 MG, TABLET, FILM COATED, EXTENDED RELEASE",
        //                             "displayName": "OXYCONTIN, 10 MG, TABLET, FILM COAT",
        //                             "strengthDesc": "10 MG",
        //                             "dosage": 10,
        //                             "prescribedQty": 60,
        //                             "prescribedLen": 30,
        //                             "dailyME": 30,
        //                             "writtenDate": "2023-10-29T10:30:00.000+05:30",
        //                             "writtenDateString": "Oct 29",
        //                             "nrCode": "R",
        //                             "refillCount": 0,
        //                             "rxNum": " ",
        //                             "isActive": false,
        //                             "isOurs": false,
        //                             "prescriber": {
        //                                 "id": "6394725267406848",
        //                                 "created": "2023-04-18T09:38:24.558+05:30",
        //                                 "modified": "2023-04-18T09:38:24.558+05:30",
        //                                 "firstName": "MARQUITTA",
        //                                 "lastName": "BROCK",
        //                                 "sourceAddress": "3806-3898 n brown ave  scottsdale,az 85251",
        //                                 "location": {
        //                                     "id": "5268825360564224",
        //                                     "created": "2023-04-18T09:38:24.551+05:30",
        //                                     "modified": "2023-04-18T09:38:24.559+05:30",
        //                                     "line1": "3806 N Brown Ave",
        //                                     "city": "Scottsdale",
        //                                     "state": "AZ",
        //                                     "zip": "85251",
        //                                     "locLat": 33.4916008,
        //                                     "locLng": -111.9247454,
        //                                     "locSource": "3806-3898 n brown ave  scottsdale,az 85251"
        //                                 },
        //                                 "deaNumber": "MP1714460"
        //                             },
        //                             "pharmacy": {
        //                                 "id": "5585484709363712",
        //                                 "created": "2023-04-18T09:38:22.545+05:30",
        //                                 "modified": "2023-04-18T09:38:22.545+05:30",
        //                                 "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                                 "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                                 "location": {
        //                                     "id": "6148434662785024",
        //                                     "created": "2023-04-18T09:38:22.535+05:30",
        //                                     "modified": "2023-04-18T09:38:22.546+05:30",
        //                                     "line1": "3402 N Central Ave",
        //                                     "city": "Phoenix",
        //                                     "state": "AZ",
        //                                     "zip": "85012",
        //                                     "locLat": 33.4879117,
        //                                     "locLng": -112.0745667,
        //                                     "locSource": "3402 n central ave  phoenix,az 85012"
        //                                 },
        //                                 "deaNumber": "AW0572518"
        //                             },
        //                             "ndcCode": "59011041010",
        //                             "patientName": "ULA PECK",
        //                             "patientDOB": "02/04/1939",
        //                             "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                             "isExpectedPatient": true,
        //                             "ndcOriginalSource": "59011041010",
        //                             "productCodeQualifier": "ND",
        //                             "ourPharmacy": false,
        //                             "ourProvider": false,
        //                             "startDate": "2023-11-04T10:30:00.000+05:30",
        //                             "endDate": "2023-12-03T10:30:00.000+05:30"
        //                         }
        //                     ],
        //                     "prescriptionIds": [
        //                         "5560281841270784"
        //                     ],
        //                     "startDate": "2023-10-29T10:30:00.000+05:30",
        //                     "endDate": "2023-11-04T10:30:00.000+05:30",
        //                     "alertTypeString": "WriteFillGap"
        //                 }
        //             ],
        //             "pmpReportId": "5313991236648960",
        //             "hasUnexpectedPatients": false,
        //             "outsideProviders": [
        //                 "4565137918787584",
        //                 "4661894942031872",
        //                 "4732263686209536",
        //                 "5022534755942400",
        //                 "4943369918742528",
        //                 "5013738662920192",
        //                 "5128087872208896",
        //                 "5295213639630848",
        //                 "5506319872163840",
        //                 "5435951127986176",
        //                 "5831775313985536",
        //                 "5761406569807872",
        //                 "5902144058163200",
        //                 "5647057360519168",
        //                 "5717426104696832",
        //                 "5972512802340864",
        //                 "6113250290696192",
        //                 "6042881546518528",
        //                 "5998901081407488",
        //                 "6394725267406848",
        //                 "6465094011584512",
        //                 "6210007313940480",
        //                 "6280376058118144",
        //                 "6535462755762176",
        //                 "6676200244117504",
        //                 "6605831499939840",
        //                 "6746568988295168",
        //                 "6632219779006464"
        //             ],
        //             "outsidePharmacies": [
        //                 "5224844895453184",
        //                 "5585484709363712",
        //                 "6183619034873856",
        //                 "5928532337229824",
        //                 "6324356523229184"
        //             ]
        //         },
        //         "practice": {
        //             "id": "4634407151337472",
        //             "created": "2023-04-17T10:03:27.879+05:30",
        //             "modified": "2024-01-26T10:09:08.701+05:30",
        //             "practiceName": "Wright State",
        //             "practiceType": "PR",
        //             "address": {
        //                 "id": "6675100732489728",
        //                 "created": "2023-04-17T10:03:27.850+05:30",
        //                 "modified": "2024-01-26T10:09:08.701+05:30",
        //                 "line1": "725 University Blvd",
        //                 "city": "Fairborn",
        //                 "state": "OH",
        //                 "zip": "45324",
        //                 "locLat": 39.7890131,
        //                 "locLng": -84.0499837,
        //                 "locSource": "725 University Blvd. Dayton, OH 45435"
        //             },
        //             "facilityName": "Wright State",
        //             "facilityNPI": "1114920329",
        //             "medThreshold": 90,
        //             "alertDaysBack": 90,
        //             "alertWriteFillGap": 5,
        //             "expectedPatientsPerNight": 0,
        //             "wizardProgress": -1,
        //             "gatewayAccountString": "wrightstate:wbvDZkjK$5@1",
        //             "defaultPMPState": "OH",
        //             "showMap": true,
        //             "checkForEncounterStart": false,
        //             "checkForEncounterEnd": false,
        //             "askIfPrescribedAtEncounterEnd": false,
        //             "askIfExpectedAtEncounterEnd": false,
        //             "askIfAffectedAtEncounterEnd": false,
        //             "showCurrentDayAppointmentsOnly": false,
        //             "lastApptFileUpload": {
        //                 "dayOfMonth": 26,
        //                 "dayOfWeek": 5,
        //                 "era": 1,
        //                 "year": 2024,
        //                 "dayOfYear": 26,
        //                 "weekOfWeekyear": 4,
        //                 "chronology": {
        //                     "zone": {
        //                         "fixed": true,
        //                         "id": "UTC"
        //                     }
        //                 },
        //                 "centuryOfEra": 20,
        //                 "yearOfCentury": 24,
        //                 "weekyear": 2024,
        //                 "yearOfEra": 2024,
        //                 "monthOfYear": 1,
        //                 "fields": [
        //                     {
        //                         "leapDurationField": {
        //                             "precise": true,
        //                             "unitMillis": "86400000",
        //                             "name": "days",
        //                             "type": {
        //                                 "name": "days"
        //                             },
        //                             "supported": true
        //                         },
        //                         "lenient": false,
        //                         "minimumValue": -292275054,
        //                         "maximumValue": 292278993,
        //                         "durationField": {
        //                             "precise": false,
        //                             "unitMillis": "31556952000",
        //                             "name": "years",
        //                             "type": {
        //                                 "name": "years"
        //                             },
        //                             "supported": true
        //                         },
        //                         "name": "year",
        //                         "type": {
        //                             "durationType": {
        //                                 "name": "years"
        //                             },
        //                             "name": "year"
        //                         },
        //                         "supported": true
        //                     },
        //                     {
        //                         "rangeDurationField": {
        //                             "precise": false,
        //                             "unitMillis": "31556952000",
        //                             "name": "years",
        //                             "type": {
        //                                 "name": "years"
        //                             },
        //                             "supported": true
        //                         },
        //                         "leapDurationField": {
        //                             "precise": true,
        //                             "unitMillis": "86400000",
        //                             "name": "days",
        //                             "type": {
        //                                 "name": "days"
        //                             },
        //                             "supported": true
        //                         },
        //                         "lenient": false,
        //                         "minimumValue": 1,
        //                         "maximumValue": 12,
        //                         "durationField": {
        //                             "precise": false,
        //                             "unitMillis": "2629746000",
        //                             "name": "months",
        //                             "type": {
        //                                 "name": "months"
        //                             },
        //                             "supported": true
        //                         },
        //                         "name": "monthOfYear",
        //                         "type": {
        //                             "durationType": {
        //                                 "name": "months"
        //                             },
        //                             "rangeDurationType": {
        //                                 "name": "years"
        //                             },
        //                             "name": "monthOfYear"
        //                         },
        //                         "supported": true
        //                     },
        //                     {
        //                         "rangeDurationField": {
        //                             "precise": false,
        //                             "unitMillis": "2629746000",
        //                             "name": "months",
        //                             "type": {
        //                                 "name": "months"
        //                             },
        //                             "supported": true
        //                         },
        //                         "minimumValue": 1,
        //                         "maximumValue": 31,
        //                         "lenient": false,
        //                         "durationField": {
        //                             "precise": true,
        //                             "unitMillis": "86400000",
        //                             "name": "days",
        //                             "type": {
        //                                 "name": "days"
        //                             },
        //                             "supported": true
        //                         },
        //                         "unitMillis": "86400000",
        //                         "name": "dayOfMonth",
        //                         "type": {
        //                             "durationType": {
        //                                 "name": "days"
        //                             },
        //                             "rangeDurationType": {
        //                                 "name": "months"
        //                             },
        //                             "name": "dayOfMonth"
        //                         },
        //                         "supported": true
        //                     }
        //                 ],
        //                 "values": [
        //                     2024,
        //                     1,
        //                     26
        //                 ],
        //                 "fieldTypes": [
        //                     {
        //                         "durationType": {
        //                             "name": "years"
        //                         },
        //                         "name": "year"
        //                     },
        //                     {
        //                         "durationType": {
        //                             "name": "months"
        //                         },
        //                         "rangeDurationType": {
        //                             "name": "years"
        //                         },
        //                         "name": "monthOfYear"
        //                     },
        //                     {
        //                         "durationType": {
        //                             "name": "days"
        //                         },
        //                         "rangeDurationType": {
        //                             "name": "months"
        //                         },
        //                         "name": "dayOfMonth"
        //                     }
        //                 ]
        //             },
        //             "autoSavePastReport": true,
        //             "usesEHRIntegration": true,
        //             "usesRedox": true,
        //             "usesScheduleIntegration": false,
        //             "scheduleIntegrationType": "",
        //             "useLegacyPdf": false,
        //             "athenaPracticeId": "1959153",
        //             "automaticLogoutTimer": 15,
        //             "automaticRefreshTimer": 5
        //         },
        //         "requester": "V, Roman",
        //         "appointments": [
        //             {
        //                 "id": "4856594399494144",
        //                 "created": "2024-01-26T08:36:42.119+05:30",
        //                 "modified": "2024-01-26T11:07:48.312+05:30",
        //                 "patientLast": "PECK",
        //                 "patientFirst": "ULA",
        //                 "patientDOB": {
        //                     "dayOfMonth": 4,
        //                     "dayOfWeek": 6,
        //                     "era": 1,
        //                     "year": 1939,
        //                     "dayOfYear": 35,
        //                     "weekOfWeekyear": 5,
        //                     "chronology": {
        //                         "zone": {
        //                             "fixed": true,
        //                             "id": "UTC"
        //                         }
        //                     },
        //                     "centuryOfEra": 19,
        //                     "yearOfCentury": 39,
        //                     "weekyear": 1939,
        //                     "yearOfEra": 1939,
        //                     "monthOfYear": 2,
        //                     "fields": [
        //                         {
        //                             "leapDurationField": {
        //                                 "precise": true,
        //                                 "unitMillis": "86400000",
        //                                 "name": "days",
        //                                 "type": {
        //                                     "name": "days"
        //                                 },
        //                                 "supported": true
        //                             },
        //                             "lenient": false,
        //                             "minimumValue": -292275054,
        //                             "maximumValue": 292278993,
        //                             "durationField": {
        //                                 "precise": false,
        //                                 "unitMillis": "31556952000",
        //                                 "name": "years",
        //                                 "type": {
        //                                     "name": "years"
        //                                 },
        //                                 "supported": true
        //                             },
        //                             "name": "year",
        //                             "type": {
        //                                 "durationType": {
        //                                     "name": "years"
        //                                 },
        //                                 "name": "year"
        //                             },
        //                             "supported": true
        //                         },
        //                         {
        //                             "rangeDurationField": {
        //                                 "precise": false,
        //                                 "unitMillis": "31556952000",
        //                                 "name": "years",
        //                                 "type": {
        //                                     "name": "years"
        //                                 },
        //                                 "supported": true
        //                             },
        //                             "leapDurationField": {
        //                                 "precise": true,
        //                                 "unitMillis": "86400000",
        //                                 "name": "days",
        //                                 "type": {
        //                                     "name": "days"
        //                                 },
        //                                 "supported": true
        //                             },
        //                             "lenient": false,
        //                             "minimumValue": 1,
        //                             "maximumValue": 12,
        //                             "durationField": {
        //                                 "precise": false,
        //                                 "unitMillis": "2629746000",
        //                                 "name": "months",
        //                                 "type": {
        //                                     "name": "months"
        //                                 },
        //                                 "supported": true
        //                             },
        //                             "name": "monthOfYear",
        //                             "type": {
        //                                 "durationType": {
        //                                     "name": "months"
        //                                 },
        //                                 "rangeDurationType": {
        //                                     "name": "years"
        //                                 },
        //                                 "name": "monthOfYear"
        //                             },
        //                             "supported": true
        //                         },
        //                         {
        //                             "rangeDurationField": {
        //                                 "precise": false,
        //                                 "unitMillis": "2629746000",
        //                                 "name": "months",
        //                                 "type": {
        //                                     "name": "months"
        //                                 },
        //                                 "supported": true
        //                             },
        //                             "minimumValue": 1,
        //                             "maximumValue": 31,
        //                             "lenient": false,
        //                             "durationField": {
        //                                 "precise": true,
        //                                 "unitMillis": "86400000",
        //                                 "name": "days",
        //                                 "type": {
        //                                     "name": "days"
        //                                 },
        //                                 "supported": true
        //                             },
        //                             "unitMillis": "86400000",
        //                             "name": "dayOfMonth",
        //                             "type": {
        //                                 "durationType": {
        //                                     "name": "days"
        //                                 },
        //                                 "rangeDurationType": {
        //                                     "name": "months"
        //                                 },
        //                                 "name": "dayOfMonth"
        //                             },
        //                             "supported": true
        //                         }
        //                     ],
        //                     "values": [
        //                         1939,
        //                         2,
        //                         4
        //                     ],
        //                     "fieldTypes": [
        //                         {
        //                             "durationType": {
        //                                 "name": "years"
        //                             },
        //                             "name": "year"
        //                         },
        //                         {
        //                             "durationType": {
        //                                 "name": "months"
        //                             },
        //                             "rangeDurationType": {
        //                                 "name": "years"
        //                             },
        //                             "name": "monthOfYear"
        //                         },
        //                         {
        //                             "durationType": {
        //                                 "name": "days"
        //                             },
        //                             "rangeDurationType": {
        //                                 "name": "months"
        //                             },
        //                             "name": "dayOfMonth"
        //                         }
        //                     ]
        //                 },
        //                 "patientDOBString": "02/04/1939",
        //                 "patientZipString": "88789",
        //                 "providerLast": "V",
        //                 "providerFirst": "Roman",
        //                 "appointmentDate": {
        //                     "dayOfMonth": 26,
        //                     "dayOfWeek": 5,
        //                     "era": 1,
        //                     "year": 2024,
        //                     "dayOfYear": 26,
        //                     "weekOfWeekyear": 4,
        //                     "chronology": {
        //                         "zone": {
        //                             "fixed": true,
        //                             "id": "UTC"
        //                         }
        //                     },
        //                     "centuryOfEra": 20,
        //                     "yearOfCentury": 24,
        //                     "weekyear": 2024,
        //                     "yearOfEra": 2024,
        //                     "monthOfYear": 1,
        //                     "fields": [
        //                         {
        //                             "leapDurationField": {
        //                                 "precise": true,
        //                                 "unitMillis": "86400000",
        //                                 "name": "days",
        //                                 "type": {
        //                                     "name": "days"
        //                                 },
        //                                 "supported": true
        //                             },
        //                             "lenient": false,
        //                             "minimumValue": -292275054,
        //                             "maximumValue": 292278993,
        //                             "durationField": {
        //                                 "precise": false,
        //                                 "unitMillis": "31556952000",
        //                                 "name": "years",
        //                                 "type": {
        //                                     "name": "years"
        //                                 },
        //                                 "supported": true
        //                             },
        //                             "name": "year",
        //                             "type": {
        //                                 "durationType": {
        //                                     "name": "years"
        //                                 },
        //                                 "name": "year"
        //                             },
        //                             "supported": true
        //                         },
        //                         {
        //                             "rangeDurationField": {
        //                                 "precise": false,
        //                                 "unitMillis": "31556952000",
        //                                 "name": "years",
        //                                 "type": {
        //                                     "name": "years"
        //                                 },
        //                                 "supported": true
        //                             },
        //                             "leapDurationField": {
        //                                 "precise": true,
        //                                 "unitMillis": "86400000",
        //                                 "name": "days",
        //                                 "type": {
        //                                     "name": "days"
        //                                 },
        //                                 "supported": true
        //                             },
        //                             "lenient": false,
        //                             "minimumValue": 1,
        //                             "maximumValue": 12,
        //                             "durationField": {
        //                                 "precise": false,
        //                                 "unitMillis": "2629746000",
        //                                 "name": "months",
        //                                 "type": {
        //                                     "name": "months"
        //                                 },
        //                                 "supported": true
        //                             },
        //                             "name": "monthOfYear",
        //                             "type": {
        //                                 "durationType": {
        //                                     "name": "months"
        //                                 },
        //                                 "rangeDurationType": {
        //                                     "name": "years"
        //                                 },
        //                                 "name": "monthOfYear"
        //                             },
        //                             "supported": true
        //                         },
        //                         {
        //                             "rangeDurationField": {
        //                                 "precise": false,
        //                                 "unitMillis": "2629746000",
        //                                 "name": "months",
        //                                 "type": {
        //                                     "name": "months"
        //                                 },
        //                                 "supported": true
        //                             },
        //                             "minimumValue": 1,
        //                             "maximumValue": 31,
        //                             "lenient": false,
        //                             "durationField": {
        //                                 "precise": true,
        //                                 "unitMillis": "86400000",
        //                                 "name": "days",
        //                                 "type": {
        //                                     "name": "days"
        //                                 },
        //                                 "supported": true
        //                             },
        //                             "unitMillis": "86400000",
        //                             "name": "dayOfMonth",
        //                             "type": {
        //                                 "durationType": {
        //                                     "name": "days"
        //                                 },
        //                                 "rangeDurationType": {
        //                                     "name": "months"
        //                                 },
        //                                 "name": "dayOfMonth"
        //                             },
        //                             "supported": true
        //                         }
        //                     ],
        //                     "values": [
        //                         2024,
        //                         1,
        //                         26
        //                     ],
        //                     "fieldTypes": [
        //                         {
        //                             "durationType": {
        //                                 "name": "years"
        //                             },
        //                             "name": "year"
        //                         },
        //                         {
        //                             "durationType": {
        //                                 "name": "months"
        //                             },
        //                             "rangeDurationType": {
        //                                 "name": "years"
        //                             },
        //                             "name": "monthOfYear"
        //                         },
        //                         {
        //                             "durationType": {
        //                                 "name": "days"
        //                             },
        //                             "rangeDurationType": {
        //                                 "name": "months"
        //                             },
        //                             "name": "dayOfMonth"
        //                         }
        //                     ]
        //                 },
        //                 "apptDate": "2024-01-26T00:00:00.000+05:30",
        //                 "appointmentDateString": "01/26/2024",
        //                 "appointmentTime": "08:36",
        //                 "scheduledTime": {
        //                     "dayOfMonth": 26,
        //                     "dayOfWeek": 5,
        //                     "era": 1,
        //                     "year": 2024,
        //                     "dayOfYear": 26,
        //                     "weekOfWeekyear": 4,
        //                     "secondOfMinute": 0,
        //                     "millisOfSecond": 0,
        //                     "chronology": {
        //                         "zone": {
        //                             "fixed": true,
        //                             "id": "UTC"
        //                         }
        //                     },
        //                     "minuteOfHour": 36,
        //                     "centuryOfEra": 20,
        //                     "yearOfCentury": 24,
        //                     "millisOfDay": 30960000,
        //                     "weekyear": 2024,
        //                     "hourOfDay": 8,
        //                     "yearOfEra": 2024,
        //                     "monthOfYear": 1,
        //                     "fields": [
        //                         {
        //                             "leapDurationField": {
        //                                 "precise": true,
        //                                 "unitMillis": "86400000",
        //                                 "name": "days",
        //                                 "type": {
        //                                     "name": "days"
        //                                 },
        //                                 "supported": true
        //                             },
        //                             "lenient": false,
        //                             "minimumValue": -292275054,
        //                             "maximumValue": 292278993,
        //                             "durationField": {
        //                                 "precise": false,
        //                                 "unitMillis": "31556952000",
        //                                 "name": "years",
        //                                 "type": {
        //                                     "name": "years"
        //                                 },
        //                                 "supported": true
        //                             },
        //                             "name": "year",
        //                             "type": {
        //                                 "durationType": {
        //                                     "name": "years"
        //                                 },
        //                                 "name": "year"
        //                             },
        //                             "supported": true
        //                         },
        //                         {
        //                             "rangeDurationField": {
        //                                 "precise": false,
        //                                 "unitMillis": "31556952000",
        //                                 "name": "years",
        //                                 "type": {
        //                                     "name": "years"
        //                                 },
        //                                 "supported": true
        //                             },
        //                             "leapDurationField": {
        //                                 "precise": true,
        //                                 "unitMillis": "86400000",
        //                                 "name": "days",
        //                                 "type": {
        //                                     "name": "days"
        //                                 },
        //                                 "supported": true
        //                             },
        //                             "lenient": false,
        //                             "minimumValue": 1,
        //                             "maximumValue": 12,
        //                             "durationField": {
        //                                 "precise": false,
        //                                 "unitMillis": "2629746000",
        //                                 "name": "months",
        //                                 "type": {
        //                                     "name": "months"
        //                                 },
        //                                 "supported": true
        //                             },
        //                             "name": "monthOfYear",
        //                             "type": {
        //                                 "durationType": {
        //                                     "name": "months"
        //                                 },
        //                                 "rangeDurationType": {
        //                                     "name": "years"
        //                                 },
        //                                 "name": "monthOfYear"
        //                             },
        //                             "supported": true
        //                         },
        //                         {
        //                             "rangeDurationField": {
        //                                 "precise": false,
        //                                 "unitMillis": "2629746000",
        //                                 "name": "months",
        //                                 "type": {
        //                                     "name": "months"
        //                                 },
        //                                 "supported": true
        //                             },
        //                             "minimumValue": 1,
        //                             "maximumValue": 31,
        //                             "lenient": false,
        //                             "durationField": {
        //                                 "precise": true,
        //                                 "unitMillis": "86400000",
        //                                 "name": "days",
        //                                 "type": {
        //                                     "name": "days"
        //                                 },
        //                                 "supported": true
        //                             },
        //                             "unitMillis": "86400000",
        //                             "name": "dayOfMonth",
        //                             "type": {
        //                                 "durationType": {
        //                                     "name": "days"
        //                                 },
        //                                 "rangeDurationType": {
        //                                     "name": "months"
        //                                 },
        //                                 "name": "dayOfMonth"
        //                             },
        //                             "supported": true
        //                         },
        //                         {
        //                             "rangeDurationField": {
        //                                 "precise": true,
        //                                 "unitMillis": "86400000",
        //                                 "name": "days",
        //                                 "type": {
        //                                     "name": "days"
        //                                 },
        //                                 "supported": true
        //                             },
        //                             "maximumValue": 86399999,
        //                             "range": 86400000,
        //                             "lenient": false,
        //                             "durationField": {
        //                                 "name": "millis",
        //                                 "type": {
        //                                     "name": "millis"
        //                                 },
        //                                 "supported": true,
        //                                 "precise": true,
        //                                 "unitMillis": "1"
        //                             },
        //                             "minimumValue": 0,
        //                             "unitMillis": "1",
        //                             "name": "millisOfDay",
        //                             "type": {
        //                                 "durationType": {
        //                                     "name": "millis"
        //                                 },
        //                                 "rangeDurationType": {
        //                                     "name": "days"
        //                                 },
        //                                 "name": "millisOfDay"
        //                             },
        //                             "supported": true
        //                         }
        //                     ],
        //                     "values": [
        //                         2024,
        //                         1,
        //                         26,
        //                         30960000
        //                     ],
        //                     "fieldTypes": [
        //                         {
        //                             "durationType": {
        //                                 "name": "years"
        //                             },
        //                             "name": "year"
        //                         },
        //                         {
        //                             "durationType": {
        //                                 "name": "months"
        //                             },
        //                             "rangeDurationType": {
        //                                 "name": "years"
        //                             },
        //                             "name": "monthOfYear"
        //                         },
        //                         {
        //                             "durationType": {
        //                                 "name": "days"
        //                             },
        //                             "rangeDurationType": {
        //                                 "name": "months"
        //                             },
        //                             "name": "dayOfMonth"
        //                         },
        //                         {
        //                             "durationType": {
        //                                 "name": "millis"
        //                             },
        //                             "rangeDurationType": {
        //                                 "name": "days"
        //                             },
        //                             "name": "millisOfDay"
        //                         }
        //                     ]
        //                 },
        //                 "encounterStartTime": {
        //                     "dayOfMonth": 26,
        //                     "dayOfWeek": 5,
        //                     "era": 1,
        //                     "year": 2024,
        //                     "dayOfYear": 26,
        //                     "weekOfWeekyear": 4,
        //                     "secondOfMinute": 48,
        //                     "millisOfSecond": 304,
        //                     "chronology": {
        //                         "zone": {
        //                             "fixed": true,
        //                             "id": "UTC"
        //                         }
        //                     },
        //                     "minuteOfHour": 7,
        //                     "centuryOfEra": 20,
        //                     "yearOfCentury": 24,
        //                     "millisOfDay": 40068304,
        //                     "weekyear": 2024,
        //                     "hourOfDay": 11,
        //                     "yearOfEra": 2024,
        //                     "monthOfYear": 1,
        //                     "fields": [
        //                         {
        //                             "leapDurationField": {
        //                                 "precise": true,
        //                                 "unitMillis": "86400000",
        //                                 "name": "days",
        //                                 "type": {
        //                                     "name": "days"
        //                                 },
        //                                 "supported": true
        //                             },
        //                             "lenient": false,
        //                             "minimumValue": -292275054,
        //                             "maximumValue": 292278993,
        //                             "durationField": {
        //                                 "precise": false,
        //                                 "unitMillis": "31556952000",
        //                                 "name": "years",
        //                                 "type": {
        //                                     "name": "years"
        //                                 },
        //                                 "supported": true
        //                             },
        //                             "name": "year",
        //                             "type": {
        //                                 "durationType": {
        //                                     "name": "years"
        //                                 },
        //                                 "name": "year"
        //                             },
        //                             "supported": true
        //                         },
        //                         {
        //                             "rangeDurationField": {
        //                                 "precise": false,
        //                                 "unitMillis": "31556952000",
        //                                 "name": "years",
        //                                 "type": {
        //                                     "name": "years"
        //                                 },
        //                                 "supported": true
        //                             },
        //                             "leapDurationField": {
        //                                 "precise": true,
        //                                 "unitMillis": "86400000",
        //                                 "name": "days",
        //                                 "type": {
        //                                     "name": "days"
        //                                 },
        //                                 "supported": true
        //                             },
        //                             "lenient": false,
        //                             "minimumValue": 1,
        //                             "maximumValue": 12,
        //                             "durationField": {
        //                                 "precise": false,
        //                                 "unitMillis": "2629746000",
        //                                 "name": "months",
        //                                 "type": {
        //                                     "name": "months"
        //                                 },
        //                                 "supported": true
        //                             },
        //                             "name": "monthOfYear",
        //                             "type": {
        //                                 "durationType": {
        //                                     "name": "months"
        //                                 },
        //                                 "rangeDurationType": {
        //                                     "name": "years"
        //                                 },
        //                                 "name": "monthOfYear"
        //                             },
        //                             "supported": true
        //                         },
        //                         {
        //                             "rangeDurationField": {
        //                                 "precise": false,
        //                                 "unitMillis": "2629746000",
        //                                 "name": "months",
        //                                 "type": {
        //                                     "name": "months"
        //                                 },
        //                                 "supported": true
        //                             },
        //                             "minimumValue": 1,
        //                             "maximumValue": 31,
        //                             "lenient": false,
        //                             "durationField": {
        //                                 "precise": true,
        //                                 "unitMillis": "86400000",
        //                                 "name": "days",
        //                                 "type": {
        //                                     "name": "days"
        //                                 },
        //                                 "supported": true
        //                             },
        //                             "unitMillis": "86400000",
        //                             "name": "dayOfMonth",
        //                             "type": {
        //                                 "durationType": {
        //                                     "name": "days"
        //                                 },
        //                                 "rangeDurationType": {
        //                                     "name": "months"
        //                                 },
        //                                 "name": "dayOfMonth"
        //                             },
        //                             "supported": true
        //                         },
        //                         {
        //                             "rangeDurationField": {
        //                                 "precise": true,
        //                                 "unitMillis": "86400000",
        //                                 "name": "days",
        //                                 "type": {
        //                                     "name": "days"
        //                                 },
        //                                 "supported": true
        //                             },
        //                             "maximumValue": 86399999,
        //                             "range": 86400000,
        //                             "lenient": false,
        //                             "durationField": {
        //                                 "name": "millis",
        //                                 "type": {
        //                                     "name": "millis"
        //                                 },
        //                                 "supported": true,
        //                                 "precise": true,
        //                                 "unitMillis": "1"
        //                             },
        //                             "minimumValue": 0,
        //                             "unitMillis": "1",
        //                             "name": "millisOfDay",
        //                             "type": {
        //                                 "durationType": {
        //                                     "name": "millis"
        //                                 },
        //                                 "rangeDurationType": {
        //                                     "name": "days"
        //                                 },
        //                                 "name": "millisOfDay"
        //                             },
        //                             "supported": true
        //                         }
        //                     ],
        //                     "values": [
        //                         2024,
        //                         1,
        //                         26,
        //                         40068304
        //                     ],
        //                     "fieldTypes": [
        //                         {
        //                             "durationType": {
        //                                 "name": "years"
        //                             },
        //                             "name": "year"
        //                         },
        //                         {
        //                             "durationType": {
        //                                 "name": "months"
        //                             },
        //                             "rangeDurationType": {
        //                                 "name": "years"
        //                             },
        //                             "name": "monthOfYear"
        //                         },
        //                         {
        //                             "durationType": {
        //                                 "name": "days"
        //                             },
        //                             "rangeDurationType": {
        //                                 "name": "months"
        //                             },
        //                             "name": "dayOfMonth"
        //                         },
        //                         {
        //                             "durationType": {
        //                                 "name": "millis"
        //                             },
        //                             "rangeDurationType": {
        //                                 "name": "days"
        //                             },
        //                             "name": "millisOfDay"
        //                         }
        //                     ]
        //                 },
        //                 "encounterStartedById": "6323257011601408",
        //                 "encounterEndTime": {
        //                     "dayOfMonth": 26,
        //                     "dayOfWeek": 5,
        //                     "era": 1,
        //                     "year": 2024,
        //                     "dayOfYear": 26,
        //                     "weekOfWeekyear": 4,
        //                     "secondOfMinute": 14,
        //                     "millisOfSecond": 185,
        //                     "chronology": {
        //                         "zone": {
        //                             "fixed": true,
        //                             "id": "UTC"
        //                         }
        //                     },
        //                     "minuteOfHour": 48,
        //                     "centuryOfEra": 20,
        //                     "yearOfCentury": 24,
        //                     "millisOfDay": 31694185,
        //                     "weekyear": 2024,
        //                     "hourOfDay": 8,
        //                     "yearOfEra": 2024,
        //                     "monthOfYear": 1,
        //                     "fields": [
        //                         {
        //                             "leapDurationField": {
        //                                 "precise": true,
        //                                 "unitMillis": "86400000",
        //                                 "name": "days",
        //                                 "type": {
        //                                     "name": "days"
        //                                 },
        //                                 "supported": true
        //                             },
        //                             "lenient": false,
        //                             "minimumValue": -292275054,
        //                             "maximumValue": 292278993,
        //                             "durationField": {
        //                                 "precise": false,
        //                                 "unitMillis": "31556952000",
        //                                 "name": "years",
        //                                 "type": {
        //                                     "name": "years"
        //                                 },
        //                                 "supported": true
        //                             },
        //                             "name": "year",
        //                             "type": {
        //                                 "durationType": {
        //                                     "name": "years"
        //                                 },
        //                                 "name": "year"
        //                             },
        //                             "supported": true
        //                         },
        //                         {
        //                             "rangeDurationField": {
        //                                 "precise": false,
        //                                 "unitMillis": "31556952000",
        //                                 "name": "years",
        //                                 "type": {
        //                                     "name": "years"
        //                                 },
        //                                 "supported": true
        //                             },
        //                             "leapDurationField": {
        //                                 "precise": true,
        //                                 "unitMillis": "86400000",
        //                                 "name": "days",
        //                                 "type": {
        //                                     "name": "days"
        //                                 },
        //                                 "supported": true
        //                             },
        //                             "lenient": false,
        //                             "minimumValue": 1,
        //                             "maximumValue": 12,
        //                             "durationField": {
        //                                 "precise": false,
        //                                 "unitMillis": "2629746000",
        //                                 "name": "months",
        //                                 "type": {
        //                                     "name": "months"
        //                                 },
        //                                 "supported": true
        //                             },
        //                             "name": "monthOfYear",
        //                             "type": {
        //                                 "durationType": {
        //                                     "name": "months"
        //                                 },
        //                                 "rangeDurationType": {
        //                                     "name": "years"
        //                                 },
        //                                 "name": "monthOfYear"
        //                             },
        //                             "supported": true
        //                         },
        //                         {
        //                             "rangeDurationField": {
        //                                 "precise": false,
        //                                 "unitMillis": "2629746000",
        //                                 "name": "months",
        //                                 "type": {
        //                                     "name": "months"
        //                                 },
        //                                 "supported": true
        //                             },
        //                             "minimumValue": 1,
        //                             "maximumValue": 31,
        //                             "lenient": false,
        //                             "durationField": {
        //                                 "precise": true,
        //                                 "unitMillis": "86400000",
        //                                 "name": "days",
        //                                 "type": {
        //                                     "name": "days"
        //                                 },
        //                                 "supported": true
        //                             },
        //                             "unitMillis": "86400000",
        //                             "name": "dayOfMonth",
        //                             "type": {
        //                                 "durationType": {
        //                                     "name": "days"
        //                                 },
        //                                 "rangeDurationType": {
        //                                     "name": "months"
        //                                 },
        //                                 "name": "dayOfMonth"
        //                             },
        //                             "supported": true
        //                         },
        //                         {
        //                             "rangeDurationField": {
        //                                 "precise": true,
        //                                 "unitMillis": "86400000",
        //                                 "name": "days",
        //                                 "type": {
        //                                     "name": "days"
        //                                 },
        //                                 "supported": true
        //                             },
        //                             "maximumValue": 86399999,
        //                             "range": 86400000,
        //                             "lenient": false,
        //                             "durationField": {
        //                                 "name": "millis",
        //                                 "type": {
        //                                     "name": "millis"
        //                                 },
        //                                 "supported": true,
        //                                 "precise": true,
        //                                 "unitMillis": "1"
        //                             },
        //                             "minimumValue": 0,
        //                             "unitMillis": "1",
        //                             "name": "millisOfDay",
        //                             "type": {
        //                                 "durationType": {
        //                                     "name": "millis"
        //                                 },
        //                                 "rangeDurationType": {
        //                                     "name": "days"
        //                                 },
        //                                 "name": "millisOfDay"
        //                             },
        //                             "supported": true
        //                         }
        //                     ],
        //                     "values": [
        //                         2024,
        //                         1,
        //                         26,
        //                         31694185
        //                     ],
        //                     "fieldTypes": [
        //                         {
        //                             "durationType": {
        //                                 "name": "years"
        //                             },
        //                             "name": "year"
        //                         },
        //                         {
        //                             "durationType": {
        //                                 "name": "months"
        //                             },
        //                             "rangeDurationType": {
        //                                 "name": "years"
        //                             },
        //                             "name": "monthOfYear"
        //                         },
        //                         {
        //                             "durationType": {
        //                                 "name": "days"
        //                             },
        //                             "rangeDurationType": {
        //                                 "name": "months"
        //                             },
        //                             "name": "dayOfMonth"
        //                         },
        //                         {
        //                             "durationType": {
        //                                 "name": "millis"
        //                             },
        //                             "rangeDurationType": {
        //                                 "name": "days"
        //                             },
        //                             "name": "millisOfDay"
        //                         }
        //                     ]
        //                 },
        //                 "encounterEndById": "6323257011601408",
        //                 "censusAppointment": false,
        //                 "appointmentSource": "Manual Request",
        //                 "practiceId": "4634407151337472",
        //                 "patientId": "6007697174429696",
        //                 "providerId": "6323257011601408",
        //                 "pmpReportId": "5313991236648960",
        //                 "processingStatus": "Ready",
        //                 "patientHidden": false,
        //                 "patientHiddenByDelegate": false,
        //                 "reprocessingNoData": false,
        //                 "emptyAppointment": false
        //             }
        //         ],
        //         "wfGapIds": [
        //             "5841756817981440",
        //             "6123231794692096",
        //             "6686181748113408",
        //             "4715856911138816",
        //             "4997331887849472",
        //             "5560281841270784"
        //         ],
        //         "summary": "Found 17 PastRx Alerts in PMP data.",
        //         "currentPrescriptions": [
        //             {
        //                 "id": "4715856911138816",
        //                 "created": "2024-01-26T08:36:48.994+05:30",
        //                 "modified": "2024-01-26T08:36:49.754+05:30",
        //                 "patientId": "6007697174429696",
        //                 "classification": "OPIOID",
        //                 "fillDate": "2024-01-05T10:30:00.000+05:30",
        //                 "fillDateString": "Jan 5",
        //                 "productName": "OXYCONTIN, 10 MG, TABLET, FILM COATED, EXTENDED RELEASE",
        //                 "displayName": "OXYCONTIN, 10 MG, TABLET, FILM COAT",
        //                 "strengthDesc": "10 MG",
        //                 "dosage": 10,
        //                 "prescribedQty": 60,
        //                 "prescribedLen": 30,
        //                 "dailyME": 30,
        //                 "writtenDate": "2023-12-23T10:30:00.000+05:30",
        //                 "writtenDateString": "Dec 23",
        //                 "nrCode": "R",
        //                 "refillCount": 0,
        //                 "rxNum": " ",
        //                 "isActive": true,
        //                 "isOurs": false,
        //                 "prescriber": {
        //                     "id": "5022534755942400",
        //                     "created": "2023-04-18T09:38:22.275+05:30",
        //                     "modified": "2023-04-18T09:38:22.275+05:30",
        //                     "firstName": "TAWNYA",
        //                     "lastName": "NUNEZ",
        //                     "sourceAddress": "6989 n hayden rd  scottsdale,az 85250",
        //                     "location": {
        //                         "id": "6429909639495680",
        //                         "created": "2023-04-18T09:38:22.264+05:30",
        //                         "modified": "2023-04-18T09:38:22.277+05:30",
        //                         "line1": "6989 N Hayden Rd",
        //                         "city": "Scottsdale",
        //                         "state": "AZ",
        //                         "zip": "85250",
        //                         "locLat": 33.5379566,
        //                         "locLng": -111.9060417,
        //                         "locSource": "6989 n hayden rd  scottsdale,az 85250"
        //                     },
        //                     "deaNumber": "MH3849176"
        //                 },
        //                 "pharmacy": {
        //                     "id": "5585484709363712",
        //                     "created": "2023-04-18T09:38:22.545+05:30",
        //                     "modified": "2023-04-18T09:38:22.545+05:30",
        //                     "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                     "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                     "location": {
        //                         "id": "6148434662785024",
        //                         "created": "2023-04-18T09:38:22.535+05:30",
        //                         "modified": "2023-04-18T09:38:22.546+05:30",
        //                         "line1": "3402 N Central Ave",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85012",
        //                         "locLat": 33.4879117,
        //                         "locLng": -112.0745667,
        //                         "locSource": "3402 n central ave  phoenix,az 85012"
        //                     },
        //                     "deaNumber": "AW0572518"
        //                 },
        //                 "ndcCode": "59011041010",
        //                 "patientName": "ULA PECK",
        //                 "patientDOB": "02/04/1939",
        //                 "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                 "isExpectedPatient": true,
        //                 "ndcOriginalSource": "59011041010",
        //                 "productCodeQualifier": "ND",
        //                 "ourPharmacy": false,
        //                 "ourProvider": false,
        //                 "startDate": "2024-01-05T10:30:00.000+05:30",
        //                 "endDate": "2024-02-03T10:30:00.000+05:30"
        //             },
        //             {
        //                 "id": "5841756817981440",
        //                 "created": "2024-01-26T08:36:48.994+05:30",
        //                 "modified": "2024-01-26T08:36:49.755+05:30",
        //                 "patientId": "6007697174429696",
        //                 "classification": "OPIOID",
        //                 "fillDate": "2024-01-05T10:30:00.000+05:30",
        //                 "fillDateString": "Jan 5",
        //                 "productName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;325 MG, TABLET",
        //                 "displayName": "OXYCODONE AND ACETAMINOPHEN, 10 MG;",
        //                 "strengthDesc": "10 MG;325 MG",
        //                 "dosage": 10,
        //                 "prescribedQty": 105,
        //                 "prescribedLen": 30,
        //                 "dailyME": 53,
        //                 "writtenDate": "2023-12-23T10:30:00.000+05:30",
        //                 "writtenDateString": "Dec 23",
        //                 "nrCode": "R",
        //                 "refillCount": 0,
        //                 "rxNum": " ",
        //                 "isActive": true,
        //                 "isOurs": false,
        //                 "prescriber": {
        //                     "id": "4565137918787584",
        //                     "created": "2023-04-18T09:38:22.853+05:30",
        //                     "modified": "2023-04-18T09:38:22.853+05:30",
        //                     "firstName": "TAWNYA",
        //                     "lastName": "NUNEZ",
        //                     "sourceAddress": "3815 n brown ave  scottsdale,az 85251",
        //                     "location": {
        //                         "id": "6711384616206336",
        //                         "created": "2023-04-18T09:38:22.846+05:30",
        //                         "modified": "2023-04-18T09:38:22.854+05:30",
        //                         "line1": "3815 N Brown Ave",
        //                         "city": "Scottsdale",
        //                         "state": "AZ",
        //                         "zip": "85251",
        //                         "locLat": 33.4918372,
        //                         "locLng": -111.9242563,
        //                         "locSource": "3815 n brown ave  scottsdale,az 85251"
        //                     },
        //                     "deaNumber": "MH3849176"
        //                 },
        //                 "pharmacy": {
        //                     "id": "5585484709363712",
        //                     "created": "2023-04-18T09:38:22.545+05:30",
        //                     "modified": "2023-04-18T09:38:22.545+05:30",
        //                     "pharmacyName": "WALGREEN ARIZONA DRUG CO.",
        //                     "sourceAddress": "3402 n central ave  phoenix,az 85012",
        //                     "location": {
        //                         "id": "6148434662785024",
        //                         "created": "2023-04-18T09:38:22.535+05:30",
        //                         "modified": "2023-04-18T09:38:22.546+05:30",
        //                         "line1": "3402 N Central Ave",
        //                         "city": "Phoenix",
        //                         "state": "AZ",
        //                         "zip": "85012",
        //                         "locLat": 33.4879117,
        //                         "locLng": -112.0745667,
        //                         "locSource": "3402 n central ave  phoenix,az 85012"
        //                     },
        //                     "deaNumber": "AW0572518"
        //                 },
        //                 "ndcCode": "00228298311",
        //                 "patientName": "ULA PECK",
        //                 "patientDOB": "02/04/1939",
        //                 "patientAddress": "1702 W Camelback Rd, Phoenix, AZ, 85015",
        //                 "isExpectedPatient": true,
        //                 "ndcOriginalSource": "00228298311",
        //                 "productCodeQualifier": "ND",
        //                 "ourPharmacy": false,
        //                 "ourProvider": false,
        //                 "startDate": "2024-01-05T10:30:00.000+05:30",
        //                 "endDate": "2024-02-03T10:30:00.000+05:30"
        //             }
        //         ]
        //     }
        // };
        // var canvas = <HTMLCanvasElement>document.getElementById('stage');
        // if (canvas.getContext) {
        //   var ctx = canvas.getContext('2d');

        //   ctx.fillStyle = "#D74022";
        //   ctx.fillRect(25, 25, 150, 150);

        //   ctx.fillStyle = "rgba(0,0,0,0.5)";
        //   ctx.clearRect(60, 60, 120, 120);
        //   ctx.strokeRect(90, 90, 80, 80);
        // }
    };
}
