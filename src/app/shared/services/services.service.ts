import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { EndpointsHelper } from '../../core/helpers/Endpoints.helper';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ServiceModel } from './services.types';

@Injectable({
    providedIn: 'root',
})
export class ServicesService {
    private _services: BehaviorSubject<ServiceModel[]> = new BehaviorSubject<
        ServiceModel[]
    >([]);

    private readonly _baseUrl = environment.apiUrl;

    constructor(private _http: HttpClient) {}

    get services$(): Observable<ServiceModel[]> {
        return this._services.asObservable();
    }

    public subservices(id: string) {
        return this._services.getValue().find((service) => service._id === id)
            .subservices;
    }

    getAllServices() {
        return this._http
            .get<ServiceModel[]>(
                `${this._baseUrl}${EndpointsHelper.UrlService}`,
            )
            .pipe(
                tap((services: ServiceModel[]) =>
                    this._services.next(services),
                ),
            );
    }
}
