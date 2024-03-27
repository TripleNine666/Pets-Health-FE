import { inject } from '@angular/core';

import {
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { catchError, throwError } from 'rxjs';
import {OrderService} from "./order.service";

export const ClinicsResolver = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    const orderService = inject(OrderService);
    const router = inject(Router);
    return orderService.getClinicsByService(route.queryParamMap.get('serviceId')).pipe(
        // Error here means the requested folder is not available
        catchError((error) => {
            // Log the error
            console.error(error);

            // Get the parent url
            const parentUrl = state.url.split('/').slice(0, -1).join('/');

            // Navigate to there
            router.navigateByUrl(parentUrl);

            // Throw an error
            return throwError(() => error);
        }),
    );
};

export const ClinicResolver = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    const orderService = inject(OrderService);
    const router = inject(Router);
    return orderService.getClinicById(route.paramMap.get('id')).pipe(
        // Error here means the requested folder is not available
        catchError((error) => {
            // Log the error
            console.error(error);

            // Get the parent url
            const parentUrl = state.url.split('/').slice(0, -1).join('/');

            // Navigate to there
            router.navigateByUrl(parentUrl);

            // Throw an error
            return throwError(() => error);
        }),
    );
};
