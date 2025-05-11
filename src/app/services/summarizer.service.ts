import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class SummarizerService {
  constructor(private http: HttpClient) {}

  summarizePdf(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ summary: string }>(`${environment.API_URL}/summarize/pdf`, formData);
  }
}