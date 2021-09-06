import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup | undefined;
  messageUser: any;
  messagePassword: any;
  messageError: any;
  messageSuccess: any;
  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      user_name: ['',[Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(8)]]
    })
  }

  submit() {
    let data = this.formLogin?.value;
    this.authService.login(data).subscribe(respone => {
      localStorage.setItem('token', JSON.stringify(respone.access_token));
      localStorage.setItem('userLogin', JSON.stringify(respone.user));
      this.router.navigate(['']).then(respone => {
        this.messageSuccess = 'Đăng nhập thành công';
        location.reload();
      })
    }, errors => {
      this.messageUser = JSON.stringify(errors.error.user_name);
      this.messagePassword = JSON.stringify(errors.error.password);
      this.messageError = JSON.stringify(errors.error.error);
      // console.log(this.messageError,this.messagePassword, this.messageUser)
    })
  }

  get user_name() {
    return this.formLogin?.get('user_name');
  }
  get password() {
    return this.formLogin?.get('password');
  }
}
