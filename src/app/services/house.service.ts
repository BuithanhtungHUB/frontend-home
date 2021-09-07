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

  getTopFive(): Observable<any> {
    return this.http.get(environment.url_api + 'auto-update');
  }

  getHouseList(): Observable<any> {
    return this.http.get(environment.url_api+ 'get-all');
  }

  getHouseDetail(id: any): Observable<any> {
    return this.http.get(environment.url_api + 'get-id/' + id);
  }

  updateStatusHouse(data: any, id: any): Observable<any> {
    return this.http.post(environment.url_api + 'user/update-house/' + id, data, {headers: this.setHeader()});
  }

  bookHouse(data: any, id: any): Observable<any> {
    return this.http.post(environment.url_api + 'order/house-rent/' + id, data, {headers: this.setHeader()});
  }
}
