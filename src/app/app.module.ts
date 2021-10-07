import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { EzFormsModule, EzTableModule, ClonePipeModule } from 'ngx-ez';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { UsersComponent } from './components/users/users.component';
import { UserComponent } from './components/user/user.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, AppRoutingModule, EzFormsModule, EzTableModule, ClonePipeModule ],
  declarations: [ AppComponent, SpinnerComponent, UsersComponent, UserComponent ],
  bootstrap:    [ AppComponent ],
  providers: []
})
export class AppModule {}
