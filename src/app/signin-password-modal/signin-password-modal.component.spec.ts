import { UsersService } from './../services/users.service';
import { Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninPasswordModalComponent } from './signin-password-modal.component';
import { FormBuilder, FormGroup } from '@angular/forms';

describe('SigninPasswordModalComponent', () => {
  let component: SigninPasswordModalComponent;
  let fixture: ComponentFixture<SigninPasswordModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SigninPasswordModalComponent],
      providers: [
        {
          provide: FormBuilder,
          useValue: jasmine.createSpyObj('FormBuilder', ['group']),
        },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigateByUrl']),
        },
        {
          provide: UsersService,
          useValue: jasmine.createSpyObj('UsersService', ['redirectUrl']),
        },
        {
          provide: FormGroup,
          useValue: jasmine.createSpyObj('FormGroup', ['get']),
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninPasswordModalComponent);
    const router = jasmine.createSpyObj('Router', ['navigateByUrl']);
    //component = fixture.componentInstance;

    component = new SigninPasswordModalComponent(
      new FormBuilder(),
      router,
      new UsersService()
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain 1 field', () => {
    component.signinpasswordForm.value['password'] = '';
    expect(component.signinpasswordForm.contains('password')).toBeTruthy();
  });
});
