import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerListHouseComponent } from './manager-list-house/manager-list-house.component';
import {RouterModule, Routes} from "@angular/router";
import { CreateHouseComponent } from './create-house/create-house.component';
import { ListOrderComponent } from './list-order/list-order.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../environments/environment";
import {NgxDropzoneModule} from "ngx-dropzone";
import { IncomeStatisticsComponent } from './income-statistics/income-statistics.component';
import {ChartsModule} from "ng2-charts";

const routes : Routes = [
  {
    path: 'list-house',
    component: ManagerListHouseComponent
  },
  {
    path: 'create-house',
    component: CreateHouseComponent
  },
  {
    path: 'order-list',
    component: ListOrderComponent
  },
  {
    path: 'income-statistics',
    component: IncomeStatisticsComponent
  }
]

@NgModule({
  declarations: [
    ManagerListHouseComponent,
    CreateHouseComponent,
    ListOrderComponent,
    IncomeStatisticsComponent
  ],
  imports: [
    [RouterModule.forChild(routes)],
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "cloud"),
    NgxDropzoneModule,
    ChartsModule
  ]
})
export class ManagerModule { }
