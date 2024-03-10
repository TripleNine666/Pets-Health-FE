import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from 'app/core/user/user.types';
import {map, Observable, of, ReplaySubject, tap} from 'rxjs';
import {user} from "../../mock-api/common/user/data";

@Injectable({providedIn: 'root'})
export class UserService
{
    private _httpClient = inject(HttpClient);

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User)
    {
        // Store the value
        localStorage.setItem('user', JSON.stringify(value))
    }

    get user$(): Observable<User>
    {
        const user = localStorage.getItem('user')
        console.log(user)
        console.log(JSON.parse(user))
        return of(JSON.parse(user))
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current signed-in user data
     */

}
