import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule , JsonpModule } from '@angular/http';

import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DropdownModule } from 'ng2-bootstrap';

import { AppComponent } from './component/rootcomp';
import { EksiMenuBarComponent} from './component/menubarcomp';
import { EksiLeftsideComponent} from './component/leftcomp';
import { EksiSharedService } from './service/eksi-shared.service';
import { EksiciService } from './service/eksici-http-service';

import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { 
    path: 'today'          , 
    component: EksiLeftsideComponent ,
    data: {
      href: 'topic/today',
      title: 'bugün',
      type:  'classic'
    }
  },
  { 
    path: 'deserted'          , 
    component: EksiLeftsideComponent ,
    data: {
      href: 'topic/deserted',
      title: 'başıboşlar',
      type:  'classic'
    }
  },
  { 
    path: 'videos'          , 
    component: EksiLeftsideComponent ,
    data: {
      href: 'topic/videos',
      title: 'videolar',
      type:  'classic'
    }
  },
  { path: 'popular'        , 
    component: EksiLeftsideComponent ,
    data: {
      href: 'topic/popular',
      title: 'gündem',
      type:  'classic'
    }
  },
  { path: 'todayinhistory/:year'        , 
    component: EksiLeftsideComponent ,
    data: {
      href: 'topic/todayinhistory/',
      title: 'tarihte bugün',
      type:  'history'
    }
  },
  { path: 'channels/:channelname/topics'        , 
    component: EksiLeftsideComponent ,
    data: {
      type:  'channel'
    }
  },
  { path: '**', redirectTo: '/today', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,EksiMenuBarComponent,EksiLeftsideComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    NgbModule.forRoot(),
    DropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [EksiSharedService,EksiciService],
  bootstrap: [AppComponent]
})
export class AppModule { }
