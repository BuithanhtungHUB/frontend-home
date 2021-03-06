import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {UpdateProfileComponent} from "./update-profile/update-profile.component";
import {ReactiveFormsModule} from "@angular/forms";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../environments/environment";
import {RouterModule, Routes} from "@angular/router";
import { UserListComponent } from './user-list/user-list.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ListOrderOfUserComponent } from './list-order-of-user/list-order-of-user.component';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent
  },
  {
    path: 'update-profile',
    component: UpdateProfileComponent,
    children: [
      {
        path: 'change-password',
        component: ChangePasswordComponent
      }
    ]
  },
  {
    path: 'list-order-of-user',
    component: ListOrderOfUserComponent
  }
]

@NgModule({
  declarations: [
    UpdateProfileComponent,
    UserListComponent,
    ChangePasswordComponent,
    ListOrderOfUserComponent
  ],
  imports: [
    [RouterModule.forChild(routes)],
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "cloud")
  ]
})
export class UserModule { }
