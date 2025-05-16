import { Component, inject, signal } from '@angular/core';
import { EMPTY } from 'rxjs';
import { SummarizerService } from '../../services/summarizer.service';
import { TrackingService } from '../../services/tracking.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, finalize } from 'rxjs';
import { PdfUploadComponent } from '../pdf-upload/pdf-upload.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-home',
  imports: [PdfUploadComponent, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
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
}
