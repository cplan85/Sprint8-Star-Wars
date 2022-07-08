import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { LocalStorageService } from '../services/local-storage.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.scss'],
})
export class SignupModalComponent implements OnInit {
  signupForm: FormGroup;
  localComponentUsers: User[] = [];

  visible: boolean = true;
  changetype: boolean = true;

  viewPassword() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }
  constructor(
    private _builder: FormBuilder,
    public localstorageservice: LocalStorageService,
    public usersService: UsersService
  ) {
    this.signupForm = this._builder.group({
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      showPassword: [false],
      getNewsletter: [false],
    });
  }

  ngOnInit(): void {}

  get firstName() {
    return this.signupForm.get('firstName');
  }
  get lastName() {
    return this.signupForm.get('lastName');
  }
  get email() {
    return this.signupForm.get('email');
  }
  get password() {
    return this.signupForm.get('password');
  }

  deleteLocalStorage() {
    this.localComponentUsers = [];
    window.localStorage.removeItem('users');
    console.log(this.localstorageservice.get('users'));
  }

  send(values: any) {
    const localStorage = this.localstorageservice.get('users');
    let firstName = this.signupForm.value['firstName'];
    let lastName = this.signupForm.value['lastName'];
    let email = this.signupForm.value['email'];
    let password = this.signupForm.value['password'];
    let getNewsletter = this.signupForm.value['getNewsletter'];

    console.log(
      'My users before validation',
      this.localstorageservice.get('users')
    );
    if (this.signupForm.valid) {
      console.log(typeof localStorage, 'my length');
      if (localStorage === null || JSON.stringify(localStorage).length === 0) {
        this.localComponentUsers.push({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          getNewsletter: getNewsletter,
        });
        this.localstorageservice.set(
          'users',
          JSON.stringify(this.localComponentUsers)
        );
      }
      console.log(
        'REAL LOCAL STORAGE USERS',
        this.localstorageservice.get('users')
      );
    }
    //this.budgetService.addBudgetItem(budgetName, customerName);
  }
}
