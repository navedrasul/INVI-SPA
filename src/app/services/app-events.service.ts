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

  private menuVisibleChangeSource = new Subject<boolean>();
  menuVisibleChange$ = this.menuVisibleChangeSource.asObservable();

  private exportImageChangeSource = new Subject<boolean>();
  exportImageChange$ = this.exportImageChangeSource.asObservable();

  private exportPdfChangeSource = new Subject<boolean>();
  exportPdfChange$ = this.exportPdfChangeSource.asObservable();

  private exportExcelChangeSource = new Subject<boolean>();
  exportExcelChange$ = this.exportExcelChangeSource.asObservable();

  constructor() { }

  emitRemoveModeChange(isOn: boolean) {
    this.removeModeChangeSource.next(isOn);
  }

  emitFooterHiddenChange(isHidden: boolean) {
    this.footerHiddenChangeSource.next(isHidden);
  }

  emitMenuVisibleChange(isHidden: boolean) {
    this.menuVisibleChangeSource.next(isHidden);
  }

  emitExportImageChange() {
    this.exportImageChangeSource.next();
  }

  emitExportPdfChange() {
    this.exportPdfChangeSource.next();
  }

  emitExportExcelChange() {
    this.exportExcelChangeSource.next();
  }

}
