import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Bot } from "../model/Bot";
import { User } from "../model/User";

@Injectable()
export class BotService {
    botUrl = 'api/bots';

    constructor(private http: HttpClient) { }

    getBots(): Observable<Bot[]> {
        let userId = this.getUserIdLogged();
        let params = new HttpParams().set("userId", userId);
        return this.http.get<Bot[]>(this.botUrl, {params});
    }

    createBot(botId: string, botDescription: string): Observable<Bot> {
        let userId = this.getUserIdLogged()
        let user: User = {id: userId, username: "", discriminator: 0, avatar: "", locale: ""};
        let bot: Bot = {id: botId, description: botDescription, user: user}
        return this.http.post<Bot>(this.botUrl, bot);
    }

    private getUserIdLogged(): string{
        let userId = "";
        let loggedUser: any = sessionStorage.userLogged;
        if (loggedUser) userId = JSON.parse(loggedUser).id;
        return userId;
    }
}