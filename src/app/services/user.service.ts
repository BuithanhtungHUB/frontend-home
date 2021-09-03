import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  //thieu token
  updateProfile(data: any):Observable<any> {
    return this.http.post(environment.url_api + "update-profile", data);
  }
}
