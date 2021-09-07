import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {HouseService} from "../../../services/house.service";

@Component({
  selector: 'app-rent-house',
  templateUrl: './rent-house.component.html',
  styleUrls: ['./rent-house.component.css']
})
export class RentHouseComponent implements OnInit {

  @Input() price: any;
  @Input() id: any;
  days: any;
  totalPrice = 0;
  statusSubmit = false;
  formRentHouse: FormGroup | undefined;
  constructor(private fb: FormBuilder,
              private houseService: HouseService) { }

  ngOnInit(): void {
    this.formRentHouse = this.fb.group({
      start_date: ['', Validators.required],
      end_date: ['', Validators.required]
    })
  }

  submit() {
    let data = this.formRentHouse?.value;
    this.houseService.bookHouse(data, this.id).subscribe(res => {
      alert('Đặt phòng thành công');
    })
  }

  get start_date() {
    return this.formRentHouse?.get('start_date');
  }

  get end_date() {
    return this.formRentHouse?.get('end_date');
  }

  caculatorDate() {
    let days = (Date.parse(this.formRentHouse?.value.end_date) - Date.parse(this.formRentHouse?.value.start_date))/86400000
    if (this.formRentHouse?.value.start_date !== '' && this.formRentHouse?.value.end_date !== '' && days > 0) {
      this.statusSubmit = false;
      this.days = days;
      this.totalPrice = this.days * this.price;
    }
    else if (this.formRentHouse?.value.start_date !== '' && this.formRentHouse?.value.end_date !== '' && days <= 0) {
      this.totalPrice = 0;
      this.statusSubmit = true;
      alert('Ngày trả phòng phải đến sau ngày nhận phòng');
    }
  }
}
