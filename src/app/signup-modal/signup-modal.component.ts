import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { LocalStorageService } from '../services/local-storage.service';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';
import { ModalManager } from 'ngb-modal';

@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.scss'],
})
export class SignupModalComponent implements OnInit {
  signupForm: FormGroup;
  localComponentUsers: User[] = [];
  message: string = "";

  visible: boolean = true;
  changetype: boolean = true;

  viewPassword() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }
  constructor(
    private _builder: FormBuilder,
    public localStorageService: LocalStorageService,
    public usersService: UsersService,
    private router: Router,
    private modalService: ModalManager
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

  closeModal() {
    this.modalService.close('#signupModal');
    //or this.modalRef.close();
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
    console.log(this.localStorageService.get('users'));
  }

  addNewUser(firstName: string, lastName: string, email: string, password: string, getNewsletter: boolean) {
    this.localComponentUsers.push({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      getNewsletter: getNewsletter,
    });
    this.localStorageService.set(
      'users',
      JSON.stringify(this.localComponentUsers)
    );
    this.usersService.logIn();
    const closeButton = document.getElementById('closeModalButtonSignUp');
    if (closeButton != null) {
      closeButton.click();
    }
    this.router.navigateByUrl('/starships');
  }
  send(values: any) {
    const localStorage = this.localStorageService.get('users');
    let firstName = this.signupForm.value['firstName'];
    let lastName = this.signupForm.value['lastName'];
    let email = this.signupForm.value['email'];
    let password = this.signupForm.value['password'];
    let getNewsletter = this.signupForm.value['getNewsletter'];

    const users = this.localStorageService.get('users');
    let localstorageUsers: User[] = JSON.parse(users!);

    console.log(
      'Users BEFORE validation',
      this.localStorageService.get('users')
    );
    //console.log("email match", emailMatch)
    if (this.signupForm.valid) {
      if (localStorage === null || JSON.stringify(localStorage).length === 0) {
        this.addNewUser(firstName, lastName, email, password, getNewsletter)
      }
      else if(localstorageUsers.length > 0) {
        
        const emailMatch = localstorageUsers.find((user) => user.email === email);
        if (emailMatch !=null) {
          this.message = "user already exists."
        } else {
          console.log("I can add new users")
          this.addNewUser(firstName, lastName, email, password, getNewsletter)
        }
        
      }
       
      console.log(
        'REAL LOCAL STORAGE USERS',
        this.localStorageService.get('users')
      );
    }
  }
}