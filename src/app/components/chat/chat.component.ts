import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-chat',
  imports: [PdfViewerModule],
  providers: [],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  private router = inject(Router);

  file = this.router.getCurrentNavigation()?.extras.state?.['file'];

  pdfSrc = signal<Uint8Array | null>(null);

  ngOnInit() {
    if (!this.file) {
      this.router.navigate(['/']);
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.pdfSrc.set(new Uint8Array(reader.result as ArrayBuffer));
    };
    reader.readAsArrayBuffer(this.file);
  }
}
