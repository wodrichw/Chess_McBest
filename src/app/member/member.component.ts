import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database'
import { FirebaseApp } from 'angularfire2';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
//services
import { UserService } from './../user.service';
import { InquireUserService } from './../inquire-user.service'

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent {
  private uid: string;
  private onlineUsers: FirebaseListObservable<any[]>;
  private inGame: FirebaseListObservable<any>;

  constructor(private userService: UserService, private inquireUserService: InquireUserService,
    private db: AngularFireDatabase, public afAuth: AngularFireAuth,
    private router: Router) {
    //go to login if not logged in
    afAuth.authState.subscribe(auth => {
      if (auth == null) {
        router.navigateByUrl('/login');
      }
    });
    
    this.onlineUsers = db.list('onlineUsers/');
    userService.getUser().subscribe(uid => {
      this.uid = uid;
    });
    this.inGame = db.list('activegames/' + this.uid);
  }


  inquireUser(userkey: any): void {
    if (this.uid != null) {
      if (this.uid != userkey) {
        this.inquireUserService.setInquireUser(userkey);
        this.db.object('onlineUsers/' + userkey + '/in_game', { preserveSnapshot: true }).subscribe(status => {
          if (status.val() === "Click to Join" || status.val() === "In Game") { //**************************Delete In Game */
            //update database and route to chessgame player component
            this.db.list('onlineUsers/').update(userkey, { in_game: "In Game" });
            this.db.list('onlineUsers/').update(this.uid, { in_game: "In Game" });
            this.db.list('activeGames/').update(userkey, { guest: this.uid });
            this.router.navigateByUrl('/play-game');
          }
        });
      } else {
        console.log('we are same');
      }
    } else {
      this.getMyKey(this.inquireUser, userkey);
    }
  }


  //Buttons!!!
  newGame(): void {
    if (this.uid != null) {
      this.db.list('onlineUsers/').update(this.uid, { in_game: "Click to Join", host: "true" }); //set user to "in game" on onlineUsers db
      this.db.list('activeGames/').update(this.uid, { guest: "waiting", functions: "untouched" });
      this.router.navigateByUrl('/play-game');
    } else {
      this.getMyKey(this.newGame, null);
    }
  }

  logout(): void {
    this.afAuth.auth.signOut();
    this.userService.getUser().subscribe(x => this.uid = x);
    if (this.uid != null) {
      this.onlineUsers.remove(this.uid);
    }
    this.userService.setUser(null);
    this.router.navigateByUrl('/login');
  }
  getMyKey(followUpFunc, parameters: any) {
    if (this.uid == null) {
      this.afAuth.authState.subscribe(user => {
        this.userService.setUser(user.uid);
        this.userService.getUser().subscribe(uid => {
          this.uid = uid;
          if (parameters != null) {
            followUpFunc(parameters);
          } else {
            followUpFunc();
          }
        });
      });
    }
  }
}
