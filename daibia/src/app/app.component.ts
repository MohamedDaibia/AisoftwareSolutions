import { Component, HostListener, OnInit, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'aisoftwaresolutions';

  private router = inject(Router);

  // The button is hidden on the chatbot page and until the visitor has scrolled down a bit
  private onChatbotPage = false;
  private scrolled = false;
  showScrollTop = signal<boolean>(false);

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.scrolled = (window.scrollY || document.documentElement.scrollTop) > 300;
    this.updateScrollTop();
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private updateScrollTop(): void {
    this.showScrollTop.set(this.scrolled && !this.onChatbotPage);
  }

  ngOnInit(): void {
    this.onChatbotPage = this.router.url.startsWith('/chatbot');
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(e => {
        this.onChatbotPage = e.urlAfterRedirects.startsWith('/chatbot');
        this.scrolled = (window.scrollY || document.documentElement.scrollTop) > 300;
        this.updateScrollTop();
      });

    this.setScaledFavicon('/logo-indigo.png', 0.62);
  }

  private setScaledFavicon(src: string, scale: number): void {
    const img = new Image();
    img.onload = () => {
      const size = 64;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const ratio = Math.min(img.width, img.height) / Math.max(img.width, img.height);
      const drawW = img.width >= img.height ? size * scale : size * scale * ratio;
      const drawH = img.height >= img.width ? size * scale : size * scale * ratio;
      const offsetX = (size - drawW) / 2;
      const offsetY = (size - drawH) / 2;

      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);

      const link = document.getElementById('app-favicon') as HTMLLinkElement | null;
      if (link) {
        link.href = canvas.toDataURL('image/png');
      }
    };
    img.src = src;
  }
}