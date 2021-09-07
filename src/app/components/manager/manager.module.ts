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
  }
]

@NgModule({
  declarations: [
    ManagerListHouseComponent,
    CreateHouseComponent,
    ListOrderComponent
  ],
    imports: [
        [RouterModule.forChild(routes)],
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        AngularFireStorageModule,
        AngularFireModule.initializeApp(environment.firebaseConfig, "cloud")
    ]
})
export class ManagerModule { }
