import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {EndpointsHelper} from "../../../core/helpers/Endpoints.helper";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {PetModel} from "./pets.types";


@Injectable({
  providedIn: 'root'
})
export class PetsService {

    private _pets: BehaviorSubject<PetModel[]> = new BehaviorSubject<PetModel[]>([])

    get pets$(): Observable<PetModel[]> {
        return this._pets.asObservable()
    }

    constructor(private _http: HttpClient) {
    }
  private readonly _baseUrl = environment.apiUrl

    getAllPets() {
        return this._http.get(`${this._baseUrl}${EndpointsHelper.pets}`).pipe(
            tap((pets: PetModel[]) => this._pets.next(pets))
        )
    }
}
