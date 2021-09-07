import { Component, OnInit, DoCheck} from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../../../../services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {
  user: any ;
  user_name: any;
  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(<string>this.authService.getUser());
    console.log(this.user);
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
}
