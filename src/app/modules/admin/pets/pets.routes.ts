import { Routes } from '@angular/router';
import { PetsComponent } from './pets.component';
import { PetsService } from './pets.service';
import { inject } from '@angular/core';
import { UrlHelpers } from '../../../core/helpers/UrlHelpers';
import { PetCreateEditComponent } from './pet-create-edit/pet-create-edit.component';
import { PetResolver } from './pets.resolvers';

export default [
    {
        path: '',
        component: PetsComponent,
        resolve: {
            pets: () => inject(PetsService).getAllPets(),
        },
    },
    {
        path: `${UrlHelpers.create}`,
        component: PetCreateEditComponent,
    },
    {
        path: ':id',
        component: PetCreateEditComponent,
        resolve: {
            pet: PetResolver,
        },
    },
] as Routes;
