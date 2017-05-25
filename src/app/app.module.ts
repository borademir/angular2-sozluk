import { BrowserModule }            from '@angular/platform-browser';
import { NgModule }                 from '@angular/core';
import { FormsModule }              from '@angular/forms';
import { HttpModule , JsonpModule } from '@angular/http';
import { RequestOptions,XHRBackend} from '@angular/http';
import { NgbModule}                 from '@ng-bootstrap/ng-bootstrap';
import { DropdownModule }           from 'ng2-bootstrap';
import { AppComponent }             from './component/rootcomp';

import { EksiMenuBarComponent}      from './component/menubarcomp';
import { TopicListComponent}        from './component/topiclistcomp';
import { TopicInfoComponent}        from './component/topicinfocomp';
import { SuserComponent}            from './component/susercomp';
import { LoginComponent}            from './component/logincomp';
import { EksiSharedService }        from './service/eksi-shared.service';
import { EksiciService }            from './service/eksici-http-service';
import { EksiciHttpImplService }    from './service/eksici-http-impl.service';
import { SessionManagementService } from './service/session-management.service';

import { ProgressbarModule }        from 'ngx-bootstrap/progressbar';
import { RouterModule, Routes }     from '@angular/router';
import { ModalModule }              from 'ngx-bootstrap/modal';
import { ResponsiveConfig }         from 'ng2-responsive'
import { ResponsiveModule }         from 'ng2-responsive'

import { CollapseModule } from 'ng2-bootstrap'


// RECOMMENDED (doesn't work with system.js)
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

 let config = {
    breakPoints: {
        xs: {max: 600},
        sm: {min: 601, max: 959},
        md: {min: 960, max: 1279},
        lg: {min: 1280, max: 1919},
        xl: {min: 1920}
    },
    debounceTime: 100 // allow to debounce checking timer
  };
 
  export function ResponsiveDefinition(){ 
          return new ResponsiveConfig(config);
  };

const appRoutes: Routes = [
  { 
    path: 'login'          , 
    component: LoginComponent ,
    data: {
      type:  'login'
    }
  },  
  { 
    path: 'suser/:suserNick'          , 
    component: SuserComponent ,
    data: {
      type:  'suser'
    }
  },
  { 
    path: 'topic/entries/:topicHref'          , 
    component: TopicInfoComponent ,
    data: {
      type:  'topic'
    }
  },
  { 
    path: ''          , 
    component: TopicInfoComponent ,
    data: {
      type:  'see'
    }
  },
  { 
    path: 'entry/:entryId'          , 
    component: TopicInfoComponent ,
    data: {
      type:  'entry'
    }
  },
  { 
    path: 'today'          , 
    component: TopicInfoComponent ,
    data: {
      href: 'topic/today',
      title: 'bugün',
      type:  'classic'
    }
  },
  { 
    path: 'deserted'          , 
    component: TopicInfoComponent ,
    data: {
      href: 'topic/deserted',
      title: 'başıboşlar',
      type:  'classic'
    }
  },
  { 
    path: 'videos'          , 
    component: TopicInfoComponent ,
    data: {
      href: 'topic/videos',
      title: 'videolar',
      type:  'classic'
    }
  },
  { path: 'popular'        , 
    component: TopicInfoComponent ,
    data: {
      href: 'topic/popular',
      title: 'gündem',
      type:  'classic'
    }
  },
  { path: 'todayinhistory/:year'        , 
    component: TopicInfoComponent ,
    data: {
      href: 'topic/todayinhistory/',
      title: 'tarihte bugün',
      type:  'history'
    }
  },
  { path: 'channels/:channelname/topics'        , 
    component: TopicInfoComponent ,
    data: {
      type:  'channel'
    }
  }
  ,{ path: '**', redirectTo: '/today', pathMatch: 'full' }
];


@NgModule({
  declarations: [
    AppComponent,EksiMenuBarComponent,TopicInfoComponent, TopicListComponent , SuserComponent, LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    NgbModule.forRoot(),
    DropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    ResponsiveModule,
    TypeaheadModule.forRoot(),
    ProgressbarModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot()
  ],
  providers: [
    EksiSharedService,
    EksiciService,
    SessionManagementService,
    {
     provide: ResponsiveConfig, 
     useFactory: ResponsiveDefinition 
    },
    {
      provide: EksiciHttpImplService,
      useFactory: (backend: XHRBackend, options: RequestOptions) => {
        return new EksiciHttpImplService(backend, options);
      },
      deps: [XHRBackend, RequestOptions]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor (eksiSharedService: EksiSharedService, sessionManagementService: SessionManagementService){
    console.log('AppModule constructor init');
    let token = sessionManagementService.getSozlukToken();
    console.log('AppModule constructor, token:' + token);
    if(token != null){
      eksiSharedService.loginWithToken(token);
    }
  }

}
