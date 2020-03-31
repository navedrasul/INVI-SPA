import { Component, OnInit } from '@angular/core';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  faMinusCircle = faMinusCircle;

  removeMode = true;

  constructor() { }

  ngOnInit(): void {
  }

  enableRemoveMode() {
    this.removeMode = true;
  }

  disableRemoveMode() {
    this.removeMode = false;
  }

  removeAll() {
    console.log('removeAll() called!');

    // TODO: implement this!
  }

}
