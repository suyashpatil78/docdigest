import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SummarizerService } from '../../services/summarizer.service';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { SummaryComponent } from '../summary/summary.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-chat',
  imports: [PdfViewerModule, FormsModule, SummaryComponent, NavbarComponent],
  providers: [],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  private router = inject(Router);

  file = this.router.getCurrentNavigation()?.extras.state?.['file'];

  pdfSrc = signal<Uint8Array | null>(null);

  summary = signal<string>('');

  chats = signal<{message: string, ai: boolean}[]>([]);

  message = '';

  pdfText = '';

  isLoading = signal(false);

  private summarizerService = inject(SummarizerService);

  sendMessage(event: Event) {
    event.preventDefault();
    if (this.message === '') {
      return;
    }
    this.isLoading.set(true);
    this.chats.set([...this.chats(), {message: this.message, ai: false}]);
    this.summarizerService.askQuestion(this.message, this.pdfText).pipe(finalize(() => this.isLoading.set(false))).subscribe((res) => {
      this.chats.set([...this.chats(), {message: res.summary, ai: true}]);
      this.message = '';
    });
  }

  ngOnInit() {
    if (!this.file) {
      this.router.navigate(['/']);
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.pdfSrc.set(new Uint8Array(reader.result as ArrayBuffer));
    };
    reader.readAsArrayBuffer(this.file);
    this.summarizerService.summarizePdf(this.file).subscribe((res) => {
      this.summary.set(res.summary);
      this.pdfText = res.pdf_text;
    });
  }
}