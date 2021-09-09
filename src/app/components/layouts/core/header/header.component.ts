import { Component, OnInit, DoCheck} from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../../../../services/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HouseService} from "../../../../services/house.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {
  user: any ;
  user_name: any;
  formSearch: FormGroup |undefined;
  message: any;
  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder,
              private houseService: HouseService) { }

  ngOnInit(): void {
    this.user = JSON.parse(<string>this.authService.getUser());
    // console.log(this.user);
    this.formSearch = this.fb.group({
      start_date: [''],
      end_date: [''],
      address: [''],
      price: [''],
      bedroom: [''],
      bathroom: ['']
    })
  }

  ngDoCheck() {
    this.user = JSON.parse(<string>this.authService.getUser());
  }

  logout() {
    this.authService.logout().subscribe(res => {
      localStorage.clear();
      this.router.navigate(['']).then(r => {
        location.reload();
        console.log('logout success')
      }).catch(error => {
        console.log('logout error')
      })
    })
  }

  submit() {
  let data = this.formSearch?.value;
  this.houseService.searchHouse(data).subscribe(res =>{
    this.message = res;
    console.log(this.message);
  })}
}


