import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceSovereignHostingComponent } from './service-sovereign-hosting.component';

describe('ServiceSovereignHostingComponent', () => {
  let component: ServiceSovereignHostingComponent;
  let fixture: ComponentFixture<ServiceSovereignHostingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceSovereignHostingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceSovereignHostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
