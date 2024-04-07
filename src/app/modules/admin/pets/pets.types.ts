import {ClinicModel} from "../order/order.types";

export interface PetModel {
    _id: string;
    name: string;
    age: number;
    type: string;
    breed: string;
    sex: string;
    orders: PetOrder[];
}

export interface PetCreateModel {
    name: string;
    age: number;
    type: string;
    breed: string;
    sex: string;
}

export interface PetOrder {
    date: Date;
    title: string;
    name: string;
    price: number;
    clinic:ClinicModel
}

export enum PetTypeEnum {
    dog = 'Собака',
    cat = 'Кот',
}

export enum PetSexEnum {
    male = 'Мужской',
    felmale = 'Женский',
}
