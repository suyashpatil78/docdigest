import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PdfUploadComponent } from './components/pdf-upload/pdf-upload.component';
import { SummarizerService } from './services/summarizer.service';
import { SummaryComponent } from './components/summary/summary.component';
import { TypewriterComponent } from './components/typewriter/typewriter.component';
import { catchError, EMPTY, finalize } from 'rxjs';
import { TrackingService } from './services/tracking.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PdfUploadComponent, SummaryComponent, TypewriterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';

  summary = signal<string>('');

  isLoading = signal(false);

  errorMessage = signal<string>('');

  private summarizerService = inject(SummarizerService);

  private trackingService = inject(TrackingService);

  handleError(err: HttpErrorResponse) {
    if (err.status === 429) {
      this.errorMessage.set('Too many requests. Please try again after some time.');
    } else {
      this.errorMessage.set('Something went wrong. Please try again later.');
    }
  }

  onPdfFileUploaded(pdfFile: File) {
    this.isLoading.set(true);
    this.trackingService.trackEvent('PDF Uploaded');
    this.summarizerService.summarizePdf(pdfFile)
      .pipe(
        finalize(() => this.isLoading.set(false)),
        catchError((err) => {
          this.handleError(err);
          return EMPTY;
        })
      ).subscribe(res => {
          this.summary.set(res.summary);
          this.trackingService.trackEvent('Summary Generated');
        }
      );
  }

  ngOnInit() {
    this.trackingService.init();
    this.trackingService.trackEvent('Page Visited');
  }
}
