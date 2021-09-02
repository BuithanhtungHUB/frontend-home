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
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
