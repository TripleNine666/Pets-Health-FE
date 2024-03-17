export interface PetModel {
    id: string;
    name: string,
    age: number,
    type: string,
    breed: string,
    sex: string,
    orders: PetOrder[]
}

export interface PetOrder {
    date: Date,
    title: string,
    name: string,
    price: number
}

export enum PetTypeEnum {
    dog = 'Собака',
    cat = 'Кот'
}
