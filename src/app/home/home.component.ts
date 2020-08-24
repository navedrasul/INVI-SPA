import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../services/app-state.service';
import { AppEventsService } from '../services/app-events.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MenuModalComponent } from '../components/shared/menu-modal/menu-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  menuModalRef: BsModalRef;
  subscriptions: Subscription[] = [];

  constructor(
    private appStateSvc: AppStateService,
    private appEventsSvc: AppEventsService,
    private modalSvc: BsModalService
  ) { }

  ngOnInit(): void {
    this.updateMenuModalVisibility();

    this.subscribeMenuVisibleChangeEvent();
  }

  subscribeMenuVisibleChangeEvent() {
    this.appEventsSvc.menuVisibleChange$.subscribe(
      () => {
        this.updateMenuModalVisibility();
      },
      err => console.error('Error receiving menuVisibleChange notif.: ', err)
    );
  }

  // Show or hide Menu modal based on the relevant value.
  updateMenuModalVisibility() {
    if (this.appStateSvc.MenuVisible) {
      this.openModalWithComponent();
    } else {
      this.menuModalRef?.hide();
    }
  }

  openModalWithComponent() {
    const initialState = {
      list: [
        'Open a modal with component',
        'Pass your data',
        'Do something else',
        '...'
      ],
      title: 'I N V I - Options'
    };

    // Subscribe to the modal's events.
    this.subscriptions.push(
      this.modalSvc.onHidden.subscribe((reason: string) => {
        this.appStateSvc.MenuVisible = false;

        const reasonDesc = reason ? `, dismissed by ${reason}` : '';
        console.log(`onHidden event has been fired${reasonDesc}`);
        this.unsubscribeModalEvents();
      })
    );

    // Show the modal.
    this.menuModalRef = this.modalSvc.show(MenuModalComponent, { initialState });
    this.menuModalRef.content.closeBtnName = 'Close';
  }

  unsubscribeModalEvents() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }
}
