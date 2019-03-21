import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { View3DComponent } from './view3-d/view3-d.component';


const routes: Routes = [
    {
      path: 'map',
      component: View3DComponent
    },
    {
      path: '**',
      redirectTo: 'home/404'
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThreeDRoutingModule { }
