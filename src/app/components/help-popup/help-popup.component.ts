import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Select, Store } from '@ngxs/store';
import { HelpState, HelpStateModel, ClearHelpData } from '../../store/help.state';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-help-popup',
  templateUrl: './help-popup.component.html',
  styleUrls: ['./help-popup.component.css']
})
export class HelpPopupComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('helpModal', { static: false }) modalElement!: ElementRef;
  
  @Select(HelpState.getHelpData) helpData$!: Observable<HelpStateModel>;
  
  helpTitle: string = '';
  contentPath: string = '';
  
  content: SafeHtml | string | null = null;
  contentType: 'image' | 'html' = 'html';
  loading: boolean = true;
  error: string = '';
  imagePath: string = '';
  private helpDataSubscription?: Subscription;

  constructor(
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private store: Store
  ) {}

  ngOnInit(): void {
    // Subscribe to help data changes from store
    this.helpDataSubscription = this.helpData$.subscribe(data => {
      if (data && data.helpTitle && data.contentPath) {
        this.helpTitle = data.helpTitle;
        this.contentPath = data.contentPath;
        this.loadContent();
      }
    });

    // Initialize Bootstrap modal after view init
    setTimeout(() => {
      this.initializeModal();
    }, 100);
  }

  ngAfterViewInit(): void {
    this.initializeModal();
  }

  private initializeModal(): void {
    // Bootstrap 4 uses jQuery, so we don't need to initialize here
    // The modal will be opened via jQuery in the parent component
  }

  ngOnDestroy(): void {
    if (this.helpDataSubscription) {
      this.helpDataSubscription.unsubscribe();
    }
  }

  private loadContent(): void {
    this.loading = true;
    this.error = '';
    this.content = null;
    this.imagePath = '';

    if (!this.contentPath) {
      this.error = 'No content path provided';
      this.loading = false;
      return;
    }

    // Determine content type based on file extension
    const extension = this.contentPath.toLowerCase().split('.').pop();
    if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'bmp'].includes(extension || '')) {
      this.contentType = 'image';
      this.imagePath = `assets/resources/help/${this.contentPath}`;
      this.loading = false;
    } else if (extension === 'html') {
      this.contentType = 'html';
      this.loadHtmlContent();
    } else {
      // Default to HTML if extension is unknown
      this.contentType = 'html';
      this.loadHtmlContent();
    }
  }

  private loadHtmlContent(): void {
    this.http.get(`assets/resources/help/${this.contentPath}`, { responseType: 'text' })
      .subscribe({
        next: (html) => {
          this.content = this.sanitizer.bypassSecurityTrustHtml(html);
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading help content:', err);
          this.error = 'Failed to load help content';
          this.loading = false;
        }
      });
  }

  close(): void {
    // Close modal using Bootstrap 4 jQuery
    if (typeof (window as any).$ !== 'undefined') {
      (window as any).$('#helpModal').modal('hide');
    }
    // Clear the store data
    this.store.dispatch(new ClearHelpData());
  }
}

