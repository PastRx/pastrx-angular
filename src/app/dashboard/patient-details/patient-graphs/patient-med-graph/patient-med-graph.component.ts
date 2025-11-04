import { Component, Input, OnChanges, SimpleChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

declare global {
  interface Window {
    PASTRX: any;
  }
}

@Component({
  selector: 'app-patient-med-graph',
  templateUrl: './patient-med-graph.component.html',
  styleUrls: ['./patient-med-graph.component.css']
})
export class PatientMedGraphComponent implements OnChanges, AfterViewInit {
  @Input() tdeGraphData: any;
  @ViewChild('medCanvas', { static: false }) medCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('redAlert', { static: false }) redAlert!: ElementRef<HTMLElement>;
  @ViewChild('yellowAlert', { static: false }) yellowAlert!: ElementRef<HTMLElement>;
  @ViewChild('blueAlert', { static: false }) blueAlert!: ElementRef<HTMLElement>;

  ngAfterViewInit() {
    if (this.redAlert && this.yellowAlert && this.blueAlert && window.PASTRX) {
      this.redAlert.nativeElement.style.fill = window.PASTRX.red || '#990000';
      this.yellowAlert.nativeElement.style.fill = window.PASTRX.yellow || '#999900';
      this.blueAlert.nativeElement.style.fill = window.PASTRX.blue || '#000099';
    }

    if (this.medCanvas) {
      this.medCanvas.nativeElement.addEventListener('click', (e) => {
        this.onCanvasClick(e);
      });
    }

    window.addEventListener('resize', () => {
      setTimeout(() => this.refresh(), 100);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tdeGraphData'] && this.medCanvas) {
      // Refresh when data changes, even if empty
      setTimeout(() => this.refresh(), 100);
    }
  }

  onCanvasClick(ev: MouseEvent) {
    if (this.medCanvas && window.PASTRX && window.PASTRX.selectActivesInCanvas) {
      window.PASTRX.selectActivesInCanvas(ev, this.medCanvas.nativeElement);
    }
  }

  refresh() {
    if (!this.medCanvas || !window.PASTRX) {
      console.log('Med Graph: Canvas or PASTRX not available');
      return;
    }

    // Ensure PASTRX.PASTReport is set (required by plotting functions)
    if (!window.PASTRX.PASTReport && window.reactReportData?.pastReport) {
      window.PASTRX.PASTReport = window.reactReportData.pastReport;
    }

    const canvas = this.medCanvas.nativeElement;
    window.PASTRX.clearCanvas(canvas);

    // Check if we have valid data (not null, not undefined, and has length > 0)
    if (this.tdeGraphData && Array.isArray(this.tdeGraphData) && this.tdeGraphData.length > 0 && window.PASTRX.plotTDEData && window.PASTRX.PASTReport) {
      const container = canvas.parentElement;
      if (container) {
        // Set container height to match CSS
        container.style.height = '250px';
        
        // Get the full panel width from the parent flex-row container (includes legend + canvas)
        const panelContainer = container.parentElement; // The d-flex flex-row div
        const panelWidth = panelContainer?.offsetWidth || panelContainer?.clientWidth || container.offsetWidth || 0;
        const legendPanelWidth = 50;
        // Calculate canvas width: full panel width minus legend (50px), minimal padding, and right padding (10px)
        const medCanvasWidth = Math.max(0, panelWidth - legendPanelWidth - 10);
        canvas.style.width = medCanvasWidth + 'px';
        canvas.style.height = '250px';
      }

      console.log('Med Graph: Plotting data', this.tdeGraphData.length, 'items');
      window.PASTRX.plotTDEData(this.tdeGraphData, canvas, 'OPIOID');
    } else {
      console.log('Med Graph: No data to plot', {
        hasData: !!this.tdeGraphData,
        dataLength: Array.isArray(this.tdeGraphData) ? this.tdeGraphData.length : 'not array',
        hasPASTReport: !!window.PASTRX?.PASTReport,
        hasPlotFunction: !!window.PASTRX?.plotTDEData
      });
    }
  }

  clearCanvas() {
    if (this.medCanvas && window.PASTRX) {
      window.PASTRX.clearCanvas(this.medCanvas.nativeElement);
    }
  }

  isLoading(): boolean {
    return !this.tdeGraphData || (Array.isArray(this.tdeGraphData) && this.tdeGraphData.length === 0);
  }
}
