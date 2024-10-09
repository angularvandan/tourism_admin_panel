import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToursManagementComponent } from './tours-management.component';

describe('ToursManagementComponent', () => {
  let component: ToursManagementComponent;
  let fixture: ComponentFixture<ToursManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToursManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToursManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
