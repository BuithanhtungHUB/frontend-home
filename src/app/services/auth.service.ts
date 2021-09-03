import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private  http: HttpClient) { }

  //thieu token
  getUserProfile(): Observable<any> {
    return this.http.get(environment.url_api + "user-profile");
  }
}
