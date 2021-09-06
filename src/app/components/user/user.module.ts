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

const routes: Routes = [
  {
    path: '',
    component: UserListComponent
  },
  {
    path: 'update-profile',
    component: UpdateProfileComponent
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent
  }
]

@NgModule({
  declarations: [
    UpdateProfileComponent,
    UserListComponent,
    ChangePasswordComponent
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
