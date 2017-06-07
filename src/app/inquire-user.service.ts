import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class InquireUserService {
  private inquireUser: BehaviorSubject<string> = new BehaviorSubject(null);
  setInquireUser(uid: string){
    this.inquireUser.next(uid);
  }
  getUser(){
    return this.inquireUser.asObservable();
  }
}