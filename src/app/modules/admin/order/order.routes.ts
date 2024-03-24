import { Routes } from '@angular/router';
import { OrderComponent } from './order.component';
import { SelectServiceComponent } from './select-service/select-service.component';

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
] as Routes;
