import { Component, OnInit } from '@angular/core';
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  hidden = true;

  faChevronUp = faChevronUp;
  faChevronDown = faChevronDown;

  constructor() { }

  ngOnInit(): void {
  }

  showHideBtn_click(event: any) {
    console.log(event);
  }

}
