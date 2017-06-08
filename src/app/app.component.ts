import { Component } from '@angular/core';
import { Observable } from 'rxjs'

import { UserService } from './user.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Chess McBest';
  user: Observable<any>;

  constructor(private u: UserService){
    this.user = u.getUser();
  }
}
