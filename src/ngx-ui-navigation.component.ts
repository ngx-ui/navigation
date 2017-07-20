// externals
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

// internals
import { NavigationService } from './ngx-ui-navigation.service';

import template from './ngx-ui-navigation.component.html';

/**
 * @export
 * @class NavigationComponent
 * @implements {OnInit}
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-ui-navigation',
  template
})
export class NavigationComponent implements OnInit {
  @Input() name: string;

  NavigationService: NavigationService;
  navigation: Object;

  /**
   * Creates an instance of NavigationComponent.
   * @param {NavigationService} NavigationService 
   * @param {Router} router 
   * @memberof NavigationComponent
   */
  constructor(NavigationService: NavigationService, private router: Router) {
    this.NavigationService = NavigationService;
  }

  /**
   * @memberof NavigationComponent
   */
  ngOnInit() {
    if (this.name) {
      this.navigation = this.NavigationService.navigation[this.name];

      this.router.events.subscribe(
        (value) => {
          if (value instanceof NavigationEnd) {
            this.NavigationService.selectByUrl(this.name, value.url);
          }
        }
      );
    }
  }
}
