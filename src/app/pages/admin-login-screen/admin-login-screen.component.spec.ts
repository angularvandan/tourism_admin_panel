import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLoginScreenComponent } from './admin-login-screen.component';

describe('AdminLoginScreenComponent', () => {
  let component: AdminLoginScreenComponent;
  let fixture: ComponentFixture<AdminLoginScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminLoginScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminLoginScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
