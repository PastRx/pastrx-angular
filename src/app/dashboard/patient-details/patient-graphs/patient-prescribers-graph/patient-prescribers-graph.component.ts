import { Component, Input, OnChanges, SimpleChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

declare global {
  interface Window {
    PASTRX: any;
  }
}

@Component({
  selector: 'app-patient-prescribers-graph',
  templateUrl: './patient-prescribers-graph.component.html',
  styleUrls: ['./patient-prescribers-graph.component.css']
})
export class PatientPrescribersGraphComponent implements OnChanges, AfterViewInit {
  @Input() tdeGraphData: any;
  @ViewChild('prescribersCanvas', { static: false }) prescribersCanvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    if (this.prescribersCanvas) {
      this.prescribersCanvas.nativeElement.addEventListener('click', (e) => {
        this.onCanvasClick(e);
      });
    }

    window.addEventListener('resize', () => {
      setTimeout(() => this.refresh(), 100);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tdeGraphData'] && this.tdeGraphData && this.prescribersCanvas) {
      this.refresh();
    }
  }

  onCanvasClick(ev: MouseEvent) {
    if (this.prescribersCanvas && window.PASTRX && window.PASTRX.selectActivesInCanvas) {
      window.PASTRX.selectActivesInCanvas(ev, this.prescribersCanvas.nativeElement);
    }
  }

  refresh() {
    if (!this.prescribersCanvas || !window.PASTRX) return;

    // Ensure PASTRX.PASTReport is set (required by plotting functions)
    if (!window.PASTRX.PASTReport && window.reactReportData?.pastReport) {
      window.PASTRX.PASTReport = window.reactReportData.pastReport;
    }

    const canvas = this.prescribersCanvas.nativeElement;
    window.PASTRX.clearCanvas(canvas);

    if (this.tdeGraphData && Array.isArray(this.tdeGraphData) && this.tdeGraphData.length > 0 && window.PASTRX.plotPrescribersData && window.PASTRX.PASTReport) {
      const container = canvas.parentElement;
      if (container) {
        // Set container height to match CSS
        container.style.height = '46px';
        
        // Get the full panel width from the parent flex-row container (includes label + canvas)
        const panelContainer = container.parentElement; // The d-flex flex-row div
        const panelWidth = panelContainer?.offsetWidth || panelContainer?.clientWidth || container.offsetWidth || 0;
        const labelWidth = 50;
        // Calculate canvas width: full panel width minus label (50px), minimal padding, and right padding (10px)
        const canvasWidth = Math.max(0, panelWidth - labelWidth - 10);
        canvas.style.width = canvasWidth + 'px';
        canvas.style.height = '46px';
      }

      window.PASTRX.plotPrescribersData(this.tdeGraphData, canvas, 'Prescribers');
    }
  }

  clearCanvas() {
    if (this.prescribersCanvas && window.PASTRX) {
      window.PASTRX.clearCanvas(this.prescribersCanvas.nativeElement);
    }
  }

  isLoading(): boolean {
    return !this.tdeGraphData || (Array.isArray(this.tdeGraphData) && this.tdeGraphData.length === 0);
  }
}
