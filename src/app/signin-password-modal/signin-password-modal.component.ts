import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';
import { Input } from '@angular/core';

@Component({
  selector: 'app-signin-password-modal',
  templateUrl: './signin-password-modal.component.html',
  styleUrls: ['./signin-password-modal.component.scss'],
})
export class SigninPasswordModalComponent implements OnInit {
  signinpasswordForm: FormGroup;
  localstorageUsers: User[] = [];
  @Input() public currentUser: User = {
    firstName: '',
    email: '',
    lastName: '',
    password: '',
    getNewsletter: false,
  };

  message: string = this.currentUser.email;
  constructor(
    private _builder: FormBuilder,
    private router: Router,
    private usersService: UsersService
  ) {
    this.signinpasswordForm = this._builder.group({
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  modal = document.getElementById('loginpasswordModal');

  onOpen(event: any) {
    console.log('event', event);
  }

  get password() {
    return this.signinpasswordForm.get('password');
  }

  login() {
    this.usersService.logIn().subscribe((res) => {
      console.log('response from login', res);
      if (this.usersService.isLoggedIn) {
        const redirect = this.usersService.redirectUrl
          ? this.router.parseUrl(this.usersService.redirectUrl)
          : 'login';
        this.message = 'status: logged in';

        this.router.navigateByUrl(redirect);
      }
    });
  }

  send(value: any) {
    let password = this.signinpasswordForm.value['password'];
    const closeButton = document.getElementById('closepasswordModalButton');
    const passwordModalButton = document.getElementById('passwordModalButton');
    if (this.signinpasswordForm.valid) {
      if (this.currentUser.password === password) {
        this.login();
        this.signinpasswordForm.reset();

        if (closeButton != null) {
          closeButton.click();
        }
        this.router.navigateByUrl('/starships');
      }
    }
  }
}
