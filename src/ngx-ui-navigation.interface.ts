export type ItemsType = Array<NavigationItemsInterface>;
export interface NavigationItemsInterface {
  icon?: string;
  name: string;
  description?: string;
  routerLink: string;
  disabled?: boolean;
  new?: number;
}
export interface GroupNavigationInterface {
  header: string;
  items: ItemsType;
}
export interface NavigationInterface {
  name: string;
  selected?: any;
  group: Array<GroupNavigationInterface>;
}
