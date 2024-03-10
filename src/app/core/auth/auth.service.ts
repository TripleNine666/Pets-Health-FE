import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {AuthUtils} from 'app/core/auth/auth.utils';
import {UserService} from 'app/core/user/user.service';
import {Observable, of, switchMap, throwError} from 'rxjs';
import {environment} from "../../../environments/environment";
import {EndpointsHelper} from "../helpers/Endpoints.helper";
import {LoginModel, RegisterModel} from "./auth.types";
import {User} from "../user/user.types";
import {jwtDecode} from 'jwt-decode';

@Injectable({providedIn: 'root'})
export class AuthService
{
    private _authenticated: boolean = false;
    private _httpClient = inject(HttpClient);
    private _userService = inject(UserService);

    private readonly _baseUrl = environment.apiUrl

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string)
    {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string
    {
        return localStorage.getItem('accessToken') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    signIn(credentials: LoginModel): Observable<any>
    {
        // Throw error, if the user is already logged in
        if ( this._authenticated )
        {
            return throwError('User is already logged in.');
        }

        return this._httpClient.post(`${this._baseUrl}/${EndpointsHelper.signIn}`, credentials).pipe(
            switchMap((response: any) => this.afterAuth(response)),
        );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any>
    {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param payload
     */
    signUp(payload: RegisterModel): Observable<any>
    {
        return this._httpClient.post(`${this._baseUrl}/${EndpointsHelper.signUp}`, payload).pipe(
            switchMap((response: any) => this.afterAuth(response)),
        );
    }

    /**`
     * Check the authentication status
     */
    check(): Observable<boolean>
    {
        // Check if the user is logged in
        if ( this._authenticated )
        {
            return of(true);
        }

        // Check the access token availability
        if ( !this.accessToken )
        {
            return of(false);
        }

        // Check the access token expire date
        if ( AuthUtils.isTokenExpired(this.accessToken) )
        {
            return of(false);
        }

        // If the access token exists, and it didn't expire, sign in using it
        this._authenticated = true
        return of(true);
    }

    private afterAuth(response){
        // Store the access token in the local storage
        this.accessToken = response.accessToken;

        // Set the authenticated flag to true
        this._authenticated = true;

        const decodetToken = this.getDecodedAccessToken(response.accessToken)
        // Store the user on the user service
        this._userService.user = {
            userId: decodetToken.userId,
            name: decodetToken.name,
            email: decodetToken.email
        };

        // Return a new observable with the response
        return of(response);
    }

    getDecodedAccessToken(token: string): any {
        try {
            return jwtDecode(token);
        } catch(Error) {
            return null;
        }
    }
}
