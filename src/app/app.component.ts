import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PdfUploadComponent } from './components/pdf-upload/pdf-upload.component';
import { SummarizerService } from './services/summarizer.service';
import { SummaryComponent } from './components/summary/summary.component';
import { TypewriterComponent } from './components/typewriter/typewriter.component';
import { finalize } from 'rxjs';
import { TrackingService } from './services/tracking.service';

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

  private summarizerService = inject(SummarizerService);

  private trackingService = inject(TrackingService);

  onPdfFileUploaded(pdfFile: File) {
    this.isLoading.set(true);
    this.trackingService.trackEvent('PDF Uploaded');
    this.summarizerService.summarizePdf(pdfFile).pipe(finalize(() => this.isLoading.set(false))).subscribe(res => {
      this.summary.set(res.summary);
      this.trackingService.trackEvent('Summary Generated');
    });
  }

  ngOnInit() {
    this.trackingService.init();
    this.trackingService.trackEvent('Page Visited');
  }
}
