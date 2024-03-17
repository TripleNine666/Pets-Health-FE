import { Routes } from '@angular/router';
import {PetsComponent} from "./pets.component";
import {PetsService} from "./pets.service";
import {inject} from "@angular/core";

export default [
    {
        path     : '',
        component: PetsComponent,
        resolve: {
            pets: () => inject(PetsService).getAllPets()
        }
    },
] as Routes;
