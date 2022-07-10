import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-signin-modal',
  templateUrl: './signin-modal.component.html',
  styleUrls: ['./signin-modal.component.scss'],
})
export class SigninModalComponent implements OnInit {
  signinForm: FormGroup;
  closeModal: string = '';
  constructor(
    private localStorageService: LocalStorageService,
    private _builder: FormBuilder,
    private modalService: NgbModal
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

    console.log(users, 'users from sign-in');
  }

  get email() {
    return this.signinForm.get('email');
  }

  send(value: any) {
    let email = this.signinForm.value['email'];
  }
}
