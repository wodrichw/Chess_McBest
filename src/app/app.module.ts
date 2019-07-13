import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//Routing
import { AppRoutingModule } from './app-routing.module';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';
//Components
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { PiecesComponent } from './pieces/pieces.component';

//Services
import { UserService } from './user.service';
import { InquireUserService } from './inquire-user.service';
import { GameHostService } from './game-host.service'

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    PiecesComponent
  ],
  imports: [
    BrowserModule,
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