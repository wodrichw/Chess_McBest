import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


export const appROUTES: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
];


@NgModule({
  imports: [ RouterModule.forRoot(appROUTES) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
