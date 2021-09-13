import {Component, OnInit, DoCheck} from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
import {NavigationExtras, Router} from "@angular/router";
import {UserService} from "../../../../services/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HouseService} from "../../../../services/house.service";
import {formatDate} from "@angular/common";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {
  user: any;
  user_name: any;
  formSearch: FormGroup | undefined;
  message: any;
  days: any;
  houseSearch: any;
  statusSubmit: boolean = false;

  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder,
              private houseService: HouseService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.user = JSON.parse(<string>this.authService.getUser());
    console.log(this.user);
    this.formSearch = this.fb.group({
      start_date: [''],
      end_date: [''],
      address: [''],
      priMin: ['100000'],
      priMax: ['2000000'],
      bedroom: ['1'],
      bathroom: ['1']
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
        this.toastr.success('Đăng xuất thành công')
      }).catch(error => {
        this.toastr.success('Đăng xuất lỗi')
      })
    })
  }

  submit() {
    let data = this.formSearch?.value;
    console.log(this.router);
    if (window.location.pathname !== '/search') {
      this.houseService.searchHouse(data).subscribe(res => {
        const output: NavigationExtras = {state: res}
        this.router.navigate(['/search'], output).then(r => {
        })
      })
    } else {
      this.houseService.searchHouse(data).subscribe(res => {
        console.log(res);
        this.houseSearch = res;
      })
    }

  }

  get start_date() {
    return this.formSearch?.get('start_date');
  }

  get end_date() {
    return this.formSearch?.get('end_date');
  }


  checkStartDate() {
    let days = (Date.parse(this.formSearch?.value.end_date) - Date.parse(this.formSearch?.value.start_date)) / 86400000;
    if (this.formSearch?.value.start_date !== '' && days <= 0) {
      alert('Ngày nhận phòng phải ở trước ngày trả phòng');
    }
  }

  checkEndDate() {
    let days = (Date.parse(this.formSearch?.value.end_date) - Date.parse(this.formSearch?.value.start_date)) / 86400000;
    if (this.formSearch?.value.end_date !== '' && days <= 0) {
      alert('Ngày trả phòng phải ở sau ngày nhận phòng');
    }
  }
}


