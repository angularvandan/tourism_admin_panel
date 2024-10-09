import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotsManagementComponent } from './spots-management.component';

describe('SpotsManagementComponent', () => {
  let component: SpotsManagementComponent;
  let fixture: ComponentFixture<SpotsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpotsManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpotsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
