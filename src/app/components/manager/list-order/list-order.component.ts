import { Component, OnInit } from '@angular/core';
import {ManagerService} from "../../../services/manager.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {
  orders: any;
  constructor(private managerService: ManagerService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getListOrder();
  }

  getListOrder() {
    this.managerService.getListOrderManager().subscribe(res => {
      this.orders = res;
    })
  }

  confirmOrder(id :number) {
    if (confirm('Bạn muốn xác nhận đơn này?')) {
      this.managerService.confirmOrder(id,'xác nhận').subscribe(res => {
        this.getListOrder();
        this.toastr.success('Bạn đã xác nhận');
        location.reload();
      })
    }
  }

  deniedOrder(id :number) {
    if (confirm('Bạn không muốn xác nhận đơn này?')) {
      this.managerService.confirmOrder(id,'không xác nhận').subscribe(res => {
        this.getListOrder();
        location.reload();
        this.toastr.warning('Bạn đã không xác nhận');
      })
    }
  }
}
