import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HouseListComponent} from "./house-list/house-list.component";
import {HouseDetailComponent} from "./house-detail/house-detail.component";
import {RouterModule, Routes} from "@angular/router";
import { RentHouseComponent } from './rent-house/rent-house.component';
import {ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  {
    path: '',
    component: HouseListComponent
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
  }
]

@NgModule({
  declarations: [
    HouseListComponent,
    HouseDetailComponent,
    RentHouseComponent
  ],
  imports: [
    [RouterModule.forChild(routes)],
    CommonModule,
    ReactiveFormsModule
  ]
})
export class HousesModule { }
