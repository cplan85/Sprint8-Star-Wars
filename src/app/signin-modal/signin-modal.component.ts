import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
//import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-signin-modal',
  templateUrl: './signin-modal.component.html',
  styleUrls: ['./signin-modal.component.scss'],
})
export class SigninModalComponent implements OnInit {
  signinForm: FormGroup;
  closeModal: string = '';
  localstorageUsers: User[] = [];
  currentUser: User = {
    firstName: "",
    email: "",
    lastName: "",
    password: "",
    getNewsletter: false, 
  };

  message: string = '';
  constructor(
    private localStorageService: LocalStorageService,
    private _builder: FormBuilder,
    private router: Router,
    public usersService: UsersService
  ) {
    this.signinForm = this._builder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    let users = this.localStorageService.get('users');

    console.log(JSON.parse(users!), 'users from sign-in');

    this.localstorageUsers = JSON.parse(users!);

    // const openModal = document.getElementById('open-modal');
    // openModal?.click();
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

  logout() {
    this.usersService.logOut().subscribe((res) => {
    
      if (!this.usersService.isLoggedIn) {
        const redirect = this.usersService.redirectUrl
          ? this.router.parseUrl("/")
          : 'logout';
        this.message = 'status: logged out';

        this.router.navigateByUrl("/");
      }
    });
  }

  get email() {
    return this.signinForm.get('email');
  }

  send(value: any) {
    let email = this.signinForm.value['email'];
    const closeButton = document.getElementById('closeModalButton');
    const passwordModalButton = document.getElementById('passwordModalButton');
    if (this.signinForm.valid && this.localstorageUsers.length > 0) {
      const emailMatch = this.localstorageUsers.find(
        (user) => user.email === email
      );
      if (emailMatch != null) {
        //this should then lead to next modal for login with just password. jsmith@gmail.com
        this.message = `Welcome back ${emailMatch.firstName} ${emailMatch.lastName}.`;
        //this.login();
        this.signinForm.reset();
        this.usersService.setCurrentUser(emailMatch);
        this.currentUser = emailMatch;
        console.log("currentUser", this.usersService.currentUser)
         const openModal = document.getElementById('open-modal');
     openModal?.click();
       
        if (closeButton != null) {
          closeButton.click();

          email = '';
        }
        this.router.navigateByUrl('/starships');

      }
    }

  }
}
