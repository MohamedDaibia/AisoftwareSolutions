import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceApiDatabaseComponent } from './service-api-database.component';

describe('ServiceApiDatabaseComponent', () => {
  let component: ServiceApiDatabaseComponent;
  let fixture: ComponentFixture<ServiceApiDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceApiDatabaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceApiDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
