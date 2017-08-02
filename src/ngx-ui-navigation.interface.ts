export interface NavigationItemsInterface {
  description?: string;
  disabled?: boolean;
  hidden?: boolean;
  icon?: string;
  image?: string;
  items?: ItemsType;
  name: string;
  routerLink: string;
  selected?: boolean;
  sort?: {
    by: 'description' | 'disabled' | 'hidden' | 'items' | 'name' | 'selected',
    type: 'asc' | 'desc'
  };
}
export type ItemsType = Array<NavigationItemsInterface>;

export interface NavigationInterface {
  readonly selected?: any;
  name: string;
  items: ItemsType;
}
export interface NavigationConfigInterface {
  navigations: {
    [index: string]: NavigationInterface
  }
}

export interface SelectedInterface {
  name: string;
  selected: {
    name: string;
    routerLink: string;
    icon?: string;
    description?: string;
    selected?: {
      name: string;
      routerLink: string;
      selected?: boolean;
      icon?: string;
      description?: string;
    }
  };
}
