import { Component, OnInit } from '@angular/core';
import {HouseService} from "../../../services/house.service";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.css']
})
export class HouseDetailComponent implements OnInit {
  max: number = 5;
  rateDefault: number = 0;
  isReadonly: boolean = true;
  houseDetail: any;
  id: any;
  user: any;
  orders: any;
  count: any;
  rateHouse: any;
  reviews: any;
  user_id: any;
  formReview: FormGroup | undefined;
  constructor(private houseService: HouseService,
              private activatedRoute: ActivatedRoute,
              public sanitizer: DomSanitizer,
              private toastr: ToastrService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.houseService.getHouseDetail(this.id).subscribe(res => {
      console.log(res, 1);
      this.houseDetail = res;
      this.user = JSON.parse(<string>localStorage.getItem('userLogin'));
    })
    this.houseService.orderHouse(this.id).subscribe(res => {
      console.log(res, 2);
      this.orders = res;
    })
    this.houseService.getAvgRate(this.id).subscribe(res =>{
      this.rateHouse = res;
    })
    this.houseService.getReview(this.id).subscribe(res =>{
      this.reviews = res;
      this.count = this.reviews.length;
    })
    this.formReview = this.fb.group({
      rate: [''],
      comment: [''],
      user_id: [JSON.parse(<string>localStorage.getItem('userLogin')).id],
      house_id: [this.id]
    })
  }

  submit() {
    let data = this.formReview?.value;
    console.log(data, 3);
    this.houseService.review(this.id, data).subscribe(res =>{
      location.reload();
      this.toastr.success('Cảm ơn bạn đã đánh giá')
    })
  }

  updateStatus(element: any) {
    let data = {
      'status': element.value
    };
    this.houseService.updateStatusHouse(data, this.id).subscribe(res => {
      console.log(res, 4);
      this.toastr.success(res.success)
    })
  }

  onOutletLoaded(component: any) {
    component.price = this.houseDetail.price;
    component.id = +this.id;
  }

  confirmOrder(id:any) {
    let data = 'xác nhận';
    this.houseService.confirmOrder(data, id).subscribe(res =>{
      location.reload();
      this.toastr.success('Bạn đã xác nhận');
    })
  }

  refuseOrder(id: any) {
    let data = "không xác nhận";
    this.houseService.confirmOrder( data,id).subscribe(res => {
      location.reload();
      this.toastr.warning('Bạn đã không xác nhận');
    })
  }
}
