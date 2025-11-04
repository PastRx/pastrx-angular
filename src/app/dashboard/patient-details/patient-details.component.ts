import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
// declare var PASTRX: any;
declare global {
    interface Window { 
        reactReportData: any;
        PASTRX: any;
    }
}

window.reactReportData = window.reactReportData || {};
@Component({
    selector: 'app-patient-details',
    templateUrl: './patient-details.component.html',
    styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent {
    shwrpt = false;
    showMaps = false;
    showPMP = false;
    showAlerts = false;
    appTitle = "Patients Details";
    alertsList: any[] = [];
    alertsCount: any;
    alerts: any;
    reportData: any;
    patientName: string = '';
    tdeGraphData: any;
    loadingAlerts: boolean = true;
    NotOurPrescription: any[] = [];
    NotOurPharmacy: any[] = [];
    UnexpectedPatient: any[] = [];
    HighDose: any[] = [];
    Identical: any[] = [];
    MultiplePrescribers: any[] = [];
    OverlappingPharmacy: any[] = [];
    OverlappingPrescriber: any[] = [];
    LabTestDiscrepancy: any[] = [];
    WriteFillGap: any[] = [];
    PrivatePay: any[] = [];
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
                this.reportData = res;
                this.shwrpt = true;
                this.alerts = res.pastReport.alerts;
                this.loadingAlerts = false;
                // Set PASTRX.PASTReport for compatibility with existing code
                if (window.PASTRX) {
                    window.PASTRX.PASTReport = res.pastReport;
                }
                
                // Load TDE graph data if available
                if (window.PASTRX && window.PASTRX.tdeGraphData) {
                    this.tdeGraphData = window.PASTRX.tdeGraphData;
                } else if (res.pastReport?.pmpReportId) {
                    // Try to load TDE graph data
                    this.loadTDEGraphData(res.pastReport.pmpReportId);
                }
                // Extract patient name
                if (res.pastReport?.patient) {
                    const patient = res.pastReport.patient;
                    if (patient.firstName && patient.lastName) {
                        this.patientName = `${patient.firstName} ${patient.lastName}`;
                    } else if (patient.name) {
                        this.patientName = patient.name;
                    }
                }
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
                
                this.alertsList = [];
                if (this.NotOurPrescription.length > 0) {
                    this.alertsList.push({
                        alerts: this.NotOurPrescription,
                        typeString: this.NotOurPrescription[0].typeString || 'Not Our Prescriber',
                        count: this.NotOurPrescription.length
                    });
                }
                if (this.NotOurPharmacy.length > 0) {
                    this.alertsList.push({
                        alerts: this.NotOurPharmacy,
                        typeString: this.NotOurPharmacy[0].typeString || 'Not Our Pharmacy',
                        count: this.NotOurPharmacy.length
                    });
                }
                if (this.HighDose.length > 0) {
                    this.alertsList.push({
                        alerts: this.HighDose,
                        typeString: this.HighDose[0].typeString || 'High Dose',
                        count: this.HighDose.length
                    });
                }
                if (this.MultiplePrescribers.length > 0) {
                    this.alertsList.push({
                        alerts: this.MultiplePrescribers,
                        typeString: 'Multiple Prescribers (Same Category)',
                        count: this.MultiplePrescribers.length
                    });
                }
                if (this.OverlappingPrescriber.length > 0) {
                    this.alertsList.push({
                        alerts: this.OverlappingPrescriber,
                        typeString: 'Overlapping Prescriber (Different Category)',
                        count: this.OverlappingPrescriber.length
                    });
                }
                if (this.OverlappingPharmacy.length > 0) {
                    this.alertsList.push({
                        alerts: this.OverlappingPharmacy,
                        typeString: this.OverlappingPharmacy[0].typeString || 'Overlapping Pharmacies',
                        count: this.OverlappingPharmacy.length
                    });
                }
                if (this.WriteFillGap.length > 0) {
                    this.alertsList.push({
                        alerts: this.WriteFillGap,
                        typeString: this.WriteFillGap[0].typeString || 'Write/Fill Gap',
                        count: this.WriteFillGap.length
                    });
                }
                
                var multiple = "";
                if (this.numAlerts != undefined) {
                    if (this.numAlerts > 1 || this.numAlerts == 0) multiple = "s";
                    this.alertstitle = this.numAlerts + " Alert" + multiple;
                }
                else {
                    this.alertstitle = "No Alerts Found";
                }
            },
            error: (e) => {
                console.log(e);
                this.loadingAlerts = false;
            },
        });

    }

    loadTDEGraphData(pmpReportId: string) {
        // Use Angular API service to load TDE graph data
        this.api.getTDEGraphData({
            'id': pmpReportId
        }).subscribe({
            next: (resp) => {
                console.log('TDE Graph Data Response:', resp);
                // Handle different response formats
                let graphData: any = null;
                if (resp && resp.items && resp.items.length === 2) {
                    graphData = resp.items[1];
                    if (window.PASTRX) {
                        window.PASTRX.medThresh = resp.items[0];
                        window.PASTRX.tdeGraphData = graphData;
                    }
                } else if (resp && Array.isArray(resp) && resp.length === 2) {
                    graphData = resp[1];
                    if (window.PASTRX) {
                        window.PASTRX.medThresh = resp[0];
                        window.PASTRX.tdeGraphData = graphData;
                    }
                } else if (resp && resp.data) {
                    graphData = resp.data;
                    if (window.PASTRX) {
                        window.PASTRX.tdeGraphData = graphData;
                    }
                }
                
                if (graphData) {
                    // Set in component - ensure it's an array
                    this.tdeGraphData = Array.isArray(graphData) ? graphData : [];
                    console.log('TDE Graph Data loaded:', this.tdeGraphData.length, 'items');
                } else {
                    console.warn('Could not extract graph data from response:', resp);
                    if (window.PASTRX) {
                        window.PASTRX.medThresh = 400;
                        window.PASTRX.tdeGraphData = [];
                    }
                    this.tdeGraphData = [];
                }
            },
            error: (e) => {
                console.error('Error loading TDE graph data:', e);
                // Fallback: try using PASTRX method if available
                if (window.PASTRX && (window as any).gapi && window.PASTRX.loadTDEGraphData) {
                    window.PASTRX.loadTDEGraphData(null, null, () => {
                        if (window.PASTRX.tdeGraphData) {
                            this.tdeGraphData = window.PASTRX.tdeGraphData;
                        }
                    });
                }
            }
        });
    }
}

