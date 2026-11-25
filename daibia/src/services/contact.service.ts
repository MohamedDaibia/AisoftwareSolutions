import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface ContactRequest {
  name: string;
  email: string;
  company: string;
  category: string;
  service: string;
  message: string;
  website: string; // honeypot, always empty for real users
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private http = inject(HttpClient);
  // Matches ContactController: [Route("api/[controller]")] + [HttpPost]
  private readonly apiUrl = `${environment.apiBaseUrl}/contact`;

  send(payload: ContactRequest): Observable<{ sent: boolean }> {
    return this.http.post<{ sent: boolean }>(this.apiUrl, payload);
  }
}
