import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: any ;
  user_name: any;
  messageSuccess: any;
  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(<string>this.authService.getUser());
    console.log(this.user)
  }


  logout() {
    this.authService.logout().subscribe(res => {
      localStorage.clear();
      this.router.navigate(['']).then(r => {
        console.log('logout success')
      }).catch(error => {
        console.log('logout error')
      })
    })
  }
}
