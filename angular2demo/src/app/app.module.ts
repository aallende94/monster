import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NavigationComponent } from './shared/navigation/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { RightSidebarComponent } from './shared/right-sidebar/rightsidebar.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  { 
    path: '',
    loadChildren: './pages/starter/starter.module' 
  },{ 
    path: 'blank',
    loadChildren: './pages/blank/blank.module' 
  },{ 
    path: 'accordion',
    loadChildren: './pages/component/accordion/accordion.module' 
  },{ 
    path: 'alert',
    loadChildren: './pages/component/alert/alert.module' 
  },{ 
    path: 'carousel',
    loadChildren: './pages/component/carousel/carousel.module' 
  },{ 
    path: 'datepicker',
    loadChildren: './pages/component/datepicker/datepicker.module' 
  },{ 
    path: 'dropdown', 
    loadChildren: './pages/component/dropdown-collapse/dropdown-collapse.module' 
  },{ 
    path: 'modal',
    loadChildren: './pages/component/modal/modal.module' 
  },{ 
    path: 'pagination',
    loadChildren: './pages/component/pagination/pagination.module' 
  },{ 
    path: 'Popovertooltip',
    loadChildren: './pages/component/popover-tooltip/popover-tooltip.module' 
  },{ 
    path: 'progressbar',
    loadChildren: './pages/component/progressbar/progressbar.module' 
  },{ 
    path: 'rating',
    loadChildren: './pages/component/rating/rating.module' 
  },{ 
    path: 'tabs',
    loadChildren: './pages/component/tabs/tabs.module' 
  },{ 
    path: 'timepicker',
    loadChildren: './pages/component/timepicker/timepicker.module' 
  },{ 
    path: 'typehead',
    loadChildren: './pages/component/typehead/typehead.module' 
  },{ 
    path: 'fontawesome',
    loadChildren: './pages/icons/fontawesome/fontawesome.module' 
  },{ 
    path: 'simpleline',
    loadChildren: './pages/icons/simpleline/simpleline.module' 
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    BreadcrumbComponent,
    SidebarComponent,
    RightSidebarComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
