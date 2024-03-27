import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {ClinicModel, SelectedServiceModel, SelectedServiceNameModel} from "./order.types";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {EndpointsHelper} from "../../../core/helpers/Endpoints.helper";
import {ServicesService} from "../../../shared/services/services.service";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

    private readonly _baseUrl = environment.apiUrl;

    private _selectedService: BehaviorSubject<SelectedServiceModel> = new BehaviorSubject<SelectedServiceModel>(null)
    private _clinicsList: BehaviorSubject<ClinicModel[]> = new BehaviorSubject<ClinicModel[]>([])

    constructor(private servicesService: ServicesService, private _http: HttpClient) {
    }

    get selectedService() {
        return this._selectedService.getValue()
    }
    get clinicsList$(): Observable<ClinicModel[]> {
       return this._clinicsList.asObservable()
    }

    getSelectedServiceName() {
        if (!this._selectedService.getValue()) return null
       const selectedServiceObj =  this.servicesService.services.find(service => service._id === this._selectedService.getValue().serviceId)
        const selectedSub = selectedServiceObj.subservices.find(sub => sub._id === this._selectedService.getValue().subServiceId)
        const result: SelectedServiceNameModel = {
            title: selectedServiceObj.title,
            name: selectedSub.name,
            price: selectedSub.price
        }
        return result
    }


    setSelectedService(selectedService: SelectedServiceModel) {
      this._selectedService.next(selectedService)
    }

    getClinicsByService(serviceId: string) {
        return this._http.get<ClinicModel[]>(`${this._baseUrl}${EndpointsHelper.UrlClinic}${EndpointsHelper.UrlService}/${serviceId}`).pipe(
            tap(clinics => this._clinicsList.next(clinics))
        )
    }

    getClinicById(id: string) {
        return this._http.get<ClinicModel>(`${this._baseUrl}${EndpointsHelper.UrlClinic}/${id}`).pipe(
            tap(console.log)
        )
    }
}
