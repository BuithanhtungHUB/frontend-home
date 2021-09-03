import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UpdateProfileComponent} from "./components/user/update-profile/update-profile.component";

const routes: Routes = [
  {
    path: 'update-profile',
    component: UpdateProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
