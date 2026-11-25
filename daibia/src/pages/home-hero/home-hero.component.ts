import { Component, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Output, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface CoreServiceCard {
  number: string;
  title: string;
  description: string;
  targetId: string;
  icon: 'code' | 'database' | 'analytics' | 'hosting';
  showChevron?: boolean;
}

@Component({
  selector: 'app-home-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-hero.component.html',
  styleUrl: './home-hero.component.css'
})
export class HomeHeroComponent implements OnInit, OnDestroy {
  /** Set on the service detail pages: shows the navbar without the hero. */
  @Input() @HostBinding('class.header-only') headerOnly = false;
  @Input() set initialNav(key: string) {
    this.activeNav.set(key);
  }

  private readonly router = inject(Router);

  @Output() navigateToSection = new EventEmitter<string>();

  

activeNav = signal<string>('home');
  mobileMenuOpen = signal<boolean>(false);

  // Typewriter animation signals
  typedLine1 = signal<string>('');
  typedLine2 = signal<string>('');
  activeLine = signal<1 | 2 | 0>(1);

  

  private readonly line1Text = 'AI Software Solutions, Data Intelligence';
  private readonly line2Text = '& Reliable Operations';
  private typingTimer?: ReturnType<typeof setTimeout>;

  private readonly bookingUrl = 'https://calendar.app.google/bk9Hmp2xW5NEpo238';

  onBookAppointment(): void {
    this.activeNav.set('contact');
    window.open(this.bookingUrl, '_blank', 'noopener,noreferrer');
  }

  coreServices: CoreServiceCard[] = [
    {
      number: '01',
      title: 'Custom Web, Windows & Mobile Applications',
      description: 'AI Powered, Scalable & Secure Solutions',
      targetId: 'service-01',
      icon: 'code',
      showChevron: true
    },
    {
      number: '02',
      title: 'API & Database\nSystems',
      description: 'REST APIs, SQL Optimization & Data Normalization',
      targetId: 'service-02',
      icon: 'database'
    },
    {
      number: '03',
      title: 'Business Intelligence\n& Analytics',
      description: 'Top Products, Profit Margins & Forecasting',
      targetId: 'service-03',
      icon: 'analytics'
    },
    {
      number: '04',
      title: 'Sovereign Hosting &\nBackup',
      description: 'Managed App Care, Local Vaults & Recovery',
      targetId: 'service-04',
      icon: 'hosting'
    }
  ];

  ngOnInit(): void {
    this.startTypingAnimation();
  }

  ngOnDestroy(): void {
    if (this.typingTimer) {
      clearTimeout(this.typingTimer);
    }
  }

  private startTypingAnimation(): void {
    let i = 0;
    let j = 0;
    const speedMs = 38;

    const typeStep = () => {
      if (i < this.line1Text.length) {
        this.activeLine.set(1);
        this.typedLine1.set(this.line1Text.slice(0, ++i));
        this.typingTimer = setTimeout(typeStep, speedMs);
      } else if (j < this.line2Text.length) {
        this.activeLine.set(2);
        this.typedLine2.set(this.line2Text.slice(0, ++j));
        this.typingTimer = setTimeout(typeStep, speedMs);
      } else {
        this.typingTimer = setTimeout(() => this.activeLine.set(0), 1800);
      }
    };

    typeStep();
  }
  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(open => !open);
  }

onNavClick(sectionId: string, navKey: string): void {
    this.activeNav.set(navKey);
    this.mobileMenuOpen.set(false); // Close mobile drawer after selection
    const el = document.getElementById(sectionId);
    // On a detail page only the contact form is local; everything else lives on the home page
    if (el && (!this.headerOnly || sectionId === 'contact')) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    this.router.navigate(['/'], { fragment: sectionId === 'home' ? undefined : sectionId });
  }
}
