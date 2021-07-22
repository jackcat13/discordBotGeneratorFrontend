import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BotListComponent } from './bot-list/bot-list.component';
import { LoginComponent } from './login/login.component';
import { DiscordLoginService } from './service/login.service';
import { UserDetailsComponent } from './user-details/user-details.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    BotListComponent,
    LoginComponent,
    UserDetailsComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [DiscordLoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }