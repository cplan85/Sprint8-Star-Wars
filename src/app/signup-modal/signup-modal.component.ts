import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.scss'],
})
export class SignupModalComponent implements OnInit {
  signupForm: FormGroup;

  visible: boolean = true;
  changetype: boolean = true;

  viewPassword() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }
  constructor(private _builder: FormBuilder) {
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

  send(values: any) {
    if (this.signupForm.valid) {
      //add this USER To localstorage
    }
    let firstName = this.signupForm.value['firstName'];
    let lastName = this.signupForm.value['lastName'];

    let email = this.signupForm.value['email'];
    console.log(email);

    let password = this.signupForm.value['password'];
    console.log(password);

    let showPassword = this.signupForm.value['showPassword'];
    console.log(showPassword);
    let getNewsletter = this.signupForm.value['getNewsletter'];
    console.log(getNewsletter);

    //this.budgetService.addBudgetItem(budgetName, customerName);
  }
}
