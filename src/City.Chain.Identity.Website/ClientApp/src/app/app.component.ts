import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(
    readonly router: Router,
    readonly viewportScroller: ViewportScroller
  ) {

  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // this.viewportScroller.scrollToPosition([0, 0]);
      // this.viewportScroller.scrollToAnchor('content');
      document.getElementById('content').scrollTo(0, 0);
    });
  }
}
