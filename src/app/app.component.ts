import { Component } from '@angular/core';
import { Observable } from 'rxjs'

import {AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database'

import { UserService } from './user.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Chess McBest';
  user: Observable<any>;
  userName: any;

  constructor(private u: UserService, private db: AngularFireDatabase){
    this.user = u.getUser();

    this.user.subscribe(uid => {
      if (uid != null){
        db.object(`onlineUsers/${uid}/username`, { preserveSnapshot: true }).subscribe(snap => {
          this.userName = snap.val();
        });

      }
    });

  }
}
