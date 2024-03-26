import { Routes } from '@angular/router';
import { OrderComponent } from './order.component';
import { SelectServiceComponent } from './select-service/select-service.component';
import {UrlHelpers} from "../../../core/helpers/UrlHelpers";
import {ClinicListComponent} from "./clinic-list/clinic-list.component";
import {ClinicsResolver} from "./order.resolvers";

export default [
    {
        path: '',
        component: OrderComponent,
        children: [
            {
                path: '',
                component: SelectServiceComponent,
            },
        ],

    },
    {
        path: `${UrlHelpers.clinics}`,
        component: ClinicListComponent,
        resolve: {
            clinics: ClinicsResolver
        }
    },
] as Routes;
