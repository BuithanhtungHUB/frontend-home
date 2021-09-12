import { Component, OnInit } from '@angular/core';
import {HouseService} from "../../../services/house.service";
import {NavigationExtras, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  houseSearch: any;
formSearch: FormGroup | undefined;
  constructor(private houseService: HouseService,
              private router: Router,
  private fb: FormBuilder ) {
     this.houseSearch = this.router.getCurrentNavigation()?.extras.state ;
  }

  ngOnInit(): void {
    // if(!this.houseSearch) {
    //   this.formSearch = this.fb.group({
    //     start_date: [''],
    //     end_date: [''],
    //     address: [''],
    //     priMin: [''],
    //     priMax: [''],
    //     bedroom: [''],
    //     bathroom: ['']
    //   })
    //   let data = this.formSearch?.value;
    //   this.houseService.searchHouse(data).subscribe(res => {
    //     console.log(res);
    //     this.houseSearch = res;
    //   })
    // }
  }

}
