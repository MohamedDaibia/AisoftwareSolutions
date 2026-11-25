import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  private readonly contactService = inject(ContactService);

  // TODO: replace with your real business email / phone
  readonly contactEmail = 'enquiry@aisoftwaresolutions.app';
  readonly contactPhone = '9894836589';
  readonly whatsappUrl = 'https://wa.me/91' + this.contactPhone;
  readonly bookingUrl = 'https://calendar.app.google/bk9Hmp2xW5NEpo238';

  // Category names match what each service section's CTA button emits
  readonly categories: { name: string; services: string[] }[] = [
    {
      name: 'Custom Web, Windows & Mobile Applications',
      services: ['Enterprise Applications', 'Client Portals & Dashboards', 'UI/UX & Smart Search', 'Legacy Modernization']
    },
    {
      name: 'API, AI Integration & Database Systems',
      services: ['API & AI Integration', 'Database Architecture', 'Data Normalization', 'Security & Automation']
    },
    {
      name: 'Business Intelligence & Analytics',
      services: ['Product & Margin Analytics', 'Predictive Forecasting', 'Customer & Branch Insights', 'Automated Reporting']
    },
    {
      name: 'Sovereign Hosting & Backup',
      services: ['Managed App & DB Hosting', 'Sovereign Local Backups', 'Disaster Recovery', 'Proactive Health Alerts']
    },
    {
      name: 'AI Services & Intelligent Assistants',
      services: [
        'AI Customer Support Chatbot',
        'Product Recommendation Chatbot',
        'Website Information Assistant',
        'WhatsApp AI Assistant',
        'Internal Employee Support Chatbot',
        'Company Document AI Assistant'
      ]
    }
  ];

  model = { name: '', email: '', company: '', category: '', service: '', message: '', website: '' };

  get availableServices(): string[] {
    return this.categories.find(c => c.name === this.model.category)?.services ?? [];
  }

  onCategoryChange(): void {
    this.model.service = '';
  }

  /** Called from the home page when a service section's CTA button is clicked. */
  selectCategory(category: string): void {
    this.model.category = category;
    this.model.service = '';
  }
  sending = signal<boolean>(false);
  sent = signal<boolean>(false);
  errorMessage = signal<string>('');

  onSubmit(form?: NgForm): void {
    if (this.sending()) return;
    this.sending.set(true);
    this.sent.set(false);
    this.errorMessage.set('');

    this.contactService.send({ ...this.model }).subscribe({
      next: () => {
        this.sending.set(false);
        this.sent.set(true);
        this.model = { name: '', email: '', company: '', category: '', service: '', message: '', website: '' };
        form?.resetForm(this.model);
      },
      error: (err) => {
        this.sending.set(false);
        this.errorMessage.set(
          err?.error?.error ?? 'We couldn\'t send your message right now. Please try again later.'
        );
      }
    });
  }
}
