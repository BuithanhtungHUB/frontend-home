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

const routes: Routes = [
  {
    path: '',
    component: UserListComponent
  },
  {
    path: 'update-profile',
    component: UpdateProfileComponent
  }
]

@NgModule({
  declarations: [
    UpdateProfileComponent,
    UserListComponent
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
