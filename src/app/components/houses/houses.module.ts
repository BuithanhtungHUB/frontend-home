import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HouseListComponent} from "./house-list/house-list.component";
import {HouseDetailComponent} from "./house-detail/house-detail.component";
import {RouterModule, Routes} from "@angular/router";
import { RentHouseComponent } from './rent-house/rent-house.component';
import {ReactiveFormsModule} from "@angular/forms";
import { SearchComponent } from './search/search.component';

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
    ReactiveFormsModule
  ]
})
export class HousesModule { }
