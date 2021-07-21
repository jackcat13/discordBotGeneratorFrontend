import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Bot } from "../model/Bot";

@Injectable()
export class BotService {
    botUrl = 'api/bots';

    constructor(private http: HttpClient) { }

    getBots(): Observable<Bot[]> {
        return this.http.get<Bot[]>(this.botUrl);
    }
}