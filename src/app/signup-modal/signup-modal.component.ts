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
  constructor(private _builder: FormBuilder) {
    this.signupForm = this._builder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      showPassword: ['', Validators.required],
      getNewsletter: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  send(values: any) {
    let firstName = this.signupForm.value['firstName'];
    console.log(firstName);

    let lastName = this.signupForm.value['lastName'];
    console.log(lastName);

    //this.budgetService.addBudgetItem(budgetName, customerName);
  }
}
