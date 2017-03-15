import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule , JsonpModule } from '@angular/http';
import { AlertModule } from 'ng2-bootstrap';


import { AppComponent } from './component/app.component';
import { TodoComponent } from './component/todo.component';
import { EksiMenuBarComponent} from './component/eksi.menubar.component';


@NgModule({
  declarations: [
    AppComponent,EksiMenuBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    AlertModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
