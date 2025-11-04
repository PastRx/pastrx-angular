import { Component, Input, OnChanges, SimpleChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

declare global {
  interface Window {
    PASTRX: any;
  }
}

@Component({
  selector: 'app-patient-stims-graph',
  templateUrl: './patient-stims-graph.component.html',
  styleUrls: ['./patient-stims-graph.component.css']
})
export class PatientStimsGraphComponent implements OnChanges, AfterViewInit {
  @Input() tdeGraphData: any;
  @ViewChild('stimCanvas', { static: false }) stimCanvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    if (this.stimCanvas) {
      this.stimCanvas.nativeElement.addEventListener('click', (e) => {
        this.onCanvasClick(e);
      });
    }

    window.addEventListener('resize', () => {
      setTimeout(() => this.refresh(), 100);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tdeGraphData'] && this.tdeGraphData && this.stimCanvas) {
      this.refresh();
    }
  }

  onCanvasClick(ev: MouseEvent) {
    if (this.stimCanvas && window.PASTRX && window.PASTRX.selectActivesInCanvas) {
      window.PASTRX.selectActivesInCanvas(ev, this.stimCanvas.nativeElement);
    }
  }

  refresh() {
    if (!this.stimCanvas || !window.PASTRX) return;

    // Ensure PASTRX.PASTReport is set (required by plotting functions)
    if (!window.PASTRX.PASTReport && window.reactReportData?.pastReport) {
      window.PASTRX.PASTReport = window.reactReportData.pastReport;
    }

    const canvas = this.stimCanvas.nativeElement;
    window.PASTRX.clearCanvas(canvas);

    if (this.tdeGraphData && Array.isArray(this.tdeGraphData) && this.tdeGraphData.length > 0 && window.PASTRX.plotStimOrBenzoData && window.PASTRX.PASTReport) {
      const container = canvas.parentElement;
      if (container) {
        // Set container height to match CSS
        container.style.height = '27px';
        
        // Get the full panel width from the parent flex-row container (includes label + canvas)
        const panelContainer = container.parentElement; // The d-flex flex-row div
        const panelWidth = panelContainer?.offsetWidth || panelContainer?.clientWidth || container.offsetWidth || 0;
        const labelWidth = 50;
        // Calculate canvas width: full panel width minus label (50px), minimal padding, and right padding (10px)
        const canvasWidth = Math.max(0, panelWidth - labelWidth - 2 - 10);
        canvas.style.width = canvasWidth + 'px';
        canvas.style.height = '27px';
      }

      window.PASTRX.plotStimOrBenzoData(this.tdeGraphData, canvas, 'STIMULANT');
    }
  }

  clearCanvas() {
    if (this.stimCanvas && window.PASTRX) {
      window.PASTRX.clearCanvas(this.stimCanvas.nativeElement);
    }
  }

  isLoading(): boolean {
    return !this.tdeGraphData || (Array.isArray(this.tdeGraphData) && this.tdeGraphData.length === 0);
  }
}
