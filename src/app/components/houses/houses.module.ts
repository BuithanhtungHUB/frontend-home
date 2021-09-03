import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HouseListComponent} from "./house-list/house-list.component";
import {HouseDetailComponent} from "./house-detail/house-detail.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: HouseListComponent
  },
  {
    path: 'detail',
    component: HouseDetailComponent
  }
]

@NgModule({
  declarations: [
    HouseListComponent,
    HouseDetailComponent
  ],
  imports: [
    [RouterModule.forChild(routes)],
    CommonModule
  ]
})
export class HousesModule { }
