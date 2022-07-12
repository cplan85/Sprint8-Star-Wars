import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { LocalStorageService } from '../services/local-storage.service';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin-password-modal',
  templateUrl: './signin-password-modal.component.html',
  styleUrls: ['./signin-password-modal.component.scss']
})
export class SigninPasswordModalComponent implements OnInit {
  signinpasswordForm: FormGroup;
  localstorageUsers: User[] = [];
  message: string = this.usersService.currentUser.email;
  constructor(
    private _builder: FormBuilder,
    private router: Router,
    private usersService: UsersService
  ) {
    this.signinpasswordForm = this._builder.group({
      password: ['', [Validators.required]],
    });
   }

  ngOnInit(): void {
  
  }

  get password() {
    return this.signinpasswordForm.get('password');
  }

  login() {
    this.usersService.logIn().subscribe((res) => {
      console.log("response from login", res)
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
    const closeButton = document.getElementById('closeModalButton');
    const passwordModalButton = document.getElementById('passwordModalButton');
    if (this.signinpasswordForm.valid && this.localstorageUsers.length > 0) {
      const passwordMatch = this.localstorageUsers.find(
        (user) => user.password === password
      );
      if (passwordMatch != null) {
        //this should then lead to next modal for login with just password. jsmith@gmail.com
        this.message = `Welcome back ${passwordMatch.firstName} ${passwordMatch.lastName}.`;
        this.login();
        this.signinpasswordForm.reset();
       
        if (closeButton != null) {
          closeButton.click();

          password = '';
        }
        this.router.navigateByUrl('/starships');

      }
    }

  }

}
