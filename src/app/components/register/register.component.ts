import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
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
  messageError: any;
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
      user_name: [''],
      phone: [''],
      role: [''],
      email: [''],
      password: [''],
      password_confirmaiton: [''],
    })
  }

  submit() {
    let data = this.formRegister?.value;
    this.authService.register(data).subscribe(respone => {
      this.router.navigate(['/login']).then(respone => {
        this.messageSuccess = 'Đăng ký thành công';
        console.log(this.messageSuccess);
      })
    }, errors => {
      this.messageError = errors.error;
      this.messagePasswordConfirm = errors.error.password;

      console.log(errors.error);
    } )
  }

}
