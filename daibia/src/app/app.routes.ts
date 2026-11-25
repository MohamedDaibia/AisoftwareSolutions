import { Routes } from '@angular/router';
import { HomePageComponent } from '../pages/home-page/home-page.component';
import { ChatbotPageComponent } from '../pages/chatbot-page/chatbot-page.component';
import { ServiceDetailComponent } from '../pages/service-detail/service-detail.component';

const servicePage = (slug: string, bandId: string, title: string) => ({
  path: `services/${slug}`,
  component: ServiceDetailComponent,
  title: `${title} | Aisoftwaresolutions`,
  data: { service: slug, bandId }
});

export const routes: Routes = [
  { path: '', component: HomePageComponent, title: 'Aisoftwaresolutions' },
  servicePage('web-applications', 'service-01', 'Web, Windows & Mobile Applications'),
  servicePage('api-database', 'service-02', 'API, AI Integration & Database Systems'),
  servicePage('business-intelligence', 'service-03', 'Business Intelligence & Analytics'),
  servicePage('hosting-backup', 'service-04', 'Sovereign Hosting & Backup'),
  servicePage('ai-solutions', 'ai-services', 'AI Services & Intelligent Assistants'),
  { path: 'chatbot/:companyId', component: ChatbotPageComponent },
  { path: '**', redirectTo: '' }
];
