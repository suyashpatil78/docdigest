import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PdfUploadComponent } from './components/pdf-upload/pdf-upload.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PdfUploadComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
