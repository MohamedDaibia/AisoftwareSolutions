import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceWebAppComponent } from './service-web-app.component';

describe('ServiceWebAppComponent', () => {
  let component: ServiceWebAppComponent;
  let fixture: ComponentFixture<ServiceWebAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceWebAppComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceWebAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
