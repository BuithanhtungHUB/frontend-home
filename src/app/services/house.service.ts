import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getTopFive(): Observable<any> {
    return this.http.get(environment.url_api + 'auto-update');
  }

  getHouseList(): Observable<any> {
    return this.http.get(environment.url_api+ 'get-all');
  }

  cancelOrder(id: any): Observable<any> {
    return this.http.post(environment.url_api + 'order/cancel-rent/' +id,null,{headers: this.authService.setHeader()});
  }

  getHouseDetail(id: any): Observable<any> {
    return this.http.get(environment.url_api + 'get-id/' + id);
  }

  updateStatusHouse(data: any, id: any): Observable<any> {
    return this.http.post(environment.url_api + 'user/update-house/' + id, data, {headers: this.authService.setHeader()});
  }

  bookHouse(data: any, id: any): Observable<any> {
    return this.http.post(environment.url_api + 'order/house-rent/' + id, data, {headers: this.authService.setHeader()});
  }

  orderHouse(id: any): Observable<any> {
    return this.http.get(environment.url_api + 'order/rent-history-house/' + id, {headers: this.authService.setHeader()});
  }

  searchHouse(data: any): Observable<any> {
    return this.http.post(environment.url_api + 'search', data);
  }
}
