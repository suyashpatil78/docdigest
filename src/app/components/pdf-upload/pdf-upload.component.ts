import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SummarizerService } from '../../services/summarizer.service';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-pdf-upload',
  imports: [MarkdownModule],
  templateUrl: './pdf-upload.component.html',
  styleUrls: ['./pdf-upload.component.scss']
})
export class PdfUploadComponent {
  summary = '';

  constructor(private summarizer: SummarizerService) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      this.summarizer.summarizePdf(file).subscribe(res => this.summary = res.summary);
    }
  }
}