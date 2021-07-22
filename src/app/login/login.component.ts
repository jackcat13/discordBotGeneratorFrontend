import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DiscordLoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private route: ActivatedRoute, private loginService: DiscordLoginService) { }

  discordAuthorizationApi = "https://discord.com/api/oauth2/authorize?client_id=867414651503116298&redirect_uri=https%3A%2F%2Fdiscord-bot-generator-frontend.herokuapp.com%2Flogin&response_type=code&scope=identify"

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        console.log(params.code);
        if (params.code != null) this.loginService.sendDiscordCode(params.code);
      });
    
  }

  

}
