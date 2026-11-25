import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HomeHeroComponent } from '../home-hero/home-hero.component';
import { ServiceWebAppComponent } from '../service-web-app/service-web-app.component';
import { ServiceApiDatabaseComponent } from '../service-api-database/service-api-database.component';
import { ServiceBiAnalyticsComponent } from '../service-bi-analytics/service-bi-analytics.component';
import { ServiceSovereignHostingComponent } from '../service-sovereign-hosting/service-sovereign-hosting.component';
import { AiServicesComponent } from '../ai-services/ai-services.component';
import { ContactUsComponent } from '../contact-us/contact-us.component';

@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [
    RouterLink,
    HomeHeroComponent,
    ServiceWebAppComponent,
    ServiceApiDatabaseComponent,
    ServiceBiAnalyticsComponent,
    ServiceSovereignHostingComponent,
    AiServicesComponent,
    ContactUsComponent
  ],
  templateUrl: './service-detail.component.html',
  styleUrl: './service-detail.component.css'
})
export class ServiceDetailComponent {
  private readonly data = inject(ActivatedRoute).snapshot.data;

  readonly service: string = this.data['service'];
  /** Which service band on the home page the back link returns to */
  readonly bandId: string = this.data['bandId'];
}
