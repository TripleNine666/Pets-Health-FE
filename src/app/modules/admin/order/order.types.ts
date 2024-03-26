import {ServiceModel} from "../../../shared/services/services.types";

export interface SelectedServiceModel {
    serviceId: string;
    subServiceId: string;
}
export interface ClinicModel {
    name: string;
    email: string;
    phone: string;
    services: ServiceModel[];
    address: string;
}
