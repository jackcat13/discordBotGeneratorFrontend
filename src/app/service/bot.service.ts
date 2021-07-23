import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';

import { Bot } from "../model/Bot";
import { User } from "../model/User";
import { delay, mergeMap, retryWhen } from "rxjs/operators";
import { Configuration } from "../model/Configuration";

@Injectable()
export class BotService {
    botUrl = 'api/bots';

    constructor(private http: HttpClient) { }

    getBots(): Observable<Bot[]> {
        let userId = this.getUserIdLogged();
        let params = new HttpParams().set("userId", userId);
        return this.http.get<Bot[]>(this.botUrl, { params }).pipe(
            retryWhen(error => {
                return this.manageRetry(error);
            })
        );
    }

    private manageRetry(error: Observable<any>): Observable<any> {
        return error.pipe(
            mergeMap((error: any) => {
                if (error.status === 503) {
                    return of(error.status).pipe(delay(2000))
                }
                return throwError({ error: 'No retry' });
            })
        )
    }

    createBot(botId: string, botDescription: string): Observable<Bot> {
        let userId = this.getUserIdLogged()
        let user: User = { id: userId, username: "", discriminator: 0, avatar: "", locale: "" };
        let bot: Bot = { id: botId, description: botDescription, user: user }
        return this.http.post<Bot>(this.botUrl, bot);
    }

    configureBot(bot: Bot): Observable<Bot> {
        return this.http.put<Bot>(this.botUrl, bot);
    }

    deleteBot(botToDelete: Bot): Observable<any> {
        let userId = this.getUserIdLogged()
        let user: User = { id: userId, username: "", discriminator: 0, avatar: "", locale: "" };
        return this.http.delete<any>(this.botUrl + "/" + botToDelete.id);
    }

    private getUserIdLogged(): string {
        let userId = "";
        let loggedUser: any = sessionStorage.userLogged;
        if (loggedUser) userId = JSON.parse(loggedUser).id;
        return userId;
    }
}
