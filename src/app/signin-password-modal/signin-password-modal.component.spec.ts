import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninPasswordModalComponent } from './signin-password-modal.component';

describe('SigninPasswordModalComponent', () => {
  let component: SigninPasswordModalComponent;
  let fixture: ComponentFixture<SigninPasswordModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SigninPasswordModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninPasswordModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
