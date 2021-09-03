import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup} from "@angular/forms";
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
      user_name: [''],
      password: ['']
    })
  }

  submit() {
    let data = this.formLogin?.value;
    this.authService.login(data).subscribe(respone => {
      localStorage.setItem('token', JSON.stringify(respone.access_token));
      localStorage.setItem('userLoign', JSON.stringify(respone.user));
      this.router.navigate(['']).then(respone => {
        this.messageSuccess = 'Đăng nhập thành công';
      })
    }, errors => {
      this.messageUser = JSON.stringify(errors.error.user_name);
      this.messagePassword = JSON.stringify(errors.error.password);
      this.messageError = JSON.stringify(errors.error.error);
      // console.log(this.messageError,this.messagePassword, this.messageUser)
    })
  }

}
