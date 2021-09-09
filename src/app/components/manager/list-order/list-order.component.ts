import { Component, OnInit } from '@angular/core';
import {ManagerService} from "../../../services/manager.service";

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {
  orders: any;
  constructor(private managerService: ManagerService) { }

  ngOnInit(): void {
    this.getListOrder();
  }

  getListOrder() {
    this.managerService.getListOrderManager().subscribe(res => {
      this.orders = res.orders_manager;
      // console.log(this.orders);
    })
  }

  confirmOrder(id :number) {
    if (confirm('Bạn muốn xác nhận đơn này?')) {
      this.managerService.confirmOrder(id,'xác nhận').subscribe(res => {
        this.getListOrder();
        alert('Bạn đã xác nhận');
        // console.log(res);
        location.reload();
      })
    }
  }

  deniedOrder(id :number) {
    // let data = 'không xác nhận'
    if (confirm('Bạn không muốn xác nhận đơn này?')) {
      this.managerService.confirmOrder(id,'không xác nhận').subscribe(res => {
        this.getListOrder();
        alert('Bạn đã không xác nhận');
        location.reload();
      })
    }
  }
}
