import { Component, OnInit } from '@angular/core';
import { User } from '../model/User';
import { DiscordLoginService } from '../service/login.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(private loginService: DiscordLoginService) { }

  user: User = {id: "", username: "", discriminator: 0, avatar: "", locale: ""};

  ngOnInit(): void {
    let loggedUser: any = sessionStorage.userLogged;
    if (loggedUser) this.user = <User>JSON.parse(loggedUser);
  }

  deconnection(): void{
    this.loginService.deconnect();
  }
}
