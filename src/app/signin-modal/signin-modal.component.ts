import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
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
  message: string = "";
  constructor(
    private localStorageService: LocalStorageService,
    private _builder: FormBuilder,
    private modalService: NgbModal,
    private router: Router,
    private usersService: UsersService
  ) {
    this.signinForm = this._builder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  triggerModal(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (res) => {
          this.closeModal = `Closed with: ${res}`;
        },
        (res) => {
          this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit(): void {
    let users = this.localStorageService.get('users');

    console.log(JSON.parse(users!), 'users from sign-in');

    this.localstorageUsers = JSON.parse(users!);
  }

  get email() {
    return this.signinForm.get('email');
  }

  send(value: any) {
    let email = this.signinForm.value['email'];
    const closeButton = document.getElementById('closeModalButton');
    if (this.signinForm.valid && this.localstorageUsers.length > 0) {
      const emailMatch = this.localstorageUsers.find((user) => user.email === email);
      if(emailMatch != null) {
        //this should then lead to next modal for login with just password. jsmith@gmail.com
        this.message =  `Welcome back ${emailMatch.firstName} ${emailMatch.lastName}.`
        this.usersService.logIn();
       // let dothis = setTimeout(function(){ 
          if (closeButton != null) {
            closeButton.click();
           
            email="";
          }
        // }, 1000)
         this.router.navigateByUrl('/starships');

       //  clearInterval(dothis);
        
        console.log("triggered");
      }
    }
    

    const newModal = document.getElementById('modelData2');
  
  }
}
