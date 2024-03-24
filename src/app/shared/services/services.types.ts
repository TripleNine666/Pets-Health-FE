export interface ServiceModel {
    _id: string;
    title: string;
    subservices: SubserviceModel[];
}

export interface SubserviceModel {
    _id: string;
    name: string;
    price: number;
}
