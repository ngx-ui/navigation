// external
import { Inject, Injectable, Optional } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

// internal
import {
  GroupNavigationInterface,
  NavigationInterface,
  NavigationItemsInterface
} from './ngx-ui-navigation.interface';

/**
 * @export
 * @class NavigationConfig
 */
export class NavigationConfig {
  navigations: Array<NavigationInterface>
};

/**
 * @export
 * @class NavigationService
 */
@Injectable()
export class NavigationService {

  /**
   * Navigation store.
   * @private
   * @type {Object}
   * @memberof NavigationService
   */
  private navigation: Object = {};

  /**
   * Creates an instance of NavigationService.
   * @param {NavigationConfig} [config]
   * @memberof NavigationService
   */
  constructor( @Optional() @Inject(NavigationConfig) config?: NavigationConfig) {
    if (config) {
      config.navigations.forEach(nav => {
        this.add(nav.name, nav.group);
      });
    }
  }

  /**
   * Get selected navigation item with subscribe.
   * @param {string} name
   * @returns {Observable<any>}
   * @memberof NavigationService
   */
  public selectedObservable(name: string): Observable<any> {
    return this.navigation[name].selected.asObservable();
  }

  /**
   * @param {string} name
   * @param {Array<GroupNavigationInterface>} group
   * @returns {this}
   * @memberof NavigationService
   */
  public add(name: string, group: Array<GroupNavigationInterface>): this {
    if (name && group) {
      if (!this.navigation[name]) {
        this.navigation[name] = {
          selected: new Subject<{ routerLink: string }>(),
          group: []
        };
      }
      // add items to specific navigation name
      group.forEach((g: GroupNavigationInterface, key) => {
        this.navigation[name].group.push(g);
      });
    }
    return this;
  }

  /**
   * @param {string} name
   * @returns {boolean}
   * @memberof NavigationService
   */
  public delete(name: string): boolean {
    return true;
  }

  /**
   * @private
   * @param {string} name
   * @param {Object} select
   * @memberof NavigationService
   */
  private select(name: string, select: Object): void {
    this.navigation[name].selected.next(select);
  }

  /**
   * get
   * @param {string} name
   * @returns {NavigationInterface}
   * @memberof NavigationService
   */
  public get(name: string): NavigationInterface | undefined {
    if (name) {
      return this.navigation[name];
    }
  }

  /**
   * Return array list of items from navigation specified by name.
   * @param {string} name
   * @returns {NavigationItemsInterface}
   * @memberof NavigationService
   */
  items(name: string): NavigationItemsInterface {
    return this.navigation[name].items;
  }

  /**
   * @param {string} name
   * @param {string} url
   * @memberof NavigationService
   */
  public selectByUrl(name: string, url: string): void {
    if (this.navigation[name]) {
      this.navigation[name].group.forEach( (group: any) => {
        group.items.forEach( (item: any) => {
          if (item.routerLink === url) {
            this.select(name, { [group.header]: item });
          }
        });
      });
    }
  }
}
