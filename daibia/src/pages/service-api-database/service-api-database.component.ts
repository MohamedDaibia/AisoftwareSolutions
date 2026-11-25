import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SubService {
  number: string;
  title: string;
  description: string;
  icon: 'api' | 'database' | 'normalize' | 'security';
  deliverables: string[];
}

interface IntegrationItem {
  name: string;
  icon:
    | 'amazon'
    | 'ebay'
    | 'shopify'
    | 'credit-card'
    | 'paypal'
    | 'stripe'
    | 'quickbooks'
    | 'sage'
    | 'zoho'
    | 'elite-extra'
    | 'ftp'
    | 'xero'
    | 'custom-api';
}

@Component({
  selector: 'app-service-api-database',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-api-database.component.html',
  styleUrl: './service-api-database.component.css'
})
export class ServiceApiDatabaseComponent {
  // Free-to-use Unsplash photos, in the same order as the cards
  readonly cardPhotos = [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&h=1000&q=70',
    'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=800&h=1000&q=70',
    'https://images.unsplash.com/photo-1644088379091-d574269d422f?auto=format&fit=crop&w=800&h=1000&q=70',
    'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=800&h=1000&q=70'
  ];

  @Output() discussArchitecture = new EventEmitter<string>();

  isOverviewExpanded = signal(true);
  expandedCardIndex = signal<number | null>(null);
  isIntegrationsExpanded = signal(false);

  subServices: SubService[] = [
    {
      number: '01',
      title: 'API & AI Integration',
      description: 'Secure APIs, AI Model Pipelines & Third-Party Connectors',
      icon: 'api',
      deliverables: [
        'Custom API development & third-party ERP/CRM connectors',
        'AI integration solutions: LLM orchestration, RAG & intelligent agents',
        'Webhook event streaming & automated payload validation'
      ]
    },
    {
      number: '02',
      title: 'Database Architecture',
      description: 'Relational & Vector Data Modeling & Query Tuning',
      icon: 'database',
      deliverables: [
        'High-performance relational schema design & indexing',
        'Vector database indexing for AI semantic search & embeddings',
        'Slow-query profiling, partitioning & throughput optimization'
      ]
    },
    {
      number: '03',
      title: 'Data Normalization',
      description: 'AI-Assisted Catalog Cleanup & Deduplication',
      icon: 'normalize',
      deliverables: [
        'Automated entity resolution & fuzzy record matching',
        'Cross-branch SKU, vendor & customer catalog standardization',
        'Continuous data quality validation & enrichment pipelines'
      ]
    },
    {
      number: '04',
      title: 'Security & Automation',
      description: 'SSO, Role Permissions & Scheduled Sync Jobs',
      icon: 'security',
      deliverables: [
        'OAuth2/OIDC single sign-on & granular API token scoping',
        'Encrypted data-in-transit & audit trail logging',
        'Fault-tolerant scheduled synchronization & retry queues'
      ]
    }
  ];

  integrations: IntegrationItem[] = [
    { name: 'Amazon Seller & SP-API', icon: 'amazon' },
    { name: 'eBay Marketplace Sync', icon: 'ebay' },
    { name: 'Shopify Storefront & Orders', icon: 'shopify' },
    { name: 'Credit Card Processing', icon: 'credit-card' },
    { name: 'Payment Gateways (PayPal)', icon: 'paypal' },
    { name: 'Stripe Payments & Billing', icon: 'stripe' },
    { name: 'QuickBooks Desktop & Online', icon: 'quickbooks' },
    { name: 'Sage 100, 300, Intacct', icon: 'sage' },
    { name: 'Zoho Books Accounting', icon: 'zoho' },
    { name: 'Elite EXTRA Dispatch', icon: 'elite-extra' },
    { name: 'FTP / SFTP Batch Integration', icon: 'ftp' },
    { name: 'Xero & NetSuite ERP', icon: 'xero' },
    { name: 'Custom REST & Webhook APIs', icon: 'custom-api' }
  ];

  toggleOverview(): void {
    this.isOverviewExpanded.update(v => !v);
  }

  toggleCard(index: number): void {
    this.expandedCardIndex.update(current => (current === index ? null : index));
  }

  toggleIntegrations(): void {
    this.isIntegrationsExpanded.update(v => !v);
  }

  onDiscussClick(): void {
    this.discussArchitecture.emit('API, AI Integration & Database Systems');
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}