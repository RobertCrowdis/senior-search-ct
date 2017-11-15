import { Component, OnInit, ViewEncapsulation } from '@angular/core';

/**
 * A component for the AboutComponent
 */
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
