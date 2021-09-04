import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerListHouseComponent } from './manager-list-house/manager-list-house.component';
import {RouterModule, Routes} from "@angular/router";

const routes : Routes = [
  {
    path: '',
    component: ManagerListHouseComponent
  }
]

@NgModule({
  declarations: [
    ManagerListHouseComponent
  ],
  imports: [
    [RouterModule.forChild(routes)],
    CommonModule
  ]
})
export class ManagerModule { }
