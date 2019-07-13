import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable()
export class UserService {
  private login: BehaviorSubject<string> = new BehaviorSubject(null);


  
  setUser(user: string) {
    this.login.next(user);
  }
  getUser() {
    return this.login.asObservable();
  }

}
