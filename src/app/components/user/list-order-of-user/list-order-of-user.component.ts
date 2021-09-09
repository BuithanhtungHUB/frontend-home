import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {HouseService} from "../../../services/house.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-list-order-of-user',
  templateUrl: './list-order-of-user.component.html',
  styleUrls: ['./list-order-of-user.component.css']
})
export class ListOrderOfUserComponent implements OnInit {
  orders: any;
  status: any;
  id: any;
  constructor(private userService: UserService,
              private houseService: HouseService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    this.getOrders();
  }

  getOrders() {
    this.userService.getRentHistotry().subscribe(res => {
      this.orders = res.order;
      this.status = res.order.status;
      // console.log(this.orders);
    })
  }

  cancelOrder(id: number) {
    if (confirm('Bạn chắc chắn muốn hủy đơn này?')) {
      this.houseService.cancelOrder(id).subscribe(res => {
        this.getOrders();
        alert('Hủy đơn thành công.');
        location.reload();
      },erors => {
        // console.log(erors.error.error)
        alert(erors.error.error);
      })
    }
  }
}
