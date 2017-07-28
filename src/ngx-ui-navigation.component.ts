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

  /**
   * Get navigation with inputted name.
   * @type {(Object | undefined)}
   * @memberof NavigationComponent
   */
  navigation: Object | undefined;

  /**
   * Creates an instance of NavigationComponent.
   * @param {NavigationService} NavigationService
   * @param {Router} router
   * @memberof NavigationComponent
   */
  constructor(
    private navigationService: NavigationService,
    private router: Router
  ) { }

  /**
   * @memberof NavigationComponent
   */
  ngOnInit() {
    if (this.name) {
      this.navigation = this.navigationService.get(this.name);

      // router events
      this.router.events.subscribe(
        (value) => {
          if (value instanceof NavigationEnd) {
            this.navigationService.selectByUrl(this.name, value.url);
          }
        }
      );
    }
  }
}
