import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PdfUploadComponent } from './components/pdf-upload/pdf-upload.component';
import { SummarizerService } from './services/summarizer.service';
import { SummaryComponent } from './components/summary/summary.component';
import { TypewriterComponent } from './components/typewriter/typewriter.component';
import { finalize } from 'rxjs';

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

  onPdfFileUploaded(pdfFile: File) {
    this.isLoading.set(true);
    this.summarizerService.summarizePdf(pdfFile).pipe(finalize(() => this.isLoading.set(false))).subscribe(res => {
      this.summary.set(res.summary);
    });
  }
}
