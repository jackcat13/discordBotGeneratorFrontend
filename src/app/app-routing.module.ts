import { Injectable, NgModule } from '@angular/core';
import { CanActivate, Router, RouterModule, Routes } from '@angular/router';
import { BotListComponent } from './bot-list/bot-list.component';
import { LoginComponent } from './login/login.component';
import { DiscordLoginService } from './service/login.service';

@Injectable({
  providedIn: 'root'
})
class AccessGuard implements CanActivate {

  constructor( private loginService: DiscordLoginService, private router: Router ){}

  canActivate() {
    if (this.loginService.isLogged()){
      return true;
    }
    else{
      this.router.navigate(["/login"]);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
class LoggedGuard implements CanActivate {

  constructor( private loginService: DiscordLoginService, private router: Router ){}

  canActivate() {
    if (this.loginService.isLogged()){
      this.router.navigate(["/bots"]);
      return false;
    }
    else{
      return true;
    }
  }
}

const routes: Routes = [
  { path: 'bots', component: BotListComponent, canActivate: [ AccessGuard ] },
  { path: 'login', component: LoginComponent, canActivate: [ LoggedGuard ] },
  { path: '', redirectTo: '/bots', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }