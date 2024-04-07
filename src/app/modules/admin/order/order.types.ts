import {ServiceModel} from "../../../shared/services/services.types";

export interface SelectedServiceModel {
    serviceId: string;
    subServiceId: string;
}
export interface ClinicModel {
    _id: string;
    name: string;
    email: string;
    phone: string;
    services: ServiceModel[];
    address: string;
}

export interface SelectedServiceNameModel {
    title: string;
    name: string;
    price: number;
}

export interface CreateOrder {
    date: Date,
    title: string,
    name: string,
    price: number,
    clinicId: string
}
