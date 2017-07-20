import { Inject, Injectable, Optional } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {
  GroupNavigationInterface,
  NavigationInterface,
  NavigationItemsInterface
} from './ngx-ui-navigation.interface';

export class NavigationConfig {
  navigations: Array<NavigationInterface>
};

@Injectable()
export class NavigationService {

  navigation: Object = {};

  constructor( @Optional() @Inject(NavigationConfig) config?: NavigationConfig) {
    if (config) {
      config.navigations.forEach(nav => {
        this.add(nav.name, nav.group);
      });
    }
  }

  selectedObservable(name: string) {
    return this.navigation[name].selected.asObservable();
  }

  /**
   * add
   * @param {string} name
   * @param {Array<GroupNavigationInterface>} group
   * @returns {this}
   * @memberof NavigationService
   */
  add(name: string, group: Array<GroupNavigationInterface>): this {
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
   * delete
   * @param {string} name
   * @returns {boolean}
   * @memberof NavigationService
   */
  delete(name: string): boolean {
    return true;
  }

  /**
   * select
   * @private
   * @param {string} name
   * @memberof NavigationService
   */
  private select(name: string, itemName: string, routerLink: string): void {
    this.navigation[name].selected.next({
      itemName,
      routerLink
    });
  }

  /**
   * get
   * @param {string} name
   * @returns {NavigationInterface}
   * @memberof NavigationService
   */
  get(name: string): NavigationInterface | undefined {
    if (name) {
      return this.navigation[name];
    }
  }

  /**
   * items
   * @param {string} name
   * @returns {NavigationItemsInterface}
   * @memberof NavigationService
   */
  items(name: string): NavigationItemsInterface {
    return this.navigation[name].items;
  }

  /**
   * selectByUrl
   * @param {string} url
   * @memberof NavigationService
   */
  selectByUrl(name: string, url: string): void {
    if (this.navigation[name]) {
      this.navigation[name].group.forEach( (group: any) => {
        group.items.forEach( (item: any) => {
          if (item.routerLink === url) {
            this.select(name, item.name, item.routerLink);
          }
        });
      });
    }
  }
}
