import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SubService {
  number: string;
  title: string;
  description: string;
  icon: 'server' | 'vault' | 'recovery' | 'alerts';
  deliverables: string[];
}

interface HostingPlatform {
  name: string;
  subtitle: string;
  icon: 'aws' | 'azure' | 'own-server' | 'synology';
}

@Component({
  selector: 'app-service-sovereign-hosting',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-sovereign-hosting.component.html',
  styleUrl: './service-sovereign-hosting.component.css'
})
export class ServiceSovereignHostingComponent {
  // Free-to-use Unsplash photos, in the same order as the cards
  readonly cardPhotos = [
    'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&h=1000&q=70',
    'https://images.unsplash.com/photo-1639066648921-82d4500abf1a?auto=format&fit=crop&w=800&h=1000&q=70',
    'https://images.unsplash.com/photo-1680992046626-418f7e910589?auto=format&fit=crop&w=800&h=1000&q=70',
    'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=800&h=1000&q=70'
  ];

  @Output() planHosting = new EventEmitter<string>();

  isOverviewExpanded = signal(true);
  expandedCardIndex = signal<number | null>(null);

  subServices: SubService[] = [
    {
      number: '01',
      title: 'Managed App & DB Hosting',
      description: 'Dedicated Regional Servers for Web, Mobile & DB Systems',
      icon: 'server',
      deliverables: [
        'Isolated single-tenant compute & database environments',
        'Automated OS patching, SSL renewal & firewall hardening',
        'Zero-downtime application deployment & scaling'
      ]
    },
    {
      number: '02',
      title: 'Sovereign Local Backups',
      description: 'Client-Owned On-Premise Vault Configuration',
      icon: 'vault',
      deliverables: [
        'Encrypted automated snapshots to your local hardware vault',
        'Immutable off-site air-gapped backup replication',
        'Full physical custody & client-controlled encryption keys'
      ]
    },
    {
      number: '03',
      title: 'Disaster Recovery',
      description: 'Point-in-Time Restore & Failover Testing',
      icon: 'recovery',
      deliverables: [
        'Granular point-in-time database & file restoration',
        'Scheduled quarterly failover drills & RPO/RTO verification',
        'Hot-standby regional node readiness for rapid recovery'
      ]
    },
    {
      number: '04',
      title: 'Proactive Health Alerts',
      description: 'AI-Assisted Log & Uptime Monitoring',
      icon: 'alerts',
      deliverables: [
        '24/7 endpoint latency, CPU, memory & disk telemetry',
        'AI anomaly detection across application & security logs',
        'Instant SMS, email & WhatsApp incident escalation'
      ]
    }
  ];

  hostingPlatforms: HostingPlatform[] = [
    {
      name: 'AWS Hosting Services',
      subtitle: 'Dedicated EC2 compute, RDS databases & encrypted S3 storage buckets',
      icon: 'aws'
    },
    {
      name: 'Microsoft Azure Backup',
      subtitle: 'Geo-redundant cloud recovery vaults, snapshots & automated retention',
      icon: 'azure'
    },
    {
      name: 'Own Server Hosting & Custom Backup App',
      subtitle: 'On-premise bare-metal hosting paired with our custom automated backup application',
      icon: 'own-server'
    },
    {
      name: 'Synology NAS Backup',
      subtitle: 'Local private-cloud NAS replication, RAID redundancy & immutable snapshots',
      icon: 'synology'
    }
  ];

  toggleOverview(): void {
    this.isOverviewExpanded.update(v => !v);
  }

  toggleCard(index: number): void {
    this.expandedCardIndex.update(current => (current === index ? null : index));
  }

  onPlanHostingClick(): void {
    this.planHosting.emit('Sovereign Hosting & Backup');
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}