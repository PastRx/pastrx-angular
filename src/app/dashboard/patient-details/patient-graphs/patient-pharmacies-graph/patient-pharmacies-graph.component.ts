import { Component, Input, OnChanges, SimpleChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

declare global {
  interface Window {
    PASTRX: any;
  }
}

@Component({
  selector: 'app-patient-pharmacies-graph',
  templateUrl: './patient-pharmacies-graph.component.html',
  styleUrls: ['./patient-pharmacies-graph.component.css']
})
export class PatientPharmaciesGraphComponent implements OnChanges, AfterViewInit {
  @Input() tdeGraphData: any;
  @ViewChild('pharmaciesCanvas', { static: false }) pharmaciesCanvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    if (this.pharmaciesCanvas) {
      this.pharmaciesCanvas.nativeElement.addEventListener('click', (e) => {
        this.onCanvasClick(e);
      });
    }

    window.addEventListener('resize', () => {
      setTimeout(() => this.refresh(), 100);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tdeGraphData'] && this.tdeGraphData && this.pharmaciesCanvas) {
      this.refresh();
    }
  }

  onCanvasClick(ev: MouseEvent) {
    if (this.pharmaciesCanvas && window.PASTRX && window.PASTRX.selectActivesInCanvas) {
      window.PASTRX.selectActivesInCanvas(ev, this.pharmaciesCanvas.nativeElement);
    }
  }

  refresh() {
    if (!this.pharmaciesCanvas || !window.PASTRX) return;

    // Ensure PASTRX.PASTReport is set (required by plotting functions)
    if (!window.PASTRX.PASTReport && window.reactReportData?.pastReport) {
      window.PASTRX.PASTReport = window.reactReportData.pastReport;
    }

    const canvas = this.pharmaciesCanvas.nativeElement;
    window.PASTRX.clearCanvas(canvas);

    if (this.tdeGraphData && Array.isArray(this.tdeGraphData) && this.tdeGraphData.length > 0 && window.PASTRX.plotPharmaciesData && window.PASTRX.PASTReport) {
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

      window.PASTRX.plotPharmaciesData(this.tdeGraphData, canvas, 'Pharmacies');
    }
  }

  clearCanvas() {
    if (this.pharmaciesCanvas && window.PASTRX) {
      window.PASTRX.clearCanvas(this.pharmaciesCanvas.nativeElement);
    }
  }

  isLoading(): boolean {
    return !this.tdeGraphData || (Array.isArray(this.tdeGraphData) && this.tdeGraphData.length === 0);
  }
}
