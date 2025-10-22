import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
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
    alertsList: any;
    alertsCount: any;
    alerts: any;
    NotOurPrescription: any[];
    NotOurPharmacy: any[];
    UnexpectedPatient: any[];
    HighDose: any[];
    Identical: any[];
    MultiplePrescribers: any[];
    OverlappingPharmacy: any[];
    OverlappingPrescriber: any[];
    LabTestDiscrepancy: any[];
    WriteFillGap: any[];
    PrivatePay: any[];
    alertstitle: string;
    numAlerts: number;
    constructor(private api: ApiService, private route: ActivatedRoute) {
        // gapi.client.pastAPI.getPastReportJson({
        //     'patientId': PASTRX.selectedPid,
        //     'masquerade': PASTRX.masquerade,
        //     'appointmentId': PASTRX.appointmentId
        // })
    }
    ngOnInit() {
        // Get parameters from query string instead of localStorage
        const patientId = this.route.snapshot.queryParams['patientId'];
        const appointmentId = this.route.snapshot.queryParams['appointmentId'];
        
        if (!patientId || !appointmentId) {
            console.warn('Missing required query parameters: patientId and/or appointmentId');
            return;
        }
        
        console.log('Query params - patientId:', patientId, 'appointmentId:', appointmentId);
        this.api.getPastReportJson(
            {
                'patientId': patientId,
                'appointmentId': appointmentId
                // 'masquerade': PASTRX.masquerade,
            }
        ).subscribe({
            next: (res) => {
                console.log(res)
                window.reactReportData = res;
                this.shwrpt = true;
                this.alerts = res.pastReport.alerts;
                var modAlerts = [];
                this.NotOurPrescription = [];
                this.NotOurPharmacy = [];
                this.UnexpectedPatient = [];
                this.HighDose = [];
                this.Identical = [];
                this.MultiplePrescribers = [];
                this.OverlappingPharmacy = [];
                this.OverlappingPrescriber = [];
                this.LabTestDiscrepancy = [];
                this.WriteFillGap = [];
                this.PrivatePay = [];
                for (var i = 0; i < this.alerts.length; i++) {
                    var alert = this.alerts[i];
                    if (this[alert.alertType] != undefined) {
                        if (alert.alertType == "NotOurPrescription") {
                            if (alert.alertSubtype == "Pharmacy") {
                                this.NotOurPharmacy.push(alert);
                            }else{
                                this.NotOurPrescription.push(alert);
                            }
                        }else{
                            this[alert.alertType].push(alert);                        
                        }
                    } else {
                        //handle overlaps
                        if (alert.alertType == "Overlapping") {
                            if (alert.alertSubtype == "Pharmacy") {
                                this.OverlappingPharmacy.push(alert);
                            }
                            if (alert.alertSubtype == "Prescriber") {
                                this.OverlappingPrescriber.push(alert); 
                            }
                        } else {
                            console.log("Could not find alert bucket:")
                            console.log(alert)
                        }
                    }
                }
                this.numAlerts = this.alerts.length;
                console.log(modAlerts);
                console.log(this.alerts);
                var multiple = "";

                if (this.numAlerts != undefined) {
                    if (this.numAlerts > 1 || this.numAlerts == 0) multiple = "s";
                    this.alertstitle = this.numAlerts + " Alert" + multiple;
                }
                else {
                    this.alertstitle = "No Alerts Found";
                }
            },
            error: (e) => console.log(e),
        });

    }
}
