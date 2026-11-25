import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface AiServiceItem {
  number: string;
  title: string;
  description: string;
  icon: 'support-bot' | 'product-rec' | 'web-assistant' | 'whatsapp-ai' | 'employee-bot' | 'doc-qa';
  deliverables: string[];
}

@Component({
  selector: 'app-ai-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ai-services.component.html',
  styleUrl: './ai-services.component.css'
})
export class AiServicesComponent {
  // Free-to-use Unsplash photos, in the same order as the cards
  readonly cardPhotos = [
    'https://images.unsplash.com/photo-1626863905121-3b0c0ed7b94c?auto=format&fit=crop&w=800&h=1000&q=70',
    'https://images.unsplash.com/photo-1556745753-b2904692b3cd?auto=format&fit=crop&w=800&h=1000&q=70',
    'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&h=1000&q=70',
    'https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=800&h=1000&q=70',
    'https://images.unsplash.com/photo-1560264280-88b68371db39?auto=format&fit=crop&w=800&h=1000&q=70',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&h=1000&q=70'
  ];

  @Output() requestAiService = new EventEmitter<string>();

  isOverviewExpanded = signal(true);
  expandedCardIndex = signal<number | null>(null);

  aiServices: AiServiceItem[] = [
    {
      number: '01',
      title: 'AI Customer Support Chatbot',
      description: '24/7 Automated Ticket Resolution, Order Tracking & Smart Escalation',
      icon: 'support-bot',
      deliverables: [
        'Instant answers for FAQs, order status, returns & billing inquiries',
        'Seamless live-agent handoff with full conversation context',
        'Multi-language support integrated with your CRM & helpdesk'
      ]
    },
    {
      number: '02',
      title: 'Product Recommendation Chatbot',
      description: 'Conversational Guided Selling & Personalized SKU Discovery',
      icon: 'product-rec',
      deliverables: [
        'Interactive buyer-intent discovery & tailored product matching',
        'Real-time catalog, inventory & compatibility filtering',
        'Automated cross-sell & upsell prompts to boost cart conversion'
      ]
    },
    {
      number: '03',
      title: 'Website Information Assistant',
      description: 'Embedded On-Site AI Concierge Trained on Your Web Pages',
      icon: 'web-assistant',
      deliverables: [
        'Natural-language navigation across services, pricing & policies',
        'Lead capture, quote pre-qualification & appointment scheduling',
        'Lightweight, brand-styled widget for desktop & mobile browsers'
      ]
    },
    {
      number: '04',
      title: 'WhatsApp AI Assistant',
      description: 'Instant Customer Replies, Catalog Sharing & Bookings on WhatsApp',
      icon: 'whatsapp-ai',
      deliverables: [
        'Official WhatsApp Business API integration with automated replies',
        'Order confirmations, delivery updates & invoice sharing in chat',
        'Automated appointment booking & lead routing for sales teams'
      ]
    },
    {
      number: '05',
      title: 'Internal Employee Support Chatbot',
      description: 'Private Workplace Assistant for HR, IT & Daily Operations',
      icon: 'employee-bot',
      deliverables: [
        'Instant answers on company policies, leave rules & IT troubleshooting',
        'Role-based access controls to protect sensitive departmental data',
        'Faster employee onboarding with step-by-step workflow guidance'
      ]
    },
    {
      number: '06',
      title: 'Company Document AI Assistant',
      description: 'Private Knowledge Search & Q&A Across SOPs, PDFs & Manuals',
      icon: 'doc-qa',
      deliverables: [
        'Accurate, cited answers sourced directly from your internal documents',
        'Supports PDFs, Word files, spreadsheets, contracts & technical guides',
        'Sovereign data privacy—your documents stay isolated and secure'
      ]
    }
  ];

  toggleOverview(): void {
    this.isOverviewExpanded.update(v => !v);
  }

  toggleCard(index: number): void {
    this.expandedCardIndex.update(current => (current === index ? null : index));
  }

  onConsultClick(): void {
    this.requestAiService.emit('AI Services & Intelligent Assistants');
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}