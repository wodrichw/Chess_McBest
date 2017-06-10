import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//Routing
import { AppRoutingModule } from './app-routing.module';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';
//angularFire
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2'
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase';
//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MemberComponent } from './member/member.component';
import { NewGameMenuComponent } from './new-game-menu/new-game-menu.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ChessGameComponent } from './chess-game/chess-game.component';
import { BoardComponent } from './board/board.component';
import { PiecesComponent } from './pieces/pieces.component';
//Services
import { UserService } from './user.service';
import { InquireUserService } from './inquire-user.service';
import { GameHostService } from './game-host.service'

const config = {
  apiKey: "AIzaSyCdU1NI-u0zp0Sl5f1mWkEP5WLAet_CHKY",
  authDomain: "chess-mcbest.firebaseapp.com",
  databaseURL: "https://chess-mcbest.firebaseio.com",
  projectId: "chess-mcbest",
  storageBucket: "chess-mcbest.appspot.com",
  messagingSenderId: "474366902589"
};


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MemberComponent,
    NewGameMenuComponent,
    UserProfileComponent,
    ChessGameComponent,
    BoardComponent,
    PiecesComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config, 'my-app'),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AppRoutingModule
  ],
  providers: [
    UserService,
    InquireUserService,
    GameHostService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }