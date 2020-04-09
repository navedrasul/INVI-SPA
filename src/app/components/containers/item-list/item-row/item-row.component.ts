import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faPen, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { Item } from 'src/app/models/item';
import { AppEventsService } from 'src/app/services/app-events.service';
import { AppStateService } from 'src/app/services/app-state.service';

@Component({
  selector: 'app-item-row',
  templateUrl: './item-row.component.html',
  styleUrls: ['./item-row.component.scss']
})
export class ItemRowComponent implements OnInit {

  faPen = faPen;
  faMinusCircle = faMinusCircle;

  @Input()
  item: Item = new Item();

  @Output()
  edit = new EventEmitter<number>();

  @Output()
  remove = new EventEmitter<number>();

  removeMode = false;

  constructor(
    private appEventSvc: AppEventsService,
    private appState: AppStateService
  ) { }

  ngOnInit(): void {
    this.removeMode = this.appState.RemoveMode;

    const removeModeChangeObs = {
      next: res => {
        this.removeMode = res;
      },
      error: err => {
        console.error('Error observing remove-mode change: ', err);
      },
    };

    this.appEventSvc.removeModeChange$.subscribe(removeModeChangeObs);
  }

  editItem() {
    this.edit.emit(this.item.id);
  }

  removeItem() {
    this.remove.emit(this.item.id);
  }

}
