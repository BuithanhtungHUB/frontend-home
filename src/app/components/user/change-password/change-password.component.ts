import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  formChangePassword: FormGroup | undefined;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private authService: AuthService,
              private router: Router
              ) { }

  ngOnInit(): void {
    this.formChangePassword = this.fb.group({
      old_password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
      new_password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
      new_password_confirmation: ['']
    })
  }

  submit() {
    let data = this.formChangePassword?.value;
    console.log(data);
    this.userService.changePassword(data).subscribe(respone => {
      this.authService.logout().subscribe(res => {
        localStorage.clear();
        this.router.navigate(['']).then(r => {
          console.log('logout success')
        }).catch(error => {
          console.log('logout error')
        })
      })
    })
  }

  messageConfirm: string | undefined;
  // @ts-ignore
  validateConfirmPassword() {
    if ((this.formChangePassword?.value.new_password !== '') && (this.formChangePassword?.value.new_password_confirmation !== '')) {
      if (this.formChangePassword?.value.new_password !== this.formChangePassword?.value.new_password_confirmation) {
        return this.messageConfirm = 'Mật khẩu không trùng khớp';
      }
      else {
        this.messageConfirm = undefined;
      }
    }
    else {
      this.messageConfirm = undefined;
    }
  }

  get old_password() {
    return this.formChangePassword?.get('old_password');
  }

  get new_password() {
    return this.formChangePassword?.get('new_password');
  }
}
