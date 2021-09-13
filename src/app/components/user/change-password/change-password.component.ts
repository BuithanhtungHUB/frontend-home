import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

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
              private router: Router,
              private toastr: ToastrService
              ) { }

  ngOnInit(): void {
    this.formChangePassword = this.fb.group({
      old_password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
      new_password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
      new_password_confirmation: ['']
    })
  }
  messageErrLogin: string | undefined;
  submit() {
    if (!this.messageConfirm) {
      let data = this.formChangePassword?.value;
      // console.log(data);
      this.userService.changePassword(data).subscribe(respone => {
        this.authService.logout().subscribe(res => {
          localStorage.clear();
          this.router.navigate(['']).then(r => {
            location.reload();
            this.toastr.success('mật khẩu của bạn đã được thay đổi')
            // console.log('logout success')
          }).catch(error => {
            console.log('logout error')
          })
        })
      }, errors => {
        // console.log(errors);
        this.messageErrLogin = errors.error.message;
      })
    }
  }

  messageConfirm: string | undefined;
  // @ts-ignore
  validateConfirmPassword() {
    if ((this.formChangePassword?.value.new_password !== '') && (this.formChangePassword?.value.new_password_confirmation !== '')) {
      if (this.formChangePassword?.value.new_password !== this.formChangePassword?.value.new_password_confirmation) {
        this.messageConfirm = 'Mật khẩu không trùng khớp';
      }
      else {
        this.messageConfirm = undefined;
      }
    }
    else {
      this.messageConfirm = undefined;
    }
    if ((this.formChangePassword?.value.new_password !== '') && (this.formChangePassword?.value.new_password_confirmation == '')) {
      this.messageConfirm = 'Chưa xác nhận mật khẩu mới';
    }
  }

  get old_password() {
    return this.formChangePassword?.get('old_password');
  }

  get new_password() {
    return this.formChangePassword?.get('new_password');
  }
}
