import { Component, OnInit } from '@angular/core';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { AppStateService } from 'src/app/services/app-state.service';
import { AppEventsService } from 'src/app/services/app-events.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  faMinusCircle = faMinusCircle;

  removeMode = false;

  constructor(
    private appStateSvc: AppStateService,
    private appEventsSvc: AppEventsService,
    private dataSvc: DataStorageService
  ) { }

  ngOnInit(): void {
    this.removeMode = this.appStateSvc.RemoveMode;

    this.subscribeRemoveModeChangeEvent();
  }

  subscribeRemoveModeChangeEvent() {
    this.appEventsSvc.removeModeChange$.subscribe(
      res => this.removeMode = res,
      err => console.error('Error receiving removeModeChange notif.: ', err)
    );
  }

  changeRemoveMode(isOn: boolean) {
    this.removeMode = isOn;

    this.appStateSvc.RemoveMode = this.removeMode;
  }

  removeAll() {
    console.log('removeAll() called!');

    if (confirm('Are you sure you want to REMOVE ALL items?')) {
      this.dataSvc.removeAllItems();
      this.changeRemoveMode(false);
    }
  }

}
