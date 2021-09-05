import { Component, OnInit } from '@angular/core';
import {HouseService} from "../../../services/house.service";

@Component({
  selector: 'app-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.css']
})
export class HouseListComponent implements OnInit {
  houses: any;
  constructor(private houseService: HouseService) { }

  ngOnInit(): void {
    this.houseService.getHouseList().subscribe(res => {
      this.houses = res;
      console.log(this.houses);
    })
  }

}
