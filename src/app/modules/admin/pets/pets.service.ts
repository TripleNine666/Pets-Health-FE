import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { EndpointsHelper } from '../../../core/helpers/Endpoints.helper';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { PetCreateModel, PetModel } from './pets.types';

@Injectable({
    providedIn: 'root',
})
export class PetsService {
    private _pets: BehaviorSubject<PetModel[]> = new BehaviorSubject<
        PetModel[]
    >([]);
    private _petFullInfo: BehaviorSubject<PetModel> =
        new BehaviorSubject<PetModel>(null);

    private readonly _baseUrl = environment.apiUrl;

    constructor(private _http: HttpClient) {}

    get pets$(): Observable<PetModel[]> {
        return this._pets.asObservable();
    }

    get petFullInfo$(): Observable<PetModel> {
        return this._petFullInfo.asObservable();
    }

    resetPetFullInfo() {
        this._petFullInfo.next(null);
    }

    getAllPets() {
        return this._http
            .get<PetModel[]>(`${this._baseUrl}${EndpointsHelper.pets}`)
            .pipe(tap((pets: PetModel[]) => this._pets.next(pets)));
    }

    getPetById(id: string) {
        return this._http
            .get<PetModel>(`${this._baseUrl}${EndpointsHelper.pets}/${id}`)
            .pipe(tap((pet: PetModel) => this._petFullInfo.next(pet)));
    }

    createPet(pet: PetCreateModel) {
        return this._http.post(`${this._baseUrl}${EndpointsHelper.pets}`, pet);
    }

    updatePet(pet: PetCreateModel, petId: string) {
        return this._http.patch(
            `${this._baseUrl}${EndpointsHelper.pets}/${petId}${EndpointsHelper.profile}`,
            pet,
        );
    }

    deletePet(petId: string) {
        return this._http.delete(
            `${this._baseUrl}${EndpointsHelper.pets}/${petId}`,
        );
    }
}
