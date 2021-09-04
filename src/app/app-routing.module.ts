import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MasterComponent} from "./components/layouts/master/master.component";

const routes: Routes = [
  {
  path: '',
  component: MasterComponent,
  children: [
    {
      path: '',
      loadChildren: () => import('./components/houses/houses.module').then(m => m.HousesModule)
    },
    {
      path: 'manager',
      loadChildren: () => import('./components/manager/manager.module').then(m => m.ManagerModule)
    },
    {
      path: 'user',
      loadChildren: () => import('./components/user/user.module').then(m => m.UserModule)
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
