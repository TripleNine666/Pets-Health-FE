import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { Observable, of, switchMap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EndpointsHelper } from '../helpers/Endpoints.helper';
import { LoginModel, RegisterModel } from './auth.types';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _authenticated: boolean = false;
    private _httpClient = inject(HttpClient);
    private _userService = inject(UserService);
    private readonly _baseUrl = environment.apiUrl;
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------
    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }
    signIn(credentials: LoginModel): Observable<any> {
        if (this._authenticated) {
            return throwError(() => 'Пользователь уже авторизован.');
        }
        return this._httpClient
            .post(`${this._baseUrl}/${EndpointsHelper.UrlSignIn}`, credentials)
            .pipe(switchMap((response: any) => this.afterAuth(response)));
    }
    signOut(): Observable<any> {
        localStorage.removeItem('accessToken');
        this._authenticated = false;
        return of(true);
    }
    signUp(payload: RegisterModel): Observable<any> {
        return this._httpClient
            .post(`${this._baseUrl}/${EndpointsHelper.signUp}`, payload)
            .pipe(switchMap((response: any) => this.afterAuth(response)));
    }
    check(): Observable<boolean> {
        if (this._authenticated) {
            return of(true);
        }
        if (!this.accessToken) {
            return of(false);
        }
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false);
        }
        this._authenticated = true;
        return of(true);
    }
    getDecodedAccessToken(token: string): any {
        try {
            return jwtDecode(token);
        } catch (Error) {
            return null;
        }
    }
    private afterAuth(response) {
        // Store the access token in the local storage
        this.accessToken = response.accessToken;
        // Set the authenticated flag to true
        this._authenticated = true;
        const decodetToken = this.getDecodedAccessToken(response.accessToken);
        // Store the user on the user service
        this._userService.user = {
            userId: decodetToken.userId,
            name: decodetToken.name,
            email: decodetToken.email,
        };
        // Return a new observable with the response
        return of(response);
    }
}
