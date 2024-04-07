import { Routes } from '@angular/router';
import { OrderComponent } from './order.component';
import { SelectServiceComponent } from './select-service/select-service.component';
import {UrlHelpers} from "../../../core/helpers/UrlHelpers";
import {ClinicListComponent} from "./clinic-list/clinic-list.component";
import {ClinicResolver, ClinicsResolver} from "./order.resolvers";
import {ClinicCreateOrderComponent} from "./clinic-list/clinic-create-order/clinic-create-order.component";
import {PetsService} from "../pets/pets.service";
import {inject} from "@angular/core";

export default [
    {
        path: '',
        component: OrderComponent,
        children: [
            {
                path: '',
                component: SelectServiceComponent,
            },
            {
                path: `${UrlHelpers.clinics}`,
                component: ClinicListComponent,
                resolve: {
                    clinics: ClinicsResolver
                },
            },
            {
                path: `:id`,
                component: ClinicCreateOrderComponent,
                resolve: {
                    clinic: ClinicResolver,
                    pets: () => inject(PetsService).getAllPets()
                }
            },
        ],
    },
] as Routes;
