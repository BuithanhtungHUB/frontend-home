import { Component, OnInit } from '@angular/core';
import {HouseService} from "../../../services/house.service";
import {ActivatedRoute} from "@angular/router";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.css']
})
export class HouseDetailComponent implements OnInit {

  houseDetail: any;
  id: any;
  user: any;
  orders: any;
  constructor(private houseService: HouseService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.houseService.getHouseDetail(this.id).subscribe(res => {
      console.log(res);
      this.houseDetail = res;
      this.user = JSON.parse(<string>localStorage.getItem('userLogin'));
    })
    this.houseService.orderHouse(this.id).subscribe(res => {
      console.log(res);
      this.orders = res;
    })

  }

  updateStatus(element: any) {
    let data = {
      'status': element.value
    };
    this.houseService.updateStatusHouse(data, this.id).subscribe(res => {
      console.log(res);
      alert(res.success);
    })
  }

  onOutletLoaded(component: any) {
    component.price = this.houseDetail.price;
    component.id = +this.id;
  }

  confirmOrder(id:any) {
    let data = 'xác nhận';
    this.houseService.confirmOrder(data, id).subscribe(res =>{
      alert(res.success);
      location.reload();
    })
  }

  refuseOrder(id: any) {
    let data = "không xác nhận";
    this.houseService.confirmOrder( data,id).subscribe(res => {
      alert(res.success);
      location.reload();
    })
  }
}
