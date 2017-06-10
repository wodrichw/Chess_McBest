import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class GameHostService {
  private host: BehaviorSubject<string> = new BehaviorSubject(null);
  setInquireHost(uid: string){
    this.host.next(uid);
  }
  getHost(){
    return this.host.asObservable();
  }
}