import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SubService {
  number: string;
  title: string;
  description: string;
  icon: 'margin' | 'forecast' | 'customers' | 'reporting';
  deliverables: string[];
}

interface AnalyticsTool {
  name: string;
  subtitle: string;
  icon: 'powerbi' | 'tableau' | 'looker' | 'embedded';
}

@Component({
  selector: 'app-service-bi-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-bi-analytics.component.html',
  styleUrl: './service-bi-analytics.component.css'
})
export class ServiceBiAnalyticsComponent {
  // Free-to-use Unsplash photos, in the same order as the cards
  readonly cardPhotos = [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&h=1000&q=70',
    'https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=800&h=1000&q=70',
    'https://images.unsplash.com/photo-1542744173-05336fcc7ad4?auto=format&fit=crop&w=800&h=1000&q=70',
    'https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?auto=format&fit=crop&w=800&h=1000&q=70'
  ];

  @Output() requestDemo = new EventEmitter<string>();

  isOverviewExpanded = signal(true);
  expandedCardIndex = signal<number | null>(null);

  subServices: SubService[] = [
    {
      number: '01',
      title: 'Product & Margin Analytics',
      description: 'Top-Selling & Highest-Profit Item Tracking',
      icon: 'margin',
      deliverables: [
        'SKU-level gross margin, landed cost & discount impact tracking',
        'Fast-moving vs. slow-moving inventory velocity scorecards',
        'Real-time category profitability & price elasticity views'
      ]
    },
    {
      number: '02',
      title: 'Predictive Forecasting',
      description: 'AI-Assisted Demand Trends & Stockout Alerts',
      icon: 'forecast',
      deliverables: [
        'Seasonal demand projection & automated reorder point alerts',
        'Dead-stock & overstock early warning indicators',
        'AI-driven revenue & cash-flow scenario modeling'
      ]
    },
    {
      number: '03',
      title: 'Customer & Branch Insights',
      description: 'Repeat Buyers, Regional Trends & KPIs',
      icon: 'customers',
      deliverables: [
        'RFM customer segmentation & repeat-purchase cohort tracking',
        'Side-by-side branch, territory & sales rep performance KPIs',
        'Customer churn risk detection & basket-size analysis'
      ]
    },
    {
      number: '04',
      title: 'Automated Reporting',
      description: 'Scheduled PDF, Excel & CSV Executive Exports',
      icon: 'reporting',
      deliverables: [
        'Automated daily, weekly & monthly executive summaries',
        'One-click formatted Excel, CSV & PDF boardroom exports',
        'Scheduled email & threshold-triggered KPI notifications'
      ]
    }
  ];

  analyticsTools: AnalyticsTool[] = [
    {
      name: 'Microsoft Power BI',
      subtitle: 'Enterprise scorecards, SQL integration & scheduled exports',
      icon: 'powerbi'
    },
    {
      name: 'Tableau',
      subtitle: 'Interactive visual exploration & regional trend breakdowns',
      icon: 'tableau'
    },
    {
      name: 'Looker Studio (Google)',
      subtitle: 'Lightweight cloud KPI dashboards & live executive sharing',
      icon: 'looker'
    },
    {
      name: 'Custom Embedded Analytics',
      subtitle: 'Purpose-built dashboards (Angular / Chart.js / Apache ECharts) embedded inside your web or client portal with role-based access',
      icon: 'embedded'
    }
  ];

  toggleOverview(): void {
    this.isOverviewExpanded.update(v => !v);
  }

  toggleCard(index: number): void {
    this.expandedCardIndex.update(current => (current === index ? null : index));
  }

  onDemoClick(): void {
    this.requestDemo.emit('Business Intelligence & Analytics');
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}