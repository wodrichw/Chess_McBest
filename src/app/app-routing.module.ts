import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MemberComponent } from './member/member.component';
import { ChessGameComponent } from './chess-game/chess-game.component'

export const appROUTES: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'member', component: MemberComponent},
  { path: 'play-game', component: ChessGameComponent}
];


@NgModule({
  imports: [ RouterModule.forRoot(appROUTES) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
