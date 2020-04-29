import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { appRoutes } from './appRoutts';
// import { routerApp } from './appRoutts.ts';

// console.log('routerApp:', routerApp);

const routes: Routes = [...appRoutes];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
