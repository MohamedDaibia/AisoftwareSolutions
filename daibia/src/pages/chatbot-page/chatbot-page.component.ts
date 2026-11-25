import { Component, ElementRef, OnInit, ViewChild, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ChatService } from './services/chat.service';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  category?: string;
}

interface Assistant {
  id: string;
  label: string;
  placeholder: string;
  greeting: string;
  samplePrompts: string[];
}

@Component({
  selector: 'app-chatbot-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './chatbot-page.component.html',
  styleUrl: './chatbot-page.component.css'
})
export class ChatbotPageComponent implements OnInit {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef<HTMLDivElement>;
  private chatService = inject(ChatService);
  private route = inject(ActivatedRoute);

  // Company id comes from the URL: /chatbot/:companyId
  private get companyId(): number {
    return Number(this.route.snapshot.paramMap.get('companyId'));
  }

  // Company name comes from the API (Companies table)
  companyName = signal<string>('');

  // Sample prompts come from the Faqs table (loaded once the chat is ready)
  samplePrompts = signal<string[]>([]);

  readonly assistant = computed<Assistant>(() => {
    const name = this.companyName() || 'Company';
    return {
      id: 'website',
      label: `${name} AI Assistant`,
      placeholder: `Ask me anything about ${name}...`,
      greeting: `Hi! I am the ${name} AI Assistant. Ask me about features, support, customizations or implementation.`,
      samplePrompts: this.samplePrompts()
    };
  });

  // 'loading' = company data is still being loaded by the API, chat stays hidden until 'ready'
  loadState = signal<'loading' | 'ready' | 'empty' | 'error'>('loading');
  loadError = signal<string>('');

  activeMode = this.assistant;
  userInput = signal<string>('');
  isTyping = signal<boolean>(false);

  messages = signal<ChatMessage[]>([]);

  ngOnInit(): void {
    this.loadCompany();
  }

  loadCompany(): void {
    if (!Number.isInteger(this.companyId) || this.companyId <= 0) {
      this.loadError.set('Invalid company link. Please use a URL like /chatbot/1.');
      this.loadState.set('error');
      return;
    }

    this.loadState.set('loading');
    this.chatService.getStatus(this.companyId).subscribe({
      next: (status) => {
        this.companyName.set(status.companyName ?? '');
        if (status.isReady) {
          this.messages.set([
            {
              id: 'init-1',
              sender: 'bot',
              text: this.assistant().greeting,
              timestamp: this.getCurrentTime(),
              category: this.assistant().label
            }
          ]);
          this.loadState.set('ready');
          this.loadSamplePrompts();
        } else {
          this.loadState.set('empty');
        }
      },
      error: (err) => {
        this.loadError.set(
          err?.status === 404
            ? 'Company not found. Please check the company id in the link.'
            : 'Unable to reach the ASP.NET Core API right now. Please verify the backend server is running and CORS is enabled.'
        );
        this.loadState.set('error');
      }
    });
  }

  private loadSamplePrompts(): void {
    this.chatService.getFaqs(this.companyId).subscribe({
      next: (questions) => this.samplePrompts.set(questions ?? []),
      error: () => this.samplePrompts.set([])
    });
  }

  sendPrompt(promptText: string): void {
    if (this.isTyping()) {
      return;
    }
    this.userInput.set(promptText);
    this.sendMessage();
  }

  sendMessage(): void {
    const text = this.userInput().trim();
    if (!text || this.isTyping()) {
      return;
    }

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: this.getCurrentTime()
    };

    this.messages.update(list => [...list, userMsg]);
    this.userInput.set('');
    this.isTyping.set(true);
    this.scrollToBottom();

    if (!Number.isInteger(this.companyId) || this.companyId <= 0) {
      this.messages.update(list => [...list, {
        id: `err-${Date.now()}`,
        sender: 'bot',
        text: 'Invalid company link. Please use a URL like /chatbot/1.',
        timestamp: this.getCurrentTime(),
        category: 'System Notice'
      }]);
      this.isTyping.set(false);
      this.scrollToBottom();
      return;
    }

    const historyPayload = this.messages()
      .slice(-6)
      .map(m => ({ sender: m.sender, text: m.text }));

    this.chatService
      .sendMessage(this.companyId, {
        message: text,
        mode: this.activeMode().id,
        history: historyPayload
      })
      .subscribe({
        next: (res) => {
          const botReply: ChatMessage = {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: res.reply,
            timestamp: this.getCurrentTime(),
            category: this.activeMode().label
          };
          this.messages.update(list => [...list, botReply]);
          this.isTyping.set(false);
          this.scrollToBottom();
        },
        error: () => {
          const errorReply: ChatMessage = {
            id: `err-${Date.now()}`,
            sender: 'bot',
            text: 'Unable to reach the ASP.NET Core API right now. Please verify the backend server is running and CORS is enabled.',
            timestamp: this.getCurrentTime(),
            category: 'System Notice'
          };
          this.messages.update(list => [...list, errorReply]);
          this.isTyping.set(false);
          this.scrollToBottom();
        }
      });
  }

  clearChat(): void {
    this.isTyping.set(false);
    this.messages.set([
      {
        id: `reset-${Date.now()}`,
        sender: 'bot',
        text: this.activeMode().greeting,
        timestamp: this.getCurrentTime(),
        category: this.activeMode().label
      }
    ]);
    this.scrollToBottom();
  }

  private getCurrentTime(): string {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.messagesContainer?.nativeElement) {
        const el = this.messagesContainer.nativeElement;
        el.scrollTop = el.scrollHeight;
      }
    }, 50);
  }
}