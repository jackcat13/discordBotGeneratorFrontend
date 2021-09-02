import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BotListComponent } from './bot-list/bot-list.component';
import { LoginComponent } from './login/login.component';
import { DiscordLoginService } from './service/login.service';
import { UserDetailsComponent } from './user-details/user-details.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BorderedTitleModule } from 'jackcat13-ng-bordered-title';
import { BorderedDivModule } from 'jackcat13-ng-bordered-div';
import { BorderedButtonModule } from 'jackcat13-ng-bordered-button';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    HttpClientModule,
    ReactiveFormsModule,
    BorderedTitleModule,
    BorderedDivModule,
    BorderedButtonModule,
    MatAutocompleteModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [DiscordLoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }