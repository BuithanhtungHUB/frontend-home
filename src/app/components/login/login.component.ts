import {Component, OnInit} from '@angular/core';
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
  messageUser: any ;
  messagePassword: any ;
  messageError: any;
  messageSucces: any;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router) {
  }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      user_name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]]
    })
  }

  submit(){
    let data = this.formLogin?.value;
    // if(!data.user_name) {
    //   this.messageUser = 'Tên người dùng không được để trống';
    // }
    // if(!data.password) {
    //   this.messagePassword = 'Mật khẩu không được để trống';
    // }
    this.authService.login(data).subscribe(respone => {
      localStorage.setItem('token', JSON.stringify(respone.access_token));
      localStorage.setItem('userLogin', JSON.stringify(respone.user));
      this.router.navigate(['']).then(respone=> {
        this.messageSucces = 'Đăng nhập thành công';
          console.log(this.messageSucces);
        }
      )
    }, errors => {
      this.messageUser = JSON.stringify(errors.error.user_name);
      this.messagePassword = JSON.stringify(errors.error.password);
      this.messageError = JSON.stringify(errors.error.error);
      console.log(this.messageUser, this.messagePassword, this.messageError);
    })
  }

  get user_name() {
    return this.formLogin?.get('user_name');
  }

  get password() {
    return this.formLogin?.get('password');
  }
}
