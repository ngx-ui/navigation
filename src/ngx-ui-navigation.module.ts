// external
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// internal
import { NavigationComponent } from './ngx-ui-navigation.component';
import { NavigationConfig, NavigationService } from './ngx-ui-navigation.service';

@NgModule({
  declarations: [ NavigationComponent ],
  exports: [ NavigationComponent ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class NavigationModule {
  static forRoot(config: NavigationConfig): ModuleWithProviders {
    return {
      ngModule: NavigationModule,
      providers: [
        NavigationService,
        {
          provide: NavigationConfig,
          useValue: config
        }
      ]
    };
  }

  static forChild() {
    return {
      ngModule: NavigationModule
    };
  }
}
