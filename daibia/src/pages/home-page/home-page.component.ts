import { AfterViewInit, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AboutUsComponent } from '../about-us/about-us.component';
import { ContactUsComponent } from '../contact-us/contact-us.component';
import { HomeHeroComponent } from '../home-hero/home-hero.component';
import { ServiceBandsComponent } from '../service-bands/service-bands.component';

@Component({
  selector: 'app-home-page',
  imports: [HomeHeroComponent, ServiceBandsComponent, AboutUsComponent, ContactUsComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements AfterViewInit {
  private readonly fragment = inject(ActivatedRoute).snapshot.fragment;
  // Browser back/forward keeps the visitor's previous scroll position instead
  private readonly isBackOrForward = inject(Router).getCurrentNavigation()?.trigger === 'popstate';

  ngAfterViewInit(): void {
    const target = this.fragment;
    if (target && !this.isBackOrForward) {
      // Runs after the router has reset the scroll position
      setTimeout(() => document.getElementById(target)?.scrollIntoView({ block: 'start' }), 150);
    }
  }
}
