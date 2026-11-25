import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ChatHistoryItem {
  sender: 'user' | 'bot';
  text: string;
}

export interface ChatRequest {
  message: string;
  mode: string;
  history: ChatHistoryItem[];
}

export interface CompanyStatus {
  companyId: number;
  companyName: string;
  isReady: boolean;
  learnedChunks: number;
}

export interface ChatResponse {
  reply: string;
  mode: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private http = inject(HttpClient);
  // Matches ChatBotController: [Route("api/[controller]")] + [HttpPost("{companyId}/message")]
  private readonly apiUrl = `${environment.apiBaseUrl}/chatbot`;

  // Loads the company's knowledge base on the API (if not loaded yet) and returns once it is ready
  getStatus(companyId: number): Observable<CompanyStatus> {
    return this.http.get<CompanyStatus>(`${this.apiUrl}/${companyId}/status`);
  }

  // Sample prompts for the chat: the company's questions from the Faqs table, already sorted by SortNumber
  getFaqs(companyId: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/${companyId}/faqs`);
  }

  sendMessage(companyId: number, payload: ChatRequest): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(`${this.apiUrl}/${companyId}/message`, payload);
  }
}