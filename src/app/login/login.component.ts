import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DiscordLoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private route: ActivatedRoute, private loginService: DiscordLoginService) { }

  isLoading = false;

  discordAuthorizationApi: any = environment.discord_authorization_api;

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        if (params.code != null) {
          this.loginService.sendDiscordCode(params.code);
          this.isLoading = true;
        }
      });
  }
}
