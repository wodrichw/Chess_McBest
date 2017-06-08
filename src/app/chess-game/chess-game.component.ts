import { Component, OnInit } from '@angular/core';

import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database'
import { FirebaseApp } from 'angularfire2';
import { Router } from '@angular/router';

import { UserService } from './../user.service';
import { InquireUserService } from './../inquire-user.service'

@Component({
  selector: 'app-chess-game',
  templateUrl: './chess-game.component.html',
  styleUrls: ['./chess-game.component.css']
})
export class ChessGameComponent {
  private uid: string;
  private inGame: FirebaseListObservable<any>;
  game: any;
  constructor(private userService: UserService, private inquireUserService: InquireUserService,
    private db: AngularFireDatabase, public afAuth: AngularFireAuth,
    private router: Router) {
    userService.getUser().subscribe(uid => {
      this.uid = uid;
    });
    this.inGame = db.list('activeGames/' + this.uid + '/guest');
    db.object('activeGames/' + this.uid + '/board', { preserveSnapshot: true }).subscribe(status => {
      console.log(`game: ${status.val()}`);
      this.game = status.val();
    });
  }

  cancelGameProposal(): void {
    if (this.uid == null) {
    } else {
      this.db.list('activeGames/' + this.uid).subscribe(uid => {
        if (uid != null) {
          this.db.list('activeGames/').remove(this.uid);
        }
      });
      this.db.list('onlineUsers/').update(this.uid, { in_game: "Not in Game" });
      this.router.navigateByUrl('/member')
    }
  }


  getMyKey() {
    if (this.uid == null) {
      this.afAuth.authState.subscribe(user => {
        this.userService.setUser(user.uid);
        this.userService.getUser().subscribe(uid => {
          this.uid = uid;
        });
      });
    }
  }
}
