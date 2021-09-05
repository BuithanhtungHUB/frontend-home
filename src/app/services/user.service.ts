import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private  authService: AuthService) { }

  updateProfile(data: any):Observable<any> {
    return this.http.post(environment.url_api + "auth/update-user-profile", data, {headers: this.authService.setHeader()});
  }
}
