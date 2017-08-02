// external
import { Inject, Injectable, Optional } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

// internal
import {
  ItemsType,
  NavigationConfigInterface,
  NavigationInterface,
  NavigationItemsInterface
} from './ngx-ui-navigation.interface';

/**
 * @export
 * @class NavigationConfig
 * @implements {NavigationConfigInterface}
 */
@Injectable()
export class NavigationConfig implements NavigationConfigInterface {
  navigations: {
    [index: string]: NavigationInterface
  }
};

/**
 * @export
 * @class NavigationService
 */
@Injectable()
export class NavigationService {
  public selected: any;

  /**
   * @private
   * @type {{
   *     [index: string]: NavigationInterface
   *   }}
   * @memberof NavigationService
   */
  private navigation: {
    [index: string]: NavigationInterface
  } = {};

  /**
   * Creates an instance of NavigationService.
   * @param {NavigationConfig} [config]
   * @memberof NavigationService
   */
  constructor( @Optional() @Inject(NavigationConfig) config?: NavigationConfig) {
    this.init(config);
  }

  /**
   * @private
   * @param {string} name
   * @param {boolean} [value]
   * @param {string} [url]
   * @returns {this}
   * @memberof NavigationService
   */
  private setSelected(name: string, value?: boolean, url?: string): this {
    if (this.navigation[name]) {
      this.select(name, {});

      // Mark as selected when value and url
      if (this.navigation[name].hasOwnProperty('items')) {
        this.navigation[name].items.map((menu: NavigationItemsInterface) => {
          menu.selected = false;
          if (menu.items && menu.hasOwnProperty('items')) {
            menu.items.map((submenu: NavigationItemsInterface) => {
              submenu.selected = false
              if (submenu.routerLink === url && submenu.disabled !== true && submenu.hidden !== true) {
                submenu.selected = value;
                menu.selected = value;
              }
              return submenu;
            });
            return menu;
          }
        });

        // Filter by selected true
        const menuSelected = this.navigation[name].items
          .filter((menu: NavigationItemsInterface) => menu.selected === value)
          .map((menu: NavigationItemsInterface, index) => menu)[0];

        if (menuSelected && menuSelected.items) {
          const submenuSelected = menuSelected.items
            .filter((submenu: NavigationItemsInterface) => submenu.selected === value)
            .map((submenu: NavigationItemsInterface) => submenu)[0];

          this.select(name, Object.assign({}, menuSelected, { selected: submenuSelected }));
        }
      }
    }
    return this;
  }


  /**
   * @private
   * @param {NavigationConfig} [config]
   * @memberof NavigationService
   */
  private init(config?: NavigationConfig): void {
    if (config) {
      for (const type in config) {
        if (config.hasOwnProperty(type)) {
          if (type === 'navigations') {
            for (const nav in config[type]) {
              if (config[type].hasOwnProperty(nav)) {
                this.navigation[nav] = Object.assign(
                  { selected: new Subject<{ routerLink: string }>() },
                  config[type][nav]
                )
              }
            }
          }
        }
      }
    }
  }

  /**
   * @private
   * @param {string} name
   * @param {*} selected
   * @memberof NavigationService
   */
  private select(name: string, selected: any): void {
    delete selected.items;
    this.selected = Object.assign({}, {
      name: this.navigation[name].name,
      selected
    });
    this.navigation[name].selected.next(this.selected);
  }

  /**
   * Get selected navigation item with subscribe.
   * @param {string} name
   * @returns {Observable<NavigationItemsInterface>}
   * @memberof NavigationService
   */
  public selectedObservable(name: string): Observable<NavigationItemsInterface> {
    return this.navigation[name].selected.asObservable();
  }

  /**
   * @param {string} name
   * @returns {(NavigationInterface | undefined)}
   * @memberof NavigationServassice
   */
  public get(name: string): NavigationInterface | undefined {
    if (name) {
      return this.navigation[name];
    }
  }

  /**
   * @param {string} name
   * @param {string} url
   * @memberof NavigationService
   */
  public selectByUrl(name: string, url?: string): void {
    this.setSelected(name, true, url);
  }
}
