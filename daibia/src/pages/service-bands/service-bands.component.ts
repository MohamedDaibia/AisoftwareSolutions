import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface ServiceBand {
  id: string;
  slug: string;
  title: string;
  summary: string;
  image: string;
}

const photo = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1920&q=75`;

@Component({
  selector: 'app-service-bands',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './service-bands.component.html',
  styleUrl: './service-bands.component.css'
})
export class ServiceBandsComponent {
  // ids match the links in the navbar and hero; slugs match the detail page routes
  readonly services: ServiceBand[] = [
    {
      id: 'service-01',
      slug: 'web-applications',
      title: 'Custom Web, Windows & Mobile Applications',
      summary:
        'Web, Windows and mobile applications built around your workflows, with intuitive interfaces and secure backends that cut manual bottlenecks.',
      image: photo('1498050108023-c5249f4df085')
    },
    {
      id: 'service-02',
      slug: 'api-database',
      title: 'API, AI Integration & Database Systems',
      summary:
        'REST APIs, AI integration, SQL optimization and data normalization that keep your systems connected and your data well organised.',
      image: photo('1558494949-ef010cbdcc31')
    },
    {
      id: 'service-03',
      slug: 'business-intelligence',
      title: 'Business Intelligence & Analytics',
      summary:
        'Turn sales, order and branch data into dashboards that show top products, profit margins, forecasts and restock needs.',
      image: photo('1460925895917-afdab827c52f')
    },
    {
      id: 'service-04',
      slug: 'hosting-backup',
      title: 'Sovereign Hosting & Backup',
      summary: 'Managed application and database care, local backup vaults, disaster recovery and proactive health alerts.',
      image: photo('1695668548342-c0c1ad479aee')
    },
    {
      id: 'ai-services',
      slug: 'ai-solutions',
      title: 'AI Services & Intelligent Assistants',
      summary:
        'Custom AI chatbots and assistants for customer support, product recommendations, your website, WhatsApp, employees and company documents.',
      image: photo('1677442136019-21780ecad995')
    }
  ];
}
