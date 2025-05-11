import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';

@Component({
  selector: 'app-pdf-upload',
  imports: [],
  templateUrl: './pdf-upload.component.html',
  styleUrls: ['./pdf-upload.component.scss']
})
export class PdfUploadComponent implements OnInit {
  @Input() isLoading: boolean = false;

  isHovering = signal(false);

  fileName = signal<string | null>(null);

  @Output() pdfFileUploaded = new EventEmitter<File>();

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      this.fileName.set(file.name);
      this.pdfFileUploaded.emit(file);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isHovering.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isHovering.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isHovering.set(false);
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.fileName.set(files[0].name);
      this.pdfFileUploaded.emit(files[0]);
    }
  }

  ngOnInit() {
    // Prevent default behavior on the document level
    window.addEventListener('dragover', e => e.preventDefault());
    window.addEventListener('drop', e => e.preventDefault());
  }
}