// externals
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
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
export class NavigationComponent implements AfterViewInit, OnInit {
  @Input() name: string;
  @Output() selected: EventEmitter<any> = new EventEmitter();

  /**
   * Navigation holder.
   * @type {(Object | undefined)}
   * @memberof NavigationComponent
   */
  public navigation: Object | undefined;

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
  ngAfterViewInit() {
    this.navigationService.selectByUrl(this.name, this.router.url);
  }

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
