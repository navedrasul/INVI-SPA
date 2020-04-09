import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class AppEventsService {

  private removeModeChangeSource = new Subject<boolean>();
  removeModeChange$ = this.removeModeChangeSource.asObservable();

  private footerHiddenChangeSource = new Subject<boolean>();
  footerHiddenChange$ = this.footerHiddenChangeSource.asObservable();

  constructor() { }

  emitRemoveModeChange(isOn: boolean) {
    this.removeModeChangeSource.next(isOn);
  }

  emitFooterHiddenChange(isHidden: boolean) {
    this.footerHiddenChangeSource.next(isHidden);
  }

}
