import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formRegister: FormGroup | undefined;
  messageSuccess: any;
  messageUser: any;
  messagePhone: any;
  messageRole: any;
  messageEmail: any;
  messagePassword: any;
  messagePasswordConfirm: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      user_name: ['', [Validators.required,Validators.minLength(2), Validators.maxLength(100)]],
      phone: ['', [Validators.required, Validators.pattern('/(0)+[0-9]{9}\\b/')]],
      role: ['',[Validators.required]],
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(6), Validators.maxLength(8)]],
      password_confirmation: ['', [Validators.required,Validators.minLength(6), Validators.maxLength(8)]]
    })
  }

  submit() {
    let data = this.formRegister?.value;
    if(!data.user_name) {
      this.messageUser = 'Tên người dùng không được để trống';
    }
    if(!data.phone) {
      this.messagePhone = 'Số điện thoại không được để trống';
    }
    if(!data.role) {
      this.messageRole = 'Bạn cần lựa chọn vai trò của mình';
    }
    if(!data.email) {
      this.messageEmail = 'Email dùng không được để trống';
    }
    if(!data.password) {
      this.messagePassword = 'Mật khẩu không được để trống';
    }
    if(!data.password_confirmation) {
      this.messagePasswordConfirm = 'Bạn cần xác nhận mật khẩu';
    }
    this.authService.register(data).subscribe(response => {
      this.router.navigate(['']).then(response => {
        this.messageSuccess = 'Đăng ký thành công';
        console.log(this.messageSuccess);
      })
    }, errors => {
      console.log(errors.error);

    })
  }

  get user_name() {
    return this.formRegister?.get('user_name');
  }
  get phone() {
    return this.formRegister?.get('phone');
  }
  get role() {
    return this.formRegister?.get('role');
  }
  get email() {
    return this.formRegister?.get('email');
  }
  get password() {
    return this.formRegister?.get('password');
  }
  get password_confirmation() {
    return this.formRegister?.get('password_confirmation');
  }
}
