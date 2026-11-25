import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CorePillar {
  number: string;
  title: string;
  description: string;
  icon: 'trust' | 'transparency' | 'dedication';
}

interface RespectPrinciple {
  label: string;
  detail: string;
}

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {
  // Free-to-use Unsplash photos, in the same order as the cards
  readonly cardPhotos = [
    'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&h=450&q=70',
    'https://images.unsplash.com/photo-1758691736872-61a1f75fe2d5?auto=format&fit=crop&w=800&h=450&q=70',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&h=450&q=70'
  ];

pillars: CorePillar[] = [
    {
      number: '01',
      title: 'Trust',
      description:
        'Long-term business accountability, dependable delivery, and strict protection of your proprietary operations and commercial confidentiality.',
      icon: 'trust'
    },
    {
      number: '02',
      title: 'Transparency',
      description:
        'Clear project scoping, predictable timelines and milestones, and direct communication with the team driving your business outcomes.',
      icon: 'transparency'
    },
    {
      number: '03',
      title: 'Dedication',
      description:
        'End-to-end commitment from initial business discovery and workflow alignment through launch, optimization, and ongoing operational support.',
      icon: 'dedication'
    }
  ];
  respectPrinciples: RespectPrinciple[] = [
    { label: 'TIME', detail: 'On-schedule milestones & rapid turnaround' },
    { label: 'VALUE', detail: 'High-ROI engineering built for measurable growth' },
    { label: 'DATA', detail: 'Strict confidentiality, sovereignty & zero compromise' }
  ];
}