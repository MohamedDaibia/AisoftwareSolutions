import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceBiAnalyticsComponent } from './service-bi-analytics.component';

describe('ServiceBiAnalyticsComponent', () => {
  let component: ServiceBiAnalyticsComponent;
  let fixture: ComponentFixture<ServiceBiAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceBiAnalyticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceBiAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
