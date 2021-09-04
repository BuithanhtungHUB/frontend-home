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
      user_name: ['',[Validators.required]],
      phone: ['',[Validators.required,Validators.pattern(/(0)+[0-9]{9}\b/)]],
      role: ['', [Validators.required]],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6),Validators.maxLength(8)]],
      password_confirmation: ['',[Validators.required]],
    });
  }

  submit() {
    let data = this.formRegister?.value;

    this.authService.register(data).subscribe(respone => {
      this.router.navigate(['/login']).then(respone => {
        this.messageSuccess = 'Đăng ký thành công';
        console.log(this.messageSuccess);
      })
    }, errors => {
      this.messageError = JSON.stringify(errors.error);
      this.messagePasswordConfirm = JSON.stringify(errors.error.password) ;
      this.messageRole = JSON.stringify(errors.error.role);
      console.log( this.messagePasswordConfirm, this.messageRole, this.messageError);
    } )
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
