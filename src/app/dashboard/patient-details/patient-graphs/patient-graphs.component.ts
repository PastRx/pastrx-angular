import { Component, Input, OnChanges, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';
import { PatientMedGraphComponent } from './patient-med-graph/patient-med-graph.component';
import { PatientBenzosGraphComponent } from './patient-benzos-graph/patient-benzos-graph.component';
import { PatientStimsGraphComponent } from './patient-stims-graph/patient-stims-graph.component';
import { PatientPrescribersGraphComponent } from './patient-prescribers-graph/patient-prescribers-graph.component';
import { PatientPharmaciesGraphComponent } from './patient-pharmacies-graph/patient-pharmacies-graph.component';

declare global {
  interface Window {
    PASTRX: any;
  }
}

@Component({
  selector: 'app-patient-graphs',
  templateUrl: './patient-graphs.component.html',
  styleUrls: ['./patient-graphs.component.css']
})
export class PatientGraphsComponent implements OnChanges, AfterViewInit {
  @Input() reportData: any;
  @Input() tdeGraphData: any;
  
  @ViewChild('medGraph') medGraph!: PatientMedGraphComponent;
  @ViewChild('benzosGraph') benzosGraph!: PatientBenzosGraphComponent;
  @ViewChild('stimsGraph') stimsGraph!: PatientStimsGraphComponent;
  @ViewChild('prescribersGraph') prescribersGraph!: PatientPrescribersGraphComponent;
  @ViewChild('pharmaciesGraph') pharmaciesGraph!: PatientPharmaciesGraphComponent;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tdeGraphData'] || changes['reportData']) {
      // Ensure PASTRX.PASTReport is set from reportData
      if (this.reportData?.pastReport && window.PASTRX) {
        window.PASTRX.PASTReport = this.reportData.pastReport;
      }
      // Refresh even if data is null to clear loading state
      setTimeout(() => this.refresh(), 100);
    }
  }

  ngAfterViewInit() {
    // Ensure PASTRX.PASTReport is set from reportData
    if (this.reportData?.pastReport && window.PASTRX) {
      window.PASTRX.PASTReport = this.reportData.pastReport;
    }
    
    // Listen for window resize events
    window.addEventListener('resize', () => {
      setTimeout(() => this.refresh(), 100);
    });
    
    // Initial refresh after view init
    setTimeout(() => this.refresh(), 200);
  }

  refresh() {
    // Ensure PASTRX.PASTReport is set before refreshing
    if (this.reportData?.pastReport && window.PASTRX) {
      window.PASTRX.PASTReport = this.reportData.pastReport;
    }
    
    if (this.medGraph) this.medGraph.refresh();
    if (this.benzosGraph) this.benzosGraph.refresh();
    if (this.stimsGraph) this.stimsGraph.refresh();
    if (this.prescribersGraph) this.prescribersGraph.refresh();
    if (this.pharmaciesGraph) this.pharmaciesGraph.refresh();
  }

  clearCanvases() {
    if (this.medGraph) this.medGraph.clearCanvas();
    if (this.benzosGraph) this.benzosGraph.clearCanvas();
    if (this.stimsGraph) this.stimsGraph.clearCanvas();
    if (this.prescribersGraph) this.prescribersGraph.clearCanvas();
    if (this.pharmaciesGraph) this.pharmaciesGraph.clearCanvas();
  }
}
