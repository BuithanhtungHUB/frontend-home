import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HouseListComponent} from "./house-list/house-list.component";
import {HouseDetailComponent} from "./house-detail/house-detail.component";
import {RouterModule, Routes} from "@angular/router";
import { RentHouseComponent } from './rent-house/rent-house.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SearchComponent } from './search/search.component';
import {RatingModule} from "ngx-bootstrap/rating";

const routes: Routes = [
  {
    path: '',
    component: HouseListComponent,
  },
  {
    path: ':id/detail',
    component: HouseDetailComponent,
    children: [
      {
        path: 'rent',
        component: RentHouseComponent,
      }
    ]
  },
  {
    path: 'search',
    component: SearchComponent
  }
]

@NgModule({
  declarations: [
    HouseListComponent,
    HouseDetailComponent,
    RentHouseComponent,
    SearchComponent
  ],
  imports: [
    [RouterModule.forChild(routes)],
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RatingModule
  ]
})
export class HousesModule { }
