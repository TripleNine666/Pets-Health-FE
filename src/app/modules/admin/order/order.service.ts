import { Injectable } from '@angular/core';
import {BehaviorSubject, tap} from "rxjs";
import {ClinicModel, SelectedServiceModel} from "./order.types";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {EndpointsHelper} from "../../../core/helpers/Endpoints.helper";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

    private readonly _baseUrl = environment.apiUrl;

    private _selectedService: BehaviorSubject<SelectedServiceModel> = new BehaviorSubject<SelectedServiceModel>(null)
    private _clinicsList: BehaviorSubject<SelectedServiceModel> = new BehaviorSubject<SelectedServiceModel>(null)

    get selectedService() {
        return this._selectedService.getValue()
    }

  constructor(private _http: HttpClient) { }

    setSelectedService(selectedService: SelectedServiceModel) {
      this._selectedService.next(selectedService)
    }

    getClinicsByService(serviceId: string) {
        return this._http.get<ClinicModel[]>(`${this._baseUrl}${EndpointsHelper.UrlClinic}/${serviceId}`).pipe(
            tap(console.log)
        )
    }
}
