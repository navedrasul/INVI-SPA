import { Injectable } from '@angular/core';
import { DataStorageService } from './data-storage.service';
import { AppEventsService } from './app-events.service';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  constructor(
    private dataSvc: DataStorageService,
    private appEventsSvc: AppEventsService
  ) { }


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


  public get MenuVisible(): boolean {
    const appState = this.dataSvc.CurrAppState;
    return appState.menuVisible;
  }

  public set MenuVisible(isOn: boolean) {
    const appState = this.dataSvc.CurrAppState;
    appState.menuVisible = isOn;
    this.dataSvc.CurrAppState = appState;

    this.appEventsSvc.emitMenuVisibleChange(isOn);
  }

}
