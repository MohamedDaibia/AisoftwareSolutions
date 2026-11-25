import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SubService {
  number: string;
  title: string;
  description: string;
  icon: 'code' | 'portal' | 'chart' | 'legacy';
  deliverables: string[];
}

interface PlatformItem {
  name: string;
  icon:
    | 'figma'
    | 'illustrator'
    | 'after-effects'
    | 'android'
    | 'ios'
    | 'windows'
    | 'cloud'
    | 'dashboards'
    | 'web';
}

@Component({
  selector: 'app-service-web-app',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-web-app.component.html',
  styleUrl: './service-web-app.component.css'
})
export class ServiceWebAppComponent {
  // Free-to-use Unsplash photos, in the same order as the cards
  readonly cardPhotos = [
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&h=1000&q=70',
    'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&h=1000&q=70',
    'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=800&h=1000&q=70',
    'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&w=800&h=1000&q=70'
  ];

  @Output() requestEstimate = new EventEmitter<string>();

  isOverviewExpanded = signal(true);
  expandedCardIndex = signal<number | null>(null);
  isPlatformsExpanded = signal(false);

  subServices: SubService[] = [
    {
      number: '01',
      title: 'Enterprise Applications',
      description: 'Custom Web, Windows & Mobile Software Architecture',
      icon: 'code',
      deliverables: [
        'Modular clean-architecture cross-platform applications',
        'High-concurrency workflows & responsive state management',
        'Automated deployment & release pipelines'
      ]
    },
    {
      number: '02',
      title: 'Client Portals & Dashboards',
      description: 'Role-Based Access & Self-Service Operations',
      icon: 'portal',
      deliverables: [
        'Granular role-based permissions & single sign-on',
        'Real-time operational status & approval workflows',
        'Responsive customer self-service portals'
      ]
    },
    {
      number: '03',
      title: 'UI/UX & Smart Search',
      description: 'Responsive Design Systems & AI-Assisted Lookup',
      icon: 'chart',
      deliverables: [
        'Accessible component libraries across desktop & mobile',
        'Instant faceted & AI-powered semantic lookup',
        'Interactive wireframing & high-fidelity prototyping'
      ]
    },
    {
      number: '04',
      title: 'Legacy Modernization',
      description: 'Refactoring Older Software Into Modern Platforms',
      icon: 'legacy',
      deliverables: [
        'Zero-downtime incremental system migrations',
        'Upgrading legacy desktop & web tools into modern platforms',
        'Historical data cleanup & performance optimization'
      ]
    }
  ];

  platforms: PlatformItem[] = [
    { name: 'Web Portals & Platforms', icon: 'web' },
    { name: 'Android Mobile Apps', icon: 'android' },
    { name: 'iOS Mobile Apps', icon: 'ios' },
    { name: 'Windows Desktop Apps', icon: 'windows' },
    { name: 'Cloud Applications', icon: 'cloud' },
    { name: 'Interactive Dashboards', icon: 'dashboards' },
    { name: 'Figma UI/UX Prototyping', icon: 'figma' },
    { name: 'Adobe Illustrator Vector Assets', icon: 'illustrator' },
    { name: 'After Effects Motion & UI Animation', icon: 'after-effects' }
  ];

  toggleOverview(): void {
    this.isOverviewExpanded.update(v => !v);
  }

  toggleCard(index: number): void {
    this.expandedCardIndex.update(current => (current === index ? null : index));
  }

  togglePlatforms(): void {
    this.isPlatformsExpanded.update(v => !v);
  }

  onEstimateClick(): void {
    this.requestEstimate.emit('Custom Web, Windows & Mobile Applications');
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}