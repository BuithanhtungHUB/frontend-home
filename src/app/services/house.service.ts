import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  constructor(
    private http: HttpClient
  ) {
  }
  setHeader() {
    let token = JSON.parse(<string>localStorage.getItem('token'));
    return new HttpHeaders().set("Authorization", "Bearer " + token);
  }

  getHouseList(): Observable<any> {
    return this.http.get(environment.url_api+ 'get-all');
  }
}
