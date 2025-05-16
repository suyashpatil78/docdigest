import { Component, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  title = 'frontend';

  summary = signal<string>('');

  isLoading = signal(false);

  errorMessage = signal<string>('');

  private router = inject(Router);

  handleError(err: HttpErrorResponse) {
    if (err.status === 429) {
      this.errorMessage.set('Too many requests. Please try again after some time.');
    } else {
      this.errorMessage.set('Something went wrong. Please try again later.');
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.router.navigate(['/chat'], { state: { file } });
    }
  }
}
