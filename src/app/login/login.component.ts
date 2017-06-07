import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

import { UserService } from './../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private db: any;
  constructor( @Inject(FirebaseApp) firebaseApp: firebase.app.App, private afAuth: AngularFireAuth, private router: Router, private userService: UserService) {
    this.db = firebaseApp.database();
    afAuth.authState.subscribe(auth => {
      if (auth != null) {
        router.navigateByUrl('/member');
      }
    });
  }

  loginWithGoogle(): void {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.afAuth.auth.onAuthStateChanged(auth => {
      if (auth != null){
        //update to All Users on Firebase db
        this.db.ref('allUsers/' + auth.uid).update({
          username: auth.displayName,
          email: auth.email,
          profile_picture: auth.photoURL
        });
        //update to Online Users on Firebase db
        this.db.ref('onlineUsers/' + auth.uid).update({
          username: auth.displayName,
          email: auth.email,
          profile_picture: auth.photoURL,
          in_game: "Not in a game"
        });
        this.userService.setUser(auth.uid);
        this.router.navigateByUrl('/member');
      }
    });
  }

}
