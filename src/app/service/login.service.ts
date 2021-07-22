import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { Token } from "../model/Token";
import { User } from "../model/User";

/**
 * Base class for any login service to be implemented
 */
export abstract class LoginService{

    constructor(private router: Router) {}

    /**
    * Handle Http operation that failed.
    * Let the app continue.
    * @param operation - name of the operation that failed
    * @param result - optional value to return as the observable result
    */
    protected handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    /**
     * isLogged method to verify if the user is already logged in the application.
     * @returns a boolean to mention if the user is already logged.
     */
    public isLogged(): boolean{
        return sessionStorage.getItem("userLogged") != null;
    }
    
    /**
     * login method that makes the user authentified in the application.
     * @param userId User identifier to login in the application.
     */
    protected login(user: User){
        sessionStorage.setItem("userLogged", user.toString());
        this.router.navigate(["/bots"]);
    }
};

/**
 * Specific Discord login service to access user informations comming from Discord.
 * Extends base class [LoginService].
 */
@Injectable()
export class DiscordLoginService extends LoginService {

    constructor(private http: HttpClient, router: Router) {super(router)}

    selfRedirect: any = process.env.DISCORD_REDIRECT
    accessTokenApi = "https://discordapp.com/api/oauth2/token"
    userDetailsApi = "https://discordapp.com/api/users/@me";

    /**
     * sendDiscordCode method to request an access_token to Discord.
     * @param code Code comming from Discord when user has authorized to use its credentials.
     */
    public sendDiscordCode(code: string): void{
        let body = new URLSearchParams();
        let options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };
        body.set('client_id', "867414651503116298");
        body.set('client_secret', "GGCjRGTKpo7zpivos2jrCN2s9WVHmD-I");
        body.set('grant_type', "authorization_code");
        body.set('code', code);
        body.set('redirect_uri', this.selfRedirect);
        this.http.post<Token>(this.accessTokenApi, body.toString(), options)
            .pipe(
                catchError(this.handleError<Token>('sendDiscordCode'))
            ).subscribe(
                res => (this.getUserDetails(res.access_token)),
                err => console.error(err),
                () => console.log("sending discord code and authentication process completed")
            );
    }

    /**
     * getUserDetails method to get user details for login identifier.
     * @param token Access token sent by Discord.
     */
    private getUserDetails(token: string): void{
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + token
            })
        };
        this.http.get<User>(this.userDetailsApi, httpOptions)
            .pipe(
                catchError(this.handleError<User>('getUserDetails'))
            )
            .subscribe(
                user => this.login(user),
                err => console.error(err),
                () => console.log("geting user details process completed")
            );
    }
}