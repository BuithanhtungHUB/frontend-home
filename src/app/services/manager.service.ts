import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private http: HttpClient,
              private authService: AuthService)
  {

  }

  createHouse(data: any) :Observable<any> {
    return this.http.post(environment.url_api + 'house/create', data, {headers: this.authService.setHeader()});
  }

  getListOrderManager(): Observable<any> {
    return this.http.get(environment.url_api + 'order/get-list', {headers: this.authService.setHeader()});
  }

  confirmOrder(id: number, data: any ) :Observable<any> {
    return  this.http.post(environment.url_api + 'order/rent-confirm/' + id , data,{headers: this.authService.setHeader()} )
  }

  getHousesManager() :Observable<any> {
    return this.http.get(environment.url_api + 'user/house-list', {headers: this.authService.setHeader()});
  }
  getIncomeStatistics(house_id: any, year: any): Observable<any> {
    return this.http.get(environment.url_api + 'order/income-statistics/' + house_id + '/' + year, {headers: this.authService.setHeader()})
  }
}
