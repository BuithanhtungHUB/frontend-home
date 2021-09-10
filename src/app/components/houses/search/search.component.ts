import { Component, OnInit } from '@angular/core';
import {HouseService} from "../../../services/house.service";
import { Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  houseSearch: any;
  constructor(private houseService: HouseService,
              private router: Router) {
     this.houseSearch = this.router.getCurrentNavigation()?.extras.state ;
    console.log(this.houseSearch);
  }

  ngOnInit(): void {

  }

}
