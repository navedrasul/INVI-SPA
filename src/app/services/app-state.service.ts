import { Injectable } from '@angular/core';
import { DataStorageService } from './data-storage.service';
import { AppState } from '../models/AppState';
import { AppEventsService } from './app-events.service';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  public get RemoveMode(): boolean {
    const appState = this.dataSvc.CurrAppState;
    return appState.removeMode;
  }

  public set RemoveMode(isOn: boolean) {
    const appState = this.dataSvc.CurrAppState;
    appState.removeMode = isOn;
    this.dataSvc.CurrAppState = appState;

    this.appEventsSvc.emitRemoveModeChange(isOn);
  }


  public get FooterHidden(): boolean {
    const appState = this.dataSvc.CurrAppState;
    return appState.footerHidden;
  }

  public set FooterHidden(isOn: boolean) {
    const appState = this.dataSvc.CurrAppState;
    appState.footerHidden = isOn;
    this.dataSvc.CurrAppState = appState;

    this.appEventsSvc.emitFooterHiddenChange(isOn);
  }


  constructor(
    private dataSvc: DataStorageService,
    private appEventsSvc: AppEventsService
  ) { }

}
