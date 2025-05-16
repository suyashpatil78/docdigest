import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

declare const google: any;

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Output() pdfFileUploaded = new EventEmitter<File>();

  private router = inject(Router);

  fileName = signal<string | null>(null);

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName.set(file.name);
      this.router.navigate(['/chat'], { state: { file } });
    }
  }
}
