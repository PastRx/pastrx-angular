import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

interface MarkerInfo {
  position: google.maps.LatLngLiteral;
  title: string;
  infoContent?: string;
  options?: google.maps.MarkerOptions;
}

@Component({
  selector: 'app-patient-map',
  templateUrl: './patient-map.component.html',
  styleUrls: ['./patient-map.component.css']
})
export class PatientMapComponent implements OnChanges {
  @Input() showMaps: boolean = false;
  @Input() reportData: any;
  @Input() patientName: string = '';
  @Input() center: google.maps.LatLngLiteral = {
    lat: 33.4484,
    lng: -112.0740
  };
  @Input() zoom: number = 10;
  @Output() showMapsChange = new EventEmitter<boolean>();

  markers: MarkerInfo[] = [];
  patientMarker: MarkerInfo | null = null;
  prescriberMarkers: MarkerInfo[] = [];
  pharmacyMarkers: MarkerInfo[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['reportData'] && this.reportData) {
      this.extractMarkers();
      this.centerMap();
    }
  }

  toggleMap() {
    this.showMaps = !this.showMaps;
    this.showMapsChange.emit(this.showMaps);
  }

  isValidAddress(sourceAddress: any): boolean {
    if (!sourceAddress) return false;
    const addressStr = sourceAddress.toString();
    if (addressStr.indexOf("null") !== -1) return false;
    if (addressStr.trim() === "0") return false;
    if (!/[a-z]/i.test(addressStr)) return false;
    return true;
  }

  getDetailInfo(detailId: any, reportData: any): any {
    if (!detailId || !reportData?.pastReport?.details) return null;
    return reportData.pastReport.details[detailId] || null;
  }

  extractMarkers() {
    this.patientMarker = null;
    this.prescriberMarkers = [];
    this.pharmacyMarkers = [];
    this.markers = [];

    if (!this.reportData?.pastReport) return;

    const report = this.reportData.pastReport;
    const pharmacyIcon = 'assets/resources/static/pharmacy.png';
    const prescriberIcon = 'assets/resources/static/provider.png';

    // Draw patient marker
    this.drawPatientMarker(report);

    // Get prescriptions from pastReport.prescriptions (not just alerts)
    // Also check alerts for prescriptions if root prescriptions don't exist
    let prescriptions = report.prescriptions || [];
    
    // If no root prescriptions, collect from alerts
    if (prescriptions.length === 0 && report.alerts) {
      const prescriptionSet = new Map();
      report.alerts.forEach((alert: any) => {
        if (alert.prescriptions) {
          alert.prescriptions.forEach((prescription: any) => {
            if (prescription.id) {
              prescriptionSet.set(prescription.id, prescription);
            }
          });
        }
      });
      prescriptions = Array.from(prescriptionSet.values());
    }

    if (prescriptions.length > 0) {
      // Extract markers from prescriptions
      prescriptions.forEach((prescription: any) => {
        // Draw pharmacy marker
        if (prescription.pharmacy?.location && 
            prescription.pharmacy.location.locLat && 
            prescription.pharmacy.location.locLng &&
            this.isValidAddress(prescription.pharmacy.sourceAddress)) {
          this.drawPharmacyMarker(prescription, pharmacyIcon);
        }

        // Draw prescriber marker
        if (prescription.prescriber?.location && 
            prescription.prescriber.location.locLat && 
            prescription.prescriber.location.locLng &&
            this.isValidAddress(prescription.prescriber.sourceAddress)) {
          this.drawPrescriberMarker(prescription, prescriberIcon);
        } else if (prescription.prescriber) {
          // Try to get location from details
          const detailId = prescription.prescriber.googlePlaceDetailsId;
          if (detailId) {
            const detailObj = this.getDetailInfo(detailId, this.reportData);
            if (detailObj?.location?.locLat && detailObj?.location?.locLng) {
              this.drawPrescriberMarkerFromDetail(prescription, detailObj, prescriberIcon);
            }
          }
        }
      });
    } else {
      // Fallback to practice address if no prescriptions
      this.drawPracticeMarker(report);
    }

    // Combine all markers
    if (this.patientMarker) {
      this.markers.push(this.patientMarker);
    }
    this.markers = [...this.markers, ...this.prescriberMarkers, ...this.pharmacyMarkers];
  }

  drawPatientMarker(report: any) {
    const patient = report.patient;
    if (patient?.address?.locLat && patient?.address?.locLng) {
      const address = patient.address;
      if (isNaN(address.locLat) || isNaN(address.locLng)) {
        console.warn("ERROR: Patient Address LAT or LNG is NOT A NUMBER");
        return;
      }

      if (address.locSource && 
          address.locSource.trim() !== "0" && 
          /[a-z]/i.test(address.locSource)) {
        this.patientMarker = {
          position: {
            lat: address.locLat,
            lng: address.locLng
          },
          title: `Patient: ${this.patientName || 'Unknown'}`,
          infoContent: `<div align="left">${this.patientName || 'Unknown'}</div>`
        };
      }
    }
  }

  drawPharmacyMarker(prescription: any, iconUrl: string) {
    const pharmacy = prescription.pharmacy;
    const pharmacyLatLng = {
      lat: pharmacy.location.locLat,
      lng: pharmacy.location.locLng
    };

    let pharmacyTag = `Pharmacy:\n${pharmacy.pharmacyName}\n${pharmacy.sourceAddress}`;

    // Add pharmacy details
    const detailId = pharmacy.googlePlaceDetailsId;
    if (detailId) {
      const detailObj = this.getDetailInfo(detailId, this.reportData);
      if (detailObj?.locationPhoneNumber) {
        pharmacyTag += `\n${detailObj.locationPhoneNumber}`;
      }
    }

    this.pharmacyMarkers.push({
      position: pharmacyLatLng,
      title: pharmacyTag,
      infoContent: pharmacyTag.replace(/\n/g, '<br/>'),
      options: {
        icon: {
          url: iconUrl
        }
      }
    });
  }

  drawPrescriberMarker(prescription: any, iconUrl: string) {
    const prescriber = prescription.prescriber;
    const prescriberLatLng = {
      lat: prescriber.location.locLat,
      lng: prescriber.location.locLng
    };

    let prescriberTag = `Prescriber:\n${prescriber.firstName} ${prescriber.lastName}\n${prescriber.sourceAddress}`;

    // Add prescriber details
    const detailId = prescriber.googlePlaceDetailsId;
    if (detailId) {
      const detailObj = this.getDetailInfo(detailId, this.reportData);
      if (detailObj?.locationPhoneNumber) {
        prescriberTag += `\n${detailObj.locationPhoneNumber}`;
      }
    }

    this.prescriberMarkers.push({
      position: prescriberLatLng,
      title: prescriberTag,
      infoContent: prescriberTag.replace(/\n/g, '<br/>'),
      options: {
        icon: {
          url: iconUrl
        }
      }
    });
  }

  drawPrescriberMarkerFromDetail(prescription: any, detailObj: any, iconUrl: string) {
    const prescriber = prescription.prescriber;
    const prescriberLatLng = {
      lat: detailObj.location.locLat,
      lng: detailObj.location.locLng
    };

    let prescriberTag = `Prescriber:\n${prescriber.firstName} ${prescriber.lastName}`;

    if (detailObj.location?.sourceAddress) {
      prescriberTag += `\n${detailObj.location.sourceAddress}`;
    }

    if (detailObj.locationPhoneNumber) {
      prescriberTag += `\n${detailObj.locationPhoneNumber}`;
    }

    this.prescriberMarkers.push({
      position: prescriberLatLng,
      title: prescriberTag,
      infoContent: prescriberTag.replace(/\n/g, '<br/>'),
      options: {
        icon: {
          url: iconUrl
        }
      }
    });
  }

  drawPracticeMarker(report: any) {
    // Fallback to practice address if available
    const practice = (this.reportData as any).practice || (window as any).PASTRX?.practice;
    if (practice?.address?.locLat && practice?.address?.locLng) {
      const practiceLatLng = {
        lat: practice.address.locLat,
        lng: practice.address.locLng
      };

      const practiceTag = `Practice:\n${practice.practiceName}\n${practice.address.line1} ${practice.address.city} ${practice.address.state}`;

      this.pharmacyMarkers.push({
        position: practiceLatLng,
        title: practiceTag,
        infoContent: practiceTag.replace(/\n/g, '<br/>'),
        options: {
          icon: {
            url: 'assets/resources/static/provider.png'
          }
        }
      });
    }
  }

  centerMap() {
    // First, center on patient address if available
    if (this.patientMarker) {
      this.center = {
        lat: this.patientMarker.position.lat,
        lng: this.patientMarker.position.lng
      };
      this.zoom = 12;
    } else if (this.markers.length > 0) {
      // Calculate center from all markers
      let latSum = 0;
      let lngSum = 0;
      this.markers.forEach(marker => {
        latSum += marker.position.lat;
        lngSum += marker.position.lng;
      });
      this.center = {
        lat: latSum / this.markers.length,
        lng: lngSum / this.markers.length
      };
      this.zoom = 10;
    }
  }
}

