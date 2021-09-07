import { Component, OnInit } from '@angular/core';
import {ManagerService} from "../../../services/manager.service";

@Component({
  selector: 'app-manager-list-house',
  templateUrl: './manager-list-house.component.html',
  styleUrls: ['./manager-list-house.component.css']
})
export class ManagerListHouseComponent implements OnInit {

  houses: any;
  constructor(private managerService: ManagerService) { }

  ngOnInit(): void {
    this.managerService.getHousesManager().subscribe(res => {
      console.log(res);
      this.houses = res.houses;
    })
  }

}
